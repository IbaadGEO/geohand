# GeoHand Milestone 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A deployed geology-only gesture and mouse app covering Earth's interior. It has three difficulty levels, lesson and explore modes, cited part and boundary panels, a searchable question bank, a private question inbox and a README live-updates section.

**Architecture:**
- **Base:** a new repo seeded with HoloHand's tested tracking, gesture, scene and debug modules (credited to Tuba Khan, MIT).
- **Content:** plain JS modules per level with a shared reference list, checked by a node self-test.
- **Inbox:** one Vercel Function with pure, unit-tested validation and rate limiting, backed by Upstash Redis.

**Tech Stack:** plain JavaScript (ES modules), Three.js 0.170, @mediapipe/tasks-vision 0.10.14, Vite 5, Node 20 (`node:test`/`assert`, `--env-file`), Vercel Functions, @upstash/redis.

**Spec:** `docs/superpowers/specs/2026-11-22-geohand-design.md` (read it with this plan). Sources: `docs/sources.md`.

## Global Constraints

- **Repo layout:**
  - New repo `GeoHand` on GitHub as IbaadGEO/GeoHand.
  - Vercel project `geohand`, team ibaadsprojects. Production branch `main`.
  - HoloHand is not modified.
- **Levels:**
  - ids: `alevel`, `undergrad`, `postgrad`
  - Labels: "A-level", "Undergraduate", "Postgraduate".
  - Levels are relative difficulty and follow no exam board.
- **Parts:** 24 or fewer parts per model per level (scene `MAXP`).
- **Text rendering:** all content text goes through `textContent` or `parseRich`. No `innerHTML` with content or visitor text anywhere.
- **Citations:** every number and every question carries at least one reference id. A reference without a `checked` date fails `npm run test:release`.
- **What the inbox stores:** `{ question, level, model, part, receivedAt }` only. No IP, user agent or cookie is stored.
- **Inbox limits:**
  - question 5–500 characters, measured in code points after trimming
  - body 2 KB or less
  - 5 per hour and 20 per day per visitor
- **Camera and security headers:**
  - Camera frames never leave the device.
  - The `vercel.json` CSP keeps `connect-src 'self'`. No third-party script, style or font hosts.
- **Credit and licences:**
  - LICENSE keeps Tuba Khan's MIT notice, with the owner's copyright line added.
  - Written content is CC BY 4.0, stated in the README.
- **Commits:**
  - Short change-led subjects.
  - **No AI attribution:** no Co-Authored-By lines or "Generated with" footers. This follows the owner's standing rule and overrides any default.
  - No local absolute paths in any committed file.
- **Dependencies:** none added except `@upstash/redis`.

## Review Focus

1. **Browser storage blocked** (private window, blocked site data). The level picker still shows, the chosen level works for the session, and nothing throws. Tested in Task 5.
2. **Level switched while a part is grabbed or mid-lesson.** The grab is released, the selection maps to its parent, child or nothing, and the lesson moves to the matching step. Never a stale index into the new parts. Tested in Task 5 and Task 8.
3. **Send fails** (offline, 429, 500). The learner sees a plain message and their typed question stays in the box. Tested in Task 9.
4. **Odd question text:** whitespace only, emoji, 500+ code points, control characters, `<script>`. Rejected or stored as inert text, and never rendered as HTML. Tested in Task 9 and Task 3.
5. **Search with punctuation and case.** "What's", "WHY is", "D″" and "core-mantle" still match the bank. Tested in Task 7.

---

### Task 1: Seed the repo from HoloHand's tested base

**Files:**
- **Create these** (copied from HoloHand, gesture-reliability branch, HEAD 423d814):
  - `src/handTracking.js`, `src/gestureEngine.js`, `src/scene.js`, `src/debugTest.js`, `src/utils.js`, `src/styles.css`, `src/main.js`
  - `src/models/shapes.js`
  - `scripts/setup.mjs`, `scripts/gesture-selftest.mjs`
  - `index.html`, `vercel.json`, `LICENSE`
- **Create these new:** `package.json`, `.gitignore`, `src/models/index.js`.
- **Do not copy:** `src/agent.js`, `src/objects/`, `src/models/{jet,radial,car,brain}.js`.

**Interfaces:**
- **Produces:**
  - HoloScene: `new HoloScene(canvas, models)`, plus `.setModel(i)`, `.pick(px, py, maxDist, prefer)`, `.setHover(i)`, `.setSel(i)`, `.dragPart(i, dx, dy)`, `.releaseAll(snap)`.
  - `chooseSticky(dists, maxDist, prefer)`.
  - `GestureEngine.update(hands, t, map, aspect)`, `HandTracker.detect(video, nowMs)`.
  - `P(name, desc, color, instances)` and `I(cloud, dir, anchor)` from `shapes.js`.

