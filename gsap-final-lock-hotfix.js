// Final alignment + lock for the horizontal GSAP cases on the Home page.
// Uses the real panel geometry so the last case lands flush with the viewport,
// then keeps it pinned briefly before releasing the page scroll.
(() => {
  const apply = (attempt = 0) => {
    const section = document.getElementById('word');
    const sticky = section?.querySelector('.word-sticky');
    const track = document.getElementById('wordCaseVisuals');
    const copyTrack = document.getElementById('wordCopyTrack');
    const panels = section ? [...section.querySelectorAll('.word-case-panel')] : [];
    const ST = window.ScrollTrigger;

    if (!section || !sticky || !track || !copyTrack || panels.length < 2 || !ST) {
      if (attempt < 120) requestAnimationFrame(() => apply(attempt + 1));
      return;
    }

    const trigger = ST.getAll().find(st => st.trigger === section && st.animation);
    if (!trigger || trigger.__msFinalAlignmentV2Applied) {
      if (!trigger && attempt < 120) requestAnimationFrame(() => apply(attempt + 1));
      return;
    }

    const timeline = trigger.animation;
    if (!timeline) return;

    const horizontalTween = timeline.getChildren(false, true, false).find(tween => {
      const targets = typeof tween.targets === 'function' ? tween.targets() : [];
      return targets.includes(track) && targets.includes(copyTrack);
    });

    if (!horizontalTween) {
      if (attempt < 120) requestAnimationFrame(() => apply(attempt + 1));
      return;
    }

    trigger.__msFinalAlignmentV2Applied = true;

    // The panels are 100vw wide, while sticky.clientWidth can be slightly smaller
    // because of the browser scrollbar / usable layout width. Measure the actual
    // start position of the last panel to avoid the cumulative gap at the left edge.
    const realHorizontalDistance = () => {
      const first = panels[0];
      const last = panels[panels.length - 1];
      return Math.max(1, last.offsetLeft - first.offsetLeft);
    };

    const finalHoldDistance = () => Math.max(180, window.innerWidth * 0.22);
    const scrollDistance = () => realHorizontalDistance() + finalHoldDistance();

    // Replace the original assumed x distance with the actual panel geometry.
    horizontalTween.vars.x = () => -realHorizontalDistance();
    horizontalTween.invalidate();

    // Preserve the already approved final hold: after the last panel is flush,
    // keep it fixed briefly so scrub smoothing finishes before normal page scroll.
    const holdState = { progress: 0 };
    timeline.to(holdState, { progress: 1, duration: 0.22, ease: 'none' }, 3);

    trigger.vars.end = () => '+=' + scrollDistance();
    timeline.invalidate();
    trigger.refresh();

    const refresh = () => {
      horizontalTween.invalidate();
      timeline.invalidate();
      trigger.refresh();
    };
    addEventListener('resize', refresh, { passive: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => apply(), { once: true });
  } else {
    apply();
  }
})();
