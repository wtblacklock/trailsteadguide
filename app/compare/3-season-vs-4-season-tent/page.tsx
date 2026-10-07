import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/3-season-vs-4-season-tent'
const TITLE = '3-Season vs. 4-Season Tent for Families'
const DESCRIPTION =
  '3-season vs. 4-season tent compared for family camping: wind, snow load, ventilation, condensation, weight, and price. Whether your summer tent can handle fall and winter.'

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

const THREE = P('coleman-sundome-4p')
const FOUR = P('geertop-4p-4-season')
const PAD = P('therm-a-rest-z-lite-sol')

const FAQS = [
  {
    q: 'Can I use a 3-season tent in the winter?',
    a: 'Yes, at a drive-up campground on a dry, calm night above about 25°F, as long as your sleeping bag and pad are rated for the cold. The tent adds only a few degrees of warmth either way. What a 3-season tent cannot handle is real snow load or strong sustained wind. If the forecast calls for either, switch to a 4-season tent or book a cabin.',
  },
  {
    q: 'Is a 4-season tent warmer than a 3-season tent?',
    a: 'A little, but less than most people expect. Solid fabric walls and a fly that reaches the ground cut drafts, so it can feel 5 to 10 degrees warmer inside on a windy night. It does not make heat, though. Your sleeping bag and the insulated pad under you do almost all of the work of keeping you warm.',
  },
  {
    q: 'Do I need a 4-season tent for fall camping?',
    a: 'Usually not. Most fall family trips land on nights in the 30s and 40s with little wind and no snow, which is exactly what a good 3-season tent with a full-coverage rainfly is built for. Spend the money on a warmer sleeping bag and an insulated pad first. A 4-season tent becomes worth it once you plan to camp in snow or at exposed, windy sites.',
  },
  {
    q: 'Why do 4-season tents get so much condensation?',
    a: 'They have less mesh and tighter fabric so they can hold heat and shed wind, which also traps the moisture from everyone breathing inside. A family of four can put more than a quart of water vapor into the air overnight. Crack every vent, keep the doors partly unzipped when the weather allows, and wipe the walls down in the morning.',
  },
]

type Row = {
  label: string
  three: string
  four: string
}

const ROWS: Row[] = [
  { label: 'Built for', three: 'Spring, summer, fall', four: 'Snow, high wind, exposed sites' },
  { label: 'Walls', three: 'Lots of mesh under a rainfly', four: 'Mostly solid fabric, little mesh' },
  { label: 'Wind and snow load', three: 'Fine in breezes, sags under snow', four: 'More poles, steeper walls, snow skirt' },
  { label: 'Airflow and condensation', three: 'Breathes well', four: 'Stuffier, needs vents open' },
  { label: 'Hot summer nights', three: 'Comfortable', four: 'Too warm' },
  { label: 'Price', three: THREE.priceRange ?? '', four: FOUR.priceRange ?? '' },
]

