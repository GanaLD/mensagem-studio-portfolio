// HOME services navigator — user-authorized replacement of the old 6-card grid only.
// Portfolio and all other Home sections remain untouched.
(() => {
  const section = document.querySelector('#services');
  if (!section) return;

  const wrap = section.querySelector('.wrap');
  const oldGrid = section.querySelector('.services-grid');
  if (!wrap || !oldGrid) return;

  const AREAS = [
    ['01','Social Media','Posts, stories, carrosséis e pacotes de criativos.','./servicos/#cat-1'],
    ['02','Vídeo','Reels, edição com motion, legendas, efeitos e vídeo PRO.','./servicos/#cat-2'],
    ['03','Produção','Diária de serviços para captação e produção audiovisual.','./servicos/#cat-3'],
    ['04','Motion e VFX','Animação de logotipo, motion design, VFX e packs de vídeo.','./servicos/#cat-4'],
    ['05','Fotos','Correção, retoque avançado e pacotes de fotografia.','./servicos/#cat-5'],
    ['06','Manipulação','Montagem, composição publicitária e composição complexa.','./servicos/#cat-6'],
    ['07','Identidade','Manuais de identidade visual essenciais e completos.','./servicos/#cat-7'],
    ['08','Campanhas','Key visual, pacotes visuais e direção de arte.','./servicos/#cat-8'],
    ['09','E-commerce','Imagens de produto, kits de marketplace e banners comerciais.','./servicos/#cat-9'],
    ['10','Narrativa Visual','Ilustração, personagens, roteiro publicitário e storyboard.','./servicos/#cat-10'],
    ['11','3D','Modelagem de produto, render animado e ambientes 3D.','./servicos/#cat-11'],
    ['12','Web / HTML','HTML, editor independente e publicação com domínio.','./servicos/#cat-12']
  ];

  const style = document.createElement('style');
  style.id = 'ms-services-3d-style';
  style.textContent = `
    #services .section-head{margin-bottom:34px}
    #services .section-head p{max-width:48ch}
    #services .services-grid{display:none!important}
    .ms3d-shell{position:relative;margin-top:14px;padding:22px 0 10px;perspective:1400px}
    .ms3d-shell:before,.ms3d-shell:after{content:"";position:absolute;top:0;bottom:0;width:86px;z-index:8;pointer-events:none}
    .ms3d-shell:before{left:0;background:linear-gradient(90deg,#070806,rgba(7,8,6,0))}
    .ms3d-shell:after{right:0;background:linear-gradient(270deg,#070806,rgba(7,8,6,0))}
    .ms3d-deck{display:flex;gap:18px;overflow-x:auto;overflow-y:visible;padding:34px clamp(16px,6vw,90px) 44px;scroll-snap-type:x mandatory;scroll-padding-inline:clamp(16px,6vw,90px);scrollbar-width:none;transform-style:preserve-3d;overscroll-behavior-inline:contain}
    .ms3d-deck::-webkit-scrollbar{display:none}
    .ms3d-card{--rx:0deg;--ry:0deg;--lift:0px;position:relative;flex:0 0 clamp(250px,23vw,350px);min-height:360px;scroll-snap-align:center;border:1px solid rgba(255,255,255,.15);border-radius:24px;background:linear-gradient(145deg,rgba(255,255,255,.085),rgba(255,255,255,.018) 44%,rgba(201,255,54,.03));backdrop-filter:blur(18px) saturate(1.15);box-shadow:0 28px 80px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.06);transform-style:preserve-3d;transform:translateZ(var(--lift)) rotateX(var(--rx)) rotateY(var(--ry));transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease,background .22s ease;overflow:hidden;isolation:isolate}
    .ms3d-card:before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 22% 12%,rgba(201,255,54,.22),transparent 31%),linear-gradient(115deg,transparent 20%,rgba(255,255,255,.085) 48%,transparent 72%);opacity:.24;transition:opacity .25s ease;pointer-events:none;z-index:-1}
    .ms3d-card:after{content:"";position:absolute;width:180px;height:180px;right:-90px;bottom:-100px;border-radius:50%;background:rgba(201,255,54,.18);filter:blur(34px);opacity:.16;transition:opacity .25s ease,transform .25s ease;z-index:-1}
    .ms3d-card:hover,.ms3d-card:focus-visible{border-color:rgba(201,255,54,.62);box-shadow:0 36px 100px rgba(0,0,0,.44),0 0 36px rgba(201,255,54,.14),inset 0 1px 0 rgba(255,255,255,.09);background:linear-gradient(145deg,rgba(255,255,255,.11),rgba(255,255,255,.024) 45%,rgba(201,255,54,.055));outline:none}
    .ms3d-card:hover:before,.ms3d-card:focus-visible:before{opacity:.72}
    .ms3d-card:hover:after,.ms3d-card:focus-visible:after{opacity:.46;transform:scale(1.16)}
    .ms3d-inner{height:100%;padding:28px;display:flex;flex-direction:column;transform:translateZ(34px)}
    .ms3d-top{display:flex;align-items:center;justify-content:space-between;gap:16px}
    .ms3d-num{font-size:11px;letter-spacing:.16em;color:var(--lime)}
    .ms3d-arrow{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.035);transition:.22s ease}
    .ms3d-card:hover .ms3d-arrow{border-color:var(--lime);background:var(--lime);color:#10130b;transform:translate(2px,-2px)}
    .ms3d-copy{margin-top:auto}
    .ms3d-copy h3{font-size:clamp(28px,2.5vw,42px);line-height:.96;letter-spacing:-.045em;margin:0 0 14px;max-width:10ch}
    .ms3d-copy p{margin:0;color:var(--muted);line-height:1.5;font-size:14px;max-width:31ch}
    .ms3d-foot{margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;gap:16px;align-items:center;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#d9ddd0}
    .ms3d-foot b{color:var(--lime);font-weight:700}
    .ms3d-hint{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:2px;color:#777d72;font-size:10px;letter-spacing:.12em;text-transform:uppercase}
    .ms3d-line{height:1px;flex:1;background:linear-gradient(90deg,rgba(255,255,255,.08),rgba(201,255,54,.5),rgba(255,255,255,.08))}
    @media(max-width:760px){
      .ms3d-shell{margin-left:calc(var(--pad)*-1);margin-right:calc(var(--pad)*-1)}
      .ms3d-shell:before,.ms3d-shell:after{width:34px}
      .ms3d-deck{gap:12px;padding:24px 28px 34px;scroll-padding-inline:28px}
      .ms3d-card{flex-basis:82vw;min-height:330px;border-radius:20px}
      .ms3d-inner{padding:24px}
      .ms3d-hint{padding:0 var(--pad)}
    }
    @media(prefers-reduced-motion:reduce){.ms3d-card{transition:none!important;transform:none!important}.ms3d-deck{scroll-behavior:auto}}
  `;
  document.head.appendChild(style);

  oldGrid.insertAdjacentHTML('afterend', `
    <div class="ms3d-shell" aria-label="Áreas de serviços">
      <div class="ms3d-deck" id="msServicesDeck">
        ${AREAS.map(([n,title,desc,href]) => `
          <a class="ms3d-card" href="${href}" aria-label="Abrir serviços de ${title}">
            <div class="ms3d-inner">
              <div class="ms3d-top"><span class="ms3d-num">${n} / 12</span><span class="ms3d-arrow">↗</span></div>
              <div class="ms3d-copy"><h3>${title}</h3><p>${desc}</p></div>
              <div class="ms3d-foot"><span>Explorar seção</span><b>Serviços</b></div>
            </div>
          </a>`).join('')}
      </div>
      <div class="ms3d-hint"><span>Arraste / role</span><span class="ms3d-line"></span><span>12 áreas</span></div>
    </div>`);

  const intro = section.querySelector('.section-head p');
  if (intro) intro.textContent = 'Explore as 12 áreas do catálogo. Cada card leva diretamente para a seção correspondente em Serviços.';

  const deck = document.querySelector('#msServicesDeck');
  if (!deck) return;
  const cards = [...deck.querySelectorAll('.ms3d-card')];

  function updateFlow(){
    const box = deck.getBoundingClientRect();
    const center = box.left + box.width / 2;
    cards.forEach(card => {
      const r = card.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const d = Math.max(-1, Math.min(1, (c - center) / Math.max(1, box.width * .48)));
      const ry = d * -16;
      const lift = (1 - Math.min(1, Math.abs(d))) * 18;
      const scale = .94 + (1 - Math.min(1, Math.abs(d))) * .06;
      if (!card.matches(':hover')) card.style.transform = `translateZ(${lift}px) rotateY(${ry}deg) scale(${scale})`;
      card.style.opacity = String(.72 + (1 - Math.min(1, Math.abs(d))) * .28);
    });
  }

  cards.forEach(card => {
    card.addEventListener('pointermove', e => {
      if (matchMedia('(pointer:coarse)').matches) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `translateZ(24px) rotateX(${-y*8}deg) rotateY(${x*12}deg) scale(1.02)`;
    });
    card.addEventListener('pointerleave', updateFlow);
  });

  let raf = 0;
  const queueFlow = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(updateFlow); };
  deck.addEventListener('scroll', queueFlow, {passive:true});
  addEventListener('resize', queueFlow, {passive:true});
  requestAnimationFrame(updateFlow);
})();
