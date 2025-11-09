import React from "react";

export default function Button({ className, children, onClick, disabled }) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}