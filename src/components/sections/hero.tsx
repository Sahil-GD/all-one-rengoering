import { MapPin, ShieldCheck, Tag, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { MediaFrame } from '@/components/ui/media-frame';
import { type Cta, type MediaRef } from '@/content/home';

export interface HeroProps {
  eyebrow: string;
  sloganLine1: string;
  sloganLine2: string;
  support: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  image: MediaRef;
  floatingCards: readonly {
    icon: 'shield' | 'pin' | 'tag';
    title: string;
    text: string;
    claim?: string | undefined;
  }[];
  trustItems: readonly { label: string; claim?: string }[];
}

const cardIcons: Record<'shield' | 'pin' | 'tag', LucideIcon> = {
  shield: ShieldCheck,
  pin: MapPin,
  tag: Tag,
};

export function Hero({
  eyebrow,
  sloganLine1,
  sloganLine2,
  support,
  primaryCta,
  secondaryCta,
  image,
  floatingCards,
  trustItems,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-green-soft/45 to-transparent"
      />
      <div aria-hidden className="hero-blob hero-blob-a -z-10" />
      <div aria-hidden className="hero-blob hero-blob-b -z-10" />

      <Container className="grid items-center gap-14 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <span className="enter enter-d1 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium shadow-raised">
            <span
              aria-hidden
              className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent-secondary"
            />
            {eyebrow}
          </span>

          <h1
            className="relative mt-7 font-semibold uppercase"
            style={{
              fontSize: 'clamp(2.75rem, 1.6rem + 3.9vw, 5rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
            }}
          >
            <span className="wipe-base">
              <span className="block">{sloganLine1}</span>
              <span className="block">{sloganLine2}</span>
            </span>
            <span aria-hidden className="wipe-over">
              <span className="block">{sloganLine1}</span>
              <span className="block">{sloganLine2}</span>
            </span>
            <span aria-hidden className="wipe-glint">
              <span className="block">{sloganLine1}</span>
              <span className="block">{sloganLine2}</span>
            </span>
            <span aria-hidden className="wipe-sweep" />
          </h1>

          <p className="enter enter-d2 mt-6 max-w-md text-lg text-pretty text-ink-secondary">
            {support}
          </p>

          <div className="enter enter-d3 mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </Button>
          </div>

          <ul className="enter enter-d4 mt-9 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-border pt-6">
            {trustItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm text-ink-secondary"
              >
                <span
                  aria-hidden
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-green-soft text-[0.6rem] font-bold text-accent-secondary"
                >
                  ✓
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="enter enter-d3 relative lg:pl-6">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-full opacity-70"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, var(--color-green-soft) 0%, transparent 65%)',
            }}
          />
          <div className="float-a">
            <MediaFrame
              ratio="portrait"
              image={image}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="rounded-panel shadow-overlay"
            />
          </div>

          <div className={`mt-4 grid gap-3 lg:mt-0 lg:block ${floatingCards.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {floatingCards.map((card, index) => {
              const Icon = cardIcons[card.icon];
              const layouts =
                floatingCards.length >= 3
                  ? [
                      'lg:absolute lg:-left-8 lg:top-10 xl:-left-14',
                      'lg:absolute lg:-right-6 lg:top-1/2 lg:-translate-y-1/2 xl:-right-10',
                      'lg:absolute lg:-left-6 lg:bottom-10 xl:-left-10',
                    ]
                  : [
                      'lg:absolute lg:-left-8 lg:top-16 xl:-left-14',
                      'lg:absolute lg:-right-6 lg:bottom-16 xl:-right-10',
                    ];
              const position = layouts[index];
              return (
                <div
                  key={card.title}
                  className={`enter enter-d5 flex gap-3 rounded-card border border-border/50 bg-surface/85 p-4 shadow-overlay backdrop-blur-md lg:max-w-[14.5rem] ${position ?? ''}`}
                >
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-soft text-accent-secondary"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{card.title}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-ink-secondary">
                      {card.text}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
