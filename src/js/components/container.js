import { RComponent } from "../framework/RComponent";

export default class Container extends RComponent {
  // props: {id: string, className: string, content: <props, buildFunc>[]}
  render() {
    let c = this;
    let content = (c.props.content ?? []).map(item => c.buildRComponent(item.props, item.buildFunc)).join('');
    let cProps = Object.assign({}, c.props, {content, id: this.id});

    return this.fill('container', cProps);
  }
}