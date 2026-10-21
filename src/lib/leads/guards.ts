import "server-only";

/**
 * Lightweight, in-memory abuse protection.
 *
 * On serverless platforms each instance has its own memory, so these limits are
 * best-effort. For stronger protection add a shared store (e.g. Upstash Redis)
 * or a CAPTCHA such as Cloudflare Turnstile in a later phase.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MIN_FILL_TIME_MS = 2500;

const hits = new Map<string, number[]>();
const completed = new Map<string, number>();

function prune(now: number) {
  for (const [key, times] of hits) {
    const recent = times.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) hits.delete(key);
    else hits.set(key, recent);
  }
  for (const [id, at] of completed) {
    if (now - at > WINDOW_MS) completed.delete(id);
  }
}

export function clientKey(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}

/** Returns true if the caller is over the limit. Records the attempt otherwise. */
export function isRateLimited(key: string, now = Date.now()) {
  prune(now);
  const times = hits.get(key) ?? [];
  if (times.length >= MAX_REQUESTS_PER_WINDOW) return true;
  times.push(now);
  hits.set(key, times);
  return false;
}

export function looksAutomated(input: { website?: unknown; elapsedMs?: unknown }) {
  if (typeof input.website === "string" && input.website.trim() !== "") return true;
  if (typeof input.elapsedMs === "number" && input.elapsedMs < MIN_FILL_TIME_MS) return true;
  return false;
}

export function wasAlreadyDelivered(submissionId: string | undefined) {
  return Boolean(submissionId && completed.has(submissionId));
}

export function markDelivered(submissionId: string | undefined, now = Date.now()) {
  if (submissionId) completed.set(submissionId, now);
}
