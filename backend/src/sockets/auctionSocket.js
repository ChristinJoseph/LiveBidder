const { placeBid } = require('../services/auctionService')

function auctionSocket(io, socket) {
  socket.on('BID_PLACED', async (data) => {
    try {
      const item = await placeBid(data)

      io.emit('UPDATE_BID', {
        itemId: item.id,
        newBid: item.currentBid,
        bidderId: item.currentBidder,
        serverTime: Date.now()
      })
    } catch (err) {
      socket.emit('BID_REJECTED', {
        itemId: data.itemId,
        reason: err.code,
        currentBid: err.currentBid
      })
    }
  })
}

module.exports = {auctionSocket}
