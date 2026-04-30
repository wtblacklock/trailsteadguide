import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import QuickAnswer from '@/components/guide/QuickAnswer'
import { getPlanTemplate } from '@/lib/plan-templates'
import { pageMetadata, articleGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/easy-family-basecamp-vs-first-weekend-camp'
const TITLE = 'Easy Family Basecamp vs First Weekend Camp — Comparison'
const DESCRIPTION =
  'Easy Family Basecamp vs First Weekend Camp: pick the right multi-night plan. Compare comfort, ambition, gear, hike day, and which fits your family.'
const H1 = 'Easy Family Basecamp vs First Weekend Camp: which plan fits your first trip?'

const A_SLUG = 'easy-family-basecamp'
const B_SLUG = 'first-weekend-camp'

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
    a: 'Three nights, slow pace',
    b: 'Two nights, Friday to Sunday',
  },
  {
    axis: 'Difficulty',
    a: 'Lowest possible for multi-night — comfort-first',
    b: 'Moderate — real weekend with a day-hike centerpiece',
  },
  {
    axis: 'Daytime activity',
    a: 'Slow walks, card games, camp art',
    b: 'Day hike or lake/river day, age-scaled mileage',
  },
  {
    axis: 'Gear floor',
    a: 'Cabin tent, queen air mattress, canopy, real pillows',
    b: '6-person tent, self-inflating pads, canopy optional',
  },
  {
    axis: 'Site type',
    a: 'Premium site with electrical hookup, shaded',
    b: 'Standard developed site — flat pad, fire ring',
  },
  {
    axis: 'Group fit',
    a: 'Families with young kids, comfort-conscious adults',
    b: 'Families with kids 5+ ready for an active weekend',
  },
  {
    axis: 'First-trip risk',
    a: 'Lowest — comfort base means few surprises',
    b: 'Moderate — weather and hike pace are real variables',
  },
  {
    axis: 'Cost',
    a: 'Higher — premium site, more gear',
    b: 'Mid — standard site, lighter kit',
  },
  {
    axis: 'Best for',
    a: 'Making camping a thing your family wants to repeat',
    b: 'Earning the “we did a real weekend” story',
  },
]

type Scenario = {
  title: string
  body: string
  pick: 'A' | 'B'
}

const SCENARIOS: Scenario[] = [
  {
    title: 'Your kids are under 6 and you want to actually relax.',
    body: 'Easy Family Basecamp. The air mattress, canopy shade, and unstructured slow days are designed for families where you spend energy on the kids, not on the trip mechanics.',
    pick: 'A',
  },
  {
    title: 'Your kids are 7+ and ask “when are we hiking?”',
    body: 'First Weekend Camp. The Saturday day-hike or lake day is the centerpiece — exactly the energy outlet older kids need, with a fire-cooked dinner waiting back at camp.',
    pick: 'B',
  },
  {
    title: 'You camped before, but never with the family for multiple nights.',
    body: 'First Weekend Camp. Two nights is enough to feel like a trip without committing to a third. The Friday-to-Sunday rhythm matches a normal weekend.',
    pick: 'B',
  },
  {
    title: 'One adult is camping-curious, the other is camping-skeptical.',
    body: 'Easy Family Basecamp. Comfort infrastructure (real pillows, electrical hookup, camp chairs, lighting) is the difference between “never again” and “when do we go back?” for the skeptic.',
    pick: 'A',
  },
  {
    title: 'You want a Saturday centerpiece with a real meal you cooked outside.',
    body: 'First Weekend Camp. Day hike, Dutch-oven dinner, longer campfire — the plan is built around making Saturday the memory the family keeps.',
    pick: 'B',
  },
]

const RELATED = [
  {
    title: 'Camping With Kids for the First Time',
    href: '/guides/camping-with-kids-first-time',
    blurb: 'What actually keeps kids happy at camp.',
  },
  {
    title: 'Weekend Camping Packing List',
    href: '/guides/weekend-camping-packing-list',
    blurb: 'Two-night family pack list, by category.',
  },
  {
    title: 'How to Plan a Camping Trip',
    href: '/guides/how-to-plan-a-camping-trip',
    blurb: 'Step-by-step: pick a site, book it, prep the gear.',
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
            { name: 'Easy Family Basecamp vs First Weekend Camp', url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Plans', url: `${SITE_URL}/plans` },
          { name: 'Easy Family Basecamp vs First Weekend Camp', url: `${SITE_URL}${SLUG}` },
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
          Both plans get a family multiple nights in. The difference is whether the trip is built
          around comfort and slow days, or a Saturday centerpiece with a real day-hike.
          Here&rsquo;s how to pick.
        </p>
      </header>

      {/* ── Quick Answer ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-10">
        <QuickAnswer
          tldr="Comfort-first with young kids? Pick Basecamp. Want a Saturday hike day? Pick First Weekend."
          summary={
            <>
              If you have young kids, a camping-skeptical adult in the group, or you just want
              the trip to feel like a slow weekend at home with a fire pit, pick{' '}
              <strong>Easy Family Basecamp</strong> — three nights, premium site, comfort
              infrastructure. If your kids are 7+ and want a real day-hike or lake day as the
              Saturday centerpiece, pick <strong>First Weekend Camp</strong> — two nights, lighter
              kit, more ambition. Both feed into the same quiz, and you can switch later.
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
            <strong>Easy Family Basecamp is built around the camp itself.</strong> A queen air
            mattress, canopy, real lighting, and chairs in a circle turn the site into a
            destination. The day plan is intentionally loose — slow walks, card games, kids
            exploring a defined radius. Nothing strenuous required, and that&rsquo;s the point.
          </p>
          <p>
            <strong>First Weekend Camp is built around Saturday.</strong> Friday is a quiet
            arrival, Sunday is a clean pack-out — but Saturday holds a 2 to 5 mile age-scaled day
            hike (or lake/river day), a real fire-cooked dinner, and a longer campfire. The plan
            assumes you came to do something specific outside, not just to be outside.
          </p>
          <p>
            <strong>The gear floors diverge meaningfully.</strong> Basecamp expects an electrical
            hookup, queen air mattress and pump, real pillows from home, and a 6-person cabin
            tent — comfort gear that takes trunk space and adds cost. First Weekend Camp runs
            lighter: a 6-person tent, self-inflating pads, canopy as optional, and a Dutch oven
            if you want to lean into Saturday&rsquo;s dinner.
          </p>
          <p>
            <strong>The risk profiles flip on what can go wrong.</strong> Basecamp&rsquo;s risk
            is boredom — three nights with no centerpiece can feel long for kids over 7. First
            Weekend&rsquo;s risk is over-ambition — a hike too far on a day too hot can become
            the whole memory. Pick the one whose failure mode is the one your family handles
            best.
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
          Six questions about your group, comfort level, and how far you want to drive.
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
