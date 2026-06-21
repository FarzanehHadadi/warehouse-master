'use client';
import { toast } from 'react-toastify';

export function handleError({ error }: { error: any }) {
  console.log('🚀 ~ handleError ~ error:', error);
  toast.error('عملیات با خطا مواجه شد.');
}
