import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import QuickAnswer from '@/components/guide/QuickAnswer'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import { articleGraph, itemListGraph, faqPageGraph, pageMetadata, SITE_URL } from '@/lib/seo'
import type { AffiliateProduct } from '@/types'

const SLUG = '/compare/best-beginner-stove'
const TITLE = 'Best Beginner Camp Stove: 3 Picks for First Trips'
const DESCRIPTION =
  'Best beginner camp stove: single-burner, two-burner propane, and a premium two-burner. Compare BTU, fuel, ease of cleanup, and footprint.'
const H1 = 'Best beginner camp stove: 3 picks for your first family trip'

function P(id: string): AffiliateProduct {
  const p = AFFILIATE_PRODUCTS.find((x) => x.id === id)
  if (!p) throw new Error(`Missing affiliate product: ${id}`)
  return p
}

const STOVE_SINGLE = P('coleman-1-burner') // single-burner backpacking-style
const STOVE_TWO = P('coleman-triton-2-burner') // 2-burner classic
const STOVE_PREMIUM = P('stove-2-burner') // Camp Chef Everest 2X (deprecated, kept for compare)

type Pick = {
  label: string
  product: AffiliateProduct
  btu: string
  fuel: string
  cleanup: string
  footprint: string
  priceTier: string
}

const PICKS: Pick[] = [
  {
    label: 'Single-burner',
    product: STOVE_SINGLE,
    btu: '10,000 BTU',
    fuel: '1 lb propane canister',
    cleanup: 'Wipe down — one burner head',
    footprint: '~6 × 6 in',
    priceTier: '$ Budget',
  },
  {
    label: 'Two-burner classic',
    product: STOVE_TWO,
    btu: '22,000 BTU per burner',
    fuel: '1 lb propane canister or hose to 20 lb tank',
    cleanup: 'Removable grease tray, dishwasher-safe grates',
    footprint: '~22 × 14 in (open)',
    priceTier: '$$ Mid',
  },
  {
    label: 'Premium two-burner',
    product: STOVE_PREMIUM,
    btu: '40,000 BTU per burner',
    fuel: 'Hose to 20 lb tank (canister adapter optional)',
    cleanup: 'Three-sided wind screen lifts off, full tray',
    footprint: '~24 × 14 in (open)',
    priceTier: '$$$ Premium',
  },
]

const PLAN_MAP: { plan: string; href: string; pick: string; reason: string }[] = [
  {
    plan: 'Backyard Test',
    href: '/plans/backyard-test',
    pick: 'Skip — use the kitchen',
    reason: 'A yard rehearsal doesn\'t need a stove. Cook inside, eat outside, prove the rest of the system first.',
  },
  {
    plan: 'First Night Camp',
    href: '/plans/first-night-camp',
    pick: 'Coleman 1-Burner Propane Stove',
    reason: 'One night, simple meals. Boil water for coffee and oatmeal, heat one pan for dinner. The single burner is enough.',
  },
  {
    plan: 'First Weekend Camp',
    href: '/plans/first-weekend-camp',
    pick: 'Coleman Triton+ 2-Burner',
    reason: 'Two nights with a family. The two-burner cooks bacon and eggs at the same time — that\'s the difference between breakfast on time and breakfast in shifts.',
  },
  {
    plan: 'Easy Family Basecamp',
    href: '/plans/easy-family-basecamp',
    pick: 'Triton+ or Camp Chef Everest 2X',
    reason: 'Three nights of comfort. The Triton handles most meals; the Everest\'s 40,000 BTU and wind screen earn their place when shoulder-season weather rolls in.',
  },
]

const RELATED = [
  {
    title: 'Camp Chef Everest vs Coleman 1-burner',
    href: '/compare/camp-chef-everest-vs-coleman-classic-1-burner',
    blurb: 'Premium two-burner versus the basic single-burner — head-to-head with the BTU math.',
  },
  {
    title: 'Best beginner cooler',
    href: '/compare/best-beginner-cooler',
    blurb: 'Pair the stove with a cooler that holds two days of food without re-icing.',
  },
  {
    title: 'See the full gear guide',
    href: '/gear',
    blurb: 'The full beginner-grade kit — sleep, lighting, the rest.',
  },
]

const FAQS = [
  {
    q: 'Is a single-burner stove enough for a family?',
    a: 'For boiling water, reheating, and simple one-pot meals, yes. Once you want to cook two things at once — eggs and bacon, or a side while the main cooks — a two-burner setup earns its extra size and weight.',
  },
  {
    q: 'How much BTU do I actually need for camp cooking?',
    a: '10,000 BTU boils water and handles simple meals fine. 22,000 BTU per burner cooks real meals at a normal pace. 40,000 BTU per burner is overkill for most families — it mainly buys faster boil times and better wind resistance, not better food.',
  },
  {
    q: 'Is the premium two-burner stove worth the upgrade?',
    a: 'Only if you cook in windy conditions often — the three-sided wind screen is the real differentiator, not the extra BTU. For sheltered sites and calm-weather trips, the two-burner classic performs the same for less money.',
  },
  {
    q: 'What fuel do these camp stoves use?',
    a: 'All three run on propane. The single-burner uses small 1 lb canisters only. Both two-burner options can run on a 1 lb canister or hose to a 20 lb tank — the tank hose is cheaper per-meal and better for a full weekend of cooking.',
  },
]

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
})

