# Copy, chronology, links, NAVI and ASCII logo revision

This update builds on the last Recognitions and Media Fixed release. It does not change the original moving ASCII gyroscope, responsive face portrait, project media assignments, About photographs or recognitions carousel.

## Changes

1. Reworked public site text with the human-write skill as editorial guidance. Removed em dashes and en dashes from the site text and dynamic project descriptions. Reduced repeated ornamental punctuation and generic phrases. Real technical terms such as USB-A remain in their standard spellings.
2. Revised the About page opening. It now talks about programming robots and designing useful physical objects rather than a generic line about figuring out why something fails.
3. Corrected FIRST history across the homepage, About page, FRC project details, awards and FLL activity. Joined Team 1360's FIRST community through FLL in 2019 and moved into FRC in 2022. Programming Lead seasons remain 2025 and 2026.
4. Removed the mechanical three-verb sentence in About and refined project descriptions where automatic editing could produce awkward language, especially NAVI and SymptoAI.
5. Added Printables, Cults3D and email links to the homepage About panel. Added GitHub, LinkedIn, Devpost, Printables, Cults3D and Email to the dedicated About page and its footer, using the already established website URLs.
6. Centered NAVI's provisional ASCII artwork using coordinates based on the actual media frame, and anchored its canvas to its container at every viewport width. No fake NAVI photograph was added.
7. Rebuilt the original A logo as a stable grid of individually positioned ASCII hash glyphs in SVG. Applied the same design to the favicon. No AI image was used.
8. Added tests/copy-integrity.cjs and included it in npm test to detect reintroduced long dashes, missing About links, incorrect FIRST history and NAVI/media regressions.

## Verification

- npm run lint: PASS
- npm test: PASS (including copy integrity and existing media regression tests)
- npm run build: PASS
- Inline-browser rendering at 390 and 1440 pixels: PASS for page initialization, no JavaScript errors, and no horizontal overflow
- NAVI canvas center offset: 0 pixels at 390 and 1440 pixel widths; screenshot verified
- No changes to bundled videos, media photos or audio stripping

## Limits

This session's browser navigation is blocked. A static page render was checked by inlining the site's CSS and JavaScript into a test document. Local photo URLs do not load in that isolated renderer, so those screenshots are not proof of live image loading. The original media references remain unchanged, and prior media tests pass. Confirm final appearance on Vercel after deployment.

## Deployment

Use the update-only ZIP only if your repo already contains the previous Recognitions and Media Fixed release. Otherwise use the complete source ZIP after reviewing any uncommitted changes. The updater does not remove any files and does not alter DNS settings.
