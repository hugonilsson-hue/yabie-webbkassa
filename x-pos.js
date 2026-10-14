/* Fler guider för iPad-kassan. */
(()=>{
const add=t=>{t.app='pos';t.x=1;let i=-1;TOURS.forEach((x,k)=>{if(appOf2(x)==='pos'&&x.x&&x.ch===t.ch&&!x.hide)i=k});if(i<0)TOURS.push(t);else TOURS.splice(i+1,0,t)};
const appOf2=t=>t.app||'pos';
const done=d=>({t:'Klart!',d,next:1});
const cart=(...names)=>()=>{kaffebar();names.forEach(n=>{const p=S.products.find(x=>x.name===n);if(p)C().items.push({pid:p.id,name:p.name,price:p.price,qty:1,disc:0,mods:[]})});save()};
const swishOn=()=>{const p=S.payments.find(x=>x.id==='swish');if(p)p.enabled=true};

add({ch:'Försäljning',id:'x-swish',title:'Ta betalt med Swish',pre:()=>{cart('Cappuccino')();swishOn();save()},steps:[
 {el:'allpay',d:'Kunden vill betala med Swish. Tryck <b>ALL PAYMENTS</b>.',on:'allpay'},
 {el:'pm-swish',d:'Välj <b>Swish</b>.',on:'open:swish'},
 {el:'swish-ok',d:'Kassan visar en QR-kod som kunden skannar i Swish-appen och väntar tills betalningen är klar. Tryck <b>Simulera att kunden betalar</b>.',on:'paid'},
 {el:'rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'receipt:skip'},
 done('Swish-betalningen är registrerad. Med Swish Handel kopplas betalningen till kassan och returer går automatiskt tillbaka till kundens Swish. Swish Handel ställer du in i Backstage under Betalningar → Betalsätt.')]});

add({ch:'Försäljning',id:'x-dela-belopp',title:'Dela notan på belopp',pre:cart('Cappuccino','Räksmörgås'),steps:[
 {el:'functions',d:'Två gäster delar på notan på 164 kr. Den första vill betala 100 kr. Tryck <b>Functions</b>.',on:'functions'},
 {el:'ft-splitamount',d:'Tryck <b>Split by amount</b>.',on:'open:splitamt'},
 {el:'sa-pad',sel:'#pos .spamt .npad',allow:'#pos .spamt',d:'Knappa in <b>100</b>. Knappen <b>Max</b> fyller i allt som är kvar.',until:()=>UI.f.sa==='100',fill:()=>{UI.f.sa='100';render()}},
 {el:'sa-charge',d:'Tryck <b>Charge</b>.',on:'open:selpay'},
 {el:'sp-swish',d:'Första gästen betalar med Swish. Tryck <b>Swish</b>.',on:'open:swish'},
 {el:'swish-ok',d:'Tryck <b>Simulera att kunden betalar</b>.',on:'split:part'},
 {el:'part-next',d:'100 kr är betalt och 64 kr är kvar. Tryck <b>Nästa betalning</b>.',on:'split:next'},
 {el:'allpay',d:'Andra gästen betalar resten. Tryck <b>Charge</b>.',on:'allpay'},
 {el:'pm-card',d:'Välj <b>Kontokort</b>.',on:'paid'},
 {el:'rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'receipt:skip'},
 done('Notan är betald i två delar och båda betalningarna syns på samma order. Vill varje gäst betala för sina egna varor använder du <b>Split by items</b> under Functions.')]});

add({ch:'Försäljning',id:'x-oppenretur',title:'Öppen retur utan kvitto',pre:()=>{kaffebar();save()},steps:[
 {t:'Öppen retur',d:'Öppen retur används när köpet inte går att hitta i orderhistoriken, till exempel när kunden saknar kvitto. Varukorgen ska vara tom.',next:1},
 {el:'functions',d:'Tryck <b>Functions</b>.',on:'functions'},
 {el:'ft-openreturn',d:'Tryck <b>Open return</b>.',on:'open:pin'},
 {el:'modal-pin',allow:'.npad,.pin',d:'Returer kräver behörighet. Ange Ägarens PIN <b>1234</b>.',on:'open:openret'},
 {el:'or-kanelbulle',sel:()=>`#pos [data-a="openretadd"][data-x="${S.products.find(p=>p.name==='Kanelbulle').id}"]`,d:'Välj produkten som lämnas tillbaka. Tryck <b>Kanelbulle</b>.',until:()=>C().items.some(i=>i.qty<0)},
 {el:'allpay',d:'Returen ligger i varukorgen med minusbelopp. Tryck <b>ALL PAYMENTS</b>.',on:'allpay'},
 {el:'pm-card',d:'Välj hur pengarna ska betalas tillbaka. Tryck <b>Kontokort</b>.',on:'paid'},
 {el:'rc-skip',d:'Tryck <b>Skip receipt</b>.',on:'receipt:skip'},
 done('Returen är registrerad. Hittar du köpet i orderhistoriken ska du i stället göra returen därifrån, så att pengarna går tillbaka till samma betalsätt.')]});

add({ch:'Personal och rapporter',id:'x-kassor',title:'Kassörinloggning',pre:()=>{kaffebar();S.cashierMode=false;S.cashier=null;save()},steps:[
 {el:'mystore',d:'Med kassörhantering loggar varje kassör in med sin PIN, så att du ser vem som har gjort varje köp. Öppna <b>My Store</b>.',on:'open:ms'},
 {el:'row-cashiers',d:'Tryck <b>Cashier Management</b>.',on:'open:cashiers'},
 {el:'cash-toggle',d:'Slå på <b>Enable cashier management</b>.',on:'open:pin'},
 {el:'modal-pin',allow:'.npad,.pin',d:'Kassören loggar in. Ange Baristans PIN <b>0000</b>.',until:()=>S.cashier==='Barista',fill:()=>{UI.f.pin='';['0','0','0','0'].forEach(k=>A.pinkey(k))}},
 {t:'Inloggad',d:'Kassörens namn visas nu i kassan och följer med varje köp. Med <b>Byt kassör</b> loggar nästa person in.',next:1},
 done('Kassörinloggning kan vara valfri, ligga kvar på senast vald kassör eller vara obligatorisk så att kassan låses efter varje köp. Läget ställer du in under Min butik → Kassörhantering.')]});

add({ch:'Försäljning',id:'x-medlem',title:'Lojalitetsmedlem på köpet',pre:cart('Cappuccino'),steps:[
 {el:'mystore',d:'Kunden är medlem i lojalitetsprogrammet och vill samla poäng. Öppna <b>My Store</b>.',on:'open:ms'},
 {el:'row-loyalty',d:'Under Customer benefits: tryck <b>Loyalty members</b>.',on:'open:loyalty'},
 {el:'loy-member',sel:'#pos [data-a="loytoorder"]',d:'Sök på mobilnummer, namn eller e-post, eller skanna kundens QR-kod. Tryck på medlemmen.',until:()=>!!C().customer},
 done('Medlemmen är kopplad till köpet och samlar poäng när du tar betalt. Har programmet bonusar kan de lösas in på köpet. Lojalitetsprogrammet sätter du upp i Backstage under Lojalitet.')]});

add({ch:'Försäljning',id:'x-ratter-kassa',title:'Servera rätter från bordet',pre:()=>{cart('Cappuccino','Räksmörgås','Kanelbulle')();S.courses.on=true;C().served={};UI.showCourses=false;save()},steps:[
 {t:'Rätter',d:'Med rätter hålls varmrätten och efterrätten kvar tills du skickar dem till köket. Vilka produktgrupper som hör till vilken rätt ställer du in i Backstage under Kök → Rätter.',next:1},
 {el:'more',d:'Tryck <b>More</b>.',on:'more'},
 {el:'more-courses',d:'Tryck <b>Show Courses</b>.',until:()=>!!UI.showCourses},
 {t:'Vänta eller Servera',d:'Varukorgen sorteras efter rätt. Röd banderoll betyder <b>Vänta</b>: rätten är inte skickad till köket än.',next:1},
 {el:'crs-serve-varmratt',d:'Gästerna har ätit klart förrätten. Tryck <b>Servera Varmrätt</b>.',on:'course:serve'},
 done('Varmrätten skickas till köket och banderollen blir blå. Efterrätten väntar tills du serverar den.')]});

add({ch:'Inställningar',id:'x-nollstall',title:'Nollställ växelkassan',pre:()=>{kaffebar();S.drawer.float=S.drawer.float??500;save()},steps:[
 {el:'mystore',d:'Har du registrerat fel växelkassa kan du nollställa den. Öppna <b>My Store</b>.',on:'open:ms'},
 {el:'row-drawer',d:'Tryck <b>Cash Drawer</b>.',on:'open:drawer'},
 {el:'drawer-reset',d:'Tryck <b>Reset cash balance</b>.',on:'drawer:reset'},
 done('Växelkassan är nollställd. Vid nästa kontantköp ber kassan dig ange växelkassan igen.')]});
})();
