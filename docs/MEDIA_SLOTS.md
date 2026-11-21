# Authentic media handoff

Update `assets/media.js` and add your files under `assets/images/` (or create `assets/video/`). Images always render as genuine photographs, not ASCII. Project previews can autoplay muted when in view.

Priority order:

1. `frc-1360` — 2026 robot competition photograph, autonomous shooting, shooting while moving. Current FRC image is a real but **older workshop** photograph.
2. `muse` — device photograph, head/arm/hand demonstration clips. Current device photo is authentic.
3. `pet-filament` — PET strip -> extrusion -> final filament -> printed object.
4. `ican-sort` — sorter hardware working demonstration.
5. `navi` — prototype navigation test and screen interface.
6. `led-matrix` — programmed light animation footage.
7. `symptoai`, `soap`, `terminal-ai` — real app screenshots or recordings.
8. `cad` — your actual models/renders.

Existing `splitter` board and enclosure photographs are authentic. Supplied images are left completely unchanged.

For example, edit:

```js
"frc-1360": {
  image: "assets/images/frc-2026.jpg",
  video: "assets/video/frc-moving-shot.mp4",
  caption: "REAL 2026 FRC ROBOT FOOTAGE"
}
```
