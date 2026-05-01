type Injury = {
  name: string
  emoji: string
  signs: string
  treatment: string[]
  evacuate: string
}

const INJURIES: Injury[] = [
  {
    name: 'Blister',
    emoji: '🩹',
    signs: 'Hot spot, then fluid-filled bubble on foot or heel.',
    treatment: [
      'Leave intact if small — drain only if large and painful.',
      'To drain: sterilize needle, pierce edge, let fluid out, leave skin flap.',
      'Cover with moleskin donut or blister pad. Keep dry.',
    ],
    evacuate: 'Signs of infection: redness spreading beyond blister, pus, red streaks, fever.',
  },
  {
    name: 'Sprained Ankle',
    emoji: '🦶',
    signs: 'Swelling, bruising, pain on weight-bearing. Rolled outward is most common.',
    treatment: [
      'RICE: Rest, Ice (20 min on/off), Compression (ACE wrap), Elevate.',
      'If walking needed, taping provides support. Wrap figure-8 around ankle.',
      'Use trekking pole as a cane on the way out.',
    ],
    evacuate: 'Cannot bear any weight, severe deformity, numbness, or circulation issues.',
  },
  {
    name: 'Cut / Laceration',
    emoji: '🩸',
    signs: 'Bleeding wound from sharp object, rock, or fall.',
    treatment: [
      'Apply direct pressure with clean cloth for 10+ min. Do not lift to check.',
      'Once bleeding stops: clean with clean water (flush well).',
      'Close with butterfly strips or steri-strips. Cover with bandage.',
    ],
    evacuate: 'Bleeding doesn\'t stop after 20 min of pressure, wound is deep or gaping, signs of tendon or bone.',
  },
  {
    name: 'Insect Sting',
    emoji: '🐝',
    signs: 'Sharp pain, localized swelling and redness.',
    treatment: [
      'Remove stinger by scraping (bee) — don\'t squeeze with tweezers.',
      'Ice for swelling. Antihistamine (Benadryl) for itch.',
      'Monitor for signs of allergy.',
    ],
    evacuate: 'Throat tightening, hives beyond sting site, dizziness, shortness of breath — use EpiPen if available, call 911.',
  },
  {
    name: 'Sunburn',
    emoji: '☀️',
    signs: 'Red, hot, tender skin. Blistering in severe cases.',
    treatment: [
      'Get out of sun. Cool with wet cloth (not ice).',
      'Aloe vera or hydrocortisone cream for pain.',
      'Hydrate aggressively — sunburn dehydrates.',
    ],
    evacuate: 'Blistering over large area, fever over 103°F, confusion, or vomiting.',
  },
  {
    name: 'Dehydration',
    emoji: '💧',
    signs: 'Dark urine, headache, fatigue, dizziness, dry mouth.',
    treatment: [
      'Stop activity. Sit in shade. Drink water steadily — not all at once.',
      'Add electrolytes: sports drink, electrolyte tablets, or a pinch of salt + sugar.',
      'Rest 30+ min before returning to activity.',
    ],
    evacuate: 'Cannot keep fluids down, severe headache, confusion, no urination for 8+ hours.',
  },
  {
    name: 'Hypothermia (early)',
    emoji: '🥶',
    signs: 'Shivering, cold/pale skin, clumsiness, slurred speech.',
    treatment: [
      'Get out of wind and wet clothing immediately.',
      'Insulate with dry layers and sleeping bag. Add head cover.',
      'Warm fluids if conscious. Body heat from another person is effective.',
    ],
    evacuate: 'Stops shivering but still cold (severe hypothermia), loss of consciousness, heart irregularity.',
  },
  {
    name: 'Minor Burn',
    emoji: '🔥',
    signs: 'Redness and pain from campfire, stove, or hot cookware.',
    treatment: [
      'Cool immediately: run cool (not cold) water over burn for 10–20 min.',
      'Do not apply ice, butter, or toothpaste.',
      'Cover with non-stick sterile bandage. Ibuprofen for pain.',
    ],
    evacuate: 'Blistering larger than your palm, burn on face/hands/genitals, charred or white skin.',
  },
]

const KIT_ITEMS = [
  'Bandages (assorted sizes)',
  'Gauze pads + medical tape',
  'Moleskin / blister pads',
  'ACE wrap (elastic bandage)',
  'Butterfly strips / steri-strips',
  'Antihistamine (Benadryl)',
  'Ibuprofen + acetaminophen',
  'Antibiotic ointment',
  'Aloe vera gel',
  'Tweezers + safety pins',
  'Medical gloves (2 pairs)',
  'CPR face shield',
]

export default function CampFirstAidQuickReference() {
  return (
    <div className="first-aid">
      <style>{`
        .first-aid {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .first-aid .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 12px;
        }
        .first-aid .panel {
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 9px 11px;
          background: #FAF8F2;
          break-inside: avoid;
        }
        .first-aid .panel .title {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 700;
          margin: 0 0 3px 0;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .first-aid .panel .signs {
          font-size: 10.5px;
          color: #57534E;
          margin: 0 0 5px 0;
          line-height: 1.35;
          font-style: italic;
        }
        .first-aid .panel ol {
          list-style: none;
          padding: 0;
          margin: 0 0 5px 0;
          counter-reset: tx;
        }
        .first-aid .panel ol li {
          font-size: 10.5px;
          color: #292524;
          padding: 2px 0 2px 18px;
          position: relative;
          counter-increment: tx;
          line-height: 1.35;
        }
        .first-aid .panel ol li::before {
          content: counter(tx) '.';
          position: absolute;
          left: 0;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #78716C;
        }
        .first-aid .panel .evac {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          color: #B91C1C;
          margin: 4px 0 0 0;
          line-height: 1.35;
        }
        .first-aid .panel .evac strong {
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 9px;
        }
        .first-aid .bottom-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .first-aid h2 {
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
        .first-aid .kit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 10px;
        }
        .first-aid .kit-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 10.5px;
          color: #292524;
          padding: 2px 0;
          line-height: 1.35;
        }
        .first-aid .box {
          width: 10px;
          height: 10px;
          border: 1.2px solid #A8A29E;
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .first-aid .emergency-box {
          background: #FAF8F2;
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 10px 14px;
          font-size: 11px;
        }
        .first-aid .emergency-box .fill-line {
          border-bottom: 1px solid #A8A29E;
          height: 22px;
          margin-bottom: 8px;
        }
        .first-aid .emergency-box label {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #78716C;
          display: block;
          margin-bottom: 2px;
        }
      `}</style>

      <div className="grid">
        {INJURIES.map((inj) => (
          <div key={inj.name} className="panel">
            <p className="title"><span>{inj.emoji}</span>{inj.name}</p>
            <p className="signs">{inj.signs}</p>
            <ol>
              {inj.treatment.map((t, i) => <li key={i}>{t}</li>)}
            </ol>
            <p className="evac"><strong>Evacuate:</strong> {inj.evacuate}</p>
          </div>
        ))}
      </div>

      <div className="bottom-row">
        <div>
          <h2>Kit Baseline</h2>
          <div className="kit-grid">
            {KIT_ITEMS.map((item) => (
              <div key={item} className="kit-item">
                <span className="box" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="emergency-box">
          <h2>Emergency Contacts</h2>
          <label>Nearest Ranger Station</label>
          <div className="fill-line" />
          <label>Nearest Hospital / Urgent Care</label>
          <div className="fill-line" />
          <label>Emergency Contact (name + phone)</label>
          <div className="fill-line" />
          <label>Trip start / end dates</label>
          <div className="fill-line" />
        </div>
      </div>
    </div>
  )
}
