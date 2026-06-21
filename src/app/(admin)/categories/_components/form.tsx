'use client';
import ModalConfirmation from '@/components/form/form-elements/ModalConfirmation';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { CATEGORIES, CATEGORY } from '@/constants/urls';
import { useEnhancedMutation } from '@/hooks/use-enhanced-mutation';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
type CategoryResponse = {
  id?: number;
  name: string;
};

type FormValues = {
  name: string;
};
const Form = ({ closeModal, id }: { closeModal: () => void; id?: number }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: { name: '' },
  });

  const { mutateAsync, isPending } = useEnhancedMutation({
    method: id ? 'PATCH' : 'POST',
    url: id ? `${CATEGORY}/${id}/` : CATEGORY,
    invalidateQueries: [CATEGORIES, id ? id?.toString() : ''],
  });

  const { data, isLoading } = useEnhancedQuery<{
    result: { name: string; id: number };
  }>({
    url: `${CATEGORY}/${id}/`,
    // queryParams:id,
    options: {
      enabled: !!id,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data?.data?.result?.name ?? '',
      });
    }
  }, [data, reset]);
  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    console.log(data);
    mutateAsync(data).then(() => {
      reset({ name: '' });
      closeModal();
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <div className="bg-white dark:bg-gray-800/70 rounded-xl px-3 py-2 pb-6 ">
          <Label>نام دسته بندی</Label>
          <Input
            loading={isLoading}
            type="text"
            {...register('name', {
              required: 'نام دسته بندی الزامی است',
            })}
            error={!!errors.name}
            hint={errors.name?.message as string}
          />
        </div>
        <ModalConfirmation onCancel={() => closeModal()} loading={isPending} />
      </div>
    </form>
  );
};

export default Form;
