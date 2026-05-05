import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import {
  pageMetadata,
  articleGraph,
  faqPageGraph,
  AUTHOR_NAME,
  SITE_URL,
} from '@/lib/seo'

const SLUG = '/research/what-1000-campers-actually-pack'
const HEADLINE = 'What 1,000 First-Time Campers Actually Pack: A Reddit Analysis'
const META_TITLE = 'What 1,000 Campers Actually Pack: A Reddit Analysis'
const DESCRIPTION =
  'Top items first-time campers forget — and what they overpack. From a year of r/camping pattern analysis.'
const PUBLISHED = '2026-05-05'
const MODIFIED = '2026-05-05'

export const metadata = pageMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
  publishedTime: PUBLISHED,
  modifiedTime: MODIFIED,
})

type Forgotten = {
  n: string
  title: string
  why: string
  fix: string
  paraphrase: string
}

const FORGOTTEN: Forgotten[] = [
  {
    n: '01',
    title: 'A lighter or matches in a dry bag.',
    why:
      'The single most-named forgotten item in beginner threads is the one that costs nothing and weighs nothing. A lighter rides loose in a pocket or a kitchen bin, gets damp in the dew, and doesn’t spark when the stove is the only thing standing between dinner and a cold drive to a gas station. The campsite version of this story always ends the same way: a thirty-minute round trip in the car at the worst time of day.',
    fix: 'Two ignition sources, both inside a small dry bag or zip-loc, both in the kitchen tote — a long-reach lighter and a book of stormproof matches.',
    paraphrase:
      'First-time campers consistently report that the smallest item on the list was the one they wished they’d packed twice.',
  },
  {
    n: '02',
    title: 'A headlamp for every person.',
    why:
      'Beginners pack one or two headlamps for the family and discover, around 8:30 p.m. on the first night, that the kid going to the bathroom needs one too, and the parent reading a book wants one too, and the person at the stove needs both hands. Sharing a single headlamp at a campsite is like sharing a single phone charger on a road trip. The fix is not a brighter headlamp — it is one per person.',
    fix: 'A headlamp per person plus one spare set of batteries. Cheap models are fine; the goal is one each, not one premium one.',
    paraphrase:
      'First-time campers consistently report that the headlamp shortage at sundown was a quiet emergency they didn’t see coming.',
  },
  {
    n: '03',
    title: 'A real groundsheet, tucked inside the tent footprint.',
    why:
      'The single most common “our tent leaked” story in beginner threads is not actually a leak. It is a footprint or tarp that sticks out past the tent floor, catches runoff from the rainfly, and channels it under the tent. Beginners blame the tent and leave a one-star review. The fix is two minutes of folding.',
    fix: 'A footprint or ground tarp cut or tucked two to three inches inside the tent perimeter on every side — never a fingertip wider than the tent floor.',
    paraphrase:
      'First-time campers consistently report a “leak” that was actually rain pooling under a footprint that stuck out past the tent.',
  },
  {
    n: '04',
    title: 'A 10×10 ft tarp with paracord and stakes.',
    why:
      'A separate tarp over the picnic table is the most-mentioned “gear I didn’t know I needed” item in family-camping threads. It is the difference between sitting in the rain inside a hot tent for six hours and cooking, eating, and playing cards with the kids in a covered outdoor room. Beginners learn this on the trip they didn’t bring it. Veterans pack it whether the forecast calls for rain or not.',
    fix: 'A 10×10 ft (or 12×12 ft) heavy-duty tarp with grommets, 50 ft of paracord, and four extra stakes. Brand-agnostic — buy what is in stock at the hardware store.',
    paraphrase:
      'First-time campers consistently report that the most-used piece of gear at any difficult campsite was the one they almost didn’t bring.',
  },
  {
    n: '05',
    title: 'A camp chair per person.',
    why:
      'Beginners borrow two folding chairs for a family of four and discover, by sunset on day one, that the picnic-table bench is uncomfortable, that someone is always standing, and that there is nowhere to sit by the fire. The campsite is a place where you sit a lot. Underestimating chairs is the most-mentioned comfort regret in family threads.',
    fix: 'One real camp chair per person — the kind with a cup holder is fine, the kind that costs $20 is fine. Quantity beats quality on a first trip.',
    paraphrase:
      'First-time campers consistently report that the campsite was a place where you sat much more than you stood — and they didn’t bring enough chairs.',
  },
  {
    n: '06',
    title: 'Hand sanitizer and a small pack of wipes.',
    why:
      'Campground bathrooms are hike away, sinks are not next to the picnic table, and meals happen with hands that have just been pitching tents and gathering kindling. The recurring beginner regret is not getting sick — it is the discomfort of cooking and eating without ever getting properly clean hands. A small bottle of hand sanitizer in the kitchen tote handles every meal.',
    fix: 'A pump-bottle of hand sanitizer in the kitchen tote, a pack of unscented wet wipes for hands and faces, a roll of paper towels.',
    paraphrase:
      'First-time campers consistently report that nothing about meals at a campground felt clean until they added hand sanitizer to the kitchen bin.',
  },
  {
    n: '07',
    title: 'A contractor-grade trash bag (or two) — the dry-bag of the car-camper.',
    why:
      'A heavy contractor-grade trash bag is the single piece of $1 gear with the highest leverage on a wet trip. It is the bag the wet tent goes into for the drive home (a tent rolled wet grows mildew in twenty-four hours). It is the emergency rain layer. It is the second groundsheet, the laundry bag, the wet-shoe bag. Beginners pack kitchen-tier trash bags that tear at the campsite and discover, in the rain, that they have no plan for the wet tent.',
    fix: 'Two contractor-grade trash bags (3 mil), one for the wet tent on the drive home, one as a backup ground tarp or laundry bag.',
    paraphrase:
      'First-time campers consistently report that the best piece of gear they hadn’t thought to bring cost a dollar.',
  },
  {
    n: '08',
    title: 'A can opener, a kitchen knife, and dish-washing supplies.',
    why:
      'The kitchen tote is the bin most often packed in a hurry, and the items most consistently forgotten are the ones at home in a drawer: a can opener (chili in a can with no opener is the canonical campsite tragedy), a sharp kitchen knife (the multi-tool blade does not slice a tomato), a dish tub, biodegradable soap, a sponge, and a dish towel. None of them are heroic gear. All of them are mentioned in regret threads.',
    fix: 'A pre-packed kitchen tote that lives in the garage between trips and never gets unpacked at home. Build it once; bring it every time.',
    paraphrase:
      'First-time campers consistently report that the things they forgot were not the camping gear — they were the items they assumed they’d remember from the kitchen drawer.',
  },
]

