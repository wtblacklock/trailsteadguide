import QuizShell from '@/components/quiz/QuizShell'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Build Your Camping Plan',
  description:
    'Answer 5 quick questions and get a personalized camping plan for your family — timeline, gear list, meals, and age-appropriate kid activities.',
  path: '/quiz',
})

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <QuizShell />
    </main>
  )
}
