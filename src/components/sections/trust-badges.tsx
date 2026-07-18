import {
  BadgeCheck,
  FileCheck,
  MapPin,
  ShieldCheck,
  Tag,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';

import { isConfirmed, type ClaimKey } from '@/config/claims';

export interface TrustBadgesProps {
  items: ReadonlyArray<{
    icon: 'shield' | 'badge' | 'file' | 'tag' | 'pin';
    label: string;
    claim?: ClaimKey | undefined;
  }>;
}

const icons: Record<'shield' | 'badge' | 'file' | 'tag' | 'pin', LucideIcon> = {
  shield: ShieldCheck,
  badge: BadgeCheck,
  file: FileCheck,
  tag: Tag,
  pin: MapPin,
};

export function TrustBadges({ items }: TrustBadgesProps) {
  const visible = items.filter((item) => !item.claim || isConfirmed(item.claim));
  if (visible.length === 0) return null;

  return (
    <Container className="pb-10">
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-border py-5">
        {visible.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.label} className="flex items-center gap-2.5 text-sm font-medium">
              <Icon
                size={20}
                strokeWidth={1.5}
                aria-hidden
                className="shrink-0 text-teal"
              />
              <span className="tabular-nums">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