- [ ] **Step 1:** Create the folder and run `git init -b main`. Copy the listed files. `src/models/index.js` exports `MODELS = [{ id: 'earth', name: "Earth's Interior", category: 'Earth science', subtitle: 'Crust, mantle and core, opened up', view: { x: 0.35, y: 0.6, z: 0 }, build: buildEarth }]`, with HoloHand's `earth.js` copied for now.
- [ ] **Step 2:** Write `package.json`:
  - name `geohand`, version `0.1.0`
  - dependencies exactly as HoloHand
  - scripts as HoloHand, plus:
    - `"test": "node scripts/gesture-selftest.mjs && node --test"`
    - `"test:release": "node scripts/content-check.mjs --release"`
    - `"inbox": "node --env-file=.env scripts/inbox.mjs"`
    - `"updates": "node scripts/updates.mjs"`
- [ ] **Step 3:** `.gitignore` = HoloHand's (`node_modules`, `dist`, `public/wasm`, `public/models`) plus `.env*` and `.vercel`.
- [ ] **Step 4:** LICENSE: keep Tuba Khan's MIT text and add `Copyright (c) 2026 IbaadGEO` below it.
- [ ] **Step 5:** Strip machine-model wording from `index.html` and the start screen: title "GeoHand", and the hint text about Earth. Leave the HoloHand panel markup in place; Task 6 replaces it.
- [ ] **Step 6:** Run `npm install`. It must populate `public/wasm` and `public/models` through `postinstall`.
- [ ] **Step 7:** Run `npm test`. Expected: the gesture self-test prints all 19 checks passing. There are no `*.test.mjs` files yet, so `node --test` reports 0 tests. With no arguments it finds `**/*.test.mjs` and skips `node_modules`, which also works on Windows where shell globs don't expand.
- [ ] **Step 8:** Run `npm run build`. Expected: Vite build succeeds. Preview the `dist` build and the Earth model renders.
- [ ] **Step 9:** Commit with "Seed GeoHand from HoloHand's tested gesture base".

### Task 2: Content format, reference list and content check

**Files:**
- Create:
  - `src/content/levels.js`, `src/content/references.js`
  - `src/content/earth/{alevel,undergrad,postgrad}.js`, `src/content/earth/index.js`
  - `src/content/check.js`
- Create: `scripts/content-check.mjs`, `scripts/content.test.mjs`

**Interfaces:**
- **Produces:**
  - **Levels:** `LEVELS = [{ id: 'alevel', label: 'A-level' }, { id: 'undergrad', label: 'Undergraduate' }, { id: 'postgrad', label: 'Postgraduate' }]`.
  - **References:** `REFS: Record<refId, { authors, year, title, container, volume?, pages?, doi?, url?, open?: boolean, checked: 'YYYY-MM-DD' | null }>`. Seed it with all 27 entries from `docs/sources.md`. Ids are like `prem1981` and `ak1351995`, and every entry starts with `checked: null`.
  - **Content type:** `Part = { id, kind: 'layer' | 'boundary', parent?: id, title, short, long, numbers: [{ label, value, refs: [refId], where: string }], simplification?: string, questions: [{ q, a, refs: [refId], added?: 'YYYY-MM-DD', fromVisitor?: true }] }`.
  - **Content exports:** each level file's default export is `{ level, parts: Part[] }`, and `earth/index.js` exports `EARTH = { alevel, undergrad, postgrad }`.
  - **The check:** `checkContent(model, refs, { release }) -> { errors: string[], warnings: string[] }`.

- [ ] **Step 1: Write the failing tests** in `scripts/content.test.mjs` using minimal fixtures:

```js
test('passes a valid fixture', () => assert.deepEqual(checkContent(ok, refs, {}).errors, []));
test('unknown ref id', () => assert.match(checkContent(withRef('nope'), refs, {}).errors[0], /unknown reference "nope"/));
test('unchecked ref is a warning, release error', () => {
  assert.equal(checkContent(ok, uncheckedRefs, {}).errors.length, 0);
  assert.match(checkContent(ok, uncheckedRefs, { release: true }).errors[0], /not checked/);
});
test('question without answer or refs', () => assert.equal(checkContent(badQ, refs, {}).errors.length, 2));
test('more than 24 parts', () => assert.match(checkContent(parts(25), refs, {}).errors[0], /25 parts/));
test('duplicate id in a level', () => assert.match(checkContent(dup, refs, {}).errors[0], /duplicate/));
test('parent must exist at a lower level', () => assert.match(checkContent(orphan, refs, {}).errors[0], /parent "x"/));
test('missing short or long text', () => assert.match(checkContent(noLong, refs, {}).errors[0], /long/));
```

