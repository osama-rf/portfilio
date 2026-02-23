export interface Coupon {
  code: string;
  type: string;
  description: string;
}

// Load coupons from the public JSON file.
// In a real setup this could come from a CMS or Supabase.
let _coupons: Coupon[] | null = null;

export async function getCoupons(): Promise<Coupon[]> {
  if (_coupons) return _coupons;
  // In server context we read the file directly
  const { readFileSync } = await import("fs");
  const { join } = await import("path");
  const filePath = join(process.cwd(), "public", "coupons.json");
  _coupons = JSON.parse(readFileSync(filePath, "utf-8")) as Coupon[];
  return _coupons;
}

export async function getRandomCoupon(): Promise<Coupon> {
  const coupons = await getCoupons();
  return coupons[Math.floor(Math.random() * coupons.length)];
}
