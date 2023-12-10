import './table.css';

const TABLE_CLASS = 'default-table';
const ROW_CLASS = 'default-row';
const COLUMN_CLASS = 'default-column';

const isNotStringOrEmpty = (value) => {
  return value && typeof value !== 'string';
}

const isNotArrayOrEmpty = (value) => {
  return value && Array.isArray(value);
}

function validCall(props, validatePropsFunction, buildFunction) {
  if (typeof validatePropsFunction !== 'function') {
    console.error(`Invalid argument in 'validCall' function: 'validateProps' is not a function.`);
    return '';
  } else if (typeof buildFunction !== 'function') {
    console.error(`Invalid argument in 'validCall' function: 'buildFunction' is not a function.`);
    return '';
  } else if (validatePropsFunction(props)) {

    console.warn(`Received null or invalid props in ${buildFunction.name}.`);
    return '';
  } else {
    return buildFunction(props);
  }
}

const isBasePropsValid = props => {
  return typeof props !== 'object' || 
    isNotStringOrEmpty(props.cssClass);
}

function Div(className, content) {
  return `<div class="${className}">${content}</div>`
}

const isElementPropsValid = (props) => {
  return isBasePropsValid(props) ||
    isNotStringOrEmpty(props.content);
}

function BuildElement({ cssClass, content }) {
  const { cssClass, content } = props;

  return Div(cssClass || COLUMN_CLASS, content || '');
}

function Element(props) {
  return validCall(props, isElementPropsValid, BuildElement);
}

const isArrayPropsValid = (props) => {
  return isBasePropsValid(props.cssClass) ||
    isNotArrayOrEmpty(props.elements);
}

function BuildRow({ cssClass, elements }) {
  const className = cssClass || ROW_CLASS;
  const columnArray = elements || [];

  return Div(className, columnArray.map(r => Element(r)).join(''));
}
function Row(props) {
  return validCall(props, isArrayPropsValid, BuildRow);
}

function BuildTable({ cssClass, elements }) {
  const className = cssClass || TABLE_CLASS;
  const rowArray = elements || [];

  return Div(className, rowArray.map(r => Row(r)).join(''));
}

function Table(props) {
  return validCall(props, isArrayPropsValid, BuildTable);
}

export default Table;