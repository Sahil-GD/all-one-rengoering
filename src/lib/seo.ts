import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { routing, type Locale } from '@/i18n/routing';

/**
 * One source of truth for per-page metadata. Every page calls this, so
 * canonical URLs, hreflang alternates, Open Graph and Twitter cards can
 * never drift apart or be forgotten.
 *
 * `path` is the locale-independent route ('' for home, '/priser', …).
 */
export interface PageSeoInput {
  locale: string;
  path: string;
  title: string;
  description: string;
  /** Route-specific social image; falls back to the site-wide OG image. */
  image?: string;
  noindex?: boolean;
}

/** Danish is the default locale and is served unprefixed at the root. */
function localizedUrl(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${siteConfig.url}${prefix}${path}`;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  noindex = false,
}: PageSeoInput): Metadata {
  const canonical = localizedUrl(locale, path);

  const languages = Object.fromEntries(
    routing.locales.map((l) => [
      l === 'da' ? 'da-DK' : 'en',
      localizedUrl(l, path),
    ]),
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { ...languages, 'x-default': localizedUrl('da', path) },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: locale === 'da' ? 'da_DK' : 'en_US',
      url: canonical,
      title,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(noindex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}

/** Breadcrumb structured data — Google shows these in results. */
export function breadcrumbJsonLd(
  locale: Locale,
  trail: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: localizedUrl(locale, item.path),
    })),
  };
}