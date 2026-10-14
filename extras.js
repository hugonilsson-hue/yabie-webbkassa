/* Hooks (ids + events) used by the unlockable "Fler guider" tours. */
(()=>{
const wrapPage=(n,f)=>{const o=PAGES[n];if(o)PAGES[n]=d=>f(o(d),d)};
const wrapAct=(n,ev,sig)=>{const o=A[n];if(o)A[n]=function(...a){const b=sig?sig():null;const r=o.apply(this,a);if(!sig||sig()!==b)emit(ev,a[0]);return r}};
/* customers: row ids and "use on order" */
wrapPage('customers',r=>{r.body=r.body.replace(/<tr data-a="go" data-x="custdetail" data-y="([^"]+)"/g,(m,id)=>{const c=S.customers.find(x=>x.id===id);return m+` data-g="cust-row-${slug(c?c.name:id)}"`});return r});
wrapPage('custdetail',(r,d)=>{if(!/custtoorder/.test(r.body+(r.foot||'')))r.foot=`<button class="btnb" data-a="custtoorder" data-x="${d.id}" data-g="cust-use">Lägg till på ordern</button>`;else r.foot=(r.foot||'').replace('data-a="custtoorder"','data-a="custtoorder" data-g="cust-use"');return r});
wrapAct('custtoorder','customer',()=>C().customer);
/* variable price (gift card) */
wrapPage('askprice',r=>{r.foot=r.foot.replace('data-a="askpriceok"','data-a="askpriceok" data-g="askprice-ok"');return r});
/* tips */
wrapPage('tip',r=>{r.body=r.body.replace(/data-a="tipgo" data-x="([\d.]+)">(\d+) %/g,(m,v,p)=>`data-a="tipgo" data-x="${v}" data-g="tip-${p}">${p} %`);return r});
/* promotion, modifier set and discount button forms */
wrapPage('promoform',r=>{r.body=r.body.replace('data-in="prname"','data-in="prname" data-g="in-prname"').replace('data-in="prp"','data-in="prp" data-g="in-prp"');return r});
wrapPage('modform',r=>{r.body=r.body.replace('data-in="oname"','data-in="oname" data-g="in-oname"').replace('data-in="oprice"','data-in="oprice" data-g="in-oprice"');return r});
wrapAct('promosave','promo:save',()=>S.promotions.length);wrapAct('modsave','modset:save',()=>S.modifiers.length);wrapAct('dbsave','discbtn:save',()=>JSON.stringify(S.discounts));wrapAct('modoptadd','modset:opt',()=>UI.f.mf&&UI.f.mf.opts.length);
wrapAct('ttab','tables:tab');
})();
(()=>{const _rp=rightPanel;rightPanel=function(){return _rp().replace('data-a="m-tiptog"','data-a="m-tiptog" data-g="more-tipping"')};
const o=A['m-tiptog'];A['m-tiptog']=function(){o();emit('tipping',S.tipping.on)}})();
(()=>{on(e=>{if(e==='open:timetrack')setTimeout(()=>{UI.f.pin='';render()},0)});
const mo=A.modopen;if(mo)A.modopen=function(...a){const r=mo.apply(this,a);emit('open:modifiers');return r};
const th=tablesHtml;tablesHtml=function(){return th().replace('data-a="ttab" data-x="all"','data-a="ttab" data-x="all" data-g="tables-all"')}})();
(()=>{const s=A.search;A.search=function(...a){const r=s.apply(this,a);emit('search');return r};
on((e,d)=>{if(e==='input'&&d&&d.k==='sq'&&UI.search&&UI.search.q!==d.v){UI.search.q=d.v;render()}})})();
