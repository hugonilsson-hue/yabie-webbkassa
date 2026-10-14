/* Anonym användningsstatistik (bara på den egna webbplatsen, inte i claude.ai).
   Räknar hur många som startar och klarar varje guide och hur ofta varje provfråga besvaras rätt eller fel. */
(()=>{
if(/claudeusercontent|claude\.ai/.test(location.hostname)||location.protocol==='file:')return;
const K='kassaskolan-ev',CK='kassaskolan-cid';
let cid='';try{cid=localStorage.getItem(CK)||''}catch(e){}
if(!/^[a-z0-9]{8,32}$/.test(cid)){cid=Array.from(crypto.getRandomValues(new Uint8Array(16)),x=>'abcdefghjkmnpqrstuvwxyz23456789'[x%31]).join('');try{localStorage.setItem(CK,cid)}catch(e){}}
let E={};try{E=JSON.parse(localStorage.getItem(K)||'{}')||{}}catch(e){}
const today=()=>new Date().toISOString().slice(0,10);
E.s=E.s||{};E.d=E.d||{};E.p=E.p||{};E.q=E.q||{};E.f=E.f||today();
let timer=null;
const save=()=>{E.l=today();E.lang=TS.lang||'sv';try{localStorage.setItem(K,JSON.stringify(E))}catch(e){}
 clearTimeout(timer);timer=setTimeout(()=>{fetch('/api/ev/'+cid,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify(E),keepalive:true}).catch(()=>{})},4000)};
const inc=(o,k)=>{o[k]=(o[k]||0)+1};
window.qHash=s=>{let h=2166136261;for(const c of String(s)){h^=c.codePointAt(0);h=Math.imul(h,16777619)>>>0}return h.toString(36)};
window.statQuiz=(app,q,right)=>{const a=E.q[app]=E.q[app]||{};const h=qHash(q);const v=a[h]=a[h]||[0,0];v[right?0:1]++;save()};
const _start=startTour;startTour=function(id){if(!window.__prac&&TOURS.some(t=>t.id===id))inc(E.s,id),save();return _start.apply(this,arguments)};
const _fin=finishTour;finishTour=function(){const id=T&&T.t.id,pr=T&&T.practice;const r=_fin.apply(this,arguments);if(id){inc(pr?E.p:E.d,id);save()}return r};
save();
})();
