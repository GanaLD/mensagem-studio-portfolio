// Round 2d — deterministic service-card navigation + briefing instructional flow.
(() => {
  const SERVICES_URL = 'https://mensagemstudio.shop/wix-preview/servicos/';

  function addStyles(){
    if (document.querySelector('#ms-home-round2d-style')) return;
    const style = document.createElement('style');
    style.id = 'ms-home-round2d-style';
    style.textContent = `
      #brief .brief-card:first-child{display:flex;flex-direction:column;min-height:100%}
      #brief .brief-card:first-child .steps{display:grid;gap:0;margin-top:10px}
      #brief .brief-card:first-child .step{grid-template-columns:48px minmax(0,1fr);gap:16px;padding:18px 0;border-top:1px solid rgba(255,255,255,.12)}
      #brief .brief-card:first-child .step b{font-size:11px;letter-spacing:.12em;color:var(--lime);padding-top:3px}
      #brief .brief-card:first-child .step p{margin:0;max-width:56ch;color:var(--muted);line-height:1.5}
      #brief .brief-card:first-child .step strong{display:inline-block;margin-bottom:4px;color:var(--fg);font-size:clamp(16px,1.35vw,22px);line-height:1.15}
      .ms-brief-seo{margin-top:auto;padding-top:24px;border-top:1px solid rgba(201,255,54,.28)}
      .ms-brief-seo strong{display:block;color:var(--lime);font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px}
      .ms-brief-seo span{display:block;color:#c4c8bd;font-size:12px;line-height:1.55;max-width:58ch}
      @media(max-width:760px){#brief .brief-card:first-child .step{grid-template-columns:38px minmax(0,1fr);gap:12px}.ms-brief-seo{margin-top:18px}}
    `;
    document.head.appendChild(style);
  }

  function forceServiceCardNavigation(){
    // Capture before the 3D carousel drag/click handlers. A direct click on any card
    // always opens the Services page in a new tab; drag remains available in gaps/edges.
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
      window.open(SERVICES_URL, '_blank', 'noopener,noreferrer');
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
        <div class="step"><b>01</b><p><strong>Conheça nossos serviços</strong><br>Veja as opções de design, branding, motion, vídeo, 3D, e-commerce e web e escolha o caminho mais adequado para sua necessidade.</p></div>
        <div class="step"><b>02</b><p><strong>Faça seu briefing</strong><br>Envie seu pedido com objetivo, referências, prazo e informações essenciais para entendermos exatamente o que precisa ser produzido.</p></div>
        <div class="step"><b>03</b><p><strong>Receba atendimento personalizado</strong><br>Analisamos a demanda e retornamos com orientação, escopo e próximos passos para desenvolver o projeto com clareza.</p></div>
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
