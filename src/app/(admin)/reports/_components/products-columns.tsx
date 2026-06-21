import Typography from '@/components/ui/typography/Typography';
import { Box, Store } from 'lucide-react';

export const productColumns = [
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
    key: 'store_id',
    label: 'انبار',
    render: (row) => (
      <Typography variant={'body2'} className="flex items-center gap-2">
        <Store className="size-5" />
        {row.store_name}
      </Typography>
    ),
  },
  {
    key: 'total_quantity',
    label: 'آیتم ها',
    render: (row) => (
      <div className="flex gap-2">
        <div className="bg-warning-100 min-w-10 rounded-full px-1 py-0.5 flex items-center justify-center">
          <Typography variant={'body3'} className="text-warning-500 ">
            {row.total_quantity}
          </Typography>
        </div>
      </div>
    ),
  },
];
/**
 * 
 *    {
      "product_id": 1,
      "product_name": "iPhone 15",
      "category_name": "2Electroni3",
      "store_id": 2,
      "store_name": "2465432 Store1",
      "total_quantity": 711
    },
 */
