import type { QuizQuestion } from '@/types'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'experience',
    prompt: 'Have you been camping before?',
    subprompt: 'Be honest — this helps us build the right plan for you.',
    options: [
      { label: 'Never camped', value: 'none' },
      { label: 'A few times, but not recently with kids', value: 'some' },
      { label: 'Yes, fairly comfortable with it', value: 'confident' },
    ],
  },
  {
    id: 'kidsAgeGroup',
    prompt: 'What ages are your kids?',
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
    id: 'partySize',
    kind: 'party-size',
    prompt: 'Who’s coming?',
    subprompt: 'We’ll scale the shopping list and meals to fit.',
    options: [],
  },
  {
    id: 'intent',
    prompt: 'What are you hoping to do?',
    options: [
      { label: 'Test camping at home first (backyard)', value: 'test' },
      { label: 'Do a real campsite trip, one night', value: 'real-trip' },
      { label: 'Go for a full weekend, two nights', value: 'multi-night' },
    ],
  },
  // Mid-quiz email capture shown as interstitial after this question (index 2)
  {
    id: 'activityType',
    prompt: 'What kind of trip are you after?',
    subprompt: 'This shapes the timeline and what we pack.',
    options: [
      { label: 'Relaxed — slow pace, low effort', value: 'relaxing' },
      { label: 'Balanced — a mix of activity and chill', value: 'balanced' },
      { label: 'Active — hike, paddle, or trail-focused', value: 'active' },
    ],
  },
  {
    id: 'comfortLevel',
    prompt: 'How much comfort matters?',
    options: [
      { label: 'Pack light — comfort is secondary', value: 'minimal' },
      { label: 'Standard — basic comfort, nothing extra', value: 'balanced' },
      { label: 'Maximum comfort — real bed, real chairs, real meals', value: 'comfort-first' },
    ],
  },
]

/** Show mid-quiz email capture as interstitial after answering question at this index */
export const EMAIL_CAPTURE_AFTER_INDEX = 2
