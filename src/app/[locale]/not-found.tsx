import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { TextLink } from '@/components/ui/text-link';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <Container width="prose" className="flex flex-col items-start gap-4 py-24 lg:py-32">
      <h1 className="text-h1">{t('heading')}</h1>
      <p className="text-lg text-ink-secondary">{t('body')}</p>
      <TextLink href="/" className="mt-4">
        {t('backHome')}
      </TextLink>
    </Container>
  );
}