# GeoHand: concept drill-in, pointing and the Stuck? menu

2026-11-23. The owner handed the how to me ("go with whatever you think is best"); the calls below are mine unless marked as theirs.

## Why

GeoHand is a supplementary tool used while a concept is being taught. People arrive wanting one thing: to see exactly where a layer is, watch why it behaves as it does, and check the science behind it. They are already reading and listening elsewhere, so the visuals have to land on their own, at the right moment, with little text on screen. (Owner's framing.)

Hand control is good for big spatial actions and poor for reading or precise picking. So hands should be used at the points where looking is the task, not alongside dense text.

## Goals

- Turn "Learn this layer" into a drill-in: question → where it is → why it happens → your turn → the evidence → test → recap.
- Every drill-in stage restores a saved picture of the model, so stages can be replayed or jumped to.
- One hand control for anything on screen: point with the index finger and hold on a button (owner asked for something better than swiping).
- A Stuck? menu: go back, replay, "where are you stuck?" (list of stages, jump to one), ask a question (owner's idea).

## Non-goals

- No new geological content or claims. Every stage reuses text already in `learn.js`, `undergrad.js`, `postgrad.js`, `alevel.js` with its existing citations.
- No new gestures beyond pointing. No swiping.
- No per-layer authored "your turn" tasks yet; the prompt reuses the loop's `see.look` text.

## Anti-goals

- A help menu that opens by accident. Pointing and pausing to read must never open it, which is why it opens from a button, not a gesture.
- Hiding the citations. The evidence stage keeps every page locator.

## Approaches considered

1. **Concept drill-in built on the existing learn loop (chosen).** The loop already has check → see → understand → test, and `see` already switches to the view that shows the layer best. Adding stages and saved pictures is mostly plumbing.
2. **Watch-then-your-turn tour.** Linear; does not let someone jump straight to the concept being taught.
3. **Explore mode plus pointing and close-up zoom only.** Cheapest, but shows no cause.

The owner picked "whatever you think is best"; I chose 1 plus pointing plus the Stuck? menu.

## Design

### Stages (`src/ui/learnLoop.js`)

| Stage | Panel shows | Model |
|---|---|---|
| 1 Question | the loop's `check` question | whole Earth |
| 2 Where it is | "This is the {title}." + the part's simplification note | layer highlighted and pulled aside, zoomed in (scale 1.6) |
| 3 Why it happens | the loop's `see` text (or the crust compare activity) | the loop's `see` view (S-wave speed, earthquake, ...) |
| 4 Your turn | "Your turn: turn it with an open hand, zoom with two hands, or point at a view to switch. Look for: {see.look}" | same as stage 3, free to move |
| 5 The evidence | the part's `short` text and its cited numbers | same as stage 3 |
| 6+ Test | the loop's tests | unchanged |
| Recap | score | unchanged |

A stage's picture is captured when the stage is first set up: highlighted part, isolated part and pull, zoom, rotation, explode and view. Restoring sets the view first (it changes explode and isolation), then the rest, with rotation eased through the existing `viewTarget`. Replay restores the picture and restarts the view's animation (the earthquake rays start again).

### Pointing (`src/ui/pointer.js`)

When the primary hand shows `POINT` (already recognised by `gestureEngine.js`, currently unused), a cursor follows the index fingertip. Holding it on the same clickable element (button or view tab) for 0.8 s clicks it; a ring on the cursor fills meanwhile. After a click the same element cannot fire again until the finger leaves it. Pointing does not turn the Earth. The canvases already have `pointer-events: none`, so `elementFromPoint` finds the panel and toolbar buttons beneath the cursor.

### Stuck? menu (`src/ui/stuck.js`)

A "Stuck?" button sits bottom right, always visible after the start screen; click or point at it. The menu lists:

1. Go back (previous stage / lesson step / tour step)
2. Replay this step
3. Where are you stuck? the stage or step names; picking one jumps there
4. Ask a question (the existing question box)

The menu asks main.js for a provider of whatever is running: the drill-in, else the guided lesson, else the tour. With none running it offers: Reset the model, Play the tour, Ask a question.

## Left to the builder

- Exact zoom and pull values for stage 2, tuned by eye.
- Cursor and menu styling, using the existing glass panel tokens.

## Tests

- Unit: pointer dwell (fires once after 0.8 s on one target, restarts when the target changes, re-arms after leaving).
- Unit: the stage list for a loop has the stages above in order, with the right count.
- Existing tests keep passing; browser check of a full drill-in with the mouse and of the Stuck? jump.
