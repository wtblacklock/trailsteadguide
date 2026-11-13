import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import type { AffiliateProduct } from '@/types'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/compare/cast-iron-skillet-vs-dutch-oven'
const TITLE = 'Cast Iron Skillet vs. Dutch Oven for Camping'
const META_TITLE = 'Cast Iron Skillet vs. Dutch Oven'
const DESCRIPTION =
  'Cast iron skillet vs. camp Dutch oven for family camping: what each cooks, weight, fuel, cleanup, and price. Which to buy first, and when you need both.'

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

const SKILLET = P('lodge-cast-iron-skillet')
const OVEN = P('lodge-dutch-oven')
const THERMOMETER = P('temppro-instant-read-thermometer')

const FAQS = [
  {
    q: 'Should I buy a cast iron skillet or a Dutch oven first for camping?',
    a: 'Buy the skillet first. A 10-inch skillet cooks breakfast, burgers, quesadillas, grilled cheese, and fried potatoes on the camp stove you already own, it weighs about five pounds, and it costs around $20. A camp Dutch oven is the second piece, for families who want stews, chili, cobbler, and roasts and are willing to manage charcoal.',
  },
  {
    q: 'Can I use a regular kitchen Dutch oven for camping?',
    a: 'On a camp stove or a grate over the fire, yes, as long as it is bare cast iron and not enameled, since enamel can crack over uneven flame. For baking with coals, no. A camp Dutch oven has three legs that hold it above the briquettes and a flat, rimmed lid that holds coals on top. A flat-bottomed kitchen pot sits right on the coals and burns the bottom of the food.',
  },
  {
    q: 'How many charcoal briquettes does a 10-inch Dutch oven need?',
    a: 'For about 350 degrees, use roughly 20 briquettes: about 14 on the lid and 6 underneath. Add a few more on a cold or windy day, and turn the lid a quarter turn and the pot a quarter turn the other way every 15 minutes so no spot burns. Check meat with an instant-read thermometer rather than trusting the clock.',
  },
  {
    q: 'How do you clean cast iron at a campsite?',
    a: 'Scrape it while it is still warm, wipe it with a little hot water and a scrubber, and skip long soaks. Dry it completely over the stove or the coals for a minute, then rub in a thin film of cooking oil before it goes back in the bin. A drop of mild soap is fine on modern pre-seasoned cast iron. Rust comes from putting it away wet, not from the soap.',
  },
]

type Row = {
  label: string
  skillet: string
  oven: string
}

const ROWS: Row[] = [
  { label: 'Best at', skillet: 'Breakfast, searing, frying, grilled cheese', oven: 'Stews, chili, roasts, cobbler, bread' },
  { label: 'Heat source', skillet: 'Camp stove or grate over the fire', oven: 'Charcoal on the lid and underneath' },
  { label: 'Cook time', skillet: '5 to 20 minutes', oven: '45 minutes to 2 hours' },
  { label: 'Weight', skillet: 'About 5 lb', oven: 'About 12 to 15 lb' },
  { label: 'Feeds', skillet: 'A family of four in two batches', oven: 'A family of four to six in one pot' },
  { label: 'Learning curve', skillet: 'Easy', oven: 'A few practice meals' },
  { label: 'Price', skillet: SKILLET.priceRange ?? '', oven: OVEN.priceRange ?? '' },
]

