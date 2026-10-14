/* Quiz med intyg, länk till en enskild guide och personalens framsteg. */
(()=>{
const esc2=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const st=document.createElement('style');st.textContent=`
.win.quiz>div{max-width:480px;width:calc(100vw - 32px);text-align:left}
.qopt{display:block;width:100%;text-align:left;border:1px solid var(--pg-line);background:var(--pg-panel);border-radius:10px;padding:10px 12px;margin:6px 0;font-size:14px;color:inherit}
.qopt.ok{border-color:var(--pg-ok);background:color-mix(in srgb,var(--pg-ok) 14%,transparent)}.qopt.bad{border-color:#e5484d;background:color-mix(in srgb,#e5484d 12%,transparent)}
.qmeta{font-size:12px;color:var(--pg-muted);margin-bottom:4px}.qfb{font-size:13px;margin:8px 0 0;min-height:18px}
.cert{background:#fff;color:#14261d;border:3px solid #1f9d55;border-radius:14px;padding:26px 22px;text-align:center;margin:6px 0 12px}
.cert .lg{font:800 13px/1 Inter,sans-serif;letter-spacing:.14em;color:#1f9d55}.cert h4{margin:10px 0 2px;font-size:24px}.cert .nm{font-size:22px;font-weight:700;margin:14px 0 6px;border-bottom:1px solid #cfe9da;padding-bottom:6px}
.cert p{color:#3c5146!important;font-size:13px;margin:6px 0!important}
.glink{margin-left:auto;opacity:0;font-size:12px;padding:0 4px}.gi:hover .glink,.gi:focus-within .glink{opacity:.7}
.team{width:100%;border-collapse:collapse;font-size:12.5px}.team th,.team td{text-align:left;padding:6px 4px;border-bottom:1px solid var(--pg-line)}.team th{font-size:11px;color:var(--pg-muted);font-weight:600}
.win.teamw>div{max-width:720px;width:calc(100vw - 32px);max-height:calc(100vh - 32px);overflow:auto;text-align:left}
@media print{body *{visibility:hidden}.cert,.cert *{visibility:visible}.cert{position:fixed;inset:40px;border-width:4px}}`;document.head.appendChild(st);

/* ── Diplomprov: 25 frågor, animerat ── */
const Q=window.QUIZ_SRC||{pos:[],bs:[],mob:[]};
const PASS_PCT=0.8,PASS=20;
const passOf=n=>Math.ceil(n*PASS_PCT);
const courseName=a=>a==='bs'?GU('u.courseBs'):a==='mob'?GU('u.courseMob'):GU('u.coursePos');
const shuffle=a=>{const r=a.map((x,i)=>[x,i]);for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r};
const calm=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
{const s=document.createElement('style');s.textContent=`
.win.quiz.qz>div{max-width:540px;width:calc(100vw - 32px);overflow:hidden;position:relative}
.qz{--qzx:44px}.qz[dir=rtl]{--qzx:-44px}
.qzhead{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--pg-muted);margin-bottom:8px}
.qzhead .sp{flex:1}
.qzchip{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;background:color-mix(in srgb,var(--pg-ok) 14%,transparent);color:var(--pg-ok);font-weight:700;font-size:12px}
.qzchip.fire{background:color-mix(in srgb,#ff7a1a 16%,transparent);color:#e8650c}
.qzchip.bump{animation:qzBump .45s cubic-bezier(.3,1.6,.5,1)}
.qzbar{height:8px;border-radius:99px;background:var(--pg-line);overflow:hidden;margin-bottom:16px}
.qzbar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#1677ff,#22c55e);transition:width .6s cubic-bezier(.2,.8,.2,1)}
.qzcard{animation:qzIn .45s cubic-bezier(.2,.8,.2,1) both}.qzcard.out{animation:qzOut .25s ease-in both}
.qzcard h3{font-size:18px;line-height:1.35;margin:0 0 12px}
.qz .qopt{position:relative;display:block;width:100%;text-align:start;border:1.5px solid var(--pg-line);background:var(--pg-panel);border-radius:12px;padding:12px 40px 12px 14px;margin:8px 0;font-size:14.5px;color:inherit;cursor:pointer;transition:transform .15s,border-color .15s,box-shadow .15s;animation:qzUp .4s cubic-bezier(.2,.8,.2,1) both}
.qz[dir=rtl] .qopt{padding:12px 14px 12px 40px}
.qz .qopt:hover:not([disabled]){transform:translateY(-2px);border-color:#1677ff;box-shadow:0 6px 18px -10px #1677ff}
.qz .qopt[disabled]{cursor:default}
.qz .qopt.ok{border-color:var(--pg-ok);background:color-mix(in srgb,var(--pg-ok) 14%,var(--pg-panel));animation:qzPulse .55s ease both}
.qz .qopt.bad{border-color:#e5484d;background:color-mix(in srgb,#e5484d 12%,var(--pg-panel));animation:qzShake .45s ease both}
.qz .qopt.dim{opacity:.45}
.qz .qopt .mk{position:absolute;inset-inline-end:12px;top:50%;width:22px;height:22px;margin-top:-11px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:13px;font-weight:800;animation:qzPop .4s cubic-bezier(.3,1.7,.5,1) both}
.qz .qopt.ok .mk{background:var(--pg-ok)}.qz .qopt.bad .mk{background:#e5484d}
.qzfb{min-height:22px;font-size:13.5px;margin-top:6px}.qzfb>*{animation:qzUp .3s ease both}
.qzfoot{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}
.qzfoot [data-qn]{animation:qzUp .3s ease both}
.qzintro{text-align:center;padding:6px 0}
.qzmedal{font-size:64px;line-height:1;display:inline-block;animation:qzFloat 2.6s ease-in-out infinite;filter:drop-shadow(0 10px 14px rgba(0,0,0,.18))}
.qzintro h3{font-size:21px;margin:14px 0 6px}.qzintro p{font-size:14px;margin:0 auto 16px;max-width:400px}
.qzstats{display:flex;justify-content:center;gap:10px;margin:0 0 18px}
.qzstats div{border:1px solid var(--pg-line);border-radius:12px;padding:8px 14px;min-width:84px}.qzstats b{display:block;font-size:20px}.qzstats span{font-size:11.5px;color:var(--pg-muted)}
.qzgo{font-size:15px!important;padding:11px 26px!important;animation:qzGlow 2s ease-in-out infinite}
.qzres{text-align:center}
.qzring{position:relative;width:150px;height:150px;margin:6px auto 10px}
.qzring svg{transform:rotate(-90deg)}.qzring circle{fill:none;stroke-width:12}.qzring .bg{stroke:var(--pg-line)}
.qzring .fg{stroke-linecap:round;transition:stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)}
.qzring .num{position:absolute;inset:0;display:grid;place-items:center;font-size:34px;font-weight:800}
.qzring .num small{display:block;font-size:12px;font-weight:600;color:var(--pg-muted);margin-top:-22px}
.qzres h3{animation:qzUp .5s .9s ease both}.qzres .after{animation:qzUp .5s 1.1s ease both}
.qz .cert{position:relative;overflow:hidden;animation:qzFlip .9s cubic-bezier(.2,.8,.2,1) both;transform-origin:50% 0}
.qz .cert::after{content:'';position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);animation:qzShine 1.6s .9s ease both;pointer-events:none}
.qzseal{position:absolute;top:14px;inset-inline-end:14px;width:68px;height:68px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ffe58a,#f4b400 60%,#c98a00);color:#5a3d00;display:grid;place-items:center;font:800 10px/1.1 Inter,sans-serif;letter-spacing:.06em;text-align:center;box-shadow:0 0 0 4px #fff,0 0 0 6px #f4b400,0 8px 16px -6px rgba(0,0,0,.35);animation:qzStamp .6s 1s cubic-bezier(.3,1.6,.5,1) both}
@keyframes qzIn{from{opacity:0;transform:translateX(var(--qzx))}to{opacity:1;transform:none}}
@keyframes qzOut{to{opacity:0;transform:translateX(calc(var(--qzx) * -1))}}
@keyframes qzUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes qzPulse{0%{transform:scale(1)}40%{transform:scale(1.035)}100%{transform:scale(1)}}
@keyframes qzShake{0%,100%{transform:none}20%{transform:translateX(-7px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(3px)}}
@keyframes qzPop{from{transform:scale(0)}to{transform:scale(1)}}
@keyframes qzBump{0%{transform:scale(1)}50%{transform:scale(1.3)}100%{transform:scale(1)}}
@keyframes qzFloat{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-8px) rotate(4deg)}}
@keyframes qzGlow{0%,100%{box-shadow:0 0 0 0 rgba(22,119,255,.45)}50%{box-shadow:0 0 0 10px rgba(22,119,255,0)}}
@keyframes qzFlip{from{opacity:0;transform:perspective(900px) rotateX(-70deg) translateY(-20px)}to{opacity:1;transform:none}}
@keyframes qzShine{to{left:130%}}
@keyframes qzStamp{from{opacity:0;transform:scale(2.4) rotate(-30deg)}to{opacity:1;transform:scale(1) rotate(-12deg)}}
@media (prefers-reduced-motion: reduce){.qz *,.qz *::after{animation:none!important;transition:none!important}}`;document.head.appendChild(s)}

/* Konfetti */
function confetti(n=160){if(calm())return;const c=document.createElement('canvas');c.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483000';document.body.appendChild(c);
 const d=devicePixelRatio||1,W=innerWidth,H=innerHeight;c.width=W*d;c.height=H*d;const x=c.getContext('2d');x.scale(d,d);
 const col=['#1677ff','#22c55e','#f4b400','#e5484d','#a855f7','#06b6d4'];
 const P=Array.from({length:n},()=>({x:W/2+(Math.random()-.5)*W*.3,y:H*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*14-6,r:Math.random()*Math.PI,vr:(Math.random()-.5)*.4,w:6+Math.random()*6,h:8+Math.random()*8})).map((p,i)=>(p.c=col[i%col.length],p));
 const t0=performance.now();(function f(t){const k=(t-t0)/1000;x.clearRect(0,0,W,H);P.forEach(p=>{p.vy+=.35;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;x.save();x.globalAlpha=Math.max(0,1-k/3.2);x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.w/2,-p.h/2,p.w,p.h);x.restore()});
  if(k<3.3)requestAnimationFrame(f);else c.remove()})(t0)}
window.confetti=confetti;

function quiz(app){app=app||APP();const src=Q[app]||[];const total=src.length,need=passOf(total);
 const box=()=>tourEl.querySelector('.win>div');
 const shell=(inner,cls='')=>{tourEl.innerHTML=`<div class="win quiz qz ${cls}" ${GDIR()}><div>${inner}</div></div>`;return box()};
 const best=(TS.quiz||{})[app];
 const b=shell(`<div class="qzintro"><div class="qzmedal">🏅</div><h3>${esc2(GU('u.quizIntroT',courseName(app)))}</h3><p>${esc2(GU('u.quizIntroP',total,need))}</p>
  <div class="qzstats"><div><b>${total}</b><span>${GU('u.quizQs')}</span></div><div><b>${need}</b><span>${GU('u.quizNeed')}</span></div>${best&&best.t>=total?`<div><b>${best.s}</b><span>${GU('u.quizBest')}</span></div>`:''}</div>
  <div class="qzfoot" style="justify-content:center"><button class="pbtn" data-qx>${GU('u.close')}</button><button class="pbtn pri qzgo" data-go>${GU('u.quizStart')}</button></div></div>`);
 b.onclick=e=>{if(e.target.closest('[data-qx]'))tourEl.innerHTML='';if(e.target.closest('[data-go]'))run()};
 function run(){const qs=shuffle(src).map(([x])=>x);let k=0,score=0,streak=0,busy=false;
  const ask=()=>{const [q,opts]=qs[k];const order=shuffle(opts);busy=false;
   const b=shell(`<div class="qzhead"><span>${esc2(GU('u.quizQ',k+1,total))}</span><span class="sp"></span>${streak>=2?`<span class="qzchip fire" data-st>🔥 ${esc2(GU('u.quizStreak',streak))}</span>`:''}<span class="qzchip" data-sc>⭐ ${score}</span><button class="pbtn" data-qx style="padding:3px 9px;font-size:12px" aria-label="${esc2(GU('u.close'))}">✕</button></div>
    <div class="qzbar"><i style="width:${Math.round((k)/total*100)}%"></i></div>
    <div class="qzcard"><h3>${esc2(GT(q))}</h3>${order.map(([o,i],n)=>`<button class="qopt" data-qi="${i}" style="animation-delay:${120+n*80}ms">${esc2(GT(o))}</button>`).join('')}
    <div class="qzfb" aria-live="polite"></div><div class="qzfoot"></div></div>`);
   b.onclick=e=>{if(e.target.closest('[data-qx]')){tourEl.innerHTML='';return}
    const o=e.target.closest('[data-qi]');if(o&&!busy){busy=true;const right=o.dataset.qi==='0';
     b.querySelectorAll('[data-qi]').forEach(x=>{x.disabled=true;if(x.dataset.qi==='0'){x.classList.add('ok');x.insertAdjacentHTML('beforeend','<span class="mk">✓</span>')}else if(x===o){x.classList.add('bad');x.insertAdjacentHTML('beforeend','<span class="mk">✕</span>')}else x.classList.add('dim')});
     const bar=b.querySelector('.qzbar i');if(bar)bar.style.width=Math.round((k+1)/total*100)+'%';
     if(right){score++;streak++;const sc=b.querySelector('[data-sc]');sc.textContent='⭐ '+score;sc.classList.add('bump');
      if(streak>=2){let st=b.querySelector('[data-st]');if(!st){b.querySelector('[data-sc]').insertAdjacentHTML('beforebegin',`<span class="qzchip fire" data-st></span>`);st=b.querySelector('[data-st]')}st.textContent='🔥 '+GU('u.quizStreak',streak);st.classList.remove('bump');void st.offsetWidth;st.classList.add('bump')}
      b.querySelector('.qzfb').innerHTML=`<b style="color:var(--pg-ok)">${esc2(GU('u.quizRight'))}</b>`;setTimeout(next,calm()?500:950)}
     else{streak=0;const st=b.querySelector('[data-st]');if(st)st.remove();
      b.querySelector('.qzfb').innerHTML=`<span>${esc2(GU('u.quizWrong',GT(opts[0])))}</span>`;
      b.querySelector('.qzfoot').innerHTML=`<button class="pbtn pri" data-qn>${k<total-1?GU('u.quizNext'):GU('u.quizDone')}</button>`;b.querySelector('[data-qn]').focus()}
     return}
    if(e.target.closest('[data-qn]'))next()}};
  const next=()=>{const c=box()&&box().querySelector('.qzcard');if(!c)return;c.classList.add('out');setTimeout(()=>{k++;k<total?ask():result()},calm()?0:230)};
  const result=()=>{const ok=score>=need;TS.quiz=TS.quiz||{};const prev=TS.quiz[app];if(!prev||prev.t<total||score>=prev.s)TS.quiz[app]={s:score,t:total,at:new Date().toISOString().slice(0,10)};tsave();sync();
   const R=64,C=2*Math.PI*R,col=ok?'#22c55e':'#e5484d';
   const b=shell(`<div class="qzres"><div class="qzring"><svg width="150" height="150" viewBox="0 0 150 150"><circle class="bg" cx="75" cy="75" r="${R}"/><circle class="fg" cx="75" cy="75" r="${R}" stroke="${col}" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg><div class="num"><span data-cnt>0</span></div></div>
    <h3>${ok?GU('u.quizPass',score,total):GU('u.quizFail',score,total,need)}</h3>
    <div class="after">${ok?`<label style="display:block;text-align:start;font-size:12px;color:var(--pg-muted);margin-top:10px">${GU('u.certName')}<input id="certname" style="display:block;width:100%;margin-top:4px;padding:9px 11px;border:1px solid var(--pg-line);border-radius:8px;font:inherit;color:inherit;background:transparent"></label>`:''}
    <div class="qzfoot" style="justify-content:center;flex-wrap:wrap;margin-top:14px"><button class="pbtn" data-qx>${GU('u.close')}</button>${ok?`<button class="pbtn pri qzgo" data-cert>${GU('u.certMake')}</button>`:`<button class="pbtn pri" data-retry>${GU('u.quizRetry')}</button>`}</div></div></div>`);
   requestAnimationFrame(()=>requestAnimationFrame(()=>{const fg=b.querySelector('.fg');if(fg)fg.style.strokeDashoffset=C*(1-score/total)}));
   const cnt=b.querySelector('[data-cnt]');if(calm())cnt.textContent=score+'/'+total;else{const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1300);cnt.textContent=Math.round(score*(1-Math.pow(1-p,3)))+'/'+total;if(p<1)requestAnimationFrame(f)})(t0)}
   if(ok)setTimeout(()=>confetti(),900);
   if(ok)meName().then(n=>{const i=document.getElementById('certname');if(i&&!i.value)i.value=n||TS.certName||''});
   b.onclick=e=>{if(e.target.closest('[data-qx]'))tourEl.innerHTML='';if(e.target.closest('[data-retry]'))quiz(app);
    if(e.target.closest('[data-cert]')){const n=(document.getElementById('certname').value||'').trim();if(!n){document.getElementById('certname').focus();return}TS.certName=n;tsave();cert(app,n,score,total)}}};
  ask()}}
