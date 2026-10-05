/**
 * Campsite Setup Diagram - print asset.
 *
 * A labeled top-down layout card: where to put the tent, the kitchen,
 * the fire ring, food storage, and the car relative to each other, plus
 * the spacing guidance behind the layout. Single page, no front/back
 * split needed.
 */

const ZONES: Array<{ label: string; detail: string }> = [
  {
    label: 'Tent zone',
    detail:
      'Level, high ground first - water runs downhill, so avoid the low point of the site. Keep it upwind of the fire ring and cook zone so smoke and cooking smells blow away from the tent, not into it.',
  },
  {
    label: 'Kitchen / cook zone',
    detail:
      'Near the picnic table, downwind of the tent. Keep it a short walk from the tent, not right next to it - cooking smells near a tent can draw curious wildlife overnight.',
  },
  {
    label: 'Fire ring',
    detail:
      'Most developed sites have a fixed fire ring - use it rather than building a new one. The National Park Service recommends keeping tents, gear, and anything flammable at least 15 feet from the fire, upwind when the site layout allows it.',
  },
  {
    label: 'Food storage',
    detail:
      'In a hard-sided vehicle, a site-provided bear box, or a cooler with a locking latch - never inside the tent. In bear country, follow the distance-based hang or canister rules on the Bear Bag & Food Storage Card instead of this general layout.',
  },
  {
    label: 'Parking',
    detail:
      'On the site’s gravel or paved pad only, not on vegetation. Nose-out if you might need to leave after dark, and leave a clear walking path between the car and the tent for a flashlight-lit trip at 2am.',
  },
]

