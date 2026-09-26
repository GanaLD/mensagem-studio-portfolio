(() => {
  'use strict';

  const grid = document.querySelector('#grid');
  if (!grid) return;

  const style = document.createElement('style');
  style.id = 'project-particle-clip-hotfix-v1';
  style.textContent = `
    #grid{
      overflow:clip!important;
      overflow-clip-margin:0!important;
    }
    .project-card-particle-stage[data-particle-clip-hidden="true"]{
      visibility:hidden!important;
      opacity:0!important;
    }
  `;
  document.head.appendChild(style);

  let raf = 0;

  function syncStages(){
    raf = 0;
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    const activationLine = vh * 0.94;
    const upperRelease = -vh * 0.35;

    grid.querySelectorAll('.project-card-particle-stage').forEach(stage => {
      const rect = stage.getBoundingClientRect();
      const active = rect.top <= activationLine && rect.bottom >= upperRelease;
      if (active) stage.removeAttribute('data-particle-clip-hidden');
      else stage.setAttribute('data-particle-clip-hidden', 'true');
    });
  }

  function schedule(){
    if (raf) return;
    raf = requestAnimationFrame(syncStages);
  }

  const observer = new MutationObserver(schedule);
  observer.observe(grid, { childList:true });

  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', schedule, { passive:true });
  document.addEventListener('projectfilterchange', schedule);

  window.addEventListener('pagehide', () => {
    if (raf) cancelAnimationFrame(raf);
    observer.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    document.removeEventListener('projectfilterchange', schedule);
  }, { once:true });

  schedule();
})();