window.quiz=quiz;

function cert(app,name,s,t){const date=new Date().toISOString().slice(0,10);
 tourEl.innerHTML=`<div class="win quiz qz" ${GDIR()}><div><div class="cert" id="certcard"><div class="qzseal">${esc2(GU('u.certSeal'))}</div><div class="lg">YABIE WEBBKASSA</div><h4>${esc2(GU('u.certTitle'))}</h4><div class="nm">${esc2(name)}</div><p>${GU('u.certBody',esc2(courseName(app)),s,t)}</p><p>${esc2(GU('u.certDate'))}: ${date}</p></div>
  <div class="qzfoot" style="justify-content:center;flex-wrap:wrap"><button class="pbtn" data-qx>${GU('u.close')}</button><button class="pbtn" data-print>${GU('u.certPrint')}</button><button class="pbtn pri" data-png>${GU('u.certSave')}</button></div></div></div>`;
 setTimeout(()=>confetti(90),1000);
 tourEl.querySelector('.win>div').onclick=async e=>{if(e.target.closest('[data-qx]'))tourEl.innerHTML='';if(e.target.closest('[data-print]'))try{window.print()}catch(x){}
  if(e.target.closest('[data-png]')){const blob=await certPng(name,courseName(app),s,t,date);const fn='diplom-yabie-'+app+'.png';
   const dl=window.claude&&claude.use?await claude.use('downloads').catch(()=>null):null;
   if(dl){try{await dl.save({filename:fn,data:blob});return}catch(x){if(x&&x.code==='declined')return}}
   const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;document.body.appendChild(a);a.click();a.remove()}}}
