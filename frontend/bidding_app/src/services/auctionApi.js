const BASE = import.meta.env.VITE_BACKEND_URL + '/api'

export async function createAuctionItem(payload) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/items`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
  )

  if (!res.ok) {
    throw new Error('Failed to create auction')
  }

  return res.json()
}
export async function getItems() {
  const res = await fetch(`${BASE}/items`);

  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }

  return res.json();
}

export async function getServerTime() {
  const res = await fetch(`${BASE}/time`)
  return res.json()
}


