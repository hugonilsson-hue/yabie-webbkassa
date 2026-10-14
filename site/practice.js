/* Övningsläge: samma guider men utan ring och instruktioner. Man får bara uppgiften och kan be om tips. */
(()=>{
const e2=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const eligible=app=>TOURS.filter(t=>!t.hide&&(t.app||'pos')===app&&!t.a920&&!t.phone&&!t.dev&&!/^hw-|^rap-/.test(t.id)&&t.steps.filter(s=>s.el).length>=3&&!t.steps.some(s=>s.choice));
window.practiceEligible=eligible;
let P=null,tick=null;
const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
const secs=()=>P?Math.round((Date.now()-P.start)/1000):0;

const st=document.createElement('style');st.textContent=`
.prcard{position:fixed;left:12px;top:12px;z-index:60;width:266px;background:var(--pg-panel,#fff);color:inherit;border:1.5px solid #f4b400;border-radius:14px;box-shadow:0 18px 40px -20px rgba(0,0,0,.45);padding:12px 14px;animation:prIn .4s cubic-bezier(.2,.8,.2,1) both}
.prcard.bad{animation:prBad .45s ease both;border-color:#e5484d}
.prcard .k{display:flex;align-items:center;gap:8px;font-size:11.5px;color:var(--pg-muted);font-weight:600;letter-spacing:.02em}
.prcard .k .sp{flex:1}.prcard .k .tm{font-variant-numeric:tabular-nums}
.prcard h4{margin:6px 0 4px;font-size:16px}.prcard p{margin:0;font-size:13px}
.prcard .row{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}.prcard .pbtn{font-size:12.5px;padding:6px 11px}
.prdots{display:flex;gap:3px;margin-top:8px}.prdots i{flex:1;height:4px;border-radius:9px;background:var(--pg-line);transition:background .3s}.prdots i.on{background:#f4b400}
.prpick{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;max-height:50vh;overflow:auto;margin:12px 0}
.prpick button{text-align:start;border:1px solid var(--pg-line);background:var(--pg-panel);border-radius:10px;padding:10px;font-size:13px;color:inherit;cursor:pointer;transition:transform .15s,border-color .15s;animation:qzUp .35s ease both}
.prpick button:hover{transform:translateY(-2px);border-color:#f4b400}.prpick small{display:block;color:var(--pg-muted);font-size:11px;margin-top:3px}
.prstars{font-size:40px;letter-spacing:6px;margin:6px 0}.prstars span{display:inline-block;animation:prStar .5s cubic-bezier(.3,1.7,.5,1) both}.prstars .off{filter:grayscale(1);opacity:.25}
@keyframes prIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:none}}
@keyframes prBad{0%,100%{transform:none}25%{transform:translateX(-7px)}50%{transform:translateX(6px)}75%{transform:translateX(-3px)}}
@media (max-width:860px){.prcard{left:8px;right:8px;top:auto;bottom:8px;width:auto}}
@keyframes prStar{from{opacity:0;transform:scale(0) rotate(-90deg)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){.prcard,.prstars span{animation:none!important}}`;document.head.appendChild(st);

/* Uppgiftskortet ersätter ringen och pratbubblan */
function card(){const s=cur();const steps=stepsOf(T.t),k=T.i;
 let extra='';
 if(s.type)extra=`<p style="margin-top:6px">${GU('u.prType')} <b>${e2(s.type)}</b></p>`;
 const el=s.el?target(s):null;
 tourEl.innerHTML=`<div class="prcard" ${GDIR()}><div class="k">🎯 ${GU('u.prTask')}<span class="sp"></span><span class="tm" data-tm>${fmt(secs())}</span>${P.hints?` · 💡 ${P.hints}`:''}</div>
  <h4><bdi>${e2(GT(T.t.title))}</bdi></h4><p>${GU('u.prGoal')}</p>${extra}
  <div class="prdots">${steps.map((x,i)=>`<i class="${i<k?'on':''}"></i>`).join('')}</div>
  <div class="row">${s.fill?`<button class="pbtn" data-prfill>${GU('u.fill')}</button>`:''}${s.el&&!el?`<button class="pbtn" data-restart>${GU('u.restart')}</button>`:''}<button class="pbtn" data-prhint>💡 ${GU('u.prHint')}</button><span style="flex:1"></span><button class="lnk" data-tstop>${GU('u.prQuit')}</button></div></div>`}

const _show=show;show=function(){if(!(T&&(T.practice||window.__prac)))return _show.apply(this,arguments);
 if(!T.practice)return;const s=cur();if(!s){stopTour();return}
 if((s.next&&!s.el&&!s.type)||(!s.el&&!s.until&&!s.on&&!s.type&&!s.fill)){const i=T.i;setTimeout(()=>{if(T&&T.i===i)advance()},10);return}
 if(P.hintAt===T.i){_show.apply(this,arguments);const b=document.getElementById('bub');if(b)b.classList.add('prhint');return}
 card()};
const _shake=shake;shake=function(){if(!(T&&T.practice))return _shake.apply(this,arguments);P.wrong++;const c=tourEl.querySelector('.prcard');if(c){c.classList.remove('bad');void c.offsetWidth;c.classList.add('bad')}else _shake()};
tourEl.addEventListener('click',e=>{if(!(T&&T.practice))return;const b=e.target.closest('button');if(!b)return;
 if('prhint' in b.dataset){e.stopPropagation();P.hints++;P.hintAt=T.i;show();return}
 if('restart' in b.dataset){e.stopPropagation();start(T.t.id);return}
 if('prfill' in b.dataset){e.stopPropagation();P.hints++;const s=cur();if(s.fill){s.fill();render()}return}},true);

const _stop=stopTour;stopTour=function(){clearInterval(tick);P=null;window.__prac=false;return _stop.apply(this,arguments)};
const _fin=finishTour;finishTour=function(){if(!(T&&T.practice))return _fin.apply(this,arguments);
 const t=T.t,res={hints:P.hints,wrong:P.wrong,secs:secs()};clearInterval(tick);P=null;window.__prac=false;
 _fin.apply(this,arguments);
 const stars=res.hints===0&&res.wrong<=2?3:res.hints<=1?2:1;
 TS.practice=TS.practice||{};const prev=TS.practice[t.id];if(!prev||stars>prev.stars||(stars===prev.stars&&res.secs<prev.secs))TS.practice[t.id]={stars,secs:res.secs,hints:res.hints,at:new Date().toISOString().slice(0,10)};tsave();
 window.groupSync&&groupSync();
 tourEl.innerHTML=`<div class="win quiz qz" ${GDIR()}><div style="text-align:center"><div class="prstars">${[0,1,2].map(i=>`<span class="${i<stars?'':'off'}" style="animation-delay:${200+i*180}ms">⭐</span>`).join('')}</div>
  <h3>${GU('u.prDone')}</h3><p><bdi>${e2(GT(t.title))}</bdi></p>
  <div class="qzstats"><div><b>${fmt(res.secs)}</b><span>${GU('u.prTime')}</span></div><div><b>${res.hints}</b><span>${GU('u.prHints')}</span></div><div><b>${res.wrong}</b><span>${GU('u.prWrong')}</span></div></div>
  <p style="font-size:12.5px">${stars===3?GU('u.pr3'):GU('u.prMore')}</p>
  <div class="qzfoot" style="justify-content:center;flex-wrap:wrap"><button class="pbtn" data-qx>${GU('u.close')}</button><button class="pbtn" data-pragain="${t.id}">${GU('u.prAgain')}</button><button class="pbtn pri" data-prnew>🎲 ${GU('u.prNew')}</button></div></div></div>`;
 if(stars===3)setTimeout(()=>window.confetti&&confetti(120),500);
 setTimeout(()=>{list()},50)};

function start(id){tourEl.innerHTML='';window.__prac=true;startTour(id);if(!T||T.t.id!==id){window.__prac=false;return}
 P={start:Date.now(),hints:0,wrong:0,hintAt:-1};T.practice=true;window.__prac=false;document.getElementById('side').classList.remove('open');show();
 clearInterval(tick);tick=setInterval(()=>{const tm=tourEl.querySelector('[data-tm]');if(tm)tm.textContent=fmt(secs());if(!P)clearInterval(tick)},1000)}
window.practiceStart=start;
const rnd=app=>{const el=eligible(app);const pool=el.filter(t=>TS.done[t.id]);const src=pool.length?pool:el;return src[Math.floor(Math.random()*src.length)]};

function pick(app){app=app||APP();const el=eligible(app);const pr=TS.practice||{};
 tourEl.innerHTML=`<div class="win quiz qz" ${GDIR()}><div style="max-width:640px;width:calc(100vw - 32px)"><h3 style="font-size:18px">🎯 ${GU('u.prT')}</h3><p style="font-size:13px">${GU('u.prP')}</p>
  <div class="prpick">${el.map((t,i)=>`<button data-prgo="${t.id}" style="animation-delay:${Math.min(i,20)*25}ms"><bdi>${e2(GT(t.title))}</bdi><small>${pr[t.id]?'⭐'.repeat(pr[t.id].stars)+' · '+fmt(pr[t.id].secs):TS.done[t.id]?'✓ '+GU('u.prSeen'):''}</small></button>`).join('')}</div>
  <div class="qzfoot"><button class="pbtn" data-qx>${GU('u.close')}</button><button class="pbtn pri" data-prnew>🎲 ${GU('u.prRandom')}</button></div></div></div>`}
window.practicePick=pick;
tourEl.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.prgo){e.stopPropagation();start(b.dataset.prgo)}
 else if(b.dataset.pragain){e.stopPropagation();start(b.dataset.pragain)}
 else if('prnew' in b.dataset){e.stopPropagation();const t=rnd(APP());if(t)start(t.id)}
 else if('qx' in b.dataset&&tourEl.querySelector('.prpick, .prstars')){tourEl.innerHTML=''}},true);

/* Knapp i kurskortet */
const _list=list;list=function(){_list.apply(this,arguments);const c=document.querySelector('#glist .course');if(c&&!c.querySelector('[data-prpick]')&&eligible(APP()).length)c.insertAdjacentHTML('beforeend',`<button class="pbtn" data-prpick style="margin-top:6px">🎯 ${GU('u.prBtn')}</button>`)};
document.getElementById('glist').addEventListener('click',e=>{if(e.target.closest('[data-prpick]')){e.stopPropagation();pick()}},true);
})();
