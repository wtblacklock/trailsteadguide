import type { PlanSlug } from '@/types'

export type ActivityCategory =
  | 'icebreaker'
  | 'campfire'
  | 'movement'
  | 'exploration'
  | 'team'
  | 'creative'
  | 'night'
  | 'wind-down'

export type AgeRange = '3-5' | '6-8' | '9-12' | '13-17' | 'adults' | 'all-ages'

export type GroupSize = 'solo' | '2-4' | '5-10' | '10+'

export type EnergyLevel = 'low' | 'medium' | 'high'

export type TimeRequired = '5-10min' | '15-30min' | '30-60min' | '1hour+'

export type SetupDifficulty = 'none' | 'minimal' | 'moderate'

export type Vibe = 'competitive' | 'creative' | 'exploration' | 'calm'

export type Activity = {
  slug: string
  title: string
  tagline: string
  category: ActivityCategory
  ageRange: AgeRange
  groupSize: GroupSize
  energyLevel: EnergyLevel
  timeRequired: TimeRequired
  setupDifficulty: SetupDifficulty
  vibe: Vibe
  materials: string[]
  instructions: string[]
  winCondition?: string
  variations: string[]
  safetyNotes: string[]
  recommendedFor?: PlanSlug[]
}

export type ActivityFilters = {
  age?: AgeRange
  group?: GroupSize
  energy?: EnergyLevel
  time?: TimeRequired
  category?: ActivityCategory
}

export const FILTER_KEYS = ['age', 'group', 'energy', 'time', 'category'] as const
export type FilterKey = (typeof FILTER_KEYS)[number]
