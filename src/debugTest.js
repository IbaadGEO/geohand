// Guided gesture test, loaded only with ?debug in the URL.
// Prompts each gesture on screen, samples the app state every frame, then shows a results table you can copy.
// "Save recording" downloads the per-camera-frame hand measurements (no images) so a session can be replayed offline.

// calm: no command may fire. want: the commands that should fire, exactly. end: what must be true when the step ends.
const STEPS = [
  { id: 'ENTER', say: '🙈 Hide your hand, then bring it in ☝️ pointing at the Earth', s: 8, reset: true, calm: true },
  { id: 'POINT_PINCH', say: '☝️🤏 Point and pinch around, as if picking a layer', s: 8, calm: true },
  { id: 'MOVE', say: '✋ Open hand: move it around to turn the Earth', s: 8, calm: true, ok: ['MOVE'] },
  { id: 'RELAX', say: '🖐 Relaxed, loose hand (no pose)', s: 6, calm: true },
  { id: 'PEACE', say: '✌️ Peace, hold still till the ring fills, drop it. 3 times', s: 14, reset: true, want: { PEACE: 3 }, end: (g) => g.sel >= 0 },
  { id: 'FIST', say: '✊ Make a fist, open, fist again (nothing should happen)', s: 6, calm: true },
  { id: 'TWO', say: '🙌 Two open hands: start close, pull them wide apart', s: 6, ok: ['TWO'], calm: true, end: (g) => g.explode > 0.5 },
  { id: 'ZOOM', say: '🤜🤛 Two fists: start close, move them apart', s: 6, ok: ['ZOOM'], calm: true, end: (g) => g.scale > 1.2 },
  { id: 'RESET', say: '✊✊ Two fists, hold still till the ring fills', s: 6, want: { RESET: 1 }, end: (g) => g.isolated < 0 && g.sel < 0 && g.scale === 1 },
];
const READY = 5; // countdown before the first step (s)
const SETTLE = 1; // ignore the first second of each step while the hand changes pose

const css = (el, s) => Object.assign(el.style, s);
const pct = (n, d) => (d ? Math.round((100 * n) / d) : 0);
const median = (a) => {
  const s = a.filter((v) => v != null).sort((x, y) => x - y);
  return s.length ? +s[s.length >> 1].toFixed(2) : null;
};

/** get() returns { gesture, hover, sel, model, level, fired, hold, parts, hands, tracking, isolated, explode, scale, frameTime, aspect }
 * from main.js; restore() puts every part back and clears the selection. */
export function mount(get, restore) {
  const panel = document.createElement('div');
  css(panel, { position: 'fixed', right: '16px', bottom: '72px', zIndex: 9999, maxWidth: 'min(560px, calc(100vw - 32px))', maxHeight: '60vh', overflow: 'auto', padding: '12px 14px', borderRadius: '12px', background: 'rgba(12,12,22,0.92)', color: '#eee', font: '13px ui-sans-serif, system-ui, sans-serif' });
  panel.innerHTML = '<b>Gesture test</b> <span style="opacity:.7">(?debug)</span><br><button id="dbg-run">Run test</button> <button id="dbg-copy" disabled>Copy results</button> <button id="dbg-save" disabled>Save recording</button><div id="dbg-out" style="margin-top:8px"></div>';
  document.body.appendChild(panel);
  // the app styles plain buttons for its toolbar; give these their own look
  panel.querySelectorAll('button').forEach((b) => css(b, { all: 'unset', cursor: 'pointer', marginTop: '6px', marginRight: '6px', padding: '5px 12px', borderRadius: '8px', background: '#f2c94c', color: '#111', fontWeight: '600' }));
  const cue = document.createElement('div');
  css(cue, { position: 'fixed', top: '18px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, padding: '14px 26px', borderRadius: '14px', background: 'rgba(242,201,76,0.95)', color: '#111', font: '700 28px system-ui, sans-serif', pointerEvents: 'none', display: 'none' });
  document.body.appendChild(cue);

  let last = null, recording = null;
  panel.querySelector('#dbg-save').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(recording)], { type: 'application/json' }));
    a.download = 'geohand-gesture-recording.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  panel.querySelector('#dbg-run').onclick = () => {
    if (get().tracking !== 'Hands on') return (panel.querySelector('#dbg-out').textContent = 'Start the camera first, then run the test.');
    run(get, restore, cue, (res, frames) => {
      last = res;
      recording = { ...res, frames };
      panel.querySelector('#dbg-out').innerHTML = table(res);
      panel.querySelector('#dbg-copy').disabled = false;
      panel.querySelector('#dbg-save').disabled = false;
    });
  };
  panel.querySelector('#dbg-copy').onclick = async () => {
    const text = JSON.stringify(last, null, 1);
    try {
      await navigator.clipboard.writeText(text);
      panel.querySelector('#dbg-copy').textContent = 'Copied';
    } catch {
      console.log(text);
      panel.querySelector('#dbg-copy').textContent = 'Copy failed, see console';
    }
  };
}

