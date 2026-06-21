import Typography from '@/components/ui/typography/Typography';
import React from 'react';

export interface GradientCardProps {
  title?: string;
  value?: string | number;
  subtitle?: string;
  icon?: any; // pass react-icons component, e.g. MdShoppingCart
  className?: string;
  iconColor?: string;
  gradient?: string; // Tailwind gradient classes (e.g. "from-indigo-500 via-purple-500 to-pink-500")
}

export const GradientCard: React.FC<GradientCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = '',
  className = '',
  gradient = 'from-indigo-500 via-purple-500 to-pink-500',
}) => {
  return (
    <div
      className={`rounded-xl shadow-lg overflow-hidden text-white ${className}`}
      // outer wrapper keeps shape
    >
      <div
        className={`p-4  ${gradient} flex flex-col justify-between h-[120px]`}
      >
        <div className="flex items-start justify-between ">
          <div className="flex flex-col gap-4">
            {title && <Typography variant={'body'}>{title}</Typography>}
            {value !== undefined && (
              <Typography variant={'h2'} color="primary" className="">
                {value}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant={'caption'}
                color="secondary"
                className=" opacity-80 "
              >
                {subtitle}
              </Typography>
            )}
          </div>

          {Icon && (
            <div
              className={`ml-4 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg ${iconColor}`}
            >
              <Icon className="w-6 h-6 md:w-7 md:h-7" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradientCard;
