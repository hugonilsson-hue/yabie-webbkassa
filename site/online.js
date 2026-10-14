/* Yabie Online: customer web shop on a phone next to the POS, and online orders arriving in the POS
   (Online orders view: new order card → Accept with preparation time → mark items → Done → History). */
(()=>{
const hm=d=>{const z=x=>String(x).padStart(2,'0');return z(d.getHours())+':'+z(d.getMinutes())};
const SEK=v=>'SEK '+(Math.round(v*100)/100).toFixed(2);
S.onlineOrders=S.onlineOrders||[];S.onlineHistory=S.onlineHistory||[];
const PH={screen:'qr',tab:null,cart:[],pid:null,sel:{},qty:1,name:'',phone:'',email:'',sms:[],notif:null,payOpen:null};
window.PH=PH;
const shopGroups=()=>S.groups.filter(g=>g.id!=='g-merch'&&S.products.some(p=>p.gid===g.id&&!p.gift&&p.priceType!=='variable'&&p.unit!=='kg'));
const shopProds=gid=>S.products.filter(p=>p.gid===gid&&!p.gift&&p.priceType!=='variable'&&p.unit!=='kg'&&p.sellable!==false);
const colorOf=p=>(G(p.gid)||{}).color||'#e5e5ea';
const lineTotal=l=>l.qty*(l.price+l.mods.reduce((a,m)=>a+m.price,0));
const cartSum=()=>PH.cart.reduce((a,l)=>a+lineTotal(l),0);
const cartN=()=>PH.cart.reduce((a,l)=>a+l.qty,0);

/* ───────── styles ───────── */
const st=document.createElement('style');st.textContent=`
.phonepane{position:relative;z-index:85;flex:none;display:block}.phonepane[hidden]{display:none}
.phone{width:300px;height:620px;border-radius:44px;background:#111;padding:10px;box-shadow:0 20px 60px rgba(10,15,30,.25);position:relative}
.phone .scr{position:relative;width:100%;height:100%;border-radius:35px;overflow:hidden;background:#fff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;color:#111;font-size:13px;display:flex;flex-direction:column}
.phone .isl{position:absolute;left:50%;top:9px;width:86px;height:24px;margin-left:-43px;border-radius:14px;background:#000;z-index:5}
.phone .sb{height:40px;flex:none;display:flex;align-items:flex-end;justify-content:space-between;padding:0 24px 5px;font-size:12px;font-weight:600}
.phone .open{background:#f2f4f7;font-size:9px;font-weight:600;padding:3px 12px;color:#333}.phone .open i{display:inline-block;width:6px;height:6px;border-radius:50%;background:#22c55e;margin-right:5px}
.phone .hdr{height:44px;flex:none;background:#2f6fe4;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:16px;position:relative}
.phone .hdr .l,.phone .hdr .r{position:absolute;top:12px;opacity:.9;font-size:16px}.phone .hdr .l{left:14px}.phone .hdr .r{right:14px}
.phone .body{flex:1;overflow:auto;position:relative;scrollbar-width:none}.phone .body::-webkit-scrollbar{display:none}
.phone .url{height:46px;flex:none;border-top:1px solid #e5e7eb;display:flex;align-items:center;justify-content:center;gap:8px;font-size:11px;color:#333;background:#fafafa}
.phone .url b{font-weight:500;background:#eee;border-radius:10px;padding:4px 14px}
.phone .hero{height:120px;background:linear-gradient(160deg,#7cc4ff,#ffd6a5 70%,#ffb4a2);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#3b2a1a}
.phone .hero small{font-size:10px;font-weight:600}.phone .hero b{font-size:19px;font-family:Georgia,serif;color:#7a2e0e;text-shadow:0 1px 0 #fff}.phone .hero span{margin-top:3px;font-size:9px;background:#ffcf33;border-radius:4px;padding:1px 6px;font-weight:700;color:#7a2e0e}
.phone .ptabs{display:flex;gap:18px;padding:0 14px;border-bottom:1px solid #e5e7eb;position:sticky;top:0;background:#fff;z-index:2;overflow-x:auto;scrollbar-width:none}
.phone .ptabs button{height:34px;font-size:12.5px;border:0;background:none;padding:0;border-bottom:2px solid transparent;white-space:nowrap;color:#222}
.phone .ptabs button.on{border-color:#2f6fe4;font-weight:600}
.phone h3{margin:12px 14px 8px;font-size:16px}
.phone .pc{margin:0 12px 8px;border:1px solid #e5e7eb;border-radius:8px;display:flex;height:78px;overflow:hidden;cursor:pointer;background:#fff}
.phone .pc.in{border-color:#2f6fe4}
.phone .pc .t{flex:1;padding:9px 10px;display:flex;flex-direction:column;justify-content:space-between;font-size:12px;font-weight:600}
.phone .pc .t small{font-weight:400}.phone .pc .t .q{display:inline-grid;place-items:center;width:16px;height:16px;border-radius:3px;background:#2f6fe4;color:#fff;font-size:10px;margin-right:5px}
.phone .pc .im{width:78px;flex:none}
.phone .bar{position:absolute;left:10px;right:10px;bottom:8px;height:38px;border-radius:7px;background:#2f6fe4;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 12px;font-size:12px;font-weight:500;border:0;cursor:pointer}
.phone .sheet{position:absolute;inset:0;background:rgba(0,0,0,.35);display:flex;flex-direction:column;justify-content:flex-end;z-index:3}
.phone .sheet .in{background:#fff;border-radius:12px 12px 0 0;height:88%;display:flex;flex-direction:column;min-height:0}
.phone .sheet .hd{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;font-weight:600;font-size:15px}
.phone .sheet .x{width:20px;height:20px;border-radius:50%;border:1.5px solid #333;display:grid;place-items:center;font-size:11px;cursor:pointer;background:none}
.phone .pgrp{margin:0 12px 10px;background:#f2f4f7;border-radius:8px;padding:8px}
.phone .pgrp .h{font-size:11.5px;font-weight:600;margin:0 2px 6px}.phone .pgrp .h small{font-weight:400;color:#555}
.phone .opt{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:7px 8px;margin-bottom:5px;font-size:11.5px;cursor:pointer}
.phone .opt.on{border-color:#2f6fe4}.phone .opt .pr{margin-left:auto;font-size:10.5px;color:#333}
.phone .rb{width:13px;height:13px;border-radius:50%;border:1.5px solid #888;flex:none;display:grid;place-items:center}.phone .opt.on .rb{border-color:#2f6fe4}.phone .opt.on .rb::after{content:"";width:7px;height:7px;border-radius:50%;background:#2f6fe4}
.phone .cb{width:13px;height:13px;border-radius:3px;border:1.5px solid #888;flex:none;display:grid;place-items:center;font-size:9px;color:#fff}.phone .opt.on .cb{background:#2f6fe4;border-color:#2f6fe4}
.phone .pft{display:flex;align-items:center;gap:10px;padding:10px 12px 12px;border-top:1px solid #eee}
.phone .qty{display:flex;align-items:center;gap:10px;font-size:12px}.phone .qty button{width:20px;height:20px;border-radius:50%;border:1px solid #bbb;background:#fff;line-height:1;cursor:pointer}
.phone .pbb{flex:1;height:34px;border-radius:6px;background:#2f6fe4;color:#fff;border:0;display:flex;align-items:center;justify-content:space-between;padding:0 12px;font-size:12px;font-weight:500;cursor:pointer}
.phone .card{margin:0 12px 10px;border:1px solid #e5e7eb;border-radius:8px;padding:10px;background:#fff}
.phone .pfld{display:block;margin:0 14px 10px;font-size:10px;font-weight:600}.phone .pfld input{display:block;width:100%;margin-top:3px;height:32px;border:1px solid #cbd5e1;border-radius:6px;padding:0 8px;font:inherit;font-size:12px;font-weight:400}
.phone .ppm{display:flex;align-items:center;gap:10px;margin:0 12px 10px;border:1px solid #e5e7eb;border-radius:8px;padding:11px 12px;cursor:pointer;background:#fff}
.phone .ppm b{font-size:13px;display:block}.phone .ppm small{color:#555;font-size:11px}.phone .ppm .i{width:20px;text-align:center}.phone .ppm .c{margin-left:auto;color:#555}
.phone .ok{width:46px;height:46px;border-radius:50%;background:#14b8a6;color:#fff;display:grid;place-items:center;font-size:26px;margin:16px auto 8px}
.phone .notif{position:absolute;left:8px;right:8px;top:8px;z-index:6;background:rgba(245,245,247,.97);border-radius:16px;box-shadow:0 6px 20px rgba(0,0,0,.18);padding:9px 11px;font-size:11px;display:flex;gap:8px;animation:phn .35s ease}
.phone .notif .av{width:26px;height:26px;border-radius:50%;background:#9ca3af;flex:none}
@keyframes phn{from{transform:translateY(-120%)}to{transform:none}}
.phone .sms{background:#fff;display:flex;flex-direction:column;height:100%}
.phone .sms .bub2{align-self:flex-start;max-width:80%;margin:6px 12px;background:#e9e9eb;border-radius:16px;padding:8px 11px;font-size:12px;line-height:1.35}
.phone .sms .bub2 a{color:#2f6fe4}
.phone .pqr{flex:1;background:#2b2b2b;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;gap:12px}
.phone .pqr .ppaper{background:#f5f5f0;color:#111;width:200px;border-radius:4px;padding:14px;text-align:center;box-shadow:0 8px 20px rgba(0,0,0,.4)}
.phone .pqr .ppaper b{font-size:20px;display:block;margin-bottom:8px}
.phone .pqr .code{width:110px;height:110px;margin:0 auto 8px;background:
 repeating-linear-gradient(90deg,#111 0 6px,transparent 6px 11px),repeating-linear-gradient(0deg,#111 0 5px,transparent 5px 12px);background-blend-mode:multiply;outline:3px solid #f5c400;outline-offset:6px}
.phone .pqr ol{text-align:left;font-size:8.5px;margin:6px 0 0;padding-left:14px;line-height:1.5}
.phone .pqr .lnk{background:#ffd60a;color:#111;border-radius:14px;padding:6px 14px;font-size:12px;font-weight:600;border:0;cursor:pointer}
/* POS: online order cards */
#pos .full .oos{position:absolute;left:0;right:0;top:88px;bottom:30px;padding:0 8px;display:flex;gap:10px;overflow-x:auto}
#pos .ooc{width:245px;flex:none;height:100%;display:flex;flex-direction:column;background:#f2f2f6;border:1px solid transparent;border-radius:2px}
#pos .ooc.acc.alldone{border-color:#34c759;background:#fff}
#pos .ooc .h{background:#1a73e8;color:#fff;padding:6px 10px 5px}
#pos .ooc.acc .h{background:#34c759}#pos .ooc.acc.alldone .h{background:#fff;color:#34c759}
#pos .ooc .h b{font-size:19px;font-weight:500;display:block;line-height:1.2}
#pos .ooc .h small{font-size:11px;font-weight:600;display:block;margin-top:2px}#pos .ooc .h small::before{content:"● ";font-size:9px}
#pos .ooc .pt{background:#000;color:#fff;font-weight:600;text-align:center;font-size:12.5px;padding:5px 0}
#pos .ooc .who{display:flex;justify-content:space-between;background:#e5e5ea;padding:4px 10px;font-size:10.5px}#pos .ooc .who span:first-child{color:var(--blue);font-weight:600}
#pos .ooc .it{padding:10px;border-bottom:1px solid #e5e5ea;font-size:12px;font-weight:600;cursor:pointer;background:#f2f2f6}
#pos .ooc .it.dn{color:#8e8e93;font-weight:500}#pos .ooc .it .ck{display:inline-grid;place-items:center;width:13px;height:13px;border:1.3px solid #34c759;border-radius:50%;color:#34c759;font-size:8px;margin-right:6px;vertical-align:-1px}
#pos .ooc .md{margin:5px 0 0 6px;font-size:10.5px;font-weight:500}#pos .ooc .md span{background:#ffd60a;border-radius:8px;padding:1px 6px;font-weight:600;margin-left:3px}
#pos .ooc .it.dn .md span{background:#a1a1a6;color:#fff}
#pos .ooc .ch{background:#e5e5ea;text-align:center;font-weight:600;font-size:12px;padding:6px 0}
#pos .ooc .sp{flex:1;background:#f2f2f6}
#pos .ooc .sum{display:flex;justify-content:space-between;background:#e5e5ea;padding:6px 10px;font-size:11.5px;font-weight:600}
#pos .ooc .bt{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:#fff}
#pos .ooc .bt .rj{width:34px;height:30px;border:1px solid #ff3b30;border-radius:6px;color:#ff3b30;display:grid;place-items:center;background:#fff}
#pos .ooc .bt .ac{height:30px;min-width:84px;border-radius:6px;background:#1a73e8;color:#fff!important;font-size:12.5px;font-weight:500}
#pos .ooc .bt .ac.dis{background:#e5e5ea;color:#aeaeb2!important}
#pos .full .page{position:absolute;left:50%;bottom:4px;transform:translateX(-50%);background:#e5e5ea;border-radius:4px;font-size:11px;font-weight:600;padding:3px 12px}
#pos .oadlg{position:absolute;inset:0;background:rgba(0,0,0,.25);z-index:5;display:flex;align-items:center;justify-content:center}
#pos .oadlg .dl{width:480px;height:500px;background:#fff;border-radius:6px;position:relative;display:flex;flex-direction:column;align-items:center}
#pos .oadlg .dl h4{margin:14px 0 0;font-size:13px}
#pos .oadlg .tm{display:flex;gap:6px;margin:10px 0}#pos .oadlg .tm button{width:28px;height:26px;border-radius:4px;background:#e8f0fe;color:var(--blue)!important;font-size:11.5px}#pos .oadlg .tm button.on{background:#1a73e8;color:#fff!important}
#pos .oadlg input{width:124px;height:32px;border:1px solid #c7c7cc;border-radius:4px;padding:0 8px;font-size:11.5px}
#pos .oadlg .cf{position:absolute;bottom:40px;left:104px;width:272px;height:34px;border-radius:4px;background:#1a73e8;color:#fff!important;font-size:12.5px;font-weight:500}
#pos .oadlg .busy{position:absolute;inset:0;background:rgba(80,80,80,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-size:12px;gap:6px;border-radius:6px}
#pos .oadlg .busy i{width:30px;height:30px;border-radius:50%;background:#6ee7b7;color:#0b3d2e;display:grid;place-items:center;font-style:normal;font-weight:800;font-size:12px}
#pos .onote{position:absolute;left:10px;top:4px;z-index:40;background:#fff;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,.18);padding:7px 12px;font-size:11.5px;display:flex;gap:8px;align-items:center}
#pos .onote .g{width:18px;height:18px;border-radius:50%;background:#34c759;color:#fff;display:grid;place-items:center;font-size:11px}
#pos .flashg{position:absolute;inset:0;border:6px solid #34c759;border-radius:10px;pointer-events:none;z-index:60;animation:flg 2.4s ease forwards}
@keyframes flg{0%,70%{opacity:1}100%{opacity:0}}
@media (max-width:860px){.phonepane{width:100%}.phone{transform-origin:top center}}
`;document.head.appendChild(st);

/* ───────── phone pane in the page shell ───────── */
const pane=document.createElement('div');pane.className='phonepane';pane.id='phonepane';pane.hidden=true;pane.innerHTML='<div class="phone"><div class="scr" id="phscr"></div><div class="isl"></div></div>';
document.getElementById('stage').appendChild(pane);

const img=p=>`<div class="im" style="background:linear-gradient(135deg,${colorOf(p)},#fff8)"></div>`;
function phBody(){
 const s=PH.screen,cnt=cartN();
 if(s==='qr')return `<div class="pqr"><div class="ppaper"><b>Beställ här!</b><div class="code"></div><ol><li>Skanna QR-koden med din mobilkamera.</li><li>Beställ och betala med mobilen.</li><li>Du får ett SMS när beställningen är bekräftad och när den förväntas vara klar.</li></ol></div><button class="lnk" data-p="open" data-pg="ph-open">yabie.icu ↗</button></div>`;
 if(s==='sms')return `<div class="sms"><div style="text-align:center;padding:8px 0 6px;border-bottom:1px solid #eee"><div class="av" style="width:34px;height:34px;border-radius:50%;background:#9ca3af;margin:0 auto 3px"></div><b style="font-size:11px">YabieSMS ›</b></div><div style="flex:1;overflow:auto;padding:6px 0">${PH.sms.map(t=>`<div class="bub2">${t}</div>`).join('')}<p style="text-align:center;font-size:9px;color:#888;margin:8px 20px">If you did not expect this message from an unknown sender, it may be spam.</p></div><div style="height:40px;border-top:1px solid #eee;display:flex;align-items:center;padding:0 12px;color:#aaa;font-size:11px">＋ <span style="margin-left:10px;border:1px solid #ddd;border-radius:14px;flex:1;padding:5px 10px">Text Message · SMS</span></div></div>`;
 let h='';
 const head=`<div class="open"><i></i>OPEN TODAY 07:00 – 18:00</div><div class="hdr"><span class="l">☰</span>Kaffebaren<span class="r">🌐</span></div>`;
 if(['shop','product'].includes(s)){const gs=shopGroups();if(!PH.tab||!gs.some(g=>g.id===PH.tab))PH.tab=gs[0]&&gs[0].id;
  h=`<div class="hero"><small>Välkommen till</small><b>Kaffebaren</b><span>Kaffe, fika & lunch</span></div><div class="ptabs">${gs.map(g=>`<button class="${PH.tab===g.id?'on':''}" data-p="tab" data-x="${g.id}" data-pg="ph-tab-${slug(g.name)}">${esc(g.name)}</button>`).join('')}</div><h3>${esc(G(PH.tab).name)}</h3>
  ${shopProds(PH.tab).map(p=>{const q=PH.cart.filter(l=>l.pid===p.id).reduce((a,l)=>a+l.qty,0);return `<div class="pc ${q?'in':''}" data-p="prod" data-x="${p.id}" data-pg="ph-p-${slug(p.name)}"><div class="t"><span>${q?`<span class="q">${q}</span>`:''}${esc(p.name)}</span><small>${SEK(p.price)}</small></div>${img(p)}</div>`}).join('')}<div style="height:56px"></div>`;
  let bar=cnt?`<button class="bar" data-p="order" data-pg="ph-yourorder"><span>Your order</span><span>${SEK(cartSum())} 🛒<sup>${cnt}</sup></span></button>`:'';
  if(s==='product'){const p=P(PH.pid),ms=modsFor(p.id);const extra=ms.reduce((a,m)=>a+m.opts.reduce((b,o,i)=>b+(PH.sel[m.id+':'+i]?o.price:0),0),0);
   bar+=`<div class="sheet"><div class="in"><div class="hd">${esc(p.name)}<button class="x" data-p="close">✕</button></div><div style="overflow:auto;flex:1;min-height:0">
   ${ms.map(m=>`<div class="pgrp"><div class="h">${esc(m.name)} <small>(${m.multi?'You can select several options':'Please select 1 option'})</small></div>${m.opts.map((o,i)=>`<div class="opt ${PH.sel[m.id+':'+i]?'on':''}" data-p="opt" data-x="${m.id}:${i}" data-pg="ph-o-${slug(o.name)}"><span class="${m.multi?'cb':'rb'}">${m.multi&&PH.sel[m.id+':'+i]?'✓':''}</span>${esc(o.name)}<span class="pr">${o.price?SEK(o.price):'Free'}</span></div>`).join('')}</div>`).join('')}
   <div style="margin:0 14px 10px;font-size:10.5px;font-weight:600">Allergy requests<div style="margin-top:4px;height:40px;border:1px solid #cbd5e1;border-radius:6px;color:#aaa;font-weight:400;padding:6px 8px">Type allergens information here…</div></div></div>
   <div class="pft"><div class="qty"><button data-p="q" data-x="-1">−</button>${PH.qty}<button data-p="q" data-x="1">+</button></div><button class="pbb" data-p="add" data-pg="ph-add"><span>Add</span><span>${SEK((p.price+extra)*PH.qty)}</span></button></div></div></div>`}
  return head+`<div class="body">${h}</div>`+bar}
 if(s==='order')return head+`<div class="body"><div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px 6px;font-weight:600;font-size:15px">Your order<button class="x" style="width:20px;height:20px;border-radius:50%;border:1.5px solid #333;background:none;font-size:11px" data-p="back">✕</button></div>
   <div style="display:flex;justify-content:space-between;margin:0 14px 10px;font-size:10px;font-weight:600"><span>🍴 EAT IN: <b style="color:#2f6fe4">3</b></span><span style="color:#2f6fe4">CHANGE</span></div>
   <div style="margin:0 14px 4px;font-size:12px;font-weight:600">Your order</div><div style="margin:0 14px 8px;font-size:10px;color:#555">Approximate cooking time: <b>10 minutes</b></div>
   ${PH.cart.map((l,i)=>`<div class="card"><div style="display:flex;justify-content:space-between;font-weight:600;font-size:12px"><span>${esc(l.name)}</span><span>${SEK(lineTotal(l))}</span></div>${l.mods.length?`<div style="font-size:10px;color:#555;margin-top:4px">Your choices:<br>${l.mods.map(m=>`1 x ${esc(m.name)} (${m.price?SEK(m.price):'Free'})`).join('<br>')}</div>`:''}<div class="qty" style="margin-top:6px"><button data-p="lq" data-x="${i}:-1">−</button>${l.qty}<button data-p="lq" data-x="${i}:1">+</button></div></div>`).join('')}
   <div style="display:flex;justify-content:space-between;margin:6px 14px;font-weight:700;font-size:12px"><span>Total</span><span>${SEK(cartSum())}</span></div><div style="height:56px"></div></div>
   <button class="bar" data-p="details" data-pg="ph-provide"><span>Provide information and pay</span><span>›</span></button>`;
 if(s==='details')return head+`<div class="body"><div style="text-align:center;font-weight:600;font-size:15px;margin:16px 0 12px">Enter your details and pay</div>
   <label class="pfld">Name *<input data-pi="name" value="${esc(PH.name)}" placeholder="Name"></label><label class="pfld">Phone *<input data-pi="phone" value="${esc(PH.phone)}" placeholder="+46"></label><label class="pfld">Email *<input data-pi="email" value="${esc(PH.email)}" placeholder="name@example.com"></label><div style="height:56px"></div></div>
   <button class="bar" data-p="proceed" data-pg="ph-proceed" style="${PH.name&&PH.phone&&PH.email?'':'opacity:.5'}"><span>Proceed to payment</span><span>${SEK(cartSum())}</span></button>`;
 if(s==='pay')return head+`<div class="body"><div style="text-align:center;font-weight:600;font-size:15px;margin:16px 0 12px">Enter your details and pay</div>
   <div class="card" style="background:#f2f4f7;font-weight:600;font-size:12px;display:flex;justify-content:space-between">Your details<span>⌄</span></div>
   ${PH.payOpen==='apple'?`<div class="ppm" style="flex-direction:column;align-items:stretch"><div style="display:flex;gap:10px;align-items:center"><span class="i"></span><b>Apple Pay</b></div><div class="ok">✓</div><div style="text-align:center;font-weight:700">Done!</div><div style="text-align:center;font-size:11px;color:#555;margin:4px 0 8px">You are being redirected</div></div>`:
   `<div class="ppm" data-p="paym" data-x="swish" data-pg="ph-swish"><span class="i">◐</span><div><b>Swish</b><small>Pay with your mobile</small></div><span class="c">›</span></div><div class="ppm" data-p="paym" data-x="card" data-pg="ph-card"><span class="i" style="color:#f97316">▬</span><div><b>Card</b><small>Pay with your card</small></div><span class="c">›</span></div><div class="ppm" data-p="paym" data-x="apple" data-pg="ph-apple"><span class="i"></span><div><b>Apple Pay</b><small>Pay with your digital wallet</small></div><span class="c">›</span></div>`}
   <p style="text-align:center;font-size:9px;color:#888">You are paying with Swedbank Pay</p></div>`;
 if(s==='done'){const o=PH.lastOrder||{};return head+`<div class="body" style="text-align:center"><div style="width:74px;height:74px;border-radius:50%;border:3px solid #dbeafe;margin:34px auto 14px;display:grid;place-items:center"><div style="width:52px;height:52px;border-radius:50%;border:2px solid #111;display:grid;place-items:center;font-size:24px">✓</div></div>
   <div style="font-weight:600;font-size:15px;margin:0 20px">Your payment has been completed</div><div style="font-size:12px;margin:8px 0 18px">Paid total: ${SEK(o.total||0)}</div>
   <div style="margin:0 24px;background:#000;color:#fff;border-radius:4px;padding:8px;font-size:11px">Reference:<br><b style="font-size:13px">${esc(o.ref||'')}</b></div><div style="display:flex;justify-content:space-between;margin:12px 24px;font-size:10.5px"><b>Order date:</b><span>${esc(o.date||'')}</span></div>
   <button class="lnk" style="margin-top:6px;border:1px solid #2f6fe4;color:#2f6fe4;background:#fff;border-radius:14px;padding:6px 14px;font-size:11px" data-p="opensms" data-pg="ph-sms">Öppna SMS</button></div>`}
 return '';
}
function phRender(){const scr=document.getElementById('phscr');if(!scr)return;const t=new Date();
 const top=PH.screen==='qr'?'':`<div class="sb"><span>${hm(t)}</span><span>▮▮▮ ◠ ▭</span></div>`;
 const bodyEl=scr.querySelector('.body');const keep=bodyEl?bodyEl.scrollTop:0;
 scr.innerHTML=top+phBody()+(PH.screen==='qr'||PH.screen==='sms'?'':`<div class="url"><span>‹</span><b>yabie.icu</b><span>↻</span></div>`)+(PH.notif?`<div class="notif"><div class="av"></div><div><b>YabieSMS</b><br>${PH.notif}</div></div>`:'');
 const b2=scr.querySelector('.body');if(b2&&PH.keepScroll)b2.scrollTop=keep;PH.keepScroll=false;
 if(typeof T!=='undefined'&&T&&window.tourPlace)window.tourPlace()}
window.phRender=phRender;
function notify(t){PH.sms.push(t);PH.notif=t;phRender();clearTimeout(notify.h);notify.h=setTimeout(()=>{PH.notif=null;phRender()},4200)}

pane.addEventListener('input',e=>{const k=e.target.dataset.pi;if(!k)return;PH[k]=e.target.value;const b=pane.querySelector('[data-p="proceed"]');if(b)b.style.opacity=PH.name&&PH.phone&&PH.email?'':'.5';emit('ph:input',{k,v:e.target.value})});
pane.addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(!b)return;const a=b.dataset.p,x=b.dataset.x;
 if(a==='open'){PH.screen='shop';phRender();emit('ph:shop');return}
 if(a==='tab'){PH.tab=x;phRender();emit('ph:tab',x);return}
 if(a==='prod'){PH.pid=x;PH.sel={};PH.qty=1;const ms=modsFor(x);if(!ms.length){PH.cart.push({pid:x,name:P(x).name,price:P(x).price,qty:1,mods:[]});PH.keepScroll=true;phRender();emit('ph:add');return}
  ms.forEach(m=>{if(!m.multi)PH.sel[m.id+':0']=true});PH.screen='product';PH.keepScroll=true;phRender();emit('ph:product',x);return}
 if(a==='close'){PH.screen='shop';PH.keepScroll=true;phRender();return}
 if(a==='opt'){const[mid,i]=x.split(':'),m=S.modifiers.find(z=>z.id===mid);if(!m.multi)Object.keys(PH.sel).forEach(k=>{if(k.startsWith(mid+':'))delete PH.sel[k]});PH.sel[x]=m.multi?!PH.sel[x]:true;PH.keepScroll=true;phRender();emit('ph:opt',x);return}
 if(a==='q'){PH.qty=Math.max(1,PH.qty+ +x);phRender();return}
 if(a==='add'){const p=P(PH.pid),mods=[];modsFor(p.id).forEach(m=>m.opts.forEach((o,i)=>{if(PH.sel[m.id+':'+i])mods.push({name:o.name,price:o.price})}));PH.cart.push({pid:p.id,name:p.name,price:p.price,qty:PH.qty,mods});PH.screen='shop';PH.keepScroll=true;phRender();emit('ph:add');return}
 if(a==='order'){PH.screen='order';phRender();emit('ph:order');return}
 if(a==='back'){PH.screen='shop';phRender();return}
 if(a==='lq'){const[i,d]=x.split(':');const l=PH.cart[+i];l.qty+= +d;if(l.qty<=0)PH.cart.splice(+i,1);if(!PH.cart.length)PH.screen='shop';phRender();return}
 if(a==='details'){PH.screen='details';phRender();emit('ph:details');return}
 if(a==='proceed'){if(!(PH.name&&PH.phone&&PH.email))return;PH.screen='pay';PH.payOpen=null;phRender();emit('ph:pay');return}
 if(a==='paym'){PH.payOpen=x==='apple'?'apple':null;if(x!=='apple'){PH.payOpen='apple'}phRender();setTimeout(placeOrder,1300);return}
 if(a==='opensms'){PH.screen='sms';phRender();emit('ph:sms');return}
});
/* the customer has paid: the order arrives in the POS */
function placeOrder(){if(!PH.cart.length)return;const d=new Date();const id=String(S.orderSeq=(S.orderSeq||0)+1);
 const o={id:'web-'+Date.now().toString(36),num:id,name:PH.name.split(' ')[0]||'Kund',email:PH.email,phone:PH.phone,where:'Inside / 3',type:'eat',at:hm(d),ts:d.getTime(),items:PH.cart.map(l=>({...l,done:false})),total:cartSum(),state:'new',prep:null};
 S.onlineOrders.push(o);save();PH.lastOrder={total:o.total,ref:'KB-'+o.id.slice(-6).toUpperCase(),date:d.toLocaleDateString('sv-SE')+', '+hm(d)};PH.cart=[];PH.screen='done';phRender();
 notify(`Thank you for your order from Kaffebaren! You will get confirmation from very soon. Follow your order status here: <a>https://yab.ie/kb${o.id.slice(-3)}</a>`);
 UI.flash=true;render();setTimeout(()=>{UI.flash=false;render()},2500);emit('ph:paid',o);emit('online:new',o)}
