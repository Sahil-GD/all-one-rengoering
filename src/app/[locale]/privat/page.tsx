import { ArrowRight, Check, Receipt } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';
import { CtaPanel } from '@/components/sections/cta-panel';
import { PageHeroSplit } from '@/components/sections/page-hero-split';
import { TrustBadges } from '@/components/sections/trust-badges';
import { Button } from '@/components/ui/button';
import { MediaFrame } from '@/components/ui/media-frame';
import { Link } from '@/i18n/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privat' });
  return buildMetadata({
    locale,
    path: '/privat',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

/** PRIVAT — split hero + floating glass card, cream canvas, alternating rows. */
export default async function PrivatPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privat');
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
      <PageHeroSplit
        eyebrow={t('eyebrow')}
        heading={t('heading')}
        intro={t('intro')}
        image={heroImage}
        actions={<Button href="/tilbud" size="lg">{t('cta.button')}</Button>}
        floatingCard={
          <div className="flex gap-3">
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-green-soft text-accent-secondary"
            >
              <Receipt size={20} strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-sm font-semibold">{t('noteHeading')}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-secondary">
                {t('noteText')}
              </p>
            </div>
          </div>
        }
      />

      {/* Alternating image/text rows — the privat signature. */}
      <div className="bg-cream">
        <Container className="flex flex-col gap-16 py-20 lg:gap-24 lg:py-28">
          {services.map((service, index) => (
            <div
              key={service.title}
              data-reveal
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="relative">
                <div
                  aria-hidden
                  className={`absolute -inset-3 -z-10 rounded-panel bg-sage/50 ${
                    index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                  }`}
                />
                <MediaFrame
                  ratio="photo"
                  image={service.image}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="group rounded-panel shadow-raised [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-emphasis hover:[&_img]:scale-105"
                />
              </div>
              <div>
                <p className="text-overline uppercase text-accent-secondary">
                  0{index + 1}
                </p>
                <h2 className="mt-2 text-h2 text-balance">{service.title}</h2>
                <p className="mt-4 max-w-md text-lg text-pretty text-ink-secondary">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
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
            </div>
          ))}
        </Container>
      </div>

      <Container className="py-16">
        <ul className="grid gap-4 sm:grid-cols-3">
          {points.map((point) => (
            <li
              key={point}
              data-reveal
              className="flex items-center gap-3 rounded-card border border-border bg-surface p-5 text-sm font-medium"
            >
              <Check
                size={20}
                strokeWidth={2}
                aria-hidden
                className="shrink-0 text-accent-secondary"
              />
              {point}
            </li>
          ))}
        </ul>
      </Container>

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