import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import QuickAnswer from '@/components/guide/QuickAnswer'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/trailstead-guide-vs-winging-it'
const TITLE = 'Trailstead Guide vs Winging It - First-Trip Reality'
const DESCRIPTION =
  'Trailstead Guide vs winging it: what a structured first-trip plan actually buys you, and when figuring it out yourself is genuinely the better call.'
const H1 = 'Trailstead Guide vs winging it: do you actually need a plan?'

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
    axis: 'Upfront cost',
    a: '$0 for the approach. Gear gets bought reactively, usually at full price and often twice.',
    b: '$0 for the plan itself. $14 if you want the printable Trip Pack.',
  },
  {
    axis: 'Prep time',
    a: 'Nothing up front, then several scattered hours the week of the trip.',
    b: 'About 20 minutes: quiz, plan, packing checklist, done.',
  },
  {
    axis: 'Comfort on night one',
    a: 'A coin flip. Cold sleepers, no pad under the bag, and forgotten fuel are the norm.',
    b: 'Predictable. The sleep system, layers, and light are specced before you pack.',
  },
  {
    axis: 'Kid experience',
    a: 'Rides on how calmly the adults handle the surprises.',
    b: 'Structured. Activities and a bedtime routine sit on the timeline already.',
  },
  {
    axis: 'Weather resilience',
    a: 'You find out what you forgot at 9pm in the rain.',
    b: 'Rain, heat, and cold contingencies are written into the plan.',
  },
  {
    axis: 'Spontaneity',
    a: 'Total. Decide Friday afternoon, leave Friday evening.',
    b: 'High. The plan takes minutes, but you are following a timeline.',
  },
  {
    axis: 'Gear owned after',
    a: 'Whatever you panic-bought. Often duplicated, wrong size, or wrong season.',
    b: 'A deliberate starter kit sized to your group that carries the next four trips.',
  },
  {
    axis: 'First-trip risk',
    a: 'Highest. Most "we tried camping once" stories start here.',
    b: 'Low. The common failure points are solved before you leave the driveway.',
  },
  {
    axis: 'Memorability',
    a: 'Memorable either way. Not always for the reasons you wanted.',
    b: 'Memorable for the trip rather than the meltdown.',
  },
  {
    axis: 'Best for',
    a: 'Experienced campers, one-nighters close to home, borrowed and proven gear.',
    b: 'First-timers, families with kids under ten, anyone driving more than an hour out.',
  },
]

type Scenario = {
  title: string
  body: string
  pick: 'Wing it' | 'Use the plan'
}

const SCENARIOS: Scenario[] = [
  {
    title: 'You camped growing up and a friend is lending you a full kit.',
    body: 'Wing it. You already carry the checklist in your head, the gear is proven, and a night close to home has a low ceiling on how wrong it can go. Read the packing list if you want a sanity check, then go.',
    pick: 'Wing it',
  },
  {
    title: 'You have never slept in a tent and you have two kids under eight.',
    body: 'Use the plan. This is the exact case the structure exists for. The failure modes are predictable - cold kids, no dinner backup, a 10pm bedtime that never happens - and every one of them is cheaper to solve on a checklist than at the campsite.',
    pick: 'Use the plan',
  },
  {
    title: 'You are driving two hours to a booked site for a full weekend.',
    body: 'Use the plan. Distance and duration are what turn a small oversight into a trip-ender. Forgetting the stove fuel 15 minutes from home is an errand. Forgetting it two hours out on a Saturday is cold cereal for three meals.',
    pick: 'Use the plan',
  },
]

const RELATED = [
  {
    title: 'Camping for Beginners',
    href: '/guides/camping-for-beginners',
    blurb: 'The shortest path from zero to a confident first trip.',
  },
  {
    title: 'First-Time Camping Mistakes',
    href: '/guides/first-time-camping-mistakes',
    blurb: 'The avoidable ones that turn a first trip into never again.',
  },
  {
    title: 'How to Plan a Camping Trip',
    href: '/guides/how-to-plan-a-camping-trip',
    blurb: 'What actually has to be decided, in the order it has to be decided.',
  },
  {
    title: 'Backyard Test vs First Night Camp',
    href: '/compare/backyard-test-vs-first-night-camp',
    blurb: 'Rehearse in the yard or commit to the campsite? Pick your starting point.',
  },
]

