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
  ['Crust: rock richer in silica (continental crust about 61% SiO~2~)', ORANGE, (id) => isCrust(id)],
  ['Mantle: rock richer in magnesium, about 45% SiO~2~ and 38% MgO', AQUA, (id) => !isCrust(id) && !isCore(id)],
  ['Core: iron–nickel metal', AMBER, (id) => isCore(id)],
];
const BEHAVIOUR = [
  ['Lithosphere: the plates, crust plus top of the mantle', BLUE, (id) => isCrust(id) || /lithosph/.test(id)],
  ['Asthenosphere: solid, but S waves slow down', ORANGE, (id) => id === 'asthenosphere'],
  ['Mantle below: solid, convects slowly', AQUA, (id) => /mantle|transition|d-double|llsvp|perovskite/.test(id) && !/lithosph/.test(id)],
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
    [`S shadow zone: no direct S waves beyond ${QF.s}°`, QUAKE_COLORS.sShadow],
  ],
  note: 'Ray paths calculated here from PREM wave speeds, Table I, p. 308. The clock is sped up.',
  caption: `Entering the liquid outer core, P waves slow down and bend, so a band of the surface gets no direct P waves. P waves that cross the inner core land in that band from about ${QF.innerFrom}° on. S waves cannot enter the liquid at all. Waves that cross the core as P and turn back into S on the far side are not drawn.`,
  more: 'Why the shadows? Test yourself',
  q: {
    q: `In this drawing, why do no direct S waves arrive more than about ${QF.s}° from the earthquake?`,
    options: ['The liquid outer core prevents S waves from passing through', 'The mantle absorbs them', 'They are too slow to arrive'],
    answer: 0,
    explain: 'PREM gives an S-wave speed of 0 in the outer core, so S waves cannot travel through it and the core casts an S-wave shadow. The mantle does not block them: PREM’s S-wave speeds there are above 4 km/s. Waves that cross the core as P and turn back into S on the far side can still arrive; they are not drawn here.',
    where: 'PREM, Table I, p. 308; paths calculated here from it',
  },
});
// Real crust thickness from the CRUST1.0 grid (src/content/earth/crust1.js), drawn on the surface by ui/dataMap.js
VIEWS.push({
  id: 'crust1', label: 'Crust thickness', title: 'Crust thickness (km), CRUST1.0', levels: ['undergrad', 'postgrad'],
  min: 0, max: 75, lo: '#4a2c0c', hi: '#ffe2b0',
  note: 'Laske, Masters, Ma & Pasyanos (2013), CRUST1.0: total crustal thickness on a 1° grid, excluding water (file crsthk.xyz). Real thickness, shown by colour; the drawn crust stays schematic.',
  caption: 'Each dot shows the thickness of the crust beneath it. Thick continental crust stands out against thin ocean crust.',
  more: 'Where is it thickest? Test yourself',
  q: {
    q: 'Where is the crust thickest?',
    options: ['Under the Tibetan Plateau', 'Under the central Pacific', 'Under Iceland'],
    answer: 0,
    explain: 'Under the Tibetan Plateau: 74 km in CRUST1.0, against about 7 km under the central Pacific and about 33 km under Iceland.',
    where: 'CRUST1.0, crsthk.xyz, 1° cells centred at 32.5°N 90.5°E, 0.5°N 150.5°W and 64.5°N 18.5°W',
  },
});
// Data views drawn by ui/dataMap.js (sources wired in main.js); appended after crust1 so the layers stay dimmed beneath them
VIEWS.push({
  id: 'temperature', label: 'Temperature', title: 'Temperature (K)', levels: ['undergrad', 'postgrad'],
  min: 1600, max: 5600, lo: '#4a1208', hi: '#fff1b8',
  note: 'Mantle, 50–2,800 km: the adiabat of Katsura (2022), Table 3, pp. 6–7. Joined straight below it, between cited points: about 4,050 K at the core–mantle boundary (Anzellini et al. 2013, p. 466), the middle of 5,200–5,700 K at the inner-core boundary and of 5,000–6,000 K at the centre (Hirose et al. 2013, pp. 658, 682). The top 50 km is left out: the lithosphere is colder than the adiabat and is not in the table.',
  caption: 'Most of the mantle warms only slowly with depth, about 0.2–0.5 K per km. The big rise is at the bottom: across the hot boundary layer above the core, from about 2,600 K to about 4,050 K.',
  more: 'Where does it heat up fastest? Test yourself',
  q: {
    q: 'In the profile shown, where does the temperature rise most sharply?',
    options: ['In the boundary layer just above the core', 'In the transition zone', 'In the inner core'],
    answer: 0,
    explain: 'Just above the core: the adiabat reaches 2,587 K at 2,800 km (Katsura 2022), while the core–mantle boundary is about 4,050 K (Anzellini et al. 2013). In the mantle above, the adiabat rises only 0.2–0.5 K per km. The drawing joins those two estimates with a straight line; the real shape of the step is not known from them.',
    where: 'Katsura (2022), Table 3, pp. 6–7; Anzellini et al. (2013), p. 466',
  },
  byLevel: {
    postgrad: 'Estimates differ. Temperature step across the boundary layer above the core: 1,000 ± 500 K (Lay et al. 1998, p. 461) against about 1,400 K (Anzellini et al. 2013, p. 466). Inner-core boundary temperature: 5,200–5,700 K (Hirose et al. 2013, p. 682). A different quantity, for comparison: pure iron melts at 6,230 ± 500 K at that pressure (Anzellini et al. 2013, p. 464); the core alloy melts lower.',
  },
});
VIEWS.push({
  id: 'labmap', label: 'LAB depth', title: 'Depth of the base of the plate under the oceans (km)', levels: ['undergrad', 'postgrad'],
  min: 55, max: 82, lo: '#9fe7ff', hi: '#16305c',
  note: 'Seafloor age from Seton et al. (2020), averaged to 1° cells, turned into depth with the measured ages of Fischer et al. (2010), p. 565: 55 km at 25 Ma, 76 km at 49 Ma, 82 km at 129 Ma, joined straight. Grey: floor younger than 25 Ma or older than 129 Ma, outside the measured ages. Land is left blank.',
  caption: 'Ocean plates thicken as they age and cool, so the base of the plate is shallow near the mid-ocean ridges and deepens away from them. Each cell’s depth comes from its sea-floor age, not from a measurement there. The oldest floor, much of it in the western Pacific, is older than the measured ages and shows grey.',
  more: 'Where is the plate thickest? Test yourself',
  q: {
    q: 'On this map, where is the ocean plate drawn thickest?',
    options: ['On the oldest coloured floor, about 129 million years old', 'Along the mid-ocean ridges', 'Around Iceland'],
    answer: 0,
    explain: 'On the oldest floor still inside the measured ages. The map joins the measured depths straight and reaches 82 km at 129 million years, the depth given for Pacific lithosphere of that age. Older floor is grey. Near the ridges the floor is young and the plate thin.',
    where: 'Fischer et al. (2010), p. 565; Seton et al. (2020) age grid',
  },
});
VIEWS.push({
  id: 'tomo', label: 'Tomography', title: 'S-wave speed against the average at that depth (%), along the equator', levels: ['postgrad'],
  min: -2, max: 2, lo: '#d6452f', mid: '#d8d2c8', hi: '#2f6fd6', ends: ['−2% slower', '+2% faster'],
  note: 'SEMUCB-WM1 (French & Romanowicz 2014), EarthScope EMC visualisation file: a slice through the equator from 80 km down, each depth compared with its global average. Colours stop at ±2%; the top few hundred km goes beyond that. The cut is real: 0° longitude points the same way as on the crust map.',
  caption: 'The colour shows S-wave speed: red is slower than average, blue faster. Slower is often read as hotter and faster as colder, but that is an interpretation, and composition can matter too. This slice crosses both broad slow regions at the base of the mantle: one beneath the Pacific, the other beneath the South Atlantic and Africa. Near the top, the old continent of Africa shows fast and the young East Pacific seafloor shows slow.',
  more: 'What do the red patches at the bottom show? Test yourself',
  q: {
    q: 'What are the two broad slow (red) regions at the base of the mantle?',
    options: ['The large low-shear-velocity provinces, beneath the Pacific and beneath the South Atlantic and Africa', 'Sinking ocean plates', 'The liquid outer core'],
    answer: 0,
    explain: 'They match the two nearly antipodal low-velocity provinces, one beneath the Pacific and the other beneath the South Atlantic and Africa (Garnero et al. 2016, p. 481). In this slice, S waves are over 1.5% slower than average at 2,841 km beneath 150°W and 15°E.',
    where: 'SEMUCB-WM1 equator slice; Garnero et al. (2016), p. 481',
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
  explain: 'The Moho. Continental crust above it has about 61% SiO~2~; the mantle rock below, about 45%. The base of the lithosphere lies inside the mantle.',
  where: 'Rudnick & Gao (2003), Table 11, p. 53; McDonough & Sun (1995), Table 4, p. 237; PREM, pp. 300, 308',
};

/** Buttons in `host`, legend in `legend`; onChange(index) when a view is picked. levelOf() picks a view's byLevel note. */
export function mountViewSwitch(host, legend, onChange, levelOf = () => null) {
  let compareTimer = 0;
  const buttons = VIEWS.map((v, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = v.label;
    b.dataset.view = v.id;
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
    draw(i, comparing);
    onChange(i);
  }

  function draw(i, comparing) {
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
        add(legend, 'i', 'bar').style.background = `linear-gradient(to right, ${[v.lo, v.mid, v.hi].filter(Boolean).join(', ')})`;
        const ends = add(legend, 'span', 'ends');
        for (const e of v.ends || [v.min, v.max]) add(ends, 'span', '', String(e));
      }
      add(legend, 'small', '', v.note);
      const extra = v.byLevel?.[levelOf()];
      if (extra) add(legend, 'small', 'by-level', extra);
      if (v.caption) compare(v, comparing);
    }
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
  /** Redraw the legend of the view in use, e.g. after the level changes. */
  const refresh = () => draw(Math.max(0, buttons.findIndex((b) => b.getAttribute('aria-pressed') === 'true')), false);
  return { select, refresh };
}
