import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import QuickAnswer from '@/components/guide/QuickAnswer'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/family-camping-vs-cabin-rental'
const TITLE = 'Family Camping vs Cabin Rental - Real Tradeoffs'
const DESCRIPTION =
  'Family camping vs cabin rental: real per-night cost after gear, comfort, weather risk, and what kids actually remember. An honest way to pick your weekend.'
const H1 = 'Family camping vs cabin rental: which weekend is worth it?'

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
})

type Row = {
  axis: string
  a: string
  b: string
}

const ROWS: Row[] = [
  {
    axis: 'Cost, first night',
    a: 'Roughly $150-$250 a night, all in, nothing else to buy.',
    b: 'A $25-$60 site fee, plus about $400 of starter gear you keep.',
  },
  {
    axis: 'Cost, tenth night',
    a: 'Around $1,500-$2,500 spent, and you own nothing afterward.',
    b: 'Closer to $70 a night once the gear is paid off, and falling.',
  },
  {
    axis: 'Prep time',
    a: 'Book it, pack clothes, drive. Maybe an hour of effort total.',
    b: 'About 20 minutes with a plan, then an hour loading the car.',
  },
  {
    axis: 'Comfort',
    a: 'Real bed, heat and AC, indoor plumbing, a hot shower whenever.',
    b: 'Sleeping pad, a bathhouse walk, and weather you can feel all night.',
  },
  {
    axis: 'Kid experience',
    a: 'Comfortable and easy. Often ends up feeling like home in different walls.',
    b: 'Fire, dirt, dark, and stars. The parts kids retell for years.',
  },
  {
    axis: 'Weather resilience',
    a: 'A rainy weekend is fine. You go inside and play cards.',
    b: 'A rainy weekend is a real test. Fine with a rain plan, rough without one.',
  },
  {
    axis: 'Spontaneity',
    a: 'Low. Good cabins near cities book out months in advance.',
    b: 'Higher. Sites open up late, and dispersed camping needs no booking at all.',
  },
  {
    axis: 'Gear owned after',
    a: 'None. Every night is a fresh rental.',
    b: 'Tent, bags, pads, stove, cooler. Reusable for five-plus seasons.',
  },
  {
    axis: 'First-trip risk',
    a: 'Very low. Hard for a cabin weekend to actually fail.',
    b: 'Moderate on trip one, low after. This is what a plan is for.',
  },
  {
    axis: 'Memorability',
    a: 'Pleasant, and blends in with the other family weekends.',
    b: 'Sticky. First campfire and first night in a tent tend to stay.',
  },
]

type Scenario = {
  title: string
  body: string
  pick: 'Book the cabin' | 'Go camping'
}

const SCENARIOS: Scenario[] = [
  {
    title: 'One weekend a year, a toddler, and a grandparent coming along.',
    body: 'Book the cabin. Once a year does not amortize $400 of gear, and a bathroom down the hall matters far more with a toddler and an older adult in the group. The cabin is not the soft option here, it is the correct one.',
    pick: 'Book the cabin',
  },
  {
    title: 'You want four or more outdoor weekends a year with kids aged 5 to 12.',
    body: 'Go camping. This is where the math flips hard. The gear pays for itself somewhere around night five or six, and after that you are comparing a $40 site fee to a $200 cabin for the same Saturday. The kids are also right in the age band where a campfire beats a TV.',
    pick: 'Go camping',
  },
  {
    title: 'You want to camp but nobody in the house has ever slept in a tent.',
    body: 'Go camping, but shrink the first one. Run a backyard night or a single developed-campground night before booking a full weekend. That is the whole point of the structured plans: get the first night right, cheaply, then scale up.',
    pick: 'Go camping',
  },
]

const RELATED = [
  {
    title: 'Family Camping for Beginners',
    href: '/guides/family-camping-for-beginners',
    blurb: 'What changes when the group includes kids, and how to plan around it.',
  },
  {
    title: 'Family Camping on a Budget',
    href: '/guides/family-camping-on-a-budget',
    blurb: 'Where the money actually goes, and which corners are safe to cut.',
  },
  {
    title: 'Family Camping Gear List',
    href: '/guides/family-camping-gear-list',
    blurb: 'The starter kit that gets amortized in this comparison, item by item.',
  },
  {
    title: 'Trailstead Guide vs Winging It',
    href: '/compare/trailstead-guide-vs-winging-it',
    blurb: 'Once you have picked camping, do you need a plan at all? The honest answer.',
  },
]

