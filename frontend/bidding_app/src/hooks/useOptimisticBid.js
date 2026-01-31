import { useState } from 'react'
import socket from '../services/socket'
import { useAuction } from '../context/AuctionContext'
import { getUserId } from '../utils/user'

export function useOptimisticBid(item) {
  const { dispatch } = useAuction()
  const [isPending, setIsPending] = useState(false)
  const userId = getUserId()

  function placeBid(increment = 10) {
    if (isPending) return

    const bidAmount = Number(item.currentBid) + increment
    const previousBid = item.currentBid
    const previousBidder = item.currentBidder

    setIsPending(true)

    // 1️⃣ OPTIMISTIC UPDATE
    dispatch({
      type: 'UPDATE_ITEM',
      payload: {
        id: item.id,
        updates: {
          currentBid: bidAmount,
          currentBidder: userId
        }
      }
    })

    // 2️⃣ SEND TO SERVER
    socket.emit('BID_PLACED', {
      itemId: item.id,
      userId,
      bidAmount
    })

    // 3️⃣ HANDLE SERVER CONFIRMATION
    const onUpdate = (data) => {
      if (data.itemId !== item.id) return

      // If MY bid was accepted
      if (data.bidderId === userId) {
        setIsPending(false)
      } 
      // Someone else outbid me
      else {
        dispatch({
          type: 'UPDATE_ITEM',
          payload: {
            id: item.id,
            updates: {
              currentBid: data.newBid,
              currentBidder: data.bidderId
            }
          }
        })
        setIsPending(false)
      }

      cleanup()
    }

    // 4️⃣ HANDLE REJECTION
    const onReject = (data) => {
      if (data.itemId !== item.id) return

      // Rollback optimistic update
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
      cleanup()
    }

    function cleanup() {
      socket.off('UPDATE_BID', onUpdate)
      socket.off('BID_REJECTED', onReject)
    }

    socket.on('UPDATE_BID', onUpdate)
    socket.on('BID_REJECTED', onReject)
  }

  return {
    placeBid,
    isPending
  }
}
