import './styles.css';
import { HoloScene } from './scene.js';
import { MODELS } from './models/index.js';
import { GEOMETRY, KM } from './models/earth.js';
import { HandTracker } from './handTracking.js';
import { GestureEngine, HAND_CONNECTIONS } from './gestureEngine.js';
import { Hold, HOLD_S } from './hold.js';
import { buildTour, CHECK_WAIT } from './tour.js';
import { loopFor, LOOPS } from './content/earth/learn.js';
import { runLoop, loadProgress } from './ui/learnLoop.js';
import { stateOf } from './content/earth/states.js';
import { faceColors, mountViewSwitch, VIEWS } from './ui/propertyView.js';
import { buildQuake } from './ui/quakeView.js';
import { buildDataMap, scale } from './ui/dataMap.js';
import { CRUST1, thicknessAt } from './content/earth/crust1.js';
import { tempAt } from './content/earth/temperature.js';
import { SEAFLOOR, ageAt } from './content/earth/seafloor.js';
import { SEMUCB, dvsAt } from './content/earth/semucb.js';
import { LAB_AGES, labDepth } from './content/earth/lab.js';
import { clamp } from './utils.js';
import { LEVELS } from './content/levels.js';
import { loadLevel, saveLevel, mapPart } from './levels.js';
import { EARTH } from './content/earth/index.js';
import { REFS } from './content/references.js';
import { mountPanel, mountSearch, shortRef } from './ui/panel.js';
import { searchBank } from './ui/search.js';
import { openAsk } from './ui/ask.js';
import { renderRich } from './ui/richText.js';
import { Lesson } from './lesson.js';
import { LESSONS } from './content/earth/lessons.js';
import { showCrustActivity } from './ui/crustActivity.js';
import { mountPointer } from './ui/pointer.js';
import { mountStuck } from './ui/stuck.js';

const $ = (id) => document.getElementById(id);
const video = $('video');
const fxCanvas = $('fx');
const ctx = fxCanvas.getContext('2d');
const banner = $('banner');

let W = innerWidth, H = innerHeight, DPR = 1;
function sizeFx() {
  W = innerWidth;
  H = innerHeight;
  DPR = Math.min(devicePixelRatio || 1, 2);
  fxCanvas.width = W * DPR;
  fxCanvas.height = H * DPR;
}
sizeFx();
addEventListener('resize', sizeFx);

function showBanner(msg, info = false) {
  banner.textContent = msg;
  banner.className = info ? 'info' : '';
  banner.style.display = msg ? 'block' : 'none';
}
let toastTimer = 0;
function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 1600);
}

// ------------------------------------------------------------------ scene + UI
let level = loadLevel() || 'alevel';
let mode = 'explore'; // or 'lesson'
let pendingSel = null; // part id to select once a level rebuild finishes
let scene, quake;
const overlays = {}; // data views drawn as dots, by view id
try {
  scene = new HoloScene($('scene'), MODELS, level, (p) => stateOf(p.id, p.kind)?.motion || 0, faceColors);
  scene.uniforms.uFlow.value.set(KM(220), KM(660), KM(1000), KM(2891));
  quake = buildQuake(scene.uniforms);
  scene.group.add(quake.object);
  const GREY = '#5b6270';
  const SOURCES = {
    crust1: { kind: 'globe', n: 24000, file: CRUST1.file, bytes: CRUST1.cells,
      colorAt: (d, lat, lon, c, v) => !!scale(v, thicknessAt(d, lat, lon), c) },
    labmap: { kind: 'globe', n: 24000, file: SEAFLOOR.file, bytes: SEAFLOOR.cells,
      colorAt: (d, lat, lon, c, v) => {
        const age = ageAt(d, lat, lon);
        if (age == null) return false;
        if (age < LAB_AGES[0] || age > LAB_AGES[1]) return !!c.set(GREY); // outside the measured ages
        return !!scale(v, labDepth(age), c);
      } },
    temperature: { kind: 'cut', n: 26000, top: 50, base: 6371, colorAt: (d, km, lon, c, v) => !!scale(v, tempAt(km), c) },
    tomo: { kind: 'cut', n: 26000, top: 80, base: 2891, file: SEMUCB.file, bytes: SEMUCB.depths.length * 360, array: Int8Array,
      colorAt: (d, km, lon, c, v) => {
        const x = dvsAt(d, km, lon);
        if (x == null) return false;
        const t = Math.max(-1, Math.min(1, x / v.max)); // diverging: lo (slow) through mid to hi (fast)
        return !!c.set(v.mid).lerp(c.clone().set(t < 0 ? v.lo : v.hi), Math.abs(t));
      } },
  };
  for (const [id, src] of Object.entries(SOURCES)) {
    overlays[id] = buildDataMap(VIEWS.find((v) => v.id === id), scene.uniforms, src);
    scene.group.add(overlays[id].object);
  }
} catch (e) {
  console.error(e);
  showBanner('WebGL is unavailable. Try an up-to-date version of Chrome, Edge or Firefox with hardware acceleration enabled.');
  throw e;
}

const ui = { skeleton: true, labels: false, feed: false }; // labels: show every part's label, not just hovered/selected
let trackingState = 'Off';


