'use client';
import { CATEGORIES, PRODUCTS } from '@/constants/urls';
import Grid from '../../../components/ui/custom-grid/custom-grid';
import ProductForm from './_components/product-form';
import { Box, Package2, Ruler } from 'lucide-react';
import Typography from '@/components/ui/typography/Typography';
import Badge from '@/components/ui/badge/Badge';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';

export default function Page() {
  const { data: categories } = useEnhancedQuery<{
    result: SimpleObject[];
  }>({
    url: CATEGORIES,
    method: 'GET',
  });
  return (
    <Grid
      endpoint={PRODUCTS}
      deleteEndpoint={PRODUCTS}
      filters={[
        // {
        //   name: 'name',
        //   type: 'input',
        // },
        {
          name: 'category_id',
          type: 'select',
          options: categories?.data?.result?.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        },
      ]}
      title="لیست کالاها"
      TitleIcon={Package2}
      Form={ProductForm}
      columns={[
        { key: 'name', label: 'نام' },
        {
          key: 'category_id',
          label: 'دسته بندی',
          render: (row) => (
            <Typography variant={'body2'} className="flex items-center gap-2">
              <Box className="size-5" />
              {row.category.name}
            </Typography>
          ),
        },
        {
          key: 'unit.name',
          label: 'واحد',

          render: (row) => (
            <Typography variant={'body2'} className="flex items-center gap-2">
              <Ruler className="size-5" />
              {row.unit.name}
            </Typography>
          ),
        },
        {
          key: 'warning_threshold',
          label: 'تعداد هشدار',
          render: (row) => (
            <Badge color={'primary'}>{row.warning_threshold}</Badge>
          ),
        },
      ]}
      pageSize={20}
      addButtonText="افزودن کالا"
      modalTitle=""
    />
  );
}
