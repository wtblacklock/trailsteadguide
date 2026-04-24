/**
 * PDF-specific content blocks layered on top of the existing PlanTemplate.
 * These are the prewritten "Uber Plan" assets used by the Trip Pack renderer.
 *
 * The PlanTemplate (lib/plan-templates.ts) provides timeline, gear, meals,
 * activities, safety. This file adds the cover copy, expanded intro,
 * mistake-prevention blocks, and the Gear Set ID mapping.
 */

import type { PlanSlug } from '@/types'

export type GearSetId =
  | 'BACKYARD_TEST_GEAR'
  | 'FIRST_NIGHT_MINIMAL_GEAR'
  | 'WEEKEND_BALANCED_GEAR'
  | 'EASY_FAMILY_BASECAMP_GEAR'

export type MistakeBlock = {
  title: string
  why: string
  fix: string
}

export type PlanContent = {
  slug: PlanSlug
  /** Cover-page hero copy. */
  cover: {
    eyebrow: string
    title: string
    subtitle: string
  }
  /** Expanded narrative for the overview page (3 short paragraphs). */
  overview: {
    whatThisIs: string
    whyItWorks: string
    expectedOutcome: string
  }
  /** Top mistakes to avoid for this plan type. */
  mistakePrevention: MistakeBlock[]
  /** Final "ready to go" gut-check items. */
  finalChecklist: string[]
  /** Maps to a curated gear bundle. */
  gearSetId: GearSetId
}

