import { MapPin } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { type Cta } from '@/content/home';

export interface CoverageSectionProps {
  heading: string;
  sub: string;
  towns: readonly string[];
  note: string;
  cta: Cta;
}

/** Service-area panel — navy brand moment + concrete town names (local trust + SEO). */
export function CoverageSection({
  heading,
  sub,
  towns,
  note,
  cta,
}: CoverageSectionProps) {
  return (
    <Section className="pt-0">
      <Container>
        <div
          data-reveal
          className="relative overflow-hidden rounded-panel bg-accent px-6 py-14 sm:px-10 md:p-14"
        >
          <div
            aria-hidden
            className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-green-soft/20 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <span
                aria-hidden
                className="inline-flex h-11 w-11 items-center justify-center rounded-control bg-accent-contrast/10 text-green-soft"
              >
                <MapPin size={20} strokeWidth={1.5} />
              </span>
              <h2 className="mt-5 text-h2 text-balance text-accent-contrast">
                {heading}
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-accent-contrast/75">
                {sub}
              </p>
              <Button variant="inverse" size="lg" href={cta.href} className="mt-8">
                {cta.label}
              </Button>
            </div>
            <div>
              <ul className="flex flex-wrap gap-2">
                {towns.map((town) => (
                  <li
                    key={town}
                    className="rounded-full border border-accent-contrast/20 px-3.5 py-1.5 text-sm font-medium text-accent-contrast/90"
                  >
                    {town}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-accent-contrast/60">{note}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}