import type { QuizAnswers, PlanSlug } from '@/types'

export function computePlanSlug(answers: QuizAnswers): PlanSlug {
  if (answers.comfortPriority === 'high') {
    return 'easy-family-basecamp'
  }

  if (answers.experience === 'none' && answers.intent === 'test') {
    return 'backyard-test'
  }

  if (
    (answers.experience === 'some' || answers.experience === 'confident') &&
    answers.intent === 'multi-night'
  ) {
    return 'first-weekend-camp'
  }

  return 'first-night-camp'
}
