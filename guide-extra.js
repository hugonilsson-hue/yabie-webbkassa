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

/* ── Quizfrågor (svenska källtexter, översätts via GT) ── */
const Q={
 pos:[['Var hittar du orderhistoriken för att göra en retur eller en kvittokopia?',['My Store → Order History','Functions → Discount','Parked']],
  ['Vad behöver du ange vid dagens första kontantköp?','Växelkassan, alltså hur mycket som ligger i kassalådan|Kundens personnummer|En rabattkod'.split('|')],
  ['Hur ofta ska du ta en Z-rapport?','Varje dag du har sålt något|En gång i månaden|Bara när Skatteverket frågar'.split('|')],
  ['Två gäster vill betala olika belopp. Vad väljer du?','Functions → Split by amount|Park|Open return'.split('|')],
  ['Vad är skillnaden mellan X-rapporten och Z-rapporten?','X-rapporten stänger inte dagen, Z-rapporten gör det|De är samma rapport|Z-rapporten visar bara kortbetalningar'.split('|')]],
 bs:[['Vad styr momsen på en produkt i Backstage?','Produktgruppen|Färgen på knappen|Betalsättet'.split('|')],
  ['Vad gör en automatisk kampanj?','Den dras av i kassan utan att kassören gör något|Den måste aktiveras med en knapp|Den gäller bara i webbshoppen'.split('|')],
  ['Var rättar du ett pass som någon glömde att stämpla?','Personalliggare → Lägg till skift|Kampanjer|Licenser'.split('|')],
  ['Kassan hämtar inte en ändring från Backstage direkt. Vad gör du?','Synkroniserar produktkatalogen i kassan|Raderar produkten och skapar den igen|Startar om routern'.split('|')],
  ['Var kopplar du ihop Yabie med Fortnox?','Integrationer|Kök|Lojalitet'.split('|')]],
 mob:[['Var ligger varukorgen i mobilkassan?','I en egen flik längst ner|Under My Store|Den finns bara på iPaden'.split('|')],
  ['Kan en order som parkerats på ett bord i mobilen tas över på iPaden?','Ja, bordskartan är gemensam för alla kassor|Nej, varje enhet har egna bord|Bara efter Z-rapporten'.split('|')],
  ['Hur tar du betalt med kort på en Samsung A35?','I en fristående terminal, sedan registrerar du betalningen i kassan|Kunden blippar kortet mot mobilen|Det går inte'.split('|')],
  ['Hur gör du en retur i mobilkassan?','Från den tidigare ordern i orderhistoriken|Med en negativ rabatt|Genom att radera ordern'.split('|')],
  ['Hur stämplar du ut efter ett pass?','Anger samma PIN igen och trycker End shift|Stänger appen|Tar en Z-rapport'.split('|')]]};
window.QUIZ_SRC=Q;
const PASS=4;
const courseName=a=>a==='bs'?GU('u.courseBs'):a==='mob'?GU('u.courseMob'):GU('u.coursePos');
const shuffle=a=>{const r=a.map((x,i)=>[x,i]);for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r};

function quiz(app){app=app||APP();const qs=Q[app];let k=0,score=0;
 const box=()=>tourEl.querySelector('.win>div');
 const ask=()=>{const [q,opts]=qs[k];const order=shuffle(opts);
  tourEl.innerHTML=`<div class="win quiz" ${GDIR()}><div><div class="qmeta">${esc2(GU('u.quizT',courseName(app)))} · ${GU('u.quizQ',k+1,qs.length)}</div><h3 style="font-size:17px">${esc2(GT(q))}</h3>
   ${order.map(([o,i])=>`<button class="qopt" data-qi="${i}">${esc2(GT(o))}</button>`).join('')}<div class="qfb"></div>
   <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px"><button class="pbtn" data-qx>${GU('u.close')}</button><button class="pbtn pri" data-qn disabled style="opacity:.4">${k<qs.length-1?GU('u.quizNext'):GU('u.quizDone')}</button></div></div></div>`;
  const b=box();b.onclick=e=>{if(e.target.closest('[data-qx]')){tourEl.innerHTML='';return}
   const o=e.target.closest('[data-qi]');if(o&&!b.dataset.ans){b.dataset.ans=1;const right=o.dataset.qi==='0';if(right)score++;
    b.querySelectorAll('[data-qi]').forEach(x=>{if(x.dataset.qi==='0')x.classList.add('ok');else if(x===o)x.classList.add('bad')});
    b.querySelector('.qfb').innerHTML=right?`<b style="color:var(--pg-ok)">${GU('u.quizRight')}</b>`:esc2(GU('u.quizWrong',GT(opts[0])));const n=b.querySelector('[data-qn]');n.disabled=false;n.style.opacity=1;return}
   if(e.target.closest('[data-qn]')&&b.dataset.ans){k++;k<qs.length?ask():result()}}};
 const result=()=>{const ok=score>=PASS;TS.quiz=TS.quiz||{};const prev=TS.quiz[app];if(!prev||score>=prev.s)TS.quiz[app]={s:score,t:qs.length,at:new Date().toISOString().slice(0,10)};tsave();sync();
  tourEl.innerHTML=`<div class="win quiz" ${GDIR()}><div style="text-align:center"><div class="ic" style="${ok?'':'background:#e5484d'}">${ok?'✓':'!'}</div><h3>${ok?GU('u.quizPass',score,qs.length):GU('u.quizFail',score,qs.length,PASS)}</h3>
   ${ok?`<label style="display:block;text-align:left;font-size:12px;color:var(--pg-muted);margin-top:10px">${GU('u.certName')}<input id="certname" style="display:block;width:100%;margin-top:4px;padding:8px 10px;border:1px solid var(--pg-line);border-radius:8px;font:inherit;color:inherit;background:transparent"></label>`:''}
   <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:14px"><button class="pbtn" data-qx>${GU('u.close')}</button>${ok?`<button class="pbtn pri" data-cert>${GU('u.certMake')}</button>`:`<button class="pbtn pri" data-retry>${GU('u.quizRetry')}</button>`}</div></div></div>`;
  if(ok)meName().then(n=>{const i=document.getElementById('certname');if(i&&!i.value)i.value=n||TS.certName||''});
  const b=box();b.onclick=e=>{if(e.target.closest('[data-qx]'))tourEl.innerHTML='';if(e.target.closest('[data-retry]'))quiz(app);
   if(e.target.closest('[data-cert]')){const n=(document.getElementById('certname').value||'').trim();if(!n){document.getElementById('certname').focus();return}TS.certName=n;tsave();cert(app,n,score,qs.length)}}};
 ask()}
