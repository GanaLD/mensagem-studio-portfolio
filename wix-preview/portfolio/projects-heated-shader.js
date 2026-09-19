(() => {
  'use strict';

  const host = document.querySelector('.projects-shader');
  const section = host ? host.closest('main') : null;
  if (!host || !section || host.dataset.heatedShaderMounted === '1') return;

  host.dataset.heatedShaderMounted = '1';

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
    float amplitude = 0.52;
    mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise2(p);
      p = rot * p * 2.03 + 7.13;
      amplitude *= 0.5;
    }
    return value;
  }

  float ribbon(float d, float width, float glow) {
    float core = exp(-abs(d) / width);
    float halo = exp(-abs(d) / (width * 3.8)) * glow;
    return core + halo;
  }

  vec3 heatPalette(float x) {
    vec3 midnight = vec3(0.008, 0.020, 0.070);
    vec3 deepBlue = vec3(0.025, 0.095, 0.42);
    vec3 royal = vec3(0.075, 0.245, 1.00);
    vec3 lime = vec3(0.43, 1.00, 0.19);
    vec3 yellow = vec3(1.00, 0.79, 0.10);

    vec3 c = mix(midnight, deepBlue, smoothstep(0.02, 0.30, x));
    c = mix(c, royal, smoothstep(0.18, 0.56, x));
    c = mix(c, lime, smoothstep(0.50, 0.80, x));
    c = mix(c, yellow, smoothstep(0.78, 1.10, x));
    return c;
  }

  void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 p = (frag - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

    float t = uTime;
    float scrollShift = (uScroll - 0.5) * 0.18;

    // Slow domain travel makes the forms cross the viewport rather than pulse in place.
    vec2 q = p;
    q.x += t * 0.035;
    q.y += scrollShift;

    float n1 = fbm(q * 1.22 + vec2(t * 0.055, -t * 0.035));
    float n2 = fbm((q + vec2(2.7, -1.9)) * 1.68 + vec2(-t * 0.042, t * 0.030));
    vec2 warped = q + 0.24 * vec2(n1 - 0.5, n2 - 0.5);

    float flowA = fbm(warped * 1.18 + vec2(0.0, t * 0.025));
    float flowB = fbm((warped + vec2(-3.0, 1.8)) * 1.42 + vec2(t * 0.020, 0.0));

    float y1 = -0.55
      + 0.22 * sin(warped.x * 1.15 + t * 0.34)
      + 0.16 * sin(warped.x * 2.25 - t * 0.16)
      + 0.22 * (flowA - 0.5);

    float y2 = 0.10
      + 0.25 * sin(warped.x * 0.88 - t * 0.25 + 1.35)
      - 0.14 * cos(warped.x * 1.75 + t * 0.18)
      + 0.20 * (flowB - 0.5);

    float y3 = 0.67
      + 0.19 * sin(warped.x * 1.32 + t * 0.20 + 4.10)
      + 0.17 * (flowA + flowB - 1.0);

    float xCurve = -0.10
      + 0.34 * sin(warped.y * 1.12 - t * 0.20)
      + 0.18 * (flowB - 0.5);

    float r1 = ribbon(warped.y - y1, 0.050, 0.32);
    float r2 = ribbon(warped.y - y2, 0.058, 0.34);
    float r3 = ribbon(warped.y - y3, 0.046, 0.28);
    float r4 = ribbon(warped.x - xCurve, 0.060, 0.20) * 0.58;

    float energy = max(max(r1, r2), max(r3, r4));
    energy *= 0.78 + 0.30 * fbm(warped * 2.2 + vec2(t * 0.055, -t * 0.020));
    energy = clamp(energy, 0.0, 1.22);

    float ambientField = fbm(p * 0.72 + vec2(t * 0.012, -t * 0.009));
    vec3 darkA = vec3(0.004, 0.012, 0.045);
    vec3 darkB = vec3(0.010, 0.040, 0.145);
    vec3 color = mix(darkA, darkB, 0.18 + 0.30 * ambientField);

    vec3 heated = heatPalette(energy);
    float shapeMask = smoothstep(0.055, 0.92, energy);
    color = mix(color, heated, shapeMask * 0.92);

    // Coloured halo keeps blue dominant and reserves yellow for the hottest crests.
    float halo = smoothstep(0.035, 0.42, energy) * (1.0 - smoothstep(0.78, 1.08, energy));
    color += vec3(0.015, 0.070, 0.30) * halo * 0.42;

    float hot = smoothstep(0.83, 1.16, energy);
    color += vec3(0.22, 0.19, 0.015) * hot * 0.55;

    float vignette = 1.0 - smoothstep(0.52, 1.28, length(p * vec2(0.78, 0.92)));
    color *= 0.66 + 0.34 * vignette;

    // Gentle vertical fade integrates the shader with the surrounding dark sections.
    float topFade = smoothstep(0.0, 0.16, frag.y / uResolution.y);
    float bottomFade = smoothstep(0.0, 0.18, (uResolution.y - frag.y) / uResolution.y);
    color *= 0.72 + 0.28 * min(topFade, bottomFade);

    color = pow(color, vec3(0.92));
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
    console.warn('[Mensagem Studio] Projects heated shader fallback:', error);
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
    const cap = mobileNow ? 1.15 : 1.5;
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
    const scroll = sectionProgress();
    positionCanvas();
    gl.useProgram(program);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, timeSeconds);
    gl.uniform1f(uScroll, scroll);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function frame(now) {
    if (!running || destroyed) return;

    if (targetFrameMs && now - lastFrame < targetFrameMs) {
      raf = requestAnimationFrame(frame);
      return;
    }
    lastFrame = now;

    const seconds = (now - startTime) * 0.001;
    draw(seconds);
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
    if (reduceMotion) {
      renderStatic();
      return;
    }
    start();
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
    if (!reduceMotion || destroyed) return;
    renderStatic();
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
    staticRAF = 0;

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
    delete host.dataset.heatedShaderMounted;
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