const FAQS = [
  {
    q: 'Is family camping actually cheaper than renting a cabin?',
    a: 'Not on night one. A cabin runs about $150-$250 a night with nothing to buy, while camping means a $25-$60 site fee plus roughly $400 of starter gear. The gear is a one-time cost that lasts years, so camping pulls ahead somewhere around the fifth or sixth night. Under that, the cabin is genuinely competitive.',
  },
  {
    q: 'How much gear do we need for a first family camping trip?',
    a: 'A tent, a sleeping bag and pad per person, headlamps, a two-burner stove with fuel, a cooler, and a basic first-aid kit. For a family of four that lands near $400 at beginner-grade quality, and every piece carries to the next trip.',
  },
  {
    q: 'What if it rains on our camping weekend?',
    a: 'This is the honest advantage of a cabin: rain is a non-event indoors. Camping in rain is workable with a tarp over the picnic table, a dry-clothes bag per person, and a tent that has been seam-checked, but it takes preparation a cabin does not require. If the forecast is bad on your first trip, moving the date is a legitimate answer.',
  },
  {
    q: 'Do kids prefer camping or a cabin?',
    a: 'Kids usually enjoy both in the moment and remember camping longer. Cabins are comfortable, and comfortable weekends tend to blur together. Fire, dark, and sleeping in a tent are novel enough to stick. That is a real difference, but it is not worth forcing on a first trip that is set up to fail.',
  },
]

