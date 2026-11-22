# GeoHand learning experience

Date: 2026-11-22. Status: agreed in conversation. The user delegated how it operates; this document records the calls made.

## Why

GeoHand shows a labelled cloud of dots and cited numbers. That is visually appealing, but a learner can turn and highlight it without understanding anything, and neither they nor the tool can tell what they knew before or after. It is a general learning tool for three levels (A-level, Undergraduate, Postgraduate), not tied to a curriculum.

## Goals

- Every layer **looks like what it is**. Motion shows the physical state, so the dots carry meaning.
- Every layer has a short **learning loop**:
  1. check
  2. see
  3. understand
  4. test
  5. adapt
  6. record
- The **tour** carries the same loop for viewers who use neither hands nor mouse.
- The learner can see **progress**: what they knew before and what they know now.

## Non-goals

- Curriculum or exam-board mapping.
- Accounts or server-side storage. Progress lives in the viewer's own browser.
- New facts. Every statement and every correct answer comes from content that is already cited, with page locators.

## Anti-goals

- Motion that implies something false, such as liquid shown flowing in a solid layer.
- Questions whose "correct" answer is not in the cited content.
- Testing that blocks the tour or the explorer. Every question can be skipped.

## Layer animation: state shown by motion

Each part gets a **state**. The state comes from cited content, shown in the panel with its source.

| State | Parts | Motion | Basis |
|---|---|---|---|
| Solid, moves with its plate | crust, lithosphere, lithospheric mantle | still, no twinkle; a solid reads as solid | Garnero et al. 2016, p. 481 (plates are lithosphere) |
| Solid that creeps | asthenosphere | slow drift | PREM, Table I and footnote, p. 308: shear waves pass, slower than in the lid |
| Solid, convects slowly | mantle and its subdivisions, D″, LLSVPs | slabs and plumes on the cut face (see below) | PREM, Table I, p. 308 (shear waves pass); Garnero et al. 2016, p. 481 (slow mantle convection) |
| Liquid, flows | outer core | swirling flow | PREM, Table I, p. 308: shear-wave speed 0 |
| Solid | inner core, innermost inner core | still | PREM, Table I, p. 308: shear waves pass |
| Boundary | Moho, LAB, 410, 660, CMB, ICB | a slow pulse travels round the ring | the boundaries are seismic discontinuities |

- A caption states that speeds are **not to scale** and the motion is schematic.
- Reduced-motion settings switch the motion off.

## Learning loop

The loop is built for A-level crust first, as a pilot. Every item reuses cited text.

1. **Check:** one question before the layer is shown. It records what the learner already knew. A wrong answer is fine.
2. **See:** the layer is highlighted and animated, and the oceanic and continental columns are compared at the same scale (the existing activity).
3. **Understand:** the short cited explanation, beside the model.
4. **Test:** three multiple-choice questions, each followed by feedback explaining the right answer, with its source.
5. **Adapt:** a wrong answer shows the explanation again and offers "See it again", which re-highlights the layer, before moving on.
6. **Record:** the before and after results are stored in the browser. A recap shows "You knew 0 of 1 before; now 3 of 3".

## Tour

When a step's layer has a loop, the tour shows its check question. It waits up to 10 s for an answer, then reveals the answer with its explanation and moves on. A viewer who doesn't touch anything still sees the question and the answer.

## Rollout

The crust pilot comes first. Once it works, the same shape is built for every A-level layer, then for the undergraduate and postgraduate layers as their text is written.

## Cut-away views, 2026-11-22 (informed by docs/inspiration.md #1, #3, #5, #9)

