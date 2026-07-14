import { type CSSProperties } from 'react';

import { ArrowRight, Building2, Clock, UserCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';
import { CtaPanel } from '@/components/sections/cta-panel';
import { TrustBadges } from '@/components/sections/trust-badges';
import { PageHeroFull } from '@/components/sections/page-hero-full';
import { Button } from '@/components/ui/button';
import { MediaFrame } from '@/components/ui/media-frame';
import { Link } from '@/i18n/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'erhverv' });
  return buildMetadata({
    locale,
    path: '/erhverv',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

const pointIcons = [UserCheck, Clock, Building2] as const;

/** ERHVERV — full-bleed dark hero, breakout cards, mist canvas, editorial grid. */
export default async function ErhvervPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('erhverv');
  const tBadges = await getTranslations('badges');
  const services = t.raw('services') as ReadonlyArray<{
    title: string;
    description: string;
    image: { src: string; alt: string };
    href: string;
  }>;
  const points = t.raw('points') as readonly string[];
  const heroImage = t.raw('heroImage') as { src: string; alt: string };

  return (
    <>
      <PageHeroFull
        eyebrow={t('eyebrow')}
        heading={t('heading')}
        intro={t('intro')}
        image={heroImage}
        actions={
          <Button href="/tilbud" size="lg" variant="inverse">
            {t('cta.button')}
          </Button>
        }
        breakoutCards={
          <ul className="grid gap-4 sm:grid-cols-3">
            {points.map((point, index) => {
              const Icon = pointIcons[index] ?? UserCheck;
              return (
                <li
                  key={point}
                  className="flex items-center gap-3 rounded-card border border-border bg-surface p-5 shadow-overlay"
                >
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-accent text-accent-contrast"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <span className="text-sm font-semibold">{point}</span>
                </li>
              );
            })}
          </ul>
        }
      />

      {/* Editorial asymmetric grid — first tile spans two columns. */}
      <div className="bg-mist">
        <Container className="py-20 lg:py-28">
          <h2 data-reveal className="max-w-xl text-h2 text-balance">
            {t('noteHeading')}
          </h2>
          <p data-reveal className="mt-4 max-w-2xl text-lg text-pretty text-ink-secondary">
            {t('noteText')}
          </p>

          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li
                key={service.title}
                data-reveal
                style={{ '--reveal-delay': `${index * 110}ms` } as CSSProperties}
                className={`group relative overflow-hidden rounded-panel shadow-raised transition duration-500 ease-emphasis hover:-translate-y-1 hover:shadow-overlay ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                }`}
              >
                <MediaFrame
                  ratio={index === 0 ? 'portrait' : 'photo'}
                  image={service.image}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="h-full [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-emphasis group-hover:[&_img]:scale-105"
                />
                {/* Navy scrim + content over image — erhverv signature. */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-accent via-accent/55 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-h3 text-accent-contrast">{service.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-pretty text-accent-contrast/80">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-contrast"
                  >
                    {t('serviceCta')}
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
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