'use client';
import { ORDERS, PRODUCTS, STORES } from '@/constants/urls';
import Grid from '@/components/ui/custom-grid/custom-grid';
import { ArrowRightLeft, Download, ShoppingCart } from 'lucide-react';
import OrderForm from './order-form';
import { columns } from './columns';
import { Modal } from '@/components/ui/modal';
import TransferForm from './transfer-form';
import { useModal } from '@/hooks/useModal';
import { downloadExcel } from '@/services/download-excel';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';
import { ORDER_STATUS_OPTIONS } from '../_constants/order-status-options';
import { ORDER_TYPE_OPTIONS } from '../_constants/order-type-options';
import { ORDER_EXPORT } from '@/constants/urls';
import { changeFilterObject } from '@/services/change-filter-object';

const OrderGrid = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { data: products } = useEnhancedQuery<{
    result: { data: SimpleObject[] };
  }>({
    url: PRODUCTS,
    method: 'GET',
    queryParams: {
      size: 100,
    },
  });
  const { data: stores } = useEnhancedQuery<{
    result: SimpleObject[];
  }>({
    url: STORES,
    method: 'GET',
  });
  return (
    <>
      <Grid
        TitleIcon={ShoppingCart}
        endpoint={ORDERS}
        deleteEndpoint={ORDERS}
        filters={[
          {
            name: 'product_id',
            type: 'select',
            options: products?.data?.result?.data?.map((item) => ({
              label: item.name,
              value: item.id,
            })),
          },
          {
            name: 'store_id',
            type: 'select',
            options: stores?.data?.result?.map((item) => ({
              label: item.name,
              value: item.id,
            })),
          },
          {
            name: 'product_status',
            type: 'select',
            options: ORDER_STATUS_OPTIONS,
          },
          {
            name: 'type',
            type: 'select',
            options: ORDER_TYPE_OPTIONS,
          },
          {
            name: 'expire_date',
            type: 'date-range',
            from: 'expire_date__gte',
            to: 'expire_date__lte',
          },
        ]}
        title="ورود و خروج"
        Form={OrderForm}
        columns={columns}
        pageSize={20}
        addButtonText="افزودن ورود و خروج"
        modalTitle=""
        topActions={[
          {
            title: 'انتقال',
            icon: ArrowRightLeft,
            callback: () => openModal(),
          },
          {
            callback: (filters) => {
              downloadExcel(ORDER_EXPORT, changeFilterObject(filters));
            },
            icon: Download,
            title: 'خروجی اکسل',
          },
        ]}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          closeModal();
        }}
        className="max-w-[700px] m-4"
        title={'انتقال کالا'}
      >
        <TransferForm closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default OrderGrid;
