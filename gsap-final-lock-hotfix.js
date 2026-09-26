// Final lock for the horizontal GSAP cases on the Home page.
// Keeps the last panel pinned briefly after it reaches the final viewport position,
// preventing the page from releasing while scrub smoothing is still catching up.
(() => {
  const apply = (attempt = 0) => {
    const section = document.getElementById('word');
    const sticky = section?.querySelector('.word-sticky');
    const panels = section ? [...section.querySelectorAll('.word-case-panel')] : [];
    const ST = window.ScrollTrigger;

    if (!section || !sticky || panels.length < 2 || !ST) {
      if (attempt < 90) requestAnimationFrame(() => apply(attempt + 1));
      return;
    }

    const trigger = ST.getAll().find(st => st.trigger === section && st.animation);
    if (!trigger || trigger.__msFinalLockApplied) {
      if (!trigger && attempt < 90) requestAnimationFrame(() => apply(attempt + 1));
      return;
    }

    const timeline = trigger.animation;
    if (!timeline) return;

    trigger.__msFinalLockApplied = true;

    // Original horizontal travel is 3 viewport widths for the four panels.
    // Add a modest 22% viewport scroll hold after the final panel is fully aligned.
    const horizontalDistance = () => Math.max(1, (panels.length - 1) * sticky.clientWidth);
    const finalHoldDistance = () => Math.max(180, sticky.clientWidth * 0.22);
    const scrollDistance = () => horizontalDistance() + finalHoldDistance();

    // Keep horizontal travel speed unchanged: for 4 panels, +0.22 timeline units
    // corresponds to +0.22 viewport of extra pinned scroll.
    const holdState = { progress: 0 };
    timeline.to(holdState, { progress: 1, duration: 0.22, ease: 'none' }, 3);

    trigger.vars.end = () => '+=' + scrollDistance();
    trigger.refresh();

    const refresh = () => trigger.refresh();
    addEventListener('resize', refresh, { passive: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => apply(), { once: true });
  } else {
    apply();
  }
})();
