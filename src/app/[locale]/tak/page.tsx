import { CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'thanks' });
  // Confirmation page: conversion endpoint, never indexed.
  return buildMetadata({
    locale,
    path: '/tak',
    title: t('metaTitle'),
    description: t('body'),
    noindex: true,
  });
}

export default async function ThanksPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('thanks');

  return (
    <Container width="prose" className="flex flex-col items-start gap-5 py-20 lg:py-28">
      <span
        aria-hidden
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-soft"
      >
        <CheckCircle2 size={24} strokeWidth={1.5} className="text-accent-secondary" />
      </span>
      <h1 className="text-h1 text-balance">{t('heading')}</h1>
      <p className="text-lg text-pretty text-ink-secondary">{t('body')}</p>
      <ol className="flex flex-col gap-2 text-ink-secondary">
        {[t('step1'), t('step2')].map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="font-semibold text-accent tabular-nums">
              {index + 1}.
            </span>
            {step}
          </li>
        ))}
      </ol>
      <Button href="/" variant="secondary" className="mt-4">
        {t('backHome')}
      </Button>
    </Container>
  );
}