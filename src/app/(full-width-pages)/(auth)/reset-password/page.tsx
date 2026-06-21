import Link from '@/components/ui/link/Link';
import Typography from '@/components/ui/typography/Typography';
import React from 'react';

export default function Page() {
  return (
    <div dir="rtl" className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto gap-10">
        <Typography variant={'h1'}>صفحه تغییر رمز عبور</Typography>

        <Link href="/login" label="بازگشت به صفحه ورود" />
        {/* <Link href={'/login'}>
          <Typography variant={'body2'} className="">
            بازگشت به صفحه ورود
          </Typography>
        </Link> */}
      </div>
    </div>
  );
}
