/* Start-page editing like the register: resizable tiles (drag the corner), icon tiles with an icon picker,
   and table plans (Add table plan → Add place, resizable places, Edit / Save). */
(()=>{
const st=document.createElement('style');st.textContent=`
#pos .tile .rsh{position:absolute;right:0;bottom:0;width:18px;height:18px;z-index:3;cursor:nwse-resize;background:linear-gradient(135deg,transparent 50%,rgba(0,0,0,.28) 50%);border-bottom-right-radius:5px}
#pos .tile .rsh::after{content:'';position:absolute;right:3px;bottom:3px;width:7px;height:7px;border-right:1.5px solid #fff;border-bottom:1.5px solid #fff}
#pos .tile.icn{display:grid;place-items:center;align-content:center;text-align:center;gap:2px;padding:6px}
#pos .tile.icn .ig{font-size:26px;line-height:1;filter:grayscale(1) brightness(.35) contrast(1.4)}
#pos .tile.icn .nm{font-size:12px;font-weight:700}#pos .tile.icn .pr{position:static;font-size:10.5px}
#pos .icpick{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;background:#e9e9ed;border-radius:8px;padding:8px}
#pos .icpick button{height:72px;border-radius:7px;background:#fff;display:grid;place-items:center;align-content:center;gap:4px;font-size:9.5px;color:#1c1c1e!important}
#pos .icpick button .ig{font-size:24px;filter:grayscale(1) brightness(.3) contrast(1.4)}#pos .icpick button.on{background:#d6e4fd}
#pos .iccat{font-size:10px;font-weight:600;color:#6b6b70;text-transform:uppercase;margin:14px 0 6px}
#pos .plan{position:relative}
#pos .place{position:absolute;border-radius:5px;display:grid;place-content:center;text-align:center;font-weight:700;font-size:13px;color:#1c1c1e}
#pos .place.free{opacity:.9}#pos .place.occ{box-shadow:inset 0 0 0 2px rgba(0,0,0,.15)}#pos .place small{font-weight:500;font-size:10.5px}
#pos .pslot{position:absolute;border:1.5px dashed #a9c1f2;border-radius:5px;background:#fff;color:var(--blue)!important;font-size:18px;display:grid;place-items:center}
#pos .pchk{position:absolute;right:-4px;top:-5px;width:15px;height:15px;border-radius:50%;background:var(--blue2);color:#fff;font-size:9px;display:grid;place-items:center;z-index:2}
#pos .pbar{display:flex;gap:8px;align-items:center;padding:8px}#pos .pbar input{height:26px;border:1px solid #d1d1d6;border-radius:6px;padding:0 8px;font:inherit;font-size:12.5px;width:200px}
#pos .ftab .x{margin-left:8px;width:14px;height:14px;border-radius:50%;border:1px solid #8e8e93;color:#8e8e93!important;font-size:8px;display:inline-grid;place-items:center}
#pos .cdot{width:22px;height:22px;border-radius:50%;flex:none}`;document.head.appendChild(st);

/* ── icons for tiles ── */
const ICONS={Coffee:[['☕','Coffee cup'],['🧋','Iced coffee'],['🫖','Teapot'],['🍵','Tea'],['🥤','Cold drink'],['🧃','Juice box']],
 Breakfast:[['🥐','Croissant'],['🥯','Bagel'],['🍳','Fried egg'],['🥞','Pancakes'],['🧇','Waffle'],['🥣','Bowl']],
 'Cakes and candy':[['🍰','Cake slice'],['🧁','Cupcake'],['🍪','Cookie'],['🍩','Donut'],['🍫','Chocolate'],['🍬','Candy']],
 Bread:[['🥖','Baguette'],['🍞','Bread'],['🥪','Sandwich'],['🌯','Wrap'],['🥨','Pretzel'],['🫓','Flatbread']],
 Drinks:[['🍺','Beer glass'],['🍷','Wine glass'],['🍸','Cocktail'],['🥂','Champagne'],['🍶','Bottle'],['💧','Water']],
 Food:[['🍔','Burger'],['🍕','Pizza'],['🍣','Sushi roll'],['🍜','Noodles'],['🥗','Salad'],['🍝','Pasta']],
 Accessories:[['⌚','Watch'],['👜','Bag'],['🎁','Gift'],['🏷️','Tag'],['👕','T-shirt'],['🛍️','Shopping bag']]};
const icFind=k=>{for(const l of Object.values(ICONS))for(const x of l)if(x[1]===k)return x[0];return '☕'};
/* customize tile: icon style gets "Choose another icon" */
const _ts=PAGES.tilestyle;PAGES.tilestyle=d=>{const r=_ts(d);const t=UI.f.tile;if(!t)return r;const ic=t.icon||'Coffee cup';
 r.body=r.body.replace(/(<button data-a="tstyle" data-x="icon">[^]*?<div class="pv"[^>]*>)<div style="text-align:center;padding-top:22px">[^]*?<br>/,`$1<div style="text-align:center;padding-top:16px"><span style="font-size:30px;filter:grayscale(1) brightness(.35) contrast(1.4)">${icFind(ic)}</span><br>`);
 if((t.style||'none')==='icon')r.body=r.body.replace(/(<button data-a="tstyle" data-x="icon">[^]*?<div class="pv"[^>]*>[^]*?<\/div><\/div>)(<\/button>)/,`$1<span style="display:block;text-align:center;color:var(--blue);font-size:11px;padding:6px 0 0" data-a="iconpick" data-g="tile-iconpick">Choose another icon</span>$2`);
 return r};
PAGES.iconpick=()=>{const q=(UI.f.icq||'').toLowerCase(),sel=UI.f.icsel;
 const cats=Object.entries(ICONS).map(([c,l])=>[c,l.filter(x=>!q||x[1].toLowerCase().includes(q)||c.toLowerCase().includes(q))]).filter(c=>c[1].length);
 return {white:true,title:'Add icon to tile',bodyCss:'padding:12px 24px 90px',body:`<div class="fld" style="border:1px solid #e1e1e6;height:30px;margin-bottom:8px;gap:6px">${IC.search.replace('<svg','<svg style="width:14px;height:14px;color:#8e8e93;flex:none"')}<input data-in="icq" data-live="1" placeholder="Search icon" value="${esc(UI.f.icq||'')}"></div>
  <div style="text-align:center"><span style="display:inline-block;background:#e8f0fe;color:var(--blue);border-radius:6px;padding:5px 30px;font-size:11.5px">All categories ⇕</span></div>
  ${cats.map(([c,l])=>`<div class="iccat">${esc(c)}</div><div class="icpick">${l.map(x=>`<button class="${sel===x[1]?'on':''}" data-a="icsel" data-x="${esc(x[1])}" data-g="ic-${slug(x[1])}"><span class="ig">${x[0]}</span>${esc(x[1])}</button>`).join('')}</div>`).join('')||'<p style="color:#8e8e93;text-align:center;margin-top:40px">Inga ikoner hittades.</p>'}`,
  foot:`<button class="btnb ${sel?'':'dis'}" style="min-width:290px" data-a="icsave" data-g="ic-save">Save</button>`}};
Object.assign(A,{iconpick(){UI.f.icq='';UI.f.icsel=UI.f.tile.icon||null;push('iconpick',{})},icsel(x){UI.f.icsel=x;render()},
 icsave(){if(!UI.f.icsel)return;UI.f.tile.icon=UI.f.icsel;UI.f.tile.style='icon';pop();emit('tile:icon')}});
const _tstyle=A.tstyle;A.tstyle=function(k){_tstyle(k);if(k==='icon'&&!UI.f.tile.icon){UI.f.tile.icon='Coffee cup';render()}};
document.getElementById('pos').addEventListener('input',e=>{if(e.target.dataset.in==='icq'){UI.f.icq=e.target.value;render();const i=document.querySelector('#pos [data-in="icq"]');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}}});
/* keep style/icon/size when a tile is added or edited */
const _tadd=A.tileadd;A.tileadd=function(){const t=UI.f.tile;const sp=S.startPages.find(s=>'sp:'+s.id===curTab());const old=sp&&sp.tiles.find(x=>x.pos===t.pos);const r=_tadd.apply(this,arguments);
 const nt=sp&&sp.tiles.find(x=>x.pos===t.pos);if(nt){nt.style=t.style||'none';if(t.icon)nt.icon=t.icon;if(old&&old.w)nt.w=old.w;if(old&&old.h)nt.h=old.h;save();render()}return r};
const _tedit=A.tileedit;A.tileedit=function(pos){const r=_tedit.apply(this,arguments);const sp=S.startPages.find(s=>'sp:'+s.id===curTab());const t=sp&&sp.tiles.find(x=>x.pos===+pos);if(t&&UI.f.tile){UI.f.tile.style=t.style||'none';UI.f.tile.icon=t.icon;render()}return r};

/* ── tiles: size (w×h cells), icon style, resize handle in edit mode ── */
const W1=97,H1=87,PX=104.5,PY=93.3;
const _th=tileHtml;tileHtml=function(tl,pos,editing){let h=_th(tl,pos,editing);if(!h)return h;const w=tl.w||1,hh=tl.h||1;
 if(w>1||hh>1)h=h.replace(/style="left:/,`style="width:${W1+PX*(w-1)}px;height:${H1+PY*(hh-1)}px;left:`);
 if(tl.style==='icon'&&tl.icon&&tl.type!=='function'){const p=tl.type==='product'?P(tl.ref):null;const name=p?p.name:tl.type==='group'?G(tl.ref)?.name:'';
  h=h.replace(/class="tile([^"]*)"/,'class="tile$1 icn"').replace(/(data-x="[^"]*"|data-a="tileedit" data-x="[^"]*")>[^]*?(<span class="edb">|<\/button>$)/,(m,a,end)=>`${a}><span class="ig">${icFind(tl.icon)}</span><span class="nm">${esc(name||'')}</span>${p?`<span class="pr">${kr(p.price)}</span>`:''}${end}`)}
 if(editing)h=h.replace(/<\/button>$/,`<span class="rsh" data-rs="${pos}" title="Ändra storlek"></span></button>`);
 return h};
const covered=sp=>{const c=new Set();sp.tiles.forEach(t=>{const w=t.w||1,hh=t.h||1;for(let dx=0;dx<w;dx++)for(let dy=0;dy<hh;dy++)if(dx||dy)c.add(t.pos+dx+dy*7)});return c};
const _gh=gridHtml;gridHtml=function(){let h=_gh();const k=curTab();const sp=k&&S.startPages.find(s=>'sp:'+s.id===k);if(!sp||!UI.edit)return h;const c=covered(sp);
 return h.replace(/<button class="tile empty"[^>]*data-x="(\d+)"[^>]*>\+<\/button>/g,(m,i)=>c.has(+i)?'':m)};
/* drag the corner to resize */
let drag=null;
document.getElementById('pos').addEventListener('pointerdown',e=>{const hnd=e.target.closest('[data-rs]');if(!hnd||!UI.edit)return;e.preventDefault();e.stopPropagation();
 const sp=S.startPages.find(s=>'sp:'+s.id===curTab());const t=sp&&sp.tiles.find(x=>x.pos===+hnd.dataset.rs);if(!t)return;const pos=document.getElementById('pos');const sc=pos.getBoundingClientRect().width/pos.offsetWidth||1;
 drag={t,sp,x:e.clientX,y:e.clientY,w:t.w||1,h:t.h||1,sc,moved:false}},true);
addEventListener('pointermove',e=>{if(!drag)return;const dx=(e.clientX-drag.x)/drag.sc,dy=(e.clientY-drag.y)/drag.sc;if(Math.abs(dx)+Math.abs(dy)>4)drag.moved=true;
 const col=drag.t.pos%7,row=Math.floor(drag.t.pos/7);let w=Math.max(1,Math.min(7-col,drag.w+Math.round(dx/PX))),h=Math.max(1,Math.min(7-row,drag.h+Math.round(dy/PY)));
 const others=drag.sp.tiles.filter(x=>x!==drag.t);const hit=(w2,h2)=>others.some(o=>{const ow=o.w||1,oh=o.h||1,oc=o.pos%7,orow=Math.floor(o.pos/7);return oc<col+w2&&oc+ow>col&&orow<row+h2&&orow+oh>row});
 while(w>1&&hit(w,1))w--;while(h>1&&hit(w,h))h--;if(w!==(drag.t.w||1)||h!==(drag.t.h||1)){drag.t.w=w;drag.t.h=h;render()}});
addEventListener('pointerup',()=>{if(!drag)return;const moved=drag.moved,t=drag.t;drag=null;if(moved){save();emit('tile:resize',{w:t.w,h:t.h});const stop=ev=>{ev.stopPropagation();ev.preventDefault();removeEventListener('click',stop,true)};addEventListener('click',stop,true);setTimeout(()=>removeEventListener('click',stop,true),60)}});
/* tap on the handle without dragging: cycle size */
document.getElementById('pos').addEventListener('click',e=>{const hnd=e.target.closest('[data-rs]');if(!hnd||!UI.edit)return;e.stopPropagation();e.preventDefault();
 const sp=S.startPages.find(s=>'sp:'+s.id===curTab());const t=sp&&sp.tiles.find(x=>x.pos===+hnd.dataset.rs);if(!t)return;const seq=[[1,1],[2,1],[2,2],[1,2]];const i=seq.findIndex(s=>s[0]===(t.w||1)&&s[1]===(t.h||1));const [w,h]=seq[(i+1)%seq.length];
 const col=t.pos%7,row=Math.floor(t.pos/7);if(col+w>7||row+h>7)return;t.w=w;t.h=h;save();render();emit('tile:resize',{w,h})},true);

/* ── table plans ── */
if(!S.plans){S.plans=[{id:'pl1',name:'Kaffebaren',places:(S.tables||[]).map((t,i)=>({id:t.id,name:t.name,color:'#f2a9a2',pos:i<5?i*2:9*1+((i-5)*2)+7,w:1,h:1}))}];save()}
const syncTables=()=>{S.tables=S.plans.flatMap(p=>p.places.map(x=>({id:x.id,name:x.name})))};syncTables();
const PC=8,CW=118,CH=102,GX=128,GY=112;
const occ=id=>S.parked.findIndex(c=>c.table===id);
const _tbh=tablesHtml;tablesHtml=function(){let h=_tbh();const t=UI.tables;if(!t)return h;
 /* tabs: All | plans | + */
 const tabs=`<button class="ftab ${t.tab==='all'?'on':''}" style="width:36px" data-a="ttab" data-x="all" data-g="tables-all">All</button>${S.plans.map(p=>`<button class="ftab ${t.tab===p.id||(t.tab==='room'&&p===S.plans[0])?'on':''}" data-a="ttab" data-x="${p.id}" data-g="plan-${slug(p.name)}">${esc(p.name)}${t.edit&&t.tab===p.id?`<span class="x" data-a="plandel" data-x="${p.id}">✕</span>`:''}</button>`).join('')}${S.plans.length?`<button class="tb" style="position:static;padding:0 8px;background:none;color:var(--blue)" data-a="planadd" data-g="plan-add">${IC.plus}</button>`:`<button class="tb" style="position:static;padding:0 8px;background:none;color:var(--blue)" data-a="planadd" data-g="plan-add">${IC.plus} Add table plan</button>`}`;
 h=h.replace(/<span style="flex:1;display:flex;gap:6px;align-items:flex-end;height:44px">[^]*?<\/span><button data-a="tclose"/,`<span style="flex:1;display:flex;gap:6px;align-items:flex-end;height:44px">${tabs}</span><button data-a="tclose"`);
 h=h.replace(/<button class="tb" style="position:static;padding:0 6px" data-a="nop">[^]*?<\/button><span class="tb"[^>]*>[^]*?<\/span>/,'');
 if(t.tab==='room')t.tab=S.plans[0]?S.plans[0].id:'all';
 const plan=S.plans.find(p=>p.id===t.tab);if(!plan)return h;
 const ed=!!t.edit;const used=new Set();plan.places.forEach(x=>{for(let dx=0;dx<(x.w||1);dx++)for(let dy=0;dy<(x.h||1);dy++)used.add(x.pos+dx+dy*PC)});
 const places=plan.places.map(x=>{const o=occ(x.id);const L=8+GX*(x.pos%PC),T=8+GY*Math.floor(x.pos/PC),w=CW+GX*((x.w||1)-1),hh=CH+GY*((x.h||1)-1);
  return `<button class="place ${o>=0?'occ':'free'}" style="left:${L}px;top:${T}px;width:${w}px;height:${hh}px;background:${o>=0?x.color:x.color+'55'}" data-a="${ed?'placeedit':'tbltap'}" data-x="${x.id}" data-g="tbl-${slug(x.name)}">${esc(x.name)}${o>=0?`<small>(${kr(cartTot(S.parked[o]))})</small>`:''}${ed?`<span class="pchk">✓</span><span class="rsh" data-prs="${x.id}" style="position:absolute;right:0;bottom:0;width:18px;height:18px;background:linear-gradient(135deg,transparent 50%,rgba(0,0,0,.28) 50%);border-bottom-right-radius:5px"></span>`:''}</button>`}).join('');
 let slots='';if(ed)for(let i=0;i<PC*6;i++)if(!used.has(i))slots+=`<button class="pslot" style="left:${8+GX*(i%PC)}px;top:${8+GY*Math.floor(i/PC)}px;width:${CW}px;height:${CH}px" data-a="placeadd" data-x="${i}" data-g="pslot-${i}">+</button>`;
 const bar=ed?`<div class="pbar"><button class="btnb" style="min-width:0;height:26px;padding:0 10px;font-size:12px" data-a="plancancel">Cancel</button><button class="btnb" style="min-width:0;height:26px;padding:0 10px;font-size:12px" data-a="plansave" data-g="plan-save">${IC.save||''} Save</button><input data-in="planname" value="${esc(UI.f.planname??plan.name)}"></div>`
  :`<div class="pbar"><button class="tb" style="position:static;display:inline-flex" data-a="planedit" data-g="plan-edit">${IC.pen} Edit</button></div>`;
 return h.replace(/(<div style="position:absolute;left:0;right:0;top:44px;bottom:0;overflow:auto">)[^]*(<\/div><\/div>)$/,`$1${bar}<div class="plan" style="height:${GY*6+16}px;${ed?'':'background:#fff'}">${places}${slots}</div>$2`)};
Object.assign(A,{
 planadd(){UI.f.newplan='';openModal('planform',{});render()},
 planedit(){UI.tables.edit=true;UI.tables.snap=JSON.stringify(S.plans);UI.f.planname=null;render();emit('plan:edit')},
 plancancel(){if(UI.tables.snap)S.plans=JSON.parse(UI.tables.snap);UI.tables.edit=false;syncTables();render()},
 plansave(){const p=S.plans.find(x=>x.id===UI.tables.tab);const n=(UI.f.planname??p.name).trim();if(n)p.name=n;UI.tables.edit=false;syncTables();save();render();emit('plan:save');toast('Bordsplanen är sparad')},
 plandel(id){if(S.plans.some(p=>p.id===id&&p.places.some(x=>occ(x.id)>=0)))return toast('Det finns parkerade ordrar på den här planen.');vConfirm({t:'Ta bort bordsplan',p:'Planen och alla bord på den tas bort.',ok:'Ta bort',red:true},()=>{S.plans=S.plans.filter(p=>p.id!==id);UI.tables={tab:'all'};syncTables();save();render()})},
 placeadd(i){UI.f.plname='';UI.f.plcol='#f2a9a2';openModal('placeform',{pos:+i});render()},
 placeedit(id){if(UI.f.skipPlace){UI.f.skipPlace=0;return}const p=S.plans.find(x=>x.id===UI.tables.tab);const pl=p.places.find(x=>x.id===id);UI.f.plname=pl.name;UI.f.plcol=pl.color;openModal('placeform',{id});render()},
 plcolor(){const cs=['#f2a9a2','#f7d188','#b7eba0','#b3e9ef','#bcd4fb','#cdbdf7','#d7c8b6'];UI.f.plcol=cs[(cs.indexOf(UI.f.plcol)+1)%cs.length];render()},
 placeok(){const n=(UI.f.plname||'').trim();if(!n)return;const d=mtop().d;const p=S.plans.find(x=>x.id===UI.tables.tab);
  if(d.id){const pl=p.places.find(x=>x.id===d.id);pl.name=n;pl.color=UI.f.plcol}else p.places.push({id:'t'+Date.now().toString(36),name:n,color:UI.f.plcol,pos:d.pos,w:1,h:1});closeModal();syncTables();render();emit('place:add',n)},
 placedel(){const d=mtop().d;const p=S.plans.find(x=>x.id===UI.tables.tab);if(occ(d.id)>=0)return toast('Bordet har en parkerad order.');p.places=p.places.filter(x=>x.id!==d.id);closeModal();syncTables();render()},
 planok(){const n=(UI.f.newplan||'').trim();if(!n)return;const id='pl'+Date.now().toString(36);S.plans.push({id,name:n,places:[]});syncTables();save();closeModal();UI.tables.tab=id;UI.tables.edit=true;UI.tables.snap=JSON.stringify(S.plans);UI.f.planname=null;render();emit('plan:add',n)}});
PAGES.planform=()=>({white:true,title:'Add table plan',bodyCss:'padding:18px 24px 90px',body:`<div class="fld" style="border:1px solid #d1d1d6;height:30px"><input data-in="newplan" data-g="in-newplan" placeholder="Name" value="${esc(UI.f.newplan||'')}"></div>`,
 foot:`<button class="btnb g" style="min-width:200px" data-a="mclose">Cancel</button><button class="btnb ${(UI.f.newplan||'').trim()?'':'dis'}" style="min-width:200px" data-a="planok" data-g="plan-ok">Add</button>`});
PAGES.placeform=d=>({white:true,title:d.id?'Edit place':'Add place',bodyCss:'padding:18px 24px 90px',body:`<div style="display:flex;gap:10px;align-items:center"><div class="fld" style="border:1px solid #d1d1d6;height:30px;flex:1;margin:0"><input data-in="plname" data-g="in-plname" placeholder="Name" value="${esc(UI.f.plname||'')}"></div><button class="cdot" style="background:${UI.f.plcol}" data-a="plcolor" title="Färg"></button></div>${d.id?`<div class="grp plain" style="margin-top:18px">${row('Ta bort bordet',{a:'placedel',cls:'red',nochev:1})}</div>`:''}`,
 foot:`<button class="btnb g" style="min-width:200px" data-a="mclose">Cancel</button><button class="btnb ${(UI.f.plname||'').trim()?'':'dis'}" style="min-width:200px" data-a="placeok" data-g="place-ok">${d.id?'Save':'Add'}</button>`});
document.getElementById('pos').addEventListener('input',e=>{const k=e.target.dataset.in;if(k==='newplan'||k==='plname'){const b=document.querySelector(`#pos [data-g="${k==='newplan'?'plan-ok':'place-ok'}"]`);if(b)b.classList.toggle('dis',!e.target.value.trim())}});
/* modals must sit above the full-screen table view */
const _r=render;render=function(){_r();const pos=document.getElementById('pos');if(UI.tables&&UI.modal&&pos){pos.querySelectorAll(':scope > .mbg, :scope > .modal').forEach(el=>{el.style.zIndex=el.classList.contains('modal')?41:40;pos.appendChild(el)})}};
/* resize places by dragging their corner */
let pd=null;
document.getElementById('pos').addEventListener('pointerdown',e=>{const hnd=e.target.closest('[data-prs]');if(!hnd||!UI.tables||!UI.tables.edit)return;e.preventDefault();e.stopPropagation();
 const p=S.plans.find(x=>x.id===UI.tables.tab);const pl=p&&p.places.find(x=>x.id===hnd.dataset.prs);if(!pl)return;const pos=document.getElementById('pos');pd={p,pl,x:e.clientX,y:e.clientY,w:pl.w||1,h:pl.h||1,sc:pos.getBoundingClientRect().width/pos.offsetWidth||1,moved:false}},true);
addEventListener('pointermove',e=>{if(!pd)return;const dx=(e.clientX-pd.x)/pd.sc,dy=(e.clientY-pd.y)/pd.sc;if(Math.abs(dx)+Math.abs(dy)>4)pd.moved=true;const col=pd.pl.pos%PC,row=Math.floor(pd.pl.pos/PC);
 const w=Math.max(1,Math.min(PC-col,pd.w+Math.round(dx/GX))),h=Math.max(1,Math.min(6-row,pd.h+Math.round(dy/GY)));if(w!==pd.pl.w||h!==pd.pl.h){pd.pl.w=w;pd.pl.h=h;render()}});
addEventListener('pointerup',()=>{if(!pd)return;if(pd.moved){UI.f.skipPlace=1;setTimeout(()=>UI.f.skipPlace=0,80);emit('place:resize')}pd=null});
/* tapping a table while parking: park the basket there */
const _ttab=A.ttab;A.ttab=function(x){if(UI.tables&&UI.tables.edit)return;return _ttab(x)};
})();
