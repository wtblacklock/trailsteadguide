import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/sleeping-bag-vs-cot-airbed-combo'
const TITLE = 'Air Mattress vs Cot Combo vs Pad: What to Sleep On'
const DESCRIPTION =
  'Air mattress vs cot-airbed combo vs sleeping pad compared for car campers: comfort, setup, packed size, durability, and price. Pick the right sleep system.'

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

const AIR_MATTRESS = P('air-mattress-queen')
const COT_COMBO = P('fwc-cot-airbed-combo')
const PAD = P('sleeping-pad-air')

const FAQS = [
  {
    q: 'Which is more comfortable for car camping: an air mattress or a cot combo?',
    a: 'A queen air mattress like the SoundAsleep Dream Series is the most bed-like option — closest to sleeping at home. A cot-airbed combo gets you off the ground, which is warmer and easier on backs, but the cot frame can feel firmer at the edges. A sleeping pad is the least comfortable of the three but the easiest to pack and the cheapest.',
  },
  {
    q: 'Do I need a sleeping pad if I have an air mattress?',
    a: 'No, but you may want one anyway. Air mattresses lose heat to the ground because the air inside conducts cold. A thin foam pad or quilt under the mattress dramatically improves warmth in shoulder-season trips. A self-inflating pad on top of an air mattress is overkill.',
  },
  {
    q: 'How long does it take to set up a queen air mattress vs a cot combo?',
    a: 'A queen air mattress with a built-in pump inflates in about 4 minutes. A cot-airbed combo takes about 8 to 10 minutes — the cot frame snaps together, then the airbed inflates on top. A sleeping pad self-inflates in 5 to 10 minutes with no pump needed.',
  },
  {
    q: 'Will a queen air mattress fit in a 4-person tent?',
    a: 'Yes, in a Coleman Sundome 4P with a narrow gear strip alongside it. In a 3-person tent, a queen is too wide — use a full-size air mattress instead. In a 6-person tent, a queen plus two sleeping pads fits with room to walk around.',
  },
  {
    q: 'Are cot-airbed combos worth the extra cost?',
    a: 'Worth it if you camp more than two nights at a time, or anyone in your family has back issues that getting off the ground would solve. For one-night trips with no back problems, a queen air mattress on the tent floor is plenty.',
  },
]

type Row = {
  product: AffiliateProduct
  label: string
  comfort: string
  setup: string
  packed: string
  bestFor: string
  price: string
}

