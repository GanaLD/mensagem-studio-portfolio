(() => {
  const projects = Array.isArray(window.MENSAGEM_PROJECTS) ? window.MENSAGEM_PROJECTS : [];
  const cards = [...document.querySelectorAll('#grid .card')];
  cards.forEach((card, index) => {
    const project = projects[index];
    if (!project) return;
    const url = `https://mensagemstudio.shop/portfolio/${project.slug}/`;
    card.dataset.projectUrl = url;
    card.setAttribute('role','link');
    card.setAttribute('tabindex','0');
    card.setAttribute('aria-label',`Abrir projeto ${project.title}`);
    card.style.cursor = 'pointer';
    const badge = card.querySelector('.badge');
    if (badge) badge.textContent = 'Ver projeto ↗';
    const go = () => window.location.assign(url);
    card.addEventListener('click', e => {
      if (e.target.closest('a,button')) return;
      go();
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
})();