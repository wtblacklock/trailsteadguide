import Link from 'next/link'
import Image from 'next/image'
import type { Skill, SkillCategory } from '@/lib/skills/types'
import { AUTHOR_NAME, AUTHOR_IMAGE } from '@/lib/seo'
import { getPrintableBySlug } from '@/lib/printables'
import DifficultyBadge from './DifficultyBadge'
import RelatedGearBlock from './RelatedGearBlock'
import SafetyBlock from './SafetyBlock'
import SkillMediaBlock from './SkillMediaBlock'

interface Props {
  skill: Skill
  category: SkillCategory
  /** ISO date (YYYY-MM-DD). Falls back to the schema-default modifier. */
  dateModified?: string
}

const DEFAULT_DATE_MODIFIED = '2026-04-24'

function formatUpdatedLabel(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export default function SkillDetail({ skill, category, dateModified }: Props) {
  const safetyTone = skill.safetyTone ?? 'standard'
  const updatedLabel = formatUpdatedLabel(dateModified ?? DEFAULT_DATE_MODIFIED)
  return (
    <article className="bg-[#F5F3EE]">
      <div className="max-w-content mx-auto px-6 pt-12 pb-6 md:pt-16">
        <Link
          href={`/skills?category=${category.slug}`}
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
          Back to {category.label}
        </Link>
        <p className="text-xs uppercase tracking-widest text-[#2d5016] font-medium mb-4">
          {category.label}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 tracking-tight leading-[1.1] mb-4">
          {skill.title}
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-6">{skill.tagline}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          <DifficultyBadge difficulty={skill.difficulty} />
          {skill.timeRequired && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset bg-stone-100 text-stone-700 ring-stone-200">
              {skill.timeRequired}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-stone-500">
          <Image
            src={AUTHOR_IMAGE}
            alt={`${AUTHOR_NAME} headshot`}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full ring-1 ring-stone-200 object-cover"
          />
          <p>
            By <Link href="/about" className="text-stone-700 hover:text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors">{AUTHOR_NAME}</Link>
            {updatedLabel && <span> · Last updated {updatedLabel}</span>}
          </p>
        </div>
      </div>

      <div className="max-w-content mx-auto px-6 py-10 md:py-14 space-y-12">
        {(skill.useCases.length > 0 || skill.whenToUse) && (
          <Section title="When to use this">
            {skill.whenToUse && <p className="text-stone-700 leading-relaxed mb-4">{skill.whenToUse}</p>}
            {skill.useCases.length > 0 && (
              <ul className="space-y-2">
                {skill.useCases.map((u, i) => (
                  <li key={i} className="flex gap-3 text-stone-700">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}

        {/* Knife & woodcarving spec: Safety First — prominent, before steps. */}
        {safetyTone === 'critical' && skill.safetyNotes && skill.safetyNotes.length > 0 && (
          <SafetyBlock notes={skill.safetyNotes} tone="critical" title="Safety first" />
        )}

        {(skill.videoEmbed || skill.illustration) && (
          <SkillMediaBlock video={skill.videoEmbed} illustration={skill.illustration} />
        )}

        <Section title="What you need">
          {skill.materials.length === 0 ? (
            <p className="text-stone-600">Nothing — bring yourself.</p>
          ) : (
            <ul className="space-y-2">
              {skill.materials.map((m, i) => (
                <li key={i} className="flex gap-3 text-stone-700">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Step by step">
          <ol className="space-y-4">
            {skill.steps.map((step, i) => (
              <li key={i} className="flex gap-4 text-stone-700">
                <span className="font-serif text-2xl text-stone-300 leading-none shrink-0 w-8">
                  {i + 1}.
                </span>
                <span className="pt-1 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        {skill.outcome && (
          <Section title="What success looks like">
            <p className="text-stone-700 leading-relaxed">{skill.outcome}</p>
          </Section>
        )}

        {skill.proTips && skill.proTips.length > 0 && (
          <Section title="Pro tips">
            <ul className="space-y-3">
              {skill.proTips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-stone-700">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2d5016] shrink-0" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {skill.commonMistakes && skill.commonMistakes.length > 0 && (
          <Section title="Common mistakes">
            <ul className="space-y-3">
              {skill.commonMistakes.map((m, i) => (
                <li key={i} className="flex gap-3 text-stone-700">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5c3d1e] shrink-0" />
                  <span className="leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Standard-tone safety block lives near the bottom; critical block already rendered up top. */}
        {safetyTone === 'standard' && skill.safetyNotes && skill.safetyNotes.length > 0 && (
          <SafetyBlock notes={skill.safetyNotes} tone="standard" />
        )}

        {skill.variations && skill.variations.length > 0 && (
          <Section title="Variations">
            <ul className="space-y-3">
              {skill.variations.map((v, i) => (
                <li key={i} className="flex gap-3 text-stone-700">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                  <span className="leading-relaxed">{v}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {skill.relatedGear && skill.relatedGear.length > 0 && (
          <RelatedGearBlock items={skill.relatedGear} />
        )}

        {skill.relatedPrintableSlug && <PrintableCompanion slug={skill.relatedPrintableSlug} />}

        <PlanCta />
      </div>
    </article>
  )
}

function PrintableCompanion({ slug }: { slug: string }) {
  const printable = getPrintableBySlug(slug)
  if (!printable) return null
  return (
    <section className="rounded-xl ring-1 ring-stone-200 p-6 md:p-8 bg-amber-50/40">
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
        Analog companion
      </p>
      <h2 className="font-serif text-xl md:text-2xl text-stone-900 tracking-tight mb-2">
        {printable.title}
      </h2>
      <p className="text-stone-600 text-sm md:text-base mb-4 leading-relaxed">
        {printable.description}
      </p>
      <Link
        href={`/printables/${printable.slug}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 hover:text-stone-600 transition-colors"
      >
        Get the printable
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
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <path d="M5 12h14" />
          <path d="M13 5l7 7-7 7" />
        </svg>
      </Link>
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

function PlanCta() {
  return (
    <section className="bg-stone-900 text-white rounded-xl p-6 md:p-8">
      <h2 className="font-serif text-xl md:text-2xl mb-2">Ready to put this to use?</h2>
      <p className="text-stone-300 text-sm md:text-base mb-5">
        Build a full trip plan in two minutes — gear list, meals, schedule, the works.
      </p>
      <Link
        href="/quiz"
        className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 text-sm font-medium rounded-md hover:bg-stone-100 transition-colors px-5 py-2.5"
      >
        Start your camping plan
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
    </section>
  )
}
