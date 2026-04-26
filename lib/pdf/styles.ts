/**
 * Print stylesheet for the Trip Pack PDF.
 * Embedded inline; not run through Tailwind. Page size = A4.
 *
 * Strategy: @page reserves physical margins. Each logical `.page` section
 * forces a new physical page via `page-break-after`. Content grows naturally
 * so nothing gets clipped — sections that exceed one page flow to the next.
 *
 * Palette: forest #1f3622 / sage #3a5a3e / sand #f5efe2 / charcoal #1f2622
 */

export const PDF_STYLES = `
  @page {
    size: A4;
    margin: 0;
  }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body {
    margin: 0; padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    color: #1f2622;
    background: #ffffff;
    line-height: 1.5;
    font-size: 10.5pt;
    orphans: 3;
    widows: 3;
  }
  /* Safety: nothing may overflow the paper width. */
  img, svg, table, pre { max-width: 100%; }
  p, h1, h2, h3, h4, li, a, span {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  .page {
    width: 210mm;
    padding: 14mm 16mm 12mm;
    break-before: page;
    page-break-before: always;
    page-break-inside: auto;
    background: #ffffff;
  }

  /* Footer strip — sits at end of each logical section. Slim margin-top so
     the footer fits inside the section's page even when content is dense;
     break-inside: avoid keeps it from splitting across pages on its own. */
  .footer {
    margin-top: 6mm;
    padding-top: 4mm;
    border-top: 1px solid #ece4d2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8mm;
    font-size: 8pt;
    color: #8a9088;
    letter-spacing: 0.4px;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .footer-wordmark {
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 3px;
    color: #3a5a3e;
    text-transform: uppercase;
  }
  .footer-disclosure {
    text-align: right;
    letter-spacing: 0.5px;
  }

  /* COVER PAGE — content-driven height with a forced break after, so the
     cover always owns exactly one physical page without sub-pixel overflow
     bumping a sliver onto page 2. */
  .cover {
    background: linear-gradient(180deg, #f5efe2 0%, #ece4d2 100%);
    width: 210mm;
    min-height: 260mm;
    padding: 26mm 22mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    break-after: page;
    page-break-after: always;
  }
  .cover-logo {
    text-align: center;
    font-weight: 800;
    font-size: 14pt;
    letter-spacing: 8px;
    color: #1f3622;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .cover-titleblock { text-align: center; }
  .cover-eyebrow {
    font-size: 9pt; letter-spacing: 4px; text-transform: uppercase;
    color: #5a6b5e; margin: 0 0 16px;
  }
  .cover-title {
    font-size: 38pt; font-weight: 700; letter-spacing: -1.2px;
    line-height: 1.05; margin: 0 0 14px; color: #1f3622;
  }
  .cover-subtitle {
    font-size: 13pt; font-weight: 500; color: #3a5a3e;
    margin: 0 auto; max-width: 150mm;
  }
  .cover-meta {
    display: flex; justify-content: center; gap: 16px;
    margin-top: 28px;
    font-size: 8.5pt; letter-spacing: 1px; color: #5a6b5e;
    text-transform: uppercase;
    flex-wrap: wrap;
  }
  .cover-meta span {
    padding: 6px 12px; border: 1px solid #c9c0aa; border-radius: 999px; background: #fffaf0;
  }
  .cover-foot {
    text-align: center;
    font-size: 8.5pt;
    color: #5a6b5e;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    max-width: 150mm;
    margin: 0 auto;
    line-height: 1.5;
  }

  /* SECTION HEADERS — keep stuck to following content so a header is never
     orphaned at the bottom of a physical page when the section overflows. */
  .section-eyebrow {
    font-size: 8.5pt; letter-spacing: 3px; text-transform: uppercase;
    color: #3a5a3e; margin: 0 0 6px; font-weight: 600;
    break-after: avoid; page-break-after: avoid;
  }
  .section-title {
    font-size: 22pt; font-weight: 700; letter-spacing: -0.6px;
    line-height: 1.1; margin: 0 0 12px; color: #1f3622;
    break-after: avoid; page-break-after: avoid;
  }
  .section-lede {
    font-size: 10.5pt; color: #4a5450; max-width: 160mm;
    margin: 0 0 18px; line-height: 1.55;
    break-after: avoid; page-break-after: avoid;
  }

  /* OVERVIEW */
  .overview-grid { display: flex; flex-direction: column; gap: 12px; }
  .overview-card {
    background: #f8f4ea;
    border-radius: 10px;
    padding: 16px 18px;
    border: 1px solid #ece4d2;
    page-break-inside: avoid;
  }
  .overview-label {
    font-size: 8.5pt; letter-spacing: 2.5px; text-transform: uppercase;
    color: #3a5a3e; font-weight: 600; margin: 0 0 6px;
  }
  .overview-text {
    font-size: 10.5pt; line-height: 1.55; color: #2c332e; margin: 0;
  }

  /* TIMELINE */
  .timeline-group { margin-bottom: 16px; page-break-inside: auto; }
  .timeline-group:last-child { margin-bottom: 0; }
  .timeline-group-title {
    font-size: 10pt; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #1f3622;
    margin: 0 0 8px; padding-bottom: 5px; border-bottom: 1.5px solid #1f3622;
    break-after: avoid; page-break-after: avoid;
  }
  .timeline-row {
    display: flex; gap: 12px; padding: 8px 0;
    border-bottom: 1px solid #ece4d2;
    page-break-inside: avoid;
  }
  .timeline-row:last-child { border-bottom: none; }
  .timeline-time {
    flex: 0 0 26mm;
    font-size: 9.5pt; font-weight: 600; color: #3a5a3e;
    letter-spacing: 0.3px;
  }
  .timeline-body { flex: 1; min-width: 0; }
  .timeline-title { font-size: 10pt; font-weight: 600; color: #1f2622; margin: 0 0 2px; }
  .timeline-desc { font-size: 9.5pt; color: #4a5450; margin: 0; line-height: 1.45; }

  /* PACKING LIST */
  .packing-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px 18px;
  }
  .packing-cat {
    background: #fffaf0;
    border: 1px solid #ece4d2;
    border-radius: 8px;
    padding: 9px 14px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .packing-cat-title {
    font-size: 9.5pt; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: #3a5a3e;
    margin: 0 0 5px;
  }
  .packing-item {
    display: flex; gap: 8px; align-items: baseline;
    font-size: 9.5pt; color: #2c332e; padding: 1px 0;
  }
  .packing-item .box {
    flex: 0 0 10px; height: 10px; border: 1.5px solid #3a5a3e;
    border-radius: 2px; transform: translateY(1px);
  }
  .packing-item .qty { color: #8a9088; font-size: 8.5pt; margin-left: 4px; }
  .packing-item .note { color: #6a7268; font-size: 8.5pt; margin-left: 4px; font-style: italic; }

  /* GEAR SET */
  .gear-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .gear-card {
    background: #ffffff;
    border: 1px solid #e6dfca;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    page-break-inside: avoid;
    break-inside: avoid;
    box-shadow: 0 1px 0 rgba(0,0,0,0.02);
  }
  .gear-card-img {
    width: 100%;
    height: 32mm;
    background: #f5efe2;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .gear-card-img img {
    max-width: 100%; max-height: 100%; object-fit: contain;
  }
  .gear-card-body { padding: 10px 12px; }
  .gear-cat {
    display: inline-block;
    font-size: 7.5pt; font-weight: 700; letter-spacing: 1.2px;
    text-transform: uppercase; color: #3a5a3e;
    background: #ece4d2; padding: 3px 8px; border-radius: 999px;
    margin-bottom: 6px;
  }
  .gear-name {
    font-size: 10pt; font-weight: 700; color: #1f2622;
    margin: 0 0 4px; line-height: 1.25;
  }
  .gear-desc { font-size: 8.5pt; color: #4a5450; margin: 0 0 10px; line-height: 1.45; }
  .gear-cta {
    display: inline-block;
    font-size: 8.5pt; font-weight: 600; letter-spacing: 0.5px;
    color: #1f3622; text-decoration: none;
    border: 1.5px solid #1f3622; border-radius: 6px;
    padding: 5px 10px;
  }
  .gear-price { font-size: 8.5pt; color: #8a9088; margin-left: 8px; }

  /* MISTAKES */
  .mistake-block {
    background: #fdf6e6;
    border: 1px solid #e8d9a8;
    border-radius: 8px;
    padding: 12px 14px;
    margin-bottom: 10px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .mistake-tag {
    display: inline-block;
    font-size: 7.5pt; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: #8a5a14;
    background: #f0d999; padding: 3px 8px; border-radius: 999px;
    margin-bottom: 6px;
  }
  .mistake-title { font-size: 10.5pt; font-weight: 700; color: #1f2622; margin: 0 0 6px; }
  .mistake-row { font-size: 9.5pt; color: #4a5450; margin: 3px 0; line-height: 1.5; }
  .mistake-row b { color: #1f2622; font-weight: 600; }

  /* FINAL CHECKLIST */
  .final-list {
    background: #1f3622;
    color: #f5efe2;
    border-radius: 12px;
    padding: 24px 26px;
    page-break-inside: avoid;
  }
  .final-list-title {
    font-size: 16pt; font-weight: 700; margin: 0 0 4px; color: #ffffff;
    letter-spacing: -0.3px;
  }
  .final-list-sub {
    font-size: 9.5pt; color: #c9d6cb; margin: 0 0 14px;
  }
  .final-row {
    display: flex; gap: 12px; align-items: baseline;
    padding: 9px 0; border-top: 1px solid #2f4a32;
    font-size: 10.5pt;
  }
  .final-row:first-of-type { border-top: none; }
  .final-row .box {
    flex: 0 0 12px; height: 12px;
    border: 1.5px solid #c9d6cb; border-radius: 2px;
    transform: translateY(2px);
  }

  /* ACTIVITIES PLAN */
  .activity-pdf-day {
    font-size: 10pt; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #1f3622;
    margin: 0 0 8px; padding-bottom: 5px; border-bottom: 1.5px solid #1f3622;
    break-after: avoid; page-break-after: avoid;
  }
  .activity-pdf-day + .activity-pdf-grid { margin-bottom: 18px; }
  .activity-pdf-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
    margin-bottom: 14px;
  }
  .activity-pdf-card {
    background: #f8f4ea;
    border: 1px solid #ece4d2;
    border-radius: 8px;
    padding: 11px 13px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .activity-pdf-title {
    font-size: 10.5pt; font-weight: 700; color: #1f2622;
    margin: 0 0 4px; line-height: 1.25;
  }
  .activity-pdf-tagline {
    font-size: 9pt; color: #4a5450; margin: 0 0 6px; line-height: 1.45;
  }
  .activity-pdf-badges {
    display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 6px;
  }
  .activity-pdf-badges span {
    font-size: 7.5pt; font-weight: 600; letter-spacing: 0.5px;
    text-transform: uppercase;
    background: #ece4d2; color: #3a5a3e;
    padding: 2px 7px; border-radius: 999px;
  }
  .activity-pdf-preview {
    font-size: 8.5pt; color: #4a5450; margin: 0; line-height: 1.45;
    font-style: italic;
  }

  /* SKILLS USED */
  .skill-pdf-card {
    background: #fffaf0;
    border: 1px solid #ece4d2;
    border-radius: 8px;
    padding: 12px 14px;
    margin-bottom: 10px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .skill-pdf-cat {
    display: inline-block;
    font-size: 7.5pt; font-weight: 700; letter-spacing: 1.2px;
    text-transform: uppercase; color: #3a5a3e;
    background: #ece4d2; padding: 3px 8px; border-radius: 999px;
    margin-bottom: 6px;
  }
  .skill-pdf-title {
    font-size: 11pt; font-weight: 700; color: #1f2622;
    margin: 0 0 3px; line-height: 1.25;
  }
  .skill-pdf-tagline {
    font-size: 9pt; color: #4a5450; margin: 0 0 6px; line-height: 1.45;
  }
  .skill-pdf-rationale {
    font-size: 9pt; color: #2c332e; margin: 0 0 8px; line-height: 1.5;
  }
  .skill-pdf-rationale b { color: #1f3622; font-weight: 700; }
  .skill-pdf-steps {
    list-style: none; padding: 0; margin: 0 0 8px;
  }
  .skill-pdf-steps li {
    font-size: 9pt; color: #2c332e; margin: 0 0 4px; line-height: 1.45;
    padding-left: 0;
  }
  .skill-pdf-num {
    font-weight: 700; color: #3a5a3e; margin-right: 4px;
  }
  .skill-pdf-link {
    font-size: 8pt; color: #6a7268; margin: 0; letter-spacing: 0.3px;
  }
  /* Cover personalization chip */
  .cover-chip {
    margin: 12px 0 0;
    font-size: 9.5pt; color: #4a5450;
    letter-spacing: 0.3px;
  }
  /* Cover stamps — small muted lines under the chip / subtitle */
  .cover-stamp {
    margin: 4px 0 0;
    font-size: 8.5pt; color: #8a9088;
    letter-spacing: 0.4px;
  }
  .cover-stamp:first-of-type {
    margin-top: 14px;
  }
  /* Gear systems section */
  .gs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 8px;
  }
  .gs-card {
    border: 1px solid #e6e0d0;
    border-radius: 10px;
    padding: 12px 14px;
    background: #fbf8f1;
  }
  .gs-title {
    font-size: 11pt; font-weight: 700; color: #1f3622;
    margin: 0 0 4px;
  }
  .gs-desc {
    font-size: 9pt; color: #4a5450;
    margin: 0 0 8px; line-height: 1.45;
  }
  .gs-structure {
    list-style: none; padding: 0; margin: 0 0 8px;
  }
  .gs-structure li {
    font-size: 9pt; color: #2c332e;
    margin: 0 0 2px; padding-left: 12px; position: relative;
  }
  .gs-structure li::before {
    content: "—"; position: absolute; left: 0; color: #b9b09a;
  }
  .gs-cat {
    margin-top: 6px;
  }
  .gs-cat-title {
    font-size: 7.5pt; font-weight: 700; letter-spacing: 1.2px;
    text-transform: uppercase; color: #6a7268;
    margin: 0 0 3px;
  }
  .gs-products {
    list-style: none; padding: 0; margin: 0;
  }
  .gs-products li {
    font-size: 9pt; color: #2c332e; margin: 0 0 2px;
  }
  .gs-price {
    color: #6a7268; font-size: 8.5pt;
  }
`
