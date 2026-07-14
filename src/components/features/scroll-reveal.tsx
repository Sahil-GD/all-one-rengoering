'use client';

// Client: IntersectionObserver drives scroll-in reveals (cross-browser,
// no library). CSS lives in globals.css under [data-reveal].

import { useEffect } from 'react';

import { usePathname } from '@/i18n/navigation';

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]:not(.is-visible)');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}