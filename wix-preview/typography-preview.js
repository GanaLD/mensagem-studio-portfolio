// Preview-only typography experiment: Fugaz One + Work Sans.
// Intentionally gated to /wix-preview/ so the published root site is not affected.
(() => {
  if (window.__MS_FUGAZ_WORK_PREVIEW__) return;
  if (!location.pathname.startsWith('/wix-preview/')) return;
  window.__MS_FUGAZ_WORK_PREVIEW__ = true;

  const FONT_STYLESHEET = 'https://fonts.googleapis.com/css2?family=Fugaz+One&family=Work+Sans:ital,wght@0,300..900;1,300..900&display=swap';

  const addLink = (rel, href, extra = {}) => {
    if ([...document.querySelectorAll(`link[rel="${rel}"]`)].some(link => link.href === href)) return;
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    Object.entries(extra).forEach(([key, value]) => {
      if (key === 'crossOrigin') link.crossOrigin = value;
      else link.setAttribute(key, value);
    });
    document.head.appendChild(link);
  };

  addLink('preconnect', 'https://fonts.googleapis.com');
  addLink('preconnect', 'https://fonts.gstatic.com', { crossOrigin: 'anonymous' });
  addLink('stylesheet', FONT_STYLESHEET);

  const style = document.createElement('style');
  style.id = 'ms-fugaz-work-preview-style';
  style.textContent = `
    :root{
      --ms-font-display:'Fugaz One',Impact,'Arial Black',sans-serif;
      --ms-font-body:'Work Sans',Arial,Helvetica,sans-serif;
      --font-futura:'Fugaz One',Impact,'Arial Black',sans-serif!important;
      --font-gotham:'Work Sans',Arial,Helvetica,sans-serif!important;
      --font-courier:'Work Sans',Arial,Helvetica,sans-serif!important;
      --v4-futura:'Fugaz One',Impact,'Arial Black',sans-serif!important;
      --v4-gotham:'Work Sans',Arial,Helvetica,sans-serif!important;
      --v4-mono:'Work Sans',Arial,Helvetica,sans-serif!important;
    }

    html,body,
    button,input,textarea,select,option{
      font-family:var(--ms-font-body)!important;
    }

    p,li,label,small,figcaption,
    .lead,.description,.muted,.kicker,.eyebrow,.cat,.price,.note,
    .nav,.nav a,.right,.filter,.filters,.chip,.btn,.add,.close,.send,
    .detail,.detail span,.detail a,.caption,.caption p,.caption small,
    .hero-label,.model-file-link,.conversion-btn,.conversion-ref,
    .case-study-card p,.case-study-service small,.project-link small,
    .ms-menu-head,.ms-menu-link small,.ms-menu-quote,
    .ms-sound-toggle,.ms-glass-cta,.ms-quote-fab,
    footer,.footer{
      font-family:var(--ms-font-body)!important;
    }

    h1,h2,h3,h4,h5,h6,
    .brand,
    .hero-title,
    .section-title,
    .project-title,
    .card-title,
    .display,
    .section-head h2,
    .category h2,
    .card h3,
    .hero-copy h1,
    .conversion-copy h2,
    .project-link strong,
    .case-study-head h2,
    .ms-menu-link,
    .ms-contact-card h2{
      font-family:var(--ms-font-display)!important;
      font-weight:400!important;
      font-synthesis:none;
      overflow-wrap:break-word;
      word-break:normal;
    }

    h1 *,h2 *,h3 *,h4 *,h5 *,h6 *,
    .hero-title *,
    .section-title *,
    .project-title *,
    .card-title *,
    .display *{
      font-family:inherit!important;
      font-weight:inherit!important;
    }

    /* Fugaz One is naturally wide and angled; reduce the aggressive negative tracking
       used by the previous grotesk without changing the approved type scale. */
    h1,h2,h3,
    .hero-title,.section-title,.project-title,.card-title,.display,
    .section-head h2,.category h2,.card h3,.hero-copy h1,
    .conversion-copy h2,.project-link strong,.case-study-head h2,
    .ms-menu-link,.ms-contact-card h2{
      letter-spacing:-.018em!important;
    }

    .brand{letter-spacing:.045em!important;white-space:nowrap}
    .nav a,.filter,.chip,.btn,.add,.close,.send,
    .conversion-btn,.ms-menu-quote,.ms-glass-cta,.ms-quote-fab{
      letter-spacing:.07em!important;
    }

    @media(max-width:760px){
      h1,h2,h3,.hero-title,.section-title,.project-title,.card-title,.display{
        overflow-wrap:anywhere;
      }
    }
  `;
  document.head.appendChild(style);
  document.documentElement.classList.add('ms-typography-fugaz-work');

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('ms-typography-fugaz-work-ready');
      window.dispatchEvent(new Event('resize'));
    }).catch(() => {});
  }
})();
