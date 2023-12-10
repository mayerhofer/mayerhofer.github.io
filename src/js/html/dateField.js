import { application } from "../framework/RComponent";

export default function DateField(id, label, value, onChange) {
  const onChangeEvent = `window.application.callHandler(this, '${id}')`;
  
  application.handlers[id] = onChange;

  return `
  <div id="${id}" class="container container-date">
    <div class="datefield">
      <label for="${id}Input" class="field-label">${label}</label>
      <input id="${id}Input" type="datetime-local" maxlength="30" value="${value}" onchange="${onChangeEvent}" />
    </div>
  </div>`;
}