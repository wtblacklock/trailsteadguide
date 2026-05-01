export default function BearBagFoodStorageCard() {
  const goesIn = [
    'All food — packaged, fresh, cooked, or partially eaten',
    'Food wrappers, foil, and cooking waste',
    'Cooking pots, utensils, plates with food residue',
    'Toothpaste, lip balm, chapstick',
    'Soap, hand sanitizer, sunscreen, bug spray',
    'Pet food and water bowls',
    'Empty water bottles that held flavored drinks',
    'Scented candles, air fresheners, baby wipes',
  ]

  const staysOut = [
    'Water (unflavored)',
    'Prescription medications (keep in tent pocket, ask ranger if unsure)',
    'Empty pots rinsed clean and aired out',
  ]

  const pctSteps = [
    { step: 'Rope', detail: '50–70 ft of 550 paracord. Attach to bag with a bowline.' },
    { step: 'Find the branch', detail: 'At least 20 ft high, 10 ft from trunk, 4 inches thick — enough to support ~20 lbs.' },
    { step: 'Throw one end over', detail: 'Tie a stick or rock to the throw end. Aim for 5–6 ft out from the trunk.' },
    { step: 'Attach first bag', detail: 'Clip the food bag to the rope as high as you can reach.' },
    { step: 'Attach second weight', detail: 'Tie the second bag or a counterweight to the free end, same height as the food bag.' },
    { step: 'Push up with a stick', detail: 'Use a long stick to push the bags up until they\'re equal height, at least 12 ft off the ground.' },
    { step: 'Retrieve in the morning', detail: 'Hook the lower bag with a stick or trekking pole to pull it down.' },
  ]

  return (
    <div className="bear-card">
      <style>{`
        .bear-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .bear-card .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 12px 0;
        }
        .bear-card h2 {
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
        .bear-card .top-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        .bear-card .check-list { margin: 0; padding: 0; list-style: none; }
        .bear-card .check-list li {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          font-size: 11px;
          color: #292524;
          padding: 2.5px 0;
          line-height: 1.4;
        }
        .bear-card .box {
          width: 11px;
          height: 11px;
          border: 1.2px solid #A8A29E;
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .bear-card .stays-out li { color: #57534E; font-style: italic; }
        .bear-card .stays-out .box { border-style: dashed; }
        .bear-card ol {
          list-style: none;
          padding: 0;
          margin: 0 0 14px 0;
          counter-reset: pct;
        }
        .bear-card ol li {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 8px;
          font-size: 11.5px;
          padding: 5px 0;
          border-bottom: 1px dotted #E7E5E4;
          counter-increment: pct;
          line-height: 1.4;
        }
        .bear-card ol li:last-child { border-bottom: none; }
        .bear-card ol li::before {
          content: counter(pct);
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border: 1.2px solid #1C1917;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .bear-card ol li .step-label {
          font-family: 'Figtree', system-ui, sans-serif;
          font-weight: 700;
          font-size: 11px;
          color: #1C1917;
        }
        .bear-card ol li .step-detail {
          font-size: 11px;
          color: #44403C;
        }
        .bear-card .canister {
          background: #FAF8F2;
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 10px 14px;
          font-size: 11px;
          color: #292524;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .bear-card .if-happens {
          background: #1C1917;
          color: #fff;
          border-radius: 6px;
          padding: 10px 14px;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          line-height: 1.55;
        }
        .bear-card .if-happens h2 { color: #D6D3D1; border-bottom-color: #44403C; }
      `}</style>

      <p className="lead">
        Bears that get human food become habituated and must be euthanized. Hanging your food correctly takes 10 minutes and protects both your trip and the bear.
      </p>

      <div className="top-cols">
        <div>
          <h2>Goes in the Bear Bag</h2>
          <ul className="check-list">
            {goesIn.map((item) => (
              <li key={item}><span className="box" aria-hidden="true" />{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ marginBottom: '12px' }}>
            <h2>Stays Out (Safe in Tent)</h2>
            <ul className="check-list stays-out">
              {staysOut.map((item) => (
                <li key={item}><span className="box" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="canister">
            <h2 style={{ marginBottom: '6px' }}>Bear Canister Sizing</h2>
            <strong>1 night</strong> — 450–500 cu in per person<br />
            <strong>2–3 nights</strong> — 650–700 cu in per person<br />
            <strong>4–7 nights</strong> — 900+ cu in per person<br />
            <span style={{ color: '#78716C', fontSize: '10px' }}>Required by permit in some wilderness areas. Check before you go.</span>
          </div>
        </div>
      </div>

      <h2>PCT Counter-Balance Hang Method</h2>
      <ol>
        {pctSteps.map((s) => (
          <li key={s.step}>
            <span className="step-label">{s.step}</span>
            <span className="step-detail">{s.detail}</span>
          </li>
        ))}
      </ol>

      <div className="if-happens">
        <h2>If a Bear Gets Your Food</h2>
        Don&apos;t chase it — you won&apos;t win and you could get hurt. Make loud noise to drive it off once it has moved away from camp. Report to the camp host or ranger station: date, time, location, and bear description. The trip is not over — most campers who lose food finish the trip on camp store supplies.
      </div>
    </div>
  )
}
