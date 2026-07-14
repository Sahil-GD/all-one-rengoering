import { type ReactNode } from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Schibsted_Grotesk } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import { siteConfig } from '@/config/site';
import { localBusinessJsonLd, organizationJsonLd } from '@/lib/json-ld';
import { Header } from '@/components/navigation/header';
import { Footer } from '@/components/navigation/footer';
import { SkipLink } from '@/components/layout/skip-link';
import { ScrollReveal } from '@/components/features/scroll-reveal';

import '@/styles/globals.css';

/*
 * Single variable typeface (design system §5) — Schibsted Grotesk:
 * Scandinavian provenance, full æøå coverage, one file, swap display.
 */
const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LayoutParams {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('titleDefault'),
      template: `%s | ${siteConfig.name}`,
    },
    description: t('description'),
    alternates: {
      languages: { da: '/', en: '/en', 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: locale === 'da' ? 'da_DK' : 'en_DK',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: ReactNode }> & LayoutParams) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enables static rendering with next-intl (official pattern).
  setRequestLocale(locale);

  return (
    <html lang={locale} className={schibsted.variable}>
      <body className="flex min-h-svh flex-col">
        {/* LocalBusiness structured data, sitewide (blueprint §9). */}
        <script
          type="application/ld+json"
          // Serialized from our own typed config — no user input involved.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <NextIntlClientProvider>
          <ScrollReveal />
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}