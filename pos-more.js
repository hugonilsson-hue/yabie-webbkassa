/* iPad-kassan: nollställ växelkassa och servering av rätter. */
(()=>{
/* ── Nollställ växelkassa (Min butik → Kassalåda) ── */
const _dr=PAGES.drawer;PAGES.drawer=d=>{const r=_dr(d);const open=S.drawer.float!=null;
 const btn=open?row('<span style="color:var(--red,#e5484d)">Reset cash balance</span>',{a:'drawerreset',nochev:1,g:'drawer-reset'}):`<div class="row" style="color:#b0b0b5;pointer-events:none" data-g="drawer-reset">Reset cash balance</div>`;
 r.body=r.body.replace('<div class="sec">Händelser',`<div class="grp" style="margin-top:14px">${btn}</div><p style="font-size:11px;color:#8e8e93;margin:6px 15px 0">Använd om fel växelkassa har registrerats. Nästa kontantköp frågar efter växelkassan igen.</p><div class="sec">Händelser`);return r};
A.drawerreset=()=>{S.drawer.float=null;S.drawer.moves=[];save();render();toast('Växelkassan är nollställd');emit('drawer:reset')};

/* ── Rätter: servera en rätt som väntar ── */
A.crsserve=n=>{const c=C();c.served=c.served||{};c.served[n]=true;save();render();toast(n.charAt(0)+n.slice(1).toLowerCase()+' skickas till köket');emit('course:serve')};
const courseOf=it=>{const g=P(it.pid)?.gid;return (S.courses&&S.courses.items||[]).find(c=>c.gids.includes(g))};

const _rp=rightPanel;rightPanel=function(){let h=_rp();const c=C();
 if(UI.more){h=h.replace('data-a="m-courses">','data-a="m-courses" data-g="more-courses">')}
 let extra='';
 if(UI.showCourses&&c.items.length&&!c.ret){const seen=[];c.items.forEach(it=>{const k=courseOf(it);if(k&&!seen.includes(k))seen.push(k)});
  extra+=seen.map(k=>{const served=k.mode==='serve'||(c.served||{})[k.name];const nm=k.name.charAt(0)+k.name.slice(1).toLowerCase();
   return served?`<div class="crsbar" style="background:#1677ff" data-g="crs-${slug(k.name)}"><span>${esc(k.name)}</span><span>Servera ✓</span></div>`
    :`<button class="crsbar" style="background:#e5484d" data-a="crsserve" data-x="${esc(k.name)}" data-g="crs-serve-${slug(k.name)}"><span>${esc(k.name)} · Vänta</span><span>Servera ${esc(nm)} ›</span></button>`}).join('')}
 if(extra)h=h.replace(/(<div class="cart-l" id="cartl"[^>]*>)/,'$1'+extra);return h};
const st=document.createElement('style');st.textContent=`#pos .crsbar{display:flex;justify-content:space-between;align-items:center;width:calc(100% - 16px);margin:6px 8px 0;padding:7px 10px;border-radius:6px;color:#fff;font-size:11.5px;font-weight:700;letter-spacing:.02em}`;document.head.appendChild(st);
})();
