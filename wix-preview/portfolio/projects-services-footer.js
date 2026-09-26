(() => {
  'use strict';
  if (document.getElementById('projectsServicesClosing')) return;

  const style = document.createElement('style');
  style.id = 'projects-services-footer-style-v1';
  style.textContent = `
    .projects-services-closing{
      position:relative;
      min-height:88vh;
      overflow:hidden;
      background:#050807;
      border-top:1px solid rgba(244,244,239,.08);
      border-bottom:1px solid rgba(244,244,239,.08);
      isolation:isolate;
    }
    .projects-services-closing__video,
    .projects-services-closing__poster{
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      object-fit:cover;
    }
    .projects-services-closing__video,
    .projects-services-closing__poster{z-index:0}
    .projects-services-closing__overlay{
      position:absolute;
      inset:0;
      z-index:1;
      background:
        linear-gradient(90deg,rgba(4,8,8,.94) 0%,rgba(4,8,8,.76) 35%,rgba(4,8,8,.18) 72%,rgba(4,8,8,.32) 100%),
        linear-gradient(0deg,rgba(4,8,8,.90) 0%,rgba(4,8,8,.16) 50%,rgba(4,8,8,.46) 100%);
    }
    .projects-services-closing__inner{
      position:relative;
      z-index:2;
      width:min(1400px,100%);
      min-height:88vh;
      margin:0 auto;
      padding:clamp(110px,13vw,180px) var(--pad,clamp(18px,4vw,64px)) clamp(72px,7vw,108px);
      display:flex;
      align-items:flex-end;
    }
    .projects-services-closing__grid{
      width:100%;
      display:grid;
      grid-template-columns:minmax(0,1fr) minmax(300px,.44fr);
      gap:clamp(54px,8vw,132px);
      align-items:end;
    }
    .projects-services-closing__kicker{
      margin-bottom:18px;
      color:#35D39A;
      font:600 10px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
      letter-spacing:.16em;
      text-transform:uppercase;
    }
    .projects-services-closing h2{
      margin:0 0 26px;
      max-width:7.2ch;
      font:700 clamp(4.5rem,9vw,8.9rem)/.82 Inter,Arial,sans-serif;
      letter-spacing:-.065em;
      text-transform:uppercase;
      color:#F4F4EF;
    }
    .projects-services-closing__copy{
      margin:0;
      max-width:49ch;
      color:#D3D8D5;
      font-size:clamp(16px,1.16vw,20px);
      line-height:1.64;
    }
    .projects-services-closing__side{
      padding-left:30px;
      border-left:1px solid rgba(53,211,154,.58);
    }
    .projects-services-closing__side strong{
      display:block;
      max-width:12ch;
      color:#fff;
      font:650 clamp(1.7rem,2.35vw,2.45rem)/1.03 Inter,Arial,sans-serif;
      letter-spacing:-.035em;
    }
    .projects-services-closing__side p{
      margin:17px 0 28px;
      max-width:38ch;
      color:#C4CBC8;
      font-size:14px;
      line-height:1.65;
    }
    .projects-services-closing__actions{
      display:flex;
      flex-wrap:wrap;
      gap:10px;
    }
    .projects-services-closing__btn{
      min-height:50px;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      padding:0 22px;
      border:1px solid rgba(255,255,255,.18);
      border-radius:18px;
      background:rgba(255,255,255,.045);
      color:#fff;
      font:600 11px/1 Inter,Arial,sans-serif;
      letter-spacing:.04em;
      text-decoration:none;
      backdrop-filter:blur(16px) saturate(125%);
      -webkit-backdrop-filter:blur(16px) saturate(125%);
      transition:transform .24s ease,border-color .24s ease,background .24s ease;
    }
    .projects-services-closing__btn.primary{
      border-color:rgba(53,211,154,.38);
      background:linear-gradient(135deg,rgba(53,211,154,.18),rgba(255,255,255,.055));
    }
    .projects-services-closing__btn:hover,
    .projects-services-closing__btn:focus-visible{
      transform:translateY(-2px);
      border-color:rgba(53,211,154,.52);
      background:rgba(53,211,154,.12);
      outline:none;
    }
    .projects-services-closing__btn:active{transform:scale(.98)}
    .projects-services-closing + footer{
      margin-top:0!important;
    }
    @media(max-width:900px){
      .projects-services-closing__grid{grid-template-columns:1fr;gap:44px}
      .projects-services-closing__side{
        max-width:650px;
        padding:26px 0 0;
        border-left:0;
        border-top:1px solid rgba(53,211,154,.58);
      }
    }
    @media(max-width:640px){
      .projects-services-closing{min-height:82vh}
      .projects-services-closing__inner{
        min-height:82vh;
        padding:100px 18px 64px;
      }
      .projects-services-closing h2{font-size:clamp(3.6rem,16vw,5.4rem)}
      .projects-services-closing__actions{display:grid;grid-template-columns:1fr}
      .projects-services-closing__btn{width:100%}
    }
    @media(prefers-reduced-motion:reduce){
      .projects-services-closing__btn{transition:none}
    }
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.id = 'projectsServicesClosing';
  section.className = 'projects-services-closing';
  section.setAttribute('aria-label', 'Vamos criar com a Mensagem Studio');
  section.innerHTML = `
    <img class="projects-services-closing__poster" src="https://static.wixstatic.com/media/ef8a3a_20f3e61f512e474ba48e61e8c19bc054f002.jpg" alt="">
    <video class="projects-services-closing__video" autoplay muted loop playsinline preload="metadata" poster="https://static.wixstatic.com/media/ef8a3a_20f3e61f512e474ba48e61e8c19bc054f002.jpg">
      <source src="https://video.wixstatic.com/video/ef8a3a_20f3e61f512e474ba48e61e8c19bc054/720p/mp4/file.mp4" type="video/mp4">
    </video>
    <div class="projects-services-closing__overlay"></div>
    <div class="projects-services-closing__inner">
      <div class="projects-services-closing__grid">
        <div>
          <div class="projects-services-closing__kicker">MENSAGEM STUDIO · CURITIBA</div>
          <h2>Vamos criar?</h2>
          <p class="projects-services-closing__copy">Conte o objetivo, as referências e o que precisa ser produzido. O briefing organiza a demanda e abre o caminho para um orçamento sob medida.</p>
        </div>
        <aside class="projects-services-closing__side">
          <strong>Da ideia à execução.</strong>
          <p>Design, imagem, movimento e tecnologia dentro de uma mesma direção criativa.</p>
          <div class="projects-services-closing__actions">
            <a class="projects-services-closing__btn primary" href="../servicos/#briefing">Começar briefing</a>
            <a class="projects-services-closing__btn" href="https://wa.me/5541999999937?text=Ol%C3%A1%21%20Vim%20pela%20p%C3%A1gina%20de%20Projetos%20da%20Mensagem%20Studio%20e%20quero%20falar%20sobre%20um%20projeto." target="_blank" rel="noopener">Atendimento</a>
          </div>
        </aside>
      </div>
    </div>`;

  const footer = document.querySelector('body > footer');
  if (footer) footer.before(section);
  else document.body.appendChild(section);

  const video = section.querySelector('video');
  if (video) {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const play = () => video.play().catch(() => {});
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        const visible = entries.some(entry => entry.isIntersecting);
        if (visible && !document.hidden) play();
        else video.pause();
      }, { threshold: .05 });
      io.observe(section);
      window.addEventListener('pagehide', () => io.disconnect(), { once:true });
    } else play();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) video.pause();
      else if (section.getBoundingClientRect().top < innerHeight && section.getBoundingClientRect().bottom > 0) play();
    });
  }
})();
