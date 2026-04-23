import Hero from '@/components/landing/Hero'
import ProblemSection from '@/components/landing/ProblemSection'
import SolutionSection from '@/components/landing/SolutionSection'
import HowItWorks from '@/components/landing/HowItWorks'
import ExampleOutput from '@/components/landing/ExampleOutput'
import TrustSection from '@/components/landing/TrustSection'
import FinalCTA from '@/components/landing/FinalCTA'

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
