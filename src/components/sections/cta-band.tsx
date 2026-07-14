import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { type Cta } from '@/content/home';

export interface CtaBandProps {
  heading: string;
  sub: string;
  cta: Cta;
  /** Phone fallback: "eller ring på {phone}" (blueprint CTA rules). */
  phoneNote: string;
  phone: string;
  phoneHref: string;
}

/**
 * Closing conversion band — the page's only high-contrast surface, so
 * the final ask is unmissable without shouting anywhere else.
 */
export function CtaBand({
  heading,
  sub,
  cta,
  phoneNote,
  phone,
  phoneHref,
}: CtaBandProps) {
  return (
    <section className="pb-16 lg:pb-24">
      <Container>
        <div data-reveal className="relative overflow-hidden rounded-panel bg-accent px-6 py-14 sm:px-10 md:px-14 md:py-16 lg:py-20">
          {/* Soft brand glow — depth on the panel, no imagery needed. */}
          <div
            aria-hidden
            className="absolute -top-28 -right-20 h-80 w-80 rounded-full bg-accent-secondary/25 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-accent-contrast/10 blur-3xl"
          />
          {/* Faint dot grid — texture without imagery. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.06)_1px,transparent_0)] bg-[size:22px_22px]"
          />
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-h2 text-balance text-accent-contrast">{heading}</h2>
          <p className="mt-3 text-lg text-pretty text-accent-contrast/75">{sub}</p>
        </div>
        <div className="flex w-full flex-col items-start gap-3 md:w-auto md:shrink-0 md:items-end">
          <Button
            variant="inverse"
            size="lg"
            href={cta.href}
            className="w-full sm:w-auto"
          >
            {cta.label}
          </Button>
          <p className="text-sm text-accent-contrast/75">
            {phoneNote}{' '}
            <a
              href={phoneHref}
              className="tabular-nums font-medium text-accent-contrast underline underline-offset-4 decoration-accent-contrast/40 hover:decoration-accent-contrast"
            >
              {phone}
            </a>
          </p>
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}