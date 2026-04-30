'use client'

/**
 * PrintableThumbnail — a small, scaled-down rendering of the printable
 * artwork. Same renderer components as `<PrintablePreview />` so we
 * never duplicate the artwork; only the scaling envelope changes.
 *
 * Used on the /printables hub cards and on skill-page analog-companion
 * blocks so visitors see what they'll get without clicking through.
 *
 * Pair with `<PrintableLightbox />` for click-to-enlarge.
 *
 * Anti-copy hardening: text inside the preview cannot be selected,
 * pointer events on the artwork are disabled (so it can't be dragged
 * out as an image either), and right-click is suppressed. None of this
 * stops a determined user with devtools — it stops casual copy/paste.
 */

import ConstellationWheel from './ConstellationWheel'
import CookingConversionCard from './CookingConversionCard'
import BackyardTestChecklist from './BackyardTestChecklist'
import FireStartingChecklist from './FireStartingChecklist'
import KnotReferenceCard from './KnotReferenceCard'

const RENDERERS: Record<string, React.ComponentType> = {
  'northern-hemisphere-constellation-wheel': ConstellationWheel,
  'camp-cooking-conversion-card': CookingConversionCard,
  'backyard-test-checklist': BackyardTestChecklist,
  'fire-starting-checklist': FireStartingChecklist,
  'knot-reference-card': KnotReferenceCard,
}

type Props = {
  slug: string
  /** Visual scale, 1 = full print size. Default 0.32 fits the hub cards. */
  scale?: number
  /** Aspect-locked container height, defaults to a nice card thumbnail. */
  heightClass?: string
}

export default function PrintableThumbnail({
  slug,
  scale = 0.32,
  heightClass = 'h-56 md:h-64',
}: Props) {
  const Renderer = RENDERERS[slug]
  if (!Renderer) return null

  // Wrap the artwork in a clipped envelope so the scaled-down render
  // sits inside a predictable container regardless of the artwork's
  // intrinsic 1:1 print dimensions.
  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden bg-[#FAF8F2] ring-1 ring-stone-200 rounded-xl select-none`}
      aria-hidden="true"
      onContextMenu={(e) => e.preventDefault()}
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${100 / scale}%`,
        }}
      >
        <Renderer />
      </div>
      {/* Soft fade at the bottom so cropped content reads as intentional. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#FAF8F2] to-transparent" />
    </div>
  )
}
