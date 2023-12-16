import { RComponent } from "../framework/RComponent";
import TextField from "../components/textField";
import FlagCombo from "./flagCombo";
import LiabilityModal from "./liabilityModal";
import { labelImages, currencies, images64 } from "../templates";
import Toast from "../components/toast";
import EntityAPI from "../servers/entity";
import Div from "../html/div";
import Button from "../html/button";
import Image from "../html/image";
import DateField from "../html/dateField";

const buildNewState = (props) => {
  const cf = props.element;
  const isEdit = typeof (props.element) === 'object';

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
      nextElementId: props.data.map(d => d.elementId).filter(id => id > 0).sort((a,b)=>a-b).pop() + 1,
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

export default class FinanceForm extends RComponent {
  constructor(props) {
    super(props);

    if (! Array.isArray(props.data)) {
      throw 'Missing prop cashflow array or cashflow element';
    }

    this.state = {
      isEditMode: typeof (props.element) === 'object',
      isSaving: false,
      labelOptions: [],
      bookOptions: [],
      validationState: {
        provider: structuredClone(validDefinitionObject),
        description: structuredClone(validDefinitionObject),
        labels: structuredClone(validDefinitionObject),
        book: structuredClone(validDefinitionObject)
      },
      ... buildNewState(props),
    };
  }

  getDerivedState(props) {
    if (! Array.isArray(this.props.data)) {
      throw 'Missing prop cashflow array or cashflow element';
    }

    return Object.assign({}, this.state, buildNewState(props));
  }

  componentDidMount() {
    const self = this;
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
        .filter(o => o.currency === (this.props.currency ?? 'EUR')).map(o => o.description);

      self.setState({
        labelOptions,
        bookOptions,
        validationState: Object.assign({}, this.state.validationState, {labels, book})
      });
    });
  }

  cleanState() {
    const newProps = Object.assign({}, this.props, {element: undefined});
    this.setState(this.getDerivedState(newProps));
  }

  isValidToSave() {
    return (
      this.state.provider.trim().length > 0
   && this.state.description.trim().length > 0
   && !Number.isNaN(this.state.amount)
   && this.state.labels.length > 0);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.element !== nextProps.element ||
      this.state.isEditMode !== nextState.isEditMode ||
      this.state.currency !== nextState.currency ||
      this.state.date !== nextState.date ||
      this.state.amount !== nextState.amount ||
      this.state.country !== nextState.country ||
      this.state.direction !== nextState.direction ||
      this.state.book !== nextState.book ||
      this.state.description !== nextState.description ||
      this.state.provider !== nextState.provider ||
      (Array.isArray(nextProps.labels) && (this.state.labels.length !== nextProps.labels.length ||
        (! this.state.labels.every(i => nextState.labels.includes(i)) )));
  }

  handleCountryUpdate(country) {
    this.setState({country});
  }
  handleBookChange(e) {
    this.setState({book: typeof e === 'string' ? e : e.innerHTML});
  }
  handleCurrencyUpdate(e) {
    const newOptions = this.state.bookOptions.filter(o => o.currency === e.value).map(o => o.description);
    const validationState = JSON.parse(JSON.stringify(this.state.validationState));
    validationState.book.validDef.options = newOptions;

    this.setState({currency: e.value, validationState});
  }
  handleDirectionChange(e) {
    this.setState({direction: e.value === 'income'});
  }
  handleLabelChange(e) {
    this.setState({labels: [e.value]});
  }
  handleUpdateDate(e) {
    this.setState({date: new Date(e.value)});
  }
  handleUpdateAmount(e) {
    this.setState({amount: e.value});
  }

  handleBack() {
    this.cleanState();
    this.props.handleClose();
  }

  async handleSave() {
    try {
      const dt = this.state.date;
      const cfid = this.state.nextElementId;
      const newCashFlow = {
        date: dt.getTime(),
        currency: this.state.currency,
        location: this.state.country,
        direction: this.state.direction,
        provider: this.state.provider,
        description: this.state.description,
        labels: this.state.labels,
        book: this.state.book,
        amount: Number.parseFloat(this.state.amount),
        elementId: cfid,
      };
      const saveObj = this.state.isEditMode ? Object.assign({}, this.props.element, newCashFlow) : newCashFlow;
      const cfApi = new EntityAPI('cashflow');
      const savedCf = await cfApi.save(saveObj);
      this.log('info', 'CF saved', newCashFlow.provider);
      await this.saveLiability(cfid, savedCf);
      this.props.handleSave(savedCf);
      this.cleanState();
    } catch (ex) {
      this.log('error', ex.message, ex.stackTrace);
    }
  }
  async saveLiability(cfid, newCashFlow) {
    if (this.state.liability) {
      const lApi = new EntityAPI('liability');
      const obj = {
        ...this.state.liability,
        date: newCashFlow.date,
        cashflowId: cfid,
      };

      const found = 
        this.state.isEditMode &&
        (await lApi.get()).find(l => l.cashflowId === cfid);

      if (found) {
        //update
        obj["elementId"] = found.elementId;
        obj["_id"] = found._id;

      } else {
        const maxIdRes = await lApi.get({"type": "maxId"});
        const nextElementId = maxIdRes[0].maxId + 1;
        // insert
        obj["elementId"] = nextElementId;
      }

      await lApi.save(obj);
      this.log('info', 'New liability saved successfully.', `CF id: ${cfid.toString()}`);
    }
  }
  handleProviderChange(provider) {
    this.setState({provider});
  }
  handleDescriptionChange(description) {
    this.setState({description});
  }
  handleCopy() {
    const changes = {
      isEditMode: false,
      nextElementId: this.props.data.map(d => d.elementId).filter(id => id > 0).sort((a,b)=>a-b).pop() + 1
    }
    this.setState(changes);
  }
  handleAddLiability(obj) {
    const cb = window.document.getElementById('cb' + this.id + 'Liability');

    this.setState({liability: obj});

    cb.checked = false;
  }

  log(type, header, text) {
    this.buildRComponent(
      {
        type,
        header,
        text,
        id: this.id + 'Toast'
      }, p => new Toast(p)
    );
  }

  render() {
    // Util Functions
    const buildTb = props => this.buildRComponent(props, p => new TextField(p));
    const buildProps = label => {
      return {
        id: this.id + label,
        label,
        value: this.state[label.toLowerCase()],
        validDef: this.state.validationState[label.toLowerCase()].validDef,
        update: this[`handle${label}Change`].bind(this),
      };
    };

    const currencyHtml = currencies[this.state.currency] ?? '?';
    const amountProps = {
      id: this.id + 'Amount',
      label: 'Amount', 
      currency: currencyHtml, 
      currencyList: Object.keys(currencies)
        .map(key => this.fill('radioField', {id: this.id + 'Currency', value: key, label: currencies[key]}))
        .join(''), 
      expenseChecked: this.state.direction ? '' : 'checked', 
      incomeChecked: this.state.direction ? 'checked' : '',
      value: this.state.amount,
    };
    
    const labelImgArray = labelImages.map(label => 
      this.fill('labelField', {id: this.id + 'Labels', checked: Array.isArray(this.state.labels) && this.state.labels.indexOf(label.label) >= 0 ? 'checked' : '', ...label}));
      
    const labelProps = {
      id: this.id + 'Labels',
      content: labelImgArray.slice(0, 7).join('') + '</ul><ul class="direction">' + labelImgArray.slice(7).join(''),
    };
    
    let dateValue = this.state.date.toISOString().slice(0, 11) + this.state.date.toString().slice(16, 21);
    let date = DateField(this.id + 'Date', 'Date', dateValue, this.handleUpdateDate.bind(this));
    let country = this.buildRComponent({id: this.id + 'Country', country: this.state.country, handleChange: this.handleCountryUpdate.bind(this)}, p => new FlagCombo(p));
    
    const providerProps = buildProps('Provider');
    const descProps = buildProps('Description');
    const bookFieldProps = buildProps('Book');

    let amount = this.fill('amountField', amountProps);

    let labels = this.fill('labelsField', labelProps);
    const bookProps = {
      id: this.id + 'BookContainer',
      input: buildTb(bookFieldProps),
      list: '<ul>' + this.state.validationState.book.validDef.options.map(b => `<li onclick="window.application.callHandler(this,\'${this.id}Book\')">${b}</li>`).join('') + '</ul>',
    };
    let book = this.fill('bookField', bookProps);

    const lProps = { id: this.id + 'LiabilityView', addLiability: this.handleAddLiability.bind(this), amount: this.state.amount, currency: this.state.currency };
    const liabilityView = this.buildRComponent(lProps, p => new LiabilityModal(p));

    // Nao deletei abaixo, porque o codigo e da mesma imagem em tamanho 100x100
    let liability = this.fill('liabilityButton', {id: this.id + 'Liability', content: liabilityView, className: 'form-button', img: images64.liability});
    let save = Button('form-button', Image('save'), this.id + 'Save', this.handleSave.bind(this), !this.isValidToSave());
    let back = Button('form-button', Image('back'), this.id + 'Back', this.handleBack.bind(this));
    let copy = this.state.isEditMode ? 
      Button('form-button', Image('copy'), this.id + 'Copy', this.handleCopy.bind(this)) : 
      '';
    let actionButtons = Div('buttons', [liability, back, copy, save].join(''), this.id + 'ActionButtons');

    this.registerHandler(this.id + 'AmountDir', this.handleDirectionChange.bind(this));
    this.registerHandler(this.id + 'Labels', this.handleLabelChange.bind(this));
    this.registerHandler(this.id + 'Amount', this.handleUpdateAmount.bind(this));
    this.registerHandler(this.id + 'Book', this.handleBookChange.bind(this));
    this.registerHandler(this.id + 'Currency', this.handleCurrencyUpdate.bind(this));

    if (this.props.data.length > 1) {
      providerProps.autoOptions = [...buildAutoOptions(this.props.data)];
    }

    return Div('page', [actionButtons, date, country, amount, buildTb(providerProps), buildTb(descProps), book, labels].join(''), this.id);
  }
}