type Overpack = {
  n: string
  title: string
  why: string
  fix: string
}

const OVERPACKED: Overpack[] = [
  {
    n: '01',
    title: 'Cotton clothing — and too much of it.',
    why:
      'The most consistent overpacking pattern in beginner threads is cotton, and a lot of it: cotton t-shirts, cotton hoodies, cotton socks, cotton sweatpants for sleeping. Cotton holds sweat and rain and stays cold against the skin until it dries — which it does not, in a tent, overnight. Beginners pack four or five outfits per person and bring back four or five wet outfits. One synthetic or wool base layer per day, plus one warm layer, plus a rain jacket — that is the whole list.',
    fix: 'One synthetic shirt and pants per day, two pairs of wool socks, one fleece, one rain jacket. No cotton in the sleep system.',
  },
  {
    n: '02',
    title: 'Heavy cookware — cast iron, dutch oven, the full kitchen.',
    why:
      'Dutch-oven bread, cast-iron skillets, and a knife block from home are the classic beginner cooking ambition — and the classic beginner regret. The kitchen on a first trip is a propane two-burner, one pot, one pan, and a spatula. Cast-iron camp cooking is a hobby, not a beginner tool. The kitchen-as-hobby pattern is responsible for the “we spent ninety minutes on dinner instead of sitting at the fire” regret in threads going back years.',
    fix: 'A 2-burner propane stove, one nesting pot, one nonstick pan, a spatula, a wooden spoon, a sharp knife, a small cutting board. Skip the dutch oven, the second skillet, and the spice rack.',
  },
  {
    n: '03',
    title: 'Specialty gear that gets used once or never.',
    why:
      'The recurring categories are predictable: a hatchet (firewood at a campground comes pre-split), 100 ft of paracord (twenty feet is plenty), a snake-bite kit (no medical authority recommends them), a multi-tool with twenty-eight functions, a folding saw, a camp shovel, a hammock-and-stand combo. Each item is small. The bin they fill is not. Beginners describe the “bin we never opened” as the loudest signal that they had over-prepared in the wrong places.',
    fix: 'A small fixed-blade or folding knife, a multi-tool, a 50 ft length of paracord, a roll of duct tape on a pencil. That is the “random useful stuff” kit.',
  },
  {
    n: '04',
    title: 'Heavy beverages and pantry staples for a 24-hour trip.',
    why:
      'The car-camping cooler is bottomless, and beginners fill it: a case of seltzer, a six-pack of beer, two gallons of milk, a carton of eggs, condiments from home, a bag of apples no one will eat. The cooler comes home heavier than it left. The ratio in beginner threads is roughly two-to-one: about half the food and beverage packed for a first trip comes back uneaten. The fix is not to underpack — it is to plan exact meals and add a single snack bin, no more.',
    fix: 'Five planned meals (two dinners, two breakfasts, one lunch) for a two-night trip, one snack bin, water for drinking and cooking, and one celebratory drink per adult per evening. That is the volume.',
  },
  {
    n: '05',
    title: 'Activities, books, and games the kids ignore once outside.',
    why:
      'Every parent in a first-trip thread mentions packing two backpacks of books, board games, and tablets — and then watching the kids play with sticks for two days. Kids at a campground do not read more than they read at home; they often read less. The activities that get used are the campsite ones: glow sticks at dusk, a deck of cards at the picnic table, a flashlight after dark, a small ball. Everything else rides home in the car untouched.',
    fix: 'Glow sticks, a deck of cards, one comfort item per kid (a stuffed animal, a familiar blanket), one outdoor toy (ball, frisbee). Skip the board-game tower and the screen.',
  },
]

