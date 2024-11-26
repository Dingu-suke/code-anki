import React from 'react';
import { useState, useCallback } from 'react';

// トースト表示用のコンポーネント
export const Toast = ({ message, type }) => {
  const baseStyle = "bg-slate-950 text-emerald-400 border border-teal-700";
  
  const typeStyles = {
    success: "bg-slate-900 border-4 border-teal-700 text-emerald-400",
    error: "bg-slate-950 border-red-700 text-red-400"
  };
  
  return (
    <div className="toast toast-top toast-end fixed top-4 right-4 z-[100] font-bold pr-10">
      <div className={`alert shadow-lg ${typeStyles[type]} ${baseStyle}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

// トースト制御用のカスタムフック
export const useToast = () => {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  }, []);

  return {
    toast,
    showToast
  };
};