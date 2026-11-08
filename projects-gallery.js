/* Project galleries and accessible lightbox. */
(()=>{
 const dialog=document.querySelector('.wp-lightbox');if(!dialog)return;
 const image=dialog.querySelector('img');let photos=[],captions=[],index=0,lastFocus=null;
 const render=()=>{image.src=photos[index];image.alt=captions[index]||('Project image '+(index+1));};
 const close=()=>{dialog.hidden=true;document.body.classList.remove('wp-lightbox-open');image.removeAttribute('src');lastFocus?.focus();};
 const open=(gallery,at)=>{const thumbs=[...gallery.querySelectorAll('.wp-thumb')];photos=thumbs.map(t=>t.dataset.photo);captions=thumbs.map(t=>t.dataset.caption||t.getAttribute('aria-label'));index=at;lastFocus=document.activeElement;render();dialog.hidden=false;document.body.classList.add('wp-lightbox-open');dialog.querySelector('.wp-lightbox-close').focus();};
 document.querySelectorAll('.wp-gallery-media').forEach(gallery=>{
  const thumbs=[...gallery.querySelectorAll('.wp-thumb')],main=gallery.querySelector('.wp-main-photo'),caption=gallery.querySelector('.wp-gallery-caption');
  thumbs.forEach((t,i)=>t.addEventListener('click',()=>{main.src=t.dataset.photo;main.alt=t.querySelector('img')?.alt||t.dataset.caption;caption.textContent=t.dataset.caption||'';thumbs.forEach(x=>{x.classList.remove('is-active');x.setAttribute('aria-pressed','false')});t.classList.add('is-active');t.setAttribute('aria-pressed','true');}));
  gallery.querySelector('.wp-photo-open').addEventListener('click',()=>open(gallery,Math.max(0,thumbs.findIndex(x=>x.classList.contains('is-active')))));
 });
 dialog.querySelector('.wp-lightbox-close').addEventListener('click',close);
 dialog.querySelector('.wp-lightbox-prev').addEventListener('click',()=>{index=(index+photos.length-1)%photos.length;render()});
 dialog.querySelector('.wp-lightbox-next').addEventListener('click',()=>{index=(index+1)%photos.length;render()});
 dialog.addEventListener('click',e=>{if(e.target===dialog)close()});
 dialog.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const buttons=[...dialog.querySelectorAll('button')];const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
 document.addEventListener('keydown',e=>{if(dialog.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft'){index=(index+photos.length-1)%photos.length;render()}if(e.key==='ArrowRight'){index=(index+1)%photos.length;render()}});
})();
