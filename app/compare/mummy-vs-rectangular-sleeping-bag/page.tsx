import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/mummy-vs-rectangular-sleeping-bag'
const TITLE = 'Mummy vs. Rectangular Sleeping Bag for Families'
const DESCRIPTION =
  'Mummy vs. rectangular sleeping bag for family camping: warmth, room to move, kids who roll, packed size, and price. Which shape wins on cold nights.'

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

const RECT = P('coleman-brazos-bag')
const MUMMY = P('teton-trailhead-20')
const LINER = P('sea-to-summit-reactor-extreme-liner')

const FAQS = [
  {
    q: 'Is a mummy sleeping bag warmer than a rectangular one?',
    a: 'Yes, at the same temperature rating and fill, a mummy bag sleeps warmer. The tapered shape leaves less empty air for your body to heat, and the hood seals the spot where most heat escapes. A rectangular bag has open shoulders and a wide footbox, so warm air pumps out every time the sleeper turns over.',
  },
  {
    q: 'Are mummy sleeping bags bad for kids who move around at night?',
    a: 'They take adjustment. Restless kids can feel trapped in a snug mummy and end up half out of it, which defeats the point. The fix is to let them sleep in it in the backyard or living room first. If a child truly hates it, a rectangular bag plus a liner, a hat, and an insulated pad is a perfectly good answer above about 40°F.',
  },
  {
    q: 'Can my child use an adult mummy bag?',
    a: 'Only if you shorten it. Empty space below a small child\'s feet is cold air their body has to heat all night. Stuff the extra length with a jacket, fold the bottom under and strap it, or buy a youth-length bag. A bag that fits the child is warmer than a longer bag with a lower rating.',
  },
  {
    q: 'What temperature rating should a family sleeping bag have for fall camping?',
    a: 'Read the comfort rating, not the big number on the label. Many budget bags print a survival or limit rating, and the comfort rating sits 15 to 30 degrees warmer. For fall nights in the 30s and 40s, look for a bag whose comfort rating is at or below the coldest forecast low, and pair it with an insulated sleeping pad.',
  },
]

type Row = {
  label: string
  rect: string
  mummy: string
}

const ROWS: Row[] = [
  { label: 'Warmth at same rating', rect: 'Lower - open shoulders, wide footbox', mummy: 'Higher - tapered cut plus hood' },
  { label: 'Room to move', rect: 'Lots - side and stomach sleepers fit', mummy: 'Snug - roll with the bag, not inside it' },
  { label: 'Kids who roll and kick', rect: 'Easy - hard to get tangled', mummy: 'Needs a practice night' },
  { label: 'Opens flat as a quilt', rect: 'Yes - great for warm nights', mummy: 'Partly, depending on the zipper' },
  { label: 'Packed size', rect: 'Bulky - fine in a trunk', mummy: 'Smaller - compression sack included' },
  { label: 'Price', rect: RECT.priceRange ?? '', mummy: MUMMY.priceRange ?? '' },
]

