/* SERVICES_SECTION_SCROLL_SYNC_V1
   Keeps the services category rail sticky and synchronized with the visible catalog section. */
(() => {
  const STYLE_ID = 'services-section-scroll-sync-lock';

  function ensureStickyStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.filters-wrap{position:-webkit-sticky!important;position:sticky!important;top:72px!important;z-index:35!important;}',
      '.filters{scroll-behavior:smooth;}',
      '@media(max-width:767px){.filters-wrap{top:64px!important;}}',
      '@media(prefers-reduced-motion:reduce){.filters{scroll-behavior:auto;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function init() {
    ensureStickyStyle();

    const wrap = document.querySelector('.filters-wrap');
    const filters = document.getElementById('filters');
    const catalog = document.getElementById('catalog');
    if (!wrap || !filters || !catalog) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let lastCat = '';

    function sections() {
      return Array.from(catalog.querySelectorAll('.category[data-service-category]'));
    }

    function visibleCategory() {
      const list = sections();
      if (!list.length) return 'Todos';

      const wrapRect = wrap.getBoundingClientRect();
      const catalogRect = catalog.getBoundingClientRect();
      const probeY = Math.max(wrapRect.bottom + 20, 96);

      if (catalogRect.top > probeY) return 'Todos';

      let current = list[0].dataset.serviceCategory || 'Todos';
      for (const section of list) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY) {
          current = section.dataset.serviceCategory || current;
        } else {
          break;
        }
      }
      return current;
    }

    function centerChip(button) {
      if (!button) return;
      const targetLeft = button.offsetLeft - (filters.clientWidth - button.offsetWidth) / 2;
      const maxLeft = Math.max(0, filters.scrollWidth - filters.clientWidth);
      const left = Math.max(0, Math.min(maxLeft, targetLeft));
      if (Math.abs(filters.scrollLeft - left) < 8) return;
      filters.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    function apply(cat) {
      if (!cat) return;
      const chips = Array.from(filters.querySelectorAll('.chip[data-cat]'));
      if (!chips.length) return;

      let selected = null;
      chips.forEach(chip => {
        const isCurrent = chip.dataset.cat === cat;
        chip.classList.toggle('on', isCurrent);
        if (isCurrent) {
          chip.setAttribute('aria-current', 'true');
          selected = chip;
        } else {
          chip.removeAttribute('aria-current');
        }
      });

      if (selected && cat !== lastCat) centerChip(selected);
      lastCat = cat;
    }

    function paint() {
      raf = 0;
      apply(visibleCategory());
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(paint);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('orientationchange', schedule, { passive: true });

    filters.addEventListener('click', () => {
      schedule();
      window.setTimeout(schedule, 120);
      window.setTimeout(schedule, 520);
    });

    if ('MutationObserver' in window) {
      const observer = new MutationObserver(schedule);
      observer.observe(catalog, { childList: true, subtree: false });
      observer.observe(filters, { childList: true });
    }

    schedule();
    window.setTimeout(schedule, 80);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();