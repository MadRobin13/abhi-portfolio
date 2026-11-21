# ASCII portrait / About page revision — 2026-11-21

## Source baseline

Built **on top of** `ABHI_PORTFOLIO_NOV21_2026_COMPLETE_SOURCE.zip`, rather than the older portfolio versions. All existing project content, photos, footage, link corrections, and previously requested removals are retained in the unmodified source assets.

## The live programmed 3D ASCII head

- `assets/portrait3d.js` contains the entire renderer. **There is no AI-generated graphic, GIF, or video in the new hero.**
- The head is built from a parametric 3D surface with a rotating Y axis, rounded ears, a short neck and wire-frame glasses.
- The shape is perspective-projected at each frame to a character-cell buffer with depth testing. ASCII glyphs are then drawn individually to `<canvas id="ascii-orb">`.
- Tone/edge detail is calculated at runtime from the already-supplied **real** head-on portrait (`assets/media/photos/01-identity-restaurant-portrait-original-photograph.webp`), allowing the glyph model to reflect the user's actual hair and glasses rather than an invented face. The original photo is *not* directly displayed in the hero.
- The slow rotation loops every approximately 29 seconds, and prefers-reduced-motion freezes it at the front view. There is no pause-art button.
- The previous ASCII gyroscope is replaced. The subtle existing ASCII field behind the site remains.
- The previous SVG ASCII face was susceptible to font metric changes and aspect ratio differences. It is no longer displayed. Canvas glyph positions now come from fixed pixel coordinates, not the browser's layout of hundreds of SVG text rows.
- **Limitation:** The available photographic reference is frontal. The geometry and rear-view texture are approximations, not a true photogrammetry scan. The closer-to-front angles use the genuine portrait for likeness.

## Home / About layout

- Home page retains the project, recognition, experience, source, and contact sections.
- The row of three personal photos is removed from the homepage, replaced by a concise About summary and an About-page link.
- `about.html` is a genuine second page (not a modal or anchor-only section).
- NVIDIA photograph is the main About image.
- Childhood electrical-engineering image sits next to the early-curiosity section.
- Prehistoric shark image supports the separate paleontology section.
- Each About image and story is intentionally integrated into its matching content block.
- Navigation About links go to `about.html` on both desktop and mobile.
- Vercel build now includes `about.html` as well as `index.html` and assets; no new routes or DNS settings are required.

## Files changed / new

Changed: `index.html`, `assets/site.js`, `scripts/build.mjs`, `package.json`

Added: `about.html`, `assets/portrait3d.js`, `assets/portrait-upgrade.css`, `assets/about.css`, `assets/about.js`, `tests/portrait3d.cjs`, this document.

No other existing content or media files modified. The old ASCII SVG remains in the asset folder but is no longer referenced by the rendered pages.

## Previously completed fixes preserved

- FRC historical hardware photograph removed.
- Misattributed PET, TRIGR and Strobe videos corrected/removed as in prior revision.
- Duplicate SymptoAI and Eureka Hacks images removed and wrong Eureka/Hack the Ridge attribution corrected.
- No unintended default GitHub link in printing-business entry.
- Platform-specific link labels remain.
- `media-contract.cjs` tests still enforce media gallery attributions and video audio policy.

## Automated verification

- `npm run lint`: PASS
- `npm test`: PASS (including added live-geometry/rotation and About page tests)
- `npm run build`: PASS
- Built `dist/about.html`: present

**Browser screenshot limitation:** The available headless browser sandbox blocked local file and localhost navigation. This means desktop/mobile visual screenshots **could not be certified** in-browser. Review the page on your Vercel deployment after pushing. The rotation/character positions are unit-verified in a mocked canvas.

## If adjusting the portrait

- Source photo crop lives in `assets/portrait3d.js`, `context.drawImage(...)`.
- Head shape is `profile` and its perspective in `render()`.
- Speed is `const rotation = time * .215` (radians/sec).
- Desktop/mobile size and position are `cx`, `cy`, `scale`, `cellW` in `render()`.
- **Do not replace the renderer with an AI image, sprite sheet, CSS-distorted text block or GIF.**

## Deployment

The `UPDATE_ONLY` ZIP merges directly into the root of the repository. It was generated for a repository on the previous `ABHI_PORTFOLIO_NOV21_2026_COMPLETE_SOURCE` source revision. If you've independently edited any changed file since that revision, compare `git diff` and merge carefully rather than overwriting your work.

After unpacking: `npm ci`, `npm run lint`, `npm test`, `npm run build`, then commit and push. Vercel will deploy to your existing `abhimanyu.is-a.dev` without changing is-a.dev DNS.
