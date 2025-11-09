import React from "react";

export default function DateField({id, label, value, onChange}) {
  const inputId = `${id}Input`;
  return (
    <div className="container container-date">
      <div className="datefield">
        <label htmlFor={inputId} className="field-label">{label}</label>
        <input id={inputId} type="datetime-local" maxLength="30" value={value} onChange={onChange} />
      </div>
    </div>
  );
}