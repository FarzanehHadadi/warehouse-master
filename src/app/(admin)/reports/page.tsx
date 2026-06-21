'use client';

import React from 'react';
import Typography from '@/components/ui/typography/Typography';

import { EnhancedTabs } from '@/components/tab/Tab'; // ✅ only import EnhancedTabs
import { Package2, Activity, Download } from 'lucide-react';
import { productColumns } from './_components/products-columns';
import {
  CATEGORIES,
  PRODUCTS,
  REPORTS_STORE_PRODUCT_QUANTITIES,
  REPORTS_STORE_PRODUCT_QUANTITIES_EXPORT,
  REPORTS_THRESHOLD_PROXIMITY,
  REPORTS_THRESHOLD_PROXIMITY_EXPORT,
  STORES,
} from '@/constants/urls';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';
import Grid from '@/components/ui/custom-grid/custom-grid';
import { totalColumns } from './_components/total-columns';
import { downloadExcel } from '@/services/download-excel';
import { changeFilterObject } from '@/services/change-filter-object';

export default function AdminTabs() {
  const { data: categories } = useEnhancedQuery<{
    result: SimpleObject[];
  }>({
    url: CATEGORIES,
    method: 'GET',
  });
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
    <div dir="rtl" className="w-full">
      <EnhancedTabs defaultValue="products" className="w-full">
        <EnhancedTabs.List>
          <EnhancedTabs.Trigger value="products">
            <div className="flex justify-between items-center gap-2">
              <Package2 className="size-4" />
              <Typography className="text-inherit" variant={'body'}>
                کالاهای انبار
              </Typography>
            </div>
          </EnhancedTabs.Trigger>
          <EnhancedTabs.Trigger value="total">
            <div className="flex justify-between items-center gap-2">
              <Activity className="size-4" />
              <Typography className="text-inherit" variant={'body'}>
                گزارش جامع
              </Typography>
            </div>
          </EnhancedTabs.Trigger>
        </EnhancedTabs.List>

        <EnhancedTabs.Content value="products">
          <Grid
            endpoint={REPORTS_STORE_PRODUCT_QUANTITIES}
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
                name: 'category_id',
                type: 'select',
                options: categories?.data?.result?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })),
              },
            ]}
            topActions={[
              {
                callback: (filters) => {
                  downloadExcel(
                    REPORTS_STORE_PRODUCT_QUANTITIES_EXPORT,
                    changeFilterObject(filters)
                  );
                },
                icon: Download,
                title: 'خروجی اکسل',
              },
            ]}
            showAddTopAction={false}
            title=""
            TitleIcon={() => <></>}
            showRowActions={false}
            columns={productColumns}
            pageSize={20}
          />
        </EnhancedTabs.Content>

        <EnhancedTabs.Content value="total">
          <Grid
            endpoint={REPORTS_THRESHOLD_PROXIMITY}
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
                name: 'category_id',
                type: 'select',
                options: categories?.data?.result?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })),
              },
            ]}
            showAddTopAction={false}
            topActions={[
              {
                callback: (filters) => {
                  downloadExcel(
                    REPORTS_THRESHOLD_PROXIMITY_EXPORT,
                    changeFilterObject(filters)
                  );
                },
                icon: Download,
                title: 'خروجی اکسل',
              },
            ]}
            title=""
            TitleIcon={() => <></>}
            showRowActions={false}
            columns={totalColumns}
            pageSize={20}
          />
        </EnhancedTabs.Content>
      </EnhancedTabs>
    </div>
  );
}
