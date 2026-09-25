const SERVICES_URL='https://mensagemstudio.shop/servicos/';
const BRIEFING_URL='https://mensagemstudio.shop/servicos/#briefing';
const WHATSAPP_URL='https://wa.me/5541999999937?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Mensagem%20Studio%20e%20quero%20falar%20sobre%20um%20projeto.';
const INSTAGRAM_URL='https://www.instagram.com/mensagem_studio/';
const BEHANCE_URL='https://www.behance.net/gabrieldesigner42';
const LINKEDIN_URL='https://www.linkedin.com/in/gabriel-slompo-136531286/';
const MAGO_YT='G_2jdXfXxiI';
const DERMACAST_YT='XVL_ToV0-uY';
const MOTORS_VANS_INSTITUTIONAL='https://video.wixstatic.com/video/ef8a3a_cb8012857e1149e08ee02383f47e2fa3/file';
const MOTORS_VANS_INSTITUTIONAL_POSTER='https://static.wixstatic.com/media/ef8a3a_cb8012857e1149e08ee02383f47e2fa3f000.jpg/v1/fill/w_1900,h_1080,al_c/ef8a3a_cb8012857e1149e08ee02383f47e2fa3f000.jpg';
const AREAS=[
['01','Social Media','Posts, stories, carrosséis e pacotes de criativos.'],
['02','Vídeo','Reels, edição com motion, legendas, efeitos e vídeo PRO.'],
['03','Produção','Diária de serviços para captação e produção audiovisual.'],
['04','Motion e VFX','Animação de logotipo, motion design, VFX e packs de vídeo.'],
['05','Fotos','Correção, retoque avançado e pacotes de fotografia.'],
['06','Manipulação','Montagem, composição publicitária e composição complexa.'],
['07','Identidade','Manuais de identidade visual essenciais e completos.'],
['08','Campanhas','Key visual, pacotes visuais e direção de arte.'],
['09','E-commerce','Imagens de produto, kits de marketplace e banners comerciais.'],
['10','Narrativa Visual','Ilustração, personagens, roteiro publicitário e storyboard.'],
['11','3D','Modelagem de produto, render animado e ambientes 3D.'],
['12','Web / HTML','HTML, editor independente e publicação com domínio.']
];

