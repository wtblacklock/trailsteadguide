import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import QuickAnswer from '@/components/guide/QuickAnswer'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import { articleGraph, itemListGraph, faqPageGraph, pageMetadata, SITE_URL } from '@/lib/seo'
import type { AffiliateProduct } from '@/types'

const SLUG = '/compare/best-beginner-sleeping-system'
const TITLE = 'Best Beginner Sleeping System: 3 Picks for First Trips'
const DESCRIPTION =
  'Best beginner sleeping system: bag plus pad, three tiers. Compare temp rating, weight, and price for budget, comfort, and cold-weather upgrades.'
const H1 = 'Best beginner sleeping system: 3 picks for your first family trip'

function P(id: string): AffiliateProduct {
  const p = AFFILIATE_PRODUCTS.find((x) => x.id === id)
  if (!p) throw new Error(`Missing affiliate product: ${id}`)
  return p
}

const BAG_BUDGET = P('coleman-brazos-bag') // synthetic 3-season
const PAD_MID = P('big-agnes-divide') // self-inflating mid pad
const BAG_COLD = P('marmot-mad-river-0') // 0°F mummy
const PAD_COLD = P('rab-ionosphere-5-5') // R-5.5 insulated pad
const LINER = P('vumos-bag-liner') // bag liner add-on

type Pick = {
  label: string
  combo: string
  description: string
  bag?: AffiliateProduct
  pad?: AffiliateProduct
  tempRating: string
  weightTotal: string
  packedSize: string
  priceTier: string
  priceTotal: string
  /** When set, the pad tier has no affiliate match yet — render a flagged card. */
  padNoLink?: { name: string; description: string }
}

const PICKS: Pick[] = [
  {
    label: 'Budget',
    combo: 'Coleman Brazos Bag + foam pad',
    description: 'A washable synthetic bag good to about 40°F, paired with a closed-cell foam pad. The cheapest combo that keeps a kid warm in summer.',
    bag: BAG_BUDGET,
    padNoLink: {
      name: 'Closed-cell foam pad (any brand)',
      description: 'Closed-cell foam roll-up pad, R-value ~2. The classic backup pad — cheap, indestructible, fine in summer.',
    },
    tempRating: 'Comfortable to ~45°F',
    weightTotal: '~5 lbs',
    packedSize: 'Medium roll',
    priceTier: '$ Budget',
    priceTotal: '~$60–$80',
  },
  {
    label: 'Comfort',
    combo: 'Coleman Brazos Bag + Big Agnes Divide pad',
    description: 'The same synthetic bag, now paired with a self-inflating pad. The single biggest comfort upgrade you can make on a first trip.',
    bag: BAG_BUDGET,
    pad: PAD_MID,
    tempRating: 'Comfortable to ~40°F',
    weightTotal: '~6 lbs',
    packedSize: 'Small stuff sack',
    priceTier: '$$ Mid',
    priceTotal: '~$155',
  },
  {
    label: 'Cold-weather upgrade',
    combo: 'Marmot Mad River 0 + Rab Ionosphere 5.5',
    description: 'A 0°F mummy bag plus an R-5.5 insulated pad. The pair when shoulder-season nights drop into the 30s and a 40°F bag stops cutting it.',
    bag: BAG_COLD,
    pad: PAD_COLD,
    tempRating: 'Comfortable to ~20°F',
    weightTotal: '~5 lbs',
    packedSize: 'Compression sack',
    priceTier: '$$$ Premium',
    priceTotal: '~$507',
  },
]

