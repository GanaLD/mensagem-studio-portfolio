// Published Home — GSAP case 03: Motors Vans institutional / social media.
(() => {
  const panel = document.querySelector('#word .word-case-panel[data-word-case="2"]');
  const copy = document.querySelector('#word .word-case-copy[data-word-copy="2"]');
  if (!panel || !copy || panel.dataset.motorsVansCase === '1') return;

  const VIDEO = 'https://video.wixstatic.com/video/ef8a3a_cb8012857e1149e08ee02383f47e2fa3/1080p/mp4/file.mp4';
  const POSTER = 'https://static.wixstatic.com/media/ef8a3a_cb8012857e1149e08ee02383f47e2fa3f000.jpg/v1/fill/w_1900,h_1080,al_c/ef8a3a_cb8012857e1149e08ee02383f47e2fa3f000.jpg';

  panel.dataset.motorsVansCase = '1';
  panel.style.backgroundImage = `url('${POSTER}')`;

  const oldMedia = panel.querySelector('.word-case-media');
  const video = document.createElement('video');
  video.className = 'word-case-media word-case-video word-case-motors-vans';
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.poster = POSTER;
  video.src = VIDEO;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('aria-label', 'Vídeo institucional Motors Vans');
  if (oldMedia) oldMedia.replaceWith(video);
  else panel.appendChild(video);

  const tag = copy.querySelector('.word-top-label');
  const title = copy.querySelector('.word-main');
  const desc = copy.querySelector('.word-case-desc');
  if (tag) tag.textContent = 'CONTEÚDO INSTITUCIONAL';
  if (title) title.textContent = 'SOCIAL MEDIA';
  if (desc) desc.textContent = 'Social media para marcas e empresas com criação de banners, cards, carrosséis, Reels, campanhas digitais e conteúdo institucional para fortalecer presença, comunicação e posicionamento online.';

  const syncPlayback = () => {
    const active = panel.classList.contains('is-active');
    if (active) {
      const play = video.play();
      if (play && typeof play.catch === 'function') play.catch(() => {});
    } else {
      video.pause();
    }
  };

  const observer = new MutationObserver(syncPlayback);
  observer.observe(panel, { attributes: true, attributeFilter: ['class'] });
  syncPlayback();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else syncPlayback();
  });
})();
