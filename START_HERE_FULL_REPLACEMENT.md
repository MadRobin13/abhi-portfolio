# Abhi portfolio: full consolidated source

This ZIP is a **complete standalone replacement**, not an incremental update.
It includes all updates through the tighter About-page photograph frames, including:

- Original moving ASCII artwork with the pause control removed
- Responsive canvas-rendered ASCII face in its original About-panel position
- Two-page site with the About page and original photographs
- Fixed media archive references and cleanup of known wrongly allocated media
- Recognitions sidebar with 13 recognitions, four sliding at a time
- Writing cleanup using the human-write method and corrected FIRST dates
- All six profile/contact links on the About page
- Correctly centered provisional NAVI artwork
- Updated squared and centered ASCII A logo and favicon
- Responsive tight photo borders for NVIDIA, childhood engineering and Megalodon photos

Notes:
- The DVD Pong GIF requested previously has NOT been sourced; the public README did not contain that GIF. Current DVD Pong and Soap repository images remain.
- External images should be visually confirmed on the published site.
- The site uses static HTML, CSS, JavaScript and npm helper scripts. No generated image or GIF represents the rotating ASCII artwork.
- The archive excludes compiled `dist/`, `node_modules/`, and private original-resolution backups. Build recreates `dist/`.

## Verify on your machine before pushing

Unzip this archive into a new empty folder. In that folder run:

    npm ci
    npm run lint
    npm test
    npm run build
    npm run dev

## Replace an older GitHub checkout while keeping its Git history

Only do this when your local checkout has no uncommitted work you need to preserve.
Review the preview produced by `rsync -avn` before executing the copy.
The `--delete` option removes obsolete files and helps prevent previously retired images
from lingering in the older repository. Do not perform it if you have
important untracked files inside the site directory.

    mkdir -p ~/Downloads/abhi-portfolio-full
    unzip -o ~/Downloads/ABHI_PORTFOLIO_FULL_CONSOLIDATED_LATEST_NOV21_2026.zip -d ~/Downloads/abhi-portfolio-full
    cd ~/Documents/code/github/abhi-portfolio
    git status
    git branch backup-before-full-revision
    rsync -avn --delete --exclude='.git/' --exclude='node_modules/' --exclude='dist/' --exclude='.vercel/' --exclude='.env*' ~/Downloads/abhi-portfolio-full/ ./

If that preview is what you expect, remove the `n` flag to apply:

    rsync -av --delete --exclude='.git/' --exclude='node_modules/' --exclude='dist/' --exclude='.vercel/' --exclude='.env*' ~/Downloads/abhi-portfolio-full/ ./
    npm ci
    npm run lint
    npm test
    npm run build
    git diff --stat
    git add -A
    git commit -m "Consolidate complete portfolio revisions"
    git push origin main

A Git push triggers your Vercel deployment. The is-a.dev DNS records are unchanged.

If the `git branch` command reports the backup branch already exists, choose
a different backup branch name. Avoid destructive operations on a dirty checkout.
