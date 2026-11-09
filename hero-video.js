/* Defer ambient video decoding until after the hero has painted. */
(() => {
  const video = document.querySelector('.hero-full .liquid-ether__video');
  if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const start = () => {
    if (document.visibilityState !== 'visible') return;
    video.preload = 'auto';
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
  };
  const schedule = () => window.setTimeout(start, 1800);
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, {once:true});
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (video.readyState >= 2) video.play().catch(() => {});
  });
})();
