import { useEffect } from 'react'
import socket from '../services/socket'
import { useAuction } from '../context/AuctionContext'

export function useAuctionSocket() {
  const { dispatch } = useAuction()

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected')
    })

    socket.on('UPDATE_BID', data => {
      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          id: data.itemId,
          updates: {
            currentBid: data.newBid,
            currentBidder: data.bidderId
          }
        }
      })
    })

    socket.on('AUCTION_ENDED', ({ itemId }) => {
      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          id: itemId,
          updates: { status: 'ended' }
        }
      })
    })

    socket.on('BID_REJECTED', data => {
      console.warn('Bid rejected:', data)
    })

    return () => {
      socket.off()
    }
  }, [])
}
