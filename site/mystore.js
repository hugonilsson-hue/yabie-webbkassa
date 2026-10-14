/* My Store: menu, order history & returns, reports, product catalog, start pages, settings, hardware. */
const STUB={
  'Time Tracking':'Personalliggare: personalen checkar in och ut i kassan. Listan skickas till Skatteverket vid kontroll.',
  'Yabie gift cards':'Sälj och lös in Yabie-presentkort. Saldot kontrolleras direkt i kassan.',
  'Tipping':'Dricks läggs till vid kortbetalning och redovisas per anställd i rapporterna.',
  'Customers':'Kundregister med köphistorik, lojalitet och fakturauppgifter.',
  'Courses':'Rätter i omgångar (förrätt, varmrätt, dessert) som skickas till köket i tur och ordning.',
  'Functions':'Välj vilka funktioner som visas under FUNCTIONS och i vilken ordning.',
  'Guests':'Antal gäster per order, används i rapporter för snittnota.',
  'News':'Nyheter och uppdateringar i Yabie Express.',
  'Journal':'Journalen är en detaljerad lista över all försäljning sedan start. Den används vid Skatteverkets kontrollbesök och skickas till din e-post.',
  'Period report':'Försäljning för valfri period: skriv ut, mejla eller visa på skärmen.',
};
PAGES.stub=d=>({title:esc(d.name),body:`<div class="grp" style="padding:22px;margin-top:20px"><p style="margin:0 0 10px;font-size:14px">${esc(STUB[d.name]||'')}</p><p style="margin:0;color:#8e8e93">${NOTDEMO}</p></div>`});

PAGES.ms=()=>({title:`My Store - ${esc(S.store)}`,bodyCss:'padding-top:30px',body:`
 <div class="grp"><div class="row" style="cursor:default"><b style="font-size:16px">${esc(S.register)}</b><span style="margin-left:14px">demo@kaffebaren.se</span></div></div>
 <div class="tiles4" style="margin-top:22px">
  <button class="bigt" data-a="go" data-x="z" data-g="ms-z">${IC.report}Z-Report</button><button class="bigt" data-a="go" data-x="analytics" data-g="ms-analytics">${IC.chart}Analytics</button>
  <button class="bigt" data-a="go" data-x="orders" data-g="ms-orders">${IC.receipt}Order History</button><button class="bigt" data-a="go" data-x="help" data-g="ms-help">${IC.help}Help</button></div>
 <div class="grp" style="margin-top:22px">${row('News',{a:'stub',x:'News',html:'<b>News:</b> Nyheter i Yabie Express',val:'<span class="badge" style="position:static;display:inline-grid">2</span>'})}</div>
 <div class="sec">Store</div><div class="grp">${row('Order History (Returns & Receipt copy)',{a:'go',x:'orders',ic:'receipt',g:'row-orders'})}${row('Reports & Analytics',{a:'go',x:'reports',ic:'chart',g:'row-reports'})}${row('Product Catalog',{a:'go',x:'catalog',ic:'book',g:'row-catalog'})}</div>
 <div class="sec">Administration</div><div class="grp">${['Time Tracking:clock','Yabie gift cards:gift','Tipping:tip','Customers:users','Courses:cloche'].map(s=>{const[n,i]=s.split(':');return row(n,{a:'stub',x:n,ic:i})}).join('')}</div>
 <div class="sec">Settings</div><div class="grp">${row('Layouts/Start Pages',{a:'go',x:'spages',ic:'grid',g:'row-layouts'})}${row('Payment Methods',{a:'go',x:'paymethods',ic:'pay',g:'row-paymethods'})}${row('Functions',{a:'stub',x:'Functions',ic:'fn'})}${row('Discount Buttons',{a:'go',x:'discbtns',ic:'tag',g:'row-discbtns'})}${row('Guests',{a:'stub',x:'Guests',ic:'users'})}${row('Cashier Management',{a:'go',x:'cashiers',ic:'user'})}${row('Other Settings',{a:'go',x:'other',ic:'cog'})}</div>
 <div class="sec">Hardware</div><div class="grp">${row('Payment Terminals',{a:'go',x:'terminals',ic:'term',g:'row-terminals'})}${row('Printers',{a:'go',x:'printers',ic:'printer',g:'row-printers'})}${row('Customer Display',{a:'go',x:'custdisp',ic:'display',g:'row-custdisp'})}</div>
 <div class="sec">Other</div><div class="grp">${row('Support',{a:'go',x:'help',ic:'help'})}${row('About',{a:'go',x:'about',ic:'info'})}</div>
 <div class="grp" style="margin-top:22px">${row('Logout from POS',{a:'logout',cls:'red',right:false})}</div>`});

/* ── order history & returns ── */
const badge=(t,c)=>`<span style="font-size:10.5px;font-weight:600;padding:2px 6px;border-radius:4px;margin-left:8px;background:${c==='g'?'#dff5e3':c==='r'?'#fde2e2':'#e1ebfd'};color:${c==='g'?'#2f9e4f':c==='r'?'#d33':'#3478f6'}">${t}</span>`;
PAGES.orders=()=>{const q=(UI.f.q||'').toLowerCase();const list=S.orders.filter(o=>!q||o.id.toLowerCase().includes(q));
  return {title:'Order History',bodyCss:'padding:0 0 30px',body:`<div style="background:#e3e3e8;padding:10px 12px"><div class="srch" style="background:none">${IC.search}<input data-in="q" data-live="1" placeholder="Search" value="${esc(UI.f.q||'')}"></div></div>
   <div style="background:#fff;display:flex;justify-content:flex-end;gap:28px;padding:11px 12px;font-size:13px;border-bottom:1px solid #e1e1e6"><span><b>From:</b>&nbsp;&nbsp;&nbsp; ${now().slice(0,8)}01</span><span><b>To:</b>&nbsp;&nbsp;&nbsp; ${now().slice(0,10)}</span></div>
   <div style="background:#fff;min-height:620px">${list.map((o,i)=>{const r=o.history.length>1;return `<button class="row" style="min-height:55px;padding:0 24px" data-a="go" data-x="order" data-y="${o.id}" data-g="order-${i}"><span><b style="font-size:15px;font-weight:600">${o.id}</b>${badge(r?'Returned':'Paid',r?'r':'g')}${badge(o.history[0].method,'b')}<br><small style="color:#8e8e93">${o.at}</small></span><span class="chev"><b style="color:#1c1c1e;font-size:15px">${kr(o.total)}</b>${IC.chev}</span></button>`}).join('')||'<p style="text-align:center;color:#8e8e93;padding-top:80px">Inga ordrar ännu. Sälj något i kassan så dyker det upp här.</p>'}</div>`}};
