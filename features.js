/* Everything else under My Store, made functional: news, time tracking, gift cards, tipping, customers,
   courses, functions, guests, journal/period reports, cash drawer, modifiers, Magic Menu, users & PIN,
   variable price / weight products, printers, catalog sync and logout. */

/* ── state migration: fill in anything older saved states lack ── */
function migrate(s){
  const d={
    news:[{id:'n1',t:'Uppdatera kontrollenheten',b:'Nya kontrollenheter (TCS) ersätter CCU. Byt i god tid så att kassan kan fortsätta sälja utan avbrott. Instruktioner finns på support.yabie.com.',read:false},
          {id:'n2',t:'Moms på take-away',b:'Livsmedel som säljs för avhämtning har tillfälligt sänkt moms. Kassan väljer momssats automatiskt när ordern markeras som Take-away.',read:false}],
    timelog:[],staffIn:{},
    giftcards:{'DEMO-1000':{balance:500,sold:'2026-10-01'}},
    tipping:{on:false,pcts:[5,10,15]},
    customers:[{id:'c1',name:'Anna Lind',phone:'070-123 45 67',email:'anna@example.com'},{id:'c2',name:'Erik Berg',phone:'073-555 12 34',email:''},{id:'c3',name:'Café Solsidan AB',phone:'08-12 34 56',email:'faktura@solsidan.example'}],
    courses:{on:false,list:['Förrätt','Varmrätt','Dessert']},
    guestsOn:false,
    fnList:['discount','splititems','openreturn','splitamount','ticketq','plu','printbill','takeaway','scan'].map(k=>({k,vis:true})),
    drawer:{float:null,moves:[]},
    modifiers:[{id:'m1',name:'Mjölk',multi:false,opts:[{name:'Vanlig mjölk',price:0},{name:'Havremjölk',price:5},{name:'Laktosfri',price:0}],pids:[]},
               {id:'m2',name:'Extra',multi:true,opts:[{name:'Extra shot',price:8},{name:'Vaniljsirap',price:6}],pids:[]}],
    catalog:{images:false,synced:null},
    a4:null,
  };
  for(const k in d)if(s[k]===undefined)s[k]=d[k];
  if(!s.cashiers[0].pin){s.cashiers=[{name:'Ägare',role:'Admin',pin:'1234'},{name:'Barista',role:'Kassör',pin:'0000'}]}
  if(!s.modifiers[0].pids.length){const ids=n=>s.products.filter(p=>n.includes(p.name)).map(p=>p.id);s.modifiers[0].pids=ids(['Cappuccino','Caffè latte','Flat white','Cortado','Chai latte','Iskaffe']);s.modifiers[1].pids=ids(['Cappuccino','Caffè latte','Flat white','Iskaffe'])}
  if(!s.products.find(p=>p.unit==='kg'||p.priceType==='variable')){
    const g=s.groups.find(x=>x.id==='g-merch')||s.groups[0];
    s.products.push({id:'p-lös',name:'Lösvikt kaffe',price:299,gid:g.id,unit:'kg',desc:'Pris per kilo.'},{id:'p-pres',name:'Öppen vara',price:0,gid:g.id,priceType:'variable',desc:'Ange pris vid försäljning.'});
  }
  return s;
}
migrate(S);save();
const _resetAll=resetAll;resetAll=function(){_resetAll();migrate(S);save();render()};

/* ── selling: modifiers, variable price, weight, sellable ── */
const modsFor=pid=>S.modifiers.filter(m=>m.pids.includes(pid));
const _addProduct=addProduct;
addProduct=function(pid,ex){
  const p=P(pid);if(!p)return;
  if(p.sellable===false){UI.num='';return toast('Produkten är markerad som ej säljbar.')}
  if(!ex){
    if(p.priceType==='variable'){UI.f={amt:''};return openModal('askprice',{pid})}
    if(p.unit==='kg'){UI.f={amt:''};return openModal('askweight',{pid})}
    if(modsFor(pid).length){UI.f={mods:{}};return openModal('mods',{pid})}
    return _addProduct(pid);
  }
  const q=parseInt(UI.num||'1',10)||1;UI.num='';
  C().items.push({pid,name:ex.name||p.name,price:ex.price,qty:ex.weight?1:q,disc:0,note:'',mods:ex.mods,course:ex.course});
  UI.sel=C().items.length-1;save();emit('add',{pid,name:p.name});render();
};
itemSub=it=>(it.mods&&it.mods.length?`<span class="dl">${esc(it.mods.join(', '))}</span>`:'')+(S.courses.on&&it.course?`<span class="dl">${esc(it.course)}</span>`:'');
PAGES.mods=d=>{const p=P(d.pid),ms=modsFor(d.pid),sel=UI.f.mods||{};const extra=ms.reduce((a,m)=>a+m.opts.reduce((b,o,i)=>b+(sel[m.id+':'+i]?o.price:0),0),0);
  return {white:true,title:esc(p.name),body:ms.map(m=>`<div class="sec">${esc(m.name)}${m.multi?' (välj flera)':''}</div><div class="grp plain" style="background:#f2f2f6">${m.opts.map((o,i)=>row(o.name,{a:'modpick',x:m.id+':'+i,g:'mod-'+slug(o.name),html:`<span class="radio ${sel[m.id+':'+i]?'on':''}"><i></i>${esc(o.name)}</span>`,val:o.price?'+'+kr(o.price):'',nochev:1})).join('')}</div>`).join(''),
   foot:`<button class="btnb" data-a="modadd" data-g="mod-add">Lägg till ${kr(p.price+extra)}</button>`}};
PAGES.askprice=d=>({title:esc(P(d.pid).name),body:`<div class="amt" style="margin-top:20px"><small>Ange pris</small>${UI.f.amt||'0'},00 kr</div>${pad('amtkey')}`,foot:`<button class="btnb ${UI.f.amt?'':'dis'}" data-a="askpriceok">Lägg till</button>`});
PAGES.askweight=d=>{const p=P(d.pid),g=+(UI.f.amt||0);return {title:esc(p.name),body:`<div class="amt" style="margin-top:20px"><small>Vikt i gram (${kr(p.price)}/kg)</small>${g} g = ${kr(p.price*g/1000)}</div>${pad('amtkey')}<p style="text-align:center;color:#8e8e93;font-size:12px">Med en kopplad våg fylls vikten i automatiskt.</p>`,foot:`<button class="btnb ${g?'':'dis'}" data-a="askweightok">Lägg till</button>`}};


