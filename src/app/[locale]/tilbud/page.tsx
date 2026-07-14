import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';
import { QuoteForm } from '@/components/forms/quote-form';
import { phoneHref, siteConfig } from '@/config/site';
import { SERVICES } from '@/lib/schemas/quote';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quote' });
  return buildMetadata({
    locale,
    path: '/tilbud',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function QuotePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('quote');

  const serviceLabels = Object.fromEntries(
    SERVICES.map((slug) => [slug, t(`services.${slug}`)]),
  ) as Record<(typeof SERVICES)[number], string>;

  return (
    <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-24">
      <div>
        <p className="text-overline uppercase text-accent-secondary">
          {t('eyebrow')}
        </p>
        <h1 className="mt-3 text-h1 text-balance">{t('heading')}</h1>
        <p className="mt-4 max-w-md text-lg text-pretty text-ink-secondary">
          {t('intro')}
        </p>
        <ul className="mt-7 flex flex-col gap-3">
          {[t('point1'), t('point2'), t('point3')].map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm font-medium">
              <Check
                size={20}
                strokeWidth={2}
                aria-hidden
                className="mt-0.5 shrink-0 text-accent-secondary"
              />
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ink-secondary">
          {t('phoneNote')}{' '}
          <a
            href={phoneHref}
            className="font-medium text-ink tabular-nums underline decoration-border underline-offset-4 hover:decoration-ink"
          >
            {siteConfig.contact.phone}
          </a>
        </p>
      </div>

      <div className="rounded-card border border-border bg-surface p-6 sm:p-8">
        <QuoteForm
          labels={{
            segmentLabel: t('form.segmentLabel'),
            segmentPrivat: t('form.segmentPrivat'),
            segmentErhverv: t('form.segmentErhverv'),
            service: t('form.service'),
            services: serviceLabels,
            company: t('form.company'),
            name: t('form.name'),
            phone: t('form.phone'),
            email: t('form.email'),
            city: t('form.city'),
            message: t('form.message'),
            submit: t('form.submit'),
            submitting: t('form.submitting'),
            errorSummary: t('form.errorSummary'),
            errors: {
              required: t('form.errors.required'),
              invalid: t('form.errors.invalid'),
            },
          }}
        />
      </div>
    </Container>
  );
}