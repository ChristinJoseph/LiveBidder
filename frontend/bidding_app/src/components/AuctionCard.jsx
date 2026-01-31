import CountdownTimer from './CountdownTimer'
import BidButton from './BidButton'
import StatusBadge from './StatusBadge'

export default function AuctionCard({ item }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow transition-all">
      <h2 className="text-xl font-semibold">{item.title}</h2>

      <p className="text-green-400 text-lg mt-2">
        ₹{item.currentBid}
      </p>

      <StatusBadge item={item} />
      <CountdownTimer endTime={item.auctionEndTime} />
      <BidButton item={item} />
    </div>
  )
}
