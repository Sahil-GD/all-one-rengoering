import { type CSSProperties } from 'react';

import { ArrowRight, Check } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { CtaPanel } from '@/components/sections/cta-panel';
import { Button } from '@/components/ui/button';
import { MediaFrame } from '@/components/ui/media-frame';
import { serviceContent } from '@/content/services';
import { Link } from '@/i18n/navigation';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import { routing, type Locale } from '@/i18n/routing';
import { SERVICES, type ServiceSlug } from '@/lib/schemas/quote';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICES.map((slug) => ({ locale, slug })),
  );
}

function resolve(locale: string, slug: string) {
  if (!hasLocale(routing.locales, locale)) return null;
  if (!SERVICES.includes(slug as ServiceSlug)) return null;
  return serviceContent[locale as Locale][slug as ServiceSlug];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = resolve(locale, slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    path: `/ydelser/${slug}`,
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

/** Individual service page — editorial: overlaid hero, two-column detail. */
export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const service = resolve(locale, slug);
  if (!service) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('serviceDetail');

  const breadcrumbs = breadcrumbJsonLd(locale as Locale, [
    { name: t('breadcrumbHome'), path: '' },
    { name: service.title, path: `/ydelser/${slug}` },
  ]);

  // Service structured data (blueprint §9).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    areaServed: { '@type': 'AdministrativeArea', name: 'Sjælland' },
    provider: { '@type': 'LocalBusiness', name: 'All One Rengøring' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="relative">
        <MediaFrame
          ratio="video"
          image={service.image}
          priority
          sizes="100vw"
          className="max-h-[60vh] w-full"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-accent via-accent/60 to-accent/10"
        />
        <Container className="absolute inset-x-0 bottom-0 pb-10 lg:pb-14">
          <p className="text-overline uppercase text-green-soft">{service.eyebrow}</p>
          <h1 className="mt-2 max-w-3xl text-h1 text-balance text-accent-contrast">
            {service.title}
          </h1>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:py-20">
        <div>
          <p data-reveal className="max-w-2xl text-xl leading-relaxed text-pretty">
            {service.intro}
          </p>

          <h2 data-reveal className="mt-12 text-h2">
            {t('includesHeading')}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.includes.map((item, index) => (
              <li
                key={item}
                data-reveal
                style={{ '--reveal-delay': `${index * 60}ms` } as CSSProperties}
                className="flex items-start gap-2.5 rounded-control bg-cream p-4 text-sm font-medium"
              >
                <Check
                  size={20}
                  strokeWidth={2}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-accent-secondary"
                />
                {item}
              </li>
            ))}
          </ul>

          <h2 data-reveal className="mt-12 text-h2">
            {t('suitedForHeading')}
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {service.suitedFor.map((item) => (
              <li key={item} data-reveal className="flex items-start gap-3 text-lg text-pretty">
                <span
                  aria-hidden
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
                />
                {item}
              </li>
            ))}
          </ul>

          <h2 data-reveal className="mt-12 text-h2">
            {t('faqHeading')}
          </h2>
          <div className="mt-6 flex flex-col gap-3">
            {service.faq.map((item) => (
              <details
                key={item.question}
                name="service-faq"
                data-reveal
                className="group rounded-card border border-border bg-surface px-5 open:border-accent/25 sm:px-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    aria-hidden
                    className="text-xl text-ink-secondary transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 text-pretty text-ink-secondary">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Sticky sidebar — price factors + CTA. */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-panel bg-mist p-7">
            <h2 className="text-h3">{t('priceHeading')}</h2>
            <p className="mt-2 text-sm text-ink-secondary">{t('priceIntro')}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {service.priceFactors.map((factor) => (
                <li key={factor} className="flex items-start gap-2.5 text-sm">
                  <Check
                    size={16}
                    strokeWidth={2}
                    aria-hidden
                    className="mt-1 shrink-0 text-accent-secondary"
                  />
                  {factor}
                </li>
              ))}
            </ul>
            <Button href="/tilbud" size="lg" className="mt-6 w-full">
              {t('cta')}
            </Button>
          </div>

          <div className="mt-5 rounded-panel border border-border p-7">
            <h2 className="text-overline uppercase text-ink-secondary">
              {t('otherHeading')}
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {SERVICES.filter((s) => s !== slug).map((other) => (
                <li key={other}>
                  <Link
                    href={`/ydelser/${other}`}
                    className="group flex items-center justify-between gap-2 rounded-control py-1.5 text-sm font-medium transition-colors hover:text-accent"
                  >
                    {serviceContent[locale as Locale][other].title}
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      aria-hidden
                      className="text-ink-secondary transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>

      <CtaPanel
        heading={t('ctaHeading')}
        text={t('ctaText')}
        buttonLabel={t('cta')}
        buttonHref="/tilbud"
      />
    </>
  );
}