import React from 'react';
import { DataGrid } from 'react-data-grid';
import Typography from '@/components/ui/typography/Typography';
import { Package2, Store, User } from 'lucide-react';
import TitleComponent from './title';
const cellClass = 'text-center flex justify-center items-center';

const storeColumns = [
  {
    key: 'store_name',
    name: 'نام انبار',
    headerCellClass: 'text-center',
    cellClass,
  },
  {
    key: 'manager_name',
    name: 'مدیر',
    cellClass,
    headerCellClass: 'text-center',
    renderCell: ({ row }) => (
      <div className="flex gap-2">
        <div className="bg-brand-50 rounded-full size-[22px] pr-[3px] pt-0.5 items-center justify-center">
          <User className="text-brand-500 size-4" />
        </div>
        <Typography>{row.manager_name}</Typography>
      </div>
    ),
  },
  {
    key: 'total_products',
    name: 'کالاها',
    cellClass,
    renderCell: ({ row }) => (
      <div className="flex gap-2">
        <div className="bg-warning-100 rounded-full size-[22px] flex items-center justify-center">
          <Package2 className="text-warning-500 size-3.5" />
        </div>
        <Typography>{row.total_products}</Typography>
      </div>
    ),
    headerCellClass: 'text-center',
  },
  {
    key: 'total_quantity',
    name: 'آیتم ها',
    cellClass,
    headerCellClass: 'text-center',
  },
  {
    key: 'recent_orders',
    name: 'ورود و خروج اخیر',
    cellClass,
    headerCellClass: 'text-center',
    renderCell: ({ row }) => (
      <div className="flex bg-success-50 dark:bg-success-500 rounded-sm size-[22px]  items-center justify-center">
        <Typography className="text-success-700 dark:text-success-200">
          {row.recent_orders}
        </Typography>
      </div>
    ),
  },
];
const StoresTable = ({ storesSummary }) => {
  return (
    <div className=" bg-white flex-1 dark:bg-gray-600 shadow-lg min-h-max p-4 rounded-lg">
      <TitleComponent Icon={Store} Title={'وضعیت انبارها'} />

      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-400 mb-4 " />
      <DataGrid
        direction="rtl"
        columns={storeColumns}
        rows={storesSummary ?? []}
        className="!h-[200px] dashboard"
      />
    </div>
  );
};

export default StoresTable;
