'use client';

import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import ModalConfirmation from '@/components/form/form-elements/ModalConfirmation';
import { STORES, STORE } from '@/constants/urls';
import { useEnhancedMutation } from '@/hooks/use-enhanced-mutation';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';
import Switch from '@/components/form/switch/Switch';

type FormValues = {
  name: string;
  manager_name: string;
  is_active: boolean; // true = active, false = inactive
};

type SimpleObject = { id: number; name: string };

const StoreForm = ({
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
      is_active: true,
    },
  });

  // Mutation for create/update
  const { mutateAsync, isPending } = useEnhancedMutation({
    method: id ? 'PATCH' : 'POST',
    url: id ? `${STORE}/${id}/` : STORE,
    invalidateQueries: [STORES, id ? id.toString() : ''],
  });

  // Fetch store data for edit
  const { data, isLoading } = useEnhancedQuery<{
    result: FormValues & { id: number };
  }>({
    url: `${STORE}/${id}/`,
    options: { enabled: !!id },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.data.result.name,
        manager_name: data.data.result.manager_name?.toString(),
        is_active: data.data.result.is_active,
      });
    }
    return () => {
      reset({ name: '', manager_name: '', is_active: true });
    };
  }, [data, reset]);

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutateAsync(formData).then(() => {
      reset({ name: '', manager_name: '', is_active: true });
      closeModal();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="bg-white dark:bg-gray-800/70 rounded-xl px-4 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Store Name */}
        <div>
          <Label>نام انبار</Label>
          <Input
            {...register('name', { required: 'نام انبار الزامی است' })}
            loading={isLoading}
            placeholder="نام انبار"
            error={!!errors.name}
            hint={errors.name?.message as string}
          />
        </div>

        {/* Manager */}
        <div>
          <Label>مدیر</Label>
          <Input
            loading={isLoading}
            {...register('manager_name', { required: 'نام مدیر الزامی است' })}
            placeholder="نام مدیر"
            error={!!errors.manager_name}
            hint={errors.manager_name?.message as string}
          />
          {/* <Controller
            name="manager_id"
            control={control}
            rules={{ required: 'انتخاب مدیر الزامی است' }}
            render={({ field }) => (
              <Select
                {...field}
                options={
                  managers?.data?.result?.map((m) => ({
                    label: m.name,
                    value: m.id.toString(),
                  })) ?? []
                }
                placeholder="انتخاب مدیر"
                error={!!errors.manager_id}
                hint={errors.manager_id?.message as string}
              />
            )}
          /> */}
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <Label>وضعیت</Label>
          <div>
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <Switch
                  loading={isLoading}
                  label={field.value ? 'فعال' : 'غیرفعال'}
                  defaultChecked={field.value}
                  color="blue" // we can treat "success" as your success-500
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>

      <ModalConfirmation onCancel={closeModal} loading={isPending} />
    </form>
  );
};

export default StoreForm;
