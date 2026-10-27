# Yabie Webbkassa – alla guider steg för steg

Den här filen innehåller alla guider i Yabie Webbkassa (Kaffebaren-demot), steg för steg. Texterna är desamma som i de interaktiva guiderna. Fetstil är knappar, menyer och värden som visas i kassan eller i Backstage.

Guiderna är uppdelade per del: **iPad-kassan**, **Backstage** och **Mobilkassan**. Varje del börjar med grundkursen och följs av övriga guider. Värden som priser, PIN-koder och IP-adresser är exempel från demot.

## Innehåll

- [iPad-kassan](#ipad-kassan) – 15 guider i grundkursen och 21 övriga guider
- [Backstage](#backstage) – 8 guider i grundkursen och 41 övriga guider
- [Mobilkassan](#mobilkassan) – 8 guider i grundkursen och 16 övriga guider

## iPad-kassan

### Grundkurs: Kom igång med Yabie

#### Hårdvara

##### 1. Kortterminal (Swedbank Pax)

1. **Koppla in terminalen** – Koppla **USB-C-sladden** till terminalen och **LAN-kabeln** från terminalen till routern.
2. **Terminalen startar** – Först visas PAX-loggan och sedan Swedbank. Här är det bara att vänta.
3. **Starta aktiveringen** – Tryck **Start / Begin activation** på terminalen.
4. **Terminalen laddar ner** – Whitelisting, nedladdning och installation. Låt terminalen arbeta klart tills IP-adressen visas.
5. **Notera IP-adressen** – Terminalen visar sin IP-adress, här **192.168.1.50**. Den skriver du in i kassan.
6. I kassan: öppna **My Store**.
7. Under **Hardware**: tryck på **Payment Terminals**.
8. Välj **Swedbank Pax**.
9. Tryck **Add Terminals**.
10. Knappa in IP-adressen från terminalen, **192.168.1.50**.
11. Tryck **Add Terminal**.
12. **Terminalen installeras** – Nu laddar terminalen ner igen och startar om. Återigen är det bara att vänta.
13. **Klart!** När ni ser den **gröna bakgrunden och Yabie-loggan** är terminalen kopplad. Betalsättet ni ska använda heter **Swedbank Pax**. Under Payment Terminals syns terminalen med sin IP-adress.

##### 2. Swedbank Cloud-terminal (A920Pro)

1. **Välj ECR Cloud** – Starta terminalen. När den frågar vilket upplägg du har, tryck på ECR Cloud. Väg: **ECR Cloud**.
   > **Bra att veta:** Stand alone terminal är för terminaler som används utan kassa, så den hoppar du över.
2. **Öppna menyn** – Terminalen visar nu Stängt. Tryck på de tre prickarna nere till vänster. Väg: **•••**.
3. **Välj Parningsläge** – Menyn glider upp från botten. Tryck på Parningsläge. Väg: **Meny** › **Parningsläge**.
4. **Notera parningskoden** – Terminalen visar en sexsiffrig kod. Ha den framme, du skriver in den i kassan om en liten stund.
   > **Tips:** Koden gäller i 10 minuter, så fortsätt direkt till kassan.
5. **Öppna Payment Terminals** – I Yabie-kassan, tryck på My Store uppe till vänster. Väg: **My Store** › **Payment Terminals**.
6. **Öppna Payment Terminals** – Under Hardware, tryck på Payment Terminals. Väg: **My Store** › **Payment Terminals**.
7. **Välj Swedbank Cloud** – Tryck på Swedbank Cloud i listan. Väg: **Swedbank Cloud**.
   > **Bra att veta:** Välj Swedbank Cloud, inte Swedbank Pax.
8. **Skriv in koden och tryck Pair** – Skriv in den sexsiffriga koden från terminalen i fältet: **901080**.
9. **Skriv in koden och tryck Pair** – Tryck på Pair. Väg: **Pair**.
10. **Klart!** När terminalen visar Yabie är den ihopkopplad med kassan. Nu kan du ta betalt.
   > **Har koden gått ut?** Koden gäller i 10 minuter. Öppna Parningsläge på terminalen igen så får du en ny kod.

   > **Fortfarande strul?** Hör av dig till [Yabie Support](https://support.yabie.com) så löser vi det tillsammans.

##### 3. Kvittoskrivare (Star mC-Print3)

1. **Vänd skrivaren** – Alla portar sitter på undersidan av skrivaren. Vänd den upp och ner.
2. **Ta av locket** – Lyft av locket på undersidan. Då ser du portarna och spåren för kablarna.
3. **Koppla in strömmen** – Sätt strömkabelns runda kontakt i porten **DC 24V** längst till höger och lägg kabeln i spåret.
4. **Koppla in iPad-kabeln** – USB-C-kabeln till iPaden sitter i porten märkt **iPad**. Lägg den i spåret bredvid strömkabeln.
5. **Kassalåda** – Har ni en kassalåda kopplar du dess kabel i porten **Cash Drawer**. Då öppnas lådan automatiskt vid kontantköp.
6. **Skanner och kundskärm** – En streckkodsskanner eller kundskärm med USB-kabel kopplar du i USB-portarna bredvid.
7. **Sätt tillbaka locket** – Kablarna ligger i spåren och kommer ut baktill. Sätt tillbaka locket och vänd skrivaren rätt.
8. **Slå på strömmen** – Sätt strömsladden i ett eluttag. Den blå lampan på framsidan lyser när skrivaren är på.
9. **Koppla till iPaden** – Sätt USB-kabelns andra ände i iPaden. Skrivaren laddar också iPaden när den är på.
10. **Använder ni nätverk?** – Skrivaren kan också kopplas med en LAN-kabel från porten **LAN** till routern i stället för USB-kabeln till iPaden. Resten av guiden är densamma.
11. Öppna **My Store**.
12. Under **Hardware**: tryck på **Printers**.
13. Status **Connected** betyder att kassan hittar skrivaren. Tryck på den.
14. Testa med **Print Demo Receipt**. Ett demokvitto skrivs ut på skrivaren.
15. **Klart!** Kommer det ut ett kvitto fungerar skrivaren. Blankt kvitto? Vänd på pappersrullen.

##### 4. Bongskrivare (Star TSP143IV)

1. **Bongskrivaren** – Star **TSP143IV** används som **bongskrivare**: när ett köp är klart skrivs en bong ut i köket med det som ska tillagas. Kundens kvitto skrivs fortfarande på kvittoskrivaren vid kassan.
2. **Förbered skrivaren** – Lägg i en pappersrulle och slå på skrivaren **TSP143IV-UEWB**. Sitter det en LAN-kabel i skrivaren: dra ur den. Ha namnet och lösenordet till ert Wi-Fi nära till hands.
3. På mobilen eller surfplattan: slå på **Wi-Fi** och anslut till samma nätverk som kassan.
4. Slå på **Bluetooth**. Appen använder det för att hitta skrivaren.
5. Öppna appen **Star Quick Setup Utility**. Den laddas ner gratis från App Store eller Google Play.
6. Tryck **Use Wireless LAN**.
7. Välj modellen **TSP143IV-UEWB**.
8. Appen behöver platsen för att läsa nätverkets namn. Tryck **Allow While Using App**. (Android: **Only this time**, sedan **Allow**.)
9. Kontrollera att rätt nätverk (SSID) står ifyllt och skriv Wi-Fi-lösenordet. I demot: **kaffe2026**.
10. Tryck **Next**.
11. Appen hittar skrivaren via Bluetooth. Tryck **Allow**.
12. Håll mobilen nära skrivarens lampor. Tryck på **lamporna** på skrivaren.
13. **Skrivaren ställs in** – Inställningarna skickas till skrivaren. Stäng inte av den.
14. Skrivaren skriver ut en **Wireless Network Diagnosis**. Står det **Successful** är Wi-Fi klart och nätverkslampan lyser grönt. Skrivarens adress står under **IP Address**.
15. Tryck **Finish** för att stänga appen.
16. **Bongutskrifter i Backstage** – I Backstage: **Handlare → Inställningar**, bocka i **Aktivera funktion för bongutskrifter** och välj referens (Automatisk 1–999 eller fritext). Under **Kök → Skrivarstationer → Lägg till station** skapar du stationen och väljer vilka produkter som ska skrivas ut där. I demot finns stationen **Kök** med smörgåsarna.
17. Nu kopplar du stationen till skrivaren i kassan. Öppna **My Store**.
18. Under **Hardware**: tryck på **Printers**.
19. Under **Printer stations** står stationen **Kök** utan skrivare. Tryck på den.
20. Välj **TSP143IV-UEWB**, skrivaren du just kopplade till Wi-Fi.
21. Tryck **Print Example Receipt**. Ett exempelkvitto kommer ut på bongskrivaren, så vet du att det är rätt skrivare.
22. Stäng My Store.
23. Sälj en **Räksmörgås**. Smörgåsarna hör till stationen Kök.
24. Ta betalt med **Kontokort** (finns det ingen snabbknapp: tryck **ALL PAYMENTS** och välj Kontokort).
25. **Betalning pågår** – Kunden blippar kortet…
26. Tryck **Skip receipt**.
27. Bongen kommer ut i köket med referensnumret och **1 x Räksmörgås**. Samma referens står på kundens kvitto, så köket kan ropa upp ordern.
28. **Klart!** Bongskrivaren är kopplad. Stod det **Failed** på diagnoskvittot? Under texten står vad som är fel (t.ex. fel lösenord). Stäng av och på skrivaren och kör guiden igen. Vill du hellre koppla via molnet (Star CloudPRNT) finns det beskrivet i Yabies supportguide.

##### 5. Kassalåda och växelkassa

1. **Anslut kassalådan** – Kassalådans kabel sitter i porten **Cash Drawer** på kvittoskrivaren. Lådan öppnas automatiskt när du tar betalt kontant.
2. Sälj en kanelbulle: tryck på knappen.
3. Tryck **ALL PAYMENTS**.
4. Välj **Kontant**.
5. **Open Balance** – Dagens första kontantköp kräver att du öppnar kassan med växelkassan, alltså hur mycket som ligger i lådan när dagen börjar.
6. Det ligger 500 kr i lådan. Knappa in **500**.
7. Tryck **Open cash balance**.
8. Nu kommer betalningen. Tryck på ett belopp (t.ex. **50 kr**) eller knappa in vad kunden ger. Tryck sedan **Ta betalt**.
9. Växeln visas på skärmen och kassalådan öppnas. Tryck **Skip receipt**.
10. Kassalådan hanterar du i **My Store**.
11. Tryck på **Cash Drawer**.
12. **Current Balance** är växelkassan plus kontantförsäljningen. **Open Balance** är grå eftersom kassan redan är öppen för dagen.
13. **Klart!** Med **Add Cash** och **Remove Cash** sätter du in eller tar ut pengar, och **Open Drawer** öppnar lådan utan köp. Z-rapporten stänger kassan, och nästa dag öppnar du den igen vid första kontantköpet.

##### 6. Kundskärm

1. **Starta Yabie Screen** – Kundskärmen bredvid kassan kör appen **Yabie Screen**. Den ska vara på samma Wi-Fi som kassan och visar sin IP-adress och en QR-kod.
2. I kassan: öppna **My Store**.
3. Under **Hardware**: tryck på **Customer Display**.
4. Tryck på **IP Address**.
5. Knappa in adressen som står på kundskärmen, **192.168.1.42**, eller tryck **Scan QR Code**.
6. Tryck **OK**. Med **Auto connect** påslaget kopplar kassan upp sig direkt och skärmen visar **TOTAL: SEK0.00**.
7. Stäng My Store.
8. Sälj en **Kanelbulle**. Kunden ser varje artikel och totalen på kundskärmen medan du slår in.
9. Lägg till en **Caffè latte**. Den har tillval, så produktsidan öppnas.
10. Välj gärna mjölk och tryck **Add to Basket**. Tillvalen syns också på kundskärmen.
11. Ta betalt med **Kontokort** (finns det ingen snabbknapp: tryck **ALL PAYMENTS** och välj Kontokort).
12. **Betalning pågår** – Kunden blippar kortet…
13. Nu frågar kundskärmen om kvitto. Kunden väljer själv SMS, e-post eller utan kvitto. Tryck **Skip receipt** på kundskärmen.
14. **Klart!** Kundskärmen återgår till **TOTAL: SEK0.00** och är redo för nästa kund. Låt **Auto connect** vara på så kopplar kassan upp sig igen efter omstart.

##### 7. Köksskärm (KDS)

1. **Köksskärmen** – Bredvid kassan står köksskärmen (KDS). Stationen skapas i Backstage under **Extern hårdvara → Köksdisplay**, där du också väljer vilka grupper som visas. Sedan loggar du in i KDS-appen och väljer en licens.
2. Lägg en **Cappuccino** i varukorgen.
3. Välj gärna mjölk och tryck **Add to Basket**.
4. Lägg till en **Räksmörgås**.
5. Ta betalt med **Kontokort** (finns det ingen snabbknapp: tryck **ALL PAYMENTS** och välj Kontokort). Ordern skickas till köket när köpet är klart.
6. **Betalning pågår** – Kunden blippar kortet…
7. Tryck **Skip receipt**. Titta på köksskärmen: ordern har kommit in och skärmen blinkar grönt.
8. I köket: tryck på en artikel som är klar.
9. Tryck **Markera artiklar som klara**. Artikeln flyttas till **Klara artiklar**. Du kan markera en eller flera artiklar.
10. När allt är klart trycker köket **Klar** och ordern försvinner från skärmen.
11. **Klart!** Tryckte du fel finns **Ångra klar** en kort stund. Ordrar som parkeras på bord skickas också till köket, så att köket kan börja direkt.

#### Att testa

##### 8. Skapa en produktgrupp

1. Vi skapar gruppen **Glass**. Öppna **My Store**.
2. Tryck på **Product Catalog**.
3. Tryck **Manage products & groups**.
4. Tryck **Create new group**.
5. Skriv **Glass**.
6. Tryck på **VAT Group** för att välja momssats.
7. Välj momssats **12 %**. Bokföringskontot fylls i automatiskt.
8. Välj gärna en färg och tryck **Save**.
9. **Klart!** Gruppen Glass syns nu som en egen flik i kassan.

##### 9. Skapa en produkt

1. Nu skapar vi **Mjukglass** för 39 kr. Öppna **My Store**.
2. Tryck på **Product Catalog**.
3. Tryck **Manage products & groups**.
4. Tryck **Create new product**.
5. Skriv **Mjukglass**.
6. Tryck på **Product group**.
7. Välj **Glass**.
8. Tryck **Done**.
9. Tryck på **Default price**. Momsen hämtas från gruppen.
10. Knappa in priset **39** på sifferknapparna.
11. Priset är **39,00 kr**. Tryck **Done**.
12. Tryck **Save**. Har du inte lagt in priset än markeras **Default price** – tryck där och knappa in 39 först.
13. **Klart!** Mjukglass finns nu i fliken Glass. Nästa guide lägger den på en egen startsida.

##### 10. Lägg till en startsida

1. Tryck **Edit** för att redigera startsidorna.
2. Plustecknet skapar en ny startsida.
3. Skriv **Sommar**.
4. Tryck **Create**.
5. Tryck **Done**.
6. Startsidan är tom. Tryck på första **+**.
7. Välj **Product**.
8. Välj **Mjukglass**.
9. Välj färg och tryck **Add product**.
10. Tryck **Save** så sparas layouten.
11. **Klart!** Startsidan Sommar ligger bland flikarna med knappen Mjukglass.

##### 11. Snabbknappar och sifferknappar

1. Nu ställer vi in betalknapparna i kassan. Öppna **My Store**.
2. Under **Settings**: tryck **Payment Methods**.
3. Först väljer du om sifferknapparna (numpad) ska synas i kassan. De används för att slå **antal** av en vara, t.ex. 3 innan du trycker på produkten, eller för att slå in en **PLU-kod**. Som standard är de dolda. Tryck **Show numpad**.
4. Som standard finns inga snabbknappar för betalsätt, då tar man betalt via **CHARGE**. Du kan lägga till upp till fyra. Tryck **+**.
5. Välj **Kontant**.
6. Tryck **Add payment method**.
7. Med minustecknet tar du bort en knapp. Utan sifferknappar blir betalknapparna större. Tryck **Save**.
8. Stäng My Store.
9. Snabbknappen ligger nu bredvid sifferknapparna. Prova att sälja tre bullar på en gång: tryck **3**.
10. Tryck på **Kanelbulle**. Antalet du slog läggs på produkten.
11. **Klart!** Varukorgen visar **3 Articles**. Betalsätt som inte har en snabbknapp hittar du alltid under **All payments**.

##### 12. Gör ett köp och en retur

1. Tryck på **Cappuccino**.
2. Kaffet har tillval. Välj mjölk om du vill och tryck **Add to Basket**.
3. Ta betalt med **Kontokort** (finns det ingen snabbknapp: tryck **ALL PAYMENTS** och välj Kontokort). Kunden blippar kortet på terminalen.
4. Välj kvitto. Vi trycker **Skip receipt**.
5. Nu returnerar vi köpet. Öppna **My Store**.
6. Tryck **Order History**.
7. Senaste ordern ligger överst.
8. Tryck **Select items to return**.
9. Returer kräver PIN från en Admin. I demon har Ägare koden **1234**.
10. Bocka i **Cappuccino**.
11. Tryck **Return items**.
12. Skriv en orsak, t.ex. **Fel beställning**.
13. Tryck **Next**.
14. Returen ligger i varukorgen. Tryck **ALL PAYMENTS**.
15. Pengarna går tillbaka till samma betalsätt. Välj **Kontokort**.
16. Tryck **Skip receipt**.
17. **Klart!** Köpet och returen syns nu i orderhistoriken och i rapporterna.

#### Online

##### 13. Ta emot en onlineorder

1. **Kunden skannar QR-koden** – Vid bordet står en skylt med QR-kod. Kunden skannar den med mobilkameran och kommer direkt till er webbshop. Tryck på länken i telefonen.
2. **Välj en produkt** – Webbshoppen visar samma produkter och priser som kassan. Tryck på **Cappuccino**.
3. **Välj tillval** – Tillvalen från kassan finns med här. Välj till exempel Havremjölk och tryck **Add**.
4. **Lägg till något mer** – Kunden bläddrar mellan kategorierna. Tryck på fliken **Bakverk**.
5. **Lägg till något mer** – Tryck på **Kanelbulle**. Produkter utan tillval läggs direkt i ordern.
6. **Till kassan** – Tryck på **Your order** längst ner.
7. **Kontrollera ordern** – Kunden ser sitt bord (Eat in: 3), sina val och ungefärlig tillagningstid. Tryck **Provide information and pay**.
8. **Kontaktuppgifter** – Kunden fyller i namn, telefon och e-post. Dit skickas kvitto och SMS. Tryck **Fyll i åt mig** och sedan **Proceed to payment**.
9. **Betala** – Kunden betalar med Swish, kort eller Apple Pay. Tryck **Apple Pay**.
10. **Ordern kommer in i kassan** – Kassan blinkar grönt och klockan vid **Online orders** visar 1. Kunden har fått ett SMS. Tryck på **Online orders**.
11. **Acceptera ordern** – Kortet visar bord, namn, artiklar och tillval (gula etiketter). Tryck **Accept**.
12. **Ange tillagningstid** – Välj **5** eller **10** minuter, eller skriv en egen tid, och tryck **Confirm Time**.
13. **Kunden får en klar-tid** – Kortet blir grönt och visar tillagningstiden. Kunden har fått kvitto på e-post och ett SMS med när ordern är klar. Se telefonen.
14. **Bocka av och lämna ut** – Tryck på artiklarna när de är klara, så hamnar de under **Completed items**. Tryck sedan **Done**.
15. **Klart!** Kunden får SMS:et **Your order is ready to be picked up**. Ordern finns nu under **History** i Online orders.

#### Rapporter

##### 14. Dagsavslut: när och hur

1. **Vilken tid stänger ni?** – När tar ni sista betalningen för dagen? Alternativ: Före midnatt, Efter midnatt.
   - *Om Före midnatt:* **Tid för dagsavslut** – Kassan gör dagsavslut automatiskt vid en fast tid. Välj en tid efter er sista försäljning, t.ex. en timme efter stängning.
   - *Om Efter midnatt:* **Tid för dagsavslut** – Stänger ni 02:00? Lägg avslutet t.ex. 04:00, inte 00:00. Då hamnar hela kvällen på samma rapport.
2. Öppna **My Store**.
3. Tryck **Z-Report**.
4. Här ser du tidigare dagsavslut. Vill du stänga dagen nu: **Manual End of Day**.
5. Tryck **Create Z-Report**.
6. **Klart!** Z-rapporten visar försäljning per momssats och betalsätt. Alla rapporter finns också i Backstage.

##### 15. Bokföring och integration

1. **Bokföringsprogram** – Vilket bokföringsprogram använder ni? Alternativ: Fortnox, Spiris, Björn Lunden, Inget / annat.
   - *Om Fortnox:* **Fortnox** – Backstage: **Integrationer → Fortnox**. Tryck **Hämta behörighetskod**, logga in i Fortnox och godkänn. Välj butiker och verifikationsserie. Kräver modulerna Bokföring, Integration och Arkivplats.
   - *Om Spiris:* **Spiris** – Backstage: **Integrationer → Spiris**. Hämta behörighetskod, logga in i Spiris och godkänn. Välj butiker och verifikationsserie. Kräver modulen Spiris Integration.
   - *Om Björn Lunden:* **Björn Lunden** – I Björn Lunden: **Integrationer → Yabie → Aktivera** och kopiera den Publika nyckeln. I Backstage: **Integrationer → Björn Lunden**, klistra in nyckeln och välj serie.
   - *Om Inget / annat:* **SIE-fil** – Backstage: **Rapporter → SIE-4**. Välj period och skicka filen till din redovisningskonsult.
2. **Klart!** Försäljningen skickas sedan automatiskt efter varje dagsavslut.

### Övriga guider

#### Försäljning

##### Ge rabatt på en artikel och på hela köpet

1. Sälj en **Kanelbulle**.
2. Tryck på raden i varukorgen för att öppna artikeln.
3. Tryck **Discount**.
4. Välj en rabattknapp, t.ex. **10% Personal**, eller knappa in en egen rabatt. Tryck sedan **Add Discount**.
5. Rabatt på hela köpet ligger under **Functions**.
6. Tryck **Discount**.
7. Välj **Amount**, knappa in **5** kr och tryck **Add Discount**.
8. **Klart!** Artikelrabatten syns på raden och köprabatten under varukorgen. Totalen räknas om direkt.

##### Parkera en order och hämta den igen

1. Lägg en **Kanelbulle** i varukorgen.
2. Tryck **Park**.
3. Ge ordern ett namn, t.ex. kundens namn, eller lämna fältet tomt så sparas den med klockslaget. Tryck **Park**. Varukorgen töms så att du kan ta nästa kund.
4. Tryck **Parked** för att se parkerade ordrar och bord.
5. Fliken **All** listar alla parkerade ordrar.
6. Tryck på korgen på din order för att hämta tillbaka den till kassan.
7. **Klart!** Ordern ligger i varukorgen igen och kan betalas. Parkera på ett bord genom att trycka på bordet i bordsvyn.

##### Sälj och lös in ett presentkort

1. Presentkortet ligger som en knapp på startsidan. Tryck på **Presentkort**.
2. Knappa in beloppet **300** på knappsatsen.
3. Tryck **Lägg till**.
4. Kunden betalar presentkortet med kort. Tryck **Kontokort** (finns det ingen snabbknapp: tryck **ALL PAYMENTS** och välj Kontokort).
5. **Betalning pågår** – Kunden blippar kortet på terminalen…
6. Tryck **Skip receipt**. Presentkortet är nu aktivt och koden skrivs ut till kunden.
7. Nu löser vi in ett presentkort. Sälj en **Kanelbulle**.
8. Tryck **ALL PAYMENTS**.
9. Välj **Yabie gift card**.
10. Skanna eller skriv in koden. Använd demokoden **DEMO-1000**.
11. Saldot syns direkt. Tryck **Betala**.
12. Tryck **Skip receipt**.
13. **Klart!** Beloppet drogs från presentkortet. Saldo och historik finns under **My Store → Yabie gift cards**.

##### Koppla en kund till köpet

1. Sälj en **Kanelbulle**.
2. Tryck **More**.
3. Tryck **Add Customer**.
4. Sök eller välj kunden i listan. Tryck på **Anna Lind**.
5. Tryck **Lägg till på ordern**.
6. **Klart!** Kunden visas på ordern och köpet hamnar i kundens historik. Med kund kan du också skicka kvittot på e-post eller fakturera.

##### Sök efter en produkt

1. Tryck **Search** uppe till höger.
2. Skriv **bulle**.
3. Tryck på **Kanelbulle** för att lägga den i varukorgen.
4. **Klart!** Sök fungerar på namn, artikelnummer och streckkod. En kopplad streckkodsskanner lägger produkten direkt i varukorgen.

##### Allergiförfrågan på en artikel

1. Sälj en **Kanelbulle**.
2. Tryck på raden i varukorgen.
3. Tryck **Allergy request**.
4. Kunden är glutenintolerant. Markera **Gluten** i listan.
5. Du kan markera fler allergener eller skriva egen information i fältet. Tryck **Save**.
6. **Klart!** Allergin visas med en röd markering på raden och följer med till köket på bongen och i KDS.

#### Inställningar

##### Skapa en rabattknapp

1. Öppna **My Store**.
2. Under Settings: tryck **Discount buttons**.
3. Tryck **Create discount button**.
4. Skriv namnet **Lunch**.
5. **Percentage** är förvalt (växla till **Amount** för kronor). Knappa in **20** på knappsatsen.
6. Tryck **Save discount**.
7. **Klart!** Knappen finns nu i rabattdialogen för både artikel och hela köpet. Max 8 knappar.

#### Kassa

##### Lägg in och ta ut kontanter

1. Öppna **My Store**.
2. Tryck på **Cash Drawer**.
3. Du har hämtat växel från banken. Tryck **Add Cash**.
4. Knappa in **200**.
5. Skriv en anteckning, till exempel **Växel**.
6. Tryck **Update cash balance**.
7. **Open Drawer** öppnar lådan utan att något säljs. Tryck på den.
8. **Close Balance** räknar av lådan och visar en eventuell differens. Oftast räcker det med Z-rapporten, som stänger kassan.
9. **Klart!** Insättningar och uttag syns under **Händelser** och i Z-rapporten.

#### Inställningar

##### Skapa en kampanj

1. Öppna **My Store**.
2. Tryck **Promotions**.
3. Tryck **Add automatic promotion**. Automatiska kampanjer läggs på av sig själva i kassan.
4. Ge kampanjen ett namn, t.ex. **Fikarea**.
5. Typen är **Discount** i procent. Skriv **20** för 20 % rabatt.
6. Välj vilka artiklar kampanjen gäller. Tryck **Items or groups included**.
7. Bocka i gruppen **Bakverk**. Med pilen kan du i stället välja enskilda produkter.
8. Tryck **Save**.
9. Kampanjen ska bara gälla vid köp över ett visst belopp. Skriv **60**.
10. Här ställer du också in datum, tid på dygnet, veckodagar och om kampanjen får kombineras med andra. Tryck **Create promotion**.
11. Kampanjen ligger överst i listan. Stäng My Store.
12. Sälj en **Kanelbulle**.
13. Kassan visar att artikeln ingår i en kampanj. Tryck **Show details**.
14. Här ser du villkoren och hur mycket som saknas till minimibeloppet. Tryck **OK**.
15. Sälj en **Kanelbulle** till så att köpet når 60 kr.
16. **Klart!** Rabatten läggs på automatiskt och syns som en lila rad i varukorgen. Kampanjen kan pausas eller tas bort under **My Store → Promotions**.

##### Skapa en tillvalsgrupp

1. Öppna **My Store**.
2. Tryck **Product Catalog**.
3. Tryck **Manage modifiers**.
4. Tryck **Create new modifier set**.
5. Skriv namnet **Sirap**.
6. Lägg till ett tillval. Skriv **Kola**.
7. Pris: skriv **5**.
8. Tryck **Add modifier**.
9. Bocka gärna i vilka produkter tillvalet gäller under **Linked products**. Tryck **Save**.
10. **Klart!** När du säljer en kopplad produkt frågar kassan efter tillvalet.

##### Skapa produkter från en meny (Magic Menu)

1. Öppna **My Store**.
2. Tryck **Product Catalog**.
3. Tryck **Magic Menu**.
4. Tryck **+** och fotografera menyn. I demon används en exempelmeny.
5. Tryck **Upload Menu**.
6. Menyn är uppdelad i kategorier som blir produktgrupper. Tryck **Förrätter**.
7. Kontrollera namn, skattegrupp och priser. Ta bort det som inte ska med. Tryck **Check**.
8. **Kontrollera resten** – Gör likadant med de andra kategorierna: öppna den markerade och tryck **Check**. När alla har en grön bock går guiden vidare.
9. Tryck **Create groups and products**.
10. **Klart!** Produktgrupperna ligger nu som flikar i kassan med alla produkter och priser. Justera gärna färger och startsidor under **Edit**.

##### Nollställ växelkassan

1. Har du registrerat fel växelkassa kan du nollställa den. Öppna **My Store**.
2. Tryck **Cash Drawer**.
3. Tryck **Reset cash balance**.
4. **Klart!** Växelkassan är nollställd. Vid nästa kontantköp ber kassan dig ange växelkassan igen.

#### Försäljning

##### Skicka en kvittokopia

1. Öppna **My Store**.
2. Tryck **Order History**.
3. Välj ordern. Du kan söka på ordernummer eller filtrera på datum.
4. Tryck **Receipt Copy**.
5. Välj hur kunden vill ha kvittot: SMS, e-post eller utskrift. Tryck **SMS**.
6. Skriv kundens nummer, t.ex. **0701234567**.
7. Tryck **Send**.
8. **Klart!** Kvittokopian skickas direkt. Samma vy används för returer: tryck **Select items to return** på ordern.

##### Ta betalt med Swish

1. Kunden vill betala med Swish. Tryck **ALL PAYMENTS**.
2. Välj **Swish**.
3. Kassan visar en QR-kod som kunden skannar i Swish-appen och väntar tills betalningen är klar. Tryck **Simulera att kunden betalar**.
4. Tryck **Skip receipt**.
5. **Klart!** Swish-betalningen är registrerad. Med Swish Handel kopplas betalningen till kassan och returer går automatiskt tillbaka till kundens Swish. Swish Handel ställer du in i Backstage under Betalningar → Betalsätt.

##### Dela notan på belopp

1. Två gäster delar på notan på 164 kr. Den första vill betala 100 kr. Tryck **Functions**.
2. Tryck **Split by amount**.
3. Knappa in **100**. Knappen **Max** fyller i allt som är kvar.
4. Tryck **Charge**.
5. Första gästen betalar med Swish. Tryck **Swish**.
6. Tryck **Simulera att kunden betalar**.
7. 100 kr är betalt och 64 kr är kvar. Tryck **Nästa betalning**.
8. Andra gästen betalar resten. Tryck **Charge**.
9. Välj **Kontokort**.
10. Tryck **Skip receipt**.
11. **Klart!** Notan är betald i två delar och båda betalningarna syns på samma order. Vill varje gäst betala för sina egna varor använder du **Split by items** under Functions.

##### Öppen retur utan kvitto

1. **Öppen retur** – Öppen retur används när köpet inte går att hitta i orderhistoriken, till exempel när kunden saknar kvitto. Varukorgen ska vara tom.
2. Tryck **Functions**.
3. Tryck **Open return**.
4. Returer kräver behörighet. Ange Ägarens PIN **1234**.
5. Välj produkten som lämnas tillbaka. Tryck **Kanelbulle**.
6. Returen ligger i varukorgen med minusbelopp. Tryck **ALL PAYMENTS**.
7. Välj hur pengarna ska betalas tillbaka. Tryck **Kontokort**.
8. Tryck **Skip receipt**.
9. **Klart!** Returen är registrerad. Hittar du köpet i orderhistoriken ska du i stället göra returen därifrån, så att pengarna går tillbaka till samma betalsätt.

##### Lojalitetsmedlem på köpet

1. Kunden är medlem i lojalitetsprogrammet och vill samla poäng. Öppna **My Store**.
2. Under Customer benefits: tryck **Loyalty members**.
3. Sök på mobilnummer, namn eller e-post, eller skanna kundens QR-kod. Tryck på medlemmen.
4. **Klart!** Medlemmen är kopplad till köpet och samlar poäng när du tar betalt. Har programmet bonusar kan de lösas in på köpet. Lojalitetsprogrammet sätter du upp i Backstage under Lojalitet.

##### Servera rätter från bordet

1. **Rätter** – Med rätter hålls varmrätten och efterrätten kvar tills du skickar dem till köket. Vilka produktgrupper som hör till vilken rätt ställer du in i Backstage under Kök → Rätter.
2. Tryck **More**.
3. Tryck **Show Courses**.
4. **Vänta eller Servera** – Varukorgen sorteras efter rätt. Röd banderoll betyder **Vänta**: rätten är inte skickad till köket än.
5. Gästerna har ätit klart förrätten. Tryck **Servera Varmrätt**.
6. **Klart!** Varmrätten skickas till köket och banderollen blir blå. Efterrätten väntar tills du serverar den.

#### Personal och rapporter

##### Stämpla in och ut i personalliggaren

1. Öppna **My Store**.
2. Tryck **Time Tracking**.
3. Time Tracking kräver behörighet. Ange Ägarens PIN **1234**.
4. Nu stämplar personalen in. Ange Baristans PIN **0000**.
5. Kassan visar vem PIN-koden tillhör och att hon inte är instämplad. Tryck **Start shift**.
6. Passet har startat. När dagen är slut stämplar baristan ut med samma PIN. Ange **0000** igen.
7. Nu visas när passet startade och hur länge det har pågått. Tryck **End shift**.
8. **Klart!** Passet är avslutat. In- och utstämplingen hamnar i personalliggaren, som du skriver ut med **Print** eller ser i Backstage under Personalliggare. Den visas för Skatteverket vid kontrollbesök.

##### Ta en X-rapport

1. Öppna **My Store**.
2. Tryck **Reports & Analytics**.
3. Tryck **Current daily sales (X-report)**.
4. Välj Print, Email eller Show on Screen och tryck **Create Report**.
5. **Klart!** X-rapporten visar dagens försäljning utan att stänga dagen. Den kan tas hur många gånger som helst, till skillnad från Z-rapporten.

##### Kassörinloggning

1. Med kassörhantering loggar varje kassör in med sin PIN, så att du ser vem som har gjort varje köp. Öppna **My Store**.
2. Tryck **Cashier Management**.
3. Slå på **Enable cashier management**.
4. Kassören loggar in. Ange Baristans PIN **0000**.
5. **Inloggad** – Kassörens namn visas nu i kassan och följer med varje köp. Med **Byt kassör** loggar nästa person in.
6. **Klart!** Kassörinloggning kan vara valfri, ligga kvar på senast vald kassör eller vara obligatorisk så att kassan låses efter varje köp. Läget ställer du in under Min butik → Kassörhantering.

## Backstage

### Grundkurs: Kom igång med Backstage

#### Kom igång

##### 1. Hitta i Backstage

1. **Det här är Backstage** – Backstage är webbsidan där du sätter upp allt som kassan använder: produkter, kampanjer, personal, betalsätt och rapporter. Du loggar in på **backstage.yabie.com**.
2. Menyn har två delar. Under **APPLIKATIONER** finns det du jobbar med varje dag och under **INSTÄLLNINGAR** inställningarna för företaget. Tryck **Välkommen**.
3. Grupper med en pil öppnas när du trycker på dem. Gå till **Produktkatalog → Produkter**. Tryck först på **Produktkatalog**.
4. Tryck **Produkter**.
5. Produktgrupperna visas som färgade etiketter. Tryck **KAFFE** för att bara se kaffeprodukterna.
6. **Klart!** Allt du ändrar i Backstage skickas till kassorna. Hämtar kassan inte ändringen direkt: gå till **Min butik → Produktkatalog** i kassan och tryck **Synkronisera produktkatalog**.

#### Produktkatalog

##### 2. Skapa en produktgrupp

1. Gå till **Produktkatalog → Produkter**. Tryck först på **Produktkatalog**.
2. Tryck **Produkter**.
3. Tryck **+** bredvid **Produktgrupper**.
4. Skriv namnet **Glass**.
5. Produktgruppen styr momsen för alla produkter i gruppen. Öppna **Momssats**.
6. Välj **12 %**.
7. **Bokföringskonto** fylls i automatiskt efter momsen (3002 för 12 %). Kontrollera med din redovisningskonsult.
8. Öppna **Färg**. Färgen blir gruppens färg i kassan.
9. Välj **Heaven**.
10. Tryck **Spara**.
11. Gruppen **GLASS** finns nu bland produktgrupperna och som flik i kassan. Ordningen ändrar du genom att dra grupperna.
12. **Klart!** Momsen går inte att ändra på en befintlig grupp. Behöver du annan moms skapar du en ny grupp och flyttar produkterna. Tar du bort en grupp raderas också alla produkter i den.

##### 3. Skapa en produkt

1. Gå till **Produktkatalog → Produkter**. Tryck först på **Produktkatalog**.
2. Tryck **Produkter**.
3. Tryck **Lägg till produkter**.
4. Produktgruppen styr momsen. Öppna **Produktgrupp**.
5. Välj **Glass**.
6. Skriv namnet **Vaniljglass**.
7. Under **Pris**: skriv priset inklusive moms, **35**.
8. **Fast pris** används oftast. **Öppet pris** betyder att priset anges i kassan vid varje försäljning.
9. Tryck **Spara**.
10. Produkten är skapad och flikarna för **Lager**, **Tillval**, **Rekommendationer** och **Ingredienser** har dykt upp. Dem går vi igenom i andra guider.
11. **Klart!** Fyll gärna i **SKU / PLU** om produkten ska kunna slås in med PLU-kod, och **EAN** om den ska kunna skannas.

**Fortsättning i iPad-kassan** – Sälj den nya produkten i kassan

1. **Nu i iPad-kassan** – Det du skapade i Backstage finns redan i kassan. Ändringar skickas automatiskt till alla kassor i butiken.
2. Produktgruppen **Glass** har blivit en egen flik. Tryck på den.
3. Här är **Vaniljglass** för 35 kr. Tryck på den.
4. **Klart!** Produkten ligger i varukorgen med priset och momsen från Backstage. Syns inte en ändring direkt: **My Store → Product Catalog → Synchronize Product Catalog**.

**Fortsättning i mobilkassan** – Sälj den nya produkten i mobilen

1. **Nu i mobilkassan** – Det du skapade i Backstage finns redan i mobilkassan.
2. Produktgruppen **Glass** är en egen ruta. Tryck på den.
3. Tryck på **Vaniljglass**.
4. **Klart!** Produkten ligger i korgen med priset från Backstage.

##### 4. Skapa en tillvalsgrupp

1. Gå till **Produktkatalog → Tillval**. Tryck först på **Produktkatalog**.
2. Tryck **Tillval**.
3. Tillval skapas i grupper, t.ex. Stekgrad eller Topping. Tryck **Skapa ny tillvalsgrupp**.
4. Skriv namnet **Topping**.
5. **Kräver val** tvingar fram ett val innan artikeln läggs i varukorgen. Toppingen är valfri, så låt rutan vara tom.
6. Bocka i **Öppna alltid detaljvyn** så visas tillvalen direkt när produkten säljs.
7. Tryck **Lägg till tillval**.
8. Skriv **Chokladsås**.
9. Pris inklusive moms: **5**. Ska tillvalet inte påverka priset anger du 0.
10. Tryck **Skapa och lägg till ny**.
11. Tryck **Stäng**.
12. Tryck **Spara**.
13. Koppla gruppen till produkterna. Tryck **Koppla produkter**.
14. Bocka i **Glass** (eller Bakverk).
15. Tryck **Lägg till**.
16. **Klart!** När produkten säljs i kassan öppnas tillvalen. Du kan också koppla tillval från produktens flik **Tillval**.

**Fortsättning i iPad-kassan** – Sälj med det nya tillvalet i kassan

1. **Nu i iPad-kassan** – Tillvalsgruppen **Topping** från Backstage är kopplad till glassen i kassan.
2. Tryck på fliken **Glass**.
3. Tryck på **Vaniljglass**.
4. Eftersom du bockade i **Öppna alltid detaljvyn** öppnas tillvalen direkt. Välj **Chokladsås** och tryck **Add to Basket**.
5. **Klart!** Tillvalet och dess pris syns under raden i varukorgen och följer med till köket.

**Fortsättning i mobilkassan** – Sälj med det nya tillvalet i mobilen

1. **Nu i mobilkassan** – Tillvalsgruppen **Topping** är kopplad till glassen även i mobilen.
2. Tryck **Glass**.
3. Tryck på **Vaniljglass**. Tillvalen öppnas i en egen vy.
4. Tryck **Chokladsås**.
5. Tryck **Add to Basket**.
6. **Klart!** Glassen med chokladsås ligger i korgen.

#### Kampanjer och lojalitet

##### 5. Skapa en kampanj

1. Tryck **Kampanjer**.
2. Tryck **Skapa kampanj**. Kampanjen skapas i fem steg.
3. Ge kampanjen ett namn, t.ex. **Höstrea**.
4. **Automatisk kampanj** dras av automatiskt i kassan. Manuell kampanj aktiveras av kassören med en knapp. Välj **Automatisk**.
5. Tryck **Kampanjregler**.
6. Välj typ. **Rabatt** ger rabatt i procent eller kronor. Fastpris, X för Y och Kombination fungerar på samma sätt.
7. Skriv rabatten: **20** (procent).
8. Tryck **Lägg till produkter**.
9. Tryck **Lägg till produkter** och välj vad kampanjen gäller.
10. Bocka i gruppen **Kaffebönor & muggar**.
11. Tryck **Lägg till**.
12. Tryck **Schemalägg kampanj**.
13. Kampanjen börjar idag. Lägg gärna in ett slutdatum eller begränsa till vissa tider och veckodagar.
14. Tryck **Se sammanfattning**.
15. Kontrollera sammanfattningen och tryck **Skapa kampanj**.
16. Kampanjen ligger överst och är aktiv. Reglaget stänger av den utan att ta bort den. Ordningen i listan är prioriteringen.
17. **Klart!** Byt till **Kassan** uppe till vänster och sälj en mugg: 20 % dras av automatiskt. Syns inte kampanjer alls slår du på **Stöd för kampanjer** under Handlare → Inställningar.

**Fortsättning i iPad-kassan** – Kampanjen i kassan

1. **Nu i iPad-kassan** – Automatiska kampanjer från Backstage dras av direkt i kassan, utan att kassören gör något.
2. Tryck på fliken **Kaffebönor & muggar**.
3. Sälj en **Mugg**.
4. **Klart!** Kampanjen **Höstrea** syns som en lila rad i varukorgen och 20 % är avdraget från summan. Pausar du kampanjen i Backstage försvinner rabatten.

**Fortsättning i mobilkassan** – Kampanjen i mobilen

1. **Nu i mobilkassan** – Automatiska kampanjer från Backstage dras av i mobilkassan också.
2. Det ligger en **Mugg** i korgen. Tryck **Basket**.
3. **Klart!** Kampanjen **Höstrea** syns som en lila rad ovanför summan och 20 % är avdraget.

#### Personal och betalning

##### 6. Lägg till personal

1. Under **INSTÄLLNINGAR**: gå till **Användare → Alla användare**. Tryck först på **Användare**.
2. Tryck **Alla användare**.
3. Tryck **Lägg till ny användare**.
4. **Personal** jobbar i kassan, **Butikschef** har fler behörigheter och **Backstage-användare** loggar bara in här. Öppna listan.
5. Välj **Personal**.
6. Förnamn: **Sara**.
7. Efternamn: **Berg**.
8. PIN-koden används i kassan för behörigheter och för att stämpla in. Skriv **4321**.
9. **Personnummer** behövs för personalliggaren. Skriv **19900101-0000** (ett påhittat exempel).
10. Tryck **Spara**.
11. Sara finns nu i listan. I kolumnen **Användarnamn** ser du namnet hon loggar in i kassan med.
12. **Klart!** Behörigheterna anpassar du genom att öppna användaren. Har någon glömt sitt lösenord trycker de **Glömt lösenord** på inloggningssidan.

**Fortsättning i iPad-kassan** – Stämpla in den nya personalen

1. **Nu i iPad-kassan** – Sara kan nu använda sin PIN-kod i kassan.
2. Öppna **My Store**.
3. Tryck **Time Tracking**.
4. Time Tracking kräver behörighet. Ange Ägarens PIN **1234**.
5. Nu stämplar Sara in med sin egen PIN. Ange **4321**.
6. Kassan visar att PIN-koden tillhör **Sara Berg**. Tryck **Start shift**.
7. **Klart!** Saras pass syns i personalliggaren i Backstage. Samma PIN används för behörigheter i kassan.

**Fortsättning i mobilkassan** – Stämpla in den nya personalen i mobilen

1. **Nu i mobilkassan** – Sara kan nu stämpla in med sin PIN i mobilkassan.
2. Öppna menyn.
3. Tryck **Time Tracking**.
4. Ange Saras PIN **4321**.
5. Kassan visar att PIN-koden tillhör **Sara Berg**. Tryck **Start shift**.
6. **Klart!** Saras pass är startat och syns i personalliggaren i Backstage.

##### 7. Lägg till ett betalsätt

1. Under **INSTÄLLNINGAR**: gå till **Betalningar → Betalsätt**. Tryck först på **Betalningar**.
2. Tryck **Betalsätt**.
3. **Betalsätten per butik** – Listan visar vilka betalsätt som finns i kassan i varje butik.
4. Tryck **Lägg till nytt betalsätt**.
5. Öppna **Butik**.
6. Välj **Kaffebaren**.
7. Öppna **Betalsätt**. Kort och Swish Handel kräver avtal. **Fristående** är betalsätt som hanteras utanför kassan.
8. Välj **Fristående**.
9. Öppna **Typ**.
10. Välj **Lunchkupong**.
11. Här styr du om betalsättet tillåter öppna returer och dricks. Låt dem vara.
12. Tryck **Spara**.
13. **Klart!** Lunchkupong finns nu i kassan under **ALL PAYMENTS**. I kassan väljer du under **Min butik → Betalsätt** om den ska ha en snabbknapp.

**Fortsättning i iPad-kassan** – Ta betalt med det nya betalsättet

1. **Nu i iPad-kassan** – Betalsättet du lade till i Backstage finns nu i kassan.
2. Sälj en **Bryggkaffe**.
3. Tryck **ALL PAYMENTS**.
4. Här finns **Lunchkupong**. Tryck på den.
5. Tryck **Skip receipt**.
6. **Klart!** Köpet är registrerat som Lunchkupong och syns som ett eget betalsätt i Z-rapporten. Vill du ha en snabbknapp lägger du till den under **My Store → Payment Methods**.

**Fortsättning i mobilkassan** – Ta betalt med det nya betalsättet i mobilen

1. **Nu i mobilkassan** – Betalsättet du lade till i Backstage finns nu i mobilkassan.
2. Det ligger en Bryggkaffe i korgen. Tryck **CHARGE**.
3. Tryck **Lunchkupong**.
4. Tryck **Skip receipt**.
5. **Klart!** Köpet är registrerat som Lunchkupong och syns i Z-rapporten.

#### Rapporter och bokföring

##### 8. Hämta en Z-rapport

1. Gå till **Rapporter → Z-rapport**. Tryck först på **Rapporter**.
2. Tryck **Z-rapport**.
3. Här finns alla dagsavslut från kassorna. Tryck på den senaste.
4. Rapporten visar försäljning per grupp, moms och betalsätt. Tryck **Ladda ner PDF** för att spara den eller skicka till redovisningen.
5. **Klart!** Under **Rapporter** finns också periodrapport, SIE-fil och personalliggare.

### Övriga guider

#### Produktkatalog

##### Varianter

1. **Varianter** – Varianter samlar en artikel som finns i flera utföranden, t.ex. storlek eller färg. Alternativet måste skapas **innan** produkten.
2. Gå till **Produktkatalog → Alternativ för varianter**. Tryck först på **Produktkatalog**.
3. Tryck **Alternativ för varianter**.
4. Tryck **Skapa alternativ**.
5. Namn: **Färg**.
6. Första värdet: **Svart**.
7. Tryck **Lägg till värde**.
8. Andra värdet: **Vit**.
9. Tryck **Spara**.
10. Skapa produkten. Gå till **Produktkatalog → Produkter**. Tryck först på **Produktkatalog**.
11. Tryck **Produkter**.
12. Tryck **Lägg till produkter**.
13. Välj **Produkt med varianter**.
14. Bocka i **Svart**.
15. Bocka i **Vit**. Du kan välja alla värden eller bara några.
16. Öppna **Produktgrupp**.
17. Välj **Kaffebönor & muggar**.
18. Namn: **Termosmugg**.
19. Pris: **199**.
20. Tryck **Spara**.
21. Fliken **Varianter** har dykt upp. Där kan du sätta eget pris per variant. Lager per variant ställer du in under **Lager**.
22. **Klart!** I kassan väljer du variant när Termosmuggen läggs i varukorgen.

##### Ändra och ta bort produkter

1. Gå till **Produktkatalog → Produkter**. Tryck först på **Produktkatalog**.
2. Tryck **Produkter**.
3. Snabbast ändrar du direkt i listan. Tryck på **pennan** vid Bryggkaffe.
4. Raden går nu att redigera: namn, pris, avhämtningspris och grupp. Ändra **Standardpris** till **34**.
5. Bryggkaffe har inget eget avhämtningspris. Tryck **Lägg till pris**.
6. Avhämtningspris: **34**. Det gäller när kassören väljer Avhämtning.
7. Tryck **Spara** längst ner.
8. Vill du ändra mer, som beskrivning, tillval eller lager: tryck på **produktnamnet**. Då öppnas hela produkten.
9. Tryck **Produkter**.
10. Bocka i **Espresso**.
11. Bocka i **Cortado**.
12. Tryck **Redigera alla markerade**. Här ändrar du pris och produktgrupp för alla på en gång.
13. Nytt pris: **36**.
14. Tryck **Spara**.
15. **Klart!** Under **⋮** på varje rad finns **Gå till produkt**, **Kopiera produkt** och **Radera produkt**. Ordningen i kassan ändrar du genom att välja grupp och dra produkterna.

##### Rekommenderade produkter

1. Gå till **Produktkatalog → Produkter**. Tryck först på **Produktkatalog**.
2. Tryck **Produkter**.
3. Tryck på namnet **Cappuccino** för att öppna produkten.
4. Öppna fliken **Rekommendationer**.
5. Tryck **Lägg till produkt**.
6. Öppna gruppen **Bakverk** med pilen.
7. Bocka i **Kanelbulle**.
8. Tryck **Lägg till**.
9. **Klart!** När en Cappuccino läggs i varukorgen föreslår kassan en Kanelbulle. Ligger produkten redan i varukorgen trycker du på **glödlampan** för att se förslagen. Import/export tar inte med rekommendationer.

##### Popup-meddelanden

1. Gå till **Produktkatalog → Popup-meddelanden**. Tryck först på **Produktkatalog**.
2. Tryck **Popup-meddelanden**.
3. Tryck **Lägg till popup-meddelande**.
4. Namnet syns bara i listan. Skriv **Nötter**.
5. Texten visas i kassan. Skriv **Fråga om kunden är allergisk mot nötter.**
6. Bocka i **Visa en gång per order**, annars visas den för varje produkt.
7. Tryck **Spara**.
8. Koppla meddelandet till en produktgrupp. Gå till **Produkter**. Tryck först på **Produktkatalog**.
9. Tryck **Produkter**.
10. Tryck på gruppen **BAKVERK**.
11. Tryck **Redigera gruppen** (pennan).
12. Längst ner: slå på **Lägg till popup-meddelande**.
13. Öppna listan.
14. Välj **Nötter**.
15. Tryck **Spara**.
16. **Klart!** När ett bakverk säljs visar kassan meddelandet och kassören bekräftar innan försäljningen fortsätter. Passar t.ex. för ålderskontroll.

##### Ingredienser

1. Gå till **Produktkatalog → Ingredienser**. Tryck först på **Produktkatalog**.
2. Tryck **Ingredienser**.
3. Skapa en ingrediensgrupp. Tryck **+** bredvid **Ingrediensgrupper**.
4. Namn: **Bröd**.
5. Öppna **Färg**.
6. Välj **Sand**.
7. Tryck **Spara**.
8. Tryck **Lägg till ny ingrediens**.
9. Öppna **Ingrediensgrupp**.
10. Välj **Bröd**.
11. Namn: **Surdegsbröd**.
12. Öppna **Enhet**.
13. Välj **Styck (st)**.
14. Tryck **Spara**.
15. Koppla ingrediensen till en produkt. Gå till **Produkter**. Tryck först på **Produktkatalog**.
16. Tryck **Produkter**.
17. Tryck på namnet **Räksmörgås** för att öppna produkten.
18. Öppna fliken **Ingredienser**.
19. Tryck **Lägg till ingrediens**.
20. Öppna listan.
21. Välj **Surdegsbröd**.
22. Mängd: **1**.
23. Tryck **Spara**.
24. **Klart!** Varje såld räksmörgås drar nu en skiva surdegsbröd från lagret. Lager för ingrediensen ställer du in på ingrediensens flik **Lager**.

##### Import Wizard

1. **Import Wizard** – Har du en produktkatalog i ett annat kassasystem? Exportera den som Excel eller CSV och läs in den här.
2. Gå till **Produktkatalog → Import / export**. Tryck först på **Produktkatalog**.
3. Tryck **Import / export**.
4. Välj **Product import wizard**.
5. Dra in filen eller klicka för att välja den.
6. Tryck **Ladda upp**.
7. **Filen analyseras** – AI-verktyget läser filen och matchar kolumnerna mot Yabies produktkatalog. Det tar längre tid ju fler produkter du har.
8. Kontrollera matchningen. Här har guiden valt **Inköpspris** som pris, men kassan behöver försäljningspriset. Öppna listan.
9. Välj **Utpris**.
10. Tryck **Importera**.
11. Granska förhandsvisningen. Välj **Lägg till i befintlig katalog** (Ersätt tar bort det som finns).
12. Tryck **Importera**.
13. **Klart!** Produkterna finns nu i katalogen. Under fliken **Historik** ser du tidigare importer.

##### Allergener och specialkost

1. Slå först på funktionen. Gå till **Handlare → Inställningar**. Tryck först på **Handlare**.
2. Tryck **Inställningar**.
3. **Funktioner för allergener och specialkost** är redan PÅ. Är den av trycker du **Redigera** och slår på den.
4. Gå till **Produktkatalog → Produkter**. Tryck först på **Produktkatalog**.
5. Tryck **Produkter**.
6. Tryck på namnet **Chokladboll** för att öppna produkten.
7. Skrolla ner och tryck **Lägg till allergener och specialkost**.
8. Bocka i **Mjölk**.
9. Bocka i **Glutenfri** under Specialkost.
10. Tryck **Spara**.
11. Tryck **Spara** på produkten.
12. **Klart!** Informationen syns i varukorgen, på KDS, bongar, kvitton och i orderhistoriken. Innehåller en produkt inget av allergenerna väljer du **Inga allergener**.

##### PLU, SKU och vågkoder

1. Gå till **Produktkatalog → Produkter**. Tryck först på **Produktkatalog**.
2. Tryck **Produkter**.
3. Tryck på namnet **Croissant** för att öppna produkten.
4. Skrolla ner till **SKU / PLU** och skriv **205**. I kassan slår du 205 och trycker **Funktioner → PLU**.
5. Under **EAN/streckkod** anger du produktens streckkod så går den att skanna. För vägda varor från en våg (prefix 23–25) väljer du enheten Kilogram och anger produktens sexsiffriga EAN.
6. Tryck **Spara**.
7. **Klart!** Saknas numpaden eller PLU-knappen i kassan: slå på **Visa numpad** under Min butik → Betalsätt och lägg till **PLU** under Min butik → Funktioner.

##### Prislistor och moms för takeaway

1. **Takeaway-moms** – Livsmedel som tas med har 6 % moms (1 april 2026 – 31 december 2027). Med prislistan **Avhämtning** får produkterna rätt moms automatiskt när ordern markeras Ta med.
2. Gå till **Produktkatalog → Prislistor**. Tryck först på **Produktkatalog**.
3. Tryck **Prislistor**.
4. Tryck **Hantera produkter** på **Avhämtning (moms 6%)**.
5. Filtrera på grupp. Öppna listan.
6. Välj **Bakverk**.
7. Bocka i rutan i rubriken för att markera alla bakverk.
8. Tryck **Redigera priser för valda**.
9. Välj **Använd standardpris**. Priset blir detsamma men momsen 6 %.
10. Tryck **Spara**.
11. **Klart!** Prislistan är aktiv. I kassan: **Min butik → Produktkatalog → Hämta uppdaterad produktkatalog**. Behöver du ett eget bokföringskonto för 6 % lägger du till det under **Bokföring → Kontoplan**.

##### Momsregler för livsmedel

1. Gå till **Handlare → Inställningar**. Tryck först på **Handlare**.
2. Tryck **Inställningar**.
3. Under **Retailfunktioner**: tryck **Redigera** på **Momsregler för livsmedel**.
4. Bocka i butiken.
5. Tryck **Spara**.
6. Gå till **Produktkatalog → Prislistor**. Tryck först på **Produktkatalog**.
7. Tryck **Prislistor**.
8. Prislistan **Livsmedel** har skapats. Tryck **Hantera produkter** och markera produkterna som ska ha lägre moms, på samma sätt som för takeaway.
9. **Klart!** När en produkt i prislistan säljs dras 6 % moms automatiskt. Max 100 produkter visas per sida, använd gruppfiltret.

#### Kampanjer och lojalitet

##### Manuell kampanj

1. Tryck **Kampanjer**.
2. Tryck **Skapa kampanj**.
3. Namn: **Studentrabatt**.
4. Välj **Manuell kampanj**. Den passar när kassan inte kan kontrollera villkoret, t.ex. studentlegitimation.
5. Tryck **Kampanjregler**.
6. Manuella kampanjer kan bara vara **Rabatt**. Skriv **10**.
7. Tryck **Lägg till produkter**.
8. Tryck **Lägg till produkter**.
9. Bocka i **Kaffe**.
10. Tryck **Lägg till**.
11. Tryck **Schemalägg kampanj**.
12. Tryck **Se sammanfattning**.
13. Tryck **Skapa kampanj**.
14. **Klart!** Lägg sedan till knappen i kassan: **Redigera** → tom ruta → **Lägg till funktion → Kampanjer → Manuella kampanjer** → Studentrabatt. Kassören trycker på knappen vid köp.

**Fortsättning i iPad-kassan** – Manuell kampanj i kassan

1. **Nu i iPad-kassan** – En manuell kampanj läggs bara på när kassören väljer den, till exempel när kunden visar studentlegitimation.
2. Sälj en **Bryggkaffe**.
3. Kassan visar att en kampanj finns. Tryck **Show details**.
4. Kunden visar studentleg. Tryck på **Studentrabatt**.
5. **Klart!** Rabatten ligger nu på köpet. Du kan också lägga kampanjen som en egen knapp: **Edit** → tom ruta → **Lägg till funktion → Kampanjer → Manuella kampanjer**.

##### Kom igång med Yabie Lojalitet

1. Gå till **Lojalitet → Lojalitetsprogram**. Tryck först på **Lojalitet**.
2. Tryck **Lojalitetsprogram**.
3. Tryck **Skapa lojalitetsprogram**.
4. Namn: **Kaffeklubben**.
5. Ska poängen förfalla? Öppna **Tidsperiod**.
6. Välj **12 månader**. Poängen förfaller i slutet av månaden.
7. **Fråga alltid om medlemskap** gör att kassören får frågan vid varje köp. Slå på den.
8. **Tjäna poäng**: 1 poäng per krona är vanligast. Låt **1** stå.
9. Tryck **Spara**.
10. Skapa en bonus. Tryck **Skapa en bonus**.
11. Poängnivå: **500**.
12. Namn: **Bjuden kaffe**.
13. **Bonuscheck** ger ett fast belopp i rabatt.
14. Rabatt: **35** kr.
15. Tryck **Spara**.
16. Kunderna blir medlemmar via QR-koden. Tryck **QR-kod**.
17. Tryck **Ladda ner** och sätt upp koden i butiken.
18. **Klart!** I kassan lägger du till knappen **Medlemsfunktioner** under Min butik → Funktioner. Programmet kan ha upp till 10 bonusar.

##### Medlemmar och poäng

1. Gå till **Lojalitet → Medlemmar**. Tryck först på **Lojalitet**.
2. Tryck **Medlemmar**.
3. Tryck **Lägg till ny medlem**.
4. Mobilnumret är det enda som behövs. Skriv **+46701234567**.
5. Tryck **Spara**. Kunden får ett sms med en länk.
6. Öppna medlemmen.
7. Du kan bara ändra poängen, övriga uppgifter ändrar medlemmen själv. Skriv **100**.
8. Tryck **Spara**. Har kunden inte fått sms:et skickar du det igen med **Skicka inställningslänk**.
9. **Klart!** Poäng dras proportionerligt vid returer. Poäng tjänas inte på presentkort, dricks eller serviceavgifter.

##### Importera medlemmar

1. Gå till **Lojalitet → Importera medlemmar**. Tryck först på **Lojalitet**.
2. Tryck **Importera medlemmar**.
3. Ladda ner mallen. Telefonnummer (med landskod) är obligatoriskt, poäng är valfritt.
4. Fyll i mallen och dra in filen här.
5. Tryck **Ladda upp**.
6. **Klart!** Medlemmarna läggs in som **väntande**. De får inget välkomst-sms och kan använda poängen först när de har slutfört registreringen i butiken.

##### Medlemskommunikation

1. Segmenten delar upp medlemmarna. Gå till **Lojalitet → Segmentöversikt**. Tryck först på **Lojalitet**.
2. Tryck **Segmentöversikt**.
3. **Inaktiva medlemmar** har inte handlat på ett tag. Ändra gränsen till **60** dagar.
4. Tryck **Spara**.
5. Skicka ett erbjudande. Tryck **Kampanjer**.
6. Tryck **Skapa kampanj**.
7. Namn: **Medlemsvecka**.
8. Välj målgruppen **Lojalitetsmedlemmar**.
9. Tryck **Kampanjregler**.
10. Rabatt: **15** %.
11. Tryck **Lägg till produkter**.
12. Tryck **Lägg till produkter**.
13. Bocka i **Bakverk**.
14. Tryck **Lägg till**.
15. Tryck **Schemalägg kampanj**.
16. Tryck **Se sammanfattning**.
17. Slå på **Lägg till meddelanden**.
18. Välj kanal: bocka i **SMS**.
19. Skriv meddelandet, t.ex. **Medlemsvecka! 15 % på alla bakverk.**
20. Välj **Skicka meddelanden direkt** eller schemalägg till ett senare datum.
21. Tryck **Skapa kampanj**.
22. **Klart!** Meddelandet skickas med en kort fördröjning. Varje medlem får bara ett meddelande per händelse. Automatiska meddelanden när en bonus låses upp ställer du in på bonusen. SMS kostar 99 kr/mån.

#### Kök

##### Bongutskrift och skrivarstationer

1. **Bongar till köket** – För att skriva ut bongar slår du på funktionen och skapar en **skrivarstation** som bestämmer vilka produkter som skrivs ut var.
2. Under **INSTÄLLNINGAR**: gå till **Handlare → Inställningar**. Tryck först på **Handlare**.
3. Tryck **Inställningar**.
4. Under **Bongfunktioner**: tryck **Redigera** på **Bongutskrifter**.
5. Välj referens: löpnummer 1–999 eller fritext. Referensen står på både bong och kvitto. Öppna listan.
6. Välj **Automatisk (1-999)**.
7. Tryck **Spara**.
8. Gå till **Kök → Skrivarstationer**. Tryck först på **Kök**.
9. Tryck **Skrivarstationer**.
10. Tryck **Lägg till station**.
11. Namnge stationen **Bar**.
12. Öppna **Butik**.
13. Välj **Kaffebaren**.
14. Tryck **Lägg till produkter**.
15. Bocka i **Kalla drycker**.
16. Tryck **Lägg till**.
17. Tryck **Spara**.
18. **Klart!** Stationen **Bar** finns nu i kassan under **Min butik → Skrivare**. Där väljer du vilken skrivare den skriver ut på.

##### Köksdisplay

1. Gå till **Kök → Köksdisplay**. Tryck först på **Kök**.
2. Tryck **Köksdisplay**.
3. Tryck **Lägg till köksdisplay**.
4. Välj butik. Öppna listan.
5. Välj **Kaffebaren**.
6. Namn: **Varmt**.
7. Tryck **Lägg till produkter**.
8. Bocka i **Smörgåsar**.
9. Tryck **Lägg till**.
10. Tryck **Spara**.
11. **Klart!** Logga in i KDS-appen på köksskärmen och välj en ledig licens. Kugghjulet öppnar inställningarna. En skrivare på KDS kopplas med kabel eller LAN, inte via molnet.

##### Rätter

1. Slå på funktionen. Gå till **Handlare → Inställningar**. Tryck först på **Handlare**.
2. Tryck **Inställningar**.
3. Tryck **Redigera** på **Hantering av rätter (Fram/Vänta)**.
4. Bocka i butiken.
5. Tryck **Spara**.
6. Gå till **Kök → Rätter**. Tryck först på **Kök**.
7. Tryck **Rätter**.
8. Tryck **Skapa ny rätt**.
9. Namn: **Varmrätt**.
10. Välj var rätten ska finnas. Öppna **Plats**.
11. Välj **Kaffebaren**.
12. Standardinställningen **Vänta** betyder att varmrätten hålls kvar tills kassören skickar den. Den är redan vald.
13. Tryck **Lägg till produktgrupper**.
14. Bocka i **Smörgåsar**.
15. Tryck **Lägg till**.
16. Tryck **Spara**.
17. **Klart!** I kassan visar varukorgen rätten med blå banderoll (Servera) eller röd (Vänta). På bordet trycker du **Servera Varmrätt** när det är dags. Slå gärna på bordskartor och bongskrivare också.

##### Bordskartor

1. Gå till **Kök → Bordskartor**. Tryck först på **Kök**.
2. Tryck **Bordskartor**.
3. Tryck **Lägg till bordskarta**.
4. Bordskartanamn: **Uteservering**.
5. Öppna **Butik**.
6. Välj **Kaffebaren**.
7. Rutnätet är 8 rutor brett och 6 rutor högt, precis som bordskartan i kassan. Varje **+** är en plats där du kan skapa ett bord.
8. Tryck på **+** längst upp till vänster.
9. Namn: **Ute 1**.
10. Öppna **Färg**.
11. Välj **Mint**.
12. Tryck **OK**.
13. Skapa ett bord till. Tryck på **+** två rutor till höger.
14. Namn: **Ute 2**.
15. Öppna **Färg**.
16. Välj **Mint**.
17. Tryck **OK**.
18. Ett större bord gör du genom att dra i hörnet längst ner till höger. Prova gärna. Håller du i bordet och drar flyttar du det till en annan ruta.
19. Pennan öppnar **Redigera bord**, där du byter namn och färg eller bockar i **Ta bort bord**.
20. Under **Visa som** kan du byta till **Lista**. Där drar du borden i den ordning de ska visas i kassans bordslista.
21. Tryck **Spara**. Pilen bredvid har **Spara och stäng**.
22. **Klart!** Bordskartan finns nu i kassan under **Parkerat**. Funktionen kräver att **parkera ordrar** och **bordskartor** är på under Handlare → Inställningar. Undvik att ändra bordskartor medan det finns öppna bord.

**Fortsättning i iPad-kassan** – Använd bordskartan i kassan

1. **Nu i iPad-kassan** – Bordskartan **Uteservering** finns nu under **Parked** i kassan.
2. Lägg en **Kanelbulle** i varukorgen.
3. Tryck **Park**.
4. Varje bordskarta har en egen flik. Tryck **Uteservering**.
5. Tryck på bordet **Ute 1**. Ordern parkeras där.
6. **Klart!** Bordet visar nu ordern och summan. Bordskartan är gemensam för alla kassor, så ordern kan tas över i mobilkassan.

**Fortsättning i mobilkassan** – Använd bordskartan i mobilen

1. **Nu i mobilkassan** – Bordskartan **Uteservering** finns nu under Park i mobilkassan.
2. Det ligger en Kanelbulle i korgen. Tryck **Park**.
3. Bordskartan **Uteservering** är vald i listan. Tryck på **Ute 1**.
4. Tryck **Confirm**.
5. **Klart!** Ordern ligger på Ute 1. Bordskartan är gemensam, så iPad-kassan ser samma bord.

##### Bongkö

1. Gå till **Handlare → Inställningar**. Tryck först på **Handlare**.
2. Tryck **Inställningar**.
3. Bongkö samlar flera ordrar på en bong så att allt tillagas samtidigt. Tryck **Redigera** på **Funktion för bongkö**.
4. Bocka i butiken.
5. Tryck **Spara**.
6. **Klart!** I kassan lägger du till funktionsknappen för bongkö, trycker **Starta bongkö**, tar alla beställningar och trycker **Skicka bong**.

#### Personal och betalning

##### Swish

1. **Swish Företag eller Swish Handel** – **Swish Företag**: kunden swishar manuellt till ett nummer, utan koppling till kassan. **Swish Handel**: betalningen kopplas till kassan och returer görs automatiskt. Osäker? Fråga banken.
2. Gå till **Betalningar → Betalsätt**. Tryck först på **Betalningar**.
3. Tryck **Betalsätt**.
4. Tryck **Lägg till nytt betalsätt**.
5. Öppna **Butik**.
6. Välj **Kaffebaren**.
7. Öppna **Betalsätt**.
8. Välj **Swish Handel**. (För Swish Företag väljer du Fristående → Swish Företag.)
9. Skriv ert **Swish-nummer**: **1231234567**.
10. Tryck **Spara**.
11. **Klart!** Ansöker du om Swish Handel hos banken anger du teknisk leverantör **Yabie AB**, leverantörs-ID **9873490750**. Med Swish Företag gör du returen i Yabie och betalar tillbaka själv.

**Fortsättning i iPad-kassan** – Ta betalt med Swish i kassan

1. **Nu i iPad-kassan** – Med Swish Handel är betalningen kopplad till kassan.
2. Tryck på **Cappuccino**.
3. Tryck **Add to Basket**.
4. Tryck **ALL PAYMENTS**.
5. Välj **Swish**.
6. Kassan visar en QR-kod som kunden skannar i Swish-appen. Kassan väntar tills betalningen är klar. Tryck **Simulera att kunden betalar**.
7. Tryck **Skip receipt**.
8. **Klart!** Swish-betalningen är klar. Med Swish Handel görs returer automatiskt tillbaka till kundens Swish.

**Fortsättning i mobilkassan** – Ta betalt med Swish i mobilen

1. **Nu i mobilkassan** – Swish Handel finns även i mobilkassan.
2. Det ligger en Cappuccino i korgen. Tryck **CHARGE**.
3. Tryck **Swish Handel**.
4. Tryck **Skip receipt**.
5. **Klart!** Swish-betalningen är registrerad. Returer går automatiskt tillbaka till kundens Swish.

##### Yabie presentkort

1. Gå till **Betalningar → Betalsätt**. Tryck först på **Betalningar**.
2. Tryck **Betalsätt**.
3. Lägg först till betalsättet. Tryck **Lägg till nytt betalsätt**.
4. Öppna **Butik**.
5. Välj **Kaffebaren**.
6. Öppna **Betalsätt**.
7. Välj **Yabie Presentkort**.
8. Tryck **Spara**.
9. Gå till **Yabie presentkort → Presentkortsmallar**. Tryck först på **Yabie presentkort**.
10. Tryck **Presentkortsmallar**.
11. Tryck **Lägg till ny Yabie presentkortsmall**.
12. Namn: **Presentkort 200 kr**.
13. Öppna **Giltighetstid**.
14. Välj **2 år**.
15. Under **Pristyp**: välj **Fast pris**. Med Öppet pris anger kassören beloppet vid försäljningen.
16. Pris inkl. moms: **200**.
17. **Skuldkonto** (2420) och **Intäktskonto** (3690) är förifyllda. Kontrollera dem med din redovisningskonsult.
18. Tryck **Spara**.
19. **Klart!** Produktgruppen **Presentkort** har skapats i kassan. Vid försäljning väljer kassören kodtyp (automatisk eller egen kod för fysiska kort) och leverans via SMS, e-post eller utskrift. Syns inte mallen: synkronisera produktkatalogen i kassan.

##### Dricks

1. Gå till **Handlare → Inställningar**. Tryck först på **Handlare**.
2. Tryck **Inställningar**.
3. Under **Mat- och dryck funktioner**: tryck **Redigera** på **Dricksfunktion i appen**.
4. Bocka i butiken.
5. Tryck **Spara**.
6. Slå på dricks per betalsätt. Gå till **Betalningar → Betalsätt**. Tryck först på **Betalningar**.
7. Tryck **Betalsätt**.
8. Öppna **Kontokort**.
9. Kontrollera att **Dricks kan ges med denna betalmetod** är ibockad.
10. Tryck **Spara**.
11. **Klart!** Dricks i kortterminalen ställer support in. Använder du integrerad terminal med dricks: låt dricks alltid vara på i kassan (Fler val → Dricks).

#### Lager

##### Lagerhantering av produkter

1. Gå till **Produktkatalog → Produkter**. Tryck först på **Produktkatalog**.
2. Tryck **Produkter**.
3. Tryck på namnet **Kaffebönor 500 g** för att öppna produkten.
4. Öppna fliken **Lager**.
5. Tryck **Aktivera lagerhantering**.
6. Tryck **Redigera** för att uppdatera lagersaldot.
7. Nytt lagersaldo: **24**.
8. Välj personal. Öppna listan.
9. Välj **Anna Ägare**.
10. Välj anledning.
11. Välj **Leverans**.
12. Tryck **Spara**.
13. Slå på **Lågt lagersaldo** så varnar kassan när det börjar ta slut.
14. Gräns: **5**.
15. Tryck **Spara**.
16. **Klart!** Saldot minskar för varje såld påse. Vill du få mejl när gränsen nås ställer du in det under **Rapporter → Inställningar**.

##### Mejl om lågt lagersaldo

1. Gå till **Rapporter → Rapportinställningar**. Tryck först på **Rapporter**.
2. Tryck **Rapportinställningar**.
3. Längst ner finns **Lågt lagersaldo**. Bocka i **Skapa automatiskt**.
4. Klockslag: **07:00**.
5. Hur ofta? Öppna listan.
6. Välj **Dagligen**.
7. Välj butik.
8. Välj **Kaffebaren**.
9. Under **Mottagare**, e-post: **lager@kaffebaren.se**.
10. Tryck **Spara**.
11. **Klart!** Mejlet listar produkterna som nått gränsen med saldo och en CSV-fil. Gränsen ställer du in per produkt under fliken Lager.

##### Lagerplatser

1. Gå till **Lagerhantering → Lagerplatser**. Tryck först på **Lagerhantering**.
2. Tryck **Lagerplatser**.
3. Här slår du av och på lagerhanteringen per butik, t.ex. av för en tillfällig pop up-butik. Låt Kaffebaren vara på.
4. Lager utanför butikerna lägger du till under **Platser → Lagerplatser**. Tryck först på **Platser**.
5. Tryck **Lagerplatser**.
6. Tryck **Lägg till ny lagerplats**.
7. Namn: **Förråd**.
8. Tryck **Spara**.
9. **Klart!** Lagerplatsen kan nu användas i lagerförflyttningar och inventeringar.

##### Inventering

1. Gå till **Lagerhantering → Inventering**. Tryck först på **Lagerhantering**.
2. Tryck **Inventering**.
3. Tryck **Ny inventering**.
4. Namn: **Årsinventering**.
5. Välj vem som räknar.
6. Välj **Kim Karlsson**.
7. Välj plats.
8. Välj **Kaffebaren**.
9. **Fullständig inventering** tar med alla produkter med lagerhantering. Delvis räknar bara det du väljer.
10. Tryck **Skapa lagerinventering**.
11. Tryck **Räkna artikel** på Kaffebönor.
12. Det står 24 i systemet men du räknar **22**.
13. Antalet skiljer sig, så du måste ange en anledning. Öppna listan.
14. Välj **Svinn**.
15. Tryck **Spara**.
16. Räkna **Mugg**.
17. Skriv **12**.
18. Tryck **Spara**.
19. Alla är räknade. Tryck **Slutför inventering**. (Med **Stäng** sparas den som Påbörjad.)
20. Öppna **Lagerrapport** för inventeringen.
21. **Klart!** Rapporten visar avvikelserna. Inventering kan också göras med appen Yabie Companion och skanner.

##### Lagerförflyttning och leveranser

1. Gå till **Lagerhantering → Lagerförflyttning**. Tryck först på **Lagerhantering**.
2. Tryck **Lagerförflyttning**.
3. Tryck **Ny lagerförflyttning**.
4. Från: öppna listan.
5. Välj **Lager Ulvsunda**.
6. Till: öppna listan.
7. Välj **Kaffebaren**.
8. Vem skapar förflyttningen?
9. Välj **Kim Karlsson**.
10. Anledning?
11. Välj **Påfyllning**.
12. Välj produkt.
13. Välj **Mugg**.
14. Antal: **6**.
15. Tryck **Lägg till**.
16. Tryck **Granska**.
17. Stämmer allt? Tryck **Slutför lagerförflyttning**.
18. Förflyttningen har status **Pågående**. När varorna har kommit fram trycker du på de tre prickarna.
19. Tryck **Markera som färdig**. Saldot uppdateras i butiken.
20. Leveransen syns nu under **Lagerhantering → Leveranser**. Tryck först på **Lagerhantering**.
21. Tryck **Leveranser**.
22. **Klart!** I appen Yabie Companion tar butiken emot leveransen under **Ta emot**.

##### Lagerrapporter

1. Gå till **Lagerhantering → Lagerrapporter**. Tryck först på **Lagerhantering**.
2. Tryck **Lagerrapporter**.
3. Tryck **Lågt lagersaldo** för att se vad som behöver beställas.
4. **Lagernivå** visar antal, inköpspris och lagervärde. Tryck på den.
5. Alla rapporter kan exporteras. Tryck **Exportera**.
6. **Klart!** Lageravvikelse visar skillnaderna från inventeringar och Lagerändringar alla justeringar och förflyttningar.

#### Personal och betalning

##### Behörigheter och PIN-längd

1. Gå till **Användare → Alla användare**. Tryck först på **Användare**.
2. Tryck **Alla användare**.
3. Öppna **Bea Barista**.
4. Ge Bea behörighet att **Ge rabatter** utan att en chef behöver ange PIN.
5. Tryck **Spara**.
6. PIN-längden ställer du in under **Handlare → Inställningar**. Tryck först på **Handlare**.
7. Tryck **Inställningar**.
8. Tryck **Redigera** på **Längd på användar-PIN**.
9. Välj **Flexibel PIN-längd**: alla väljer själva 4–10 siffror. Fast längd betyder samma längd för alla.
10. Tryck **Spara**.
11. **Klart!** En användare utan behörighet ser alla inställningar i kassan, men måste ange PIN-koden för någon som har behörighet.

##### Personalliggare

1. Gå till **Personalliggare → Personalliggare**. Tryck först på **Personalliggare**.
2. Tryck **Personalliggare**.
3. **Personalliggaren** – Här ser du när personalen stämplat in och ut i kassan. Skatteverket kan begära att se den vid kontrollbesök.
4. Har någon glömt att stämpla in? Tryck **Lägg till skift**.
5. Välj anställd.
6. Välj **Kim Karlsson**.
7. Kontrollera tiderna och tryck **Spara**.
8. Glömt att stämpla ut? Tryck på pennan för att rätta skiftet.
9. Ändra tiden och tryck **Spara**.
10. **Klart!** I kassan lägger du till knappen **Personalliggare** under Min butik → Funktioner. Personalen stämplar med sin PIN-kod.

**Fortsättning i iPad-kassan:** se guiden *Stämpla in och ut i personalliggaren*.

**Fortsättning i mobilkassan:** se guiden *Stämpla in och ut med tidsregistrering*.

#### Rapporter och bokföring

##### Periodrapport

1. Gå till **Rapporter → Periodrapport**. Tryck först på **Rapporter**.
2. Tryck **Periodrapport**.
3. Öppna **Välj butik**.
4. Välj **Kaffebaren**.
5. Från: **2026-10-01**.
6. Till: **2026-10-11**.
7. E-post: **ekonomi@kaffebaren.se**.
8. Tryck **Skicka rapport**.
9. **Klart!** Periodrapporten kan också tas ut i kassan under Min butik → Rapporter.

##### SIE-fil till bokföringen

1. Gå till **Rapporter → SIE Rapport**. Tryck först på **Rapporter**.
2. Tryck **SIE Rapport**.
3. Under **Autogenererade SIE-filer** skapas en fil automatiskt för varje Z-rapport.
4. Vill du ta ut en egen period: tryck fliken **SIE Export**.
5. Öppna **Välj butik**.
6. Välj **Kaffebaren**.
7. Från: **2026-09-01**.
8. Till: **2026-09-30**.
9. Tryck **Ladda ner rapport** och läs in filen i bokföringsprogrammet.
10. **Klart!** Kontona i SIE-filen ställer du in under **Bokföring → Kontoplan**.

##### Automatiska rapporter

1. Gå till **Rapporter → Rapportinställningar**. Tryck först på **Rapporter**.
2. Tryck **Rapportinställningar**.
3. Varje rapporttyp har en egen ruta. Z-rapporten skapas redan automatiskt vid dagens slut.
4. Under **Detaljerade försäljningsrapporter**: bocka i **Skapa automatiskt**.
5. Klockslag: **16:00**.
6. Hur ofta? Öppna listan.
7. Välj **Veckovis**.
8. Bocka i **Skicka automatiskt** så mejlas rapporten.
9. Tryck **Spara**.
10. **Klart!** Rapporterna mejlas nu automatiskt.

##### Kontoplan

1. Gå till **Bokföring → Kontoplan**. Tryck först på **Bokföring**.
2. Tryck **Kontoplan**.
3. Kontoplanen har tre flikar. Öppna **Momsgrupper**.
4. Öppna **Produktgrupper**.
5. Säljer du bakverk med 6 % moms via prislistan Avhämtning behöver försäljningen ett eget konto. Tryck **+** vid Bakverk.
6. Välj momsgrupp.
7. Välj **6 %**.
8. Konto: **3003**.
9. Tryck **Spara**.
10. **Klart!** Kontrollera kontona med din redovisningskonsult. Fel konto ger felet **Ogiltigt konto** i Fortnox.

##### Fortnox

1. Tryck **Integrationer**.
2. Välj **Fortnox**.
3. Ange e-post för felmeddelanden: **ekonomi@kaffebaren.se**.
4. Tryck **Hämta behörighetskod**. Du loggar in i Fortnox och godkänner.
5. Tryck **Nästa**.
6. Välj verifikationsserie för butiken.
7. Välj **K**. Kostnadsställe är valfritt.
8. Tryck **Nästa**.
9. Manuell synkronisering av historik är valfritt. Tryck **Nästa**.
10. **Klart!** Fortnox behöver modulerna Bokföring, Integration och Arkivplats. Fel ser du under **Synkningshistorik**. Verifikationsserien måste vara markerad med Manuell kontering i Fortnox.

#### Hårdvara och online

##### Star Cloud-skrivare

1. **Bongskrivare via molnet** – I appen Star Quick Setup Utility: **Printer Settings → Star CloudPRNT Settings**, slå på CloudPRNT Service, ange serveradressen från Yabies supportsida och sätt Polling Time till 1 sekund.
2. Gå till **Extern hårdvara → Star Cloud-skrivare**. Tryck först på **Extern hårdvara**.
3. Tryck **Star Cloud-skrivare**.
4. Tryck **Lägg till skrivare**.
5. Välj butik.
6. Välj **Kaffebaren**.
7. Namn: **Kök**.
8. MAC-adressen står i appen eller på ett Self Test-kvitto. Skriv **00:11:62:2a:4f:10**.
9. Tryck **Spara**.
10. **Klart!** I kassan: **Min butik → Skrivare**, välj stationen och skrivaren och skriv ut ett testkvitto.

##### Bild på kunddisplayen

1. Gå till **Extern hårdvara → Kunddisplay**. Tryck först på **Extern hårdvara**.
2. Tryck **Kunddisplay**.
3. Tryck **Lägg till kunddisplaybild**.
4. Öppna **Butik**.
5. Välj **Kaffebaren**.
6. Klicka i rutan för att välja en bild.
7. Tryck **Spara**.
8. **Klart!** Bilden visas på kunddisplayen när ingen order pågår. Själva displayen kopplar du i kassan under Min butik → Kunddisplay.

##### Yabie Online

1. Gå till **Platser → Onlinebutiker**. Tryck först på **Platser**.
2. Tryck **Onlinebutiker**.
3. Tryck **Redigera** på onlinebutiken.
4. Ladda ner butikens QR-kod. Gästerna skannar den och väljer Ta med eller Äta här.
5. E-post för kundkontakt: **info@kaffebaren.se**.
6. Välj beställningsmetod: **Ta med och Äta här**.
7. Tryck **Spara**.
8. Öppna fliken **Bordshantering**.
9. Tryck **Skapa en ny bordssektion**.
10. Namn: **Matsalen**.
11. Bord: **Bord 1, Bord 2, Bord 3**.
12. Tryck **Spara**.
13. **Klart!** Varje bord har en egen QR-kod (A6-mall) så kopplas beställningen automatiskt till bordet. Produkter med öppet pris, varianter eller annan enhet än styck stöds inte online.

#### Inställningar

##### Slå på funktioner

1. Gå till **Handlare → Inställningar**. Tryck först på **Handlare**.
2. Tryck **Inställningar**.
3. Här slår du av och på funktioner i kassan. **Möjlighet att lägga till antal gäster** ger kassan knappen för gäster.
4. Tryck **Redigera**.
5. Bocka i butiken där funktionen ska gälla.
6. Tryck **Spara**.
7. **Klart!** Ändringen skickas till kassorna. Logga ut och in i kassan om den inte syns direkt.

##### Licenser

1. Tryck **Licenser**.
2. Varje kassa, köksskärm och kunddisplay har en licens. Här ser du kassanummer, appversion och status.
3. **Klart!** Ska en licens flyttas till en ny iPad kontaktar du Yabies support.

## Mobilkassan

### Grundkurs: Kassan i mobilen

#### Kom igång

##### 1. Hitta i mobilkassan

1. **Kassan i fickan** – Det här är Yabie-kassan på Sunmi V3. Den använder samma konto, produkter och betalsätt som kassan på iPad, men skärmen är anpassad för en hand. Allt du ändrar i Backstage syns här också.
2. Produktgrupperna visas som färgade rutor, tre i bredd. Tryck **Kaffe**.
3. Nu ser du produkterna i gruppen med pris. Rutan **Back** tar dig tillbaka till alla grupper. Tryck på den.
4. **Search** letar bland alla produkter på namn, SKU eller streckkod. Bra när sortimentet är stort.
5. Varukorgen ligger i en egen flik längst ner, eftersom skärmen är för smal för att visa allt på en gång. Tryck **Basket**.
6. Siffran på fliken visar hur många artiklar som ligger i korgen. Gå tillbaka med **Catalog**.
7. Menyn uppe till vänster heter **My Store**, precis som på iPaden. Tryck på den.
8. Här finns **Z-Report**, **Order History** och alla inställningar. Stäng menyn med krysset.
9. **Klart!** Nu hittar du runt. Nästa del: sälj en kaffe med tillval.

#### Försäljning

##### 2. Sälj en produkt med tillval

1. Tryck **Kaffe**.
2. Tryck **Cappuccino**. Produkter med tillval öppnar en egen vy.
3. Tillvalen visas som knappar. Under **Mjölk** väljer du en. Tryck **Havremjölk**.
4. Under **Extra** får kunden välja flera. Tryck **Extra shot**. Med **+** och **−** på knappen ändrar du antalet.
5. Ska kaffet tas med? Välj **Take-away**. Då används momsen för avhämtning om ni har den prislistan.
6. Priset med tillval syns överst. Tryck **Add to Basket**.
7. Korgen har fått en etta. Tryck **Basket**.
8. Raden visar produkten med tillvalen indragna under. Trycker du på raden kan du ändra tillval, antal och rabatt, eller ta bort den.
9. **Klart!** Så säljer du med tillval. Trycker du på en produkt utan tillval läggs den direkt i korgen.

#### Betalning

##### 3. Ta betalt kontant

1. Kunden ska betala 67 kr. Tryck **CHARGE**.
2. Betalsätten visas som knappar. Tryck **Cash**.
3. **Växelkassa** – Första kontantköpet för dagen kräver att du anger växelkassan, alltså hur mycket som ligger i kassalådan när dagen börjar.
4. Knappa in **500**.
5. Tryck **Open cash balance**.
6. Kunden ger dig en hundralapp. Knappa in **100**. Växeln räknas ut direkt.
7. Tryck **Proceed**. Har kunden jämna pengar trycker du i stället **Proceed with** beloppet.
8. Köpet är klart. Rutan visar betalt belopp, mottagna kontanter och växel.
   - *Om v3:* Sunmi V3 har en inbyggd kvittoskrivare upptill. Tryck **Print** så skrivs kvittot ut direkt. Kunden kan också få det via **SMS** eller **Email**.
   - *Om a920:* PAX A920 Pro har en inbyggd kvittoskrivare. Tryck **Print** så skrivs kvittot ut direkt. Kunden kan också få det via **SMS** eller **Email**.
   - *Om a35:* Samsung A35 har ingen inbyggd skrivare. Kunden kan få kvittot via **SMS** eller **Email**, eller så kopplar du en skrivare. Tryck nu **Skip receipt**.
9. **Klart!** Växelkassan är öppnad för dagen och räknas in i Z-rapporten.

##### 4. Ta betalt med kort

1. Tryck **CHARGE**.
   - *Om v3:* Sunmi V3 har en kortläsare inbyggd ovanför skärmen. Tryck **Kontokort**.
   - *Om a920:* PAX A920 Pro är både kassa och kortterminal (ECR on device). Tryck **Kontokort**.
   - *Om v3:* Betalningsappen öppnas på samma skärm med beloppet ifyllt. Kunden blippar kortet eller mobilen mot symbolen överst på enheten. Tryck **Simulera kort**.
   - *Om a920:* Betalningsappen öppnas på samma skärm med beloppet ifyllt. Kunden blippar kortet mot skärmen eller sätter i det i läsaren längst ner. Tryck **Simulera kort**.
   - *Om a35:* **Fristående terminal** – Mobilen har ingen kortläsare. Kortet tas i en fristående terminal: slå in beloppet där, låt kunden betala, och registrera sedan betalningen i kassan.
   - *Om a35:* När terminalen har godkänt köpet: tryck **Kontokort Trådlös**.
   - *Om v3:* Sunmi V3 har en inbyggd kvittoskrivare upptill. Tryck **Print** så skrivs kvittot ut direkt. Kunden kan också få det via **SMS** eller **Email**.
   - *Om a920:* PAX A920 Pro har en inbyggd kvittoskrivare. Tryck **Print** så skrivs kvittot ut direkt. Kunden kan också få det via **SMS** eller **Email**.
   - *Om a35:* Samsung A35 har ingen inbyggd skrivare. Kunden kan få kvittot via **SMS** eller **Email**, eller så kopplar du en skrivare. Tryck nu **Skip receipt**.
2. **Klart!** Kortbetalningen finns nu i orderhistoriken och i Z-rapporten.

#### Försäljning

##### 5. Parkera en order på bord

1. Gästen vill betala senare. Tryck **Park**.
2. Borden kommer från bordskartan i Backstage. Fyllda bord är lediga, vita med färgad kant har en order. Tryck på första bordet.
3. Tryck **Confirm**.
4. Korgen är tom och ordern ligger på bordet. Nu kommer gästen och vill betala. Tryck **Parked**.
5. Bordet visar summan. Tryck på det.
6. Här kan du skriva ut en nota, flytta ordern eller ta bort den. Tryck **Add to basket**.
7. Den gröna raden visar att ordern hör till bordet. Lägger gästen till något trycker du **Save** för att spara det på bordet igen. Annars tar du betalt som vanligt.
8. **Klart!** Bordskartan är gemensam för alla kassor. En order som du parkerar i mobilen kan tas över i kassan på iPaden, och tvärtom.

##### 6. Ge rabatt

1. Rabatter och delning av notan ligger under **FUNCTIONS**. Tryck där.
2. Tryck **Discount**.
3. Rabattknapparna ställs in under My Store → Discount Buttons. Tryck **10%**.
4. Rabatten visas ovanför totalen. Den hamnar på kvittot och i Z-rapporten.
5. **Klart!** Behöver du ett eget belopp: tryck **Manual Discount Input** i stället för en knapp.

#### Returer

##### 7. Gör en retur

1. Returer görs från en tidigare order. Öppna menyn.
2. Tryck **Order History**.
3. Senaste ordern ligger överst. Tryck på den.
4. Tryck **Select items to return**.
5. Bocka i artikeln som ska returneras.
6. Tryck **Return selected items**.
7. Korgen visar **Receiving** med minusbelopp och knappen är röd. Tryck **CHARGE**.
8. Pengarna går tillbaka med samma betalsätt som köpet. Tryck **Cash**.
9. Ge kunden pengarna och tryck **Proceed with** beloppet.
10. Skriv en anledning, t.ex. **Fel vara**.
11. Tryck **Next**.
12. Returen är klar. Tryck **Skip receipt**.
13. **Klart!** Ordern är nu markerad som returnerad i orderhistoriken.

#### Dagsavslut

##### 8. Gör en Z-rapport

1. Dagen är slut. Öppna menyn.
2. Tryck **Z-Report**.
3. Välj hur rapporten ska levereras: utskrift, e-post och/eller på skärmen. E-posten går till adressen nedanför.
4. Tryck **Create Report**.
5. Rapporten summerar försäljningen sedan förra Z-rapporten per betalsätt, rabatter, returer och förväntade kontanter i lådan. Tryck **Done**.
6. **Klart!** Gör en Z-rapport varje dag du har sålt något. Växelkassan nollställs och anges igen vid nästa kontantköp.

### Övriga guider

#### Försäljning

##### Ändra en rad i korgen

1. Tryck på raden **Cappuccino** i korgen.
2. Samma ruta som när du lade till produkten öppnas, med valen ifyllda. Kunden ville ha havremjölk. Tryck **Havremjölk**.
3. Kunden vill ha två. Tryck **+**.
4. Papperskorgen här tar bort hela raden. Vi behåller den.
5. Tryck **Update**.
6. **Klart!** Raden är uppdaterad med nytt tillval och antal.

##### Rabatt på en artikel

1. Tryck **Kaffe**.
2. Tryck **Cappuccino**.
3. Procentknappen bredvid antalet ger rabatt på just den här artikeln, inte hela ordern. Tryck på den.
4. Samma rabattknappar som för hela korgen. Tryck **20%**.
5. Rabatten syns under priset. Tryck **Add to Basket**.
6. Tryck **Basket**.
7. Rabatten står på raden, i rött, och dras av från radens pris.
8. **Klart!** Rabatt på hela korgen ger du i stället via **FUNCTIONS → Discount**.

#### Produkter

##### Ändra en produkt från kassan

1. Tryck **Kaffe**.
2. Håll fingret på **Bryggkaffe** en stund, ett så kallat långt tryck. Ett vanligt tryck lägger bara varan i korgen. Med musen håller du ner knappen i en halv sekund.
3. Produkten öppnas med bild och beskrivning. Pennan uppe till vänster öppnar den för redigering. Tryck på den.
4. Här ändrar du namn, produktgrupp och pris. Ändringen sparas i Backstage och syns i alla kassor.
5. **Avhämtning** ger produkten 6 % moms när den säljs som take-away. Tryck på reglaget.
6. Längst ner byter du produktbild. **Take photo** fotograferar med enhetens kamera och **Add image** hämtar en bild som finns på enheten.
7. **Save** sparar. **Save & copy** sparar och skapar en kopia att utgå från. Den här gången sparar vi inte.
8. Tryck på pilen för att gå tillbaka utan att spara.
9. **Klart!** En produkt som ligger i korgen går inte att redigera, så töm korgen först. Större ändringar som tillval och lagersaldo gör du enklast i Backstage.

##### Visa produktbilder i katalogen

1. Tryck på menyn uppe till vänster.
2. Tryck **Product Catalog**.
3. **Enable images on catalog buttons** slår på och av produktbilderna. Med bilder blir knapparna större, så färre produkter får plats på skärmen. Tryck på reglaget.
4. Har du lagt in nya bilder i Backstage trycker du **Synchronize Product Catalog** så att kassan hämtar dem.
5. Stäng menyn och titta på katalogen.
6. **Klart!** Slå på bilderna igen på samma ställe. En egen bild lägger du till genom att hålla fingret på produkten, trycka på pennan och välja **Add image**.

#### Kassa

##### Lägg in och ta ut kontanter

1. Tryck **FUNCTIONS**.
2. Tryck **Cash drawer**.
3. Överst ser du hur mycket kontanter som ska finnas i lådan. Du har fått växel från banken. Tryck **Add Cash**.
4. Skriv **200**.
5. Skriv en anteckning, till exempel **Växel**.
6. Tryck **Update cash balance**.
7. **Open Drawer** öppnar en kassalåda som är kopplad till enheten, utan att något säljs. Tryck på den.
8. **Close Balance** räknar av lådan vid dagens slut och visar en eventuell differens. Den används sällan, eftersom Z-rapporten stänger kassan.
9. **Klart!** Insättningar och uttag syns i Z-rapporten under **Cash added/removed**.

#### Betalning

##### Dela notan på belopp

1. Tryck **FUNCTIONS**.
2. Tryck **Split by amount**.
3. Högst upp står hur mycket som återstår. Första gästen betalar 100 kr. Sudda och skriv **100**.
4. Tryck **Charge**.
5. Tryck **Swish Handel**.
6. Tryck **Skip receipt**. Du kommer tillbaka till korgen.
7. Under totalen står vad som är betalt och vad som återstår. Tryck **CHARGE** för resten.
8. Tryck **Swish Handel**.
9. Tryck **Skip receipt**.
10. **Klart!** Hela notan är betald i två delar med olika belopp.

##### Lägg till serviceavgift

1. Tryck **More**.
2. Tryck **Add Service Charge**.
3. Serviceavgiften på 12,5 % räknas på beloppet efter rabatt och visas ovanför totalen.
4. Avgiften tas bort på samma ställe. Tryck **More** igen.
5. Nu står det **Remove Service Charge**. Tryck på den.
6. **Klart!** Serviceavgiften gäller bara den här ordern.

#### Dagsavslut

##### Kolla dagens försäljning (X-rapport)

1. Öppna menyn.
2. Tryck **Reports**.
3. **X-rapporten** visar försäljningen hittills i dag utan att avsluta dagen. Tryck på den.
4. Tryck **Create Report**.
5. Samma uppställning som Z-rapporten, men ingenting nollställs. Tryck **Done**.
6. **Klart!** Under Reports finns också **Journals** och **Periodic report** för längre perioder.

#### Personal

##### Stämpla in och ut med tidsregistrering

1. Öppna menyn.
2. Tryck **Time Tracking**.
3. Varje anställd stämplar in med sin egen PIN. I demot har baristan PIN **0000**. Skriv aldrig in en riktig PIN här.
4. Kassan visar vem PIN-koden tillhör och att hon inte är instämplad. Tryck **Start shift**.
5. **Instämplad** – Raden **Already signed in users** visar hur många som är instämplade just nu.
6. När dagen är slut stämplar baristan ut med samma PIN. Ange **0000** igen.
7. Nu visas när passet startade. Tryck **End shift**.
8. **Klart!** Passet är avslutat. In- och utstämplingen hamnar i personalliggaren i Backstage, där du också kan rätta ett glömt pass.

#### Kunder

##### Lägg upp en ny kund

1. Öppna menyn.
2. Tryck **Customers**.
3. Här kan du söka på kundnummer, namn eller organisationsnummer. Tryck **New Customer**.
4. Skriv **Lisa Ek**.
5. Tryck **Save**.
6. **Klart!** Kunden finns nu i registret och kan läggas på en order via **More → Add Customer**.

#### Inställningar

##### Skapa en rabattknapp

1. Öppna menyn.
2. Tryck **Discount Buttons**.
3. Du kan ha upp till åtta knappar. Tryck **Create discount button**.
4. Skriv **15**.
5. Tryck **Save**.
6. **Klart!** Knappen **15%** finns nu både för rabatt på korgen och på enskilda artiklar.

#### Försäljning

##### Sök och lägg till

1. Tryck **Search**.
2. Skriv **bulle**.
3. Träffarna visar grupp och pris. Tryck **Kanelbulle** så hamnar den direkt i korgen.
4. Tryck **Cancel** för att gå tillbaka.
5. **Klart!** Med en streckkodsläsare kan du också skanna varan direkt.

##### Take-away, anteckning och kund

1. Allt som gäller hela ordern finns under **More**. Tryck där.
2. Tryck **Take-away**. Hela ordern markeras för avhämtning.
3. Öppna **More** igen.
4. Tryck **Order notes**.
5. Skriv **Hämtas 12.30**.
6. Tryck **Save**.
7. Öppna **More** en gång till.
8. Tryck **Add Customer**.
9. Välj **Anna Lind**.
10. **Klart!** Take-away, anteckning och kund syns överst i korgen och följer med ordern och kvittot.

##### Ta över ett bord från iPad-kassan

1. **En bordskarta för alla** – Bordskartan är gemensam för alla kassor i butiken. Ett bord som har parkerats i iPad-kassan syns här i mobilen, och tvärtom. Så kan servitören ta beställningen vid bordet och kassan ta betalt, eller omvänt.
2. Tryck **Parked**.
3. **Bord 2** har vit bakgrund och färgad kant, alltså en öppen order. Den parkerades i iPad-kassan. Tryck på bordet.
4. Under **Details** ser du vem som parkerade ordern och när. Tryck **Add to basket** för att ta över den.
5. Ordern ligger nu i mobilens korg, och bordet är tomt i iPad-kassan tills du sparar den igen. Lägg till mer och tryck **Save**, eller ta betalt direkt.
6. **Klart!** Samma sak åt andra hållet: parkera på ett bord i mobilen, så tar iPad-kassan över via **Parked**.

#### Betalning

##### Dela notan lika

1. Tryck **FUNCTIONS**.
2. Tryck **Split evenly**.
3. Två personer delar. Tryck **2**.
4. Under totalen står hur mycket varje person ska betala. Tryck **CHARGE**.
5. Första personen betalar med Swish. Tryck **Swish Handel**.
6. Tryck **Skip receipt**. Du kommer tillbaka till korgen för nästa del.
7. En av två är betald. Tryck **CHARGE** igen.
8. Tryck **Swish Handel**.
9. Tryck **Skip receipt**.
10. **Klart!** Notan är betald i två delar. Med **Split by amount** bestämmer du i stället beloppet för varje del.

##### Skicka kvitto via SMS

1. Tryck **CHARGE**.
2. Tryck **Cash**.
3. Kunden har jämna pengar. Tryck **Proceed with** beloppet.
4. Kunden vill ha kvittot i mobilen. Tryck **SMS**.
5. Skriv numret **0701234567**.
6. Tryck **Send**.
7. **Klart!** Kvittot går som en länk i ett SMS. Med **Email** skickas det till kundens e-post.
