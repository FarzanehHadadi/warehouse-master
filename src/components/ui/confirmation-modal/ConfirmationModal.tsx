// 'use client';
// import React, { useRef, useEffect } from 'react';
// import Typography from '../typography/Typography';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   className?: string;
//   children: React.ReactNode;
//   isFullscreen?: boolean; // Default to false for backwards compatibility
// }

// export const ConfirmationModal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   children,
//   className,
//   isFullscreen = false,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('keydown', handleEscape);
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, [isOpen, onClose]);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const contentClasses = isFullscreen
//     ? 'w-full h-full'
//     : 'relative w-full rounded-3xl bg-gray-200  dark:bg-gray-700';

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999"
//       dir="rtl"
//     >
//       {!isFullscreen && (
//         <div
//           className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[2px]"
//           onClick={onClose}
//         ></div>
//       )}
//       <div
//         ref={modalRef}
//         className={`p-4 ${contentClasses}  ${className}`}
//         onClick={(e) => e.stopPropagation()}
//       >

//         <div>{children}</div>
//       </div>
//     </div>
//   );
// };
'use client';
import React, { useRef, useEffect } from 'react';
import Typography from '../typography/Typography';
import Button from '../button/Button';
import { XCircle, Trash2, Check, AlertOctagon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  className?: string;
  isFullscreen?: boolean;
  message: string;
  buttonType: 'ok' | 'okCancel' | 'yesNo';
  modalType: 'success' | 'warning' | 'error' | 'delete';
  loading?: boolean;
}

export const ConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  className = '',
  isFullscreen = false,
  message,
  buttonType,
  modalType,
  onConfirm,
  loading = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? 'w-full h-full'
    : 'relative w-full max-w-[400px] rounded-3xl bg-gray-200 dark:bg-gray-700';

  // Determine icon and color based on modalType
  const getIconAndColor = () => {
    switch (modalType) {
      case 'success':
        return {
          icon: (
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success-100">
              <Check size={24} className="text-success-400" />
            </div>
          ),
          color: 'text-success-400',
        };
      case 'warning':
        return {
          icon: (
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warning-100">
              <AlertOctagon size={24} className="text-warning-400" />
            </div>
          ),
          color: 'text-warning-400',
        };
      case 'error':
        return {
          icon: (
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-error-100">
              <XCircle size={24} className="text-error-400" />
            </div>
          ),
          color: 'text-error-400',
        };
      case 'delete':
        return {
          icon: (
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-error-100">
              <Trash2 size={24} className="text-error-400" />
            </div>
          ),
          color: 'text-error-400',
        };
      default:
        return { icon: null, color: 'text-gray-900 dark:text-gray-100' };
    }
  };

  const { icon, color } = getIconAndColor();

  // Determine button configuration based on buttonType
  const getButtons = () => {
    const isDelete = modalType === 'delete' || modalType === 'error'; // Treat delete and error with error-colored buttons
    const buttonColor = isDelete ? 'error' : 'none';

    if (buttonType === 'ok') {
      return (
        <Button variant={'primary'} onClick={onClose}>
          بستن
        </Button>
      );
    }

    const primaryLabel = buttonType === 'yesNo' ? 'بله' : 'تأیید';
    const secondaryLabel = buttonType === 'yesNo' ? 'خیر' : 'لغو';

    return (
      <>
        <Button
          variant={'primary'}
          onClick={onConfirm}
          color={buttonColor}
          className="min-w-16"
          disabled={loading}
        >
          {loading ? (
            <div
              role="status"
              aria-label="Loading"
              className="w-4 h-4 border-2 border-gray-200 border-t-2 border-t-gray-600 rounded-full animate-spin"
            ></div>
          ) : (
            primaryLabel
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          color={buttonColor}
          className="min-w-16"
        >
          {secondaryLabel}
        </Button>
      </>
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-[999]"
      dir="rtl"
    >
      {!isFullscreen && (
        <div
          className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[2px]"
          onClick={onClose}
        ></div>
      )}
      <div
        ref={modalRef}
        className={`h-[220px] p-5 pt-10 ${contentClasses} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-4">
          {icon}
          <Typography variant="body2" className={`text-center `}>
            {message}
          </Typography>
          <div
            className={twMerge(
              'mt-4 flex gap-2 w-full',
              buttonType === 'ok' ? 'justify-center' : 'justify-end'
            )}
          >
            {getButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};
