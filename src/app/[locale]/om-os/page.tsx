import { type CSSProperties } from 'react';

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';
import { CtaPanel } from '@/components/sections/cta-panel';
import { MediaFrame } from '@/components/ui/media-frame';
import { siteConfig } from '@/config/site';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return buildMetadata({
    locale,
    path: '/om-os',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

/** OM OS — full-width image hero with overlaid story, then offset staggered blocks. */
export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const paragraphs = t.raw('paragraphs') as readonly string[];
  const values = t.raw('values') as ReadonlyArray<{
    title: string;
    description: string;
  }>;
  const heroImage = t.raw('heroImage') as { src: string; alt: string };
  const blockImages = t.raw('blockImages') as ReadonlyArray<{
    src: string;
    alt: string;
  }>;

  return (
    <>
      {/* Full-width image hero — story overlaid, unique to this page. */}
      <section className="relative">
        <MediaFrame
          ratio="video"
          image={heroImage}
          priority
          sizes="100vw"
          className="max-h-[70vh] w-full"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent"
        />
        <Container className="absolute inset-x-0 bottom-0 pb-10 lg:pb-16">
          <p className="text-overline uppercase text-green-soft">{t('eyebrow')}</p>
          <h1 className="mt-2 max-w-3xl text-h1 text-balance text-surface">
            {t('heading')}
          </h1>
        </Container>
      </section>

      {/* Offset staggered story blocks — deliberately misaligned columns. */}
      <div className="bg-cream">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div data-reveal className="lg:col-span-5 lg:pt-12">
              <p className="text-xl leading-relaxed text-pretty">{paragraphs[0]}</p>
            </div>
            <div data-reveal className="lg:col-span-6 lg:col-start-7">
              <MediaFrame
                ratio="photo"
                image={blockImages[0] ?? heroImage}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="rounded-panel shadow-raised"
              />
            </div>
            <div data-reveal className="lg:col-span-5 lg:col-start-2 lg:-mt-16">
              <MediaFrame
                ratio="photo"
                image={blockImages[1] ?? heroImage}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="rounded-panel shadow-raised"
              />
            </div>
            <div data-reveal className="lg:col-span-5 lg:col-start-8 lg:self-center">
              <p className="text-lg leading-relaxed text-pretty text-ink-secondary">
                {paragraphs[1]}
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Values as large numbered rules — no cards, unlike every other page. */}
      <Container className="py-20 lg:py-24">
        <ol className="flex flex-col">
          {values.map((value, index) => (
            <li
              key={value.title}
              data-reveal
              style={{ '--reveal-delay': `${index * 100}ms` } as CSSProperties}
              className="grid gap-3 border-t border-border py-8 md:grid-cols-[auto_1fr_1.4fr] md:items-baseline md:gap-10"
            >
              <span
                aria-hidden
                className="text-h3 tabular-nums text-accent-secondary"
              >
                0{index + 1}
              </span>
              <h2 className="text-h2">{value.title}</h2>
              <p className="text-lg text-pretty text-ink-secondary">
                {value.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-panel bg-mist p-8 lg:p-10">
          <h2 className="text-overline uppercase text-ink-secondary">
            {t('factsHeading')}
          </h2>
          <p className="mt-3 leading-relaxed text-ink-secondary">
            {siteConfig.name}
            <br />
            {siteConfig.address.street}
            <br />
            {t('cvrLabel')} {siteConfig.cvr}
            <br />
            {t('areaLabel')} {siteConfig.serviceArea}
          </p>
        </div>
      </Container>

      <CtaPanel
        heading={t('cta.heading')}
        text={t('cta.text')}
        buttonLabel={t('cta.button')}
        buttonHref="/tilbud"
      />
    </>
  );
}