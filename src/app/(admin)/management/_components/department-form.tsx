'use client';

import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import ModalConfirmation from '@/components/form/form-elements/ModalConfirmation';
import { DEPARTMENTS, DEPARTMENT } from '@/constants/urls';
import { useEnhancedMutation } from '@/hooks/use-enhanced-mutation';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';

type FormValues = {
  name: string;
  manager_name: string;
};

type SimpleObject = { id: number; name: string };

const DepartmentForm = ({
  closeModal,
  id,
}: {
  closeModal: () => void;
  id?: number;
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      manager_name: '',
    },
  });

  // Mutation for create/update
  const { mutateAsync, isPending } = useEnhancedMutation({
    method: id ? 'PATCH' : 'POST',
    url: id ? `${DEPARTMENT}/${id}/` : DEPARTMENT,
    invalidateQueries: [DEPARTMENTS, id ? id.toString() : ''],
  });

  // Fetch department data for edit
  const { data, isLoading } = useEnhancedQuery<{
    result: FormValues & { id: number };
  }>({
    url: `${DEPARTMENT}/${id}/`,
    options: { enabled: !!id },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.data.result.name,
        manager_name: data.data.result.manager_name?.toString(),
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutateAsync(formData).then(() => {
      reset({ name: '', manager_name: '' });

      closeModal();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="bg-white dark:bg-gray-800/70 rounded-xl px-4 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Department Name */}
        <div>
          <Label>نام دپارتمان</Label>
          <Input
            loading={isLoading}
            {...register('name', { required: 'نام دپارتمان الزامی است' })}
            placeholder="نام دپارتمان"
            error={!!errors.name}
            hint={errors.name?.message as string}
          />
        </div>

        {/* Manager */}
        <div>
          <Label>مدیر</Label>
          <Input
            loading={isLoading}
            {...register('manager_name', {
              required: 'نام مدیر الزامی است',
            })}
            placeholder="نام مدیر"
            error={!!errors.manager_name}
            hint={errors.manager_name?.message as string}
          />
        </div>
      </div>

      <ModalConfirmation onCancel={closeModal} loading={isPending} />
    </form>
  );
};

export default DepartmentForm;
