/* Backstage guides, written from Yabie's support articles (support.yabie.com). */
(()=>{const {D,B,go,isOn}=BS;
TOURS.splice(0,TOURS.length,...TOURS.filter(t=>t.app!=='bs'));
const NT={catalog:'Produktkatalog',loyalty:'Lojalitet',kitchen:'Kök',gift:'Yabie presentkort',stock:'Lagerhantering',time:'Personalliggare',reports:'Rapporter',analytics:'Försäljning',org:'Handlare',payments:'Betalningar',locations:'Platser',users:'Användare',book:'Bokföring',hw:'Extern hårdvara'};
const nav=(par,child,d)=>[{el:'bsn-'+par,d:(d||`Gå till <b>${NT[par]} → ${BS.NAVMAP[child].t}</b>.`)+` Tryck först på <b>${NT[par]}</b>.`,until:()=>B().open[par]},{el:'bsn-'+child,d:`Tryck <b>${BS.NAVMAP[child].t}</b>.`,on:'bs:page:'+child}];
const top=(id,d)=>({el:'bsn-'+id,d:d||`Tryck <b>${BS.NAVMAP[id].t}</b> i menyn.`,on:'bs:page:'+id});
const pick=(sel,d)=>({el:'dd-'+sel[0],d:d[0],on:'bs:dd:'+sel[0]});
const opt=(k,v,d)=>({el:`opt-${k}-${slug(v)}`,d,on:'bs:set:'+k});
const done=d=>({t:'Klart!',d,next:1});
const reset=(...open)=>()=>{const b=B();b.fg=null;b.psel=[];go('welcome');b.open={};open.forEach(o=>b.open[o]=false)};
const T=(id,ch,title,steps,o={})=>TOURS.push({app:'bs',id,ch,title,steps:steps.flat(),...o});
const X=(id,ch,title,steps,o={})=>T(id,ch,title,steps,{x:1,...o});
const prodSteps=(name,price,gname)=>[
 ...nav('catalog','products'),
 {el:'bs-prod-add',d:'Tryck <b>Lägg till produkter</b>.',on:'bs:page:prodform'},
 {el:'dd-b_pgid',d:'Produktgruppen styr momsen. Öppna <b>Produktgrupp</b>.',on:'bs:dd:b_pgid'},
 {el:'opt-b_pgid-x',sel:()=>{const g=S.groups.find(x=>x.name===gname)||S.groups[0];return `#pos [data-g="opt-b_pgid-${slug(g.id)}"]`},d:`Välj <b>${gname}</b>.`,on:'bs:set:b_pgid'},
 {el:'in-b_pname',d:`Skriv namnet <b>${name}</b>.`,type:name},
 {el:'in-b_pprice',d:`Under <b>Pris</b>: skriv priset inklusive moms, <b>${price}</b>.`,type:String(price)}];

/* ═════ Grundkurs ═════ */
T('bs-oversikt','Kom igång','Hitta i Backstage',[
 {t:'Det här är Backstage',d:'Backstage är webbsidan där du sätter upp allt som kassan använder: produkter, kampanjer, personal, betalsätt och rapporter. Du loggar in på <b>backstage.yabie.com</b>.',next:1},
 top('welcome','Menyn har två delar. Under <b>APPLIKATIONER</b> finns det du jobbar med varje dag och under <b>INSTÄLLNINGAR</b> inställningarna för företaget. Tryck <b>Välkommen</b>.'),
 ...nav('catalog','products','Grupper med en pil öppnas när du trycker på dem. Gå till <b>Produktkatalog → Produkter</b>.'),
 {el:'chip-kaffe',d:'Produktgrupperna visas som färgade etiketter. Tryck <b>KAFFE</b> för att bara se kaffeprodukterna.',until:()=>B().fg==='g-kaffe'},
 done('Allt du ändrar i Backstage skickas till kassorna. Hämtar kassan inte ändringen direkt: gå till <b>Min butik → Produktkatalog</b> i kassan och tryck <b>Synkronisera produktkatalog</b>.')],{pre:reset('catalog')});
T('bs-grupp','Produktkatalog','Skapa en produktgrupp',[
 ...nav('catalog','products'),
 {el:'bs-grp-add',d:'Tryck <b>+</b> bredvid <b>Produktgrupper</b>.',on:'bs:page:groupform'},
 {el:'in-b_gname',d:'Skriv namnet <b>Glass</b>.',type:'Glass'},
 {el:'dd-b_gvat',d:'Produktgruppen styr momsen för alla produkter i gruppen. Öppna <b>Momssats</b>.',on:'bs:dd:b_gvat'},
 opt('b_gvat','12','Välj <b>12 %</b>.'),
 {el:'in-b_gledger',d:'<b>Bokföringskonto</b> fylls i automatiskt efter momsen (3002 för 12 %). Kontrollera med din redovisningskonsult.',next:1},
 {el:'dd-b_gcolor',d:'Öppna <b>Färg</b>. Färgen blir gruppens färg i kassan.',on:'bs:dd:b_gcolor'},
 opt('b_gcolor','Heaven','Välj <b>Heaven</b>.'),
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:group'},
 {el:'chip-glass',d:'Gruppen <b>GLASS</b> finns nu bland produktgrupperna och som flik i kassan. Ordningen ändrar du genom att dra grupperna.',next:1},
 done('Momsen går inte att ändra på en befintlig grupp. Behöver du annan moms skapar du en ny grupp och flyttar produkterna. Tar du bort en grupp raderas också alla produkter i den.')],{pre:()=>{S.groups=S.groups.filter(g=>g.name!=='Glass');S.products=S.products.filter(p=>p.name!=='Vaniljglass');reset('catalog')()}});
T('bs-produkt','Produktkatalog','Skapa en produkt',[...prodSteps('Vaniljglass',35,'Glass'),
 {el:'rd-b_pptype-fixed',d:'<b>Fast pris</b> används oftast. <b>Öppet pris</b> betyder att priset anges i kassan vid varje försäljning.',next:1},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:product'},
 {el:'ptab-stock',d:'Produkten är skapad och flikarna för <b>Lager</b>, <b>Tillval</b>, <b>Rekommendationer</b> och <b>Ingredienser</b> har dykt upp. Dem går vi igenom i andra guider.',next:1},
 done('Fyll gärna i <b>SKU / PLU</b> om produkten ska kunna slås in med PLU-kod, och <b>EAN</b> om den ska kunna skannas.')],{pre:()=>{S.products=S.products.filter(p=>p.name!=='Vaniljglass');if(!S.groups.find(g=>g.name==='Glass'))S.groups.push({id:'g-glass',name:'Glass',vat:12,ledger:'3002',color:'#a4e4ff'});reset('catalog')()}});
T('bs-tillval','Produktkatalog','Skapa en tillvalsgrupp',[
 ...nav('catalog','modifiers'),
 {el:'bs-mod-add',d:'Tillval skapas i grupper, t.ex. Stekgrad eller Topping. Tryck <b>Skapa ny tillvalsgrupp</b>.',on:'bs:page:modform'},
 {el:'in-b_mname',d:'Skriv namnet <b>Topping</b>.',type:'Topping'},
 {el:'ck-b_mreq',d:'<b>Kräver val</b> tvingar fram ett val innan artikeln läggs i varukorgen. Toppingen är valfri, så låt rutan vara tom.',next:1},
 {el:'ck-b_mopen',d:'Bocka i <b>Öppna alltid detaljvyn</b> så visas tillvalen direkt när produkten säljs.',until:()=>isOn('b_mopen')},
 {el:'bs-modi-add',d:'Tryck <b>Lägg till tillval</b>.',on:'bs:side'},
 {el:'in-b_miname',d:'Skriv <b>Chokladsås</b>.',type:'Chokladsås'},
 {el:'in-b_miprice',d:'Pris inklusive moms: <b>5</b>. Ska tillvalet inte påverka priset anger du 0.',type:'5'},
 {el:'bs-modi-create',d:'Tryck <b>Skapa och lägg till ny</b>.',on:'bs:modi'},
 {el:'bs-modi-close',d:'Tryck <b>Stäng</b>.',on:'bs:sideclose'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:mod'},
 {el:'pick-x',sel:'#pos [data-g="mod-link"]',d:'Koppla gruppen till produkterna. Tryck <b>Koppla produkter</b>.',on:'bs:pick'},
 {el:'pick-glass',sel:()=>S.groups.find(g=>g.name==='Glass')?'#pos [data-g="pick-glass"]':'#pos [data-g="pick-bakverk"]',d:'Bocka i <b>Glass</b> (eller Bakverk).',on:'bs:pickg'},
 {el:'pick-add',d:'Tryck <b>Lägg till</b>.',on:'bs:picked'},
 done('När produkten säljs i kassan öppnas tillvalen. Du kan också koppla tillval från produktens flik <b>Tillval</b>.')],{pre:()=>{S.modifiers=S.modifiers.filter(m=>m.name!=='Topping');reset('catalog')()}});
T('bs-kampanj','Kampanjer och lojalitet','Skapa en kampanj',[
 top('promotions','Tryck <b>Kampanjer</b>.'),
 {el:'bs-promo-add',d:'Tryck <b>Skapa kampanj</b>. Kampanjen skapas i fem steg.',on:'bs:page:promo'},
 {el:'in-b_rname',d:'Ge kampanjen ett namn, t.ex. <b>Höstrea</b>.',type:'Höstrea'},
 {el:'rd-b_rtrig-auto',d:'<b>Automatisk kampanj</b> dras av automatiskt i kassan. Manuell kampanj aktiveras av kassören med en knapp. Välj <b>Automatisk</b>.',on:'bs:set:b_rtrig',fill:()=>A.bsrad('b_rtrig|auto')},
 {el:'bs-next',d:'Tryck <b>Kampanjregler</b>.',on:'bs:wiz:2'},
 {el:'rd-b_rtype-disc',d:'Välj typ. <b>Rabatt</b> ger rabatt i procent eller kronor. Fastpris, X för Y och Kombination fungerar på samma sätt.',on:'bs:set:b_rtype',fill:()=>A.bsrad('b_rtype|disc')},
 {el:'in-b_rval',d:'Skriv rabatten: <b>20</b> (procent).',type:'20'},
 {el:'bs-next',d:'Tryck <b>Lägg till produkter</b>.',on:'bs:wiz:3'},
 {el:'bs-promo-prods',d:'Tryck <b>Lägg till produkter</b> och välj vad kampanjen gäller.',on:'bs:pick'},
 {el:'pick-kaffebonor-muggar',d:'Bocka i gruppen <b>Kaffebönor &amp; muggar</b>.',on:'bs:pickg'},
 {el:'pick-add',d:'Tryck <b>Lägg till</b>.',on:'bs:picked'},
 {el:'bs-next',d:'Tryck <b>Schemalägg kampanj</b>.',on:'bs:wiz:4'},
 {el:'in-b_rfrom',d:'Kampanjen börjar idag. Lägg gärna in ett slutdatum eller begränsa till vissa tider och veckodagar.',next:1},
 {el:'bs-next',d:'Tryck <b>Se sammanfattning</b>.',on:'bs:wiz:5'},
 {el:'bs-next',d:'Kontrollera sammanfattningen och tryck <b>Skapa kampanj</b>.',on:'bs:save:promo'},
 {el:'promo-hostrea',d:'Kampanjen ligger överst och är aktiv. Reglaget stänger av den utan att ta bort den. Ordningen i listan är prioriteringen.',next:1},
 done('Byt till <b>Kassan</b> uppe till vänster och sälj en mugg: 20 % dras av automatiskt. Syns inte kampanjer alls slår du på <b>Stöd för kampanjer</b> under Handlare → Inställningar.')],{pre:()=>{S.promotions=S.promotions.filter(p=>p.name!=='Höstrea');reset()()}});
T('bs-personal','Personal och betalning','Lägg till personal',[
 ...nav('users','userlist','Under <b>INSTÄLLNINGAR</b>: gå till <b>Användare → Alla användare</b>.'),
 {el:'bs-user-add',d:'Tryck <b>Lägg till ny användare</b>.',on:'bs:page:userform'},
 {el:'dd-b_urole',d:'<b>Personal</b> jobbar i kassan, <b>Butikschef</b> har fler behörigheter och <b>Backstage-användare</b> loggar bara in här. Öppna listan.',on:'bs:dd:b_urole'},
 opt('b_urole','Personal','Välj <b>Personal</b>.'),
 {el:'in-b_ufirst',d:'Förnamn: <b>Sara</b>.',type:'Sara'},
 {el:'in-b_ulast',d:'Efternamn: <b>Berg</b>.',type:'Berg'},
 {el:'in-b_upin',d:'PIN-koden används i kassan för behörigheter och för att stämpla in. Skriv <b>4321</b>.',type:'4321'},
 {el:'in-b_uid',d:'<b>Personnummer</b> behövs för personalliggaren. Skriv <b>19900101-0000</b> (ett påhittat exempel).',type:'19900101-0000'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:user'},
 {el:'user-sara-berg',d:'Sara finns nu i listan. I kolumnen <b>Användarnamn</b> ser du namnet hon loggar in i kassan med.',next:1},
 done('Behörigheterna anpassar du genom att öppna användaren. Har någon glömt sitt lösenord trycker de <b>Glömt lösenord</b> på inloggningssidan.')],{pre:()=>{const d=D();d.users=d.users.filter(u=>u.first!=='Sara');S.cashiers=(S.cashiers||[]).filter(c=>c.name!=='Sara Berg');reset('users')()}});
T('bs-betalsatt','Personal och betalning','Lägg till ett betalsätt',[
 ...nav('payments','paymethods','Under <b>INSTÄLLNINGAR</b>: gå till <b>Betalningar → Betalsätt</b>.'),
 {t:'Betalsätten per butik',d:'Listan visar vilka betalsätt som finns i kassan i varje butik.',next:1},
 {el:'bs-pay-add',d:'Tryck <b>Lägg till nytt betalsätt</b>.',on:'bs:page:payform'},
 {el:'dd-b_mstore',d:'Öppna <b>Butik</b>.',on:'bs:dd:b_mstore'},
 opt('b_mstore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'dd-b_mpm',d:'Öppna <b>Betalsätt</b>. Kort och Swish Handel kräver avtal. <b>Fristående</b> är betalsätt som hanteras utanför kassan.',on:'bs:dd:b_mpm'},
 opt('b_mpm','Fristående','Välj <b>Fristående</b>.'),
 {el:'dd-b_mtype',d:'Öppna <b>Typ</b>.',on:'bs:dd:b_mtype'},
 opt('b_mtype','Lunchkupong','Välj <b>Lunchkupong</b>.'),
 {el:'ck-b_mtip',d:'Här styr du om betalsättet tillåter öppna returer och dricks. Låt dem vara.',next:1},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:pay'},
 done('Lunchkupong finns nu i kassan under <b>ALL PAYMENTS</b>. I kassan väljer du under <b>Min butik → Betalsätt</b> om den ska ha en snabbknapp.')],{pre:()=>{S.payments=S.payments.filter(p=>p.name!=='Lunchkupong');reset('payments')()}});
T('bs-zrapport','Rapporter och bokföring','Hämta en Z-rapport',[
 ...nav('reports','zreport'),
 {el:'zrow-0',d:'Här finns alla dagsavslut från kassorna. Tryck på den senaste.',on:'bs:zopen'},
 {el:'z-pdf',d:'Rapporten visar försäljning per grupp, moms och betalsätt. Tryck <b>Ladda ner PDF</b> för att spara den eller skicka till redovisningen.',on:'bs:zpdf'},
 done('Under <b>Rapporter</b> finns också periodrapport, SIE-fil och personalliggare.')],{pre:()=>{reset('reports')();if(!(S.zreports||[]).length)S.zreports=[{at:'2026-10-07 22:00',total:8420,count:131}]}});

/* ═════ Produktkatalog ═════ */
X('bs-varianter','Produktkatalog','Varianter',[
 {t:'Varianter',d:'Varianter samlar en artikel som finns i flera utföranden, t.ex. storlek eller färg. Alternativet måste skapas <b>innan</b> produkten.',next:1},
 ...nav('catalog','options'),
 {el:'bs-opt-add',d:'Tryck <b>Skapa alternativ</b>.',on:'bs:page:optform'},
 {el:'in-b_oname',d:'Namn: <b>Färg</b>.',type:'Färg'},
 {el:'in-b_oval0',d:'Första värdet: <b>Svart</b>.',type:'Svart'},
 {el:'opt-val-add',d:'Tryck <b>Lägg till värde</b>.',on:'bs:ovadd'},
 {el:'in-b_oval1',d:'Andra värdet: <b>Vit</b>.',type:'Vit'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:opt'},
 ...nav('catalog','products','Skapa produkten. Gå till <b>Produktkatalog → Produkter</b>.'),
 {el:'bs-prod-add',d:'Tryck <b>Lägg till produkter</b>.',on:'bs:page:prodform'},
 {el:'rd-b_ptype-var',d:'Välj <b>Produkt med varianter</b>.',on:'bs:set:b_ptype'},
 {el:'ck-x',sel:()=>{const o=D().options.find(x=>x.name==='Färg');return o?`#pos [data-g="ck-b_pv_${o.id}_svart"]`:'#pos [data-g="bs-save"]'},d:'Bocka i <b>Svart</b>.',until:()=>{const o=D().options.find(x=>x.name==='Färg');return o&&UI.f['b_pv_'+o.id+'_svart']}},
 {el:'ck-y',sel:()=>{const o=D().options.find(x=>x.name==='Färg');return o?`#pos [data-g="ck-b_pv_${o.id}_vit"]`:'#pos [data-g="bs-save"]'},d:'Bocka i <b>Vit</b>. Du kan välja alla värden eller bara några.',until:()=>{const o=D().options.find(x=>x.name==='Färg');return o&&UI.f['b_pv_'+o.id+'_vit']}},
 {el:'dd-b_pgid',d:'Öppna <b>Produktgrupp</b>.',on:'bs:dd:b_pgid'},
 opt('b_pgid','g-merch','Välj <b>Kaffebönor &amp; muggar</b>.'),
 {el:'in-b_pname',d:'Namn: <b>Termosmugg</b>.',type:'Termosmugg'},
 {el:'in-b_pprice',d:'Pris: <b>199</b>.',type:'199'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:product'},
 {el:'ptab-var',d:'Fliken <b>Varianter</b> har dykt upp. Där kan du sätta eget pris per variant. Lager per variant ställer du in under <b>Lager</b>.',next:1},
 done('I kassan väljer du variant när Termosmuggen läggs i varukorgen.')],{pre:()=>{D().options=D().options.filter(o=>o.name!=='Färg');S.products=S.products.filter(p=>p.name!=='Termosmugg');S.modifiers=S.modifiers.filter(m=>!(m.variant&&m.name==='Färg'));reset('catalog')()}});
X('bs-redigera','Produktkatalog','Ändra och ta bort produkter',[
 ...nav('catalog','products'),
 {el:'pedit-bryggkaffe',d:'Snabbast ändrar du direkt i listan. Tryck på <b>pennan</b> vid Bryggkaffe.',on:'bs:inline'},
 {el:'in-b_il_price',d:'Raden går nu att redigera: namn, pris, avhämtningspris och grupp. Ändra <b>Standardpris</b> till <b>34</b>.',type:'34'},
 {el:'il-take',d:'Bryggkaffe har inget eget avhämtningspris. Tryck <b>Lägg till pris</b>.',on:'bs:inline:take'},
 {el:'in-b_il_take',d:'Avhämtningspris: <b>34</b>. Det gäller när kassören väljer Avhämtning.',type:'34'},
 {el:'bs-save',d:'Tryck <b>Spara</b> längst ner.',on:'bs:save:inline'},
 {el:'pname-bryggkaffe',d:'Vill du ändra mer, som beskrivning, tillval eller lager: tryck på <b>produktnamnet</b>. Då öppnas hela produkten.',on:'bs:page:product'},
 ...nav('catalog','products','Ändra flera produkter samtidigt. Gå tillbaka till <b>Produkter</b>.').slice(1),
 {el:'psel-espresso',d:'Bocka i <b>Espresso</b>.',until:()=>(B().psel||[]).length>=1},
 {el:'psel-cortado',d:'Bocka i <b>Cortado</b>.',until:()=>(B().psel||[]).length>=2},
 {el:'bulk-edit',d:'Tryck <b>Redigera alla markerade</b>. Här ändrar du pris och produktgrupp för alla på en gång.',on:'bs:page:bulk'},
 {el:'in-b_bprice',d:'Nytt pris: <b>36</b>.',type:'36'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:bulk'},
 done('Under <b>⋮</b> på varje rad finns <b>Gå till produkt</b>, <b>Kopiera produkt</b> och <b>Radera produkt</b>. Ordningen i kassan ändrar du genom att välja grupp och dra produkterna.')],{pre:()=>{const p=n=>S.products.find(x=>x.name===n);p('Bryggkaffe').price=32;delete (D().priceLists[0]||{prices:{}}).prices[p('Bryggkaffe').id];p('Espresso').price=32;p('Cortado').price=42;B().psel=[];reset('catalog')()}});
X('bs-rekommendation','Produktkatalog','Rekommenderade produkter',[
 ...nav('catalog','products'),
 {el:'pname-cappuccino',d:'Tryck på namnet <b>Cappuccino</b> för att öppna produkten.',on:'bs:page:product'},
 {el:'ptab-rec',d:'Öppna fliken <b>Rekommendationer</b>.',on:'bs:tab:rec'},
 {el:'rec-add',d:'Tryck <b>Lägg till produkt</b>.',on:'bs:pick'},
 {el:'pick-x',sel:'#pos [data-g="pick-bakverk"] + button',d:'Öppna gruppen <b>Bakverk</b> med pilen.',until:()=>(B().pickOpen||[]).includes('g-bak')},
 {el:'pickp-kanelbulle',d:'Bocka i <b>Kanelbulle</b>.',on:'bs:pickp'},
 {el:'pick-add',d:'Tryck <b>Lägg till</b>.',on:'bs:picked'},
 done('När en Cappuccino läggs i varukorgen föreslår kassan en Kanelbulle. Ligger produkten redan i varukorgen trycker du på <b>glödlampan</b> för att se förslagen. Import/export tar inte med rekommendationer.')],{pre:()=>{const p=S.products.find(x=>x.name==='Cappuccino');p.recs=[];reset('catalog')()}});
X('bs-popup','Produktkatalog','Popup-meddelanden',[
 ...nav('catalog','popup'),
 {el:'pop-add',d:'Tryck <b>Lägg till popup-meddelande</b>.',on:'bs:page:popform'},
 {el:'in-b_ponm',d:'Namnet syns bara i listan. Skriv <b>Nötter</b>.',type:'Nötter'},
 {el:'in-b_potx',d:'Texten visas i kassan. Skriv <b>Fråga om kunden är allergisk mot nötter.</b>',type:'Fråga om kunden är allergisk mot nötter.'},
 {el:'ck-b_poonce',d:'Bocka i <b>Visa en gång per order</b>, annars visas den för varje produkt.',until:()=>isOn('b_poonce')},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:popup'},
 ...nav('catalog','products','Koppla meddelandet till en produktgrupp. Gå till <b>Produkter</b>.'),
 {el:'chip-bakverk',d:'Tryck på gruppen <b>BAKVERK</b>.',until:()=>B().fg==='g-bak'},
 {el:'grp-edit',d:'Tryck <b>Redigera gruppen</b> (pennan).',on:'bs:page:groupform'},
 {el:'tg-b_gpop',d:'Längst ner: slå på <b>Lägg till popup-meddelande</b>.',until:()=>isOn('b_gpop')},
 {el:'dd-b_gpopid',d:'Öppna listan.',on:'bs:dd:b_gpopid'},
 {el:'opt-x',sel:()=>{const p=D().popups.find(x=>x.name==='Nötter');return p?`#pos [data-g="opt-b_gpopid-${slug(p.id)}"]`:''},d:'Välj <b>Nötter</b>.',on:'bs:set:b_gpopid'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:group'},
 done('När ett bakverk säljs visar kassan meddelandet och kassören bekräftar innan försäljningen fortsätter. Passar t.ex. för ålderskontroll.')],{pre:()=>{D().popups=D().popups.filter(p=>p.name!=='Nötter');const g=S.groups.find(x=>x.id==='g-bak');if(g)g.popup=null;reset('catalog')()}});
X('bs-ingredienser','Produktkatalog','Ingredienser',[
 ...nav('catalog','ingredients'),
 {el:'ing-grp-add',d:'Skapa en ingrediensgrupp. Tryck <b>+</b> bredvid <b>Ingrediensgrupper</b>.',on:'bs:page:inggroup'},
 {el:'in-b_igname',d:'Namn: <b>Bröd</b>.',type:'Bröd'},
 {el:'dd-b_igcolor',d:'Öppna <b>Färg</b>.',on:'bs:dd:b_igcolor'},
 opt('b_igcolor','Sand','Välj <b>Sand</b>.'),
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:inggroup'},
 {el:'ing-add-new',d:'Tryck <b>Lägg till ny ingrediens</b>.',on:'bs:page:ingform'},
 {el:'dd-b_igid',d:'Öppna <b>Ingrediensgrupp</b>.',on:'bs:dd:b_igid'},
 {el:'opt-x',sel:()=>{const g=D().ingGroups.find(x=>x.name==='Bröd');return g?`#pos [data-g="opt-b_igid-${slug(g.id)}"]`:''},d:'Välj <b>Bröd</b>.',on:'bs:set:b_igid'},
 {el:'in-b_iname',d:'Namn: <b>Surdegsbröd</b>.',type:'Surdegsbröd'},
 {el:'dd-b_iunit',d:'Öppna <b>Enhet</b>.',on:'bs:dd:b_iunit'},
 opt('b_iunit','st','Välj <b>Styck (st)</b>.'),
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:ing'},
 ...nav('catalog','products','Koppla ingrediensen till en produkt. Gå till <b>Produkter</b>.'),
 {el:'pname-raksmorgas',d:'Tryck på namnet <b>Räksmörgås</b> för att öppna produkten.',on:'bs:page:product'},
 {el:'ptab-ing',d:'Öppna fliken <b>Ingredienser</b>.',on:'bs:tab:ing'},
 {el:'ing-add',d:'Tryck <b>Lägg till ingrediens</b>.',on:'bs:dlg:ing'},
 {el:'dd-b_iid',d:'Öppna listan.',on:'bs:dd:b_iid'},
 {el:'opt-x',sel:()=>{const i=D().ingredients.find(x=>x.name==='Surdegsbröd');return i?`#pos [data-g="opt-b_iid-${slug(i.id)}"]`:''},d:'Välj <b>Surdegsbröd</b>.',on:'bs:set:b_iid'},
 {el:'in-b_iqty',d:'Mängd: <b>1</b>.',type:'1'},
 {el:'ing-ok',d:'Tryck <b>Spara</b>.',on:'bs:ingok'},
 done('Varje såld räksmörgås drar nu en skiva surdegsbröd från lagret. Lager för ingrediensen ställer du in på ingrediensens flik <b>Lager</b>.')],{pre:()=>{const d=D();d.ingGroups=d.ingGroups.filter(g=>g.name!=='Bröd');d.ingredients=d.ingredients.filter(i=>i.name!=='Surdegsbröd');const p=S.products.find(x=>x.name==='Räksmörgås');if(p)p.ings=[];reset('catalog')()}});
X('bs-import','Produktkatalog','Import Wizard',[
 {t:'Import Wizard',d:'Har du en produktkatalog i ett annat kassasystem? Exportera den som Excel eller CSV och läs in den här.',next:1},
 ...nav('catalog','impexp'),
 {el:'rd-b_imm-wiz',d:'Välj <b>Product import wizard</b>.',on:'bs:set:b_imm'},
 {el:'imp-file',d:'Dra in filen eller klicka för att välja den.',on:'bs:impfile'},
 {el:'imp-next',d:'Tryck <b>Ladda upp</b>.',on:'bs:imp:1'},
 {t:'Filen analyseras',d:'AI-verktyget läser filen och matchar kolumnerna mot Yabies produktkatalog. Det tar längre tid ju fler produkter du har.',until:()=>B().imp>=2},
 {el:'dd-b_imc2',d:'Kontrollera matchningen. Här har guiden valt <b>Inköpspris</b> som pris, men kassan behöver försäljningspriset. Öppna listan.',on:'bs:dd:b_imc2'},
 opt('b_imc2','Utpris','Välj <b>Utpris</b>.'),
 {el:'imp-next',d:'Tryck <b>Importera</b>.',on:'bs:imp:3'},
 {el:'rd-b_imadd-add',d:'Granska förhandsvisningen. Välj <b>Lägg till i befintlig katalog</b> (Ersätt tar bort det som finns).',on:'bs:set:b_imadd',fill:()=>A.bsrad('b_imadd|add')},
 {el:'imp-next',d:'Tryck <b>Importera</b>.',on:'bs:imp:done'},
 done('Produkterna finns nu i katalogen. Under fliken <b>Historik</b> ser du tidigare importer.')],{pre:()=>{S.products=S.products.filter(p=>!['Chokladmuffin','Hallonbulle','Lingonlemonad'].includes(p.name));reset('catalog')()}});
X('bs-allergener','Produktkatalog','Allergener och specialkost',[
 ...nav('org','osettings','Slå först på funktionen. Gå till <b>Handlare → Inställningar</b>.'),
 {el:'set-allerg',d:'<b>Funktioner för allergener och specialkost</b> är redan PÅ. Är den av trycker du <b>Redigera</b> och slår på den.',next:1},
 ...nav('catalog','products'),
 {el:'pname-chokladboll',d:'Tryck på namnet <b>Chokladboll</b> för att öppna produkten.',on:'bs:page:product'},
 {el:'bs-allerg',d:'Skrolla ner och tryck <b>Lägg till allergener och specialkost</b>.',on:'bs:dlg:allerg'},
 {el:'ck-b_al_mjolk',d:'Bocka i <b>Mjölk</b>.',until:()=>isOn('b_al_mjolk')},
 {el:'ck-b_al_glutenfri',d:'Bocka i <b>Glutenfri</b> under Specialkost.',until:()=>isOn('b_al_glutenfri')},
 {el:'allerg-ok',d:'Tryck <b>Spara</b>.',on:'bs:allerg'},
 {el:'bs-save',d:'Tryck <b>Spara</b> på produkten.',on:'bs:save:product2'},
 done('Informationen syns i varukorgen, på KDS, bongar, kvitton och i orderhistoriken. Innehåller en produkt inget av allergenerna väljer du <b>Inga allergener</b>.')],{pre:()=>{const p=S.products.find(x=>x.name==='Chokladboll');if(p)p.allergy=[];reset('catalog','org')()}});
X('bs-plu','Produktkatalog','PLU, SKU och vågkoder',[
 ...nav('catalog','products'),
 {el:'pname-croissant',d:'Tryck på namnet <b>Croissant</b> för att öppna produkten.',on:'bs:page:product'},
 {el:'in-b_pplu',d:'Skrolla ner till <b>SKU / PLU</b> och skriv <b>205</b>. I kassan slår du 205 och trycker <b>Funktioner → PLU</b>.',type:'205'},
 {el:'in-b_pean',d:'Under <b>EAN/streckkod</b> anger du produktens streckkod så går den att skanna. För vägda varor från en våg (prefix 23–25) väljer du enheten Kilogram och anger produktens sexsiffriga EAN.',next:1},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:product2'},
 done('Saknas numpaden eller PLU-knappen i kassan: slå på <b>Visa numpad</b> under Min butik → Betalsätt och lägg till <b>PLU</b> under Min butik → Funktioner.')],{pre:reset('catalog')});
X('bs-prislista','Produktkatalog','Prislistor och moms för takeaway',[
 {t:'Takeaway-moms',d:'Livsmedel som tas med har 6 % moms (1 april 2026 – 31 december 2027). Med prislistan <b>Avhämtning</b> får produkterna rätt moms automatiskt när ordern markeras Ta med.',next:1},
 ...nav('catalog','pricelists'),
 {el:'pl-manage-pl-take',d:'Tryck <b>Hantera produkter</b> på <b>Avhämtning (moms 6%)</b>.',on:'bs:page:plprods'},
 {el:'dd-b_plg',d:'Filtrera på grupp. Öppna listan.',on:'bs:dd:b_plg'},
 opt('b_plg','g-bak','Välj <b>Bakverk</b>.'),
 {el:'pl-all',d:'Bocka i rutan i rubriken för att markera alla bakverk.',on:'bs:plsel'},
 {el:'pl-bulk',d:'Tryck <b>Redigera priser för valda</b>.',on:'bs:dlg:plp'},
 {el:'rd-b_plmode-std',d:'Välj <b>Använd standardpris</b>. Priset blir detsamma men momsen 6 %.',on:'bs:set:b_plmode'},
 {el:'pl-ok',d:'Tryck <b>Spara</b>.',on:'bs:plsave'},
 done('Prislistan är aktiv. I kassan: <b>Min butik → Produktkatalog → Hämta uppdaterad produktkatalog</b>. Behöver du ett eget bokföringskonto för 6 % lägger du till det under <b>Bokföring → Kontoplan</b>.')],{pre:()=>{const l=D().priceLists.find(x=>x.id==='pl-take');if(l)l.prices={};B().plsel=[];reset('catalog')()}});
X('bs-livsmedel','Produktkatalog','Momsregler för livsmedel',[
 ...nav('org','osettings'),
 {el:'set-edit-foodvat',d:'Under <b>Retailfunktioner</b>: tryck <b>Redigera</b> på <b>Momsregler för livsmedel</b>.',on:'bs:setdlg:foodvat'},
 {el:'ck-b_setstore',d:'Bocka i butiken.',until:()=>isOn('b_setstore',1)},
 {el:'set-save',d:'Tryck <b>Spara</b>.',on:'bs:setsave:foodvat'},
 ...nav('catalog','pricelists','Gå till <b>Produktkatalog → Prislistor</b>.'),
 {el:'pl-manage-pl-food',d:'Prislistan <b>Livsmedel</b> har skapats. Tryck <b>Hantera produkter</b> och markera produkterna som ska ha lägre moms, på samma sätt som för takeaway.',on:'bs:page:plprods'},
 done('När en produkt i prislistan säljs dras 6 % moms automatiskt. Max 100 produkter visas per sida, använd gruppfiltret.')],{pre:()=>{D().set.foodvat=false;D().priceLists=D().priceLists.filter(l=>l.id!=='pl-food');reset('catalog','org')()}});

/* ═════ Kampanjer och lojalitet ═════ */
X('bs-manuell','Kampanjer och lojalitet','Manuell kampanj',[
 top('promotions','Tryck <b>Kampanjer</b>.'),
 {el:'bs-promo-add',d:'Tryck <b>Skapa kampanj</b>.',on:'bs:page:promo'},
 {el:'in-b_rname',d:'Namn: <b>Studentrabatt</b>.',type:'Studentrabatt'},
 {el:'rd-b_rtrig-man',d:'Välj <b>Manuell kampanj</b>. Den passar när kassan inte kan kontrollera villkoret, t.ex. studentlegitimation.',on:'bs:set:b_rtrig'},
 {el:'bs-next',d:'Tryck <b>Kampanjregler</b>.',on:'bs:wiz:2'},
 {el:'in-b_rval',d:'Manuella kampanjer kan bara vara <b>Rabatt</b>. Skriv <b>10</b>.',type:'10'},
 {el:'bs-next',d:'Tryck <b>Lägg till produkter</b>.',on:'bs:wiz:3'},
 {el:'bs-promo-prods',d:'Tryck <b>Lägg till produkter</b>.',on:'bs:pick'},
 {el:'pick-kaffe',d:'Bocka i <b>Kaffe</b>.',on:'bs:pickg'},
 {el:'pick-add',d:'Tryck <b>Lägg till</b>.',on:'bs:picked'},
 {el:'bs-next',d:'Tryck <b>Schemalägg kampanj</b>.',on:'bs:wiz:4'},
 {el:'bs-next',d:'Tryck <b>Se sammanfattning</b>.',on:'bs:wiz:5'},
 {el:'bs-next',d:'Tryck <b>Skapa kampanj</b>.',on:'bs:save:promo'},
 done('Lägg sedan till knappen i kassan: <b>Redigera</b> → tom ruta → <b>Lägg till funktion → Kampanjer → Manuella kampanjer</b> → Studentrabatt. Kassören trycker på knappen vid köp.')],{pre:()=>{S.promotions=S.promotions.filter(p=>p.name!=='Studentrabatt');reset()()}});
X('bs-lojalitet','Kampanjer och lojalitet','Kom igång med Yabie Lojalitet',[
 ...nav('loyalty','lprog','Gå till <b>Lojalitet → Lojalitetsprogram</b>.'),
 {el:'loy-create',d:'Tryck <b>Skapa lojalitetsprogram</b>.',on:'bs:page:lprogedit'},
 {el:'in-b_lname',d:'Namn: <b>Kaffeklubben</b>.',type:'Kaffeklubben'},
 {el:'dd-b_lexp',d:'Ska poängen förfalla? Öppna <b>Tidsperiod</b>.',on:'bs:dd:b_lexp'},
 opt('b_lexp','12 månader','Välj <b>12 månader</b>. Poängen förfaller i slutet av månaden.'),
 {el:'tg-b_lask',d:'<b>Fråga alltid om medlemskap</b> gör att kassören får frågan vid varje köp. Slå på den.',until:()=>isOn('b_lask')},
 {el:'in-b_lrate',d:'<b>Tjäna poäng</b>: 1 poäng per krona är vanligast. Låt <b>1</b> stå.',next:1},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:loy'},
 {el:'bonus-add',d:'Skapa en bonus. Tryck <b>Skapa en bonus</b>.',on:'bs:dlg:bonus'},
 {el:'in-b_bpts',d:'Poängnivå: <b>500</b>.',type:'500'},
 {el:'in-b_bname',d:'Namn: <b>Bjuden kaffe</b>.',type:'Bjuden kaffe'},
 {el:'rd-b_btype-check',d:'<b>Bonuscheck</b> ger ett fast belopp i rabatt.',on:'bs:set:b_btype',fill:()=>A.bsrad('b_btype|check')},
 {el:'in-b_bval',d:'Rabatt: <b>35</b> kr.',type:'35'},
 {el:'bonus-save',d:'Tryck <b>Spara</b>.',on:'bs:save:bonus'},
 {el:'loy-qr',d:'Kunderna blir medlemmar via QR-koden. Tryck <b>QR-kod</b>.',on:'bs:dlg:qr'},
 {el:'qr-dl',d:'Tryck <b>Ladda ner</b> och sätt upp koden i butiken.',on:'bs:qrdl'},
 done('I kassan lägger du till knappen <b>Medlemsfunktioner</b> under Min butik → Funktioner. Programmet kan ha upp till 10 bonusar.')],{pre:()=>{D().loyalty=null;D().members=[];reset('loyalty')()}});
X('bs-medlem','Kampanjer och lojalitet','Medlemmar och poäng',[
 ...nav('loyalty','lmem'),
 {el:'mem-add',d:'Tryck <b>Lägg till ny medlem</b>.',on:'bs:dlg:mem'},
 {el:'in-b_mphone',d:'Mobilnumret är det enda som behövs. Skriv <b>+46701234567</b>.',type:'+46701234567'},
 {el:'mem-save',d:'Tryck <b>Spara</b>. Kunden får ett sms med en länk.',on:'bs:save:member'},
 {el:'mem-open-46701234567',d:'Öppna medlemmen.',on:'bs:dlg:memv'},
 {el:'in-b_mpts',d:'Du kan bara ändra poängen, övriga uppgifter ändrar medlemmen själv. Skriv <b>100</b>.',type:'100'},
 {el:'mem-pts',d:'Tryck <b>Spara</b>. Har kunden inte fått sms:et skickar du det igen med <b>Skicka inställningslänk</b>.',on:'bs:mempts'},
 done('Poäng dras proportionerligt vid returer. Poäng tjänas inte på presentkort, dricks eller serviceavgifter.')],{pre:()=>{const d=D();if(!d.loyalty)d.loyalty={name:'Kaffeklubben',expiry:'12 månader',ask:false,rate:1,min:0,bonuses:[]};d.members=d.members.filter(m=>m.phone!=='+46701234567');reset('loyalty')()}});
X('bs-impmedlem','Kampanjer och lojalitet','Importera medlemmar',[
 ...nav('loyalty','limp'),
 {el:'limp-tpl',d:'Ladda ner mallen. Telefonnummer (med landskod) är obligatoriskt, poäng är valfritt.',on:'bs:limptpl'},
 {el:'limp-file',d:'Fyll i mallen och dra in filen här.',on:'bs:limpfile'},
 {el:'limp-up',d:'Tryck <b>Ladda upp</b>.',on:'bs:limp'},
 done('Medlemmarna läggs in som <b>väntande</b>. De får inget välkomst-sms och kan använda poängen först när de har slutfört registreringen i butiken.')],{pre:()=>{const d=D();if(!d.loyalty)d.loyalty={name:'Kaffeklubben',expiry:'12 månader',ask:false,rate:1,min:0,bonuses:[]};d.members=d.members.filter(m=>!['+46701112233','+46702223344','+46703334455'].includes(m.phone));reset('loyalty')()}});
X('bs-medlemskomm','Kampanjer och lojalitet','Medlemskommunikation',[
 ...nav('loyalty','lseg','Segmenten delar upp medlemmarna. Gå till <b>Lojalitet → Segmentöversikt</b>.'),
 {el:'in-b_sginact',d:'<b>Inaktiva medlemmar</b> har inte handlat på ett tag. Ändra gränsen till <b>60</b> dagar.',type:'60'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:seg'},
 top('promotions','Skicka ett erbjudande. Tryck <b>Kampanjer</b>.'),
 {el:'bs-promo-add',d:'Tryck <b>Skapa kampanj</b>.',on:'bs:page:promo'},
 {el:'in-b_rname',d:'Namn: <b>Medlemsvecka</b>.',type:'Medlemsvecka'},
 {el:'rd-b_rtarget-loy',d:'Välj målgruppen <b>Lojalitetsmedlemmar</b>.',on:'bs:set:b_rtarget'},
 {el:'bs-next',d:'Tryck <b>Kampanjregler</b>.',on:'bs:wiz:2'},
 {el:'in-b_rval',d:'Rabatt: <b>15</b> %.',type:'15'},
 {el:'bs-next',d:'Tryck <b>Lägg till produkter</b>.',on:'bs:wiz:3'},
 {el:'bs-promo-prods',d:'Tryck <b>Lägg till produkter</b>.',on:'bs:pick'},
 {el:'pick-bakverk',d:'Bocka i <b>Bakverk</b>.',on:'bs:pickg'},
 {el:'pick-add',d:'Tryck <b>Lägg till</b>.',on:'bs:picked'},
 {el:'bs-next',d:'Tryck <b>Schemalägg kampanj</b>.',on:'bs:wiz:4'},
 {el:'bs-next',d:'Tryck <b>Se sammanfattning</b>.',on:'bs:wiz:5'},
 {el:'tg-b_rmsg',d:'Slå på <b>Lägg till meddelanden</b>.',until:()=>isOn('b_rmsg')},
 {el:'ck-b_rsms',d:'Välj kanal: bocka i <b>SMS</b>.',until:()=>isOn('b_rsms')},
 {el:'in-b_rmtxt',d:'Skriv meddelandet, t.ex. <b>Medlemsvecka! 15 % på alla bakverk.</b>',type:'Medlemsvecka! 15 % på alla bakverk.'},
 {el:'rd-b_rwhen-now',d:'Välj <b>Skicka meddelanden direkt</b> eller schemalägg till ett senare datum.',on:'bs:set:b_rwhen',fill:()=>A.bsrad('b_rwhen|now')},
 {el:'bs-next',d:'Tryck <b>Skapa kampanj</b>.',on:'bs:save:promo'},
 done('Meddelandet skickas med en kort fördröjning. Varje medlem får bara ett meddelande per händelse. Automatiska meddelanden när en bonus låses upp ställer du in på bonusen. SMS kostar 99 kr/mån.')],{pre:()=>{S.promotions=S.promotions.filter(p=>p.name!=='Medlemsvecka');const d=D();if(!d.loyalty)d.loyalty={name:'Kaffeklubben',expiry:'12 månader',ask:false,rate:1,min:0,bonuses:[]};reset('loyalty')()}});

/* ═════ Kök ═════ */
X('bs-bong','Kök','Bongutskrift och skrivarstationer',[
 {t:'Bongar till köket',d:'För att skriva ut bongar slår du på funktionen och skapar en <b>skrivarstation</b> som bestämmer vilka produkter som skrivs ut var.',next:1},
 ...nav('org','osettings','Under <b>INSTÄLLNINGAR</b>: gå till <b>Handlare → Inställningar</b>.'),
 {el:'set-edit-ticket',d:'Under <b>Bongfunktioner</b>: tryck <b>Redigera</b> på <b>Bongutskrifter</b>.',on:'bs:setdlg:ticket'},
 {el:'dd-b_tref',d:'Välj referens: löpnummer 1–999 eller fritext. Referensen står på både bong och kvitto. Öppna listan.',on:'bs:dd:b_tref'},
 opt('b_tref','Automatisk (1-999)','Välj <b>Automatisk (1-999)</b>.'),
 {el:'set-save',d:'Tryck <b>Spara</b>.',on:'bs:setsave:ticket'},
 ...nav('kitchen','stations'),
 {el:'bs-st-add',d:'Tryck <b>Lägg till station</b>.',on:'bs:page:stationform'},
 {el:'in-b_sname',d:'Namnge stationen <b>Bar</b>.',type:'Bar'},
 {el:'dd-b_sstore',d:'Öppna <b>Butik</b>.',on:'bs:dd:b_sstore'},
 opt('b_sstore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'bs-st-prods',d:'Tryck <b>Lägg till produkter</b>.',on:'bs:pick'},
 {el:'pick-kalla-drycker',d:'Bocka i <b>Kalla drycker</b>.',on:'bs:pickg'},
 {el:'pick-add',d:'Tryck <b>Lägg till</b>.',on:'bs:picked'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:station'},
 done('Stationen <b>Bar</b> finns nu i kassan under <b>Min butik → Skrivare</b>. Där väljer du vilken skrivare den skriver ut på.')],{pre:()=>{S.stations=(S.stations||[]).filter(s=>s.name!=='Bar');D().set.ticket=false;reset('org','kitchen')()}});
X('bs-kds','Kök','Köksdisplay',[
 ...nav('kitchen','kds'),
 {el:'kds-add',d:'Tryck <b>Lägg till köksdisplay</b>.',on:'bs:page:kdsform'},
 {el:'dd-b_kstore',d:'Välj butik. Öppna listan.',on:'bs:dd:b_kstore'},
 opt('b_kstore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'in-b_kname',d:'Namn: <b>Varmt</b>.',type:'Varmt'},
 {el:'kds-prods',d:'Tryck <b>Lägg till produkter</b>.',on:'bs:pick'},
 {el:'pick-smorgasar',d:'Bocka i <b>Smörgåsar</b>.',on:'bs:pickg'},
 {el:'pick-add',d:'Tryck <b>Lägg till</b>.',on:'bs:picked'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:kds'},
 done('Logga in i KDS-appen på köksskärmen och välj en ledig licens. Kugghjulet öppnar inställningarna. En skrivare på KDS kopplas med kabel eller LAN, inte via molnet.')],{pre:()=>{D().kds=D().kds.filter(k=>k.name!=='Varmt');reset('kitchen')()}});
X('bs-ratter','Kök','Rätter',[
 ...nav('org','osettings','Slå på funktionen. Gå till <b>Handlare → Inställningar</b>.'),
 {el:'set-edit-courses',d:'Tryck <b>Redigera</b> på <b>Hantering av rätter (Fram/Vänta)</b>.',on:'bs:setdlg:courses'},
 {el:'ck-b_setstore',d:'Bocka i butiken.',until:()=>isOn('b_setstore',1)},
 {el:'set-save',d:'Tryck <b>Spara</b>.',on:'bs:setsave:courses'},
 ...nav('kitchen','courses'),
 {el:'course-add',d:'Tryck <b>Skapa ny rätt</b>.',on:'bs:page:courseform'},
 {el:'in-b_cname',d:'Namn: <b>Varmrätt</b>.',type:'Varmrätt'},
 {el:'dd-b_cstore',d:'Välj var rätten ska finnas. Öppna <b>Plats</b>.',on:'bs:dd:b_cstore'},
 opt('b_cstore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'rd-b_cdef-wait',d:'Standardinställningen <b>Vänta</b> betyder att varmrätten hålls kvar tills kassören skickar den. Den är redan vald.',next:1},
 {el:'course-groups',d:'Tryck <b>Lägg till produktgrupper</b>.',on:'bs:pick'},
 {el:'pick-smorgasar',d:'Bocka i <b>Smörgåsar</b>.',on:'bs:pickg'},
 {el:'pick-add',d:'Tryck <b>Lägg till</b>.',on:'bs:picked'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:course'},
 done('I kassan visar varukorgen rätten med blå banderoll (Servera) eller röd (Vänta). På bordet trycker du <b>Servera Varmrätt</b> när det är dags. Slå gärna på bordskartor och bongskrivare också.')],{pre:()=>{D().set.courses=false;D().courses=D().courses.filter(c=>c.name!=='Varmrätt');reset('org','kitchen')()}});
X('bs-bordskarta','Kök','Bordskartor',[
 ...nav('kitchen','tableplans'),
 {el:'plan-add',d:'Tryck <b>Lägg till bordskarta</b>.',on:'bs:page:planedit'},
 {el:'in-b_plname',d:'Bordskartanamn: <b>Uteservering</b>.',type:'Uteservering'},
 {el:'dd-b_plstore',d:'Öppna <b>Butik</b>.',on:'bs:dd:b_plstore'},
 opt('b_plstore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'tp-grid',d:'Rutnätet är 8 rutor brett och 6 rutor högt, precis som bordskartan i kassan. Varje <b>+</b> är en plats där du kan skapa ett bord.',next:1},
 {el:'cell-0',d:'Tryck på <b>+</b> längst upp till vänster.',on:'bs:dlg:cell'},
 {el:'in-b_tname',d:'Namn: <b>Ute 1</b>.',type:'Ute 1'},
 {el:'dd-b_tcol',d:'Öppna <b>Färg</b>.',on:'bs:dd:b_tcol'},
 opt('b_tcol','Mint','Välj <b>Mint</b>.'),
 {el:'cell-ok',d:'Tryck <b>OK</b>.',on:'bs:table'},
 {el:'cell-2',d:'Skapa ett bord till. Tryck på <b>+</b> två rutor till höger.',on:'bs:dlg:cell'},
 {el:'in-b_tname',d:'Namn: <b>Ute 2</b>.',type:'Ute 2'},
 {el:'dd-b_tcol',d:'Öppna <b>Färg</b>.',on:'bs:dd:b_tcol'},
 opt('b_tcol','Mint','Välj <b>Mint</b>.'),
 {el:'cell-ok',d:'Tryck <b>OK</b>.',on:'bs:table'},
 {el:'pt-size-ute-2',d:'Ett större bord gör du genom att dra i hörnet längst ner till höger. Prova gärna. Håller du i bordet och drar flyttar du det till en annan ruta.',next:1},
 {el:'pt-edit-ute-1',d:'Pennan öppnar <b>Redigera bord</b>, där du byter namn och färg eller bockar i <b>Ta bort bord</b>.',next:1},
 {el:'dd-b_plview',d:'Under <b>Visa som</b> kan du byta till <b>Lista</b>. Där drar du borden i den ordning de ska visas i kassans bordslista.',next:1},
 {el:'bs-save',d:'Tryck <b>Spara</b>. Pilen bredvid har <b>Spara och stäng</b>.',on:'bs:save:plan'},
 done('Bordskartan finns nu i kassan under <b>Parkerat</b>. Funktionen kräver att <b>parkera ordrar</b> och <b>bordskartor</b> är på under Handlare → Inställningar. Undvik att ändra bordskartor medan det finns öppna bord.')],{pre:()=>{S.plans=(S.plans||[]).filter(p=>p.name!=='Uteservering');reset('kitchen')()}});
X('bs-bongko','Kök','Bongkö',[
 ...nav('org','osettings'),
 {el:'set-edit-queue',d:'Bongkö samlar flera ordrar på en bong så att allt tillagas samtidigt. Tryck <b>Redigera</b> på <b>Funktion för bongkö</b>.',on:'bs:setdlg:queue'},
 {el:'ck-b_setstore',d:'Bocka i butiken.',until:()=>isOn('b_setstore',1)},
 {el:'set-save',d:'Tryck <b>Spara</b>.',on:'bs:setsave:queue'},
 done('I kassan lägger du till funktionsknappen för bongkö, trycker <b>Starta bongkö</b>, tar alla beställningar och trycker <b>Skicka bong</b>.')],{pre:()=>{D().set.queue=false;reset('org')()}});

/* ═════ Betalning ═════ */
X('bs-swish','Personal och betalning','Swish',[
 {t:'Swish Företag eller Swish Handel',d:'<b>Swish Företag</b>: kunden swishar manuellt till ett nummer, utan koppling till kassan. <b>Swish Handel</b>: betalningen kopplas till kassan och returer görs automatiskt. Osäker? Fråga banken.',next:1},
 ...nav('payments','paymethods'),
 {el:'bs-pay-add',d:'Tryck <b>Lägg till nytt betalsätt</b>.',on:'bs:page:payform'},
 {el:'dd-b_mstore',d:'Öppna <b>Butik</b>.',on:'bs:dd:b_mstore'},
 opt('b_mstore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'dd-b_mpm',d:'Öppna <b>Betalsätt</b>.',on:'bs:dd:b_mpm'},
 opt('b_mpm','Swish Handel','Välj <b>Swish Handel</b>. (För Swish Företag väljer du Fristående → Swish Företag.)'),
 {el:'in-b_mswish',d:'Skriv ert <b>Swish-nummer</b>: <b>1231234567</b>.',type:'1231234567'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:pay'},
 done('Ansöker du om Swish Handel hos banken anger du teknisk leverantör <b>Yabie AB</b>, leverantörs-ID <b>9873490750</b>. Med Swish Företag gör du returen i Yabie och betalar tillbaka själv.')],{pre:()=>{const p=S.payments.find(x=>x.id==='swish');if(p)delete p.swishNo;reset('payments')()}});
X('bs-presentkort','Personal och betalning','Yabie presentkort',[
 ...nav('payments','paymethods'),
 {el:'bs-pay-add',d:'Lägg först till betalsättet. Tryck <b>Lägg till nytt betalsätt</b>.',on:'bs:page:payform'},
 {el:'dd-b_mstore',d:'Öppna <b>Butik</b>.',on:'bs:dd:b_mstore'},
 opt('b_mstore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'dd-b_mpm',d:'Öppna <b>Betalsätt</b>.',on:'bs:dd:b_mpm'},
 opt('b_mpm','Yabie Presentkort','Välj <b>Yabie Presentkort</b>.'),
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:pay'},
 ...nav('gift','gtemp'),
 {el:'gt-add',d:'Tryck <b>Lägg till ny Yabie presentkortsmall</b>.',on:'bs:page:gtform'},
 {el:'in-b_gtname',d:'Namn: <b>Presentkort 200 kr</b>.',type:'Presentkort 200 kr'},
 {el:'dd-b_gtvalid',d:'Öppna <b>Giltighetstid</b>.',on:'bs:dd:b_gtvalid'},
 opt('b_gtvalid','2','Välj <b>2 år</b>.'),
 {el:'rd-b_gtamt-fixed',d:'Under <b>Pristyp</b>: välj <b>Fast pris</b>. Med Öppet pris anger kassören beloppet vid försäljningen.',on:'bs:set:b_gtamt'},
 {el:'in-b_gtval',d:'Pris inkl. moms: <b>200</b>.',type:'200'},
 {el:'in-b_gtdebt',d:'<b>Skuldkonto</b> (2420) och <b>Intäktskonto</b> (3690) är förifyllda. Kontrollera dem med din redovisningskonsult.',next:1},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:gt'},
 done('Produktgruppen <b>Presentkort</b> har skapats i kassan. Vid försäljning väljer kassören kodtyp (automatisk eller egen kod för fysiska kort) och leverans via SMS, e-post eller utskrift. Syns inte mallen: synkronisera produktkatalogen i kassan.')],{pre:()=>{D().gtemps=D().gtemps.filter(t=>t.name!=='Presentkort 200 kr');S.products=S.products.filter(p=>p.name!=='Presentkort 200 kr');reset('payments','gift')()}});
X('bs-dricks','Personal och betalning','Dricks',[
 ...nav('org','osettings'),
 {el:'set-edit-tips',d:'Under <b>Mat- och dryck funktioner</b>: tryck <b>Redigera</b> på <b>Dricksfunktion i appen</b>.',on:'bs:setdlg:tips'},
 {el:'ck-b_setstore',d:'Bocka i butiken.',until:()=>isOn('b_setstore',1)},
 {el:'set-save',d:'Tryck <b>Spara</b>.',on:'bs:setsave:tips'},
 ...nav('payments','paymethods','Slå på dricks per betalsätt. Gå till <b>Betalningar → Betalsätt</b>.'),
 {el:'pm-open-kontokort-swedbank-pax',d:'Öppna <b>Kontokort</b>.',on:'bs:page:payedit'},
 {el:'ck-b_ptip',d:'Kontrollera att <b>Dricks kan ges med denna betalmetod</b> är ibockad.',until:()=>isOn('b_ptip',1)},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:payedit'},
 done('Dricks i kortterminalen ställer support in. Använder du integrerad terminal med dricks: låt dricks alltid vara på i kassan (Fler val → Dricks).')],{pre:()=>{D().set.tips=false;reset('org','payments')()}});

/* ═════ Lager ═════ */
X('bs-lager','Lager','Lagerhantering av produkter',[
 ...nav('catalog','products'),
 {el:'pname-kaffebonor-500-g',d:'Tryck på namnet <b>Kaffebönor 500 g</b> för att öppna produkten.',on:'bs:page:product'},
 {el:'ptab-stock',d:'Öppna fliken <b>Lager</b>.',on:'bs:tab:stock'},
 {el:'stock-on',d:'Tryck <b>Aktivera lagerhantering</b>.',on:'bs:stockon'},
 {el:'stock-edit',d:'Tryck <b>Redigera</b> för att uppdatera lagersaldot.',on:'bs:dlg:stock'},
 {el:'in-b_sqty',d:'Nytt lagersaldo: <b>24</b>.',type:'24'},
 {el:'dd-b_swho',d:'Välj personal. Öppna listan.',on:'bs:dd:b_swho'},
 opt('b_swho','Anna Ägare','Välj <b>Anna Ägare</b>.'),
 {el:'dd-b_swhy',d:'Välj anledning.',on:'bs:dd:b_swhy'},
 opt('b_swhy','Leverans','Välj <b>Leverans</b>.'),
 {el:'stock-save',d:'Tryck <b>Spara</b>.',on:'bs:stocksave'},
 {el:'tg-b_slow',d:'Slå på <b>Lågt lagersaldo</b> så varnar kassan när det börjar ta slut.',until:()=>isOn('b_slow')},
 {el:'in-b_slimit',d:'Gräns: <b>5</b>.',type:'5'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:product2'},
 done('Saldot minskar för varje såld påse. Vill du få mejl när gränsen nås ställer du in det under <b>Rapporter → Inställningar</b>.')],{pre:()=>{const p=S.products.find(x=>x.name==='Kaffebönor 500 g');if(p)delete p.stock;reset('catalog')()}});
X('bs-lagsaldo','Lager','Mejl om lågt lagersaldo',[
 ...nav('reports','rset'),
 {el:'ck-b_rs_low',d:'Längst ner finns <b>Lågt lagersaldo</b>. Bocka i <b>Skapa automatiskt</b>.',until:()=>isOn('b_rs_low')},
 {el:'in-b_rst_low',d:'Klockslag: <b>07:00</b>.',type:'07:00'},
 {el:'dd-b_rsf_low',d:'Hur ofta? Öppna listan.',on:'bs:dd:b_rsf_low'},
 opt('b_rsf_low','Dagligen','Välj <b>Dagligen</b>.'),
 {el:'dd-b_rslstore',d:'Välj butik.',on:'bs:dd:b_rslstore'},
 opt('b_rslstore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'in-b_rsmail',d:'Under <b>Mottagare</b>, e-post: <b>lager@kaffebaren.se</b>.',type:'lager@kaffebaren.se'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:rset'},
 done('Mejlet listar produkterna som nått gränsen med saldo och en CSV-fil. Gränsen ställer du in per produkt under fliken Lager.')],{pre:()=>{const r=D().reportSet;r.low=false;if(r.rep)delete r.rep.low;reset('reports')()}});
X('bs-lagerplatser','Lager','Lagerplatser',[
 ...nav('stock','sloc'),
 {el:'loc-tg-kaffebaren',d:'Här slår du av och på lagerhanteringen per butik, t.ex. av för en tillfällig pop up-butik. Låt Kaffebaren vara på.',next:1},
 ...nav('locations','wh','Lager utanför butikerna lägger du till under <b>Platser → Lagerplatser</b>.'),
 {el:'wh-add',d:'Tryck <b>Lägg till ny lagerplats</b>.',on:'bs:dlg:wh'},
 {el:'in-b_whname',d:'Namn: <b>Förråd</b>.',type:'Förråd'},
 {el:'wh-save',d:'Tryck <b>Spara</b>.',on:'bs:save:wh'},
 done('Lagerplatsen kan nu användas i lagerförflyttningar och inventeringar.')],{pre:()=>{D().locations=D().locations.filter(l=>l.name!=='Förråd');reset('stock','locations')()}});
const stockPre=()=>{['Kaffebönor 500 g','Mugg'].forEach((n,i)=>{const p=S.products.find(x=>x.name===n);if(p&&!p.stock)p.stock={qty:[24,12][i],low:false,limit:0,log:[]}})};
X('bs-inventering','Lager','Inventering',[
 ...nav('stock','stake'),
 {el:'stake-add',d:'Tryck <b>Ny inventering</b>.',on:'bs:page:stakenew'},
 {el:'in-b_stname',d:'Namn: <b>Årsinventering</b>.',type:'Årsinventering'},
 {el:'dd-b_stwho',d:'Välj vem som räknar.',on:'bs:dd:b_stwho'},
 opt('b_stwho','Kim Karlsson','Välj <b>Kim Karlsson</b>.'),
 {el:'dd-b_stloc',d:'Välj plats.',on:'bs:dd:b_stloc'},
 opt('b_stloc','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'rd-b_stscope-full',d:'<b>Fullständig inventering</b> tar med alla produkter med lagerhantering. Delvis räknar bara det du väljer.',on:'bs:set:b_stscope',fill:()=>A.bsrad('b_stscope|full')},
 {el:'stake-create',d:'Tryck <b>Skapa lagerinventering</b>.',on:'bs:stake:create'},
 {el:'count-kaffebonor-500-g',d:'Tryck <b>Räkna artikel</b> på Kaffebönor.',on:'bs:dlg:count'},
 {el:'in-b_cnt',d:'Det står 24 i systemet men du räknar <b>22</b>.',type:'22'},
 {el:'dd-b_cwhy',d:'Antalet skiljer sig, så du måste ange en anledning. Öppna listan.',on:'bs:dd:b_cwhy'},
 opt('b_cwhy','Svinn','Välj <b>Svinn</b>.'),
 {el:'count-ok',d:'Tryck <b>Spara</b>.',on:'bs:count'},
 {el:'count-mugg',d:'Räkna <b>Mugg</b>.',on:'bs:dlg:count'},
 {el:'in-b_cnt',d:'Skriv <b>12</b>.',type:'12'},
 {el:'count-ok',d:'Tryck <b>Spara</b>.',on:'bs:count'},
 {el:'stake-done',d:'Alla är räknade. Tryck <b>Slutför inventering</b>. (Med <b>Stäng</b> sparas den som Påbörjad.)',on:'bs:stake:done'},
 {el:'stake-rep-0',d:'Öppna <b>Lagerrapport</b> för inventeringen.',on:'bs:dlg:srep'},
 done('Rapporten visar avvikelserna. Inventering kan också göras med appen Yabie Companion och skanner.')],{pre:()=>{stockPre();D().stockTakes=D().stockTakes.filter(s=>s.name!=='Årsinventering');reset('stock')()}});
X('bs-forflyttning','Lager','Lagerförflyttning och leveranser',[
 ...nav('stock','smove'),
 {el:'smove-add',d:'Tryck <b>Ny lagerförflyttning</b>.',on:'bs:page:smovenew'},
 {el:'dd-b_mvfrom',d:'Från: öppna listan.',on:'bs:dd:b_mvfrom'},
 opt('b_mvfrom','Lager Ulvsunda','Välj <b>Lager Ulvsunda</b>.'),
 {el:'dd-b_mvto',d:'Till: öppna listan.',on:'bs:dd:b_mvto'},
 opt('b_mvto','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'dd-b_mvwho',d:'Vem skapar förflyttningen?',on:'bs:dd:b_mvwho'},
 opt('b_mvwho','Kim Karlsson','Välj <b>Kim Karlsson</b>.'),
 {el:'dd-b_mvwhy',d:'Anledning?',on:'bs:dd:b_mvwhy'},
 opt('b_mvwhy','Påfyllning','Välj <b>Påfyllning</b>.'),
 {el:'dd-b_mvpid',d:'Välj produkt.',on:'bs:dd:b_mvpid'},
 {el:'opt-x',sel:()=>{const p=S.products.find(x=>x.name==='Mugg');return `#pos [data-g="opt-b_mvpid-${slug(p.id)}"]`},d:'Välj <b>Mugg</b>.',on:'bs:set:b_mvpid'},
 {el:'in-b_mvqty',d:'Antal: <b>6</b>.',type:'6'},
 {el:'mv-add',d:'Tryck <b>Lägg till</b>.',on:'bs:mvadd'},
 {el:'mv-review',d:'Tryck <b>Granska</b>.',on:'bs:mvreview'},
 {el:'mv-finish',d:'Stämmer allt? Tryck <b>Slutför lagerförflyttning</b>.',on:'bs:move:create'},
 {el:'move-dots-0',d:'Förflyttningen har status <b>Pågående</b>. När varorna har kommit fram trycker du på de tre prickarna.',on:'bs:dlg:movem'},
 {el:'move-done',d:'Tryck <b>Markera som färdig</b>. Saldot uppdateras i butiken.',on:'bs:move:done'},
 ...nav('stock','srec','Leveransen syns nu under <b>Lagerhantering → Leveranser</b>.'),
 done('I appen Yabie Companion tar butiken emot leveransen under <b>Ta emot</b>.')],{pre:()=>{stockPre();D().transfers=[];reset('stock')()}});
X('bs-lagerrapporter','Lager','Lagerrapporter',[
 ...nav('stock','srep'),
 {el:'srep-low',d:'Tryck <b>Lågt lagersaldo</b> för att se vad som behöver beställas.',on:'bs:srep:low'},
 {el:'srep-level',d:'<b>Lagernivå</b> visar antal, inköpspris och lagervärde. Tryck på den.',on:'bs:srep:level'},
 {el:'srep-export',d:'Alla rapporter kan exporteras. Tryck <b>Exportera</b>.',on:'bs:export'},
 done('Lageravvikelse visar skillnaderna från inventeringar och Lagerändringar alla justeringar och förflyttningar.')],{pre:()=>{stockPre();reset('stock')()}});

/* ═════ Personal ═════ */
X('bs-behorighet','Personal och betalning','Behörigheter och PIN-längd',[
 ...nav('users','userlist'),
 {el:'user-open-bea-barista',d:'Öppna <b>Bea Barista</b>.',on:'bs:page:user'},
 {el:'tg-b_pm_disc',d:'Ge Bea behörighet att <b>Ge rabatter</b> utan att en chef behöver ange PIN.',until:()=>isOn('b_pm_disc')},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:perms'},
 ...nav('org','osettings','PIN-längden ställer du in under <b>Handlare → Inställningar</b>.'),
 {el:'set-edit-pinlen',d:'Tryck <b>Redigera</b> på <b>Längd på användar-PIN</b>.',on:'bs:setdlg:pinlen'},
 {el:'rd-b_pinl-flex',d:'Välj <b>Flexibel PIN-längd</b>: alla väljer själva 4–10 siffror. Fast längd betyder samma längd för alla.',on:'bs:set:b_pinl'},
 {el:'set-save',d:'Tryck <b>Spara</b>.',on:'bs:setsave:pinlen'},
 done('En användare utan behörighet ser alla inställningar i kassan, men måste ange PIN-koden för någon som har behörighet.')],{pre:()=>{D().set.pinlen='fixed';const u=D().users.find(x=>x.first==='Bea');if(u)u.perms={};reset('users','org')()}});
X('bs-personalliggare','Personal och betalning','Personalliggare',[
 ...nav('time','tshifts'),
 {t:'Personalliggaren',d:'Här ser du när personalen stämplat in och ut i kassan. Skatteverket kan begära att se den vid kontrollbesök.',next:1},
 {el:'shift-add',d:'Har någon glömt att stämpla in? Tryck <b>Lägg till skift</b>.',on:'bs:dlg:shift'},
 {el:'dd-b_shwho',d:'Välj anställd.',on:'bs:dd:b_shwho'},
 opt('b_shwho','Kim Karlsson','Välj <b>Kim Karlsson</b>.'),
 {el:'shift-save',d:'Kontrollera tiderna och tryck <b>Spara</b>.',on:'bs:save:shift'},
 {el:'shift-edit-1',d:'Glömt att stämpla ut? Tryck på pennan för att rätta skiftet.',on:'bs:dlg:shift'},
 {el:'shift-save',d:'Ändra tiden och tryck <b>Spara</b>.',on:'bs:save:shift'},
 done('I kassan lägger du till knappen <b>Personalliggare</b> under Min butik → Funktioner. Personalen stämplar med sin PIN-kod.')],{pre:()=>{D().shifts=[{who:'Bea Barista',in:new Date().toISOString().slice(0,10)+' 07:58',out:new Date().toISOString().slice(0,10)+' 16:05'}];reset('time')()}});

/* ═════ Rapporter och bokföring ═════ */
X('bs-periodrapport','Rapporter och bokföring','Periodrapport',[
 ...nav('reports','periodic'),
 {el:'dd-b_prstore',d:'Öppna <b>Välj butik</b>.',on:'bs:dd:b_prstore'},
 opt('b_prstore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'in-b_prfrom',d:'Från: <b>2026-10-01</b>.',type:'2026-10-01'},
 {el:'in-b_prto',d:'Till: <b>2026-10-11</b>.',type:'2026-10-11'},
 {el:'in-b_prmail',d:'E-post: <b>ekonomi@kaffebaren.se</b>.',type:'ekonomi@kaffebaren.se'},
 {el:'period-send',d:'Tryck <b>Skicka rapport</b>.',on:'bs:periodic'},
 done('Periodrapporten kan också tas ut i kassan under Min butik → Rapporter.')],{pre:reset('reports')});
X('bs-sie','Rapporter och bokföring','SIE-fil till bokföringen',[
 ...nav('reports','sie'),
 {el:'tab-sie-auto',d:'Under <b>Autogenererade SIE-filer</b> skapas en fil automatiskt för varje Z-rapport.',next:1},
 {el:'tab-sie-exp',d:'Vill du ta ut en egen period: tryck fliken <b>SIE Export</b>.',on:'bs:tab:exp'},
 {el:'dd-b_siestore',d:'Öppna <b>Välj butik</b>.',on:'bs:dd:b_siestore'},
 opt('b_siestore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'in-b_siefrom',d:'Från: <b>2026-09-01</b>.',type:'2026-09-01'},
 {el:'in-b_sieto',d:'Till: <b>2026-09-30</b>.',type:'2026-09-30'},
 {el:'sie-export',d:'Tryck <b>Ladda ner rapport</b> och läs in filen i bokföringsprogrammet.',on:'bs:sie'},
 done('Kontona i SIE-filen ställer du in under <b>Bokföring → Kontoplan</b>.')],{pre:reset('reports')});
X('bs-autorapport','Rapporter och bokföring','Automatiska rapporter',[
 ...nav('reports','rset'),
 {el:'rs-z',d:'Varje rapporttyp har en egen ruta. Z-rapporten skapas redan automatiskt vid dagens slut.',next:1},
 {el:'ck-b_rs_det',d:'Under <b>Detaljerade försäljningsrapporter</b>: bocka i <b>Skapa automatiskt</b>.',until:()=>isOn('b_rs_det')},
 {el:'in-b_rst_det',d:'Klockslag: <b>16:00</b>.',type:'16:00'},
 {el:'dd-b_rsf_det',d:'Hur ofta? Öppna listan.',on:'bs:dd:b_rsf_det'},
 opt('b_rsf_det','Veckovis','Välj <b>Veckovis</b>.'),
 {el:'ck-b_rss_det',d:'Bocka i <b>Skicka automatiskt</b> så mejlas rapporten.',until:()=>isOn('b_rss_det')},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:rset'},
 done('Rapporterna mejlas nu automatiskt.')],{pre:()=>{const r=D().reportSet;r.rep=r.rep||{};delete r.rep.det;reset('reports')()}});
X('bs-kontoplan','Rapporter och bokföring','Kontoplan',[
 ...nav('book','coa'),
 {el:'tab-coa-vat',d:'Kontoplanen har tre flikar. Öppna <b>Momsgrupper</b>.',on:'bs:tab:vat'},
 {el:'tab-coa-grp',d:'Öppna <b>Produktgrupper</b>.',on:'bs:tab:grp'},
 {el:'coa-plus-bakverk',d:'Säljer du bakverk med 6 % moms via prislistan Avhämtning behöver försäljningen ett eget konto. Tryck <b>+</b> vid Bakverk.',on:'bs:dlg:coa'},
 {el:'dd-b_coavat',d:'Välj momsgrupp.',on:'bs:dd:b_coavat'},
 opt('b_coavat','6','Välj <b>6 %</b>.'),
 {el:'in-b_coaacc',d:'Konto: <b>3003</b>.',type:'3003'},
 {el:'coa-save',d:'Tryck <b>Spara</b>.',on:'bs:save:coa'},
 done('Kontrollera kontona med din redovisningskonsult. Fel konto ger felet <b>Ogiltigt konto</b> i Fortnox.')],{pre:()=>{D().accounts.extra={};reset('book')()}});
X('bs-fortnox','Rapporter och bokföring','Fortnox',[
 top('integrations','Tryck <b>Integrationer</b>.'),
 {el:'integ-fortnox',d:'Välj <b>Fortnox</b>.',on:'bs:page:fortnox'},
 {el:'in-b_fxmail',d:'Ange e-post för felmeddelanden: <b>ekonomi@kaffebaren.se</b>.',type:'ekonomi@kaffebaren.se'},
 {el:'fx-code',d:'Tryck <b>Hämta behörighetskod</b>. Du loggar in i Fortnox och godkänner.',on:'bs:fxcode'},
 {el:'fx-next',d:'Tryck <b>Nästa</b>.',on:'bs:fx:2'},
 {el:'dd-b_fxser',d:'Välj verifikationsserie för butiken.',on:'bs:dd:b_fxser'},
 opt('b_fxser','K','Välj <b>K</b>. Kostnadsställe är valfritt.'),
 {el:'fx-next',d:'Tryck <b>Nästa</b>.',on:'bs:fx:3'},
 {el:'fx-next',d:'Manuell synkronisering av historik är valfritt. Tryck <b>Nästa</b>.',on:'bs:fx:4'},
 done('Fortnox behöver modulerna Bokföring, Integration och Arkivplats. Fel ser du under <b>Synkningshistorik</b>. Verifikationsserien måste vara markerad med Manuell kontering i Fortnox.')],{pre:()=>{delete D().integ.fortnox;reset()()}});

/* ═════ Hårdvara och online ═════ */
X('bs-starcloud','Hårdvara och online','Star Cloud-skrivare',[
 {t:'Bongskrivare via molnet',d:'I appen Star Quick Setup Utility: <b>Printer Settings → Star CloudPRNT Settings</b>, slå på CloudPRNT Service, ange serveradressen från Yabies supportsida och sätt Polling Time till 1 sekund.',next:1},
 ...nav('hw','starcloud'),
 {el:'cloud-add',d:'Tryck <b>Lägg till skrivare</b>.',on:'bs:dlg:cloud'},
 {el:'dd-b_clstore',d:'Välj butik.',on:'bs:dd:b_clstore'},
 opt('b_clstore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'in-b_clname',d:'Namn: <b>Kök</b>.',type:'Kök'},
 {el:'in-b_clmac',d:'MAC-adressen står i appen eller på ett Self Test-kvitto. Skriv <b>00:11:62:2a:4f:10</b>.',type:'00:11:62:2a:4f:10'},
 {el:'cloud-save',d:'Tryck <b>Spara</b>.',on:'bs:save:cloud'},
 done('I kassan: <b>Min butik → Skrivare</b>, välj stationen och skrivaren och skriv ut ett testkvitto.')],{pre:()=>{D().cloud=[];reset('hw')()}});
X('bs-kunddisplay','Hårdvara och online','Bild på kunddisplayen',[
 ...nav('hw','custdisp'),
 {el:'cd-add',d:'Tryck <b>Lägg till kunddisplaybild</b>.',on:'bs:dlg:cd'},
 {el:'dd-b_cdstore',d:'Öppna <b>Butik</b>.',on:'bs:dd:b_cdstore'},
 opt('b_cdstore','Kaffebaren','Välj <b>Kaffebaren</b>.'),
 {el:'cd-img',d:'Klicka i rutan för att välja en bild.',on:'bs:cdimg'},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:cd'},
 done('Bilden visas på kunddisplayen när ingen order pågår. Själva displayen kopplar du i kassan under Min butik → Kunddisplay.')],{pre:()=>{D().cdImg=false;reset('hw')()}});
X('bs-online','Hårdvara och online','Yabie Online',[
 ...nav('locations','ostores'),
 {el:'ostore-edit',d:'Tryck <b>Redigera</b> på onlinebutiken.',on:'bs:page:ostore'},
 {el:'os-qr',d:'Ladda ner butikens QR-kod. Gästerna skannar den och väljer Ta med eller Äta här.',on:'bs:qrdl'},
 {el:'in-b_osmail',d:'E-post för kundkontakt: <b>info@kaffebaren.se</b>.',type:'info@kaffebaren.se'},
 {el:'rd-b_osmeth-both',d:'Välj beställningsmetod: <b>Ta med och Äta här</b>.',on:'bs:set:b_osmeth',fill:()=>A.bsrad('b_osmeth|both')},
 {el:'bs-save',d:'Tryck <b>Spara</b>.',on:'bs:save:os'},
 {el:'tab-os-tables',d:'Öppna fliken <b>Bordshantering</b>.',on:'bs:tab:tables'},
 {el:'os-sec-add',d:'Tryck <b>Skapa en ny bordssektion</b>.',on:'bs:dlg:ossec'},
 {el:'in-b_ossname',d:'Namn: <b>Matsalen</b>.',type:'Matsalen'},
 {el:'in-b_osstables',d:'Bord: <b>Bord 1, Bord 2, Bord 3</b>.',type:'Bord 1, Bord 2, Bord 3'},
 {el:'os-sec-save',d:'Tryck <b>Spara</b>.',on:'bs:save:ossec'},
 done('Varje bord har en egen QR-kod (A6-mall) så kopplas beställningen automatiskt till bordet. Produkter med öppet pris, varianter eller annan enhet än styck stöds inte online.')],{pre:()=>{D().online={store:null,sections:[]};reset('locations')()}});

/* ═════ Inställningar ═════ */
X('bs-installningar','Inställningar','Slå på funktioner',[
 ...nav('org','osettings'),
 {el:'set-covers',d:'Här slår du av och på funktioner i kassan. <b>Möjlighet att lägga till antal gäster</b> ger kassan knappen för gäster.',next:1},
 {el:'set-edit-covers',d:'Tryck <b>Redigera</b>.',on:'bs:setdlg:covers'},
 {el:'ck-b_setstore',d:'Bocka i butiken där funktionen ska gälla.',until:()=>isOn('b_setstore',1)},
 {el:'set-save',d:'Tryck <b>Spara</b>.',on:'bs:setsave:covers'},
 done('Ändringen skickas till kassorna. Logga ut och in i kassan om den inte syns direkt.')],{pre:()=>{D().set.covers=false;reset('org')()}});
X('bs-licenser','Inställningar','Licenser',[
 top('licenses','Tryck <b>Licenser</b>.'),
 {el:'lic-1',d:'Varje kassa, köksskärm och kunddisplay har en licens. Här ser du kassanummer, appversion och status.',next:1},
 done('Ska en licens flyttas till en ny iPad kontaktar du Yabies support.')],{pre:reset()});

list();appSync();
const hs=location.hash.slice(1);if(hs.startsWith('bs-')&&TOURS.find(t=>t.id===hs))startTour(hs);
/* register side: popup messages from Backstage when a product is added */
const _ap=addProduct;addProduct=function(pid){const r=_ap.apply(this,arguments);if(APP()!=='pos')return r;const p=P(pid);if(!p)return r;const g=G(p.gid)||{};const id=p.popup||g.popup;const m=id&&(D().popups||[]).find(x=>x.id===id);
 if(m){const c=C();c.popShown=c.popShown||[];if(!(m.once&&c.popShown.includes(m.id))){c.popShown.push(m.id);vConfirm({t:m.name,p:m.text,ok:'OK'},()=>{})}}return r};
})();