let mouseHover = -1; // part under the mouse cursor (labels it)
let mouseDrag = null;
const panel = mountPanel($('info'));
const questionBank = $('question-bank');
const layerPicker = $('layer-picker');
mountSearch(questionBank, {
  find: (q) => searchBank(q, EARTH, level),
  levelLabel: (id) => LEVELS.find((l) => l.id === id).label,
  currentLevel: () => level,
  onAsk: (q) =>
    openAsk(questionBank.querySelector('.ask-host'), q, () => ({
      level,
      model: 'earth',
      part: scene.sel >= 0 ? scene.parts[scene.sel].id : 'general',
    })),
});
scene.onModel = (i, def, g) => {
  $('m-name').textContent = def.name;
  $('m-sub').textContent = def.subtitle;
  $('m-cat').textContent = def.category;
  $('m-count').textContent = `${g.meta.length} parts`;
  mouseDrag = null; // part indices from the old parts list no longer mean anything
  mouseHover = -1;
  layerPicker.replaceChildren(new Option('Select a layer or boundary', ''), ...scene.parts.map((p) => new Option(p.name, p.id)));
  const keep = pendingSel ? scene.parts.findIndex((p) => p.id === pendingSel) : -1;
  pendingSel = null;
  scene.setSel(keep);
  showPart(keep);
  if (mode === 'lesson') enterStep();
  toast(def.name);
};
// initial UI for model 0 (constructor loaded it before the callback existed)
scene.onModel(scene.index, MODELS[scene.index], scene.cache.get(scene.index));

// level picker: same buttons in the panel header and on the start screen
const levelButtons = [];
for (const host of [$('levels'), $('start-levels')]) {
  for (const l of LEVELS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = l.label;
    b.dataset.level = l.id;
    b.onclick = () => setLevel(l.id);
    host.appendChild(b);
    levelButtons.push(b);
  }
}
const markLevel = () => {
  levelButtons.forEach((b) => b.classList.toggle('on', b.dataset.level === level));
};
markLevel();

// ------------------------------------------------------------------ lessons
let lesson = new Lesson(LESSONS[level]);
let viewTarget = null; // eased camera angle for the current lesson step
let walkthroughPlaying = false;
let walkthroughTimer;
let walkthroughComplete = false;

function setWalkthrough(playing) {
  walkthroughPlaying = playing;
  clearTimeout(walkthroughTimer);
  $('lesson-play').textContent = playing ? 'Pause the walkthrough' : 'Start the walkthrough';
  $('lesson-play').setAttribute('aria-pressed', String(playing));
}

function setMode(m, keepIsolation = false) {
  mode = m;
  $('mode-explore').classList.toggle('on', m === 'explore');
  $('mode-lesson').classList.toggle('on', m === 'lesson');
  $('lesson-box').hidden = m !== 'lesson';
  if (m === 'lesson') enterStep();
  else {
    setWalkthrough(false);
    viewTarget = null;
    if (!keepIsolation) restoreParts();
    $('info').hidden = false;
  }
}
function enterStep() {
  const s = lesson.step;
  if (!s) return;
  walkthroughComplete = false;
  scene.explodeTarget = s.explode;
  scene.autoSpin = false;
  $('b-spin').classList.remove('on');
  viewTarget = s.view;
  const i = scene.parts.findIndex((p) => p.id === s.focus);
  scene.setSel(i);
  scene.isolate(walkthroughPlaying || s.activity === 'compare' ? i : -1);
  if (walkthroughPlaying) scene.pullAside();
  scene.setHover(-1);
  showPart(i);
  $('info').hidden = Boolean(s.activity);
  showCrustActivity($('lesson-activity'), s.activity, walkthroughPlaying);
  $('lesson-count').textContent = `Step ${lesson.i + 1} of ${lesson.steps.length}`;
  renderRich($('lesson-text'), s.text);
  const sources = s.where || s.refs?.map((id) => shortRef(REFS[id])).join('; ');
  $('lesson-src').textContent = sources ? `Sources: ${sources}` : '';
  $('lesson-back').disabled = lesson.i === 0;
  $('lesson-next').disabled = lesson.i === lesson.steps.length - 1;
  $('lesson-finish').hidden = lesson.i !== lesson.steps.length - 1;
  clearTimeout(walkthroughTimer);
  if (walkthroughPlaying) {
    walkthroughTimer = setTimeout(() => {
      if (lesson.next()) enterStep();
      else {
        walkthroughComplete = true;
        setWalkthrough(false);
      }
    }, s.activity ? 16000 : 12000);
  }
}
const lessonMove = (forward) => (forward ? lesson.next() : lesson.back()) && enterStep();
$('mode-explore').onclick = () => setMode('explore');
$('mode-lesson').onclick = () => setMode('lesson');
$('lesson-back').onclick = () => lessonMove(false);
$('lesson-next').onclick = () => lessonMove(true);
$('lesson-play').onclick = () => {
  const playing = !walkthroughPlaying;
  setWalkthrough(playing);
  if (!playing) return;
  if (walkthroughComplete) lesson.jumpToPart('crust');
  enterStep();
};
$('lesson-finish').onclick = () => {
  setMode('explore');
  lesson.jumpToPart('crust');
};
layerPicker.onchange = () => {
  const picked = layerPicker.value;
  setMode('explore');
  const i = scene.parts.findIndex((p) => p.id === picked);
  scene.setSel(i);
  showPart(i);
};

function setLevel(id) {
  if (id === level) return;
  stopTour(); // its steps belong to the old level
  closeLearn();
  const selId = scene.sel >= 0 ? scene.parts[scene.sel]?.id : null;
  pendingSel = mapPart(selId, level, id);
  level = id;
  if (mode === 'lesson') setMode('explore'); // the old level's lesson no longer applies
  saveLevel(id);
  lesson = new Lesson(LESSONS[id]);
  lesson.jumpToPart(pendingSel);
  scene.reload(scene.index, id);
  markLevel();
  syncViews();
  toast(LEVELS.find((l) => l.id === id).label);
}

