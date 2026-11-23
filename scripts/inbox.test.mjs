import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateAsk } from '../api/_lib/validate.js';
import { rateKey, checkRate } from '../api/_lib/rateLimit.js';
import { sendQuestion, browserName } from '../src/ui/ask.js';

const opts = {
  origin: 'https://geohand.vercel.app',
  allowedOrigins: ['https://geohand.vercel.app'],
  previewPattern: /^https:\/\/geohand-[a-z0-9-]+-ibaadsprojects\.vercel\.app$/,
  partIds: { earth: new Set(['cmb']) },
};
const good = { question: 'Why is the CMB so sharp?', level: 'postgrad', model: 'earth', part: 'cmb' };

test('valid question', () => assert.deepEqual(validateAsk(good, opts), { ok: true, value: good }));
test('wrong origin is 403', () => assert.equal(validateAsk(good, { ...opts, origin: 'https://evil.example' }).status, 403));
test('missing origin is 403', () => assert.equal(validateAsk(good, { ...opts, origin: undefined }).status, 403));
test('own preview origin allowed', () => assert.equal(validateAsk(good, { ...opts, origin: 'https://geohand-abc123-ibaadsprojects.vercel.app' }).ok, true));
test('look-alike origin rejected', () => assert.equal(validateAsk(good, { ...opts, origin: 'https://geohand-x.evil.app' }).status, 403));
test('whitespace only rejected', () => assert.equal(validateAsk({ ...good, question: '    ' }, opts).ok, false));
test('too short rejected', () => assert.equal(validateAsk({ ...good, question: 'why' }, opts).ok, false));
test('500 emoji allowed (code points, not UTF-16 units)', () => assert.equal(validateAsk({ ...good, question: '🌍'.repeat(500) }, opts).ok, true));
test('501 code points rejected', () => assert.equal(validateAsk({ ...good, question: '🌍'.repeat(501) }, opts).ok, false));
test('control characters stripped, newline becomes space', () => {
  assert.equal(validateAsk({ ...good, question: 'abc\u0000\u0007de' }, opts).value.question, 'abcde');
  assert.equal(validateAsk({ ...good, question: 'line one\nline two' }, opts).value.question, 'line one line two');
});
test('html stored as inert text', () => assert.equal(validateAsk({ ...good, question: '<script>alert(1)</script>' }, opts).value.question, '<script>alert(1)</script>'));
test('unknown level rejected', () => assert.equal(validateAsk({ ...good, level: 'phd' }, opts).ok, false));
test('unknown part rejected', () => assert.equal(validateAsk({ ...good, part: 'nope' }, opts).ok, false));
test('unknown model rejected', () => assert.equal(validateAsk({ ...good, model: 'moon' }, opts).ok, false));
test('non-string question rejected', () => assert.equal(validateAsk({ ...good, question: { a: 1 } }, opts).ok, false));
test('non-object body rejected', () => assert.equal(validateAsk(null, opts).ok, false));
test('honeypot filled is flagged', () => assert.deepEqual(validateAsk({ ...good, website: 'x' }, opts), { ok: false, status: 400, error: 'honeypot', bot: true }));
test('extra fields dropped', () => assert.equal(validateAsk({ ...good, extra: 'ignored' }, opts).value.extra, undefined));

const fakeStore = () => {
  const m = new Map();
  return { incr: async (k) => m.set(k, (m.get(k) || 0) + 1).get(k), expire: async () => 1 };
};
const T = Date.UTC(2026, 10, 22, 10, 0, 0);
test('5 per hour, then blocked, then allowed next hour', async () => {
  const s = fakeStore();
  for (let n = 0; n < 5; n++) assert.equal(await checkRate(s, 'k', T), true);
  assert.equal(await checkRate(s, 'k', T), false);
  assert.equal(await checkRate(s, 'k', T + 3600e3), true);
});
test('20 per day', async () => {
  const s = fakeStore();
  let ok = 0;
  for (let h = 0; h < 6; h++) for (let n = 0; n < 5; n++) if (await checkRate(s, 'k', T + h * 3600e3)) ok++;
  assert.equal(ok, 20);
});
test('rate key rotates daily and hides the IP', () => {
  assert.notEqual(rateKey('1.2.3.4', 's', T), rateKey('1.2.3.4', 's', T + 86400e3));
  assert.equal(rateKey('1.2.3.4', 's', T), rateKey('1.2.3.4', 's', T + 3600e3));
  assert.ok(!rateKey('1.2.3.4', 's', T).includes('1.2.3.4'));
  assert.equal(rateKey('1.2.3.4', 's', T).length, 32);
});

