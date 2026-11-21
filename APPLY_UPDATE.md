# Apply the responsive ASCII restoration

This incremental update is intended for the **November 21 ASCII3D + About** portfolio source, including the earlier verified media corrections.

1. Back up or commit any current uncommitted work in `abhi-portfolio`.
2. Extract `ABHI_PORTFOLIO_ASCII_RESTORED_UPDATE_ONLY_NOV21_2026.zip` into the root of that repository, overwriting the specified files.
3. Optional cleanup: delete three **unused** former-3D-head files, if present: `assets/portrait3d.js`, `assets/portrait-upgrade.css`, and `tests/portrait3d.cjs`. They are no longer referenced by HTML, CSS, or `npm test`.
4. Run `npm ci`, `npm run lint`, `npm test`, `npm run build`.
5. Check `git diff`, then commit and push `main` for the Vercel redeployment.

Your is-a.dev DNS records do **not** need to change. No new media assets, remote APIs, image generation, GIFs, or dependencies were added.

### What changed
- Restored the exact original live gyroscope drawing code to the ASCII hero.
- Restored Abhi's original ASCII portrait to the left column of the homepage About section, below the project, recognition, experience, and source sections.
- The portrait is now **real canvas text**: each character is placed at fixed grid coordinates, uniformly fitted to its container and rendered at device pixel ratio. Small screens use a downsampled grid generated from the original ASCII art, not a new image.
- Kept the separate About page, NVIDIA and childhood photos, and the fossil exhibit photo with a friend; changed the last section to discuss biking, friends, Scouts, Transformers and broad interests rather than an extensive paleontology explanation.
- Kept prior FRC / Muse / PET / Strobe / TRIGR / SymptoAI / Eureka media fixes, project link labels, videos with no audio, and no pause-art button.

### Verification
- `npm run lint`, `npm test`, `npm run build`: PASS.
- Browser checks with inline local source (environment blocks network navigation): desktop 1440px, mobile 390px and mobile 320px: no JavaScript errors, no horizontal page overflow, responsive portrait canvas visible.
- The live Vercel deployment is not modified by downloading this file; deployment requires pushing to GitHub.
