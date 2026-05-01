import type {
  Activity,
  ActivityCategory,
  AgeRange,
  EnergyLevel,
  GroupSize,
  SetupDifficulty,
  TimeRequired,
  Vibe,
} from '@/lib/activities/types'

export const AGE_LABELS: Record<AgeRange, string> = {
  '3-5': 'Ages 3–5',
  '6-8': 'Ages 6–8',
  '9-12': 'Ages 9–12',
  '13-17': 'Teens',
  adults: 'Adults',
  'all-ages': 'All ages',
}

export const GROUP_LABELS: Record<GroupSize, string> = {
  solo: 'Solo',
  '2-4': '2–4 people',
  '5-10': '5–10 people',
  '10+': 'Large group',
}

export const ENERGY_LABELS: Record<EnergyLevel, string> = {
  low: 'Low energy',
  medium: 'Medium energy',
  high: 'High energy',
}

export const TIME_LABELS: Record<TimeRequired, string> = {
  '5-10min': '5–10 min',
  '15-30min': '15–30 min',
  '30-60min': '30–60 min',
  '1hour+': '1+ hour',
}

export const SETUP_LABELS: Record<SetupDifficulty, string> = {
  none: 'No setup',
  minimal: 'Minimal setup',
  moderate: 'Moderate setup',
}

export const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  icebreaker: 'Icebreaker',
  campfire: 'Campfire game',
  movement: 'Movement',
  exploration: 'Nature exploration',
  team: 'Team competition',
  creative: 'Creative & build',
  night: 'Night activity',
  'wind-down': 'Quiet & wind down',
}

export const VIBE_LABELS: Record<Vibe, string> = {
  competitive: 'Competitive',
  creative: 'Creative',
  exploration: 'Exploration',
  calm: 'Calm',
}

export function activitySummaryBadges(activity: Activity) {
  return {
    age: AGE_LABELS[activity.ageRange],
    time: TIME_LABELS[activity.timeRequired],
    energy: ENERGY_LABELS[activity.energyLevel],
    group: GROUP_LABELS[activity.groupSize],
  }
}
