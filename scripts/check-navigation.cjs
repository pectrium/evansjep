const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
let active=null;const listeners={};
class E{constructor(name){this.name=name;this.attrs={};this.handlers={};this.hidden=false;this.textContent='';this.inert=false;this.parent=null;this.classes=new Set();this.classList={toggle:(s,on)=>{if(on)this.classes.add(s);else this.classes.delete(s)}};}setAttribute(k,v){this.attrs[k]=v;}getAttribute(k){return this.attrs[k]??null;}addEventListener(k,fn){(this.handlers[k]??=[]).push(fn)}focus(){active=this;doc.activeElement=this;}contains(n){return this===n||n.parent===this||n.parent?.parent===this;}closest(s){if(s==='[hidden]')return this.hidden?this:this.parent?.hidden?this.parent:null;if(s==='.about-nav')return [about,drop,a].includes(this)?about:null;return null;}querySelector(s){if(this===toggle)return menuLabel;if(this===drop)return a;return null}querySelectorAll(s){if(this===nav)return s==='a'?[a,work]:[about,a,work,theme];return []}fire(k,p={}){const e={key:'',target:this,shiftKey:false,preventDefault(){this.prevented=true},...p};for(const f of this.handlers[k]||[])f(e);return e}}
const toggle=new E('menu'),menuLabel=new E('label'),nav=new E('nav'),about=new E('about'),drop=new E('drop'),a=new E('story'),work=new E('work'),theme=new E('theme'),main=new E('main'),footer=new E('footer'),outside=new E('outside');a.parent=drop;drop.parent=nav;drop.hidden=true;about.parent=nav;work.parent=nav;theme.parent=nav;
const map={'.menu-toggle':toggle,'#navigation':nav,'.about-toggle':about,'#about-navigation':drop,'.theme-toggle':theme,main,footer,'meta[name="theme-color"]':{content:''}};
const doc={activeElement:null,querySelector:s=>map[s],addEventListener:(k,f)=>(listeners[k]??=[]).push(f),body:new E('body'),documentElement:{dataset:{theme:'light'}}};
const mq={matches:true,addEventListener:(k,f)=>{mq.change=f}};
vm.runInNewContext(fs.readFileSync('src/site.js','utf8'),{document:doc,matchMedia:()=>mq,localStorage:{setItem(){}}});
function fireDoc(k,props={}){const e={target:outside,preventDefault(){this.prevented=true},...props};for(const f of listeners[k]||[])f(e);return e;}
toggle.fire('click');assert.equal(toggle.getAttribute('aria-expanded'),'true');assert(main.inert&&footer.inert);assert.equal(active,about);
about.fire('click');assert.equal(drop.hidden,false);assert.equal(about.getAttribute('aria-label'),'Collapse About');
fireDoc('keydown',{key:'Escape'});assert(drop.hidden);assert.equal(active,about);assert.equal(toggle.getAttribute('aria-expanded'),'true');
about.fire('keydown',{key:'ArrowDown'});assert.equal(active,a);assert(!drop.hidden);
fireDoc('keydown',{key:'Escape'});theme.focus();assert(fireDoc('keydown',{key:'Tab'}).prevented);assert.equal(active,toggle);
fireDoc('keydown',{key:'Tab',shiftKey:true});assert.equal(active,theme);
fireDoc('keydown',{key:'Escape'});assert.equal(toggle.getAttribute('aria-expanded'),'false');assert(!main.inert&&!footer.inert);assert.equal(active,toggle);
about.fire('click');fireDoc('pointerdown');assert(drop.hidden);
about.fire('click');fireDoc('focusin');assert(drop.hidden);
toggle.fire('click');work.fire('click');assert(!main.inert);assert.equal(toggle.getAttribute('aria-expanded'),'false');
theme.fire('click');assert.equal(doc.documentElement.dataset.theme,'dark');assert.equal(theme.getAttribute('aria-pressed'),'true');
toggle.fire('click');mq.change();assert.equal(toggle.getAttribute('aria-expanded'),'false');
console.log('Passed DOM-model interaction checks: disclosure, Escape, focus loop, outside click, focus dismissal, route click, resize and appearance. These are not rendered browser tests.');
