import { describe, it, expect } from 'vitest'
import {
  shouldRenderKidGear,
  filterAffiliateProducts,
} from '../AffiliateBlock'
import type { AffiliateProduct } from '@/types'
import type { QuizOutput } from '@/lib/personalization/types'

const tent: AffiliateProduct = {
  id: 'sample-tent',
  name: 'Sample Tent',
  description: 'd',
  imageUrl: '',
  category: 'essential',
  templateSlugs: [],
  priceRange: '$',
  slot: 'TENT',
}

const kidGear: AffiliateProduct = {
  id: 'sample-kid',
  name: 'Sample Kid Gear',
  description: 'd',
  imageUrl: '',
  category: 'convenience',
  templateSlugs: [],
  priceRange: '$',
  slot: 'KID_GEAR',
}

function out(overrides: Partial<QuizOutput> = {}): QuizOutput {
  return {
    planSlug: 'first-night-camp',
    partySize: { adults: 2, kids: 0 },
    groupType: 'couple',
    peopleBucket: '1-2',
    hasKids: false,
    activityType: 'balanced',
    comfortLevel: 'balanced',
    ...overrides,
  }
}

describe('shouldRenderKidGear()', () => {
  it('renders when no quizOutput is provided (un-personalized fallback)', () => {
    expect(shouldRenderKidGear()).toBe(true)
  })

  it('hides when there are no kids', () => {
    expect(shouldRenderKidGear(out({ hasKids: false }))).toBe(false)
  })

  it('renders when kids are under 5', () => {
    expect(shouldRenderKidGear(out({ hasKids: true, kidsAge: 'under_5' }))).toBe(true)
  })

  it('hides when kids are 5–10', () => {
    expect(shouldRenderKidGear(out({ hasKids: true, kidsAge: '5_10' }))).toBe(false)
  })

  it('hides when kids are 10+', () => {
    expect(shouldRenderKidGear(out({ hasKids: true, kidsAge: '10+' }))).toBe(false)
  })

  it('hides when hasKids is true but kidsAge is undefined', () => {
    expect(shouldRenderKidGear(out({ hasKids: true, kidsAge: undefined }))).toBe(false)
  })
})

describe('filterAffiliateProducts()', () => {
  const products = [tent, kidGear]

  it('keeps all products when quizOutput is omitted', () => {
    expect(filterAffiliateProducts(products)).toEqual(products)
  })

  it('drops KID_GEAR when there are no kids', () => {
    const visible = filterAffiliateProducts(products, out({ hasKids: false }))
    expect(visible).toEqual([tent])
  })

  it('keeps KID_GEAR when kidsAge is under_5', () => {
    const visible = filterAffiliateProducts(
      products,
      out({ hasKids: true, kidsAge: 'under_5' }),
    )
    expect(visible).toEqual(products)
  })

  it('drops KID_GEAR for older kids', () => {
    const visible = filterAffiliateProducts(
      products,
      out({ hasKids: true, kidsAge: '5_10' }),
    )
    expect(visible).toEqual([tent])
  })

  it('does not touch non-KID_GEAR products', () => {
    const visible = filterAffiliateProducts([tent], out({ hasKids: false }))
    expect(visible).toEqual([tent])
  })
})
