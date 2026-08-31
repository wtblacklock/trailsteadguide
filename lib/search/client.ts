import MiniSearch from 'minisearch'
import type { SearchDocument } from './types'

export type SearchEngine = MiniSearch<SearchDocument>

/** Builds a MiniSearch engine over the given documents. Pure — no I/O. */
export function createSearchEngine(documents: SearchDocument[]): SearchEngine {
  const engine = new MiniSearch<SearchDocument>({
    idField: 'id',
    fields: ['title', 'excerpt', 'keywords'],
    storeFields: ['id', 'type', 'title', 'excerpt', 'url'],
    searchOptions: {
      boost: { title: 3, excerpt: 1, keywords: 1 },
      // Short terms (<= 4 chars) skip fuzzy matching entirely — a proportional
      // fuzziness large enough to catch e.g. "tnet" -> "tent" also matches
      // huge swaths of the index for common short words like "tent"/"fire".
      // Exact + prefix matching remain active regardless. Longer terms keep
      // the original proportional fuzziness.
      fuzzy: (term: string) => (term.length <= 4 ? 0 : 0.2),
      prefix: true,
    },
  })
  engine.addAll(documents)
  return engine
}

/** Searches the engine, returning full SearchDocument objects. */
export function searchDocuments(engine: SearchEngine, query: string): SearchDocument[] {
  const trimmed = query.trim()
  if (!trimmed) return []
  return engine.search(trimmed).map((result) => ({
    id: result.id as string,
    type: result.type,
    title: result.title,
    excerpt: result.excerpt,
    url: result.url,
  }))
}

let cachedEnginePromise: Promise<SearchEngine> | null = null

/**
 * Fetches the search index and builds the engine, memoized for the life of
 * the page session — only the first call to open the search overlay pays
 * the fetch + index-build cost.
 */
export function getSearchEngine(): Promise<SearchEngine> {
  if (!cachedEnginePromise) {
    cachedEnginePromise = fetch('/search-index.json')
      .then((res) => {
        if (!res.ok) throw new Error(`search index fetch failed: ${res.status}`)
        return res.json() as Promise<SearchDocument[]>
      })
      .then((documents) => createSearchEngine(documents))
      .catch((err) => {
        // Allow a retry on the next call instead of caching the failure forever.
        cachedEnginePromise = null
        throw err
      })
  }
  return cachedEnginePromise
}
