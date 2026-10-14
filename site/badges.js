/* Nivåer, XP och märken. Räknas fram ur TS (gjorda guider, prov, övningar). */
(()=>{
const e2=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const vis=()=>TOURS.filter(t=>!t.hide);
const core=a=>vis().filter(t=>!t.x&&(t.app||'pos')===a);
const doneIds=()=>Object.keys(TS.done||{}).filter(k=>TS.done[k]&&vis().some(t=>t.id===k));
const passed=a=>{const q=(TS.quiz||{})[a];return !!q&&q.t>=25&&q.s>=Math.ceil(q.t*.8)};
const prac=()=>Object.values(TS.practice||{});

const BADGES=[
 {id:'first',ic:'🌱',test:()=>doneIds().length>=1},
 {id:'pos',ic:'🧾',test:()=>core('pos').every(t=>TS.done[t.id])},
 {id:'bs',ic:'🖥️',test:()=>core('bs').every(t=>TS.done[t.id])},
 {id:'mob',ic:'📱',test:()=>core('mob').every(t=>TS.done[t.id])},
 {id:'curious',ic:'🔍',test:()=>doneIds().filter(id=>vis().find(t=>t.id===id).x).length>=10},
 {id:'allround',ic:'🧠',test:()=>doneIds().length>=50},
 {id:'diploma',ic:'🏅',test:()=>['pos','bs','mob'].some(passed)},
 {id:'triple',ic:'🏆',test:()=>['pos','bs','mob'].every(passed)},
 {id:'perfect',ic:'💯',test:()=>Object.values(TS.quiz||{}).some(q=>q.t>=25&&q.s===q.t)},
 {id:'streak',ic:'🔥',test:()=>(TS.bestStreak||0)>=10},
 {id:'nohelp',ic:'🎯',test:()=>prac().filter(p=>p.stars===3).length>=3},
 {id:'practice',ic:'🏋️',test:()=>prac().length>=10},
];
const LEVELS=[0,100,300,700,1200,2000];
const xpOf=()=>{let x=0;doneIds().forEach(id=>{const t=vis().find(z=>z.id===id);x+=t.x?10:20});
 ['pos','bs','mob'].forEach(a=>{if(passed(a))x+=100});prac().forEach(p=>x+=(p.stars||1)*10);return x};
const levelOf=x=>{let i=0;LEVELS.forEach((v,k)=>{if(x>=v)i=k});return i};
const lvlName=i=>GU('u.lvl'+i);
const bName=b=>GU('u.b_'+b.id),bDesc=b=>GU('u.b_'+b.id+'_d');
window.BADGES=BADGES;window.xpOf=xpOf;window.levelOf=levelOf;window.lvlName=lvlName;
window.badgeIds=()=>BADGES.filter(b=>b.test()).map(b=>b.id);
window.badgeIcon=id=>(BADGES.find(b=>b.id===id)||{}).ic||'';

/* ── stil ── */
const st=document.createElement('style');st.textContent=`
.lvcard{margin:0 0 10px;padding:10px 12px;border:1px solid var(--pg-line);border-radius:12px;cursor:pointer;background:linear-gradient(135deg,color-mix(in srgb,#f4b400 10%,transparent),transparent 60%);transition:transform .15s}
.lvcard:hover{transform:translateY(-1px)}
.lvtop{display:flex;align-items:center;gap:8px;font-size:12.5px}.lvtop b{font-size:13.5px}.lvtop .lvn{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#ffd54a,#f4a100);color:#5a3d00;font-weight:800;font-size:12.5px;flex:none}
.lvxp{margin-inline-start:auto;font-size:11.5px;color:var(--pg-muted)}
.lvbar{height:6px;border-radius:99px;background:var(--pg-line);overflow:hidden;margin:8px 0 7px}.lvbar i{display:block;height:100%;background:linear-gradient(90deg,#f4b400,#ff7a1a);border-radius:99px;transition:width .8s cubic-bezier(.2,.8,.2,1)}
.lvbadges{display:flex;gap:3px;flex-wrap:wrap;font-size:15px}.lvbadges span{width:24px;height:24px;display:grid;place-items:center;border-radius:7px;background:var(--pg-panel);border:1px solid var(--pg-line)}.lvbadges .off{filter:grayscale(1);opacity:.3}
.bdgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-top:12px;max-height:56vh;overflow:auto}
.bd{border:1px solid var(--pg-line);border-radius:12px;padding:12px;text-align:center;animation:bdIn .4s cubic-bezier(.2,.8,.2,1) both}.bd .i{font-size:34px;line-height:1.2}.bd b{display:block;font-size:13px;margin-top:4px}.bd small{display:block;font-size:11.5px;color:var(--pg-muted);margin-top:3px}
.bd.off .i{filter:grayscale(1);opacity:.3}.bd.on{background:linear-gradient(160deg,color-mix(in srgb,#f4b400 14%,transparent),transparent)}
.bdtoast{position:fixed;top:18px;inset-inline-end:18px;z-index:2147482000;display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:14px;background:var(--pg-panel,#fff);color:inherit;border:1px solid var(--pg-line);box-shadow:0 18px 40px -18px rgba(0,0,0,.45);animation:bdToast 4.2s cubic-bezier(.2,.8,.2,1) both;max-width:340px}
.bdtoast .i{font-size:34px;animation:bdPop .6s .2s cubic-bezier(.3,1.7,.5,1) both}.bdtoast small{display:block;font-size:11.5px;color:var(--pg-muted)}.bdtoast b{font-size:14px}
@keyframes bdIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:none}}
@keyframes bdPop{from{transform:scale(0) rotate(-40deg)}to{transform:none}}
@keyframes bdToast{0%{opacity:0;transform:translateY(-20px) scale(.95)}8%{opacity:1;transform:none}88%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-12px)}}
@media (prefers-reduced-motion: reduce){.bd,.bdtoast,.bdtoast .i,.lvbar i{animation:none!important;transition:none!important}}`;document.head.appendChild(st);

/* ── kort i sidomenyn ── */
const card=()=>{const x=xpOf(),l=levelOf(x),lo=LEVELS[l],hi=LEVELS[l+1];const pct=hi?Math.round((x-lo)/(hi-lo)*100):100;const got=new Set(window.badgeIds());
 return `<div class="lvcard" role="button" tabindex="0" data-lv><div class="lvtop"><span class="lvn">${l+1}</span><b>${e2(lvlName(l))}</b><span class="lvxp">${hi?`${x} / ${hi} XP`:`${x} XP`}</span></div><div class="lvbar"><i style="width:${pct}%"></i></div><div class="lvbadges">${BADGES.map(b=>`<span class="${got.has(b.id)?'':'off'}" title="${e2(bName(b))}">${b.ic}</span>`).join('')}</div></div>`};
const _list=list;list=function(){_list.apply(this,arguments);const g=document.getElementById('glist');if(!g||g.querySelector('.lvcard'))return;
 const gc=g.querySelector('.asgcard')||g.querySelector('.grpcard');if(gc)gc.insertAdjacentHTML('afterend',card());else g.insertAdjacentHTML('afterbegin',card());check()};
document.getElementById('glist').addEventListener('click',e=>{if(e.target.closest('[data-lv]')){e.stopPropagation();dialog()}},true);
document.getElementById('glist').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.closest('[data-lv]'))dialog()});

