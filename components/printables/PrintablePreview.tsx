'use client'

/**
 * PrintablePreview — renders the actual print artwork at reduced scale
 * inside a paper-style frame. Used on the /printables/[slug] landing
 * page so visitors see what they'll get before they email-gate it.
 *
 * The same artwork components power the full-size print pages, so the
 * preview is always 1:1 with what gets printed (no separate asset to
 * keep in sync).
 *
 * Anti-copy hardening: text inside cannot be selected, the artwork
 * itself blocks pointer events (so the SVG can't be dragged out as a
 * file), and right-click is suppressed. None of this stops a determined
 * user with devtools — it stops casual copy/paste.
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
  /** Where the "Open the print view" hover-CTA points. */
  printHref: string
}

export default function PrintablePreview({ slug, printHref }: Props) {
  const Renderer = RENDERERS[slug]
  if (!Renderer) return null

  return (
    <figure
      className="printable-preview not-prose select-none"
      aria-label="Preview of the printable"
      onContextMenu={(e) => e.preventDefault()}
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      <style>{`
        .printable-preview {
          margin: 0;
          position: relative;
          background: #FAF8F2;
          border: 1px solid #E7E5E4;
          border-radius: 16px;
          padding: 28px 32px;
          box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.08);
          /*
            Scale the artwork so a one-page print fits comfortably inside
            the preview card without forcing the visitor to zoom. The
            child components define their own internal layouts; we just
            squeeze the rendering down with CSS zoom (which keeps SVG
            crisp at small sizes, unlike transform: scale).
          */
          zoom: 0.78;
        }
        @supports not (zoom: 1) {
          .printable-preview {
            zoom: unset;
            transform: scale(0.78);
            transform-origin: top left;
          }
        }
        .printable-preview::before {
          content: 'Preview';
          position: absolute;
          top: -10px;
          left: 24px;
          background: #1f3622;
          color: #c9d4b5;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 4px;
          /* Keep the badge unscaled visually — zoom inheritance compensated. */
        }
        /*
          Block pointer events on the artwork itself (so SVGs / text
          can't be dragged out or right-clicked-saved), and block image
          dragging globally inside the preview.
        */
        .printable-preview > *:not(style):not(figcaption):not(a) {
          pointer-events: none;
          -webkit-user-drag: none;
        }
        .printable-preview img,
        .printable-preview svg {
          -webkit-user-drag: none;
          user-drag: none;
        }
      `}</style>
      <Renderer />
      <figcaption className="sr-only">
        A reduced-scale preview of the {slug.replace(/-/g, ' ')} printable. Print-quality version is delivered after email signup.
      </figcaption>
      {/*
        Hidden link for crawlers + screen-reader users; visually the
        preview just scrolls users toward the email gate. We keep the
        href so the markup is semantically connected to the full version.
      */}
      <a href={printHref} className="sr-only">
        Open the full print view
      </a>
    </figure>
  )
}
