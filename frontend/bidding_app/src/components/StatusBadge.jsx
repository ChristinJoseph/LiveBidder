import { useAuction } from '../context/AuctionContext'

/**
 * StatusBadge
 * ------------
 * Shows user bidding status per item.
 */
export default function StatusBadge({ item }) {
  const USER_ID = 'user1' // later replace with auth
  const { state } = useAuction()

  if (item.status === 'ended') {
    return (
      <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-gray-600">
        Ended
      </span>
    )
  }

  if (item.currentBidder === USER_ID) {
    return (
      <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-green-600">
        Winning
      </span>
    )
  }

  return (
    <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-gray-700">
      Not Winning
    </span>
  )
}
