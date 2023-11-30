import { RComponent } from "../framework/RComponent";
import TextField from "../components/textField";
import FlagCombo from "./flagCombo";
import LiabilityModal from "./liabilityModal";
import SaveButton from "./saveButton";
import BackButton from "./backButton";
import { images64, currencies } from "../templates";
import Toast from "../components/toast";
import EntityAPI from "../servers/entity";

const labelImages = [
  {
    label: 'Work',
    alias: 'work',
    img: images64['work'],
  },
  {
    label: 'Health',
    alias: 'health',
    img: images64['health'],
  },
  {
    label: 'Investments',
    alias: 'investment',
    img: images64['investment'],
  },
  {
    label: 'Dinner',
    alias: 'dinner',
    img: images64['dinner'],
  },
  {
    label: 'Groceries',
    alias: 'market',
    img: images64['market'],
  },
  {
    label: 'Transport',
    alias: 'transport',
    img: images64['transport'],
  },
  {
    label: 'Leisure',
    alias: 'leisure',
    img: images64['leisure'],
  },
  {
    label: 'Service',
    alias: 'service',
    img: images64['service'],
  },
  {
    label: 'House',
    alias: 'house',
    img: images64['house'],
  },
  {
    label: 'Tourism',
    alias: 'tourism',
    img: images64['tourism'],
  },
  {
    label: 'Sweets',
    alias: 'sweet',
    img: images64['sweet'],
  },
  {
    label: 'Gift',
    alias: 'gift',
    img: images64['gift'],
  },
  {
    label: 'Education',
    alias: 'study',
    img: images64['study'],
  },
  {
    label: 'Tax',
    alias: 'tax',
    img: images64['tax'],
  },
];

const buildNewState = (isEdit, props) => {
  const cf = props.element;
  return {
    amount: isEdit ? cf.amount : 10,
    nextElementId: isEdit ? cf.elementId :
      props.data.map(d => d.elementId).filter(id => id > 0).sort((a,b)=>a-b).pop() + 1,
    country: isEdit ? cf.location : 'Spain',
    currency: isEdit ? cf.currency : 'EUR',
    date: isEdit ? new Date(cf.date) : new Date(),
    direction: isEdit ? cf.direction : false,
    description: isEdit ? cf.description : '',
    provider: isEdit ? cf.provider : '',
    labels: isEdit ? cf.labels : [''],
    book: isEdit ? cf.book : 'M EUR',
    liability: undefined
  };
}

export default class FinanceForm extends RComponent {
  constructor(props) {
    super(props);

    if (! Array.isArray(this.props.data)) {
      throw 'Missing prop cashflow array or cashflow element';
    }

    this.state = {
      isEditMode: typeof (this.props.element) === 'object',
      labelOptions: [],
      bookOptions: [],
      validationState: {
        provider: {
          validDef: {
            required: true,
            restricted: false,
          },
        },
        description: {
          validDef: {
            required: true,
            restricted: false,
          },
        },
        labels: {
          validDef: {
            required: true,
            restricted: true,
            options: [],
          },
        },
        book: {
          validDef: {
            required: true,
            restricted: true,
            options: [],
          },
        },
      },
      ... buildNewState(
        typeof (this.props.element) === 'object',
        props
      ),
    };
  }

  getDerivedState(props) {
    const newState = Object.assign({}, this.state);

    if (! Array.isArray(this.props.data)) {
      throw 'Missing prop cashflow array or cashflow element';
    }

    if (props.element) {
      newState.isEditMode = true;
      newState.amount = props.element.amount;
      newState.nextElementId = props.element.elementId;
      newState.country = props.element.location;
      newState.currency = props.element.currency;
      newState.date = new Date(props.element.date);
      newState.direction = props.element.direction;
      newState.description = props.element.description;
      newState.provider = props.element.provider;
      newState.labels = props.element.labels;
      newState.book = props.element.book;
      newState.liability = undefined;
    } else {
      newState.isEditMode = false;
      newState.amount = 10;
      newState.nextElementId = props.data.map(d => d.elementId).filter(id => id > 0).sort((a,b)=>a-b).pop() + 1;
      newState.country = 'Spain';
      newState.currency = 'EUR';
      newState.date = new Date();
      newState.direction = false;
      newState.description = '';
      newState.provider = '';
      newState.labels = [''];
      newState.book = 'M EUR';
      newState.liability = undefined;
    }
    return newState;
  }

