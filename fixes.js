/* Fixes from the button-by-button walkthrough of the real register (Oct 2026). */
(()=>{
const st=document.createElement('style');st.textContent=`
#pos .ci{position:relative}
#pos .ci .pbadge{position:absolute;right:8px;top:7px;width:18px;height:18px;border-radius:4px;background:#e5484d;color:#fff;font-size:11px;font-weight:700;display:grid;place-items:center}
#pos .ci .r s{opacity:.55;margin-right:6px;font-weight:400}
#pos .ci.hasx{margin-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius:0}
#pos .cix{display:block;width:100%;height:13px;background:#e3e3e8;color:var(--blue)!important;border-radius:0 0 6px 6px;margin-bottom:4px;line-height:0}
#pos .cix svg{width:11px;height:11px;transform:rotate(90deg)}
#pos .cix.sel{background:#7ea9f8;color:#fff!important}
#pos .cisub{margin:0 0 4px 14px;background:#efeff4;border-radius:4px;padding:6px 9px;font-size:12px;color:#1c1c1e}
#pos .cisub.i{font-style:italic}#pos .cisub .w{color:#e5484d;margin-right:4px;font-style:normal}
#pos .bdisc{position:absolute;left:8px;right:8px;display:flex;justify-content:space-between;font-size:12.5px;color:#1c1c1e}#pos .bdisc span:last-child{color:#e5484d}`;document.head.appendChild(st);

/* cart lines like the real app: % badge, struck original price, chevron and grey sub-rows for note / modifiers / allergy */
const _rp=rightPanel;rightPanel=function(){let h=_rp();const c=C();
 h=h.replace(/<button class="ci ([^"]*)" data-a="item" data-x="(\d+)"([^>]*)>[^]*?<\/button>/g,(m,cls,i,rest)=>{const it=c.items[+i];if(!it)return m;
  const full=it.price*it.qty,now=lineTot(it),neg=it.qty<0;
  const subs=[];if(it.mods&&it.mods.length)subs.push(`<div class="cisub">${esc(it.mods.join(', '))}</div>`);
  if(it.note)subs.push(`<div class="cisub i">${esc(it.note)}</div>`);
  if(it.allergy&&it.allergy.length)subs.push(`<div class="cisub"><span class="w">▲</span>${esc(it.allergy.join(', '))}</div>`);
  const sel=/\bsel\b/.test(cls);
  return `<button class="ci ${cls} ${subs.length?'hasx':''}" data-a="item" data-x="${i}"${rest}><b>${esc(it.name)}</b>${it.disc?'<span class="pbadge">%</span>':''}<div class="r"><span>${Math.abs(it.qty)} Article${Math.abs(it.qty)>1?'s':''}</span><span>${it.disc?`<s>${n2(full)}</s>`:''}<b style="display:inline;font-size:inherit">${n2(now)}</b></span></div></button>${subs.length?`<button class="cix ${sel?'sel':''}" data-a="item" data-x="${i}">${IC.chev}</button>${subs.join('')}`:''}`});
 /* basket discount shown above the total, not as a cart row */
 h=h.replace(/<div class="ord" style="color:var\(--blue\)"><span>Orderrabatt<\/span><span>[^<]*<\/span><\/div>/,'');
 if(c.orderDisc&&c.items.length&&!c.ret){const base=c.items.reduce((a,it)=>a+lineTot(it),0)-promoCalc(c).disc;const amt=base*c.orderDisc/100;
  h=h.replace(/<div class="tot" style="top:(\d+)px">/,(m,t)=>`<div class="bdisc" style="top:${+t-18}px"><span>Basket Discount (${+c.orderDisc.toFixed(2)}%)</span><span>-${n2(amt)} kr</span></div>`+m)}
 return h};

/* discount buttons apply straight away (real app); amount mode shows 0,00 kr and a comma key */
A.dbtn=id=>{const x=S.discounts.find(z=>z.id===id);if(!x)return;UI.f.dbtn=id;UI.f.dmode=x.kr?'amt':'pct';UI.f.dval=String(x.kr||x.pct);UI.f.ddesc=x.name;A.dadd()};
const _disc=PAGES.discount;PAGES.discount=d=>{const r=_disc(d);if((UI.f.dmode||'pct')==='amt'){
  r.body=r.body.replace('<i>0</i><b></b> kr','<i>0</i><b></b><i>,00</i> kr').replace(/<span><\/span>(<button data-a="dkey" data-x="0")/,'<button data-a="dkey" data-x="," data-g="np-comma">,</button>$1')}
 /* item page: show the discount under the price */
 return r};
