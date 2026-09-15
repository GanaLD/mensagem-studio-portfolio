// HERO hotfix — card 03 Dermacast >1min + card 04 Mago showcase.
(() => {
  const num = document.querySelector('#heroNum');
  const fullMedia = document.querySelector('#heroFullMedia');
  const fullVideo = document.querySelector('#heroFullVideo');
  const fullYouTube = document.querySelector('#heroFullYouTube');
  if (!num || !fullMedia || !fullYouTube) return;

  const DERMACAST_ID = 'VPt2sTzluzc';
  const DERMACAST_SRC = 'https://www.youtube.com/embed/' + DERMACAST_ID + '?autoplay=1&mute=1&controls=0&loop=1&playlist=' + DERMACAST_ID + '&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&start=65&end=78';
  const MAGO_ID = 'G_2jdXfXxiI';
  const MAGO_SRC = 'https://www.youtube.com/embed/' + MAGO_ID + '?autoplay=1&mute=1&controls=0&loop=1&playlist=' + MAGO_ID + '&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3';

  function forceYouTube(src) {
    if (fullVideo) fullVideo.pause();
    if (fullYouTube.getAttribute('src') !== src) fullYouTube.setAttribute('src', src);
    fullMedia.classList.add('is-active', 'is-youtube');
    fullMedia.classList.remove('is-image', 'is-video');
  }

  function applyHeroFix() {
    const state = num.textContent.trim();
    if (state.startsWith('03')) forceYouTube(DERMACAST_SRC);
    if (state.startsWith('04')) forceYouTube(MAGO_SRC);
  }

  new MutationObserver(applyHeroFix).observe(num, { childList: true, characterData: true, subtree: true });
  applyHeroFix();
})();
