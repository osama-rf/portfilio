/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    adminUser?: import("@supabase/supabase-js").User;
  }
}