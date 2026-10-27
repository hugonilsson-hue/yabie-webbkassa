/* Web POS core: state, main register view, cart, functions, payments and the modal system. */
const KEY='yabie-webbkassa-v1';
let S=load()||seed();
const UI={tab:null,sel:null,num:'',pop:null,more:false,modal:null,edit:null,toast:null,busy:null,f:{}};
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));return s&&s.v===1?s:null}catch(e){return null}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function resetAll(){S=seed();Object.assign(UI,{tab:null,sel:null,num:'',pop:null,more:false,modal:null,edit:null,busy:null,f:{}});save();render()}
const LIS=[];function on(f){LIS.push(f)}function emit(ev,d){LIS.forEach(f=>{try{f(ev,d)}catch(e){console.error(e)}})}
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const kr=n=>(Math.round(n*100)/100).toLocaleString('sv-SE',{minimumFractionDigits:2,maximumFractionDigits:2})+' kr';
const n2=n=>(Math.round(n*100)/100).toLocaleString('sv-SE',{minimumFractionDigits:2,maximumFractionDigits:2});
const slug=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const P=id=>S.products.find(p=>p.id===id), G=id=>S.groups.find(g=>g.id===id);
const now=()=>{const d=new Date(),z=x=>String(x).padStart(2,'0');return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}, ${z(d.getHours())}:${z(d.getMinutes())}`};
function toast(t){UI.toast=t;render();clearTimeout(toast.h);toast.h=setTimeout(()=>{UI.toast=null;render()},2300)}
const NOTDEMO='Finns i kassan, men ingår inte i demon.';

/* ── icons ── */
const I=(d,f)=>`<svg viewBox="0 0 24 24" fill="${f?'currentColor':'none'}" stroke="${f?'none':'currentColor'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const IC={
 store:I('<path d="M3 9l1.5-5h15L21 9M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9zM5 13v7h14v-7"/>'),
 bell:I('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2zM10 20a2 2 0 0 0 4 0"/>',1),
 pot:I('<path d="M3 11h18v3a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-3zM8 4c0 2 2 2 2 4M13 4c0 2 2 2 2 4"/>',1),
 pen:I('<path d="M4 20l4-1 11-11-3-3L5 16l-1 4zM14 6l3 3"/>'),
 search:I('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),
 trash:I('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>'),
 basket:I('<path d="M3 10h18l-2 10H5L3 10zM8 10l4-6 4 6"/>'),
 dots:I('<circle cx="12" cy="12" r="9"/><path d="M8 12h.01M12 12h.01M16 12h.01" stroke-width="2.6"/>'),
 bag:I('<path d="M5 8h14l1 13H4L5 8zM9 8V6a3 3 0 0 1 6 0v2"/><path d="M10 13v4M14 13v4" stroke="#fff"/>',1),
 bagline:I('<path d="M5 8h14l1 13H4L5 8zM9 8V6a3 3 0 0 1 6 0v2"/>'),
 card:I('<rect x="6" y="2.5" width="12" height="19" rx="2"/><rect x="8.5" y="5" width="7" height="5" rx="1"/><path d="M9 13h.01M12 13h.01M15 13h.01M9 16h.01M12 16h.01M15 16h.01M9 19h6" stroke-width="2"/>'),
 swish:I('<path d="M7 7c3-3 8-2 9 1M17 17c-3 3-8 2-9-1M7.5 9.5C5 12 7 16 10 15.5M16.5 14.5c2.5-2.5.5-6.5-2.5-6" stroke-width="2.2"/>'),
 cash:I('<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9v.01M18 15v.01"/>'),
 gift:I('<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-4-6-1s6 1 6 1zm0 0c2-4 6-4 6-1s-6 1-6 1z"/>'),
 invoice:I('<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7"/>'),
 back:I('<path d="M15 5l-7 7 7 7" stroke-width="2.2"/>'),
 x:I('<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>'),
 chev:I('<path d="M9 5l7 7-7 7" stroke-width="2.2"/>'),
 check:I('<path d="M5 12.5l4.5 4.5L19 7.5" stroke-width="3"/>'),
 bksp:I('<path d="M8 5h12v14H8l-6-7 6-7zM12 9l5 6M17 9l-5 6"/>'),
 pct:I('<circle cx="12" cy="12" r="10"/><path d="M8.5 15.5l7-7M9 9h.01M15 15h.01" stroke="#fff" stroke-width="2.6"/>',1),
 split:I('<path d="M4 6h2M4 12h2M4 18h2M9 6h11M9 12h11M9 18h11" stroke-width="2.2"/><path d="M3.5 5.5l1 1 2-2M3.5 11.5l1 1 2-2" stroke-width="1.6"/>'),
 ret:I('<path d="M9 14l-5-5 5-5M4 9h10a6 6 0 0 1 0 12h-3" stroke-width="2.4"/>'),
 splitamt:I('<path d="M5 3h14v18H5zM8 17L16 7M8 8h.01M16 16h.01" stroke-width="2"/>'),
 ticket:I('<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>'),
 plu:I('<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5M8 11h6" />'),
 bill:I('<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h4"/>'),
 scan:I('<path d="M4 8V5h3M17 5h3v3M20 16v3h-3M7 19H4v-3M7 9v6M10 9v6M13 9v6M16 9v6" stroke-width="2"/>'),
 notes:I('<path d="M5 4h11l3 3v13H5zM8 9h8M8 13h8M8 17h5"/>'),
 warn:I('<path d="M12 3l10 18H2zM12 10v5M12 18h.01"/>'),
 user:I('<circle cx="10" cy="8" r="4"/><path d="M3 21c0-4 3-7 7-7s7 3 7 7M19 10v6M16 13h6"/>'),
 users:I('<circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c0-4 3-6 7-6s7 2 7 6M16 14c3 0 6 2 6 5"/>'),
 cloche:I('<path d="M3 17h18M5 17a7 7 0 0 1 14 0M12 8V6M10 6h4"/>'),
 lock:I('<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'),
 report:I('<path d="M6 3h9l4 4v14H6zM9 17l2-3 2 2 3-5"/>'),
 chart:I('<path d="M4 20h16M7 16v-4M11 16V8M15 16v-6M19 16V5"/>'),
 receipt:I('<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 7h6M9 10h6M9 13h6M9 16h4"/>'),
 help:I('<circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 1-1 1.7M12 17h.01" stroke="#3b82f6" stroke-width="2.4"/>',1),
 book:I('<path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1zM12 6v14"/>'),
 clock:I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
 tip:I('<path d="M7 21V11h4l3-6a2 2 0 0 1 3 2l-1 4h4l-2 10z"/>'),
 grid:I('<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/>'),
 pay:I('<path d="M4 4h10l6 6-8 10-8-8z"/><circle cx="9" cy="9" r="1.5"/>'),
 fn:I('<path d="M4 6h16M4 12h16M4 18h16M7 4v4M15 10v4M10 16v4"/>'),
 tag:I('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>'),
 cog:I('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'),
 term:I('<rect x="6" y="2.5" width="12" height="19" rx="2"/><path d="M9 6h6v4H9zM9 14h.01M12 14h.01M15 14h.01M9 17h.01M12 17h.01M15 17h.01" stroke-width="2"/>'),
 printer:I('<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>'),
 display:I('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M9 20h6M12 16v4"/>'),
 info:I('<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01" stroke="#fff" stroke-width="2.4"/>',1),
 qr:I('<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>'),
 save:I('<path d="M12 3v11M7 9l5 5 5-5M4 15v5h16v-5"/>'),
 copy:I('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>'),
 cam:I('<path d="M4 8h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="13" r="3.5"/>'),
 img:I('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 17l-5-5-9 8"/>'),
 shapes:I('<path d="M12 3l4 7H8z"/><rect x="4" y="13" width="7" height="7" rx="1"/><circle cx="16.5" cy="16.5" r="3.5"/>',1),
 groups:I('<rect x="3" y="3" width="11" height="11" rx="2"/><rect x="7" y="7" width="11" height="11" rx="2" fill="#3b82f6" stroke="#fff"/><rect x="10" y="10" width="11" height="11" rx="2"/>',1),
 folder:I('<path d="M3 6h7l2 2h9v11H3z"/>',1),
 tools:I('<path d="M14 6l4-4 4 4-4 4M17 5L5 17l-2 4 4-2L19 7M7 3l4 4-3 3-4-4"/>'),
 plus:I('<path d="M12 5v14M5 12h14" stroke-width="2"/>'),
 minus:I('<path d="M5 12h14" stroke-width="2"/>'),
 refresh:I('<path d="M20 11a8 8 0 0 0-14-5l-2 2M4 4v4h4M4 13a8 8 0 0 0 14 5l2-2M20 20v-4h-4"/>'),
 mail:I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
 phone:I('<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18h2"/>'),
 drawer:I('<path d="M3 10h18v9H3zM6 6h12l3 4H3zM10 14h4"/>'),
};
let itemSub=()=>'';
const PMI=id=>IC[{swcloud:'card',card:'card',swish:'swish',cash:'cash',gift:'gift',invoice:'invoice'}[id]]||IC.pay;

