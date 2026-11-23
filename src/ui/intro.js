// First-run intro: one control at a time, each step waiting until the person has done it.
export const INTRO_STEPS = ['turn', 'pull', 'point'];
const TURN_RAD = 0.6; // how far they turn the Earth themselves before moving on
const OPEN = 0.85; // how far open counts as pulled apart
const LINGER_S = 1.5; // labels stay on screen this long once it is open

export function createIntro() {
  let i = 0, turned = 0, openSince = -1;
  return {
    get step() {
      return INTRO_STEPS[i] || 'done';
    },
    get index() {
      return i;
    },
    /** 0..1: how far through the turn step. */
    get turned() {
      return Math.min(1, turned / TURN_RAD);
    },
    /** dRot: radians the person turned it this frame; explode: 0..1 shown; sel: picked part or -1; t: seconds. True when the step changes. */
    tick({ dRot = 0, explode = 0, sel = -1, t = 0 }) {
      const step = INTRO_STEPS[i];
      if (step === 'turn' && (turned += Math.abs(dRot)) >= TURN_RAD) i++;
      else if (step === 'pull') {
        if (explode < OPEN) openSince = -1;
        else if (openSince < 0) openSince = t;
        else if (t - openSince >= LINGER_S) i++;
      } else if (step === 'point' && sel >= 0) i++;
      else return false;
      return INTRO_STEPS[i] !== step;
    },
    skip() {
      i = INTRO_STEPS.length;
    },
  };
}

/** While the Earth opens, how many of n labels (surface first) are showing: part k shows once explode reaches 0.8 * (k + 1) / n. */
export const labelsOpen = (n, explode) => Math.max(0, Math.min(n, Math.floor((explode / 0.8) * n + 1e-9)));