function addStyles(){
  if(document.querySelector('#ms-home-runtime-style')) return;
  const style=document.createElement('style');
  style.id='ms-home-runtime-style';
  style.textContent=`
  #services{overflow:visible}
  #services.ms-services-upgraded .services-grid{display:none!important}
  #services .section-head{margin-bottom:20px}
  #services .section-head p{max-width:50ch}
  .ms3d-shell{--ms3d-yellow:#ffd84d;--ms3d-yellow-rgb:255,216,77;--ms3d-card-blue:#4169e1;--ms3d-card-blue-rgb:65,105,225;position:relative;width:100vw;margin-left:calc(50% - 50vw);min-height:620px;display:grid;align-items:center;perspective:1700px;perspective-origin:50% 43%;overflow:hidden;touch-action:pan-y;user-select:none}
  .ms3d-shell:before{content:"";position:absolute;left:50%;bottom:90px;width:min(72vw,980px);height:150px;transform:translateX(-50%) rotateX(78deg);border-radius:50%;background:radial-gradient(ellipse,rgba(var(--ms3d-yellow-rgb),.18),rgba(var(--ms3d-yellow-rgb),.035) 48%,transparent 72%);filter:blur(18px);pointer-events:none;animation:ms3dFloorGlow 2.8s ease-in-out infinite}
  .ms3d-shell:after{content:"";position:absolute;inset:0;z-index:20;pointer-events:none;background:linear-gradient(90deg,#070806 0,transparent 8%,transparent 92%,#070806 100%)}
  .ms3d-stage{position:relative;height:450px;transform-style:preserve-3d;display:grid;place-items:center;cursor:grab}
  .ms3d-stage.is-dragging{cursor:grabbing}
  .ms3d-deck{position:absolute;inset:0;transform-style:preserve-3d;will-change:transform}
  .ms3d-card{--focus:0;position:absolute;left:50%;top:50%;width:clamp(176px,13.6vw,229px);height:264px;margin-left:calc(clamp(176px,13.6vw,229px)/-2);margin-top:-132px;border:1px solid rgba(255,255,255,calc(.18 + var(--focus)*.34));border-radius:22px;background:linear-gradient(145deg,rgba(255,255,255,calc(.10 + var(--focus)*.055)),rgba(255,255,255,.035) 28%,rgba(22,20,12,.28) 58%,rgba(var(--ms3d-card-blue-rgb),calc(.055 + var(--focus)*.10)));-webkit-backdrop-filter:blur(28px) saturate(1.52);backdrop-filter:blur(28px) saturate(1.52);box-shadow:0 24px 74px rgba(0,0,0,.32),0 0 calc(10px + var(--focus)*38px) rgba(var(--ms3d-card-blue-rgb),calc(.08 + var(--focus)*.28)),inset 0 1px 0 rgba(255,255,255,.20),inset 0 -1px 0 rgba(var(--ms3d-card-blue-rgb),.10);overflow:hidden;transform-style:preserve-3d;transition:border-color .18s linear,box-shadow .18s linear,filter .18s linear,opacity .18s linear;will-change:transform,opacity,filter;isolation:isolate}
  .ms3d-card:before{content:"";position:absolute;inset:-35%;background:radial-gradient(circle at 28% 18%,rgba(var(--ms3d-card-blue-rgb),calc(.14 + var(--focus)*.36)),transparent 28%),linear-gradient(112deg,transparent 30%,rgba(255,255,255,calc(.08 + var(--focus)*.16)) 47%,transparent 63%);background-size:140% 140%,180% 180%;background-position:0% 0%,-70% 50%;pointer-events:none;z-index:0;animation:ms3dGlassSheen 4.6s ease-in-out infinite}
  .ms3d-card:after{content:"";position:absolute;width:160px;height:160px;right:-78px;bottom:-84px;border-radius:50%;background:rgba(var(--ms3d-card-blue-rgb),calc(.10 + var(--focus)*.34));filter:blur(36px);pointer-events:none;z-index:0;animation:ms3dGlowPulse 2.4s ease-in-out infinite}
  .ms3d-card:hover,.ms3d-card:focus-visible{outline:none;--focus:1!important;border-color:rgba(var(--ms3d-card-blue-rgb),.92);box-shadow:0 34px 100px rgba(0,0,0,.46),0 0 58px rgba(var(--ms3d-card-blue-rgb),.40),0 0 0 1px rgba(var(--ms3d-card-blue-rgb),.20),inset 0 1px 0 rgba(255,255,255,.24)}
  .ms3d-inner{position:relative;z-index:2;height:100%;padding:19px;display:flex;flex-direction:column;transform:translateZ(34px)}
  .ms3d-top{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:34px}.ms3d-num{font-size:9px;letter-spacing:.16em;color:var(--ms3d-card-blue);text-shadow:0 0 12px rgba(var(--ms3d-card-blue-rgb),.42)}
  .ms3d-arrow{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.035);transition:.2s ease}
  .ms3d-card:hover .ms3d-arrow,.ms3d-card:focus-visible .ms3d-arrow{border-color:var(--ms3d-card-blue);background:var(--ms3d-card-blue);color:#f7f9ff;transform:translate(2px,-2px);box-shadow:0 0 24px rgba(var(--ms3d-card-blue-rgb),.34)}
  .ms3d-copy{margin-top:clamp(24px,2.2vw,34px);display:flex;flex-direction:column;gap:9px}.ms3d-copy h3{font-size:clamp(22px,1.7vw,30px);line-height:.96;letter-spacing:-.045em;margin:0;max-width:11ch}.ms3d-copy p{margin:0;color:#b9bcaf;line-height:1.42;font-size:11px;max-width:31ch}
  .ms3d-foot{margin-top:auto;padding-top:12px;border-top:1px solid rgba(255,255,255,.14);display:flex;justify-content:flex-start;gap:8px;align-items:center;font-size:8px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#e1e1d7}.ms3d-foot span{color:#e1e1d7}.ms3d-foot span:after{content:none!important;display:none!important}
  .ms3d-edge{position:absolute;top:50%;z-index:50;transform:translateY(-50%);width:58px;height:58px;border-radius:50%;border:1px solid rgba(var(--ms3d-yellow-rgb),.62);background:rgba(10,9,5,.42);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);color:var(--ms3d-yellow);font-size:30px;display:grid;place-items:center;cursor:pointer;box-shadow:0 0 28px rgba(var(--ms3d-yellow-rgb),.14),inset 0 1px 0 rgba(255,255,255,.12);transition:.2s ease}
  .ms3d-edge:hover,.ms3d-edge:focus-visible{outline:none;background:var(--ms3d-yellow);color:#171207;transform:translateY(-50%) scale(1.05);box-shadow:0 0 42px rgba(var(--ms3d-yellow-rgb),.34)}
  .ms3d-edge.prev{left:clamp(12px,2vw,34px)}.ms3d-edge.next{right:clamp(12px,2vw,34px)}
  .ms3d-meta{position:absolute;left:50%;bottom:4px;z-index:32;transform:translateX(-50%);display:flex;align-items:center;gap:14px;color:#96978e;font-size:9px;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;pointer-events:none}.ms3d-status{color:var(--ms3d-yellow);text-shadow:0 0 12px rgba(var(--ms3d-yellow-rgb),.28)}
  .video-scroll-label{font-size:clamp(11px,.82vw,14px)!important;font-weight:650;letter-spacing:.17em!important;color:#f5f8eb!important;text-shadow:0 0 8px rgba(201,255,54,.25),0 0 22px rgba(201,255,54,.16);animation:msHeroLabelPulse 1.85s ease-in-out infinite}
  .video-scroll-meter{height:3px!important;box-shadow:0 0 12px rgba(201,255,54,.16);overflow:visible!important}
  .video-scroll-meter i{position:relative;box-shadow:0 0 12px rgba(201,255,54,.72),0 0 30px rgba(201,255,54,.38)!important}
  .video-scroll-meter i:after{content:"";position:absolute;top:-3px;right:-5px;width:10px;height:9px;border-radius:50%;background:var(--lime);box-shadow:0 0 12px var(--lime),0 0 30px rgba(201,255,54,.85);animation:msMeterSpark 1.15s ease-in-out infinite}
  @keyframes ms3dGlassSheen{0%,100%{background-position:0% 0%,-75% 50%;opacity:.72}50%{background-position:18% 12%,145% 50%;opacity:1}}
  @keyframes ms3dGlowPulse{0%,100%{transform:scale(.86);opacity:.52}50%{transform:scale(1.12);opacity:1}}
  @keyframes ms3dFloorGlow{0%,100%{opacity:.62;transform:translateX(-50%) rotateX(78deg) scale(.94)}50%{opacity:1;transform:translateX(-50%) rotateX(78deg) scale(1.04)}}
  @keyframes msHeroLabelPulse{0%,100%{opacity:.66;filter:brightness(.9)}50%{opacity:1;filter:brightness(1.34)}}
  @keyframes msMeterSpark{0%,100%{transform:scale(.7);opacity:.52}50%{transform:scale(1.2);opacity:1}}
  #motion .wrap{width:100%;max-width:none;padding-left:0;padding-right:0}
  #motion .section-head{width:min(1600px,100%);margin-left:auto;margin-right:auto;padding-left:var(--pad);padding-right:var(--pad)}
  #motion .section-head h2{max-width:12ch}
  #motion .stage{position:relative;display:block;width:100vw;min-height:clamp(300px,56.25vw,900px);border-left:0;border-right:0;background:#020302;backdrop-filter:none;overflow:hidden}
  #motion .stage-side{position:absolute;z-index:8;left:var(--pad);top:18px;display:flex;flex-direction:row;gap:8px;padding:0;border:0;background:transparent}
  #motion .stage-side button{flex:0 0 auto;background:rgba(6,7,5,.68);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.18);padding:11px 14px}
  #motion .stage-main{width:100%;height:clamp(300px,56.25vw,900px);min-height:0;display:block;background:#000}
  #motion .stage-main iframe{display:block;width:100%;height:100%;min-height:0;border:0;background:#000}
  #motion .stage-main #motionInstitutionalVideo{display:none;width:100%;height:100%;min-height:0;object-fit:contain;background:#000}
  #motion .stage-note{z-index:8;right:var(--pad);bottom:18px}
  #brief .brief-card{min-height:100%;padding:34px}
  #brief .step{grid-template-columns:54px 1fr;padding:20px 0}
  #brief .step p{max-width:58ch}
  .ms-brief-actions{display:grid;gap:12px;margin-top:28px}
  .ms-brief-action{min-height:86px;padding:0 24px;border:1px solid rgba(255,255,255,.18);background:rgba(8,9,7,.52);display:flex;align-items:center;justify-content:space-between;gap:24px;font-size:clamp(18px,1.6vw,27px);font-weight:800;letter-spacing:-.025em;text-transform:uppercase;transition:.22s ease}
  .ms-brief-action span:last-child{font-size:20px;color:var(--lime)}
  .ms-brief-action:hover,.ms-brief-action:focus-visible{outline:none;border-color:var(--lime);background:rgba(201,255,54,.08);transform:translateX(4px)}
  .final-cta{display:none!important}
  footer.ms-site-footer{display:block!important;position:relative!important;z-index:30!important;opacity:1!important;visibility:visible!important;transform:none!important;filter:none!important;overflow:visible!important;padding:clamp(54px,7vw,110px) var(--pad) 32px!important;color:var(--fg)!important;background:linear-gradient(180deg,rgba(7,8,6,.18),rgba(7,8,6,.94) 28%,#070806 100%)!important;border-top:1px solid rgba(255,255,255,.12)!important;backdrop-filter:blur(10px)!important}
  .ms-footer-inner{width:min(1600px,100%);margin:0 auto}.ms-footer-kicker{color:var(--lime);font-size:10px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:18px}
  .ms-footer-title{font-size:clamp(44px,7vw,116px);line-height:.86;letter-spacing:-.06em;text-transform:uppercase;margin:0;max-width:12ch}
  .ms-footer-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:42px;align-items:center}.ms-footer-link{min-height:48px;padding:0 17px;border:1px solid rgba(255,255,255,.17);background:rgba(8,9,7,.5);display:inline-flex;align-items:center;justify-content:space-between;gap:24px;font-size:10px;letter-spacing:.13em;text-transform:uppercase;transition:.2s ease}.ms-footer-link:hover,.ms-footer-link:focus-visible{outline:none;border-color:var(--lime);color:var(--lime);background:rgba(201,255,54,.04)}
  .ms-footer-links .bg-switcher{position:relative!important;inset:auto!important;z-index:4!important;display:flex!important;align-items:center!important;gap:0!important;margin:0 0 0 4px!important;min-width:0!important;width:auto!important;opacity:1!important;visibility:visible!important;transform:none!important;filter:none!important;pointer-events:auto!important}
  .ms-footer-links .bg-switcher-label{display:none!important}
  .ms-footer-links .bg-switcher button{min-width:300px!important;min-height:48px!important;height:48px!important;padding:0 20px!important;border:1px solid rgba(201,255,54,.68)!important;border-radius:999px!important;background:rgba(8,9,7,.48)!important;backdrop-filter:blur(12px)!important;box-shadow:0 0 20px rgba(201,255,54,.10)!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:12px!important;color:#f4f5ef!important;font-size:10px!important;font-weight:800!important;letter-spacing:.12em!important;text-transform:uppercase!important;cursor:pointer!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important}
  .ms-footer-links .bg-switcher button:before{content:none!important}
  .ms-footer-links .bg-switcher-button-copy{display:inline!important;color:#f4f5ef!important;font-size:10px!important;font-weight:800!important;letter-spacing:.12em!important}
  .ms-footer-links .bg-switcher-current,
  .ms-footer-links .bg-switcher-arrow,
  .ms-footer-links #backgroundNext{display:none!important}
  .ms-footer-links .bg-switcher button:hover,.ms-footer-links .bg-switcher button:focus-visible{outline:none!important;border-color:var(--lime)!important;box-shadow:0 0 28px rgba(201,255,54,.18)!important}
  @media(max-width:760px){.ms-footer-links .bg-switcher{grid-column:1/-1!important;margin:0!important;width:100%!important}.ms-footer-links .bg-switcher button{width:100%!important;min-width:0!important}}
  .ms-footer-meta{margin-top:56px;padding-top:22px;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;gap:20px;color:#73796f;font-size:9px;letter-spacing:.12em;text-transform:uppercase}
  .ms-footer-copy{min-width:0}
  .ms-footer-particle-stage{position:relative;min-width:0;min-height:clamp(300px,23vw,410px);overflow:hidden;border:0;background:transparent;display:grid;place-items:center;isolation:isolate;box-shadow:none;touch-action:pan-y;text-decoration:none;color:inherit;cursor:pointer}
  .ms-footer-particle-stage:before{content:none}
  .ms-footer-particle-canvas{position:absolute;inset:0;z-index:1;display:block;width:100%;height:100%;pointer-events:auto}
  .ms-footer-particle-fallback{position:relative;z-index:0;margin:0;color:#f6f7f2;font-size:clamp(46px,6vw,104px);font-weight:800;letter-spacing:-.055em;line-height:.9;text-transform:none;opacity:0;pointer-events:none}\n  .ms-footer-particle-stage.is-static .ms-footer-particle-fallback{opacity:1}\n  .ms-footer-particle-hint{position:absolute;z-index:3;left:50%;bottom:14%;transform:translateX(-50%);color:#f6f7f2;font-size:clamp(8px,.8vw,11px);font-weight:700;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;opacity:.72;text-shadow:0 0 12px rgba(255,255,255,.18);pointer-events:none}\n  @media(max-width:560px){.ms-footer-particle-hint{bottom:10%;font-size:8px;letter-spacing:.16em}}
  @media(min-width:900px){.ms-footer-inner{display:grid;grid-template-columns:minmax(0,1.06fr) minmax(440px,.94fr);column-gap:clamp(42px,5.5vw,92px);row-gap:0;align-items:center}.ms-footer-copy{align-self:center}.ms-footer-particle-stage{align-self:stretch}.ms-footer-meta{grid-column:1/-1}}
  @media(max-width:899px){.ms-footer-inner{display:block}.ms-footer-particle-stage{width:100%;min-height:280px;margin-top:42px}.ms-footer-meta{margin-top:42px}}
  @media(max-width:560px){.ms-footer-particle-stage{min-height:230px;margin-top:32px}.ms-footer-particle-fallback{font-size:clamp(42px,15vw,72px)}}
  @media(prefers-reduced-motion:reduce){.ms-footer-particle-canvas{pointer-events:none}}
  #msHomeWhatsapp{width:58px!important;height:58px!important;min-height:58px!important;padding:0!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:#25D366!important;color:#fff!important;border:1px solid rgba(255,255,255,.34)!important;box-shadow:0 14px 42px rgba(0,0,0,.38),0 0 28px rgba(37,211,102,.24)!important;font-size:0!important}
  #msHomeWhatsapp i{display:none!important}#msHomeWhatsapp svg{width:30px;height:30px;display:block;fill:currentColor}
  @media(max-width:1024px){.ms3d-shell{min-height:570px;perspective:1450px}.ms3d-stage{height:410px}.ms3d-card{width:181px;height:240px;margin-left:-90.5px;margin-top:-120px}.ms3d-inner{padding:17px}.ms3d-edge{width:52px;height:52px}.brief-grid{grid-template-columns:1fr!important}}
  @media(max-width:760px){.ms3d-shell{min-height:520px;perspective:1100px;perspective-origin:50% 45%}.ms3d-shell:after{background:linear-gradient(90deg,#070806 0,transparent 4%,transparent 96%,#070806 100%)}.ms3d-stage{height:370px;transform-style:preserve-3d;overflow:visible}.ms3d-deck{transform-style:preserve-3d!important;transform:none!important}.ms3d-card{width:min(72vw,250px);height:300px;margin-left:calc(min(72vw,250px)/-2);margin-top:-150px;border-radius:21px;transform-style:preserve-3d!important;backface-visibility:hidden!important}.ms3d-card.is-mobile-active{visibility:visible!important}.ms3d-inner{padding:18px;transform:translateZ(22px)}.ms3d-copy{margin-top:26px;gap:9px}.ms3d-copy h3{font-size:27px;max-width:11ch}.ms3d-copy p{font-size:11px;line-height:1.42}.ms3d-foot{padding-top:12px;font-size:8px}.ms3d-edge{width:44px;height:44px;font-size:24px}.ms3d-edge.prev{left:8px}.ms3d-edge.next{right:8px}.ms3d-meta{bottom:4px;font-size:8px}.video-scroll-label{left:16px!important;right:16px;bottom:38px!important;font-size:10.5px!important;line-height:1.35}.video-scroll-meter{left:16px!important;right:16px!important}.ms-brief-action{min-height:72px;padding:0 18px}.ms-footer-links{display:grid;grid-template-columns:1fr 1fr}.ms-footer-link{width:100%}.ms-footer-meta{flex-direction:column}.stage-side{max-width:calc(100vw - 32px);overflow:auto}#motion .stage-side{left:16px;right:16px}#motion .stage-note{right:16px}#msHomeWhatsapp{width:54px!important;height:54px!important;min-height:54px!important;right:16px!important;bottom:16px!important}}
  /* MOBILE SERVICES: native horizontal rail. Keeps the content visible even if the 3D carousel engine is unavailable. */
  @media(max-width:760px){
    .ms3d-shell{min-height:0!important;width:100%!important;margin-left:0!important;display:block!important;overflow:visible!important;perspective:1100px!important;perspective-origin:50% 45%!important;touch-action:auto!important}
    .ms3d-shell:before,.ms3d-shell:after{display:none!important}
    .ms3d-stage{height:auto!important;min-height:320px!important;display:block!important;perspective:1000px!important;transform-style:preserve-3d!important;overflow-x:auto!important;overflow-y:hidden!important;padding:8px 16px 22px!important;scroll-snap-type:x mandatory;scroll-padding-inline:16px;touch-action:pan-x pan-y!important;cursor:auto!important;-webkit-overflow-scrolling:touch;scrollbar-width:none}
    .ms3d-stage::-webkit-scrollbar{display:none}
    .ms3d-deck{position:relative!important;inset:auto!important;display:flex!important;gap:14px!important;width:max-content!important;height:auto!important;transform:none!important;transform-style:preserve-3d!important}
    .ms3d-card{position:relative!important;left:auto!important;top:auto!important;flex:0 0 min(78vw,280px)!important;width:min(78vw,280px)!important;height:300px!important;margin:0!important;transform-style:preserve-3d!important;backface-visibility:hidden!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important;scroll-snap-align:center!important}
    .ms3d-card.is-mobile-active{visibility:visible!important}
    .ms3d-edge,.ms3d-meta{display:none!important}
  }
  /* MOBILE TRUE 3D RING — the services carousel keeps real Z depth on phones. */
  @media(max-width:760px){
    #msServicesMobileFallback{display:none!important;visibility:hidden!important;opacity:0!important}
    #msServices3dShell{width:100vw!important;margin-left:calc(50% - 50vw)!important;min-height:500px!important;display:grid!important;align-items:center!important;overflow:hidden!important;perspective:980px!important;perspective-origin:50% 44%!important;touch-action:pan-y!important}
    #msServices3dShell:before{display:block!important;bottom:54px!important;width:88vw!important;height:112px!important}
    #msServices3dShell:after{display:block!important;background:linear-gradient(90deg,#070806 0,transparent 5%,transparent 95%,#070806 100%)!important}
    #msServicesStage{position:relative!important;height:390px!important;min-height:390px!important;display:grid!important;place-items:center!important;overflow:visible!important;padding:0!important;perspective:980px!important;transform-style:preserve-3d!important;touch-action:pan-y!important}
    #msServicesDeck{position:absolute!important;inset:0!important;display:block!important;width:auto!important;height:auto!important;transform-style:preserve-3d!important;will-change:transform!important}
    #msServicesDeck .ms3d-card{position:absolute!important;left:50%!important;top:50%!important;flex:none!important;width:min(46vw,184px)!important;height:252px!important;margin-left:calc(min(46vw,184px)/-2)!important;margin-top:-126px!important;border-radius:20px!important;scroll-snap-align:none!important;transform-style:preserve-3d!important;backface-visibility:hidden!important;will-change:transform,opacity,filter!important}
    #msServicesDeck .ms3d-inner{padding:17px!important;transform:translateZ(26px)!important;transform-style:preserve-3d!important}
    #msServicesDeck .ms3d-copy{margin-top:22px!important}
    #msServicesDeck .ms3d-copy h3{font-size:clamp(22px,7vw,29px)!important}
    #msServicesDeck .ms3d-copy p{font-size:10.5px!important;line-height:1.42!important}
    #msServicesDeck .ms3d-foot{font-size:7.5px!important}
  }
  @media(prefers-reduced-motion:reduce){.video-scroll-label,.video-scroll-meter i:after,.ms3d-card:before,.ms3d-card:after,.ms3d-shell:before{animation:none!important}.ms3d-card,.ms3d-edge,.ms-brief-action{transition:none!important}}
  `;
  document.head.appendChild(style);
}

