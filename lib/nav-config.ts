export type NavItem = {
  label: string
  href: string
  description?: string
}

export const GUIDE_LINKS: NavItem[] = [
  {
    label: 'First Camping Trip Checklist',
    href: '/guides/first-camping-trip-checklist',
    description: 'The one-page checklist for your first trip.',
  },
  {
    label: 'Camping for Beginners',
    href: '/guides/camping-for-beginners',
    description: 'Start here if you have never camped.',
  },
  {
    label: 'How to Plan a Camping Trip',
    href: '/guides/how-to-plan-a-camping-trip',
    description: 'A step-by-step planning walkthrough.',
  },
  {
    label: 'Camping With Kids for the First Time',
    href: '/guides/camping-with-kids-first-time',
    description: 'What changes when kids are along.',
  },
  {
    label: 'Weekend Camping Packing List',
    href: '/guides/weekend-camping-packing-list',
    description: 'Exactly what to bring for 2 nights.',
  },
  {
    label: 'First-Time Camping Mistakes',
    href: '/guides/first-time-camping-mistakes',
    description: 'The 12 avoidable ones.',
  },
  {
    label: 'Car Camping Beginner Guide',
    href: '/guides/car-camping-beginner-guide',
    description: 'The easiest way to start.',
  },
]

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
