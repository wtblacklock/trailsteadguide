type PuppetPanel = {
  animal: string
  emoji: string
  hands: string
  position: string
  animate: string
}

const PUPPETS: PuppetPanel[] = [
  {
    animal: 'Dog',
    emoji: '🐕',
    hands: 'One hand only.',
    position: 'Hold hand flat, fingers together pointing forward. Fold thumb down to touch palm. Curl pinky slightly down for the jaw.',
    animate: 'Open and close the gap between thumb and pinky to make the dog bark. Tilt wrist left and right for head tilts.',
  },
  {
    animal: 'Rabbit',
    emoji: '🐇',
    hands: 'One hand.',
    position: 'Make a fist. Extend index and middle fingers straight up for ears. Tuck ring and pinky fingers down. Extend thumb sideways for the nose.',
    animate: 'Wiggle the two ear fingers alternately. Bend the thumb in and out for nose-twitching.',
  },
  {
    animal: 'Bird',
    emoji: '🐦',
    hands: 'Both hands.',
    position: 'Join thumbs together side by side. Spread all fingers wide — these are the wings. Face hands sideways toward the screen.',
    animate: 'Flap both hands up and down together for flying. Open and close one hand slightly for the beak.',
  },
  {
    animal: 'Butterfly',
    emoji: '🦋',
    hands: 'Both hands.',
    position: 'Join thumbs, face palms toward screen. Spread all fingers wide. Cross wrists slightly so hands overlap at center.',
    animate: 'Slowly open and close both hands simultaneously — a gentle flutter is more convincing than fast flapping.',
  },
  {
    animal: 'Fox',
    emoji: '🦊',
    hands: 'One hand.',
    position: 'Hold hand upright, fingers together. Fold ring and middle fingers down to touch palm. Keep index, pinky, and thumb extended — index and pinky are ears, thumb is the snout.',
    animate: 'Bring thumb toward palm and back out for mouth movement. Tilt wrist for the fox to look around.',
  },
  {
    animal: 'Bear',
    emoji: '🐻',
    hands: 'One hand.',
    position: 'Hold hand in loose fist. Keep all fingers curled but rounded — not tight. Extend thumb slightly for the snout. The rounded knuckles form the bear\'s head.',
    animate: 'Open fist slightly and close for a growling mouth. Move the whole hand slowly — bears are deliberate.',
  },
  {
    animal: 'Deer',
    emoji: '🦌',
    hands: 'Both hands.',
    position: 'Make two fists. Extend all fingers on one hand upward — this is the antler rack. Place the other fist below it as the head, with index and middle fingers as ears.',
    animate: 'Keep the antler hand very still. Move the head-fist slightly side to side. Tilt ears forward to show alertness.',
  },
  {
    animal: 'Snake',
    emoji: '🐍',
    hands: 'One hand.',
    position: 'Hold hand flat, all fingers together, pointing sideways. Bend wrist slightly downward. Touch thumb to side of index finger for the closed mouth.',
    animate: 'Move the whole arm in a slow S-curve. Separate thumb from fingers slightly and snap shut for the strike.',
  },
]

export default function ShadowPuppetHandGuide() {
  return (
    <div className="puppet-card">
      <style>{`
        .puppet-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .puppet-card .setup {
          background: #1C1917;
          color: #fff;
          border-radius: 6px;
          padding: 10px 14px;
          margin-bottom: 14px;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          line-height: 1.5;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }
        .puppet-card .setup .setup-item strong {
          display: block;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #A8A29E;
          margin-bottom: 2px;
        }
        .puppet-card .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
        }
        .puppet-card .panel {
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 10px 12px;
          background: #FAF8F2;
          break-inside: avoid;
        }
        .puppet-card .animal-name {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 2px 0;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .puppet-card .hands-note {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #78716C;
          margin: 0 0 5px 0;
        }
        .puppet-card .row {
          font-size: 11px;
          color: #44403C;
          margin: 0 0 4px 0;
          line-height: 1.4;
        }
        .puppet-card .row strong {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #78716C;
          display: block;
          margin-bottom: 1px;
        }
      `}</style>

      <div className="setup">
        <div className="setup-item">
          <strong>Light source</strong>
          Lantern or phone flashlight. Point light toward a flat surface — tent wall or white tarp works perfectly.
        </div>
        <div className="setup-item">
          <strong>Distance</strong>
          Hold hands 12–18 inches from the light for a sharp shadow. Move closer for a larger, softer shape.
        </div>
        <div className="setup-item">
          <strong>Starter story</strong>
          A fox and a rabbit meet a bear at the river. The bird warns them a snake is coming. The deer runs. The butterfly stays.
        </div>
      </div>

      <div className="grid">
        {PUPPETS.map((p) => (
          <div key={p.animal} className="panel">
            <p className="animal-name"><span>{p.emoji}</span>{p.animal}</p>
            <p className="hands-note">{p.hands}</p>
            <p className="row"><strong>Shape</strong>{p.position}</p>
            <p className="row"><strong>Animate</strong>{p.animate}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
