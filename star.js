/* Star TSP143IV-UEWB: Wi-Fi setup with the Star Quick Setup Utility app (phone + printer shown next to the POS). */
(()=>{
const st=document.createElement('style');st.textContent=`
.dev.star{width:250px;display:flex;flex-direction:column;align-items:center;gap:14px;font-family:Inter,system-ui,sans-serif}
.star .ph{width:226px;height:440px;border-radius:30px;background:#1c1c1e;padding:9px;box-shadow:0 8px 24px rgba(0,0,0,.18)}
.star .scr{width:100%;height:100%;border-radius:22px;overflow:hidden;background:#f2f2f7;position:relative;display:flex;flex-direction:column;font-size:10.5px;color:#111}
.star .sb{height:22px;display:flex;justify-content:space-between;align-items:center;padding:0 16px;font-size:9px;font-weight:600;flex:none}
.star .nav{background:#1f3f8f;color:#fff;font-size:10px;font-weight:600;text-align:center;padding:7px 8px;position:relative;flex:none}.star .sb.b{background:#1f3f8f;color:#fff}
.star .nav i{position:absolute;left:10px;font-style:normal}
.star .lst{background:#fff;margin:8px 0}.star .lst>div,.star .lst>button{display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border-bottom:1px solid #ececf0;text-align:left;font-size:10px;background:#fff}
.star .lst .ico{width:16px;height:16px;border-radius:4px;background:#1f3f8f;flex:none}
.star .tg{margin-left:auto;width:30px;height:18px;border-radius:9px;background:#d1d1d6;position:relative;flex:none;transition:.2s}.star .tg:after{content:'';position:absolute;left:2px;top:2px;width:14px;height:14px;border-radius:50%;background:#fff;transition:.2s}
.star .tg.on{background:#34c759}.star .tg.on:after{left:14px}
.star .home{flex:1;background:linear-gradient(160deg,#4f7ae8,#9db7f5);display:grid;grid-template-columns:repeat(4,1fr);align-content:start;gap:14px 6px;padding:22px 12px}
.star .app{display:flex;flex-direction:column;align-items:center;gap:4px;color:#fff;font-size:7.5px;text-align:center}.star .app span{width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,.35)}
.star .app.q span{background:#fff;display:grid;place-items:center;font:italic 900 12px/1 Arial;color:#1f3f8f}
.star .pop{position:absolute;inset:0;background:rgba(0,0,0,.35);display:grid;place-items:center}
.star .pop>div{width:180px;background:#f2f2f7;border-radius:12px;overflow:hidden;text-align:center}.star .pop p{padding:12px 12px 8px;margin:0;font-size:9.5px}.star .pop b{display:block;font-size:10px;margin-bottom:4px}
.star .pop button{display:block;width:100%;padding:8px;border-top:1px solid #d1d1d6;color:#0a64d6;font-size:10px}
.star .fld{background:#fff;margin:6px 10px;border-radius:6px;padding:6px 8px}.star .fld small{display:block;color:#6b6b70;font-size:8.5px;margin-bottom:3px}
.star .fld input{width:100%;border:1px solid #d1d1d6;border-radius:4px;padding:5px;font:inherit;font-size:11px;background:#fff;color:#111}
.star .bt{margin:10px;padding:8px;border-radius:6px;background:#1f3f8f;color:#fff;font-weight:600;text-align:center;font-size:10px;display:block;width:calc(100% - 20px)}.star .bt.dis{opacity:.4;pointer-events:none}.star .bt.o{background:#fff;color:#1f3f8f;border:1px solid #1f3f8f}
.star .bar{height:3px;background:#dfe5f3;margin:0 18px;border-radius:2px;overflow:hidden}.star .bar i{display:block;height:100%;background:#1f3f8f;width:0;animation:stb 3s linear forwards}@keyframes stb{to{width:100%}}
.star .pr{width:200px;height:118px;border-radius:18px 18px 10px 10px;background:linear-gradient(#2a2c31,#16171a);position:relative;box-shadow:0 8px 18px rgba(0,0,0,.25)}
.star .pr .lg{position:absolute;left:16px;top:16px;color:#fff;font:italic 800 13px/1 Arial}.star .pr .lg small{display:block;font:600 7px/1.4 Inter,sans-serif;color:#5aa9ff}
.star .leds{position:absolute;right:14px;bottom:12px;display:flex;gap:9px;padding:5px 8px;border-radius:6px;border:2px solid transparent;cursor:pointer}.star .leds.hl{border-color:#f2a33a}
.star .leds i{width:7px;height:7px;border-radius:50%;background:#444}.star .leds i.p{background:#5aa9ff}.star .leds i.g{background:#34c759;box-shadow:0 0 6px #34c759}.star .leds i.b{background:#5aa9ff;animation:stl .6s infinite alternate}@keyframes stl{to{opacity:.2}}
.star .slip{position:absolute;left:50%;bottom:100%;transform:translateX(-50%);width:150px;background:#fff;font:7.5px/1.3 ui-monospace,Menlo,monospace;color:#222;padding:8px 10px;box-shadow:0 2px 8px rgba(0,0,0,.15);white-space:pre;animation:stp 1.6s ease-out}
@keyframes stp{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0 0 0 0)}}.star .slip b{display:inline-block;border:1.5px solid #1f3f8f;border-radius:3px;padding:0 4px}`;document.head.appendChild(st);
const ST={s:'set',bt:false,wifi:false,key:'',cfg:null};
window.starS=()=>ST;window.starReset=()=>{clearTimeout(ST.cfg);Object.assign(ST,{s:'set',bt:false,wifi:false,key:'',cfg:null,bong:null});window.devRedraw&&devRedraw()};
const go=s=>{ST.s=s;render();emit('star:'+s)};
const SB=(b)=>`<div class="sb ${b?'b':''}"><span>14:30</span><span>●●● ▮</span></div>`;
const NAV=(t,back)=>`<div class="nav">${back?'<i>‹</i>':''}${t}</div>`;
function screen(){const s=ST.s;
 if(s==='set')return `${SB()}<div style="padding:10px 14px 0;font-size:17px;font-weight:700">Settings</div><div class="lst" data-sg="settings"><div><span class="ico" style="background:#0a84ff"></span>Wi-Fi<span style="margin-left:auto;color:#8e8e93;font-size:9px">${ST.wifi?'Kaffebar-WiFi':''}</span><button class="tg ${ST.wifi?'on':''}" data-st="wifi" data-sg="wifi" style="margin-left:6px"></button></div><div><span class="ico" style="background:#0a84ff"></span>Bluetooth<button class="tg ${ST.bt?'on':''}" data-st="bt" data-sg="bt"></button></div></div>`;
 if(s==='home')return `${SB()}<div class="home">${['','','','','','','',''].map(()=>'<div class="app"><span></span></div>').join('')}<button class="app q" data-st="app" data-sg="app"><span>star</span>Star Quick Setup</button></div>`;
 if(s==='menu')return `${SB(1)}${NAV('Start Guide (Initial Settings)',1)}<div style="padding:6px 12px;font-size:8.5px;color:#6b6b70">Selected Printer: <span style="color:#e5484d">Not Selected</span></div><div class="lst">${['Find Printer by QR code','Search Printer','Search Bluetooth Printer and Connect / Pair','Connect / Pair Bluetooth Printer by Device Name'].map(t=>`<div><span class="ico"></span>${t}</div>`).join('')}<button data-st="wlan" data-sg="wlan"><span class="ico"></span>Use Wireless LAN</button><div><span class="ico"></span>Use Star SteadyLAN</div><div><span class="ico"></span>Use Star Micronics Cloud Services</div></div>`;
 if(s==='model'||s==='loc')return `${SB(1)}${NAV('Use Wireless LAN',1)}<div style="padding:8px 12px;font-size:9px">Please select a model</div><div class="lst"><button data-st="model" data-sg="model"><span class="ico" style="background:#333"></span><b>TSP143IV-UEWB</b></button><div><span class="ico" style="background:#999"></span>MCW10 with mC-Print3 / mC-Label3</div></div>${s==='loc'?`<div class="pop"><div><p><b>Allow “Star Quick Setup Utility” to use your location?</b>Used to read the name of the Wi-Fi network.</p><button>Allow Once</button><button data-st="loc" data-sg="loc-allow"><b style="margin:0">Allow While Using App</b></button><button>Don’t Allow</button></div></div>`:''}`;
 if(s==='form'||s==='bt')return `${SB(1)}${NAV('Use Wireless LAN',1)}<div class="fld"><small>SSID (Network)</small><input value="Kaffebar-WiFi" readonly></div><div class="fld" data-sg="keyfld"><small>Security Key (Password)</small><input data-st="key" data-sg="key" value="${esc(ST.key)}" autocomplete="off" spellcheck="false" placeholder="Wi-Fi-lösenord"></div>
  <div style="display:flex;justify-content:flex-end;gap:6px;padding:2px 12px;font-size:8.5px;color:#6b6b70;align-items:center">Save network and password<span class="tg on" style="margin-left:0;transform:scale(.8)"></span></div><button class="bt ${ST.key.length>=8?'':'dis'}" data-st="next" data-sg="next">Next</button>
  ${s==='bt'?`<div class="pop"><div><p><b>“Star Quick Setup Utility” would like to find and connect to Bluetooth devices</b>Bluetooth is used to search for the printer.</p><button>Don’t Allow</button><button data-st="btok" data-sg="bt-allow"><b style="margin:0">Allow</b></button></div></div>`:''}`;
 if(s==='near')return `${SB(1)}${NAV('Use Wireless LAN',1)}<div style="flex:1;display:grid;place-items:center;text-align:center;padding:16px"><div><div style="font-size:42px">📱↔🖨️</div><p style="font-size:10px">Please bring your device close to the printer’s LED.</p><small style="color:#8e8e93;font-size:8px">Bluetooth is used to search for printer</small></div></div>`;
 if(s==='cfg')return `${SB(1)}${NAV('Use Wireless LAN')}<div style="flex:1;display:flex;flex-direction:column;justify-content:center;text-align:center;gap:8px"><div class="bar"><i></i></div><div style="font-size:9px">Setting up the printer…<br>Please do not turn off the printer.</div></div>`;
 if(s==='print')return `${SB(1)}${NAV('Use Wireless LAN',1)}<div style="background:#e8eefb;padding:18px;text-align:center;font-size:30px">🖨️</div><p style="padding:8px 12px;margin:0;font-size:9.5px">Please wait and check Wireless Network Diagnosis printed from printer.</p><button class="bt" data-st="finish" data-sg="finish">Finish</button><button class="bt o">Check printer operation</button>`;
 return `${SB()}<div class="home">${['','','','','','','',''].map(()=>'<div class="app"><span></span></div>').join('')}<div class="app q"><span>star</span>Star Quick Setup</div></div>`}
const slip=()=>`<div class="slip" data-sg="slip">********************************
  Wireless Network Diagnosis
********************************
SSID          : Kaffebar-WiFi (OK)
Signal        : -48dBm (Strong)
Security Key  : ******** (OK)

IP Address    : 192.168.1.60
                (DHCP)
Subnet Mask   : 255.255.255.0

          <b>Successful</b>

Internet Access : OK</div>`;
function html(){const s=ST.s,on=s==='print'||s==='done';const led=on?'g':s==='cfg'?'b':'';
 return `<div class="dev star"><div class="ph"><div class="scr">${screen()}</div></div><div class="pr">${s==='print'||(s==='done'&&!ST.bong)?slip():''}<div class="lg">star<small>TSP100 IV</small></div><div class="leds ${s==='near'?'hl':''}" data-st="led" data-sg="led"><i class="p"></i><i class="${led}"></i><i></i></div></div></div>`}
(window.__devHtml=window.__devHtml||{}).star=html;
const pane=document.getElementById('devpane');
pane.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;const a=b.dataset.st;
 if(a==='wifi'||a==='bt'){ST[a]=!ST[a];devRedraw();if(ST[a])emit('star:'+a);if(ST.bt&&ST.wifi)setTimeout(()=>{if(ST.s==='set'&&ST.bt&&ST.wifi)go('home')},250);return}
 if(a==='app'&&ST.s==='home')return go('menu');
 if(a==='wlan')return go('model');
 if(a==='model')return go('loc');
 if(a==='loc')return go('form');
 if(a==='next'&&ST.key.length>=8)return go('bt');
 if(a==='btok')return go('near');
 if(a==='led'&&ST.s==='near'){go('cfg');ST.cfg=setTimeout(()=>go('print'),3000);return}
 if(a==='finish')return go('done')});
