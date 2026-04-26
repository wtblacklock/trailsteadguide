import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import GuidesGrid from '@/components/landing/GuidesGrid'
import FeaturedPlans from '@/components/landing/FeaturedPlans'
import WhyTrailstead from '@/components/landing/WhyTrailstead'
import GearPreview from '@/components/landing/GearPreview'
import HomepageEmailCapture from '@/components/landing/HomepageEmailCapture'
import FinalCTA from '@/components/landing/FinalCTA'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Your First Family Camping Plan',
  description:
    'A routing system for first-time family campers — answer a few questions, get a complete personalized camping plan with timeline, gear, and meals.',
  path: '/',
})

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <GuidesGrid />
      <FeaturedPlans />
      <WhyTrailstead />
      <GearPreview />
      <HomepageEmailCapture />
      <FinalCTA />
    </main>
  )
}
