'use client';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ModalConfirmation from '@/components/form/form-elements/ModalConfirmation';
import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import PersianDatePicker from '@/components/form/input/DatePicker';
import {
  PRODUCTS,
  STORES,
  TRANSFER,
  DEPARTMENTS,
  ORDERS,
} from '@/constants/urls';
import { useEnhancedMutation } from '@/hooks/use-enhanced-mutation';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';

type SimpleObject = { id: number; name: string };

type TransferFormValues = {
  product_id: string;
  from_store_id: string;
  to_store_id: string;
  quantity: number;
  transfer_date: string;
  unit_price: number;
  expire_date: string;
  product_status: string;
  department_id: string;
  description?: string;
};

const TransferForm = ({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<TransferFormValues>({
    defaultValues: {
      product_id: '',
      from_store_id: '',
      to_store_id: '',
      quantity: 0,
      transfer_date: '',
      unit_price: 0,
      expire_date: '',
      product_status: '',
      department_id: '',
      description: '',
    },
  });

  const { mutateAsync, isPending } = useEnhancedMutation({
    method: 'POST',
    url: TRANSFER,
    invalidateQueries: [ORDERS],
  });

  // Queries for dropdowns
  const { data: products } = useEnhancedQuery<{
    result: { data: SimpleObject[] };
  }>({
    url: PRODUCTS,
    queryParams: { size: 300 },
  });

  const { data: stores } = useEnhancedQuery<{ result: SimpleObject[] }>({
    url: STORES,
    queryParams: { size: 300 },
  });

  const { data: departments } = useEnhancedQuery<{ result: SimpleObject[] }>({
    url: DEPARTMENTS,
    queryParams: { size: 300 },
  });

  // Watch product selection for available stock
  const selectedProductId = watch('product_id');
  const selectedFromStoreId = watch('from_store_id');
  const availableStock = 150; // You can replace with dynamic stock fetch based on product & store

  const onSubmit: SubmitHandler<TransferFormValues> = (formData) => {
    mutateAsync(formData).then(() => {
      reset();
      closeModal();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">انتقال کالا بین انبارها</h2>

        <div className="bg-white dark:bg-gray-800/70 rounded-xl px-3 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product */}
          <div>
            <Label>کالا</Label>
            <Controller
              name="product_id"
              control={control}
              rules={{ required: 'انتخاب کالا الزامی است' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    products?.data?.result?.data.map((p) => ({
                      label: p.name,
                      value: p.id.toString(),
                    })) ?? []
                  }
                  placeholder="انتخاب کالا"
                  error={!!errors.product_id}
                  hint={errors.product_id?.message as string}
                />
              )}
            />
          </div>

          {/* From Store */}
          <div>
            <Label>انبار مبدا</Label>
            <Controller
              name="from_store_id"
              control={control}
              rules={{ required: 'انتخاب انبار الزامی است' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    stores?.data?.result.map((s) => ({
                      label: s.name,
                      value: s.id.toString(),
                    })) ?? []
                  }
                  placeholder="انتخاب انبار"
                  error={!!errors.from_store_id}
                  hint={errors.from_store_id?.message as string}
                />
              )}
            />
          </div>

          {/* To Store */}
          <div>
            <Label>انبار مقصد</Label>
            <Controller
              name="to_store_id"
              control={control}
              rules={{ required: 'انتخاب انبار مقصد الزامی است' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    stores?.data?.result.map((s) => ({
                      label: s.name,
                      value: s.id.toString(),
                    })) ?? []
                  }
                  placeholder="انتخاب انبار مقصد"
                  error={!!errors.to_store_id}
                  hint={errors.to_store_id?.message as string}
                />
              )}
            />
          </div>

          {/* Quantity */}
          <div>
            <Label>تعداد</Label>
            <Input
              type="number"
              {...register('quantity', {
                required: 'تعداد الزامی است',
                min: { value: 1, message: 'تعداد باید بزرگتر از ۰ باشد' },
                max: {
                  value: availableStock,
                  message: `حداکثر موجودی ${availableStock} است`,
                },
              })}
              error={!!errors.quantity}
              hint={errors.quantity?.message as string}
            />
            <p className="text-gray-500 mt-1">موجودی: {availableStock} واحد</p>
          </div>

          {/* Transfer Date */}
          <div className="w-full">
            <Label>تاریخ انتقال</Label>
            <PersianDatePicker
              name="transfer_date"
              control={control}
              rules={{ required: 'تاریخ انتقال الزامی است' }}
              placeholder="انتخاب تاریخ"
              error={!!errors.transfer_date}
              hint={errors.transfer_date?.message}
            />
          </div>

          {/* Unit Price */}
          <div>
            <Label>قیمت واحد</Label>
            <Input
              type="number"
              {...register('unit_price', { required: 'قیمت الزامی است' })}
              error={!!errors.unit_price}
              hint={errors.unit_price?.message as string}
            />
          </div>

          {/* Expire Date */}
          <div className="w-full">
            <Label>تاریخ انقضا</Label>
            <PersianDatePicker
              name="expire_date"
              control={control}
              rules={{ required: 'انتخاب تاریخ انقضا الزامی است' }}
              placeholder="انتخاب تاریخ"
              error={!!errors.expire_date}
              hint={errors.expire_date?.message}
            />
          </div>

          {/* Product Status */}
          <div>
            <Label>وضعیت کالا</Label>
            <Controller
              name="product_status"
              control={control}
              rules={{ required: 'انتخاب وضعیت الزامی است' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { label: 'سالم', value: 'good' },
                    { label: 'معیوب', value: 'defective' },
                    { label: 'نامشخص', value: 'unknown' },
                  ]}
                  placeholder="انتخاب وضعیت"
                  error={!!errors.product_status}
                  hint={errors.product_status?.message as string}
                />
              )}
            />
          </div>

          {/* Department */}
          <div>
            <Label>دپارتمان</Label>
            <Controller
              name="department_id"
              control={control}
              rules={{ required: 'انتخاب دپارتمان الزامی است' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    departments?.data?.result.map((d) => ({
                      label: d.name,
                      value: d.id.toString(),
                    })) ?? []
                  }
                  placeholder="انتخاب دپارتمان"
                  error={!!errors.department_id}
                  hint={errors.department_id?.message as string}
                />
              )}
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <Label>توضیحات</Label>
            <TextArea
              {...register('description')}
              placeholder="توضیحات انتقال کالا"
              className="dark:bg-dark-900"
            />
          </div>
        </div>

        <ModalConfirmation
          onCancel={closeModal}
          loading={isPending}
          confirmText="انتقال کالا"
        />
      </div>
    </form>
  );
};

export default TransferForm;
