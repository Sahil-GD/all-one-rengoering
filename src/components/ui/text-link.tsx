import { Link } from '@/i18n/navigation';
import { type ComponentPropsWithoutRef } from 'react';

import { cx } from '@/lib/cx';

export type TextLinkProps = ComponentPropsWithoutRef<typeof Link>;

/**
 * Inline text link with the sitewide link treatment. Exists to solve a
 * consistency problem: every prose/footer link underlines and transitions
 * identically without repeating the class string at call sites.
 */
export function TextLink({ className, ...props }: TextLinkProps) {
  return (
    <Link
      {...props}
      className={cx(
        'underline decoration-border underline-offset-4 transition-colors',
        'duration-150 hover:decoration-ink',
        className,
      )}
    />
  );
}