PAGES.order=d=>{const o=S.orders.find(x=>x.id===d.id);if(!o)return{title:'',body:''};const sel=d.sel,ch=UI.f.ret||{};
  const left=it=>it.qty-(it.returned||0);const any=Object.values(ch).some(Boolean);const can=o.items.some(i=>left(i)>0);
  return {white:true,title:o.id,body:`<div style="font-size:15px"><b>Order number:</b> ${o.id}</div><div style="font-size:12.5px;margin-top:3px"><b>Customer:</b> ${esc(o.customer||'Walk-in Customer')}&nbsp;&nbsp;&nbsp;&nbsp; <b>Created:</b> ${o.at}<br><b>Store:</b> ${esc(S.store)}</div><hr style="border:0;border-top:1px solid #e1e1e6;margin:18px 0 14px">
   <div style="display:flex;justify-content:${sel?'space-between':'flex-end'};height:22px">${sel?`<button style="color:var(--blue)" data-a="retall" data-g="ret-all">${Object.keys(ch).length&&any?'Uncheck everything':'Check everything'}</button><button style="color:var(--blue)" data-a="retcancel">Cancel</button>`:(can?`<button style="color:var(--blue);display:flex;gap:6px;align-items:center" data-a="retstart" data-g="ret-select">${IC.basket.replace('<svg','<svg style="width:16px;height:16px"')} Select items to return</button>`:'')}</div>
   <div class="shead">Items <span style="color:#6b6b70;font-weight:400">(${o.items.length})</span></div><table class="tbl"><tr><th>Qty</th><th>Item</th><th class="n">Unit price</th><th>Status</th><th class="n">Paid</th></tr>${o.items.map((it,i)=>`<tr>${sel?`<td><button data-a="retchk" data-x="${i}" data-g="ret-chk-${i}" ${left(it)>0?'':'disabled'} style="display:inline-flex;gap:6px;align-items:center"><span class="radio ${ch[i]?'on':''}" style="margin:0"><i></i></span>${left(it)}</button></td>`:`<td>${it.qty}</td>`}<td><b>${esc(it.name)}</b></td><td class="n">${n2(it.price)} kr</td><td>${it.returned?`<span style="color:var(--red)">${it.returned} returned</span>`:'<span style="color:#5cc26f">✓</span>'}</td><td class="n"><b>${n2(lineTot(it))} kr</b></td></tr>`).join('')}</table>
   <div class="shead" style="margin-top:20px">History</div>${o.history.map(h=>`<div style="font-size:12.5px;padding:10px 4px 6px"><b>Date:</b> ${h.at}${h.reason?` &nbsp; <b>Orsak:</b> ${esc(h.reason)}`:''}</div><table class="tbl"><tr><th>Qty</th><th>Item</th><th class="n">Unit price</th><th class="n">Paid</th></tr>${h.items.map(it=>`<tr><td>${it.qty}</td><td><b>${esc(it.name)}</b></td><td class="n">${n2(it.price)} kr</td><td class="n"><b>${n2(lineTot(it))} kr</b></td></tr>`).join('')}</table><div style="display:flex;justify-content:space-between;padding:10px 15px;font-size:13px"><span><b>Payments:</b> ${esc(h.method)}</span><span><b>${h.paid<0?'Refunded':'Paid now'}:</b> ${kr(h.paid)}</span></div>`).join('')}
   <div style="text-align:right;padding:0 15px"><button style="color:var(--blue)" data-a="rcopy" data-g="receipt-copy">${IC.receipt.replace('<svg','<svg style="width:16px;height:16px;vertical-align:-3px"')} Receipt Copy</button></div>`,
   foot:`<button class="btnb ${sel&&any?'':'dis'}" data-a="retgo" data-g="ret-go">Return items</button>`}};
PAGES.pin=d=>({white:true,title:'Enter PIN',body:`<div style="height:150px"></div><div class="info">${IC.info.replace('<svg','<svg style="width:16px;height:16px;flex:none"')} Enter a user PIN with permission for this action</div><div class="pin">${[0,1,2,3].map(i=>`<i class="${(UI.f.pin||'').length>i?'f':''}"></i>`).join('')}</div>${pad('pinkey')}<p style="text-align:center;color:#8e8e93;font-size:12px">Demo: Ägare har PIN 1234.</p>`});
PAGES.retreason=d=>{const o=S.orders.find(x=>x.id===d.id),ch=UI.f.ret||{};
  return {white:true,title:'Return items',body:`<div class="sec" style="margin-top:4px">Reason</div><div class="fld" style="border:1px solid #e1e1e6;height:46px"><input data-in="reason" data-g="in-reason" value="${esc(UI.f.reason||'')}" placeholder=""></div>
   <div style="background:#e6e6ea;font-weight:600;padding:8px 9px;border-radius:2px">Items without stock management</div>${o.items.filter((_,i)=>ch[i]).map(it=>`<div style="padding:12px 9px;font-weight:600">${it.qty-(it.returned||0)}&nbsp; ${esc(it.name)}</div>`).join('')}`,
   foot:`<button class="btnb" data-a="retnext" data-g="ret-next">Next</button>`}};

/* ── reports ── */
function zFrom(orders,at){const z={at,count:0,returns:0,total:0,vat12:0,vat6:0,vat25:0,methods:{}};
  orders.forEach(o=>o.history.forEach(h=>{z.total+=h.paid;if(h.paid<0)z.returns++;else z.count++;z.methods[h.method]=(z.methods[h.method]||0)+h.paid;
    h.items.forEach(it=>{const v=(it.ta??o.takeaway)&&G(P(it.pid)?.gid)?.vat===12?6:(G(P(it.pid)?.gid)?.vat||25);const amt=lineTot(it)*(1-(o.orderDisc||0)/100);z['vat'+v]=(z['vat'+v]||0)+amt-amt/(1+v/100)})}));
  z.grand=S.zreports.reduce((a,r)=>a+r.total,0)+z.total;return z}
