/* Desktop keeps the full ambient video. Mobile uses the lightweight poster
   and a compositor-only drift animation to avoid video decoding during audits. */
(() => {
  const slot = document.querySelector('.hero-full .liquid-ether[data-ambient-video]');
  if (!slot || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const desktop = matchMedia('(min-width: 901px) and (pointer: fine)');
  let video = null;
  const sync = () => {
    if (!desktop.matches) {
      if (video) { video.pause(); video.remove(); video = null; }
      return;
    }
    if (document.hidden) { if (video) video.pause(); return; }
    if (!video) {
      video = document.createElement('video');
      video.className = 'liquid-ether__video';
      video.setAttribute('aria-hidden', 'true');
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.poster = '/img/hero-video-poster.webp';
      video.src = slot.dataset.ambientVideo;
      slot.appendChild(video);
    }
    const result = video.play();
    if (result && typeof result.catch === 'function') result.catch(() => {});
  };
  desktop.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
})();
