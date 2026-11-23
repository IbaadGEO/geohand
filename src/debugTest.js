// Guided gesture test, loaded only with ?debug in the URL.
// Prompts each gesture on screen, samples the app state every frame, then shows a results table you can copy.
// "Save recording" downloads the per-camera-frame hand measurements (no images) so a session can be replayed offline.

// calm: no command may fire. want: the commands that should fire, exactly. end(g, step): what must be true when the step ends
// (step.start holds the opening and zoom when it began, or at startAt seconds in, once the hands have changed pose; step.peak is the largest zoom seen). open: the step starts with the Earth opened, so it does not depend
// on an earlier step having worked.
const STEPS = [
  { id: 'ENTER', say: '☝️ Bring your hand in, pointing at the Earth', s: 8, reset: true, calm: true },
  { id: 'MOVE', say: '✋ Open hand: move it around to turn the Earth', s: 8, calm: true, ok: ['MOVE'] },
  { id: 'RELAX', say: '🖐 Relaxed, loose hand (no pose)', s: 6, calm: true },
  { id: 'PEACE', say: '✌️ Peace, hold still till the ring fills, drop it. 3 times', s: 14, reset: true, want: { PEACE: 3 }, end: (g) => g.sel >= 0 },
  { id: 'FIST', say: '✊ Make a fist, open, fist again (nothing should happen)', s: 6, calm: true },
  { id: 'TWO', say: '🙌 Two open hands a hand-width apart, pull to shoulder width (keep both in view)', s: 6, reset: true, ok: ['TWO'], calm: true, end: (g) => g.explode > 0.5 },
  { id: 'OPEN1', say: '☝️ Point at the closed Earth and hold until it opens', s: 6, reset: true, calm: true, end: (g) => g.explode > 0.5 },
  { id: 'PICK', say: '☝️ Point at the outer core and hold until it is picked', s: 8, calm: true, open: true, end: (g) => g.parts[g.sel]?.id === 'outer-core' },
  { id: 'ZOOM', say: '🤜🤛 Two fists a hand-width apart, move them to shoulder width', s: 6, ok: ['ZOOM'], calm: true, end: (g, st) => st.peak > 1.2 }, // reached: zoom follows the hands back in, which is right
  { id: 'MIXED', say: '✋✊ One open hand and one fist, move them apart (nothing should move)', s: 6, calm: true,
    end: (g, st) => Math.abs(g.explode - st.start.explode) < 0.05 && Math.abs(g.scale - st.start.scale) < 0.05 },
  { id: 'RESET', say: '☝️ Point at “Put Earth back together” and hold', s: 6, open: true, want: { RESET: 1 }, end: (g) => g.isolated < 0 && g.sel < 0 && g.scale === 1 },
];
const READY = 5; // countdown before the first step (s)
const SETTLE = 1; // ignore the first second of each step while the hand changes pose
const DOWN_S = 0.5, DOWN_MAX = 8; // hands out of view this long before each step starts (s); it starts anyway after DOWN_MAX

const css = (el, s) => Object.assign(el.style, s);
const pct = (n, d) => (d ? Math.round((100 * n) / d) : 0);
const median = (a) => {
  const s = a.filter((v) => v != null).sort((x, y) => x - y);
  return s.length ? +s[s.length >> 1].toFixed(2) : null;
};

