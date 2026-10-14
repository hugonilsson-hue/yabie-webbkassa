/* Korta videoklipp i guidesteg (fältet vid). Visas när man trycker "Se det i videon"; valet kommer ihåg. */
(()=>{
const st=document.createElement('style');st.textContent=`.bub .stepvid{display:block;width:100%;max-height:min(240px,30vh);object-fit:cover;border-radius:10px;margin:8px 0 2px;background:#111}
.bub .vidtgl{display:inline-flex;align-items:center;gap:5px;margin-top:6px;background:none;border:0;padding:0;font:600 12.5px Inter,sans-serif;color:#1677ff;cursor:pointer}`;document.head.appendChild(st);
let open=false;try{open=localStorage.getItem('kassaskolan-vid')==='1'}catch(e){}
const mk=src=>{const v=document.createElement('video');v.className='stepvid';v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.setAttribute('playsinline','');v.setAttribute('aria-hidden','true');
 [[src,'video/mp4'],[src.replace(/\.mp4$/,'.webm'),'video/webm']].forEach(([u,t])=>{const so=document.createElement('source');so.src=u;so.type=t;v.appendChild(so)});
 v.addEventListener('loadedmetadata',()=>{window.tourPlace&&tourPlace()});setTimeout(()=>v.play&&v.play().catch(()=>{}),0);return v};
function add(){const s=T&&cur();const b=document.getElementById('bub');if(!s||!s.vid||!b||b.querySelector('.vidtgl'))return;
 const at=b.querySelector('.dtx')||b.querySelector('h5')||b.firstChild;const btn=document.createElement('button');btn.className='vidtgl';btn.type='button';
 const lab=()=>{btn.textContent=(open?'✕ ':'▶ ')+GU(open?'u.vidHide':'u.vidShow')};lab();at.after(btn);
 if(open)btn.after(mk(s.vid));
 btn.onclick=e=>{e.stopPropagation();open=!open;try{localStorage.setItem('kassaskolan-vid',open?'1':'0')}catch(x){}lab();const v=b.querySelector('.stepvid');if(open&&!v)btn.after(mk(s.vid));if(!open&&v)v.remove();window.tourPlace&&tourPlace()};
 window.tourPlace&&tourPlace()}
const _show=show;show=function(){const r=_show.apply(this,arguments);try{add()}catch(e){}return r};
})();
