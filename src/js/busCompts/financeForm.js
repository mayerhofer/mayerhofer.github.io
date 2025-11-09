import React, { useState, useEffect } from 'react';
import TextField from "../components/textField";
import FlagCombo from "./flagCombo";
import LiabilityModal from "./liabilityModal";
import { labelImages, currencies, images64 } from "../templates";
import Toast from "../components/toast";
import EntityAPI from "../servers/entity";
import Button from "../html/button";
import Image from "../html/image";
import DateField from "../html/dateField";

const buildNewState = ({cashflow, cashflows}) => {
  const cf = cashflow;
  const isEdit = typeof (cashflow) === 'object' && Object.keys(cashflow).length > 0;

  if (isEdit) {
    return {
      isEditMode: true,
      amount: cf.amount,
      nextElementId: cf.elementId,
      country: cf.location,
      currency: cf.currency,
      date: new Date(cf.date),
      direction: cf.direction,
      description: cf.description,
      provider: cf.provider,
      labels: cf.labels,
      book: cf.book,
      liability: undefined
    };
  } else {
    return {
      isEditMode: false,
      amount: 10,
      nextElementId: cashflows.map(d => d.elementId).filter(id => id > 0).sort((a,b)=>a-b).pop() + 1,
      country: 'Spain',
      currency: 'EUR',
      date: new Date(),
      direction: false,
      description: '',
      provider: '',
      labels: [''],
      book: 'M EUR',
      liability: undefined
    };
  }
}

const validDefinitionObject = {
  validDef: {
    required: true,
    restricted: false,
    options: []
  },
};

const buildAutoOptions = (cashflows) => {
  const options = cashflows.map(cf => cf.provider);
  const result = new Set();

  options.sort();

  for (let i=0; i<options.length -1; i++) {
    if (options[i] == options[i+1]) {
      result.add(options[i]);
    }
  }

  return result;
}

const RadioField = ({id, checked, value, label, handleChange}) => {
  return (
    <label className="rad-label">
      <input
        type="radio"
        className="rad-input"
        name={id}
        value={value}
        checked={checked}
        onChange={handleChange} />
      <div className="rad-design"></div>
      <div className="rad-text">{label}</div>
    </label>
  );
};