- **"Colour by" switch:** Layers · Composition · Behaviour · Density · S-wave speed. Any view other than Layers cuts the Earth at the equator, hides the upper half, closes the layers and tilts the view onto one solid face.
- **Density and S-wave speed:** computed at each depth from the PREM Table I polynomials (p. 308), in `src/content/earth/prem.js`. Tests check them against the values already cited. The drawing's crust is a schematic 35 km while PREM's crust is 24.4 km, so crust faces read crust values and mantle faces read mantle values.
- **Composition:** crust (about 61% SiO₂; Rudnick & Gao 2003), mantle (about 45% SiO₂ and 38% MgO; McDonough & Sun 1995), core (iron–nickel; McDonough & Sun 1995).
- **Behaviour:** lithosphere (plates; Garnero et al. 2016), asthenosphere (PREM's low-velocity zone: S waves slower and more damped), mantle below (convects slowly), liquid outer core and solid inner core (PREM S-wave speeds). The earlier "State" view is folded in here.
- **Comparing them:** a folded "Why two ways?" section holds a caption, a Compare button that flips the two views every 6 s, and one question (which boundary separates different rock?). Its answer restates the cited content.
- **Colours:** categorical colours are the reference palette's dark-mode slots 1–5, which pass the dataviz validator in order. The two ramps each use a single hue (amber and blue).

## Mantle slabs and plumes, 2026-11-22

The mantle's dots lie only on its outer shell and its equatorial cut, so the flow is drawn on the solid cut face, as textbook cut-aways do. The random convection loops are gone.

- **Slabs** (blue bands, Fukao & Obayashi 2013, pp. 5920, 5932): four sheets sink from the top of the mantle. Two stall above 660 km and lie flat along it; one is trapped and flattens at 1,000 km; one sinks to near the core–mantle boundary.
- **Plumes** (pale columns, French & Romanowicz 2015, pp. 95–96): three broad columns rise from the core–mantle boundary and fade out at about 1,000 km, where the imaged conduits end.
- Brightness travels down the slabs and up the plumes. The rock stays solid, so the dots do not move with it.
- Where the slabs and plumes sit is illustrative, and speeds are not to scale. The panel says so.
- Reduced-motion settings keep the shapes but stop the travelling brightness.
- The pattern is computed from the radius, so it runs across the undergraduate and postgraduate mantle subdivisions as one picture. It shows only in the Layers view.

## Earthquake view, 2026-11-22

- **Earthquake** joins the "Colour by" switch. It uses the same equatorial cut, with the layer colours dimmed, and puts the earthquake at the top.
- **Ray paths** are traced in `src/content/earth/rays.js` from PREM's P and S speeds (Table I, p. 308), using Snell's law for a sphere: r·sin(i)/v stays constant along a ray. Each step integrates exactly near the deepest point of the ray, so the result stays finite there.
- **Checks:** tests compare P travel times with known values (74° in about 699 s; 90° in about 780 s).
- **Shadow zones** come out of the calculation rather than being typed in:
  - no direct P waves from 98° to 141°;
  - no S waves beyond 102°;
  - P waves crossing the inner core land in the P shadow from 133°.
- **Speed:** the page reads these values from `QUAKE_FACTS`, because the full calculation takes about a second. A test checks that the stored values still match the calculation.
- **S waves** stop at the core–mantle boundary, because PREM's S-wave speed is 0 in the outer core. Reflected and converted waves (ScS, PcP, SKS) are left out.
- **Animation:** wavefronts glow and travel out along the rays on a sped-up clock, which the legend says. Shadow zones are marked as coloured bands just outside the surface. Under reduced-motion settings the full paths are shown without animation.
- **Folded section:** a caption and one question: why do no S waves arrive beyond about 102°? The answer is PREM's S-wave speed of 0 in the outer core.

## A-level rollout, 2026-11-22

- Every A-level layer and boundary now has a learning loop: crust, lithosphere, asthenosphere, mantle, outer core, inner core, Moho and core–mantle boundary.
- Each loop is a check question, a "look" step, the cited short text, three tests, and a recap. Every answer restates the layer's cited text, with the same page locators.
- The "look" step switches the model to the view that shows that layer best, with the layer highlighted:
  - Behaviour for the lithosphere and asthenosphere;
  - Layers, with its slabs and plumes, for the mantle;
  - Earthquake for the outer core;
  - S-wave speed for the inner core;
  - Composition for the Moho;
  - Density for the core–mantle boundary.
  - The crust keeps its oceanic/continental comparison.
- The tour picks up every loop's check question automatically.
- Undergraduate and postgraduate loops wait for their text, which is still a draft.
