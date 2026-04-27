import { ImageResponse } from 'next/og'
import fs from 'node:fs/promises'
import path from 'node:path'

export const alt = 'Trailstead Guide — plan your first camping trip in minutes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const rawSvg = await fs.readFile(
    path.join(process.cwd(), 'public/images/trailsteadguide_logo.svg'),
    'utf8',
  )
  const inlinedSvg = rawSvg
    .replace(/<defs>[\s\S]*?<\/defs>/, '')
    .replace(/class="cls-1"/g, 'fill="#776a62"')
    .replace(/class="cls-2"/g, 'fill="#295244"')
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(inlinedSvg).toString('base64')}`

  const serifItalic = await fs.readFile(
    path.join(process.cwd(), 'public/fonts/source-serif-4-italic.ttf'),
  )

  const logoWidth = 800
  const logoHeight = Math.round((30.26 / 285.08) * logoWidth)

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
        }}
      >
        <img
          src={logoDataUri}
          width={logoWidth}
          height={logoHeight}
          alt=""
          style={{ marginBottom: 72 }}
        />
        <div
          style={{
            display: 'flex',
            fontFamily: 'Source Serif 4',
            fontStyle: 'italic',
            fontSize: 48,
            color: '#295244',
            lineHeight: 1.25,
            textAlign: 'center',
          }}
        >
          Plan your first camping trip in minutes.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Source Serif 4',
          data: serifItalic,
          style: 'italic',
          weight: 400,
        },
      ],
    },
  )
}
