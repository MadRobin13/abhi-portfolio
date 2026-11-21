# ASCII portrait and About panel sizing update

This revision is based on `ABHI_PORTFOLIO_NEW_ASCII_FACE_COMPLETE_SOURCE.zip` and changes only:

- `assets/responsive-ascii-portrait.css`
- `tests/responsive-portrait.cjs`

The user-provided 90 by 60 colour-character portrait, its canvas renderer, original art animation, text content, media, sidebar, intro, logos and About page are unchanged.

## Desktop

At viewport widths above 800 px, the portrait frame stretches to exactly match the adjoining About text panel height, instead of keeping an unrelated 440 px width cap and aspect ratio. The canvas continues to draw the ASCII character grid without distortion or clipping.

## Mobile and tablet

At 800 px and below, the cards stack vertically. The portrait retains its previous 666:702 ratio and is capped at 520 px wide, with 100% available width and preserved centre alignment.

## Browser layout validation

A local HTML and CSS render (assets inlined, no third-party requests) gave these frame sizes. All widths reported zero horizontal overflow.

| Viewport width | Portrait frame | About text panel |
| --- | --- | --- |
| 1440 px | 449 x 579 px | 521 x 579 px |
| 1150 px | 403 x 547 px | 605 x 547 px |
| 900 px | 314 x 511 px | 471 x 511 px |
| 810 px | 298 x 522 px | 446 x 522 px |
| 768 px (stacked) | 520 x 548 px | 718 x 496 px |
| 390 px (stacked) | 358 x 377 px | 358 x 556 px |
| 320 px (stacked) | 288 x 304 px | 288 x 633 px |

## Deploy

To apply this on top of the previously supplied new ASCII face revision:

```bash
cd ~/Documents/code/github/abhi-portfolio
unzip -o ~/Downloads/ABHI_PORTFOLIO_ASCII_PANEL_SIZE_UPDATE_ONLY.zip -d .
npm run lint
npm test
npm run build
git add -A
git commit -m "Balance ASCII portrait with About panel"
git push origin main
```

If you have not applied previous releases, use the matching COMPLETE_SOURCE.zip file instead.