function upgradeServices(){
  const section=document.querySelector('#services');
  const oldGrid=section?.querySelector('.services-grid');
  if(!section||!oldGrid||document.querySelector('#msServices3dShell')) return;
  const intro=section.querySelector('.section-head p');
  if(intro) intro.textContent='Design gráfico, social media, vídeo, motion e VFX, fotografia, identidade visual, campanhas, e-commerce, 3D e web para marcas que querem vender mais, fortalecer presença e transformar ideias em comunicação de alto impacto.';
  oldGrid.insertAdjacentHTML('afterend',`<div class="ms3d-shell" id="msServices3dShell" aria-label="Carrossel 3D das áreas de serviços">
    <div class="ms3d-stage" id="msServicesStage"><div class="ms3d-deck" id="msServicesDeck">${AREAS.map(([n,title,desc],i)=>`<a class="ms3d-card" href="${SERVICES_URL}" data-index="${i}" aria-label="Conhecer esta área de serviço"><div class="ms3d-inner"><div class="ms3d-top" aria-hidden="true"></div><div class="ms3d-copy"><h3>${title}</h3><p>${desc}</p></div><div class="ms3d-foot"><span>Explorar os serviços</span></div></div></a>`).join('')}</div></div>
    
  </div>`);
  const shell=document.querySelector('#msServices3dShell'),stage=document.querySelector('#msServicesStage'),deck=document.querySelector('#msServicesDeck');
  if(!shell||!stage||!deck)return;
  section.classList.add('ms-services-upgraded');
  const cards=[...deck.querySelectorAll('.ms3d-card')],count=cards.length,step=360/count,reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let rotation=0,targetRotation=0,velocity=0,dragging=false,pointerId=null,startX=0,startRotation=0,lastX=0,lastT=0,suppressClick=false,lastInteraction=performance.now(),previousFrame=performance.now(),radius=520;
  const normalize=a=>((a%360)+360)%360;
  const signed=a=>{let n=normalize(a);if(n>180)n-=360;return n};
  function computeRadius(){const w=shell.clientWidth;if(w<520)radius=Math.max(240,w*.60);else if(w<900)radius=Math.max(350,w*.52);else radius=Math.min(660,Math.max(500,w*.36))}
  function activeIndex(){let best=0,bestAbs=Infinity;cards.forEach((card,i)=>{const abs=Math.abs(signed(i*step+rotation));if(abs<bestAbs){bestAbs=abs;best=i}});return best}
  function render(){
    const mobile=innerWidth<=760;
    const ringRadius=mobile?Math.min(270,Math.max(225,shell.clientWidth*.64)):radius;
    cards.forEach((card,i)=>{
      const world=signed(i*step+rotation);
      const rad=world*Math.PI/180;
      const facing=Math.cos(rad);
      const focus=Math.max(0,Math.min(1,(facing+.12)/1.12));
      const scale=(mobile?.78:.82)+focus*(mobile?.22:.18);
      const lift=Math.sin(Math.abs(rad))*(mobile?-9:-14);
      card.style.setProperty('--focus',focus.toFixed(3));
      card.style.setProperty('transform',`rotateY(${i*step}deg) translateZ(${ringRadius}px) translateY(${lift}px) scale(${scale})`,'important');
      card.style.setProperty('opacity',String(Math.max(mobile?.10:.06,(mobile?.20:.16)+focus*(mobile?.80:.84))),'important');
      card.style.setProperty('filter',`brightness(${((mobile?.60:.56)+focus*(mobile?.40:.44)).toFixed(3)}) saturate(${((mobile?.78:.74)+focus*(mobile?.28:.32)).toFixed(3)})`,'important');
      card.style.zIndex=String(Math.round(focus*100));
      card.style.setProperty('pointer-events',facing<-.28?'none':'auto','important');
      card.classList.toggle('is-mobile-active',mobile&&facing>-.28);
    });
    deck.style.setProperty('transform',`rotateY(${rotation}deg)`,'important');
  }
  function snapTo(index){const desired=-(index*step),turns=Math.round((rotation-desired)/360);targetRotation=desired+turns*360;for(const alt of [targetRotation+360,targetRotation-360])if(Math.abs(alt-rotation)<Math.abs(targetRotation-rotation))targetRotation=alt;lastInteraction=performance.now()}
  function stepRelative(dir){snapTo((activeIndex()+dir+count)%count)}
  stage.addEventListener('pointerdown',e=>{dragging=true;pointerId=e.pointerId;stage.setPointerCapture(pointerId);stage.classList.add('is-dragging');startX=lastX=e.clientX;startRotation=rotation;lastT=performance.now();velocity=0;suppressClick=false;lastInteraction=performance.now()});
  stage.addEventListener('pointermove',e=>{if(!dragging||e.pointerId!==pointerId)return;const now=performance.now(),dx=e.clientX-startX,localDx=e.clientX-lastX,dt=Math.max(8,now-lastT),sensitivity=innerWidth<760?.28:.20;rotation=startRotation+dx*sensitivity;targetRotation=rotation;velocity=(localDx*sensitivity)/dt;if(Math.abs(dx)>7)suppressClick=true;lastX=e.clientX;lastT=now;render()});
  function endDrag(e){if(!dragging||(e&&e.pointerId!==pointerId))return;dragging=false;stage.classList.remove('is-dragging');try{stage.releasePointerCapture(pointerId)}catch{}pointerId=null;targetRotation=rotation+velocity*360;lastInteraction=performance.now()}
  stage.addEventListener('pointerup',endDrag);stage.addEventListener('pointercancel',endDrag);let mobileDepthRaf=0;stage.addEventListener('scroll',()=>{if(innerWidth>760)return;if(!mobileDepthRaf)mobileDepthRaf=requestAnimationFrame(()=>{mobileDepthRaf=0;render()})},{passive:true});
  cards.forEach((card,i)=>{card.addEventListener('click',e=>{if(suppressClick){e.preventDefault();suppressClick=false;return}e.preventDefault();window.location.assign(SERVICES_URL)});card.addEventListener('mouseenter',()=>lastInteraction=performance.now());card.addEventListener('focus',()=>snapTo(i))});
  let carouselVisible=false,carouselRaf=0;
  function tick(now){
    carouselRaf=0;
    if(!carouselVisible||document.hidden)return;
    const dt=Math.min(40,now-previousFrame);previousFrame=now;
    if(!dragging){if(!reduceMotion&&now-lastInteraction>1200)targetRotation-=dt*(innerWidth<=760?.0018:.0032);rotation+=(targetRotation-rotation)*Math.min(.12,dt*.0065);velocity*=.92}
    render();
    carouselRaf=requestAnimationFrame(tick);
  }
  function startCarousel(){if(carouselVisible&&!document.hidden&&!carouselRaf){previousFrame=performance.now();carouselRaf=requestAnimationFrame(tick)}}
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{carouselVisible=entries.some(e=>e.isIntersecting);if(carouselVisible)startCarousel()},{rootMargin:'240px 0px',threshold:.01});
    io.observe(shell);
  }else carouselVisible=true;
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)startCarousel()});
  addEventListener('resize',()=>{computeRadius();render();startCarousel()},{passive:true});computeRadius();render();startCarousel();
}

