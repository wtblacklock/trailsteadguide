import type { Metadata } from 'next'
import { OffTrailLayout } from '@/components/site/OffTrailLayout'

export const metadata: Metadata = {
  title: 'Off the trail',
  description: "The page you're looking for doesn't exist. Find your way back to a guide or start a camping plan.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <OffTrailLayout
      eyebrow="404 — Off the trail"
      headline="This campsite doesn't exist."
      body="The page you were looking for either moved, was renamed, or never made it past the trailhead. Pick a way back."
    />
  )
}