/* ── payment extras: tip, gift cards, guests, cash drawer ── */
const _pay=pay;
pay=function(mid,skipTip){if(mid==='card'&&S.tipping.on&&!C().ret&&!skipTip){UI.pop=null;return openModal('tip')}_pay(mid)};
let pendingTip=0;
function onSale(order,c,mid,extra){
  const lines=[];
  if(!c.ret){order.guests=c.guests||0;order.tip=pendingTip;if(pendingTip){order.history[0].tip=pendingTip;lines.push(['Dricks:',kr(pendingTip)])}pendingTip=0;
    order.items.filter(i=>i.gift).forEach(i=>{const code=Math.random().toString(36).slice(2,6).toUpperCase()+'-'+String(Math.floor(1000+Math.random()*9000));S.giftcards[code]={balance:i.price,sold:now()};lines.push(['Presentkortskod:',code])});}
  if(mid==='gift'&&UI.giftCode){const g=S.giftcards[UI.giftCode];g.balance-=order.history[order.history.length-1].paid;lines.push(['Kvar på kortet:',kr(g.balance)]);UI.giftCode=null}
  if(mid==='cash')S.drawer.moves.push({at:now(),kind:c.ret?'Kontantretur':'Kontantförsäljning',amt:c.ret?cartTot(c):cartTot(c)});
  save();return {lines};
}
PAGES.tip=()=>{const t=cartTot();return {white:true,title:'Dricks',body:`<div class="amt" style="margin-top:30px"><small>Att betala</small>${kr(t)}</div><p style="text-align:center;color:#8e8e93">Kunden väljer dricks på terminalen. I demon väljer du här.</p>
  <div style="display:grid;gap:10px;justify-content:center;margin-top:24px">${S.tipping.pcts.map(p=>`<button class="btnb" data-a="tipgo" data-x="${Math.round(t*p)/100}">${p} %  (+${kr(Math.round(t*p)/100)})</button>`).join('')}<button class="btnb g" data-a="tipgo" data-x="0" data-g="tip-none">Ingen dricks</button></div>`}};
PAGES.giftpay=()=>{const code=(UI.f.code||'').trim().toUpperCase(),g=S.giftcards[code];const t=cartTot();
  return {title:'Presentkort',body:`<p style="color:#8e8e93">Skanna eller skriv in presentkortets kod. Prova demokoden <b>DEMO-1000</b> eller en kod du själv har sålt.</p>${fld('Kod','code',{ph:'XXXX-0000',live:1})}${code?(g?`<p>Saldo: <b>${kr(g.balance)}</b>${g.balance<t?' <span style="color:var(--red)">räcker inte</span>':''}</p>`:'<p style="color:var(--red)">Okänd kod</p>'):''}`,
   foot:`<button class="btnb ${g&&g.balance>=t?'':'dis'}" data-a="giftok" data-g="gift-ok">Betala ${kr(t)}</button>`}};

/* ── My Store menu (all rows active) ── */
PAGES.ms=()=>{const unread=S.news.filter(n=>!n.read).length;return {title:`My Store - ${esc(S.store)}`,bodyCss:'padding-top:30px',body:`
 <div class="grp"><div class="row" style="cursor:default"><b style="font-size:16px">${esc(S.register)}</b><span style="margin-left:14px">demo@kaffebaren.se</span></div></div>
 <div class="tiles4" style="margin-top:22px">
  <button class="bigt" data-a="go" data-x="z" data-g="ms-z">${IC.report}Z-Report</button><button class="bigt" data-a="go" data-x="analytics" data-g="ms-analytics">${IC.chart}Analytics</button>
  <button class="bigt" data-a="go" data-x="orders" data-g="ms-orders">${IC.receipt}Order History</button><button class="bigt" data-a="go" data-x="help" data-g="ms-help">${IC.help}Help</button></div>
 <div class="grp" style="margin-top:22px">${row('News',{a:'go',x:'news',g:'row-news',html:`<b>News:</b> ${esc(S.news.map(n=>n.t).join(', '))}`,val:unread?`<span class="badge" style="position:static;display:inline-grid">${unread}</span>`:''})}</div>
 <div class="sec">Store</div><div class="grp">${row('Order History (Returns & Receipt copy)',{a:'go',x:'orders',ic:'receipt',g:'row-orders'})}${row('Reports & Analytics',{a:'go',x:'reports',ic:'chart',g:'row-reports'})}${row('Product Catalog',{a:'go',x:'catalog',ic:'book',g:'row-catalog'})}${S.payments.find(p=>p.id==='cash').enabled?row('Cash Drawer',{a:'go',x:'drawer',ic:'drawer',g:'row-drawer'}):''}</div>
 <div class="sec">Administration</div><div class="grp">${row('Time Tracking',{a:'go',x:'timetrack',ic:'clock',g:'row-time'})}${row('Yabie gift cards',{a:'go',x:'giftcards',ic:'gift',g:'row-gift'})}${row('Tipping',{a:'go',x:'tipping',ic:'tip',g:'row-tipping'})}${row('Customers',{a:'go',x:'customers',ic:'users',g:'row-customers'})}${row('Courses',{a:'go',x:'courses',ic:'cloche',g:'row-courses'})}</div>
 <div class="sec">Settings</div><div class="grp">${row('Layouts/Start Pages',{a:'go',x:'spages',ic:'grid',g:'row-layouts'})}${row('Payment Methods',{a:'go',x:'paymethods',ic:'pay',g:'row-paymethods'})}${row('Functions',{a:'go',x:'functions',ic:'fn',g:'row-functions'})}${row('Discount Buttons',{a:'go',x:'discbtns',ic:'tag',g:'row-discbtns'})}${row('Guests',{a:'go',x:'guestsset',ic:'users',g:'row-guests'})}${row('Cashier Management',{a:'go',x:'cashiers',ic:'user',g:'row-cashiers'})}${row('Other Settings',{a:'go',x:'other',ic:'cog',g:'row-other'})}</div>
 <div class="sec">Hardware</div><div class="grp">${row('Payment Terminals',{a:'go',x:'terminals',ic:'term',g:'row-terminals'})}${row('Printers',{a:'go',x:'printers',ic:'printer',g:'row-printers'})}${row('Customer Display',{a:'go',x:'custdisp',ic:'display',g:'row-custdisp'})}</div>
 <div class="sec">Other</div><div class="grp">${row('Support',{a:'go',x:'help',ic:'help'})}${row('About',{a:'go',x:'about',ic:'info'})}</div>
 <div class="grp" style="margin-top:22px">${row('Logout from POS',{a:'logout',cls:'red',right:false,g:'row-logout'})}</div>`}};

PAGES.news=()=>({title:'News',body:S.news.map(n=>`<div class="grp" style="padding:16px 18px;margin-top:14px"><b style="font-size:15px">${esc(n.t)}</b>${n.read?'':' <span class="badge" style="position:static;display:inline-grid">Ny</span>'}<p style="margin:8px 0 0;color:#4a4a50">${esc(n.b)}</p></div>`).join('')});

