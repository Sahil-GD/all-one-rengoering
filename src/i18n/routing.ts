import { defineRouting } from 'next-intl/routing';

/**
 * Official next-intl routing config. 'as-needed' keeps Danish (default)
 * unprefixed at / while English lives under /en. Route slugs stay Danish
 * in both locales (localized pathnames can be layered on later without
 * breaking these URLs).
 */
export const routing = defineRouting({
  locales: ['da'],
  defaultLocale: 'da',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