const PLAN_MAP: { plan: string; href: string; pick: string; reason: string }[] = [
  {
    plan: 'Backyard Test',
    href: '/plans/backyard-test',
    pick: 'Whatever you have — borrow if needed',
    reason: 'A yard rehearsal is for proving the rest of the system. Use blankets and a couch cushion if that\'s what\'s in the closet.',
  },
  {
    plan: 'First Night Camp',
    href: '/plans/first-night-camp',
    pick: 'Brazos Bag + foam pad (budget)',
    reason: 'One summer night. The budget combo is enough — you don\'t need a $300 sleep system to find out if you like camping.',
  },
  {
    plan: 'First Weekend Camp',
    href: '/plans/first-weekend-camp',
    pick: 'Brazos Bag + Big Agnes Divide (comfort)',
    reason: 'Two nights. The pad upgrade is the difference between waking up rested and waking up sore — worth the $100.',
  },
  {
    plan: 'Easy Family Basecamp',
    href: '/plans/easy-family-basecamp',
    pick: 'Comfort tier, or cold-weather upgrade if shoulder season',
    reason: 'Three nights of comfort. In summer, the Brazos + Divide combo is plenty. In May or October, the Mad River 0 + R-5.5 pad pairing keeps the trip comfortable instead of survivable.',
  },
]

const RELATED = [
  {
    title: 'Sleeping bag setup vs cot + airbed combo',
    href: '/compare/sleeping-bag-vs-cot-airbed-combo',
    blurb: 'Floor sleep system vs an off-the-ground combo — the comfort-versus-packing tradeoff.',
  },
  {
    title: 'Best beginner cooler',
    href: '/compare/best-beginner-cooler',
    blurb: 'Pair the sleep system with a cooler that holds two days of food without re-icing.',
  },
  {
    title: 'See the full gear guide',
    href: '/gear',
    blurb: 'The full beginner-grade kit — tent, cooking, lighting, the rest.',
  },
]

const FAQS = [
  {
    q: 'What temperature rating do I need for a 3-season camping trip?',
    a: 'A bag comfortable to about 40-45°F covers most spring-through-fall car camping. Only step up to a 20°F-rated bag if you\'re camping at altitude, in the shoulder season, or in a region with cold nights — the budget and comfort tiers here both handle typical summer and early-fall trips fine.',
  },
  {
    q: 'Does the sleeping pad matter as much as the bag?',
    a: 'Often more. The pad insulates from cold ground, which is usually the bigger source of nighttime cold than air temperature — a warm bag on a thin pad still sleeps cold. Pair a mid-tier bag with a good pad before upgrading to a premium bag alone.',
  },
  {
    q: 'Is the cold-weather upgrade worth it for occasional camping?',
    a: 'Not usually. The 20°F-rated tier is built for shoulder-season and altitude trips specifically. If you camp a few times a summer at moderate elevation, the comfort-tier system at 40°F is the better value — save the upgrade for when you actually plan a cold trip.',
  },
  {
    q: 'Can kids use the same sleeping system as adults?',
    a: 'A full-size bag works but leaves a lot of dead air space for a small kid to warm, which can actually sleep colder. See the dedicated best sleeping bag for kids guide for kid-sized picks that solve this directly.',
  },
]

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
})

