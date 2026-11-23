# GeoHand

Learn Earth's interior with hand gestures or a mouse, at three levels of detail: Normal, Intermediate and Advanced. Pull the Earth apart, pick a layer or boundary, and see the evidence behind each claim, with every number cited to a public source.

**Try it:** https://geohand-theta.vercel.app (desktop Chrome, Edge or Firefox; a webcam for hand controls)

## Controls

**Mouse**

- Drag the background to turn the Earth; scroll to zoom.
- Click a layer to pick it, or drag it out.
- Press Pull it apart, or the space bar, to open the Earth.
- Arrow keys move between layers; double-click or press R to reset.

**Hands**

- Open hand, moved: turn the Earth.
- Point at a part or button and hold until the ring fills: pick it. Pointing at a closed Earth and holding opens it.
- Both hands open, pulled apart: open the Earth. "Put Earth back together" closes it.
- Two fists, moved apart or together: zoom.
- Peace sign, held still: next layer.

Stuck at any point? The **Stuck?** button (bottom right) goes back a step, replays it, or jumps to another.

## Camera and privacy

- Hand tracking runs in your browser. No camera images leave your computer, and nothing from the camera is stored.
- **Ask a question** sends your question with the level and the selected part.
- **Report a problem** (in the Stuck? menu) sends your description with the level, mouse or hands, the current view, what was running, your browser name and version, and your screen size.
- No IP address is stored. It is used only, as a daily-changing hash, to limit each visitor to 5 messages an hour.
- Answered questions may appear anonymously below.

## Run it locally

```
npm install
npm run dev
npm test
```

Adding `?debug` to the address in `npm run dev` opens the gesture test; the public site does not include it.

## Credits

Built on [HoloHand](https://github.com/IbaadGEO/HoloHand-Gesture-Agent-3D), which grew from Tuba Khan's [HoloHand-Gesture-Agent-3D](https://github.com/tubakhxn/HoloHand-Gesture-Agent-3D) (MIT). Hand tracking uses [MediaPipe](https://ai.google.dev/edge/mediapipe) and the 3D view [three.js](https://threejs.org). Text is set in [Manrope](https://github.com/sharanda/manrope) by The Manrope Project Authors (SIL Open Font License 1.1), bundled with the app. Data sources are cited in the app beside each claim.

## Live updates

Questions visitors asked that now have a cited answer in the app, newest first.

<!-- live-updates:start -->
_No visitor questions answered yet._
<!-- live-updates:end -->
