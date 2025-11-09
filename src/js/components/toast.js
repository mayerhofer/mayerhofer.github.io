import React from "react";
import useToast from "../hooks/useToast";

const Toast = () => {
  const { toast, hideToast } = useToast();

  if (!toast || !toast.visible) return null;

  const { type = 'info', header = '', text = '' } = toast;

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-header">
        <p>{header}</p>
        <p className="toast-button"><button className="toast-close" onClick={hideToast}>X</button></p>
      </div>
      <div className="toast-details">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Toast;