const reply = (status) => async () => ({ status, json: async () => ({}) });
test('sent', async () => assert.deepEqual(await sendQuestion(good, reply(200)), { ok: true, message: 'Your question has been sent.' }));
test('rate limited', async () =>
  assert.deepEqual(await sendQuestion(good, reply(429)), { ok: false, message: 'You’ve reached the limit for questions and reports. Please try again later.' }));
test('server error keeps the question', async () =>
  assert.deepEqual(await sendQuestion(good, reply(500)), { ok: false, message: 'The question could not be sent. Your text is still here, so you can try again.' }));
test('offline keeps the question', async () => assert.equal((await sendQuestion(good, async () => { throw new TypeError('offline'); })).ok, false));
test('sends JSON POST to /api/ask', async () => {
  let seen;
  await sendQuestion(good, async (url, init) => ((seen = { url, init }), { status: 200 }));
  assert.equal(seen.url, '/api/ask');
  assert.equal(seen.init.method, 'POST');
  assert.equal(seen.init.headers['Content-Type'], 'application/json');
  assert.deepEqual(JSON.parse(seen.init.body), good);
});

// the endpoint itself, with an in-memory store
const { handleAsk } = await import('../api/ask.js');
const memStore = () => {
  const m = new Map(), list = [];
  return { list, incr: async (k) => m.set(k, (m.get(k) || 0) + 1).get(k), expire: async () => 1, lpush: async (k, v) => list.unshift(v) };
};
const env = { RATE_SALT: 'salt', ALLOWED_ORIGINS: 'https://geohand.vercel.app' };
const req = (body, { method = 'POST', origin = 'https://geohand.vercel.app', type = 'application/json', ip = '9.9.9.9' } = {}) =>
  new Request('https://geohand.vercel.app/api/ask', {
    method, body: method === 'GET' ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
    headers: { origin, 'content-type': type, 'x-forwarded-for': `${ip}, 10.0.0.1` },
  });
const call = (r, store = memStore()) => handleAsk(r, { store, env, now: T });

test('endpoint stores a valid question with only the allowed fields', async () => {
  const store = memStore();
  const res = await call(req({ ...good, extra: 'x' }), store);
  assert.equal(res.status, 200);
  const saved = JSON.parse(store.list[0]);
  assert.deepEqual(Object.keys(saved).sort(), ['id', 'level', 'model', 'part', 'question', 'receivedAt']);
  assert.ok(!store.list[0].includes('9.9.9.9'));
});
test('endpoint: GET is 405', async () => assert.equal((await call(req(null, { method: 'GET' }))).status, 405));
test('endpoint: non-JSON is 415', async () => assert.equal((await call(req(good, { type: 'text/plain' }))).status, 415));
test('endpoint: body over 6 KB is 413', async () => assert.equal((await call(req({ ...good, pad: 'x'.repeat(7000) }))).status, 413));
test('endpoint: broken JSON is 400', async () => assert.equal((await call(req('{nope'))).status, 400));
test('endpoint: wrong origin is 403 and nothing stored', async () => {
  const store = memStore();
  assert.equal((await call(req(good, { origin: 'https://evil.example' }), store)).status, 403);
  assert.equal(store.list.length, 0);
});
test('endpoint: honeypot looks like success but stores nothing', async () => {
  const store = memStore();
  assert.equal((await call(req({ ...good, website: 'spam' }), store)).status, 200);
  assert.equal(store.list.length, 0);
});
test('endpoint: 6th question in an hour is 429', async () => {
  const store = memStore();
  const codes = [];
  for (let n = 0; n < 6; n++) codes.push((await call(req(good), store)).status);
  assert.deepEqual(codes, [200, 200, 200, 200, 200, 429]);
  assert.equal(store.list.length, 5);
});
test('endpoint: missing secret fails closed', async () =>
  assert.equal((await handleAsk(req(good), { store: memStore(), env: { ALLOWED_ORIGINS: env.ALLOWED_ORIGINS }, now: T })).status, 500));
