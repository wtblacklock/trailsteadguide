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

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER': {
      const newAnswers = { ...state.answers, [action.questionId]: action.value }
      const nextIndex = state.currentIndex + 1
      if (nextIndex >= QUESTIONS.length) {
        return { ...state, answers: newAnswers, status: 'complete' }
      }
      return { ...state, answers: newAnswers, currentIndex: nextIndex }
    }
    case 'DISMISS_EMAIL_CAPTURE':
      return { ...state, showEmailCapture: false, currentIndex: state.currentIndex + 1 }
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
    router.push(`/plan/${slug}?adults=${adults}&kids=${kids}`)
  }, [status, answers, router])

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
            question={QUESTIONS[currentIndex]}
            onAnswer={(value) =>
              dispatch({
                type: 'ANSWER',
                questionId: QUESTIONS[currentIndex].id,
                value,
              })
            }
          />

        </>
      )}
    </div>
  )
}
