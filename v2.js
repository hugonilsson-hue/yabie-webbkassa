/* v2: pages rebuilt to match the real Express screens (captured from the demo store). */
(()=>{const css=`
#pos .mb{padding-top:14px}
#pos .sec{font-size:10.5px;color:#8a8a8e;margin:16px 0 6px 15px;padding:0;letter-spacing:.02em}
#pos .mb>.sec:first-child{margin-top:4px}
#pos .grp .row{min-height:40px;font-size:13px;padding:0 15px}
#pos .grp.ms .row{min-height:45px;padding:0 12px}
#pos .row+.row::before{left:15px}
#pos .grp.ms .row+.row::before{left:48px}
#pos .cap{font-size:10px;color:#8a8a8e;margin:6px 15px 14px;line-height:1.3}
#pos .prow{display:flex;align-items:center;width:100%;height:40px;background:#fff;border-radius:12px;padding:0 15px;font-size:13px;text-align:left}
#pos .prow .chev{margin-left:auto;color:#b0b0b6}#pos .prow .chev svg{width:12px;height:12px}
#pos .mpill{position:absolute;right:7px;top:8px;height:34px;border-radius:17px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.08);display:flex;align-items:center;gap:12px;padding:0 9px 0 12px;font-size:13px}
#pos .mpill svg{width:17px;height:17px}#pos .mpill b{font-weight:500;display:flex;gap:6px;align-items:center}
#pos .chk2{width:15px;height:15px;border-radius:50%;background:var(--blue2);display:inline-grid;place-items:center;margin-right:8px;vertical-align:-3px}#pos .chk2 svg{width:9px;height:9px;color:#fff}
#pos .rad{display:inline-block;width:13px;height:13px;border-radius:50%;border:1.3px solid #a9a9ae;margin-right:8px;vertical-align:-2px}#pos .rad.on{border:4px solid var(--blue2)}
#pos .tbl2{width:100%;border-collapse:collapse;font-size:12.5px}
#pos .tbl2 th{background:#e3e3e8;text-align:left;font-weight:600;padding:6px 15px;font-size:11.5px}
#pos .tbl2 td{padding:9px 15px;border-bottom:1px solid #e9e9ee;vertical-align:top}
#pos .bdg{font-size:9.5px;font-weight:600;padding:2px 6px;border-radius:9px}
#pos .bdg.g{background:#d9f5df;color:#2f9e4f}#pos .bdg.r{background:#fde0e0;color:#e5484d}#pos .bdg.n{background:#7fd4a8;color:#0b3d24}
#pos .newsc{background:#fff;border-radius:14px;padding:14px 15px 0;margin-bottom:26px}
#pos .newsc h4{margin:0 0 8px;font-size:15px;font-weight:500;display:flex;gap:10px;align-items:center}
#pos .newsc p{margin:0 0 12px;font-size:13px;line-height:1.35;white-space:pre-line}
#pos .newsc .rm{border-top:1px solid #e3e3e8;padding:11px 0 14px;color:var(--blue);font-size:13px;display:block;width:100%;text-align:left}
#pos .sfld{display:flex;align-items:center;gap:6px;background:#dcdce1;border-radius:7px;height:26px;padding:0 9px;color:#8e8e93;font-size:12.5px}
#pos .sfld input{border:0;background:none;outline:0;flex:1;font:inherit;color:#1c1c1e;min-width:0}
#pos .sfld svg{width:12px;height:12px}
#pos .chip{height:28px;border-radius:6px;background:#e3e3e8;color:var(--blue);font-size:11.5px;padding:0 9px;display:inline-flex;align-items:center;gap:5px}
#pos .chip.on{background:var(--blue2);color:#fff}
#pos .mini{width:19px;height:19px;border-radius:50%;background:#e5484d;display:inline-grid;place-items:center;flex:none;margin-right:10px}#pos .mini::after{content:"";width:9px;height:2px;background:#fff;border-radius:1px}
#pos .pen{width:25px;height:25px;border-radius:6px;background:#eef0f6;display:inline-grid;place-items:center;color:var(--blue)}#pos .pen svg{width:13px;height:13px}
#pos .hdl{width:13px;height:9px;border-top:1.5px solid #c7c7cc;border-bottom:1.5px solid #c7c7cc;position:relative;margin-left:12px;display:inline-block}#pos .hdl::after{content:"";position:absolute;left:0;right:0;top:2.5px;border-top:1.5px solid #c7c7cc}
#pos .pvbtn{position:absolute;border-radius:7px;background:var(--blue2);color:#fff;font-weight:600;font-size:11.5px;display:grid;place-content:center;justify-items:center;gap:6px}
#pos .pvbtn svg{width:22px;height:22px}
#pos .rmv{position:absolute;right:-5px;top:-5px;width:15px;height:15px;border-radius:50%;background:#1c1c1e;display:grid;place-items:center;z-index:2}#pos .rmv::after{content:"";width:7px;height:1.6px;background:#fff}
#pos .addt{position:absolute;border:1.5px dashed #9ab7f2;border-radius:7px;display:grid;place-items:center;color:var(--blue);font-size:22px;background:#fff}
#pos .ftp{position:absolute;width:86px;height:77px;border-radius:7px;background:#eeeef6;color:var(--blue);font-size:11.5px;font-weight:600;display:grid;place-content:center;justify-items:center;gap:3px;text-align:center;line-height:1.1}
#pos .ftp svg{width:24px;height:24px}
#pos .crs{background:#fff;border-radius:12px;margin-bottom:18px;overflow:hidden}
#pos .crs-h{display:flex;align-items:center;gap:8px;height:38px;padding:0 12px;background:#ececf1;font-weight:700;font-size:12.5px}
#pos .crs-r{display:flex;align-items:center;height:38px;padding:0 12px;font-size:12.5px;border-bottom:1px solid #eeeef2}
#pos .addg{display:flex;justify-content:flex-end;padding:8px 12px 10px;color:var(--blue);font-size:12px;gap:4px;align-items:center}
#pos .full{position:absolute;left:8px;top:15px;width:1036px;height:765px;background:#fff;border-radius:10px;overflow:hidden;z-index:30}
#pos .full .fbar{height:44px;background:var(--bar);display:flex;align-items:center;gap:8px;padding:0 8px;border-bottom:1px solid var(--line)}
#pos .ftab{height:35px;border-radius:8px 8px 0 0;background:#e6e6eb;color:var(--blue);font-size:12px;display:inline-flex;align-items:center;justify-content:center;width:156px;margin-top:9px}
#pos .ftab.on{background:#fff;color:#1c1c1e;font-weight:600}
#pos .tblsq{position:absolute;width:126px;height:107px;border-radius:5px;border:1.5px solid #f2a9a2;background:#fff5f4;display:grid;place-content:center;text-align:center}
#pos .tblsq b{font-size:20px}#pos .tblsq.occ{background:#f2a9a2;border-color:#f2a9a2}
#pos .more{width:162px;background:rgba(214,232,247,.92);padding:8px 0}
#pos .more button{gap:12px;padding:6px 12px;font-size:13px;color:#111}
#pos .more button svg{width:30px;height:30px;color:#111}
#pos .more button.off,#pos .more button.off svg{color:#a3a3a8}
#pos .more .rdot{width:17px;height:17px;border-radius:50%;border:1.5px solid #e5484d;display:grid;place-items:center;margin-left:4px;margin-right:4px}#pos .more .rdot::after{content:"";width:7px;height:7px;border-radius:50%;background:#e5484d}
#pos .mbg{z-index:20}#pos .modal{z-index:21}#pos .toast{z-index:60;pointer-events:none}
#pos .more button svg{stroke-width:2.2}
#pos .promo{display:flex;align-items:center;gap:8px;width:100%;background:#a855f7;color:#fff;border-radius:6px;padding:7px 10px;margin-bottom:6px;font-size:12px;font-weight:600}
#pos .promo u{margin-left:auto}
`;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s)})();

/* extra state */
(function(){const d={
  promotions:[{id:'pr1',name:'Fika',type:'Combo deal',auto:true,from:'2026-09-01',rule:{a:'Bryggkaffe',b:'Kanelbulle',price:55},active:true},
              {id:'pr2',name:'3 bullar',type:'X items for kr',auto:true,from:'2026-09-15',rule:{gid:'g-bak',n:3,price:90},active:true},
              {id:'pr3',name:'Stammiskort',type:'Discount %',auto:false,from:'2026-10-01',rule:{pct:15},active:true}],
  loyalty:[{id:'l1',name:'Anna Lind',phone:'+46701234567',email:'anna@example.com',points:120}],
  layouts:[{id:'ly1',name:'Kaffebaren'}],layout:'ly1',
  payLayout:{numpad:false,large:false,quick:[]},
  cashierMode:false,cashier:null,
  guestMode:'manual',
  tipsManual:[],
  other2:{tapTable:'open'},
};for(const k in d)if(S[k]===undefined)S[k]=d[k];
 if(S.courses&&!S.courses.items)S.courses={on:true,items:[{name:'FÖRRÄTT',mode:'serve',gids:[]},{name:'VARMRÄTT',mode:'wait',gids:['g-smor']},{name:'EFTERRÄTT',mode:'wait',gids:['g-bak']}]};
 S.payments.forEach(p=>{if(p.id!=='invoice')p.enabled=true});
 if(!S.giftcards['DEMO-1000'].type){Object.values(S.giftcards).forEach(g=>{g.type=g.type||'Kaffebarens Presentkort';g.status=g.status||'Active'})}
 if(!S.products.find(p=>p.id==='p-gift')){S.products.push({id:'p-gift',name:'Presentkort',price:0,gid:'g-merch',priceType:'variable',gift:true,desc:'Yabie presentkort. Koden skapas vid betalning.'});const sp=S.startPages[0];if(!sp.tiles.find(t=>t.ref==='p-gift'))sp.tiles.push({pos:41,type:'product',ref:'p-gift',color:'#cdbdf7'})}
 save()})();
const dateTxt=(k,def)=>`<label style="position:relative;color:#1c1c1e;font-size:12.5px;cursor:pointer">${esc(UI.f[k]||def)}<input type="date" data-in="${k}" data-live="1" value="${esc(UI.f[k]||def)}" style="position:absolute;inset:0;opacity:0;cursor:pointer"></label>`;
const _r2=resetAll;resetAll=function(){_r2();location.reload()};

/* helpers */
const pr=(label,o={})=>`<button class="prow" data-a="${o.a||'nop'}" ${o.x!=null?`data-x="${esc(o.x)}"`:''} data-g="${o.g||'prow-'+slug(label)}" style="${o.css||''}">${o.html||esc(label)}${o.chev?`<span class="chev">${IC.chev}</span>`:''}</button>`;
const rad=(on)=>`<span class="rad ${on?'on':''}"></span>`;
const chk=(on)=>on?`<span class="chk2">${IC.check}</span>`:`<span class="rad"></span>`;

/* modal header with right pill (action + close) */
const _modalHtml=modalHtml;
modalHtml=function(){if(!UI.modal)return '';const t=mtop(),pg=PAGES[t.p];if(!pg)return '';const r=pg(t.d||{});
  if(!r.pill)return _modalHtml();
  const canBack=UI.modal.stack.length>1;
  return `<div class="mbg" data-a="nop"></div><div class="modal ${r.white?'w':''}" data-g="modal-${t.p}"><div class="mh">${canBack?`<button class="bk" data-a="mback" data-g="m-back">${IC.back}</button>`:''}<span>${r.title}</span><div class="mpill"><b data-a="${r.pill.a}" data-g="pill-act" style="cursor:pointer">${r.pill.html}</b><button data-a="mclose" data-g="m-close" style="display:grid">${IC.x}</button></div></div>
   <div class="mb ${r.foot?'':'nofoot'}" id="mb" style="${r.bodyCss||''}">${r.body}</div>${r.foot?`<div class="mf">${r.foot}</div>`:''}</div>`};

/* ── My Store menu with Customer benefits ── */
PAGES.ms=()=>{const unread=S.news.filter(n=>!n.read).length;const ic=(n,i,a,x,g)=>row(n,{a,x,ic:i,g});
 return {title:`My Store - ${esc(S.store)}`,bodyCss:'padding-top:30px',body:`
 <div class="grp"><div class="row" style="cursor:default;min-height:40px"><b style="font-size:16px">${esc(S.register)}</b><span style="margin-left:14px;font-size:12.5px">demo@kaffebaren.se</span></div></div>
 <div class="tiles4" style="margin-top:23px">
  <button class="bigt" data-a="go" data-x="z" data-g="ms-z">${IC.report}Z-Report</button><button class="bigt" data-a="pinfor" data-x="analytics" data-g="ms-analytics">${IC.chart}Analytics</button>
  <button class="bigt" data-a="go" data-x="orders" data-g="ms-orders">${IC.receipt}Order History</button><button class="bigt" data-a="go" data-x="help" data-g="ms-help">${IC.help}Help</button></div>
 <div class="grp" style="margin-top:23px">${row('News',{a:'go',x:'news',g:'row-news',html:`<b>News:</b> ${esc(S.news.map(n=>n.short||n.t).join(', '))}`,val:unread?`<span class="badge" style="position:static;display:inline-grid;width:19px;height:19px;border-radius:50%;font-size:11px">${unread}</span>`:''})}</div>
 <div class="sec" style="margin-left:0">Store</div><div class="grp ms">${ic('Order History (Returns & Receipt copy)','receipt','go','orders','row-orders')}${ic('Reports & Analytics','chart','go','reports','row-reports')}${ic('Product Catalog','book','go','catalog','row-catalog')}${ic('Cash Drawer','drawer','go','drawer','row-drawer')}</div>
 <div class="sec" style="margin-left:0">Administration</div><div class="grp ms">${ic('Time Tracking','clock','pinfor','timetrack','row-time')}${ic('Yabie gift cards','gift','go','giftcards','row-gift')}${ic('Tipping','tip','go','tipping','row-tipping')}${ic('Customers','users','go','customers','row-customers')}${ic('Courses','cloche','go','courses','row-courses')}</div>
 <div class="sec" style="margin-left:0">Customer benefits</div><div class="grp ms">${ic('Promotions','tag','go','promotions','row-promotions')}${ic('Loyalty members','user','go','loyalty','row-loyalty')}</div>
 <div class="sec" style="margin-left:0">Settings</div><div class="grp ms">${ic('Layouts/Start Pages','grid','go','layouts','row-layouts')}${ic('Payment Methods','pay','go','paymethods','row-paymethods')}${ic('Functions','fn','go','functions','row-functions')}${ic('Discount Buttons','tag','go','discbtns','row-discbtns')}${ic('Guests','users','go','guestsset','row-guests')}${ic('Cashier Management','user','go','cashiers','row-cashiers')}${ic('Other Settings','cog','go','other','row-other')}</div>
 <div class="sec" style="margin-left:0">Hardware</div><div class="grp ms">${ic('Payment Terminals','term','go','terminals','row-terminals')}${ic('Printers','printer','go','printers','row-printers')}${ic('Customer Display','display','go','custdisp','row-custdisp')}</div>
 <div class="sec" style="margin-left:0">Other</div><div class="grp ms">${ic('Support','help','go','help','row-support')}${ic('About','info','go','about','row-about')}</div>
 <div class="grp" style="margin-top:23px">${row('Logout from POS',{a:'logout',cls:'red',right:false,g:'row-logout'})}</div>`}};

/* News */
S.news=[{id:'n1',short:'Uppdatera Kontrollenhet',t:'Viktig åtgärd: Uppdatera din kontrollenhet inom 2 veckor',b:'En snabb men viktig sak: du behöver uppdatera din kontrollenhet hos Skatteverket inom 2 veckor.\n\nInfrasec byter ut sitt gamla system (CCU) mot ett nytt (TCS). Allt i kassan fungerar som vanligt — det är bara en registrering du behöver göra i Skatteverkets e-tjänst.\n\nLäs guiden i vårt hjälpcenter',read:S.news[0]?.read},
 {id:'n2',short:'Food & takeaway VAT',t:'New VAT rules for food and takeaway from 1 April 2026',b:'From 1 April 2026, VAT on food and takeaway drops from 12% to 6%. Your Yabie register handles this automatically — just enable the right feature and select which products are affected.',read:S.news[1]?.read}];
PAGES.news=()=>({title:`News (${S.news.length})`,bodyCss:'padding-top:26px',body:S.news.map(n=>`<div class="newsc"><h4>${esc(n.t)} <span class="bdg n">New</span></h4><p>${esc(n.b)}</p><button class="rm" data-a="newsmore">Read More</button></div>`).join('')});

/* Reports */
PAGES.reports=()=>({title:'Reports',bodyCss:'padding-top:26px',body:`${pr('End of Day (Z-report)',{a:'go',x:'z',g:'rep-z'})}<div class="cap">Ends the working day with all transactions from the last End of Day.</div>
 ${pr('Current daily sales (X-report)',{a:'go',x:'xrep',g:'rep-x'})}<div class="cap">See all current sales without affecting the End of Day.</div>
 ${pr('Journals',{a:'go',x:'journal',g:'rep-journal'})}<div class="cap">An overview of all transactions made during the lifetime of the device.</div>
 ${pr('Periodic report (monthly report)',{a:'pinfor',x:'period',g:'rep-period'})}<div class="cap">An overview of your sales over a certain period of time.</div>
 ${pr('Analytics',{a:'pinfor',x:'analytics',chev:1,g:'rep-analytics'})}`});
