(() => {
  const projects = Array.isArray(window.MENSAGEM_PROJECTS) ? window.MENSAGEM_PROJECTS : [];
  const slug = document.body.dataset.project || '';
  const project = projects.find(p => p.slug === slug);
  const app = document.querySelector('#projectApp');
  const esc = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  if (!project || !app) {
    if (app) app.innerHTML = `<div class="error"><div><h1>Projeto não encontrado.</h1><p>Volte para a página de Projetos e escolha outro case.</p><a class="nav a" href="../">Projetos</a></div></div>`;
    return;
  }
  function ratioFrom(url='') {
    const m = String(url).match(/w_(\d+),h_(\d+)/i);
    if (!m) return 1.2;
    return Number(m[1]) / Math.max(1, Number(m[2]));
  }
  function mediaClass(item) {
    const r = ratioFrom(item.type === 'VIDEO' ? (item.poster || '') : item.url);
    if (r >= 1.55) return 'wide';
    if (r <= .82) return 'portrait';
    return '';
  }
  function videoCandidates(url='') {
    const src=String(url||'').trim();
    const m=src.match(/^(https:\/\/video\.wixstatic\.com\/video\/([^/]+))\/(?:(\d+)p\/mp4\/file\.mp4|file)$/i);
    if(!m) return src ? [src] : [];
    const base=m[1];
    const current=src;
    return [current,
      base+'/1080p/mp4/file.mp4',
      base+'/720p/mp4/file.mp4',
      base+'/480p/mp4/file.mp4',
      base+'/360p/mp4/file.mp4'
    ].filter((v,i,a)=>a.indexOf(v)===i);
  }
  function wireVideoFallbacks(root=document) {
    root.querySelectorAll('video[data-ms-video-src]').forEach(video=>{
      if(video.dataset.msVideoWired==='1') return;
      video.dataset.msVideoWired='1';
      const candidates=videoCandidates(video.dataset.msVideoSrc||video.currentSrc||video.src);
      let index=Math.max(0,candidates.indexOf(video.currentSrc||video.src));
      const tryNext=()=>{
        index++;
        if(index>=candidates.length){
          video.classList.add('ms-video-failed');
          return;
        }
        video.src=candidates[index];
        try{video.load()}catch(_){}
        if(video.autoplay) video.play().catch(()=>{});
      };
      video.addEventListener('error',tryNext);
      video.addEventListener('loadedmetadata',()=>video.classList.remove('ms-video-failed'));
    });
  }

  function detailsHTML() {
    if (!project.details?.length) return '';
    return `<div class="details">${project.details.map(d => `<div class="detail"><small>${esc(d.label)}</small>${d.link ? `<a href="${esc(d.link)}" target="_blank" rel="noopener">${esc(d.text || d.link)} ↗</a>` : `<span>${esc(d.text || '')}</span>`}</div>`).join('')}</div>`;
  }
  function caseStudyHTML() {
    const c=(window.MENSAGEM_CASE_STUDIES||{})[project.slug];
    if(!c)return '';
    const card=(label,text,wide=false)=>text?`<article class="case-study-card${wide?' case-study-card-wide':''}"><small>${esc(label)}</small><p>${esc(text)}</p></article>`:'';
    const service=c.serviceLabel&&c.serviceHref?`<div class="case-study-service"><div><small>Serviço relacionado</small><strong>${esc(c.serviceLabel)}</strong></div><a href="${esc(c.serviceHref)}">Conhecer serviço</a></div>`:'';
    return `<section class="case-study-section"><div class="wrap"><div class="case-study-head"><div><div class="eyebrow">CASE DO PROJETO</div><h2>Do briefing à entrega.</h2></div><p>${esc(c.intro||'')}</p></div><div class="case-study-grid">${card('Contexto',c.context,true)}${card('Objetivo',c.objective)}${card('Solução visual',c.solution)}${card('Processo',c.process,true)}${card('Ferramentas e técnica',c.tools)}${card('Resultado',c.result)}</div>${service}</div></section>`;
  }

  function heroMediaHTML() {
    const heroLabel = `${project.title} — Capa do projeto`;
    if (project.coverVideo) {
      return `<video muted autoplay loop playsinline preload="metadata" title="${esc(heroLabel)}" aria-label="${esc(heroLabel)}" data-ms-video-src="${esc(project.coverVideo)}" poster="${esc(project.cover || '')}" src="${esc(project.coverVideo)}"></video>`;
    }
    return `<img src="${esc(project.cover || '')}" alt="${esc(heroLabel)}" title="${esc(heroLabel)}">`;
  }
  function itemHTML(item, index) {
    const type = item.type === 'VIDEO' ? 'Vídeo' : 'Imagem';
    const mediaLabel = item.title || `${project.title} — ${type} ${String(index+1).padStart(2,'0')}`;
    const visual = item.type === 'VIDEO'
      ? `<video controls muted autoplay loop playsinline preload="auto" title="${esc(mediaLabel)}" aria-label="${esc(mediaLabel)}" ${item.poster ? `poster="${esc(item.poster)}"` : ''} src="${esc(item.url)}"></video>`
      : `<img loading="lazy" src="${esc(item.url)}" alt="${esc(mediaLabel)}" title="${esc(mediaLabel)}" data-lightbox>`;
    const caption = `<div class="caption"><div><strong>${esc(mediaLabel)}</strong>${item.description ? `<p>${esc(item.description)}</p>` : ''}</div><small>${type} · ${String(index+1).padStart(2,'0')}</small></div>`;
    return `<article class="media-item ${mediaClass(item)}" role="group" aria-label="${esc(mediaLabel)}" style="transition-delay:${Math.min(index,7)*55}ms"><div class="media-visual">${visual}</div>${caption}</article>`;
  }

  // Galeria = somente mídias reais cadastradas no projeto.
  // Não sintetizar "Capa do projeto" nem criar players a partir do cover/coverVideo.
  const galleryMedia = Array.isArray(project.media) ? [...project.media] : [];

  const idx = projects.indexOf(project);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const whatsappMessage = encodeURIComponent(
    'Olá! Vi o projeto "' + project.title + '" no portfólio da Mensagem Studio e quero conversar sobre um trabalho nessa direção.'
  );
  const whatsappURL = 'https://wa.me/5541999999937?text=' + whatsappMessage;
  const quoteURL = '../../servicos/?orcamento=1&ref=' + encodeURIComponent(project.slug) + '&projeto=' + encodeURIComponent(project.title);

  app.innerHTML = `
    <section class="hero"><div class="wrap"><div class="hero-grid">
      <div class="hero-copy">
        <div class="eyebrow">${esc(project.tag || 'Projeto')} · ${String(idx+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}</div>
        <h1>${esc(project.title)}</h1>
        ${project.description ? `<p class="description">${esc(project.description)}</p>` : ''}
        ${detailsHTML()}
      </div>
      <div class="hero-media">${heroMediaHTML()}<div class="hero-label"><span>Projeto / Mensagem Studio</span><b>${galleryMedia.length} ${galleryMedia.length===1?'mídia':'mídias'}</b></div></div>
    </div></div></section>
    <section class="gallery-section"><div class="wrap">
      <div class="section-head"><div><div class="eyebrow">MÍDIAS DO PROJETO</div><h2>Galeria.</h2></div><p>Conteúdo do projeto preservado na ordem do portfólio original.</p></div>
      <div class="media-grid">${galleryMedia.map(itemHTML).join('')}</div>
    </div></section>
    ${caseStudyHTML()}
    <section class="project-conversion"><div class="wrap">
      <div class="conversion-card">
        <div class="conversion-copy">
          <div class="eyebrow">CONTRATE A MENSAGEM STUDIO</div>
          <h2>Quer algo nessa direção?</h2>
          <p>Se este projeto combina com o que você procura, fale com o estúdio ou abra uma solicitação de orçamento usando este case como referência.</p>
        </div>
        <div class="conversion-actions">
          <a class="conversion-btn primary" href="${whatsappURL}" target="_blank" rel="noopener noreferrer">Falar no WhatsApp ↗</a>
          <a class="conversion-btn" href="${quoteURL}">Solicitar orçamento ↗</a>
        </div>
        <div class="conversion-ref"><span>Referência</span><strong>${esc(project.title)}</strong></div>
      </div>
    </div></section>
    <section class="project-nav"><div class="wrap"><div class="project-nav-grid">
      <a class="project-link" href="../${esc(prev.slug)}/"><small>← Projeto anterior</small><strong>${esc(prev.title)}</strong></a>
      <a class="project-link next" href="../${esc(next.slug)}/"><small>Próximo projeto →</small><strong>${esc(next.title)}</strong></a>
    </div></div></section>`;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = [...document.querySelectorAll('.media-item')];
  if (reduce || !('IntersectionObserver' in window)) revealItems.forEach(el => el.classList.add('in'));
  else {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    }), {threshold:.12, rootMargin:'0px 0px -5% 0px'});
    revealItems.forEach(el => io.observe(el));
  }

  wireVideoFallbacks(app);

  const lightbox = document.querySelector('#lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  document.addEventListener('click', e => {
    const image = e.target.closest('[data-lightbox]');
    if (image && lightbox && lightboxImg) {
      lightboxImg.src = image.src;
      lightboxImg.alt = image.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    if (e.target.closest('[data-close-lightbox]') || e.target === lightbox) {
      lightbox?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox?.classList.contains('open')) {
      lightbox.classList.remove('open'); document.body.style.overflow='';
    }
  });
})();