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
    prompt: 'What age are your kids?',
    options: [
      { label: 'No kids — just adults', value: 'none' },
      { label: '3–6 years old', value: '3-6' },
      { label: '7–12 years old', value: '7-12' },
      { label: 'Teens', value: 'teens' },
    ],
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
    id: 'anxiety',
    prompt: 'How prepared do you feel right now?',
    subprompt: "Totally okay if the answer is \"not at all.\"",
    options: [
      { label: 'Pretty nervous — lots of questions', value: 'high' },
      { label: 'A little uncertain', value: 'medium' },
      { label: 'Fairly confident, just need a checklist', value: 'low' },
    ],
  },
  {
    id: 'comfortPriority',
    prompt: 'What matters most on this trip?',
    options: [
      { label: 'Just getting outside — comfort is secondary', value: 'low' },
      { label: "We need it to feel comfortable or we won't go back", value: 'high' },
    ],
  },
]

/** Show mid-quiz email capture as interstitial after answering question at this index */
export const EMAIL_CAPTURE_AFTER_INDEX = 2
