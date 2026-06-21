import VerticalStackedBar from '@/components/charts/vertical-stacked-bar/vertical-stacked-bar';
import Typography from '@/components/ui/typography/Typography';
import { Activity, TrendingUp } from 'lucide-react';
import TitleComponent from './title';

const OrdersCard = ({ orders }) => {
  return (
    <div className="w-[400px] bg-white dark:bg-gray-600 shadow-lg min-h-max p-4 rounded-lg">
      <div className="mb-4">
        <TitleComponent Icon={Activity} Title={'ورود و خروج یک هفته اخیر'} />
        <div className="flex gap-2 justify-end">
          <div className="flex gap-1 items-center">
            <Typography variant="caption">ورودی</Typography>
            <div className="w-4 h-3 rounded bg-brand-400"></div>
          </div>
          <div className="flex gap-1 items-center">
            <Typography variant="caption">خروجی</Typography>
            <div className="w-4 h-3 rounded bg-error-400"></div>
          </div>
        </div>
      </div>
      <VerticalStackedBar
        data={orders}
        lowField="inbound"
        highField="outbound"
        textField="date"
        width={300}
        tickWidth={100}
      />
    </div>
  );
};

export default OrdersCard;
