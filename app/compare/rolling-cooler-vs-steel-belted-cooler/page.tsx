import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/rolling-cooler-vs-steel-belted-cooler'
const TITLE = 'Rolling Cooler vs Steel-Belted: Which Coleman Cooler?'
const DESCRIPTION =
  'Coleman Rolling Cooler vs Steel-Belted 54-Quart compared: ice retention, capacity, portability, durability, and price. Pick the right camping cooler.'

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

const ROLLING = P('fwc-cooler-rolling')
const STEEL_BELTED = P('cooler-basic')

const FAQS = [
  {
    q: 'How long does ice last in a Coleman Steel-Belted cooler?',
    a: 'In normal summer conditions (75–85°F ambient), a pre-chilled Coleman Steel-Belted holds block ice 3 to 4 days. Keep it in the shade, pack it mostly full, and only open when you need something. The Rolling Cooler holds ice closer to 2 to 3 days because of the lighter walls.',
  },
  {
    q: 'Is a rolling cooler worth it for camping?',
    a: 'If the cooler has to move more than 30 feet from the car to the site — walk-in sites, longer pad-to-picnic-table distances, or any setup where you\'re carrying gear repeatedly — yes. For drive-up sites where the car is right next to the picnic table, the wheels are mostly dead weight.',
  },
  {
    q: 'How heavy is the Coleman Steel-Belted cooler when full?',
    a: 'The empty Steel-Belted is about 17 pounds. Fully loaded with drinks, food, and ice, it weighs 50 to 70 pounds. Two people can carry it with the side handles, but one-person carries are awkward over any distance.',
  },
  {
    q: 'Can a Coleman Rolling Cooler handle gravel or grass?',
    a: 'Gravel: yes, slowly. Grass: yes if the grass is mowed and dry. Sand, mud, and rough root-covered paths: the wheels bog down and you end up carrying it anyway. Rolling works best on hard surfaces between car and campsite.',
  },
  {
    q: 'What size cooler do I need for a weekend camping trip?',
    a: 'For a family of four over two nights, 50 to 60 quarts is the sweet spot. Both of these coolers are in that range — the Steel-Belted is 54 quarts, the Rolling Cooler is in the 50-quart neighborhood. Smaller and you\'re stuffing it; bigger and you\'re wasting cold air on empty space.',
  },
]

type Row = {
  product: AffiliateProduct
  label: string
  capacity: string
  ice: string
  portability: string
  durability: string
  bestFor: string
  price: string
}

