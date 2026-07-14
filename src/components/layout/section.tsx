import { type ComponentPropsWithoutRef } from 'react';

import { cx } from '@/lib/cx';

export interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  /** `tint` alternates the section background to delineate without borders. */
  tone?: 'default' | 'tint' | 'accent';
}

/**
 * Single owner of vertical page rhythm (64 → 96 → 128px, blueprint §5/§6).
 * Children are whatever the page composes — this component never grows
 * content-shaped props (principle: composition over configuration).
 */
export function Section({ tone = 'default', className, ...props }: SectionProps) {
  return (
    <section
      {...props}
      className={cx(
        'py-16 md:py-24 lg:py-32',
        tone === 'tint' && 'bg-surface-tint',
        tone === 'accent' && 'bg-accent',
        className,
      )}
    />
  );
}