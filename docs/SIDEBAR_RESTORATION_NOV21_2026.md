# ASCII Field portfolio: identity sidebar restoration

## Source baseline
The November 21, 2026 `ABHI_PORTFOLIO_ASCII_RESTORED_COMPLETE_NOV21_2026.zip` source, including the original moving gyroscope, fixed-grid ASCII portrait, dedicated About page, and previously verified project-media corrections.

## Changes
- Restored the former desktop left sidebar, with a short personal introduction, four highlight entries, navigation, and contact links. Preserved the older information hierarchy but restyled it in the current charcoal, pale-green, and acid-lime ASCII Field palette.
- The four restored highlights are FRC 1360 programming leadership, the IEEE SSCS Arduino Contest placement, the $6,000 Youth Climate Action Fund grant, and Samsung Solve for Tomorrow national-finalist recognition. The entries are not new or invented awards.
- Shared the sidebar across the homepage and the About page. From the About page, internal links correctly return to sections on `index.html`.
- At 1200 px and up, the rail is fixed along the left and scrolls independently if needed. The existing desktop header navigation is hidden because the rail now provides navigation. At narrower widths, the existing header navigation stays in place and the sidebar turns into a compact summary with an expandable four-item highlight list.
- Added a source-level check `tests/identity-rail.cjs`, included in `npm test`.
- Fixed spacing of the name in the compact sidebar.

## Intentionally unchanged
- All project texts, galleries, image/video attribution fixes, link cleanup and award details in `assets/content.js`, `assets/media.js`, `assets/archive.js`, and `assets/site.js`.
- Silent video assets.
- The original moving ASCII gyroscope and the fixed-grid ASCII portrait at the foot of the home page.
- About page photos and hobbies text.
- The removed pause-art control stays removed.

## Verification
- `npm run lint`, `npm test`, and `npm run build`: passed.
- Browser-based CSS layout checking at viewport widths 1440, 1280, 1024, and 390 px on the homepage, plus 1440 and 390 px on the About page. These were `set_content` CSS/layout checks because the sandbox browser blocks local URL navigation. No horizontal page overflow was observed. The layout previews intentionally did not load external image/media assets or run the site animation.
- Vercel live deployment was not modified. Deploy by committing and pushing the changes to your existing repository.

## Apply the incremental ZIP
1. Back up or commit any uncommitted local edits.
2. Unzip `ABHI_PORTFOLIO_RESTORED_SIDEBAR_UPDATE_ONLY_NOV21_2026.zip` into the root of `abhi-portfolio`. All paths inside are relative to the repository root.
3. Review `git diff` (especially `index.html` and `about.html`).
4. Run `npm ci && npm run lint && npm test && npm run build`.
5. Commit and push to `main` when you're happy. Vercel automatically deploys, with no is-a.dev DNS changes.

If the previous restoration was **not** applied to your local repository, use the complete-source ZIP as your baseline instead of mixing versions blindly.
