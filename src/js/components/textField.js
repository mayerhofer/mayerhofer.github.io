import { RComponent } from "../framework/RComponent";

export default class TextField extends RComponent {
  // props = {label: 'Provider', value: provider.value, validDef: {restricted: false, required: true, options: []}}
  constructor(props) {
    super(props);
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
    const fieldProps = {
      id: prefix,
      label: this.props.label,
      ...this.state,
    };

    this.registerHandler(prefix + 'Change', this.handleUpdate.bind(this));
    
    return this.fill('textField', fieldProps);
  }
}