/* ── cart math ── */
const C=()=>S.cart;
function vatOf(it){if(it.gift)return 0;const p=P(it.pid),g=p&&G(p.gid);if(!g)return 25;return (it.ta??C().takeaway)&&g.vat===12?6:g.vat}
const lineTot=it=>it.price*it.qty*(1-(it.disc||0)/100);
function cartTot(c=C()){return c.items.reduce((a,it)=>a+lineTot(it),0)*(1-(c.orderDisc||0)/100)}
const cartCount=(c=C())=>c.items.reduce((a,it)=>a+Math.abs(it.qty),0);
function addProduct(pid){
  const p=P(pid);if(!p)return;const q=parseInt(UI.num||'1',10)||1;UI.num='';
  const ex=C().items.find(i=>i.pid===pid&&!i.disc&&!i.note&&!C().ret);
  if(ex)ex.qty+=q;else C().items.push({pid,name:p.name,price:p.price,qty:q,disc:0,note:''});
  UI.sel=C().items.indexOf(ex||C().items[C().items.length-1]);
  save();emit('add',{pid,name:p.name});render();
}

/* ── layout helpers ── */
function tabs(){
  const t=[];S.startPages.forEach(s=>t.push({k:'sp:'+s.id,name:s.name,color:s.color,sp:1}));
  if(S.showGroups||UI.edit)S.groups.forEach(g=>t.push({k:'g:'+g.id,name:g.name,color:g.color}));
  if(!S.showGroups&&!UI.edit)return t;return t;
}
function curTab(){const t=tabs();if(!t.find(x=>x.k===UI.tab))UI.tab=t[0]?.k||null;return UI.tab}
const TX=c=>7+c*104.5, TY=r=>r*93.3;
function tileHtml(tl,pos,editing){
  const x=TX(pos%7),y=TY(Math.floor(pos/7));let inner='',cls='tile',g='',a='';
  if(tl.type==='product'){const p=P(tl.ref);if(!p)return '';inner=`${esc(p.name)}<span class="pr">${p.priceType==='variable'?'> 0 kr':p.unit==='kg'?kr(p.price)+'/kg':kr(p.price)}</span>`;if(p.sellable===false)cls+=' nosell';g='tile-'+slug(p.name);a=`data-a="tap" data-x="${p.id}"`}
  else if(tl.type==='group'){const gg=G(tl.ref);if(!gg)return '';cls+=' grp';inner=esc(gg.name);g='tile-g-'+slug(gg.name);a=`data-a="tab" data-x="g:${gg.id}"`}
  else if(tl.type==='function'){const f=FN[tl.ref];cls+=' ic';inner=`<span style="color:var(--blue);display:grid;gap:5px;justify-items:center">${(IC[f.ic]||'').replace('<svg','<svg style="width:26px;height:26px"')}<b style="font-size:12px">${esc(f.name)}</b>${tl.ref==='takeaway'?`<small style="font-weight:500">${C().takeaway?'Yes':'No'}</small>`:''}</span>`;g='tile-fn-'+tl.ref;a=`data-a="fn" data-x="${tl.ref}"`}
  if(editing)a=`data-a="tileedit" data-x="${pos}"`;
  return `<button class="${cls}" style="left:${x}px;top:${y}px;background:${tl.color||'#eee'}" data-g="${g}" ${a}>${inner}${editing?`<span class="edb">${IC.pen}</span>`:''}</button>`;
}
function gridHtml(){
  const k=curTab();if(!k)return '';
  if(k.startsWith('g:')){const gid=k.slice(2),gg=G(gid);
    return S.products.filter(p=>p.gid===gid).slice(0,49).map((p,i)=>tileHtml({type:'product',ref:p.id,color:gg.color},i,false)).join('');}
  const sp=S.startPages.find(s=>'sp:'+s.id===k);if(!sp)return '';
  let h=sp.tiles.map(t=>tileHtml(t,t.pos,!!UI.edit)).join('');
  if(UI.edit){const used=new Set(sp.tiles.map(t=>t.pos));for(let i=0;i<49;i++)if(!used.has(i))h+=`<button class="tile empty" style="left:${TX(i%7)}px;top:${TY(Math.floor(i/7))}px" data-a="addtile" data-x="${i}" data-g="slot-${i}">+</button>`}
  return h;
}
function leftPanel(){
  const ed=!!UI.edit;
  const bar=ed?`<button class="tb" style="left:7px;width:79px" data-a="nop">${IC.store} My Store</button>
     <div class="edrow"><button class="chk" data-a="togglegroups" data-g="showgroups"><i class="${S.showGroups?'':'off'}">${S.showGroups?IC.check:''}</i>Display Product Groups</button>
     <button class="tb on" style="position:static" data-a="editcancel" data-g="edit-cancel">Cancel</button><button class="tb on" style="position:static;margin-left:-4px" data-a="editsave" data-g="edit-save">${IC.save} Save</button></div>`
   :`<button class="tb" style="left:7px" data-a="mystore" data-g="mystore">${IC.store} My Store<span class="badge">2</span></button>
     <div class="tb oo" style="left:99px" data-g="online"><span class="dot"></span> Online orders <span class="g">${IC.bell}</span>0<span class="sep"></span>${IC.pot}0</div>
     <button class="tb" style="left:606px" data-a="edit" data-g="edit">${IC.pen} Edit</button>
     <button class="tb" style="left:663px" data-a="search" data-g="search">${IC.search} Search</button>`;
  const k=curTab();
  const tb=(ed?`<button class="tab sp add" data-a="addsp" data-g="tab-add">+</button>`:'')+tabs().map(t=>`<button class="tab ${t.sp?'sp':''} ${t.k===k?'sel':''}" style="background:${t.color};position:relative" data-a="tab" data-x="${t.k}" data-g="tab-${slug(t.name)}">${esc(t.name)}${ed&&t.sp?`<span class="edb" style="right:2px;top:1px">${IC.pen}</span>`:''}</button>`).join('');
  return `<div class="pnl lp"><div class="tbar">${bar}</div><div class="tabs" id="tabs">${tb}</div><div class="grid">${gridHtml()}</div></div>`;
}
function rightPanel(){
  const c=C(),has=c.items.length>0,ret=!!c.ret,pop=UI.pop;
  const ed=!!UI.edit;
  const bar=`<button class="tb" style="left:7px;width:31px;justify-content:center;background:none;${has?'color:var(--red)!important':'color:#c4c4c9!important'}" data-a="bin" data-g="bin">${IC.trash}</button>
    ${has?`<button class="tb on" style="left:162px" data-a="park" data-g="park">${IC.basket} Park</button>`:`<button class="tb ${ed?'dis':''}" style="left:149px" data-a="parked" data-g="parked">${IC.basket} Parked</button>`}
    <button class="tb ${ed?'dis':''}" style="left:223px" data-a="more" data-g="more">${IC.dots} More</button>`;
  const head=`<button class="cart-h" data-a="toggleta" data-g="cart-ta">${c.takeaway?IC.bag:IC.bagline} ${c.takeaway?'Take-away':'Eat in'}${c.guests?`<span style="margin-left:10px;color:var(--blue)">${IC.users.replace('<svg','<svg style="width:14px;height:14px;vertical-align:-2px"')} ${c.guests}</span>`:''}${c.customer?`<span style="margin-left:auto;color:var(--blue)">${esc(c.customer)}</span>`:''}</button>`;
  const items=(c.ret||c.oid?`<div class="ord"><span>Order:</span><span>${esc(c.ret||c.oid)}</span></div>`:'')+c.items.map((it,i)=>`<button class="ci ${UI.sel===i&&!ret?'sel':''}" data-a="item" data-x="${i}" data-g="ci-${slug(it.name)}"><b>${esc(it.name)}</b>${it.disc?`<span class="dl">Rabatt ${it.disc} %</span>`:''}${it.note?`<span class="dl">${esc(it.note)}</span>`:''}${itemSub(it)}<div class="r"><span>${Math.abs(it.qty)} Article</span><span>${n2(lineTot(it))}</span></div></button>`).join('')
    +(c.orderDisc?`<div class="ord" style="color:var(--blue)"><span>Orderrabatt</span><span>−${c.orderDisc} %</span></div>`:'')+(c.note?`<div class="ord"><span>Notering</span><span>${esc(c.note)}</span></div>`:'');
  const compact=ret||pop;const totTop=compact?676:504;
  const total=`<div class="tot" style="top:${totTop+14}px"><b>Total${has?` <small>(${cartCount()} Article${cartCount()>1?'s':''})</small>`:''}:</b><span class="v">${UI.num?`<small style="color:var(--blue);font-weight:600;margin-right:8px">${UI.num} ×</small>`:''}${kr(Math.abs(cartTot()))}</span></div>`;
  const qp=S.payments.filter(p=>p.enabled&&p.quick).slice(0,2);
  const keys=compact?'':['1','2','3','4','5','6','7','8','9','00','0','⌫'].map((k,i)=>`<button class="key" style="left:${8+46.5*(i%3)}px;top:${550+44.7*Math.floor(i/3)}px" data-a="num" data-x="${k}" data-g="key-${k==='⌫'?'bs':k}">${k==='⌫'?IC.bksp:k}</button>`).join('')
    +qp.map((p,i)=>`<button class="pay ${has?'on':''}" style="left:147px;top:${550+90*i}px" data-a="${has?'pay':'nop'}" data-x="${p.id}" data-g="pay-${p.id}">${PMI(p.id)}${esc(qName(p))}</button>`).join('');
  const bb=`<button class="bb f" style="left:7px;top:730px;width:134px" data-a="${has&&!ret?'functions':'functions'}" data-g="functions">Functions</button>
    <button class="bb a ${has&&pop!=='fn'?(ret?'ret':'on'):''}" style="left:147px;top:730px;width:134px" data-a="${has?'allpay':'nop'}" data-g="allpay">${ret?'All payments':'All payments'}</button>`;
  let ph='';
  if(pop==='fn'){const list=(S.fnList||[]).filter(f=>f.vis).map(f=>f.k);const rows=Math.max(1,Math.ceil(list.length/3)),top=676-(39+rows*85+6);
    ph=`<div class="dim" style="bottom:${788-top-15}px" data-a="closepop"></div><div class="pop" style="top:${top}px;height:${676-top}px"><h4>Choose Function</h4><button class="x" data-a="closepop" data-g="pop-close">${IC.x}</button>${list.map((k,i)=>{const f=FN[k];const off=f.off&&f.off();return `<button class="ft ${off?'off':''}" style="left:${7+94*(i%3)}px;top:${39+85*Math.floor(i/3)}px" data-a="fn" data-x="${k}" data-g="ft-${k}">${k==='takeaway'&&C().takeaway?'<span class="on"></span>':''}${IC[f.ic]}${esc(f.name)}${f.sub?`<small>${f.sub()}</small>`:''}</button>`}).join('')}</div>`}
  if(pop==='pay'){const list=S.payments.filter(p=>p.enabled);const rows=Math.ceil(list.length/3),top=676-(39+rows*85+6);
    ph=`<div class="dim" style="bottom:${788-top-15}px" data-a="closepop"></div><div class="pop" style="top:${top}px;height:${676-top}px"><h4>Choose Payment Method</h4><button class="x" data-a="closepop">${IC.x}</button>${list.map((p,i)=>`<button class="ft pm ${ret?'r':''}" style="left:${7+94*(i%3)}px;top:${39+85*Math.floor(i/3)}px" data-a="pay" data-x="${p.id}" data-g="pm-${p.id}">${PMI(p.id)}${esc(p.name)}<small>${ret?'−':''}${Math.round(Math.abs(cartTot()))} kr</small></button>`).join('')}</div>`}
  const more=UI.more?`<div class="more" data-g="more-menu">
    <button data-a="m-notes">${IC.notes} Order notes</button><button data-a="m-allergy">${IC.warn} Allergy request</button><hr>
    <button data-a="toggleta" data-g="more-ta">${IC.bagline} ${c.takeaway?'Eat in':'Take-away'}</button><hr>
    <button data-a="m-guests">${IC.users} Add guests</button><button data-a="m-customer" data-g="more-customer">${IC.user} Add Customer</button><hr>
    <button class="${S.courses&&S.courses.on?'':'off'}" data-a="m-courses">${IC.cloche} ${UI.showCourses?'Hide':'Show'} Courses</button><hr><button data-a="openret" data-g="more-openret">${IC.ret} Open return</button></div>`:'';
  return `<div class="pnl rp"><div class="tbar">${bar}</div>${head}<div class="cart-l" id="cartl" style="bottom:${788-15-totTop+8}px">${items}</div><div class="foot" style="top:${totTop}px;height:auto"></div>${total}${keys}${bb}${ph}${more}</div>`;
}
const qName=p=>({swcloud:'Swedbank Cloud',card:'Kontokort',swish:'Swish',cash:'Kontant',gift:'Presentkort',invoice:'Faktura'}[p.id]||p.name);

