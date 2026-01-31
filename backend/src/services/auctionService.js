const db = require('../config/db')

async function placeBid({ itemId, userId, bidAmount }) {
  const now = Date.now()

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
    `,`
  INSERT INTO bids (item_id, user_id, bid_amount, created_at)
  VALUES ($1, $2, $3, $4)
  `,
    [itemId, userId, bidAmount, now]
  )

  // 👇 THIS TELLS YOU IF DB UPDATED OR NOT
  console.log('DB UPDATE RESULT:', result.rowCount)

  if (result.rowCount === 0) {
    throw { code: 'bid_rejected' }
  }

  return result.rows[0]
}

module.exports = { placeBid }
