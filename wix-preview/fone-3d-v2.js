(() => {
  const section = document.getElementById('three');
  const viewer = document.getElementById('modelViewer3D');
  const sidebar = section?.querySelector('.three-sidebar');
  const tabs = document.getElementById('modelTabs');
  const stageMain = section?.querySelector('.stage-main');
  const stageNote = section?.querySelector('.stage-note-3d');
  if (!section || !viewer || !sidebar || !tabs || !stageMain) return;

  const BUILD = '20260926-fone-asset-state-v2';
  const FONE_SRC = 'https://mensagem-studio-3d-assets.floot.app/_cdn/static/9cfd57f0-def5-4728-a46a-04051df396f6-fone_web_optimized.glb';
  const FRONT_ORBITS = {
    'black-skull-creatine-v2': ['0deg','75deg','103%','28deg'],
    'arma-cyberpunk': ['0deg','75deg','103%','28deg'],
    'arma-cyberpunk-v2': ['0deg','75deg','103%','28deg'],
    'rejuvital': ['180deg','75deg','92%','25deg'],
    'rejuvital-4ml': ['180deg','75deg','92%','25deg'],
    'arencia-cleansing-balm': ['25deg','68deg','118%','28deg'],
    'fone-tune': ['0deg','78deg','118%','26deg']
  };

  section.dataset.fonePreviewBuild = BUILD;
  const intro = section.querySelector('.three-intro-copy');
  if (intro) intro.textContent = 'Ambientes e produtos em 3D para explorar diretamente na página. Abra o seletor, escolha um asset e interaja diretamente no viewer.';

  const icon = (name) => {
    const common = 'viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    const paths = {
      headphones:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M18 19h-1a2 2 0 0 1-2-2v-3h5v3a2 2 0 0 1-2 2Z"/><path d="M6 19H5a2 2 0 0 1-2-2v-3h5v3a2 2 0 0 1-2 2Z"/>',
      box:'<path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="m3 8 9 5 9-5"/><path d="M12 13v8"/><path d="m3 12 9 5 9-5"/>',
      crosshair:'<circle cx="12" cy="12" r="8"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
      flask:'<path d="M9 3h6"/><path d="M10 9V3h4v6l5 8a2 2 0 0 1-1.7 3H6.7A2 2 0 0 1 5 17l5-8Z"/><path d="M7 15h10"/>',
      package:'<path d="M16.5 9.4 7.5 4.2"/><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>',
      grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      play:'<path d="m8 5 11 7-11 7V5Z"/>',
      pause:'<path d="M8 5v14M16 5v14"/>',
      rotate:'<path d="M3 12a9 9 0 0 1 15.2-6.5L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.2 6.5L3 16"/><path d="M3 21v-5h5"/>'
    };
    return `<svg ${common}>${paths[name] || paths.box}</svg>`;
  };

  const oldButtons = [...tabs.querySelectorAll('button[data-model]')];
  oldButtons.forEach((button) => {
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
    foneButton.setAttribute('aria-label','Fone');
  }
  foneButton.dataset.src = FONE_SRC;
  foneButton.dataset.hasAnimation = '1';
  foneButton.dataset.hasColors = '1';
  tabs.prepend(foneButton);

  [...tabs.querySelectorAll('button[data-model]')].forEach((button) => {
    const key = button.dataset.model || '';
    const framing = FRONT_ORBITS[key];
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
    trigger.className = 'three-command-trigger';
    trigger.setAttribute('aria-label','Abrir modelos 3D');
    trigger.setAttribute('aria-expanded','false');
    trigger.innerHTML = `${icon('grid')}<span>MODELOS</span>`;
    sidebar.prepend(trigger);
  }

  const menuButtons = [...tabs.querySelectorAll('button[data-model]')];
  menuButtons.forEach((button, index) => {
    const label = button.dataset.label || button.textContent.trim();
    const key = button.dataset.model || '';
    let iconName = 'box';
    if (key === 'fone-tune') iconName = 'headphones';
    else if (key.includes('arma')) iconName = 'crosshair';
    else if (key.includes('rejuvital')) iconName = 'flask';
    else if (key.includes('arencia')) iconName = 'package';
    button.innerHTML = `${icon(iconName)}<span class="three-command-tooltip">${label}</span>`;
    button.setAttribute('aria-label', label);
    button.style.setProperty('--command-index', String(index));
  });

  let controls = stageMain.querySelector('#foneControls');
  if (controls) controls.remove();
  controls = document.createElement('div');
  controls.id = 'foneControls';
  controls.className = 'fone-controls';
  controls.hidden = true;
  controls.innerHTML = `
    <div class="fone-topbar">
      <div class="fone-title"><small id="assetEyebrow">FONE / 3D INTERATIVO</small><strong id="assetTitle">Forma em movimento.</strong></div>
      <div class="fone-colors" id="assetColorControls" aria-label="Escolher cor">
        <span id="foneColorName">Preto</span>
        <button type="button" class="fone-swatch" data-color="Preto" aria-label="Preto" aria-pressed="true"></button>
        <button type="button" class="fone-swatch" data-color="Branco" aria-label="Branco" aria-pressed="false"></button>
        <button type="button" class="fone-swatch" data-color="Azul" aria-label="Azul" aria-pressed="false"></button>
      </div>
    </div>
    <div class="fone-player" id="assetPlaybackControls">
      <div class="fone-track"><input id="foneTimeline" type="range" min="0" max="48" step="0.01" value="0" aria-label="Momento da animação"><span id="foneTime">00.0 / 48s</span></div>
      <div class="fone-actions">
        <button type="button" id="fonePlay" class="primary">${icon('play')}<span>Reproduzir sequência</span></button>
        <button type="button" id="foneReplay">${icon('rotate')}<span>Recomeçar</span></button>
        <button type="button" id="foneExplore">Explorar</button>
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
  const exploreButton = controls.querySelector('#foneExplore');
  const title = controls.querySelector('#assetTitle');

  let style = document.getElementById('ms-fone-3d-preview-style');
  if (style) style.remove();
  style = document.createElement('style');
  style.id = 'ms-fone-3d-preview-style';
  style.textContent = `
    #three .three-project-stage{display:block!important;position:relative!important;min-height:clamp(620px,78vh,940px)!important;background:transparent!important;backdrop-filter:none!important;border-color:rgba(255,255,255,.12)!important;overflow:visible!important}
    #three .three-project-stage .stage-main{position:relative!important;min-height:clamp(620px,78vh,940px)!important;height:clamp(620px,78vh,940px)!important;background:transparent!important;overflow:visible!important}
    #three .three-project-stage model-viewer{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;min-height:0!important;background:transparent!important;--poster-color:transparent;touch-action:pan-y!important}
    #three .three-sidebar{position:absolute!important;left:28px!important;top:50%!important;transform:translateY(-50%)!important;width:300px!important;height:300px!important;padding:0!important;border:0!important;background:transparent!important;overflow:visible!important;z-index:18!important;pointer-events:none!important}
    #three .three-sidebar-group{position:absolute!important;inset:0!important;display:block!important;pointer-events:none!important}
    #three .three-sidebar-label{display:none!important}
    #three #modelTabs{position:absolute!important;left:123px!important;top:123px!important;width:54px!important;height:54px!important;display:block!important;pointer-events:none!important}
    #three #modelTabs button{position:absolute!important;left:0!important;top:0!important;width:52px!important;height:52px!important;min-height:52px!important;padding:0!important;border-radius:50%!important;display:grid!important;place-items:center!important;border:1px solid rgba(255,255,255,.22)!important;background:rgba(6,8,7,.58)!important;color:#f8faf4!important;box-shadow:0 12px 40px rgba(0,0,0,.28)!important;backdrop-filter:blur(14px)!important;opacity:0!important;transform:translate(0,0) scale(.35)!important;pointer-events:none!important;transition:transform .42s cubic-bezier(.22,.8,.24,1),opacity .22s ease,border-color .2s ease,background .2s ease,color .2s ease!important;z-index:2!important}
    #three .three-sidebar.is-open #modelTabs button{opacity:1!important;pointer-events:auto!important}
    #three .three-sidebar.is-open #modelTabs button:nth-child(1){transform:translate(0,-108px) scale(1)!important}
    #three .three-sidebar.is-open #modelTabs button:nth-child(2){transform:translate(84px,-67px) scale(1)!important}
    #three .three-sidebar.is-open #modelTabs button:nth-child(3){transform:translate(105px,24px) scale(1)!important}
    #three .three-sidebar.is-open #modelTabs button:nth-child(4){transform:translate(47px,96px) scale(1)!important}
    #three .three-sidebar.is-open #modelTabs button:nth-child(5){transform:translate(-47px,96px) scale(1)!important}
    #three .three-sidebar.is-open #modelTabs button:nth-child(6){transform:translate(-105px,24px) scale(1)!important}
    #three .three-sidebar.is-open #modelTabs button:nth-child(7){transform:translate(-84px,-67px) scale(1)!important}
    #three #modelTabs button.active,#three #modelTabs button:hover,#three #modelTabs button:focus-visible{border-color:var(--lime)!important;color:var(--lime)!important;background:rgba(12,17,10,.76)!important}
    #three .three-command-trigger{pointer-events:auto!important;position:absolute;left:123px;top:123px;width:58px;height:58px;border-radius:50%;border:1px solid rgba(158,255,0,.72);background:rgba(5,8,6,.72);color:var(--lime);display:grid;place-items:center;z-index:5;box-shadow:0 15px 46px rgba(0,0,0,.34),0 0 30px rgba(158,255,0,.08);backdrop-filter:blur(16px);transition:transform .24s ease,background .24s ease}
    #three .three-command-trigger span{position:absolute;top:67px;font:800 8px/1 Inter,Arial,sans-serif;letter-spacing:.16em;color:#fff;opacity:.8;white-space:nowrap}
    #three .three-sidebar.is-open .three-command-trigger{transform:rotate(45deg);background:rgba(17,23,14,.9)}
    #three .three-command-tooltip{position:absolute;left:62px;top:50%;transform:translateY(-50%) translateX(-4px);padding:8px 10px;border-radius:9px;border:1px solid rgba(255,255,255,.14);background:rgba(4,6,5,.84);color:#fff;font:700 9px/1 Inter,Arial,sans-serif;letter-spacing:.04em;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .16s ease,transform .16s ease;backdrop-filter:blur(12px)}
    #three #modelTabs button:hover .three-command-tooltip,#three #modelTabs button:focus-visible .three-command-tooltip{opacity:1;transform:translateY(-50%) translateX(0)}
    #three .stage-note-3d{left:auto!important;right:22px!important;top:22px!important;bottom:auto!important;background:rgba(5,8,6,.36)!important;backdrop-filter:blur(12px)!important}
    #three.is-fone-active .stage-note-3d{display:none!important}
    #three .fone-controls{position:absolute;inset:0;z-index:10;pointer-events:none;color:#f5f7f2}
    #three .fone-controls[hidden],#three .fone-colors[hidden],#three .fone-player[hidden]{display:none!important}
    #three .fone-topbar{position:absolute;top:26px;left:26px;right:26px;display:flex;align-items:flex-start;justify-content:space-between;gap:20px;pointer-events:none}
    #three .fone-title{display:flex;flex-direction:column;gap:7px;text-shadow:0 4px 24px rgba(0,0,0,.55)}
    #three .fone-title small{font-size:9px;letter-spacing:.18em;color:rgba(255,255,255,.66)}
    #three .fone-title strong{font-size:24px;font-weight:500;letter-spacing:-.04em}
    #three .fone-colors{display:flex;align-items:center;gap:11px;pointer-events:auto;padding:9px 12px;border:1px solid rgba(255,255,255,.14);background:rgba(5,8,6,.38);border-radius:999px;backdrop-filter:blur(14px)}
    #three .fone-colors>span{font-size:9px;min-width:42px;color:rgba(255,255,255,.72)}
    #three .fone-swatch{width:26px!important;height:26px!important;min-height:26px!important;padding:0!important;border-radius:50%!important;border:1px solid rgba(255,255,255,.35)!important;position:relative;background:#20232a!important}
    #three .fone-swatch[data-color="Branco"]{background:#e7e8e5!important}#three .fone-swatch[data-color="Azul"]{background:#4654a0!important}
    #three .fone-swatch[aria-pressed="true"]:after{content:"";position:absolute;inset:-5px;border:1px solid var(--lime);border-radius:50%}
    #three .fone-player{position:absolute;left:26px;right:26px;bottom:24px;padding:14px 16px 13px;border:1px solid rgba(255,255,255,.14);background:rgba(4,7,5,.38);border-radius:18px;backdrop-filter:blur(16px);pointer-events:auto;box-shadow:0 16px 50px rgba(0,0,0,.18)}
    #three .fone-track{display:flex;align-items:center;gap:14px;margin-bottom:12px}#three .fone-track input{width:100%;accent-color:var(--lime)}#three .fone-track span{min-width:66px;text-align:right;font-size:9px;color:rgba(255,255,255,.72);font-variant-numeric:tabular-nums}
    #three .fone-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}#three .fone-actions button{min-height:38px;padding:0 15px;border-radius:999px;border:1px solid rgba(255,255,255,.19);background:rgba(6,9,7,.44);color:#fff;display:inline-flex;align-items:center;gap:7px;font-size:10px}#three .fone-actions button.primary{background:rgba(239,244,235,.94);color:#101310;border-color:transparent}#three .fone-actions button.is-selected{border-color:var(--lime);color:var(--lime)}#three .fone-actions small{margin-left:auto;font-size:8px;letter-spacing:.13em;color:rgba(255,255,255,.58)}
    #three.is-asset-loading model-viewer{visibility:hidden!important}
    @media(max-width:760px){#three .three-project-stage,#three .three-project-stage .stage-main{min-height:70svh!important;height:70svh!important}#three .three-sidebar{left:-28px!important;top:48%!important;transform:translateY(-50%) scale(.82)!important}.three-command-tooltip{display:none!important}#three .fone-topbar{top:16px;left:16px;right:16px}.fone-title strong{font-size:19px!important}.fone-title small{font-size:8px!important}#three .fone-colors{padding:7px 9px;gap:8px}#three .fone-colors>span{display:none}#three .fone-swatch{width:22px!important;height:22px!important;min-height:22px!important}#three .fone-player{left:14px;right:14px;bottom:14px;padding:12px;border-radius:14px}#three .fone-actions button{min-height:36px;padding:0 11px}#three .fone-actions small{display:none}#three .stage-note-3d{right:12px!important;top:12px!important}}
    @media(prefers-reduced-motion:reduce){#three #modelTabs button,#three .three-command-trigger{transition:none!important}}
  `;
  document.head.appendChild(style);

  let isPlaying = false;
  let selectedColor = 'Preto';
  const nativePlay = typeof viewer.play === 'function' ? viewer.play.bind(viewer) : null;
  const nativePause = typeof viewer.pause === 'function' ? viewer.pause.bind(viewer) : null;
  if (nativePlay) {
    try {
      viewer.play = (options) => {
        if (viewer.dataset.msPlaybackAllowed !== '1') return Promise.resolve();
        return nativePlay(options);
      };
    } catch (_) {}
  }

  const setMenu = (open) => {
    sidebar.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };
  trigger.onclick = (event) => { event.stopPropagation(); setMenu(!sidebar.classList.contains('is-open')); };
  document.addEventListener('click', (event) => { if (!sidebar.contains(event.target)) setMenu(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

  const setPlaybackAllowed = (on) => { viewer.dataset.msPlaybackAllowed = on ? '1' : '0'; };
  const pauseViewer = () => { setPlaybackAllowed(false); try { nativePause?.(); } catch (_) {} };

  const currentButton = () => tabs.querySelector('button.active[data-model]');
  const applyFraming = (button=currentButton()) => {
    if (!button) return;
    const key = button.dataset.model || '';
    const framing = FRONT_ORBITS[key] || [button.dataset.orbitTheta || '0deg', button.dataset.orbitPhi || '75deg', button.dataset.orbitRadius || '103%', button.dataset.fov || '28deg'];
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

  const syncPlayUI = () => {
    playButton.innerHTML = `${icon(isPlaying ? 'pause' : 'play')}<span>${isPlaying ? 'Pausar' : 'Reproduzir sequência'}</span>`;
    exploreButton.classList.toggle('is-selected', !isPlaying);
  };

  const setTime = (value) => {
    const duration = Number.isFinite(viewer.duration) && viewer.duration > 0 ? Math.min(48, viewer.duration) : 48;
    const t = Math.max(0, Math.min(duration, Number(value) || 0));
    timeline.max = String(duration);
    timeline.value = String(t);
    timeLabel.textContent = `${t.toFixed(1).padStart(4,'0')} / ${Math.round(duration)}s`;
  };

  const setColor = (name) => {
    selectedColor = name;
    colorLabel.textContent = name;
    controls.querySelectorAll('.fone-swatch').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.color === name)));
    pauseViewer();
    isPlaying = false;
    try { viewer.variantName = name; } catch (_) {}
    syncPlayUI();
  };

  const activate = async (button) => {
    if (!button) return;
    const model = button.dataset.model || '';
    tabs.querySelectorAll('button[data-model]').forEach((b) => b.classList.toggle('active', b === button));
    setMenu(false);
    pauseViewer();
    isPlaying = false;
    viewer.dataset.currentModel = model;
    applyCapabilities(button);
    syncPlayUI();

    if (model === 'fone-tune') {
      title.textContent = 'Forma em movimento.';
      section.classList.add('is-asset-loading');
      viewer.dataset.src = '';
      viewer.removeAttribute('autoplay');
      try { viewer.removeAttribute('src'); } catch (_) {}
      viewer.alt = button.dataset.alt || 'Fone 3D';
      applyFraming(button);
      try {
        if (viewer.src !== FONE_SRC) viewer.src = FONE_SRC;
      } catch (_) {
        viewer.setAttribute('src', FONE_SRC);
      }
      return;
    }

    controls.hidden = true;
    colorControls.hidden = true;
    playbackControls.hidden = true;
    section.classList.remove('is-fone-active','is-asset-loading');
    if (stageNote) stageNote.hidden = false;
    viewer.dataset.src = '';
    viewer.removeAttribute('autoplay');
    if (button.dataset.alt) viewer.alt = button.dataset.alt;
    applyFraming(button);
    const src = button.dataset.src || '';
    if (src) {
      try { if (viewer.src !== src) viewer.src = src; }
      catch (_) { viewer.setAttribute('src', src); }
    }
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
    if (!button) return;
    requestAnimationFrame(() => requestAnimationFrame(() => applyFraming(button)));
    if (button.dataset.model === 'fone-tune') {
      section.classList.remove('is-asset-loading');
      try {
        const animations = viewer.availableAnimations || [];
        if (animations.length) viewer.animationName = animations[0];
        viewer.currentTime = 0;
        viewer.variantName = selectedColor;
      } catch (_) {}
      pauseViewer();
      isPlaying = false;
      setTime(0);
      setColor(selectedColor);
    } else {
      pauseViewer();
    }
  });

  viewer.addEventListener('error', () => {
    if (viewer.dataset.currentModel !== 'fone-tune') return;
    section.classList.add('is-asset-loading');
    title.textContent = 'Não foi possível carregar o fone.';
    try { viewer.removeAttribute('src'); } catch (_) {}
  });

  viewer.addEventListener('timeupdate', () => {
    if (viewer.dataset.currentModel !== 'fone-tune') return;
    setTime(viewer.currentTime || 0);
    const duration = Number.isFinite(viewer.duration) && viewer.duration > 0 ? viewer.duration : 48;
    if (isPlaying && (viewer.currentTime || 0) >= duration - 0.03) {
      isPlaying = false;
      pauseViewer();
      syncPlayUI();
    }
  });

  playButton.addEventListener('click', () => {
    if (viewer.dataset.currentModel !== 'fone-tune') return;
    if (isPlaying) {
      pauseViewer();
      isPlaying = false;
    } else {
      try {
        const animations = viewer.availableAnimations || [];
        if (animations.length) viewer.animationName = animations[0];
        const duration = Number.isFinite(viewer.duration) && viewer.duration > 0 ? viewer.duration : 48;
        if ((viewer.currentTime || 0) >= duration - 0.03) viewer.currentTime = 0;
        setPlaybackAllowed(true);
        nativePlay?.({repetitions:1});
        isPlaying = true;
      } catch (_) {}
    }
    syncPlayUI();
  });

  replayButton.addEventListener('click', () => {
    if (viewer.dataset.currentModel !== 'fone-tune') return;
    try {
      pauseViewer();
      viewer.currentTime = 0;
      const animations = viewer.availableAnimations || [];
      if (animations.length) viewer.animationName = animations[0];
      setPlaybackAllowed(true);
      nativePlay?.({repetitions:1});
      isPlaying = true;
    } catch (_) {}
    setTime(0);
    syncPlayUI();
  });

  exploreButton.addEventListener('click', () => {
    if (viewer.dataset.currentModel !== 'fone-tune') return;
    pauseViewer();
    isPlaying = false;
    syncPlayUI();
  });

  timeline.addEventListener('input', () => {
    if (viewer.dataset.currentModel !== 'fone-tune') return;
    pauseViewer();
    isPlaying = false;
    try { viewer.currentTime = Number(timeline.value); } catch (_) {}
    setTime(timeline.value);
    syncPlayUI();
  });

  controls.querySelectorAll('.fone-swatch').forEach((button) => button.addEventListener('click', () => {
    if (viewer.dataset.currentModel !== 'fone-tune') return;
    setColor(button.dataset.color || 'Preto');
  }));

  viewer.dataset.src = '';
  viewer.removeAttribute('autoplay');
  try { viewer.removeAttribute('src'); } catch (_) {}
  section.classList.add('is-asset-loading');
  foneButton.classList.add('active');
  applyCapabilities(foneButton);
  activate(foneButton);
})();