function certPng(name,course,s,t,date){const c=document.createElement('canvas');c.width=1400;c.height=990;const x=c.getContext('2d');
 x.fillStyle='#fff';x.fillRect(0,0,1400,990);x.strokeStyle='#1f9d55';x.lineWidth=14;x.strokeRect(40,40,1320,910);x.lineWidth=2;x.strokeRect(70,70,1260,850);
 const g=x.createRadialGradient(1150,215,10,1170,235,95);g.addColorStop(0,'#ffe58a');g.addColorStop(.6,'#f4b400');g.addColorStop(1,'#c98a00');
 x.save();x.translate(1170,235);x.rotate(-.2);x.beginPath();x.arc(0,0,92,0,Math.PI*2);x.fillStyle=g;x.fill();x.lineWidth=6;x.strokeStyle='#f4b400';x.stroke();
 x.fillStyle='#5a3d00';x.textAlign='center';x.font='800 22px Inter, Arial, sans-serif';const sl=GU('u.certSeal').split(' ');sl.forEach((w,i)=>x.fillText(w,0,8+(i-(sl.length-1)/2)*26));x.restore();
 x.textAlign='center';x.fillStyle='#1f9d55';x.font='800 30px Inter, Arial, sans-serif';x.fillText('YABIE WEBBKASSA',700,190);
 x.fillStyle='#14261d';x.font='800 84px Inter, Arial, sans-serif';x.fillText(GU('u.certTitle'),700,310);
 x.font='700 64px Inter, Arial, sans-serif';x.fillText(name,700,460);x.fillStyle='#cfe9da';x.fillRect(360,490,680,3);
 x.fillStyle='#3c5146';x.font='400 32px Inter, Arial, sans-serif';const body=GU('u.certBody',course,s,t).replace(/<[^>]+>/g,'');
 const words=body.split(' ');let line='',y=580;words.forEach(w=>{const tl=line?line+' '+w:w;if(x.measureText(tl).width>1000){x.fillText(line,700,y);y+=46;line=w}else line=tl});x.fillText(line,700,y);
 x.font='400 28px Inter, Arial, sans-serif';x.fillText(GU('u.certDate')+': '+date,700,820);
 return new Promise(r=>c.toBlob(r,'image/png'))}

