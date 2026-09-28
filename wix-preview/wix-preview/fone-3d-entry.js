// Preview-only mirror of the production V7 loader.
// IMPORTANT: this file exists only under /wix-preview/ and does not modify the published root site.
(() => {
  const section = document.getElementById('three');
  if (!section) return;

  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    import('../fone-3d-entry.js?v=20260927-production-v7-isolated-preview-mirror')
      .catch(error => console.error('[3D preview V7 mirror]', error));
  };

  if (!('IntersectionObserver' in window)) {
    window.addEventListener('load', load, {once:true});
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    load();
  }, {root:null, rootMargin:'1400px 0px', threshold:0});

  observer.observe(section);
})();
