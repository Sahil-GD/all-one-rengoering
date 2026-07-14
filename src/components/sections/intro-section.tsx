import { Check } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { MediaFrame } from '@/components/ui/media-frame';
import { type MediaRef } from '@/content/home';

export interface IntroSectionProps {
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
  checklist: readonly string[];
  image: MediaRef;
}

/** Company introduction — narrative depth + checklist (trust/clarity). */
export function IntroSection({
  eyebrow,
  heading,
  paragraphs,
  checklist,
  image,
}: IntroSectionProps) {
  return (
    <Section className="relative overflow-hidden bg-cream">
      <div
        aria-hidden
        className="absolute -top-20 -left-24 h-80 w-80 rounded-full bg-sage/35 blur-3xl"
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-reveal className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rotate-2 rounded-panel bg-gradient-to-br from-green-soft to-accent-soft"
          />
          <MediaFrame
            ratio="photo"
            image={image}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-panel shadow-raised"
          />
        </div>

        <div data-reveal>
          <p className="text-overline uppercase text-accent-secondary">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-h2 text-balance">{heading}</h2>
          {paragraphs.map((text) => (
            <p key={text} className="mt-4 text-pretty text-ink-secondary">
              {text}
            </p>
          ))}
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-medium">
                <Check
                  size={20}
                  strokeWidth={2}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-accent-secondary"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}