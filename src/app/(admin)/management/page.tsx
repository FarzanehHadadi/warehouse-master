'use client';

import React from 'react';
import Typography from '@/components/ui/typography/Typography';
import {
  CATEGORIES,
  CATEGORY,
  UNITS,
  UNIT,
  DEPARTMENTS,
  DEPARTMENT,
  STORES,
  STORE,
} from '@/constants/urls';
import { EnhancedTabs } from '@/components/tab/Tab'; // ✅ only import EnhancedTabs
import { ItemGrid } from '@/components/item-grid/item-grid';
import { Box, Building, Ruler, Store, UserCog } from 'lucide-react';
import StoreForm from './_components/store-form';
import DepartmentForm from './_components/department-form';

type Category = { id: number; name: string };
type Unit = { id: number; name: string };
type Department = { id: number; name: string; manager_name: string };
type Store = {
  id: number;
  name: string;
  manager_name: string;
  status: 'active' | 'inactive';
};

export default function AdminTabs() {
  return (
    <div dir="rtl" className="w-full">
      <EnhancedTabs defaultValue="categories" className="w-full">
        <EnhancedTabs.List>
          <EnhancedTabs.Trigger value="categories">
            <div className="flex justify-between items-center gap-2">
              <Box className="size-4" />
              <Typography className="text-inherit" variant={'body'}>
                دسته بندی ها
              </Typography>
            </div>
          </EnhancedTabs.Trigger>
          <EnhancedTabs.Trigger value="units">
            <div className="flex justify-between items-center gap-2">
              <Ruler className="size-4" />
              <Typography className="text-inherit" variant={'body'}>
                واحد ها
              </Typography>
            </div>
          </EnhancedTabs.Trigger>
          <EnhancedTabs.Trigger value="departments">
            <div className="flex justify-between items-center gap-2">
              <Building className="size-4" />
              <Typography className="text-inherit" variant={'body'}>
                دپارتمان ها
              </Typography>
            </div>
          </EnhancedTabs.Trigger>
          <EnhancedTabs.Trigger value="stores">
            <div className="flex justify-between items-center gap-2">
              <Store className="size-4" />
              <Typography className="text-inherit" variant={'body'}>
                انبارها
              </Typography>
            </div>
          </EnhancedTabs.Trigger>
        </EnhancedTabs.List>

        {/* Categories */}
        <EnhancedTabs.Content value="categories">
          <ItemGrid<Category>
            title="دسته بندی ها"
            fetchUrl={CATEGORIES}
            createUrl={CATEGORY}
            deleteUrl={CATEGORY}
            renderCard={(item) => (
              <div key={item.id}>
                <Typography variant="body3">{item.name}</Typography>
              </div>
            )}
          />
        </EnhancedTabs.Content>

        {/* Units */}
        <EnhancedTabs.Content value="units">
          <ItemGrid<Unit>
            title="واحد ها"
            fetchUrl={UNITS}
            createUrl={UNIT}
            deleteUrl={UNIT}
            renderCard={(item) => (
              <div key={item.id}>
                <Typography variant="body3">{item.name}</Typography>
              </div>
            )}
          />
        </EnhancedTabs.Content>

        {/* Departments */}
        <EnhancedTabs.Content value="departments">
          <ItemGrid<Department>
            title="دپارتمان ها"
            fetchUrl={DEPARTMENTS}
            createUrl={DEPARTMENT}
            deleteUrl={DEPARTMENT}
            modalTitle="انبار"
            useEditModal={true}
            FormComponent={DepartmentForm}
            renderCard={(item) => (
              <div
                key={item.id}
                className="group-hover:blur-[3px] -m-2 -mb-4 flex flex-col gap-5"
              >
                <div className="flex items-center justify-between">
                  <Typography variant="body3" className="flex gap-1">
                    {item.name}
                  </Typography>
                </div>
                <Typography variant="caption" className="flex gap-1">
                  <UserCog className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                  مدیر: {item.manager_name}
                </Typography>
              </div>
            )}
          />
        </EnhancedTabs.Content>

        {/* Stores */}
        <EnhancedTabs.Content value="stores">
          <ItemGrid<Store>
            title="انبارها"
            fetchUrl={STORES}
            createUrl={STORE}
            deleteUrl={STORE}
            modalTitle="انبار"
            useEditModal={true}
            FormComponent={StoreForm}
            renderCard={(item) => (
              <div
                key={item.id}
                className="group-hover:blur-[3px] -m-2 -mb-4 flex flex-col gap-5"
              >
                <div className="flex items-center justify-between">
                  <Typography variant="body3" className="flex gap-1">
                    {item.name}
                  </Typography>
                  <div
                    className={` w-2.5 h-2.5 rounded-full ${
                      item.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                </div>
                <Typography variant="caption" className="flex gap-1">
                  <UserCog className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                  مدیر: {item.manager_name}
                </Typography>
              </div>
            )}
          />
        </EnhancedTabs.Content>
      </EnhancedTabs>
    </div>
  );
}
