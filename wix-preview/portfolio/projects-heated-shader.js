(() => {
  'use strict';

  const host = document.querySelector('.projects-shader');
  const section = host ? host.closest('main') : null;
  if (!host || !section || host.dataset.auroraShaderMounted === '1') return;

  host.dataset.auroraShaderMounted = '1';
  host.dataset.shaderState = 'initializing';

  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = reduceMotionQuery.matches;
  let running = false;
  let visible = true;
  let destroyed = false;
  let raf = 0;
  let lastFrame = 0;
  let staticRAF = 0;
  const startTime = performance.now();
  const isMobile = window.matchMedia('(max-width: 700px)').matches;
  const targetFrameMs = isMobile ? 1000 / 30 : 0;

  const canvas = document.createElement('canvas');
  canvas.className = 'projects-heated-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);

  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    powerPreference: isMobile ? 'low-power' : 'high-performance'
  });

  if (!gl) {
    host.dataset.shaderState = 'fallback-no-webgl2';
    host.classList.add('webgl-fallback');
    canvas.remove();
    return;
  }

  const vertexSource = `#version 300 es
  precision highp float;

  const vec2 POSITIONS[3] = vec2[3](
    vec2(-1.0, -1.0),
    vec2( 3.0, -1.0),
    vec2(-1.0,  3.0)
  );

  void main() {
    gl_Position = vec4(POSITIONS[gl_VertexID], 0.0, 1.0);
  }`;

  const fragmentSource = `#version 300 es
  precision highp float;

  out vec4 outColor;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uScroll;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise2(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += noise2(p) * 0.55;
    p = mat2(0.80, -0.60, 0.60, 0.80) * p * 2.02 + 3.17;
    v += noise2(p) * 0.28;
    p = mat2(0.80, -0.60, 0.60, 0.80) * p * 2.01 + 5.41;
    v += noise2(p) * 0.14;
    p = mat2(0.80, -0.60, 0.60, 0.80) * p * 2.03 + 8.73;
    v += noise2(p) * 0.07;
    return v;
  }

  float softBand(vec2 p, float offset, float width, float phase, float t) {
    float wave =
      offset +
      0.11 * sin(p.x * 1.10 + t * 0.22 + phase) +
      0.055 * sin(p.x * 2.05 - t * 0.13 + phase * 1.7) +
      0.10 * (fbm(p * 0.85 + vec2(t * 0.035, phase)) - 0.5);

    float d = abs(p.y - wave);
    float core = 1.0 - smoothstep(width * 0.25, width, d);
    float haze = 1.0 - smoothstep(width, width * 3.3, d);
    return core * 0.44 + haze * 0.56;
  }

  vec3 palette(float e) {
    vec3 midnight = vec3(0.003, 0.012, 0.045);
    vec3 navy = vec3(0.008, 0.036, 0.125);
    vec3 deepRoyal = vec3(0.025, 0.110, 0.360);
    vec3 royal = vec3(0.055, 0.220, 0.640);
    vec3 cyanBlue = vec3(0.180, 0.500, 0.860);
    vec3 ice = vec3(0.700, 0.860, 1.000);

    vec3 c = mix(midnight, navy, smoothstep(0.00, 0.28, e));
    c = mix(c, deepRoyal, smoothstep(0.20, 0.52, e));
    c = mix(c, royal, smoothstep(0.46, 0.74, e));
    c = mix(c, cyanBlue, smoothstep(0.68, 0.92, e));
    c = mix(c, ice, smoothstep(0.90, 1.12, e));
    return c;
  }

  void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 uv = frag / uResolution;
    vec2 p = (frag - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

    float t = uTime;

    // Clearly visible but still calm left-to-right drift.
    vec2 q = p;
    q.x += t * 0.085;
    q.y += (uScroll - 0.5) * 0.045;

    float broadWarp = fbm(q * 0.52 + vec2(t * 0.024, -t * 0.010));
    float verticalWarp = fbm((q + vec2(-2.4, 1.8)) * 0.66 + vec2(-t * 0.018, t * 0.012));
    vec2 w = q + vec2((broadWarp - 0.5) * 0.18, (verticalWarp - 0.5) * 0.11);

    float b1 = softBand(w, -0.42, 0.28, 0.0, t);
    float b2 = softBand(w, -0.02, 0.31, 2.1, t * 0.94);
    float b3 = softBand(w,  0.38, 0.34, 4.2, t * 0.88);

    float e = b1 * 0.78 + b2 * 0.70 + b3 * 0.58;
    e *= 0.82 + 0.22 * fbm(w * 1.15 + vec2(t * 0.030, -t * 0.012));
    e = clamp(e, 0.0, 1.14);

    vec3 midnightA = vec3(0.002, 0.008, 0.030);
    vec3 midnightB = vec3(0.004, 0.018, 0.060);
    float bg = 0.28 + 0.14 * fbm(p * 0.36 + vec2(t * 0.008, -t * 0.006));
    vec3 color = mix(midnightA, midnightB, bg);

    // The aurora remains subordinate to the midnight base.
    vec3 aurora = palette(e);
    float veil = smoothstep(0.08, 0.92, e);
    color = mix(color, aurora, veil * 0.52);

    // Diffuse blue glow; no yellow and no dominant green.
    float softGlow = smoothstep(0.24, 0.90, e);
    color += vec3(0.010, 0.035, 0.100) * softGlow * 0.24;

    float topFade = smoothstep(0.0, 0.18, uv.y);
    float bottomFade = smoothstep(0.0, 0.22, 1.0 - uv.y);
    color *= 0.80 + 0.20 * min(topFade, bottomFade);

    float vignette = 1.0 - smoothstep(0.62, 1.34, length(p * vec2(0.80, 0.96)));
    color *= 0.78 + 0.22 * vignette;

    color = pow(color, vec3(0.96));
    outColor = vec4(color, 1.0);
  }`;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || 'Shader compile error';
      gl.deleteShader(shader);
      throw new Error(message);
    }

    return shader;
  }

  let program = null;
  let vertexShader = null;
  let fragmentShader = null;

  try {
    vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
    fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'Shader link error');
    }
  } catch (error) {
    console.warn('[Mensagem Studio] Projects aurora shader fallback:', error);
    host.dataset.shaderState = 'fallback-compile-error';

    if (program) gl.deleteProgram(program);
    if (vertexShader) gl.deleteShader(vertexShader);
    if (fragmentShader) gl.deleteShader(fragmentShader);

    canvas.remove();
    host.classList.add('webgl-fallback');
    return;
  }

  const uResolution = gl.getUniformLocation(program, 'uResolution');
  const uTime = gl.getUniformLocation(program, 'uTime');
  const uScroll = gl.getUniformLocation(program, 'uScroll');

  gl.useProgram(program);
  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.BLEND);

  function sectionProgress() {
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    return Math.max(0, Math.min(1, -rect.top / travel));
  }

  function positionCanvas() {
    const rect = section.getBoundingClientRect();
    const maxY = Math.max(0, rect.height - window.innerHeight);
    const y = Math.max(0, Math.min(maxY, -rect.top));
    canvas.style.transform = `translate3d(0,${Math.round(y)}px,0)`;
  }

  function resize() {
    if (destroyed) return;

    const mobileNow = window.innerWidth <= 700;
    const cap = mobileNow ? 1.10 : 1.45;
    const dpr = Math.min(window.devicePixelRatio || 1, cap);
    const cssWidth = Math.max(1, host.clientWidth || window.innerWidth);
    const cssHeight = Math.max(1, window.innerHeight);
    const width = Math.max(1, Math.round(cssWidth * dpr));
    const height = Math.max(1, Math.round(cssHeight * dpr));

    canvas.style.width = cssWidth + 'px';
    canvas.style.height = cssHeight + 'px';

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    positionCanvas();
    if (reduceMotion) renderStatic();
  }

  function draw(timeSeconds) {
    positionCanvas();

    gl.useProgram(program);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, timeSeconds);
    gl.uniform1f(uScroll, sectionProgress());
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function frame(now) {
    if (!running || destroyed) return;

    if (targetFrameMs && now - lastFrame < targetFrameMs) {
      raf = requestAnimationFrame(frame);
      return;
    }

    lastFrame = now;
    draw((now - startTime) * 0.001);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (destroyed || reduceMotion || running || !visible || document.hidden) return;

    running = true;
    host.dataset.shaderState = 'running';
    lastFrame = 0;
    raf = requestAnimationFrame(frame);
  }

  function pause() {
    running = false;

    if (!destroyed) host.dataset.shaderState = reduceMotion ? 'reduced-motion' : 'paused';

    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function renderStatic() {
    if (destroyed) return;

    host.dataset.shaderState = 'reduced-motion';

    if (staticRAF) cancelAnimationFrame(staticRAF);

    staticRAF = requestAnimationFrame(() => {
      staticRAF = 0;
      draw(18.0);
    });
  }

  function resume() {
    if (reduceMotion) renderStatic();
    else start();
  }

  function onReducedMotionChange(event) {
    reduceMotion = event.matches;

    if (reduceMotion) {
      pause();
      renderStatic();
    } else {
      start();
    }
  }

  function onVisibilityChange() {
    if (document.hidden) pause();
    else resume();
  }

  function onScrollReduced() {
    if (reduceMotion && !destroyed) renderStatic();
  }

  const intersectionObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        const entry = entries[0];
        if (!entry) return;

        visible = entry.isIntersecting;

        if (visible) resume();
        else pause();
      }, { threshold: 0 })
    : null;

  if (intersectionObserver) intersectionObserver.observe(section);

  const resizeObserver = 'ResizeObserver' in window
    ? new ResizeObserver(resize)
    : null;

  if (resizeObserver) resizeObserver.observe(section);

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', onScrollReduced, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);

  if (reduceMotionQuery.addEventListener) {
    reduceMotionQuery.addEventListener('change', onReducedMotionChange);
  } else if (reduceMotionQuery.addListener) {
    reduceMotionQuery.addListener(onReducedMotionChange);
  }

  function destroy() {
    if (destroyed) return;

    destroyed = true;
    pause();

    if (staticRAF) cancelAnimationFrame(staticRAF);

    intersectionObserver?.disconnect();
    resizeObserver?.disconnect();

    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', onScrollReduced);
    document.removeEventListener('visibilitychange', onVisibilityChange);

    if (reduceMotionQuery.removeEventListener) {
      reduceMotionQuery.removeEventListener('change', onReducedMotionChange);
    } else if (reduceMotionQuery.removeListener) {
      reduceMotionQuery.removeListener(onReducedMotionChange);
    }

    if (program) gl.deleteProgram(program);
    if (vertexShader) gl.deleteShader(vertexShader);
    if (fragmentShader) gl.deleteShader(fragmentShader);

    const loseContext = gl.getExtension('WEBGL_lose_context');
    if (loseContext) loseContext.loseContext();

    canvas.remove();
    host.classList.remove('webgl-ready');
    host.dataset.shaderState = 'destroyed';
    delete host.dataset.auroraShaderMounted;
  }

  window.MSProjectsShader = {
    start,
    pause,
    resume,
    resize,
    destroy
  };

  window.addEventListener('pagehide', pause, { passive: true });
  window.addEventListener('pageshow', resume, { passive: true });

  resize();
  host.classList.add('webgl-ready');

  if (reduceMotion) renderStatic();
  else start();
})();