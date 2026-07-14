import { AudienceSplit } from '@/components/sections/audience-split';
import { CtaBand } from '@/components/sections/cta-band';
import { FaqSection } from '@/components/sections/faq-section';
import { Hero } from '@/components/sections/hero';
import { IntroSection } from '@/components/sections/intro-section';
import { WhyUsSection } from '@/components/sections/why-us-section';
import { CoverageSection } from '@/components/sections/coverage-section';
import { Marquee } from '@/components/sections/marquee';
import { TransformationSection } from '@/components/sections/transformation-section';
import { ProcessSection } from '@/components/sections/process-section';
import { ServicesSection } from '@/components/sections/services-section';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { homeContent, visibleTrustItems, visibleHeroCards } from '@/content/home';
import { buildMetadata } from '@/lib/seo';
import { phoneHref, siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

/**
 * Forside — approved section order (blueprint §3). Benefits stays cut
 * until distinct substantiated content exists (removal test); PhotoBand
 * and review/logo slots await real assets/data.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return buildMetadata({
    locale,
    path: '',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const content = homeContent[locale];
  const {
    hero,
    audienceCards,
    audienceLinkLabel,
    marqueeItems,
    transformation,
    intro,
    whyUs,
    coverage,
    services,
    processContent,
    faq,
    ctaBand,
  } = content;

  return (
    <>
      <Hero
        eyebrow={hero.eyebrow}
        sloganLine1={hero.sloganLine1}
        sloganLine2={hero.sloganLine2}
        support={hero.support}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        image={hero.image}
        floatingCards={visibleHeroCards(content)}
        trustItems={visibleTrustItems(content)}
      />
      <TransformationSection
        eyebrow={transformation.eyebrow}
        heading={transformation.heading}
        lead={transformation.lead}
        before={transformation.before}
        after={transformation.after}
        simulated={transformation.simulated}
        labelBefore={transformation.labelBefore}
        labelAfter={transformation.labelAfter}
        instruction={transformation.instruction}
        sliderLabel={transformation.sliderLabel}
        exampleLabel={transformation.exampleLabel}
      />
      <AudienceSplit cards={audienceCards} linkLabel={audienceLinkLabel} />
      <Marquee items={marqueeItems} />
      <IntroSection
        eyebrow={intro.eyebrow}
        heading={intro.heading}
        paragraphs={intro.paragraphs}
        checklist={intro.checklist}
        image={intro.image}
      />
      <ServicesSection
        id="ydelser"
        eyebrow={services.eyebrow}
        heading={services.heading}
        itemCtaLabel={services.itemCtaLabel}
        items={services.items}
      />
      <ProcessSection heading={processContent.heading} steps={processContent.steps} />
      <WhyUsSection eyebrow={whyUs.eyebrow} heading={whyUs.heading} items={whyUs.items} />
      <CoverageSection
        heading={coverage.heading}
        sub={coverage.sub}
        towns={coverage.towns}
        note={coverage.note}
        cta={coverage.cta}
      />
      <FaqSection heading={faq.heading} lead={faq.lead} items={faq.items} />
      <CtaBand
        heading={ctaBand.heading}
        sub={ctaBand.sub}
        cta={ctaBand.cta}
        phoneNote={ctaBand.phoneNote}
        phone={siteConfig.contact.phone}
        phoneHref={phoneHref}
      />
    </>
  );
}