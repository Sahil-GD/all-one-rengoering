import { type CSSProperties } from 'react';

import { Building2, CalendarClock, Check, Sparkles, Star, type LucideIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';
import { CtaPanel } from '@/components/sections/cta-panel';
import { TrustBadges } from '@/components/sections/trust-badges';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return buildMetadata({
    locale,
    path: '/priser',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

/* Tier icons — one-off / recurring / business, same family and weight. */
const tierIcons: readonly LucideIcon[] = [Sparkles, CalendarClock, Building2];

/**
 * PRISER — deliberately photography-free: pricing is a clarity page, so
 * typography and structure carry it. Tinted canvas + comparison cards
 * with a highlighted middle tier. No hero image, unlike every other page.
 */
export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pricing');
  const tBadges = await getTranslations('badges');
  const factors = t.raw('factors') as ReadonlyArray<{
    title: string;
    description: string;
  }>;
  const included = t.raw('included') as readonly string[];
  const tiers = t.raw('tiers') as ReadonlyArray<{
    name: string;
    description: string;
    features: readonly string[];
    featured?: boolean;
    badge?: string;
  }>;

  return (
    <>
      <section className="relative overflow-hidden bg-mist">
        {/* Decorative shapes — priser signature (geometry, not photography). */}
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sage/40 blur-3xl"
        />
        <Container className="relative py-20 text-center lg:py-28">
          <p className="text-overline uppercase text-accent-secondary">
            {t('eyebrow')}
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-h1 text-balance">
            {t('heading')}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-ink-secondary">
            {t('intro')}
          </p>
        </Container>
      </section>

      <Container className="-mt-10 pb-20 lg:-mt-14 lg:pb-28">
        <ul className="grid gap-5 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <li
              key={tier.name}
              data-reveal
              style={{ '--reveal-delay': `${index * 110}ms` } as CSSProperties}
              className={`relative flex flex-col rounded-panel p-7 transition duration-300 ease-emphasis hover:-translate-y-1 lg:p-8 ${
                tier.featured
                  ? 'bg-accent text-accent-contrast shadow-overlay lg:-mt-6 lg:pb-12'
                  : 'border border-border bg-surface shadow-raised'
              }`}
            >
              {tier.featured && tier.badge && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-accent-secondary px-3 py-1 text-xs font-semibold text-accent-contrast">
                  <Star size={16} strokeWidth={2} aria-hidden />
                  {tier.badge}
                </span>
              )}
              <span
                aria-hidden
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-card ${
                  tier.featured
                    ? 'bg-accent-contrast/15 text-green-soft'
                    : 'bg-green-soft text-accent-secondary'
                }`}
              >
                {(() => {
                  const Icon = tierIcons[index] ?? Sparkles;
                  return <Icon size={20} strokeWidth={1.5} />;
                })()}
              </span>
              <h2 className="text-h3">{tier.name}</h2>
              <p
                className={`mt-2 text-sm leading-relaxed text-pretty ${
                  tier.featured ? 'text-accent-contrast/75' : 'text-ink-secondary'
                }`}
              >
                {tier.description}
              </p>
              <ul className="mt-6 flex grow flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={16}
                      strokeWidth={2}
                      aria-hidden
                      className={`mt-1 shrink-0 ${
                        tier.featured ? 'text-green-soft' : 'text-accent-secondary'
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href="/tilbud"
                variant={tier.featured ? 'inverse' : 'secondary'}
                className="mt-7 w-full"
              >
                {t('tierCta')}
              </Button>
            </li>
          ))}
        </ul>
      </Container>

      {/* Price factors as a hairline table — not cards, unlike other pages. */}
      <div className="bg-cream">
        <Container className="py-20 lg:py-24">
          <h2 data-reveal className="max-w-xl text-h2 text-balance">
            {t('factorsHeading')}
          </h2>
          <dl className="mt-10 flex flex-col">
            {factors.map((factor, index) => (
              <div
                key={factor.title}
                data-reveal
                style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}
                className="grid gap-2 border-t border-border py-6 md:grid-cols-[auto_1fr_1.6fr] md:items-baseline md:gap-10"
              >
                <span aria-hidden className="text-sm tabular-nums text-accent-secondary">
                  0{index + 1}
                </span>
                <dt className="text-h3">{factor.title}</dt>
                <dd className="text-pretty text-ink-secondary">{factor.description}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 rounded-panel border border-border bg-surface p-8">
            <h2 className="text-h3">{t('includedHeading')}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium">
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
          </div>
        </Container>
      </div>

      <TrustBadges
        items={[
          { icon: 'tag', label: tBadges('fixedPrice') },
          { icon: 'file', label: tBadges('freeQuote') },
          { icon: 'shield', label: tBadges('insured'), claim: 'insured' },
          {
            icon: 'badge',
            label: tBadges('guarantee'),
            claim: 'satisfactionGuarantee',
          },
          { icon: 'pin', label: tBadges('area') },
        ]}
      />
      <CtaPanel
        heading={t('cta.heading')}
        text={t('cta.text')}
        buttonLabel={t('cta.button')}
        buttonHref="/tilbud"
      />
    </>
  );
}