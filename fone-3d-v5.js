(() => {
  const section = document.getElementById('three');
  const stageMain = section?.querySelector('.stage-main');
  const sidebar = section?.querySelector('.three-sidebar');
  const tabs = document.getElementById('modelTabs');
  const oldViewer = document.getElementById('modelViewer3D');
  const stageNote = section?.querySelector('.stage-note-3d');
  if (!section || !stageMain || !sidebar || !tabs || !oldViewer) return;

  const BUILD = '20260926-isolated-viewer-v5';
  const FONE_SRC = 'https://mensagem-studio-3d-assets.floot.app/_api/fone-glb';
  const FONE_DURATION = 48;
  const PLAYBACK_SPEED = 2;

  // IMPORTANT: Black Skull front label is 0deg in this GLB. 180deg is the nutrition/back panel.
  const FRAMING = {
    'fone-tune': ['0deg', '78deg', '135%', '28deg'],
    'black-skull-creatine-v2': ['0deg', '75deg', '103%', '28deg'],
    'arma-cyberpunk': ['0deg', '75deg', '103%', '28deg'],
    'arma-cyberpunk-v2': ['0deg', '75deg', '103%', '28deg'],
    'rejuvital': ['180deg', '75deg', '92%', '25deg'],
    'rejuvital-4ml': ['180deg', '75deg', '92%', '25deg'],
    'arencia-cleansing-balm': ['25deg', '68deg', '118%', '28deg']
  };

  section.dataset.threePreviewBuild = BUILD;
  const intro = section.querySelector('.three-intro-copy');
  if (intro) intro.textContent = 'Ambientes e produtos em 3D para explorar diretamente na página. Abra a lista, escolha um modelo e interaja diretamente no viewer.';

  const icon = (name) => {
    const attrs = 'viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    const paths = {
      play: '<path d="m8 5 11 7-11 7V5Z"/>',
      pause: '<path d="M8 5v14M16 5v14"/>',
      rotate: '<path d="M3 12a9 9 0 0 1 15.2-6.5L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.2 6.5L3 16"/><path d="M3 21v-5h5"/>',
      chevron: '<path d="m6 9 6 6 6-6"/>'
    };
    return `<svg ${attrs}>${paths[name] || paths.chevron}</svg>`;
  };

  // Preserve current assets, but make the headphone a real first item in the DOM.
  [...tabs.querySelectorAll('button[data-model]')].forEach((button) => {
    if (!button.dataset.label) button.dataset.label = button.textContent.trim();
    button.classList.remove('active');
  });

  let foneButton = tabs.querySelector('button[data-model="fone-tune"]');
  if (!foneButton) {
    foneButton = document.createElement('button');
    foneButton.type = 'button';
    foneButton.dataset.model = 'fone-tune';
    foneButton.dataset.label = 'Fone';
    foneButton.dataset.alt = 'Fone em visualização 3D interativa e animada';
  }
  foneButton.dataset.src = FONE_SRC;
  foneButton.dataset.hasAnimation = '1';
  foneButton.dataset.hasColors = '1';
  tabs.insertBefore(foneButton, tabs.firstElementChild);

  const buttons = [...tabs.querySelectorAll('button[data-model]')];
  buttons.forEach((button) => {
    const label = button.dataset.label || button.textContent.trim() || button.dataset.model;
    button.dataset.label = label;
    button.dataset.hasAnimation = button.dataset.model === 'fone-tune' ? '1' : '0';
    button.dataset.hasColors = button.dataset.model === 'fone-tune' ? '1' : '0';
    const frame = FRAMING[button.dataset.model || ''];
    if (frame) {
      button.dataset.orbitTheta = frame[0];
      button.dataset.orbitPhi = frame[1];
      button.dataset.orbitRadius = frame[2];
      button.dataset.fov = frame[3];
    }
    button.innerHTML = `<span class="three-list-dot" aria-hidden="true"></span><span class="three-list-name">${label}</span>`;
    button.setAttribute('aria-label', label);
  });

  // Remove every previous runtime UI so there is only one controller.
  sidebar.querySelectorAll('#threeAssetTrigger').forEach((el) => el.remove());
  stageMain.querySelectorAll('#foneControls').forEach((el) => el.remove());

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.id = 'threeAssetTrigger';
  trigger.className = 'three-list-trigger';
  trigger.setAttribute('aria-label', 'Abrir lista de modelos 3D');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.innerHTML = `<span class="three-trigger-copy"><small>MODELOS 3D</small><strong id="threeActiveModel">Fone</strong></span><span class="three-trigger-chevron">${icon('chevron')}</span>`;
  sidebar.prepend(trigger);
  const activeModelLabel = trigger.querySelector('#threeActiveModel');

  const controls = document.createElement('div');
  controls.id = 'foneControls';
  controls.className = 'fone-controls';
  controls.hidden = true;
  controls.innerHTML = `
    <div class="fone-color-dock" id="assetColorControls" aria-label="Escolher cor">
      <span id="foneColorName">Preto</span>
      <button type="button" class="fone-swatch" data-color="Preto" aria-label="Preto" aria-pressed="true"></button>
      <button type="button" class="fone-swatch" data-color="Branco" aria-label="Branco" aria-pressed="false"></button>
      <button type="button" class="fone-swatch" data-color="Azul" aria-label="Azul" aria-pressed="false"></button>
    </div>
    <div class="fone-player-dock" id="assetPlaybackControls">
      <div class="fone-track-row">
        <input id="foneTimeline" type="range" min="0" max="48" step="0.01" value="0" aria-label="Momento da animação">
        <span id="foneTime">00.0 / 48.0s · 2×</span>
      </div>
      <div class="fone-actions">
        <button type="button" id="fonePlay" class="primary">${icon('pause')}<span>Pausar · 2×</span></button>
        <button type="button" id="foneReplay">${icon('rotate')}<span>Recomeçar</span></button>
        <small>ARRASTE · GIRE · ZOOM</small>
      </div>
    </div>`;
  stageMain.appendChild(controls);

  const colorControls = controls.querySelector('#assetColorControls');
  const playbackControls = controls.querySelector('#assetPlaybackControls');
  const colorLabel = controls.querySelector('#foneColorName');
  const timeline = controls.querySelector('#foneTimeline');
  const timeLabel = controls.querySelector('#foneTime');
  const playButton = controls.querySelector('#fonePlay');
  const replayButton = controls.querySelector('#foneReplay');

  let style = document.getElementById('ms-fone-3d-preview-style');
  if (style) style.remove();
  style = document.createElement('style');
  style.id = 'ms-fone-3d-preview-style';
  style.textContent = `
    #three .three-project-stage{display:block!important;position:relative!important;min-height:clamp(660px,82vh,980px)!important;background:transparent!important;backdrop-filter:none!important;border-color:rgba(255,255,255,.12)!important;overflow:visible!important}
    #three .three-project-stage .stage-main{position:relative!important;min-height:clamp(660px,82vh,980px)!important;height:clamp(660px,82vh,980px)!important;background:transparent!important;overflow:hidden!important;box-sizing:border-box!important}
    #three .three-project-stage model-viewer{position:absolute!important;left:0!important;right:0!important;top:0!important;bottom:0!important;width:100%!important;height:100%!important;min-height:0!important;background:transparent!important;--poster-color:transparent!important;touch-action:pan-y!important;opacity:1!important;visibility:visible!important}
    #three.is-fone-active .three-project-stage model-viewer{bottom:104px!important;height:auto!important}
    #three.is-asset-switching .three-project-stage model-viewer{opacity:0!important;pointer-events:none!important}
    #three .three-sidebar{position:absolute!important;left:22px!important;top:22px!important;transform:none!important;width:230px!important;height:auto!important;padding:0!important;border:0!important;background:transparent!important;overflow:visible!important;z-index:24!important;pointer-events:auto!important}
    #three .three-sidebar-group{position:relative!important;display:block!important;pointer-events:auto!important}
    #three .three-sidebar-label{display:none!important}
    #three .three-list-trigger{width:230px;min-height:56px;padding:10px 12px 10px 14px;border-radius:14px;border:1px solid rgba(255,255,255,.15);background:rgba(4,7,5,.52);backdrop-filter:blur(16px);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:12px;text-align:left;box-shadow:0 16px 44px rgba(0,0,0,.22);cursor:pointer}
    #three .three-trigger-copy{display:flex;flex-direction:column;gap:3px;min-width:0}#three .three-trigger-copy small{font:800 8px/1 Inter,Arial,sans-serif;letter-spacing:.16em;color:var(--lime)}#three .three-trigger-copy strong{font:700 12px/1.2 Inter,Arial,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#three .three-trigger-chevron{display:grid;place-items:center;opacity:.72;transition:transform .2s ease}#three .three-sidebar.is-open .three-trigger-chevron{transform:rotate(180deg)}
    #three #modelTabs{position:absolute!important;left:0!important;top:64px!important;width:230px!important;height:auto!important;display:grid!important;gap:6px!important;padding:8px!important;border:1px solid rgba(255,255,255,.14)!important;border-radius:16px!important;background:rgba(4,7,5,.68)!important;backdrop-filter:blur(18px)!important;box-shadow:0 18px 55px rgba(0,0,0,.3)!important;opacity:0!important;visibility:hidden!important;transform:translateY(-8px) scale(.98)!important;transform-origin:top left!important;pointer-events:none!important;transition:opacity .18s ease,transform .2s ease,visibility .18s ease!important}
    #three .three-sidebar.is-open #modelTabs{opacity:1!important;visibility:visible!important;transform:translateY(0) scale(1)!important;pointer-events:auto!important}
    #three #modelTabs button{position:relative!important;width:100%!important;height:40px!important;min-height:40px!important;padding:0 12px!important;border-radius:10px!important;border:1px solid transparent!important;background:transparent!important;color:rgba(255,255,255,.78)!important;display:flex!important;align-items:center!important;gap:9px!important;text-align:left!important;opacity:1!important;transform:none!important;pointer-events:auto!important;box-shadow:none!important;cursor:pointer!important;font:650 10px/1 Inter,Arial,sans-serif!important}
    #three #modelTabs button:hover,#three #modelTabs button:focus-visible{background:rgba(255,255,255,.07)!important;color:#fff!important;outline:none!important}#three #modelTabs button.active{background:rgba(158,255,0,.09)!important;border-color:rgba(158,255,0,.35)!important;color:#fff!important}
    #three .three-list-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.25);flex:none}#three #modelTabs button.active .three-list-dot{background:var(--lime);box-shadow:0 0 10px rgba(158,255,0,.55)}#three .three-list-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    #three .stage-note-3d{left:auto!important;right:22px!important;top:22px!important;bottom:auto!important;background:rgba(5,8,6,.36)!important;backdrop-filter:blur(12px)!important}
    #three.is-fone-active .stage-note-3d{display:none!important}
    #three .fone-controls{position:absolute;inset:0;z-index:16;pointer-events:none;color:#f5f7f2}#three .fone-controls[hidden],#three .fone-color-dock[hidden],#three .fone-player-dock[hidden]{display:none!important}
    #three .fone-color-dock{position:absolute;right:22px;top:22px;display:flex;align-items:center;gap:10px;pointer-events:auto;padding:9px 12px;border:1px solid rgba(255,255,255,.14);background:rgba(5,8,6,.5);border-radius:999px;backdrop-filter:blur(14px);box-shadow:0 12px 34px rgba(0,0,0,.18)}
    #three .fone-color-dock>span{font:700 9px/1 Inter,Arial,sans-serif;min-width:42px;color:rgba(255,255,255,.78)}
    #three .fone-swatch{width:24px!important;height:24px!important;min-height:24px!important;padding:0!important;border-radius:50%!important;border:1px solid rgba(255,255,255,.35)!important;position:relative;background:#20232a!important;cursor:pointer}#three .fone-swatch[data-color="Branco"]{background:#e7e8e5!important}#three .fone-swatch[data-color="Azul"]{background:#4654a0!important}#three .fone-swatch[aria-pressed="true"]:after{content:"";position:absolute;inset:-5px;border:1px solid var(--lime);border-radius:50%}
    #three .fone-player-dock{position:absolute;left:0;right:0;bottom:0;height:104px;box-sizing:border-box;padding:14px 22px 13px;border-top:1px solid rgba(255,255,255,.14);background:rgba(4,7,5,.44);backdrop-filter:blur(16px);pointer-events:auto}
    #three .fone-track-row{display:flex;align-items:center;gap:14px;margin-bottom:12px}#three .fone-track-row input{--track-progress:0%;-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:999px;outline:none;background:linear-gradient(90deg,var(--lime) 0 var(--track-progress),rgba(255,255,255,.24) var(--track-progress) 100%);cursor:pointer}#three .fone-track-row input::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:13px;height:13px;border-radius:50%;background:var(--lime);border:2px solid rgba(8,12,9,.9);box-shadow:0 0 0 2px rgba(158,255,0,.2)}#three .fone-track-row span{min-width:112px;text-align:right;font:700 9px/1 Inter,Arial,sans-serif;color:rgba(255,255,255,.72);font-variant-numeric:tabular-nums}
    #three .fone-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}#three .fone-actions button{min-height:34px;padding:0 13px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(6,9,7,.4);color:#fff;display:inline-flex;align-items:center;gap:7px;font:700 9px/1 Inter,Arial,sans-serif;cursor:pointer}#three .fone-actions button.primary{background:rgba(239,244,235,.95);color:#101310;border-color:transparent}#three .fone-actions small{margin-left:auto;font:700 8px/1 Inter,Arial,sans-serif;letter-spacing:.13em;color:rgba(255,255,255,.58)}
    @media(max-width:760px){#three .three-project-stage,#three .three-project-stage .stage-main{min-height:72svh!important;height:72svh!important}#three .three-sidebar{left:12px!important;top:12px!important;width:min(220px,calc(100% - 24px))!important}#three .three-list-trigger,#three #modelTabs{width:100%!important}#three .fone-color-dock{right:12px;top:78px}#three .fone-color-dock>span{display:none}#three .fone-player-dock{height:112px;padding:12px}#three.is-fone-active .three-project-stage model-viewer{bottom:112px!important}#three .fone-actions small{display:none}}
  `;
  document.head.appendChild(style);

  let viewer = oldViewer;
  let loadToken = 0;
  let activeModel = '';
  let playing = false;
  let userVariant = null;
  let sectionVisible = false;

  const setMenu = (open) => {
    sidebar.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };
  trigger.addEventListener('click', (event) => { event.stopPropagation(); setMenu(!sidebar.classList.contains('is-open')); });
  document.addEventListener('click', (event) => { if (!sidebar.contains(event.target)) setMenu(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

  const setSelectedColorUI = (name) => {
    const safe = ['Preto','Branco','Azul'].includes(name) ? name : 'Preto';
    colorLabel.textContent = safe;
    controls.querySelectorAll('.fone-swatch').forEach((swatch) => swatch.setAttribute('aria-pressed', String(swatch.dataset.color === safe)));
  };

  const syncColorFromTime = (time) => {
    if (userVariant) return;
    const t = Math.max(0, Math.min(FONE_DURATION, Number(time) || 0));
    setSelectedColorUI(t < 16 ? 'Preto' : t < 32 ? 'Branco' : 'Azul');
  };

  const setTimeUI = (time) => {
    const t = Math.max(0, Math.min(FONE_DURATION, Number(time) || 0));
    timeline.value = String(t);
    timeline.style.setProperty('--track-progress', `${(t / FONE_DURATION) * 100}%`);
    timeLabel.textContent = `${t.toFixed(1).padStart(4,'0')} / 48.0s · 2×`;
    syncColorFromTime(t);
  };

  const syncPlayUI = () => {
    playButton.innerHTML = `${icon(playing ? 'pause' : 'play')}<span>${playing ? 'Pausar · 2×' : 'Reproduzir · 2×'}</span>`;
  };

  const pauseCurrent = () => {
    try { viewer?.pause?.(); } catch (_) {}
    playing = false;
    syncPlayUI();
  };

  const startFone = (reset = false) => {
    if (!viewer || activeModel !== 'fone-tune' || !viewer.loaded) return;
    try {
      const animations = viewer.availableAnimations || [];
      if (animations.length) viewer.animationName = animations[0];
      viewer.timeScale = PLAYBACK_SPEED;
      if (reset || (viewer.currentTime || 0) >= FONE_DURATION - 0.03) viewer.currentTime = 0;
      // Autoplay uses the GLB's own 48s color animation. Manual variant is cleared here.
      userVariant = null;
      try { viewer.variantName = null; } catch (_) { try { viewer.variantName = ''; } catch (_) {} }
      viewer.play?.({ repetitions: 1 });
      playing = true;
      syncPlayUI();
    } catch (_) {}
  };

  const applyFrame = (targetViewer, key) => {
    const frame = FRAMING[key] || ['0deg','75deg','103%','28deg'];
    try {
      targetViewer.cameraTarget = 'auto auto auto';
      targetViewer.cameraOrbit = `${frame[0]} ${frame[1]} ${frame[2]}`;
      targetViewer.fieldOfView = frame[3];
      targetViewer.updateFraming?.();
      targetViewer.jumpCameraToGoal?.();
    } catch (_) {}
  };

  const makeViewer = (button, token) => {
    const key = button.dataset.model || '';
    const src = key === 'fone-tune' ? FONE_SRC : (button.dataset.src || '');
    const mv = document.createElement('model-viewer');
    mv.id = 'modelViewer3D';
    mv.setAttribute('camera-controls', '');
    mv.setAttribute('interaction-prompt', 'none');
    mv.setAttribute('touch-action', 'pan-y');
    mv.setAttribute('loading', 'eager');
    mv.setAttribute('exposure', '1.08');
    mv.setAttribute('environment-image', 'neutral');
    mv.setAttribute('alt', button.dataset.alt || button.dataset.label || 'Modelo 3D');
    mv.dataset.currentModel = key;
    mv.dataset.src = src;

    // The headphone must not render model-viewer's shadow-catcher plane.
    if (key === 'fone-tune') {
      mv.setAttribute('shadow-intensity', '0');
      mv.setAttribute('shadow-softness', '0');
    } else {
      mv.setAttribute('shadow-intensity', '1.15');
      mv.setAttribute('shadow-softness', '0.8');
    }

    mv.addEventListener('load', () => {
      if (token !== loadToken || mv !== viewer) return;
      applyFrame(mv, key);
      requestAnimationFrame(() => requestAnimationFrame(() => applyFrame(mv, key)));
      section.classList.remove('is-asset-switching');
      if (key === 'fone-tune') {
        try {
          const animations = mv.availableAnimations || [];
          if (animations.length) mv.animationName = animations[0];
          mv.currentTime = 0;
          mv.timeScale = PLAYBACK_SPEED;
        } catch (_) {}
        setTimeUI(0);
        if (sectionVisible) startFone(true);
      }
    });

    mv.addEventListener('timeupdate', () => {
      if (mv !== viewer || activeModel !== 'fone-tune') return;
      const t = Number(mv.currentTime) || 0;
      setTimeUI(t);
      if (playing && t >= FONE_DURATION - 0.03) {
        playing = false;
        syncPlayUI();
      }
    });

    mv.addEventListener('error', () => {
      if (token !== loadToken || mv !== viewer) return;
      section.classList.remove('is-asset-switching');
      playing = false;
      syncPlayUI();
    });

    applyFrame(mv, key);
    if (src) mv.setAttribute('src', src);
    return mv;
  };

  const activate = (button) => {
    if (!button) return;
    const key = button.dataset.model || '';
    const token = ++loadToken;
    activeModel = key;
    playing = false;
    userVariant = null;
    syncPlayUI();
    setMenu(false);

    buttons.forEach((b) => b.classList.toggle('active', b === button));
    activeModelLabel.textContent = button.dataset.label || button.textContent.trim();

    const isFone = key === 'fone-tune';
    controls.hidden = !isFone;
    colorControls.hidden = !isFone;
    playbackControls.hidden = !isFone;
    section.classList.toggle('is-fone-active', isFone);
    if (stageNote) stageNote.hidden = isFone;
    section.classList.add('is-asset-switching');

    // Hard isolation: destroy the previous custom element/canvas before the next asset enters.
    // This prevents GLBs from visually overlapping or colliding during source changes.
    const previous = viewer;
    try { previous?.pause?.(); } catch (_) {}
    try { previous?.removeAttribute('src'); previous.dataset.src = ''; } catch (_) {}
    const nextViewer = makeViewer(button, token);
    previous.replaceWith(nextViewer);
    viewer = nextViewer;
  };

  tabs.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-model]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    activate(button);
  });

  playButton.addEventListener('click', () => {
    if (activeModel !== 'fone-tune') return;
    if (playing) pauseCurrent(); else startFone(false);
  });

  replayButton.addEventListener('click', () => {
    if (activeModel !== 'fone-tune') return;
    try { viewer.currentTime = 0; } catch (_) {}
    setTimeUI(0);
    startFone(true);
  });

  timeline.addEventListener('input', () => {
    if (activeModel !== 'fone-tune') return;
    pauseCurrent();
    userVariant = null;
    try { viewer.variantName = null; } catch (_) {}
    const value = Number(timeline.value) || 0;
    try { viewer.currentTime = value; } catch (_) {}
    setTimeUI(value);
  });

  controls.querySelectorAll('.fone-swatch').forEach((swatch) => swatch.addEventListener('click', () => {
    if (activeModel !== 'fone-tune') return;
    pauseCurrent();
    const name = swatch.dataset.color || 'Preto';
    userVariant = name;
    setSelectedColorUI(name);
    try { viewer.variantName = name; } catch (_) {}
  }));

  const visibilityObserver = new IntersectionObserver((entries) => {
    sectionVisible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.22);
    if (activeModel !== 'fone-tune') return;
    if (sectionVisible) {
      if (viewer.loaded && !playing && !userVariant) startFone((viewer.currentTime || 0) >= FONE_DURATION - 0.03);
    } else if (playing) {
      pauseCurrent();
    }
  }, { threshold: [0, 0.22, 0.5] });
  visibilityObserver.observe(section);

  // Kill the original Creatine viewer before any deferred hydration can keep it on screen.
  try { oldViewer.pause?.(); oldViewer.removeAttribute('src'); oldViewer.dataset.src = ''; } catch (_) {}
  foneButton.classList.add('active');
  activate(foneButton);
})();
