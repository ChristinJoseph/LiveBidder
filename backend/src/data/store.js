module.exports = {
  auctions: new Map(),   // itemId → AuctionItem
  locks: new Map()       // itemId → Promise queue
}