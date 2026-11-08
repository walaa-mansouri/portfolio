/* Lightweight Luminous Type-inspired enhancement for the existing static site. */
(() => {
  const heading = document.querySelector('.hero-full .luminous-heading');
  if (!heading) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncText = () => heading.setAttribute('data-luminous-text', heading.textContent.trim());
  syncText();
  new MutationObserver(syncText).observe(heading, {childList:true,subtree:true,characterData:true});
  if (reduced.matches) return;
  const hero = heading.closest('.hero-full');
  let hovering = false, visible = true, frameId = 0;
  const setSpot = (x,y) => {
    heading.style.setProperty('--luminous-x', `${x.toFixed(2)}%`);
    heading.style.setProperty('--luminous-y', `${y.toFixed(2)}%`);
  };
  hero.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const rect = heading.getBoundingClientRect();
    hovering = true;
    const x = Math.max(0,Math.min(100,(e.clientX-rect.left)/Math.max(1,rect.width)*100));
    const y = Math.max(0,Math.min(100,(e.clientY-rect.top)/Math.max(1,rect.height)*100));
    setSpot(x,y);
  },{passive:true});
  hero.addEventListener('pointerleave',()=>{hovering=false},{passive:true});
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:0}).observe(hero);
  }
  const start=performance.now();
  const animate=now=>{
    if (visible && !hovering && document.visibilityState==='visible') {
      const t=(now-start)/1000;
      setSpot(50+40*Math.sin(t*.43),50+21*Math.sin(t*.65+.7));
    }
    frameId=requestAnimationFrame(animate);
  };
  frameId=requestAnimationFrame(animate);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(frameId),{once:true});
})();
