// import { Box, Typography } from '@mui/material'
import Typography from '@/components/ui/typography/Typography';
import React from 'react';
const BAR_CONTAINER_GAP = -8;
const getMaxFromArray = (data, lowField, highField) => {
  let max = 0;
  data.forEach((item) => {
    const low = +(item?.[lowField] ?? 0);
    const high = +(item?.[highField] ?? 0);
    const sum = low + high;
    if (sum > max) {
      max = sum;
    }
  });
  return max;
};
interface Props {
  width?: number;
  tickWidth?: number;
  textField?: string;
  lowField: string;
  highField?: string;
  data: any[];
}
const VerticalStackedBar = ({
  width = 574,
  tickWidth = 180,
  textField = 'EventCode',
  lowField,
  highField,
  data,
}: Props) => {
  const maxValue = getMaxFromArray(data, lowField, highField);
  const barWidth = width - tickWidth + BAR_CONTAINER_GAP;
  const internalGap = highField ? BAR_CONTAINER_GAP / 2 : BAR_CONTAINER_GAP;
  const getItemWidth = (itemValue) => {
    const value = Number(itemValue);
    if (value === 0) return 0;
    return (value / maxValue) * barWidth + internalGap;
  };

  return (
    <div className="flex gap-[10px] flex-col">
      {data?.map((item) => {
        const calcWidthL = getItemWidth(+item?.[lowField]);
        const calcWidthH = highField ? getItemWidth(+item?.[highField]) : 0;
        const widthL = calcWidthL <= 0 ? '0px' : `${calcWidthL}px`;
        const widthH = calcWidthH <= 0 ? '0px' : `${calcWidthH}px`;

        return (
          <div className="flex gap-2" key={item[textField]}>
            <Typography
              variant="caption"
              className="text-end text-bold text-ellipsis"
              style={{ width: tickWidth }}
            >
              {item[textField]}
            </Typography>
            <div
              className="h-5 flex-1 rounded-xl border hover:border-brand-500 transition-all cursor-pointer p-0.5  flex items-center"
              style={{
                width: barWidth,
                maxWidth: barWidth,
              }}
            >
              <div
                className="rounded-lg border border-white/25 bg-gradient-to-r from-brand-200 to-brand-500  items-center justify-center h-4 px-2 py-0 flex-shrink-0"
                style={{
                  width: widthL,
                  ['--target-width-l' as any]: widthL,
                  animation: 'growWidthL 0.5s ease-in-out',
                  display: widthL === '0px' ? 'none' : 'flex',
                }}
              >
                <Typography
                  variant="caption"
                  className="text-white text-center"
                >
                  {item?.[lowField]}
                </Typography>
              </div>
              {highField && item?.[highField] ? (
                <div
                  className="rounded-full border border-white/25 bg-[linear-gradient(23deg,theme(colors.error.400)_20.44%,theme(colors.error.400)_85.08%)]  items-center justify-center h-4 px-2 py-0 flex-shrink-0"
                  style={{
                    // width: getItemWidth(item.H),
                    width: widthH,
                    ['--target-width-h' as any]: widthH,
                    opacity: 0, // Initially hidden
                    animation: 'growWidthH 0.7s ease-in-out 0.5s forwards', // Delayed animation with forwards fill
                    display: widthH === '0px' ? 'none' : 'flex',
                  }}
                >
                  <Typography variant="caption" className="text-white text-end">
                    {item?.[highField]}
                  </Typography>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      })}
      <style jsx global>{`
        @keyframes growWidthL {
          from {
            width: 0;
          }
          to {
            width: var(--target-width-l);
          }
        }
        @keyframes growWidthH {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: var(--target-width-h);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default VerticalStackedBar;
