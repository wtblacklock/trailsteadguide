import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import QuickAnswer from '@/components/guide/QuickAnswer'
import { getPlanTemplate } from '@/lib/plan-templates'
import { pageMetadata, articleGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/backyard-test-vs-first-night-camp'
const TITLE = 'Backyard Test vs First Night Camp — First-Trip Comparison'
const DESCRIPTION =
  'Backyard Test vs First Night Camp: which plan fits your first trip? Compare gear, duration, and risk. Pick the right starting point in 60 seconds.'
const H1 = 'Backyard Test vs First Night Camp: which plan fits your first trip?'

const A_SLUG = 'backyard-test'
const B_SLUG = 'first-night-camp'

const planA = getPlanTemplate(A_SLUG)!
const planB = getPlanTemplate(B_SLUG)!

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
    axis: 'Duration',
    a: 'One night, ~14 hours',
    b: 'One night, full overnight at a campsite',
  },
  {
    axis: 'Difficulty',
    a: 'Lowest possible — house is 50 feet away',
    b: 'Real first trip — committed to the site',
  },
  {
    axis: 'Booking required',
    a: 'None',
    b: 'Yes — developed campsite, week ahead',
  },
  {
    axis: 'Gear floor',
    a: 'Tent, sleeping bags, pads, headlamps',
    b: 'Add: stove + fuel, cooler, full kit',
  },
  {
    axis: 'Group fit',
    a: 'Anyone unsure if the kids will sleep outside',
    b: 'Family ready to commit one night',
  },
  {
    axis: 'First-trip risk',
    a: 'Near zero — bail to the house anytime',
    b: 'Manageable — bring a backup plan',
  },
  {
    axis: 'Cost',
    a: '$0 — uses your yard',
    b: '$25–$60 site fee + fuel + food',
  },
  {
    axis: 'Best for',
    a: 'Stress-testing gear and kid sleep before committing',
    b: 'Making the leap once gear and people are proven',
  },
]

type Scenario = {
  title: string
  body: string
  pick: 'A' | 'B'
}

const SCENARIOS: Scenario[] = [
  {
    title: 'You have never slept outside as a family.',
    body: 'Run the Backyard Test first. The risk of a midnight bail-out is real, and proving the kids can sleep through one night before you drive 90 minutes is worth the rehearsal.',
    pick: 'A',
  },
  {
    title: 'Your gear has been sitting in the garage for three years.',
    body: 'Backyard Test. You will discover the missing tent stakes, dead headlamp batteries, and broken zipper somewhere with a hardware store and a real bed nearby.',
    pick: 'A',
  },
  {
    title: 'You camped as a kid and the family is excited.',
    body: 'Skip to First Night Camp. You already trust the basics. A short, developed-campground trip is the right shape — proven structure, low risk, real reward.',
    pick: 'B',
  },
  {
    title: 'You have a free Saturday and a borrowed tent.',
    body: 'Backyard Test. You can borrow gear, run the rehearsal, and know within 14 hours whether to book a campsite for next weekend or rethink the kit.',
    pick: 'A',
  },
  {
    title: 'You already did a backyard night and it went fine.',
    body: 'First Night Camp. The Backyard Test job is done. Book a state-park site, follow the plan, and let the family experience their first real campground evening.',
    pick: 'B',
  },
]

const RELATED = [
  {
    title: 'Camping for Beginners',
    href: '/guides/camping-for-beginners',
    blurb: 'The shortest path from zero to a confident first trip.',
  },
  {
    title: 'First Night Camping Guide',
    href: '/guides/first-night-camping-guide',
    blurb: 'A low-stakes test for your very first overnight — what success actually looks like.',
  },
  {
    title: 'First-Time Camping Mistakes',
    href: '/guides/first-time-camping-mistakes',
    blurb: 'The avoidable ones that turn a first trip into never again.',
  },
]