export default function Page() {
  const breadcrumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: 'Family Camping vs Cabin Rental', url: `${SITE_URL}${SLUG}` },
  ]

  return (
    <main>
      <JsonLd
        data={articleGraph({
          slug: SLUG,
          title: TITLE,
          description: DESCRIPTION,
          articleSection: 'Comparisons',
          keywords: [
            'family camping vs cabin rental',
            'is camping cheaper than a cabin',
            'family camping cost',
            'cabin rental vs tent camping',
          ],
          breadcrumbs,
        })}
      />
      <JsonLd data={faqPageGraph(FAQS)} />
      <Breadcrumbs items={breadcrumbs} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Honest comparison
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          {H1}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          A cabin is $200 a night and asks almost nothing of you. Camping is a $40 site fee on
          top of gear you buy once. Here is the honest accounting, including the weekends where
          the cabin is simply the better answer.
        </p>
      </header>

      {/* ── Quick Answer ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-10">
        <QuickAnswer
          tldr="Camping under four nights a year? Rent the cabin. Four or more, buy the gear once and the math flips."
          summary={
            <>
              <strong>Cabins</strong> win on everything that happens before and during the trip:
              no prep, a real bed, indoor plumbing, a hot shower, and a rainy weekend that is
              just a rainy weekend. <strong>Camping</strong> wins on cost per night once roughly
              $400 of gear amortizes, on how much of the outdoors your kids actually touch, and
              on which weekend they still describe three years later. The deciding number is
              frequency. One trip a year, book the cabin without guilt. Four or more, camping is
              cheaper by night six and stays cheaper.
            </>
          }
        />
      </section>

      {/* ── Decision matrix ──────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-8 pb-20">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight leading-tight mb-6">
          Side by side
        </h2>
        <div className="overflow-x-auto rounded-2xl ring-1 ring-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left font-medium text-stone-500 px-5 py-4 w-44">&nbsp;</th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">Cabin rental</th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">Family camping</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((r) => (
                <tr key={r.axis}>
                  <td className="px-5 py-4 font-medium text-stone-500">{r.axis}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.a}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-stone-500 leading-relaxed">
          Cost ranges assume a family of four, a developed campground in a US state park, and
          beginner-grade gear bought new. Cabin pricing varies widely by region and season.
        </p>
      </section>

      {/* ── When the cabin is right ──────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          When a cabin rental is the right call
        </h2>

        <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
          <p>
            <strong>You are doing this once or twice a year.</strong> Gear only gets cheap by
            being used. At one weekend a year, a $400 kit is $400 a weekend for the first several
            years, and it spends the rest of the time taking up garage space. A cabin at $200 a
            night is the honest winner at that frequency, and there is nothing lesser about it.
          </p>
          <p>
            <strong>Someone in the group needs indoor plumbing.</strong> A toddler in the middle
            of potty training, a grandparent with mobility limits, a pregnancy, a medical device
            that needs an outlet. A bathhouse 200 yards away in the dark is a real constraint,
            not a character-building exercise. Cabins solve this outright.
          </p>
          <p>
            <strong>The forecast is bad and it is your first trip.</strong> Experienced campers
            handle rain fine. A family whose first-ever night in a tent is also a thunderstorm
            often does not get a second one. Booking a cabin that weekend and camping in
            September is a smarter call than proving a point.
          </p>
        </div>
      </section>

      {/* ── When camping wins ────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          When Trailstead&rsquo;s structured approach wins
        </h2>

        <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
          <p>
            <strong>The cost curve bends the other way.</strong> A cabin costs the same $200 on
            night one and night thirty. Camping costs $440 on night one and about $40 on every
            night after that. By the sixth night the two lines cross, and every weekend past that
            is a few hundred dollars you did not spend. A $14 Trip Pack is what turns that gear
            purchase into a plan instead of a gamble.
          </p>
          <p>
            <strong>Kids get the outdoors, not a view of it.</strong> A cabin puts a wall between
            the family and the thing you drove out for. Camping is where kids build a fire, find
            out how dark dark actually is, and hear something move outside the tent. That is not
            a marketing line, it is the specific reason camping weekends survive in family memory
            and cabin weekends mostly do not.
          </p>
          <p>
            <strong>The structure removes the reason most families quit.</strong> Camping&rsquo;s
            real disadvantage is that trip one can go badly enough to end the whole idea. A plan
            that specs the sleep system, the meals, and the bedtime routine in advance takes the
            main risk off the table. It does not make camping more comfortable than a cabin. It
            makes the first night predictable enough that the amortization actually happens.
          </p>
        </div>
      </section>

      {/* ── How to pick ──────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          How to pick
        </h2>
        <div className="grid gap-4 md:gap-5">
          {SCENARIOS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl ring-1 ring-stone-200 bg-white px-6 py-5 md:px-7 md:py-6"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-2">
                {s.pick}
              </p>
              <p className="font-serif text-lg md:text-xl text-stone-950 font-semibold leading-snug mb-2">
                {s.title}
              </p>
              <p className="text-stone-700 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-stone-700 leading-relaxed text-lg">
          The short version: answer one question honestly - how many outdoor nights will this
          family realistically take in the next two years? Under six, rent. Over six, buy the
          gear once and let it pay for itself.
        </p>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-10">
          Frequently asked
        </h2>
        <div className="space-y-8">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="font-serif text-xl font-semibold text-stone-900 tracking-tight mb-2">
                {f.q}
              </h3>
              <p className="text-stone-700 leading-relaxed text-lg">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTAs ─────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
          Leaning toward camping? Start here.
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Six questions about your group, comfort level, and how far you want to drive.
          You&rsquo;ll land on the right plan, with gear and meals scaled to your actual party
          size, so the $400 goes on the right things.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-base"
          >
            Take the quiz
          </Link>
          <Link
            href="/plans/easy-family-basecamp"
            className="inline-flex items-center justify-center rounded-md font-medium ring-1 ring-stone-300 text-stone-900 hover:bg-stone-50 transition-colors px-6 py-3 text-base"
          >
            See the Easy Family Basecamp plan
          </Link>
        </div>
      </section>

      {/* ── Related guides ───────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-32 border-t border-stone-200 pt-16">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
          Keep reading
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          Related guides
        </h2>
        <ul className="space-y-5">
          {RELATED.map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="group block">
                <p className="font-serif text-xl font-semibold text-stone-950 group-hover:text-stone-700">
                  {g.title}
                </p>
                <p className="text-stone-600 leading-relaxed">{g.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
