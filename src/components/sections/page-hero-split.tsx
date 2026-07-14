import { type ReactNode } from 'react';

import { Container } from '@/components/layout/container';
import { MediaFrame } from '@/components/ui/media-frame';
import { type MediaRef } from '@/content/home';

export interface PageHeroSplitProps {
  eyebrow: string;
  heading: string;
  intro: string;
  image: MediaRef;
  /** Floating card overlapping the image — page-specific content. */
  floatingCard?: ReactNode;
  actions?: ReactNode;
}

/**
 * SPLIT HERO — used by /privat only (see page-hero-full, page-hero-editorial
 * for the other archetypes). Text left, tall image right, optional glass
 * card overlapping the image edge.
 */
export function PageHeroSplit({
  eyebrow,
  heading,
  intro,
  image,
  floatingCard,
  actions,
}: PageHeroSplitProps) {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Decorative circles — cream page signature. */}
      <div
        aria-hidden
        className="absolute -top-24 -right-32 h-96 w-96 rounded-full bg-sage/40 blur-3xl"
      />
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1fr_0.95fr] lg:gap-20 lg:py-24">
        <div data-reveal>
          <p className="text-overline uppercase text-accent-secondary">{eyebrow}</p>
          <h1 className="mt-3 text-h1 text-balance">{heading}</h1>
          <p className="mt-5 max-w-lg text-lg text-pretty text-ink-secondary">
            {intro}
          </p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>

        <div data-reveal className="relative">
          <MediaFrame
            ratio="portrait"
            image={image}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="rounded-panel shadow-overlay"
          />
          {floatingCard && (
            <div className="relative z-10 -mt-12 ml-4 mr-8 rounded-card border border-border/60 bg-surface/80 p-5 shadow-overlay backdrop-blur-md lg:absolute lg:-bottom-8 lg:-left-16 lg:mt-0 lg:mr-0 lg:ml-0 lg:max-w-xs">
              {floatingCard}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}