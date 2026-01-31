import { useState } from 'react'
import AuctionDashboard from '../components/AuctionDashboard'
import AddAuctionModal from '../components/AddAuctionModal'

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false)
  const isAdmin = true // later replace with auth

  return (
    <>
      {isAdmin && (
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-green-600 p-2 rounded"
        >
          + Add Auction
        </button>
      )}

      <AuctionDashboard />

      {showModal && (
        <AddAuctionModal
          onClose={() => setShowModal(false)}
          onCreated={() => window.location.reload()}
        />
      )}
    </>
  )
}
