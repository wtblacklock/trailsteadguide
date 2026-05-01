import Link from 'next/link'
import type { Activity } from '@/lib/activities/types'
import { getPlanTemplate } from '@/lib/plan-templates'
import { getPrintableBySlug } from '@/lib/printables'
import PrintableEmailGate from '@/components/printables/PrintableEmailGate'
import ActivityBadge from './ActivityBadge'

// Manual activity → printable pairings. Adding a slug here surfaces the
// printable card on that activity's detail page. Keep it slim — these are
// editorial pairings, not generic recommendations.
const ACTIVITY_PRINTABLE_PAIRINGS: Record<string, string> = {
  'stargazing-constellation-hunt': 'northern-hemisphere-constellation-wheel',
}
import {
  AGE_LABELS,
  CATEGORY_LABELS,
  ENERGY_LABELS,
  GROUP_LABELS,
  SETUP_LABELS,
  TIME_LABELS,
  VIBE_LABELS,
} from './labels'

interface Props {
  activity: Activity
}

export default function ActivityDetail({ activity }: Props) {
  return (
    <article className="bg-[#F5F3EE]">
      <div className="max-w-content mx-auto px-6 pt-12 pb-6 md:pt-16">
        <Link
          href="/activities"
          className="inline-flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 mb-8"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to all activities
        </Link>
        <p className="text-xs uppercase tracking-widest text-[#2d5016] font-medium mb-4">
          {CATEGORY_LABELS[activity.category]}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 tracking-tight leading-[1.1] mb-4">
          {activity.title}
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-8">{activity.tagline}</p>
        <div className="flex flex-wrap gap-2">
          <ActivityBadge label={AGE_LABELS[activity.ageRange]} tone="age" />
          <ActivityBadge label={GROUP_LABELS[activity.groupSize]} tone="group" />
          <ActivityBadge label={ENERGY_LABELS[activity.energyLevel]} tone="energy" />
          <ActivityBadge label={TIME_LABELS[activity.timeRequired]} tone="time" />
          <ActivityBadge label={SETUP_LABELS[activity.setupDifficulty]} tone="setup" />
          <ActivityBadge label={VIBE_LABELS[activity.vibe]} tone="category" />
        </div>
      </div>

      <div className="max-w-content mx-auto px-6 py-10 md:py-14 space-y-12">
        <Section title="What you need">
          {activity.materials.length === 0 ? (
            <p className="text-stone-600">Nothing — bring yourself.</p>
          ) : (
            <ul className="space-y-2">
              {activity.materials.map((m, i) => (
                <li key={i} className="flex gap-3 text-stone-700">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="How to play">
          <ol className="space-y-4">
            {activity.instructions.map((step, i) => (
              <li key={i} className="flex gap-4 text-stone-700">
                <span className="font-serif text-2xl text-stone-300 leading-none shrink-0 w-8">
                  {i + 1}.
                </span>
                <span className="pt-1 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        {activity.winCondition && (
          <Section title="What success looks like">
            <p className="text-stone-700 leading-relaxed">{activity.winCondition}</p>
          </Section>
        )}

        {activity.variations.length > 0 && (
          <Section title="Variations">
            <ul className="space-y-3">
              {activity.variations.map((v, i) => (
                <li key={i} className="flex gap-3 text-stone-700">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                  <span className="leading-relaxed">{v}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {activity.safetyNotes.length > 0 && (
          <Section title="Safety notes">
            <ul className="space-y-3">
              {activity.safetyNotes.map((note, i) => (
                <li key={i} className="flex gap-3 text-stone-700">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5c3d1e] shrink-0" />
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {ACTIVITY_PRINTABLE_PAIRINGS[activity.slug] && (
          <PrintableCompanion slug={ACTIVITY_PRINTABLE_PAIRINGS[activity.slug]} />
        )}

        {activity.recommendedFor && activity.recommendedFor.length > 0 && (
          <RecommendedPlans planSlugs={activity.recommendedFor} />
        )}
      </div>
    </article>
  )
}

function PrintableCompanion({ slug }: { slug: string }) {
  const printable = getPrintableBySlug(slug)
  if (!printable) return null
  return (
    <section aria-labelledby={`printable-companion-${printable.slug}`} className="mb-8">
      <p
        id={`printable-companion-${printable.slug}`}
        className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3"
      >
        Analog companion
      </p>
      <PrintableEmailGate
        printableSlug={printable.slug}
        printHref={`/printables/${printable.slug}/print`}
        eyebrow="Free with email"
        headline={printable.title}
        description={printable.tagline}
        submitLabel="Email it to me"
      />
      <p className="mt-3 text-xs text-stone-500">
        Prefer the full landing page first? <Link href={`/printables/${printable.slug}`} className="underline decoration-stone-300 underline-offset-4 hover:text-stone-900 transition-colors">See the {printable.title.toLowerCase()}</Link>.
      </p>
    </section>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-stone-900 mb-5">{title}</h2>
      {children}
    </section>
  )
}

function RecommendedPlans({ planSlugs }: { planSlugs: string[] }) {
  const plans = planSlugs
    .map((slug) => getPlanTemplate(slug))
    .filter((p): p is NonNullable<ReturnType<typeof getPlanTemplate>> => p !== null)
  if (plans.length === 0) return null
  return (
    <section className="bg-white border border-stone-200 rounded-xl p-6 md:p-8">
      <h2 className="font-serif text-xl text-stone-900 mb-2">Works great with these trip plans</h2>
      <p className="text-stone-600 text-sm mb-5">
        Already planning one of these? This activity fits right in.
      </p>
      <ul className="space-y-2">
        {plans.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/plans/${p.slug}`}
              className="inline-flex items-center gap-1 text-stone-900 hover:text-[#2d5016] font-medium"
            >
              {p.title}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
