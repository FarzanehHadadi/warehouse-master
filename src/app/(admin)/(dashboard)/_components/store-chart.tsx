import BarChart from '@/components/charts/bar-chart/bar-chart';
import Typography from '@/components/ui/typography/Typography';
const StoreChart = ({ storesSummary }) => {
  return (
    <div className="flex gap-5 ">
      <div className=" bg-white flex-1 dark:bg-gray-600 shadow-lg min-h-max p-4 rounded-lg">
        <ChartComponent
          data={storesSummary}
          label={'کالاها انبارها'}
          valueIndex={'total_products'}
          color="var(--color-brand-400)"
        />
      </div>
      <div className=" bg-white flex-1 dark:bg-gray-600 shadow-lg min-h-max p-4 rounded-lg">
        <ChartComponent
          data={storesSummary}
          label={'آیتم های انبارها'}
          valueIndex={'total_quantity'}
          color="var(--color-success-400)"
        />
      </div>
      <div className=" bg-white flex-1 dark:bg-gray-600 shadow-lg min-h-max p-4 rounded-lg">
        <ChartComponent
          data={storesSummary}
          label={' ورود و خروج های جاری انبارها'}
          color="var(--color-warning-400)"
          valueIndex={'recent_orders'}
        />
      </div>
    </div>
  );
};

export default StoreChart;

const ChartComponent = ({ data, valueIndex, label, color }) => {
  return (
    <div className="text-center">
      <BarChart
        labelIndex="store_name"
        valueIndex={valueIndex}
        data={data}
        height={200}
        color={color}
      />
      <Typography variant={'body'}>{label}</Typography>
    </div>
  );
};
