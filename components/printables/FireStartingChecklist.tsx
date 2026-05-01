/**
 * Fire-Starting Checklist — print asset.
 *
 * Single-page guide to building, lighting, maintaining, and extinguishing
 * a campfire. Visual hierarchy walks the four stages. The drown-stir-drown
 * extinguish protocol gets a dedicated callout.
 */

export default function FireStartingChecklist() {
  return (
    <div className="fire-card">
      <style>{`
        .fire-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.55;
        }
        .fire-card h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #57534E;
          margin: 0 0 10px 0;
          padding-bottom: 4px;
          border-bottom: 1px solid #D6D3D1;
        }
        .fire-card .lead {
          font-size: 13px;
          line-height: 1.55;
          color: #44403C;
          margin: 0 0 18px 0;
        }
        .fire-card .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 18px;
        }
        .fire-card .stack {
          background: #FAF8F2;
          border: 1px solid #D6D3D1;
          border-radius: 8px;
          padding: 14px 16px;
        }
        .fire-card .stack h3 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #1C1917;
          margin: 0 0 4px 0;
        }
        .fire-card .stack p {
          font-size: 12px;
          margin: 0;
          color: #44403C;
        }
        .fire-card .stack .qty {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          color: #78716C;
          margin-top: 4px;
        }
        .fire-card ol {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
          counter-reset: step;
        }
        .fire-card ol li {
          font-size: 12.5px;
          line-height: 1.5;
          padding: 6px 0 6px 28px;
          position: relative;
          counter-increment: step;
          border-bottom: 1px dotted #E7E5E4;
        }
        .fire-card ol li::before {
          content: counter(step);
          position: absolute;
          left: 0;
          top: 6px;
          width: 18px;
          height: 18px;
          border: 1.2px solid #1C1917;
          border-radius: 50%;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          line-height: 16px;
          text-align: center;
        }
        .fire-card .extinguish {
          background: #1C1917;
          color: #fff;
          border-radius: 8px;
          padding: 14px 16px;
          margin-top: 4px;
        }
        .fire-card .extinguish h2 {
          color: #c9d4b5;
          border-bottom-color: #44403C;
        }
        .fire-card .extinguish ol li {
          color: #fff;
          border-bottom-color: #44403C;
        }
        .fire-card .extinguish ol li::before {
          border-color: #c9d4b5;
          color: #c9d4b5;
        }
        .fire-card .never {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          color: #78716C;
          margin-top: 12px;
        }
        .fire-card .never strong {
          color: #1C1917;
          font-weight: 600;
        }
      `}</style>

      <p className="lead">
        A camp fire works in four stages — build, light, maintain, extinguish. Skip the last one and you&apos;re how a wildfire starts. Run all four every time.
      </p>

      <h2>The three-tier stack</h2>
      <div className="grid-2">
        <div className="stack">
          <h3>1 · Tinder</h3>
          <p>Anything that catches a flame in seconds: dryer lint, birch bark, wax-coated cotton balls, fire-starter cubes, fatwood shavings.</p>
          <p className="qty">Quantity: a baseball-sized bundle.</p>
        </div>
        <div className="stack">
          <h3>2 · Kindling</h3>
          <p>Pencil-to-thumb-thick dry sticks. Snap, don&apos;t bend. Splits of seasoned firewood work too.</p>
          <p className="qty">Quantity: a forearm-thick bundle.</p>
        </div>
        <div className="stack">
          <h3>3 · Fuelwood</h3>
          <p>Wrist- to forearm-thick split logs. Buy bundled at the camp store — never transport from home.</p>
          <p className="qty">Quantity: 2–3 bundles per evening.</p>
        </div>
        <div className="stack">
          <h3>4 · Lighter / matches</h3>
          <p>Bic lighter, stormproof matches, or a ferro rod. Bring two redundant sources — at least one waterproof.</p>
          <p className="qty">Quantity: 2 sources, kept dry.</p>
        </div>
      </div>

      <h2>Build &amp; light</h2>
      <ol>
        <li>Confirm no fire ban. Build only inside an established ring. Clear a 3-foot radius down to mineral soil.</li>
        <li>Lay the tinder bundle in the center.</li>
        <li>Build a teepee of kindling around the tinder, with a 2-finger gap on the windward side as the door.</li>
        <li>Light the tinder bundle from underneath through that windward gap. Never light from above.</li>
        <li>Once the kindling is burning steadily, add small fuelwood pieces to the structure — don&apos;t smother the kindling.</li>
        <li>Add larger fuelwood as the fire establishes. Maintain airflow; small adjustments only.</li>
      </ol>

      <h2>Teepee vs log cabin</h2>
      <div className="grid-2">
        <div className="stack">
          <h3>Teepee</h3>
          <p>Best for: starting fast, smaller fires, dry conditions. Burns hot and quick, collapses inward.</p>
        </div>
        <div className="stack">
          <h3>Log cabin</h3>
          <p>Best for: long-burn evenings, cooking grates, wet conditions. Slower to start but steadier.</p>
        </div>
      </div>

      <div className="extinguish">
        <h2>Extinguish protocol — drown · stir · drown</h2>
        <ol>
          <li><strong>Drown.</strong> Pour water across the entire fire bed, not just the visible flames. Listen for hissing — keep going until it stops.</li>
          <li><strong>Stir.</strong> Use a stick or shovel to mix ashes, embers, and unburned wood. Embers buried under ash can stay alive for days.</li>
          <li><strong>Drown again.</strong> A second full pour. Touch the back of your hand to the ashes — if it&apos;s warm, the fire is not out.</li>
        </ol>
      </div>

      <p className="never">
        <strong>Never:</strong> burn trash, plastic, foil, or pressure-treated wood &middot; use accelerants &middot; leave a fire unattended &middot; trust the rain to put it out &middot; build a fire in burn-ban country.
      </p>
    </div>
  )
}