const FAQS = [
  {
    q: 'Do I really need a camping plan for one night?',
    a: 'Not always. If you have camped before, the gear is proven, and the site is under an hour from home, winging one night is a reasonable call. The plan earns its keep when at least two of those are missing - first-timers, unproven gear, kids, or a long drive.',
  },
  {
    q: 'Does winging it actually cost less?',
    a: 'Rarely, over a full first season. The plan is free and the Trip Pack is $14, while unplanned camping tends to produce panic purchases at a camp store, duplicate gear, and a sleeping bag rated for the wrong season. The structured route mostly moves that spending earlier and makes it deliberate.',
  },
  {
    q: 'Will a plan make the trip feel scripted?',
    a: 'The timeline covers arrival, dinner, and bedtime because those are the parts that go sideways. The middle of the day is deliberately open. Most families use the plan for the first two trips, then stop needing it.',
  },
  {
    q: 'What is the single biggest difference between the two?',
    a: 'The first night. Winging it means discovering your gaps in the dark with tired kids. A plan means the gaps were found on a checklist at your kitchen table, where fixing them costs a trip to the store instead of a ruined trip.',
  },
]

export default function Page() {
  const breadcrumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: 'Trailstead Guide vs Winging It', url: `${SITE_URL}${SLUG}` },
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
            'camping plan vs winging it',
            'is a camping plan worth it',
            'first camping trip planning',
            'beginner camping preparation',
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
          Plenty of people camp for the first time with nothing but a borrowed tent and a full
          tank of gas, and it goes fine. Here&rsquo;s the honest version of what you give up,
          what you gain, and when Trailstead is genuinely the wrong tool.
        </p>
      </header>

      {/* ── Quick Answer ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-10">
        <QuickAnswer
          tldr="Winging it saves prep. A plan saves the first night. If you have kids, unproven gear, or a long drive, take the plan."
          summary={
            <>
              <strong>Winging it</strong> costs nothing up front and keeps the trip spontaneous,
              and for an experienced camper doing one night close to home, that is the right
              call. <strong>Trailstead</strong> is a shortcut, not a requirement: about 20
              minutes of structure that pre-solves the things that actually ruin first trips -
              cold sleepers, missing fuel, no dinner backup, a bedtime that never happens. The
              honest test is distance and inexperience. Under an hour with proven gear, wing it.
              First tent, small kids, or a two-hour drive, use the plan.
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
                <th className="text-left font-medium text-stone-900 px-5 py-4">Winging it</th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">
                  Trailstead Guide plan
                </th>
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
      </section>

      {/* ── When winging it is right ─────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          When winging it is the right call
        </h2>

        <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
          <p>
            <strong>You have camped before and the gear is proven.</strong> If you grew up doing
            this, or you have a kit that has already survived a season, the checklist lives in
            your head. Reading a plan tells you things you already know, and the 20 minutes is
            better spent on the drive. Go.
          </p>
          <p>
            <strong>The trip is short and close.</strong> One night, under an hour from home, at
            a developed campground with a camp store. The worst realistic outcome is an annoying
            errand or an early drive home. That is a cheap way to learn what you are missing, and
            some people genuinely learn better that way.
          </p>
          <p>
            <strong>Spontaneity is the entire point.</strong> Some of the best trips start at 3pm
            on a Friday with no reservation. A plan is a poor fit for that, and pretending
            otherwise would be dishonest. If the appeal is that nobody decided anything in
            advance, planning it removes the thing you came for.
          </p>
        </div>
      </section>

      {/* ── When the plan wins ───────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          When Trailstead&rsquo;s structured approach wins
        </h2>

        <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
          <p>
            <strong>Kids raise the cost of every mistake.</strong> An adult who is cold at 2am is
            uncomfortable. A seven-year-old who is cold at 2am ends the trip and, often, the
            family&rsquo;s interest in camping. The plan front-loads the sleep system, the layers,
            and the bedtime routine because those three things decide how the first night goes.
          </p>
          <p>
            <strong>Distance turns oversights into trip-enders.</strong> Forgetting stove fuel is
            a 15-minute errand near home and a weekend of cold cereal two hours out. A packing
            list checked at your kitchen table is the cheapest possible place to find a gap. That
            is most of what the structure is doing.
          </p>
          <p>
            <strong>It makes the gear spend deliberate instead of reactive.</strong> Unplanned
            first trips tend to produce a camp-store sleeping bag rated for the wrong season and a
            second lantern you did not need. The plan sizes a starter kit to your actual group up
            front, so the money buys gear that carries the next four trips rather than patching
            this one.
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
          The short version: count how many of these are true - first time in a tent, kids under
          ten, unproven gear, more than an hour of driving, more than one night. One or fewer,
          wing it. Two or more, take the 20 minutes.
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
          Take the 20-minute shortcut.
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Six questions about your group, comfort level, and how far you want to drive.
          You&rsquo;ll land on the right plan, with party-size-scaled gear and meals. Free, and
          you can ignore any part of it.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-base"
          >
            Take the quiz
          </Link>
          <Link
            href="/plans"
            className="inline-flex items-center justify-center rounded-md font-medium ring-1 ring-stone-300 text-stone-900 hover:bg-stone-50 transition-colors px-6 py-3 text-base"
          >
            See our plans
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
