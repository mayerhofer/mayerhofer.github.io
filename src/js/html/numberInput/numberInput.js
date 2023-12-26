import { application } from "../../framework/RComponent";

const prop = (p,v) => v?`${p}=${v}`:'';

export default function NumberInput(className, value, id, handleChange, min, max, step, isDisabled) {
  const disabled = isDisabled ? ' disabled' : '';
  const idText = prop('id', id);
  const minText = prop('min', min);
  const maxText = prop('max', max);
  const stepText = prop('step', step);

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
  type="number"
  ${minText}
  ${maxText}
  ${stepText}
  ${changeProp}
  value="${value}" />`;
}