/* time tracking */
PAGES.timetrack=()=>({title:'Time Tracking',body:`<p style="color:#6b6b70">Personalliggare: alla som arbetar checkar in och ut. Listan visas för Skatteverket vid kontrollbesök.</p>
 <div class="sec">Personal</div><div class="grp plain">${S.cashiers.map(c=>{const inn=S.staffIn[c.name];return row(c.name,{a:'tt',x:c.name,g:'tt-'+slug(c.name),html:`${esc(c.name)}<br><small style="color:#8e8e93">${inn?'Incheckad sedan '+inn.slice(12):'Utcheckad'}</small>`,val:`<span class="btnb ${inn?'g':''}" style="min-width:110px;height:30px">${inn?'Checka ut':'Checka in'}</span>`,nochev:1})}).join('')}</div>
 <div class="sec">Dagens personalliggare</div><div class="grp plain">${S.timelog.slice().reverse().map(l=>row(l.name,{val:`${l.in.slice(12)} – ${l.out?l.out.slice(12):'pågår'}`,nochev:1})).join('')||'<p style="padding:12px;margin:0;color:#8e8e93">Inga registreringar ännu.</p>'}</div>`});

/* gift cards */
PAGES.giftcards=()=>({title:'Yabie gift cards',body:`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px"><button class="bigt" data-a="go" data-x="giftsell" data-g="gift-sell">${IC.gift}Sälj presentkort</button><button class="bigt" data-a="go" data-x="giftbal" data-g="gift-bal">${IC.search}Kontrollera saldo</button></div>
 <div class="sec">Sålda presentkort</div><div class="grp plain">${Object.entries(S.giftcards).map(([k,v])=>row(k,{val:kr(v.balance),nochev:1})).join('')}</div>`});
PAGES.giftsell=()=>({title:'Sälj presentkort',body:`<div class="amt" style="margin-top:20px"><small>Belopp</small>${UI.f.amt||'0'},00 kr</div><div style="display:flex;gap:8px;justify-content:center">${[200,300,500,1000].map(v=>`<button class="btnb g" style="min-width:80px" data-a="giftamt" data-x="${v}">${v} kr</button>`).join('')}</div>${pad('amtkey')}`,foot:`<button class="btnb ${UI.f.amt?'':'dis'}" data-a="giftsellok" data-g="gift-sell-ok">Lägg i varukorgen</button>`});
PAGES.giftbal=()=>{const code=(UI.f.code||'').trim().toUpperCase(),g=S.giftcards[code];return {title:'Kontrollera saldo',body:`${fld('Kod','code',{ph:'t.ex. DEMO-1000',live:1})}${code?(g?`<div class="grp" style="padding:18px;text-align:center"><small style="color:#8e8e93">Saldo</small><div style="font-size:24px;font-weight:700">${kr(g.balance)}</div><small style="color:#8e8e93">Såld ${esc(g.sold)}</small></div>`:'<p style="color:var(--red)">Okänd kod</p>'):''}`}};

/* tipping */
PAGES.tipping=()=>({title:'Tipping',body:`<div class="grp" style="margin-top:16px">${row('Fråga efter dricks vid kortbetalning',{a:'tiptog',tog:S.tipping.on,g:'tip-toggle'})}</div>
 <div class="sec">Förval i procent</div><div class="grp plain">${S.tipping.pcts.map((p,i)=>row(p+' %',{a:'tippct',x:i,val:'<span style="color:var(--blue)">Ändra</span>',nochev:1})).join('')}</div>
 <div class="sec">Dricks idag</div><div class="grp plain">${row('Totalt',{val:kr(S.orders.filter(o=>o.at.startsWith(now().slice(0,10))).reduce((a,o)=>a+(o.tip||0),0)),nochev:1})}</div>
 <p style="color:#8e8e93;font-size:12.5px">Dricksen redovisas i Z-rapporten och kan föras över till lönesystemet.</p>`});

/* customers */
PAGES.customers=()=>{const q=(UI.f.q||'').toLowerCase();return {title:'Customers',body:`<div style="text-align:center;margin:6px 0 14px"><button class="btnb" data-a="go" data-x="custform" data-g="cust-new">${IC.plus} Ny kund</button></div><div class="srch">${IC.search}<input data-in="q" data-live="1" placeholder="Sök kund" value="${esc(UI.f.q||'')}"></div>
 <div class="grp plain list" style="margin-top:14px">${S.customers.filter(c=>!q||(c.name+c.phone+c.email).toLowerCase().includes(q)).map(c=>row(c.name,{a:'go',x:'custdetail',y:c.id,g:'cust-'+slug(c.name),html:`${esc(c.name)}<br><small style="color:#8e8e93">${esc(c.phone)} ${esc(c.email)}</small>`})).join('')}</div>`}};
PAGES.custform=()=>({title:'Ny kund',body:`${fld('Namn*','cname',{ph:'För- och efternamn eller företag'})}${fld('Telefon','cphone',{ph:'070-000 00 00'})}${fld('E-post','cemail',{ph:'namn@exempel.se'})}`,foot:`<button class="btnb" data-a="custsave" data-g="cust-save">Save</button>`});
PAGES.custdetail=d=>{const c=S.customers.find(x=>x.id===d.id);const os=S.orders.filter(o=>o.customer===c.name);
  return {title:esc(c.name),body:`<div class="grp" style="padding:16px 18px;margin-top:10px"><b style="font-size:16px">${esc(c.name)}</b><p style="margin:6px 0 0;color:#6b6b70">${esc(c.phone)}<br>${esc(c.email)}</p></div>
  <div class="sec">Köphistorik</div><div class="grp plain">${os.map(o=>row(o.id,{a:'go',x:'order',y:o.id,val:kr(o.total)})).join('')||'<p style="padding:12px;margin:0;color:#8e8e93">Inga köp ännu.</p>'}</div>`,
  foot:`<button class="btnb" data-a="custtoorder" data-x="${c.id}" data-g="cust-add">Lägg till kunden på ordern</button>`}};

/* courses */
PAGES.courses=()=>({title:'Courses',body:`<div class="grp" style="margin-top:16px">${row('Använd rätter',{a:'coursetog',tog:S.courses.on,g:'course-toggle'})}</div><p style="color:#8e8e93;font-size:12.5px">Med rätter väljer du förrätt, varmrätt eller dessert per artikel i varukorgen, och visar dem grupperat via <b>More → Show Courses</b>.</p>
 <div class="sec">Rätter</div><div class="grp plain">${S.courses.list.map((c,i)=>row(c,{a:'coursedel',x:i,val:'<span style="color:var(--red)">Ta bort</span>',nochev:1})).join('')}</div>
 <div class="fld" style="margin-top:14px;padding-right:4px"><input data-in="cname2" placeholder="Ny rätt, t.ex. Mellanrätt" value="${esc(UI.f.cname2||'')}"><button class="btnb" style="min-width:69px;height:31px" data-a="courseadd">Add</button></div>`});

