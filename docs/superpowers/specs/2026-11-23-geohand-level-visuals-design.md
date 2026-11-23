# GeoHand: visuals that deepen with the level

## Why

The Composition, Density, S-wave speed and Earthquake views, and the motion on the cut face, are drawn the same at every level. An Advanced user sees more parts and more text, but not a deeper picture. The higher levels should show things the lower levels leave out, drawn from cited numbers or published data, never traced from a paper's figure.

## Goals

- Intermediate and Advanced each show at least one thing on the model that Normal does not.
- Every new mark on the model is tied to a cited value already in `numbers.js` or to a published dataset, and its caption says which.
- Where it is schematic (position or shape illustrative), the caption says so, as the convection layer already does.

## Non-goals

- Normal stays as it is.
- Boundary sharpness (410 about 7 km, 660 under 4 km) stays as text. At the drawn scale a 7 km gradient is under a pixel.
- No change to slab and plume positions in this round. They stay schematic until real tomography data is in (phase 2).

## Anti-goals

- A mark that looks like data but is guessed between two cited points without saying so.
- Clutter: Advanced must still read clearly when a layer is selected.

## Approaches considered

1. **New level-gated views only** (like Crust thickness). Clean, but every detail becomes a button, and the Layers view, which people use most, stays flat.
2. **Detail drawn on the existing cut face, keyed to the level.** The Layers view itself gets richer as the level rises; no new buttons. Limited to what can be drawn on the equatorial cut.
3. **Both: cut-face detail now, new data views when the data is in.** Chosen. Phase 1 needs no new sources; phase 2 adds views that need datasets.

## Phase 1: cut-face detail (no new sources needed)

Drawn as geometry in `buildEarth(level)`, which already builds a different model per level, so each mark is a pickable part with its own cited caption. (The first draft used a shader uniform; geometry needs no shader change and gives each mark a caption.)

| Detail | Level | What is drawn | Source |
|---|---|---|---|
| Plate age and the LAB | Intermediate+ | The `lab` boundary on the oceanic part of the cut deepens from ridge to old plate: 55 km at 25 Ma, 76 km at 49 Ma, 82 km at 129 Ma. Ages outside 25–129 Ma are not drawn, so the 104 km asymptote of the fitted cooling model stays in the text. Under the continental wedge it sits at about 200 km. | Fischer et al. 2010, pp. 553, 565 |
| 520 km boundary | Advanced | A faint line inside the transition zone at 520 km, labelled wadsleyite → ringwoodite. | Frost 2008, p. 172 |
| Post-perovskite | Advanced | A band in D″ from about 2,700 km to the CMB, with short streaks lined up along it for the aligned platy crystals (V~SH~ > V~SV~). Caption: the band's depth is from the paper; its even spread round the cut is schematic. | Murakami et al. 2004, pp. 855, 857–858 |

**Decided by me (to check):**
- The measured LAB is its own part, `lab-measured` ("Measured LAB (by plate age)"), beside the existing PREM lid base at 80 km, which keeps its title and numbers. The shells stay at the PREM reference.
- Plate age runs one way round the oceanic arc of the cut. Which end is the ridge is illustrative; the depths at each age are not.
- Between Fischer's three ages the line is joined straight, and the caption says so.

## Phase 2: data views (each waits on a source below)

| View | Level | Needs |
|---|---|---|
| Temperature | Intermediate+ | A published temperature profile through the mantle, so the colour between cited points is not guessed. The cited points already in: 410 km 1,480 °C (Frost), CMB 4,050 ± 500 K (Anzellini), top of outer core about 4,000 K, ICB 5,200–5,700 K, centre 5,000–6,000 K (Hirose). At Advanced the legend marks both estimates side by side: ICB 5,200–5,700 K and pure-iron melting 6,230 K; the boundary layer above the core 1,000 ± 500 K (Lay) and about 1,400 K (Anzellini). |
| Real LAB map | Intermediate+ | A seafloor age grid. With Fischer's depths it gives a world map of LAB depth, the same way Crust thickness works. |
| Tomography | Advanced | A shear-wave tomography model. The equatorial cut is coloured by real speed anomaly, so slabs, plumes and the LLSVPs come from data, not a schematic. |

## Builder notes

- `faceColors` reads `VIEWS` indices 3 and 4; the face shader dims layers for `uProp >= 4.5`. A Temperature view needs its own colour attribute and shader branch, appended after `crust1`.
- Every new caption goes through `checkContent` (cited, no DRAFT text).
- Tests: a pure `labDepth(ageMa)` in `src/content/earth/` with a `node --test` check against Fischer's points; `views.test` updated for any new view.
- Check in the browser at all three levels, with a layer selected and not.
