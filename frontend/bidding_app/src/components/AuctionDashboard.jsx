import { useEffect } from 'react'
import { getItems } from '../services/auctionApi'
import { useAuction } from '../context/AuctionContext'
import { useAuctionSocket } from '../hooks/useAuctionSocket'
import AuctionCard from './AuctionCard'

export default function AuctionDashboard() {
  const { state, dispatch } = useAuction()
  useAuctionSocket()
  
  useEffect(() => {
    getItems().then(data => {
      dispatch({ type: 'SET_ITEMS', payload: data.items })
      dispatch({
        type: 'SET_TIME_OFFSET',
        payload: data.serverTime - Date.now()
      })
    })
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {state.items.map(item => (
        <AuctionCard key={item.id} item={item} />
      ))}
    </div>
  )
}
