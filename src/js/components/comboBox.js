import React, { useState } from "react";

// props: {id: string, className: string, data: string[], selected: string, handleChange: function}
export default function ComboBox({ id, className, data = [], selected, handleChange }) {
  const [value, setValue] = useState(selected || "");

  const onChange = (e) => {
    setValue(e.target.value);
    if (typeof handleChange === "function") {
      handleChange(e.target.value);
    }
  };

  return (
    <select
      id={id}
      className={className}
      value={value}
      onChange={onChange}
    >
      {data.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}