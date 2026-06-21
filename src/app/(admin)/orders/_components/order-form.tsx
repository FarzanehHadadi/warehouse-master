'use client';
import ModalConfirmation from '@/components/form/form-elements/ModalConfirmation';
import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import {
  STORES,
  ORDERS,
  ORDER,
  DEPARTMENTS,
  PRODUCT_SEARCH,
} from '@/constants/urls';
import { useEnhancedMutation } from '@/hooks/use-enhanced-mutation';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PersianDatePicker from '@/components/form/input/DatePicker';
import RadioGroup from '@/components/form/input/Radio';
import { ORDER_STATUS_OPTIONS } from '../_constants/order-status-options';
import { ORDER_TYPE_OPTIONS } from '../_constants/order-type-options';
import { AutoComplete } from '@/components/ui/autocomplete/AutoComplete';
type SimpleObject = {
  id: number;
  name: string;
};
type FormValues = {
  product_id: string;
  store_id: string;
  type: 'inbound' | 'outbound';
  quantity: number;
  price: number;
  expire_date: string;
  product_status: string;
  department_id: string;
  description?: string;
};

const OrderForm = ({
  closeModal,
  id,
}: {
  closeModal: () => void;
  id?: number;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      product_id: '',
      store_id: '',
      type: 'inbound',
      quantity: 0,
      price: 0,
      expire_date: '',
      product_status: '',
      department_id: '',
      description: '',
    },
  });
  const [userTypedString, setUserTypedString] = useState<string | null>(null);
  const { mutateAsync, isPending } = useEnhancedMutation({
    method: id ? 'PATCH' : 'POST',
    url: id ? `${ORDER}/${id}/` : ORDER,
    invalidateQueries: [ORDERS, id ? id.toString() : ''],
  });

  // Queries for dropdowns
  const { data: products, isLoading: loadingProducts } = useEnhancedQuery<{
    result: SimpleObject[];
  }>({
    url: PRODUCT_SEARCH,
    queryParams: { search: userTypedString?.toString() as string },
  });
  const { data: stores } = useEnhancedQuery<{
    result: { id: number; name: string }[];
  }>({
    url: STORES,
  });

  const { data: departments } = useEnhancedQuery<{
    result: { id: number; name: string }[];
  }>({
    url: DEPARTMENTS,
  });

  // For edit mode
  const { data } = useEnhancedQuery<{
    result: FormValues & { id: number };
  }>({
    url: `${ORDER}/${id}/`,
    options: { enabled: !!id },
  });

  useEffect(() => {
    if (data) {
      reset({
        product_id: data.data.result.product_id?.toString(),
        store_id: data.data.result.store_id?.toString(),
        type: data.data.result.type,
        quantity: data.data.result.quantity,
        price: data.data.result.price,
        expire_date: data.data.result.expire_date,
        product_status: data.data.result.product_status?.toString(),
        department_id: data.data.result.department_id?.toString(),
        description: data.data.result.description ?? '',
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutateAsync(formData).then(() => {
      reset();
      closeModal();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <div className="bg-white dark:bg-gray-800/70 rounded-xl px-3 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product */}
          <div>
            <Label>کالا</Label>
            <Controller
              name="product_id"
              control={control}
              rules={{ required: 'انتخاب کالا الزامی است' }}
              render={({ field }) => {
                const selectedOption =
                  products?.data?.result
                    ?.map((p) => ({ label: p.name, value: p.id.toString() }))
                    .find((opt) => opt.value === field.value) || undefined;
                return (
                  <AutoComplete
                    isLoading={loadingProducts}
                    value={selectedOption}
                    options={
                      products?.data?.result?.map((p) => ({
                        label: p.name,
                        value: p.id.toString(),
                      })) ?? []
                    }
                    onValueChange={(option) => field.onChange(option.value)}
                    emptyMessage="موردی یافت نشد"
                    placeholder="انتخاب کالا"
                    onSearch={(val) => setUserTypedString(val)}
                    error={!!errors.product_id}
                    hint={errors.product_id?.message as string}
                  />
                );
              }}
            />
          </div>

          {/* Store */}
          <div>
            <Label>انبار / فروشگاه</Label>
            <Controller
              name="store_id"
              control={control}
              rules={{ required: 'انتخاب فروشگاه الزامی است' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    stores?.data?.result?.map((s) => ({
                      label: s.name,
                      value: s.id.toString(),
                    })) ?? []
                  }
                  placeholder="انتخاب فروشگاه"
                  error={!!errors.store_id}
                  hint={errors.store_id?.message as string}
                />
              )}
            />
          </div>

          {/* Order Type */}
          <div>
            <Label>نوع ورود و خروج</Label>
            <RadioGroup
              name="type"
              control={control}
              options={ORDER_TYPE_OPTIONS}
              error={!!errors.type}
              hint={errors.type?.message}
            />
            {/* <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" value="inbound" {...register('type')} />
                ورودی
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="outbound" {...register('type')} />
                خروجی
              </label>
            </div> */}
          </div>

          {/* Quantity */}
          <div>
            <Label>تعداد</Label>
            <Input
              type="number"
              {...register('quantity', { required: 'تعداد الزامی است' })}
              error={!!errors.quantity}
              hint={errors.quantity?.message as string}
            />
          </div>

          {/* Price */}
          <div>
            <Label>قیمت</Label>
            <Input
              type="number"
              {...register('price', { required: 'قیمت الزامی است' })}
              error={!!errors.price}
              hint={errors.price?.message as string}
            />
          </div>

          {/* Expire Date */}
          <div className="w-full">
            <Label>تاریخ انقضا</Label>

            <PersianDatePicker
              name={'expire_date'}
              rules={{ required: 'انتخاب تاریخ الزامی است' }}
              control={control}
              placeholder={'تاریخ'}
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
                  options={ORDER_STATUS_OPTIONS}
                  placeholder="انتخاب وضعیت"
                  error={!!errors.product_status}
                  hint={errors.product_status?.message as string}
                />
              )}
            />
          </div>

          {/* Department */}
          <div>
            <Label>بخش</Label>
            <Controller
              name="department_id"
              control={control}
              rules={{ required: 'انتخاب بخش الزامی است' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    departments?.data?.result?.map((d) => ({
                      label: d.name,
                      value: d.id.toString(),
                    })) ?? []
                  }
                  placeholder="انتخاب بخش"
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
              placeholder="توضیحات ورود و خروج"
              className="dark:bg-dark-900"
            />
          </div>
        </div>

        <ModalConfirmation onCancel={closeModal} loading={isPending} />
      </div>
    </form>
  );
};

export default OrderForm;
