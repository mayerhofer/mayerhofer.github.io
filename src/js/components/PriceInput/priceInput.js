import Div from "../../html/div";
import NumberInput from "../../html/numberInput";
import Dropdown from "../dropdown";
import { currencies } from "../../templates";
import Span from "../../html/span";

const state = {
  showCurrencyDropdown: false,
};
const change = () => {
  state.showCurrencyDropdown = !state.showCurrencyDropdown;
}

export default function PriceInput({id, value, currency, handleChange, handleCurrencyChange}) {
  const symbol = Span({
    className: 'span--currency',
    content: currencies[currency],
    click: change,
    diabled: typeof handleCurrencyChange === 'function'
  });
  const price = NumberInput('price', value, id + 'Input', handleChange, "0.01", undefined, "0.01");

  let currencyDropdown = '';
  if (state.showCurrencyDropdown) {
    currencyDropdown = Dropdown({id: id + 'Dropdown', values: Object.values(currencies), freeText: false});
  }

  return Div('row', state.showCurrencyDropdown ? currencyDropdown : symbol + price);
}