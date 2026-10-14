/* Extra devices shown next to the POS during guides: customer display (Yabie Screen) and kitchen display (KDS). */
(()=>{
const SEK=v=>'SEK'+(Math.round(v*100)/100).toFixed(2);
S.kds=S.kds||[];
const st=document.createElement('style');st.textContent=`
.devpane{position:relative;z-index:85;flex:none}.devpane[hidden]{display:none}
.dev{display:inline-block;background:#1b1d22;border-radius:16px;padding:9px;box-shadow:0 20px 60px rgba(10,15,30,.22)}
.dev .vds{position:relative;background:#fff;border-radius:8px;overflow:hidden;font-family:Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;color:#111}
.dev.cd .vds{width:360px;height:225px;display:flex}
.cd .vlft{flex:1;position:relative;background:#f2f2f4;display:flex;flex-direction:column}
.cd .vrgt{width:118px;background:#6fd3a8;display:grid;place-items:center;font:800 26px/1 Georgia,serif;letter-spacing:-.02em}
.cd .vipx{margin:16px auto 0;text-align:center;font-size:10px;font-weight:600}
.cd .vqr{width:76px;height:76px;margin:8px auto;background:repeating-linear-gradient(90deg,#111 0 4px,transparent 4px 7px),repeating-linear-gradient(0deg,#111 0 3px,transparent 3px 8px);background-blend-mode:multiply;outline:6px solid #fff}
.cd .vlines{flex:1;padding:8px 10px;font-size:9.5px;overflow:hidden}.cd .vlines div{display:flex;gap:6px;padding:3px 0;border-bottom:1px solid #e5e5ea}.cd .vlines div span:last-child{margin-left:auto}
.cd .vtot{height:22px;background:#111;color:#fff;display:flex;justify-content:space-between;align-items:center;padding:0 10px;font-size:10px;font-weight:700}
.cd .vrcpt{position:absolute;inset:0;background:#f2f2f4;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:10px}
.cd .vrcpt .vpd{background:#e5e5ea;border-radius:4px;padding:6px 10px;width:150px;display:flex;justify-content:space-between;font-weight:600}
.cd .vrcpt button{width:120px;height:20px;border-radius:3px;background:#1a73e8;color:#fff;font-size:9.5px;border:0}.cd .vrcpt button.vg{background:#e5e5ea;color:#1a73e8}
.dev.kds .vds{width:520px;height:370px;display:flex;flex-direction:column;background:#fff}
.kds .vkh{height:30px;display:flex;align-items:center;gap:8px;padding:0 10px;border-bottom:1px solid #e5e5ea;font-size:11px;font-weight:600}
.kds .vkh .vch{display:flex;gap:5px;margin-left:8px}.kds .vkh .vch span{background:#e8f0fe;color:#1a73e8;border-radius:4px;padding:2px 7px;font-weight:500;font-size:9.5px}.kds .vkh .vch span.von{background:#1a73e8;color:#fff}
.kds .vtk{flex:1;display:flex;gap:7px;padding:8px;overflow-x:auto}
.kds .vtc{width:118px;flex:none;display:flex;flex-direction:column;background:#f2f2f6;border-radius:2px}
.kds .vtc .vth{background:#34c759;color:#fff;padding:4px 6px}.kds .vtc .vth b{display:block;font-size:12px;font-weight:600}.kds .vtc .vth small{font-size:8px;font-weight:600}
.kds .vtc .vtw{display:flex;justify-content:space-between;background:#e5e5ea;font-size:7.5px;padding:2px 6px;color:#1a73e8}
.kds .vtc .vti{display:flex;gap:5px;align-items:flex-start;padding:6px;font-size:9px;font-weight:600;border-bottom:1px solid #e5e5ea;cursor:pointer}
.kds .vtc .vti i{width:9px;height:9px;border:1.2px solid #8e8e93;border-radius:50%;flex:none;margin-top:1px}.kds .vtc .vti.von i{background:#1a73e8;border-color:#1a73e8}
.kds .vtc .vti.vdn{color:#8e8e93;font-weight:500}.kds .vtc .vti.vdn i{border-color:#34c759;background:none;position:relative}.kds .vtc .vti.vdn i::after{content:"✓";position:absolute;font-size:7px;color:#34c759;left:1px;top:-2px}
.kds .vtc .vtm{font-size:7.5px;color:#6b6b70;margin-top:2px;font-weight:500}
.kds .vtc .vkl{background:#e5e5ea;text-align:center;font-size:8.5px;font-weight:600;padding:3px 0}
.kds .vtc .vsp{flex:1}.kds .vtc .vtf{font-size:8px;padding:3px 6px;background:#e5e5ea;font-weight:600}
.kds .vtc .vtb{padding:5px 6px;background:#fff}.kds .vtc .vtb button{width:100%;height:20px;border-radius:4px;background:#1a73e8;color:#fff;border:0;font-size:9px;font-weight:600;cursor:pointer}.kds .vtc .vtb button.vr{background:#ff3b30}
.kds .vpg{text-align:center;font-size:8px;padding:3px}.kds .vflash{position:absolute;inset:0;border:5px solid #34c759;border-radius:8px;pointer-events:none;animation:kfl 2.4s forwards}
@keyframes kfl{0%,70%{opacity:1}100%{opacity:0}}
.kds .vempty{margin:auto;color:#8e8e93;font-size:10px;text-align:center}
@media (max-width:860px){.devpane{width:100%;display:flex;justify-content:center}}
`;document.head.appendChild(st);
const pane=document.createElement('div');pane.className='devpane';pane.id='devpane';pane.hidden=true;document.getElementById('stage').appendChild(pane);
let kind=null,flash=0,undo=null;
const age=t=>{const m=Math.floor((Date.now()-t)/60000);return m<1?'< 1 min':m+' min'};
function cdHtml(){const ip=S.display&&S.display.ip,on=ip&&S.display.auto!==false;const c=C(),t=UI.modal&&mtop().p==='checkout'?mtop().d:null;
 if(!on)return `<div class="vlft"><div class="vipx">192.168.1.42</div><div class="vqr"></div><div style="text-align:center;font-size:7px;color:#8e8e93;margin-top:auto;padding:4px">Yabie Screen · väntar på kassan</div></div><div class="vrgt">yabie</div>`;
 if(t)return `<div class="vlft"><div class="vrcpt"><div class="vpd"><span>Paid:</span><span>${SEK(t.total||t.paid||0)}</span></div><b style="margin-top:4px">Receipt?</b><button data-cd="sms">SMS</button><button data-cd="mail">eMail</button><button class="vg" data-cd="skip" data-cg="cd-skip">Skip receipt</button></div></div>`;
 return `<div class="vlft"><div class="vlines">${c.items.map(i=>`<div><span>${i.qty}x</span><span>${esc(i.name)}</span><span>${SEK(lineTot(i))}</span></div>`).join('')}</div><div class="vtot"><span>TOTAL:</span><span>${SEK(c.items.length?cartTot():0)}</span></div></div><div class="vrgt">yabie</div>`}
function kdsHtml(){const L=S.kds;return `<div class="vkh">☰ Kök<span class="vch"><span class="von">All (${L.length})</span><span>New (${L.filter(k=>!k.items.some(i=>i.done)).length})</span><span>Eat in</span><span>Takeaway</span></span><span style="margin-left:auto;color:#1a73e8;font-weight:500">History</span></div>
 <div class="vtk">${L.length?L.map((k,ki)=>{const open=k.items.map((it,i)=>[it,i]).filter(([it])=>!it.done),done=k.items.map((it,i)=>[it,i]).filter(([it])=>it.done),sel=k.items.some(i=>i.sel);
  const row=([it,i])=>`<div class="vti ${it.done?'vdn':''} ${it.sel?'von':''}" data-kds="item" data-x="${ki}:${i}" data-kg="kds-item-${i}"><i></i><div>${it.qty} x ${esc(it.name)}${it.mods&&it.mods.length?`<div class="vtm">${esc(it.mods.join(', '))}</div>`:''}</div></div>`;
  return `<div class="vtc" data-kg="kds-ticket"><div class="vth"><b>${age(k.ts)}</b><small>● ${esc(k.where)}</small></div><div class="vtw"><span>${esc(k.who||'Kassa 1')}</span><span>${k.at}</span></div>${open.map(row).join('')}${done.length?`<div class="vkl">Klara artiklar</div>${done.map(row).join('')}`:''}<div class="vsp"></div><div class="vtf">${k.items.reduce((a,i)=>a+i.qty,0)} artiklar</div>
   <div class="vtb">${sel?`<button data-kds="mark" data-x="${ki}" data-kg="kds-mark">Markera artiklar som klara</button>`:`<button data-kds="bump" data-x="${ki}" data-kg="kds-bump">Klar</button>`}</div></div>`}).join(''):'<div class="vempty">Inga ordrar just nu.<br>Nya ordrar visas här direkt.</div>'}
  ${undo?`<div class="vtc" style="width:92px;background:none;justify-content:flex-end"><div class="vtb" style="background:none"><button class="vr" data-kds="undo" data-kg="kds-undo">↺ Ångra klar</button></div></div>`:''}</div><div class="vpg">Sida 1</div>${flash?'<div class="vflash"></div>':''}`}
function draw(){if(pane.hidden||!kind)return;pane.innerHTML=(window.__devHtml||{})[kind]?__devHtml[kind]():kind==='a30'?`<div class="dev a30">${window.__a30Html?__a30Html():''}</div>`:`<div class="dev ${kind}"><div class="vds">${kind==='cd'?cdHtml():kdsHtml()}</div></div>`;fitDev()}
window.devRedraw=()=>draw();
function fitDev(){const d=pane.querySelector('.dev');if(!d)return;const narrow=innerWidth<=860;const st=document.getElementById('stage');const w=d.offsetWidth,h=d.offsetHeight;
 const maxW=narrow?st.clientWidth-32:Math.min(st.clientWidth*.4,w),k=Math.min(1,maxW/w,kind==='star'?Math.max(.5,(innerHeight-230)/h):1);d.style.transform=`scale(${k})`;d.style.transformOrigin=narrow?'top center':'top left';pane.style.width=narrow?'100%':w*k+'px';pane.style.height=h*k+'px'}
window.devShow=function(k){const was=!pane.hidden&&kind===k;kind=k;if(pane.hidden){pane.hidden=false;document.getElementById('stage').classList.add('with-term')}draw();if(!was)fit()};
window.devHide=function(){if(pane.hidden)return;pane.hidden=true;kind=null;document.getElementById('stage').classList.remove('with-term');fit()};
const _r=render;render=function(){_r();draw()};
pane.addEventListener('click',e=>{const b=e.target.closest('[data-kds],[data-cd]');if(!b)return;
 if(b.dataset.cd){const k=b.dataset.cd==='mail'?'email':b.dataset.cd;if(UI.modal&&mtop().p==='checkout')A.rcpt(k);return}
 const a=b.dataset.kds,x=b.dataset.x;
 if(a==='item'){const[k,i]=x.split(':').map(Number);const it=S.kds[k].items[i];if(it.done){it.done=false}else it.sel=!it.sel;save();draw();emit('kds:item');return}
 if(a==='mark'){S.kds[+x].items.forEach(i=>{if(i.sel){i.done=true;i.sel=false}});save();draw();emit('kds:mark');return}
 if(a==='bump'){const k=S.kds.splice(+x,1)[0];undo={k,i:+x};save();draw();emit('kds:bump');clearTimeout(undo.h);undo.h=setTimeout(()=>{undo=null;draw()},5000);return}
 if(a==='undo'&&undo){S.kds.splice(undo.i,0,undo.k);undo=null;save();draw();return}});
function ticket(items,where){S.kds.push({id:Date.now(),ts:Date.now(),at:now().slice(12),where,items:items.map(i=>({name:i.name,qty:i.qty,mods:i.mods||[],done:false,sel:false}))});
 if(S.kds.length>8)S.kds.shift();save();flash=1;draw();setTimeout(()=>{flash=0;draw()},2500);emit('kds:new')}
on((ev,d)=>{if(ev==='paid'){const o=S.orders[0];if(o&&!o.history.some(h=>h.paid<0))ticket(o.items.filter(i=>!i.gift),'Kassa | Order '+(o.id.slice(-4)))}
 if(ev==='park'){const c=S.parked[S.parked.length-1];if(c)ticket(c.items,c.table?'Restaurang | '+(c.name||'Bord'):'Parkerad | '+(c.name||''))}
 if(ev==='display:ip'||ev==='close'||ev==='add'||ev==='receipt:skip')draw()});
addEventListener('resize',fitDev);
window.kdsReset=()=>{S.kds=[];save();draw()};
})();
/* PAX A30 (Swedbank Pax, LAN) shown next to the POS in the card terminal guide */
(()=>{
const st=document.createElement('style');st.textContent=`
.dev.a30{border-radius:26px;padding:14px 14px 0;width:250px;background:#22252b}
.a30 .vds{width:222px;height:140px;border-radius:6px;display:grid;place-items:center;text-align:center;font-size:11px;color:#16325c;position:relative}
.a30 .kp{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:14px 8px 18px}.a30 .kp span{height:20px;border-radius:4px;background:#e9e9ee;color:#0b2a6b;font:700 10px/20px Inter,sans-serif;text-align:center}
.a30 .kp span.x{background:#d9343a}.a30 .kp span.c{background:#f2a33a}.a30 .kp span.o{background:#2ea36b}
.a30 .bar{width:120px;height:4px;background:#cfe1f2;border-radius:2px;margin:8px auto 0;overflow:hidden}.a30 .bar i{display:block;height:100%;width:40%;background:#2ea36b;animation:a30b 1.4s linear infinite}
@keyframes a30b{from{transform:translateX(-100%)}to{transform:translateX(260%)}}
.a30 .spin{width:16px;height:16px;border:2px solid #9fd6c0;border-top-color:#2ea36b;border-radius:50%;margin:0 auto 6px;animation:a30s 1s linear infinite}@keyframes a30s{to{transform:rotate(360deg)}}
.a30 .pw{position:absolute;bottom:4px;left:0;right:0;font-size:7px;color:#6b7c93}
.a30 .bg{background:#3a8fd6;color:#fff;border:0;border-radius:4px;padding:5px 10px;font-size:10px;font-weight:600;margin-top:8px;cursor:pointer}`;document.head.appendChild(st);
let A30='off',seq=null;const SC={
 off:['#111',''],pax:['#9fd1f0','<b style="font:italic 900 26px/1 Arial;color:#16325c">PAX</b><div style="font-size:7px">Your Payment Partner of Choice</div>'],
 swedbank:['#b8d94a','<div style="width:34px;height:34px;border-radius:50%;background:#d9692b;margin:0 auto"></div><b style="font-size:20px;color:#2f7dc8">Pay</b>'],
 begin:['#9fd1f0','<div><b style="font-size:13px">Welcome</b><div>Terminal is not activated</div><button class="bg" data-a30="begin" data-ag="begin">Begin activation</button></div>'],
 whitelist:['#9fd1f0','<div><div class="spin"></div>Whitelisting</div>'],download:['#9fd1f0','<div><b>Download in progress</b><div class="bar"><i></i></div></div>'],
 install:['#9fd1f0','<div><div class="spin"></div>Software installation in progress<br>Please wait</div>'],android:['#2b5c8a','<div style="color:#fff"><div class="spin"></div>Android is starting…</div>'],
 params:['#9fd1f0','<div><div class="spin"></div>Obtaining terminal parameters</div>'],ip:['#eef3f8','<div><div style="font-size:9px;color:#6b7c93">Quick setup · Network</div><b style="font-size:16px;display:block;margin:4px 0">192.168.1.50</b><div style="font-size:8px">Ange denna IP-adress i kassan</div></div>'],
 initialised:['#9fd1f0','<b style="font-size:14px">Initialised</b>'],ready:['#6fd3a8','<b style="font:800 30px/1 Georgia,serif;color:#111">yabie</b>'],closed:['#22324a','<b style="color:#9fd1f0;font-size:15px">Stängt</b>']};
function a30Html(){const[bg,h]=SC[A30]||SC.off;return `<div class="vds" style="background:${bg}">${h}${A30!=='off'&&A30!=='ready'?'<div class="pw">Powered by Pay</div>':''}</div><div class="kp">${['1','2','3','x','4','5','6','c','7','8','9','o','*','0','#','·'].map(k=>`<span class="${k==='x'?'x':k==='c'?'c':k==='o'?'o':''}">${k==='x'||k==='c'||k==='o'?'':k}</span>`).join('')}</div>`}
const run=(list,done)=>{clearTimeout(seq);let i=0;const nx=()=>{A30=list[i];window.devRedraw&&devRedraw();emit('a30:'+A30);i++;if(i<list.length)seq=setTimeout(nx,1300);else done&&done()};nx()};
window.devState=s=>{if(SC[s]&&!seq){A30=s;window.devRedraw&&devRedraw()}};
window.a30State=()=>A30;window.a30Reset=()=>{clearTimeout(seq);seq=null;A30='off'};
window.__a30Html=a30Html;
document.getElementById('devpane').addEventListener('click',e=>{const b=e.target.closest('[data-a30]');if(!b)return;if(b.dataset.a30==='begin'){emit('a30:begin');run(['whitelist','download','install','params','ip'],()=>{seq=null})}});
on(ev=>{if(ev==='terminal:add'&&document.getElementById('devpane')&&!document.getElementById('devpane').hidden&&A30!=='ready'){run(['download','install','android','params','initialised','ready'],()=>{seq=null})}});
})();
/* added terminals on the provider page, like Express ("Added terminals" card) */
(()=>{const _tp=PAGES.termprov;PAGES.termprov=d=>{const r=_tp(d);if(d.id==='Swedbank Cloud')return r;const L=S.terminals.filter(t=>t.prov===d.id&&t.ip);if(!L.length)return r;
 r.body=`<div class="sec" style="margin-top:12px">Added terminals</div>${L.map(t=>`<div class="grp" style="padding:10px 14px;margin-bottom:10px"><div style="font-size:11.5px;font-weight:600">${d.id==='Swedbank Pax'?'Swedbank Pax':esc(d.id)}</div><div style="display:flex;align-items:center;gap:8px;margin:6px 0 8px"><span style="width:24px;height:24px;border-radius:50%;background:#d9692b;display:inline-block"></span><b style="font-size:16px">Pay</b></div><div style="display:flex;justify-content:space-between;font-size:11.5px;border-top:1px solid #ececf0;padding-top:6px"><span>Hostname</span><span style="color:#8e8e93">${esc(t.ip)}</span></div></div>`).join('')}<div class="grp">${row('Advanced',{a:'nop'})}</div><div class="grp" style="margin-top:10px">${row('Forget Terminal',{a:'termforget',x:d.id,cls:'red',nochev:1})}</div>`+r.body;return r}
A.termforget=p=>{S.terminals=S.terminals.filter(t=>t.prov!==p);save();render();toast('Terminalen är borttagen')}})();
