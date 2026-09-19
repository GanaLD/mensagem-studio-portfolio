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
  const fps = reduceMotion ? 20 : (mobile ? 30 : 42);
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
  host.dataset.auroraRenderer = 'canvas2d-organic-white';

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (a, b, t) => a + (b - a) * t;

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

  function baseBackground() {
    const width = canvas.width;
    const height = canvas.height;

    const base = ctx.createLinearGradient(0, 0, 0, height);
    base.addColorStop(0, '#02071a');
    base.addColorStop(0.48, '#071730');
    base.addColorStop(1, '#02071a');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(
      width * 0.52, height * 0.40, 0,
      width * 0.52, height * 0.40, Math.max(width, height) * 0.72
    );
    glow.addColorStop(0, 'rgba(70,112,180,0.10)');
    glow.addColorStop(0.46, 'rgba(28,64,126,0.05)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  function drawSoftMass(mass, t) {
    const width = canvas.width;
    const height = canvas.height;

    const x = (mass.x + Math.sin(t * mass.speed + mass.phase) * mass.dx) * width;
    const y = (mass.y + Math.cos(t * mass.speed * 0.78 + mass.phase) * mass.dy) * height;
    const rx = mass.rx * width;
    const ry = mass.ry * height;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(mass.rotation + Math.sin(t * mass.speed * 0.33 + mass.phase) * 0.12);
    ctx.scale(1, ry / Math.max(rx, 1));

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    gradient.addColorStop(0, mass.c0);
    gradient.addColorStop(0.28, mass.c1);
    gradient.addColorStop(0.62, mass.c2);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = mass.alpha;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function centreLine(nx, veil, t) {
    const drift = nx + t * veil.travel;
    const main = Math.sin(drift * veil.freq + t * veil.speed + veil.phase) * veil.amp;
    const secondary = Math.sin(drift * veil.freq2 - t * veil.speed * 0.54 + veil.phase * 1.73) * veil.amp2;
    const tertiary = Math.cos(drift * veil.freq3 + t * veil.speed * 0.21 + veil.phase * 2.1) * veil.amp3;
    const broad = Math.sin(nx * Math.PI * 0.86 + veil.phase) * veil.broad;
    return veil.y + main + secondary + tertiary + broad;
  }

  function thicknessAt(nx, veil, t) {
    const a = 0.5 + 0.5 * Math.sin(nx * veil.thickFreq + t * veil.thickSpeed + veil.phase);
    const b = 0.5 + 0.5 * Math.sin(nx * veil.thickFreq2 - t * veil.thickSpeed * 0.48 + veil.phase * 1.7);
    return veil.thickness * (0.56 + a * 0.26 + b * 0.18);
  }

  function drawOrganicVeil(veil, t) {
    const width = canvas.width;
    const height = canvas.height;
    const samples = mobile ? 34 : 46;
    const angle = veil.angle + Math.sin(t * veil.angleSpeed + veil.phase) * veil.angleSwing;
    const travelPx = Math.sin(t * veil.floatSpeed + veil.phase) * veil.floatX * width;

    ctx.save();
    ctx.translate(width * 0.5 + travelPx, height * 0.5);
    ctx.rotate(angle);
    ctx.translate(-width * 0.5, -height * 0.5);
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = veil.alpha;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0.00, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.16, veil.c1);
    gradient.addColorStop(0.42, veil.c2);
    gradient.addColorStop(0.64, veil.c3);
    gradient.addColorStop(0.84, veil.c4);
    gradient.addColorStop(1.00, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;

    ctx.beginPath();

    for (let i = 0; i <= samples; i++) {
      const nx = i / samples;
      const x = lerp(-0.14 * width, 1.14 * width, nx);
      const yNorm = centreLine(nx * 8.5, veil, t);
      const y = yNorm * height;
      const thickness = thicknessAt(nx * 9.0, veil, t) * height;
      const fold = Math.sin(nx * Math.PI * veil.foldCount + t * veil.foldSpeed + veil.phase) * veil.foldAmp * height;
      const yy = y + fold - thickness * 0.5;
      if (i === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }

    for (let i = samples; i >= 0; i--) {
      const nx = i / samples;
      const x = lerp(-0.14 * width, 1.14 * width, nx);
      const yNorm = centreLine(nx * 8.5, veil, t);
      const y = yNorm * height;
      const thickness = thicknessAt(nx * 9.0, veil, t) * height;
      const fold = Math.sin(nx * Math.PI * veil.foldCount + t * veil.foldSpeed + veil.phase) * veil.foldAmp * height;
      const edgeNoise = Math.sin(nx * 25.0 + t * 0.4 + veil.phase) * veil.edgeNoise * height;
      ctx.lineTo(x, y + fold + thickness * 0.5 + edgeNoise);
    }

    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = veil.alpha * 0.34;
    ctx.strokeStyle = veil.edge;
    ctx.lineWidth = Math.max(1, 1.6 * dpr);
    ctx.beginPath();

    for (let i = 0; i <= samples; i++) {
      const nx = i / samples;
      const x = lerp(-0.14 * width, 1.14 * width, nx);
      const y = centreLine(nx * 8.5, veil, t) * height;
      const fold = Math.sin(nx * Math.PI * veil.foldCount + t * veil.foldSpeed + veil.phase) * veil.foldAmp * height;
      if (i === 0) ctx.moveTo(x, y + fold);
      else ctx.lineTo(x, y + fold);
    }

    ctx.stroke();
    ctx.restore();
  }

  function draw(now) {
    const width = canvas.width;
    const height = canvas.height;
    const seconds = (now - startTime) / 1000;
    const t = seconds * (reduceMotion ? 0.24 : 0.62);

    frameCount += 1;
    host.dataset.auroraFrame = String(frameCount);
    host.dataset.auroraTime = seconds.toFixed(2);

    baseBackground();

    const masses = [
      {
        x: 0.20, y: 0.28, rx: 0.34, ry: 0.18,
        dx: 0.06, dy: 0.05, speed: 0.24, phase: 0.3, rotation: -0.30, alpha: 0.34,
        c0: 'rgba(255,255,255,0.28)', c1: 'rgba(220,232,248,0.20)', c2: 'rgba(100,145,205,0.05)'
      },
      {
        x: 0.62, y: 0.44, rx: 0.40, ry: 0.22,
        dx: 0.07, dy: 0.04, speed: 0.19, phase: 2.0, rotation: 0.20, alpha: 0.30,
        c0: 'rgba(248,251,255,0.24)', c1: 'rgba(205,222,245,0.18)', c2: 'rgba(88,134,198,0.04)'
      },
      {
        x: 0.82, y: 0.72, rx: 0.30, ry: 0.20,
        dx: 0.05, dy: 0.06, speed: 0.16, phase: 4.2, rotation: -0.12, alpha: 0.24,
        c0: 'rgba(255,255,255,0.20)', c1: 'rgba(214,229,248,0.15)', c2: 'rgba(94,139,202,0.03)'
      }
    ];

    ctx.save();
    ctx.filter = `blur(${Math.max(24, 36 * dpr)}px)`;
    masses.forEach(mass => drawSoftMass(mass, t));
    ctx.restore();

    const veils = [
      {
        y: 0.23, amp: 0.075, amp2: 0.034, amp3: 0.024, broad: 0.040,
        freq: 0.72, freq2: 1.44, freq3: 2.32, speed: 0.30, travel: 0.030, phase: 0.2,
        thickness: 0.16, thickFreq: 1.6, thickFreq2: 3.1, thickSpeed: 0.34,
        foldCount: 3.2, foldSpeed: 0.28, foldAmp: 0.018, edgeNoise: 0.012,
        angle: -0.20, angleSpeed: 0.12, angleSwing: 0.06,
        floatSpeed: 0.16, floatX: 0.035, alpha: 0.36,
        c1: 'rgba(210,226,248,0.14)', c2: 'rgba(255,255,255,0.34)',
        c3: 'rgba(235,242,252,0.24)', c4: 'rgba(170,200,238,0.10)',
        edge: 'rgba(255,255,255,0.11)'
      },
      {
        y: 0.48, amp: 0.095, amp2: 0.046, amp3: 0.030, broad: 0.056,
        freq: 0.56, freq2: 1.18, freq3: 1.96, speed: -0.24, travel: -0.024, phase: 2.4,
        thickness: 0.21, thickFreq: 1.35, thickFreq2: 2.7, thickSpeed: 0.26,
        foldCount: 4.1, foldSpeed: -0.22, foldAmp: 0.024, edgeNoise: 0.016,
        angle: 0.16, angleSpeed: 0.10, angleSwing: 0.05,
        floatSpeed: 0.13, floatX: 0.045, alpha: 0.40,
        c1: 'rgba(194,217,244,0.12)', c2: 'rgba(255,255,255,0.31)',
        c3: 'rgba(240,246,255,0.24)', c4: 'rgba(160,194,232,0.09)',
        edge: 'rgba(250,252,255,0.10)'
      },
      {
        y: 0.73, amp: 0.066, amp2: 0.032, amp3: 0.022, broad: 0.038,
        freq: 0.84, freq2: 1.62, freq3: 2.55, speed: 0.22, travel: 0.020, phase: 4.6,
        thickness: 0.15, thickFreq: 1.9, thickFreq2: 3.4, thickSpeed: 0.21,
        foldCount: 3.6, foldSpeed: 0.20, foldAmp: 0.016, edgeNoise: 0.010,
        angle: -0.10, angleSpeed: 0.08, angleSwing: 0.045,
        floatSpeed: 0.11, floatX: 0.030, alpha: 0.29,
        c1: 'rgba(205,224,248,0.10)', c2: 'rgba(250,253,255,0.25)',
        c3: 'rgba(225,236,250,0.18)', c4: 'rgba(148,184,226,0.07)',
        edge: 'rgba(245,250,255,0.08)'
      }
    ];

    ctx.save();
    ctx.filter = `blur(${Math.max(18, 26 * dpr)}px)`;
    veils.forEach(veil => drawOrganicVeil(veil, t));
    ctx.restore();

    const movingGlowX = width * (0.50 + Math.sin(t * 0.22) * 0.30);
    const movingGlowY = height * (0.46 + Math.cos(t * 0.17) * 0.16);
    const shimmer = ctx.createRadialGradient(
      movingGlowX, movingGlowY, 0,
      movingGlowX, movingGlowY, Math.max(width, height) * 0.42
    );
    shimmer.addColorStop(0, 'rgba(255,255,255,0.075)');
    shimmer.addColorStop(0.30, 'rgba(220,235,255,0.040)');
    shimmer.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = shimmer;
    ctx.fillRect(0, 0, width, height);

    const vignette = ctx.createRadialGradient(
      width * 0.5, height * 0.48, Math.min(width, height) * 0.16,
      width * 0.5, height * 0.48, Math.max(width, height) * 0.76
    );
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,3,18,0.42)');
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
      renderer: 'canvas2d-organic-white',
      running,
      visible,
      reducedMotion: reduceMotion
    })
  };

  resize();
  draw(performance.now());
  raf = requestAnimationFrame(frame);
})();