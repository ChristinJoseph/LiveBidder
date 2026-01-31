const { placeBid } = require('../services/auctionService')

function auctionSocket(io, socket) {
  socket.on('BID_PLACED', async (data) => {
    try {
      const item = await placeBid(data)

      io.emit('UPDATE_BID', {
        itemId: item.id,
        newBid: item.current_bid,
        bidderId: item.current_bidder
      })
    } catch (err) {
      socket.emit('BID_REJECTED', {
        itemId: data.itemId
      })
    }
  })
}

module.exports = {auctionSocket}
