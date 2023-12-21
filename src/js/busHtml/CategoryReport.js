import Button from "../html/button";
import Div from "../html/div";
import Image from "../html/image";

const getStatusClass = value => {
  if (typeof value === 'number') {
    if (value > 0) {
      return " income";
    }
  }
  return "";
}

const buildHeder = row => {
  const title = Div('cashflowProvider', row.provider);
  const m0 =  Div('cashflowAmount' + getStatusClass(row.amount), row.amount);
  const m1 = Div('cashflowAmount', row.qtyCfs);

  return Div('table__row', title + m0 + m1);
};
const buildRow = (data, provider) => {
  const title = Div('cashflowProvider', provider);
  const m0 =  Div('cashflowAmount' + getStatusClass(data[provider].amount), data[provider].amount);
  const m1 = Div('cashflowAmount', data[provider].qty);

  return Div('table__row', title + m0 + m1);
};

export default function CategoryReport({data, handleClose}) {
  const headerData = {
    provider: 'PROVIDERS',
    amount: '$',
    qtyCfs: 'N.',
  };
  const closeButton = Button('table__header-add', Image('close'), 'CloseBtnCategReport', handleClose)
  const buttons = Div('table__header', closeButton);
  const header = buildHeder(headerData);

  const rows = Object.keys(data).map(key => buildRow(data, key));

  return Div('div--scrollable table__wrapper', buttons + header + rows.join(''));
}
