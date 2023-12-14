import { RComponent } from "../framework/RComponent";
import TextField from "../components/textField";
import EntityAPI from "../servers/entity";
import Toast from "../components/toast";
import Div from "../html/div";
import Button from "../html/button";
import Image from "../html/image";

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
  async handleSave() {
    const obj = Object.assign({}, this.props.element);

    obj.dueIn = this.state.dueDate;
    obj.liability = this.state.liability;
    obj.amount = Number.parseFloat(this.state.amount);
    obj.payed = this.state.payed;
    obj.source = this.state.debtor;
    
    try {
      this.saveLiability(obj);
    } catch (ex) {
      this.log('error', ex.message, ex.stackTrace);
    }
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
  
  async saveLiability(updatedLiability) {
    if (updatedLiability && updatedLiability.cashflowId && updatedLiability._id && updatedLiability.elementId) {
      const lApi = new EntityAPI('liability');

      this.log('info', 'saving liability', `CF id: ${updatedLiability.cashflowId.toString()}`);

      await lApi.save(updatedLiability);
      this.log('info', 'Liability object updated', `CF id: ${updatedLiability.cashflowId.toString()}`);
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
    let save = Button('form-button', Image('save'), this.id + 'Save', this.handleSave.bind(this));
    const content = `
    <h2>Update Liability</h2><br />${Div('buttons', [save].join(''), this.id + 'ActionButtons')}<br />
    ${debtor}<br />${amount}<br />
    `;

    //this.registerHandler(this.id + 'Currency', this.handleCurrencyUpdate.bind(this));
    this.registerHandler(this.id + 'Amount', this.handleAmountChange.bind(this));
    this.registerHandler(this.id + 'AmountDir', this.handleDirectionChange.bind(this));
    return Div('liability', content, this.id);
  }
}
