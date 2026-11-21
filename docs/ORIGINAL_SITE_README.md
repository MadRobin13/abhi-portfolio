# ABHI / ASCII FIELD — All-Media Edition

Working extension of the user-selected `ABHI_ASCII_FIELD_INTERACTIVE_PREVIEW.html` design. **Not a redesign from a different baseline.**

## Open locally

Unzip the source archive and open `index.html` in a modern browser. It uses plain HTML/CSS/JS and relative media paths. A static file server is also supported: `python3 -m http.server 8000`. No npm or dependencies are required.

## What is included

- Original animated ASCII armillary/torus environment with a new short ASCII name introduction. It can be skipped; it does not hijack page scrolling.
- Restaurant portrait transformed into a character-based face study; original real photo retained. Full-frame NVIDIA and childhood photographs appear in the About section.
- Black/off-white with lime accent and optional orange accent on desktop; no giant decorative slogans.
- 42 still-image records and 7 playable project-video records from user uploads and the original authentic portfolio assets.
- 14 project entries including **TRIGR** (8 outputs, optocoupler isolation), **Strobe**, and **3D Printing Business**; 6 original awards, 10 activities, and 64 public repository records.
- Source original photographs, WebP display copies, video poster frames, and web-optimized MP4s.
- Full category-based media gallery, in-page project galleries, evidence captions and permission flags.

## Important context

- No original photos are physically cropped. The only cropped derivative is the ASCII portrait study; see `docs/DETAILED_MEDIA_REVIEW.md` for exact coordinates.
- Videos are optimized, muted copies. The user's original MOV/MP4 uploads remain unchanged and are not duplicated in the deliverable because they exceed 300 MB in aggregate.
- Design-reference videos/screenshots (Russ, Davor, component reels) are not published as the user's work.
- Some gallery photos show identifiable students or team members; check permission before deploying.
- Some older content claims and two video attributions still require review, fully documented in the media audit.
- Do not claim the project is deployed.

## Editing

- `assets/content.js`: inherited information; `assets/content-extensions.js`: TRIGR, Strobe label and printing business.
- `assets/media.js`: first media for each project card.
- `assets/archive.js`: complete media manifest.
- `assets/site.js`: original animated ASCII field and project rendering.
- `assets/media-explorer.js`: filters, lightbox, intro and real project media galleries.
- `assets/site.css`: original layout; `assets/upgrade.css`: dark/lime styling, media, portrait, intro, responsive fixes.
- `docs/MEDIA_AUDIT.json`: all file-level mapping metadata; `docs/DETAILED_MEDIA_REVIEW.md`: human-readable audit.

## QA performed

Node syntax and mock-DOM render tests passed. An in-memory Chromium browser check confirmed all 14 project cards render, media and project dialogs open and close, mobile navigation works, and no document-level horizontal overflow occurs at 320, 390, 768 or 1440 pixels. No JavaScript page errors were observed. Video files have been separately validated by ffprobe. Direct navigation to a local test URL is blocked by an administrator policy, so full original-source HTTP playback tests remain to be completed outside this environment.
