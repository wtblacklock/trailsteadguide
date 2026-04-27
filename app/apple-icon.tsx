import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5efe2',
        }}
      >
        <svg width="150" height="150" viewBox="0 0 48 48">
          <path d="M8 34 L20 16 L28 28 L34 20 L42 34 Z" fill="#1f3622" />
          <line
            x1="6"
            y1="38"
            x2="42"
            y2="38"
            stroke="#3a5a3e"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  )
}
