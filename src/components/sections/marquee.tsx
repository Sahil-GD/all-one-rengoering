import { Container } from '@/components/layout/container';

export interface MarqueeProps {
  items: readonly string[];
}

/**
 * Editorial ribbon — continuous horizontal motion adds life between
 * sections. Decorative repetition of on-page terms → aria-hidden; the
 * information exists elsewhere on the page. Track holds two copies so
 * the -50% translate loops seamlessly. Static under reduced motion.
 */
export function Marquee({ items }: MarqueeProps) {
  return (
    <div aria-hidden className="marquee border-y border-border py-5">
      <Container className="max-w-none px-0 sm:px-0 lg:px-0">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-12">
              {items.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-12 text-2xl font-semibold tracking-tight whitespace-nowrap text-ink/15 uppercase md:text-3xl"
                >
                  {item}
                  <span className="h-2 w-2 rounded-full bg-accent-secondary/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}