import { type ComponentPropsWithoutRef } from 'react';

import { cx } from '@/lib/cx';

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  /** `content` = 1200px marketing width; `prose` = 720px reading width. */
  width?: 'content' | 'prose';
}

/**
 * The ONLY component that defines horizontal page padding
 * (gutters 16 → 24 → 32px per blueprint §5).
 */
export function Container({
  width = 'content',
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={cx(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        width === 'content' ? 'max-w-content' : 'max-w-prose',
        className,
      )}
    />
  );
}