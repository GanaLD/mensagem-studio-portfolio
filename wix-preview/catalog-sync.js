const SERVICE_GROUPS = [
  { n:'01', title:'Design & Conteúdo', desc:'Identidade, social, campanhas e e-commerce.' },
  { n:'02', title:'Audiovisual & Motion', desc:'Vídeo, captação, animação, VFX e narrativa.' },
  { n:'03', title:'3D & Web', desc:'Modelagem, renders, experiências interativas e sites.' }
];

const SERVICES = [
  { group:'WEB / HTML', title:'HTML sem domínio e sem publicação', price:'R$ 900' },
  { group:'WEB / HTML', title:'HTML + domínio publicado', price:'R$ 3.000', note:'Sujeito a manutenção mensal.' },
  { group:'WEB / HTML', title:'Editor independente + HTML', price:'R$ 2.500' },
  { group:'3D / CGI', title:'Modelo 3D de produto', price:'a partir de R$ 200' },
  { group:'3D / CGI', title:'Produto + vídeo render animado', price:'a partir de R$ 450' },
  { group:'3D / CGI', title:'Ambiente 3D + produto + render', price:'a partir de R$ 800' },
  { group:'VÍDEO', title:'Edição de vídeo PRO', price:'a partir de R$ 600' },
  { group:'VÍDEO', title:'Pacote 4 Reels', price:'R$ 450' },
  { group:'PRODUÇÃO', title:'Diária audiovisual', price:'a partir de R$ 200', note:'Horário e serviço a combinar.' },
  { group:'MOTION / VFX', title:'Animação de Logotipo', price:'' },
  { group:'MOTION / VFX', title:'Motion + VFX', price:'R$ 350' },
  { group:'MOTION / VFX', title:'Pack 4 vídeos', price:'R$ 800' },
  { group:'FOTOS', title:'Pacote com 20 fotos', price:'' },
  { group:'E-COMMERCE', title:'Oferta para e-commerce', price:'valores pela metade' }
];

