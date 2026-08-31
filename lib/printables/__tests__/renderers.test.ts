import { describe, expect, it } from 'vitest'
import { PRINTABLES } from '@/lib/printables'
import { RENDERERS as PREVIEW_RENDERERS } from '@/components/printables/PrintablePreview'
import { RENDERERS as THUMBNAIL_RENDERERS } from '@/components/printables/PrintableThumbnail'
import { ARTWORK_RENDERERS } from '@/lib/printables/artwork-renderers'

describe('printable renderer maps stay in sync with the registry', () => {
  const slugs = PRINTABLES.map((p) => p.slug)

  it.each(slugs)('%s has a PrintablePreview renderer', (slug) => {
    expect(PREVIEW_RENDERERS[slug], `PrintablePreview.tsx is missing a renderer for "${slug}"`).toBeDefined()
  })

  it.each(slugs)('%s has a PrintableThumbnail renderer', (slug) => {
    expect(THUMBNAIL_RENDERERS[slug], `PrintableThumbnail.tsx is missing a renderer for "${slug}"`).toBeDefined()
  })

  it.each(slugs)('%s has a print-page ARTWORK renderer', (slug) => {
    expect(ARTWORK_RENDERERS[slug], `app/printables/[slug]/print/page.tsx is missing a renderer for "${slug}"`).toBeDefined()
  })
})
