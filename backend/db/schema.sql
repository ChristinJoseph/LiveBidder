CREATE TABLE IF NOT EXISTS auction_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  starting_price INTEGER NOT NULL,
  current_bid INTEGER NOT NULL,
  current_bidder TEXT,
  auction_end_time BIGINT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS bids (
  id SERIAL PRIMARY KEY,
  item_id TEXT NOT NULL REFERENCES auction_items(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  bid_amount INTEGER NOT NULL,
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_auction_end_time
ON auction_items (auction_end_time);

CREATE INDEX IF NOT EXISTS idx_bids_item_id
ON bids (item_id);
