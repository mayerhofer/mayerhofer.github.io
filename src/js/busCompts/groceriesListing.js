import Button from "../html/button";
import TextInput from "../html/textInput";
import Table from "../components/table";
import { RComponent } from "../framework/RComponent";
import PriceInput from "../components/PriceInput";
import Div from "../html/div";

const mapItemToCellPropsArray = stockItem => {
  return [
    {
      className: 'table__cell table__cell--text',
      value: stockItem.description,
    },
    {
      className: 'table__cell table__cell--number',
      value: stockItem.qty,
    },
    {
      className: 'table__cell table__cell--unit',
      value: stockItem.qtyUnit,
    },
    {
      className: 'table__cell table__cell--money',
      value: stockItem.price,
    },
    {
      className: 'table__cell table__cell--currency',
      value: stockItem.currency,
    },
  ];
};

class AddGrocery extends RComponent {
  constructor(props) {
    super(props);

    // (id, handleAdd, handleClose)
    this.state = {
      price: 1,
      qty: 1,
      currency: 'EUR',
      description: '',
    };
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }
  handlePriceChange(e) {
    this.setState({price: e.target.value});
  }

  render() {
    const description = TextInput('textfield', this.state.description, this.id + 'Desc', this.handleDescriptionChange.bind(this), false, "Item's description...");
    //const qty = new NumberField('span');
    const unitPrice = PriceInput({id: this.id + 'Price', value: this.state.price, currency: this.state.currency, handleChange: this.handlePriceChange.bind(this)});
    const btnConfirm = Button('dropdown__button--confirm', ' ', this.id + 'Add', this.props.handleAdd);
    const btnCancel = Button('dropdown__button--cancel', ' ', this.id + 'Close', this.props.handleClose);

    return Div('col', description + Div('row', unitPrice + btnConfirm + btnCancel));
  }
}

const buildNewState = props => {
  return {
    arrayItems: props.arrayItems,
  };
};

export default class GroceriesListing extends RComponent {
  constructor(props) {
    super(props);

    this.state = buildNewState(props);
  }

  getDerivedState(props) {
    return Object.assign({}, this.state, buildNewState(props));
  }

  add(item) {
    this.state.arrayItems.push(item);
    this.setState({arrayItems: arrayItems});
  }

  close() {
    this.props.handleClose(this.state.arrayItems);
  }

  render() {
    const items = this.state.arrayItems.map(mapItemToCellPropsArray);

    const table = Table({className: 'table', elements: items});
    
    const addProps = {
      id: this.id + 'Add',
      handleAdd: this.add.bind(this),
      handleClose: this.close.bind(this),
    };
    const addItem = this.buildRComponent(addProps, p => new AddGrocery(p));

    return Div('page', table + addItem, this.id);
  }
}