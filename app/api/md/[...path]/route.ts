/**
 * Catch-all Markdown export handler.
 *
 * Public URLs of the form `/<original-url>.md` are rewritten to
 * `/api/md/<original-path>` by next.config.ts. This route handler renders
 * a clean Markdown version of the matching guide / plan / skill /
 * activity / hub.
 *
 * `force-static` + `generateStaticParams` means every Markdown URL is
 * pre-rendered at build time, so the deployed function bundle never
 * needs runtime fs access (the Quick-Answer extraction in
 * `lib/markdown-export.ts` reads the source `.tsx` files at build).
 */

import { allMarkdownPaths, dispatchMarkdown } from '@/lib/markdown-export'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return allMarkdownPaths()
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params
  return dispatchMarkdown(path)
}