export default function Page() {
  return (
    <main>
      <JsonLd
        data={articleGraph({
          slug: SLUG,
          title: TITLE,
          description: DESCRIPTION,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Plans', url: `${SITE_URL}/plans` },
            { name: 'Backyard Test vs First Night Camp', url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Plans', url: `${SITE_URL}/plans` },
          { name: 'Backyard Test vs First Night Camp', url: `${SITE_URL}${SLUG}` },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Plan comparison
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          {H1}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Both plans get a family outside for the first time. The difference is whether you stay
          50 feet from the back door or 50 miles from it. Here&rsquo;s how to pick.
        </p>
      </header>

      {/* ── Quick Answer ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-10">
        <QuickAnswer
          tldr="Unsure your kit or your kids will hold? Run the Backyard Test. Already past that? Book the First Night."
          summary={
            <>
              If you&rsquo;ve never slept outside as a family or your gear hasn&rsquo;t left the
              garage in years, pick <strong>Backyard Test</strong> — it&rsquo;s a $0, one-night
              rehearsal with the house as your safety net. If you&rsquo;ve already done a backyard
              night, or you grew up camping and just need a clean plan, pick{' '}
              <strong>First Night Camp</strong> — one developed-campground night, full timeline,
              real reward. Both feed into the same quiz, and you can switch later.
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
                <th className="text-left font-medium text-stone-900 px-5 py-4">{planA.title}</th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">{planB.title}</th>
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

      {/* ── What's different in practice ────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          What&rsquo;s different in practice
        </h2>

        <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
          <p>
            <strong>The Backyard Test takes about 4 hours of active time.</strong> You set up at
            5pm, eat outside, sleep in the tent, and pack up before breakfast. The First Night
            takes a weekend — Friday afternoon to mid-morning Sunday — because you have to drive,
            arrive, set up, settle the kids, sleep, and break camp without rushing.
          </p>
          <p>
            <strong>The gear floor is different.</strong> Backyard Test runs on a tent, sleeping
            bags, pads, and headlamps — the stove is optional because the kitchen is right there.
            First Night Camp adds a 2-burner stove, fuel, cooler, and a real first-aid kit. If you
            don&rsquo;t own those yet, the Backyard Test is a $0 way to find out you need them.
          </p>
          <p>
            <strong>The risk profile changes the conversation.</strong> When the back door is 50
            feet away, &ldquo;I&rsquo;m cold&rdquo; or &ldquo;I want to come in&rdquo; ends the
            night without ending the trip. At a campsite, you&rsquo;re committed — that&rsquo;s
            the point, but it&rsquo;s also why a successful backyard night first makes the
            campsite feel like a reward, not a gamble.
          </p>
          <p>
            <strong>They&rsquo;re sequenced, not competing.</strong> Most families benefit from
            Backyard Test → First Night Camp in that order, sometimes a week or two apart. If
            you&rsquo;re already confident in the gear and the kids, skip ahead. If you&rsquo;re
            not, the rehearsal pays for itself the first time the tent has a snapped pole.
          </p>
        </div>
      </section>

      {/* ── Common scenarios ─────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          Common scenarios
        </h2>
        <div className="grid gap-4 md:gap-5">
          {SCENARIOS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl ring-1 ring-stone-200 bg-white px-6 py-5 md:px-7 md:py-6"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-2">
                Pick {s.pick === 'A' ? planA.title : planB.title}
              </p>
              <p className="font-serif text-lg md:text-xl text-stone-950 font-semibold leading-snug mb-2">
                {s.title}
              </p>
              <p className="text-stone-700 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTAs ─────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
          Not sure? Take the 60-second quiz.
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Five questions about your group, comfort level, and how far you want to drive.
          You&rsquo;ll land on the right plan, with party-size-scaled gear and meals.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-base"
        >
          Take the 60-second quiz
        </Link>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Link
            href={`/plans/${A_SLUG}`}
            className="block rounded-2xl ring-1 ring-stone-200 hover:ring-stone-300 bg-stone-50 hover:bg-stone-100 transition px-6 py-5"
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-2">
              Get the plan
            </p>
            <p className="font-serif text-xl font-semibold text-stone-950 mb-1">{planA.title}</p>
            <p className="text-sm text-stone-600 leading-relaxed">{planA.tagline}</p>
          </Link>
          <Link
            href={`/plans/${B_SLUG}`}
            className="block rounded-2xl ring-1 ring-stone-200 hover:ring-stone-300 bg-stone-50 hover:bg-stone-100 transition px-6 py-5"
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-2">
              Get the plan
            </p>
            <p className="font-serif text-xl font-semibold text-stone-950 mb-1">{planB.title}</p>
            <p className="text-sm text-stone-600 leading-relaxed">{planB.tagline}</p>
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
