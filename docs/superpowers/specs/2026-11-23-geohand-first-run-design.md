# GeoHand: first run, pull apart, and the part card

## Why

The app should open on the whole Earth and teach each control at the moment it is needed, not as a list. Pulling the Earth apart should feel like the first reveal, with each layer named as it comes away. Picking any part should make a promise: learn this part, or walk down from here.

## Goals

- First visit: the whole Earth, then one instruction at a time, each waiting until it is done: turn it, pull it apart, point at a part.
- While the Earth opens, each part's label lights up as that part separates, from the surface inwards.
- Pointing at the model picks a part, the same way pointing at a button clicks it.
- Whenever a part is picked in Explore, a card beside it offers: learn about this part (the drill-in) or walk down from here (the lesson from that part).

## Non-goals

- Phones (desktop only).
- New content: the card's hook is the part's first cited question; counts come from the existing loops and lessons.

## Anti-goals

- An intro that blocks: it can be skipped at any time and never shows again unless replayed.
- A card that covers the part it describes.

## Approaches

1. **Coach card driven by what the user does (chosen).** A small state machine reads rotation, explode and selection each frame and moves on when each is done. Works the same with hands or mouse.
2. Timed tour of the controls. Simpler, but people who are slower or faster than the timer lose the thread.
3. Modal tutorial screens before the model. Teaches nothing by doing.

## Decided (my calls, user delegated UX)

- **Gestures:** two open hands moving apart opens the Earth (together closes it); two fists moving apart zooms; two fists held still still resets. Mouse: drag turns, the Pull it apart button or space opens, click picks.
- **Pointing at the model:** the fingertip hovers the part under it; holding still for the usual dwell (0.8 s) picks it.
- **Labels during the intro:** in surface-to-centre order, part k's label appears and flashes as the opening passes k/n of the way; the newest one also glows on the model.
- **Card:** title, the part's first question as the hook, "Learn about this part · N questions, about 2 minutes" (when a drill-in exists) and "Walk down from here · N stops" (lesson steps from that part to the end). It sits beside the part's label point, kept on screen. Not shown during a lesson, tour or drill-in.
- **Once per browser** (localStorage); Skip button; "Replay the intro" in the Stuck? menu. Not run by Watch the tour.

## Left to the builder

Card styling within the existing panel style; exact rotation threshold for "turned".
