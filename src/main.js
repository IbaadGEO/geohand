import '@fontsource-variable/manrope'; // bundled with the app: no font request leaves the page
import '@fontsource/barlow-semi-condensed/latin-500.css';
import '@fontsource/barlow-semi-condensed/latin-600.css';
import '@fontsource/jetbrains-mono/latin-400.css';
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
import { openAsk, browserName } from './ui/ask.js';
import { mountPlacement } from './ui/placement.js';
import { renderRich } from './ui/richText.js';
import { MISSION, MISSION_STEPS, predictionNote } from './content/earth/mission.js';
import { createIntro, labelsOpen } from './ui/intro.js';
import { Lesson } from './lesson.js';
import { LESSONS } from './content/earth/lessons.js';
import { showCrustActivity } from './ui/crustActivity.js';
import { mountPointer, UI } from './ui/pointer.js';
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
  $('level-who').textContent = `${LEVELS.find((l) => l.id === level).who} ${EARTH[level].parts.length} parts.`;
};
markLevel();
$('btn-place').onclick = () => {
  $('btn-place').hidden = true;
  $('place').hidden = false;
  mountPlacement($('place'), setLevel);
};

// ------------------------------------------------------------------ lessons
let lesson = new Lesson(LESSONS[level]);
let viewTarget = null; // eased camera angle for the current lesson step
let walkthroughPlaying = false;
let walkthroughTimer;
let walkthroughComplete = false;

function setWalkthrough(playing) {
  walkthroughPlaying = playing;
  clearTimeout(walkthroughTimer);
  $('lesson-play').textContent = playing ? 'Pause the lesson' : 'Play this lesson for me';
  $('lesson-play').setAttribute('aria-pressed', String(playing));
}

function setMode(m, keepIsolation = false) {
  if (m === 'lesson') endMission();
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
  if (viewNow) views.select(0); // each stop starts on Layers and offers its own view
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
  fillSee($('lesson-see'), s.focus);
  if (walkthroughPlaying || s.activity) $('lesson-see').hidden = true;
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
  const i = scene.parts.findIndex((p) => p.id === picked);
  if (drillPick) return void (i >= 0 && drillPick(i)); // a find-the-part task: choosing it from the list counts too
  setMode('explore');
  scene.setSel(i);
  showPart(i);
};