const sinceZ=()=>S.orders.slice(0,Math.max(0,S.orders.length-S.lastZ));
PAGES.z=()=>({title:'End of Day',bodyCss:'padding-top:16px',body:`<div class="sec" style="margin-top:0">Past reports</div><div class="grp plain">${S.zreports.slice().reverse().slice(0,7).map((z,i)=>row(z.at,{a:'zview',x:S.zreports.length-1-i,val:i===0?'Latest':'',nochev:1,g:'z-'+i})).join('')}${row('See more reports',{a:'nop',nochev:1})}</div>
  <div class="grp" style="margin-top:24px">${row('Manual End of Day',{a:'go',x:'zconfirm',cls:'lk',nochev:1,g:'z-manual'})}</div>
  <div class="grp" style="margin-top:24px;padding:12px;font-size:12.5px;color:#6b6b70">Dagsavslut görs automatiskt kl. ${S.eod||'22:00'} varje dag. Manuellt dagsavslut stänger dagen direkt.</div>`});
PAGES.zconfirm=()=>{const o=sinceZ();return {title:'Manual End of Day',body:`<div class="grp" style="padding:20px;margin-top:20px"><p style="margin:0 0 8px;font-size:15px"><b>Gör dagsavslut nu?</b></p><p style="margin:0;color:#6b6b70">Z-rapporten stänger dagen med alla ${o.length} ordrar sedan förra avslutet, totalt ${kr(o.reduce((a,x)=>a+x.history.reduce((b,h)=>b+h.paid,0),0))}. Ett dagsavslut går inte att ångra.</p></div>`,foot:`<button class="btnb" data-a="zcreate" data-g="z-create">Create Z-Report</button>`}};
PAGES.reports=()=>({title:'Reports & Analytics',body:`<div class="sec">Rapporter</div><div class="grp">${row('Z-Report',{a:'go',x:'z',ic:'report',g:'rep-z'})}${row('X-Report',{a:'go',x:'xrep',ic:'report',g:'rep-x'})}${row('Journal',{a:'stub',x:'Journal',ic:'book'})}${row('Period report',{a:'stub',x:'Period report',ic:'clock'})}${row('Statistics',{a:'go',x:'analytics',ic:'chart'})}</div>`});
PAGES.xrep=()=>{const o=UI.f.xout||'show';return {title:'X-Report',body:`<p style="color:#6b6b70">X-rapporten visar dagens försäljning utan att stänga dagen.</p><div class="sec">Utdata</div><div class="grp plain">${[['print','Print'],['email','Email'],['show','Show on screen']].map(([k,l])=>row(l,{a:'xout',x:k,html:`<span class="radio ${o===k?'on':''}"><i></i>${l}</span>`,nochev:1})).join('')}</div>`,foot:`<button class="btnb" data-a="xcreate" data-g="x-create">Create Report</button>`}};
PAGES.analytics=()=>{const today=now().slice(0,10),os=S.orders.filter(o=>o.at.startsWith(today));const tot=os.reduce((a,o)=>a+o.history.reduce((b,h)=>b+h.paid,0),0);
  const hrs=Array(24).fill(0);os.forEach(o=>{hrs[+o.at.slice(12,14)]+=o.total});const mx=Math.max(1,...hrs.slice(7,21));
  const top={};os.forEach(o=>o.items.forEach(i=>top[i.name]=(top[i.name]||0)+i.qty));
  return {title:'Analytics',body:`<div class="kpi"><div>Försäljning idag<b>${kr(tot)}</b></div><div>Antal köp<b>${os.length}</b></div><div>Snittköp<b>${kr(os.length?tot/os.length:0)}</b></div></div>
   <div class="bars">${hrs.slice(7,21).map((v,i)=>`<i style="height:${100*v/mx}%"><span>${i+7}</span></i>`).join('')}</div>
   <div class="sec" style="margin-top:28px">Mest sålt idag</div><div class="grp plain">${Object.entries(top).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,v])=>row(k,{val:v+' st',nochev:1})).join('')||'<p style="padding:12px;color:#8e8e93;margin:0">Ingen försäljning idag ännu.</p>'}</div>`}};

/* ── product catalog ── */
PAGES.catalog=()=>({title:'Product Catalog',body:`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px">
  <button class="bigt" data-a="go" data-x="mpg" data-g="cat-mpg">${IC.shapes}Manage products & groups</button><button class="bigt" data-a="stub" data-x="Functions">${IC.notes}Manage modifiers</button><button class="bigt" data-a="stub" data-x="News">${IC.tools}Magic Menu</button></div>
  <div class="sec">Overview</div><div class="grp plain">${row('Products',{val:S.products.length,nochev:1})}${row('Product groups',{val:S.groups.length,nochev:1})}${row('Start pages',{val:S.startPages.length,nochev:1})}</div>`});
PAGES.mpg=()=>{const t=UI.f.mtab||'p',q=(UI.f.q||'').toLowerCase();
  const list=t==='p'?S.products.filter(p=>!q||p.name.toLowerCase().includes(q)).map(p=>row(p.name,{a:'go',x:'prodform',y:p.id,g:'prod-'+slug(p.name),html:`<span style="color:var(--blue);margin-right:4px">${IC.pen.replace('<svg','<svg style="width:15px;height:15px;vertical-align:-2px"')}</span> ${esc(p.name)}`,val:kr(p.price)})).join('')
    :S.groups.filter(g=>!q||g.name.toLowerCase().includes(q)).map(g=>row(g.name,{a:'go',x:'grpform',y:g.id,g:'grp-'+slug(g.name),html:`<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${g.color};margin-right:6px;vertical-align:-1px"></span>${esc(g.name)}`,val:g.vat+' % moms'})).join('');
  return {title:'Manage products & groups',bodyCss:'padding-top:4px',body:`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><button class="bigt" data-a="go" data-x="prodform" data-g="mpg-newprod">${IC.shapes}Create new product</button><button class="bigt" data-a="go" data-x="grpform" data-g="mpg-newgrp">${IC.groups}Create new group</button></div><hr style="border:0;border-top:1px solid #cfcfd4;margin:22px 0 0">
   <div class="seg"><button class="${t==='p'?'on':''}" data-a="mtab" data-x="p">Products (${S.products.length})</button><button class="${t==='g'?'on':''}" data-a="mtab" data-x="g" data-g="mpg-groups">Groups (${S.groups.length})</button></div>
   <div class="srch" style="margin-bottom:22px">${IC.search}<input data-in="q" data-live="1" placeholder="Search articles" value="${esc(UI.f.q||'')}"></div><div class="sec">${t==='p'?'Products':'Groups'}</div><div class="grp plain list">${list}</div>`}};
