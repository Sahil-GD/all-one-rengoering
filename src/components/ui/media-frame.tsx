import Image from 'next/image';

import mark from '@/assets/logo-mark.png';
import { cx } from '@/lib/cx';

export interface MediaFrameProps {
  image?: { src: string; alt: string } | undefined;
  ratio?: 'photo' | 'video' | 'portrait' | undefined;
  sizes?: string | undefined;
  priority?: boolean | undefined;
  className?: string | undefined;
}

const ratios: Record<NonNullable<MediaFrameProps['ratio']>, string> = {
  photo: 'aspect-[3/2]',
  video: 'aspect-video',
  portrait: 'aspect-[4/5]',
};

export function MediaFrame({
  image,
  ratio = 'photo',
  sizes,
  priority = false,
  className,
}: MediaFrameProps) {
  return (
    <div
      className={cx('relative overflow-hidden', ratios[ratio], className)}
    >
      {image ? (
        <>
          <div aria-hidden className="absolute inset-0 bg-accent-soft" />
          <Image
            src={image.src}
            alt={image.alt}
            fill
            {...(sizes === undefined ? {} : { sizes })}
            priority={priority}
            unoptimized={
              process.env.NODE_ENV === 'development' &&
              image.src.startsWith('http')
            }
            className="object-cover"
          />
        </>
      ) : (
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
