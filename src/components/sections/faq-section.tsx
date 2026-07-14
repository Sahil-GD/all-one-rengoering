import { type CSSProperties } from 'react';

import { Plus } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';

export interface FaqSectionProps {
  heading: string;
  lead: string;
  items: ReadonlyArray<{ question: string; answer: string }>;
}

/**
 * Objection handling before the final CTA. Native <details> — the
 * name attribute gives an exclusive accordion from the platform where
 * supported; independent toggles elsewhere. Zero client JS.
 */
export function FaqSection({ heading, lead, items }: FaqSectionProps) {
  return (
    <Section className="bg-mist">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div data-reveal>
          <h2 className="text-h2 text-balance">{heading}</h2>
          <p className="mt-3 max-w-sm text-pretty text-ink-secondary">{lead}</p>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <details
              key={item.question}
              data-reveal
              style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}
              name="faq"
              className="group rounded-card border border-border bg-surface px-5 transition-colors duration-200 open:border-accent/25 sm:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-medium">{item.question}</span>
                <Plus
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden
                  className="shrink-0 text-ink-secondary transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-prose pb-6 text-pretty text-ink-secondary">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}