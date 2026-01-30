function createAuctionItem({
  id,
  title,
  description,
  startingPrice,
  auctionEndTime
}) {
  return {
    id,
    title,
    description,
    startingPrice,
    currentBid: startingPrice,
    currentBidder: null,
    auctionEndTime,
    status: 'active',
    bidHistory: []
  }
}

module.exports = { createAuctionItem }