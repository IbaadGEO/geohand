// Validates a visitor question before it is stored. Trust boundary: everything in `body` is attacker-controlled.
import { LEVEL_IDS } from '../../src/content/levels.js';

const MIN = 5, MAX = 500; // characters (code points) after trimming
const CONTROL = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F]/g;

export function validateAsk(body, { origin, allowedOrigins, previewPattern, partIds }) {
  const fail = (status, error) => ({ ok: false, status, error });
  if (!origin || !(allowedOrigins.includes(origin) || previewPattern.test(origin))) return fail(403, 'origin');
  if (!body || typeof body !== 'object' || Array.isArray(body)) return fail(400, 'body');
  if (body.website) return { ...fail(400, 'honeypot'), bot: true };
  const { question, level, model, part } = body;
  if (typeof question !== 'string') return fail(400, 'question');
  const q = question.replace(/\n/g, ' ').replace(CONTROL, '').trim();
  const len = [...q].length;
  if (len < MIN || len > MAX) return fail(400, 'length');
  if (!LEVEL_IDS.includes(level)) return fail(400, 'level');
  if (typeof model !== 'string' || !Object.hasOwn(partIds, model) || !partIds[model].has(part)) return fail(400, 'part');
  return { ok: true, value: { question: q, level, model, part } };
}