/* functions */
PAGES.functions=()=>({title:'Functions',body:`<p style="color:#6b6b70">Välj vilka funktioner som visas under <b>FUNCTIONS</b> och i vilken ordning.</p><div class="grp plain">${S.fnList.map((f,i)=>row(FN[f.k].name,{a:'fnvis',x:i,g:'fnvis-'+f.k,html:`<span style="display:inline-flex;gap:6px;margin-right:10px"><span data-a="fnup" data-x="${i}" style="color:var(--blue)">▲</span><span data-a="fndown" data-x="${i}" style="color:var(--blue)">▼</span></span>${esc(FN[f.k].name)}`,tog:f.vis})).join('')}</div>`});

/* guests */
PAGES.guestsset=()=>({title:'Guests',body:`<div class="grp" style="margin-top:16px">${row('Registrera antal gäster',{a:'gueststog',tog:S.guestsOn,g:'guests-toggle'})}</div><p style="color:#8e8e93;font-size:12.5px">Lägg till gäster via <b>More → Add guests</b>. Antalet syns på ordern och ger snittnota per gäst i Z-rapporten.</p>`});
PAGES.guests=()=>({title:'Add guests',body:`<div class="amt" style="margin-top:20px"><small>Antal gäster</small>${UI.f.amt||'0'}</div>${pad('amtkey')}`,foot:`<button class="btnb" data-a="guestsok" data-g="guests-ok">Save</button>`});

/* reports */
const dateIn=(k,v)=>`<input type="date" data-in="${k}" value="${esc(UI.f[k]||v)}" style="border:0;background:#e3e3e8;border-radius:6px;padding:5px 8px;font:inherit">`;
const inRange=(o,f,t)=>{const d=o.at.slice(0,10);return d>=f&&d<=t};
PAGES.journal=()=>({title:'Journal',body:`<p style="color:#6b6b70">Journalen är en detaljerad lista över all försäljning. Den används vid Skatteverkets kontrollbesök.</p>
 <div class="grp plain">${row('Från',{html:'Från',val:dateIn('jf',now().slice(0,8)+'01'),nochev:1})}${row('Till',{html:'Till',val:dateIn('jt',now().slice(0,10)),nochev:1})}</div><div class="sec">Skicka till</div>${fld('E-post','jmail',{ph:'namn@exempel.se'})}`,
 foot:`<button class="btnb g" style="min-width:290px" data-a="journalshow" data-g="journal-show">Visa</button><button class="btnb" style="min-width:290px" data-a="journalsend">Skicka</button>`});
PAGES.period=()=>({title:'Period report',body:`<div class="grp plain" style="margin-top:16px">${row('Från',{html:'Från',val:dateIn('pf',now().slice(0,8)+'01'),nochev:1})}${row('Till',{html:'Till',val:dateIn('pt',now().slice(0,10)),nochev:1})}</div>`,foot:`<button class="btnb" data-a="periodgo" data-g="period-go">Create Report</button>`});
PAGES.zall=()=>({title:'Z-rapporter',body:`<div class="grp plain" style="margin-top:12px">${S.zreports.slice().reverse().map((z,i)=>row(z.at,{a:'zview',x:S.zreports.length-1-i,val:kr(z.total)})).join('')}</div>`});
const _reports=PAGES.reports;PAGES.reports=()=>({title:'Reports & Analytics',body:`<div class="sec">Rapporter</div><div class="grp">${row('Z-Report',{a:'go',x:'z',ic:'report',g:'rep-z'})}${row('X-Report',{a:'go',x:'xrep',ic:'report',g:'rep-x'})}${row('Journal',{a:'go',x:'journal',ic:'book',g:'rep-journal'})}${row('Period report',{a:'go',x:'period',ic:'clock',g:'rep-period'})}${row('Statistics',{a:'go',x:'analytics',ic:'chart'})}</div>`});
const _z=PAGES.z;PAGES.z=()=>{const r=_z();r.body=r.body.replace(/data-a="nop"\s+data-g="row-see-more-reports"/,'data-a="go" data-x="zall" data-g="row-see-more-reports"');return r};
const _zFrom=zFrom;zFrom=function(orders,at){const z=_zFrom(orders,at);z.tips=orders.reduce((a,o)=>a+(o.tip||0),0);z.guests=orders.reduce((a,o)=>a+(o.guests||0),0);z.cash=S.drawer.moves.reduce((a,m)=>a+m.amt,0)+(S.drawer.float||0);return z};
const _rt=receiptText;receiptText=function(d){let t=_rt(d);if((d.kind==='z'||d.kind==='x')&&d.z){const z=d.z,L=(a,b)=>a+' '.repeat(Math.max(1,40-a.length-String(b).length))+b;t+=`${L('Dricks',n2(z.tips||0))}\n${L('Gäster',z.guests||0)}${z.guests?'\n'+L('Snitt per gäst',n2(z.total/z.guests)):''}\n${L('Kontanter i lådan',n2(z.cash||0))}\n`}
  if(d.kind==='journal'||d.kind==='period'){const os=S.orders.filter(o=>inRange(o,d.from,d.to)),L=(a,b)=>a+' '.repeat(Math.max(1,40-a.length-String(b).length))+b;
    const head=`${S.store.toUpperCase()}\n${d.kind==='journal'?'JOURNAL':'PERIODRAPPORT'} ${d.from} – ${d.to}\n${'-'.repeat(40)}\n`;
    if(d.kind==='journal')return head+(os.slice().reverse().map(o=>o.history.map(h=>`${h.at}  ${o.id}\n`+h.items.map(i=>L(`  ${i.qty} x ${i.name}`,n2(lineTot(i)))).join('\n')+`\n${L('  '+h.method,n2(h.paid))}`).join('\n')).join('\n')||'Inga transaktioner.')+'\n';
    const z=zFrom(os,now());return head+`${L('Antal köp',z.count)}\n${L('Returer',z.returns)}\n${L('Försäljning',n2(z.total))}\n${L('Moms 12 %',n2(z.vat12||0))}\n${L('Moms 6 %',n2(z.vat6||0))}\n${L('Moms 25 %',n2(z.vat25||0))}\n${L('Dricks',n2(z.tips))}\n`}
  return t};

