// "Colour by": layers, two ways to divide the Earth (composition, behaviour), or a PREM property at each depth.
import { premAt } from '../content/earth/prem.js';
import { renderRich } from './richText.js';
import { QUAKE_FACTS as QF } from '../content/earth/rays.js';

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const ramp = (lo, hi, t) => toHex(hex(lo).map((a, i) => a + (hex(hi)[i] - a) * Math.min(1, Math.max(0, t))));

// categorical colours: the reference palette's dark-mode slots 1-5, checked in this order with the dataviz validator
const [BLUE, ORANGE, AQUA, AMBER, MAGENTA] = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181'];

const isCrust = (id) => /crust/.test(id);
const isCore = (id) => /core/.test(id);
const COMPOSITION = [
  ['Crust: rock richer in silica, about 61% SiO~2~', ORANGE, (id) => isCrust(id)],
  ['Mantle: rock richer in magnesium, about 45% SiO~2~ and 38% MgO', AQUA, (id) => !isCrust(id) && !isCore(id)],
  ['Core: iron–nickel metal', AMBER, (id) => isCore(id)],
];
const BEHAVIOUR = [
  ['Lithosphere: the plates, crust plus top of the mantle', BLUE, (id) => isCrust(id) || /lithosph/.test(id)],
  ['Asthenosphere: solid, but S waves slow down', ORANGE, (id) => id === 'asthenosphere'],
  ['Mantle below: solid, convects slowly', AQUA, (id) => /mantle|transition|d-double|llsvp/.test(id) && !/lithosph/.test(id)],
  ['Outer core: liquid', AMBER, (id) => id === 'outer-core'],
  ['Inner core: solid', MAGENTA, (id) => /inner-core/.test(id)],
];
const pick = (groups, id) => groups.find(([, , has]) => has(id))?.[1] || null;
const items = (groups) => groups.map(([label, color]) => [label, color]);

export const VIEWS = [
  { id: 'layers', label: 'Layers' },
  {
    id: 'composition', label: 'Composition', title: 'Divided by what it’s made of', items: items(COMPOSITION),
    note: 'Rudnick & Gao (2003), Table 11, p. 53; McDonough & Sun (1995), Table 4, p. 237 and Abstract, p. 223',
    caption: 'By what it’s made of: the Moho separates silica-rich crust from magnesium-rich mantle rock, and the core–mantle boundary separates rock from iron.',
  },
  {
    id: 'behaviour', label: 'Behaviour', title: 'Divided by how it behaves', items: items(BEHAVIOUR),
    note: 'Garnero et al. (2016), p. 481; PREM, Table I and footnote, p. 308 (S-wave speeds; lid base at 80 km)',
    caption: 'By how it behaves: the base of the plates (80 km in this model) lies inside the mantle. Below it, PREM’s low-velocity zone: the same mantle rock, but S waves travel more slowly and are damped more.',
  },
  { id: 'density', label: 'Density', title: 'Density (g/cm³)', min: 2.6, max: 13.1, lo: '#3a2208', hi: '#ffd58a', of: (km) => premAt(km).density, note: 'PREM, Table I, p. 308' },
  { id: 'vs', label: 'S-wave speed', title: 'S-wave speed (km/s)', min: 0, max: 7.3, lo: '#0d1e33', hi: '#a8d0ff', of: (km) => premAt(km).vs, note: '0 means liquid: S waves cannot pass. PREM, Table I, p. 308' },
];

export const QUAKE_COLORS = { P: '#ffd58a', S: '#a8d0ff', pShadow: '#d55181', sShadow: '#3987e5' };
VIEWS.push({
  id: 'quake', label: 'Earthquake', title: 'Waves from an earthquake at the top',
  items: [
    ['P waves: travel through solid and liquid', QUAKE_COLORS.P],
    ['S waves: stop at the liquid outer core', QUAKE_COLORS.S],
    [`P shadow zone: no direct P waves ${QF.p[0]}°–${QF.p[1]}° away`, QUAKE_COLORS.pShadow],
    [`S shadow zone: no S waves beyond ${QF.s}°`, QUAKE_COLORS.sShadow],
  ],
  note: 'Ray paths calculated here from PREM wave speeds, Table I, p. 308. The clock is sped up.',
  caption: `Entering the liquid outer core, P waves slow down and bend, so a band of the surface gets no direct P waves. P waves that cross the inner core land in that band from about ${QF.innerFrom}° on. S waves cannot enter the liquid at all.`,
  more: 'Why the shadows? Test yourself',
  q: {
    q: `Why do no S waves arrive more than about ${QF.s}° from the earthquake?`,
    options: ['The outer core is liquid, so S waves cannot cross it', 'The mantle absorbs them', 'They are too slow to arrive'],
    answer: 0,
    explain: 'PREM gives an S-wave speed of 0 in the outer core, so S waves cannot travel through it and the core casts an S-wave shadow. The mantle does not block them: PREM’s S-wave speeds there are above 4 km/s.',
    where: 'PREM, Table I, p. 308; paths calculated here from it',
  },
});
const DIVIDE = ['composition', 'behaviour'];