function dialog(){const x=xpOf(),l=levelOf(x),got=new Set(window.badgeIds());const at=TS.badges||{};
 tourEl.innerHTML=`<div class="win quiz qz" ${GDIR()}><div style="max-width:620px;width:calc(100vw - 32px)"><div class="lvtop" style="font-size:14px"><span class="lvn" style="width:34px;height:34px;font-size:15px">${l+1}</span><div><b style="font-size:17px">${e2(lvlName(l))}</b><div style="font-size:12px;color:var(--pg-muted)">${GU('u.lvXp',x)}${LEVELS[l+1]?' · '+GU('u.lvNext',LEVELS[l+1]-x,lvlName(l+1)):''}</div></div></div>
  <p style="font-size:12.5px;margin:10px 0 0">${GU('u.lvHow')}</p>
  <div class="bdgrid">${BADGES.map((b,i)=>`<div class="bd ${got.has(b.id)?'on':'off'}" style="animation-delay:${i*40}ms"><div class="i">${b.ic}</div><b>${e2(bName(b))}</b><small>${e2(bDesc(b))}</small>${at[b.id]?`<small>✓ ${e2(at[b.id])}</small>`:''}</div>`).join('')}</div>
  <div class="qzfoot"><button class="pbtn pri" data-qx>${GU('u.close')}</button></div></div></div>`;
 tourEl.querySelector('.win>div').onclick=e=>{if(e.target.closest('[data-qx]'))tourEl.innerHTML=''}}
window.badgesDialog=dialog;

/* ── nya märken och nivåer ── */
const q=[];let busy=false;
function toast(ic,title,sub){q.push([ic,title,sub]);if(!busy)nextToast()}
function nextToast(){const it=q.shift();if(!it){busy=false;return}busy=true;const d=document.createElement('div');d.className='bdtoast';d.setAttribute('role','status');
 d.innerHTML=`<span class="i">${it[0]}</span><div><small>${e2(it[2])}</small><b>${e2(it[1])}</b></div>`;document.body.appendChild(d);window.confetti&&confetti(60);
 setTimeout(()=>{d.remove();nextToast()},4300)}
function check(){const ids=window.badgeIds(),x=xpOf(),l=levelOf(x);
 if(!TS.badges){TS.badges={};ids.forEach(i=>TS.badges[i]=new Date().toISOString().slice(0,10));TS.level=l;tsave();return}
 let ch=false;ids.forEach(i=>{if(!TS.badges[i]){TS.badges[i]=new Date().toISOString().slice(0,10);ch=true;const b=BADGES.find(z=>z.id===i);toast(b.ic,bName(b),GU('u.bNew'))}});
 if((TS.level||0)<l){TS.level=l;ch=true;toast('⭐',lvlName(l),GU('u.lvUp',l+1))}
 if(ch){tsave();window.groupSync&&groupSync()}}
window.badgeCheck=check;
})();
