import { RComponent } from "../framework/RComponent";
import { currencies } from "../templates";
import TextField from "../components/textField";
import Div from "../html/div";
import Button from "../html/button";

export default class LiabilityModal extends RComponent {
  constructor(props) {
    super(props);

    this.state = {
      liability: true,
      amount: this.props.amount ? this.props.amount : 10,
      currency: props.currency,
      debtor: 'Cris Carnaval',
      validationState: {
        debtor: {
          validDef: {
            required: true,
            restricted: false,
          }
        }
      }
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.currency !== nextProps.currency
      || this.state.amount !== nextState.amount;
  }
  getDerivedState(props) {
    const shouldUpdateAmount = props.amount > 0 && this.props.amount !== props.amount;
    return {
      liability: this.state.liability,
      amount: shouldUpdateAmount ? (this.state.liability ? props.amount : props.amount / 2) : this.state.amount,
      currency: props.currency,
      debtor: this.state.debtor,
      validationState: {
        debtor: {
          validDef: {
            required: true,
            restricted: false,
          }
        }
      }
    };
  }
  handleDebtorChange(e) {
    this.setState({debtor: e.value});
  }
  handleCurrencyUpdate(e) {
    this.setState({currency: e.value});
  }
  handleAmountChange(e) {
    this.setState({amount: e.value});
  }
  handleDirectionChange(e) {
    let liability = e.value !== 'income';
    this.setState({liability, amount: liability ? this.props.amount : (this.props.amount / 2) });
  }
  handleSave() {
    let dt = new Date();
    const obj = {
      dueIn: Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()),
      source: this.state.debtor,
      liability: this.state.liability,
      amount: Number.parseFloat(this.state.amount),
      currency: this.state.currency,
      cashflowId: -1,
      elementId: -1,
      payed: false,
      updated: dt.getTime()
    };
    this.props.addLiability(obj);
  }
  render() {
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
    const buildCurrProps = key => {
      return {
        id: this.id + 'Currency',
        value: key,
        label: currencies[key],
        checked: this.state.currency === key ? ' checked' : '',
      };
    };
    const currencyList = 
      Object.keys(currencies)
      .map(key => this.fill('radioField', buildCurrProps(key)))
      .join('');
    const amountProps = {
      id: this.id + 'Amount',
      expenseChecked: this.state.liability ? 'checked' : '', 
      incomeChecked: this.state.liability ? '' : 'checked',
      currency: currencies[this.state.currency] ?? '?',
      value: this.state.amount,
      label: 'Amount',
      currencyList,
    };
    const amount = this.fill('amountField', amountProps);
    const debtor = buildTb(buildProps('Debtor'));
    const button = Button('table__header-add', '<span>+</span>', 'AddNewLiability', this.handleSave.bind(this));
    const header = Div('table__header', button);
    const content = `
    <h1>Add Liability</h1><br />${header}<br />
    ${debtor}<br />${amount}<br />
    `;
    
    this.registerHandler(this.id + 'Currency', this.handleCurrencyUpdate.bind(this));
    this.registerHandler(this.id + 'Amount', this.handleAmountChange.bind(this));
    this.registerHandler(this.id + 'AmountDir', this.handleDirectionChange.bind(this));
    return Div('liability', content, this.id);
  }
}