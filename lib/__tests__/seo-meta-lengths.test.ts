import { describe, expect, it } from 'vitest'
import { ACTIVITIES } from '@/lib/activities/data'
import { SKILLS } from '@/lib/skills/data'
import { GEAR_SETS } from '@/lib/gear-sets'
import { PRINTABLES } from '@/lib/printables'
import {
  MAX_RENDERED_TITLE_LENGTH,
  TITLE_TEMPLATE_SUFFIX,
  titleWithQualifier,
} from '@/lib/seo'

// Bing flags meta descriptions under ~110 chars as too short; Google cuts
// snippets around 155-160. Templated pages (activities, skills, gear sets)
// carry a dedicated metaDescription so their short taglines aren't reused.
const MIN_DESC = 110
const MAX_DESC = 160

function expectDescription(label: string, desc: string | undefined) {
  expect(desc, `${label} is missing metaDescription`).toBeTruthy()
  const len = desc!.length
  expect(len, `${label} metaDescription is ${len} chars: ${desc}`).toBeGreaterThanOrEqual(MIN_DESC)
  expect(len, `${label} metaDescription is ${len} chars: ${desc}`).toBeLessThanOrEqual(MAX_DESC)
  expect(desc, `${label} metaDescription contains an em/en dash`).not.toMatch(/[\u2013\u2014]/)
}

describe('templated meta descriptions', () => {
  it.each(ACTIVITIES.map((a) => [a.slug, a.metaDescription] as const))('activity %s', (slug, desc) =>
    expectDescription(`activity ${slug}`, desc),
  )

  it.each(SKILLS.map((s) => [`${s.category}/${s.slug}`, s.metaDescription] as const))('skill %s', (key, desc) =>
    expectDescription(`skill ${key}`, desc),
  )

  it.each(Object.values(GEAR_SETS).map((g) => [g.id, g.metaDescription] as const))('gear set %s', (id, desc) =>
    expectDescription(`gear set ${id}`, desc),
  )
})

describe('printable meta descriptions', () => {
  it.each(PRINTABLES.map((p) => [p.slug, p.metaDescription ?? p.description] as const))('printable %s', (slug, desc) =>
    expectDescription(`printable ${slug}`, desc),
  )
})

describe('titleWithQualifier', () => {
  it('keeps the qualifier when it fits', () => {
    expect(titleWithQualifier('Knot Card', ['Free Printable'])).toBe('Knot Card - Free Printable')
  })

  it('falls back to a shorter qualifier, then the bare title', () => {
    const title = 'Kids Camping Packing List'
    expect(titleWithQualifier(title, ['Free Printable', 'Printable'])).toBe(`${title} - Printable`)
    const long = 'Northern Hemisphere Constellation Wheel'
    expect(titleWithQualifier(long, ['Free Printable', 'Printable'])).toBe(long)
  })

  it('keeps every printable title within the rendered budget', () => {
    for (const p of PRINTABLES) {
      const rendered = titleWithQualifier(p.title, ['Free Printable', 'Printable']) + TITLE_TEMPLATE_SUFFIX
      // A bare title that is itself too long can't be fixed by the helper.
      if (p.title.length + TITLE_TEMPLATE_SUFFIX.length <= MAX_RENDERED_TITLE_LENGTH) {
        expect(rendered.length, rendered).toBeLessThanOrEqual(MAX_RENDERED_TITLE_LENGTH)
      }
    }
  })
})
