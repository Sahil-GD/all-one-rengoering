'use client';

// Client: needs the current pathname to switch locale in place.

import { useLocale } from 'next-intl';
import { Fragment } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cx } from '@/lib/cx';

export interface LocaleSwitcherProps {
  /** Accessible name for the switcher nav ("Sprog" / "Language"). */
  label: string;
  className?: string;
}

/**
 * DA / EN toggle. Links to the same pathname in the other locale —
 * next-intl's Link handles prefixing ('/' ⇄ '/en/...').
 */
export function LocaleSwitcher({ label, className }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <nav
      aria-label={label}
      className={cx('items-center gap-0.5 text-sm font-medium', className)}
    >
      {routing.locales.map((locale, index) => (
        <Fragment key={locale}>
          {index > 0 && (
            <span aria-hidden className="text-border">
              /
            </span>
          )}
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === activeLocale ? 'true' : undefined}
            className={cx(
              'rounded-full px-2 py-1 uppercase transition-colors duration-150',
              locale === activeLocale
                ? 'text-ink'
                : 'text-ink-secondary hover:text-ink',
            )}
          >
            {locale}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}