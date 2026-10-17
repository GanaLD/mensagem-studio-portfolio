// Hero 4 production host: one scroll clock, gated visual readiness, deferred avatar.
const CASA_RELEASE = '20261017-house-navigation-v1';
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
      referrerpolicy="same-origin" allow="autoplay" tabindex="-1" aria-hidden="true"></iframe>
    <div id="msCasaHeroPrompt" class="ms-casa-hologram" hidden>
      <p>Ande no ambiente ou continue rolando</p>
      <div class="ms-casa-hero-actions">
        <button id="msCasaHeroExplore" class="ms-casa-explore" type="button" disabled>Andar no ambiente</button>
        <button id="msCasaHeroRetryPlayer" type="button" hidden>Tentar personagem novamente</button>
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
  gate.innerHTML = '<p>Preparando próximo ambiente</p><small id="msCasaHeroGateText" class="ms-casa-loading" role="status" aria-live="polite">Carregando ambiente… 0%</small><div class="ms-casa-hero-actions"><button id="msCasaHeroStart" type="button" hidden>Iniciar passeio</button><button id="msCasaHeroSkipLoad" type="button">Continuar pela página ↓</button><button id="msCasaHeroRetry" type="button" hidden>Tentar novamente</button></div>';
  stage.append(gate);

  const frame = panel.querySelector('#msCasaHeroFrame');
  const prompt = panel.querySelector('#msCasaHeroPrompt');
  const exploreButton = panel.querySelector('#msCasaHeroExplore');
  const retryPlayerButton = panel.querySelector('#msCasaHeroRetryPlayer');
  const toolbar = panel.querySelector('#msCasaHeroToolbar');
  const loading = panel.querySelector('#msCasaHeroLoading');
  const gateText = gate.querySelector('#msCasaHeroGateText');
  const origin = location.origin;
  const state = {
    width: -1, height: -1, legacySpan: 1, legacyHeight: 1,
    legacyEnd: 0, end: 0, progress: 0, cameraProgress: 0, entryProgress: 0,
    active: false, exploring: false, ready: false, visualReady: false, loaded: false,
    loadPhase: 'environment', loadProgress: 0, loadLabel: 'Carregando ambiente…',
    loadingBypassed: false, error: false, playerError: false, cinematicOnly: false, gestureRequired: false,
    entryShown: false, entryHolding: false, entrySettling: false,
  };
  let lastMessage = '';
  let previousY = scrollY, lastForwardInput = -Infinity, entryReleaseTimer = 0;
  let entryReleaseAfter = 0, entryReleaseDeadline = 0, touchY = null;
  const entry = window.gsap?.timeline({paused: true}).fromTo(
    panel, {xPercent: 100}, {xPercent: 0, duration: 1, ease: 'none'}, 0,
  );

  function hardScrollTo(top) {
    if (Math.abs(scrollY - top) < .5) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({top, left: 0, behavior: 'instant'});
    root.style.scrollBehavior = previous;
  }

  function releaseEntryHold() {
    clearTimeout(entryReleaseTimer);
    state.entryHolding = false;
    state.entrySettling = false;
  }

  function scheduleEntryRelease() {
    if (!state.entrySettling) return;
    clearTimeout(entryReleaseTimer);
    const releaseAt = Math.min(entryReleaseDeadline, Math.max(entryReleaseAfter, lastForwardInput + 120));
    entryReleaseTimer = setTimeout(() => { releaseEntryHold(); sync(); }, Math.max(0, releaseAt - performance.now()));
  }

  function presentEntry() {
    state.entryShown = true;
    state.entrySettling = true;
    const now = performance.now();
    // Paint the opening pose and discard the tail of the loading gesture.
    // Continuous input can resume after this short, bounded handoff.
    entryReleaseAfter = now + 180;
    entryReleaseDeadline = now + 420;
    scheduleEntryRelease();
  }

  function trackEntryInput(event, delta) {
    if (!Number.isFinite(delta) || delta === 0) return;
    if (delta < 0) { releaseEntryHold(); return; }
    lastForwardInput = performance.now();
    if (state.entryHolding && !state.error && !state.loadingBypassed && scrollY >= state.legacyEnd - 1) {
      if (event.cancelable) event.preventDefault();
      scheduleEntryRelease();
    }
  }
  addEventListener('wheel', event => trackEntryInput(event, event.deltaY), {passive: false, capture: true});
  addEventListener('touchstart', event => { touchY = event.touches.length === 1 ? event.touches[0].clientY : null; }, {passive: true});
  addEventListener('touchmove', event => {
    if (event.touches.length !== 1) { touchY = null; return; }
    const nextY = event.touches[0].clientY;
    if (touchY !== null) trackEntryInput(event, touchY - nextY);
    touchY = nextY;
  }, {passive: false, capture: true});
  addEventListener('touchend', () => { touchY = null; scheduleEntryRelease(); }, {passive: true});
  addEventListener('click', event => {
    const link = event.target.closest?.('a[href^="#"]');
    if (!link || (link.target && link.target !== '_self')) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(link.hash.slice(1))); } catch { return; }
    if (target && scrollY + target.getBoundingClientRect().top > state.end) {
      releaseEntryHold();
      state.loadingBypassed = true;
    }
  }, {capture: true});

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
      loading.textContent = state.playerError ? 'O personagem não pôde ser preparado. Você pode tentar novamente ou continuar pela página.' : state.ready ? '' : `${state.loadLabel || 'Preparando personagem…'} ${progress}%`;
    }
    gateText.textContent = state.error ? 'O ambiente não pôde ser preparado. Você pode tentar novamente ou seguir pela página.' : state.gestureRequired ? 'Toque em Iniciar passeio para liberar o vídeo neste navegador.' : `${state.loadLabel || 'Carregando ambiente…'} ${progress}%`;
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
    const characterTiming = window.MSCase3Scroll?.metrics?.();
    const preloadReady = characterTiming
      ? (characterTiming.ready || characterTiming.bypassed) && currentY >= characterTiming.start + characterTiming.characterSpan * .8
      : caseStage?.classList.contains('live') || legacyProgress > preloadThreshold;
    if (!state.loaded && (preloadReady || (currentY >= state.legacyEnd && currentY <= state.end))) {
      state.loaded = true;
      frame.src = frame.dataset.src;
    }

    let y = currentY;
    if (currentY < state.legacyEnd - 32 && previousY >= state.legacyEnd - 32) state.loadingBypassed = false;
    if (currentY < state.legacyEnd - 1 || state.error || state.loadingBypassed) releaseEntryHold();
    const insideHouse = currentY >= state.legacyEnd && currentY <= state.end;
    const crossedEntry = previousY < state.legacyEnd && currentY > state.legacyEnd && performance.now() - lastForwardInput < 1000;
    if (!state.entryShown && !state.error && !state.loadingBypassed && (insideHouse || crossedEntry)) state.entryHolding = true;
    if (state.entryHolding && !state.error && !state.loadingBypassed && currentY >= state.legacyEnd - 1) {
      hardScrollTo(state.legacyEnd);
      y = state.legacyEnd;
      if (state.visualReady && !state.entryShown) presentEntry();
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
    gate.querySelector('#msCasaHeroStart').hidden = !state.gestureRequired || state.error;
    const preloading = state.loaded && !state.visualReady && !state.error;
    panel.hidden = !state.active && !preloading;
    panel.classList.toggle('is-preloading', preloading);
    panel.setAttribute('aria-hidden', String(!state.active));
    if (entry) entry.progress(state.entryProgress, true);
    else panel.style.transform = `translateX(${(1 - state.entryProgress) * 100}%)`;
    stage.classList.toggle('is-casa-hero', state.active);
    stage.classList.toggle('is-casa-range', y >= state.legacyEnd && y <= state.end);
    stage.classList.toggle('is-casa-exploring', state.exploring);
    stage.setAttribute('aria-hidden', String(!state.active && !waitingAtGate));
    prompt.hidden = !state.active || state.progress < .88 || state.exploring;
    toolbar.hidden = !state.exploring;
    exploreButton.hidden = state.cinematicOnly;
    retryPlayerButton.hidden = !state.playerError || state.cinematicOnly;
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
    releaseEntryHold();
    state.loadingBypassed = true;
    state.exploring = false;
    if (!state.visualReady) {
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
  retryPlayerButton.addEventListener('click', () => {
    state.playerError = false;state.loadPhase = 'player';state.loadProgress = 0;state.loadLabel = 'Preparando personagem…';
    frame.contentWindow?.postMessage({type: 'MS_CASA_HERO_RETRY_PLAYER'}, origin);
    sync();
  });
  panel.querySelectorAll('.ms-casa-continue').forEach(button => button.addEventListener('click', continuePage));
  gate.querySelector('#msCasaHeroSkipLoad').addEventListener('click', continuePage);
  gate.querySelector('#msCasaHeroRetry').addEventListener('click', () => {
    releaseEntryHold();
    state.error = false;state.playerError = false;state.ready = false;state.visualReady = false;state.loadPhase = 'environment';state.loadProgress = 0;state.loadLabel = 'Carregando ambiente…';state.loadingBypassed = false;state.cinematicOnly = false;state.gestureRequired = false;
    frame.src = frame.dataset.src;lastMessage = '';sync();
  });
  frame.addEventListener('load', () => { updateLoadText(); postState(true); });
  const primeFilm = event => {
    if (!mobileProfile || !state.loaded || state.visualReady || state.error) return;
    // Invoke the same-origin child during the actual tap, before returning to
    // the event loop. An asynchronous message cannot carry Safari's gesture.
    try {
      const cinematic = frame.contentWindow?.__houseCinematic;
      if (typeof cinematic?.prime === 'function') { cinematic.prime({fromGesture:event?.isTrusted === true}); return; }
    } catch {}
    frame.contentWindow?.postMessage({type:'MS_CASA_HERO_PRIME'}, origin);
  };
  gate.querySelector('#msCasaHeroStart').addEventListener('click', primeFilm);
  window.addEventListener('touchend', primeFilm, {passive:true});
  window.addEventListener('pointerup', primeFilm, {passive:true});
  window.addEventListener('click', primeFilm, {passive:true});
  window.addEventListener('message', event => {
    if (event.source !== frame.contentWindow || event.origin !== origin) return;
    const data = event.data;
    if (!data || typeof data !== 'object') return;
    if (data.type === 'MS_CASA_HERO_CAPABILITIES') {
      state.cinematicOnly = data.cinematicOnly === true;sync();
    } else if (data.type === 'MS_CASA_HERO_MEDIA_BLOCKED') {
      state.gestureRequired = data.gestureRequired === true;sync();
    } else if (data.type === 'MS_CASA_HERO_LOAD') {
      state.loadPhase = data.phase === 'player' ? 'player' : 'environment';
      state.loadProgress = clamp(Number(data.progress) / 100) * 100;
      state.loadLabel = typeof data.label === 'string' && data.label ? data.label : (state.loadPhase === 'player' ? 'Preparando personagem…' : 'Carregando ambiente…');
      updateLoadText();
    } else if (data.type === 'MS_CASA_HERO_VISUAL_READY') {
      measureLegacy();
      state.visualReady = true;
      state.error = false;
      state.gestureRequired = false;
      state.loadPhase = 'environment';
      state.loadProgress = 100;
      state.loadLabel = 'Ambiente pronto ·';
      sync();
      postState(true);
    } else if (data.type === 'MS_CASA_HERO_READY') {
      state.ready = true;
      state.playerError = false;
      state.gestureRequired = false;
      state.loadPhase = 'player';
      state.loadProgress = 100;
      state.loadLabel = 'Personagem pronto ·';
      sync();
      postState(true);
    } else if (data.type === 'MS_CASA_HERO_PLAYER_ERROR') {
      state.playerError = true;state.ready = false;state.exploring = false;state.loadPhase = 'player';sync();
    } else if (data.type === 'MS_CASA_HERO_ERROR') {
      releaseEntryHold();
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
        loadPhase: state.loadPhase, loadProgress: state.loadProgress, error: state.error, playerError: state.playerError, loadingBypassed: state.loadingBypassed, cinematicOnly: state.cinematicOnly, gestureRequired: state.gestureRequired,
        entryShown: state.entryShown, entryHolding: state.entryHolding, entrySettling: state.entrySettling,
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
