'use client'

import { useEffect } from 'react'

let lockCount = 0
let previousOverflow = ''

/**
 * Locks page scroll while `active` is true.
 *
 * Reference-counted so multiple overlays that can be open at the same time
 * (e.g. the mobile menu and the search overlay - the mobile menu has its own
 * search trigger, and Cmd+K doesn't close the menu) don't fight over
 * restoring `document.body.style.overflow`. Scroll only unlocks once every
 * active lock has released, regardless of which overlay closes first.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    lockCount++
    return () => {
      lockCount--
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow
      }
    }
  }, [active])
}
