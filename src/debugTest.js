// Guided gesture test, loaded only with ?debug in the URL.
// Prompts each gesture on screen, samples the app state every frame, then shows a results table you can copy.

const STEPS = [
  { id: 'OPEN', say: '✋ Open palm, hold still', s: 6, ok: ['OPEN'] },
  { id: 'FIST', say: '✊ Fist', s: 6, ok: ['FIST'] },
  { id: 'MOVE', say: '👋 Open hand, move it around', s: 6, ok: ['OPEN', 'MOVE'] },
  { id: 'SWEEP', say: '☝️ Point up, sweep slowly across the parts', s: 8, ok: ['POINT'] },
  { id: 'AIM', say: '☝️ Point up, hold over ONE part', s: 6, ok: ['POINT'] },
  { id: 'PINCH', say: '🤏 Pinch it and drag', s: 6, ok: ['PINCH'] },
  { id: 'RELAX', say: '🖐 Relaxed, loose hand (no pose)', s: 6, bad: ['POINT', 'PINCH'] },
  { id: 'PEACE', say: '✌️ Peace sign, hold it', s: 6, ok: ['PEACE'] },
  { id: 'TWO', say: '🙌 Two hands, apart and together', s: 6, ok: ['TWO'] },
];
const READY = 5; // countdown before the first step (s)
const SETTLE = 1; // ignore the first second of each step while the hand changes pose

const css = (el, s) => Object.assign(el.style, s);
const pct = (n, d) => (d ? Math.round((100 * n) / d) : 0);
const median = (a) => {
  const s = a.filter((v) => v != null).sort((x, y) => x - y);
  return s.length ? +s[s.length >> 1].toFixed(2) : null;
};

