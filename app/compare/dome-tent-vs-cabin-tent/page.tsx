import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/dome-tent-vs-cabin-tent'
const TITLE = 'Dome Tent vs. Cabin Tent for Families'
const DESCRIPTION =
  'Dome tent vs. cabin tent compared for family camping: setup time, wind resistance, headroom, weight, and price. Which style actually wins for car camping.'

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
})

function P(id: string): AffiliateProduct {
  const p = AFFILIATE_PRODUCTS.find((x) => x.id === id)
  if (!p) throw new Error(`Missing affiliate product: ${id}`)
  return p
}

const DOME = P('coleman-sundome-4p')
const CABIN = P('core-6p-instant-cabin')

const FAQS = [
  {
    q: 'Can a cabin tent handle wind as well as a dome tent?',
    a: 'No, not as well. A dome tent\'s curved pole structure sheds wind more effectively because the shape has no flat surface for gusts to push against. A cabin tent\'s near-vertical walls catch more wind — stake it out fully and use all the guylines in exposed or windy sites.',
  },
  {
    q: 'Is a cabin tent worth the extra weight for car camping?',
    a: 'For most families, yes. Car camping means the tent travels in a trunk, not a backpack, so the weight difference rarely matters in practice. The standing headroom it buys is a daily quality-of-life improvement for dressing kids and organizing gear.',
  },
  {
    q: 'Do dome tents pitch faster than cabin tents?',
    a: 'Traditionally yes, though modern instant/pop-up cabin tents have closed the gap — some cabin tents now pitch in 60 seconds, faster than a manual-pole dome tent. Compare specific models rather than assuming the style alone decides setup speed.',
  },
  {
    q: 'Which style is better for a rainy trip?',
    a: 'Either can handle rain well if it has a full-coverage rainfly and a bathtub floor — style isn\'t the deciding factor for weatherproofing. See our full guide on the best tent for rainy camping for what actually matters.',
  },
]

type Row = {
  label: string
  dome: string
  cabin: string
}

const ROWS: Row[] = [
  { label: 'Setup time', dome: '~10 min, 2 poles', cabin: '60 sec, pop-up' },
  { label: 'Wind resistance', dome: 'Best — curved shape sheds wind', cabin: 'Good — stake and guy fully' },
  { label: 'Standing headroom', dome: 'Low — sit up, don\'t stand', cabin: 'High — most adults stand upright' },
  { label: 'Weight', dome: 'Lighter, ~10 lbs', cabin: 'Heavier, ~23 lbs' },
  { label: 'Usable floor space', dome: 'Less — walls slope inward', cabin: 'More — matches rated floor size' },
  { label: 'Price', dome: DOME.priceRange ?? '', cabin: CABIN.priceRange ?? '' },
]

export default function Page() {
  const breadcrumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: 'Dome Tent vs. Cabin Tent', url: `${SITE_URL}${SLUG}` },
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
          keywords: ['dome tent vs cabin tent', 'cabin tent family camping', 'best tent style for families'],
        })}
      />
      <JsonLd data={faqPageGraph(FAQS)} />
      <Breadcrumbs items={breadcrumbs} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Comparison
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          Dome tent vs. cabin tent: which wins for families?
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Two structurally different shapes solve different problems. Here&rsquo;s what actually
          changes in practice, and which one wins for car camping with kids.
        </p>

        <div className="mt-10 rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
            Short answer
          </p>
          <p className="text-stone-800 leading-relaxed text-[17px]">
            <strong>Cabin tents</strong> win for most car-camping families — standing room to dress
            kids and organize gear is worth the extra weight and setup time when the tent travels
            in a trunk, not a backpack. Pick a <strong>dome tent</strong> instead if you want the
            lightest, cheapest option, or you&rsquo;re camping somewhere windy where the curved
            shape&apos;s better wind resistance matters more than headroom.
          </p>
        </div>
      </header>

      {/* ── Comparison table ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-8 pb-20">
        <div className="overflow-x-auto rounded-2xl ring-1 ring-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left font-medium text-stone-500 px-5 py-4 w-44">&nbsp;</th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">
                  <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                    Dome
                  </span>
                  {DOME.name}
                </th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">
                  <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                    Cabin
                  </span>
                  {CABIN.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <td className="px-5 py-4 font-medium text-stone-500">{r.label}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.dome}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.cabin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-stone-500">
          Prices approximate and subject to change on Amazon. As an Amazon Associate we earn from
          qualifying purchases.
        </p>
      </section>

      {/* ── Structural difference ───────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Why the shape changes everything
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          A dome tent uses curved, flexible poles that cross at the top, creating the classic
          rounded shape. The walls slope inward from the floor, which means the floor is larger
          than the usable space inside — you can&rsquo;t stand or sit upright near the edges. That
          curve is also what sheds wind well: there&rsquo;s no flat surface for gusts to push
          against.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          A cabin tent uses near-vertical or fully vertical wall poles, closer to the frame of a
          small room. The ceiling is higher — most adults can stand upright at the center — and the
          usable floor space matches the rated footprint almost exactly. The tradeoff is more
          surface area for wind to catch and a heavier overall structure.
        </p>
      </section>

      {/* ── Which wins for what ─────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-10">
          Which wins for&hellip;
        </h2>
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Toddlers and young kids
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Cabin tents win clearly. Standing room to change a diaper, dress a toddler, or just
              not crouch every time you enter is a real quality-of-life difference on a multi-day
              trip.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Windy sites
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Dome tents win. If the campground is known for exposed, windy sites, the curved
              structure&apos;s lower profile and wind-shedding shape matters more than standing height.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Budget and simplicity
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Dome tents win — they&apos;re typically cheaper, lighter, and simpler for a first-ever
              tent purchase when you&apos;re not sure camping will stick.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Multi-night comfort
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Cabin tents win. Over three or four nights, the ability to organize gear at standing
              height and move around without crouching adds up.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-20 border-t border-stone-200 pt-16">
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

      {/* ── Affiliate cards ──────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          See the picks
        </h2>
        <div className="space-y-6">
          {[DOME, CABIN].map((product) => (
            <a
              key={product.id}
              href={getProductUrl(product)}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="group flex flex-col sm:flex-row gap-5 rounded-2xl ring-1 ring-stone-200 hover:ring-stone-300 bg-cream/70 hover:bg-cream transition p-5 md:p-6"
            >
              <div className="shrink-0 w-full sm:w-44 h-40 sm:h-32 bg-stone-100 rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-2">
                  {product.priceRange}
                </p>
                <p className="font-serif text-xl font-semibold text-stone-950 group-hover:text-stone-700 mb-2">
                  {product.name}
                </p>
                <p className="text-stone-600 leading-relaxed text-[15px]">{product.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-32 border-t border-stone-200 pt-16">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
          Keep going
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          See the full tent guide.
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Sizing, weatherproofing, and every beginner tent question in one place.
        </p>
        <Link
          href="/guides/best-family-tent-for-beginners"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          Read the full tent guide
        </Link>
      </section>
    </main>
  )
}
