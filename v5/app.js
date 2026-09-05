const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;

const state = {
  scrollY: window.scrollY,
  viewportW: window.innerWidth,
  viewportH: window.innerHeight,
  heroProgress: 0,
  heroVideoTarget: 0,
  pointerX: 0,
  pointerY: 0,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

const hero = document.querySelector('#hero');
const heroVideo = document.querySelector('#heroVideo');
const heroProgressEl = document.querySelector('#heroProgress');
const topbar = document.querySelector('[data-topbar]');
const projectGrid = document.querySelector('#projectGrid');
const threeCanvas = document.querySelector('#threeCanvas');
const threeStage = document.querySelector('#threeStage');

let threeRuntime = null;
let running = true;
let lastTime = performance.now();

function measure() {
  state.viewportW = window.innerWidth;
  state.viewportH = window.innerHeight;
  state.scrollY = window.scrollY;

  if (hero && !state.reducedMotion) {
    const start = hero.offsetTop;
    const range = Math.max(1, hero.offsetHeight - state.viewportH);
    state.heroProgress = clamp((state.scrollY - start) / range);
  } else {
    state.heroProgress = 0;
  }

  if (heroProgressEl) {
    heroProgressEl.style.transform = `scaleY(${state.heroProgress.toFixed(4)})`;
  }

  if (topbar) {
    topbar.classList.toggle('is-solid', state.scrollY > 24);
  }

  if (heroVideo?.duration && Number.isFinite(heroVideo.duration)) {
    state.heroVideoTarget = state.reducedMotion
      ? Math.min(heroVideo.duration * 0.35, Math.max(0, heroVideo.duration - 0.05))
      : state.heroProgress * Math.max(0, heroVideo.duration - 0.05);
  }
}

function onScroll() {
  state.scrollY = window.scrollY;
  measure();
}

function onResize() {
  measure();
  threeRuntime?.resize?.();
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onResize, { passive: true });
window.addEventListener('orientationchange', onResize, { passive: true });

window.addEventListener('pointermove', (event) => {
  state.pointerX = (event.clientX / Math.max(1, state.viewportW)) * 2 - 1;
  state.pointerY = (event.clientY / Math.max(1, state.viewportH)) * 2 - 1;
}, { passive: true });

heroVideo?.addEventListener('loadedmetadata', () => {
  heroVideo.pause();
  measure();
});

heroVideo?.addEventListener('error', () => {
  const fallback = '../assets/hero/dermacast-laila.mp4';
  if (heroVideo.dataset.fallbackApplied === 'true') return;
  heroVideo.dataset.fallbackApplied = 'true';
  heroVideo.src = fallback;
  heroVideo.load();
});

async function loadProjects() {
  if (!projectGrid) return;
  try {
    const response = await fetch('./data/projects-v5.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`PROJECT_REGISTRY_HTTP_${response.status}`);
    const data = await response.json();
    const fragment = document.createDocumentFragment();

    for (const [index, item] of data.items.entries()) {
      const card = document.createElement('a');
      card.className = 'project-card';
      card.href = item.folderUrl;
      card.target = '_blank';
      card.rel = 'noopener';
      card.setAttribute('aria-label', `${item.title} — abrir pasta do projeto`);

      const media = document.createElement('div');
      media.className = 'project-media';
      const img = document.createElement('img');
      img.loading = index < 4 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.alt = `Capa do projeto ${item.title}`;
      img.referrerPolicy = 'no-referrer';
      img.src = `https://drive.google.com/thumbnail?id=${encodeURIComponent(item.coverFileId)}&sz=w1600`;
      img.addEventListener('error', () => {
        media.classList.add('is-missing');
        img.remove();
        const fallback = document.createElement('span');
        fallback.className = 'media-fallback';
        fallback.textContent = item.title;
        media.append(fallback);
      }, { once: true });
      media.append(img);

      const body = document.createElement('div');
      body.className = 'project-body';
      const title = document.createElement('h3');
      title.textContent = item.title;
      const meta = document.createElement('span');
      meta.textContent = item.source === 'portfolio-primary' ? 'Arquivo I' : 'Arquivo II';
      body.append(title, meta);

      card.append(media, body);
      fragment.append(card);
    }

    projectGrid.replaceChildren(fragment);
  } catch (error) {
    console.error('[V5] Project registry failed', error);
    const message = document.createElement('p');
    message.className = 'loading-copy';
    message.textContent = 'Não foi possível carregar o registro de projetos.';
    projectGrid.replaceChildren(message);
  }
}

async function setupThreeRuntime() {
  if (!threeCanvas || !threeStage) return;
  try {
    const THREE = await import('../assets/motion/vendor/three/three.module.min.js');
    const renderer = new THREE.WebGLRenderer({ canvas: threeCanvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.15, 6.4);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.18, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1ec47b,
      roughness: 0.24,
      metalness: 0.18,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const ringGeometry = new THREE.TorusGeometry(1.72, 0.035, 18, 160);
    const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xf0eadc, roughness: 0.34, metalness: 0.5 });
    const ringA = new THREE.Mesh(ringGeometry, ringMaterial);
    ringA.rotation.set(Math.PI / 2.5, 0.3, 0.2);
    group.add(ringA);

    const ringB = ringA.clone();
    ringB.scale.setScalar(1.14);
    ringB.rotation.set(0.3, Math.PI / 2.25, 0.7);
    group.add(ringB);

    scene.add(new THREE.HemisphereLight(0xf0eadc, 0x07110d, 1.4));
    const key = new THREE.DirectionalLight(0xffd8b0, 4.5);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x1ec47b, 3.1);
    rim.position.set(-5, 1, -3);
    scene.add(rim);

    const resize = () => {
      const rect = threeStage.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = (time, delta) => {
      const slow = state.reducedMotion ? 0 : 1;
      const px = state.pointerX * 0.22 * slow;
      const py = state.pointerY * 0.12 * slow;
      group.rotation.y = lerp(group.rotation.y, px + time * 0.00012 * slow, Math.min(1, delta * 3.5));
      group.rotation.x = lerp(group.rotation.x, -py + Math.sin(time * 0.00033) * 0.06 * slow, Math.min(1, delta * 3.5));
      ringA.rotation.z += delta * 0.13 * slow;
      ringB.rotation.x += delta * 0.09 * slow;
      renderer.render(scene, camera);
    };

    resize();
    threeRuntime = { resize, render, renderer };
  } catch (error) {
    console.error('[V5] WebGL runtime failed', error);
    threeStage.classList.add('webgl-failed');
  }
}

function frame(now) {
  if (!running) return;
  const delta = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
  lastTime = now;

  if (heroVideo?.duration && Number.isFinite(heroVideo.duration) && heroVideo.readyState >= 2) {
    const current = heroVideo.currentTime || 0;
    const diff = state.heroVideoTarget - current;
    if (Math.abs(diff) > 0.018) {
      const smoothing = state.reducedMotion ? 1 : 1 - Math.exp(-delta * 14);
      heroVideo.currentTime = clamp(current + diff * smoothing, 0, Math.max(0, heroVideo.duration - 0.02));
    }
  }

  threeRuntime?.render?.(now, delta);
  requestAnimationFrame(frame);
}

window.addEventListener('pagehide', () => {
  running = false;
  threeRuntime?.renderer?.dispose?.();
}, { once: true });

measure();
await Promise.allSettled([loadProjects(), setupThreeRuntime()]);
requestAnimationFrame(frame);
