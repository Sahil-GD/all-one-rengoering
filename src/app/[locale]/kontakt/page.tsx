import { Clock, MapPin, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { MediaFrame } from '@/components/ui/media-frame';
import { phoneHref, siteConfig } from '@/config/site';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildMetadata({
    locale,
    path: '/kontakt',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

/** KONTAKT — glass contact card floating over imagery, mist canvas. */
export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const image = t.raw('image') as { src: string; alt: string };

  return (
    <div className="bg-mist">
      <Container className="py-16 lg:py-24">
        <div className="relative">
          <MediaFrame
            ratio="video"
            image={image}
            priority
            sizes="100vw"
            className="rounded-panel shadow-overlay"
          />
          <div
            aria-hidden
            className="absolute inset-0 rounded-panel bg-gradient-to-tr from-accent/70 via-accent/25 to-transparent"
          />

          {/* Floating glass card — the kontakt signature. */}
          <div className="relative z-10 mx-auto -mt-24 w-full max-w-xl rounded-panel border border-surface/40 bg-surface/85 p-7 shadow-overlay backdrop-blur-xl sm:p-9 lg:mx-0 lg:-mt-32 lg:ml-10">
            <p className="text-overline uppercase text-accent-secondary">
              {t('eyebrow')}
            </p>
            <h1 className="mt-2 text-h2 text-balance">{t('heading')}</h1>
            <p className="mt-3 text-pretty text-ink-secondary">{t('intro')}</p>

            <a
              href={phoneHref}
              className="mt-6 flex items-center gap-3 rounded-card bg-accent p-4 text-accent-contrast transition duration-200 ease-emphasis hover:-translate-y-0.5 hover:shadow-overlay"
            >
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-accent-contrast/15"
              >
                <Phone size={20} strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-xs uppercase opacity-70">
                  {t('phoneHeading')}
                </span>
                <span className="text-xl font-semibold tabular-nums">
                  {siteConfig.contact.phone}
                </span>
              </span>
            </a>

            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="flex gap-3">
                <MapPin
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-accent-secondary"
                />
                <div>
                  <dt className="text-sm font-semibold">{t('addressHeading')}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-secondary">
                    {siteConfig.address.street}
                    <br />
                    {t('cvrLabel')} {siteConfig.cvr}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-accent-secondary"
                />
                <div>
                  <dt className="text-sm font-semibold">{t('areaHeading')}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-secondary">
                    {t('areaNote')}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-7 border-t border-border pt-6">
              <h2 className="text-h3">{t('ctaHeading')}</h2>
              <p className="mt-1 text-sm text-ink-secondary">{t('ctaText')}</p>
              <Button href="/tilbud" size="lg" className="mt-4 w-full sm:w-auto">
                {t('ctaButton')}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}