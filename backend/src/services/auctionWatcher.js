const { auctions } = require('../data/store')

function startAuctionWatcher(io) {
  setInterval(() => {
    const now = Date.now()

    for (const auction of auctions.values()) {

      if (auction.status !== 'active') continue
      if (now >= auction.auctionEndTime) {
        auction.status = 'ended'

        io.emit('AUCTION_ENDED', {
          itemId: auction.id,
          endedAt: now
        })
      }
    }
  }, 1000)
}

module.exports = startAuctionWatcher
