// Hero 4 production host: one scroll clock, gated visual readiness, deferred avatar.
const CASA_RELEASE = '20261014-mobile-stages-v4';
const hero = document.querySelector('#hero');
const stage = document.querySelector('#msUnifiedHeroStage');
const caseStage = document.querySelector('#heroCaseStage');
const clamp = value => Math.max(0, Math.min(1, value));
const mobileProfile = matchMedia('(max-width:760px), (pointer:coarse)').matches;

if (hero && stage && !window.MSCasaHero) {
  const controlHint = matchMedia('(pointer: coarse)').matches
    ? 'Setas · andar · segure Correr · Pular · Interagir · arraste para olhar'
    : 'W/A/S/D · andar · Shift · correr · Espaço · pular · E · interagir';
  const panel = document.createElement('div');
  panel.id = 'msCasaHeroPanel';
  panel.className = 'ms-casa-hero-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Explore a casa Mensagem Studio');
  panel.innerHTML = `
    <iframe id="msCasaHeroFrame" title="Casa Mensagem Studio — ambiente 3D interativo"
      data-src="./assets/casa-hero/index.html?embed=hero4&v=${CASA_RELEASE}" loading="eager"
      referrerpolicy="same-origin" tabindex="-1" aria-hidden="true"></iframe>
    <div id="msCasaHeroPrompt" class="ms-casa-hologram" hidden>
      <p>Ande no ambiente ou continue rolando</p>
      <div class="ms-casa-hero-actions">
        <button id="msCasaHeroExplore" class="ms-casa-explore" type="button" disabled>Andar no ambiente</button>
        <button class="ms-casa-continue" type="button">Continuar pela página ↓</button>
      </div>
      <small class="ms-casa-controls-hint">${controlHint}</small>
      <small id="msCasaHeroLoading" class="ms-casa-loading">Preparando personagem…</small>
    </div>
    <div id="msCasaHeroToolbar" class="ms-casa-hologram ms-casa-explore-toolbar" hidden>
      <div class="ms-casa-hero-actions">
        <button id="msCasaHeroReturn" type="button">Voltar ao scroll</button>
        <button class="ms-casa-continue" type="button">Continuar pela página ↓</button>
      </div>
      <small class="ms-casa-controls-hint">${controlHint}</small>
    </div>`;
  stage.append(panel);

  const gate = document.createElement('div');
  gate.id = 'msCasaHeroGate';
  gate.className = 'ms-casa-hologram ms-casa-load-gate';
  gate.hidden = true;
  gate.innerHTML = '<p>Preparando próximo ambiente</p><small id="msCasaHeroGateText" class="ms-casa-loading" role="status" aria-live="polite">Carregando ambiente… 0%</small><div class="ms-casa-hero-actions"><button id="msCasaHeroSkipLoad" type="button">Continuar pela página ↓</button><button id="msCasaHeroRetry" type="button" hidden>Tentar novamente</button></div>';
  stage.append(gate);

  const frame = panel.querySelector('#msCasaHeroFrame');
  const prompt = panel.querySelector('#msCasaHeroPrompt');
  const exploreButton = panel.querySelector('#msCasaHeroExplore');
  const toolbar = panel.querySelector('#msCasaHeroToolbar');
  const loading = panel.querySelector('#msCasaHeroLoading');
  const gateText = gate.querySelector('#msCasaHeroGateText');
  const origin = location.origin;
  const state = {
    width: -1, height: -1, legacySpan: 1, legacyHeight: 1,
    legacyEnd: 0, end: 0, progress: 0, cameraProgress: 0, entryProgress: 0,
    active: false, exploring: false, ready: false, visualReady: false, loaded: false,
    loadPhase: 'environment', loadProgress: 0, loadLabel: 'Carregando ambiente…',
    loadingBypassed: false, error: false, cinematicOnly: false,
  };
  let lastMessage = '';
  let correctingScroll = false;
  let pendingScroll = null;
  let previousY = scrollY;
  const entry = window.gsap?.timeline({paused: true}).fromTo(
    panel, {xPercent: 100}, {xPercent: 0, duration: 1, ease: 'none'}, 0,
  );

  function hardScrollTo(top) {
    if (correctingScroll) { pendingScroll = top; return; }
    correctingScroll = true;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({top, left: 0, behavior: 'instant'});
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previous;
      correctingScroll = false;
      if (pendingScroll !== null) { const next = pendingScroll; pendingScroll = null; hardScrollTo(next); }
    });
  }

  function viewportHeight() {
    if (mobileProfile && state.height > 0 && Math.abs(innerWidth - state.width) < 24) return state.height;
    return innerHeight;
  }

  function measureLegacy() {
    const nextHeight = viewportHeight();
    if (state.width === innerWidth && state.height === nextHeight) return;
    document.documentElement.classList.remove('ms-casa-hero-enabled');
    state.legacyHeight = hero.offsetHeight;
    state.legacySpan = Math.max(1, state.legacyHeight - nextHeight);
    document.documentElement.style.setProperty('--ms-legacy-hero-height', `${state.legacyHeight}px`);
    document.documentElement.classList.add('ms-casa-hero-enabled');
    state.width = innerWidth;
    state.height = nextHeight;
    window.ScrollTrigger?.refresh();
  }

  function updateLoadText() {
    const progress = Math.max(0, Math.min(100, Math.round(state.loadProgress)));
    if (state.loadPhase === 'player') {
      loading.textContent = state.ready ? '' : `${state.loadLabel || 'Preparando personagem…'} ${progress}%`;
    }
    gateText.textContent = state.error ? 'O ambiente não pôde ser preparado. Você pode tentar novamente ou seguir pela página.' : `${state.loadLabel || 'Carregando ambiente…'} ${progress}%`;
  }

  function postState(force = false) {
    if (!state.loaded || !state.visualReady || !frame.contentWindow) return;
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
    const currentY = scrollY;
    state.legacyEnd = hero.offsetTop + state.legacySpan;
    state.end = hero.offsetTop + Math.max(1, hero.offsetHeight - viewportHeight());
    const legacyProgress = clamp((currentY - hero.offsetTop) / state.legacySpan);
    const preloadThreshold = mobileProfile ? .24 : .55;
    if (!state.loaded && (caseStage?.classList.contains('live') || legacyProgress > preloadThreshold)) {
      state.loaded = true;
      frame.src = frame.dataset.src;
    }

    let y = currentY;
    if (currentY < state.legacyEnd - 32) state.loadingBypassed = false;
    const insideHero4 = currentY > state.legacyEnd && currentY <= state.end;
    const crossedPending = previousY <= state.legacyEnd && currentY > state.legacyEnd;
    const notebookPending = window.MSCenaHero && !window.MSCenaHero.ready && !window.MSCenaHero.bypassed;
    if (!state.visualReady && !state.loadingBypassed && !notebookPending && (insideHero4 || crossedPending)) {
      hardScrollTo(state.legacyEnd);
      y = state.legacyEnd;
    }
    previousY = y;

    state.progress = state.visualReady ? clamp((y - state.legacyEnd) / Math.max(1, state.end - state.legacyEnd)) : 0;
    state.active = state.visualReady && y >= state.legacyEnd && y <= state.end;
    state.entryProgress = state.visualReady ? clamp(state.progress / .15) : 0;
    state.cameraProgress = state.visualReady ? clamp((state.progress - .15) / .73) : 0;
    if (!state.active || state.progress < .88) state.exploring = false;

    const waitingAtGate = state.loaded && !state.visualReady && !state.loadingBypassed && y >= state.legacyEnd - 2 && y <= state.end;
    gate.hidden = !waitingAtGate;
    gate.querySelector('#msCasaHeroRetry').hidden = !state.error;
    const preloading = state.loaded && !state.visualReady && !state.error;
    panel.hidden = !state.active && !preloading;
    panel.classList.toggle('is-preloading', preloading);
    panel.setAttribute('aria-hidden', String(!state.active));
    if (entry) entry.progress(state.entryProgress, true);
    else panel.style.transform = `translateX(${(1 - state.entryProgress) * 100}%)`;
    stage.classList.toggle('is-casa-hero', state.active);
    stage.classList.toggle('is-casa-exploring', state.exploring);
    stage.setAttribute('aria-hidden', String(!state.active && !waitingAtGate));
    prompt.hidden = !state.active || state.progress < .88 || state.exploring;
    toolbar.hidden = !state.exploring;
    exploreButton.hidden = state.cinematicOnly;
    prompt.querySelector('p').textContent = state.cinematicOnly ? 'Continue rolando para conhecer mais' : 'Ande no ambiente ou continue rolando';
    prompt.querySelector('.ms-casa-controls-hint').hidden = state.cinematicOnly;
    exploreButton.disabled = !state.ready;
    loading.hidden = state.ready;
    frame.tabIndex = state.exploring ? 0 : -1;
    frame.setAttribute('aria-hidden', String(!state.exploring));
    updateLoadText();
    postState();
  }

  function stopExploring() {
    state.exploring = false;
    sync();
    if (!prompt.hidden) exploreButton.focus({preventScroll: true});
  }

  function continuePage() {
    state.exploring = false;
    if (!state.visualReady) {
      state.loadingBypassed = true;
      hardScrollTo(state.end + Math.max(32, viewportHeight() * .12));
      sync();
      return;
    }
    sync();
    window.scrollTo({top: state.end + Math.max(32, viewportHeight() * .12), behavior: 'smooth'});
  }

  exploreButton.addEventListener('click', () => {
    if (!state.active || state.progress < .88 || !state.ready || state.cinematicOnly) return;
    state.exploring = true;
    sync();
    frame.focus({preventScroll: true});
  });
  panel.querySelector('#msCasaHeroReturn').addEventListener('click', stopExploring);
  panel.querySelectorAll('.ms-casa-continue').forEach(button => button.addEventListener('click', continuePage));
  gate.querySelector('#msCasaHeroSkipLoad').addEventListener('click', continuePage);
  gate.querySelector('#msCasaHeroRetry').addEventListener('click', () => {
    state.error = false;state.ready = false;state.visualReady = false;state.loadPhase = 'environment';state.loadProgress = 0;state.loadLabel = 'Carregando ambiente…';state.loadingBypassed = false;state.cinematicOnly = false;
    frame.src = frame.dataset.src;lastMessage = '';sync();
  });
  frame.addEventListener('load', () => { updateLoadText(); postState(true); });
  const primeFilm = () => {
    if (mobileProfile && state.loaded) frame.contentWindow?.postMessage({type:'MS_CASA_HERO_PRIME'}, origin);
  };
  window.addEventListener('touchstart', primeFilm, {passive:true});
  window.addEventListener('pointerdown', primeFilm, {passive:true});
  window.addEventListener('message', event => {
    if (event.source !== frame.contentWindow || event.origin !== origin) return;
    const data = event.data;
    if (!data || typeof data !== 'object') return;
    if (data.type === 'MS_CASA_HERO_CAPABILITIES') {
      state.cinematicOnly = data.cinematicOnly === true;sync();
    } else if (data.type === 'MS_CASA_HERO_LOAD') {
      state.loadPhase = data.phase === 'player' ? 'player' : 'environment';
      state.loadProgress = clamp(Number(data.progress) / 100) * 100;
      state.loadLabel = typeof data.label === 'string' && data.label ? data.label : (state.loadPhase === 'player' ? 'Preparando personagem…' : 'Carregando ambiente…');
      updateLoadText();
    } else if (data.type === 'MS_CASA_HERO_VISUAL_READY') {
      measureLegacy();
      if (scrollY >= state.legacyEnd - 1 && scrollY <= state.end) hardScrollTo(state.legacyEnd);
      state.visualReady = true;
      state.loadPhase = 'environment';
      state.loadProgress = 100;
      state.loadLabel = 'Ambiente pronto ·';
      sync();
      postState(true);
    } else if (data.type === 'MS_CASA_HERO_READY') {
      state.ready = true;
      state.loadPhase = 'player';
      state.loadProgress = 100;
      state.loadLabel = 'Personagem pronto ·';
      sync();
      postState(true);
    } else if (data.type === 'MS_CASA_HERO_ERROR') {
      state.error = true;state.visualReady = false;state.ready = false;state.exploring = false;sync();
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
        ready: state.ready, visualReady: state.visualReady, loaded: state.loaded,
        loadPhase: state.loadPhase, loadProgress: state.loadProgress, error: state.error, loadingBypassed: state.loadingBypassed, cinematicOnly: state.cinematicOnly,
        entryTransform: getComputedStyle(panel).transform,
        entryProgress: state.entryProgress, entryEngine: entry ? 'gsap' : 'css-fallback',
        legacySpan: state.legacySpan, legacyHeight: state.legacyHeight,
        legacyEnd: state.legacyEnd, end: state.end, cameraProgress: state.cameraProgress,
      };
    },
  };
  sync();
  const refreshDownstream = () => window.ScrollTrigger?.refresh();
  document.fonts?.ready.then(refreshDownstream);
  window.addEventListener('load', refreshDownstream, {once: true});
}