// ------------------------------------------------------------------ learning loop for a layer
const learnHost = $('learn');
let drill = null; // the running drill-in's controls, used by the Stuck? menu
function closeLearn() {
  if (learnHost.hidden) return;
  drill = null;
  learnHost.hidden = true;
  learnHost.replaceChildren();
  $('info').hidden = false;
  showPart(scene.sel);
}
/** Sets up and saves the 3D model for the drill-in stages of part index i. */
const drillModel = (i) => ({
  whole() {
    views.select(0);
    scene.isolate();
    scene.setSel(-1);
    scene.explodeTarget = 0;
    scene.scaleTarget = 1;
    showPart(-1);
  },
  where() {
    views.select(0);
    scene.isolate();
    scene.setSel(i);
    scene.explodeTarget = 0.65; // open the Earth so the layer shows in place
    scene.scaleTarget = 1.2;
    showPart(i);
  },
  why(viewId) {
    views.select(VIEWS.findIndex((v) => v.id === viewId));
    scene.setSel(i);
    showPart(i);
  },
  capture: () => ({
    view: scene.uniforms.uProp.value, explode: scene.explodeTarget, iso: scene.isolatedPart,
    pull: { x: scene.pullTarget.x, y: scene.pullTarget.y }, sel: scene.sel, scale: scene.scaleTarget,
    rot: { ...(viewTarget || scene.rot) },
  }),
  restore(p) {
    views.select(p.view); // first: it closes the Earth and restarts the view's animation
    scene.explodeTarget = p.explode;
    scene.isolate(p.iso);
    scene.pullTarget.set(p.pull.x, p.pull.y);
    scene.setSel(p.sel);
    scene.scaleTarget = p.scale;
    viewTarget = { ...p.rot };
    showPart(p.sel);
  },
});
$('part-learn').onclick = () => {
  const i = scene.sel;
  const content = EARTH[level].parts.find((c) => c.id === scene.parts[i]?.id);
  const loop = content && loopFor(level, content.id);
  if (!loop) return;
  stopTour();
  if (mode === 'lesson') setMode('explore');
  $('info').hidden = true;
  drill = runLoop(learnHost, { level, part: content, loop, model: drillModel(i), onClose: closeLearn });
  $('part-learn').hidden = true;
  learnHost.scrollIntoView({ block: 'start', behavior: 'smooth' });
};

function showPart(i) {
  const p = i >= 0 ? scene.parts[i] : null;
  layerPicker.value = p?.id || '';
  panel.show(p ? EARTH[level].parts.find((c) => c.id === p.id) || null : null, REFS, p?.color);
  const button = $('part-pull');
  button.hidden = mode === 'lesson' || (!p && scene.isolatedPart < 0);
  button.textContent = scene.isolatedPart >= 0 ? 'Put all parts back' : 'Move this part aside';
  $('part-study').hidden = mode !== 'explore' || !p;
  const learn = $('part-learn');
  learn.hidden = mode !== 'explore' || !p || !loopFor(level, p.id) || !$('learn').hidden;
  const done = p && loadProgress()[level]?.[p.id];
  learn.textContent = done ? `Learn again (last time ${done.score} of ${done.total})` : 'Explore this layer: 2 minutes';
}

$('part-study').onclick = () => {
  const id = layerPicker.value;
  const focus = { asthenosphere: 'mantle', cmb: 'outer-core' }[id] || id;
  lesson.jumpToPart(focus);
  setMode('lesson');
  $('panel').scrollTop = 0;
};

function isolateForInspection(i) {
  if (mode === 'lesson') setMode('explore', scene.isolatedPart === i);
  scene.isolate(i);
  scene.setSel(i);
  scene.setHover(-1);
  mouseHover = -1;
  showPart(i);
}

function restoreParts() {
  scene.isolate();
  showPart(scene.sel);
}

/** Parts from the surface down; a boundary comes just before the layer that starts at it. */
const byDepth = (a, b) => {
  const [ta, ba] = GEOMETRY[a.id] || [Infinity, Infinity], [tb, bb] = GEOMETRY[b.id] || [Infinity, Infinity];
  return ta - tb || (ba - ta) - (bb - tb);
};
const layerOrder = () => [...EARTH[level].parts].sort(byDepth);

/** Step through whole Earth -> each layer -> whole Earth again. A highlighted layer stays in place with the others faded. */
function browseParts(direction) {
  if (scene.pending >= 0) return;
  if (scene.isolatedPart >= 0) scene.isolate(); // a part pulled aside with the mouse goes back first
  const parts = layerOrder();
  const current = parts.findIndex((p) => p.id === scene.parts[scene.sel]?.id); // -1 = whole Earth
  const k = ((current + 1 + direction) % (parts.length + 1) + parts.length + 1) % (parts.length + 1) - 1;
  highlight(k < 0 ? -1 : scene.parts.findIndex((part) => part.id === parts[k].id));
  toast(k < 0 ? 'Whole Earth' : parts[k].title);
}

/** Highlight part i in place (others faded, layers spread), or -1 for the whole Earth, assembled. */
function highlight(i) {
  scene.setSel(i);
  scene.setHover(-1);
  mouseHover = -1;
  scene.explodeTarget = i < 0 || scene.uniforms.uProp.value > 0 ? 0 : Math.max(scene.explodeTarget, 0.65);
  showPart(i);
  $('panel').scrollTop = 0;
}

