// Published Home — GSAP case 03: Motors Vans institutional / social media.
(() => {
  const panel = document.querySelector('#word .word-case-panel[data-word-case="2"]');
  const copy = document.querySelector('#word .word-case-copy[data-word-copy="2"]');
  if (!panel || !copy) return;

  const VIDEO = 'https://video.wixstatic.com/video/ef8a3a_cb8012857e1149e08ee02383f47e2fa3/file';
  const POSTER = 'https://static.wixstatic.com/media/ef8a3a_cb8012857e1149e08ee02383f47e2fa3f000.jpg/v1/fill/w_1900,h_1080,al_c/ef8a3a_cb8012857e1149e08ee02383f47e2fa3f000.jpg';

  panel.dataset.motorsVansCase = '2';
  panel.style.backgroundImage = `url('${POSTER}')`;

  const oldMedia = panel.querySelector('.word-case-media');
  let video = panel.querySelector('video.word-case-motors-vans');
  if (!video) {
    video = document.createElement('video');
    video.className = 'word-case-media word-case-video word-case-motors-vans';
    if (oldMedia) oldMedia.replaceWith(video);
    else panel.appendChild(video);
  }

  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.poster = POSTER;
  video.src = VIDEO;
  video.setAttribute('muted', '');
  video.setAttribute('autoplay', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('aria-label', 'Vídeo institucional Motors Vans');

  const tag = copy.querySelector('.word-top-label');
  const title = copy.querySelector('.word-main');
  const desc = copy.querySelector('.word-case-desc');
  if (tag) tag.textContent = 'CONTEÚDO INSTITUCIONAL';
  if (title) title.textContent = 'MOTORS VANS';
  if (desc) desc.textContent = 'Social media, banners, cards, carrosséis, Reels e campanhas digitais para marcas e empresas, com direção visual, conteúdo institucional e comunicação para redes sociais.';

  const forcePlay = () => {
    video.muted = true;
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };

  video.addEventListener('loadeddata', forcePlay);
  video.addEventListener('canplay', forcePlay);
  video.addEventListener('playing', () => {
    video.removeAttribute('poster');
    panel.style.backgroundImage = 'none';
  });
  video.addEventListener('error', () => {
    panel.style.backgroundImage = `url('${POSTER}')`;
  });

  try { video.load(); } catch (_) {}
  requestAnimationFrame(forcePlay);
  setTimeout(forcePlay, 180);
  setTimeout(forcePlay, 700);

  const activeObserver = new MutationObserver(() => {
    if (!document.hidden) forcePlay();
  });
  activeObserver.observe(panel, { attributes: true, attributeFilter: ['class', 'style'] });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else forcePlay();
  });
})();
