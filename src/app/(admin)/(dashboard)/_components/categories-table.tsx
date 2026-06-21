import React from 'react';
import { DataGrid } from 'react-data-grid';
import Typography from '@/components/ui/typography/Typography';
import { Box, Package2 } from 'lucide-react';
import TitleComponent from './title';
const cellClass = 'text-center flex justify-center items-center';

const categoryColumns = [
  {
    key: 'category_name',
    name: 'دسته بندی',
    cellClass,
    headerCellClass: 'text-center',
  },
  {
    key: 'product_count',
    name: 'کالاها',
    cellClass,
    headerCellClass: 'text-center',
    renderCell: ({ row }) => (
      <div className="flex gap-2">
        <div className="bg-warning-100 rounded-full size-[22px] flex items-center justify-center">
          <Package2 className="text-warning-500 size-3.5" />
        </div>
        <Typography>{row.product_count}</Typography>
      </div>
    ),
  },
  {
    key: 'total_quantity',
    name: 'آیتم ها',
    cellClass,
    headerCellClass: 'text-center',
  },
];
const CategoriesTable = ({ categoriesSummary }) => {
  return (
    <div className=" bg-white flex-1 dark:bg-gray-600 shadow-lg min-h-max p-4 rounded-lg">
      <TitleComponent Icon={Box} Title={'وضعیت دسته بندی ها'} />
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-400 mb-4 " />
      <DataGrid
        direction="rtl"
        columns={categoryColumns}
        rows={categoriesSummary ?? []}
        className="!h-[200px] dashboard"
      />
    </div>
  );
};

export default CategoriesTable;
