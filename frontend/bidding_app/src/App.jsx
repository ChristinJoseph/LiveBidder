import { AuctionProvider } from './context/AuctionContext'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <AuctionProvider>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Live Bidding</h1>
        <Dashboard />
      </div>
    </AuctionProvider>
  )
}
