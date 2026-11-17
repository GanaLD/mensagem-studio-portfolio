window.MS_ANALYTICS_CONFIG = Object.freeze({
  ga4MeasurementId: "G-9BYT1JY7QS",
  enabled: true,
  clarityProjectId: "zf84t1xrws", // Project ID from clarity.microsoft.com; never use a GA4 ID here.
  clarityEnabled: true // Remains inactive until the Clarity project is linked.
});

(() => {
  const cfg = window.MS_ANALYTICS_CONFIG;
  const id = String(cfg.clarityProjectId || '').trim();
  if (cfg.clarityEnabled !== true || !/^[a-z0-9]{5,32}$/i.test(id)) return;
  if (!/^(www\.)?mensagemstudio\.shop$/i.test(location.hostname)) return;
  if (location.pathname.startsWith('/wix-preview/')) return;
  if (document.querySelector('script[data-ms-clarity-bootstrap]')) return;
  const script = document.createElement('script');
  script.src = '/assets/clarity-consent.js?v=20261117';
  script.async = true;
  script.dataset.msClarityBootstrap = '1';
  document.head.appendChild(script);
})();
