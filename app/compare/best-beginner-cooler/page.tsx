import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import QuickAnswer from '@/components/guide/QuickAnswer'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import { articleGraph, itemListGraph, pageMetadata, SITE_URL } from '@/lib/seo'
import type { AffiliateProduct } from '@/types'

const SLUG = '/compare/best-beginner-cooler'
const TITLE = 'Best Beginner Cooler: 3 Picks for First-Trip Comfort'
const DESCRIPTION =
  'Best beginner cooler: a compact classic, a full-size rolling cooler, and a premium upgrade path. Compare ice retention, capacity, weight, and price.'
const H1 = 'Best beginner cooler: 3 picks for your first family trip'

function P(id: string): AffiliateProduct {
  const p = AFFILIATE_PRODUCTS.find((x) => x.id === id)
  if (!p) throw new Error(`Missing affiliate product: ${id}`)
  return p
}

const COOLER_COMPACT = P('cooler-basic') // Coleman 54-Quart Steel-Belted (deprecated, kept for compare)
const COOLER_ROLLING = P('coleman-classic-rolling-cooler') // 100QT rolling

type Pick = {
  label: string
  name: string
  product?: AffiliateProduct
  description: string
  iceRetention: string
  capacity: string
  weight: string
  priceTier: string
  priceLabel: string
}

const PICKS: Pick[] = [
  {
    label: 'Compact classic',
    name: COOLER_COMPACT.name,
    product: COOLER_COMPACT,
    description: COOLER_COMPACT.description,
    iceRetention: 'Up to 4 days',
    capacity: '54 qt / 85 cans',
    weight: '~17 lbs empty',
    priceTier: '$ Budget',
    priceLabel: COOLER_COMPACT.priceRange,
  },
  {
    label: 'Full-size rolling',
    name: COOLER_ROLLING.name,
    product: COOLER_ROLLING,
    description: COOLER_ROLLING.description,
    iceRetention: 'Up to 5 days',
    capacity: '100 qt / 160 cans',
    weight: '~21 lbs empty',
    priceTier: '$ Budget',
    priceLabel: COOLER_ROLLING.priceRange,
  },
  {
    label: 'Premium upgrade path',
    name: 'Yeti Tundra 65 / RTIC equivalent',
    description:
      'Rotomolded hard cooler in the Yeti or RTIC tier. Multi-day ice retention, bear-resistant build, lifetime durability. The pick when you camp more than three weekends a year.',
    iceRetention: '7–10 days',
    capacity: '60–65 qt / ~40 cans + ice',
    weight: '~30 lbs empty',
    priceTier: '$$$ Premium',
    priceLabel: '$300–$400',
  },
]

const PLAN_MAP: { plan: string; href: string; pick: string; reason: string }[] = [
  {
    plan: 'Backyard Test',
    href: '/plans/backyard-test',
    pick: 'Skip — use the kitchen fridge',
    reason: 'You\'re 50 feet from the back door. A cooler is overkill for a yard rehearsal — drinks live in the fridge.',
  },
  {
    plan: 'First Night Camp',
    href: '/plans/first-night-camp',
    pick: 'Coleman 54-Quart Steel-Belted',
    reason: 'One night. The compact classic holds enough for breakfast and dinner without dominating the trunk.',
  },
  {
    plan: 'First Weekend Camp',
    href: '/plans/first-weekend-camp',
    pick: 'Coleman Classic Rolling Cooler 100QT',
    reason: 'Two nights with a family. The rolling cooler covers two breakfasts, two dinners, and snacks without re-icing.',
  },
  {
    plan: 'Easy Family Basecamp',
    href: '/plans/easy-family-basecamp',
    pick: 'Rolling 100QT — or upgrade to Yeti tier',
    reason: 'Three nights of comfort in summer. The rolling 100QT works; if you\'re camping more than a few times a year, the rotomolded upgrade pays for itself.',
  },
]

