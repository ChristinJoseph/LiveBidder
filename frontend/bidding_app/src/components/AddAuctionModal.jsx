import { useState } from 'react'
import { createAuctionItem } from '../services/auctionApi'

export default function AddAuctionModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startingPrice: '',
    durationMinutes: 5
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const now = Date.now()
      const auctionEndTime =
        now + Number(form.durationMinutes) * 60 * 1000

      await createAuctionItem({
        id: crypto.randomUUID(),
        title: form.title,
        description: form.description,
        startingPrice: Number(form.startingPrice),
        auctionEndTime
      })

      onCreated()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl w-96"
      >
        <h2 className="text-xl font-bold mb-4">Create Auction</h2>

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full mb-2 p-2 rounded bg-gray-700"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full mb-2 p-2 rounded bg-gray-700"
        />

        <input
          name="startingPrice"
          type="number"
          placeholder="Starting Price"
          onChange={handleChange}
          className="w-full mb-2 p-2 rounded bg-gray-700"
          required
        />

        <input
          name="durationMinutes"
          type="number"
          placeholder="Duration (minutes)"
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />

        {error && <p className="text-red-400">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-blue-600 p-2 rounded"
        >
          {loading ? 'Creating…' : 'Create Auction'}
        </button>
      </form>
    </div>
  )
}
