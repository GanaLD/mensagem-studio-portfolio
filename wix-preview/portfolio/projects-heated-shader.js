(() => {
  'use strict';

  const host = document.querySelector('.projects-shader');
  const section = host ? host.closest('main') : null;
  if (!host || !section || host.dataset.auroraShaderMounted === '1') return;

  host.dataset.auroraShaderMounted = '1';

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
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
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
    float value = 0.0;
    float amplitude = 0.55;
    mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise2(p);
      p = rot * p * 2.02 + 5.83;
      amplitude *= 0.5;
    }
    return value;
  }

  float auroraBand(
    vec2 p,
    float offset,
    float amp,
    float freq,
    float speed,
    float warpAmt,
    float width,
    float t
  ) {
    float n1 = fbm(p * freq + vec2(t * speed, -t * speed * 0.22));
    float n2 = fbm((p + vec2(3.1, -1.6)) * (freq * 0.74) + vec2(-t * speed * 0.48, t * speed * 0.18));

    float curve =
      offset +
      amp * sin(p.x * 1.10 + t * speed * 0.72) +
      0.07 * sin(p.x * 1.95 - t * speed * 0.30) +
      warpAmt * (n1 - 0.5) +
      0.05 * (n2 - 0.5);

    float d = abs(p.y - curve);

    float core = 1.0 - smoothstep(width * 0.45, width, d);
    float halo = 1.0 - smoothstep(width, width * 3.4, d);

    return core * 0.72 + halo * 0.52;
  }

  vec3 auroraPalette(float e) {
    vec3 midnight = vec3(0.004, 0.012, 0.040);
    vec3 deepBlue = vec3(0.010, 0.045, 0.140);
    vec3 royal = vec3(0.055, 0.180, 0.500);
    vec3 softBlue = vec3(0.160, 0.390, 0.790);
    vec3 cyan = vec3(0.360, 0.690, 0.940);
    vec3 ice = vec3(0.760, 0.890, 1.000);

    vec3 c = mix(midnight, deepBlue, smoothstep(0.00, 0.24, e));
    c = mix(c, royal, smoothstep(0.18, 0.50, e));
    c = mix(c, softBlue, smoothstep(0.42, 0.72, e));
    c = mix(c, cyan, smoothstep(0.66, 0.90, e));
    c = mix(c, ice, smoothstep(0.88, 1.14, e));
    return c;
  }

  void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 uv = frag / uResolution;
    vec2 p = (frag - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

    float t = uTime * 0.30;
    float scrollShift = (uScroll - 0.5) * 0.06;

    vec2 q = p;
    q.x += t * 0.055;
    q.y += scrollShift;

    float warpA = fbm(q * 0.70 + vec2(t * 0.045, -t * 0.016));
    float warpB = fbm((q + vec2(-2.1, 1.3)) * 0.92 + vec2(-t * 0.028, t * 0.020));
    vec2 warped = q + vec2((warpA - 0.5) * 0.18, (warpB - 0.5) * 0.12);

    float b1 = auroraBand(warped, -0.44, 0.10, 0.88, 0.44, 0.12, 0.23, t);
    float b2 = auroraBand(warped, -0.04, 0.09, 0.80, 0.37, 0.11, 0.26, t + 6.0);
    float b3 = auroraBand(warped,  0.36, 0.08, 0.72, 0.31, 0.10, 0.28, t + 12.0);

    float energy = b1 * 0.95 + b2 * 0.82 + b3 * 0.66;
    energy *= 0.88 + 0.18 * fbm(warped * 1.22 + vec2(t * 0.035, -t * 0.014));
    energy = clamp(energy, 0.0, 1.15);

    vec3 bgTop = vec3(0.003, 0.008, 0.026);
    vec3 bgBottom = vec3(0.005, 0.016, 0.052);
    float bgNoise = fbm(p * 0.40 + vec2(t * 0.010, -t * 0.008));
    vec3 color = mix(bgTop, bgBottom, 0.34 + 0.16 * bgNoise);

    float haze = fbm(p * 0.54 + vec2(-t * 0.008, t * 0.006));
    color += vec3(0.005, 0.018, 0.060) * (0.16 + 0.18 * haze);

    vec3 aurora = auroraPalette(energy);
    float veil = smoothstep(0.05, 0.90, energy);
    color = mix(color, aurora, veil * 0.78);

    float glow = smoothstep(0.18, 0.86, energy);
    color += vec3(0.020, 0.060, 0.150) * glow * 0.22;

    // Tiny green-blue undertone only in mid-energy areas; never dominant.
    float greenWhisper = smoothstep(0.42, 0.64, energy) * (1.0 - smoothstep(0.72, 0.88, energy));
    color += vec3(0.010, 0.030, 0.018) * greenWhisper * 0.16;

    float topFade = smoothstep(0.0, 0.22, uv.y);
    float bottomFade = smoothstep(0.0, 0.24, 1.0 - uv.y);
    color *= 0.78 + 0.22 * min(topFade, bottomFade);

    float vignette = 1.0 - smoothstep(0.58, 1.30, length(p * vec2(0.82, 0.96)));
    color *= 0.76 + 0.24 * vignette;

    color = pow(color, vec3(0.95));
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
    lastFrame = 0;
    raf = requestAnimationFrame(frame);
  }

  function pause() {
    running = false;

    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function renderStatic() {
    if (destroyed) return;

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