export default function Page() {
  const breadcrumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: 'Cast Iron Skillet vs. Dutch Oven', url: `${SITE_URL}${SLUG}` },
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
            'cast iron skillet vs dutch oven camping',
            'camp dutch oven vs skillet',
            'what cast iron to bring camping',
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
          Cast iron skillet vs. Dutch oven: which one goes camping?
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          Both are heavy black cast iron, and both show up on every camp cooking list. They do
          very different jobs. Here&rsquo;s which one your family will actually use, and when it is
          worth packing both.
        </p>

        <div className="mt-10 rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
            Short answer
          </p>
          <p className="text-stone-800 leading-relaxed text-[17px]">
            Most families should buy a <strong>10-inch cast iron skillet</strong> first. It works
            on the propane camp stove you already own, cooks eggs, pancakes, bacon, burgers,
            quesadillas, and grilled cheese in minutes, weighs about five pounds, and costs around
            $20. A <strong>camp Dutch oven</strong> is the second piece. Its three legs and rimmed
            lid let you put charcoal underneath and on top, which turns it into an outdoor oven for
            chili, stew, a turkey breast, cobbler, and bread. That makes it the better tool for
            cold-weather trips and holiday meals, when a hot one-pot dinner matters more than speed.
            The tradeoffs are weight, at roughly 12 to 15 pounds, a learning curve with coals, and
            cook times of an hour or more. If you camp in fall and winter or cook for a big group,
            plan on owning both.
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
                    Skillet
                  </span>
                  {SKILLET.name}
                </th>
                <th className="text-left font-medium text-stone-900 px-5 py-4">
                  <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                    Dutch oven
                  </span>
                  {OVEN.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <td className="px-5 py-4 font-medium text-stone-500">{r.label}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.skillet}</td>
                  <td className="px-5 py-4 text-stone-700 align-top">{r.oven}</td>
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

      {/* ── How they differ ─────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          A pan versus an oven
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          A skillet is a frying pan. Heat comes from below, the sides are low, and food cooks fast
          and in the open where you can see it and flip it. That is exactly what a camp breakfast
          or a quick lunch needs, and it is why the skillet gets used at nearly every meal.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          A camp Dutch oven is a heavy pot with a lid that becomes an oven. Coals underneath heat
          the bottom, coals on the flat lid heat the top, and the thick iron holds an even
          temperature for an hour or more. It bakes, braises, and simmers, and it keeps food hot
          long after the coals die down. The tradeoff is time and attention: you plan the meal
          around it instead of tossing something in the pan.
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
              Breakfast and quick weeknight-style meals
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              The skillet, easily. Pancakes, eggs, bacon, and breakfast potatoes all come off a
              hot skillet on the stove in the time it takes to light a chimney of charcoal. Our{' '}
              <Link href="/guides/easy-family-camping-meals">easy family camping meals</Link> are
              built mostly around a skillet and one pot.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Cold nights and hot one-pot dinners
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              The Dutch oven. Chili, beef stew, or chicken and dumplings hold their heat in thick
              iron long enough for everyone to get seconds before it cools, which matters on a
              35-degree evening. Our{' '}
              <Link href="/guides/cold-weather-camping-meals">cold-weather camping meals</Link>{' '}
              guide covers which recipes hold up best when the temperature drops.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              A holiday meal at camp
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              The Dutch oven for the main, the skillet for the sides. A 3 to 4 pound turkey breast
              fits a 10-inch camp oven, while reheated stuffing and green beans warm up in the
              skillet on the stove. Our{' '}
              <Link href="/guides/thanksgiving-camping-with-kids">
                Thanksgiving camping with kids
              </Link>{' '}
              guide has the full coal math and timing.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Desserts kids remember
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              The Dutch oven. A dump cake, which is canned fruit, a box of cake mix, and pats of
              butter, bakes under coals in about 45 minutes and is the dessert kids talk about on
              the drive home. The skillet makes a decent giant cookie over a low fire, but it is
              easier to scorch.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 tracking-tight mb-3">
              Burn bans and stove-only campgrounds
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              The skillet. When charcoal and campfires are banned, a propane stove is usually still
              allowed, and the skillet works on it as well as it does at home. A Dutch oven can
              simmer on a stove too, but it loses its main trick, baking with heat from above.
            </p>
          </div>
        </div>
      </section>

      {/* ── Using them with kids ───────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Cast iron around kids
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-4">
          Cast iron stays dangerously hot for a long time after you take it off the heat, and a
          handle looks exactly the same hot or cold. Keep a heavy leather glove or a thick pot
          holder with the pan, set hot iron down only on the stove or on a fire-safe spot away
          from where kids walk, and make a habit of saying &ldquo;hot pan&rdquo; out loud every
          time you move it.
        </p>
        <p className="text-stone-700 leading-relaxed text-lg">
          Kids can still help. Older kids can crack eggs into the skillet with an adult at the
          stove, or layer a dump cake into a cold Dutch oven before the coals go on. Lifting a
          coal-covered lid is an adult job, and it needs a lid lifter, not a stick. An instant-read
          thermometer like the {THERMOMETER.name} ({THERMOMETER.priceRange}) takes the guesswork
          out of whether the meat inside is done.
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
          {[SKILLET, OVEN, THERMOMETER].map((product) => (
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
          Planning the menu?
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          A full weekend of family meals, with a shopping list and what to prep at home.
        </p>
        <Link
          href="/guides/camping-meal-plan-family"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          Read the family camping meal plan
        </Link>
      </section>
    </main>
  )
}