  componentDidMount() {
    const self = this;
    const optionApi = new EntityAPI('option');
    optionApi.get()
    .then(options => {
      const labelOptions = options.filter(option => option.combo === 'labels').map(o => o.description);
      const bookOptions = options.filter(option => option.combo === 'books');

      const labels = {
        validDef: {
          required: true,
          restricted: true,
          options: labelOptions,
        }
      };
      const book = {
        validDef: {
            required: true,
            restricted: true,
            options: bookOptions.filter(o => o.currency === (this.props.currency ?? 'EUR')).map(o => o.description),
        }
      };
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
      this.state.currency !== nextState.currency ||
      this.state.date !== nextState.date ||
      this.state.amount !== nextState.amount ||
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

  handleSave() {
    const component = this;
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

    const saveLiabi = this.saveLiability.bind(this);

    const cfApi = new EntityAPI('cashflow');
    if (this.state.isEditMode) {
      cfApi.update(saveObj)
        .then(() => {
          this.log('info', 'CF updated', newCashFlow.provider);
          setTimeout(() => {
            saveLiabi(cfid, newCashFlow, () => {
              component.props.handleUpdate(saveObj);
              component.cleanState();
            });
          }, 1000);
        })
        .catch(ex => {
          this.log('error', ex.message, ex.stackTrace);
        });
    } else {
      cfApi.insert(saveObj)
        .then(response => {
          saveObj._id = response.insertedId;
          this.log('info', 'New CF saved', newCashFlow.provider);
          setTimeout(() => {
            saveLiabi(cfid, newCashFlow, () => {
              component.props.handleInsert(saveObj);
              component.cleanState();
            });
          }, 1000);
        })
        .catch(ex => {
          this.log('error', ex.message, ex.stackTrace);
        });
    }
  }
  saveLiability(cfid, newCashFlow, callback) {
    try {
      if (this.state.liability) {
        const lApi = 
	        new EntityAPI('liability');

        lApi.get().then(liabilities => {
          const found = Array.from(liabilities).find(l => l.cashflowId === cfid);

          if (found) {
            //update
            const obj = Object.assign({}, found, {
              date: newCashFlow.date,
              cashflowId: cfid,
              elementId: found.elementId,
              _id: found._id,
            });

            lApi.update(obj).then(res => {
              this.log('info', 'Liability updated successfully.', `CF id: ${cfid.toString()}`);
              callback();
	          });
          } else {
            lApi.get({"type": "maxId"}).then(res => {
              const nextElementId = res[0].maxId + 1;
              // insert
              const obj = {
                ...this.state.liability,
                date: newCashFlow.date,
                cashflowId: cfid,
                elementId: nextElementId
              };
              if (typeof obj.elementId === 'number' && obj.elementId > 0) {
                lApi.insert(obj).then(res => {
                  this.log('info', 'New liability saved successfully.', `CF id: ${cfid.toString()}`);
                  callback();
                });
              } else {
                this.log('error', 'Missing element Id.', `CF id: ${cfid.toString()}`);
              }
            });
          }
        });
      } else {
        callback();
      }
    } catch (ex) {
      this.log('error', ex.message, ex.stackTrace);
    }
  }
  handleProviderChange(provider) {
    this.setState({provider});
  }
  handleDescriptionChange(description) {
    this.setState({description});
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
    
    let date = this.fill('dateTextField', {id: this.id + 'Date', label: 'Date', value: this.state.date.toISOString().slice(0, 11) + this.state.date.toString().slice(16, 21)});
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
    //// // let liability = this.fill('imgButton', {id: this.id + 'Liability', disabled: strDisabled, className: 'financeSave', img: "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"});
    let liability = this.fill('liabilityButton', {id: this.id + 'Liability', content: liabilityView, className: 'financeSave', img: "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAElUlEQVRoge2a329URRTHPxK6hECh8qCh8qOrsWIkBuiLiT6YmGiMP4o1QZTwDyC1UR80PBKC+mjUaOPvh2Il0Woi+GCM8UHrDxQToQUCiiIYMUbZKi1pl/XhnGE2lzN35+5ud1fiN5nc7cw5c8/3zjkzZ2YKYcwD+oEvgL+1jAJbgVyKXkvhKuA7oBQo3wKdTbMuEvPwJA4CvUC7lvXAuLZ9Q4uPzCOIoWPAYqN9MZ7Mww20KzO+RIzsTZG5T2VGG2JRlZhAjGxPkVmkMoWGWBSBOUZdKULvsnobUissImP6vC1Fz7UdqK859cVWZFTGsYO9AzisMlsaaFdm5JB1ogQcQgJ7kZY+PIl9QFuTbIxGJ56MVfYBS5tmXUbkkHXic2QmmwA+Q9yp5UfikkAeGAROADOE3cqVGZV9SXVbAnfgF8JqSgG4veFWJ5DHk3gX6CEuGcyp7AiezMpZsjEKg3gS1eI97ePFulhUJU6oEetq6KNH+/ipLhZVCRfYtewtcvgJoGlwAdsq/VQFK2n8FPg6Qvc54Gck92oJJL9k7Jfdr3JrMurNCqwR+U/ifyKthkuGyNxmG6BYgZza3AV0Acu0/hfgOPAB8D6yeAfRzFlrGZIixWTbRWA3QtREs4j0IefJJWASGAI2AN3AAi3dwAPALmBKZScInLk1g8ijwHmVH0JcqxJWAm/hR2cgKdBoIn1qyDThI9cR7d9Cv+oWSYxMtUSOkZ3Icrw7hUisQw7Ix5EDdQvufLpA2a3ASa28E7glYNDVwLWJulMqt75M72QFIq/h3SmJhcA7Ze8vAX8Bjwf6GlaZl13FjoSyReQ34I9E3X5DZ3sKiRXI7DSJHRPPax8vIPub64GntO5+Q74LmQBm0Om6DdiJfOFfA0SsOkekoLo7SV+X+gmPBsBp4HujfgQ5krLggt9006xE1hCHD1V+Q6B9Evua4grCu9eN2udeq3G2iLij1mSsOXyEzESPEb9b7dY+D1mN9SByI/AqMrNNal1B5RcGjMoDX6nMaeB1ZDGcH+ZBO969L0KtRDYB58p0nF4lIiD3LjcjE9AosmieAu5tNJFV+FRiCFiNXwsquZaF65A7mLPITXMSF1yr3mn8NsTwYWRkDiCjA/CDPq3AXQ08wcX7/8NIzMwHbjX0evR5rJ5EupBZZBp40mjfo08r4esAnsa+JTuvz3NGm+trj9FWtWu9rX+/aXWKpCcziOslj1bnICnJcWBtWf2VwCdIDCxJ6OS1r2n8/iWaiFU2A2/o7ynEb0N4ReV2GW03AEe0/Sjwoxr5J7LhSmK3yg6GXpaViCtngYdSSIAErDsw7zfa25CrvoPA7ypzuSE3oH2cIeXmLCuRMeBZ4JoKJBx68Wm8RQbS0/gBxEWLwD1pL5qtlT1pTFH1h0nZvpYhj3enIuGPcAFu6N2QdeCJ3KR1C/Dpf+xIJNGLXySnkARwI7IWua3uKuBBhKxbZM8Ad8e8wGWUMWWM2v4LohPZT8QcPkwjgR19m7xEybiv9Q/yRZ5BArCEfJ2PSZ+hsmA5korvRaZhd4s8jqwRWwhMsQ7/AvFI7LQ18IE+AAAAAElFTkSuQmCC"});
    let save = this.buildRComponent({id: this.id + 'Save', disabled: ! this.isValidToSave(), handler: this.handleSave.bind(this)}, p => new SaveButton(p));
    let back = this.buildRComponent({id: this.id + 'Back', handler: this.handleBack.bind(this)}, p => new BackButton(p));
    let actionButtonProps = {id: this.id + 'ActionButtons', className: 'buttons', content: [liability, back, save].join('')};
    let actionButtons = this.fill('simplediv', actionButtonProps);

    this.registerHandler(this.id + 'AmountDir', this.handleDirectionChange.bind(this));
    this.registerHandler(this.id + 'Labels', this.handleLabelChange.bind(this));
    this.registerHandler(this.id + 'Date', this.handleUpdateDate.bind(this));
    this.registerHandler(this.id + 'Amount', this.handleUpdateAmount.bind(this));
    this.registerHandler(this.id + 'Book', this.handleBookChange.bind(this));
    this.registerHandler(this.id + 'Currency', this.handleCurrencyUpdate.bind(this));

    providerProps.autoOptions = [...new Set(this.props.data.map(cf => cf.provider))];

    let containerProps = {
      id: this.id, 
      className: 'page', 
      content: [actionButtons, date, country, amount, buildTb(providerProps), buildTb(descProps), book, labels].join(''),
    };
    return this.fill('container', containerProps);
  }
}