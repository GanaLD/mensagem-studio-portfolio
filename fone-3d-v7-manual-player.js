(() => {
  const section = document.getElementById('three');
  const stageMain = section?.querySelector('.stage-main');
  const tabs = document.getElementById('modelTabs');
  const controls = document.getElementById('foneControls');
  if (!section || !stageMain || !tabs || !controls) return;

  section.dataset.threePreviewFix = '20260926-v7-manual-player';

  const FRONT = {
    'fone-tune': ['0deg','78deg','135%','28deg'],
    'black-skull-creatine-v2': ['180deg','75deg','103%','28deg'],
    'arma-cyberpunk': ['0deg','75deg','103%','28deg'],
    'arma-cyberpunk-v2': ['0deg','75deg','103%','28deg'],
    'rejuvital': ['180deg','75deg','92%','25deg'],
    'rejuvital-4ml': ['180deg','75deg','92%','25deg'],
    'arencia-cleansing-balm': ['25deg','68deg','118%','28deg']
  };

  // Only Black and Blue remain for the headphone.
  controls.querySelectorAll('.fone-swatch[data-color="Branco"]').forEach(el => el.remove());

  const timeline = controls.querySelector('#foneTimeline');
  const timeLabel = controls.querySelector('#foneTime');
  const colorLabel = controls.querySelector('#foneColorName');
  const playButton = controls.querySelector('#fonePlay');
  const replayButton = controls.querySelector('#foneReplay');

  let viewer = document.getElementById('modelViewer3D');
  let sectionVisible = false;
  let manualPlaying = false;
  let manualColor = null;
  let scrubbing = false;
  let lastTs = 0;
  let current = 0;
  let duration = 48;

  const activeKey = () => viewer?.dataset?.currentModel || tabs.querySelector('button.active[data-model]')?.dataset?.model || '';

  const icon = (name) => {
    const attrs='viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    if(name==='pause') return `<svg ${attrs}><path d="M8 5v14M16 5v14"/></svg>`;
    return `<svg ${attrs}><path d="m8 5 11 7-11 7V5Z"/></svg>`;
  };

  const syncPlayUI = () => {
    if (!playButton) return;
    playButton.innerHTML = `${icon(manualPlaying ? 'pause' : 'play')}<span>${manualPlaying ? 'Pausar · 2×' : 'Reproduzir · 2×'}</span>`;
  };

  const syncColorUI = (name) => {
    const safe = name === 'Azul' ? 'Azul' : 'Preto';
    if (colorLabel) colorLabel.textContent = safe;
    controls.querySelectorAll('.fone-swatch').forEach(s => s.setAttribute('aria-pressed', String(s.dataset.color === safe)));
  };

  const setVariant = (name) => {
    if (!viewer?.loaded || activeKey() !== 'fone-tune') return;
    const safe = name === 'Azul' ? 'Azul' : 'Preto';
    try { if (viewer.variantName !== safe) viewer.variantName = safe; } catch (_) {}
    syncColorUI(safe);
  };

  const syncTimeUI = () => {
    if (timeline) {
      timeline.max = String(duration);
      if (!scrubbing) timeline.value = String(current);
      timeline.style.setProperty('--track-progress', `${duration ? (current / duration) * 100 : 0}%`);
    }
    if (timeLabel) timeLabel.textContent = `${current.toFixed(1).padStart(4,'0')} / ${duration.toFixed(1)}s · 2×`;
    setVariant(manualColor || (current < duration / 2 ? 'Preto' : 'Azul'));
  };

  const applyFront = (target, key) => {
    const frame = FRONT[key];
    if (!target || !frame) return;
    const [theta, phi, radius, fov] = frame;
    try { target.updateFraming?.(); } catch (_) {}
    try {
      target.cameraTarget = 'auto auto auto';
      target.setAttribute('camera-target','auto auto auto');
      target.cameraOrbit = `${theta} ${phi} ${radius}`;
      target.setAttribute('camera-orbit', `${theta} ${phi} ${radius}`);
      target.fieldOfView = fov;
      target.setAttribute('field-of-view', fov);
      target.jumpCameraToGoal?.();
    } catch (_) {}
  };

  const settleFront = (target, key) => {
    const run = () => {
      if (target !== document.getElementById('modelViewer3D') || activeKey() !== key) return;
      applyFront(target, key);
    };
    requestAnimationFrame(() => requestAnimationFrame(run));
    [50,160,360,700].forEach(ms => setTimeout(run, ms));
  };

  const configureViewer = (target) => {
    if (!target || target === viewer && target.dataset.v7Bound === '1') return;
    viewer = target;
    viewer.dataset.v7Bound = '1';
    const key = activeKey();
    const ready = () => {
      if (target !== document.getElementById('modelViewer3D')) return;
      const k = activeKey();
      settleFront(target, k);
      if (k === 'fone-tune') {
        try { target.pause?.(); } catch (_) {}
        try {
          const names = target.availableAnimations || [];
          if (names.length) target.animationName = names[0];
        } catch (_) {}
        const d = Number(target.duration);
        duration = Number.isFinite(d) && d > 0 ? d : 48;
        current = 0;
        try { target.currentTime = 0; } catch (_) {}
        manualColor = null;
        manualPlaying = sectionVisible;
        setVariant('Preto');
        syncPlayUI();
        syncTimeUI();
      } else {
        manualPlaying = false;
        manualColor = null;
        syncPlayUI();
      }
    };
    target.addEventListener('load', ready);
    if (target.loaded) ready();
  };

  configureViewer(viewer);
  const mo = new MutationObserver(() => configureViewer(document.getElementById('modelViewer3D')));
  mo.observe(stageMain, { childList:true });

  tabs.querySelectorAll('button[data-model]').forEach(button => {
    const key = button.dataset.model || '';
    if (FRONT[key]) button.dataset.orbitTheta = FRONT[key][0];
  });

  tabs.addEventListener('click', event => {
    const button = event.target.closest('button[data-model]');
    if (!button) return;
    const key = button.dataset.model || '';
    manualPlaying = false;
    manualColor = null;
    lastTs = 0;
    setTimeout(() => {
      configureViewer(document.getElementById('modelViewer3D'));
      if (viewer?.loaded) settleFront(viewer, key);
      if (key === 'fone-tune' && viewer?.loaded) {
        current = 0;
        try { viewer.pause?.(); viewer.currentTime = 0; } catch (_) {}
        manualPlaying = sectionVisible;
        syncPlayUI();
        syncTimeUI();
      }
    }, 0);
  });

  // Capture-phase handlers replace the V5 player controls with deterministic manual playback.
  playButton?.addEventListener('click', event => {
    if (activeKey() !== 'fone-tune') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    manualColor = null;
    if (current >= duration - 0.01) current = 0;
    manualPlaying = !manualPlaying;
    lastTs = 0;
    try { viewer.pause?.(); } catch (_) {}
    syncPlayUI();
    syncTimeUI();
  }, true);

  replayButton?.addEventListener('click', event => {
    if (activeKey() !== 'fone-tune') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    manualColor = null;
    current = 0;
    manualPlaying = true;
    lastTs = 0;
    try { viewer.pause?.(); viewer.currentTime = 0; } catch (_) {}
    syncPlayUI();
    syncTimeUI();
  }, true);

  timeline?.addEventListener('pointerdown', () => { scrubbing = true; }, true);
  addEventListener('pointerup', () => { scrubbing = false; }, { passive:true });
  timeline?.addEventListener('input', event => {
    if (activeKey() !== 'fone-tune') return;
    event.stopImmediatePropagation();
    manualPlaying = false;
    manualColor = null;
    current = Math.max(0, Math.min(duration, Number(timeline.value) || 0));
    lastTs = 0;
    try { viewer.pause?.(); viewer.currentTime = current; } catch (_) {}
    syncPlayUI();
    syncTimeUI();
  }, true);

  controls.querySelectorAll('.fone-swatch').forEach(swatch => swatch.addEventListener('click', event => {
    if (activeKey() !== 'fone-tune') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    manualPlaying = false;
    manualColor = swatch.dataset.color === 'Azul' ? 'Azul' : 'Preto';
    lastTs = 0;
    try { viewer.pause?.(); } catch (_) {}
    setVariant(manualColor);
    syncPlayUI();
  }, true));

  const io = new IntersectionObserver(entries => {
    sectionVisible = entries.some(e => e.isIntersecting && e.intersectionRatio >= 0.15);
    if (activeKey() !== 'fone-tune' || !viewer?.loaded) return;
    if (sectionVisible && !manualColor) {
      manualPlaying = true;
      lastTs = 0;
    } else if (!sectionVisible) {
      manualPlaying = false;
      lastTs = 0;
    }
    syncPlayUI();
  }, { threshold:[0,.15,.35] });
  io.observe(section);

  const tick = ts => {
    if (activeKey() === 'fone-tune' && viewer?.loaded) {
      const d = Number(viewer.duration);
      if (Number.isFinite(d) && d > 0) duration = d;
      if (manualPlaying && sectionVisible && !scrubbing) {
        if (!lastTs) lastTs = ts;
        const dt = Math.min(.1, Math.max(0, (ts - lastTs) / 1000));
        lastTs = ts;
        current += dt * 2;
        if (current >= duration) current = current % duration;
        try { viewer.pause?.(); viewer.currentTime = current; } catch (_) {}
      } else {
        lastTs = ts;
        const actual = Number(viewer.currentTime);
        if (!scrubbing && Number.isFinite(actual)) current = Math.max(0, Math.min(duration, actual));
      }
      syncTimeUI();
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();
