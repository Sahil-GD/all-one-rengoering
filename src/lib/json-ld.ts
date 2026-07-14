import { siteConfig } from '@/config/site';

/**
 * LocalBusiness structured data (blueprint §9), derived from config so
 * schema.org output can never drift from displayed company facts.
 *
 * Unconfirmed fields are OMITTED — structured data must never contain
 * editorial placeholders or guesses.
 */
export function localBusinessJsonLd(): Record<string, unknown> {
  const { name, url, cvr, address, contact, serviceArea } = siteConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    url,
    telephone: contact.phone,
    // Danish CVR number as the official organization identifier.
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'CVR',
      value: cvr,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: serviceArea,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressCountry: address.countryCode,
      ...(address.postalCode !== null && { postalCode: address.postalCode }),
      ...(address.city !== null && { addressLocality: address.city }),
    },
    ...(contact.email !== null && { email: contact.email }),
  };
}

/**
 * Organization — the entity itself (distinct from the LocalBusiness listing).
 * Google uses this for the knowledge panel and brand association.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    telephone: siteConfig.contact.phone,
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    identifier: { '@type': 'PropertyValue', name: 'CVR', value: siteConfig.cvr },
    areaServed: { '@type': 'AdministrativeArea', name: siteConfig.serviceArea },
  };
}