/* Payment methods: up to four quick-pay buttons, chosen and ordered on My Store → Payment methods (like Express). */
(()=>{
const name=p=>p.id==='gift'?'Yabie gift card':qName(p);
S.payLayout=S.payLayout||{numpad:true,large:false};
if(!S.payLayout.quick)S.payLayout.quick=S.payments.filter(p=>p.quick).map(p=>p.id);
/* geometry of the quick-pay area (register and preview share it) */
function slots(n,numpad){if(numpad){const h=(173-7*(Math.max(n,1)-1))/Math.max(n,1);return Array.from({length:n},(_,i)=>({x:139,y:i*(h+7),w:134,h}))}
 if(n<=2){return Array.from({length:n},(_,i)=>({x:0,y:i*90,w:273,h:83}))}
 return Array.from({length:n},(_,i)=>({x:(i%2)*139,y:Math.floor(i/2)*90,w:134,h:83}))}
const st=document.createElement('style');st.textContent=`#pos .pay.sm{font-size:11px;gap:2px}#pos .pay.sm svg{width:17px;height:17px}
#pos .pvq{position:absolute;border-radius:6px;background:var(--blue2);color:#fff;font-size:11px;font-weight:600;display:grid;place-content:center;justify-items:center;gap:3px;text-align:center}
#pos .pvq svg{width:18px;height:18px}#pos .pvq .rmv{position:absolute;right:-6px;top:-6px}
#pos .pvadd{position:absolute;border:1.5px dashed #b9c6dc;border-radius:6px;color:var(--blue)!important;font-size:20px;background:#fff}
#pos .pmrow{display:flex;align-items:center;gap:10px;min-height:40px;padding:0 14px;border-bottom:1px solid #ececf0;font-size:12.5px;font-weight:600;cursor:pointer;background:#fff}
#pos .pmrow.on{background:#e8f0fe}#pos .pmrow svg{width:16px;height:16px;color:var(--blue)}`;document.head.appendChild(st);
/* register */
const _rp=rightPanel;rightPanel=function(){let h=_rp();if(UI.pop||C().ret||!/class="pay /.test(h)&&!/class="key"/.test(h))return h;
 const has=C().items.length>0,L=S.payLayout,q=(L.quick||[]).map(id=>S.payments.find(p=>p.id===id)).filter(Boolean).slice(0,4);
 h=h.replace(/<button class="pay [^"]*"[^>]*>[^]*?<\/button>/g,'');
 if(!L.numpad)h=h.replace(/<button class="key"[^>]*>[^]*?<\/button>/g,'');
 if(!/class="key"/.test(h)&&L.numpad)return h; // compact states
 const S0=slots(q.length,L.numpad),ox=L.numpad?8:8;
 const btns=q.map((p,i)=>{const s=S0[i];return `<button class="pay ${has?'on':''} ${s.h<60||s.w<140&&!L.numpad?'sm':''}" style="left:${ox+s.x}px;top:${550+s.y}px;width:${s.w}px;height:${s.h}px" data-a="${has?'pay':'nop'}" data-x="${p.id}" data-g="pay-${p.id}">${PMI(p.id)}${esc(qName(p))}</button>`}).join('');
 return h.replace(/(<button class="bb f")/,btns+'$1')};
/* settings page */
PAGES.paymethods=()=>{const L=UI.f.pl||(UI.f.pl={numpad:S.payLayout.numpad,large:S.payLayout.large,quick:[...(S.payLayout.quick||[])]});const show=L.numpad;
 const keys=show?['1','2','3','4','5','6','7','8','9','00','0','⌫'].map((k,i)=>`<span class="key" style="left:${44.5*(i%3)}px;top:${44.5*Math.floor(i/3)}px">${k==='⌫'?IC.bksp:k}</span>`).join(''):'';
 const n=Math.min(4,L.quick.length+1),S0=slots(n,show),base=show?0:0;
 const tiles=L.quick.map((id,i)=>{const p=S.payments.find(x=>x.id===id),s=S0[i];return `<div class="pvq" style="left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px">${PMI(id)}${esc(name(p))}<button class="rmv" data-a="plrm" data-x="${id}" data-g="pl-rm-${id}"></button></div>`}).join('')
  +(L.quick.length<4?(()=>{const s=S0[L.quick.length];return `<button class="pvadd" style="left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px" data-a="pladd" data-g="pl-add">+</button>`})():'');
 return {white:true,title:'Payment methods',body:`<div class="sec">Select payment layout</div><div class="grp" style="background:#e3e3e8">${row('Hide numpad',{a:'plnum',x:'0',html:`${rad(!show)}Hide numpad`,nochev:1,g:'pl-hide'})}${row('Show numpad',{a:'plnum',x:'1',html:`${rad(show)}Show numpad`,nochev:1,g:'pl-show',right:true,val:`<span style="color:#1c1c1e;font-size:12.5px;margin-right:6px">Use large numpad</span><span class="tog ${L.large?'on':''}" data-a="pllarge"></span>`})}</div>
  <div style="position:relative;width:${show?273:273}px;height:173px;margin:36px auto 0">${keys}${tiles}</div>
  <p style="text-align:center;font-size:10.5px;color:#6b6b70;margin-top:22px">This is a preview of the Functions that will appear in the checkout.<br><br>Drag and drop to re-order the buttons and press the arrows to resize them.</p>`,
  foot:`<button class="btnb g" style="min-width:290px;color:var(--red)!important" data-a="plabort">Abort</button><button class="btnb" style="min-width:290px" data-a="plsave" data-g="pl-save">Save</button>`}};
PAGES.pladdpage=()=>{const L=UI.f.pl,sel=UI.f.plsel;const list=S.payments.filter(p=>!L.quick.includes(p.id));
 return {white:true,title:'Add payment method',bodyCss:'padding:18px 30px 90px',body:`<div class="grp" style="overflow:hidden">${list.map(p=>`<div class="pmrow ${sel===p.id?'on':''}" data-a="plsel" data-x="${p.id}" data-g="pl-pick-${p.id}">${PMI(p.id)}${esc(name(p))}</div>`).join('')||'<p style="padding:12px;color:#8e8e93;margin:0">Alla betalsätt är redan tillagda.</p>'}</div>`,
  foot:`<button class="btnb ${sel?'':'dis'}" style="min-width:290px" data-a="plpick2" data-g="pl-pick-ok">Add payment method</button>`}};
Object.assign(A,{plnum(v){UI.f.pl.numpad=v==='1';render();emit('pm:layout')},pllarge(){UI.f.pl.large=!UI.f.pl.large;render()},plrm(id){UI.f.pl.quick=UI.f.pl.quick.filter(x=>x!==id);render()},
 pladd(){UI.f.plsel=null;push('pladdpage',{})},plsel(id){UI.f.plsel=id;render();emit('pm:sel')},plpick2(){if(!UI.f.plsel)return;UI.f.pl.quick.push(UI.f.plsel);UI.f.plsel=null;pop();emit('pm:add')},
 plabort(){UI.f.pl=null;pop()},plsave(){const L=UI.f.pl;S.payLayout={numpad:L.numpad,large:L.large,quick:[...L.quick]};S.payments.forEach(p=>{p.quick=L.quick.includes(p.id);if(p.quick)p.enabled=true});UI.f.pl=null;save();emit('pm:save');pop();toast('Betalsätten är sparade')}});
const _go=A.go;A.go=function(x,el){if(x==='paymethods'){UI.f.pl=null}return _go(x,el)};
})();