- [ ] **Step 2:** Run `node --test scripts/content.test.mjs`. Expected: FAIL, `checkContent` not found.
- [ ] **Step 3:** Implement `checkContent` in `src/content/check.js`. It is pure, with no DOM and no imports beyond its arguments.
- [ ] **Step 4:** `scripts/content-check.mjs`:
  - imports `EARTH` and `REFS`
  - prints the warnings
  - exits 1 on errors (`--release` passes `{ release: true }`)
  - is added to the `test` script after the gesture self-test, in non-release mode
- [ ] **Step 5:** Fill the three level files with **skeleton parts only**: ids, kinds, parents and titles, from the spec's per-level list. Text fields are a single sentence marked `DRAFT`, and each skeleton gets one placeholder question. Task 11 writes the real content.
  - **A-level:** `crust`, `mantle`, `outer-core`, `inner-core`, `lithosphere`, `asthenosphere`, plus boundaries `moho` and `cmb`.
  - **Undergraduate:** `continental-crust` and `oceanic-crust` (parent `crust`), `lithospheric-mantle` (parent `lithosphere`), `asthenosphere`, `transition-zone` and `lower-mantle` (parent `mantle`), `outer-core`, `inner-core`, plus boundaries `moho`, `lab`, `d410`, `d660`, `cmb`, `icb`.
  - **Postgraduate:** the undergraduate set plus `d-double-prime` (parent `lower-mantle`), `llsvp` (parent `lower-mantle`) and `innermost-inner-core` (parent `inner-core`).
- [ ] **Step 6:** Run `npm test`. Expected: all pass, with warnings listing the 27 unchecked references.
- [ ] **Step 7:** Commit with "Content format, reference list and content check".

### Task 3: Safe rich text

**Files:** Create `src/ui/richText.js` and `scripts/richText.test.mjs`.

**Interfaces:**
- **Produces:**
  - `parseRich(text: string) -> Array<{ t: 'text' | 'i' | 'sup' | 'sub', s: string }>`. The markup is `_italic_`, `^sup^` and `~sub~`, with no nesting.
  - `renderRich(el: Element, text: string)`. It clears `el` and appends text nodes and `<i>`, `<sup>` and `<sub>` elements whose content is set with `textContent`.

- [ ] **Step 1: Write the failing tests:**

```js
assert.deepEqual(parseRich('MgSiO~3~'), [{ t: 'text', s: 'MgSiO' }, { t: 'sub', s: '3' }]);
assert.deepEqual(parseRich('10^3^ kg m^-3^'), [{t:'text',s:'10'},{t:'sup',s:'3'},{t:'text',s:' kg m'},{t:'sup',s:'-3'}]);
assert.deepEqual(parseRich('_et al._'), [{ t: 'i', s: 'et al.' }]);
assert.deepEqual(parseRich('<img src=x onerror=alert(1)>'), [{ t: 'text', s: '<img src=x onerror=alert(1)>' }]);
assert.deepEqual(parseRich('a_b'), [{ t: 'text', s: 'a_b' }]); // unmatched marker stays literal
```

- [ ] **Step 2:** Run `node --test scripts/richText.test.mjs`. Expected: FAIL.
- [ ] **Step 3:** Implement both functions. `renderRich` is the only content-to-DOM path the UI uses.
- [ ] **Step 4:** Run the tests. Expected: PASS.
- [ ] **Step 5:** Commit with "Safe rich text for content".

### Task 4: Level-aware Earth model with pickable boundaries

**Files:**
- Modify:
  - `src/models/shapes.js:88`. `P` gains an `id`, so the signature becomes `P(id, name, desc, color, instances)`.
  - `src/models/earth.js`, rewritten.
  - `src/models/index.js`.
- Create: `scripts/earth.test.mjs`.

**Interfaces:**
- **Consumes:** `EARTH` (Task 2).
- **Produces:**
  - `buildEarth(level: 'alevel' | 'undergrad' | 'postgrad') -> Part3D[]`, where `Part3D = { id, name, desc, color, instances, kind }`.
  - `MODELS[0].build` becomes `(level) => buildEarth(level)`.
  - `GEOMETRY: Record<partId, { rIn: km depth, rOut: km depth }>`.

The **display depths** in km are below, as in HoloHand's `KM()`. They are drafts to be confirmed against PREM in Task 11.

| Part | Depth range (km) |
|---|---|
| crust | 0–35, drawn 0–220 as now |
| lithosphere | 0–100 |
| lithospheric-mantle | 35–100 |
| asthenosphere | 100–410 |
| transition-zone | 410–660 |
| lower-mantle | 660–2891, or 660–2641 when `d-double-prime` is present |
| d-double-prime | 2641–2891 |
| outer-core | 2891–5150 |
| inner-core | 5150–6371 |
| innermost-inner-core | 6071–6371 |

