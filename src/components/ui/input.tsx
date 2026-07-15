import { type ComponentPropsWithoutRef } from 'react';

import { cx } from '@/lib/cx';

export type InputProps = ComponentPropsWithoutRef<'input'>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cx(
        'h-11 w-full rounded-control border border-border bg-surface px-3.5 text-base',
        'transition-colors duration-150 placeholder:text-ink-secondary/60',
        'focus-visible:border-accent aria-[invalid="true"]:border-error,
        className,
      )}
    />
  );
}
