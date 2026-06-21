import Button from '@/components/ui/button/Button';
import React from 'react';

const ModalConfirmation = ({
  onConfirm,
  onCancel,
  loading = false,
  confirmText = 'ثبت',
  buttonSize = 'default',
}: {
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  confirmText?: string;
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
}) => {
  return (
    <div className="bg-white dark:bg-gray-800/70 rounded-xl px-3 py-2 flex justify-end gap-2">
      <Button
        size={buttonSize}
        variant={'primary'}
        className="min-w-16"
        type="submit"
        onClick={() => onConfirm?.()}
      >
        {loading ? 'در حال ارسال' : confirmText}
      </Button>
      <Button
        size={buttonSize}
        type="button"
        variant={'outline'}
        onClick={() => onCancel?.()}
      >
        بازگشت
      </Button>
    </div>
  );
};

export default ModalConfirmation;
