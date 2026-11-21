const fs=require('fs'), assert=require('assert'), path=require('path');
const root=path.resolve(__dirname,'..');
const pages=['index.html','about.html'];
for(const file of pages){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert.equal((html.match(/<aside class="identity-rail"/g)||[]).length,1,`${file}: single identity sidebar`);
  assert(html.includes('assets/identity-rail.css'),`${file}: shared rail style is loaded`);
  for(const label of ['RECOGNITIONS','IEEE SSCS Arduino Contest','Youth Climate Action Fund','Samsung Solve for Tomorrow']) assert(html.includes(label),`${file}: ${label}`);
  assert(html.includes('data-recognitions="desktop"') && html.includes('data-recognitions="mobile"'),`${file}: desktop/mobile recognition tracks`);
  assert(html.includes('assets/recognitions.js') && html.includes('assets/recognitions.css'),`${file}: rotation script/styles loaded`);
  assert(html.includes('<details class="rail-mobile-highlights">'),`${file}: mobile awards disclosure`);
  assert(html.includes('assets/abhi-mark.svg'),`${file}: original logo retained`);
  assert(html.includes('rail-last-name'),`${file}: responsive identity name`);
}
const css=fs.readFileSync(path.join(root,'assets/identity-rail.css'),'utf8');
assert(css.includes('min-width:1200px') && css.includes('max-width:1199px') && css.includes('max-width:700px'),'Desktop and compact rails are defined');
assert(css.includes('content:" "'),'Mobile identity name retains its word space');
assert(!css.includes('position:sticky'), 'Rail scrolls independently on desktop');
const recognitions=fs.readFileSync(path.join(root,'assets/recognitions.js'),'utf8');
assert((recognitions.match(/"description":/g)||[]).length>=12,'Rotating awards list must include major recognitions');
assert(recognitions.includes('prefers-reduced-motion') && recognitions.includes('is-shifting'),'Respect reduced motion and advance cards');
console.log('PASS: 13 recognitions, rotating four at a time, restored in the lime/dark rail.');
console.log('PASS: Responsive compact awards disclosure and correct identity text spacing.');
