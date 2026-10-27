/* Betalsättet Swedbank Cloud: beloppet skickas till en PAX A35-terminal via molnet.
   Terminalens skärmar följer Hugos video (okt 2026): yabie → Betala med kort → Kontroll pågår → Köp godkänt → yabie. */
(()=>{
const ID='swcloud';
function ensure(){if(!S.payments)return;if(!S.payments.find(p=>p.id===ID))S.payments.unshift({id:ID,name:'Swedbank Cloud',icon:'card',enabled:true,quick:true});
 S.payLayout=S.payLayout||{numpad:true,large:false};const q=S.payLayout.quick||(S.payLayout.quick=[]);
 if(!S.swInit){S.swInit=1;if(!q.includes(ID)){q.unshift(ID);if(q.length>4)q.length=4}}}
ensure();save&&save();
const st=document.createElement('style');st.textContent=`
.dev.a35{position:relative;width:236px;padding:0;background:none;box-shadow:none}
.a35 .bd{background:linear-gradient(160deg,#30333a,#15171b 60%);border-radius:30px 30px 34px 34px;padding:30px 13px 26px;box-shadow:0 22px 60px rgba(10,15,30,.28),inset 0 1px 0 rgba(255,255,255,.08)}
.a35 .top{position:absolute;top:9px;left:22px;right:22px;display:flex;justify-content:space-between;align-items:center;font:600 8px Inter,sans-serif;color:#aeb4bf}
.a35 .top i{width:12px;height:12px;border-radius:50%;border:1.5px solid #6b717c;display:block;margin-left:24px}
.a35 .scr{position:relative;width:100%;box-sizing:border-box;height:300px;border-radius:6px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:Inter,ui-sans-serif,system-ui,sans-serif;cursor:default;transition:background .35s}
.a35 .scr.idle{background:linear-gradient(170deg,#6eecfa,#3fdcef)}
.a35 .scr.idle b{font:800 34px/1 Inter,sans-serif;letter-spacing:-.04em;color:#1f2937}
.a35 .scr.pay,.a35 .scr.chk{background:linear-gradient(175deg,#6b7280,#4b5563);color:#fff}
.a35 .scr.pay{cursor:pointer}.a35 .scr.pay h6,.a35 .scr.pay .am,.a35 .scr.chk h6{color:#fff!important}
.a35 .scr .cl{width:40px;height:40px;margin-bottom:10px}
.a35 .scr h6{margin:0;color:inherit;font:800 23px/1.12 Inter,sans-serif}.a35 .scr .am{font:700 13px Inter,sans-serif;margin-top:8px}
.a35 .scr .hd{position:absolute;top:7px;left:0;right:0;font:600 7px Inter,sans-serif;letter-spacing:.06em;opacity:.75}
.a35 .scr .sp{width:26px;height:26px;border:3px solid rgba(255,255,255,.3);border-top-color:#e5e7eb;border-radius:50%;margin-top:12px;animation:a35s .9s linear infinite}@keyframes a35s{to{transform:rotate(360deg)}}
.a35 .scr.ok{background:linear-gradient(175deg,#f3f4f6,#d9dce1);color:#1f2937}
.a35 .scr.ok .ck{width:30px;height:30px;border-radius:50%;background:#4b5563;display:grid;place-items:center;margin-bottom:10px;animation:a35p .35s ease-out}
.a35 .scr.ok h6{font-size:19px;font-weight:600}
.a35 .scr.no{background:linear-gradient(175deg,#fff1f1,#ffd0d0);color:#5b1010}
@keyframes a35p{from{transform:scale(.4);opacity:0}to{transform:none;opacity:1}}
.a35 .pw{position:absolute;bottom:6px;left:0;right:0;font:500 7px Inter,sans-serif;opacity:.8}
.a35 .scr.idle .pw{color:#1f2937}.a35 .scr .rdot{position:absolute;right:7px;bottom:5px;width:9px;height:9px;border-radius:50%;background:#7ac3ff;opacity:.8}
.a35 .kp{display:grid;grid-template-columns:repeat(3,1fr);gap:7px 10px;padding:16px 14px 0}
.a35 .kp span{height:21px;border-radius:5px;background:linear-gradient(#f4f5f7,#cfd3da);color:#222;font:700 11px/21px Inter,sans-serif;text-align:center;box-shadow:0 1px 0 #000}
.a35 .kp span.k{height:27px;border-radius:6px;cursor:pointer}.a35 .kp .x{background:linear-gradient(#ff4b4b,#d81f1f)}.a35 .kp .c{background:linear-gradient(#ffa33a,#ea7b10)}.a35 .kp .o{background:linear-gradient(#4fe35a,#1fb22c)}
.a35 .lbl{position:absolute;bottom:8px;left:0;right:0;text-align:center;font:600 7px Inter,sans-serif;color:#6b717c}
.a35 .tapb{display:flex;align-items:center;justify-content:center;gap:6px;margin:12px auto 0;width:max-content;background:#fff;color:#1a56c9;border:1px solid #c9d6ef;border-radius:20px;padding:6px 12px;font:600 11.5px Inter,sans-serif;cursor:pointer;box-shadow:0 4px 14px rgba(20,40,90,.12)}
.a35 .tapb[hidden]{display:none}
body:has(#stage.with-term) .ring{z-index:86}`;document.head.appendChild(st);
let ST='idle',amt=0,tmr=null,ret=false;
const fmt=v=>(Math.round(Math.abs(v)*100)/100).toFixed(2);
const CL=`<svg class="cl" viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><rect x="10" y="14" width="20" height="26" rx="3"/><path d="M33 17c3 3 3 11 0 14M37 13c5 5 5 17 0 22M41 9c7 7 7 23 0 30"/></svg>`;
function scr(){const pw='<div class="pw">Powered by Swedbank Pay</div>';
 if(ST==='pay')return `<div class="scr pay" data-sw="tap" data-sg="sw-screen">${CL}<h6>${ret?'Återköp':'Betala<br>med kort'}</h6><div class="am">${fmt(amt)} SEK</div>${pw}<i class="rdot"></i></div>`;
 if(ST==='chk')return `<div class="scr chk"><div class="hd">${esc(S.store||'KAFFEBAREN').toUpperCase()}</div><h6>Kontroll pågår</h6><div class="sp"></div>${pw}<i class="rdot"></i></div>`;
 if(ST==='ok')return `<div class="scr ok"><div class="hd">${esc(S.store||'KAFFEBAREN').toUpperCase()}</div><div class="ck"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><h6>${ret?'Återköp godkänt':'Köp godkänt'}</h6></div>`;
 if(ST==='no')return `<div class="scr no"><h6 style="font-size:18px">Avbrutet</h6></div>`;
 return `<div class="scr idle"><b>yabie</b>${pw}</div>`}
const html=()=>`<div class="dev a35"><div class="bd"><div class="top"><span>● swedbank</span><span style="display:flex;align-items:center">A35<i></i></span></div>${scr()}<div class="kp">${['1','2','3','4','5','6','7','8','9','*','0','#'].map(k=>`<span>${k}</span>`).join('')}<span class="k x" data-sw="x" data-sg="sw-cancel">✕</span><span class="k c" data-sw="c">‹</span><span class="k o" data-sw="o">○</span></div><div class="lbl">PAX</div></div><button class="tapb" data-sw="tap" data-sg="sw-tap" ${ST==='pay'?'':'hidden'}>📱 Blippa kort eller telefon</button></div>`;
(window.__devHtml=window.__devHtml||{}).a35=html;
const redraw=()=>window.devRedraw&&devRedraw();
const set=s=>{ST=s;redraw();emit('sw:'+s);if(window.tourPlace){tourPlace();[300,700,1200].forEach(ms=>setTimeout(tourPlace,ms))}};
const inTour=()=>typeof T!=='undefined'&&T&&T.t&&T.t.dev==='a35';
function finish(){clearTimeout(tmr);tmr=setTimeout(()=>{set('idle');if(!inTour())setTimeout(()=>{if(ST==='idle'&&!inTour())devHide()},1500)},1800)}
window.swCloudPay=function(){const c=C();ensure();amt=cartTot(c);ret=!!c.ret;UI.pop=null;UI.busy='Follow the instructions on the terminal…';render();devShow('a35');set('pay')};
window.swReset=()=>{clearTimeout(tmr);ST='idle';amt=0;window.__swDone=false};
document.getElementById('devpane').addEventListener('click',e=>{const b=e.target.closest('[data-sw]');if(!b)return;const k=b.dataset.sw;
 if(k==='tap'&&ST==='pay'){emit('sw:tap');set('chk');clearTimeout(tmr);tmr=setTimeout(()=>{set('ok');UI.busy=null;window.__swDone=true;finalize(ID);emit('sw:done');finish()},1600)}
 else if(k==='x'&&ST==='pay'){set('no');UI.busy=null;render();toast('Betalningen avbröts på terminalen');clearTimeout(tmr);tmr=setTimeout(()=>{set('idle');if(!inTour())devHide()},1400)}});
setInterval(()=>{if(inTour()&&window.tourPlace)tourPlace()},500);
/* guide */
TOURS.push({ch:'Försäljning',x:1,id:'x-swcloud',title:'Ta betalt med Swedbank Cloud',dev:'a35',pre:()=>{kaffebar();ensure();const q=S.payLayout.quick;if(!q.includes(ID)){q.unshift(ID);if(q.length>4)q.length=4}const p=S.payments.find(x=>x.id===ID);p.enabled=true;S.tipping.on=false;S.cart=newCart();swReset();save()},steps:[
 {el:'tile-bryggkaffe',d:'Lägg till en <b>Bryggkaffe</b>.',on:'add'},
 {el:'pay-swcloud',d:'Tryck <b>Swedbank Cloud</b>. Beloppet skickas direkt till kortterminalen via internet, utan kabel eller Bluetooth.',on:'pay:swcloud'},
 {el:'sw-screen',sel:'#devpane [data-sg="sw-screen"]',allow:'#devpane',d:'Terminalen visar <b>Betala med kort</b> och beloppet. Kunden blippar sitt kort eller sin telefon mot skärmen. Tryck på terminalens skärm.',on:'sw:tap'},
 {t:'Kontroll pågår',d:'Terminalen kontrollerar betalningen och visar sedan <b>Köp godkänt</b>. Kassan registrerar köpet av sig själv, du behöver inte trycka på något.',until:()=>window.__swDone},
 {t:'Klart!',d:'Kunden får kvittot som vanligt. Avbryter kunden med den röda knappen på terminalen kan du välja ett annat betalsätt.',next:1}]});
})();
