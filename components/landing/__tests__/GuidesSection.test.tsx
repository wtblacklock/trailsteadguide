// @vitest-environment jsdom
/**
 * The load-bearing assertion here is the first one: every guide keeps a
 * one-click path from the homepage.
 *
 * That is why the exhaustive list exists at all - it cleared a GSC
 * "Discovered - currently not indexed" cluster for guides that were two
 * clicks deep. The section is easy to "tidy" into a JS tab strip or a
 * filter that renders only matching results, both of which look identical
 * in a browser and silently drop 50 anchors out of the HTML. This test
 * fails if that happens.
 */

import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import GuidesSection from '../GuidesSection'
import { GUIDES, GUIDE_CATEGORIES, getGuidesByCategoryId } from '@/lib/guides'

function guideHrefs(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll('a[href^="/guides/"]')).map((a) =>
    a.getAttribute('href')!,
  )
}

describe('GuidesSection', () => {
  it('renders a link to every guide, including ones behind the disclosure', () => {
    const { container } = render(<GuidesSection />)
    const hrefs = new Set(guideHrefs(container))
    const missing = GUIDES.filter((g) => !hrefs.has(`/guides/${g.slug}`))

    expect(missing.map((g) => g.slug)).toEqual([])
    expect(GUIDES.length).toBeGreaterThanOrEqual(56)
  })

  it('keeps collapsed guides in the markup rather than rendering on demand', () => {
    const { container } = render(<GuidesSection />)
    const details = container.querySelectorAll('details')
    expect(details.length).toBeGreaterThan(0)

    // Anchors inside a closed <details> are still in the DOM - that is the
    // property the SEO fix depends on.
    for (const d of Array.from(details)) {
      expect(d.hasAttribute('open')).toBe(false)
      expect(within(d as HTMLElement).getAllByRole('link').length).toBeGreaterThan(0)
    }
  })

  it('labels chip categories with the short label and the full title', () => {
    render(<GuidesSection />)
    const texas = screen.getByRole('link', { name: 'Camping in Texas for Beginners' })
    expect(texas).toHaveTextContent('Texas')
    expect(texas).toHaveAttribute('href', '/guides/camping-in-texas-for-beginners')

    const spring = screen.getByRole('link', { name: 'Spring Camping for Beginners' })
    expect(spring).toHaveTextContent('Spring')
  })

  it('shows full titles for list categories', () => {
    render(<GuidesSection />)
    expect(
      screen.getByRole('link', { name: 'Camping for Beginners' }),
    ).toHaveAttribute('href', '/guides/camping-for-beginners')
  })

  it('every chip-display guide has a shortLabel', () => {
    for (const category of GUIDE_CATEGORIES) {
      if (category.homeDisplay !== 'chips') continue
      const missing = getGuidesByCategoryId(category.id).filter((g) => !g.shortLabel)
      expect({ category: category.id, missing: missing.map((g) => g.slug) }).toEqual({
        category: category.id,
        missing: [],
      })
    }
  })

  it('links each category hub', () => {
    const { container } = render(<GuidesSection />)
    for (const category of GUIDE_CATEGORIES) {
      expect(
        container.querySelector(`a[href="/guides/${category.slug}"]`),
      ).not.toBeNull()
    }
  })
})