- **Boundaries** are a thin shell at one depth: `moho` 35, `lab` 100, `d410`, `d660`, `cmb` 2891, `icb` 5150. They are built as thin `halves()` with a cross-section ring only, with `dir [0, 0, 0]` so they never explode.
- **The A-level `mantle`** covers 35–2891, excluding what the lithosphere and asthenosphere draw. The builder decides how lithosphere overlays crust and mantle visually; the spec leaves rendering to them.
- **`llsvp`:** two blobs on the cross-section at the base of the mantle. They are placed antipodally to stand for the African and Pacific provinces, with shape per Garnero et al. 2016.

- [ ] **Step 1: Write the failing tests:**

```js
for (const lv of ['alevel', 'undergrad', 'postgrad']) {
  const parts = buildEarth(lv);
  assert.deepEqual(parts.map(p => p.id).sort(), EARTH[lv].parts.map(p => p.id).sort());
  assert.ok(parts.length <= 24);
  for (const p of parts.filter(p => p.kind === 'boundary')) assert.ok(p.instances.every(i => i.dir.every(v => v === 0)));
  for (const p of parts) assert.ok(p.instances.reduce((n, i) => n + i.cloud.n, 0) > 0, p.id + ' has no points');
}
```

- [ ] **Step 2:** Run `node --test scripts/earth.test.mjs`. Expected: FAIL.
- [ ] **Step 3:** Implement. Names and short descriptions come from `EARTH[level]` (`title`, `short`), so the model and the content can't drift apart. Keep the seeded `rand`, so a level always builds the same.
- [ ] **Step 4:** Run `npm test`. Expected: PASS, with the 19 gesture checks still passing.
- [ ] **Step 5:** Commit with "Earth model per level with pickable boundaries".

### Task 5: Level choice, storage and switching

**Files:**
- Create: `src/levels.js`, `scripts/levels.test.mjs`.
- Modify: `src/scene.js` (add `reload`), `src/main.js`.

**Interfaces:**
- **Produces:**
  - `loadLevel(storage = globalThis.localStorage) -> levelId | null`. It never throws.
  - `saveLevel(id, storage = globalThis.localStorage) -> void`. It never throws.
  - `mapPart(fromId, fromLevel, toLevel, content = EARTH) -> partId | null`. The order is: same id, else the parent chain upward, else the first child. Children are found by matching `parent === fromId` in `toLevel`.
  - `HoloScene.reload(i, buildArg)`:
    - clears the cached geometry for model i
    - rebuilds through `models[i].build(buildArg)` with the existing scatter transition
    - keeps the view, zoom and explode state
    - calls `releaseAll(false)` first
- **Consumes:** `EARTH`.

- [ ] **Step 1: Write the failing tests:**

```js
const throwing = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
assert.equal(loadLevel(throwing), null);
assert.doesNotThrow(() => saveLevel('postgrad', throwing));
assert.equal(loadLevel(fakeStore({ 'geohand.level': 'banana' })), null); // unknown stored value ignored
assert.equal(mapPart('transition-zone', 'undergrad', 'alevel'), 'mantle');
assert.equal(mapPart('mantle', 'alevel', 'undergrad'), 'transition-zone'); // first child, in file order
assert.equal(mapPart('d-double-prime', 'postgrad', 'undergrad'), 'lower-mantle');
assert.equal(mapPart('cmb', 'alevel', 'postgrad'), 'cmb');
assert.equal(mapPart('llsvp', 'postgrad', 'alevel'), 'mantle');
```

- [ ] **Step 2:** Run the tests. Expected: FAIL.
- [ ] **Step 3:** Implement `src/levels.js`, then `HoloScene.reload`.
- [ ] **Step 4:** Wire into `main.js`:
  - If no stored level, the start screen shows three level buttons. A level picker also goes in the panel header.
  - On change:
    1. `saveLevel`
    2. remember the selected part id
    3. `scene.reload(0, level)`
    4. `scene.setSel(index of mapPart(...))`, or -1 if null
    5. tell the lesson (Task 8)
- [ ] **Step 5:** Run `npm test`. Expected: PASS.
- [ ] **Step 6: Browser check** with `preview_start` on the dev server and mouse only:
  - switch level while a part is selected, and the mapped part stays selected
  - switch while dragging, and the drag ends with no error in the console
  - with storage blocked through DevTools, it still works
- [ ] **Step 7:** Commit with "Choose and switch level without losing your place".

### Task 6: Info panel and "I don't get this" picker

**Files:**
- Create: `src/ui/panel.js`.
- Modify: `index.html` (panel markup), `src/styles.css`, `src/main.js`.

