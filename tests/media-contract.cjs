const {readFileSync,existsSync,readdirSync}=require('fs');
const vm=require('vm'),assert=require('assert'),path=require('path'),{execFileSync}=require('child_process');
const root=path.resolve(__dirname,'..');
const context={window:{}};vm.createContext(context);
for(const src of ['assets/archive.js','assets/project-evidence.js','assets/media.js'])vm.runInContext(readFileSync(path.join(root,src),'utf8'),context,{filename:src});
const entries=context.window.ABHI_ARCHIVE.filter(m=>m.type!=='duplicate');
const byId=new Map(entries.map(x=>[x.id,x]));
assert.equal(byId.size,entries.length,'Duplicate media IDs');
const evidence=context.window.ABHI_PROJECT_EVIDENCE;
for(const [project, ids] of Object.entries(evidence)){
 assert.equal(new Set(ids).size,ids.length,project+': duplicate IDs');
 for(const id of ids){const entry=byId.get(id);assert(entry,`${project}: missing media ID ${id}`);assert(entry.group===project,`${project}: cross-project asset ${id} belongs to ${entry.group}`);}
}
function only(project,photos,videos){
 const items=evidence[project].map(id=>byId.get(id));
 assert.equal(items.length,photos+videos,`${project}: incorrect gallery length`);
 assert.equal(items.filter(m=>m.type==='photo').length,photos,`${project}: photo count`);
 assert.equal(items.filter(m=>m.type==='video').length,videos,`${project}: video count`);
 return items;
}
let strobe=only('led-matrix',1,1);assert(strobe.find(x=>x.type==='video').originalName.startsWith('054346'), 'Strobe has non-LED video');
let trigr=only('trigr',2,0);assert(!trigr.some(x=>x.type==='video'),'TRIGR clip omitted at user request');
let pet=only('pet-filament',5,1);assert.equal(pet.find(x=>x.type==='video').originalName,'IMG_0122.MOV');
let muse=only('muse',1,1);assert.equal(muse.find(x=>x.type==='video').originalName,'IMG_4133(2).MOV');
let sympto=only('symptoai',2,0);assert(sympto.some(x=>x.originalName.startsWith('E8BEA')),'SymptoAI missing Raspberry Pi');
assert(!sympto.some(x=>x.originalName.startsWith('F6BE')),'SymptoAI has Samsung team photograph');
assert.deepEqual(Array.from(only('navi',2,0),m=>m.id),['44-navi-solo','45-navi-team']);
only('printing-business',1,0);only('ican-sort',3,0);only('abc2xyz',1,0);
assert(!evidence['frc-1360'].includes('legacy-frc'),'historical hardware must be removed');
assert(!evidence['abc2xyz'].some(x=>x.startsWith('37-community')||x.startsWith('34-community')),'Eureka duplicates/misattribution remain');
assert(!evidence['symptoai'].includes('35-community-hackathon-group-photograph-in-classroom'),'SymptoAI duplicate remains');
const site=readFileSync(path.join(root,'assets/site.js'),'utf8');
assert(!site.includes('manualPause'),'pause functionality still present');
assert(!site.includes("<a href=\"https://github.com/MadRobin13\" target="),'generic modal GitHub link still present');
assert(!readFileSync(path.join(root,'index.html'),'utf8').includes('id="motion-button"'),'pause art button still present');
assert(!evidence['trigr'].includes('video-05-trigr'),'TRIGR unwanted video still listed');
assert(byId.get('15-frc-1360-programming-mentorship-photo').title==='Mentoring programming team members');
for(const m of entries){if(m.type==='video'){const loc=path.join(root,m.src);assert(existsSync(loc),`Missing video ${loc}`);const output=execFileSync('ffprobe',['-v','error','-show_entries','stream=codec_type','-of','csv=p=0',loc],{encoding:'utf8'});assert(!output.split(/\s+/).includes('audio'),`Video contains audio ${m.id}`);}
 else if(!m.remote){assert(existsSync(path.join(root,m.src)),`Missing image ${m.src}`)}}
for(const asset of ['assets/images/abhi-mark.svg','assets/abhi-mark.svg']){} // no assumptions about inherited layouts

// Data-source regression: deleted media must not remain in the global archive even if hidden from galleries.
for(const id of ['legacy-frc','video-04-pet-filament','video-05-trigr','34-community-eureka-hacks-award-winning-team-with-certific','35-community-hackathon-group-photograph-in-classroom','37-community-eureka-hacks-team-with-best-use-of-ai-recogni']){
 assert(!byId.has(id),`Retired or misattributed asset still in archive: ${id}`);
}
const strobePoster=path.join(root,'assets/media/posters/video-06-led-matrix.webp');
const rgb=execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-i',strobePoster,'-vf','scale=1:1','-frames:v','1','-pix_fmt','rgb24','-f','rawvideo','-']);
assert(rgb[2]>rgb[0]*2 && rgb[2]>rgb[1]*2,'Strobe video poster must actually show the blue LED matrix, not TRIGR hardware');
assert.equal(context.window.ABHI_MEDIA['led-matrix'].image,'assets/media/posters/video-06-led-matrix.webp');
only('soap',1,0); only('dvd-pong',1,0);
// Regressions: external repo images are not automatically suitable project media.
for(const id of ['github-soap-database-example','github-dvd-game-image']) assert(!byId.has(id),`Removed unrelated repository image still in archive: ${id}`);
assert.deepEqual(Array.from(evidence.soap), ['github-soap-logo']);
assert.deepEqual(Array.from(evidence['dvd-pong']), ['legacy-dvd']);
const extensions=readFileSync(path.join(root,'assets/content-extensions.js'),'utf8');
assert(!/school photography program|school photography build|program.s synchronizing camera shutters/i.test(extensions),'TRIGR incorrectly described as school photography coursework/program');
assert(extensions.includes('independently designed and built TRIGR') && extensions.includes('Independent invention'),'TRIGR independent invention attribution absent');
const mediaExplorer=readFileSync(path.join(root,'assets/media-explorer.js'),'utf8');
assert(!mediaExplorer.includes('Source: ${escape(m.originalName)}'),'Public gallery must not leak technical uploaded filenames');
assert(!mediaExplorer.includes('Contains identifiable people or unresolved attribution'),'Internal review instruction must not appear in public modal');

console.log('PASS: per-project gallery IDs are strict and belong to the correct projects.');
console.log('PASS: requested FRC, PET, TRIGR, SymptoAI and Eureka media removals are complete.');
console.log('PASS: pause-art control and unrelated default GitHub link are removed.');
console.log('PASS: all bundled videos contain zero audio streams.');
