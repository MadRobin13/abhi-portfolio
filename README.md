# Abhi — Engineering Portfolio

Interactive ASCII Field portfolio for robotics, software, electronics, and engineering projects. The website is static HTML/CSS/JavaScript, with authentic project images and silent demonstration videos. Built for university and job applications.

## Development

Requires Node 18+ and `ffprobe` (from FFmpeg) for the video-audio regression tests.

```sh
npm ci
npm run lint
npm run build
npm test
npm run dev
```

Visit `http://localhost:5173`. The build copies deployable content to `dist/`.

## Deploy

This repository is prepared for **Vercel**. See [PUBLISHING.md](PUBLISHING.md) for exact GitHub, Vercel, and is-a.dev steps. The project name in the instructions is `abhi-portfolio` and the preferred domain is `abhimanyu.is-a.dev` (subject to availability).

## Before publication

The website contains photographs of identifiable teammates and classmates. Review permission for each photo before making the repository public or deploying it. The build currently includes the original photos as well as optimized versions so that the viewer's “Open original photograph” links work.

This site documents past 3D printing work but is intended as a **personal software/engineering portfolio**, not a storefront. For is-a.dev, do not add shopping carts, pricing, or commercial sales pages.

See `docs/CORRECTED_MEDIA_MAP.md` for project-specific video/image assignments. All bundled videos contain no audio streams. No site hosting or is-a.dev registration is performed automatically by this repository.


## Public repository / media safety

This GitHub version deliberately includes only optimized website images and silent video files. Original-resolution photographs are **not** in the public repository or deploy output. The media gallery opens the optimized web version instead of the removed original. Keep a local backup of your original files separately. `.gitignore` excludes `dist/`, `node_modules/`, private media backups and local files. **Gitignore does not protect already-tracked files or photos that are intentionally published in `assets/media/photos/`; review identifiable people for permission before pushing.**
