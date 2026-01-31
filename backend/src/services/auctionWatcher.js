const db = require('../config/db')

function startAuctionWatcher(io) {
  setInterval(async () => {
    try {
      const now = Date.now()

      const result = await db.query(
        `
        UPDATE auction_items
        SET status = 'ended'
        WHERE status = 'active'
          AND auction_end_time <= $1
        RETURNING id
        `,
        [now]
      )

      // Notify clients for each ended auction
      result.rows.forEach(row => {
        io.emit('AUCTION_ENDED', {
          itemId: row.id,
          endedAt: now
        })
      })

    } catch (err) {
      console.error('Auction watcher error:', err)
    }
  }, 1000)
}

module.exports = startAuctionWatcher
