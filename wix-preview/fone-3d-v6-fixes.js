(() => {
  const section = document.getElementById('three');
  const stageMain = section?.querySelector('.stage-main');
  const tabs = document.getElementById('modelTabs');
  const controls = document.getElementById('foneControls');
  if (!section || !stageMain || !tabs || !controls) return;

  section.dataset.threePreviewFix = '20260926-v6-front-player';

  const FRONT = {
    'fone-tune': ['0deg','78deg','135%','28deg'],
    'black-skull-creatine-v2': ['180deg','75deg','103%','28deg'],
    'arma-cyberpunk': ['0deg','75deg','103%','28deg'],
    'arma-cyberpunk-v2': ['0deg','75deg','103%','28deg'],
    'rejuvital': ['180deg','75deg','92%','25deg'],
    'rejuvital-4ml': ['180deg','75deg','92%','25deg'],
    'arencia-cleansing-balm': ['25deg','68deg','118%','28deg']
  };

  // White is no longer an available headphone color. Only Black and Blue remain.
  controls.querySelectorAll('.fone-swatch[data-color="Branco"]').forEach(el => el.remove());
  const colorLabel = controls.querySelector('#foneColorName');
  const timeline = controls.querySelector('#foneTimeline');
  const timeLabel = controls.querySelector('#foneTime');
  const playButton = controls.querySelector('#fonePlay');
  const replayButton = controls.querySelector('#foneReplay');

  let manualColor = null;
  let scrubbing = false;
  let boundViewer = null;

  const activeKey = () => {
    const viewer = document.getElementById('modelViewer3D');
    return viewer?.dataset?.currentModel || tabs.querySelector('button.active[data-model]')?.dataset?.model || '';
  };

  const applyFront = (viewer, key) => {
    if (!viewer || !FRONT[key]) return;
    const [theta, phi, radius, fov] = FRONT[key];
    try { viewer.updateFraming?.(); } catch (_) {}
    try {
      viewer.cameraTarget = 'auto auto auto';
      viewer.setAttribute('camera-target','auto auto auto');
      viewer.cameraOrbit = `${theta} ${phi} ${radius}`;
      viewer.setAttribute('camera-orbit', `${theta} ${phi} ${radius}`);
      viewer.fieldOfView = fov;
      viewer.setAttribute('field-of-view', fov);
      viewer.jumpCameraToGoal?.();
    } catch (_) {}
  };

  const settleFront = (viewer, key) => {
    const run = () => {
      if (viewer !== document.getElementById('modelViewer3D')) return;
      if (activeKey() !== key) return;
      applyFront(viewer, key);
    };
    requestAnimationFrame(() => requestAnimationFrame(run));
    [60, 180, 420].forEach(ms => setTimeout(run, ms));
  };

  const syncColorUI = (name) => {
    const safe = name === 'Azul' ? 'Azul' : 'Preto';
    if (colorLabel) colorLabel.textContent = safe;
    controls.querySelectorAll('.fone-swatch').forEach(swatch => {
      swatch.setAttribute('aria-pressed', String(swatch.dataset.color === safe));
    });
  };

  const setVariant = (viewer, name) => {
    if (!viewer?.loaded) return;
    const safe = name === 'Azul' ? 'Azul' : 'Preto';
    try {
      if (viewer.variantName !== safe) viewer.variantName = safe;
    } catch (_) {}
    syncColorUI(safe);
  };

  const bindViewer = (viewer) => {
    if (!viewer || viewer === boundViewer) return;
    boundViewer = viewer;
    manualColor = null;
    const onReady = () => {
      const key = viewer.dataset.currentModel || activeKey();
      settleFront(viewer, key);
      if (key === 'fone-tune') {
        try {
          const names = viewer.availableAnimations || [];
          if (names.length && viewer.animationName !== names[0]) viewer.animationName = names[0];
          viewer.timeScale = 2;
        } catch (_) {}
        setVariant(viewer, 'Preto');
      }
    };
    viewer.addEventListener('load', onReady);
    if (viewer.loaded) onReady();
  };

  bindViewer(document.getElementById('modelViewer3D'));
  const observer = new MutationObserver(() => bindViewer(document.getElementById('modelViewer3D')));
  observer.observe(stageMain, { childList:true });

  // Reapply the correct front whenever a model is chosen. This runs after the V5 swap.
  tabs.addEventListener('click', event => {
    const button = event.target.closest('button[data-model]');
    if (!button) return;
    manualColor = null;
    const key = button.dataset.model || '';
    setTimeout(() => {
      const viewer = document.getElementById('modelViewer3D');
      bindViewer(viewer);
      if (viewer?.loaded) settleFront(viewer, key);
    }, 0);
  });

  controls.querySelectorAll('.fone-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const name = swatch.dataset.color === 'Azul' ? 'Azul' : 'Preto';
      manualColor = name;
      setTimeout(() => setVariant(document.getElementById('modelViewer3D'), name), 0);
    });
  });

  playButton?.addEventListener('click', () => { manualColor = null; }, true);
  replayButton?.addEventListener('click', () => { manualColor = null; }, true);
  timeline?.addEventListener('pointerdown', () => { scrubbing = true; });
  addEventListener('pointerup', () => { scrubbing = false; }, { passive:true });
  timeline?.addEventListener('input', () => { manualColor = null; });

  // model-viewer does not reliably emit a DOM timeupdate event in every browser/build.
  // Read currentTime on RAF so the slider and numeric time always follow the GLB animation.
  const tick = () => {
    const viewer = document.getElementById('modelViewer3D');
    const key = activeKey();
    if (viewer && key === 'fone-tune' && controls && !controls.hidden) {
      let duration = Number(viewer.duration);
      if (!Number.isFinite(duration) || duration <= 0) duration = 48;
      let current = Number(viewer.currentTime);
      if (!Number.isFinite(current) || current < 0) current = 0;
      current = Math.min(duration, current);

      if (timeline) {
        timeline.max = String(duration);
        if (!scrubbing) timeline.value = String(current);
        timeline.style.setProperty('--track-progress', `${duration ? (current / duration) * 100 : 0}%`);
      }
      if (timeLabel) timeLabel.textContent = `${current.toFixed(1).padStart(4,'0')} / ${duration.toFixed(1)}s · 2×`;

      // Automatic sequence now has only two variants: Black first half, Blue second half.
      const desired = manualColor || (current < duration / 2 ? 'Preto' : 'Azul');
      setVariant(viewer, desired);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();
