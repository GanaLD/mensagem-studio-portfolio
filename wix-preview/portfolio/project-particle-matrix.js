(() => {
  'use strict';

  const GRID_SELECTOR = '#grid .card';
  const MEDIA_SELECTOR = '.media';
  const BASE_IMAGE_SELECTOR = ':scope > img:not(.hover-preview-image)';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall = window.matchMedia('(max-width: 700px)').matches;

  const style = document.createElement('style');
  style.id = 'project-particle-matrix-style-v1';
  style.textContent = `
    .media{isolation:isolate}
    .project-particle-matrix-canvas{
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      display:block;
      z-index:3;
      pointer-events:none;
      background:transparent!important;
      opacity:1;
      transition:opacity .16s linear;
      contain:strict;
    }
    .card[data-particle-matrix-ready="true"] .media > img:not(.hover-preview-image){
      will-change:opacity,transform;
    }
    @media (max-width:700px){
      .project-particle-matrix-canvas{transition:opacity .12s linear}
    }
    @media (prefers-reduced-motion:reduce){
      .project-particle-matrix-canvas{display:none!important}
      .card .media > img:not(.hover-preview-image){opacity:1!important}
    }
  `;
  document.head.appendChild(style);

  if (reduceMotion) return;

  const supportsWebGL = (() => {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl', { alpha: true, antialias: false }) || c.getContext('experimental-webgl'));
    } catch (_) {
      return false;
    }
  })();
  if (!supportsWebGL) return;

  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const smoothstep = (a, b, v) => {
    const t = clamp((v - a) / Math.max(0.0001, b - a));
    return t * t * (3 - 2 * t);
  };

  function hashString(value) {
    let h = 2166136261 >>> 0;
    const s = String(value || '');
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function rand() {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(log || 'Shader compile error');
    }
    return shader;
  }

  function createProgram(gl, vsSource, fsSource) {
    const vs = compile(gl, gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(log || 'Program link error');
    }
    return program;
  }

  const VERTEX_SHADER = `
    precision highp float;
    attribute vec2 aTarget;
    attribute vec3 aScatter;
    attribute vec2 aUv;
    attribute float aSeed;
    uniform float uProgress;
    uniform float uPointSize;
    varying vec2 vUv;
    varying float vDepth;
    varying float vSeed;

    float easeOutCubic(float x){
      float q = 1.0 - x;
      return 1.0 - q*q*q;
    }

    void main(){
      float p = clamp(uProgress, 0.0, 1.0);
      float e = easeOutCubic(p);
      float inv = 1.0 - e;

      float ang = inv * (1.15 + aSeed * 2.35) * (aScatter.z >= 0.0 ? 1.0 : -1.0);
      float cs = cos(ang);
      float sn = sin(ang);
      vec2 burst = vec2(
        aScatter.x * cs - aScatter.y * sn,
        aScatter.x * sn + aScatter.y * cs
      );

      vec2 drift = vec2(
        sin(aSeed * 31.7 + p * 5.2),
        cos(aSeed * 23.9 + p * 4.1)
      ) * inv * 0.055;

      float depth = aScatter.z * inv;
      float perspective = 1.0 / max(0.68, 1.0 + depth * 0.22);
      vec2 pos = (aTarget + burst * inv + drift) * perspective;

      gl_Position = vec4(pos, depth * 0.10, 1.0);
      gl_PointSize = max(1.0, uPointSize * mix(0.64, 1.0, e) * perspective);

      vUv = aUv;
      vDepth = depth;
      vSeed = aSeed;
    }
  `;

  const FRAGMENT_SHADER = `
    precision highp float;
    uniform sampler2D uTexture;
    uniform vec2 uUvStep;
    uniform vec4 uCrop;
    uniform float uProgress;
    varying vec2 vUv;
    varying float vDepth;
    varying float vSeed;

    void main(){
      vec2 local = gl_PointCoord - 0.5;
      vec2 boxUv = vUv + local * uUvStep;
      vec2 uv = uCrop.xy + boxUv * uCrop.zw;

      vec4 color = texture2D(uTexture, uv);

      float edgeDist = min(min(gl_PointCoord.x, 1.0 - gl_PointCoord.x),
                           min(gl_PointCoord.y, 1.0 - gl_PointCoord.y));
      float bevel = smoothstep(0.015, 0.12, edgeDist);
      float depthShade = clamp(1.0 - abs(vDepth) * 0.19, 0.70, 1.0);
      float sparkle = 0.96 + 0.04 * sin(vSeed * 61.0 + uProgress * 8.0);

      color.rgb *= mix(0.60, 1.0, bevel) * depthShade * sparkle;
      color.a *= smoothstep(0.0, 0.035, edgeDist);

      if(color.a < 0.025) discard;
      gl_FragColor = color;
    }
  `;

  class ParticleMatrixCard {
    constructor(card) {
      this.card = card;
      this.media = card.querySelector(MEDIA_SELECTOR);
      this.baseImg = this.media?.querySelector(BASE_IMAGE_SELECTOR) || this.media?.querySelector('img:not(.hover-preview-image)');
      this.canvas = null;
      this.gl = null;
      this.program = null;
      this.texture = null;
      this.buffers = [];
      this.ready = false;
      this.failed = false;
      this.progress = -1;
      this.cols = 0;
      this.rows = 0;
      this.count = 0;
      this.dpr = 1;
      this.resizeObserver = null;
      this.seed = hashString(card.dataset.projectSlug || card.querySelector('h2')?.textContent || 'project');
      this.originalOpacity = this.baseImg?.style.opacity || '';
      this.initStarted = false;
    }

    async init() {
      if (this.initStarted || !this.media || !this.baseImg) return;
      this.initStarted = true;

      const source = this.baseImg.currentSrc || this.baseImg.src;
      if (!source) return;

      const image = await this.loadImage(source).catch(() => null);
      if (!image) {
        this.failed = true;
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.className = 'project-particle-matrix-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      this.media.appendChild(canvas);
      this.canvas = canvas;

      const gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: true,
        powerPreference: 'high-performance'
      });
      if (!gl) {
        this.fail();
        return;
      }
      this.gl = gl;

      try {
        this.program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
        this.setupTexture(image);
        this.resize(image);
        this.ready = true;
        this.card.dataset.particleMatrixReady = 'true';
        this.baseImg.style.opacity = '0';
        this.render(0, true);

        if ('ResizeObserver' in window) {
          this.resizeObserver = new ResizeObserver(() => {
            if (!this.ready) return;
            this.resize(image);
            scheduleUpdate(true);
          });
          this.resizeObserver.observe(this.media);
        }
      } catch (_) {
        this.fail();
      }
    }

    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        try {
          const url = new URL(src, location.href);
          if (url.origin !== location.origin) img.crossOrigin = 'anonymous';
        } catch (_) {}
        img.decoding = 'async';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    }

    setupTexture(image) {
      const gl = this.gl;
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      this.texture = texture;
      this.image = image;
    }

    resize(image = this.image) {
      if (!this.gl || !this.canvas || !image) return;
      const rect = this.media.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      this.dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.15 : 1.45);
      const pixelW = Math.max(2, Math.round(rect.width * this.dpr));
      const pixelH = Math.max(2, Math.round(rect.height * this.dpr));
      if (this.canvas.width !== pixelW || this.canvas.height !== pixelH) {
        this.canvas.width = pixelW;
        this.canvas.height = pixelH;
      }
      this.gl.viewport(0, 0, pixelW, pixelH);

      const tileCssPx = isSmall ? 13 : 9.5;
      const cols = Math.max(isSmall ? 22 : 30, Math.min(isSmall ? 42 : 72, Math.round(rect.width / tileCssPx)));
      const rows = Math.max(isSmall ? 16 : 20, Math.min(isSmall ? 55 : 62, Math.round(rect.height / tileCssPx)));

      if (cols !== this.cols || rows !== this.rows) {
        this.cols = cols;
        this.rows = rows;
        this.buildGeometry();
      }

      const boxAspect = rect.width / rect.height;
      const imageAspect = (image.naturalWidth || image.width) / Math.max(1, (image.naturalHeight || image.height));
      let cropX = 0, cropY = 0, cropW = 1, cropH = 1;
      if (imageAspect > boxAspect) {
        cropW = boxAspect / imageAspect;
        cropX = (1 - cropW) * 0.5;
      } else if (imageAspect < boxAspect) {
        cropH = imageAspect / boxAspect;
        cropY = (1 - cropH) * 0.5;
      }
      this.crop = [cropX, cropY, cropW, cropH];
      this.pointSize = Math.max(2, (rect.width / this.cols) * this.dpr * 1.08);
    }

    buildGeometry() {
      const gl = this.gl;
      if (!gl || !this.program) return;

      this.buffers.forEach(buffer => gl.deleteBuffer(buffer));
      this.buffers = [];

      const cols = this.cols;
      const rows = this.rows;
      const count = cols * rows;
      this.count = count;

      const targets = new Float32Array(count * 2);
      const scatters = new Float32Array(count * 3);
      const uvs = new Float32Array(count * 2);
      const seeds = new Float32Array(count);

      const rand = mulberry32(this.seed ^ (cols * 73856093) ^ (rows * 19349663));
      let i = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++, i++) {
          const nx = (x + 0.5) / cols;
          const ny = (y + 0.5) / rows;
          targets[i * 2] = nx * 2 - 1;
          targets[i * 2 + 1] = (1 - ny) * 2 - 1;
          uvs[i * 2] = nx;
          uvs[i * 2 + 1] = ny;

          const edgeBias = Math.abs(nx - 0.5) + Math.abs(ny - 0.5);
          const angle = rand() * Math.PI * 2;
          const radius = 0.16 + rand() * (0.42 + edgeBias * 0.42);
          scatters[i * 3] = Math.cos(angle) * radius + (nx - 0.5) * (0.15 + rand() * 0.22);
          scatters[i * 3 + 1] = Math.sin(angle) * radius + (0.5 - ny) * (0.12 + rand() * 0.20);
          scatters[i * 3 + 2] = -0.55 + rand() * 1.65;
          seeds[i] = rand();
        }
      }

      const bind = (name, data, size) => {
        const loc = gl.getAttribLocation(this.program, name);
        const buffer = gl.createBuffer();
        this.buffers.push(buffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      };

      gl.useProgram(this.program);
      bind('aTarget', targets, 2);
      bind('aScatter', scatters, 3);
      bind('aUv', uvs, 2);
      bind('aSeed', seeds, 1);
    }

    getProgress() {
      const rect = this.media.getBoundingClientRect();
      if (!rect.height || this.card.hidden) return this.progress < 0 ? 0 : this.progress;

      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      const start = vh * (isSmall ? 0.96 : 0.94);
      const end = vh * (isSmall ? 0.60 : 0.54);
      return clamp((start - rect.top) / Math.max(1, start - end));
    }

    update(force = false) {
      if (!this.ready || !this.gl || this.card.hidden) return;
      const rect = this.media.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const near = rect.bottom > -vh * 0.35 && rect.top < vh * 1.35;
      if (!near && !force) return;

      const p = this.getProgress();
      if (!force && Math.abs(p - this.progress) < 0.002) return;
      this.progress = p;

      const baseAlpha = smoothstep(0.80, 0.985, p);
      this.baseImg.style.opacity = String(baseAlpha);
      if (this.canvas) {
        const canvasAlpha = 1 - smoothstep(0.90, 0.995, p);
        this.canvas.style.opacity = String(canvasAlpha);
        this.canvas.style.visibility = canvasAlpha < 0.015 ? 'hidden' : 'visible';
      }

      this.render(p, force);
    }

    render(progress) {
      const gl = this.gl;
      if (!gl || !this.program || !this.texture || !this.count) return;

      gl.useProgram(this.program);
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.texture);

      gl.uniform1i(gl.getUniformLocation(this.program, 'uTexture'), 0);
      gl.uniform1f(gl.getUniformLocation(this.program, 'uProgress'), progress);
      gl.uniform1f(gl.getUniformLocation(this.program, 'uPointSize'), this.pointSize || 7);
      gl.uniform2f(gl.getUniformLocation(this.program, 'uUvStep'), 1 / this.cols, 1 / this.rows);
      gl.uniform4f(gl.getUniformLocation(this.program, 'uCrop'), this.crop[0], this.crop[1], this.crop[2], this.crop[3]);

      gl.drawArrays(gl.POINTS, 0, this.count);
    }

    fail() {
      this.failed = true;
      this.ready = false;
      if (this.baseImg) this.baseImg.style.opacity = this.originalOpacity;
      if (this.canvas) this.canvas.remove();
      this.canvas = null;
      if (this.gl) {
        try {
          this.buffers.forEach(buffer => this.gl.deleteBuffer(buffer));
          if (this.texture) this.gl.deleteTexture(this.texture);
          if (this.program) this.gl.deleteProgram(this.program);
        } catch (_) {}
      }
      this.gl = null;
    }

    destroy() {
      this.resizeObserver?.disconnect();
      if (this.baseImg) this.baseImg.style.opacity = this.originalOpacity;
      if (this.gl) {
        try {
          this.buffers.forEach(buffer => this.gl.deleteBuffer(buffer));
          if (this.texture) this.gl.deleteTexture(this.texture);
          if (this.program) this.gl.deleteProgram(this.program);
          const ext = this.gl.getExtension('WEBGL_lose_context');
          ext?.loseContext();
        } catch (_) {}
      }
      this.canvas?.remove();
      delete this.card.dataset.particleMatrixReady;
    }
  }

  const cards = [...document.querySelectorAll(GRID_SELECTOR)];
  if (!cards.length) return;

  const instances = new Map();
  let raf = 0;

  function scheduleUpdate(force = false) {
    if (raf && !force) return;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      raf = 0;
      instances.forEach(instance => instance.update(force));
    });
  }

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const card = entry.target;
          if (!instances.has(card)) {
            const instance = new ParticleMatrixCard(card);
            instances.set(card, instance);
            instance.init().then(() => scheduleUpdate(true));
          }
          observer.unobserve(card);
        });
      }, { rootMargin: isSmall ? '520px 0px' : '900px 0px', threshold: 0.001 })
    : null;

  cards.forEach(card => {
    if (observer) observer.observe(card);
    else {
      const instance = new ParticleMatrixCard(card);
      instances.set(card, instance);
      instance.init().then(() => scheduleUpdate(true));
    }
  });

  window.addEventListener('scroll', () => scheduleUpdate(false), { passive: true });
  window.addEventListener('resize', () => scheduleUpdate(true), { passive: true });
  document.addEventListener('projectfilterchange', () => scheduleUpdate(true));

  window.addEventListener('pagehide', () => {
    if (raf) cancelAnimationFrame(raf);
    observer?.disconnect();
    instances.forEach(instance => instance.destroy());
    instances.clear();
  }, { once: true });

  scheduleUpdate(true);
})();