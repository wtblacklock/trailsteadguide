import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/camp-chef-everest-vs-coleman-classic-1-burner'
const TITLE = 'Camp Chef Everest vs Coleman 1-Burner: Which Stove?'
const DESCRIPTION =
  'Camp Chef Everest 2-burner vs Coleman Classic 1-burner compared: BTU output, ignition, pot size, wind resistance, and price. Pick the right camp stove.'

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

const EVEREST = P('stove-2-burner')
const COLEMAN_1 = P('fwc-stove-coleman-1burner')

const FAQS = [
  {
    q: 'Is a 2-burner stove worth it over a 1-burner for camping?',
    a: 'For a family of three or more, yes. You cannot realistically cook pasta and sauce, or eggs and bacon, on a single burner without one dish going cold. For a solo camper or couple doing simple meals, a 1-burner is plenty.',
  },
  {
    q: 'How many BTU do I need in a camp stove?',
    a: 'For a solo or couple on simple meals, 10,000 to 15,000 BTU per burner is enough. For family cooking and wind resistance, 20,000 BTU per burner is the real-world threshold. The Camp Chef Everest puts out 20,000 per burner (40,000 total); the Coleman 1-Burner is closer to 10,000.',
  },
  {
    q: 'Can you cook with a cast-iron skillet on a Coleman 1-Burner?',
    a: 'Yes, a 10-inch skillet fits. Larger than 12 inches overhangs the burner and heats unevenly. The Camp Chef Everest fits two 12-inch skillets side by side.',
  },
  {
    q: 'Is the Camp Chef Everest wind-resistant?',
    a: 'Yes. The Everest has three-sided wind baffles and performs well in 15 to 20 mph wind. The Coleman Classic 1-Burner has no windscreen and struggles in any breeze — you will need to rig a foil wind block or cook in the lee of the car.',
  },
  {
    q: 'Do both stoves use the same propane canisters?',
    a: 'Yes. Both use standard 1-pound green propane bottles and both can be adapted to a 20-pound tank with a $20 hose. A single 1-pound canister runs the Everest about 1 hour on high or the Coleman 1-Burner about 2 hours on high.',
  },
]

type Row = {
  product: AffiliateProduct
  label: string
  burners: string
  btu: string
  ignition: string
  bestFor: string
  wind: string
  price: string
}

