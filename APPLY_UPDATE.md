# Apply the programmed ASCII 3D + About page update

The `UPDATE_ONLY` archive is rooted at the same directory as your `index.html` and `package.json`. Extract it **inside your existing `abhi-portfolio` repository**, not into a new subfolder.

Example on a Mac, if the ZIP was downloaded to `~/Downloads`:

```bash
cd ~/Documents/code/github/abhi-portfolio
git status
unzip -o ~/Downloads/ABHI_ASCII3D_ABOUT_UPDATE_ONLY.zip -d .
npm ci
npm run lint
npm test
npm run build
git diff --stat
git status
git add index.html about.html assets/site.js assets/portrait3d.js assets/about.js assets/about.css assets/portrait-upgrade.css scripts/build.mjs package.json tests/portrait3d.cjs docs/ASCII3D_ABOUT_CHANGELOG.md
git commit -m "Build live rotating ASCII head and dedicated About page"
git push origin main
```

Before `git add`, inspect `git diff` if you have made independent edits. Avoid overwriting those changes. The original project media assets from the previous revision should remain in place.

To test locally: `npm run dev`. After deployment, visit both
- https://abhimanyu.is-a.dev/
- https://abhimanyu.is-a.dev/about.html

No is-a.dev DNS changes are needed.
