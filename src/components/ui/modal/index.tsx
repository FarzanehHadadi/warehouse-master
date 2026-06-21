'use client';
import { X } from 'lucide-react';
import React, { useRef, useEffect } from 'react';
import Typography from '../typography/Typography';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean; // New prop to control close button visibility
  isFullscreen?: boolean; // Default to false for backwards compatibility
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true, // Default to true for backwards compatibility
  isFullscreen = false,
  title = '',
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
    : 'relative w-full rounded-3xl bg-gray-200  dark:bg-gray-700';

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
        className={`p-4 ${contentClasses}  ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <div className="w-full  flex justify-between items-center mb-4 bg-white dark:bg-gray-800/70 rounded-xl px-3 py-2">
            <Typography variant={'body3'}>{title}</Typography>
            <button
              onClick={onClose}
              className="w-full left-3 top-3 z-999 flex h-8  items-center justify-center rounded-xl  text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:left-6 sm:top-6 sm:h-8 sm:w-8 p-0"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};
