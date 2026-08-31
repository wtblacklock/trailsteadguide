import { describe, expect, it } from 'vitest'
import { PRINTABLES } from '@/lib/printables'
import { PLAN_PRINTABLES, getPrintablesForPlan, getPlansLinkedToPrintable, allPlanPrintableSlugs } from '../plan-printables'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import type { PlanSlug } from '@/types'

describe('PLAN_PRINTABLES', () => {
  const planSlugs = Object.keys(PLAN_TEMPLATES) as PlanSlug[]

  it('has an entry for every plan in PLAN_TEMPLATES', () => {
    for (const slug of planSlugs) {
      expect(PLAN_PRINTABLES[slug], `no PLAN_PRINTABLES entry for plan "${slug}"`).toBeDefined()
    }
  })

  it.each(planSlugs)('%s lists 3-5 printables, all valid slugs', (planSlug) => {
    const slugs = PLAN_PRINTABLES[planSlug]
    expect(slugs.length, planSlug).toBeGreaterThanOrEqual(3)
    expect(slugs.length, planSlug).toBeLessThanOrEqual(5)
    for (const s of slugs) {
      expect(PRINTABLES.some((p) => p.slug === s), `${planSlug}: unknown printable slug "${s}"`).toBe(true)
    }
  })

  it('every one of the 15 printables is reachable from at least one plan', () => {
    const covered = new Set(allPlanPrintableSlugs())
    for (const p of PRINTABLES) {
      expect(covered.has(p.slug), `printable "${p.slug}" isn't linked from any plan`).toBe(true)
    }
  })

  it('getPrintablesForPlan resolves real Printable objects in curated order', () => {
    const resolved = getPrintablesForPlan('backyard-test')
    expect(resolved.map((p) => p.slug)).toEqual(PLAN_PRINTABLES['backyard-test'])
  })

  it('getPlansLinkedToPrintable is the true reverse of PLAN_PRINTABLES', () => {
    for (const p of PRINTABLES) {
      const plans = getPlansLinkedToPrintable(p.slug)
      for (const planSlug of plans) {
        expect(PLAN_PRINTABLES[planSlug]).toContain(p.slug)
      }
      // Every plan that lists this printable must show up in the reverse lookup.
      const expectedPlans = planSlugs.filter((s) => PLAN_PRINTABLES[s].includes(p.slug))
      expect(plans.sort()).toEqual(expectedPlans.sort())
    }
  })
})
