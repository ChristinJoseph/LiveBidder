import { useState } from 'react'
import socket from '../services/socket'
import { useAuction } from '../context/AuctionContext'

/**
 * useOptimisticBid
 * ----------------
 * Handles optimistic UI update for bidding.
 * Rolls back automatically if server rejects bid.
 */
export function useOptimisticBid(item) {
  const { dispatch } = useAuction()
  const [isPending, setIsPending] = useState(false)

  function placeBid(userId, increment = 10) {
    if (isPending) return

    const optimisticBid = item.currentBid + increment
    const previousBid = item.currentBid
    const previousBidder = item.currentBidder

    setIsPending(true)

    // 1️⃣ OPTIMISTIC UPDATE
    dispatch({
      type: 'UPDATE_ITEM',
      payload: {
        id: item.id,
        updates: {
          currentBid: optimisticBid,
          currentBidder: userId
        }
      }
    })

    // 2️⃣ SEND TO SERVER
    socket.emit('BID_PLACED', {
      itemId: item.id,
      userId,
      bidAmount: optimisticBid
    })

    // 3️⃣ WAIT FOR REJECTION (success is handled by UPDATE_BID)
    const onReject = (data) => {
      if (data.itemId !== item.id) return

      // 🔁 ROLLBACK
      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          id: item.id,
          updates: {
            currentBid: previousBid,
            currentBidder: previousBidder
          }
        }
      })

      setIsPending(false)
      socket.off('BID_REJECTED', onReject)
    }

    socket.on('BID_REJECTED', onReject)

    // 4️⃣ CLEAR PENDING WHEN CONFIRMED BY SERVER
    socket.once('UPDATE_BID', () => {
      setIsPending(false)
      socket.off('BID_REJECTED', onReject)
    })
  }

  return {
    placeBid,
    isPending
  }
}
