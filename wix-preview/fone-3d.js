(() => {
  const section = document.getElementById('three');
  const viewer = document.getElementById('modelViewer3D');
  const sidebar = section?.querySelector('.three-sidebar');
  const tabs = document.getElementById('modelTabs');
  const stageMain = section?.querySelector('.stage-main');
  if (!section || !viewer || !sidebar || !tabs || !stageMain) return;

  const build = '20260926-fone-radial-preview-v1';
  section.dataset.fonePreviewBuild = build;

  const intro = section.querySelector('.three-intro-copy');
  if (intro) intro.textContent = 'Ambientes e produtos em 3D para explorar diretamente na página. Abra o seletor, escolha um asset e interaja diretamente no viewer.';

  const palette = {
    'PBR • Charcoal microtextured polymer': [[.021,.022,.023],[.79,.8,.79],[.065,.087,.255]],
    'PBR • Satin graphite caps': [[.019,.02,.021],[.72,.735,.73],[.048,.062,.205]],
    'PBR • Polished black details': [[.009,.01,.011],[.54,.56,.55],[.026,.034,.12]],
    'PBR • Raised black logotypes': [[.029,.031,.033],[.92,.92,.9],[.033,.044,.16]],
    'PBR • Soft black synthetic leather': [[.012,.013,.014],[.66,.68,.67],[.037,.05,.14]],
    'PBR • Woven acoustic textile': [[.006,.007,.008],[.47,.49,.48],[.014,.024,.065]],
    'PBR • Charcoal seam thread': [[.025,.025,.024],[.62,.64,.63],[.047,.06,.16]],
    'PBR • Textile markings': [[.021,.023,.024],[.65,.67,.66],[.068,.09,.23]],
    'PBR • Elastomer seals': [[.008,.008,.008],[.38,.4,.39],[.018,.025,.07]]
  };
  const colorNames = ['Preto','Branco','Azul'];
  const foneChunks = [
    './assets/fone-preview-01.txt',
    './assets/fone-preview-02.txt',
    './assets/fone-preview-03.txt',
    './assets/fone-preview-04.txt'
  ];
  let foneObjectUrl = '';
  let foneLoadPromise = null;
  let foneColor = 0;
  let sequenceMode = false;
  let isPlaying = false;

  const loadFoneUrl = async () => {
    if (foneObjectUrl) return foneObjectUrl;
    if (!foneLoadPromise) {
      foneLoadPromise = Promise.all(foneChunks.map((url) => fetch(url, {cache:'force-cache'}).then((r) => {
        if (!r.ok) throw new Error(`fone chunk ${r.status}`);
        return r.text();
      }))).then((parts) => {
        foneObjectUrl = URL.createObjectURL(new Blob([parts.join('')], {type:'model/gltf+json'}));
        return foneObjectUrl;
      });
    }
    return foneLoadPromise;
  };

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

  const oldButtons = [...tabs.querySelectorAll('button[data-src]')];
  oldButtons.forEach((button) => {
    button.dataset.label = button.textContent.trim();
    button.classList.remove('active');
  });

  const foneButton = document.createElement('button');
  foneButton.type = 'button';
  foneButton.dataset.model = 'fone-tune';
  foneButton.dataset.label = 'Fone';
  foneButton.dataset.alt = 'Fone em visualização 3D interativa e animada';
  foneButton.dataset.orbitTheta = '0deg';
  foneButton.dataset.orbitPhi = '78deg';
  foneButton.dataset.orbitRadius = '118%';
  foneButton.dataset.fov = '26deg';
  foneButton.setAttribute('aria-label','Fone');
  tabs.prepend(foneButton);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.id = 'threeAssetTrigger';
  trigger.className = 'three-command-trigger';
  trigger.setAttribute('aria-label','Abrir modelos 3D');
  trigger.setAttribute('aria-expanded','false');
  trigger.innerHTML = `${icon('grid')}<span>MODELOS</span>`;
  sidebar.prepend(trigger);

  const menuButtons = [...tabs.querySelectorAll('button')];
  menuButtons.forEach((button, index) => {
    const label = button.dataset.label || button.textContent.trim();
    const key = button.dataset.model || '';
    let iconName = 'box';
    if (key === 'fone-tune') iconName = 'headphones';
    else if (key.includes('arma')) iconName = 'crosshair';
    else if (key.includes('rejuvital')) iconName = 'flask';
    else if (key.includes('arencia')) iconName = 'package';
    button.innerHTML = `${icon(iconName)}<span class="three-command-tooltip">${label}</span>`;
    button.style.setProperty('--command-index', String(index));
    button.setAttribute('aria-label', label);
  });

  const controls = document.createElement('div');
  controls.id = 'foneControls';
  controls.className = 'fone-controls';
  controls.hidden = true;
  controls.innerHTML = `
    <div class="fone-topbar">
      <div class="fone-title"><small>FONE / 3D INTERATIVO</small><strong>Forma em movimento.</strong></div>
      <div class="fone-colors" aria-label="Escolher cor">
        <span id="foneColorName">Preto</span>
        <button type="button" class="fone-swatch" data-color="0" aria-label="Preto" aria-pressed="true"></button>
        <button type="button" class="fone-swatch" data-color="1" aria-label="Branco" aria-pressed="false"></button>
        <button type="button" class="fone-swatch" data-color="2" aria-label="Azul" aria-pressed="false"></button>
      </div>
    </div>
    <div class="fone-player">
      <div class="fone-track"><input id="foneTimeline" type="range" min="0" max="48" step="0.01" value="0" aria-label="Momento da animação"><span id="foneTime">00.0 / 48s</span></div>
      <div class="fone-actions">
        <button type="button" id="fonePlay" class="primary">${icon('play')}<span>Reproduzir sequência</span></button>
        <button type="button" id="foneReplay">${icon('rotate')}<span>Recomeçar</span></button>
        <button type="button" id="foneExplore">Explorar</button>
        <small>ARRASTE · GIRE · ZOOM</small>
      </div>
    </div>`;
  stageMain.appendChild(controls);

  const timeline = controls.querySelector('#foneTimeline');
  const timeLabel = controls.querySelector('#foneTime');
  const playButton = controls.querySelector('#fonePlay');
  const replayButton = controls.querySelector('#foneReplay');
  const exploreButton = controls.querySelector('#foneExplore');
  const colorLabel = controls.querySelector('#foneColorName');

  const style = document.createElement('style');
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
    #three .fone-controls[hidden]{display:none!important}
    #three .fone-topbar{position:absolute;top:26px;left:26px;right:26px;display:flex;align-items:flex-start;justify-content:space-between;gap:20px;pointer-events:none}
    #three .fone-title{display:flex;flex-direction:column;gap:7px;text-shadow:0 4px 24px rgba(0,0,0,.55)}
    #three .fone-title small{font-size:9px;letter-spacing:.18em;color:rgba(255,255,255,.66)}
    #three .fone-title strong{font-size:24px;font-weight:500;letter-spacing:-.04em}
    #three .fone-colors{display:flex;align-items:center;gap:11px;pointer-events:auto;padding:9px 12px;border:1px solid rgba(255,255,255,.14);background:rgba(5,8,6,.38);border-radius:999px;backdrop-filter:blur(14px)}
    #three .fone-colors>span{font-size:9px;min-width:42px;color:rgba(255,255,255,.72)}
    #three .fone-swatch{width:26px!important;height:26px!important;min-height:26px!important;padding:0!important;border-radius:50%!important;border:1px solid rgba(255,255,255,.35)!important;position:relative;background:#20232a!important}
    #three .fone-swatch[data-color="1"]{background:#e7e8e5!important}#three .fone-swatch[data-color="2"]{background:#4654a0!important}
    #three .fone-swatch[aria-pressed="true"]:after{content:"";position:absolute;inset:-5px;border:1px solid var(--lime);border-radius:50%}
    #three .fone-player{position:absolute;left:26px;right:26px;bottom:24px;padding:14px 16px 13px;border:1px solid rgba(255,255,255,.14);background:rgba(4,7,5,.38);border-radius:18px;backdrop-filter:blur(16px);pointer-events:auto;box-shadow:0 16px 50px rgba(0,0,0,.18)}
    #three .fone-track{display:flex;align-items:center;gap:14px;margin-bottom:12px}#three .fone-track input{width:100%;accent-color:var(--lime)}#three .fone-track span{min-width:66px;text-align:right;font-size:9px;color:rgba(255,255,255,.72);font-variant-numeric:tabular-nums}
    #three .fone-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}#three .fone-actions button{min-height:38px;padding:0 15px;border-radius:999px;border:1px solid rgba(255,255,255,.19);background:rgba(6,9,7,.44);color:#fff;display:inline-flex;align-items:center;gap:7px;font-size:10px}#three .fone-actions button.primary{background:rgba(239,244,235,.94);color:#101310;border-color:transparent}#three .fone-actions button.is-selected{border-color:var(--lime);color:var(--lime)}#three .fone-actions small{margin-left:auto;font-size:8px;letter-spacing:.13em;color:rgba(255,255,255,.58)}
    @media(max-width:760px){#three .three-project-stage,#three .three-project-stage .stage-main{min-height:70svh!important;height:70svh!important}#three .three-sidebar{left:-28px!important;top:48%!important;transform:translateY(-50%) scale(.82)!important}.three-command-tooltip{display:none!important}#three .fone-topbar{top:16px;left:16px;right:16px}.fone-title strong{font-size:19px!important}.fone-title small{font-size:8px!important}#three .fone-colors{padding:7px 9px;gap:8px}#three .fone-colors>span{display:none}#three .fone-swatch{width:22px!important;height:22px!important;min-height:22px!important}#three .fone-player{left:14px;right:14px;bottom:14px;padding:12px;border-radius:14px}#three .fone-actions button{min-height:36px;padding:0 11px}#three .fone-actions small{display:none}#three .stage-note-3d{right:12px!important;top:12px!important}}
    @media(prefers-reduced-motion:reduce){#three #modelTabs button,#three .three-command-trigger{transition:none!important}}
  `;
  document.head.appendChild(style);

  const setMenu = (open) => {
    sidebar.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };
  trigger.addEventListener('click', (event) => { event.stopPropagation(); setMenu(!sidebar.classList.contains('is-open')); });
  document.addEventListener('click', (event) => { if (!sidebar.contains(event.target)) setMenu(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

  const setColor = (index, {manual=true} = {}) => {
    foneColor = index;
    if (manual) sequenceMode = false;
    colorLabel.textContent = colorNames[index];
    controls.querySelectorAll('.fone-swatch').forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.color) === index)));
    try {
      const materials = viewer.model?.materials || [];
      materials.forEach((material) => {
        const colors = palette[material.name];
        if (!colors) return;
        material.pbrMetallicRoughness.setBaseColorFactor([...colors[index],1]);
      });
    } catch (_) {}
  };

  const syncPlayUI = () => {
    playButton.innerHTML = `${icon(isPlaying ? 'pause' : 'play')}<span>${isPlaying ? 'Pausar' : 'Reproduzir sequência'}</span>`;
    exploreButton.classList.toggle('is-selected', !sequenceMode);
  };

  const setTime = (time) => {
    const t = Math.max(0, Math.min(48, Number(time) || 0));
    timeline.value = String(t);
    timeLabel.textContent = `${t.toFixed(1).padStart(4,'0')} / 48s`;
    if (sequenceMode) setColor(t < 24 ? 0 : t < 36 ? 1 : 2, {manual:false});
  };

  const useFone = async () => {
    viewer.dataset.currentModel = 'fone-tune';
    section.classList.add('is-fone-active');
    controls.hidden = false;
    viewer.removeAttribute('autoplay');
    viewer.setAttribute('shadow-intensity','0.65');
    viewer.setAttribute('shadow-softness','0.9');
    viewer.setAttribute('exposure','1.02');
    viewer.setAttribute('environment-image','neutral');
    viewer.alt = foneButton.dataset.alt;
    viewer.cameraTarget = 'auto auto auto';
    viewer.cameraOrbit = '0deg 78deg 118%';
    viewer.fieldOfView = '26deg';
    try {
      const url = await loadFoneUrl();
      if (viewer.dataset.currentModel !== 'fone-tune') return;
      if (viewer.src !== url) viewer.src = url;
    } catch (error) {
      console.error('[Fone 3D preview] asset load failed', error);
      controls.querySelector('.fone-title strong').textContent = 'Não foi possível carregar o fone.';
    }
  };

  const leaveFone = () => {
    section.classList.remove('is-fone-active');
    controls.hidden = true;
    sequenceMode = false;
    isPlaying = false;
    try { viewer.pause(); } catch (_) {}
    syncPlayUI();
    viewer.setAttribute('autoplay','');
    viewer.setAttribute('shadow-intensity','1.15');
    viewer.setAttribute('shadow-softness','0.8');
    viewer.setAttribute('exposure','1.08');
  };

  tabs.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-model]');
    if (!button) return;
    tabs.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === button));
    setMenu(false);
    const model = button.dataset.model || '';
    viewer.dataset.currentModel = model;
    if (model === 'fone-tune') {
      await useFone();
      return;
    }
    leaveFone();
    if (button.dataset.alt) viewer.alt = button.dataset.alt;
    if (button.dataset.src && viewer.src !== button.dataset.src) viewer.src = button.dataset.src;
  }, true);

  viewer.addEventListener('load', () => {
    if (viewer.dataset.currentModel !== 'fone-tune') return;
    try {
      const animations = viewer.availableAnimations || [];
      if (animations.length) viewer.animationName = animations[0];
      viewer.pause();
      viewer.currentTime = 0;
    } catch (_) {}
    isPlaying = false;
    sequenceMode = false;
    setTime(0);
    setColor(foneColor, {manual:false});
    syncPlayUI();
  });

  viewer.addEventListener('timeupdate', () => {
    if (viewer.dataset.currentModel !== 'fone-tune') return;
    setTime(viewer.currentTime || 0);
    if (sequenceMode && (viewer.currentTime || 0) >= 47.98) {
      isPlaying = false;
      syncPlayUI();
    }
  });

  playButton.addEventListener('click', () => {
    if (viewer.dataset.currentModel !== 'fone-tune') return;
    sequenceMode = true;
    if (isPlaying) {
      try { viewer.pause(); } catch (_) {}
      isPlaying = false;
    } else {
      try {
        if ((viewer.currentTime || 0) >= 47.95) viewer.currentTime = 0;
        const animations = viewer.availableAnimations || [];
        if (animations.length) viewer.animationName = animations[0];
        viewer.play({repetitions:1});
        isPlaying = true;
      } catch (_) {}
    }
    syncPlayUI();
  });

  replayButton.addEventListener('click', () => {
    sequenceMode = true;
    try {
      viewer.pause();
      viewer.currentTime = 0;
      const animations = viewer.availableAnimations || [];
      if (animations.length) viewer.animationName = animations[0];
      viewer.play({repetitions:1});
      isPlaying = true;
    } catch (_) {}
    setTime(0);
    syncPlayUI();
  });

  exploreButton.addEventListener('click', () => {
    sequenceMode = false;
    isPlaying = false;
    try { viewer.pause(); viewer.currentTime = 0; } catch (_) {}
    setTime(0);
    setColor(foneColor, {manual:false});
    syncPlayUI();
  });

  timeline.addEventListener('input', () => {
    sequenceMode = true;
    isPlaying = false;
    try { viewer.pause(); viewer.currentTime = Number(timeline.value); } catch (_) {}
    setTime(timeline.value);
    syncPlayUI();
  });

  controls.querySelectorAll('.fone-swatch').forEach((button) => button.addEventListener('click', () => {
    isPlaying = false;
    sequenceMode = false;
    try { viewer.pause(); } catch (_) {}
    setColor(Number(button.dataset.color));
    syncPlayUI();
  }));

  foneButton.classList.add('active');
  setMenu(false);
  useFone();
  window.addEventListener('pagehide', () => { if (foneObjectUrl) URL.revokeObjectURL(foneObjectUrl); }, {once:true});
})();