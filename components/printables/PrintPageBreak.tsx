/**
 * Marks the boundary between side 1 and side 2 of a front/back printable.
 * `break-after: page` forces everything after it onto the second physical
 * page when printed. On screen it renders a visible divider so the preview
 * matches what actually prints; that divider collapses to nothing in print
 * (the browser's own page break does the work there).
 *
 * Front/back printable components wrap each side's content in
 * `<div className="print-side print-side-1">` / `print-side-2`, with this
 * component between them. These class names are deliberately unscoped
 * (unlike every other class in these files, which is prefixed with the
 * component's own root class) - they're shared DOM/measurement hooks used
 * identically across every front/back card, not per-component styling
 * classes. No CSS targets them; don't add any without scoping it to a
 * specific card's own print-side, since these render on the same page as
 * other printables' markup on the /printables hub.
 */
export default function PrintPageBreak() {
  return (
    <div className="print-page-break" aria-hidden="true">
      <style>{`
        .print-page-break {
          break-after: page;
          page-break-after: always;
          border-top: 1px dashed #D6D3D1;
          margin: 16px 0;
          padding-top: 5px;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #A8A29E;
          text-align: center;
        }
        .print-page-break::after {
          content: 'Side 2 - prints on the back';
        }
        @media print {
          .print-page-break {
            border: none;
            margin: 0;
            padding: 0;
            height: 0;
            font-size: 0;
            line-height: 0;
          }
          .print-page-break::after {
            content: none;
          }
        }
      `}</style>
    </div>
  )
}
