// The one-hand command is a shape held still: it fires once the shape has been held for its full time.
// Moving the hand or changing shape restarts it, and a fired shape must be released before it fires again.
export const HOLD_S = { PEACE: 0.5 };
export const STILL = 0.22; // max smoothed palm speed while holding, in viewport widths per second
const GRACE = 0.12; // a shape misread for less than this (s) doesn't restart the hold

export class Hold {
  constructor() {
    this.reset();
  }

  reset() {
    this.shape = null; // the command shape being held, or null
    this.held = 0;
    this.away = 0;
    this.armed = true;
    this.speed = 0;
    this.prev = null;
  }

  /** 0..1 while filling, 1 once fired and still held, 0 otherwise. */
  get progress() {
    if (!this.shape) return 0;
    return this.armed ? Math.min(1, this.held / HOLD_S[this.shape]) : 1;
  }

  /** gesture name, palm {x,y} in viewport fractions, time (s), dt (s), freshFrame = a new camera image arrived.
   *  Returns the shape that fired this call, or null. */
  update(gesture, palm, t, dt, freshFrame) {
    const shape = gesture in HOLD_S ? gesture : null;
    if (shape !== this.shape) {
      this.away += dt;
      if (this.away < GRACE && this.shape) return null;
      this.shape = shape;
      this.held = 0;
      this.armed = true;
      this.speed = 0;
    }
    this.away = 0;
    if (freshFrame && palm) {
      // the palm only moves when a camera image arrives, so speed is measured between images
      if (this.prev && t > this.prev.t) {
        const inst = Math.hypot(palm.x - this.prev.x, palm.y - this.prev.y) / (t - this.prev.t);
        this.speed += (inst - this.speed) * 0.35;
      }
      this.prev = { x: palm.x, y: palm.y, t };
    }
    if (!this.shape || !this.armed) return null;
    if (this.speed > STILL) {
      this.held = 0;
      return null;
    }
    this.held += dt;
    if (this.held < HOLD_S[this.shape]) return null;
    this.armed = false;
    return this.shape;
  }
}
