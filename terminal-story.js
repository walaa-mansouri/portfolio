/* Portrait scroll reveal; no terminal/rain effect. */
(() => {
  const section = document.querySelector('.coder-story');
  if (!section) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  let scheduled = false;
  const update = () => {
    scheduled = false;
    if (reduced.matches) {
      section.style.setProperty('--story-progress', '1');
      section.style.setProperty('--story-reveal', '1');
      return;
    }
    const rect = section.getBoundingClientRect();
    const distance = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp(-rect.top / distance, 0, 1);
    const reveal = clamp((progress - 0.28) / 0.35, 0, 1);
    section.style.setProperty('--story-progress', progress.toFixed(3));
    section.style.setProperty('--story-reveal', reveal.toFixed(3));
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  reduced.addEventListener('change', schedule);
  update();
})();
