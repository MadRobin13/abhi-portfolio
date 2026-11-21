(() => {
  'use strict';
  // Recognitions drawn from verified application and portfolio records. Team awards are identified as such.
  const awards = [
  {
    "title": "IEEE SSCS Arduino Contest",
    "description": "Second place worldwide, high school category, 2025",
    "href": "#recognition"
  },
  {
    "title": "Youth Climate Action Fund",
    "description": "$6,000 project grant for the PET filament maker",
    "href": "#recognition"
  },
  {
    "title": "Samsung Solve for Tomorrow",
    "description": "National finalist for our recycling robot, 2026",
    "href": "#recognition"
  },
  {
    "title": "FIRST Ontario Championship",
    "description": "Engineering Inspiration Award, team award in 2026",
    "href": "#recognition"
  },
  {
    "title": "FIRST Humber District",
    "description": "Impact Award, team award in 2026",
    "href": "#recognition"
  },
  {
    "title": "FIRST Niagara District",
    "description": "Engineering Inspiration Award, team award in 2026",
    "href": "#recognition"
  },
  {
    "title": "FIRST Niagara District",
    "description": "Event Finalist, team award in 2026",
    "href": "#recognition"
  },
  {
    "title": "FIRST Waterloo District",
    "description": "Quality Award, team award in 2025",
    "href": "#recognition"
  },
  {
    "title": "FIRST Waterloo District",
    "description": "Excellence in Engineering, team award in 2024",
    "href": "#recognition"
  },
  {
    "title": "FIRST Durham District",
    "description": "Team Sustainability Award, team award in 2024",
    "href": "#recognition"
  },
  {
    "title": "Hack the Ridge",
    "description": "Overall winner for SymptoAI in 2024",
    "href": "#recognition"
  },
  {
    "title": "Eureka Hacks",
    "description": "Best Use of AI for ABC2XYZ in 2024",
    "href": "#recognition"
  },
  {
    "title": "Eureka Hacks",
    "description": "Best .xyz Domain for ABC2XYZ in 2024",
    "href": "#recognition"
  }
];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  for (const track of document.querySelectorAll('[data-recognitions]')) {
    const panel = track.closest('.rail-highlights, .rail-mobile-highlights');
    if (!panel) continue;
    let offset = 0;
    let moving = false;
    const item = (a, offscreen) => {
      const li = document.createElement('li'); li.className = 'rail-recognition-item';
      const link = document.createElement('a'); link.href = (location.pathname.endsWith('/about.html') && a.href.startsWith('#')) ? 'index.html'+a.href : a.href;
      const title = document.createElement('strong'); title.textContent = a.title;
      const detail = document.createElement('span'); detail.textContent = a.description;
      link.append(title, detail); li.append(link);
      if (offscreen) { li.setAttribute('aria-hidden', 'true'); link.tabIndex = -1; }
      return li;
    };
    function paint() {
      const fragment = document.createDocumentFragment();
      for (let i=0;i<5;i++) fragment.append(item(awards[(offset+i)%awards.length],i===4));
      track.replaceChildren(fragment);
      track.style.transition = 'none';
      track.style.transform = '';
      // Read layout to restart the next transition only after the five items are painted.
      void track.offsetHeight;
      track.style.transition = '';
      moving = false;
    }
    paint();
    let timer = null;
    function tick() {
      const readingLink = panel.contains(document.activeElement) && document.activeElement?.tagName === 'A';
      const hoverPaused = window.matchMedia('(hover:hover) and (pointer:fine)').matches && panel.matches(':hover');
      if (motion.matches || moving || document.hidden || hoverPaused || readingLink ||
        (panel.tagName === 'DETAILS' && !panel.open) || !panel.getBoundingClientRect().width) return;
      moving = true;
      track.classList.add('is-shifting');
    }
    track.addEventListener('transitionend',e=>{
      if (e.propertyName !== 'transform' || !moving) return;
      track.classList.remove('is-shifting'); offset=(offset+1)%awards.length;paint();
      const count=panel.querySelector('.rail-highlights h2 span') || panel.querySelector('h2 span');
      if (count) count.textContent = `${String(offset+1).padStart(2,'0')} to ${String((offset+3)%awards.length+1).padStart(2,'0')} / ${String(awards.length).padStart(2,'0')}`;
    });
    timer = window.setInterval(tick, 4100);
    window.addEventListener('pagehide',()=>clearInterval(timer),{once:true});
  }
})();
