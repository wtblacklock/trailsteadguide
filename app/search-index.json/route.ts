import { NextResponse } from 'next/server'
import { buildSearchIndex } from '@/lib/search/build-index'

// Generated once at build time and served as a static asset - mirrors the
// convention used by app/sitemap.ts and app/robots.ts.
export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(buildSearchIndex())
}
