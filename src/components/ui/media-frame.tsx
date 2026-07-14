import Image from 'next/image';

import mark from '@/assets/logo-mark.png';
import { cx } from '@/lib/cx';

export interface MediaFrameProps {
  /**
   * Real imagery (path under /public + alt). Omitted → a designed brand
   * placeholder renders instead, so layouts never look broken while
   * imagery is produced. Structural type — no coupling to content layer.
   */
  image?: { src: string; alt: string };
  ratio?: 'photo' | 'video' | 'portrait';
  /** Forwarded to next/image for responsive sizing. */
  sizes?: string;
  /** Set on the LCP image only (hero). */
  priority?: boolean;
  className?: string;
}

const ratios: Record<NonNullable<MediaFrameProps['ratio']>, string> = {
  photo: 'aspect-[3/2]',
  video: 'aspect-video',
  portrait: 'aspect-[4/5]',
};

/**
 * Fixed-ratio image slot (CLS = 0 by construction). Consumers own outer
 * radius/shadow via className; the frame owns cropping and fallback.
 */
export function MediaFrame({
  image,
  ratio = 'photo',
  sizes,
  priority,
  className,
}: MediaFrameProps) {
  return (
    <div
      className={cx('relative overflow-hidden', ratios[ratio], className)}
    >
      {image ? (
        <>
          {/* Tinted underlay: slot never renders blank while loading. */}
          <div aria-hidden className="absolute inset-0 bg-accent-soft" />
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            /* Dev-only escape hatch: local machines whose npm blocked the
               sharp install script cannot run the optimizer. In production
               images ARE optimized (AVIF/WebP + responsive srcset), which
               is where the performance actually matters. */
            unoptimized={
              process.env.NODE_ENV === 'development' &&
              image.src.startsWith('http')
            }
            className="object-cover"
          />
        </>
      ) : (
        /* Brand placeholder — intentional, not broken: soft two-tone
           gradient with the roundel as a quiet watermark. */
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-soft via-surface-tint to-green-soft"
        >
          <Image
            src={mark}
            alt=""
            className="w-2/5 max-w-40 opacity-15"
          />
        </div>
      )}
    </div>
  );
}