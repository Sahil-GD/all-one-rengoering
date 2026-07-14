'use client';

// Client: needs usePathname to mark the active route (aria-current).

import { Link, usePathname } from '@/i18n/navigation';
import { type ComponentPropsWithoutRef } from 'react';

import { cx } from '@/lib/cx';

export interface NavLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  href: string;
}

/**
 * Navigation link with active-route semantics. Marks the current page
 * with aria-current="page" and a data-active attribute for styling —
 * visual treatment is the caller's (desktop and mobile nav differ).
 */
export function NavLink({ href, className, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      {...props}
      href={href}
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive || undefined}
      className={cx('transition-colors duration-150', className)}
    />
  );
}