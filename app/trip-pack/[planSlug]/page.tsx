import { notFound } from 'next/navigation'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import { getPlanContent } from '@/lib/plan-content'
import { resolveGearSet } from '@/lib/gear-sets'
import { parsePartySize } from '@/lib/party-size'
import { parseQuizOutput, type PlanSearchParams } from '@/lib/personalization/url-params'
import TripPackPaywall from '@/components/trip-pack/TripPackPaywall'
import TripPackPreview from '@/components/trip-pack/TripPackPreview'
import { pageMetadata, SITE_URL } from '@/lib/seo'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import type { PlanSlug } from '@/types'

const VALID: PlanSlug[] = ['backyard-test', 'first-night-camp', 'first-weekend-camp', 'easy-family-basecamp']

const NIGHT_DEFAULT: Record<PlanSlug, number> = {
  'backyard-test': 1,
  'first-night-camp': 1,
  'first-weekend-camp': 2,
  'easy-family-basecamp': 3,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ planSlug: string }>
}) {
  const { planSlug } = await params
  if (!VALID.includes(planSlug as PlanSlug)) return {}
  const content = getPlanContent(planSlug as PlanSlug)
  return pageMetadata({
    title: `${content.cover.title} Trip Pack`,
    description: `Download a print-ready Trip Pack for ${content.cover.title}: timeline, packing list, gear set, and mistake prevention — assembled to your party size.`,
    path: `/trip-pack/${planSlug}`,
    type: 'article',
  })
}

export default async function TripPackPage({
  params,
  searchParams,
}: {
  params: Promise<{ planSlug: string }>
  searchParams: Promise<PlanSearchParams & { nights?: string }>
}) {
  const { planSlug } = await params
  if (!VALID.includes(planSlug as PlanSlug)) notFound()

  const slug = planSlug as PlanSlug
  const plan = PLAN_TEMPLATES[slug]
  const content = getPlanContent(slug)
  const gear = resolveGearSet(content.gearSetId)
  const sp = await searchParams
  const { adults, kids } = parsePartySize(sp)
  const out = parseQuizOutput(slug, sp)
  const nights = clamp(Number(sp.nights ?? NIGHT_DEFAULT[slug]), 1, 7)

  return (
    <main className="min-h-screen bg-stone-50">
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Trip Packs', url: `${SITE_URL}/trip-pack` },
          { name: content.cover.title, url: `${SITE_URL}/trip-pack/${slug}` },
        ]}
      />

      <header className="w-full px-8 pt-8 pb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-800 mb-3">
          Trailstead Trip Pack
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-3">
          {content.cover.title}
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl">{plan.tripSummary}</p>
      </header>

      <div className="w-full px-8 grid lg:grid-cols-[1fr_360px] gap-10 pb-24">
        <TripPackPreview
          content={content}
          plan={plan}
          gear={gear}
          nights={nights}
          adults={adults}
          kids={kids}
        />
        <TripPackPaywall
          planSlug={slug}
          planTitle={content.cover.title}
          adults={adults}
          kids={kids}
          nights={nights}
          group={out.groupType}
          kidsAge={out.kidsAge}
          activity={out.activityType}
          comfort={out.comfortLevel}
        />
      </div>
    </main>
  )
}

function clamp(n: number, lo: number, hi: number): number {
  if (Number.isNaN(n)) return lo
  return Math.max(lo, Math.min(hi, Math.floor(n)))
}
