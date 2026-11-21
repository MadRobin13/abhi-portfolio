# Reference and implementation research

## Requested design references

1. **Davor G. Zelic Awwwards inspiration** — its character-built portrait demonstrates ASCII as representation of a recognizable subject. We are not inventing a portrait for Abhi. Authentic user-supplied imagery can later be processed into a portrait glyph image.
   https://www.awwwards.com/inspiration/home-page-hero-section-davor-g-zelic-portfolio
2. **v0 ASCII Art Portfolio** — demonstrates data-backed projects, a monospaced grid and text art, but is an easily repeated terminal template. Do not inherit its design, tab bars, or massive ASCII lettering.
   https://v0.app/templates/I96b70NNT2E
3. **ASCII Magic developer portfolio** — treats the hero as motion art, but its default terminal appearance is not the desired finish. Borrow only the use of meaningful generative characters.
   https://www.ascii-magic.com/ascii/use/developer-portfolio
4. **Elvis Mao** — active glyph background forms the environment rather than being a small illustration beside text. A useful basis for full-viewport generative artwork.
   https://elvismao.com/
5. **Aino Agency** — disciplined interaction between dense ASCII compositions, minimal navigation and real work photography.
   https://aino.agency/

## Rendering and accessibility research

- `asciify.sister.software` uses GPU glyph sprites to accelerate ASCII rendering. Useful for a future WebGL version when warranted; our baseline avoids an external runtime. https://asciify.sister.software/
- `textmode.js` is another potential WebGL character engine for future art experiments: https://github.com/humanbydefinition/textmode.js
- MDN's motion guidance: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion
- W3C technique: https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html

## Design principles translated from user feedback

- The homepage *is* an ASCII environment. One continuously rotating central armillary/torus is created from actual glyphs, not a generic icon or 3D render pasted alongside a normal page.
- Subtle character fields continue across the entire experience, behind information. Animation is low contrast and never interferes with text readability.
- Plain light panels with dark outlines contain projects, awards and experience; asymmetry is modest and intentional, not a scrolling carousel or a corporate template.
- Real project visuals stay real. Empty spaces are filled with original **abstract** glyph art and reserved media slots.
- Minimize invented narrative text. Keep supplied project summaries available, use readable labels and direct routes to original work.
- Project details remain on one page, in modal dialogs instead of separate pages.

## Tradeoffs

Canvas2D's character drawing is relatively straightforward and avoids third-party dependencies, but a full browser screenshot/performance validation remains necessary before production. A WebGL glyph renderer could later replace only `drawOrb` and `drawField` without changing the site layout or data model.
