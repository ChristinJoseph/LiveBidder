const express = require('express')
const router = express.Router()
const { auctions, locks } = require("../data/store");
const db = require('../config/db');

// console.log('Auction controller loaded')
/**
 * GET /api/items
 * ----------------
 * Initial hydration endpoint.
 * Client uses this to render dashboard.
 */
router.get('/items', async (req, res) => {
  const result = await db.query(`
    SELECT
      id,
      title,
      description,
      current_bid,
      current_bidder,
      auction_end_time,
      status
    FROM auction_items
    ORDER BY auction_end_time
  `)

  res.json({
    items: result.rows,
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
router.post('/items', async (req, res) => {
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

  try {
    // Insert into database
    await db.query(
      `INSERT INTO auction_items (id, title, description, starting_price, current_bid, auction_end_time, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, title, description, startingPrice, startingPrice, auctionEndTime, 'active']
    )

    // Also keep in memory for fast reads
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
  } catch (err) {
    console.error('Error creating auction item:', err)
    res.status(500).json({ error: 'Failed to create auction item' })
  }
})

module.exports = router