const ROWS: Row[] = [
  {
    product: ROLLING,
    label: 'Coleman Rolling Cooler',
    capacity: '~50 qt',
    ice: '~2–3 days',
    portability: 'Wheels + handle',
    durability: 'Solid plastic',
    bestFor: 'Walk-in sites / short trips',
    price: '~$107',
  },
  {
    product: STEEL_BELTED,
    label: 'Coleman 54-Qt Steel-Belted',
    capacity: '54 qt',
    ice: '~3–4 days',
    portability: 'Two-handle carry',
    durability: 'Steel-belted shell',
    bestFor: 'Drive-up sites / long trips',
    price: '~$120',
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
          { name: 'Rolling Cooler vs Steel-Belted Cooler', url: `${SITE_URL}${SLUG}` },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Comparison
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          Rolling Cooler vs Steel-Belted: which Coleman cooler should you buy?
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Same brand, very different coolers. The Rolling Cooler is about
          getting there — wheels, telescoping handle, easy drag from car to
          site. The Steel-Belted is about keeping cold — classic insulated
          shell, longer ice retention, the cooler that lives in the trunk for
          years.
        </p>

        <div className="mt-10 rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
            Short answer
          </p>
          <p className="text-stone-800 leading-relaxed text-[17px]">
            Short answer: Pick the <strong>Coleman Rolling Cooler</strong> if
            you have any carry distance at all — walk-in sites, multiple trips
            from the car, a kid who can&rsquo;t help lift. Pick the{' '}
            <strong>Coleman Steel-Belted 54-Qt</strong> if you&rsquo;re
            drive-up, you want maximum ice retention, and you don&rsquo;t mind
            a two-person carry. For three-day trips and longer, the
            Steel-Belted&rsquo;s extra day of ice is the deciding factor.
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
                <th className="text-left font-medium text-stone-500 px-5 py-4">Capacity</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Ice retention</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Portability</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Durability</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Best for</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4 tabular-nums">Price</th>
                <th className="px-5 py-4" aria-hidden />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((r) => (
                <tr key={r.product.id}>
                  <td className="px-5 py-4 font-medium text-stone-900">{r.label}</td>
                  <td className="px-5 py-4 text-stone-600">{r.capacity}</td>
                  <td className="px-5 py-4 text-stone-600">{r.ice}</td>
                  <td className="px-5 py-4 text-stone-600">{r.portability}</td>
                  <td className="px-5 py-4 text-stone-600">{r.durability}</td>
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

      {/* ── Deep dive: Rolling ──────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Coleman Classic Rolling Cooler
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          The &ldquo;get it to the site&rdquo; cooler. Molded wheels, a
          telescoping handle, and enough insulation for a weekend. Loaded with
          drinks and a block of ice, you drag it from the trunk to the picnic
          table instead of carrying 50+ pounds by the handles.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ROLLING.imageUrl}
          alt={ROLLING.name}
          loading="lazy"
          width={1464}
          height={600}
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>Telescoping handle + wheels solve the carry problem entirely</li>
          <li>Ideal for walk-in sites, beach camping, tailgating</li>
          <li>~50-quart capacity is right for a weekend family trip</li>
          <li>Double-molded lid is easy to open one-handed</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>Thinner walls than the Steel-Belted — ice retention is ~1 day shorter</li>
          <li>Wheels are plastic; not great on sand, mud, or rough trail</li>
          <li>Telescoping handle is the first thing to fail over years of use</li>
        </ul>
        <a
          href={getProductUrl(ROLLING)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View the Rolling Cooler on Amazon
        </a>
      </section>

      {/* ── Deep dive: Steel-Belted ─────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Coleman 54-Qt Steel-Belted
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          The heirloom cooler. Thick-walled steel-belted shell, 54-quart
          capacity, ice retention measured in days rather than hours. It
          weighs 17 pounds empty and looks the part — the cooler that sits in
          the garage for twenty years.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STEEL_BELTED.imageUrl}
          alt={STEEL_BELTED.name}
          loading="lazy"
          width={1464}
          height={600}
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>Block ice lasts 3–4 days in summer conditions</li>
          <li>54-quart capacity holds a weekend of food + drinks easily</li>
          <li>Steel belts and classic design — nearly indestructible</li>
          <li>&ldquo;Have-A-Seat&rdquo; lid supports 250 lbs as extra seating</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>No wheels; a full load is a two-person carry</li>
          <li>17 lbs empty — heavier than most rolling coolers</li>
          <li>Takes up more trunk space than a rolling equivalent</li>
        </ul>
        <a
          href={getProductUrl(STEEL_BELTED)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View the Steel-Belted on Amazon
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
              Pick the Rolling Cooler if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              You have any real distance between the car and the site, or you
              camp alone with kids who can&rsquo;t help lift. Weekend trips
              with 2 or 3 days of ice retention are plenty. The wheels pay for
              themselves the first time you don&rsquo;t throw out your back.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Pick the Steel-Belted if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              You&rsquo;re doing drive-up sites where the car parks next to
              the picnic table, you want the longest possible ice retention,
              or you&rsquo;re going 3+ nights. The Steel-Belted&rsquo;s extra
              day of cold is the difference between a working cooler on day 3
              and a lukewarm bath.
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
          Coolers are one piece. The full guide covers the other categories —
          tents, sleep, stoves, lighting — with the same short-list approach.
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
