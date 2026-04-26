import { track as vaTrack } from '@vercel/analytics'

type Props = Record<string, string | number | boolean>

/**
 * Vercel Analytics' `track()` calls `window.va?.(...)` and silently no-ops if
 * the `<Analytics />` component hasn't installed the queue stub yet. Because
 * `<Analytics />` is wrapped in <Suspense> (it uses `useSearchParams`), its
 * mount effect can run *after* sibling components' mount effects — meaning
 * the first mount-time track call from a quiz/paywall component is dropped.
 *
 * This wrapper pushes directly to `window.vaq` when `window.va` isn't ready;
 * the real Vercel Analytics script drains that queue once it loads.
 */
export function track(name: string, props?: Props): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as {
    va?: (...args: unknown[]) => void
    vaq?: unknown[][]
  }
  if (typeof w.va === 'function') {
    vaTrack(name, props)
    return
  }
  w.vaq = w.vaq || []
  w.vaq.push(['event', props ? { name, data: props } : { name }])
}
