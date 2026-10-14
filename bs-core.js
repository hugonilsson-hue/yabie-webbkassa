/* Yabie Backstage replica (Swedish): core, navigation, form helpers, render and app switch. Pages live in bs-*.js. */
(()=>{
const BW=1400,BH=1050;
const st=document.createElement('style');st.textContent=`
.device.bsm{border-radius:14px;padding:10px;background:#2a2c31}
#device.bsm #pos .bsw{position:absolute;left:0;top:0;width:${BW}px;height:${BH}px;transform:scale(${1051/BW});transform-origin:0 0;background:#e4e4e6;font:13px/1.35 Inter,system-ui,sans-serif;color:#111;letter-spacing:0;user-select:none}
#device.bsm #pos .bsw .ms{font-family:'Material Symbols Outlined';font-weight:400;font-size:19px;line-height:1;letter-spacing:normal;text-transform:none;white-space:nowrap;direction:ltr;-webkit-font-feature-settings:'liga';font-feature-settings:'liga';display:inline-block;overflow:hidden;width:1em;flex:none}
#device.bsm #pos .bsw button{font:inherit;color:inherit;cursor:pointer;text-align:inherit}
#device.bsm #pos .bsnav{position:absolute;left:8px;top:8px;bottom:8px;width:206px;background:#000;border-radius:10px;color:#fff;display:flex;flex-direction:column;overflow:hidden}
#device.bsm #pos .bsnav .lg{padding:16px 16px 0;font:800 34px/1 Inter,sans-serif;letter-spacing:-.04em}
#device.bsm #pos .bsnav .lg small{display:block;font:700 15px/1 Inter,sans-serif;letter-spacing:0;margin-top:10px}
#device.bsm #pos .bsnav .tg{position:absolute;right:14px;top:16px;color:#71e6af}
#device.bsm #pos .bsnav hr{border:0;border-top:1px solid #333;margin:14px 8px 0}
#device.bsm #pos .bsnav .sc{flex:1;overflow:auto;padding:0 8px 12px;scrollbar-width:none}
#device.bsm #pos .bsnav .sec{font-size:9.5px;font-weight:600;color:#bbb;letter-spacing:.02em;margin:18px 8px 8px}
#device.bsm #pos .bsnav .it{display:flex;align-items:center;gap:9px;width:100%;padding:7px 8px;border-radius:4px;font-size:13px;color:#fff;background:none;border:0}
#device.bsm #pos .bsnav .it .ms{font-size:17px}
#device.bsm #pos .bsnav .it .car{margin-left:auto;font-size:18px}
#device.bsm #pos .bsnav .it.sub{padding-left:28px;white-space:nowrap;font-size:12.5px;gap:8px}
#device.bsm #pos .bsnav .it.on{background:#71e6af;color:#000;font-weight:600}
#device.bsm #pos .bsmain{position:absolute;left:222px;top:8px;right:8px;bottom:8px;background:#fff;border-radius:10px;overflow:hidden;display:flex;flex-direction:column}
#device.bsm #pos .bstop{height:50px;flex:none;background:#ff8a3d;display:flex;align-items:center;padding:0 36px;justify-content:space-between}
#device.bsm #pos .bstop .o small{display:block;font-size:8.5px;font-weight:700;letter-spacing:.04em}
#device.bsm #pos .bstop .o b{font:800 21px/1 Inter,sans-serif;letter-spacing:-.02em}
#device.bsm #pos .bstop .u{display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600}
#device.bsm #pos .bsc{flex:1;overflow:auto;position:relative}
#device.bsm #pos .bshead{background:#f1f1f1;padding:14px 36px 12px;min-height:72px;box-sizing:border-box}
#device.bsm #pos .bshead .bc{font-size:9.5px;margin-bottom:6px}
#device.bsm #pos .bshead h1{margin:0;font:800 27px/1.1 Inter,sans-serif;letter-spacing:-.025em}
#device.bsm #pos .bsbody{padding:22px 36px 40px}
#device.bsm #pos .bsbody h2{margin:0 0 6px;font:700 17px/1.2 Inter,sans-serif;letter-spacing:-.01em}
#device.bsm #pos .bsbody h3{margin:18px 0 8px;font:700 14px/1.2 Inter,sans-serif}
#device.bsm #pos .bsbody p.lead{margin:0 0 4px;font-size:12.5px;max-width:470px}
#device.bsm #pos .bsbody hr{border:0;border-top:1px solid #e3e3e3;margin:20px 0}
#device.bsm #pos .bsbody hr.d{border-top:1px dashed #d8d8d8}
#device.bsm #pos .pill{display:inline-flex;align-items:center;gap:7px;background:#e7e7e7;border-radius:20px;padding:7px 12px 7px 9px;font-weight:600;font-size:12px}
#device.bsm #pos .pill .ms{width:18px;height:18px;border-radius:50%;background:#111;color:#fff;font-size:15px;display:grid;place-items:center}
#device.bsm #pos .rowr{display:flex;justify-content:flex-end;margin:16px 0 12px}
#device.bsm #pos .lbl{display:block;font-size:10px;font-weight:700;margin:0 0 5px}
#device.bsm #pos .bi{display:block;width:100%;box-sizing:border-box;height:31px;border:1px solid #9a9a9a;border-radius:2px;padding:0 8px;font:12px Inter,sans-serif;background:#fff;color:#111;outline:0}
#device.bsm #pos .bi:focus{border-color:#71e6af;box-shadow:0 0 0 1px #71e6af}
#device.bsm #pos textarea.bi{height:56px;padding:6px 8px;resize:none}
#device.bsm #pos .bi.err{border-color:#e5484d}
#device.bsm #pos .errm{color:#e5484d;font-size:10px;margin-top:3px}
#device.bsm #pos .help{font-size:9.5px;color:#444;margin-top:4px;max-width:290px}
#device.bsm #pos .grid2{display:grid;grid-template-columns:284px 284px;gap:12px 12px}
#device.bsm #pos .grid3{display:grid;grid-template-columns:284px 284px 284px;gap:12px}
#device.bsm #pos .bsel{position:relative;display:flex;align-items:center;width:100%;height:31px;border:1px solid #9a9a9a;border-radius:2px;background:#fff;padding:0 40px 0 8px;font-size:12px;box-sizing:border-box}
#device.bsm #pos .bsel i{font-style:italic;color:#888}
#device.bsm #pos .bsel .car{position:absolute;right:0;top:0;bottom:0;width:31px;background:#dcdcdc;display:grid;place-items:center;font-size:20px}
#device.bsm #pos .bsel.op .car{background:#000;color:#fff}
#device.bsm #pos .ddl{position:absolute;z-index:20;left:0;right:0;top:31px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.18);max-height:230px;overflow:auto}
#device.bsm #pos .ddl button{display:flex;align-items:center;gap:8px;width:100%;padding:9px 8px;font-size:11.5px;background:#fff;border:0}
#device.bsm #pos .ddl button:hover{background:#f2f2f2}
#device.bsm #pos .ddl .sw{width:14px;height:14px;border:1px solid #ccc;border-radius:2px}
#device.bsm #pos .ddw{position:relative}
#device.bsm #pos .rcard{display:flex;gap:10px;border:1px solid #d6d6d6;border-radius:4px;padding:12px;background:#fff;width:100%;box-sizing:border-box;align-items:flex-start}
#device.bsm #pos .rcard.on{background:#e3fbef;border-color:#111}
#device.bsm #pos .rcard b{display:block;font-size:12.5px;margin-bottom:5px}#device.bsm #pos .rcard small{font-size:11px}
#device.bsm #pos .rad{width:15px;height:15px;border-radius:50%;border:1.5px solid #555;flex:none;display:grid;place-items:center;box-sizing:border-box;background:#fff}
#device.bsm #pos .on>.rad,#device.bsm #pos .rad.on{border-color:#111}#device.bsm #pos .on>.rad:after,#device.bsm #pos .rad.on:after{content:'';width:9px;height:9px;border-radius:50%;background:#71e6af;outline:2px solid #111;outline-offset:-1px}
#device.bsm #pos .rl{display:inline-flex;align-items:center;gap:6px;font-size:12px;margin-right:12px;background:none;border:0}
#device.bsm #pos .tgl{width:40px;height:22px;border-radius:11px;background:#8a8a8a;position:relative;flex:none;border:0;padding:0}
#device.bsm #pos .tgl:after{content:'';position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:.15s}
#device.bsm #pos .tgl.on{background:#111}#device.bsm #pos .tgl.on:after{left:21px;background:#71e6af}
#device.bsm #pos .tgrow{display:flex;align-items:center;justify-content:space-between;background:#f1f1f1;border-radius:4px;padding:12px 12px;max-width:568px;font-size:12px}
#device.bsm #pos .chk{width:13px;height:13px;border:1.5px solid #333;border-radius:2px;display:inline-grid;place-items:center;flex:none;background:#fff;box-sizing:border-box}
#device.bsm #pos .chk.on{background:#111;border-color:#111}#device.bsm #pos .chk.on:after{content:'✓';color:#fff;font-size:10px;line-height:1}
#device.bsm #pos .cl{display:flex;align-items:center;gap:7px;font-size:12px;background:none;border:0;margin:6px 0}
#device.bsm #pos .imgbox{background:#f1f1f1;border-radius:6px;height:112px;display:grid;place-items:center;text-align:center;font-size:11.5px;color:#222}
#device.bsm #pos .imgbox .ms{font-size:30px;color:#777;width:auto}
#device.bsm #pos .bsfoot{flex:none;height:70px;border-top:2px solid #111;display:flex;align-items:center;justify-content:space-between;padding:0 36px;background:#fff}
#device.bsm #pos .bcan{background:#e3e3e3;border-radius:20px;padding:10px 40px;font-weight:600;font-size:13px;border:0}
#device.bsm #pos .bsave{display:flex;align-items:center;border:1.5px solid #111;border-radius:20px;overflow:hidden;background:#fff;font-weight:700;font-size:13px}
#device.bsm #pos .bsave.ok{background:#71e6af;border-color:#71e6af}
#device.bsm #pos .bsave span{display:flex;align-items:center;gap:6px;padding:9px 18px 9px 16px}#device.bsm #pos .bsave .ms{font-size:17px}
#device.bsm #pos .bsave i{border-left:1.5px solid #111;padding:0 8px;font-style:normal;display:flex;align-items:center;align-self:stretch}#device.bsm #pos .bsave{height:38px}
#device.bsm #pos .bnext{border:1.5px solid #111;border-radius:22px;padding:10px 0;width:182px;font-weight:700;font-size:13px;background:#fff;display:flex;align-items:center;justify-content:center;gap:4px}
#device.bsm #pos .bnext.ok{background:#71e6af;border-color:#71e6af}
#device.bsm #pos .chips{display:flex;flex-wrap:wrap;gap:8px 8px;margin-top:16px}
#device.bsm #pos .chip{display:inline-flex;align-items:center;gap:6px;border-radius:3px;padding:5px 9px 5px 6px;font-size:11px;font-weight:600;text-transform:uppercase;border:1px solid transparent}
#device.bsm #pos .chip.n{border-color:#bbb;background:#fff}
#device.bsm #pos .chip:before{content:'⠿';opacity:.45;font-size:10px}
#device.bsm #pos .chip.sel{outline:2px solid #111}
#device.bsm #pos .bt{width:100%;border-collapse:separate;border-spacing:0;font-size:11.5px}
#device.bsm #pos .bt th{background:#e3fbef;text-align:left;font-weight:600;padding:10px 10px;border-top:1px solid #111;border-bottom:1px solid #111}
#device.bsm #pos .bt th:first-child{border-left:1px solid #111;border-radius:6px 0 0 0}#device.bsm #pos .bt th:last-child{border-right:1px solid #111;border-radius:0 6px 0 0}
#device.bsm #pos .bt.dk th{background:#444;color:#fff;border-color:#444}
#device.bsm #pos .bt td{padding:9px 10px;border-bottom:1px solid #e1e1e1;vertical-align:middle}
#device.bsm #pos .bt tr.gr td{background:#f6f6f6;font-weight:500}
#device.bsm #pos .bt tr.cl td{cursor:pointer}#device.bsm #pos .bt tr.cl:hover td{background:#f7f7f7}
#device.bsm #pos .bbdg{display:inline-block;font-size:9px;font-weight:700;letter-spacing:.04em;border-radius:3px;padding:2px 6px;background:#dbeafe;color:#1d4ed8}
#device.bsm #pos .bbdg.g{background:#dcfce7;color:#15803d}#device.bsm #pos .bbdg.p{background:#fde7f7;color:#b5179e}#device.bsm #pos .bbdg.o{background:#fdecc8;color:#9a5b00}#device.bsm #pos .bbdg.r{background:#fee2e2;color:#b91c1c}#device.bsm #pos .bbdg.v{background:#e8e3ff;color:#4c3bb8}
#device.bsm #pos .tool{border:1px solid #ddd;border-radius:4px;padding:10px 12px;display:flex;align-items:center;gap:8px;margin-bottom:22px}
#device.bsm #pos .tool .sb{width:186px}#device.bsm #pos .tool .tb2{margin-left:auto;display:flex;gap:8px}
#device.bsm #pos .tool .tb2 span{border:1px solid #ccc;border-radius:3px;padding:5px 9px;font-size:11.5px;font-weight:600;display:flex;align-items:center;gap:5px}
#device.bsm #pos .card{border:1px solid #d6d6d6;border-radius:6px;display:flex;align-items:center;padding:0 16px;height:52px;margin-bottom:10px;font-size:12.5px}
#device.bsm #pos .card .c1{width:300px;font-weight:600;display:flex;align-items:center;gap:12px}#device.bsm #pos .card .c2{width:200px}#device.bsm #pos .card .c3{flex:1}
#device.bsm #pos .card .act{margin-left:auto;display:flex;align-items:center;gap:8px;font-size:11px}
#device.bsm #pos .warn{background:#fff0dc;border-radius:3px;padding:14px 14px;display:flex;gap:10px;font-size:11.5px;margin-bottom:22px}
#device.bsm #pos .info{background:#dbeefa;border-radius:3px;padding:12px 14px;display:flex;gap:9px;align-items:center;font-size:11.5px;max-width:540px}
#device.bsm #pos .info .ms,#device.bsm #pos .warn .ms{font-size:17px;color:#1677c9}#device.bsm #pos .warn .ms{color:#f08c00}
#device.bsm #pos .steps{display:flex;gap:8px;margin-top:6px}
#device.bsm #pos .steps span{width:28px;height:28px;border-radius:50%;background:#c9c9c9;display:grid;place-items:center;font-weight:700;font-size:13px;color:#555}
#device.bsm #pos .steps span.d{background:#71e6af;color:#111}#device.bsm #pos .steps span.c{background:#111;color:#fff}
#device.bsm #pos .sum{background:#ffeedb;border-radius:6px;padding:12px 12px;width:350px;font-size:11.5px;line-height:1.6;margin:12px 0 18px}
#device.bsm #pos .sum b{font-weight:500;font-size:12.5px}
#device.bsm #pos .seg{display:inline-flex;border:1px solid #111;border-radius:2px;overflow:hidden;height:31px}
#device.bsm #pos .seg button{padding:0 10px;font-weight:700;font-size:11.5px;background:#fff;border:0}#device.bsm #pos .seg button.on{background:#111;color:#fff}
#device.bsm #pos .addbox{background:#f1f1f1;border-radius:4px;height:46px;display:flex;align-items:center;justify-content:center;gap:7px;font-weight:600;font-size:12.5px;width:100%;border:0;max-width:720px}
#device.bsm #pos .addbox .ms{width:18px;height:18px;border-radius:50%;background:#111;color:#fff;font-size:15px;display:grid;place-items:center}
#device.bsm #pos .dlgbg{position:absolute;inset:0;background:rgba(0,0,0,.45);z-index:40}
#device.bsm #pos .dlg{position:absolute;z-index:41;left:50%;top:8px;bottom:8px;width:430px;transform:translateX(-50%);background:#fff;border-radius:8px;overflow:hidden;display:flex;flex-direction:column}
#device.bsm #pos .dlg.wide{width:760px}
#device.bsm #pos .dlg .dh{background:#000;color:#fff;font-weight:700;font-size:14px;display:flex;justify-content:space-between;align-items:center;padding:12px 14px}
#device.bsm #pos .dlg .dh button{color:#fff}
#device.bsm #pos .dlg .db{flex:1;overflow:auto;padding:16px 22px}
#device.bsm #pos .dlg .df{height:64px;border-top:2px solid #111;display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:0 22px}
#device.bsm #pos .dlg .df button{border:1.5px solid #111;border-radius:20px;padding:9px 0;width:130px;text-align:center;font-weight:700;font-size:12.5px;background:#fff}
#device.bsm #pos .dlg .df button.p{background:#71e6af;border-color:#71e6af}
#device.bsm #pos .plist{border:1px solid #ddd;border-radius:6px}
#device.bsm #pos .plist>div{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid #e6e6e6;font-size:12px}
#device.bsm #pos .plist>div.p{padding-left:34px;background:#fafafa;font-size:11.5px}
#device.bsm #pos .side{position:absolute;z-index:41;right:0;top:0;bottom:0;width:300px;background:#fff;box-shadow:-6px 0 20px rgba(0,0,0,.18);display:flex;flex-direction:column}
#device.bsm #pos .side .dh{background:#000;color:#fff;font-weight:700;font-size:14px;display:flex;justify-content:space-between;align-items:center;padding:12px 14px}
#device.bsm #pos .side .db{flex:1;overflow:auto;padding:14px 12px}
#device.bsm #pos .side .df{padding:12px;display:grid;gap:8px;border-top:2px solid #111}
#device.bsm #pos .side .df button{border:1.5px solid #111;border-radius:20px;padding:9px;text-align:center;font-weight:700;font-size:12.5px;background:#fff}
#device.bsm #pos .side .df button.p{background:#71e6af;border-color:#71e6af}
#device.bsm #pos .wel{background:#f1f1f1;border-radius:6px;padding:28px 26px;display:flex;justify-content:space-between;align-items:center}
#device.bsm #pos .wel h2{font:800 34px/1 Inter,sans-serif!important;letter-spacing:-.03em;margin:0 0 12px!important}
#device.bsm #pos .wel .ul{width:58px;height:3px;background:#71e6af;margin-bottom:14px}
#device.bsm #pos .ov{background:#e3fbef;border-radius:6px;padding:18px 22px;margin-top:16px}
#device.bsm #pos .ov .kv{display:grid;grid-template-columns:1fr 1fr;gap:0 60px;font-size:11.5px}
#device.bsm #pos .ov .kv div{display:flex;justify-content:space-between;border-bottom:1px solid #c5ecd7;padding:7px 0}
#device.bsm #pos .two{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}
#device.bsm #pos .two>div{border-radius:6px;padding:18px 22px;background:#f1f1f1;font-size:11.5px}
#device.bsm #pos .two>div.l{background:#e8e3ff}
#device.bsm #pos .two .kv div{display:flex;justify-content:space-between;border-bottom:1px solid #ddd;padding:7px 0}
#device.bsm #pos .bstoast{position:absolute;left:50%;bottom:90px;transform:translateX(-50%);background:#111;color:#fff;border-radius:6px;padding:11px 18px;font-size:12.5px;z-index:60;display:flex;gap:8px;align-items:center}
#device.bsm #pos .bstoast .ms{color:#71e6af}
#device.bsm #pos .stub{border:1px dashed #ccc;border-radius:8px;padding:30px;text-align:center;color:#555;font-size:12.5px;max-width:560px}
#device.bsm #pos .days{display:flex;gap:6px;flex-wrap:wrap}#device.bsm #pos .days button{border:1px solid #999;border-radius:16px;padding:5px 11px;font-size:11px;background:#fff}#device.bsm #pos .days button.on{background:#111;color:#fff;border-color:#111}
#device.bsm #pos .zrw{background:#ececee;padding:10px 0}

#device.bsm #pos .btabs{display:flex;gap:0;border-bottom:1px solid #ddd;margin:14px 0 18px}
#device.bsm #pos .btabs button{padding:9px 16px;font-size:12px;font-weight:600;border:1px solid transparent;border-bottom:0;border-radius:4px 4px 0 0;background:none;margin-bottom:-1px}
#device.bsm #pos .btabs button.on{border-color:#ddd;background:#fff}
#device.bsm #pos .btabs button:not(.on){background:#f1f1f1;margin-right:4px}
#device.bsm #pos .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:14px 0}
#device.bsm #pos .kpi{background:#f1f1f1;border-radius:6px;padding:14px 16px}#device.bsm #pos .kpi small{display:block;font-size:11px;color:#444}#device.bsm #pos .kpi b{font:800 22px/1.3 Inter,sans-serif}
#device.bsm #pos .bars{display:flex;align-items:flex-end;gap:10px;height:180px;border-bottom:1px solid #ccc;padding:0 6px;margin:10px 0 4px}
#device.bsm #pos .bars div{flex:1;background:#71e6af;border-radius:3px 3px 0 0;position:relative}#device.bsm #pos .bars div span{position:absolute;bottom:-18px;left:0;right:0;text-align:center;font-size:9.5px}
#device.bsm #pos .bsgrid{display:grid;grid-template-columns:repeat(8,1fr);grid-auto-rows:66px;gap:6px;background:#f1f1f1;padding:8px;border-radius:6px;max-width:820px}
#device.bsm #pos .bsgrid>button{border:1px dashed #ccc;border-radius:4px;background:#fff;color:#999;font-size:16px}
#device.bsm #pos .bsgrid>.tb3{border:0;border-radius:6px;color:#111;font-weight:700;font-size:12px;display:grid;place-items:center}
#device.bsm #pos .bslink{color:#1677c9;text-decoration:underline;font-size:12px;background:none;border:0;padding:0}
#device.bsm #pos .crow{display:flex;gap:10px;align-items:center;margin:6px 0}
#device.bsm #pos .tile3{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
#device.bsm #pos .tile3>button{border:1px solid #ddd;border-radius:6px;padding:16px;text-align:left;background:#fff;font-size:12px;min-height:84px}
#device.bsm #pos .tile3>button b{display:block;font-size:14px;margin-bottom:6px}
#device.bsm #pos .gcard{width:150px;height:96px;border-radius:8px;display:grid;place-items:center;color:#fff;font-weight:800;font-size:15px}
#device.bsm #pos .note{font-size:10.5px;color:#555;margin-top:6px}
#device.bsm #pos .vlist{display:flex;flex-direction:column;gap:6px;max-width:360px}
#device.bsm #pos .vlist .crow .bi{flex:1}
#device.bsm #pos .bsel.sm{height:26px}
#device.bsm #pos .pstab{display:flex;gap:4px;margin:6px 0 16px;flex-wrap:wrap}
#device.bsm #pos .pstab button{padding:7px 12px;border-radius:16px;font-size:11.5px;font-weight:600;background:#f1f1f1;border:0}
#device.bsm #pos .pstab button.on{background:#111;color:#fff}
`;document.head.appendChild(st);

/* ── state ── */
const today=()=>new Date().toISOString().slice(0,10);
const D=()=>{if(!S.bs){S.bs={}}const d=S.bs;const def={org:'Kaffebaren AB',orgno:'559999-0000',stores:['Kaffebaren'],
  users:[{first:'Anna',last:'Ägare',user:'anna@kaffebaren.se',role:'Ägare',id:'',pin:''},{first:'Bea',last:'Barista',user:'bea.barista',role:'Säljare',id:'1002',pin:'••••'},{first:'Kim',last:'Karlsson',user:'kim.karlsson',role:'Butikschef',id:'1001',pin:'••••'}],
  ext:[],set:{returns:true,discounts:true,park:true,promos:true,analytics:true,stock:true,time:true,onetap:true,pinlen:'fixed',customer:true,variants:true,foodvat:false,takeaway:true,tips:false,covers:false,tables:true,mgrdel:true,courses:false,ingr:true,allerg:true,ticket:false,queue:false,itemno:false,itemprice:false,wait:false,paper:true,autoprint:false,sms:true,notes:true},ticketRef:'Automatisk (1-999)',ticketHdr:'Referens:',
  options:[{id:'o1',name:'Storlek',values:['Liten','Mellan','Stor'],at:'2026-09-01'}],ingGroups:[{id:'ig1',name:'Mejeri',color:'#ffffff'}],ingredients:[{id:'i1',name:'Mjölk',unit:'l',gid:'ig1'}],
  popups:[{id:'pn1',name:'Åldersverifiering',text:'Kontrollera legitimation.',once:false}],priceLists:[{id:'pl-take',name:'Avhämtning (moms 6%)',vat:6,pre:true,prices:{}}],
  loyalty:null,members:[],segments:{nyDays:30,topDays:365,topMin:2,inactDays:90},kds:[],courses:[],gtemps:[],cards:[],customers:[{name:'Café Solen AB',email:'faktura@cafesolen.se',phone:'08-123 456 78'}],
  stockTakes:[],transfers:[],locations:[{name:'Kaffebaren',stock:true},{name:'Lager Ulvsunda',stock:true,wh:true}],shifts:[{who:'Bea Barista',in:today()+' 07:58',out:today()+' 16:05'}],
  reportSet:{low:false,lowEmail:'',auto:false},accounts:{cash:{Kontant:'1910',Kontokort:'1580',Swish:'1930',Presentkort:'2420'},vat:{25:'2611',12:'2621',6:'2631'},extra:{}},
  cloud:[],cdImg:false,receipt:{header:'Välkommen till Kaffebaren!',footer:'Tack för besöket!'},online:{store:null,sections:[]},integ:{}};
 for(const k in def)if(d[k]===undefined)d[k]=JSON.parse(JSON.stringify(def[k]));for(const k in def.set)if(d.set[k]===undefined)d.set[k]=def.set[k];return d};
const B=()=>UI.bs||(UI.bs={page:'welcome',open:{catalog:true},dd:null,dlg:null,side:null,toast:null,err:{},arg:null});
const F=k=>UI.f[k]==null?'':UI.f[k];
const go=(p,arg,keep)=>{const b=B();b.page=p;b.arg=arg==null?null:arg;b.dd=null;b.dlg=null;b.side=null;b.err={};b.tab=null;if(!keep)UI.f={};const n=NAVMAP[p];if(n&&n.parent)b.open[n.parent]=true;if(INIT[p])INIT[p](arg);render();const c=document.querySelector('#pos .bsc');if(c)c.scrollTop=0;emit('bs:page:'+p)};
const INIT={};
let tt=null;const btoast=t=>{B().toast=t;render();clearTimeout(tt);tt=setTimeout(()=>{B().toast=null;render()},2600)};

/* ── navigation (Swedish Backstage) ── */
const NAV=[
 {sec:'APPLIKATIONER'},
 {id:'welcome',t:'Välkommen',ic:'home'},{id:'loan',t:'Företagslån',ic:'money'},
 {id:'catalog',t:'Produktkatalog',ic:'category',kids:[['products','Produkter','category'],['options','Alternativ för varianter','lan'],['ingredients','Ingredienser','grocery'],['modifiers','Tillval','lan'],['pricelists','Prislistor','view_list'],['impexp','Import / export','sync_alt'],['popup','Popup-meddelanden','notifications'],['psettings','Inställningar','settings']]},
 {id:'promotions',t:'Kampanjer',ic:'campaign'},
 {id:'loyalty',t:'Lojalitet',ic:'loyalty',kids:[['lprog','Lojalitetsprogram','card_membership'],['lmem','Medlemmar','group_add'],['limp','Importera medlemmar','upload'],['lseg','Segmentöversikt','pie_chart'],['lterms','Villkor och policy','contract']]},
 {id:'kitchen',t:'Kök',ic:'skillet',kids:[['stations','Skrivarstationer','print'],['kds','Köksdisplay','monitor'],['courses','Rätter','stockpot'],['tableplans','Bordskartor','table_restaurant']]},
 {id:'gift',t:'Yabie presentkort',ic:'redeem',kids:[['gtemp','Presentkortsmallar','style'],['gover','Presentkortsöversikt','credit_card']]},
 {id:'customers',t:'Kunder',ic:'group'},{id:'orders',t:'Orderhistorik',ic:'history'},{id:'licenses',t:'Licenser',ic:'tablet_android'},
 {id:'stock',t:'Lagerhantering',ic:'assignment',kids:[['stake','Inventering','checklist'],['smove','Lagerförflyttning','move_up'],['srec','Leveranser','inventory_2'],['srep','Lagerrapporter','summarize'],['sloc','Lagerplatser','location_on']]},
 {id:'time',t:'Personalliggare',ic:'timer',kids:[['tshifts','Personalliggare','schedule'],['topen','Aktiva skift','pending_actions'],['tset','Inställningar','settings']]},
 {id:'reports',t:'Rapporter',ic:'insert_chart',kids:[['zreport','Z-rapport','query_stats'],['periodic','Periodrapport','receipt'],['sie','SIE Rapport','monitoring'],['onlinerep','Onlinerapporter','web'],['detailed','Detaljerade försäljningsrapporter','table_chart'],['timerep','Personalliggare','badge'],['ypay','Yabie Pay','credit_card'],['rset','Inställningar','settings']]},
 {id:'analytics',t:'Försäljning',ic:'trending_up',kids:[['aov','Översikt','dashboard'],['arev','Intäkter','paid'],['apro','Kampanjer','campaign'],['arew','Bonusar','redeem'],['aart','Produkter','category'],['agrp','Grupper','workspaces'],['amod','Tillval','lan']]},
 {sec:'INSTÄLLNINGAR'},
 {id:'org',t:'Handlare',ic:'corporate_fare',kids:[['basic','Grunduppgifter','folder_managed'],['receipt','Kvittoinformation','receipt_long'],['osettings','Inställningar','settings']]},
 {id:'payments',t:'Betalningar',ic:'payments',kids:[['paymethods','Betalsätt','paid']]},
 {id:'locations',t:'Platser',ic:'storefront',kids:[['stores','Butiker','store'],['ostores','Onlinebutiker','shopping_cart'],['wh','Lagerplatser','warehouse']]},
 {id:'users',t:'Användare',ic:'account_circle',kids:[['userlist','Alla användare','person']]},
 {id:'book',t:'Bokföring',ic:'account_balance',kids:[['coa','Kontoplan','account_tree']]},
 {id:'hw',t:'Extern hårdvara',ic:'tv',kids:[['starcloud','Star Cloud-skrivare','print'],['custdisp','Kunddisplay','tv'],['shop','Hårdvarubutik','shopping_cart']]},
 {id:'integrations',t:'Integrationer',ic:'settings'}];
const NAVMAP={};NAV.forEach(n=>{if(n.id){NAVMAP[n.id]={t:n.t};(n.kids||[]).forEach(k=>NAVMAP[k[0]]={t:k[1],parent:n.id})}});
const sub=(id,t,hl,parent)=>NAVMAP[id]={t,hl,parent:parent||(NAVMAP[hl]||{}).parent};
function navHtml(){const b=B();const hl=(NAVMAP[b.page]&&NAVMAP[b.page].hl)||b.page;
 return `<div class="bsnav"><div class="lg">yabie<small>Backstage</small></div><span class="ms tg">left_panel_close</span><hr><div class="sc">${NAV.map(n=>{if(n.sec)return `<div class="sec">${n.sec}</div>`;
  if(!n.kids)return `<button class="it ${hl===n.id?'on':''}" data-a="bsnav" data-x="${n.id}" data-g="bsn-${n.id}"><span class="ms">${n.ic}</span>${n.t}</button>`;
  const op=b.open[n.id];return `<button class="it" data-a="bsgrp" data-x="${n.id}" data-g="bsn-${n.id}"><span class="ms">${n.ic}</span>${n.t}<span class="ms car">${op?'arrow_drop_up':'arrow_drop_down'}</span></button>`+(op?n.kids.map(k=>`<button class="it sub ${hl===k[0]?'on':''}" data-a="bsnav" data-x="${k[0]}" data-g="bsn-${k[0]}"><span class="ms">${k[2]}</span>${k[1]}</button>`).join(''):'')}).join('')}</div></div>`}
A.bsnav=x=>{B().fg=null;go(x)};
A.bsgrp=x=>{const b=B();b.open[x]=!b.open[x];render();emit('bs:open:'+x)};
A.bsgo=x=>{const i=String(x).indexOf('|');i<0?go(x):go(x.slice(0,i),x.slice(i+1))};

/* ── building blocks ── */
const lbl=(t,req)=>`<span class="lbl">${t}${req?' *':''}</span>`;
const inp=(k,o={})=>`<input class="bi ${B().err[k]?'err':''}" data-in="${k}" data-g="in-${k}" value="${esc(F(k))}" ${o.ph?`placeholder="${o.ph}"`:''} ${o.type?`type="${o.type}"`:''} ${o.live?'data-live="1"':''} autocomplete="off" spellcheck="false" ${o.st?`style="${o.st}"`:''}>${B().err[k]?'<div class="errm">Fältet är obligatoriskt</div>':''}`;
const ta=k=>`<textarea class="bi" data-in="${k}" data-g="in-${k}">${esc(F(k))}</textarea>`;
const dd=(k,opts,ph,o={})=>{const b=B(),v=F(k),op=b.dd===k;const lab=o.label?o.label(v):(()=>{const f=opts.find(x=>(Array.isArray(x)?x[0]:x)==v);return f?(Array.isArray(f)?f[1]:f):v})();
 return `<div class="ddw"><button class="bsel ${op?'op':''} ${b.err[k]?'err':''} ${o.sm?'sm':''}" data-a="bsdd" data-x="${k}" data-g="dd-${k}">${v!==''?esc(lab):`<i>${ph||'Välj'}</i>`}<span class="car ms" style="width:31px">arrow_drop_down</span></button>${b.err[k]?'<div class="errm">Fältet är obligatoriskt</div>':''}
  ${op?`<div class="ddl">${opts.map(x=>{const [val,t,sw]=Array.isArray(x)?x:[x,x];return `<button data-a="bsopt" data-x="${k}|${esc(val)}" data-g="opt-${k}-${slug(String(val))}">${sw!==undefined?`<span class="sw" style="background:${sw}"></span>`:''}${esc(t)}</button>`}).join('')}</div>`:''}</div>`};
A.bsdd=k=>{const b=B();b.dd=b.dd===k?null:k;render();emit('bs:dd:'+k)};
A.bsopt=x=>{const i=x.indexOf('|');const k=x.slice(0,i),v=x.slice(i+1);UI.f[k]=v;const b=B();b.dd=null;delete b.err[k];if(OPTHOOK[k])OPTHOOK[k](v);render();emit('bs:set:'+k,v)};
const OPTHOOK={};
const isOn=(k,def)=>UI.f[k]==null?!!def:!!UI.f[k];
const tgl=(k,def)=>`<button class="tgl ${isOn(k,def)?'on':''}" data-a="bstg" data-x="${k}|${def?1:0}" data-g="tg-${k}"></button>`;
A.bstg=x=>{const [k,d]=x.split('|');UI.f[k]=!isOn(k,d==='1');render();emit('bs:tg:'+k,UI.f[k])};
const chk=(k,t,def)=>`<button class="cl" data-a="bstg" data-x="${k}|${def?1:0}" data-g="ck-${k}"><span class="chk ${isOn(k,def)?'on':''}"></span>${t}</button>`;
const rad=(k,v,t,def)=>{const cur=F(k)||def;return `<button class="rl" data-a="bsrad" data-x="${k}|${v}" data-g="rd-${k}-${v}"><span class="rad ${cur===v?'on':''}"></span>${t}</button>`};
const rcard=(k,v,t,d,def,ex)=>{const cur=F(k)||def;return `<button class="rcard ${cur===v?'on':''}" data-a="bsrad" data-x="${k}|${v}" data-g="rd-${k}-${v}"><span class="rad"></span><span><b>${t}</b><small>${d}</small>${ex?`<div style="border-top:1px solid #ddd;margin-top:8px;padding-top:8px;font-size:10px">${ex}</div>`:''}</span></button>`};
A.bsrad=x=>{const [k,v]=x.split('|');UI.f[k]=v;render();emit('bs:set:'+k,v)};
const org=()=>esc(D().org.replace(' AB',''));
const head=(trail,title,right='')=>`<div class="bshead" style="position:relative">${right?`<div style="position:absolute;right:36px;top:16px">${right}</div>`:''}<div class="bc">${org()} / ${trail.map(esc).join(' / ')}</div><h1>${title}</h1></div>`;
const addPill=(t,x,g)=>`<button class="pill" data-a="bsgo" data-x="${x}" data-g="${g}"><span class="ms">add</span>${t}</button>`;
const actPill=(t,a,g,x='',ic='add')=>`<button class="pill" data-a="${a}" data-x="${x}" data-g="${g}"><span class="ms">${ic}</span>${t}</button>`;
const foot=(save,g='bs-save',lab='Spara',noCancel)=>`<div class="bsfoot">${noCancel?'<span></span>':`<button class="bcan" data-a="bscancel" data-g="bs-cancel">Avbryt</button>`}<button class="bsave" data-a="${save}" data-g="${g}"><span><span class="ms">save</span>${lab}</span><i><span class="ms">expand_more</span></i></button></div>`;
const BACK={};
A.bscancel=()=>{const p=B().page;const t=BACK[p];go(typeof t==='function'?t():t||'welcome')};
const need=keys=>{const b=B();b.err={};keys.forEach(k=>{if(!String(F(k)).trim())b.err[k]=1});if(Object.keys(b.err).length){render();emit('bs:invalid');return false}return true};
const SW=[['Neutral','#ffffff'],['Coral','#ffa4a1'],['Peach','#ffaf8e'],['Honey','#ffd87f'],['Saffron','#ffeb80'],['Pistachio','#f5fa7b'],['Lime','#d0f581'],['Apple','#a8f69f'],['Mint','#a9fcd3'],['Aquamarine','#a6f0f4'],['Heaven','#a4e4ff'],['Jeans','#b4dbff'],['Lavender','#bccaff'],['Violet','#cabcff'],['Lilac','#e4bbff'],['Orchid','#fdc0fd'],['Powder','#ffd2e7'],['Coffee','#dec6af'],['Sand','#f8dabf']];
const swOf=n=>(SW.find(s=>s[0]===n)||SW[0])[1];
const dmy=iso=>{const [y,m,d]=String(iso||'').slice(0,10).split('-');return d?`${d}/${m}/${y}`:''};
const kr=v=>(+v||0).toFixed(2).replace('.',',')+' kr';
const ibtn=(ic,a,x,g,t='')=>`<button data-a="${a}" data-x="${x}" ${g?`data-g="${g}"`:''} style="display:inline-flex;align-items:center;gap:3px;font-weight:600"><span class="ms" style="font-size:16px">${ic}</span>${t}</button>`;
const tool=(ph,cols)=>`<div class="tool"><input class="bi sb" placeholder="${ph}" style="height:28px;font-style:italic"><div class="tb2"><span><span class="ms">tune</span>Filter</span><span><span class="ms">view_column</span>Kolumner <small style="color:#888">${cols}</small></span></div></div>`;
const pager=n=>`<div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-size:11px"><span>Visar 1-${n} av totalt ${n} resultat</span><span style="display:flex;gap:6px"><span style="background:#eee;padding:6px 10px">&lt;</span><span style="background:#000;color:#fff;padding:6px 10px">1</span><span style="background:#eee;padding:6px 10px">&gt;</span></span></div>`;
const tabs=(key,list,def)=>{const cur=B().tab||def;return `<div class="btabs">${list.map(([v,t])=>`<button class="${cur===v?'on':''}" data-a="bstab" data-x="${v}" data-g="tab-${key}-${v}">${t}</button>`).join('')}</div>`};
A.bstab=v=>{B().tab=v;render();emit('bs:tab:'+v)};
const dlg=(title,body,btns,o={})=>`<div class="dlgbg"></div><div class="dlg ${o.wide?'wide':''}" style="${o.h?`top:60px;bottom:auto;height:${o.h}px`:''}"><div class="dh">${title}<button data-a="bsdlgx" class="ms" style="font-size:22px">cancel</button></div><div class="db">${body}</div><div class="df">${btns}</div></div>`;
A.bsdlgx=()=>{const b=B();b.dlg=null;render();emit('bs:dlgclose')};
const openDlg=(n,ev)=>{const b=B();b.dlg=n;b.err={};render();emit(ev||'bs:dlg:'+n)};
const sideP=(title,body,btns)=>`<div class="side"><div class="dh">${title}<button data-a="bssideclose" class="ms" style="font-size:22px">cancel</button></div><div class="db">${body}</div><div class="df">${btns}</div></div>`;
A.bssideclose=()=>{B().side=null;render();emit('bs:sideclose')};
const stub=p=>head([NAVMAP[p]?NAVMAP[p].t:p],NAVMAP[p]?NAVMAP[p].t:p)+`<div class="bsbody"><div class="stub"><span class="ms" style="font-size:30px;width:auto;color:#999">construction</span><br>Den här delen av Backstage finns inte i demot.</div></div>`;
const PG={},SAVES={},FOOT={};
const bconfirm=(o,cb)=>{B().cf={...o,cb};render();emit('bs:confirm')};
A.bscf=x=>{const c=B().cf;B().cf=null;render();c&&c.cb(x==='1')};
const cfHtml=()=>{const c=B().cf;return c?`<div class="dlgbg" style="z-index:70"></div><div class="dlg" style="z-index:71;top:200px;bottom:auto;height:auto"><div class="dh">${esc(c.t)}</div><div class="db"><p class="lead">${esc(c.p)}</p></div><div class="df"><button data-a="bscf" data-x="0">Avbryt</button><button class="p" style="${c.red?'background:#e5484d;border-color:#e5484d;color:#fff':''}" data-a="bscf" data-x="1" data-g="cf-ok">${esc(c.ok||'OK')}</button></div></div>`:''};
/* product picker dialog, shared by promotions, stations, KDS, loyalty, price lists … */
function pickDlg(){const b=B();if(b.dlg!=='pick')return '';const sel=b.pick;const q=(UI.f.b_pq||'').toLowerCase();
 return dlg('Välj produkter',`<input class="bi" data-in="b_pq" data-live="1" placeholder="Sök efter produkter" value="${esc(UI.f.b_pq||'')}" style="font-style:italic;margin-bottom:12px">
  <button class="cl" data-a="bspickall"><span class="chk ${sel.g.length===S.groups.length?'on':''}"></span>Välj alla produkter</button><div class="plist" style="margin-top:8px">${S.groups.filter(g=>!q||g.name.toLowerCase().includes(q)||S.products.some(p=>p.gid===g.id&&p.name.toLowerCase().includes(q))).map(g=>{const op=(b.pickOpen||[]).includes(g.id)||q;
  return `<div><button class="cl" style="margin:0" data-a="bspickg" data-x="${g.id}" data-g="pick-${slug(g.name)}"><span class="chk ${sel.g.includes(g.id)?'on':''}"></span>${esc(g.name)}</button><button data-a="bspicko" data-x="${g.id}" class="ms" style="margin-left:auto">${op?'expand_less':'expand_more'}</button></div>`+(op?S.products.filter(p=>p.gid===g.id&&(!q||p.name.toLowerCase().includes(q))).map(p=>`<div class="p"><button class="cl" style="margin:0" data-a="bspickp" data-x="${p.id}" data-g="pickp-${slug(p.name)}"><span class="chk ${sel.g.includes(g.id)||sel.p.includes(p.id)?'on':''}"></span>${esc(p.name)}</button></div>`).join(''):'')}).join('')}</div>`,
  `<button data-a="bsdlgx">Avbryt</button><button class="p" data-a="bspickok" data-g="pick-add">Lägg till</button>`)}
A.bspick=x=>{const b=B();b.dlg='pick';b.pickFor=x;const f=['b_'+x+'_g','b_'+x+'_p'];b.pick={g:[...(UI.f[f[0]]||[])],p:[...(UI.f[f[1]]||[])]};b.pickOpen=[];UI.f.b_pq='';render();emit('bs:pick')};
A.bspickg=id=>{const s=B().pick;const i=s.g.indexOf(id);i<0?s.g.push(id):s.g.splice(i,1);s.p=s.p.filter(p=>(P(p)||{}).gid!==id);render();emit('bs:pickg')};
A.bspickp=id=>{const s=B().pick;const i=s.p.indexOf(id);i<0?s.p.push(id):s.p.splice(i,1);render();emit('bs:pickp')};
A.bspicko=id=>{const b=B();b.pickOpen=b.pickOpen||[];const i=b.pickOpen.indexOf(id);i<0?b.pickOpen.push(id):b.pickOpen.splice(i,1);render()};
A.bspickall=()=>{const s=B().pick;s.g=s.g.length===S.groups.length?[]:S.groups.map(g=>g.id);s.p=[];render()};
A.bspickok=()=>{const b=B();const x=b.pickFor;UI.f['b_'+x+'_g']=[...b.pick.g];UI.f['b_'+x+'_p']=[...b.pick.p];b.dlg=null;render();emit('bs:picked')};
const pickedTable=(x,w=720)=>{const g=UI.f['b_'+x+'_g']||[],p=UI.f['b_'+x+'_p']||[];return g.length||p.length?`<table class="bt" style="max-width:${w}px;margin-bottom:10px"><tr><th>Namn</th><th>Typ</th></tr>${g.map(id=>`<tr><td>${esc((G(id)||{}).name||id)}</td><td>Produktgrupp</td></tr>`).join('')}${p.map(id=>`<tr><td>${esc((P(id)||{}).name||id)}</td><td>Produkt</td></tr>`).join('')}</table>`:''};
const addBox=(t,a,x,g,dis)=>`<button class="addbox" style="${dis?'opacity:.5':''}" data-a="${dis?'nop':a}" data-x="${x}" data-g="${g}"><span class="ms">add</span>${t}</button>`;

/* ── render ── */
function bsHtml(){D();const b=B();const p=b.page;const body=(PG[p]||(()=>stub(p)))();
 const ft=FOOT[p]?FOOT[p]():SAVES[p]?foot(...SAVES[p]):'';
 return `<div class="bsw">${navHtml()}<div class="bsmain"><div class="bstop"><div class="o"><small>DEMO</small><b>${org()}</b></div><div class="u"><span class="ms" style="font-size:22px">account_circle</span>demo@kaffebaren.se<span class="ms" style="font-size:16px">keyboard_arrow_down</span><span style="width:1px;height:26px;background:rgba(0,0,0,.15);margin:0 10px"></span><span class="ms" style="font-size:22px">logout</span></div></div>
  <div class="bsc" id="bsc">${body}</div>${ft}${cfHtml()}${b.toast?`<div class="bstoast"><span class="ms">check_circle</span>${esc(b.toast)}</div>`:''}</div></div>`}
const _render=render;
render=function(){if(APP()!=='bs')return _render();const pos=document.getElementById('pos');if(!pos)return;const c=pos.querySelector('.bsc'),sc=c?c.scrollTop:0,key=B().page+(B().wiz||'')+(B().tab||'');
 const ae=document.activeElement,aeIn=ae&&ae.dataset&&ae.dataset.in,selS=ae&&ae.selectionStart;
 pos.innerHTML=bsHtml();const c2=pos.querySelector('.bsc');if(c2&&key===render.__k)c2.scrollTop=sc;render.__k=key;
 if(aeIn){const e=pos.querySelector(`[data-in="${aeIn}"]`);if(e){e.focus();try{e.setSelectionRange(selS,selS)}catch(_){}}}
 emit('render')};
document.getElementById('pos').addEventListener('click',e=>{if(APP()!=='bs'||e.defaultPrevented)return;const b=B();if(b.dd&&!e.target.closest('.ddw')){b.dd=null;render()}},true);
document.getElementById('pos').addEventListener('keydown',e=>{if(APP()==='bs'&&e.key==='Enter')e.stopImmediatePropagation()},true);

/* ── app switch ── */
function appSync(){const a=APP();['pos','bs','mob'].forEach(x=>{const e=document.getElementById('a-'+x);if(e)e.setAttribute('aria-pressed',a===x)});const dv=document.getElementById('device');dv.classList.toggle('bsm',a==='bs');dv.classList.toggle('mobm',a==='mob');if(a!=='mob')dv.classList.remove('m-v3','m-a35','m-a920');
 document.getElementById('reset').textContent=a==='pos'?'Återställ kassan':'Återställ demot';if(a==='bs'&&!UI.bs)B();if(a==='mob'&&window.MOB)MOB.init();render();fit();list();if(a==='mob'&&!TS.mobPicked&&window.MOB)MOB.askDev()}
window.appSync=appSync;
function setApp(a){if(APP()===a)return;if(T)stopTour();TS.app=a;tsave();UI.modal=null;UI.pop=null;UI.f={};if(a==='bs'){UI.bs=null;B()}appSync()}
document.getElementById('a-pos').onclick=()=>setApp('pos');
document.getElementById('a-bs').onclick=()=>setApp('bs');
window.setApp=setApp;{const m=document.getElementById('a-mob');if(m)m.onclick=()=>setApp('mob')}
if(!TS.appAsked){TS.appAsked=1;tsave();tourEl.innerHTML=`<div class="win" ${GDIR()}><div style="max-width:440px"><h3>${GU('u.appQ')}</h3><p>${GU('u.appP')}</p>
 <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px"><button class="pbtn pri" data-app="pos" style="padding:14px 8px">🧾 ${GU('u.appPos')}</button><button class="pbtn pri" data-app="mob" style="padding:14px 8px">📱 ${GU('u.appMob')}</button><button class="pbtn pri" data-app="bs" style="padding:14px 8px">🖥️ Backstage</button></div></div></div>`;
 tourEl.firstElementChild.onclick=e=>{const b=e.target.closest('[data-app]');if(!b)return;tourEl.innerHTML='';setApp(b.dataset.app)}}
window.BS={bconfirm,D,B,F,go,INIT,btoast,NAVMAP,sub,lbl,inp,ta,dd,OPTHOOK,isOn,tgl,chk,rad,rcard,head,addPill,actPill,foot,BACK,need,SW,swOf,dmy,kr,ibtn,tool,pager,tabs,dlg,openDlg,sideP,stub,PG,SAVES,FOOT,pickDlg,pickedTable,addBox,today,org};

})();
