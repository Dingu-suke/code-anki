// Toast.jsx
import React, { useCallback, useState } from 'react';
import XShareButton from '../../XShare';

export const Toast = ({ message, type, showShareButton = false }) => {
  const baseStyle = "bg-slate-950 text-emerald-400 border border-teal-700";
  
  const typeStyles = {
    success: "bg-slate-900 border-4 border-teal-700 text-emerald-400",
    error: "bg-slate-950 border-red-700 text-red-400"
  };
  
  return (
    <div className="toast toast-top toast-end fixed top-4 right-4 z-[100] font-bold">
      <div className={`alert shadow-lg ${typeStyles[type]} ${baseStyle}`}>
        <div className="flex items-center gap-4">
          <span>{message}</span>
          {showShareButton && (
            <XShareButton />
          )}
        </div>
      </div>
    </div>
  );
};

export const useToast = () => {
  const [toast, setToast] = useState({ 
    show: false, 
    message: '', 
    type: 'success',
    showShareButton: false 
  });

  const showToast = useCallback((message, type = 'success', showShareButton = false) => {
    setToast({ show: true, message, type, showShareButton });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success', showShareButton: false });
    }, 5000);
  }, []);

  return {
    toast,
    showToast
  };
};