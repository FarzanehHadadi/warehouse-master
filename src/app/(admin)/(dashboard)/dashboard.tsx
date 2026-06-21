'use client';

import { DASHBOARD } from '@/constants/urls';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';
import React from 'react';
import Cards from './_components/cards';
import OrdersCard from './_components/orders-card';
import RecentActivitiesCard from './_components/activity-card';
import StoreChart from './_components/store-chart';
import CategoriesTable from './_components/categories-table';
import StoresTable from './_components/stores-table';

const Dashboard = () => {
  const { data } = useEnhancedQuery<any>({
    url: DASHBOARD,
    method: 'GET',
  });

  const orders = data?.data?.result?.order_trends
    ?.map((item) => ({
      ...item,
      date: new Date(item.date)
        .toLocaleDateString('fa-IR-u-nu-latn', { calendar: 'persian' })
        .replace(
          /(\d+)\/(\d+)\/(\d+)/,
          (_, year, month, day) =>
            `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`
        ),
    }))
    ?.reverse();
  const activities = data?.data?.result?.recent_activities;
  const storesSummary = data?.data?.result?.store_summaries;
  const categoriesSummary = data?.data?.result?.category_summaries;

  return (
    <div className="p-6 space-y-8 h-full w-full" dir={'rtl'}>
      <Cards data={data?.data?.result?.kpis} />
      <div className="">
        <div className="flex gap-5 ">
          {activities && (
            <div className=" bg-white flex-1 dark:bg-gray-600 shadow-lg min-h-max p-4 rounded-lg">
              <RecentActivitiesCard activities={activities} />
            </div>
          )}
          {orders && <OrdersCard orders={orders} />}
        </div>
      </div>
      {/* {storesSummary && <GroupedBarChart data={storesSummary} />} */}
      {storesSummary && <StoreChart storesSummary={storesSummary} />}
      <div className="flex gap-5 ">
        {storesSummary && <StoresTable storesSummary={storesSummary} />}
        {/* Categories grid */}
        {categoriesSummary && (
          <CategoriesTable categoriesSummary={categoriesSummary} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
