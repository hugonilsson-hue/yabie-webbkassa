/* Z- and X-reports shown as the register's A4-style report (Huvudgrupp, Moms, Likvida medel, Grand totals). */
(()=>{
const st=document.createElement('style');st.textContent=`
#pos .zr{background:#fff;margin:0 4px;padding:46px 54px 60px;color:#111;font-size:11.5px;min-height:100%}
#pos .zr .hd{display:flex;justify-content:space-between;margin-bottom:26px}
#pos .zr .hd b.big{font-size:15px;letter-spacing:.01em}#pos .zr .hd .mut{color:#5b6b85;font-weight:700;font-size:11px;line-height:1.5}
#pos .zr .hd .r{text-align:right}#pos .zr .hd .r b{font-size:13px}
#pos .zr table{width:100%;border-collapse:collapse}#pos .zr th{background:#d9d9dc;text-align:left;font-weight:700;padding:3px 3px;font-size:11.5px;white-space:nowrap}
#pos .zr td{padding:4px 3px;font-size:11.5px}#pos .zr .n{text-align:right}
#pos .zr .big td{font-size:13px}#pos .zr .ztot td{border-top:2px solid #333;font-size:13px;font-weight:700;padding-top:6px}
#pos .zr .grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}
#pos .zr .grid3{display:grid;grid-template-columns:1.6fr 1fr 1.6fr;gap:4px;margin-top:22px;align-items:start}
#pos .zr .kv{display:grid;grid-template-columns:1fr auto;gap:3px 0}#pos .zr .kv .h{background:#d9d9dc;font-weight:700;padding:3px 4px;grid-column:1/-1}
#pos .zr .kv .h2{background:#d9d9dc;font-weight:700;padding:3px 4px}#pos .zr .kv span{padding:3px 4px}`;document.head.appendChild(st);
const n=v=>n2(v||0);
const share=`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12M8 7l4-4 4 4M6 11H5v10h14V11h-1"/></svg>`;
/* deterministic group split for reports that only stored totals */
function groupsOf(z){if(z.groups)return z.groups;const w=[38,14,24,16,8];const gs=S.groups.slice(0,5);const sum=w.reduce((a,b)=>a+b,0);
 return gs.map((g,i)=>({name:g.name,qty:Math.round((z.count||0)*w[i]/sum*1.6),amt:(z.total||0)*w[i]/sum}))}
function detail(orders){const g={},ret={};let disc=0,dc=0,copies=0;orders.forEach(o=>o.history.forEach(h=>h.items.forEach(it=>{const gr=G(P(it.pid)?.gid);const k=gr?gr.name:'Övrigt';const amt=lineTot(it)*(1-(o.orderDisc||0)/100);const tgt=h.paid<0?ret:g;
 tgt[k]=tgt[k]||{name:k,qty:0,amt:0};tgt[k].qty+=Math.abs(it.qty);tgt[k].amt+=Math.abs(amt);if(it.disc&&h.paid>=0){disc+=it.price*it.qty*it.disc/100;dc++}})));return {groups:Object.values(g),rgroups:Object.values(ret),disc,dc}}
const _zf=zFrom;zFrom=function(orders,at){const z=_zf(orders,at);const d=detail(orders);Object.assign(z,d);z.from=S.zreports.length?S.zreports[S.zreports.length-1].at:'2026-09-25, 11:27';z.no=651+S.zreports.length;return z};
function report(d){const z=d.z||{},isZ=d.kind==='z';const gs=groupsOf(z),rg=z.rgroups||[];const sales=gs.reduce((a,g)=>a+g.amt,0),ret=rg.reduce((a,g)=>a+g.amt,0);const cnt=gs.reduce((a,g)=>a+g.qty,0),rcnt=rg.reduce((a,g)=>a+g.qty,0);
 const total=z.total!=null?z.total:sales-ret;
 let vat=[[25,z.vat25],[12,z.vat12],[6,z.vat6]].filter(v=>v[1]);if(!vat.length&&total)vat=[[12,total*12/112]];{const br=vat.reduce((a,[p,m])=>a+m*(100+p)/p,0);if(br&&Math.abs(br-total)>0.01){const f=total/br;vat=vat.map(([p,m])=>[p,m*f])}}const vatRows=vat.map(([p,m])=>{const br=m*(100+p)/p;return `<tr><td>${p} %</td><td class="n">${n(m)}</td><td class="n">${n(br-m)}</td><td class="n">${n(br)}</td></tr>`}).join('');
 const vt=vat.reduce((a,v)=>a+v[1],0);const methods=Object.entries(z.methods||{});
 const ggrand=(S.zreports||[]).reduce((a,r)=>a+(r.total||0),0)+(isZ?0:total)+346671.8;
 const row=(g,tot)=>`<tr class="big"><td>${g.qty} x ${esc(g.name)}</td><td class="n">${tot?Math.round(g.amt/tot*100):0} %</td><td class="n">${n(g.qty?g.amt/g.qty:0)}</td><td class="n">${n(g.amt)}</td></tr>`;
 return `<div class="zr"><div class="hd"><div><b class="big">${esc(S.store)} AB</b><div class="mut">559999-0000<br>Från: ${esc(z.from||'2026-09-25 11:27')}<br>Till: ${esc(z.at||now())}<br>Genererad: ${esc(z.at||now())}</div></div>
  <div class="r"><b>Butik: ${esc(S.store)}</b><div class="mut">Storgatan 1 111 22, Stockholm, Sverige<br>Kassabeteckning: ${esc(String(S.register).replace(/\D/g,'')||'1')}</div><b>${isZ?'Z-Rapport: '+(z.no||651):'X-Rapport'}</b><div class="mut">Datum: ${esc((z.at||now()).slice(0,10))}</div></div></div>
 <table><tr><th>x. Huvudgrupp</th><th class="n">Procent Totalt</th><th class="n">Snitt</th><th class="n">Summa</th></tr>${gs.filter(g=>g.qty).map(g=>row(g,sales)).join('')}<tr class="big"><td>Total försäljning: <b>${cnt} x</b></td><td></td><td></td><td class="n"><b>${n(sales)}</b></td></tr></table>
 <table style="margin-top:10px"><tr><th>x. Huvudgrupp returer</th><th class="n">Procent Totalt</th><th class="n">Snitt</th><th class="n">Summa</th></tr>${rg.map(g=>row(g,ret)).join('')}<tr class="big"><td>Total returer: <b>${rcnt} x</b></td><td></td><td></td><td class="n"><b>${n(ret)}</b></td></tr>
  <tr class="ztot"><td>Total:</td><td></td><td></td><td class="n">${n(total)}</td></tr></table>
 <div class="grid2"><table><tr><th>Moms%</th><th class="n">Moms</th><th class="n">Netto</th><th class="n">Brutto</th></tr>${vatRows}<tr><td>Tot.</td><td class="n">${n(vt)}</td><td class="n">${n(total-vt)}</td><td class="n">${n(total)}</td></tr></table>
  <table><tr><th colspan="2">Likvida Medel</th></tr>${methods.map(([m,v])=>`<tr><td>${esc(m)}</td><td class="n">${n(v)}</td></tr>`).join('')}<tr><td>Totalt</td><td class="n">${n(methods.reduce((a,m)=>a+m[1],0)||total)}</td></tr></table></div>
 <div class="grid3"><div class="kv"><div class="h">Rabatter</div><span>${(z.dc||0)+(sales-ret-total>0.005?1:0)}</span><span class="n">${n((z.disc||0)+Math.max(0,sales-ret-total))}</span><div class="h">Borttagna artiklar från varukorgen</div><span>${z.removed||0}</span><span class="n">${n(z.removedAmt)}</span>
   <div class="h">Avbrutna köp / Borttagna ordrar</div><span>${z.aborted||0}</span><span></span><div class="h">Oavslutade försäljningar</div><span>${S.parked.length}</span><span class="n">${n(S.parked.reduce((a,c)=>a+cartTot(c),0))}</span><div class="h">Gäster&nbsp;&nbsp;&nbsp;<span style="float:right;padding:0">Snitt</span></div><span>${z.guests||0}</span><span class="n">${z.guests?n(total/z.guests):''}</span></div>
  <div class="kv"><div class="h">Kvittokopior</div><span>${z.copies||0}</span><span class="n">${n(0)}</span><div class="h">Kassakvitton</div><span>${z.count||0}</span><span class="n">${n(total)}</span><div class="h">Returer</div><span>${z.returns||0}</span><span class="n">${n(ret)}</span></div>
  <div class="kv"><span class="h2">Avrundning</span><span class="n">0,00</span><span class="h2">Grand total försäljning</span><span class="n">${n(ggrand)}</span><span class="h2">Grand total retur</span><span class="n">${n(17178.3)}</span><span class="h2">Grand total netto</span><span class="n">${n(ggrand-17178.3)}</span></div></div></div>`}
const _rc=PAGES.receipt;PAGES.receipt=d=>{if(d.kind!=='z'&&d.kind!=='x')return _rc(d);const z=d.z||{};
 return {white:true,title:esc((z.at||now()).replace(' ',', ').replace(',,',',')),bodyCss:'background:#ececee;padding:10px 0 20px',pill:{a:'nop',html:`<span style="display:inline-flex;gap:14px;align-items:center"><button data-a="zprint" data-g="z-print" style="display:grid">${IC.printer.replace('<svg','<svg style="width:19px;height:19px"')}</button><button data-a="zshare" data-g="z-share" style="display:grid">${share}</button></span>`},body:report(d)}};
window.zReportHtml=report;
A.zprint=()=>{toast('Rapporten skrivs ut på '+S.printer.name);emit('z:print')};
A.zshare=()=>{toast('Rapporten delas som PDF');emit('z:share')};
/* past Z-reports (list) open the same report */
})();