/* cash drawer */
const drawerSum=()=>(S.drawer.float||0)+S.drawer.moves.reduce((a,m)=>a+m.amt,0);
PAGES.drawer=()=>{const open=S.drawer.float!=null;const dis=(t,o)=>open?row(t,o):`<div class="row" style="color:#b0b0b5;pointer-events:none" ${o.g?`data-g="${o.g}"`:''}>${t}</div>`;return {title:'Cash Drawer',body:`<div style="padding:18px;text-align:center;margin-top:6px"><small style="color:#8e8e93">Current Balance</small><div style="font-size:26px;font-weight:700">${kr(open?drawerSum():0)}</div></div>
 <div class="grp" style="margin-top:4px">${open?`<div class="row" style="color:#b0b0b5;pointer-events:none" data-g="drawer-float">Open Balance</div>`:row('Open Balance',{a:'go',x:'drawermove',y:'float',g:'drawer-float'})}</div>
 <div class="grp" style="margin-top:14px">${dis('Add Cash',{a:'go',x:'drawermove',y:'in',g:'drawer-add'})}${dis('Remove Cash',{a:'go',x:'drawermove',y:'out',g:'drawer-remove'})}</div>
 <div class="grp" style="margin-top:14px">${row('<span style="color:var(--blue,#1677ff)">Open Drawer</span>',{a:'draweropen',nochev:1,g:'drawer-kick'})}</div>
 <div class="grp" style="margin-top:14px">${dis('Close Balance',{a:'go',x:'drawermove',y:'close',g:'drawer-close'})}</div>
 <div class="sec">Händelser</div><div class="grp plain">${S.drawer.moves.slice().reverse().map(m=>row(m.kind,{html:`${esc(m.kind)}<br><small style="color:#8e8e93">${m.at}${m.note?' · '+esc(m.note):''}</small>`,val:kr(m.amt),nochev:1})).join('')||'<p style="padding:12px;margin:0;color:#8e8e93">Inga händelser ännu.</p>'}</div>`}};
PAGES.drawermove=d=>({title:{float:'Open Balance',in:'Add Cash',out:'Remove Cash',close:'Close Balance'}[d.id],body:`<div class="amt" style="margin-top:20px"><small>Cash</small>${UI.f.amt||'0'} SEK</div>${d.id==='in'||d.id==='out'?fld('Note','dnote',{ph:'t.ex. Växel från banken'}):''}${pad('amtkey')}${d.id==='close'?`<p style="text-align:center;color:#8e8e93;font-size:12px">Räkna kontanterna i lådan. Förväntat: ${kr(drawerSum())}</p>`:''}`,foot:`${d.id==='float'?'<p style="text-align:center;margin:0 0 8px;font-size:12.5px">You need to open your cash balance to start selling</p>':''}<button class="btnb ${UI.f.amt||d.id==='float'||d.id==='close'?'':'dis'}" data-a="drawerok" data-g="drawer-ok">${{float:'Open cash balance',in:'Update cash balance',out:'Update cash balance',close:'Close Balance'}[d.id]}</button>`});
PAGES.openbal=()=>({title:'Open Balance',body:`<div class="amt" style="margin-top:20px"><small>Cash</small>${UI.f.amt||'0'} SEK</div>${pad('amtkey')}`,foot:`<p style="text-align:center;margin:0 0 8px;font-size:12.5px">You need to open your cash balance to start selling</p><button class="btnb" data-a="openbalok" data-g="openbal-ok">Open cash balance</button>`});

/* cashiers & users */
PAGES.cashiers=()=>({title:'Cashier Management',body:`<div style="text-align:center;margin:6px 0 4px"><button class="btnb" data-a="go" data-x="userform" data-g="user-new">${IC.plus} Ny användare</button></div><div class="sec">Användare</div><div class="grp">${S.cashiers.map((c,i)=>row(c.name,{ic:'user',a:'userdel',x:i,html:`${esc(c.name)}<br><small style="color:#8e8e93">${esc(c.role)} · PIN ${'•'.repeat(4)}</small>`,val:'<span style="color:var(--red)">Ta bort</span>',nochev:1})).join('')}</div><p style="color:#8e8e93;font-size:12.5px">Demo: Ägare har PIN 1234 och Barista 0000. Bara Admin får göra returer.</p>`});
PAGES.userform=()=>({title:'Ny användare',body:`${fld('Namn*','uname',{ph:'Namn'})}<div class="fld">Roll<span class="rt">${['Admin','Kassör'].map(r=>`<button class="btnb ${UI.f.urole===r?'':'g'}" style="min-width:80px;height:28px" data-a="urole" data-x="${r}">${r}</button>`).join('')}</span></div>${fld('PIN (4 siffror)*','upin',{ph:'0000',mode:'numeric'})}`,foot:`<button class="btnb" data-a="usersave">Save</button>`});

/* modifiers */
PAGES.modifiers=()=>({title:'Manage modifiers',body:`<div style="text-align:center;margin:6px 0 4px"><button class="btnb" data-a="go" data-x="modform" data-g="mod-new">${IC.plus} Ny tillvalsgrupp</button></div><div class="sec">Tillvalsgrupper</div><div class="grp plain">${S.modifiers.map(m=>row(m.name,{a:'go',x:'modform',y:m.id,html:`${esc(m.name)}<br><small style="color:#8e8e93">${esc(m.opts.map(o=>o.name).join(', '))} · ${m.pids.length} produkter</small>`})).join('')}</div>`});
PAGES.modform=d=>{const f=UI.f.mf;return {title:d.id?'Redigera tillvalsgrupp':'Ny tillvalsgrupp',body:`${fld('Namn*','mname',{ph:'t.ex. Mjölk'})}<div class="grp plain">${row('Kunden kan välja flera',{a:'modmulti',tog:f.multi})}</div>
 <div class="sec">Tillval</div><div class="grp plain">${f.opts.map((o,i)=>row(o.name,{a:'modoptdel',x:i,val:`${o.price?'+'+kr(o.price):'0 kr'} <span style="color:var(--red);margin-left:8px">Ta bort</span>`,nochev:1})).join('')}</div>
 <div class="fld" style="margin-top:12px;padding-right:4px"><input data-in="oname" placeholder="Tillval" value="${esc(UI.f.oname||'')}"><input data-in="oprice" placeholder="Pris" inputmode="numeric" style="max-width:70px" value="${esc(UI.f.oprice||'')}"><button class="btnb" style="min-width:60px;height:31px" data-a="modoptadd">Add</button></div>
 <div class="sec">Visas för produkter</div><div class="grp plain">${S.products.map(p=>row(p.name,{a:'modprod',x:p.id,html:`<span class="radio ${f.pids.includes(p.id)?'on':''}"><i></i>${esc(p.name)}</span>`,nochev:1})).join('')}</div>`,foot:`<button class="btnb" data-a="modsave">Save</button>`}};

/* Magic Menu */
PAGES.magic=()=>{const lines=(UI.f.menu||'').split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{const m=l.match(/^(.+?)[\s.:–-]+(\d+)\s*(kr)?$/i);return m?{name:m[1].trim(),price:+m[2]}:null}).filter(Boolean);
  return {title:'Magic Menu',body:`<p style="color:#6b6b70">Magic Menu skapar produkter från en meny. I kassan fotograferar du menyn, här klistrar du in den som text: en rad per produkt med namn och pris.</p>
  <textarea data-in="menu" data-live="1" data-g="in-menu" style="width:100%;height:130px;border:0;border-radius:8px;padding:10px;font:inherit;resize:none" placeholder="Smörgås ost 55&#10;Fralla 25&#10;Juice 39">${esc(UI.f.menu||'')}</textarea>
  <div class="sec">Lägg i grupp</div><div style="display:flex;flex-wrap:wrap;gap:6px">${S.groups.map(g=>`<button class="btnb ${UI.f.mg===g.id?'':'g'}" style="min-width:0;height:30px" data-a="magicgrp" data-x="${g.id}">${esc(g.name)}</button>`).join('')}</div>
  <div class="sec">Hittade produkter (${lines.length})</div><div class="grp plain">${lines.map(l=>row(l.name,{val:kr(l.price),nochev:1})).join('')||'<p style="padding:12px;margin:0;color:#8e8e93">Inga rader ännu.</p>'}</div>`,
  foot:`<button class="btnb ${lines.length&&UI.f.mg?'':'dis'}" data-a="magicgo" data-g="magic-go">Skapa ${lines.length} produkter</button>`}};