**Interfaces:**
- **Consumes:** `renderRich`, `EARTH`, `REFS`, `LEVELS`, and scene hover and selection.
- **Produces:**
  - `mountPanel(root: Element, { onLevel(id), onAsk(question) })`, which returns `{ show(part: Part | null, level), setLevel(id) }`.
  - `formatRef(ref) -> string`, the APA-style line used in `docs/sources.md`, with the DOI as a link built through `href` assignment.

**Panel contents, top to bottom:**
1. level picker
2. part title, with a "boundary" tag when `kind === 'boundary'`
3. short text
4. "More detail" (collapsible, long text)
5. key numbers table: label, value, and superscript reference number
6. simplification note, if any
7. "Common questions" (collapsible, questions for this part at this level)
8. search box (Task 7)
9. references for this part, numbered, full citations

With nothing selected, the panel shows "Point at a part or a boundary, or click one".

- [ ] **Step 1:** Add a test to `scripts/content.test.mjs`. `formatRef(REFS.prem1981)` must equal `Dziewonski, A. M., & Anderson, D. L. (1981). Preliminary reference Earth model. Physics of the Earth and Planetary Interiors, 25(4), 297–356. https://doi.org/10.1016/0031-9201(81)90046-7`.
- [ ] **Step 2:** Run it. Expected: FAIL. Implement `formatRef`. Run again. Expected: PASS.
- [ ] **Step 3:** Implement `mountPanel`. All text goes through `renderRich` or `textContent`. Hovering a part, which the gesture point or the mouse already sets, previews it; selecting locks it, as now.
- [ ] **Step 4:** Browser check:
  - each part and boundary at each level opens with its own content, and only that level's parts and text appear
  - at 360 px width the panel becomes a bottom sheet with no horizontal scroll
  - `document.querySelectorAll('[onerror],[onclick]')` within the panel is empty
- [ ] **Step 5:** Commit with "Cited info panel for parts and boundaries".

### Task 7: Question search

**Files:** Create `src/ui/search.js` and `scripts/search.test.mjs`. Modify `src/ui/panel.js`.

**Interfaces:**
- **Produces:**
  - `normalise(s) -> string[]`:
    - lowercase
    - NFKD with diacritics stripped
    - `″`/`"` turned into `"`, and `'s` removed
    - non-letters and digits turned into spaces
    - split, and stop words dropped (a fixed list of 40 or fewer English words)
  - `searchBank(query, content = EARTH, level) -> Array<{ partId, level, q, a, refs, score }>`:
    - score is the number of shared tokens divided by the number of query tokens
    - results below 0.5 are dropped
    - current-level results come first, then other levels, each sorted by score descending
    - at most 8 results
- **Panel behaviour:**
  - Results show the question and expand to the answer, with a level tag when they come from another level.
  - With no results and 5 or more characters typed, a "Send this question" button calls `onAsk(query)`.

- [ ] **Step 1: Write the failing tests** against a small fixture bank:

```js
assert.equal(searchBank('Why is the inner core solid?', bank, 'alevel')[0].q, 'Why is the inner core solid if it is the hottest part?');
assert.equal(searchBank("WHAT'S the core-mantle boundary", bank, 'alevel')[0].partId, 'cmb');
assert.equal(searchBank('D″ layer', bank, 'postgrad')[0].partId, 'd-double-prime');
assert.equal(searchBank('inner core rotation', bank, 'alevel')[0].level, 'postgrad'); // only exists at postgrad
assert.deepEqual(searchBank('   ', bank, 'alevel'), []);
assert.deepEqual(searchBank('pizza recipe', bank, 'alevel'), []);
```

- [ ] **Step 2:** Run the tests. Expected: FAIL. Implement. Run again. Expected: PASS.
- [ ] **Step 3:** Wire into the panel, then run the browser check.
- [ ] **Step 4:** Commit with "Search the question bank".

### Task 8: Lessons, and the peace gesture as Next

**Files:**
- Create: `src/content/earth/lessons.js`, `src/lesson.js`, `scripts/lesson.test.mjs`.
- Modify:
  - `src/main.js`: the peace block around line 316, the keys around line 361, and the `?debug` hook
  - `src/debugTest.js`: lines 12, 121, 132, 143 and 149
  - `index.html`: a mode toggle (Explore / Lesson), plus Back and Next buttons

**Interfaces:**
- **Produces:**
  - **Lesson data:** `LESSONS: Record<levelId, Array<{ focus: partId, explode: 0..1, view: { x, y, z }, text, refs: [refId] }>>`, plus a `LESSONS` check inside `checkContent`: every `focus` exists at that level, and refs are known.
  - **Lesson class:** `class Lesson { constructor(steps); i; get step(); next() -> boolean; back() -> boolean; jumpToPart(partId) -> void }`:
    - `next` and `back` return false at the ends and do not wrap
    - `jumpToPart` goes to the first step whose `focus` is the given part, else step 0
  - **Debug hook:** main.js's `?debug` `get()` adds `peaceCount`, the number of times the still-peace trigger fired.

