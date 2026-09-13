// HERO hotfix — card 03 Dermacast timing + card 04 Mago showcase.
(() => {
  const num = document.querySelector('#heroNum');
  const fullMedia = document.querySelector('#heroFullMedia');
  const fullVideo = document.querySelector('#heroFullVideo');
  const fullYouTube = document.querySelector('#heroFullYouTube');
  if (!num || !fullMedia || !fullVideo || !fullYouTube) return;

  const MAGO_ID = 'G_2jdXfXxiI';
  const MAGO_SRC = `https://www.youtube.com/embed/${MAGO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${MAGO_ID}&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`;
  const DERMACAST_START = 7.20;
  const DERMACAST_END = 7.80;

  function applyHeroFix() {
    const state = num.textContent.trim();

    if (state.startsWith('03')) {
      fullVideo.dataset.segmentStart = String(DERMACAST_START);
      fullVideo.dataset.segmentEnd = String(DERMACAST_END);
      if (fullVideo.readyState >= 1 && (fullVideo.currentTime < DERMACAST_START || fullVideo.currentTime >= DERMACAST_END)) {
        try { fullVideo.currentTime = DERMACAST_START; } catch (_) {}
      }
      const p = fullVideo.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }

    if (state.startsWith('04')) {
      if (fullYouTube.getAttribute('src') !== MAGO_SRC) fullYouTube.setAttribute('src', MAGO_SRC);
      fullMedia.classList.add('is-active', 'is-youtube');
      fullMedia.classList.remove('is-image', 'is-video');
    }
  }

  fullVideo.addEventListener('timeupdate', () => {
    if (!num.textContent.trim().startsWith('03')) return;
    if (fullVideo.currentTime >= DERMACAST_END || fullVideo.currentTime < DERMACAST_START - .2) {
      try { fullVideo.currentTime = DERMACAST_START; } catch (_) {}
    }
  });

  new MutationObserver(applyHeroFix).observe(num, { childList: true, characterData: true, subtree: true });
  addEventListener('scroll', applyHeroFix, { passive: true });
  applyHeroFix();
})();
