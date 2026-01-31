const express = require('express')
const app = express() 
require("dotenv").config();
const http = require('http')
const cors = require("cors");
const { Server } = require('socket.io')
const PORT = process.env.PORT || 4000;

const initDb = require('./db/initDb')



const auctionRoutes = require('./controllers/auctionController')
const { auctionSocket } = require('./sockets/auctionSocket')
const startAuctionWatcher = require('./services/auctionWatcher')




async function start() {
  await initDb()
  server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
}


start()

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173',
     methods: ["GET", "POST"],
   }
})
// console.log('Registering routes')
app.use(express.json())
app.use('/api', auctionRoutes)

startAuctionWatcher(io)

io.on('connection', (socket) => {
  auctionSocket(io, socket)
})

