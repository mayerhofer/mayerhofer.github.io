import Backdrop from "../../html/backdrop/backdrop";
import Button from "../../html/button";
import TextInput from "../../html/textInput";

export default function Dropdown({id, values, freeText, handleAdd, handleClose, handleChange}) {
  const btnConfirm = Button('dropdown__button--confirm', ' ', id + 'Add', handleAdd);
  const btnCancel = Button('dropdown__button--cancel', ' ', id + 'Close', handleClose);
  const freeInput = TextInput('dropdown__input', freeText, id, handleChange);

  return `
    ${Backdrop()}

    <div class="dropdown">
      <div class="dropdown__content">
        <ul>
          ${values.map(item => `<li class="dropdown__option">${item}</li>`).join('')}
        </ul>
        ${freeInput}
        ${btnConfirm}
        ${btnCancel}
      </div>
    </div>`;
}
