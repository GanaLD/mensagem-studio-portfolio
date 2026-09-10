// Round 2e — deterministic service-card navigation + exact briefing instructional flow.
(() => {
  const SERVICES_URL = 'https://mensagemstudio.shop/wix-preview/servicos/';

  function addStyles(){
    if (document.querySelector('#ms-home-round2d-style')) return;
    const style = document.createElement('style');
    style.id = 'ms-home-round2d-style';
    style.textContent = `
      #brief .brief-card:first-child{display:flex;flex-direction:column;min-height:100%}
      #brief .brief-card:first-child .steps{display:grid;gap:0;margin-top:12px}
      #brief .brief-card:first-child .step{grid-template-columns:54px minmax(0,1fr);gap:18px;padding:22px 0;border-top:1px solid rgba(255,255,255,.14);align-items:start}
      #brief .brief-card:first-child .step b{font-size:13px;line-height:1.2;letter-spacing:.14em;color:var(--lime);padding-top:4px;font-weight:800}
      #brief .brief-card:first-child .step-content{min-width:0}
      #brief .brief-card:first-child .step h4{margin:0 0 7px;color:var(--fg);font-size:clamp(19px,1.55vw,27px);line-height:1.05;letter-spacing:-.025em;text-transform:uppercase;font-weight:800}
      #brief .brief-card:first-child .step p{margin:0;max-width:58ch;color:#c0c5b9;line-height:1.55;font-size:clamp(12px,.95vw,15px)}
      .ms-brief-seo{margin-top:auto;padding-top:24px;border-top:1px solid rgba(201,255,54,.34)}
      .ms-brief-seo strong{display:block;color:var(--lime);font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px}
      .ms-brief-seo span{display:block;color:#c4c8bd;font-size:12px;line-height:1.55;max-width:58ch}
      @media(max-width:760px){#brief .brief-card:first-child .step{grid-template-columns:42px minmax(0,1fr);gap:12px;padding:18px 0}.ms-brief-seo{margin-top:18px}}
    `;
    document.head.appendChild(style);
  }

  function forceServiceCardNavigation(){
    // Capture before the carousel card click handler. Direct card clicks always navigate.
    document.addEventListener('pointerdown', e => {
      const card = e.target.closest?.('#msServices3dShell .ms3d-card');
      if (!card) return;
      e.stopPropagation();
    }, true);

    document.addEventListener('click', e => {
      const card = e.target.closest?.('#msServices3dShell .ms3d-card');
      if (!card) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      window.location.assign(SERVICES_URL);
    }, true);
  }

  function upgradeBriefingInstruction(){
    const section = document.querySelector('#brief');
    const card = section?.querySelector('.brief-card:first-child');
    if (!card) return;
    card.innerHTML = `
      <div class="kicker">PROCESSO</div>
      <h3>Da escolha ao atendimento.</h3>
      <div class="steps">
        <div class="step"><b>01</b><div class="step-content"><h4>Escolha seu serviço</h4><p>Conheça as opções de design, branding, motion, vídeo, 3D, e-commerce e web e escolha a solução mais adequada para o seu projeto.</p></div></div>
        <div class="step"><b>02</b><div class="step-content"><h4>Faça o briefing</h4><p>Envie objetivo, referências, prazo e informações essenciais para transformar sua necessidade em um pedido claro e bem definido.</p></div></div>
        <div class="step"><b>03</b><div class="step-content"><h4>Receba um serviço especializado</h4><p>O Mensagem Studio analisa a demanda e conduz o projeto com atendimento direcionado, escopo definido e execução especializada.</p></div></div>
      </div>
      <div class="ms-brief-seo">
        <strong>Serviços para empresas e agências</strong>
        <span>Criação visual, campanhas, conteúdo, audiovisual, motion design, 3D, e-commerce e experiências web para marcas, empresas, produtoras e agências.</span>
      </div>`;
  }

  function init(){
    addStyles();
    forceServiceCardNavigation();
    upgradeBriefingInstruction();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
