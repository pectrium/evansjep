const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
const aboutToggle=document.querySelector('.about-toggle');
const dropdown=document.querySelector('#about-navigation');
const appearance=document.querySelector('.theme-toggle');
const main=document.querySelector('main');
const footer=document.querySelector('footer');
const narrow=matchMedia('(max-width:799px)');
function setAbout(open){aboutToggle.setAttribute('aria-expanded',String(open));aboutToggle.setAttribute('aria-label',open?'Collapse About':'Expand About');dropdown.hidden=!open;}
function setMenu(open,restore=false){toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');toggle.querySelector('span').textContent=open?'Close':'Menu';navigation.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);main.inert=open;footer.inert=open;if(open)aboutToggle.focus();else{setAbout(false);if(restore)toggle.focus();}}
toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
aboutToggle.addEventListener('click',()=>setAbout(aboutToggle.getAttribute('aria-expanded')!=='true'));
aboutToggle.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();setAbout(true);dropdown.querySelector('a').focus();}});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&aboutToggle.getAttribute('aria-expanded')==='true'){event.preventDefault();setAbout(false);aboutToggle.focus();return;}
 if(toggle.getAttribute('aria-expanded')!=='true')return;
 if(event.key==='Escape'){event.preventDefault();setMenu(false,true);return;}
 if(event.key==='Tab'){
  const controls=[toggle,...navigation.querySelectorAll('button,a')].filter(el=>!el.closest('[hidden]'));
  const first=controls[0],last=controls.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 }
});
document.addEventListener('pointerdown',event=>{if(!event.target.closest('.about-nav'))setAbout(false);if(toggle.getAttribute('aria-expanded')==='true'&&!navigation.contains(event.target)&&!toggle.contains(event.target))setMenu(false,true);});
document.addEventListener('focusin',event=>{if(!event.target.closest('.about-nav'))setAbout(false);});
narrow.addEventListener('change',()=>setMenu(false));
function syncAppearance(){const dark=document.documentElement.dataset.theme==='dark';appearance.textContent=dark?'Light':'Dark';appearance.setAttribute('aria-pressed',String(dark));appearance.setAttribute('aria-label',dark?'Switch to light appearance':'Switch to dark appearance');document.querySelector('meta[name="theme-color"]').content=dark?'#080808':'#ffffff';}
appearance.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('evans-jep-appearance-v2',theme);}catch{}syncAppearance();});
syncAppearance();
