/* Backstage-guider som fortsätter i kassan: efter Backstage-delen får användaren välja
   iPad-kassan, mobilkassan eller båda. Fortsättningsguiderna är dolda i listorna. */
(()=>{
const tabSel=n=>()=>`#pos [data-g="tab-${slug(n)}"]`;
const grpOf=n=>S.groups.find(g=>g.name===n);
const ensureGlass=()=>{let g=grpOf('Glass');if(!g){g={id:'g-glass',name:'Glass',vat:12,ledger:'3002',color:'#a4e4ff'};S.groups.push(g)}
 if(!S.products.find(p=>p.name==='Vaniljglass'))S.products.push({id:'p-vanilj',name:'Vaniljglass',price:35,gid:g.id,desc:''});return g};
const ensureTopping=()=>{const g=ensureGlass();const pid=S.products.find(p=>p.name==='Vaniljglass').id;let m=S.modifiers.find(x=>x.name==='Topping');
 if(!m){m={id:'m-top',name:'Topping',req:false,always:true,multi:false,max:1,opts:[{name:'Chokladsås',price:5}],pids:[]};S.modifiers.push(m)}if(!m.pids.includes(pid))m.pids.push(pid);return m};
const ensurePromo=()=>{if(!S.promotions.find(p=>p.name==='Höstrea'))S.promotions.unshift({id:'pr-host',name:'Höstrea',type:'Group discount',auto:true,from:'',to:'',rule:{pct:20,kr:0,gids:['g-merch'],pids:[]},active:true,bs:1})};
const ensureManual=()=>{if(!S.promotions.find(p=>p.name==='Studentrabatt'))S.promotions.unshift({id:'pr-stud',name:'Studentrabatt',type:'Discount %',auto:false,from:'',to:'',rule:{pct:10,kr:0,gids:['g-kaffe'],pids:[]},active:true,bs:1})};
const ensurePay=n=>{let p=S.payments.find(x=>x.name===n);if(!p){p={id:'x'+slug(n),name:n,icon:'invoice',enabled:true,quick:false};S.payments.push(p)}p.enabled=true;return p};
const ensureSara=()=>{S.cashiers=S.cashiers||[];if(!S.cashiers.find(c=>c.name==='Sara Berg'))S.cashiers.push({name:'Sara Berg',role:'Kassör',pin:'4321'})};
const utePlan=()=>{let p=(S.plans||[]).find(x=>x.name==='Uteservering');if(!p){p={id:'pl-ute',name:'Uteservering',places:[{id:'t-ute1',name:'Ute 1',color:'#a9fcd3',pos:0,w:1,h:1},{id:'t-ute2',name:'Ute 2',color:'#a9fcd3',pos:2,w:1,h:1}]};S.plans=S.plans||[];S.plans.push(p);S.tables=S.plans.flatMap(q=>q.places.map(x=>({id:x.id,name:x.name})))}
 const t=p.places[0];S.parked=(S.parked||[]).filter(c=>c.table!==t.id);return p};
const intro=(app,d)=>({t:app==='pos'?'Nu i iPad-kassan':'Nu i mobilkassan',d,next:1});
const done=d=>({t:'Klart!',d,next:1});

/* ── iPad-kassan ── */
const P=(id,title,steps,pre)=>TOURS.push({app:'pos',x:1,hide:1,ch:'Fortsättning',id,title,steps,pre:()=>{kaffebar();pre&&pre();save()}});
P('c-pos-produkt','Sälj den nya produkten i kassan',[
 intro('pos','Det du skapade i Backstage finns redan i kassan. Ändringar skickas automatiskt till alla kassor i butiken.'),
 {el:'tab-glass',sel:tabSel('Glass'),d:'Produktgruppen <b>Glass</b> har blivit en egen flik. Tryck på den.',until:()=>UI.tab==='g:'+grpOf('Glass').id},
 {el:'tile-vaniljglass',d:'Här är <b>Vaniljglass</b> för 35 kr. Tryck på den.',until:()=>C().items.some(i=>i.name==='Vaniljglass')||(UI.modal&&mtop().p==='mods')},
 done('Produkten ligger i varukorgen med priset och momsen från Backstage. Syns inte en ändring direkt: <b>My Store → Product Catalog → Synchronize Product Catalog</b>.')],ensureGlass);
P('c-pos-tillval','Sälj med det nya tillvalet i kassan',[
 intro('pos','Tillvalsgruppen <b>Topping</b> från Backstage är kopplad till glassen i kassan.'),
 {el:'tab-glass',sel:tabSel('Glass'),d:'Tryck på fliken <b>Glass</b>.',until:()=>UI.tab==='g:'+grpOf('Glass').id},
 {el:'tile-vaniljglass',d:'Tryck på <b>Vaniljglass</b>.',on:'open:mods'},
 {el:'mod-add',allow:'.mpills,.radio,.qbox',d:'Eftersom du bockade i <b>Öppna alltid detaljvyn</b> öppnas tillvalen direkt. Välj <b>Chokladsås</b> och tryck <b>Add to Basket</b>.',on:'add'},
 done('Tillvalet och dess pris syns under raden i varukorgen och följer med till köket.')],()=>{ensureTopping()});
P('c-pos-kampanj','Kampanjen i kassan',[
 intro('pos','Automatiska kampanjer från Backstage dras av direkt i kassan, utan att kassören gör något.'),
 {el:'tab-merch',sel:tabSel('Kaffebönor & muggar'),d:'Tryck på fliken <b>Kaffebönor &amp; muggar</b>.',until:()=>UI.tab==='g:g-merch'},
 {el:'tile-mugg',d:'Sälj en <b>Mugg</b>.',on:'add'},
 done('Kampanjen <b>Höstrea</b> syns som en lila rad i varukorgen och 20 % är avdraget från summan. Pausar du kampanjen i Backstage försvinner rabatten.')],ensurePromo);
P('c-pos-manuell','Manuell kampanj i kassan',[
 intro('pos','En manuell kampanj läggs bara på när kassören väljer den, till exempel när kunden visar studentlegitimation.'),
 {el:'tile-bryggkaffe',d:'Sälj en <b>Bryggkaffe</b>.',on:'add'},
 {el:'promo-banner',sel:'#pos [data-a="promoshow"],#pos [data-a="promodet"]',d:'Kassan visar att en kampanj finns. Tryck <b>Show details</b>.',until:()=>!!(UI.modal&&/^promo/.test(mtop().p))},
 {el:'promo-apply',sel:'#pos [data-a="promoapply"]',d:'Kunden visar studentleg. Tryck på <b>Studentrabatt</b>.',on:'promo'},
 done('Rabatten ligger nu på köpet. Du kan också lägga kampanjen som en egen knapp: <b>Edit</b> → tom ruta → <b>Lägg till funktion → Kampanjer → Manuella kampanjer</b>.')],ensureManual);
P('c-pos-lunch','Ta betalt med det nya betalsättet',[
 intro('pos','Betalsättet du lade till i Backstage finns nu i kassan.'),
 {el:'tile-bryggkaffe',d:'Sälj en <b>Bryggkaffe</b>.',on:'add'},
 {el:'allpay',d:'Tryck <b>ALL PAYMENTS</b>.',on:'allpay'},
 {el:'pm-lunch',sel:()=>`#pos [data-g="pm-${ensurePay('Lunchkupong').id}"]`,d:'Här finns <b>Lunchkupong</b>. Tryck på den.',on:'paid'},
 {el:'rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'receipt:skip'},
 done('Köpet är registrerat som Lunchkupong och syns som ett eget betalsätt i Z-rapporten. Vill du ha en snabbknapp lägger du till den under <b>My Store → Payment Methods</b>.')],()=>ensurePay('Lunchkupong'));
P('c-pos-swish','Ta betalt med Swish i kassan',[
 intro('pos','Med Swish Handel är betalningen kopplad till kassan.'),
 {el:'tile-cappuccino',d:'Tryck på <b>Cappuccino</b>.',on:'open:mods'},
 {el:'mod-add',allow:'.mpills,.radio,.qbox',d:'Tryck <b>Add to Basket</b>.',on:'add'},
 {el:'allpay',d:'Tryck <b>ALL PAYMENTS</b>.',on:'allpay'},
 {el:'pm-swish',d:'Välj <b>Swish</b>.',on:'open:swish'},
 {el:'swish-ok',d:'Kassan visar en QR-kod som kunden skannar i Swish-appen. Kassan väntar tills betalningen är klar. Tryck <b>Simulera att kunden betalar</b>.',on:'paid'},
 {el:'rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'receipt:skip'},
 done('Swish-betalningen är klar. Med Swish Handel görs returer automatiskt tillbaka till kundens Swish.')],()=>{const p=S.payments.find(x=>x.id==='swish');if(p)p.enabled=true});
P('c-pos-sara','Stämpla in den nya personalen',[
 intro('pos','Sara kan nu använda sin PIN-kod i kassan.'),
 {el:'mystore',d:'Öppna <b>My Store</b>.',on:'open:ms'},
 {el:'row-time',d:'Tryck <b>Time Tracking</b>.',on:'open:pin'},
 {el:'modal-pin',allow:'.npad,.pin',d:'Time Tracking kräver behörighet. Ange Ägarens PIN <b>1234</b>.',on:'open:timetrack'},
 {el:'modal-timetrack',allow:'.npad,.pin',d:'Nu stämplar Sara in med sin egen PIN. Ange <b>4321</b>.',on:'open:ttconfirm',fill:()=>{UI.f.pin='';['4','3','2','1'].forEach(k=>A.pinkey(k))}},
 {el:'tt-start',d:'Kassan visar att PIN-koden tillhör <b>Sara Berg</b>. Tryck <b>Start shift</b>.',on:'shift:in'},
 done('Saras pass syns i personalliggaren i Backstage. Samma PIN används för behörigheter i kassan.')],ensureSara);
P('c-pos-bord','Använd bordskartan i kassan',[
 intro('pos','Bordskartan <b>Uteservering</b> finns nu under <b>Parked</b> i kassan.'),
 {el:'tile-kanelbulle',d:'Lägg en <b>Kanelbulle</b> i varukorgen.',on:'add'},
 {el:'park',d:'Tryck <b>Park</b>.',on:'open:park'},
 {el:'plan-uteservering',d:'Varje bordskarta har en egen flik. Tryck <b>Uteservering</b>.',on:'tables:tab'},
 {el:'tbl-ute-1',d:'Tryck på bordet <b>Ute 1</b>. Ordern parkeras där.',on:'park'},
 done('Bordet visar nu ordern och summan. Bordskartan är gemensam för alla kassor, så ordern kan tas över i mobilkassan.')],()=>{utePlan();if(S.guestMode==='park')S.guestMode='manual'});

/* ── Mobilkassan ── */
const MU=()=>UI.mb||(UI.mb={});
const fresh=(pre)=>()=>{MOB.init();S.mob=S.mob||{};const m=S.mob;m.cart={items:[],disc:null,table:null,take:false,note:'',cust:null,guests:0,tip:true,ret:null,split:null};m.orders=m.orders||[];m.parked=m.parked||{};m.z=m.z||[];m.zSince=m.zSince||0;if(!('float' in m))m.float=null;
 UI.mb={tab:'cat',grp:null,view:null,sheet:null,kp:'',sel:{},conf:null,toast:null};UI.f={};pre&&pre(m);save()};
const M=(id,title,steps,pre)=>TOURS.push({app:'mob',x:1,hide:1,ch:'Fortsättning',id,title,steps,pre:fresh(pre)});
const addLine=n=>{const p=S.products.find(x=>x.name===n);S.mob.cart.items.push({pid:p.id,name:p.name,price:p.price,qty:1,mods:[],take:false,note:''})};
const grpSel=n=>()=>`#pos [data-g="mb-grp-${slug(n)}"]`;
M('c-mob-produkt','Sälj den nya produkten i mobilen',[
 intro('mob','Det du skapade i Backstage finns redan i mobilkassan.'),
 {el:'mb-grp-glass',sel:grpSel('Glass'),d:'Produktgruppen <b>Glass</b> är en egen ruta. Tryck på den.',on:'mb:grp'},
 {el:'mb-p-vaniljglass',d:'Tryck på <b>Vaniljglass</b>.',until:()=>S.mob.cart.items.some(i=>i.name==='Vaniljglass')||MU().view==='prod'},
 done('Produkten ligger i korgen med priset från Backstage.')],()=>ensureGlass());
M('c-mob-tillval','Sälj med det nya tillvalet i mobilen',[
 intro('mob','Tillvalsgruppen <b>Topping</b> är kopplad till glassen även i mobilen.'),
 {el:'mb-grp-glass',sel:grpSel('Glass'),d:'Tryck <b>Glass</b>.',on:'mb:grp'},
 {el:'mb-p-vaniljglass',d:'Tryck på <b>Vaniljglass</b>. Tillvalen öppnas i en egen vy.',on:'mb:prod'},
 {el:'mb-o-topping-chokladsas',d:'Tryck <b>Chokladsås</b>.',on:'mb:opt'},
 {el:'mb-add',d:'Tryck <b>Add to Basket</b>.',on:'mb:add'},
 done('Glassen med chokladsås ligger i korgen.')],()=>ensureTopping());
M('c-mob-kampanj','Kampanjen i mobilen',[
 intro('mob','Automatiska kampanjer från Backstage dras av i mobilkassan också.'),
 {el:'mb-tab-basket',d:'Det ligger en <b>Mugg</b> i korgen. Tryck <b>Basket</b>.',on:'mb:tab:basket'},
 done('Kampanjen <b>Höstrea</b> syns som en lila rad ovanför summan och 20 % är avdraget.')],()=>{ensurePromo();addLine('Mugg')});
M('c-mob-lunch','Ta betalt med det nya betalsättet i mobilen',[
 intro('mob','Betalsättet du lade till i Backstage finns nu i mobilkassan.'),
 {el:'mb-charge',d:'Det ligger en Bryggkaffe i korgen. Tryck <b>CHARGE</b>.',on:'mb:sheet:pay'},
 {el:'mb-pay-lunch',sel:()=>`#pos [data-g="mb-pay-${ensurePay('Lunchkupong').id}"]`,d:'Tryck <b>Lunchkupong</b>.',on:'mb:paid'},
 {el:'mb-rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'mb:rcpt:skip'},
 done('Köpet är registrerat som Lunchkupong och syns i Z-rapporten.')],m=>{ensurePay('Lunchkupong');MU().tab='basket';addLine('Bryggkaffe')});
M('c-mob-swish','Ta betalt med Swish i mobilen',[
 intro('mob','Swish Handel finns även i mobilkassan.'),
 {el:'mb-charge',d:'Det ligger en Cappuccino i korgen. Tryck <b>CHARGE</b>.',on:'mb:sheet:pay'},
 {el:'mb-pay-swish',d:'Tryck <b>Swish Handel</b>.',on:'mb:paid'},
 {el:'mb-rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'mb:rcpt:skip'},
 done('Swish-betalningen är registrerad. Returer går automatiskt tillbaka till kundens Swish.')],m=>{const p=S.payments.find(x=>x.id==='swish');if(p)p.enabled=true;MU().tab='basket';addLine('Cappuccino')});
M('c-mob-sara','Stämpla in den nya personalen i mobilen',[
 intro('mob','Sara kan nu stämpla in med sin PIN i mobilkassan.'),
 {el:'mb-menu',d:'Öppna menyn.',on:'mb:menu'},
 {el:'mb-m-time',d:'Tryck <b>Time Tracking</b>.',on:'mb:view:timetrack'},
 {el:'mb-kp',sel:'#pos .kmb .kkp',allow:'#pos .kmb .kkp',d:'Ange Saras PIN <b>4321</b>.',until:()=>MU().view==='ttconfirm',fill:()=>{MU().kp='';['4','3','2','1'].forEach(k=>A.mbkey(k))}},
 {el:'mb-tt-start',d:'Kassan visar att PIN-koden tillhör <b>Sara Berg</b>. Tryck <b>Start shift</b>.',on:'mb:shift:in'},
 done('Saras pass är startat och syns i personalliggaren i Backstage.')],m=>{ensureSara();if(m.set)m.set.on={}});
M('c-mob-bord','Använd bordskartan i mobilen',[
 intro('mob','Bordskartan <b>Uteservering</b> finns nu under Park i mobilkassan.'),
 {el:'mb-park',d:'Det ligger en Kanelbulle i korgen. Tryck <b>Park</b>.',on:'mb:parkview'},
 {el:'mb-tbl-ute-1',d:'Bordskartan <b>Uteservering</b> är vald i listan. Tryck på <b>Ute 1</b>.',on:'mb:conf'},
 {el:'mb-conf-yes',d:'Tryck <b>Confirm</b>.',on:'mb:parked'},
 done('Ordern ligger på Ute 1. Bordskartan är gemensam, så iPad-kassan ser samma bord.')],m=>{const p=utePlan();MU().tab='basket';MU().plan=p.id;addLine('Kanelbulle')});

/* ── Koppla Backstage-guider till fortsättningar ── */
const CONT={'bs-produkt':{pos:'c-pos-produkt',mob:'c-mob-produkt'},'bs-tillval':{pos:'c-pos-tillval',mob:'c-mob-tillval'},'bs-kampanj':{pos:'c-pos-kampanj',mob:'c-mob-kampanj'},
 'bs-manuell':{pos:'c-pos-manuell'},'bs-betalsatt':{pos:'c-pos-lunch',mob:'c-mob-lunch'},'bs-swish':{pos:'c-pos-swish',mob:'c-mob-swish'},'bs-personal':{pos:'c-pos-sara',mob:'c-mob-sara'},
 'bs-personalliggare':{pos:'x-personalliggare',mob:'mob-tid'},'bs-bordskarta':{pos:'c-pos-bord',mob:'c-mob-bord'}};
Object.entries(CONT).forEach(([b,c])=>{const t=TOURS.find(x=>x.id===b);if(t)t.cont=c;Object.values(c).forEach(id=>{const f=TOURS.find(x=>x.id===id);if(f)f.contOf=b})});
window.GUIDE_CONT=CONT;

const go=id=>{const t=TOURS.find(x=>x.id===id);if(!t)return;if(t.app==='mob'&&!TS.mobPicked&&window.MOB){MOB.askDev(()=>startTour(id));return}startTour(id)};
const label=a=>a==='mob'?GU('u.contMob'):GU('u.contPos');
const _fin=finishTour;finishTour=function(){const t=T&&T.t;_fin.apply(this,arguments);if(!t)return;const win=tourEl.querySelector('.win');if(!win)return;
 const box=win.querySelector('div[style*="justify-content:center"]');
 if(t.cont&&box){const c=t.cont,apps=Object.keys(c);
  const btns=(apps.length>1?[['pos',label('pos')],['mob',label('mob')],['both',GU('u.contBoth')]]:[[apps[0],label(apps[0])]]).map(([k,l])=>`<button class="pbtn pri" data-cont="${k}">${l}</button>`).join('')+`<button class="pbtn" data-wclose>${GU('u.contNo')}</button>`;
  const pp=win.querySelector('h3+p');if(pp)pp.innerHTML=GU('u.contP');win.querySelector('h3').insertAdjacentHTML('afterend',`<p style="font-weight:600;margin-top:10px">${GU('u.contQ')}</p>`);
  box.innerHTML=btns;
  box.onclick=e=>{const b=e.target.closest('[data-cont]');if(!b)return;const k=b.dataset.cont;TS.chain=k==='both'?[c.mob]:[];tsave();tourEl.innerHTML='';go(k==='both'?c.pos:c[k])};return}
 if(t.contOf&&TS.chain&&TS.chain.length&&box){const nx=TS.chain.shift();tsave();const nt=TOURS.find(x=>x.id===nx);if(!nt)return;
  box.insertAdjacentHTML('afterbegin',`<button class="pbtn pri" data-contnext="${nx}">${GU('u.contNext',label(nt.app))}</button>`);
  box.querySelector('[data-contnext]').onclick=()=>{tourEl.innerHTML='';go(nx)}}
 else if(t.contOf&&box){/* tillbaka till Backstage */box.insertAdjacentHTML('afterbegin',`<button class="pbtn" data-backbs>${GU('u.contBack')}</button>`);box.querySelector('[data-backbs]').onclick=()=>{tourEl.innerHTML='';TS.app='bs';tsave();appSync()}}};
})();