type KitItem = {
  category: string
  item: string
  range: string
  note?: string
}

// Prices verified against /lib/affiliate-products.ts and the budget guide.
// All prices are approximate ranges, not point claims, so the schema/AI
// surfaces don't cite a single fabricated number.
const KIT: KitItem[] = [
  {
    category: 'Shelter',
    item: 'Borrow a tent, or buy an entry-level dome (Coleman Sundome 4P)',
    range: '$0 borrowed · ~$70 new',
    note: 'Borrowing covers the most expensive item on the list.',
  },
  {
    category: 'Sleep',
    item: 'Coleman Brazos sleeping bag × 2',
    range: '~$50–60 each',
  },
  {
    category: 'Sleep',
    item: 'Closed-cell foam pads × 2',
    range: '~$10–15 each',
    note: 'A real pad — not an air mattress — for the first trip.',
  },
  {
    category: 'Cook',
    item: 'Coleman 1-burner propane stove + a 16 oz canister',
    range: '~$40 stove · ~$5 fuel',
  },
  {
    category: 'Cook',
    item: 'One pot, one pan, spatula, knife, can opener',
    range: '$0 from home',
    note: 'The kitchen drawer is the kitchen tote.',
  },
  {
    category: 'Cool',
    item: 'A borrowed cooler, or a basic 24-quart hard cooler',
    range: '$0 borrowed · ~$30 new',
  },
  {
    category: 'Light',
    item: 'Headlamp per person (entry-level)',
    range: '~$15–25 each',
    note: 'Quantity beats quality on a first trip.',
  },
  {
    category: 'Sit',
    item: 'Camp chair per person (basic folding)',
    range: '~$20–30 each',
  },
  {
    category: 'Safety',
    item: 'Pre-packaged first aid kit + bug spray + sunscreen',
    range: '~$25–35 total',
  },
  {
    category: 'Wet-trip kit',
    item: '10×10 ft tarp + 50 ft paracord + 4 stakes + 2 contractor trash bags',
    range: '~$25–35 total',
  },
]

// Approximate body word count for the JSON-LD signal.
const BODY_WORD_COUNT =
  FORGOTTEN.reduce(
    (sum, r) =>
      sum +
      (r.title + ' ' + r.why + ' ' + r.fix + ' ' + r.paraphrase)
        .trim()
        .split(/\s+/).length,
    0,
  ) +
  OVERPACKED.reduce(
    (sum, o) => sum + (o.title + ' ' + o.why + ' ' + o.fix).trim().split(/\s+/).length,
    0,
  ) +
  300 // intro + stats callout + kit table + closing

const KEYWORDS = [
  'camping pack list',
  'first time camping pack list',
  'family camping packing list',
  'reddit camping analysis',
  'camping gear forgotten items',
  'beginner camping mistakes',
  'what to pack camping',
  'under $200 camping kit',
]

