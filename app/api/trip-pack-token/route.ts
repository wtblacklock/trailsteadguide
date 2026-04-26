import { NextResponse } from 'next/server'
import { signToken } from '@/lib/pdf/token'
import { sendTripPackEmail } from '@/lib/pdf/email'
import type { PlanSlug } from '@/types'
import type {
  ActivityType,
  ComfortLevel,
  GroupType,
  KidsAgeBucket,
} from '@/lib/personalization/types'

const VALID_GROUP: ReadonlySet<GroupType> = new Set(['solo', 'couple', 'family'])
const VALID_KIDS_AGE: ReadonlySet<KidsAgeBucket> = new Set(['under_5', '5_10', '10+'])
const VALID_ACTIVITY: ReadonlySet<ActivityType> = new Set(['relaxing', 'balanced', 'active'])
const VALID_COMFORT: ReadonlySet<ComfortLevel> = new Set(['minimal', 'balanced', 'comfort-first'])

function pickEnum<T extends string>(raw: unknown, valid: ReadonlySet<T>): T | undefined {
  return typeof raw === 'string' && valid.has(raw as T) ? (raw as T) : undefined
}

export const runtime = 'nodejs'

const VALID_PLANS: PlanSlug[] = [
  'backyard-test',
  'first-night-camp',
  'first-weekend-camp',
  'easy-family-basecamp',
]

/**
 * POST /api/trip-pack-token
 * Body: { plan, adults, kids, nights, email }
 *
 * In email-gate mode (no Stripe), this immediately returns a download URL.
 * In Stripe mode, the Stripe webhook calls signToken instead, and this
 * route is unreachable from the paywall UI.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    plan?: string
    adults?: number
    kids?: number
    nights?: number
    email?: string
    group?: string
    kidsAge?: string
    activity?: string
    comfort?: string
  } | null
  if (!body) return NextResponse.json({ error: 'Bad JSON' }, { status: 400 })

  const plan = body.plan as PlanSlug
  if (!VALID_PLANS.includes(plan)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }
  const adults = clamp(body.adults ?? 2, 1, 10)
  const kids = clamp(body.kids ?? 0, 0, 10)
  const nights = clamp(body.nights ?? 1, 1, 7)
  const email = typeof body.email === 'string' && body.email.includes('@') ? body.email : undefined

  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const group = pickEnum(body.group, VALID_GROUP)
  const kidsAge = pickEnum(body.kidsAge, VALID_KIDS_AGE)
  const activity = pickEnum(body.activity, VALID_ACTIVITY)
  const comfort = pickEnum(body.comfort, VALID_COMFORT)

  const token = signToken({ plan, adults, kids, nights, email, group, kidsAge, activity, comfort })
  const relativeDownload = `/api/generate-pdf?token=${encodeURIComponent(token)}`

  // Build an absolute URL so the email link works from any inbox.
  const origin =
    req.headers.get('origin') ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    `https://${req.headers.get('host') || 'www.trailsteadguide.com'}`
  const absoluteDownload = `${origin}${relativeDownload}`

  // Fire the email (no-op if RESEND_* env vars aren't set).
  const emailResult = await sendTripPackEmail({
    to: email,
    plan,
    downloadUrl: absoluteDownload,
    tier: 'basic',
  })
  if (!emailResult.ok && !emailResult.skipped) {
    console.error('[trip-pack-token] email send failed', emailResult.error)
  }

  return NextResponse.json({
    token,
    downloadUrl: relativeDownload,
    emailSent: emailResult.ok,
  })
}

function clamp(n: number, lo: number, hi: number): number {
  if (Number.isNaN(n)) return lo
  return Math.max(lo, Math.min(hi, Math.floor(n)))
}