const PROJECTS = [
  {title:'Social Media | Motors Vans',tag:'Social / Automotivo',img:'https://static.wixstatic.com/media/7992dba1-ceca-4a21-b8e6-14a673addafc/v1/fill/w_1080,h_1049,al_c/7992dba1-ceca-4a21-b8e6-14a673addafc',desc:'Peça publicitária para redes sociais da Motors Vans Autopeças, seguindo a identidade visual da marca e reforçando presença no segmento automotivo.'},
  {title:'Motion Banner | Cartaz Cinematográfico',tag:'Motion / Direção de Arte',img:'https://static.wixstatic.com/media/ef8a3a_e03a3aeee8954045898f5809894e4dca~mv2.jpeg/v1/fill/w_743,h_835,al_c/ef8a3a_e03a3aeee8954045898f5809894e4dca~mv2.jpeg',desc:'Animação e design para cartazes, artes promocionais, trailers, lançamentos e campanhas.'},
  {title:'Esporte Fitness',tag:'Produto / Campanha',img:'https://static.wixstatic.com/media/ef8a3a_7215a0a68ae841d6ad1a8cf912660138f000.jpg/v1/fill/w_2160,h_2700,al_c/ef8a3a_7215a0a68ae841d6ad1a8cf912660138f000.jpg',desc:'Projeto demonstrativo de inserção de produto em ambientes realistas com finalidade comercial.'},
  {title:'Carrossel e Banner Estética',tag:'Design / Social',img:'https://static.wixstatic.com/media/ef8a3a_2cf6ec34ee7a40b985768ee643210fed~mv2.png/v1/fill/w_5400,h_1440,al_c/ef8a3a_2cf6ec34ee7a40b985768ee643210fed~mv2.png',desc:'Carrossel e banner desenvolvidos para comunicação de estética e presença digital.'},
  {title:'Pôster | Cartaz',tag:'Poster / Direção de Arte',img:'https://static.wixstatic.com/media/ef8a3a_3b5d4efb1f4a43359248351337a59d6c~mv2.png/v1/fill/w_896,h_1152,al_c/ef8a3a_3b5d4efb1f4a43359248351337a59d6c~mv2.png',desc:'Edição gráfica com estética cinematográfica para campanhas, lançamentos e divulgação.'},
  {title:'Creatina Growth',tag:'Produto / Motion',img:'https://static.wixstatic.com/media/ef8a3a_b49679eaa9a2447dad19a3624ba5c58df000.jpg/v1/fill/w_1080,h_1920,al_c/ef8a3a_b49679eaa9a2447dad19a3624ba5c58df000.jpg',desc:'Banner e vídeo de produto com narrativa visual voltada a treino, disciplina e evolução.'},
  {title:'Photoshop | Edição Fantasia',tag:'Photoshop / Composição',img:'https://static.wixstatic.com/media/ef8a3a_1fb5082116104ec08b7e3a25b0f17011f000.jpg/v1/fill/w_1280,h_720,al_c/ef8a3a_1fb5082116104ec08b7e3a25b0f17011f000.jpg',desc:'Montagem e construção de imagens com blocagem, texturas, protagonista, luz, sombra, VFX e finalização.'},
  {title:'Fotos para E-commerce',tag:'E-commerce / IA',img:'https://static.wixstatic.com/media/ef8a3a_4bc9c5ada1c9443eb0f855414f006fe2~mv2.jpeg/v1/fill/w_1200,h_1200,al_c/ef8a3a_4bc9c5ada1c9443eb0f855414f006fe2~mv2.jpeg',desc:'Tratamento e recriação de fotos de produtos para marketplaces e lojas online com fidelidade visual.'},
  {title:'Personagens Consistentes com IA',tag:'IA / Direção Criativa',img:'https://static.wixstatic.com/media/ef8a3a_e0902b34b4f940eab13a9f52654feab4f000.jpg/v1/fill/w_1080,h_1350,al_c/ef8a3a_e0902b34b4f940eab13a9f52654feab4f000.jpg',desc:'Criação de identidade visual e consistência estrutural para personagens em diferentes cenas e contextos.'},
  {title:'Produto 3D | EGEO',tag:'3D / Produto',img:'https://static.wixstatic.com/media/ef8a3a_4c36901c2391413a94b821cb081437f9f000.jpg/v1/fill/w_864,h_1080,al_c/ef8a3a_4c36901c2391413a94b821cb081437f9f000.jpg',desc:'Projeto de produto 3D com foco em apresentação, materialidade, iluminação e render.'},
  {title:'Suco de Laranja | Natural One',tag:'Branding / Campanha',img:'https://static.wixstatic.com/media/ef8a3a_2d11f6b95ce142f8b07e1277c3af9986f000.jpg/v1/fill/w_1080,h_1350,al_c/ef8a3a_2d11f6b95ce142f8b07e1277c3af9986f000.jpg',desc:'Branding e comunicação com foco em naturalidade, autenticidade, direção de arte e percepção premium.'},
  {title:'Edição de Podcast e Workshop',tag:'Audiovisual / Edição',img:'https://static.wixstatic.com/media/ef8a3a_7f3ede99644440579b983500bc76cd87f000.jpg/v1/fill/w_1920,h_1080,al_c/ef8a3a_7f3ede99644440579b983500bc76cd87f000.jpg',desc:'Edição audiovisual para podcast, workshop e conteúdos institucionais.'},
  {title:'Motion + IA | Vídeo para Campanhas',tag:'Motion / IA',img:'https://static.wixstatic.com/media/ef8a3a_51c4a1263379429fa544b7be7ae29d96f000.jpg/v1/fill/w_1080,h_1920,al_c/ef8a3a_51c4a1263379429fa544b7be7ae29d96f000.jpg',desc:'Motion e inteligência artificial aplicados a peças e vídeos de campanha.'}
];