/* ── functions ── */
const FN={
  discount:{name:'Discount',ic:'pct',run(){if(!C().items.length)return toast('Lägg något i varukorgen först.');UI.pop=null;openModal('discount')}},
  splititems:{name:'Split by items',ic:'split',run(){toast(NOTDEMO)}},
  openreturn:{name:'Open return',ic:'ret',off:()=>!!C().items.length,run(){if(C().items.length)return toast('Töm varukorgen för att göra en öppen retur.');UI.pop=null;openModal('openret')}},
  splitamount:{name:'Split by amount',ic:'splitamt',run(){toast(NOTDEMO)}},
  ticketq:{name:'Ticket qu...',ic:'ticket',off:()=>1,sub:()=>'Stopped',run(){toast('Biljettkö är avstängd i den här butiken.')}},
  plu:{name:'PLU',ic:'plu',off:()=>1,run(){toast(NOTDEMO)}},
  printbill:{name:'Print bill',ic:'bill',off:()=>!C().items.length,run(){if(!C().items.length)return;UI.pop=null;openModal('receipt',{kind:'bill'})}},
  takeaway:{name:'Take-away',ic:'bag',sub:()=>C().takeaway?'Yes':'No',run(){C().takeaway=!C().takeaway;save();emit('takeaway',C().takeaway);render()}},
  scan:{name:'Scan',ic:'scan',run(){toast('Skanna en streckkod med kameran eller en handskanner.')}},
};

