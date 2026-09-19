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

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 700px)').matches;
  const fps = reduced ? 18 : (mobile ? 30 : 45);
  const frameInterval = 1000 / fps;
  const start = performance.now();

  let running = true;
  let visible = true;
  let raf = 0;
  let last = 0;
  let cssW = 0;
  let cssH = 0;
  let dpr = 1;

  host.classList.add('aurora-ready');
  host.dataset.shaderState = 'running-canvas2d';
  host.dataset.auroraRenderer = 'canvas2d';

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function resize() {
    cssW = Math.max(1, host.clientWidth || window.innerWidth);
    cssH = Math.max(1, window.innerHeight);
    dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.0 : 1.2);

    const w = Math.round(cssW * dpr);
    const h = Math.round(cssH * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
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
    const phase = t * layer.speed + layer.phase;
    return (
      layer.y +
      Math.sin(x * layer.freq + phase) * layer.amp +
      Math.sin(x * layer.freq2 - phase * 0.62 + layer.phase * 1.7) * layer.amp2 +
      Math.sin(x * 0.0023 + phase * 0.28) * layer.amp3
    );
  }

  function drawBand(layer, t) {
    const w = canvas.width;
    const h = canvas.height;
    const step = Math.max(20 * dpr, w / 72);
    const thickness = layer.thickness * dpr;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = layer.alpha;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0.00, 'rgba(8,39,104,0.02)');
    grad.addColorStop(0.24, layer.c1);
    grad.addColorStop(0.52, layer.c2);
    grad.addColorStop(0.76, layer.c3);
    grad.addColorStop(1.00, 'rgba(7,31,86,0.02)');
    ctx.fillStyle = grad;

    ctx.beginPath();

    let x = -step;
    const y0 = waveY(x / dpr, layer, t) * dpr;
    ctx.moveTo(x, y0 - thickness * 0.55);

    for (x = -step; x <= w + step; x += step) {
      const y = waveY(x / dpr, layer, t) * dpr;
      ctx.lineTo(x, y - thickness * 0.55);
    }

    for (x = w + step; x >= -step; x -= step) {
      const y = waveY(x / dpr, layer, t) * dpr;
      ctx.lineTo(x, y + thickness * 0.55);
    }

    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = layer.alpha * 0.48;
    ctx.strokeStyle = layer.edge;
    ctx.lineWidth = Math.max(1, 2.2 * dpr);
    ctx.beginPath();

    for (x = -step; x <= w + step; x += step) {
      const y = waveY(x / dpr, layer, t) * dpr;
      if (x === -step) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();
    ctx.restore();
  }

  function draw(now) {
    const w = canvas.width;
    const h = canvas.height;
    const seconds = (now - start) / 1000;
    const t = seconds * (reduced ? 0.22 : 0.62);

    const base = ctx.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0, '#02071b');
    base.addColorStop(0.48, '#03112d');
    base.addColorStop(1, '#02071b');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    const vh = cssH;

    const layers = [
      {
        y: vh * 0.20, amp: 48, amp2: 24, amp3: 16,
        freq: 0.0064, freq2: 0.011, speed: 0.88, phase: 0.2,
        thickness: 150, alpha: 0.38,
        c1: 'rgba(15,62,150,0.28)',
        c2: 'rgba(45,116,220,0.48)',
        c3: 'rgba(83,161,235,0.24)',
        edge: 'rgba(116,184,255,0.16)'
      },
      {
        y: vh * 0.47, amp: 62, amp2: 30, amp3: 22,
        freq: 0.0052, freq2: 0.0092, speed: -0.66, phase: 2.1,
        thickness: 190, alpha: 0.44,
        c1: 'rgba(8,42,112,0.24)',
        c2: 'rgba(28,91,198,0.52)',
        c3: 'rgba(76,151,225,0.30)',
        edge: 'rgba(92,173,245,0.16)'
      },
      {
        y: vh * 0.76, amp: 44, amp2: 22, amp3: 18,
        freq: 0.0058, freq2: 0.0104, speed: 0.54, phase: 4.4,
        thickness: 170, alpha: 0.32,
        c1: 'rgba(7,35,96,0.20)',
        c2: 'rgba(24,79,178,0.42)',
        c3: 'rgba(64,137,214,0.24)',
        edge: 'rgba(84,156,231,0.14)'
      }
    ];

    ctx.save();
    ctx.filter = `blur(${Math.max(16, 24 * dpr)}px)`;
    layers.forEach(layer => drawBand(layer, t));
    ctx.restore();

    // Fine, brighter veil moving independently, still blue only.
    const veilY = (vh * 0.55 + Math.sin(t * 0.72) * 46) * dpr;
    const veil = ctx.createLinearGradient(0, veilY - 90 * dpr, 0, veilY + 90 * dpr);
    veil.addColorStop(0, 'rgba(36,100,210,0)');
    veil.addColorStop(0.5, 'rgba(76,156,235,0.075)');
    veil.addColorStop(1, 'rgba(36,100,210,0)');
    ctx.fillStyle = veil;
    ctx.fillRect(0, veilY - 100 * dpr, w, 200 * dpr);

    // Soft vignette keeps the page midnight-blue and text-friendly.
    const vignette = ctx.createRadialGradient(
      w * 0.5, h * 0.48, Math.min(w, h) * 0.16,
      w * 0.5, h * 0.48, Math.max(w, h) * 0.72
    );
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,4,20,0.38)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
  }

  function loop(now) {
    if (!running) return;

    if (visible && !document.hidden && now - last >= frameInterval) {
      last = now;
      positionCanvas();
      draw(now);
    }

    raf = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (running && raf) return;
    running = true;
    host.dataset.shaderState = 'running-canvas2d';
    raf = requestAnimationFrame(loop);
  }

  function stopLoop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    host.dataset.shaderState = 'paused-canvas2d';
  }

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        const entry = entries[0];
        visible = !!entry?.isIntersecting;
        if (visible) startLoop();
      }, { threshold: 0 })
    : null;

  if (io) io.observe(section);

  const ro = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
  if (ro) ro.observe(section);

  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) startLoop();
  });

  window.MSProjectsAurora = {
    start: startLoop,
    pause: stopLoop,
    resize,
    state: () => ({
      renderer: 'canvas2d',
      running,
      visible,
      reducedMotion: reduced
    })
  };

  resize();
  draw(performance.now());
  raf = requestAnimationFrame(loop);
})();