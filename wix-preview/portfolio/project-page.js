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
  function detailsHTML() {
    if (!project.details?.length) return '';
    return `<div class="details">${project.details.map(d => `<div class="detail"><small>${esc(d.label)}</small>${d.link ? `<a href="${esc(d.link)}" target="_blank" rel="noopener">${esc(d.text || d.link)} ↗</a>` : `<span>${esc(d.text || '')}</span>`}</div>`).join('')}</div>`;
  }
  function heroMediaHTML() {
    if (project.coverVideo) {
      return `<video muted autoplay loop playsinline preload="metadata" poster="${esc(project.cover || '')}" src="${esc(project.coverVideo)}"></video>`;
    }
    return `<img src="${esc(project.cover || '')}" alt="${esc(project.title)}">`;
  }
  function itemHTML(item, index) {
    const type = item.type === 'VIDEO' ? 'Vídeo' : 'Imagem';
    const visual = item.type === 'VIDEO'
      ? `<video controls playsinline preload="metadata" ${item.poster ? `poster="${esc(item.poster)}"` : ''} src="${esc(item.url)}"></video>`
      : `<img loading="lazy" src="${esc(item.url)}" alt="${esc(item.title || project.title)}" data-lightbox>`;
    const caption = item.title || item.description ? `<div class="caption"><div>${item.title ? `<strong>${esc(item.title)}</strong>` : ''}${item.description ? `<p>${esc(item.description)}</p>` : ''}</div><small>${type} · ${String(index+1).padStart(2,'0')}</small></div>` : `<div class="caption"><div></div><small>${type} · ${String(index+1).padStart(2,'0')}</small></div>`;
    return `<article class="media-item ${mediaClass(item)}" style="transition-delay:${Math.min(index,7)*55}ms"><div class="media-visual">${visual}</div>${caption}</article>`;
  }

  const idx = projects.indexOf(project);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  app.innerHTML = `
    <section class="hero"><div class="wrap"><div class="hero-grid">
      <div class="hero-copy">
        <div class="eyebrow">${esc(project.tag || 'Projeto')} · ${String(idx+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}</div>
        <h1>${esc(project.title)}</h1>
        ${project.description ? `<p class="description">${esc(project.description)}</p>` : ''}
        ${detailsHTML()}
      </div>
      <div class="hero-media">${heroMediaHTML()}<div class="hero-label"><span>Projeto / Mensagem Studio</span><b>${project.media.length} ${project.media.length===1?'mídia':'mídias'}</b></div></div>
    </div></div></section>
    <section class="gallery-section"><div class="wrap">
      <div class="section-head"><div><div class="eyebrow">MÍDIAS DO PROJETO</div><h2>Galeria.</h2></div><p>Conteúdo do projeto preservado na ordem do portfólio original.</p></div>
      <div class="media-grid">${project.media.map(itemHTML).join('')}</div>
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