/* ── payment ── */
function pay(mid){
  const c=C();if(!c.items.length)return;UI.pop=null;
  if(mid==='swcloud'&&window.swCloudPay){swCloudPay();return}
  if(mid==='swish'){openModal('swish');return}
  if(mid==='cash'){if(S.drawer&&S.drawer.float==null&&!c.ret){UI.f={amt:''};openModal('openbal');return}UI.f={cash:''};openModal('cash');return}
  if(mid==='gift'){UI.f={code:''};openModal('giftpay');return}
  if(mid==='card'&&!S.terminals.length&&!c.ret){UI.busy='Payment in progress…';render();setTimeout(()=>{UI.busy=null;finalize('card')},1400);return}
  UI.busy=c.ret?'Refund in progress…':'Payment in progress…';render();setTimeout(()=>{UI.busy=null;finalize(mid)},1400);
}
function finalize(mid,extra={}){
  const c=C(),tot=cartTot(c),hex=()=>Math.floor(Math.random()*0xffffffff).toString(16).toUpperCase().padStart(8,'0');
  const d=new Date(),ymd=String(d.getFullYear()).slice(2)+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0');
  const m=S.payments.find(p=>p.id===mid);
  let order;
  if(c.ret){
    order=S.orders.find(o=>o.id===c.ret);
    order.history.push({at:now(),items:c.items.map(i=>({...i})),paid:tot,method:m.name,reason:c.reason||''});
    c.items.forEach(i=>{const oi=order.items.find(x=>x.pid===i.pid);if(oi)oi.returned=(oi.returned||0)+Math.abs(i.qty)});
  }else{
    order={id:ymd+'-'+hex(),at:now(),takeaway:c.takeaway,items:c.items.map(i=>({...i})),total:tot,orderDisc:c.orderDisc,customer:c.customer,history:[]};
    order.history.push({at:order.at,items:order.items.map(i=>({...i})),paid:tot,method:m.name});S.orders.unshift(order);
  }
  const sum={oid:order.id,paid:tot,method:m.name,change:extra.change||0,ret:!!c.ret,kind:mid};
  if(typeof onSale==='function'){const ex=onSale(order,c,mid,extra)||{};sum.lines=ex.lines||[]}
  S.cart=newCart();S.cart.takeaway=S.other.defaultTakeaway;UI.sel=null;UI.num='';save();
  UI.modal={stack:[{p:'checkout',d:sum}],white:true};emit('paid',sum);
  if(mid==='cash')setTimeout(()=>toast('Kassalådan öppnas'),300);
  render();
}

