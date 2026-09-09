// HOME services navigator — user-authorized replacement of the old 6-card grid only.
// Portfolio and all other Home sections remain untouched.
(() => {
  const section = document.querySelector('#services');
  if (!section) return;

  const oldGrid = section.querySelector('.services-grid');
  if (!oldGrid) return;

  const SERVICES_URL = 'https://mensagemstudio.shop/wix-preview/servicos/';
  const AREAS = [
    ['01','Social Media','Posts, stories, carrosséis e pacotes de criativos.',SERVICES_URL+'#cat-1'],
    ['02','Vídeo','Reels, edição com motion, legendas, efeitos e vídeo PRO.',SERVICES_URL+'#cat-2'],
    ['03','Produção','Diária de serviços para captação e produção audiovisual.',SERVICES_URL+'#cat-3'],
    ['04','Motion e VFX','Animação de logotipo, motion design, VFX e packs de vídeo.',SERVICES_URL+'#cat-4'],
    ['05','Fotos','Correção, retoque avançado e pacotes de fotografia.',SERVICES_URL+'#cat-5'],
    ['06','Manipulação','Montagem, composição publicitária e composição complexa.',SERVICES_URL+'#cat-6'],
    ['07','Identidade','Manuais de identidade visual essenciais e completos.',SERVICES_URL+'#cat-7'],
    ['08','Campanhas','Key visual, pacotes visuais e direção de arte.',SERVICES_URL+'#cat-8'],
    ['09','E-commerce','Imagens de produto, kits de marketplace e banners comerciais.',SERVICES_URL+'#cat-9'],
    ['10','Narrativa Visual','Ilustração, personagens, roteiro publicitário e storyboard.',SERVICES_URL+'#cat-10'],
    ['11','3D','Modelagem de produto, render animado e ambientes 3D.',SERVICES_URL+'#cat-11'],
    ['12','Web / HTML','HTML, editor independente e publicação com domínio.',SERVICES_URL+'#cat-12']
  ];

  const style = document.createElement('style');
  style.id = 'ms-services-3d-style';
  style.textContent = `
    #services{overflow:visible}
    #services .section-head{margin-bottom:24px}
    #services .section-head p{max-width:50ch}
    #services .services-grid{display:none!important}

    .ms3d-shell{position:relative;margin-top:2px;min-height:620px;display:grid;align-items:center;perspective:1700px;perspective-origin:50% 43%;overflow:visible;touch-action:pan-y;user-select:none}
    .ms3d-shell:before{content:"";position:absolute;left:50%;bottom:94px;width:min(72vw,980px);height:150px;transform:translateX(-50%) rotateX(78deg);border-radius:50%;background:radial-gradient(ellipse,rgba(201,255,54,.12),rgba(201,255,54,.025) 48%,transparent 72%);filter:blur(16px);pointer-events:none}
    .ms3d-shell:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,#070806 0,transparent 11%,transparent 89%,#070806 100%);z-index:20}

    .ms3d-stage{position:relative;height:430px;transform-style:preserve-3d;display:grid;place-items:center;cursor:grab;margin-top:-8px}
    .ms3d-stage.is-dragging{cursor:grabbing}
    .ms3d-deck{position:absolute;inset:0;transform-style:preserve-3d;will-change:transform}

    .ms3d-card{--focus:0;position:absolute;left:50%;top:50%;width:clamp(214px,17vw,276px);height:320px;margin-left:calc(clamp(214px,17vw,276px)/-2);margin-top:-160px;border:1px solid rgba(255,255,255,calc(.12 + var(--focus)*.38));border-radius:24px;background:linear-gradient(145deg,rgba(255,255,255,calc(.045 + var(--focus)*.055)),rgba(255,255,255,.014) 42%,rgba(201,255,54,calc(.012 + var(--focus)*.045)));backdrop-filter:blur(20px) saturate(1.22);box-shadow:0 30px 90px rgba(0,0,0,.34),0 0 calc(8px + var(--focus)*34px) rgba(201,255,54,calc(var(--focus)*.16)),inset 0 1px 0 rgba(255,255,255,.08);overflow:hidden;transform-style:preserve-3d;transition:border-color .18s linear,box-shadow .18s linear,filter .18s linear,opacity .18s linear;will-change:transform,opacity,filter;isolation:isolate}
    .ms3d-card:before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 22% 10%,rgba(201,255,54,calc(.05 + var(--focus)*.30)),transparent 34%),linear-gradient(116deg,transparent 18%,rgba(255,255,255,calc(.045 + var(--focus)*.10)) 47%,transparent 73%);pointer-events:none;z-index:-1}
    .ms3d-card:after{content:"";position:absolute;width:180px;height:180px;right:-92px;bottom:-98px;border-radius:50%;background:rgba(201,255,54,calc(.05 + var(--focus)*.25));filter:blur(34px);pointer-events:none;z-index:-1}
    .ms3d-card:hover,.ms3d-card:focus-visible{outline:none;--focus:1!important;border-color:rgba(201,255,54,.76);box-shadow:0 38px 110px rgba(0,0,0,.48),0 0 48px rgba(201,255,54,.22),inset 0 1px 0 rgba(255,255,255,.12)}

    .ms3d-inner{height:100%;padding:23px;display:flex;flex-direction:column;transform:translateZ(34px)}
    .ms3d-top{display:flex;align-items:center;justify-content:space-between;gap:14px}
    .ms3d-num{font-size:10px;letter-spacing:.16em;color:var(--lime)}
    .ms3d-arrow{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.035);transition:.2s ease}
    .ms3d-card:hover .ms3d-arrow,.ms3d-card:focus-visible .ms3d-arrow{border-color:var(--lime);background:var(--lime);color:#10130b;transform:translate(2px,-2px)}
    .ms3d-copy{margin-top:auto}
    .ms3d-copy h3{font-size:clamp(25px,2.1vw,36px);line-height:.96;letter-spacing:-.045em;margin:0 0 11px;max-width:10ch}
    .ms3d-copy p{margin:0;color:var(--muted);line-height:1.45;font-size:12.5px;max-width:31ch}
    .ms3d-foot{margin-top:18px;padding-top:13px;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;gap:16px;align-items:center;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#d9ddd0}
    .ms3d-foot b{color:var(--lime);font-weight:700}

    .ms3d-controls{position:absolute;left:50%;bottom:38px;z-index:30;transform:translateX(-50%);display:flex;align-items:center;gap:12px;padding:8px 10px;border:1px solid rgba(255,255,255,.10);border-radius:999px;background:rgba(8,9,7,.52);backdrop-filter:blur(12px)}
    .ms3d-control{width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.035);display:grid;place-items:center;cursor:pointer;transition:.2s ease}
    .ms3d-control:hover,.ms3d-control:focus-visible{outline:none;border-color:var(--lime);color:var(--lime);box-shadow:0 0 22px rgba(201,255,54,.12)}
    .ms3d-status{min-width:86px;text-align:center;color:#8d9487;font-size:9px;letter-spacing:.13em;text-transform:uppercase}
    .ms3d-hint{position:absolute;left:50%;bottom:-2px;transform:translate(-50%,100%);color:#6f766b;font-size:9px;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap}

    @media(max-width:1024px){
      .ms3d-shell{min-height:570px;perspective:1450px}
      .ms3d-stage{height:400px}
      .ms3d-card{width:226px;height:300px;margin-left:-113px;margin-top:-150px}
      .ms3d-inner{padding:21px}
      .ms3d-controls{bottom:30px}
    }
    @media(max-width:760px){
      .ms3d-shell{min-height:520px;margin-left:calc(var(--pad)*-1);margin-right:calc(var(--pad)*-1);perspective:1100px}
      .ms3d-shell:after{background:linear-gradient(90deg,#070806 0,transparent 5%,transparent 95%,#070806 100%)}
      .ms3d-stage{height:360px}
      .ms3d-card{width:198px;height:276px;margin-left:-99px;margin-top:-138px;border-radius:21px}
      .ms3d-inner{padding:18px}
      .ms3d-copy h3{font-size:26px}
      .ms3d-copy p{font-size:11.5px}
      .ms3d-controls{bottom:24px}
    }
    @media(prefers-reduced-motion:reduce){.ms3d-deck{transition:none!important}.ms3d-card{transition:none!important}}
  `;
  document.head.appendChild(style);

  oldGrid.insertAdjacentHTML('afterend', `
    <div class="ms3d-shell" id="msServices3dShell" aria-label="Carrossel 3D das áreas de serviços">
      <div class="ms3d-stage" id="msServicesStage">
        <div class="ms3d-deck" id="msServicesDeck">
          ${AREAS.map(([n,title,desc,href],i) => `
            <a class="ms3d-card" href="${href}" data-index="${i}" aria-label="Abrir serviços de ${title}">
              <div class="ms3d-inner">
                <div class="ms3d-top"><span class="ms3d-num">${n} / 12</span><span class="ms3d-arrow">↗</span></div>
                <div class="ms3d-copy"><h3>${title}</h3><p>${desc}</p></div>
                <div class="ms3d-foot"><span>Explorar seção</span><b>Serviços</b></div>
              </div>
            </a>`).join('')}
        </div>
      </div>
      <div class="ms3d-controls" aria-label="Controles do carrossel">
        <button class="ms3d-control" id="ms3dPrev" type="button" aria-label="Área anterior">←</button>
        <span class="ms3d-status" id="ms3dStatus">01 / 12</span>
        <button class="ms3d-control" id="ms3dNext" type="button" aria-label="Próxima área">→</button>
        <span class="ms3d-hint">arraste · swipe · rotação automática</span>
      </div>
    </div>`);

  const intro = section.querySelector('.section-head p');
  if (intro) intro.textContent = 'Explore as 12 áreas do catálogo em uma vitrine 3D. Cada card leva diretamente para a seção correspondente em Serviços.';

  const shell = document.querySelector('#msServices3dShell');
  const stage = document.querySelector('#msServicesStage');
  const deck = document.querySelector('#msServicesDeck');
  const status = document.querySelector('#ms3dStatus');
  const prev = document.querySelector('#ms3dPrev');
  const next = document.querySelector('#ms3dNext');
  if (!shell || !stage || !deck || !status || !prev || !next) return;

  const cards = [...deck.querySelectorAll('.ms3d-card')];
  const count = cards.length;
  const step = 360 / count;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let rotation = 0;
  let targetRotation = 0;
  let velocity = 0;
  let dragging = false;
  let pointerId = null;
  let startX = 0;
  let startRotation = 0;
  let lastX = 0;
  let lastT = 0;
  let suppressClick = false;
  let lastInteraction = performance.now();
  let previousFrame = performance.now();
  let radius = 520;

  const normalize = a => ((a % 360) + 360) % 360;
  const signed = a => {
    let n = normalize(a);
    if (n > 180) n -= 360;
    return n;
  };

  function computeRadius(){
    const w = shell.clientWidth;
    if (w < 520) radius = Math.max(240, w * .60);
    else if (w < 900) radius = Math.max(350, w * .52);
    else radius = Math.min(620, Math.max(480, w * .40));
  }

  function activeIndex(){
    let best = 0;
    let bestAbs = Infinity;
    cards.forEach((card,i) => {
      const angle = signed(i * step + rotation);
      const abs = Math.abs(angle);
      if (abs < bestAbs){bestAbs = abs;best = i;}
    });
    return best;
  }

  function render(){
    deck.style.transform = 'translateZ(0)';
    cards.forEach((card,i) => {
      const world = signed(i * step + rotation);
      const rad = world * Math.PI / 180;
      const facing = Math.cos(rad);
      const focus = Math.max(0, Math.min(1, (facing + .12) / 1.12));
      const scale = .82 + focus * .18;
      const lift = Math.sin(Math.abs(rad)) * -14;
      card.style.setProperty('--focus', focus.toFixed(3));
      card.style.transform = `rotateY(${i*step}deg) translateZ(${radius}px) translateY(${lift}px) scale(${scale})`;
      card.style.opacity = String(Math.max(.06, .16 + focus * .84));
      card.style.filter = `brightness(${(.56 + focus*.44).toFixed(3)}) saturate(${(.74 + focus*.32).toFixed(3)})`;
      card.style.zIndex = String(Math.round(focus * 100));
      card.style.pointerEvents = facing < -.18 ? 'none' : 'auto';
    });
    deck.style.transform = `rotateY(${rotation}deg)`;
    const idx = activeIndex();
    status.textContent = `${String(idx+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
  }

  function snapTo(index){
    const desired = -(index * step);
    const currentTurns = Math.round((rotation - desired) / 360);
    targetRotation = desired + currentTurns * 360;
    const alt1 = targetRotation + 360;
    const alt2 = targetRotation - 360;
    if (Math.abs(alt1-rotation) < Math.abs(targetRotation-rotation)) targetRotation = alt1;
    if (Math.abs(alt2-rotation) < Math.abs(targetRotation-rotation)) targetRotation = alt2;
    lastInteraction = performance.now();
  }

  function stepRelative(dir){
    const idx = activeIndex();
    snapTo((idx + dir + count) % count);
  }

  prev.addEventListener('click', () => stepRelative(-1));
  next.addEventListener('click', () => stepRelative(1));

  stage.addEventListener('pointerdown', e => {
    dragging = true;
    pointerId = e.pointerId;
    stage.setPointerCapture(pointerId);
    stage.classList.add('is-dragging');
    startX = lastX = e.clientX;
    startRotation = rotation;
    lastT = performance.now();
    velocity = 0;
    suppressClick = false;
    lastInteraction = performance.now();
  });

  stage.addEventListener('pointermove', e => {
    if (!dragging || e.pointerId !== pointerId) return;
    const now = performance.now();
    const dx = e.clientX - startX;
    const localDx = e.clientX - lastX;
    const dt = Math.max(8, now - lastT);
    const sensitivity = innerWidth < 760 ? .28 : .20;
    rotation = startRotation + dx * sensitivity;
    targetRotation = rotation;
    velocity = (localDx * sensitivity) / dt;
    if (Math.abs(dx) > 7) suppressClick = true;
    lastX = e.clientX;
    lastT = now;
    render();
  });

  function endDrag(e){
    if (!dragging || (e && e.pointerId !== pointerId)) return;
    dragging = false;
    stage.classList.remove('is-dragging');
    try{stage.releasePointerCapture(pointerId);}catch{}
    pointerId = null;
    targetRotation = rotation + velocity * 360;
    lastInteraction = performance.now();
  }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  cards.forEach((card,i) => {
    card.addEventListener('click', e => {
      if (suppressClick){
        e.preventDefault();
        suppressClick = false;
        return;
      }
      e.preventDefault();
      lastInteraction = performance.now();
      window.location.assign(card.href);
    });
    card.addEventListener('mouseenter', () => { lastInteraction = performance.now(); });
    card.addEventListener('focus', () => { snapTo(i); });
  });

  function tick(now){
    const dt = Math.min(40, now - previousFrame);
    previousFrame = now;

    if (!dragging){
      const idleFor = now - lastInteraction;
      if (!reduceMotion && idleFor > 1200){
        targetRotation -= dt * .0032;
      }
      const delta = targetRotation - rotation;
      rotation += delta * Math.min(.12, dt * .0065);
      velocity *= .92;
    }
    render();
    requestAnimationFrame(tick);
  }

  addEventListener('resize', () => { computeRadius(); render(); }, {passive:true});
  document.addEventListener('visibilitychange', () => { previousFrame = performance.now(); });
  computeRadius();
  render();
  requestAnimationFrame(tick);
})();
