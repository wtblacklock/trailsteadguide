type CheckItem = { label: string; note?: string }

const DOG_PROOFING: CheckItem[] = [
  { label: 'Leash/tie-out anchored to a stake, never the picnic table' },
  { label: 'Food and treats sealed in a dry bag or bin, not left out' },
  { label: 'Waste bags packed - more than you think you need' },
  { label: 'Dog bed or closed-cell foam pad staged inside the tent' },
  { label: 'Rabies certificate copy + current medications on hand' },
  { label: 'Tick comb ready for the nightly check' },
  { label: 'Reflective collar or clip-on light for after dark' },
  { label: 'Water container filled - do not rely on creeks or lakes' },
]

export default function CampingWithDogsFieldCard() {
  return (
    <div className="dog-card">
      <style>{`
        .dog-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .dog-card .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 14px 0;
        }
        .dog-card h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #57534E;
          border-bottom: 1px solid #D6D3D1;
          padding-bottom: 3px;
          margin: 0 0 8px 0;
        }
        .dog-card .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        .dog-card .info-list { margin: 0; padding: 0; list-style: none; }
        .dog-card .info-list li {
          font-size: 11px;
          color: #292524;
          padding: 4px 0;
          border-bottom: 1px dotted #E7E5E4;
          line-height: 1.4;
        }
        .dog-card .info-list li:last-child { border-bottom: none; }
        .dog-card .info-list li strong {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          display: block;
          color: #78716C;
          margin-bottom: 1px;
        }
        .dog-card .check-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 14px;
          margin-bottom: 14px;
        }
        .dog-card .check-item {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          padding: 2px 0;
        }
        .dog-card .box {
          width: 11px;
          height: 11px;
          border: 1.2px solid #A8A29E;
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .dog-card .check-item .label {
          font-size: 11px;
          color: #292524;
          line-height: 1.4;
        }
        .dog-card .heat {
          background: #1C1917;
          color: #fff;
          border-radius: 6px;
          padding: 12px 14px;
        }
        .dog-card .heat h2 { color: #D6D3D1; border-bottom-color: #44403C; }
        .dog-card .heat-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          font-size: 10.5px;
          line-height: 1.4;
        }
        .dog-card .heat-row .col strong {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
          color: #FCD34D;
        }
        .dog-card .heat-row .col.warn strong { color: #FCA5A5; }
      `}</style>

      <p className="lead">
        A dog&apos;s first camping trip goes well when the leash setup, the heat plan, and the pack list are settled before you arrive. Keep this card with the dog kit.
      </p>

      <div className="two-col">
        <div>
          <h2>Leash &amp; Tie-Out</h2>
          <ul className="info-list">
            <li><strong>Walking</strong>6-foot leash at all times, even at leash-optional sites - most campgrounds require it.</li>
            <li><strong>At the site</strong>A 15-foot trolley-style tie-out gives real range without wandering into the next site.</li>
            <li><strong>Anchor</strong>Stake or screw-in anchor only. Never tie off to a picnic table - tables move.</li>
            <li><strong>Overnight</strong>Dog sleeps inside the tent on a pad or bed - not tied outside, where barking draws quiet-hours complaints.</li>
          </ul>
        </div>
        <div>
          <h2>Leave No Trace, for Dogs</h2>
          <ul className="info-list">
            <li><strong>Waste</strong>Pack out every bit - dog waste carries parasites wildlife don&apos;t handle the way they handle their own.</li>
            <li><strong>Off-trail</strong>Keep the dog on trail and out of nesting areas, even off-leash-trained dogs.</li>
            <li><strong>Quiet hours</strong>Apply to dogs too. A barking dog after hours risks a ranger visit.</li>
            <li><strong>Water sources</strong>No drinking from creeks or lakes - giardia and blue-green algae are real risks.</li>
          </ul>
        </div>
      </div>

      <h2>Campsite Dog-Proofing Checklist</h2>
      <div className="check-grid">
        {DOG_PROOFING.map((item) => (
          <div key={item.label} className="check-item">
            <span className="box" aria-hidden="true" />
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="heat">
        <h2>Heat &amp; Paw Safety</h2>
        <div className="heat-row">
          <div className="col">
            <strong>Before a hike</strong>
            Press the back of your hand to pavement or rock for 5 seconds. Too hot for your hand means too hot for paws.
          </div>
          <div className="col">
            <strong>Timing</strong>
            Hike at dawn or after 5pm in summer. Dogs cool by panting, which fails above roughly 80°F - skip midday entirely.
          </div>
          <div className="col warn">
            <strong>Heatstroke signs</strong>
            Heavy panting, drooling, glassy eyes, lethargy, vomiting. Move to shade, wet with cool water, get to a vet if it doesn&apos;t ease up fast.
          </div>
        </div>
      </div>
    </div>
  )
}
