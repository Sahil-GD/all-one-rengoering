import { type CSSProperties } from 'react';

import { MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';
import { CtaPanel } from '@/components/sections/cta-panel';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'areas' });
  return buildMetadata({
    locale,
    path: '/omraader',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

/** SERVICE AREAS — typographic town index on cream. Local-SEO surface. */
export default async function AreasPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('areas');
  const regions = t.raw('regions') as ReadonlyArray<{
    name: string;
    towns: readonly string[];
  }>;

  return (
    <>
      <div className="bg-cream">
        <Container className="py-16 lg:py-24">
          <div className="max-w-2xl">
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-card bg-accent text-accent-contrast"
            >
              <MapPin size={24} strokeWidth={1.5} />
            </span>
            <p className="mt-6 text-overline uppercase text-accent-secondary">
              {t('eyebrow')}
            </p>
            <h1 className="mt-3 text-h1 text-balance">{t('heading')}</h1>
            <p className="mt-4 text-lg text-pretty text-ink-secondary">{t('intro')}</p>
          </div>

          <div className="mt-14 flex flex-col gap-10">
            {regions.map((region, index) => (
              <section
                key={region.name}
                data-reveal
                style={{ '--reveal-delay': `${index * 100}ms` } as CSSProperties}
                className="grid gap-4 border-t border-border pt-8 md:grid-cols-[1fr_2.2fr] md:gap-10"
              >
                <h2 className="text-h3">{region.name}</h2>
                <ul className="flex flex-wrap gap-2">
                  {region.towns.map((town) => (
                    <li
                      key={town}
                      className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors duration-150 hover:border-accent hover:text-accent"
                    >
                      {town}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-10 text-pretty text-ink-secondary">{t('note')}</p>
        </Container>
      </div>

      <CtaPanel
        heading={t('cta.heading')}
        text={t('cta.text')}
        buttonLabel={t('cta.button')}
        buttonHref="/tilbud"
      />
    </>
  );
}