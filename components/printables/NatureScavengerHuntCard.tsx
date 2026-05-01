type HuntItem = { label: string; tier: 'easy' | 'medium' | 'tricky' | 'bonus' }

const ITEMS: HuntItem[] = [
  { label: 'A pinecone', tier: 'easy' },
  { label: 'A smooth rock', tier: 'easy' },
  { label: 'A bird feather', tier: 'easy' },
  { label: 'Something yellow', tier: 'easy' },
  { label: 'A piece of bark', tier: 'easy' },
  { label: 'A spider web', tier: 'easy' },
  { label: 'An acorn or seed pod', tier: 'medium' },
  { label: 'An animal track', tier: 'medium' },
  { label: 'A mushroom or fungus', tier: 'medium' },
  { label: 'A bird you can name', tier: 'medium' },
  { label: 'Something that smells interesting', tier: 'medium' },
  { label: 'A hole in the ground or tree', tier: 'medium' },
  { label: 'An insect (not a fly)', tier: 'tricky' },
  { label: 'Lichen growing on a rock', tier: 'tricky' },
  { label: 'Evidence of something eating a leaf', tier: 'tricky' },
  { label: 'Three different types of tree', tier: 'tricky' },
  { label: 'Animal scat (from a safe distance)', tier: 'tricky' },
  { label: 'Something that floats', tier: 'tricky' },
  { label: 'A bird nest (empty is fine)', tier: 'bonus' },
  { label: 'Something older than you', tier: 'bonus' },
  { label: 'A sound you can\'t identify', tier: 'bonus' },
  { label: 'Something that used to be alive', tier: 'bonus' },
  { label: 'An insect home (hive, mound, web)', tier: 'bonus' },
  { label: 'Something no one else found', tier: 'bonus' },
]

const TIER_LABELS: Record<HuntItem['tier'], string> = {
  easy: 'Easy — Always Findable',
  medium: 'Medium — Look Around',
  tricky: 'Tricky — Takes Patience',
  bonus: 'Bonus — Explorer Level',
}

const TIER_POINTS: Record<HuntItem['tier'], string> = {
  easy: '1 pt each',
  medium: '2 pts each',
  tricky: '3 pts each',
  bonus: '5 pts each',
}

export default function NatureScavengerHuntCard() {
  const tiers: HuntItem['tier'][] = ['easy', 'medium', 'tricky', 'bonus']

  return (
    <div className="hunt-card">
      <style>{`
        .hunt-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.5;
        }
        .hunt-card .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 12px 0;
        }
        .hunt-card .cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .hunt-card .tier-block {
          margin-bottom: 12px;
          break-inside: avoid;
        }
        .hunt-card .tier-label {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #57534E;
          border-bottom: 1px solid #D6D3D1;
          padding-bottom: 3px;
          margin-bottom: 6px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .hunt-card .tier-label .pts {
          font-weight: 500;
          color: #78716C;
          letter-spacing: 0.04em;
        }
        .hunt-card .item {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          font-size: 11.5px;
          padding: 3px 0;
          color: #292524;
        }
        .hunt-card .box {
          width: 11px;
          height: 11px;
          border: 1.2px solid #A8A29E;
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .hunt-card .scoring {
          margin-top: 14px;
          padding: 10px 14px;
          background: #1C1917;
          color: #fff;
          border-radius: 6px;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          line-height: 1.5;
        }
        .hunt-card .scoring strong {
          font-weight: 700;
          letter-spacing: 0.04em;
        }
      `}</style>

      <p className="lead">
        Work solo or as a team. First to find all 6 easy items calls time — then count up everyone&apos;s totals. Bonus items are worth the most: don&apos;t skip them.
      </p>

      <div className="cols">
        {tiers.map((tier) => {
          const tierItems = ITEMS.filter((i) => i.tier === tier)
          return (
            <div key={tier} className="tier-block">
              <div className="tier-label">
                <span>{TIER_LABELS[tier]}</span>
                <span className="pts">{TIER_POINTS[tier]}</span>
              </div>
              {tierItems.map((item) => (
                <div key={item.label} className="item">
                  <span className="box" aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      <div className="scoring">
        <strong>Scoring:</strong> Easy = 1 pt · Medium = 2 pts · Tricky = 3 pts · Bonus = 5 pts &nbsp;|&nbsp;
        <strong>Tie-breaker:</strong> whoever found something the other person didn&apos;t wins. &nbsp;|&nbsp;
        <strong>Rule:</strong> you must be able to show it or describe exactly where it is.
      </div>
    </div>
  )
}