S.xreports=S.xreports||[];
PAGES.xrep=()=>{const o=UI.f.xout||'show';return {title:'Current daily sales (X-report)',body:`<div class="sec">Options</div><div class="grp">${[['print','Print'],['email','Email'],['show','Show on Screen']].map(([k,l])=>row(l,{a:'xout',x:k,html:`${chk(o===k)}${l}`,nochev:1,g:'xo-'+k})).join('')}</div>
 <div style="margin-top:18px">${pr('Create Report',{a:'xcreate',g:'x-create'})}</div>
 <div class="sec" style="margin-top:22px">Past reports</div><div class="grp">${S.xreports.slice().reverse().slice(0,7).map((x,i)=>row(x.at,{a:'xview',x:S.xreports.length-1-i,nochev:1})).join('')}${row('See more reports',{a:'nop',nochev:1})}</div>`}};
const _xcreate=A.xcreate;A.xcreate=function(){const z=zFrom(sinceZ(),now());S.xreports.push(z);save();_xcreate()};
A.xview=i=>push('receipt',{kind:'x',z:S.xreports[+i],title:'X-Report'});
PAGES.journal=()=>({title:'Journals',body:`<div class="sec">Select date range for report</div><div class="grp">${row('Start',{html:'Start',val:dateTxt('jf',now().slice(0,10)),nochev:1})}${row('End',{html:'End',val:dateTxt('jt',now().slice(0,10)),nochev:1})}</div>
 <div class="sec" style="margin-top:22px">Recipient's email</div><div style="border-bottom:1px solid #d1d1d6;margin:0 0 0 0;padding:6px 0"><input data-in="jmail" value="${esc(UI.f.jmail??'demo@kaffebaren.se')}" style="border:0;background:none;outline:0;font:inherit;font-size:12.5px;width:100%;padding-left:15px"></div>
 <div style="margin-top:18px">${pr('Create Report',{a:'journalcreate',g:'journal-create'})}</div>`});
A.journalcreate=()=>{const f=UI.f.jf||now().slice(0,10),t=UI.f.jt||now().slice(0,10);toast('Journalen skickas till '+(UI.f.jmail??'demo@kaffebaren.se'));push('receipt',{kind:'journal',from:f,to:t,title:'Journal'})};
PAGES.period=()=>{const o=UI.f.pout||'show';return {title:'Periodic report (monthly report)',body:`<div class="sec">Options</div><div class="grp">${[['print','Print'],['email','Email'],['show','Show on Screen']].map(([k,l])=>row(l,{a:'pout',x:k,html:`${chk(o===k)}${l}`,nochev:1})).join('')}</div>
 <div class="sec" style="margin-top:22px">Select date range for report</div><div class="grp">${row('Start',{html:'Start',val:dateTxt('pf',now().slice(0,8)+'01'),nochev:1})}${row('End',{html:'End',val:dateTxt('pt',now().slice(0,10)),nochev:1})}</div>
 <div style="margin-top:18px">${pr('Create Report',{a:'periodgo',g:'period-go'})}</div>`}};
A.pout=k=>{UI.f.pout=k;render()};

/* PIN-gated pages (Analytics, Periodic report, Time tracking) */
A.pinfor=x=>{UI.f.pin='';push('pin',{next:'goto',to:x})};
const _pinkey=A.pinkey;A.pinkey=function(k){const t=mtop();if(t.d.next!=='goto'&&t.d.next!=='shift')return _pinkey(k);
  let p=UI.f.pin||'';if(k==='⌫')p=p.slice(0,-1);else if(p.length<4)p+=k;UI.f.pin=p;render();
  if(p.length===4)setTimeout(()=>{const u=S.cashiers.find(c=>c.pin===p);if(!u){UI.f.pin='';toast('Fel PIN-kod');return}
    if(t.d.next==='shift'){UI.f.pin='';push('ttconfirm',{name:u.name});return}
    UI.modal.stack.pop();emit('pin:ok');push(t.d.to,{})},250)};
const _pinPage=PAGES.pin;PAGES.pin=d=>{const r=_pinPage(d);if(d.next==='goto'){r.title='Enter PIN';r.body=r.body.replace('Demo: Ägare har PIN 1234.','Demo: Ägare 1234, Barista 0000.')}return r};
/* Time Tracking = PIN to start/stop shift */
PAGES.timetrack=()=>{const r=_pinPage({});return {title:'Time Tracking',pill:{a:'ttprint',html:`${IC.printer} Print`},body:r.body.replace('Enter a user PIN with permission for this action','Enter your PIN to start or end your shift').replace('Demo: Ägare har PIN 1234.','Demo: Ägare 1234, Barista 0000. Samma PIN avslutar passet.')}};
A.go=(o=>function(x,el){if(x==='timetrack'){UI.f.pin='';return push('timetrack',{next:'shift'})}return o(x,el)})(A.go);
const _pk2=A.pinkey;A.pinkey=function(k){if(mtop().p==='timetrack'){mtop().d.next='shift'}return _pk2(k)};
A.ttprint=()=>push('receipt',{kind:'staff',title:'Personalliggare'});
const _rt2=receiptText;receiptText=function(d){if(d.kind==='staff'){const L=(a,b)=>a+' '.repeat(Math.max(1,40-a.length-String(b).length))+b;return `${S.store.toUpperCase()}\nPERSONALLIGGARE ${now().slice(0,10)}\n${'-'.repeat(40)}\n`+(S.timelog.map(l=>L(l.name,`${l.in.slice(12)}–${l.out?l.out.slice(12):'   '}`)).join('\n')||'Inga registreringar.')+'\n'}return _rt2(d)};

/* Gift cards */
PAGES.giftcards=()=>{const q=(UI.f.q||'').toLowerCase(),all=Object.entries(S.giftcards).filter(([k,g])=>!q||k.toLowerCase().includes(q));const act=Object.values(S.giftcards).filter(g=>g.status!=='Void');
 return {title:'Yabie gift cards',bodyCss:'padding:0 0 30px',body:`<div style="display:flex;justify-content:space-between;padding:10px 15px 12px;font-size:12.5px"><span>Total active cards: ${act.length}</span><span>Total Value: ${kr(act.reduce((a,g)=>a+g.balance,0))}</span></div>
 <div style="background:#e3e3e8;padding:8px 12px"><div class="sfld" style="background:#d6d6db">${IC.search}<input data-in="q" data-live="1" placeholder="Search for mobile number, email or Yabie gift card code" value="${esc(UI.f.q||'')}"></div></div>
 <div style="background:#fff;padding:10px 15px 6px"><span class="chip">${IC.gift.replace('<svg','<svg style="width:13px;height:13px"')} All Yabie gift cards ⌄</span></div>
 <div style="background:#fff;padding:0 15px;min-height:560px"><table class="tbl2"><tr><th>Type</th><th>Information</th><th>Status</th><th style="text-align:right">Balance</th><th></th></tr>${all.map(([k,g])=>`<tr data-a="go" data-x="giftdetail" data-y="${k}" style="cursor:pointer"><td>${esc(g.type)}</td><td><b>${esc(k)}</b>${g.phone?`<br><small>📱 ${esc(g.phone)}</small>`:''}</td><td><span class="bdg ${g.status==='Void'?'r':'g'}">${g.status}</span></td><td style="text-align:right">${kr(g.balance)}</td><td style="color:#b0b0b6">›</td></tr>`).join('')}</table></div>`}};
PAGES.giftdetail=d=>{const g=S.giftcards[d.id];return {title:esc(d.id),body:`<div class="grp" style="margin-top:12px">${row('Type',{val:esc(g.type),nochev:1})}${row('Status',{val:g.status,nochev:1})}${row('Balance',{val:kr(g.balance),nochev:1})}${row('Sold',{val:esc(g.sold),nochev:1})}</div><div style="margin-top:18px">${pr(g.status==='Void'?'Aktivera kortet':'Spärra kortet (Void)',{a:'giftvoid',x:d.id,css:'color:var(--red)'})}</div>`}};
A.giftvoid=id=>{const g=S.giftcards[id];g.status=g.status==='Void'?'Active':'Void';save();render()};
const _onSale=onSale;onSale=function(order,c,mid,extra){c.items.forEach(i=>{if(P(i.pid)?.gift)i.gift=true});order.items.forEach(i=>{if(P(i.pid)?.gift)i.gift=true});const r=_onSale(order,c,mid,extra);Object.values(S.giftcards).forEach(g=>{g.type=g.type||'Kaffebarens Presentkort';g.status=g.status||'Active'});
  if(order.customer){const m=S.loyalty.find(l=>l.name===order.customer);if(m&&!c.ret){const pts=Math.floor(order.total/10);m.points+=pts;r.lines.push(['Lojalitetspoäng:','+'+pts])}}
  save();return r};

/* Tipping */
PAGES.tipping=()=>({title:'Tipping',bodyCss:'padding-top:26px',body:`<div class="grp" style="border-radius:12px">${row('Register tips manually',{a:'go',x:'tipreg',g:'tip-reg'})}${row('Tipping history',{a:'go',x:'tiphist',g:'tip-hist'})}</div>`});
PAGES.tipreg=()=>({title:'Register tips manually',body:`<div class="amt" style="margin-top:12px"><small>Belopp</small>${UI.f.amt||'0'},00 kr</div>${pad('amtkey')}<div class="sec">Personal</div><div class="grp">${S.cashiers.map(c=>row(c.name,{a:'tipwho',x:c.name,html:`${rad(UI.f.tipwho===c.name)}${esc(c.name)}`,nochev:1})).join('')}</div>`,foot:`<button class="btnb ${UI.f.amt&&UI.f.tipwho?'':'dis'}" data-a="tipsave">Save</button>`});
A.tipwho=n=>{UI.f.tipwho=n;render()};
A.tipsave=()=>{S.tipsManual.push({at:now(),amt:+UI.f.amt,who:UI.f.tipwho});save();pop();toast('Dricksen är registrerad')};
PAGES.tiphist=()=>{const l=[...S.tipsManual.map(t=>({at:t.at,amt:t.amt,who:t.who})),...S.orders.filter(o=>o.tip).map(o=>({at:o.at,amt:o.tip,who:'Kortbetalning'}))].sort((a,b)=>a.at<b.at?1:-1);
 return {title:'Tipping history',body:`<div class="grp" style="margin-top:12px">${l.map(t=>row(t.who,{html:`${esc(t.who)}<br><small style="color:#8e8e93">${t.at}</small>`,val:kr(t.amt),nochev:1})).join('')||'<p style="padding:14px;margin:0;color:#8e8e93">Ingen dricks registrerad.</p>'}</div>`}};
const _goTip=A.go;A.go=function(x,el){if(x==='tipreg'){UI.f.amt='';UI.f.tipwho=null}return _goTip(x,el)};

/* Customers */
PAGES.customers=()=>{const f=k=>(UI.f[k]||'').toLowerCase();const list=S.customers.filter(c=>(!f('cn')||c.id.includes(f('cn')))&&(!f('cnm')||c.name.toLowerCase().includes(f('cnm')))&&(!f('cot')||(c.phone+c.email).toLowerCase().includes(f('cot'))));
 return {white:true,title:'Customers',pill:{a:'custnew',html:`${IC.user} New Customer`},bodyCss:'padding:0 0 30px',body:`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px 48px;padding:6px 30px 10px">
  <div class="sfld">${IC.search}<input data-in="cn" data-live="1" placeholder="Customer Number" value="${esc(UI.f.cn||'')}"></div><div class="sfld">${IC.search}<input data-in="cnm" data-live="1" placeholder="Name" value="${esc(UI.f.cnm||'')}"></div>
  <div class="sfld">${IC.search}<input placeholder="Organisation Number"></div><div class="sfld">${IC.search}<input data-in="cot" data-live="1" placeholder="Other" value="${esc(UI.f.cot||'')}"></div></div>
  <button style="color:var(--blue);font-size:12.5px;padding:6px 30px 14px;display:flex;gap:5px;align-items:center" data-a="nop">⊕ More search options</button>
  <table class="tbl2" style="background:#fff"><tr><th style="width:150px;padding-left:20px">Customer Number</th><th>Information</th></tr>${list.map(c=>`<tr data-a="go" data-x="custdetail" data-y="${c.id}" style="cursor:pointer;background:#fff"><td style="padding-left:20px">${c.id.replace(/\D/g,'').padStart(5,'0').slice(-5)}</td><td><b>${esc(c.name)}</b><br><small style="color:#6b6b70">${esc(c.phone)} ${esc(c.email)}</small></td></tr>`).join('')}</table>
  <div style="background:#fff;min-height:420px"></div>`}};
A.custnew=()=>{UI.f.cname='';UI.f.cphone='';UI.f.cemail='';push('custform')};

/* Courses */
PAGES.courses=()=>({title:'Course Settings',bodyCss:'padding-top:20px',body:S.courses.items.map((c,i)=>`<div class="crs"><div class="crs-h"><span style="color:var(--blue)">⌄</span>${esc(c.name)} <span style="color:var(--blue)" data-a="crsrename" data-x="${i}">${IC.pen.replace('<svg','<svg style="width:12px;height:12px"')}</span>
  <span style="margin-left:auto;font-weight:400;display:flex;gap:14px"><span data-a="crsmode" data-x="${i}:wait">${rad(c.mode==='wait')}Wait</span><span data-a="crsmode" data-x="${i}:serve">${rad(c.mode==='serve')}Serve</span><span data-a="crsmove" data-x="${i}" style="color:#9a9aa0">${i===0?'↓':'↑'}</span></span></div>
  ${c.gids.map((g,j)=>`<div class="crs-r"><span class="mini" data-a="crsdelg" data-x="${i}:${j}"></span>${esc(G(g)?.name||g)}<span style="margin-left:auto;color:#9a9aa0">⇅</span></div>`).join('')}
  ${UI.f.crsadd===i?`<div style="padding:6px 12px;display:flex;flex-wrap:wrap;gap:6px">${S.groups.filter(g=>!c.gids.includes(g.id)).map(g=>`<button class="chip" data-a="crsaddg" data-x="${i}:${g.id}">${esc(g.name)}</button>`).join('')}</div>`:''}
  <div class="addg"><button data-a="crsadd" data-x="${i}" style="color:var(--blue)">⊕ Add Group</button></div></div>`).join(''),
 foot:`<button class="btnb" data-a="crsnew" data-g="crs-new">${IC.plus} Add New Course</button>`});
Object.assign(A,{crsmode(x){const[i,m]=x.split(':');S.courses.items[+i].mode=m;save();render()},crsmove(i){i=+i;const l=S.courses.items,j=i===0?1:i-1;[l[i],l[j]]=[l[j],l[i]];save();render()},
 crsdelg(x){const[i,j]=x.split(':');S.courses.items[+i].gids.splice(+j,1);save();render()},crsadd(i){UI.f.crsadd=UI.f.crsadd===+i?null:+i;render()},crsaddg(x){const[i,g]=x.split(':');S.courses.items[+i].gids.push(g);UI.f.crsadd=null;save();render()},
 crsnew(){S.courses.items.push({name:'NY RÄTT '+(S.courses.items.length+1),mode:'wait',gids:[]});save();render()},crsrename(i){const c=S.courses.items[+i];const n=['FÖRRÄTT','MELLANRÄTT','VARMRÄTT','EFTERRÄTT','DRYCK'];c.name=n[(n.indexOf(c.name)+1)%n.length];save();render()}});
const courseOf=it=>{const g=P(it.pid)?.gid;const c=S.courses.items.find(c=>c.gids.includes(g));return c?c.name:null};
itemSub=it=>(it.mods&&it.mods.length?`<span class="dl">${esc(it.mods.join(', '))}</span>`:'')+(UI.showCourses&&courseOf(it)?`<span class="dl">${esc(courseOf(it))}</span>`:'');
A['m-courses']=()=>{UI.more=false;UI.showCourses=!UI.showCourses;if(UI.showCourses){const ord=n=>{const i=S.courses.items.findIndex(c=>c.name===n);return i<0?99:i};C().items.sort((a,b)=>ord(courseOf(a))-ord(courseOf(b)))}render()};

/* Promotions */
PAGES.promotions=()=>({title:'Promotions',bodyCss:'padding-top:18px',body:`<div style="display:grid;gap:12px;justify-content:center"><button class="btnb" data-a="go" data-x="promoform" data-y="auto" data-g="promo-auto">${IC.plus} Add automatic promotion</button><button class="btnb" data-a="go" data-x="promoform" data-y="manual" data-g="promo-manual">${IC.plus} Add manual promotion</button></div>
 <p style="text-align:center;font-size:12px;margin:18px 0">Drag and drop your promotions to arrange them in order of priority</p>
 <div class="grp">${S.promotions.map((p,i)=>`<div class="row" style="min-height:58px"><span class="mini" data-a="promodel" data-x="${i}"></span><span style="width:6px;height:6px;border-radius:50%;background:${p.active?'#34c759':'#d1d1d6'};margin-right:6px"></span><span><b>${esc(p.name)}</b> (${esc(p.type)})${p.auto?'':' · manuell'}<br><b>From:</b> ${p.from}, 0:00</span><span style="margin-left:auto;display:flex;align-items:center"><span class="pen" data-a="promotog" data-x="${i}">${IC.pen}</span><span class="hdl"></span></span></div>`).join('')}</div>`});
