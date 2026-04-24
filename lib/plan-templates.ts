import type { PlanTemplate } from '@/types'
import { MEALS_BY_PLAN } from './plan-meals'

export const PLAN_TEMPLATES: Record<string, PlanTemplate> = {
  'backyard-test': {
    meals: MEALS_BY_PLAN['backyard-test'],
    slug: 'backyard-test',
    title: 'Backyard Test Night',
    tagline: 'Before you commit to a campsite, make sure everyone can actually sleep outside.',
    heroImage: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1400&auto=format&fit=crop&q=80',
    tripSummary: 'A one-night backyard simulation to test your sleep system, gear setup, and kid readiness — no campsite booking required.',
    preTrip: [
      {
        time: '3 days before',
        title: 'Pull out all your gear',
        description: 'Locate your tent, sleeping bags, and sleeping pads. Check for missing parts, broken zippers, or missing stakes.',
      },
      {
        time: '1 day before',
        title: 'Set a "go time"',
        description: 'Pick a start time — 5pm works well. Having a schedule prevents the night from drifting into chaos.',
      },
    ],
    arrival: [
      {
        time: '5:00 PM',
        title: 'Set up the tent',
        description: 'Do this before it gets dark. Let the kids help with simple tasks like carrying stakes or holding poles.',
      },
      {
        time: '6:00 PM',
        title: 'Test your sleep system',
        description: "Everyone gets into their sleeping bag inside the tent while it's still light. Note what's uncomfortable now — not at midnight.",
      },
    ],
    evening: [
      {
        time: '7:00 PM',
        title: 'Cook outside',
        description: "Use your camp stove or grill. Practice the setup, not the food. Hot dogs are fine. The point is doing it outside.",
      },
      {
        time: '8:30 PM',
        title: 'Lights out in the tent',
        description: 'Everyone sleeps in the tent — yes, even if the house is 20 feet away. No exceptions. This is the test.',
      },
    ],
    morning: [],
    gear: [
      { name: '3-season tent', essential: true },
      { name: 'Sleeping bags (age/temp appropriate)', essential: true, affiliateProductId: 'sleeping-bag-family' },
      { name: 'Sleeping pads', essential: true },
      { name: 'Headlamps (one per person)', essential: true, affiliateProductId: 'headlamp-family' },
      { name: 'Camp stove (optional for backyard)', essential: false, affiliateProductId: 'stove-2-burner' },
    ],
    activities: [
      {
        title: 'Tent setup challenge',
        description: 'Race to get a specific peg in. Small competitive wins build confidence with gear.',
        ageGroup: 'all',
      },
      {
        title: 'Night sounds inventory',
        description: 'Before sleep: lie still and identify 3 sounds you can hear from inside the tent.',
        ageGroup: '7-12',
      },
      {
        title: 'Flashlight story time',
        description: 'Stories told by flashlight inside sleeping bags. Let kids lead one.',
        ageGroup: '3-6',
      },
    ],
    safetyNotes: [
      'Keep the back door unlocked. This is a test, not a survival situation.',
      'Temperature drops significantly at night even in summer. Check bag ratings before lights out.',
      'Keep water bottles inside the tent.',
      'If anyone is genuinely uncomfortable, the house is right there. No shame in going in.',
    ],
  },

  'first-night-camp': {
    meals: MEALS_BY_PLAN['first-night-camp'],
    slug: 'first-night-camp',
    title: 'First Night Camp',
    tagline: 'Your first real campsite trip — done right, without the chaos.',
    heroImage: 'https://images.unsplash.com/photo-1506003094589-53954a26283f?w=1400&auto=format&fit=crop&q=80',
    tripSummary: "A one-night campsite trip with a clear timeline, a short gear list, and everything your family needs to leave feeling like you'll do it again.",
    preTrip: [
      {
        time: '1 week before',
        title: 'Book your campsite',
        description: 'Pick a developed campsite with restrooms, fire rings, and flat tent pads. State parks are ideal. Reserve.america.com covers most.',
      },
      {
        time: '3 days before',
        title: 'Backyard gear check',
        description: 'Set up the tent in your yard. Test all sleep systems. Replace anything missing or broken now — not the morning you leave.',
      },
      {
        time: 'Night before',
        title: 'Pack the car',
        description: 'Use the gear list below. Pack the car completely the night before. Morning departure is dramatically easier with a loaded car.',
      },
      {
        time: 'Morning of',
        title: 'Depart by 9 AM',
        description: 'Arriving by noon means setup time before kids get tired and hungry. Late arrivals make bad first trips.',
      },
    ],
    arrival: [
      {
        time: 'On arrival',
        title: 'Walk your site before unpacking',
        description: 'Take 5 minutes to walk the site. Identify: flat tent area, fire ring location, car parking, path to restrooms.',
      },
      {
        time: '+30 min',
        title: 'Set up tent first',
        description: 'Everything else can wait. Tent up = base established. Kids have a home base, stress drops immediately.',
      },
      {
        time: '+1 hour',
        title: 'Unpack only what you need today',
        description: "Leave tomorrow's gear in bags. A clean site is a calm site.",
      },
    ],
    evening: [
      {
        time: '5:00 PM',
        title: 'Simple camp dinner',
        description: 'Foil packet meals or hot dogs on sticks. Low effort, high satisfaction. Save complex cooking for when you have more confidence.',
      },
      {
        time: '6:30 PM',
        title: 'Campfire (if permitted)',
        description: 'Check campsite rules first. Keep it small. Kids roast marshmallows. This is the moment the whole trip pays off.',
      },
      {
        time: '8:00 PM',
        title: 'Wind down routine',
        description: 'Same routine as home: brush teeth, get into bags, one story. Familiar routines in unfamiliar places reduce kid anxiety.',
      },
    ],
    morning: [
      {
        time: '7:00 AM',
        title: 'Simple camp breakfast',
        description: 'Instant oatmeal, granola bars, or scrambled eggs on the stove. Keep it fast.',
      },
      {
        time: '8:00 AM',
        title: 'Morning walk',
        description: '20-minute explore around the campground or a short nearby trail. This is the memory kids keep.',
      },
      {
        time: '9:30 AM',
        title: 'Break camp',
        description: 'Pack in reverse order: sleeping gear first, tent last. Leave the site cleaner than you found it.',
      },
    ],
    gear: [
      { name: 'Family tent (4-person min)', essential: true, affiliateProductId: 'tent-family' },
      { name: 'Sleeping bags (temp-rated for season)', essential: true, affiliateProductId: 'sleeping-bag-family' },
      { name: 'Sleeping pads or air mattress', essential: true, affiliateProductId: 'sleeping-pad-air' },
      { name: '2-burner camp stove + fuel', essential: true, affiliateProductId: 'stove-2-burner' },
      { name: 'Headlamps — one per person', essential: true, affiliateProductId: 'headlamp-family' },
      { name: 'Cooler with ice', essential: true, affiliateProductId: 'cooler-basic' },
      { name: 'Camp chairs', essential: false, affiliateProductId: 'camp-chairs' },
      { name: 'Camp pillow (comfort upgrade)', essential: false },
    ],
    activities: [
      {
        title: 'Junior Ranger program',
        description: 'Most state parks offer free Junior Ranger booklets. Pick one up at the visitor center.',
        ageGroup: '7-12',
      },
      {
        title: 'Rock and stick collection',
        description: 'Give each kid a small bag. Collect 5 interesting things. Share discoveries at dinner.',
        ageGroup: '3-6',
      },
      {
        title: "S'mores by the fire",
        description: "Classic. Non-negotiable. Makes the whole trip.",
        ageGroup: 'all',
      },
    ],
    safetyNotes: [
      'Store all food in your car or a bear box overnight, even in areas without bear warnings.',
      'Keep a first aid kit accessible — top of a bag, not buried.',
      'Tell someone at home which campsite you are at and when you plan to return.',
      'Know the location of the nearest urgent care before you leave home.',
      'Keep the campfire at least 3 feet from the tent and fully extinguished before sleeping.',
    ],
  },

  'first-weekend-camp': {
    meals: MEALS_BY_PLAN['first-weekend-camp'],
    slug: 'first-weekend-camp',
    title: 'First Weekend Camp',
    tagline: 'Two nights. Better gear. More confidence. Same family.',
    heroImage: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=1400&auto=format&fit=crop&q=80',
    tripSummary: 'Your first multi-night camping experience — with a full weekend plan, upgraded comfort gear, and the room to actually enjoy it.',
    preTrip: [
      {
        time: '2 weeks before',
        title: 'Book two consecutive nights',
        description: 'Weekends fill fast at good campsites. Book early. Choose a site with a hiking trail or swimming area nearby.',
      },
      {
        time: '1 week before',
        title: 'Plan all 5 meals',
        description: 'Friday dinner, Saturday breakfast, Saturday lunch, Saturday dinner, Sunday breakfast. Prep what you can at home.',
      },
      {
        time: '3 days before',
        title: 'Gear audit — add comfort upgrades',
        description: 'This trip benefits from: better chairs, a shade canopy, camp lighting. Check what you have and what to add.',
      },
      {
        time: 'Day before',
        title: 'Load car fully, charge devices',
        description: 'Fully loaded car before sleep. Depart early Friday to beat traffic and arrive with setup time.',
      },
    ],
    arrival: [
      {
        time: 'Friday arrival',
        title: 'Set up your full camp',
        description: "You have two nights — set up properly. Canopy, camp kitchen, tent, chairs, lighting. Don't shortcut it.",
      },
      {
        time: '+1 hour',
        title: 'Establish camp zones',
        description: 'Kitchen zone separated from sleep zone. All gear bags in one designated area. An organized camp is a relaxed camp.',
      },
      {
        time: 'Friday evening',
        title: 'Easy arrival dinner',
        description: 'Pre-made sandwiches, wraps, or a simple store-bought meal. Save cooking energy for Saturday when everyone is rested.',
      },
    ],
    evening: [
      {
        time: 'Friday night',
        title: 'Short campfire, early night',
        description: 'Everyone is road-tired. Low-key fire, early bed. Saturday is the main event.',
      },
      {
        time: 'Saturday — main activity',
        title: 'Day hike or lake/river time',
        description: 'This is the core experience of the weekend. Plan the distance based on kid ages: 1 mile per age-year is a rough guide.',
      },
      {
        time: 'Saturday evening',
        title: 'Real camp dinner',
        description: 'Dutch oven chili, foil packet potatoes, full fire-cooked meal. This is your Saturday centerpiece.',
      },
      {
        time: 'Saturday night',
        title: 'Longer campfire',
        description: "You earned it. Stories, s'mores, stargazing. This is the night that makes everyone want to come back.",
      },
    ],
    morning: [
      {
        time: 'Saturday 7 AM',
        title: 'Proper camp breakfast',
        description: 'Scrambled eggs, bacon, camp coffee. Take your time. No rush.',
      },
      {
        time: 'Sunday 7 AM',
        title: 'Pack-out breakfast',
        description: 'Instant oatmeal or granola. Start packing camp while kids eat.',
      },
      {
        time: 'Sunday 10 AM',
        title: 'Full camp breakdown',
        description: 'All bags packed, tent down, site swept clean. Leave absolutely nothing behind.',
      },
    ],
    gear: [
      { name: 'Family tent (6-person or larger)', essential: true, affiliateProductId: 'tent-family' },
      { name: 'Sleeping bags + liners', essential: true, affiliateProductId: 'sleeping-bag-family' },
      { name: 'Self-inflating sleeping pads', essential: true, affiliateProductId: 'sleeping-pad-air' },
      { name: '2-burner stove + extra fuel', essential: true, affiliateProductId: 'stove-2-burner' },
      { name: 'Headlamps — one per person', essential: true, affiliateProductId: 'headlamp-family' },
      { name: 'Large cooler', essential: true, affiliateProductId: 'cooler-basic' },
      { name: 'Shade canopy', essential: false, affiliateProductId: 'canopy-camp' },
      { name: 'Camp chairs — one per person', essential: false, affiliateProductId: 'camp-chairs' },
      { name: 'Dutch oven', essential: false },
    ],
    activities: [
      {
        title: 'Full day hike (age-appropriate)',
        description: '2–5 miles depending on ages. Download AllTrails before leaving — filter by "kid friendly."',
        ageGroup: 'all',
      },
      {
        title: 'Fishing (if near water)',
        description: 'Day licenses available at most state park offices. Minimal gear needed — a rod, hook, bait.',
        ageGroup: '7-12',
      },
      {
        title: 'Nature journaling',
        description: 'Each kid gets a small notebook. Draw what you see. No rules, no pressure.',
        ageGroup: '7-12',
      },
      {
        title: 'Camp cooking participation',
        description: 'Kids help prep one meal — stirring, measuring, setting the table. Fire-safe tasks only.',
        ageGroup: 'all',
      },
    ],
    safetyNotes: [
      'Two nights = two nights of food storage. Bear box or car every night.',
      'Check the full weekend weather forecast. Have a rain plan before you leave.',
      'More sun exposure over two days. Sunscreen every morning and after swimming.',
      'Keep a complete first aid kit accessible the full trip.',
    ],
  },

  'easy-family-basecamp': {
    meals: MEALS_BY_PLAN['easy-family-basecamp'],
    slug: 'easy-family-basecamp',
    title: 'Easy Family Basecamp',
    tagline: 'Maximum comfort. Minimal chaos. Camping for families who like being comfortable.',
    heroImage: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1400&auto=format&fit=crop&q=80',
    tripSummary: 'A deliberately comfortable family camp experience — designed to reduce friction, maximize enjoyment, and make camping something your family actually wants to repeat.',
    preTrip: [
      {
        time: '2 weeks before',
        title: 'Book a premium site',
        description: 'Look for: electrical hookup, shade, proximity to restrooms, flat ground. Premium sites fill fast. Reserve early.',
      },
      {
        time: '1 week before',
        title: 'Comfort gear audit',
        description: 'This trip uses comfort infrastructure: air mattress, canopy, real lighting, real pillows, good chairs. Verify you have it.',
      },
      {
        time: '3 days before',
        title: 'Meal plan like a real kitchen',
        description: "No roughing it on this trip. Real meals, planned in advance. Prep ingredients at home. Bring your cast iron.",
      },
      {
        time: 'Day before',
        title: 'Pack in labeled bins',
        description: 'Camp kitchen in one bin. Sleeping gear in one bag. Bins labeled. Morning setup will be fast and calm.',
      },
    ],
    arrival: [
      {
        time: 'On arrival',
        title: 'Set up comfort infrastructure first',
        description: 'Air mattress inflated, real pillows out, canopy up, lighting hung. Comfort base before anything else.',
      },
      {
        time: '+1 hour',
        title: 'Create your camp living room',
        description: 'Chairs in a circle or around the table, camp rug if you have one. Make it feel like somewhere you want to be.',
      },
      {
        time: '+2 hours',
        title: 'Unpack kitchen fully',
        description: 'Everything has a place. Camp kitchen operates like a real kitchen on this trip.',
      },
    ],
    evening: [
      {
        time: 'Evening',
        title: 'Real camp dinner',
        description: 'Cast iron meal, proper setup. This is not hot dogs on sticks night. Pasta, chili, tacos — whatever your family likes, made outside.',
      },
      {
        time: 'After dinner',
        title: 'Comfortable fire time',
        description: "Camp chairs, good lighting, quiet music on a speaker if you want it. No roughing it required.",
      },
      {
        time: 'Bedtime',
        title: 'Actually comfortable sleep',
        description: 'Air mattress inflated, real pillows, sleeping bags plus blankets. No one is sleeping on the ground.',
      },
    ],
    morning: [
      {
        time: 'Morning',
        title: 'Camp coffee ritual',
        description: "French press or pour-over if you have it. This is part of why you came.",
      },
      {
        time: '+30 min',
        title: 'Real breakfast',
        description: 'Eggs, toast if you have a pan, camp bacon. Take your time. No schedule.',
      },
      {
        time: 'Mid-morning',
        title: 'Relaxed activity',
        description: 'Short walk, reading in chairs, kids exploring a defined radius. Nothing strenuous required.',
      },
    ],
    gear: [
      { name: 'Cabin tent or large family tent', essential: true, affiliateProductId: 'tent-cabin' },
      { name: 'Queen air mattress + electric pump', essential: true, affiliateProductId: 'air-mattress-queen' },
      { name: 'Real pillows (bring from home)', essential: true },
      { name: 'Sleeping bags + extra blankets', essential: true, affiliateProductId: 'sleeping-bag-family' },
      { name: 'Shade canopy', essential: true, affiliateProductId: 'canopy-camp' },
      { name: 'Comfortable camp chairs — one per person', essential: true, affiliateProductId: 'camp-chairs' },
      { name: '2-burner stove + fuel', essential: true, affiliateProductId: 'stove-2-burner' },
      { name: 'Headlamps + camp lantern', essential: true, affiliateProductId: 'headlamp-family' },
      { name: 'Large cooler', essential: true, affiliateProductId: 'cooler-basic' },
      { name: 'Camp rug', essential: false },
      { name: 'Portable speaker', essential: false },
    ],
    activities: [
      {
        title: 'Slow morning walk',
        description: 'No destination, no timeline. Just walking and looking at things.',
        ageGroup: 'all',
      },
      {
        title: 'Card games in camp chairs',
        description: "Uno, Go Fish, Rummy — whatever you have. Low effort, high connection.",
        ageGroup: 'all',
      },
      {
        title: 'Camp art station',
        description: 'Small table with colored pencils and paper. Kids draw what they see. No prompts needed.',
        ageGroup: '3-6',
      },
      {
        title: 'Nature scavenger hunt',
        description: 'Simple list: find a feather, a smooth rock, something yellow, something alive. Works for all ages.',
        ageGroup: 'all',
      },
    ],
    safetyNotes: [
      'Comfort camping still requires a first aid kit. Non-negotiable.',
      'If using an electrical hookup: know your amp load. Do not overload the circuit with multiple high-draw devices.',
      'Keep food stored properly even on comfort trips. Animals are not impressed by your camp rug.',
      'Know the nearest urgent care before you leave. Set it in Maps.',
    ],
  },
}

export function getPlanTemplate(slug: string): PlanTemplate | null {
  return PLAN_TEMPLATES[slug] ?? null
}
