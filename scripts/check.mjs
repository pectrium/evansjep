import {readdir,readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {articles} from '../src/articles.mjs';
import {projects} from '../src/projects.mjs';
async function files(dir){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=`${dir}/${e.name}`;out.push(...e.isDirectory()?await files(p):[p]);}return out;}
const all=await files('dist'),htmlFiles=all.filter(x=>x.endsWith('.html'));let links=0;
for(const file of htmlFiles){
 const html=await readFile(file,'utf8');
 assert.equal((html.match(/<h1>/g)||[]).length,1,file);
 assert(html.includes('id="main"'));assert(html.includes('noindex,nofollow'));
 assert(!/\[(?:Confirm|Project|Article|Date|Actual)|Editorial draft|Last updated:|EDITORIAL DRAFT/.test(html),'Editorial leak: '+file);
 assert(html.replaceAll('&amp;','&').includes('Biography & Media'));
 for(const m of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)){const target=m[1];await access(target==='/'?'dist/index.html':`dist${target}${target.includes('.')?'':'.html'}`);links++;}
 for(const m of html.matchAll(/href="#([^"]+)"/g))assert(html.includes(`id="${m[1]}"`),`Missing fragment ${m[1]}: ${file}`);
 const nav=html.match(/<nav id="navigation"[\s\S]*?<\/nav>/)[0];
 assert(!nav.includes('↗'));assert(!nav.includes('/media'));assert(nav.includes('About'));
}
assert.equal(htmlFiles.length,10+articles.length+projects.length);assert(!all.some(x=>/dist\/editorial\//.test(x)));const articleFiles=all.filter(x=>x.startsWith('dist/writing/'));assert.deepEqual(articleFiles.sort(),articles.map(a=>'dist/writing/'+a.slug+'.html').sort());
const story=await readFile('dist/about.html','utf8');assert(story.includes('width="1154" height="1536"'));assert(!story.includes('viewBox="6 0 690'));
const how=await readFile('dist/about/approach.html','utf8');assert(!how.includes('/photos/'));
const writing=await readFile('dist/writing.html','utf8');assert(writing.includes('Notes on building.'));for(const a of articles){assert(writing.includes('/writing/'+a.slug));const page=await readFile('dist/writing/'+a.slug+'.html','utf8');assert(page.includes('datetime="2026-10-21"'));assert(page.includes('Back to insights'));assert(page.includes('aria-current="page"'));assert(a.sections.every(s=>s.paragraphs.length>=2));}assert(!writing.includes('information-before-interface'));
const now=await readFile('dist/now.html','utf8');assert(!now.includes('20 October'));assert(!now.includes('Last updated'));
const contact=await readFile('dist/contact.html','utf8');for(const url of ['mailto:realevansjep@gmail.com','https://wa.me/2347088603467','https://www.tiktok.com/@evansjep','https://x.com/realevansjep'])assert(contact.includes(url));
const press=await readFile('dist/media.html','utf8');assert(!press.includes('download='));assert(press.includes('Extended biography'));
console.log(`Verified ${htmlFiles.length} pages and ${links} internal asset/navigation links, fragments, content exclusions, contacts and metadata.`);

const home=await readFile('dist/index.html','utf8');const homeMain=home.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];assert(homeMain.includes('Explore Pectrium'));assert(homeMain.includes('href="/ventures"'));for(const unwanted of ['Quincestone','Emperor Armani','Jeclazon','selected-work','writing-preview','intro-section'])assert(!homeMain.includes(unwanted),'Homepage content isolation: '+unwanted);

for(const file of htmlFiles){const html=await readFile(file,'utf8');const nav=html.split('<nav id="navigation"')[1].split("</nav>")[0];for(const label of ['Biography','Principles','Approach','Pectrium','Insights','Focus','Contact'])assert(nav.includes(label));assert(html.includes('class="site-footer compact-footer"'));assert(html.includes('aria-label="Social profiles"'));for(const name of ['Instagram','Facebook','TikTok','X'])assert(html.includes('aria-label="Evans Jep on '+name+'"'));for(const url of ['https://www.instagram.com/_u/realevansjep','https://www.facebook.com/share/14wNg8VV2N3/'])assert(html.includes(url));assert(!html.includes('footer-invitation'));assert(!html.split('<footer')[1].split('</footer>')[0].includes('Contact Evans'));}

const projectIndex=await readFile('dist/ventures.html','utf8');
assert.deepEqual(projects.map(p=>p.slug),['pectrium']);
assert(projectIndex.includes('/work/pectrium'));
const company=await readFile('dist/work/pectrium.html','utf8');
for(const term of ['Independent technology company','Technology built around real needs.','CEO of Pectrium','Discuss a project'])assert(company.includes(term));
for(const file of htmlFiles){const html=await readFile(file,'utf8');for(const retired of ['Jeclazon','jeclazon','Quincestone','quincestone','Emperor Armani','emperor-armani','EJEP Systems'])assert(!html.includes(retired),'Retired showcase leaked: '+file+' '+retired);}
for(const file of all)assert(!/quincestone|emperor-armani|jeclazon/.test(file),'Retired public asset: '+file);
assert(!company.includes('href="undefined"'));
