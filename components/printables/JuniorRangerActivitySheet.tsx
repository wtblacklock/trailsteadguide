const SIGHT_PROMPTS = [
  'An animal I saw was',
  'A track or sign I found looked like',
  'The strangest sound I heard was',
  'One thing I want to learn more about is',
]

export default function JuniorRangerActivitySheet() {
  return (
    <div className="ranger-sheet">
      <style>{`
        .ranger-sheet {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.5;
        }
        .ranger-sheet .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 14px 0;
        }
        .ranger-sheet .section {
          margin-bottom: 14px;
          break-inside: avoid;
        }
        .ranger-sheet .section h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #57534E;
          border-bottom: 1px solid #D6D3D1;
          padding-bottom: 4px;
          margin: 0 0 8px 0;
        }
        .ranger-sheet .report-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 20px;
        }
        .ranger-sheet .fill-line {
          display: flex;
          align-items: baseline;
          gap: 6px;
          font-size: 11.5px;
          padding: 3px 0;
        }
        .ranger-sheet .fill-line .blank {
          flex: 1;
          border-bottom: 1px solid #A8A29E;
          min-width: 40px;
          height: 12px;
        }
        .ranger-sheet .weather-row {
          display: flex;
          gap: 14px;
          font-size: 11px;
          margin-top: 4px;
        }
        .ranger-sheet .weather-choice {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .ranger-sheet .circle {
          width: 13px;
          height: 13px;
          border: 1.2px solid #A8A29E;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .ranger-sheet .prompt-line {
          font-size: 11.5px;
          padding: 5px 0;
          border-bottom: 1px dotted #D6D3D1;
        }
        .ranger-sheet .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .ranger-sheet .sketch-box {
          border: 1.2px dashed #A8A29E;
          border-radius: 6px;
          height: 90px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 6px;
        }
        .ranger-sheet .sketch-box span {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          color: #A8A29E;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .ranger-sheet .sky-fill {
          font-size: 11.5px;
          padding: 5px 0;
        }
        .ranger-sheet .pledge {
          margin-top: 4px;
          padding: 10px 14px;
          background: #1C1917;
          color: #fff;
          border-radius: 6px;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10.5px;
          line-height: 1.5;
        }
        .ranger-sheet .pledge .sign-line {
          display: inline-block;
          border-bottom: 1px solid #78716C;
          min-width: 140px;
          margin: 0 4px;
        }
        .ranger-sheet .footnote {
          margin-top: 10px;
          font-size: 10px;
          color: #78716C;
          font-style: italic;
        }
      `}</style>

      <p className="lead">
        One page for one trip. Fill it in over a day at camp - at the picnic table, on a hike, or after dark. There is no wrong way to finish it.
      </p>

      <div className="section">
        <h2>My Campsite Report</h2>
        <div className="report-grid">
          <div className="fill-line"><span>Camper name:</span><span className="blank" /></div>
          <div className="fill-line"><span>Date:</span><span className="blank" /></div>
          <div className="fill-line"><span>Park or campground:</span><span className="blank" /></div>
          <div className="fill-line"><span>My guess at today&apos;s temperature:</span><span className="blank" /></div>
        </div>
        <div className="weather-row">
          <span>Today&apos;s weather:</span>
          {['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Cold'].map((w) => (
            <span className="weather-choice" key={w}>
              <span className="circle" aria-hidden="true" />
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Things I Noticed Today</h2>
        {SIGHT_PROMPTS.map((prompt) => (
          <div className="prompt-line" key={prompt}>{prompt}...</div>
        ))}
      </div>

      <div className="two-col">
        <div className="section">
          <h2>Sky Check</h2>
          <div className="sky-fill">A cloud I saw looked like...</div>
          <div className="sky-fill">One thing I spotted after dark was...</div>
        </div>
        <div className="section">
          <h2>Nature Sketch</h2>
          <div className="sketch-box"><span>Draw a leaf, rock, or bug you found</span></div>
        </div>
      </div>

      <div className="pledge">
        <strong>My Ranger Pledge:</strong> I promise to leave my campsite as good as I found it, keep a safe distance from wildlife, and pack out everything I pack in.
        Signed:<span className="sign-line" />
      </div>

      <p className="footnote">
        Many state and national parks hand out their own official Junior Ranger booklet at the visitor center, often leading to a real badge -
        ask when you check in. This page is a family activity for the drive there, not a substitute for it.
      </p>
    </div>
  )
}
