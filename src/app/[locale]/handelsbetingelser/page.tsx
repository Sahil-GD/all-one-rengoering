import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return buildMetadata({
    locale,
    path: '/handelsbetingelser',
    title: t('metaTitle'),
    description: t('heading'),
  });
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('terms');
  const sections = t.raw('sections') as ReadonlyArray<{
    heading: string;
    body: string;
  }>;

  return (
    <Container width="prose" className="py-16 lg:py-24">
      <h1 className="text-h1 text-balance">{t('heading')}</h1>
      <p className="mt-3 text-sm text-ink-secondary">{t('updated')}</p>
      {sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-h3">{section.heading}</h2>
          <p className="mt-3 leading-relaxed whitespace-pre-line text-pretty text-ink-secondary">
            {section.body}
          </p>
        </section>
      ))}
    </Container>
  );
}