/* ── modal system ── */
const PAGES={};
function openModal(p,d={}){UI.more=false;UI.modal={stack:[{p,d}]};emit('open:'+p,d);render()}
function push(p,d={}){if(!UI.modal)return openModal(p,d);UI.modal.stack.push({p,d});emit('open:'+p,d);render()}
function pop(){if(!UI.modal)return;UI.modal.stack.pop();if(!UI.modal.stack.length)UI.modal=null;else emit('open:'+mtop().p,mtop().d);render()}
function closeModal(){const was=UI.modal&&mtop().p;UI.modal=null;emit('close',was);render()}
const mtop=()=>UI.modal.stack[UI.modal.stack.length-1];
function modalHtml(){
  if(!UI.modal)return '';const t=mtop(),pg=PAGES[t.p];if(!pg)return '';const r=pg(t.d||{});
  const canBack=UI.modal.stack.length>1&&!r.noBack;
  return `<div class="mbg" data-a="${r.lock?'nop':'mclose'}"></div><div class="modal ${r.white?'w':''}" data-g="modal-${t.p}" style="${r.css||''}">
   <div class="mh">${canBack?`<button class="bk" data-a="mback" data-g="m-back">${IC.back}</button>`:(r.left||'')}${r.title?`<span>${r.title}</span>`:''}${r.noClose?'':`<button class="cl" data-a="mclose" data-g="m-close">${IC.x}</button>`}${r.right||''}</div>
   <div class="mb ${r.foot?'':'nofoot'}" id="mb" style="${r.bodyCss||''}">${r.body}</div>${r.foot?`<div class="mf">${r.foot}</div>`:''}</div>`;
}
const row=(label,o={})=>`<button class="row ${o.cls||''}" data-a="${o.a||'nop'}" ${o.x!=null?`data-x="${esc(o.x)}"`:''}${o.y!=null?` data-y="${esc(o.y)}"`:''} data-g="${o.g||'row-'+slug(label)}">${o.ic?`<span class="ico" style="${o.icbg?'background:'+o.icbg:''}">${IC[o.ic]}</span>`:''}<span>${o.html||esc(label)}</span>${o.right!==false?`<span class="chev">${o.val!=null?`<span class="val">${o.val}</span>`:''}${o.tog!=null?`<span class="tog ${o.tog?'on':''}"></span>`:(o.nochev?'':IC.chev)}</span>`:''}</button>`;
const fld=(label,name,o={})=>`<div class="fld"><label>${label}</label><input data-in="${name}" data-g="in-${name}" value="${esc(UI.f[name]??'')}" placeholder="${esc(o.ph||label.replace('*',''))}" ${o.type?`type="${o.type}"`:''} ${o.mode?`inputmode="${o.mode}"`:''} ${o.live?'data-live="1"':''}>${o.rt||''}</div>`;
const pad=(act,extra='')=>`<div class="npad">${['1','2','3','4','5','6','7','8','9',extra||'','0','⌫'].map(k=>k===''?'<span></span>':`<button data-a="${act}" data-x="${k}" data-g="np-${k==='⌫'?'bs':k===','?'comma':k}">${k==='⌫'?IC.bksp:k}</button>`).join('')}</div>`;

/* sales pages */
PAGES.item=d=>{const it=C().items[d.i];if(!it){return{title:'',body:''}}const p=P(it.pid);
  return {white:true,title:esc(it.name),body:`<div style="display:flex;gap:20px"><div style="flex:1"><div style="font-size:21px">${esc(it.name)}</div>
   <div style="margin:14px 0"><span class="radio ${!(it.ta??C().takeaway)?'on':''}" data-a="itemta" data-x="0"><i></i>Eat-in</span><span class="radio ${(it.ta??C().takeaway)?'on':''}" data-a="itemta" data-x="1"><i></i>Take-away</span></div>
   <div style="font-size:19px;font-weight:700">${kr(it.price)}</div></div><div style="width:116px;height:116px;border-radius:4px;background:linear-gradient(135deg,#e8ebf2,#c9d0de)"></div></div>
   <div class="fld" style="border:1px solid #e1e1e6;margin:22px 0 14px"><input data-in="note" placeholder="Note" value="${esc(UI.f.note??it.note)}"></div>
   <div class="grp" style="background:#efeff4">${row('Allergy request',{a:'nop',val:'None',html:`<span style="color:var(--red)">▲</span> Allergy request`})}</div>
   ${p&&p.desc?`<h3 style="margin:22px 0 4px;font-size:16px">Description</h3><div>${esc(p.desc)}</div>`:''}`,
   foot:`<button class="btnb g" style="min-width:42px;padding:0" data-a="itemdel" data-g="item-del">${IC.trash}</button><button class="btnb" style="min-width:104px" data-a="itemdisc" data-g="item-disc">${IC.tag} Discount</button>
   <div class="fld" style="margin:0;width:300px;background:#efeff4">Quantity<span class="rt" style="color:#1c1c1e">${UI.f.qty??it.qty}<button class="btnb g" style="min-width:34px;height:26px;padding:0" data-a="qty" data-x="-1">${IC.minus}</button><button class="btnb g" style="min-width:34px;height:26px;padding:0" data-a="qty" data-x="1" data-g="qty-plus">${IC.plus}</button></span></div>
   <button class="btnb" style="min-width:94px" data-a="itemupd" data-g="item-update">${IC.refresh} Update</button>`}};
PAGES.discount=d=>{const tgt=d.i!=null?'item':'order';
  return {title:tgt==='item'?'Rabatt på artikel':'Discount',body:`<div class="sec">Discount buttons</div><div class="grp plain">${S.discounts.map(x=>row(`${x.pct} % – ${x.name}`,{a:'applydisc',x:x.pct,g:'disc-'+x.pct})).join('')}</div>
   <div class="sec">Egen rabatt i procent</div>${fld('Procent','pct',{ph:'t.ex. 25',mode:'numeric'})}${(tgt==='order'?C().orderDisc:C().items[d.i]?.disc)?`<div class="grp plain">${row('Ta bort rabatten',{a:'applydisc',x:0,cls:'red',nochev:1})}</div>`:''}`,
   foot:`<button class="btnb" data-a="applydisc" data-x="custom" data-g="disc-apply">Apply discount</button>`}};