PAGES.prodform=d=>{const f=UI.f.pf;const g=G(f.gid);
  return {title:d.id?'Edit product':'Create new product',body:`${fld('Name*','pname',{ph:'Product name'})}
   <button class="fld" style="width:100%" data-a="go" data-x="pickgroup" data-g="pf-group"><label>Product group*</label><span class="rt" style="color:${g?'#1c1c1e':'#8e8e93'}">${g?esc(g.name):'Choose'} <span style="color:var(--blue)">${IC.chev.replace('<svg','<svg style="width:11px;height:11px"')}</span></span></button>
   <div class="sec" style="margin-top:0">Price*</div><div style="margin-bottom:10px"><span class="radio on"><i></i>Fixed price</span><span class="radio" data-a="nop"><i></i>Variable price</span></div>
   <button class="fld" style="width:100%" data-a="go" data-x="price" data-g="pf-price"><label>Default price (${g?g.vat:0}% VAT)</label><span class="rt" style="color:#1c1c1e">${n2(f.price||0)} kr <span style="color:var(--blue)">${IC.chev.replace('<svg','<svg style="width:11px;height:11px"')}</span></span></button>
   <div class="sec">Additional information</div><div class="fld tall"><label>Description</label><input data-in="pdesc" value="${esc(UI.f.pdesc||'')}" placeholder="Product description"></div>
   <div class="fld">Unit<span class="rt" style="color:#1c1c1e">Units</span></div><div class="fld">Can be sold<span class="rt"><span class="tog on"></span></span></div>
   ${d.id?`<div class="grp plain">${row('Ta bort produkten',{a:'proddel',cls:'red',nochev:1})}</div>`:''}`,
   foot:`<button class="btnb red" style="min-width:224px" data-a="mback">Cancel</button><button class="btnb" style="min-width:224px" data-a="prodsave" data-x="copy">${IC.copy} Save & Copy</button><button class="btnb" style="min-width:224px" data-a="prodsave" data-g="pf-save">${IC.save} Save</button>`}};
PAGES.pickgroup=()=>({title:'Choose product group',right:`<button class="txt" style="right:7px" data-a="mback" data-g="pg-done">Done</button>`,body:`<div class="grp plain">${S.groups.map(g=>row(g.name,{a:'pickgrp',x:g.id,g:'pg-'+slug(g.name),html:`<span class="radio ${UI.f.pf.gid===g.id?'on':''}"><i></i><b>${esc(g.name)}</b></span>`,nochev:1})).join('')}</div>`});
PAGES.price=()=>({title:'Amount Entry',body:`<div class="amt" style="margin-top:20px"><small>Enter amount</small>${UI.f.amt||'0'},00 kr</div>${pad('amtkey')}`,foot:`<button class="btnb" data-a="amtok" data-g="amt-done">Done</button>`});
PAGES.grpform=d=>{const v=UI.f.vat;return {title:d.id?'Edit product group':'Add new product group',body:`${fld('Product group name*','gname',{ph:'Product group name'})}
   <div class="fld" data-g="gf-vat">VAT Group<span class="rt" style="gap:4px">${[25,12,6,0].map(x=>`<button class="btnb ${v===x?'':'g'}" style="min-width:52px;height:28px;padding:0" data-a="vat" data-x="${x}" data-g="vat-${x}">${x} %</button>`).join('')}</span></div>
   <div class="sec">Additional information</div><div class="fld tall"><label>Description</label><input data-in="gdesc" placeholder="Product group description" value="${esc(UI.f.gdesc||'')}"></div>
   <div class="fld"><label>General ledger account*</label><input value="${v!=null?VAT_LEDGER[v]:''}" placeholder="General ledger account*" readonly></div>
   <div class="fld"><label>External ID</label><input placeholder="External ID"></div>
   <div class="sec">Färg</div><div class="colors">${COLORS.map(c=>`<button class="${UI.f.gcolor===c?'on':''}" style="background:${c}" data-a="gcolor" data-x="${c}"></button>`).join('')}</div>`,
   foot:`<button class="btnb" data-a="grpsave" data-g="gf-save">${IC.save} Save</button>`}};

