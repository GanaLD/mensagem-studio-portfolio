(() => {
  'use strict';

  const host = document.querySelector('.projects-shader');
  const section = host ? host.closest('main') : null;
  if (!host || !section || host.dataset.auroraRendererMounted === '1') return;

  host.dataset.auroraRendererMounted = '1';

  const canvas = document.createElement('canvas');
  canvas.className = 'projects-aurora-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);

  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  if (!ctx) {
    host.dataset.shaderState = 'fallback-css';
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 700px)').matches;
  const fps = reduceMotion ? 18 : (mobile ? 30 : 45);
  const frameInterval = 1000 / fps;
  const startTime = performance.now();

  let running = true;
  let visible = true;
  let raf = 0;
  let lastFrame = 0;
  let cssWidth = 0;
  let cssHeight = 0;
  let dpr = 1;
  let frameCount = 0;

  host.classList.add('aurora-ready');
  host.dataset.shaderState = 'running-canvas2d';
  host.dataset.auroraRenderer = 'canvas2d';

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function resize() {
    const viewportWidth = window.visualViewport?.width || document.documentElement.clientWidth || window.innerWidth || 1440;
    const viewportHeight = window.visualViewport?.height || document.documentElement.clientHeight || window.innerHeight || 900;

    cssWidth = clamp(host.clientWidth || viewportWidth, 320, 2560);
    cssHeight = clamp(viewportHeight, 320, 1600);
    dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.0 : 1.2);

    const width = Math.round(cssWidth * dpr);
    const height = Math.round(cssHeight * dpr);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = cssWidth + 'px';
      canvas.style.height = cssHeight + 'px';
    }

    positionCanvas();
  }

  function positionCanvas() {
    const rect = section.getBoundingClientRect();
    const maxY = Math.max(0, rect.height - window.innerHeight);
    const y = clamp(-rect.top, 0, maxY);
    canvas.style.transform = `translate3d(0,${Math.round(y)}px,0) scale(1.045)`;
  }

  function waveY(x, layer, t) {
    const movingX = x + t * layer.travel;
    const phase = t * layer.speed + layer.phase;

    return (
      layer.y +
      Math.sin(movingX * layer.freq + phase) * layer.amp +
      Math.sin(movingX * layer.freq2 - phase * 0.58 + layer.phase * 1.7) * layer.amp2 +
      Math.sin(movingX * 0.0021 + phase * 0.24) * layer.amp3
    );
  }

  function drawBand(layer, t) {
    const width = canvas.width;
    const step = Math.max(18 * dpr, width / 76);
    const thickness = layer.thickness * dpr;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = layer.alpha;

    const gradient = ctx.createLinearGradient(0, 0, width, canvas.height);
    gradient.addColorStop(0.00, 'rgba(5,27,78,0.02)');
    gradient.addColorStop(0.22, layer.c1);
    gradient.addColorStop(0.52, layer.c2);
    gradient.addColorStop(0.78, layer.c3);
    gradient.addColorStop(1.00, 'rgba(4,24,70,0.02)');
    ctx.fillStyle = gradient;

    ctx.beginPath();

    let x = -step;
    let y = waveY(x / dpr, layer, t) * dpr;
    ctx.moveTo(x, y - thickness * 0.55);

    for (x = -step; x <= width + step; x += step) {
      y = waveY(x / dpr, layer, t) * dpr;
      ctx.lineTo(x, y - thickness * 0.55);
    }

    for (x = width + step; x >= -step; x -= step) {
      y = waveY(x / dpr, layer, t) * dpr;
      ctx.lineTo(x, y + thickness * 0.55);
    }

    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = layer.alpha * 0.45;
    ctx.strokeStyle = layer.edge;
    ctx.lineWidth = Math.max(1, 2 * dpr);
    ctx.beginPath();

    for (x = -step; x <= width + step; x += step) {
      y = waveY(x / dpr, layer, t) * dpr;
      if (x === -step) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();
    ctx.restore();
  }

  function draw(now) {
    const width = canvas.width;
    const height = canvas.height;
    const seconds = (now - startTime) / 1000;
    const t = seconds * (reduceMotion ? 0.26 : 0.78);

    frameCount += 1;
    host.dataset.auroraFrame = String(frameCount);
    host.dataset.auroraTime = seconds.toFixed(2);

    const base = ctx.createLinearGradient(0, 0, 0, height);
    base.addColorStop(0, '#020821');
    base.addColorStop(0.48, '#061b45');
    base.addColorStop(1, '#020821');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, width, height);

    const vh = cssHeight;
    const layers = [
      {
        y: vh * 0.18,
        amp: 54,
        amp2: 24,
        amp3: 18,
        freq: 0.0062,
        freq2: 0.0108,
        speed: 0.82,
        travel: 46,
        phase: 0.2,
        thickness: 150,
        alpha: 0.42,
        c1: 'rgba(10,58,145,0.30)',
        c2: 'rgba(34,108,218,0.54)',
        c3: 'rgba(75,157,232,0.26)',
        edge: 'rgba(112,186,255,0.18)'
      },
      {
        y: vh * 0.48,
        amp: 68,
        amp2: 31,
        amp3: 24,
        freq: 0.0050,
        freq2: 0.0090,
        speed: -0.64,
        travel: -38,
        phase: 2.25,
        thickness: 205,
        alpha: 0.48,
        c1: 'rgba(7,47,128,0.26)',
        c2: 'rgba(24,91,201,0.58)',
        c3: 'rgba(70,150,226,0.32)',
        edge: 'rgba(94,175,246,0.18)'
      },
      {
        y: vh * 0.78,
        amp: 50,
        amp2: 23,
        amp3: 18,
        freq: 0.0057,
        freq2: 0.0101,
        speed: 0.52,
        travel: 34,
        phase: 4.55,
        thickness: 180,
        alpha: 0.36,
        c1: 'rgba(6,38,110,0.22)',
        c2: 'rgba(20,78,182,0.46)',
        c3: 'rgba(59,136,214,0.25)',
        edge: 'rgba(82,159,232,0.15)'
      }
    ];

    ctx.save();
    ctx.filter = `blur(${Math.max(14, 22 * dpr)}px)`;
    layers.forEach(layer => drawBand(layer, t));
    ctx.restore();

    const sweepX = width * (0.18 + 0.64 * (0.5 + 0.5 * Math.sin(t * 0.34)));
    const sweep = ctx.createRadialGradient(
      sweepX, height * 0.50, 0,
      sweepX, height * 0.50, Math.max(width, height) * 0.46
    );
    sweep.addColorStop(0, 'rgba(54,129,230,0.09)');
    sweep.addColorStop(0.45, 'rgba(29,86,185,0.035)');
    sweep.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sweep;
    ctx.fillRect(0, 0, width, height);

    const vignette = ctx.createRadialGradient(
      width * 0.5, height * 0.48, Math.min(width, height) * 0.16,
      width * 0.5, height * 0.48, Math.max(width, height) * 0.74
    );
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,3,18,0.36)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }

  function frame(now) {
    if (!running) return;

    if (visible && !document.hidden && now - lastFrame >= frameInterval) {
      lastFrame = now;
      positionCanvas();
      draw(now);
    }

    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running && raf) return;
    running = true;
    host.dataset.shaderState = 'running-canvas2d';
    raf = requestAnimationFrame(frame);
  }

  function pause() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    host.dataset.shaderState = 'paused-canvas2d';
  }

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        visible = !!entries[0]?.isIntersecting;
        if (visible) start();
      }, { threshold: 0 })
    : null;

  if (io) io.observe(section);

  const ro = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
  if (ro) ro.observe(section);

  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) start();
  });

  window.MSProjectsAurora = {
    start,
    pause,
    resize,
    state: () => ({
      renderer: 'canvas2d',
      running,
      visible,
      reducedMotion: reduceMotion
    })
  };

  resize();
  draw(performance.now());
  raf = requestAnimationFrame(frame);
})();