export default function Page() {
  const breadcrumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: '3-Season vs. 4-Season Tent', url: `${SITE_URL}${SLUG}` },
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
            '3 season vs 4 season tent',
            'do I need a 4 season tent',
            'can you use a 3 season tent in winter',
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
          3-season vs. 4-season tent: does your family need one?
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          &ldquo;Season&rdquo; ratings are about wind and snow, not temperature. Here&rsquo;s when
          the tent you already own is enough for cold nights, and when a 4-season tent earns its
          keep.
        </p>

        <div className="mt-10 rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
            Short answer
          </p>
          <p className="text-stone-800 leading-relaxed text-[17px]">
            Most families only need a <strong>3-season tent</strong>. It handles spring, summer,
            and fall camping, including frosty October and November nights in the 30s, as long as
            it has a full-coverage rainfly and you stake it out properly. The season rating
            describes how a tent stands up to wind and snow, not how warm it keeps you. Warmth on a
            cold night comes from your sleeping bag and an insulated pad, so spend there first. A{' '}
            <strong>4-season tent</strong> earns its price when you expect snow on the tent, strong
            sustained wind, or an exposed site above treeline. It has more poles, steeper walls,
            less mesh, and a fly that reaches the ground. The tradeoffs are more weight, more
            condensation, a higher price, and a stuffy tent on warm nights, so it is a poor choice
            for summer trips.
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
                    3-season
                  </span>
                  {THREE.name}
                </th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">
                  <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                    4-season
                  </span>
                  {FOUR.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <td className="px-5 py-4 font-medium text-stone-500">{r.label}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.three}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.four}</td>
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

      {/* ── What the rating means ───────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          What &ldquo;season&rdquo; actually means
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          The season label is a promise about structure, not temperature. A 3-season tent is built
          to keep rain off and air moving. It uses a lot of mesh in the inner tent, a rainfly over
          the top, and two or three poles. That design breathes well and stays comfortable from May
          through October.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          A 4-season tent is built to stay standing when the weather pushes on it. Extra poles
          cross in more places, the walls are steeper so snow slides off, the inner tent is mostly
          solid fabric, and the fly often has a snow skirt that seals against the ground. That
          makes it stronger and less drafty, but also heavier and stuffier. Neither type heats
          anything. A tent only slows down how fast warm air leaves.
        </p>
      </section>

      {/* ── Budget 4-season ─────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Not every &ldquo;4-season&rdquo; tent is a mountain tent
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          True expedition tents are built for climbers and cost several hundred dollars for two
          people. Budget tents labeled 4-season, like the GEERTOP in this comparison, sit in
          between: aluminum poles, a snow skirt, a full fly, and less mesh than a summer dome. They
          are a real step up for windy fall weekends and light snow at a campground, but they are
          not meant for heavy snowfall or a ridge in a storm.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          The other catch for families is size. Most 4-season tents top out at four people, and
          their floor space is tighter than a family dome of the same rating. If you camp as a
          family of five or six, a sturdy 3-season tent plus a winter-ready sleep system is often
          the more practical answer.
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
              3-season wins easily. Mesh walls and good airflow are what keep kids from waking up
              hot and sticky. A 4-season tent on an August night is a sauna.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Frosty October and November nights
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              3-season still wins for most families. Put the fly on, close the fly vents only
              partway, and pitch in a sheltered spot. Our{' '}
              <Link href="/guides/fall-camping-for-beginners">fall camping guide</Link> covers site
              choice and layering for nights like these.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Windy sites and open ground
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              It depends on how often you camp there. A well-guyed 3-season dome handles gusty
              weekends, and our guide to{' '}
              <Link href="/guides/camping-in-high-wind">camping in high wind</Link> shows how to
              pitch it. If you regularly camp on the plains, the coast, or in the high desert, a
              4-season tent is a real upgrade.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Snow in the forecast
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              4-season wins. Wet snow is heavy, and a 3-season tent with a flat roof and mostly
              mesh can sag or collapse overnight. If you do not own one yet, a heated cabin or yurt
              is the better first winter trip. Our{' '}
              <Link href="/guides/winter-camping-for-beginners">winter camping guide</Link> walks
              through that choice.
            </p>
          </div>
        </div>
      </section>

      {/* ── Spend on sleep first ───────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Upgrade the sleep system before the tent
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          If your family is cold at night, a new tent is rarely the fix. The ground pulls heat out
          of a sleeper far faster than the air does, and an uninsulated air mattress makes it
          worse. A closed-cell foam pad like the {PAD.name} ({PAD.priceRange}) under each sleeper,
          a sleeping bag with a comfort rating at or below the forecast low, and dry base layers do
          more for warmth than any tent.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          Our{' '}
          <Link href="/guides/sleeping-pad-r-value-explained">sleeping pad R-value guide</Link>{' '}
          explains how much insulation each season needs, and{' '}
          <Link href="/guides/how-to-prevent-tent-condensation">preventing tent condensation</Link>{' '}
          covers the wet walls that come with closing a tent up on cold nights.
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
          {[THREE, FOUR, PAD].map((product) => (
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
          Planning a cold-weather trip?
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          The night routine, layers, and small tricks that keep kids warm until morning.
        </p>
        <Link
          href="/guides/how-to-keep-kids-warm-camping"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          Read how to keep kids warm camping
        </Link>
      </section>
    </main>
  )
}
