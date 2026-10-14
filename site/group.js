/* Grupper: en chef skapar en grupp och skickar länken till personalen.
   Personalen skriver sitt namn och deras framsteg syns för chefen.
   Kräver servern i netlify/functions/api.mjs, så det är avstängt i claude.ai. */
(()=>{
if(/claudeusercontent|claude\.ai/.test(location.hostname)||location.protocol==='file:')return;
const API='/api/groups',LS='kassaskolan-group';
const ALPH='abcdefghjkmnpqrstuvwxyz23456789';
const rand=n=>Array.from(crypto.getRandomValues(new Uint8Array(n)),x=>ALPH[x%ALPH.length]).join('');
const e2=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let G=null;try{G=JSON.parse(localStorage.getItem(LS)||'null')}catch(e){}
const save=()=>{try{G?localStorage.setItem(LS,JSON.stringify(G)):localStorage.removeItem(LS)}catch(e){}};
const q=new URLSearchParams(location.search),urlG=q.get('g'),urlKey=q.get('admin');
if(urlG&&/^[a-z0-9]{6,32}$/.test(urlG)&&(!G||G.id!==urlG))G={id:urlG,name:'',mid:rand(16),me:''};
if(G&&urlKey&&G.id===urlG)G.key=urlKey;
if(G&&!G.mid)G.mid=rand(16);
save();
if(G&&!G.me&&!G.key)window.GROUP_WAIT=true;

const base=()=>location.origin+'/';
const staffLink=()=>base()+'?g='+G.id;
const adminLink=()=>base()+'?g='+G.id+'&admin='+G.key;
window.groupMe=()=>G&&G.me;
window.groupLink=u=>G?u+(u.includes('?')?'&':'?')+'g='+G.id:u;
const api=async(path,opt={})=>{const h={'content-type':'application/json'};if(G&&G.key)h['x-admin-key']=G.key;
 const r=await fetch(API+path,{...opt,headers:h});let b={};try{b=await r.json()}catch(e){}if(!r.ok){const err=new Error(b.error||'http_'+r.status);err.status=r.status;throw err}return b};

/* ── Spara framsteg ── */
let timer=null,last='';
window.groupSync=()=>{if(!G||!G.me)return;clearTimeout(timer);timer=setTimeout(async()=>{
 const done=Object.keys(TS.done||{}).filter(k=>TS.done[k]);const body=JSON.stringify({name:G.me,done,quiz:TS.quiz||{}});if(body===last)return;
 try{await api('/'+G.id+'/members/'+G.mid,{method:'PUT',body});last=body}catch(e){if(e.status===404){G=null;save();list()}}},600)};

/* ── Dialoger ── */
const win=(html,cls='')=>{tourEl.innerHTML=`<div class="win quiz ${cls}" ${GDIR()}><div>${html}</div></div>`;return tourEl.querySelector('.win>div')};
const close=()=>{tourEl.innerHTML=''};
const field='width:100%;padding:9px 11px;border:1px solid var(--pg-line);border-radius:8px;font:inherit;color:inherit;background:transparent';
const copyBtn=async(btn,text)=>{let ok=false;try{await navigator.clipboard.writeText(text);ok=true}catch(x){}btn.textContent=ok?GU('u.copied'):GU('u.copy');setTimeout(()=>{btn.textContent=GU('u.copy')},1800)};
const linkRow=(label,url,id)=>`<label style="display:block;font-size:12.5px;font-weight:600;margin:12px 0 5px">${label}</label><div style="display:flex;gap:6px"><input readonly dir="ltr" value="${e2(url)}" style="${field};font:12px ui-monospace,monospace" id="${id}"><button class="pbtn" data-copy="${id}">${GU('u.copy')}</button></div>`;

function createDlg(){const w=win(`<h3 style="font-size:17px">${GU('u.grpCreateT')}</h3><p style="font-size:13px">${GU('u.grpCreateP')}</p>
 <label style="display:block;font-size:12.5px;font-weight:600;margin:12px 0 5px" for="grpname">${GU('u.grpNameL')}</label><input id="grpname" maxlength="80" style="${field}" placeholder="Kaffebaren">
 <small role="status" style="display:block;color:#c0392b;margin-top:6px"></small>
 <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px"><button class="pbtn" data-x>${GU('u.cancel')}</button><button class="pbtn pri" data-ok>${GU('u.grpCreateBtn')}</button></div>`);
 const i=w.querySelector('#grpname');i.focus();
 const go=async()=>{const name=i.value.trim();if(!name){i.focus();return}const b=w.querySelector('[data-ok]');b.disabled=true;
  try{const r=await api('',{method:'POST',body:JSON.stringify({name})});G={id:r.id,key:r.key,name:r.name,mid:rand(16),me:''};save();
   history.replaceState(null,'',adminLink());list();madeDlg()}catch(e){b.disabled=false;w.querySelector('small').textContent=GU('u.grpErr')}};
 i.onkeydown=e=>{if(e.key==='Enter')go()};w.onclick=e=>{if(e.target.closest('[data-x]'))close();if(e.target.closest('[data-ok]'))go()}}

function linksHtml(){return linkRow(GU('u.grpStaffL'),staffLink(),'grpl1')+(G.key?linkRow(GU('u.grpAdminL'),adminLink(),'grpl2')+`<p style="font-size:12px;opacity:.75;margin-top:6px">${GU('u.grpAdminP')}</p>`:'')}
function wireCopy(w){w.addEventListener('click',e=>{const b=e.target.closest('[data-copy]');if(b){const i=document.getElementById(b.dataset.copy);i.select();copyBtn(b,i.value)}})}
function madeDlg(){const w=win(`<h3 style="font-size:17px">${GU('u.grpMade')}</h3><p style="font-size:13px"><b>${e2(G.name)}</b></p>${linksHtml()}
 <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button class="pbtn" data-x>${GU('u.close')}</button><button class="pbtn pri" data-dash>${GU('u.grpProgress')}</button></div>`);
 wireCopy(w);w.addEventListener('click',e=>{if(e.target.closest('[data-x]'))close();if(e.target.closest('[data-dash]'))dash()})}

function nameDlg(rename){const w=win(`<h3 style="font-size:17px">${GU('u.grpWelcomeT',e2(G.name||''))}</h3><p style="font-size:13px">${GU('u.grpWelcomeP')}</p>
 <label style="display:block;font-size:12.5px;font-weight:600;margin:12px 0 5px" for="grpme">${GU('u.grpYourName')}</label><input id="grpme" maxlength="60" autocomplete="name" style="${field}" value="${e2(G.me||'')}">
 <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px">${rename?`<button class="pbtn" data-x>${GU('u.cancel')}</button>`:''}<button class="pbtn pri" data-ok>${GU('u.grpGo')}</button></div>`);
 const i=w.querySelector('#grpme');i.focus();
 const go=()=>{const v=i.value.trim();if(!v){i.focus();return}G.me=v;save();last='';window.groupSync();close();list();
  if(window.GROUP_WAIT){window.GROUP_WAIT=false;const t=window.GROUP_PENDING;window.GROUP_PENDING=null;if(t&&window.guideGo)window.guideGo(t)}};
 i.onkeydown=e=>{if(e.key==='Enter')go()};w.onclick=e=>{if(e.target.closest('[data-x]'))close();if(e.target.closest('[data-ok]'))go()}}

/* ── Chefens översikt ── */
const coreOf=app=>TOURS.filter(t=>!t.x&&!t.hide&&(t.app||'pos')===app);
const extras=()=>TOURS.filter(t=>t.x&&!t.hide);
const bar=(n,tot)=>`<div class="gbar"><i style="width:${tot?Math.round(n/tot*100):0}%"></i></div><span>${n}/${tot}</span>`;
const ago=iso=>{if(!iso)return'–';try{return new Date(iso).toLocaleDateString(TS.lang&&TS.lang!=='sv'?TS.lang:'sv-SE',{day:'numeric',month:'short'})}catch(e){return String(iso).slice(0,10)}};
async function dash(){const w=win(`<h3 style="font-size:17px">${GU('u.grpProgress')}</h3><p style="font-size:13px"><b>${e2(G.name)}</b></p><div id="grpbody" style="min-height:60px">…</div>
 <details style="margin-top:12px"><summary style="cursor:pointer;font-size:13px;font-weight:600">${GU('u.grpStaffL')}</summary>${linksHtml()}</details>
 <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px"><button class="pbtn" data-r>${GU('u.grpRefresh')}</button><button class="pbtn pri" data-x>${GU('u.close')}</button></div>`,'teamw grpw');
 wireCopy(w);
 w.addEventListener('click',async e=>{if(e.target.closest('[data-x]'))close();if(e.target.closest('[data-r]'))load();
  const d=e.target.closest('[data-del]');if(d){if(!d.dataset.sure){d.dataset.sure=1;d.textContent=GU('u.grpDelQ');return}d.disabled=true;try{await api('/'+G.id+'/members/'+d.dataset.del,{method:'DELETE'})}catch(x){}load()}});
 const load=async()=>{const el=document.getElementById('grpbody');if(!el)return;
  let r;try{r=await api('/'+G.id+'/members')}catch(e){el.innerHTML=`<p>${e.status===404?GU('u.grpGone'):GU('u.grpErr')}</p>`;return}
  if(r.name&&r.name!==G.name){G.name=r.name;save()}
  const rows=r.members||[];if(!rows.length){el.innerHTML=`<p style="font-size:13px">${GU('u.grpNone')}</p>`;return}
  rows.sort((a,b)=>String(b.at||'').localeCompare(String(a.at||'')));
  const apps=[['pos','iPad'],['bs','Backstage'],['mob',GU('u.appMob')]],X=extras();
  const allCore=m=>apps.every(([a])=>coreOf(a).every(t=>(m.done||[]).includes(t.id)));
  const qz=qq=>apps.filter(([a])=>qq&&qq[a]).map(([a,l])=>`${l} ${qq[a].s}/${qq[a].t}${qq[a].s>=4?' ✓':''}`).join('<br>')||'–';
  el.innerHTML=`<p style="font-size:12.5px;opacity:.8;margin:0 0 8px">${GU('u.grpSummary',rows.length,rows.filter(allCore).length)}</p><div class="grpscroll"><table class="team grpt"><tr><th>${GU('u.teamWho')}</th>${apps.map(([,l])=>`<th>${GU('u.grpCore',l)}</th>`).join('')}<th>${GU('u.grpOther')}</th><th>${GU('u.teamQuiz')}</th><th>${GU('u.teamLast')}</th><th></th></tr>
  ${rows.map(m=>{const d=m.done||[];return `<tr><td><bdi>${e2(m.name)}</bdi></td>${apps.map(([a])=>{const c=coreOf(a);return `<td class="gb">${bar(c.filter(t=>d.includes(t.id)).length,c.length)}</td>`}).join('')}<td class="gb">${bar(X.filter(t=>d.includes(t.id)).length,X.length)}</td><td style="font-size:11.5px">${qz(m.quiz)}</td><td>${ago(m.at)}</td><td><button class="pbtn" style="padding:3px 8px;font-size:11.5px" data-del="${e2(m.id)}">${GU('u.grpDel')}</button></td></tr>`}).join('')}</table></div>`};
 load()}
window.groupDash=dash;

/* ── Kort överst i guidelistan ── */
const st=document.createElement('style');st.textContent=`.grpcard{margin:4px 0 10px;padding:10px;border:1px solid var(--pg-line);border-radius:10px;font-size:12.5px}.grpcard b{font-weight:650}.grpcard .row2{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.grpcard .pbtn{font-size:12px;padding:5px 9px}.grpcard .lnk{background:none;border:0;padding:0;color:inherit;text-decoration:underline;cursor:pointer;font:inherit;opacity:.75}
.grpw>div{max-width:min(860px,94vw)!important;width:860px}.grpscroll{overflow:auto;max-height:55vh}.grpt td,.grpt th{white-space:nowrap;vertical-align:middle}.grpt .gb{min-width:96px}.grpt .gb>*{display:inline-block;vertical-align:middle}.gbar{width:56px;height:6px;border-radius:3px;background:var(--pg-line);margin-right:6px;overflow:hidden}.gbar i{display:block;height:100%;background:#1677ff}`;document.head.appendChild(st);
const card=()=>{if(!G)return `<div class="grpcard"><button class="pbtn" data-grpnew style="width:100%">👥 ${GU('u.grpCreate')}</button></div>`;
 if(G.key)return `<div class="grpcard">👥 <b><bdi>${e2(G.name||'…')}</bdi></b> · ${GU('u.grpAdminTag')}<div class="row2"><button class="pbtn pri" data-grpdash>${GU('u.grpProgress')}</button><button class="pbtn" data-grpcopy>${GU('u.grpCopyStaff')}</button></div></div>`;
 return `<div class="grpcard">👥 <b><bdi>${e2(G.name||'…')}</bdi></b>${G.me?` · <bdi>${e2(G.me)}</bdi> <button class="lnk" data-grpme>${GU('u.grpRename')}</button>`:''}</div>`};
const _list=list;list=function(){_list.apply(this,arguments);const g=document.getElementById('glist');if(!g||g.querySelector('.grpcard'))return;g.insertAdjacentHTML('afterbegin',card())};
document.getElementById('glist').addEventListener('click',e=>{
 if(e.target.closest('[data-grpnew]')){e.stopPropagation();createDlg()}
 if(e.target.closest('[data-grpdash]')){e.stopPropagation();dash()}
 if(e.target.closest('[data-grpme]')){e.stopPropagation();nameDlg(true)}
 const c=e.target.closest('[data-grpcopy]');if(c){e.stopPropagation();navigator.clipboard.writeText(staffLink()).then(()=>{c.textContent=GU('u.copied');setTimeout(()=>{c.textContent=GU('u.grpCopyStaff')},1800)},()=>{})}},true);

/* ── Start ── */
(async()=>{list();if(!G)return;
 try{const r=await api('/'+G.id);G.name=r.name;save();list()}
 catch(e){if(e.status===404){const lost=G;G=null;save();list();if(urlG===lost.id){window.GROUP_WAIT=false;win(`<p>${GU('u.grpGone')}</p><div style="text-align:right;margin-top:12px"><button class="pbtn pri" data-x>${GU('u.close')}</button></div>`).onclick=ev=>{if(ev.target.closest('[data-x]'))close()}}}return}
 if(!G.me&&!G.key){nameDlg(false);return}
 window.groupSync();
 if(urlKey&&G.key&&!window.START_GUIDE&&!/[?&]guide=/.test(location.search))dash()})();
})();
