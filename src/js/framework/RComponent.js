import { components } from "../templates";

// Global
export const application = {
  state: {},
  registeredComponents: {},
  handlers: {},
  virtualDom: undefined,
  callHandler: function(event, id) {
    let handler = application.handlers[id];
    if (typeof handler === 'function') {
      handler(event);
    }
  },
};
// End Global

// Framework
// Framework - Virtual DOM
// Function "Secret Sauce" to replace page elements instead of asking browser to rewrite the page.
// It transform render HTML text into HTMLElements for a call to child replace.
// Avoids overuse of the innerHTML property and/or the need to re-render siblings.
const parseHtmlToElement = function(id, str) {
  let start = str.substring(str.indexOf('<') + 1);
  let tag = start.substring(0, start.indexOf(' '));
  let element = window.document.createElement(tag);
  let endInx = Math.min(start.indexOf('>'), start.indexOf('/>') < 0 ? start.indexOf('>') : start.indexOf('/>'));
  let propsStartInx = start.indexOf(' ') + 1;
  let childrenEnd = str.lastIndexOf(`</${tag}>`);
  let childrenStart = str.indexOf('>') + 1;

  // Mandatory uppon updating (re-rendering)
  element.setAttribute('id', id);

  // Read main tag properties
  if (propsStartInx < endInx) {
    // TODO: Fix a bug -> some property values could have spaces inside them breaking the parsed result
    // For now I removed empty space from params in handler call from Button, but please fix the split below.
    let props = start.substring(propsStartInx, endInx).split(' ').reduce((previous, kvp) => {
      let propName = kvp.substring(0, kvp.indexOf('='));
      let propValue = kvp.substring(kvp.indexOf('=') + 1);
      let result = {};
      result[propName] = propValue;
      return Object.assign(previous, result);
    }, {});

    let keys = Object.keys(props);
    keys.forEach(key => {
      if (key === 'class') {
        element.className = props[key].split('"')[1];
      } else if (key && key != 'id') {
        element.setAttribute(key, props[key].split('"')[1]);
      }
    });
  }

  // Read children if any
  if (childrenEnd > 0 && childrenStart < childrenEnd) {
    element.innerHTML = str.substring(childrenStart, childrenEnd);
  }

  return element;
}
class TreeNode {
  constructor(value, ancestral) {
    if (typeof value !== 'object' || !(value instanceof RComponent)) {
      throw 'Argument "value" must be an instance of a class that extends RComponent.';
    }
    if (value.id === 'app' && ancestral) {
      throw 'Argument "ancestral" must be null/undefined when node is the root element.';
    }
    if (value.id !== 'app' && !(ancestral instanceof TreeNode)) {
      throw 'Argument "ancestral" must be instance of TreeNode/Component. Element id: ' + value.props.id;
    }
    this.value = value;
    // Any components being rendered by the value component. All should be TreeNode instances.
    this.descendants = [];
    // Component that renders the value component. Should be TreeNode instance.
    this.ancestral = ancestral; // Can be null if value is Root Component.
    // Property to store virtual DOM.
    this.virtualDom = '';
  }

  static initialized() {
    let root = application.registeredComponents['app'];
    if (! root) {
      // Build And Register Root
      root = application.registeredComponents['app'] = new TreeNode(new App({id: 'app'}));
    }

    return root;
  }

  static getRegistered(id) {
    return application.registeredComponents[id] ?? false;
  }

  addDescendant(node) {
    if (node instanceof TreeNode) {
      this.descendants.push(node);
    } else {
      throw 'Argument "node" (descendant) must be of type TreeNode.';
    }
  }

  releaseDescendants() {
    let item = this.descendants.pop();
    while (item) {
      item.value.unmount();

      item = this.descendants.pop();
    }
  }

  hasDescendant() {
    return this.descendants.length > 0;
  }

  findDescendant(id) {
    let found = null;
    if (Array.isArray(this.descendants)) {
      for (let i=0; i<this.descendants.length; i++) {
        if (this.descendants[i].value.id.startsWith(id, 0)) {
          found = this.descendants[i];
          break;
        }
      }
    }

    return found;
  }

  register() {
    if (this.ancestral) {
      this.ancestral.addDescendant(this);
    }

    if (typeof this.value.props.id === 'string' && this.value.props.id.trim().length > 0) {
      // TODO: This can still generate repeated ids, change this solution for IDs.
      this.value.id = this.value.props.id + '_' + (Math.random()*100000).toFixed();
      application.registeredComponents[this.value.id] = this;
    } else {
      throw 'Invalid RComponent: property id is missing or invalid.';
    }
  }

  unregister() {
    if (typeof this.value.id === 'string' && this.value.id.trim().length > 0) {
      if (application.registeredComponents[this.value.id]) {
        delete application.registeredComponents[this.value.id];
      }
    } else {
      throw 'Invalid RComponent: property id is missing or invalid.';
    }
  }
}
// End Framework - Virtual DOM
// Framework - React Like Components (BASE Component Class)
export class RComponent {
  constructor(props) {
    this.props = props;
  }

  static compare(prevState, nextState) {
    if (prevState === nextState) {
      return true;
    } else if (typeof prevState !== typeof nextState || Array.isArray(nextState) !== Array.isArray(prevState)) {
      return false;
    } else if (Array.isArray(nextState)) {
      if (nextState.length !== prevState.length) {
        return false;
      } else if (nextState.length <= 0) {
        return true;
      }
      for (let i=0; i<nextState.length; i++) {
        if (! RComponent.compare(prevState[i], nextState[i])) {
          return false;
        }
      }
    } else if (typeof nextState === 'object' && nextState instanceof Date && prevState instanceof Date) {
      return nextState.getTime() === prevState.getTime();
    } else if (typeof nextState === 'object') {
      const keys = Object.keys(nextState);

      for (let i=0; i<keys.length; i++) {
        if (! RComponent.compare(prevState[keys[i]], nextState[keys[i]])) {
          return false;
        }
      }
    } else if (prevState !== nextState) {
      return false;
    }
    return true;
  }

