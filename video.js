/* Upgrades from the Yabie how-to videos: Magic Menu (menu photo → groups and products),
   full promotion form + "Show details" in the register, allergen icons and recommended products,
   receipt copy by SMS / email / print. */
(()=>{
const st=document.createElement('style');st.textContent=`
#pos .mmthumb{position:relative;width:96px;height:96px;border-radius:5px;background:#4a3f36;overflow:visible;display:grid;place-items:center}
#pos .mmthumb .sheet{width:58px;height:80px;background:#fbfaf6;border-radius:2px;padding:5px 4px;font-size:3.6px;line-height:1.55;color:#555;box-shadow:0 2px 6px #0006;overflow:hidden}
#pos .mmthumb .sheet b{display:block;font-size:5px;color:#222;margin:2px 0 1px}
#pos .mmthumb .x{position:absolute;right:-7px;top:-7px;width:18px;height:18px;border-radius:50%;background:#1c1c1e;color:#fff!important;font-size:11px;display:grid;place-items:center}
#pos .mmload{position:absolute;inset:0;background:#8e8e93cc;display:grid;place-content:center;justify-items:center;gap:8px;color:#fff;font-size:12px;z-index:5;border-radius:inherit}
#pos .ckc{width:16px;height:16px;border-radius:50%;border:1.5px solid #c7c7cc;display:inline-grid;place-items:center;margin-right:9px;flex:none}
#pos .ckc.on{border-color:#34c759;color:#34c759}#pos .ckc.on::after{content:'';width:7px;height:4px;border-left:1.6px solid currentColor;border-bottom:1.6px solid currentColor;transform:rotate(-45deg) translate(1px,-1px)}
#pos .trash{color:#c7c7cc!important;margin-left:14px;display:inline-grid}#pos .trash svg{width:14px;height:14px}
#pos .wdc{display:flex;gap:6px;align-items:center;padding:8px 12px;background:#fff;flex-wrap:wrap}
#pos .wdc button{width:30px;height:26px;border-radius:13px;background:#e8f0fe;color:var(--blue)!important;font-size:11.5px;font-weight:600}
#pos .wdc button.on{background:var(--blue);color:#fff!important}#pos .wdc .all{margin-left:auto;width:auto;padding:0 12px}
#pos .vchk{white-space:nowrap;display:inline-flex;align-items:center;gap:8px;font-size:12px;cursor:pointer;margin:12px 2px}
#pos .vchk i{width:16px;height:16px;border-radius:50%;border:1.5px solid #c7c7cc;display:inline-block}#pos .vchk i.on{border:5px solid var(--blue)}
#pos .pirow{display:flex;align-items:center;min-height:34px;padding:0 12px;border-bottom:1px solid #ececf0;font-size:12.5px;background:#fff;cursor:pointer}
#pos .pirow .rad{margin-right:9px}#pos .pirow.sub{padding-left:34px;background:#fafafc}
#pos .pirow .ex{margin-left:auto;color:var(--blue)!important;padding:4px 2px}#pos .pirow .ex svg{width:11px;height:11px}
#pos .pdh{background:#a855f7;color:#fff;font-size:12.5px;font-weight:600;padding:10px 14px;border-radius:8px;margin-bottom:14px}
#pos .pdk{font-size:10px;color:#8e8e93;text-transform:uppercase;letter-spacing:.03em;margin:12px 0 3px}
#pos .alics{display:flex;gap:5px;margin:8px 0 2px}#pos .alics span{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;color:#1c1c1e}
#pos .recs{position:absolute;left:0;right:0;bottom:0;height:92px;background:#f2f2f6;border-top:1px solid #e1e1e6;padding:6px 7px 0;z-index:3}
#pos .recs .h{font-size:11px;font-weight:600;color:#3a3a3c;display:flex;align-items:center;gap:5px;margin:0 0 5px 2px}
#pos .recs .h button{margin-left:auto;color:#8e8e93!important;font-size:14px;padding:0 6px}
#pos .recs .rt{display:inline-flex;flex-direction:column;justify-content:space-between;width:97px;height:60px;border-radius:5px;padding:6px 7px;font-size:11.5px;font-weight:700;text-align:left;margin-right:7px;vertical-align:top}
#pos .recs .rt small{font-weight:500;font-size:10.5px}`;document.head.appendChild(st);
const chev=()=>IC.chev.replace('<svg','<svg style="width:11px;height:11px;color:#c7c7cc"');
const trash=()=>`<span class="trash">${IC.trash}</span>`;

/* ───────── Magic Menu ───────── */
const MENU=[['Förrätter',[['Caprese sallad',120],['Mozzarella sticks',100],['Minestrone',110],['Musselsoppa',120],['Jalapeño poppers',100]]],
 ['Huvudrätter',[['Stek & potatis',200],['Lammracks',220],['Grillad kyckling',180],['Lax',175],['Risotto',160]]],
 ['Tillbehör',[['Calamari',125],['Räkor',175],['Höstack',90],['Kycklingpopcorn',100]]],
 ['Desserter',[['Brownie',100],['Chokladkaka',95],['Pudding',95],['Karamelltårta',110]]]];
const MCOL={Förrätter:'#f2a9a2',Huvudrätter:'#f4b391',Tillbehör:'#f8e28a',Desserter:'#f7d188'};
const sheet=`<div class="sheet"><b>MENY</b>${MENU.map(([c,ps])=>`<b>${c.toUpperCase()}</b>${ps.map(p=>p[0]+' '+p[1]).join('<br>')}`).join('')}</div>`;
const loading=t=>`<div class="mmload"><div class="spin">ya</div>${t}</div>`;
PAGES.magic=()=>{const has=UI.f.mmimg;return {white:false,title:'Upload Menu',bodyCss:'padding:24px 30px 90px;position:relative;min-height:100%',
 body:`<div style="display:flex;gap:14px;flex-wrap:wrap">${has?`<div class="mmthumb">${sheet}<button class="x" data-a="mmrm">✕</button></div>`:''}<button class="upl" style="width:96px;height:96px" data-a="mmadd" data-g="magic-add">+</button></div>
  <p style="font-size:12px;color:#8e8e93;margin-top:16px;max-width:430px">${has?'Bilden läses av och Yabie föreslår produktgrupper, produkter och priser. I demon används en exempelmeny.':'Fotografera din meny eller välj en bild. Du kan lägga till flera bilder, t.ex. en per sida.'}</p>
  ${UI.f.mmload?loading('Laddar…'):''}`,
 foot:`<button class="btnb ${has&&!UI.f.mmload?'':'dis'}" style="min-width:186px" data-a="mmup" data-g="magic-go">Upload Menu</button>`}};
PAGES.mmmenu=()=>{const m=UI.f.mm;const all=m.cats.length&&m.cats.every(c=>c.ok);
 return {white:false,title:'Menu',bodyCss:'padding:18px 30px 90px;position:relative;min-height:100%',body:`<div class="card"><div class="rfl">Menu language<span class="rv" style="color:#1c1c1e">Svenska ⇕</span></div><div class="rfl">Stores<span class="rv">1 selected ${chev()}</span></div></div>
  <div class="sec" style="margin-top:16px">Categories</div><div class="card">${m.cats.map((c,i)=>`<div class="rfl" style="cursor:pointer" data-a="mmcat" data-x="${i}" data-g="mm-cat-${slug(c.name)}"><span class="ckc ${c.ok?'on':''}"></span>${esc(c.name)}<span style="color:#8e8e93">&nbsp;· ${c.items.length} products</span><span class="rv">${chev()}<span class="trash" data-a="mmcatrm" data-x="${i}">${IC.trash}</span></span></div>`).join('')||'<div class="rfl" style="color:#8e8e93">Inga kategorier kvar.</div>'}</div>
  <p style="text-align:center;font-size:11px;color:#6b6b70;margin-top:22px">All products and product groups must be valid and checked before you can create them.</p>${UI.f.mmload?loading('Skapar…'):''}`,
 foot:`<button class="btnb ${all&&!UI.f.mmload?'':'dis'}" style="min-width:290px" data-a="mmcreate" data-g="mm-create">Create groups and products</button>`}};
PAGES.mmgroup=d=>{const c=UI.f.mm.cats[d.i];
 return {white:false,title:'Product group',bodyCss:'padding:18px 30px 90px',body:`<div class="card"><div class="rfl">Name*<input data-in="mmgn" value="${esc(c.name)}" style="text-align:left;margin-left:10px"></div></div>
  <div class="card" style="margin-top:12px"><div class="rfl" data-a="mmvat" style="cursor:pointer" data-g="mm-vat">Tax group*<span class="rv" style="color:#1c1c1e">${c.vat} % ⇕</span></div></div>
  <div class="sec" style="margin-top:16px">Products</div><div class="card">${c.items.map((p,j)=>`<div class="rfl">${esc(p[0])}<span style="color:#8e8e93">&nbsp;· ${p[1]} kr</span><span class="rv">${chev()}<span class="trash" data-a="mmprm" data-x="${j}">${IC.trash}</span></span></div>`).join('')}</div>`,
 foot:`<button class="btnb" style="min-width:186px;background:var(--red)" data-a="mmcatdel">Delete</button><button class="btnb" style="min-width:186px" data-a="mmok" data-g="mm-check">Check</button>`}};
Object.assign(A,{
 mmadd(){UI.f.mmimg=true;render();emit('mm:photo')},mmrm(){UI.f.mmimg=false;render()},
 mmup(){if(!UI.f.mmimg||UI.f.mmload)return;UI.f.mmload=true;render();setTimeout(()=>{UI.f.mmload=false;UI.f.mmimg=false;UI.f.mm={cats:MENU.map(([n,ps])=>({name:n,vat:12,ok:false,items:ps.map(p=>[...p])}))};if(UI.modal&&mtop().p==='magic'){push('mmmenu',{});emit('mm:read')}},1600)},
 mmcat(i){if(UI.f.mmcatrm){UI.f.mmcatrm=0;return}UI.f.mmgn=UI.f.mm.cats[+i].name;push('mmgroup',{i:+i})},
 mmcatrm(i){UI.f.mmcatrm=1;UI.f.mm.cats.splice(+i,1);setTimeout(()=>UI.f.mmcatrm=0);render()},
 mmvat(){const c=UI.f.mm.cats[mtop().d.i],v=[6,12,25];c.vat=v[(v.indexOf(c.vat)+1)%3];render()},
 mmprm(j){UI.f.mm.cats[mtop().d.i].items.splice(+j,1);render()},
 mmcatdel(){UI.f.mm.cats.splice(mtop().d.i,1);pop()},
 mmok(){const c=UI.f.mm.cats[mtop().d.i];const n=(UI.f.mmgn||'').trim();if(!n)return toast('Gruppen behöver ett namn');c.name=n;c.ok=true;pop();emit('mm:check',c.name)},
 mmcreate(){const m=UI.f.mm;if(!m.cats.length||!m.cats.every(c=>c.ok)||UI.f.mmload)return;UI.f.mmload=true;render();
  setTimeout(()=>{UI.f.mmload=false;let first=null,np=0;m.cats.forEach((c,ci)=>{let g=S.groups.find(x=>x.name===c.name);if(!g){g={id:'g'+Date.now().toString(36)+ci,name:c.name,vat:c.vat,ledger:VAT_LEDGER[c.vat],color:MCOL[c.name]||COLORS[ci%COLORS.length]};S.groups.push(g)}first=first||g;
   c.items.forEach(([n,p],j)=>{if(!S.products.some(x=>x.name===n)){S.products.push({id:'pm'+Date.now().toString(36)+ci+'_'+j,name:n,price:p,gid:g.id,desc:''});np++}})});
   S.showGroups=true;save();closeModal();render();if(first)A.tab('g:'+first.id);toast(`${m.cats.length} grupper och ${np} produkter skapade`);emit('magic',np)},1400)}});
const _goMM=A.go;A.go=function(x,el){if(x==='magic'){UI.f.mmimg=false;UI.f.mmload=false}return _goMM(x,el)};

/* ───────── Promotions: full form, item picker, engine and "Show details" ───────── */
const DAYS=['Mo','Tu','We','Th','Fr','Sa','Su'];
const _pf=PAGES.promoform;PAGES.promoform=d=>{const r=_pf(d);const f=UI.f.pr;if(f.type!=='Discount')return r;
 f.gids=f.gids||[];f.pids=f.pids||[];if(!f.days)f.days=[0,1,2,3,4,5,6];if(f.tfn==null)f.tfn=true;if(f.comb==null)f.comb=true;
 const nsel=f.gids.length+f.pids.length;
 const items=`<div class="card" style="margin-top:10px"><div class="rfl" data-a="pritems" style="cursor:pointer" data-g="promo-items">Items or groups included in this promotion*<span class="rv">${nsel?nsel+' selected':'All'} ${chev()}</span></div></div>`;
 const extra=`<div class="card" style="margin-top:10px"><div class="rfl">Minimum purchase for the promotion to apply<input data-in="prmin" data-g="in-prmin" inputmode="numeric" placeholder="Enter amount" value="${esc(UI.f.prmin||'')}"><span style="margin-left:4px">kr</span></div><div class="rfl">Max number of times per purchase<input data-in="prmax" inputmode="numeric" placeholder="Enter quantity" value="${esc(UI.f.prmax||'')}"></div></div>
  <div class="sec" style="margin-top:14px">When is this promotion active?</div><div class="card"><div class="rfl">From<input type="date" data-in="prfrom" value="${esc(UI.f.prfrom||now().slice(0,10))}" style="max-width:140px;margin-left:auto"></div>
  <div class="rfl">To<span class="rv" style="color:#1c1c1e;gap:8px"><span class="vchk" style="margin:0" data-a="prtfn"><i class="${f.tfn?'on':''}"></i>Until further notice</span>${f.tfn?'':`<input type="date" data-in="prto" value="${esc(UI.f.prto||'')}" style="max-width:130px;text-align:right">`}</span></div></div>
  <div class="sec" style="margin-top:14px">Time of day (optional)</div><div class="card"><div class="rfl"><input type="time" data-in="prtf" value="${esc(UI.f.prtf||'')}" style="text-align:left;max-width:110px">–<input type="time" data-in="prtt" value="${esc(UI.f.prtt||'')}" style="text-align:left;max-width:110px;margin-left:8px"></div></div>
  <div class="sec" style="margin-top:14px">Weekdays</div><div class="card"><div class="wdc">${DAYS.map((w,i)=>`<button class="${f.days.includes(i)?'on':''}" data-a="prday" data-x="${i}">${w}</button>`).join('')}<button class="all ${f.days.length===7?'on':''}" data-a="prday" data-x="all">All days</button></div></div>
  <span class="vchk" data-a="prcomb"><i class="${f.comb?'on':''}"></i>This promotion can be combined with other promotions</span>`;
 r.body=r.body.replace(/<div class="card" style="margin-top:10px"><div class="rfl" data-a="prgnext"[^]*?<\/div><\/div>/,items+extra);return r};
PAGES.promoitems=()=>{const f=UI.f.pr,q=(UI.f.piq||'').toLowerCase(),open=UI.f.piopen||{};const all=f.gids.length===S.groups.length;
 const grp=S.groups.filter(g=>!q||g.name.toLowerCase().includes(q)||S.products.some(p=>p.gid===g.id&&p.name.toLowerCase().includes(q)));
 return {white:true,title:'Choose items or groups',bodyCss:'padding:14px 30px 90px',body:`<div class="fld" style="border:1px solid #e1e1e6;height:30px;margin-bottom:10px;gap:6px">${IC.search.replace("<svg","<svg style=\"width:14px;height:14px;color:#8e8e93;flex:none\"")}<input data-in="piq" data-live="1" placeholder="Search" value="${esc(UI.f.piq||'')}"></div>
  <div class="card" style="border:1px solid #ececf0"><div class="pirow" data-a="piall">${rad(all)}Select all</div>${grp.map(g=>{const on=f.gids.includes(g.id);const ps=S.products.filter(p=>p.gid===g.id&&(!q||p.name.toLowerCase().includes(q)||g.name.toLowerCase().includes(q)));
   return `<div class="pirow" data-a="pig" data-x="${g.id}" data-g="pi-g-${slug(g.name)}">${rad(on)}${esc(g.name)}<span class="ex" data-a="piex" data-x="${g.id}">${open[g.id]?'▾':IC.chev}</span></div>${open[g.id]?ps.map(p=>`<div class="pirow sub" data-a="pip" data-x="${p.id}" data-g="pi-p-${slug(p.name)}">${rad(on||f.pids.includes(p.id))}${esc(p.name)}</div>`).join(''):''}`}).join('')}</div>`,
  foot:`<button class="btnb" style="min-width:290px" data-a="piok" data-g="pi-ok">Save</button>`}};
Object.assign(A,{pritems(){UI.f.piq='';UI.f.piopen={};push('promoitems',{})},
 piall(){const f=UI.f.pr;f.gids=f.gids.length===S.groups.length?[]:S.groups.map(g=>g.id);f.pids=[];render()},
 pig(id){if(UI.f.piskip){UI.f.piskip=0;return}const f=UI.f.pr;f.gids=f.gids.includes(id)?f.gids.filter(x=>x!==id):[...f.gids,id];f.pids=f.pids.filter(p=>P(p)?.gid!==id);render();emit('promo:item')},
 piex(id){UI.f.piskip=1;setTimeout(()=>UI.f.piskip=0);UI.f.piopen[id]=!UI.f.piopen[id];render()},
 pip(id){const f=UI.f.pr,g=P(id).gid;if(f.gids.includes(g)){f.gids=f.gids.filter(x=>x!==g);f.pids=[...f.pids,...S.products.filter(p=>p.gid===g&&p.id!==id).map(p=>p.id)]}else f.pids=f.pids.includes(id)?f.pids.filter(x=>x!==id):[...f.pids,id];render();emit('promo:item')},
 piok(){pop();emit('promo:items')},
 prtfn(){UI.f.pr.tfn=!UI.f.pr.tfn;render()},prcomb(){UI.f.pr.comb=!UI.f.pr.comb;render()},
 prday(x){const f=UI.f.pr;if(x==='all')f.days=f.days.length===7?[]:[0,1,2,3,4,5,6];else{const i=+x;f.days=f.days.includes(i)?f.days.filter(d=>d!==i):[...f.days,i].sort()}render()}});
const _goPr7=A.go;A.go=function(x,el){const r=_goPr7(x,el);if(x==='promoform'){Object.assign(UI.f,{prmin:'',prmax:'',prfrom:'',prto:'',prtf:'',prtt:''});if(UI.f.pr)Object.assign(UI.f.pr,{gids:[],pids:[],days:[0,1,2,3,4,5,6],tfn:true,comb:true});render()}return r};
const _psave=A.promosave;A.promosave=function(){const f=UI.f.pr;if(!f||f.type!=='Discount'||!f.days)return _psave.apply(this,arguments);
 const name=(UI.f.prname||'').trim(),p=+UI.f.prp;if(!name||!(p>0))return toast('Fyll i namn och värde');if(!f.days.length)return toast('Välj minst en veckodag');
 const auto=mtop().d.id!=='manual';
 S.promotions.unshift({id:'pr'+Date.now(),name,desc:UI.f.prdesc||'',type:f.unit==='kr'?'Discount kr':'Discount %',auto,ext:1,from:UI.f.prfrom||now().slice(0,10),to:f.tfn?'':(UI.f.prto||''),
  rule:{[f.unit==='kr'?'kr':'pct']:p,gids:[...f.gids],pids:[...f.pids],min:+UI.f.prmin||0,max:+UI.f.prmax||0,days:[...f.days],tf:UI.f.prtf||'',tt:UI.f.prtt||'',comb:f.comb},active:f.active!==false});
 save();pop();toast('Kampanjen är sparad');emit('promo:save')};
const elig=(pr,pid)=>{const r=pr.rule;if(!r.gids.length&&!r.pids.length)return true;return r.pids.includes(pid)||r.gids.includes(P(pid)?.gid)};
const liveNow=pr=>{const d=new Date(),wd=(d.getDay()+6)%7,r=pr.rule,t=now().slice(0,10);if(!r.days.includes(wd))return false;if(pr.from&&t<pr.from)return false;if(pr.to&&t>pr.to)return false;
 if(r.tf&&r.tt){const hm=d.toTimeString().slice(0,5);if(hm<r.tf||hm>r.tt)return false}return true};
const extPromos=()=>S.promotions.filter(p=>p.ext&&p.auto&&p.active&&liveNow(p));
const _pc=promoCalc;promoCalc=function(c=C()){const res=_pc(c);if(c.ret)return res;
 extPromos().forEach(pr=>{const r=pr.rule;const its=c.items.filter(it=>elig(pr,it.pid));const sum=its.reduce((a,it)=>a+lineTot(it),0);if(!its.length||sum<(r.min||0))return;
  let d=r.pct?sum*r.pct/100:Math.min(sum,r.kr);if(r.kr&&r.max>1&&r.min>0)d=Math.min(sum,r.kr*Math.min(r.max,Math.floor(sum/r.min)));d=Math.round(d*100)/100;if(d>0){res.disc+=d;res.lines.push([pr.name,d])}});
 return res};
const _rp7=rightPanel;rightPanel=function(){let h=_rp7();const c=C();if(!c.items.length||c.ret)return h;
 const rel=extPromos().filter(pr=>c.items.some(it=>elig(pr,it.pid)));if(!rel.length)return h;
 const ban=`<button class="promo" data-a="promodet" data-g="promo-details">ⓘ Promotion is available <u>Show details</u></button>`;
 if(/data-g="promo-banner"/.test(h))return h.replace(/<button class="promo" data-a="promoshow" data-g="promo-banner">[^]*?<\/button>/,ban);
 return h.replace(/(<div class="cart-l" id="cartl"[^>]*>)/,'$1'+ban)};
PAGES.promodet=()=>{const c=C();const rel=extPromos().filter(pr=>c.items.some(it=>elig(pr,it.pid)));
 return {white:true,title:'',bodyCss:'padding:16px 26px 90px',body:`<div class="pdh">This item can be part of one or more promotions</div>${rel.map(pr=>{const r=pr.rule;
  const cond=r.gids.map(g=>`– Selected products from the group ${esc(G(g)?.name||'')}`).concat(r.pids.map(p=>`– ${esc(P(p)?.name||'')}`));const sum=c.items.filter(it=>elig(pr,it.pid)).reduce((a,it)=>a+lineTot(it),0);
  return `<div style="font-size:14px;font-weight:700;display:flex;align-items:center;gap:8px"><span class="radio on" style="margin:0"><i></i></span>${esc(pr.name)} <span style="font-weight:400;color:#8e8e93;font-size:12px">(${r.pct?r.pct+' %':kr(r.kr)})</span></div>
   <div class="pdk">Locations</div><div style="font-size:12.5px">${esc(S.store)}</div>
   <div class="pdk">Conditions for the promotion</div><div style="font-size:12.5px;line-height:1.6">${cond.join('<br>')||'– All products'}</div>
   ${r.min?`<div class="pdk">Minimum purchase for the promotion to apply</div><div style="font-size:12.5px">${kr(r.min)} <span style="color:${sum>=r.min?'#34c759':'#8e8e93'}">(${sum>=r.min?'uppfyllt':'kvar: '+kr(r.min-sum)})</span></div>`:''}
   <div class="pdk">The promotion is active</div><div style="font-size:12.5px">From: ${esc(pr.from||'')}${pr.to?' &nbsp;To: '+esc(pr.to):' &nbsp;(until further notice)'}${r.days.length<7?'<br>'+r.days.map(i=>DAYS[i]).join(', '):''}</div><hr style="border:0;border-top:1px solid #e1e1e6;margin:16px 0">`}).join('')}${(()=>{const man=S.promotions.filter(p=>p.active&&!p.auto&&!(c.promos||[]).includes(p.id));return man.length?`<div class="pdk">Manual promotions</div><div class="grp">${man.map(p=>row(p.name,{a:'promoapply',x:p.id,html:`<b>${esc(p.name)}</b>&nbsp;(${esc(p.type)})`,val:'Apply'})).join('')}</div>`:''})()}`,
  foot:`<button class="btnb" style="min-width:290px" data-a="pdok" data-g="pd-ok">OK</button>`}};
A.promodet=()=>{openModal('promodet',{});render()};A.pdok=()=>{closeModal();render();emit('promo:details')};

/* ───────── Allergens on products + recommended products ───────── */
const INFO={'Caffè latte':[['Vegetarian'],['Milk']],'Cappuccino':[['Vegetarian'],['Milk']],'Flat white':[['Vegetarian'],['Milk']],'Chai latte':[['Vegetarian'],['Milk']],'Varm choklad':[['Vegetarian'],['Milk']],
 'Kanelbulle':[['Vegetarian'],['Gluten','Milk','Eggs']],'Kardemummabulle':[['Vegetarian'],['Gluten','Milk','Eggs']],'Croissant':[['Vegetarian'],['Gluten','Milk']],'Chokladboll':[['Vegetarian'],['Milk']],'Morotskaka':[['Vegetarian'],['Gluten','Eggs','Milk','Nuts']],
 'Räksmörgås':[[],['Crustaceans','Gluten','Eggs']],'Ost & skinka':[[],['Gluten','Milk']],'Halloumi wrap':[['Vegetarian'],['Gluten','Milk']],'Bryggkaffe':[['Vegan'],[]],'Espresso':[['Vegan'],[]]};
const REC={'Kanelbulle':['Bryggkaffe','Cappuccino'],'Kardemummabulle':['Bryggkaffe','Caffè latte'],'Bryggkaffe':['Kanelbulle','Croissant'],'Cappuccino':['Kanelbulle','Chokladboll'],'Caffè latte':['Croissant','Kardemummabulle'],'Räksmörgås':['Mineralvatten','Lemonad'],'Halloumi wrap':['Apelsinjuice','Lemonad']};
const icons=name=>{const i=INFO[name];if(!i)return '';const l=[...i[0].map(n=>DIETS.find(x=>x[0]===n)),...i[1].map(n=>ALLERG.find(x=>x[0]===n))].filter(Boolean);
 return l.length?`<div class="alics">${l.map(([n,c,s])=>`<span title="${n}" style="background:${c}">${s}</span>`).join('')}<small style="align-self:center;color:#8e8e93;font-size:10.5px;margin-left:4px">${l.map(x=>x[0]).join(', ')}</small></div>`:''};
window.prodAllergens=n=>INFO[n]||null;
const _mods=PAGES.mods;PAGES.mods=d=>{const r=_mods(d);const p=P(d.pid);r.body=r.body.replace(/(<div style="font-size:21px">[^<]*<\/div>)/,'$1'+icons(p.name));
 if(p.desc)r.body+=`<div class="mlbl" style="margin-top:16px">Description</div><p style="font-size:12px;color:#3a3a3c;margin:4px 0 0">${esc(p.desc)}</p>`;return r};
on((e,d)=>{if(e==='add'&&d&&REC[d.name]){UI.rec=d.name}if(e==='paid'||e==='bin')UI.rec=null});
const _lp7=leftPanel;leftPanel=function(){let h=_lp7();const c=C();if(!UI.rec||!c.items.length||c.ret||UI.edit||UI.tables||UI.online)return h;
 const ps=REC[UI.rec].map(n=>S.products.find(p=>p.name===n)).filter(Boolean);if(!ps.length)return h;
 const strip=`<div class="recs"><div class="h">★ Recommended items for ${esc(UI.rec)}<button data-a="recx">✕</button></div>${ps.map(p=>`<button class="rt" style="background:${G(p.gid)?.color||'#eee'}" data-a="tap" data-x="${p.id}" data-g="rec-${slug(p.name)}">${esc(p.name)}<small>${kr(p.price)}</small></button>`).join('')}</div>`;
 return h.replace(/<\/div>$/,strip+'</div>')};
A.recx=()=>{UI.rec=null;render()};

/* ───────── Receipt copy: choose SMS, email or print ───────── */
const _rc=PAGES.receipt;PAGES.receipt=d=>{const r=_rc(d);if(d.kind!=='order'||d.title!=='Receipt Copy')return r;
 r.foot=`<div style="width:100%;text-align:center"><div style="font-size:12px;font-weight:600;margin-bottom:8px">Choose receipt type</div><div style="display:flex;gap:10px;justify-content:center">
  <button class="btnb" style="min-width:150px" data-a="rcvia" data-x="sms" data-g="rcc-sms">${IC.phone||''} SMS</button><button class="btnb" style="min-width:150px" data-a="rcvia" data-x="email" data-g="rcc-email">✉ Email</button><button class="btnb" style="min-width:150px" data-a="rcprint" data-g="rcc-print">${IC.printer||''} Print</button></div></div>`;return r};
PAGES.rcsend=d=>({title:d.via==='sms'?'Send receipt by SMS':'Send receipt by email',body:d.via==='sms'?fld('Mobile number','rcto',{ph:'+46 70 123 45 67',mode:'tel'}):fld('Email','rcto',{ph:'namn@exempel.se'}),
 foot:`<button class="btnb" style="min-width:290px" data-a="rcsend" data-g="rcc-send">Send</button>`});
Object.assign(A,{rcvia(v){UI.f.rcto='';push('rcsend',{via:v})},rcsend(){const v=(UI.f.rcto||'').trim(),via=mtop().d.via;if(!v)return toast(via==='sms'?'Skriv ett mobilnummer':'Skriv en e-postadress');pop();toast(via==='sms'?'Kvittot skickas som SMS till '+v:'Kvittot skickas till '+v);emit('rcopy:send',via)},
 rcprint(){toast('Kvittokopian skrivs ut på '+S.printer.name);emit('rcopy:print')}});
})();
