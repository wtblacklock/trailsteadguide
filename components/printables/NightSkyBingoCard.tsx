const BINGO_SQUARES = [
  { label: 'Big Dipper', hint: 'Look north. 7 bright stars in a ladle shape.' },
  { label: 'Moon (any phase)', hint: 'Counts even if not full.' },
  { label: 'Planet (brighter than stars)', hint: 'Planets don\'t twinkle. Venus, Jupiter, and Mars are brightest.' },
  { label: 'Shooting star', hint: 'A fast streak lasting < 1 second. Keep looking — your eyes need 20 min to dark-adapt.' },
  { label: 'Cassiopeia', hint: 'The W or M shape on the opposite side of Polaris from the Big Dipper.' },
  { label: 'Polaris (North Star)', hint: 'Follow the outer edge of the Big Dipper\'s cup — it points to Polaris.' },
  { label: 'Orion (Sept–Apr)', hint: '3 stars in a row = Orion\'s Belt. Look south in winter sky.' },
  { label: 'Milky Way band', hint: 'Needs dark skies and no moon. A hazy white smear across the sky.' },
  { label: 'Airplane with blinking lights', hint: 'Red + green + white blinks in a moving pattern.' },
  { label: 'Satellite (steady, moving)', hint: 'A steady non-blinking dot crossing the sky in 2–5 min.' },
  { label: 'Color difference in two stars', hint: 'Betelgeuse (red-orange) and Rigel (blue-white) in Orion are the easiest pair.' },
  { label: 'Summer Triangle (Jun–Nov)', hint: 'Three bright stars: Vega, Deneb, Altair — directly overhead in summer.' },
  { label: '⭐ FREE ⭐', hint: 'Name any constellation you can see right now.' },
  { label: 'Little Dipper', hint: 'Smaller and fainter than the Big Dipper. Polaris is at the end of its handle.' },
  { label: 'Star cluster (fuzzy patch)', hint: 'The Pleiades (Seven Sisters) look like a tiny fuzzy dipper in winter.' },
  { label: 'Bat or night bird', hint: 'Erratic swooping flight at dusk — not a sky object but earns a square.' },
  { label: 'Double star (two close together)', hint: 'Mizar and Alcor in the Big Dipper handle — a famous pair.' },
  { label: 'Scorpius (May–Oct)', hint: 'Curved tail of stars low in the south. Antares is its bright red heart.' },
  { label: 'Leo (Feb–May)', hint: 'A backwards question-mark shape (the Sickle) marks the lion\'s head.' },
  { label: 'Fireball / bright meteor', hint: 'A meteor brighter than Venus. Rare and unmistakable.' },
  { label: 'ISS pass', hint: 'Brighter than any star, crosses the full sky in ~5 min. Check nasa.gov/spotthestation for pass times.' },
  { label: 'Andromeda Galaxy (Aug–Nov)', hint: 'A faint smudge near Andromeda constellation — the farthest thing visible with the naked eye.' },
  { label: '3 constellations in one night', hint: 'Name all three to a witness.' },
  { label: 'Meteor shower radiant', hint: 'During a shower (Perseids Aug, Leonids Nov), spot the point the meteors seem to come from.' },
  { label: 'Total of 10+ stars counted', hint: 'Count out loud, point to each one. Partner must agree on every star.' },
]

export default function NightSkyBingoCard() {
  return (
    <div className="bingo-card">
      <style>{`
        .bingo-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
        }
        .bingo-card .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 12px 0;
          line-height: 1.5;
        }
        .bingo-card .grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 5px;
        }
        .bingo-card .cell {
          border: 1px solid #D6D3D1;
          border-radius: 5px;
          padding: 7px 6px;
          background: #FAF8F2;
          min-height: 68px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          break-inside: avoid;
        }
        .bingo-card .cell.free {
          background: #1C1917;
          color: #fff;
          border-color: #1C1917;
        }
        .bingo-card .cell-label {
          font-size: 10.5px;
          font-weight: 600;
          line-height: 1.3;
          color: inherit;
          margin: 0 0 4px 0;
          font-family: 'Figtree', system-ui, sans-serif;
        }
        .bingo-card .cell.free .cell-label {
          color: #FAF8F2;
          text-align: center;
          font-size: 13px;
        }
        .bingo-card .cell-hint {
          font-size: 9px;
          color: #78716C;
          line-height: 1.35;
          font-family: 'Figtree', system-ui, sans-serif;
        }
        .bingo-card .cell.free .cell-hint {
          color: #A8A29E;
          text-align: center;
        }
        .bingo-card .rules {
          margin-top: 12px;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          color: #57534E;
          line-height: 1.5;
          border-top: 1px solid #D6D3D1;
          padding-top: 8px;
          display: flex;
          gap: 16px;
        }
        .bingo-card .rules strong { color: #1C1917; font-weight: 600; }
      `}</style>

      <p className="lead">
        Eyes need 20 minutes to fully dark-adapt — put phones away and give it time. Mark a square only when you can describe what you saw. Bingo = any row, column, or diagonal.
      </p>

      <div className="grid">
        {BINGO_SQUARES.map((sq, i) => (
          <div key={i} className={`cell${sq.label.startsWith('⭐') ? ' free' : ''}`}>
            <p className="cell-label">{sq.label}</p>
            <p className="cell-hint">{sq.hint}</p>
          </div>
        ))}
      </div>

      <div className="rules">
        <span><strong>Bingo:</strong> any row, column, or diagonal.</span>
        <span><strong>Blackout:</strong> all 25 squares — the hardest possible win.</span>
        <span><strong>Dispute rule:</strong> caller must describe it before it counts.</span>
      </div>
    </div>
  )
}
