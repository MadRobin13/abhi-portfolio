# Run the ASCII Field website with npm

This is **the All-Media ASCII Field portfolio**, not the old `ABHI_PORTFOLIO_REFINED_NOV20_2026` project. Extract the ZIP and open a terminal in its `ABHI_ASCII_FIELD` folder (the one with this file, `index.html`, and `package.json`).

```bash
npm ci
npm run lint
npm run build
npm test
npm run dev
```

Then open **http://localhost:5173**. `npm run dev` stays running until you press Ctrl+C.

The package has **zero npm dependencies**. The lockfile exists for reproducibility and to support `npm ci`.

- `npm run lint` checks JavaScript syntax with Node (`node --check`); it is not ESLint or a comprehensive style/accessibility checker.
- `npm run build` assembles a static `dist/` folder by copying the website files; there is no Vite or bundle optimizer.
- `npm test` executes the included mock-DOM rendering smoke test, which is not a complete end-to-end browser suite.
- `npm run dev` serves the original static site at http://localhost:5173.
- `npm run preview` serves the built `dist/` version at http://localhost:4173.

Your authentic photos, optimized videos, project data, and existing design have not been changed in this packaging fix.