const ROWS: Row[] = [
  {
    product: AIR_MATTRESS,
    label: 'SoundAsleep Dream Series Queen',
    comfort: 'Bed-like',
    setup: '~4 min (built-in pump)',
    packed: 'Bag-of-bowling-balls size',
    bestFor: 'Comfort-first family trips',
    price: '~$120',
  },
  {
    product: COT_COMBO,
    label: 'Coleman Queen Airbed Cot Combo',
    comfort: 'Off the ground, firmer edges',
    setup: '~8–10 min (frame + airbed)',
    packed: 'Long duffel — takes trunk space',
    bestFor: 'Multi-night trips / back issues',
    price: '~$30',
  },
  {
    product: PAD,
    label: 'TETON Sports ComfortLite Pad',
    comfort: 'Firm but warm',
    setup: '~5–10 min (self-inflating)',
    packed: 'Compact, fits backpack',
    bestFor: 'Budget / minimal trips',
    price: '~$75',
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
            { name: 'Gear Guide', url: `${SITE_URL}/gear-guide` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd data={faqPageGraph(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Gear Guide', url: `${SITE_URL}/gear-guide` },
          { name: 'Air Mattress vs Cot Combo vs Pad', url: `${SITE_URL}${SLUG}` },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Comparison
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          Air mattress vs cot combo vs sleeping pad: what to sleep on
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Three legitimate ways to sleep at a campsite — bed-like, off-the-ground,
          or compact-and-cheap. Here&rsquo;s how to pick.
        </p>

        <div className="mt-10 rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
            Short answer
          </p>
          <p className="text-stone-800 leading-relaxed text-[17px]">
            Short answer: pick the <strong>SoundAsleep Dream Series queen
            air mattress</strong> if comfort is the priority and you have a 4P+
            tent. Pick the <strong>Coleman Queen Airbed Cot Combo</strong> if
            you camp multiple nights at a time or anyone in the family has back
            issues that being off the ground solves. Pick the{' '}
            <strong>TETON ComfortLite sleeping pad</strong> if you&rsquo;re on a
            budget, going minimalist, or doing a one-nighter.
          </p>
        </div>
      </header>

      {/* ── Comparison table ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-8 pb-20">
        <div className="overflow-x-auto rounded-2xl ring-1 ring-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left font-medium text-stone-500 px-5 py-4">Option</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Comfort</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Setup</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Packed size</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Best for</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4 tabular-nums">Price</th>
                <th className="px-5 py-4" aria-hidden />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((r) => (
                <tr key={r.product.id}>
                  <td className="px-5 py-4 font-medium text-stone-900">{r.label}</td>
                  <td className="px-5 py-4 text-stone-600">{r.comfort}</td>
                  <td className="px-5 py-4 text-stone-600">{r.setup}</td>
                  <td className="px-5 py-4 text-stone-600">{r.packed}</td>
                  <td className="px-5 py-4 text-stone-600">{r.bestFor}</td>
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

      {/* ── Deep dive: Air Mattress ─────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          SoundAsleep Dream Series Queen Air Mattress
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          The closest thing to your bed at home, on the floor of a tent. Built-in
          pump inflates a true queen in about four minutes. Holds air through
          the night without the slow-leak that ruins cheaper mattresses.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={AIR_MATTRESS.imageUrl}
          alt={AIR_MATTRESS.name}
          loading="lazy"
          width={679}
          height={679}
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>Bed-like comfort — fits sheets and pillows from home</li>
          <li>Built-in primary pump plus a backup valve for top-up</li>
          <li>40 ComfortCoils stay flat instead of bowing in the middle</li>
          <li>Queen size fits a Coleman Sundome 4P or larger</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>Cold underneath in shoulder seasons — add a thin pad below</li>
          <li>Bulky packed — takes up trunk space when deflated</li>
          <li>Pump needs a 110V outlet (electric site or inverter)</li>
        </ul>
        <a
          href={getProductUrl(AIR_MATTRESS)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View on Amazon
        </a>
      </section>

      {/* ── Deep dive: Cot Combo ────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Coleman Queen Airbed Cot Combo
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          A folding steel cot with a queen airbed mounted on top. Gets you a
          full foot off the ground — warmer, easier to climb in and out of, and
          a noticeable difference for anyone with back issues. Setup is longer
          than a plain air mattress, but the comfort upgrade is real.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={COT_COMBO.imageUrl}
          alt={COT_COMBO.name}
          loading="lazy"
          width={1500}
          height={1500}
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>Off the ground — warmer in shoulder seasons</li>
          <li>Side tables fold out for headlamps, water, glasses</li>
          <li>Easier to get in and out of than a floor mattress</li>
          <li>Queen size fits two adults comfortably</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>Longer setup — frame plus airbed inflation</li>
          <li>Heavier and bulkier packed than a plain mattress</li>
          <li>Frame edges can feel firm if you sleep near the side</li>
          <li>Needs more tent floor space — verify your tent fits the footprint</li>
        </ul>
        <a
          href={getProductUrl(COT_COMBO)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View on Amazon
        </a>
      </section>

      {/* ── Deep dive: Sleeping Pad ─────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          TETON Sports ComfortLite Sleeping Pad
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          A self-inflating foam pad — open the valve, walk away, come back to a
          ready-to-sleep mat. Less comfortable than a real mattress but warmer
          than air alone, and packs down small enough to throw in any duffel.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PAD.imageUrl}
          alt={PAD.name}
          loading="lazy"
          width={1500}
          height={1500}
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>No pump needed — self-inflates in 5 to 10 minutes</li>
          <li>Warmer than air mattresses thanks to foam insulation</li>
          <li>Compact when rolled — fits in any car or backpack</li>
          <li>Cheapest of the three options</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>Firmer than a mattress — adjusts to take some getting used to</li>
          <li>Single-person — couples need two pads</li>
          <li>You feel the ground under you, just less of it</li>
        </ul>
        <a
          href={getProductUrl(PAD)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View on Amazon
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
              Pick the air mattress if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              You want camping to feel close to home. You have a 4P+ tent and
              an electric hookup or an inverter. Comfort is the deal-breaker
              that decides if your family wants to repeat this.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Pick the cot combo if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              You camp two or more nights at a time, anyone in the family has
              back issues, or you camp in shoulder seasons where ground-cold
              becomes a real factor. The off-the-ground difference is bigger
              than it sounds.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Pick the pad if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Budget matters, you&rsquo;re going one night, you&rsquo;re packing
              tight, or you&rsquo;re testing if camping is for your family
              before investing in a real sleep system.
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
          Sleep is one piece. The full guide covers the rest — tents, stoves,
          coolers, lighting — with the same short-list approach.
        </p>
        <Link
          href="/gear-guide"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          See the full gear guide
        </Link>
      </section>
    </main>
  )
}
