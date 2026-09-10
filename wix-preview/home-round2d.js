// Round 2f — deterministic service-card navigation + exact Briefing content/layout.
(() => {
  const SERVICES_URL = 'https://mensagemstudio.shop/wix-preview/servicos/';
  const BRIEFING_URL = 'https://mensagemstudio.shop/briefing/';
  const WHATSAPP_URL = 'https://wa.me/5541999999937?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Mensagem%20Studio%20e%20quero%20falar%20sobre%20um%20projeto.';

  function addStyles(){
    if (document.querySelector('#ms-home-round2d-style')) return;
    const style = document.createElement('style');
    style.id = 'ms-home-round2d-style';
    style.textContent = `
      #brief .brief-grid{position:relative;z-index:3;align-items:stretch}
      #brief .brief-card{position:relative;isolation:isolate;overflow:hidden;background:transparent!important;min-height:100%}
      #brief .brief-card::before{content:"";position:absolute;inset:0;z-index:0;background:linear-gradient(145deg,rgba(10,11,9,.88),rgba(8,9,7,.78));border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(18px)}
      #brief .brief-card>*{position:relative;z-index:1}
      #brief .brief-card:first-child{display:flex;flex-direction:column}
      #brief .brief-card:first-child .steps{display:grid;gap:0;margin-top:14px}
      #brief .brief-card:first-child .step{grid-template-columns:54px minmax(0,1fr);gap:18px;padding:22px 0;border-top:1px solid rgba(255,255,255,.14);align-items:start}
      #brief .brief-card:first-child .step b{font-size:13px;line-height:1.2;letter-spacing:.14em;color:var(--lime);padding-top:4px;font-weight:800}
      #brief .brief-card:first-child .step-content{min-width:0}
      #brief .brief-card:first-child .step h4{margin:0 0 7px;color:var(--fg);font-size:clamp(19px,1.55vw,27px);line-height:1.05;letter-spacing:-.025em;text-transform:uppercase;font-weight:800}
      #brief .brief-card:first-child .step p{margin:0;max-width:58ch;color:#c0c5b9;line-height:1.55;font-size:clamp(12px,.95vw,15px)}
      .ms-brief-seo{margin-top:auto;padding-top:24px;border-top:1px solid rgba(201,255,54,.34)}
      .ms-brief-seo strong{display:block;color:var(--lime);font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px}
      .ms-brief-seo span{display:block;color:#c4c8bd;font-size:12px;line-height:1.55;max-width:58ch}
      #brief .brief-card:last-child{display:flex;flex-direction:column}
      #brief .brief-card:last-child .muted{max-width:54ch}
      #brief .ms-brief-actions{display:grid;gap:12px;margin-top:28px}
      #brief .ms-brief-action{min-height:92px;width:100%;padding:0 26px;border:1px solid rgba(255,255,255,.17);background:rgba(5,6,5,.42);display:flex;align-items:center;justify-content:space-between;gap:24px;font-size:clamp(18px,1.6vw,28px);font-weight:850;letter-spacing:-.025em;text-transform:uppercase;transition:.2s ease}
      #brief .ms-brief-action::after{content:"›";font-size:34px;line-height:1;color:var(--lime);font-weight:400;transform:translateY(-1px)}
      #brief .ms-brief-action:hover,#brief .ms-brief-action:focus-visible{outline:none;border-color:var(--lime);background:rgba(201,255,54,.075);transform:translateX(4px)}
      @media(max-width:760px){
        #brief .brief-card:first-child .step{grid-template-columns:42px minmax(0,1fr);gap:12px;padding:18px 0}
        .ms-brief-seo{margin-top:18px}
        #brief .ms-brief-action{min-height:76px;padding:0 18px}
      }
    `;
    document.head.appendChild(style);
  }

  function forceServiceCardNavigation(){
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
      window.open(SERVICES_URL, '_blank', 'noopener');
    }, true);
  }

  function upgradeBriefingInstruction(){
    const section = document.querySelector('#brief');
    const cards = section?.querySelectorAll('.brief-card');
    if (!cards || cards.length < 2) return;

    cards[0].innerHTML = `
      <div class="kicker">PROCESSO</div>
      <h3>Como começar seu projeto.</h3>
      <div class="steps">
        <div class="step"><b>01</b><div class="step-content"><h4>Conheça nossos serviços</h4><p>Explore soluções de design gráfico, identidade visual, campanhas, motion design, edição de vídeo, produção audiovisual, 3D, e-commerce e experiências web.</p></div></div>
        <div class="step"><b>02</b><div class="step-content"><h4>Faça o seu briefing</h4><p>Envie seu pedido com objetivos, referências, necessidades, prazo e contexto para transformar a ideia em um escopo claro de produção.</p></div></div>
        <div class="step"><b>03</b><div class="step-content"><h4>Receba atendimento personalizado</h4><p>O Mensagem Studio analisa sua demanda e orienta a solução, os entregáveis e as etapas mais adequadas para desenvolver o projeto.</p></div></div>
      </div>
      <div class="ms-brief-seo">
        <strong>Design, audiovisual, 3D e web</strong>
        <span>Atendimento para marcas, empresas, produtoras, agências e negócios que precisam de criação visual, conteúdo, campanhas, motion, modelagem 3D e experiências digitais.</span>
      </div>`;

    cards[1].innerHTML = `
      <div class="kicker">AÇÃO</div>
      <h3>Escolha seu caminho.</h3>
      <p class="muted">Conheça o catálogo, envie seu pedido ou fale diretamente com o estúdio.</p>
      <div class="ms-brief-actions">
        <a class="ms-brief-action" href="${SERVICES_URL}"><span>SERVIÇOS</span></a>
        <a class="ms-brief-action" href="${BRIEFING_URL}"><span>BRIEFING</span></a>
        <a class="ms-brief-action" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer"><span>ATENDIMENTO</span></a>
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
