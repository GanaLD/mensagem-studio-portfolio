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
    body.ms-reveal-ready .section-head.ms-reveal-line{
      overflow:visible!important;
      clip-path:none!important;
      -webkit-clip-path:none!important;
      contain:none!important;
    }
    body.ms-reveal-ready .section-head>p.ms-section-copy-static{
      position:relative!important;
      z-index:4!important;
      overflow:visible!important;
      opacity:1!important;
      transform:none!important;
      filter:none!important;
      mix-blend-mode:normal!important;
      background:none!important;
      background-image:none!important;
      -webkit-background-clip:border-box!important;
      background-clip:border-box!important;
      -webkit-text-fill-color:#fff!important;
      color:#fff!important;
      font-weight:500!important;
      text-shadow:
        0 0 8px rgba(255,255,255,.28),
        0 0 18px rgba(255,255,255,.15),
        0 0 36px rgba(255,255,255,.08)!important;
      transition:none!important;
      will-change:auto!important;
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

      // Informational copy stays permanently crisp and luminous over the background.
      const copy = head.querySelector('p');
      if (copy) {
        copy.classList.remove('ms-reveal','ms-reveal-left','ms-reveal-right','ms-reveal-scale','is-visible');
        delete copy.dataset.msRevealBound;
        copy.style.removeProperty('--ms-reveal-delay');
        copy.style.opacity='1';
        copy.style.transform='none';
        copy.style.filter='none';
        copy.classList.add('ms-section-copy-static');
      }

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

// Load the production 3D V7 controller only when the visitor approaches the 3D section.
// This keeps the approved Hero startup completely isolated from the 3D runtime.
(() => {
  const section = document.getElementById('three');
  if (!section) return;
  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    import('./fone-3d-entry.js?v=20261006-production-v7-local')
      .catch(error => console.error('[3D V7]', error));
  };
  if (!('IntersectionObserver' in window)) {
    window.addEventListener('load', load, {once:true});
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    load();
  }, {root:null, rootMargin:'1400px 0px', threshold:0});
  observer.observe(section);
})();

