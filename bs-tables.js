/* Backstage: Bordskartor – lista, rutnät/lista, lägg till/redigera bord, flytta och ändra storlek. Byggt efter demomiljön (okt 2026). */
(()=>{const {D,B,F,go,INIT,btoast,sub,lbl,inp,dd,chk,isOn,ibtn,actPill,addBox,dlg,openDlg,need,head,PG,FOOT,SAVES,BACK,bconfirm,today,dmy}=BS;
const COLS=8,ROWS=6;
const TC=[['Korall','#ffa4a1'],['Persika','#ffaf8e'],['Honung','#ffd87f'],['Saffran','#ffeb80'],['Pistage','#f5fa7b'],['Lime','#d0f581'],['Äpple','#a8f69f'],['Mint','#a9fcd3'],['Akvamarin','#a6f0f4'],['Himmel','#a4e4ff'],['Jeans','#b4dbff'],['Lavendel','#bccaff'],['Viol','#cabcff'],['Syren','#e4bbff'],['Orkidé','#fdc0fd'],['Puder','#ffd2e7'],['Kaffe','#dec6af'],['Sand','#f8dabf']];
const hexOf=n=>(TC.find(c=>c[0]===n)||TC[0])[1];
const nameOf=h=>{h=String(h||'').toLowerCase();const c=TC.find(c=>c[1]===h);return c?c[0]:'Korall'};
const sync=()=>{S.tables=(S.plans||[]).flatMap(p=>p.places.map(x=>({id:x.id,name:x.name})))};
const P_=()=>B().pd;
const fits=(L,id,pos,w,h)=>{const c=pos%COLS,r=Math.floor(pos/COLS);if(pos<0||c+w>COLS||r+h>ROWS)return false;return !L.some(x=>{if(x.id===id)return false;const xc=x.pos%COLS,xr=Math.floor(x.pos/COLS);return c<xc+(x.w||1)&&xc<c+w&&r<xr+(x.h||1)&&xr<r+h})};
const used=L=>{const u=new Set();L.forEach(x=>{for(let a=0;a<(x.w||1);a++)for(let b=0;b<(x.h||1);b++)u.add(x.pos+a+b*COLS)});return u};

{const st=document.createElement('style');st.textContent=`
#device.bsm #pos .tpgrid{display:grid;grid-template-columns:repeat(${COLS},1fr);grid-template-rows:repeat(${ROWS},64px);gap:8px;max-width:936px;position:relative;margin-top:14px}
#device.bsm #pos .tpc{display:grid;place-items:center;padding:0;background:#f1f1f1;border:1px solid #e6e6e6;border-radius:4px;font-size:16px;color:#111}
#device.bsm #pos .tpc:hover{background:#e4e4e4}
#device.bsm #pos .tpt{position:relative;border-radius:4px;display:grid;place-items:center;font-weight:700;font-size:13px;cursor:grab;touch-action:none;user-select:none}
#device.bsm #pos .tpt.mv{z-index:20;box-shadow:0 8px 20px rgba(0,0,0,.25);opacity:.9;cursor:grabbing}
#device.bsm #pos .tpe{position:absolute;top:-7px;right:-7px;width:22px;height:22px;border-radius:50%;background:#111;color:#fff;display:grid;place-items:center}
#device.bsm #pos .tpe .ms{font-size:13px;color:#fff}
#device.bsm #pos .tpr{position:absolute;right:0;bottom:0;width:20px;height:20px;cursor:nwse-resize;touch-action:none;background:linear-gradient(135deg,transparent 50%,rgba(0,0,0,.28) 50%);border-bottom-right-radius:4px}
#device.bsm #pos .tpr:after{content:'↘';position:absolute;right:2px;bottom:0;font-size:9px;color:#fff}
#device.bsm #pos .tpl{display:flex;align-items:center;gap:10px;height:44px;border-radius:4px;padding:0 12px;margin-bottom:10px;max-width:620px;font-size:13px}
#device.bsm #pos .tpl .dh{font-size:14px}
#device.bsm #pos .tpl button{margin-left:auto;display:inline-flex;align-items:center;gap:4px;font-weight:700;font-size:11.5px}
#device.bsm #pos .plcard{border:1px solid #ddd;border-radius:6px;margin-bottom:12px;background:#fff}
#device.bsm #pos .plcard>.hd{display:flex;align-items:center;height:56px;padding:0 16px;gap:14px;cursor:pointer}
#device.bsm #pos .plcard.open>.hd{background:#e3fbef;border-bottom:1px solid #111;border-radius:6px 6px 0 0}
#device.bsm #pos .plcard .det{padding:16px 20px;display:flex;gap:20px;font-size:12px}
#device.bsm #pos .plcard .det b{display:block;font-size:11.5px;margin-bottom:2px}
#device.bsm #pos .tpmenu{position:absolute;right:0;bottom:46px;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 14px rgba(0,0,0,.15);white-space:nowrap}
#device.bsm #pos .tpmenu button{padding:10px 16px;font-size:12px;font-weight:600}`;document.head.appendChild(st)}

/* ── Lista med bordskartor ── */
PG.tableplans=()=>{const b=B();const L=S.plans||[];return head(['Bordskartor'],'Bordskartor')+`<div class="bsbody"><div class="warn"><span class="ms">warning</span>Du behöver app-version 3.35 eller senare på alla kassor för att kunna hantera bordskartor i Backstage.</div><h2>Hantera dina bordskartor</h2><p class="lead" style="max-width:470px">Ordna bord i ett rutnät genom att ändra deras storlek och position, och ändra ordningen i bordlistan. OBS: Dina parkerade ordrar kan endast hanteras i kassan. Här hanterar du endast bordskartor. ⚠️ Undvik att redigera bordskartor här när du har öppna bord. Dock kan inga ordrar försvinna. Alla parkerade ordrar är tillgängliga i listvyn i kassan.</p><hr>
 <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:16px"><div style="width:216px">${lbl('Filtrera på butik')}${dd('b_tpf',['Alla butiker','Kaffebaren'],'Alla butiker')}</div>${actPill('Lägg till bordskarta','bsgo','plan-add','planedit')}</div>
 ${L.map(p=>{const op=b.plx===p.id;const s=slug(p.name);return `<div class="plcard ${op?'open':''}" data-sort="pl" data-id="${p.id}" data-g="plan-row-${s}"><div class="hd" data-a="bsplx" data-x="${p.id}" data-g="plan-open-${s}"><span class="dh" data-drag="pl">⠿</span><b style="width:40%;font-size:13px">${esc(p.name)}</b><span style="width:20%;font-size:12px">Kaffebaren</span><span style="font-size:12px">${p.places.length} bord</span><span class="ms" style="margin-left:auto">${op?'expand_less':'expand_more'}</span></div>
  ${op?`<div class="det"><div style="flex:1"><b>Namn</b>${esc(p.name)}<hr style="margin:12px 0"><div style="display:flex"><div style="flex:1"><b>Butik</b>Kaffebaren</div><div style="flex:1"><b>Antal bord</b>${p.places.length}</div><div style="flex:1"><b>Ändrad datum</b>${p.at||today()}</div></div></div><div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start">${ibtn('edit','bsgo','planedit|'+p.id,'plan-edit-'+s,'Redigera')}${ibtn('delete','bsplandel',p.id,'plan-del-'+s,'Radera')}</div></div>`:''}</div>`}).join('')||'<p class="lead"><i>Inga bordskartor ännu.</i></p>'}</div>`};
A.bsplx=id=>{const b=B();b.plx=b.plx===id?null:id;render();emit('bs:plx')};
A.bsplandel=id=>{const p=S.plans.find(x=>x.id===id);bconfirm({t:'Radera bordskarta',p:`Vill du radera ${esc(p.name)} och dess ${p.places.length} bord? Parkerade ordrar finns kvar i listvyn i kassan.`,ok:'Radera',red:1},ok=>{if(!ok)return;S.plans=S.plans.filter(x=>x!==p);sync();save();render();btoast('Bordskartan har raderats')})};
{const oi=INIT.tableplans;INIT.tableplans=a=>{B().plx=null;if(oi)oi(a)}}

/* ── Skapa / redigera bordskarta ── */
sub('planedit','Skapa bordskarta','tableplans');
INIT.planedit=id=>{const p=id&&(S.plans||[]).find(x=>x.id===id);const b=B();b.pd=p?JSON.parse(JSON.stringify(p)):{id:null,name:'',places:[]};b.tpm=false;Object.assign(UI.f,{b_plname:p?p.name:'',b_plstore:p?'Kaffebaren':'',b_plview:'Rutnät'})};
const grid=pd=>{const u=used(pd.places);let h='';for(let i=0;i<COLS*ROWS;i++)if(!u.has(i))h+=`<button class="tpc" style="grid-column:${i%COLS+1};grid-row:${Math.floor(i/COLS)+1}" data-a="bstpcell" data-x="${i}" data-g="cell-${i}">+</button>`;
 h+=pd.places.map(x=>{const s=slug(x.name);return `<div class="tpt" data-tmove="${x.id}" style="grid-column:${x.pos%COLS+1}/span ${x.w||1};grid-row:${Math.floor(x.pos/COLS)+1}/span ${x.h||1};background:${x.color}" data-g="ptable-${s}">${esc(x.name)}<button class="tpe" data-a="bstpedit" data-x="${x.id}" data-g="pt-edit-${s}" title="Redigera bord"><span class="ms">edit</span></button><span class="tpr" data-tres="${x.id}" data-g="pt-size-${s}" title="Dra för att ändra storlek"></span></div>`}).join('');
 return `<div class="tpgrid" data-g="tp-grid">${h}</div>`};
const list=pd=>`<div style="margin-top:14px">${pd.places.map(x=>{const s=slug(x.name);return `<div class="tpl" data-sort="tp" data-id="${x.id}" style="background:${x.color}" data-g="tpl-${s}"><span class="dh" data-drag="tp">⠿</span>${esc(x.name)}<button data-a="bstpedit" data-x="${x.id}" data-g="pt-edit-${s}"><span class="ms" style="font-size:15px">edit</span>Redigera</button></div>`}).join('')}<div style="max-width:620px">${addBox('Lägg till bord','bstpadd','','tp-add')}</div></div>`;
PG.planedit=()=>{const b=B();const pd=P_();if(!pd)return '';const isNew=!pd.id;const t=isNew?'Skapa bordskarta':esc((S.plans.find(x=>x.id===pd.id)||pd).name);const lv=(F('b_plview')||'Rutnät')==='Lista';
 const e=b.tpEdit&&pd.places.find(x=>x.id===b.tpEdit);
 return head(['Bordskartor',t],t)+`<div class="bsbody"><div class="grid2" style="grid-template-columns:302px 302px;gap:12px">${'<div>'+lbl('Bordskartanamn',1)+inp('b_plname')+'</div>'}<div>${lbl('Butik',1)}${isNew?dd('b_plstore',['Kaffebaren'],'Välj butik'):`<div class="bi" style="background:#eee;color:#888;display:flex;align-items:center;height:32px;padding:0 8px;box-sizing:border-box">Kaffebaren</div>`}</div></div><hr style="max-width:936px">
 <div style="width:302px">${lbl('Visa som')}${dd('b_plview',['Lista','Rutnät'],'Rutnät')}</div>${lv?list(pd):grid(pd)}</div>
 ${b.dlg==='tpt'?dlg(e?'Redigera bord':'Lägg till bord',`${!e&&b.tpCell!=null?`<div class="info" style="margin-bottom:12px"><span class="ms">info</span><span>Bord som läggs till från rutnätsvyn placeras på den valda positionen och läggs högst upp i listan</span></div>`:''}${lbl('Namn',1)}${inp('b_tname')}<div style="margin-top:12px">${lbl('Färg',1)}${dd('b_tcol',TC.map(c=>[c[0],c[0],c[1]]),'Välj färg')}</div>${e?`<div style="margin-top:10px">${chk('b_tdel','Ta bort bord')}</div>`:''}`,`<button data-a="bsdlgx">Avbryt</button><button class="p" data-a="bstpok" data-g="cell-ok">OK</button>`,{h:e?330:(b.tpCell!=null?400:320)}):''}`};
FOOT.planedit=()=>`<div class="bsfoot"><button class="bcan" data-a="bstpcancel" data-g="bs-cancel">Avbryt</button><div style="position:relative">${B().tpm?`<div class="tpmenu"><button data-a="bstpsave" data-x="close" data-g="save-close">Spara och stäng</button></div>`:''}<button class="bsave" data-a="bstpsave" data-x="" data-g="bs-save"><span><span class="ms">save</span>Spara</span><i data-a="bstpmenu" data-g="save-menu"><span class="ms">expand_more</span></i></button></div></div>`;
delete SAVES.planedit;BACK.planedit='tableplans';
A.bstpmenu=()=>{B().tpm=!B().tpm;render()};
A.bstpcancel=()=>go('tableplans');
A.bstpcell=i=>{const b=B();b.tpEdit=null;b.tpCell=+i;UI.f.b_tname='';UI.f.b_tcol='';openDlg('tpt','bs:dlg:cell')};
A.bstpadd=()=>{const b=B();b.tpEdit=null;b.tpCell=null;UI.f.b_tname='';UI.f.b_tcol='';openDlg('tpt','bs:dlg:cell')};
A.bstpedit=id=>{const x=P_().places.find(p=>p.id===id);const b=B();b.tpEdit=id;b.tpCell=null;Object.assign(UI.f,{b_tname:x.name,b_tcol:nameOf(x.color),b_tdel:false});openDlg('tpt','bs:dlg:tedit')};
A.bstpok=()=>{const b=B();const pd=P_();const e=b.tpEdit&&pd.places.find(x=>x.id===b.tpEdit);
 if(e&&isOn('b_tdel')){pd.places=pd.places.filter(x=>x!==e);b.dlg=null;b.tpEdit=null;render();emit('bs:table:del');return}
 if(!need(['b_tname','b_tcol']))return;
 if(e){e.name=F('b_tname').trim();e.color=hexOf(F('b_tcol'))}
 else{let pos=b.tpCell;if(pos==null){const u=used(pd.places);pos=-1;for(let i=0;i<COLS*ROWS;i++)if(!u.has(i)){pos=i;break}if(pos<0){btoast('Rutnätet är fullt. Ta bort eller förminska ett bord först.');return}}
  const t={id:'t'+Date.now().toString(36),name:F('b_tname').trim(),color:hexOf(F('b_tcol')),pos,w:1,h:1};b.tpCell!=null?pd.places.unshift(t):pd.places.push(t)}
 b.dlg=null;b.tpEdit=null;render();emit('bs:table')};
A.bstpsave=x=>{const b=B();const pd=P_();b.tpm=false;const keys=['b_plname'];if(!pd.id)keys.push('b_plstore');if(!need(keys))return;
 let p=pd.id&&S.plans.find(q=>q.id===pd.id);S.plans=S.plans||[];
 if(!p){p={id:'pl'+Date.now().toString(36)};S.plans.push(p)}
 Object.assign(p,{name:F('b_plname').trim(),places:JSON.parse(JSON.stringify(pd.places)),at:today()});sync();save();btoast('Bordskartan har sparats');
 if(x==='close')go('tableplans');else{const v=F('b_plview');go('planedit',p.id);UI.f.b_plview=v;render()}emit('bs:save:plan',p)};

/* ── Flytta och ändra storlek med pekare ── */
let op=null,eat=false;
const geo=()=>{const g=document.querySelector('#pos .tpgrid');if(!g)return null;const r=g.getBoundingClientRect();const sc=r.width/g.offsetWidth||1;return {g,r,sc,px:(g.offsetWidth+8)/COLS*sc,py:72*sc}};
document.addEventListener('pointerdown',e=>{if(APP()!=='bs'||!e.target.closest)return;const rs=e.target.closest('#pos [data-tres]');const mv=!rs&&!e.target.closest('#pos .tpe')&&e.target.closest('#pos [data-tmove]');if(!rs&&!mv)return;
 const G=geo();if(!G)return;const id=(rs||mv).dataset.tres||mv.dataset.tmove;const x=P_().places.find(p=>p.id===id);if(!x)return;e.preventDefault();e.stopPropagation();
 op={kind:rs?'size':'move',x,el:(rs||mv).closest('.tpt'),G,x0:e.clientX,y0:e.clientY,on:false,w:x.w||1,h:x.h||1,pos:x.pos}},true);
document.addEventListener('pointermove',e=>{if(!op)return;const dx=e.clientX-op.x0,dy=e.clientY-op.y0;if(!op.on){if(Math.hypot(dx,dy)<5)return;op.on=true;op.el.classList.add('mv')}e.preventDefault();const {G,x}=op;
 if(op.kind==='size'){const w=Math.max(1,(x.w||1)+Math.round(dx/G.px)),h=Math.max(1,(x.h||1)+Math.round(dy/G.py));if(fits(P_().places,x.id,x.pos,w,h)){op.w=w;op.h=h;op.el.style.gridColumn=`${x.pos%COLS+1}/span ${w}`;op.el.style.gridRow=`${Math.floor(x.pos/COLS)+1}/span ${h}`}}
 else{op.el.style.transform=`translate(${dx/G.sc}px,${dy/G.sc}px)`;const r=op.el.getBoundingClientRect();const c=Math.round((r.left-G.r.left)/G.px),rw=Math.round((r.top-G.r.top)/G.py);const pos=rw*COLS+c;op.pos=(c>=0&&rw>=0&&fits(P_().places,x.id,pos,x.w||1,x.h||1))?pos:x.pos}},true);
const up=()=>{if(!op)return;const o=op;op=null;o.el&&o.el.classList.remove('mv');if(!o.on)return;eat=true;setTimeout(()=>eat=false,0);
 if(o.kind==='size'){o.x.w=o.w;o.x.h=o.h}else o.x.pos=o.pos;render();emit('bs:table:'+o.kind)};
document.addEventListener('pointerup',up,true);document.addEventListener('pointercancel',up,true);
document.addEventListener('click',e=>{if(eat){e.preventDefault();e.stopPropagation();eat=false}},true);
BS.tpMove=(name,pos)=>{const x=P_().places.find(p=>p.name===name);if(x&&fits(P_().places,x.id,pos,x.w||1,x.h||1)){x.pos=pos;render()}};
})();