function ytSrc(id,autoplay=false){return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&enablejsapi=1&playsinline=1&mute=1${autoplay?'&autoplay=1':''}`}
function upgradeMotion(){
  const section=document.querySelector('#motion'),frame=document.querySelector('#ytFrame'),tabs=document.querySelector('#ytTabs');if(!section||!frame)return;
  const h2=section.querySelector('.section-head h2');if(h2)h2.textContent='ASSISTA AO PROCESSO CRIATIVO';
  const p=section.querySelector('.section-head p');if(p)p.textContent='Acompanhe o processo criativo em edição, composição e direção visual — da construção da imagem ao resultado final.';

  const target=frame.closest('.stage-main');
  let institutional=target?.querySelector('#motionInstitutionalVideo');
  if(target&&!institutional){
    institutional=document.createElement('video');
    institutional.id='motionInstitutionalVideo';
    institutional.dataset.src=MOTORS_VANS_INSTITUTIONAL;
    institutional.dataset.poster=MOTORS_VANS_INSTITUTIONAL_POSTER;
    institutional.controls=true;
    institutional.muted=true;
    institutional.playsInline=true;
    institutional.preload='none';
    institutional.setAttribute('aria-label','Institucional Motors Vans');
    target.insertBefore(institutional,frame.nextSibling);
  }

  const command=func=>{try{frame.contentWindow?.postMessage(JSON.stringify({event:'command',func,args:[]}), '*')}catch{}};
  const setActive=button=>{
    if(!tabs)return;
    tabs.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===button));
  };
  const showYoutube=(id,button)=>{
    if(institutional){institutional.pause();institutional.style.display='none'}
    frame.style.display='block';
    frame.src=ytSrc(id,false);
    setActive(button);
  };
  const showInstitutional=button=>{
    command('pauseVideo');
    frame.style.display='none';
    if(institutional){
      if(!institutional.getAttribute('poster')&&institutional.dataset.poster)institutional.setAttribute('poster',institutional.dataset.poster);
      if(!institutional.getAttribute('src')&&institutional.dataset.src)institutional.setAttribute('src',institutional.dataset.src);
      institutional.style.display='block';
      try{institutional.currentTime=0}catch{}
      institutional.play().catch(()=>{});
    }
    setActive(button);
  };

  if(tabs){
    const dermacast=tabs.querySelector('button[data-yt="'+DERMACAST_YT+'"]');
    const mago=tabs.querySelector('button[data-yt="'+MAGO_YT+'"]');
    if(dermacast)dermacast.textContent='DERMACAST';
    if(mago)mago.textContent='Processo criativo';

    let institutionalButton=tabs.querySelector('button[data-video="motors-vans-institucional"]');
    if(!institutionalButton){
      institutionalButton=document.createElement('button');
      institutionalButton.type='button';
      institutionalButton.dataset.video='motors-vans-institucional';
      institutionalButton.textContent='INSTITUCIONAL';
      tabs.appendChild(institutionalButton);
    }

    tabs.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===mago));

    if(tabs.dataset.msMotionTabsBound!=='1'){
      tabs.dataset.msMotionTabsBound='1';
      tabs.addEventListener('click',e=>{
        const b=e.target.closest('button[data-yt],button[data-video]');
        if(!b)return;
        if(b.dataset.video==='motors-vans-institucional')showInstitutional(b);
        else if(b.dataset.yt)showYoutube(b.dataset.yt,b);
      });
    }
  }

  // PROCESSO CRIATIVO (mago) continua sendo a primeira mídia exibida.
  // A mídia só é hidratada quando a seção se aproxima da viewport.
  if(institutional){institutional.pause();institutional.style.display='none'}
  frame.style.display='block';
  if(!frame.dataset.src)frame.dataset.src=ytSrc(MAGO_YT,false);

  if(target&&!matchMedia('(hover:none)').matches&&target.dataset.msMotionHoverBound!=='1'){
    target.dataset.msMotionHoverBound='1';
    target.addEventListener('mouseenter',()=>{
      if(institutional&&institutional.style.display!=='none'){institutional.play().catch(()=>{});return}
      command('mute');command('playVideo');
    });
    target.addEventListener('mouseleave',()=>{
      if(institutional&&institutional.style.display!=='none'){institutional.pause();return}
      command('pauseVideo');
    });
  }
}

function upgradeBrief(){
  const section=document.querySelector('#brief');if(!section)return;const cards=section.querySelectorAll('.brief-card');if(cards.length<2)return;
  cards[0].innerHTML=`<div class="kicker">PROCESSO</div><h3>Da escolha ao atendimento.</h3><div class="steps"><div class="step"><b>01</b><p><strong>Conheça nossos serviços</strong><br>Explore soluções de design gráfico, branding, motion design, edição de vídeo, 3D/CGI, e-commerce e experiências web para encontrar o formato ideal para o seu projeto.</p></div><div class="step"><b>02</b><p><strong>Faça seu briefing</strong><br>Envie objetivos, referências, necessidades, prazo e contexto. O briefing organiza o pedido e transforma a ideia em um escopo claro de produção.</p></div><div class="step"><b>03</b><p><strong>Receba atendimento personalizado</strong><br>O Mensagem Studio analisa sua demanda e orienta a melhor combinação de serviços, entregáveis e etapas para desenvolver o projeto.</p></div></div>`;
  cards[1].innerHTML=`<div class="kicker">AÇÃO</div><h3>Escolha como começar.</h3><p class="muted">Acesse o catálogo, envie seu pedido ou fale diretamente com o estúdio.</p><div class="ms-brief-actions"><a class="ms-brief-action" href="${SERVICES_URL}"><span>SERVIÇOS</span><span>↗</span></a><a class="ms-brief-action" href="${BRIEFING_URL}"><span>BRIEFING</span><span>↗</span></a><a class="ms-brief-action" href="${WHATSAPP_URL}" target="_blank" rel="noopener"><span>ATENDIMENTO</span><span>↗</span></a></div>`;
}

function upgradeFooter(){
  const finalCta=document.querySelector('.final-cta');if(finalCta)finalCta.setAttribute('aria-hidden','true');
  const footer=document.querySelector('footer');if(!footer)return;
  const existingSwitcher=document.querySelector('.bg-switcher');
  footer.classList.remove('ms-reveal','ms-reveal-left','ms-reveal-right','ms-reveal-scale');delete footer.dataset.msRevealBound;footer.classList.add('ms-site-footer','is-visible');footer.style.opacity='1';footer.style.visibility='visible';footer.style.transform='none';footer.style.filter='none';
  footer.innerHTML=`<div class="ms-footer-inner"><div class="ms-footer-copy"><div class="ms-footer-kicker">MENSAGEM STUDIO</div><h2 class="ms-footer-title">TRANSFORME SUA IDEIA EM REALIDADE</h2><nav class="ms-footer-links" aria-label="Links do rodapé"><a class="ms-footer-link" href="#hero"><span>VOLTAR AO TOPO</span><b>↑</b></a><a class="ms-footer-link" href="${INSTAGRAM_URL}" target="_blank" rel="noopener"><span>INSTAGRAM</span><b>↗</b></a><a class="ms-footer-link" href="${BEHANCE_URL}" target="_blank" rel="noopener"><span>BEHANCE</span><b>↗</b></a><a class="ms-footer-link" href="${LINKEDIN_URL}" target="_blank" rel="noopener"><span>LINKEDIN</span><b>↗</b></a></nav></div><a id="msFooterParticleStage" class="ms-footer-particle-stage" data-text="PROJETOS" href="/portfolio/" aria-label="Abrir a página de projetos"><canvas id="msFooterParticleCanvas" class="ms-footer-particle-canvas" aria-hidden="true"></canvas><span class="ms-footer-particle-fallback" aria-hidden="true">PROJETOS</span><span class="ms-footer-particle-hint" aria-hidden="true">CLIQUE AQUI</span></a><div class="ms-footer-meta"><span>Mensagem Studio · Curitiba · PR</span><span>Design · Motion · 3D · Web</span></div></div>`;
  if(existingSwitcher){
    existingSwitcher.classList.add('ms-footer-bg-switcher');
    const label=existingSwitcher.querySelector('.bg-switcher-label');if(label)label.remove();
    const button=existingSwitcher.querySelector('#backgroundSwitcher');if(button)button.textContent='TROCAR FUNDO';
    const links=footer.querySelector('.ms-footer-links');if(links)links.appendChild(existingSwitcher);
  }
  initFooterParticleTypography();
}

function initFooterParticleTypography(){
  const stage=document.querySelector('#msFooterParticleStage');
  const canvas=document.querySelector('#msFooterParticleCanvas');
  if(!stage||!canvas||stage.dataset.particlesReady==='1')return;
  stage.dataset.particlesReady='1';
  const ctx=canvas.getContext('2d',{willReadFrequently:true});
  if(!ctx){stage.classList.add('is-static');return;}
  const reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const particleText=stage.dataset.text||'PROJETOS';
  let particles=[];
  let raf=0;
  let width=0,height=0,dpr=1;
  let mouseX=-1000,mouseY=-1000;
  let active=true;

  class FooterParticle{
    constructor(x,y,size,color,dispersion,returnSpeed){
      this.x=x+(Math.random()-.5)*10;
      this.y=y+(Math.random()-.5)*10;
      this.originX=x;this.originY=y;
      this.vx=(Math.random()-.5)*5;this.vy=(Math.random()-.5)*5;
      this.size=size;this.color=color;this.dispersion=dispersion;this.returnSpeed=returnSpeed;
    }
    update(mx,my){
      const dx=mx-this.x,dy=my-this.y;
      const distance=Math.sqrt(dx*dx+dy*dy);
      const radius=120;
      if(distance>0&&distance<radius&&mx!==-1000&&my!==-1000){
        const force=(radius-distance)/radius;
        this.vx-=(dx/distance)*force*this.dispersion;
        this.vy-=(dy/distance)*force*this.dispersion;
      }
      this.vx+=(this.originX-this.x)*this.returnSpeed;
      this.vy+=(this.originY-this.y)*this.returnSpeed;
      this.vx*=.85;this.vy*=.85;
      const ox=this.x-this.originX,oy=this.y-this.originY;
      if(Math.sqrt(ox*ox+oy*oy)<1&&Math.random()>.95){this.vx+=(Math.random()-.5)*.2;this.vy+=(Math.random()-.5)*.2}
      this.x+=this.vx;this.y+=this.vy;
    }
    draw(){ctx.fillStyle=this.color;ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill()}
  }

  function fontFamily(){
    const title=document.querySelector('.ms-footer-title');
    return title?getComputedStyle(title).fontFamily:'Arial Black, Inter, sans-serif';
  }

  function configureCanvas(){
    width=Math.max(1,stage.clientWidth);
    height=Math.max(1,stage.clientHeight);
    dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.max(1,Math.floor(width*dpr));
    canvas.height=Math.max(1,Math.floor(height*dpr));
    canvas.style.width=width+'px';
    canvas.style.height=height+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function particleFontSize(){
    const base=Math.min(160,width*.15);
    ctx.font='800 '+base+'px '+fontFamily();
    const measured=Math.max(1,ctx.measureText(particleText).width);
    return measured>width*.92?base*((width*.92)/measured):base;
  }

  function drawStatic(){
    configureCanvas();
    ctx.clearRect(0,0,width,height);
    const size=particleFontSize();
    ctx.fillStyle='#f6f7f2';
    ctx.font='800 '+size+'px '+fontFamily();
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(particleText,width/2,height/2);
  }

  function initParticles(){
    configureCanvas();
    ctx.clearRect(0,0,width,height);
    const size=particleFontSize();
    const color='#f6f7f2';
    ctx.fillStyle=color;
    ctx.font='800 '+size+'px '+fontFamily();
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(particleText,width/2,height/2);
    const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);
    particles=[];
    const step=Math.max(1,Math.floor(5*dpr));
    for(let y=0;y<pixels.height;y+=step){
      for(let x=0;x<pixels.width;x+=step){
        const alpha=pixels.data[(y*pixels.width+x)*4+3]||0;
        if(alpha>128)particles.push(new FooterParticle(x/dpr,y/dpr,1.5,color,20,.08));
      }
    }
    ctx.clearRect(0,0,width,height);
  }

  function animate(){
    if(reduceMotion||!active){raf=0;return}
    ctx.clearRect(0,0,width,height);
    for(const particle of particles){particle.update(mouseX,mouseY);particle.draw()}
    raf=requestAnimationFrame(animate);
  }

  function restart(){
    if(reduceMotion){drawStatic();return}
    initParticles();
    if(!raf&&active)raf=requestAnimationFrame(animate);
  }

  function onPointerMove(event){
    if(event.pointerType==='touch')return;
    const rect=canvas.getBoundingClientRect();
    mouseX=event.clientX-rect.left;mouseY=event.clientY-rect.top;
  }
  function onPointerLeave(){mouseX=-1000;mouseY=-1000}

  const resizeObserver=new ResizeObserver(()=>restart());
  resizeObserver.observe(stage);
  canvas.addEventListener('pointermove',onPointerMove,{passive:true});
  canvas.addEventListener('pointerleave',onPointerLeave,{passive:true});

  let intersectionObserver=null;
  if('IntersectionObserver'in window&&!reduceMotion){
    intersectionObserver=new IntersectionObserver(entries=>{
      active=Boolean(entries[0]&&entries[0].isIntersecting);
      if(active&&!raf)raf=requestAnimationFrame(animate);
      else if(!active&&raf){cancelAnimationFrame(raf);raf=0}
    },{rootMargin:'160px 0px'});
    intersectionObserver.observe(stage);
  }

  const cleanup=()=>{
    if(raf)cancelAnimationFrame(raf);raf=0;
    resizeObserver.disconnect();
    if(intersectionObserver)intersectionObserver.disconnect();
    canvas.removeEventListener('pointermove',onPointerMove);
    canvas.removeEventListener('pointerleave',onPointerLeave);
  };
  window.addEventListener('pagehide',cleanup,{once:true});

  setTimeout(restart,80);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(restart).catch(()=>{});
}
function upgradeWhatsapp(){
  const a=document.querySelector('#msHomeWhatsapp');if(!a)return;a.href=WHATSAPP_URL;a.setAttribute('aria-label','Falar com a Mensagem Studio pelo WhatsApp');a.innerHTML=`<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.99c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.055 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.69 1.448h.005c6.558 0 11.893-5.335 11.896-11.893a11.821 11.821 0 0 0-3.489-8.413Z"/></svg>`;
}

function safeUpgrade(name,fn){try{fn()}catch(err){console.error('[Mensagem Studio home runtime] '+name,err)}}
function init(){safeUpgrade('styles',addStyles);safeUpgrade('services',upgradeServices);safeUpgrade('motion',upgradeMotion);safeUpgrade('brief',upgradeBrief);safeUpgrade('footer',upgradeFooter);safeUpgrade('whatsapp',upgradeWhatsapp)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
