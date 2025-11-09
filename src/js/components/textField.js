import React, { useState, useEffect } from "react";

// props = {label: 'Provider', value: provider.value, validDef: {restricted: false, required: true, options: []}, autoOptions: []}
export default function TextField({ label, value: initialValue, validDef = {}, update, autoOptions = [], id }) {
  const [value, setValue] = useState(initialValue || "");
  const [validationMessage, setValidationMessage] = useState("");
  const [invalid, setInvalid] = useState("");
  const [invalidDiv, setInvalidDiv] = useState("");
  const [hideError, setHideError] = useState(" hide");

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  const handleValidation = (val) => {
    const isFieldEmpty = typeof val !== 'string' || val.trim().length <= 0;
    const hasValue = !isFieldEmpty;
    const isInOptions = validDef.options ? validDef.options.indexOf(val) >= 0 : false;
    const bIsValid = validDef.restricted ? isInOptions : (validDef.required ? hasValue : true);

    setHideError(bIsValid ? ' hide' : '');
    setInvalid(bIsValid ? '' : 'text-red');
    setInvalidDiv(bIsValid ? '' : 'border-red');
    setValidationMessage(bIsValid ? '' : (isFieldEmpty ? '* Required Field' : '* Not a valid option.'));
  };

  const handleUpdate = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (typeof update === 'function') {
      update(newValue);
    }
    handleValidation(newValue);
  };

  return (
    <div className={`textfield ${invalidDiv}`} id={id}>
      <label className="field-label" htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        value={value}
        placeholder={label}
        className={invalid}
        list={autoOptions.length > 0 ? id + 'DataList' : undefined}
        onChange={handleUpdate}
      />
      {autoOptions.length > 0 && (
        <datalist id={id + 'DataList'}>
          {autoOptions.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      )}
      <div className={`validation-message${hideError}`}>{validationMessage}</div>
    </div>
  );
}