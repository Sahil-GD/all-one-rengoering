export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  labelKey: string;
  href: string;
  children?: readonly NavChild[];
}

export const mainNav: readonly NavItem[] = [
  {
    labelKey: 'privat',
    href: '/privat',
    children: [
      { label: 'Fast rengøring', href: '/ydelser/fast-rengoering' },
      { label: 'Hovedrengøring', href: '/ydelser/hovedrengoering' },
      { label: 'Flytterengøring', href: '/ydelser/flytterengoering' },
    ],
  },
  {
    labelKey: 'erhverv',
    href: '/erhverv',
    children: [
      { label: 'Erhvervsrengøring', href: '/ydelser/erhvervsrengoering' },
    ],
  },
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

export const quoteHref = '/tilbud';
