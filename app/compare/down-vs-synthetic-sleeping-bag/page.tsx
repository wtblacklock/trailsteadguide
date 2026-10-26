import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/down-vs-synthetic-sleeping-bag'
const TITLE = 'Down vs. Synthetic Sleeping Bag for Families'
const DESCRIPTION =
  'Down vs. synthetic sleeping bag for family camping: warmth when wet, weight, washing, lifespan, and price. Which fill wins for car camping with kids.'

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

const DOWN = P('kelty-cosmic-20-down')
const SYNTHETIC = P('teton-trailhead-20')

const FAQS = [
  {
    q: 'Is a down sleeping bag warmer than a synthetic one?',
    a: 'Not at the same temperature rating. A 20°F down bag and a 20°F synthetic bag are built to keep you about equally warm. The difference is that the down bag reaches that warmth with less weight and packs much smaller. Where synthetic pulls ahead is when the bag gets damp, because synthetic fibers keep most of their loft and down clumps and goes flat.',
  },
  {
    q: 'What happens if a down sleeping bag gets wet?',
    a: 'Wet down collapses into clumps and loses most of its insulating loft, so the bag stops keeping you warm until it is fully dried, which can take a day or more and is hard to do at a campsite. Water-resistant treated down and a DWR shell help with condensation and light moisture, but they will not save a bag that gets soaked by a leak or a spill.',
  },
  {
    q: 'Which is better for kids, down or synthetic?',
    a: 'Synthetic, for most families. Kids spill drinks, drag bags across wet ground, and have the occasional nighttime accident. A synthetic bag shrugs off dampness, goes straight into a home washing machine, and costs a fraction of a down bag that a child will outgrow in a few years.',
  },
  {
    q: 'How long does a down sleeping bag last compared to synthetic?',
    a: 'Down lasts longer with good care. Quality down can keep its loft for well over a decade if it is stored loose and kept clean, while synthetic insulation slowly breaks down each time it is compressed and usually feels noticeably flatter after several years of regular use. Storing either bag uncompressed slows that loss.',
  },
]

type Row = {
  label: string
  down: string
  synthetic: string
}

const ROWS: Row[] = [
  { label: 'Temp rating (these picks)', down: '20°F', synthetic: '20°F' },
  { label: 'Warmth when damp', down: 'Poor - down clumps and goes flat', synthetic: 'Good - keeps most of its loft' },
  { label: 'Weight for the warmth', down: 'Lighter', synthetic: 'Heavier' },
  { label: 'Packed size', down: 'Small - compresses tightly', synthetic: 'Bulky - takes more trunk space' },
  { label: 'Washing', down: 'Special down soap, long tumble dry', synthetic: 'Home washer and dryer, low heat' },
  { label: 'Lifespan with care', down: '10+ years', synthetic: 'Several years before loft fades' },
  { label: 'Price', down: DOWN.priceRange ?? '', synthetic: SYNTHETIC.priceRange ?? '' },
]