// ------------------------------------------------------------------ automatic tour (no hands or mouse needed)
let tour = null; // { steps, i, t, paused }
const tourBar = $('tour');

function startTour() {
  setWalkthrough(false);
  if (mode === 'lesson') setMode('explore');
  scene.resetView();
  scene.autoSpin = true;
  $('b-spin').classList.add('on');
  closeLearn();
  const checks = Object.fromEntries(Object.entries(LOOPS[level] || {}).map(([id, l]) => [id, l.check]));
  tour = { steps: buildTour(layerOrder(), LEVELS.find((l) => l.id === level).label, checks), i: 0, t: 0, paused: false };
  tourBar.hidden = false;
  pauseTour(false);
  showTourStep();
}
function showTourStep() {
  const s = tour.steps[tour.i];
  highlight(s.id ? scene.parts.findIndex((p) => p.id === s.id) : -1);
  $('tour-title').textContent = s.title;
  tour.revealed = !s.check;
  renderRich($('tour-text'), s.check ? s.check.q : s.text);
  const opts = $('tour-check');
  opts.replaceChildren();
  opts.hidden = !s.check;
  s.check?.options.forEach((o, k) => {
    const b = document.createElement('button');
    b.type = 'button';
    renderRich(b, o);
    b.onclick = () => revealCheck(k);
    opts.append(b);
  });
  $('tour-count').textContent = `${tour.i + 1} of ${tour.steps.length}`;
  $('tour-back').disabled = tour.i === 0;
  tour.t = 0;
}
/** Show a tour question's answer: the learner's pick (k), or none when the wait runs out. */
function revealCheck(k = -1) {
  const s = tour?.steps[tour.i];
  if (!s?.check || tour.revealed) return;
  tour.revealed = true;
  tour.t = Math.max(tour.t, CHECK_WAIT);
  [...$('tour-check').children].forEach((b, i) => {
    b.disabled = true;
    b.classList.toggle('right', i === s.check.answer);
    b.classList.toggle('wrong', i === k && k !== s.check.answer);
  });
  const lead = k < 0 ? '' : k === s.check.answer ? 'Correct. ' : 'Not quite. ';
  renderRich($('tour-text'), `${lead}${s.check.explain} (${s.check.where})`);
}
function tourMove(d) {
  if (!tour) return;
  if (tour.i + d >= tour.steps.length) return stopTour();
  tour.i = Math.max(0, tour.i + d);
  showTourStep();
}
function stopTour() {
  tour = null;
  tourBar.hidden = true;
}
function pauseTour(paused) {
  if (!tour) return;
  tour.paused = paused;
  $('tour-pause').textContent = paused ? 'Resume' : 'Pause';
  $('tour-pause').setAttribute('aria-pressed', String(paused));
}
function tourTick(dt) {
  if (!tour) return;
  if (!tour.paused && scene.pending < 0) tour.t += dt;
  const s = tour.steps[tour.i];
  if (s.check && !tour.revealed && tour.t >= CHECK_WAIT) revealCheck();
  $('tour-progress').style.width = `${Math.min(100, (100 * tour.t) / s.dur)}%`;
  if (tour.t >= s.dur) tourMove(1);
}
$('tour-play').onclick = startTour;
$('tour-back').onclick = () => tourMove(-1);
$('tour-next').onclick = () => tourMove(1);
$('tour-pause').onclick = () => pauseTour(!tour.paused);
$('tour-stop').onclick = stopTour;

$('part-pull').onclick = () => {
  if (scene.isolatedPart >= 0) restoreParts();
  else {
    const i = scene.parts.findIndex((p) => p.id === layerPicker.value);
    if (i < 0) return;
    isolateForInspection(i);
    scene.pullAside();
  }
};

const rExplode = $('r-explode');
const rInt = $('r-int');
let draggingExplode = false;
rExplode.addEventListener('pointerdown', () => (draggingExplode = true));
addEventListener('pointerup', () => (draggingExplode = false));
rExplode.addEventListener('input', () => (scene.explodeTarget = rExplode.value / 100));
rInt.addEventListener('input', () => {
  scene.intensity = rInt.value / 100;
  $('v-int').textContent = rInt.value + '%';
});

$('b-explode').onclick = () => (scene.explodeTarget = scene.explodeTarget > 0.5 ? 0 : 1);
$('b-spin').onclick = () => {
  scene.autoSpin = !scene.autoSpin;
  $('b-spin').classList.toggle('on', scene.autoSpin);
};
/** Back to the original model from any state: whole Earth, assembled, starting view and zoom, nothing highlighted. */
function resetAll() {
  stopTour();
  closeLearn();
  setWalkthrough(false);
  if (mode === 'lesson') setMode('explore');
  scene.resetView();
  scene.explodeTarget = 0;
  viewTarget = null;
  views.select(0);
  mouseHover = -1;
  scene.setHover(-1);
  showPart(-1);
  toast('Model reset');
}
// colour the cut-away by layer or by a property at each depth; property views open the Earth and tilt it to show the faces
const views = mountViewSwitch($('views'), $('legend'), (i) => {
  scene.uniforms.uProp.value = i;
  const id = VIEWS[i].id, isQuake = id === 'quake', isGlobe = id === 'crust1' || id === 'labmap';
  quake.show(isQuake);
  for (const [k, o] of Object.entries(overlays)) o.show(k === id).then((ok) => ok || toast(`${VIEWS[i].label} data could not be loaded`));
  if (i > 0) {
    // one flat cut at the equator: the layers close up and the view tilts to look onto the face
    scene.explodeTarget = 0;
    scene.isolate();
    // the earthquake sits at the top; the surface maps are seen from the side, like a globe
    viewTarget = isQuake ? { x: 1.25, y: 0, z: 0 } : isGlobe ? { x: 0.3, y: scene.rot.y, z: 0 } : { x: 0.85, y: scene.rot.y, z: 0 };
  }
});
/** Views limited to some levels (VIEWS[i].levels) are hidden elsewhere; a hidden view in use falls back to Layers. */
function syncViews() {
  document.querySelectorAll('#views [data-view]').forEach((b) => {
    const v = VIEWS.find((x) => x.id === b.dataset.view);
    b.hidden = Boolean(v.levels && !v.levels.includes(level));
    if (b.hidden && b.getAttribute('aria-pressed') === 'true') views.select(0);
  });
}
syncViews();
$('b-reset').onclick = resetAll;
$('t-reset').onclick = resetAll;

