/* Mensagem Studio — Microsoft Clarity. Loaded only when the project is configured. */
(() => {
  'use strict';
  if (window.__MS_CLARITY_CONSENT_V1__) return;
  window.__MS_CLARITY_CONSENT_V1__ = true;
  const config = window.MS_ANALYTICS_CONFIG || {};
  const id = String(config.clarityProjectId || '').trim();
  if (config.clarityEnabled !== true || !/^[a-z0-9]{5,32}$/i.test(id)) return;
  if (!/^(www\.)?mensagemstudio\.shop$/i.test(location.hostname)) return;
  if (location.pathname.startsWith('/wix-preview/')) return;

  const key = 'ms_clarity_consent_v1';
  const read = () => { try { return localStorage.getItem(key); } catch (_) { return null; } };
  const write = value => { try { localStorage.setItem(key, value); } catch (_) {} };
  let banner;

  function activate() {
    if (document.querySelector('script[data-ms-clarity-tag]')) return;
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
    const script = document.createElement('script');
    script.async = true;
    script.dataset.msClarityTag = '1';
    script.src = 'https://www.clarity.ms/tag/' + encodeURIComponent(id);
    document.head.appendChild(script);
  }

  function decide(accept) {
    write(accept ? 'accepted' : 'rejected');
    if (banner) { banner.remove(); banner = null; }
    if (accept) activate();
    else if (typeof window.clarity === 'function') {
      window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
    }
  }

  function showChoices() {
    if (banner) return;
    banner = document.createElement('section');
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Preferências de análise de navegação');
    Object.assign(banner.style, {
      position: 'fixed', left: '16px', bottom: '48px', zIndex: '2147483000',
      width: 'min(410px, calc(100vw - 32px))', padding: '17px', borderRadius: '12px',
      background: 'rgba(10,13,10,.96)', border: '1px solid rgba(255,218,39,.45)',
      color: '#fff', boxShadow: '0 12px 35px rgba(0,0,0,.5)',
      font: '13px/1.55 Arial, sans-serif'
    });
    const message = document.createElement('p');
    message.textContent = 'Podemos analisar cliques, rolagem e sessões de navegação para melhorar o site? A gravação só será ativada com sua permissão.';
    message.style.margin = '0 0 12px';
    banner.appendChild(message);
    const actions = document.createElement('div');
    Object.assign(actions.style, { display: 'flex', gap: '8px', flexWrap: 'wrap' });
    for (const [label, accept] of [['Recusar', false], ['Permitir análise', true]]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      Object.assign(button.style, {
        cursor: 'pointer', padding: '9px 12px', borderRadius: '6px',
        border: '1px solid rgba(255,255,255,.35)',
        background: accept ? '#ffda27' : 'transparent', color: accept ? '#10130b' : '#fff',
        font: 'bold 12px Arial, sans-serif'
      });
      button.addEventListener('click', () => decide(accept));
      actions.appendChild(button);
    }
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  function ready() {
    const privacy = document.createElement('button');
    privacy.type = 'button';
    privacy.textContent = 'Privacidade';
    privacy.setAttribute('aria-label', 'Alterar preferência de análise de navegação');
    Object.assign(privacy.style, {
      position: 'fixed', bottom: '9px', left: '16px', zIndex: '2147482999',
      background: 'rgba(10,13,10,.85)', color: '#ddd', border: '1px solid rgba(255,255,255,.18)',
      borderRadius: '6px', padding: '5px 8px', font: '11px Arial, sans-serif', cursor: 'pointer'
    });
    privacy.addEventListener('click', showChoices);
    document.body.appendChild(privacy);
    const choice = read();
    if (choice === 'accepted') activate();
    else if (choice !== 'rejected') showChoices();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
})();
