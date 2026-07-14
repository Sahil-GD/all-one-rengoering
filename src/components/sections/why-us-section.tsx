import { type CSSProperties } from 'react';

import {
  CalendarClock,
  Leaf,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { type WhyUsIcon } from '@/content/home';

export interface WhyUsSectionProps {
  eyebrow: string;
  heading: string;
  items: ReadonlyArray<{ icon: WhyUsIcon; title: string; description: string }>;
}

const icons: Record<WhyUsIcon, LucideIcon> = {
  shield: ShieldCheck,
  leaf: Leaf,
  calendar: CalendarClock,
  user: UserCheck,
};

/** Differentiators grid — trust. Claims verified via content markers. */
export function WhyUsSection({ eyebrow, heading, items }: WhyUsSectionProps) {
  return (
    <Section tone="tint">
      <Container>
        <header data-reveal className="mb-10 max-w-2xl lg:mb-14">
          <p className="text-overline uppercase text-accent-secondary">{eyebrow}</p>
          <h2 className="mt-3 text-h2 text-balance">{heading}</h2>
        </header>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.title}
                data-reveal
                style={{ '--reveal-delay': `${index * 100}ms` } as CSSProperties}
                className="flex flex-col gap-4 rounded-card border border-border bg-surface p-6 transition duration-300 ease-emphasis hover:-translate-y-1 hover:shadow-raised"
              >
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-control bg-accent text-accent-contrast"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-pretty text-ink-secondary">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}