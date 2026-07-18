import { type CSSProperties } from 'react';

import {
  ArrowRight,
  Building2,
  Check,
  Home,
  Sparkles,
  Truck,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { MediaFrame } from '@/components/ui/media-frame';
import { Link } from '@/i18n/navigation';
import { Section } from '@/components/layout/section';
import { type ServiceIcon, type ServiceItem } from '@/content/home';

export interface ServicesSectionProps {
  id: string;
  eyebrow: string;
  heading: string;
  itemCtaLabel: string;
  items: readonly ServiceItem[];
}

const icons: Record<ServiceIcon, LucideIcon> = {
  home: Home,
  sparkles: Sparkles,
  truck: Truck,
  building: Building2,
};

export function ServicesSection({
  id,
  eyebrow,
  heading,
  itemCtaLabel,
  items,
}: ServicesSectionProps) {
  return (
    <Section id={id} className="scroll-mt-16 pt-0">
      <Container>
        <div className="relative overflow-hidden rounded-panel bg-accent-soft/60 px-5 py-12 sm:px-8 md:p-12 lg:p-16">
          <div
            aria-hidden
            className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-teal-soft/60 blur-3xl"
          />
          <div aria-hidden className="deco-dots" style={{ opacity: 0.25 }} />
          <header data-reveal className="mb-10 max-w-2xl lg:mb-14">
            <p className="text-overline uppercase text-accent-secondary">
              {eyebrow}
            </p>
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
                  className="group flex flex-col rounded-card bg-surface p-3 transition duration-300 ease-emphasis hover:-translate-y-1 hover:shadow-raised"
                >
                  <MediaFrame
                    ratio="photo"
                    image={item.image}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="rounded-control [&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-emphasis group-hover:[&_img]:scale-[1.04]"
                  />
                  <div className="flex grow flex-col p-3 pt-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-teal-soft text-teal-strong"
                      >
                        <Icon size={16} strokeWidth={1.5} />
                      </span>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-pretty text-ink-secondary">
                      {item.description}
                    </p>
                    <ul className="mt-4 grow border-t border-border/70 pt-4">
                      {item.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 py-1 text-xs leading-relaxed text-ink-secondary"
                        >
                          <Check
                            size={16}
                            strokeWidth={2.5}
                            aria-hidden
                            className="mt-0.5 shrink-0 text-teal"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                    >
                      {itemCtaLabel}
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