/* ── start pages & tiles ── */
PAGES.spages=()=>({title:'Layouts/Start Pages',right:UI.edit?`<button class="txt" style="right:7px" data-a="mclose" data-g="sp-done">Done</button>`:'',noClose:!!UI.edit,body:`<div class="sec">Create start page</div>
  <div class="fld" style="padding-right:4px"><input data-in="spname" data-g="in-spname" placeholder="Name Start Page" value="${esc(UI.f.spname||'')}"><button class="btnb ${UI.f.spname?'':'dis'}" style="min-width:69px;height:31px" data-a="spcreate" data-g="sp-create">Create</button></div>
  <div class="sec">Start pages</div><div class="grp plain">${S.startPages.map(s=>row(s.name,{a:'spcolor',x:s.id,html:esc(s.name),right:true,nochev:1,val:`<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${s.color};vertical-align:middle"></span> <span data-a="spdel" data-x="${s.id}" style="color:var(--red);margin-left:10px">Ta bort</span>`})).join('')}</div>
  ${UI.edit?'':`<p style="color:#8e8e93;font-size:12.5px">Knappar på startsidorna lägger du till med <b>Edit</b> i kassan.</p>`}`});
PAGES.addtile=d=>({title:'Add tile',body:`<p style="text-align:center;margin:40px 0 30px">Pick what kind of tile you'd like to add — for quick access<br>to products or functions</p>
  <div style="display:grid;grid-template-columns:171px 171px;gap:12px;justify-content:center"><button class="bigt" style="height:123px" data-a="go" data-x="pickprod" data-y="${d.pos}" data-g="at-product">${IC.shapes}Product</button><button class="bigt" style="height:123px" data-a="go" data-x="pickgrp" data-y="${d.pos}" data-g="at-group">${IC.groups}Product group</button>
  <button class="bigt" style="height:123px" data-a="folder">${IC.folder}Folder</button><button class="bigt" style="height:123px" data-a="go" data-x="pickfn" data-y="${d.pos}" data-g="at-function">${IC.tools}Function</button></div>`});
PAGES.pickprod=d=>{const q=(UI.f.q||'').toLowerCase();return {title:'Add product',body:`<div class="srch" style="margin-top:8px">${IC.search}<input data-in="q" data-live="1" data-g="in-q" placeholder="Search products" value="${esc(UI.f.q||'')}"></div><div class="grp plain list" style="margin-top:40px">${S.products.filter(p=>!q||p.name.toLowerCase().includes(q)).map(p=>row(p.name,{a:'tilepick',x:'product:'+p.id,g:'pp-'+slug(p.name),html:`<b>${esc(p.name)}</b>&nbsp; ${kr(p.price)}`})).join('')}</div>`}};
PAGES.pickgrp=()=>({title:'Add product group',body:`<div class="grp plain list" style="margin-top:12px">${S.groups.map(g=>row(g.name,{a:'tilepick',x:'group:'+g.id,g:'pgr-'+slug(g.name)})).join('')}</div>`});
PAGES.pickfn=()=>({title:'Add function',body:`<div class="grp plain list" style="margin-top:12px">${Object.entries(FN).filter(([k])=>['discount','takeaway','printbill','openreturn','scan'].includes(k)).map(([k,f])=>row(f.name,{a:'tilepick',x:'function:'+k,g:'pf-'+k})).join('')}</div>`});
PAGES.tilestyle=d=>{const t=UI.f.tile;const name=t.type==='product'?P(t.ref).name:t.type==='group'?G(t.ref).name:FN[t.ref].name;const price=t.type==='product'?kr(P(t.ref).price):'';const c=t.color,st=t.style||'none';
  const card=(k,l,inner)=>`<button data-a="tstyle" data-x="${k}"><span class="radio ${st===k?'on':''}"><i></i>${l}</span><div class="pv" style="background:${k==='image'?'#e3e3e8':c}">${inner}</div></button>`;
  return {title:d.edit?'Edit tile':'Customize tile',body:`<div class="sec">Choose tile style <span style="color:var(--red)">*</span></div><div class="styl">${card('none','No image/icon',`${esc(name)}<span style="position:absolute;left:8px;bottom:8px;font-weight:500;font-size:11px">${price}</span>`)}${card('icon','Icon',`<div style="text-align:center;padding-top:22px">${IC.img.replace('<svg','<svg style="width:34px;height:34px;opacity:.6"')}<br>${esc(name)}<br><small style="font-weight:500">${price}</small></div>`)}${card('image','Image',`<div style="position:absolute;left:0;right:0;bottom:0;background:${c};padding:5px;text-align:center">${esc(name)}<br><small style="font-weight:500">${price}</small></div>`)}</div>
   <div class="sec" style="margin-top:22px">Choose color</div><div class="colors">${COLORS.map(x=>`<button class="${c===x?'on':''}" style="background:${x}" data-a="tcolor" data-x="${x}" data-g="col-${x.slice(1)}"></button>`).join('')}</div>
   ${d.edit?`<div class="grp plain" style="margin-top:22px">${row('Ta bort knappen',{a:'tileremove',cls:'red',nochev:1,g:'tile-remove'})}</div>`:''}`,
   foot:`<button class="btnb" data-a="tileadd" data-g="tile-add">${d.edit?'Save':t.type==='product'?'Add product':'Add tile'}</button>`}};

/* ── settings ── */
PAGES.paymethods=()=>({title:'Payment methods',body:`<div class="sec">Betalsätt i kassan</div><div class="grp">${S.payments.map(p=>row(p.name,{a:'pmtoggle',x:p.id,ic:p.icon,tog:p.enabled,g:'pmt-'+p.id})).join('')}</div>
  <div class="sec">Snabbknappar bredvid numpaden (max 2)</div><div class="grp plain">${S.payments.filter(p=>p.enabled).map(p=>row(p.name,{a:'pmquick',x:p.id,tog:p.quick,g:'pmq-'+p.id})).join('')}</div><p style="color:#8e8e93;font-size:12.5px">Kontant kräver en kassalåda kopplad till kvittoskrivaren. Lådan öppnas automatiskt vid kontantbetalning.</p>`});
PAGES.discbtns=()=>({title:'Discount buttons',body:`<div style="text-align:center;margin:10px 0 6px"><button class="btnb" data-a="go" data-x="discnew">${IC.plus} Create discount button</button><p style="color:#8e8e93;font-size:11.5px">Max 8 discount buttons.</p></div><div class="sec">Discount buttons</div><div class="grp plain">${S.discounts.map(x=>row(`${x.pct}% - ${x.name}`,{a:'discdel',x:x.id,val:'<span style="color:var(--red)">Ta bort</span>',nochev:1})).join('')}</div>`});
PAGES.discnew=()=>({title:'Create discount button',body:`${fld('Namn','dname',{ph:'t.ex. Personal'})}${fld('Procent','dpct',{ph:'10',mode:'numeric'})}`,foot:`<button class="btnb" data-a="discsave">Save</button>`});
PAGES.cashiers=()=>({title:'Cashier Management',body:`<div class="sec">Användare</div><div class="grp">${S.cashiers.map(c=>row(c.name,{ic:'user',val:c.role,nochev:1})).join('')}</div><p style="color:#8e8e93;font-size:12.5px">Användare och PIN-koder hanteras i Backstage under Användare.</p>`});
PAGES.other=()=>{const o=S.other;const r=(k,v,l)=>row(l,{a:'otherset',x:k+':'+v,html:`<span class="radio ${String(o[k])===String(v)?'on':''}"><i></i>${l}</span>`,nochev:1});
  return {title:'Other Settings',body:`<div class="sec">Tap behaviour for products</div><div class="grp plain">${r('tapProduct','add','Tap To Add To Basket')}${r('tapProduct','open','Tap To Open Product Details')}</div><p style="font-size:11.5px;color:#8e8e93">This will change the behaviour of tapping the listed products in the store view of the app.</p>
   <div class="sec">Select default for Eat In or Take-away</div><div class="grp plain">${r('defaultTakeaway','false','Eat in')}${r('defaultTakeaway','true','Take-away')}</div>`}};
PAGES.about=()=>({title:'About',body:`<div class="grp" style="padding:18px 20px;margin-top:10px"><b style="font-size:15px">${esc(S.store)} AB</b><br><span style="color:#6b6b70">Organization Number: 559999-0000<br>Storgatan 1, 111 22 Stockholm</span></div><div class="sec">App</div><div class="grp plain">${row('Version',{val:'Express (webbdemo)',nochev:1})}${row('Server',{val:'demo',nochev:1})}${row('Register Designation',{val:esc(S.register),nochev:1})}</div><div class="sec">Legal</div><div class="grp plain">${row('Model',{val:'YABIE EXPRESS-SE',nochev:1})}${row('Manufacturer',{val:'Yabie AB',nochev:1})}</div>`});
PAGES.help=()=>({title:'Help',body:`<div class="grp" style="padding:20px;margin-top:16px"><b style="font-size:15px">Yabie Support</b><p style="color:#6b6b70;margin:8px 0 0">Telefon 010-551 73 33 · support@yabie.com<br>Guider finns på support.yabie.com.</p></div><div class="sec">Vanliga frågor</div><div class="grp plain">${row('Hur gör jag en retur?',{a:'go',x:'orders'})}${row('Hur lägger jag till en produkt?',{a:'go',x:'mpg'})}${row('Hur gör jag dagsavslut?',{a:'go',x:'z'})}</div>`});

/* ── hardware ── */
PAGES.terminals=()=>({title:'Payment Terminals',body:`<div style="text-align:center;margin:12px 0 20px;color:#9a9aa0">${IC.term.replace('<svg','<svg style="width:70px;height:70px"')}</div>
  ${S.terminals.length?`<div class="sec">Anslutna terminaler</div><div class="grp plain">${S.terminals.map((t,i)=>row(`${t.prov} · ${t.ip}`,{a:'termforget',x:i,val:'<span style="color:#34c759">Connected</span> · <span style="color:var(--red)">Glöm</span>',nochev:1,g:'term-'+i})).join('')}</div><div class="sec">Lägg till</div>`:''}
  <div class="grp">${row('Swedbank Pax',{a:'go',x:'termprov',y:'Swedbank Pax',ic:'term',g:'prov-swedbank'})}${row('Yabie Pay',{a:'go',x:'termprov',y:'Yabie Pay',ic:'term',g:'prov-yabie'})}</div>`});
PAGES.termprov=d=>({title:esc(d.id),body:`<div style="text-align:center;font-size:30px;font-weight:700;margin:26px 0">${esc(d.id)}</div><div class="grp">${row('Add Terminals',{a:'go',x:'termip',y:d.id,cls:'lk',nochev:1,g:'term-add'})}</div>${d.id==='Yabie Pay'?'<p style="color:#8e8e93">Yabie Pay-terminaler med SIM-kort kopplas automatiskt. Ange IP-adress om terminalen sitter i ditt nätverk.</p>':''}`});
const ipBoxes=v=>{const p=(v||'').split('.');return `<div style="display:flex;gap:6px;justify-content:center;margin:12px 0" data-g="ip-fields">${[0,1,2,3].map(i=>`<span style="min-width:42px;height:34px;border-radius:6px;background:${i===Math.min(p.length-1,3)?'#d5d5db':'#e8e8ed'};display:grid;place-items:center;font-size:15px;font-weight:600">${p[i]??''}</span>`).join('')}</div>`};
PAGES.termip=d=>({white:true,title:'Add New Terminal',body:`<div style="text-align:center;margin-top:14px">Enter IP Address</div>${ipBoxes(UI.f.ip)}${pad('ipkey','.')}<p style="text-align:center;color:#8e8e93;font-size:12px">IP-adressen visas på terminalen under Start → Snabbinstallation.</p>`,foot:`<button class="btnb ${(UI.f.ip||'').split('.').length===4&&!/\.$/.test(UI.f.ip)?'':'dis'}" data-a="termadd" data-g="term-add-btn">Add Terminal</button>`});
PAGES.printers=()=>({title:'Printers',body:`<div class="sec">Receipt printer</div><div class="grp">${row(S.printer.name,{a:'go',x:'printer',ic:'printer',g:'printer-row',val:S.printer.connected?'<span style="color:#34c759">Connected</span>':'<span style="color:var(--red)">Not connected</span>'})}</div>
  <div class="sec">A4 printer</div><div class="grp">${row('No Printer Selected',{a:'nop'})}</div>
  <div class="sec">Printer to use for receipts</div><div class="grp plain">${[['receipt','The receipt printer'],['a4','The A4 printer']].map(([k,l])=>row(l,{a:'prto',x:k,html:`<span class="radio ${S.printer.receipts===k?'on':''}"><i></i>${l}</span>`,nochev:1})).join('')}</div><p style="font-size:11.5px;color:#8e8e93">NOTE: Transaction slips will always print on the Receipt printer.</p>`});
PAGES.printer=()=>({white:true,title:'Receipt printer',body:`<div style="text-align:center"><b style="font-size:15px">${esc(S.printer.name)}</b><br><span style="color:${S.printer.connected?'#34c759':'#ef4444'}">${S.printer.connected?'Ready':'Not connected'}</span></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;font-size:12.5px;margin:18px 0"><span><b>Connection:</b> LAN<br><b>Address:</b> 00:11:62:32:e8:74<br><b>Paper Size:</b> 2 inch</span><span><b>Cover:</b> –<br><b>Paper:</b> OK<br><b>Scanner:</b> –</span></div>
  <div style="display:flex;gap:14px;justify-content:center"><button class="btnb g" style="min-width:290px" data-a="prforget">Forget This Printer</button><button class="btnb" style="min-width:290px" data-a="prdemo" data-g="print-demo">Print Demo Receipt</button></div>
  <div class="sec">USB printers</div><div class="grp plain" style="background:#f2f2f6">${row('No printers connected',{nochev:1})}</div>
  <div class="sec">Local network printers</div><div class="grp plain" style="background:#f2f2f6">${['mC-Print3 E874','TSP100IV 64F6','mC-Print3 C6CA'].map(n=>row(n,{a:'prsel',x:n,ic:'printer',icbg:'#9a9aa0',val:S.printer.name===n?'<span style="color:var(--blue)">✓</span>':'',nochev:1})).join('')}</div>`});
PAGES.custdisp=()=>({title:'Customer Display',body:`<div class="sec">Customer Display Configuration</div><div class="grp">${row('IP Address',{a:'go',x:'dispip',g:'disp-ip',html:`IP Address: <b>${esc(S.display.ip||'–')}</b>`})}</div>
  <div class="sec">Status</div><div class="grp plain">${row('Auto connect to customer display',{a:'dispauto',tog:S.display.auto})}${row('Connect to customer display',{nochev:1,val:S.display.ip?'<span style="color:#34c759">● Connected</span>':'Ingen IP-adress'})}</div>
  <p style="color:#8e8e93;font-size:12.5px">Öppna appen Yabie Screen på kundskärmen. IP-adressen och en QR-kod visas på skärmen.</p>`});
PAGES.dispip=()=>({white:true,title:'IP Address',body:`<div style="text-align:center;margin-top:14px">Enter IP Address</div>${ipBoxes(UI.f.ip)}${pad('ipkey','.')}`,foot:`<button class="btnb g" style="min-width:290px" data-a="dispqr">${IC.qr} Scan QR Code</button><button class="btnb ${(UI.f.ip||'').split('.').length===4&&!/\.$/.test(UI.f.ip)?'':'dis'}" style="min-width:290px" data-a="dispok" data-g="disp-ok">OK</button>`});

/* ── actions ── */
Object.assign(A,{
  go(x,el){const y=el&&el.dataset.y;
    if(x==='prodform'){const p=y&&P(y);UI.f={...UI.f,pf:p?{id:p.id,gid:p.gid,price:p.price}:{gid:null,price:0},pname:p?p.name:'',pdesc:p?p.desc:''};return push(x,{id:y})}
    if(x==='grpform'){const g=y&&G(y);UI.f={...UI.f,gname:g?g.name:'',vat:g?g.vat:null,gcolor:g?g.color:COLORS[0],gdesc:''};return push(x,{id:y})}
    if(x==='price'){UI.f.amt=String(Math.round(UI.f.pf.price||0)||'');return push(x)}
    if(x==='order'){UI.f={...UI.f,ret:{}};return push(x,{id:y})}
    if(x==='termip'||x==='dispip'){UI.f.ip='';return push(x,{id:y})}
    if(['pickprod','pickgrp','pickfn'].includes(x)){UI.f.q='';return push(x,{pos:+y})}
    if(x==='orders'||x==='mpg'){UI.f.q=''}
    if(x==='discnew'){UI.f.dname='';UI.f.dpct=''}
    push(x,{id:y})},
  stub(x){push('stub',{name:x})},
  logout(){toast('I demon går det inte att logga ut.')},
  /* returns */
  retstart(){UI.f.pin='';push('pin',{next:'retselect'})},
  pinkey(k){let p=UI.f.pin||'';if(k==='⌫')p=p.slice(0,-1);else if(p.length<4)p+=k;UI.f.pin=p;render();if(p.length===4)setTimeout(()=>{const t=mtop();UI.modal.stack.pop();if(t.d.next==='retselect'){mtop().d.sel=true;UI.f.ret={}}emit('pin:ok');render()},250)},
  retall(){const o=S.orders.find(x=>x.id===mtop().d.id);const any=Object.values(UI.f.ret).some(Boolean);UI.f.ret={};if(!any)o.items.forEach((it,i)=>{if(it.qty-(it.returned||0)>0)UI.f.ret[i]=true});emit('ret:check');render()},
  retchk(i){UI.f.ret[i]=!UI.f.ret[i];emit('ret:check');render()},
  retcancel(){mtop().d.sel=false;UI.f.ret={};render()},
  retgo(){UI.f.reason='';push('retreason',{id:mtop().d.id})},
  retnext(){const o=S.orders.find(x=>x.id===mtop().d.id);S.cart={...newCart(),takeaway:o.takeaway,ret:o.id,reason:UI.f.reason||'',items:o.items.filter((_,i)=>UI.f.ret[i]).map(it=>({pid:it.pid,name:it.name,price:it.price,disc:it.disc,qty:-(it.qty-(it.returned||0))}))};UI.sel=null;save();UI.modal=null;emit('return:cart');render()},
  rcopy(){const o=S.orders.find(x=>x.id===mtop().d.id);push('receipt',{kind:'order',order:o,title:'Receipt Copy'})},
  /* reports */
  zview(i){const z=S.zreports[+i];push('receipt',{kind:'z',z,title:'Z-Report'})},
  zcreate(){const z=zFrom(sinceZ(),now());S.zreports.push(z);S.drawer={float:null,moves:[]};S.lastZ=S.orders.length;save();UI.modal.stack.pop();emit('z:create');push('receipt',{kind:'z',z,title:'Z-Report'})},
  xout(k){UI.f.xout=k;render()},
  xcreate(){const z=zFrom(sinceZ(),now());emit('x:create');if((UI.f.xout||'show')==='email'){toast('X-rapporten skickas med e-post');return}if(UI.f.xout==='print')toast('Skrivs ut på '+S.printer.name);push('receipt',{kind:'x',z,title:'X-Report'})},
  /* catalog */
  mtab(x){UI.f.mtab=x;UI.f.q='';render()},
  pickgrp(id){UI.f.pf.gid=id;emit('pick:group',G(id).name);render()},
  amtkey(k){let v=UI.f.amt||'';if(k==='⌫')v=v.slice(0,-1);else if(v.length<5)v=(v+k).replace(/^0+/,'');UI.f.amt=v;render()},
  amtok(){if(!(+(UI.f.amt||0)>0))return toast('Knappa in ett pris först.');UI.f.pf.price=+(UI.f.amt||0);emit('price',UI.f.pf.price);pop()},
  prodsave(x){const f=UI.f.pf,name=(UI.f.pname||'').trim();if(!name)return toast('Fyll i produktens namn');if(!f.gid)return toast('Välj en produktgrupp');if(!f.price)return toast('Ange ett pris');
    let p=f.id&&P(f.id);if(p)Object.assign(p,{name,gid:f.gid,price:f.price,desc:UI.f.pdesc||''});else{p={id:'p'+Date.now().toString(36),name,gid:f.gid,price:f.price,desc:UI.f.pdesc||''};S.products.push(p)}
    save();emit('product:save',p);
    if(x==='copy'){UI.f.pf={gid:f.gid,price:f.price};UI.f.pname=name+' (kopia)';toast('Sparad. Fyll i kopian.');return}
    UI.f.q='';pop();toast('Produkten är sparad')},
  proddel(){const id=UI.f.pf.id;S.products=S.products.filter(p=>p.id!==id);S.startPages.forEach(s=>s.tiles=s.tiles.filter(t=>!(t.type==='product'&&t.ref===id)));save();pop()},
  vat(x){UI.f.vat=+x;emit('vat',+x);render()},
  gcolor(c){UI.f.gcolor=c;render()},
  grpsave(){const name=(UI.f.gname||'').trim();if(!name)return toast('Fyll i gruppens namn');if(UI.f.vat==null)return toast('Välj momssats');const id=mtop().d.id;
    let g=id&&G(id);if(g)Object.assign(g,{name,vat:UI.f.vat,ledger:VAT_LEDGER[UI.f.vat],color:UI.f.gcolor});else{g={id:'g'+Date.now().toString(36),name,vat:UI.f.vat,ledger:VAT_LEDGER[UI.f.vat],color:UI.f.gcolor};S.groups.push(g)}
    save();emit('group:save',g);UI.f.mtab='g';pop();toast('Produktgruppen är sparad')},
  /* start pages */
  addsp(){UI.f.spname='';openModal('spages')},
  spcreate(){const n=(UI.f.spname||'').trim();if(!n)return;const sp={id:'sp'+Date.now().toString(36),name:n,color:COLORS[(S.startPages.length*3)%COLORS.length],tiles:[]};S.startPages.push(sp);UI.f.spname='';if(UI.edit)UI.tab='sp:'+sp.id;save();emit('sp:create',sp);render()},
  spcolor(id){const s=S.startPages.find(x=>x.id===id);s.color=COLORS[(COLORS.indexOf(s.color)+1)%COLORS.length];save();render()},
  spdel(id){if(S.startPages.length<2)return toast('Minst en startsida behövs.');S.startPages=S.startPages.filter(x=>x.id!==id);save();render()},
  addtile(pos){UI.f={};openModal('addtile',{pos:+pos})},
  folder(){toast('Mappar finns i kassan, men ingår inte i demon.')},
  tilepick(x){const[type,ref]=x.split(':');const base=type==='product'?(G(P(ref).gid)?.color||COLORS[0]):type==='group'?G(ref).color:'#eeeef3';UI.f.tile={type,ref,color:base,style:'none',pos:mtop().d.pos};emit('tile:pick',{type,ref});push('tilestyle',{})},
  tstyle(k){UI.f.tile.style=k;render()},
  tcolor(c){UI.f.tile.color=c;emit('tile:color',c);render()},
  tileadd(){const t=UI.f.tile,sp=S.startPages.find(s=>'sp:'+s.id===curTab());if(!sp)return;sp.tiles=sp.tiles.filter(x=>x.pos!==t.pos);sp.tiles.push({pos:t.pos,type:t.type,ref:t.ref,color:t.color});emit('tile:add',t);closeModal()},
  tileedit(pos){const sp=S.startPages.find(s=>'sp:'+s.id===curTab());const t=sp.tiles.find(x=>x.pos===+pos);UI.f={tile:{...t,style:'none'}};openModal('tilestyle',{edit:true})},
  tileremove(){const sp=S.startPages.find(s=>'sp:'+s.id===curTab());sp.tiles=sp.tiles.filter(x=>x.pos!==UI.f.tile.pos);closeModal()},
  /* settings */
  pmtoggle(id){const p=S.payments.find(x=>x.id===id);p.enabled=!p.enabled;if(!p.enabled)p.quick=false;save();emit('pm:toggle',{id,enabled:p.enabled});render()},
  pmquick(id){const p=S.payments.find(x=>x.id===id);if(!p.quick&&S.payments.filter(x=>x.quick).length>=2)return toast('Max två snabbknappar. Stäng av en först.');p.quick=!p.quick;save();render()},
  discdel(id){S.discounts=S.discounts.filter(d=>d.id!==id);save();render()},
  discsave(){const pct=parseFloat(UI.f.dpct);if(!UI.f.dname||!(pct>0&&pct<=100))return toast('Fyll i namn och procent');S.discounts.push({id:'d'+Date.now(),name:UI.f.dname,pct});save();pop()},
  otherset(x){const[k,v]=x.split(':');S.other[k]=v==='true'?true:v==='false'?false:v;save();render()},
  /* hardware */
  ipkey(k){let v=UI.f.ip||'';const parts=v.split('.');if(k==='⌫')v=v.slice(0,-1);else if(k==='.'){if(parts.length<4&&parts[parts.length-1]!=='')v+='.'}else{if(parts[parts.length-1].length<3){v+=k;if(v.split('.').pop().length===3&&parts.length<4)v+='.'}}UI.f.ip=v.slice(0,15);render()},
  termadd(){const prov=mtop().d.id;S.terminals.push({prov,ip:UI.f.ip});save();emit('terminal:add',UI.f.ip);UI.modal.stack.splice(-2,2);if(!UI.modal.stack.length)UI.modal=null;toast('Terminalen är ansluten');render()},
  termforget(i){S.terminals.splice(+i,1);save();render()},
  prdemo(){emit('printer:demo');push('receipt',{kind:'demo',title:'Demo Receipt'})},
  prforget(){toast('I demon behåller vi skrivaren.')},
  prsel(n){S.printer.name=n;S.printer.connected=true;save();render()},
  prto(k){S.printer.receipts=k;save();render()},
  dispauto(){S.display.auto=!S.display.auto;save();render()},
  dispqr(){UI.f.ip='192.168.1.42';toast('QR-koden skannades');render()},
  dispok(){S.display.ip=UI.f.ip;save();emit('display:ip',UI.f.ip);pop();toast('Kundskärmen är ansluten')},
});
