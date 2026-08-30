import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import QuickAnswer from '@/components/guide/QuickAnswer'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import { articleGraph, itemListGraph, faqPageGraph, pageMetadata, SITE_URL } from '@/lib/seo'
import type { AffiliateProduct } from '@/types'

const SLUG = '/compare/best-beginner-tent'
const TITLE = 'Best Beginner Tent: 3 Picks for First-Trip Comfort'
const DESCRIPTION =
  'Best beginner tent: a 4-person dome, a stand-up family size-up, and a sturdier upgrade. Compare capacity, setup, weather rating, and price.'
const H1 = 'Best beginner tent: 3 picks for your first family trip'

function P(id: string): AffiliateProduct {
  const p = AFFILIATE_PRODUCTS.find((x) => x.id === id)
  if (!p) throw new Error(`Missing affiliate product: ${id}`)
  return p
}

const TENT_BEST_SELLER = P('coleman-sundome-4p')
const TENT_SIZE_UP = P('core-6p-instant-cabin')
const TENT_UPGRADE = P('alps-lynx-4p')

type Tier = 'best-seller' | 'size-up' | 'upgrade'

type Pick = {
  tier: Tier
  label: string
  product: AffiliateProduct
  capacity: string
  setup: string
  weight: string
  weather: string
  priceTier: string
}

const PICKS: Pick[] = [
  {
    tier: 'best-seller',
    label: 'Best-seller',
    product: TENT_BEST_SELLER,
    capacity: '4 people / queen air bed',
    setup: '~10 min, 2 poles',
    weight: '~10 lbs',
    weather: 'Steady rain, light wind',
    priceTier: '$ Budget',
  },
  {
    tier: 'size-up',
    label: 'Size up',
    product: TENT_SIZE_UP,
    capacity: '6 people / stand-up',
    setup: '60 sec, pop-up',
    weight: '~23 lbs',
    weather: 'Steady rain, moderate wind',
    priceTier: '$$ Mid',
  },
  {
    tier: 'upgrade',
    label: 'Sturdier upgrade',
    product: TENT_UPGRADE,
    capacity: '4 people / queen air bed',
    setup: '~15 min, free-standing',
    weight: '~8 lbs',
    weather: 'Heavier rain, stronger wind',
    priceTier: '$$ Mid+',
  },
]

const PLAN_MAP: { plan: string; href: string; pick: string; reason: string }[] = [
  {
    plan: 'Backyard Test',
    href: '/plans/backyard-test',
    pick: 'Coleman Sundome 4P',
    reason: 'A $0 trip in the yard. The cheapest, fastest tent that fits the family is the right call.',
  },
  {
    plan: 'First Night Camp',
    href: '/plans/first-night-camp',
    pick: 'Coleman Sundome 4P',
    reason: 'One developed-campground night. The Sundome is the safest, best-selling first-trip tent.',
  },
  {
    plan: 'First Weekend Camp',
    href: '/plans/first-weekend-camp',
    pick: 'Sundome 4P or CORE 6-Person Cabin',
    reason: 'Two nights. Stay with the Sundome if budget matters, step up to the CORE for room to stand.',
  },
  {
    plan: 'Easy Family Basecamp',
    href: '/plans/easy-family-basecamp',
    pick: 'CORE 6-Person Cabin or ALPS Lynx 4P',
    reason: 'Three nights of comfort. Stand-up height pays off, and so does sturdier pole quality.',
  },
]

const RELATED = [
  {
    title: 'Coleman Sundome 3P vs 4P vs 6P',
    href: '/compare/coleman-sundome-3p-vs-4p-vs-6p',
    blurb: 'Same tent family, three sizes — including the couples-sized 3P for a smaller setup.',
  },
  {
    title: 'Camping for Beginners',
    href: '/guides/camping-for-beginners',
    blurb: 'The shortest path from zero to a confident first trip.',
  },
  {
    title: 'See the full gear guide',
    href: '/gear',
    blurb: 'Sleep, cooking, lighting — the full beginner-grade kit, not just tents.',
  },
]

