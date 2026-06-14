import {
  LayoutDashboard,
  Heart,
  Shield,
  Apple,
  Sprout,
  HeartHandshake,
  Baby,
  Zap,
  Wrench,
  GraduationCap,
  Coins,
  Landmark,
  Megaphone,
  Siren,
  Map,
  Puzzle,
  FileText,
  type LucideIcon,
} from 'lucide-react';

export type NavGroup = 'Care & Resources' | 'Power & Organizing' | 'Knowledge & Safety';

export interface FeatureNavItem {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  group: NavGroup;
  /** Shown in the condensed desktop top bar. */
  primary?: boolean;
}

/**
 * Single source of truth for in-app navigation. Consumed by the desktop nav,
 * the mobile menu, and the dashboard hub so the three never drift apart.
 * Every href here MUST have a matching <Route> in App.tsx.
 */
export const featureNav: FeatureNavItem[] = [
  {
    href: '/mutual-aid',
    label: 'Mutual Aid',
    description: 'Request or offer help and share resources with neighbors.',
    icon: Heart,
    group: 'Care & Resources',
    primary: true,
  },
  {
    href: '/food-security',
    label: 'Food Security',
    description: 'Food assets, distribution networks, and shared knowledge.',
    icon: Apple,
    group: 'Care & Resources',
  },
  {
    href: '/community-garden',
    label: 'Community Garden',
    description: 'Coordinate plots, harvest sharing, and growing knowledge.',
    icon: Sprout,
    group: 'Care & Resources',
  },
  {
    href: '/elder-care',
    label: 'Elder Care',
    description: 'Match volunteers with elders and coordinate visits.',
    icon: HeartHandshake,
    group: 'Care & Resources',
  },
  {
    href: '/childcare',
    label: 'Childcare Co-op',
    description: 'Cooperative childcare scheduling and care points.',
    icon: Baby,
    group: 'Care & Resources',
  },
  {
    href: '/tool-library',
    label: 'Tool Library',
    description: 'Borrow and lend tools to reduce cost and waste.',
    icon: Wrench,
    group: 'Care & Resources',
  },
  {
    href: '/community-defense',
    label: 'Community Defense',
    description: 'Tenant organizing and anti-displacement campaigns.',
    icon: Shield,
    group: 'Power & Organizing',
    primary: true,
  },
  {
    href: '/organizing',
    label: 'Organizing',
    description: 'Working groups, events, and consensus tools.',
    icon: Megaphone,
    group: 'Power & Organizing',
  },
  {
    href: '/community-wealth',
    label: 'Community Wealth',
    description: 'Time banks, cooperatives, and community lending.',
    icon: Coins,
    group: 'Power & Organizing',
  },
  {
    href: '/community-sovereignty',
    label: 'Sovereignty',
    description: 'Democratic governance and self-determination tools.',
    icon: Landmark,
    group: 'Power & Organizing',
  },
  {
    href: '/energy-democracy',
    label: 'Energy Democracy',
    description: 'Solar cooperatives and community-controlled energy.',
    icon: Zap,
    group: 'Power & Organizing',
  },
  {
    href: '/skills',
    label: 'Skills & Learning',
    description: 'Peer-to-peer learning and skill sharing.',
    icon: GraduationCap,
    group: 'Knowledge & Safety',
  },
  {
    href: '/disaster-preparedness',
    label: 'Disaster Prep',
    description: 'Emergency alerts, check-ins, and preparedness plans.',
    icon: Siren,
    group: 'Knowledge & Safety',
    primary: true,
  },
  {
    href: '/community',
    label: 'Community Map',
    description: 'Discover and connect with local community networks.',
    icon: Map,
    group: 'Knowledge & Safety',
  },
  {
    href: '/reports',
    label: 'Reports',
    description: 'Ownership, privacy, and accessibility reports.',
    icon: FileText,
    group: 'Knowledge & Safety',
  },
  {
    href: '/integrations',
    label: 'Integrations',
    description: 'Connect external services and coordination tools.',
    icon: Puzzle,
    group: 'Knowledge & Safety',
  },
];

export const navGroups: NavGroup[] = [
  'Care & Resources',
  'Power & Organizing',
  'Knowledge & Safety',
];

export const dashboardNavItem = {
  href: '/dashboard',
  label: 'Dashboard',
  icon: LayoutDashboard,
};
