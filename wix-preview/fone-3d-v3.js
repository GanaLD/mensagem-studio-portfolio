(() => {
  const section = document.getElementById('three');
  const viewer = document.getElementById('modelViewer3D');
  const sidebar = section?.querySelector('.three-sidebar');
  const tabs = document.getElementById('modelTabs');
  const stageMain = section?.querySelector('.stage-main');
  const stageNote = section?.querySelector('.stage-note-3d');
  if (!section || !viewer || !sidebar || !tabs || !stageMain) return;

  const BUILD = '20260926-fone-list-autoplay-v3';
  const FONE_SRC = 'https://mensagem-studio-3d-assets.floot.app/_api/fone-glb';
  const FONE_DURATION = 48;
  const PLAYBACK_SPEED = 2;
  const FRONT_ORBITS = {
    'black-skull-creatine-v2': ['0deg','75deg','103%','28deg'],
    'arma-cyberpunk': ['0deg','75deg','103%','28deg'],
    'arma-cyberpunk-v2': ['0deg','75deg','103%','28deg'],
    'rejuvital': ['180deg','75deg','92%','25deg'],
    'rejuvital-4ml': ['180deg','75deg','92%','25deg'],
    'arencia-cleansing-balm': ['25deg','68deg','118%','28deg'],
    'fone-tune': ['0deg','78deg','135%','28deg']
  };

  section.dataset.fonePreviewBuild = BUILD;
  const intro = section.querySelector('.three-intro-copy');
  if (intro) intro.textContent = 'Ambientes e produtos em 3D para explorar diretamente na página. Abra a lista, escolha um modelo e interaja diretamente no viewer.';

  const icon = (name) => {
    const attrs = 'viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    const paths = {
      play:'<path d="m8 5 11 7-11 7V5Z"/>',
      pause:'<path d="M8 5v14M16 5v14"/>',
      rotate:'<path d="M3 12a9 9 0 0 1 15.2-6.5L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.2 6.5L3 16"/><path d="M3 21v-5h5"/>',
      chevron:'<path d="m6 9 6 6 6-6"/>'
    };
    return `<svg ${attrs}>${paths[name] || paths.chevron}</svg>`;
  };

  const originalButtons = [...tabs.querySelectorAll('button[data-model]')];
  originalButtons.forEach((button) => {
    if (!button.dataset.label) button.dataset.label = button.textContent.trim();
    button.dataset.hasAnimation = '0';
    button.dataset.hasColors = '0';
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
  foneButton.setAttribute('aria-label','Fone');
  tabs.prepend(foneButton);

  const menuButtons = [...tabs.querySelectorAll('button[data-model]')];
  menuButtons.forEach((button) => {
    const label = button.dataset.label || button.textContent.trim() || button.dataset.model;
    button.dataset.label = label;
    button.innerHTML = `<span class="three-list-dot" aria-hidden="true"></span><span class="three-list-name">${label}</span>`;
    button.setAttribute('aria-label', label);
    const framing = FRONT_ORBITS[button.dataset.model || ''];
    if (framing) {
      button.dataset.orbitTheta = framing[0];
      button.dataset.orbitPhi = framing[1];
      button.dataset.orbitRadius = framing[2];
      button.dataset.fov = framing[3];
    }
  });

  let trigger = sidebar.querySelector('#threeAssetTrigger');
  if (!trigger) {
    trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.id = 'threeAssetTrigger';
    sidebar.prepend(trigger);
  }
  trigger.className = 'three-list-trigger';
  trigger.setAttribute('aria-label','Abrir lista de modelos 3D');
  trigger.setAttribute('aria-expanded','false');
  trigger.innerHTML = `<span class="three-trigger-copy"><small>MODELOS 3D</small><strong id="threeActiveModel">Fone</strong></span><span class="three-trigger-chevron">${icon('chevron')}</span>`;
  const activeModelLabel = trigger.querySelector('#threeActiveModel');

  let controls = stageMain.querySelector('#foneControls');
  if (controls) controls.remove();
  controls = document.createElement('div');
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
    #three .three-project-stage .stage-main{position:relative!important;min-height:clamp(660px,82vh,980px)!important;height:clamp(660px,82vh,980px)!important;background:transparent!important;overflow:visible!important;box-sizing:border-box!important}
    #three .three-project-stage model-viewer{position:absolute!important;left:0!important;right:0!important;top:0!important;bottom:0!important;width:100%!important;height:auto!important;background:transparent!important;--poster-color:transparent;touch-action:pan-y!important;transition:opacity .18s ease!important}
    #three.is-fone-active .three-project-stage model-viewer{bottom:104px!important}
    #three.is-asset-switching model-viewer{opacity:0!important;pointer-events:none!important}

    #three .three-sidebar{position:absolute!important;left:22px!important;top:22px!important;transform:none!important;width:230px!important;height:auto!important;padding:0!important;border:0!important;background:transparent!important;overflow:visible!important;z-index:24!important;pointer-events:auto!important}
    #three .three-sidebar-group{position:relative!important;inset:auto!important;display:block!important;pointer-events:auto!important}
    #three .three-sidebar-label{display:none!important}
    #three .three-list-trigger{width:230px;min-height:56px;padding:10px 12px 10px 14px;border-radius:14px;border:1px solid rgba(255,255,255,.15);background:rgba(4,7,5,.52);backdrop-filter:blur(16px);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:12px;text-align:left;box-shadow:0 16px 44px rgba(0,0,0,.22);cursor:pointer}
    #three .three-trigger-copy{display:flex;flex-direction:column;gap:3px;min-width:0}#three .three-trigger-copy small{font:800 8px/1 Inter,Arial,sans-serif;letter-spacing:.16em;color:var(--lime)}#three .three-trigger-copy strong{font:700 12px/1.2 Inter,Arial,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#three .three-trigger-chevron{display:grid;place-items:center;opacity:.72;transition:transform .2s ease}#three .three-sidebar.is-open .three-trigger-chevron{transform:rotate(180deg)}
    #three #modelTabs{position:absolute!important;left:0!important;top:64px!important;width:230px!important;height:auto!important;display:grid!important;gap:6px!important;padding:8px!important;border:1px solid rgba(255,255,255,.14)!important;border-radius:16px!important;background:rgba(4,7,5,.64)!important;backdrop-filter:blur(18px)!important;box-shadow:0 18px 55px rgba(0,0,0,.3)!important;opacity:0!important;visibility:hidden!important;transform:translateY(-8px) scale(.98)!important;transform-origin:top left!important;pointer-events:none!important;transition:opacity .18s ease,transform .2s ease,visibility .18s ease!important}
    #three .three-sidebar.is-open #modelTabs{opacity:1!important;visibility:visible!important;transform:translateY(0) scale(1)!important;pointer-events:auto!important}
    #three #modelTabs button{position:relative!important;left:auto!important;top:auto!important;width:100%!important;height:40px!important;min-height:40px!important;padding:0 12px!important;border-radius:10px!important;border:1px solid transparent!important;background:transparent!important;color:rgba(255,255,255,.78)!important;display:flex!important;align-items:center!important;gap:9px!important;text-align:left!important;opacity:1!important;transform:none!important;pointer-events:auto!important;box-shadow:none!important;cursor:pointer!important;font:650 10px/1 Inter,Arial,sans-serif!important;letter-spacing:.01em!important;transition:background .15s ease,border-color .15s ease,color .15s ease!important}
    #three #modelTabs button:hover,#three #modelTabs button:focus-visible{background:rgba(255,255,255,.07)!important;color:#fff!important;outline:none!important}#three #modelTabs button.active{background:rgba(158,255,0,.09)!important;border-color:rgba(158,255,0,.35)!important;color:#fff!important}
    #three .three-list-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.25);flex:none}#three #modelTabs button.active .three-list-dot{background:var(--lime);box-shadow:0 0 10px rgba(158,255,0,.55)}#three .three-list-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

    #three .stage-note-3d{left:auto!important;right:22px!important;top:22px!important;bottom:auto!important;background:rgba(5,8,6,.36)!important;backdrop-filter:blur(12px)!important}
    #three.is-fone-active .stage-note-3d{display:none!important}
    #three .fone-controls{position:absolute;inset:0;z-index:16;pointer-events:none;color:#f5f7f2}#three .fone-controls[hidden],#three .fone-color-dock[hidden],#three .fone-player-dock[hidden]{display:none!important}
    #three .fone-color-dock{position:absolute;right:22px;top:22px;display:flex;align-items:center;gap:10px;pointer-events:auto;padding:9px 12px;border:1px solid rgba(255,255,255,.14);background:rgba(5,8,6,.5);border-radius:999px;backdrop-filter:blur(14px);box-shadow:0 12px 34px rgba(0,0,0,.18)}
    #three .fone-color-dock>span{font:700 9px/1 Inter,Arial,sans-serif;min-width:42px;color:rgba(255,255,255,.78)}
    #three .fone-swatch{width:24px!important;height:24px!important;min-height:24px!important;padding:0!important;border-radius:50%!important;border:1px solid rgba(255,255,255,.35)!important;position:relative;background:#20232a!important;cursor:pointer}#three .fone-swatch[data-color="Branco"]{background:#e7e8e5!important}#three .fone-swatch[data-color="Azul"]{background:#4654a0!important}#three .fone-swatch[aria-pressed="true"]:after{content:"";position:absolute;inset:-5px;border:1px solid var(--lime);border-radius:50%}
    #three .fone-player-dock{position:absolute;left:0;right:0;bottom:0;height:104px;box-sizing:border-box;padding:14px 22px 13px;border-top:1px solid rgba(255,255,255,.14);background:rgba(4,7,5,.44);backdrop-filter:blur(16px);pointer-events:auto}
    #three .fone-track-row{display:flex;align-items:center;gap:14px;margin-bottom:12px}#three .fone-track-row input{--track-progress:0%;-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:999px;outline:none;background:linear-gradient(90deg,var(--lime) 0 var(--track-progress),rgba(255,255,255,.24) var(--track-progress) 100%);cursor:pointer}#three .fone-track-row input::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:13px;height:13px;border-radius:50%;background:var(--lime);border:2px solid rgba(8,12,9,.9);box-shadow:0 0 0 2px rgba(158,255,0,.2)}#three .fone-track-row span{min-width:104px;text-align:right;font:700 9px/1 Inter,Arial,sans-serif;color:rgba(255,255,255,.72);font-variant-numeric:tabular-nums}
    #three .fone-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}#three .fone-actions button{min-height:34px;padding:0 13px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(6,9,7,.4);color:#fff;display:inline-flex;align-items:center;gap:7px;font:700 9px/1 Inter,Arial,sans-serif;cursor:pointer}#three .fone-actions button.primary{background:rgba(239,244,235,.95);color:#101310;border-color:transparent}#three .fone-actions small{margin-left:auto;font:700 8px/1 Inter,Arial,sans-serif;letter-spacing:.13em;color:rgba(255,255,255,.58)}
    @media(max-width:760px){#three .three-project-stage,#three .three-project-stage .stage-main{min-height:72svh!important;height:72svh!important}#three.is-fone-active .three-project-stage model-viewer{bottom:112px!important}#three .three-sidebar{left:12px!important;top:12px!important;width:190px!important}#three .three-list-trigger,#three #modelTabs{width:190px!important}#three .fone-color-dock{right:12px;top:78px;padding:7px 9px;gap:8px}#three .fone-color-dock>span{display:none}#three .fone-swatch{width:22px!important;height:22px!important;min-height:22px!important}#three .fone-player-dock{height:112px;padding:12px}#three .fone-track-row{gap:8px}#three .fone-track-row span{min-width:92px;font-size:8px}#three .fone-actions button{min-height:32px;padding:0 10px}#three .fone-actions small{display:none}}
    @media(prefers-reduced-motion:reduce){#three #modelTabs,#three .three-trigger-chevron{transition:none!important}}
  `;
  document.head.appendChild(style);

  let selectedColor = 'Preto';
  let isPlaying = false;
  let manualPaused = false;
  let sectionVisible = false;
  let switchToken = 0;
  let expectedSrc = '';
  let activeModel = '';

  const playNative = (options) => { try { return viewer.play?.(options); } catch (_) { return null; } };
  const pauseNative = () => { try { viewer.pause?.(); } catch (_) {} };

  const setMenu = (open) => {
    sidebar.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };
  trigger.onclick = (event) => { event.preventDefault(); event.stopPropagation(); setMenu(!sidebar.classList.contains('is-open')); };
  document.addEventListener('click', (event) => { if (!sidebar.contains(event.target)) setMenu(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

  const currentButton = () => tabs.querySelector('button.active[data-model]');
  const applyFraming = (button=currentButton()) => {
    if (!button) return;
    const framing = FRONT_ORBITS[button.dataset.model || ''] || [button.dataset.orbitTheta || '0deg', button.dataset.orbitPhi || '75deg', button.dataset.orbitRadius || '103%', button.dataset.fov || '28deg'];
    viewer.cameraTarget = 'auto auto auto';
    viewer.cameraOrbit = `${framing[0]} ${framing[1]} ${framing[2]}`;
    viewer.fieldOfView = framing[3];
    try { viewer.updateFraming?.(); viewer.jumpCameraToGoal?.(); } catch (_) {}
  };

  const applyCapabilities = (button) => {
    const hasAnimation = button?.dataset.hasAnimation === '1';
    const hasColors = button?.dataset.hasColors === '1';
    playbackControls.hidden = !hasAnimation;
    colorControls.hidden = !hasColors;
    controls.hidden = !(hasAnimation || hasColors);
    section.classList.toggle('is-fone-active', button?.dataset.model === 'fone-tune');
    if (stageNote) stageNote.hidden = hasAnimation || hasColors;
  };

  const updateSequenceColorUI = (time) => {
    const name = time < 24 ? 'Preto' : time < 36 ? 'Branco' : 'Azul';
    colorLabel.textContent = name;
    controls.querySelectorAll('.fone-swatch').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.color === name)));
  };

  const setTime = (value) => {
    const duration = Number.isFinite(viewer.duration) && viewer.duration > 0 ? viewer.duration : FONE_DURATION;
    const t = Math.max(0, Math.min(duration, Number(value) || 0));
    const pct = duration > 0 ? (t / duration) * 100 : 0;
    timeline.max = String(duration);
    timeline.value = String(t);
    timeline.style.setProperty('--track-progress', `${pct}%`);
    timeLabel.textContent = `${t.toFixed(1).padStart(4,'0')} / ${duration.toFixed(1)}s · ${PLAYBACK_SPEED}×`;
    if (activeModel === 'fone-tune' && isPlaying) updateSequenceColorUI(t);
  };

  const syncPlayUI = () => {
    playButton.innerHTML = `${icon(isPlaying ? 'pause' : 'play')}<span>${isPlaying ? `Pausar · ${PLAYBACK_SPEED}×` : `Reproduzir · ${PLAYBACK_SPEED}×`}</span>`;
  };

  const resetForSequence = () => {
    try { viewer.variantName = null; } catch (_) { try { viewer.variantName = ''; } catch (_) {} }
    try { viewer.currentTime = 0; } catch (_) {}
    selectedColor = 'Preto';
    updateSequenceColorUI(0);
    setTime(0);
  };

  const startSequence = ({restart=false,auto=false}={}) => {
    if (activeModel !== 'fone-tune') return;
    const animations = viewer.availableAnimations || [];
    if (!animations.length) return;
    try {
      viewer.animationName = animations[0];
      viewer.timeScale = PLAYBACK_SPEED;
      viewer.setAttribute('time-scale', String(PLAYBACK_SPEED));
      if (restart || (viewer.currentTime || 0) >= (viewer.duration || FONE_DURATION) - .03) resetForSequence();
      else { try { viewer.variantName = null; } catch (_) {} }
      playNative({repetitions:1});
      isPlaying = true;
      if (auto) manualPaused = false;
      syncPlayUI();
    } catch (_) {}
  };

  const stopSequence = ({manual=false}={}) => {
    pauseNative();
    isPlaying = false;
    if (manual) manualPaused = true;
    syncPlayUI();
  };

  const selectManualColor = (name) => {
    if (activeModel !== 'fone-tune') return;
    stopSequence({manual:true});
    selectedColor = name;
    colorLabel.textContent = name;
    controls.querySelectorAll('.fone-swatch').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.color === name)));
    try { viewer.variantName = name; } catch (_) {}
  };

  const clearViewer = () => {
    pauseNative();
    try { viewer.removeAttribute('autoplay'); } catch (_) {}
    try { viewer.removeAttribute('src'); } catch (_) {}
    try { viewer.src = ''; } catch (_) {}
  };

  const activate = async (button) => {
    if (!button) return;
    const token = ++switchToken;
    const model = button.dataset.model || '';
    const src = model === 'fone-tune' ? FONE_SRC : (button.dataset.src || '');
    activeModel = model;
    expectedSrc = src;
    tabs.querySelectorAll('button[data-model]').forEach((b) => b.classList.toggle('active', b === button));
    activeModelLabel.textContent = button.dataset.label || model;
    setMenu(false);
    stopSequence();
    manualPaused = false;
    viewer.dataset.currentModel = model;
    applyCapabilities(button);
    section.classList.add('is-asset-switching');
    clearViewer();
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    if (token !== switchToken || activeModel !== model) return;
    if (button.dataset.alt) viewer.alt = button.dataset.alt;
    applyFraming(button);
    if (!src) { section.classList.remove('is-asset-switching'); return; }
    try { viewer.src = src; } catch (_) { viewer.setAttribute('src', src); }
  };

  tabs.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-model]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    activate(button);
  }, true);

  viewer.addEventListener('load', () => {
    const button = currentButton();
    if (!button || button.dataset.model !== activeModel) return;
    section.classList.remove('is-asset-switching');
    requestAnimationFrame(() => requestAnimationFrame(() => applyFraming(button)));
    if (activeModel !== 'fone-tune') { pauseNative(); return; }
    try {
      const animations = viewer.availableAnimations || [];
      if (animations.length) viewer.animationName = animations[0];
      viewer.timeScale = PLAYBACK_SPEED;
      viewer.setAttribute('time-scale', String(PLAYBACK_SPEED));
    } catch (_) {}
    resetForSequence();
    if (sectionVisible && !manualPaused) startSequence({restart:true,auto:true});
  });

  viewer.addEventListener('timeupdate', () => {
    if (activeModel !== 'fone-tune') return;
    const t = viewer.currentTime || 0;
    setTime(t);
    const duration = Number.isFinite(viewer.duration) && viewer.duration > 0 ? viewer.duration : FONE_DURATION;
    if (isPlaying && t >= duration - .03) {
      pauseNative();
      isPlaying = false;
      syncPlayUI();
    }
  });

  viewer.addEventListener('error', () => {
    if (activeModel !== 'fone-tune') return;
    section.classList.remove('is-asset-switching');
    stopSequence();
  });

  playButton.addEventListener('click', () => {
    if (activeModel !== 'fone-tune') return;
    if (isPlaying) stopSequence({manual:true});
    else { manualPaused = false; startSequence({restart:false}); }
  });

  replayButton.addEventListener('click', () => {
    if (activeModel !== 'fone-tune') return;
    manualPaused = false;
    resetForSequence();
    startSequence({restart:false});
  });

  timeline.addEventListener('input', () => {
    if (activeModel !== 'fone-tune') return;
    stopSequence({manual:true});
    try { viewer.variantName = null; } catch (_) {}
    try { viewer.currentTime = Number(timeline.value); } catch (_) {}
    setTime(timeline.value);
    updateSequenceColorUI(Number(timeline.value));
  });

  controls.querySelectorAll('.fone-swatch').forEach((button) => button.addEventListener('click', () => selectManualColor(button.dataset.color || 'Preto')));

  const visibilityObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    const nowVisible = !!entry?.isIntersecting && entry.intersectionRatio >= .18;
    if (nowVisible === sectionVisible) return;
    sectionVisible = nowVisible;
    if (activeModel !== 'fone-tune') return;
    if (sectionVisible) {
      manualPaused = false;
      startSequence({restart:true,auto:true});
    } else if (isPlaying) {
      pauseNative();
      isPlaying = false;
      syncPlayUI();
    }
  }, {threshold:[0,.18,.4]});
  visibilityObserver.observe(section);

  foneButton.classList.add('active');
  applyCapabilities(foneButton);
  activeModel = 'fone-tune';
  activeModelLabel.textContent = 'Fone';
  setMenu(false);
  activate(foneButton);
})();