function toggle(id, key, after) {
  $(id).onclick = () => {
    ui[key] = !ui[key];
    $(id).classList.toggle('on', ui[key]);
    after?.();
  };
}
toggle('t-feed', 'feed', () => document.body.classList.toggle('feed', ui.feed && camOn));
toggle('t-skel', 'skeleton');
toggle('t-labels', 'labels');
$('t-full').onclick = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.());

// ------------------------------------------------------------------ camera + tracking
const tracker = new HandTracker();
const engine = new GestureEngine();
let camOn = false;
let lastVideoTime = -1;
let perc = { hands: [] };

async function startCamera() {
  $('start').classList.add('gone');
  $('start').inert = true;
  setTracking('Starting…', 'warn');
  if (!navigator.mediaDevices?.getUserMedia || !window.isSecureContext) {
    enterMouseMode('The camera requires HTTPS or http://localhost.');
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }, audio: false });
    video.srcObject = stream;
    await video.play();
    camOn = true;
    ui.feed = true;
    $('t-feed').classList.add('on');
    document.body.classList.add('feed');
  } catch (e) {
    console.warn(e);
    enterMouseMode(e && e.name === 'NotAllowedError' ? 'Camera access was blocked. Allow permission in your browser and reload.' : 'No camera was detected.');
    return;
  }
  setTracking('Loading hand model…', 'warn');
  try {
    await tracker.init();
    setTracking('Hands on', 'ok');
    showBanner('');
  } catch (e) {
    console.error(e);
    setTracking('Mouse only', 'warn');
    showBanner('The hand-tracking model did not load. It needs an internet connection initially; you can still use the mouse.');
  }
}

function enterMouseMode(msg) {
  setTracking('Mouse only', 'warn');
  if (msg) showBanner(msg + ' Mouse controls are enabled.', true);
}

function setTracking(text, cls) {
  trackingState = text;
  const el = $('s-track');
  el.textContent = text;
  el.className = cls || '';
}

$('btn-cam').onclick = startCamera;
$('btn-tour').onclick = () => {
  $('start').classList.add('gone');
  $('start').inert = true;
  enterMouseMode('');
  startTour();
};
$('btn-mouse').onclick = () => {
  $('start').classList.add('gone');
  $('start').inert = true;
  enterMouseMode('');
  $('mode-explore').focus();
};

/** raw camera landmark -> viewport 0..1 (mirrored, matches object-fit: cover) */
function mapPoint(p) {
  const vw = video.videoWidth || 1280, vh = video.videoHeight || 720;
  const s = Math.max(W / vw, H / vh);
  const ox = (W - vw * s) / 2, oy = (H - vh * s) / 2;
  return { x: ((1 - p.x) * vw * s + ox) / W, y: (p.y * vh * s + oy) / H };
}

// ------------------------------------------------------------------ gesture -> action
// Every command is a hand shape held still (src/hold.js); only an open hand moving acts at once, by turning the Earth.
let zoomRef = null;
let twoSince = -1;
let twoActive = false;
let primaryId = null;
const TWO_HOLD = 0.25;
const TWO_FIST_S = 1; // two fists held this long (and still) reset the model
let twoFist = null; // { d: palm distance when the fists started, s: seconds held, done }
const prevPalm = new Map();
const hold = new Hold();
const fireLog = []; // fired commands, read by the ?debug test
let activeKey = '';

function setActive(key) {
  if (key === activeKey) return;
  activeKey = key;
  document.querySelectorAll('#gest li').forEach((li) => li.classList.toggle('active', li.dataset.g === key));
}

// the panel rows say what each held shape will do now
const gestText = { PEACE: $('gest-peace') };
const gestRings = { PEACE: $('ring-peace') };
const resetRing = $('ring-reset');
function updateLegend() {
  const last = scene.sel >= 0 && layerOrder().at(-1).id === scene.parts[scene.sel]?.id;
  const peace = mode === 'lesson' ? 'Continue to the next step' : last ? 'Return to the full Earth model' : 'Next layer';
  if (gestText.PEACE.textContent !== peace) gestText.PEACE.textContent = peace;
  for (const [g, el] of Object.entries(gestRings)) el.style.setProperty('--p', hold.shape === g ? hold.progress.toFixed(3) : '0');
  resetRing.style.setProperty('--p', twoFist ? Math.min(1, twoFist.s / TWO_FIST_S).toFixed(3) : '0');
}

