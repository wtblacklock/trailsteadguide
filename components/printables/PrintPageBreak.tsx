/**
 * Marks the boundary between side 1 and side 2 of a front/back printable.
 * `break-after: page` forces everything after it onto the second physical
 * page when printed. On screen it renders a visible divider so the preview
 * matches what actually prints; that divider collapses to nothing in print
 * (the browser's own page break does the work there).
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
          content: 'Side 2 — prints on the back';
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
