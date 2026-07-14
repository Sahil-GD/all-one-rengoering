import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'All One',
    description:
      'Professionel rengøring til private og erhverv på hele Sjælland.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfbf9',
    theme_color: '#0d3155',
    lang: 'da-DK',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}