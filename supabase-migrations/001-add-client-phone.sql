-- Run this in your Supabase SQL editor (project already has payment_links table)
alter table payment_links add column if not exists client_phone text;
