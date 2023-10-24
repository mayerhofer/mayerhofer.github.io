import { RComponent } from "../framework/RComponent";

export default class BackButton extends RComponent {
  render() {
    this.registerHandler(this.id, this.props.handler);

    return this.fill('imgButton',
    {
      id: this.id,
      disabled: '',
      class name: 'financeSave',
      img: "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO2WvUoDQRSFv5ewUBOxtIiVKfUBBA0+R0zis9gpBgtLe3/eJCv2inZu7ExQFm4giDN75u5GUuTAKXaZ4eP+zJ2BlZZQW0AfeAQy4NOc2b8e0KwTuAlcAhPgu8RT4BbYrgo9AcYC8LdzoOOFnlkEqdD56AeeSKcVoPNwOfKGM72xtG8o4OsaoTNfKUemrHvfgD1gPwE8sUwG1RegLVvbToz6NAZ+EKEt+04B38XAz4FN78CurdkBXh11zmLgPLCpqKmqUO3zRYMPPOAnMdUvjlSPlrK5egs8Tt0YuCkOkHakln/5q2yAFBo66lfmC8SLP9TdHn8A64g6FF8cyrV4rEJnGtTwEChmv0sdZ9qL9B5RUWvAuXWmEuVNSk0VNexqu7cpNDaPbDh0lSOzEv+tH+YHlQGe3ZAGAAAAAElFTkSuQmCC"
    });
  }
}
