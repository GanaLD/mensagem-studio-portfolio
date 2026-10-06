// The existing renderScroll owns all scroll progress. This module creates no scroll clock.
const hero = document.querySelector('#hero');
const stage = document.querySelector('#msUnifiedHeroStage');
const clamp = value => Math.max(0, Math.min(1, value));

if (hero && stage && !window.MSCasaHero) {
  const controlHint = matchMedia('(pointer: coarse)').matches
    ? 'Setas · andar · arraste para olhar'
    : 'W/A/S/D · andar · Shift · correr · arraste para olhar';
  const panel = document.createElement('div');
  panel.id = 'msCasaHeroPanel';
  panel.className = 'ms-casa-hero-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Explore a casa Mensagem Studio');
  panel.innerHTML = `
    <iframe id="msCasaHeroFrame" title="Casa Mensagem Studio — ambiente 3D interativo"
      data-src="./assets/casa-hero/index.html?embed=hero4" loading="eager"
      referrerpolicy="same-origin" tabindex="-1" aria-hidden="true"></iframe>
    <div id="msCasaHeroPrompt" class="ms-casa-hologram" hidden>
      <p>Explore o ambiente</p>
      <div class="ms-casa-hero-actions">
        <button id="msCasaHeroExplore" class="ms-casa-explore" type="button" disabled>Andar no ambiente</button>
        <button class="ms-casa-continue" type="button">Continuar pela página ↓</button>
      </div>
      <small class="ms-casa-controls-hint">${controlHint}</small>
      <small id="msCasaHeroLoading" class="ms-casa-loading">Preparando o ambiente…</small>
    </div>
    <div id="msCasaHeroToolbar" class="ms-casa-hologram ms-casa-explore-toolbar" hidden>
      <div class="ms-casa-hero-actions">
        <button id="msCasaHeroReturn" type="button">Voltar ao scroll</button>
        <button class="ms-casa-continue" type="button">Continuar pela página ↓</button>
      </div>
      <small class="ms-casa-controls-hint">${controlHint}</small>
    </div>`;
  stage.append(panel);

  const frame = panel.querySelector('#msCasaHeroFrame');
  const prompt = panel.querySelector('#msCasaHeroPrompt');
  const exploreButton = panel.querySelector('#msCasaHeroExplore');
  const toolbar = panel.querySelector('#msCasaHeroToolbar');
  const loading = panel.querySelector('#msCasaHeroLoading');
  const origin = location.origin;
  const state = {
    width: -1, height: -1, legacySpan: 1, legacyHeight: 1,
    legacyEnd: 0, end: 0, progress: 0, cameraProgress: 0, entryProgress: 0,
    active: false, exploring: false, ready: false, loaded: false,
  };
  let lastMessage = '';
  const entry = window.gsap?.timeline({paused: true}).fromTo(
    panel, {xPercent: 100}, {xPercent: 0, duration: 1, ease: 'none'}, 0,
  );

  function measureLegacy() {
    if (state.width === innerWidth && state.height === innerHeight) return;
    // Temporarily remove only our height extension to read the approved responsive layout.
    document.documentElement.classList.remove('ms-casa-hero-enabled');
    state.legacyHeight = hero.offsetHeight;
    state.legacySpan = Math.max(1, state.legacyHeight - innerHeight);
    document.documentElement.style.setProperty('--ms-legacy-hero-height', `${state.legacyHeight}px`);
    document.documentElement.classList.add('ms-casa-hero-enabled');
    state.width = innerWidth;
    state.height = innerHeight;
    // The appended scene moves downstream content; refresh the existing WordScroll only.
    window.ScrollTrigger?.refresh();
  }

  function postState(force = false) {
    if (!state.loaded || !frame.contentWindow) return;
    const message = {
      type: 'MS_CASA_HERO_STATE', progress: state.cameraProgress,
      active: state.active, explore: state.exploring,
    };
    const key = `${message.progress.toFixed(6)}:${message.active}:${message.explore}`;
    if (!force && key === lastMessage) return;
    frame.contentWindow.postMessage(message, origin);
    lastMessage = key;
  }

  function sync() {
    measureLegacy();
    const y = scrollY;
    state.legacyEnd = hero.offsetTop + state.legacySpan;
    state.end = hero.offsetTop + Math.max(1, hero.offsetHeight - innerHeight);
    const legacyProgress = clamp((y - hero.offsetTop) / state.legacySpan);
    if (!state.loaded && legacyProgress > .68) {
      state.loaded = true;
      frame.src = frame.dataset.src;
    }
    state.progress = clamp((y - state.legacyEnd) / Math.max(1, state.end - state.legacyEnd));
    state.active = y >= state.legacyEnd && y <= state.end;
    state.entryProgress = clamp(state.progress / .15);
    state.cameraProgress = clamp((state.progress - .15) / .73);
    if (!state.active || state.progress < .88) state.exploring = false;

    panel.hidden = !state.active;
    panel.setAttribute('aria-hidden', String(!state.active));
    if (entry) entry.progress(state.entryProgress, true);
    else panel.style.transform = `translateX(${(1 - state.entryProgress) * 100}%)`;
    stage.classList.toggle('is-casa-hero', state.active);
    stage.classList.toggle('is-casa-exploring', state.exploring);
    // The fixed stage was decorative before this scene added accessible controls.
    stage.setAttribute('aria-hidden', String(!state.active));
    prompt.hidden = !state.active || state.progress < .88 || state.exploring;
    toolbar.hidden = !state.exploring;
    exploreButton.disabled = !state.ready;
    loading.hidden = state.ready;
    frame.tabIndex = state.exploring ? 0 : -1;
    frame.setAttribute('aria-hidden', String(!state.exploring));
    postState();
  }

  function stopExploring() {
    state.exploring = false;
    sync();
    if (!prompt.hidden) exploreButton.focus({preventScroll: true});
  }

  function continuePage() {
    state.exploring = false;
    sync();
    window.scrollTo({top: state.end + Math.max(32, innerHeight * .12), behavior: 'smooth'});
  }

  exploreButton.addEventListener('click', () => {
    if (!state.active || state.progress < .88 || !state.ready) return;
    state.exploring = true;
    sync();
    frame.focus({preventScroll: true});
  });
  panel.querySelector('#msCasaHeroReturn').addEventListener('click', stopExploring);
  panel.querySelectorAll('.ms-casa-continue').forEach(button => button.addEventListener('click', continuePage));
  frame.addEventListener('load', () => postState(true));
  window.addEventListener('message', event => {
    if (event.source !== frame.contentWindow || event.origin !== origin) return;
    const data = event.data;
    if (!data || typeof data !== 'object') return;
    if (data.type === 'MS_CASA_HERO_READY') {
      state.ready = true;
      sync();
      postState(true);
    } else if (data.type === 'MS_CASA_HERO_EXIT') {
      stopExploring();
    } else if (data.type === 'MS_CASA_HERO_SCROLL' && state.exploring) {
      const deltaY = Number(data.deltaY);
      if (Number.isFinite(deltaY)) window.scrollBy({top: Math.max(-1600, Math.min(1600, deltaY)), behavior: 'instant'});
    }
  });

  window.MSCasaHero = {
    sync,
    get legacySpan() { measureLegacy(); return state.legacySpan; },
    metrics() {
      return {
        progress: state.progress, active: state.active, exploring: state.exploring,
        ready: state.ready, loaded: state.loaded,
        entryTransform: getComputedStyle(panel).transform,
        entryProgress: state.entryProgress, entryEngine: entry ? 'gsap' : 'css-fallback',
        legacySpan: state.legacySpan, legacyHeight: state.legacyHeight,
        legacyEnd: state.legacyEnd, end: state.end, cameraProgress: state.cameraProgress,
      };
    },
  };
  sync();
  // Fonts and the existing page modules can finish after the initial measurement.
  const refreshDownstream = () => window.ScrollTrigger?.refresh();
  document.fonts?.ready.then(refreshDownstream);
  window.addEventListener('load', refreshDownstream, {once: true});
}
