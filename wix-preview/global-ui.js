// Universal UI for the published Mensagem Studio site: glass menu, timed contact popup and low-volume ambient soundtrack.
(() => {
  if (window.__MS_GLOBAL_UI_V1__) return;
  window.__MS_GLOBAL_UI_V1__ = true;

  const ROOT = location.pathname.startsWith('/wix-preview/') ? '/wix-preview/' : '/';
  const PORTFOLIO_URL = ROOT + 'portfolio/';
  const SERVICES_URL = ROOT + 'servicos/';
  const ABOUT_URL = ROOT + 'sobre/';
  const QUOTE_URL = SERVICES_URL + '#orcamento';
  const WHATSAPP_URL = 'https://wa.me/5541999999937?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Mensagem%20Studio%20e%20quero%20falar%20sobre%20um%20projeto.';
  const VERSION = '20260921-r26-button-glass-only';

  const style = document.createElement('style');
  style.id = 'ms-global-ui-style';
  style.textContent = `
    :root{--ms-ui-lime:#c9ff36;--ms-ui-royal:#2457ff;--ms-ui-royal-2:#173dcc;--ms-ui-fg:#f4f5ef;--ms-ui-muted:#aab0a3;--ms-ui-glass:rgba(8,10,8,.48);--ms-ui-line:rgba(255,255,255,.16)}
    .ms-universal-menu-btn,.ms-sound-toggle,.ms-contact-close{font:inherit;color:var(--ms-ui-fg);appearance:none;-webkit-appearance:none}
    .ms-universal-menu-btn{position:fixed;z-index:100050;top:14px;left:14px;width:43px;height:43px;border:1px solid rgba(255,255,255,.20);border-radius:15px;background:linear-gradient(145deg,rgba(255,255,255,.10),rgba(255,255,255,.025));backdrop-filter:blur(18px) saturate(125%);-webkit-backdrop-filter:blur(18px) saturate(125%);display:grid;place-items:center;cursor:pointer;box-shadow:0 0 0 1px rgba(201,255,54,.035) inset,0 8px 34px rgba(0,0,0,.28);transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease,background .22s ease}
    .ms-universal-menu-btn:hover,.ms-universal-menu-btn:focus-visible{outline:none;transform:translateY(-1px);border-color:rgba(201,255,54,.60);box-shadow:0 0 22px rgba(201,255,54,.13),0 8px 34px rgba(0,0,0,.32)}
    .ms-universal-menu-btn .dots{display:flex;gap:4px;align-items:center;justify-content:center}
    .ms-universal-menu-btn i{display:block;width:4px;height:4px;border-radius:50%;background:var(--ms-ui-fg);opacity:.76;box-shadow:0 0 8px rgba(201,255,54,.18)}

    .ms-menu-overlay{position:fixed;z-index:100040;inset:0;display:flex;align-items:flex-start;justify-content:flex-start;padding:72px 18px 18px;background:rgba(2,4,3,.34);backdrop-filter:blur(24px) saturate(118%);-webkit-backdrop-filter:blur(24px) saturate(118%);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .24s ease,visibility .24s ease}
    .ms-menu-overlay.open{opacity:1;visibility:visible;pointer-events:auto}
    .ms-menu-panel{width:min(760px,calc(100vw - 36px));max-height:calc(100vh - 90px);overflow:auto;border:1px solid rgba(255,255,255,.16);border-radius:24px;background:linear-gradient(145deg,rgba(7,9,7,.72),rgba(7,9,7,.43));box-shadow:0 34px 110px rgba(0,0,0,.48),inset 0 1px rgba(255,255,255,.05);padding:18px 20px 20px;transform:translateY(-8px) scale(.985);transition:transform .28s cubic-bezier(.2,.8,.2,1)}
    .ms-menu-overlay.open .ms-menu-panel{transform:none}
    .ms-menu-head{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:10px 5px 16px;color:var(--ms-ui-muted);font-size:10px;letter-spacing:.16em;text-transform:uppercase}
    .ms-menu-list{display:grid}
    .ms-menu-link{position:relative;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:16px 6px 17px;border-top:1px solid rgba(255,255,255,.10);font-weight:860;font-size:clamp(40px,7vw,82px);line-height:.88;letter-spacing:-.055em;text-transform:uppercase;color:rgba(244,245,239,.88);transition:color .18s ease,padding-left .18s ease,text-shadow .18s ease}
    .ms-menu-link small{font-size:9px;letter-spacing:.16em;font-weight:700;color:rgba(201,255,54,.65);white-space:nowrap}
    .ms-menu-link:hover,.ms-menu-link:focus-visible,.ms-menu-link.active{outline:none;color:var(--ms-ui-lime);padding-left:14px;text-shadow:0 0 30px rgba(201,255,54,.20)}
    .ms-menu-link.pending{color:rgba(244,245,239,.48)}
    .ms-menu-pending-note{min-height:18px;padding:14px 6px 2px;color:var(--ms-ui-lime);font-size:9px;letter-spacing:.13em;text-transform:uppercase;opacity:0;transition:opacity .2s ease}
    .ms-menu-pending-note.show{opacity:1}
    .ms-menu-quote{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:14px;padding:14px 16px;border:1px solid rgba(201,255,54,.34);border-radius:16px;background:linear-gradient(145deg,rgba(201,255,54,.11),rgba(255,255,255,.025));color:var(--ms-ui-lime);font-size:10px;letter-spacing:.14em;font-weight:850;text-transform:uppercase;box-shadow:0 0 22px rgba(201,255,54,.07),inset 0 1px rgba(255,255,255,.07);transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease,background .2s ease}
    .ms-menu-quote:hover,.ms-menu-quote:focus-visible{outline:none;transform:translateY(-1px);border-color:rgba(201,255,54,.76);background:linear-gradient(145deg,rgba(201,255,54,.17),rgba(255,255,255,.035));box-shadow:0 0 30px rgba(201,255,54,.14),inset 0 1px rgba(255,255,255,.09)}

    .ms-quote-fab{position:fixed!important;display:inline-flex!important;visibility:visible!important;opacity:1!important;z-index:100055;right:14px;top:14px;bottom:auto;width:136px;height:46px;padding:0 14px;border:1px solid rgba(118,148,255,.62);border-radius:999px;background:linear-gradient(145deg,rgba(36,87,255,.34),rgba(23,61,204,.18) 58%,rgba(255,255,255,.055));backdrop-filter:blur(22px) saturate(155%);-webkit-backdrop-filter:blur(22px) saturate(155%);display:inline-flex;align-items:center;justify-content:center;gap:9px;overflow:hidden;color:#fff;font-size:9px;letter-spacing:.14em;font-weight:850;text-transform:uppercase;box-shadow:0 12px 34px rgba(0,0,0,.28),0 0 30px rgba(36,87,255,.22),inset 0 1px 0 rgba(255,255,255,.30),inset 0 -1px 0 rgba(36,87,255,.18);transition:width .32s cubic-bezier(.16,1,.3,1),padding .32s cubic-bezier(.16,1,.3,1),border-radius .32s ease,transform .2s ease,border-color .2s ease,box-shadow .2s ease,background .2s ease}
    .ms-quote-fab .ms-quote-label{display:block;max-width:92px;opacity:1;white-space:nowrap;overflow:hidden;transition:max-width .28s cubic-bezier(.16,1,.3,1),opacity .18s ease,transform .28s cubic-bezier(.16,1,.3,1)}
    .ms-quote-fab .ms-quote-icon{width:18px;height:18px;display:grid;place-items:center;flex:0 0 18px;color:#fff}
    .ms-quote-fab .ms-quote-icon svg{width:18px;height:18px;display:block;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
    .ms-quote-fab.is-compact{width:46px;padding:0;border-radius:15px;gap:0}
    .ms-quote-fab.is-compact .ms-quote-label{max-width:0;opacity:0;transform:translateX(8px)}
    .ms-quote-fab.is-drawer-open{opacity:0!important;visibility:hidden!important;pointer-events:none!important;transform:scale(.94)!important}
    .ms-quote-fab:hover,.ms-quote-fab:focus-visible{outline:none;transform:translateY(-2px);border-color:rgba(176,193,255,.90);background:linear-gradient(145deg,rgba(46,99,255,.46),rgba(24,63,207,.25) 58%,rgba(255,255,255,.075));box-shadow:0 16px 38px rgba(0,0,0,.34),0 0 38px rgba(36,87,255,.30),inset 0 1px 0 rgba(255,255,255,.36),inset 0 -1px 0 rgba(36,87,255,.22)}
    body[data-page="servicos"].ms-global-ui-mounted #cartBtn{visibility:hidden!important;pointer-events:none!important}

    .ms-sound-toggle{position:fixed;z-index:100030;left:16px;bottom:16px;min-width:50px;height:38px;padding:0 12px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(7,9,7,.46);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);display:inline-flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;font-size:9px;letter-spacing:.13em;text-transform:uppercase;box-shadow:0 8px 28px rgba(0,0,0,.28);transition:.2s ease}
    .ms-sound-toggle:hover,.ms-sound-toggle:focus-visible{outline:none;border-color:rgba(201,255,54,.58);box-shadow:0 0 20px rgba(201,255,54,.10),0 8px 28px rgba(0,0,0,.32)}
    .ms-sound-toggle .icon{width:14px;height:14px;display:grid;place-items:center;color:var(--ms-ui-lime)}
    .ms-sound-toggle.muted{opacity:.62}

    .ms-contact-overlay{position:fixed;z-index:100060;inset:0;display:grid;place-items:center;padding:20px;background:rgba(2,3,2,.36);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .28s ease,visibility .28s ease}
    .ms-contact-overlay.open{opacity:1;visibility:visible;pointer-events:auto}
    .ms-contact-card{position:relative;width:min(620px,100%);border:1px solid rgba(201,255,54,.30);border-radius:28px;padding:clamp(32px,5vw,48px);background:linear-gradient(145deg,rgba(18,22,17,.68),rgba(5,8,6,.52));backdrop-filter:blur(28px) saturate(135%);-webkit-backdrop-filter:blur(28px) saturate(135%);box-shadow:0 34px 120px rgba(0,0,0,.58),0 0 42px rgba(201,255,54,.12),inset 0 1px rgba(255,255,255,.10),inset 0 0 42px rgba(201,255,54,.035);transform:translateY(14px) scale(.975);transition:transform .32s cubic-bezier(.2,.85,.2,1),border-color .25s ease,box-shadow .25s ease;overflow:hidden}
    .ms-contact-overlay.open .ms-contact-card{transform:none;border-color:rgba(201,255,54,.44);box-shadow:0 34px 120px rgba(0,0,0,.58),0 0 54px rgba(201,255,54,.16),inset 0 1px rgba(255,255,255,.11),inset 0 0 46px rgba(201,255,54,.04)}
    .ms-contact-card:before{content:"";position:absolute;inset:-45% -20%;background:radial-gradient(circle at 16% 15%,rgba(201,255,54,.10),transparent 30%),linear-gradient(110deg,transparent 34%,rgba(255,255,255,.055) 48%,transparent 62%);pointer-events:none;transform:translateX(-18%);opacity:.85}
    .ms-contact-close{position:absolute;right:16px;top:16px;width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.20);background:linear-gradient(145deg,rgba(255,255,255,.10),rgba(255,255,255,.025));backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);cursor:pointer;font-size:18px;display:grid;place-items:center;box-shadow:0 0 18px rgba(201,255,54,.06);transition:.2s ease}
    .ms-contact-close:hover,.ms-contact-close:focus-visible{outline:none;border-color:rgba(201,255,54,.58);color:var(--ms-ui-lime);box-shadow:0 0 22px rgba(201,255,54,.12)}
    .ms-contact-card h2{position:relative;z-index:1;margin:0 0 20px;padding-right:52px;font-size:clamp(34px,4.6vw,56px);line-height:.94;letter-spacing:-.045em;text-transform:uppercase;max-width:14ch;color:var(--ms-ui-fg);text-wrap:balance}
    .ms-contact-card p{position:relative;z-index:1;margin:0 0 28px;color:#c9cec3;font-size:14px;line-height:1.62;max-width:50ch}
    .ms-contact-actions{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .ms-glass-cta{position:relative;min-height:60px;border:1px solid rgba(201,255,54,.26);border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.115),rgba(255,255,255,.03));backdrop-filter:blur(22px) saturate(135%);-webkit-backdrop-filter:blur(22px) saturate(135%);display:flex;align-items:center;justify-content:center;gap:0;padding:0 20px;font-size:10px;letter-spacing:.13em;font-weight:850;text-transform:uppercase;color:var(--ms-ui-fg);overflow:hidden;box-shadow:inset 0 1px rgba(255,255,255,.08),0 0 18px rgba(201,255,54,.045);transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease,background .2s ease}
    .ms-glass-cta:before{content:"";position:absolute;inset:-80% -30%;background:linear-gradient(100deg,transparent 34%,rgba(201,255,54,.22) 48%,transparent 62%);transform:translateX(-58%);transition:transform .55s ease;pointer-events:none}
    .ms-glass-cta:hover,.ms-glass-cta:focus-visible{outline:none;transform:translateY(-2px);border-color:rgba(201,255,54,.82);background:linear-gradient(145deg,rgba(201,255,54,.12),rgba(255,255,255,.035));box-shadow:0 0 28px rgba(201,255,54,.18),0 12px 34px rgba(0,0,0,.28),inset 0 1px rgba(255,255,255,.11)}
    .ms-glass-cta:hover:before,.ms-glass-cta:focus-visible:before{transform:translateX(52%)}
    .ms-glass-cta.primary{border-color:rgba(201,255,54,.72);background:linear-gradient(145deg,rgba(201,255,54,.20),rgba(201,255,54,.055));color:var(--ms-ui-lime);box-shadow:0 0 24px rgba(201,255,54,.10),inset 0 1px rgba(255,255,255,.10)}


    /* Compact YouTube soundtrack controller */
    .ms-sound-dock{position:fixed;z-index:100035;left:16px;bottom:16px;display:flex;align-items:center;gap:6px}
    .ms-sound-dock .ms-sound-toggle{position:static;left:auto;bottom:auto;min-width:68px;height:38px;padding:0 11px;border-color:rgba(255,255,255,.18);background:rgba(7,9,7,.54);gap:7px}
    .ms-sound-dock .ms-sound-toggle .icon{width:16px;height:16px;display:grid;place-items:center;color:var(--ms-ui-lime)}
    .ms-sound-dock .ms-sound-toggle .icon svg{width:15px;height:15px;display:block;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
    .ms-sound-dock .ms-sound-toggle .label{display:inline;font-size:9px;letter-spacing:.14em;font-weight:800}
    .ms-sound-dock .ms-sound-toggle.muted{opacity:.60}
    .ms-sound-more{width:38px;height:38px;padding:0;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(7,9,7,.54);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);display:grid;place-items:center;cursor:pointer;color:var(--ms-ui-fg);box-shadow:0 8px 28px rgba(0,0,0,.28);transition:.2s ease}
    .ms-sound-more:hover,.ms-sound-more:focus-visible,.ms-sound-more[aria-expanded="true"]{outline:none;border-color:rgba(201,255,54,.58);box-shadow:0 0 20px rgba(201,255,54,.10),0 8px 28px rgba(0,0,0,.32)}
    .ms-sound-more .dots{display:flex;gap:3px;align-items:center;justify-content:center}
    .ms-sound-more .dots i{display:block;width:3px;height:3px;border-radius:50%;background:currentColor;opacity:.84}
    .ms-sound-panel{position:absolute;left:0;bottom:46px;width:220px;padding:12px;border:1px solid rgba(255,255,255,.17);border-radius:15px;background:linear-gradient(145deg,rgba(7,9,7,.88),rgba(7,9,7,.72));backdrop-filter:blur(22px) saturate(125%);-webkit-backdrop-filter:blur(22px) saturate(125%);box-shadow:0 20px 54px rgba(0,0,0,.42),inset 0 1px rgba(255,255,255,.045);opacity:0;visibility:hidden;pointer-events:none;transform:translateY(7px) scale(.98);transform-origin:0 100%;transition:opacity .18s ease,visibility .18s ease,transform .18s ease}
    .ms-sound-panel.open{opacity:1;visibility:visible;pointer-events:auto;transform:none}
    .ms-sound-track{min-width:0;margin:0 0 10px;padding:0 2px 9px;border-bottom:1px solid rgba(255,255,255,.09);font-size:9px;line-height:1.35;letter-spacing:.06em;color:#d8dcd3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ms-sound-volume{display:grid;grid-template-columns:15px minmax(0,1fr) 25px;align-items:center;gap:8px;margin-bottom:10px;color:var(--ms-ui-muted);font-size:8px;letter-spacing:.08em}
    .ms-sound-volume svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
    .ms-sound-volume input{width:100%;height:16px;margin:0;accent-color:var(--ms-ui-lime);cursor:pointer}
    .ms-sound-volume output{font-variant-numeric:tabular-nums;text-align:right;color:var(--ms-ui-lime);font-weight:800}
    .ms-sound-controls{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
    .ms-sound-controls button{height:34px;border:1px solid rgba(255,255,255,.13);border-radius:10px;background:rgba(255,255,255,.035);color:var(--ms-ui-fg);cursor:pointer;display:grid;place-items:center;font-size:13px;line-height:1;transition:.18s ease}
    .ms-sound-controls button:hover,.ms-sound-controls button:focus-visible{outline:none;border-color:rgba(201,255,54,.50);color:var(--ms-ui-lime);background:rgba(201,255,54,.045)}
    .ms-sound-controls .play{color:var(--ms-ui-lime)}
    .ms-youtube-audio-host{position:fixed!important;left:-9999px!important;top:-9999px!important;width:2px!important;height:2px!important;opacity:0!important;pointer-events:none!important}
    @media(max-width:760px){
      .ms-sound-dock{left:12px;bottom:12px}
      .ms-sound-dock .ms-sound-toggle{height:36px;min-width:64px;padding:0 10px}
      .ms-sound-dock .ms-sound-toggle .label{display:inline}
      .ms-sound-more{width:36px;height:36px}
      .ms-sound-panel{bottom:44px;width:210px}
    }

    body.ms-global-ui-mounted header .brand,body.ms-global-ui-mounted .top .brand{margin-left:48px}
    @media(max-width:760px){
      .ms-universal-menu-btn{top:10px;left:10px;width:40px;height:40px;border-radius:14px}
      .ms-menu-overlay{padding:60px 10px 10px}.ms-menu-panel{width:100%;border-radius:20px;padding:14px 15px}.ms-menu-link{font-size:clamp(38px,13vw,58px);padding:14px 4px 15px}.ms-menu-link:hover{padding-left:8px}
      .ms-sound-toggle{left:12px;bottom:12px;height:36px;padding:0 10px}.ms-sound-toggle .label{display:none}
      .ms-quote-fab{right:10px;top:10px;bottom:auto;width:126px;height:40px;padding:0 11px;font-size:8px}.ms-quote-fab.is-compact{width:40px;height:40px;padding:0;border-radius:14px}.ms-quote-fab .ms-quote-icon,.ms-quote-fab .ms-quote-icon svg{width:17px;height:17px;flex-basis:17px}
      .ms-contact-actions{grid-template-columns:1fr}.ms-contact-card{border-radius:22px;padding:32px 22px 24px}.ms-contact-card h2{font-size:clamp(32px,10.2vw,46px);line-height:.94;max-width:12.6ch;padding-right:42px;margin-bottom:18px}.ms-contact-card p{font-size:13px;line-height:1.58;margin-bottom:22px;max-width:100%}.ms-glass-cta{min-height:56px}
      body.ms-global-ui-mounted header .brand,body.ms-global-ui-mounted .top .brand{margin-left:44px}
    }
    /* PREVIEW V24 — supplied reference translated literally to live DOM buttons.
       Geometry/shadows/blur follow the reference; no colored fake fill. */
    :root{
      --ms-lg-radius:9999px;
      --ms-lg-tr:15%;
      --ms-lg-text:#f5f5f5;
    }
    .ms-liquid-glass{
      --ms-lg-x:50%;
      --ms-lg-y:50%;
      position:relative!important;
      isolation:isolate!important;
      overflow:hidden!important;
      border-radius:var(--ms-lg-radius)!important;
      border:1px double rgba(255,255,255,.16)!important;
      background:rgba(0,0,0,.02)!important;
      color:var(--ms-lg-text)!important;
      -webkit-backdrop-filter:blur(2px)!important;
      backdrop-filter:blur(2px)!important;
      box-shadow:
        inset 2px -2px 1px -1px rgba(255,255,255,.90),
        inset -2px 2px 1px -1px rgba(255,255,255,.90),
        inset 6px -6px 1px -6px rgba(255,255,255,.55),
        inset -6px 6px 1px -6px rgba(255,255,255,.55),
        inset 0 0 2px rgba(0,0,0,.80),
        0 4px 8px rgba(0,0,0,.20)!important;
      filter:brightness(.92);
      text-shadow:0 1px 10px rgba(0,0,0,.26)!important;
      user-select:none;
      -webkit-user-select:none;
      transition:transform .25s ease,background .25s ease,border-color .25s ease,box-shadow .25s ease!important;
    }
    .ms-liquid-glass::before{
      content:""!important;
      position:absolute!important;
      z-index:0!important;
      top:35%!important;
      left:50%!important;
      transform:translateX(-50%)!important;
      width:calc(100% - 16px)!important;
      height:calc(100% - 16px)!important;
      border-radius:inherit!important;
      border:1px solid rgba(0,0,0,.90)!important;
      background:transparent!important;
      filter:blur(8px)!important;
      pointer-events:none!important;
    }
    .ms-liquid-glass::after{
      content:""!important;
      position:absolute!important;
      z-index:1!important;
      inset:0!important;
      width:100%!important;
      height:100%!important;
      border-radius:inherit!important;
      background:linear-gradient(
        45deg,
        rgba(255,255,255,.80) 0%,
        transparent var(--ms-lg-tr),
        transparent calc(100% - var(--ms-lg-tr)),
        rgba(255,255,255,.80) 100%
      )!important;
      filter:blur(7px) contrast(3)!important;
      opacity:.30!important;
      pointer-events:none!important;
    }
    .ms-liquid-glass > *{position:relative;z-index:3}
    .ms-liquid-glass .ms-liquid-glass-arrow{display:none!important}
    .ms-liquid-glass:hover,
    .ms-liquid-glass:focus-visible{
      outline:none!important;
      background:rgba(0,0,0,0)!important;
      transform:translateY(-3px)!important;
      border-color:rgba(255,255,255,.28)!important;
      box-shadow:
        inset 2px -2px 1px -1px rgba(255,255,255,.96),
        inset -2px 2px 1px -1px rgba(255,255,255,.96),
        inset 6px -6px 1px -6px rgba(255,255,255,.62),
        inset -6px 6px 1px -6px rgba(255,255,255,.62),
        inset 0 0 2px rgba(0,0,0,.84),
        0 6px 12px rgba(0,0,0,.24)!important;
    }
    .ms-liquid-glass:hover::after,
    .ms-liquid-glass:focus-visible::after{opacity:.42!important}
    .ms-liquid-glass:active{transform:scale(.94)!important}
    .ms-liquid-glass.primary,
    .ms-liquid-glass.is-primary{
      background:rgba(0,0,0,.02)!important;
      border-color:rgba(255,255,255,.18)!important;
      color:#fff!important;
    }

    /* ORÇAMENTO stays present and uses the same real-glass construction,
       retaining only its approved royal-blue identity as an edge accent. */
    .ms-quote-fab.ms-liquid-glass{
      background:rgba(0,0,0,.02)!important;
      border-color:rgba(100,132,255,.62)!important;
      box-shadow:
        inset 2px -2px 1px -1px rgba(255,255,255,.90),
        inset -2px 2px 1px -1px rgba(255,255,255,.86),
        inset 6px -6px 1px -6px rgba(255,255,255,.50),
        inset -6px 6px 1px -6px rgba(255,255,255,.48),
        inset 0 0 2px rgba(0,0,0,.82),
        0 4px 8px rgba(0,0,0,.22),
        0 0 18px rgba(36,87,255,.16)!important;
    }
    .ms-quote-fab.ms-liquid-glass:hover,
    .ms-quote-fab.ms-liquid-glass:focus-visible{
      border-color:rgba(145,166,255,.88)!important;
      background:rgba(0,0,0,0)!important;
    }

    .ms-liquid-glass[disabled],
    .ms-liquid-glass[aria-disabled="true"]{opacity:.48!important;pointer-events:none!important}
    @media(max-width:760px){
      .ms-liquid-glass{min-height:46px!important;max-width:100%}
      .cta-row .ms-liquid-glass,
      .ms-brief-actions .ms-liquid-glass,
      .ms-footer-links .ms-liquid-glass{min-width:0!important}
    }
    /* PROTECTED UI — original Home lateral section rail must remain untouched */
    #msSectionNav .ms-liquid-glass,
    #msSectionNav.ms-liquid-glass,
    #msSectionNav .ms-section-nav-btn{
      border-radius:0!important;
      background:transparent!important;
      box-shadow:none!important;
      -webkit-backdrop-filter:none!important;
      backdrop-filter:none!important;
      text-shadow:none!important;
      transform:none!important;
    }
    #msSectionNav .ms-liquid-glass::before,
    #msSectionNav .ms-liquid-glass::after,
    #msSectionNav.ms-liquid-glass::before,
    #msSectionNav.ms-liquid-glass::after{
      content:none!important;
      display:none!important;
    }
    /* PREVIEW V21 — one fixed site-wide header; About stays only inside the universal menu */
    body.ms-global-ui-mounted header.content-layer.ms-rubber-topnav-header,
    body.ms-global-ui-mounted header.top.ms-rubber-topnav-header{
      position:fixed!important;
      top:0!important;
      left:0!important;
      right:0!important;
      width:100%!important;
      z-index:100020!important;
    }
    /* HOME: header starts above the hero and scrolls away with the page.
       It must never sit over the hero/video while the immersive scroll is running. */
    html[data-ms-page="home"] body.ms-global-ui-mounted header.content-layer.ms-rubber-topnav-header{
      position:relative!important;
      top:auto!important;
      left:auto!important;
      right:auto!important;
      width:100%!important;
      z-index:100020!important;
      flex:0 0 auto!important;
    }
    html.ms-topnav-no-active #ms-rubber-topnav-root .rubber-segment__thumb{
      opacity:0!important;
    }
    @media(prefers-reduced-motion:reduce){.ms-universal-menu-btn,.ms-menu-overlay,.ms-menu-panel,.ms-menu-link,.ms-menu-quote,.ms-quote-fab,.ms-contact-overlay,.ms-contact-card,.ms-glass-cta,.ms-glass-cta:before{transition:none!important}}
  `;
  document.head.appendChild(style);
  document.body.classList.add('ms-global-ui-mounted');

  const path = location.pathname.replace(/\/+$/, '/') || '/';
  const active = path.includes('/servicos/') ? 'servicos' : path.includes('/portfolio/') ? 'projetos' : path.includes('/sobre/') ? 'sobre' : 'home';
  document.documentElement.dataset.msPage = active;
  if(active==='sobre') document.documentElement.classList.add('ms-topnav-no-active');

  // Actual React Bits RubberSegment top navigation.
  // This loads the bundle built from the installed @react-bits/RubberSegment-JS-CSS component.
  const topNavCssHref = ROOT + 'assets/react-bits-rubber-topnav/rubber-segment-topnav.css?v=20260921-r21';
  const topNavJsSrc = ROOT + 'assets/react-bits-rubber-topnav/rubber-segment-topnav.js?v=20260921-r21';

  if(!document.querySelector('link[data-ms-rubber-topnav]')){
    const topNavCss = document.createElement('link');
    topNavCss.rel = 'stylesheet';
    topNavCss.href = topNavCssHref;
    topNavCss.dataset.msRubberTopnav = '1';
    document.head.appendChild(topNavCss);
  }

  if(!document.querySelector('script[data-ms-rubber-topnav]')){
    const topNavJs = document.createElement('script');
    topNavJs.src = topNavJsSrc;
    topNavJs.defer = true;
    topNavJs.dataset.msRubberTopnav = '1';
    document.head.appendChild(topNavJs);
  }


  // Liquid-glass buttons are preview-only and applied to existing + dynamically-created actions.
  const LIQUID_GLASS_SELECTOR = [
    '.cta-row .btn',
    '.btn',
    '.cart',
    '.add',
    '.chip',
    '.filter',
    '.cristo-v4-btn',
    '.ms-brief-action',
    '.ms-footer-link',
    '.ms-footer-links .bg-switcher button',
    '.ms-quote-fab',
    '.ms-menu-quote',
    '.ms-glass-cta',
    '.send',
    'button[type="submit"]',
    '.stage-side button'
  ].join(',');

  const isArrowOnly = value => /^[\\s↗↘↙↖↑↓→←⟶⟵›»]+$/.test((value || '').trim());

  function makeLiquidGlass(root=document){
    const nodes = [];
    if(root?.matches?.(LIQUID_GLASS_SELECTOR)) nodes.push(root);
    root?.querySelectorAll?.(LIQUID_GLASS_SELECTOR).forEach(el=>nodes.push(el));

    nodes.forEach(el=>{
      if(el.closest('#ms-rubber-topnav-root')) return;
      if(el.closest('#msSectionNav')) return; // protected lateral site rail: never restyle
      if(el.classList.contains('ms-universal-menu-btn') || el.classList.contains('ms-contact-close') || el.classList.contains('ms-sound-toggle') || el.classList.contains('ms3d-edge')) return;

      el.classList.add('ms-liquid-glass');

      // The new glass language intentionally has no arrow glyphs.
      [...el.childNodes].forEach(node=>{
        if(node.nodeType===Node.TEXT_NODE && /[↗↘↙↖↑↓→←⟶⟵]/.test(node.nodeValue || '')){
          node.nodeValue=(node.nodeValue || '').replace(/[↗↘↙↖↑↓→←⟶⟵]/g,'').replace(/\\s{2,}/g,' ');
        }
      });
      el.querySelectorAll('b,span,i').forEach(child=>{
        if(isArrowOnly(child.textContent)){
          child.classList.add('ms-liquid-glass-arrow');
          child.setAttribute('aria-hidden','true');
        }
      });
    });
  }

  makeLiquidGlass();
  const liquidGlassObserver = new MutationObserver(records=>{
    records.forEach(record=>record.addedNodes.forEach(node=>{
      if(node.nodeType===Node.ELEMENT_NODE) makeLiquidGlass(node);
    }));
  });
  liquidGlassObserver.observe(document.documentElement,{childList:true,subtree:true});
  addEventListener('pagehide',()=>liquidGlassObserver.disconnect(),{once:true});

  const menuBtn = document.createElement('button');
  menuBtn.className = 'ms-universal-menu-btn';
  menuBtn.type = 'button';
  menuBtn.setAttribute('aria-label','Abrir menu universal');
  menuBtn.setAttribute('aria-expanded','false');
  menuBtn.innerHTML = '<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>';

  const menu = document.createElement('div');
  menu.className = 'ms-menu-overlay';
  menu.setAttribute('aria-hidden','true');
  menu.innerHTML = `
    <nav class="ms-menu-panel" aria-label="Menu principal">
      <div class="ms-menu-head"><span>MENSAGEM STUDIO</span><span>NAVEGAÇÃO</span></div>
      <div class="ms-menu-list">
        <a class="ms-menu-link ${active==='home'?'active':''}" href="${ROOT}"><span>HOME</span></a>
        <a class="ms-menu-link ${active==='projetos'?'active':''}" href="${PORTFOLIO_URL}"><span>PROJETOS</span></a>
        <a class="ms-menu-link ${active==='servicos'?'active':''}" href="${SERVICES_URL}"><span>SERVIÇOS</span></a>
        <a class="ms-menu-link ${active==='sobre'?'active':''}" href="${ABOUT_URL}"><span>SOBRE</span></a>
      </div>
      <a class="ms-menu-quote ms-quote-link" href="${QUOTE_URL}"><span>ABRIR ORÇAMENTO</span></a>
    </nav>`;
  document.body.append(menuBtn,menu);

  const quoteFab = document.createElement('a');
  quoteFab.className = 'ms-quote-fab ms-quote-link';
  quoteFab.href = QUOTE_URL;
  quoteFab.hidden = false;
  quoteFab.removeAttribute('aria-hidden');
  quoteFab.setAttribute('aria-label','Abrir orçamento');
  quoteFab.innerHTML = '<span class="ms-quote-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H7.2"/><circle cx="9.5" cy="19" r="1.25"/><circle cx="17.5" cy="19" r="1.25"/></svg></span><span class="ms-quote-label">ORÇAMENTO</span>';
  document.body.appendChild(quoteFab);
  const updateQuoteFabState = () => {
    const drawerOpen = Boolean(document.querySelector('.drawer.open'));
    const atPageTop = window.scrollY <= 180;
    quoteFab.classList.toggle('is-compact', atPageTop && !drawerOpen);
    quoteFab.classList.toggle('is-drawer-open', drawerOpen);
    quoteFab.setAttribute('aria-label', drawerOpen ? 'Orçamento aberto' : 'Abrir orçamento');
  };

  let quoteFabFrame = 0;
  const requestQuoteFabState = () => {
    if(quoteFabFrame) return;
    quoteFabFrame = requestAnimationFrame(() => {
      quoteFabFrame = 0;
      updateQuoteFabState();
    });
  };

  addEventListener('scroll', requestQuoteFabState, { passive:true });
  addEventListener('resize', requestQuoteFabState, { passive:true });

  const quoteDrawer = document.querySelector('.drawer');
  if(quoteDrawer && 'MutationObserver' in window){
    new MutationObserver(updateQuoteFabState).observe(quoteDrawer,{attributes:true,attributeFilter:['class']});
  }
  requestAnimationFrame(updateQuoteFabState);

  const openQuote = (event) => {
    if(active!=='servicos') return;
    const cartBtn = document.getElementById('cartBtn');
    if(!cartBtn) return;
    event.preventDefault();
    closeMenu();
    cartBtn.click();
    requestAnimationFrame(updateQuoteFabState);
    if(location.hash!=='#orcamento') history.replaceState(null,'',location.pathname+location.search+'#orcamento');
  };
  document.querySelectorAll('.ms-quote-link').forEach(link=>link.addEventListener('click',openQuote));

  const openMenu = () => { menu.classList.add('open'); menu.setAttribute('aria-hidden','false'); menuBtn.setAttribute('aria-expanded','true'); };
  const closeMenu = () => { menu.classList.remove('open'); menu.setAttribute('aria-hidden','true'); menuBtn.setAttribute('aria-expanded','false'); };
  menuBtn.addEventListener('click',()=>menu.classList.contains('open')?closeMenu():openMenu());
  menu.addEventListener('click',e=>{ if(e.target===menu) closeMenu(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ closeMenu(); closeContact(); } });

  // Timed contact invitation: counts only visible time and is shown only once per browser/device.
  const popup = document.createElement('div');
  popup.className = 'ms-contact-overlay';
  popup.setAttribute('aria-hidden','true');
  popup.innerHTML = `
    <aside class="ms-contact-card" role="dialog" aria-modal="true" aria-labelledby="msContactTitle">
      <button class="ms-contact-close" type="button" aria-label="Fechar">×</button>
      <h2 id="msContactTitle">Vamos transformar sua ideia em realidade?</h2>
      <p>Já encontrou uma direção para o projeto? Fale com o estúdio. Se ainda estiver explorando, veja os projetos e escolha o melhor caminho.</p>
      <div class="ms-contact-actions">
        <a class="ms-glass-cta primary" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer"><span>FALAR NO WHATSAPP</span></a>
        <a class="ms-glass-cta" href="${PORTFOLIO_URL}"><span>VER PORTFÓLIO</span></a>
      </div>
    </aside>`;
  document.body.appendChild(popup);
  const popupKey='ms.contact.popup.once.v2';
  const legacyPopupKey='ms.contact.popup.session.v1';
  let popupClosed=false;
  function markPopupShown(){
    try{localStorage.setItem(popupKey,'1')}catch(_){ }
  }
  function popupAlreadyShown(){
    try{
      if(localStorage.getItem(popupKey)==='1') return true;
      if(sessionStorage.getItem(legacyPopupKey)==='1'){markPopupShown();return true}
    }catch(_){ }
    return false;
  }
  function closeContact(){
    if(!popup?.classList.contains('open')) return;
    popup.classList.remove('open'); popup.setAttribute('aria-hidden','true'); popupClosed=true;
    markPopupShown();
  }
  popup.querySelector('.ms-contact-close')?.addEventListener('click',closeContact);
  popup.addEventListener('click',e=>{if(e.target===popup)closeContact()});
  popup.querySelectorAll('a').forEach(a=>a.addEventListener('click',markPopupShown));

  let remaining=60000, visibleSince=performance.now(), popupTimer=0;
  function showContact(){
    if(popupAlreadyShown()||popupClosed) return;
    if(document.querySelector('.drawer.open,.lightbox.open,.ms-menu-overlay.open')){remaining=9000;schedulePopup();return;}
    popup.classList.add('open');popup.setAttribute('aria-hidden','false');
    markPopupShown();
  }
  function schedulePopup(){
    clearTimeout(popupTimer);
    if(popupAlreadyShown()||popupClosed||document.hidden)return;
    visibleSince=performance.now();
    popupTimer=setTimeout(showContact,Math.max(250,remaining));
  }
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){remaining=Math.max(0,remaining-(performance.now()-visibleSince));clearTimeout(popupTimer)}
    else schedulePopup();
  });
  if(!popupAlreadyShown())schedulePopup();

  // Low-volume YouTube playlist soundtrack. Audible playback is unlocked on the first user gesture.
  const PLAYLIST_ID='PLP2BlXXbCDiYNzhsfQHB5V4BMfyLrm88h';
  const START_VIDEO_ID='tTN-G4WEonY';
  const DEFAULT_INDEX=1; // YouTube URL index=2 -> API uses zero-based index.
  const DEFAULT_VOLUME=3;
  const soundtrackKey='ms.youtube.soundtrack.session.v1';

  let savedSoundtrack=null;
  try{savedSoundtrack=JSON.parse(sessionStorage.getItem(soundtrackKey)||'null')}catch(_){savedSoundtrack=null}
  let soundVolume=Number.isFinite(savedSoundtrack?.volume)?Math.max(0,Math.min(100,savedSoundtrack.volume)):DEFAULT_VOLUME;
  let soundMuted=savedSoundtrack?.muted===true;
  let soundPaused=savedSoundtrack?.paused===true;
  let resumeIndex=Number.isInteger(savedSoundtrack?.index)?Math.max(0,savedSoundtrack.index):DEFAULT_INDEX;
  let resumeTime=Number.isFinite(savedSoundtrack?.time)?Math.max(0,savedSoundtrack.time):0;
  let ytPlayer=null,ytReady=false,audioUnlocked=false,soundPanelOpen=false,saveTimer=0;

  const speakerSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 9.5v5h4l4.5 3.5V6L8.5 9.5h-4Z"></path><path d="M16 9c1.4 1.5 1.4 4.5 0 6"></path><path d="M18.5 6.5c3 3.1 3 7.9 0 11"></path></svg>';
  const soundDock=document.createElement('div');
  soundDock.className='ms-sound-dock';
  soundDock.innerHTML=
    '<button type="button" class="ms-sound-toggle" aria-label="Desligar trilha sonora">'+
      '<span class="icon">'+speakerSvg+'</span><span class="label">ON</span>'+
    '</button>'+
    '<button type="button" class="ms-sound-more" aria-label="Abrir controles de som" aria-expanded="false">'+
      '<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>'+
    '</button>'+
    '<div class="ms-sound-panel" role="dialog" aria-label="Controles da trilha sonora" aria-hidden="true">'+
      '<div class="ms-sound-track" title="Samurai - Archangel (long version)">Samurai - Archangel (long version)</div>'+
      '<label class="ms-sound-volume" aria-label="Volume">'+speakerSvg+
        '<input type="range" min="0" max="100" step="1" value="'+soundVolume+'">'+
        '<output>'+soundVolume+'</output>'+
      '</label>'+
      '<div class="ms-sound-controls">'+
        '<button type="button" class="prev" aria-label="Faixa anterior" title="Faixa anterior">‹</button>'+
        '<button type="button" class="play" aria-label="Pausar" title="Pausar">❚❚</button>'+
        '<button type="button" class="next" aria-label="Próxima faixa" title="Próxima faixa">›</button>'+
      '</div>'+
    '</div>';
  document.body.appendChild(soundDock);

  const soundBtn=soundDock.querySelector('.ms-sound-toggle');
  const soundMore=soundDock.querySelector('.ms-sound-more');
  const soundPanel=soundDock.querySelector('.ms-sound-panel');
  const soundTrack=soundDock.querySelector('.ms-sound-track');
  const volumeInput=soundDock.querySelector('input[type="range"]');
  const volumeOutput=soundDock.querySelector('output');
  const prevBtn=soundDock.querySelector('.prev');
  const playBtn=soundDock.querySelector('.play');
  const nextBtn=soundDock.querySelector('.next');

  function updateSoundUi(){
    const off=soundMuted||soundVolume===0;
    soundBtn.classList.toggle('muted',off);
    soundBtn.querySelector('.label').textContent=off?'OFF':'ON';
    soundBtn.setAttribute('aria-label',off?'Ligar trilha sonora':'Desligar trilha sonora');
    soundBtn.title=off?'Ligar trilha sonora':'Desligar trilha sonora';
    volumeInput.value=String(soundVolume);
    volumeOutput.value=String(soundVolume);
    volumeOutput.textContent=String(soundVolume);
    playBtn.textContent=soundPaused?'▶':'❚❚';
    playBtn.setAttribute('aria-label',soundPaused?'Reproduzir':'Pausar');
    playBtn.title=soundPaused?'Reproduzir':'Pausar';
  }

  function setPanel(open){
    soundPanelOpen=!!open;
    soundPanel.classList.toggle('open',soundPanelOpen);
    soundPanel.setAttribute('aria-hidden',soundPanelOpen?'false':'true');
    soundMore.setAttribute('aria-expanded',soundPanelOpen?'true':'false');
    soundMore.setAttribute('aria-label',soundPanelOpen?'Fechar controles de som':'Abrir controles de som');
  }

  function saveSoundtrackState(){
    if(!ytReady||!ytPlayer)return;
    try{
      const index=Math.max(0,ytPlayer.getPlaylistIndex?.()??resumeIndex);
      const time=Math.max(0,ytPlayer.getCurrentTime?.()??resumeTime);
      sessionStorage.setItem(soundtrackKey,JSON.stringify({
        index,time,volume:soundVolume,muted:soundMuted,paused:soundPaused
      }));
    }catch(_){}
  }

  function syncPlayerAudio(){
    if(!ytReady||!ytPlayer)return;
    try{
      ytPlayer.setVolume(soundVolume);
      if(soundMuted||soundVolume===0||!audioUnlocked)ytPlayer.mute();
      else ytPlayer.unMute();
      if(soundPaused)ytPlayer.pauseVideo();
      else if(audioUnlocked)ytPlayer.playVideo();
    }catch(_){}
    updateSoundUi();
  }

  function refreshTrackTitle(){
    if(!ytReady||!ytPlayer)return;
    try{
      const data=ytPlayer.getVideoData?.();
      const title=(data&&data.title)||'Samurai - Archangel (long version)';
      if(title){soundTrack.textContent=title;soundTrack.title=title}
    }catch(_){}
  }

  function unlockSound(){
    if(!audioUnlocked){
      audioUnlocked=true;
      loadYouTubeApi();
    }else if(!ytReady&&!ytPlayer){
      loadYouTubeApi();
    }
    if(ytReady){
      syncPlayerAudio();
      if(!soundMuted&&!soundPaused&&soundVolume>0){
        try{ytPlayer.playVideo();ytPlayer.unMute();ytPlayer.setVolume(soundVolume)}catch(_){}
      }
    }
  }

  function createYouTubePlayer(){
    if(ytPlayer||!window.YT?.Player)return;
    const host=document.createElement('div');
    host.id='msYoutubeAudioPlayer';
    host.className='ms-youtube-audio-host';
    document.body.appendChild(host);
    ytPlayer=new YT.Player(host,{
      height:'2',width:'2',
      playerVars:{
        autoplay:1,controls:0,disablekb:1,playsinline:1,rel:0,loop:1,
        listType:'playlist',list:PLAYLIST_ID,index:resumeIndex
      },
      events:{
        onReady:(event)=>{
          ytReady=true;
          try{
            event.target.setVolume(soundVolume);
            event.target.mute();
            event.target.loadPlaylist({
              listType:'playlist',
              list:PLAYLIST_ID,
              index:resumeIndex,
              startSeconds:resumeTime
            });
          }catch(_){}
          setTimeout(()=>{
            // First fresh visit must begin on Samurai - Archangel even if playlist order metadata arrives late.
            if(!savedSoundtrack){
              try{
                const ids=event.target.getPlaylist?.()||[];
                const exact=ids.indexOf(START_VIDEO_ID);
                if(exact>=0&&event.target.getPlaylistIndex?.()!==exact){
                  event.target.playVideoAt(exact);
                  resumeIndex=exact;
                }
              }catch(_){}
            }
            if(soundPaused){try{event.target.pauseVideo()}catch(_){}}
            if(audioUnlocked)syncPlayerAudio();
            refreshTrackTitle();
          },700);
          clearInterval(saveTimer);
          saveTimer=setInterval(saveSoundtrackState,1200);
          updateSoundUi();
        },
        onStateChange:(event)=>{
          if(event.data===YT.PlayerState.PLAYING){soundPaused=false;refreshTrackTitle()}
          else if(event.data===YT.PlayerState.PAUSED){soundPaused=true}
          else if(event.data===YT.PlayerState.ENDED){soundPaused=false}
          updateSoundUi();
          saveSoundtrackState();
        },
        onError:()=>{soundTrack.textContent='Playlist indisponível';soundTrack.title='Playlist indisponível'}
      }
    });
  }

  function loadYouTubeApi(){
    if(window.YT?.Player){createYouTubePlayer();return}
    const previous=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=function(){
      try{if(typeof previous==='function')previous()}catch(_){}
      createYouTubePlayer();
    };
    if(!document.querySelector('script[src*="youtube.com/iframe_api"]')){
      const script=document.createElement('script');
      script.src='https://www.youtube.com/iframe_api';
      script.async=true;
      document.head.appendChild(script);
    }
  }

  ['pointerdown','touchstart','keydown'].forEach(type=>{
    document.addEventListener(type,unlockSound,{once:true,passive:type!=='keydown'});
  });

  soundBtn.addEventListener('click',()=>{
    soundMuted=!soundMuted;
    if(!soundMuted&&soundVolume===0)soundVolume=DEFAULT_VOLUME;
    if(!soundMuted)soundPaused=false;
    unlockSound();
    syncPlayerAudio();
    saveSoundtrackState();
  });

  soundMore.addEventListener('click',e=>{
    e.stopPropagation();
    setPanel(!soundPanelOpen);
  });
  soundPanel.addEventListener('click',e=>e.stopPropagation());
  document.addEventListener('click',()=>{if(soundPanelOpen)setPanel(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&soundPanelOpen)setPanel(false)});

  volumeInput.addEventListener('input',()=>{
    soundVolume=Math.max(0,Math.min(100,Number(volumeInput.value)||0));
    soundMuted=soundVolume===0;
    if(soundVolume>0){soundMuted=false;soundPaused=false}
    unlockSound();
    syncPlayerAudio();
    saveSoundtrackState();
  });

  prevBtn.addEventListener('click',()=>{
    unlockSound();soundPaused=false;
    try{ytPlayer?.previousVideo()}catch(_){}
    syncPlayerAudio();
    setTimeout(refreshTrackTitle,220);
  });
  nextBtn.addEventListener('click',()=>{
    unlockSound();soundPaused=false;
    try{ytPlayer?.nextVideo()}catch(_){}
    syncPlayerAudio();
    setTimeout(refreshTrackTitle,220);
  });
  playBtn.addEventListener('click',()=>{
    unlockSound();
    soundPaused=!soundPaused;
    try{soundPaused?ytPlayer?.pauseVideo():ytPlayer?.playVideo()}catch(_){}
    syncPlayerAudio();
    saveSoundtrackState();
  });

  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)saveSoundtrackState();
  });
  window.addEventListener('pagehide',saveSoundtrackState);
  updateSoundUi();


  // Conversion analytics bridge. It queues events safely even before a real GA4
  // Measurement ID is configured. No analytics network request is made while
  // analytics-config.js keeps enabled=false or has an empty ID.
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};

  const msAnalytics={
    event(name,params={}){
      const clean={page_path:location.pathname,...params};
      try{window.gtag('event',name,clean)}catch(_){}
      try{window.dispatchEvent(new CustomEvent('ms:analytics',{detail:{name,params:clean}}))}catch(_){}
    }
  };
  window.MSAnalytics=window.MSAnalytics||msAnalytics;

  function initConfiguredGa4(){
    const cfg=window.MS_ANALYTICS_CONFIG||{};
    const id=String(cfg.ga4MeasurementId||'').trim();
    if(cfg.enabled!==true||!/^G-[A-Z0-9]+$/i.test(id))return;
    if(document.querySelector('script[data-ms-ga4]'))return;
    const s=document.createElement('script');
    s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
    s.dataset.msGa4='1';
    document.head.appendChild(s);
    window.gtag('js',new Date());
    window.gtag('config',id,{send_page_view:true});
    document.documentElement.dataset.msGa4=id;
  }

  if(!document.querySelector('script[data-ms-analytics-config]')){
    const configScript=document.createElement('script');
    configScript.src=ROOT+'analytics-config.js?v=20260913-1';
    configScript.async=true;
    configScript.dataset.msAnalyticsConfig='1';
    configScript.addEventListener('load',initConfiguredGa4,{once:true});
    document.head.appendChild(configScript);
  }else{
    initConfiguredGa4();
  }

  function textLabel(el){
    return String(el?.getAttribute?.('aria-label')||el?.textContent||'').replace(/\s+/g,' ').trim().slice(0,120);
  }

  document.addEventListener('click',e=>{
    const el=e.target.closest?.('a,button');
    if(!el)return;

    if(el.matches('[data-add]')){
      const card=el.closest('[data-service-card]');
      window.MSAnalytics.event('quote_add',{
        service_name:textLabel(card?.querySelector('h3')),
        source:'services_catalog'
      });
    }

    if(el.id==='cartBtn'){
      window.MSAnalytics.event('quote_open',{source:'cart_button'});
    }

    if(el.tagName!=='A')return;
    const raw=el.getAttribute('href')||'';
    let url;
    try{url=new URL(raw,location.href)}catch(_){return}

    if(/(^|\.)wa\.me$|whatsapp\.com$/i.test(url.hostname)){
      window.MSAnalytics.event('whatsapp_click',{
        link_text:textLabel(el),
        link_url:url.href
      });
    }

    if(url.hash==='#briefing'){
      window.MSAnalytics.event('briefing_open',{
        link_text:textLabel(el),
        source:'link'
      });
    }

    if(url.hash==='#orcamento'||url.searchParams.get('orcamento')==='1'){
      window.MSAnalytics.event('quote_open',{
        link_text:textLabel(el),
        source:'link'
      });
    }

    if(url.origin===location.origin&&/^\/portfolio\/[^/]+\/?$/.test(url.pathname)&&url.pathname!=='/portfolio/'){
      const slug=url.pathname.split('/').filter(Boolean).pop()||'';
      window.MSAnalytics.event('project_view',{
        project_slug:slug,
        source:'project_link'
      });
    }
  },true);

  const videoInteractions=new WeakSet();
  document.addEventListener('pointerup',e=>{
    const video=e.target.closest?.('video');
    if(!video||videoInteractions.has(video))return;
    if(!location.pathname.includes('/portfolio/'))return;
    videoInteractions.add(video);
    window.MSAnalytics.event('video_engagement',{
      video_title:video.getAttribute('title')||video.getAttribute('aria-label')||'Portfolio video',
      video_url:video.currentSrc||video.src||'',
      project_slug:location.pathname.split('/').filter(Boolean).pop()||''
    });
  },true);

  if(/^\/portfolio\/[^/]+\/?$/.test(location.pathname)&&location.pathname!=='/portfolio/'){
    window.MSAnalytics.event('project_view',{
      project_slug:location.pathname.split('/').filter(Boolean).pop()||'',
      source:'page_view'
    });
  }
  if(location.pathname.includes('/servicos/')){
    if(location.hash==='#briefing')window.MSAnalytics.event('briefing_open',{source:'page_state'});
    if(location.hash==='#orcamento'||new URLSearchParams(location.search).get('orcamento')==='1'){
      window.MSAnalytics.event('quote_open',{source:'page_state'});
    }
  }

  document.documentElement.dataset.msGlobalUi=VERSION;
})();