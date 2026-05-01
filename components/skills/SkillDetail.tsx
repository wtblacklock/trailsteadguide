import Link from 'next/link'
import Image from 'next/image'
import type { Skill, SkillCategory } from '@/lib/skills/types'
import { getSkillByRef } from '@/lib/skills/helpers'
import { AUTHOR_NAME, AUTHOR_IMAGE } from '@/lib/seo'
import { getPrintableBySlug } from '@/lib/printables'
import PrintableEmailGate from '@/components/printables/PrintableEmailGate'
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

        {skill.relatedSkills && skill.relatedSkills.length > 0 && (
          <RelatedSkillsBlock refs={skill.relatedSkills} />
        )}
      </div>

      {/* Full-width plan CTA — sits outside the max-w-content reading column
          so it spans the page like the closing CTAs on guide and printable
          landing pages. */}
      <section className="px-8 pb-16">
        <PlanCta />
      </section>
    </article>
  )
}

function PrintableCompanion({ slug }: { slug: string }) {
  const printable = getPrintableBySlug(slug)
  if (!printable) return null
  return (
    <section aria-labelledby={`printable-companion-${printable.slug}`}>
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
        showThumbnail
      />
      <p className="mt-3 text-xs text-stone-500">
        Prefer the full landing page first? <Link href={`/printables/${printable.slug}`} className="underline decoration-stone-300 underline-offset-4 hover:text-stone-900 transition-colors">See the {printable.title.toLowerCase()}</Link>.
      </p>
    </section>
  )
}

function RelatedSkillsBlock({ refs }: { refs: string[] }) {
  const items = refs
    .map((ref) => getSkillByRef(ref))
    .filter((entry): entry is { skill: Skill; category: SkillCategory } => entry !== null)
  if (items.length === 0) return null
  return (
    <section aria-labelledby="related-skills-heading">
      <h2 id="related-skills-heading" className="font-serif text-2xl text-stone-900 mb-5">
        Continue learning
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(({ skill, category }) => (
          <li key={`${category.slug}/${skill.slug}`}>
            <Link
              href={`/skills/${category.slug}/${skill.slug}`}
              className="group block h-full p-5 rounded-2xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-2">
                {category.label}
              </p>
              <p className="font-serif text-lg font-medium text-stone-900 leading-snug mb-2 group-hover:text-stone-600 transition-colors">
                {skill.title}
              </p>
              <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">
                {skill.tagline}
              </p>
            </Link>
          </li>
        ))}
      </ul>
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
    <div className="bg-stone-900 rounded-3xl p-10 md:p-16 text-white">
      <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">
        Ready to put this to use
      </p>
      <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight mb-4 max-w-2xl">
        Get a starter trip plan in 5 seconds.
      </h2>
      <p className="text-stone-300 text-lg mb-8 max-w-xl">
        The skill clicks once you use it on a real trip. Build a full trip plan in two minutes — gear list, meals, schedule, the works.
      </p>
      <Link
        href="/quiz"
        className="inline-flex items-center justify-center rounded-md font-medium bg-white text-stone-900 hover:bg-stone-100 transition-colors px-6 py-3 text-sm"
      >
        Start the quiz
      </Link>
    </div>
  )
}
