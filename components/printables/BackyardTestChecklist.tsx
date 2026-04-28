/**
 * Backyard Test Pre-Flight Checklist — print asset.
 *
 * Single-page typographic checklist. Designed to be physically checked
 * off with a pen, so the boxes are real.
 */

const PRE_FLIGHT_GROUPS: Array<{ heading: string; items: string[] }> = [
  {
    heading: 'Day before — gear test (allow 60 min)',
    items: [
      'Pitch the tent on a flat patch of grass. Stake every guy-out point.',
      'Crawl in. Lie down. Note hot spots where you can feel the ground.',
      'Light the stove on its lowest setting. Confirm fuel canister is full.',
      'Boil 2 cups of water. Time it — calibrate vs the foil-pack card.',
      'Inflate every sleeping pad. Listen for leaks for 60 minutes.',
      'Power-cycle every headlamp. Replace batteries that flicker.',
      'Test the lantern at the picnic table — bright enough to cook by?',
      'Charge phones, the portable battery pack, and any USB headlamps.',
    ],
  },
  {
    heading: 'Sunset — the real overnight',
    items: [
      'Sleep in the tent the way you’ll sleep at camp: clothes, bag, pillow, no phone screens after dark.',
      'Bring the actual book / activity you’d use to wind kids down.',
      'Run the kid bedtime ritual end-to-end. Note what missing item bites first.',
      'Eat the dinner you plan for night one. Cook on the camp stove, not the kitchen.',
      'No re-entering the house once the tent is zipped.',
    ],
  },
  {
    heading: 'Morning — pack-down rehearsal',
    items: [
      'Pack the tent down in 20 minutes or less. Time it.',
      'Note any wet condensation on the rainfly; it will be worse in real cold.',
      'Make camp coffee on the stove. Confirm the cooler is still cold.',
      'Walk the gear pile. Anything you didn’t touch goes home next time.',
    ],
  },
  {
    heading: 'After-action — the three things you’ll only learn outside',
    items: [
      'Whether your sleeping pad keeps you off the cold ground.',
      'Whether your kid will actually fall asleep in a tent.',
      'Whether the stove + cookset + cooler combo works as a system, not just as separate items.',
    ],
  },
]

export default function BackyardTestChecklist() {
  return (
    <div className="backyard-card">
      <style>{`
        .backyard-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.55;
        }
        .backyard-card h2 {
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
        .backyard-card .group {
          margin-bottom: 16px;
          break-inside: avoid;
        }
        .backyard-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .backyard-card li {
          font-size: 12.5px;
          line-height: 1.45;
          padding: 5px 0 5px 24px;
          position: relative;
          border-bottom: 1px dotted #E7E5E4;
        }
        .backyard-card li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 12px;
          height: 12px;
          border: 1.2px solid #1C1917;
          border-radius: 2px;
        }
        .backyard-card .lead {
          font-size: 13px;
          line-height: 1.55;
          color: #44403C;
          margin: 0 0 18px 0;
        }
      `}</style>

      <p className="lead">
        Run this the weekend before any real camping trip. The yard test answers the questions you can&apos;t answer in a store: does the gear work as a system, will the kid sleep in the tent, will you?
      </p>

      {PRE_FLIGHT_GROUPS.map((g, i) => (
        <section key={i} className="group">
          <h2>{g.heading}</h2>
          <ul>
            {g.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
