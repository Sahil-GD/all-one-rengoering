import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * next-intl request configuration lives in src/i18n/request.ts (created in the
 * i18n group). The plugin wires it into the App Router request lifecycle.
 */
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * Security headers applied to every response.
 *
 * These are baseline hygiene (Best Practices 100) — not a substitute for a
 * CSP, which is introduced once the final set of asset origins is known
 * (fonts are self-hosted; the map embed is the only anticipated third party).
 */
const securityHeaders = [
  // Prevent MIME-type sniffing.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Send origin only when crossing origins; full URL stays first-party.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // The site uses none of these sensors/APIs; deny them explicitly.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Disallow embedding in frames (clickjacking protection).
  { key: 'X-Frame-Options', value: 'DENY' },
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Do not advertise the framework in response headers.
  poweredByHeader: false,

  images: {
    // AVIF first (best compression), WebP fallback. JPEG/PNG never served
    // to modern browsers — this is a measurable LCP win at zero effort.
    formats: ['image/avif', 'image/webp'],
    // Free-license stock imagery (Pexels) until brand photography exists.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [...securityHeaders],
      },
    ];
  },
};

export default withNextIntl(nextConfig);