'use client';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import EyeCloseIcon from '@public/images/icons/eye-close.svg';
import EyeIcon from '@public/images/icons/eye.svg';
import React, { useState } from 'react';
import Link from '../ui/link/Link';
import Typography from '../ui/typography/Typography';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type Inputs = {
  userName: string;
  password: string;
};

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: data.userName,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      router.push('/');
    } catch {
      toast.error('ورود ناموفق بود. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div dir="rtl" className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <Typography variant={'h1'} className="mb-2">
              ورود به سامانه
            </Typography>
            <Typography variant={'body2'} className="" color="secondary">
              به سامانه انبار خوش آمدید!{' '}
            </Typography>
          </div>
          <div>
            <form className="" dir="rtl" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    نام کاربری <span className="text-error-500">*</span>{' '}
                  </Label>
                  <Input
                    placeholder="نام کاربری"
                    type="text"
                    {...register('userName', {
                      required: 'نام کاربری الزامی است',
                      minLength: {
                        value: 3,
                        message: 'نام کاربری باید حداقل ۳ کاراکتر باشد',
                      },
                    })}
                    error={!!errors.userName}
                    hint={errors.userName?.message}
                  />
                </div>
                <div>
                  <Label>
                    رمز عبور <span className="text-error-500">*</span>{' '}
                  </Label>
                  <div className="relative">
                    <Input
                      {...register('password')}
                      {...register('password', {
                        required: 'رمز عبور الزامی است',
                        minLength: {
                          value: 3,
                          message: 'رمز عبور باید حداقل 3 کاراکتر باشد',
                        },
                      })}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="رمز عبور خود را وارد کنید"
                      error={!!errors.password}
                      hint={errors.password?.message}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <Link href="/reset-password" label="فراموشی رمز عبور" />
                </div>
                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'در حال ورود...' : 'ورود'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
