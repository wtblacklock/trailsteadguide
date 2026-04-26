import { NextResponse } from 'next/server'
import { renderTripPackHtml } from '@/lib/pdf/template'
import { renderHtmlToPdf } from '@/lib/pdf/render'
import { verifyToken, tokenToInput } from '@/lib/pdf/token'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * GET /api/generate-pdf?token=...
 *   Verifies a signed token, renders the Trip Pack PDF, streams it back.
 *
 * GET /api/generate-pdf?preview=1&plan=first-night-camp&adults=2&kids=2
 *   Dev-only HTML preview (no token, no PDF) — handy while iterating on
 *   the template. Disabled in production.
 */
export async function GET(req: Request) {
  const url = new URL(req.url)

  // Dev preview mode: returns HTML instead of PDF, no token needed.
  if (url.searchParams.get('preview') === '1' && process.env.NODE_ENV !== 'production') {
    const plan = (url.searchParams.get('plan') || 'first-night-camp') as
      | 'first-night-camp'
      | 'first-weekend-camp'
      | 'easy-family-basecamp'
      | 'backyard-test'
    const adults = Number(url.searchParams.get('adults') || 2)
    const kids = Number(url.searchParams.get('kids') || 2)
    const nights = Number(url.searchParams.get('nights') || 1)
    const group = url.searchParams.get('group') || undefined
    const kidsAge = url.searchParams.get('kidsAge') || undefined
    const activity = url.searchParams.get('activity') || undefined
    const comfort = url.searchParams.get('comfort') || undefined
    const html = renderTripPackHtml({
      planSlug: plan,
      party: { adults, kids },
      nights,
      group: group as 'solo' | 'couple' | 'family' | undefined,
      kidsAge: kidsAge as 'under_5' | '5_10' | '10+' | undefined,
      activity: activity as 'relaxing' | 'balanced' | 'active' | undefined,
      comfort: comfort as 'minimal' | 'balanced' | 'comfort-first' | undefined,
    })
    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  const token = url.searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  const payload = verifyToken(token)
  if (!payload) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 })
  }

  const html = renderTripPackHtml(tokenToInput(payload))

  try {
    const pdf = await renderHtmlToPdf(html)
    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="trailstead-${payload.plan}.pdf"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (err) {
    console.error('[generate-pdf] failed', err)
    return NextResponse.json(
      { error: 'PDF generation failed', detail: (err as Error).message },
      { status: 500 },
    )
  }
}
