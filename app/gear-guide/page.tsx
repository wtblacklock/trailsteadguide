import Link from 'next/link'
import Image from 'next/image'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, productGraph, itemListGraph, SITE_URL } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

export const metadata = pageMetadata({
  title: 'Camping Gear Guide — The Exact Gear You Need',
  description:
    'Proven camping setups for first-time families. Three curated bundles and a short per-category catalog — no 100-option lists, no overwhelm.',
  path: '/gear-guide',
})

/** Find a product by id; throws at build time if missing so we catch breakage early. */
function P(id: string): AffiliateProduct {
  const p = AFFILIATE_PRODUCTS.find((x) => x.id === id)
  if (!p) throw new Error(`Missing affiliate product: ${id}`)
  return p
}

/** Parse a "~$120" price-range string into a number, 0 if missing. */
function priceNum(p: AffiliateProduct): number {
  const m = p.priceRange?.match(/\d+/)
  return m ? parseInt(m[0], 10) : 0
}

type Bundle = {
  id: string
  name: string
  tagline: string
  planHref: string
  itemIds: string[]
}

const BUNDLES: Bundle[] = [
  {
    id: 'first-night',
    name: 'First Night Simple',
    tagline: 'One night, close to home. The just-try-it setup.',
    planHref: '/plans/first-night-camp',
    itemIds: ['tent-sundome-3', 'sleeping-bag-family', 'fwc-lantern-consciot', 'fwc-lantern-hanger'],
  },
  {
    id: 'weekend-ready',
    name: 'Weekend Ready',
    tagline: 'Two nights with the family. Everything you actually use.',
    planHref: '/plans/first-weekend-camp',
    itemIds: [
      'fwc-tent-sundome',
      'stove-2-burner',
      'fwc-cooler-rolling',
      'fwc-sleeping-bag-mallome',
      'fwc-chair-gci-rocker',
      'fwc-lantern-consciot',
    ],
  },
  {
    id: 'family-basecamp',
    name: 'Family Basecamp',
    tagline: 'Three+ nights, basecamp style. The upgrade your back will thank you for.',
    planHref: '/plans/easy-family-basecamp',
    itemIds: ['tent-sundome-6', 'air-mattress-queen', 'stove-2-burner', 'fwc-cooler-rolling', 'fwc-chair-gci-rocker', 'canopy-camp'],
  },
]

/** Category sections for the catalog view. */
const CATEGORY_SECTIONS: { title: string; note?: string; ids: string[] }[] = [
  {
    title: 'Tents',
    note: 'Three options, not thirty. Pick the one that matches your trip length.',
    ids: ['tent-sundome-3', 'fwc-tent-sundome', 'tent-sundome-6'],
  },
  {
    title: 'Cooking',
    note: 'Propane. Always propane.',
    ids: ['stove-2-burner', 'fwc-stove-coleman-1burner'],
  },
  {
    title: 'Coolers',
    note: 'The rolling one is the right call if you camp more than once.',
    ids: ['fwc-cooler-rolling', 'cooler-basic'],
  },
  {
    title: 'Comfort',
    note: 'You spend more time sitting than you think. Do not cheap out here.',
    ids: ['camp-chairs', 'fwc-chair-gci-rocker', 'air-mattress-queen', 'fwc-cot-airbed-combo', 'sleeping-pad-air'],
  },
  {
    title: 'Sleep',
    ids: ['sleeping-bag-family', 'fwc-sleeping-bag-mallome'],
  },
  {
    title: 'Lighting',
    note: 'One headlamp per person is non-negotiable. A lantern for the table makes camp feel like home.',
    ids: ['headlamp-family', 'fwc-lantern-consciot', 'fwc-lantern-hanger'],
  },
  {
    title: 'Keep camp clean',
    note: 'A pop-up trash can saves the picnic table and makes pack-out easy.',
    ids: ['fwc-trash-can-wakeman'],
  },
  {
    title: 'Make it fun',
    note: 'The unfair advantages. A projector on the tent wall changes the trip.',
    ids: ['fwc-projector-tmy', 'canopy-camp'],
  },
]

// ─── small presentation components (local — keeps the file contained) ───────