/** get() returns { gesture, hover, sel, grabbed, model, parts, hands, tracking } from main.js */
export function mount(get) {
  const panel = document.createElement('div');
  css(panel, { position: 'fixed', right: '16px', bottom: '72px', zIndex: 9999, maxWidth: 'min(560px, calc(100vw - 32px))', maxHeight: '60vh', overflow: 'auto', padding: '12px 14px', borderRadius: '12px', background: 'rgba(12,12,22,0.92)', color: '#eee', font: '13px ui-sans-serif, system-ui, sans-serif' });
  panel.innerHTML = '<b>Gesture test</b> <span style="opacity:.7">(?debug)</span><br><button id="dbg-run">Run test</button> <button id="dbg-copy" disabled>Copy results</button><div id="dbg-out" style="margin-top:8px"></div>';
  document.body.appendChild(panel);
  // the app styles plain buttons for its toolbar; give these their own look
  panel.querySelectorAll('button').forEach((b) => css(b, { all: 'unset', cursor: 'pointer', marginTop: '6px', marginRight: '6px', padding: '5px 12px', borderRadius: '8px', background: '#f2c94c', color: '#111', fontWeight: '600' }));
  const cue = document.createElement('div');
  css(cue, { position: 'fixed', top: '18px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, padding: '14px 26px', borderRadius: '14px', background: 'rgba(242,201,76,0.95)', color: '#111', font: '700 28px system-ui, sans-serif', pointerEvents: 'none', display: 'none' });
  document.body.appendChild(cue);

  let last = null;
  panel.querySelector('#dbg-run').onclick = () => {
    if (get().tracking !== 'Hands on') return (panel.querySelector('#dbg-out').textContent = 'Start the camera first, then run the test.');
    run(get, cue, (res) => {
      last = res;
      panel.querySelector('#dbg-out').innerHTML = table(res);
      panel.querySelector('#dbg-copy').disabled = false;
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

function run(get, cue, done) {
  const samples = [];
  const t0 = performance.now() + READY * 1000;
  const total = STEPS.reduce((s, x) => s + x.s, 0);
  cue.style.display = 'block';
  const tick = () => {
    const t = (performance.now() - t0) / 1000;
    if (t < 0) {
      cue.textContent = `Get ready, hand in view  ${Math.ceil(-t)}`;
      return requestAnimationFrame(tick);
    }
    if (t >= total) {
      cue.style.display = 'none';
      return done(report(samples));
    }
    let a = 0;
    const step = STEPS.find((s) => (a += s.s) > t);
    const tin = t - (a - step.s);
    cue.textContent = `${step.say}  ${Math.ceil(step.s - tin)}`;
    const g = get();
    samples.push({ step: step.id, tin, gesture: g.gesture, hover: g.hover, sel: g.sel, grabbed: g.grabbed, model: g.model, hands: g.hands.length, m: g.hands[0]?.metrics, part: (i) => g.parts[i]?.name });
    requestAnimationFrame(tick);
  };
  tick();
}

function report(samples) {
  const out = { when: new Date().toISOString(), steps: {} };
  samples.forEach((s, k) => (s.prevModel = k ? samples[k - 1].model : s.model)); // so a switch on a step's first frame counts
  let aimed = -1, aimedName = null;
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
    if (st.bad) r.falsePct = pct(settled.filter((s) => st.bad.includes(s.gesture)).length, settled.length);
    r.gestureChangesPerS = +(settled.filter((s, i) => i && s.gesture !== settled[i - 1].gesture).length / secs).toFixed(1);
    const mix = {};
    settled.forEach((s) => (mix[s.gesture || '-'] = (mix[s.gesture || '-'] || 0) + 1));
    r.seen = Object.fromEntries(Object.entries(mix).map(([k, v]) => [k, pct(v, settled.length)]));
    const ms = settled.map((s) => s.m).filter(Boolean);
    if (ms.length) r.medianRatios = [0, 1, 2, 3].map((i) => median(ms.map((m) => m.ratios[i])));
    if (ms.length) r.medianPinchGap = median(ms.map((m) => m.pinchGap));
    if (st.id === 'SWEEP' || st.id === 'AIM') {
      r.hoverFlipsPerS = +(settled.filter((s, i) => i && s.hover >= 0 && settled[i - 1].hover >= 0 && s.hover !== settled[i - 1].hover).length / secs).toFixed(2);
    }
    if (st.id === 'AIM') {
      const lastHover = [...rows].reverse().find((s) => s.hover >= 0);
      aimed = lastHover ? lastHover.hover : -1;
      aimedName = lastHover ? lastHover.part(aimed) : null;
      r.aimedAt = aimedName;
      r.locked = rows.some((s) => s.sel >= 0 && s.sel === s.hover);
    }
    if (st.id === 'PINCH') {
      const g = rows.find((s) => s.grabbed >= 0);
      r.grabbed = g ? g.part(g.grabbed) : null;
      r.grabbedAimedPart = g ? g.grabbed === aimed : false;
    }
    if (st.id === 'PEACE') r.modelSwitches = rows.filter((s) => s.model !== s.prevModel).length;
    out.steps[st.id] = r;
  }
  return out;
}

// Suggested targets, not a standard: adjust as you learn what feels right
function verdict(id, r) {
  if (id === 'RELAX') return r.falsePct <= 10;
  if (id === 'AIM') return r.recognisedPct >= 80 && r.hoverFlipsPerS <= 0.5 && r.locked;
  if (id === 'PINCH') return r.recognisedPct >= 80 && r.grabbedAimedPart;
  if (id === 'PEACE') return r.recognisedPct >= 80 && r.modelSwitches === 1;
  return r.recognisedPct >= 80;
}

function table(res) {
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
  const rows = Object.entries(res.steps).map(([id, r]) => {
    const notes = [];
    if (r.hoverFlipsPerS != null) notes.push(`hover flips ${r.hoverFlipsPerS}/s`);
    if (r.aimedAt !== undefined) notes.push(`aimed: ${r.aimedAt ?? 'none'}${r.locked ? ' (locked)' : ''}`);
    if (r.grabbed !== undefined) notes.push(`grabbed: ${r.grabbed ?? 'none'}${r.grabbedAimedPart ? ' = aimed' : ''}`);
    if (r.modelSwitches != null) notes.push(`model switches ${r.modelSwitches}`);
    const other = Object.entries(r.seen).filter(([g]) => !(STEPS.find((s) => s.id === id).ok || []).includes(g)).sort((a, b) => b[1] - a[1]).slice(0, 2);
    if (other.length) notes.push('else: ' + other.map(([g, p]) => `${g} ${p}%`).join(', '));
    const score = r.falsePct != null ? `${r.falsePct}% false` : `${r.recognisedPct}%`;
    return `<tr><td>${verdict(id, r) ? '✅' : '❌'} ${id}</td><td>${score}</td><td>${r.firstHitS ?? ''}</td><td>${esc(notes.join(' · '))}</td></tr>`;
  });
  return `<table style="border-collapse:collapse;width:100%"><tr style="text-align:left;opacity:.7"><th>Step</th><th>Score</th><th>1st hit s</th><th>Notes</th></tr>${rows.join('')}</table><div style="opacity:.6;margin-top:6px">Targets are suggestions: ≥80% recognised, ≤10% false on a relaxed hand, ≤0.5 hover flips/s, pinch grabs the aimed part, one model switch per peace.</div>`;
}
