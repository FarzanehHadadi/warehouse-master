import React, { useMemo } from 'react';
import clsx from 'clsx';
import { bgColors } from '../_constants/colors';
import Typography from '@/components/ui/typography/Typography';

const ChartLegend = ({
  data,
  labelField,
  orientation = 'vertical',
  bgClassNameForSingleColor,
}: {
  data: any;
  labelField: string;
  orientation?: 'vertical' | 'horizontal';
  bgClassNameForSingleColor?: string;
}) => {
  const uniqueLabels = useMemo(() => {
    // Use Set to get unique values, then convert back to array
    const uniqueSet = new Set(data.map((item) => item?.[labelField]));

    // Convert Set back to array and map to original data structure
    return Array.from(uniqueSet).map((label, index) => ({
      [labelField]: label,
      originalIndex: index,
      key: String(label),
    }));
  }, [data, labelField]);
  return (
    <div
      className={clsx(
        'flex   gap-2 items-center ',
        orientation === 'vertical'
          ? 'flex-col justify-center'
          : 'flex-row justify-end'
      )}
    >
      {uniqueLabels?.map((item, index) => (
        <div key={item.key} className="flex gap-2 items-center justify-end">
          <div
            className={clsx(
              'w-[8px] h-[8px] rounded-full',
              `${
                bgClassNameForSingleColor ?? bgColors[index % bgColors.length]
              }`
            )}
          />
          <Typography> {item?.[labelField] as string}</Typography>
        </div>
      ))}
    </div>
  );
};

export default ChartLegend;
