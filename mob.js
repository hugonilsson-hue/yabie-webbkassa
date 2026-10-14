/* Yabie-kassan på bärbara enheter (Sunmi V2, Samsung A35, PAX A920 ECR on device). Byggd efter demomiljön i BlueStacks (okt 2026). */
(()=>{
const DEVS={v3:{t:'Sunmi V3',d:'Handdator med inbyggd kvittoskrivare och kortläsare',printer:true,card:'ondevice',f:{W:462,H:1318,x:36,y:403,w:390,h:864,r:16}},
 a920:{t:'PAX A920 Pro',d:'Kassa och kortterminal i samma enhet (ECR on device)',printer:true,card:'ondevice',f:{W:501,H:1133,x:54,y:206,w:390,h:784,r:4}},
 a35:{t:'Samsung A35',d:'Mobiltelefon, kortet tas i en fristående terminal',printer:false,card:'wireless',f:{W:414,H:869,x:12,y:12,w:390,h:845,r:38}}};
window.MOBDEVS=DEVS;
const dev=()=>DEVS[TS.mobDev]||DEVS.v3;
const M=()=>{if(!S.mob)S.mob={cart:nc(),orders:[],parked:{},float:null,z:[],zSince:0};return S.mob};
const nc=()=>({items:[],disc:null,table:null,take:false,note:'',cust:null,guests:0,tip:true,ret:null,split:null});
const U=()=>UI.mb||(UI.mb={tab:'cat',grp:null,view:null,sheet:null,kp:'',sel:{},conf:null,toast:null});
const sek=n=>'SEK'+(Math.round(n*100)/100).toFixed(2);
const sekS=n=>'SEK'+(n%1?(Math.round(n*100)/100).toFixed(2):n);
const G=id=>S.groups.find(g=>g.id===id);
const modsOf=p=>S.modifiers.filter(m=>m.pids.includes(p.id));
const lineGross=it=>(it.price+it.mods.reduce((a,m)=>a+m.price*m.qty,0))*it.qty;
const lineTot=it=>{const g=lineGross(it);return it.disc?Math.round(g*(100-it.disc))/100:g};
const SVC=12.5;const svcAmt=c=>c.svc&&!c.ret?Math.round((sub(c)-discAmt(c))*SVC)/100:0;
const sub=c=>c.items.reduce((a,it)=>a+lineTot(it),0);
const discAmt=c=>c.disc?Math.round(sub(c)*c.disc.pct)/100:0;
const promoRes=c=>c.ret||!window.bsPromoCalc?{disc:0,lines:[]}:bsPromoCalc(c.items.map(it=>({pid:it.pid,tot:lineTot(it)})));
const promoAmt=c=>promoRes(c).disc;
const total=c=>{const t=sub(c)-discAmt(c)-promoAmt(c)+svcAmt(c);return c.ret?-t:t};
const rest=c=>Math.round((total(c)-(c.amtPaid||0))*100)/100;
const toPay=c=>{if(c.next)return c.next;const t=total(c);if(!c.split)return Math.round((t-(c.amtPaid||0))*100)/100;return Math.round((t-c.split.paidAmt)/(c.split.n-c.split.paid)*100)/100};
const cnt=c=>c.items.reduce((a,it)=>a+it.qty,0);
let tt=null;const toast=t=>{U().toast=t;render();clearTimeout(tt);tt=setTimeout(()=>{U().toast=null;if(APP()==='mob')render()},2200)};
const oid=()=>{const d=new Date();const p=n=>String(n).padStart(2,'0');return `${String(d.getFullYear()).slice(2)}${p(d.getMonth()+1)}${p(d.getDate())}-${Math.random().toString(16).slice(2,10).toUpperCase()}`};
const now=()=>{const d=new Date();const p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}, ${p(d.getHours())}:${p(d.getMinutes())}`};
const PM=()=>{const L=[];const on=id=>(S.payments.find(p=>p.id===id)||{}).enabled!==false;L.push({id:'cash',t:'Cash',ic:'payments'});L.push({id:'card',t:dev().card==='ondevice'?'Kontokort':'Kontokort Trådlös',ic:'contactless'});if(on('swish'))L.push({id:'swish',t:'Swish Handel',ic:'qr_code_2'});L.push({id:'gift',t:'Yabie gift card',ic:'redeem'});(S.payments||[]).filter(p=>/^x/.test(p.id)&&p.enabled!==false).forEach(p=>L.push({id:p.id,t:p.name,ic:'receipt_long'}));return L};

/* ── CSS ── */
const st=document.createElement('style');st.textContent=`
.device.mobm{padding:0;background:none;box-shadow:none;border-radius:0}
.device.mobm .screen,.device.mobm .fit{border-radius:0;overflow:visible}
.device.mobm .screen{width:var(--mW);height:var(--mH)}
.device.mobm #pos{background:none}
.device.mobm #pos .kmb{left:var(--mx);top:var(--my);width:var(--mw);height:var(--mh);border-radius:var(--mr)}
.device.m-v3 .screen{background:url(mobimg/sunmi-v3.png) 0 0/100% 100% no-repeat}
.device.m-a35 .screen{background:linear-gradient(90deg,#c9ced6,#eef1f5 3%,#d5dae1 6%,#d5dae1 94%,#eef1f5 97%,#c9ced6);border-radius:54px;box-shadow:0 18px 50px rgba(10,15,30,.28)}
.device.m-a35 .screen::before{content:'';position:absolute;inset:6px;border-radius:49px;background:#0b0b0d}
.device.m-a35 .screen::after{content:'';position:absolute;left:50%;top:26px;width:13px;height:13px;margin-left:-6.5px;border-radius:50%;background:#050506;box-shadow:inset 0 0 0 2px #1b1c20;z-index:5}
.device.m-a35 #pos{z-index:1}
.device.m-a35 #pos .kmb{padding-top:34px;box-sizing:border-box}
.device.m-a35 #pos .kmb .kview{top:34px}
.device.m-a920 .screen{background:url(mobimg/pax-a920pro.png) 0 0/100% 100% no-repeat;filter:drop-shadow(0 14px 28px rgba(10,15,30,.18))}
#pos .kmb{position:absolute;background:#fff;font:14px/1.3 Roboto,system-ui,-apple-system,sans-serif;color:#1c1c1e;display:flex;flex-direction:column;user-select:none;overflow:hidden;padding:0}
#pos .kmb .ms{font-family:'Material Symbols Outlined';font-weight:400;font-size:20px;line-height:1;width:1em;overflow:hidden;display:inline-block;white-space:nowrap;-webkit-font-feature-settings:'liga';font-feature-settings:'liga';flex:none}
#pos .kmb button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
#pos .kmb .khd{display:flex;align-items:center;gap:8px;padding:12px 12px 6px}
#pos .kmb .khd .ksp{flex:1}
#pos .kmb .khb{position:relative;color:#1677ff;width:30px;height:30px;display:grid;place-items:center}
#pos .kmb .khb .ms{font-size:28px}
#pos .kmb .kbdg{position:absolute;top:-4px;right:-8px;background:#4cd391;color:#000;border-radius:9px;font-size:10px;font-weight:700;padding:1px 5px}
#pos .kmb .kpill{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:6px;font-weight:600;font-size:13px}
#pos .kmb .kpill.kb{background:#1677ff;color:#fff}
#pos .kmb .kpill.kg{background:#eef0f3;color:#1677ff}
#pos .kmb .kpill .ms{font-size:20px}
#pos .kmb .kcrumb{padding:2px 14px 8px;color:#8e8e93;font-size:13px}
#pos .kmb .kbody{flex:1;overflow:auto;position:relative}
#pos .kmb .kgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0 12px 12px}
#pos .kmb .ktile{aspect-ratio:1/.94;border-radius:4px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;font-weight:700;font-size:13.5px;padding:8px;box-shadow:0 1px 2px rgba(0,0,0,.12)}
#pos .kmb .ktile.kp{align-items:flex-start;justify-content:space-between;text-align:left;font-size:13px}
#pos .kmb .ktile.kp small{font-weight:500;font-size:11.5px}
#pos .kmb .ktile.kback{background:#ececee;color:#1677ff;align-items:stretch;justify-content:space-between;font-weight:500}
#pos .kmb .ktile.kback span:last-child{text-align:right}
#pos .kmb .knav{display:flex;border-top:1px solid #eee;height:62px;flex:none}
#pos .kmb .knav button{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font-size:11px;color:#8e8e93}
#pos .kmb .knav button.kon{color:#1677ff}
#pos .kmb .knav .kic{position:relative;width:56px;height:30px;border-radius:15px;display:grid;place-items:center}
#pos .kmb .knav button.kon .kic{background:#e6e4f7}
#pos .kmb .knav .ms{font-size:24px}
#pos .kmb .knav .knb{position:absolute;top:-2px;right:12px;background:#ef4444;color:#fff;border-radius:8px;font-size:9.5px;font-weight:700;min-width:15px;height:15px;display:grid;place-items:center}
#pos .kmb .kline{margin:0 8px 6px;background:#f2f2f4;border-radius:3px}
#pos .kmb .kline .kr{display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px}
#pos .kmb .kline .kmods{margin:0 0 0 22px;background:#f8f8f9;padding:4px 10px;font-style:italic;font-size:12px}
#pos .kmb .kline .kmods div{display:flex;justify-content:space-between}
#pos .kmb .ktot{border-top:1px solid #ddd;padding:10px 12px 6px;flex:none}
#pos .kmb .ktot .krow{display:flex;justify-content:space-between;align-items:baseline}
#pos .kmb .ktot b{font-size:20px}
#pos .kmb .kact2{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:6px 8px 8px;flex:none}
#pos .kmb .kact2 button{height:52px;border-radius:4px;font-size:12.5px;font-weight:600}
#pos .kmb .kfnb{background:#ececee;color:#1677ff}
#pos .kmb .kchg{background:#1677ff;color:#fff}
#pos .kmb .kchg.kred{background:#ef1b1b}
#pos .kmb .kchg:disabled{background:#e4e4e6;color:#aaa}
#pos .kmb .kopenbar{background:#6fe3a7;padding:6px 10px;font-size:12px}
#pos .kmb .kscrim{position:absolute;inset:0;background:rgba(0,0,0,.25);z-index:20}
#pos .kmb .ksheet{position:absolute;left:0;right:0;bottom:0;background:#fff;z-index:21;border-radius:12px 12px 0 0;padding:12px 8px 10px;box-shadow:0 -4px 16px rgba(0,0,0,.12)}
#pos .kmb .ksheet h4,#pos .kmb .kvh h4{margin:0;text-align:center;font-weight:500;font-size:16px}
#pos .kmb .ksheet .kx,#pos .kmb .kvh .kx{position:absolute;right:12px;top:10px;color:#1677ff}
#pos .kmb .ksheet .kx .ms,#pos .kmb .kvh .kx .ms,#pos .kmb .kvh .kbk .ms{font-size:22px}
#pos .kmb .kfgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
#pos .kmb .kfgrid button{height:88px;border-radius:4px;background:#ececee;color:#1677ff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:12px;font-weight:600}
#pos .kmb .kfgrid button .ms{font-size:30px}
#pos .kmb .kfgrid button:disabled{color:#aaa}
#pos .kmb .kfgrid.kpay button{background:#1677ff;color:#fff}
#pos .kmb .kfgrid.kpay.kred button{background:#ef1b1b}
#pos .kmb .kmoremenu{position:absolute;right:8px;top:48px;width:178px;background:#f2f2f4;border-radius:4px;z-index:22;box-shadow:0 4px 14px rgba(0,0,0,.18);padding:4px 0}
#pos .kmb .kmoremenu button{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;font-size:12.5px;font-weight:600;border-bottom:1px solid #e2e2e4}
#pos .kmb .kmoremenu button:last-child{border-bottom:0}
#pos .kmb .kmoremenu .ms{color:#1677ff;font-size:20px}
#pos .kmb .kmoremenu button:disabled{color:#aaa}
#pos .kmb .kmoremenu .ktg{margin-left:auto;width:16px;height:16px;border-radius:50%;border:2px solid #999}
#pos .kmb .kmoremenu .ktg.kon{border-color:#ef1b1b;background:radial-gradient(#ef1b1b 45%,transparent 50%)}
#pos .kmb .kview{position:absolute;inset:0;background:#fff;z-index:30;display:flex;flex-direction:column}
#pos .kmb .kvh{position:relative;padding:14px 12px 10px;flex:none}
#pos .kmb .kvh .kbk{position:absolute;left:12px;top:12px;color:#1677ff}
#pos .kmb .kvb{flex:1;overflow:auto;padding:4px 12px 12px}
#pos .kmb .kvf{flex:none;padding:8px 8px 10px;display:grid;gap:8px}
#pos .kmb .kbtn{height:44px;border-radius:5px;background:#1677ff;color:#fff;font-weight:600;font-size:13px;width:100%}
#pos .kmb .kbtn.kgr{background:#ececee;color:#1677ff}
#pos .kmb .kbtn.krd{background:#ececee;color:#ef1b1b}
#pos .kmb .kbtn:disabled{background:#e4e4e6;color:#aaa}
#pos .kmb .ksec{color:#8e8e93;font-size:11.5px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;margin:14px 0 6px}
#pos .kmb .kchips{display:flex;flex-wrap:wrap;gap:6px}
#pos .kmb .kchip{background:#ececee;color:#1677ff;border-radius:3px;padding:8px 10px;font-size:12px;display:inline-flex;align-items:center;gap:6px}
#pos .kmb .kchip.kon{background:#1677ff;color:#fff}
#pos .kmb .kchip .kq{display:inline-flex;align-items:center;gap:4px;margin-left:4px}
#pos .kmb .kchip .kq b{background:#fff;color:#1677ff;border-radius:3px;width:22px;height:22px;display:grid;place-items:center}
#pos .kmb .kfld{width:100%;box-sizing:border-box;border:1px solid #ddd;border-radius:4px;height:44px;padding:0 10px;font:inherit;font-size:13px}
#pos .kmb .krad{display:inline-flex;align-items:center;gap:6px;margin-right:14px;font-size:12.5px}
#pos .kmb .krad i{width:16px;height:16px;border-radius:50%;border:2px solid #777;display:inline-block}
#pos .kmb .krad.kon i{border-color:#1677ff;background:radial-gradient(#1677ff 45%,transparent 50%)}
#pos .kmb .kqty{display:flex;align-items:center;gap:8px;background:#f2f2f4;border-radius:4px;padding:6px 8px;font-size:12.5px;flex:1}
#pos .kmb .kqty .ksp{flex:1}
#pos .kmb .kqty button{width:30px;height:30px;border-radius:4px;background:#dfe6f3;color:#1677ff;font-size:18px}
#pos .kmb .kkp{display:grid;grid-template-columns:repeat(3,58px);gap:10px;justify-content:center;margin:16px 0}
#pos .kmb .kkp button{width:58px;height:58px;border-radius:50%;background:#ececee;color:#1677ff;font-size:24px}
#pos .kmb .kamt{text-align:center;font-size:30px;font-weight:700}
#pos .kmb .klbl{text-align:center;color:#8e8e93;font-size:12.5px}
#pos .kmb .kpaid{background:#ececee;border-radius:4px;padding:12px 16px;margin:12px 4px}
#pos .kmb .kpaid .kr{display:flex;justify-content:space-between;font-size:12px}
#pos .kmb .kok{display:flex;align-items:center;justify-content:center;gap:6px;font-size:14px;padding-top:12px}
#pos .kmb .kok .ms{color:#22b45a}
#pos .kmb .ktbl{border:2px solid;border-radius:4px;padding:8px 10px;margin-bottom:8px;min-height:30px;display:flex;flex-direction:column;justify-content:space-between;text-align:left;width:100%}
#pos .kmb .ktbl small{align-self:flex-end;color:#888}
#pos .kmb .ktabs{display:flex;border-bottom:2px solid #ddd;margin:0 0 10px}
#pos .kmb .ktabs button{flex:1;padding:8px;color:#8e8e93}
#pos .kmb .ktabs button.kon{color:#111;border-bottom:2px solid #111;margin-bottom:-2px}
#pos .kmb .kseg{display:flex;border:1px solid #1677ff;border-radius:16px;overflow:hidden;margin:6px 0 12px}
#pos .kmb .kseg button{flex:1;padding:7px;font-size:12.5px}
#pos .kmb .kseg button.kon{background:#b9d7ff}
#pos .kmb .kconf{position:absolute;left:30px;right:30px;top:40%;background:#fff;border-radius:8px;z-index:40;padding:16px 12px 12px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.25);font-size:13px}
#pos .kmb .kconf .kb2{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
#pos .kmb .kconf .kb2 button{height:36px;border-radius:4px;background:#f2f2f4;font-weight:600}
#pos .kmb .kmenu-i{display:flex;align-items:center;gap:10px;padding:12px;background:#ececee;border-bottom:1px solid #e0e0e2;width:100%;font-size:13px;text-align:left}
#pos .kmb .kmenu-i .ms{color:#1677ff;font-size:20px}
#pos .kmb .kmenu-i .kch{margin-left:auto;color:#1677ff}
#pos .kmb .kgrpbox{border-radius:4px;overflow:hidden;margin-bottom:4px}
#pos .kmb .kbigb{background:#1677ff;color:#fff;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-weight:600;font-size:12.5px}
#pos .kmb .kres{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid #eee;width:100%;text-align:left}
#pos .kmb .kres .kim{width:46px;height:46px;border-radius:4px;flex:none}
#pos .kmb .kres .kgt{display:inline-block;background:#d9ecff;color:#1677ff;border-radius:8px;font-size:10px;padding:1px 6px;margin-top:2px}
#pos .kmb .kord{display:block;width:100%;text-align:left;padding:10px 4px;border-bottom:1px solid #eee}
#pos .kmb .kord .kr{display:flex;justify-content:space-between;font-weight:700;font-size:12.5px}
#pos .kmb .ktag{display:inline-block;border-radius:4px;font-size:10px;padding:1px 5px;margin-right:4px;background:#d9ecff;color:#1677ff}
#pos .kmb .ktag.kg{background:#d4f5df;color:#14843f}
#pos .kmb .ktag.kr{background:#fde2e2;color:#c62828}
#pos .kmb .kcb{width:18px;height:18px;border:2px solid #1677ff;border-radius:3px;display:inline-grid;place-items:center;flex:none}
#pos .kmb .kcb.kon{background:#1677ff}
#pos .kmb .kcb.kon::after{content:'✓';color:#fff;font-size:12px}
#pos .kmb .kmtoast{pointer-events:none;position:absolute;left:50%;bottom:80px;transform:translateX(-50%);background:#323232;color:#fff;border-radius:6px;padding:10px 14px;font-size:12.5px;z-index:60;white-space:nowrap}
#pos .kmb .kterm{position:absolute;inset:0;background:#111;color:#fff;z-index:50;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;padding:20px}
#pos .kmb .kterm .ms{font-size:64px}
#pos .kmb .ktgl{display:inline-block;width:36px;height:20px;border-radius:10px;background:#777;position:relative;vertical-align:middle}
#pos .kmb .ktgl::after{content:'';position:absolute;left:3px;top:3px;width:14px;height:14px;border-radius:50%;background:#fff;transition:left .15s}
#pos .kmb .ktgl.kon{background:#1677ff}
#pos .kmb .ktgl.kon::after{left:19px}
#pos .kmb .kmenu-i:disabled .kch{color:#bbb}
#pos .kmb label.kmenu-i{cursor:text}
`;document.head.appendChild(st);

/* ── delar ── */
const icon=(n,s)=>`<span class="ms"${s?` style="font-size:${s}px"`:''}>${n}</span>`;
const vhead=(t,{back,close=true,gb}={})=>`<div class="kvh">${back?`<button class="kbk" data-a="mbback" data-g="${gb||'mb-back'}">${icon('arrow_back')}</button>`:''}<h4>${t}</h4>${close?`<button class="kx" data-a="mbclose" data-g="mb-close">${icon('cancel')}</button>`:''}</div>`;
const keypad=pre=>`<div class="kkp">${['1','2','3','4','5','6','7','8','9','00','0','⌫'].map(k=>`<button data-a="mbkey" data-x="${k}" data-g="${pre}-${k==='⌫'?'del':k}">${k==='⌫'?icon('backspace',22):k}</button>`).join('')}</div>`;
const navBar=()=>{const b=U(),c=M().cart,n=cnt(c);return `<div class="knav"><button class="${b.tab==='cat'?'kon':''}" data-a="mbtab" data-x="cat" data-g="mb-tab-cat"><span class="kic">${icon('grid_view')}</span>Catalog</button><button class="${b.tab==='basket'?'kon':''}" data-a="mbtab" data-x="basket" data-g="mb-tab-basket"><span class="kic">${icon('shopping_basket')}${n?`<span class="knb">${n}</span>`:''}</span>Basket</button></div>`};

function catalog(){const b=U(),c=M().cart;const g=b.grp&&G(b.grp);
 const park=c.items.length?(c.table?`<button class="kpill kb" data-a="mbpark" data-g="mb-park">${icon('shopping_basket')}Save</button>`:`<button class="kpill kb" data-a="mbpark" data-g="mb-park">${icon('add_shopping_cart')}Park</button>`):`<button class="kpill kb" data-a="mbparked" data-g="mb-parked">${icon('shopping_basket')}Parked</button>`;
 let grid;
 if(!g)grid=S.groups.filter(x=>x.id!=='g-gift').map(x=>`<button class="ktile" style="background:${x.color}" data-a="mbgrp" data-x="${x.id}" data-g="mb-grp-${slug(x.name)}">${esc(x.name)}</button>`).join('');
 else grid=`<button class="ktile kback" data-a="mbgrp" data-x="" data-g="mb-grp-back"><span>${icon('arrow_back',22)}</span><span>Back</span></button>`+S.products.filter(p=>p.gid===g.id&&!p.hidden).map(p=>`<button class="ktile kp" style="background:${g.color}" data-a="mbprod" data-x="${p.id}" data-g="mb-p-${slug(p.name)}"><span>${esc(p.name)}</span><small>${p.open?'Open price':sekS(p.price)}</small></button>`).join('');
 return `<div class="khd"><button class="khb" data-a="mbmenu" data-g="mb-menu">${icon('menu')}<span class="kbdg">5</span></button><span class="ksp"></span>${park}<button class="kpill kg" data-a="mbsearch" data-g="mb-search">${icon('search')}Search</button></div><div class="kcrumb">Catalog${g?' / '+esc(g.name):''}</div><div class="kbody"><div class="kgrid">${grid}</div></div>`}

function basket(){const c=M().cart,b=U();const n=cnt(c);
 const park=c.ret?'':c.items.length?(c.table?`<button class="kpill kb" data-a="mbpark" data-g="mb-park">${icon('shopping_basket')}Save</button>`:`<button class="kpill kb" data-a="mbpark" data-g="mb-park">${icon('add_shopping_cart')}Park</button>`):`<button class="kpill kb" data-a="mbparked" data-g="mb-parked">${icon('shopping_basket')}Parked</button>`;
 const tbl=c.table&&tableById(c.table);
 return `<div class="khd"><button style="color:${c.items.length?'#ef1b1b':'#ccc'}" data-a="mbclear" data-g="mb-clear">${icon('delete',24)}</button><span class="ksp"></span>${park}<button class="kpill kg" data-a="mbmore" data-g="mb-more">${icon('more_horiz')}More</button></div>
 ${tbl?`<div class="kopenbar"><b>OPEN:</b> ${esc(tbl.plan)} / ${esc(tbl.name)}</div>`:''}${c.take?`<div class="kopenbar" style="background:#ffe08a">${icon('takeout_dining',14)} Take-away</div>`:''}${c.cust?`<div class="kopenbar" style="background:#d9ecff">${icon('person',14)} ${esc(c.cust)}</div>`:''}${c.note?`<div class="kopenbar" style="background:#f2f2f4">${icon('edit_note',14)} ${esc(c.note)}</div>`:''}
 <div class="kwrap" style="flex:1;position:relative;min-height:0;align-self:stretch;width:auto;margin:0;padding:0"><div class="kbody" style="position:absolute;inset:0;padding-top:6px">${c.items.map((it,i)=>`<button class="kline" style="display:block;width:calc(100% - 16px);text-align:left" data-a="mbline" data-x="${i}" data-g="mb-line-${i}"><div class="kr"><span><b>${esc(it.name)}</b><br>${it.qty} Item${it.qty>1?'s':''}${it.take?' · Take-away':''}${it.note?' · '+esc(it.note):''}</span><b>${c.ret?'-':''}${sek(lineTot(it))}</b></div>${it.mods.length?`<div class="kmods">${it.mods.map(m=>`<div><span>${m.qty>1?m.qty+' × ':''}${esc(m.name)}</span><span>${sek(m.price*m.qty)}</span></div>`).join('')}</div>`:''}${it.disc?`<div class="kmods" style="color:#ef1b1b"><div><span>Discount ${it.disc}%</span><span>-${sek(lineGross(it)-lineTot(it))}</span></div></div>`:''}</button>`).join('')}</div> ${b.sheet==='fn'?fnSheet():''}${b.sheet==='pay'?paySheet():''}</div>
 <div class="ktot">${promoRes(c).lines.map(l=>`<div class="krow" style="font-size:12px;color:#a855f7;font-weight:600"><span>${esc(l[0])}</span><span>-${sek(l[1])}</span></div>`).join('')}${c.svc&&!c.ret?`<div class="krow" style="font-size:12px"><span>Service charge (${SVC}%):</span><span>${sek(svcAmt(c))}</span></div>`:''}${c.amtPaid?`<div class="krow" style="font-size:12px"><span>Paid: ${sek(c.amtPaid)}</span><span style="color:#1677ff">Remaining: ${sek(rest(c))}</span></div>`:''}${c.disc?`<div class="krow" style="font-size:12px"><span>Basket Discount (${c.disc.pct}%)</span><span style="color:#ef1b1b">-${sek(discAmt(c))}</span></div>`:''}${c.split?`<div class="krow" style="font-size:12px"><span>Split evenly: ${c.split.paid} of ${c.split.n} paid</span><span>${sek(toPay(c))} each</span></div>`:''}<div class="krow"><span><b style="font-size:15px">${c.ret?'Receiving':'Total'}</b> <span style="color:#666;font-size:12px">${c.ret?'':`(${n?n+' Item'+(n>1?'s':''):'No Items'})`}</span></span><b>${c.ret?'-':''}${sek(Math.abs(total(c)))}</b></div></div>
 <div class="kact2"><button class="kfnb" data-a="mbsheet" data-x="fn" data-g="mb-functions">FUNCTIONS</button><button class="kchg ${c.ret?'kred':''}" ${c.items.length?'':'disabled'} data-a="mbsheet" data-x="pay" data-g="mb-charge">CHARGE</button></div>
 ${b.sheet==='more'?moreMenu():''}`}

const moreMenu=()=>{const c=M().cart;return `<div class="kscrim" style="background:transparent" data-a="mbsheetx"></div><div class="kmoremenu">
 <button data-a="mbmorei" data-x="note" data-g="mb-m-note">${icon('edit_note')}Order notes</button><button data-a="mbmorei" data-x="take" data-g="mb-m-take">${icon('takeout_dining')}Take-away${c.take?'<span class="ktg kon"></span>':''}</button><button data-a="mbmorei" data-x="guests" data-g="mb-m-guests">${icon('group_add')}Add guests</button><button data-a="mbmorei" data-x="cust" data-g="mb-m-cust">${icon('person_add')}Add Customer</button><button data-a="mbmorei" data-x="svc" data-g="mb-m-svc">${icon('room_service')}${c.svc?'Remove':'Add'} Service Charge</button><button data-a="mbmorei" data-x="tip" data-g="mb-m-tip">${icon('volunteer_activism')}Tipping<span class="ktg ${c.tip?'kon':''}"></span></button><button disabled>${icon('restaurant')}Courses</button></div>`};
const fnSheet=()=>`<div class="kscrim" data-a="mbsheetx"></div><div class="ksheet"><h4>Choose Function</h4><button class="kx" data-a="mbsheetx" data-g="mb-sheet-x">${icon('cancel')}</button><div class="kfgrid"><button data-a="mbfn" data-x="drawer" data-g="mb-fn-drawer">${icon('point_of_sale')}Cash drawer</button><button data-a="mbfn" data-x="disc" data-g="mb-fn-disc" ${M().cart.items.length?'':'disabled'}>${icon('percent')}Discount</button><button data-a="mbfn" data-x="splitamt" data-g="mb-fn-splitamt" ${M().cart.items.length?'':'disabled'}>${icon('receipt_long')}Split by amount</button><button disabled>${icon('checklist')}Split by items</button><button data-a="mbfn" data-x="spliteven" data-g="mb-fn-spliteven" ${M().cart.items.length?'':'disabled'}>${icon('call_split')}Split evenly</button></div></div>`;
const paySheet=()=>{const c=M().cart;let L=PM();if(c.ret){const o=M().orders.find(x=>x.id===c.ret);const ms=o?[...new Set(o.pay.map(p=>p.m))]:['cash'];L=L.filter(p=>ms.includes(p.id))}
 return `<div class="kscrim" data-a="mbsheetx"></div><div class="ksheet"><h4>Choose Payment Method</h4><button class="kx" data-a="mbsheetx" data-g="mb-sheet-x">${icon('cancel')}</button><div class="kfgrid kpay ${c.ret?'kred':''}">${L.map(p=>`<button data-a="mbpay" data-x="${p.id}" data-g="mb-pay-${p.id}">${icon(p.ic)}${p.t}${c.ret?`<small style="font-weight:400">-${sek(Math.abs(total(c)))}</small>`:''}</button>`).join('')}</div></div>`};

/* ── vyer ── */
const V={};
V.prod=()=>{const b=U();const p=S.products.find(x=>x.id===b.pid);if(!p)return '';const ms=modsOf(p);const sel=b.sel;const modsum=ms.reduce((a,m)=>a+Object.entries(sel[m.id]||{}).reduce((s,[i,q])=>s+m.opts[i].price*q,0),0);
 const ok=ms.every(m=>!(m.req||m.variant)||Object.keys(sel[m.id]||{}).length)&&(!p.open||+(UI.f.mbprice||0)>0);
 return `${vhead(esc(p.name))}<button style="position:absolute;left:14px;top:14px;color:#1677ff" data-a="mbpedit" data-g="mb-pedit">${icon('edit',20)}</button><div class="kvb"><div style="font-size:16px;margin:4px 0 8px">${esc(p.name)}</div><div><button class="krad ${b.take?'':'kon'}" data-a="mbtake" data-x="0" data-g="mb-eatin"><i></i>Eat in</button><button class="krad ${b.take?'kon':''}" data-a="mbtake" data-x="1" data-g="mb-takeaway"><i></i>Take-away</button></div>
 ${p.open?`<div style="margin:10px 0">${'<input class="kfld" data-in="mbprice" data-live="1" data-g="in-mbprice" inputmode="decimal" placeholder="Price (SEK)" value="'+esc(UI.f.mbprice||'')+'">'}</div>`:`<div style="font-size:20px;font-weight:700;margin-top:8px">${sek(p.price)}</div>`}${modsum?`<div style="color:#888;font-size:11.5px">Modifiers: ${sek(modsum)}</div>`:''}${b.idisc?`<div style="color:#ef1b1b;font-size:12px;margin-top:4px;display:flex;align-items:center;gap:6px">Item discount ${b.idisc}%${UI.f.mbidd?' · '+esc(UI.f.mbidd):''}<button style="color:#1677ff;font-size:12px" data-a="mbidiscx" data-g="mb-idisc-remove">Remove</button></div>`:''}
 <div style="margin-top:12px"><input class="kfld" data-in="mbnote" data-g="in-mbnote" placeholder="Note" value="${esc(UI.f.mbnote||'')}"></div>
 ${ms.map(m=>{const single=m.variant||!m.multi;const lab=single?'CHOOSE 1':`MAX ${m.max||m.opts.length} CHOICES`;return `<div class="ksec">${esc(m.name)} (${lab}):</div><div class="kchips">${m.opts.map((o,i)=>{const q=(sel[m.id]||{})[i];const on=q>0;return `<button class="kchip ${on?'kon':''}" data-a="mbopt" data-x="${m.id}|${i}" data-g="mb-o-${slug(m.name)}-${slug(o.name)}">${esc(o.name)}${o.price?' '+sek(o.price):''}${on&&!single?`<span class="kq">${q}<b data-a="mboptq" data-x="${m.id}|${i}|-1">−</b><b data-a="mboptq" data-x="${m.id}|${i}|1">+</b></span>`:''}</button>`}).join('')}</div>`}).join('')}</div>
 <div class="kvf"><div style="display:flex;gap:8px"><button class="kbtn kgr" style="width:46px;${b.idisc?'background:#1677ff;color:#fff':''}" data-a="mbidisc" data-g="mb-idisc">${icon('percent')}</button><div class="kqty">Quantity<span class="ksp"></span><b>${b.qty}</b><button data-a="mbqty" data-x="-1" data-g="mb-qty-minus">−</button><button data-a="mbqty" data-x="1" data-g="mb-qty-plus">+</button></div>${b.li!=null?`<button class="kbtn krd" style="width:46px" data-a="mbldel" data-g="mb-line-del">${icon('delete')}</button>`:''}</div><button class="kbtn" ${ok?'':'disabled'} data-a="mbadd" data-g="${b.li!=null?'mb-line-ok':'mb-add'}">${b.li!=null?'Update':'Add to Basket'}</button></div>`};
V.idisc=()=>`${vhead('Item Discount',{back:1,gb:'mb-idisc-back'})}<div class="kvb"><input class="kfld" data-in="mbidd" data-g="in-mbidd" placeholder="Discount Description" value="${esc(UI.f.mbidd||'')}"><div class="ksec">Discount buttons</div><div class="kchips">${discBtns().map(p=>`<button class="kpill kb" style="width:76px;justify-content:center;height:38px" data-a="mbidiscset" data-x="${p}" data-g="mb-idisc-${p}">${p}%</button>`).join('')}</div></div><div class="kvf"><button class="kbtn" data-a="mbview" data-x="idiscman" data-g="mb-idisc-manual">Manual Discount Input</button></div>`;
V.idiscman=()=>`${vhead('Manual Discount',{back:1})}<div class="kvb"><div class="klbl">Percentage</div><div class="kamt">${U().kp||'0'} %</div>${keypad('mb-idk')}</div><div class="kvf"><button class="kbtn" ${+U().kp>0&&+U().kp<=100?'':'disabled'} data-a="mbidiscset" data-x="kp" data-g="mb-idisc-apply">Add Discount</button></div>`;
V.pedit=()=>{const b=U(),p=S.products.find(x=>x.id===b.pid);if(!p)return '';const e=b.pe;const row=(l,v,a,g)=>`<button class="kmenu-i" style="border-radius:4px;margin-bottom:8px;border:0" ${a?`data-a="${a}"`:''} ${g?`data-g="${g}"`:''}>${l}<span class="kch" style="color:#333">${v}</span>${a?`<span style="color:#1677ff">${icon('chevron_right',18)}</span>`:''}</button>`;
 return `${vhead('Edit product',{back:1,gb:'mb-pedit-back'})}<div class="kvb"><label class="kmenu-i" style="border-radius:4px;margin-bottom:8px;border:0">Name*<input data-in="mbpe_name" data-g="in-mbpe_name" value="${esc(UI.f.mbpe_name??p.name)}" style="border:0;background:none;font:inherit;flex:1;outline:0"></label>${row('Product group*',esc((G(e.gid)||{}).name||''),'mbpegrp','mb-pe-grp')}${e.grpOpen?`<div class="kgrpbox" style="margin:-4px 0 8px">${S.groups.filter(g=>g.id!=='g-gift').map(g=>`<button class="kmenu-i" style="background:${g.id===e.gid?'#d9ecff':'#f6f6f8'}" data-a="mbpegid" data-x="${g.id}" data-g="mb-pe-g-${slug(g.name)}">${esc(g.name)}</button>`).join('')}</div>`:''}
 <div class="ksec">Price*</div><div><button class="krad ${e.open?'':'kon'}" data-a="mbpeopen" data-x="0" data-g="mb-pe-fixed"><i></i>Fixed price</button><button class="krad ${e.open?'kon':''}" data-a="mbpeopen" data-x="1" data-g="mb-pe-var"><i></i>Variable price</button></div>
 ${e.open?'':`<label class="kmenu-i" style="border-radius:4px;margin:8px 0;border:0">Default price (${p.vat||12}% VAT)<input data-in="mbpe_price" data-g="in-mbpe_price" inputmode="decimal" value="${esc(UI.f.mbpe_price??String(p.price))}" style="border:0;background:none;font:inherit;text-align:right;width:90px;outline:0"> SEK</label>`}
 <button class="kmenu-i" style="border-radius:4px;margin:8px 0;border:0" data-a="mbpetog" data-x="take" data-g="mb-pe-take">${icon('info')}Avhämtning (moms 6%)<span class="kch"><span class="ktgl ${e.take?'kon':''}"></span></span></button>
 <div class="ksec" style="text-transform:none;font-size:13px">Additional information</div>
 <label class="kmenu-i" style="border-radius:4px;margin-bottom:8px;border:0;flex-direction:column;align-items:stretch">Description<textarea data-in="mbpe_desc" style="border:0;background:none;font:inherit;font-size:12px;resize:none;outline:0" rows="2" placeholder="Beskrivning som visas online">${esc(UI.f.mbpe_desc??(p.desc||''))}</textarea></label>
 ${row('Unit','Units')}${row('Location','All')}
 <button class="kmenu-i" style="border-radius:4px;margin-bottom:2px;border:0" data-a="mbpetog" data-x="sold" data-g="mb-pe-sold">Can be sold<span class="kch"><span class="ktgl ${e.sold?'kon':''}"></span></span></button><div style="font-size:10.5px;color:#888;margin-bottom:8px">If turned off, the product will still appear on the till and in Online channels, but it can't be added to the basket</div>
 ${row('Choose modifiers',modsOf(p).length+' selected modifiers')}${row('Product note','None')}
 <label class="kmenu-i" style="border-radius:4px;margin-bottom:8px;border:0">SKU<input data-in="mbpe_sku" placeholder="Input SKU" value="${esc(UI.f.mbpe_sku||'')}" style="border:0;background:none;font:inherit;flex:1;outline:0"></label>
 <label class="kmenu-i" style="border-radius:4px;margin-bottom:8px;border:0">EAN<input data-in="mbpe_ean" placeholder="Input EAN" value="${esc(UI.f.mbpe_ean||'')}" style="border:0;background:none;font:inherit;flex:1;outline:0">${icon('barcode_scanner')}</label>
 ${row('Stock','Product is not stock tracked')}</div>
 <div class="kvf" style="grid-template-columns:1fr 1fr 1fr"><button class="kbtn" style="background:#ef1b1b" data-a="mbpedel" data-g="mb-pe-del">${icon('delete',16)} Delete</button><button class="kbtn" data-a="mbpesave" data-x="copy" data-g="mb-pe-copy">${icon('content_copy',16)} Save &amp; copy</button><button class="kbtn" data-a="mbpesave" data-g="mb-pe-save">${icon('save',16)} Save</button></div>`};
V.line=()=>{const b=U(),c=M().cart,it=c.items[b.li];if(!it)return '';return `${vhead(esc(it.name))}<div class="kvb"><div style="font-size:20px;font-weight:700">${sek(lineTot(it))}</div>${it.mods.map(m=>`<div style="font-size:12.5px;color:#555">${esc(m.name)} ${sek(m.price)}</div>`).join('')}</div><div class="kvf"><div class="kqty">Quantity<span class="ksp"></span><b>${it.qty}</b><button data-a="mblq" data-x="-1" data-g="mb-lq-minus">−</button><button data-a="mblq" data-x="1" data-g="mb-lq-plus">+</button></div><button class="kbtn krd" data-a="mbldel" data-g="mb-line-del">${icon('delete',18)} Remove item</button><button class="kbtn" data-a="mbclose" data-g="mb-line-ok">Update Basket</button></div>`};
V.search=()=>{const q=(UI.f.mbq||'').trim().toLowerCase();const L=q?S.products.filter(p=>p.name.toLowerCase().includes(q)&&p.gid!=='g-gift'):[];const GL=q?S.groups.filter(g=>g.name.toLowerCase().includes(q)):[];
 return `<div class="khd"><div style="flex:1;display:flex;align-items:center;gap:6px;background:#f0f0f2;border-radius:18px;padding:0 10px;height:36px">${icon('search')}<input data-in="mbq" data-live="1" data-g="in-mbq" placeholder="Search" value="${esc(UI.f.mbq||'')}" style="border:0;background:none;flex:1;font:inherit;outline:0"></div><button style="color:#1677ff;font-size:13px" data-a="mbclose" data-g="mb-search-cancel">Cancel</button></div>
 <div style="display:flex;gap:6px;padding:4px 12px 6px"><span class="kpill kb" style="height:28px;font-size:11.5px">Products (${L.length})</span><span class="kpill kg" style="height:28px;font-size:11.5px">Groups (${GL.length})</span><span class="kpill kg" style="height:28px;font-size:11.5px">Subgroups (0)</span></div>
 <div class="kvb">${L.map(p=>{const g=G(p.gid)||{};return `<button class="kres" data-a="mbprod" data-x="${p.id}" data-g="mb-r-${slug(p.name)}"><span class="kim" style="background:${g.color||'#ddd'}"></span><span style="flex:1"><b>${esc(p.name)}</b><br><span class="kgt">${esc(g.name||'')}</span></span><b style="align-self:flex-end">${p.open?'Open':sekS(p.price)}</b></button>`}).join('')}</div>${navBar()}`};
V.disc=()=>`${vhead('Basket Discount')}<div class="kvb"><input class="kfld" data-in="mbdd" data-g="in-mbdd" placeholder="Discount Description" value="${esc(UI.f.mbdd||'')}"><div class="ksec">Discount buttons</div><div class="kchips">${discBtns().map(p=>`<button class="kpill kb" style="width:76px;justify-content:center;height:38px" data-a="mbdisc" data-x="${p}" data-g="mb-disc-${p}">${p}%</button>`).join('')}</div></div><div class="kvf"><button class="kbtn" data-a="mbview" data-x="discman" data-g="mb-disc-manual">Manual Discount Input</button></div>`;
V.discman=()=>`${vhead('Manual Discount',{back:1})}<div class="kvb"><div class="klbl">Percentage</div><div class="kamt">${U().kp||'0'} %</div>${keypad('mb-dk')}</div><div class="kvf"><button class="kbtn" ${+U().kp>0&&+U().kp<=100?'':'disabled'} data-a="mbdisc" data-x="kp" data-g="mb-disc-apply">Add Discount</button></div>`;
V.split=()=>`${vhead('Split evenly')}<div class="kvb"><div class="klbl" style="margin-top:20px">How many ways do you want to split the bill?</div><div class="kchips" style="justify-content:center;margin-top:16px">${[2,3,4,5].map(n=>`<button class="kpill kb" style="width:56px;justify-content:center;height:44px;font-size:16px" data-a="mbsplit" data-x="${n}" data-g="mb-split-${n}">${n}</button>`).join('')}</div><div class="klbl" style="margin-top:16px">${sek(total(M().cart))} total</div></div>`;
V.openbal=()=>`${vhead('Open Balance')}<div class="kvb"><div class="klbl" style="margin-top:14px">Cash</div><div class="kamt">${U().kp||'0'} SEK</div>${keypad('mb-ob')}</div><div class="kvf"><div class="klbl">You need to open your cash balance to start selling</div><button class="kbtn" data-a="mbopenbal" data-g="mb-openbal">Open cash balance</button></div>`;
V.cash=()=>{const c=M().cart,due=Math.abs(toPay(c)),t=+(U().kp||0);return `${vhead('To pay: '+sek(due))}<div class="kvb"><div class="klbl" style="margin-top:8px;font-weight:600">${c.ret?'Cash to give back':'Tendered cash'}</div><div class="kamt">${U().kp||'0'} SEK</div><div class="klbl">Change: ${sek(Math.max(0,t-due))}</div>${c.ret?'':keypad('mb-ck')}</div><div class="kvf"><button class="kbtn" ${t?'disabled':''} data-a="mbcash" data-x="exact" data-g="mb-cash-exact">Proceed with ${sek(due)}</button>${c.ret?'':`<button class="kbtn" ${t>=due?'':'disabled'} data-a="mbcash" data-x="kp" data-g="mb-cash-proceed">Proceed</button>`}</div>`};
V.card=()=>{const c=M().cart,due=Math.abs(toPay(c)),b=U();return `<div class="kterm">${b.cardOk?`${icon('check_circle')}<div style="font-size:22px;font-weight:700">Godkänd</div><div>${sek(due)}</div>`:`<div style="font-size:12px;opacity:.7;letter-spacing:.1em">BETALNINGSAPP</div><div style="font-size:26px;font-weight:700">${sek(due+(b.tipPct?Math.round(due*b.tipPct)/100:0))}</div>${c.tip&&!c.ret?`<div style="font-size:12px;opacity:.8">Dricks?</div><div style="display:flex;gap:6px">${[0,5,10,15].map(p=>`<button style="border:1px solid #555;border-radius:6px;padding:6px 10px;color:#fff;${(b.tipPct||0)===p?'background:#1677ff;border-color:#1677ff':''}" data-a="mbtippct" data-x="${p}" data-g="mb-tip-${p}">${p?p+'%':'Ingen'}</button>`).join('')}</div>`:''}${icon('contactless')}<div>${c.ret?'Håll fram kortet för återbetalning':'Blippa, sätt i eller dra kortet'}</div><button class="kbtn" style="width:220px" data-a="mbcardtap" data-g="mb-card-tap">Simulera kort</button><button style="color:#aaa;font-size:12px" data-a="mbclose">Avbryt</button>`}</div>`};
V.retreason=()=>`${vhead('Return items',{back:1})}<div class="kvb"><div class="ksec">Reason</div><input class="kfld" data-in="mbreason" data-g="in-mbreason" value="${esc(UI.f.mbreason||'')}"><div class="ksec">Items without stock management</div>${M().cart.items.map(it=>`<div style="font-size:12.5px"><b>${it.qty}</b> &nbsp;<b>${esc(it.name)}</b></div>`).join('')}</div><div class="kvf"><button class="kbtn" data-a="mbretnext" data-g="mb-ret-next">Next</button></div>`;
V.done=()=>{const o=M().orders.find(x=>x.id===U().lastOrder);if(!o)return '';const ret=o.ret;const sign=ret?'-':'';return `<div class="kok">${icon('check_circle')} Checkout Successful</div><div class="klbl" style="margin-top:6px">Order nr: ${o.id}</div><div class="kvb"><div class="kpaid"><div class="kr" style="font-size:17px;font-weight:700;margin-bottom:6px"><span>Paid:</span><span>${sign}${sek(Math.abs(U().lastAmt))}</span></div>${U().lastPay.map(p=>`<div class="kr"><b>${p.t}:</b><b>${sign}${sek(Math.abs(p.amt))}</b></div>${p.tip?`<div class="kr"><span>&nbsp; Tip:</span><span>${sek(p.tip)}</span></div>`:''}${p.tend!=null?`<div class="kr"><span>&nbsp; Tendered cash:</span><span>${sek(p.tend)}</span></div><div class="kr"><span>&nbsp; Change:</span><span>${sek(p.change)}</span></div>`:''}`).join('')}</div>${M().cart.split&&M().cart.split.paid<M().cart.split.n?`<div class="klbl">Part ${M().cart.split.paid} of ${M().cart.split.n} paid</div>`:''}</div><div style="text-align:center;font-weight:700;font-size:15px">Receipt?</div><div class="kvf" style="grid-template-columns:1fr 1fr"><button class="kbtn" data-a="mbrcpt" data-x="sms" data-g="mb-rc-sms">${icon('sms',16)} SMS</button><button class="kbtn" data-a="mbrcpt" data-x="email" data-g="mb-rc-email">${icon('mail',16)} Email</button><button class="kbtn" data-a="mbrcpt" data-x="print" data-g="mb-rc-print">${icon('print',16)} Print</button><button class="kbtn kgr" data-a="mbrcpt" data-x="skip" data-g="mb-rc-skip">Skip receipt</button></div>`};
V.rcptsend=()=>{const sms=U().rc==='sms';return `${vhead(sms?'Send receipt by SMS':'Send receipt by email',{back:1})}<div class="kvb"><div class="ksec">${sms?'Phone number':'Email'}</div><input class="kfld" data-in="mbrc" data-g="in-mbrc" placeholder="${sms?'+46 70 123 45 67':'name@example.com'}" value="${esc(UI.f.mbrc||'')}"></div><div class="kvf"><button class="kbtn" data-a="mbrcsend" data-g="mb-rc-send">Send</button></div>`};
V.note=()=>`${vhead('Order notes',{back:1})}<div class="kvb"><textarea class="kfld" style="height:120px;padding:10px" data-in="mbon" data-g="in-mbon" placeholder="Note">${esc(UI.f.mbon||'')}</textarea></div><div class="kvf"><button class="kbtn" data-a="mbnotesave" data-g="mb-note-save">Save</button></div>`;
V.guests=()=>`${vhead('Add guests',{back:1})}<div class="kvb"><div class="klbl" style="margin-top:14px">Guests</div><div class="kamt">${U().kp||'0'}</div>${keypad('mb-gk')}</div><div class="kvf"><button class="kbtn" data-a="mbguests" data-g="mb-guests-save">Save</button></div>`;
V.cust=()=>`${vhead('Add Customer',{back:1})}<div class="kvb">${(S.customers||[]).map(c=>`<button class="kres" data-a="mbcust" data-x="${c.id}" data-g="mb-cust-${slug(c.name)}"><span class="kim" style="background:#d9ecff;display:grid;place-items:center;color:#1677ff">${icon('person')}</span><span style="flex:1"><b>${esc(c.name)}</b><br><small style="color:#888">${esc(c.phone||'')}</small></span></button>`).join('')}</div>`;
V.parked=()=>{const b=U(),c=M().cart;const plans=S.plans||[];const pl=plans.find(p=>p.id===b.plan)||plans[0];const tab=b.ptab||'place';
 const occ=id=>PK.get(id);
 const rows=tab==='place'?(pl?pl.places.map(x=>{const o=occ(x.id);return `<button class="ktbl" style="${o?`background:#fff;border-color:${x.color}`:`background:${x.color};border-color:${x.color}`}" data-a="mbtbl" data-x="${x.id}" data-g="mb-tbl-${slug(x.name)}"><b style="font-size:12px">${esc(x.name)}</b>${o?`<small>(${sek(sub(o)-discAmt(o))})</small>`:''}</button>`}).join(''):'<div class="klbl">Inga bordskartor. Skapa en i Backstage.</div>')
  :PK.keys().map(id=>{const o=PK.get(id),t=tableById(id),raw=PL()[pkIdx(id)];return `<button class="ktbl" style="border-color:#ddd" data-a="mbtbl" data-x="${id}" data-g="mb-pl-${slug(t?t.name:(o.pname||id))}"><b style="font-size:12px">${esc(t?t.plan+' / '+t.name:(o.pname||'Order'))}</b><span style="font-size:11px;color:#888">${esc(raw.cashier||'iPad')} · ${esc(raw.parkedAt||'')}</span><small>(${sek(sub(o)-discAmt(o))})</small></button>`}).join('')||'<div class="klbl" style="margin-top:20px">No parked orders</div>';
 return `${vhead('Parked Orders')}<div class="kvb"><div class="ktabs"><button class="${tab==='place'?'kon':''}" data-a="mbptab" data-x="place" data-g="mb-ptab-place">Place</button><button class="${tab==='list'?'kon':''}" data-a="mbptab" data-x="list" data-g="mb-ptab-list">List</button></div>${tab==='place'&&plans.length?`<div style="color:#8e8e93;font-size:12px;margin-bottom:4px">Place</div><select class="kfld" style="background:#f0f0f2;border:0;margin-bottom:10px" onchange="UI.mb.plan=this.value;render()">${plans.map(p=>`<option value="${p.id}" ${p===pl?'selected':''}>${esc(p.name)}</option>`).join('')}</select>`:''}${rows}</div>
 ${b.conf?`<div class="kscrim"></div><div class="kconf">${b.conf.t}<div class="kb2"><button style="color:#ef1b1b" data-a="mbconf" data-x="0" data-g="mb-conf-no">Cancel</button><button style="color:#1677ff" data-a="mbconf" data-x="1" data-g="mb-conf-yes">Confirm</button></div></div>`:''}`};
V.pdetail=()=>{const b=U(),o=PK.get(b.pt),t=tableById(b.pt);if(!o)return '';const raw=PL()[pkIdx(b.pt)]||{};const tab=b.pdtab||'items';return `${vhead('Parked order: '+esc(t?t.name:o.pname))}<div class="kvb"><div class="kseg"><button class="${tab==='items'?'kon':''}" data-a="mbpdtab" data-x="items">Items</button><button class="${tab==='details'?'kon':''}" data-a="mbpdtab" data-x="details">Details</button></div>${tab==='items'?`<button class="kpill kg" style="width:100%;justify-content:center;border:1px solid #ddd;background:#fff;margin-bottom:12px" data-a="nop">${icon('swap_horiz')}Select individual items to move</button>${o.items.map(it=>`<div style="display:flex;justify-content:space-between;font-size:12.5px;padding:6px 0;border-bottom:1px solid #f0f0f0"><span><b>${esc(it.name)}</b><br>${it.qty} Item${it.qty>1?'s':''}</span><span>${sek(lineTot(it))}</span></div>`).join('')}`:`<div style="font-size:12.5px;line-height:1.9">Table: ${esc(t?t.plan+' / '+t.name:'–')}<br>Parked by: ${esc(raw.cashier||'iPad')}<br>Updated: ${esc(raw.parkedAt||'')}<br>Guests: ${o.guests||0}<br>Total: ${sek(sub(o)-discAmt(o))}</div>`}</div><div class="kvf"><button class="kbtn krd" data-a="mbpdrm" data-g="mb-pd-remove">${icon('delete',16)} Remove order</button><button class="kbtn" data-a="mbpdmove" data-g="mb-pd-move">${icon('swap_horiz',16)} Move</button><button class="kbtn" data-a="mbpdbill" data-g="mb-pd-bill">${icon('receipt',16)} Print Bill</button><button class="kbtn" data-a="mbpdadd" data-g="mb-pd-add">${icon('shopping_basket',16)} Add to basket</button></div>`};
V.menu=()=>{const it=(ic,t,a,x,g)=>`<button class="kmenu-i" data-a="${a||'mbstub'}" data-x="${x||t}" ${g?`data-g="${g}"`:''}>${icon(ic)}${t}<span class="kch">${icon('chevron_right',18)}</span></button>`;
 return `${vhead('My Store')}<div class="kvb"><div style="display:flex;justify-content:space-between;background:#ececee;border-radius:4px;padding:14px 10px;margin-bottom:12px"><b style="font-weight:500;font-size:15px">Cash register 1</b><span style="font-size:12px">demo@kaffebaren.se</span></div>
 <button class="kbigb" style="width:100%;height:64px;margin-bottom:8px" data-a="mbview" data-x="zrep" data-g="mb-zreport">${icon('summarize')}Z-Report</button><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button class="kbigb" style="height:64px" data-a="mbview" data-x="orders" data-g="mb-orderhist">${icon('receipt_long')}Order History</button><button class="kbigb" style="height:64px" data-a="mbview" data-x="help" data-g="mb-help">${icon('help')}Help</button></div>
 <div class="ksec">News</div><div style="background:#ececee;color:#1677ff;padding:10px;font-size:12.5px;border-radius:4px;display:flex;justify-content:space-between;cursor:pointer" data-a="mbinfo" data-x="Nyheterna öppnas som en lista med senaste versionerna av kassan">Nyheter i Yabie: mobilkassa, bordskartor och kampanjer<span class="kbdg" style="position:static">5</span></div>
 <div class="ksec">Store</div><div class="kgrpbox">${it('list_alt','Order History (Returns &amp; Receipt copy)','mbview','orders','mb-m-orders')}${it('analytics','Reports','mbview','reports','mb-m-reports')}${it('menu_book','Product Catalog','mbview','catsync','mb-m-catalog')}</div>
 <div class="ksec">Administration</div><div class="kgrpbox">${it('badge','Time Tracking','mbview','timetrack','mb-m-time')}${it('redeem','Yabie gift cards','mbview','giftcards','mb-m-gift')}${it('volunteer_activism','Tipping','mbview','tipping','mb-m-tipping')}${it('person','Customers','mbview','customers','mb-m-customers')}${it('restaurant','Courses','mbview','courses','mb-m-courses')}</div>
 <div class="ksec">Customer benefits</div><div class="kgrpbox">${it('sell','Promotions','mbview','promos','mb-m-promos')}${it('loyalty','Loyalty members','mbview','loyalty','mb-m-loyalty')}</div>
 <div class="ksec">Settings</div><div class="kgrpbox">${it('dashboard_customize','Layouts/Start Pages','mbview','layouts','mb-m-layouts')}${it('credit_card','Payment Methods','mbview','paymeth','mb-m-paymeth')}${it('tune','Functions','mbview','functions','mb-m-functions')}${it('percent','Discount Buttons','mbview','discbtns','mb-m-discbtns')}${it('group','Guests','mbview','guestset','mb-m-guestset')}${it('account_circle','Cashier Management','mbview','cashier','mb-m-cashier')}${it('settings','Other Settings','mbview','settings','mb-m-settings')}</div>
 <div class="ksec">Hardware</div><div class="kgrpbox">${it('print','Printers','mbview','printers','mb-m-printers')}${it('tv','Customer Display','mbview','custdisp','mb-m-custdisp')}${it('point_of_sale','Cash Drawer','mbview','drawer','mb-m-drawer')}</div>
 <div class="ksec">Other</div><div class="kgrpbox">${it('help','Support','mbview','support','mb-m-support')}${it('info','About','mbview','about','mb-m-about')}</div><button class="kmenu-i" style="margin-top:12px;color:#ef1b1b" data-a="mblogout" data-g="mb-logout">${icon('logout')}Logout from POS</button></div>`};
V.stub=()=>`${vhead(esc(U().stub),{back:1,close:false})}<div class="kvb"><div class="klbl" style="margin-top:40px">Den här vyn finns inte i demot ännu.<br>Öppna den i den riktiga kassan för att se mer.</div></div>`;
V.catsync=()=>`${vhead('Product Catalog',{back:1,close:false})}<div class="kvb"><div class="klbl" style="margin:20px 0">Produkter och grupper hämtas från Backstage. Synkronisera om en ändring inte syns.</div></div><div class="kvf"><button class="kbtn" data-a="mbsync" data-g="mb-sync">Synchronize product catalog</button></div>`;
V.printers=()=>`${vhead('Printers',{back:1,close:false})}<div class="kvb">${dev().printer?`<div class="kmenu-i" style="background:#d4f5df">${icon('print')}Built-in printer (${dev().t})<span class="kch" style="color:#14843f">Connected</span></div><div class="klbl" style="margin-top:10px">Kvitton skrivs ut på enhetens inbyggda skrivare.</div>`:`<div class="klbl" style="margin-top:20px">Ingen skrivare kopplad. ${dev().t} har ingen inbyggd skrivare. Kunden kan få kvittot via SMS eller e-post, eller så kopplar du en Bluetooth- eller nätverksskrivare.</div>`}</div>`;
V.about=()=>`${vhead('About',{back:1,close:false})}<div class="kvb" style="font-size:12.5px;line-height:2">Device: ${dev().t}<br>App: Yabie POS 3.38<br>Register: Cash register 1<br>Store: Kaffebaren</div>`;
V.orders=()=>{const q=(UI.f.mboq||'').toLowerCase();const L=M().orders.slice().reverse().filter(o=>!q||o.id.toLowerCase().includes(q));return `${vhead('Order History',{back:1,gb:'mb-oh-back'})}<div class="kvb"><div style="display:flex;align-items:center;gap:6px;background:#f0f0f2;border-radius:18px;padding:0 10px;height:34px">${icon('search')}<input data-in="mboq" data-live="1" placeholder="Search" value="${esc(UI.f.mboq||'')}" style="border:0;background:none;flex:1;font:inherit;outline:0"></div>
 <div style="background:#ececee;border-radius:4px;margin:10px 0;padding:4px 10px"><div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0">From:<span class="kpill kb" style="height:28px">${new Date(Date.now()-30*864e5).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span></div><div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0">To:<span class="kpill kb" style="height:28px">${new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span></div></div>
 ${L.map((o,i)=>`<button class="kord" data-a="mborder" data-x="${o.id}" data-g="mb-ord-${i}"><div class="kr"><span>${o.id}</span><span>${o.ret?'-':''}${sek(Math.abs(o.total))}</span></div><div style="color:#888;font-size:11.5px;margin:2px 0 4px">${o.at}</div><span class="ktag kg">${o.ret?'Returned':'Paid'}</span>${[...new Set(o.pay.map(p=>p.t))].map(t=>`<span class="ktag">${t}</span>`).join('')}${Object.keys(o.returned||{}).length?'<span class="ktag kr">Partly returned</span>':''}</button>`).join('')||'<div class="klbl" style="margin-top:30px">Inga ordrar ännu. Sälj något först.</div>'}</div>`};
V.order=()=>{const b=U(),o=M().orders.find(x=>x.id===b.oid);if(!o)return '';const rs=b.rsel;const sel=rs&&Object.values(rs).some(Boolean);const left=i=>o.items[i].qty-((o.returned||{})[i]||0);
 return `${vhead('Order',{back:1})}<div class="kvb"><div style="font-size:12px;line-height:1.6"><b>Order number:</b> ${o.id}<br><b>Customer:</b> ${esc(o.cust||'Walk-in Customer')}<br><b>Store:</b> Kaffebaren<br><b>Created:</b> ${o.at}</div><hr style="border:0;border-top:1px solid #ddd">
 ${o.ret?'':`<div style="display:flex;justify-content:${rs?'space-between':'flex-end'};margin:6px 0">${rs?`<button class="kpill kg" style="background:#fff;border:1px solid #ddd" data-a="mbrall" data-g="mb-ret-all"><span class="kcb ${o.items.every((x,i)=>!left(i)||rs[i])?'kon':''}"></span>Check everything</button><button class="kpill kg" style="background:#fff;border:1px solid #ddd" data-a="mbrsel" data-x="off" data-g="mb-ret-cancel">Cancel</button>`:`<button class="kpill kg" style="background:#fff;border:1px solid #ddd" data-a="mbrsel" data-x="on" data-g="mb-ret-select">${icon('remove_shopping_cart')}Select items to return</button>`}</div>`}
 <div style="background:#e4e4e6;padding:6px 8px;font-weight:700;font-size:12.5px">Items (${o.items.length})</div>${o.items.map((it,i)=>`<button style="display:flex;gap:8px;width:100%;text-align:left;padding:8px;border-bottom:1px solid #eee;font-size:12.5px" ${rs&&left(i)?`data-a="mbrtog" data-x="${i}" data-g="mb-ret-item-${i}"`:'data-a="nop"'}>${rs?`<span class="kcb ${rs[i]?'kon':''}" style="${left(i)?'':'opacity:.3'}"></span>`:''}<span style="flex:1"><b>${esc(it.name)}</b>${o.disc?`<br><span style="color:#666">Basket Discount (${o.disc.pct}%)</span>`:''}<br>${it.qty} <span class="ktag kg">${(o.returned||{})[i]?'Returned '+o.returned[i]:'Paid'}</span></span><span style="text-align:right">${sek(lineTot(it))}${o.disc?`<br><span style="color:#ef1b1b">-${sek(lineTot(it)*o.disc.pct/100)}</span>`:''}</span></button>`).join('')}
 <div style="background:#e4e4e6;padding:6px 8px;font-weight:700;font-size:12.5px;margin-top:10px">History</div><div style="background:#f6f6f7;padding:8px;font-size:12px;line-height:1.7"><div style="display:flex;justify-content:space-between"><span>Excluding VAT:</span><span>${sek(Math.abs(o.total)/1.12)}</span></div><div style="display:flex;justify-content:space-between"><span>VAT:</span><span>${sek(Math.abs(o.total)-Math.abs(o.total)/1.12)}</span></div><div style="display:flex;justify-content:space-between"><span>Paid now:</span><span>${sek(o.total)}</span></div><div style="display:flex;justify-content:space-between;font-weight:700;font-size:14px"><span>Left to pay:</span><span>SEK0.00</span></div>Payments: <b>${[...new Set(o.pay.map(p=>p.t))].join(', ')}</b><div style="text-align:right"><button style="color:#1677ff" data-a="mbrcopy" data-g="mb-rcopy">${icon('receipt',16)} Receipt Copy</button></div></div></div>
 ${o.ret?'':`<div class="kvf"><button class="kbtn" ${sel?'':'disabled'} data-a="mbretgo" data-g="mb-ret-go">${sel?'Return selected items':'Select items to return'}</button></div>`}`};
V.zrep=()=>{const b=U();const ck=k=>b.zck[k];const X=b.zmode==='x';const past=X?(M().xs||[]):M().z;return `${vhead(X?'Current daily sales (X-report)':'End of Day',{back:1,close:false,gb:'mb-z-back'})}<div class="kvb"><div style="background:#ececee;border-radius:4px">${[['print','Print'],['email','Email'],['screen','Show on Screen']].map(([k,t])=>`<button style="display:flex;justify-content:space-between;width:100%;padding:12px 10px;border-bottom:1px solid #e0e0e2;font-size:12.5px" data-a="mbzck" data-x="${k}" data-g="mb-z-${k}">${t}<span class="kcb ${ck(k)?'kon':''}"></span></button>`).join('')}</div><div class="ksec">Recipient's email</div><input class="kfld" data-in="mbzmail" value="${esc(UI.f.mbzmail??'demo@kaffebaren.se')}"><button class="kbtn" style="margin-top:12px" data-a="mbzcreate" data-g="mb-z-create">Create Report</button><div class="ksec">Past reports</div>${past.slice().reverse().map((z,i)=>`<button class="kmenu-i" data-a="mbzopen" data-x="${past.length-1-i}">${z.at}<span class="kch">${icon('chevron_right',18)}</span></button>`).join('')||'<div class="klbl">Inga tidigare rapporter</div>'}</div>`};
V.zshow=()=>{const X=U().zmode==='x';const z=(X?(M().xs||[]):M().z)[U().zi];if(!z)return '';return `${vhead((X?'X-Report #':'Z-Report #')+z.n,{back:1,close:false,gb:'mb-zs-back'})}<div class="kvb" style="font:12px/1.8 ui-monospace,Menlo,monospace">Kaffebaren · Cash register 1<br>${z.at}<hr>Sales: ${z.cnt}<br>Gross sales: ${sek(z.gross)}<br>Discounts: -${sek(z.disc)}<br>Returns: -${sek(z.ret)}<br><b>Net sales: ${sek(z.gross-z.disc-z.ret)}</b><hr>${Object.entries(z.pay).map(([k,v])=>`${k}: ${sek(v)}`).join('<br>')||'Inga betalningar'}<hr>Cash float: ${sek(z.float||0)}<br>Cash added/removed: ${sek(z.mv||0)}<br>Expected cash in drawer: ${sek((z.float||0)+(z.pay.Cash||0)+(z.mv||0))}${X?'<br><i>X-rapporten nollställer inget.</i>':''}</div><div class="kvf"><button class="kbtn" data-a="mbzdone" data-g="mb-z-done">Done</button></div>`};

/* ── fler vyer (kartlagda i demomiljön okt 2026) ── */
const ST=()=>{const m=M();if(!m.set)m.set={disc:[5,10,20,50],guests:'manual',cashier:false,scanner:false,scanArea:true,tableTap:'details',defTake:false,cdAuto:false,cdConn:false,courses:[{n:'Förrätt',w:false},{n:'Varmrätt',w:true},{n:'Mellanrätt',w:false},{n:'Dessert',w:true}],tips:[],shifts:1,layouts:[],layout:''};return m.set};
const discBtns=()=>ST().disc;
const cashSales=()=>{const m=M();return m.orders.slice(m.zSince).reduce((a,o)=>a+o.pay.filter(p=>p.m==='cash').reduce((s,p)=>s+p.amt,0),0)};
const drawerBal=()=>{const m=M();if(m.float==null)return 0;return Math.round(((m.float||0)+cashSales()+(m.moves||[]).reduce((a,x)=>a+(x.t==='add'?x.amt:-x.amt),0))*100)/100};
const tgl=on=>`<span class="ktgl ${on?'kon':''}"></span>`;
const row=(t,{a,x,g,v,dis,blue}={})=>`<button class="kmenu-i" ${dis?'disabled style="color:#aaa"':''} ${blue?'style="color:#1677ff"':''} ${a?`data-a="${a}"`:''} ${x!=null?`data-x="${x}"`:''} ${g?`data-g="${g}"`:''}>${t}<span class="kch">${v!=null?`<span style="color:#333;margin-right:6px">${v}</span>`:''}${a&&!blue?icon('chevron_right',18):''}</span></button>`;
const box=h=>`<div class="kgrpbox" style="margin-bottom:12px">${h}</div>`;
const note=t=>`<div style="font-size:11px;color:#888;margin:-8px 2px 12px">${t}</div>`;
const rad=(on,t,a,x,g)=>`<button class="kmenu-i" data-a="${a}" data-x="${x}" ${g?`data-g="${g}"`:''}><span class="krad ${on?'kon':''}" style="margin:0"><i></i></span>${t}</button>`;
const kpd=pre=>`<div class="kkp">${['1','2','3','4','5','6','7','8','9','.','0','⌫'].map(k=>`<button data-a="mbkey" data-x="${k}" data-g="${pre}-${k==='⌫'?'del':k==='.'?'dot':k}">${k==='⌫'?icon('backspace',22):k}</button>`).join('')}</div>`;
V.splitamt=()=>{const c=M().cart,r=rest(c),v=+(U().kp||0);return `${vhead('Split by amount')}<div style="background:#ececee;text-align:center;padding:8px;font-size:12.5px">Max<br><span style="color:#1677ff">${sek(r)}</span></div><div class="kvb"><div class="kamt" style="margin-top:16px">${U().kp||'0'} SEK</div>${kpd('mb-sa')}</div><div class="kvf"><button class="kbtn" ${v>0&&v<=r+0.001?'':'disabled'} data-a="mbsplitamt" data-g="mb-sa-charge">Charge</button></div>`};
V.drawer=()=>{const m=M(),open=m.float!=null;return `${vhead('Cash Drawer',{back:1,gb:'mb-dr-back'})}<div class="kvb"><div class="klbl" style="margin-top:10px">Current Balance</div><div class="kamt">${sek(drawerBal())}</div><div style="height:16px"></div>
 ${box(row('Open Balance',{a:open?null:'mbdr',x:'open',g:'mb-dr-open',dis:open}))}${box(row('Add Cash',{a:'mbdr',x:'add',g:'mb-dr-add',dis:!open})+row('Remove Cash',{a:'mbdr',x:'remove',g:'mb-dr-remove',dis:!open}))}${box(row('Open Drawer',{a:'mbdr',x:'kick',g:'mb-dr-kick',blue:1}))}${box(row('Close Balance',{a:'mbdr',x:'close',g:'mb-dr-close',dis:!open}))}
 ${(m.moves||[]).length?`<div class="ksec">Today</div>${m.moves.map(x=>`<div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 2px;border-bottom:1px solid #eee"><span>${x.t==='add'?'Add Cash':'Remove Cash'}${x.note?' · '+esc(x.note):''}</span><b style="color:${x.t==='add'?'#14843f':'#c62828'}">${x.t==='add'?'+':'-'}${sek(x.amt)}</b></div>`).join('')}`:''}</div>`};
V.cashmove=()=>{const add=U().cm==='add';return `${vhead(add?'Add Cash':'Remove Cash',{back:1,gb:'mb-cm-back'})}<div class="kvb"><div class="klbl" style="margin-top:8px">Cash</div><div class="kamt">${U().kp||'0'} SEK</div><input class="kfld" style="margin-top:12px" data-in="mbcmn" data-g="in-mbcmn" placeholder="Note" value="${esc(UI.f.mbcmn||'')}">${keypad('mb-cm')}</div><div class="kvf"><button class="kbtn" ${+U().kp>0?'':'disabled'} data-a="mbcmsave" data-g="mb-cm-save">Update cash balance</button></div>`};
V.closebal=()=>`${vhead('Close Balance',{back:1,gb:'mb-cb-back'})}<div class="kvb"><div class="klbl" style="margin-top:8px">Cash</div><div class="kamt">${U().kp||'0'} SEK</div><div class="klbl">Expected in drawer: ${sek(drawerBal())}</div>${keypad('mb-cb')}</div><div class="kvf"><button class="kbtn" data-a="mbclosebal" data-g="mb-cb-save">Close Balance</button></div>`;
V.reports=()=>`${vhead('Reports',{back:1,gb:'mb-rep-back'})}<div class="kvb" style="padding-top:10px">${[['zrep','End of Day (Z-report)','Ends the working day with all transactions from the last End of Day.','mb-rep-z'],['xrep','Current daily sales (X-report)','See all current sales without affecting the End of Day.','mb-rep-x'],['journal','Journals','An overview of all transactions made during the lifetime of the device.','mb-rep-j'],['periodic','Periodic report (monthly report)','An overview of your sales over a certain period of time.','mb-rep-p']].map(([v,t,d,g])=>box(row(t,{a:'mbview',x:v,g}))+note(d)).join('')}</div>`;
const today=()=>new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
const dates=()=>`<div class="ksec">Select date range for report</div>${box(`<div class="kmenu-i">Start<span class="kch"><span class="kpill kb" style="height:28px">${today()}</span></span></div><div class="kmenu-i">End<span class="kch"><span class="kpill kb" style="height:28px">${today()}</span></span></div>`)}`;
const mailf=()=>`<div class="ksec">Recipient's email</div><input class="kfld" data-in="mbzmail" value="${esc(UI.f.mbzmail??'demo@kaffebaren.se')}">`;
const cks=()=>{const ck=k=>U().zck[k];return `<div style="background:#ececee;border-radius:4px">${[['print','Print'],['email','Email'],['screen','Show on Screen']].map(([k,t])=>`<button style="display:flex;justify-content:space-between;width:100%;padding:12px 10px;border-bottom:1px solid #e0e0e2;font-size:12.5px" data-a="mbzck" data-x="${k}" data-g="mb-z-${k}">${t}<span class="kcb ${ck(k)?'kon':''}"></span></button>`).join('')}</div>`};
V.journal=()=>`${vhead('Journals',{back:1,close:false,gb:'mb-j-back'})}<div class="kvb">${dates()}${mailf()}<button class="kbtn" style="margin-top:12px" data-a="mbrepsend" data-x="Journal" data-g="mb-j-create">Create Report</button></div>`;
V.periodic=()=>`${vhead('Periodic Report',{back:1,close:false,gb:'mb-p-back'})}<div class="kvb">${cks()}${dates()}${mailf()}<button class="kbtn" style="margin-top:12px" data-a="mbrepsend" data-x="Periodic report" data-g="mb-p-create">Create Report</button></div>`;
V.timetrack=()=>{const b=U();return `${vhead('Time Tracking',{back:1,gb:'mb-tt-back'})}<div class="kvb">${box(row('Already signed in users',{v:ST().shifts}))}<div style="background:#e3f0ff;color:#1677ff;border-radius:4px;padding:10px;font-size:12px;margin:8px 30px;display:flex;gap:6px;align-items:center">${icon('info',16)}Enter your PIN to start or end your shift</div><div style="background:#f2f2f4;border-radius:4px;margin:8px 30px;height:40px;display:flex;align-items:center;justify-content:center;gap:10px">${[0,1,2,3].map(i=>`<span style="width:10px;height:10px;border-radius:50%;border:1.5px solid #999;${(b.kp||'').length>i?'background:#1677ff;border-color:#1677ff':''}"></span>`).join('')}</div>${keypad('mb-tt').replace(/<button data-a="mbkey" data-x="00"[^>]*>00<\/button>/,'<span></span>')}<div class="klbl">Demo: tryck valfria fyra siffror. Använd aldrig en riktig PIN här.</div></div>`};
const TTN=p=>{const c=(S.cashiers||[]).find(x=>x.pin===p);return c?c.name:'Personal '+p.replace(/./g,'•')};
V.ttconfirm=()=>{const b=U(),on=(ST().on=ST().on||{}),since=on[b.ttpin],n=TTN(b.ttpin||'');return `${vhead('Time Tracking',{back:1,gb:'mb-ttc-back'})}<div class="kvb" style="text-align:center"><div style="width:58px;height:58px;border-radius:50%;margin:22px auto 10px;display:grid;place-items:center;background:${since?'#ffe8e6':'#e6f6ec'};color:${since?'#ef1b1b':'#1f9d55'}">${icon('schedule',28)}</div><div style="font-weight:700;font-size:16px">${esc(n)}</div><div style="color:#6b6b70;font-size:12px;margin:4px 0 16px">${since?'Signed in since '+since.slice(12):'Not signed in'}</div>${box(row('Date',{v:now().slice(0,10)})+row(since?'Shift started':'Shift starts',{v:since?since.slice(12):now().slice(12)})+(since?row('Shift ends',{v:now().slice(12)}):''))}</div><div class="kvf">${since?`<button class="kbtn" style="background:#ef1b1b" data-a="mbttend" data-g="mb-tt-end">End shift</button>`:`<button class="kbtn" data-a="mbttstart" data-g="mb-tt-start">Start shift</button>`}<button class="kbtn kgr" data-a="mbback" data-g="mb-tt-cancel">Cancel</button></div>`};
const GIFT=[{n:'7299 0000 0010 01',v:100,s:'Active'},{n:'7299 0000 0010 02',v:250,s:'Active'},{n:'7299 0000 0010 03',v:0,s:'Void'},{n:'7299 0000 0010 04',v:300,s:'Expired',ph:'+46 70 000 00 04'}];
V.giftcards=()=>{const f=U().gf||'all';const L=GIFT.filter(g=>f==='all'||g.s===f);const act=GIFT.filter(g=>g.s==='Active');return `${vhead('Yabie gift cards',{back:1,gb:'mb-gc-back'})}<div class="kvb"><div style="font-size:12.5px;font-weight:700;line-height:1.5">Total active cards: ${act.length}<br>Total Value: ${sekS(act.reduce((a,g)=>a+g.v,0))}</div><div style="display:flex;align-items:center;gap:6px;background:#f0f0f2;border-radius:18px;padding:0 10px;height:34px;margin:10px 0">${icon('search')}<input placeholder="Search" style="border:0;background:none;flex:1;font:inherit;outline:0"></div><div style="display:flex;gap:6px;overflow:auto;padding-bottom:6px">${[['all','All Yabie gift cards'],['Active','Active'],['Frozen','Frozen'],['Expired','Expired'],['Void','Void']].map(([k,t])=>`<button class="kpill" style="height:28px;border:1px solid #1677ff;white-space:nowrap;${f===k?'background:#d9ecff':''}" data-a="mbgf" data-x="${k}" data-g="mb-gc-f-${k.toLowerCase()}">${t}</button>`).join('')}</div>${L.map(g=>`<div style="border-bottom:1px solid #ddd;padding:10px 4px"><div style="display:flex;justify-content:space-between;font-weight:600;font-size:13px">${g.n}<span>${sekS(g.v)}</span></div>${g.ph?`<div style="color:#888;font-size:12px">${icon('sms',14)} ${g.ph}</div>`:''}<span class="ktag ${g.s==='Active'?'kg':'kr'}">${g.s}</span></div>`).join('')||'<div class="klbl" style="margin-top:20px">Inga kort</div>'}</div>`};
V.tipping=()=>`${vhead('Tipping',{back:1,gb:'mb-tip-back'})}<div class="kvb" style="padding-top:10px">${box(row('Register tips manually',{a:'mbview',x:'tipreg',g:'mb-tip-reg',blue:1})+row('Tipping history',{a:'mbview',x:'tiphist',g:'mb-tip-hist',blue:1}))}</div>`;
V.tipreg=()=>`${vhead('Register tips manually',{back:1,gb:'mb-tr-back'})}<div class="kvb"><div class="klbl" style="margin-top:8px">Tip amount</div><div class="kamt">${U().kp||'0'} SEK</div>${keypad('mb-tr')}</div><div class="kvf"><button class="kbtn" ${+U().kp>0?'':'disabled'} data-a="mbtipsave" data-g="mb-tr-save">Register tip</button></div>`;
V.tiphist=()=>{const T=ST().tips.concat(M().orders.filter(o=>o.tip).map(o=>({at:o.at,amt:o.tip,src:'Kontokort'})));return `${vhead('Tipping history',{back:1,gb:'mb-th-back'})}<div class="kvb">${T.slice().reverse().map(t=>`<div style="display:flex;justify-content:space-between;padding:10px 4px;border-bottom:1px solid #eee;font-size:12.5px"><span>${t.at}<br><small style="color:#888">${t.src}</small></span><b>${sek(t.amt)}</b></div>`).join('')||'<div class="klbl" style="margin-top:30px">Ingen dricks registrerad ännu</div>'}</div>`};
V.customers=()=>{const q=(UI.f.mbcq||'').toLowerCase();const L=(S.customers||[]).filter(c=>!q||c.name.toLowerCase().includes(q)||(c.phone||'').includes(q));const sf=p=>`<div style="display:flex;align-items:center;gap:6px;background:#f0f0f2;border-radius:18px;padding:0 10px;height:34px;margin-bottom:8px">${icon('search')}<input ${p==='Name'?'data-in="mbcq" data-live="1" data-g="in-mbcq"':''} placeholder="${p}" value="${p==='Name'?esc(UI.f.mbcq||''):''}" style="border:0;background:none;flex:1;font:inherit;outline:0"></div>`;
 return `${vhead('Customers',{back:1,gb:'mb-cu-back'})}<div class="kvb"><div style="text-align:right;margin-bottom:8px"><button style="color:#1677ff;font-weight:600;font-size:12.5px;display:inline-flex;gap:4px;align-items:center" data-a="mbview" data-x="newcust" data-g="mb-cu-new">${icon('person_add')}New Customer</button></div>${['Customer Number','Name','Organisation Number','Others'].map(sf).join('')}<div style="display:flex;background:#ececee;padding:8px;font-weight:700;font-size:12px;margin-top:6px"><span style="width:80px">Customer Number</span><span>Information</span></div>${L.map((c,i)=>`<div style="display:flex;padding:8px;border-bottom:1px solid #eee;font-size:12.5px"><span style="width:80px">${1001+i}</span><span><b>${esc(c.name)}</b><br><small style="color:#888">${esc(c.phone||'')} ${esc(c.email||'')}</small></span></div>`).join('')}</div>`};
V.newcust=()=>`${vhead('New Customer',{back:1,gb:'mb-nc-back'})}<div class="kvb">${[['mbnc_name','Name*'],['mbnc_phone','Phone'],['mbnc_mail','Email'],['mbnc_org','Organisation Number']].map(([k,p])=>`<input class="kfld" style="margin-bottom:8px" data-in="${k}" data-g="in-${k}" placeholder="${p}" value="${esc(UI.f[k]||'')}">`).join('')}</div><div class="kvf"><button class="kbtn" data-a="mbncsave" data-g="mb-nc-save">Save</button></div>`;
V.courses=()=>{const C=ST().courses;return `${vhead('Course Settings',{back:1,gb:'mb-co-back'})}<div class="kvb" style="padding-top:8px">${C.map((c,i)=>`<div style="background:#ececee;border-radius:4px;margin-bottom:6px"><div style="display:flex;align-items:center;gap:8px;padding:8px"><b style="font-weight:500;flex:1">${esc(c.n.toUpperCase())}</b><button class="krad ${c.w?'kon':''}" data-a="mbcourse" data-x="${i}|1" data-g="mb-co-${i}-wait"><i></i>Wait</button><button class="krad ${c.w?'':'kon'}" data-a="mbcourse" data-x="${i}|0" data-g="mb-co-${i}-serve"><i></i>Serve</button></div><div style="background:#f6f6f8;padding:6px 8px;font-size:11.5px;color:#888">Produktgrupper kopplas i Backstage</div></div>`).join('')}</div><div class="kvf"><button class="kbtn" data-a="mbcourseadd" data-g="mb-co-add">${icon('add',16)} Add New Course</button></div>`};
const PROMO=[{n:'3 för 2 Kanelbullar',t:'X for Y',f:'Feb 14, 2026, All day'},{n:'Frukostkombo',t:'Combo deal',f:'Apr 07, 2026, 06:00–10:00'},{n:'Personalrabatt',t:'Discount',f:'Jul 16, 2026, All day',man:1},{n:'10% på smörgåsar',t:'Discount',f:'Sep 14, 2026, 11:00 To: Sep 22, 2026, 14:00'}];
V.promos=()=>`${vhead('Promotions',{back:1,gb:'mb-pr-back'})}<div class="kvb"><button class="kbtn" style="margin-bottom:8px" data-a="mbinfo" data-x="Kampanjer skapas och redigeras i Backstage">${icon('add',16)} Add automatic promotion</button><button class="kbtn" data-a="mbinfo" data-x="Manuella kampanjer läggs på i kassan via Discount">${icon('add',16)} Add manual promotion</button><div class="klbl" style="color:#333;margin:12px 0">Drag and drop your promotions to arrange them in order of priority</div><div style="background:#ececee;border-radius:4px">${PROMO.map(p=>`<div style="display:flex;gap:8px;padding:10px;border-bottom:1px solid #ddd;font-size:12.5px"><span style="width:8px;height:8px;border-radius:50%;background:#22b45a;margin-top:5px"></span><span style="flex:1"><b>${p.n}</b> (${p.t})<br><b>From:</b> ${p.f}${p.man?'<br><span class="ktag">Manual</span>':''}</span><span style="color:#1677ff">${icon('edit',18)}</span><span style="color:#999">${icon('drag_handle',18)}</span></div>`).join('')}</div></div>`;
const MEM=[{n:'Anna Lind',p:'+46 70 000 00 11',e:'anna@exempel.se'},{n:'Erik Berg',p:'+46 73 000 00 22',e:'erik@exempel.se'},{n:'',p:'+46 76 000 00 33',e:''}];
V.loyalty=()=>`${vhead('Loyalty members',{back:1,gb:'mb-lo-back'})}<div class="kvb"><div style="text-align:right"><button class="kpill kb" data-a="mbinfo" data-x="Nya medlemmar registreras via QR-koden eller i Backstage">${icon('person_add')}Add member</button></div><div style="display:flex;align-items:center;gap:6px;background:#f0f0f2;border-radius:18px;padding:0 10px;height:34px;margin:10px 0">${icon('search')}<input placeholder="Search" style="border:0;background:none;flex:1;font:inherit;outline:0"></div><div style="background:#ececee;padding:8px;font-weight:700;font-size:12px">Member</div>${MEM.map(m=>`<div style="display:flex;align-items:center;padding:10px 6px;border-bottom:1px solid #ddd;font-size:12px"><span style="flex:1">${m.n?`<b>${m.n}</b><br>`:''}${icon('smartphone',13)} ${m.p}${m.e?`<br>${icon('mail',13)} ${m.e}`:''}</span><span style="color:#1677ff">${icon('chevron_right',18)}</span></div>`).join('')}</div><div class="kvf"><button class="kbtn" data-a="mbinfo" data-x="Kameran öppnas och läser kundens QR-kod">${icon('qr_code_scanner',16)} Scan QR Code</button></div>`;
V.layouts=()=>{const s=ST();return `${vhead('Layouts/Start Pages',{back:1,gb:'mb-ly-back'})}<div class="kvb"><div style="display:flex;gap:8px;border:1px solid #ddd;border-radius:4px;padding:6px"><input data-in="mbly" data-live="1" data-g="in-mbly" placeholder="Create New Layout" value="${esc(UI.f.mbly||'')}" style="border:0;flex:1;font:inherit;outline:0;padding-left:6px"><button class="kpill ${(UI.f.mbly||'').trim()?'kb':''}" style="${(UI.f.mbly||'').trim()?'':'background:#e4e4e6;color:#aaa'}" data-a="mblycreate" data-g="mb-ly-create">Create</button></div><div style="height:10px"></div>${box(`<div class="kmenu-i">${s.layout?esc(s.layout):'No layout selected'}<span class="kch">${icon('unfold_more',18)}</span></div>`+s.layouts.filter(l=>l!==s.layout).map(l=>`<button class="kmenu-i" style="background:#f6f6f8" data-a="mblysel" data-x="${esc(l)}">${esc(l)}</button>`).join(''))}${note('En layout bestämmer vilken produktgrupp kassan startar på.')}</div>`};
const gridEd=(L,t,ev)=>`${vhead(t,{back:1,gb:'mb-ge-back'})}<div class="kvb"><div class="kfgrid">${L.map(p=>`<button style="position:relative">${icon(p.ic)}${p.t}<span style="position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#111;color:#fff;font-size:13px;line-height:18px">−</span></button>`).join('')}${Array.from({length:Math.max(0,9-L.length)},()=>`<button style="background:#fff;border:1.5px dashed #ccc">${icon('add')}</button>`).join('')}</div><div class="klbl" style="margin-top:14px">This is a preview of the ${ev} that will appear in the checkout. Drag and drop to re-order the buttons and press the arrows to resize them.</div></div><div class="kvf" style="grid-template-columns:1fr 1fr"><button class="kbtn krd" data-a="mbback">Cancel</button><button class="kbtn" data-a="mbgsave" data-g="mb-ge-save">Save</button></div>`;
V.paymeth=()=>gridEd(PM(),'Payment Methods','Payment methods');
V.functions=()=>gridEd([{ic:'point_of_sale',t:'Cash drawer'},{ic:'percent',t:'Discount'},{ic:'receipt_long',t:'Split by amount'},{ic:'checklist',t:'Split by items'},{ic:'call_split',t:'Split evenly'}],'Functions','Functions');
V.discbtns=()=>{const D=discBtns();return `${vhead('Discount Buttons',{back:1,gb:'mb-db-back'})}<div class="kvb"><button class="kbtn" ${D.length>=8?'disabled':''} data-a="mbview" data-x="discnew" data-g="mb-db-new">${icon('add',16)} Create discount button</button><div class="klbl" style="color:#333;margin:6px 0">Max 8 discount buttons.</div><div class="ksec">Discount buttons</div>${box(D.map((p,i)=>`<div class="kmenu-i">${p}%<span class="kch" style="display:flex;gap:8px"><button style="color:#ef1b1b" data-a="mbdbdel" data-x="${i}" data-g="mb-db-del-${p}">${icon('delete',18)}</button><span style="color:#999">${icon('drag_handle',18)}</span></span></div>`).join(''))}</div>`};
V.discnew=()=>`${vhead('Create discount button',{back:1,gb:'mb-dn-back'})}<div class="kvb"><div class="klbl" style="margin-top:8px">Percentage</div><div class="kamt">${U().kp||'0'} %</div>${keypad('mb-dn')}</div><div class="kvf"><button class="kbtn" ${+U().kp>0&&+U().kp<=100&&!discBtns().includes(+U().kp)?'':'disabled'} data-a="mbdbsave" data-g="mb-dn-save">Save</button></div>`;
V.guestset=()=>{const g=ST().guests;return `${vhead('Guest count settings',{back:1,gb:'mb-gs-back'})}<div class="kvb"><div class="ksec">Choose how guest count is added to orders</div>${box(rad(g==='manual','Add manually when needed','mbset','guests|manual','mb-gs-manual')+rad(g==='park','Ask the first time an order is parked','mbset','guests|park','mb-gs-park')+rad(g==='always','Always show guest count in the basket, starting at 0','mbset','guests|always','mb-gs-always'))}</div>`};
V.cashier=()=>`${vhead('Cashier Management',{back:1,gb:'mb-ca-back'})}<div class="kvb">${box(`<button class="kmenu-i" data-a="mbset" data-x="cashier" data-g="mb-ca-tgl">Enable cashier management<span class="kch">${tgl(ST().cashier)}</span></button>`)}${ST().cashier?note('Varje kassör loggar in med sin egen PIN, och försäljningen kopplas till kassören i rapporterna. Kassörer läggs upp i Backstage.'):''}</div>`;
V.settings=()=>{const s=ST();return `${vhead('Settings',{back:1,gb:'mb-se-back'})}<div class="kvb"><div class="ksec">Scanner</div>${box(`<button class="kmenu-i" data-a="mbset" data-x="scanner" data-g="mb-se-scanner">Show scanner<span class="kch">${tgl(s.scanner)}</span></button>`)}${note('Activate to show the scanner button in the bottom menu.')}${box(`<button class="kmenu-i" data-a="mbset" data-x="scanArea">Use Scan Area of Interest<span class="kch">${tgl(s.scanArea)}</span></button>`)}${note('This is an additional setting that could improve scanning.')}<div class="ksec">Tap behaviour for tables</div>${box(rad(s.tableTap==='details','Tap To Open Table Details','mbset','tableTap|details','mb-se-tdet')+rad(s.tableTap==='add','Tap To Add To Basket','mbset','tableTap|add','mb-se-tadd'))}<div class="ksec">Select default for eat in or take-away</div>${box(rad(!s.defTake,'Eat in','mbset','defTake|0','mb-se-eatin')+rad(s.defTake,'Take-away','mbset','defTake|1','mb-se-take'))}</div>`};
V.custdisp=()=>{const s=ST();return `${vhead('Customer Display',{back:1,gb:'mb-cd-back'})}<div class="kvb"><div class="ksec">Customer display configuration</div>${box(row('IP Address: <b>192.168.1.50</b>',{a:'mbinfo',x:'IP-adressen visas på kundskärmen när den startar'}))}<div class="ksec">Status</div>${box(`<button class="kmenu-i" data-a="mbset" data-x="cdAuto">Auto connect to customer display<span class="kch">${tgl(s.cdAuto)}</span></button><button class="kmenu-i" data-a="mbset" data-x="cdConn" data-g="mb-cd-conn">Connect to customer display<span class="kch" style="color:${s.cdConn?'#14843f':'#333'}">${s.cdConn?'Connected':'Not connected'}</span></button><button class="kmenu-i" data-a="mbset" data-x="cdOff">Disconnect customer display</button>`)}</div>`};
V.support=()=>`${vhead('Support',{back:1,gb:'mb-su-back'})}<div class="kvb"><div class="ksec">Yabie support</div><div style="background:#ececee;border-radius:4px;padding:12px;font-size:12.5px;line-height:1.8"><b>Phone number:</b> +46 10 551 73 33<br><b>E-mail:</b> support@yabie.com<br><b>Chat:</b> support.yabie.com</div><div style="height:16px"></div>${box(row('Help center',{a:'mbinfo',x:'Hjälpcentret öppnas i webbläsaren',g:'mb-su-help'}))}</div>`;
V.help=()=>`${vhead('Help',{back:1,gb:'mb-he-back'})}<div class="kvb"><div class="klbl" style="color:#333;margin:12px 0">Behöver du hjälp med kassan? Här finns guider och kontaktvägar.</div>${box(row('Guider i Webbkassan',{a:'mbinfo',x:'Öppna Guider-fliken till höger om kassan'})+row('Help center',{a:'mbinfo',x:'Hjälpcentret öppnas i webbläsaren'})+row('Support',{a:'mbview',x:'support',g:'mb-he-support'}))}</div>`;

function mobHtml(){const b=U();let h=`<div class="kmb">`;
 if(b.view==='search')h+=V.search();
 else h+=(b.tab==='basket'?basket():catalog())+(b.tab==='cat'||!b.sheet?navBar():navBar());
 if(b.view&&b.view!=='search'&&V[b.view])h+=`<div class="kview">${V[b.view]()}</div>`;
 if(b.dlg)h+=`<div class="kscrim" style="z-index:39"></div><div class="kconf">${b.dlg.t}<div class="kb2"><button style="color:#ef1b1b" data-a="mbdlg" data-x="0" data-g="mb-dlg-no">Cancel</button><button style="color:#1677ff" data-a="mbdlg" data-x="1" data-g="mb-dlg-yes">Confirm</button></div></div>`;
 if(b.toast)h+=`<div class="kmtoast">${esc(b.toast)}</div>`;
 return h+`</div>`}

/* ── hjälp ── */
/* ── Parkerade ordrar: gemensam lagring med iPad-kassan (S.parked), så bordskartan är global för alla enheter ── */
const unitP=it=>it.price+it.mods.reduce((a,m)=>a+m.price*m.qty,0);
const pkStamp=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return `${p(d.getMonth()+1)}/${p(d.getDate())}, ${p(d.getHours())}:${p(d.getMinutes())}`};
const toIpad=(mc,key,prev)=>{const t=key&&key[0]!=='#'?tableById(key):null;return {items:mc.items.map(it=>({pid:it.pid,name:it.name,price:unitP(it),qty:it.qty,disc:it.disc||0,note:it.note||'',mods:it.mods.map(m=>(m.qty>1?m.qty+'× ':'')+m.name),_m:JSON.parse(JSON.stringify(it))})),takeaway:!!mc.take,orderDisc:mc.disc?mc.disc.pct:0,note:mc.note||'',customer:mc.cust||'',guests:mc.guests||0,svc:!!mc.svc,
 table:t?t.id:(prev&&prev.table)||undefined,name:t?t.name:(prev&&prev.name)||mc.pname||'',parkedAt:pkStamp(),cashier:'Mobil ('+dev().t+')'}};
const toMob=ic=>({...nc(),items:ic.items.map(it=>it._m?{...it._m,qty:it.qty,disc:it.disc||0}:{pid:it.pid,name:it.name,price:it.price,qty:it.qty,mods:(it.mods||[]).map(n=>({name:n,price:0,qty:1})),take:!!ic.takeaway,note:it.note||'',disc:it.disc||0}),
 disc:ic.orderDisc?{pct:ic.orderDisc,desc:''}:null,note:ic.note||'',cust:ic.customer||null,take:!!ic.takeaway,guests:ic.guests||0,svc:!!ic.svc,table:ic.table||null,pname:ic.name||''});
const PL=()=>(S.parked=S.parked||[]);
const pkIdx=key=>key[0]==='#'?+key.slice(1):PL().findIndex(c=>c.table===key);
const PK={get:key=>{const i=pkIdx(key);return i>=0&&PL()[i]?toMob(PL()[i]):undefined},
 set:(key,mc)=>{const i=pkIdx(key);const v=toIpad(mc,key,i>=0?PL()[i]:null);if(i>=0&&PL()[i])PL()[i]=v;else PL().push(v)},
 del:key=>{const i=pkIdx(key);if(i>=0)PL().splice(i,1)},
 keys:()=>PL().map((c,i)=>c.table&&tableById(c.table)?c.table:'#'+i)};
window.MOBPK=PK;
function tableById(id){for(const p of S.plans||[]){const x=p.places.find(q=>q.id===id);if(x)return {...x,plan:p.name}}return null}
const go=(v,ev)=>{const b=U();b.view=v;b.kp='';render();emit('mb:view:'+v);if(ev)emit(ev)};
const close=()=>{const b=U();b.view=null;b.kp='';b.sheet=null;render();emit('mb:close')};
const addLine=it=>{const c=M().cart;const same=c.items.find(x=>x.pid===it.pid&&!it.mods.length&&!x.mods.length&&x.take===it.take&&!x.note&&!it.note&&x.price===it.price);if(same)same.qty+=it.qty;else c.items.push(it);save()};

/* ── actions ── */
Object.assign(A,{
 mbtab:t=>{const b=U();b.tab=t;b.sheet=null;b.view=null;render();emit('mb:tab:'+t)},
 mbgrp:id=>{U().grp=id||null;render();emit('mb:grp')},
 mbprod:id=>{const p=S.products.find(x=>x.id===id);const b=U();if(!modsOf(p).length&&!p.open){addLine({pid:p.id,name:p.name,price:p.price,qty:1,mods:[],take:false,note:''});if(b.view==='search'){render()}else render();toast(p.name+' added');emit('mb:add',p);return}
  Object.assign(b,{pid:id,sel:{},qty:1,take:M().cart.take,li:null,idisc:0});UI.f.mbidd='';UI.f.mbnote='';UI.f.mbprice='';const v=b.view==='search'?'prod':'prod';b.fromSearch=b.view==='search';go(v,'mb:prod')},
 mbtake:x=>{U().take=x==='1';render();emit('mb:take')},
 mbopt:x=>{const [mid,i]=x.split('|');const m=S.modifiers.find(y=>y.id===mid);const b=U();const s=b.sel[mid]=b.sel[mid]||{};const single=m.variant||!m.multi;
  if(single){const was=s[i];b.sel[mid]=was?{}:{[i]:1}}else{if(s[i])delete s[i];else{const n=Object.values(s).reduce((a,q)=>a+q,0);if(m.max&&n>=m.max){toast('Max '+m.max+' choices');return}s[i]=1}}render();emit('mb:opt')},
 mboptq:x=>{const [mid,i,d]=x.split('|');const s=U().sel[mid];if(!s)return;s[i]=(s[i]||0)+(+d);if(s[i]<=0)delete s[i];render()},
 mbqty:d=>{const b=U();b.qty=Math.max(1,b.qty+(+d));render();emit('mb:qty')},
 mbadd:()=>{const b=U();const p=S.products.find(x=>x.id===b.pid);const mods=[];modsOf(p).forEach(m=>Object.entries(b.sel[m.id]||{}).forEach(([i,q])=>mods.push({name:m.opts[i].name,price:m.opts[i].price||0,qty:q})));
  const line={pid:p.id,name:p.name,price:p.open?+UI.f.mbprice:p.price,qty:b.qty,mods,take:b.take,note:UI.f.mbnote||''};if(b.idisc){line.disc=b.idisc;line.discDesc=UI.f.mbidd||''}
  if(b.li!=null){M().cart.items[b.li]=line;b.li=null;save();b.view=null;render();toast('Basket updated');emit('mb:lineupd');return}
  if(line.disc)M().cart.items.push(line);else addLine(line);save();const fs=b.fromSearch;b.view=fs?'search':null;render();emit('mb:add',p)},
 mbsearch:()=>{UI.f.mbq='';go('search','mb:search')},
 mbmenu:()=>go('menu','mb:menu'),
 mbclose:()=>{const b=U();if(b.view==='card'&&b.cardOk)return;b.cardOk=false;close()},
 mbback:()=>{const b=U();const back={reports:'menu',journal:'reports',periodic:'reports',timetrack:'menu',ttconfirm:'timetrack',giftcards:'menu',tipping:'menu',tipreg:'tipping',tiphist:'tipping',customers:'menu',newcust:'customers',courses:'menu',promos:'menu',loyalty:'menu',layouts:'menu',paymeth:'menu',functions:'menu',discbtns:'menu',discnew:'discbtns',guestset:'menu',cashier:'menu',settings:'menu',custdisp:'menu',support:'menu',help:'menu',drawer:b.drfrom==='menu'?'menu':null,cashmove:'drawer',closebal:'drawer',idisc:'prod',idiscman:'idisc',pedit:'prod',zrep:b.zfrom||'menu',discman:'disc',retreason:null,note:null,guests:null,cust:null,rcptsend:'done',order:'orders',orders:'menu',zshow:'zrep',stub:'menu',catsync:'menu',printers:'menu',about:'menu'};const v=back[b.view];if(b.view==='order')b.rsel=null;b.view=v===undefined?null:v;b.kp='';render();emit('mb:back')},
 mbclear:()=>{const c=M().cart;if(!c.items.length)return;S.mob.cart=nc();save();render();emit('mb:clear')},
 mbline:i=>{const b=U(),c=M().cart,it=c.items[+i];const p=S.products.find(x=>x.id===it.pid);if(!p||c.ret){b.li=+i;go('line');return}
  const sel={};modsOf(p).forEach(m=>m.opts.forEach((o,j)=>{const hit=it.mods.find(x=>x.name===o.name);if(hit){(sel[m.id]=sel[m.id]||{})[j]=hit.qty}}));
  Object.assign(b,{li:+i,pid:p.id,sel,qty:it.qty,take:it.take,idisc:it.disc||0,fromSearch:false});UI.f.mbnote=it.note||'';UI.f.mbprice=p.open?String(it.price):'';UI.f.mbidd=it.discDesc||'';go('prod','mb:lineedit')},
 mblq:d=>{const it=M().cart.items[U().li];it.qty=Math.max(1,it.qty+(+d));save();render()},
 mbldel:()=>{const b=U();M().cart.items.splice(b.li,1);b.li=null;save();close();emit('mb:linedel')},
 mbmore:()=>{const b=U();b.sheet=b.sheet==='more'?null:'more';render();emit('mb:more')},
 mbsheet:x=>{const b=U();if(x==='pay'&&!M().cart.items.length)return;b.sheet=x;render();emit('mb:sheet:'+x)},
 mbsheetx:()=>{U().sheet=null;render()},
 mbmorei:x=>{const b=U(),c=M().cart;b.sheet=null;
  if(x==='take'){c.take=!c.take;c.items.forEach(it=>it.take=c.take);save();render();toast(c.take?'Order marked as take-away':'Take-away removed');emit('mb:take');return}
  if(x==='tip'){c.tip=!c.tip;save();render();toast(c.tip?'Tipping turned on':'Tipping turned off');emit('mb:tip');return}
  if(x==='svc'){c.svc=!c.svc;save();render();emit('mb:svc');return}
  if(x==='note'){UI.f.mbon=c.note||'';go('note','mb:note');return}
  if(x==='guests'){go('guests');U().kp=String(c.guests||'');render();return}
  if(x==='cust'){go('cust','mb:cust');return}},
 mbnotesave:()=>{M().cart.note=(UI.f.mbon||'').trim();save();close();emit('mb:note:saved')},
 mbguests:()=>{M().cart.guests=+U().kp||0;save();close();toast('Guests: '+M().cart.guests)},
 mbcust:id=>{const c=(S.customers||[]).find(x=>x.id===id);M().cart.cust=c.name;save();close();emit('mb:cust:set')},
 mbfn:x=>{const b=U();b.sheet=null;if(x==='drawer'){go('drawer','mb:drawer');return}
  if(x==='disc'){UI.f.mbdd='';go('disc','mb:disc');return}
  if(x==='spliteven'){go('split','mb:split');return}
  if(x==='splitamt'){if(M().float==null){b.obret='splitamt';go('openbal','mb:openbal');return}go('splitamt','mb:splitamt');U().kp=String(rest(M().cart));render();return}},
 mbdisc:x=>{const pct=x==='kp'?+U().kp:+x;M().cart.disc={pct,desc:UI.f.mbdd||''};save();close();emit('mb:discount',pct)},
 mbsplit:n=>{M().cart.split={n:+n,paid:0,paidAmt:0};save();close();toast('Split in '+n+' parts');emit('mb:split:set')},
 mbttstart:()=>{const s=ST();s.on=s.on||{};s.on[U().ttpin]=now();s.shifts++;save();toast('Shift started');go('timetrack');emit('mb:shift');emit('mb:shift:in')},
 mbttend:()=>{const s=ST();s.on=s.on||{};delete s.on[U().ttpin];s.shifts=Math.max(0,s.shifts-1);save();toast('Shift ended');go('timetrack');emit('mb:shift');emit('mb:shift:out')},
 mbkey:k=>{const b=U();if(b.view==='timetrack'){if(k==='⌫'){b.kp=b.kp.slice(0,-1);render();return}b.kp=(b.kp+k).slice(0,4);render();if(b.kp.length===4){setTimeout(()=>{if(U().view!=='timetrack')return;const pin=U().kp;U().ttpin=pin;go('ttconfirm','mb:ttconfirm')},250)}return}
  if(k==='⌫')b.kp=b.kp.slice(0,-1);else if(k==='.'){if(!b.kp.includes('.'))b.kp=(b.kp||'0')+'.'}else if(b.kp.length<9&&!/\.\d\d$/.test(b.kp))b.kp=(b.kp+k).replace(/^0+(?=\d)/,'');render();emit('mb:key')},
 mbpay:m=>{const b=U(),c=M().cart;b.sheet=null;b.pm=m;
  if(m==='cash'){if(M().float==null&&!c.ret){go('openbal','mb:openbal');return}go('cash','mb:cash');return}
  if(m==='card'&&dev().card==='ondevice'){b.cardOk=false;go('card','mb:card');return}
  finishPay(m);},
 mbopenbal:()=>{const b=U();M().float=+b.kp||0;M().moves=[];save();const r=b.obret;b.obret=null;if(r==='splitamt'){go('splitamt');b.kp=String(rest(M().cart));render()}else go(r||'cash',r?null:'mb:cash');emit('mb:float')},
 mbcash:x=>{const due=Math.abs(toPay(M().cart));const t=x==='exact'?due:+U().kp;finishPay('cash',t)},
 mbtippct:p=>{U().tipPct=+p;render();emit('mb:tippct')},
 mbcardtap:()=>{U().cardOk=true;render();emit('mb:card:ok');setTimeout(()=>{if(APP()==='mob'&&U().view==='card')finishPay('card')},450)},
 mbretnext:()=>{finishPay(U().pm,null,true)},
 mbrcpt:x=>{const b=U();if(x==='print'){if(!dev().printer){toast('No printer connected');return}toast('Printing receipt…');afterReceipt();emit('mb:rcpt:print');return}
  if(x==='skip'){afterReceipt();emit('mb:rcpt:skip');return}
  b.rc=x;UI.f.mbrc='';go('rcptsend','mb:rcpt:'+x)},
 mbrcsend:()=>{if(!(UI.f.mbrc||'').trim()){toast('Fill in '+(U().rc==='sms'?'a phone number':'an email'));return}toast('Receipt sent');afterReceipt();emit('mb:rcpt:sent')},
 mbpark:()=>{const c=M().cart,b=U();if(c.table){PK.set(c.table,c);S.mob.cart=nc();save();b.tab='cat';render();toast('Order saved');emit('mb:parked');return}b.conf=null;b.ptab='place';go('parked','mb:parkview')},
 mbparked:()=>{const b=U();b.conf=null;b.ptab='place';go('parked','mb:parkedview')},
 mbptab:t=>{U().ptab=t;render()},
 mbtbl:id=>{const b=U(),c=M().cart,t=tableById(id);const occ=PK.get(id);
  if(!t){if(occ&&!c.items.length){b.pt=id;b.pdtab='items';go('pdetail','mb:pdetail')}else toast(c.items.length?'Välj ett bord under Place':'Ordern finns inte längre');return}
  if(c.items.length&&!c.ret){b.conf={id,t:occ?`Would you like to add the items to ${esc(t.name)}?`:`Would you like to park order on ${esc(t.name)}?`};render();emit('mb:conf');return}
  if(occ){b.pt=id;b.pdtab='items';go('pdetail','mb:pdetail');return}
  toast(t.name+' is empty')},
 mbconf:x=>{const b=U(),c=M().cart;const id=b.conf.id;b.conf=null;if(x!=='1'){render();return}
  const occ=PK.get(id);if(occ){occ.items.push(...c.items);PK.set(id,occ)}else{PK.set(id,{...c,table:id})}S.mob.cart=nc();save();b.view=null;b.tab='basket';render();toast('Order parked');emit('mb:parked')},
 mbpdtab:t=>{U().pdtab=t;render()},
 mbpdrm:()=>{PK.del(U().pt);save();go('parked');toast('Order removed')},
 mbpdmove:()=>toast('Välj ett annat bord i den riktiga kassan för att flytta ordern'),
 mbpdbill:()=>{toast(dev().printer?'Printing bill…':'No printer connected');emit('mb:bill')},
 mbpdadd:()=>{const b=U(),o=PK.get(b.pt);const c=M().cart;if(!o){go('parked');return}if(c.items.length){toast('Empty the basket first');return}S.mob.cart={...o,table:tableById(b.pt)?b.pt:null};PK.del(b.pt);save();b.view=null;b.tab='basket';render();emit('mb:pdadd')},
 mbview:v=>{const b=U();if(v==='zrep'||v==='xrep'||v==='periodic'){b.zck={print:true,email:true,screen:true};b.zfrom=b.view==='reports'?'reports':'menu';b.zmode=v==='xrep'?'x':'z';if(v==='xrep')v='zrep'}
  if(v==='drawer')b.drfrom=b.view;if(v==='idiscman'||v==='discnew'||v==='tipreg')b.kp='';if(v==='newcust')['mbnc_name','mbnc_phone','mbnc_mail','mbnc_org'].forEach(k=>UI.f[k]='');if(v==='layouts')UI.f.mbly='';
  go(v,'mb:view:'+v);if(b.zmode==='x'&&v==='zrep')emit('mb:view:xrep')},
 mbstub:t=>{U().stub=t;go('stub')},
 mbsync:()=>{toast('Product catalog synchronized');emit('mb:sync')},
 mborder:id=>{const b=U();b.oid=id;b.rsel=null;go('order','mb:order')},
 mbrsel:x=>{U().rsel=x==='on'?{}:null;render();emit('mb:rsel')},
 mbrtog:i=>{const r=U().rsel;r[i]=!r[i];render();emit('mb:rtog')},
 mbrall:()=>{const b=U(),o=M().orders.find(x=>x.id===b.oid);const all=o.items.every((x,i)=>b.rsel[i]);o.items.forEach((x,i)=>{b.rsel[i]=!all});render()},
 mbretgo:()=>{const b=U(),o=M().orders.find(x=>x.id===b.oid);const items=o.items.map((it,i)=>b.rsel[i]?{...it,qty:it.qty-((o.returned||{})[i]||0),_i:i}:null).filter(x=>x&&x.qty>0);S.mob.cart={...nc(),items,disc:o.disc,ret:o.id,table:null};save();b.view=null;b.rsel=null;b.tab='basket';render();emit('mb:retcart')},
 mbrcopy:()=>{toast(dev().printer?'Printing receipt copy…':'No printer connected')},
 mbzck:k=>{const z=U().zck;z[k]=!z[k];render()},
 mbzcreate:()=>{const m=M();const L=m.orders.slice(m.zSince);const z={n:m.z.length+1,at:new Date().toLocaleString('en-US'),cnt:L.filter(o=>!o.ret).length,gross:L.filter(o=>!o.ret).reduce((a,o)=>a+o.sub,0),disc:L.filter(o=>!o.ret).reduce((a,o)=>a+o.disc$,0),ret:L.filter(o=>o.ret).reduce((a,o)=>a+Math.abs(o.total),0),pay:{},float:m.float};
  z.mv=(m.moves||[]).reduce((a,x)=>a+(x.t==='add'?x.amt:-x.amt),0);L.forEach(o=>o.pay.forEach(p=>{const k=p.t;z.pay[k]=Math.round(((z.pay[k]||0)+p.amt)*100)/100}));
  if(U().zmode==='x'){m.xs=m.xs||[];z.n=m.xs.length+1;m.xs.push(z);save();U().zi=m.xs.length-1;if(U().zck.print&&dev().printer)toast('Printing X-Report…');go('zshow','mb:xdone');return}
  m.z.push(z);m.zSince=m.orders.length;m.float=null;m.moves=[];save();U().zi=m.z.length-1;if(U().zck.print&&dev().printer)toast('Printing Z-Report…');go('zshow','mb:zdone')},
 mbzopen:i=>{U().zi=+i;go('zshow')},
 mbzdone:()=>{const b=U();if(b.zmode==='x'){go('reports');emit('mb:xclosed');return}close();emit('mb:zclosed')},
});
/* ── fler actions ── */
const DLG={pedel:()=>{const p=S.products.find(x=>x.id===U().pid);toast('Demo: '+(p?p.name:'produkten')+' tas inte bort på riktigt');U().view='prod';render()},logout:()=>{close();toast('Demo: du loggas inte ut från demokassan')}};
Object.assign(A,{
 mbdlg:x=>{const b=U(),d=b.dlg;b.dlg=null;if(x==='1'&&d&&DLG[d.k])DLG[d.k]();else render();emit('mb:dlg')},
 mbinfo:t=>toast(t),
 mbpedit:()=>{const b=U(),p=S.products.find(x=>x.id===b.pid);b.pe={gid:p.gid,open:!!p.open,take:!!p.take6,sold:!p.nosale,grpOpen:false};['mbpe_name','mbpe_price','mbpe_desc','mbpe_sku','mbpe_ean'].forEach(k=>UI.f[k]=undefined);go('pedit','mb:pedit')},
 mbpegrp:()=>{const e=U().pe;e.grpOpen=!e.grpOpen;render()},
 mbpegid:id=>{const e=U().pe;e.gid=id;e.grpOpen=false;render()},
 mbpeopen:x=>{U().pe.open=x==='1';render()},
 mbpetog:k=>{const e=U().pe;e[k]=!e[k];render();emit('mb:pe:tog')},
 mbpedel:()=>{const p=S.products.find(x=>x.id===U().pid);U().dlg={k:'pedel',t:`Do you want to delete ${esc(p.name)}?`};render()},
 mbpesave:x=>{const b=U(),p=S.products.find(y=>y.id===b.pid),e=b.pe;const name=(UI.f.mbpe_name??p.name).trim();const price=+(String(UI.f.mbpe_price??p.price).replace(',','.'));
  if(!name){toast('Name is required');return}if(!e.open&&!(price>=0)){toast('Fill in a price');return}
  const apply=o=>{o.name=name;o.gid=e.gid;o.open=e.open;if(!e.open)o.price=price;o.take6=e.take;o.nosale=!e.sold;if(UI.f.mbpe_desc!=null)o.desc=UI.f.mbpe_desc};
  if(x==='copy'){const c=JSON.parse(JSON.stringify(p));c.id='p'+Date.now().toString(36);apply(c);c.name=name+' (kopia)';S.products.push(c);S.modifiers.forEach(m=>{if(m.pids.includes(p.id))m.pids.push(c.id)});save();b.pid=c.id;UI.f.mbpe_name=c.name;render();toast('Saved. Editing copy');emit('mb:pe:copy');return}
  apply(p);save();b.view='prod';b.grp=e.gid;render();toast('Product saved');emit('mb:pe:saved')},
 mbidisc:()=>{const b=U();if(!b.idisc)UI.f.mbidd='';go('idisc','mb:idisc')},
 mbidiscset:x=>{const b=U();const pct=x==='kp'?+b.kp:+x;b.idisc=pct;b.view='prod';b.kp='';render();emit('mb:idisc:set',pct)},
 mbidiscx:()=>{U().idisc=0;UI.f.mbidd='';render()},
 mbsplitamt:()=>{const c=M().cart,b=U();c.next=Math.round(+b.kp*100)/100;save();b.view=null;b.sheet='pay';render();emit('mb:splitamt:set');emit('mb:sheet:pay')},
 mbdr:x=>{const b=U();if(x==='open'){b.obret='drawer';go('openbal','mb:openbal');return}
  if(x==='kick'){toast(dev().t==='Samsung A35'?'No cash drawer connected':'Cash drawer opened');emit('mb:kick');return}
  if(x==='add'||x==='remove'){b.cm=x;UI.f.mbcmn='';go('cashmove','mb:cashmove');return}
  if(x==='close'){go('closebal','mb:closebal')}},
 mbcmsave:()=>{const b=U(),m=M(),amt=+b.kp;if(b.cm==='remove'&&amt>drawerBal()){toast('Not enough cash in drawer');return}m.moves=m.moves||[];m.moves.push({t:b.cm,amt,note:(UI.f.mbcmn||'').trim(),at:now()});save();go('drawer');toast('Cash balance updated');emit('mb:cash:moved')},
 mbclosebal:()=>{const m=M(),cnt=+(U().kp||0),diff=Math.round((cnt-drawerBal())*100)/100;m.float=null;m.moves=[];save();go('drawer');toast('Cash balance closed. Difference: '+sek(diff));emit('mb:closebal')},
 mbrepsend:t=>{toast(t+' sent to '+(UI.f.mbzmail??'demo@kaffebaren.se'));emit('mb:rep:sent')},
 mbgf:f=>{U().gf=f;render()},
 mbtipsave:()=>{ST().tips.push({at:now(),amt:+U().kp,src:'Registered manually'});save();go('tiphist');toast('Tip registered');emit('mb:tip:saved')},
 mbncsave:()=>{const n=(UI.f.mbnc_name||'').trim();if(!n){toast('Name is required');return}S.customers=S.customers||[];S.customers.push({id:'c'+Date.now().toString(36),name:n,phone:(UI.f.mbnc_phone||'').trim(),email:(UI.f.mbnc_mail||'').trim()});save();go('customers');toast('Customer saved');emit('mb:cust:new')},
 mbcourse:x=>{const [i,w]=x.split('|');ST().courses[+i].w=w==='1';save();render();emit('mb:course')},
 mbcourseadd:()=>{ST().courses.push({n:'Kurs '+(ST().courses.length+1),w:true});save();render()},
 mblycreate:()=>{const n=(UI.f.mbly||'').trim();if(!n)return;const s=ST();if(!s.layouts.includes(n))s.layouts.push(n);s.layout=n;UI.f.mbly='';save();render();toast('Layout created');emit('mb:layout')},
 mblysel:n=>{ST().layout=n;save();render()},
 mbgsave:()=>{toast('Saved');A.mbback()},
 mbdbdel:i=>{const D=ST().disc;if(D.length<=1){toast('Minst en knapp behövs');return}D.splice(+i,1);save();render();emit('mb:db:del')},
 mbdbsave:()=>{const D=ST().disc;D.push(+U().kp);D.sort((a,b)=>a-b);save();go('discbtns');toast('Discount button created');emit('mb:db:new')},
 mbset:x=>{const s=ST();const [k,v]=x.split('|');if(k==='cdOff'){s.cdConn=false}else if(k==='cdConn'){s.cdConn=true;toast('Connected to customer display')}else if(v!=null){s[k]=k==='defTake'?v==='1':v}else s[k]=!s[k];save();render();emit('mb:set:'+k)},
 mblogout:()=>{U().dlg={k:'logout',t:'Do you want to log out from the POS?'};render()},
});
function finishPay(m,tend,afterReason){const b=U(),c=M().cart;
 if(c.ret&&!afterReason){b.pm=m;UI.f.mbreason='';go('retreason','mb:retreason');return}
 const due=toPay(c);const pmo=PM().find(p=>p.id===m)||{t:m};const pay={m,t:pmo.t,amt:due};if(m==='cash'&&tend!=null&&!c.ret){pay.tend=tend;pay.change=Math.round((tend-due)*100)/100}
 if(m==='card'&&b.tipPct&&!c.ret){pay.tip=Math.round(due*b.tipPct)/100}b.tipPct=0;
 b.lastPay=[pay];b.lastAmt=due;
 if(c.next){const r=rest(c);c.next=null;if(due<r-0.005){c.amtPaid=Math.round(((c.amtPaid||0)+due)*100)/100;const o={id:oid(),at:now(),items:[],sub:0,disc$:0,disc:null,total:due,pay:[pay],cust:c.cust,part:true,tip:pay.tip||0};M().orders.push(o);b.lastOrder=o.id;b.partial=true;save();go('done','mb:paid');emit('mb:partpaid');return}}
 if(c.split&&c.split.paid+1<c.split.n){c.split.paid++;c.split.paidAmt+=due;const o={id:oid(),at:now(),items:JSON.parse(JSON.stringify(c.items)),sub:0,disc$:0,disc:null,total:due,pay:[pay],cust:c.cust,part:true};M().orders.push(o);b.lastOrder=o.id;save();go('done','mb:paid');return}
 if(c.split)c.split.paid=c.split.n;
 const o={id:c.ret?(M().orders.find(x=>x.id===c.ret)||{}).id||oid():oid(),at:now(),items:JSON.parse(JSON.stringify(c.items)),sub:sub(c),disc$:discAmt(c),disc:c.disc,total:c.split?due:total(c),pay:[pay],cust:c.cust,ret:!!c.ret,reason:UI.f.mbreason||''};
 if(c.ret){const orig=M().orders.find(x=>x.id===c.ret);if(orig){orig.returned=orig.returned||{};c.items.forEach(it=>{orig.returned[it._i]=(orig.returned[it._i]||0)+it.qty})}o.id=c.ret}
 if(c.split||c.amtPaid)o.total=due;o.tip=pay.tip||0;o.svc=svcAmt(c);b.partial=false;
 M().orders.push(o);b.lastOrder=o.id;b.lastAmt=c.ret?-Math.abs(total(c)):due;b.lastPay=[{...pay,amt:b.lastAmt}];b.paidCart=c;save();go('done','mb:paid')}
function afterReceipt(){const b=U(),c=M().cart;if(b.partial){b.partial=false;b.view=null;b.tab='basket';render();emit('mb:rest');return}if(c.split&&c.split.paid<c.split.n&&c.split.paid>0&&!b.splitDone){b.view=null;b.tab='basket';render();return}
 S.mob.cart=nc();save();b.view=null;b.tab='cat';b.grp=null;render()}

/* ── render, fit, läge ── */
const _r=render;render=function(){if(typeof APP!=='function'||APP()!=='mob')return _r.apply(this,arguments);const pos=document.getElementById('pos');if(!pos)return;M();
 const bodies=[...pos.querySelectorAll('.kbody,.kvb')].map(e=>e.scrollTop);const key=(U().view||'')+U().tab+(U().grp||'');
 const ae=document.activeElement,aeIn=ae&&ae.dataset&&ae.dataset.in,selS=ae&&ae.selectionStart;
 pos.innerHTML=mobHtml();if(key===render.__mk)[...pos.querySelectorAll('.kbody,.kvb')].forEach((e,i)=>{if(bodies[i])e.scrollTop=bodies[i]});render.__mk=key;
 if(aeIn){const e=pos.querySelector(`[data-in="${aeIn}"]`);if(e){e.focus();try{e.setSelectionRange(selS,selS)}catch(_){}}}
 emit('render')};
const _fit=fit;fit=function(){if(typeof APP!=='function'||APP()!=='mob')return _fit.apply(this,arguments);
 const st=document.getElementById('stage'),sc=document.getElementById('screen'),fitEl=document.getElementById('fit'),dv=document.getElementById('device');const cs=getComputedStyle(st),dcs=getComputedStyle(dv);
 const w=st.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)-parseFloat(dcs.paddingLeft)-parseFloat(dcs.paddingRight),h=st.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)-parseFloat(dcs.paddingTop)-parseFloat(dcs.paddingBottom);
 const F=dev().f;const s=Math.min(w/F.W,h/F.H,1);sc.style.transform=`scale(${s})`;fitEl.style.width=F.W*s+'px';fitEl.style.height=F.H*s+'px';emit('render')};
addEventListener('resize',()=>{if(APP()==='mob')fit()});
window.MOB={init(){if(!DEVS[TS.mobDev])TS.mobDev='v3';{const m=M();if(m.parked&&Object.keys(m.parked).length){Object.entries(m.parked).forEach(([id,c])=>{if(tableById(id)&&!PK.get(id))PK.set(id,{...nc(),...c})});m.parked={};save()}}TS.choice=TS.choice||{};TS.choice.mobdev=TS.mobDev;const dv=document.getElementById('device');const F=dev().f;
  [['--mW',F.W],['--mH',F.H],['--mx',F.x],['--my',F.y],['--mw',F.w],['--mh',F.h],['--mr',F.r]].forEach(([k,v])=>dv.style.setProperty(k,v+'px'));dv.classList.remove('m-v3','m-a920','m-a35');dv.classList.add('m-'+TS.mobDev);
  if(!dv.classList.contains('mobm')){dv.classList.add('mobm');dv.classList.remove('bsm');setTimeout(()=>{if(APP()==='mob'&&window.appSync)appSync()},0)}M()},
 reset(){S.mob=null;UI.mb=null;M()},
 askDev(cb){const cur=TS.mobDev;tourEl.innerHTML=`<div class="win hwpick" ${GDIR()}><div><h3>${GU('u.devQ')}</h3><p>${GU('u.devP')}</p><div class="hwl" style="margin-top:12px">${Object.entries(DEVS).map(([k,d])=>`<button class="hwo ${cur===k?'kon':''}" data-dev="${k}"><span class="hi">${k==='a35'?'📱':k==='v3'?'🧾':'💳'}</span><span class="ht"><b>${d.t}</b><small>${GT(d.d)}</small></span><span class="hc"></span></button>`).join('')}</div></div></div>`;
  tourEl.firstElementChild.onclick=e=>{const b=e.target.closest('[data-dev]');if(!b)return;TS.mobDev=b.dataset.dev;TS.mobPicked=1;tsave();tourEl.innerHTML='';MOB.init();fit();render();list();cb&&cb()}},
 dev};
if(typeof APP==='function'&&APP()==='mob'&&window.appSync)setTimeout(()=>appSync(),0);
})();
