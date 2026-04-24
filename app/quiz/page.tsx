import { Metadata } from 'next'
import QuizShell from '@/components/quiz/QuizShell'

export const metadata: Metadata = {
  title: 'Build Your Camping Plan | Trailstead Guide',
  description: 'Answer 5 quick questions and get a personalized camping plan for your family.',
}

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <QuizShell />
    </main>
  )
}
