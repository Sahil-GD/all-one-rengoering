import { type CSSProperties } from 'react';

import { CalendarCheck, MessageSquare, Sparkles, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';

export interface ProcessSectionProps {
  heading: string;
  steps: ReadonlyArray<{ title: string; description: string }>;
}

/**
 * "Sådan foregår det" — kills fear-of-the-unknown (blueprint §1 trust
 * mapping). Numbered markers are justified: the content IS a sequence.
 * <ol> carries the semantics; the visual number is aria-hidden.
 */
/* One icon per step — same family, weight and chip as the rest of the site. */
const stepIcons: readonly LucideIcon[] = [MessageSquare, CalendarCheck, Sparkles];

export function ProcessSection({ heading, steps }: ProcessSectionProps) {
  return (
    <Section className="pt-0">
      <Container>
        <div className="rounded-panel bg-green-soft/50 px-5 py-12 sm:px-8 md:p-12 lg:p-14">
          <header data-reveal className="mb-10 max-w-2xl lg:mb-14">
            <h2 className="text-h2 text-balance">{heading}</h2>
          </header>

        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={{ '--reveal-delay': `${index * 140}ms` } as CSSProperties}
            >
              <span
                aria-hidden
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-card bg-accent text-accent-contrast shadow-raised"
              >
                {(() => {
                  const Icon = stepIcons[index] ?? MessageSquare;
                  return <Icon size={20} strokeWidth={1.5} />;
                })()}
              </span>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold tabular-nums text-accent-contrast"
                >
                  {index + 1}
                </span>
                {index < steps.length - 1 && (
                  <span aria-hidden className="hidden h-px grow bg-accent-secondary/25 md:block" />
                )}
              </div>
              <h3 className="mt-5 text-h3">{step.title}</h3>
              <p className="mt-2 text-pretty text-ink-secondary">
                {step.description}
              </p>
            </li>
          ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}