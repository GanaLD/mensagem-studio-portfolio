// Round 2 — interaction corrections requested during visual QA.
// Keeps the approved HeroScroll scrub logic untouched.
(() => {
  const SERVICES_URL = 'https://mensagemstudio.shop/wix-preview/servicos/';

  function addRound2Styles(){
    if (document.querySelector('#ms-home-round2-style')) return;
    const style = document.createElement('style');
    style.id = 'ms-home-round2-style';
    style.textContent = `
      .ms3d-card{cursor:pointer!important}
      .ms3d-edge{padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;line-height:0!important}
      .ms3d-edge svg{display:block;width:30px;height:30px;overflow:visible;pointer-events:none;transform:none!important}
      .ms3d-edge svg path{fill:none;stroke:currentColor;stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
      .ms3d-edge.prev svg{transform:translateX(-1px)!important}
      .ms3d-edge.next svg{transform:translateX(1px)!important}

      .ms-hero-scroll-cue{position:absolute;z-index:7;left:clamp(30px,13.5vw,220px);top:45%;width:48px;height:76px;display:grid;place-items:center;pointer-events:none;opacity:.38;transition:opacity .18s linear;filter:drop-shadow(0 0 10px rgba(201,255,54,.14))}
      .ms-hero-scroll-cue .mouse{position:relative;width:27px;height:43px;border:1.5px solid rgba(244,245,239,.72);border-radius:18px}
      .ms-hero-scroll-cue .wheel{position:absolute;left:50%;top:8px;width:3px;height:8px;border-radius:999px;background:var(--lime);transform:translateX(-50%);box-shadow:0 0 8px rgba(201,255,54,.68);animation:msScrollWheel 1.35s ease-in-out infinite}
      .ms-hero-scroll-cue .chev{position:absolute;left:50%;bottom:4px;width:13px;height:13px;border-right:1.5px solid rgba(201,255,54,.8);border-bottom:1.5px solid rgba(201,255,54,.8);transform:translateX(-50%) rotate(45deg);animation:msScrollChevron 1.35s ease-in-out infinite}
      @keyframes msScrollWheel{0%{transform:translate(-50%,0);opacity:0}22%{opacity:1}70%{transform:translate(-50%,13px);opacity:.88}100%{transform:translate(-50%,17px);opacity:0}}
      @keyframes msScrollChevron{0%,100%{opacity:.22;bottom:7px}50%{opacity:.9;bottom:2px}}
      @media(max-width:760px){.ms-hero-scroll-cue{display:none!important}.ms3d-edge svg{width:25px;height:25px}}
      @media(prefers-reduced-motion:reduce){.ms-hero-scroll-cue .wheel,.ms-hero-scroll-cue .chev{animation:none!important}}
    `;
    document.head.appendChild(style);
  }

  function chevronSvg(direction){
    const d = direction === 'left' ? 'M20.5 7.5 12 16l8.5 8.5' : 'M11.5 7.5 20 16l-8.5 8.5';
    return `<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
  }

  function fixServicesNavigation(){
    const shell = document.querySelector('#msServices3dShell');
    if (!shell) return;

    const prev = shell.querySelector('#ms3dPrev');
    const next = shell.querySelector('#ms3dNext');
    if (prev) prev.innerHTML = chevronSvg('left');
    if (next) next.innerHTML = chevronSvg('right');

    shell.querySelectorAll('.ms3d-card').forEach(card => {
      // Every service card opens the exact Services page in a second tab.
      card.href = SERVICES_URL;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.setAttribute('aria-label', 'Abrir página de Serviços em nova guia');

      // The original carousel captures pointerdown on the stage, which can swallow
      // a normal anchor click. Stop that only for direct card presses so the native
      // link remains deterministic. Drag/swipe is still available in the stage gaps
      // and the two side controls remain fully operational.
      card.addEventListener('pointerdown', e => {
        e.stopPropagation();
      }, true);

      // Block the older runtime's preventDefault/location.assign handler while
      // preserving the browser's native target=_blank action.
      card.addEventListener('click', e => {
        e.stopImmediatePropagation();
      }, true);
    });
  }

  function addHeroScrollCue(){
    const hero = document.querySelector('#hero');
    const sticky = hero?.querySelector('.hero-sticky');
    if (!hero || !sticky || sticky.querySelector('.ms-hero-scroll-cue')) return;

    sticky.insertAdjacentHTML('beforeend', `
      <div class="ms-hero-scroll-cue" aria-hidden="true">
        <span class="mouse"><span class="wheel"></span></span>
        <span class="chev"></span>
      </div>`);

    const cue = sticky.querySelector('.ms-hero-scroll-cue');
    const updateCue = () => {
      const travelled = Math.max(0, window.scrollY - hero.offsetTop);
      const fade = Math.max(0, Math.min(1, 1 - travelled / Math.max(1, window.innerHeight * .72)));
      cue.style.opacity = String(.38 * fade);
    };
    addEventListener('scroll', updateCue, {passive:true});
    addEventListener('resize', updateCue, {passive:true});
    updateCue();
  }

  function init(){
    addRound2Styles();
    fixServicesNavigation();
    addHeroScrollCue();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
