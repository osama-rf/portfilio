-- ============================================
-- Eid Cards Feature — Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================

-- Creators table: stores each person who creates an Eid card batch
CREATE TABLE eid_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  payment_id TEXT UNIQUE,
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
