-- ============================================
-- Eid Cards Feature — Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================

-- Creators table: stores each person who creates an Eid card batch
CREATE TABLE eid_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipients table: stores each recipient card in a batch
CREATE TABLE eid_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES eid_creators(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  coupon_code TEXT NOT NULL,
  coupon_type TEXT NOT NULL,
  coupon_description TEXT NOT NULL,
  opened BOOLEAN DEFAULT FALSE,
  opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup by batch (creator)
CREATE INDEX idx_eid_recipients_creator ON eid_recipients(creator_id);

-- ============================================
-- Row Level Security (RLS)
-- Enable in Supabase dashboard > Table Editor > RLS
-- then run these policies:
-- ============================================

ALTER TABLE eid_creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE eid_recipients ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a new creator (public API)
CREATE POLICY "allow insert creators"
  ON eid_creators FOR INSERT
  WITH CHECK (true);

-- Anyone can read creators (to show display_name on envelope wall)
CREATE POLICY "allow read creators"
  ON eid_creators FOR SELECT
  USING (true);

-- Anyone can insert recipients (called from server API route)
CREATE POLICY "allow insert recipients"
  ON eid_recipients FOR INSERT
  WITH CHECK (true);

-- Anyone can read recipients (to render envelope wall)
CREATE POLICY "allow read recipients"
  ON eid_recipients FOR SELECT
  USING (true);

-- Anyone can update opened status (called from server API route)
CREATE POLICY "allow update opened"
  ON eid_recipients FOR UPDATE
  USING (true)
  WITH CHECK (true);
