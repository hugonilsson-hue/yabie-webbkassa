/* Kampanjer skapade i Backstage (bs:1) gäller i både iPad-kassan och mobilkassan. */
(()=>{const today=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`};
 const live=pr=>pr.bs&&pr.auto&&pr.active!==false&&!pr.loy&&(!pr.from||pr.from<=today())&&(!pr.to||pr.to>=today());
 const elig=(pr,pid)=>{const r=pr.rule||{},g=(r.gids||[]),ps=(r.pids||[]);if(!g.length&&!ps.length)return true;const p=S.products.find(x=>x.id===pid);return ps.includes(pid)||(p&&g.includes(p.gid))};
 window.bsPromoCalc=items=>{const res={disc:0,lines:[]};(S.promotions||[]).filter(live).forEach(pr=>{const its=items.filter(it=>elig(pr,it.pid));const sum=its.reduce((a,it)=>a+it.tot,0);if(!its.length||!sum)return;
   const r=pr.rule;let d=r.pct?sum*r.pct/100:Math.min(sum,r.kr||0);d=Math.round(d*100)/100;if(d>0){res.disc+=d;res.lines.push([pr.name,d])}});return res};
 if(typeof promoCalc==='function'){const o=promoCalc;promoCalc=function(c=C()){const r=o(c);if(c.ret)return r;const x=bsPromoCalc(c.items.map(it=>({pid:it.pid,tot:lineTot(it)})));r.disc+=x.disc;r.lines.push(...x.lines);return r}}
})();
