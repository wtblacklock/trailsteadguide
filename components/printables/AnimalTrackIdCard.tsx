type TrackPanel = {
  animal: string
  emoji: string
  frontTrack: string
  hindTrack: string
  sizeInches: string
  gait: string
  claws: string
  note?: string
  warn?: string
  trackImg?: { url: string; alt: string }
}

const TRACKS: TrackPanel[] = [
  {
    animal: 'White-tailed Deer',
    emoji: '🦌',
    frontTrack: 'Two elongated, pointed lobes (hooves) forming a heart shape. Dewclaws show in soft mud.',
    hindTrack: 'Slightly smaller than front, same heart shape.',
    sizeInches: '2–3 in long',
    gait: 'Walking: diagonal pattern. Bounding: four tracks clustered together.',
    claws: 'No claws visible',
    note: 'Most common track in wooded campsites. Often found on soft soil near water.',
    trackImg: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Whitetail_track.svg',
      alt: 'White-tailed deer hoofprint — two pointed lobes in a heart shape',
    },
  },
  {
    animal: 'Raccoon',
    emoji: '🦝',
    frontTrack: '5 long, finger-like toes splayed wide. Looks like a tiny human hand.',
    hindTrack: 'Longer than front, heel often visible. Walks flat-footed.',
    sizeInches: '2–3 in wide',
    gait: 'Hind foot prints near front foot, offset left/right.',
    claws: 'Claws visible on all 5 toes',
    note: 'Often found near water or trash. Mostly nocturnal — morning tracks are common.',
  },
  {
    animal: 'Eastern Cottontail',
    emoji: '🐇',
    frontTrack: '4 toes, small round print. Lands behind the larger hind feet when bounding.',
    hindTrack: 'Much larger than front — elongated oval, side by side when bounding.',
    sizeInches: 'Front: 1 in · Hind: 3 in',
    gait: 'Classic bounding Y-shape: two large hind feet forward, two small fronts behind.',
    claws: 'Faint claws on hind feet',
    note: 'The Y-shape bounding pattern is unmistakable. Often found at wood edges.',
    trackImg: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Rabbit_tracks.svg',
      alt: 'Rabbit bounding track pattern — two large hind feet ahead, two small front feet behind',
    },
  },
  {
    animal: 'Gray Squirrel',
    emoji: '🐿️',
    frontTrack: '4 toes in a tight cluster. Small and round.',
    hindTrack: '5 toes, longer and wider than front. Often lands ahead of front in bounding.',
    sizeInches: 'Front: ¾ in · Hind: 1½ in',
    gait: 'Bounding pairs: small fronts together, large hinds ahead — square cluster pattern.',
    claws: 'Thin claws visible',
    note: 'The square cluster is the key ID. Common at every campsite with trees.',
  },
  {
    animal: 'Red Fox',
    emoji: '🦊',
    frontTrack: '4 toes in an oval, with a bar-shaped central pad. Often shows fur between toes.',
    hindTrack: 'Nearly identical to front — slightly smaller.',
    sizeInches: '2–2½ in long',
    gait: 'Direct-register trot: hind foot lands precisely in front footprint, making a straight line.',
    claws: 'Claws visible, fine and close-set',
    note: 'The perfectly straight line of single prints is the fox signature. Coyote is larger.',
    trackImg: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Foxprint.svg',
      alt: 'Red fox paw print — oval shape with 4 toes and a central bar pad',
    },
  },
  {
    animal: 'Coyote',
    emoji: '🐺',
    frontTrack: '4 toes, oval shape, larger than fox. Less fur between toes.',
    hindTrack: 'Slightly smaller than front, same oval form.',
    sizeInches: '2½–3 in long',
    gait: 'Direct-register trot like fox — straight line. Wider stride than fox.',
    claws: 'Prominent claws clearly visible',
    warn: 'If pups are nearby, adults may be bold. Haze with noise if one approaches camp.',
    trackImg: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Canis_lupis_track.svg',
      alt: 'Canine track — 4 toes with prominent claws above a large central pad',
    },
  },
  {
    animal: 'Black Bear',
    emoji: '🐻',
    frontTrack: '5 toes in a wide arc above a large, chunky pad. Pigeon-toed.',
    hindTrack: 'Much longer — resembles a wide human foot with 5 toes.',
    sizeInches: 'Front: 4–5 in · Hind: 6–7 in',
    gait: 'Shuffling walk — hind foot lands slightly inside front track.',
    claws: 'Long curved claws up to 2 in ahead of toes',
    warn: 'Secure all food immediately. Never leave smelly items in tent. Report to camp host.',
  },
  {
    animal: 'Striped Skunk',
    emoji: '🦨',
    frontTrack: '5 toes with prominent long claws (used for digging). Compact pad.',
    hindTrack: 'Shorter claws, rounder toes. Heel visible.',
    sizeInches: '1–1½ in wide',
    gait: 'Slow, waddling walk — front and hind on same side move together.',
    claws: 'Very long front claws — most distinctive feature',
    note: 'Tracks often found near logs, disturbed soil, and grubs. Mostly nocturnal.',
  },
]

export default function AnimalTrackIdCard() {
  return (
    <div className="track-card">
      <style>{`
        .track-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .track-card .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 14px 0;
        }
        .track-card .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .track-card .panel {
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 10px 12px;
          background: #FAF8F2;
          break-inside: avoid;
        }
        .track-card .panel-inner {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .track-card .panel-body {
          flex: 1;
          min-width: 0;
        }
        .track-card .track-img {
          width: 58px;
          height: 72px;
          flex-shrink: 0;
          object-fit: contain;
          opacity: 0.75;
          filter: grayscale(1);
          margin-top: 2px;
        }
        .track-card .panel .animal-name {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #1C1917;
          margin: 0 0 2px 0;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .track-card .panel .size {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: #78716C;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0 0 6px 0;
        }
        .track-card .panel .row {
          font-size: 11px;
          color: #44403C;
          margin: 0 0 4px 0;
          line-height: 1.4;
        }
        .track-card .panel .row strong {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #78716C;
        }
        .track-card .panel .note {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          color: #57534E;
          margin: 5px 0 0 0;
          padding-top: 5px;
          border-top: 1px dotted #D6D3D1;
          font-style: italic;
        }
        .track-card .panel .warn {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          color: #B91C1C;
          margin: 5px 0 0 0;
          padding-top: 5px;
          border-top: 1px dotted #D6D3D1;
        }
      `}</style>

      <p className="lead">
        Track size varies by age and substrate — mud shows more detail than dust. When in doubt, look for the gait pattern: it&apos;s more reliable than print shape alone.
      </p>

      <div className="grid">
        {TRACKS.map((t) => (
          <div key={t.animal} className="panel">
            <div className="panel-inner">
              <div className="panel-body">
                <p className="animal-name"><span>{t.emoji}</span>{t.animal}</p>
                <p className="size">{t.sizeInches}</p>
                <p className="row"><strong>Front</strong> {t.frontTrack}</p>
                <p className="row"><strong>Hind</strong> {t.hindTrack}</p>
                <p className="row"><strong>Gait</strong> {t.gait}</p>
                <p className="row"><strong>Claws</strong> {t.claws}</p>
                {t.note && <p className="note">{t.note}</p>}
                {t.warn && <p className="warn">⚠ {t.warn}</p>}
              </div>
              {t.trackImg && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.trackImg.url}
                  alt={t.trackImg.alt}
                  className="track-img"
                  draggable={false}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