/** get() returns { gesture, hover, sel, model, level, fired, hold, parts, hands, tracking, isolated, explode, scale, frameTime, aspect, aim }
 * from main.js; restore(step) puts every part back, clears the selection and closes the Earth (opens it for steps marked open). */
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
  let lastFrame = null, seen = get().fired.length;
  STEPS.forEach((s) => (delete s.endOk, delete s.notClear));
  const r4 = (v) => (v == null ? null : Math.round(v * 1e4) / 1e4);
  const t0 = performance.now() + READY * 1000;
  // before each step the hands go down, so no pose or half-done pull carries over from the step before
  let i = 0, phase = 'down', since = 0, clear = -1;
  cue.style.display = 'block';
  const tick = () => {
    const t = (performance.now() - t0) / 1000;
    if (t < 0) {
      cue.textContent = `Get ready  ${Math.ceil(-t)}`;
      seen = get().fired.length;
      return requestAnimationFrame(tick);
    }
    let step = STEPS[i], g = get();
    if (phase === 'step' && t - since >= step.s) {
      if (step.end) step.endOk = step.end(g, step);
      i++;
      phase = 'down';
      since = t;
      clear = -1;
      if (i === STEPS.length) {
        cue.style.display = 'none';
        return done(report(samples, events), frames);
      }
      step = STEPS[i];
    }
    if (phase === 'down') {
      clear = g.hands.length ? -1 : clear < 0 ? t : clear;
      if (!((clear >= 0 && t - clear >= DOWN_S) || t - since >= DOWN_MAX)) {
        cue.textContent = '👇 Hands down';
        seen = g.fired.length; // commands while the hands drop are not graded
        return requestAnimationFrame(tick);
      }
      phase = 'step';
      step.notClear = clear < 0; // started after DOWN_MAX with a hand still in view
      since = t;
      if (step.reset || step.open) restore(step);
      step.start = null;
      step.peak = 0;
      g = get();
    }
    const tin = t - since;
    cue.textContent = `${step.say}  ${Math.ceil(step.s - tin)}`;
    step.peak = Math.max(step.peak, g.scale);
    if (!step.start && tin >= (step.startAt || 0)) step.start = { explode: g.explode, scale: g.scale };
    for (; seen < g.fired.length; seen++) events.push({ step: step.id, g: g.fired[seen].g, t: +t.toFixed(2) });
    samples.push({ step: step.id, tin, n: g.hands.length, gesture: g.gesture, m: g.hands[0]?.metrics });
    if (g.frameTime !== lastFrame) {
      lastFrame = g.frameTime;
      const h = g.hands[0];
      frames.push({ t: r4(t), step: step.id, n: g.hands.length, g: h?.gesture ?? null, act: g.gesture, hold: r4(g.hold),
        gap: r4(h?.metrics?.thumbGap), r: h?.metrics?.ratios.map(r4) ?? null, open: r4(h?.openness),
        x: r4(h?.palm.x), y: r4(h?.palm.y), id: h?.id ?? null, iso: g.isolated, sel: g.sel, nf: g.fired.length, aspect: r4(g.aspect),
        g2: g.hands[1]?.gesture ?? null, open2: r4(g.hands[1]?.openness), x2: r4(g.hands[1]?.palm.x), y2: r4(g.hands[1]?.palm.y),
        explode: r4(g.explode), scale: r4(g.scale), tx: r4(h?.tip.x), ty: r4(h?.tip.y), aim: g.aim });
    }
    requestAnimationFrame(tick);
  };
  tick();
}

function report(samples, events) {
  const out = { when: new Date().toISOString(), steps: {} };
  for (const st of STEPS) {
    const rows = samples.filter((s) => s.step === st.id);
    // the hands start each step down: count from when the hands the step needs are all in view
    const need = (st.ok || []).some((g) => g === 'TWO' || g === 'ZOOM') ? 2 : 1;
    const from = (rows.find((s) => s.n >= need)?.tin ?? 0) + SETTLE;
    const settled = rows.filter((s) => s.tin >= from);
    const secs = Math.max(1, st.s - from);
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
    if (st.notClear) r.notClear = true;
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
  if (r.notClear) return false; // a pose may have carried over, so the step is not a fair test
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
    if (r.notClear) notes.push('started with a hand still in view');
    const other = Object.entries(r.seen).filter(([g]) => !(st.ok || []).includes(g)).sort((a, b) => b[1] - a[1]).slice(0, 2);
    if (other.length) notes.push('seen: ' + other.map(([g, p]) => `${g} ${p}%`).join(', '));
    const score = r.recognisedPct != null ? `${r.recognisedPct}%` : '';
    return `<tr><td>${verdict(id, r) ? '✅' : '❌'} ${id}</td><td>${score}</td><td>${r.firstHitS ?? ''}</td><td>${esc(notes.join(' · '))}</td></tr>`;
  });
  return `<table style="border-collapse:collapse;width:100%"><tr style="text-align:left;opacity:.7"><th>Step</th><th>Recognised</th><th>1st hit s</th><th>Notes</th></tr>${rows.join('')}</table><div style="opacity:.6;margin-top:6px">Pass: calm steps fire nothing, command steps fire exactly what was asked, ≥80% recognised where shown.</div>`;
}
