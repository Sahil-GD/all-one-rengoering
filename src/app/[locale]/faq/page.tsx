import { type CSSProperties } from 'react';

import { Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { phoneHref, siteConfig } from '@/config/site';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });
  return buildMetadata({
    locale,
    path: '/faq',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

/** FAQ — accordion left, sticky help card right. Sage canvas; no hero image. */
export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faqPage');
  const groups = t.raw('groups') as ReadonlyArray<{
    title: string;
    items: ReadonlyArray<{ question: string; answer: string }>;
  }>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groups.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    ),
  };

  return (
    <div className="bg-sage/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-overline uppercase text-accent-secondary">{t('eyebrow')}</p>
          <h1 className="mt-3 text-h1 text-balance">{t('heading')}</h1>
          <p className="mt-4 text-lg text-pretty text-ink-secondary">{t('intro')}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            {groups.map((group) => (
              <section key={group.title}>
                <h2 data-reveal className="text-overline uppercase text-ink-secondary">
                  {group.title}
                </h2>
                <div className="mt-4 flex flex-col gap-3">
                  {group.items.map((item, index) => (
                    <details
                      key={item.question}
                      data-reveal
                      style={{ '--reveal-delay': `${index * 60}ms` } as CSSProperties}
                      className="group rounded-card border border-border bg-surface px-5 open:border-accent/25 sm:px-6"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-medium [&::-webkit-details-marker]:hidden">
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
              </section>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-panel bg-accent p-7 text-accent-contrast">
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-control bg-accent-contrast/15"
              >
                <Phone size={20} strokeWidth={1.5} />
              </span>
              <h2 className="mt-5 text-h3">{t('helpHeading')}</h2>
              <p className="mt-2 text-sm text-accent-contrast/75">{t('helpText')}</p>
              <a
                href={phoneHref}
                className="mt-5 block text-xl font-semibold tabular-nums underline decoration-accent-contrast/30 underline-offset-4 hover:decoration-accent-contrast"
              >
                {siteConfig.contact.phone}
              </a>
              <Button href="/tilbud" variant="inverse" className="mt-6 w-full">
                {t('helpCta')}
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}