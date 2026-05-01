import Link from 'next/link'
import Image from 'next/image'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import type { PlanSlug } from '@/types'

/**
 * Plan order and per-card hook copy per the homepage spec. The hook is a
 * shorter beat than PlanTemplate.tagline (which leans into trip narrative);
 * this wording is the routing-system version — outcome + scenario in one
 * line.
 */
const FEATURED_ORDER: { slug: PlanSlug; hook: string }[] = [
  {
    slug: 'easy-family-basecamp',
    hook: 'Best for first-time family trips with comfort and structure.',
  },
  {
    slug: 'first-night-camp',
    hook: 'Simple overnight setup with minimal gear and stress.',
  },
  {
    slug: 'backyard-test',
    hook: 'Practice your setup before going into the wild.',
  },
  {
    slug: 'first-weekend-camp',
    hook: 'Balanced setup for your first real multi-day trip.',
  },
]

export default function FeaturedPlans() {
  const plans = FEATURED_ORDER.map(({ slug, hook }) => ({
    plan: PLAN_TEMPLATES[slug],
    hook,
  })).filter((x) => x.plan)

  return (
    <section data-reveal className="py-16 md:py-32 max-w-page mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 md:mb-16">
        <div className="col-span-1 md:col-span-5">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-950 tracking-tight leading-tight">
            Choose a proven camping setup.
          </h2>
        </div>
        <div className="col-span-1 md:col-span-5 md:col-start-7 flex items-end mt-4 md:mt-0">
          <p className="text-stone-500 text-lg leading-relaxed">
            Skip the guesswork. Start with a structured plan built for your exact situation.
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map(({ plan, hook }) => (
          <li key={plan.slug}>
            <Link
              href={`/plans/${plan.slug}`}
              className="group block h-full rounded-2xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
                <Image
                  src={plan.heroImage}
                  alt={`${plan.title} reference image`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-8 md:p-10">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
                  Plan
                </p>
                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
                  {plan.title}
                </h3>
                <p className="text-stone-600 leading-relaxed mb-8">{hook}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                  Get this plan
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
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
