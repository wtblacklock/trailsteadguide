import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/coleman-sundome-3p-vs-4p-vs-6p'
const TITLE = 'Coleman Sundome 3P vs 4P vs 6P: Which Size?'
const DESCRIPTION =
  'Coleman Sundome 3P vs 4P vs 6P compared: floor size, standing height, real capacity, setup time, and price. Pick the right size for your first camping trip.'

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

const SUNDOME_3 = P('tent-sundome-3')
const SUNDOME_4 = P('fwc-tent-sundome')
const SUNDOME_6 = P('tent-sundome-6')

const FAQS = [
  {
    q: 'Can two adults fit in a Coleman Sundome 3P?',
    a: 'Yes — two adults fit comfortably in the Sundome 3P with a full-size air bed, plus room for a small duffel. Two adults plus a child or a full queen bed is too tight; step up to the 4P for that.',
  },
  {
    q: 'Is the Coleman Sundome 4P too small for a family of 4?',
    a: 'It works for a family of 3–4 if the kids are small. Two adults plus two kids under 8 fit on a queen air bed plus two sleeping pads. Two adults plus two bigger kids will feel cramped — consider the 6P.',
  },
  {
    q: 'How weatherproof are Coleman Sundome tents?',
    a: 'All three Sundome sizes share the same WeatherTec system — welded corners, inverted seams, and a rainfly over the roof vents. They handle steady rain and moderate wind well. They are not four-season tents; skip them for heavy snow or sustained 40+ mph winds.',
  },
  {
    q: 'Are Coleman Sundome tents free-standing?',
    a: 'Yes. All three sizes are free-standing dome tents with a two-pole X-frame design. You can pitch the tent body without stakes, then stake out the rainfly and guy lines for weather resistance.',
  },
  {
    q: 'Do Coleman Sundome tents fit a queen air bed?',
    a: 'The 3P fits a full-size air bed, not a queen. The 4P fits a standard queen air bed with a narrow gear strip alongside it. The 6P fits a queen air bed plus two sleeping pads or a second twin mattress with plenty of room to walk around.',
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
    product: SUNDOME_3,
    label: 'Coleman Sundome 3P',
    floor: '7 × 7 ft',
    height: "4'11\" center",
    bestFor: '1–2 adults',
    setup: '~10 min',
    price: '~$90',
  },
  {
    product: SUNDOME_4,
    label: 'Coleman Sundome 4P',
    floor: '9 × 7 ft',
    height: "4'11\" center",
    bestFor: 'Family of 3–4',
    setup: '~10 min',
    price: '~$116',
  },
  {
    product: SUNDOME_6,
    label: 'Coleman Sundome 6P',
    floor: '10 × 10 ft',
    height: "6'0\" center",
    bestFor: 'Family of 5+',
    setup: '~15 min',
    price: '~$160',
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
            { name: 'Gear Guide', url: `${SITE_URL}/gear` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd data={faqPageGraph(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Gear Guide', url: `${SITE_URL}/gear` },
          { name: 'Coleman Sundome 3P vs 4P vs 6P', url: `${SITE_URL}${SLUG}` },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Comparison
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          Coleman Sundome 3P vs 4P vs 6P: which size should you buy?
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Same tent family, three sizes, very different trips. The 3P is a
          couple&rsquo;s tent. The 4P is the best-selling family starter. The 6P
          is a basecamp you can stand up in. Here&rsquo;s how to pick.
        </p>

        <div className="mt-10 rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
            Short answer
          </p>
          <p className="text-stone-800 leading-relaxed text-[17px]">
            Short answer: Pick the <strong>Sundome 3P</strong> if it&rsquo;s one
            or two adults. Pick the <strong>Sundome 4P</strong> if you&rsquo;re
            a family of three or four with small kids — it&rsquo;s the
            best-selling, safest first-trip choice and fits a queen air bed.
            Pick the <strong>Sundome 6P</strong> if you have a family of five
            or more, or you simply want to stand up inside the tent.
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
          Prices approximate and subject to change on Amazon. As an Amazon
          Associate we earn from qualifying purchases.
        </p>
      </section>

      {/* ── Deep dive: 3P ───────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Coleman Sundome 3P
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          The right pick if it&rsquo;s a couple, a solo camper with a lot of
          gear, or a parent-and-one-kid setup. 7 × 7 ft floor, 4&rsquo;11&quot;
          peak height — you sit up, you don&rsquo;t stand up.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SUNDOME_3.imageUrl}
          alt={SUNDOME_3.name}
          loading="lazy"
          width={1464}
          height={600}
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>Lightest and cheapest of the three — easy to store and carry</li>
          <li>Fits a full-size air bed with room for a small duffel</li>
          <li>Same WeatherTec rainfly and welded corners as the larger sizes</li>
          <li>Sets up in about 10 minutes with two poles</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>Too small for two adults plus a child with a queen air bed</li>
          <li>You cannot stand up inside — changing clothes is a crouch</li>
        </ul>
        <a
          href={getProductUrl(SUNDOME_3)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View the Sundome 3P on Amazon
        </a>
      </section>

      {/* ── Deep dive: 4P ───────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Coleman Sundome 4P
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          The default first-trip tent for families of three or four. 9 × 7 ft
          floor fits a queen air bed with a narrow gear strip, and it&rsquo;s
          the best-selling dome tent in its price bracket for a reason — it
          just works.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SUNDOME_4.imageUrl}
          alt={SUNDOME_4.name}
          loading="lazy"
          width={1000}
          height={1000}
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>Fits a queen air bed — the single biggest comfort upgrade on a first trip</li>
          <li>Same 10-minute setup as the 3P; the extra two feet of floor is &ldquo;free&rdquo;</li>
          <li>Proven weatherproofing with years of real-world reviews</li>
          <li>Small packed size — fits in any trunk</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>Still only 4&rsquo;11&quot; peak height — no standing room</li>
          <li>Tight for a family of four once the kids are over age 8</li>
        </ul>
        <a
          href={getProductUrl(SUNDOME_4)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View the Sundome 4P on Amazon
        </a>
      </section>

      {/* ── Deep dive: 6P ───────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Coleman Sundome 6P
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          The basecamp pick. 10 × 10 ft square floor, 6 ft center height — you
          can stand up, change clothes, and fit a queen air bed plus two
          sleeping pads. The right call for a family of five, or any family
          that wants to camp more than once.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SUNDOME_6.imageUrl}
          alt={SUNDOME_6.name}
          loading="lazy"
          width={1464}
          height={600}
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>Genuine 6&rsquo;0&quot; standing height in the center</li>
          <li>Square 10 × 10 floor is more flexible than the rectangular 4P</li>
          <li>Comfortably fits two adults and two or three kids</li>
          <li>Same WeatherTec system — handles real rain</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>Setup takes about 15 minutes and is easier with two people</li>
          <li>Larger packed size — takes up more trunk space</li>
        </ul>
        <a
          href={getProductUrl(SUNDOME_6)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View the Sundome 6P on Amazon
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
              Pick the 3P if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              You&rsquo;re camping as a couple, solo with a lot of gear, or one
              parent with one small kid. You want the cheapest, lightest
              Sundome and you don&rsquo;t need standing room. A full-size air
              bed is fine.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Pick the 4P if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              You&rsquo;re a family of three or four with small kids and this
              is your first tent. You want the safe, proven, best-selling
              choice that fits a queen air bed and pitches in ten minutes.
              This is the default recommendation.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Pick the 6P if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              You&rsquo;re a family of five or more, you have taller kids, or
              you already know you want to camp more than a couple of times a
              year. Standing room changes the experience — it&rsquo;s worth
              the extra ~$45 and five minutes of setup.
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
          See the full gear guide.
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Tents are one piece. The full guide covers the other categories —
          sleep, cooking, coolers, lighting — with the same short-list approach.
        </p>
        <Link
          href="/gear"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          See the full gear guide
        </Link>
      </section>
    </main>
  )
}
