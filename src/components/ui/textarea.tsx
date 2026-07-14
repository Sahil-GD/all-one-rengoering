import { type ComponentPropsWithoutRef } from 'react';

import { cx } from '@/lib/cx';

export type TextareaProps = ComponentPropsWithoutRef<'textarea'>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={cx(
        'min-h-32 w-full rounded-control border border-border bg-surface px-3.5 py-2.5 text-base',
        'transition-colors duration-150 placeholder:text-ink-secondary/60',
        'focus-visible:border-accent aria-[invalid=true]:border-error',
        className,
      )}
    />
  );
}