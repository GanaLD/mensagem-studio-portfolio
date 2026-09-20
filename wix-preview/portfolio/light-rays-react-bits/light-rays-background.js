/* React Bits LightRays — static preview runtime.
   Official component source: ./LightRays.jsx
   Registry dependency: ogl@^1.0.11
   Runtime uses the same shader/uniform model with the requested props. */

const LIGHT_RAYS_CONFIG = Object.freeze({
  raysOrigin: 'top-center',
  raysColor: '#00ffff',
  raysSpeed: 1.5,
  lightSpread: 0.6,
  rayLength: 1.2,
  followMouse: true,
  mouseInfluence: 0.4,
  noiseAmount: 0.08,
  distortion: 0.3,
  className: 'custom-rays',
  fadeDistance: 1.1,
  saturation: 1.3
});

const DEFAULT_COLOR = '#ffffff';

const hexToRgb = hex => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const getAnchorAndDir = (origin, w, h) => {
  const outside = 0.2;
  switch (origin) {
    case 'top-left':
      return { anchor: [0, -outside * h], dir: [0, 1] };
    case 'top-right':
      return { anchor: [w, -outside * h], dir: [0, 1] };
    case 'left':
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case 'right':
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case 'bottom-left':
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-center':
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-right':
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default:
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;
uniform float lightMode;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;

  if (lightMode > 0.5) {
    vec3 mapped = vec3(1.0) - exp(-max(fragColor.rgb, vec3(0.0)) * 1.35);
    float energy = clamp(max(mapped.r, max(mapped.g, mapped.b)), 0.0, 1.0);
    vec3 hue = mapped / max(energy, 0.0001);
    vec3 ink = mix(hue * 0.25, hue * 0.72, energy);
    fragColor = vec4(mix(vec3(1.0), ink, energy), 1.0);
  }
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`;

async function mountLightRays() {
  const host = document.querySelector('.projects-shader');
  if (!host || host.dataset.lightRaysMounted === '1') return;

  host.dataset.lightRaysMounted = '1';
  host.dataset.lightRaysDependency = 'ogl@1.0.11';
  host.classList.remove('plasma-react-bits-active');
  host.classList.add('light-rays-react-bits-active');

  host.querySelectorAll(
    '#projects-plasma-root,.plasma-container,.projects-aurora-canvas,.projects-heated-canvas,.projects-21st-shader-canvas,#projects-21st-shader-root'
  ).forEach(node => node.remove());

  const root = document.createElement('div');
  root.id = 'projects-light-rays-root';
  root.setAttribute('aria-hidden', 'true');

  const container = document.createElement('div');
  container.className = `light-rays-container ${LIGHT_RAYS_CONFIG.className}`.trim();
  root.appendChild(container);
  host.prepend(root);

  let Renderer;
  let Program;
  let Triangle;
  let Mesh;

  try {
    ({ Renderer, Program, Triangle, Mesh } = await import('https://esm.sh/ogl@1.0.11'));
  } catch (error) {
    host.dataset.lightRaysError = 'ogl-load-failed';
    console.warn('LightRays: failed to load ogl@1.0.11', error);
    return;
  }

  if (!container.isConnected) return;

  const renderer = new Renderer({
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    alpha: true
  });
  const gl = renderer.gl;
  gl.canvas.style.width = '100%';
  gl.canvas.style.height = '100%';
  container.appendChild(gl.canvas);

  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: [1, 1] },
    rayPos: { value: [0, 0] },
    rayDir: { value: [0, 1] },
    raysColor: { value: hexToRgb(LIGHT_RAYS_CONFIG.raysColor || DEFAULT_COLOR) },
    raysSpeed: { value: LIGHT_RAYS_CONFIG.raysSpeed },
    lightSpread: { value: LIGHT_RAYS_CONFIG.lightSpread },
    rayLength: { value: LIGHT_RAYS_CONFIG.rayLength },
    pulsating: { value: 0.0 },
    fadeDistance: { value: LIGHT_RAYS_CONFIG.fadeDistance },
    saturation: { value: LIGHT_RAYS_CONFIG.saturation },
    mousePos: { value: [0.5, 0.5] },
    mouseInfluence: { value: LIGHT_RAYS_CONFIG.mouseInfluence },
    noiseAmount: { value: LIGHT_RAYS_CONFIG.noiseAmount },
    distortion: { value: LIGHT_RAYS_CONFIG.distortion },
    lightMode: { value: 0.0 }
  };

  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex: VERTEX_SHADER,
    fragment: FRAGMENT_SHADER,
    uniforms
  });
  const mesh = new Mesh(gl, { geometry, program });

  const mouse = { x: 0.5, y: 0.5 };
  const smoothMouse = { x: 0.5, y: 0.5 };
  let animationId = 0;
  let visible = true;
  let destroyed = false;

  const updatePlacement = () => {
    if (destroyed || !container.isConnected) return;
    renderer.dpr = Math.min(window.devicePixelRatio || 1, 2);

    const { clientWidth: wCSS, clientHeight: hCSS } = container;
    if (!wCSS || !hCSS) return;

    renderer.setSize(wCSS, hCSS);

    const dpr = renderer.dpr;
    const w = wCSS * dpr;
    const h = hCSS * dpr;
    uniforms.iResolution.value = [w, h];

    const { anchor, dir } = getAnchorAndDir(LIGHT_RAYS_CONFIG.raysOrigin, w, h);
    uniforms.rayPos.value = anchor;
    uniforms.rayDir.value = dir;
  };

  const handleMouseMove = event => {
    if (!LIGHT_RAYS_CONFIG.followMouse || destroyed) return;
    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouse.x = (event.clientX - rect.left) / rect.width;
    mouse.y = (event.clientY - rect.top) / rect.height;
  };

  const loop = time => {
    if (destroyed || !visible || document.hidden) {
      animationId = 0;
      return;
    }

    uniforms.iTime.value = time * 0.001;

    if (LIGHT_RAYS_CONFIG.followMouse && LIGHT_RAYS_CONFIG.mouseInfluence > 0) {
      const smoothing = 0.92;
      smoothMouse.x = smoothMouse.x * smoothing + mouse.x * (1 - smoothing);
      smoothMouse.y = smoothMouse.y * smoothing + mouse.y * (1 - smoothing);
      uniforms.mousePos.value = [smoothMouse.x, smoothMouse.y];
    }

    try {
      renderer.render({ scene: mesh });
      animationId = requestAnimationFrame(loop);
    } catch (error) {
      console.warn('LightRays WebGL rendering error:', error);
      animationId = 0;
    }
  };

  const start = () => {
    if (destroyed || animationId || !visible || document.hidden) return;
    animationId = requestAnimationFrame(loop);
  };

  const stop = () => {
    if (!animationId) return;
    cancelAnimationFrame(animationId);
    animationId = 0;
  };

  const observer = new IntersectionObserver(
    entries => {
      const entry = entries[0];
      visible = Boolean(entry && entry.isIntersecting);
      if (visible) start();
      else stop();
    },
    { threshold: 0.1 }
  );

  const onVisibility = () => {
    if (document.hidden) stop();
    else start();
  };

  const resizeObserver = new ResizeObserver(updatePlacement);

  window.addEventListener('resize', updatePlacement, { passive: true });
  if (LIGHT_RAYS_CONFIG.followMouse) {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
  }
  document.addEventListener('visibilitychange', onVisibility);
  observer.observe(container);
  resizeObserver.observe(container);

  updatePlacement();
  start();

  const cleanup = () => {
    if (destroyed) return;
    destroyed = true;
    stop();
    observer.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener('resize', updatePlacement);
    window.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('visibilitychange', onVisibility);

    try {
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) loseContext.loseContext();
      gl.canvas.remove();
    } catch (error) {
      console.warn('LightRays cleanup error:', error);
    }
  };

  window.addEventListener('pagehide', cleanup, { once: true });
}

mountLightRays();
