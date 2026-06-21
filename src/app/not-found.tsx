import GridShape from '@/components/common/GridShape';
import Typography from '@/components/ui/typography/Typography';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <GridShape />
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <Typography variant={'h1'} className="mb-8 ">
          خطا
        </Typography>

        <Image
          src="/images/error/404.svg"
          alt="404"
          className="dark:hidden"
          width={472}
          height={152}
        />
        <Image
          src="/images/error/404-dark.svg"
          alt="404"
          className="hidden dark:block"
          width={472}
          height={152}
        />

        <Typography variant={'body2'} color="secondary" className="mt-10 mb-6">
          صفحه مورد نظر پیدا نشد
        </Typography>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
