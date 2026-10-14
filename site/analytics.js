/* Analytics (full-screen, behind PIN) and Time Tracking details, matched to Express. Demo history is generated
   deterministically so the charts look alive; today's real sales in the web POS are added on top. */
(()=>{
const DAY=86400000;
const d0=d=>{const x=new Date(d);x.setHours(0,0,0,0);return x};
const ymd=d=>{const z=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`};
const rng=s=>()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296};
const HOURS=[0,0,0,0,0,0,0,.4,1.4,1.6,1.1,1.0,1.8,1.7,1.0,1.3,1.1,.7,.3,0,0,0,0,0];
const PAYS=[['Kontokort',.66],['Swish',.26],['Yabie gift card',.05],['Kontant',.03]];
/* one demo day → list of sales {h, items:[{pid,qty,price,mods}], pay} */
const cache={};
function demoDay(day){const k=ymd(day);if(cache[k])return cache[k];const r=rng(Math.floor(day.getTime()/DAY)*7919+11);
 const wd=day.getDay(),base=[22,28,30,31,34,44,38][wd];const n=Math.round(base*(0.75+r()*0.5));
 const prods=S.products.filter(p=>!p.gift&&p.priceType!=='variable'&&p.unit!=='kg'&&p.price>0);const out=[];
 const hw=HOURS.reduce((a,b)=>a+b,0);
 for(let i=0;i<n;i++){let x=r()*hw,h=0;while(h<23&&(x-=HOURS[h])>0)h++;const items=[];const m=1+Math.floor(r()*r()*3);
  for(let j=0;j<m;j++){const p=prods[Math.floor(r()*prods.length)];if(!p)continue;const q=r()<.15?2:1;const mods=modsFor(p.id).length&&r()<.4?[{name:modsFor(p.id)[0].opts[1+Math.floor(r()*(modsFor(p.id)[0].opts.length-1))]?.name||'',price:5}]:[];items.push({pid:p.id,qty:q,price:p.price+(mods[0]?.price||0),mods})}
  let y=r(),pay=PAYS[0][0];for(const[nm,w]of PAYS){if((y-=w)<0){pay=nm;break}}
  out.push({h,items,pay,ret:r()<.012})}
 return cache[k]=out}
/* real orders from the web POS */
function realDay(day){const k=ymd(day);return S.orders.filter(o=>o.at.startsWith(k)).map(o=>({h:+o.at.slice(12,14),items:o.items.map(i=>({pid:i.pid,qty:i.qty,price:lineTot(i)/i.qty,mods:(i.mods||[]).map(n=>({name:n}))})),pay:o.history[0]?.method||'Kontokort',ret:o.history.some(h=>h.paid<0),real:1}))}
function sales(from,to,cut){const out=[];for(let t=d0(from).getTime();t<=d0(to).getTime();t+=DAY){const day=new Date(t);let L=demoDay(day);
  if(cut&&ymd(day)===ymd(new Date()))L=L.filter(s=>s.h<new Date().getHours());L.concat(realDay(day)).forEach(s=>out.push({...s,day}))}return out}
const tot=s=>s.items.reduce((a,i)=>a+i.qty*i.price,0);
const vatOfP=pid=>{const p=P(pid),g=p&&G(p.gid);return g?g.vat:12};
/* periods */
function period(per){const t=d0(new Date());const dow=(t.getDay()+6)%7;
 if(per==='today')return {from:t,to:t,cmp:[new Date(t-DAY),new Date(t-DAY)],unit:'h',title:ymd(t),cmpT:ymd(new Date(t-DAY))};
 if(per==='yesterday'){const y=new Date(t-DAY);return {from:y,to:y,cmp:[new Date(y-DAY),new Date(y-DAY)],unit:'h',title:ymd(y),cmpT:ymd(new Date(y-DAY))}}
 const fmt=d=>d.getDate()+' '+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]+' '+d.getFullYear();
 if(per==='week'){const f=new Date(t-dow*DAY);return {from:f,to:t,cmp:[new Date(f-7*DAY),new Date(t-7*DAY)],unit:'d',title:fmt(f)+' - '+fmt(t),cmpT:'Previous week'}}
 if(per==='month'){const f=new Date(t.getFullYear(),t.getMonth(),1);const pf=new Date(t.getFullYear(),t.getMonth()-1,1);const mn=['January','February','March','April','May','June','July','August','September','October','November','December'];
  return {from:f,to:t,cmp:[pf,new Date(t.getFullYear(),t.getMonth()-1,Math.min(t.getDate(),28))],unit:'d',title:fmt(f)+' - '+fmt(t),cmpT:mn[pf.getMonth()]+' '+pf.getFullYear()}}
 if(per==='year'){const f=new Date(t.getFullYear(),0,1);return {from:f,to:t,cmp:[new Date(t.getFullYear()-1,0,1),new Date(t.getFullYear()-1,t.getMonth(),t.getDate())],unit:'m',title:fmt(f)+' - '+fmt(t),cmpT:String(t.getFullYear()-1)}}
 const f=new Date(t-29*DAY);return {from:f,to:t,cmp:[new Date(f-30*DAY),new Date(t-30*DAY)],unit:'d',title:fmt(f)+' - '+fmt(t),cmpT:'Previous 30 days'}}
function bucket(list,P,from){const key=s=>P.unit==='h'?s.h:P.unit==='m'?s.day.getMonth():Math.round((d0(s.day)-d0(from))/DAY);
 const n=P.unit==='h'?24:P.unit==='m'?12:Math.round((d0(P.to)-d0(P.from))/DAY)+1;const b=Array.from({length:n},()=>({sum:0,cnt:0}));
 list.forEach(s=>{const k=key(s);if(b[k]){b[k].sum+=tot(s);b[k].cnt++}});return b}
const fmtKr=v=>Math.round(v).toLocaleString('sv-SE').replace(/ /g,' ')+' kr';
const pct=(a,b)=>b?Math.round((a-b)/b*100):0;
/* smooth line */
function smooth(pts){if(pts.length<2)return '';let d=`M${pts[0][0]},${pts[0][1]}`;for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;
 d+=` C${p1[0]+(p2[0]-p0[0])/6},${p1[1]+(p2[1]-p0[1])/6} ${p2[0]-(p3[0]-p1[0])/6},${p2[1]-(p3[1]-p1[1])/6} ${p2[0]},${p2[1]}`}return d}
function spark(a,b,w,h){const mx=Math.max(1,...a,...b);const pt=(arr)=>arr.map((v,i)=>[(i/(Math.max(1,arr.length-1)))*w,h-4-(v/mx)*(h-12)]);
 return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none" style="display:block"><path d="${smooth(pt(b))}" fill="none" stroke="#f08a4b" stroke-width="2"/><path d="${smooth(pt(a))}" fill="none" stroke="#8fe0b5" stroke-width="2"/></svg>`}
function bars(vals,labels,colors){const w=990,h=520,mx=Math.max(1,...vals);const step=[1,2,5,10,20,50,100,200,500,1000,2000,5000,10000,20000,50000].find(s=>mx/s<=4)||100000;const top=Math.ceil(mx/step)*step;
 const cw=(w-60)/vals.length;let g='';for(let v=0;v<=top;v+=step){const y=h-24-(v/top)*(h-40);g+=`<line x1="44" x2="${w}" y1="${y}" y2="${y}" stroke="#e5e5ea"/><text x="38" y="${y+3}" font-size="9" text-anchor="end" fill="#8e8e93">${v.toLocaleString('sv-SE')}</text>`}
 vals.forEach((v,i)=>{const x=50+i*cw,bh=(v/top)*(h-40);g+=`<line x1="${x}" x2="${x}" y1="16" y2="${h-24}" stroke="#ececf0"/><rect x="${x+cw*.12}" y="${h-24-bh}" width="${cw*.76}" height="${bh}" fill="${colors[i%colors.length]}"/><text x="${x+cw/2}" y="${h-10}" font-size="9" text-anchor="middle" fill="#8e8e93">${labels[i]}</text>`});
 return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none">${g}<text x="12" y="${h/2}" font-size="8" fill="#8e8e93" transform="rotate(-90 12 ${h/2})">SEK</text></svg>`}
function lineChart(vals,labels){const w=990,h=520,mx=Math.max(1,...vals);const pts=vals.map((v,i)=>[50+i*((w-60)/Math.max(1,vals.length-1)),h-24-(v/mx)*(h-50)]);
 return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none">${[0,.25,.5,.75,1].map(f=>`<line x1="44" x2="${w}" y1="${h-24-f*(h-50)}" y2="${h-24-f*(h-50)}" stroke="#e5e5ea"/><text x="38" y="${h-21-f*(h-50)}" font-size="9" text-anchor="end" fill="#8e8e93">${Math.round(mx*f).toLocaleString('sv-SE')}</text>`).join('')}<path d="${smooth(pts)}" fill="none" stroke="#5fb8ea" stroke-width="2.5"/>${labels.map((l,i)=>`<text x="${pts[i][0]}" y="${h-8}" font-size="9" text-anchor="middle" fill="#8e8e93">${l}</text>`).join('')}</svg>`}

/* ───────── styles ───────── */
const st=document.createElement('style');st.textContent=`
#pos .an{position:absolute;left:8px;top:15px;width:1036px;height:765px;background:#f2f2f7;border-radius:10px;overflow:hidden;z-index:30;font-size:12px}
#pos .an .ah{height:56px;background:#fff;display:flex;align-items:center;padding:0 12px;gap:8px;border-bottom:1px solid #e5e5ea;position:relative}
#pos .an .ah .ttl{position:absolute;left:0;right:0;text-align:center;font-size:16px;pointer-events:none}
#pos .an .sel{height:28px;border-radius:6px;background:#eef0f6;color:var(--blue)!important;padding:0 9px;display:inline-flex;align-items:center;gap:5px;font-size:12.5px;position:relative;z-index:1}
#pos .an .bk{color:var(--blue)!important;font-size:12.5px;display:inline-flex;align-items:center;gap:4px;z-index:1}
#pos .an .flt{margin-left:auto;height:28px;border-radius:6px;background:#eef0f6;color:var(--blue)!important;padding:0 10px;display:inline-flex;gap:6px;align-items:center;font-size:12.5px;z-index:1}
#pos .an .x{color:var(--blue)!important;display:grid;z-index:1}
#pos .an .pr{display:flex;align-items:center;gap:6px;padding:10px 12px 8px}
#pos .an .pr .sq{width:11px;height:11px;border-radius:2px;background:#8fe0b5}
#pos .an .pr button.c{height:28px;border-radius:6px;background:#e5e7f0;color:var(--blue)!important;padding:0 8px;font-size:12.5px}
#pos .an .pr button.c.on{background:var(--blue);color:#fff!important}
#pos .an .cmp{margin-left:auto;display:flex;align-items:center;gap:6px;background:#e5e7f0;border-radius:6px;height:28px;padding:0 8px;font-size:12.5px}#pos .an .cmp b{font-weight:400;color:var(--blue)}
#pos .an .cmp i{width:11px;height:11px;border-radius:2px;background:#f08a4b;display:inline-block;margin-left:-26px;margin-right:10px}
#pos .an .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:0 12px}
#pos .an .card{background:#fff;border-radius:6px;padding:12px 12px 10px;position:relative}
#pos .an .card h6{margin:0;font-size:10px;font-weight:700;letter-spacing:.02em}#pos .an .card h6 small{display:block;font-weight:400;font-size:8.5px;color:#6b6b70;margin-top:1px}
#pos .an .amore{position:absolute;right:12px;top:10px;background:var(--blue);color:#fff!important;font-size:9px;font-weight:700;border-radius:3px;padding:2px 6px}
#pos .an .v1{display:flex;align-items:center;gap:6px;margin-top:6px;font-size:14px;font-weight:700}#pos .an .v1 small{font-weight:400;font-size:12px}
#pos .an .v2{display:flex;align-items:center;gap:6px;font-size:12px;margin-top:3px}
#pos .an .lg{width:10px;height:10px;border-radius:2px;display:inline-block}
#pos .an .sub{border-top:1px dashed #d1d1d6;margin:10px -12px 0;padding:10px 12px 0}#pos .an .sub h6{font-size:9.5px;color:#6b6b70}#pos .an .sub b{font-size:14px;display:block;margin-top:3px}#pos .an .sub b small{font-weight:400;font-size:12px}
#pos .an .ret{display:grid;grid-template-columns:repeat(3,1fr);margin:18px 12px;background:#e5e5ea;border-radius:6px;padding:12px}
#pos .an .ret h6{margin:0;font-size:9.5px;color:#6b6b70;font-weight:600}#pos .an .ret b{font-size:14px;display:block;margin-top:5px}#pos .an .ret b small{font-weight:400;font-size:12px}
#pos .an .lst{background:#fff;border-radius:6px;min-height:330px;overflow:hidden}
#pos .an .lst .lh{display:flex;justify-content:space-between;align-items:center;padding:9px 12px;border-bottom:1px solid #e5e5ea;font-size:10px;color:#6b6b70;font-weight:600;position:relative}
#pos .an .lst .lh .amore{position:static}
#pos .an .lst .li{display:flex;justify-content:space-between;padding:0 12px;height:35px;align-items:center;border-bottom:1px solid #e5e5ea;font-size:12.5px}
#pos .an .kpi{display:grid;grid-template-columns:repeat(4,1fr);margin:0 12px;background:#fff;border-radius:6px}
#pos .an .kpi div{padding:10px 12px;border-right:1px solid #ececf0}#pos .an .kpi div:last-child{border:0}#pos .an .kpi h6{margin:0;font-size:9.5px;color:#6b6b70;font-weight:600}#pos .an .kpi b{font-size:14px;display:block;margin-top:4px}
#pos .an .big{margin:8px 12px 12px;background:#fff;border-radius:6px;height:calc(100% - 196px);display:flex;flex-direction:column;padding:12px}
#pos .an .big.t{height:calc(100% - 118px)}
#pos .an .bt{display:flex;align-items:center;gap:6px;margin-bottom:10px}
#pos .an .chipS{height:26px;border-radius:4px;padding:0 8px;display:inline-flex;align-items:center;font-size:12px}
#pos .an .vt{margin-left:auto;display:flex;gap:6px}#pos .an .vt button{width:30px;height:28px;border-radius:5px;background:#e5e7f0;color:var(--blue)!important;display:grid;place-items:center}#pos .an .vt button.on{background:var(--blue);color:#fff!important}
#pos .an .csv{color:var(--blue)!important;font-size:12.5px;display:inline-flex;gap:5px;align-items:center}
#pos .an table{width:100%;border-collapse:collapse;font-size:12px}#pos .an th{background:#e5e5ea;text-align:left;padding:7px 6px;font-weight:600;border-right:2px solid #fff;white-space:nowrap}#pos .an th span{float:right;color:#8e8e93;font-size:9px}
#pos .an td{padding:0 6px;height:43px;border-bottom:1px solid #e5e5ea}#pos .an td.lnk{color:var(--blue);font-weight:500}
#pos .an .menu{position:absolute;left:44px;top:46px;background:rgba(245,245,247,.97);border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.18);z-index:5;width:184px;overflow:hidden}
#pos .an .menu button{display:block;width:100%;text-align:left;padding:0 12px;height:41px;font-size:12.5px;border-bottom:1px solid #e1e1e6}#pos .an .menu button.on{font-weight:600}
`;document.head.appendChild(st);

const IC2={line:'<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 13V3M2 13h12M4 10l3-3 2 2 4-4"/></svg>',bar:'<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="2" y="7" width="2" height="6"/><rect x="5.5" y="4" width="2" height="9"/><rect x="9" y="6" width="2" height="7"/><rect x="12.5" y="9" width="2" height="4"/><rect x="1" y="13.5" width="14" height="1"/></svg>',tbl:'<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="1.5" y="2" width="13" height="3" rx=".5"/><rect x="1.5" y="6.5" width="13" height="3" rx=".5"/><rect x="1.5" y="11" width="13" height="3" rx=".5"/></svg>',rep:'<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="1.5" width="10" height="13" rx="1.5"/><path d="M5.5 5h5M5.5 8h5M5.5 11h3"/></svg>',flt:'<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 4h12M2 8h12M2 12h12"/><circle cx="5" cy="4" r="1.5" fill="#fff"/><circle cx="10" cy="8" r="1.5" fill="#fff"/><circle cx="6" cy="12" r="1.5" fill="#fff"/></svg>'};
const VIEWS=[['overview','Overview'],['total','Total sales'],['groups','Groups'],['products','Number of sold products'],['mods','Modifiers']];

function agg(list){const g={},p={},pm={},md={};let n=0,sum=0,rv=0,rn=0;
 list.forEach(s=>{const t=tot(s);if(s.ret){rv+=t;rn++;return}n++;sum+=t;pm[s.pay]=pm[s.pay]||{n:0,v:0};pm[s.pay].n++;pm[s.pay].v+=t;
  s.items.forEach(i=>{const pr=P(i.pid);const gid=pr?pr.gid:'?';const gn=(G(gid)||{name:'Övrigt'}).name;g[gn]=g[gn]||{q:0,v:0,vat:G(gid)?.vat??12};g[gn].q+=i.qty;g[gn].v+=i.qty*i.price;
   const pn=pr?pr.name:'Artikel';p[pn]=p[pn]||{q:0,v:0,vat:G(gid)?.vat??12};p[pn].q+=i.qty;p[pn].v+=i.qty*i.price;(i.mods||[]).forEach(m=>{if(!m.name)return;md[m.name]=md[m.name]||{q:0,v:0};md[m.name].q+=i.qty;md[m.name].v+=(m.price||0)*i.qty})})});
 return {g,p,pm,md,n,sum,rv,rn}}
function anHtml(){const a=UI.an,Pd=period(a.per);const cur=sales(Pd.from,Pd.to,true),prev=sales(Pd.cmp[0],Pd.cmp[1]);const A1=agg(cur),A0=agg(prev);
 const chips=(leg)=>`<div class="pr">${leg?'<span class="sq"></span>':''}${[['today','Today'],['yesterday','Yesterday'],['week','This week'],['month','This month'],['year','This year'],['custom','Custom']].map(([k,l])=>`<button class="c ${a.per===k?'on':''}" data-a="anper" data-x="${k}" data-g="an-${k}">${l}</button>`).join('')}${leg?`<span class="cmp"><i></i>Compared with: <b>${Pd.cmpT}</b></span>`:''}</div>`;
 const vname=VIEWS.find(v=>v[0]===a.view)[1];
 const head=`<div class="ah">${a.view!=='overview'?`<button class="bk" data-a="anback" data-g="an-back">‹ Back</button>`:''}<button class="sel" data-a="anmenu" data-g="an-menu">${IC2.rep} ${vname} ⇕</button><div class="ttl">${Pd.title}</div><button class="flt" data-a="nop">${IC2.flt} Filter results</button><button class="x" data-a="anclose" data-g="an-close">${IC.x.replace('<svg','<svg style="width:17px;height:17px"')}</button>
  ${a.menu?`<div class="menu">${VIEWS.map(([k,l])=>`<button class="${a.view===k?'on':''}" data-a="anview" data-x="${k}">${l}</button>`).join('')}</div>`:''}</div>`;
 let body='';
 if(a.view==='overview'){const b1=bucket(cur,Pd,Pd.from),b0=bucket(prev,Pd,Pd.cmp[0]);
  const card=(t,more,v1,v0,fmt,arr1,arr0,sub,subv)=>`<div class="card"><h6>${t}<small>(incl. online sales)</small></h6><button class="amore" data-a="anview" data-x="total">MORE</button><div style="margin:8px -2px 6px">${spark(arr1,arr0,300,82)}</div>
   <div class="v1"><span class="lg" style="background:#8fe0b5"></span>${fmt(v1)} <small>(${pct(v1,v0)>0?'+':''}${pct(v1,v0)}%)</small></div><div class="v2"><span class="lg" style="background:#f08a4b"></span>${fmt(v0)}</div>
   <div class="sub"><h6>${sub}</h6><b>${subv} <small>(0%)</small></b></div></div>`;
  const avg1=A1.n?A1.sum/A1.n:0,avg0=A0.n?A0.sum/A0.n:0;const on=S.onlineHistory?S.onlineHistory.length:0;
  const top=(o,k,lim)=>Object.entries(o).sort((x,y)=>y[1][k]-x[1][k]).slice(0,lim||9);
  body=chips(1)+`<div class="grid3">${card('TOTAL SALES',1,A1.sum,A0.sum,fmtKr,b1.map(x=>x.sum),b0.map(x=>x.sum),'TOTAL ONLINE SALES','0 kr')}${card('NUMBER OF SALES',1,A1.n,A0.n,v=>v+' pcs',b1.map(x=>x.cnt),b0.map(x=>x.cnt),'NUMBER OF ONLINE SALES',on+' pcs')}${card('AVERAGE SALE',1,avg1,avg0,fmtKr,b1.map(x=>x.cnt?x.sum/x.cnt:0),b0.map(x=>x.cnt?x.sum/x.cnt:0),'AVERAGE ONLINE ORDER VALUE','0 kr')}</div>
   <div class="ret"><div><h6>TOTAL RETURN VALUE</h6><b>${fmtKr(A1.rv)} <small>(${pct(A1.rv,A0.rv)}%)</small></b></div><div><h6>NUMBER OF RETURNS</h6><b>${A1.rn} ${A1.rn===1?'unit':'pcs'} <small>(${pct(A1.rn,A0.rn)}%)</small></b></div><div><h6>AVERAGE RETURN VALUE</h6><b>${fmtKr(A1.rn?A1.rv/A1.rn:0)} <small>(0%)</small></b></div></div>
   <div class="grid3"><div class="lst"><div class="lh">GROUPS<button class="amore" data-a="anview" data-x="groups">MORE</button></div>${top(A1.g,'v',8).map(([n,x],i)=>`<div class="li"><span>${i+1}  ${esc(n)}</span><span>${fmtKr(x.v)}</span></div>`).join('')}</div>
   <div class="lst"><div class="lh">NUMBER OF SOLD PRODUCTS<button class="amore" data-a="anview" data-x="products">MORE</button></div>${top(A1.p,'q',8).map(([n,x],i)=>`<div class="li"><span>${i+1}  ${esc(n)}</span><span>${x.q} st</span></div>`).join('')}</div>
   <div class="lst"><div class="lh">PAYMENT METHODS</div>${Object.entries(A1.pm).sort((x,y)=>y[1].n-x[1].n).map(([n,x],i)=>`<div class="li"><span>${i+1}  ${esc(n)}</span><span>${x.n} st (${fmtKr(x.v)})</span></div>`).join('')}</div></div>`}
 else if(a.view==='total'){const b=bucket(cur,Pd,Pd.from);const lbl=b.map((_,i)=>Pd.unit==='h'?String(i):Pd.unit==='m'?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]:String(new Date(Pd.from.getTime()+i*DAY).getDate()));
  const vat=cur.filter(s=>!s.ret).reduce((x,s)=>x+s.items.reduce((y,i)=>{const r=vatOfP(i.pid);return y+i.qty*i.price*r/(100+r)},0),0);const ct=a.ct||'bar';
  const rows=b.map((x,i)=>({d:Pd.unit==='h'?`${ymd(Pd.from)} ${String(i).padStart(2,'0')}:00`:Pd.unit==='m'?lbl[i]+' '+Pd.from.getFullYear():ymd(new Date(Pd.from.getTime()+i*DAY)),...x})).filter(r=>r.cnt);
  body=chips(0)+`<div class="kpi"><div><h6>TOTAL</h6><b>${fmtKr(A1.sum).replace(' kr',',00 kr')}</b></div><div><h6>TOTAL VAT</h6><b>${(Math.round(vat*100)/100).toFixed(2).replace('.',',')} kr</b></div><div><h6>EX VAT</h6><b>${(Math.round((A1.sum-vat)*100)/100).toFixed(2).replace('.',',')} kr</b></div><div><h6>DISCOUNTS</h6><b>0 kr</b></div></div>
   <div class="big"><div class="bt">${ct==='table'?`<button class="csv" data-a="ancsv">⤓ Export CSV</button>`:`<span class="chipS" style="background:#b5e0f7">${esc(S.store)}</span>`}<div class="vt">${[['line',IC2.line],['bar',IC2.bar],['table',IC2.tbl]].map(([k,i])=>`<button class="${ct===k?'on':''}" data-a="anct" data-x="${k}">${i}</button>`).join('')}</div></div>
   <div style="flex:1;min-height:0;overflow:auto">${ct==='table'?`<table><tr><th>Date/Time<span>⇕</span></th><th>Quantity<span>⇕</span></th><th>Total<span>⇕</span></th><th>Discounts<span>⇕</span></th><th>VAT<span>⇕</span></th><th>Ex VAT<span>⇕</span></th></tr>${rows.map(r=>`<tr><td>${r.d}</td><td>${r.cnt} st</td><td>${fmtKr(r.sum)}</td><td>0 kr</td><td>${(r.sum*0.107).toFixed(2).replace('.',',')} kr</td><td>${(r.sum*0.893).toFixed(2).replace('.',',')} kr</td></tr>`).join('')}</table>`:ct==='bar'?bars(b.map(x=>x.sum),lbl,['#b5e0f7']):lineChart(b.map(x=>x.sum),lbl)}</div></div>`}
 else{const src=a.view==='groups'?A1.g:a.view==='products'?A1.p:A1.md;const rows=Object.entries(src).sort((x,y)=>y[1].v-x[1].v||y[1].q-x[1].q);const ct=a.ct2||'table';
  body=chips(0)+`<div class="big t"><div class="bt">${ct==='table'?`<button class="csv" data-a="ancsv">⤓ Export CSV</button>`:''}<div class="vt">${[['bar',IC2.bar],['table',IC2.tbl]].map(([k,i])=>`<button class="${ct===k?'on':''}" data-a="anct2" data-x="${k}">${i}</button>`).join('')}</div></div>
   <div style="flex:1;min-height:0;overflow:auto">${ct==='bar'?bars(rows.slice(0,12).map(r=>r[1].v),rows.slice(0,12).map(r=>r[0].slice(0,10)),['#b5e0f7','#fbe08f','#c7f0a8','#f6c2c2']):`<table><tr><th>Name<span>⇕</span></th><th>Quantity<span>⇕</span></th><th>Total<span>⇕</span></th><th>Discounts<span>⇕</span></th>${a.view==='mods'?'':'<th>VAT%<span>⇕</span></th>'}<th>VAT<span>⇕</span></th><th>Ex VAT<span>⇕</span></th></tr>
   ${rows.map(([n,x])=>{const r=x.vat??12;const v=x.v*r/(100+r);return `<tr><td class="lnk">${esc(n)}</td><td>${x.q} st</td><td>${fmtKr(x.v)}</td><td>0 kr</td>${a.view==='mods'?'':`<td>${r} %</td>`}<td>${v.toFixed(2).replace('.',',')} kr</td><td>${(x.v-v).toFixed(2).replace('.',',')} kr</td></tr>`}).join('')}</table>`}</div></div>`}
 return `<div class="an" data-g="analytics-view">${head}${body}</div>`}

UI.an=null;
const _r=render;render=function(){_r();if(UI.an)document.getElementById('pos').insertAdjacentHTML('beforeend',anHtml())};
Object.assign(A,{anper(k){UI.an.per=k;UI.an.menu=false;render()},anmenu(){UI.an.menu=!UI.an.menu;render()},anview(v){UI.an.view=v;UI.an.menu=false;render();emit('an:view',v)},
 anback(){UI.an.view='overview';render()},anclose(){UI.an=null;render();emit('an:close')},anct(k){UI.an.ct=k;render()},anct2(k){UI.an.ct2=k;render()},ancsv(){toast('CSV-filen exporteras (demo)')}});
/* PIN → Analytics opens the full-screen view instead of a modal */
const _push=push;push=function(p,d){if(p==='analytics'){UI.modal=null;UI.an={view:'overview',per:'today'};render();emit('open:analytics');return}return _push(p,d)};
const _go=A.go;A.go=function(x,el){if(x==='analytics'){UI.modal=null;UI.an={view:'overview',per:'today'};render();emit('open:analytics');return}return _go(x,el)};

/* Time Tracking: "Already signed in users" row + Active personnel page */
const _tt=PAGES.timetrack;PAGES.timetrack=d=>{const r=_tt(d);const n=Object.keys(S.staffIn||{}).length;
 r.body=`<button class="row" style="background:#fff;border-radius:8px;min-height:40px;margin:2px 0 0" data-a="ttactive" data-g="tt-active">Already signed in users<span class="chev"><span class="val" style="color:#1c1c1e">${n}</span>${IC.chev}</span></button>`+r.body;return r};
A.ttactive=()=>push('ttlist',{});
PAGES.ttlist=()=>({title:'Active personnel',bodyCss:'padding-top:22px',body:Object.entries(S.staffIn||{}).map(([n,t])=>`<div class="row" style="background:#fff;border-radius:20px;min-height:40px;margin-bottom:8px;padding:0 16px"><span>${esc(n)}</span><span style="margin-left:auto;font-size:12.5px">Shift started at ${esc(t)}:00</span></div>`).join('')||'<p style="text-align:center;color:#8e8e93;margin-top:40px">Ingen är inloggad just nu.</p>'});
})();
/* Time Tracking: confirm start / end of shift after PIN */
(()=>{const hm=s=>String(s||'').slice(12,17);const dur=s=>{const m=String(s||'').match(/(\d{4})-(\d\d)-(\d\d), (\d\d):(\d\d)/);if(!m)return '';const d=new Date(+m[1],m[2]-1,+m[3],+m[4],+m[5]);const min=Math.max(0,Math.round((Date.now()-d)/60000));return `${Math.floor(min/60)} h ${min%60} min`};
 PAGES.ttconfirm=d=>{const n=d.name,since=(S.staffIn||{})[n];const ic=`<div style="width:64px;height:64px;border-radius:50%;background:${since?'#ffe8e6':'#e6f6ec'};display:grid;place-items:center;margin:0 auto 14px;color:${since?'#e5484d':'#34c759'}">${IC.clock?IC.clock.replace('<svg','<svg style="width:30px;height:30px"'):'⏱'}</div>`;
  return {title:'Time Tracking',bodyCss:'padding-top:40px',body:`<div style="max-width:360px;margin:0 auto;text-align:center">${ic}<div style="font:700 18px/1.3 Inter,sans-serif">${esc(n)}</div>
   <div style="color:#6b6b70;font-size:13px;margin:6px 0 22px">${since?`Signed in since ${hm(since)} · ${dur(since)}`:'Not signed in'}</div>
   <div class="card"><div class="rfl">Date<span class="rv">${now().slice(0,10)}</span></div><div class="rfl">${since?'Shift started':'Shift starts'}<span class="rv">${since?hm(since):now().slice(12,17)}</span></div>${since?`<div class="rfl">Shift ends<span class="rv">${now().slice(12,17)}</span></div>`:''}</div></div>`,
   foot:`<button class="btnb g" style="min-width:160px" data-a="ttcancel">Cancel</button>${since?`<button class="btnb" style="min-width:200px;background:var(--red)!important" data-a="ttend" data-g="tt-end">End shift</button>`:`<button class="btnb" style="min-width:200px" data-a="ttstart" data-g="tt-start">Start shift</button>`}`}};
 Object.assign(A,{ttcancel(){pop()},
  ttstart(){const n=mtop().d.name;S.staffIn=S.staffIn||{};S.staffIn[n]=now();S.timelog.push({name:n,in:now()});save();pop();emit('shift');emit('shift:in');toast(`${n}: passet startat ${now().slice(12,17)}`)},
  ttend(){const n=mtop().d.name;const l=S.timelog.slice().reverse().find(x=>x.name===n&&!x.out);if(l)l.out=now();delete S.staffIn[n];save();pop();emit('shift');emit('shift:out');toast(`${n}: passet avslutat ${now().slice(12,17)}`)}});
})();
