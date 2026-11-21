(()=>{
  'use strict';
  const menu=document.getElementById('menu-toggle');
  const nav=document.getElementById('mobile-nav');
  if(!menu||!nav)return;
  menu.addEventListener('click',()=>{
    const expanded=menu.getAttribute('aria-expanded')==='true';
    menu.setAttribute('aria-expanded',String(!expanded));
    nav.hidden=expanded;
    menu.innerHTML=expanded?'Menu <span>+</span>':'Close <span>×</span>';
  });
})();