export default function Page() {
  const breadcrumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: 'Mummy vs. Rectangular Sleeping Bag', url: `${SITE_URL}${SLUG}` },
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
          keywords: [
            'mummy vs rectangular sleeping bag',
            'mummy sleeping bag for kids',
            'best sleeping bag shape for family camping',
          ],
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
          Mummy vs. rectangular sleeping bag: which shape for families?
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          The shape of a bag changes how warm it sleeps as much as the number on the label does.
          Here&rsquo;s when the roomy rectangle is enough, and when the snug mummy earns its keep.
        </p>

        <div className="mt-10 rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
            Short answer
          </p>
          <p className="text-stone-800 leading-relaxed text-[17px]">
            <strong>Rectangular bags</strong> win for summer and early-fall car camping when nights
            stay above about 45&deg;F. They are cheaper, roomier, easy for restless kids, and open
            flat as a quilt on warm nights. Switch to a <strong>mummy bag</strong> once lows drop
            into the 30s and low 40s. At the same temperature rating, the tapered cut and hood hold
            noticeably more heat, which matters more than legroom on a cold October night. Whichever
            shape you pick, read the comfort rating rather than the big number on the label, size
            the bag to the sleeper so kids are not heating empty footbox space, and put an
            insulated pad underneath, because the ground steals more heat than the air does. Many
            families end up with both: rectangles for summer, mummies for the shoulder season, and
            a liner to bridge the gap.
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
                    Rectangular
                  </span>
                  {RECT.name}
                </th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">
                  <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                    Mummy
                  </span>
                  {MUMMY.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <td className="px-5 py-4 font-medium text-stone-500">{r.label}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.rect}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.mummy}</td>
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

      {/* ── Why shape matters ───────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Why the shape changes the warmth
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          A sleeping bag does not make heat. It traps the heat your body makes. Every bit of empty
          air inside the bag is air you have to warm up, and every gap at the shoulders is a door
          for that warm air to leave. A rectangular bag has plenty of both: a wide footbox, square
          shoulders, and no hood. Each time a sleeper rolls over, the bag bellows warm air out and
          pulls cold air in.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          A mummy bag tapers from the shoulders to the feet and closes around the head with a
          drawstring hood. Less dead air, smaller gaps, and a covered head mean the same amount of
          insulation goes further. That is why two bags with the same rating can feel 10 degrees
          apart on the same night.
        </p>
      </section>

      {/* ── Ratings ─────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Read the comfort rating, not the headline number
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          Bags tested to the ISO 23537 standard (which replaced the older EN 13537) list a comfort
          rating and a lower limit rating. Comfort is roughly where a cold sleeper stays warm lying
          relaxed. Limit is where a warm sleeper can get through the night curled up. Many budget
          bags skip the test and print a single survival number instead, which is the coldest
          temperature you would live through, not sleep well in.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          The TETON TrailHead in this comparison is a good example: the listing calls it survival
          rated to 20&deg;F and says comfort runs 20 to 30 degrees higher. Kids generally sleep
          colder than adults, so for a family trip, plan around the comfort end. Our{' '}
          <Link href="/guides/best-camping-sleeping-bag-for-kids">kids&apos; sleeping bag guide</Link>{' '}
          covers sizing and ratings for each age range in more detail.
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
              Summer and warm early-fall weekends
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Rectangular wins. On a 55&deg;F night a mummy bag is more than you need, and being
              able to unzip a rectangle into a loose quilt is the best way to keep a warm kid from
              sweating and then waking up chilled.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              October and November nights in the 30s and 40s
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Mummy wins. This is where the hood and tapered cut pay for themselves. If you already
              own rectangles, a liner and a warm hat close some of the gap, but a mummy bag is the
              real upgrade once the forecast low starts with a 3.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Restless sleepers and younger kids
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Rectangular is easier, but not automatically warmer for them. Try a mummy at home on
              a living-room campout first. Many kids settle in after one night, and a bag they stay
              inside beats a roomy bag they kick off at 2 a.m.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Tight budgets
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Rectangular wins on sticker price, and a {LINER.priceRange} liner stretches it into
              cooler nights. Just do not let a bargain bag&apos;s survival rating talk you into a
              trip that is colder than its comfort range.
            </p>
          </div>
        </div>
      </section>

      {/* ── System ──────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          The bag is only half of the system
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          The insulation under a sleeper gets crushed flat, so a bag does almost nothing between
          your back and the ground. On cold nights an uninsulated air mattress can make even a good
          mummy bag feel cold. Put an insulated pad under every sleeper, add dry base layers and a
          hat, and send kids to the bathroom right before bed.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          Our guide to{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">keeping kids warm while camping</Link>{' '}
          walks through the full night routine, and the{' '}
          <Link href="/compare/best-beginner-sleeping-system">beginner sleeping system comparison</Link>{' '}
          pairs bags with pads at three price points.
        </p>
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
          {[RECT, MUMMY, LINER].map((product) => (
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
          Heading out this fall?
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Layering, campsite picks, and what changes when the nights get long and cold.
        </p>
        <Link
          href="/guides/fall-camping-for-beginners"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          Read the fall camping guide
        </Link>
      </section>
    </main>
  )
}