export default function Page() {
  const breadcrumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: 'Best beginner sleeping system', url: `${SITE_URL}${SLUG}` },
  ]

  const itemListItems = PICKS.flatMap((p, i) => {
    const items: { position: number; name: string; url: string }[] = []
    if (p.bag) items.push({ position: i * 2 + 1, name: p.bag.name, url: getProductUrl(p.bag) })
    if (p.pad) items.push({ position: i * 2 + 2, name: p.pad.name, url: getProductUrl(p.pad) })
    return items
  })

  return (
    <main>
      <JsonLd
        data={articleGraph({
          slug: SLUG,
          title: TITLE,
          description: DESCRIPTION,
          breadcrumbs,
          articleSection: 'Gear comparisons',
          keywords: ['best beginner sleeping bag', 'camping sleeping system', 'sleeping pad comparison', 'cold-weather camping sleep'],
        })}
      />
      <JsonLd
        data={itemListGraph({
          name: 'Best beginner sleeping systems',
          items: itemListItems,
        })}
      />
      <JsonLd data={faqPageGraph(FAQS)} />
      <Breadcrumbs items={breadcrumbs} />

      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Gear comparison
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-950 tracking-tight leading-[1.04]">
          {H1}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
          A sleep system is a bag plus a pad — and the pad is the part most beginners
          underestimate. Here are three tiers, with what actually matters for a first family trip.
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-8 pb-12">
        <QuickAnswer
          tldr="Summer first trip? Brazos bag + foam pad. Want comfort? Brazos bag + Big Agnes Divide. Shoulder season? Marmot Mad River 0 + R-5.5 pad."
          summary={
            <>
              For a summer first trip, the <strong>Coleman Brazos Bag with a foam pad</strong> is
              enough — under $80, comfortable to about 45°F, washable. The single best comfort
              upgrade on a first trip is swapping the foam for the{' '}
              <strong>Big Agnes Divide self-inflating pad</strong> — that&rsquo;s the difference
              between waking up rested and waking up sore. For shoulder-season trips below 40°F,
              step up to the <strong>Marmot Mad River 0 plus an R-5.5 insulated pad</strong> — a
              0°F bag with R-5.5 ground insulation keeps the trip comfortable instead of
              survivable.
            </>
          }
        />
      </section>

      <section className="max-w-5xl mx-auto px-8 pb-20">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight leading-tight mb-6">
          Side by side
        </h2>
        <div className="overflow-x-auto rounded-2xl ring-1 ring-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left font-medium text-stone-500 px-5 py-4 w-44">&nbsp;</th>
                {PICKS.map((p) => (
                  <th key={p.label} className="text-left font-medium text-stone-900 px-5 py-4 align-bottom">
                    <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
                      {p.label}
                    </span>
                    {p.combo}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Temp rating</td>
                {PICKS.map((p) => <td key={p.label} className="px-5 py-4 text-stone-700 align-top">{p.tempRating}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Weight (combo)</td>
                {PICKS.map((p) => <td key={p.label} className="px-5 py-4 text-stone-700 align-top">{p.weightTotal}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Packed size</td>
                {PICKS.map((p) => <td key={p.label} className="px-5 py-4 text-stone-700 align-top">{p.packedSize}</td>)}
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-stone-500">Cost</td>
                {PICKS.map((p) => (
                  <td key={p.label} className="px-5 py-4 text-stone-900 tabular-nums align-top">
                    <span className="block">{p.priceTier}</span>
                    <span className="block text-xs text-stone-500">{p.priceTotal}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-stone-500">
          Prices approximate and subject to change on Amazon. As an Amazon Associate we earn from
          qualifying purchases.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          What&rsquo;s different in practice
        </h2>
        <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
          <p>
            <strong>The pad matters more than the bag.</strong> A great bag on a thin foam pad is
            still cold — the ground sucks heat out of you faster than air does. Swapping a foam
            pad for a self-inflating one (R-value ~3) is the single biggest comfort upgrade for
            $100. For shoulder-season trips, an R-5+ insulated pad does more for warmth than going
            to a colder-rated bag.
          </p>
          <p>
            <strong>Synthetic bags forgive beginners; down bags don&rsquo;t.</strong> The Brazos
            and Mad River are both synthetic — they keep insulating when wet, dry fast, and
            survive being machine-washed. Down compresses smaller and lasts longer, but it
            collapses if it gets wet. For first trips, synthetic is the safer choice.
          </p>
          <p>
            <strong>Liners add range cheaply.</strong> A bag liner like the Vumos adds about 8°F
            of warmth, doubles as a sheet on hot nights, and keeps the bag clean. At $20, it&rsquo;s
            the cheapest upgrade in the kit and the one most worth bringing.
          </p>
          <p>
            <strong>Family math: stack the pads, not the bags.</strong> If you&rsquo;re sharing a
            queen air bed, a single high-R pad covers both adults. If kids are sleeping on
            separate pads, give them the warmer pad — they&rsquo;re smaller and lose heat faster.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          The cheapest upgrade: a bag liner
        </h2>
        <p className="text-stone-700 leading-relaxed text-lg mb-6">
          A bag liner adds ~8°F, keeps the bag clean, and packs to the size of a fist. Pair it
          with any of the three tiers above for a near-free shoulder-season insurance policy.
        </p>
        <a
          href={getProductUrl(LINER)}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md font-medium ring-1 ring-stone-300 text-stone-900 hover:bg-stone-50 transition-colors px-6 py-3 text-sm"
        >
          See the {LINER.name} ({LINER.priceRange})
        </a>
      </section>

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          Which one for which plan
        </h2>
        <div className="grid gap-4 md:gap-5">
          {PLAN_MAP.map((m) => (
            <Link
              key={m.plan}
              href={m.href}
              className="group block rounded-2xl ring-1 ring-stone-200 hover:ring-stone-300 bg-white px-6 py-5 md:px-7 md:py-6 transition"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-2">
                {m.plan}
              </p>
              <p className="font-serif text-lg md:text-xl text-stone-950 font-semibold leading-snug mb-2 group-hover:text-stone-700">
                Pick: {m.pick}
              </p>
              <p className="text-stone-600 leading-relaxed">{m.reason}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          See the picks
        </h2>
        <div className="space-y-8">
          {PICKS.map((p) => (
            <div key={p.label} className="rounded-2xl ring-1 ring-stone-200 bg-cream/70 p-5 md:p-6">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-green mb-2">
                {p.label} · {p.priceTotal}
              </p>
              <p className="font-serif text-xl font-semibold text-stone-950 mb-2">{p.combo}</p>
              <p className="text-stone-600 leading-relaxed text-[15px] mb-5">{p.description}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {p.bag && (
                  <a
                    href={getProductUrl(p.bag)}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="group flex gap-4 rounded-xl ring-1 ring-stone-200 hover:ring-stone-300 bg-white transition p-3"
                  >
                    <div className="shrink-0 w-20 h-20 bg-stone-100 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.bag.imageUrl}
                        alt={p.bag.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-stone-500 mb-1">
                        Bag · {p.bag.priceRange}
                      </p>
                      <p className="font-serif text-sm font-semibold text-stone-950 group-hover:text-stone-700 leading-snug">
                        {p.bag.name}
                      </p>
                    </div>
                  </a>
                )}
                {p.pad && (
                  <a
                    href={getProductUrl(p.pad)}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="group flex gap-4 rounded-xl ring-1 ring-stone-200 hover:ring-stone-300 bg-white transition p-3"
                  >
                    <div className="shrink-0 w-20 h-20 bg-stone-100 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.pad.imageUrl}
                        alt={p.pad.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-stone-500 mb-1">
                        Pad · {p.pad.priceRange}
                      </p>
                      <p className="font-serif text-sm font-semibold text-stone-950 group-hover:text-stone-700 leading-snug">
                        {p.pad.name}
                      </p>
                    </div>
                  </a>
                )}
                {p.padNoLink && (
                  <div className="flex gap-4 rounded-xl ring-1 ring-stone-200 bg-stone-50 p-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-stone-500 mb-1">
                        Pad · generic, no link yet
                      </p>
                      <p className="font-serif text-sm font-semibold text-stone-950 leading-snug mb-1">
                        {p.padNoLink.name}
                      </p>
                      <p className="text-xs text-stone-600 leading-relaxed">{p.padNoLink.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
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

      <section className="max-w-3xl mx-auto px-8 pb-16 border-t border-stone-200 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
          Not sure? Take the 60-second quiz.
        </h2>
        <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
          Six questions about your group, comfort level, and how far you want to drive.
          You&rsquo;ll land on the right plan and the right sleep system for that plan.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-base"
          >
            Take the 60-second quiz
          </Link>
          <Link
            href="/gear"
            className="inline-flex items-center justify-center rounded-md font-medium ring-1 ring-stone-300 text-stone-900 hover:bg-stone-50 transition-colors px-6 py-3 text-base"
          >
            See the full gear setup
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-8 pb-32 border-t border-stone-200 pt-16">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
          Keep reading
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-8">
          Related guides
        </h2>
        <ul className="space-y-5">
          {RELATED.map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="group block">
                <p className="font-serif text-xl font-semibold text-stone-950 group-hover:text-stone-700">
                  {g.title}
                </p>
                <p className="text-stone-600 leading-relaxed">{g.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
