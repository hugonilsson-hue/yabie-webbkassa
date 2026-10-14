/* Guided tours that run on top of the live web POS, plus page shell (modes, guide list, reset, scaling). */
const ensureGroup=()=>{if(!S.groups.find(g=>g.name==='Glass')){S.groups.push({id:'g-glass',name:'Glass',vat:12,ledger:'3002',color:'#f5cfdf'});save()}};
const ensureProduct=()=>{ensureGroup();if(!S.products.find(p=>p.name==='Mjukglass')){S.products.push({id:'p-mjuk',name:'Mjukglass',price:39,gid:S.groups.find(g=>g.name==='Glass').id,desc:''});save()}};
const kaffebar=()=>{const sp=S.startPages.find(s=>s.name==='Kaffebar')||S.startPages[0];UI.tab='sp:'+sp.id};
const ipOk=()=>{const p=(UI.f.ip||'').split('.');return p.length===4&&p.every(x=>x!=='')};

const TOURS=[
 {ch:'Hårdvara',id:'hw-terminal',title:'Kortterminal (Swedbank Pax)',dev:'a30',pre:()=>{window.a30Reset&&a30Reset();S.terminals=S.terminals.filter(t=>t.prov!=='Swedbank Pax')},steps:[
  {t:'Koppla in terminalen',d:'Koppla <b>USB-C-sladden</b> till terminalen och <b>LAN-kabeln</b> från terminalen till routern.',scr:'off',next:1},
  {t:'Terminalen startar',d:'Först visas PAX-loggan och sedan Swedbank. Här är det bara att vänta.',scr:'swedbank',next:1},
  {el:'a30-begin',sel:'#devpane [data-ag="begin"]',t:'Starta aktiveringen',d:'Tryck <b>Start / Begin activation</b> på terminalen.',scr:'begin',on:'a30:begin'},
  {t:'Terminalen laddar ner',d:'Whitelisting, nedladdning och installation. Låt terminalen arbeta klart tills IP-adressen visas.',until:()=>window.a30State&&a30State()==='ip'},
  {t:'Notera IP-adressen',d:'Terminalen visar sin IP-adress, här <b>192.168.1.50</b>. Den skriver du in i kassan.',next:1},
  {el:'mystore',d:'I kassan: öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-terminals',d:'Under <b>Hardware</b>: tryck på <b>Payment Terminals</b>.',on:'open:terminals'},
  {el:'prov-swedbank',d:'Välj <b>Swedbank Pax</b>.',on:'open:termprov'},
  {el:'term-add',d:'Tryck <b>Add Terminals</b>.',on:'open:termip'},
  {el:'ip-fields',allow:'.npad',d:'Knappa in IP-adressen från terminalen, <b>192.168.1.50</b>.',until:()=>UI.f.ip==='192.168.1.50',fill:()=>{UI.f.ip='192.168.1.50'}},
  {el:'term-add-btn',d:'Tryck <b>Add Terminal</b>.',on:'terminal:add'},
  {t:'Terminalen installeras',d:'Nu laddar terminalen ner igen och startar om. Återigen är det bara att vänta.',until:()=>window.a30State&&a30State()==='ready'},
  {t:'Klart!',d:'När ni ser den <b>gröna bakgrunden och Yabie-loggan</b> är terminalen kopplad. Betalsättet ni ska använda heter <b>Swedbank Pax</b>. Under Payment Terminals syns terminalen med sin IP-adress.',next:1}]},
 {ch:'Hårdvara',id:'hw-swedbank-cloud',title:'Swedbank Cloud-terminal (A920Pro)',a920:[0,1,2,3,4,4,5,6,6,7],steps:[
  {t:'Välj ECR Cloud',d:'Starta terminalen. När den frågar vilket upplägg du har, tryck på ECR Cloud.<ol class="path"><li><span class="chip">ECR Cloud</span></li></ol><div class="tipbox"><strong>Bra att veta</strong><span>Stand alone terminal är för terminaler som används utan kassa, så den hoppar du över.</span></div>',next:1,ph:'På terminalen'},
  {t:'Öppna menyn',d:'Terminalen visar nu Stängt. Tryck på de tre prickarna nere till vänster.<ol class="path"><li><span class="chip">•••</span></li></ol>',next:1,ph:'På terminalen'},
  {t:'Välj Parningsläge',d:'Menyn glider upp från botten. Tryck på Parningsläge.<ol class="path"><li><span class="chip">Meny</span></li><li><span class="sep">›</span><span class="chip">Parningsläge</span></li></ol>',next:1,ph:'På terminalen'},
  {t:'Notera parningskoden',d:'Terminalen visar en sexsiffrig kod. Ha den framme, du skriver in den i kassan om en liten stund.<div class="tipbox"><strong>Tips</strong><span>Koden gäller i 10 minuter, så fortsätt direkt till kassan.</span></div>',next:1,ph:'På terminalen'},
  {el:'mystore',t:'Öppna Payment Terminals',d:'I Yabie-kassan, tryck på My Store uppe till vänster.<ol class="path"><li><span class="chip">My Store</span></li><li><span class="sep">›</span><span class="chip">Payment Terminals</span></li></ol>',on:'open:ms',ph:'I kassan'},
  {el:'row-terminals',t:'Öppna Payment Terminals',d:'Under Hardware, tryck på Payment Terminals.<ol class="path"><li><span class="chip">My Store</span></li><li><span class="sep">›</span><span class="chip">Payment Terminals</span></li></ol>',on:'open:terminals',ph:'I kassan'},
  {el:'prov-swedbank-cloud',t:'Välj Swedbank Cloud',d:'Tryck på Swedbank Cloud i listan.<ol class="path"><li><span class="chip">Swedbank Cloud</span></li></ol><div class="tipbox"><strong>Bra att veta</strong><span>Välj Swedbank Cloud, inte Swedbank Pax.</span></div>',on:'open:termprov',ph:'I kassan'},
  {el:'in-paircode',t:'Skriv in koden och tryck Pair',d:'Skriv in den sexsiffriga koden från terminalen i fältet: <b>901080</b>.',type:'901080',ph:'I kassan'},
  {el:'pair-btn',t:'Skriv in koden och tryck Pair',d:'Tryck på Pair.<ol class="path"><li><span class="chip">Pair</span></li></ol>',on:'terminal:pair',ph:'I kassan'},
  {t:'Klart!',d:'När terminalen visar Yabie är den ihopkopplad med kassan. Nu kan du ta betalt.<div class="tipbox"><strong>Har koden gått ut?</strong><span>Koden gäller i 10 minuter. Öppna Parningsläge på terminalen igen så får du en ny kod.</span></div><div class="tipbox"><strong>Fortfarande strul?</strong><span>Hör av dig till <a href="https://support.yabie.com" target="_blank" rel="noopener">Yabie Support</a> så löser vi det tillsammans.</span></div>',next:1,ph:'I kassan'}]},
 {ch:'Hårdvara',id:'hw-skrivare',title:'Kvittoskrivare',steps:[
  {t:'Ta av locket',d:'Vänd skrivaren upp och ner och lyft av locket på undersidan. Där sitter alla portar.',next:1,vid:'media/skrivare-1.mp4'},
  {t:'Koppla in strömmen',d:'Sätt strömkabelns runda kontakt i porten <b>DC 24V</b> längst till höger. Lägg kabeln i spåret så att den kommer ut bakåt.',next:1,vid:'media/skrivare-2.mp4'},
  {t:'Koppla in iPad-kabeln',d:'Sätt USB-kabeln i porten märkt <b>iPad</b> och lägg den i spåret bredvid strömkabeln. Använder ni nätverk i stället: sätt en LAN-kabel i porten <b>LAN</b> och koppla den till routern.',next:1,vid:'media/skrivare-3.mp4'},
  {t:'Sätt tillbaka locket',d:'Tryck fast locket, vänd skrivaren rätt och sätt strömsladden i ett eluttag. Den blå lampan på framsidan lyser när skrivaren är på.',next:1,vid:'media/skrivare-4.mp4'},
  {t:'Koppla till iPaden',d:'Sätt USB-kabelns andra ände i iPaden. Skrivaren laddar också iPaden när den är på.',next:1,vid:'media/skrivare-5.mp4'},
  {el:'mystore',d:'Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-printers',d:'Under <b>Hardware</b>: tryck på <b>Printers</b>.',on:'open:printers'},
  {el:'printer-row',d:'Status <b>Connected</b> betyder att kassan hittar skrivaren. Tryck på den.',on:'open:printer'},
  {el:'print-demo',d:'Testa med <b>Print Demo Receipt</b>.',on:'printer:demo'},
  {t:'Klart!',d:'Kommer det ut ett kvitto fungerar skrivaren. Blankt kvitto? Vänd på pappersrullen.',next:1}]},
 {ch:'Hårdvara',id:'hw-star-wifi',title:'Bongskrivare (Star TSP143IV)',dev:'star',pre:()=>{kaffebar();window.starReset&&starReset();S.tipping.on=false;(S.stations||[]).forEach(s=>s.printer='')},steps:[
  {t:'Bongskrivaren',d:'Star <b>TSP143IV</b> används som <b>bongskrivare</b>: när ett köp är klart skrivs en bong ut i köket med det som ska tillagas. Kundens kvitto skrivs fortfarande på kvittoskrivaren vid kassan.',next:1},
  {t:'Förbered skrivaren',d:'Lägg i en pappersrulle och slå på skrivaren <b>TSP143IV-UEWB</b>. Sitter det en LAN-kabel i skrivaren: dra ur den. Ha namnet och lösenordet till ert Wi-Fi nära till hands.',next:1},
  {el:'st-wifi',sel:'#devpane [data-sg="wifi"]',d:'På mobilen eller surfplattan: slå på <b>Wi-Fi</b> och anslut till samma nätverk som kassan.',on:'star:wifi'},
  {el:'st-bt-on',sel:'#devpane [data-sg="bt"]',d:'Slå på <b>Bluetooth</b>. Appen använder det för att hitta skrivaren.',on:'star:bt'},
  {el:'st-app',sel:'#devpane [data-sg="app"]',d:'Öppna appen <b>Star Quick Setup Utility</b>. Den laddas ner gratis från App Store eller Google Play.',on:'star:menu'},
  {el:'st-wlan',sel:'#devpane [data-sg="wlan"]',d:'Tryck <b>Use Wireless LAN</b>.',on:'star:model'},
  {el:'st-model',sel:'#devpane [data-sg="model"]',d:'Välj modellen <b>TSP143IV-UEWB</b>.',on:'star:loc'},
  {el:'st-loc',sel:'#devpane [data-sg="loc-allow"]',d:'Appen behöver platsen för att läsa nätverkets namn. Tryck <b>Allow While Using App</b>. (Android: <b>Only this time</b>, sedan <b>Allow</b>.)',on:'star:form'},
  {el:'st-key',sel:'#devpane [data-sg="keyfld"]',d:'Kontrollera att rätt nätverk (SSID) står ifyllt och skriv Wi-Fi-lösenordet. I demot: <b>kaffe2026</b>.',on:'star:keyok',fill:()=>{starS().key='kaffe2026';devRedraw();emit('star:keyok')}},
  {el:'st-next',sel:'#devpane [data-sg="next"]',d:'Tryck <b>Next</b>.',on:'star:bt'},
  {el:'st-bt',sel:'#devpane [data-sg="bt-allow"]',d:'Appen hittar skrivaren via Bluetooth. Tryck <b>Allow</b>.',on:'star:near'},
  {el:'st-led',sel:'#devpane [data-sg="led"]',d:'Håll mobilen nära skrivarens lampor. Tryck på <b>lamporna</b> på skrivaren.',on:'star:cfg'},
  {t:'Skrivaren ställs in',d:'Inställningarna skickas till skrivaren. Stäng inte av den.',until:()=>starS().s==='print'},
  {el:'st-slip',sel:'#devpane [data-sg="slip"]',d:'Skrivaren skriver ut en <b>Wireless Network Diagnosis</b>. Står det <b>Successful</b> är Wi-Fi klart och nätverkslampan lyser grönt. Skrivarens adress står under <b>IP Address</b>.',next:1},
  {el:'st-finish',sel:'#devpane [data-sg="finish"]',d:'Tryck <b>Finish</b> för att stänga appen.',on:'star:done'},
  {t:'Bongutskrifter i Backstage',d:'I Backstage: <b>Handlare → Inställningar</b>, bocka i <b>Aktivera funktion för bongutskrifter</b> och välj referens (Automatisk 1–999 eller fritext). Under <b>Kök → Skrivarstationer → Lägg till station</b> skapar du stationen och väljer vilka produkter som ska skrivas ut där. I demot finns stationen <b>Kök</b> med smörgåsarna.',next:1},
  {el:'mystore',d:'Nu kopplar du stationen till skrivaren i kassan. Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-printers',d:'Under <b>Hardware</b>: tryck på <b>Printers</b>.',on:'open:printers'},
  {el:'station-kok',d:'Under <b>Printer stations</b> står stationen <b>Kök</b> utan skrivare. Tryck på den.',on:'open:station'},
  {el:'pr-tsp143',d:'Välj <b>TSP143IV-UEWB</b>, skrivaren du just kopplade till Wi-Fi.',on:'station:set'},
  {el:'station-test',d:'Tryck <b>Print Example Receipt</b>. Ett exempelkvitto kommer ut på bongskrivaren, så vet du att det är rätt skrivare.',on:'station:test'},
  {el:'m-close',d:'Stäng My Store.',on:'close'},
  {el:'tile-raksmorgas',d:'Sälj en <b>Räksmörgås</b>. Smörgåsarna hör till stationen Kök.',on:'add'},
  {el:'pay-card',d:'Ta betalt med <b>Kontokort</b>.',on:'pay:card'},
  {t:'Betalning pågår',d:'Kunden blippar kortet…',until:()=>UI.modal&&mtop().p==='checkout'},
  {el:'rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'receipt:skip'},
  {el:'st-bong',sel:'#devpane [data-sg="bong"]',d:'Bongen kommer ut i köket med referensnumret och <b>1 x Räksmörgås</b>. Samma referens står på kundens kvitto, så köket kan ropa upp ordern.',next:1},
  {t:'Klart!',d:'Bongskrivaren är kopplad. Stod det <b>Failed</b> på diagnoskvittot? Under texten står vad som är fel (t.ex. fel lösenord). Stäng av och på skrivaren och kör guiden igen. Vill du hellre koppla via molnet (Star CloudPRNT) finns det beskrivet i Yabies supportguide.',next:1}]},
 {ch:'Hårdvara',id:'hw-kassalada',title:'Kassalåda och växelkassa',float0:1,pre:()=>{S.drawer={float:null,moves:[]}},steps:[
  {t:'Anslut kassalådan',d:'Kassalådans kabel sitter i porten <b>Cash Drawer</b> på kvittoskrivaren. Lådan öppnas automatiskt när du tar betalt kontant.',next:1},
  {el:'tile-kanelbulle',d:'Sälj en kanelbulle: tryck på knappen.',on:'add'},
  {el:'allpay',d:'Tryck <b>ALL PAYMENTS</b>.',on:'allpay'},
  {el:'pm-kontant',sel:'[data-g="pm-cash"]',d:'Välj <b>Kontant</b>.',on:'open:openbal'},
  {t:'Open Balance',el:'openbal-ok',d:'Dagens första kontantköp kräver att du öppnar kassan med växelkassan, alltså hur mycket som ligger i lådan när dagen börjar.',next:1},
  {el:'npad',sel:'#pos .modal .npad',allow:'#pos .modal .npad',d:'Det ligger 500 kr i lådan. Knappa in <b>500</b>.',until:()=>UI.f.amt==='500',fill:()=>{UI.f.amt='500'}},
  {el:'openbal-ok',d:'Tryck <b>Open cash balance</b>.',on:'open:cash'},
  {el:'cash-ok',allow:'.npad,[data-a="cashq"]',d:'Nu kommer betalningen. Tryck på ett belopp (t.ex. <b>50 kr</b>) eller knappa in vad kunden ger. Tryck sedan <b>Ta betalt</b>.',on:'paid'},
  {el:'rc-skip',d:'Växeln visas på skärmen och kassalådan öppnas. Tryck <b>Skip receipt</b>.',on:'receipt:skip'},
  {el:'mystore',d:'Kassalådan hanterar du i <b>My Store</b>.',on:'open:ms'},
  {el:'row-drawer',d:'Tryck på <b>Cash Drawer</b>.',on:'open:drawer'},
  {el:'drawer-float',d:'<b>Current Balance</b> är växelkassan plus kontantförsäljningen. <b>Open Balance</b> är grå eftersom kassan redan är öppen för dagen.',next:1},
  {t:'Klart!',d:'Med <b>Add Cash</b> och <b>Remove Cash</b> sätter du in eller tar ut pengar, och <b>Open Drawer</b> öppnar lådan utan köp. Z-rapporten stänger kassan, och nästa dag öppnar du den igen vid första kontantköpet.',next:1}]},
 {ch:'Hårdvara',id:'hw-kundskarm',title:'Kundskärm',dev:'cd',pre:()=>{kaffebar();S.display.ip='';S.display.auto=true;S.tipping.on=false},steps:[
  {t:'Starta Yabie Screen',d:'Kundskärmen bredvid kassan kör appen <b>Yabie Screen</b>. Den ska vara på samma Wi-Fi som kassan och visar sin IP-adress och en QR-kod.',next:1},
  {el:'mystore',d:'I kassan: öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-custdisp',d:'Under <b>Hardware</b>: tryck på <b>Customer Display</b>.',on:'open:custdisp'},
  {el:'disp-ip',d:'Tryck på <b>IP Address</b>.',on:'open:dispip'},
  {el:'ip-fields',allow:'.npad,[data-a="dispqr"]',d:'Knappa in adressen som står på kundskärmen, <b>192.168.1.42</b>, eller tryck <b>Scan QR Code</b>.',until:()=>UI.f.ip==='192.168.1.42',fill:()=>{UI.f.ip='192.168.1.42'}},
  {el:'disp-ok',d:'Tryck <b>OK</b>. Med <b>Auto connect</b> påslaget kopplar kassan upp sig direkt och skärmen visar <b>TOTAL: SEK0.00</b>.',on:'display:ip'},
  {el:'m-close',d:'Stäng My Store.',on:'close'},
  {el:'tile-kanelbulle',d:'Sälj en <b>Kanelbulle</b>. Kunden ser varje artikel och totalen på kundskärmen medan du slår in.',on:'add'},
  {el:'tile-caffe-latte',d:'Lägg till en <b>Caffè latte</b>. Den har tillval, så produktsidan öppnas.',on:'open:mods'},
  {el:'mod-add',allow:'.mpills,.radio,.qbox',d:'Välj gärna mjölk och tryck <b>Add to Basket</b>. Tillvalen syns också på kundskärmen.',on:'add'},
  {el:'pay-card',d:'Ta betalt med <b>Kontokort</b>.',on:'pay:card'},
  {t:'Betalning pågår',d:'Kunden blippar kortet…',until:()=>UI.modal&&mtop().p==='checkout'},
  {el:'cd-skip',sel:'#devpane [data-cg="cd-skip"]',d:'Nu frågar kundskärmen om kvitto. Kunden väljer själv SMS, e-post eller utan kvitto. Tryck <b>Skip receipt</b> på kundskärmen.',on:'receipt:skip'},
  {t:'Klart!',d:'Kundskärmen återgår till <b>TOTAL: SEK0.00</b> och är redo för nästa kund. Låt <b>Auto connect</b> vara på så kopplar kassan upp sig igen efter omstart.',next:1}]},
 {ch:'Hårdvara',id:'hw-kds',title:'Köksskärm (KDS)',dev:'kds',pre:()=>{kaffebar();window.kdsReset&&kdsReset();S.tipping.on=false},steps:[
  {t:'Köksskärmen',d:'Bredvid kassan står köksskärmen (KDS). Stationen skapas i Backstage under <b>Extern hårdvara → Köksdisplay</b>, där du också väljer vilka grupper som visas. Sedan loggar du in i KDS-appen och väljer en licens.',next:1},
  {el:'tile-cappuccino',d:'Lägg en <b>Cappuccino</b> i varukorgen.',on:'open:mods'},
  {el:'mod-add',allow:'.mpills,.radio,.qbox',d:'Välj gärna mjölk och tryck <b>Add to Basket</b>.',on:'add'},
  {el:'tile-raksmorgas',d:'Lägg till en <b>Räksmörgås</b>.',on:'add'},
  {el:'pay-card',d:'Ta betalt med <b>Kontokort</b>. Ordern skickas till köket när köpet är klart.',on:'pay:card'},
  {t:'Betalning pågår',d:'Kunden blippar kortet…',until:()=>UI.modal&&mtop().p==='checkout'},
  {el:'rc-skip',d:'Tryck <b>Skip receipt</b>. Titta på köksskärmen: ordern har kommit in och skärmen blinkar grönt.',on:'receipt:skip'},
  {el:'kds-item',sel:'#devpane [data-kg^="kds-item"]',allow:'#devpane .vti',d:'I köket: tryck på en artikel som är klar.',until:()=>S.kds.some(k=>k.items.some(i=>i.sel||i.done))},
  {el:'kds-mark',sel:()=>document.querySelector('#devpane [data-kg="kds-mark"]')?'#devpane [data-kg="kds-mark"]':'#devpane [data-kg^="kds-item"]',allow:'#devpane .vti,#devpane [data-kg="kds-mark"]',d:'Tryck <b>Markera artiklar som klara</b>. Artikeln flyttas till <b>Klara artiklar</b>. Du kan markera en eller flera artiklar.',until:()=>S.kds.some(k=>k.items.some(i=>i.done))},
  {el:'kds-bump',sel:()=>document.querySelector('#devpane [data-kg="kds-bump"]')?'#devpane [data-kg="kds-bump"]':'#devpane [data-kg="kds-mark"]',allow:'#devpane .vti,#devpane [data-kg="kds-mark"],#devpane [data-kg="kds-undo"]',d:'När allt är klart trycker köket <b>Klar</b> och ordern försvinner från skärmen.',on:'kds:bump'},
  {t:'Klart!',d:'Tryckte du fel finns <b>Ångra klar</b> en kort stund. Ordrar som parkeras på bord skickas också till köket, så att köket kan börja direkt.',next:1}]},
 {ch:'Att testa',id:'test-grupp',title:'Skapa en produktgrupp',steps:[
  {el:'mystore',d:'Vi skapar gruppen <b>Glass</b>. Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-catalog',d:'Tryck på <b>Product Catalog</b>.',on:'open:catalog'},
  {el:'cat-mpg',d:'Tryck <b>Manage products & groups</b>.',on:'open:mpg'},
  {el:'mpg-newgrp',d:'Tryck <b>Create new group</b>.',on:'open:grpform'},
  {el:'in-gname',d:'Skriv <b>Glass</b>.',type:'Glass'},
  {el:'gf-vat',d:'Tryck på <b>VAT Group</b> för att välja momssats.',on:'vatopen'},
  {el:'vat-12',d:'Välj momssats <b>12 %</b>. Bokföringskontot fylls i automatiskt.',on:'vat'},
  {el:'gf-save',allow:'.colors',d:'Välj gärna en färg och tryck <b>Save</b>.',on:'group:save'},
  {t:'Klart!',d:'Gruppen Glass syns nu som en egen flik i kassan.',next:1}]},
 {ch:'Att testa',id:'test-produkt',title:'Skapa en produkt',pre:ensureGroup,steps:[
  {el:'mystore',d:'Nu skapar vi <b>Mjukglass</b> för 39 kr. Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-catalog',d:'Tryck på <b>Product Catalog</b>.',on:'open:catalog'},
  {el:'cat-mpg',d:'Tryck <b>Manage products & groups</b>.',on:'open:mpg'},
  {el:'mpg-newprod',d:'Tryck <b>Create new product</b>.',on:'open:prodform'},
  {el:'in-pname',d:'Skriv <b>Mjukglass</b>.',type:'Mjukglass'},
  {el:'pf-group',d:'Tryck på <b>Product group</b>.',on:'open:pickgroup'},
  {el:'pg-glass',d:'Välj <b>Glass</b>.',on:'pick:group'},
  {el:'pg-done',d:'Tryck <b>Done</b>.',on:'open:prodform'},
  {el:'pf-price',d:'Tryck på <b>Default price</b>. Momsen hämtas från gruppen.',on:'open:price'},
  {el:'amt-pad',sel:'#pos .modal .npad',allow:'#pos .modal .npad',d:'Knappa in priset <b>39</b> på sifferknapparna.',until:()=>UI.modal&&mtop().p==='price'&&(UI.f.amt||'')==='39',fill:()=>{UI.f.amt='39';render()}},
  {el:'amt-done',allow:'#pos .modal .npad',d:'Priset är <b>39,00 kr</b>. Tryck <b>Done</b>.',until:()=>UI.f.pf&&UI.f.pf.price>0&&UI.modal&&mtop().p==='prodform'},
  {el:'pf-save',sel:()=>UI.f.pf&&UI.f.pf.price>0?'#pos [data-g="pf-save"]':'#pos [data-g="pf-price"]',d:'Tryck <b>Save</b>. Har du inte lagt in priset än markeras <b>Default price</b> – tryck där och knappa in 39 först.',on:'product:save'},
  {t:'Klart!',d:'Mjukglass finns nu i fliken Glass. Nästa guide lägger den på en egen startsida.',next:1}]},
 {ch:'Att testa',id:'test-startsida',title:'Lägg till en startsida',pre:ensureProduct,steps:[
  {el:'edit',d:'Tryck <b>Edit</b> för att redigera startsidorna.',on:'edit'},
  {el:'tab-add',d:'Plustecknet skapar en ny startsida.',on:'open:spdialog'},
  {el:'in-spname',d:'Skriv <b>Sommar</b>.',type:'Sommar'},
  {el:'sp-create',d:'Tryck <b>Create</b>.',on:'sp:create'},
  {el:'sp-done',d:'Tryck <b>Done</b>.',on:'close'},
  {el:'slot-0',d:'Startsidan är tom. Tryck på första <b>+</b>.',on:'open:addtile'},
  {el:'at-product',d:'Välj <b>Product</b>.',on:'open:pickprod'},
  {el:'pp-mjukglass',allow:'.srch',d:'Välj <b>Mjukglass</b>.',on:'tile:pick'},
  {el:'tile-add',allow:'.colors,.styl',d:'Välj färg och tryck <b>Add product</b>.',on:'tile:add'},
  {el:'edit-save',d:'Tryck <b>Save</b> så sparas layouten.',on:'layout:save'},
  {t:'Klart!',d:'Startsidan Sommar ligger bland flikarna med knappen Mjukglass.',next:1}]},
 {ch:'Att testa',id:'test-betalsatt',title:'Snabbknappar och sifferknappar',pre:()=>{kaffebar();S.payLayout={numpad:false,large:false,quick:[],size:S.payLayout&&S.payLayout.size||{}};S.payments.forEach(p=>p.quick=false)},steps:[
  {el:'mystore',d:'Nu ställer vi in betalknapparna i kassan. Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-paymethods',d:'Under <b>Settings</b>: tryck <b>Payment Methods</b>.',on:'open:paymethods'},
  {el:'pl-show',d:'Först väljer du om sifferknapparna (numpad) ska synas i kassan. De används för att slå <b>antal</b> av en vara, t.ex. 3 innan du trycker på produkten, eller för att slå in en <b>PLU-kod</b>. Som standard är de dolda. Tryck <b>Show numpad</b>.',on:'pm:layout'},
  {el:'pl-add',d:'Som standard finns inga snabbknappar för betalsätt, då tar man betalt via <b>CHARGE</b>. Du kan lägga till upp till fyra. Tryck <b>+</b>.',on:'open:pladdpage'},
  {el:'pl-pick-cash',d:'Välj <b>Kontant</b>.',on:'pm:sel'},
  {el:'pl-pick-ok',d:'Tryck <b>Add payment method</b>.',on:'pm:add'},
  {el:'pl-save',allow:'#pos .modal .rmv,#pos .modal [data-a="plnum"],#pos .modal .tog',d:'Med minustecknet tar du bort en knapp. Utan sifferknappar blir betalknapparna större. Tryck <b>Save</b>.',on:'pm:save'},
  {el:'m-close',d:'Stäng My Store.',until:()=>!UI.modal},
  {el:'key-3',d:'Snabbknappen ligger nu bredvid sifferknapparna. Prova att sälja tre bullar på en gång: tryck <b>3</b>.',on:'num'},
  {el:'tile-kanelbulle',d:'Tryck på <b>Kanelbulle</b>. Antalet du slog läggs på produkten.',on:'add'},
  {t:'Klart!',d:'Varukorgen visar <b>3 Articles</b>. Betalsätt som inte har en snabbknapp hittar du alltid under <b>All payments</b>.',next:1}]},
 {ch:'Att testa',id:'test-kop',title:'Gör ett köp och en retur',pre:kaffebar,steps:[
  {el:'tile-cappuccino',d:'Tryck på <b>Cappuccino</b>.',on:'open:mods'},
  {el:'mod-add',allow:'.mpills,.radio,.qbox',d:'Kaffet har tillval. Välj mjölk om du vill och tryck <b>Add to Basket</b>.',on:'add'},
  {el:'pay-card',d:'Ta betalt med <b>Kontokort</b>. Kunden blippar kortet på terminalen.',on:'paid'},
  {el:'rc-skip',d:'Välj kvitto. Vi trycker <b>Skip receipt</b>.',on:'receipt:skip'},
  {el:'mystore',d:'Nu returnerar vi köpet. Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'ms-orders',d:'Tryck <b>Order History</b>.',on:'open:orders'},
  {el:'order-0',d:'Senaste ordern ligger överst.',on:'open:order'},
  {el:'ret-select',d:'Tryck <b>Select items to return</b>.',on:'open:pin'},
  {el:'modal-pin',d:'Returer kräver PIN från en Admin. I demon har Ägare koden <b>1234</b>.',on:'pin:ok'},
  {el:'ret-chk-0',d:'Bocka i <b>Cappuccino</b>.',on:'ret:check'},
  {el:'ret-go',d:'Tryck <b>Return items</b>.',on:'open:retreason'},
  {el:'in-reason',d:'Skriv en orsak, t.ex. <b>Fel beställning</b>.',type:'Fel beställning',optional:1},
  {el:'ret-next',d:'Tryck <b>Next</b>.',on:'return:cart'},
  {el:'allpay',d:'Returen ligger i varukorgen. Tryck <b>ALL PAYMENTS</b>.',on:'allpay'},
  {el:'pm-card',d:'Pengarna går tillbaka till samma betalsätt. Välj <b>Kontokort</b>.',on:'paid'},
  {el:'rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'receipt:skip'},
  {t:'Klart!',d:'Köpet och returen syns nu i orderhistoriken och i rapporterna.',next:1}]},

 {ch:'Online',id:'online-order',title:'Ta emot en onlineorder',phone:true,pre:()=>{window.phoneReset&&phoneReset();S.onlineOrders=[];UI.online=null;kaffebar();save()},steps:[
  {el:'ph-open',sel:'#phonepane [data-pg="ph-open"]',t:'Kunden skannar QR-koden',d:'Vid bordet står en skylt med QR-kod. Kunden skannar den med mobilkameran och kommer direkt till er webbshop. Tryck på länken i telefonen.',on:'ph:shop',ph:'Kunden'},
  {el:'ph-p-cappuccino',sel:'#phonepane [data-pg="ph-p-cappuccino"]',t:'Välj en produkt',d:'Webbshoppen visar samma produkter och priser som kassan. Tryck på <b>Cappuccino</b>.',on:'ph:product',ph:'Kunden'},
  {el:'ph-add',sel:'#phonepane [data-pg="ph-add"]',allow:'#phonepane .opt,#phonepane .qty',t:'Välj tillval',d:'Tillvalen från kassan finns med här. Välj till exempel Havremjölk och tryck <b>Add</b>.',on:'ph:add',ph:'Kunden'},
  {el:'ph-tab-bakverk',sel:'#phonepane [data-pg="ph-tab-bakverk"]',t:'Lägg till något mer',d:'Kunden bläddrar mellan kategorierna. Tryck på fliken <b>Bakverk</b>.',on:'ph:tab',ph:'Kunden'},
  {el:'ph-p-kanelbulle',sel:'#phonepane [data-pg="ph-p-kanelbulle"]',t:'Lägg till något mer',d:'Tryck på <b>Kanelbulle</b>. Produkter utan tillval läggs direkt i ordern.',on:'ph:add',ph:'Kunden'},
  {el:'ph-yourorder',sel:'#phonepane [data-pg="ph-yourorder"]',t:'Till kassan',d:'Tryck på <b>Your order</b> längst ner.',on:'ph:order',ph:'Kunden'},
  {el:'ph-provide',sel:'#phonepane [data-pg="ph-provide"]',allow:'#phonepane .qty',t:'Kontrollera ordern',d:'Kunden ser sitt bord (Eat in: 3), sina val och ungefärlig tillagningstid. Tryck <b>Provide information and pay</b>.',on:'ph:details',ph:'Kunden'},
  {el:'ph-proceed',sel:'#phonepane [data-pg="ph-proceed"]',allow:'#phonepane input',t:'Kontaktuppgifter',d:'Kunden fyller i namn, telefon och e-post. Dit skickas kvitto och SMS. Tryck <b>Fyll i åt mig</b> och sedan <b>Proceed to payment</b>.',fill:()=>{PH.name='Anna';PH.phone='+46 70 123 45 67';PH.email='anna@test.com';phRender()},on:'ph:pay',ph:'Kunden'},
  {el:'ph-apple',sel:'#phonepane [data-pg="ph-apple"]',allow:'#phonepane .pm',t:'Betala',d:'Kunden betalar med Swish, kort eller Apple Pay. Tryck <b>Apple Pay</b>.',on:'ph:paid',ph:'Kunden'},
  {el:'online',t:'Ordern kommer in i kassan',d:'Kassan blinkar grönt och klockan vid <b>Online orders</b> visar 1. Kunden har fått ett SMS. Tryck på <b>Online orders</b>.',on:'open:online',ph:'I kassan'},
  {el:'oo-accept',t:'Acceptera ordern',d:'Kortet visar bord, namn, artiklar och tillval (gula etiketter). Tryck <b>Accept</b>.',on:'open:oaccept',ph:'I kassan'},
  {el:'oa-confirm',allow:'#pos .oadlg .tm,#pos .oadlg input',t:'Ange tillagningstid',d:'Välj <b>5</b> eller <b>10</b> minuter, eller skriv en egen tid, och tryck <b>Confirm Time</b>.',on:'online:accepted',ph:'I kassan'},
  {t:'Kunden får en klar-tid',d:'Kortet blir grönt och visar tillagningstiden. Kunden har fått kvitto på e-post och ett SMS med när ordern är klar. Se telefonen.',next:1,ph:'I kassan'},
  {el:'oo-done',allow:'#pos .ooc .it',t:'Bocka av och lämna ut',d:'Tryck på artiklarna när de är klara, så hamnar de under <b>Completed items</b>. Tryck sedan <b>Done</b>.',on:'online:done',ph:'I kassan'},
  {t:'Klart!',d:'Kunden får SMS:et <b>Your order is ready to be picked up</b>. Ordern finns nu under <b>History</b> i Online orders.',next:1,ph:'I kassan'}]},
 {ch:'Rapporter',id:'rap-dagsavslut',title:'Dagsavslut: när och hur',steps:[
  {t:'Vilken tid stänger ni?',choice:{key:'stang',q:'När tar ni sista betalningen för dagen?',opts:[['kvall','Före midnatt','Café, butik, lunch'],['natt','Efter midnatt','Bar, nattklubb']]}},
  {when:{stang:'kvall'},t:'Tid för dagsavslut',d:'Kassan gör dagsavslut automatiskt vid en fast tid. Välj en tid efter er sista försäljning, t.ex. en timme efter stängning.',next:1},
  {when:{stang:'natt'},t:'Tid för dagsavslut',d:'Stänger ni 02:00? Lägg avslutet t.ex. 04:00, inte 00:00. Då hamnar hela kvällen på samma rapport.',next:1},
  {el:'mystore',d:'Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'ms-z',d:'Tryck <b>Z-Report</b>.',on:'open:z'},
  {el:'z-manual',d:'Här ser du tidigare dagsavslut. Vill du stänga dagen nu: <b>Manual End of Day</b>.',on:'open:zconfirm'},
  {el:'z-create',d:'Tryck <b>Create Z-Report</b>.',on:'z:create'},
  {t:'Klart!',d:'Z-rapporten visar försäljning per momssats och betalsätt. Alla rapporter finns också i Backstage.',next:1}]},
 {ch:'Rapporter',id:'rap-integration',title:'Bokföring och integration',steps:[
  {t:'Bokföringsprogram',choice:{key:'bok',q:'Vilket bokföringsprogram använder ni?',opts:[['fortnox','Fortnox'],['spiris','Spiris','f.d. Visma eEkonomi'],['bl','Björn Lunden'],['ingen','Inget / annat','SIE-fil']]}},
  {when:{bok:'fortnox'},t:'Fortnox',d:'Backstage: <b>Integrationer → Fortnox</b>. Tryck <b>Hämta behörighetskod</b>, logga in i Fortnox och godkänn. Välj butiker och verifikationsserie. Kräver modulerna Bokföring, Integration och Arkivplats.',next:1},
  {when:{bok:'spiris'},t:'Spiris',d:'Backstage: <b>Integrationer → Spiris</b>. Hämta behörighetskod, logga in i Spiris och godkänn. Välj butiker och verifikationsserie. Kräver modulen Spiris Integration.',next:1},
  {when:{bok:'bl'},t:'Björn Lunden',d:'I Björn Lunden: <b>Integrationer → Yabie → Aktivera</b> och kopiera den Publika nyckeln. I Backstage: <b>Integrationer → Björn Lunden</b>, klistra in nyckeln och välj serie.',next:1},
  {when:{bok:'ingen'},t:'SIE-fil',d:'Backstage: <b>Rapporter → SIE-4</b>. Välj period och skicka filen till din redovisningskonsult.',next:1},
  {t:'Klart!',d:'Försäljningen skickas sedan automatiskt efter varje dagsavslut.',next:1}]},
 {ch:'Försäljning',x:1,id:'x-rabatt',title:'Ge rabatt på en artikel och på hela köpet',pre:kaffebar,steps:[
  {el:'tile-kanelbulle',d:'Sälj en <b>Kanelbulle</b>.',on:'add'},
  {el:'ci-kanelbulle',d:'Tryck på raden i varukorgen för att öppna artikeln.',on:'open:item'},
  {el:'item-disc',d:'Tryck <b>Discount</b>.',on:'open:discount'},
  {el:'disc-apply',allow:'.dgrid,.npad,.seg',d:'Välj en rabattknapp, t.ex. <b>10% Personal</b>, eller knappa in en egen rabatt. Tryck sedan <b>Add Discount</b>.',fill:()=>A.dbtn(S.discounts[0].id),on:'discount'},
  {el:'functions',d:'Rabatt på hela köpet ligger under <b>Functions</b>.',on:'functions'},
  {el:'ft-discount',d:'Tryck <b>Discount</b>.',on:'open:discount'},
  {el:'disc-apply',allow:'.dgrid,.npad,.seg',d:'Välj <b>Amount</b>, knappa in <b>5</b> kr och tryck <b>Add Discount</b>.',fill:()=>{A.dmode('amt');A.dkey('5')},on:'discount'},
  {t:'Klart!',d:'Artikelrabatten syns på raden och köprabatten under varukorgen. Totalen räknas om direkt.',next:1}]},
 {ch:'Försäljning',x:1,id:'x-parkera',title:'Parkera en order och hämta den igen',pre:kaffebar,steps:[
  {el:'tile-kanelbulle',d:'Lägg en <b>Kanelbulle</b> i varukorgen.',on:'add'},
  {el:'park',d:'Tryck <b>Park</b>.',on:'open:park'},
  {el:'park-now',allow:'#pos [data-in="parkname"]',d:'Ge ordern ett namn, t.ex. kundens namn, eller lämna fältet tomt så sparas den med klockslaget. Tryck <b>Park</b>. Varukorgen töms så att du kan ta nästa kund.',on:'park'},
  {el:'parked',d:'Tryck <b>Parked</b> för att se parkerade ordrar och bord.',on:'open:parked'},
  {el:'tables-all',d:'Fliken <b>All</b> listar alla parkerade ordrar.',on:'tables:tab'},
  {el:'parked-x',sel:'#pos .full tr:last-child [data-g^="parked-"]',d:'Tryck på korgen på din order för att hämta tillbaka den till kassan.',on:'unpark'},
  {t:'Klart!',d:'Ordern ligger i varukorgen igen och kan betalas. Parkera på ett bord genom att trycka på bordet i bordsvyn.',next:1}]},
 {ch:'Försäljning',x:1,id:'x-presentkort',title:'Sälj och lös in ett presentkort',pre:()=>{kaffebar();S.tipping.on=false},steps:[
  {el:'tile-presentkort',d:'Presentkortet ligger som en knapp på startsidan. Tryck på <b>Presentkort</b>.',on:'open:askprice'},
  {el:'npad',sel:'#pos .modal .npad',allow:'#pos .modal .npad',d:'Knappa in beloppet <b>300</b> på knappsatsen.',until:()=>UI.f.amt==='300',fill:()=>{UI.f.amt='300'}},
  {el:'askprice-ok',d:'Tryck <b>Lägg till</b>.',on:'add'},
  {el:'pay-card',d:'Kunden betalar presentkortet med kort. Tryck <b>Kontokort</b>.',on:'pay:card'},
  {t:'Betalning pågår',d:'Kunden blippar kortet på terminalen…',until:()=>UI.modal&&mtop().p==='checkout'},
  {el:'rc-skip',d:'Tryck <b>Skip receipt</b>. Presentkortet är nu aktivt och koden skrivs ut till kunden.',on:'receipt:skip'},
  {el:'tile-kanelbulle',d:'Nu löser vi in ett presentkort. Sälj en <b>Kanelbulle</b>.',on:'add'},
  {el:'allpay',d:'Tryck <b>ALL PAYMENTS</b>.',on:'allpay'},
  {el:'pm-gift',d:'Välj <b>Yabie gift card</b>.',on:'open:giftpay'},
  {el:'in-code',d:'Skanna eller skriv in koden. Använd demokoden <b>DEMO-1000</b>.',type:'DEMO-1000'},
  {el:'gift-ok',d:'Saldot syns direkt. Tryck <b>Betala</b>.',on:'paid'},
  {el:'rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'receipt:skip'},
  {t:'Klart!',d:'Beloppet drogs från presentkortet. Saldo och historik finns under <b>My Store → Yabie gift cards</b>.',next:1}]},
 {ch:'Försäljning',x:1,id:'x-kund',title:'Koppla en kund till köpet',pre:kaffebar,steps:[
  {el:'tile-kanelbulle',d:'Sälj en <b>Kanelbulle</b>.',on:'add'},
  {el:'more',d:'Tryck <b>More</b>.',on:'more'},
  {el:'more-customer',d:'Tryck <b>Add Customer</b>.',on:'open:customers'},
  {el:'cust-row-anna-lind',d:'Sök eller välj kunden i listan. Tryck på <b>Anna Lind</b>.',on:'open:custdetail'},
  {el:'cust-use',d:'Tryck <b>Lägg till på ordern</b>.',on:'customer'},
  {t:'Klart!',d:'Kunden visas på ordern och köpet hamnar i kundens historik. Med kund kan du också skicka kvittot på e-post eller fakturera.',next:1}]},
 {ch:'Försäljning',x:1,id:'x-sok',title:'Sök efter en produkt',pre:kaffebar,steps:[
  {el:'search',d:'Tryck <b>Search</b> uppe till höger.',on:'search'},
  {el:'in-sq',d:'Skriv <b>bulle</b>.',type:'bulle'},
  {el:'sr-kanelbulle',d:'Tryck på <b>Kanelbulle</b> för att lägga den i varukorgen.',on:'add'},
  {t:'Klart!',d:'Sök fungerar på namn, artikelnummer och streckkod. En kopplad streckkodsskanner lägger produkten direkt i varukorgen.',next:1}]},
 {ch:'Försäljning',x:1,id:'x-allergi',title:'Allergiförfrågan på en artikel',pre:kaffebar,steps:[
  {el:'tile-kanelbulle',d:'Sälj en <b>Kanelbulle</b>.',on:'add'},
  {el:'ci-kanelbulle',d:'Tryck på raden i varukorgen.',on:'open:item'},
  {el:'row-allergy-request',d:'Tryck <b>Allergy request</b>.',on:'open:allergy'},
  {el:'al-gluten',d:'Kunden är glutenintolerant. Markera <b>Gluten</b> i listan.',until:()=>UI.f.al&&UI.f.al['a:Gluten'],fill:()=>{A.altog('a:Gluten')}},
  {el:'al-save',allow:'.algrow,#pos .modal input',d:'Du kan markera fler allergener eller skriva egen information i fältet. Tryck <b>Save</b>.',on:'allergy'},
  {t:'Klart!',d:'Allergin visas med en röd markering på raden och följer med till köket på bongen och i KDS.',next:1}]},
 {ch:'Inställningar',x:1,id:'x-rabattknapp',title:'Skapa en rabattknapp',steps:[
  {el:'mystore',d:'Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-discbtns',d:'Under Settings: tryck <b>Discount buttons</b>.',on:'open:discbtns'},
  {el:'disc-new',d:'Tryck <b>Create discount button</b>.',on:'open:discnew'},
  {el:'in-dname',d:'Skriv namnet <b>Lunch</b>.',type:'Lunch'},
  {el:'npad',sel:'#pos .modal .npad',allow:'#pos .modal .npad,#pos .modal .seg',d:'<b>Percentage</b> är förvalt (växla till <b>Amount</b> för kronor). Knappa in <b>20</b> på knappsatsen.',until:()=>UI.f.dbv==='20',fill:()=>{UI.f.dbv='20'}},
  {el:'disc-save',d:'Tryck <b>Save discount</b>.',on:'discbtn:save'},
  {t:'Klart!',d:'Knappen finns nu i rabattdialogen för både artikel och hela köpet. Max 8 knappar.',next:1}]},
 {ch:'Kassa',x:1,id:'x-kontanter',title:'Lägg in och ta ut kontanter',steps:[
  {el:'mystore',d:'Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-drawer',d:'Tryck på <b>Cash Drawer</b>.',on:'open:drawer'},
  {el:'drawer-add',d:'Du har hämtat växel från banken. Tryck <b>Add Cash</b>.',on:'open:drawermove'},
  {el:'npad',sel:'#pos .modal .npad',allow:'#pos .modal .npad',d:'Knappa in <b>200</b>.',until:()=>UI.f.amt==='200',fill:()=>{UI.f.amt='200'}},
  {el:'in-dnote',d:'Skriv en anteckning, till exempel <b>Växel</b>.',type:'Växel'},
  {el:'drawer-ok',d:'Tryck <b>Update cash balance</b>.',on:'drawer:move'},
  {el:'drawer-kick',d:'<b>Open Drawer</b> öppnar lådan utan att något säljs. Tryck på den.',on:'drawer:kick'},
  {el:'drawer-close',d:'<b>Close Balance</b> räknar av lådan och visar en eventuell differens. Oftast räcker det med Z-rapporten, som stänger kassan.',next:1},
  {t:'Klart!',d:'Insättningar och uttag syns under <b>Händelser</b> och i Z-rapporten.',next:1}]},
 {ch:'Inställningar',x:1,id:'x-kampanj',title:'Skapa en kampanj',pre:()=>{kaffebar();S.promotions=S.promotions.filter(p=>p.name!=='Fikarea')},steps:[
  {el:'mystore',d:'Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-promotions',d:'Tryck <b>Promotions</b>.',on:'open:promotions'},
  {el:'promo-auto',d:'Tryck <b>Add automatic promotion</b>. Automatiska kampanjer läggs på av sig själva i kassan.',on:'open:promoform'},
  {el:'in-prname',d:'Ge kampanjen ett namn, t.ex. <b>Fikarea</b>.',type:'Fikarea'},
  {el:'in-prp',d:'Typen är <b>Discount</b> i procent. Skriv <b>20</b> för 20 % rabatt.',type:'20'},
  {el:'promo-items',d:'Välj vilka artiklar kampanjen gäller. Tryck <b>Items or groups included</b>.',on:'open:promoitems'},
  {el:'pi-g-bakverk',d:'Bocka i gruppen <b>Bakverk</b>. Med pilen kan du i stället välja enskilda produkter.',on:'promo:item',allow:'#pos .modal .ex,#pos .modal input'},
  {el:'pi-ok',d:'Tryck <b>Save</b>.',on:'promo:items'},
  {el:'in-prmin',d:'Kampanjen ska bara gälla vid köp över ett visst belopp. Skriv <b>60</b>.',type:'60'},
  {el:'promo-save',allow:'#pos .modal .tog,#pos .modal .wdc button,#pos .modal .vchk,#pos .modal input,#pos .modal [data-a="prunit"]',d:'Här ställer du också in datum, tid på dygnet, veckodagar och om kampanjen får kombineras med andra. Tryck <b>Create promotion</b>.',on:'promo:save'},
  {el:'m-close',d:'Kampanjen ligger överst i listan. Stäng My Store.',until:()=>!UI.modal},
  {el:'tile-kanelbulle',d:'Sälj en <b>Kanelbulle</b>.',on:'add'},
  {el:'promo-details',d:'Kassan visar att artikeln ingår i en kampanj. Tryck <b>Show details</b>.',on:'open:promodet'},
  {el:'pd-ok',d:'Här ser du villkoren och hur mycket som saknas till minimibeloppet. Tryck <b>OK</b>.',on:'promo:details'},
  {el:'tile-kanelbulle',d:'Sälj en <b>Kanelbulle</b> till så att köpet når 60 kr.',until:()=>promoCalc().lines.some(l=>l[0]==='Fikarea')},
  {t:'Klart!',d:'Rabatten läggs på automatiskt och syns som en lila rad i varukorgen. Kampanjen kan pausas eller tas bort under <b>My Store → Promotions</b>.',next:1}]},
 {ch:'Inställningar',x:1,id:'x-tillval',title:'Skapa en tillvalsgrupp',steps:[
  {el:'mystore',d:'Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-catalog',d:'Tryck <b>Product Catalog</b>.',on:'open:catalog'},
  {el:'cat-mod',d:'Tryck <b>Manage modifiers</b>.',on:'open:modifiers'},
  {el:'mod-new',d:'Tryck <b>Create new modifier set</b>.',on:'open:modform'},
  {el:'in-mname',d:'Skriv namnet <b>Sirap</b>.',type:'Sirap'},
  {el:'in-oname',d:'Lägg till ett tillval. Skriv <b>Kola</b>.',type:'Kola'},
  {el:'in-oprice',d:'Pris: skriv <b>5</b>.',type:'5'},
  {el:'mod-optadd',d:'Tryck <b>Add modifier</b>.',on:'modset:opt'},
  {el:'mod-save',allow:'#pos .modal .algrow,#pos .modal .tog,#pos .modal [data-a="mfmax"]',d:'Bocka gärna i vilka produkter tillvalet gäller under <b>Linked products</b>. Tryck <b>Save</b>.',on:'modset:save'},
  {t:'Klart!',d:'När du säljer en kopplad produkt frågar kassan efter tillvalet.',next:1}]},
 {ch:'Inställningar',x:1,id:'x-magicmenu',title:'Skapa produkter från en meny (Magic Menu)',steps:[
  {el:'mystore',d:'Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-catalog',d:'Tryck <b>Product Catalog</b>.',on:'open:catalog'},
  {el:'cat-magic',d:'Tryck <b>Magic Menu</b>.',on:'open:magic'},
  {el:'magic-add',d:'Tryck <b>+</b> och fotografera menyn. I demon används en exempelmeny.',on:'mm:photo'},
  {el:'magic-go',d:'Tryck <b>Upload Menu</b>.',on:'mm:read'},
  {el:'mm-cat-forratter',d:'Menyn är uppdelad i kategorier som blir produktgrupper. Tryck <b>Förrätter</b>.',on:'open:mmgroup'},
  {el:'mm-check',allow:'#pos .modal input,#pos .modal [data-a="mmvat"],#pos .modal .trash',d:'Kontrollera namn, skattegrupp och priser. Ta bort det som inte ska med. Tryck <b>Check</b>.',on:'mm:check'},
  {el:'mm-create',sel:()=>{if(UI.modal&&mtop().p==='mmgroup')return '#pos [data-g="mm-check"]';const c=UI.f.mm&&UI.f.mm.cats.find(c=>!c.ok);return c?`#pos [data-g="mm-cat-${slug(c.name)}"]`:'#pos [data-g="mm-create"]'},t:'Kontrollera resten',d:'Gör likadant med de andra kategorierna: öppna den markerade och tryck <b>Check</b>. När alla har en grön bock går guiden vidare.',allow:'#pos .modal',until:()=>UI.f.mm&&UI.f.mm.cats.length&&UI.f.mm.cats.every(c=>c.ok)&&mtop().p==='mmmenu'},
  {el:'mm-create',d:'Tryck <b>Create groups and products</b>.',on:'magic'},
  {t:'Klart!',d:'Produktgrupperna ligger nu som flikar i kassan med alla produkter och priser. Justera gärna färger och startsidor under <b>Edit</b>.',next:1}]},
 {ch:'Försäljning',x:1,id:'x-kvittokopia',title:'Skicka en kvittokopia',pre:()=>{kaffebar();if(!S.orders.length){S.orders.unshift({id:'DEMO-0001',at:now(),total:64,items:[{pid:'p1',name:'Bryggkaffe',price:32,qty:1,disc:0},{pid:'p13',name:'Croissant',price:32,qty:1,disc:0}],history:[{at:now(),items:[{name:'Bryggkaffe',price:32,qty:1,disc:0},{name:'Croissant',price:32,qty:1,disc:0}],method:'Kontokort',paid:64}]});save()}},steps:[
  {el:'mystore',d:'Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'ms-orders',d:'Tryck <b>Order History</b>.',on:'open:orders'},
  {el:'order-0',d:'Välj ordern. Du kan söka på ordernummer eller filtrera på datum.',on:'open:order'},
  {el:'receipt-copy',d:'Tryck <b>Receipt Copy</b>.',on:'open:receipt'},
  {el:'rcc-sms',d:'Välj hur kunden vill ha kvittot: SMS, e-post eller utskrift. Tryck <b>SMS</b>.',on:'open:rcsend'},
  {el:'in-rcto',d:'Skriv kundens nummer, t.ex. <b>0701234567</b>.',type:'0701234567'},
  {el:'rcc-send',d:'Tryck <b>Send</b>.',on:'rcopy:send'},
  {t:'Klart!',d:'Kvittokopian skickas direkt. Samma vy används för returer: tryck <b>Select items to return</b> på ordern.',next:1}]},
 {ch:'Personal och rapporter',x:1,id:'x-personalliggare',title:'Stämpla in och ut i personalliggaren',steps:[
  {el:'mystore',d:'Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-time',d:'Tryck <b>Time Tracking</b>.',on:'open:pin'},
  {el:'modal-pin',allow:'.npad,.pin',d:'Time Tracking kräver behörighet. Ange Ägarens PIN <b>1234</b>.',on:'open:timetrack'},
  {el:'modal-timetrack',allow:'.npad,.pin',d:'Nu stämplar personalen in. Ange Baristans PIN <b>0000</b>.',on:'open:ttconfirm'},
  {el:'tt-start',d:'Kassan visar vem PIN-koden tillhör och att hon inte är instämplad. Tryck <b>Start shift</b>.',on:'shift:in'},
  {el:'modal-timetrack',allow:'.npad,.pin',d:'Passet har startat. När dagen är slut stämplar baristan ut med samma PIN. Ange <b>0000</b> igen.',on:'open:ttconfirm'},
  {el:'tt-end',d:'Nu visas när passet startade och hur länge det har pågått. Tryck <b>End shift</b>.',on:'shift:out'},
  {t:'Klart!',d:'Passet är avslutat. In- och utstämplingen hamnar i personalliggaren, som du skriver ut med <b>Print</b> eller ser i Backstage under Personalliggare. Den visas för Skatteverket vid kontrollbesök.',next:1}]},
 {ch:'Personal och rapporter',x:1,id:'x-xrapport',title:'Ta en X-rapport',steps:[
  {el:'mystore',d:'Öppna <b>My Store</b>.',on:'open:ms'},
  {el:'row-reports',d:'Tryck <b>Reports &amp; Analytics</b>.',on:'open:reports'},
  {el:'rep-x',d:'Tryck <b>Current daily sales (X-report)</b>.',on:'open:xrep'},
  {el:'x-create',allow:'#pos .modal .row',d:'Välj Print, Email eller Show on Screen och tryck <b>Create Report</b>.',on:'x:create'},
  {t:'Klart!',d:'X-rapporten visar dagens försäljning utan att stänga dagen. Den kan tas hur många gånger som helst, till skillnad från Z-rapporten.',next:1}]},
];

/* pay-card steps work with or without quick-pay buttons (default: none) */
TOURS.forEach(t=>t.steps.forEach(st=>{if(st.el==='pay-card'&&!st.sel){st.sel=()=>document.querySelector('#pos [data-g="pay-card"]')?'#pos [data-g="pay-card"]':UI.pop==='pay'?'#pos [data-g="pm-card"]':'#pos [data-g="allpay"]';
 st.d=st.d.replace(/<b>Kontokort<\/b>/,'<b>Kontokort</b> (finns det ingen snabbknapp: tryck <b>ALL PAYMENTS</b> och välj Kontokort)')}}));
/* ── engine ── */
const TK='yabie-webbkassa-tours';
let TS=(()=>{try{return JSON.parse(localStorage.getItem(TK))||{done:{},choice:{}}}catch(e){return {done:{},choice:{}}}})();
const tsave=()=>{try{localStorage.setItem(TK,JSON.stringify(TS))}catch(e){}};
let T=null;let mode='free';
const stepsOf=t=>t.steps.filter(s=>!s.when||Object.entries(s.when).every(([k,v])=>TS.choice[k]===v));
const tourEl=document.getElementById('tour');
function startTour(id){
  const t=TOURS.find(x=>x.id===id);if(!t)return;if(appOf(t)!==APP()){TS.app=appOf(t);tsave();window.appSync&&appSync()}if(t.x&&!unlocked())return;
  if(appOf(t)==='mob'&&window.MOB)MOB.init();
  if(!t.x&&appOf(t)==='pos'&&!hwSet()){stopTour();askHw(()=>startTour(id));return}
  if(UI.edit){const o=JSON.parse(UI.edit);S.startPages=o.sp;S.showGroups=o.sg;UI.edit=null}
  Object.assign(UI,{modal:null,pop:null,more:false,busy:null,num:'',sel:null,f:{},online:null,tables:null,search:null});
  if(C().ret||C().items.length){S.cart=newCart();S.cart.takeaway=S.other.defaultTakeaway}
  kaffebar();if(appOf(t)==='pos'&&S.drawer&&!t.float0&&S.drawer.float==null)S.drawer.float=500;t.pre&&t.pre();save();
  T={t,i:0};setMode('guide');render();show();
}
function cur(){return T&&stepsOf(T.t)[T.i]}
function advance(){if(!T)return;const n=stepsOf(T.t).length;if(T.i<n-1){T.i++;show();checkUntil()}else finishTour()}
function finishTour(){const t=T.t;window.phoneHide&&phoneHide();window.devHide&&devHide();termHide(1);t.__wasDone=courseDone();TS.done[t.id]=1;tsave();T=null;tourEl.innerHTML='';list();
  const core=CORE(),k=core.indexOf(t);let h3,p,btn='';
  if(!t.x){const nx=nextCore();
    if(!nx&&!t.__wasDone){h3=GU('u.courseDone');p=GU('u.courseDoneQ',core.length,EXTRA().length);btn=`<button class="pbtn pri" data-tour="${EXTRA()[0].id}">${GU('u.firstNew',esc(GT(EXTRA()[0].title)))}</button>`}
    else{h3=GU('u.partDone',k+1,core.length);p=GU('u.wellDoneT',esc(GT(t.title)));const n2=nx||core[k+1];if(n2)btn=`<button class="pbtn pri" data-tour="${n2.id}">${GU('u.contPart',core.indexOf(n2)+1,esc(GT(n2.title)))}</button>`}}
  else{const nx=EXTRA().find(x=>!TS.done[x.id]);h3=GU('u.xDone',esc(GT(t.title)));p=GU('u.wellDone');if(nx)btn=`<button class="pbtn pri" data-tour="${nx.id}">${GU('u.nextT',esc(GT(nx.title)))}</button>`}
  tourEl.innerHTML=`<div class="win" ${GDIR()}><div><div class="ic">✓</div><h3>${h3}</h3><p>${p}</p><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${btn}<button class="pbtn" data-wclose>${GU('u.free')}</button></div></div></div>`;}
function stopTour(){T=null;tourEl.innerHTML='';list();window.phoneHide&&phoneHide();window.devHide&&devHide();termHide(1)}
/* 3D terminal next to the POS for guides that set a920 */
function termPane(){return document.getElementById('termpane')}
function termSync(){const t=T&&T.t,pane=termPane();if(t&&t.phone){window.phoneShow&&phoneShow()}else{window.phoneHide&&phoneHide()}if(t&&t.dev){window.devShow&&devShow(t.dev);const s0=cur();if(s0&&s0.scr&&window.devState)devState(s0.scr)}else{window.devHide&&devHide()}if(!pane)return;if(!t||!t.a920){termHide();return}
  const fr=pane.querySelector('iframe');if(!fr.getAttribute('src'))fr.setAttribute('src','a920.html?term=1&lang=sv');
  if(pane.hidden){pane.hidden=false;document.getElementById('stage').classList.add('with-term');fit()}
  const msg={a920:t.a920[T.i],pill:(cur().ph||'')+' · Steg '+(T.i+1)+' av '+stepsOf(t).length};pane._last=msg;try{fr.contentWindow.postMessage(msg,'*')}catch(e){}}
function termHide(force){const st0=document.getElementById('stage');const ph=document.getElementById('phonepane');let ch=false;if(st0.style.paddingBottom&&(force||!ph||ph.hidden)){st0.style.paddingBottom='';ch=true}const pane=termPane();if(!pane||pane.hidden){if(ch)fit();return}pane.hidden=true;document.getElementById('stage').classList.remove('with-term');fit()}
addEventListener('message',e=>{if(e.data&&e.data.a920ready){const pane=termPane();if(pane&&pane._last)pane.querySelector('iframe').contentWindow.postMessage(pane._last,'*')}});
/* in guides with the 3D terminal the step card sits in its own strip below the POS and terminal */
function dockBub(bub,el,ring){const pane=T&&T.t.phone?document.getElementById('phonepane'):T&&T.t.dev?document.getElementById('devpane'):termPane();if(!T||!(T.t.a920||T.t.phone||T.t.dev)||!pane||pane.hidden)return false;
  const st=document.getElementById('stage');bub.classList.add('dock');
  const sr=st.getBoundingClientRect();bub.style.width=Math.min(sr.width-32,980)+'px';const bh=bub.offsetHeight;
  const want=Math.round(bh+30)+'px';if(st.style.paddingBottom!==want){st.style.paddingBottom=want;fit();return true}
  bub.style.left=(sr.left+(sr.width-bub.offsetWidth)/2)+'px';bub.style.top=(sr.bottom-bh-14)+'px';
  if(el){ensureVisible(el);const r=el.getBoundingClientRect(),p=6;ring.style.cssText=`left:${r.left-p}px;top:${r.top-p}px;width:${r.width+2*p}px;height:${r.height+2*p}px`}
  else if(T.t.a920){const d=pane.getBoundingClientRect();ring.style.cssText=`left:${d.left}px;top:${d.top}px;width:${d.width}px;height:${d.height}px;display:none`}
  else{const d=document.getElementById('device').getBoundingClientRect();ring.style.cssText=`left:${d.left}px;top:${d.top}px;width:${d.width}px;height:${d.height}px;display:none`}
  return true}
function target(s){if(!s||!s.el)return null;const q=typeof s.sel==='function'?s.sel():s.sel;return q?document.querySelector(q):document.querySelector(`#pos [data-g="${s.el}"]`)}
function show(){
  const s=cur();if(!s){stopTour();return}
  termSync();
  const steps=stepsOf(T.t),k=T.i;
  const el=target(s);
  let body=`<div class="k"><span>${T.t.x?'':GU('u.coursePart',CORE().indexOf(T.t)+1,CORE().length)}<bdi>${esc(GT(T.t.title))}</bdi></span><span>${k+1} / ${steps.length}</span></div>${s.t?`<h5><bdi>${esc(GT(s.t))}</bdi></h5>`:''}${s.d?`<div class="dtx">${GT(s.d)}</div>`:''}`;
  if(s.choice)body+=`<p><b>${esc(GT(s.choice.q))}</b></p><div class="ch">${s.choice.opts.map(o=>`<button data-choice="${o[0]}">${esc(GT(o[1]))}${o[2]?`<small>${esc(GT(o[2]))}</small>`:''}</button>`).join('')}</div>`;
  const acts=[];
  if(s.next)acts.push(`<button class="pbtn pri" data-tnext>${k===steps.length-1?GU('u.finish'):GU('u.next')}</button>`);
  if(s.type)acts.push(`<button class="pbtn" data-fill>${GU('u.fill')}</button>`,`<button class="pbtn pri" data-tnext ${s.optional||(UI.f[s.el.slice(3)]||'').trim()?'':'disabled'} id="typeok">${GU('u.done')}</button>`);
  if(s.fill)acts.push(`<button class="pbtn" data-fill>${GU('u.fill')}</button>`);
  if(s.el&&!el)body+=`<p style="color:#b26a00">${GU('u.missing')}</p>`,acts.push(`<button class="pbtn" data-restart>${GU('u.restart')}</button>`);
  acts.push(`<button class="lnk" data-tstop>${GU('u.stop')}</button>`);
  tourEl.innerHTML=`<div class="ring" id="ring" style="display:none"></div><div class="bub" id="bub" role="dialog" aria-live="polite" ${GDIR()}>${body}<div class="act">${acts.join('')}</div></div>`;
  if(T.t.a920||T.t.phone||T.t.dev)document.getElementById('bub').classList.add('g-a920');
  place();
}
function place(){
  if(!T)return;const s=cur(),el=target(s),ring=document.getElementById('ring'),bub=document.getElementById('bub');if(!bub)return;
  if(dockBub(bub,el,ring))return;
  const vw=innerWidth,vh=innerHeight,bw=bub.offsetWidth,bh=bub.offsetHeight;
  if(!el){const pos=document.getElementById('screen').getBoundingClientRect();bub.style.left=Math.max(16,Math.min(vw-bw-16,pos.left+pos.width/2-bw/2))+'px';bub.style.top=Math.max(16,pos.top+pos.height/2-bh/2)+'px';
    {const tp=document.getElementById('termpane');if(tp&&!tp.hidden&&vw<=860)bub.style.top=Math.max(16,vh-bh-16)+'px'}
    ring.style.cssText=`left:${pos.left}px;top:${pos.top}px;width:${pos.width}px;height:${pos.height}px;display:none`;return}
  ensureVisible(el);
  const r=el.getBoundingClientRect(),p=6;
  ring.style.cssText=`left:${r.left-p}px;top:${r.top-p}px;width:${r.width+2*p}px;height:${r.height+2*p}px`;
  let x,y;
  if(r.right+16+bw<vw-8){x=r.right+18;y=r.top+r.height/2-bh/2}
  else if(r.left-18-bw>8){x=r.left-18-bw;y=r.top+r.height/2-bh/2}
  else if(r.bottom+16+bh<vh-8){x=r.left+r.width/2-bw/2;y=r.bottom+18}
  else{x=r.left+r.width/2-bw/2;y=r.top-18-bh}
  bub.style.left=Math.max(8,Math.min(vw-bw-8,x))+'px';bub.style.top=Math.max(8,Math.min(vh-bh-8,y))+'px';
}
/* scroll the target into view inside its scrolling container (modal body, lists) */
function ensureVisible(el){let sc=el.parentElement;while(sc&&sc.id!=='pos'){const cs=getComputedStyle(sc);if(/(auto|scroll)/.test(cs.overflowY)&&sc.scrollHeight>sc.clientHeight+2){const a=el.getBoundingClientRect(),b=sc.getBoundingClientRect();if(a.top<b.top+4||a.bottom>b.bottom-4){sc.scrollTop+=(a.top-b.top-(b.height-a.height)/2)/(b.height/sc.offsetHeight||1)}}if(/(auto|scroll)/.test(cs.overflowX)&&sc.scrollWidth>sc.clientWidth+2){const a=el.getBoundingClientRect(),b=sc.getBoundingClientRect();if(a.left<b.left+4||a.right>b.right-4){sc.scrollLeft+=(a.left-b.left-(b.width-a.width)/2)/(b.width/sc.offsetWidth||1)}}sc=sc.parentElement}}
document.getElementById('pos').addEventListener('scroll',()=>{if(T)requestAnimationFrame(place)},true);
function advAt(i,ms){setTimeout(()=>{if(T&&T.i===i)advance()},ms)}
function checkUntil(){const s=cur();if(s&&s.until&&s.until())advAt(T.i,250)}
function shake(){const b=document.getElementById('bub');if(!b)return;b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake')}
on((ev,d)=>{
  if(!T)return;const s=cur();if(!s)return;
  if(ev==='render'){if(s.el)show();else place();checkUntil();return}
  if(ev==='input'&&s.type){const ok=document.getElementById('typeok');if(ok)ok.disabled=!s.optional&&!d.v.trim();if(d.v.trim().toLowerCase()===s.type.toLowerCase())advAt(T.i,350);return}
  if(s.on&&ev===s.on)advAt(T.i,120);
});
/* block clicks outside the highlighted element while a guide runs */
document.getElementById('pos').addEventListener('click',e=>{
  if(!T)return;const s=cur();if(!s)return;
  const el=target(s);
  const ok=el&&(el.contains(e.target)||(s.allow&&e.target.closest(s.allow)));
  if(!ok){e.stopPropagation();e.preventDefault();shake()}
},true);
document.getElementById('stage').addEventListener('click',e=>{
  if(!T||!e.target.closest('#phonepane,#devpane'))return;const s=cur();if(!s)return;
  const el=target(s);const ok=el&&(el.contains(e.target)||(s.allow&&e.target.closest(s.allow)));
  if(!ok){e.stopPropagation();e.preventDefault();shake()}
},true);
window.tourPlace=()=>{if(window.__tpq)return;window.__tpq=1;requestAnimationFrame(()=>{window.__tpq=0;if(T)place()})};
on((ev)=>{if(T&&(ev.startsWith('ph:')||ev.startsWith('online:')||ev.startsWith('a30:')||ev.startsWith('kds:'))){const s=cur();if(s&&s.until)checkUntil()}});
tourEl.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.tour){tourEl.innerHTML='';startTour(b.dataset.tour);return}
  if('wclose' in b.dataset){tourEl.innerHTML='';setMode('free');return}
  if('tnext' in b.dataset){advance();return}
  if('tstop' in b.dataset){stopTour();return}
  if('restart' in b.dataset){startTour(T.t.id);return}
  if('fill' in b.dataset){const s=cur();if(s.type){const k=s.el.slice(3);UI.f[k]=s.type;render();emit('input',{k,v:s.type})}else{s.fill();render()}return}
  if(b.dataset.choice){const s=cur();TS.choice[s.choice.key]=b.dataset.choice;tsave();advance();return}
});
addEventListener('resize',()=>T&&place());

/* ── shell ── */
function setMode(m){mode=m;document.getElementById('m-free').setAttribute('aria-pressed',m==='free');document.getElementById('m-guide').setAttribute('aria-pressed',m==='guide');if(m==='free'&&T)stopTour();list()}
/* hardware picker: the core course only includes hardware the user actually has */
const HW=[{id:'hw-terminal',ic:'💳',t:'Kortterminal Swedbank Pax (A30)',d:'Terminal kopplad till kassan via nätverket'},
 {id:'hw-swedbank-cloud',ic:'☁️',t:'Swedbank Cloud-terminal (A920Pro)',d:'Trådlös terminal som paras med en kod'},
 {id:'hw-skrivare',ic:'🧾',t:'Kvittoskrivare',d:'Skriver ut kvitton och bongar'},
 {id:'hw-star-wifi',ic:'🎫',t:'Bongskrivare (Star TSP143IV)',d:'Skriver ut bongar i köket, kopplas via Wi-Fi'},
 {id:'hw-kassalada',ic:'💰',t:'Kassalåda',d:'Öppnas vid kontantbetalning'},
 {id:'hw-kundskarm',ic:'🖥️',t:'Kundskärm',d:'Skärm som vänds mot kunden (Yabie Screen)'},
 {id:'hw-kds',ic:'🍳',t:'Köksskärm (KDS)',d:'Visar ordrar i köket'},
 {id:'online-order',ic:'📱',t:'Onlineorder',d:'Kunder beställer och betalar i mobilen via QR-kod eller webbshop',sec:'Tjänster'}];
const hwSet=()=>Array.isArray(TS.hw)&&TS.hwv===2;
const hwOn=t=>!HW.some(h=>h.id===t.id)||!hwSet()||TS.hw.includes(t.id);
function askHw(then){const sel=new Set(Array.isArray(TS.hw)?TS.hw:[]);const opt=h=>`<button class="hwo ${sel.has(h.id)?'on':''}" data-hw="${h.id}"><span class="hi">${h.ic}</span><span class="ht"><b>${esc(GT(h.t))}</b><small>${esc(GT(h.d))}</small></span><span class="hc"></span></button>`;
 const draw=()=>{tourEl.innerHTML=`<div class="win hwpick" ${GDIR()}><div><h3>${GU('u.hwQ')}</h3><p>${GU('u.hwP')}</p>
  <div class="hwsec">${GU('u.hw')}</div><div class="hwl">${HW.filter(h=>!h.sec).map(opt).join('')}</div>
  <div class="hwsec">${GU('u.svc')}</div><div class="hwl">${HW.filter(h=>h.sec).map(opt).join('')}</div>
  <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:16px">${sel.size?`<button class="pbtn" data-hwnone>${GU('u.none')}</button>`:''}<button class="pbtn pri" data-hwok>${sel.size?GU('u.contWith',sel.size):GU('u.contWithout')}</button></div></div></div>`};
 draw();const box=tourEl.firstElementChild;
 const fin=()=>{TS.hw=HW.map(h=>h.id).filter(id=>sel.has(id));TS.hwv=2;tsave();tourEl.innerHTML='';list();then&&then()};
 box.onclick=e=>{const o=e.target.closest('[data-hw]');if(o){sel.has(o.dataset.hw)?sel.delete(o.dataset.hw):sel.add(o.dataset.hw);draw();tourEl.firstElementChild.onclick=box.onclick;return}
  if(e.target.closest('[data-hwnone]')){sel.clear();fin();return}if(e.target.closest('[data-hwok]'))fin()};}
window.askHw=askHw;
const appOf=t=>t.app||'pos',APP=()=>TS.app||'pos';window.APP=APP;
const CORE=()=>TOURS.filter(t=>!t.x&&hwOn(t)&&appOf(t)===APP()),EXTRA=()=>TOURS.filter(t=>t.x&&!t.hide&&appOf(t)===APP());
const coreDone=()=>CORE().filter(t=>TS.done[t.id]).length;
const unlocked=()=>true;const courseDone=()=>coreDone()>=CORE().length;
const nextCore=()=>CORE().find(t=>!TS.done[t.id]);
function list(){
  const g=document.getElementById('glist');const core=CORE(),n=core.length,d=coreDone(),nx=nextCore();
  let h=mode==='free'&&APP()==='mob'?`<div class="free-intro">${GU('u.freeMob',window.MOB?MOB.dev().t:'')}</div>`:mode==='free'&&APP()==='bs'?`<div class="free-intro">${GU('u.freeBs')}</div>`:mode==='free'?`<div class="free-intro">${GU('u.freePos')}</div>`:'';
  h+=`<div class="course"><div class="ct"><b>${APP()==='bs'?GU('u.courseBs'):APP()==='mob'?GU('u.courseMob'):GU('u.coursePos')}</b><span>${GU('u.progress',d,n)}</span></div><div class="pbar"><i style="width:${Math.round(d/n*100)}%"></i></div>${APP()==='mob'&&window.MOB?`<div class="hwline">${GU('u.device',MOB.dev().t)} · <button data-mobdev>${GU('u.changeDev')}</button></div>`:hwSet()&&APP()==='pos'?`<div class="hwline">${GU('u.equip',TS.hw.length?GU('u.nSel',TS.hw.length):GU('u.noneSel'))} · <button data-hwedit>${GU('u.change')}</button></div>`:''}
   <button class="pbtn pri" data-start="${(nx||core[0]).id}">${d===0?GU('u.startCourse'):nx?GU('u.contN',core.indexOf(nx)+1):GU('u.again')}</button></div>`;
  let ch='';core.forEach((t,k)=>{if(t.ch!==ch){ch=t.ch;h+=`<div class="gch">${esc(GT(ch))}</div>`}
    const ok=true;h+=`<button class="gi ${TS.done[t.id]?'done':''} ${ok?'':'lockd'}" aria-current="${T&&T.t.id===t.id}" ${ok?`data-start="${t.id}"`:'disabled'}><span class="d"></span><span class="num">${k+1}.</span><bdi>${esc(GT(t.title))}</bdi></button>`});
  h+=`<div class="gch xh">${GU('u.more')} ${unlocked()?'':'<span class="lk">🔒</span>'}</div>`;
  if(!unlocked())h+=`<div class="lockmsg">${GU('u.locked',d,n)}</div>`;
  ch='';EXTRA().forEach(t=>{if(t.ch!==ch){ch=t.ch;h+=`<div class="gsub">${esc(GT(ch))}</div>`}
    h+=unlocked()?`<button class="gi ${TS.done[t.id]?'done':''}" aria-current="${T&&T.t.id===t.id}" data-start="${t.id}"><span class="d"></span><bdi>${esc(GT(t.title))}</bdi></button>`:`<button class="gi lockd" disabled><span class="lk2">🔒</span><bdi>${esc(GT(t.title))}</bdi></button>`});
  g.innerHTML=h;g.setAttribute('dir',GRTL()?'rtl':'ltr');window.gChrome&&gChrome();
}

document.getElementById('glist').addEventListener('click',e=>{if(e.target.closest('[data-mobdev]')){stopTour();MOB.askDev();return}if(e.target.closest('[data-hwedit]')){stopTour();askHw();return}const b=e.target.closest('[data-start]');if(b){document.getElementById('side').classList.remove('open');startTour(b.dataset.start)}});
document.getElementById('m-free').onclick=()=>setMode('free');
document.getElementById('m-guide').onclick=()=>{setMode('guide');if(!T){const n=nextCore()||(EXTRA().find(t=>!TS.done[t.id]))||CORE()[0];startTour(n.id)}};
document.getElementById('reset').onclick=()=>{stopTour();TS={done:{},choice:{}};tsave();resetAll();list()};
document.getElementById('menu').onclick=()=>document.getElementById('side').classList.toggle('open');

wire();curTab();render();fit();list();
const hs=location.hash.slice(1);if(TOURS.find(t=>t.id===hs))startTour(hs);
