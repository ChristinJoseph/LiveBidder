const { auctions, locks } = require('../data/store')
const { withLock } = require('../utils/mutex')

async function placeBid({ itemId, userId, bidAmount }) {
  return withLock(locks, itemId, async () => {
    const item = auctions.get(itemId)

    if (!item || item.status !== 'active') {
      throw { code: 'auction_ended' }
    }

    if (Date.now() >= item.auctionEndTime) {
      item.status = 'ended'
      throw { code: 'auction_ended' }
    }

    if (bidAmount <= item.currentBid) {
      throw { code: 'bid_too_low', currentBid: item.currentBid }
    }

    item.currentBid = bidAmount
    item.currentBidder = userId
    item.bidHistory.push({
      userId,
      bidAmount,
      timestamp: Date.now()
    })

    return item
  })
}

module.exports = { placeBid }
