import { FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-2xl font-bold',
      h2: 'text-xl font-semibold',
      h3: 'text-lg font-medium',
      body2: 'text-sm font-normal',
      body: 'text-base font-normal',
      caption: 'text-xs font-normal',
      body3: 'text-sm font-bold',
    },
    color: {
      primary: 'text-gray-800 dark:text-white/90',
      secondary: 'text-gray-500 dark:text-gray-400',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
});

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'caption';
  color?: 'primary' | 'secondary';
}

const Typography: FC<TypographyProps> = ({
  variant,
  as: Component = 'p',
  children,
  color,
  className,
  style, // ✅ now supported
  ...props
}) => {
  return (
    <Component
      className={cn(typographyVariants({ variant, color }), className)}
      style={style} // ✅ passes down inline styles
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
