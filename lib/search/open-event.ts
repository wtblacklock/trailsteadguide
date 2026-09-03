import type { SearchDocType } from './types'

/**
 * Window event that asks <Nav> to open the search overlay.
 *
 * <Nav> owns the overlay's open state locally, so surfaces elsewhere in the
 * tree (the homepage guides section, for one) request it through this event
 * instead of threading a context provider through the whole app.
 */
export const OPEN_SEARCH_EVENT = 'trailstead:open-search'

export type OpenSearchDetail = {
  /** Pre-selects a result-type chip. Omit to open unscoped. */
  type?: SearchDocType
}
