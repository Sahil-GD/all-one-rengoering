/**
 * Company and site facts — the ONLY file in the repo that knows them
 * (CONVENTIONS.md §3). Unconfirmed data is `null` with a [BEKRÆFT] note;
 * consumers must handle null by omitting, never by inventing.
 */
export const siteConfig = {
  name: 'All One Rengøring',
  cvr: '40559736',

  /** Absolute origin — canonical URLs, sitemap, Open Graph, JSON-LD. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  /** Confirmed 2026-07-09: the company serves all of Zealand. */
  serviceArea: 'Sjælland',

  address: {
    street: 'Frederikssundsvej 384, 1th',
    /** [BEKRÆFT: postnummer og by] — presumed 2700 Brønshøj, unverified. */
    postalCode: null,
    city: null,
    countryCode: 'DK',
  },

  contact: {
    /** Confirmed 2026-07-09. */
    phone: '+45 28 76 31 86',
    /** [BEKRÆFT: e-mailadresse] */
    email: null,
  },
} as const;

/** tel: URI derived from the display number — never hand-maintained. */
export const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`;

export type SiteConfig = typeof siteConfig;