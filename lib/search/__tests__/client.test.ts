import { describe, it, expect } from 'vitest'
import { buildSearchIndex } from '../build-index'
import { createSearchEngine, searchDocuments } from '../client'

describe('search engine', () => {
  const engine = createSearchEngine(buildSearchIndex())

  it('finds tent-related content when searching "tent"', () => {
    const results = searchDocuments(engine, 'tent')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some((r) => r.title.toLowerCase().includes('tent'))).toBe(true)
  })

  it('is typo-tolerant', () => {
    const results = searchDocuments(engine, 'tnet')
    expect(results.some((r) => r.title.toLowerCase().includes('tent'))).toBe(true)
  })

  it('matches on a partial/prefix word', () => {
    const results = searchDocuments(engine, 'campfi')
    expect(results.length).toBeGreaterThan(0)
  })

  it('returns an empty array for a query matching nothing', () => {
    const results = searchDocuments(engine, 'zzzznonexistentqueryzzzz')
    expect(results).toEqual([])
  })

  it('returns an empty array for an empty query', () => {
    expect(searchDocuments(engine, '')).toEqual([])
  })
})
