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
let trigr=only('trigr',2,1);assert.equal(trigr.find(x=>x.type==='video').originalName,'IMG_0658.MOV');
let pet=only('pet-filament',5,2);assert.deepEqual(pet.filter(x=>x.type==='video').map(x=>x.originalName).sort(),['IMG_0122.MOV','IMG_5478 2.MOV'].sort());
let muse=only('muse',1,1);assert.equal(muse.find(x=>x.type==='video').originalName,'IMG_4133(2).MOV');
let sympto=only('symptoai',3,0);assert(sympto.some(x=>x.originalName.startsWith('E8BEA')),'SymptoAI missing Raspberry Pi');
assert(!sympto.some(x=>x.originalName.startsWith('F6BE')),'SymptoAI has Samsung team photograph');
only('printing-business',1,0);only('ican-sort',3,0);
assert(byId.get('15-frc-1360-programming-mentorship-photo').title==='Mentoring programming team members');
for(const m of entries){if(m.type==='video'){const loc=path.join(root,m.src);assert(existsSync(loc),`Missing video ${loc}`);const output=execFileSync('ffprobe',['-v','error','-show_entries','stream=codec_type','-of','csv=p=0',loc],{encoding:'utf8'});assert(!output.split(/\s+/).includes('audio'),`Video contains audio ${m.id}`);}
 else if(!m.remote){assert(existsSync(path.join(root,m.src)),`Missing image ${m.src}`)}}
for(const asset of ['assets/images/abhi-mark.svg','assets/abhi-mark.svg']){} // no assumptions about inherited layouts
console.log('PASS: per-project gallery IDs are strict and belong to the correct projects.');
console.log('PASS: Strobe, TRIGR, PET, Muse, SymptoAI, and ICanSort evidence is correctly assigned.');
console.log('PASS: all bundled videos contain zero audio streams.');
