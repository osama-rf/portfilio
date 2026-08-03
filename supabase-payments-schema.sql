-- ============================================
-- Admin Payment Links Feature — Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================

create table payment_links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  amount numeric(10,2) not null,
  currency text not null default 'SAR',
  moyasar_enabled boolean not null default true,
  tamara_enabled boolean not null default false,
  status text not null default 'pending', -- pending | paid | expired | cancelled
  client_name text,
  paid_at timestamptz,
  payment_gateway text,      -- 'moyasar' | 'tamara'
  gateway_payment_id text,   -- moyasar payment id or tamara order id
  created_at timestamptz default now()
);

create table payment_events (
  id uuid primary key default gen_random_uuid(),
  payment_link_id uuid references payment_links(id) on delete cascade,
  gateway text not null,
  raw_payload jsonb not null,
  created_at timestamptz default now()
);

create index idx_payment_events_link on payment_events(payment_link_id);

alter table payment_links enable row level security;
alter table payment_events enable row level security;
-- No public policies: all access goes through server-side routes using the
-- SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS. Nothing here is reachable
-- via the public anon key.
