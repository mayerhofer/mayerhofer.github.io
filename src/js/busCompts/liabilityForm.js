import { RComponent } from "../framework/RComponent";
import TextField from "../components/textField";
import SaveButton from "./saveButton";
import EntityAPI from "../servers/entity";
import Toast from "../components/toast";

export default class LiabilityForm extends RComponent {
  constructor(props) {
    super(props);

    this.state = {
      dueDate: props.element.dueIn,
      liability: props.element.liability,
      amount: props.element.amount,
      payed: props.element.payed,
      debtor: props.element.source,
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
  
  handleDueChange(e) {
    this.setState({dueDate: e.value});
  }
  handleDebtorChange(e) {
    this.setState({debtor: e.value});
  }
  handleAmountChange(e) {
    this.setState({amount: Number.parseFloat(e.value)});
  }
  handlePayedChange(e) {
    this.setState({payed: e.value});
  }
  handleDirectionChange(e) {
    this.setState({liability: e.value !== 'income'});
  }
  handleSave() {
    const obj = Object.assign({}, this.props.element);

    obj.dueIn = this.state.dueDate;
    obj.liability = this.state.liability;
    obj.amount = Number.parseFloat(this.state.amount);
    obj.payed = this.state.payed;
    obj.source = this.state.debtor;
    
    this.saveLiability(obj);
  }

  log(type, header, text) {
    this.buildRComponent(
      {
        type,
        header,
        text,
        id: this.id + 'Toast'
      }, p => new Toast(p));
  }
  
  saveLiability(updatedLiability) {
    try {
      if (updatedLiability && updatedLiability.cashflowId && updatedLiability._id) {
        const lApi = new EntityAPI('liability');

        this.log('info', 'saving liability', `CF id: ${updatedLiability.cashflowId.toString()}`);

        lApi.update(updatedLiability);
        this.log('info', 'Liability object updated', `CF id: ${updatedLiability.cashflowId.toString()}`);
      };
    } catch (ex) {
      this.log('error', ex.message, ex.stackTrace);
    }
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
    const amountProps = {
      id: this.id + 'Amount',
      expenseChecked: this.state.liability ? 'checked' : '', 
      incomeChecked: this.state.liability ? '' : 'checked',
      value: this.state.amount,
      label: 'Amount',
    };
    const amount = this.fill('amountLiability', amountProps);
    const debtor = buildTb(buildProps('Debtor'));
    let save = this.buildRComponent({id: this.id + 'Save', handler: this.handleSave.bind(this)}, p => new SaveButton(p));
    const actionButtonProps = {id: this.id + 'ActionButtons', className: 'buttons', content: [save].join('')};
    const content = `
    <h2>Update Liability</h2><br />${this.fill('simplediv', actionButtonProps)}<br />
    ${debtor}<br />${amount}<br />
    `;

    //this.registerHandler(this.id + 'Currency', this.handleCurrencyUpdate.bind(this));
    this.registerHandler(this.id + 'Amount', this.handleAmountChange.bind(this));
    this.registerHandler(this.id + 'AmountDir', this.handleDirectionChange.bind(this));
    return this.fill('div', {id: this.id, className: 'liability', content});
  }
}
