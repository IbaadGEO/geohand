# Level visuals, phase 1: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Intermediate and Advanced show detail on the model that Normal does not: the real LAB by plate age, the 520 km boundary and post-perovskite.

**Architecture:** Drawn as geometry in `buildEarth(level)`, which already builds a different model per level, rather than as a shader uniform: the new marks become pickable parts with their own cited captions, and no shader changes are needed.

**Tech Stack:** Vite, Three.js points, `node --test`.

**Spec:** `docs/superpowers/specs/2026-11-23-geohand-level-visuals-design.md`

## Global Constraints

- Every value drawn comes from a cited entry already in `numbers.js`; captions name the source and say what is schematic.
- Normal (`alevel`) is unchanged.
- Level ids stay `alevel`, `undergrad`, `postgrad`.
- `npm test` and `npm run test:release` exit 0.

## Review Focus

- Switching level with the LAB selected keeps a sensible selection (existing `mapPart`).
- The reshaped LAB still meets the Moho and crust wedge edges without a gap at the continental margins (angles 0 and -90°).
- Advanced part count stays at or under `MAX_PARTS` (24).
- New parts work in every view (property views, quake, crust thickness) without errors.
- Captions pass `checkContent` (no DRAFT text, refs checked).

---

### Task 1: `labDepth(ageMa)`

**Files:** Create `src/content/earth/lab.js`; Test `scripts/lab.test.mjs`

**Interfaces:** Produces `labDepth(ageMa: number) => km`, `LAB_AGES = [25, 129]` (the age range drawn), `LAB_CRATON_KM = 200`.

- [ ] Test: `labDepth(25) === 55`, `labDepth(49) === 76`, `labDepth(129) === 82`, `labDepth(10) === 55` and `labDepth(200) === 82` (clamped, nothing guessed outside Fischer's points), `labDepth(37)` between 55 and 76.
- [ ] Implement: straight lines between Fischer et al. (2010, p. 565) points `[[25, 55], [49, 76], [129, 82]]`, clamped at both ends.
- [ ] `node --test scripts/lab.test.mjs` passes.

### Task 2: Reshaped LAB at Intermediate and Advanced

**Files:** Modify `src/models/earth.js` (boundary loop); Test `scripts/earth.test.mjs`

**Interfaces:** Consumes Task 1.

- [ ] Test: for `undergrad` and `postgrad`, the `lab` ring has points at radius `KM(200)` (±0.002) in the continental wedge and between `KM(82)` and `KM(55)` elsewhere; for `alevel` (if it has `lab`) every ring point sits at `KM(80)`.
- [ ] Implement: when `level !== 'alevel'`, the ring and surface radius depend on azimuth `a = atan2(z, x)`: continental wedge (`continental(x, z)`) → `KM(LAB_CRATON_KM)`; ocean arc `t = mod(a, 2π) / (3π/2)` → `KM(labDepth(25 + t · 104))`. Join the two at `a = 0` and `a = -π/2` with radial points, as the Moho does.
- [ ] Tests pass.

### Task 3: 520 km boundary (Advanced)

**Files:** Modify `src/models/earth.js` (`GEOMETRY.d520 = [520, 520]`), `src/content/earth/postgrad.js`, `src/content/earth/numbers.js`; Test `scripts/earth.test.mjs`

- [ ] Test: `GEOMETRY.d520` is `[520, 520]`; `postgrad` builds a `d520` boundary part; `undergrad` does not.
- [ ] Content: `P('d520', 'boundary', '520 km discontinuity', …, 'transition-zone')` with short, long, simplification and two questions from Frost (2008, p. 172): wadsleyite → ringwoodite at about 17.5 GPa; spread over about 25 km (p. 175). NUMBERS postgrad `d520` from the same pages.
- [ ] Tests and `npm run content-check` pass.

### Task 4: Post-perovskite (Advanced)

**Files:** Modify `src/models/earth.js` (cloud like `llsvp`, colour), `src/content/earth/postgrad.js`, `src/content/earth/numbers.js`, `src/content/earth/states.js`; Test `scripts/earth.test.mjs`

- [ ] Test: `postgrad` builds a `post-perovskite` part whose points all lie between `KM(2891)` and `KM(2700)`; `undergrad` does not.
- [ ] Implement: short tangential streaks (5–7 points each, along the ring direction) on the cut between 2,700 km and the CMB, lifted with D″. State: same as D″.
- [ ] Content: transition above 125 GPa and 2,500 K, ~2,700 km, 1.0–1.2% denser, matching the D″ discontinuity; aligned platy crystals may give V~SH~ > V~SV~ (Murakami et al. 2004, pp. 855, 857–858). Simplification: depth from the paper; the even band round the cut and the streaks are schematic.
- [ ] Tests pass.

### Task 5: Captions, docs and a full check

**Files:** `src/content/earth/undergrad.js`, `postgrad.js` (LAB simplification), `docs/sources.md`, the design doc

- [ ] LAB simplification at both levels: shells show the PREM 80 km reference; the line shows depth by plate age from 25 to 129 Ma (Fischer et al. 2010), joined straight between ages, about 200 km under the continent; which end is young is illustrative.
- [ ] `npm test`, `npm run test:release`, `npm run build` all pass.
- [ ] Browser: all three levels, LAB / 520 / post-perovskite selected and not, each view once; no console errors.
