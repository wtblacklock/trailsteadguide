/**
 * Camp Knots Reference Card — print asset.
 *
 * Four knot panels in a 2×2 grid: square knot, bowline, taut-line hitch,
 * clove hitch. Each panel has the Wikimedia Commons illustration (used
 * under the same license as the existing skill pages — already attributed
 * in the skill records), three steps, and a "use it for" line.
 *
 * The eslint-disable below is intentional: next/image won't accept
 * arbitrary external SVG hosts without next.config tweaks, and these
 * pages are content-style PDFs that print at 1× — perf optimizations
 * from next/image aren't relevant. Plain <img> is correct here.
 */

type KnotPanel = {
  name: string
  imageSrc: string
  imageAlt: string
  attribution: string
  steps: string[]
  useFor: string
  warn?: string
}

const KNOTS: KnotPanel[] = [
  {
    name: 'Square Knot',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Reef_knot.svg',
    imageAlt: 'Square (reef) knot — two interlocking half-knots',
    attribution: 'Lucasbosch — Wikimedia Commons (CC BY-SA 3.0)',
    steps: [
      'Cross the right end over the left, then under and back up.',
      'Now cross the left end over the right, then under and back up.',
      'Pull both ends to tighten. The two loops should sit flat against each other.',
    ],
    useFor: 'Joining two equal-diameter ropes. Tying a bandage. Bundling a rolled tarp.',
    warn: 'Never use for climbing, rescue, or any load that puts a person at risk.',
  },
  {
    name: 'Bowline',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Bowline.svg',
    imageAlt: 'Bowline knot with a fixed loop',
    attribution: 'Lucasbosch — Wikimedia Commons (CC BY 3.0)',
    steps: [
      'Make a small loop in the standing line, leaving plenty of working end.',
      'Thread the working end up through the loop, around the standing line, and back down through the same loop.',
      'Pull the standing line and the loop tight. The fixed loop will not slip under load.',
    ],
    useFor: 'A loop that won\'t collapse. Securing a rope to a tree. The rescue loop.',
  },
  {
    name: 'Taut-Line Hitch',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/TautlineHitch-ABOK-1800.jpg',
    imageAlt: 'Taut-line hitch tied around a fixed object',
    attribution: 'David J. Fred — Wikimedia Commons (CC BY-SA 2.5)',
    steps: [
      'Wrap the working end twice around the standing line on the load side.',
      'Make one more wrap on the other side, then pass the end through and dress the wraps tight.',
      'Slide the hitch along the standing line to adjust tension. It will hold under load.',
    ],
    useFor: 'Adjustable tension on tent guy lines, tarp ridgelines, food-hang lines.',
  },
  {
    name: 'Clove Hitch',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Webeleinenstek3.svg',
    imageAlt: 'Clove hitch wrapped around a vertical pole',
    attribution: 'Wikimedia Commons (CC BY-SA 3.0)',
    steps: [
      'Pass the rope over the pole, then bring it around and over again, crossing the first wrap.',
      'On the second pass, tuck the working end under the diagonal cross.',
      'Pull both ends tight. The hitch will grip but slip if the pole rotates.',
    ],
    useFor: 'Quick start or finish on a tarp ridge. Tying off to a stake or pole.',
    warn: 'Don\'t use for any load that swings or reverses direction.',
  },
]

export default function KnotReferenceCard() {
  return (
    <div className="knot-card">
      <style>{`
        .knot-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .knot-card .lead {
          font-size: 12.5px;
          color: #44403C;
          margin: 0 0 18px 0;
        }
        .knot-card .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .knot-card .panel {
          border: 1px solid #D6D3D1;
          border-radius: 8px;
          padding: 14px;
          background: #FAF8F2;
          break-inside: avoid;
        }
        .knot-card .panel h3 {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }
        .knot-card .panel .img-wrap {
          background: #fff;
          border: 1px solid #E7E5E4;
          border-radius: 4px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 110px;
          margin-bottom: 8px;
        }
        .knot-card .panel img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
        .knot-card .panel ol {
          padding: 0;
          margin: 0 0 8px 0;
          list-style: none;
          counter-reset: knotstep;
        }
        .knot-card .panel ol li {
          font-size: 11.5px;
          line-height: 1.45;
          padding: 3px 0 3px 22px;
          position: relative;
          counter-increment: knotstep;
        }
        .knot-card .panel ol li::before {
          content: counter(knotstep);
          position: absolute;
          left: 0;
          top: 4px;
          width: 16px;
          height: 16px;
          border: 1px solid #1C1917;
          border-radius: 50%;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          line-height: 14px;
          text-align: center;
        }
        .knot-card .panel .use {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10.5px;
          color: #44403C;
          margin: 4px 0 0 0;
        }
        .knot-card .panel .use strong {
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 9.5px;
          color: #78716C;
          display: block;
          margin-bottom: 2px;
        }
        .knot-card .panel .warn {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          color: #B91C1C;
          margin: 4px 0 0 0;
        }
        .knot-card .panel .attribution {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9px;
          color: #A8A29E;
          margin: 6px 0 0 0;
        }
      `}</style>

      <p className="lead">
        Four knots cover almost everything a camper needs to tie. Master each one with a length of paracord at the kitchen table, then bring this card on the trip.
      </p>

      <div className="grid-2">
        {KNOTS.map((knot) => (
          <div key={knot.name} className="panel">
            <h3>{knot.name}</h3>
            <div className="img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={knot.imageSrc} alt={knot.imageAlt} />
            </div>
            <ol>
              {knot.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <p className="use">
              <strong>Use it for</strong>
              {knot.useFor}
            </p>
            {knot.warn && <p className="warn">⚠ {knot.warn}</p>}
            <p className="attribution">Diagram: {knot.attribution}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
