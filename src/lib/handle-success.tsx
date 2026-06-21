import { toast } from 'react-toastify';

export function handleSuccess({
  onSuccess: onSuccess,
  showModal = true,
}: {
  message?: string;
  onReturn?: () => void;
  onSuccess?: () => void;
  showModal?: boolean;
}) {
  if (showModal) {
    // openAirsaPortalModal({
    //     modalType: 'SUCCESS',
    //     handleConfirm: () => {
    //         closeAirsaPortalModal()
    //     },

    //     ...(!!message?.length && { customComponent: message }),

    // })
    toast.success('عملیات با موفقیت انجام شد.');
    onSuccess?.();
  } else {
    onSuccess?.();
  }
}
