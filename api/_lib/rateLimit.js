// Per-visitor rate limit without storing IPs: the key is a hash of IP + secret + UTC date, so it rotates daily.
import { createHash } from 'node:crypto';

const PER_HOUR = 5, PER_DAY = 20;

export const rateKey = (ip, salt, now = Date.now()) =>
  createHash('sha256').update(`${ip}|${salt}|${new Date(now).toISOString().slice(0, 10)}`).digest('hex').slice(0, 32);

/** store: anything with incr(key) and expire(key, seconds), e.g. an Upstash Redis client. */
export async function checkRate(store, key, now = Date.now()) {
  const hourKey = `rl:h:${key}:${Math.floor(now / 3600e3)}`, dayKey = `rl:d:${key}`;
  const h = await store.incr(hourKey);
  if (h === 1) await store.expire(hourKey, 3600);
  const d = await store.incr(dayKey);
  if (d === 1) await store.expire(dayKey, 86400);
  return h <= PER_HOUR && d <= PER_DAY;
}