PAGES.checkout=d=>({white:true,noClose:true,lock:true,title:'Checkout Summary',body:`<div style="display:flex;gap:14px;align-items:center;justify-content:center;margin-top:24px"><svg viewBox="0 0 54 54" width="54" height="54"><circle cx="27" cy="27" r="25" fill="none" stroke="#5cc26f" stroke-width="3"/><path d="M16 28l7 7 15-16" fill="none" stroke="#5cc26f" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
   <div><div style="font-size:24px;font-weight:700;line-height:1.1">Checkout<br>Successful</div><div style="color:#8e8e93;font-size:13px">Order nr: ${esc(d.oid)}</div></div></div>
   <div style="width:308px;margin:24px auto;background:#f2f2f6;border-radius:6px;padding:14px 15px"><div style="display:flex;justify-content:space-between;font-weight:700;font-size:17px"><span>${d.ret?'Paid now:':'Paid:'}</span><span>${d.ret?'-':''}${kr(Math.abs(d.paid))}</span></div><div style="display:flex;justify-content:space-between;margin-top:12px"><span>${esc(d.method)}:</span><span>${d.ret?'-':''}${kr(Math.abs(d.paid))}</span></div>${d.change?`<div style="display:flex;justify-content:space-between;margin-top:6px;color:var(--blue);font-weight:600"><span>Växel:</span><span>${kr(d.change)}</span></div>`:''}${(d.lines||[]).map(l=>`<div style="display:flex;justify-content:space-between;margin-top:6px;color:var(--blue);font-weight:600"><span>${esc(l[0])}</span><span>${esc(l[1])}</span></div>`).join('')}</div>
   <div style="display:grid;gap:11px;justify-content:center;margin-top:${d.change?150:200}px"><button class="btnb" data-a="rcpt" data-x="sms" data-g="rc-sms">${IC.phone} SMS</button><button class="btnb" data-a="rcpt" data-x="email" data-g="rc-email">${IC.mail} Email</button><button class="btnb" data-a="rcpt" data-x="print" data-g="rc-print">${IC.printer} Print</button><button class="btnb g" style="margin-top:12px" data-a="rcpt" data-x="skip" data-g="rc-skip">Skip receipt</button></div>`});
PAGES.receipt=d=>({white:true,title:d.kind==='bill'?'Nota':d.title||'Kvitto',bodyCss:'background:#f2f2f6',body:`<div class="paper">${esc(receiptText(d))}</div><p style="text-align:center;color:#8e8e93;font-size:12px">Skrivs ut på ${esc(S.printer.name)}${S.printer.connected?'':' (ej ansluten)'}</p>`});
function receiptText(d){
  const L=(a,b,w=40)=>a+' '.repeat(Math.max(1,w-a.length-String(b).length))+b;
  const head=`${S.store.toUpperCase()}\nStorgatan 1, 111 22 Stockholm\nOrg.nr 559999-0000\n${'-'.repeat(40)}\n`;
  if(d.kind==='demo')return head+'          DEMOKVITTO\n\nSkrivaren fungerar!\n'+now()+'\n';
  if(d.kind==='z'||d.kind==='x'){const z=d.z;return head+`${d.kind==='z'?'Z-RAPPORT (DAGSAVSLUT)':'X-RAPPORT'}\n${L('Skapad',z.at)}\n${'-'.repeat(40)}\n${L('Antal köp',z.count)}\n${L('Returer',z.returns||0)}\n${L('Total försäljning',n2(z.total))}\n${L('varav moms 12 %',n2(z.vat12||0))}\n${L('varav moms 6 %',n2(z.vat6||0))}\n${L('varav moms 25 %',n2(z.vat25||0))}\n${'-'.repeat(40)}\nBETALSÄTT\n${Object.entries(z.methods||{}).map(([k,v])=>L(k,n2(v))).join('\n')||'-'}\n${'-'.repeat(40)}\n${L('Grand total försäljning',n2(z.grand||z.total))}\n`}
  const o=d.order||{items:C().items,total:cartTot(),id:'—',at:now()};
  return head+(d.kind==='bill'?'NOTA – EJ KVITTO\n':`KVITTO  ${o.id}\n`)+`${o.at||now()}\n${'-'.repeat(40)}\n`+o.items.map(i=>L(`${Math.abs(i.qty)} x ${i.name}`,n2(lineTot(i)))+(i.disc?`\n  rabatt ${i.disc} %`:'')).join('\n')+`\n${'-'.repeat(40)}\n${L('TOTALT',kr(o.total))}\n\nTack för ditt besök!\n`;
}
PAGES.swish=()=>({white:true,title:'Swish',body:`<div class="amt"><small>Att betala</small>${kr(cartTot())}</div><div class="qr"></div><p style="text-align:center;color:#8e8e93">Kunden skannar QR-koden i Swish-appen.<br>Kassan väntar på betalningen.</p>`,foot:`<button class="btnb" data-a="swishok" data-g="swish-ok">Simulera att kunden betalar</button>`});
PAGES.cash=()=>{const t=cartTot(),got=parseFloat((UI.f.cash||'0').replace(',','.'))||0;
  return {title:'Kontant',body:`<div class="amt"><small>Att betala ${kr(t)}</small>Mottaget: ${UI.f.cash?kr(got):'—'}</div>${got>=t?`<p style="text-align:center;color:var(--blue);font-weight:600">Växel tillbaka: ${kr(got-t)}</p>`:'<p style="text-align:center;color:#8e8e93">Knappa in hur mycket kunden ger.</p>'}
   <div style="display:flex;gap:8px;justify-content:center">${[t,Math.ceil(t/50)*50,Math.ceil(t/100)*100,500].filter((v,i,a)=>a.indexOf(v)===i&&v>=t).slice(0,4).map(v=>`<button class="btnb g" style="min-width:80px" data-a="cashq" data-x="${v}">${Math.round(v)} kr</button>`).join('')}</div>${pad('cashkey',',')}`,
   foot:`<button class="btnb ${got>=t?'':'dis'}" data-a="cashok" data-g="cash-ok">Ta betalt</button>`}};