export const PLAN_CONTENT: Record<PlanSlug, PlanContent> = {
  'backyard-test': {
    slug: 'backyard-test',
    cover: {
      eyebrow: 'Trailstead Trip Pack',
      title: 'Backyard Test Night',
      subtitle: 'Your Personalized Camping Plan',
    },
    overview: {
      whatThisIs:
        'A one-night dress rehearsal in your own backyard. You sleep outside, cook outside, and stress-test every piece of gear before you commit to a real campsite booking.',
      whyItWorks:
        'A real campground is 60+ minutes from your front door, and that drive home at 2am is the worst possible time to discover a leaky air mattress or that your kids are scared of the dark. The backyard removes that risk entirely. If anything fails, you walk inside.',
      expectedOutcome:
        'By tomorrow morning you\'ll know exactly which gear works, who in your family is ready, and what one or two things to upgrade before you book a campsite. That\'s the entire goal — gathered information, not heroics.',
    },
    mistakePrevention: [
      {
        title: 'Sleeping with the porch light on',
        why: 'Defeats the purpose. The whole point is simulating campsite conditions.',
        fix: 'Turn off all exterior lights. Use only headlamps and lanterns.',
      },
      {
        title: 'Letting the kids retreat inside at 9pm',
        why: 'You learn nothing about whether they can actually camp.',
        fix: 'Set a hard rule before you start: everyone sleeps in the tent, no exceptions.',
      },
      {
        title: 'Skipping the cook step',
        why: 'You\'ll discover your stove doesn\'t work on the actual trip — when you\'re hungry and far from home.',
        fix: 'Cook at least one full meal outside, even if it\'s just hot dogs.',
      },
      {
        title: 'Treating it like a sleepover, not a test',
        why: 'A test means writing down what failed. A sleepover means you forget by morning.',
        fix: 'Keep a phone note open. Log every gear gripe in real time.',
      },
    ],
    finalChecklist: [
      'Tent is staked, doors zipped, rainfly on',
      'Sleeping pads inflated and inside the tent',
      'Headlamps within arm\'s reach of each sleeper',
      'Phone is charged but on Do Not Disturb',
      'Stove tested and put away',
      'Trash sealed (raccoons are a real threat in suburbs too)',
    ],
    gearSetId: 'BACKYARD_TEST_GEAR',
  },

  'first-night-camp': {
    slug: 'first-night-camp',
    cover: {
      eyebrow: 'Trailstead Trip Pack',
      title: 'First Night Camp',
      subtitle: 'Your Personalized Camping Plan',
    },
    overview: {
      whatThisIs:
        'A single overnight at a real campground, deliberately undersized so nothing can go badly wrong. One tent, one cooler, one stove, one fire — and home by Sunday lunch.',
      whyItWorks:
        'Most first-time camping trips fail because families try to do three nights when they\'ve never done one. Compression of the unknown into a 20-hour window means your worst case is "we drove home tired" — not "we ruined a long weekend."',
      expectedOutcome:
        'You\'ll come home with one of two clear outcomes: confidence to book a two-night trip, or a specific list of three things to fix first. Both outcomes are wins.',
    },
    mistakePrevention: [
      {
        title: 'Booking a remote site for your first trip',
        why: 'Cell signal, ranger access, and bathrooms matter more than scenery on night one.',
        fix: 'Pick a state-park campground within 90 minutes of home with flush toilets.',
      },
      {
        title: 'Buying a brand-new tent the day before',
        why: 'Setup at dusk in the rain, with a tent you\'ve never pitched, is the #1 first-trip horror story.',
        fix: 'Set up the tent in your yard at least once. Time yourself. If it takes 30+ minutes, practice again.',
      },
      {
        title: 'Underpacking layers',
        why: 'Even summer nights can hit the 50s. Cold kids cry. Cold parents quit.',
        fix: 'Pack one more layer per person than you think you need. A fleece weighs almost nothing.',
      },
      {
        title: 'Planning a complicated dinner',
        why: 'It will be dark, you\'ll be tired, and the kids will be wired. Skill is the wrong test for night one.',
        fix: 'Hot dogs, pre-made pasta salad, fruit. Save the foil packets for trip three.',
      },
      {
        title: 'No plan for the morning',
        why: 'Pack-out chaos undoes a great night.',
        fix: 'Decide the night before: who packs the tent, who packs the kitchen, who packs the car.',
      },
    ],
    finalChecklist: [
      'Reservation confirmation printed (cell signal is unreliable)',
      'Tent practiced in the yard',
      'Cooler packed with ice the morning of',
      'Headlamps on every person, with spare batteries',
      'Cash for the camp store and firewood',
      'A backup plan if it rains (motel name + phone number)',
    ],
    gearSetId: 'FIRST_NIGHT_MINIMAL_GEAR',
  },

  'first-weekend-camp': {
    slug: 'first-weekend-camp',
    cover: {
      eyebrow: 'Trailstead Trip Pack',
      title: 'First Weekend Camp',
      subtitle: 'Your Personalized Camping Plan',
    },
    overview: {
      whatThisIs:
        'Two full nights at a real campground, with enough gear to be comfortable and enough structure to keep the family from melting down on Saturday afternoon.',
      whyItWorks:
        'Two nights is the inflection point where camping starts to feel like a vacation and not a chore. Night one teaches you the campground. Day two is when you actually relax. Night two is when the kids ask when you\'re coming back.',
      expectedOutcome:
        'You\'ll leave with the muscle memory of a full camping weekend — the rhythm of cooking, cleaning, and resetting camp. From here, you can scale to anywhere.',
    },
    mistakePrevention: [
      {
        title: 'Overscheduling Saturday',
        why: 'A 6am sunrise hike + lake swim + nature center + campfire dinner is a recipe for an exhausted, screaming 5pm.',
        fix: 'Pick ONE big activity for Saturday. Leave the rest of the day for camp time.',
      },
      {
        title: 'Underpacking food',
        why: 'Camping makes everyone 30% hungrier. Two nights means six meals plus snacks.',
        fix: 'Use the meal plan. Add a backup pack of tortillas and peanut butter.',
      },
      {
        title: 'Skipping the camp chair upgrade',
        why: 'You\'ll spend 8+ hours sitting at camp. The $20 folding chair from your garage will ruin your back.',
        fix: 'Real camp chairs are non-optional for a weekend. Rocking ones if you can swing it.',
      },
      {
        title: 'Forgetting a coffee plan',
        why: 'Day-two morale lives or dies on whether the adults get coffee within 20 minutes of waking.',
        fix: 'Pre-ground coffee + AeroPress or a percolator. Test it at home first.',
      },
      {
        title: 'No mid-day reset',
        why: 'Tents get hot, kids get cranky, gear gets scattered.',
        fix: 'Build a 30-minute "camp reset" into Saturday afternoon. Sweep, organize, refill water.',
      },
    ],
    finalChecklist: [
      'Reservation confirmation printed',
      'Two full days of food + one extra meal',
      'Coffee setup tested at home',
      'Trash bags (more than you think)',
      'Quarters for camp showers',
      'A book or deck of cards for the slow afternoon',
    ],
    gearSetId: 'WEEKEND_BALANCED_GEAR',
  },

  'easy-family-basecamp': {
    slug: 'easy-family-basecamp',
    cover: {
      eyebrow: 'Trailstead Trip Pack',
      title: 'Easy Family Basecamp',
      subtitle: 'Your Personalized Camping Plan',
    },
    overview: {
      whatThisIs:
        'A three-night family basecamp at a developed campground — bigger tent, real airbed, full kitchen, canopy for shade. Built for comfort, not minimalism.',
      whyItWorks:
        'Comfort is the differentiator between "we tried camping" and "we camp every summer." This plan trades pack-weight for sleep quality and meal quality, because those are the two things that determine whether you go again.',
      expectedOutcome:
        'A trip the kids ask to repeat. By night three, camp will feel like a second home, and the drive back will be the part everyone hates.',
    },
    mistakePrevention: [
      {
        title: 'Trying to do too much "real" camping',
        why: 'You booked a developed site for a reason. Lean into it.',
        fix: 'Use the showers. Buy ice from the camp store. The point is the family time, not the suffering.',
      },
      {
        title: 'Skipping the canopy',
        why: 'A 90°F afternoon with no shade is the fastest way to ruin a basecamp trip.',
        fix: 'A 10x10 pop-up canopy is $130 and pays for itself in one trip.',
      },
      {
        title: 'One cooler for everything',
        why: 'Constantly opening the cooler for drinks melts the ice in the food cooler.',
        fix: 'Two coolers: one for drinks (opened 50 times a day), one for food (opened 6 times a day).',
      },
      {
        title: 'No "home base" structure at the campsite',
        why: 'Gear scattered across the site means lost items, frustrated parents, and a chaotic camp.',
        fix: 'Designate zones: kitchen table, gear storage, shoe pile, trash. Enforce them on day one.',
      },
      {
        title: 'Three nights of the same dinner energy',
        why: 'Burgers all weekend gets old.',
        fix: 'Plan one "fancy" meal (foil packets, dutch oven), one easy (tacos), one cheat (frozen pizza on the grill).',
      },
      {
        title: 'No rain plan',
        why: 'A rained-out basecamp without a plan turns three days into a wet, miserable two.',
        fix: 'Know the closest indoor activity (museum, aquarium, movie theater) and the closest motel before you go.',
      },
    ],
    finalChecklist: [
      'Reservation confirmation + map of the loop printed',
      'Both coolers iced the morning of departure',
      'Canopy + sandbags or stakes',
      'Three full days of meals + snacks + buffer day',
      'A rain-day backup plan written down',
      'Cash for showers, ice, and firewood',
      'A book for the adult quiet hour',
    ],
    gearSetId: 'EASY_FAMILY_BASECAMP_GEAR',
  },
}

export function getPlanContent(slug: PlanSlug): PlanContent {
  return PLAN_CONTENT[slug]
}
