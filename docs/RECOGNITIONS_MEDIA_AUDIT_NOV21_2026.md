# Portfolio revision: recognitions and verified media assignments

## Scope
This revision starts from the Nov 21 restored sidebar/ASCII source and preserves its layout, portrait, original animated gyroscope, About page, and all previously corrected project text. It is not a replacement design.

## Sidebar
- Renamed the sidebar heading to **RECOGNITIONS** on the homepage and About page.
- Added 13 individually named, verifiable recognitions from the user's U of T application and existing portfolio data. Team awards are labeled as team awards. No math contest distinctions or minor certificates have been inserted.
- Shows exactly four at a time. The four-row window slides up one entry every 4.1 seconds in a loop, including after the last award. Pauses on pointer hover / link focus and respects reduced-motion settings.
- Mobile: existing compact details disclosure retained; the four visible entries scroll when expanded. On About, links return to the homepage's awards section.

## Attribution corrections made at source
1. Removed `legacy-frc` archive record and deleted `assets/images/frc-real.jpg` (unrelated historical FRC hardware photo). All authorized FRC season and competition media retained.
2. Removed `video-04-pet-filament` from archive and deleted the old incorrectly attributed `assets/media/videos/video-04-pet-filament.mp4` and its poster. The PET project keeps verified PET demonstration `video-03-pet-filament`.
3. Removed `video-05-trigr` from archive, deleted old wrongly assigned footage and poster. TRIGR keeps the two authentic camera-controller photos.
4. **Strobe actual poster bug:** The file `video-06-led-matrix.webp` actually depicted the TRIGR hardware despite being labeled LED matrix. Regenerated the poster from the actual `strobe-led-matrix-verified.mp4` and made it the main Strobe project-card poster. The video and wiring image stay assigned to Strobe.
5. Removed duplicate SymptoAI team record `35-community-hackathon-group-photograph-in-classroom` and kept the confirmed Hack the Ridge winner team (`39-symptoai-hack-the-ridge-team`) plus Raspberry Pi hardware.
6. Removed duplicate Eureka certificate image (`34-community...`) and kept the single high-quality image `40-eureka-hacks-certificate-team`. Removed the unrelated Hack the Ridge photograph `37-community-eureka-hacks-team-with-best-use-of-ai-recogni`. Eureka project now has one correct team image.
7. Removed the unused `source-duplicate-img4133` archive record and duplicate movie (`video-07-misc.mp4`), which repeated Muse content; Muse's proper video and image are untouched.
8. Removed the public media-modal technical filename (`Source: <raw filename>`) and internal review/publication warning that was inappropriately shown to visitors. Provenance records remain within source documentation.

## DVD Pong / Soap GitHub assets
- Confirmed that `MadRobin13/DVD-Pong` README contains a text description and playable site link, but no embedded GIF. `MadRobin13/Soap-the-Discord-Bot` README similarly describes the bot without an embedded GIF. Claiming to have scraped GIFs from these READMEs would be inaccurate.
- Kept Soap's real logo as the main image and added its existing `mongodb_exmple.png` repository screenshot as secondary media.
- Kept DVD Pong's original logo as the main image and added its existing `index.png` repository media as secondary. The user's desired **actual DVD Pong GIF as the main image is still unresolved**. Neither a generated stand-in nor third-party gameplay was substituted.
- These extra assets use verified repo-root filenames via GitHub raw URLs. Verify that the repo assets load after deployment, since this browser's external requests are blocked.

## Other projects
- FRC, Muse, Splittr, ICanSort, NAVI (still no media), TerminalAI, CAD, the 3D printing business, and the About page remain otherwise unchanged. Previous link-label cleanup, no-pause control, and silent-video requirements are preserved.

## Testing
- `npm run lint`, `npm test`, `npm run build` pass.
- Browser-rendered desktop galleries visually checked for PET, Strobe, TRIGR, SymptoAI, Eureka, DVD Pong and Soap with inline local content, not a full navigation to Vercel.
- Browser checks at 1440, 390 and 320px confirm the awards roll **actually advances**, no horizontal overflow and no JavaScript page errors in the isolated sidebar test.
- Current live Vercel deployment was not modified or authenticated; apply patch to existing GitHub repository to deploy.

## Update steps
The update-only ZIP has only modified/new files and the exact `scripts/cleanup-retired-media.sh` deletion helper. Unzip into the existing repository root, run the helper and then commit; do not simply replace the whole repository if you have newer edits. Review `git status` before committing.
