import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

export interface CtaPanelProps {
  heading: string;
  text: string;
  buttonLabel: string;
  buttonHref: string;
}

/** Compact in-page conversion panel (soft navy tint). */
export function CtaPanel({ heading, text, buttonLabel, buttonHref }: CtaPanelProps) {
  return (
    <Container className="pb-16 lg:pb-24">
      <div className="flex flex-col items-start gap-4 rounded-card bg-accent-soft/60 p-7 md:flex-row md:items-center md:justify-between md:p-9">
        <div>
          <h2 className="text-h3">{heading}</h2>
          <p className="mt-1 text-sm text-ink-secondary">{text}</p>
        </div>
        <Button href={buttonHref} className="shrink-0">
          {buttonLabel}
        </Button>
      </div>
    </Container>
  );
}