// 'use client';
// import ModalConfirmation from '@/components/form/form-elements/ModalConfirmation';
// import Input from '@/components/form/input/InputField';
// import Label from '@/components/form/Label';
// import Select from '@/components/form/Select';
// import {
//   CATEGORIES,
//   CATEGORY,
//   PRODUCT,
//   PRODUCTS,
//   UNITS,
// } from '@/constants/urls';
// import { useEnhancedMutation } from '@/hooks/use-enhanced-mutation';
// import { useEnhancedQuery } from '@/hooks/use-enhanced-query';
// import { ChevronDownIcon } from 'lucide-react';
// import React, { useEffect, useRef } from 'react';
// import { Controller, SubmitHandler, useForm } from 'react-hook-form';
// type ProductResponse = {
//   id?: number;
//   name: string;
// };

// type FormValues = {
//   name: string;
//   unit_id: string;
// };
// const ProductForm = ({
//   closeModal,
//   id,
// }: {
//   closeModal: () => void;
//   id?: number;
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormValues>({
//     defaultValues: { name: '', unit_id: '' },
//   });
//   const isMounted = useRef(false);
//   useEffect(() => {
//     console.log('first');
//     isMounted.current = true;
//   }, []);

//   const { mutateAsync, isPending } = useEnhancedMutation({
//     method: id ? 'PATCH' : 'POST',
//     url: id ? `${PRODUCT}/${id}/` : PRODUCT,
//     invalidateQueries: [PRODUCTS, id ? id?.toString() : ''],
//   });

//   const { data: categories, isLoading: loadingCategories } = useEnhancedQuery<{
//     result: { name: string; id: number }[];
//   }>({
//     url: CATEGORIES,
//     queryParams: { size: 300 },
//     // queryParams:id,
//     options: {
//       enabled: isMounted.current === true,
//     },
//   });
//   const { data: units, isLoading: loadingUnits } = useEnhancedQuery<{
//     result: { name: string; id: number }[];
//   }>({
//     url: `${UNITS}`,
//     queryParams: { size: 300 },
//     // queryParams:id,
//     options: {
//       enabled: isMounted.current === true,
//     },
//   });
//   const { data, isLoading } = useEnhancedQuery<{
//     result: { name: string; id: number };
//   }>({
//     url: `${PRODUCT}/${id}/`,
//     // queryParams:id,
//     options: {
//       enabled: !!id,
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       reset({
//         name: data?.data?.result?.name ?? '',
//       });
//     }
//   }, [data, reset]);
//   const onSubmit: SubmitHandler<{ name: string }> = (data) => {
//     console.log(data);
//     mutateAsync(data).then(() => {
//       reset({ name: '', unit_id: '' });
//       closeModal();
//     });
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="flex flex-col gap-3">
//         <div className="bg-white dark:bg-gray-800/70 rounded-xl px-3 py-2 pb-6 ">
//           <Label>نام کالا</Label>
//           <Input
//             loading={isLoading}
//             type="text"
//             {...register('name', {
//               required: 'نام کالا الزامی است',
//             })}
//             error={!!errors.name}
//             hint={errors.name?.message as string}
//           />

//           <Label>واحد</Label>
//           {/* <div className="relative"> */}
//           <Select
//             {...register('unit_id', { required: 'انتخاب واحد الزامی است' })}
//             options={
//               units?.data?.result?.map((item) => ({
//                 label: item.name,
//                 value: item.id.toString(),
//               })) ?? []
//             }
//             placeholder="انتخاب واحد"
//             className="dark:bg-dark-900"
//           />

//           {/* <span className="absolute text-gray-300 -translate-y-1/2 pointer-events-none left-3 top-1/2 dark:text-gray-600">
//               <ChevronDownIcon />
//             </span>
//           </div> */}
//         </div>
//         <ModalConfirmation onCancel={() => closeModal()} loading={isPending} />
//       </div>
//     </form>
//   );
// };

// export default ProductForm;
'use client';
import ModalConfirmation from '@/components/form/form-elements/ModalConfirmation';
import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import {
  CATEGORIES,
  CATEGORY,
  PRODUCT,
  PRODUCTS,
  UNITS,
} from '@/constants/urls';
import { useEnhancedMutation } from '@/hooks/use-enhanced-mutation';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';
import React, { useEffect, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  unit_id: string;
  category_id: string;
  warning_threshold: number;
  description?: string;
};

const ProductForm = ({
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
      name: '',
      unit_id: '',
      category_id: '',
      warning_threshold: 0,
      // description: '',
    },
  });

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const { mutateAsync, isPending } = useEnhancedMutation({
    method: id ? 'PATCH' : 'POST',
    url: id ? `${PRODUCT}/${id}/` : PRODUCT,
    invalidateQueries: [PRODUCTS, id ? id?.toString() : ''],
  });

  const { data: units } = useEnhancedQuery<{
    result: { name: string; id: number }[];
  }>({
    url: UNITS,
    queryParams: { size: 300 },
    options: { enabled: isMounted.current },
  });

  const { data: categories } = useEnhancedQuery<{
    result: { name: string; id: number }[];
  }>({
    url: CATEGORIES,
    queryParams: { size: 300 },
    options: { enabled: isMounted.current },
  });

  const { data } = useEnhancedQuery<{
    result: {
      name: string;
      id: number;
      unit_id: number;
      category_id: number;
      warning_threshold: number;
      // description: string;
    };
  }>({
    url: `${PRODUCT}/${id}/`,
    options: { enabled: !!id },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.data.result.name ?? '',
        unit_id: data.data.result.unit_id?.toString() ?? '',
        category_id: data.data.result.category_id?.toString() ?? '',
        warning_threshold: data.data.result.warning_threshold ?? 0,
        // description: data.data.result.description ?? '',
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutateAsync(formData).then(() => {
      reset({
        name: '',
        unit_id: '',
        category_id: '',
        warning_threshold: 0,
        // description: '',
      });
      closeModal();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-3 dark:bg-gray-800/70 rounded-xl px-3 py-2 pb-6 space-y-4">
          {/* Product Name */}
          <div>
            <Label>نام کالا</Label>
            <Input
              type="text"
              {...register('name', { required: 'نام کالا الزامی است' })}
              error={!!errors.name}
              hint={errors.name?.message as string}
            />
          </div>

          {/* Unit */}
          <div>
            <Label>واحد</Label>
            <Controller
              name="unit_id"
              control={control}
              rules={{ required: 'انتخاب واحد الزامی است' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    units?.data?.result?.map((u) => ({
                      label: u.name,
                      value: u.id.toString(),
                    })) ?? []
                  }
                  placeholder="انتخاب واحد"
                  className="dark:bg-dark-900"
                  error={!!errors.unit_id}
                  hint={errors.unit_id?.message as string}
                />
              )}
            />
          </div>

          {/* Category */}
          <div>
            <Label>دسته‌بندی</Label>
            <Controller
              name="category_id"
              control={control}
              rules={{ required: 'انتخاب دسته‌بندی الزامی است' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    categories?.data?.result?.map((c) => ({
                      label: c.name,
                      value: c.id.toString(),
                    })) ?? []
                  }
                  placeholder="انتخاب دسته‌بندی"
                  className="dark:bg-dark-900"
                  error={!!errors.category_id}
                  hint={errors.category_id?.message as string}
                />
              )}
            />
          </div>

          {/* Warning Threshold */}
          <div>
            <Label>حد هشدار</Label>
            <Input
              type="number"
              {...register('warning_threshold', {
                required: 'حد هشدار الزامی است',
              })}
              error={!!errors.warning_threshold}
              hint={errors.warning_threshold?.message as string}
            />
          </div>

          {/* Description */}
          {/* <div className="col-span-2">
            <Label>توضیحات</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="توضیحات کالا"
                  className="dark:bg-dark-900"
                />
              )}
            />
          </div> */}
        </div>

        <ModalConfirmation onCancel={closeModal} loading={isPending} />
      </div>
    </form>
  );
};

export default ProductForm;