/* ── Inloggad användare och delad framstegslista ── */
let U=null,DB=null,UID=null;

const ready=(async()=>{if(!window.claude||!claude.use)return;try{U=await claude.use('user');DB=await claude.use('db');UID=U?await U.id():null}catch(e){}})();
const meName=async()=>{await ready;let n='';try{n=U?(await U.me()).name:''}catch(e){}return n||(window.groupMe&&window.groupMe())||''};
let lastSync='';
async function sync(){if(window.groupSync)window.groupSync();await ready;if(!DB||!UID)return;const done=Object.keys(TS.done||{}).filter(k=>TS.done[k]);const payload={done,quiz:TS.quiz||{}};const j=JSON.stringify(payload);if(j===lastSync)return;lastSync=j;
 try{await DB.doc('progress/'+UID).set({...payload,at:new Date().toISOString()})}catch(e){lastSync=''}}
ready.then(()=>sync());
const _fin=finishTour;finishTour=function(){const t=T&&T.t;_fin.apply(this,arguments);sync();
 if(t&&!t.x&&!t.hide&&CORE().every(x=>TS.done[x.id])){const box=tourEl.querySelector('.win div[style*="justify-content:center"]');if(box&&!box.querySelector('[data-quizgo]')){box.insertAdjacentHTML('afterbegin',`<button class="pbtn pri" data-quizgo>${GU('u.quizBtn')}</button>`);box.querySelector('[data-quizgo]').onclick=()=>quiz(APP())}}};

