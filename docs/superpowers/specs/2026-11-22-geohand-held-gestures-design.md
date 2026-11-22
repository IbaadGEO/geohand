# GeoHand hand controls rebuild: held gestures

Date: 2026-11-22. Status: decided (the user chose step-through, one direction, and delegated the remaining operating decisions).

## Why

Two ?debug recordings showed that the old controls could not be tuned into reliability:

- **Pointing set off a pinch.** A pointing hand was read as a pinch for 2.4 s and pulled the crust out. Pinch and point are near-identical hand shapes for the camera.
- **Swipes were unreliable.** Right swipes went 0 for 5 because the direction lock never cleared. Three detector fixes each exposed a new weak point.
- **Choosing a layer was hard.** It meant aiming a fingertip at a dense cloud of dots.
- **A part could get stuck.** A pulled-out part could only come back by a swipe, so when the swipe failed it stayed out until a mouse click.
- **No visible guide.** There was no on-screen list of what each hand motion does.

## Goals

- Nothing happens unless the user clearly means it.
- A layer is chosen without aiming.
- Whatever opens a layer also puts it back.
- The side panel always shows the controls and which one is being recognised.

## Non-goals

- Back-stepping by gesture. Stepping wraps around; the mouse, arrow keys and the layer list still go anywhere.
- Changing the geological content.
- Building the annotated part walkthrough. That is separate work; opening a layer shows its panel, as now.

## Approaches considered

1. **Step through the layers with a held gesture.** Chosen by the user.
2. Hand height as a depth slider.
3. Keep pointing, with bigger targets.

Options 2 and 3 were rejected: option 3 keeps the aiming problem, and option 2 was not the user's pick.

## Design

- **Every command is a held, still shape.** It fires only once the shape is held still for its full time, with a ring filling on the hand and in the panel.
  - Moving the hand, or changing to another shape for longer than about 0.12 s, restarts the hold.
  - After firing, the shape must be released before it can fire again.
  - Logic lives in `src/hold.js` and is unit-tested.
- **Gestures:**

  | Gesture | Hold | Explore | Lesson |
  |---|---|---|---|
  | Open hand, moving | none | turn the Earth | turn the Earth |
  | Peace, held still | 0.5 s | highlight the next layer (wraps; if a layer is open, the next one opens in its place) | next step |
  | Fist, held still | 0.6 s | open the highlighted layer, or put it back (with nothing highlighted, opens the first layer) | open or put back the step's layer |
  | Two hands | 0.25 s (unchanged) | zoom | zoom |

- **Removed:** point and pinch as commands, and swipe. Pinch is removed from the classifier, and `src/swipe.js` and `src/pinchHold.js` are deleted. Hand openness no longer drives the explosion; the explode button, slider and Space key remain.
- **Highlight:** when a layer is selected, the other layers dim to about 30%, so the chosen one reads clearly and its label shows.
- **Side panel:** the gesture list moves out of the collapsed Controls section to an always-visible block. The row text follows the state (for example "Put the layer back"), and the recognised row lights up with its progress ring.
- **Mouse and keyboard:** unchanged, apart from the arrow keys, which use the same step and open-in-place logic.
- **?debug test:** the test steps are rewritten for the new set:
  - **Commands:** peace three times, fist opens, fist closes, two-hand zoom.
  - **Calm checks** (no command may fire): entering with a pointing hand, pointing and pinching around, moving an open hand, and a relaxed hand.

## Left to the builder

- Hold times and the stillness threshold (0.22 viewport widths per second, smoothed). Retune these from a live ?debug recording.

## Revision, 2026-11-22 (after four live runs)

The user found "open your hand, then make a fist" too fiddly, so the scheme is reduced to one command:

- **Peace, held still for 0.5 s,** steps from the whole Earth through each layer and then back to the whole Earth. In a lesson it moves to the next step.
- **The fist command is removed,** along with its open-your-hand-first rule. Each layer is shown in place, highlighted, with the others faded; it is no longer opened.
- **Universal reset:** a toolbar button, double-click, the R key, or two fists held still for 1 s.

## Automatic tour, 2026-11-22

The tour is for viewers who use neither hands nor mouse, at every level.

- **Starting it:** "Play the tour" in the panel, or "Watch the tour" on the start screen.
- **Route:** whole Earth, then every part in depth order (as the peace sign steps), then the whole Earth again. The model spins slowly.
- **Each step:** the part is highlighted, its panel opens, and a caption bar shows its title and text, with a progress bar. A step lasts 6–16 s, set by reading time.
- **Caption text:** a part's short text. Where that is still a draft (undergraduate and postgraduate), the caption uses up to three of its cited values instead. Nothing is written for the tour itself.
- **Controls:** Back, Pause, Next and Stop. The arrow keys and the peace sign step through it, Escape stops it, and clicking the model pauses it. Reset and changing level stop it.
- **Logic:** `src/tour.js`, tested in `scripts/tour.test.mjs`.
