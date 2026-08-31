import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/6-person-vs-8-person-family-tent'
const TITLE = '6-Person vs 8-Person Family Tent: Which Size?'
const DESCRIPTION =
  '6-person vs 8-person family tent compared: floor size, standing height, real capacity, setup time, and price. The sizing rule that decides it for most families.'

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

const TENT_6P = P('core-6p-instant-cabin')
const TENT_8P = P('coleman-skydome-8p')

const FAQS = [
  {
    q: 'Can 2 adults and 3 kids fit in a 6-person tent?',
    a: 'Yes, comfortably - that\'s 5 people in a tent rated for 6, which is exactly the sizing rule at work. Add a queen air mattress for the parents and the kids on pads or a twin mattress, and there\'s still room to move. Once a family hits 6 people or the kids get bigger, step up to 8P.',
  },
  {
    q: 'Does an 8-person tent take longer to set up than a 6-person?',
    a: 'Slightly - both the CORE 6P and Coleman Skydome 8P use pre-attached poles, so setup is 60 seconds to 5 minutes either way. The bigger difference is breaking it down and folding it back into the bag; the 8P takes a bit more care to pack.',
  },
  {
    q: 'Is an 8-person tent worth it for a family of 5?',
    a: 'Often yes, for the same reason the "one size up" rule applies at every capacity level: a family of 5 in a 6-person tent is at rated capacity, which means no room for gear or growing kids. An 8-person tent gives that family real breathing room.',
  },
  {
    q: 'Do 6-person and 8-person tents both fit a queen air bed?',
    a: 'Yes, both. The 6-person CORE fits one queen bed with room for a second sleeping surface alongside it. The 8-person Skydome\'s 12×9 ft floor fits a queen bed plus a second full-size mattress or two kids\' pads with room to spare.',
  },
]

type Row = {
  product: AffiliateProduct
  label: string
  floor: string
  height: string
  bestFor: string
  setup: string
  price: string
}

const ROWS: Row[] = [
  {
    product: TENT_6P,
    label: 'CORE 6-Person Instant Cabin',
    floor: '11 × 9 ft',
    height: "6'0\" center",
    bestFor: 'Family of 4-5',
    setup: '60 sec',
    price: '~$200',
  },
  {
    product: TENT_8P,
    label: 'Coleman Skydome 8-Person',
    floor: '12 × 9 ft',
    height: "6'4\" center",
    bestFor: 'Family of 5+',
    setup: '~5 min',
    price: '~$165',
  },
]

export default function Page() {
  const breadcrumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: '6-Person vs 8-Person Family Tent', url: `${SITE_URL}${SLUG}` },
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
          keywords: ['6 person vs 8 person tent', 'family tent size', 'how big a tent do I need'],
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
          6-person vs 8-person family tent: which size do you need?
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Tent capacity ratings assume adults sleeping shoulder-to-shoulder with no gear. Here&rsquo;s
          the sizing rule that actually works, and how the two sizes compare in practice.
        </p>

        <div className="mt-10 rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
            Short answer
          </p>
          <p className="text-stone-800 leading-relaxed text-[17px]">
            Buy one size up from your headcount. A family of 4 buys a{' '}
            <strong>6-person tent</strong>. A family of 5 or more &mdash; or two families sharing
            one tent &mdash; buys an <strong>8-person tent</strong>. The extra floor space holds
            gear, gives kids room to spread out, and is the single most common thing first-time
            campers wish they&rsquo;d bought bigger.
          </p>
        </div>
      </header>

      {/* ── Comparison table ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-8 pb-20">
        <div className="overflow-x-auto rounded-2xl ring-1 ring-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left font-medium text-stone-500 px-5 py-4">Model</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Floor size</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Standing height</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Best for</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Setup time</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4 tabular-nums">Price</th>
                <th className="px-5 py-4" aria-hidden />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((r) => (
                <tr key={r.product.id}>
                  <td className="px-5 py-4 font-medium text-stone-900">{r.label}</td>
                  <td className="px-5 py-4 text-stone-600">{r.floor}</td>
                  <td className="px-5 py-4 text-stone-600">{r.height}</td>
                  <td className="px-5 py-4 text-stone-600">{r.bestFor}</td>
                  <td className="px-5 py-4 text-stone-600">{r.setup}</td>
                  <td className="px-5 py-4 text-stone-900 tabular-nums">{r.price}</td>
                  <td className="px-5 py-4 text-right">
                    <a
                      href={getProductUrl(r.product)}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-4 py-2 text-sm"
                    >
                      View
                    </a>
                  </td>
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

      {/* ── The sizing rule ─────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          The sizing rule, explained
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          Tent manufacturers rate capacity by the number of adults who fit sleeping
          shoulder-to-shoulder on the floor with no gear inside. That number is technically
          accurate and practically useless for a family bringing an air mattress, bags, and a
          cooler in with them.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          Buy one size up from your actual headcount. A family of 4 buys a 6-person tent, not a
          4-person. A family of 5, or a family of 4 that wants real room to spread out, buys an
          8-person. This single rule resolves most of the &ldquo;which size do I need&rdquo;
          confusion.
        </p>
      </section>

      {/* ── Deep dive: 6P ───────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          {TENT_6P.name}
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          11×9 ft floor, 6&rsquo;0&quot; center height, fits two queen air beds. The right call for
          a family of 4-5 that wants to stand up inside without stepping up to 8-person size and
          price.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TENT_6P.imageUrl}
          alt={TENT_6P.name}
          loading="lazy"
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>60-second pop-up setup - the fastest pitch of any tent in this comparison</li>
          <li>Near-vertical walls give genuine stand-up room in a compact footprint</li>
          <li>Cheaper and smaller to pack than the 8-person step-up</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>Tight once a family of 4 grows into bigger kids or more gear</li>
          <li>Not enough room for two families or a family of 6+</li>
        </ul>
        <a
          href={getProductUrl(TENT_6P)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View the {TENT_6P.name} on Amazon
        </a>
      </section>

      {/* ── Deep dive: 8P ───────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          {TENT_8P.name}
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          12×9 ft floor, 6&rsquo;4&quot; center height. The basecamp pick for a family of five or
          more, or two families who want to share one tent instead of pitching two.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TENT_8P.imageUrl}
          alt={TENT_8P.name}
          loading="lazy"
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>Fits a queen bed plus a second full-size mattress with room to walk around</li>
          <li>Tallest standing height of the two - 6&rsquo;4&quot; at the center</li>
          <li>WeatherTec system tested to 35 mph winds</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>Setup takes a few minutes longer than the pop-up 6-person</li>
          <li>Larger packed size takes up more trunk space</li>
        </ul>
        <a
          href={getProductUrl(TENT_8P)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View the {TENT_8P.name} on Amazon
        </a>
      </section>

      {/* ── How to decide ──────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-10">
          How to decide
        </h2>
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Pick the 6-person if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              You&rsquo;re a family of 4, maybe 5 with a young kid who takes up less floor. You
              want the fastest possible setup and a smaller, cheaper package.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Pick the 8-person if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              You&rsquo;re a family of 5 or more, your kids are bigger, or you regularly camp with
              extended family and want to fit everyone under one roof instead of coordinating two
              tents.
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

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-32 border-t border-stone-200 pt-16">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
          Keep going
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Not sure where to start on tents?
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Our full beginner tent guide covers sizing, dome vs. cabin, and weatherproofing in one
          place.
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
