export default function WeatherSignsCard() {
  return (
    <div className="wx-card">
      <style>{`
        .wx-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .wx-card .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 14px 0;
        }
        .wx-card h2 {
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
        .wx-card .clouds-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          margin-bottom: 14px;
        }
        .wx-card .cloud-panel {
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 8px 10px;
          background: #FAF8F2;
          break-inside: avoid;
        }
        .wx-card .cloud-panel .cloud-icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
          display: block;
          margin: 0 auto 5px;
          opacity: 0.7;
          filter: grayscale(1);
        }
        .wx-card .cloud-panel .cloud-name {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          margin: 0 0 3px 0;
        }
        .wx-card .cloud-panel .cloud-look {
          font-size: 10.5px;
          color: #44403C;
          margin: 0 0 4px 0;
          line-height: 1.35;
        }
        .wx-card .cloud-panel .cloud-signal {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          padding: 3px 6px;
          border-radius: 3px;
          display: inline-block;
        }
        .wx-card .signal-ok { background: #ECFDF5; color: #065F46; }
        .wx-card .signal-warn { background: #FFFBEB; color: #92400E; }
        .wx-card .signal-bad { background: #FEF2F2; color: #991B1B; }
        .wx-card .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        .wx-card .info-list { margin: 0; padding: 0; list-style: none; }
        .wx-card .info-list li {
          font-size: 11.5px;
          color: #292524;
          padding: 4px 0;
          border-bottom: 1px dotted #E7E5E4;
          line-height: 1.4;
        }
        .wx-card .info-list li:last-child { border-bottom: none; }
        .wx-card .info-list li strong {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          display: block;
          color: #78716C;
          margin-bottom: 1px;
        }
        .wx-card .decision {
          background: #1C1917;
          color: #fff;
          border-radius: 6px;
          padding: 12px 14px;
        }
        .wx-card .decision h2 { color: #D6D3D1; border-bottom-color: #44403C; }
        .wx-card .decision-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          font-size: 11px;
          line-height: 1.45;
        }
        .wx-card .decision-row .col strong {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }
        .wx-card .decision-row .col.go strong { color: #6EE7B7; }
        .wx-card .decision-row .col.watch strong { color: #FCD34D; }
        .wx-card .decision-row .col.go-now strong { color: #FCA5A5; }
      `}</style>

      <p className="lead">
        Weather moves faster than forecasts. Learn the local signs and you&apos;ll know what&apos;s coming 2–6 hours before it arrives — long enough to set a rain fly, shorten a hike, or get back to camp.
      </p>

      <h2>Cloud Types — What They Signal</h2>
      <div className="clouds-grid">
        {[
          { name: 'Cumulus', look: 'Puffy white cauliflower clouds, flat base, sharp edges.', signal: 'Fair weather', type: 'ok', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Cumulus.svg' },
          { name: 'Cumulonimbus', look: 'Towering anvil-top cloud, dark base, can span horizon.', signal: 'Storms coming', type: 'bad', img: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Cumulonimbus.svg' },
          { name: 'Cirrus', look: 'Thin, wispy streaks high in the sky.', signal: 'Change in 24–48h', type: 'warn', img: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Clouds_CH_6.svg' },
          { name: 'Stratus', look: 'Low, flat grey blanket covering the sky.', signal: 'Drizzle likely', type: 'warn', img: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Stratus.svg' },
          { name: 'Altocumulus', look: 'Rippled rows of grey-white puffs at mid height.', signal: 'Storms possible', type: 'warn', img: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Symbol_altocumulus.svg' },
        ].map((c) => (
          <div key={c.name} className="cloud-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.img} alt={`${c.name} cloud symbol`} className="cloud-icon" draggable={false} />
            <p className="cloud-name">{c.name}</p>
            <p className="cloud-look">{c.look}</p>
            <span className={`cloud-signal signal-${c.type}`}>{c.signal}</span>
          </div>
        ))}
      </div>

      <div className="two-col">
        <div>
          <h2>Wind Signs</h2>
          <ul className="info-list">
            <li><strong>Sudden calm after breeze</strong>A squall line may be approaching. Look for a dark shelf cloud on the horizon.</li>
            <li><strong>Wind shifting to the south</strong>Warm front approaching — rain likely within 12 hours.</li>
            <li><strong>Backing wind (clockwise to counter-clockwise)</strong>Deteriorating conditions. Watch the sky.</li>
            <li><strong>Steady strong wind from the west</strong>Usually clearing weather following a front. Good sign.</li>
          </ul>
        </div>
        <div>
          <h2>Sky Color Rules</h2>
          <ul className="info-list">
            <li><strong>Red sky at night</strong>Sailors&apos; delight. High pressure moving in from the west — fair weather ahead.</li>
            <li><strong>Red sky in morning</strong>Sailors take warning. Moisture moving in from the west — rain likely.</li>
            <li><strong>Yellow/green sky before sunset</strong>Hail or tornado risk in severe weather regions. Seek shelter.</li>
            <li><strong>Dark purple horizon to the west</strong>Heavy rain cell approaching. Set up rain protection now.</li>
          </ul>
        </div>
      </div>

      <div className="decision">
        <h2>6-Hour Decision Tree</h2>
        <div className="decision-row">
          <div className="col go">
            <strong>Carry on</strong>
            Cumulus only, wind steady from west or northwest, no anvil clouds visible, barometer steady or rising.
          </div>
          <div className="col watch">
            <strong>Set rain fly now</strong>
            Cirrus building, wind backing, altocumulus ripples appearing, humidity rising noticeably.
          </div>
          <div className="col go-now">
            <strong>Shorten hike / head in</strong>
            Cumulonimbus on horizon, sudden wind shift, darkening base cloud, thunder audible (any distance).
          </div>
        </div>
      </div>
    </div>
  )
}
