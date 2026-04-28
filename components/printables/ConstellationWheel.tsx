/**
 * Northern Hemisphere Constellation Wheel — print asset.
 *
 * Four circular sky maps, one per season, each centered on Polaris (true
 * for ~40°N latitude — covers the lower 48 reasonably). Star positions
 * are stylized rather than astronomically precise: the goal is "I can
 * find this shape in the sky" not "use this for celestial navigation."
 *
 * Coordinates within each disc are normalized 0–100, with (50, 50) at
 * the zenith (center) and edge = horizon. Polaris sits high in the
 * north (y ≈ 22) in every season.
 */

type Star = {
  /** Relative x position, 0–100. */
  x: number
  /** Relative y position, 0–100. */
  y: number
  /** Visual size — roughly maps to magnitude (1 = brightest). */
  mag?: 1 | 2 | 3
  /** Star name shown next to the dot. */
  label?: string
}

type Constellation = {
  name: string
  /** Where to place the name label inside the disc, normalized 0–100. */
  labelAt: { x: number; y: number }
  stars: Star[]
  /** Pairs of star indices to connect with a line. */
  lines: Array<[number, number]>
}

type Disc = {
  season: string
  monthRange: string
  blurb: string
  constellations: Constellation[]
}

const DISC_RADIUS = 180
const DISC_CX = 200
const DISC_CY = 200

// Polaris reference point — the same in every disc (Northern Hemisphere
// stargazing is built around this anchor). Roughly 40°N latitude. The
// dot itself is unlabeled; the constellation-name label below the dot is
// what visitors read.
const POLARIS = { x: 50, y: 22, mag: 2 as const }

// Polaris on its own as a "constellation" of one bright star, so each disc
// pulls it in identically without us repeating the coords.
const POLARIS_CONSTELLATION: Constellation = {
  name: 'Polaris',
  labelAt: { x: POLARIS.x + 6, y: POLARIS.y + 4 },
  stars: [POLARIS],
  lines: [],
}