/* catalog with sync/reload/images */
PAGES.catalog=()=>({title:'Product Catalog',body:`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px">
  <button class="bigt" data-a="go" data-x="mpg" data-g="cat-mpg">${IC.shapes}Manage products & groups</button><button class="bigt" data-a="go" data-x="modifiers" data-g="cat-mod">${IC.notes}Manage modifiers</button><button class="bigt" data-a="go" data-x="magic" data-g="cat-magic">${IC.tools}Magic Menu</button></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px"><button class="btnb g" style="min-width:0" data-a="catsync">${IC.refresh} Synchronize Product Catalog</button><button class="btnb g" style="min-width:0;color:var(--red)!important" data-a="catreload">Reload Product Catalog</button></div>
  <div class="grp" style="margin-top:20px">${row('Enable images on catalog buttons',{a:'catimg',tog:S.catalog.images})}</div>
  <div class="sec">Overview</div><div class="grp plain">${row('Products',{val:S.products.length,nochev:1})}${row('Sellable',{val:S.products.filter(p=>p.sellable!==false).length,nochev:1})}${row('Product groups',{val:S.groups.length,nochev:1})}${row('Sellable Yabie Gift Cards',{val:Object.keys(S.giftcards).length,nochev:1})}</div>
  <div class="sec">Latest update</div><div class="grp plain">${row('Date',{val:S.catalog.synced||'–',nochev:1})}</div>`});

/* product form: variable price, unit, sellable, modifiers */
PAGES.prodform=d=>{const f=UI.f.pf;const g=G(f.gid);const chev=`<span style="color:var(--blue)">${IC.chev.replace('<svg','<svg style="width:11px;height:11px"')}</span>`;
  return {title:d.id?'Edit product':'Create new product',body:`${fld('Name*','pname',{ph:'Product name'})}
   <button class="fld" style="width:100%" data-a="go" data-x="pickgroup" data-g="pf-group"><label>Product group*</label><span class="rt" style="color:${g?'#1c1c1e':'#8e8e93'}">${g?esc(g.name):'Choose'} ${chev}</span></button>
   <div class="sec" style="margin-top:0">Price*</div><div style="margin-bottom:10px"><span class="radio ${f.priceType!=='variable'?'on':''}" data-a="pftype" data-x="fixed"><i></i>Fixed price</span><span class="radio ${f.priceType==='variable'?'on':''}" data-a="pftype" data-x="variable" data-g="pf-variable"><i></i>Variable price</span></div>
   ${f.priceType==='variable'?'<p style="color:#8e8e93;margin:0 0 22px">Priset anges i kassan varje gång produkten säljs.</p>':`<button class="fld" style="width:100%" data-a="go" data-x="price" data-g="pf-price"><label>Default price (${g?g.vat:0}% VAT)${f.unit==='kg'?' per kg':''}</label><span class="rt" style="color:#1c1c1e">${n2(f.price||0)} kr ${chev}</span></button>`}
   <div class="sec">Additional information</div><div class="fld tall"><label>Description</label><input data-in="pdesc" value="${esc(UI.f.pdesc||'')}" placeholder="Product description"></div>
   <div class="fld">Unit<span class="rt">${[['st','Units'],['kg','Kilogram']].map(([k,l])=>`<button class="btnb ${(f.unit||'st')===k?'':'g'}" style="min-width:90px;height:28px" data-a="pfunit" data-x="${k}">${l}</button>`).join('')}</span></div>
   <button class="fld" style="width:100%" data-a="pfsell">Can be sold<span class="rt"><span class="tog ${f.sellable!==false?'on':''}"></span></span></button>
   ${d.id?`<div class="sec">Tillval</div><div class="grp plain">${S.modifiers.map(m=>row(m.name,{a:'pfmod',x:m.id,html:`<span class="radio ${m.pids.includes(d.id)?'on':''}"><i></i>${esc(m.name)}</span>`,nochev:1})).join('')}</div><div class="grp plain" style="margin-top:20px">${row('Ta bort produkten',{a:'proddel',cls:'red',nochev:1})}</div>`:''}`,
   foot:`<button class="btnb red" style="min-width:224px" data-a="mback">Cancel</button><button class="btnb" style="min-width:224px" data-a="prodsave" data-x="copy">${IC.copy} Save & Copy</button><button class="btnb" style="min-width:224px" data-a="prodsave" data-g="pf-save">${IC.save} Save</button>`}};

/* printers: A4 and forget/add */
PAGES.printers=()=>({title:'Printers',body:`<div class="sec">Receipt printer</div><div class="grp">${S.printer.name?row(S.printer.name,{a:'go',x:'printer',ic:'printer',g:'printer-row',val:S.printer.connected?'<span style="color:#34c759">Connected</span>':'<span style="color:var(--red)">Not connected</span>'}):row('Lägg till kvittoskrivare',{a:'go',x:'printer',ic:'printer',cls:'lk',g:'printer-row'})}</div>
  <div class="sec">A4 printer</div><div class="grp">${row(S.a4||'No Printer Selected',{a:'go',x:'a4',g:'row-a4'})}</div>
  <div class="sec">Printer to use for receipts</div><div class="grp plain">${[['receipt','The receipt printer'],['a4','The A4 printer']].map(([k,l])=>row(l,{a:'prto',x:k,html:`<span class="radio ${S.printer.receipts===k?'on':''}"><i></i>${l}</span>`,nochev:1})).join('')}</div><p style="font-size:11.5px;color:#8e8e93">NOTE: Transaction slips will always print on the Receipt printer.</p>`});
PAGES.a4=()=>({title:'A4 printer',body:`<div class="grp plain" style="margin-top:12px">${['Ingen',...['HP LaserJet Pro (Wi-Fi)','Brother HL-L2350 (AirPrint)']].map(n=>row(n,{a:'a4sel',x:n,html:`<span class="radio ${(S.a4||'Ingen')===n?'on':''}"><i></i>${esc(n)}</span>`,nochev:1})).join('')}</div>`});
const _printer=PAGES.printer;PAGES.printer=()=>{if(!S.printer.name)return {title:'Add receipt printer',body:`<div class="sec">Local network printers</div><div class="grp plain">${['mC-Print3 E874','TSP100IV 64F6','mC-Print3 C6CA'].map(n=>row(n,{a:'prsel',x:n,ic:'printer',icbg:'#9a9aa0'})).join('')}</div>`};return _printer()};

