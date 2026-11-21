(()=>{
  'use strict';
  const list=(window.ABHI_ARCHIVE||[]).filter(x=>x.type!=='duplicate');
  const evidence=window.ABHI_PROJECT_EVIDENCE||{};
  const byId=new Map(list.map(x=>[x.id,x]));
  const archive=document.getElementById('archive-grid');
  const tools=document.getElementById('archive-tools');
  const more=document.getElementById('archive-more');
  const dialog=document.getElementById('media-dialog');
  const dialogBody=document.getElementById('media-dialog-body');
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const thumb=m=>m.type==='video'?`<img src="${escape(m.poster)}" alt="${escape(m.title)}" loading="lazy">`:`<img src="${escape(m.src)}" alt="${escape(m.title)}" loading="lazy">`;
  function openMedia(id){
    const m=byId.get(id);if(!m||!dialog||!dialogBody)return;
    const frame=m.type==='video'?`<video src="${escape(m.src)}" poster="${escape(m.poster)}" controls muted playsinline preload="metadata"></video>`:`<img src="${escape(m.src)}" alt="${escape(m.title)}">`;
    dialogBody.innerHTML=`<div class="media-viewer">${frame}<div class="media-viewer-text"><span class="viewer-label">${m.type==='video'?'VIDEO RECORDING':'PHOTOGRAPH'} / ${escape(m.group.toUpperCase())}</span><h2>${escape(m.title)}</h2>${m.type==='photo'?`<a href="${escape(m.original)}" target="_blank" rel="noopener">Open full-size website image ↗</a>`:''}</div></div>`;
    dialog.showModal(); const v=dialogBody.querySelector('video');if(v){v.muted=true;v.defaultMuted=true;v.volume=0;}
  }
  document.addEventListener('click',e=>{
    const a=e.target.closest('[data-media-open]');if(a){openMedia(a.dataset.mediaOpen);return;}
    // The existing portfolio handler opens the details first; append real media as a second panel.
    const p=e.target.closest('[data-project]');if(p){
      const area=document.querySelector('#project-dialog .dialog-copy');if(!area||area.querySelector('.project-evidence'))return;
      const approvedIds=evidence[p.dataset.project]||[];
      const matches=approvedIds.map(id=>byId.get(id)).filter(Boolean);
      if(!matches.length)return;
      const block=document.createElement('section');block.className='project-evidence';block.innerHTML=`<h3>Photographs & demonstrations <span>(${matches.length})</span></h3><div class="evidence-grid">${matches.map(m=>`<button type="button" data-media-open="${escape(m.id)}" aria-label="Open ${escape(m.title)}">${thumb(m)}<small>${escape(m.title)}</small></button>`).join('')}</div>`;area.appendChild(block);
    }
  });
  document.getElementById('media-dialog-close')?.addEventListener('click',()=>{dialog.close();dialogBody.innerHTML=''});
  dialog?.addEventListener('click',e=>{if(e.target===dialog){dialog.close();dialogBody.innerHTML=''}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog?.open)dialogBody.innerHTML=''});
  const intro=document.getElementById('ascii-intro');
  const noMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (intro) {
    if (document.documentElement.classList.contains('intro-seen')) {
      // Returning from About or reloading in the same tab should never replay it.
      intro.remove();
    } else {
      let finished=false;
      let revealComplete=false;
      const finishIntro=()=>{
        if(finished)return;
        finished=true;
        intro.classList.add('intro-finish');
        window.setTimeout(()=>intro.remove(),450);
      };
      // Also dismiss a suspended intro if the browser restores this page from bfcache.
      window.addEventListener('pageshow',event=>{
        if(event.persisted && intro.isConnected) finishIntro();
      });
      document.getElementById('skip-intro')?.addEventListener('click',finishIntro);
      if (noMotion) {
        finishIntro();
      } else {
      // Wait for the name reveal itself, then let viewers see the completed ASCII art.
      const nameArt=intro.querySelector('.name-ascii');
      const afterReveal=()=>{
        if(revealComplete)return;
        revealComplete=true;
        window.setTimeout(finishIntro,800);
      };
      nameArt?.addEventListener('animationend',event=>{
        if(event.animationName==='introReveal')afterReveal();
      });
      const reveal=nameArt?.getAnimations?.().find(animation=>animation.animationName==='introReveal');
      if (reveal) reveal.finished.then(afterReveal,afterReveal);
      else window.setTimeout(afterReveal,1250);
      // Last resort: never leave an overlay hiding the site if animation events fail.
        window.setTimeout(finishIntro,3700);
      }
    }
  }
})();
