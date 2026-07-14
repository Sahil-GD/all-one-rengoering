import { type ReactNode } from 'react';

import { Container } from '@/components/layout/container';
import { MediaFrame } from '@/components/ui/media-frame';
import { type MediaRef } from '@/content/home';

export interface PageHeroFullProps {
  eyebrow: string;
  heading: string;
  intro: string;
  image: MediaRef;
  actions?: ReactNode;
  /** Cards that break out of the hero's bottom edge. */
  breakoutCards?: ReactNode;
}

/**
 * FULL-BLEED DARK HERO — used by /erhverv only. Image behind a navy scrim,
 * content over it, optional cards breaking out of the bottom edge.
 */
export function PageHeroFull({
  eyebrow,
  heading,
  intro,
  image,
  actions,
  breakoutCards,
}: PageHeroFullProps) {
  return (
    <section className="relative">
      <div className="relative">
        <div className="absolute inset-0">
          <MediaFrame
            ratio="video"
            image={image}
            priority
            sizes="100vw"
            className="h-full w-full [&_img]:object-cover"
          />
        </div>
        {/* Navy scrim — brand-owned darkening, keeps text at AAA contrast. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-accent via-accent/85 to-accent/55"
        />
        <Container className="relative py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-overline uppercase text-green-soft">{eyebrow}</p>
            <h1 className="mt-3 text-h1 text-balance text-accent-contrast">
              {heading}
            </h1>
            <p className="mt-5 text-lg text-pretty text-accent-contrast/80">
              {intro}
            </p>
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
        </Container>
      </div>

      {breakoutCards && (
        <Container className="relative z-10 -mt-12 lg:-mt-16">{breakoutCards}</Container>
      )}
    </section>
  );
}