// The drawing's crust is a schematic 35 km while PREM's crust ends at 24.4 km, so crust faces read crust values
// and mantle faces mantle values, instead of mixing them by drawn depth.
const premDepth = (id, km) => (isCrust(id) ? Math.min(km, 24.3) : !isCore(id) ? Math.max(km, 24.5) : km);
const level = (v, km) => (v.of(km) - v.min) / (v.max - v.min);

/** Face colours for a part at a depth, in view order 1..4. */
export function faceColors(part, km) {
  const d = premDepth(part.id, km);
  const [, , , density, vs] = VIEWS;
  return [pick(COMPOSITION, part.id), pick(BEHAVIOUR, part.id), ramp(density.lo, density.hi, level(density, d)), ramp(vs.lo, vs.hi, level(vs, d))];
}

// the quick question under the comparison: answer and explanation restate the cited content
const COMPARE_Q = {
  q: 'Which boundary separates two different kinds of rock?',
  options: ['The Moho', 'The base of the lithosphere'],
  answer: 0,
  explain: 'The Moho. Crust above it has about 61% SiO~2~; the mantle rock below, about 45%. The base of the lithosphere lies inside the mantle.',
  where: 'Rudnick & Gao (2003), Table 11, p. 53; McDonough & Sun (1995), Table 4, p. 237; PREM, pp. 300, 308',
};

/** Buttons in `host`, legend in `legend`; onChange(index) when a view is picked. */
export function mountViewSwitch(host, legend, onChange) {
  let compareTimer = 0;
  const buttons = VIEWS.map((v, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = v.label;
    b.setAttribute('aria-pressed', String(i === 0));
    b.onclick = () => select(i);
    host.append(b);
    return b;
  });
  const add = (parent, tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) renderRich(n, text);
    parent.append(n);
    return n;
  };

  function select(i, comparing = false) {
    if (!comparing) clearInterval(compareTimer);
    buttons.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    const v = VIEWS[i];
    legend.hidden = i === 0;
    legend.replaceChildren();
    if (i > 0) {
      add(legend, 'b', '', v.title);
      if (v.items) for (const [label, color] of v.items) {
        const sw = add(legend, 'span', 'swatch');
        sw.style.setProperty('--c', color);
        add(sw, 'span', '', label);
      }
      else {
        add(legend, 'i', 'bar').style.background = `linear-gradient(to right, ${v.lo}, ${v.hi})`;
        const ends = add(legend, 'span', 'ends');
        add(ends, 'span', '', String(v.min));
        add(ends, 'span', '', String(v.max));
      }
      add(legend, 'small', '', v.note);
      if (v.caption) compare(v, comparing);
    }
    onChange(i);
  }

  /** Under a view with a caption: the caption, a Compare button for the two "divide the Earth" views, and one question. */
  function compare(v, comparing) {
    // folded away by default so the legend stays small over the model; open while comparing
    const more = add(legend, 'details', 'more');
    more.open = comparing;
    add(more, 'summary', '', v.more || 'Why two ways? Compare and test yourself');
    add(more, 'p', 'caption', v.caption);
    const Q = v.q || COMPARE_Q;
    const row = DIVIDE.includes(v.id) && add(more, 'div', 'row');
    const flip = row && add(row, 'button', 'compare', comparing ? 'Stop comparing' : '▶ Compare the two');
    if (flip) {
      flip.type = 'button';
      flip.onclick = () => {
        if (comparing) return select(VIEWS.indexOf(v));
        const a = VIEWS.findIndex((x) => x.id === 'composition'), b = a + 1;
        select(v === VIEWS[a] ? b : a, true);
        compareTimer = setInterval(() => select(buttons[a].getAttribute('aria-pressed') === 'true' ? b : a, true), 6000);
      };
    }
    if (comparing) return;
    const qa = add(more, 'div', 'qa');
    add(qa, 'p', 'q', Q.q);
    const fb = add(qa, 'p', 'fb');
    Q.options.forEach((o, k) => {
      const b = add(qa, 'button', 'opt', o);
      b.type = 'button';
      b.onclick = () => {
        qa.querySelectorAll('.opt').forEach((x, j) => {
          x.disabled = true;
          x.classList.toggle('right', j === Q.answer);
          x.classList.toggle('wrong', x === b && k !== Q.answer);
        });
        renderRich(fb, `${k === Q.answer ? 'Correct. ' : 'Not quite. '}${Q.explain} (${Q.where})`);
      };
      qa.insertBefore(b, fb);
    });
  }
  return { select };
}