async function team(){await ready;if(!DB)return;
 tourEl.innerHTML=`<div class="win teamw" ${GDIR()}><div><h3>${GU('u.teamT')}</h3><p style="font-size:13px">${GU('u.teamP')}</p><div id="teambody">…</div><div style="text-align:right;margin-top:12px"><button class="pbtn" data-qx>${GU('u.close')}</button></div></div></div>`;
 let unsub=null;tourEl.querySelector('.win>div').onclick=e=>{if(e.target.closest('[data-qx]')){unsub&&unsub();tourEl.innerHTML=''}};
 const cnt=(done,app)=>{const core=TOURS.filter(t=>!t.x&&(t.app||'pos')===app);return `${core.filter(t=>done.includes(t.id)).length}/${core.length}`};
 unsub=DB.collection('progress').onSnapshot(async snap=>{const el=document.getElementById('teambody');if(!el)return;const rows=snap.docs.map(d=>({id:d.id,...d.data()}));
  if(!rows.length){el.innerHTML=`<p>${GU('u.teamNone')}</p>`;return}
  const ps=await U.profiles(rows.map(r=>r.id)).catch(()=>({}));rows.sort((a,b)=>String(b.at||'').localeCompare(String(a.at||'')));
  const qz=q=>['pos','bs','mob'].filter(a=>q&&q[a]).map(a=>`${a==='pos'?'iPad':a==='bs'?'BS':'Mob'} ${q[a].s}/${q[a].t}${q[a].s>=PASS?' ✓':''}`).join(', ')||'–';
  el.innerHTML=`<table class="team"><tr><th>${GU('u.teamWho')}</th><th>${GU('u.teamPos')}</th><th>${GU('u.teamBs')}</th><th>${GU('u.teamMob')}</th><th>${GU('u.teamQuiz')}</th><th>${GU('u.teamLast')}</th></tr>${rows.map(r=>`<tr><td data-nm="${esc2(r.id)}"></td><td>${cnt(r.done||[],'pos')}</td><td>${cnt(r.done||[],'bs')}</td><td>${cnt(r.done||[],'mob')}</td><td>${qz(r.quiz)}</td><td>${esc2(String(r.at||'').slice(0,10))}</td></tr>`).join('')}</table>`;
  el.querySelectorAll('[data-nm]').forEach(td=>{const p=ps[td.dataset.nm];td.textContent=(p&&p.name)||GU('u.someone')})},()=>{const el=document.getElementById('teambody');if(el)el.textContent=GU('u.teamNone')})}
