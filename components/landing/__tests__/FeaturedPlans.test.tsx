// @vitest-environment jsdom
/**
 * Guards the hero-image crop framing on the homepage plan cards.
 *
 * The first-weekend-camp photo is a portrait source (1000x1444) rendered
 * into a 16/10 card, so only ~43% of its height survives object-cover. The
 * tent sits around 76% down the frame, which a default centre crop cuts
 * off entirely - the card showed sky. PlanTemplate.heroImagePosition biases
 * the crop window down; this test asserts the value actually reaches the
 * rendered <img>, which is the part that silently regresses if someone
 * strips the inline style or swaps the component for a Tailwind class.
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import FeaturedPlans from '../FeaturedPlans'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'

describe('FeaturedPlans hero crop', () => {
  it('applies the configured object-position for a plan that sets one', () => {
    render(<FeaturedPlans />)
    const plan = PLAN_TEMPLATES['first-weekend-camp']
    expect(plan.heroImagePosition).toBe('50% 85%')

    const img = screen.getByAltText(`${plan.title} reference image`)
    expect(img).toHaveStyle({ objectPosition: '50% 85%' })
  })

  it('falls back to centre for plans that do not set one', () => {
    render(<FeaturedPlans />)
    const plan = PLAN_TEMPLATES['first-night-camp']
    expect(plan.heroImagePosition).toBeUndefined()

    const img = screen.getByAltText(`${plan.title} reference image`)
    expect(img).toHaveStyle({ objectPosition: '50% 50%' })
  })

  it('renders every featured plan card', () => {
    render(<FeaturedPlans />)
    for (const slug of [
      'easy-family-basecamp',
      'first-night-camp',
      'backyard-test',
      'first-weekend-camp',
    ] as const) {
      expect(
        screen.getByAltText(`${PLAN_TEMPLATES[slug].title} reference image`),
      ).toBeInTheDocument()
    }
  })
})