// Published mobile-only recovery for the Word/GSAP horizontal showcase.
// Desktop and /wix-preview/ are intentionally excluded.
(() => {
  if (location.pathname.startsWith('/wix-preview/')) return;
  if (!matchMedia('(max-width:760px)').matches) return;
  if (window.__MS_WORD_MOBILE_GSAP_FIX_V1__) return;

  const section = document.getElementById('word');
  const sticky = section?.querySelector('.word-sticky');
  const track = document.getElementById('wordCaseVisuals');
  const copyTrack = document.getElementById('wordCopyTrack');
  const panels = [...document.querySelectorAll('#word .word-case-panel')];
  const copies = [...document.querySelectorAll('#word .word-case-copy')];
  const dots = [...document.querySelectorAll('#wordDots i')];
  const videos = [...document.querySelectorAll('#word .word-case-video')];
  const youtube = section?.querySelector('.word-case-youtube');
  const youtubePanel = youtube?.closest('.word-case-panel') || null;
  const youtubeBase = youtube?.dataset.src || '';

  if (!section || !sticky || !track || !copyTrack || panels.length !== 4 || copies.length !== 4 || !window.gsap) return;
  window.__MS_WORD_MOBILE_GSAP_FIX_V1__ = true;

  // Remove only the ScrollTrigger that owns this section. The desktop timeline is untouched.
  if (window.ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => {
      const ownsWord = trigger.trigger === section || trigger.vars?.trigger === section || trigger.pin === sticky;
      if (!ownsWord) return;
      const animation = trigger.animation;
      trigger.kill(true);
      if (animation && typeof animation.kill === 'function') animation.kill();
    });
  }

  // Defensive cleanup in case an interrupted pin left a wrapper in the mobile DOM.
  const parent = sticky.parentElement;
  if (parent?.classList?.contains('pin-spacer')) {
    parent.parentNode?.insertBefore(sticky, parent);
    parent.remove();
  }

  const style = document.createElement('style');
  style.id = 'ms-word-mobile-gsap-recovery-v1';
  style.textContent = `
    @media(max-width:760px){
      #word{
        height:400svh!important;
        min-height:400svh!important;
        overflow:visible!important;
        touch-action:pan-y!important;
      }
      #word>.word-sticky{
        position:-webkit-sticky!important;
        position:sticky!important;
        top:0!important;
        height:100svh!important;
        min-height:100svh!important;
        overflow:hidden!important;
        touch-action:pan-y!important;
      }
      #word .word-case-visuals,
      #word .word-copy-track{
        transform:translate3d(var(--ms-word-mobile-x,0px),0,0)!important;
        will-change:transform!important;
      }
    }
  `;
  document.head.appendChild(style);

  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
  let activeIndex = -1;
  let raf = 0;
  let lastWidth = document.documentElement.clientWidth;

  const hydrateMedia = () => {
    videos.forEach((video) => {
      if (!video.getAttribute('src') && video.dataset.src) {
        video.setAttribute('src', video.dataset.src);
        try { video.load(); } catch (_) {}
      }
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
    });
  };

  const syncYoutube = (index) => {
    if (!youtube || !youtubePanel) return;
    if (index === 1) {
      if (!youtube.getAttribute('src') && youtubeBase) youtube.setAttribute('src', youtubeBase + '&autoplay=1');
      youtubePanel.classList.add('is-video-live');
    } else {
      youtubePanel.classList.remove('is-video-live');
      if (youtube.getAttribute('src')) youtube.removeAttribute('src');
    }
  };

  const syncMedia = (index) => {
    if (index === activeIndex) return;
    activeIndex = index;

    videos.forEach((video) => {
      const panel = video.closest('.word-case-panel');
      const on = Number(panel?.dataset.wordCase) === index;
      if (!on) {
        try { video.pause(); } catch (_) {}
        return;
      }

      const start = Number(video.dataset.start);
      const startPlayback = () => {
        if (Number(video.closest('.word-case-panel')?.dataset.wordCase) !== activeIndex) return;
        if (Number.isFinite(start)) {
          try { if (Math.abs(video.currentTime - start) > .35) video.currentTime = start; } catch (_) {}
        }
        const play = video.play();
        if (play && typeof play.catch === 'function') play.catch(() => {});
      };

      if (video.readyState >= 2) startPlayback();
      else video.addEventListener('canplay', startPlayback, {once:true});
    });

    syncYoutube(index);
    dots.forEach((dot, i) => dot.classList.toggle('on', i === index));
  };

  const measure = () => {
    const width = Math.max(1, sticky.clientWidth || document.documentElement.clientWidth);
    const travel = Math.max(1, section.offsetHeight - sticky.clientHeight);
    return {width, travel, horizontal:(panels.length - 1) * width};
  };

  const render = () => {
    raf = 0;
    const {travel, horizontal} = measure();
    const progress = clamp((scrollY - section.offsetTop) / travel);
    const x = -horizontal * progress;

    gsap.set([track, copyTrack], {'--ms-word-mobile-x': `${x.toFixed(2)}px`});

    const position = progress * (panels.length - 1);
    copies.forEach((copy, index) => {
      const distance = Math.abs(position - index);
      const alpha = clamp(1 - distance * 1.55);
      gsap.set(copy, {autoAlpha: alpha});
    });

    const nextIndex = Math.min(panels.length - 1, Math.max(0, Math.round(position)));
    syncMedia(nextIndex);
  };

  const queue = () => {
    if (!raf) raf = requestAnimationFrame(render);
  };

  hydrateMedia();
  gsap.set([track, copyTrack], {x:0, xPercent:0});
  gsap.set(copies, {autoAlpha:0});
  gsap.set(copies[0], {autoAlpha:1});

  addEventListener('scroll', queue, {passive:true});
  addEventListener('resize', () => {
    const width = document.documentElement.clientWidth;
    if (Math.abs(width - lastWidth) < 24) return;
    lastWidth = width;
    queue();
  }, {passive:true});
  addEventListener('orientationchange', () => setTimeout(queue, 120), {passive:true});
  document.addEventListener('visibilitychange', () => { if (!document.hidden) queue(); });

  queue();
})();
