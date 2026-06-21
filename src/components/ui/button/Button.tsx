'use client';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'text-white shadow', // Base styles for primary
        outline: 'border bg-gray-25 dark:bg-gray-800 dark:text-white shadow-sm', // Base styles for outline
        secondary: 'bg-gray-500 text-white shadow-sm hover:bg-gray-500/80', // Updated to use gray-500
        ghost: 'hover:bg-gray-100 hover:text-gray-900', // Updated to use gray colors
        link: 'underline-offset-4 hover:underline', // Base styles for link
      },
      color: {
        brand: '',
        error: '',
        success: '',
        warning: '',
        none: '', // Fallback when color is not specified
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-5 w-5',
      },
    },
    compoundVariants: [
      // Primary variant
      {
        variant: 'primary',
        color: ['brand', 'none'],
        className: 'bg-brand-500 hover:bg-brand-500/80',
      },
      {
        variant: 'primary',
        color: 'error',
        className: 'bg-error-500 hover:bg-error-500/80',
      },
      {
        variant: 'primary',
        color: 'success',
        className: 'bg-success-500 hover:bg-success-500/80',
      },
      {
        variant: 'primary',
        color: 'warning',
        className: 'bg-warning-500 hover:bg-warning-500/80',
      },
      // Outline variant
      {
        variant: 'outline',
        color: ['brand', 'none'],
        className: 'border-brand-500 text-brand-500 hover:bg-brand-300/20',
      },
      {
        variant: 'outline',
        color: 'error',
        className: 'border-error-500 text-error-500 hover:bg-error-300/20',
      },
      {
        variant: 'outline',
        color: 'success',
        className:
          'border-success-500 text-success-500 hover:bg-success-300/20',
      },
      {
        variant: 'outline',
        color: 'warning',
        className:
          'border-warning-500 text-warning-500 hover:bg-warning-300/20',
      },
      // Link variant
      {
        variant: 'link',
        color: ['brand', 'none'],
        className: 'text-brand-500 hover:bg-brand-200',
      },
      {
        variant: 'link',
        color: 'error',
        className: 'text-error-500 hover:bg-error-200',
      },
      {
        variant: 'link',
        color: 'success',
        className: 'text-success-500 hover:bg-success-200',
      },
      {
        variant: 'link',
        color: 'warning',
        className: 'text-warning-500 hover:bg-warning-200',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      color: 'none',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: 'error' | 'warning' | 'success' | 'brand' | 'none';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, color = 'none', size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, color, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
export default Button;