export default function Page() {
  const breadcrumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: 'Best beginner stove', url: `${SITE_URL}${SLUG}` },
  ]

  return (
    <main>
      <JsonLd
        data={articleGraph({
          slug: SLUG,
          title: TITLE,
          description: DESCRIPTION,
          breadcrumbs,
          articleSection: 'Gear comparisons',
          keywords: ['best beginner camp stove', 'family camping stove', 'Coleman stove', 'two-burner stove'],
        })}
      />
      <JsonLd
        data={itemListGraph({
          name: 'Best beginner camp stoves',
          items: PICKS.map((p, i) => ({
            position: i + 1,
            name: p.product.name,
            url: getProductUrl(p.product),
          })),
        })}
      />
      <JsonLd data={faqPageGraph(FAQS)} />
      <Breadcrumbs items={breadcrumbs} />

      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Gear comparison
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          {H1}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          A camp stove decides whether breakfast is hot or cold. Here are three picks — single
          burner, two-burner classic, and premium two-burner — with what actually matters for a
          first family trip.
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-8 pb-12">
        <QuickAnswer
          tldr="One night, simple meals? Coleman 1-burner. Family weekend? Coleman Triton+ 2-burner. Cooking real meals in wind? Camp Chef Everest 2X."
          summary={
            <>
              The <strong>Coleman 1-Burner Propane Stove</strong> is the right call for a single
              overnight or backpacking-leaning trip — boils water fast, fits in any pack, no
              learning curve. The <strong>Coleman Triton+ 2-Burner</strong> is the family default:
              22,000 BTU per burner, wind-blocking panels, cooks bacon and eggs at the same time.
              Step up to the <strong>Camp Chef Everest 2X</strong> when you&rsquo;re cooking real
              meals in shoulder-season weather — 40,000 BTU per burner and a deeper wind screen
              change what&rsquo;s possible.
            </>
          }
        />
      </section>

      <section className="max-w-5xl mx-auto px-8 pb-20">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight leading-tight mb-6">
          Side by side
        </h2>
        <div className="overflow-x-auto rounded-2xl ring-1 ring-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left font-medium text-stone-500 px-5 py-4 w-44">&nbsp;</th>
                {PICKS.map((p) => (
                  <th key={p.product.id} className="text-left font-medium text-stone-900 px-5 py-4 align-bottom">
                    <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                      {p.label}
                    </span>
                    {p.product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">BTU</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.btu}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Fuel type</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.fuel}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Ease of cleanup</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.cleanup}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Footprint</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.footprint}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Price tier</td>
                {PICKS.map((p) => (
                  <td key={p.product.id} className="px-5 py-4 text-stone-900 tabular-nums align-top">
                    <span className="block">{p.priceTier}</span>
                    <span className="block text-xs text-stone-500">{p.product.priceRange}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-stone-500">
          Prices approximate and subject to change on Amazon. As an Amazon Associate we earn from
          qualifying purchases.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          What&rsquo;s different in practice
        </h2>
        <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
          <p>
            <strong>BTU isn&rsquo;t the headline number — wind is.</strong> A 22,000 BTU burner
            and a 40,000 BTU burner both boil water fast in calm conditions. The difference shows
            up in 10 mph wind: the Triton+&rsquo;s panels protect a low simmer; the Everest&rsquo;s
            three-sided steel screen keeps a rolling boil going through gusts. If your first trips
            are summer and calm, the Triton+ is plenty.
          </p>
          <p>
            <strong>One burner versus two is a meal-planning decision.</strong> One burner means
            you cook in sequence — coffee, then oatmeal, then eggs. Two burners means coffee plus
            bacon plus eggs all at once. With a family of four and small kids, &ldquo;at the same
            time&rdquo; is the difference between a 20-minute breakfast and a 45-minute one.
          </p>
          <p>
            <strong>Footprint matters at picnic tables.</strong> The 1-burner takes the corner of
            a table. The two-burners take half the table. On a developed campsite with a real
            picnic table this is fine; on a backcountry site or a small bench, plan accordingly.
          </p>
          <p>
            <strong>Cleanup is the underrated spec.</strong> The Triton+&rsquo;s grease tray
            slides out and the grates go in a dishwasher when you get home. The Everest&rsquo;s
            wind screen lifts off the same way. The 1-burner has nothing to clean — a wipe-down
            is the whole job.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          Which one for which plan
        </h2>
        <div className="grid gap-4 md:gap-5">
          {PLAN_MAP.map((m) => (
            <Link
              key={m.plan}
              href={m.href}
              className="group block rounded-2xl ring-1 ring-stone-200 hover:ring-stone-300 bg-white px-6 py-5 md:px-7 md:py-6 transition"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-2">
                {m.plan}
              </p>
              <p className="font-serif text-lg md:text-xl text-stone-950 font-semibold leading-snug mb-2 group-hover:text-stone-700">
                Pick: {m.pick}
              </p>
              <p className="text-stone-600 leading-relaxed">{m.reason}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          See the picks
        </h2>
        <div className="space-y-6">
          {PICKS.map((p) => (
            <a
              key={p.product.id}
              href={getProductUrl(p.product)}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="group flex flex-col sm:flex-row gap-5 rounded-2xl ring-1 ring-stone-200 hover:ring-stone-300 bg-cream/70 hover:bg-cream transition p-5 md:p-6"
            >
              <div className="shrink-0 w-full sm:w-44 h-40 sm:h-32 bg-stone-100 rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.product.imageUrl}
                  alt={p.product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-2">
                  {p.label} · {p.product.priceRange}
                </p>
                <p className="font-serif text-xl font-semibold text-stone-950 group-hover:text-stone-700 mb-2">
                  {p.product.name}
                </p>
                <p className="text-stone-600 leading-relaxed text-[15px]">
                  {p.product.description}
                </p>
              </div>
            </a>
          ))}
        </div>
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

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
          Not sure? Take the 60-second quiz.
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Six questions about your group, comfort level, and how far you want to drive.
          You&rsquo;ll land on the right plan and the right stove for that plan.
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
            See the full gear setup
          </Link>
        </div>
      </section>

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
