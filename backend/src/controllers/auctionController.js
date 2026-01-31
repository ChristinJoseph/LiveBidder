const express = require('express')
const router = express.Router()
const { auctions, locks } = require("../data/store");

// console.log('Auction controller loaded')
/**
 * GET /api/items
 * ----------------
 * Initial hydration endpoint.
 * Client uses this to render dashboard.
 */
router.get('/items', (req, res) => {
  res.json({
    items: [...auctions.values()],
    serverTime: Date.now()
  })
})

/**
 * GET /api/time
 * --------------
 * Lightweight time sync endpoint.
 * Used for clock drift correction.
 */
router.get('/time', (req, res) => {
  res.json({ serverTime: Date.now() })
})

/**
 * POST /api/items
 * ----------------
 * Admin-only endpoint in production.
 * Here kept open for testing.
 */
router.post('/items', (req, res) => {
  const {
    id,
    title,
    description,
    startingPrice,
    auctionEndTime
  } = req.body

  if (!id || !title || !startingPrice || !auctionEndTime) {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  auctions.set(id, {
    id,
    title,
    description,
    startingPrice,
    currentBid: startingPrice,
    currentBidder: null,
    auctionEndTime,
    status: 'active',
    bidHistory: []
  })

  res.status(201).json({ success: true })
})

module.exports = router
