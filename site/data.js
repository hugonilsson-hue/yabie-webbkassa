/* Demo data for the web POS: a fictional café, "Kaffebaren". */
const COLORS=['#f2a9a2','#f4b391','#f7d188','#f8e28a','#eef08c','#d6ee8f','#b7eba0','#b3edd3','#b3e9ef','#b5dbfa','#bcd4fb','#c3c8f8','#cdbdf7','#dcc1f6','#f3c3f2','#f5cfdf','#d7c8b6','#f3d7be','#ffffff'];
const VAT_LEDGER={25:'3001',12:'3002',6:'3003',0:'3004'};

function seed(){
  const g=(id,name,vat,color)=>({id,name,vat,ledger:VAT_LEDGER[vat],color});
  const groups=[g('g-kaffe','Kaffe',12,'#d7c8b6'),g('g-te','Te & choklad',12,'#f3d7be'),g('g-bak','Bakverk',12,'#f7d188'),
    g('g-smor','Smörgåsar',12,'#b7eba0'),g('g-kall','Kalla drycker',12,'#b3e9ef'),g('g-merch','Kaffebönor & muggar',25,'#cdbdf7')];
  let n=0;const p=(name,price,gid,desc='')=>({id:'p'+(++n),name,price,gid,desc});
  const products=[
    p('Bryggkaffe',32,'g-kaffe','Dagens brygg, påtår ingår.'),p('Cappuccino',45,'g-kaffe','Dubbel espresso med skummad mjölk.'),p('Caffè latte',48,'g-kaffe'),p('Espresso',32,'g-kaffe'),
    p('Flat white',49,'g-kaffe'),p('Cortado',42,'g-kaffe'),p('Iskaffe',52,'g-kaffe'),
    p('Chai latte',49,'g-te'),p('Varm choklad',45,'g-te'),p('Te',32,'g-te'),
    p('Kanelbulle',35,'g-bak','Bakad på morgonen.'),p('Kardemummabulle',38,'g-bak'),p('Croissant',32,'g-bak'),p('Chokladboll',25,'g-bak'),p('Morotskaka',52,'g-bak'),
    p('Räksmörgås',119,'g-smor'),p('Ost & skinka',69,'g-smor'),p('Halloumi wrap',89,'g-smor'),
    p('Mineralvatten',29,'g-kall'),p('Apelsinjuice',39,'g-kall'),p('Lemonad',42,'g-kall'),
    p('Kaffebönor 500 g',149,'g-merch'),p('Mugg',129,'g-merch')];
  const id=name=>products.find(x=>x.name===name).id;
  const t=(pos,name,color)=>({pos,type:'product',ref:id(name),color});
  const startPages=[
    {id:'sp1',name:'Kaffebar',color:'#d7c8b6',tiles:[t(0,'Bryggkaffe','#d7c8b6'),t(1,'Cappuccino','#d7c8b6'),t(2,'Caffè latte','#d7c8b6'),t(3,'Espresso','#d7c8b6'),t(4,'Flat white','#d7c8b6'),t(5,'Chai latte','#f3d7be'),t(6,'Varm choklad','#f3d7be'),
      t(7,'Kanelbulle','#f7d188'),t(8,'Kardemummabulle','#f7d188'),t(9,'Croissant','#f7d188'),t(10,'Chokladboll','#f7d188'),t(11,'Morotskaka','#f7d188'),
      t(14,'Räksmörgås','#b7eba0'),t(15,'Ost & skinka','#b7eba0'),t(16,'Halloumi wrap','#b7eba0'),t(21,'Mineralvatten','#b3e9ef'),t(22,'Apelsinjuice','#b3e9ef'),t(23,'Lemonad','#b3e9ef'),
      {pos:27,type:'function',ref:'takeaway',color:'#eeeef3'},{pos:34,type:'function',ref:'discount',color:'#eeeef3'}]},
  ];
  const pm=(id,name,icon,enabled,quick)=>({id,name,icon,enabled,quick});
  return {
    v:1, store:'Kaffebaren', register:'Kassa 1',
    groups, products, startPages, showGroups:true,
    payments:[pm('swcloud','Swedbank Cloud','card',true,false),pm('card','Kontokort','card',true,false),pm('swish','Swish','swish',true,false),pm('cash','Kontant','cash',false,false),pm('gift','Presentkort','gift',true,false),pm('invoice','Faktura','invoice',false,false)],
    terminals:[], printer:{name:'mC-Print3 E874',connected:true,receipts:'receipt'},
    display:{ip:'',auto:true}, discounts:[{id:'d1',name:'Personal',pct:10},{id:'d2',name:'Student',pct:15},{id:'d3',name:'Stammis',pct:20}],
    cashiers:[{name:'Ägare',role:'Admin'},{name:'Barista',role:'Kassör'}],
    other:{tapProduct:'add',defaultTakeaway:true},
    cart:{...newCart(),takeaway:true}, orders:[], parked:[], zreports:[{at:'2026-10-07 22:00',total:8420,count:131}], lastZ:0, orderSeq:0
  };
}
function newCart(){return {items:[],takeaway:false,orderDisc:0,note:'',customer:''}}
