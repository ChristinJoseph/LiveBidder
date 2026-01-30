const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const auctionRoutes = require('./controllers/auctionController')
const auctionSocket = require('./sockets/auctionSocket')
const startAuctionWatcher = require('./services/auctionWatcher')

const app = express() 
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*' }
})
// console.log('Registering routes')
app.use(express.json())
app.use('/api', auctionRoutes)

startAuctionWatcher(io)

io.on('connection', (socket) => {
  auctionSocket(io, socket)
})

server.listen(4000, () => {
  console.log('Auction server running on port 4000')
})
