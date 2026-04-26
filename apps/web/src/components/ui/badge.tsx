import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './button';
import { VariantProps } from 'class-variance-authority';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          buttonVariants({ variant }),
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };