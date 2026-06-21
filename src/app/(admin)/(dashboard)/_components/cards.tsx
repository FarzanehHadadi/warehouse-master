import React from 'react';
import GradientCard from './gradient-card';
import {
  AlertTriangle,
  Clock,
  Package2,
  ShoppingBag,
  ShoppingCart,
  Store,
  TrendingUp,
  Users,
} from 'lucide-react';

const Cards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <GradientCard
        title="تعداد کالاها"
        value={data?.[0]?.value}
        icon={Package2}
        iconColor="text-success-600 dark:text-success-200"
        gradient="
  bg-[radial-gradient(circle_at_top_left,theme(colors.success.50)_20%,white_70%)]
  dark:bg-[radial-gradient(circle_at_top_left,theme(colors.success.500)_0%,theme(colors.gray.500)_40%,theme(colors.gray.600)_100%)]"
      />

      <GradientCard
        title="هشدار انبار"
        value={data?.[2]?.value}
        icon={AlertTriangle}
        iconColor="text-warning-600 dark:text-warning-200"
        gradient="
 bg-[radial-gradient(circle_at_top_left,theme(colors.warning.50)_20%,white_70%)]
  dark:bg-[radial-gradient(circle_at_top_left,theme(colors.warning.400)_0%,theme(colors.gray.500)_40%,theme(colors.gray.600)_100%)]"
      />

      <GradientCard
        title="ورود و خروج امروز"
        value={data?.[1]?.value}
        icon={ShoppingCart}
        iconColor="text-brand-600 dark:text-brand-200"
        gradient="
  bg-[radial-gradient(circle_at_top_left,theme(colors.brand.50)_0%,white_60%)]
  dark:bg-[radial-gradient(circle_at_top_left,theme(colors.brand.500)_0%,theme(colors.gray.500)_40%,theme(colors.gray.600)_100%)]"
      />

      <GradientCard
        title="انبارهای فعال"
        value={data?.[3]?.value}
        icon={Store}
        gradient="
  bg-[radial-gradient(circle_at_top_left,theme(colors.rose.100)_0%,white_60%)]
  dark:bg-[radial-gradient(circle_at_top_left,theme(colors.rose.600)_0%,theme(colors.gray.500)_40%,theme(colors.gray.600)_100%)]"
        iconColor="text-rose-600 dark:text-rose-200"
      />
    </div>
  );
};

export default Cards;