const FAQS = [
  {
    q: 'Is the Coleman Sundome 4P good enough for a first trip?',
    a: 'Yes — it\'s the safest first-tent pick precisely because it\'s the most proven. Best-selling, weatherproof, fits a queen air bed, and sets up in 10 minutes. Step up only if you specifically want standing room or expect rougher weather.',
  },
  {
    q: 'Is it worth paying more for the ALPS Lynx over the Sundome?',
    a: 'Only if pole quality and stronger weather resistance matter more than price to you. The ALPS uses aluminum poles and a stronger guy-line system — a real difference if your first trip is in shoulder-season wind, but not something a fair-weather beginner needs to pay extra for.',
  },
  {
    q: 'Do I need a 6-person tent for a family of 4?',
    a: 'Only if you want to stand up inside. Capacity ratings assume shoulder-to-shoulder sleeping with no gear, so a 4-person tent is genuinely tight for a family of 4. A 6-person cabin tent adds real floor space and standing height at a moderate price step-up.',
  },
  {
    q: 'Can any of these three tents handle real rain?',
    a: 'All three handle steady rain fine with their stock rainfly — none are backpacking-grade single-wall tents. For genuinely wet climates or multi-day rain, see the dedicated best tent for rainy camping guide for what to look for beyond these picks.',
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
    { name: 'Best beginner tent', url: `${SITE_URL}${SLUG}` },
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
          keywords: ['best beginner tent', 'family camping tent', 'Coleman Sundome 4', 'first camping trip tent'],
        })}
      />
      <JsonLd
        data={itemListGraph({
          name: 'Best beginner tents',
          items: PICKS.map((p, i) => ({
            position: i + 1,
            name: p.product.name,
            url: getProductUrl(p.product),
          })),
        })}
      />
      <JsonLd data={faqPageGraph(FAQS)} />
      <Breadcrumbs items={breadcrumbs} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Gear comparison
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          {H1}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          A tent is the one piece of gear that decides whether your first trip is a good
          memory. Here are three picks — best-seller, size-up, and sturdier upgrade — with
          clear differences and which Trailstead plan they fit.
        </p>
      </header>

      {/* ── Quick Answer ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-12">
        <QuickAnswer
          tldr="For most families, the Coleman Sundome 4P is the right first tent. Step up only if you want to stand up inside or expect rough weather."
          summary={
            <>
              The <strong>Coleman Sundome 4P</strong> is the safest first-tent pick — best-selling,
              weatherproof, fits a queen air bed, sets up in 10 minutes. Step up to the{' '}
              <strong>CORE 6-Person Instant Cabin</strong> if you want stand-up height and a 6-person
              footprint. Step up to the <strong>ALPS Mountaineering Lynx 4P</strong> if pole
              quality and stronger weather resistance matter more than the lowest price. Skip the
              backpacking-grade options for now — your first trip rewards floor space, not weight
              savings.
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
                <td className="px-5 py-4 font-medium text-stone-500">Capacity</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.capacity}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Ease of setup</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.setup}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Weight</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.weight}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Weather rating</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.weather}</td>)}
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

      {/* ── What's different in practice ────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          What&rsquo;s different in practice
        </h2>

        <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
          <p>
            <strong>Floor space matters more than spec-sheet capacity.</strong> Tent
            manufacturers count &ldquo;persons&rdquo; assuming everyone sleeps shoulder-to-shoulder
            on a thin pad. In real life, a family of four wants a queen air bed. The Sundome 4P
            and Lynx 4P both fit one with a narrow gear strip; the CORE 6-Person Cabin fits a queen plus
            two kid pads with room to walk around.
          </p>
          <p>
            <strong>Standing height changes the whole experience.</strong> The Sundome and Lynx top
            out at about 4&rsquo;11&quot; — you sit up to change clothes, you crouch to walk
            across. The CORE 6-Person Cabin has near-vertical walls and stand-up height. After two nights,
            most parents say the standing room was worth the extra weight and trunk space.
          </p>
          <p>
            <strong>Pole quality is the upgrade hidden in the price.</strong> The Sundome uses
            Coleman&rsquo;s standard fiberglass pole — fine in calm weather, fragile if it bends
            under load. The ALPS Lynx uses aluminum poles with a stronger guy-line system. If your
            first trip is in shoulder-season weather, that difference shows up the first time the
            wind picks up at 2am.
          </p>
          <p>
            <strong>None of these are backpacking tents.</strong> If you&rsquo;re carrying the tent
            from car to site, all three are fine. If you&rsquo;re hiking miles in, look at a 2-person
            backpacking tent instead — that&rsquo;s a different category and a different conversation.
          </p>
        </div>
      </section>

      {/* ── Which one for which plan ─────────────────────────────────────── */}
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

      {/* ── Affiliate cards ──────────────────────────────────────────────── */}
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

      {/* ── CTAs ─────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
          Not sure? Take the 60-second quiz.
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Six questions about your group, comfort level, and how far you want to drive.
          You&rsquo;ll land on the right plan and the right tent for that plan.
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
