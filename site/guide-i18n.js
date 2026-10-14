/* Språkval för guiderna. Bara guidetexterna översätts; kassan och Backstage visas på svenska eller engelska. */
(()=>{
const LANGS=[['sv','Svenska'],['en','English'],['zh','中文'],['hi','हिन्दी'],['es','Español'],['fr','Français'],['ar','العربية'],['bn','বাংলা'],['pt','Português'],['ru','Русский'],['id','Bahasa Indonesia'],['ur','اردو']];
const RTL={ar:1,ur:1};
window.GLD=window.GLD||{};window.GSRC=window.GSRC||{};window.GUSV=window.GUSV||{};
const LK='yabie-guide-lang';
let lang=(()=>{try{return localStorage.getItem(LK)||'sv'}catch(e){return 'sv'}})();
const D=()=>lang!=='sv'&&GLD[lang];
window.GT=s=>{if(typeof s!=='string'||!s)return s;const d=D();if(!d)return s;const k=GSRC[s];return (k&&d[k])||s};
window.GU=(k,...a)=>{const d=D();let t=(d&&d[k])||GUSV[k]||k;if(k==='u.coursePart'&&!/\s$/.test(t))t+=' ';return t.replace(/\{([a-z])\}/g,(m,c)=>{const i=c.charCodeAt(0)-97;return a[i]!=null?a[i]:m})};
window.GRTL=()=>!!RTL[lang]&&!!D();
window.GDIR=()=>GRTL()?'dir="rtl"':'';
window.GLANG=()=>lang;
const loaded={};
function load(l,cb){if(l==='sv'||GLD[l]){cb();return}if(loaded[l])return;loaded[l]=1;const s=document.createElement('script');s.src='gt/'+l+'.js';s.onload=()=>{loaded[l]=0;cb()};s.onerror=()=>{loaded[l]=0;cb()};document.head.appendChild(s)}
function refresh(){try{typeof list==='function'&&list()}catch(e){}try{if(typeof T!=='undefined'&&T&&typeof show==='function')show()}catch(e){}gChrome()}
window.setGuideLang=l=>{lang=l;try{localStorage.setItem(LK,l)}catch(e){}load(l,refresh);refresh()};
const set=(id,k,pre='')=>{const e=document.getElementById(id);if(e)e.textContent=pre+GU(k)};
window.gChrome=()=>{set('m-free','u.modeFree');set('m-guide','u.modeGuide');set('reset','u.reset');set('a-pos','u.appPos');set('a-mob','u.appMob');set('menu','u.menu');
 const tg=document.querySelector('.side .brand small');if(tg)tg.textContent=GU('u.tagline');set('glang-l','u.lang');set('glang-n','u.langNote');
 const sel=document.getElementById('glang');if(sel&&sel.value!==lang)sel.value=lang;
 const side=document.getElementById('side');if(side)side.querySelectorAll('.side-h .brand,.glang').forEach(e=>e.setAttribute('dir',GRTL()?'rtl':'ltr'))};
document.addEventListener('DOMContentLoaded',()=>{});
const mount=()=>{const h=document.querySelector('.side .side-h');if(!h||document.getElementById('glang'))return;const w=document.createElement('div');w.className='glang';
 w.innerHTML=`<label for="glang"><span aria-hidden="true">🌐</span> <span id="glang-l"></span></label><select id="glang">${LANGS.map(([c,n])=>`<option value="${c}">${n}</option>`).join('')}</select><small id="glang-n"></small>`;h.appendChild(w);
 w.querySelector('select').onchange=e=>setGuideLang(e.target.value);gChrome()};
const st=document.createElement('style');st.textContent=`.glang{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:4px 8px;margin-top:10px;font-size:12px}
.glang label{color:#555;font-weight:600;white-space:nowrap}.glang select{font:inherit;font-size:12.5px;padding:5px 6px;border:1px solid #d6d6db;border-radius:8px;background:#fff;min-width:0}
.glang small{grid-column:1/-1;color:#8e8e93;font-size:10.5px;line-height:1.35}
[dir=rtl].bub .act,[dir=rtl] .act{flex-direction:row-reverse}[dir=rtl].bub{text-align:right}`;document.head.appendChild(st);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
setTimeout(mount,0);
if(lang!=='sv')load(lang,refresh);
})();
