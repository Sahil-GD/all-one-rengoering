import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { BeforeAfter } from '@/components/features/before-after';
import { type MediaRef } from '@/content/home';

export interface TransformationSectionProps {
  eyebrow: string;
  heading: string;
  lead: string;
  before: MediaRef;
  after: MediaRef;
  simulated?: boolean;
  labelBefore: string;
  labelAfter: string;
  instruction: string;
  sliderLabel: string;
  exampleLabel?: string;
}

/** The homepage's signature moment — the slogan, made literal and interactive. */
export function TransformationSection({
  eyebrow,
  heading,
  lead,
  before,
  after,
  simulated,
  labelBefore,
  labelAfter,
  instruction,
  sliderLabel,
  exampleLabel,
}: TransformationSectionProps) {
  return (
    <Section tone="accent" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-green-soft/10 blur-3xl"
      />
      <Container className="relative">
        <header data-reveal className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <p className="text-overline uppercase text-green-soft">{eyebrow}</p>
          <h2 className="mt-3 text-h2 text-balance text-accent-contrast">{heading}</h2>
          <p className="mt-4 text-pretty text-accent-contrast/75">{lead}</p>
        </header>
        <div data-reveal>
          <BeforeAfter
            before={before}
            after={after}
            simulated={simulated}
            labelBefore={labelBefore}
            labelAfter={labelAfter}
            instruction={instruction}
            sliderLabel={sliderLabel}
            exampleLabel={exampleLabel}
          />
        </div>
      </Container>
    </Section>
  );
}