const css = `
#services .services-source{margin-top:42px}.service-families{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-bottom:34px}.service-family{padding:28px;border:1px solid var(--line);background:rgba(12,13,11,.66);backdrop-filter:blur(10px)}.service-family .n{font-size:11px;letter-spacing:.16em;color:var(--lime)}.service-family h3{font-size:clamp(28px,3vw,46px);letter-spacing:-.04em;margin:30px 0 10px}.service-family p{margin:0;color:var(--muted);line-height:1.5}.service-catalog{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.service-line{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:20px;padding:18px 20px;border:1px solid rgba(255,255,255,.12);background:rgba(8,9,7,.58);backdrop-filter:blur(9px);align-items:center}.service-line small{display:block;color:var(--lime);font-size:9px;letter-spacing:.14em;margin-bottom:6px}.service-line b{font-size:17px}.service-line em{display:block;color:var(--muted);font-size:11px;margin-top:6px;font-style:normal}.service-price{white-space:nowrap;border:1px solid rgba(201,255,54,.35);padding:8px 10px;color:var(--lime);font-size:11px;letter-spacing:.05em}.portfolio-source-note{margin-top:-24px;margin-bottom:32px;color:var(--muted);font-size:12px;letter-spacing:.06em}.project-source-badge{display:inline-flex;align-items:center;gap:7px;margin-top:14px;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#d9dccf}.project-source-badge:before{content:'';width:6px;height:6px;border-radius:50%;background:var(--lime);box-shadow:0 0 12px rgba(201,255,54,.55)}
@media(max-width:900px){.service-families{grid-template-columns:1fr}.service-catalog{grid-template-columns:1fr}}
@media(max-width:620px){.service-line{grid-template-columns:1fr}.service-price{justify-self:start}.service-family{padding:22px}}
`;

document.head.insertAdjacentHTML('beforeend', `<style id="catalog-sync-style">${css}</style>`);

const services = document.querySelector('#services .wrap');
if (services) {
  services.innerHTML = `
    <div class="section-head">
      <div><div class="kicker">01 · SERVIÇOS</div><h2>Da ideia ao resultado.</h2></div>
      <p>Design, audiovisual, 3D e experiências digitais em soluções que podem ser combinadas em um orçamento sob medida.</p>
    </div>
    <div class="service-families">${SERVICE_GROUPS.map(s=>`<article class="service-family"><span class="n">${s.n}</span><h3>${s.title}</h3><p>${s.desc}</p></article>`).join('')}</div>
    <div class="kicker">CATÁLOGO DE SERVIÇOS</div>
    <div class="service-catalog services-source">${SERVICES.map(s=>`<article class="service-line"><div><small>${s.group}</small><b>${s.title}</b>${s.note?`<em>${s.note}</em>`:''}</div>${s.price?`<span class="service-price">${s.price}</span>`:''}</article>`).join('')}</div>`;
}

const projects = document.querySelector('#projects .wrap');
if (projects) {
  projects.innerHTML = `
    <div class="section-head">
      <div><div class="kicker">PORTFÓLIO</div><h2>Projetos do Mensagem Studio.</h2></div>
      <p>Seleção pública trazida do portfólio do site atual, preservando os projetos marcados como visíveis.</p>
    </div>
    <div class="portfolio-source-note">${PROJECTS.length} projetos públicos catalogados</div>
    <div class="projects-grid">${PROJECTS.map((p,i)=>`<article class="project"><div class="project-media"><img loading="lazy" src="${p.img}" alt="${p.title.replace(/"/g,'&quot;')}"></div><div class="project-text"><small>${p.tag}</small><h3>${p.title}</h3><p>${p.desc}</p><span class="project-source-badge">Portfólio Mensagem Studio</span></div></article>`).join('')}</div>`;
}