const FinanceForm = ({element, data, id, currency, handleClose, handleSaved}) => {
  const [showLiabilityModal, setShowLiabilityModal] = useState(false);
  const [cashflow, setCashflow] = useState(element || {});
  if (!Array.isArray(data)) {
    throw 'Missing prop cashflow array or cashflow element';
  }

  const [state, setState] = useState({
    isEditMode: typeof (element) === 'object',
    isSaving: false,
    labelOptions: [],
    bookOptions: [],
    validationState: {
      provider: structuredClone(validDefinitionObject),
      description: structuredClone(validDefinitionObject),
      labels: structuredClone(validDefinitionObject),
      book: structuredClone(validDefinitionObject)
    },
    ...buildNewState({cashflow, cashflows: data}),
  });

  // useEffect replaces componentDidMount
  useEffect(() => {
    const optionApi = new EntityAPI('option');
    optionApi.get()
      .then(options => {
        const labelOptions = options.filter(option => option.combo === 'labels').map(o => o.description);
        const bookOptions = options.filter(option => option.combo === 'books');
        const labels = structuredClone(validDefinitionObject);
        const book = structuredClone(validDefinitionObject);

        book.validDef.restricted = labels.validDef.restricted = true;
        labels.validDef.options = labelOptions;
        book.validDef.options = bookOptions
          .filter(o => o.currency === (currency ?? 'EUR')).map(o => o.description);

        setState(prevState => ({
          ...prevState,
          labelOptions,
          bookOptions,
          validationState: {...prevState.validationState, labels, book}
        }));
      });
  }, []); // Empty dependency array means this runs once on mount

  const cleanState = () => {
    const newProps = {...props, element: undefined};
    setState(prevState => ({
      ...prevState,
      ...buildNewState(newProps)
    }));
  };

  const isValidToSave = () => {
    return (
      state.provider.trim().length > 0
      && state.description.trim().length > 0
      && !Number.isNaN(state.amount)
      && state.labels.length > 0
    );
  };

  const handleCountryUpdate = (country) => {
    setState(prev => ({...prev, country}));
  };

  const handleBookChange = (e) => {
    console.log(e);
    setState(prev => ({...prev, book: typeof e === 'string' ? e : e.innerHTML}));
  };

  const handleCurrencyUpdate = (e) => {
    const newOptions = state.bookOptions.filter(o => o.currency === e.value).map(o => o.description);
    const newValidationState = JSON.parse(JSON.stringify(state.validationState));
    newValidationState.book.validDef.options = newOptions;

    setState(prev => ({
      ...prev,
      currency: e.value,
      validationState: newValidationState
    }));
  };

  const handleDirectionChange = (e) => {
    setState(prev => ({...prev, direction: e.value === 'income'}));
  };

  const handleLabelChange = (e) => {
    setState(prev => ({...prev, labels: [e.value]}));
  };

  const handleUpdateDate = (e) => {
    setState(prev => ({...prev, date: new Date(e.value)}));
  };

  const handleUpdateAmount = (e) => {
    setState(prev => ({...prev, amount: e.value}));
  };

  const handleBack = () => {
    cleanState();
    handleClose();
  };

  const handleSave = async () => {
    try {
      const dt = state.date;
      const cfid = state.nextElementId;
      const newCashFlow = {
        date: dt.getTime(),
        currency: state.currency,
        location: state.country,
        direction: state.direction,
        provider: state.provider,
        description: state.description,
        labels: state.labels,
        book: state.book,
        amount: Number.parseFloat(state.amount),
        elementId: cfid,
      };
      const saveObj = state.isEditMode ? {...element, ...newCashFlow} : newCashFlow;
      const cfApi = new EntityAPI('cashflow');
      const savedCf = await cfApi.save(saveObj);
      log('info', 'CF saved', newCashFlow.provider);
      await saveLiability(cfid, savedCf);
      handleSaved(savedCf);
      cleanState();
    } catch (ex) {
      log('error', ex.message, ex.stackTrace);
    }
  };

  const saveLiability = async (cfid, newCashFlow) => {
    if (state.liability) {
      const lApi = new EntityAPI('liability');
      const obj = {
        ...state.liability,
        date: newCashFlow.date,
        cashflowId: cfid,
      };

      const found = 
        state.isEditMode &&
        (await lApi.get()).find(l => l.cashflowId === cfid);

      if (found) {
        obj["elementId"] = found.elementId;
        obj["_id"] = found._id;
      } else {
        const maxIdRes = await lApi.get({"type": "maxId"});
        const nextElementId = maxIdRes[0].maxId + 1;
        obj["elementId"] = nextElementId;
      }

      await lApi.save(obj);
      log('info', 'New liability saved successfully.', `CF id: ${cfid.toString()}`);
    }
  };

  const handleProviderChange = (provider) => {
    setState(prev => ({...prev, provider}));
  };

  const handleDescriptionChange = (description) => {
    setState(prev => ({...prev, description}));
  };

  const handleCopy = () => {
    setState(prev => ({
      ...prev,
      isEditMode: false,
      nextElementId: data.map(d => d.elementId).filter(id => id > 0).sort((a,b)=>a-b).pop() + 1
    }));
  };

  const handleAddLiability = (obj) => {
    const cb = window.document.getElementById('cb' + id + 'Liability');
    setState(prev => ({...prev, liability: obj}));
    if (cb) cb.checked = false;
  };

  const log = (type, header, text) => {
    // TODO: Replace this with a proper React Toast component
    console.log(`${type}: ${header} - ${text}`);
  };

  const labelImgArray = labelImages.map(label => (
    <li key={label.label} className="direction-option">
      <input type="radio" id={label.alias} name="label" value={label.label} alt={label.label} checked={Array.isArray(state.labels) && state.labels.indexOf(label.label) >= 0} onChange={handleLabelChange} />
      <label htmlFor={label.alias}>
        <img className="img-swap icon-big" src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAA${label.img}`} />
      </label>
    </li>
  ));
    
  const dateValue = state.date.toISOString().slice(0, 11) + state.date.toString().slice(16, 21);
  
  // Return the JSX
  return (
    <div className="page" id={id}>
      <div className="buttons" id={id + 'ActionButtons'}>
        {/* Replace these with proper React components */}
        <Button className="form-button" onClick={() => setShowLiabilityModal(true)}>
          <Image name="liability" />
        </Button>
        <Button className="form-button" onClick={handleBack}>
          <Image name="back" />
        </Button>
        {state.isEditMode ? (
          <Button className="form-button" onClick={handleCopy}>
            <Image name="copy" />
          </Button>
        ) : null}
        <Button className="form-button" onClick={handleSave} disabled={!isValidToSave()}>
          <Image name="save" />
        </Button>
        <LiabilityModal
          handleClose={() => setShowLiabilityModal(false)}
          show={showLiabilityModal}
          amount={state.amount}
          currency={state.currency}
          addLiability={handleAddLiability}
        />
      </div>
      <DateField id={id + 'Date'} label="Date" value={dateValue} onChange={handleUpdateDate} />
      
      
      <div className="container">
        <div style={{display: "inline-flex", justifyContent: "space-between", width: "90%"}}>
          { /* Amount field */ }
          <div className="amount-container">
            <div className="textfield modalfield">
              <div className="amount-currency-container">
                <div className="currency-dropdown">
                  <label><div dangerouslySetInnerHTML={{ __html: currencies[state.currency] ?? '?' }} /></label>
                  <div className="currency-dropdown-content">
                    {
                      Object.keys(currencies).map(key => (
                        <RadioField id={id + 'Currency'} key={key} value={key} label={currencies[key]} handleChange={handleCurrencyUpdate} />
                      ))
                    }
                  </div>
                </div>
              </div>
              <label htmlFor={`${id}AmountInput`} className="field-label hide">Amount</label>
              <input id={`${id}AmountInput`} className="amount-input" type="number" maxLength="30" min="0" step="0.01" value={state.amount} placeholder="Amount" onChange={handleUpdateAmount} />
            </div>
          </div>
          { /* Flag field */ }
          <div className='direction' style={{position: 'relative', display: 'flex'}}>
            <FlagCombo
              id={id + 'Country'}
              country={state.country}
              handleChange={handleCountryUpdate}
            />
          </div>
          { /* Direction field */ }
          <ul className="direction">
            <li className="direction-option">
              <input type="radio" id={`${id}AmountIncome`} name={`${id}AmountDirection`} value="income" alt="Income" checked={state.direction} onChange={handleDirectionChange} />
              <label htmlFor={`${id}AmountIncome`}>
                <img className="img-swap icon-small" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADmElEQVR4nO2bS0hUURjHf41KYmgZBRE9QFqUPaQgohZRYJsgCCMzCtJVQdEm0iAMKloEQbSIiGhVUBG0iB6IC5WgZS1UKowIo4VZCL1MMm1xZnDOQWfuedxzRq8/ODhX7vnu//vu3O9+5zGQPNYB3cBHYG9gLd4pQTg/nm79YeX4p4UJ58eB3rBy/LIC+IkcgLqgijzzGNn552Hl+GUfsvO/gKqgijxSDnxCDkBLUEWeuYrsfA/ibZAINgB/mXB+DNgRVJFHUsBL5Lt/K6gizxxHdv4rsCioIo8sAYaQA3BkshPneBSlSyvQAJQa9C0HFmcddwE7EYGYFhxGvns2bQRY41e+HaWIkZqrAFzMdbHiODyw5CSwMuv4OyKB6TIKtAEXXIjyRSXwDfkO1gZV5JlryM4/DSvHL1XAHyacH0XM3iSGhyS4atuCqNMzzv8GlgVV5JkXyHf/fFg5fqlDdn4AqAiqyCMlwDvkABwNqsgzJ5Cdf4vn4szFxVZjlrBSwDnlf82I19+04QruavYuz9qt2Y786rJpY8BWv/LtmAu8wd3dD1b0mOaAZsSzn6EfuGdoqwe4b9jXGpMZoVWIBcbsmZo9wBMniqKxELiU1mLKEIZD5Tbkr+8jCxGm3MDNo6e9ONqgGPgBLLdyxYwO3ARgXOeiFcBnpfMpa1fMCBKA60rHbsItMakBiL3vZkSFlun0D9imeWGXOAtAKkKHIuBm+m+G24hlp2lPlDrgGLAx63gQOBPRfhmwCbPFDRBTZK8QEyS50Jk4rdQRMB/hcPbXbdIlpiku9B79pKS2PmCBYttbElR3VnQRvXiqdyhyf1wByJcDXgPD6c/DiMchatIpi3heFOY5tCWRLwd8QExY7gLaEQMgU54hXp1RWA/s1rB9WePcg4gdY7HTiPx1a3TY1+trcEaT+AAUI563VjTfjwp9wFnEEHMqTgOHItpbqnn9do1za7IPioEH2G8gqEU8U8dznFOdbnFgvIKcwt3uibici5XE5wA1AJ2ISi9q06FJw26Tpm0dzZ3ZHWe/AaEFhEYthSuJb09OtYZt3YRqNRx2NWLrUOyq5axNy1cKxzYanPEkPgBqDtBd4tL55UXBDodzPcf50MkBs8PhQiTxAVBzQA16Q0sdCnY4nE3chVBBDocHHYlQ7biyC/BFOTbZPj+l3QPpDzYVVQ+wVjFeBNxF/GLD1O4IcAd5WQ7EJupeS80DQP1/Q7c2KrewnUoAAAAASUVORK5CYII="/>
              </label>
            </li>
            <li className="direction-option">
              <input type="radio" id={`${id}AmountExpense`} name={`${id}AmountDirection`} value="expense" alt="Expense" checked={!state.direction} onChange={handleDirectionChange} />
              <label htmlFor={`${id}AmountExpense`}>
                <img className="img-swap icon-small" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABGUlEQVRIie3UPUvDUBQG4Ad161AQXfwCQTo66yIiDoqO4tw/UcRd0NH/4OBmB0HE2UkQBAdxbV0cHBShqGAdjBSKtyRtLnTICweS3JDncLk5FCkyBNnCE9oDVhObWeBmDuhfNULINk7wgPfk5agZx3mgy2hZwGOCvKCGRUxgNNDMIAWW8Zw8uMPcP43lDu+ildycoRTYkdzh7+TiECMBNAr8gWoPMAR/4hhTmMFFVnglBdoN11HpWp/NCqdNG7dYDazPx4KrwmeghMtYcCgV3GdEgyMzbXbw2ge60S84hiOdX7GOct/tp8w0rhPwC3uxQVjXGa0NLMXEyljDqc7WXmFy0A9nORgt7Os9WnOD33CDA7+jsUiR4c4PF/oFIjYEfRAAAAAASUVORK5CYII="/>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <TextField
          update={handleProviderChange}
          label="Provider"
          value={state["provider"]}
          validDef={state.validationState["provider"].validDef}
          autoOptions={data.length > 1 ? [...buildAutoOptions(data)] : null} />
      </div>
      <div className="container">
        <TextField update={handleDescriptionChange} label="Description" value={state["description"]} validDef={state.validationState["description"].validDef} />
      </div>

      { /* Book dropdown */ }
      <div className="container">
        <div className="book-dropdown">
          <TextField update={handleBookChange} label="Book" value={state["book"]} validDef={state.validationState["book"].validDef} />
          <div className="book-dropdown-content">
            <ul>
              {state.validationState.book.validDef.options.map(b => (
                <li key={b} onClick={handleBookChange}>{b}</li>)
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <ul className="direction">
          {labelImgArray.slice(0, 7)}</ul><ul className="direction">{labelImgArray.slice(7)}
        </ul>
      </div>
    </div>
  );
};

export default FinanceForm;