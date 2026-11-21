# Portfolio revision: About copy, original logo, recognitions cue, intro animation

Source baseline: `ABHI_PORTFOLIO_FULL_CONSOLIDATED_LATEST_NOV21_2026.zip`.

## Edited

- Restored the **original ASCII A** logo exactly from the original ASCII Field source archive (`assets/abhi-mark.svg`, `assets/favicon.svg`). No redesign.
- Revised the About-page introduction to: "I'm Abhi. I spend a lot of my time programming robots, and I enjoy building projects that other people can use."
- Updated the homepage About summary to emphasize building projects that other people can use.
- Changed the separate About page heading to **More than my work.**
- Simplified the homepage About eyebrow to **ABOUT ME**.
- Added a subtle up-arrow cue to the four-at-a-time recognitions carousel on both pages. The 13 entries, auto-rotation, and reduced-motion logic are unchanged.
- Repaired the homepage introduction: removed the first-load/session skip, waited for the ASCII text-reveal animation to *actually finish*, held the complete text for about 800 ms before fading, retained Skip intro, and added a timer and CSS failsafe so the overlay cannot permanently block the page.
- Centered the ASCII loading text by removing unused leading spaces and improved the readable mobile font sizing.
- Added/updated regression tests for the wording, original logo, carousel indicator, and intro timing.

## Intentionally unchanged

- All project descriptions other than the specific About text; all project image/video assignments and removals.
- Original moving ASCII gyroscope and responsive ASCII portrait.
- NAVI centered placeholder and the existing project galleries.
- About-page photographs and tight natural-proportion frames.
- Recognition ordering, ticker interval, and item count.
- Website, contact and social links.

## Verification performed

- `npm run lint`: passed (JavaScript syntax check).
- `npm test`: all included tests passed, including media allocation and silence checks.
- `npm run build`: passed.
- Chromium render test using local HTML/CSS/JS inlined (network access to local sites was blocked): verified loader fully revealed before fade and removed afterward at 1440 and 390 px; both pages have no horizontal overflow or JavaScript errors.

## Deploy

For a repository that does not have the previous consolidated update, use the **full source ZIP** rather than the patch. Replace your source while preserving the `.git` directory, then run:

```sh
npm ci
npm run lint
npm test
npm run build
git add -A
git commit -m "Polish About copy, restore ASCII logo, and fix intro"
git push origin main
```

Your Vercel and is-a.dev domain configuration need no changes.
