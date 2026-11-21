const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const homepage = read('index.html');
const about = read('about.html');
const loader = read('assets/media-explorer.js');
const css = read('assets/upgrade.css');
const marks = ['assets/abhi-mark.svg','assets/favicon.svg'].map(read);
for(const mark of marks){
  assert(mark.includes('A — Abhi monogram'), 'The original ASCII A must remain unchanged');
  assert.equal((mark.match(/<text /g)||[]).length,7);
}
assert.equal(marks[0], marks[1], 'Favicon uses the same original logo');
assert(about.includes('More than my work.'));
assert(about.includes('building projects that other people can use'));
assert(homepage.includes('building projects that other people can use'));
for(const html of [homepage,about]){
  assert(html.includes('rail-cycle-cue'), 'Recognition ticker needs visible upward cue');
  assert(html.includes('rail-recognition-range'), 'Recognition position counter retained');
}
assert(loader.includes("event.animationName==='introReveal'"), 'Loader waits for full intro reveal');
assert(loader.includes('window.setTimeout(finishIntro,800)'), 'Full intro stays visible before fading');
assert(homepage.includes("sessionStorage.getItem(introKey)"), 'Intro is gated per browser tab session');
assert(homepage.includes('aria-label="Skip introduction">Skip intro</button>'), 'Intro escape hatch remains accessible');
assert(!homepage.includes('Skip intro →'), 'Old high-profile skip label is gone');
assert(css.includes('right:clamp(16px,3vw,36px)'), 'Skip link stays in the bottom right on different viewports');
assert(css.includes('background:transparent') && css.includes('text-decoration:underline'), 'Skip link has understated text styling');
assert(css.includes('introSafetyExit'), 'CSS failsafe prevents a stuck loader');
console.log('PASS: Original logo, About copy, carousel indicator, and complete loader reveal preserved.');