const pointer = mountPointer();
function control(t, dt, freshFrame) {
  const live = perc.hands.filter((h) => !h.held);
  // one hand pointing drives the on-screen cursor (ui/pointer.js), even while a walkthrough plays
  const pointing = live.length === 1 && live[0].gesture === 'POINT' ? live[0] : null;
  pointer.update(pointing?.tip || null, dt);
  $('s-hands').textContent = String(live.length);
  if (walkthroughPlaying || mouseDrag) {
    hold.reset();
    scene.holdVel = Boolean(mouseDrag);
    zoomRef = null;
    twoActive = false;
    twoSince = -1;
    prevPalm.clear();
    setActive('');
    return;
  }

  // two hands: distance between palms = zoom. Held hands count, so a one-frame dropout doesn't fall back to one-hand rotate.
  // A second hand must stay TWO_HOLD seconds first, so a stray detection can't interrupt a one-hand gesture.
  const both = live.length >= 1 && perc.hands.length >= 2;
  if (!both) twoSince = -1;
  else if (twoSince < 0) twoSince = t;
  twoActive = both && t - twoSince >= TWO_HOLD;
  if (twoActive) {
    hold.reset();
    scene.holdVel = true;
    scene.idle = 0;
    prevPalm.clear();
    // after a reset, zoom stays off until the hands part, so fists still held can't drift the zoom (live run 2026-11-22)
    if (twoFist?.done) return setActive('RESET');
    const a = perc.hands[0].palm, b = perc.hands[1].palm;
    const dist = Math.hypot((a.x - b.x) * W, (a.y - b.y) * H);
    if (!zoomRef) zoomRef = { d0: Math.max(60, dist), s0: scene.scaleTarget };
    scene.scaleTarget = clamp((zoomRef.s0 * dist) / zoomRef.d0, 0.5, 2.6);
    // two fists held still: reset. Moving them apart or together restarts the hold, so zooming with fists is safe.
    const fists = perc.hands[0].gesture === 'FIST' && perc.hands[1].gesture === 'FIST';
    if (!fists) twoFist = null;
    else if (!twoFist || Math.abs(dist - twoFist.d) > 0.06 * W) twoFist = { d: dist, s: 0, done: false };
    else if (!twoFist.done && (twoFist.s += dt) >= TWO_FIST_S) {
      twoFist.done = true;
      fireLog.push({ g: 'RESET', t });
      resetAll();
      zoomRef = null;
    }
    setActive(fists ? 'RESET' : 'TWO');
    return;
  }
  zoomRef = null;
  twoFist = null;

  // stay with the hand already in control; a newly detected hand doesn't take over
  const h = live.find((x) => x.id === primaryId) || live[0];
  primaryId = h ? h.id : null;
  if (!h) {
    hold.reset();
    scene.holdVel = false;
    scene.setHover(mouseHover);
    prevPalm.clear();
    setActive('');
    return;
  }

  scene.holdVel = true;
  scene.idle = 0;
  const g = h.gesture;
  const fired = hold.update(g, h.palm, t, dt, freshFrame);
  if (fired) {
    fireLog.push({ g: fired, t });
    if (tour) tourMove(1);
    else mode === 'lesson' ? lessonMove(true) : browseParts(1);
  }

  const palmPx = { x: h.palm.x * W, y: h.palm.y * H };
  if (g === 'OPEN' || g === 'NONE') {
    // an open or loose hand turns the Earth; a peace sign or fist keeps it still
    const prev = prevPalm.get(h.id);
    if (prev) {
      const dx = palmPx.x - prev.x, dy = palmPx.y - prev.y;
      if (Math.hypot(dx, dy) > 1.5) scene.rotateBy(dx * 0.0048, dy * 0.0032, dt);
    }
    if (h.rollDelta) scene.rollBy(h.rollDelta * 0.7);
    setActive('MOVE');
  } else setActive(g in HOLD_S || g === 'POINT' ? g : '');
  prevPalm.set(h.id, palmPx);
}

// ------------------------------------------------------------------ Stuck? menu: back, replay, jump to a step, ask
const titleOf = (id) => EARTH[level].parts.find((p) => p.id === id)?.title || id;
mountStuck($('stuck'), $('stuck-menu'), {
  current() {
    if (drill) return { names: drill.names, at: drill.current(), back: drill.back, replay: drill.replay, jump: drill.jump };
    if (mode === 'lesson') {
      return {
        names: lesson.steps.map((s, k) => `${k + 1}. ${titleOf(s.focus)}`), at: lesson.i,
        back: () => lessonMove(false), replay: enterStep, jump: (k) => { lesson.i = k; enterStep(); },
      };
    }
    if (tour) return { names: tour.steps.map((s) => s.title), at: tour.i, back: () => tourMove(-1), replay: showTourStep, jump: (k) => { tour.i = k; showTourStep(); } };
    return null;
  },
  idle: [['Reset the model', resetAll], ['Play the tour', startTour]],
  ask() {
    const bank = document.querySelector('.question-bank');
    bank.open = true;
    bank.scrollIntoView({ block: 'nearest' });
    bank.querySelector('input, textarea')?.focus();
  },
});

// ------------------------------------------------------------------ mouse + keyboard
const onUi = (e) => e.target.closest && e.target.closest('#panel,#toolbar,#viewbar,#start,#tour,#stuck,#stuck-menu');

