/* Scroll-controlled sequence: one milestone at a time. */
(()=>{
 const section=document.querySelector('[data-wm-process]');if(!section)return;
 const steps=[...section.querySelectorAll('.wm-step')];if(!steps.length)return;
 const show=i=>steps.forEach((s,j)=>{if(j<=i)s.classList.add('is-revealed');if(j<i)s.classList.add('is-connected')});
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){show(steps.length-1);return}
 section.classList.add('wm-journey-ready');
 const mobile=matchMedia('(max-width: 900px)');let observer;
 function desktop(){if(mobile.matches)return;const r=section.getBoundingClientRect();if(r.top>innerHeight*.68)return;const distance=Math.max(1,section.offsetHeight-innerHeight*.7);const progress=Math.max(0,Math.min(.999,(innerHeight*.68-r.top)/distance));show(Math.min(steps.length-1,Math.floor(progress*steps.length)))}
 function setup(){if(observer)observer.disconnect();if(mobile.matches){observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const i=steps.indexOf(e.target);if(i>=0)show(i);observer.unobserve(e.target)}})},{rootMargin:'0px 0px -15% 0px',threshold:.6});steps.forEach(s=>{if(!s.classList.contains('is-revealed'))observer.observe(s)})}else desktop()}
 let queued=false;addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{desktop();queued=false})}},{passive:true});mobile.addEventListener('change',setup);setup();
})();
