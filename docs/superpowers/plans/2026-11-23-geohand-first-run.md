# First run, pull apart and the part card: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A first-run intro that teaches turn, pull apart and point one at a time, labels that flash as layers separate, and a card on any picked part offering the drill-in or the lesson from there.

**Architecture:** A pure intro state machine (`src/ui/intro.js`) fed by `main.js` each frame; the coach card and part card are DOM in `index.html`. Pointing at the model reuses the button dwell in `src/ui/pointer.js` through a callback that returns a stable target per part.

**Tech Stack:** Vite, Three.js, `node --test`.

**Spec:** `docs/superpowers/specs/2026-11-23-geohand-first-run-design.md`

## Global Constraints

- Desktop only. No AI attribution. Commit only when the user asks.
- Card hook text comes from existing cited part questions; no new claims.

## Review Focus

- Hands drop out mid-pull: the opening stays where it was (no snap back).
- Switching between open hands and fists mid-gesture restarts the reference, so neither zoom nor opening jumps.
- Pointing over the side panel or a button never picks a part behind it.
- The card hides when a lesson, tour or drill-in starts, and when the level changes.
- Skipping or finishing the intro stores it; Replay works after that.

---

### Task 1: Pull apart and zoom
**Files:** `src/main.js` (two-hand block in `control`, `drawZoom` label), `index.html` (gesture rows)
- [ ] Open hands: `explodeTarget = clamp(e0 + (dist − d0) / (0.3·W), 0, 1)`; fists: existing zoom; the reference `{kind, d0, s0, e0}` restarts when `kind` changes.

### Task 2: Point at the model
**Files:** `src/ui/pointer.js` (`update(tip, dt, atModel)`), `src/main.js`
- [ ] `atModel(x, y)` returns a cached `{ click }` per part index or null; skipped over UI; hover follows the fingertip.

### Task 3: Part card
**Files:** `index.html`, `src/styles.css`, `src/main.js`
- [ ] Shown from `showPart` in Explore when nothing else is running; positioned each frame beside the part's label point; buttons click `#part-learn` / `#part-study`.

### Task 4: Intro
**Files:** `src/ui/intro.js`, `scripts/intro.test.mjs`, `src/main.js`, `index.html`, `src/styles.css`
- [ ] `createIntro()` → `{ step, tick({ turned, explode, sel }) , skip() }` with steps `turn → pull → point → done`; test the order and that each waits for its signal.
- [ ] Labels: in the pull step, part k of n (surface first) shows once `explode ≥ 0.8·(k+1)/n`, flashing for 1 s.
- [ ] Runs after Start camera / Use the mouse when not seen; Skip; Replay in Stuck?.

### Task 5: Checks
- [ ] `npm test`, `npm run test:release`, `npm run build`; browser: intro with the mouse end to end, card at Normal and Advanced.
