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
  const targetFps = reduceMotion ? 20 : (mobile ? 30 : 42);
  const frameInterval = 1000 / targetFps;
  const startTime = performance.now();

  let raf = 0;
  let running = true;
  let visible = true;
  let lastFrame = 0;
  let frameCount = 0;
  let cssWidth = 0;
  let cssHeight = 0;
  let dpr = 1;

  host.classList.add('aurora-ready');
  host.dataset.shaderState = 'running-reference-aurora';
  host.dataset.auroraRenderer = 'canvas2d-reference-white-ridge';

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function resize() {
    const vw = window.visualViewport?.width || document.documentElement.clientWidth || window.innerWidth || 1440;
    const vh = window.visualViewport?.height || document.documentElement.clientHeight || window.innerHeight || 900;

    cssWidth = clamp(host.clientWidth || vw, 320, 2560);
    cssHeight = clamp(vh, 360, 1600);
    dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.0 : 1.15);

    const w = Math.round(cssWidth * dpr);
    const h = Math.round(cssHeight * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = cssWidth + 'px';
      canvas.style.height = cssHeight + 'px';
    }
    positionCanvas();
  }

  function positionCanvas() {
    const rect = section.getBoundingClientRect();
    const maxY = Math.max(0, rect.height - window.innerHeight);
    const y = clamp(-rect.top, 0, maxY);
    canvas.style.transform = `translate3d(0,${Math.round(y)}px,0) scale(1.035)`;
  }

  function clearBase() {
    const w = canvas.width;
    const h = canvas.height;

    const base = ctx.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0, '#02051a');
    base.addColorStop(0.48, '#07163d');
    base.addColorStop(1, '#02051a');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    const centerGlow = ctx.createRadialGradient(
      w * 0.58, h * 0.38, 0,
      w * 0.58, h * 0.38, Math.max(w, h) * 0.62
    );
    centerGlow.addColorStop(0, 'rgba(34,74,186,0.22)');
    centerGlow.addColorStop(0.42, 'rgba(22,54,142,0.10)');
    centerGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, w, h);
  }

  function drawCurtain(xNorm, widthNorm, t, phase, strength, tilt) {
    const w = canvas.width;
    const h = canvas.height;
    const x = (xNorm + Math.sin(t * 0.18 + phase) * 0.035) * w;
    const span = widthNorm * w;
    const top = h * 0.02;
    const bottom = h * 0.90;

    ctx.save();
    ctx.translate(x, h * 0.48);
    ctx.rotate(tilt + Math.sin(t * 0.12 + phase) * 0.04);
    ctx.translate(-x, -h * 0.48);

    const g = ctx.createLinearGradient(x - span, top, x + span, bottom);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.36, `rgba(206,226,255,${0.045 * strength})`);
    g.addColorStop(0.50, `rgba(245,250,255,${0.115 * strength})`);
    g.addColorStop(0.64, `rgba(165,202,255,${0.045 * strength})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.globalCompositeOperation = 'screen';
    ctx.filter = `blur(${34 * dpr}px)`;
    ctx.fillStyle = g;
    ctx.fillRect(x - span * 1.7, top, span * 3.4, bottom - top);
    ctx.restore();
  }

  function ridgeY(nx, ridge, t) {
    const peak = ridge.peakX + Math.sin(t * ridge.peakDrift + ridge.phase) * ridge.peakMotion;
    const dx = nx - peak;
    const gaussian = Math.exp(-(dx * dx) / ridge.spread);
    const shoulder = Math.exp(-((nx - (peak - ridge.shoulderOffset)) ** 2) / ridge.shoulderSpread);
    const undulation =
      Math.sin(nx * ridge.waveFreq + t * ridge.waveSpeed + ridge.phase) * ridge.waveAmp +
      Math.sin(nx * ridge.waveFreq2 - t * ridge.waveSpeed * 0.42 + ridge.phase * 1.9) * ridge.waveAmp2;

    return ridge.baseY - gaussian * ridge.height - shoulder * ridge.shoulderHeight + undulation;
  }

  function buildRidgePath(ridge, t, closeToBottom = false) {
    const w = canvas.width;
    const h = canvas.height;
    const steps = mobile ? 42 : 64;

    ctx.beginPath();

    for (let i = 0; i <= steps; i++) {
      const nx = i / steps;
      const x = nx * w;
      const y = ridgeY(nx, ridge, t) * h;
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prevNx = (i - 1) / steps;
        const prevX = prevNx * w;
        const prevY = ridgeY(prevNx, ridge, t) * h;
        ctx.quadraticCurveTo((prevX + x) * 0.5, (prevY + y) * 0.5, x, y);
      }
    }

    if (closeToBottom) {
      ctx.lineTo(w, h * 1.08);
      ctx.lineTo(0, h * 1.08);
      ctx.closePath();
    }
  }

  function drawRidgeFill(ridge, t, colors) {
    const w = canvas.width;
    const h = canvas.height;

    buildRidgePath(ridge, t, true);

    const fill = ctx.createLinearGradient(0, h * 0.18, 0, h);
    fill.addColorStop(0, colors.top);
    fill.addColorStop(0.36, colors.mid);
    fill.addColorStop(1, colors.bottom);
    ctx.fillStyle = fill;
    ctx.fill();

    const sideGlow = ctx.createRadialGradient(
      w * ridge.peakX, h * 0.42, 0,
      w * ridge.peakX, h * 0.42, Math.max(w, h) * 0.62
    );
    sideGlow.addColorStop(0, 'rgba(65,112,255,0.16)');
    sideGlow.addColorStop(0.45, 'rgba(34,72,198,0.08)');
    sideGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sideGlow;
    ctx.fillRect(0, 0, w, h);
  }

  function drawRidgeGlow(ridge, t, power = 1) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    buildRidgePath(ridge, t, false);
    ctx.filter = `blur(${30 * dpr}px)`;
    ctx.strokeStyle = `rgba(220,235,255,${0.44 * power})`;
    ctx.lineWidth = 52 * dpr;
    ctx.stroke();

    buildRidgePath(ridge, t, false);
    ctx.filter = `blur(${13 * dpr}px)`;
    ctx.strokeStyle = `rgba(245,250,255,${0.70 * power})`;
    ctx.lineWidth = 19 * dpr;
    ctx.stroke();

    buildRidgePath(ridge, t, false);
    ctx.filter = `blur(${3.5 * dpr}px)`;
    ctx.strokeStyle = `rgba(255,255,255,${0.95 * power})`;
    ctx.lineWidth = 4.2 * dpr;
    ctx.stroke();

    ctx.restore();
  }

  function drawMistBlob(xNorm, yNorm, rxNorm, ryNorm, t, phase, alpha) {
    const w = canvas.width;
    const h = canvas.height;
    const x = (xNorm + Math.sin(t * 0.20 + phase) * 0.035) * w;
    const y = (yNorm + Math.cos(t * 0.16 + phase) * 0.025) * h;
    const rx = rxNorm * w;
    const ry = ryNorm * h;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(t * 0.10 + phase) * 0.22);
    ctx.scale(1, ry / Math.max(rx, 1));

    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    g.addColorStop(0, `rgba(244,249,255,${alpha})`);
    g.addColorStop(0.35, `rgba(185,213,252,${alpha * 0.48})`);
    g.addColorStop(0.70, `rgba(79,126,232,${alpha * 0.12})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.globalCompositeOperation = 'screen';
    ctx.filter = `blur(${36 * dpr}px)`;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function draw(now) {
    const w = canvas.width;
    const h = canvas.height;
    const seconds = (now - startTime) / 1000;
    const t = seconds * (reduceMotion ? 0.20 : 0.58);

    frameCount += 1;
    host.dataset.auroraFrame = String(frameCount);
    host.dataset.auroraTime = seconds.toFixed(2);

    clearBase();

    drawCurtain(0.47, 0.20, t, 0.2, 1.0, -0.10);
    drawCurtain(0.64, 0.16, t, 2.0, 0.85, 0.07);
    drawCurtain(0.82, 0.18, t, 4.0, 0.72, -0.06);

    drawMistBlob(0.72, 0.33, 0.26, 0.24, t, 0.4, 0.16);
    drawMistBlob(0.48, 0.62, 0.30, 0.20, t, 2.1, 0.13);
    drawMistBlob(0.92, 0.57, 0.24, 0.22, t, 4.7, 0.12);

    const rear = {
      baseY: 0.79,
      peakX: 0.30,
      peakMotion: 0.020,
      peakDrift: 0.16,
      spread: 0.030,
      height: 0.22,
      shoulderOffset: 0.12,
      shoulderSpread: 0.060,
      shoulderHeight: 0.065,
      waveFreq: 9.0,
      waveFreq2: 16.0,
      waveSpeed: 0.24,
      waveAmp: 0.012,
      waveAmp2: 0.006,
      phase: 1.6
    };

    drawRidgeFill(rear, t, {
      top: 'rgba(28,64,160,0.88)',
      mid: 'rgba(10,30,92,0.96)',
      bottom: 'rgba(2,8,28,1)'
    });
    drawRidgeGlow(rear, t, 0.46);

    const hero = {
      baseY: 0.83,
      peakX: 0.64,
      peakMotion: 0.030,
      peakDrift: 0.14,
      spread: 0.019,
      height: 0.64,
      shoulderOffset: 0.18,
      shoulderSpread: 0.050,
      shoulderHeight: 0.17,
      waveFreq: 7.0,
      waveFreq2: 13.0,
      waveSpeed: 0.19,
      waveAmp: 0.015,
      waveAmp2: 0.008,
      phase: 0.7
    };

    drawRidgeFill(hero, t, {
      top: 'rgba(40,82,196,0.90)',
      mid: 'rgba(14,40,122,0.98)',
      bottom: 'rgba(2,8,32,1)'
    });
    drawRidgeGlow(hero, t, 1.0);

    const front = {
      baseY: 0.98,
      peakX: 0.88,
      peakMotion: 0.016,
      peakDrift: 0.11,
      spread: 0.050,
      height: 0.24,
      shoulderOffset: 0.10,
      shoulderSpread: 0.060,
      shoulderHeight: 0.08,
      waveFreq: 8.0,
      waveFreq2: 15.0,
      waveSpeed: -0.14,
      waveAmp: 0.010,
      waveAmp2: 0.005,
      phase: 3.6
    };

    drawRidgeFill(front, t, {
      top: 'rgba(35,72,178,0.75)',
      mid: 'rgba(9,27,86,0.92)',
      bottom: 'rgba(2,7,26,1)'
    });
    drawRidgeGlow(front, t, 0.34);

    const flareX = w * (0.61 + Math.sin(t * 0.17) * 0.025);
    const flareY = h * (0.26 + Math.cos(t * 0.13) * 0.018);
    const flare = ctx.createRadialGradient(flareX, flareY, 0, flareX, flareY, Math.max(w, h) * 0.22);
    flare.addColorStop(0, 'rgba(255,255,255,0.18)');
    flare.addColorStop(0.28, 'rgba(220,236,255,0.09)');
    flare.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = flare;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';

    const vignette = ctx.createRadialGradient(
      w * 0.5, h * 0.47, Math.min(w, h) * 0.14,
      w * 0.5, h * 0.47, Math.max(w, h) * 0.74
    );
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,2,18,0.44)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
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
    host.dataset.shaderState = 'running-reference-aurora';
    raf = requestAnimationFrame(frame);
  }

  function pause() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    host.dataset.shaderState = 'paused-reference-aurora';
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
      renderer: 'canvas2d-reference-white-ridge',
      running,
      visible,
      reducedMotion: reduceMotion
    })
  };

  resize();
  draw(performance.now());
  raf = requestAnimationFrame(frame);
})();