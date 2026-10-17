// Published Home — GSAP case 03: Motors Vans institutional / social media.
(() => {
  const panel = document.querySelector('#word .word-case-panel[data-word-case="2"]');
  const copy = document.querySelector('#word .word-case-copy[data-word-copy="2"]');
  if (!panel || !copy) return;

  const VIDEO = 'https://video.wixstatic.com/video/ef8a3a_cb8012857e1149e08ee02383f47e2fa3/file';
  const POSTER = 'https://static.wixstatic.com/media/ef8a3a_cb8012857e1149e08ee02383f47e2fa3f000.jpg/v1/fill/w_1900,h_1080,al_c/ef8a3a_cb8012857e1149e08ee02383f47e2fa3f000.jpg';

  panel.dataset.motorsVansCase = '3';
  panel.dataset.backgroundImage = `url('${POSTER}')`;

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
  video.autoplay = false;
  video.playsInline = true;
  video.preload = 'none';
  video.dataset.src = VIDEO;
  video.setAttribute('muted', '');
  video.removeAttribute('autoplay');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('aria-label', 'Vídeo institucional Motors Vans');

  const tag = copy.querySelector('.word-top-label');
  const title = copy.querySelector('.word-main');
  const desc = copy.querySelector('.word-case-desc');
  if (tag) tag.textContent = 'SOCIAL MEDIA';
  if (title) title.textContent = 'CONTEÚDO INSTITUCIONAL';
  if (desc) desc.textContent = 'Social media, banners, cards, carrosséis, reels e campanhas digitais para marcas e empresas, com direção visual, conteúdo institucional e comunicação para redes sociais.';

  let nearWord = false;
  let scheduled = 0;
  const hydrate = () => {
    if (video.getAttribute('src')) return;
    video.poster = POSTER;
    panel.style.backgroundImage = panel.dataset.backgroundImage;
    video.preload = 'auto';
    video.src = video.dataset.src;
    try { video.load(); } catch (_) {}
  };
  const isActiveCase = () => {
    const rect = panel.getBoundingClientRect();
    return rect.top < innerHeight && rect.bottom > 0 && rect.left <= innerWidth * .5 && rect.right >= innerWidth * .5;
  };
  const forcePlay = () => {
    if (document.hidden || !nearWord || !isActiveCase()) { video.pause(); return; }
    hydrate();
    video.muted = true;
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };

  video.addEventListener('loadeddata', forcePlay);
  video.addEventListener('canplay', forcePlay);
  video.addEventListener('playing', () => {
    if (document.hidden || !nearWord || !isActiveCase()) { video.pause(); return; }
    video.removeAttribute('poster');
    panel.style.backgroundImage = 'none';
  });
  video.addEventListener('error', () => {
    panel.style.backgroundImage = `url('${POSTER}')`;
  });

  const schedule = () => {
    if (scheduled) return;
    scheduled = requestAnimationFrame(() => { scheduled = 0; forcePlay(); });
  };
  const section = panel.closest('#word');
  const nearObserver = new IntersectionObserver(entries => {
    nearWord = entries.some(entry => entry.isIntersecting);
    if (nearWord) hydrate();
    schedule();
  }, {rootMargin: '1800px 0px', threshold: .01});
  nearObserver.observe(section);
  const activeObserver = new MutationObserver(schedule);
  activeObserver.observe(panel, { attributes: true, attributeFilter: ['class', 'style'] });
  const track = panel.parentElement;
  if (track) activeObserver.observe(track, {attributes: true, attributeFilter: ['style']});
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule, {passive: true});

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else schedule();
  });
  addEventListener('pagehide', () => {
    video.pause(); nearObserver.disconnect(); activeObserver.disconnect();
    if (scheduled) cancelAnimationFrame(scheduled);
  }, {once: true});
})();
