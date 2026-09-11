// Round 2j — deterministic service-card navigation + Briefing foreground/layout hardening.
(() => {
  const SERVICES_URL = 'https://mensagemstudio.shop/servicos/';
  const BRIEFING_URL = 'https://mensagemstudio.shop/servicos/#briefing';
  const WHATSAPP_URL = 'https://wa.me/5541999999937?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Mensagem%20Studio%20e%20quero%20falar%20sobre%20um%20projeto.';

  function addStyles(){
    if (document.querySelector('#ms-home-round2d-style')) return;
    const style = document.createElement('style');
    style.id = 'ms-home-round2d-style';
    style.textContent = `
      #brief .brief-grid{position:relative;z-index:3;align-items:stretch}
      #brief .brief-card{position:relative!important;z-index:1!important;isolation:isolate!important;overflow:hidden!important;background:#0a0b09!important;min-height:100%;filter:none!important;backdrop-filter:none!important;transform:none!important;opacity:1!important}
      #brief .brief-card::before{content:"";position:absolute;inset:0;z-index:0;background:linear-gradient(145deg,rgba(18,20,16,.98),rgba(7,8,6,.97));border:1px solid rgba(255,255,255,.18);pointer-events:none;filter:none!important;backdrop-filter:none!important}
      #brief .brief-card>*{position:relative!important;z-index:5!important;filter:none!important;backdrop-filter:none!important;opacity:1!important;transform:none!important}
      #brief .brief-card *,#brief .step,#brief .step *{filter:none!important;backdrop-filter:none!important;text-rendering:geometricPrecision}

      #brief .brief-card.ms-reveal,
      #brief .brief-card.ms-reveal.is-visible,
      #brief .step.ms-reveal,
      #brief .step.ms-reveal.is-visible{
        opacity:1!important;
        transform:none!important;
        filter:none!important;
        transition:none!important;
        will-change:auto!important;
      }

      #brief .brief-card:first-child{display:flex;flex-direction:column;padding:38px 38px 34px!important}
      #brief .brief-card:first-child .kicker{color:var(--lime)!important;font-weight:850;letter-spacing:.16em;line-height:1.2}
      #brief .brief-card:first-child>h3{margin:14px 0 0;color:#f6f7f2!important;font-size:clamp(34px,3.1vw,56px);line-height:.94;letter-spacing:-.045em;max-width:11ch;font-weight:850}
      #brief .brief-card:first-child .steps{display:grid;gap:0;margin-top:32px}
      #brief .brief-card:first-child .step{display:grid!important;grid-template-columns:52px minmax(0,1fr);gap:20px;padding:24px 0;border-top:1px solid rgba(255,255,255,.14);align-items:start;background:transparent!important;opacity:1!important;transform:none!important}
      #brief .brief-card:first-child .step:first-child{border-top-color:rgba(201,255,54,.4)}
      #brief .brief-card:first-child .step b{display:block!important;font-size:13px;line-height:1.2;letter-spacing:.14em;color:var(--lime)!important;padding-top:3px;font-weight:850}
      #brief .brief-card:first-child .step-content{display:block!important;min-width:0;position:relative;z-index:6!important}
      #brief .brief-card:first-child .step h4{display:block!important;margin:0 0 9px!important;color:#f7f8f3!important;font-size:clamp(20px,1.45vw,27px)!important;line-height:1.05!important;letter-spacing:-.02em!important;text-transform:uppercase;font-weight:850!important;opacity:1!important}
      #brief .brief-card:first-child .step p{display:block!important;margin:0!important;max-width:60ch;color:#d4d8cf!important;line-height:1.52!important;font-size:clamp(13px,.92vw,15px)!important;font-weight:400!important;opacity:1!important}
      .ms-brief-seo{margin-top:auto;padding-top:24px;border-top:1px solid rgba(201,255,54,.34);position:relative;z-index:6!important}
      .ms-brief-seo strong{display:block;color:var(--lime)!important;font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px}
      .ms-brief-seo span{display:block;color:#d0d4cb!important;font-size:12px;line-height:1.55;max-width:58ch}

      #brief .brief-card:last-child{display:flex;flex-direction:column}
      #brief .brief-card:last-child .muted{max-width:54ch;color:#cbd0c6!important}
      #brief .ms-brief-actions{display:grid;gap:12px;margin-top:28px}
      #brief .ms-brief-action{min-height:92px;width:100%;padding:0 26px;border:1px solid rgba(255,255,255,.17);background:rgba(5,6,5,.72);display:flex;align-items:center;justify-content:space-between;gap:24px;font-size:clamp(18px,1.6vw,28px);font-weight:850;letter-spacing:-.025em;text-transform:uppercase;transition:.2s ease}
      #brief .ms-brief-action::after{content:"›";font-size:34px;line-height:1;color:var(--lime);font-weight:400;transform:translateY(-1px)}
      #brief .ms-brief-action:hover,#brief .ms-brief-action:focus-visible{outline:none;border-color:var(--lime);background:rgba(201,255,54,.075);transform:translateX(4px)}

      @media(max-width:760px){
        #brief .brief-card:first-child{padding:28px 24px 26px!important}
        #brief .brief-card:first-child>h3{font-size:clamp(34px,10vw,46px);max-width:10ch}
        #brief .brief-card:first-child .steps{margin-top:24px}
        #brief .brief-card:first-child .step{grid-template-columns:38px minmax(0,1fr);gap:12px;padding:20px 0}
        #brief .brief-card:first-child .step h4{font-size:clamp(18px,5.6vw,23px)!important}
        #brief .brief-card:first-child .step p{font-size:13px!important;line-height:1.5!important}
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

    cards.forEach(card => {
      card.classList.remove('ms-reveal','ms-reveal-left','ms-reveal-right','ms-reveal-scale','is-visible');
      card.style.opacity='1';card.style.transform='none';card.style.filter='none';card.style.backdropFilter='none';
    });
    section.querySelectorAll('.step').forEach(step => {
      step.classList.remove('ms-reveal','ms-reveal-left','ms-reveal-right','ms-reveal-scale','is-visible');
      step.style.opacity='1';step.style.transform='none';step.style.filter='none';step.style.backdropFilter='none';
    });
  }

  function init(){
    addStyles();
    forceServiceCardNavigation();
    upgradeBriefingInstruction();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
