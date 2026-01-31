import { useEffect, useState } from 'react'

/**
 * useCountdown
 * -------------
 * Calculates remaining time using SERVER-SYNCED clock.
 *
 * @param {number} endTime - auctionEndTime (timestamp in ms)
 * @param {number} offset - serverTimeOffset (serverTime - Date.now())
 * @returns {number} remaining time in milliseconds
 */
export function useCountdown(endTime, offset) {
  const [remaining, setRemaining] = useState(() => {
    return Math.max(endTime - (Date.now() + offset), 0)
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const serverNow = Date.now() + offset
      const diff = Math.max(endTime - serverNow, 0)
      setRemaining(diff)
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime, offset])

  return remaining
}
