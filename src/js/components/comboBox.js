import { RComponent } from "../framework/RComponent";

export default class ComboBox extends RComponent {
  // props: {id: string, className: string, data: string[], selected: string, handleChange: function}
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
    }
  }

  handleChange(elem) {
    this.setState({selected: elem.value});
    if (typeof this.props.handleChange === 'function') {
      this.props.handleChange(elem.value);
    }
  }

  render() {
    let props = this.props;
    let state = this.state;
    let comboId = 'cb' + this.id;
    let options = props.data.map(item => `<option${item == state.selected ? " selected" : ""}>${item}</option$>`);

    this.registerHandler(comboId, this.handleChange.bind(this));

    return this.fill('comboBox', {id: this.id, className: props.className, comboId, value: state.selected ? ` value="${state.selected}"` : '', options: options.join('')});
  }
}