window.placeDemoOnlineOrder=placeOrder;

/* ───────── POS: online pill counts, green flash, order cards ───────── */
const _lp=leftPanel;leftPanel=function(){let h=_lp();const nNew=S.onlineOrders.filter(o=>o.state==='new').length,nAcc=S.onlineOrders.filter(o=>o.state==='acc').length;
 h=h.replace(/(<span class="g">[^]*?<\/span>)0(<span class="sep"><\/span>)([^]*?)0<\/div>/,`$1${nNew}$2$3${nAcc}</div>`);return h};
const _r=render;render=function(){_r();const pos=document.getElementById('pos');if(UI.flash&&!pos.querySelector('.flashg'))pos.insertAdjacentHTML('beforeend','<div class="flashg"></div>');if(UI.onote)pos.insertAdjacentHTML('beforeend',`<div class="onote"><span class="g">✓</span><div><b>Email Sent</b><br><span style="color:#6b6b70">Sent to ${esc(UI.onote)}</span></div></div>`)};
const age=o=>{const m=Math.floor((Date.now()-o.ts)/60000);return m<1?'< 1 min':m+' min'};
function card(o){const acc=o.state==='acc',all=o.items.every(i=>i.done),anyDone=o.items.some(i=>i.done);
 const it=(l,i)=>`<div class="it ${l.done?'dn':''}" data-a="oitem" data-x="${o.id}:${i}" data-g="oo-item-${i}">${l.done?'<span class="ck">✓</span>':''}${l.qty} x ${esc(l.name)}${l.mods.length?`<div class="md">${l.mods.map(m=>`<div style="margin-top:3px">1 x<span>${esc(m.name)}</span></div>`).join('')}</div>`:''}</div>`;
 const open=o.items.map((l,i)=>[l,i]).filter(([l])=>!l.done),done=o.items.map((l,i)=>[l,i]).filter(([l])=>l.done);
 return `<div class="ooc ${acc?'acc':''} ${acc&&all?'alldone':''}" data-g="oo-card"><div class="h"><b>${age(o)}</b><small>${esc(o.where)}, Order for ${esc(o.name)}</small></div>${acc?`<div class="pt">Preparation Time ${o.prep} min</div>`:''}
  <div class="who"><span>👤 ${esc(o.name)}</span><span>${o.at}</span></div>${open.map(([l,i])=>it(l,i)).join('')}${done.length?`<div class="ch">Completed items</div>${done.map(([l,i])=>it(l,i)).join('')}`:''}<div class="sp"></div>
  <div class="sum"><span>${o.items.reduce((a,l)=>a+l.qty,0)} items</span><span>${kr(o.total).replace(',00','')}</span></div>
  <div class="bt">${acc?`<button class="rj" data-a="oreject" data-x="${o.id}">${IC.trash.replace('<svg','<svg style="width:15px;height:15px"')}</button><button class="ac" data-a="odone" data-x="${o.id}" data-g="oo-done">Done</button>`:`<button class="rj" data-a="oreject" data-x="${o.id}" title="Reject">👎</button><button class="ac" data-a="oaccept" data-x="${o.id}" data-g="oo-accept">Accept</button>`}</div></div>`}