window.teamView=team;

/* ── Dela en enskild guide: länk + guidekod ── */
const BASE='https://claude.ai/artifact/TBAp7BaFuo9eujwSEa9WXY';
const WEB=/claudeusercontent|claude\.ai|^$/.test(location.hostname)?(window.GWEB||''):location.origin+location.pathname.replace(/index\.html$/,'');
const linkFor=id=>WEB?(window.groupLink||(u=>u))(WEB.replace(/\/?$/,'/')+'?guide='+id):((window.GLINKS||{})[id]||BASE);
const ALPH='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const codeOf=id=>{let h=2166136261;for(const c of id){h^=c.charCodeAt(0);h=Math.imul(h,16777619)>>>0}let s='';for(let i=0;i<4;i++){s+=ALPH[h%32];h=Math.floor(h/32)}return s};
const byCode=raw=>{const c=String(raw||'').trim();const k=c.toUpperCase().replace(/[^A-Z0-9]/g,'');
 return TOURS.find(t=>!t.hide&&codeOf(t.id)===k)||TOURS.find(t=>t.id===c.toLowerCase())};
window.guideCode=codeOf;window.guideByCode=byCode;
const go=t=>{TS.appAsked=1;if(!TS.hw||TS.hwv!==2){try{TS.hw=HW.map(h=>h.id);TS.hwv=2;tsave()}catch(e){}}tsave();document.getElementById('side').classList.remove('open');tourEl.innerHTML='';setTimeout(()=>startTour(t.id),50)};
const codeForm=()=>`<form class="gcode" data-gcode><label>${GU('u.codeQ')}</label><div><input aria-label="${esc2(GU('u.codeLbl'))}" maxlength="8" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="K7Q2" dir="ltr"><button class="pbtn pri" type="submit">${GU('u.codeGo')}</button></div><small role="status" aria-live="polite"></small></form>`;
document.addEventListener('submit',e=>{const f=e.target.closest&&e.target.closest('[data-gcode]');if(!f)return;e.preventDefault();e.stopPropagation();
 const i=f.querySelector('input'),t=byCode(i.value);if(t)go(t);else{f.querySelector('small').textContent=GU('u.codeBad');i.select()}},true);
{const st=document.createElement('style');st.textContent=`.gcode{margin:4px 0 10px;padding:10px;border:1px dashed var(--pg-line);border-radius:10px;font-size:12.5px}.gcode label{display:block;margin-bottom:6px;font-weight:600}.gcode div{display:flex;gap:6px}.gcode input{flex:1;min-width:0;padding:7px 9px;border:1px solid var(--pg-line);border-radius:8px;font:600 14px ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:inherit;background:transparent}.gcode input::placeholder{opacity:.45}.gcode small{display:block;margin-top:5px;color:#c0392b;min-height:0}.gcode small:empty{display:none}.win .gcode{margin:14px 0 0}.gcodebig{font:700 30px ui-monospace,monospace;letter-spacing:.2em;text-align:center;padding:10px;border:1px solid var(--pg-line);border-radius:10px;margin:8px 0}`;document.head.appendChild(st)}
function showLink(id){const t=TOURS.find(x=>x.id===id);const url=linkFor(id);
 tourEl.innerHTML=`<div class="win quiz" ${GDIR()}><div><h3 style="font-size:17px">${GU('u.linkHere')}</h3><p style="font-size:13px"><bdi>${esc2(GT(t.title))}</bdi></p>
  <input id="glinkin" readonly value="${esc2(url)}" dir="ltr" style="width:100%;padding:8px 10px;border:1px solid var(--pg-line);border-radius:8px;font:12px ui-monospace,monospace;color:inherit;background:transparent">
  <p style="font-size:12.5px;opacity:.8;margin-top:8px">${GU('u.linkNote')}</p>
  <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button class="pbtn" data-qx>${GU('u.close')}</button><button class="pbtn pri" data-cp>${GU('u.linkCopy')}</button></div></div></div>`;
 const i=document.getElementById('glinkin');i.focus();i.select();
 tourEl.querySelector('.win>div').onclick=async e=>{if(e.target.closest('[data-qx]'))tourEl.innerHTML='';if(e.target.closest('[data-cp]')){i.select();let ok=false;try{await navigator.clipboard.writeText(url);ok=true}catch(x){try{ok=document.execCommand('copy')}catch(y){}}e.target.textContent=ok?GU('u.linkCopied'):GU('u.linkCopy')}}}
