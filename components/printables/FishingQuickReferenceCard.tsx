import PrintPageBreak from './PrintPageBreak'

const RIG_STEPS: Array<{ step: string; detail: string }> = [
  { step: 'Thread the line', detail: 'Pull line off the spool and run it through every rod guide, bottom guides first.' },
  { step: 'Tie on a swivel', detail: 'Attach a small swivel or clip with the improved clinch knot at right.' },
  { step: 'Add weight', detail: 'Pinch one split shot about 12 inches up the line from the swivel.' },
  { step: 'Add a bobber', detail: 'Clip a bobber on about 3 feet up the line from the split shot.' },
  { step: 'Bait the hook', detail: 'Clip on a hook sized for the target fish and thread on the bait.' },
  { step: 'Cast', detail: 'Hold the rod at 10 o’clock, open the bail, sweep forward to 2 o’clock, and release the line off your finger.' },
]

const KNOT_STEPS: Array<{ step: string; detail: string }> = [
  { step: 'Thread', detail: 'Pass 6 inches of line through the eye of the hook or swivel.' },
  { step: 'Wrap', detail: 'Wrap the tag end around the main line 5 times (4 times on line over 20 lb test), wrapping away from the eye.' },
  { step: 'First loop', detail: 'Pass the tag end through the small loop that formed just above the eye.' },
  { step: 'Improved loop', detail: 'Pass the tag end through the larger loop you just made - the step that keeps this knot from slipping.' },
  { step: 'Wet and cinch', detail: 'Wet the knot, then pull both ends steadily until the wraps seat tight against the eye. Trim the tag to about ¼ inch.' },
]

const SPECIES_PICKS: Array<{ name: string; hook: string; bait: string; setup: string }> = [
  {
    name: 'Panfish (bluegill, sunfish, crappie)',
    hook: 'Size 8-10',
    bait: 'A piece of worm the size of a thumbnail',
    setup: 'Bobber, shallow water, near structure',
  },
  {
    name: 'Trout (streams)',
    hook: 'Size 8-12',
    bait: 'Match what’s hatching if visible; otherwise a small spinner or gold spoon',
    setup: 'Light line, drift with the current',
  },
  {
    name: 'Bass',
    hook: 'Size 1-4, weedless',
    bait: 'A 4-6 inch soft plastic worm',
    setup: 'Slow retrieve near structure; slower still in cold water',
  },
  {
    name: 'Catfish',
    hook: 'Size 1-4',
    bait: 'Strong-smelling dough bait or cut bait',
    setup: 'Heavy sinker, no bobber, on the bottom',
  },
]

const RELEASE_STEPS: Array<{ step: string; detail: string }> = [
  { step: 'Land it quickly', detail: 'A long fight exhausts the fish before it ever reaches your hands.' },
  { step: 'Wet your hands', detail: 'Dry hands strip the slime coat that protects the fish from infection.' },
  { step: 'Hold it horizontally', detail: 'One hand under the belly, one near the tail. Never squeeze, and never lift by the gills or jaw.' },
  { step: 'Remove the hook', detail: 'Back it out the way it went in. If it’s deep, cut the line close instead of digging for it - the hook will dissolve.' },
  { step: 'Let it swim off', detail: 'Lower it into the water facing the current and let it kick free on its own. Don’t toss it.' },
]

