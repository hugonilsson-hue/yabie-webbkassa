/* Backstage: redigera och ta bort befintliga objekt (alternativ, varianter, tillval, ingredienser, popup, kampanjer, stationer, KDS, rätter, presentkortsmallar). */
(()=>{const {D,B,F,go,INIT,btoast,lbl,inp,ta,dd,isOn,tgl,chk,ibtn,actPill,addBox,dlg,openDlg,need,SW,PG,FOOT,bconfirm,today}=BS;

const swOf=BS.swOf||(n=>(SW.find(s=>s[0]===n)||[0,'#ffffff'])[1]);
const btns=(editX,delA,delX,key)=>`<span style="display:inline-flex;gap:10px;align-items:center">${ibtn('edit','bsgo',editX,key+'-edit','Redigera')}${ibtn('delete',delA,delX,key+'-del')}</span>`;
const ask=(t,p,fn)=>bconfirm({t,p,ok:'Ta bort',red:1},ok=>{if(ok)fn()});
const wrapPG=(k,f)=>{const o=PG[k];PG[k]=(...a)=>f(o(...a))};
const editing=()=>B().arg!=null&&B().arg!=='';
const retitle=(k,from,to)=>wrapPG(k,h=>editing()?h.split(from).join(to):h);
const wrapA=(k,f)=>{const o=A[k];A[k]=(...a)=>f(o,...a)};
const wrapINIT=(k,f)=>{const o=INIT[k];INIT[k]=(arg)=>{if(o)o(arg);f(arg)}};
const seq=(h,re,list,fn)=>{let i=0;return h.replace(re,m=>i<list.length?fn(list[i],i++,m):m)};

const done=(msg,page,arg,ev)=>{save();go(page,arg);btoast(msg);if(ev)emit(ev)};

/* ═════ Alternativ för varianter ═════ */
wrapPG('options',h=>seq(h,/<span class="act"><span class="ms">expand_more<\/span><\/span>/g,D().options,o=>`<span class="act">${btns('optform|'+o.id,'bsoptdel',o.id,'opt-'+slug(o.name))}</span>`));
INIT.optform=id=>{const o=id&&D().options.find(x=>x.id===id);if(!o){UI.f.b_ovals=[''];return}UI.f.b_oname=o.name;UI.f.b_ovals=o.values.map(()=>'');o.values.forEach((v,i)=>UI.f['b_oval'+i]=v);UI.f.b_ovorig=o.values.map((_,i)=>i)};
retitle('optform','Skapa alternativ','Redigera alternativ');
wrapA('bsovadd',(o)=>{if(UI.f.b_ovorig)UI.f.b_ovorig.push(-1);o()});
wrapA('bsovdel',(o,i)=>{const L=UI.f.b_ovorig;if(L&&L.length>1)L.splice(+i,1);o(i)});
wrapA('bssaveopt',(orig)=>{if(!editing())return orig();const o=D().options.find(x=>x.id===B().arg);if(!o)return orig();
 const vals=(UI.f.b_ovals||[]).map((_,i)=>F('b_oval'+i).trim());if(!need(['b_oname']))return;if(!vals.filter(Boolean).length){B().err.b_oval0=1;render();return}
 const oldName=o.name,oldVals=o.values.slice(),map={};(UI.f.b_ovorig||[]).forEach((oi,i)=>{if(oi>=0&&vals[i])map[oldVals[oi]]=vals[i]});
 o.name=F('b_oname').trim();o.values=vals.filter(Boolean);
 S.products.forEach(p=>{(p.variants||[]).forEach(v=>{if(v.opt===oldName){v.opt=o.name;if(map[v.name]&&v.name!==map[v.name])v.name=map[v.name]}});if(p.variants)syncVar(p)});
 done('Alternativet har sparats','options',null,'bs:save:opt')});
A.bsoptdel=id=>{const o=D().options.find(x=>x.id===id);ask('Ta bort alternativ',`Vill du ta bort ${esc(o.name)}? Produkter som redan har varianter behåller dem.`,()=>{D().options=D().options.filter(x=>x!==o);save();render();btoast('Alternativet har tagits bort')})};

/* ═════ Varianter på produkten ═════ */
function syncVar(p){const m=S.modifiers.find(x=>x.variant&&x.pids.includes(p.id));if(!m)return;m.opts=p.variants.map(v=>({name:v.name,price:Math.max(0,(+v.price||0)-(+p.price||0))}));if(p.variants[0])m.name=p.variants[0].opt}
BS.syncVar=syncVar;
wrapPG('product',h=>{const p=P(B().arg);if(!p||(B().tab||'info')!=='var'||!p.variants)return h;
 const used=new Set(p.variants.map(v=>v.opt+'::'+v.name));const free=[];D().options.forEach(o=>o.values.forEach(v=>{if(!used.has(o.name+'::'+v))free.push([o.name+'::'+v,o.name+': '+v])}));
 const body=`<h2 style="font-size:16px">Varianter</h2><p class="lead">Ändra namn och pris per variant, eller lägg till och ta bort varianter. Tryck Spara när du är klar.</p><table class="bt" style="max-width:720px;margin-top:12px"><tr><th>Variant</th><th>Alternativ</th><th style="width:150px">Pris inkl. moms</th><th style="width:40px"></th></tr>${p.variants.map((v,i)=>`<tr data-g="var-row-${i}"><td>${inp('b_vn_'+i,{ph:v.name,st:'height:26px'})}</td><td>${esc(v.opt)}</td><td>${inp('b_vp_'+i,{type:'number',ph:String(v.price),st:'height:26px'})}</td><td>${ibtn('delete','bsvardel',i,'var-del-'+i)}</td></tr>`).join('')}</table><div style="margin-top:12px;max-width:720px">${addBox('Lägg till variant','bsvaradd','','var-add')}</div>
 ${B().dlg==='var'?dlg('Lägg till variant',free.length?`${lbl('Värde',1)}${dd('b_vnew',free,'Välj värde')}<div class="help">Värdena kommer från <b>Alternativ för varianter</b>.</div><div style="margin-top:10px">${lbl('Pris inkl. moms')}${inp('b_vnp',{type:'number',ph:String(p.price||0)})}</div>`:`<p class="lead">Alla värden används redan. Lägg till fler värden under <b>Produktkatalog → Alternativ för varianter</b>.</p>`,`<button data-a="bsdlgx">Avbryt</button>${free.length?`<button class="p" data-a="bsvarok" data-g="var-ok">Lägg till</button>`:''}`,{h:330}):''}`;
 return h.replace(/<h2 style="font-size:16px">Varianter<\/h2>[^]*?<\/table>/,()=>body)});
const clrVar=()=>Object.keys(UI.f).forEach(k=>{if(/^b_v[np]_\d+$/.test(k))delete UI.f[k]});
wrapA('bssaveprod2',(orig)=>{const p=P(B().arg);const t=B().tab||'info';if(t==='var'&&p&&p.variants){p.variants.forEach((v,i)=>{const n=F('b_vn_'+i).trim();if(n)v.name=n})}orig();if(p&&p.variants){syncVar(p);if(t==='var'){clrVar();save();render()}}});
A.bsvaradd=()=>{UI.f.b_vnew='';UI.f.b_vnp='';openDlg('var','bs:dlg:var')};
A.bsvarok=()=>{if(!need(['b_vnew']))return;const p=P(B().arg);const [opt,name]=F('b_vnew').split('::');p.variants.push({name,opt,price:F('b_vnp')?+F('b_vnp'):p.price});syncVar(p);B().dlg=null;save();render();btoast('Varianten har lagts till');emit('bs:var:add')};
A.bsvardel=i=>{const p=P(B().arg);if(p.variants.length<=1){btoast('Produkten måste ha minst en variant');return}const v=p.variants[+i];ask('Ta bort variant',`Vill du ta bort varianten ${esc(v.name)}?`,()=>{p.variants.splice(+i,1);clrVar();syncVar(p);save();render();btoast('Varianten har tagits bort')})};

/* ═════ Tillval ═════ */
const MODS=()=>S.modifiers.filter(m=>!m.variant);
wrapPG('modifiers',h=>seq(h,/Koppla produkter<\/button>/g,MODS(),(m,i,s)=>s+' '+btns('modform|'+m.id,'bsmoddel',m.id,'mset-'+slug(m.name))));
INIT.modform=id=>{const m=id&&S.modifiers.find(x=>x.id===id);B().mii=null;if(!m)return;Object.assign(UI.f,{b_mname:m.name,b_mdesc:m.desc||'',b_mreq:!!m.req,b_mmax:m.multi?(m.max?String(m.max):''):'1',b_mopen:!!m.open,b_mitems:m.opts.map(o=>({name:o.name,price:+o.price||0,pre:!!o.pre}))})};
wrapPG('modform',h=>{if(editing())h=h.split('Skapa ny tillvalsgrupp').join('Redigera tillvalsgrupp');
 h=h.replace('<th>Förvalt</th></tr>','<th>Förvalt</th><th style="width:110px"></th></tr>');
 h=seq(h,/<tr><td>[^<]*<\/td><td>[^<]*<\/td><td>(Ja|Nej)<\/td><\/tr>/g,UI.f.b_mitems||[],(o,i,s)=>s.replace(/<\/tr>$/,`<td><span style="display:inline-flex;gap:10px">${ibtn('edit','bsmodedit',i,'modi-edit-'+i)}${ibtn('delete','bsmoditemdel',i,'modi-del-'+i)}</span></td></tr>`));
 if(B().side==='modi'&&B().mii!=null){const k=h.lastIndexOf('Lägg till tillval');if(k>=0)h=h.slice(0,k)+'Redigera tillval'+h.slice(k+'Lägg till tillval'.length);
  h=h.replace(/<button class="p" data-a="bsmodadd" data-g="bs-modi-create">[^<]*<\/button>/,'<button class="p" data-a="bsmodupd" data-g="bs-modi-upd">Spara</button>')}
 return h});
wrapA('bsmodnew',o=>{B().mii=null;o()});
A.bsmodedit=i=>{const o=(UI.f.b_mitems||[])[+i];if(!o)return;const b=B();b.side='modi';b.mii=+i;UI.f.b_miname=o.name;UI.f.b_miprice=String(o.price||0);UI.f.b_mipre=!!o.pre;render();emit('bs:side')};
A.bsmodupd=()=>{if(!need(['b_miname']))return;const o=UI.f.b_mitems[B().mii];Object.assign(o,{name:F('b_miname').trim(),price:+F('b_miprice')||0,pre:!!UI.f.b_mipre});B().side=null;B().mii=null;render();emit('bs:modi')};
A.bsmoditemdel=i=>{UI.f.b_mitems.splice(+i,1);render()};
wrapA('bssavemod',(orig)=>{if(!editing())return orig();const m=S.modifiers.find(x=>x.id===B().arg);if(!m)return orig();if(!need(['b_mname']))return;if(!(UI.f.b_mitems||[]).length){btoast('Lägg till minst ett tillval');return}
 const max=+F('b_mmax')||0;Object.assign(m,{name:F('b_mname').trim(),desc:F('b_mdesc'),multi:max!==1,max:max>1?max:0,req:!!UI.f.b_mreq,open:!!UI.f.b_mopen,opts:UI.f.b_mitems.map(o=>({name:o.name,price:o.price,pre:o.pre}))});
 done('Tillvalsgruppen har sparats','modset',m.id,'bs:save:mod')});
wrapPG('modset',h=>{const m=S.modifiers.find(x=>x.id===B().arg);if(!m)return h;return h.replace('<div class="bsbody">',`<div class="bsbody"><div class="rowr" style="max-width:720px;gap:10px">${actPill('Redigera tillvalsgrupp','bsgo','mset-edit','modform|'+m.id,'edit')}</div>`)});
A.bsmoddel=id=>{const m=S.modifiers.find(x=>x.id===id);ask('Ta bort tillvalsgrupp',`Vill du ta bort ${esc(m.name)}? Gruppen tas bort från ${m.pids.length} produkter.`,()=>{S.modifiers=S.modifiers.filter(x=>x!==m);save();render();btoast('Tillvalsgruppen har tagits bort')})};

/* ═════ Ingredienser ═════ */
const ICONS=/<span class="ms" style="font-size:16px">open_in_new<\/span> <span class="ms" style="font-size:16px">delete<\/span>/g;
wrapPG('ingredients',h=>{const d=D();h=h.replace(/<div class="chips">[^]*?<\/div><hr>/,()=>`<div class="chips">${d.ingGroups.map(g=>`<button class="chip ${g.color==='#ffffff'?'n':''}" style="background:${g.color};border:0;cursor:pointer" data-a="bsgo" data-x="inggroup|${g.id}" data-g="ig-${slug(g.name)}" title="Redigera">${esc(g.name)}</button>`).join('')}</div><hr>`);
 return seq(h,ICONS,d.ingredients,i=>btns('ingform|'+i.id,'bsingdel',i.id,'ing-'+slug(i.name)))});
INIT.ingform=id=>{const i=id&&D().ingredients.find(x=>x.id===id);if(i)Object.assign(UI.f,{b_igid:i.gid,b_iname:i.name,b_idesc:i.desc||'',b_iunit:i.unit})};
retitle('ingform','Lägg till ny ingrediens','Redigera ingrediens');
wrapA('bssaveing',(orig)=>{if(!editing())return orig();const i=D().ingredients.find(x=>x.id===B().arg);if(!i)return orig();if(!need(['b_igid','b_iname','b_iunit']))return;
 Object.assign(i,{name:F('b_iname').trim(),unit:F('b_iunit'),gid:F('b_igid'),desc:F('b_idesc')});done('Ingrediensen har sparats','ingredients',null,'bs:save:ing')});
A.bsingdel=id=>{const i=D().ingredients.find(x=>x.id===id);const n=S.products.filter(p=>(p.ings||[]).some(x=>x.id===id)).length;ask('Ta bort ingrediens',`Vill du ta bort ${esc(i.name)}?${n?` Den är kopplad till ${n} produkt${n>1?'er':''}.`:''}`,()=>{D().ingredients=D().ingredients.filter(x=>x!==i);S.products.forEach(p=>{if(p.ings)p.ings=p.ings.filter(x=>x.id!==id)});save();render();btoast('Ingrediensen har tagits bort')})};
INIT.inggroup=id=>{const g=id&&D().ingGroups.find(x=>x.id===id);if(g)Object.assign(UI.f,{b_igname:g.name,b_igcolor:(SW.find(s=>s[1].toLowerCase()===String(g.color).toLowerCase())||['Neutral'])[0]})};
retitle('inggroup','Lägg till ingrediensgrupp','Redigera ingrediensgrupp');
wrapPG('inggroup',h=>{if(!editing())return h;const g=D().ingGroups.find(x=>x.id===B().arg);return h.replace(/<\/div>$/,`<hr><button class="pill" data-a="bsiggdel" data-x="${g.id}" data-g="ig-del" style="background:#fde8e8"><span class="ms" style="background:#c62828">delete</span>Ta bort ingrediensgrupp</button></div>`)});
wrapA('bssaveinggroup',(orig)=>{if(!editing())return orig();const g=D().ingGroups.find(x=>x.id===B().arg);if(!g)return orig();if(!need(['b_igname','b_igcolor']))return;
 Object.assign(g,{name:F('b_igname').trim(),color:swOf(F('b_igcolor'))});done('Ingrediensgruppen har sparats','ingredients',null,'bs:save:inggroup')});
A.bsiggdel=id=>{const g=D().ingGroups.find(x=>x.id===id);const n=D().ingredients.filter(i=>i.gid===id).length;if(n){btoast(`Gruppen har ${n} ingredienser. Flytta eller ta bort dem först.`);return}ask('Ta bort ingrediensgrupp',`Vill du ta bort ${esc(g.name)}?`,()=>{D().ingGroups=D().ingGroups.filter(x=>x!==g);save();go('ingredients');btoast('Ingrediensgruppen har tagits bort')})};

/* ═════ Popup-meddelanden ═════ */
wrapPG('popup',h=>seq(h,ICONS,D().popups,p=>btns('popform|'+p.id,'bspopdel',p.id,'pop-'+slug(p.name))));
INIT.popform=id=>{const p=id&&D().popups.find(x=>x.id===id);if(p)Object.assign(UI.f,{b_ponm:p.name,b_potx:p.text,b_poonce:!!p.once})};
retitle('popform','Lägg till popup-meddelande','Redigera popup-meddelande');
wrapA('bssavepop',(orig)=>{if(!editing())return orig();const p=D().popups.find(x=>x.id===B().arg);if(!p)return orig();if(!need(['b_ponm','b_potx']))return;
 Object.assign(p,{name:F('b_ponm').trim(),text:F('b_potx').trim(),once:!!UI.f.b_poonce});done('Popup-meddelandet har sparats','popup',null,'bs:save:popup')});
A.bspopdel=id=>{const p=D().popups.find(x=>x.id===id);ask('Ta bort popup-meddelande',`Vill du ta bort ${esc(p.name)}? Det kopplas bort från produkter och grupper.`,()=>{D().popups=D().popups.filter(x=>x!==p);[...S.products,...S.groups].forEach(x=>{if(x.popup===id)x.popup=null});save();render();btoast('Popup-meddelandet har tagits bort')})};

/* ═════ Kampanjer ═════ */
wrapPG('promotions',h=>seq(h,/<span class="ms">expand_more<\/span>(?=<\/span><\/div>)/g,S.promotions,p=>' '+btns(p.type==='Group discount'?'promo|'+p.id:'',p.type==='Group discount'?'bspromodel':'bspromodel',p.id,'promo-'+slug(p.name)).replace(`data-a="bsgo" data-x=""`,`data-a="bspromoedit" data-x="${p.id}"`)));
wrapINIT('promo',id=>{const p=id&&S.promotions.find(x=>x.id===id);if(!p)return;const r=p.rule||{};Object.assign(UI.f,{b_rname:p.name,b_rdesc:p.desc||'',b_rstore:'Alla butiker',b_rtrig:p.auto?'auto':'man',b_rtarget:p.loy?'loy':'all',b_rtype:'disc',b_rdt:r.kr?'kr':'pct',b_rval:String(r.kr||r.pct||''),b_promo_g:[...(r.gids||[])],b_promo_p:[...(r.pids||[])],b_rfrom:p.from||'',b_rto:p.to||'',b_ren:p.active!==false})});
wrapPG('promo',h=>editing()?h.replace('/ Skapa kampanj<','/ Redigera kampanj<').replace('>Skapa kampanj</h1>','>Redigera kampanj</h1>'):h);
{const of=FOOT.promo;FOOT.promo=()=>{const h=of();return editing()?h.replace(/Skapa kampanj(<span)/,'Spara ändringar$1'):h}}
wrapA('bswiz',(orig,x)=>{const id=B().arg;const last=(B().wiz||1)===5&&x!=='-1';orig(x);if(!(id&&last))return;const n=S.promotions[0];const ex=S.promotions.find(p=>p.id===id);if(!n||!ex||n===ex)return;S.promotions.shift();Object.assign(ex,n,{id});save();render();btoast('Kampanjen har sparats')});
A.bspromoedit=id=>{const p=S.promotions.find(x=>x.id===id);const b=B();b.promoId=id;Object.assign(UI.f,{b_epname:p.name,b_epfrom:p.from||'',b_epto:p.to||'',b_eppct:p.rule&&p.rule.pct!=null?String(p.rule.pct):''});openDlg('promoedit','bs:dlg:promoedit')};
wrapPG('promotions',h=>{const b=B();if(b.dlg!=='promoedit')return h;const p=S.promotions.find(x=>x.id===b.promoId);if(!p)return h;const pct=p.rule&&p.rule.pct!=null;
 return h.replace(/<\/div>$/,dlg('Redigera kampanj',`${lbl('Namn',1)}${inp('b_epname')}${pct?`<div style="margin-top:10px;width:200px">${lbl('Rabatt (%)',1)}${inp('b_eppct',{type:'number'})}</div>`:''}<div class="grid2" style="grid-template-columns:1fr 1fr;margin-top:10px"><div>${lbl('Startdatum',1)}${inp('b_epfrom',{type:'date'})}</div><div>${lbl('Slutdatum')}${inp('b_epto',{type:'date'})}</div></div><div class="help" style="margin-top:8px">Kampanjens typ och regler går inte att ändra efter att den skapats. Skapa en ny kampanj om du vill ändra typ.</div>`,`<button data-a="bsdlgx">Avbryt</button><button class="p" data-a="bspromoeok" data-g="promoedit-save">Spara</button>`,{h:pct?420:360})+'</div>')});
A.bspromoeok=()=>{const p=S.promotions.find(x=>x.id===B().promoId);const keys=['b_epname','b_epfrom'];if(p.rule&&p.rule.pct!=null)keys.push('b_eppct');if(!need(keys))return;p.name=F('b_epname').trim();p.from=F('b_epfrom');p.to=F('b_epto');if(p.rule&&p.rule.pct!=null)p.rule.pct=+F('b_eppct');B().dlg=null;save();render();btoast('Kampanjen har sparats')};
A.bspromodel=id=>{const p=S.promotions.find(x=>x.id===id);ask('Ta bort kampanj',`Vill du ta bort ${esc(p.name)}?`,()=>{S.promotions=S.promotions.filter(x=>x!==p);save();render();btoast('Kampanjen har tagits bort')})};

/* ═════ Skrivarstationer ═════ */
wrapPG('stations',h=>seq(h,/<span class="ms">expand_more<\/span>(?=<\/span><\/div>)/g,S.stations||[],(s,i)=>' '+btns('stationform|'+i,'bsstdel',i,'station-'+slug(s.name))));
INIT.stationform=i=>{const s=i!=null&&(S.stations||[])[+i];if(s)Object.assign(UI.f,{b_sname:s.name,b_sstore:'Kaffebaren',b_sact:s.active!==false,b_station_g:[...(s.gids||[])],b_station_p:[...(s.pids||[])]})};
retitle('stationform','Lägg till station','Redigera station');
wrapA('bssavestation',(orig)=>{if(!editing())return orig();const s=(S.stations||[])[+B().arg];if(!s)return orig();if(!need(['b_sname','b_sstore']))return;
 Object.assign(s,{name:F('b_sname').trim(),gids:[...(UI.f.b_station_g||[])],pids:[...(UI.f.b_station_p||[])],active:isOn('b_sact',1)});done('Stationen har sparats','stations',null,'bs:save:station')});
A.bsstdel=i=>{const s=S.stations[+i];ask('Ta bort station',`Vill du ta bort ${esc(s.name)}? Bongar för stationens produkter skrivs inte längre ut.`,()=>{S.stations.splice(+i,1);save();render();btoast('Stationen har tagits bort')})};

/* ═════ Köksdisplay ═════ */
wrapPG('kds',h=>seq(h,/(<span class="act">Aktiv <span class="tgl on"><\/span>)(?:<span class="ms">expand_more<\/span>)?/g,D().kds,(k,i,s)=>s.replace(/<span class="ms">expand_more<\/span>$/,'')+' '+btns('kdsform|'+i,'bskdsdel',i,'kds-'+slug(k.name))));
INIT.kdsform=i=>{const k=i!=null&&D().kds[+i];if(k)Object.assign(UI.f,{b_kname:k.name,b_kstore:'Kaffebaren',b_kact:k.active!==false,b_kds_g:[...(k.gids||[])],b_kds_p:[...(k.pids||[])]})};
retitle('kdsform','Lägg till köksdisplay','Redigera köksdisplay');
wrapA('bssavekds',(orig)=>{if(!editing())return orig();const k=D().kds[+B().arg];if(!k)return orig();if(!need(['b_kname','b_kstore']))return;
 Object.assign(k,{name:F('b_kname').trim(),gids:[...(UI.f.b_kds_g||[])],pids:[...(UI.f.b_kds_p||[])],active:isOn('b_kact',1)});done('Köksdisplayen har sparats','kds',null,'bs:save:kds')});
A.bskdsdel=i=>{const k=D().kds[+i];ask('Ta bort köksdisplay',`Vill du ta bort ${esc(k.name)}?`,()=>{D().kds.splice(+i,1);save();render();btoast('Köksdisplayen har tagits bort')})};

/* ═════ Rätter ═════ */
wrapPG('courses',h=>seq(h,/<span class="act"><span class="ms">expand_more<\/span><\/span>/g,D().courses,(c,i)=>`<span class="act">${btns('courseform|'+i,'bscoursedel',i,'course-'+slug(c.name))}</span>`));
INIT.courseform=i=>{const c=i!=null&&D().courses[+i];if(c)Object.assign(UI.f,{b_cname:c.name,b_cstore:'Kaffebaren',b_cdef:c.def||'wait',b_course_g:[...(c.gids||[])]})};
retitle('courseform','Skapa ny rätt','Redigera rätt');
wrapA('bssavecourse',(orig)=>{if(!editing())return orig();const c=D().courses[+B().arg];if(!c)return orig();if(!need(['b_cname','b_cstore']))return;
 Object.assign(c,{name:F('b_cname').trim(),def:F('b_cdef')||'wait',gids:[...(UI.f.b_course_g||[])]});done('Rätten har sparats','courses',null,'bs:save:course')});
A.bscoursedel=i=>{const c=D().courses[+i];ask('Ta bort rätt',`Vill du ta bort ${esc(c.name)}?`,()=>{D().courses.splice(+i,1);save();render();btoast('Rätten har tagits bort')})};

/* ═════ Presentkortsmallar ═════ */
wrapPG('gtemp',h=>{const L=D().gtemps;if(!L.length)return h;h=h.replace('<th>Status</th></tr>','<th>Status</th><th style="width:120px"></th></tr>');return seq(h,/<span class="bbdg g">AKTIV<\/span><\/td><\/tr>/g,L,(t,i,s)=>s.replace(/<\/tr>$/,`<td>${btns('gtform|'+i,'bsgtdel',i,'gt-'+slug(t.name))}</td></tr>`))});
INIT.gtform=i=>{const t=i!=null&&D().gtemps[+i];if(t)Object.assign(UI.f,{b_gtname:t.name,b_gtvalid:String(t.valid||1),b_gtamt:t.amount?'fixed':'open',b_gtval:t.amount?String(t.amount):'',b_gtmin:t.min?String(t.min):'',b_gtmax:t.max?String(t.max):'',b_gtdebt:t.debt||'',b_gtinc:t.inc||'',b_gtact:true})};
retitle('gtform','Skapa ny Yabie presentkortsmall','Redigera Yabie presentkortsmall');
wrapA('bssavegt',(orig)=>{if(!editing())return orig();const t=D().gtemps[+B().arg];if(!t)return orig();const fixed=(F('b_gtamt')||'open')==='fixed';if(!need(['b_gtname',fixed?'b_gtval':'b_gtmax']))return;
 const prod=S.products.find(p=>p.gift&&p.name===t.name);Object.assign(t,{name:F('b_gtname').trim(),amount:fixed?+F('b_gtval'):0,min:+F('b_gtmin')||0,max:+F('b_gtmax')||0,valid:+(F('b_gtvalid')||1),debt:F('b_gtdebt')||'2420',inc:F('b_gtinc')||'3690'});
 if(prod)Object.assign(prod,{name:t.name,price:t.amount,open:!t.amount});done('Mallen har sparats','gtemp',null,'bs:save:gt')});
A.bsgtdel=i=>{const t=D().gtemps[+i];ask('Ta bort presentkortsmall',`Vill du ta bort ${esc(t.name)}? Sålda presentkort fortsätter att gälla.`,()=>{D().gtemps.splice(+i,1);S.products=S.products.filter(p=>!(p.gift&&p.name===t.name));save();render();btoast('Mallen har tagits bort')})};

/* ═════ Dra och släpp: ordning på produktgrupper och produkter ═════ */
{const st=document.createElement('style');st.textContent=`#device.bsm #pos .chip[data-sort]:before{display:none}#device.bsm #pos .dh{cursor:grab;opacity:.45;font-size:11px;line-height:1;touch-action:none;user-select:none;display:inline-block;padding:2px 1px}#device.bsm #pos .dh:hover{opacity:.9}#device.bsm #pos td .dh{font-size:16px;margin:0}#device.bsm #pos .dragging{opacity:.85;z-index:50;position:relative;box-shadow:0 6px 18px rgba(0,0,0,.25);pointer-events:none}#device.bsm #pos tr.dragging{background:#fff}#device.bsm #pos .drop-b{box-shadow:-3px 0 0 #1677c9}#device.bsm #pos .drop-a{box-shadow:3px 0 0 #1677c9}#device.bsm #pos tr.drop-b td{box-shadow:inset 0 3px 0 #1677c9}#device.bsm #pos tr.drop-a td{box-shadow:inset 0 -3px 0 #1677c9}`;document.head.appendChild(st)}
let drag=null,eatClick=false;
const kindArr=k=>k==='g'?S.groups:k==='pl'?S.plans:k==='tp'?BS.B().pd.places:S.products;
const SMSG={g:'Ordningen på produktgrupperna har sparats',p:'Ordningen på produkterna har sparats',pl:'Ordningen på bordskartorna har sparats'};
const clearMarks=()=>document.querySelectorAll('#pos .drop-b,#pos .drop-a').forEach(e=>e.classList.remove('drop-b','drop-a'));
document.addEventListener('pointerdown',e=>{const h=e.target.closest&&e.target.closest('#pos [data-drag]');if(!h||APP()!=='bs')return;const el=h.closest('[data-sort]');if(!el)return;
 e.preventDefault();e.stopPropagation();const r=el.getBoundingClientRect();drag={k:h.dataset.drag,el,id:el.dataset.id,x0:e.clientX,y0:e.clientY,sc:r.width/el.offsetWidth||1,on:false,tgt:null,after:false};},true);
document.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x0,dy=e.clientY-drag.y0;if(!drag.on){if(Math.hypot(dx,dy)<5)return;drag.on=true;drag.el.classList.add('dragging')}
 e.preventDefault();drag.el.style.transform=drag.k==='g'?`translate(${dx/drag.sc}px,${dy/drag.sc}px)`:`translateY(${dy/drag.sc}px)`;
 clearMarks();const u=document.elementFromPoint(e.clientX,e.clientY);const t=u&&u.closest(`#pos [data-sort="${drag.k}"]`);drag.tgt=null;if(!t||t===drag.el)return;
 const r=t.getBoundingClientRect();drag.after=drag.k==='g'?e.clientX>r.left+r.width/2:e.clientY>r.top+r.height/2;t.classList.add(drag.after?'drop-a':'drop-b');drag.tgt=t},true);
const end=e=>{if(!drag)return;const d=drag;drag=null;clearMarks();d.el.classList.remove('dragging');d.el.style.transform='';if(!d.on)return;eatClick=true;setTimeout(()=>eatClick=false,0);
 if(!d.tgt)return;const L=kindArr(d.k);const src=L.findIndex(x=>x.id===d.id);if(src<0)return;const [it]=L.splice(src,1);let ti=L.findIndex(x=>x.id===d.tgt.dataset.id);if(ti<0){L.splice(src,0,it);return}L.splice(ti+(d.after?1:0),0,it);
 if(SMSG[d.k]){save();btoast(SMSG[d.k])}render();emit('bs:sort:'+d.k)};
document.addEventListener('pointerup',end,true);document.addEventListener('pointercancel',end,true);
document.addEventListener('click',e=>{if(eatClick){e.preventDefault();e.stopPropagation();eatClick=false}},true);
BS.moveItem=(k,id,toId,after)=>{const L=kindArr(k);const s=L.findIndex(x=>x.id===id);const [it]=L.splice(s,1);const t=L.findIndex(x=>x.id===toId);L.splice(t+(after?1:0),0,it);save();render();emit('bs:sort:'+k)};
})();
