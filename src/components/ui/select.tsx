import { type ComponentPropsWithoutRef } from 'react';

import { cx } from '@/lib/cx';

export type SelectProps = ComponentPropsWithoutRef<'select'>;

/** Native select, styled to match Input. Platform behavior, zero JS. */
export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={cx(
        'h-11 w-full appearance-none rounded-control border border-border bg-surface px-3.5 text-base',
        'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2356564f%22 stroke-width=%221.5%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E")]',
        'bg-[position:right_0.875rem_center] bg-no-repeat pr-10',
        'transition-colors duration-150',
        'focus-visible:border-accent aria-[invalid=true]:border-error',
        className,
      )}
    >
      {children}
    </select>
  );
}