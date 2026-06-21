import { Skeleton } from '@/components/ui/skeleton/Skeleton';
import React from 'react';

const GridSkeleton = () => {
  return (
    <div className=" h-full w-full justify-center">
      <Skeleton className="h-[50px] w-full" />
      <div className="flex gap-5 justify-between mt-4">
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[200px]" />
      </div>
      <div className="flex gap-5 justify-between mt-4">
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[200px]" />
      </div>
      <div className="flex gap-5 justify-between mt-4">
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[200px]" />
      </div>
    </div>
  );
};

export default GridSkeleton;
