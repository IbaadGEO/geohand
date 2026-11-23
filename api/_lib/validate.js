// Validates a visitor question before it is stored. Trust boundary: everything in `body` is attacker-controlled.
import { LEVEL_IDS } from '../../src/content/levels.js';

const LIMITS = { question: [5, 500], bug: [10, 1000] }; // characters (code points) after trimming
const CONTROL = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F]/g;
const INPUTS = ['hands', 'mouse'];
const ACTIVITIES = ['explore', 'lesson', 'tour', 'mission', 'drill', 'intro'];
const VIEW = /^[a-z-]{1,20}$/, BROWSER = /^[A-Za-z0-9 .]{1,60}$/, SCREEN = /^\d{2,5}x\d{2,5}$/;

/** Visitor text with newlines as spaces and control characters removed, if its length is within [min, max]. */
function clean(text, [min, max]) {
  if (typeof text !== 'string') return null;
  const t = text.replace(/\n/g, ' ').replace(CONTROL, '').trim();
  const len = [...t].length;
  return len >= min && len <= max ? t : null;
}

export function validateAsk(body, { origin, allowedOrigins, previewPattern, partIds }) {
  const fail = (status, error) => ({ ok: false, status, error });
  if (!origin || !(allowedOrigins.includes(origin) || previewPattern.test(origin))) return fail(403, 'origin');
  if (!body || typeof body !== 'object' || Array.isArray(body)) return fail(400, 'body');
  if (body.website) return { ...fail(400, 'honeypot'), bot: true };
  const { kind = 'question', level, model, part } = body;
  if (!Object.hasOwn(LIMITS, kind)) return fail(400, 'kind');
  const text = clean(kind === 'bug' ? body.report : body.question, LIMITS[kind]);
  if (text === null) return fail(400, 'length');
  if (!LEVEL_IDS.includes(level)) return fail(400, 'level');
  if (typeof model !== 'string' || !Object.hasOwn(partIds, model) || !partIds[model].has(part)) return fail(400, 'part');
  if (kind === 'question') return { ok: true, value: { question: text, level, model, part } };
  const { input, view, activity, browser, screen } = body;
  if (!INPUTS.includes(input) || !ACTIVITIES.includes(activity)) return fail(400, 'context');
  if (![[VIEW, view], [BROWSER, browser], [SCREEN, screen]].every(([re, v]) => typeof v === 'string' && re.test(v))) return fail(400, 'context');
  return { ok: true, value: { kind, report: text, level, part, input, view, activity, browser, screen } };
}