/* login screen after logout */
PAGES.login=()=>({noClose:true,lock:true,white:true,title:'',css:'left:0;top:0;width:1051px;height:788px;border-radius:0',body:`<div style="max-width:340px;margin:130px auto 0;text-align:center"><div class="spin" style="margin:0 auto 18px;animation:none">ya</div><h2 style="margin:0 0 6px">Logga in i Yabie</h2><p style="color:#8e8e93;margin:0 0 22px">Kassan är utloggad.</p>
  <div class="fld" style="border:1px solid #e1e1e6"><input value="demo@kaffebaren.se" readonly></div><div class="fld" style="border:1px solid #e1e1e6"><input type="password" value="demodemo" readonly></div><button class="btnb" style="min-width:340px" data-a="login" data-g="login">Logga in</button></div>`});

/* ── actions ── */
const _go=A.go;
Object.assign(A,{
  go(x,el){const y=el&&el.dataset.y;
    if(x==='news'){S.news.forEach(n=>n.read=true);save()}
    if(['giftsell','guests','drawermove'].includes(x))UI.f.amt='';
    if(x==='giftbal')UI.f.code='';
    if(x==='custform'){UI.f.cname='';UI.f.cphone='';UI.f.cemail=''}
    if(x==='customers')UI.f.q='';
    if(x==='userform'){UI.f.uname='';UI.f.upin='';UI.f.urole='Kassör'}
    if(x==='modform'){const m=y&&S.modifiers.find(z=>z.id===y);UI.f.mf=m?JSON.parse(JSON.stringify(m)):{id:null,name:'',multi:false,opts:[],pids:[]};UI.f.mname=m?m.name:'';UI.f.oname='';UI.f.oprice=''}
    if(x==='magic'){UI.f.menu='';UI.f.mg=S.groups[0].id}
    if(x==='journal'||x==='period'){['jf','jt','pf','pt'].forEach(k=>delete UI.f[k])}
    if(x==='drawermove')UI.f.dnote='';
    _go(x,el);
    if(x==='prodform'){const p=y&&P(y);Object.assign(UI.f.pf,{priceType:p?.priceType||'fixed',unit:p?.unit||'st',sellable:p?p.sellable!==false:true});render()}
  },
  logout(){UI.modal={stack:[{p:'login',d:{}}]};emit('logout');render()},
  login(){UI.modal=null;emit('login');toast('Inloggad');render()},
  /* selling */
  modpick(x){const[mid,i]=x.split(':'),m=S.modifiers.find(z=>z.id===mid);if(!m.multi)Object.keys(UI.f.mods).forEach(k=>{if(k.startsWith(mid+':'))delete UI.f.mods[k]});UI.f.mods[x]=!UI.f.mods[x];render()},
  modadd(){const d=mtop().d,p=P(d.pid);let price=p.price;const names=[];modsFor(d.pid).forEach(m=>m.opts.forEach((o,i)=>{if(UI.f.mods[m.id+':'+i]){price+=o.price;names.push(o.name)}}));UI.modal=null;addProduct(d.pid,{price,mods:names})},
  askpriceok(){const d=mtop().d;UI.modal=null;addProduct(d.pid,{price:+UI.f.amt})},
  askweightok(){const d=mtop().d,p=P(d.pid),g=+UI.f.amt;UI.modal=null;addProduct(d.pid,{price:Math.round(p.price*g/10)/100,weight:g,name:`${p.name} ${(g/1000).toLocaleString('sv-SE',{minimumFractionDigits:3})} kg`})},
  itemcourse(c){C().items[mtop().d.i].course=c;save();render()},
  'm-guests'(){UI.more=false;if(!S.guestsOn){render();return toast('Slå på Guests under My Store → Settings först.')}UI.f.amt=String(C().guests||'');openModal('guests')},
  guestsok(){C().guests=+(UI.f.amt||0);save();closeModal()},
  'm-courses'(){UI.more=false;if(!S.courses.on){render();return toast('Slå på Courses under My Store → Administration först.')}UI.showCourses=!UI.showCourses;if(UI.showCourses)C().items.sort((a,b)=>S.courses.list.indexOf(a.course)-S.courses.list.indexOf(b.course));render()},
  tipgo(v){pendingTip=+v;UI.modal=null;emit('tip',+v);pay('card',true)},
  giftok(){const code=(UI.f.code||'').trim().toUpperCase(),g=S.giftcards[code];if(!g||g.balance<cartTot())return;UI.giftCode=code;finalize('gift')},
  /* gift cards */
  giftamt(v){UI.f.amt=String(v);render()},
  giftsellok(){const v=+UI.f.amt;if(!v)return;if(C().ret)return toast('Avsluta returen först.');C().items.push({pid:null,gift:true,name:'Presentkort',price:v,qty:1,disc:0,note:''});save();closeModal();toast('Presentkortet ligger i varukorgen. Koden skapas vid betalning.')},
  /* time tracking */
  tt(name){if(S.staffIn[name]){const l=S.timelog.slice().reverse().find(x=>x.name===name&&!x.out);if(l)l.out=now();delete S.staffIn[name];toast(name+' är utcheckad')}else{S.staffIn[name]=now();S.timelog.push({name,in:now()});toast(name+' är incheckad')}save();render()},
  /* tipping */
  tiptog(){S.tipping.on=!S.tipping.on;save();render()},
  tippct(i){const opts=[3,5,7,10,12,15,20];const cur=S.tipping.pcts[+i];S.tipping.pcts[+i]=opts[(opts.indexOf(cur)+1)%opts.length];save();render()},
  /* customers */
  custsave(){const name=(UI.f.cname||'').trim();if(!name)return toast('Fyll i namn');S.customers.push({id:'c'+Date.now(),name,phone:UI.f.cphone||'',email:UI.f.cemail||''});save();pop();toast('Kunden är sparad')},
  custtoorder(id){const c=S.customers.find(x=>x.id===id);C().customer=c.name;save();closeModal();toast(c.name+' är kopplad till ordern')},
  'm-customer'(){UI.f={q:''};openModal('customers')},
  /* courses */
  coursetog(){S.courses.on=!S.courses.on;save();render()},
  coursedel(i){S.courses.list.splice(+i,1);save();render()},
  courseadd(){const n=(UI.f.cname2||'').trim();if(!n)return;S.courses.list.push(n);UI.f.cname2='';save();render()},
  /* functions */
  fnvis(i){S.fnList[+i].vis=!S.fnList[+i].vis;save();render()},
  fnup(i){i=+i;if(i>0){const l=S.fnList;[l[i-1],l[i]]=[l[i],l[i-1]];save();render()}},
  fndown(i){i=+i;const l=S.fnList;if(i<l.length-1){[l[i+1],l[i]]=[l[i],l[i+1]];save();render()}},
  gueststog(){S.guestsOn=!S.guestsOn;save();render()},
  /* reports */
  journalshow(){const f=UI.f.jf||now().slice(0,8)+'01',t=UI.f.jt||now().slice(0,10);push('receipt',{kind:'journal',from:f,to:t,title:'Journal'})},
  journalsend(){if(!/\S+@\S+\.\S+/.test(UI.f.jmail||''))return toast('Fyll i en e-postadress');toast('Journalen skickas till '+UI.f.jmail)},
  periodgo(){const f=UI.f.pf||now().slice(0,8)+'01',t=UI.f.pt||now().slice(0,10);push('receipt',{kind:'period',from:f,to:t,title:'Period report'})},
  /* drawer */
  drawerok(){const d=mtop().d,v=+UI.f.amt||0;if(!v&&(d.id==='in'||d.id==='out'))return;
   if(d.id==='float'){S.drawer.float=v;S.drawer.moves=[{at:now(),kind:'Open Balance',amt:0}];save();pop();emit('drawer:open',v);toast('Cash balance opened');return}
   if(d.id==='close'){const diff=v-drawerSum();S.drawer={float:null,moves:[]};save();pop();emit('drawer:close');toast('Cash balance closed. Difference: '+kr(diff));return}
   if(d.id==='out'&&v>drawerSum())return toast('Not enough cash in drawer');
   S.drawer.moves.push({at:now(),kind:d.id==='in'?'Add Cash':'Remove Cash',amt:d.id==='in'?v:-v,note:UI.f.dnote||''});save();pop();emit('drawer:move');toast('Cash balance updated')},
  openbalok(){S.drawer.float=+UI.f.amt||0;S.drawer.moves=[{at:now(),kind:'Open Balance',amt:0}];save();emit('drawer:open',S.drawer.float);UI.f={cash:''};openModal('cash')},
  draweropen(){S.drawer.moves.push({at:now(),kind:'Open Drawer',amt:0});save();toast('Cash drawer opened');emit('drawer:kick');render()},
  drawerreset(){S.drawer={float:null,moves:[]};save();render()},
  /* users */
  urole(r){UI.f.urole=r;render()},
  usersave(){const n=(UI.f.uname||'').trim(),p=(UI.f.upin||'').trim();if(!n||!/^\d{4}$/.test(p))return toast('Fyll i namn och en fyrsiffrig PIN');S.cashiers.push({name:n,role:UI.f.urole||'Kassör',pin:p});save();pop()},
  userdel(i){if(S.cashiers.filter(c=>c.role==='Admin').length<2&&S.cashiers[+i].role==='Admin')return toast('Minst en Admin behövs.');S.cashiers.splice(+i,1);save();render()},
  pinkey(k){let p=UI.f.pin||'';if(k==='⌫')p=p.slice(0,-1);else if(p.length<4)p+=k;UI.f.pin=p;render();
    if(p.length===4)setTimeout(()=>{const u=S.cashiers.find(c=>c.pin===p);if(!u||u.role!=='Admin'){UI.f.pin='';toast(u?u.name+' saknar behörighet för returer':'Fel PIN-kod');return}
      const t=mtop();UI.modal.stack.pop();if(t.d.next==='retselect'){mtop().d.sel=true;UI.f.ret={}}emit('pin:ok');render()},250)},
  /* modifiers */
  modmulti(){UI.f.mf.multi=!UI.f.mf.multi;render()},
  modoptadd(){const n=(UI.f.oname||'').trim();if(!n)return;UI.f.mf.opts.push({name:n,price:+(UI.f.oprice||0)||0});UI.f.oname='';UI.f.oprice='';render()},
  modoptdel(i){UI.f.mf.opts.splice(+i,1);render()},
  modprod(id){const l=UI.f.mf.pids;l.includes(id)?l.splice(l.indexOf(id),1):l.push(id);render()},
  modsave(){const f=UI.f.mf,n=(UI.f.mname||'').trim();if(!n||!f.opts.length)return toast('Fyll i namn och minst ett tillval');f.name=n;if(f.id){const i=S.modifiers.findIndex(m=>m.id===f.id);S.modifiers[i]=f}else{f.id='m'+Date.now();S.modifiers.push(f)}save();pop()},
  pfmod(mid){const m=S.modifiers.find(z=>z.id===mid),id=mtop().d.id;m.pids.includes(id)?m.pids.splice(m.pids.indexOf(id),1):m.pids.push(id);save();render()},
  /* magic menu */
  magicgrp(id){UI.f.mg=id;render()},
  magicgo(){const lines=(UI.f.menu||'').split('\n').map(l=>l.trim().match(/^(.+?)[\s.:–-]+(\d+)\s*(kr)?$/i)).filter(Boolean);lines.forEach((m,i)=>S.products.push({id:'p'+Date.now().toString(36)+i,name:m[1].trim(),price:+m[2],gid:UI.f.mg,desc:''}));save();emit('magic',lines.length);pop();toast(lines.length+' produkter skapade')},
  /* catalog */
  catsync(){S.catalog.synced=now();save();toast('Produktkatalogen är synkroniserad');render()},
  catreload(){S.catalog.synced=now();save();toast('Produktkatalogen laddades om');render()},
  catimg(){S.catalog.images=!S.catalog.images;save();render()},
  /* product form */
  pftype(t){UI.f.pf.priceType=t;render()},
  pfunit(u){UI.f.pf.unit=u;render()},
  pfsell(){UI.f.pf.sellable=UI.f.pf.sellable===false;render()},
  /* printers */
  a4sel(n){S.a4=n==='Ingen'?null:n;save();pop()},
  prforget(){S.printer.name='';S.printer.connected=false;save();pop();toast('Skrivaren är bortkopplad')},
});
/* product save must keep the new fields */
const _prodsave=A.prodsave;A.prodsave=function(x){const f=UI.f.pf;if(f.priceType==='variable')f.price=f.price||0;
  const name=(UI.f.pname||'').trim();if(!name)return toast('Fyll i produktens namn');if(!f.gid)return toast('Välj en produktgrupp');if(f.priceType!=='variable'&&!f.price)return toast('Ange ett pris');
  let p=f.id&&P(f.id);const data={name,gid:f.gid,price:f.price||0,desc:UI.f.pdesc||'',priceType:f.priceType,unit:f.unit,sellable:f.sellable};
  if(p)Object.assign(p,data);else{p={id:'p'+Date.now().toString(36),...data};S.products.push(p)}
  save();emit('product:save',p);
  if(x==='copy'){UI.f.pf={gid:f.gid,price:f.price,priceType:f.priceType,unit:f.unit,sellable:f.sellable};UI.f.pname=name+' (kopia)';toast('Sparad. Fyll i kopian.');return}
  UI.f.q='';pop();toast('Produkten är sparad')};
/* amtkey must stay usable for gift, guests and drawer amounts too */
const _amtok=A.amtok;A.amtok=function(){_amtok()};
