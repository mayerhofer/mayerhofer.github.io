import { application } from "../framework/RComponent";

export default function TextInput(className, value, id, handleChange, isDisabled, placeholder) {
  const disabled = isDisabled ? ' disabled' : '';
  const idText = id ? `id="${id}" `: '';

  let changeProp = '';
  if (typeof handleChange === 'function') {
    const onChange = `window.application.callHandler(this,\'${id}Change\');`;
    changeProp = `onchange="${onChange}" onblur="${onChange}"`;

    application.handlers[id + 'Change'] = handleChange;
  }

  return `
    <input 
      ${idText}
      class="${className}"
      ${disabled}
      type="text"
      maxlength="30"
      placeholder="${placeholder}"
      ${changeProp}
      value="${value}" />
  `;
}