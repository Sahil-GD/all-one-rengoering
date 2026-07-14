import { Link } from '@/i18n/navigation';
import { type ComponentPropsWithoutRef } from 'react';

import { cx } from '@/lib/cx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
/** `sm` intentionally absent — no current use case (principle §0.3). */
type ButtonSize = 'md' | 'lg';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** `href` present → renders a locale-aware link; absent → native button.
 *  Hash/tel/mailto/external hrefs render a plain <a> (no locale prefix). */
type ButtonAsLink = CommonProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };
type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<'button'> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base = cx(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium',
  'transition duration-200 ease-emphasis',
  'disabled:pointer-events-none disabled:opacity-50',
);

const variants: Record<ButtonVariant, string> = {
  /* Solid accent — reserved for the primary conversion action. */
  primary:
    'bg-accent text-accent-contrast shadow-raised hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-overlay active:translate-y-0 active:shadow-raised',
  /* Quiet outline — secondary paths ("Se vores ydelser"). */
  secondary:
    'border border-border bg-transparent text-ink hover:border-accent hover:text-accent',
  /* Text-level action — tertiary ("Læs mere"). */
  ghost: 'text-ink underline-offset-4 hover:underline',
  /* Primary action on dark (ink) surfaces; focus ring stays visible. */
  inverse:
    'bg-surface text-accent shadow-raised hover:-translate-y-0.5 hover:bg-surface-tint hover:shadow-overlay active:translate-y-0 focus-visible:outline-surface',
};

/* Heights meet the 44px touch-target floor (CONVENTIONS.md §7). */
const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-6 text-base',
  lg: 'h-12 px-7 text-base',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className } = props;
  const classes = cx(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, ...linkProps } = props;
    if (!props.href.startsWith('/')) {
      // Hash anchors, tel:, mailto:, external URLs — locale-agnostic.
      return <a {...linkProps} className={classes} />;
    }
    return <Link {...linkProps} className={classes} />;
  }

  const { variant: _v, size: _s, className: _c, ...buttonProps } = props;
  return <button {...buttonProps} className={classes} />;
}