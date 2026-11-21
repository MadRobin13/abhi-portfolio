# Apply the copy and NAVI update

This update is based on the latest Recognitions and Media Fixed release. It preserves project media and the existing ASCII animation.

1. Open Terminal in your existing portfolio repository.
2. Run `git status` and check that no work needs preserving.
3. Extract the update-only ZIP into the repository root with overwrite enabled.
4. Run `npm ci`, `npm run lint`, `npm test`, and `npm run build`.
5. Inspect `git diff`, commit the modifications, and push to `main`.

Example after the archive is in Downloads:

```bash
cd ~/Documents/code/github/abhi-portfolio
git status
unzip -o ~/Downloads/ABHI_PORTFOLIO_COPY_NAVI_UPDATE_ONLY_NOV21_2026.zip -d .
npm ci
npm run lint
npm test
npm run build
git diff --stat
git add -A
git commit -m "Refine portfolio copy and center NAVI artwork"
git push origin main
```

Vercel will redeploy the GitHub source. Your is-a.dev domain records do not need changing.