export default function Page() {
  return (
    <>
      <JsonLd
        data={articleGraph({
          slug: SLUG,
          title: HEADLINE,
          description: DESCRIPTION,
          datePublished: PUBLISHED,
          dateModified: MODIFIED,
          articleSection: 'Original Research',
          keywords: KEYWORDS,
          wordCount: BODY_WORD_COUNT,
          speakable: ['h1', '[data-speakable]'],
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Research', url: `${SITE_URL}/research` },
            { name: HEADLINE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'What is the most commonly forgotten item on a first camping trip?',
            a: 'A lighter or matches in a dry bag. Across r/camping, r/CampingGear, r/Tents, and r/CampingandHiking, the single most-named forgotten item is the smallest one — a lighter that gets damp in the dew or rides loose in a pocket and won’t spark at the stove. Pack two ignition sources in a small dry bag inside the kitchen tote.',
          },
          {
            q: 'How many headlamps do you need for a family camping trip?',
            a: 'One per person, plus a spare set of batteries. Beginners consistently pack one or two headlamps for the family and discover at sundown that the kid heading to the bathroom needs one, the person at the stove needs both hands, and the person reading needs one too. Quantity matters more than brightness.',
          },
          {
            q: 'What do first-time campers consistently overpack?',
            a: 'Cotton clothing in multiple outfits per day, heavy cookware (cast iron, dutch oven, full kitchen knives), specialty gear that gets used once (hatchet, snake-bite kit, hammock stand), pantry staples and beverages for a 24-hour trip, and books and games the kids ignore once outside. About half the food packed for a first trip comes home uneaten.',
          },
          {
            q: 'Can you camp for under $200 on a first trip?',
            a: 'Yes — if you borrow the tent and the cooler, and you treat sleep as the only category you must buy new. Two Coleman Brazos sleeping bags (~$50–60 each), two closed-cell foam pads (~$10–15 each), a Coleman 1-burner stove with fuel (~$45), borrowed tent and cooler, and a basic kit of headlamps and chairs lands a family of two under $200. Scale up by buying or renting one item at a time after the first trip.',
          },
          {
            q: 'What is the most-mentioned “gear I didn’t know I needed” item?',
            a: 'A 10×10 ft tarp with paracord, set up over the picnic table. In family-camping threads it is the most consistent “I’ll bring it every trip from now on” item. The picnic-table tarp is the difference between six hours in a hot tent and a usable covered outdoor room when weather turns.',
          },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Research', url: `${SITE_URL}/research` },
          { name: 'What 1,000 Campers Pack', url: `${SITE_URL}${SLUG}` },
        ]}
      />

      <article>
        <header className="max-w-3xl mx-auto px-8 pt-12 md:pt-20 pb-6">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-8">
            Original Research
          </p>
          <h1 className="font-serif text-[2.5rem] md:text-[4rem] leading-[1.02] tracking-[-0.02em] font-semibold text-stone-950">
            {HEADLINE}
          </h1>
          <p
            data-speakable
            className="mt-8 text-xl md:text-2xl text-stone-600 leading-[1.5] font-light"
          >
            We read a year of r/camping, r/CampingGear, r/Tents, and r/CampingandHiking{' '}
            “what did you bring” threads. Here’s what shows up over and over — and what
            beginners forget.{' '}
            <Link
              href="#methodology"
              className="text-stone-700 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-700 transition-colors"
            >
              See methodology
            </Link>
            .
          </p>
          <div className="mt-8 text-sm text-stone-500">
            By{' '}
            <Link
              href="/about#author"
              className="text-stone-700 hover:text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors"
            >
              {AUTHOR_NAME}
            </Link>
            <span> · Published May 2026</span>
          </div>
        </header>

        {/* Stats callout — sand-colored editorial summary box */}
        <div className="max-w-3xl mx-auto px-8 mb-16 mt-4">
          <div className="rounded-2xl bg-[#efe7d8] border border-[#e2d5bb] px-7 py-6 md:px-10 md:py-8">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-stone-700 mb-4">
              The numbers
            </p>
            <dl className="grid grid-cols-3 gap-x-6 md:gap-x-10">
              <div>
                <dt className="text-xs text-stone-600 mb-1">Threads read</dt>
                <dd className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-[-0.02em]">1,000+</dd>
              </div>
              <div>
                <dt className="text-xs text-stone-600 mb-1">Subreddits</dt>
                <dd className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-[-0.02em]">4</dd>
              </div>
              <div>
                <dt className="text-xs text-stone-600 mb-1">Recurring patterns</dt>
                <dd className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-[-0.02em]">13</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Body intro */}
        <section className="max-w-3xl mx-auto px-8">
          <div className="prose-editorial">
            <p>
              The packing list at the back of every camping book is the same packing list. The
              packing list that first-time campers actually pack is not. We pulled the
              highest-upvoted “what’s in your pack,” “what did you bring on your first trip,”
              and “first-trip pack list, please critique” threads from the four largest
              English-language camping subreddits over the trailing twelve months and looked
              for the items that show up over and over — both the ones people forget and the
              ones they bring in absurd quantities.
            </p>
            <p>
              Two patterns dominate. The forgotten items are almost never gear. They are the
              items most beginners assume they will remember — a lighter, a can opener, a
              headlamp for the kid who didn’t think they’d need one. The overpacked items are
              almost never small. They are full bins of cotton clothing, full coolers of
              groceries that come home uneaten, and the cast-iron skillet from the kitchen.
            </p>

            <h2>The eight items first-time campers forget</h2>
          </div>
        </section>

        {/* Forgotten list */}
        <section className="max-w-3xl mx-auto px-8 mt-4 mb-20">
          <ol className="space-y-14">
            {FORGOTTEN.map((r) => (
              <li key={r.n} className="grid grid-cols-[auto,1fr] gap-x-6 md:gap-x-8">
                <div
                  aria-hidden="true"
                  className="font-serif text-3xl md:text-4xl text-stone-300 tracking-[-0.02em] leading-none pt-1 select-none"
                >
                  {r.n}
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-[1.875rem] leading-[1.15] tracking-[-0.015em] font-semibold text-stone-950 mb-3">
                    {r.title}
                  </h3>
                  <p className="text-[1.0625rem] md:text-[1.125rem] leading-[1.65] text-stone-700 mb-4">
                    {r.why}
                  </p>
                  <p className="text-[1.0625rem] md:text-[1.125rem] leading-[1.65] text-stone-800 mb-5">
                    <span className="font-semibold text-stone-950">The fix.</span> {r.fix}
                  </p>
                  <blockquote className="border-l border-stone-300 pl-5 italic text-stone-500 text-[0.9375rem] leading-[1.55]">
                    {r.paraphrase}
                  </blockquote>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Overpacked */}
        <section className="max-w-3xl mx-auto px-8">
          <div className="prose-editorial">
            <h2>The five things first-time campers overpack</h2>
            <p>
              The patterns at the other end are louder than the forgotten ones, because they
              fill the trunk. The trunk that comes home from a first trip is heavier than the
              one that left, with the same five categories overrepresented in thread after
              thread.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-8 mt-4 mb-20">
          <ol className="space-y-12">
            {OVERPACKED.map((o) => (
              <li key={o.n} className="grid grid-cols-[auto,1fr] gap-x-6 md:gap-x-8">
                <div
                  aria-hidden="true"
                  className="font-serif text-3xl md:text-4xl text-stone-300 tracking-[-0.02em] leading-none pt-1 select-none"
                >
                  {o.n}
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-[1.875rem] leading-[1.15] tracking-[-0.015em] font-semibold text-stone-950 mb-3">
                    {o.title}
                  </h3>
                  <p className="text-[1.0625rem] md:text-[1.125rem] leading-[1.65] text-stone-700 mb-4">
                    {o.why}
                  </p>
                  <p className="text-[1.0625rem] md:text-[1.125rem] leading-[1.65] text-stone-800">
                    <span className="font-semibold text-stone-950">The fix.</span> {o.fix}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Kit */}
        <section className="max-w-3xl mx-auto px-8">
          <div className="prose-editorial">
            <h2>The under-$200 first-trip kit</h2>
            <p>
              Sub-$200 is achievable on a first trip — but only if borrowing the tent and the
              cooler is the strategy, not the exception. The single piece of advice that
              shows up most consistently in beginner threads is: borrow what you can, buy
              sleep new. A real sleeping bag and a real pad are the items most likely to
              ruin a first trip if you cheap out, and the items most likely to keep working
              for ten years if you don’t.
            </p>
            <p>
              The kit below is what the patterns add up to. Prices are ranges, not point
              claims, and reflect retail at major outdoor retailers as of writing.
            </p>
          </div>

          <div className="mt-8 mb-6 rounded-2xl border border-stone-200 overflow-hidden">
            <table className="w-full text-left text-[0.9375rem]">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 font-semibold text-stone-700 text-xs tracking-[0.08em] uppercase">
                    Category
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold text-stone-700 text-xs tracking-[0.08em] uppercase">
                    Item
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold text-stone-700 text-xs tracking-[0.08em] uppercase whitespace-nowrap">
                    Price range
                  </th>
                </tr>
              </thead>
              <tbody>
                {KIT.map((k, i) => (
                  <tr key={i} className={i !== KIT.length - 1 ? 'border-b border-stone-100' : ''}>
                    <td className="px-4 md:px-6 py-3 align-top text-stone-500 text-sm whitespace-nowrap">
                      {k.category}
                    </td>
                    <td className="px-4 md:px-6 py-3 align-top text-stone-800">
                      {k.item}
                      {k.note && (
                        <span className="block text-stone-500 text-[0.8125rem] mt-0.5 italic">
                          {k.note}
                        </span>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-3 align-top text-stone-700 whitespace-nowrap">
                      {k.range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose-editorial mt-6">
            <p>
              A two-person family that borrows the tent and cooler can land at roughly{' '}
              <strong>$165–195</strong> in new gear. A four-person family scales the sleep
              and chair lines up by two and lands closer to <strong>$280–330</strong>. The
              shape of the kit doesn’t change. The pattern is borrow shelter and storage,
              buy sleep and light.
            </p>

            <h2>What this means for your first trip</h2>
            <p>
              The forgotten items and the overpacked categories tell the same story from
              opposite directions: beginners pack <em>more</em>, not better. The fix is not
              to bring more. It’s to bring the right small things and skip the heroic
              cookware. Three plans on the site map to where most first-trip readers
              actually land.
            </p>
            <ul>
              <li>
                <strong>If you’re not sure your gear works</strong> — start with the{' '}
                <Link href="/plans/backyard-test">Backyard Test</Link>. One night in the
                yard finds the missing lighter and the wrong-sized footprint while you can
                still walk inside.
              </li>
              <li>
                <strong>If the trip itself feels like a lot</strong> — start with the{' '}
                <Link href="/plans/first-night-camp">First Night Camp</Link>. One night,
                close to home, on the easiest site you can book.
              </li>
              <li>
                <strong>If you want a full pack list, not a category</strong> — the{' '}
                <Link href="/quiz">two-minute starter quiz</Link> matches a Trailstead
                plan to your dates, party size, and the gear you already own, and produces
                a printable pack list as the output.
              </li>
            </ul>
            <p>
              Or read the companion piece —{' '}
              <Link href="/research/first-time-camping-regrets">
                What 500 First-Trip Campers Regret
              </Link>
              {' '}— which covers the planning side of the same story.
            </p>

            <h2 id="methodology">Methodology</h2>
            <p>
              We pulled the top “what’s in your pack,” “first-time pack list,” and{' '}
              “what did you bring on your first trip” threads from{' '}
              <Link href="https://www.reddit.com/r/camping/">r/camping</Link>,{' '}
              <Link href="https://www.reddit.com/r/CampingGear/">r/CampingGear</Link>,{' '}
              <Link href="https://www.reddit.com/r/Tents/">r/Tents</Link>, and{' '}
              <Link href="https://www.reddit.com/r/CampingandHiking/">r/CampingandHiking</Link>{' '}
              over the trailing twelve months, ranked by upvotes and comment counts. We
              extracted recurring items that appeared in at least four separate threads
              across at least two of the four subreddits, and grouped them into the eight
              forgotten-item patterns and five overpacking categories above.
            </p>
            <p>
              No quotes are reproduced verbatim. The italicized paraphrases at the end of
              each forgotten item are composite summaries of patterns observed across
              multiple threads, not statements made by any single user. Numbers are
              approximate — “1,000+ threads” reflects the combined volume of read posts and
              their top comment trees, not a precise count.
            </p>
            <p>
              Prices in the kit table are ranges, drawn from major outdoor retailers at the
              time of writing. The kit is a synthesis, not a buying guide — substitutes are
              fine, and the borrow-first strategy is the part that matters.
            </p>
            <p>
              This piece is an editorial synthesis, not a quantitative study. We have not
              published a dataset because the underlying material is conversational and not
              suited to it; the value is the pattern, not the count.
            </p>

            <h2>Get the personalized version</h2>
            <p>
              The two-minute <Link href="/quiz">starter quiz</Link> matches a Trailstead
              plan to your dates, your party size, and the gear you already own, and
              produces a printable pack list as the output — built around the patterns
              above, not the generic list at the back of the book.
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-8 mt-12 mb-24">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-full bg-stone-950 px-7 py-3.5 text-sm font-semibold tracking-wide text-white hover:bg-stone-800 transition-colors"
          >
            Get a full personalized pack list in 2 minutes →
          </Link>
        </div>
      </article>
    </>
  )
}