const _dk=A.dkey;A.dkey=k=>{if(k===','&&(UI.f.dval||'').includes(','))return;if(k===','&&!UI.f.dval)UI.f.dval='0';_dk(k)};
const _dc=A.dadd;A.dadd=function(){if(UI.f.dval)UI.f.dval=UI.f.dval.replace(',','.');return _dc.apply(this,arguments)};

/* item detail: "Discount: -9,00 kr" under the price */
const _it=PAGES.item;if(_it)PAGES.item=d=>{const r=_it(d);const it=C().items[d.i];if(it&&it.disc){const amt=it.price*it.qty*it.disc/100;
 r.body=r.body.replace(/(<div style="font-size:19px;font-weight:700">[^<]*<\/div>)/,`$1<div style="font-size:11px;color:#6b6b70;margin-top:6px">Discount:&nbsp; <span style="color:#e5484d">-${n2(amt)} kr</span></div>`)}return r};

/* no quick-pay buttons → the pay button is called CHARGE */
const _rp2=rightPanel;rightPanel=function(){let h=_rp2();const L=S.payLayout||{};if(!(L.quick||[]).length&&!C().ret)h=h.replace(/(data-g="allpay">)All payments/,'$1Charge');return h};
/* Print bill is only active for a table order (grey in the real app otherwise) */
if(FN.printbill)FN.printbill.off=()=>!C().items.length||!C().table;
const _num=A.num;A.num=function(k){const r=_num.apply(this,arguments);emit('num',k);return r};
})();
(()=>{const st=document.createElement('style');st.textContent='#pos [data-g="modal-price"] .npad{width:fit-content;margin-left:auto;margin-right:auto;padding:4px}';document.head.appendChild(st)})();
/* long press on a product tile opens the product page (Edit, Note, Allergy request, Quantity, Add to Basket) */
(()=>{let lp=null,fired=false;const pos=document.getElementById('pos');
 pos.addEventListener('pointerdown',e=>{const t=e.target.closest('.tile[data-a="tap"]');if(!t||UI.edit)return;fired=false;clearTimeout(lp);
  lp=setTimeout(()=>{fired=true;const pid=t.dataset.x;if(!P(pid))return;UI.f={mods:{}};openModal('mods',{pid});render();emit('longpress',pid)},550)});
 const cancel=()=>clearTimeout(lp);['pointerup','pointerleave','pointercancel'].forEach(ev=>pos.addEventListener(ev,cancel));
 pos.addEventListener('pointermove',e=>{if(e.buttons===0)return;if(Math.abs(e.movementX)+Math.abs(e.movementY)>6)cancel()});
 pos.addEventListener('click',e=>{if(fired&&e.target.closest('.tile')){fired=false;e.stopPropagation();e.preventDefault()}},true);
 pos.addEventListener('contextmenu',e=>{if(e.target.closest('.tile[data-a="tap"]'))e.preventDefault()});
 const st=document.createElement('style');st.textContent='#pos .tile{-webkit-touch-callout:none;user-select:none}';document.head.appendChild(st)})();
/* product page "Edit" opens the product form */
(()=>{const _m=PAGES.mods;PAGES.mods=d=>{const r=_m(d);if(r.left)r.left=r.left.replace('data-a="nop"',`data-a="go" data-x="prodform" data-y="${d.pid}" data-g="mods-edit"`);return r}})();
/* provider renamed: Swedbank Pay → Swedbank Pax (migrate saved demo state) */
(()=>{let ch=false;(S.terminals||[]).forEach(t=>{if(t.prov==='Swedbank Pay'){t.prov='Swedbank Pax';ch=true}if(t.name==='Swedbank Pay'){t.name='Swedbank Pax';ch=true}});(S.payments||[]).forEach(p=>{if(p.name==='Swedbank Pay'){p.name='Swedbank Pax';ch=true}});if(ch){save();render()}})();
/* default layout: numpad hidden and no quick-pay buttons (one-time migration of saved demo state) */
(()=>{if(!S.defLayout2){S.defLayout2=true;S.payLayout={...(S.payLayout||{}),numpad:false,quick:[]};S.payments.forEach(p=>p.quick=false);save();render()}})();
/* quick-pay buttons start as one slot (the real app adds them small; resize with the arrows) */
(()=>{if(!S.defLayout3){S.defLayout3=true;S.payLayout.size={};save();render()}})();
