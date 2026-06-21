import React from 'react';
import Typography from '@/components/ui/typography/Typography';
import { ShoppingBag } from 'lucide-react';
import { History, Activity } from 'lucide-react';
import TitleComponent from './title';
interface Activity {
  id: number;
  type: string;
  action: string;
  description: string;
  timestamp: string;
  user: string | null;
}

interface RecentActivitiesCardProps {
  activities: Activity[];
}

const RecentActivitiesCard: React.FC<RecentActivitiesCardProps> = ({
  activities,
}) => {
  return (
    <>
      <TitleComponent Icon={History} Title={'فعالیت های اخیر'} />
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-400 mb-4 " />
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto px-2 py-1">
        {activities.map((item, index) => (
          <div className="flex flex-col" key={item.id}>
            <div className="flex  justify-between rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
              <div className="flex items-center gap-3">
                {item.type === 'order' && (
                  <div className="w-7 h-7 flex items-center justify-center  rounded-[8px] bg-success-200 dark:bg-success-700">
                    <ShoppingBag className="w-4 h-4 text-success-400 dark:text-success-200" />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <Typography variant="body2" color="primary">
                    {item.action}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    {item.description}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col">
                <Typography variant="caption" color="secondary">
                  {new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }).format(new Date(item.timestamp))}
                </Typography>
                {item.user && (
                  <div className="bg-brand-50 dark:bg-brand-500 px-2  rounded-lg">
                    <Typography
                      variant="caption"
                      color="primary"
                      className="mt-1 text-brand-700 data-text-brand-100:"
                    >
                      {item.user}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
            {index !== activities.length - 1 && (
              <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-400  my-1" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentActivitiesCard;