- [ ] **Step 1: Write the failing tests:**

```js
const L = new Lesson([{ focus: 'crust' }, { focus: 'mantle' }, { focus: 'cmb' }]);
assert.equal(L.back(), false); assert.equal(L.i, 0);
assert.equal(L.next(), true); assert.equal(L.step.focus, 'mantle');
L.next(); assert.equal(L.next(), false); assert.equal(L.i, 2);
L.jumpToPart('mantle'); assert.equal(L.i, 1);
L.jumpToPart('nope'); assert.equal(L.i, 0);
```

- [ ] **Step 2:** Run the tests. Expected: FAIL. Implement. Run again. Expected: PASS.
- [ ] **Step 3: Wire it up:**
  - **Entering a step** applies `explode`, `view` (eased) and `setSel(focus)`, and shows `text` in the panel above the part content.
  - **Peace:**
    - In Lesson mode, `still peace` calls `lesson.next()`.
    - In Explore mode it calls `scene.next()` only when `MODELS.length > 1`.
    - The stillness and arming logic is unchanged.
  - **Keys and buttons:** → and ← and the on-screen buttons call next and back in Lesson mode.
  - **Level switch** calls `lesson = new Lesson(LESSONS[level])` then `jumpToPart(mappedSel)`.
  - **Lesson text:** write a 4–6 step skeleton per level now, marked `DRAFT`. Task 11 writes the real text.
- [ ] **Step 4: Update the `debugTest.js` PEACE verdict.**
  - It counts `peaceCount` increases during the step instead of model switches, with the pass rule `recognisedPct >= 80 && peaceFired === 1`.
  - The note text becomes `peace fired ${n}`, and the footer says "one peace trigger per peace".
  - The guided test runs in Lesson mode, so a fire is visible.
- [ ] **Step 5:** Run `npm test`. Expected: PASS, with all 19 gesture checks.
- [ ] **Step 6:** Commit with "Lessons per level, peace sign steps forward".

### Task 9: Question inbox

**Files:**
- Create: `api/ask.js`, `api/_lib/validate.js`, `api/_lib/rateLimit.js`, `scripts/inbox.test.mjs`, `scripts/inbox.mjs`, `src/ui/ask.js`.
- Modify: `vercel.json`, `src/ui/panel.js`, `package.json` (add `@upstash/redis`).

**Interfaces:**
- **Validation:** `validateAsk(body, { origin, allowedOrigins: string[], previewPattern: RegExp, partIds: Record<model, Set<partId>> }) -> { ok: true, value: { question, level, model, part } } | { ok: false, status: 400 | 403, error: string }`.
  - **Origin:** not in `allowedOrigins` and not matching `previewPattern` returns 403.
  - **Honeypot:** a non-empty `website` field returns `{ ok: false, status: 400 }`, but `ask.js` answers it with the normal success response so bots learn nothing.
  - **Question text:** control characters are stripped (`/[\u0000-\u001F\u007F-\u009F]/g`), except that `\n` becomes a space. Then it is trimmed, and its length is counted as `[...s].length`, which must be 5–500.
  - **Ids:** `level` must be one of the 3 level ids, and `model`/`part` must be in `partIds`.
- **Rate-limit key:** `rateKey(ip, salt, now = Date.now()) -> string`, computed as `sha256(ip + salt + utcDate(now))` in hex, sliced to 32 characters.
- **Rate check:** `checkRate(store, key, now) -> Promise<boolean>`.
  - It uses `INCR` on `rl:h:<key>:<hour>` with `EXPIRE 3600` when the count is 1, and on `rl:d:<key>` with `EXPIRE 86400`.
  - It returns false when the hourly count exceeds 5 or the daily count exceeds 20.
  - `store` is any object with `incr(k)` and `expire(k, s)`, so the tests use an in-memory fake.
- **Endpoint, `api/ask.js`:**
  1. POST only, otherwise 405.
  2. `Content-Type` must be `application/json`, otherwise 415.
  3. Raw body 2,048 bytes or less, otherwise 413.
  4. Validate the body.
  5. Rate check, otherwise 429.
  6. `LPUSH inbox` with JSON `{ id: crypto.randomUUID(), question, level, model, part, receivedAt: ISO }`.
  7. Respond 200 `{ ok: true }`.
  
  Errors respond `{ ok: false, error: <plain message> }` with no stack. The IP comes from `x-forwarded-for` (first entry) and is used only for `rateKey`.
