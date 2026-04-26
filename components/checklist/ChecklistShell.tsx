'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { PartySize, QuizQuestion as QuizQuestionType } from '@/types'
import QuizQuestion from '@/components/quiz/QuizQuestion'
import QuizProgress from '@/components/quiz/QuizProgress'

type Answers = {
  partySize?: PartySize
  kidsAgeGroup?: string[]
  nights?: string
}

/**
 * Shorter 3-question flow that produces a checklist-only output.
 * Questions are deliberately cast to QuizQuestionType — we reuse the existing
 * quiz rendering component but the `nights` id isn't part of QuizAnswers.
 */
const QUESTIONS = [
  {
    id: 'partySize',
    kind: 'party-size',
    prompt: "Who's coming?",
    subprompt: "We'll scale quantities to fit.",
    options: [],
  },
  {
    id: 'kidsAgeGroup',
    prompt: 'Any kids? What ages?',
    subprompt: 'Select all that apply.',
    multiSelect: true,
    options: [
      { label: 'No kids — just adults', value: 'none' },
      { label: 'Under 5 (toddlers and preschool)', value: 'under_5' },
      { label: '5–10 years old', value: '5_10' },
      { label: '10 and up (incl. teens)', value: '10+' },
    ],
  },
  {
    id: 'nights',
    prompt: 'How many nights?',
    options: [
      { label: '1 night', value: '1' },
      { label: '2 nights', value: '2' },
      { label: '3+ nights', value: '3' },
    ],
  },
] as const

export default function ChecklistShell() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [submitting, setSubmitting] = useState(false)

  function handleAnswer(value: string | string[] | PartySize) {
    const q = QUESTIONS[index]
    const next: Answers = { ...answers, [q.id]: value as Answers[keyof Answers] }
    setAnswers(next)

    if (index + 1 >= QUESTIONS.length) {
      setSubmitting(true)
      const { adults, kids } = next.partySize ?? { adults: 2, kids: 0 }
      const nights = next.nights ?? '2'
      const ages = (next.kidsAgeGroup ?? []).join(',')
      const qs = new URLSearchParams({ adults: String(adults), kids: String(kids), nights, ages })
      router.push(`/checklist/result?${qs.toString()}`)
    } else {
      setIndex(index + 1)
    }
  }

  if (submitting) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-stone-500">Building your checklist…</p>
      </div>
    )
  }

  const q = QUESTIONS[index]
  const initial = answers[q.id as keyof Answers]

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <QuizProgress currentIndex={index} total={QUESTIONS.length} />
      <QuizQuestion
        key={q.id}
        question={q as unknown as QuizQuestionType}
        initialValue={initial as string | string[] | PartySize | undefined}
        onAnswer={handleAnswer}
      />
      {index > 0 && (
        <div className="mt-8 flex items-center justify-start">
          <button
            type="button"
            onClick={() => setIndex(index - 1)}
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to previous question
          </button>
        </div>
      )}
    </div>
  )
}
