# Portfolio portrait replacement

This release replaces **only the About section's ASCII face** with the artwork in the user's latest `ascii-art-2026-11-21-21-00-41(1).html` upload.

## Implementation

- The supplied 90-column by 60-row ASCII character grid is preserved, including each character's original RGB colour.
- JavaScript renders the data onto a HiDPI canvas using a fixed grid. This avoids the font-wrapping and text-spacing problems that occurred with HTML and SVG text.
- Mobile widths sample the same art at slightly fewer cells, keeping the original proportions and avoiding overflow.
- The existing portrait frame is capped at 440 CSS pixels wide and centered in its existing About section. There is no large embedded HTML block or remote image request.
- The original moving ASCII background, intro, logo, sidebar, project galleries, videos, About page, and everything else are unchanged.

## Files changed

- `assets/responsive-ascii-portrait.js`: new uploaded ASCII art and responsive canvas renderer
- `assets/responsive-ascii-portrait.css`: 440px width cap and center alignment for the portrait frame
- `tests/responsive-portrait.cjs`: tests updated to check source data, RGB colours, mobile/desktop bounds, and width cap

## Patch installation

For a local site at `~/Documents/code/github/abhi-portfolio`, with the last full release installed:

```bash
cd ~/Documents/code/github/abhi-portfolio
git status
unzip -o ~/Downloads/ABHI_PORTFOLIO_NEW_ASCII_FACE_UPDATE_ONLY.zip -d .
npm run lint
npm test
npm run build
git add assets/responsive-ascii-portrait.js assets/responsive-ascii-portrait.css tests/responsive-portrait.cjs
git commit -m "Replace ASCII portrait with supplied artwork"
git push origin main
```

## Complete replacement installation

If the installed website version is old or uncertain, use the **full source ZIP** rather than overlaying multiple previous patches. Save or commit existing work first.

```bash
mkdir -p ~/Downloads/abhi-portfolio-new-face
unzip -oq ~/Downloads/ABHI_PORTFOLIO_NEW_ASCII_FACE_COMPLETE_SOURCE.zip -d ~/Downloads/abhi-portfolio-new-face
cd ~/Documents/code/github/abhi-portfolio
git status
# Ensure the working tree is clean and preserve a backup of the current commit.
git branch "backup-before-ascii-face-$(date +%Y%m%d-%H%M%S)"
rsync -avn --delete --exclude='.git/' --exclude='node_modules/' --exclude='dist/' --exclude='.vercel/' --exclude='.env*' ~/Downloads/abhi-portfolio-new-face/ ./
# Review the list above before running the actual replacement.
rsync -av --delete --exclude='.git/' --exclude='node_modules/' --exclude='dist/' --exclude='.vercel/' --exclude='.env*' ~/Downloads/abhi-portfolio-new-face/ ./
npm ci && npm run lint && npm test && npm run build
git add -A
git commit -m "Update portfolio with supplied ASCII portrait"
git push origin main
```

No Vercel or is-a.dev DNS configuration changes are needed.