const ROWS: Row[] = [
  {
    product: EVEREST,
    label: 'Camp Chef Everest 2X',
    burners: '2',
    btu: '40,000 total (20k × 2)',
    ignition: 'Matchless electric',
    bestFor: 'Family / real cooking',
    wind: 'Three-sided baffles',
    price: '~$210',
  },
  {
    product: COLEMAN_1,
    label: 'Coleman Classic 1-Burner',
    burners: '1',
    btu: '~10,000',
    ignition: 'Match or lighter',
    bestFor: 'Solo / weekend basics',
    wind: 'None',
    price: '~$40',
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
          { name: 'Camp Chef Everest vs Coleman 1-Burner', url: `${SITE_URL}${SLUG}` },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Comparison
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          Camp Chef Everest vs Coleman 1-Burner: which camp stove should you buy?
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Two very different stoves, two very different trips. The Everest is a
          real outdoor kitchen — 40,000 BTU, two burners, matchless ignition.
          The Coleman 1-Burner is a $40 solution for boiling water and cooking
          one thing at a time. Here&rsquo;s how to pick.
        </p>

        <div className="mt-10 rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
            Short answer
          </p>
          <p className="text-stone-800 leading-relaxed text-[17px]">
            Short answer: Pick the <strong>Camp Chef Everest 2X</strong> if
            you&rsquo;re cooking for a family or want to make real meals at
            camp — two 20,000 BTU burners, wind baffles, and an electric
            igniter change the experience completely. Pick the{' '}
            <strong>Coleman Classic 1-Burner</strong> if it&rsquo;s one or two
            people doing simple meals, or if budget is tight — it&rsquo;s a
            rock-solid $40 stove that boils water and cooks a skillet.
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
                <th className="text-left font-medium text-stone-500 px-5 py-4">Burners</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">BTU</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Ignition</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Best for</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4">Wind</th>
                <th className="text-left font-medium text-stone-500 px-5 py-4 tabular-nums">Price</th>
                <th className="px-5 py-4" aria-hidden />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((r) => (
                <tr key={r.product.id}>
                  <td className="px-5 py-4 font-medium text-stone-900">{r.label}</td>
                  <td className="px-5 py-4 text-stone-600">{r.burners}</td>
                  <td className="px-5 py-4 text-stone-600">{r.btu}</td>
                  <td className="px-5 py-4 text-stone-600">{r.ignition}</td>
                  <td className="px-5 py-4 text-stone-600">{r.bestFor}</td>
                  <td className="px-5 py-4 text-stone-600">{r.wind}</td>
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

      {/* ── Deep dive: Everest ──────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Camp Chef Everest 2X
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          The benchmark 2-burner camping stove. 40,000 total BTU, matchless
          ignition, three-sided wind baffles, and enough room to run two
          12-inch skillets. It&rsquo;s the stove that turns camp cooking from
          &ldquo;boil something&rdquo; into actual meals.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={EVEREST.imageUrl}
          alt={EVEREST.name}
          loading="lazy"
          width={1464}
          height={600}
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>20,000 BTU per burner — boils water fast, sears well</li>
          <li>Matchless electric ignition (no hunting for the lighter)</li>
          <li>Wind baffles actually work; usable in 15–20 mph winds</li>
          <li>Fits two 12-inch skillets or pots side by side</li>
          <li>Independent burner knobs with good low-flame control</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>~$210 is a real investment compared to single-burner options</li>
          <li>Heavier and larger packed — takes a meaningful chunk of trunk space</li>
          <li>A 1-pound propane canister runs it ~1 hour on high, so longer trips want a 20-pound tank adapter</li>
        </ul>
        <a
          href={getProductUrl(EVEREST)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View the Camp Chef Everest on Amazon
        </a>
      </section>

      {/* ── Deep dive: Coleman 1-Burner ─────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Coleman Classic 1-Burner
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg mb-8">
          The $40 workhorse. One burner, ~10,000 BTU, propane from a standard
          1-pound canister. It boils water, it heats a can of chili, it cooks
          eggs in a 10-inch skillet. That&rsquo;s the job, and it does it
          reliably.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={COLEMAN_1.imageUrl}
          alt={COLEMAN_1.name}
          loading="lazy"
          width={1464}
          height={600}
          className="w-full h-auto rounded-2xl ring-1 ring-stone-200 mb-8"
        />
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Pros</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-6">
          <li>$40 is the lowest real entry point for a decent camp stove</li>
          <li>Compact — packs small, fits in a single crate</li>
          <li>Uses the same 1-pound propane bottles as the Everest</li>
          <li>Nearly indestructible; the design has been unchanged for decades</li>
        </ul>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Tradeoffs</h3>
        <ul className="text-stone-700 leading-relaxed list-disc pl-6 space-y-1 mb-8">
          <li>Only one burner — realistic family cooking requires you to stage dishes</li>
          <li>No wind protection; even a light breeze drops the effective output significantly</li>
          <li>Match-lit; no igniter</li>
          <li>10-inch skillet is the practical max pan size</li>
        </ul>
        <a
          href={getProductUrl(COLEMAN_1)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          View the Coleman 1-Burner on Amazon
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
              Pick the Camp Chef Everest if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              You&rsquo;re cooking for a family of three or more, you want to
              make real meals (pasta + sauce, eggs + bacon) at the same time,
              or you camp somewhere windy. The matchless ignition and 40,000
              BTU make camp cooking feel like home cooking.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Pick the Coleman 1-Burner if&hellip;
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              You&rsquo;re solo or a couple, you&rsquo;re camping on a tight
              budget, or your meal plan is simple (boil water, heat a can,
              fry an egg). It&rsquo;s five times cheaper and does the basics
              fine.
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
          Stoves are one piece. The full guide covers the other categories —
          tents, sleep, coolers, lighting — with the same short-list approach.
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