window.quiz=quiz;

function cert(app,name,s,t){const date=new Date().toISOString().slice(0,10);
 tourEl.innerHTML=`<div class="win quiz" ${GDIR()}><div><div class="cert" id="certcard"><div class="lg">YABIE WEBBKASSA</div><h4>${esc2(GU('u.certTitle'))}</h4><div class="nm">${esc2(name)}</div><p>${GU('u.certBody',esc2(courseName(app)),s,t)}</p><p>${esc2(GU('u.certDate'))}: ${date}</p></div>
  <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button class="pbtn" data-qx>${GU('u.close')}</button><button class="pbtn" data-print>${GU('u.certPrint')}</button><button class="pbtn pri" data-png>${GU('u.certSave')}</button></div></div></div>`;
 tourEl.querySelector('.win>div').onclick=async e=>{if(e.target.closest('[data-qx]'))tourEl.innerHTML='';if(e.target.closest('[data-print]'))try{window.print()}catch(x){}
  if(e.target.closest('[data-png]')){const blob=await certPng(name,courseName(app),s,t,date);const fn='intyg-yabie-'+app+'.png';
   const dl=window.claude&&claude.use?await claude.use('downloads').catch(()=>null):null;
   if(dl){try{await dl.save({filename:fn,data:blob});return}catch(x){if(x&&x.code==='declined')return}}
   const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;document.body.appendChild(a);a.click();a.remove()}}}
function certPng(name,course,s,t,date){const c=document.createElement('canvas');c.width=1400;c.height=990;const x=c.getContext('2d');
 x.fillStyle='#fff';x.fillRect(0,0,1400,990);x.strokeStyle='#1f9d55';x.lineWidth=14;x.strokeRect(40,40,1320,910);x.lineWidth=2;x.strokeRect(70,70,1260,850);
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
const meName=async()=>{await ready;try{return U?(await U.me()).name:''}catch(e){return ''}};
let lastSync='';
async function sync(){await ready;if(!DB||!UID)return;const done=Object.keys(TS.done||{}).filter(k=>TS.done[k]);const payload={done,quiz:TS.quiz||{}};const j=JSON.stringify(payload);if(j===lastSync)return;lastSync=j;
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
const linkFor=id=>WEB?WEB.replace(/\/?$/,'/')+'?guide='+id:((window.GLINKS||{})[id]||BASE);
const ALPH='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const codeOf=id=>{let h=2166136261;for(const c of id){h^=c.charCodeAt(0);h=Math.imul(h,16777619)>>>0}let s='';for(let i=0;i<4;i++){s+=ALPH[h%32];h=Math.floor(h/32)}return s};
const byCode=raw=>{const c=String(raw||'').trim();const k=c.toUpperCase().replace(/[^A-Z0-9]/g,'');
 return TOURS.find(t=>!t.hide&&codeOf(t.id)===k)||TOURS.find(t=>t.id===c.toLowerCase())};
window.guideCode=codeOf;window.guideByCode=byCode;
const go=t=>{TS.appAsked=1;tsave();document.getElementById('side').classList.remove('open');tourEl.innerHTML='';setTimeout(()=>startTour(t.id),50)};
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
const openFromUrl=()=>{if(window.START_GUIDE){if(!TS.hw||TS.hwv!==2){try{TS.hw=HW.map(h=>h.id);TS.hwv=2;tsave()}catch(e){}}const t=TOURS.find(x=>x.id===window.START_GUIDE);if(t)setTimeout(()=>go(t),300);return}let m=(location.hash+'&'+location.search).match(/guide=([A-Za-z0-9-]+)/);if(!m)return;const t=byCode(m[1]);if(t)setTimeout(()=>go(t),400)};
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
