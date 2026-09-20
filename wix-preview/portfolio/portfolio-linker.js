(() => {
  const projects = Array.isArray(window.MENSAGEM_PROJECTS) ? window.MENSAGEM_PROJECTS : [];
  const bySlug = new Map(projects.map(project => [project.slug, project]));
  const cards = [...document.querySelectorAll('#grid .card')];

  cards.forEach(card => {
    const slug = card.dataset.projectSlug;
    const project = bySlug.get(slug);
    if (!project || !slug) return;

    const url = `./${slug}/`;
    card.dataset.projectUrl = url;
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Abrir projeto ${project.title}`);
    card.style.cursor = 'pointer';

    const badge = card.querySelector('.badge');
    if (badge) badge.textContent = 'Ver projeto ↗';

    const go = () => window.location.assign(url);

    card.addEventListener('click', event => {
      if (event.target.closest('a,button')) return;
      go();
    });

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        go();
      }
    });
  });
})();