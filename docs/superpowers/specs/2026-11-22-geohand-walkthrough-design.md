# GeoHand part walkthroughs: design

Date: 2026-11-22. Approach A, chosen by the owner: annotated close-ups. No process animations yet.

## Why

The owner's feedback was that numbers in a side panel mean nothing if the learner cannot see what they describe. Today the lesson turns the whole Earth and shows one sentence per layer. A learner should be able to take a part out, look at what it is made of, and see what its numbers mean: a 7 km bar next to a 40 km bar, not two lines of text.

## Goals

- **Separate a part:** take one part out of the Earth, so it is the only thing in view.
- **Walk through it** in steps:
  - what it is made of
  - how it forms
  - what happens to it over time (as far as the sources go)
- **Labels and measurements** sit on the 3D view itself, each with its reference. The side panel stays for detail and questions.
- **Levels:** each level has its own walkthrough text. Higher levels can add sub-parts and steps.

## Non-goals (for now)

- Process animations: melt rising at a ridge, slabs sinking, plumes, the inner core freezing. They come later as approach B, if wanted.
- New facts. A step, label or measurement exists only if a checked reference supports it. Parts whose sources are thin, such as the asthenosphere, get short walkthroughs.

## Anti-goals

- **No decorative detail.** Nothing drawn that suggests a fact the sources don't give, such as rock textures, mineral grains or colours meant to look "real".
- **No hidden exaggeration.** If a close-up is not to scale, the view says so.

## Approaches considered

| | What it is | Trade-off |
|---|---|---|
| **A. Annotated close-ups** (chosen) | The part separates; a close-up model shows its sub-layers with labels and scale bars; each step is a posed view | Moderate work, stays close to the sources |
| B. A plus process animations | Adds moving melt, slabs, plumes and freezing | Much more work; every motion needs a source |
| C. Text-only lesson upgrade | Better step text on the current whole-Earth view | Cheap, but doesn't fix "what am I looking at" |

## How it works

### 1. Separation, in the Earth model

- **Fading the rest:** a new scene uniform, `uFocus`, fades every part except the chosen one to about 8% brightness.
- **Lifting the part:** the chosen part moves toward the viewer through the existing per-part offsets (`uOff`).
- **Return:** both ease back when the walkthrough ends.
- **Picking:** faded parts cannot be picked.

### 2. Close-up models

- **What they are:** extra entries in `MODELS`, one per walkthrough that needs one. Each is a small labelled cross-section block built from point clouds with the existing `box`, `rod` and `tube` helpers. The first two are an oceanic crust block and a continental crust block.
- **Hidden from the model list:** close-ups are reached only through a walkthrough.
- **Switching in:** the scene's existing scatter transition switches from the Earth to the close-up and back.
- **Sub-parts:** each one is a normal part (24 or fewer per model), so picking, hover and the panel all work as they do now.
- **Scale bars:** a new part kind, `ruler`, drawn as a line of points with end ticks. Its label is the measurement, for example "7.1 km".
- **Geometry:** each close-up takes its thicknesses from `numbers.js`, so a drawn layer cannot disagree with its cited value.
  - If a close-up is not to scale, its first step says so, and so does its simplification note.

### 3. Labels on the view

- **Always on:** during a walkthrough, every label for the step's chosen sub-parts shows, using the existing leader-line labels.
- **Second line:** a label can carry a value under the name, such as "Layer 3, about 5.0 km".
- **Sources:** every label value comes from `numbers.js`, so it already has a reference and a page. It is not typed again.

### 4. Content

`src/content/earth/walkthroughs.js` holds `WALKTHROUGHS[level][partId]`, a list of steps:

```js
{ model: 'earth' | '<closeup id>', focus, show: [subpartIds], explode, view: { x, y, z }, text, refs: [ids] }
```

- **Sub-part content:** close-up sub-parts get the same fields as Earth parts (title, short, long, numbers, questions), in a `closeups` section of the level files.
- **Content check:** it covers walkthroughs too:
  - every model and focus id exists
  - every ref is checked
  - no DRAFT text at release
  - every drawn thickness matches its number

### 5. Where learners meet it

- **Lesson mode:** becomes a chain of part walkthroughs in a set order. For A-level: crust, mantle, outer core, inner core. A short whole-Earth view at the start and end ties them together.
  - Next and Back work as now: the peace gesture, the buttons and the arrow keys.
  - Free look (aim, grab, zoom) still works during any step.
- **Explore mode:** when a part has a walkthrough, its panel shows "Take it apart" to start it.
  - "Back to Earth" leaves at any step.

## Pilot and rollout

1. **Build the machinery** (separation, close-up models, rulers, labels with values, the walkthrough runner, content checks and tests) with one pilot: the **A-level crust**. The steps would be:
   1. Separate the crust.
   2. Ocean crust against continental crust: two blocks side by side with 7 km and 40 km bars.
   3. Inside ocean crust: layers 2 and 3 with their thicknesses (White et al. 1992, Table 8).
   4. How ocean crust forms at mid-ocean ridges, as a labelled still (White et al. 1992, p. 19,683).
   5. Continental crust: thicker and richer in silica, up to 70 km under Tibet (Mooney et al. 1998; Rudnick & Gao 2003).
   6. Back into the Earth.
2. **Owner review of the pilot.**
3. **Roll out** part by part, one level at a time, each reviewed before the next.

## Constraints

- Plain JS, Three.js point clouds, no framework, no new dependency.
- Text is rendered with `textContent` and the rich-text markup only.
- 24 parts per model at most.
- Hand gestures and the `?debug` test keep working.
- The owner's external review (`docs/review-prompt.md`) may change wording or values. Walkthrough text is written after that review's fixes are in.

## Left to the builder

- Exact colours and how the fade looks.
- Block proportions within the "to scale or say so" rule.
- Where "Take it apart" and "Back to Earth" sit in the panel.
- Camera easing.