function setLevel(id) {
  if (id === level) return;
  stopTour(); // its steps belong to the old level
  endMission();
  closeLearn();
  const selId = scene.sel >= 0 ? scene.parts[scene.sel]?.id : null;
  pendingSel = mapPart(selId, level, id);
  level = id;
  if (mode === 'lesson') setMode('explore'); // the old level's lesson no longer applies
  saveLevel(id);
  lesson = new Lesson(LESSONS[id]);
  lesson.jumpToPart(pendingSel);
  scene.reload(scene.index, id);
  partTargets = []; // pointing targets are per part index; the new level has other parts
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
  drillPick = null;
  learnHost.hidden = true;
  learnHost.replaceChildren();
  $('info').hidden = false;
  showPart(scene.sel);
}
/** Sets up and saves the 3D model for the drill-in stages of part index i. */
let drillPick = null; // while a drill-in asks the learner to find its part: (picked index) => void
const drillModel = (i) => ({
  whole() {
    drillPick = null;
    views.select(0);
    scene.isolate();
    scene.setSel(-1);
    scene.explodeTarget = 0;
    scene.scaleTarget = 1;
    showPart(-1);
  },
  where() {
    drillPick = null;
    views.select(0);
    scene.isolate();
    scene.setSel(i);
    scene.explodeTarget = 0.65; // open the Earth so the layer shows in place
    scene.scaleTarget = 1.2;
    showPart(i);
  },
  why(viewId) {
    drillPick = null;
    views.select(VIEWS.findIndex((v) => v.id === viewId));
    scene.setSel(i);
    showPart(i);
  },
  // "Your turn": the Earth opened, nothing highlighted, and the next pick goes to the drill-in
  seek() {
    drillPick = null;
    views.select(0);
    scene.isolate();
    scene.setSel(-1);
    scene.explodeTarget = 0.65;
    scene.scaleTarget = 1.2;
    showPart(-1);
  },
  onPick(found) {
    drillPick = (j) => {
      const ok = j === i;
      if (ok) {
        drillPick = null;
        scene.setSel(i);
        showPart(i);
      }
      found(ok, scene.parts[j]?.name || 'empty space');
    };
  },
  capture: () => ({
    view: scene.uniforms.uProp.value, explode: scene.explodeTarget, iso: scene.isolatedPart,
    pull: { x: scene.pullTarget.x, y: scene.pullTarget.y }, sel: scene.sel, scale: scene.scaleTarget,
    rot: { ...(viewTarget || scene.rot) },
  }),
  restore(p) {
    drillPick = null; // "Your turn" re-arms it when it is shown again
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
// phones: the panel is a bar that opens on demand, and opens itself when learning content lands in it
function openPanel(open = true) {
  $('panel').classList.toggle('open', open);
  $('panel-toggle').setAttribute('aria-expanded', open);
  $('panel-toggle').textContent = open ? 'Close' : 'Menu';
}
$('panel-toggle').onclick = () => openPanel(!$('panel').classList.contains('open'));

$('part-learn').onclick = () => {
  openPanel();
  const i = scene.sel;
  const content = EARTH[level].parts.find((c) => c.id === scene.parts[i]?.id);
  const loop = content && loopFor(level, content.id);
  if (!loop) return;
  stopTour();
  if (mode === 'lesson') setMode('explore');
  $('info').hidden = true;
  drill = runLoop(learnHost, { level, part: content, loop, model: drillModel(i), onClose: closeLearn, hands: camOn });
  $('part-learn').hidden = true;
  learnHost.scrollIntoView({ block: 'start', behavior: 'smooth' });
};

/** Pick part i (or -1) with the mouse or by pointing: select it and show its card. */
function pickPart(i) {
  if (drillPick) return void (i >= 0 && drillPick(i)); // the drill-in's find-the-part task takes the pick
  scene.setSel(i);
  cardClosed = -1;
  showPart(i);
}

// ------------------------------------------------------------------ part card: learn this part, or start the lesson here
const card = $('part-card');
let cardKey = '', cardClosed = -1;
/** The lesson step a part starts from: its own, or (Normal has fewer steps) the layer it belongs to. */
const stepFocus = (id) => (lesson.steps.some((s) => s.focus === id) ? id : { asthenosphere: 'mantle', cmb: 'outer-core' }[id] || id);
function fillCard(i) {
  cardKey = `${level}:${i}`;
  const p = EARTH[level].parts.find((c) => c.id === scene.parts[i]?.id);
  if (!p) return;
  $('pc-title').textContent = p.title;
  renderRich($('pc-hook'), p.questions?.[0]?.q || p.short); // the part's own first cited question is the hook
  const loop = loopFor(level, p.id);
  $('pc-learn').hidden = !loop;
  const done = loadProgress()[level]?.[p.id];
  if (loop) $('pc-learn').lastChild.textContent = `${loop.tests.length + 1} questions, about 2 minutes${done ? ` · last time ${done.score} of ${done.total}` : ''}`;
  const k = lesson.steps.findIndex((s) => s.focus === stepFocus(p.id));
  const n = lesson.steps.length - Math.max(0, k);
  $('pc-walk').firstChild.textContent = k < 0 ? 'Start the lesson' : 'Start the lesson here';
  $('pc-walk').lastChild.textContent = `${n} step${n === 1 ? '' : 's'}`;
}
function updateCard() {
  const i = scene.sel;
  const show = i >= 0 && i !== cardClosed && mode === 'explore' && !tour && !drill && !intro && !mission && scene.isolatedPart < 0;
  card.hidden = !show;
  if (!show) return;
  if (cardKey !== `${level}:${i}`) fillCard(i);
  fillSee($('pc-view'), scene.parts[i]?.id);
  const all = scene.labelPoints(), p = all.find((q) => q.i === i);
  if (!p) return;
  // outside the model, on the side away from the part's label, so it never covers the part; clear of the side panel
  const c = scene.centerScreen(), reach = Math.max(...all.map((q) => Math.abs(q.x - c.x)));
  const w = card.offsetWidth, h = card.offsetHeight, panelR = W > 900 ? 310 : 0;
  const x = clamp(p.x >= c.x ? c.x - reach - w - 32 : c.x + reach + 32, panelR + 8, W - w - 8);
  card.style.transform = `translate(${x}px, ${clamp(p.y - h / 2, 70, H - h - 8)}px)`;
}
$('pc-close').onclick = () => (cardClosed = scene.sel);
$('pc-learn').onclick = () => $('part-learn').click();
$('pc-walk').onclick = () => $('part-study').click();
$('pc-view').onclick = (e) => views.select(+e.currentTarget.dataset.view);
$('lesson-see').onclick = (e) => {
  views.select(+e.currentTarget.dataset.view);
  scene.setSel(scene.parts.findIndex((p) => p.id === lesson.step.focus)); // keep the stop's part picked in the new view
  e.currentTarget.hidden = true;
};

function showPart(i) {
  const p = i >= 0 ? scene.parts[i] : null;
  layerPicker.value = p?.id || '';
  panel.show(p ? EARTH[level].parts.find((c) => c.id === p.id) || null : null, REFS, p?.color, level === 'alevel');
  const button = $('part-pull');
  button.hidden = mode === 'lesson' || (!p && scene.isolatedPart < 0);
  button.textContent = scene.isolatedPart >= 0 ? 'Put all parts back' : 'Move this part aside';
  $('part-study').hidden = mode !== 'explore' || !p;
  const learn = $('part-learn');
  learn.hidden = mode !== 'explore' || !p || !loopFor(level, p.id) || !$('learn').hidden;
  const done = p && loadProgress()[level]?.[p.id];
  learn.textContent = done ? `Learn about this part again (last time ${done.score} of ${done.total})` : 'Learn about this part: about 2 minutes';
}

$('part-study').onclick = () => {
  lesson.jumpToPart(stepFocus(layerPicker.value));
  setMode('lesson');
  openPanel();
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
  if (intro) endIntro();
  endMission();
  setWalkthrough(false);
  if (mode === 'lesson') setMode('explore');
  scene.resetView();
  scene.autoSpin = true;
  $('b-spin').classList.add('on');
  closeLearn();
  const checks = Object.fromEntries(Object.entries(LOOPS[level] || {}).filter(([, l]) => !l.recall).map(([id, l]) => [id, l.tests.at(-1)])); // the drill-in's last question, so the tour never asks the drill-in's opener; multiple choice only
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
let draggingExplode = false;
rExplode.addEventListener('pointerdown', () => (draggingExplode = true));
addEventListener('pointerup', () => (draggingExplode = false));
rExplode.addEventListener('input', () => (scene.explodeTarget = rExplode.value / 100));

$('b-explode').onclick = () => (scene.explodeTarget = scene.explodeTarget > 0.5 ? 0 : 1);
$('b-spin').onclick = () => {
  scene.autoSpin = !scene.autoSpin;
  $('b-spin').classList.toggle('on', scene.autoSpin);
};
/** Back to the original model from any state: whole Earth, assembled, starting view and zoom, nothing highlighted. */
function resetAll() {
  endMission();
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
let viewNow = 0;
let mission = null; // the running earthquake mission: { i: step index, predicted: layer id }
let missionView = false; // true while the mission itself changes the view
const views = mountViewSwitch($('views'), $('legend'), (i) => {
  if (mission && !missionView) endMission(); // the learner chose another view: the mission's step no longer matches the model
  viewNow = i;
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
}, () => level);
/** The view that best shows a part (its drill-in's evidence view), or -1 when Layers already does. */
function bestView(partId) {
  const v = loopFor(level, partId)?.see?.view;
  const i = VIEWS.findIndex((x) => x.id === v);
  return i > 0 && !document.querySelector(`#views [data-view="${v}"]`)?.hidden ? i : -1;
}
/** Fill a "See it in …" button for a part; hidden when there is no better view or it is already showing. */
function fillSee(btn, partId) {
  const i = bestView(partId);
  btn.hidden = i < 0 || i === viewNow;
  if (i < 0) return;
  btn.dataset.view = i;
  btn.firstChild.textContent = `See it in ${VIEWS[i].label}`;
  btn.lastChild.textContent = VIEWS[i].title || '';
}
/** Views limited to some levels (VIEWS[i].levels) are hidden elsewhere; a hidden view in use falls back to Layers. */
function syncViews() {
  document.querySelectorAll('#views [data-view]').forEach((b) => {
    const v = VIEWS.find((x) => x.id === b.dataset.view);
    b.hidden = Boolean(v.levels && !v.levels.includes(level));
    if (b.hidden && b.getAttribute('aria-pressed') === 'true') views.select(0);
  });
  views.refresh(); // level-specific legend notes
}
syncViews();
$('b-reset').onclick = resetAll;
$('reset-earth').onclick = () => {
  fireLog.push({ g: 'RESET', t: performance.now() / 1000 });
  resetAll();
};
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
    document.body.classList.add('hands'); // hand-only controls show from here on
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
    camNote = 'Hand tracking did not load, so use the mouse. ';
    showBanner('The hand-tracking model did not load. It needs an internet connection initially; you can still use the mouse.');
  }
}

let camNote = ''; // why the intro gives mouse steps after the camera was asked for
function enterMouseMode(msg) {
  setTracking('Mouse only', 'warn');
  if (msg) camNote = 'The camera is not available, so use the mouse. ';
  if (msg) showBanner(msg + ' Mouse controls are enabled.', true);
}

function setTracking(text, cls) {
  trackingState = text;
  const el = $('s-track');
  el.textContent = text;
  el.className = cls || '';
}

$('btn-cam').onclick = () => {
  startCamera();
  startIntro();
};
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
  startIntro();
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
const PULL = 0.2; // how far apart (share of the screen width) the open hands move to open the Earth fully
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
function updateLegend() {
  const last = scene.sel >= 0 && layerOrder().at(-1).id === scene.parts[scene.sel]?.id;
  const peace = mode === 'lesson' ? 'Continue to the next step' : last ? 'Return to the full Earth model' : 'Next layer';
  if (gestText.PEACE.textContent !== peace) gestText.PEACE.textContent = peace;
  for (const [g, el] of Object.entries(gestRings)) el.style.setProperty('--p', hold.shape === g ? hold.progress.toFixed(3) : '0');
}

const pointer = mountPointer();
// pointing at the model hovers the part under the fingertip; holding still picks it (one stable target per part for the dwell)
let partTargets = [], pointedPart = false;
let openSpot = null, openedAt = null; // where the fingertip opened the Earth: no layer is picked until it moves away
function atModel(x, y) {
  if (mode !== 'explore' || tour || (drill && !drillPick) || scene.isolatedPart >= 0) return null;
  // a closed Earth: every layer has dots within a few pixels of the fingertip, so "the nearest layer" is noise
  // (measured 2026-11-23). Pointing and holding on it opens it instead; layers can be picked once they have come apart.
  if (scene.explodeTarget < 0.5 && scene.shownExplode < 0.5) {
    pointedPart = true;
    scene.setHover(-1);
    if (scene.pick(x, y, 80) < 0) return null;
    openSpot = { x, y };
    return openTarget;
  }
  // still on the spot that opened it: a label with nothing to click, so the hold does not run on into a pick or refill
  if (openedAt && Math.hypot(x - openedAt.x, y - openedAt.y) < 60) return movedTarget;
  openedAt = null;
  // sticky: the candidate part stays until the fingertip is clearly nearer another, so small wobbles don't restart the hold
  const i = scene.pick(x, y, 80, pointedPart ? scene.hover : -1);
  scene.setHover(i);
  pointedPart = true;
  if (i < 0) return null;
  return (partTargets[i] ||= { click: () => pickPart(i), name: scene.parts[i].name });
}
const openTarget = { click: () => ((scene.explodeTarget = 1), (openedAt = openSpot)), name: 'Hold to open the Earth' };
const movedTarget = { name: 'Move to a layer to pick it' }; // no click: shown beside the fingertip, never held
function control(t, dt, freshFrame) {
  const live = perc.hands.filter((h) => !h.held);
  // one hand pointing drives the on-screen cursor (ui/pointer.js), even while a walkthrough plays
  const pointing = live.length === 1 && live[0].gesture === 'POINT' ? live[0] : null;
  if (!pointing && pointedPart) { scene.setHover(mouseHover); pointedPart = false; }
  pointer.update(pointing?.tip || null, dt, atModel);
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
    const a = perc.hands[0].palm, b = perc.hands[1].palm;
    const dist = Math.hypot((a.x - b.x) * W, (a.y - b.y) * H);
    // two open hands pull the Earth apart; two fists zoom. Any other pair, such as one open and one
    // fist, holds the model where it is, and changing shape restarts the reference, so nothing jumps.
    const g0 = perc.hands[0].gesture, g1 = perc.hands[1].gesture;
    const kind = g0 === 'FIST' && g1 === 'FIST' ? 'zoom' : g0 === 'OPEN' && g1 === 'OPEN' ? 'pull' : null;
    if (!kind) {
      zoomRef = null;
      return setActive('');
    }
    if (!zoomRef || zoomRef.kind !== kind) {
      // hands starting very close give no steady baseline: wait until they are apart, so nothing jumps before they move
      if (dist < 60) return setActive(kind === 'zoom' ? 'ZOOM' : 'TWO');
      zoomRef = { kind, d0: dist, near: dist, s0: scene.scaleTarget, e0: scene.explodeTarget, set: scene.explodeTarget };
    }
    if (kind === 'zoom') scene.scaleTarget = clamp((zoomRef.s0 * dist) / zoomRef.d0, 0.5, 2.6);
    // opens by how far the hands have pulled apart from the closest they have been, so raising two open hands already
    // apart does nothing until they pull (a fixed gap opened it the moment they came into view, 2026-11-23), and hands
    // that rose apart can come in and pull again. Only ever opens: lowering both hands brings them together, which
    // closed it in every test run; "Put Earth back together" closes it.
    // shortcut: PULL from one webcam session, revisit with more users
    else {
      // closed some other way (reset, button) while the hands are up: the pull starts again from here, or it reopens at once
      if (scene.explodeTarget !== zoomRef.set) zoomRef.near = dist;
      zoomRef.near = Math.min(zoomRef.near, dist);
      zoomRef.set = scene.explodeTarget = Math.max(scene.explodeTarget, clamp((dist - zoomRef.near) / (PULL * W), 0, 1));
    }
    setActive(kind === 'zoom' ? 'ZOOM' : 'TWO');
    return;
  }
  zoomRef = null;

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
  idle: [['Reset the model', resetAll], ['Earthquake mission', () => startMission()], ['Watch the tour', startTour], ['Replay the intro', () => { resetAll(); startIntro(true); }]],
  ask() {
    const bank = document.querySelector('.question-bank');
    bank.open = true;
    bank.scrollIntoView({ block: 'nearest' });
    bank.querySelector('input, textarea')?.focus();
  },
  report: (host) =>
    openAsk(host, '', () => ({
      level,
      model: 'earth',
      part: scene.sel >= 0 ? scene.parts[scene.sel].id : 'general',
      input: camOn ? 'hands' : 'mouse',
      view: VIEWS[viewNow].id,
      activity: drill ? 'drill' : mission ? 'mission' : tour ? 'tour' : intro ? 'intro' : mode,
      browser: browserName(navigator.userAgent),
      screen: `${screen.width}x${screen.height}`,
    }), 'bug'),
});

// ------------------------------------------------------------------ mouse + keyboard
const onUi = (e) => e.target.closest && e.target.closest(UI);

addEventListener('pointerdown', (e) => {
  if (e.button !== 0 || !e.isPrimary || onUi(e)) return;
  pauseTour(true); // looking closer with the mouse pauses the tour
  setWalkthrough(false);
  const part = e.shiftKey || (intro && intro.step !== 'point') ? -1 : scene.pick(e.clientX, e.clientY, 36, scene.sel); // in the intro a drag turns the Earth
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
    pickPart(idx === scene.sel ? -1 : idx);
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
  ctx.font = '600 13px "Manrope Variable", system-ui, sans-serif';
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
  ctx.font = '600 13px "Manrope Variable", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowBlur = 6;
  // before anything moves, say what the hands are ready to do
  const still = zoomRef && Math.abs(Math.hypot(x1 - x2, y1 - y2) - zoomRef.d0) < 12;
  const label = !zoomRef ? 'Open both hands to pull apart, or make two fists to zoom'
    : zoomRef.kind === 'pull' ? (still ? 'Both hands open · pull apart to open' : `opened ${Math.round(clamp(scene.explodeTarget, 0, 1) * 100)}%`)
    : still ? 'Two fists · move apart to zoom' : `zoom ${scene.scale.toFixed(2)}x`;
  ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 - 12);
  ctx.restore();
}

function drawLabels() {
  const e = clamp((scene.shownExplode - 0.1) / 0.3, 0, 1);
  if (e <= 0.01 || scene.uniforms.uScatter.value > 0.3) return;
  // only the part being pointed at and the selected one, unless 'show all labels' is on
  const all = scene.labelPoints();
  const flash = introLabels();
  const pts = all.filter((p) => ui.labels || p.i === scene.hover || p.i === scene.sel || flash.has(p.i));
  if (!pts.length) return;
  const c = scene.centerScreen();
  const panelR = W > 900 ? 310 : 0;
  const left = [], right = [];
  for (const p of pts) (p.x < c.x ? left : right).push(p);
  // label columns sit outside the whole model, even when only one label shows
  const maxX = Math.max(...all.map((p) => p.x), c.x);
  const minX = Math.min(...all.map((p) => p.x), c.x);
  ctx.save();
  ctx.globalAlpha = e;
  // each column is placed so its longest name (in the bold, picked style) stays on screen and clear of the side panel
  const LABEL = '"Barlow Semi Condensed", system-ui, sans-serif';
  const tag = (p) => p.name.toUpperCase();
  ctx.font = `600 14px ${LABEL}`;
  ctx.letterSpacing = '1px';
  const widest = (list) => Math.max(0, ...list.map((p) => ctx.measureText(tag(p)).width)) + 20;
  const colR = clamp(maxX + 80, panelR + 360, W - widest(right) - 8);
  const colL = clamp(minX - 80, panelR + widest(left) + 8, W - 400);
  ctx.textBaseline = 'middle';
  const place = (list, colX, dir) => {
    list.sort((a, b) => a.y - b.y);
    const ys = list.map((p) => p.y);
    for (let i = 1; i < ys.length; i++) if (ys[i] < ys[i - 1] + 24) ys[i] = ys[i - 1] + 24; // tags are 22 px tall
    const over = ys.length ? ys[ys.length - 1] - (H - 90) : 0;
    if (over > 0) for (let i = 0; i < ys.length; i++) ys[i] -= over;
    list.forEach((p, k) => {
      const age = flash.get(p.i);
      const hot = p.i === scene.hover || p.i === scene.sel || (age < 1.2 && Math.floor(age * 5) % 2 === 0); // a new label flashes
      const ly = clamp(ys[k], 24, H - 24);
      // a dark edge under each leader line and a dark pill behind each name keep them readable over the white dots
      const lead = () => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(colX - dir * 16, ly);
        ctx.lineTo(colX, ly);
        ctx.stroke();
      };
      ctx.strokeStyle = 'rgba(6, 7, 14, 0.75)';
      ctx.lineWidth = hot ? 4 : 3;
      lead();
      ctx.strokeStyle = hot ? p.color : 'rgba(232,228,218,0.6)';
      ctx.lineWidth = hot ? 1.6 : 1;
      ctx.setLineDash(hot ? [] : [3, 3]);
      lead();
      ctx.setLineDash([]);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, hot ? 4 : 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = `600 ${hot ? 14 : 13}px ${LABEL}`;
      ctx.textAlign = dir > 0 ? 'left' : 'right';
      const tw = ctx.measureText(tag(p)).width, tx = colX + dir * 8;
      const bx = dir > 0 ? tx - 6 : tx - tw - 6;
      ctx.fillStyle = 'rgba(11, 15, 19, 0.9)';
      ctx.fillRect(bx, ly - 11, tw + 12, 22);
      ctx.strokeStyle = hot ? p.color : 'rgba(214, 222, 230, 0.22)';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx + 0.5, ly - 10.5, tw + 11, 21);
      ctx.fillStyle = p.color; // index bar in the part's colour, on the side the leader arrives from
      ctx.fillRect(dir > 0 ? bx : bx + tw + 10, ly - 11, 2, 22);
      ctx.fillStyle = hot ? '#fff' : 'rgba(232,228,218,0.92)';
      ctx.fillText(tag(p), tx, ly + 0.5);
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

// ------------------------------------------------------------------ first-run intro: turn it, pull it apart, pick a part
let intro = null;
const INTRO_KEY = 'geohand.introSeen';
const INTRO_TEXT = {
  turn: ['This is Earth', 'Open your hand and move it to turn the Earth.', 'Drag the Earth to turn it.'],
  pull: ['Now let’s take it apart', 'Raise both open hands and pull them apart, or point at the Earth and hold. Each layer is named as it comes away.', 'Press Pull it apart, or the space bar. Each layer is named as it comes away.'],
  point: ['Pick a part', 'Point at any part and hold still until the ring fills.', 'Click any part to see what it is about.'],
};
let introShown = '', introFlash = new Map(), lastRot = null;
function startIntro(force) {
  try { if (!force && localStorage.getItem(INTRO_KEY) === '1') return; } catch { /* storage blocked: show it */ }
  intro = createIntro();
  introShown = '';
  introFlash = new Map();
  lastRot = null;
  scene.autoSpin = true;
  $('intro').hidden = false;
}
function endIntro() {
  intro = null;
  $('intro').hidden = true;
  try { localStorage.setItem(INTRO_KEY, '1'); } catch { /* not remembered */ }
}
$('intro-skip').onclick = endIntro;
$('intro-pull').onclick = () => (scene.explodeTarget = 1);
function introTick(t) {
  if (!intro) return;
  const r = scene.rot;
  // only turning done by the person counts, not the slow spin
  const dRot = lastRot && scene.holdVel ? Math.abs(r.x - lastRot.x) + Math.abs(r.y - lastRot.y) : 0;
  lastRot = { x: r.x, y: r.y };
  intro.tick({ dRot, explode: scene.shownExplode, sel: scene.sel, t });
  if (intro.step === 'done') {
    endIntro();
    return startMission(); // the motions learnt, the first mission gives them a purpose
  }
  $('intro-progress').hidden = intro.step !== 'turn';
  $('intro-bar').style.width = `${intro.turned * 100}%`;
  const handsOn = camOn && trackingState !== 'Mouse only';
  const key = intro.step + handsOn + camNote;
  if (key === introShown) return;
  if (intro.step === 'point' && !introShown.startsWith('point')) scene.setHover(-1);
  introShown = key;
  const [title, hands, mouse] = INTRO_TEXT[intro.step];
  $('intro-title').textContent = title;
  $('intro-text').textContent = handsOn ? hands : camNote + mouse;
  $('intro-count').textContent = `${intro.index + 1} of 3`;
  $('intro-pull').hidden = intro.step !== 'pull';
}
/** During the intro: labels that have come away, part index -> seconds since each appeared. The newest also glows on the model. */
function introLabels() {
  if (!intro || intro.step === 'turn') return new Map();
  const order = layerOrder().map((p) => scene.parts.findIndex((q) => q.id === p.id)).filter((i) => i >= 0);
  const now = performance.now() / 1000, n = labelsOpen(order.length, scene.shownExplode), ages = new Map();
  order.forEach((i, k) => {
    if (k >= n) return introFlash.delete(i);
    if (!introFlash.has(i)) introFlash.set(i, now);
    ages.set(i, now - introFlash.get(i));
  });
  if (intro.step === 'pull') {
    let newest = -1, age = 1.2;
    for (const [i, a] of ages) if (a < age) [newest, age] = [i, a];
    scene.setHover(newest);
  }
  return ages;
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
  $('b-explode').textContent = scene.explodeTarget > 0.5 ? 'Put back together' : 'Pull apart';

  tourTick(dt);
  introTick(t);
  updateCard();
  // the mission's open step moves on once the Earth is pulled apart
  if (mission && MISSION_STEPS[mission.i] === 'open' && scene.shownExplode >= 0.85) missionNext();
  // with hands, a large reset target appears whenever the model is not in its starting state
  $('reset-earth').hidden = !camOn || Boolean(tour) || Boolean(mission) || (scene.explodeTarget < 0.05 && Math.abs(scene.scaleTarget - 1) < 0.05 && scene.isolatedPart < 0);
  quake.tick(dt, scene.uniforms.uMotion.value === 0);
  scene.update(dt, t);
  drawOverlay();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// ------------------------------------------------------------------ first mission: how an earthquake shows that part of Earth is liquid
// Predict, open the Earth, find the core–mantle boundary, see the waves, then explain. The same steps work by hand or mouse.
const MS = MISSION.steps;
const partIndex = (id) => scene.parts.findIndex((p) => p.id === id);
const missionSelect = (i) => {
  missionView = true;
  views.select(i);
  missionView = false;
};
function startMission() {
  stopTour();
  closeLearn();
  if (intro) endIntro();
  if (mode === 'lesson') setMode('explore');
  restoreParts();
  missionSelect(0);
  scene.setSel(-1); // an Earth already opened (say, at the end of the intro) stays open, and the open step is skipped
  showPart(-1);
  mission = { i: 0, predicted: null };
  $('mission').hidden = false;
  showMission();
}
function endMission() {
  if (!mission) return;
  mission = null;
  drillPick = null;
  $('mission').hidden = true;
}
function missionNext() {
  mission.i++;
  showMission();
}
function showMission() {
  const step = MISSION_STEPS[mission.i];
  const opts = $('mission-options'), fb = $('mission-fb'), next = $('mission-next'), help = $('mission-help');
  const say = (t) => renderRich($('mission-text'), t);
  const choice = (label, fn) => {
    const b = document.createElement('button');
    b.type = 'button';
    renderRich(b, label);
    b.onclick = fn;
    opts.append(b);
    return b;
  };
  const handsOn = camOn && trackingState !== 'Mouse only';
  opts.replaceChildren();
  fb.textContent = '';
  next.hidden = help.hidden = true;
  drillPick = null;
  $('mission-title').textContent = MISSION.title;
  $('mission-count').textContent = step === 'done' ? 'Done' : `Step ${mission.i + 1} of ${MISSION_STEPS.length - 1}`;
  if (step === 'predict') {
    say(MS.predict.text);
    for (const [id, label] of MS.predict.options) choice(label, () => { mission.predicted = id; missionNext(); });
  } else if (step === 'open') {
    if (scene.explodeTarget >= 0.85) return (mission.opened = true), missionNext();
    say(handsOn ? MS.open.hands : MS.open.mouse);
    help.hidden = false;
    help.textContent = 'Pull it apart';
    help.onclick = () => (scene.explodeTarget = 1);
  } else if (step === 'find') {
    say(handsOn ? MS.find.hands : MS.find.mouse);
    const target = partIndex(MISSION.target);
    const found = (shown) => {
      drillPick = null;
      fb.textContent = '';
      const below = partIndex(MISSION.below);
      scene.setSel(below); // the boundary found, the outer core under it comes forward and the rest dims
      scene.isolate(below);
      scene.pullAside();
      showPart(below);
      say(shown ? MS.find.shown : MS.find.found);
      help.hidden = true;
      next.hidden = false;
      next.textContent = 'See the evidence';
    };
    drillPick = (j) => (j === target ? found(false) : (fb.textContent = `That is the ${scene.parts[j].name.toLowerCase()}. Try again.`));
    help.hidden = false;
    help.textContent = 'Show me';
    help.onclick = () => found(true);
    if (mission.opened) fb.textContent = 'The Earth is already open, so step 2 is done.';
  } else if (step === 'evidence') {
    restoreParts();
    missionSelect(VIEWS.findIndex((v) => v.id === 'quake'));
    say(MS.evidence.text);
    next.hidden = false;
    next.textContent = 'I have seen it';
  } else if (step === 'explain') {
    const ex = MS.explain;
    say(ex.q);
    const buttons = ex.options.map((o, k) => choice(o, () => {
      buttons.forEach((b, n) => {
        b.disabled = true;
        b.classList.toggle('right', n === ex.answer);
        b.classList.toggle('wrong', n === k && k !== ex.answer);
      });
      renderRich(fb, `${k === ex.answer ? 'Correct. ' : 'Not quite. '}${ex.explain} (${ex.where}) ${predictionNote(mission.predicted, Object.fromEntries(MS.predict.options))}`);
      next.hidden = false;
      next.textContent = 'Finish';
    }));
  } else {
    say('Mission complete: the waves showed you that the outer core is liquid. Carry on with the outer core, or explore on your own.');
    choice('Learn more about the outer core', () => {
      endMission();
      missionSelect(0);
      pickPart(partIndex(MISSION.below));
      $('part-learn').click();
    });
    choice('Explore on my own', () => {
      endMission();
      resetAll();
    });
  }
  next.onclick = missionNext;
}
$('mission-close').onclick = () => {
  endMission();
  resetAll();
};
$('mission-play').onclick = () => startMission();

// ?debug in the URL adds a guided gesture test with a results table
// dev builds only: the production build leaves the test out
if (import.meta.env.DEV && new URLSearchParams(location.search).has('debug')) {
  window.geohand = { scene, atModel }; // for inspecting picks from the console
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
      explode: scene.explodeTarget,
      scale: scene.scaleTarget,
      frameTime: lastVideoTime,
      aspect: W / H,
      aim: pointer.aim,
    }), (step) => {
      if (intro) endIntro(); // the intro and the mission would take the test's picks and hide the reset target
      endMission();
      setMode('explore');
      restoreParts();
      scene.setSel(-1);
      showPart(-1);
      scene.explodeTarget = step.open ? 1 : 0;
      scene.scaleTarget = 1;
    }),
  );
}