PAGES.promoform=d=>{const f=UI.f.pr;const ty=f.type;return {title:d.id==='auto'?'Add automatic promotion':'Add manual promotion',body:`${fld('Namn*','prname',{ph:'t.ex. Fika'})}
 <div class="sec">Typ</div><div class="grp">${['Combo deal','X items for kr','Discount %','Discount kr'].map(t=>row(t,{a:'prtype',x:t,html:`${rad(ty===t)}${t}`,nochev:1})).join('')}</div>
 ${ty==='Combo deal'?`<div class="sec">Produkt A + produkt B för ett pris</div>${fld('Produkt A','pra',{ph:'Bryggkaffe'})}${fld('Produkt B','prb',{ph:'Kanelbulle'})}${fld('Pris (kr)','prp',{ph:'55',mode:'numeric'})}`:''}
 ${ty==='X items for kr'?`<div class="sec">Antal ur en produktgrupp för ett pris</div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">${S.groups.map(g=>`<button class="chip ${f.gid===g.id?'on':''}" data-a="prgid" data-x="${g.id}">${esc(g.name)}</button>`).join('')}</div>${fld('Antal','prn',{ph:'3',mode:'numeric'})}${fld('Pris (kr)','prp',{ph:'90',mode:'numeric'})}`:''}
 ${ty==='Discount %'||ty==='Discount kr'?`${fld(ty==='Discount %'?'Procent':'Belopp (kr)','prp',{ph:'10',mode:'numeric'})}`:''}`,foot:`<button class="btnb" data-a="promosave" data-g="promo-save">Save</button>`}};
const _goPr=A.go;A.go=function(x,el){if(x==='promoform'){UI.f.pr={type:'Combo deal',gid:S.groups[0].id};UI.f.prname='';UI.f.pra='';UI.f.prb='';UI.f.prp='';UI.f.prn=''}if(x==='loyform'){UI.f.lname='';UI.f.lphone='';UI.f.lemail=''}return _goPr(x,el)};
Object.assign(A,{prtype(t){UI.f.pr.type=t;render()},prgid(g){UI.f.pr.gid=g;render()},promodel(i){S.promotions.splice(+i,1);save();render()},promotog(i){S.promotions[+i].active=!S.promotions[+i].active;save();render();toast(S.promotions[+i].active?'Kampanjen är aktiv':'Kampanjen är pausad')},
 promosave(){const f=UI.f.pr,auto=mtop().d.id==='auto',name=(UI.f.prname||'').trim(),p=+UI.f.prp;if(!name||!(p>0))return toast('Fyll i namn och värde');
  const rule=f.type==='Combo deal'?{a:UI.f.pra,b:UI.f.prb,price:p}:f.type==='X items for kr'?{gid:f.gid,n:+UI.f.prn||2,price:p}:f.type==='Discount %'?{pct:p}:{kr:p};
  if(f.type==='Combo deal'&&(!P(S.products.find(x=>x.name.toLowerCase()===(UI.f.pra||'').toLowerCase())?.id)||!S.products.find(x=>x.name.toLowerCase()===(UI.f.prb||'').toLowerCase())))return toast('Skriv produktnamn som finns i katalogen');
  S.promotions.unshift({id:'pr'+Date.now(),name,type:f.type,auto,from:now().slice(0,10),rule,active:true});save();pop();toast('Kampanjen är sparad')}});
/* promotion engine */
function promoCalc(c=C()){if(c.ret)return {disc:0,lines:[]};const lines=[];let disc=0;const units=[];c.items.forEach(it=>{for(let k=0;k<it.qty;k++)units.push({it,price:it.price*(1-(it.disc||0)/100),used:false})});
 S.promotions.filter(p=>p.active&&p.auto).forEach(p=>{const r=p.rule;
  if(p.type==='Combo deal'){const fa=units.filter(u=>!u.used&&u.it.name.toLowerCase().startsWith(String(r.a).toLowerCase())),fb=units.filter(u=>!u.used&&u.it.name.toLowerCase().startsWith(String(r.b).toLowerCase()));const n=Math.min(fa.length,fb.length);for(let i=0;i<n;i++){const s=fa[i].price+fb[i].price;if(s>r.price){disc+=s-r.price;fa[i].used=fb[i].used=true;lines.push([p.name,s-r.price])}}}
  if(p.type==='X items for kr'){const f=units.filter(u=>!u.used&&P(u.it.pid)?.gid===r.gid).sort((a,b)=>b.price-a.price);while(f.length>=r.n){const set=f.splice(0,r.n);const s=set.reduce((a,u)=>a+u.price,0);if(s>r.price){disc+=s-r.price;set.forEach(u=>u.used=true);lines.push([p.name,s-r.price])}else break}}});
 (c.promos||[]).forEach(id=>{const p=S.promotions.find(x=>x.id===id);if(!p)return;const base=c.items.reduce((a,it)=>a+lineTot(it),0)-disc;const d=p.type==='Discount %'?base*p.rule.pct/100:Math.min(base,p.rule.kr||0);disc+=d;lines.push([p.name,d])});
 return {disc,lines}}
const _cartTot=cartTot;cartTot=function(c=C()){const b=c.items.reduce((a,it)=>a+lineTot(it),0)-promoCalc(c).disc;return b*(1-(c.orderDisc||0)/100)};
const _rightPanel=rightPanel;rightPanel=function(){let h=_rightPanel();const pc=promoCalc();const man=S.promotions.filter(p=>p.active&&!p.auto&&!(C().promos||[]).includes(p.id));
 const extra=(C().items.length&&!C().ret&&man.length?`<button class="promo" data-a="promoshow" data-g="promo-banner">ⓘ Promotion is available <u>Show details</u></button>`:'')+pc.lines.map(l=>`<div class="ord" style="color:#a855f7;font-weight:600"><span>${esc(l[0])}</span><span>−${n2(l[1])}</span></div>`).join('');
 return h.replace('<div class="cart-l" id="cartl"','<div class="cart-l" id="cartl" data-x="1"').replace(/(<div class="cart-l" id="cartl"[^>]*>)/,'$1'+extra)};
A.promoshow=()=>openModal('promopick');
PAGES.promopick=()=>({title:'Promotions',body:`<div class="sec">Tillgängliga kampanjer</div><div class="grp">${S.promotions.filter(p=>p.active&&!p.auto).map(p=>row(p.name,{a:'promoapply',x:p.id,html:`<b>${esc(p.name)}</b>&nbsp;(${esc(p.type)})`,val:p.type==='Discount %'?p.rule.pct+' %':kr(p.rule.kr||0)})).join('')}</div>`});
A.promoapply=id=>{C().promos=[...(C().promos||[]),id];save();emit('promo');closeModal();toast('Kampanjen är tillagd')};

/* Loyalty */
PAGES.loyalty=()=>{const q=(UI.f.lq||'').toLowerCase();return {white:true,title:'Loyalty members',bodyCss:'padding:0 0 30px',body:`<div style="text-align:right;padding:4px 30px 10px"><button style="color:var(--blue);font-size:12.5px;display:inline-flex;gap:5px;align-items:center" data-a="go" data-x="loyform" data-g="loy-add">${IC.user.replace('<svg','<svg style="width:15px;height:15px"')} Add member</button></div>
 <div style="padding:0 30px 14px"><div class="sfld" style="background:#fff;border:1px solid #d1d1d6;height:34px;border-radius:9px">${IC.search}<input data-in="lq" data-live="1" placeholder="Search mobile number, name or email" value="${esc(UI.f.lq||'')}"></div></div>
 <div style="margin:0 30px"><table class="tbl2"><tr><th colspan="2">Member</th></tr>${S.loyalty.filter(m=>!q||(m.name+m.phone+m.email).toLowerCase().includes(q)).map(m=>`<tr data-a="loytoorder" data-x="${m.id}" style="cursor:pointer"><td style="font-size:11.5px;line-height:1.45"><b>${esc(m.name)}</b><br>📞 ${esc(m.phone)}<br>✉ ${esc(m.email)}<br><span style="color:#6b6b70">${m.points} poäng</span></td><td style="text-align:right;color:#b0b0b6;vertical-align:middle">›</td></tr>`).join('')}</table></div>`,
 foot:`<button class="btnb" data-a="loyscan">${IC.qr} Scan QR-code</button>`}};
PAGES.loyform=()=>({title:'Add member',body:`${fld('Namn*','lname',{ph:'Namn'})}${fld('Mobil','lphone',{ph:'+4670...'})}${fld('E-post','lemail',{ph:'namn@exempel.se'})}`,foot:`<button class="btnb" data-a="loysave">Save</button>`});
Object.assign(A,{loysave(){const n=(UI.f.lname||'').trim();if(!n)return toast('Fyll i namn');S.loyalty.push({id:'l'+Date.now(),name:n,phone:UI.f.lphone||'',email:UI.f.lemail||'',points:0});save();pop()},
 loytoorder(id){const m=S.loyalty.find(x=>x.id===id);C().customer=m.name;save();closeModal();toast(m.name+' är kopplad till ordern och samlar poäng')},
 loyscan(){const m=S.loyalty[0];if(m){C().customer=m.name;save();closeModal();toast('QR-koden skannades: '+m.name)}}});

/* Layouts */
PAGES.layouts=()=>({title:'Layouts/Start Pages',body:`<div class="sec">Create new layout</div><div class="fld" style="padding-right:4px;height:31px;margin-bottom:0;border-radius:6px"><input data-in="lyname" data-live="1" placeholder="Name layout" value="${esc(UI.f.lyname||'')}"><button class="btnb ${UI.f.lyname?'':'dis'}" style="min-width:65px;height:25px;font-size:12px" data-a="lycreate">Create</button></div>
 <div class="sec" style="margin-top:22px">Layouts</div><div class="grp">${S.layouts.map(l=>row(l.name,{a:'lyactive',x:l.id,html:`${esc(l.name)}${S.layout===l.id?' <span class="bdg g" style="margin-left:6px">Active</span>':''}`,right:true,nochev:1,val:`<span data-a="lyedit" data-x="${l.id}" style="color:var(--blue)">${IC.pen.replace('<svg','<svg style="width:12px;height:12px;vertical-align:-1px"')} Edit</span>`})).join('')}</div>`});
Object.assign(A,{lycreate(){const n=(UI.f.lyname||'').trim();if(!n)return;S.layouts.push({id:'ly'+Date.now(),name:n});UI.f.lyname='';save();render()},lyactive(id){S.layout=id;save();render();toast('Layouten används i kassan')},lyedit(id){S.layout=id;save();closeModal();A.edit();UI.f.spname='';openModal('spages')}});

/* Payment methods (layout preview) */
PAGES.paymethods=()=>{const L=UI.f.pl||(UI.f.pl=JSON.parse(JSON.stringify({...S.payLayout,quick:S.payments.filter(p=>p.quick).map(p=>p.id)})));const show=L.numpad;
 const keys=show?['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k,i)=>k?`<span class="key" style="left:${0+44.5*(i%3)}px;top:${44.5*Math.floor(i/3)}px">${k==='⌫'?IC.bksp:k}</span>`:'').join(''):'';
 const qx=show?147:0,qw=show?70:217;const q=L.quick.map((id,i)=>`<div class="pvbtn" style="left:${qx}px;top:${i*90}px;width:${qw}px;height:83px">${PMI(id)}${esc(qName(S.payments.find(p=>p.id===id)))}<button class="rmv" data-a="plrm" data-x="${id}"></button></div>`).join('')+(L.quick.length<2?`<button class="addt" style="left:${qx}px;top:${L.quick.length*90}px;width:${qw}px;height:83px" data-a="pladd" data-g="pl-add">+</button>`:'');
 return {white:true,title:'Payment methods',body:`<div class="sec">Select payment layout</div><div class="grp" style="background:#e3e3e8">${row('Hide numpad',{a:'plnum',x:'0',html:`${rad(!show)}Hide numpad`,nochev:1})}${row('Show numpad',{a:'plnum',x:'1',html:`${rad(show)}Show numpad`,nochev:1,right:true,val:`<span style="color:#1c1c1e;font-size:12.5px;margin-right:6px">Use large numpad</span><span class="tog ${L.large?'on':''}" data-a="pllarge"></span>`})}</div>
 <div style="position:relative;width:${show?287:217}px;height:173px;margin:40px auto 0">${keys}${q}</div>
 ${UI.f.pladd?`<div class="sec" style="margin-top:20px">Lägg till betalsätt</div><div class="grp">${S.payments.filter(p=>!L.quick.includes(p.id)).map(p=>row(p.name,{a:'plpick',x:p.id,ic:p.icon})).join('')}</div>`:''}
 <p style="text-align:center;font-size:10.5px;color:#6b6b70;margin-top:22px">This is a preview of the Functions that will appear in the checkout.<br><br>Drag and drop to re-order the buttons and press the arrows to resize them.</p>`,
 foot:`<button class="btnb g" style="min-width:290px;color:var(--red)!important" data-a="plabort">Abort</button><button class="btnb" style="min-width:290px" data-a="plsave" data-g="pl-save">Save</button>`}};
Object.assign(A,{plnum(v){UI.f.pl.numpad=v==='1';render()},pllarge(){UI.f.pl.large=!UI.f.pl.large;render()},plrm(id){UI.f.pl.quick=UI.f.pl.quick.filter(x=>x!==id);render()},pladd(){UI.f.pladd=!UI.f.pladd;render()},plpick(id){UI.f.pl.quick.push(id);UI.f.pladd=false;render()},
 plabort(){UI.f.pl=null;UI.f.pladd=false;pop()},plsave(){const L=UI.f.pl;S.payLayout={numpad:L.numpad,large:L.large};S.payments.forEach(p=>p.quick=L.quick.includes(p.id));S.payments.forEach(p=>{if(p.quick)p.enabled=true});UI.f.pl=null;save();emit('pm:save');pop();toast('Betalsätten är sparade')}});
const _goPm=A.go;A.go=function(x,el){if(x==='paymethods'){UI.f.pl=null;UI.f.pladd=false}if(x==='functions'){UI.f.fl=null}return _goPm(x,el)};
/* register respects hide-numpad */
const _rp2=rightPanel;rightPanel=function(){let h=_rp2();if(S.payLayout&&!S.payLayout.numpad&&!UI.pop&&!C().ret){h=h.replace(/<button class="key"[^]*?<\/button>/g,'').replace(/class="pay ([^"]*)" style="left:147px;/g,'class="pay $1" style="left:8px;width:273px;')}return h};

/* Functions settings (preview grid) */
PAGES.functions=()=>{const L=UI.f.fl||(UI.f.fl=S.fnList.filter(f=>f.vis).map(f=>f.k));const changed=JSON.stringify(L)!==JSON.stringify(S.fnList.filter(f=>f.vis).map(f=>f.k));
 const tiles=L.map((k,i)=>`<div class="ftp" style="left:${94*(i%3)}px;top:${84*Math.floor(i/3)}px" data-a="flmove" data-x="${i}">${IC[FN[k].ic]}${esc(FN[k].name)}<button class="rmv" data-a="flrm" data-x="${k}" data-g="fl-rm-${k}"></button></div>`).join('')+(L.length<9?`<button class="addt" style="left:${94*(L.length%3)}px;top:${84*Math.floor(L.length/3)}px;width:86px;height:77px" data-a="fladd" data-g="fl-add">+</button>`:'');
 const rows=Math.ceil((L.length+(L.length<9?1:0))/3);
 return {white:true,title:'Functions',noClose:true,
 body:`<div style="display:flex;justify-content:flex-end;gap:4px;margin-top:-2px"><button class="btnb ${changed?'':'dis'}" style="min-width:0;height:24px;font-size:11px;padding:0 9px" data-a="flcancel">Cancel</button><button class="btnb ${changed?'':'dis'}" style="min-width:0;height:24px;font-size:11px;padding:0 9px" data-a="flsave" data-g="fl-save">${IC.save} Save</button></div><div style="position:relative;width:274px;height:${rows*84}px;margin:22px auto 0">${tiles}</div>${UI.f.fladd?`<div class="sec" style="margin-top:16px">Lägg till funktion</div><div class="grp">${Object.keys(FN).filter(k=>!L.includes(k)).map(k=>row(FN[k].name,{a:'flpick',x:k})).join('')}</div>`:''}
 <p style="text-align:center;font-size:10.5px;color:#6b6b70;margin-top:26px">This is a preview of the Functions that will appear in the checkout.<br><br>Drag and drop to re-order the buttons and press the arrows to resize them.<br><small>(I demon: tryck på en knapp för att flytta den ett steg tidigare.)</small></p>`}};
Object.assign(A,{flrm(k){UI.f.fl=UI.f.fl.filter(x=>x!==k);render()},fladd(){UI.f.fladd=!UI.f.fladd;render()},flpick(k){UI.f.fl.push(k);UI.f.fladd=false;render()},
 flmove(i){i=+i;if(i>0){const l=UI.f.fl;[l[i-1],l[i]]=[l[i],l[i-1]];render()}},flcancel(){UI.f.fl=null;pop()},
 flsave(){const L=UI.f.fl;S.fnList=[...L.map(k=>({k,vis:true})),...Object.keys(FN).filter(k=>!L.includes(k)).map(k=>({k,vis:false}))];UI.f.fl=null;save();pop();toast('Funktionerna är sparade')}});
/* header: Functions page shows back + custom right */
const _mh2=modalHtml;modalHtml=function(){let h=_mh2();if(UI.modal&&mtop().p==='functions'){const r=PAGES.functions({});h=h.replace('</div>\n   <div class="mb','</div>\n   <div class="mb')}return h};

/* Discount buttons */
PAGES.discbtns=()=>({title:'Discount buttons',bodyCss:'padding-top:20px',body:`<div style="text-align:center"><button class="btnb" data-a="go" data-x="discnew" data-g="disc-new">${IC.plus} Create discount button</button><div style="font-size:10px;color:#6b6b70;margin-top:8px">Max 8 discount buttons.</div></div>
 <div class="sec" style="margin-top:20px">Discount buttons</div><div class="grp">${S.discounts.map((x,i)=>`<div class="row" style="min-height:50px"><span><b>${x.kr?x.kr+' kr':x.pct+'%'} -</b> <span style="color:#6b6b70">${esc(x.name)}</span></span><span style="margin-left:auto;display:flex;align-items:center"><span class="pen" data-a="discedit" data-x="${x.id}">${IC.pen}</span><span class="hdl"></span></span></div>`).join('')}</div>`});

/* Guests */
PAGES.guestsset=()=>({title:'Guest count settings',body:`<div class="sec" style="text-transform:none;font-size:11.5px">Choose how guest count is added to orders</div><div class="grp">${[['manual','Add manually when needed'],['park','Ask the first time an order is parked'],['always','Always show guest count in the basket, starting at 0']].map(([k,l])=>row(l,{a:'guestmode',x:k,html:`${rad(S.guestMode===k)}${l}`,nochev:1,g:'gm-'+k})).join('')}</div>`});
A.guestmode=k=>{S.guestMode=k;S.guestsOn=true;save();render()};
A['m-guests']=()=>{UI.more=false;UI.f.amt=String(C().guests||'');openModal('guests')};
const _park=A.park;A.park=function(){if(S.guestMode==='park'&&!C().guests){UI.f.amt='';UI.afterGuests='park';return openModal('guests')}_park()};
const _gok=A.guestsok;A.guestsok=function(){_gok();if(UI.afterGuests==='park'){UI.afterGuests=null;_park()}};
const _rp3=rightPanel;rightPanel=function(){let h=_rp3();if(S.guestMode==='always'&&!C().guests)h=h.replace(/(Take-away|Eat in)(<\/button>)/,`$1<span style="margin-left:10px;color:var(--blue)" data-a="m-guests">👥 0</span>$2`);return h};

/* Cashier management */
PAGES.cashiers=()=>({title:'Cashier Management',bodyCss:'padding-top:22px',body:`<div class="grp" style="border-radius:12px">${row('Enable cashier management',{a:'cashtog',tog:S.cashierMode,g:'cash-toggle'})}</div>${S.cashierMode?`<p style="font-size:12px;color:#6b6b70;margin:10px 15px">Kassören loggar in med sin PIN. Demo: Ägare 1234, Barista 0000.</p><div class="sec">Inloggad kassör</div><div class="grp">${row(S.cashier||'Ingen',{a:'cashlogin',val:'<span style="color:var(--blue)">Byt kassör</span>',nochev:1})}</div>`:''}`});
A.cashtog=()=>{S.cashierMode=!S.cashierMode;if(!S.cashierMode)S.cashier=null;save();render();if(S.cashierMode)A.cashlogin()};
A.cashlogin=()=>{UI.f.pin='';push('pin',{next:'cashier'})};
const _pk3=A.pinkey;A.pinkey=function(k){const t=mtop();if(t.d.next!=='cashier')return _pk3(k);let p=UI.f.pin||'';if(k==='⌫')p=p.slice(0,-1);else if(p.length<4)p+=k;UI.f.pin=p;render();
  if(p.length===4)setTimeout(()=>{const u=S.cashiers.find(c=>c.pin===p);if(!u){UI.f.pin='';return toast('Fel PIN-kod')}S.cashier=u.name;save();pop();toast('Inloggad: '+u.name)},250)};
const _rp4=rightPanel;rightPanel=function(){let h=_rp4();if(S.cashierMode&&S.cashier)h=h.replace(/(<button class="tb ${''}[^"]*" style="left:7px;width:31px)/,'$1');if(S.cashierMode)h=h.replace('<div class="cart-h"',`<div style="position:absolute;left:44px;top:14px;font-size:11.5px;color:#6b6b70">${S.cashier?'👤 '+esc(S.cashier):''}</div><div class="cart-h"`);return h};

/* Other settings */
PAGES.other=()=>{const o=S.other,r=(k,v,l,obj=o)=>row(l,{a:'otherset2',x:(obj===o?'o':'t')+':'+k+':'+v,html:`${rad(String(obj[k])===String(v))}${l}`,nochev:1});
 return {title:'Other Settings',bodyCss:'padding:10px 13px 30px',body:`<div class="sec">Tap behaviour for products</div><div class="grp">${r('tapProduct','add','Tap To Add To Basket')}${r('tapProduct','open','Tap To Open Product Details')}</div><div class="cap">This will change the behaviour of tapping the listed products in the store view of the app.</div>
 <div class="sec">Tap behaviour for tables</div><div class="grp">${r('tapTable','add','Tap To Add To Basket',S.other2)}${r('tapTable','open','Tap To Open Table Details',S.other2)}</div><div class="cap">This will change the behaviour when tapping tables in the table management view</div>
 <div class="sec" style="text-transform:none;font-size:11.5px">Select Default for Eat In or Take-away</div><div class="grp">${r('defaultTakeaway','false','Eat in')}${r('defaultTakeaway','true','Take-away')}</div>`}};
A.otherset2=x=>{const[w,k,v]=x.split(':');const obj=w==='o'?S.other:S.other2;obj[k]=v==='true'?true:v==='false'?false:v;save();render()};

/* Support / Help */
PAGES.help=()=>({title:'Support',body:`<div class="sec" style="text-transform:none;font-size:12px">Yabie Support</div><div class="grp" style="padding:10px 15px;font-size:12.5px;line-height:1.6;border-radius:12px">Phone number: +46 10 551 73 33<br>E-mail: support@yabie.com<br>Chat: support.yabie.com</div><div style="margin-top:22px">${pr('Help center',{a:'helpcenter',chev:1})}</div>`});
A.helpcenter=()=>toast('Hjälpcentret öppnas: support.yabie.com');

/* About */
PAGES.about=()=>({title:'About',pill:{a:'aboutprint',html:`${IC.printer} Print`},bodyCss:'padding-top:22px',body:`<div class="grp" style="padding:16px 24px;display:flex;gap:24px;align-items:center;border-radius:12px"><div class="spin" style="animation:none;width:52px;height:52px;font-size:22px">ya</div><div style="font-size:12px;line-height:1.35"><b style="font-size:14px">${esc(S.store)} AB</b><br><b>Organization Number:</b> 559999-0000<br><hr style="border:0;border-top:1px solid #e3e3e8;margin:6px 0"><b>${esc(S.store)}</b><br>Storgatan 1, 111 22 Stockholm</div></div>
 <div class="sec" style="margin-top:22px">App</div><div class="grp">${[['Version','Express (webbdemo)'],['Server','demo'],['Local IP address','192.168.1.20'],['License','DEMO'],['Device Name','Webbläsare']].map(([k,v])=>row(k,{val:v,nochev:1})).join('')}</div>
 <div class="sec" style="margin-top:22px">Legal</div><div class="grp">${[['Model','YABIE EXPRESS-SE'],['Register Designation','1'],['Production No.','N/A'],['Manufacturer','Yabie AB']].map(([k,v])=>row(k,{val:v,nochev:1})).join('')}</div><div style="margin-top:18px">${pr('Privacy Policy',{a:'nop',chev:1})}</div>`});
A.aboutprint=()=>push('receipt',{kind:'demo',title:'About'});

/* Catalog (captions & latest update) */
PAGES.catalog=()=>({title:'Product Catalog',body:`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:12px">
  <button class="bigt" data-a="go" data-x="mpg" data-g="cat-mpg">${IC.shapes}Manage products & groups</button><button class="bigt" data-a="modopen" data-g="cat-mod">${IC.notes}Manage modifiers</button><button class="bigt" data-a="go" data-x="magic" data-g="cat-magic">${IC.tools}Magic Menu</button></div>
  <hr style="border:0;border-top:1px solid #cfcfd4;margin:20px 0">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px"><div><button class="prow" style="justify-content:center;color:var(--blue);gap:6px" data-a="catsync">${IC.refresh.replace('<svg','<svg style="width:14px;height:14px"')} Synchronize Product Catalog</button><div class="cap" style="margin-left:2px">This operation will refresh changes that have been made to the catalog</div></div>
  <div><button class="prow" style="justify-content:center;color:var(--red);gap:6px" data-a="catreload">Reload Product Catalog</button><div class="cap" style="margin-left:2px">This operation will delete the catalog stored on this device and reload a fresh version</div></div></div>
  <div class="grp" style="margin-top:4px;border-radius:12px">${row('Enable images on catalog buttons',{a:'catimg',tog:S.catalog.images})}</div><div class="cap">Displaying images will increase the grid size, so fewer products fit on the screen</div>
  <div class="sec">Overview</div><div class="grp">${row('Products',{val:S.products.length,nochev:1})}${row('Sellable',{val:S.products.filter(p=>p.sellable!==false).length,nochev:1})}${row('Visible',{val:S.products.length,nochev:1})}${row('Sellable Yabie Gift Cards',{val:Object.keys(S.giftcards).length,nochev:1})}</div>
  <div class="sec">Latest update</div><div class="grp">${row('Date',{val:S.catalog.synced||now(),nochev:1})}${row('Items Updated',{val:'-',nochev:1})}</div>`});
A.modopen=()=>{UI.modal.stack.push({p:'modifiers',d:{}});render()};
PAGES.modifiers=()=>({title:'Manage modifiers',noBack:true,css:'top:31px;height:727px',bodyCss:'padding-top:22px',body:`<div style="text-align:center"><button class="btnb" data-a="go" data-x="modform" data-g="mod-new">${IC.plus} Create new modifier set</button></div>
 <div class="sec" style="margin-top:22px">Modifier sets</div><div class="grp">${S.modifiers.map(m=>`<div class="row" style="min-height:54px"><span>${esc(m.name)}</span><span style="margin-left:auto;display:flex;align-items:center"><span class="pen" data-a="go" data-x="modform" data-y="${m.id}">${IC.pen}</span><span class="hdl"></span></span></div>`).join('')}</div>`});

/* ── Search: transforms the left panel like the real app ── */
UI.search=null;
A.search=()=>{UI.search={q:'',tab:'p'};render();setTimeout(()=>document.querySelector('#pos [data-in="sq"]')?.focus(),30)};
const _lp=leftPanel;leftPanel=function(){if(!UI.search)return _lp();const q=UI.search.q.toLowerCase();const ps=q?S.products.filter(p=>p.name.toLowerCase().includes(q)):[],gs=q?S.groups.filter(g=>g.name.toLowerCase().includes(q)):[];
 const list=UI.search.tab==='p'?ps.map(p=>`<button class="ci" style="background:#fff;border-radius:0;margin:0;border-bottom:1px solid #ececf0;display:flex;gap:10px;align-items:center;padding:8px 12px" data-a="searchadd" data-x="${p.id}" data-g="sr-${slug(p.name)}"><span style="width:34px;height:34px;border-radius:6px;background:${G(p.gid)?.color||'#eee'};flex:none"></span><span style="flex:1"><b style="font-size:13px">${esc(p.name)}</b><span class="chip" style="height:16px;font-size:10px;margin-top:3px;padding:0 5px">${esc(G(p.gid)?.name||'')}</span></span><b>${kr(p.price)}</b></button>`).join(''):gs.map(g=>`<button class="ci" style="background:#fff;border-radius:0;margin:0;border-bottom:1px solid #ececf0" data-a="searchgrp" data-x="${g.id}"><b>${esc(g.name)}</b></button>`).join('');
 return `<div class="pnl lp"><div class="tbar"><div class="sfld" style="position:absolute;left:7px;top:8px;width:${UI.search.q?'612':'612'}px;height:28px;background:#fff;border:1px solid #d1d1d6;border-radius:8px">${IC.search}<input data-in="sq" data-g="in-sq" placeholder="Search" value="${esc(UI.search.q)}">${UI.search.q?`<button data-a="sclear" style="color:#8e8e93">${IC.x}</button>`:''}<button data-a="scancel" style="color:var(--blue);font-size:13px" data-g="search-cancel">Cancel</button></div>
  <button class="tb" style="left:625px" data-a="scan">${IC.scan} Scan</button></div>
  <div style="position:absolute;left:0;right:0;top:44px;height:52px;border-bottom:1px solid var(--line);padding:12px 7px;display:flex;gap:6px"><button class="chip ${UI.search.tab==='p'?'on':''}" data-a="stab" data-x="p">Products (${ps.length})</button><button class="chip ${UI.search.tab==='g'?'on':''}" data-a="stab" data-x="g">Groups (${gs.length})</button><button class="chip" data-a="stab" data-x="g">Subgroups (0)</button></div>
  <div style="position:absolute;left:0;right:0;top:96px;bottom:0;background:#e9e9ee;overflow:auto">${list}</div></div>`};
Object.assign(A,{scancel(){UI.search=null;render()},sclear(){UI.search.q='';render()},stab(t){UI.search.tab=t;render()},scan(){toast('Skanna en streckkod med kameran eller en handskanner.')},
 searchadd(pid){addProduct(pid)},searchgrp(id){UI.search=null;UI.tab='g:'+id;render()}});
document.getElementById('pos').addEventListener('input',e=>{if(e.target.dataset.in==='sq'&&UI.search){UI.search.q=e.target.value;render()}});

/* ── Parked / table view (full screen) ── */
UI.tables=null;S.tables=S.tables||[{id:'t1',name:'Bord 1'},{id:'t2',name:'Bord 2'},{id:'t3',name:'Bord 3'},{id:'t4',name:'Bord 4'},{id:'t5',name:'Bord 5'},{id:'t6',name:'Bar 1'}];
A.parked=()=>{if(UI.edit)return;UI.tables={tab:'all'};UI.more=false;emit('open:parked');render()};
const _rnd=render;render=function(){_rnd();if(UI.tables){const pos=document.getElementById('pos');pos.insertAdjacentHTML('beforeend',tablesHtml());}};
function tablesHtml(){const t=UI.tables,occ=id=>S.parked.findIndex(c=>c.table===id);
 const tabs=`<button class="ftab ${t.tab==='all'?'on':''}" style="width:36px" data-a="ttab" data-x="all">All</button><button class="ftab ${t.tab==='room'?'on':''}" data-a="ttab" data-x="room">Kaffebaren</button>`;
 let body='';
 if(t.tab==='all')body=`<table class="tbl2" style="margin-top:6px"><tr><th>Updated ⇅</th><th>Started</th><th>Name</th><th>Table</th><th>Cashier</th><th>Info</th><th style="text-align:right">Total</th><th></th></tr>${S.parked.map((c,i)=>`<tr><td>${esc(c.parkedAt||'')}</td><td>${esc(c.parkedAt||'')}</td><td>${esc(c.name||'')}</td><td>${c.table?`<span class="bdg" style="background:#f2a9a2;color:#5a1f1a;font-size:11px;padding:3px 7px;border-radius:4px">${esc(S.tables.find(x=>x.id===c.table)?.name||'')}</span>`:''}</td><td>${esc(c.cashier||'')}</td><td>${c.note?'📝':''}</td><td style="text-align:right">${kr(cartTot(c))}</td><td><button class="tb on" style="position:static;width:28px;justify-content:center" data-a="unpark2" data-x="${i}" data-g="parked-${i}">${IC.basket}</button></td></tr>`).join('')}</table>${S.parked.length?'':'<p style="text-align:center;color:#8e8e93;margin-top:80px">Inga parkerade ordrar. Lägg något i varukorgen och tryck <b>Park</b>.</p>'}`;
 else body=`<div style="padding:8px"><button class="tb" style="position:static;display:inline-flex">${IC.pen} Edit</button></div><div style="position:relative">${S.tables.map((tb,i)=>{const o=occ(tb.id);return `<button class="tblsq ${o>=0?'occ':''}" style="left:${8+193*(i%5)}px;top:${8+130*Math.floor(i/5)}px" data-a="tbltap" data-x="${tb.id}" data-g="tbl-${slug(tb.name)}"><b>${esc(tb.name)}</b>${o>=0?`<small>(${kr(cartTot(S.parked[o]))})</small>`:''}</button>`}).join('')}</div>`;
 return `<div class="full" data-g="tables"><div class="fbar"><button class="tb" style="position:static;padding:0 6px" data-a="nop">${IC.cog}</button><span class="tb" style="position:static;padding:0 4px;background:none">${IC.plus}</span><span style="flex:1;display:flex;gap:6px;align-items:flex-end;height:44px">${tabs}</span><button data-a="tclose" style="color:var(--blue);display:grid" data-g="tables-close">${IC.x.replace('<svg','<svg style="width:18px;height:18px"')}</button></div><div style="position:absolute;left:0;right:0;top:44px;bottom:0;overflow:auto">${body}</div></div>`}
const _pk=A.park;A.park=function(){C().parkedAt=now().slice(5).replace('-','/').replace(',',',');C().name=C().name||now().slice(12)+' (auto)';C().cashier=S.cashier||'';_pk()};
Object.assign(A,{ttab(x){UI.tables.tab=x;render()},tclose(){UI.tables=null;render()},
 unpark2(i){if(C().items.length)return toast('Töm varukorgen först.');S.cart=S.parked.splice(+i,1)[0];UI.tables=null;save();emit('unpark');render()},
 tbltap(id){const o=S.parked.findIndex(c=>c.table===id);if(o>=0){if(C().items.length)return toast('Töm varukorgen först.');S.cart=S.parked.splice(o,1)[0];UI.tables=null;save();render();return}
  if(!C().items.length)return toast('Bordet är ledigt. Lägg något i varukorgen och tryck på bordet för att parkera där.');C().table=id;C().parkedAt=now().slice(5);C().name=S.tables.find(t=>t.id===id).name;S.parked.push(C());S.cart=newCart();S.cart.takeaway=S.other.defaultTakeaway;UI.tables=null;save();emit('park');toast('Ordern ligger på '+S.tables.find(t=>t.id===id).name);render()}});

/* ── Online orders view ── */
UI.online=null;
A.online=()=>{UI.online={tab:'orders',f:'all'};render()};
const _rnd2=render;render=function(){_rnd2();if(UI.online)document.getElementById('pos').insertAdjacentHTML('beforeend',onlineHtml())};
function onlineHtml(){const o=UI.online;const tab=(k,l,ic)=>`<button class="ftab ${o.tab===k?'on':''}" data-a="otab" data-x="${k}">${ic} ${l}</button>`;
 return `<div class="full" data-g="online-view"><div class="fbar"><button class="tb" style="position:static;padding:0 6px">${IC.cog}</button><div class="tb" style="position:static;color:#1c1c1e!important;gap:8px"><span class="dot" style="width:8px;height:8px;border-radius:50%;background:#34c759;display:inline-block"></span>Open <span style="color:#1c1c1e">Preparation Time:</span> <b style="color:var(--blue)">0 min</b></div><span style="flex:1"></span>${tab('orders','Online orders',IC.bell.replace('<svg','<svg style="width:13px;height:13px"'))}${tab('history','History',IC.receipt.replace('<svg','<svg style="width:13px;height:13px"'))}<button data-a="oclose" style="color:var(--blue);margin-left:6px;display:grid" data-g="online-close">${IC.x.replace('<svg','<svg style="width:18px;height:18px"')}</button></div>
 ${o.tab==='orders'?`<div style="padding:12px 8px;display:flex;gap:6px">${['all:All','new:New','eat:Eat in','take:Takeaway'].map(s=>{const[k,l]=s.split(':');return `<button class="chip ${o.f===k?'on':''}" data-a="ofilt" data-x="${k}">${l}</button>`}).join('')}<span style="flex:1"></span><button class="chip on">${IC.grid.replace('<svg','<svg style="width:13px;height:13px"')}</button><button class="chip">${IC.fn.replace('<svg','<svg style="width:13px;height:13px"')}</button></div><p style="text-align:center;color:#8e8e93;margin-top:160px">Inga online-ordrar just nu.<br>Beställningar från webbshop och QR-beställning dyker upp här.</p>`
 :`<div style="padding:12px;display:flex;justify-content:center"><div class="sfld" style="width:460px;height:32px;background:#fff;border:1px solid #d1d1d6">${IC.search}<input placeholder="Search Order"></div></div><table class="tbl2"><tr><th>Order Time</th><th>Order</th><th>Total amount</th><th>Name</th><th>Contact info</th><th>Delivery partners</th></tr></table><p style="text-align:center;font-size:12.5px;margin-top:10px">Use search to find orders that are older than two days</p>`}</div>`}
Object.assign(A,{otab(k){UI.online.tab=k;render()},ofilt(k){UI.online.f=k;render()},oclose(){UI.online=null;render()}});
/* make the Online orders pill clickable */
const _lp2=leftPanel;leftPanel=function(){return _lp2().replace('<div class="tb oo" style="left:99px" data-g="online">','<div class="tb oo" style="left:99px;cursor:pointer" data-g="online" data-a="online">')};

/* More menu: bigger black icons + Courses/Tipping toggles */
const _rp5=rightPanel;rightPanel=function(){let h=_rp5();if(UI.more){h=h.replace(/<div class="more"[^]*?<\/div>/,`<div class="more" data-g="more-menu">
 <button data-a="m-notes">${IC.notes} Order notes</button><button data-a="m-allergy">${IC.warn} Allergy request</button><hr>
 <button data-a="toggleta" data-g="more-ta">${IC.bagline} ${C().takeaway?'Eat in':'Take-away'}</button><hr>
 <button data-a="m-guests">${IC.users} Add guests</button><button data-a="m-customer" data-g="more-customer">${IC.user} Add Customer</button><hr>
 <button class="${S.courses.items.length?'':'off'}" data-a="m-courses">${IC.cloche} ${UI.showCourses?'Hide':'Show'} Courses</button><hr>
 <button data-a="openret" data-g="more-openret">${IC.ret} Open return</button><hr>
 <button data-a="m-courses" style="padding:4px 12px"><span class="rdot"></span> Courses</button><button data-a="m-tiptog" style="padding:4px 12px"><span class="rdot" style="${S.tipping.on?'border-color:#34c759':''}"></span> Tipping</button></div>`)}return h};
A['m-tiptog']=()=>{S.tipping.on=!S.tipping.on;save();UI.more=false;render();toast(S.tipping.on?'Dricks vid kortbetalning är på':'Dricks vid kortbetalning är av')};

/* re-render with all overrides in place */
render();

/* discount button edit */
PAGES.discedit=d=>{const x=S.discounts.find(z=>z.id===d.id);return {title:'Edit discount button',body:`${fld('Namn','dname',{ph:'Namn'})}${fld('Procent','dpct',{ph:'10',mode:'numeric'})}<div style="margin-top:8px">${pr('Ta bort knappen',{a:'discdel2',x:d.id,css:'color:var(--red)'})}</div>`,foot:`<button class="btnb" data-a="discsave2" data-x="${d.id}">Save</button>`}};
A.discedit=id=>{const x=S.discounts.find(z=>z.id===id);UI.f.dname=x.name;UI.f.dpct=String(x.pct);push('discedit',{id})};
A.discdel2=id=>{S.discounts=S.discounts.filter(d=>d.id!==id);save();pop()};
A.discsave2=id=>{const x=S.discounts.find(z=>z.id===id),p=parseFloat(UI.f.dpct);if(!UI.f.dname||!(p>0&&p<=100))return toast('Fyll i namn och procent');x.name=UI.f.dname;x.pct=p;save();pop()};
/* Z: realistic history, no extra note; X history */
if(S.zreports.length<3){const d=new Date();S.zreports=[];for(let i=8;i>=1;i--){const t=new Date(d-i*864e5);const s=t.toISOString().slice(0,10);if(i===5)continue;S.zreports.push({at:s+', 22:00',total:4000+((i*937)%5000),count:60+((i*13)%70)})}save()}
if(!S.xreports.length){S.xreports=[{at:'2026-09-21, 15:40',total:2310,count:31},{at:'2026-10-02, 11:38',total:980,count:14}];save()}
const _z2=PAGES.z;PAGES.z=()=>{const r=_z2();r.body=r.body.replace(/<div class="grp" style="margin-top:24px;padding:12px[^]*?<\/div>/,'');r.bodyCss='padding-top:16px';return r};
/* PIN box with eye icon like the real app */
const _pin2=PAGES.pin;PAGES.pin=d=>{const r=_pin2(d);r.body=r.body.replace(/<div class="pin">([^]*?)<\/div>/,(m,i)=>`<div class="pin" style="position:relative">${i}<span style="position:absolute;right:12px;top:12px;color:var(--blue)">${IC.search.replace(/<svg[^>]*>[^]*<\/svg>/,'')}<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></span></div>`);return r};
const _tt2=PAGES.timetrack;PAGES.timetrack=()=>{const r=_tt2();r.body=r.body.replace(/<div class="pin">([^]*?)<\/div>/,(m,i)=>`<div class="pin" style="position:relative">${i}<span style="position:absolute;right:12px;top:12px;color:var(--blue)"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></span></div>`);return r};

/* ── v3 fidelity pass ── */
/* Edit mode: numpad greyed and edit badges on payment/function buttons like the real app */
const _rp6=rightPanel;rightPanel=function(){let h=_rp6();if(UI.edit){h=h.replace(/class="key"/g,'class="key" data-a2="dis" style="opacity:.45;pointer-events:none;"').replace(/(<button class="pay [^"]*" style="left:\d+px;top:(\d+)px[^"]*"[^>]*>)/g,(m,a,t)=>a+`<span class="edb" style="right:-4px;top:-5px">${IC.pen}</span>`).replace(/(<button class="bb [^"]*"[^>]*>[^<]*)(<\/button>)/g,`$1<span class="edb" style="right:-4px;top:-5px">${IC.pen}</span>$2`)}return h};
/* Start pages dialog in edit mode (white, Cancel / Done) */
PAGES.spdialog=()=>({white:true,noClose:true,title:'Start pages',left:`<button class="txt" style="left:7px" data-a="spcancel" data-g="sp-cancel">Cancel</button>`,right:`<button class="txt" style="right:7px" data-a="mclose" data-g="sp-done">Done</button>`,body:`<div class="sec">Create start page</div>
 <div class="fld" style="padding-right:4px;border:1px solid #e1e1e6;height:36px;border-radius:6px"><input data-in="spname" data-live="1" data-g="in-spname" placeholder="Name Start Page" value="${esc(UI.f.spname||'')}"><button class="btnb ${UI.f.spname?'':'dis'}" style="min-width:66px;height:28px;font-size:12px" data-a="spcreate" data-g="sp-create">Create</button></div>
 <div class="sec">Start pages</div><div class="grp" style="background:#f2f2f6">${S.startPages.map(s=>`<div class="row" style="min-height:46px;background:#fff"><span>${esc(s.name)}</span><span style="margin-left:auto;display:flex;align-items:center;gap:12px"><button data-a="spcolor" data-x="${s.id}" style="width:22px;height:22px;border-radius:50%;background:${s.color}"></button><button data-a="spdel" data-x="${s.id}" style="color:var(--red);font-size:12px">Ta bort</button><span class="hdl" style="margin-left:0"></span></span></div>`).join('')}</div>`});
A.addsp=()=>{UI.f.spname='';openModal('spdialog')};
A.spcancel=()=>closeModal();
const _tabA=A.tab;A.tab=function(x){if(UI.edit&&x.startsWith('sp:')&&UI.tab===x){UI.f.spname='';return openModal('spdialog')}return _tabA(x)};
A.lyedit=id=>{S.layout=id;save();closeModal();A.edit();UI.f.spname='';openModal('spdialog')};
/* tours referenced the old page id */
/* white modals like the real app */
for(const k of ['addtile','tilestyle','pickgroup','termip','dispip','retreason','printer']){const o=PAGES[k];PAGES[k]=d=>({...o(d),white:true})}
const _at=PAGES.addtile;PAGES.addtile=d=>{const r=_at(d);r.body=r.body.replace(/<svg /g,'<svg style="width:44px;height:44px" ');return r};
/* choose product group: Cancel / Done, plain list */
PAGES.pickgroup=()=>({white:true,noClose:true,title:'Choose product group',left:`<button class="txt" style="left:7px" data-a="mback">Cancel</button>`,right:`<button class="txt" style="right:7px" data-a="mback" data-g="pg-done">Done</button>`,bodyCss:'padding-top:4px',body:S.groups.map(g=>`<button class="row" style="min-height:40px;border-bottom:1px solid #ececf0;font-weight:700" data-a="pickgrp" data-x="${g.id}" data-g="pg-${slug(g.name)}">${rad(UI.f.pf.gid===g.id)}${esc(g.name)}</button>`).join('')});
/* product form closer to the real one */
PAGES.prodform=d=>{const f=UI.f.pf;const g=G(f.gid);const chev=`<span style="color:var(--blue)">${IC.chev.replace('<svg','<svg style="width:11px;height:11px"')}</span>`;const ok=(UI.f.pname||'').trim()&&f.gid&&(f.price||f.priceType==='variable');
 return {white:false,title:d.id?'Edit product':'Create new product',bodyCss:'padding:24px 30px 90px',body:`${fld('Name*','pname',{ph:'Product name'})}
  <button class="fld" style="width:100%" data-a="go" data-x="pickgroup" data-g="pf-group"><label>Product group*</label><span class="rt" style="color:${g?'#1c1c1e':'#8e8e93'}">${g?esc(g.name):'Choose'} ${chev}</span></button>
  <div class="sec" style="margin:-8px 0 6px 2px">Price*</div><div style="margin-bottom:8px;font-size:12.5px"><span data-a="pftype" data-x="fixed" style="margin-right:16px;cursor:pointer">${rad(f.priceType!=='variable')}Fixed price</span><span data-a="pftype" data-x="variable" data-g="pf-variable" style="cursor:pointer">${rad(f.priceType==='variable')}Variable price</span></div>
  ${f.priceType==='variable'?'<p style="color:#8e8e93;margin:0 0 14px;font-size:12px">Priset anges i kassan varje gång produkten säljs.</p>':`<button class="fld" style="width:100%;margin-bottom:12px" data-a="go" data-x="price" data-g="pf-price"><label>Default price (${g?g.vat:0}% VAT)${f.unit==='kg'?' per kg':''}</label><span class="rt" style="color:#1c1c1e">${n2(f.price||0)} kr ${chev}</span></button>`}
  <div style="font-size:12.5px;margin-bottom:14px">${rad(false)}Enter cost price</div>
  <div class="sec" style="margin:0 0 6px 2px">Additional prices (activate price list and set price)</div><div class="fld"><span style="color:var(--blue)">ⓘ</span> Avhämtning (moms 6%)<span class="rt"><span class="tog ${f.ta6?'on':''}" data-a="pfta"></span></span></div>
  <hr style="border:0;border-top:1px solid #d1d1d6;margin:6px -30px 18px"><div style="font-weight:600;font-size:14px;margin-bottom:14px">Additional information</div>
  <div class="fld tall"><label>Description</label><input data-in="pdesc" value="${esc(UI.f.pdesc||'')}" placeholder="Product description"><span style="position:absolute;right:42px;margin-top:-8px;font-size:12px">SV</span></div>
  <button class="fld" style="width:100%" data-a="pfunit">Unit<span class="rt" style="color:#1c1c1e">${f.unit==='kg'?'Kilogram':'Units'} <span style="color:var(--blue)">⇕</span></span></button>
  <button class="fld" style="width:100%" data-a="pfsell">Can be sold<span class="rt"><span class="tog ${f.sellable!==false?'on':''}"></span></span></button>
  ${d.id?`<div class="sec">Tillval</div><div class="grp">${S.modifiers.map(m=>row(m.name,{a:'pfmod',x:m.id,html:`${rad(m.pids.includes(d.id))}${esc(m.name)}`,nochev:1})).join('')}</div><div style="margin-top:18px">${pr('Ta bort produkten',{a:'proddel',css:'color:var(--red)'})}</div>`:''}`,
  foot:`<button class="btnb" style="min-width:224px;background:#fff;color:#1c1c1e!important;font-weight:500" data-a="mback">Cancel</button><button class="btnb ${ok?'':'dis'}" style="min-width:224px" data-a="prodsave" data-x="copy">${IC.copy} Save & Copy</button><button class="btnb ${ok?'':'dis'}" style="min-width:224px" data-a="prodsave" data-g="pf-save">${IC.save} Save</button>`}};
A.pfunit=()=>{UI.f.pf.unit=UI.f.pf.unit==='kg'?'st':'kg';render()};A.pfta=()=>{UI.f.pf.ta6=!UI.f.pf.ta6;render()};
document.getElementById('pos').addEventListener('input',e=>{if(e.target.dataset.in==='pname'&&mtop&&UI.modal&&mtop().p==='prodform'){const b=document.querySelectorAll('#pos .mf .btnb');const ok=e.target.value.trim()&&UI.f.pf.gid&&(UI.f.pf.price||UI.f.pf.priceType==='variable');[b[1],b[2]].forEach(x=>x&&x.classList.toggle('dis',!ok))}});
/* group form: tax group dropdown, product note, image, no colour picker */
PAGES.grpform=d=>{const v=UI.f.vat;const ok=(UI.f.gname||'').trim()&&v!=null;
 return {title:d.id?'Edit product group':'Add new product group',bodyCss:'padding:24px 30px 90px',body:`${fld('Product group name*','gname',{ph:'Product group name'})}
  <button class="fld" style="width:100%;position:relative" data-a="vatopen" data-g="gf-vat">VAT Group<span class="rt" style="color:#1c1c1e">${v!=null?v+' %':'Choose a tax group'} <span style="color:var(--blue)">⇕</span></span></button>
  ${UI.f.vatopen?`<div style="position:absolute;right:30px;top:120px;background:#fff;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.18);z-index:5;width:90px;padding:4px 0">${[6,25,12,0].map(x=>`<button class="row" style="min-height:32px;font-size:12.5px" data-a="vat" data-x="${x}" data-g="vat-${x}">${rad(v===x)}${x} %</button>`).join('')}</div>`:''}
  <hr style="border:0;border-top:1px solid #d1d1d6;margin:0 -30px 18px"><div style="font-weight:600;font-size:14px;margin-bottom:14px">Additional information</div>
  <div class="fld tall"><label>Description</label><input data-in="gdesc" placeholder="Product group description" value="${esc(UI.f.gdesc||'')}"></div>
  <div class="fld"><label>General ledger account*</label><input value="${v!=null?VAT_LEDGER[v]:''}" placeholder="General ledger account*" readonly></div>
  <div class="fld"><label>External ID</label><input placeholder="External ID"></div>
  <div class="fld">Product note<span class="rt" style="color:#1c1c1e">None <span style="color:var(--blue)">⇕</span></span></div>
  <div class="grp" style="padding:10px;display:flex;align-items:center;gap:12px"><div style="width:106px;height:82px;border-radius:4px;background:linear-gradient(135deg,#e8ebf2,#c9d0de)"></div><button class="btnb g" style="min-width:0;height:30px;background:#fff;border:1px solid var(--blue);font-size:12px" data-a="nop">${IC.cam} Take photo</button><button class="btnb g" style="min-width:0;height:30px;background:#fff;border:1px solid var(--blue);font-size:12px" data-a="nop">${IC.img} Add image</button></div>`,
  foot:`<button class="btnb ${ok?'':'dis'}" data-a="grpsave" data-g="gf-save">${IC.save} Save</button>`}};
A.vatopen=()=>{UI.f.vatopen=!UI.f.vatopen;render();emit('vatopen')};
const _vat=A.vat;A.vat=function(x){UI.f.vatopen=false;_vat(x)};
const _go3=A.go;A.go=function(x,el){_go3(x,el);if(x==='grpform'&&!el?.dataset?.y){UI.f.gcolor=COLORS[(S.groups.length*5+2)%COLORS.length];UI.f.vatopen=false;render()}};
document.getElementById('pos').addEventListener('input',e=>{if(e.target.dataset.in==='gname'&&UI.modal&&mtop().p==='grpform'){const b=document.querySelector('#pos .mf .btnb');if(b)b.classList.toggle('dis',!(e.target.value.trim()&&UI.f.vat!=null))}});
/* amount entry with comma key */
const _price=PAGES.price;PAGES.price=()=>{const r=_price();r.body=r.body.replace("pad('amtkey')","").replace(/<div class="npad">[^]*<\/div>/,'')+'';r.body=`<div class="amt" style="margin-top:20px"><small>Enter amount</small>${UI.f.amt||'0'},00 kr</div>${pad('amtkey',',')}`;r.css='top:31px;height:727px';return r};
const _amtkey=A.amtkey;A.amtkey=function(k){if(k===',')return;_amtkey(k)};
/* order detail: VAT summary like the real app */
const _order=PAGES.order;PAGES.order=d=>{const r=_order(d);const o=S.orders.find(x=>x.id===d.id);if(!o)return r;
 r.body=r.body.replace(/<div style="display:flex;justify-content:space-between;padding:10px 15px;font-size:13px"><span><b>Payments:<\/b> ([^<]*)<\/span><span><b>(Paid now|Refunded):<\/b> ([^<]*)<\/span><\/div>/g,(m,meth,lbl,amt)=>{const tot=parseFloat(amt.replace(/\s/g,'').replace(',','.'))||0;const vat=o.items.reduce((a,it)=>{const v=vatOf({...it,ta:it.ta??o.takeaway});const l=lineTot(it);return a+l-l/(1+v/100)},0)*(tot<0?-1:1);
  return `<div style="font-size:12px;padding:10px 15px;display:grid;grid-template-columns:1fr auto;row-gap:2px"><span>Excluding VAT:</span><span style="text-align:right">${kr(tot-vat)}</span><span>VAT:</span><span style="text-align:right">${kr(vat)}</span><span>${lbl}:</span><span style="text-align:right">${amt}</span><b style="margin-top:6px">Left to pay:</b><b style="text-align:right;margin-top:6px">0,00 kr</b><span style="margin-top:6px"><b>Payments:</b> ${meth}</span><span></span></div>`});return r};
/* return mode: dim the sales area; refund only to the original payment method */
const _lp3=leftPanel;leftPanel=function(){let h=_lp3();if(C().ret&&!UI.search)h=h.replace(/<\/div>$/,'<div style="position:absolute;inset:0;background:rgba(60,60,67,.18);z-index:5" data-a="nop"></div></div>');return h};
const _rp7=rightPanel;rightPanel=function(){let h=_rp7();if(C().ret&&UI.pop==='pay'){const o=S.orders.find(x=>x.id===C().ret);const m=o&&S.payments.find(p=>p.name===o.history[0].method);if(m)h=h.replace(/<button class="ft pm r"[^]*?<\/button>/g,x=>x.includes(`data-x="${m.id}"`)?x.replace(/left:\d+px;top:(\d+)px/,'left:7px;top:$1px'):'')}return h};
/* terminals list like the real app */
PAGES.terminals=()=>({title:'Payment Terminals',body:`<div style="text-align:center;margin:6px 0 18px;color:#9a9aa0"><svg viewBox="0 0 64 40" width="96" height="62" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8 26l24-16 24 12-24 16z"/><path d="M8 26v3l24 12v-3M56 22v3L32 41"/><path d="M20 22l12-7 8 4-12 7zM30 30l2-1m3 3l2-1m3 3l2-1M27 28l2-1m3 3l2-1m3 3l2-1"/><path d="M40 6c2-2 6-2 8 0M42 9c1-1 3-1 4 0"/></svg></div>

 <div class="grp" style="border-radius:12px;padding:4px 0">${row('Bambora',{a:'go',x:'termprov',y:'Bambora',ic:'term',nochev:1,g:'prov-bambora'})}${row('Swedbank Pax',{a:'go',x:'termprov',y:'Swedbank Pax',ic:'term',nochev:1,g:'prov-swedbank'})}</div>`});
/* receipt printer detail */
PAGES.printer=()=>{if(!S.printer.name)return {white:true,title:'Add receipt printer',body:`<div class="sec">Local network printers</div><div class="grp">${['mC-Print3 E874','TSP100IV 64F6','mC-Print3 C6CA'].map(n=>row(n,{a:'prsel',x:n,ic:'printer',icbg:'#9a9aa0'})).join('')}</div>`};
 const L=[['tsp100IV 64F6','00:11:62:58:64:f6'],['tsp100IV 1B74','00:11:62:57:1b:74'],['mC-Print3 E874','00:11:62:32:e8:74'],['mC-Print3 C6CA','00:11:62:1e:c6:ca']];
 return {title:'Receipt printer',body:`<div style="text-align:center;font-size:14px">${esc(S.printer.name)}<br><span style="color:${S.printer.connected?'#34c759':'#ef4444'}">${S.printer.connected?'Ready':'Not connected'}</span></div><hr style="border:0;border-top:1px solid #d1d1d6;margin:10px 0">
  <div style="display:grid;grid-template-columns:1fr 1fr;font-size:12px;line-height:1.35"><span><b>Connection:</b> LAN<br><b>Address:</b> 00:11:62:32:e8:74<br><b>Paper Size:</b> 2 inch</span><span><b>Cover:</b> -<br><b>Paper:</b> -<br><b>Scanner:</b> -</span></div><hr style="border:0;border-top:1px solid #d1d1d6;margin:10px 0">
  <div style="display:flex;gap:6px;justify-content:center"><button class="btnb" style="min-width:308px;background:#fff;color:var(--blue)!important" data-a="prforget">Forget This Printer</button><button class="btnb" style="min-width:308px" data-a="prdemo" data-g="print-demo">Print Demo Receipt</button></div>
  <div class="sec">USB printers</div><div class="grp" style="padding:9px 12px;font-size:11px;color:#6b6b70">No printers connected</div>
  <div class="sec">Local network printers</div><div class="grp">${L.map(([n,m])=>row(n,{a:'prsel',x:n,html:`<span style="display:flex;gap:10px;align-items:center">${IC.printer.replace('<svg','<svg style="width:15px;height:15px;color:#6b6b70"')}<span>${esc(n)}<br><small style="color:#6b6b70">${m}</small></span></span>`,val:S.printer.name===n?'<span style="color:var(--blue)">✓</span>':'',nochev:1})).join('')}</div>`,
  foot:`<button class="btnb" data-a="nop">Add New Receipt Printer Manually</button>`}};
const _printers=PAGES.printers;PAGES.printers=()=>{const r=_printers();r.body=r.body.replace('<p style="font-size:11.5px;color:#8e8e93">NOTE:','<p style="font-size:10.5px;color:#6b6b70;margin:8px 15px">Select the printer to use for receipts, reports and order confirmations.</p><p style="font-size:10.5px;color:#6b6b70;margin:8px 15px">NOTE:');return r};
/* customer display labels */
PAGES.custdisp=()=>({title:'Customer Display',body:`<div class="sec" style="text-transform:none;font-size:12px">Customer Display Configuration</div><div class="grp" style="border-radius:12px">${row('IP Address',{a:'go',x:'dispip',g:'disp-ip',html:`IP Address: <b>${esc(S.display.ip||'–')}</b>`})}</div>
 <div class="sec" style="text-transform:none;font-size:12px">Status</div><div class="grp" style="border-radius:12px">${row('Auto connect to customer display',{a:'dispauto',tog:S.display.auto})}${row('Connect to customer display',{html:`<span style="color:#8e8e93">Connect to customer display</span>`,nochev:1,val:S.display.ip?'Connecting... <span style="color:#34c759">●</span>':''})}${row('Disconnect customer display',{html:`<span style="color:#8e8e93">Disconnect customer display</span>`,nochev:1})}</div>`});
/* functions popup: two-line labels like the real app */
const _fnNames={splititems:'Split<br>by items',openreturn:'Open<br>return',splitamount:'Split by<br>amount'};
const _rp8=rightPanel;rightPanel=function(){let h=_rp8();if(UI.pop==='fn')for(const k in _fnNames)h=h.replace(new RegExp(`(data-g="ft-${k}">[^]*?</svg>)${FN[k].name}`),`$1${_fnNames[k]}`);return h};
/* product list rows with copy icon */
const _mpg=PAGES.mpg;PAGES.mpg=()=>{const r=_mpg();r.body=r.body.replace(/(data-g="prod-[^"]*"[^>]*>[^]*?<span class="chev">)/g,`$1<span style="color:var(--blue);margin-right:10px">${IC.copy.replace('<svg','<svg style="width:15px;height:15px"')}</span>`);return r};
render();

/* ── v3b: small alignment fixes ── */
(()=>{const st=document.createElement('style');st.textContent=`#pos .row .val{display:flex;align-items:center;white-space:nowrap}#pos .row .tog{flex-shrink:0}#pos .row .chev{flex-shrink:0;padding-right:4px}#pos .grp[style*="e3e3e8"] .tog:not(.on){background:#c7c7cc}`;document.head.appendChild(st)})();
/* start pages dialog is grey with a white Cancel pill, like the real app */
{const _sd=PAGES.spdialog;PAGES.spdialog=d=>{const r=_sd(d);r.white=false;r.left=r.left.replace('class="txt" style="left:7px"','class="txt" style="left:9px;background:#fff;border-radius:16px;padding:6px 12px;color:#1c1c1e"');return r}}
/* return mode: no take-away row, like the real app */
{const _rp8=rightPanel;rightPanel=function(){let h=_rp8();if(C().ret)h=h.replace(/<button class="cart-h"[^>]*data-g="cart-ta">[^]*?<\/button>/,'');return h}}

/* ── v4: discount dialogs like the real app (Item Discount / Basket Discount) ── */
{const st=document.createElement('style');st.textContent=`#pos .dgrid{display:grid;grid-template-columns:150px 150px;gap:16px;margin-top:10px}
#pos .dgrid button{height:49px;border-radius:6px;background:var(--blue);color:#fff!important;font-size:14px;line-height:1.25;font-weight:500;padding:0 4px}
#pos .dgrid button.sm{font-size:11.5px}#pos .dgrid button.on{box-shadow:0 0 0 3px #a8c8ff}
#pos .dval{text-align:center;font-size:22px;font-weight:600;margin:6px 0 -6px}#pos .dval i{color:#8e8e93;font-style:normal}#pos .dval b{display:inline-block;width:1.5px;height:20px;background:var(--blue);vertical-align:-3px;margin:0 3px 0 1px}
#pos .dinfo{display:flex;justify-content:space-between;font-size:12.5px;color:#6b6b70;margin:10px 0 9px}#pos .dinfo b{color:#1c1c1e;font-weight:500}`;document.head.appendChild(st)}
const discBase=d=>{const c=C();if(d.i!=null){const it=c.items[d.i];return it?it.price*it.qty:0}return c.items.reduce((a,it)=>a+lineTot(it),0)-promoCalc(c).disc};
const discCalc=d=>{const b=discBase(d),v=parseFloat((UI.f.dval||'0').replace(',','.'))||0;const amt=UI.f.dmode==='amt'?Math.min(v,b):b*Math.min(v,100)/100;return {b,amt,v}};
PAGES.discount=d=>{const item=d.i!=null;const {b,amt,v}=discCalc(d);const mode=UI.f.dmode||'pct';
 const cur=item?C().items[d.i]?.disc:C().orderDisc;
 const btns=S.discounts.map(x=>{const lbl=x.kr?x.kr+' kr':x.pct+'%';return `<button class="${x.name.length>16?'sm':''} ${UI.f.dbtn===x.id?'on':''}" data-a="dbtn" data-x="${x.id}" data-g="disc-${x.kr?x.kr+'kr':x.pct}">${lbl}<br>${esc(x.name)}</button>`}).join('');
 return {white:true,noBack:true,noClose:true,title:item?'Item Discount':'Basket Discount',right:`<button class="cl" data-a="${item?'mback':'mclose'}" data-g="m-close">${IC.x}</button>`,bodyCss:'padding:18px 30px 90px',
  body:`<div class="fld" style="border:1px solid #d1d1d6;height:34px;margin:0"><input data-in="ddesc" data-g="in-ddesc" placeholder="Discount Description" value="${esc(UI.f.ddesc||'')}"></div>
  <div class="dinfo"><span>Discountable: <b>${kr(b)}</b></span><span>New Price: <b>${kr(b-amt)}</b></span></div><hr style="border:0;border-top:1px solid #d1d1d6;margin:0 0 14px">
  <div style="display:flex;gap:40px"><div style="flex:1"><div style="font-size:12.5px;font-weight:600;color:#6b6b70">Discount buttons</div><div class="dgrid">${btns}</div></div>
  <div style="width:316px"><div class="seg" style="margin:0 0 8px"><button class="${mode==='pct'?'on':''}" data-a="dmode" data-x="pct" data-g="disc-pct">Percentage</button><button class="${mode==='amt'?'on':''}" data-a="dmode" data-x="amt" data-g="disc-amt">Amount</button></div>
  <div class="dval">${UI.f.dval?esc(UI.f.dval):'<i>0</i>'}<b></b> ${mode==='pct'?'%':'kr'}</div>${pad('dkey')}</div></div>`,
  foot:`${cur?`<button class="btnb" style="min-width:150px;background:#fff;color:var(--red)!important;border:1px solid #e1e1e6" data-a="ddel" data-g="disc-remove">Remove discount</button>`:''}<button class="btnb ${v>0?'':'dis'}" style="min-width:308px" data-a="dadd" data-g="disc-apply">${IC.tag.replace('<svg','<svg style="width:15px;height:15px;margin-right:6px;vertical-align:-3px"')}Add Discount</button>`}};
const _dreset=()=>{UI.f.dval='';UI.f.dmode='pct';UI.f.ddesc='';UI.f.dbtn=null};
const _push4=push;push=function(p,d){if(p==='discount')_dreset();return _push4(p,d)};
const _open4=openModal;openModal=function(p,d){if(p==='discount')_dreset();return _open4(p,d)};
A.dmode=x=>{UI.f.dmode=x;UI.f.dbtn=null;render()};
A.dkey=k=>{let v=UI.f.dval||'';if(k==='⌫')v=v.slice(0,-1);else if(v.length<6)v=(v==='0'?'':v)+k;UI.f.dval=v;UI.f.dbtn=null;render()};
A.dbtn=id=>{const x=S.discounts.find(z=>z.id===id);if(!x)return;UI.f.dbtn=id;UI.f.dmode=x.kr?'amt':'pct';UI.f.dval=String(x.kr||x.pct);UI.f.ddesc=x.name;render()};
A.dadd=()=>{const d=mtop().d;const {b,amt,v}=discCalc(d);if(!(v>0))return;const pct=b?Math.round(amt/b*10000)/100:0;
 if(d.i!=null){C().items[d.i].disc=pct;C().items[d.i].discName=UI.f.ddesc||''}else{C().orderDisc=pct;C().orderDiscName=UI.f.ddesc||''}
 save();emit('discount',{pct,target:d.i!=null?'item':'order'});closeModal();toast(`Rabatt ${kr(amt)} tillagd`)};
A.ddel=()=>{const d=mtop().d;if(d.i!=null)C().items[d.i].disc=0;else C().orderDisc=0;save();emit('discount',{pct:0});closeModal()};
/* payment popup: no amount under the name (only in return mode), Yabie gift card name; item page without description */
{const g=S.payments.find(p=>p.id==='gift');if(g&&g.name==='Presentkort'){g.name='Yabie gift card';save()}}
{const _rp9=rightPanel;rightPanel=function(){let h=_rp9();if(UI.pop==='pay'&&!C().ret)h=h.replace(/(<button class="ft pm[^"]*"[^>]*>[^]*?)<small>[^<]*<\/small>/g,'$1');return h}}
{const _it=PAGES.item;PAGES.item=d=>{const r=_it(d);r.body=r.body.replace(/<h3 style="margin:22px 0 4px;font-size:16px">Description<\/h3><div>[^<]*<\/div>/,'');return r}}
{const st=document.createElement('style');st.textContent=`#pos .ft.pm{font-size:12.5px;line-height:1.15}#pos .ft.pm svg{width:28px;height:28px}`;document.head.appendChild(st)}
{if(!S.discounts.some(d=>d.kr)){S.discounts.push({id:'d4',name:'Fikakort',kr:10});save()}}

/* ── v5: product detail with modifiers, allergens, discount-button form, modifier-set form, promotion form, Upload Menu ── */
{const st=document.createElement('style');st.textContent=`
#pos .mpills{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 16px}
#pos .mpills button{height:26px;padding:0 10px;border-radius:5px;background:#e8f0fe;color:var(--blue)!important;font-size:12.5px;font-weight:500}
#pos .mpills button.on{background:var(--blue);color:#fff!important}
#pos .mlbl{font-size:12.5px;font-weight:600;margin-top:14px}#pos .mlbl span{font-weight:400}
#pos .qbox{display:flex;align-items:center;height:36px;border-radius:7px;background:#efeff4;padding:0 10px;font-size:13px;flex:1;margin:0 10px 0 0}
#pos .qbox .rt{margin-left:auto;display:flex;align-items:center;gap:10px}
#pos .qbox .qb{display:flex;background:#e3e3e8;border-radius:13px;overflow:hidden}#pos .qbox .qb button{width:34px;height:24px;display:grid;place-items:center;color:#1c1c1e!important}#pos .qbox .qb button+button{border-left:1px solid #c7c7cc}
#pos .qbox svg{width:12px;height:12px}
#pos .algrow{display:flex;align-items:center;min-height:30px;padding:0 12px;border-bottom:1px solid #ececf0;font-size:12.5px;cursor:pointer}
#pos .algrow:last-child{border-bottom:0}#pos .algrow .rad{margin-right:8px}
#pos .algic{margin-left:auto;width:18px;height:18px;border-radius:50%;display:grid;place-items:center;font-size:10px}
#pos .rfl{display:flex;align-items:center;min-height:34px;padding:0 12px;border-bottom:1px solid #ececf0;font-size:12.5px;background:#fff}
#pos .rfl:last-child{border-bottom:0}#pos .rfl input{flex:1;text-align:right;border:0;outline:0;background:none;font:inherit;color:#1c1c1e}
#pos .rfl input::placeholder{color:#b0b0b6}#pos .rfl .rv{margin-left:auto;color:#8e8e93;display:flex;align-items:center;gap:6px}
#pos .card{background:#fff;border-radius:10px;overflow:hidden;margin-bottom:6px}
#pos .upl{width:74px;height:74px;border:1px dashed #b9c6dc;border-radius:4px;display:grid;place-items:center;color:var(--blue)!important;font-size:22px;background:none}
#pos .mtbl{width:100%;border-collapse:collapse;font-size:12.5px}#pos .mtbl th{text-align:left;font-weight:600;padding:8px 10px;background:#fff}#pos .mtbl td{padding:7px 10px;border-top:1px solid #ececf0;background:#fff}`;document.head.appendChild(st)}
const qbox=(val,act)=>`<div class="qbox">Quantity<span class="rt"><b style="font-weight:500">${val}</b><span class="qb"><button data-a="${act}" data-x="-1">${IC.minus}</button><button data-a="${act}" data-x="1" data-g="qty-plus">${IC.plus}</button></span></span></div>`;
/* product detail with modifiers (real: product view with pill buttons and Add to Basket) */
PAGES.mods=d=>{const p=P(d.pid),ms=modsFor(d.pid),sel=UI.f.mods||{};const extra=ms.reduce((a,m)=>a+m.opts.reduce((b,o,i)=>b+(sel[m.id+':'+i]?o.price:0),0),0);
 const ta=UI.f.mta??C().takeaway,q=UI.f.mqty||1;
 return {white:true,title:esc(p.name),left:`<button class="txt" style="left:9px;display:flex;align-items:center;gap:4px" data-a="nop">${IC.pen.replace('<svg','<svg style="width:13px;height:13px"')} Edit</button>`,bodyCss:'padding:20px 30px 90px',
  body:`<div style="display:flex;gap:20px"><div style="flex:1"><div style="font-size:21px">${esc(p.name)}</div>
   <div style="margin:12px 0"><span class="radio ${!ta?'on':''}" data-a="mta" data-x="0"><i></i>Eat-in</span><span class="radio ${ta?'on':''}" data-a="mta" data-x="1"><i></i>Take-away</span></div>
   <div style="font-size:19px;font-weight:700">${kr(p.price+extra)}</div></div><div style="width:116px;height:88px;border-radius:4px;background:linear-gradient(135deg,#e8ebf2,#c9d0de)"></div></div>
   <div class="fld" style="border:1px solid #e1e1e6;margin:18px 0 12px;height:30px"><input data-in="mnote" placeholder="Note" value="${esc(UI.f.mnote||'')}"></div>
   <div class="grp" style="background:#efeff4">${row('Allergy request',{a:'nop',val:'None',html:`<span style="color:var(--red)">▲</span> Allergy request`})}</div>
   ${ms.map(m=>{const chosen=m.opts.filter((o,i)=>sel[m.id+':'+i]).map(o=>o.name);return `<hr style="border:0;border-top:1px solid #d1d1d6;margin:16px 0 0"><div class="mlbl">${esc(m.name)}: <span>${esc(chosen.join(', '))}</span></div><div class="mpills">${m.opts.map((o,i)=>`<button class="${sel[m.id+':'+i]?'on':''}" data-a="modpick" data-x="${m.id}:${i}" data-g="mod-${slug(o.name)}">${esc(o.name)}${o.price?' +'+o.price+' kr':''}</button>`).join('')}</div>`}).join('')}<hr style="border:0;border-top:1px solid #d1d1d6;margin:0">`,
  foot:`<div style="display:flex;width:100%;padding:0 16px">${qbox(q,'mqty')}<button class="btnb" style="min-width:94px" data-a="modadd" data-g="mod-add">Add to Basket</button></div>`}};
A.mta=v=>{UI.f.mta=v==='1';render()};A.mqty=x=>{UI.f.mqty=Math.max(1,(UI.f.mqty||1)+ +x);render()};
A.modadd=function(){const d=mtop().d,p=P(d.pid);let price=p.price;const names=[];modsFor(d.pid).forEach(m=>m.opts.forEach((o,i)=>{if(UI.f.mods[m.id+':'+i]){price+=o.price;names.push(o.name)}}));
 const note=UI.f.mnote||'',ta=UI.f.mta,q=UI.f.mqty||1;UI.modal=null;UI.num=String(q);addProduct(d.pid,{price,mods:names});const it=C().items[C().items.length-1];if(it){if(note)it.note=note;if(ta!=null&&ta!==C().takeaway)it.ta=ta;save();render()}};
/* allergens / special diets */
const DIETS=[['Vegetarian','#c9f29b','V'],['Vegan','#c9f29b','V'],['Halal','#9be3b0','H'],['Kosher','#b7d4ff','K'],['Dairy-free','#f3c4f5','D'],['Gluten-free','#fbd38d','G'],['Nut-free','#fbd38d','N'],['Soy-free','#d9f99d','S'],['Lactose free','#c7d2fe','L']];
const ALLERG=[['Gluten','#fde68a','G'],['Crustaceans','#fecaca','C'],['Eggs','#e9d5ff','E'],['Fish','#bfdbfe','F'],['Peanuts','#fed7aa','P'],['Soy','#d9f99d','S'],['Milk','#e0f2fe','M'],['Nuts','#fde68a','N'],['Celery','#bbf7d0','C'],['Mustard','#fef08a','M'],['Sesame','#fde68a','S'],['Sulphites','#e5e7eb','S'],['Lupin','#ddd6fe','L'],['Molluscs','#fbcfe8','M']];
PAGES.allergy=d=>{const s=UI.f.al||{};const any=Object.values(s).some(Boolean)||(UI.f.altxt||'').trim();const li=(arr,k)=>arr.map(([n,c,l])=>`<div class="algrow" data-a="altog" data-x="${k}:${n}" data-g="al-${slug(n)}">${rad(s[k+':'+n])}${n}<span class="algic" style="background:${c}">${l}</span></div>`).join('');
 return {white:true,title:'Choose allergens/special diets',bodyCss:'padding:16px 30px 90px',body:`<div class="fld" style="border:1px solid #e1e1e6;height:30px;margin-bottom:14px"><input data-in="altxt" placeholder="Type allergens information here..." value="${esc(UI.f.altxt||'')}"></div>
  <div class="sec">Select special diets</div><div class="card" style="border:1px solid #ececf0">${li(DIETS,'d')}</div><div class="sec" style="margin-top:14px">Select allergens to be avoided in the dish</div><div class="card" style="border:1px solid #ececf0">${li(ALLERG,'a')}</div>`,
  foot:`<button class="btnb" style="min-width:186px;background:#e9e9ee;color:#1c1c1e!important;font-weight:500" data-a="mback">Cancel</button><button class="btnb ${any?'':'dis'}" style="min-width:186px" data-a="alsave" data-g="al-save">Save</button>`}};
A.altog=x=>{UI.f.al=UI.f.al||{};UI.f.al[x]=!UI.f.al[x];render();emit('altog',x)};
A.alsave=()=>{const d=mtop().d,s=UI.f.al||{};const list=Object.keys(s).filter(k=>s[k]).map(k=>k.slice(2));if((UI.f.altxt||'').trim())list.push(UI.f.altxt.trim());
 if(d.i!=null){C().items[d.i].allergy=list}else C().allergy=list;save();emit('allergy',list);if(d.i!=null)pop();else closeModal();toast('Allergiförfrågan sparad')};
const _goAl=A.go;A.go=function(x,el){if(x==='allergy'){UI.f.al={};UI.f.altxt=''}return _goAl(x,el)};
A['m-allergy']=()=>{UI.more=false;if(!C().items.length)return toast('Lägg något i varukorgen först.');UI.f.al={};UI.f.altxt='';openModal('allergy',{});render()};
{const _it5=PAGES.item;PAGES.item=d=>{const r=_it5(d);const it=C().items[d.i];const v=it&&it.allergy&&it.allergy.length?esc(it.allergy.join(', ')):'None';
 r.body=r.body.replace(/<button class="row "[^>]*data-a="nop"[^>]*data-g="row-allergy-request">/,`<button class="row " data-a="allergyopen" data-g="row-allergy-request">`).replace('<span class="val">None</span>',`<span class="val">${v}</span>`);return r}}
A.allergyopen=()=>{const d=mtop().d;UI.f.al={};(C().items[d.i].allergy||[]).forEach(n=>{if(DIETS.some(x=>x[0]===n))UI.f.al['d:'+n]=true;else if(ALLERG.some(x=>x[0]===n))UI.f.al['a:'+n]=true});UI.f.altxt='';push('allergy',{i:d.i})};
{const _is=itemSub;itemSub=it=>_is(it)+(it.allergy&&it.allergy.length?`<span class="dl" style="color:var(--red)">▲ ${esc(it.allergy.join(', '))}</span>`:'')}
/* discount button form (real: "Discount button" with name, Percentage/Amount and keypad) */
PAGES.discnew=d=>{const mode=UI.f.dbm||'pct',v=UI.f.dbv||'',ok=(UI.f.dname||'').trim()&&parseFloat(v)>0;return {white:true,title:'Discount button',bodyCss:'padding:20px 30px 90px',
 body:`<div class="fld" style="border:1px solid #d1d1d6;height:34px;margin:0"><input data-in="dname" data-g="in-dname" maxlength="22" placeholder="Name" value="${esc(UI.f.dname||'')}"></div><div style="font-size:11.5px;color:#8e8e93;margin:5px 0 16px">Approximately 10 characters</div>
 <div class="seg" style="margin:0 0 10px"><button class="${mode==='pct'?'on':''}" data-a="dbm" data-x="pct">Percentage</button><button class="${mode==='amt'?'on':''}" data-a="dbm" data-x="amt">Amount</button></div>
 <div class="dval">${v?esc(v):'<i>0</i>'}<b></b> ${mode==='pct'?'%':'kr'}</div>${pad('dbkey')}
 ${d.id?`<div style="text-align:center;margin-top:10px"><button class="txt" style="position:static;color:var(--red)" data-a="discdel2" data-x="${d.id}">Delete discount button</button></div>`:''}`,
 foot:`<button class="btnb ${ok?'':'dis'}" style="min-width:186px" data-a="dbsave" data-x="${d.id||''}" data-g="disc-save">${IC.save} Save discount</button>`}};
PAGES.discedit=d=>PAGES.discnew(d);
A.dbm=x=>{UI.f.dbm=x;render()};A.dbkey=k=>{let v=UI.f.dbv||'';if(k==='⌫')v=v.slice(0,-1);else if(v.length<5)v=(v==='0'?'':v)+k;UI.f.dbv=v;render()};
A.discedit=id=>{const x=S.discounts.find(z=>z.id===id);UI.f.dname=x.name;UI.f.dbm=x.kr?'amt':'pct';UI.f.dbv=String(x.kr||x.pct);push('discedit',{id})};
const _goDb=A.go;A.go=function(x,el){if(x==='discnew'){UI.f.dname='';UI.f.dbm='pct';UI.f.dbv=''}return _goDb(x,el)};
A.dbsave=id=>{const n=(UI.f.dname||'').trim(),v=parseFloat(UI.f.dbv);if(!n||!(v>0))return;if(UI.f.dbm==='pct'&&v>100)return toast('Max 100 %');
 const o={name:n,...(UI.f.dbm==='amt'?{kr:v}:{pct:v})};if(id){const x=S.discounts.find(z=>z.id===id);delete x.kr;delete x.pct;Object.assign(x,o)}else{if(S.discounts.length>=8)return toast('Max 8 discount buttons.');S.discounts.push({id:'d'+Date.now(),...o})}save();pop()};
document.getElementById('pos').addEventListener('input',e=>{if(e.target.dataset.in==='dname'&&UI.modal&&['discnew','discedit'].includes(mtop().p)){const b=document.querySelector('#pos .mf .btnb');if(b)b.classList.toggle('dis',!(e.target.value.trim()&&parseFloat(UI.f.dbv)>0))}});
/* modifier set form (real: "Edit modifier set") */
PAGES.modform=d=>{const f=UI.f.mf;const max=f.multi?(f.max||0):1;return {white:false,title:d.id?'Edit modifier set':'Create modifier set',bodyCss:'padding:20px 30px 90px',
 body:`<div class="card"><div class="rfl">Name:<input data-in="mname" data-g="in-mname" placeholder="Name" value="${esc(UI.f.mname||'')}"></div>
  <div class="rfl">Requires selection<span class="rv"><span class="tog ${f.req?'on':''}" data-a="mfreq"></span></span></div>
  <div class="rfl">Always open detail view before adding to basket<span class="rv"><span class="tog ${f.always!==false?'on':''}" data-a="mfalways"></span></span></div>
  <div class="rfl">Max number of selections: ${max?max:'Unset'}<span class="rv"><span class="qb" style="display:flex;background:#e3e3e8;border-radius:13px;overflow:hidden"><button style="width:30px;height:22px;display:grid;place-items:center" data-a="mfmax" data-x="-1">${IC.minus.replace('<svg','<svg style="width:11px;height:11px"')}</button><button style="width:30px;height:22px;display:grid;place-items:center;border-left:1px solid #c7c7cc" data-a="mfmax" data-x="1">${IC.plus.replace('<svg','<svg style="width:11px;height:11px"')}</button></span></span></div></div>
  <div style="display:flex;align-items:center;margin:20px 0 6px"><div class="sec" style="margin:0">Modifiers</div><span style="margin-left:auto;display:flex;gap:6px;align-items:center"><input data-in="oname" placeholder="Modifier" style="height:24px;border:1px solid #d1d1d6;border-radius:5px;padding:0 6px;width:110px;font-size:12px" value="${esc(UI.f.oname||'')}"><input data-in="oprice" placeholder="Price" inputmode="numeric" style="height:24px;border:1px solid #d1d1d6;border-radius:5px;padding:0 6px;width:56px;font-size:12px" value="${esc(UI.f.oprice||'')}"><button style="height:24px;padding:0 8px;border:1px solid var(--blue);border-radius:5px;color:var(--blue)!important;font-size:12px;background:#fff" data-a="modoptadd" data-g="mod-optadd">⊕ Add modifier</button></span></div>
  <div class="card"><table class="mtbl"><tr><th style="width:24px"></th><th>Modifier</th><th style="width:80px">Price</th><th style="width:90px">Pre-selected</th></tr>${f.opts.map((o,i)=>`<tr><td><span class="mini" data-a="modoptdel" data-x="${i}"></span></td><td>${esc(o.name)}</td><td>${o.price?kr(o.price):'0 kr'}</td><td>${rad(i===0&&f.req)}</td></tr>`).join('')}</table></div>
  <div class="sec" style="margin-top:20px">Linked products</div><div class="card">${S.products.filter(p=>!p.gift).map(p=>`<div class="algrow" data-a="modprod" data-x="${p.id}">${rad(f.pids.includes(p.id))}${esc(p.name)}</div>`).join('')}</div>`,
 foot:`<button class="btnb" style="min-width:186px" data-a="modsave" data-g="mod-save">${IC.save} Save</button>`}};
A.mfreq=()=>{UI.f.mf.req=!UI.f.mf.req;render()};A.mfalways=()=>{UI.f.mf.always=UI.f.mf.always===false;render()};
A.mfmax=x=>{const f=UI.f.mf;let m=f.multi?(f.max||0):1;m=Math.max(0,m+ +x);f.multi=m!==1;f.max=m;render()};
/* promotion form (real: "Create new promotion") */
PAGES.promoform=d=>{const f=UI.f.pr;const ty=f.type;const opt=(lbl,k,ph,mode)=>`<div class="rfl">${lbl}<input data-in="${k}" placeholder="${ph}" ${mode?'inputmode="numeric"':''} value="${esc(UI.f[k]||'')}"></div>`;
 return {white:false,title:'Create new promotion',right:`<span style="position:absolute;right:46px;top:14px;display:flex;align-items:center;gap:6px;font-size:12px"></span>`,bodyCss:'padding:14px 30px 90px',
 body:`<div style="display:flex;justify-content:flex-end;align-items:center;gap:8px;font-size:12.5px;margin-bottom:6px">Promotion active<span class="tog ${f.active!==false?'on':''}" data-a="practive"></span></div>
 <div class="card">${opt('Name*','prname','Name')}${opt('Description','prdesc','Description')}</div><div style="font-size:10px;color:#8e8e93;margin:0 0 12px 2px">*Mandatory</div>
 <div class="card"><div class="rfl">Locations*<span class="rv">Kaffebaren ${IC.chev.replace('<svg','<svg style="width:11px;height:11px;color:var(--blue)"')}</span></div></div>
 <div class="sec" style="margin-top:14px">Loyalty members</div><div class="card"><div class="rfl">This promotion will only be available for your loyalty members<span class="rv"><span class="tog ${f.loyal?'on':''}" data-a="prloyal"></span></span></div></div>
 <div class="card" style="margin-top:14px"><div class="rfl" data-a="prnext" style="cursor:pointer" data-g="promo-type">Type of promotion*<span class="rv" style="color:var(--blue)">${esc(ty)} ⇕</span></div></div>
 ${ty==='Discount'?`<div style="display:flex;align-items:center;gap:12px;margin:10px 0;font-size:12.5px"><span data-a="prunit" data-x="pct" style="cursor:pointer">${rad(f.unit!=='kr')}%</span><span data-a="prunit" data-x="kr" style="cursor:pointer">${rad(f.unit==='kr')}kr</span><div class="card" style="flex:1;margin:0"><div class="rfl"><input data-in="prp" inputmode="numeric" placeholder="Enter discount amount" style="text-align:left" value="${esc(UI.f.prp||'')}"><span class="rv">${f.unit==='kr'?'kr':'%'}</span></div></div></div>`:''}
 ${ty==='Combo deal'?`<div class="card" style="margin-top:10px">${opt('Product A*','pra','Bryggkaffe')}${opt('Product B*','prb','Kanelbulle')}${opt('Combo price (kr)*','prp','55',1)}</div>`:''}
 ${ty==='X items for kr'?`<div class="card" style="margin-top:10px">${opt('Number of items*','prn','3',1)}${opt('Price (kr)*','prp','90',1)}</div>`:''}
 ${ty!=='Combo deal'?`<div class="card" style="margin-top:10px"><div class="rfl" data-a="prgnext" style="cursor:pointer">Items or groups included in this promotion*<span class="rv">${ty==='Discount'&&!f.gid?'All':esc(G(f.gid)?.name||'None')} ${IC.chev.replace('<svg','<svg style="width:11px;height:11px;color:var(--blue)"')}</span></div></div>`:''}`,
 foot:`<button class="btnb" style="min-width:186px" data-a="promosave" data-g="promo-save">Create promotion</button>`}};
{const T=['Discount','Combo deal','X items for kr'];
 Object.assign(A,{practive(){UI.f.pr.active=UI.f.pr.active===false;render()},prloyal(){UI.f.pr.loyal=!UI.f.pr.loyal;render()},prnext(){const f=UI.f.pr;f.type=T[(T.indexOf(f.type)+1)%T.length];if(f.type==='Discount')f.gid=null;else f.gid=f.gid||S.groups[0].id;render()},prunit(x){UI.f.pr.unit=x;render()},
  prgnext(){const f=UI.f.pr,ids=[null,...S.groups.map(g=>g.id)].filter(x=>f.type==='Discount'||x);f.gid=ids[(ids.indexOf(f.gid)+1)%ids.length];render()}});
 const _goP5=A.go;A.go=function(x,el){const r=_goP5(x,el);if(x==='promoform'){UI.f.pr={type:'Discount',gid:null,unit:'pct',active:true};UI.f.prdesc='';render()}return r};
 const _ps=A.promosave;A.promosave=function(){const f=UI.f.pr;if(f.type==='Discount'){const name=(UI.f.prname||'').trim(),p=+UI.f.prp;if(!name||!(p>0))return toast('Fyll i namn och värde');
   S.promotions.unshift({id:'pr'+Date.now(),name,type:f.unit==='kr'?'Discount kr':'Discount %',auto:mtop().d.id!=='manual',from:now().slice(0,10),rule:f.unit==='kr'?{kr:p,gid:f.gid}:{pct:p,gid:f.gid},active:f.active!==false});save();pop();return toast('Kampanjen är sparad')}
  return _ps()}}
/* Upload Menu (real Magic Menu) */
PAGES.magic=()=>{const has=UI.f.mmimg;return {white:false,title:'Upload Menu',bodyCss:'padding:24px 30px 90px',body:`<div style="display:flex;gap:12px;flex-wrap:wrap">${has?`<div style="width:74px;height:74px;border-radius:4px;background:#fff;border:1px solid #d1d1d6;padding:6px;font-size:7px;line-height:1.5;color:#444;overflow:hidden"><b style="font-size:8px">MENY</b><br>Smörgås ost 55<br>Fralla 25<br>Juice 39<br>Muffin 32</div>`:''}<button class="upl" data-a="mmadd" data-g="magic-add">+</button></div>
 ${has?'<p style="font-size:12px;color:#8e8e93;margin-top:14px">I demon används en exempelbild. Upload Menu läser av meny­bilden och skapar produkterna i gruppen Smörgåsar.</p>':''}`,
 foot:`<button class="btnb ${has?'':'dis'}" style="min-width:186px" data-a="mmup" data-g="magic-go">Upload Menu</button>`}};
A.mmadd=()=>{UI.f.mmimg=true;render()};
A.mmup=()=>{if(!UI.f.mmimg)return;const g=S.groups.find(x=>/smörg/i.test(x.name))||S.groups[0];[['Smörgås ost',55],['Fralla',25],['Juice',39],['Muffin',32]].forEach(([n,p],i)=>{if(!S.products.some(x=>x.name===n))S.products.push({id:'pm'+Date.now().toString(36)+i,name:n,price:p,gid:g.id})});save();UI.f.mmimg=false;pop();toast('4 produkter skapade från menyn')};
/* demo parked orders so the tables view is not empty */
if(!S.seedParked5){S.seedParked5=true;const mk=(pid,q)=>{const p=P(pid);return p?{pid,name:p.name,price:p.price,qty:q,disc:0,note:''}:null};const ids=S.products.map(p=>p.id);
 S.parked.push({...newCart(),takeaway:false,items:[mk(ids[1],2),mk(ids[10],2)].filter(Boolean),table:'t2',name:'Bord 2',parkedAt:'10/08, 09:42'},{...newCart(),takeaway:true,items:[mk(ids[0],1),mk(ids[12],1)].filter(Boolean),name:'Anna',parkedAt:'10/08, 10:15'});save()}
{const _pk5=A.parked;A.parked=function(){_pk5();if(UI.tables){UI.tables.tab='room';render()}}}
{const st=document.createElement('style');st.textContent='#pos .mtbl th{white-space:nowrap}';document.head.appendChild(st)}

/* ── Swedbank Cloud (PAX A920Pro) pairing ── */
{const _tl=PAGES.terminals;PAGES.terminals=d=>{const r=_tl(d);r.body=r.body.replace(/(<button class="row[^"]*"[^>]*data-g="prov-swedbank">[^]*?<\/button>)/,m=>m+row('Swedbank Cloud',{a:'go',x:'termprov',y:'Swedbank Cloud',ic:'term',nochev:1,g:'prov-swedbank-cloud'}));return r}}
{const _tp=PAGES.termprov;PAGES.termprov=d=>{if(d.id!=='Swedbank Cloud')return _tp(d);const code=(UI.f.paircode||'').replace(/\D/g,'');const paired=S.terminals.filter(t=>t.prov==='Swedbank Cloud');
 return {title:'Swedbank Cloud',body:`<div style="text-align:center;font-size:30px;font-weight:700;margin:22px 0 6px">Swedbank Cloud</div><p style="text-align:center;color:#8e8e93;font-size:12.5px;margin:0 0 18px">Öppna <b>Meny → Parningsläge</b> på terminalen och skriv in den sexsiffriga koden.</p>
  <div class="sec">Pairing code</div><div class="fld" style="padding-right:4px"><input data-in="paircode" data-g="in-paircode" inputmode="numeric" maxlength="6" placeholder="6-digit code" value="${esc(UI.f.paircode||'')}" style="letter-spacing:.2em;font-weight:600"><button class="btnb ${code.length===6?'':'dis'}" style="min-width:70px;height:30px" data-a="pairgo" data-g="pair-btn">Pair</button></div>
  ${paired.length?`<div class="sec" style="margin-top:18px">Paired terminals</div><div class="grp">${paired.map(t=>row(t.name||'PAX A920Pro',{a:'nop',ic:'term',val:'<span style="color:var(--green)">Paired</span>',nochev:1})).join('')}</div>`:''}`}}}
document.getElementById('pos').addEventListener('input',e=>{if(e.target.dataset.in==='paircode'){const b=document.querySelector('#pos [data-g="pair-btn"]');if(b)b.classList.toggle('dis',e.target.value.replace(/\D/g,'').length!==6)}});
A.pairgo=()=>{const code=(UI.f.paircode||'').replace(/\D/g,'');if(code.length!==6)return toast('Koden har sex siffror.');S.terminals.push({prov:'Swedbank Cloud',name:'PAX A920Pro',ip:'cloud'});UI.f.paircode='';save();emit('terminal:pair',code);toast('Terminalen är ihopkopplad');render()};
const _goPc=A.go;A.go=function(x,el){if(x==='termprov')UI.f.paircode='';return _goPc(x,el)};

/* ── tab bar: keep scroll position across renders, wheel + drag scrolling like swiping on the iPad ── */
{let tabX=0,gridY={};const _r6=render;render=function(){const t=document.getElementById('tabs');if(t)tabX=t.scrollLeft;const g=document.querySelector('#pos .grid');if(g)gridY[UI.tab]=g.scrollTop;_r6();const t2=document.getElementById('tabs');if(t2)t2.scrollLeft=tabX;const g2=document.querySelector('#pos .grid');if(g2&&gridY[UI.tab])g2.scrollTop=gridY[UI.tab]};
 const pos=document.getElementById('pos');
 pos.addEventListener('wheel',e=>{const t=e.target.closest('#tabs');if(!t)return;if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){t.scrollLeft+=e.deltaY;e.preventDefault()}},{passive:false});
 let drag=null;pos.addEventListener('pointerdown',e=>{const t=e.target.closest('#tabs');if(!t||e.pointerType==='touch')return;drag={t,x:e.clientX,s:t.scrollLeft,moved:false}});
 addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>5)drag.moved=true;if(drag.moved){const sc=drag.t.getBoundingClientRect().width/drag.t.offsetWidth||1;drag.t.scrollLeft=drag.s-dx/sc}});
 addEventListener('pointerup',()=>{if(drag&&drag.moved){const stop=ev=>{ev.stopPropagation();ev.preventDefault();removeEventListener('click',stop,true)};addEventListener('click',stop,true);setTimeout(()=>removeEventListener('click',stop,true),50)}drag=null});
 const _tab6=A.tab;A.tab=function(x){const r=_tab6(x);const t=document.getElementById('tabs'),b=t&&t.querySelector(`[data-x="${x}"]`);if(b){const bl=b.offsetLeft,br=bl+b.offsetWidth;if(bl<t.scrollLeft)t.scrollLeft=bl-8;else if(br>t.scrollLeft+t.clientWidth)t.scrollLeft=br-t.clientWidth+8}return r};
 const st=document.createElement('style');st.textContent='#pos .tabs{cursor:grab}#pos .tabs::-webkit-scrollbar{display:none}';document.head.appendChild(st)}
/* course settings like the real app: grey header bar, white group card, Add Group under the card */
{const st=document.createElement('style');st.textContent=`#pos .crs{background:none;border-radius:0;margin-bottom:14px;overflow:visible}
#pos .crs-h{background:#e3e3e8;border-radius:10px 10px 0 0;height:38px;font-size:13px;gap:10px}
#pos .crs-h>span:first-child{font-size:15px;margin-top:-4px}
#pos .crs-h [data-a="crsrename"]{display:inline-grid;place-items:center;width:28px;height:26px;background:#fff;border:1px solid #d1d1d6;border-radius:6px}
#pos .crs-h [data-a="crsrename"] svg{width:14px!important;height:14px!important}
#pos .crs-r{background:#fff;border-bottom:0;position:relative;height:39px;padding:0 14px}
#pos .crs-r+.crs-r::before{content:"";position:absolute;left:14px;right:14px;top:0;border-top:1px solid #e5e5ea}
#pos .crs-r:last-of-type{border-radius:0 0 10px 10px}
#pos .crs-h:has(+ .addg),#pos .crs-h:has(+ div+.addg:not(.crs-r)){border-radius:10px 10px 0 0}
#pos .crs-r span:last-child{display:inline-grid;place-items:center;width:16px;height:16px;border:1.3px solid #a1a1a6;border-radius:50%;font-size:9px;color:#8e8e93!important}
#pos .crs .addg{background:none;padding:6px 0 4px;text-align:right}
#pos .crs .addg button{font-size:12.5px;font-weight:500}
#pos .crs-empty{background:#fff;height:12px;border-radius:0 0 10px 10px}`;document.head.appendChild(st)}
{const _c6=PAGES.courses;PAGES.courses=d=>{const r=_c6(d);r.body=r.body.replace(/(<\/span><\/span><\/div>)\s*(<div class="addg">)/g,'$1<div class="crs-empty"></div>$2').replace(/⊕ Add Group/g,'<span style="display:inline-grid;place-items:center;width:14px;height:14px;border-radius:50%;background:var(--blue);color:#fff;font-size:11px;margin-right:4px;vertical-align:-2px">+</span>Add Group');return r}}
