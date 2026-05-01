import { GUIDE_CATEGORIES } from '@/lib/guides'

export type NavItem = {
  label: string
  href: string
  description?: string
}

/**
 * Guide categories surfaced as nav links. Derived from the guides data
 * layer so the footer (and any future menu) stays in sync with the hub.
 */
export const GUIDE_CATEGORY_LINKS: NavItem[] = GUIDE_CATEGORIES.map((c) => ({
  label: c.label,
  href: `/guides/${c.slug}`,
  description: c.blurb,
}))

export const TOOL_LINKS: NavItem[] = [
  {
    label: 'Camping Trip Planner',
    href: '/tools/camping-trip-planner',
    description: 'Build a full trip in 2 minutes.',
  },
  {
    label: 'Camping Checklist Generator',
    href: '/tools/camping-checklist-generator',
    description: 'A personalized packing list.',
  },
]

export const FOOTER_SECONDARY: NavItem[] = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export const FOOTER_LEGAL: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  { label: 'Terms of Service', href: '/terms' },
]
