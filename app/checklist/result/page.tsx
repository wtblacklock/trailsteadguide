import type { Metadata } from 'next'
import ChecklistResult from '@/components/checklist/ChecklistResult'
import type { KidsAgeGroup } from '@/types'

export const metadata: Metadata = {
  title: 'Your Camping Checklist | Trailstead Guide',
  description: 'Your personalized packing checklist, scaled to your family.',
  robots: { index: false, follow: false },
}

const ALLOWED_AGES: KidsAgeGroup[] = ['none', '3-6', '7-12', 'teens']

function clampInt(raw: string | undefined, fallback: number, min: number, max: number): number {
  const n = Number.parseInt(raw ?? '', 10)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

export default async function ChecklistResultPage({
  searchParams,
}: {
  searchParams: Promise<{ adults?: string; kids?: string; nights?: string; ages?: string }>
}) {
  const params = await searchParams
  const adults = clampInt(params.adults, 2, 1, 12)
  const kids = clampInt(params.kids, 0, 0, 12)
  const nights = clampInt(params.nights, 2, 1, 3)
  const ages = (params.ages ?? '')
    .split(',')
    .map((a) => a.trim())
    .filter((a): a is KidsAgeGroup => (ALLOWED_AGES as string[]).includes(a))

  return <ChecklistResult adults={adults} kids={kids} nights={nights} ages={ages} />
}
