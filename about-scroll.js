/* About-page scroll reveal: progressive enhancement, once per element. */
(() => {
 const page=document.querySelector('.ab-page');
 if(!page || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const selectors=['.ab-hero .ab-kicker','.ab-hero h1','.ab-hero .ab-intro','.ab-photo','.ab-bio-copy > *','.ab-process-layout > div > *','.ab-process li','.ab-section-heading > *','.ab-project-list article','.ab-principles h2','.ab-principle-grid article','.ab-research > *','.ab-cta .ab-container > *'];
 const nodes=[...new Set(selectors.flatMap(sel=>[...page.querySelectorAll(sel)]))];
 const observer=new IntersectionObserver((entries)=>{
   entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('ab-in-view');observer.unobserve(entry.target)}});
 },{threshold:.1,rootMargin:'0px 0px -30px 0px'});
 nodes.forEach((node,i)=>{node.classList.add('ab-scroll-reveal');node.style.setProperty('--ab-delay',`${Math.min(i%4,3)*85}ms`);observer.observe(node)});
 page.classList.add('ab-motion-ready');
})();
