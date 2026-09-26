(() => {
  'use strict';

  const GRID_SELECTOR = '#grid';
  const CARD_SELECTOR = ':scope > .card';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall = window.matchMedia('(max-width: 700px)').matches;

  const style = document.createElement('style');
  style.id = 'project-full-card-particle-build-v2';
  style.textContent = `
    #grid{
      position:relative!important;
      overflow:visible!important;
      isolation:isolate;
    }
    .project-card-particle-stage{
      position:absolute;
      z-index:8;
      pointer-events:none;
      overflow:visible;
      perspective:1000px;
      transform-style:preserve-3d;
      contain:layout style;
    }
    .project-card-fragment{
      position:absolute;
      overflow:hidden;
      pointer-events:none;
      transform-style:preserve-3d;
      transform-origin:center center;
      will-change:transform,opacity;
      backface-visibility:hidden;
    }
    .project-card-fragment-content{
      position:absolute!important;
      display:block!important;
      margin:0!important;
      grid-column:auto!important;
      transform:none!important;
      transition:none!important;
      pointer-events:none!important;
      overflow:hidden!important;
      backface-visibility:hidden;
    }
    .project-card-fragment-content,
    .project-card-fragment-content *{
      animation:none!important;
      transition:none!important;
      pointer-events:none!important;
    }
    .project-card-fragment-content .hover-preview-video,
    .project-card-fragment-content .hover-preview-image,
    .project-card-fragment-content canvas{
      display:none!important;
    }
    .project-card-fragment-content .media > img{
      opacity:1!important;
      transform:none!important;
    }
    .card[data-full-card-particle-ready="true"]{
      will-change:opacity;
    }
    @media(max-width:700px){
      .project-card-particle-stage{perspective:760px}
    }
    @media(prefers-reduced-motion:reduce){
      .project-card-particle-stage{display:none!important}
      #grid>.card{opacity:1!important;pointer-events:auto!important}
    }
  `;
  document.head.appendChild(style);

  if (reduceMotion) return;

  const grid = document.querySelector(GRID_SELECTOR);
  if (!grid) return;
  const cards = [...grid.querySelectorAll(CARD_SELECTOR)];
  if (!cards.length) return;

  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const smoothstep = (a, b, v) => {
    const t = clamp((v - a) / Math.max(0.0001, b - a));
    return t * t * (3 - 2 * t);
  };
  const easeOutCubic = t => 1 - Math.pow(1 - clamp(t), 3);

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

  function stripCloneRuntime(clone) {
    clone.removeAttribute('id');
    clone.removeAttribute('hidden');
    clone.removeAttribute('aria-hidden');
    clone.removeAttribute('data-full-card-particle-ready');
    clone.removeAttribute('data-full-card-particle-complete');
    clone.removeAttribute('data-particle-matrix-ready');
    clone.classList.add('project-card-fragment-content');
    clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    clone.querySelectorAll('video,canvas,.hover-preview-video,.hover-preview-image').forEach(node => node.remove());
    clone.querySelectorAll('.has-hover-preview').forEach(node => node.classList.remove('has-hover-preview'));
    clone.querySelectorAll('img').forEach(img => {
      img.loading = 'eager';
      img.decoding = 'async';
      img.style.opacity = '1';
      img.style.transform = 'none';
    });
    clone.querySelectorAll('a,button,[tabindex]').forEach(node => {
      node.tabIndex = -1;
      node.setAttribute('aria-hidden', 'true');
    });
    return clone;
  }

  class FullCardParticleBuild {
    constructor(card) {
      this.card = card;
      this.stage = null;
      this.fragments = [];
      this.ready = false;
      this.progress = -1;
      this.seed = hashString(card.dataset.projectSlug || card.querySelector('h2')?.textContent || 'project');
      this.originalOpacity = card.style.opacity || '';
      this.originalPointerEvents = card.style.pointerEvents || '';
      this.originalWillChange = card.style.willChange || '';
      this.resizeObserver = null;
      this.lastW = 0;
      this.lastH = 0;
    }

    build() {
      if (this.ready || this.card.hidden) return;
      const rect = this.card.getBoundingClientRect();
      if (rect.width < 40 || rect.height < 40) return;

      const stage = document.createElement('div');
      stage.className = 'project-card-particle-stage';
      stage.setAttribute('aria-hidden', 'true');
      grid.appendChild(stage);
      this.stage = stage;

      this.card.dataset.fullCardParticleReady = 'true';
      this.card.style.opacity = '0';
      this.card.style.pointerEvents = 'none';
      this.card.style.willChange = 'opacity';

      this.layoutStage();
      this.createFragments();
      this.ready = true;
      this.update(true);

      if ('ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver(() => {
          if (!this.ready || this.card.hidden) return;
          const r = this.card.getBoundingClientRect();
          if (Math.abs(r.width - this.lastW) < 1 && Math.abs(r.height - this.lastH) < 1) {
            this.layoutStage();
            return;
          }
          this.rebuild();
        });
        this.resizeObserver.observe(this.card);
      }
    }

    layoutStage() {
      if (!this.stage || this.card.hidden) return;
      const gridRect = grid.getBoundingClientRect();
      const rect = this.card.getBoundingClientRect();
      this.lastW = rect.width;
      this.lastH = rect.height;
      this.stage.style.left = `${rect.left - gridRect.left}px`;
      this.stage.style.top = `${rect.top - gridRect.top}px`;
      this.stage.style.width = `${rect.width}px`;
      this.stage.style.height = `${rect.height}px`;
    }

    createFragments() {
      if (!this.stage) return;
      this.stage.textContent = '';
      this.fragments = [];

      const w = this.lastW;
      const h = this.lastH;
      const targetTile = isSmall ? 86 : 104;
      const cols = Math.max(4, Math.min(isSmall ? 6 : 9, Math.round(w / targetTile)));
      const rows = Math.max(4, Math.min(isSmall ? 7 : 9, Math.round(h / targetTile)));
      const tileW = w / cols;
      const tileH = h / rows;
      const rand = mulberry32(this.seed ^ (cols * 73856093) ^ (rows * 19349663));

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const left = x * tileW;
          const top = y * tileH;
          const fw = x === cols - 1 ? w - left : tileW + 0.55;
          const fh = y === rows - 1 ? h - top : tileH + 0.55;

          const fragment = document.createElement('div');
          fragment.className = 'project-card-fragment';
          fragment.style.left = `${left}px`;
          fragment.style.top = `${top}px`;
          fragment.style.width = `${fw}px`;
          fragment.style.height = `${fh}px`;

          const clone = stripCloneRuntime(this.card.cloneNode(true));
          clone.style.left = `${-left}px`;
          clone.style.top = `${-top}px`;
          clone.style.width = `${w}px`;
          clone.style.height = `${h}px`;
          clone.style.opacity = '1';
          clone.style.pointerEvents = 'none';
          clone.style.willChange = 'auto';
          fragment.appendChild(clone);

          const nx = (x + 0.5) / cols - 0.5;
          const ny = (y + 0.5) / rows - 0.5;
          const radial = Math.hypot(nx, ny);
          const angle = Math.atan2(ny, nx) + (rand() - 0.5) * 1.25;
          const distance = (isSmall ? 60 : 92) + rand() * (isSmall ? 130 : 240) + radial * (isSmall ? 100 : 180);
          const scatterX = Math.cos(angle) * distance + (rand() - 0.5) * 70;
          const scatterY = Math.sin(angle) * distance + (rand() - 0.5) * 70;
          const scatterZ = (rand() - 0.5) * (isSmall ? 170 : 320);
          const rotateX = (rand() - 0.5) * (isSmall ? 18 : 34);
          const rotateY = (rand() - 0.5) * (isSmall ? 22 : 42);
          const rotateZ = (rand() - 0.5) * (isSmall ? 14 : 24);
          const delay = rand() * 0.18;
          const startScale = 0.72 + rand() * 0.18;

          this.stage.appendChild(fragment);
          this.fragments.push({
            el: fragment,
            scatterX,
            scatterY,
            scatterZ,
            rotateX,
            rotateY,
            rotateZ,
            delay,
            startScale
          });
        }
      }
    }

    rebuild() {
      if (!this.ready || !this.stage) return;
      this.layoutStage();
      this.createFragments();
      this.update(true);
    }

    getProgress() {
      const rect = this.card.getBoundingClientRect();
      if (!rect.height || this.card.hidden) return this.progress < 0 ? 0 : this.progress;
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      const start = vh * (isSmall ? 0.98 : 0.94);
      const end = vh * (isSmall ? 0.55 : 0.50);
      return clamp((start - rect.top) / Math.max(1, start - end));
    }

    update(force = false) {
      if (this.card.hidden) {
        if (this.stage) this.stage.style.display = 'none';
        return;
      }
      if (!this.ready) return;
      if (this.stage) this.stage.style.display = '';

      this.layoutStage();
      const p = this.getProgress();
      if (!force && Math.abs(p - this.progress) < 0.0015) return;
      this.progress = p;

      const realAlpha = smoothstep(0.865, 0.995, p);
      const fragmentFade = 1 - smoothstep(0.90, 0.998, p);
      this.card.style.opacity = String(realAlpha);
      const interactive = p > 0.975;
      this.card.style.pointerEvents = interactive ? this.originalPointerEvents || 'auto' : 'none';
      this.card.dataset.fullCardParticleComplete = interactive ? 'true' : 'false';

      for (const item of this.fragments) {
        const local = clamp((p - item.delay) / Math.max(0.001, 1 - item.delay));
        const e = easeOutCubic(local);
        const inv = 1 - e;
        const tx = item.scatterX * inv;
        const ty = item.scatterY * inv;
        const tz = item.scatterZ * inv;
        const rx = item.rotateX * inv;
        const ry = item.rotateY * inv;
        const rz = item.rotateZ * inv;
        const scale = item.startScale + (1 - item.startScale) * e;
        const born = 0.22 + 0.78 * smoothstep(0.0, 0.42, local);
        const opacity = clamp(born * fragmentFade, 0, 1);

        item.el.style.opacity = String(opacity);
        item.el.style.transform = `translate3d(${tx}px,${ty}px,${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`;
      }

      if (this.stage) {
        this.stage.style.visibility = p >= 0.9995 ? 'hidden' : 'visible';
      }
    }

    destroy() {
      this.resizeObserver?.disconnect();
      this.stage?.remove();
      this.stage = null;
      this.fragments = [];
      this.card.style.opacity = this.originalOpacity;
      this.card.style.pointerEvents = this.originalPointerEvents;
      this.card.style.willChange = this.originalWillChange;
      delete this.card.dataset.fullCardParticleReady;
      delete this.card.dataset.fullCardParticleComplete;
      this.ready = false;
    }
  }

  const instances = new Map(cards.map(card => [card, new FullCardParticleBuild(card)]));
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
        for (const entry of entries) {
          const instance = instances.get(entry.target);
          if (!instance) continue;
          if (entry.isIntersecting) {
            instance.build();
            instance.update(true);
          }
        }
      }, { rootMargin: isSmall ? '720px 0px' : '1200px 0px', threshold: 0.001 })
    : null;

  cards.forEach(card => {
    if (observer) observer.observe(card);
    else instances.get(card)?.build();
  });

  const onFilterChange = () => {
    requestAnimationFrame(() => {
      instances.forEach(instance => {
        if (!instance.card.hidden && !instance.ready) instance.build();
        instance.update(true);
      });
    });
  };

  window.addEventListener('scroll', () => scheduleUpdate(false), { passive: true });
  window.addEventListener('resize', () => scheduleUpdate(true), { passive: true });
  document.addEventListener('projectfilterchange', onFilterChange);

  const hiddenObserver = new MutationObserver(mutations => {
    if (mutations.some(m => m.type === 'attributes' && m.attributeName === 'hidden')) onFilterChange();
  });
  cards.forEach(card => hiddenObserver.observe(card, { attributes: true, attributeFilter: ['hidden'] }));

  window.addEventListener('pagehide', () => {
    if (raf) cancelAnimationFrame(raf);
    observer?.disconnect();
    hiddenObserver.disconnect();
    document.removeEventListener('projectfilterchange', onFilterChange);
    instances.forEach(instance => instance.destroy());
    instances.clear();
  }, { once: true });

  scheduleUpdate(true);
})();