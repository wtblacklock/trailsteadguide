import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/foam-vs-inflatable-sleeping-pad'
const TITLE = 'Foam vs. Inflatable Sleeping Pad for Families'
const META_TITLE = 'Foam vs. Inflatable Sleeping Pad'
const DESCRIPTION =
  'Foam vs. self-inflating vs. air sleeping pad for family camping: warmth, comfort, durability with kids, packed size, and price. Which wins on cold nights.'

export const metadata = pageMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
})

function P(id: string): AffiliateProduct {
  const p = AFFILIATE_PRODUCTS.find((x) => x.id === id)
  if (!p) throw new Error(`Missing affiliate product: ${id}`)
  return p
}

const FOAM = P('therm-a-rest-z-lite-sol')
const SELF = P('mondoking-3d-pad')
const AIR = P('rab-ionosphere-5-5')

const FAQS = [
  {
    q: 'Is a foam sleeping pad warmer than an inflatable pad?',
    a: 'Not on its own. A folding foam pad like the Z Lite Sol rates around R 2, which is fine into the 40s but thin for a freezing night. Insulated inflatable pads reach R 4 to R 7 because they are thicker and have insulation or foam inside the air chamber. Where foam wins is reliability: it cannot leak, so it never goes flat and cold at 3 a.m.',
  },
  {
    q: 'What is the difference between a self-inflating pad and an air pad?',
    a: 'A self-inflating pad has open-cell foam inside an airtight shell. Open the valve and the foam expands and pulls in most of the air by itself, then you top it off with a few breaths. An air pad is a hollow chamber, usually with baffles and a thin insulating layer, that you blow up with a pump sack or your lungs. Self-inflating pads are heavier and bulkier but tougher and warmer for the money; air pads pack much smaller.',
  },
  {
    q: 'Which sleeping pad is best for kids?',
    a: 'For young kids, a closed-cell foam pad is the easiest choice: nothing to inflate, nothing to puncture, and nothing to slide off of in the night. For older kids on cold trips, put that same foam pad under an insulated inflatable pad. Kids lose heat faster than adults, so the warmest pad in the family should go under the smallest sleeper.',
  },
  {
    q: 'Can I use a foam pad and an inflatable pad together?',
    a: 'Yes, and it is the best cold-weather setup for most families. R-values add up, so an R 2 foam pad under an R 5.5 air pad gives you about R 7.5. Put the foam on the bottom against the tent floor, where it also protects the inflatable pad from sticks and sharp gravel, and the inflatable pad on top.',
  },
]

type Row = {
  label: string
  foam: string
  self: string
  air: string
}

const ROWS: Row[] = [
  { label: 'Warmth (R-value)', foam: 'About R 2', self: 'R 7.0', air: 'R 5.5' },
  { label: 'Comfort', foam: 'Firm, thin', self: 'Closest to a real mattress', air: 'Plush, a little bouncy' },
  { label: 'If it gets punctured', foam: 'Nothing happens', self: 'Still has foam inside', air: 'Goes flat' },
  { label: 'Setup', foam: 'Unfold it', self: 'Open valve, wait, top off', air: 'Inflate every night' },
  { label: 'Packed size', foam: 'Bulky but light', self: 'Large and heavy', air: 'Smallest by far' },
  { label: 'Best job', foam: 'Kids, backup layer, sit pad', self: 'Car camping comfort', air: 'Cold nights, small trunks' },
  { label: 'Price', foam: FOAM.priceRange ?? '', self: SELF.priceRange ?? '', air: AIR.priceRange ?? '' },
]

