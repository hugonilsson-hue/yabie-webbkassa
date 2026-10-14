/* Korta videoklipp i guidesteg (fältet vid på ett steg). */
(()=>{
const st=document.createElement('style');st.textContent=`.bub .stepvid{display:block;width:100%;max-height:min(260px,34vh);object-fit:cover;border-radius:10px;margin:8px 0 2px;background:#111}.bub.hasvid{max-width:min(380px,calc(100vw - 32px))}`;document.head.appendChild(st);
const _show=show;show=function(){const r=_show.apply(this,arguments);try{const s=T&&cur();const b=document.getElementById('bub');
 if(s&&s.vid&&b&&!b.querySelector('.stepvid')){const v=document.createElement('video');v.className='stepvid';[[s.vid,'video/mp4'],[s.vid.replace(/\.mp4$/,'.webm'),'video/webm']].forEach(([u,t])=>{const so=document.createElement('source');so.src=u;so.type=t;v.appendChild(so)});v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.setAttribute('playsinline','');v.setAttribute('aria-hidden','true');
  const after=b.querySelector('.dtx')||b.querySelector('h5');(after||b.firstChild).after(v);b.classList.add('hasvid');v.addEventListener('loadedmetadata',()=>{window.tourPlace&&tourPlace()});v.play&&v.play().catch(()=>{});place()}}catch(e){}return r};
})();
