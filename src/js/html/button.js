import { application } from "../framework/RComponent";

export default function Button(className, content, id, clickHandler, isDisabled) {
  const onClick = `window.application.callHandler(this,\'${id}\')`;
  const disabled = isDisabled ? ' disabled' : '';

  application.handlers[id] = clickHandler;

  return `<button id="${id}" type="button" class="${className}" onClick="${onClick}"${disabled}>${content}</button>`;
}