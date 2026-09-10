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
      .ms3d-edge svg{display:block;width:31px;height:31px;overflow:visible;pointer-events:none}
      .ms3d-edge svg path{fill:none;stroke:currentColor;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
      .ms3d-edge.prev svg{transform:translateX(-1px)}
      .ms3d-edge.next svg{transform:translateX(1px)}

      .ms-hero-scroll-cue{position:absolute!important;z-index:20!important;left:clamp(28px,13.5vw,220px)!important;top:43%!important;transform:translateY(-50%)!important;width:58px!important;height:92px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:10px!important;pointer-events:none!important;opacity:.58;transition:opacity .18s linear;filter:drop-shadow(0 0 12px rgba(201,255,54,.2))}
      .ms-hero-scroll-cue .mouse{position:relative;display:block;width:33px;height:52px;border:1.8px solid rgba(244,245,239,.82);border-radius:20px;background:rgba(7,8,6,.06);box-shadow:inset 0 0 14px rgba(255,255,255,.025)}
      .ms-hero-scroll-cue .wheel{position:absolute;left:50%;top:9px;width:3.5px;height:10px;border-radius:999px;background:var(--lime);transform:translateX(-50%);box-shadow:0 0 8px rgba(201,255,54,.85),0 0 18px rgba(201,255,54,.34);animation:msScrollWheel 1.25s ease-in-out infinite}
      .ms-hero-scroll-cue .chev{display:block;width:14px;height:14px;border-right:1.8px solid rgba(201,255,54,.9);border-bottom:1.8px solid rgba(201,255,54,.9);transform:rotate(45deg);animation:msScrollChevron 1.25s ease-in-out infinite}
      @keyframes msScrollWheel{0%{transform:translate(-50%,0);opacity:0}18%{opacity:1}68%{transform:translate(-50%,17px);opacity:.95}100%{transform:translate(-50%,22px);opacity:0}}
      @keyframes msScrollChevron{0%,100%{opacity:.24;transform:translateY(-2px) rotate(45deg)}50%{opacity:1;transform:translateY(4px) rotate(45deg)}}
      @media(max-width:760px){.ms-hero-scroll-cue{display:none!important}.ms3d-edge svg{width:25px;height:25px}}
      @media(prefers-reduced-motion:reduce){.ms-hero-scroll-cue .wheel,.ms-hero-scroll-cue .chev{animation:none!important}}
    `;
    document.head.appendChild(style);
  }

  function chevronSvg(direction){
    const d = direction === 'left' ? 'M21.5 7.5 13 16l8.5 8.5' : 'M10.5 7.5 19 16l-8.5 8.5';
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
      card.href = SERVICES_URL;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.setAttribute('aria-label', 'Abrir página de Serviços em nova guia');
      card.addEventListener('pointerdown', e => e.stopPropagation(), true);
      card.addEventListener('click', e => e.stopImmediatePropagation(), true);
    });
  }

  function addHeroScrollCue(){
    const hero = document.querySelector('#hero');
    const sticky = hero?.querySelector('.hero-sticky');
    if (!hero || !sticky) return;
    let cue = sticky.querySelector('.ms-hero-scroll-cue');
    if (!cue){
      sticky.insertAdjacentHTML('beforeend', `
        <div class="ms-hero-scroll-cue" aria-hidden="true">
          <span class="mouse"><span class="wheel"></span></span>
          <span class="chev"></span>
        </div>`);
      cue = sticky.querySelector('.ms-hero-scroll-cue');
    }
    const updateCue = () => {
      const travelled = Math.max(0, window.scrollY - hero.offsetTop);
      const fade = Math.max(0, Math.min(1, 1 - travelled / Math.max(1, window.innerHeight * .95)));
      cue.style.opacity = String(.58 * fade);
    };
    addEventListener('scroll', updateCue, {passive:true});
    addEventListener('resize', updateCue, {passive:true});
    updateCue();
  }

  function init(){addRound2Styles();fixServicesNavigation();addHeroScrollCue()}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();