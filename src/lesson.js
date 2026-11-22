// A lesson is a fixed list of steps; next/back stop at the ends rather than wrapping.
export class Lesson {
  constructor(steps) {
    this.steps = steps || [];
    this.i = 0;
  }
  get step() {
    return this.steps[this.i] ?? null;
  }
  next() {
    if (this.i >= this.steps.length - 1) return false;
    this.i++;
    return true;
  }
  back() {
    if (this.i <= 0) return false;
    this.i--;
    return true;
  }
  jumpToPart(partId) {
    this.i = Math.max(0, this.steps.findIndex((s) => s.focus === partId));
  }
}
