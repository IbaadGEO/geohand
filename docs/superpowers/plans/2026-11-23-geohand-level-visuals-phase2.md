# Level visuals, phase 2: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Three data views: Temperature (Intermediate+), LAB depth map (Intermediate+) and Tomography (Advanced), each drawn from a published table or dataset.

**Architecture:** Packed data files in `public/data/` (written once by `scripts/pack_phase2.py`), small lookup modules in `src/content/earth/`, and two overlay builders: the existing surface-dot map (generalised from `crustMap.js`) and a new cut-face dot map for depth slices. Views are appended after `crust1`, so the shader dims the layer faces under them.

**Tech Stack:** Vite, Three.js points, `node --test`; Python (numpy, h5py) for packing only.

**Spec:** `docs/superpowers/specs/2026-11-23-geohand-level-visuals-design.md` (phase 2)

## Global Constraints

- Values come from: Katsura (2022) Table 3 (CC BY 4.0); Anzellini et al. (2013) p. 466; Hirose et al. (2013) p. 682; Seton et al. (2020) age grid (CC BY 4.0); SEMUCB-WM1 (French & Romanowicz 2014; EMC doi:10.17611/dp/emc.2023.semucbwm1.1); Fischer et al. (2010) p. 565.
- Anything joined between cited points says so in the view's note.
- The raw `.nc` files and papers are not copied into the project; only the packed files are.

## Review Focus

- A view's data fails to load: a toast, and the view still switches.
- Leaving a view while its data loads must not show the overlay later (the `wanted` flag).
- Switching level hides views the level does not have (existing `syncViews`).
- The tomography slice's longitudes match the crust map's convention (no mirror).
- Depth from drawn radius inverts `drawnDepth` exactly.

---

### Task 1: Pack the data (done by `scripts/pack_phase2.py`)
- [x] `seafloor-age.bin`: 180 × 360 Uint8 in CRUST1.0 cell order; mean age in Ma, 255 = not ocean.
- [x] `semucb-equator.bin`: 69 depths (80–2,891 km) × 360 Int8; Vs anomaly in 0.1% against the global mean at each depth.

### Task 2: Lookups
**Files:** `src/content/earth/temperature.js`, `seafloor.js`, `semucb.js`; `src/models/earth.js` (`depthAtRadius`); tests in `scripts/phase2.test.mjs`
- [ ] `tempAt(km)`: Katsura Table 3 from 50 to 2,800 km; then straight to 4,050 K at the CMB (Anzellini), 5,450 K at the ICB (middle of Hirose's 5,200–5,700 K) and 5,500 K at the centre (middle of 5,000–6,000 K); `null` above 50 km. Test: 50 → 1646, 1000 → 2090, 2800 → 2587, 2891 → 4050, 30 → null.
- [ ] `ageAt(bytes, lat, lon)` → Ma or `null`; `dvsAt(bytes, km, lonDeg)` → % (nearest depth row and 1° column). Tests on known cells: NW Pacific 30.5N 150.5E old (> 120 Ma), Tibet `null`; tomography slow (< −1.5%) at 2,841 km under 150°W and 15°E.
- [ ] `depthAtRadius(r)` inverts `KM`: round trip at 0, 35, 410, 660, 2891, 6371.

### Task 3: Overlays and views
**Files:** `src/ui/crustMap.js` → `src/ui/surfaceMap.js` (`buildSurfaceMap(view, uniforms, source)`), new `src/ui/cutMap.js` (`buildCutMap(view, uniforms, source)`), `src/ui/propertyView.js`, `src/main.js`, `scripts/views.test.mjs`
- [ ] `source = { file?, colorAt(bytes, a, b, color) → boolean }`; false skips the dot.
- [ ] Views `temperature`, `labmap` (levels Intermediate, Advanced) and `tomo` (Advanced), each with title, note (sources, what is joined or schematic), caption and one question.
- [ ] `main.js` keeps one map of overlays by view id; shows the one picked, toasts if its data fails.

### Task 4: Sources, docs, checks
- [ ] References `katsura2022`, `seton2020`, `french2014`; `docs/sources.md` rows with licences; `docs/values-to-check.md` section 7.
- [ ] `npm test`, `npm run test:release`, `npm run build`; browser check of each view at each level.