pane.addEventListener('input',e=>{if(e.target.dataset.st!=='key')return;ST.key=e.target.value;const n=pane.querySelector('[data-sg="next"]');if(n)n.classList.toggle('dis',ST.key.length<8);if(ST.key==='kaffe2026')emit('star:keyok')});
/* the register finds the printer on the network once it is on Wi-Fi */
const _pr=PAGES.printer;PAGES.printer=()=>{const r=_pr();if(S.printer.name||ST.s!=='done')return r;
 r.body=`<div class="sec">Local network printers</div><div class="grp">${row('TSP143IV-UEWB',{a:'prsel',x:'TSP143IV-UEWB',ic:'printer',icbg:'#9a9aa0',g:'pr-tsp143'})}${['mC-Print3 E874','mC-Print3 C6CA'].map(n=>row(n,{a:'prsel',x:n,ic:'printer',icbg:'#9a9aa0'})).join('')}</div><p style="font-size:10.5px;color:#6b6b70;margin:8px 15px">TSP143IV-UEWB · 192.168.1.60 (Wi-Fi)</p>`;return r};
const _ps=A.prsel;A.prsel=function(n){const r=_ps.apply(this,arguments);emit('printer:add',n);return r};
})();
/* Kitchen-ticket printing (bongskrivare): printer stations created in Backstage get a printer in My Store → Printers.
   Products in the station's groups print a ticket on that printer when the sale is done. */
