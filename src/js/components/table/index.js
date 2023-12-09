import './table.css';

const TABLE_CLASS = 'default-table';
const ROW_CLASS = 'default-row';
const COLUMN_CLASS = 'default-column';

function Column(props) {
  return `<div class="${props.cssClass || COLUMN_CLASS}">${props.content}</div>`;
}

function Row(props) {
  const rowClass = props.cssClass || ROW_CLASS;
  const columns = props.columns.map(c => Column(c)).join('');

  return `<div class="${rowClass}">${columns}</div>`;
}

export default function Table(props) {
  const tableClass = props.tableClass || TABLE_CLASS;
  const rows = props.rows.map(r => Row(r)).join('');

  return `<div class="${tableClass}">${rows}</div>`;
}