function ProductCard({ p, compact = false }: { p: AffiliateProduct; compact?: boolean }) {
  return (
    <a
      href={getProductUrl(p)}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="group rounded-2xl ring-1 ring-stone-200 bg-white flex flex-col overflow-hidden transition-all duration-200 hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
    >
      <div className={`${compact ? 'aspect-[4/3]' : 'aspect-[4/3]'} w-full bg-stone-50 overflow-hidden relative`}>
        <Image
          src={p.imageUrl}
          alt={p.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
          loading="lazy"
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className={`${compact ? 'p-6' : 'p-8'} flex flex-col flex-1`}>
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <p className="text-xs uppercase tracking-widest text-stone-500">
            {p.category === 'essential' ? 'Essential' : p.category === 'comfort' ? 'Comfort upgrade' : 'Nice to have'}
          </p>
          {p.priceRange && <p className="text-xs text-stone-400 tabular-nums">{p.priceRange}</p>}
        </div>
        <h3 className={`font-serif ${compact ? 'text-xl' : 'text-2xl'} font-medium text-stone-900 tracking-tight mb-3`}>
          {p.name}
        </h3>
        <p className="text-stone-600 leading-relaxed text-[15px]">{p.description}</p>
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
            View on Amazon
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-stone-400">Affiliate</span>
        </div>
      </div>
    </a>
  )
}

function BundleCard({ bundle }: { bundle: Bundle }) {
  const items = bundle.itemIds.map(P)
  const total = items.reduce((s, i) => s + priceNum(i), 0)
  return (
    <article className="rounded-2xl ring-1 ring-stone-200 bg-white flex flex-col overflow-hidden">
      <div className="p-8 md:p-10 border-b border-stone-100">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">Bundle</p>
        <h3 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
          {bundle.name}
        </h3>
        <p className="text-stone-600 leading-relaxed">{bundle.tagline}</p>
        <div className="mt-5 flex items-baseline gap-3">
          <p className="font-serif text-2xl md:text-3xl text-stone-900 tabular-nums">~${total}</p>
          <p className="text-xs uppercase tracking-widest text-stone-500">estimated total · {items.length} items</p>
        </div>
      </div>
      <ul className="flex-1 divide-y divide-stone-100">
        {items.map((p) => (
          <li key={p.id}>
            <a
              href={getProductUrl(p)}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="flex items-center gap-4 px-8 md:px-10 py-4 group hover:bg-stone-50 transition-colors"
            >
              <div className="w-14 h-14 shrink-0 rounded-md bg-stone-100 overflow-hidden relative">
                <Image
                  src={p.imageUrl}
                  alt=""
                  fill
                  sizes="56px"
                  loading="lazy"
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-900 truncate group-hover:text-stone-600 transition-colors">
                  {p.name}
                </p>
                {p.priceRange && (
                  <p className="text-xs text-stone-500 tabular-nums mt-0.5">{p.priceRange}</p>
                )}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-stone-400 group-hover:text-stone-900 transition-colors">
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

// ─── page ───────────────────────────────────────────────────────────────────

export default function Page() {
  // Build deduped Product JSON-LD for every product appearing in BUNDLES or CATEGORY_SECTIONS.
  const featuredIds = new Set<string>()
  BUNDLES.forEach((b) => b.itemIds.forEach((id) => featuredIds.add(id)))
  CATEGORY_SECTIONS.forEach((c) => c.ids.forEach((id) => featuredIds.add(id)))

  const productGraphs = AFFILIATE_PRODUCTS.filter((p) => featuredIds.has(p.id)).map((p) =>
    productGraph({
      id: p.id,
      name: p.name,
      description: p.description,
      image: p.imageUrl,
      offerUrl: getProductUrl(p),
      priceRange: p.priceRange,
    }),
  )

  const itemList = itemListGraph({
    name: 'Camping Gear for First-Time Families',
    items: BUNDLES.map((b, i) => ({
      position: i + 1,
      name: b.name,
      url: `${SITE_URL}/gear-guide#${b.id}`,
    })),
  })

  const gearGraph = {
    '@context': 'https://schema.org',
    '@graph': [itemList, ...productGraphs],
  }

  return (
    <main>
      <JsonLd data={gearGraph} />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Gear Guide', url: `${SITE_URL}/gear-guide` },
        ]}
      />
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-14 md:pb-20">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">Gear Guide</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-stone-950 tracking-tight leading-[1.04] max-w-4xl">
          The exact gear you need for your first camping trip.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          No guesswork. No overwhelm. Just proven setups that work for real families on real first trips.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-8 py-4 text-base"
          >
            Start Your Plan
          </Link>
          <a href="#bundles" className="text-base text-stone-500 hover:text-stone-900 transition-colors underline underline-offset-4">
            Or jump to gear ↓
          </a>
        </div>
        <p className="mt-10 text-xs text-stone-500 max-w-2xl">
          As an Amazon Associate we earn from qualifying purchases. Links below are affiliate links — clicking them may earn us a small commission at no extra cost to you.
        </p>
      </header>

      {/* ── Start-Here Bundles ──────────────────────────────────────────── */}
      <section id="bundles" className="max-w-page mx-auto px-8 pb-24 md:pb-32">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">Start here</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-stone-950 tracking-tight leading-tight">
            Pick the setup that matches your trip.
          </h2>
          <p className="mt-5 text-lg text-stone-600 leading-relaxed">
            Three bundles, scaled to how long you&rsquo;re going and how comfortable you want to be. Click any item to buy it — or grab the whole setup at once.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
          {BUNDLES.map((b) => (
            <BundleCard key={b.id} bundle={b} />
          ))}
        </div>
      </section>

      {/* ── Category catalog ────────────────────────────────────────────── */}
      <section className="max-w-page mx-auto px-8 pb-20">
        <div className="max-w-3xl mb-12 md:mb-16 border-t border-stone-200 pt-14">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">By category</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-stone-950 tracking-tight leading-tight">
            Every recommendation, one at a time.
          </h2>
          <p className="mt-5 text-lg text-stone-600 leading-relaxed">
            If you&rsquo;d rather pick individual items than a bundle, here&rsquo;s everything — grouped by category, still short on purpose.
          </p>
        </div>

        <div className="space-y-16 md:space-y-20">
          {CATEGORY_SECTIONS.map((cat) => (
            <div key={cat.title}>
              <div className="flex items-baseline justify-between gap-6 mb-6 md:mb-8">
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight">
                  {cat.title}
                </h3>
                {cat.note && (
                  <p className="text-sm text-stone-500 max-w-md text-right hidden md:block">{cat.note}</p>
                )}
              </div>
              {cat.note && (
                <p className="text-sm text-stone-500 mb-6 md:hidden">{cat.note}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {cat.ids.map((id) => (
                  <ProductCard key={id} p={P(id)} compact />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comparison tables ───────────────────────────────────────────── */}
      <section className="max-w-page mx-auto px-8 py-20 md:py-24 border-t border-stone-200">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">Compare</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-stone-950 tracking-tight leading-tight">
            Side-by-side, if you&rsquo;re still deciding.
          </h2>
        </div>

        <div className="space-y-16">
          {/* Tents comparison */}
          <div>
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-stone-950 tracking-tight mb-6">
              Best tents for beginners
            </h3>
            <div className="overflow-x-auto rounded-2xl ring-1 ring-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50">
                    <th className="text-left font-medium text-stone-500 px-5 py-4">Tent</th>
                    <th className="text-left font-medium text-stone-500 px-5 py-4">Best for</th>
                    <th className="text-left font-medium text-stone-500 px-5 py-4">Setup</th>
                    <th className="text-left font-medium text-stone-500 px-5 py-4 tabular-nums">Price</th>
                    <th className="px-5 py-4" aria-hidden />
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="px-5 py-4 font-medium text-stone-900">Coleman Sundome 3P</td>
                    <td className="px-5 py-4 text-stone-600">Couple or small family</td>
                    <td className="px-5 py-4 text-stone-600">~10 min</td>
                    <td className="px-5 py-4 text-stone-900 tabular-nums">~$90</td>
                    <td className="px-5 py-4 text-right">
                      <a href={getProductUrl(P('tent-sundome-3'))} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-stone-900 font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-medium text-stone-900">Coleman Sundome 4P</td>
                    <td className="px-5 py-4 text-stone-600">Family of 3–4</td>
                    <td className="px-5 py-4 text-stone-600">~10 min</td>
                    <td className="px-5 py-4 text-stone-900 tabular-nums">~$116</td>
                    <td className="px-5 py-4 text-right">
                      <a href={getProductUrl(P('fwc-tent-sundome'))} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-stone-900 font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-medium text-stone-900">Coleman Sundome 6P</td>
                    <td className="px-5 py-4 text-stone-600">Family of 5+ / room to stand</td>
                    <td className="px-5 py-4 text-stone-600">~15 min</td>
                    <td className="px-5 py-4 text-stone-900 tabular-nums">~$160</td>
                    <td className="px-5 py-4 text-right">
                      <a href={getProductUrl(P('tent-sundome-6'))} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-stone-900 font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">
                        View
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Coolers comparison */}
          <div>
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-stone-950 tracking-tight mb-6">
              Cooler comparison
            </h3>
            <div className="overflow-x-auto rounded-2xl ring-1 ring-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50">
                    <th className="text-left font-medium text-stone-500 px-5 py-4">Cooler</th>
                    <th className="text-left font-medium text-stone-500 px-5 py-4">Mobility</th>
                    <th className="text-left font-medium text-stone-500 px-5 py-4">Capacity</th>
                    <th className="text-left font-medium text-stone-500 px-5 py-4 tabular-nums">Price</th>
                    <th className="px-5 py-4" aria-hidden />
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="px-5 py-4 font-medium text-stone-900">Coleman Classic Rolling</td>
                    <td className="px-5 py-4 text-stone-600">Wheels + handle</td>
                    <td className="px-5 py-4 text-stone-600">~50 qt</td>
                    <td className="px-5 py-4 text-stone-900 tabular-nums">~$107</td>
                    <td className="px-5 py-4 text-right">
                      <a href={getProductUrl(P('fwc-cooler-rolling'))} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-stone-900 font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-medium text-stone-900">Coleman 54-Qt Steel-Belted</td>
                    <td className="px-5 py-4 text-stone-600">Carry handles</td>
                    <td className="px-5 py-4 text-stone-600">54 qt / 85 cans</td>
                    <td className="px-5 py-4 text-stone-900 tabular-nums">~$120</td>
                    <td className="px-5 py-4 text-right">
                      <a href={getProductUrl(P('cooler-basic'))} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-stone-900 font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">
                        View
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust / Why these ───────────────────────────────────────────── */}
      <section className="max-w-page mx-auto px-8 py-20 md:py-28 border-t border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div className="md:col-span-1">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">Why so short</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight">
              This is your exact setup. You&rsquo;re done.
            </h2>
          </div>
          <div className="md:col-span-2 space-y-8 text-stone-700 leading-relaxed text-lg max-w-2xl">
            <p>
              Every other gear guide shows you 40 tents and lets you sort it out. That&rsquo;s how you end up scrolling for three nights and buying the wrong thing anyway. We picked one or two per category on purpose.
            </p>
            <p>
              <strong className="text-stone-900">Why these products.</strong> Real weekend-camping durability at a real family budget. Not the ultralight stuff you don&rsquo;t need. Not the luxury stuff you won&rsquo;t use twice.
            </p>
            <p>
              <strong className="text-stone-900">Why not 100 options.</strong> Choice paralysis is the #1 reason people never take the trip. Two good picks beat twenty good-enough ones.
            </p>
            <p>
              <strong className="text-stone-900">How this reduces mistakes.</strong> The first-trip regrets we hear about — wrong tent capacity, no sleeping pad, the backpacking stove that won&rsquo;t boil water for 4 — all have a recommendation above that prevents them.
            </p>
          </div>
        </div>
      </section>

      {/* ── Affiliate disclosure footer ─────────────────────────────────── */}
      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-2xl border-t border-stone-200 pt-8">
          <p className="text-stone-500 leading-relaxed text-sm">
            Some links on this site are affiliate links. We earn a small commission when you buy through them — which funds the writing. We only recommend gear we would buy (and have bought) ourselves. Read our{' '}
            <Link href="/affiliate-disclosure" className="underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors">
              full disclosure
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