addEventListener('pointerdown', (e) => {
  if (e.button !== 0 || !e.isPrimary || onUi(e)) return;
  pauseTour(true); // looking closer with the mouse pauses the tour
  setWalkthrough(false);
  const part = e.shiftKey ? -1 : scene.pick(e.clientX, e.clientY, 36, scene.sel);
  mouseDrag = { id: e.pointerId, part, x: e.clientX, y: e.clientY, moved: false };
});
addEventListener('pointermove', (e) => {
  if (!mouseDrag) {
    mouseHover = onUi(e) ? -1 : scene.pick(e.clientX, e.clientY, 80, mouseHover);
    return;
  }
  if (mouseDrag.id !== e.pointerId) return;
  const dx = e.clientX - mouseDrag.x, dy = e.clientY - mouseDrag.y;
  if (!mouseDrag.moved) {
    if (Math.hypot(dx, dy) < 7) return;
    mouseDrag.moved = true;
    if (mouseDrag.part >= 0) isolateForInspection(mouseDrag.part);
  }
  scene.holdVel = true;
  if (mouseDrag.part >= 0) scene.dragPart(dx, dy);
  else scene.rotateBy(dx * 0.006, dy * 0.004, 1 / 60);
  mouseDrag.x = e.clientX;
  mouseDrag.y = e.clientY;
});
addEventListener('pointerup', (e) => {
  if (mouseDrag?.id !== e.pointerId) return;
  const moved = mouseDrag.moved;
  mouseDrag = null;
  scene.holdVel = false;
  if (!moved && mode === 'explore' && scene.isolatedPart < 0) {
    const idx = scene.pick(e.clientX, e.clientY, 80);
    scene.setSel(idx === scene.sel ? -1 : idx);
    showPart(scene.sel);
  }
});
// double-click anywhere off the panel: reset
addEventListener('dblclick', (e) => {
  if (!onUi(e)) resetAll();
});
addEventListener('pointercancel', (e) => {
  if (mouseDrag?.id === e.pointerId) mouseDrag = null;
});
addEventListener('blur', () => (mouseDrag = null));
addEventListener('wheel', (e) => {
  if (onUi(e)) return;
  scene.zoomBy(Math.exp(-e.deltaY * 0.0012));
}, { passive: true });
addEventListener('keydown', (e) => {
  if (e.target.closest?.('input[type=search], textarea, select, #lesson-activity')) return;
  if (e.target.tagName === 'INPUT' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  if (e.key === ' ') {
    if (e.target.closest?.('button, summary')) return;
    e.preventDefault();
    scene.explodeTarget = scene.explodeTarget > 0.5 ? 0 : 1;
  } else if (e.key === 'Escape' && (walkthroughPlaying || scene.isolatedPart >= 0)) {
    if (walkthroughPlaying) setWalkthrough(false);
    else if (mode === 'lesson') setMode('explore');
    else restoreParts();
  } else if (tour && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) tourMove(e.key === 'ArrowRight' ? 1 : -1);
  else if (tour && e.key === 'Escape') stopTour();
  else if (e.key === 'ArrowRight') mode === 'lesson' ? lessonMove(true) : browseParts(1);
  else if (e.key === 'ArrowLeft') mode === 'lesson' ? lessonMove(false) : browseParts(-1);
  else if (e.key.toLowerCase() === 'r') $('b-reset').click();
  else if (e.key >= '1' && e.key <= String(MODELS.length)) scene.setModel(+e.key - 1);
});

// ------------------------------------------------------------------ overlay drawing
const ringR = new Map();

function drawHand(h) {
  const pts = h.lm.map((p) => ({ x: p.x * W, y: p.y * H }));
  ctx.save();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(236, 232, 255, 0.78)';
  ctx.shadowColor = 'rgba(176, 164, 255, 0.95)';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  for (const [a, b] of HAND_CONNECTIONS) {
    ctx.moveTo(pts[a].x, pts[a].y);
    ctx.lineTo(pts[b].x, pts[b].y);
  }
  ctx.stroke();
  ctx.fillStyle = '#fff';
  for (const p of pts) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawRing(h) {
  const pts = h.lm;
  const cx = h.palm.x * W, cy = h.palm.y * H;
  const len = Math.hypot((pts[0].x - pts[12].x) * W, (pts[0].y - pts[12].y) * H);
  const target = len * 0.95 + 22;
  const r = (ringR.get(h.id) ?? target) * 0.85 + target * 0.15;
  ringR.set(h.id, r);
  ctx.save();
  ctx.lineCap = 'round';
  ctx.shadowColor = 'rgba(242, 201, 76, 0.9)';
  ctx.shadowBlur = 14;
  ctx.strokeStyle = 'rgba(242, 201, 76, 0.55)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  // the hold filling up: the command fires when the white arc closes
  const p = h.id === primaryId ? hold.progress : 0;
  if (p > 0.01) {
    ctx.shadowColor = 'rgba(255,255,255,0.9)';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p);
    ctx.stroke();
  }
  ctx.restore();
  if (p > 0.01 && !(p >= 1)) tipLabel(gestText[hold.shape].textContent, '#f2c94c', cx - r, cy + r + 18);
}

function tipLabel(text, color, x, y) {
  ctx.save();
  ctx.font = '600 13px ui-sans-serif, system-ui, "Segoe UI", sans-serif';
  ctx.textBaseline = 'middle';
  const w = ctx.measureText(text).width;
  ctx.fillStyle = 'rgba(10, 10, 20, 0.78)';
  ctx.fillRect(x - 7, y - 12, w + 14, 24);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawZoom(a, b) {
  const x1 = a.palm.x * W, y1 = a.palm.y * H, x2 = b.palm.x * W, y2 = b.palm.y * H;
  ctx.save();
  ctx.strokeStyle = 'rgba(242, 201, 76, 0.85)';
  ctx.setLineDash([6, 6]);
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(242, 201, 76, 0.8)';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#fff';
  ctx.font = '600 13px ui-sans-serif, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowBlur = 6;
  const label = twoFist ? (twoFist.done ? 'reset' : `hold to reset ${Math.round((100 * twoFist.s) / TWO_FIST_S)}%`) : `zoom ${scene.scale.toFixed(2)}x`;
  ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 - 12);
  ctx.restore();
}

function drawLabels() {
  const e = clamp((scene.shownExplode - 0.1) / 0.3, 0, 1);
  if (e <= 0.01 || scene.uniforms.uScatter.value > 0.3) return;
  // only the part being pointed at and the selected one, unless 'show all labels' is on
  const all = scene.labelPoints();
  const pts = all.filter((p) => ui.labels || p.i === scene.hover || p.i === scene.sel);
  if (!pts.length) return;
  const c = scene.centerScreen();
  const panelR = W > 900 ? 310 : 0;
  const left = [], right = [];
  for (const p of pts) (p.x < c.x ? left : right).push(p);
  // label columns sit outside the whole model, even when only one label shows
  const maxX = Math.max(...all.map((p) => p.x), c.x);
  const minX = Math.min(...all.map((p) => p.x), c.x);
  const colR = clamp(maxX + 80, panelR + 360, W - 170);
  const colL = clamp(minX - 80, panelR + 20, W - 400);
  ctx.save();
  ctx.globalAlpha = e;
  ctx.font = '500 12px ui-sans-serif, system-ui, "Segoe UI", sans-serif';
  ctx.textBaseline = 'middle';
  const place = (list, colX, dir) => {
    list.sort((a, b) => a.y - b.y);
    const ys = list.map((p) => p.y);
    for (let i = 1; i < ys.length; i++) if (ys[i] < ys[i - 1] + 20) ys[i] = ys[i - 1] + 20;
    const over = ys.length ? ys[ys.length - 1] - (H - 90) : 0;
    if (over > 0) for (let i = 0; i < ys.length; i++) ys[i] -= over;
    list.forEach((p, k) => {
      const hot = p.i === scene.hover || p.i === scene.sel;
      const ly = clamp(ys[k], 24, H - 24);
      ctx.strokeStyle = hot ? p.color : 'rgba(255,255,255,0.38)';
      ctx.lineWidth = hot ? 1.6 : 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(colX - dir * 16, ly);
      ctx.lineTo(colX, ly);
      ctx.stroke();
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, hot ? 4 : 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = hot ? '#fff' : 'rgba(255,255,255,0.82)';
      ctx.font = `${hot ? 600 : 500} ${hot ? 13 : 12}px ui-sans-serif, system-ui, "Segoe UI", sans-serif`;
      ctx.textAlign = dir > 0 ? 'left' : 'right';
      ctx.fillText(p.name, colX + dir * 6, ly);
    });
  };
  place(right, colR, 1);
  place(left, colL, -1);
  ctx.restore();
}

function drawOverlay() {
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, W, H);
  drawLabels();
  const live = perc.hands.filter((h) => !h.held);
  if (ui.skeleton) for (const h of live) drawHand(h);
  for (const h of live) drawRing(h);
  if (twoActive) drawZoom(perc.hands[0], perc.hands[1]);
}

