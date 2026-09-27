const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

type Bucket = number[];

const buckets = new Map<string, Bucket>();

export function resolveClientIp(forwardedFor: string | null, realIp: string | null): string {
  const fromForwarded = forwardedFor?.split(",")[0]?.trim();
  if (fromForwarded) return fromForwarded;
  if (realIp?.trim()) return realIp.trim();
  return "unknown";
}

/** In-memory limiter — best-effort on serverless (per instance). */
export function checkContactRateLimit(clientKey: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const hits = buckets.get(clientKey) ?? [];
  const recent = hits.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0] ?? now;
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  recent.push(now);
  buckets.set(clientKey, recent);
  return { allowed: true };
}

export function resetContactRateLimitForTests() {
  buckets.clear();
}