const openFromUrl=()=>{if(window.START_GUIDE){const t=TOURS.find(x=>x.id===window.START_GUIDE);if(t)setTimeout(()=>go(t),300);return}let m=(location.hash+'&'+location.search).match(/guide=([A-Za-z0-9-]+)/);if(!m)return;const t=byCode(m[1]);if(!t)return;if(window.GROUP_WAIT){window.GROUP_PENDING=t;return}setTimeout(()=>go(t),400)};
window.guideGo=go;
window.addEventListener('hashchange',openFromUrl);setTimeout(openFromUrl,300);
/* Kodrutan i välkomstdialogen (första besöket) */

/* ── Knappar i guidelistan ── */
const _list=list;list=function(){_list.apply(this,arguments);const g=document.getElementById('glist');if(!g)return;
 g.querySelectorAll('.gi[data-start]').forEach(b=>{if(!b.querySelector('.glink'))b.insertAdjacentHTML('beforeend',`<span class="glink" role="button" tabindex="0" data-glink="${b.dataset.start}" title="${esc2(GU('u.linkCopy'))}" aria-label="${esc2(GU('u.linkCopy'))}">🔗</span>`)});
 const c=g.querySelector('.course');if(c&&!c.querySelector('[data-quizopen]'))c.insertAdjacentHTML('beforeend',`<button class="pbtn" data-quizopen style="margin-top:6px">${GU('u.quizOpen')}</button>`);
 if(c&&U&&!c.querySelector('[data-team]'))U.canEdit().then(ok=>{if(ok&&DB&&!c.querySelector('[data-team]'))c.insertAdjacentHTML('beforeend',`<button class="pbtn" data-team style="margin-top:6px">${GU('u.teamBtn')}</button>`)})};
document.getElementById('glist').addEventListener('click',e=>{const l=e.target.closest('[data-glink]');if(l){e.preventDefault();e.stopPropagation();showLink(l.dataset.glink);return}
 if(e.target.closest('[data-quizopen]')){e.stopPropagation();quiz(APP());return}if(e.target.closest('[data-team]')){e.stopPropagation();team()}},true);
ready.then(()=>list());
})();
