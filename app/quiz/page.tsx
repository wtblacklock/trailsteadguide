import FounderTrustBlock from '@/components/plan/FounderTrustBlock'
import QuizShell from '@/components/quiz/QuizShell'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Build Your Camping Plan',
  description:
    'Answer 6 quick questions and get a personalized camping plan for your family - timeline, gear list, meals, and age-appropriate kid activities.',
  path: '/quiz',
  noIndex: true,
})

export default function QuizPage() {
  return (
    <main className="min-h-screen">
      {/* The shell renders each step as an h2; this gives the page its one h1 without changing the layout. */}
      <h1 className="sr-only">Build Your Camping Plan</h1>
      <div className="mt-8 mb-6">
        <FounderTrustBlock />
      </div>
      <QuizShell />
    </main>
  )
}
