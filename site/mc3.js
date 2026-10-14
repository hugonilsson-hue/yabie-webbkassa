/* Kvittoskrivaren Star mC-Print3 (USB-C) med Yabie-dekor som animerad enhet bredvid kassan.
   Följer Hugos video: vänd skrivaren, ta av locket, ström i DC 24V, USB i iPad-porten,
   locket tillbaka, ström i eluttaget och kabeln till iPaden. Demokvittot skrivs ut på skrivaren. */
(()=>{
const st=document.createElement('style');st.textContent=`
.dev.mc3{width:400px;height:340px;padding:0;background:linear-gradient(160deg,#f6efe3,#ecdfca);border-radius:18px;position:relative;overflow:hidden;box-shadow:0 20px 60px rgba(60,40,10,.22);font-family:Inter,system-ui,sans-serif}
.mc3 .lbl{position:absolute;left:14px;top:12px;font:700 10px/1 Inter,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#7a6a52;z-index:5}
.mc3 .scene{position:absolute;inset:0;perspective:900px}
.mc3 .flip{position:absolute;inset:0;transform-style:preserve-3d;transition:transform 1s cubic-bezier(.5,0,.2,1)}
.mc3.under .flip{transform:rotateX(180deg)}
.mc3 .face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.mc3 .face.u{transform:rotateX(180deg)}
.mc3 svg{width:100%;height:100%;overflow:visible}
.mc3 [data-mg]{cursor:pointer}
.mc3 .tap{animation:mcTap 1.6s ease-in-out infinite}
@keyframes mcTap{0%,100%{opacity:.0}50%{opacity:.55}}
.mc3 .lid{transition:transform .8s cubic-bezier(.5,0,.2,1),opacity .6s}
.mc3.lidoff .lid{transform:translate(134px,64px) scale(.36) rotate(-8deg)}
.mc3 .wire{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:420;stroke-dashoffset:420;transition:stroke-dashoffset 1.1s cubic-bezier(.6,.1,.3,1) .35s}
.mc3 .plug{opacity:0;transition:transform .45s cubic-bezier(.3,1.4,.5,1),opacity .2s}
.mc3 .plug.dc{transform:translateY(40px)}.mc3 .plug.usb,.mc3 .plug.drw,.mc3 .plug.ux{transform:translateY(34px)}
.mc3.dc .plug.dc,.mc3.usb .plug.usb,.mc3.drw .plug.drw,.mc3.ux .plug.ux{opacity:1;transform:none}
.mc3.dc .wire.dc,.mc3.usb .wire.usb,.mc3.drw .wire.drw,.mc3.ux .wire.ux{stroke-dashoffset:0}
.mc3 .port.hl{animation:mcPort 1.4s ease-in-out infinite}
@keyframes mcPort{0%,100%{filter:none}50%{filter:drop-shadow(0 0 5px #2f7bff)}}
.mc3 .led{transition:fill .4s}.mc3.power .led{fill:#3d8bff;filter:drop-shadow(0 0 6px #3d8bff)}
.mc3 .backwires{opacity:0;transition:opacity .5s .6s}.mc3.closed .backwires{opacity:1}
.mc3 .socket{opacity:0;transition:opacity .4s}.mc3.closed .socket{opacity:1}
.mc3 .pcord{stroke-dasharray:260;stroke-dashoffset:260;transition:stroke-dashoffset 1s ease}.mc3.power .pcord{stroke-dashoffset:0}
.mc3 .pr{transition:transform .9s cubic-bezier(.5,0,.2,1)}.mc3.tablet .pr{transform:translate(-62px,8px) scale(.82)}
.mc3 .tab{transform:translateX(220px);transition:transform .9s cubic-bezier(.2,.8,.2,1)}.mc3.tablet .tab{transform:none}
.mc3 .tcable{stroke-dasharray:6 6;opacity:.6}.mc3.tabon .tcable{stroke-dasharray:none;opacity:1}
.mc3 .tscreen{transition:fill .5s}.mc3.tabon .tscreen{fill:#6fd3a8}
.mc3 .tlogo,.mc3 .bolt{opacity:0;transition:opacity .4s .3s}.mc3.tabon .tlogo,.mc3.tabon .bolt{opacity:1}
.mc3 .paper{transform:translateY(70px);transition:transform 2.2s steps(14,end)}.mc3.paperout .paper{transform:none}
.mc3 .ok{position:absolute;right:14px;top:10px;font:700 11px/1 Inter,sans-serif;color:#1f7a4d;background:#d9f5e7;border-radius:99px;padding:5px 9px;opacity:0;transform:translateY(-6px);transition:.4s}.mc3.tabon .ok{opacity:1;transform:none}
@media (prefers-reduced-motion: reduce){.mc3 *{transition:none!important;animation:none!important}}`;document.head.appendChild(st);

let M={};const reset=()=>{M={under:false,lidoff:false,dc:false,usb:false,drw:false,ux:false,closed:false,power:false,tablet:false,tabon:false,paperout:false}};reset();
const FRONT=`<svg viewBox="0 0 400 340">
 <g class="socket" data-mg="socket"><rect x="22" y="196" width="40" height="52" rx="6" fill="#fbf8f2" stroke="#cbbfa9"/><circle cx="35" cy="222" r="3.4" fill="#8a7d68"/><circle cx="49" cy="222" r="3.4" fill="#8a7d68"/><rect x="18" y="192" width="48" height="60" rx="9" fill="#2f7bff" class="tap" pointer-events="none"/></g>
 <path class="pcord" d="M150 262 C 120 280, 70 284, 52 252 L 46 236" fill="none" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/>
 <g class="pr" style="transform-origin:200px 200px">
  <ellipse cx="200" cy="272" rx="118" ry="14" fill="#000" opacity=".12"/>
  <g class="backwires"><path d="M150 262 C 130 270, 118 266, 100 274" fill="none" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/><path class="tcablebase" d="M170 264 C 200 290, 260 292, 300 286" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/></g>
  <g data-mg="printer">
   <rect x="105" y="108" width="190" height="156" rx="16" fill="#2a2c30"/>
   <rect x="105" y="108" width="190" height="34" rx="16" fill="#35383d"/><rect x="105" y="128" width="190" height="14" fill="#35383d"/>
   <rect x="122" y="136" width="156" height="4" rx="2" fill="#0d0e10"/>
   <clipPath id="mcclip"><rect x="120" y="40" width="160" height="98"/></clipPath><g clip-path="url(#mcclip)"><g class="paper"><rect x="132" y="74" width="136" height="66" fill="#fffef9" stroke="#e3dccd"/><rect x="146" y="84" width="60" height="5" rx="2" fill="#2a2c30"/><rect x="146" y="96" width="108" height="3" rx="1.5" fill="#b9b2a4"/><rect x="146" y="104" width="90" height="3" rx="1.5" fill="#b9b2a4"/><rect x="146" y="112" width="100" height="3" rx="1.5" fill="#b9b2a4"/></g></g>
   <path d="M105 214 L 205 176 L 250 264 L 121 264 Q 105 264 105 248 Z" fill="#f5f2ec"/>
   <text x="128" y="244" font-family="Georgia,serif" font-weight="800" font-size="30" fill="#141414" transform="rotate(-20 128 244)">yabie</text>
   <circle class="led" cx="276" cy="244" r="3.6" fill="#45484d"/>
   <rect x="100" y="103" width="200" height="166" rx="20" fill="none" stroke="#2f7bff" stroke-width="4" class="tap" pointer-events="none"/>
  </g>
 </g>
 <g class="tab">
  <rect x="268" y="150" width="112" height="150" rx="12" fill="#1c1d20"/><rect class="tscreen" x="275" y="157" width="98" height="136" rx="6" fill="#32353b"/>
  <text class="tlogo" x="324" y="231" text-anchor="middle" font-family="Georgia,serif" font-weight="800" font-size="20" fill="#111">yabie</text>
  <path class="bolt" d="M330 170 l-8 13 h6 l-4 11 l10 -15 h-6 z" fill="#ffd34d"/>
  <g data-mg="tab"><rect x="314" y="294" width="20" height="8" rx="3" fill="#0f1012"/><rect x="306" y="290" width="36" height="18" rx="8" fill="#2f7bff" class="tap" pointer-events="none"/></g>
  <path class="tcable" d="M300 286 C 312 290, 322 300, 324 304" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
 </g>
</svg>`;
const PORTS=[['LAN',96,'r'],['USB',124,'b'],['iPad USB-C',156,'a'],['0.5A',188,'a2'],['0.5A',212,'a2'],['Cash Drawer',246,'j'],['DC 24V',298,'dc']];
const portSvg=([t,x,k])=>{const lbl=t==='Cash Drawer'?`<text x="${x}" y="62" text-anchor="middle" font-size="7" font-weight="700" fill="#5c5f63">Cash</text><text x="${x}" y="71" text-anchor="middle" font-size="7" font-weight="700" fill="#5c5f63">Drawer</text>`:`<text x="${x}" y="70" text-anchor="middle" font-size="${t.length>6?7:8}" font-weight="700" fill="#5c5f63">${t}</text>`;
 if(k==='r')return lbl+`<rect x="${x-11}" y="80" width="22" height="18" rx="2" fill="#3a3c40"/>`;
 if(k==='b')return lbl+`<rect x="${x-7}" y="82" width="14" height="13" rx="2" fill="#3a3c40"/>`;
 if(k==='a')return lbl+`<g class="port" data-mg="ipadport"><rect x="${x-8}" y="85" width="16" height="8" rx="4" fill="#fff" stroke="#3a3c40" stroke-width="2.4"/><rect x="${x-12}" y="72" width="24" height="34" rx="6" fill="#2f7bff" class="tap" pointer-events="none"/></g>`;
 if(k==='a2')return lbl+(x===188?`<g class="port" data-mg="usba"><rect x="${x-5}" y="78" width="10" height="22" rx="1.5" fill="#3a3c40"/><rect x="${x-12}" y="72" width="24" height="34" rx="6" fill="#2f7bff" class="tap" pointer-events="none"/></g>`:`<rect x="${x-5}" y="78" width="10" height="22" rx="1.5" fill="#3a3c40"/>`);
 if(k==='j')return lbl+`<g class="port" data-mg="drawer"><rect x="${x-9}" y="81" width="18" height="15" rx="2" fill="#3a3c40"/><rect x="${x-15}" y="74" width="30" height="30" rx="6" fill="#2f7bff" class="tap" pointer-events="none"/></g>`;
 return `<text x="${x}" y="64" text-anchor="middle" font-size="8" font-weight="700" fill="#5c5f63">DC</text><text x="${x}" y="73" text-anchor="middle" font-size="8" font-weight="700" fill="#5c5f63">24V</text><g class="port" data-mg="dc"><circle cx="${x}" cy="90" r="11" fill="#e9e9e6" stroke="#3a3c40" stroke-width="2.5"/><circle cx="${x}" cy="90" r="3" fill="#3a3c40"/><circle cx="${x}" cy="90" r="18" fill="#2f7bff" class="tap" pointer-events="none"/></g>`};
const UNDER=`<svg viewBox="0 0 400 340">
 <rect x="62" y="30" width="276" height="280" rx="14" fill="#d8d9db" stroke="#b5b7ba" stroke-width="2"/>
 <rect x="74" y="44" width="252" height="66" rx="6" fill="#f4f4f1" stroke="#a9abae"/>
 <text x="70" y="40" font-size="0"> </text>
 ${PORTS.map(portSvg).join('')}
 <path d="M156 112 L156 210 Q156 230 176 236 L250 258 L250 310" fill="none" stroke="#c4c6c9" stroke-width="12" stroke-linecap="round"/>
 <path d="M298 112 L298 220 Q298 240 278 250 L250 262 L250 310" fill="none" stroke="#c4c6c9" stroke-width="14" stroke-linecap="round"/>
 <g class="plug dc"><rect x="290" y="96" width="16" height="30" rx="4" fill="#1a1a1a"/></g>
 <path class="wire dc" d="M298 126 L298 220 Q298 240 278 250 L250 262 L250 330" stroke="#1a1a1a" stroke-width="7"/>
 <g class="plug usb"><rect x="150" y="86" width="12" height="30" rx="4" fill="#111"/></g>
 <path class="wire usb" d="M156 116 L156 210 Q156 230 176 236 L244 256 L244 330" stroke="#1a1a1a" stroke-width="3.5"/>
<g class="plug drw"><rect x="239" y="84" width="14" height="24" rx="2" fill="#1a1a1a"/></g>
 <path class="wire drw" d="M246 108 L246 196 Q246 214 236 226 L236 330" stroke="#3b3b3b" stroke-width="4"/>
 <g class="plug ux"><rect x="182" y="80" width="12" height="26" rx="2" fill="#1a1a1a"/></g>
 <path class="wire ux" d="M188 106 L188 200 Q188 222 206 232 L240 250 L240 330" stroke="#3b3b3b" stroke-width="3.5"/>
 <g class="lid" style="transform-origin:200px 214px" data-mg="lid"><rect x="66" y="118" width="268" height="190" rx="12" fill="#2a2c30"/><rect x="80" y="132" width="240" height="162" rx="8" fill="none" stroke="#3a3d42" stroke-width="2"/><rect x="62" y="114" width="276" height="198" rx="14" fill="none" stroke="#2f7bff" stroke-width="4" class="tap" pointer-events="none"/></g>
</svg>`;
let ROOT=null,tapOn='';
function build(){ROOT=document.createElement('div');ROOT.className='dev mc3';ROOT.innerHTML=`<div class="lbl" data-lbl></div><div class="ok">✓ Connected</div><div class="scene"><div class="flip"><div class="face f">${FRONT}</div><div class="face u">${UNDER}</div></div></div>`;
 ROOT.addEventListener('click',e=>{const t=e.target.closest('[data-mg]');if(!t)return;act(t.dataset.mg)})}
function act(k){const s=T&&cur();const want=s&&s.sel&&(s.sel.match(/data-mg="([a-z]+)"/)||[])[1];if(T&&want&&want!==k)return;
 if(k==='printer'&&!M.under){M.under=true;sync();emit('mc:flip')}
 else if(k==='lid'&&M.under&&!M.lidoff&&!M.dc){M.lidoff=true;sync();emit('mc:lid')}
 else if(k==='dc'&&M.lidoff&&!M.dc){M.dc=true;sync();emit('mc:dc')}
 else if(k==='ipadport'&&M.lidoff&&!M.usb){M.usb=true;sync();emit('mc:usb')}
 else if(k==='drawer'&&M.lidoff&&!M.drw){M.drw=true;sync();emit('mc:drawer')}
 else if(k==='usba'&&M.lidoff&&!M.ux){M.ux=true;sync();emit('mc:usbx')}
 else if(k==='lid'&&M.lidoff&&M.dc&&M.usb){M.lidoff=false;sync();setTimeout(()=>{M.under=false;M.closed=true;sync();emit('mc:close')},750)}
 else if(k==='socket'&&M.closed&&!M.power){M.power=true;sync();emit('mc:power')}
 else if(k==='tab'&&M.tablet&&!M.tabon){M.tabon=true;sync();emit('mc:tab')}
 setTimeout(()=>window.tourPlace&&tourPlace(),1050)}
function sync(){if(!ROOT)return;Object.keys(M).forEach(k=>ROOT.classList.toggle(k,!!M[k]));
 const s=T&&cur();const want=s&&s.sel&&(s.sel.match(/data-mg="([a-z]+)"/)||[])[1];ROOT.querySelectorAll('.tap').forEach(x=>{const g=x.closest('[data-mg]');x.style.display=g&&g.dataset.mg===want?'':'none'});
 ROOT.querySelectorAll('.port').forEach(p=>p.classList.toggle('hl',p.dataset.mg===want));
 const l=ROOT.querySelector('[data-lbl]');l.textContent=M.tablet?'Star mC-Print3 + iPad':M.under?'mC-Print3 · undersidan':'Star mC-Print3'}
window.__devLive=window.__devLive||{};
window.__devLive.mc3=pane=>{if(!ROOT)build();if(ROOT.parentNode!==pane){pane.innerHTML='';pane.appendChild(ROOT)}
 if(T&&T.t.dev==='mc3'){const s=cur();if(s&&s.mcTablet&&!M.tablet){M.tablet=true}}sync()};
window.mcReset=()=>{reset();if(ROOT)sync()};
on(ev=>{if(ev==='printer:demo'&&ROOT){M.paperout=false;sync();requestAnimationFrame(()=>{M.paperout=true;sync()})}});
})();
