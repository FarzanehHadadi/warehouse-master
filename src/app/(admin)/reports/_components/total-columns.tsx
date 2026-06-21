import Badge from '@/components/ui/badge/Badge';
import Typography from '@/components/ui/typography/Typography';
import { Box, Ruler, Store } from 'lucide-react';

export const totalColumns = [
  {
    key: 'product_id',
    label: 'کالا',
    render: (row) => <>{row.product_name}</>,
  },
  {
    key: 'category_id',
    label: 'دسته بندی',
    render: (row) => (
      <Typography variant={'body2'} className="flex items-center gap-2">
        <Box className="size-5" />
        {row.category_name}
      </Typography>
    ),
  },
  {
    key: 'unit_id',
    label: 'واحد',
    render: (row) => (
      <Typography variant={'body2'} className="flex items-center gap-2">
        <Ruler className="size-5" />
        {row.unit_name}
      </Typography>
    ),
  },
  {
    key: 'warning_threshold',
    label: 'تعداد هشدار',
    render: (row) => <Badge color={'primary'}>{row.warning_threshold}</Badge>,
  },
  {
    key: 'current_quantity',
    label: 'تعداد فعلی',
    render: (row) => (
      <div className="flex gap-2">
        <div
          className={`${
            row.current_quantity === 0 ? 'bg-error-100' : 'bg-success-100'
          } min-w-10 rounded-full px-1 py-0.5 flex items-center justify-center`}
        >
          <Typography
            variant={'body3'}
            className={`${
              row.current_quantity === 0 ? 'text-error-500' : 'text-success-500'
            }`}
          >
            {row.current_quantity}
          </Typography>
        </div>
      </div>
    ),
  },
  {
    key: 'stores_count',
    label: 'تعداد انبارها',
  },
];
/* {
      "product_id": 1002,
      "product_name": "53656",
      "category_name": "Electronics12131",
      "unit_name": "KG",
      "warning_threshold": 456,
      "current_quantity": 0,
      "stores_count": 0
    },*/
