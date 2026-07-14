import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/layout/container';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/ui/logo';
import { legalNav, mainNav, supportNav } from '@/config/navigation';
import { phoneHref, siteConfig } from '@/config/site';

/**
 * Sitewide footer: company facts (the quiet legitimacy layer — blueprint
 * §1 trust mapping), primary nav echo, and legal links. Phone/email rows
 * appear when confirmed in siteConfig (currently typed null).
 */
export async function Footer() {
  const [tNav, tFooter, tA11y] = await Promise.all([
    getTranslations('nav'),
    getTranslations('footer'),
    getTranslations('a11y'),
  ]);

  const serviceItems = mainNav.filter((item) =>
    ['privat', 'erhverv', 'priser'].includes(item.labelKey),
  );
  const companyItems = [
    ...mainNav.filter((item) => ['omOs', 'kontakt'].includes(item.labelKey)),
    ...supportNav,
  ];

  return (
    <footer className="bg-accent text-accent-contrast">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3 sm:col-span-2">
            <Logo tone="inverse" />
            <p className="text-sm leading-relaxed text-accent-contrast/70">
              {siteConfig.address.street}
              <br />
              {tFooter('cvrLabel')} {siteConfig.cvr}
            </p>
            <p className="text-sm leading-relaxed text-accent-contrast/70">
              {tFooter('serviceAreaNote')}
              <br />
              <a
                href={phoneHref}
                className="tabular-nums text-accent-contrast underline decoration-accent-contrast/30 underline-offset-4 transition-colors duration-150 hover:decoration-accent-contrast"
              >
                {siteConfig.contact.phone}
              </a>
            </p>
          </div>

          <nav aria-label={tFooter('servicesHeading')}>
            <h2 className="text-overline uppercase text-accent-contrast/55">
              {tFooter('servicesHeading')}
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {serviceItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-accent-contrast/80 transition-colors duration-150 hover:text-accent-contrast hover:underline"
                  >
                    {tNav(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={tFooter('companyHeading')}>
            <h2 className="text-overline uppercase text-accent-contrast/55">
              {tFooter('companyHeading')}
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {companyItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-accent-contrast/80 transition-colors duration-150 hover:text-accent-contrast hover:underline"
                  >
                    {tNav(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      <div className="border-t border-accent-contrast/15">
        <Container className="flex flex-col gap-2 py-6 text-sm text-accent-contrast/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <nav aria-label={tA11y('footerNav')}>
            <ul className="flex gap-6">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-accent-contrast/70 transition-colors duration-150 hover:text-accent-contrast hover:underline"
                  >
                    {tFooter(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}