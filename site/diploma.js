/* Diplomvisning efter provet, i tre scener:
   1) rutnät med 25 frågor som fylls i medan poängen räknas upp
   2) "Grattis" med GODKÄND-stämpel, ring, konfetti och en handritad linje
   3) diplomkortet glider upp, stämpeln flyttar in i hörnet och texten tonar fram */
(()=>{
const e2=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const calm=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(x){return false}};
const shortCourse=s=>String(s).replace(/^[^:：]{1,40}[:：]\s*/,'');
const first=n=>String(n||'').trim().split(/\s+/)[0]||'';
{const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap';document.head.appendChild(l)}
const st=document.createElement('style');st.textContent=`
.dip{--cream:#fdf0dd;--mint:#7ff0b5;--mintd:#5fdc9c;--ink:#111312;--soft:#5d625f;--yel:#f8d35b;position:fixed;inset:0;z-index:2147481000;background:var(--cream);color:var(--ink);font-family:'DM Sans',Inter,system-ui,sans-serif;overflow:hidden;animation:dipFade .35s ease both}
.dip *{box-sizing:border-box}
.dip .dp-sc{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:6vh 6vw;transition:opacity .45s ease,transform .6s cubic-bezier(.2,.8,.2,1)}
.dip .dp-sc.dp-hide{opacity:0;pointer-events:none}
.dip .dp-cap{font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
.dip .dp-s1{gap:clamp(24px,7vw,120px)}
.dip .dp-s1 .dp-l{min-width:min(340px,40vw)}
.dip .dp-s1 h2{max-width:6.6em;font-size:clamp(30px,4.4vw,58px);line-height:1.02;font-weight:800;letter-spacing:-.02em;margin:.25em 0 .35em}
.dip .dp-cnt{display:flex;align-items:baseline;gap:14px}.dip .dp-cnt b{font-size:clamp(64px,9vw,128px);line-height:.9;font-weight:800;letter-spacing:-.03em;font-variant-numeric:tabular-nums;min-width:1.2em}.dip .dp-cnt span{font-size:14px;color:var(--soft)}
.dip .dp-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:clamp(6px,.8vw,12px);width:min(330px,46vw)}
.dip .dp-cell{aspect-ratio:1;border-radius:6px;background:rgba(0,0,0,.025);border:1.5px solid rgba(0,0,0,.06);display:grid;place-items:center;transition:background .2s,border-color .2s,transform .25s cubic-bezier(.3,1.6,.5,1)}
.dip .dp-cell.dp-ok{background:var(--mint);border-color:var(--mint);transform:scale(1.06)}.dip .dp-cell.dp-no{background:var(--yel);border-color:var(--yel);transform:scale(1.06)}.dip .dp-cell.dp-set{transform:none}
.dip .dp-cell svg{width:58%;height:58%}.dip .dp-cell path{fill:none;stroke:var(--ink);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:30;stroke-dashoffset:30;transition:stroke-dashoffset .28s ease .05s}.dip .dp-cell.dp-ok path,.dip .dp-cell.dp-no path{stroke-dashoffset:0}
.dip .dp-s2{justify-content:flex-start}.dip .dp-s2 .dp-w{position:relative;width:min(760px,88vw);margin:0 auto}
.dip .dp-s2 h2{font-size:clamp(34px,5vw,64px);font-weight:800;letter-spacing:-.02em;margin:.2em 0 .1em;opacity:0;transform:translateY(14px);transition:.5s cubic-bezier(.2,.8,.2,1)}
.dip .dp-s2 p{font-size:clamp(13px,1.3vw,16px);color:var(--soft);margin:0;opacity:0;transition:.5s .15s}
.dip .dp-s2 .dp-cap{opacity:0;transition:.4s}
.dip .dp-s2.dp-in h2,.dip .dp-s2.dp-in p,.dip .dp-s2.dp-in .dp-cap{opacity:1;transform:none}
.dip .dp-line{position:absolute;left:0;bottom:-46px;width:100%;height:60px;overflow:visible}.dip .dp-line path{fill:none;stroke:var(--mintd);stroke-width:4;stroke-linecap:round;stroke-dasharray:1400;stroke-dashoffset:1400}
.dip .dp-s2.dp-draw .dp-line path{transition:stroke-dashoffset 1.1s cubic-bezier(.6,.1,.3,1);stroke-dashoffset:0}
.dip .dp-stamp{position:absolute;width:clamp(110px,13vw,170px);aspect-ratio:1;border-radius:50%;background:var(--mint);display:grid;place-items:center;box-shadow:0 14px 30px -14px rgba(0,0,0,.35);z-index:3;will-change:transform}
.dip .dp-stamp::before{content:'';position:absolute;inset:9%;border-radius:50%;border:2px solid var(--ink)}
.dip .dp-stamp span{font-weight:800;font-size:clamp(15px,1.8vw,23px);letter-spacing:.02em;transform:rotate(-12deg)}
.dip .dp-stamp.dp-slam{animation:dipSlam .55s cubic-bezier(.3,1.4,.5,1) both}
.dip .dp-ring{position:absolute;border-radius:50%;border:3px solid var(--mint);pointer-events:none;animation:dipRing .9s ease-out both}
.dip .dp-s3 .dp-card{position:relative;width:min(640px,90vw);background:#fff;border-radius:14px;box-shadow:0 30px 60px -30px rgba(70,40,0,.35),0 2px 6px rgba(0,0,0,.04);padding:clamp(24px,4vw,44px);transform:translateY(110vh);transition:transform .9s cubic-bezier(.2,.85,.25,1)}
.dip .dp-s3.dp-in .dp-card{transform:none}
.dip .dp-card .dp-stamp{position:absolute;top:clamp(16px,2.4vw,26px);inset-inline-end:clamp(16px,2.4vw,26px);width:clamp(76px,9vw,96px)}.dip .dp-card .dp-stamp span{font-size:clamp(11px,1.2vw,14px)}
.dip .dp-card .dp-stamp.dp-ghost{visibility:hidden}
.dip .dp-card h3{font-size:clamp(34px,5vw,52px);font-weight:800;letter-spacing:-.02em;margin:.15em 0 .1em}
.dip .dp-card .dp-nm{position:relative;display:inline-block;font-size:clamp(24px,3.3vw,34px);font-weight:700;margin:0 0 .6em}
.dip .dp-card .dp-nm svg{position:absolute;left:-2%;bottom:-.35em;width:106%;height:.5em;overflow:visible}.dip .dp-card .dp-nm path{fill:none;stroke:var(--mintd);stroke-width:4;stroke-linecap:round;stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset .8s cubic-bezier(.6,.1,.3,1)}
.dip .dp-card .dp-bd{font-size:clamp(13px,1.5vw,16px);color:#3d423f;line-height:1.45;max-width:46ch;margin:0 0 1.8em}
.dip .dp-card .dp-dt{font-size:13px;font-weight:700}
.dip .dp-card .dp-rv{opacity:0;transform:translateY(8px);transition:opacity .45s ease,transform .45s ease}.dip .dp-card .dp-rv.dp-on{opacity:1;transform:none}
.dip .dp-card .dp-nm.dp-on path{stroke-dashoffset:0}
.dip .dp-acts{position:absolute;left:0;right:0;bottom:4vh;display:flex;justify-content:center;gap:10px;flex-wrap:wrap;opacity:0;transform:translateY(10px);transition:.5s}
.dip .dp-acts.dp-on{opacity:1;transform:none}
.dip .dp-acts button{font:600 14px 'DM Sans',Inter,sans-serif;border-radius:999px;padding:11px 20px;border:1.5px solid var(--ink);background:transparent;color:var(--ink);cursor:pointer}.dip .dp-acts button.dp-pri{background:var(--ink);color:#fff}
.dip .dp-skip{position:absolute;top:16px;inset-inline-end:16px;font:600 13px 'DM Sans',Inter,sans-serif;background:rgba(0,0,0,.06);border:0;border-radius:999px;padding:8px 14px;color:var(--ink);cursor:pointer;z-index:5}
.dip .dp-ask{background:#fff;border-radius:14px;padding:26px;width:min(420px,90vw);box-shadow:0 30px 60px -30px rgba(70,40,0,.35)}.dip .dp-ask h3{margin:0 0 6px;font-size:22px}.dip .dp-ask input{width:100%;font:500 16px 'DM Sans',Inter,sans-serif;padding:11px 13px;border:1.5px solid #ddd;border-radius:10px;margin:12px 0}
.dip .dp-fail{text-align:center;max-width:520px}.dip .dp-fail h2{font-size:clamp(30px,4vw,48px);margin:0 0 10px}.dip .dp-fail p{color:var(--soft)}
.dip canvas.dp-cf{position:absolute;inset:0;pointer-events:none;z-index:4}
@keyframes dipFade{from{opacity:0}to{opacity:1}}
@keyframes dipSlam{0%{opacity:0;transform:scale(2.6) rotate(-25deg)}60%{opacity:1;transform:scale(.92) rotate(4deg)}100%{opacity:1;transform:none}}
@keyframes dipRing{from{opacity:.9;transform:scale(.7)}to{opacity:0;transform:scale(1.9)}}
@media (max-width:700px){.dip .dp-s2 .dp-stamp{top:auto!important;bottom:-190px;inset-inline-end:8%!important}.dip .dp-s2 .dp-line{bottom:-34px}.dip .dp-s1{flex-direction:column;align-items:flex-start;gap:22px}.dip .dp-grid{width:min(300px,80vw)}.dip .dp-s1 .dp-l{min-width:0}}
@media print{body>*:not(.dip){display:none!important}.dip{position:static;background:#fff}.dip .dp-sc:not(.dp-s3),.dip .dp-acts,.dip .dp-skip,.dip canvas{display:none!important}.dip .dp-s3{position:static;padding:0}.dip .dp-s3 .dp-card{box-shadow:none;border:1px solid #ddd;transform:none}.dip .dp-card .dp-rv{opacity:1;transform:none}.dip .dp-card .dp-nm path{stroke-dashoffset:0}}
@media (prefers-reduced-motion: reduce){.dip *,.dip{animation:none!important;transition:none!important}}`;document.head.appendChild(st);

const CHECK='<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',CROSS='<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg>';
const LINE='M0 30 C 120 34, 260 26, 420 30 S 640 34, 680 26 C 700 18, 690 4, 678 6 C 664 9, 668 28, 690 32 C 720 36, 760 30, 800 30';

function confettiIn(root,n=120){if(calm())return;const c=document.createElement('canvas');c.className='dp-cf';root.appendChild(c);const d=devicePixelRatio||1,W=root.clientWidth,H=root.clientHeight;c.width=W*d;c.height=H*d;const x=c.getContext('2d');x.scale(d,d);
 const col=['#7ff0b5','#f8d35b','#ff9a62','#111312','#5fdc9c'];const s=root.querySelector('.dp-s3.dp-in .dp-card .dp-stamp')||root.querySelector('.dp-s2 .dp-stamp');const r=s?s.getBoundingClientRect():{left:W/2,top:H/2,width:0,height:0};const cx=r.left+r.width/2,cy=r.top+r.height/2;
 const P=Array.from({length:n},(_,i)=>{const a=Math.random()*Math.PI*2,v=4+Math.random()*9;return{x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v-3,r:Math.random()*6,vr:(Math.random()-.5)*.4,w:3+Math.random()*4,h:6+Math.random()*7,c:col[i%col.length]}});
 const t0=performance.now();(function f(t){const k=(t-t0)/1000;x.clearRect(0,0,W,H);P.forEach(p=>{p.vy+=.18;p.vx*=.985;p.vy*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;x.save();x.globalAlpha=Math.max(0,1-k/4);x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.w/2,-p.h/2,p.w,p.h);x.restore()});if(k<4&&c.isConnected)requestAnimationFrame(f);else c.remove()})(t0)}

function show(o){/* o:{app,course,answers[bool],score,total,need,name,date,onRetry,onClose,instant} */
 const passed=o.score>=o.need;const old=document.querySelector('.dip');if(old)old.remove();
 const D=document.createElement('div');D.className='dip';D.setAttribute('role','dialog');D.setAttribute('aria-modal','true');D.setAttribute('dir',TS.lang==='ar'||TS.lang==='ur'?'rtl':'ltr');
 const ans=o.answers&&o.answers.length===o.total?o.answers:Array.from({length:o.total},(_,i)=>i<o.score);
 D.innerHTML=`<button class="dp-skip" data-skip>${GU('u.dipSkip')} →</button>
  <section class="dp-sc dp-s1"><div class="dp-l"><div class="dp-cap">${e2(GU('u.dipLabel'))}</div><h2>${e2(shortCourse(o.course))}</h2><div class="dp-cnt"><b data-n>0</b><span>${e2(GU('u.dipOf',o.total))}</span></div></div>
   <div class="dp-grid">${ans.map(()=>`<div class="dp-cell"></div>`).join('')}</div></section>
  <section class="dp-sc dp-s2 dp-hide"><div class="dp-w"><div class="dp-cap">${e2(GU('u.dipRight',o.score,o.total))}</div><h2>${e2(GU('u.dipHi',first(o.name)))}</h2><p>${e2(GU('u.dipSub'))}</p>
   <svg class="dp-line" viewBox="0 0 800 60" preserveAspectRatio="none"><path d="${LINE}"/></svg><div class="dp-stamp" style="inset-inline-end:-2%;top:-10%;opacity:0"><span>${e2(GU('u.certSeal'))}</span></div></div></section>
  <section class="dp-sc dp-s3 dp-hide"><div class="dp-card" id="dipcard"><div class="dp-stamp dp-ghost"><span>${e2(GU('u.certSeal'))}</span></div>
   <div class="dp-cap dp-rv">YABIE WEBBKASSA</div><h3 class="dp-rv">${e2(GU('u.certTitle'))}</h3><div class="dp-nm dp-rv"><span>${e2(o.name)}</span><svg viewBox="0 0 300 20" preserveAspectRatio="none"><path d="M2 12 C 60 6, 140 16, 210 10 S 290 8, 298 11"/></svg></div>
   <p class="dp-bd dp-rv">${GU('u.certBody',e2(o.course),o.score,o.total)}</p><div class="dp-dt dp-rv">${e2(GU('u.certDate'))}: ${e2(o.date)}</div></div></section>
  <div class="dp-acts">${passed?`<button data-dx>${GU('u.close')}</button><button data-replay>↻ ${GU('u.dipReplay')}</button><button data-print>${GU('u.certPrint')}</button><button class="dp-pri" data-png>${GU('u.certSave')}</button>`:`<button data-dx>${GU('u.close')}</button><button class="dp-pri" data-retry>${GU('u.quizRetry')}</button>`}</div>`;
 document.body.appendChild(D);
 const $=s=>D.querySelector(s),$$=s=>[...D.querySelectorAll(s)];
 const timers=[];const at=(ms,f)=>timers.push(setTimeout(f,ms));const clear=()=>{timers.forEach(clearTimeout);timers.length=0};
 const cells=$$('.dp-cell'),n=$('[data-n]');
 const fillCell=(i,set)=>{const c=cells[i];c.classList.add(ans[i]?'dp-ok':'dp-no');c.innerHTML=ans[i]?CHECK:CROSS;if(set)c.classList.add('dp-set');else setTimeout(()=>c.classList.add('dp-set'),260)};
 const finalS1=()=>{cells.forEach((c,i)=>{if(!c.classList.contains('dp-ok')&&!c.classList.contains('dp-no'))fillCell(i,true)});n.textContent=o.score};
 const s2in=()=>{$('.dp-s1').classList.add('dp-hide');$('.dp-s2').classList.remove('dp-hide');requestAnimationFrame(()=>$('.dp-s2').classList.add('dp-in'))};
 const slam=()=>{const s=$('.dp-s2 .dp-stamp');s.style.opacity='';s.classList.add('dp-slam');const w=$('.dp-s2 .dp-w');const sw=s.offsetWidth,sl=s.offsetLeft,stp=s.offsetTop;
  [0,140].forEach(d=>setTimeout(()=>{const g=document.createElement('div');g.className='dp-ring';g.style.cssText=`left:${sl-sw*.15}px;top:${stp-sw*.15}px;width:${sw*1.3}px;height:${sw*1.3}px`;w.appendChild(g);setTimeout(()=>g.remove(),1000)},d+280));
  setTimeout(()=>confettiIn(D,140),300)};
 const toCard=(instant)=>{const s3=$('.dp-s3');s3.classList.remove('dp-hide');const big=$('.dp-s2 .dp-stamp'),ghost=$('.dp-card .dp-stamp');
  if(instant){$('.dp-s1').classList.add('dp-hide');$('.dp-s2').classList.add('dp-hide');s3.classList.add('dp-in');ghost.classList.remove('dp-ghost');big.style.opacity=0;$$('.dp-card .dp-rv').forEach(x=>x.classList.add('dp-on'));$('.dp-acts').classList.add('dp-on');$('.dp-skip').remove();return}
  requestAnimationFrame(()=>{s3.classList.add('dp-in');$('.dp-s2 h2').style.opacity=0;$('.dp-s2 p').style.opacity=0;$('.dp-s2 .dp-cap').style.opacity=0;$('.dp-s2 .dp-line').style.opacity=0;$('.dp-s2 .dp-line').style.transition='opacity .3s'});
  setTimeout(()=>{const a=big.getBoundingClientRect(),b=ghost.getBoundingClientRect();big.classList.remove('dp-slam');big.style.transition='transform .7s cubic-bezier(.5,0,.2,1)';big.style.transformOrigin='0 0';
   big.style.transform=`translate(${b.left-a.left}px,${b.top-a.top}px) scale(${b.width/a.width})`;setTimeout(()=>{ghost.classList.remove('dp-ghost');big.style.opacity=0},720)},650)};
 const reveal=()=>{const r=$$('.dp-card .dp-rv');r.forEach((x,i)=>setTimeout(()=>x.classList.add('dp-on'),i*260));setTimeout(()=>{$('.dp-acts').classList.add('dp-on');const sk=$('.dp-skip');if(sk)sk.remove()},r.length*260+300)};
 const failEnd=()=>{const s1=$('.dp-s1');s1.classList.add('dp-hide');const f=document.createElement('section');f.className='dp-sc dp-s4';f.innerHTML=`<div class="dp-fail"><div class="dp-cap">${e2(GU('u.dipRight',o.score,o.total))}</div><h2>${e2(GU('u.dipAlmost'))}</h2><p>${e2(GU('u.quizFail',o.score,o.total,o.need))}</p></div>`;D.insertBefore(f,$('.dp-acts'));$('.dp-acts').classList.add('dp-on');const sk=$('.dp-skip');if(sk)sk.remove()};
 function end(){clear();finalS1();if(passed)toCard(true);else failEnd()}
 function play(){if(o.instant||calm()){end();return}
  const step=Math.min(150,3300/o.total);
  ans.forEach((ok,i)=>at(500+i*step,()=>{fillCell(i);n.textContent=ans.slice(0,i+1).filter(Boolean).length}));
  const t1=500+o.total*step+700;
  if(!passed){at(t1,failEnd);return}
  at(t1,s2in);at(t1+450,slam);at(t1+900,()=>$('.dp-s2').classList.add('dp-draw'));at(t1+2600,()=>toCard(false));at(t1+3700,reveal);at(t1+3700+260*5+400,()=>confettiIn(D,50))}
 D.addEventListener('click',async ev=>{const b=ev.target.closest('button');if(!b)return;
  if('skip' in b.dataset){end();return}
  if('dx' in b.dataset){clear();D.remove();o.onClose&&o.onClose();return}
  if('retry' in b.dataset){clear();D.remove();o.onRetry&&o.onRetry();return}
  if('replay' in b.dataset){clear();D.remove();show({...o,instant:false});return}
  if('print' in b.dataset){try{window.print()}catch(x){}return}
  if('png' in b.dataset){const blob=await png(o);const fn='diplom-yabie-'+o.app+'.png';const dl=window.claude&&claude.use?await claude.use('downloads').catch(()=>null):null;
   if(dl){try{await dl.save({filename:fn,data:blob});return}catch(x){if(x&&x.code==='declined')return}}
   const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;document.body.appendChild(a);a.click();a.remove()}});
 D.addEventListener('keydown',ev=>{if(ev.key==='Escape'){clear();D.remove();o.onClose&&o.onClose()}});
 setTimeout(()=>{(D.querySelector('.dp-skip')||D.querySelector('.dp-acts button')).focus()},50);
 (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(play)}

/* Namnfråga i samma stil, om namnet inte redan är känt */
function askName(def,cb){const D=document.createElement('div');D.className='dip';D.innerHTML=`<section class="dp-sc"><div class="dp-ask"><div class="dp-cap" style="color:#5d625f">${e2(GU('u.dipLabel'))}</div><h3>${e2(GU('u.dipName'))}</h3><input id="dipname" autocomplete="name" value="${e2(def||'')}"><div style="display:flex;justify-content:flex-end"><button class="pbtn pri" data-ok style="border-radius:999px;padding:10px 20px">${GU('u.certMake')}</button></div></div></section>`;
 document.body.appendChild(D);const i=D.querySelector('#dipname');i.focus();i.select();
 const go=()=>{const v=i.value.trim();if(!v){i.focus();return}D.remove();cb(v)};i.onkeydown=e=>{if(e.key==='Enter')go()};D.querySelector('[data-ok]').onclick=go}

/* Bild att spara: samma utseende som kortet */
async function png(o){try{await document.fonts.load('800 40px "DM Sans"');await document.fonts.load('400 20px "DM Sans"')}catch(x){}
 const F='"DM Sans", Inter, Arial, sans-serif',W=1600,H=1100,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 x.fillStyle='#fdf0dd';x.fillRect(0,0,W,H);
 const cx=160,cy=150,cw=1280,ch=800,r=28;x.save();x.shadowColor='rgba(70,40,0,.22)';x.shadowBlur=60;x.shadowOffsetY=24;x.fillStyle='#fff';x.beginPath();x.roundRect?x.roundRect(cx,cy,cw,ch,r):x.rect(cx,cy,cw,ch);x.fill();x.restore();
 const rtl=TS.lang==='ar'||TS.lang==='ur';x.direction=rtl?'rtl':'ltr';x.textAlign=rtl?'right':'left';const L=rtl?cx+cw-90:cx+90;
 x.fillStyle='#111312';x.font=`800 22px ${F}`;x.fillText('YABIE WEBBKASSA',L,cy+110);
 x.font=`800 96px ${F}`;x.fillText(GU('u.certTitle'),L,cy+215);
 x.font=`700 64px ${F}`;x.fillText(o.name,L,cy+320);const nw=x.measureText(o.name).width;
 x.strokeStyle='#5fdc9c';x.lineWidth=8;x.lineCap='round';x.beginPath();const ux=rtl?L-nw-10:L-6,uy=cy+350;x.moveTo(ux,uy);x.bezierCurveTo(ux+nw*.25,uy-10,ux+nw*.55,uy+8,ux+nw*.75,uy-2);x.quadraticCurveTo(ux+nw*.95,uy-6,ux+nw+16,uy);x.stroke();
 x.fillStyle='#3d423f';x.font=`400 32px ${F}`;const body=GU('u.certBody',o.course,o.score,o.total).replace(/<[^>]+>/g,'');let line='',y=cy+450;
 body.split(' ').forEach(w=>{const t=line?line+' '+w:w;if(x.measureText(t).width>900){x.fillText(line,L,y);y+=46;line=w}else line=t});x.fillText(line,L,y);
 x.fillStyle='#111312';x.font=`700 26px ${F}`;x.fillText(GU('u.certDate')+': '+o.date,L,cy+ch-90);
 const sx=rtl?cx+150:cx+cw-150,sy=cy+150,sr=96;x.save();x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=24;x.shadowOffsetY=10;x.fillStyle='#7ff0b5';x.beginPath();x.arc(sx,sy,sr,0,Math.PI*2);x.fill();x.restore();
 x.strokeStyle='#111312';x.lineWidth=3;x.beginPath();x.arc(sx,sy,sr*.82,0,Math.PI*2);x.stroke();
 x.save();x.translate(sx,sy);x.rotate(-.21);x.fillStyle='#111312';x.textAlign='center';x.direction='ltr';x.font=`800 30px ${F}`;x.textBaseline='middle';x.fillText(GU('u.certSeal'),0,0);x.restore();
 return new Promise(r=>c.toBlob(r,'image/png'))}

window.diplomaShow=(o)=>{const need=o.need??Math.ceil(o.total*.8);const date=o.date||new Date().toISOString().slice(0,10);
 if(o.score>=need&&!o.name){askName(o.defName||'',name=>{TS.certName=name;tsave();show({...o,need,date,name})});return}
 show({...o,need,date})};
})();
