'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p),'utf8');
const index = read('index.html');
const about = read('about.html');
const code = read('assets/content.js');
const recognitions = read('assets/recognitions.js');
const media = read('assets/media.js');
const site = read('assets/site.js');
const archive = read('assets/archive.js');
const logo = read('assets/abhi-mark.svg');
const css = read('assets/upgrade.css');
const content = JSON.parse(code.replace(/^window\.PORTFOLIO_CONTENT\s*=\s*/, '').replace(/;\s*$/, ''));
const mediaMap = JSON.parse(media.replace(/^window\.ABHI_MEDIA\s*=\s*/, '').replace(/;\s*$/, ''));
const pages = [index,about,code,recognitions,media,site,archive];
for (const p of pages) {
  assert(!/[\u2013\u2014]/.test(p), 'No en/em dashes in public page source or displayed content');
}
assert(about.includes('2019 through LEGO League'));
assert(about.includes('FRC in 2022'));
assert(!about.includes("figuring out why something doesn't work"));
assert(!about.includes('test, troubleshoot, and improve'));
assert(index.includes('2019 through LEGO League'));
assert(content.featured.some(x=>x.id==='frc-1360' && x.summary.includes('2019')));
assert(content.projects.some(x=>x.slug==='navi' && x.summary.includes('NAVI')));
assert(mediaMap.navi.image===null && mediaMap.navi.video===null);
assert(css.includes('NAVI') && site.includes("kind==='compass'?(cellX-w/2)/naviScale"));
for (const profile of ['github.com/MadRobin13','linkedin.com/in/abhimanyu','devpost.com/MadRobin13','printables.com/@mando13_1132886','cults3d.com/en/users/MadRobin13','mailto:madrobin1340@gmail.com']) {
  assert(about.includes(profile), 'Missing About profile: '+profile);
}
assert(logo.includes('A — Abhi monogram'), 'Original ASCII A logo restored');
assert(logo.includes('<text x="20" y="30">   ##   </text>'), 'Original logo glyph pattern retained');
assert((logo.match(/<text /g) || []).length === 7, 'Original seven-row logo retained');
assert(logo.includes('<text') && logo.includes('viewBox="0 0 128 128"'));
assert(!index.includes('pause-art'));
assert(site.includes("const visualKinds"));
assert(recognitions.includes("setInterval(tick, 4100)"));
assert(mediaMap['pet-filament'].video.includes('pet-filament-demo-verified'));
assert(mediaMap['led-matrix'].video.includes('strobe-led-matrix-verified'));
console.log('PASS: No en/em dashes; 2019 FIRST and 2022 FRC timeline; natural About copy; all profile links; centered NAVI; original ASCII logo; prior media and awards intact.');
