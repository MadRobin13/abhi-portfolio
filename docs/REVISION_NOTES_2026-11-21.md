# ASCII Field — corrected gallery release

This revision fixes cross-project asset assignments. Original user photographs and camera recordings are unchanged; no crops were made.

## Exactly assigned photo/video galleries

- Strobe: one wiring photo (`21C3...jpeg`) and one blue-LED clip (`054346...MP4`) only.
- TRIGR: the two camera controller photos (`8869...jpeg`, `7D24...jpeg`) and its own demo (`IMG_0658.MOV`) only.
- PET maker: the PET machine, internals, builder+shredder, PET shark print, grant recognition, and the two machine videos (`IMG_0122.MOV`, `IMG_5478 2.MOV`) only.
- Muse: the actual assistive-device photo and orange-box demo (`IMG_4133(2).MOV`). Other copies of the same demonstration stay hidden.
- SymptoAI: Raspberry Pi and peripherals (`E8BE...jpeg`), classroom team photo (`073455...jpeg`), and stage team photo (`073455...(1).jpeg`). Green-screen group image belongs with ICanSort, not SymptoAI.
- ICanSort: three relevant robot/team images including the green-screen team photograph.
- 3D printing business: only the orange fidget production photo; the shark remains with the PET project.
- Splittr: real traced PCB layout `design_v2.png` from its GitHub source; existing board and enclosure photos remain in the detail gallery.
- Soap: real repository logo `Soap_logo_v2.png`. An animation directory is present but the specific downloadable GIF was not verified, so no false animation has been inserted.
- DVD Pong: real game logo with direct live-game link. No downloadable GIF was identifiable in the public repo's visible file listing.
- TerminalAI: real repository screenshot `example.png` (not a GIF).

**Internet-dependent repo images:** Splittr, Soap and TerminalAI media use genuine raw GitHub URLs rather than fabricated local copies; they load while online. Splittr has a bundled real-board-photo fallback.

## How misassignment is prevented

`assets/project-evidence.js` contains explicit allowlists of individual media IDs for each project. Project galleries no longer derive items from broad labels like `hardware`, `community`, or `robots`. `tests/media-contract.cjs` checks every assignment, Strobe's two-item limit, audio-free MP4 files, and the corrected privacy-safe mentorship caption.

## Video sound

All shipped `.mp4` assets have no audio stream, and the website uses `muted` video elements. The original user recordings weren't overwritten.

## Privacy

The programming collaboration photograph displays **Mentoring programming team members**; the peer's name is not used on the website. Publication permissions for group photos should still be confirmed before deployment.

## Reproducible commands

```
npm ci
npm run lint
npm run build
npm test
npm run dev
```

### Notes on test scope

Browser DOM interaction checks were performed using an in-memory page because local HTTP navigation is blocked by the browser policy in this environment. They confirmed the photo/video counts for Strobe, TRIGR, PET, Muse, SymptoAI, Splittr, ICanSort, Soap, DVD Pong and TerminalAI. npm tests include data and sound-stream checks, but no true deployed cross-browser test was possible here.
