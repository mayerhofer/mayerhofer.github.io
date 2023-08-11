import { RComponent } from "../framework/RComponent";

export default class Button extends RComponent {
  // props: {id, className, content, clickHandler}
  handleClick(e) {
    if (typeof this.props.handleClick === 'function') {
      this.props.handleClick();
    }
  }

  render() {
    this.registerHandler(this.id, this.handleClick.bind(this));

    return this.fill('button', Object.assign({}, this.props, {id: this.id}));
  }
}