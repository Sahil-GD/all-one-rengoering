import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { NavLink } from '@/components/navigation/nav-link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { mainNav, quoteHref } from '@/config/navigation';
import { phoneHref, siteConfig } from '@/config/site';
import { Phone } from 'lucide-react';

export async function Header() {
  const [tNav, tA11y] = await Promise.all([
    getTranslations('nav'),
    getTranslations('a11y'),
  ]);

  const items = mainNav.map((item) => ({
    href: item.href,
    label: tNav(item.labelKey),
  }));

  return (
    <header className="site-header sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label={tA11y('toHomepage')} className="rounded-sm">
          <Logo />
        </Link>

        <nav aria-label={tA11y('mainNav')} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="text-sm font-medium text-ink-secondary hover:text-ink data-active:text-ink"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          
            href={phoneHref}
            className="flex h-11 items-center gap-2 rounded-control px-2 text-sm font-medium text-ink sm:px-3"
          >
            <Phone size={20} strokeWidth={1.5} aria-hidden />
            <span className="hidden tabular-nums md:inline">
              {siteConfig.contact.phone}
            </span>
            <span className="sr-only md:hidden">{tNav('call')}</span>
          </a>
          <Button href={quoteHref} className="hidden lg:inline-flex">
            {tNav('cta')}
          </Button>
          <MobileNav
            items={items}
            labels={{
              open: tA11y('openMenu'),
              close: tA11y('closeMenu'),
              menu: tA11y('menu'),
              cta: tNav('cta'),
              call: tNav('call'),
              language: tA11y('language'),
            }}
          />
        </div>
      </Container>
    </header>
  );
}