PAGES.giftpay=()=>({title:'Presentkort',body:`<p style="color:#8e8e93">Skanna eller skriv in presentkortets kod. I demon fungerar vilken kod som helst.</p>${fld('Kod','code',{ph:'XXXX-XXXX'})}`,foot:`<button class="btnb" data-a="giftok">Betala ${kr(cartTot())}</button>`});
PAGES.parked=()=>({title:'Parked',body:S.parked.length?`<div class="grp plain list">${S.parked.map((c,i)=>row(`${c.items.map(x=>x.name).join(', ')}`,{a:'unpark',x:i,val:kr(cartTot(c)),g:'parked-'+i})).join('')}</div>`:`<p style="text-align:center;color:#8e8e93;margin-top:60px">Inga parkerade ordrar.<br>Lägg något i varukorgen och tryck <b>Park</b>.</p>`});
PAGES.search=()=>{const q=(UI.f.q||'').toLowerCase();const list=S.products.filter(p=>!q||p.name.toLowerCase().includes(q));
  return {title:'Search',body:`<div class="srch">${IC.search}<input data-in="q" data-live="1" data-g="in-q" placeholder="Search products" value="${esc(UI.f.q||'')}"></div><div class="grp plain list" style="margin-top:14px">${list.map(p=>row(p.name,{a:'searchadd',x:p.id,val:kr(p.price),g:'sr-'+slug(p.name),html:`${esc(p.name)}<br><small style="color:#8e8e93">${esc(G(p.gid)?.name||'')}</small>`})).join('')||'<p style="padding:14px;color:#8e8e93">Inga träffar</p>'}</div>`}};
PAGES.notes=()=>({title:'Order notes',body:fld('Notering','note',{ph:'t.ex. Ingen laktos'}),foot:`<button class="btnb" data-a="notesok">Save</button>`});
PAGES.customer=()=>({title:'Add Customer',body:`<p style="color:#8e8e93">Sök kund eller lägg till en ny. Kunden kopplas till ordern och kvittot.</p>${fld('Namn','cust',{ph:'Kundens namn'})}`,foot:`<button class="btnb" data-a="custok">Add Customer</button>`});
PAGES.openret=()=>{const q=(UI.f.q||'').toLowerCase();return {title:'Open return',body:`<p style="color:#8e8e93">Öppen retur används när kunden saknar kvitto. Välj produkten som lämnas tillbaka.</p><div class="srch">${IC.search}<input data-in="q" data-live="1" placeholder="Search products" value="${esc(UI.f.q||'')}"></div><div class="grp plain list" style="margin-top:12px">${S.products.filter(p=>!q||p.name.toLowerCase().includes(q)).map(p=>row(p.name,{a:'openretadd',x:p.id,val:kr(p.price)})).join('')}</div>`}};

/* ── render ── */
let lastPage=null;
function render(){
  const pos=document.getElementById('pos');if(!pos)return;
  const mb=document.getElementById('mb'),cl=document.getElementById('cartl'),tb=document.getElementById('tabs');
  const st={mb:mb?mb.scrollTop:0,cl:cl?cl.scrollTop:0,tb:tb?tb.scrollLeft:0};
  const pageKey=UI.modal?UI.modal.stack.length+mtop().p:'';
  const ae=document.activeElement,aeIn=ae&&ae.dataset&&ae.dataset.in,selS=ae&&ae.selectionStart;
  pos.innerHTML=leftPanel()+rightPanel()+modalHtml()
    +(UI.busy?`<div class="mbg" style="background:rgba(40,40,48,.45);display:grid;place-items:center;z-index:50"><div style="display:grid;justify-items:center;gap:14px;color:#fff;font-weight:600"><div class="spin">ya</div>${esc(UI.busy)}</div></div>`:'')
    +(UI.toast?`<div class="toast" role="status">${esc(UI.toast)}</div>`:'');
  const n=document.getElementById('mb');if(n&&pageKey===lastPage)n.scrollTop=st.mb;
  const c2=document.getElementById('cartl');if(c2)c2.scrollTop=UI.sel!=null&&UI.sel===C().items.length-1?c2.scrollHeight:st.cl;
  const t2=document.getElementById('tabs');if(t2)t2.scrollLeft=st.tb;
  lastPage=pageKey;
  if(aeIn){const e=pos.querySelector(`[data-in="${aeIn}"]`);if(e){e.focus();try{e.setSelectionRange(selS,selS)}catch(_){}}}
  emit('render');
}

