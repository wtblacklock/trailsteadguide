import { describe, expect, it } from 'vitest'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import { getActivityBySlug } from '@/lib/activities/data'
import { getSkillByRef } from '@/lib/skills/helpers'

describe('PLAN_TEMPLATES - activities & skills integrity', () => {
  const entries = Object.entries(PLAN_TEMPLATES)

  it.each(entries)('%s has 3-5 recommendedActivities', (slug, plan) => {
    expect(plan.recommendedActivities.length, `${slug}`).toBeGreaterThanOrEqual(3)
    expect(plan.recommendedActivities.length, `${slug}`).toBeLessThanOrEqual(5)
  })

  it.each(entries)('%s has 3-4 recommendedSkills', (slug, plan) => {
    expect(plan.recommendedSkills.length, `${slug}`).toBeGreaterThanOrEqual(3)
    expect(plan.recommendedSkills.length, `${slug}`).toBeLessThanOrEqual(4)
  })

  it.each(entries)('%s - every recommendedActivities slug resolves', (slug, plan) => {
    for (const s of plan.recommendedActivities) {
      expect(getActivityBySlug(s), `${slug}: missing activity ${s}`).not.toBeNull()
    }
  })

  it.each(entries)('%s - every recommendedSkills slug resolves', (slug, plan) => {
    for (const ref of plan.recommendedSkills) {
      expect(getSkillByRef(ref.skillSlug), `${slug}: missing skill ${ref.skillSlug}`).not.toBeNull()
    }
  })

  it.each(entries)('%s - every skill ref has a non-empty rationale', (slug, plan) => {
    for (const ref of plan.recommendedSkills) {
      expect(ref.rationale.trim().length, `${slug}: ${ref.skillSlug} rationale`).toBeGreaterThan(0)
    }
  })

  it.each(entries)('%s - every activitySchedule slug resolves', (slug, plan) => {
    const scheduled = [
      ...plan.activitySchedule.day1,
      ...(plan.activitySchedule.day2 ?? []),
      ...(plan.activitySchedule.day3 ?? []),
    ]
    for (const s of scheduled) {
      expect(getActivityBySlug(s), `${slug}: missing activity ${s}`).not.toBeNull()
    }
  })

  it.each(entries)('%s - every recommended activity is scheduled at least once', (slug, plan) => {
    const scheduled = new Set([
      ...plan.activitySchedule.day1,
      ...(plan.activitySchedule.day2 ?? []),
      ...(plan.activitySchedule.day3 ?? []),
    ])
    for (const s of plan.recommendedActivities) {
      expect(scheduled.has(s), `${slug}: ${s} recommended but never scheduled`).toBe(true)
    }
  })
})
