const db = require('../config/db')

async function placeBid({ itemId, userId, bidAmount }) {
  const now = Date.now()

  // 🔎 DEBUG: check row BEFORE update
  const before = await db.query(
    `SELECT id, current_bid, status, auction_end_time FROM auction_items WHERE id = $1`,
    [itemId]
  )

  console.log('BEFORE UPDATE:', before.rows)

  const result = await db.query(
    `
    UPDATE auction_items
    SET current_bid = $1,
        current_bidder = $2
    WHERE id = $3
      AND status = 'active'
      AND auction_end_time > $4
      AND current_bid < $1
    RETURNING *
    `,
    [bidAmount, userId, itemId, now]
  )

  console.log('UPDATE rowCount:', result.rowCount)

  if (result.rowCount === 0) {
    throw new Error('DB_UPDATE_FAILED')
  }

  // ✅ Insert bid history
  await db.query(
    `
    INSERT INTO bids (item_id, user_id, bid_amount, created_at)
    VALUES ($1, $2, $3, $4)
    `,
    [itemId, userId, bidAmount, now]
  )

  return result.rows[0]
}

module.exports = { placeBid }