const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const root=path.resolve(__dirname,'..');
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
const about=fs.readFileSync(path.join(root,'about.html'),'utf8');
const build=fs.readFileSync(path.join(root,'scripts/build.mjs'),'utf8');
assert(index.includes('assets/portrait3d.js'));
assert(index.includes('aria-label="Continuously rotating three-dimensional ASCII portrait'));
assert(!index.includes('class="ascii-face"'));
assert(!index.includes('class="about-journey"'));
assert(index.includes('href="about.html"'));
assert(about.includes('02-identity-at-nvidia-headquarters-california.webp'));
assert(about.includes('03-identity-childhood-visit-to-the-electrical-engineering.webp'));
assert(about.includes('04-identity-at-a-prehistoric-shark-jaw-display-with-a-frie.webp'));
assert(build.includes("'about.html'"));
assert(!/pause art/i.test(index));
assert(fs.existsSync(path.join(root,'assets/media/photos/01-identity-restaurant-portrait-original-photograph.webp')));
// Simulate a browser without any photo-decoding graphics: the geometry and
// 3D projection must still draw, and drawing must change with rotation.
const ctx={
 clearRect(){},fillText(ch,x,y){if(this.drawn.length<15000)this.drawn.push([ch,Math.round(x),Math.round(y)]);},drawn:[],
 set font(value){},set fillStyle(value){},set textAlign(value){},set textBaseline(value){}
};
class MockImage{set src(x){this.url=x;}}
const window={scrollY:0,innerHeight:900};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/portrait3d.js'),'utf8'),{window,Image:MockImage,document:{createElement(){throw new Error('No actual Image.onLoad in mock');}},Math,Float32Array,Uint8Array,console});
assert(window.ABHI_PORTRAIT_3D);
assert(window.ABHI_PORTRAIT_3D.source.endsWith('.webp'));
window.ABHI_PORTRAIT_3D.render(ctx,1440,900,0);
const front=JSON.stringify(ctx.drawn);
assert(ctx.drawn.length>600,'Should draw many individual ASCII glyphs');
assert(ctx.drawn.every(([ch,x,y])=>/^[.,:;\-+=*#%@]$/.test(ch)&&Number.isFinite(x)&&Number.isFinite(y)));
ctx.drawn=[];
window.ABHI_PORTRAIT_3D.render(ctx,1440,900,5);
assert(ctx.drawn.length>600);
assert.notEqual(JSON.stringify(ctx.drawn),front,'Rotating 3D head must change the projected glyph layout');
console.log('PASS: Programmed rotating ASCII 3D portrait draws glyphs and changes with time.');
console.log('PASS: The about page includes the 3 authentic photographs and is included in build.');
console.log('PASS: Old fragile SVG portrait and photo strip no longer appear on homepage.');
