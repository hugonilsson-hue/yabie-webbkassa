/* Guider för kassan på bärbara enheter. */
(()=>{
const U=()=>UI.mb||(UI.mb={});
const DEV=()=>MOB.dev().t;
const T=(id,ch,title,steps,o={})=>TOURS.push({app:'mob',id,ch,title,steps:steps.flat(),...o});
const X=(id,ch,title,steps,o={})=>T(id,ch,title,steps,{x:1,...o});
const done=d=>({t:'Klart!',d,next:1});
const P=n=>S.products.find(p=>p.name===n);
const line=(n,q=1)=>{const p=P(n);return {pid:p.id,name:p.name,price:p.price,qty:q,mods:[],take:false,note:''}};
const fresh=(o={})=>()=>{MOB.init();S.mob=S.mob||{};const m=S.mob;m.cart={items:[],disc:null,table:null,take:false,note:'',cust:null,guests:0,tip:true,ret:null,split:null};m.orders=m.orders||[];m.parked=m.parked||{};m.z=m.z||[];m.zSince=m.zSince||0;if(!('float' in m))m.float=null;
 UI.mb={tab:o.tab||'cat',grp:null,view:null,sheet:null,kp:'',sel:{},conf:null,toast:null};UI.f={};if(o.items)m.cart.items=o.items.map(x=>line(...x));if(o.float!==undefined)m.float=o.float;if(o.pre)o.pre(m);save()};
const kp=(want,d,key='kp')=>({el:'mb-kp',sel:'#pos .kmb .kkp',allow:'#pos .kmb .kkp',d,until:()=>U().kp===want,fill:()=>{U().kp=want}});
const firstTable=()=>{const p=(S.plans||[])[0];return p&&p.places[0]};
const secondTable=()=>{const p=(S.plans||[])[0];return p&&(p.places[1]||p.places[0])};
const rcpt=[
 {el:'mb-rc-print',when:{mobdev:'v3'},d:'Sunmi V3 har en inbyggd kvittoskrivare upptill. Tryck <b>Print</b> så skrivs kvittot ut direkt. Kunden kan också få det via <b>SMS</b> eller <b>Email</b>.',on:'mb:rcpt:print'},
 {el:'mb-rc-print',when:{mobdev:'a920'},d:'PAX A920 Pro har en inbyggd kvittoskrivare. Tryck <b>Print</b> så skrivs kvittot ut direkt. Kunden kan också få det via <b>SMS</b> eller <b>Email</b>.',on:'mb:rcpt:print'},
 {el:'mb-rc-skip',when:{mobdev:'a35'},d:'Samsung A35 har ingen inbyggd skrivare. Kunden kan få kvittot via <b>SMS</b> eller <b>Email</b>, eller så kopplar du en skrivare. Tryck nu <b>Skip receipt</b>.',on:'mb:rcpt:skip'}];

/* ═════ Grundkurs ═════ */
T('mob-oversikt','Kom igång','Hitta i mobilkassan',[
 {t:'Kassan i fickan',get d(){return `Det här är Yabie-kassan på ${MOB.dev().t}. Den använder samma konto, produkter och betalsätt som kassan på iPad, men skärmen är anpassad för en hand. Allt du ändrar i Backstage syns här också.`},next:1},
 {el:'mb-grp-kaffe',d:'Produktgrupperna visas som färgade rutor, tre i bredd. Tryck <b>Kaffe</b>.',on:'mb:grp'},
 {el:'mb-grp-back',d:'Nu ser du produkterna i gruppen med pris. Rutan <b>Back</b> tar dig tillbaka till alla grupper. Tryck på den.',on:'mb:grp'},
 {el:'mb-search',d:'<b>Search</b> letar bland alla produkter på namn, SKU eller streckkod. Bra när sortimentet är stort.',next:1},
 {el:'mb-tab-basket',d:'Varukorgen ligger i en egen flik längst ner, eftersom skärmen är för smal för att visa allt på en gång. Tryck <b>Basket</b>.',on:'mb:tab:basket'},
 {el:'mb-tab-cat',d:'Siffran på fliken visar hur många artiklar som ligger i korgen. Gå tillbaka med <b>Catalog</b>.',on:'mb:tab:cat'},
 {el:'mb-menu',d:'Menyn uppe till vänster heter <b>My Store</b>, precis som på iPaden. Tryck på den.',on:'mb:menu'},
 {el:'mb-close',d:'Här finns <b>Z-Report</b>, <b>Order History</b> och alla inställningar. Stäng menyn med krysset.',on:'mb:close'},
 done('Nu hittar du runt. Nästa del: sälj en kaffe med tillval.')],{pre:fresh()});
T('mob-salj','Försäljning','Sälj en produkt med tillval',[
 {el:'mb-grp-kaffe',d:'Tryck <b>Kaffe</b>.',on:'mb:grp'},
 {el:'mb-p-cappuccino',d:'Tryck <b>Cappuccino</b>. Produkter med tillval öppnar en egen vy.',on:'mb:prod'},
 {el:'mb-o-mjolk-havremjolk',d:'Tillvalen visas som knappar. Under <b>Mjölk</b> väljer du en. Tryck <b>Havremjölk</b>.',on:'mb:opt'},
 {el:'mb-o-extra-extra-shot',d:'Under <b>Extra</b> får kunden välja flera. Tryck <b>Extra shot</b>. Med <b>+</b> och <b>−</b> på knappen ändrar du antalet.',on:'mb:opt'},
 {el:'mb-takeaway',d:'Ska kaffet tas med? Välj <b>Take-away</b>. Då används momsen för avhämtning om ni har den prislistan.',on:'mb:take'},
 {el:'mb-add',d:'Priset med tillval syns överst. Tryck <b>Add to Basket</b>.',on:'mb:add'},
 {el:'mb-tab-basket',d:'Korgen har fått en etta. Tryck <b>Basket</b>.',on:'mb:tab:basket'},
 {el:'mb-line-0',d:'Raden visar produkten med tillvalen indragna under. Trycker du på raden kan du ändra tillval, antal och rabatt, eller ta bort den.',next:1},
 done('Så säljer du med tillval. Trycker du på en produkt utan tillval läggs den direkt i korgen.')],{pre:fresh()});
T('mob-kontant','Betalning','Ta betalt kontant',[
 {el:'mb-charge',d:'Kunden ska betala 67 kr. Tryck <b>CHARGE</b>.',on:'mb:sheet:pay'},
 {el:'mb-pay-cash',d:'Betalsätten visas som knappar. Tryck <b>Cash</b>.',on:'mb:openbal'},
 {t:'Växelkassa',el:'mb-openbal',d:'Första kontantköpet för dagen kräver att du anger växelkassan, alltså hur mycket som ligger i kassalådan när dagen börjar.',next:1},
 kp('500','Knappa in <b>500</b>.'),
 {el:'mb-openbal',d:'Tryck <b>Open cash balance</b>.',on:'mb:cash'},
 kp('100','Kunden ger dig en hundralapp. Knappa in <b>100</b>. Växeln räknas ut direkt.'),
 {el:'mb-cash-proceed',d:'Tryck <b>Proceed</b>. Har kunden jämna pengar trycker du i stället <b>Proceed with</b> beloppet.',on:'mb:paid'},
 {el:'mb-rc-skip',d:'Köpet är klart. Rutan visar betalt belopp, mottagna kontanter och växel.',next:1},
 rcpt,
 done('Växelkassan är öppnad för dagen och räknas in i Z-rapporten.')],{pre:fresh({tab:'basket',items:[['Bryggkaffe'],['Kanelbulle']],float:null})});
T('mob-kort','Betalning','Ta betalt med kort',[
 {el:'mb-charge',d:'Tryck <b>CHARGE</b>.',on:'mb:sheet:pay'},
 {el:'mb-pay-card',when:{mobdev:'v3'},d:'Sunmi V3 har en kortläsare inbyggd ovanför skärmen. Tryck <b>Kontokort</b>.',on:'mb:card'},
 {el:'mb-pay-card',when:{mobdev:'a920'},d:'PAX A920 Pro är både kassa och kortterminal (ECR on device). Tryck <b>Kontokort</b>.',on:'mb:card'},
 {el:'mb-card-tap',when:{mobdev:'v3'},d:'Betalningsappen öppnas på samma skärm med beloppet ifyllt. Kunden blippar kortet eller mobilen mot symbolen överst på enheten. Tryck <b>Simulera kort</b>.',on:'mb:paid'},
 {el:'mb-card-tap',when:{mobdev:'a920'},d:'Betalningsappen öppnas på samma skärm med beloppet ifyllt. Kunden blippar kortet mot skärmen eller sätter i det i läsaren längst ner. Tryck <b>Simulera kort</b>.',on:'mb:paid'},
 {t:'Fristående terminal',when:{mobdev:'a35'},d:'Mobilen har ingen kortläsare. Kortet tas i en fristående terminal: slå in beloppet där, låt kunden betala, och registrera sedan betalningen i kassan.',next:1},
 {el:'mb-pay-card',when:{mobdev:'a35'},d:'När terminalen har godkänt köpet: tryck <b>Kontokort Trådlös</b>.',on:'mb:paid'},
 rcpt,
 done('Kortbetalningen finns nu i orderhistoriken och i Z-rapporten.')],{pre:fresh({tab:'basket',items:[['Caffè latte'],['Croissant']]})});
X('mob-swcloud','Betalning','Ta betalt med Swedbank Cloud',[
 {el:'mb-charge',d:'Tryck <b>CHARGE</b>.',on:'mb:sheet:pay'},
 {el:'mb-pay-swcloud',d:'Tryck <b>Swedbank Cloud</b>. Betalningen tas direkt i den mobila kassan, med beloppet redan ifyllt.',on:'mb:swc'},
 {el:'mb-sw-screen',d:'Skärmen visar <b>Betala med kort</b> och beloppet. Kunden blippar sitt kort eller sin telefon mot enheten. Tryck på skärmen.',on:'mb:sw:tap'},
 {t:'Kontroll pågår',d:'Betalningen kontrolleras och skärmen visar sedan <b>Köp godkänt</b>. Kassan registrerar köpet av sig själv, du behöver inte trycka på något.',until:()=>U().view!=='swc'},
 rcpt,
 done('Betalningen finns nu i orderhistoriken och i Z-rapporten. Vill kunden avbryta trycker du <b>Avbryt</b> innan kortet blippas.')],{pre:fresh({tab:'basket',items:[['Bryggkaffe']],pre:()=>{const p=S.payments.find(x=>x.id==='swcloud');if(p)p.enabled=true}})});
T('mob-parkera','Försäljning','Parkera en order på bord',[
 {el:'mb-park',d:'Gästen vill betala senare. Tryck <b>Park</b>.',on:'mb:parkview'},
 {el:'mb-tbl-x',sel:()=>`#pos [data-g="mb-tbl-${slug(firstTable().name)}"]`,d:'Borden kommer från bordskartan i Backstage. Fyllda bord är lediga, vita med färgad kant har en order. Tryck på första bordet.',on:'mb:conf'},
 {el:'mb-conf-yes',d:'Tryck <b>Confirm</b>.',on:'mb:parked'},
 {el:'mb-parked',d:'Korgen är tom och ordern ligger på bordet. Nu kommer gästen och vill betala. Tryck <b>Parked</b>.',on:'mb:parkedview'},
 {el:'mb-tbl-x',sel:()=>`#pos [data-g="mb-tbl-${slug(firstTable().name)}"]`,d:'Bordet visar summan. Tryck på det.',on:'mb:pdetail'},
 {el:'mb-pd-add',d:'Här kan du skriva ut en nota, flytta ordern eller ta bort den. Tryck <b>Add to basket</b>.',on:'mb:pdadd'},
 {el:'mb-park',d:'Den gröna raden visar att ordern hör till bordet. Lägger gästen till något trycker du <b>Save</b> för att spara det på bordet igen. Annars tar du betalt som vanligt.',next:1},
 done('Bordskartan är gemensam för alla kassor. En order som du parkerar i mobilen kan tas över i kassan på iPaden, och tvärtom.')],{pre:fresh({tab:'basket',items:[['Cappuccino',2],['Morotskaka']],pre:m=>{const t=firstTable();if(t&&S.parked)S.parked=S.parked.filter(c=>c.table!==t.id)}})});
T('mob-rabatt','Försäljning','Ge rabatt',[
 {el:'mb-functions',d:'Rabatter och delning av notan ligger under <b>FUNCTIONS</b>. Tryck där.',on:'mb:sheet:fn'},
 {el:'mb-fn-disc',d:'Tryck <b>Discount</b>.',on:'mb:disc'},
 {el:'mb-disc-10',d:'Rabattknapparna ställs in under My Store → Discount Buttons. Tryck <b>10%</b>.',on:'mb:discount'},
 {el:'mb-charge',d:'Rabatten visas ovanför totalen. Den hamnar på kvittot och i Z-rapporten.',next:1},
 done('Behöver du ett eget belopp: tryck <b>Manual Discount Input</b> i stället för en knapp.')],{pre:fresh({tab:'basket',items:[['Flat white'],['Kardemummabulle']]})});
T('mob-retur','Returer','Gör en retur',[
 {el:'mb-menu',d:'Returer görs från en tidigare order. Öppna menyn.',on:'mb:menu'},
 {el:'mb-orderhist',d:'Tryck <b>Order History</b>.',on:'mb:view:orders'},
 {el:'mb-ord-0',d:'Senaste ordern ligger överst. Tryck på den.',on:'mb:order'},
 {el:'mb-ret-select',d:'Tryck <b>Select items to return</b>.',on:'mb:rsel'},
 {el:'mb-ret-item-0',d:'Bocka i artikeln som ska returneras.',on:'mb:rtog'},
 {el:'mb-ret-go',d:'Tryck <b>Return selected items</b>.',on:'mb:retcart'},
 {el:'mb-charge',d:'Korgen visar <b>Receiving</b> med minusbelopp och knappen är röd. Tryck <b>CHARGE</b>.',on:'mb:sheet:pay'},
 {el:'mb-pay-cash',d:'Pengarna går tillbaka med samma betalsätt som köpet. Tryck <b>Cash</b>.',on:'mb:cash'},
 {el:'mb-cash-exact',d:'Ge kunden pengarna och tryck <b>Proceed with</b> beloppet.',on:'mb:retreason'},
 {el:'in-mbreason',d:'Skriv en anledning, t.ex. <b>Fel vara</b>.',type:'Fel vara'},
 {el:'mb-ret-next',d:'Tryck <b>Next</b>.',on:'mb:paid'},
 {el:'mb-rc-skip',d:'Returen är klar. Tryck <b>Skip receipt</b>.',on:'mb:rcpt:skip'},
 done('Ordern är nu markerad som returnerad i orderhistoriken.')],{pre:fresh({pre:m=>{m.float=m.float??500;m.orders.push({id:'261012-A1B2C3D4',at:'2026-10-12, 09:12',items:[line('Kanelbulle',2)],sub:70,disc$:0,disc:null,total:70,pay:[{m:'cash',t:'Cash',amt:70,tend:100,change:30}],cust:null,ret:false})}})});
T('mob-z','Dagsavslut','Gör en Z-rapport',[
 {el:'mb-menu',d:'Dagen är slut. Öppna menyn.',on:'mb:menu'},
 {el:'mb-zreport',d:'Tryck <b>Z-Report</b>.',on:'mb:view:zrep'},
 {el:'mb-z-print',d:'Välj hur rapporten ska levereras: utskrift, e-post och/eller på skärmen. E-posten går till adressen nedanför.',next:1},
 {el:'mb-z-create',d:'Tryck <b>Create Report</b>.',on:'mb:zdone'},
 {el:'mb-z-done',d:'Rapporten summerar försäljningen sedan förra Z-rapporten per betalsätt, rabatter, returer och förväntade kontanter i lådan. Tryck <b>Done</b>.',on:'mb:zclosed'},
 done('Gör en Z-rapport varje dag du har sålt något. Växelkassan nollställs och anges igen vid nästa kontantköp.')],{pre:fresh({pre:m=>{m.float=m.float??500;if(m.orders.length<=m.zSince)m.orders.push({id:'261012-77E1F0AA',at:'2026-10-12, 11:40',items:[line('Cappuccino')],sub:45,disc$:0,disc:null,total:45,pay:[{m:'card',t:MOB.dev().card==='ondevice'?'Kontokort':'Kontokort Trådlös',amt:45}],cust:null,ret:false})}})});


/* ═════ Fler funktioner (kartlagda okt 2026) ═════ */
X('mob-andra','Försäljning','Ändra en rad i korgen',[
 {el:'mb-line-0',d:'Tryck på raden <b>Cappuccino</b> i korgen.',on:'mb:lineedit'},
 {el:'mb-o-mjolk-havremjolk',d:'Samma ruta som när du lade till produkten öppnas, med valen ifyllda. Kunden ville ha havremjölk. Tryck <b>Havremjölk</b>.',on:'mb:opt'},
 {el:'mb-qty-plus',d:'Kunden vill ha två. Tryck <b>+</b>.',on:'mb:qty'},
 {el:'mb-line-del',d:'Papperskorgen här tar bort hela raden. Vi behåller den.',next:1},
 {el:'mb-line-ok',d:'Tryck <b>Update</b>.',on:'mb:lineupd'},
 done('Raden är uppdaterad med nytt tillval och antal.')],{pre:fresh({tab:'basket',items:[['Cappuccino']]})});
X('mob-artikelrabatt','Försäljning','Rabatt på en artikel',[
 {el:'mb-grp-kaffe',d:'Tryck <b>Kaffe</b>.',on:'mb:grp'},
 {el:'mb-p-cappuccino',d:'Tryck <b>Cappuccino</b>.',on:'mb:prod'},
 {el:'mb-idisc',d:'Procentknappen bredvid antalet ger rabatt på just den här artikeln, inte hela ordern. Tryck på den.',on:'mb:idisc'},
 {el:'mb-idisc-20',d:'Samma rabattknappar som för hela korgen. Tryck <b>20%</b>.',on:'mb:idisc:set'},
 {el:'mb-add',d:'Rabatten syns under priset. Tryck <b>Add to Basket</b>.',on:'mb:add'},
 {el:'mb-tab-basket',d:'Tryck <b>Basket</b>.',on:'mb:tab:basket'},
 {el:'mb-line-0',d:'Rabatten står på raden, i rött, och dras av från radens pris.',next:1},
 done('Rabatt på hela korgen ger du i stället via <b>FUNCTIONS → Discount</b>.')],{pre:fresh()});
X('mob-redigera','Produkter','Ändra en produkt från kassan',[
 {el:'mb-grp-kaffe',d:'Tryck <b>Kaffe</b>.',on:'mb:grp'},
 {el:'mb-p-bryggkaffe',d:'Håll fingret på <b>Bryggkaffe</b> en stund, ett så kallat långt tryck. Ett vanligt tryck lägger bara varan i korgen. Med musen håller du ner knappen i en halv sekund.',on:'mb:long',fill:()=>A.mblong(P('Bryggkaffe').id)},
 {el:'mb-pedit',d:'Produkten öppnas med bild och beskrivning. Pennan uppe till vänster öppnar den för redigering. Tryck på den.',on:'mb:pedit'},
 {el:'in-mbpe_price',d:'Här ändrar du namn, produktgrupp och pris. Ändringen sparas i Backstage och syns i alla kassor.',next:1},
 {el:'mb-pe-take',d:'<b>Avhämtning</b> ger produkten 6 % moms när den säljs som take-away. Tryck på reglaget.',on:'mb:pe:tog'},
 {el:'mb-pe-addimg',d:'Längst ner byter du produktbild. <b>Take photo</b> fotograferar med enhetens kamera och <b>Add image</b> hämtar en bild som finns på enheten.',next:1},
 {el:'mb-pe-save',d:'<b>Save</b> sparar. <b>Save &amp; copy</b> sparar och skapar en kopia att utgå från. Den här gången sparar vi inte.',next:1},
 {el:'mb-pedit-back',d:'Tryck på pilen för att gå tillbaka utan att spara.',on:'mb:back'},
 done('En produkt som ligger i korgen går inte att redigera, så töm korgen först. Större ändringar som tillval och lagersaldo gör du enklast i Backstage.')],{pre:fresh()});
X('mob-bilder','Produkter','Visa produktbilder i katalogen',[
 {el:'mb-menu',d:'Tryck på menyn uppe till vänster.',on:'mb:menu'},
 {el:'mb-m-catalog',d:'Tryck <b>Product Catalog</b>.',on:'mb:view:catsync'},
 {el:'mb-pc-images',d:'<b>Enable images on catalog buttons</b> slår på och av produktbilderna. Med bilder blir knapparna större, så färre produkter får plats på skärmen. Tryck på reglaget.',on:'mb:set:images'},
 {el:'mb-sync',d:'Har du lagt in nya bilder i Backstage trycker du <b>Synchronize Product Catalog</b> så att kassan hämtar dem.',next:1},
 {el:'mb-close',d:'Stäng menyn och titta på katalogen.',on:'mb:close'},
 done('Slå på bilderna igen på samma ställe. En egen bild lägger du till genom att hålla fingret på produkten, trycka på pennan och välja <b>Add image</b>.')],{pre:fresh({pre:m=>{(m.set||{}).images=true}})});
X('mob-kassalada','Kassa','Lägg in och ta ut kontanter',[
 {el:'mb-functions',d:'Tryck <b>FUNCTIONS</b>.',on:'mb:sheet:fn'},
 {el:'mb-fn-drawer',d:'Tryck <b>Cash drawer</b>.',on:'mb:drawer'},
 {el:'mb-dr-add',d:'Överst ser du hur mycket kontanter som ska finnas i lådan. Du har fått växel från banken. Tryck <b>Add Cash</b>.',on:'mb:cashmove'},
 kp('200','Skriv <b>200</b>.'),
 {el:'in-mbcmn',d:'Skriv en anteckning, till exempel <b>Växel</b>.',type:'Växel'},
 {el:'mb-cm-save',d:'Tryck <b>Update cash balance</b>.',on:'mb:cash:moved'},
 {el:'mb-dr-kick',get d(){return MOB.dev().printer?'<b>Open Drawer</b> öppnar en kassalåda som är kopplad till enheten, utan att något säljs. Tryck på den.':'Samsung A35 har ingen kassalåda kopplad, men knappen finns. Tryck <b>Open Drawer</b>.'},on:'mb:kick'},
 {el:'mb-dr-close',d:'<b>Close Balance</b> räknar av lådan vid dagens slut och visar en eventuell differens. Den används sällan, eftersom Z-rapporten stänger kassan.',next:1},
 done('Insättningar och uttag syns i Z-rapporten under <b>Cash added/removed</b>.')],{pre:fresh({tab:'basket',float:500})});
X('mob-belopp','Betalning','Dela notan på belopp',[
 {el:'mb-functions',d:'Tryck <b>FUNCTIONS</b>.',on:'mb:sheet:fn'},
 {el:'mb-fn-splitamt',d:'Tryck <b>Split by amount</b>.',on:'mb:splitamt'},
 kp('100','Högst upp står hur mycket som återstår. Första gästen betalar 100 kr. Sudda och skriv <b>100</b>.'),
 {el:'mb-sa-charge',d:'Tryck <b>Charge</b>.',on:'mb:sheet:pay'},
 {el:'mb-pay-swish',d:'Tryck <b>Swish Handel</b>.',on:'mb:paid'},
 {el:'mb-rc-skip',d:'Tryck <b>Skip receipt</b>. Du kommer tillbaka till korgen.',on:'mb:rest'},
 {el:'mb-charge',d:'Under totalen står vad som är betalt och vad som återstår. Tryck <b>CHARGE</b> för resten.',on:'mb:sheet:pay'},
 {el:'mb-pay-swish',d:'Tryck <b>Swish Handel</b>.',on:'mb:paid'},
 {el:'mb-rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'mb:rcpt:skip'},
 done('Hela notan är betald i två delar med olika belopp.')],{pre:fresh({tab:'basket',float:500,items:[['Halloumi wrap',2],['Mineralvatten',2]]})});
X('mob-service','Betalning','Lägg till serviceavgift',[
 {el:'mb-more',d:'Tryck <b>More</b>.',on:'mb:more'},
 {el:'mb-m-svc',d:'Tryck <b>Add Service Charge</b>.',on:'mb:svc'},
 {el:'mb-charge',d:'Serviceavgiften på 12,5 % räknas på beloppet efter rabatt och visas ovanför totalen.',next:1},
 {el:'mb-more',d:'Avgiften tas bort på samma ställe. Tryck <b>More</b> igen.',on:'mb:more'},
 {el:'mb-m-svc',d:'Nu står det <b>Remove Service Charge</b>. Tryck på den.',on:'mb:svc'},
 done('Serviceavgiften gäller bara den här ordern.')],{pre:fresh({tab:'basket',items:[['Halloumi wrap',2]]})});
X('mob-xrapport','Dagsavslut','Kolla dagens försäljning (X-rapport)',[
 {el:'mb-menu',d:'Öppna menyn.',on:'mb:menu'},
 {el:'mb-m-reports',d:'Tryck <b>Reports</b>.',on:'mb:view:reports'},
 {el:'mb-rep-x',d:'<b>X-rapporten</b> visar försäljningen hittills i dag utan att avsluta dagen. Tryck på den.',on:'mb:view:xrep'},
 {el:'mb-z-create',d:'Tryck <b>Create Report</b>.',on:'mb:xdone'},
 {el:'mb-z-done',d:'Samma uppställning som Z-rapporten, men ingenting nollställs. Tryck <b>Done</b>.',on:'mb:xclosed'},
 done('Under Reports finns också <b>Journals</b> och <b>Periodic report</b> för längre perioder.')],{pre:fresh({pre:m=>{if(m.orders.length<=m.zSince)m.orders.push({id:'261012-5A3C11B2',at:'2026-10-12, 10:15',items:[line('Cappuccino')],sub:45,disc$:0,disc:null,total:45,pay:[{m:'cash',t:'Cash',amt:45}],cust:null,ret:false})}})});
X('mob-tid','Personal','Stämpla in och ut med tidsregistrering',[
 {el:'mb-menu',d:'Öppna menyn.',on:'mb:menu'},
 {el:'mb-m-time',d:'Tryck <b>Time Tracking</b>.',on:'mb:view:timetrack'},
 {el:'mb-kp',sel:'#pos .kmb .kkp',allow:'#pos .kmb .kkp',d:'Varje anställd stämplar in med sin egen PIN. I demot har baristan PIN <b>0000</b>. Skriv aldrig in en riktig PIN här.',until:()=>U().view==='ttconfirm',fill:()=>{U().kp='';['0','0','0','0'].forEach(k=>A.mbkey(k))}},
 {el:'mb-tt-start',d:'Kassan visar vem PIN-koden tillhör och att hon inte är instämplad. Tryck <b>Start shift</b>.',on:'mb:shift:in'},
 {t:'Instämplad',d:'Raden <b>Already signed in users</b> visar hur många som är instämplade just nu.',next:1},
 {el:'mb-kp',sel:'#pos .kmb .kkp',allow:'#pos .kmb .kkp',d:'När dagen är slut stämplar baristan ut med samma PIN. Ange <b>0000</b> igen.',until:()=>U().view==='ttconfirm',fill:()=>{U().kp='';['0','0','0','0'].forEach(k=>A.mbkey(k))}},
 {el:'mb-tt-end',d:'Nu visas när passet startade. Tryck <b>End shift</b>.',on:'mb:shift:out'},
 done('Passet är avslutat. In- och utstämplingen hamnar i personalliggaren i Backstage, där du också kan rätta ett glömt pass.')],{pre:fresh({pre:m=>{if(m.set){m.set.shifts=1;m.set.on={}}}})});
X('mob-kund','Kunder','Lägg upp en ny kund',[
 {el:'mb-menu',d:'Öppna menyn.',on:'mb:menu'},
 {el:'mb-m-customers',d:'Tryck <b>Customers</b>.',on:'mb:view:customers'},
 {el:'mb-cu-new',d:'Här kan du söka på kundnummer, namn eller organisationsnummer. Tryck <b>New Customer</b>.',on:'mb:view:newcust'},
 {el:'in-mbnc_name',d:'Skriv <b>Lisa Ek</b>.',type:'Lisa Ek'},
 {el:'mb-nc-save',d:'Tryck <b>Save</b>.',on:'mb:cust:new'},
 done('Kunden finns nu i registret och kan läggas på en order via <b>More → Add Customer</b>.')],{pre:fresh()});
X('mob-rabattknapp','Inställningar','Skapa en rabattknapp',[
 {el:'mb-menu',d:'Öppna menyn.',on:'mb:menu'},
 {el:'mb-m-discbtns',d:'Tryck <b>Discount Buttons</b>.',on:'mb:view:discbtns'},
 {el:'mb-db-new',d:'Du kan ha upp till åtta knappar. Tryck <b>Create discount button</b>.',on:'mb:view:discnew'},
 kp('15','Skriv <b>15</b>.'),
 {el:'mb-dn-save',d:'Tryck <b>Save</b>.',on:'mb:db:new'},
 done('Knappen <b>15%</b> finns nu både för rabatt på korgen och på enskilda artiklar.')],{pre:fresh({pre:m=>{if(m.set)m.set.disc=m.set.disc.filter(x=>x!==15)}})});

/* ═════ Fler guider ═════ */
X('mob-sok','Försäljning','Sök och lägg till',[
 {el:'mb-search',d:'Tryck <b>Search</b>.',on:'mb:search'},
 {el:'in-mbq',d:'Skriv <b>bulle</b>.',type:'bulle'},
 {el:'mb-r-kanelbulle',d:'Träffarna visar grupp och pris. Tryck <b>Kanelbulle</b> så hamnar den direkt i korgen.',on:'mb:add'},
 {el:'mb-search-cancel',d:'Tryck <b>Cancel</b> för att gå tillbaka.',on:'mb:close'},
 done('Med en streckkodsläsare kan du också skanna varan direkt.')],{pre:fresh()});
X('mob-extra','Försäljning','Take-away, anteckning och kund',[
 {el:'mb-more',d:'Allt som gäller hela ordern finns under <b>More</b>. Tryck där.',on:'mb:more'},
 {el:'mb-m-take',d:'Tryck <b>Take-away</b>. Hela ordern markeras för avhämtning.',on:'mb:take'},
 {el:'mb-more',d:'Öppna <b>More</b> igen.',on:'mb:more'},
 {el:'mb-m-note',d:'Tryck <b>Order notes</b>.',on:'mb:note'},
 {el:'in-mbon',d:'Skriv <b>Hämtas 12.30</b>.',type:'Hämtas 12.30'},
 {el:'mb-note-save',d:'Tryck <b>Save</b>.',on:'mb:note:saved'},
 {el:'mb-more',d:'Öppna <b>More</b> en gång till.',on:'mb:more'},
 {el:'mb-m-cust',d:'Tryck <b>Add Customer</b>.',on:'mb:cust'},
 {el:'mb-cust-anna-lind',d:'Välj <b>Anna Lind</b>.',on:'mb:cust:set'},
 done('Take-away, anteckning och kund syns överst i korgen och följer med ordern och kvittot.')],{pre:fresh({tab:'basket',items:[['Räksmörgås'],['Lemonad']]})});
X('mob-tavover','Försäljning','Ta över ett bord från iPad-kassan',[
 {t:'En bordskarta för alla',d:'Bordskartan är gemensam för alla kassor i butiken. Ett bord som har parkerats i iPad-kassan syns här i mobilen, och tvärtom. Så kan servitören ta beställningen vid bordet och kassan ta betalt, eller omvänt.',next:1},
 {el:'mb-parked',d:'Tryck <b>Parked</b>.',on:'mb:parkedview'},
 {el:'mb-tbl-x',sel:()=>`#pos [data-g="mb-tbl-${slug(secondTable().name)}"]`,get d(){return `<b>${secondTable().name}</b> har vit bakgrund och färgad kant, alltså en öppen order. Den parkerades i iPad-kassan. Tryck på bordet.`},on:'mb:pdetail'},
 {el:'mb-pd-add',d:'Under <b>Details</b> ser du vem som parkerade ordern och när. Tryck <b>Add to basket</b> för att ta över den.',on:'mb:pdadd'},
 {el:'mb-park',d:'Ordern ligger nu i mobilens korg, och bordet är tomt i iPad-kassan tills du sparar den igen. Lägg till mer och tryck <b>Save</b>, eller ta betalt direkt.',next:1},
 done('Samma sak åt andra hållet: parkera på ett bord i mobilen, så tar iPad-kassan över via <b>Parked</b>.')],{pre:fresh({tab:'cat',pre:m=>{const t=secondTable();if(!t)return;S.parked=(S.parked||[]).filter(c=>c.table!==t.id);const p=P('Cappuccino'),q=P('Kanelbulle');S.parked.push({items:[{pid:p.id,name:p.name,price:p.price,qty:2,disc:0,note:''},{pid:q.id,name:q.name,price:q.price,qty:2,disc:0,note:''}],takeaway:false,orderDisc:0,note:'',customer:'',table:t.id,name:t.name,parkedAt:'10/12, 12:05',cashier:'Kassa 1 (iPad)'})}})});
X('mob-dela','Betalning','Dela notan lika',[
 {el:'mb-functions',d:'Tryck <b>FUNCTIONS</b>.',on:'mb:sheet:fn'},
 {el:'mb-fn-spliteven',d:'Tryck <b>Split evenly</b>.',on:'mb:split'},
 {el:'mb-split-2',d:'Två personer delar. Tryck <b>2</b>.',on:'mb:split:set'},
 {el:'mb-charge',d:'Under totalen står hur mycket varje person ska betala. Tryck <b>CHARGE</b>.',on:'mb:sheet:pay'},
 {el:'mb-pay-swish',d:'Första personen betalar med Swish. Tryck <b>Swish Handel</b>.',on:'mb:paid'},
 {el:'mb-rc-skip',d:'Tryck <b>Skip receipt</b>. Du kommer tillbaka till korgen för nästa del.',on:'mb:rcpt:skip'},
 {el:'mb-charge',d:'En av två är betald. Tryck <b>CHARGE</b> igen.',on:'mb:sheet:pay'},
 {el:'mb-pay-swish',d:'Tryck <b>Swish Handel</b>.',on:'mb:paid'},
 {el:'mb-rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'mb:rcpt:skip'},
 done('Notan är betald i två delar. Med <b>Split by amount</b> bestämmer du i stället beloppet för varje del.')],{pre:fresh({tab:'basket',items:[['Halloumi wrap',2],['Mineralvatten',2]]})});
X('mob-sms','Betalning','Skicka kvitto via SMS',[
 {el:'mb-charge',d:'Tryck <b>CHARGE</b>.',on:'mb:sheet:pay'},
 {el:'mb-pay-cash',d:'Tryck <b>Cash</b>.',on:'mb:cash'},
 {el:'mb-cash-exact',d:'Kunden har jämna pengar. Tryck <b>Proceed with</b> beloppet.',on:'mb:paid'},
 {el:'mb-rc-sms',d:'Kunden vill ha kvittot i mobilen. Tryck <b>SMS</b>.',on:'mb:rcpt:sms'},
 {el:'in-mbrc',d:'Skriv numret <b>0701234567</b>.',type:'0701234567'},
 {el:'mb-rc-send',d:'Tryck <b>Send</b>.',on:'mb:rcpt:sent'},
 done('Kvittot går som en länk i ett SMS. Med <b>Email</b> skickas det till kundens e-post.')],{pre:fresh({tab:'basket',items:[['Espresso'],['Chokladboll']],float:500})});
})();
