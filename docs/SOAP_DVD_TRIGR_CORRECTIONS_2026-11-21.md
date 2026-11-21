# Portfolio correction: Soap, DVD Pong and TRIGR

## Source of this release
Based on the full 21 November 2026 release `ABHI_PORTFOLIO_ASCII_PANEL_SIZE_COMPLETE_SOURCE.zip` and preserves its responsive 90 by 60 colored ASCII portrait, left rail, rotating recognitions, project media fixes and intro screen.

## Changes

- **Soap:** Deleted the unrelated MongoDB/database screenshot (`mongodb_exmple.png`) from the project evidence and from the global website media archive. Kept `Soap_logo_v2.png` as the only project gallery image.
- **DVD Pong:** Deleted the unrelated Godot export image (`index.png`) from both the project evidence and global website media archive. Kept the genuine DVD Pong logo as the only gallery image. No substitute GIF has been invented.
- **TRIGR:** Corrected its homepage summary, project period, project description, role, motivation and outcome in `assets/content-extensions.js`. It is explicitly an original independent invention designed and built by the portfolio owner for a photography teacher, not school coursework or a photography program. The eight camera outputs and optocoupler isolation are preserved.

## Scope and files

Changed existing files:
- `assets/project-evidence.js`
- `assets/content-extensions.js`
- `tests/media-contract.cjs`

The test checks that both unrelated images cannot return through the global archive, that Soap and DVD Pong galleries have only one correct image each, and that public TRIGR copy does not claim affiliation with a photography program.

No other public source, photographs, videos, About page content, ASCII art, logo or CSS was changed.

## Verification

- `npm run lint` PASS
- `npm test` PASS
- `npm run build` PASS
- In-browser dialog inspection: Soap 1 correct image, DVD Pong 1 correct image, TRIGR 2 authentic photos, correct independent ownership text.
- Browser tested at 1366 and 390 pixel viewport widths. No JavaScript page errors or horizontal overflow detected in these checks.
- Remote images were not visually downloaded and checked during this test. The Godot-like `index.png` was removed by source reference, and the existing local DVD Pong logo was visually inspected.

## Apply incremental update

In `~/Documents/code/github/abhi-portfolio`:

```sh
unzip -o ~/Downloads/ABHI_PORTFOLIO_SOAP_DVD_TRIGR_FIX_UPDATE_ONLY.zip -d .
npm run lint
npm test
npm run build
git diff --stat
git add -A
git commit -m "Correct Soap DVD Pong media and TRIGR attribution"
git push origin main
```

This incremental patch applies cleanly if you already have the last complete ASCII panel size release. If you are several releases behind, use the complete source ZIP. You do not need to edit is-a.dev DNS.
