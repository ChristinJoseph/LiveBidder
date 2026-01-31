import { useAuction } from '../context/AuctionContext'
import { getUserId } from '../utils/user'

/**
 * StatusBadge
 * ------------
 * Shows user bidding status per item.
 */
export default function StatusBadge({ item }) {
  const userId = getUserId()
  const { state } = useAuction()

  const isWinning = item.currentBidder === userId

  if (item.status === 'ended') {
    return (
      <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-gray-600">
        Ended
      </span>
    )
  }

  return (
    <span
      className={`inline-block mt-2 px-2 py-1 rounded text-sm ${
        isWinning
          ? 'bg-green-600 text-white'
          : 'bg-red-600 text-white'
      }`}
    >
      {isWinning ? 'Winning' : 'OutBid'}
    </span>
  )
}
