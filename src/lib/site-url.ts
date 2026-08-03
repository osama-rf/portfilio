// PUBLIC_APP_URL in .env may be given without a scheme (e.g. "localhost:4321").
export function getAppUrl(): string {
  const raw = (import.meta.env.PUBLIC_APP_URL ?? "").trim().replace(/\/+$/, "");
  if (!raw) return "http://localhost:4321";
  return /^https?:\/\//.test(raw) ? raw : `http://${raw}`;
}