function run(get, restore, cue, done) {
  const samples = [], frames = [], events = [];
  let stepNow = null, lastFrame = null, seen = get().fired.length;
  STEPS.forEach((s) => delete s.endOk);
  const r4 = (v) => (v == null ? null : Math.round(v * 1e4) / 1e4);
  const t0 = performance.now() + READY * 1000;
  const total = STEPS.reduce((s, x) => s + x.s, 0);
  cue.style.display = 'block';
  const tick = () => {
    const t = (performance.now() - t0) / 1000;
    if (t < 0) {
      cue.textContent = `Get ready, hand in view  ${Math.ceil(-t)}`;
      seen = get().fired.length;
      return requestAnimationFrame(tick);
    }
    if (t >= total) {
      cue.style.display = 'none';
      return done(report(samples, events), frames);
    }
    let a = 0;
    const step = STEPS.find((s) => (a += s.s) > t);
    const tin = t - (a - step.s);
    cue.textContent = `${step.say}  ${Math.ceil(step.s - tin)}`;
    if (step !== stepNow) {
      if (stepNow?.end) stepNow.endOk = stepNow.end(get());
      stepNow = step;
      if (step.reset) restore();
    }
    const g = get();
    for (; seen < g.fired.length; seen++) events.push({ step: step.id, g: g.fired[seen].g, t: +t.toFixed(2) });
    samples.push({ step: step.id, tin, gesture: g.gesture, sel: g.sel, hands: g.hands.length, m: g.hands[0]?.metrics, isolated: g.isolated, part: (i) => g.parts[i]?.name });
    if (g.frameTime !== lastFrame) {
      lastFrame = g.frameTime;
      const h = g.hands[0];
      frames.push({ t: r4(t), step: step.id, n: g.hands.length, g: h?.gesture ?? null, act: g.gesture, hold: r4(g.hold),
        gap: r4(h?.metrics?.thumbGap), r: h?.metrics?.ratios.map(r4) ?? null, open: r4(h?.openness),
        x: r4(h?.palm.x), y: r4(h?.palm.y), id: h?.id ?? null, iso: g.isolated, sel: g.sel, nf: g.fired.length, aspect: r4(g.aspect) });
    }
    requestAnimationFrame(tick);
  };
  tick();
}

function report(samples, events) {
  const out = { when: new Date().toISOString(), steps: {} };
  for (const st of STEPS) {
    const rows = samples.filter((s) => s.step === st.id);
    const settled = rows.filter((s) => s.tin >= SETTLE);
    const secs = st.s - SETTLE;
    const r = {};
    if (st.ok) {
      r.recognisedPct = pct(settled.filter((s) => st.ok.includes(s.gesture)).length, settled.length);
      const hit = rows.find((s) => st.ok.includes(s.gesture));
      r.firstHitS = hit ? +hit.tin.toFixed(1) : null;
    }
    r.gestureChangesPerS = +(settled.filter((s, i) => i && s.gesture !== settled[i - 1].gesture).length / secs).toFixed(1);
    const mix = {};
    settled.forEach((s) => (mix[s.gesture || '-'] = (mix[s.gesture || '-'] || 0) + 1));
    r.seen = Object.fromEntries(Object.entries(mix).map(([k, v]) => [k, pct(v, settled.length)]));
    const ms = settled.map((s) => s.m).filter(Boolean);
    if (ms.length) r.medianRatios = [0, 1, 2, 3].map((i) => median(ms.map((m) => m.ratios[i])));
    r.fired = {};
    for (const e of events.filter((e) => e.step === st.id)) r.fired[e.g] = (r.fired[e.g] || 0) + 1;
    r.firedAt = events.filter((e) => e.step === st.id).map((e) => `${e.g}@${e.t}`);
    if (st.want) r.wanted = st.want;
    if (st.end) r.endOk = Boolean(st.endOk);
    out.steps[st.id] = r;
  }
  return out;
}

// Suggested targets, not a standard: adjust as you learn what feels right
function verdict(id, r) {
  const st = STEPS.find((s) => s.id === id);
  const fired = Object.values(r.fired).reduce((a, b) => a + b, 0);
  if (st.calm && fired) return false;
  if (st.want && (fired !== Object.values(st.want).reduce((a, b) => a + b, 0) || Object.entries(st.want).some(([g, n]) => r.fired[g] !== n))) return false;
  if (st.end && !r.endOk) return false;
  if (st.ok && r.recognisedPct < 80) return false;
  return true;
}

function table(res) {
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
  const rows = Object.entries(res.steps).map(([id, r]) => {
    const st = STEPS.find((s) => s.id === id);
    const notes = [];
    const fired = Object.entries(r.fired).map(([g, n]) => `${g} ×${n}`).join(', ') || 'nothing';
    notes.push(st.want ? `fired ${fired} (wanted ${Object.entries(st.want).map(([g, n]) => `${g} ×${n}`).join(', ')})` : `fired ${fired}`);
    if (st.end) notes.push(r.endOk ? 'end state ok' : 'end state wrong');
    const other = Object.entries(r.seen).filter(([g]) => !(st.ok || []).includes(g)).sort((a, b) => b[1] - a[1]).slice(0, 2);
    if (other.length) notes.push('seen: ' + other.map(([g, p]) => `${g} ${p}%`).join(', '));
    const score = r.recognisedPct != null ? `${r.recognisedPct}%` : '';
    return `<tr><td>${verdict(id, r) ? '✅' : '❌'} ${id}</td><td>${score}</td><td>${r.firstHitS ?? ''}</td><td>${esc(notes.join(' · '))}</td></tr>`;
  });
  return `<table style="border-collapse:collapse;width:100%"><tr style="text-align:left;opacity:.7"><th>Step</th><th>Recognised</th><th>1st hit s</th><th>Notes</th></tr>${rows.join('')}</table><div style="opacity:.6;margin-top:6px">Pass: calm steps fire nothing, command steps fire exactly what was asked, ≥80% recognised where shown.</div>`;
}
