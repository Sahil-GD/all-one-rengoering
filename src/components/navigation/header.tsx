import { ChevronDown, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { NavLink } from '@/components/navigation/nav-link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { mainNav, quoteHref } from '@/config/navigation';
import { phoneHref, siteConfig } from '@/config/site';
import { Link } from '@/i18n/navigation';

export async function Header() {
  const [tNav, tA11y] = await Promise.all([
    getTranslations('nav'),
    getTranslations('a11y'),
  ]);

  const items = mainNav.map((item) => ({
    href: item.href,
    label: tNav(item.labelKey),
    children: item.children,
  }));

  return (
    <header className="site-header header-dark sticky top-0 z-40">
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label={tA11y('toHomepage')} className="rounded-sm">
          <Logo tone="inverse" />
        </Link>

        <nav aria-label={tA11y('mainNav')} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href} className="group relative">
                <NavLink
                  href={item.href}
                  className="nav-underline flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white/85 transition-colors duration-200 hover:text-white data-active:text-white"
                >
                  {item.label}
                  {item.children ? (
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      aria-hidden
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  ) : null}
                </NavLink>

                {item.children ? (
                  <div className="dropdown-panel absolute top-full left-0 pt-2">
                    <ul className="min-w-56 overflow-hidden rounded-card border border-border bg-surface py-2 shadow-overlay">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="dropdown-item block px-5 py-2.5 text-sm font-medium text-ink-secondary"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <Button
            href={phoneHref}
            variant="ghost"
            className="flex h-11 items-center gap-2 px-2 text-sm font-semibold text-white/85 hover:text-white sm:px-3"
          >
            <Phone size={20} strokeWidth={1.5} aria-hidden />
            <span className="hidden tabular-nums md:inline">
              {siteConfig.contact.phone}
            </span>
            <span className="sr-only md:hidden">{tNav('call')}</span>
          </Button>
          <Button
            href={quoteHref}
            className="btn-brand hidden rounded-full border-0 px-6 font-bold tracking-wide uppercase lg:inline-flex"
          >
            {tNav('cta')}
          </Button>
          <MobileNav
            items={items.map(({ href, label }) => ({ href, label }))}
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
