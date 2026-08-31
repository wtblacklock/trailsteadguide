export type SearchDocType =
  | 'guide'
  | 'skill'
  | 'activity'
  | 'printable'
  | 'gear'
  | 'glossary'
  | 'compare'
  | 'plan'

export type SearchDocument = {
  /** Unique across all documents, e.g. "guide:camping-for-beginners". */
  id: string
  type: SearchDocType
  title: string
  /** Shown under the title in results. */
  excerpt: string
  url: string
  /** Extra matchable text (tags/category) - not displayed. */
  keywords?: string
}

export const SEARCH_TYPE_LABELS: Record<SearchDocType, string> = {
  guide: 'Guide',
  skill: 'Skill',
  activity: 'Activity',
  printable: 'Printable',
  gear: 'Gear',
  glossary: 'Glossary',
  compare: 'Compare',
  plan: 'Plan',
}
