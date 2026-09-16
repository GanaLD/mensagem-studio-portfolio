(() => {
  const root = document.documentElement;
  root.classList.add('ms-catalog-motion');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallScreen = () => window.matchMedia('(max-width: 620px)').matches;
  let observer = null;
  let catalogObserver = null;

  function revealNow(el) {
    el.classList.add('is-visible');
    const delay = parseInt(el.style.getPropertyValue('--ms-catalog-delay'), 10) || 0;
    window.setTimeout(() => {
      el.classList.remove('ms-catalog-reveal', 'is-visible');
      el.style.removeProperty('--ms-catalog-x');
      el.style.removeProperty('--ms-catalog-delay');
      delete el.dataset.msCatalogMotion;
    }, reduceMotion ? 0 : 980 + delay);
  }

  function getObserver() {
    if (observer || reduceMotion || !('IntersectionObserver' in window)) return observer;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        revealNow(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -7% 0px'
    });
    return observer;
  }

  function bind(el, x, delay) {
    if (!el || el.dataset.msCatalogMotion === '1') return;
    el.dataset.msCatalogMotion = '1';
    el.classList.add('ms-catalog-reveal');
    el.style.setProperty('--ms-catalog-x', x + 'px');
    el.style.setProperty('--ms-catalog-delay', delay + 'ms');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealNow(el);
      return;
    }

    getObserver().observe(el);
  }

  function prepare(scope) {
    const base = scope && scope.querySelectorAll ? scope : document;
    const distance = smallScreen() ? 24 : 46;

    base.querySelectorAll('.category-head').forEach(head => {
      bind(head, -distance, 0);
    });

    base.querySelectorAll('.grid').forEach(grid => {
      Array.from(grid.children).forEach((card, index) => {
        if (!card.classList.contains('card')) return;
        const x = index % 2 === 0 ? -distance : distance;
        bind(card, x, index * 80);
      });
    });
  }

  function init() {
    const catalog = document.getElementById('catalog');
    if (!catalog) {
      root.classList.remove('ms-catalog-motion');
      return;
    }

    prepare(catalog);

    if ('MutationObserver' in window) {
      catalogObserver = new MutationObserver(() => prepare(catalog));
      catalogObserver.observe(catalog, { childList:true, subtree:true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();