export default function Page() {
  const breadcrumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: 'Down vs. Synthetic Sleeping Bag', url: `${SITE_URL}${SLUG}` },
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
            'down vs synthetic sleeping bag',
            'synthetic sleeping bag for kids',
            'down sleeping bag wet',
            'best sleeping bag fill for family camping',
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
          Down vs. synthetic sleeping bag: which fill wins for families?
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Two bags with the same temperature rating can behave very differently once a tent gets
          damp or a kid spills cocoa. Here&rsquo;s what the fill actually changes, and which one
          to buy before cold-season trips.
        </p>

        <div className="mt-10 rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
            Short answer
          </p>
          <p className="text-stone-800 leading-relaxed text-[17px]">
            <strong>Synthetic</strong> wins for most car-camping families. A synthetic bag keeps
            most of its warmth when it gets damp from condensation, wet ground, or a spilled
            drink, it goes straight into a home washing machine, and it costs roughly a third of a
            down bag with the same temperature rating. Those three things matter more with kids
            than saving a pound of weight in a car trunk. Pick <strong>down</strong> instead when
            weight and packed size genuinely matter, such as backpacking, a small car packed to
            the roof, or cold, dry climates, and when the sleeper is an adult or older kid who
            will keep the bag dry and use it for a decade. Whichever fill you choose, match the
            temperature rating to your coldest expected night, add a warm sleeping pad, and store
            the bag loose rather than in its stuff sack between trips.
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
                    Down
                  </span>
                  {DOWN.name}
                </th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">
                  <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                    Synthetic
                  </span>
                  {SYNTHETIC.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <td className="px-5 py-4 font-medium text-stone-500">{r.label}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.down}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.synthetic}</td>
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

      {/* ── How each fill works ─────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          How each fill keeps you warm
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          Both fills work the same way: they trap still air close to your body. The more loft the
          fill has, the more air it traps and the warmer the bag. Down is the soft under-feathers
          of ducks or geese, and it lofts up enormously for its weight. That&rsquo;s what
          &ldquo;fill power&rdquo; measures: a 550 fill power bag like the Kelty Cosmic is solid
          mid-range down, and backpacking bags go up to 800 or more.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          Synthetic fill is polyester fiber spun to mimic that loft. It needs more material to
          trap the same amount of air, so a synthetic bag is heavier and bulkier at the same
          rating. The tradeoff runs the other way when water shows up: down clusters soak up
          moisture and collapse, while synthetic fibers hold their shape and keep insulating.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          That moisture point matters more in fall than people expect. Cold nights mean heavy{' '}
          <Link href="/guides/fall-camping-for-beginners" className="underline underline-offset-2">
            condensation inside the tent
          </Link>
          , and a bag that touches a wet tent wall all night can lose real warmth by morning if
          it&rsquo;s down.
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
              Kids and toddlers
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Synthetic wins clearly. Spills, muddy feet, and nighttime accidents happen, and a
              synthetic bag can be washed at home and dried the same day. Kids also outgrow bags,
              so the lower price stings less. Our{' '}
              <Link href="/guides/best-camping-sleeping-bag-for-kids" className="underline underline-offset-2">
                kids&rsquo; sleeping bag guide
              </Link>{' '}
              covers sizing and temperature ratings by age.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Damp or rainy climates
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Synthetic wins. In the Pacific Northwest, the Southeast, or any fall trip with rain
              in the forecast, a fill that keeps working when damp is worth the extra bulk. See
              our{' '}
              <Link href="/guides/rainy-camping-trips" className="underline underline-offset-2">
                rainy camping guide
              </Link>{' '}
              for keeping the inside of the tent dry in the first place.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Packing a full car
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Down wins. Four synthetic 20°F bags take up a surprising amount of trunk space. If
              you&rsquo;re already playing cargo Tetris with a cooler, tent, and stroller, down
              bags for the adults can free up real room.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Long-term value for adults
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Down wins, if you&rsquo;ll keep it dry. A well-cared-for down bag can stay lofty for
              well over a decade, so the higher upfront price evens out for a parent who camps
              several times a year. A synthetic bag is the better bet if you&rsquo;re not sure
              camping will stick.
            </p>
          </div>
        </div>
      </section>

      {/* ── Care ────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Making either bag work on a cold night
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-stone-700 leading-relaxed text-lg">
          <li>
            <strong>The pad matters as much as the fill.</strong> Any bag gets crushed flat under
            your body, so the ground pulls heat from below. An insulated pad does that job, not
            the bag.
          </li>
          <li>
            <strong>Read the rating as a limit, not a comfort level.</strong> Most people sleep
            comfortably about 10 to 15 degrees above a bag&rsquo;s number, and kids and cold
            sleepers need more margin.
          </li>
          <li>
            <strong>Keep down away from tent walls.</strong> Push the bag toward the middle of the
            tent and vent the tent so condensation stays off the fabric.
          </li>
          <li>
            <strong>Store both loose.</strong> Hang the bag or keep it in a large cotton storage
            sack at home. Living in a compression sack is what wears out loft fastest.
          </li>
        </ul>
        <p className="text-stone-700 leading-relaxed text-lg mt-6">
          For the full layering, hot-water-bottle, and bedtime routine, see{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping" className="underline underline-offset-2">
            how to keep kids warm camping
          </Link>
          .
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
          {[SYNTHETIC, DOWN].map((product) => (
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
          Build the whole sleep setup.
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Bag, pad, and pillow picks in three tiers, from a summer budget combo to a cold-weather
          upgrade.
        </p>
        <Link
          href="/compare/best-beginner-sleeping-system"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          See the sleeping system picks
        </Link>
      </section>
    </main>
  )
}
