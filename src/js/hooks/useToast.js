import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ visible: false, type: 'info', header: '', text: '' });

  const showToast = useCallback(({ type = 'info', header = '', text = '', timeout = 5000 } = {}) => {
    setToast({ visible: true, type, header, text });
    if (typeof timeout === 'number' && timeout > 0) {
      setTimeout(() => setToast(prev => ({ ...prev, visible: false })), timeout);
    }
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  // Provide a minimal global shim for legacy code that used `new Toast(...)` or similar.
  // Expose a global showToast function so non-React code can trigger toasts.
  if (typeof window !== 'undefined') {
    window.showToast = (opts) => showToast(opts);
    // Legacy code sometimes does `new Toast({...}).render()` - provide a small shim
    window.Toast = function (opts = {}) {
      return {
        render: () => showToast(opts),
        hide: () => hideToast(),
      };
    };
  }

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