// ------------------------------------------------------------------ main loop
let lastT = performance.now() / 1000;
function frame(now) {
  const t = now / 1000;
  const dt = Math.min(0.05, Math.max(0.001, t - lastT));
  lastT = t;

  const freshFrame = camOn && tracker.ready && video.readyState >= 2 && video.currentTime !== lastVideoTime;
  if (freshFrame) {
    lastVideoTime = video.currentTime;
    const hands = tracker.detect(video, now);
    perc = engine.update(hands, t, mapPoint, (video.videoWidth || 16) / (video.videoHeight || 9));
  }
  control(t, dt, freshFrame);
  updateLegend();
  if (viewTarget && !scene.holdVel) {
    // ease toward the lesson step's view; a hand or mouse steering the model takes over
    const k = Math.min(1, dt * 3);
    for (const a of ['x', 'y', 'z']) scene.rot[a] += (viewTarget[a] - scene.rot[a]) * k;
    scene.vel.x = scene.vel.y = 0;
    if (['x', 'y', 'z'].every((a) => Math.abs(viewTarget[a] - scene.rot[a]) < 0.01)) viewTarget = null;
  }

  if (!draggingExplode) rExplode.value = Math.round(clamp(scene.explode, 0, 1) * 100);
  $('v-explode').textContent = Math.round(clamp(scene.explode, 0, 1) * 100) + '%';
  $('b-explode').textContent = scene.explodeTarget > 0.5 ? 'Assemble' : 'Explode';

  tourTick(dt);
  quake.tick(dt, scene.uniforms.uMotion.value === 0);
  scene.update(dt, t);
  drawOverlay();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// ?debug in the URL adds a guided gesture test with a results table
if (new URLSearchParams(location.search).has('debug')) {
  import('./debugTest.js').then((m) =>
    m.mount(() => ({
      gesture: activeKey,
      hover: scene.hover,
      sel: scene.sel,
      model: scene.index,
      level,
      fired: fireLog,
      hold: hold.progress,
      parts: scene.parts,
      hands: perc.hands.filter((h) => !h.held).sort((a, b) => (b.id === primaryId) - (a.id === primaryId)),
      tracking: trackingState,
      isolated: scene.isolatedPart,
      scale: scene.scaleTarget,
      frameTime: lastVideoTime,
      aspect: W / H,
    }), () => {
      setMode('explore');
      restoreParts();
      scene.setSel(-1);
      showPart(-1);
    }),
  );
}
