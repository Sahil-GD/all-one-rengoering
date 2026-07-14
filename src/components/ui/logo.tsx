import Image from 'next/image';

import mark from '@/assets/logo-mark.png';
import { siteConfig } from '@/config/site';
import { cx } from '@/lib/cx';

export interface LogoProps {
  /** `inverse` = for dark (navy) surfaces: white wordmark, chipped mark. */
  tone?: 'default' | 'inverse';
}

/**
 * Brand lockup: roundel mark + two-tone wordmark. Renders a span;
 * navigation context is the caller's responsibility.
 */
export function Logo({ tone = 'default' }: LogoProps) {
  const splitAt = siteConfig.name.lastIndexOf(' ');
  const primary = siteConfig.name.slice(0, splitAt);
  const secondary = siteConfig.name.slice(splitAt + 1);
  const inverse = tone === 'inverse';

  return (
    <span className="inline-flex items-center gap-2.5">
      {/* Navy roundel needs a light chip to stay visible on navy. */}
      <span
        className={cx(
          'inline-flex items-center justify-center',
          inverse && 'h-10 w-10 rounded-full bg-surface p-1',
        )}
      >
        <Image src={mark} alt="" className={inverse ? 'h-8 w-8' : 'h-10 w-10'} />
      </span>
      <span
        className={cx(
          'text-xl font-semibold tracking-tight',
          inverse ? 'text-accent-contrast' : 'text-accent',
        )}
      >
        {primary}{' '}
        <span
          className={cx(
            'font-medium',
            inverse ? 'text-green-soft' : 'text-accent-secondary',
          )}
        >
          {secondary}
        </span>
      </span>
    </span>
  );
}