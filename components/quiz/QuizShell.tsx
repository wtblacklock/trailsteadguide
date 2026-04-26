'use client'

import { useReducer, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { QuizState, QuizAction, QuizAnswers } from '@/types'
import { QUIZ_QUESTIONS as QUESTIONS } from '@/lib/quiz-questions'
import { computePlanSlug } from '@/lib/quiz-router'
import { writeSession } from '@/lib/session'
import QuizProgress from './QuizProgress'
import QuizQuestion from './QuizQuestion'
import MidQuizEmailCapture from './MidQuizEmailCapture'
import GeneratingPlan from './GeneratingPlan'

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER': {
      const newAnswers = { ...state.answers, [action.questionId]: action.value }
      const nextIndex = state.currentIndex + 1
      if (nextIndex >= QUESTIONS.length) {
        return { ...state, answers: newAnswers, status: 'generating' }
      }
      return { ...state, answers: newAnswers, currentIndex: nextIndex }
    }
    case 'BACK': {
      if (state.currentIndex === 0) return state
      return { ...state, currentIndex: state.currentIndex - 1 }
    }
    case 'DISMISS_EMAIL_CAPTURE':
      return { ...state, showEmailCapture: false, currentIndex: state.currentIndex + 1 }
    case 'FINISH_GENERATING':
      return { ...state, status: 'complete' }
    case 'COMPLETE':
      return { ...state, status: 'complete' }
    default:
      return state
  }
}

const initialState: QuizState = {
  currentIndex: 0,
  answers: {},
  showEmailCapture: false,
  emailCaptureShown: false,
  status: 'active',
}

export default function QuizShell() {
  const router = useRouter()
  const [state, dispatch] = useReducer(quizReducer, initialState)

  const { currentIndex, answers, showEmailCapture, status } = state

  useEffect(() => {
    if (status !== 'complete') return

    const requiredKeys: (keyof QuizAnswers)[] = ['experience', 'kidsAgeGroup', 'partySize', 'intent', 'anxiety', 'comfortPriority']
    const isComplete = requiredKeys.every(k => k in answers)
    if (!isComplete) return
    const completeAnswers = answers as QuizAnswers

    const slug = computePlanSlug(completeAnswers)
    writeSession({
      ...completeAnswers,
      planSlug: slug,
      timestamp: Date.now(),
    })
    const { adults, kids } = completeAnswers.partySize
    router.push(`/plans/${slug}?adults=${adults}&kids=${kids}`)
  }, [status, answers, router])

  // Generating state — show animated loader before redirect.
  if (status === 'generating') {
    return <GeneratingPlan onComplete={() => dispatch({ type: 'FINISH_GENERATING' })} />
  }

  // Complete — navigation in useEffect is in-flight. Render nothing so the
  // last question doesn't flash back while router.push resolves.
  if (status === 'complete') {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {showEmailCapture ? (
        <MidQuizEmailCapture
          onSkip={() => dispatch({ type: 'DISMISS_EMAIL_CAPTURE' })}
        />
      ) : (
        <>
          <QuizProgress currentIndex={currentIndex} total={QUESTIONS.length} />
          <QuizQuestion
            key={QUESTIONS[currentIndex].id}
            question={QUESTIONS[currentIndex]}
            initialValue={answers[QUESTIONS[currentIndex].id]}
            onAnswer={(value) =>
              dispatch({
                type: 'ANSWER',
                questionId: QUESTIONS[currentIndex].id,
                value,
              })
            }
          />

          {currentIndex > 0 && (
            <div className="mt-8 flex items-center justify-start">
              <button
                type="button"
                onClick={() => dispatch({ type: 'BACK' })}
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
        </>
      )}
    </div>
  )
}
