import { useOptimisticBid } from '../hooks/useOptimisticBid'
import { getUserId } from '../utils/user'

export default function BidButton({ item }) {
  const { placeBid, isPending } = useOptimisticBid(item)
  const userId = getUserId()

  const disabled =
    item.status === 'ended' ||
    item.currentBidder === userId ||
    isPending

  return (
    <button
      disabled={disabled}
      onClick={() => placeBid(10)}
      className="mt-4 w-full bg-blue-600 disabled:bg-gray-600 p-2 rounded"
    >
      {isPending ? 'Placing bid…' : 'Bid +10'}
    </button>
    
    
  )
}
