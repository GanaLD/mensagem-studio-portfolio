// Scroll reveal effects for downstream Home blocks only.
// HeroScroll, Services 3D navigator, Narrative/WordScroll and Briefing content are intentionally untouched.
(() => {
  const supportsIO = 'IntersectionObserver' in window;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = [];

  const style = document.createElement('style');
  style.id = 'ms-scroll-reveal-style';
  style.textContent = `
    body.ms-reveal-ready .ms-reveal{
      opacity:0;
      transform:translate3d(0,34px,0) scale(.985);
      filter:blur(7px);
      transition:
        opacity .78s cubic-bezier(.22,.8,.24,1),
        transform .88s cubic-bezier(.22,.8,.24,1),
        filter .72s ease;
      transition-delay:var(--ms-reveal-delay,0ms);
      will-change:opacity,transform,filter;
    }
    body.ms-reveal-ready .ms-reveal.ms-reveal-left{transform:translate3d(-34px,18px,0) scale(.987)}
    body.ms-reveal-ready .ms-reveal.ms-reveal-right{transform:translate3d(34px,18px,0) scale(.987)}
    body.ms-reveal-ready .ms-reveal.ms-reveal-scale{transform:translate3d(0,22px,0) scale(.955)}
    body.ms-reveal-ready .ms-reveal.is-visible{
      opacity:1;
      transform:translate3d(0,0,0) scale(1);
      filter:blur(0);
    }

    body.ms-reveal-ready .ms-reveal-line{
      position:relative;
      overflow:hidden;
    }
    body.ms-reveal-ready .ms-reveal-line:after{
      content:"";
      position:absolute;
      left:0;right:0;bottom:0;
      height:1px;
      background:linear-gradient(90deg,transparent,var(--lime),transparent);
      transform:scaleX(0);
      transform-origin:left center;
      opacity:.72;
      transition:transform 1.05s cubic-bezier(.2,.8,.2,1) .15s;
      pointer-events:none;
    }
    body.ms-reveal-ready .ms-reveal-line.is-visible:after{transform:scaleX(1)}

    body.ms-reveal-ready .project.ms-reveal{
      transform:translate3d(0,42px,0) rotateX(2.2deg) scale(.975);
      transform-origin:50% 70%;
    }
    body.ms-reveal-ready .project.ms-reveal.is-visible{transform:translate3d(0,0,0) rotateX(0) scale(1)}

    body.ms-reveal-ready .stage.ms-reveal{
      transform:translate3d(0,38px,0) scale(.975);
      box-shadow:0 0 0 rgba(0,0,0,0);
    }
    body.ms-reveal-ready .stage.ms-reveal.is-visible{
      transform:translate3d(0,0,0) scale(1);
      box-shadow:0 30px 110px rgba(0,0,0,.24);
    }

    body.ms-reveal-ready .final-cta .ms-reveal{transform:translate3d(0,28px,0) scale(.975)}

    /* Briefing is static, crisp foreground content. Never blur/transform it. */
    #brief .brief-card,
    #brief .brief-card *,
    #brief .step,
    #brief .step *{
      filter:none!important;
    }

    @media(max-width:760px){
      body.ms-reveal-ready .ms-reveal,
      body.ms-reveal-ready .project.ms-reveal,
      body.ms-reveal-ready .stage.ms-reveal{
        transform:translate3d(0,24px,0) scale(.99);
        filter:blur(4px);
      }
      body.ms-reveal-ready .ms-reveal.is-visible,
      body.ms-reveal-ready .project.ms-reveal.is-visible,
      body.ms-reveal-ready .stage.ms-reveal.is-visible{
        transform:translate3d(0,0,0) scale(1);
        filter:blur(0);
      }
    }
    @media(prefers-reduced-motion:reduce){
      body.ms-reveal-ready .ms-reveal{
        opacity:1!important;
        transform:none!important;
        filter:none!important;
        transition:none!important;
      }
      body.ms-reveal-ready .ms-reveal-line:after{display:none!important}
    }
  `;
  document.head.appendChild(style);

  function add(el, {variant='', delay=0, line=false} = {}) {
    if (!el || el.dataset.msRevealBound === '1') return;
    el.dataset.msRevealBound = '1';
    el.classList.add('ms-reveal');
    if (variant) el.classList.add(`ms-reveal-${variant}`);
    if (line) el.classList.add('ms-reveal-line');
    el.style.setProperty('--ms-reveal-delay', `${delay}ms`);
    targets.push(el);
  }

  // Clean any stale Briefing reveal classes from a cached/previous runtime pass.
  document.querySelectorAll('#brief .brief-card, #brief .step').forEach(el => {
    el.classList.remove('ms-reveal','ms-reveal-left','ms-reveal-right','ms-reveal-scale','is-visible');
    delete el.dataset.msRevealBound;
    el.style.removeProperty('--ms-reveal-delay');
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.filter = 'none';
  });

  // Only sections after the Narrative/WordScroll block.
  document.querySelectorAll('#afterWord > .section').forEach((section) => {
    const head = section.querySelector('.section-head');
    if (head) {
      add(head.querySelector('.kicker'), {variant:'left', delay:0});
      add(head.querySelector('h2'), {variant:'left', delay:70});
      add(head.querySelector('p'), {variant:'right', delay:130});
      head.classList.add('ms-reveal-line');
    }
  });

  // Shared media stages: PDF, 3D and Motion.
  ['#pdf .stage','#three .stage','#motion .stage'].forEach((sel, i) => {
    add(document.querySelector(sel), {variant:'scale', delay:80 + i * 25, line:true});
  });

  // Portfolio cards: stagger by visual order.
  document.querySelectorAll('#projects .project').forEach((card, i) => {
    add(card, {delay:Math.min(i * 85, 430)});
  });

  // Briefing cards and steps are deliberately excluded from reveal animation.

  // Final CTA: staged appearance.
  const final = document.querySelector('.final-cta');
  if (final) {
    add(final.querySelector('.kicker'), {delay:0});
    add(final.querySelector('h2'), {variant:'scale', delay:80});
    add(final.querySelector('p'), {delay:150});
    add(final.querySelector('.cta-row'), {delay:220});
  }

  // Footer arrives last, subtly.
  add(document.querySelector('#afterWord > footer'), {delay:80});

  if (reduceMotion || !supportsIO) {
    document.body.classList.add('ms-reveal-ready');
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  document.body.classList.add('ms-reveal-ready');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    root:null,
    rootMargin:'0px 0px -10% 0px',
    threshold:0.12
  });

  requestAnimationFrame(() => {
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * .88 && r.bottom > 0) el.classList.add('is-visible');
      else observer.observe(el);
    });
  });
})();