- **Environment variables:**
  - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `RATE_SALT`
  - `ALLOWED_ORIGINS` (comma-separated)
  - `PREVIEW_ORIGIN_PATTERN`, which defaults to `^https://geohand-[a-z0-9-]+-ibaadsprojects\.vercel\.app$`
  
  Production and preview use different Redis databases.
- **Client:** `sendQuestion(payload, fetchImpl = fetch) -> Promise<{ ok: boolean, message: string }>`, with these messages:
  - 200: "Thanks, your question was sent."
  - 429: "You've sent a lot of questions. Please try again later."
  - anything else, or a network error: "Couldn't send right now. Your question is still here, try again."
  
  The panel clears the textbox only when `ok` is true.
- **`scripts/inbox.mjs`:** `npm run inbox` lists items, newest first, as `id | receivedAt | level | part | question`. `npm run inbox -- --delete <id>` removes one with `LREM`.
- **`vercel.json`:** a header block for `/api/(.*)` adds `Cache-Control: no-store`. The CSP is unchanged.
- **The Send box** shows "Only the words you type are sent, only when you press Send. Never camera data. No IP address is stored. Answered questions may be published anonymously in the README."

- [ ] **Step 1: Write the failing tests:**

```js
const opts = { origin: 'https://geohand.vercel.app', allowedOrigins: ['https://geohand.vercel.app'], previewPattern: /^https:\/\/geohand-[a-z0-9-]+-ibaadsprojects\.vercel\.app$/, partIds: { earth: new Set(['cmb']) } };
const good = { question: 'Why is the CMB so sharp?', level: 'postgrad', model: 'earth', part: 'cmb' };
assert.equal(validateAsk(good, opts).ok, true);
assert.equal(validateAsk(good, { ...opts, origin: 'https://evil.example' }).status, 403);
assert.equal(validateAsk(good, { ...opts, origin: 'https://geohand-abc123-ibaadsprojects.vercel.app' }).ok, true);
assert.equal(validateAsk(good, { ...opts, origin: 'https://geohand-x.evil.app' }).status, 403);
assert.equal(validateAsk({ ...good, question: '    ' }, opts).ok, false);
assert.equal(validateAsk({ ...good, question: '🌍'.repeat(500) }, opts).ok, true);
assert.equal(validateAsk({ ...good, question: '🌍'.repeat(501) }, opts).ok, false);
assert.equal(validateAsk({ ...good, question: 'abc\u0000\u0007de' }, opts).value.question, 'abcde');
assert.equal(validateAsk({ ...good, question: '<script>alert(1)</script>' }, opts).value.question, '<script>alert(1)</script>'); // stored inert
assert.equal(validateAsk({ ...good, level: 'phd' }, opts).ok, false);
assert.equal(validateAsk({ ...good, part: 'nope' }, opts).ok, false);
assert.equal(validateAsk({ ...good, website: 'x' }, opts).ok, false);
assert.equal(validateAsk({ ...good, extra: 'ignored' }, opts).value.extra, undefined);
// rate limit with in-memory fake store
for (let n = 0; n < 5; n++) assert.equal(await checkRate(fake, 'k', T), true);
assert.equal(await checkRate(fake, 'k', T), false);
assert.equal(await checkRate(fake, 'k', T + 3600e3), true); // next hour
assert.notEqual(rateKey('1.2.3.4', 's', T), rateKey('1.2.3.4', 's', T + 86400e3)); // rotates daily
assert.ok(!rateKey('1.2.3.4', 's', T).includes('1.2.3.4'));
// client
assert.deepEqual(await sendQuestion(good, async () => ({ status: 429, json: async () => ({}) })), { ok: false, message: "You've sent a lot of questions. Please try again later." });
assert.equal((await sendQuestion(good, async () => { throw new TypeError('offline'); })).ok, false);
```

- [ ] **Step 2:** Run `node --test scripts/inbox.test.mjs`. Expected: FAIL.
- [ ] **Step 3:** Implement `validate.js`, `rateLimit.js`, `ask.js`, `src/ui/ask.js` and `scripts/inbox.mjs`. `ask.js` builds `partIds` by importing `EARTH` from `../src/content/earth/index.js`.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit with "Private question inbox with validation and rate limit".

### Task 10: README live updates

**Files:** Create `scripts/updates.mjs`, `src/content/updates.js` and `scripts/updates.test.mjs`. Modify `README.md`, adding the markers.

