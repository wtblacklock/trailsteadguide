/**
 * Per-plan modifier rule tables.
 *
 * Each plan implements only the modifiers that meaningfully change behavior
 * for that plan. Rules are deterministic and inspectable — `applyModifiers`
 * reads them in `MODIFIER_ORDER`, so output is stable regardless of object
 * key iteration order.
 *
 * Authoring convention: keep `addPacking` items short (4–8 words),
 * `addNotes` to one-sentence safety/framing reminders, and `addTimeline`
 * to single rows that slot naturally into the existing timeline.
 */

import type { PlanSlug } from '@/types'
import type { ModifierRules } from './types'

const BACKYARD_TEST: ModifierRules = {
  kidsUnder5: {
    addPacking: [
      'Pack-n-Play or familiar bedding',
      'Toddler snacks (extra)',
      'Wet wipes (lots)',
      'A favorite stuffed animal',
    ],
    addNotes: [
      'Toddlers often need a pre-bed warm-up — let them play in the tent for 30 min before lights out.',
    ],
  },
  kids5to10: {
    addPacking: ['Glow sticks for the tent', 'Card deck for the wind-down'],
  },
  isComfortFocused: {
    addPacking: [
      'Real pillows from inside',
      'Air mattress + pump',
      'Bedside lantern',
    ],
  },
  isMinimal: {
    removePacking: ['Camp stove'],
    addNotes: ['You can skip the stove on a backyard test — the kitchen is 50 ft away.'],
  },
  isLargeGroup: {
    addNotes: [
      'With 5+ people the backyard test reveals whether one tent fits — log that finding tonight.',
    ],
  },
}

const FIRST_NIGHT_CAMP: ModifierRules = {
  kidsUnder5: {
    addPacking: [
      'Pack-n-Play (if not co-sleeping)',
      'Extra wipes + diapers',
      'Toddler snacks (lots)',
      'A familiar bedtime book',
    ],
    addTimeline: {
      block: 'evening',
      items: [
        {
          time: '7:00 PM',
          title: 'Toddler wind-down',
          description: 'Same bedtime routine as home, in the tent. Toddlers anchor to the routine, not the location.',
        },
      ],
    },
    addNotes: [
      'Plan for one full nighttime wake — bring a small lantern and a snack for the parent on duty.',
    ],
  },
  kids5to10: {
    addPacking: ['Junior Ranger booklet (grab at visitor center)', 'Glow stick per kid'],
  },
  kids10plus: {
    addPacking: ['Headlamp per kid (their own, not shared)', 'Pocket knife (with rules)'],
    addNotes: [
      'Older kids do better with a real role at camp — assign tent setup, fire prep, or dish duty.',
    ],
  },
  isActiveTrip: {
    addTimeline: {
      block: 'morning',
      items: [
        {
          time: '8:30 AM',
          title: 'Short hike before pack-out',
          description: '60–90 minutes on a marked loop. Snacks and water, no destination pressure.',
        },
      ],
    },
    addPacking: ['Day pack', 'Water bottles per person', 'Hiking snacks'],
  },
  isComfortFocused: {
    addPacking: [
      'Air mattress + pump (instead of pads)',
      'Real pillows from home',
      'Camp chairs (one per person)',
      'Camp lantern',
    ],
  },
  isMinimal: {
    removePacking: ['Camp chairs', 'Camp pillow'],
    addNotes: ['Minimal kit: a foam pad and a sleeping bag are enough for one night.'],
  },
}

