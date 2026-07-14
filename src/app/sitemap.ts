import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

/** Lists only routes that exist. /tak is a noindex conversion endpoint. */
const routes = [
  '',
  '/privat',
  '/erhverv',
  '/ydelser/fast-rengoering',
  '/ydelser/hovedrengoering',
  '/ydelser/flytterengoering',
  '/ydelser/erhvervsrengoering',
  '/priser',
  '/om-os',
  '/faq',
  '/omraader',
  '/kontakt',
  '/tilbud',
  '/privatlivspolitik',
  '/handelsbetingelser',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.flatMap((route) => [
    {
      url: `${siteConfig.url}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
    },
    {
      url: `${siteConfig.url}/en${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 0.8 : 0.6,
    },
  ]);
}