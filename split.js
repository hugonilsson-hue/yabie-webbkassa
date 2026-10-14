/* From the button-by-button walkthrough: confirm dialogs, Split by items, Split by amount, PLU, Scan,
   numpad entry bar, newest cart line first, fixed-size quick-pay slots. */
(()=>{
const st=document.createElement('style');st.textContent=`
#pos .valert{position:absolute;inset:0;z-index:80;background:rgba(30,30,36,.32);display:grid;place-items:center}
#pos .valert>div{width:236px;background:rgba(242,242,246,.97);border-radius:14px;padding:16px 16px 12px;text-align:center;box-shadow:0 10px 40px #0004}
#pos .valert b{display:block;font-size:13.5px;margin-bottom:4px}#pos .valert p{font-size:12px;margin:0 0 12px;line-height:1.35}
#pos .valert .bt{display:flex;gap:8px}#pos .valert .bt button{flex:1;height:30px;border-radius:15px;background:#e3e3e8;font-size:12.5px;font-weight:500;color:#1c1c1e!important}
#pos .valert .bt button.r{color:#e5484d!important}#pos .valert .bt button.k{font-weight:600}
#pos .sphead{position:absolute;left:0;right:0;top:0;height:46px;background:var(--blue2);color:#fff;display:flex;align-items:center;padding:0 10px;font-size:15px;z-index:2;border-radius:10px 10px 0 0}
#pos .sphead .u{margin-left:auto;width:26px;height:26px;border:2px solid #fff;border-radius:50%;display:grid;place-items:center;color:#fff!important;font-size:14px;font-weight:700}
#pos .sphead .m{margin-left:8px;height:28px;padding:0 9px;border-radius:7px;background:rgba(255,255,255,.18);color:#fff!important;font-size:12.5px;display:flex;align-items:center;gap:5px}
#pos .sprad{position:absolute;left:-22px;top:50%;margin-top:-8px;width:16px;height:16px;border-radius:50%;border:1.5px solid #8e8e93;background:#fff}
#pos .sprad.on{border:5px solid var(--blue2)}
#pos .spwrap .ci{margin-left:22px;width:calc(100% - 22px)}#pos .spwrap .cix{margin-left:22px;width:calc(100% - 22px)}#pos .spwrap .cisub{margin-left:36px}
#pos .ci.spon{background:#9dbdf8}
#pos .numbar{position:absolute;left:8px;right:8px;height:28px;border-radius:6px;background:#e3e3e8;display:flex;align-items:center;justify-content:flex-end;padding:0 8px;font-size:19px;color:#3a3a3c;gap:8px}
#pos .numbar button{width:14px;height:12px;border-radius:2px;background:#8e8e93;color:#fff!important;font-size:9px;display:grid;place-items:center;line-height:1}
#pos .pay.h{grid-auto-flow:column;place-content:center;align-items:center;gap:8px;font-size:12px;padding:0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#pos .pay.h svg{width:20px;height:20px}
#pos .pvq.h{grid-auto-flow:column;align-items:center;gap:6px;justify-content:start;padding:0 10px}
#pos .pvq .rsz{position:absolute;right:3px;bottom:3px;width:11px;height:11px;border-radius:2px;background:#fff;color:var(--blue)!important;font-size:8px;display:grid;place-items:center;line-height:1}
#pos .scanbox{display:grid;justify-items:center;gap:10px;color:#3a3a3c;font-size:12.5px;margin-top:250px}
#pos .spamt .max{display:block;width:100%;height:46px;border-radius:4px;background:#e3e3e8;font-size:12.5px;line-height:1.35;color:#1c1c1e!important}
#pos .spamt .max small{display:block;color:var(--blue);font-size:12px;font-weight:600}
#pos .selpay{display:flex;flex-wrap:wrap;gap:7px;margin-top:18px}
#pos .selpay button{width:82px;height:77px;border-radius:6px;background:var(--blue2);color:#fff!important;font-size:11.5px;font-weight:600;display:grid;place-content:center;justify-items:center;gap:5px;text-align:center;line-height:1.2}
#pos .selpay button.off{background:#e3e3e8;color:#8e8e93!important}#pos .selpay svg{width:22px;height:22px}
#pos .partrow{display:flex;justify-content:space-between;font-size:12.5px;padding:6px 4px;color:#1a7f37}`;document.head.appendChild(st);

/* ── confirm dialog (iOS-style alert) ── */
let cfCb=null;
window.vConfirm=(o,cb)=>{UI.confirm={t:o.t||'',p:o.p||'',ok:o.ok||'OK',red:!!o.red};cfCb=cb;render()};
A.vcfok=()=>{UI.confirm=null;const f=cfCb;cfCb=null;render();f&&f()};A.vcfno=()=>{UI.confirm=null;cfCb=null;render()};
const _render=render;render=function(){_render();const pos=document.getElementById('pos');if(!pos)return;
 if(UI.confirm){const c=UI.confirm;pos.insertAdjacentHTML('beforeend',`<div class="valert"><div>${c.t?`<b>${esc(c.t)}</b>`:''}<p>${esc(c.p)}</p><div class="bt"><button data-a="vcfno" data-g="cf-cancel">Cancel</button><button class="${c.red?'r':'k'}" data-a="vcfok" data-g="cf-ok">${esc(c.ok)}</button></div></div></div>`)}
 const cl=document.getElementById('cartl');if(cl&&UI.sel!=null&&UI.sel===C().items.length-1)cl.scrollTop=0};
/* Bin asks first */
const _bin=A.bin;A.bin=function(){if(!C().items.length)return;vConfirm({t:'Clear basket',p:'This will remove all items from basket',ok:'Clear basket',red:true},()=>_bin())};

/* ── newest cart line on top (as in the register) ── */
const _rpo=rightPanel;rightPanel=function(){let h=_rpo();const re=/<button class="ci [^"]*" data-a="(?:item|splitsel)" data-x="(\d+)"[^>]*>[^]*?<\/button>(?:<button class="cix[^]*?<\/button>(?:<div class="cisub[^]*?<\/div><\/div>|<div class="cisub[^"]*">[^<]*<\/div>)*)?/g;
 const blocks=[];let m,first=-1,last=-1;while((m=re.exec(h))){if(first<0)first=m.index;last=m.index+m[0].length;blocks.push(m[0])}
 if(blocks.length>1)h=h.slice(0,first)+blocks.reverse().join('')+h.slice(last);return h};

/* ── Split by items ── */
const selTot=()=>{const c=C(),s=UI.split.sel;return c.items.reduce((a,it,i)=>a+(s[i]?lineTot(it):0),0)*(1-(c.orderDisc||0)/100)};
const selCnt=()=>{const c=C(),s=UI.split.sel;return c.items.reduce((a,it,i)=>a+(s[i]?Math.abs(it.qty):0),0)};
FN.splititems.off=()=>!C().items.length||!!C().ret;
FN.splititems.run=function(){if(!C().items.length)return;UI.pop=null;const go=()=>{C().orderDisc=0;UI.split={sel:{}};save();emit('split:start');render()};
 if(C().orderDisc)return vConfirm({p:'The basket discount will be removed. You will be able to add basket discount for selected items later'},go);go()};
A.splitsel=i=>{const s=UI.split.sel;s[i]=!s[i];render();emit('split:sel')};
A.splitexit=()=>{UI.split=null;render();emit('split:exit')};
const _rps=rightPanel;rightPanel=function(){let h=_rps();if(!UI.split||UI.modal&&0)return h;const n=Object.values(UI.split.sel).filter(Boolean).length;
 h=h.replace(/data-a="item" data-x="(\d+)"/g,(m,i)=>`data-a="splitsel" data-x="${i}"`).replace(/<button class="ci ([^"]*)" data-a="splitsel" data-x="(\d+)"([^>]*)>/g,(m,cls,i,rest)=>`<button class="ci ${cls.replace(/\bsel\b/,'')} ${UI.split.sel[i]?'spon':''}" data-a="splitsel" data-x="${i}"${rest} style="position:relative;overflow:visible"><span class="sprad ${UI.split.sel[i]?'on':''}"></span>`);
 h=h.replace(/(<div class="cart-l" id="cartl")/,'$1 data-split="1"').replace(/(<div class="cart-l" id="cartl"[^>]*>)/,'$1<div class="spwrap">').replace('</div><div class="foot"','</div></div><div class="foot"');
 h=h.replace(/<div class="tot" style="top:(\d+)px"><b>Total[^]*?<\/span><\/div>/,(m,t)=>`<div class="tot" style="top:${t}px"><b>To pay now${n?` <small>(${selCnt()} Article${selCnt()>1?'s':''})</small>`:''}:</b><span class="v">${kr(n?selTot():0)}</span></div>`);
 h=h.replace(/<button class="bb a [^"]*"([^>]*)data-a="[^"]*"([^>]*)data-g="allpay">[^<]*<\/button>/,(m,a1,a2)=>`<button class="bb a ${n?'on':''}"${a1}data-a="${n?'allpay':'nop'}"${a2}data-g="allpay">${n?'Charge':'Go to summary'}</button>`);
 /* header: blue SPLIT BY ITEMS bar replaces bin/park */
 h=h.replace(/(<div class="pnl rp[^"]*"[^>]*>)/,`$1<div class="sphead">SPLIT BY ITEMS<button class="u" data-a="splitexit" data-g="split-exit" title="Undo">↺</button><button class="m" data-a="more" data-g="more">${IC.dots} More</button></div>`);
 return h};
/* paying the selected lines: pay them as their own order, keep the rest */
let rest=null;
const _pay=pay;pay=function(mid,...a){if(UI.split&&!C().ret){const c=C(),s=UI.split.sel;if(Object.values(s).some(Boolean)){rest=c.items.filter((_,i)=>!s[i]);c.items=c.items.filter((_,i)=>s[i]);UI.split.sel={}}}return _pay(mid,...a)};
on((e)=>{if(e==='paid'&&rest){if(rest.length){S.cart.items=rest;UI.split={sel:{}};save()}else UI.split=null;rest=null}if(e==='bin'||e==='park')UI.split=null});

/* ── Split by amount ── */
FN.splitamount.off=()=>!C().items.length||!!C().ret;
const left=()=>Math.max(0,Math.round(cartTot()*100)/100);
FN.splitamount.run=function(){if(!C().items.length)return;UI.pop=null;UI.f.sa='';openModal('splitamt',{});render()};
PAGES.splitamt=()=>{const max=left(),v=UI.f.sa||'';
 return {white:true,title:'Split by amount',bodyCss:'padding:16px 0 90px',body:`<div class="spamt"><button class="max" data-a="samax" data-g="sa-max">Max<small>${kr(max)}</small></button>
  <div class="dval" style="margin:16px 0 4px">${v?esc(v):`<i>${n2(max)}</i>`}<b></b> kr</div><div style="width:200px;margin:0 auto">${pad('sakey',',')}</div></div>`,
  foot:`<button class="btnb" style="min-width:308px" data-a="sago" data-g="sa-charge">Charge</button>`}};
A.samax=()=>{UI.f.sa=n2(left());render()};
A.sakey=k=>{let v=UI.f.sa||'';if(k==='⌫')v=v.slice(0,-1);else if(k===','){if(!v.includes(','))v=(v||'0')+','}else if(v.length<8)v+=k;UI.f.sa=v;render()};
A.sago=()=>{const max=left();let v=parseFloat((UI.f.sa||'').replace(/\s/g,'').replace(',','.'));if(!v)v=max;v=Math.min(v,max);UI.f.saAmt=Math.round(v*100)/100;UI.modal={stack:[{p:'selpay',d:{amt:UI.f.saAmt}}],white:true};render();emit('open:selpay');emit('split:amount')};
PAGES.selpay=d=>({white:true,title:'Select payment method',bodyCss:'padding:16px 18px 90px',body:`<div style="text-align:center;font-size:12.5px;color:#6b6b70">To Charge<div style="font-size:17px;font-weight:700;color:#1c1c1e">${kr(d.amt)}</div></div>
 <div class="selpay">${S.payments.map(p=>`<button class="${p.enabled===false?'off':''}" data-a="${p.enabled===false?'nop':'sapay'}" data-x="${p.id}" data-g="sp-${p.id}">${PMI(p.id)}<span>${esc(p.id==='gift'?'Yabie gift card':p.name)}</span></button>`).join('')}</div>`});
let partAmt=null;
A.sapay=id=>{partAmt=UI.f.saAmt;closeModal();if(partAmt>=left()-0.005){partAmt=null}pay(id)};
const _fin=finalize;finalize=function(mid,extra={}){const c=C();
 if(partAmt!=null&&!c.ret){const m=S.payments.find(p=>p.id===mid);c.parts=(c.parts||[]).concat([{amt:partAmt,method:m?m.name:mid}]);const amt=partAmt;partAmt=null;save();
  UI.modal={stack:[{p:'partpaid',d:{amt,method:m?m.name:mid,left:left()}}],white:true};emit('split:part',amt);if(mid==='cash')setTimeout(()=>toast('Kassalådan öppnas'),300);render();return}
 const parts=c.parts||[];const r=_fin(mid,extra);
 if(parts.length){const o=S.orders[0];const ps=parts.reduce((a,p)=>a+p.amt,0);o.total+=ps;o.history[0].paid+=ps;o.history[0].method=parts.map(p=>p.method).concat(o.history[0].method).join(' + ');save()}
 return r};
const _ct=cartTot;cartTot=function(c=C()){return _ct(c)-((c.parts||[]).reduce((a,p)=>a+p.amt,0))};
PAGES.partpaid=d=>({white:true,noClose:true,lock:true,title:'Checkout Summary',body:`<div style="text-align:center;margin-top:40px"><div style="font-size:22px;font-weight:700">${kr(d.amt)}</div><div style="color:#6b6b70;font-size:12.5px;margin-top:4px">betalt med ${esc(d.method)}</div>
 <div style="margin:26px auto 0;max-width:300px;background:#f2f2f6;border-radius:8px;padding:12px 14px;display:flex;justify-content:space-between;font-size:14px"><span>Kvar att betala</span><b>${kr(d.left)}</b></div></div>`,
 foot:`<button class="btnb" style="min-width:308px" data-a="partnext" data-g="part-next">Nästa betalning</button>`});
A.partnext=()=>{closeModal();render();emit('split:next')};
const _rpp=rightPanel;rightPanel=function(){let h=_rpp();const c=C();if(!(c.parts||[]).length)return h;
 const rows=c.parts.map(p=>`<div class="partrow"><span>Betalt · ${esc(p.method)}</span><span>-${n2(p.amt)}</span></div>`).join('');
 return h.replace(/(<div class="cart-l" id="cartl"[^>]*>)/,'$1'+rows).replace(/<b>Total( <small>[^<]*<\/small>)?:<\/b>/,'<b>Left to pay:</b>')};

/* ── PLU: type the code on the numpad and press PLU ── */
const PLU={'Bryggkaffe':'101','Cappuccino':'102','Caffè latte':'103','Espresso':'104','Flat white':'105','Cortado':'106','Iskaffe':'107','Chai latte':'201','Varm choklad':'202','Te':'203',
 'Kanelbulle':'301','Kardemummabulle':'302','Croissant':'303','Chokladboll':'304','Morotskaka':'305','Räksmörgås':'401','Ost & skinka':'402','Halloumi wrap':'403','Mineralvatten':'501','Apelsinjuice':'502','Lemonad':'503'};
S.products.forEach(p=>{if(p.plu==null&&PLU[p.name])p.plu=PLU[p.name]});
FN.plu.off=()=>!UI.num;
FN.plu.run=function(){const code=UI.num;if(!code)return;UI.pop=null;const p=S.products.find(x=>String(x.plu||'')===code);UI.num='';
 if(!p){render();toast('Sorry, there is no item with that PLU code');emit('plu:miss');return}addProduct(p.id);emit('plu',p.name)};
window.pluOf=n=>{const p=S.products.find(x=>x.name===n);return p&&p.plu};

/* ── numpad entry bar (shows what you typed, with a clear button) ── */
A.numclear=()=>{UI.num='';render()};
const _rpn=rightPanel;rightPanel=function(){let h=_rpn();if(!UI.num||UI.pop||C().ret||!/class="key"/.test(h))return h;
 h=h.replace(/<small style="color:var\(--blue\);font-weight:600;margin-right:8px">[^<]*<\/small>/,'');
 h=h.replace(/<div class="tot" style="top:(\d+)px">/,(m,t)=>`<div class="numbar" style="top:${+t+2}px">${esc(UI.num)}<button data-a="numclear" data-g="num-clear">✕</button></div><div class="tot" style="top:${+t-30}px">`);
 h=h.replace(/<div class="bdisc" style="top:(\d+)px">/,(m,t)=>`<div class="bdisc" style="top:${+t-30}px">`).replace(/id="cartl" style="bottom:(\d+)px"/,(m,b)=>`id="cartl" style="bottom:${+b+32}px"`);
 return h};

/* ── Scan ── */
FN.scan.run=function(){UI.pop=null;openModal('scan',{});render()};
PAGES.scan=()=>({white:true,title:'<span style="font-size:11px;font-weight:500">Align the red line with the barcode or QR code.</span>',bodyCss:'padding:0',body:`<div style="text-align:center;margin-top:62px"><button style="color:var(--blue)" data-a="scanset">Open Yabie Settings</button></div>
 <div class="scanbox" style="margin-top:250px"><svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="#3478f6" stroke-width="2"><path d="M8 22l24-12 24 12v28L32 60 8 50z"/><path d="M8 22l24 12 24-12M32 34v26"/><rect x="20" y="36" width="24" height="14" rx="2" fill="#fff"/><path d="M24 39v8M27 39v8M30 39v8M33 39v8M36 39v8M39 39v8"/></svg>Scanned items will appear here.</div>`});
A.scanset=()=>toast('Ge Yabie tillgång till kameran i Inställningar.');

/* ── Open return asks for a PIN first ── */
const _or=FN.openreturn.run;FN.openreturn.run=function(){if(C().items.length)return _or.call(this);UI.pop=null;UI.f.pin='';openModal('pin',{next:'goto',to:'openret'});render()};

/* ── Functions disabled with an empty basket ── */
FN.discount.off=()=>!C().items.length;

/* ── Payment methods: four fixed slots; a button is one or two rows high ── */
S.payLayout=S.payLayout||{};if(!S.payLayout.size){S.payLayout.size={card:2,swish:2};save()}
const sz=id=>(S.payLayout.size||{})[id]||1;
function placeN(ids,numpad,sizeOf){let r=0,out=[];for(const id of ids){const s=Math.min(2,sizeOf(id));if(numpad){if(r+s>4)break;out.push({id,x:139,y:r*44.7,w:134,h:s*44.7-5.7,s});r+=s}else{const cells=s===2?2:1;if(r+cells>4)break;if(cells===2&&r%2)r++;if(r+cells>4)break;out.push({id,x:(r%2)*139,y:Math.floor(r/2)*44,w:cells===2?273:134,h:39,s});r+=cells}}return {out,used:r}}
const _rpq=rightPanel;rightPanel=function(){let h=_rpq();const L=S.payLayout;if(UI.pop||C().ret||!/class="bb f"/.test(h))return h;
 const has=C().items.length>0;const {out}=placeN(L.quick||[],L.numpad,sz);
 h=h.replace(/<button class="pay [^"]*"[^>]*>[^]*?<\/button>/g,'');
 const btns=out.map(o=>{const p=S.payments.find(x=>x.id===o.id);if(!p)return '';const horiz=!L.numpad||o.s===1;return `<button class="pay ${has?'on':''} ${horiz?'h':''}" style="left:${8+o.x}px;top:${(L.numpad?550:640)+o.y}px;width:${o.w}px;height:${o.h}px" data-a="${has?'pay':'nop'}" data-x="${p.id}" data-g="pay-${p.id}">${PMI(p.id)}<span>${esc(qName(p))}</span></button>`}).join('');
 return h.replace(/(<button class="bb f")/,btns+'$1')};
PAGES.paymethods=(orig=>()=>{const r=orig();const L=UI.f.pl;if(!L)return r;L.size=L.size||{...(S.payLayout.size||{})};const show=L.numpad;
 const {out,used}=placeN(L.quick,show,id=>L.size[id]||1);
 const keys=show?['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k,i)=>k?`<span class="key" style="left:${44.5*(i%3)}px;top:${44.5*Math.floor(i/3)}px">${k==='⌫'?IC.bksp:k}</span>`:'').join(''):'';
 const tiles=out.map(o=>{const p=S.payments.find(x=>x.id===o.id);const nm=p.id==='gift'?'Yabie gift card':qName(p);return `<div class="pvq ${!show||o.s===1?'h':''}" style="left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px">${PMI(o.id)}<span>${esc(nm)}</span><button class="rmv" data-a="plrm" data-x="${o.id}" data-g="pl-rm-${o.id}"></button><button class="rsz" data-a="plsize" data-x="${o.id}" title="Resize">⤡</button></div>`}).join('');
 let adds='';if(show){for(let r=used;r<4;r++)adds+=`<button class="pvadd" style="left:139px;top:${r*44.7}px;width:134px;height:39px" data-a="pladd" ${r===used?'data-g="pl-add"':''}>+</button>`}
 else{for(let r=used;r<4;r++)adds+=`<button class="pvadd" style="left:${(r%2)*139}px;top:${Math.floor(r/2)*44}px;width:134px;height:39px" data-a="pladd" ${r===used?'data-g="pl-add"':''}>+</button>`}
 r.body=r.body.replace(/<div style="position:relative;width:\d+px;height:173px;margin:36px auto 0">[^]*?<\/div>\s*<p/,`<div style="position:relative;width:273px;height:${show?173:84}px;margin:36px auto 0">${keys}${tiles}${adds}</div>\n  <p`);return r})(PAGES.paymethods);
A.plsize=id=>{const L=UI.f.pl;L.size=L.size||{};L.size[id]=(L.size[id]||1)===1?2:1;const t=placeN(L.quick,L.numpad,x=>L.size[x]||1);if(!t.out.some(o=>o.id===id))L.size[id]=1;render()};
const _plpick=A.plpick2;A.plpick2=function(){const L=UI.f.pl;const t=placeN(L.quick,L.numpad,x=>(L.size||{})[x]||1);if(t.used>=4){toast('Det finns inte plats för fler knappar.');return}return _plpick.apply(this,arguments)};
/* numpad hidden: Total sits low, quick buttons are small one-row buttons (2×2) just above FUNCTIONS / ALL PAYMENTS;
   with no quick buttons Total sits right above the bottom buttons */
const _rph=rightPanel;rightPanel=function(){let h=_rph();const L=S.payLayout||{};if(L.numpad||UI.pop||C().ret)return h;
 const used=placeN(L.quick||[],false,sz).out.length;const nt=used?594:660;if(!used)h=h.replace(/(<button class="bb [^"]*" style="left:\d+px;)top:730px;/g,'$1top:712px;height:46px;font-size:12.5px;');const m=h.match(/<div class="foot" style="top:(\d+)px/);if(!m)return h;const d=nt-+m[1];if(!d)return h;
 return h.replace(/(<div class="foot" style="top:)(\d+)/,(x,a,t)=>a+(+t+d)).replace(/(<div class="tot" style="top:)(\d+)/,(x,a,t)=>a+(+t+d)).replace(/(<div class="bdisc" style="top:)(\d+)/,(x,a,t)=>a+(+t+d)).replace(/(id="cartl" style="bottom:)(\d+)/,(x,a,b)=>a+(+b-d))};
const _plsave=A.plsave;A.plsave=function(){const sizes=UI.f.pl&&UI.f.pl.size;const r=_plsave.apply(this,arguments);if(sizes){S.payLayout.size={...sizes};save();render()}return r};
/* Add payment method page: plain bold rows, selected row grey */
const _pla=PAGES.pladdpage;PAGES.pladdpage=d=>{const r=_pla(d);r.body=r.body.replace(/<div class="pmrow ([^"]*)"([^>]*)>(<svg[^]*?<\/svg>)/g,'<div class="pmrow $1"$2>');r.bodyCss='padding:18px 30px 90px;background:#ececee';return r};
const st2=document.createElement('style');st2.textContent='#pos .pmrow{font-weight:700}#pos .pmrow.on{background:#e9e9ec}';document.head.appendChild(st2);
})();
/* ── Park opens the parked overview with "Park current basket" (name or current time) ── */
(()=>{const _park=A.park;
A.park=function(){if(!C().items.length)return;UI.tables={tab:'all',parking:true};UI.f.parkname='';UI.more=false;emit('open:park');render()};
A.parknow=function(){const n=(UI.f.parkname||'').trim();if(n)C().name=n;UI.tables=null;_park();emit('parked')};
const _th=tablesHtml;tablesHtml=function(){let h=_th();const t=UI.tables;if(!t||!t.parking||!C().items.length)return h;
 const row=`<div style="padding:8px 8px 4px"><div style="font-size:10px;font-weight:600;color:#6b6b70;letter-spacing:.03em;margin-bottom:4px">PARK CURRENT BASKET</div><div style="display:flex;align-items:center;width:420px;height:30px;border:1px solid #d1d1d6;border-radius:6px;background:#fff;padding:0 2px 0 8px"><input data-in="parkname" data-g="in-parkname" placeholder="Save as current time or type name" value="${esc(UI.f.parkname||'')}" style="flex:1;border:0;outline:0;font:inherit;font-size:12.5px;background:none"><button class="btnb" style="min-width:62px;height:26px;font-size:12.5px" data-a="parknow" data-g="park-now">Park</button></div></div>`;
 return h.replace(/(<div style="position:absolute;left:0;right:0;top:44px;bottom:0;overflow:auto">)/,'$1'+(t.tab==='all'?row:''))};
/* tapping a free table while parking puts the basket there */
const _tt=A.tbltap;A.tbltap=function(id){const r=_tt.apply(this,arguments);return r};
const _tc=A.tclose;A.tclose=function(){return _tc.apply(this,arguments)};})();
