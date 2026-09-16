(() => {
  const root = document.documentElement;
  root.classList.add('ms-service-motion');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    const groups = [
      { selector: '.hero-grid > div', from: 'left', baseDelay: 20 },
      { selector: '.hero-side', from: 'right', baseDelay: 170 },
      { selector: '.section-head > div', from: 'left', baseDelay: 0 },
      { selector: '.section-head > p', from: 'right', baseDelay: 90 },
      { selector: '.grid .card', from: 'alternate', baseDelay: 0, stagger: 90 },
      { selector: '.proof-copy', from: 'left', baseDelay: 0 },
      { selector: '.proof-link', from: 'right', baseDelay: 110 },
      { selector: '.cta-box', from: 'up', baseDelay: 0 }
    ];

    const elements = [];
    groups.forEach(group => {
      document.querySelectorAll(group.selector).forEach((el, index) => {
        el.classList.add('ms-reveal');
        const direction = group.from === 'alternate'
          ? (index % 2 === 0 ? 'left' : 'right')
          : group.from;
        el.classList.add('ms-from-' + direction);
        const delay = (group.baseDelay || 0) + (group.stagger || 0) * index;
        el.style.setProperty('--ms-reveal-delay', delay + 'ms');
        elements.push(el);
      });
    });

    if (!elements.length) {
      root.classList.remove('ms-service-motion');
      return;
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        observer.unobserve(el);
        const delay = parseInt(getComputedStyle(el).getPropertyValue('--ms-reveal-delay'), 10) || 0;
        window.setTimeout(() => {
          el.style.removeProperty('--ms-reveal-delay');
        }, 1050 + delay);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -7% 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();