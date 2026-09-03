import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import QuickAnswer from '@/components/guide/QuickAnswer'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import { articleGraph, itemListGraph, faqPageGraph, pageMetadata, SITE_URL } from '@/lib/seo'
import type { AffiliateProduct } from '@/types'

const SLUG = '/compare/lantern-vs-headlamp-vs-flashlight'
const TITLE = 'Camping Lantern vs Headlamp vs Flashlight: What You Need'
const DESCRIPTION =
  'Camping lantern vs headlamp vs flashlight compared: light pattern, hands-free use, and the real job each one does. Which to buy first for a family.'
const H1 = 'Lantern vs headlamp vs flashlight: what you actually need'

function P(id: string): AffiliateProduct {
  const p = AFFILIATE_PRODUCTS.find((x) => x.id === id)
  if (!p) throw new Error(`Missing affiliate product: ${id}`)
  return p
}

const LANTERN = P('luminaid-packlite-max')
const HEADLAMP = P('black-diamond-spot-400')
const FLASHLIGHT = P('streamlight-protac-2')

type Pick = {
  label: string
  product: AffiliateProduct
  lightPattern: string
  handsFree: string
  bestFor: string
  power: string
  priceTier: string
}

const PICKS: Pick[] = [
  {
    label: 'Lantern',
    product: LANTERN,
    lightPattern: '360° area light',
    handsFree: 'Yes - sits on the table or hangs in the tent',
    bestFor: 'Lighting the whole picnic table or tent interior at once',
    power: 'Solar-rechargeable, doubles as a phone charger',
    priceTier: '$$ Mid',
  },
  {
    label: 'Headlamp',
    product: HEADLAMP,
    lightPattern: 'Directional beam, points where you look',
    handsFree: 'Yes - worn on the head',
    bestFor: 'Cooking, setting up the tent, walking to the bathroom block',
    power: 'Battery-powered, red night-vision mode',
    priceTier: '$ Budget',
  },
  {
    label: 'Flashlight',
    product: FLASHLIGHT,
    lightPattern: 'Long-throw directional beam',
    handsFree: 'No - handheld',
    bestFor: 'Checking the treeline, finding your site in the dark, scanning a distance',
    power: 'Rechargeable or AA cells',
    priceTier: '$$$ Premium',
  },
]

const RELATED = [
  {
    title: 'Best beginner tent',
    href: '/compare/best-beginner-tent',
    blurb: 'Three tent picks for a first family trip - capacity, weather rating, and price.',
  },
  {
    title: 'Fall camping for beginners',
    href: '/guides/fall-camping-for-beginners',
    blurb: 'Why lighting is the most-used gear after the November time change.',
  },
  {
    title: 'See the full gear guide',
    href: '/gear',
    blurb: 'The full beginner-grade kit - shelter, sleep, cooking, and lighting.',
  },
]

const FAQS = [
  {
    q: 'Do I need a lantern, a headlamp, and a flashlight, or just one?',
    a: 'Most families end up with all three because they solve different problems, not the same problem at different price points. A headlamp is the one to buy first - it is hands-free for cooking and camp chores. A lantern comes next, so the whole group is not wearing headlamps at the dinner table. A flashlight is the one to add once you are camping somewhere with real dark - a campground away from streetlights, or a site near a treeline you want to scan.',
  },
  {
    q: 'Is a headlamp better than a flashlight for camping?',
    a: 'For most camp chores, yes - a headlamp keeps both hands free for cooking, tent stakes, or carrying a kid, and it points wherever you look. A flashlight wins on raw throw distance: scanning a dark treeline or lighting up something 100 feet away is a flashlight job, not a headlamp job.',
  },
  {
    q: 'Can a lantern replace a flashlight?',
    a: 'No - a lantern spreads light evenly in every direction, which is exactly wrong for throwing a beam a long distance. A lantern lights a table or a tent interior; it will not help you see something far away or aim a beam at a specific spot.',
  },
  {
    q: 'How many headlamps does a family need?',
    a: 'One per person, no exceptions. A single shared headlamp means someone is always without light at the exact moment they need both hands free - putting a kid to bed, finding a dropped item, or walking to the bathroom. Headlamps are inexpensive enough that outfitting the whole family is a small line item next to the rest of the gear list.',
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
    { name: 'Lantern vs headlamp vs flashlight', url: `${SITE_URL}${SLUG}` },
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
          keywords: ['camping lantern vs headlamp', 'best camping flashlight', 'camp lighting gear', 'family camping lighting'],
        })}
      />
      <JsonLd
        data={itemListGraph({
          name: 'Camping lighting: lantern, headlamp, and flashlight',
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
          These are not three tiers of the same product - they solve three different lighting
          problems at camp. Here is what each one actually does, and the order to buy them in.
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-8 pb-12">
        <QuickAnswer
          tldr="Headlamp first (hands-free for chores), lantern second (lights the whole table), flashlight third (long-throw for real dark). Most families end up with all three."
          summary={
            <>
              The <strong>{HEADLAMP.name}</strong> is the piece of gear to buy first - one per
              person, hands-free for cooking, tent setup, and the walk to the bathroom block. The{' '}
              <strong>{LANTERN.name}</strong> comes next: it lights the whole picnic table or tent
              interior at once, so the group is not sitting around in headlamp beams at dinner.
              The <strong>{FLASHLIGHT.name}</strong> is the upgrade for sites with real dark - a
              long-throw beam for scanning a treeline or finding your site from the parking lot.
              None of the three replaces the others; each covers a job the other two do not.
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
                <td className="px-5 py-4 font-medium text-stone-500">Light pattern</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.lightPattern}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Hands-free</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.handsFree}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Best for</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.bestFor}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Power</td>
                {PICKS.map((p) => <td key={p.product.id} className="px-5 py-4 text-stone-700 align-top">{p.power}</td>)}
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
            <strong>A headlamp is the one gap that ruins an evening.</strong> Cooking dinner,
            wrangling a kid into pajamas, or finding a dropped tent stake all need two free hands
            plus light exactly where you are looking. A shared flashlight or lantern cannot do
            that - someone is always holding the light instead of doing the job. One headlamp per
            person, including kids, is the non-negotiable first purchase.
          </p>
          <p>
            <strong>A lantern solves the &ldquo;whole group&rdquo; problem.</strong> Four headlamps
            pointed in four directions at a picnic table is not the same as one light source
            everyone can see by. A lantern on the table - or hung from the tent ceiling - lights
            the space instead of wherever one person happens to be looking.
          </p>
          <p>
            <strong>A flashlight earns its keep at genuinely dark sites.</strong> Developed
            campgrounds near other campers rarely need it. Sites away from light pollution -
            deep in a national forest, or a state park with no nearby town glow - are dark enough
            that a long-throw beam matters for finding your site, checking a noise near the
            treeline, or walking a trail after dinner.
          </p>
          <p>
            <strong>Buy in the order you will actually use them.</strong> Headlamp, then lantern,
            then flashlight - not because of price, but because that is the order a first-time
            family notices the gap. Most families who camp more than once end up owning all three
            within a season or two.
          </p>
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
          You&rsquo;ll land on the right plan and the right gear list for that plan.
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
