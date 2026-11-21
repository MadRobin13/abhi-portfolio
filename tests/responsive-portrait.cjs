const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root,p), 'utf8');
const html = read('index.html'), about = read('about.html');
const site = read('assets/site.js');
const portraitSource = read('assets/responsive-ascii-portrait.js');
const build = read('scripts/build.mjs');
assert(html.includes('id="ascii-portrait"'), 'Original About-section portrait slot restored');
assert(html.includes('assets/responsive-ascii-portrait.js'), 'Programmed responsive portrait loaded');
assert(!html.includes('assets/portrait3d.js'), '3D portrait must not occupy the moving hero');
assert(!html.includes('class="about-journey"'), 'Personal photographs remain on About page');
assert(html.includes('href="about.html"'));
assert(site.includes('Three-dimensional character-rendered gyroscope'), 'Original gyroscope restored');
assert(site.includes('Parametric torus, seeded samples'), 'Original moving ASCII geometry retained');
assert(!site.includes('ABHI_PORTRAIT_3D'), 'No remnant 3D face in moving background');
assert(about.includes('02-identity-at-nvidia-headquarters-california.webp'));
assert(about.includes('03-identity-childhood-visit-to-the-electrical-engineering.webp'));
assert(about.includes('04-identity-at-a-prehistoric-shark-jaw-display-with-a-frie.webp'));
assert(about.includes('More than my work.'));
assert(!about.includes('Prehistoric life has always had my attention.'));
assert(build.includes("'about.html'"));
assert(!/pause art/i.test(html));

let frameCb;
const drawn = [];
const ctx = {
 fillRect() {}, setTransform() {},
 fillText(c,x,y) {drawn.push({c,x,y});},
 set fillStyle(s) {},set font(s) {}, set textAlign(s) {},set textBaseline(s){}
};
let width = 420, height = 440;
const canvas = {
 width:0,height:0,
 getBoundingClientRect() {return {width,height};},
 getContext() {return ctx;}
};
const window = {devicePixelRatio:2,addEventListener(){}};
const document = {getElementById(id){assert.equal(id,'ascii-portrait');return canvas;}};
vm.runInNewContext(portraitSource,{window,document,ResizeObserver:class {observe() {}},requestAnimationFrame(f){frameCb=f;}});
assert.equal(typeof frameCb,'function');
frameCb();
assert.equal(canvas.width,840);
assert.equal(canvas.height,880);
assert(drawn.length > 1000,'Should draw a real character-based portrait');
assert(drawn.every(x => Number.isFinite(x.x) && Number.isFinite(x.y)));
const mobileXMax = Math.max(...drawn.map(x=>x.x));
assert(mobileXMax < width, 'Mobile portrait is never clipped horizontally');
assert(Math.max(...drawn.map(x=>x.y)) < height, 'Mobile portrait is never clipped vertically');
drawn.length=0;
width=800;height=850;
window.ABHI_ASCII_PORTRAIT.render();
assert.equal(canvas.width,1600);
assert.equal(canvas.height,1700);
assert(drawn.length > 3000,'Larger viewport uses detailed portrait');
assert(Math.max(...drawn.map(x=>x.x)) < width);
assert(Math.max(...drawn.map(x=>x.y)) < height);
console.log('PASS: Original moving ASCII gyroscope restored; no AI image/GIF.');
console.log('PASS: Fixed-grid ASCII portrait restores original location and fits mobile and desktop containers.');
console.log('PASS: About photo and broader hobbies section retained.');
