import { RComponent } from "../framework/RComponent";

export default class TextField extends RComponent {
  // props = {label: 'Provider', value: provider.value, validDef: {restricted: false, required: true, options: []}}
  constructor(props) {
    super(props);
    
    this.state = {
      hideError: ' hide',
      invalidDiv: '',
      invalid: '',
      validationMessage: '',
      placeholder: props.label,
      value: props.value,
    };
  }
  getDerivedState(props) {
    this.state = {
      hideError: ' hide',
      invalidDiv: '',
      invalid: '',
      validationMessage: '',
      placeholder: props.label,
      value: props.value,
    };
    return this.state;
  }
  handleValidation(val) {
    const props = this.props.validDef;
    const isFieldEmpty = typeof val !== 'string' || val.trim().length <= 0;
    const hasValue = ! isFieldEmpty;
    const isInOptions = props.options ? props.options.indexOf(val) >= 0 : false;
    const bIsValid = props.restricted ? isInOptions : (props.required ? hasValue : true);
    const newState = {...this.state};
    
    newState.hideError = bIsValid ? ' hide' : '';
    newState.invalid = bIsValid ? '' : 'text-red';
    newState.invalidDiv = bIsValid ? '' : 'border-red';
    newState.validationMessage = bIsValid ? '' : (isFieldEmpty ? '* Required Field' : '* Not a valid option.');
    newState.value = val;

    this.setState(newState);
  }
  handleUpdate(e) {
    let newValue = e.value;

    this.props.update(newValue);
    this.handleValidation(newValue);
  }
  render() {
    const prefix = this.id;
    const textValue = this.state.value;
    const autoOptions = this.props.autoOptions ?
      this.props.autoOptions.map(item => `<option${item == textValue ? " selected" : ""}>${item}</option$>`) :
      null;
    const dataList = autoOptions ? 
      this.fill('dataList', {id: prefix + 'DataList', options: autoOptions.join('')}) : '';
    const fieldProps = {
      id: prefix,
      label: this.props.label,
      listId: prefix + 'DataList',
      dataList,
      ...this.state,
    };

    this.registerHandler(prefix + 'Change', this.handleUpdate.bind(this));
    
    return this.fill('textField', fieldProps);
  }
}