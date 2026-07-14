import { createNavigation } from 'next-intl/navigation';

import { routing } from '@/i18n/routing';

/**
 * Locale-aware navigation primitives (official next-intl). All internal
 * links in components MUST use this Link — never next/link directly —
 * so hrefs carry the active locale automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);