onlineHtml=function(){const o=UI.online;const tab=(k,l,ic)=>`<button class="ftab ${o.tab===k?'on':''}" data-a="otab" data-x="${k}" data-g="otab-${k}">${ic} ${l}</button>`;
 const L=S.onlineOrders,nNew=L.filter(x=>x.state==='new').length,nEat=L.filter(x=>x.type==='eat').length,nTake=L.filter(x=>x.type==='take').length;
 const vis=L.filter(x=>o.f==='all'||(o.f==='new'&&x.state==='new')||(o.f==='eat'&&x.type==='eat')||(o.f==='take'&&x.type==='take'));
 const cnt=(l,n)=>n?`${l} (${n})`:l;
 const dlg=o.acc?`<div class="oadlg"><div class="dl"><h4>Accept Online Order</h4><button style="position:absolute;right:12px;top:10px;color:var(--blue);display:grid" data-a="oaccx">${IC.x.replace('<svg','<svg style="width:16px;height:16px"')}</button>
  <div style="margin-top:150px;font-size:12px;font-weight:600">Adjust Preparation Time (Optional)</div><div class="tm">${[5,10].map(m=>`<button class="${o.accT==m?'on':''}" data-a="oatime" data-x="${m}" data-g="oa-${m}">${m}</button>`).join('')}</div>
  <input placeholder="Other Time" inputmode="numeric" data-in="oaother" value="${esc(UI.f.oaother||'')}"><button class="cf" data-a="oaconfirm" data-g="oa-confirm">Confirm Time</button>${o.busy?'<div class="busy"><i>ya</i>Accepting order…</div>':''}</div></div>`:'';
 const hist=S.onlineHistory;
 return `<div class="full" data-g="online-view"><div class="fbar"><button class="tb" style="position:static;padding:0 6px">${IC.cog}</button><div class="tb" style="position:static;color:#1c1c1e!important;gap:8px"><span class="dot" style="width:8px;height:8px;border-radius:50%;background:#34c759;display:inline-block"></span>Online <span style="color:#c7c7cc">|</span> <span style="color:#1c1c1e">Preparation Time:</span> <b style="color:var(--blue)">10 min</b></div><span style="flex:1"></span>${tab('orders','Online orders',IC.bell.replace('<svg','<svg style="width:13px;height:13px"'))}${tab('history','History',IC.receipt.replace('<svg','<svg style="width:13px;height:13px"'))}<button data-a="oclose" style="color:var(--blue);margin-left:6px;display:grid" data-g="online-close">${IC.x.replace('<svg','<svg style="width:18px;height:18px"')}</button></div>
 ${o.tab==='orders'?`<div style="padding:12px 8px;display:flex;gap:6px">${[['all','All',L.length],['new','New',nNew],['eat','Eat in',nEat],['take','Takeaway',nTake]].map(([k,l,n])=>`<button class="chip ${o.f===k?'on':''}" data-a="ofilt" data-x="${k}">${cnt(l,n)}</button>`).join('')}<span style="flex:1"></span><button class="chip on">${IC.grid.replace('<svg','<svg style="width:13px;height:13px"')}</button><button class="chip">${IC.fn.replace('<svg','<svg style="width:13px;height:13px"')}</button></div>
   ${vis.length?`<div class="oos">${vis.map(card).join('')}</div><div class="page">Page 1</div>`:`<p style="text-align:center;color:#8e8e93;margin-top:160px">Inga online-ordrar just nu.<br>Beställningar från webbshop och QR-beställning dyker upp här.</p>`}${dlg}`
 :`<div style="padding:12px;display:flex;justify-content:center"><div class="sfld" style="width:460px;height:32px;background:#fff;border:1px solid #d1d1d6">${IC.search}<input placeholder="Search Order"></div></div><table class="tbl2"><tr><th>Order Time</th><th>Order</th><th>Total amount</th><th>Name</th><th>Contact info</th><th>Delivery partners</th></tr>${hist.map(h=>`<tr><td>${esc(h.at)}</td><td>${esc(h.num)}</td><td>${kr(h.total)}</td><td>${esc(h.name)}</td><td>${esc(h.email)}<br><span style="color:#8e8e93">${esc(h.phone)}</span></td><td>Yabie Online</td></tr>`).join('')}</table><p style="text-align:center;font-size:12.5px;margin-top:10px">Use search to find orders that are older than two days</p>`}</div>`};
