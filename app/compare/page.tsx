import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import QuickAnswer from '@/components/guide/QuickAnswer'
import { collectionPageGraph, pageMetadata, SITE_URL } from '@/lib/seo'

const SLUG = '/compare'
const TITLE = 'Camping Gear & Plan Comparisons'
const DESCRIPTION =
  'Calm, beginner-grade comparisons. Tent, cooler, stove, sleeping system, and plan picks for first-trip families. Pick a category, get the short list.'

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: SLUG,
})

type CompareCard = {
  href: string
  eyebrow: 'Gear' | 'Plan'
  title: string
  blurb: string
}

const PRODUCT_COMPARES: CompareCard[] = [
  {
    href: '/compare/best-beginner-tent',
    eyebrow: 'Gear',
    title: 'Best beginner tent',
    blurb: 'Three picks across capacity and price - a 4-person dome, a stand-up size-up, and a sturdier upgrade. The right first tent in 60 seconds.',
  },
  {
    href: '/compare/best-beginner-cooler',
    eyebrow: 'Gear',
    title: 'Best beginner cooler',
    blurb: 'Compact classic, full-size rolling, and a premium upgrade path. How long ice actually lasts and which size matches the trip.',
  },
  {
    href: '/compare/best-beginner-stove',
    eyebrow: 'Gear',
    title: 'Best beginner stove',
    blurb: 'Single-burner, two-burner propane, and a premium two-burner. BTU, fuel, cleanup, and which one cooks real meals vs boils water.',
  },
  {
    href: '/compare/best-beginner-sleeping-system',
    eyebrow: 'Gear',
    title: 'Best beginner sleeping system',
    blurb: 'Bag plus pad, three tiers. Budget, comfort, and a cold-weather upgrade. Temp rating, weight, and what to pair for a warm night.',
  },
  {
    href: '/compare/coleman-sundome-3p-vs-4p-vs-6p',
    eyebrow: 'Gear',
    title: 'Coleman Sundome 3P vs 4P vs 6P',
    blurb: 'Same tent family, three sizes. Floor size, standing height, and how each one fits a queen air bed.',
  },
  {
    href: '/compare/6-person-vs-8-person-family-tent',
    eyebrow: 'Gear',
    title: '6-person vs 8-person family tent',
    blurb: 'The sizing rule that decides it for most families, plus floor size, height, and setup time side by side.',
  },
  {
    href: '/compare/dome-tent-vs-cabin-tent',
    eyebrow: 'Gear',
    title: 'Dome tent vs cabin tent',
    blurb: 'Two shapes, different tradeoffs. Wind resistance versus standing headroom, and which wins for families.',
  },
  {
    href: '/compare/camp-chef-everest-vs-coleman-classic-1-burner',
    eyebrow: 'Gear',
    title: 'Camp Chef Everest vs Coleman 1-burner',
    blurb: 'Premium two-burner versus the basic one-burner. When BTU and footprint actually matter - and when they don’t.',
  },
  {
    href: '/compare/rolling-cooler-vs-steel-belted-cooler',
    eyebrow: 'Gear',
    title: 'Rolling cooler vs steel-belted',
    blurb: 'Wheels and capacity versus ice retention and toughness. Two coolers, one decision.',
  },
  {
    href: '/compare/sleeping-bag-vs-cot-airbed-combo',
    eyebrow: 'Gear',
    title: 'Sleeping bag setup vs cot + airbed combo',
    blurb: 'Floor sleep system versus an off-the-ground combo. Comfort, weight, packing, and which one survives kids.',
  },
]

const PLAN_COMPARES: CompareCard[] = [
  {
    href: '/compare/backyard-test-vs-first-night-camp',
    eyebrow: 'Plan',
    title: 'Backyard Test vs First Night Camp',
    blurb: 'Rehearsal in the yard or commit to the campsite? How to pick the right starting point for your first trip.',
  },
  {
    href: '/compare/easy-family-basecamp-vs-first-weekend-camp',
    eyebrow: 'Plan',
    title: 'Easy Family Basecamp vs First Weekend Camp',
    blurb: 'Three nights of comfort or two nights of momentum. Which weekend plan fits your group.',
  },
]

const ALL_COMPARES = [...PRODUCT_COMPARES, ...PLAN_COMPARES]

export default function Page() {
  return (
    <main>
      <JsonLd
        data={collectionPageGraph({
          slug: SLUG,
          title: TITLE,
          description: DESCRIPTION,
          items: ALL_COMPARES.map((c) => ({
            name: c.title,
            url: `${SITE_URL}${c.href}`,
          })),
        })}
      />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Compare', url: `${SITE_URL}${SLUG}` },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Compare
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          Comparisons for first-trip families
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Beginner-grade picks, side by side. No spec sheets, no gear-snob noise - just the
          three options that actually matter for your first trip, and how to pick.
        </p>
      </header>

      {/* ── Quick Answer ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-12">
        <QuickAnswer
          tldr="Comparing options? Here’s the calm shortcut. Pick a category to see Trailstead’s beginner-grade picks side by side."
          summary={
            <>
              Each comparison shows three picks, one decision matrix, and a short
              &ldquo;what changes in practice&rdquo; section. We map products to the four
              Trailstead plans so you can see which gear actually fits your trip - and we
              flag tiers we don&rsquo;t have a link for yet rather than guessing. If
              you&rsquo;re still unsure, the 60-second quiz lands you on the right plan
              first, then the gear follows.
            </>
          }
        />
      </section>

      {/* ── Product comparisons ─────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-8 pb-12">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight leading-tight mb-6">
          Gear comparisons
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {PRODUCT_COMPARES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group block rounded-2xl ring-1 ring-stone-200 hover:ring-stone-300 bg-cream/70 hover:bg-cream transition px-6 py-6 md:px-7 md:py-7"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-3">
                {c.eyebrow}
              </p>
              <p className="font-serif text-xl md:text-2xl font-semibold text-stone-950 group-hover:text-stone-700 mb-2 leading-snug">
                {c.title}
              </p>
              <p className="text-stone-600 leading-relaxed text-[15px]">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Plan comparisons ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-8 pb-20">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight leading-tight mb-6">
          Plan comparisons
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {PLAN_COMPARES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group block rounded-2xl ring-1 ring-stone-200 hover:ring-stone-300 bg-cream/70 hover:bg-cream transition px-6 py-6 md:px-7 md:py-7"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-3">
                {c.eyebrow}
              </p>
              <p className="font-serif text-xl md:text-2xl font-semibold text-stone-950 group-hover:text-stone-700 mb-2 leading-snug">
                {c.title}
              </p>
              <p className="text-stone-600 leading-relaxed text-[15px]">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTAs ─────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-32 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
          Not sure where to start?
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Take the 60-second quiz. Six questions about your group, comfort level, and how far
          you want to drive. You&rsquo;ll land on the right plan, with party-size-scaled gear.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-base"
          >
            Take the 60-second quiz
          </Link>
          <Link
            href="/gear"
            className="inline-flex items-center justify-center rounded-md font-medium ring-1 ring-stone-300 text-stone-900 hover:bg-stone-50 transition-colors px-6 py-3 text-base"
          >
            See the full gear guide
          </Link>
        </div>
      </section>
    </main>
  )
}
