const active = new WeakMap();
const visible = (el) => { el.classList.add('sf-motion-active'); el.classList.remove('sf-motion-pending'); };

function observe(el, options, activate) {
  if (!('IntersectionObserver' in window)) { activate(); return () => {}; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { activate(); if (!options.repeat) observer.unobserve(el); }
      else if (options.repeat) el.classList.remove('sf-motion-active');
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -4% 0px' });
  observer.observe(el);
  return () => observer.disconnect();
}

export async function mount(el, options = {}) {
  destroy(el);
  const preset = options.preset || 'section-reveal';
  const reduced = options.reduced === true;
  el.dataset.sfMotionResolvedEngine = 'css_native';
  el.classList.add('sf-motion-node', `sf-motion-${preset}`);
  el.style.setProperty('--sf-motion-duration', `${Math.max(0, Number(options.duration ?? .36))}s`);
  el.style.setProperty('--sf-motion-delay', `${Math.max(0, Number(options.delay ?? 0))}s`);
  el.style.setProperty('--sf-motion-stagger', `${Math.max(0, Number(options.stagger ?? .06))}s`);
  el.style.setProperty('--sf-motion-intensity', String(options.intensityFactor ?? 1));
  const cleanup = [];
  const activate = () => visible(el);
  if (reduced || options.trigger === 'static' || options.trigger === 'load') activate();
  else if (options.trigger === 'continuous') activate();
  else if (options.trigger === 'interaction') {
    activate();
    const enter = () => el.classList.add('sf-motion-interacting');
    const leave = () => el.classList.remove('sf-motion-interacting');
    el.addEventListener('pointerenter', enter); el.addEventListener('pointerleave', leave);
    el.addEventListener('focusin', enter); el.addEventListener('focusout', leave);
    cleanup.push(() => { el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); el.removeEventListener('focusin', enter); el.removeEventListener('focusout', leave); });
  } else {
    el.classList.add('sf-motion-pending');
    cleanup.push(observe(el, options, activate));
  }
  active.set(el, cleanup);
  return { engine: 'css_native', activate, pause: () => el.classList.add('sf-motion-paused'), resume: () => el.classList.remove('sf-motion-paused'), destroy: () => destroy(el) };
}

export function destroy(el) {
  (active.get(el) || []).forEach((fn) => { try { fn(); } catch (_) {} });
  active.delete(el);
  [...el.classList].filter((name) => name.startsWith('sf-motion-')).forEach((name) => el.classList.remove(name));
  delete el.dataset.sfMotionResolvedEngine;
}
