const MEAL_IDEAS: Record<string, Record<string, string>> = {
  breakfast: {
    easy: 'Granola + milk, instant oatmeal, Pop-Tarts, trail mix',
    medium: 'Scrambled eggs + bacon on the 2-burner stove, pancakes from mix',
    cast: 'Dutch oven cinnamon rolls, cast iron frittata',
  },
  lunch: {
    easy: 'Sandwiches, wraps, cheese + crackers, PB&J',
    medium: 'Quesadillas on the stove, soup from a pouch',
    cast: 'Grilled cheese in cast iron, camp nachos',
  },
  dinner: {
    easy: 'Hot dogs over the fire, mac and cheese, ramen upgraded with an egg',
    medium: 'Foil-pack chicken + veggies over coals, 2-burner pasta',
    cast: 'Cast iron chili, one-pan stir fry, Dutch oven lasagna',
  },
  snacks: {
    easy: 'Trail mix, fruit, jerky, energy bars, crackers',
    medium: 'S\'mores, popcorn over the fire, camp nachos',
    cast: 'Cast iron skillet cookies, campfire banana boats',
  },
}

const COOK_METHODS = ['Campfire', '2-Burner Stove', 'Cast Iron', 'No-Cook']
const DAYS = ['Day 1', 'Day 2', 'Day 3']
const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']

const GROCERY_CATEGORIES = [
  'Proteins (meat, eggs, beans)',
  'Grains & starches',
  'Dairy',
  'Fruits & vegetables',
  'Snacks & trail food',
  'Condiments & spices',
  'Camp pantry (oil, foil, bags)',
  'Beverages & coffee',
]

export default function CampMealPlanner() {
  return (
    <div className="meal-planner">
      <style>{`
        .meal-planner {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .meal-planner .lead {
          font-size: 11.5px;
          color: #44403C;
          margin: 0 0 12px 0;
        }
        .meal-planner h2 {
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
        .meal-planner .grid-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 14px;
          font-size: 10.5px;
        }
        .meal-planner .grid-table th {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #57534E;
          padding: 5px 8px;
          border: 1px solid #D6D3D1;
          background: #F5F3EE;
          text-align: left;
        }
        .meal-planner .grid-table td {
          border: 1px solid #D6D3D1;
          padding: 0;
          vertical-align: top;
        }
        .meal-planner .cell-inner {
          padding: 6px 8px;
          min-height: 42px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .meal-planner .cell-idea {
          font-size: 9px;
          color: #A8A29E;
          font-style: italic;
          line-height: 1.3;
          margin-bottom: 3px;
        }
        .meal-planner .cell-method {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .meal-planner .method-btn {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.05em;
          border: 1px solid #D6D3D1;
          border-radius: 2px;
          padding: 1px 4px;
          color: #78716C;
          white-space: nowrap;
        }
        .meal-planner .bottom-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .meal-planner .grocery-list { margin: 0; padding: 0; list-style: none; }
        .meal-planner .grocery-cat {
          margin-bottom: 8px;
          break-inside: avoid;
        }
        .meal-planner .grocery-cat h3 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #78716C;
          margin: 0 0 3px 0;
        }
        .meal-planner .fill-lines {
          border-bottom: 1px solid #D6D3D1;
          height: 18px;
          margin-bottom: 3px;
        }
        .meal-planner .scaling {
          background: #FAF8F2;
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 9px 12px;
          font-size: 10.5px;
          line-height: 1.55;
        }
        .meal-planner .scaling h3 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #57534E;
          margin: 0 0 5px 0;
        }
        .meal-planner .scaling table {
          width: 100%;
          font-size: 10px;
          border-collapse: collapse;
        }
        .meal-planner .scaling td {
          padding: 2px 4px;
          border-bottom: 1px dotted #E7E5E4;
          color: #292524;
        }
        .meal-planner .scaling td:first-child { color: #78716C; font-weight: 600; }
      `}</style>

      <p className="lead">
        Fill in the meal column first, then circle a cook method. Transfer each ingredient to the shopping list. Default portions feed 4 people — scale note at the bottom.
      </p>

      <h2>Meal Plan Grid</h2>
      <table className="grid-table">
        <thead>
          <tr>
            <th style={{ width: '15%' }}></th>
            {DAYS.map((d) => (
              <th key={d} style={{ width: '28.3%' }}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MEALS.map((meal) => {
            const key = meal.toLowerCase() as keyof typeof MEAL_IDEAS
            const ideas = MEAL_IDEAS[key]
            return (
              <tr key={meal}>
                <td>
                  <div className="cell-inner" style={{ background: '#F5F3EE', minHeight: '68px' }}>
                    <span style={{ fontFamily: '\'Figtree\', system-ui, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#57534E' }}>{meal}</span>
                    <div className="cell-method">
                      {COOK_METHODS.map((m) => (
                        <span key={m} className="method-btn">{m}</span>
                      ))}
                    </div>
                  </div>
                </td>
                {DAYS.map((day, di) => {
                  const idea = di === 0 ? ideas.easy : di === 1 ? ideas.medium : ideas.cast
                  return (
                    <td key={day}>
                      <div className="cell-inner" style={{ minHeight: '68px' }}>
                        <p className="cell-idea">{idea}</p>
                        <div className="cell-method">
                          {COOK_METHODS.map((m) => (
                            <span key={m} className="method-btn">{m}</span>
                          ))}
                        </div>
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="bottom-cols">
        <div>
          <h2>Shopping List</h2>
          {GROCERY_CATEGORIES.map((cat) => (
            <div key={cat} className="grocery-cat">
              <h3>{cat}</h3>
              <div className="fill-lines" />
              <div className="fill-lines" />
            </div>
          ))}
        </div>
        <div>
          <h2>Party Size Scaling</h2>
          <div className="scaling" style={{ marginBottom: '12px' }}>
            <h3>Default: 4 people · Adjust by multiplying</h3>
            <table>
              <tbody>
                <tr><td>2 people</td><td>Multiply quantities × 0.5</td></tr>
                <tr><td>6 people</td><td>Multiply quantities × 1.5</td></tr>
                <tr><td>8 people</td><td>Multiply quantities × 2</td></tr>
                <tr><td>Kids under 8</td><td>Count as 0.5 adult portions</td></tr>
              </tbody>
            </table>
          </div>
          <h2>Notes</h2>
          {[1,2,3,4].map((i) => (
            <div key={i} style={{ borderBottom: '1px solid #D6D3D1', height: '22px', marginBottom: '4px' }} />
          ))}
          <h2 style={{ marginTop: '12px' }}>Allergies / Restrictions</h2>
          {[1,2].map((i) => (
            <div key={i} style={{ borderBottom: '1px solid #D6D3D1', height: '22px', marginBottom: '4px' }} />
          ))}
        </div>
      </div>
    </div>
  )
}
