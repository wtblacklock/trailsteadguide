const PRINCIPLES = [
  {
    number: 1,
    title: 'Plan ahead and prepare',
    actions: [
      'Check fire and permit conditions before you leave — not at the trailhead.',
      'Bring a paper map. Cell service fails in most wilderness and many campgrounds.',
      'Tell someone your itinerary and expected return time.',
    ],
    broken: null,
  },
  {
    number: 2,
    title: 'Travel and camp on durable surfaces',
    actions: [
      'Walk single-file on established trails. Widening the trail by walking beside it causes erosion.',
      'Camp on existing tent pads or bare mineral soil — not on vegetation.',
      'Avoid crushing young plants. If the ground springs back, it\'s recovering.',
    ],
    broken: 'Cutting switchbacks. It looks like a shortcut — it causes lasting erosion.',
  },
  {
    number: 3,
    title: 'Dispose of waste properly',
    actions: [
      'Pack out all trash, food waste, and packaging. "Biodegradable" food still attracts animals.',
      'Human waste: cat hole 6–8 inches deep, 200 ft from water, trail, and camp.',
      'Dishes: strain food particles, scatter gray water 200 ft from water sources.',
    ],
    broken: 'Burying food scraps. They get dug up. Pack them out.',
  },
  {
    number: 4,
    title: 'Leave what you find',
    actions: [
      'Leave rocks, plants, feathers, and historical artifacts exactly where you found them.',
      'Don\'t build cairns, furniture, or fire rings beyond existing ones.',
      'Avoid introducing invasive species — clean boots, boats, and gear before a new area.',
    ],
    broken: null,
  },
  {
    number: 5,
    title: 'Minimize campfire impact',
    actions: [
      'Use established fire rings only. Never build a new ring.',
      'Use only down, dead, small wood you can break by hand — don\'t cut standing trees.',
      'Let wood burn to ash. Drown, stir, drown. Cold to the touch before you leave.',
    ],
    broken: 'Bringing firewood from home. It spreads invasive insects. Buy it within 50 miles.',
  },
  {
    number: 6,
    title: 'Respect wildlife',
    actions: [
      'Observe from a distance. If an animal changes its behavior, you\'re too close.',
      'Store food, waste, and scented items in a bear bag or canister every night.',
      'Keep pets under control. Off-leash dogs stress wildlife and other campers.',
    ],
    broken: 'Feeding wildlife — any wildlife. It kills them.',
  },
  {
    number: 7,
    title: 'Be considerate of others',
    actions: [
      'Quiet hours at established campgrounds are typically 10 pm – 6 am. Honor them.',
      'Yield to uphill hikers, horses, and mountain bikers on singletrack.',
      'Camp out of sight and earshot of others when in dispersed areas.',
    ],
    broken: 'Bluetooth speakers on trails. Carry them to camp if you must — not on the trail.',
  },
]

const FINAL_CHECK = [
  'All food, wrappers, and scented items packed out or hung',
  'Fire cold to the touch (drown, stir, drown)',
  'Camp looks cleaner than when you arrived',
  'No shortcuts cut across switchbacks on the way out',
  'Pet waste packed out or buried properly',
  'Site looks like no one was there',
]

export default function LeaveNoTraceQuickReference() {
  return (
    <div className="lnt-card">
      <style>{`
        .lnt-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .lnt-card .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 12px 0;
        }
        .lnt-card .cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 12px;
        }
        .lnt-card .principle {
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 9px 12px;
          background: #FAF8F2;
          break-inside: avoid;
        }
        .lnt-card .p-header {
          display: flex;
          align-items: baseline;
          gap: 7px;
          margin-bottom: 5px;
        }
        .lnt-card .p-num {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #78716C;
          flex-shrink: 0;
        }
        .lnt-card .p-title {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          color: #1C1917;
          margin: 0;
          line-height: 1.3;
        }
        .lnt-card .actions {
          list-style: none;
          padding: 0;
          margin: 0 0 5px 0;
        }
        .lnt-card .actions li {
          font-size: 10.5px;
          color: #292524;
          padding: 2px 0 2px 12px;
          position: relative;
          line-height: 1.35;
        }
        .lnt-card .actions li::before {
          content: '›';
          position: absolute;
          left: 0;
          color: #A8A29E;
        }
        .lnt-card .broken {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          color: #B91C1C;
          margin: 4px 0 0 0;
          line-height: 1.35;
        }
        .lnt-card .broken strong {
          font-weight: 700;
          text-transform: uppercase;
          font-size: 8.5px;
          letter-spacing: 0.06em;
        }
        .lnt-card .final {
          background: #1C1917;
          color: #fff;
          border-radius: 6px;
          padding: 10px 14px;
        }
        .lnt-card .final h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #A8A29E;
          border-bottom: 1px solid #44403C;
          padding-bottom: 3px;
          margin: 0 0 8px 0;
        }
        .lnt-card .final-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 14px;
        }
        .lnt-card .final-item {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          font-size: 10.5px;
          color: #E7E5E4;
          padding: 2px 0;
          line-height: 1.35;
        }
        .lnt-card .final-box {
          width: 11px;
          height: 11px;
          border: 1.2px solid #78716C;
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 1px;
        }
      `}</style>

      <p className="lead">
        LNT isn&apos;t about being perfect. It&apos;s seven habits that compound — the more people who follow them, the better the wild places get. These are the car-camping and day-hiking versions, not just backcountry rules.
      </p>

      <div className="cols">
        {PRINCIPLES.map((p) => (
          <div key={p.number} className="principle">
            <div className="p-header">
              <span className="p-num">{p.number}.</span>
              <p className="p-title">{p.title}</p>
            </div>
            <ul className="actions">
              {p.actions.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
            {p.broken && (
              <p className="broken"><strong>Most broken:</strong> {p.broken}</p>
            )}
          </div>
        ))}
      </div>

      <div className="final">
        <h2>Before you leave camp</h2>
        <div className="final-grid">
          {FINAL_CHECK.map((item) => (
            <div key={item} className="final-item">
              <span className="final-box" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
