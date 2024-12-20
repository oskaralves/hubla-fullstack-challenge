import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 py-3 [&>svg~*]:pl-7 [&>svg]:w-5 [&>svg]:h-5 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-3 [&>svg]:top-[calc(50%-10px)] [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        info: 'bg-blue-50 border-blue-200 text-blue-500 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-300 [&>svg]:text-blue-400',
        destructive:
          'bg-red-100 border-red-200 text-red-500 dark:border-red-800 dark:bg-red-900 dark:text-red-300 [&>svg]:text-red-500',
        success:
          'bg-green-100 border-green-200 text-green-600 dark:border-green-800 dark:bg-green-900 dark:text-green-300 [&>svg]:text-green-600',
        warning:
          'bg-yellow-100 border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 [&>svg]:text-yellow-600',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('font-medium tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