  static build(treeParent, props, buildFunc) {
    if (typeof treeParent !== 'object' || !(treeParent instanceof TreeNode)) {
      throw 'Method "build", argument "treeParent" missing. Id: ' + (props ? props.id : '');
    }
    if (typeof props !== 'object') {
      throw 'Method "build", argument "props" missing. ParentId: ' + (treeParent ? treeParent.value.id : '');
    }
    if (typeof buildFunc !== 'function') {
      throw 'Method "build", argument "buildFunc" missing. Id: ' + props.id;
    }
    // Find current node to add future child/descendant component in Tree.
    const found = treeParent.findDescendant(props.id);
    if (found) {
      // Always update new props
      const oldProps = found.value.props;

      // If rule exist or if there a real difference, re-render.
      if (!RComponent.compare(oldProps, props)) {
        if (found.value.getDerivedState) {
          found.value.state = found.value.getDerivedState(props);
        }

        // Check client rule for if should re-render
        if (typeof found.value.shouldComponentUpdate !== 'function' ||
          found.value.shouldComponentUpdate(props, found.value.state)) {

          found.value.props = props;
          found.virtualDom = found.value.render();
        } else {
          found.value.props = props;
        }
      }

      // return previously rendered from Tree.
      return found.virtualDom;
    } else {
      // New instance: build and mount component.
      const comp = buildFunc(props);
      const rendered = comp.mount(treeParent);

      // After mounting, return rendered HTML.
      return rendered;
    }
  }

  static buildRoot(props, buildFunc) {
    const tNode = TreeNode.initialized();
    const htmlRoot = window.document.getElementById('app');

    if (tNode.hasDescendant()) {
      let leafToFall = tNode.descendants.pop();
      leafToFall.value.unmount();
    }

    htmlRoot.innerHTML = RComponent.build(tNode, props, buildFunc);
  }

  buildRComponent(props, buildFunc) {
    const tNode = TreeNode.getRegistered(this.id);

    return RComponent.build(tNode, props, buildFunc);
  }

  setState(nextState) {
    // Unmounted components must not update, re-render or have any page interaction.
    if (this.unmounted) {
      return;
    }
    if (nextState == null || typeof nextState === 'undefined'){
      return;
    }
    if (! RComponent.compare(this.state, nextState)) {
      let newState;
      
      if (typeof nextState === 'object') {
        newState = Object.assign({}, this.state, nextState);
      } else if (typeof nextState === 'function') {
        newState = nextState(this.state, this.props);
      } else {
        throw 'Argumento (nextState) invalido.';
      }

      if (typeof this.shouldComponentUpdate !== 'function' ||
          this.shouldComponentUpdate(this.props, newState)) {

        console.log('New state for', this.id, newState);
        this.state = newState;

        // Trigger re-render
        this.update();
      } else {
        console.log('New state for', this.id, newState);
        this.state = newState;
      }
    }
  }
  mount(ancestral) {
    // Register component in Tree.
    let node = null;
    if (this.id || ! (node = TreeNode.getRegistered(this.id))) {
      this.id = this.props.id;
      node = new TreeNode(this, ancestral);
      node.register();
    }

    // Trigger component lifecycle method if implemented.
    if (typeof this.componentDidMount === 'function') {
      this.componentDidMount();
    }

    // Render through Virtual DOM
    node.virtualDom = this.render()
    return node.virtualDom;
  }
  update() {
    const child = window.document.getElementById(this.id);

    if (typeof child === 'object' && child instanceof HTMLElement) {
      const htmlParent = child.parentElement;

      if (htmlParent) {
        //tNode.releaseDescendants();
        var node = TreeNode.getRegistered(this.id);
        node.virtualDom = this.render();

        const newNode = parseHtmlToElement(this.id, node.virtualDom);
        htmlParent.replaceChild(newNode, child);
      } else {
        throw `Parent html element not found for child (${this.id}).`;
      }
    } else {
      throw `Child to be replaced upon update is not a HTMLElement. Child id (${this.id}).`;
    }
  }
  unmount() {
    // Mark unmounted to disable component activites
    this.unmounted = true;

    // Trigger component lifecycle method
    if (typeof this.componentWillUnmount !== 'function' || this.componentWillUnmount()) {
      const tNode = TreeNode.getRegistered(this.id);
      if (tNode instanceof TreeNode) {
        tNode.releaseDescendants();
        tNode.unregister();
      } else {
        throw 'Found an item not a TreeNode in Tree';
      }
    }
  }
  registerHandler(id, callback) {
    application.handlers[id] = callback;
  }
  fill(itemTemplate, data) {
    let temp = components[itemTemplate] ?? itemTemplate;
    let inx = temp.indexOf('{');
    while(inx>=0) {
      let end = temp.indexOf('}');
      let prop = temp.substring(inx + 1, end);

      temp = temp.replace('{' + prop + '}', data[prop.substring(prop.indexOf('.') +1)]);

      inx = temp.indexOf('{');
    }
    return temp;
  }
}

class App extends RComponent {
  constructor(props) {
    super(props);

    // App should not mount, nor render.
    // Id should stay as 'app'.
    // Class was made in order to reuse UPDATE and BUILDRCOMPONENT methods.
    this.id = 'app';
  }
}