const FIRST_WEEKEND_CAMP: ModifierRules = {
  kidsUnder5: {
    addPacking: [
      'Pack-n-Play',
      'Extra wipes + diapers (×2 days)',
      'Toddler-friendly snacks',
      'Stroller (if trails allow)',
    ],
    addTimeline: {
      block: 'arrival',
      items: [
        {
          time: '+45 min',
          title: 'Toddler-safe zone',
          description: 'Before the rest of camp goes up: clear sticks, mark a play radius, set out a blanket.',
        },
      ],
    },
    addNotes: [
      'Two nights with a toddler benefits from a midday rest window — protect 1–3 PM Saturday for it.',
    ],
  },
  kids5to10: {
    addPacking: ['Trail bingo cards', 'Magnifier or bug box', 'Junior Ranger booklets'],
  },
  kids10plus: {
    addPacking: ['Pocket knife (each kid)', 'Notebook + pen', 'Their own headlamp'],
    addTimeline: {
      block: 'evening',
      items: [
        {
          time: 'Saturday dusk',
          title: 'Kid-led fire prep',
          description: 'Older kids gather kindling and lay the fire. Adults supervise the strike, kids own the build.',
        },
      ],
    },
  },
  isActiveTrip: {
    addPacking: [
      'Day pack (one per adult)',
      'Hiking poles (optional)',
      'Trail map / AllTrails offline',
      'Hydration mix or electrolytes',
    ],
    addTimeline: {
      block: 'morning',
      items: [
        {
          time: 'Saturday 9 AM',
          title: 'Main hike',
          description: '3–6 miles depending on the group. Pack lunch + extra water; aim to be back by 2 PM.',
        },
      ],
    },
  },
  isRelaxedTrip: {
    addNotes: ['Saturday is a "do nothing" day — read, wade, nap. The trip works without a centerpiece activity.'],
  },
  isComfortFocused: {
    addPacking: [
      'Queen air mattress + pump',
      'Camp rug',
      'Real pillows from home',
      'Portable speaker',
    ],
  },
  isMinimal: {
    removePacking: ['Shade canopy', 'Dutch oven', 'Portable speaker'],
  },
  isLargeGroup: {
    addPacking: ['Second cooler', 'Extra propane canister', 'Camp wash station'],
    addNotes: [
      'With 5+ people, double the trash bags and ice. The default packing list assumes a smaller group.',
    ],
  },
}

const EASY_FAMILY_BASECAMP: ModifierRules = {
  kidsUnder5: {
    addPacking: [
      'Pack-n-Play',
      'Travel high chair (clip-on)',
      'Wipes + diapers (×3 days)',
      'Toddler plates and cups',
    ],
    addNotes: [
      'A 3-night basecamp with a toddler is much easier with a daily rhythm — set wake / nap / dinner times early.',
    ],
  },
  kids5to10: {
    addPacking: ['Camp craft supplies', 'Bug viewer', 'Card games'],
  },
  kids10plus: {
    addPacking: ['Their own headlamp', 'Notebook + pen', 'Pocket knife (with rules)'],
    addTimeline: {
      block: 'morning',
      items: [
        {
          time: 'Mid-morning',
          title: 'Kid-led explore',
          description: 'Older kids define a 30-minute solo or pair walk within a defined radius. Independence inside a known boundary.',
        },
      ],
    },
  },
  isActiveTrip: {
    addTimeline: {
      block: 'morning',
      items: [
        {
          time: 'Day 2 9 AM',
          title: 'Main outing',
          description: 'Hike, paddle, or bike — whatever the area offers. This is the centerpiece day.',
        },
      ],
    },
    addPacking: ['Day packs', 'Trail map', 'Reusable water bottles per person'],
  },
  isRelaxedTrip: {
    addNotes: ['Comfort + relaxed = the trip\'s entire purpose. Resist any urge to add structure.'],
  },
  isComfortFocused: {
    addPacking: [
      'Camp espresso / french press',
      'String lights for the canopy',
      'Outdoor rug + side table',
      'Hammock + straps',
    ],
  },
  isLargeGroup: {
    addPacking: ['Second air mattress', 'Extra cooler', 'Folding table extension'],
    addNotes: ['With 5+, claim two adjacent sites if available — the kitchen runs better with the room.'],
  },
}

export const PLAN_MODIFIER_RULES: Record<PlanSlug, ModifierRules> = {
  'backyard-test': BACKYARD_TEST,
  'first-night-camp': FIRST_NIGHT_CAMP,
  'first-weekend-camp': FIRST_WEEKEND_CAMP,
  'easy-family-basecamp': EASY_FAMILY_BASECAMP,
}

export function getPlanModifierRules(slug: PlanSlug): ModifierRules {
  return PLAN_MODIFIER_RULES[slug] ?? {}
}
