import { getTranslations } from 'next-intl/server';

/**
 * First focusable element on every page; visible only on keyboard focus.
 * Targets the layout's <main id="main-content">.
 */
export async function SkipLink() {
  const t = await getTranslations('a11y');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-3 focus:text-ink focus:shadow-overlay"
    >
      {t('skipToContent')}
    </a>
  );
}