const DISCS: Disc[] = [
  {
    season: 'Spring',
    monthRange: 'March – May, 9pm',
    blurb: 'Big Dipper overhead. Leo riding the meridian. Cassiopeia low north.',
    constellations: [
      // Big Dipper — high overhead in spring, north of zenith
      {
        name: 'Big Dipper',
        labelAt: { x: 38, y: 35 },
        stars: [
          { x: 38, y: 28, mag: 1 }, // 0 Dubhe
          { x: 44, y: 32, mag: 2 }, // 1 Merak
          { x: 50, y: 36, mag: 2 }, // 2 Phecda
          { x: 56, y: 40, mag: 2 }, // 3 Megrez
          { x: 62, y: 36, mag: 1 }, // 4 Alioth
          { x: 68, y: 32, mag: 1 }, // 5 Mizar
          { x: 74, y: 30, mag: 2 }, // 6 Alkaid
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [3, 0]],
      },
      // Cassiopeia — low in the north opposite the Dipper
      {
        name: 'Cassiopeia',
        labelAt: { x: 60, y: 6 },
        stars: [
          { x: 42, y: 12, mag: 2 },
          { x: 48, y: 8, mag: 2 },
          { x: 54, y: 12, mag: 2 },
          { x: 60, y: 8, mag: 2 },
          { x: 66, y: 12, mag: 2 },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
      },
      POLARIS_CONSTELLATION,
      // Leo — overhead, rough sickle + triangle
      {
        name: 'Leo',
        labelAt: { x: 65, y: 70 },
        stars: [
          { x: 56, y: 58, mag: 1, label: 'Regulus' },
          { x: 60, y: 53, mag: 2 },
          { x: 64, y: 50, mag: 3 },
          { x: 67, y: 55, mag: 3 },
          { x: 72, y: 60, mag: 2 },
          { x: 76, y: 70, mag: 2, label: 'Denebola' },
          { x: 64, y: 66, mag: 3 },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]],
      },
      // Boötes (low simplified: just kite shape ending in Arcturus)
      {
        name: 'Boötes',
        labelAt: { x: 22, y: 70 },
        stars: [
          { x: 30, y: 78, mag: 1, label: 'Arcturus' },
          { x: 26, y: 70, mag: 2 },
          { x: 22, y: 60, mag: 3 },
          { x: 32, y: 60, mag: 3 },
        ],
        lines: [[0, 1], [1, 2], [1, 3]],
      },
    ],
  },
  {
    season: 'Summer',
    monthRange: 'June – August, 9pm',
    blurb: 'Summer Triangle overhead. Big Dipper sliding west. Scorpius low south.',
    constellations: [
      // Summer Triangle: Vega, Deneb, Altair
      {
        name: 'Summer Triangle',
        labelAt: { x: 60, y: 56 },
        stars: [
          { x: 48, y: 42, mag: 1, label: 'Vega' },
          { x: 56, y: 38, mag: 1, label: 'Deneb' },
          { x: 60, y: 60, mag: 1, label: 'Altair' },
        ],
        lines: [[0, 1], [1, 2], [2, 0]],
      },
      // Cygnus — the Northern Cross — built around Deneb
      {
        name: 'Cygnus',
        labelAt: { x: 66, y: 38 },
        stars: [
          { x: 56, y: 38, mag: 1 }, // 0 Deneb (shared with Triangle)
          { x: 60, y: 42, mag: 3 },
          { x: 64, y: 46, mag: 3 },
          { x: 68, y: 50, mag: 2 },
          { x: 56, y: 46, mag: 3 },
          { x: 64, y: 42, mag: 3 },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [4, 1], [1, 5]],
      },
      // Big Dipper — low west
      {
        name: 'Big Dipper',
        labelAt: { x: 16, y: 36 },
        stars: [
          { x: 22, y: 32, mag: 1 },
          { x: 18, y: 36, mag: 2 },
          { x: 16, y: 42, mag: 2 },
          { x: 22, y: 44, mag: 2 },
          { x: 28, y: 44, mag: 1 },
          { x: 32, y: 40, mag: 1 },
          { x: 36, y: 36, mag: 2 },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [3, 0]],
      },
      POLARIS_CONSTELLATION,
      // Scorpius — low south, with Antares
      {
        name: 'Scorpius',
        labelAt: { x: 50, y: 90 },
        stars: [
          { x: 44, y: 82, mag: 2 },
          { x: 50, y: 84, mag: 1, label: 'Antares' },
          { x: 56, y: 86, mag: 2 },
          { x: 60, y: 90, mag: 3 },
          { x: 62, y: 86, mag: 3 },
          { x: 64, y: 80, mag: 3 },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
      },
    ],
  },
  {
    season: 'Fall',
    monthRange: 'September – November, 9pm',
    blurb: 'The Great Square overhead. Cassiopeia high. Big Dipper low north.',
    constellations: [
      // Great Square of Pegasus
      {
        name: 'Pegasus (Great Square)',
        labelAt: { x: 58, y: 56 },
        stars: [
          { x: 44, y: 44, mag: 2 },
          { x: 56, y: 44, mag: 2 },
          { x: 56, y: 56, mag: 2 },
          { x: 44, y: 56, mag: 2 },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 0]],
      },
      // Andromeda — chain off the upper-left of the Square
      {
        name: 'Andromeda',
        labelAt: { x: 70, y: 36 },
        stars: [
          { x: 56, y: 44, mag: 2 }, // shared with square (Alpheratz)
          { x: 62, y: 40, mag: 2 },
          { x: 68, y: 36, mag: 2 },
          { x: 74, y: 32, mag: 3 },
        ],
        lines: [[0, 1], [1, 2], [2, 3]],
      },
      // Cassiopeia — high in north
      {
        name: 'Cassiopeia',
        labelAt: { x: 30, y: 22 },
        stars: [
          { x: 28, y: 28, mag: 2 },
          { x: 34, y: 24, mag: 2 },
          { x: 40, y: 28, mag: 2 },
          { x: 46, y: 24, mag: 2 },
          { x: 52, y: 28, mag: 2 },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
      },
      POLARIS_CONSTELLATION,
      // Big Dipper — low north, partially below horizon for some latitudes
      {
        name: 'Big Dipper',
        labelAt: { x: 60, y: 14 },
        stars: [
          { x: 60, y: 8, mag: 1 },
          { x: 64, y: 12, mag: 2 },
          { x: 68, y: 16, mag: 2 },
          { x: 72, y: 14, mag: 2 },
          { x: 76, y: 12, mag: 1 },
          { x: 80, y: 14, mag: 1 },
          { x: 82, y: 18, mag: 2 },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [3, 0]],
      },
    ],
  },
  {
    season: 'Winter',
    monthRange: 'December – February, 9pm',
    blurb: 'Orion in the south. Taurus and the Pleiades west. Sirius blazing low.',
    constellations: [
      // Orion — central, mid-south
      {
        name: 'Orion',
        labelAt: { x: 50, y: 80 },
        stars: [
          { x: 44, y: 60, mag: 1, label: 'Betelgeuse' },
          { x: 56, y: 56, mag: 2 }, // shoulder
          { x: 48, y: 68, mag: 2 }, // belt L
          { x: 50, y: 70, mag: 2 }, // belt M
          { x: 52, y: 72, mag: 2 }, // belt R
          { x: 56, y: 80, mag: 1, label: 'Rigel' },
          { x: 44, y: 80, mag: 2 }, // foot
        ],
        lines: [[0, 1], [0, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]],
      },
      // Taurus + Aldebaran + Pleiades cluster
      {
        name: 'Taurus',
        labelAt: { x: 30, y: 56 },
        stars: [
          { x: 32, y: 60, mag: 1, label: 'Aldebaran' },
          { x: 36, y: 56, mag: 3 },
          { x: 30, y: 56, mag: 3 },
          { x: 24, y: 50, mag: 3, label: 'Pleiades' },
        ],
        lines: [[0, 1], [0, 2], [1, 3]],
      },
      // Sirius — Canis Major, low SE
      {
        name: 'Canis Major',
        labelAt: { x: 70, y: 86 },
        stars: [{ x: 72, y: 88, mag: 1, label: 'Sirius' }],
        lines: [],
      },
      POLARIS_CONSTELLATION,
      // Cassiopeia — high in northwest
      {
        name: 'Cassiopeia',
        labelAt: { x: 28, y: 18 },
        stars: [
          { x: 24, y: 24, mag: 2 },
          { x: 30, y: 20, mag: 2 },
          { x: 36, y: 24, mag: 2 },
          { x: 42, y: 20, mag: 2 },
          { x: 48, y: 24, mag: 2 },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
      },
    ],
  },
]

function pct(v: number): number {
  // Map normalized 0–100 inside disc → SVG coordinates around the disc center.
  // 50,50 → cx,cy. Edges at 0,0 → cx − r, cy − r.
  return (v - 50) * (DISC_RADIUS / 50)
}

function starRadius(mag: 1 | 2 | 3 = 2): number {
  return mag === 1 ? 3.4 : mag === 2 ? 2.4 : 1.6
}

function SkyDisc({ disc }: { disc: Disc }) {
  return (
    <svg viewBox="0 0 400 460" className="w-full h-auto" role="img" aria-label={`${disc.season} sky map`}>
      {/* Disc background */}
      <circle cx={DISC_CX} cy={DISC_CY} r={DISC_RADIUS} fill="#FAF8F2" stroke="#1C1917" strokeWidth="1.5" />
      {/* Cardinal labels */}
      <text x={DISC_CX} y={DISC_CY - DISC_RADIUS - 6} textAnchor="middle" className="cardinal">N</text>
      <text x={DISC_CX + DISC_RADIUS + 12} y={DISC_CY + 4} textAnchor="middle" className="cardinal">E</text>
      <text x={DISC_CX} y={DISC_CY + DISC_RADIUS + 14} textAnchor="middle" className="cardinal">S</text>
      <text x={DISC_CX - DISC_RADIUS - 12} y={DISC_CY + 4} textAnchor="middle" className="cardinal">W</text>

      {/* Constellations */}
      {disc.constellations.map((c, ci) => {
        const points = c.stars.map((s) => ({
          cx: DISC_CX + pct(s.x),
          cy: DISC_CY + pct(s.y),
          star: s,
        }))
        return (
          <g key={ci}>
            {/* Lines */}
            {c.lines.map(([a, b], li) => (
              <line
                key={li}
                x1={points[a].cx}
                y1={points[a].cy}
                x2={points[b].cx}
                y2={points[b].cy}
                stroke="#A8A29E"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            ))}
            {/* Stars */}
            {points.map((p, si) => (
              <circle
                key={si}
                cx={p.cx}
                cy={p.cy}
                r={starRadius(p.star.mag)}
                fill="#1C1917"
              />
            ))}
            {/* Star labels (only stars that have a label set, e.g. named ones) */}
            {points.map((p, si) =>
              p.star.label ? (
                <text
                  key={`l-${si}`}
                  x={p.cx + 5}
                  y={p.cy - 4}
                  className="star-label"
                >
                  {p.star.label}
                </text>
              ) : null,
            )}
            {/* Constellation name */}
            <text
              x={DISC_CX + pct(c.labelAt.x)}
              y={DISC_CY + pct(c.labelAt.y)}
              className="constellation-label"
            >
              {c.name}
            </text>
          </g>
        )
      })}

      {/* Title strip below the disc */}
      <text x={DISC_CX} y={420} textAnchor="middle" className="disc-title">
        {disc.season}
      </text>
      <text x={DISC_CX} y={440} textAnchor="middle" className="disc-meta">
        {disc.monthRange}
      </text>
    </svg>
  )
}

export default function ConstellationWheel() {
  return (
    <div className="constellation-wheel">
      {/* Print + screen styles for the SVG text. Inlined so the print page
          doesn't pull external CSS that might be affected by global resets. */}
      <style>{`
        .constellation-wheel { color: #1C1917; }
        .constellation-wheel text {
          font-family: 'Source Serif 4', Georgia, serif;
          fill: #1C1917;
        }
        .constellation-wheel .cardinal {
          font-size: 13px;
          font-weight: 600;
          font-family: 'Figtree', system-ui, sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          fill: #57534E;
        }
        .constellation-wheel .constellation-label {
          font-size: 11px;
          font-style: italic;
          fill: #44403C;
          text-anchor: middle;
        }
        .constellation-wheel .star-label {
          font-size: 9px;
          font-family: 'Figtree', system-ui, sans-serif;
          fill: #57534E;
        }
        .constellation-wheel .disc-title {
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .constellation-wheel .disc-meta {
          font-size: 11px;
          font-family: 'Figtree', system-ui, sans-serif;
          fill: #78716C;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
      `}</style>
      <div className="grid grid-cols-2 gap-6 md:gap-8">
        {DISCS.map((disc) => (
          <div key={disc.season}>
            <SkyDisc disc={disc} />
            <p className="mt-1 text-center text-xs text-stone-600 italic px-4">
              {disc.blurb}
            </p>
          </div>
        ))}
      </div>

      <div className="constellation-legend">
        <div>
          <h2>How to use this</h2>
          <p>
            Stand outside after full dark, facing north. Hold the page up
            overhead with the &ldquo;N&rdquo; edge of each disc pointing
            toward Polaris. Use the disc that matches the current season —
            the constellations roughly match what&apos;s overhead at 9pm.
            The sky rotates ~15° per hour, so reorient as the night goes.
          </p>
        </div>
        <div>
          <h2>Reading the dots</h2>
          <p>
            Brighter stars are bigger dots. Lines connect the
            most-recognizable shape of each constellation — they aren&apos;t
            in the actual sky. Polaris is the same point in every disc:
            the sky pivots around it through the night and across the
            seasons.
          </p>
        </div>
      </div>

      <style>{`
        .constellation-legend {
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
        .constellation-legend h2 {
          font-size: 13px;
          font-weight: 600;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }
      `}</style>
    </div>
  )
}
