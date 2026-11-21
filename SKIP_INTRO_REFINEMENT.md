# Intro skip link refinement

This revision uses the complete Nov 21 portfolio source as its baseline.

Changes:
- The Skip intro control is a low-contrast, underlined text link at the bottom right of the introduction.
- Default text is muted grey; on hover or keyboard focus it highlights lime green.
- Removed the arrow, filled background, button border, and central placement.
- Preserved its accessible label, click action, current intro timing, and safety exit.
- Updated the regression test to guard this design.

Files updated: `index.html`, `assets/upgrade.css`, `assets/refinement.css`, `tests/final-polish.cjs`.

For an existing checkout based on `ABHI_PORTFOLIO_FINAL_POLISH_FULL_SOURCE_NOV21_2026.zip`, extract the update-only ZIP into the repository root and run:

```sh
npm run lint && npm test && npm run build
git add index.html assets/upgrade.css assets/refinement.css tests/final-polish.cjs
git commit -m "Make intro skip link unobtrusive"
git push origin main
```

If you're on an older revision, use the complete-source ZIP instead to preserve the previous corrections.