export default function Page() {
  const breadcrumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: 'Foam vs. Inflatable Sleeping Pad', url: `${SITE_URL}${SLUG}` },
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
            'foam vs inflatable sleeping pad',
            'self-inflating vs air sleeping pad',
            'best sleeping pad for kids',
            'sleeping pad for cold weather camping',
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
          Foam vs. inflatable sleeping pad: which one for families?
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Closed-cell foam, self-inflating, and air pads solve the same problem in very different
          ways. Here&rsquo;s what each one is good at, and the combination that keeps a family warm
          once November nights drop toward freezing.
        </p>

        <div className="mt-10 rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
            Short answer
          </p>
          <p className="text-stone-800 leading-relaxed text-[17px]">
            <strong>Closed-cell foam pads</strong> are cheap, light, and impossible to pop, which
            makes them the best first pad for young kids and the best backup layer for everyone.
            They are thin, though, and only about R 2 on their own. <strong>Inflatable pads</strong>{' '}
            come in two kinds. Self-inflating pads have foam inside an airtight shell: heavy and
            bulky, but the most comfortable and among the warmest for car camping. Air pads are
            hollow chambers with insulation inside: plush, warm for their weight, and tiny when
            packed, but a puncture leaves you on the ground. For cold-season family trips, the
            winning setup is usually both: a foam pad on the tent floor with an insulated
            inflatable pad on top. R-values add together, the foam protects the inflatable from
            punctures, and if anything leaks overnight, nobody ends up sleeping on frozen dirt.
          </p>
        </div>
      </header>

      {/* ── Comparison table ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-8 pb-20">
        <div className="overflow-x-auto rounded-2xl ring-1 ring-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left font-medium text-stone-500 px-5 py-4 w-40">&nbsp;</th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">
                  <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                    Closed-cell foam
                  </span>
                  {FOAM.name}
                </th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">
                  <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                    Self-inflating
                  </span>
                  {SELF.name}
                </th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">
                  <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                    Insulated air
                  </span>
                  {AIR.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <td className="px-5 py-4 font-medium text-stone-500">{r.label}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.foam}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.self}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.air}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-stone-500">
          R-values are the manufacturers&apos; published ratings. Prices approximate and subject to
          change on Amazon. As an Amazon Associate we earn from qualifying purchases.
        </p>
      </section>

      {/* ── How each type works ─────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          How each type keeps you warm
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          Every pad does the same job: it slows heat leaving your body and heading into the ground.
          Your sleeping bag cannot do this, because your weight crushes the fill underneath you
          flat. What changes between pad types is what fills the space between you and the dirt.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          <strong>Closed-cell foam</strong> is a solid sheet of tiny sealed bubbles. It insulates
          the moment you unroll it and keeps working no matter what. The tradeoff is thickness: a
          typical folding pad is under an inch, so it feels firm and tops out around R 2.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          <strong>Self-inflating pads</strong> are open-cell foam sealed inside a fabric shell. The
          foam does most of the insulating and gives the pad structure, while the air adds loft.
          Thick car-camping models like the MondoKing 3D are rated as high as R 7.0, but they are
          heavy and roll up to the size of a sleeping bag.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          <strong>Air pads</strong> are mostly air held in baffles. Plain ones sleep cold for the
          same reason a big air mattress does: the air inside cools to the temperature of the
          ground and circulates under you. Insulated air pads add a reflective film or synthetic
          fill inside the chambers, which is how the Rab Ionosphere reaches R 5.5 while packing
          down to roughly the size of a large water bottle. Our{' '}
          <Link href="/guides/sleeping-pad-r-value-explained">sleeping pad R-value guide</Link>{' '}
          explains what those numbers mean and how much you need by season.
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
              Foam wins. Little kids roll off narrow inflatable pads, poke them with whatever they
              brought into the tent, and bounce on them until something gives. A foam pad has
              none of those problems, and on a cold night you can lay a second foam pad or a
              folded blanket on top for more warmth.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Car camping comfort for adults
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Self-inflating wins. When the pad rides in the trunk and only has to travel from the
              car to the tent, weight and packed size barely matter. A thick self-inflating pad is
              the closest thing to a bed, it is quiet when you roll over, and the foam inside
              means a slow leak is an annoyance rather than a ruined night.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Cold nights and a full trunk
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Insulated air wins on warmth for its size. If you are packing for four people and
              the trunk is already full of winter layers, an air pad delivers high R-value in a
              fraction of the space. Carry the patch kit, inflate with a pump sack instead of your
              breath on freezing nights (breath moisture freezes inside the pad), and keep a foam
              pad underneath as insurance.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Tight budgets
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              Foam wins, and it is never wasted money. Even after you upgrade to an inflatable pad,
              the foam becomes the bottom layer on cold trips, a sit pad by the fire, and the
              backup for whoever&apos;s pad springs a leak.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stacking ────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          The cold-weather answer is usually both
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          R-values add together, so you do not have to pick one pad and live with its weaknesses.
          A foam pad on the tent floor with an inflatable pad on top gets most families from a
          summer setup to a near-freezing setup without buying a whole new sleep system. The
          order matters: foam on the bottom, where it shields the inflatable from sticks and
          gravel, then the inflatable, then the sleeping bag.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          If your family sleeps on a big air mattress instead, put the foam pad or a thick blanket
          on top of the mattress, under the bags. Insulation has to sit between you and the cold
          air inside the mattress to help. For the rest of the overnight routine, see{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>,
          and for matching bags to the pads, the{' '}
          <Link href="/compare/mummy-vs-rectangular-sleeping-bag">
            mummy vs. rectangular sleeping bag comparison
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
          {[FOAM, SELF, AIR].map((product) => (
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
          Camping in the cold this season?
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Layering, campsite picks, stove fuel, and what changes when nights drop near freezing.
        </p>
        <Link
          href="/guides/winter-camping-for-beginners"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          Read the winter camping guide
        </Link>
      </section>
    </main>
  )
}
