'use client';

import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

import { MediaFrame } from '@/components/ui/media-frame';
import { type MediaRef } from '@/content/home';

export interface BeforeAfterProps {
  before: MediaRef;
  after: MediaRef;
  simulated?: boolean | undefined;
  labelBefore: string;
  labelAfter: string;
  instruction: string;
  sliderLabel: string;
  exampleLabel?: string | undefined;
}

export function BeforeAfter({
  before,
  after,
  simulated = false,
  labelBefore,
  labelAfter,
  instruction,
  sliderLabel,
  exampleLabel,
}: BeforeAfterProps) {
  const [value, setValue] = useState(52);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromPointer = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(100, Math.max(0, next)));
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromPointer(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setFromPointer(event.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative touch-none overflow-hidden rounded-panel shadow-overlay select-none"
      >
        <MediaFrame
          ratio="video"
          image={after}
          sizes="(min-width: 1024px) 90vw, 100vw"
          className="w-full"
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <MediaFrame
            ratio="video"
            image={before}
            sizes="(min-width: 1024px) 90vw, 100vw"
            className={`w-full ${simulated ? 'grime' : ''}`}
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-accent-secondary"
          style={{ left: `${value}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-secondary text-accent-contrast shadow-overlay">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" transform="translate(-3 0)" />
              <path d="m9 18 6-6-6-6" transform="translate(3 0)" />
            </svg>
          </span>
        </div>

        <span className="absolute top-5 left-5 rounded-full bg-ink/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-surface uppercase backdrop-blur-sm">
          {labelBefore}
        </span>
        <span className="absolute top-5 right-5 rounded-full bg-accent-secondary px-3.5 py-1.5 text-xs font-semibold tracking-wide text-accent-contrast uppercase">
          {labelAfter}
        </span>
        {simulated && exampleLabel && (
          <span className="absolute right-5 bottom-5 rounded-full bg-ink/60 px-3 py-1 text-[0.7rem] font-medium text-surface/90 backdrop-blur-sm">
            {exampleLabel}
          </span>
        )}
      </div>

      <label className="flex items-center gap-3">
        <span className="sr-only">{sliderLabel}</span>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className="h-2 w-full cursor-ew-resize appearance-none rounded-full bg-border accent-accent-secondary"
        />
      </label>
      <p className="text-center text-sm text-ink-secondary">{instruction}</p>
    </div>
  );
}
