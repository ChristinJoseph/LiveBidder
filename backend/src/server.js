require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const initDb = require("./db/initDb");
const auctionRoutes = require("./controllers/auctionController");
const { auctionSocket } = require("./sockets/auctionSocket");
const startAuctionWatcher = require("./services/auctionWatcher");

const app = express();
const server = http.createServer(app);


const allowedOrigins = [
  "https://live-bidder-94ht.vercel.app",
   "http://localhost:5173" 
];

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

/* -------------------- ROUTES -------------------- */
app.use("/api", auctionRoutes);

app.get("/", (req, res) => {
  res.send("Auction backend running");
});

/* -------------------- SOCKET.IO -------------------- */
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  auctionSocket(io, socket);
});

/* -------------------- SERVICES -------------------- */
startAuctionWatcher(io);

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await initDb();
    server.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
