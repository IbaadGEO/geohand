// Raw MediaPipe landmarks -> stable per-hand state: gesture, openness (0 fist .. 1 open palm),
// smoothed palm / fingertip / pinch positions in viewport space, and wrist roll.
import { clamp, angleDelta } from './utils.js';

export const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17],
];

const FINGERS = [[8, 5], [12, 9], [16, 13], [20, 17]]; // [tip, mcp] for index, middle, ring, pinky
// finger hysteresis: becomes extended above UP, curled below DOWN, otherwise keeps its last state
const UP = 1.5, DOWN = 1.4;
// pinch: thumb-index gap in hand sizes to start / end, and frames it must hold
// ON is tight because pointing at the camera squashes depth and puts the thumb ~0.25 from the index tip (real pinch ~0.13)
const PINCH_ON = 0.18, PINCH_OFF = 0.4, PINCH_FRAMES = 4;
// point also counts when the index clearly outreaches the other fingers, even if it never passes UP (depth squash)
const POINT_MIN = 1.25, POINT_MARGIN = 0.45;

class HandState {
  constructor() {
    this.stable = 'NONE';
    this.cand = 'NONE';
    this.streak = 0;
    this.pinching = false;
    this.ext = null; // per-finger extended state, null until first frame
    this.palm = null;
    this.tip = null;
    this.pp = null;
    this.lastRoll = null;
    this.rollSm = 0;
    this.open = 0.5;
    this.missing = 0;
    this.last = null;
  }
}

const smooth = (prev, cur, dt) => {
  if (!prev) return { ...cur };
  const speed = Math.hypot(cur.x - prev.x, cur.y - prev.y) / dt;
  const a = clamp(0.18 + speed * 0.6, 0.18, 0.85);
  return { x: prev.x + (cur.x - prev.x) * a, y: prev.y + (cur.y - prev.y) * a };
};

export class GestureEngine {
  constructor() {
    this.states = new Map();
    this.lastT = 0;
  }
  reset() {
    this.states.clear();
  }

  /**
   * hands: [{ landmarks, score, label }]
   * map:   raw camera landmark -> viewport-normalised {x,y} (mirroring + crop already applied)
   * aspect: video width / height
   */
  update(hands, t, map, aspect = 16 / 9) {
    const dt = clamp(t - this.lastT, 0.001, 0.1);
    this.lastT = t;
    const items = hands.map((h) => ({ h, label: h.label }));
    if (items.length === 2 && items[0].label === items[1].label) items[1].label = items[0].label === 'Left' ? 'Right' : 'Left';
    const seen = new Set();
    const out = [];
    for (const { h, label } of items) {
      seen.add(label);
      let st = this.states.get(label);
      if (!st) {
        st = new HandState();
        this.states.set(label, st);
      }
      out.push(this._process(st, label, h, dt, map, aspect));
    }
    for (const [id, st] of [...this.states]) {
      if (seen.has(id)) continue;
      st.missing++;
      if (st.missing > 6 || !st.last) this.states.delete(id);
      else out.push({ ...st.last, held: true, rollDelta: 0 });
    }
    out.sort((a, b) => (a.id < b.id ? -1 : 1));
    return { hands: out };
  }

  _process(st, id, h, dt, map, aspect) {
    st.missing = 0;
    const raw = h.landmarks;
    // mirrored, aspect-corrected image space, used for wrist roll
    const L = raw.map((p) => ({ x: (1 - p.x) * aspect, y: p.y }));
    // hand shape is measured in 3D when available: a finger pointing at the camera looks short in the image
    const G = h.world || L.map((p) => ({ ...p, z: 0 }));
    const d = (a, b) => Math.hypot(G[a].x - G[b].x, G[a].y - G[b].y, G[a].z - G[b].z);
    const size = Math.max(1e-4, d(0, 9));

    const ratios = FINGERS.map(([tp, mc]) => d(tp, 0) / Math.max(1e-4, d(mc, 0)));
    st.ext = ratios.map((r, i) => (r > UP ? true : r < DOWN ? false : st.ext ? st.ext[i] : r > (UP + DOWN) / 2));
    const ext = st.ext;
    const curl = ext.map((e) => !e);
    const avg = (ratios[0] + ratios[1] + ratios[2] + ratios[3]) / 4;
    const rawOpen = clamp((avg - 1.05) / (1.8 - 1.05), 0, 1);
    st.open += (rawOpen - st.open) * 0.45;

    // pinch with hysteresis
    const pr = d(4, 8) / size;
    const canPinch = d(8, 0) / Math.max(1e-4, d(6, 0)) > 0.88;
    if (!st.pinching && pr < PINCH_ON && canPinch) st.pinching = true;
    else if (st.pinching && (pr > PINCH_OFF || !canPinch)) st.pinching = false;

    let g = 'NONE';
    if (st.pinching) g = 'PINCH';
    else if (ext[0] && ext[1] && ext[2] && ext[3]) g = 'OPEN';
    else if (ext[0] && ext[1] && curl[2] && curl[3]) g = 'PEACE';
    else if ((ext[0] || (ratios[0] > POINT_MIN && ratios[0] - Math.max(ratios[1], ratios[2], ratios[3]) > POINT_MARGIN)) && curl[1] && curl[2] && curl[3]) g = 'POINT';
    else if (curl[0] && curl[1] && curl[2] && curl[3]) g = 'FIST';

    if (g === st.cand) st.streak++;
    else {
      st.cand = g;
      st.streak = 1;
    }
    const need = g === 'PINCH' ? PINCH_FRAMES : g === 'PEACE' ? 8 : 3;
    if (st.streak >= need && st.stable !== st.cand) st.stable = st.cand;

    // viewport-space positions
    const M = raw.map(map);
    const avgPts = (idx) => ({
      x: idx.reduce((s, k) => s + M[k].x, 0) / idx.length,
      y: idx.reduce((s, k) => s + M[k].y, 0) / idx.length,
    });
    st.palm = smooth(st.palm, avgPts([0, 5, 9, 13, 17]), dt);
    st.tip = smooth(st.tip, M[8], dt);
    st.pp = smooth(st.pp, avgPts([4, 8]), dt);

    // wrist roll (twist)
    const rawRoll = Math.atan2(L[9].x - L[0].x, -(L[9].y - L[0].y));
    let rd = 0;
    if (st.lastRoll !== null) rd = angleDelta(st.lastRoll, rawRoll);
    st.lastRoll = rawRoll;
    st.rollSm = st.rollSm * 0.6 + rd * 0.4;
    const rollDelta = Math.abs(st.rollSm) < 0.004 ? 0 : st.rollSm;

    st.last = {
      id,
      held: false,
      score: h.score,
      gesture: st.stable,
      lm: M,
      palm: { ...st.palm },
      tip: { ...st.tip },
      pinchPt: { ...st.pp },
      openness: st.open,
      pinching: st.pinching,
      rollDelta,
      metrics: { ratios, pinchGap: pr }, // raw shape numbers, shown by the ?debug test
    };
    return st.last;
  }
}
