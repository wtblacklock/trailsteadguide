type PackItem = { label: string; note?: string }

const UNIVERSAL: PackItem[] = [
  { label: 'Sleeping bag rated for expected temps' },
  { label: 'Sleeping pad (insulation from ground)' },
  { label: 'Headlamp + spare batteries', note: 'Kids lose these constantly — get a bright one with a red-light mode' },
  { label: 'Rain jacket or poncho' },
  { label: 'Sunscreen SPF 30+ and lip balm' },
  { label: 'Insect repellent (DEET or Picaridin)' },
  { label: 'Closed-toe shoes for hiking' },
  { label: 'Warm layer (fleece or down vest)' },
  { label: 'Swimsuit if near water' },
  { label: 'Hat (sun and warmth)' },
]

const TODDLER: PackItem[] = [
  { label: 'Portable travel crib or Pack \'n Play if needed' },
  { label: 'Nightlight or small lantern for tent', note: 'Darkness in a tent is disorienting for toddlers' },
  { label: 'Familiar sleep toy or comfort item' },
  { label: 'Extra clothes × 2 per day' },
  { label: 'Diapers + wet bag or extra pull-ups' },
  { label: 'Portable high chair or booster' },
  { label: 'Familiar snacks and shelf-stable meals' },
  { label: 'Baby carrier or backpack for hikes' },
  { label: 'First aid extras: infant Tylenol, teething gel' },
]

const ELEMENTARY: PackItem[] = [
  { label: 'Headlamp of their own (not shared)', note: 'Ownership matters — they\'ll actually use it' },
  { label: 'Small backpack for day hikes' },
  { label: 'Water bottle (insulated)' },
  { label: 'Outdoor journal and pencil' },
  { label: 'Binoculars (cheap is fine)' },
  { label: 'Rain boots or waterproof trail shoes' },
  { label: 'Camp chair sized for a kid' },
  { label: 'Small toy or card game for downtime' },
]

const OLDER_KIDS: PackItem[] = [
  { label: 'Their own headlamp (bright, reliable)' },
  { label: 'Pocket knife (with training)', note: 'Age-appropriate — supervise fire and knife use' },
  { label: 'Map of the area', note: 'Teach them to follow along — pairs with Map & Compass printable' },
  { label: 'Outdoor journal and field guide' },
  { label: 'Small personal first aid kit' },
  { label: 'Water filter (Sawyer Squeeze or similar)' },
  { label: 'Their own full day pack' },
  { label: 'Portable battery for phone (supervised)' },
]

function CheckItem({ item }: { item: PackItem }) {
  return (
    <div className="check-item">
      <span className="box" aria-hidden="true" />
      <span className="label">
        {item.label}
        {item.note && <span className="note"> — {item.note}</span>}
      </span>
    </div>
  )
}

export default function KidsCampingPackingList() {
  return (
    <div className="kids-pack">
      <style>{`
        .kids-pack {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .kids-pack .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 12px 0;
        }
        .kids-pack .cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .kids-pack .section {
          break-inside: avoid;
        }
        .kids-pack .section h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #57534E;
          border-bottom: 1px solid #D6D3D1;
          padding-bottom: 4px;
          margin: 0 0 7px 0;
        }
        .kids-pack .check-item {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          padding: 2px 0;
        }
        .kids-pack .box {
          width: 11px;
          height: 11px;
          border: 1.2px solid #A8A29E;
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .kids-pack .label {
          font-size: 11px;
          color: #292524;
          line-height: 1.4;
        }
        .kids-pack .note {
          font-size: 10px;
          color: #78716C;
          font-style: italic;
        }
        .kids-pack .universal-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 14px;
          margin-bottom: 12px;
        }
      `}</style>

      <p className="lead">
        Start with the universal layer for every child in the group, then add the tier that matches your youngest kid. Older kids can check off their own tier independently.
      </p>

      <div className="section" style={{ marginBottom: '12px' }}>
        <h2>Every Child — Universal Layer</h2>
        <div className="universal-cols">
          {UNIVERSAL.map((item) => (
            <CheckItem key={item.label} item={item} />
          ))}
        </div>
      </div>

      <div className="cols">
        <div className="section">
          <h2>Toddlers · Ages 2–4</h2>
          {TODDLER.map((item) => (
            <CheckItem key={item.label} item={item} />
          ))}
        </div>
        <div>
          <div className="section" style={{ marginBottom: '12px' }}>
            <h2>Early Elementary · Ages 5–8</h2>
            {ELEMENTARY.map((item) => (
              <CheckItem key={item.label} item={item} />
            ))}
          </div>
          <div className="section">
            <h2>Older Kids · Ages 9–12</h2>
            {OLDER_KIDS.map((item) => (
              <CheckItem key={item.label} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