(()=>{
if(!S.stations){S.stations=[{name:'Kök',printer:'',gids:['g-smor']}];save()}
const ST=starS();
const _ps=PAGES.printers;PAGES.printers=()=>{const r=_ps();
 r.body=r.body.replace('<div class="sec">A4 printer</div>',`<div class="sec">Printer stations</div><div class="grp">${S.stations.map(s=>row(s.name,{a:'go',x:'station',y:s.name,ic:'printer',g:'station-'+slug(s.name),val:s.printer?`<span style="color:#6b6b70">${esc(s.printer)}</span>`:'<span style="color:#8e8e93">No Printer Selected</span>'})).join('')}</div><div class="sec">A4 printer</div>`);return r};
PAGES.station=d=>{const s=S.stations.find(x=>x.name===d.id)||S.stations[0];const L=[...(ST.s==='done'||s.printer==='TSP143IV-UEWB'?['TSP143IV-UEWB']:[]),'mC-Print3 E874','mC-Print3 C6CA'];
 return {title:esc(s.name),body:`<div class="sec">Local network printers</div><div class="grp">${L.map(n=>row(n,{a:'stsel',x:s.name,y:n,ic:'printer',icbg:'#9a9aa0',g:n==='TSP143IV-UEWB'?'pr-tsp143':'',val:s.printer===n?'<span style="color:var(--blue)">✓</span>':'',nochev:1})).join('')}${row('No Printer',{a:'stsel',x:s.name,y:'',nochev:1,val:s.printer?'':'<span style="color:var(--blue)">✓</span>'})}</div>
  <p style="font-size:10.5px;color:#6b6b70;margin:8px 15px">Stationen skapas i Backstage under Kök → Skrivarstationer. Här väljer du vilken skrivare som skriver ut stationens bongar.</p>
  ${s.printer?`<div style="display:flex;justify-content:center;margin-top:14px"><button class="btnb" style="min-width:300px" data-a="sttest" data-x="${esc(s.name)}" data-g="station-test">Print Example Receipt</button></div>`:''}`}};
A.stsel=(x,el)=>{const s=S.stations.find(z=>z.name===x);s.printer=el.dataset.y||'';save();render();emit('station:set',s.printer)};
const bong=(title,lines)=>{ST.bong={title,lines,ref:ST.bong?ST.bong.ref%999+1:17,at:now().slice(11,16)};window.devRedraw&&devRedraw()};
A.sttest=x=>{const s=S.stations.find(z=>z.name===x);if(s.printer==='TSP143IV-UEWB')bong('Exempelkvitto · '+s.name,[]);toast('Exempelkvitto skickat till '+s.printer);emit('station:test')};
on(ev=>{if(ev!=='paid')return;const o=S.orders[0];if(!o)return;S.stations.forEach(s=>{if(s.printer!=='TSP143IV-UEWB')return;const L=o.items.filter(i=>{const p=P(i.pid);return p&&s.gids.includes(p.gid)});if(L.length){bong(s.name,L.map(i=>`${i.qty} x ${i.name}`+((i.mods||[]).length?`\n    ${i.mods.join(', ')}`:'')));emit('bong',s.name)}})});
const _h=__devHtml.star;__devHtml.star=()=>{let h=_h();if(ST.s==='done'&&ST.bong){const b=ST.bong;
 h=h.replace(/<div class="pr">/,`<div class="pr"><div class="slip" data-sg="bong" style="font-size:9px">${esc(b.title.startsWith('Exempel')?b.title:'BONG · '+b.title)}\n${b.at}        Ref: <b>${b.ref}</b>\n--------------------------\n${b.lines.length?b.lines.map(esc).join('\n'):'Skrivaren fungerar.'}\n--------------------------</div>`)}
 return h};
})();
