// Point and hold: the index fingertip moves a cursor; holding it on one button clicks that button.
export const DWELL_S = 0.8;
const GRACE_S = 0.35; // a hand lost for less than this pauses the dwell instead of restarting it

/** Pure dwell timer. update(target, dt) returns the target when it fires, else null. */
export class Dwell {
  constructor() {
    this.target = null;
    this.t = 0;
    this.spent = null; // fired target: must be left before it can fire again
    this.lost = 0;
  }
  get progress() {
    return this.target && this.target !== this.spent ? Math.min(1, this.t / DWELL_S) : 0;
  }
  update(target, dt) {
    if (!target && this.target && this.target !== this.spent && (this.lost += dt) < GRACE_S) return null;
    this.lost = 0;
    if (target !== this.target) {
      this.target = target;
      this.t = 0;
      if (target !== this.spent) this.spent = null;
    }
    if (!target || target === this.spent) return null;
    this.t += dt;
    if (this.t < DWELL_S) return null;
    this.spent = target;
    return target;
  }
}

const CLICKABLE = 'button:not([disabled]), [role="button"], summary, a[href]';

const UI = '#panel, #toolbar, #viewbar, #start, #tour, #stuck, #stuck-menu, #part-card, #intro, #reset-earth, #mission';

/** The cursor element and its dwell. tip = {x, y} in viewport fractions, or null when not pointing.
 * atModel(x, y), when given, returns a stable { click } target for the model part under the cursor (or null), so pointing at a part picks it too. */
export function mountPointer() {
  const cursor = document.createElement('div');
  cursor.id = 'hand-cursor';
  cursor.hidden = true;
  const tag = document.createElement('div'); // the candidate part's name, beside the fingertip
  tag.id = 'hand-tag';
  tag.hidden = true;
  document.body.append(cursor, tag);
  const dwell = new Dwell();
  return {
    update(tip, dt, atModel) {
      if (!tip) {
        cursor.hidden = true;
        tag.hidden = true;
        dwell.update(null, dt);
        return;
      }
      const x = tip.x * innerWidth, y = tip.y * innerHeight;
      cursor.hidden = false;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      const under = document.elementFromPoint(x, y);
      const target = under?.closest(CLICKABLE) || (atModel && !under?.closest(UI) ? atModel(x, y) : null) || null;
      const fired = dwell.update(target, dt);
      cursor.style.setProperty('--p', dwell.progress.toFixed(3));
      cursor.classList.toggle('on-target', Boolean(target) && target !== dwell.spent);
      tag.hidden = !target?.name;
      if (target?.name) {
        tag.textContent = target.name;
        tag.style.transform = `translate(${x + 22}px, ${y - 11}px)`;
      }
      if (fired) fired.click();
    },
  };
}
