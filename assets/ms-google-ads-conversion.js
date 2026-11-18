// Mensagem Studio: Google Ads conversion for WhatsApp contact clicks.
(() => {
  const googleAdsId = 'AW-18543181277';
  const conversionId = 'AW-18543181277/y2G4CJ36v7odEN37iYpF';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(googleAdsId);
    tag.dataset.msGoogleAds = '1';
    document.head.appendChild(tag);
  }

  window.gtag('js', new Date());
  window.gtag('config', googleAdsId);

  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;

    let url;
    try {
      url = new URL(link.href, location.href);
    } catch (_) {
      return;
    }

    if (!/(^|\\.)wa\\.me$|whatsapp\\.com$/i.test(url.hostname)) return;

    window.gtag('event', 'conversion', {
      send_to: conversionId,
      transport_type: 'beacon'
    });
  }, true);
})();