test('endpoint: errors reveal nothing internal', async () => {
  const res = await handleAsk(req(good), { store: { incr: async () => { throw new Error('redis password wrong at host x'); } }, env, now: T });
  assert.equal(res.status, 500);
  assert.ok(!(await res.text()).includes('redis'));
});

// The page sends Referrer-Policy: no-referrer, under which a same-origin POST carries Origin: null.
test('client asks the browser to send its real origin', async () => {
  let init;
  await sendQuestion(good, async (_u, i) => ((init = i), { status: 200 }));
  assert.equal(init.referrerPolicy, 'same-origin');
});

// bug reports: same endpoint, kind 'bug', stored in their own list
const bug = { kind: 'bug', report: 'The Earth stays open after I press reset.', level: 'alevel', model: 'earth', part: 'cmb', input: 'mouse', view: 'layers', activity: 'explore', browser: 'Chrome 131 on Windows', screen: '1920x1080' };
test('valid bug report', () => {
  const { kind, model, ...rest } = bug;
  assert.deepEqual(validateAsk(bug, opts), { ok: true, value: { kind: 'bug', ...rest } });
});
test('bug report under 10 characters rejected', () => assert.equal(validateAsk({ ...bug, report: 'broken' }, opts).ok, false));
test('bug report up to 1000 code points allowed, 1001 rejected', () => {
  assert.equal(validateAsk({ ...bug, report: '🐛'.repeat(1000) }, opts).ok, true);
  assert.equal(validateAsk({ ...bug, report: '🐛'.repeat(1001) }, opts).ok, false);
});
test('bug report context is checked', () => {
  assert.equal(validateAsk({ ...bug, input: 'keyboard' }, opts).ok, false);
  assert.equal(validateAsk({ ...bug, activity: 'hacking' }, opts).ok, false);
  assert.equal(validateAsk({ ...bug, view: '<img src=x>' }, opts).ok, false);
  assert.equal(validateAsk({ ...bug, browser: 'x'.repeat(61) }, opts).ok, false);
  assert.equal(validateAsk({ ...bug, screen: 'big' }, opts).ok, false);
});
test('unknown kind rejected', () => assert.equal(validateAsk({ ...good, kind: 'praise' }, opts).ok, false));
test('endpoint stores a bug report in its own list, without the IP', async () => {
  const store = memStore();
  store.lists = {};
  store.lpush = async (k, v) => (store.lists[k] ||= []).unshift(v);
  assert.equal((await call(req(bug), store)).status, 200);
  assert.equal(store.lists.inbox, undefined);
  const saved = JSON.parse(store.lists.bugs[0]);
  assert.deepEqual(Object.keys(saved).sort(), ['activity', 'browser', 'id', 'input', 'level', 'part', 'receivedAt', 'report', 'screen', 'view']);
  assert.ok(!store.lists.bugs[0].includes('9.9.9.9'));
});
test('bug reports share the hourly limit with questions', async () => {
  const store = memStore();
  const codes = [];
  for (let n = 0; n < 6; n++) codes.push((await call(req(n % 2 ? bug : good), store)).status);
  assert.deepEqual(codes, [200, 200, 200, 200, 200, 429]);
});
test('report messages', async () => {
  assert.deepEqual(await sendQuestion(bug, reply(200)), { ok: true, message: 'Thanks, your report has been sent.' });
  assert.equal((await sendQuestion(bug, reply(500))).message, 'The report could not be sent. Your text is still here, so you can try again.');
});
test('browser name is coarse', () => {
  assert.equal(browserName('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Safari/537.36'), 'Chrome 131 on Windows');
  assert.equal(browserName('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.2903.70'), 'Edge 131 on Windows');
  assert.equal(browserName('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0'), 'Firefox 133 on macOS');
  assert.equal(browserName('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15'), 'Safari 18 on macOS');
  assert.equal(browserName('curl/8.0'), 'Other browser');
});
