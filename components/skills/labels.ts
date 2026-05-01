import type { Difficulty, SkillCategoryId } from '@/lib/skills/types'

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  Beginner: 'Beginner',
  Intermediate: 'Intermediate',
}

/**
 * Display labels for the 12 skill categories. The category record itself
 * has a `label`, but a Record-typed lookup table is convenient for
 * components that already have a category id in hand.
 */
export const CATEGORY_LABELS: Record<SkillCategoryId, string> = {
  knots: 'Knots',
  cooking: 'Camp Cooking',
  fire: 'Fire Basics',
  hiking: 'Hiking & Navigation',
  orienteering: 'Orienteering',
  fishing: 'Fishing Basics',
  shelter: 'Shelter Setup',
  'camp-setup': 'Camp Setup',
  safety: 'Safety & First Aid',
  stargazing: 'Stargazing',
  'knife-skills': 'Knife Skills',
  woodcarving: 'Woodcarving',
}
