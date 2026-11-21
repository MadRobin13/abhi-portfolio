# Portfolio revision, source review and unresolved work (2026-11-21)

## Scope

This is an incremental revision of the earlier public-repository source archive, not a redesign. The original ASCII artwork, animation algorithm, layout, project-card structure and unrelated project galleries remain intact. The visible “Pause art” button and its manual-pause JS logic were removed. Browser/OS `prefers-reduced-motion` is still respected automatically.

## Media review

See `CORRECTED_MEDIA_MAP.md` for the full project-by-project mapping. We inspected actual frames from **all eight** archived video binaries, rather than trusting media filenames. The archive already contains a real PET clip (`IMG_0122`), a real Strobe blue-matrix clip (`054346…`), a real TRIGR bench-test clip (`IMG_0658`) and a Muse demonstration. The user's live Vercel report, which showed mismatched clips, could not be independently reproduced against the live deployed URL in this environment. The code now deliberately hides the reported PET/TRIGR gallery videos and uses newly named verified URLs for the displayed PET and Strobe clips so they cannot accidentally resolve to an older video asset with the same URL.

Photo comparisons show `34` and `40` are visually identical copies of Eureka's purple-lit certificate image; `35` and `39` are visually identical copies of the Hack the Ridge stage image. They are not separate events or views.

## Buttons, copy and engineering content

- External project links now show platform names such as **GitHub**, **Devpost**, **YouTube**, **Printables** and **Cults3D**; year-specific FRC GitHub links retain the year.
- Removed the generic GitHub fallback from projects with no verified GitHub link, including the printing business and TRIGR.
- Fixed `/#projectname` anchors to reach their actual project tiles.
- Applied a restrained, factual editing pass guided by the installed `human-write` skill. Avoided grand closing lessons, filler and unnecessary em dashes. The U of T 82-entry document was used for fact coverage and verification **only**, not as a style sample.
- Clarified FRC's competition-tested moving-shot and Newton-Raphson work, PET prototype limitations and in-progress second machine, Code Ninjas' verified 317 hours (97 extra), and SymptoAI's team attribution.
- Added Girl Guides robotics outreach to the activities section and noted a verified commissioned robotic-arm fabrication job as factual context within the printing/fabrication project. Neither is framed as a separate award.

## Significant engineering and outreach coverage

**Already represented:** FRC programming/drive-team leadership and major team honors; Muse and IEEE SSCS award; PET filament and $6,000 grant; Samsung ICanSort and national finalist result; Code Ninjas instruction; Computer Engineering Club leadership; FLL coaching; FTC; Hack Club; Hack the North/NAVI; Hack the Ridge/SymptoAI; Eureka Hacks/ABC2XYZ; Girl Guides STEM outreach; Makers Making Change; Shad; Scouts; TRIGR; Splittr; Strobe; other software; 3D CAD and robotic-arm commission.

**Deliberately not added as separate cards:** short GlobalMedic service activity (source marks archived/not recommended), FRC outreach/robotics curriculum (already under FRC), private networking/Security End Node (source says verification pending), coursework, minor academic/math certificates. Do not copy every activity from the 82-entry private application document into the public portfolio.

## Still outstanding

1. GIFs for **DVD Pong** and **Soap**: the user reports genuine GIFs in the public README files, but their exact files and URLs could not be read from the current no-network working environment. Existing authentic logos remain, rather than adding unverified placeholders or other people's animations.
2. The previously reported distorted static/ASCII art when deployed to Vercel was **not** modified here because the user explicitly asked to preserve the running artwork. This warrants a separate targeted browser/deployment review.
3. Long project descriptions can be replaced with the user's own finalized scholarship project writeups when supplied. This pass intentionally avoids wholesale rewriting.
4. Public group photos still require the subject permissions the user considers appropriate; existing permissions were not established by simply possessing an uploaded photograph.
5. **Deployment state not independently checked:** access to public GitHub/Vercel URLs was unavailable from this runtime. This patch was built from the verified earlier `ABHI_PORTFOLIO_PUBLIC_REPO_CLEAN_NOV21_2026.zip` archive, not a fresh clone of the live deployed branch. Merge the **update-only** ZIP over the actual GitHub repo to preserve any subsequent unpublished edits.

## Checks performed

`npm run lint`, `npm test` and `npm run build` passed. Media tests verify gallery IDs, absence of the known duplicate/misassigned entries, the missing pause control and generic fallback link, and no audio streams in bundled videos. A headless browser screenshot attempt did not complete, so visual browser QA on the current live domain remains required.

## Privacy boundary

Private scholarship PDFs, private application metadata and personal/family details were not copied into the public website or release ZIP.