export default function CampsiteSetupDiagram() {
  return (
    <div className="site-card">
      <style>{`
        .site-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .site-card .lead {
          font-size: 12.5px;
          color: #44403C;
          margin: 0 0 14px 0;
        }
        .site-card .diagram-frame {
          border: 1px solid #D6D3D1;
          border-radius: 8px;
          background: #FAF8F2;
          padding: 10px;
          margin-bottom: 16px;
        }
        .site-card .diagram-frame svg {
          display: block;
          width: 100%;
          height: auto;
        }
        .site-card h2 {
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
        .site-card .zone-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 14px;
        }
        .site-card .zone {
          padding: 6px 0 6px 22px;
          position: relative;
          border-bottom: 1px dotted #E7E5E4;
        }
        .site-card .zone:nth-last-child(-n+1),
        .site-card .zone:nth-last-child(-n+2) {
          border-bottom: none;
        }
        .site-card .zone .marker {
          position: absolute;
          left: 0;
          top: 8px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          color: #FAF8F2;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1C1917;
        }
        .site-card .zone .zone-label {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          display: block;
          margin-bottom: 2px;
        }
        .site-card .zone .zone-detail {
          font-size: 11px;
          color: #44403C;
          line-height: 1.4;
        }
        .site-card .note {
          margin-top: 12px;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10.5px;
          color: #78716C;
          font-style: italic;
        }
      `}</style>

      <p className="lead">
        Most developed campsites already fix two things for you - the tent pad and the fire ring - but where you put everything else is up to you. A little planning before you unload the car keeps smoke out of the tent, food away from wildlife, and the walk to the bathroom clear in the dark.
      </p>

      <div className="diagram-frame">
        <svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Top-down diagram of a campsite showing the tent zone upwind of the kitchen and fire ring, food storage near the parking spur, and a clear path between the car and the tent.">
          {/* Site boundary */}
          <rect x="14" y="14" width="692" height="372" rx="14" fill="none" stroke="#D6D3D1" strokeWidth="2" strokeDasharray="6 5" />

          {/* Wind arrow */}
          <g transform="translate(560,40)">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#78716C" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="30" y="-8" textAnchor="middle" fontFamily="Figtree, system-ui, sans-serif" fontSize="10" fontWeight="700" fill="#78716C" letterSpacing="0.06em">PREVAILING WIND</text>
          </g>
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#78716C" />
            </marker>
          </defs>

          {/* Tent zone (upwind, high ground) */}
          <rect x="70" y="60" width="150" height="110" rx="8" fill="#EDE9E1" stroke="#1C1917" strokeWidth="1.5" />
          <path d="M110 150 L145 90 L180 150 Z" fill="none" stroke="#1C1917" strokeWidth="2" />
          <text x="145" y="42" textAnchor="middle" fontFamily="Figtree, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#1C1917">1 · Tent zone</text>
          <text x="145" y="185" textAnchor="middle" fontFamily="Figtree, system-ui, sans-serif" fontSize="9.5" fill="#57534E">high ground, upwind</text>

          {/* Kitchen zone */}
          <rect x="280" y="90" width="140" height="90" rx="8" fill="#EDE9E1" stroke="#1C1917" strokeWidth="1.5" />
          <rect x="320" y="115" width="60" height="34" rx="3" fill="none" stroke="#1C1917" strokeWidth="1.5" />
          <line x1="320" y1="128" x2="380" y2="128" stroke="#1C1917" strokeWidth="1" />
          <text x="350" y="72" textAnchor="middle" fontFamily="Figtree, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#1C1917">2 · Kitchen zone</text>
          <text x="350" y="200" textAnchor="middle" fontFamily="Figtree, system-ui, sans-serif" fontSize="9.5" fill="#57534E">near table, downwind</text>

          {/* Fire ring with clearance circle */}
          <circle cx="470" cy="255" r="70" fill="none" stroke="#B45309" strokeWidth="1.5" strokeDasharray="5 4" />
          <circle cx="470" cy="255" r="22" fill="#EDE9E1" stroke="#1C1917" strokeWidth="1.5" />
          <circle cx="470" cy="255" r="12" fill="none" stroke="#1C1917" strokeWidth="1.5" />
          <text x="470" y="200" textAnchor="middle" fontFamily="Figtree, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#1C1917">3 · Fire ring</text>
          <text x="470" y="340" textAnchor="middle" fontFamily="Figtree, system-ui, sans-serif" fontSize="9.5" fill="#B45309">15 ft min. clearance</text>

          {/* Food storage (vehicle) */}
          <g transform="translate(560,290)">
            <rect x="0" y="10" width="80" height="30" rx="6" fill="#EDE9E1" stroke="#1C1917" strokeWidth="1.5" />
            <rect x="14" y="-4" width="52" height="18" rx="4" fill="#EDE9E1" stroke="#1C1917" strokeWidth="1.5" />
            <circle cx="16" cy="40" r="7" fill="#FAF8F2" stroke="#1C1917" strokeWidth="1.5" />
            <circle cx="64" cy="40" r="7" fill="#FAF8F2" stroke="#1C1917" strokeWidth="1.5" />
            <text x="40" y="-16" textAnchor="middle" fontFamily="Figtree, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#1C1917">4 · Food storage</text>
            <text x="40" y="66" textAnchor="middle" fontFamily="Figtree, system-ui, sans-serif" fontSize="9.5" fill="#57534E">in the vehicle</text>
          </g>

          {/* Parking spur + walking path */}
          <rect x="60" y="300" width="150" height="55" rx="6" fill="none" stroke="#1C1917" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="135" y="292" textAnchor="middle" fontFamily="Figtree, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#1C1917">5 · Parking spur</text>
          <path d="M145 240 C 160 260, 150 290, 145 300" fill="none" stroke="#57534E" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="205" y="230" textAnchor="middle" fontFamily="Figtree, system-ui, sans-serif" fontSize="9.5" fill="#57534E">clear path to tent</text>
        </svg>
      </div>

      <h2>Layout Guidance By Zone</h2>
      <div className="zone-grid">
        {ZONES.map((z, i) => (
          <div className="zone" key={z.label}>
            <span className="marker">{i + 1}</span>
            <span className="zone-label">{z.label}</span>
            <span className="zone-detail">{z.detail}</span>
          </div>
        ))}
      </div>

      <p className="note">
        Exact placement always defers to the site itself - a fixed tent pad, an existing fire ring, or a host&apos;s posted rules override this general layout.
      </p>
    </div>
  )
}