export default function FishingQuickReferenceCard() {
  return (
    <div className="fish-card">
      <style>{`
        .fish-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .fish-card .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 12px 0;
        }
        .fish-card h2 {
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
        .fish-card .top-cols {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 16px;
        }
        .fish-card ol {
          list-style: none;
          padding: 0;
          margin: 0 0 4px 0;
          counter-reset: fstep;
        }
        .fish-card ol li {
          display: grid;
          grid-template-columns: 96px 1fr;
          gap: 8px;
          font-size: 11px;
          padding: 4.5px 0;
          border-bottom: 1px dotted #E7E5E4;
          counter-increment: fstep;
          line-height: 1.4;
        }
        .fish-card ol li:last-child { border-bottom: none; }
        .fish-card ol li::before {
          content: counter(fstep);
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          width: 17px;
          height: 17px;
          border: 1.2px solid #1C1917;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .fish-card ol li .step-label {
          font-family: 'Figtree', system-ui, sans-serif;
          font-weight: 700;
          font-size: 10.5px;
          color: #1C1917;
        }
        .fish-card ol li .step-detail {
          font-size: 10.5px;
          color: #44403C;
        }
        .fish-card .safety-note {
          margin-top: 10px;
          background: #FAF8F2;
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 8px 12px;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          color: #44403C;
          line-height: 1.5;
        }
        .fish-card .safety-note strong {
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 9.5px;
          color: #78716C;
          display: block;
          margin-bottom: 2px;
        }
        .fish-card .species-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 14px;
        }
        .fish-card .species {
          border: 1px solid #D6D3D1;
          border-radius: 8px;
          padding: 9px 11px;
          background: #FAF8F2;
        }
        .fish-card .species .name {
          font-family: 'Figtree', system-ui, sans-serif;
          font-weight: 700;
          font-size: 11px;
          display: block;
          margin-bottom: 4px;
        }
        .fish-card .species .row {
          font-size: 10.5px;
          color: #44403C;
          line-height: 1.4;
          margin-bottom: 2px;
        }
        .fish-card .species .row strong {
          color: #78716C;
          font-weight: 600;
        }
        .fish-card .universal {
          font-size: 10.5px;
          color: #44403C;
          font-style: italic;
          margin: 0 0 14px 0;
        }
        .fish-card .license-note {
          font-size: 9.5px;
          color: #78716C;
          font-style: italic;
          margin-top: 4px;
        }
      `}</style>

      <div className="print-side print-side-1">
        <p className="lead">
          One rig, one knot, one cast. This is the setup that gets a first-timer from a bare rod to a baited hook in the water, plus the knot you&apos;ll tie more than any other.
        </p>

        <div className="top-cols">
          <div>
            <h2>Rig &amp; Cast</h2>
            <ol>
              {RIG_STEPS.map((s) => (
                <li key={s.step}>
                  <span className="step-label">{s.step}</span>
                  <span className="step-detail">{s.detail}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2>Improved Clinch Knot</h2>
            <ol>
              {KNOT_STEPS.map((s) => (
                <li key={s.step}>
                  <span className="step-label">{s.step}</span>
                  <span className="step-detail">{s.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="safety-note">
          <strong>Before every cast</strong>
          Look behind and overhead for people, branches, and power lines. For kids, pinch the hook barb flat with pliers first - easier releases and far fewer trips to the first aid kit.
        </div>
      </div>

      <PrintPageBreak />

      <div className="print-side print-side-2">
        <h2>What to Use, By Species</h2>
        <div className="species-grid">
          {SPECIES_PICKS.map((s) => (
            <div className="species" key={s.name}>
              <span className="name">{s.name}</span>
              <span className="row"><strong>Hook: </strong>{s.hook}</span>
              <span className="row"><strong>Bait: </strong>{s.bait}</span>
              <span className="row"><strong>Setup: </strong>{s.setup}</span>
            </div>
          ))}
        </div>
        <p className="universal">
          Not sure where to start? A nightcrawler on a size 8 hook under a bobber catches bass, panfish, catfish, and trout - the closest thing to a universal first choice.
        </p>

        <h2>Catch &amp; Release</h2>
        <ol>
          {RELEASE_STEPS.map((s) => (
            <li key={s.step}>
              <span className="step-label">{s.step}</span>
              <span className="step-detail">{s.detail}</span>
            </li>
          ))}
        </ol>
        <p className="license-note">
          Most states require a fishing license for anglers above a certain age, and set their own size and bag limits by species and water. Check your state wildlife agency&apos;s rules before you cast.
        </p>
      </div>
    </div>
  )
}
