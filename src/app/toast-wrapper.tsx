'use client';
import { AlertCircle, CircleCheckBig, XCircle } from 'lucide-react';
import { ToastContainer, TypeOptions } from 'react-toastify';
const ToastWrapper = () => {
  return (
    <ToastContainer
      draggable
      pauseOnHover
      closeOnClick
      icon={({ type }: { type?: TypeOptions }) => {
        const icon =
          type === 'error' ? (
            <XCircle className="w-8 h-6 text-error-400" />
          ) : type === 'warning' ? (
            <AlertCircle className="w-8 h-6 text-warning-400" />
          ) : type === 'success' ? (
            <CircleCheckBig className="w-8 h-6 text-success-400" />
          ) : (
            ''
          );

        return icon;
      }}
      closeButton={false}
      autoClose={5000}
      pauseOnFocusLoss
      newestOnTop={false}
      position="bottom-left"
      toastClassName={
        'z-[1000] !bg-gray-50 !border !border-gray-50 !shadow-md dark:!bg-gray-600 !important !text-gray-900 dark:!text-white'
      }
      // hideProgressBar={true}
    />
  );
};

export default ToastWrapper;
