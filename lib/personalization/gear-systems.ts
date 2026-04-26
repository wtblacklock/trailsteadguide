import type {
  ComfortSystemId,
  CookingSystemId,
  GearSystemSelection,
  LightingSystemId,
  Modifiers,
  QuizOutput,
  SleepSystemId,
} from './types'

export function determineSleepSystem(out: QuizOutput): SleepSystemId {
  if (!out.hasKids) return 'single'
  if (out.kidsAge === 'under_5') return 'shared'
  if (out.kidsAge === '5_10') return 'flex'
  return 'split'
}

export function determineCookingSystem(modifiers: Modifiers): CookingSystemId {
  if (modifiers.isMinimal) return 'minimal'
  if (modifiers.isComfortFocused) return 'comfort'
  return 'standard'
}

export function determineLightingSystem(sleep: SleepSystemId): LightingSystemId {
  return sleep === 'split' ? 'multi_zone' : 'single_zone'
}

export function determineComfortSystem(modifiers: Modifiers): ComfortSystemId {
  if (modifiers.isMinimal) return 'low'
  if (modifiers.isComfortFocused) return 'high'
  return 'medium'
}

export function buildGearSystems(out: QuizOutput, modifiers: Modifiers): GearSystemSelection {
  const sleep = determineSleepSystem(out)
  return {
    sleep,
    cooking: determineCookingSystem(modifiers),
    lighting: determineLightingSystem(sleep),
    comfort: determineComfortSystem(modifiers),
  }
}

export type SystemDefinition = {
  title: string
  description: string
  structure: string[]
}

export const SLEEP_SYSTEMS: Record<SleepSystemId, SystemDefinition> = {
  single: {
    title: 'Single Tent Setup',
    description: 'Simple setup with one tent for the entire group.',
    structure: ['1 tent sized to group', 'Shared sleeping area'],
  },
  shared: {
    title: 'Shared Family Setup',
    description: 'All campers sleep in one tent for simplicity and supervision.',
    structure: ['1 large family tent', 'Single shared sleeping zone'],
  },
  flex: {
    title: 'Flexible Sleep Setup',
    description: 'One main tent with optional secondary space if needed.',
    structure: ['1 large tent', 'Optional secondary tent'],
  },
  split: {
    title: 'Split Tent Setup',
    description: 'Separate tents for adults and older kids for space and independence.',
    structure: ['1 adult tent', '1 kids tent', 'Tents placed close together'],
  },
}

export const COOKING_SYSTEMS: Record<CookingSystemId, SystemDefinition> = {
  minimal: {
    title: 'Minimal Cook Kit',
    description: 'Lightweight, low-effort cooking for short or simple trips.',
    structure: ['Single-burner stove', '1 pot', 'Simple meals'],
  },
  standard: {
    title: 'Standard Cook Kit',
    description: 'Balanced setup for real meals without overpacking.',
    structure: ['2-burner stove', 'Cook set', 'Cooler'],
  },
  comfort: {
    title: 'Comfort Camp Kitchen',
    description: 'A real kitchen setup for trips where meals are part of the point.',
    structure: ['2-burner stove', 'Full cook kit', 'Large cooler', 'Prep table'],
  },
}

export const LIGHTING_SYSTEMS: Record<LightingSystemId, SystemDefinition> = {
  single_zone: {
    title: 'Single-Zone Lighting',
    description: 'One main light source plus per-person headlamps.',
    structure: ['1 main lantern', 'Headlamp per person'],
  },
  multi_zone: {
    title: 'Multi-Zone Lighting',
    description: 'Lighting in each tent zone so no one fumbles in the dark.',
    structure: ['Lantern per tent', 'Headlamp per person'],
  },
}

export const COMFORT_SYSTEMS: Record<ComfortSystemId, SystemDefinition> = {
  low: {
    title: 'Lightweight Comfort',
    description: 'Pack-light approach: minimal seating, ground or pad-only.',
    structure: ['Basic seating or ground'],
  },
  medium: {
    title: 'Standard Camp Comfort',
    description: 'Camp chairs and the basics that make evenings work.',
    structure: ['Camp chairs (one per person)'],
  },
  high: {
    title: 'Full Camp Comfort',
    description: 'Living-room-grade camp setup. Chairs, a table, real lighting.',
    structure: ['Camp chairs', 'Camp table', 'Extra lighting'],
  },
}

/**
 * Build a short, human-readable summary used in the personalization chip.
 * Examples:
 *   "Family with young kids • Relaxed trip • Comfort-focused"
 *   "Couple • Active trip • Standard kit"
 */
export function buildChipSummary(out: QuizOutput, systems: GearSystemSelection): string[] {
  const parts: string[] = []

  if (out.groupType === 'family' && out.hasKids) {
    if (out.kidsAge === 'under_5') parts.push('Family with young kids')
    else if (out.kidsAge === '5_10') parts.push('Family with school-age kids')
    else parts.push('Family with older kids')
  } else if (out.groupType === 'couple') {
    parts.push('Couple')
  } else {
    parts.push('Solo')
  }

  if (out.activityType === 'relaxing') parts.push('Relaxed trip')
  else if (out.activityType === 'active') parts.push('Active trip')
  else parts.push('Balanced trip')

  if (systems.comfort === 'high') parts.push('Comfort-focused')
  else if (systems.comfort === 'low') parts.push('Lightweight kit')
  else parts.push('Standard kit')

  if (systems.sleep === 'split') parts.push('Split tents')

  return parts
}
