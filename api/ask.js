// POST /api/ask: stores a visitor's question in a private inbox. Stores only
// { id, question, level, model, part, receivedAt }; the IP is used only, hashed, for the rate limit.
import { validateAsk } from './_lib/validate.js';
import { rateKey, checkRate } from './_lib/rateLimit.js';
import { EARTH } from '../src/content/earth/index.js';

const MAX_BYTES = 2048;
// 'general' = asked with nothing selected
const PART_IDS = { earth: new Set(['general', ...Object.values(EARTH).flatMap((l) => l.parts.map((p) => p.id))]) };
const PREVIEW = /^https:\/\/geohand-[a-z0-9-]+-ibaadsprojects\.vercel\.app$/;

const json = (status, body) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const nope = (status) => json(status, { ok: false, error: status === 429 ? 'Too many questions, try later.' : 'Could not accept that question.' });

export async function handleAsk(request, { store, env, now = Date.now() }) {
  try {
    if (request.method !== 'POST') return nope(405);
    if (!(request.headers.get('content-type') || '').startsWith('application/json')) return nope(415);
    if (!env.RATE_SALT) return nope(500); // fail closed without the rate-limit secret
    const raw = await request.text();
    if (Buffer.byteLength(raw) > MAX_BYTES) return nope(413);
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return nope(400);
    }
    const v = validateAsk(body, {
      origin: request.headers.get('origin'),
      allowedOrigins: (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean),
      previewPattern: env.PREVIEW_ORIGIN_PATTERN ? new RegExp(env.PREVIEW_ORIGIN_PATTERN) : PREVIEW,
      partIds: PART_IDS,
    });
    if (v.bot) return json(200, { ok: true }); // tell bots nothing
    if (!v.ok) return nope(v.status);
    const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    if (!(await checkRate(store, rateKey(ip, env.RATE_SALT, now), now))) return nope(429);
    await store.lpush('inbox', JSON.stringify({ id: crypto.randomUUID(), ...v.value, receivedAt: new Date(now).toISOString() }));
    return json(200, { ok: true });
  } catch {
    return nope(500);
  }
}

export default {
  async fetch(request) {
    const { Redis } = await import('@upstash/redis');
    const env = process.env;
    // the Vercel Marketplace integration may name the variables either way
    const store = new Redis({ url: env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL, token: env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN });
    return handleAsk(request, { store, env });
  },
};
