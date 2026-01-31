import { useAuction } from '../context/AuctionContext'
import { useCountdown } from '../hooks/useCountdown'

export default function CountdownTimer({ endTime }) {
  const { state } = useAuction()
  const remaining = useCountdown(endTime, state.serverTimeOffset)

  if (remaining <= 0) {
    return <span className="text-red-500">Auction Ended</span>
  }

  const seconds = Math.floor(remaining / 1000)

  let color = 'text-green-400'
  if (seconds < 60) color = 'text-yellow-400'
  if (seconds < 30) color = 'text-red-500 animate-pulse'

  return <span className={color}>{seconds}s left</span>
}
