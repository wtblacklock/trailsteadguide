import { ImageResponse } from 'next/og'

export const alt = 'Trailstead Guide — plan your first camping trip in minutes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5efe2',
          padding: 80,
          textAlign: 'center',
        }}
      >
        <svg width="200" height="200" viewBox="0 0 48 48" style={{ marginBottom: 56 }}>
          <defs>
            <linearGradient id="og-mark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a5a3e" />
              <stop offset="1" stopColor="#1f3622" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="22" fill="#ffffff" />
          <path d="M8 34 L20 16 L28 28 L34 20 L42 34 Z" fill="url(#og-mark)" />
          <line
            x1="6"
            y1="38"
            x2="42"
            y2="38"
            stroke="#3a5a3e"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 700,
            color: '#1c1917',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          Trailstead Guide
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 38,
            color: '#57534e',
            marginTop: 28,
            lineHeight: 1.3,
            maxWidth: 880,
          }}
        >
          Plan your first camping trip in minutes.
        </div>
      </div>
    ),
    { ...size },
  )
}
