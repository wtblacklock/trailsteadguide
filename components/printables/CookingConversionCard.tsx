/**
 * Camp Cooking Conversion Card — print asset.
 *
 * Single-page reference card. Pure typography (no SVG) so it prints
 * crisp on any device. Kept text-dense intentionally — that's the
 * point of a camp cheat sheet.
 */

export default function CookingConversionCard() {
  return (
    <div className="cooking-card">
      <style>{`
        .cooking-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.5;
        }
        .cooking-card h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #57534E;
          margin: 0 0 8px 0;
          padding-bottom: 4px;
          border-bottom: 1px solid #D6D3D1;
        }
        .cooking-card .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .cooking-card .grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }
        .cooking-card .panel {
          padding: 0;
        }
        .cooking-card table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        .cooking-card table th {
          font-family: 'Figtree', system-ui, sans-serif;
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #78716C;
          text-align: left;
          padding: 4px 0;
          border-bottom: 1px solid #E7E5E4;
        }
        .cooking-card table td {
          padding: 4px 0;
          font-size: 12px;
          border-bottom: 1px dotted #E7E5E4;
        }
        .cooking-card table td:last-child,
        .cooking-card table th:last-child { text-align: right; }
        .cooking-card .note {
          font-size: 11px;
          color: #57534E;
          margin-top: 8px;
          font-style: italic;
        }
      `}</style>

      <div className="grid-3">
        <section className="panel">
          <h2>Volume conversions</h2>
          <table>
            <tbody>
              <tr><td>1 cup</td><td>8 fl oz</td></tr>
              <tr><td>1 cup</td><td>240 ml</td></tr>
              <tr><td>1 tbsp</td><td>3 tsp</td></tr>
              <tr><td>1 tbsp</td><td>15 ml</td></tr>
              <tr><td>1 tsp</td><td>5 ml</td></tr>
              <tr><td>1 fl oz</td><td>30 ml</td></tr>
              <tr><td>1 quart</td><td>4 cups</td></tr>
              <tr><td>1 gallon</td><td>16 cups</td></tr>
            </tbody>
          </table>
        </section>

        <section className="panel">
          <h2>Water-to-grain</h2>
          <table>
            <tbody>
              <tr><td>White rice</td><td>1 : 2</td></tr>
              <tr><td>Brown rice</td><td>1 : 2.5</td></tr>
              <tr><td>Quinoa</td><td>1 : 2</td></tr>
              <tr><td>Couscous</td><td>1 : 1.25</td></tr>
              <tr><td>Oatmeal (rolled)</td><td>1 : 2</td></tr>
              <tr><td>Pasta</td><td>1 : 4</td></tr>
              <tr><td>Polenta</td><td>1 : 4</td></tr>
            </tbody>
          </table>
          <p className="note">Salt: 1 tsp per cup of water for pasta.</p>
        </section>

        <section className="panel">
          <h2>Boil time at altitude</h2>
          <table>
            <tbody>
              <tr><td>Sea level</td><td>baseline</td></tr>
              <tr><td>2,000 ft</td><td>+1 min</td></tr>
              <tr><td>4,000 ft</td><td>+3 min</td></tr>
              <tr><td>6,000 ft</td><td>+6 min</td></tr>
              <tr><td>8,000 ft</td><td>+10 min</td></tr>
              <tr><td>10,000 ft</td><td>+15 min</td></tr>
            </tbody>
          </table>
          <p className="note">Water boils at lower temperatures with elevation, so things take longer to cook.</p>
        </section>
      </div>

      <div className="grid-2">
        <section className="panel">
          <h2>Foil-pack cook times</h2>
          <table>
            <thead>
              <tr><th>Food</th><th>Hot coals</th><th>Hot grate</th></tr>
            </thead>
            <tbody>
              <tr><td>Cubed potatoes</td><td>20 min</td><td>30 min</td></tr>
              <tr><td>Sliced onions / peppers</td><td>10 min</td><td>15 min</td></tr>
              <tr><td>Salmon fillet (1 in)</td><td>10 min</td><td>14 min</td></tr>
              <tr><td>Chicken thigh, boneless</td><td>15 min</td><td>20 min</td></tr>
              <tr><td>Sausage, pre-cooked</td><td>8 min</td><td>10 min</td></tr>
              <tr><td>Banana boats</td><td>5 min</td><td>7 min</td></tr>
            </tbody>
          </table>
          <p className="note">Flip halfway. Heavy-duty foil only; double-wrap for coals.</p>
        </section>

        <section className="panel">
          <h2>Daily calories per active camper</h2>
          <table>
            <thead>
              <tr><th>Activity level</th><th>Calories / day</th></tr>
            </thead>
            <tbody>
              <tr><td>Basecamp / kids 5–10</td><td>1,800–2,200</td></tr>
              <tr><td>Light hiking adult</td><td>2,500–2,800</td></tr>
              <tr><td>Active adult, full days</td><td>3,000–3,500</td></tr>
              <tr><td>Backpacking, miles + elevation</td><td>3,500–4,500</td></tr>
            </tbody>
          </table>
          <p className="note">
            Cold weather adds ~200–400 cal/day. Pack snacks aggressively — running a calorie deficit at camp turns into a kid meltdown by 4pm.
          </p>
        </section>
      </div>
    </div>
  )
}
