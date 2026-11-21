(() => {
  'use strict';
  const content = window.PORTFOLIO_CONTENT || {};
  const media = window.ABHI_MEDIA || {};
  const $ = (id) => document.getElementById(id);
  const escape = (v) => String(v ?? '').replace(/[&<>"']/g,c=>({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const validHref = (v) => { const s=String(v||''); if (/^https?:\/\//i.test(s)||s.startsWith('mailto:')||s.startsWith('#')) return s;
    if(s.startsWith('/#')) return '#project-'+s.slice(2); if(s.startsWith('/awards')) return '#recognition'; if(s.startsWith('/activities')) return '#experience'; return '#projects'; };
  // Buttons identify their destination platform, not generic actions like 'Project story'.
  const linkLabel=(l)=>{const h=String(l.href||'').toLowerCase(),name=String(l.label||'');
    if(h.includes('github.com/')){const yr=name.match(/202[56]/);return yr?`GitHub · ${yr[0]} robot code`:'GitHub';}
    if(h.includes('devpost.com/'))return 'Devpost';
    if(h.includes('youtube.com/')||h.includes('youtu.be/'))return 'YouTube';
    if(h.includes('linkedin.com/'))return 'LinkedIn';
    if(h.includes('printables.com/'))return 'Printables';
    if(h.includes('cults3d.com/'))return 'Cults3D';
    if(h.includes('frc-events.firstinspires.org/'))return 'FIRST Events';
    if(h.includes('firstinspires.org/'))return 'FIRST';
    if(h.includes('sscs.ieee.org/'))return 'IEEE';
    if(h.includes('hdsb.ca/'))return 'HDSB';
    if(h.includes('codeninjas.com/'))return 'Code Ninjas';
    return name;};
  const anchors=(links,limit=2)=> (links||[]).slice(0,limit).map(l=>`<a href="${escape(validHref(l.href))}" ${/^https?:/.test(validHref(l.href))?'target="_blank" rel="noopener noreferrer"':''}>${escape(linkLabel(l))} ↗</a>`).join('');
  const all=content.featured||[];
  const detail=new Map((content.projects||[]).map(p=>[p.slug,p]));
  const visualKinds={ 'pet-filament':'helix','ican-sort':'grid','navi':'compass','led-matrix':'pixels','symptoai':'wave','soap':'shield','terminal-ai':'code','cad':'shape'};
  function visual(p, i, modal=false) {
    const m=media[p.id]||{};
    const asset=m.video?`<video muted ${m.image?`poster="${escape(m.image)}"`:''} ${modal?'controls playsinline preload="metadata"':'loop playsinline preload="none"'} data-video="${escape(m.video)}" aria-label="${escape(p.title)} (silent project demonstration)"></video>`:m.image?`<img src="${escape(m.image)}" ${m.fallback?`data-fallback="${escape(m.fallback)}"`:``} alt="${escape(p.title)}" loading="${i<2?'eager':'lazy'}" decoding="async">`:`<canvas class="ascii-placeholder" data-kind="${escape(visualKinds[p.id]||'shape')}" role="img" aria-label="Generative ASCII project artwork for ${escape(p.title)}"></canvas>`;
    return asset;
  }
  function tile(p,i,feature){return `<article class="project-tile ${feature?['feature-one','feature-two','feature-three'][i]:''}" id="project-${escape(p.id)}">
    <button class="project-media" data-project="${escape(p.id)}" type="button" aria-label="Open details for ${escape(p.title)}">${visual(p,i)}</button>
    <div class="project-body"><div class="project-topline"><span>${escape(p.detail||'')}</span></div><h3>${escape(p.title)}</h3><p class="project-short">${escape(p.summary)}</p><div class="project-footer"><button type="button" data-project="${escape(p.id)}">Project details ↗</button>${p.links?.length?anchors(p.links,1):''}</div></div></article>`;}
  if($('featured-grid')) $('featured-grid').innerHTML=all.slice(0,3).map((p,i)=>tile(p,i,true)).join('');
  if($('secondary-grid')) $('secondary-grid').innerHTML=all.slice(3).map((p,i)=>tile(p,i+3,false)).join('');
  document.addEventListener('error',e=>{const im=e.target;if(im?.tagName==='IMG'&&im.dataset.fallback){const local=im.dataset.fallback;delete im.dataset.fallback;im.src=local;}},true);
  const archive=(window.ABHI_ARCHIVE||[]).filter(x=>x.type!=='duplicate');
  const findMedia=(id)=>archive.find(x=>x.id===id);
  const photosForRecord={
    'eureka-hacks':['40-eureka-hacks-certificate-team'],
    'hack-the-ridge':['39-symptoai-hack-the-ridge-team'],
    'samsung-2026':['31-ican-sort-icansort-samsung-team-photograph','32-symptoai-project-team-in-front-of-green-screen-wall'],
    'climate-grant':['24-pet-filament-with-oakville-mayor-at-youth-climate-actio'],
    'frc':['14-frc-1360-niagara-team-photo-finalist-and-engineering-in'],
    'frc-1360':['05-frc-1360-signed-2026-game-ball-human-player-memory','07-frc-1360-carrying-the-robot-with-a-drive-team-teammate','14-frc-1360-niagara-team-photo-finalist-and-engineering-in'],
    'engineering-club':['38-community-engineering-club-stairwell'],
    'hack-club':['36-community-hack-club-group-photograph-with-posters'],
    'hackathons':['39-symptoai-hack-the-ridge-team','40-eureka-hacks-certificate-team'],
    'shad':[]
  };
  function recordMedia(id){const matched=(photosForRecord[id]||[]).map(findMedia).filter(Boolean);return matched.length?`<div class="record-media">${matched.map(m=>`<button type="button" class="record-media-item" data-media-open="${escape(m.id)}" aria-label="Open ${escape(m.title)}"><img src="${escape(m.src)}" alt="${escape(m.title)}" loading="lazy"></button>`).join('')}</div>`:'';}
  function renderRecords(items,target){const el=$(target); if(!el)return;el.innerHTML=(items||[]).map((r,i)=>`<details class="record-row"><summary><span class="record-date">${escape(r.date||'')}</span><span class="record-title">${escape(r.title)}</span><span class="record-plus" aria-hidden="true">+</span></summary><div class="record-detail"><p>${escape(r.outcome||'')}</p><p>${escape(r.body||'')}</p>${anchors(r.links,4)}${recordMedia(r.id)}</div></details>`).join('');}
  renderRecords(content.awards,'awards-list');
  const experiences=$('experience-grid');if(experiences) experiences.innerHTML=(content.activities||[]).map((r,i)=>`<details class="experience-tile"><summary><span class="experience-title">${escape(r.title)}</span><span class="experience-more" aria-hidden="true">+</span></summary><div class="experience-body"><p>${escape(r.date||'')} ${r.outcome?'· '+escape(r.outcome):''}</p><p>${escape(r.body||'')}</p>${anchors(r.links,3)}${recordMedia(r.id)}</div></details>`).join('');
  const repos=content.github?.items||[];let showAll=false;
  function repositories(){const q=($('repo-query')?.value||'').trim().toLowerCase();const list=repos.filter(r=>[r.title,r.shortDescription,r.category,...(r.languages||[])].join(' ').toLowerCase().includes(q));const shown=(showAll||q)?list:list.slice(0,10);$('repo-list').innerHTML=shown.map(r=>`<a class="repo-item" href="${escape(validHref(r.repoUrl))}" target="_blank" rel="noopener noreferrer"><span><strong>${escape(r.title)}</strong><small>${escape((r.languages||[]).join(' · ')||r.category||'Public repository')}</small></span><span aria-hidden="true">↗</span></a>`).join('')||'<p>No matching repositories.</p>';$('expand-repos').hidden=showAll||!!q||list.length<=10;}
  $('repo-query')?.addEventListener('input',repositories);$('expand-repos')?.addEventListener('click',()=>{showAll=true;repositories()});repositories();
  const menu=$('menu-toggle'),mn=$('mobile-nav');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));mn.hidden=!open;menu.innerHTML=open?'Close <span>×</span>':'Menu <span>+</span>';});mn?.addEventListener('click',e=>{if(e.target.closest('a')){mn.hidden=true;menu.setAttribute('aria-expanded','false');menu.innerHTML='Menu <span>+</span>';}});
  const dlg=$('project-dialog');const db=$('dialog-body');
  function showProject(id){const p=all.find(v=>v.id===id);if(!p||!dlg||!db)return;const d=detail.get(id),m=media[id]||{},allLinks=(d?.links?.length?d.links:p.links)||[];
    db.innerHTML=`<div class="dialog-layout"><div class="dialog-image">${visual(p,all.indexOf(p),true)}</div><div class="dialog-copy"><div class="dialog-kicker">${escape(p.detail)}</div><h2 id="dialog-title">${escape(p.title)}</h2><p class="dialog-lede">${escape(d?.summary||p.summary)}</p><div class="dialog-info"><div><strong>ROLE / SCOPE</strong>${escape(d?.role||p.detail)}</div><div><strong>PERIOD</strong>${escape(d?.period||'Project')}</div></div>${(d?.build||[]).length?`<h3>Build</h3>${d.build.map(a=>`<p>${escape(a)}</p>`).join('')}`:''}${(d?.contributions||[]).length?`<h3>Contributions</h3>${d.contributions.map(a=>`<div class="dialog-point"><strong>${escape(a.title)}</strong>${escape(a.text)}</div>`).join('')}`:''}${(d?.decisions||[]).length?`<h3>Engineering decisions</h3>${d.decisions.map(a=>`<div class="dialog-point"><strong>${escape(a.title)}</strong>${escape(a.text)}</div>`).join('')}`:''}${d?.result?`<h3>Result</h3><p>${escape(d.result)}</p>`:''}${allLinks.length?`<h3>Links</h3><div class="dialog-links">${anchors(allLinks,10)}</div>`:''}</div></div>`;
    dlg.showModal();const c=db.querySelector('canvas.ascii-placeholder');if(c)requestAnimationFrame(()=>paintCard(c));const v=db.querySelector('video[data-video]');if(v){v.src=v.dataset.video;v.muted=true;v.defaultMuted=true;v.volume=0;}
  }
  document.addEventListener('click',e=>{const b=e.target.closest('[data-project]');if(b)showProject(b.dataset.project)});$('dialog-close')?.addEventListener('click',()=>dlg.close());dlg?.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');let disabled=reduced.matches;
  const setState=()=>{disabled=reduced.matches;if(disabled)render(performance.now()*0.001,true);};
  reduced.addEventListener?.('change',setState);
  const field=$('ascii-field'),orb=$('ascii-orb'),portrait=$('portrait-field');let fw=0,fh=0,fdpr=1,oc=null,fc=null,pcc=null,cardContexts=[];
  function sizeCanvas(c){if(!c)return null;const r=c.getBoundingClientRect();if(!r.width||!r.height)return null;const dpr=Math.min(1.5,devicePixelRatio||1);c.width=Math.round(r.width*dpr);c.height=Math.round(r.height*dpr);const ctx=c.getContext('2d',{alpha:true});ctx.setTransform(dpr,0,0,dpr,0,0);return {ctx,w:r.width,h:r.height};}
  function hash(n){const x=Math.sin(n*127.1+12.9898)*43758.5453;return x-Math.floor(x)}
  function drawField(ctx,w,h,t){ctx.clearRect(0,0,w,h);const stepX=23,stepY=22;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='10px monospace';const cols=Math.ceil(w/stepX),rows=Math.ceil(h/stepY);for(let iy=0;iy<rows;iy++)for(let ix=0;ix<cols;ix++){
      let x=(ix+.5)*stepX,y=(iy+.5)*stepY,n=ix+iy*cols;let v=hash(n*7.3);const field=Math.sin(ix*.23+Math.sin(iy*.14+t*.22)*3+iy*.1)+Math.cos(iy*.19-ix*.12+t*.12);const wave=Math.abs(field*.5);if(v>.28 && wave<.83)continue;const alpha=.025+Math.pow(Math.max(0,1-v),3)*.085+wave*.025;ctx.fillStyle=`rgba(161,204,167,${alpha.toFixed(3)})`;const c=['.','·',':','+','/','∶','-'][Math.floor((wave+v*.3)*3)%7];ctx.fillText(c,x+Math.sin(iy*.32+t*.15)*7,y);
    }
    // Quiet streams and expanding sparklines; entirely behind actual content.
    ctx.font='11px monospace';for(let i=0;i<28;i++){const seed=hash(i*24);const y=(hash(i*47)*h+t*(8+hash(i*13)*12))%(h+90)-45;const x=(hash(i*91)*w+(t*11*hash(i*4)))%(w+130)-65;const a=.04+hash(i*2)*.085;ctx.fillStyle=`rgba(161,216,148,${a})`;for(let j=0;j<5;j++)ctx.fillText(j%2?'·':'-',x+j*14,y-j*2);}
    for(let ring=0;ring<3;ring++){const x=(.15+.33*ring)*w,y=(.22+.27*ring)*h;const age=(t*.045+ring*.37)%1;const radius=age*95;const alpha=(1-age)*.025;ctx.strokeStyle=`rgba(165,210,148,${alpha})`;ctx.beginPath();ctx.arc(x,y,radius,0,Math.PI*2);ctx.stroke();}
  }
  // Three-dimensional character-rendered gyroscope: toroidal shell and crossing orbit rings.
  function drawOrb(ctx,w,h,t){ctx.clearRect(0,0,w,h);let scroll=Math.min(1,window.scrollY/Math.max(300,window.innerHeight*.75));const isMobile=w<650;const centerX=isMobile?w*.52:w*(.615+.19*scroll),centerY=isMobile?h*(.37-.04*scroll):h*(.46-.2*scroll),scale=(isMobile?Math.min(w*.24,h*.18):Math.min(w*.196,h*.305))*(1-.52*scroll);
    const cell=isMobile?7.7:9.7,rowH=cell*1.25,cols=Math.ceil(w/cell),rows=Math.ceil(h/rowH);const zb=new Float32Array(cols*rows).fill(-Infinity),glyphs=new Array(cols*rows),ink=new Array(cols*rows),chars=' .,:;+*xX%#@';
    const ry=t*.27,rx=.54+.14*Math.sin(t*.13),rz=.11*Math.sin(t*.11);
    function put(x,y,z,brightness,color=0){let cy=Math.cos(ry),sy=Math.sin(ry),cx=Math.cos(rx),sx=Math.sin(rx),cz=Math.cos(rz),sz=Math.sin(rz);
      let X=x*cy+z*sy,Z=-x*sy+z*cy,Y=y*cx-Z*sx;Z=y*sx+Z*cx;let XX=X*cz-Y*sz,YY=X*sz+Y*cz;
      let p=3.8/(3.8-Z*.28),screenX=centerX+XX*scale*p,screenY=centerY+YY*scale*p;
      let ix=Math.round(screenX/cell),iy=Math.round(screenY/rowH);if(ix<0||ix>=cols||iy<0||iy>=rows)return;const index=ix+iy*cols;if(Z<=zb[index])return;zb[index]=Z;let val=Math.min(1,Math.max(.04,brightness*(.72+.28*(Z+2)/4)));glyphs[index]=chars[Math.min(chars.length-1,Math.max(1,Math.floor(val*(chars.length-1))))];ink[index]=(color?`rgba(184,255,57,${(.22+.73*val)*(1-.46*scroll)})`:`rgba(222,238,221,${(.25+.72*val)*(1-.46*scroll)})`);}
    // Parametric torus, seeded samples distributed across surfaces.
    for(let i=0;i<154;i++)for(let j=0;j<43;j++){
      const a=i/154*6.28318,b=j/43*6.28318;const R=1.18,r=.27;let q=R+r*Math.cos(b);let x=q*Math.cos(a),y=r*Math.sin(b),z=q*Math.sin(a);
      let lum=.25+.42*Math.max(0,Math.sin(b)*.65+Math.cos(a)*.4)+.25*Math.max(0,Math.cos(b));
      put(x,y,z,lum,((i%31<2)||(j%19===0))&&Math.sin(a+b+t*.1)>.25);
    }
    // Three intersecting orbital bands: glyph-generated, not SVG shapes.
    for(let ring=0;ring<3;ring++)for(let s=0;s<470;s++){let a=s/470*6.28318;let r=1.78+.035*Math.sin(a*9+t*.3);let x=r*Math.cos(a),y=r*Math.sin(a),z=0;const ang=ring*1.047+.42;const Y=y*Math.cos(ang)-z*Math.sin(ang),Z=y*Math.sin(ang)+z*Math.cos(ang);
      const x2=x*Math.cos(ring*.7)-Z*Math.sin(ring*.7),z2=x*Math.sin(ring*.7)+Z*Math.cos(ring*.7);
      if((s+ring)%3===0)put(x2,Y,z2,.36+(s%11)/22,ring===1);
    }
    // Small orbiting satellites and measured fiducial marks.
    for(let k=0;k<17;k++){let a=k*2.39996+t*.11;let r=2.12+.3*Math.sin(k*7);put(r*Math.cos(a),r*.32*Math.sin(a*.8),r*Math.sin(a),.45,k%5===0?1:0);}
    ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`${cell*1.18}px 'Courier New',monospace`;for(let i=0;i<glyphs.length;i++)if(glyphs[i]){ctx.fillStyle=ink[i];ctx.fillText(glyphs[i],(i%cols)*cell,Math.floor(i/cols)*rowH);}
    // Sparse UI measurement marks are actual drawn glyphs.
    ctx.fillStyle=`rgba(177,201,175,${.3*(1-scroll*.5)})`;ctx.font='10px monospace';ctx.textAlign='left';ctx.fillText('    . :  •    ',Math.max(10,centerX-scale*1.55),Math.max(28,centerY-scale*1.85));ctx.fillStyle=`rgba(184,255,57,${.58*(1-scroll*.4)})`;ctx.fillText('+',centerX+scale*1.4,centerY-scale*.9);
  }
  function paintCard(c){const v=sizeCanvas(c);if(!v)return;const {ctx,w,h}=v;ctx.fillStyle='#151d2a';ctx.fillRect(0,0,w,h);const cell=Math.max(8,Math.min(12,w/45)),row=cell*1.35;ctx.font=`${cell*1.15}px Courier New,monospace`;ctx.textAlign='center';ctx.textBaseline='middle';const nx=Math.ceil(w/cell),ny=Math.ceil(h/row),kind=c.dataset.kind||'helix';const ramp=' .:;-+*X#@';for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){
    const cellX=(i+.5)*cell,cellY=(j+.5)*row;
    // NAVI has no photograph yet. Its ASCII symbol stays centered in any card or dialog aspect ratio.
    const naviScale=Math.min(w,h)*.43;
    const x=kind==='compass'?(cellX-w/2)/naviScale:i/nx*2-1;
    const y=kind==='compass'?(cellY-h/2)/naviScale:j/ny*2-1;
    const rr=Math.hypot(x*.85,y),aa=Math.atan2(y,x);let z=0;
    if(kind==='helix')z=Math.exp(-Math.pow(rr-(.43+.08*Math.sin(6*aa)),2)/.007)+.44*Math.exp(-Math.pow(y-.26*Math.sin(x*10),2)/.01);
    else if(kind==='grid')z=(Math.sin(x*19)*Math.cos(y*16)>.54?1:0)*Math.exp(-rr*.8);
    else if(kind==='compass')z=.7*Math.exp(-Math.pow(rr-.47,2)/.005)+.7*Math.exp(-Math.pow(x*.8+y*.2,2)/.007)*Math.exp(-rr*rr*.5);
    else if(kind==='pixels')z=(Math.sin(x*22)*Math.sin(y*18)>.55?1:0);
    else if(kind==='wave')z=Math.exp(-Math.pow(y-.24*Math.sin(x*15+Math.sin(x*10)),2)/.009);
    else if(kind==='shield')z=Math.exp(-Math.pow(Math.abs(x)*.5+y*y-.5,2)/.015);
    else if(kind==='code')z=(Math.cos(x*19+y*6)**2+Math.sin(y*16)**2)*.4*Math.exp(-rr*.6);
    else z=Math.exp(-Math.pow(Math.abs(x)+.72*Math.abs(y)-.58,2)/.012)+.4*Math.exp(-Math.pow(y+.45*x,2)/.007);
    const n=hash(i*78+j*9);if(z<.16&&n>.02)continue;const b=Math.min(.95,z+.04*n),cc=ramp[Math.max(1,Math.min(9,Math.floor(b*9)))];ctx.fillStyle=(i+j)%11===0?`rgba(184,255,57,${.23+b*.68})`:`rgba(220,240,215,${.11+b*.8})`;ctx.fillText(cc,(i+.5)*cell,(j+.5)*row);
  }
  ctx.strokeStyle='rgba(187,201,243,.18)';ctx.strokeRect(w*.06,h*.07,w*.88,h*.86);ctx.fillStyle='rgba(184,255,57,.76)';ctx.font='11px monospace';ctx.textAlign='left';ctx.fillText('⟡ + / ∷ :',w*.09,h*.12);}
  let lastT=-1,lastBg=-1,active=true;const checkVisible=()=>{active=!document.hidden};document.addEventListener('visibilitychange',checkVisible);
  function render(time,force=false){const t=disabled?0:time;if(!oc||!fc)return;if(force||t-lastBg>.08){drawField(fc.ctx,fc.w,fc.h,t);lastBg=t;}if(force||t-lastT>.035){drawOrb(oc.ctx,oc.w,oc.h,t);lastT=t;}}
  function reset(){oc=sizeCanvas(orb);fc=sizeCanvas(field);pcc=sizeCanvas(portrait);if(pcc){paintCardOnPortrait()}document.querySelectorAll('canvas.ascii-placeholder').forEach(paintCard);lastT=-1;lastBg=-1;render(0,true);document.body.classList.add('art-ready');}
  function paintCardOnPortrait(){const {ctx,w,h}=pcc;ctx.clearRect(0,0,w,h);const g=ctx.createRadialGradient(w*.53,h*.5,5,w*.53,h*.5,w*.55);g.addColorStop(0,'rgba(86,100,165,.19)');g.addColorStop(1,'rgba(11,15,25,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);const cell=10,row=13;ctx.font='11px monospace';ctx.textAlign='center';const glyphs='.:*+×#@';for(let iy=0;iy<h/row;iy++)for(let ix=0;ix<w/cell;ix++){const x=(ix*cell-w*.5)/(w*.46),y=(iy*row-h*.5)/(h*.49),r=Math.hypot(x,y),a=Math.atan2(y,x),v=Math.sin(r*19-a*8)*Math.cos(x*7+y*8);if(r>1||v<.24)continue;let b=Math.min(6,Math.floor((v+.2)*5));ctx.fillStyle=`rgba(${b>4?'250,142,90':'176,196,244'},${.15+.55*(1-r)})`;ctx.fillText(glyphs[b],ix*cell,iy*row);}}
  let resizeTimeout;window.addEventListener('resize',()=>{clearTimeout(resizeTimeout);resizeTimeout=setTimeout(reset,100)});reset();
  const io=new IntersectionObserver((entries)=>entries.forEach(e=>{const v=e.target;if(e.isIntersecting&&!disabled){if(!v.src)v.src=v.dataset.video;v.muted=true;v.volume=0;v.play().catch(()=>{});}else v.pause()}),{threshold:.25});document.querySelectorAll('video[data-video]').forEach(v=>io.observe(v));
  function loop(ms){if(active&&!disabled)render(ms*.001);requestAnimationFrame(loop);}requestAnimationFrame(loop);setState();
})();
