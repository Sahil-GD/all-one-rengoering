import { type CSSProperties } from 'react';

import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { MediaFrame } from '@/components/ui/media-frame';
import { type MediaRef } from '@/content/home';

export interface AudienceSplitProps {
  cards: ReadonlyArray<{
    kicker: string;
    title: string;
    description: string;
    href: string;
    image?: MediaRef | undefined;
  }>;
  linkLabel: string;
}

export function AudienceSplit({ cards, linkLabel }: AudienceSplitProps) {
  return (
    <Section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, var(--color-accent-soft) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="deco-orb deco-orb-teal deco-float -z-10 h-64 w-64"
        style={{ top: '5%', left: '2%' }}
      />
      <Container>
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {cards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              data-reveal
              style={{ '--reveal-delay': `${index * 120}ms` } as CSSProperties}
              className="group flex flex-col rounded-panel border border-border bg-surface p-3 transition duration-300 ease-emphasis hover:-translate-y-1 hover:border-accent/25 hover:shadow-raised"
            >
              <MediaFrame
                ratio="photo"
                image={card.image}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="rounded-card [&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-emphasis group-hover:[&_img]:scale-[1.03]"
              />
              <div className="flex grow flex-col p-5 md:p-6">
                <p className="text-overline uppercase text-accent-secondary">
                  {card.kicker}
                </p>
                <h2 className="mt-2 text-h3">{card.title}</h2>
                <p className="mt-2 max-w-md text-pretty text-ink-secondary">
                  {card.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {linkLabel}
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