const RELATED = [
  {
    title: 'Rolling cooler vs steel-belted cooler',
    href: '/compare/rolling-cooler-vs-steel-belted-cooler',
    blurb: 'Wheels and capacity versus ice retention and toughness — head-to-head.',
  },
  {
    title: 'Best beginner sleeping system',
    href: '/compare/best-beginner-sleeping-system',
    blurb: 'Pair the cooler with a sleep system that keeps the family rested and willing to come back.',
  },
  {
    title: 'See the full gear guide',
    href: '/gear',
    blurb: 'The full beginner-grade kit — sleep, cooking, lighting, the rest.',
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
    { name: 'Best beginner cooler', url: `${SITE_URL}${SLUG}` },
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
          keywords: ['best beginner cooler', 'family camping cooler', 'Coleman cooler', 'rolling cooler'],
        })}
      />
      <JsonLd
        data={itemListGraph({
          name: 'Best beginner coolers',
          items: PICKS.map((p, i) => ({
            position: i + 1,
            name: p.name,
            url: p.product ? getProductUrl(p.product) : `${SITE_URL}${SLUG}`,
          })),
        })}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Gear comparison
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          {H1}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Cooler size and ice retention quietly decide what you eat on day two. Here are three
          picks — compact classic, full-size rolling, and a premium upgrade path — with what
          actually matters for a first family trip.
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-8 pb-12">
        <QuickAnswer
          tldr="One night? Coleman 54-quart steel-belted. Weekend with a family? Coleman Classic Rolling 100QT. Camp regularly? Step up to the Yeti/RTIC tier."
          summary={
            <>
              For a single overnight, a <strong>54-quart classic cooler</strong> holds plenty and
              keeps ice up to four days — fine. For two or three nights with a family, the{' '}
              <strong>Coleman Classic Rolling 100QT</strong> covers two full days of meals plus
              snacks without re-icing, and the wheels matter when summer parking is a hike.
              Premium <strong>rotomolded coolers</strong> (Yeti, RTIC) hold ice for 7–10 days and
              outlast everything else — the upgrade pays for itself once you camp more than a few
              times a year.
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
                  <th key={p.name} className="text-left font-medium text-stone-900 px-5 py-4 align-bottom">
                    <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                      {p.label}
                    </span>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Ice retention</td>
                {PICKS.map((p) => <td key={p.name} className="px-5 py-4 text-stone-700 align-top">{p.iceRetention}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Capacity</td>
                {PICKS.map((p) => <td key={p.name} className="px-5 py-4 text-stone-700 align-top">{p.capacity}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Weight (empty)</td>
                {PICKS.map((p) => <td key={p.name} className="px-5 py-4 text-stone-700 align-top">{p.weight}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Price</td>
                {PICKS.map((p) => (
                  <td key={p.name} className="px-5 py-4 text-stone-900 tabular-nums align-top">
                    <span className="block">{p.priceTier}</span>
                    <span className="block text-xs text-stone-500">{p.priceLabel}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-stone-500">
          Prices approximate and subject to change on Amazon. The premium tier is a generic
          recommendation — we don&rsquo;t carry an affiliate link for it yet.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          What&rsquo;s different in practice
        </h2>
        <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
          <p>
            <strong>Capacity is about meals, not cans.</strong> A 54-quart cooler holds about
            two days of food for a family of four if you pack with intent — drinks in a separate
            soft cooler, food in the main one. The 100-quart rolling cooler buys you the slack to
            ignore packing logic and still have ice on day three.
          </p>
          <p>
            <strong>Wheels turn out to matter more than ice retention.</strong> For mid-grade
            coolers, both Coleman options keep ice 4–5 days with proper pre-chilling and a frozen
            jug at the bottom. The real differentiator on summer trips is whether you can wheel
            it from the parking pad to the site or you&rsquo;re carrying 60 pounds of food across
            gravel.
          </p>
          <p>
            <strong>Rotomolded coolers (Yeti, RTIC) play a different game.</strong> The price
            jumps to $300+, but ice survives 7–10 days, the body absorbs abuse without cracking,
            and they&rsquo;re bear-resistant where required. The upgrade math: if you camp three
            weekends a year for five years, that&rsquo;s 75 nights — under $5/night for a
            cooler that outlasts every other piece of gear in the kit.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Pair it with the right sleep system
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-6">
          A cooler decides what you eat. A sleep system decides whether the family wants to come
          back. The sleeping-system comparison maps three tiers — budget, comfort, and
          cold-weather upgrade — onto the same plan structure as this page.
        </p>
        <Link
          href="/compare/best-beginner-sleeping-system"
          className="inline-flex items-center justify-center rounded-md font-medium ring-1 ring-stone-300 text-stone-900 hover:bg-stone-50 transition-colors px-6 py-3 text-sm"
        >
          See the sleeping-system comparison
        </Link>
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
          {PICKS.map((p) =>
            p.product ? (
              <a
                key={p.name}
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
                    {p.label} · {p.priceLabel}
                  </p>
                  <p className="font-serif text-xl font-semibold text-stone-950 group-hover:text-stone-700 mb-2">
                    {p.name}
                  </p>
                  <p className="text-stone-600 leading-relaxed text-[15px]">{p.description}</p>
                </div>
              </a>
            ) : (
              <div
                key={p.name}
                className="rounded-2xl ring-1 ring-stone-200 bg-stone-50 p-5 md:p-6"
              >
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-2">
                  {p.label} · {p.priceLabel} · generic recommendation, no link yet
                </p>
                <p className="font-serif text-xl font-semibold text-stone-950 mb-2">{p.name}</p>
                <p className="text-stone-600 leading-relaxed text-[15px]">{p.description}</p>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
          Not sure? Take the 60-second quiz.
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Six questions about your group, comfort level, and how far you want to drive.
          You&rsquo;ll land on the right plan — and the right cooler size for that plan.
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