**Interfaces:**
- **Produces:**
  - `renderUpdates(content = EARTH) -> string`. It produces a markdown table `| Date | Level | Part | Question |` of every question with `fromVisitor: true`, newest first. With none, it outputs `_No visitor questions answered yet._`
  - `applyUpdates(readme, table) -> string`. It replaces the text between `<!-- live-updates:start -->` and `<!-- live-updates:end -->`, and throws if the markers are missing.
  - `npm run updates` writes the README. `node scripts/updates.mjs --check` exits 1 if the README differs, and it is added to `npm test`.

- [ ] **Step 1: Write the failing tests:**

```js
assert.match(renderUpdates({ alevel: { parts: [] }, undergrad: { parts: [] }, postgrad: { parts: [] } }), /No visitor questions/);
const t = renderUpdates(fixtureWithTwo); // added 2026-12-01 and 2026-12-05
assert.ok(t.indexOf('2026-12-05') < t.indexOf('2026-12-01'));
assert.throws(() => applyUpdates('no markers', t), /markers/);
assert.equal(applyUpdates('a<!-- live-updates:start -->old<!-- live-updates:end -->b', 'NEW'), 'a<!-- live-updates:start -->\nNEW\n<!-- live-updates:end -->b');
```

- [ ] **Step 2:** Run the tests. Expected: FAIL. Implement. Run again. Expected: PASS.
- [ ] **Step 3:** Commit with "README live updates generated from content".

### Task 11: Write and check the Earth content (owner-gated)

This task is content, not code. It is blocked until the owner has marked access in `docs/sources.md` and supplied the papers.

**Files:** Modify `src/content/references.js`, `src/content/earth/*.js`, `src/content/earth/lessons.js`, and the `GEOMETRY` depths in `src/models/earth.js`.

- [ ] **Step 1:** Draft from the supplied papers plus the open ones only.
  - For every number, `where` gives the page, table or figure.
  - Write 6–8 questions per part per level.
  - Lesson text: A-level gives the essentials. Undergraduate gives the processes. Postgraduate covers how we know, through seismology, mineral physics and the open debates.
  - Each part gets a simplification note where the drawing differs from reality, such as crust thickness.
- [ ] **Step 2:** Set the `GEOMETRY` depths to the cited values. Drop any postgraduate part whose sources the owner can't access.
- [ ] **Step 3:** Run `npm test`. Expected: PASS, with no `DRAFT` left. Add a check in `checkContent` that errors on the string `DRAFT` when `release` is set.
- [ ] **Step 4:** **The owner reviews** each level's text and checks every value against the papers. Then set `checked` dates in `references.js`.
- [ ] **Step 5:** Run `npm run test:release`. Expected: exit 0.
- [ ] **Step 6:** Commit with "Earth's interior content at three levels, cited".

### Task 12: README, deploy and live checks

**Files:** Create `README.md`, in the trishuli-flood-trace and ecg-arrhythmia-cnn style, and `docs/media/` with a screenshot and a clip.

- [ ] **Step 1: Write the README** with these sections:
  1. Centred title
  2. Badges: live demo, privacy, tests, MIT plus CC BY
  3. About: why GeoHand exists and how it grew from HoloHand, with a link
  4. How it works (a mermaid diagram including the inbox)
  5. Levels
  6. Lessons and Explore
  7. Asking a question
  8. Privacy and security: the guarantees table updated for the inbox, how it was checked, and its limits
  9. Live updates, with the markers
  10. Sources, generated from `REFS`
  11. Testing
  12. Run it locally
  13. Credit and licence: Tuba Khan for the gesture base under MIT, and the content under CC BY 4.0
  
  Then run `npm run updates`.
- [ ] **Step 2: Create the GitHub repo** IbaadGEO/GeoHand (public) and push `main`. **Confirm with the owner before pushing.**
- [ ] **Step 3: Set up Vercel** (owner confirms each step):
  - create project `geohand` from the repo
  - add Upstash Redis through the Vercel Marketplace; **the owner accepts the integration terms**
  - create separate production and preview databases
  - set the Task 9 environment variables per environment, with `RATE_SALT` a random 32-byte hex value
  - production branch `main`
- [ ] **Step 4: Live checks on the production URL:**
  - Headers match `vercel.json`.
  - Repeat HoloHand's CSP leak test: fetch, image and WebSocket to another host are all blocked.
  - `curl` `/api/ask` with these cases:

    | Request | Expected |
    |---|---|
    | wrong Origin | 403 |
    | 3 KB body | 413 |
    | 6 rapid valid posts | the 6th returns 429 |
    | valid post | 200 |

  - `npm run inbox` shows that question with no IP field; delete it.
- [ ] **Step 5: The owner runs a live `?debug` test** with a camera on production in Lesson mode. Expected: 9/9, with PEACE "peace fired 1". Record the result in the README testing section.
- [ ] **Step 6:** Commit with "README, live checks and test results" and push. **Confirm with the owner before pushing.**
