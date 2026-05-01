import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PRINTABLES, getPrintableBySlug } from '@/lib/printables'
import { pageMetadata } from '@/lib/seo'
import ConstellationWheel from '@/components/printables/ConstellationWheel'
import CookingConversionCard from '@/components/printables/CookingConversionCard'
import BackyardTestChecklist from '@/components/printables/BackyardTestChecklist'
import FireStartingChecklist from '@/components/printables/FireStartingChecklist'
import KnotReferenceCard from '@/components/printables/KnotReferenceCard'
import AnimalTrackIdCard from '@/components/printables/AnimalTrackIdCard'
import NatureScavengerHuntCard from '@/components/printables/NatureScavengerHuntCard'
import NightSkyBingoCard from '@/components/printables/NightSkyBingoCard'
import ShadowPuppetHandGuide from '@/components/printables/ShadowPuppetHandGuide'
import KidsCampingPackingList from '@/components/printables/KidsCampingPackingList'
import WeatherSignsCard from '@/components/printables/WeatherSignsCard'
import BearBagFoodStorageCard from '@/components/printables/BearBagFoodStorageCard'
import CampFirstAidQuickReference from '@/components/printables/CampFirstAidQuickReference'
import LeaveNoTraceQuickReference from '@/components/printables/LeaveNoTraceQuickReference'
import CampMealPlanner from '@/components/printables/CampMealPlanner'
import PrintTrigger from '@/components/printables/PrintTrigger'

// Slug → artwork component. Each component renders its full-page print
// content; the print page wraps it with the shared header / footer chrome
// and the @media print rules that hide the site nav and footer.
const ARTWORK_RENDERERS: Record<string, React.ComponentType> = {
  'northern-hemisphere-constellation-wheel': ConstellationWheel,
  'camp-cooking-conversion-card': CookingConversionCard,
  'backyard-test-checklist': BackyardTestChecklist,
  'fire-starting-checklist': FireStartingChecklist,
  'knot-reference-card': KnotReferenceCard,
  'animal-track-id-card': AnimalTrackIdCard,
  'nature-scavenger-hunt-card': NatureScavengerHuntCard,
  'night-sky-bingo': NightSkyBingoCard,
  'shadow-puppet-hand-guide': ShadowPuppetHandGuide,
  'kids-camping-packing-list': KidsCampingPackingList,
  'weather-signs-field-card': WeatherSignsCard,
  'bear-bag-food-storage-card': BearBagFoodStorageCard,
  'camp-first-aid-quick-reference': CampFirstAidQuickReference,
  'leave-no-trace-quick-reference': LeaveNoTraceQuickReference,
  '3-day-camp-meal-planner': CampMealPlanner,
}

export function generateStaticParams() {
  return PRINTABLES.map((p) => ({ slug: p.slug }))
}

type Params = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const printable = getPrintableBySlug(slug)
  if (!printable) return {}
  return pageMetadata({
    title: `${printable.title} — Print View`,
    description: printable.description,
    path: `/printables/${printable.slug}/print`,
    noIndex: true, // Print view is for download; landing page is the indexable one.
  })
}

/**
 * Print-optimized view of a printable. Designed to fit on a single
 * Letter / A4 page when the visitor hits ⌘/Ctrl+P. The screen rendering
 * shows the same content with a small "Print this page" button.
 *
 * Each printable slug routes to the matching renderer below.
 */
export default async function PrintablePrintPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const printable = getPrintableBySlug(slug)
  if (!printable) notFound()

  return (
    <main className="printable-print">
      <style>{`
        /* Screen styles — quiet, paper-like preview. */
        body { background: #F5F3EE; }
        .printable-print {
          max-width: 8.5in;
          margin: 24px auto;
          padding: 32px 40px;
          background: #FAF8F2;
          color: #1C1917;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
        }
        .printable-print .print-toolbar {
          margin: 0 auto 16px;
          max-width: 8.5in;
          display: flex;
          justify-content: flex-end;
        }
        .printable-print .print-button {
          padding: 8px 14px;
          background: #1C1917;
          color: #fff;
          border-radius: 6px;
          font-size: 13px;
          border: 0;
          cursor: pointer;
          font-family: 'Figtree', system-ui, sans-serif;
        }
        .printable-print .print-button:hover { background: #292524; }
        .printable-print h1 {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 4px;
        }
        .printable-print .meta {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #78716C;
        }
        .printable-print .brand {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #78716C;
        }
        .printable-print .header-strip {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid #1C1917;
          padding-bottom: 14px;
          margin-bottom: 18px;
        }
        .printable-print .legend {
          margin-top: 18px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 13px;
          line-height: 1.55;
          color: #292524;
          padding-top: 14px;
          border-top: 1px solid #D6D3D1;
        }
        .printable-print .legend h2 {
          font-size: 13px;
          font-weight: 600;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }
        .printable-print .footer-strip {
          margin-top: 18px;
          padding-top: 10px;
          border-top: 1px solid #D6D3D1;
          display: flex;
          justify-content: space-between;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          color: #78716C;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        @media print {
          body { background: #fff; }
          /* Hide the site chrome so only the printable lands on paper. */
          nav, footer, [data-site-chrome] { display: none !important; }
          .printable-print {
            margin: 0;
            box-shadow: none;
            background: #fff;
            padding: 0.4in 0.5in;
            max-width: none;
          }
          .printable-print .print-toolbar { display: none; }
          @page { size: letter; margin: 0; }
        }
      `}</style>

      {(() => {
        const Artwork = ARTWORK_RENDERERS[printable.slug]
        if (!Artwork) {
          return <p>Print view not available for this printable yet.</p>
        }
        return (
          <>
            <div className="print-toolbar">
              <PrintTrigger />
            </div>
            <div className="header-strip">
              <div>
                <p className="meta">Free printable · Trailstead Guide</p>
                <h1>{printable.title}</h1>
              </div>
              <span className="brand">trailsteadguide.com</span>
            </div>

            <Artwork />

            <div className="footer-strip">
              <span>© Trailstead Guide · CC BY-NC 4.0 · trailsteadguide.com/printables</span>
              <span>{printable.formatNote}</span>
            </div>
          </>
        )
      })()}
    </main>
  )
}
