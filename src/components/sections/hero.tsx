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
    <section className="bg-gradient-hero gradient-animate relative isolate overflow-hidden text-white">
      <div aria-hidden className="grid-lines" />
      <div
        aria-hidden
        className="glow-orb glow-blue deco-float"
        style={{ top: '-6%', right: '4%', height: '26rem', width: '26rem' }}
      />
      <div
        aria-hidden
        className="glow-orb glow-royal deco-float"
        style={{
          bottom: '-14%',
          left: '-6%',
          height: '24rem',
          width: '24rem',
          animationDelay: '2s',
        }}
      />

      <Container className="relative z-10 grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <span className="enter enter-d1 glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium text-white/90">
            <span
              aria-hidden
              className="pulse-dot h-1.5 w-1.5 rounded-full bg-blue-glow"
            />
            {eyebrow}
          </span>

          <h1
            className="enter enter-d2 relative mt-7 font-semibold uppercase"
            style={{
              fontSize: 'clamp(2.9rem, 1.6rem + 4.2vw, 5.4rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
            }}
          >
            <span className="block text-white">{sloganLine1}</span>
            <span className="text-gradient block">{sloganLine2}</span>
          </h1>

          <p className="enter enter-d3 mt-6 max-w-md text-lg text-pretty text-white/70">
            {support}
          </p>

          <div className="enter enter-d3 mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button href={primaryCta.href} size="lg" className="btn-premium border-0">
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              size="lg"
              className="glass border-0 text-white hover:brightness-110"
            >
              {secondaryCta.label}
            </Button>
          </div>

          <ul className="enter enter-d4 mt-9 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-white/15 pt-6">
            {trustItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <span
                  aria-hidden
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-glow/25 text-[0.6rem] font-bold text-blue-glow"
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
            className="absolute -inset-8 -z-10 rounded-full opacity-80"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, var(--color-blue-glow) 0%, transparent 62%)',
            }}
          />
          <div className="float-a">
            <MediaFrame
              ratio="portrait"
              image={image}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="rounded-panel shadow-overlay ring-1 ring-white/10"
            />
          </div>

          <div
            className={`mt-4 grid gap-3 lg:mt-0 lg:block ${
              floatingCards.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
            }`}
          >
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
                  className={`enter enter-d5 glass flex gap-3 rounded-card p-4 text-white shadow-overlay lg:max-w-[14.5rem] ${position ?? ''}`}
                >
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-glow/25 text-blue-glow"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {card.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-white/65">
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