/* ── actions ── */
const A={
  nop(){},
  mystore(){openModal('ms')},
  edit(){UI.edit=JSON.stringify({sp:S.startPages,sg:S.showGroups});UI.pop=null;UI.more=false;emit('edit');if(!curTab()||!curTab().startsWith('sp:'))UI.tab=S.startPages[0]?'sp:'+S.startPages[0].id:UI.tab;render()},
  editcancel(){const o=JSON.parse(UI.edit);S.startPages=o.sp;S.showGroups=o.sg;UI.edit=null;save();render()},
  editsave(){UI.edit=null;save();emit('layout:save');toast('Layouten är sparad');},
  togglegroups(){S.showGroups=!S.showGroups;render()},
  search(){UI.f={q:''};openModal('search')},
  tab(x){if(UI.edit&&x.startsWith('sp:')&&UI.tab===x){openModal('spages');return}UI.tab=x;emit('tab',x);render()},
  tap(pid){if(S.other.tapProduct==='open'){addProduct(pid);UI.f={};return openModal('item',{i:UI.sel})}addProduct(pid)},
  num(k){if(k==='⌫')UI.num=UI.num.slice(0,-1);else if(UI.num.length<3)UI.num=(UI.num+k).replace(/^0+/,'');render()},
  item(i){UI.sel=+i;UI.f={};if(C().ret)return render();openModal('item',{i:+i})},
  itemta(v){const it=C().items[mtop().d.i];it.ta=v==='1';save();render()},
  qty(d){const it=C().items[mtop().d.i];UI.f.qty=Math.max(1,(UI.f.qty??it.qty)+ +d);render()},
  itemupd(){const it=C().items[mtop().d.i];if(UI.f.qty)it.qty=UI.f.qty;if(UI.f.note!=null)it.note=UI.f.note;save();emit('item:update');closeModal()},
  itemdel(){C().items.splice(mtop().d.i,1);UI.sel=null;save();emit('item:delete');closeModal()},
  itemdisc(){const i=mtop().d.i;UI.f={pct:''};push('discount',{i})},
  applydisc(x){const d=mtop().d;let v=x==='custom'?parseFloat((UI.f.pct||'').replace(',','.')):+x;if(isNaN(v)||v<0||v>100)return toast('Ange en rabatt mellan 0 och 100 %');
    if(d.i!=null)C().items[d.i].disc=v;else C().orderDisc=v;save();emit('discount',{pct:v,target:d.i!=null?'item':'order'});closeModal();if(v)toast(`Rabatt ${v} % tillagd`)},
  bin(){if(!C().items.length)return;S.cart=newCart();S.cart.takeaway=S.other.defaultTakeaway;UI.sel=null;UI.pop=null;save();emit('bin');render()},
  park(){S.parked.push(C());S.cart=newCart();S.cart.takeaway=S.other.defaultTakeaway;UI.sel=null;save();emit('park');toast('Ordern är parkerad')},
  parked(){if(UI.edit)return;openModal('parked')},
  unpark(i){if(C().items.length)return toast('Töm varukorgen först.');S.cart=S.parked.splice(+i,1)[0];save();emit('unpark');closeModal()},
  more(){if(UI.edit)return;UI.more=!UI.more;UI.pop=null;emit(UI.more?'more':'more:close');render()},
  toggleta(){C().takeaway=!C().takeaway;UI.more=false;save();emit('takeaway',C().takeaway);render()},
  'm-notes'(){UI.f={note:C().note};openModal('notes')},notesok(){C().note=UI.f.note||'';save();closeModal()},
  'm-allergy'(){UI.more=false;toast('Allergiförfrågan läggs på en artikel via artikelvyn.')},
  'm-guests'(){UI.more=false;toast(NOTDEMO)},
  'm-customer'(){UI.f={cust:''};openModal('customer')},custok(){C().customer=UI.f.cust||'';save();emit('customer');closeModal()},
  openret(){UI.more=false;UI.f={q:''};if(C().items.length){render();return toast('Töm varukorgen för att göra en öppen retur.')}openModal('openret')},
  openretadd(pid){const p=P(pid);C().items.push({pid,name:p.name,price:p.price,qty:-1,disc:0});C().open=true;save();closeModal();toast('Returen ligger i varukorgen')},
  functions(){UI.pop=UI.pop==='fn'?null:'fn';UI.more=false;emit(UI.pop?'functions':'functions:close');render()},
  allpay(){if(!C().items.length)return;UI.pop=UI.pop==='pay'?null:'pay';UI.more=false;emit(UI.pop?'allpay':'allpay:close');render()},
  closepop(){UI.pop=null;render()},
  fn(k){const f=FN[k];if(UI.pop==='fn'&&k!=='takeaway')UI.pop=null;emit('fn:'+k);f.run();if(k!=='takeaway'&&!UI.modal)render()},
  pay(id){if(C().ret){const m=S.payments.find(p=>p.id===id);UI.pop=null;UI.busy='Refund in progress…';render();setTimeout(()=>{UI.busy=null;finalize(id)},1200);return}emit('pay:'+id);pay(id)},
  swishok(){finalize('swish')},
  cashq(v){UI.f.cash=String(v);render()},
  cashkey(k){let v=UI.f.cash||'';if(k==='⌫')v=v.slice(0,-1);else if(k===','){if(!v.includes(','))v+=','}else v+=k;UI.f.cash=v;render()},
  cashok(){const t=cartTot(),got=parseFloat((UI.f.cash||'0').replace(',','.'));if(got<t)return;finalize('cash',{change:got-t})},
  giftok(){finalize('gift')},
  rcpt(k){const d=mtop().d;const o=S.orders.find(x=>x.id===d.oid);emit('receipt:'+k);
    if(k==='print'){UI.modal={stack:[{p:'receipt',d:{kind:'order',order:o}}]};render();return}
    if(k==='sms'||k==='email')toast(k==='sms'?'Kvittot skickas som SMS':'Kvittot skickas med e-post');
    closeModal()},
  searchadd(pid){closeModal();addProduct(pid)},
  mback(){pop()},mclose(){if(UI.modal&&mtop().p==='checkout')return;closeModal()},
};

/* ── wire-up ── */
function wire(){
  const pos=document.getElementById('pos');
  pos.addEventListener('click',e=>{
    if(UI.busy)return;
    const b=e.target.closest('[data-a]');
    if(UI.more&&(!b||!b.closest('.more'))&&!(b&&b.dataset.a==='more')){UI.more=false;render();if(!b)return}
    if(!b)return;const fn=A[b.dataset.a];if(fn)fn(b.dataset.x,b);
  });
  pos.addEventListener('input',e=>{const k=e.target.dataset.in;if(!k)return;UI.f[k]=e.target.value;emit('input',{k,v:e.target.value});if(e.target.dataset.live)render()});
  pos.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.dataset.in){const f=document.querySelector('.mf .btnb:not(.g)');if(f)f.click()}});
}
function fit(){
  const st=document.getElementById('stage'),sc=document.getElementById('screen'),fitEl=document.getElementById('fit'),dv=document.getElementById('device');
  const pad=parseFloat(getComputedStyle(dv).paddingLeft)*2,cs=getComputedStyle(st);
  const w=st.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)-pad,h=st.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)-pad;
  const tp=[document.getElementById('termpane'),document.getElementById('phonepane'),document.getElementById('devpane')].find(x=>x&&!x.hidden);let ww=w,hh=h;const narrow=innerWidth<=860;
  const isPh=tp&&tp.id==='phonepane',isDev=tp&&tp.id==='devpane';
  if(tp){if(narrow){hh=h-(isPh?Math.min(380,h*.45):tp.offsetHeight)-10}else{ww=w-(isPh?300:tp.offsetWidth)-18}}
  const s=Math.min(ww/1051,hh/788,1.25);
  if(tp&&!narrow&&!isPh&&!isDev)tp.style.height=Math.max(360,788*s+pad)+'px';
  if(isPh){const ph=tp.querySelector('.phone');const avail=narrow?Math.min(380,h*.45):Math.max(420,788*s+pad);const k=Math.min(1,avail/640);ph.style.transform=`scale(${k})`;ph.style.transformOrigin='top left';tp.style.width=(narrow?'100%':(300*k+'px'));tp.style.height=(640*k)+'px';ph.style.margin=narrow?'0 auto':'0';if(narrow){ph.style.transformOrigin='top center'}}sc.style.transform=`scale(${s})`;fitEl.style.width=1051*s+'px';fitEl.style.height=788*s+'px';emit('render');
}
addEventListener('resize',fit);
document.addEventListener('DOMContentLoaded',()=>{});
