import Hero from '@/components/landing/Hero'
import ProblemSection from '@/components/landing/ProblemSection'
import SolutionSection from '@/components/landing/SolutionSection'
import HowItWorks from '@/components/landing/HowItWorks'
import ExampleOutput from '@/components/landing/ExampleOutput'
import TrustSection from '@/components/landing/TrustSection'
import FinalCTA from '@/components/landing/FinalCTA'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Your First Family Camping Plan',
  description:
    'Answer 5 quick questions and get a complete, personalized camping plan for your family. Timeline, gear, meals, and activities — built for first-timers.',
  path: '/',
})

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <ExampleOutput />
      <TrustSection />
      <FinalCTA />
    </main>
  )
}
