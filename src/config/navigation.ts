/**
 * Navigation model from the approved IA. Labels are translation keys
 * resolved by consumers (no copy outside i18n/messages).
 *
 * Service subpage dropdowns are intentionally absent until the service
 * list is confirmed ([BEKRÆFT: ydelsesliste]) — hub pages carry that
 * navigation. Target routes are built in the page-assembly milestone.
 */
export interface NavItem {
  labelKey: string;
  href: string;
}

export const mainNav: readonly NavItem[] = [
  { labelKey: 'privat', href: '/privat' },
  { labelKey: 'erhverv', href: '/erhverv' },
  { labelKey: 'priser', href: '/priser' },
  { labelKey: 'omOs', href: '/om-os' },
  { labelKey: 'kontakt', href: '/kontakt' },
];

export const legalNav: readonly NavItem[] = [
  { labelKey: 'privacy', href: '/privatlivspolitik' },
  { labelKey: 'terms', href: '/handelsbetingelser' },
];

export const supportNav: readonly NavItem[] = [
  { labelKey: 'faq', href: '/faq' },
  { labelKey: 'areas', href: '/omraader' },
];

/** The sitewide primary conversion target. */
export const quoteHref = '/tilbud';