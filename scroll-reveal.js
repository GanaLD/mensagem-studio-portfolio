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

// HOME_BACKGROUND_SWITCH_V1 — final CTA placement + hard bottom fill.
(() => {
  function installFinalBackgroundSwitchFix(){
    const finalCta = document.querySelector('.final-cta');
    const footer = document.querySelector('#afterWord > footer');
    const switcher = document.querySelector('.bg-switcher');
    if (!finalCta || !footer || !switcher) return;

    // The control belongs to the black closing CTA, not inside the landing reveal or footer.
    switcher.classList.add('bg-switcher-final');
    switcher.setAttribute('aria-label','Trocar fundo da Home');
    const switchLabel = switcher.querySelector('.bg-switcher-label');
    if (switchLabel) switchLabel.textContent = 'FUNDO';
    finalCta.appendChild(switcher);

    const fixStyle = document.createElement('style');
    fixStyle.id = 'ms-home-background-switch-final-fix';
    fixStyle.textContent = `
      html,body{background:#050605!important}
      .final-cta{
        position:relative!important;
        overflow:visible!important;
        background:#050605!important;
        border-bottom:0!important;
      }
      .final-cta .bg-switcher-final{
        position:absolute!important;
        right:var(--pad)!important;
        bottom:clamp(38px,5vw,72px)!important;
        z-index:12!important;
        display:flex!important;
        align-items:center!important;
        justify-content:flex-end!important;
        gap:10px!important;
        opacity:1!important;
        visibility:visible!important;
        transform:none!important;
        filter:none!important;
        pointer-events:auto!important;
      }
      .final-cta .bg-switcher-final .bg-switcher-label{
        display:block!important;
        color:#b8beb1!important;
        font-size:9px!important;
        font-weight:800!important;
        letter-spacing:.16em!important;
      }
      .final-cta .bg-switcher-final button{
        min-width:184px!important;
        min-height:50px!important;
        justify-content:center!important;
        gap:12px!important;
        border:1px solid rgba(201,255,54,.78)!important;
        background:linear-gradient(135deg,rgba(16,20,13,.96),rgba(5,7,5,.9))!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 0 26px rgba(201,255,54,.18)!important;
        color:#f4f5ef!important;
        opacity:1!important;
        visibility:visible!important;
        cursor:pointer!important;
      }
      .final-cta .bg-switcher-final button::before{
        content:'TROCAR FUNDO';
        color:#f4f5ef;
        font-size:9px;
        font-weight:900;
        letter-spacing:.12em;
        margin-right:2px;
      }
      #afterWord>footer{
        position:relative!important;
        margin:0!important;
        min-height:124px!important;
        padding-top:26px!important;
        padding-bottom:max(42px,env(safe-area-inset-bottom))!important;
        background:#050605!important;
        border-bottom:0!important;
        box-shadow:none!important;
      }
      #afterWord>footer::after{
        content:'';
        position:absolute;
        left:0;
        right:0;
        top:100%;
        height:3px;
        background:#050605;
        pointer-events:none;
      }
      @media(max-width:900px){
        .final-cta .bg-switcher-final{
          position:relative!important;
          right:auto!important;
          bottom:auto!important;
          margin:34px auto 0!important;
          justify-content:center!important;
          flex-wrap:wrap!important;
          width:max-content!important;
          max-width:calc(100% - 32px)!important;
        }
        .final-cta .bg-switcher-final .bg-switcher-label{width:100%;text-align:center}
        #afterWord>footer{min-height:148px!important;padding-bottom:max(48px,env(safe-area-inset-bottom))!important}
      }
    `;
    document.head.appendChild(fixStyle);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installFinalBackgroundSwitchFix, {once:true});
  } else {
    installFinalBackgroundSwitchFix();
  }
})();
