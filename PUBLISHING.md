# Publishing checklist — MadRobin13 / abhi-portfolio

This is a guide, **not a registration PR**. You must log in to your own accounts, review the published site and its photos, and personally submit the registration PR. Do not share tokens or verification details in chats or on your portfolio repository.

## 0. Review publication permissions

The project contains photos with recognizable classmates and teammates (see `docs/DETAILED_MEDIA_REVIEW.md`). Since GitHub public repositories and Vercel deployments expose the assets, remove photos without clearance or get permission first. Verify each project attribution and test links.

## 1. Create and push the GitHub repository

1. Visit https://github.com/new, set owner **MadRobin13**, repository name **abhi-portfolio**, and visibility **Public**. **Do not** check “Add README”, `.gitignore` or licence (these already exist).
2. In Terminal, `cd` into the extracted `abhi-portfolio` directory containing `package.json` and `index.html`.
3. Run:

```bash
git init -b main
git add .
git commit -m "Initial ASCII Field portfolio"
git remote add origin https://github.com/MadRobin13/abhi-portfolio.git
git push -u origin main
```

GitHub authentication may prompt you to use a browser, credential manager or PAT (not your GitHub account password). GitHub Desktop can also publish this folder. If the repository already exists, skip creating it and avoid overwriting unrelated commits.

## 2. Deploy on Vercel

1. Visit https://vercel.com/new and import `MadRobin13/abhi-portfolio` from GitHub.
2. Framework preset: **Other** (static site). `vercel.json` sets the build command `npm run build`, output directory `dist`, and install command `npm ci`.
3. Deploy. Open the **actual** `*.vercel.app` URL and confirm the homepage, the image gallery, and video playback work on a desktop and phone. Keep the Vercel deployment URL for the is-a.dev PR preview.
4. In Vercel project **Settings > Domains > Add Domain**, enter `abhimanyu.is-a.dev`. Disable automatic redirect to `www.abhimanyu.is-a.dev` unless you intend to register the `www` subdomain separately.
5. Choose **Continue manually**. Copy the *exact* A-record target and the `_vercel` TXT verification string Vercel displays. Records can differ from examples. You will use them for the next step.

## 3. Register with is-a.dev

1. Check that `abhimanyu.is-a.dev` is available. A missing search result does not prove availability.
2. Read the live official guide: https://docs.is-a.dev/guides/vercel/ and the repository policy: https://github.com/is-a-dev/register . The repository expressly discourages AI-generated registration requests; read and fill out the submission yourself.
3. Fork https://github.com/is-a-dev/register/fork under MadRobin13.
4. In your **fork**'s `domains/` folder, create two files:

   * `abhimanyu.json`:

```json
{
  "owner": { "username": "MadRobin13" },
  "records": { "A": ["<EXACT_VERCEL_A_RECORD_IP>"] }
}
```

   * `_vercel.abhimanyu.json`:

```json
{
  "owner": { "username": "MadRobin13" },
  "records": { "TXT": "<EXACT_VERCEL_TXT_VERIFICATION_STRING>" }
}
```

**Replace both placeholders before committing.** The A record shown in an example on the official guide is not guaranteed to match your Vercel assignment. If Vercel supplies a different record type, follow the current provider and is-a.dev docs rather than guessing. Only add the requested records. No TXT is needed in your personal website repository.

5. Commit the **two actual `.json` files** in your fork, then choose **Contribute > Open pull request** against `is-a-dev/register:main`.
6. Retain their existing PR template. Only check boxes you can genuinely attest to. Add the live `*.vercel.app` link, a real screenshot of your running site, and a short explanation that it is your personal software and engineering portfolio, not a sales site. Review the is-a.dev Terms of Service. Don't replace their template.
7. Respond to maintainers' requested changes; after merge, recheck Vercel domain verification and HTTPS.

## Deployment notes

- `npm run build` creates `dist/` and Vercel serves that directory.
- `dist/` and `node_modules/` are excluded from Git.
- Site uses relative asset URLs and a plain static homepage; there is no client-side app router to configure.
- If the `.vercel.app` deployment isn't reachable, do **not** open the registration PR yet; their template requires a live, completed site.
- **Commercial use:** The site is a personal engineering portfolio. A 3D-printing-business *experience entry* is different from operating a shop. Avoid any purchasing, product pricing, checkout or ads on this domain.
- **Publication review:** current ZIP includes original identifiable group photos. A public GitHub repo exposes them as downloadable files; remove any without rights to publish before `git add`.
