import { ChevronDown } from 'lucide-react';
import { type ComponentPropsWithoutRef } from 'react';

import { cx } from '@/lib/cx';

export type SelectProps = ComponentPropsWithoutRef<'select'>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className={cx(
          'h-11 w-full appearance-none rounded-control border border-border bg-surface px-3.5 pr-10 text-base',
          'transition-colors duration-150',
          'focus-visible:border-accent aria-[invalid="true"]:border-error',
          className,
        )}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={1.5}
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-secondary"
      />
    </div>
  );
}
