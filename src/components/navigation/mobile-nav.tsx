'use client';

import { Menu, X } from 'lucide-react';
import { useRef } from 'react';

import { Container } from '@/components/layout/container';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/navigation/nav-link';
import { quoteHref } from '@/config/navigation';
import { phoneHref } from '@/config/site';
import { Phone } from 'lucide-react';

export interface MobileNavProps {
  items: ReadonlyArray<{ href: string; label: string }>;
  labels: {
    open: string;
    close: string;
    menu: string;
    cta: string;
    call: string;
    language: string;
  };
}

export function MobileNav({ items, labels }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = () => dialogRef.current?.close();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={labels.open}
        onClick={() => dialogRef.current?.showModal()}
        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-control text-ink"
      >
        <Menu size={24} strokeWidth={1.5} aria-hidden />
      </button>

      <dialog ref={dialogRef} aria-label={labels.menu} className="mobile-nav">
        <div className="flex h-full flex-col">
          <Container className="flex h-16 shrink-0 items-center justify-between border-b border-border">
            <Logo />
            <button
              type="button"
              aria-label={labels.close}
              onClick={close}
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-control text-ink"
            >
              <X size={24} strokeWidth={1.5} aria-hidden />
            </button>
          </Container>

          <nav aria-label={labels.menu} className="flex-1 overflow-y-auto">
            <Container className="py-6">
              <ul className="flex flex-col">
                {items.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      onClick={close}
                      className="block rounded-control px-3 py-4 text-h3 text-ink data-active:bg-surface-tint"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Container>
          </nav>

          <Container className="flex shrink-0 flex-col gap-3 border-t border-border py-4">
            <Button href={quoteHref} size="lg" onClick={close} className="w-full">
              {labels.cta}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href={phoneHref}
              onClick={close}
              className="w-full"
            >
              <Phone size={20} strokeWidth={1.5} aria-hidden />
              {labels.call}
            </Button>
          </Container>
        </div>
      </dialog>
    </div>
  );
}