const _on=A.online;A.online=function(){_on();emit('open:online')};
Object.assign(A,{
 oaccept(id){UI.online.acc=id;UI.online.accT=5;UI.online.busy=false;UI.f.oaother='';render();emit('open:oaccept',id)},
 oaccx(){UI.online.acc=null;render()},
 oatime(m){UI.online.accT=+m;UI.f.oaother='';render();emit('online:time',+m)},
 oaconfirm(){const o=S.onlineOrders.find(x=>x.id===UI.online.acc);if(!o)return;const t=parseInt(UI.f.oaother,10)||UI.online.accT||5;UI.online.busy=true;render();
  setTimeout(()=>{o.state='acc';o.prep=Math.max(1,t-1);UI.online.acc=null;UI.online.busy=false;save();UI.onote=o.email||'kunden';render();setTimeout(()=>{UI.onote=null;render()},2600);
   const ready=new Date(Date.now()+t*60000);notify(`Thank you for your order from Kaffebaren! It's expected to be ready at ${hm(ready)}. Follow your order status here: <a>https://yab.ie/kb${o.id.slice(-3)}</a>`);emit('online:accepted',o)},900)},
 oitem(x){const[id,i]=x.split(':');const o=S.onlineOrders.find(z=>z.id===id);if(!o||o.state!=='acc')return toast('Acceptera ordern först.');o.items[+i].done=!o.items[+i].done;save();render();emit('online:item',o)},
 odone(id){const i=S.onlineOrders.findIndex(z=>z.id===id);if(i<0)return;const o=S.onlineOrders[i];o.items.forEach(l=>l.done=true);render();
  setTimeout(()=>{S.onlineOrders.splice(i,1);S.onlineHistory.unshift({at:new Date(o.ts).toLocaleDateString('sv-SE')+', '+o.at,num:'261008-'+o.id.slice(-8).toUpperCase(),total:o.total,name:o.name,email:o.email,phone:o.phone});save();render();
   notify('Your order from Kaffebaren is ready to be picked up.');emit('online:done',o)},700)},
 oreject(id){const i=S.onlineOrders.findIndex(z=>z.id===id);if(i<0)return;const o=S.onlineOrders[i];S.onlineOrders.splice(i,1);save();render();notify('Tyvärr kunde Kaffebaren inte ta emot din order. Pengarna återbetalas.');toast('Ordern är nekad och återbetalas')}
});
/* keep "< 1 min" counters fresh */
setInterval(()=>{if(UI.online&&S.onlineOrders.length&&!UI.online.acc&&!document.activeElement?.matches?.('#pos input'))render()},30000);

/* phone pane visibility (used by guides with phone:true) */
window.phoneShow=function(){if(!pane.hidden)return;pane.hidden=false;document.getElementById('stage').classList.add('with-term');phRender();fit()};
window.phoneHide=function(){if(pane.hidden)return;pane.hidden=true;document.getElementById('stage').classList.remove('with-term');fit()};
window.phoneReset=function(){Object.assign(PH,{screen:'qr',tab:null,cart:[],pid:null,sel:{},qty:1,name:'',phone:'',email:'',sms:[],notif:null,payOpen:null});phRender()};
})();
