// Universal UI for the published Mensagem Studio site: glass menu, timed contact popup and low-volume ambient soundtrack.
(() => {
  if (window.__MS_GLOBAL_UI_V1__) return;
  window.__MS_GLOBAL_UI_V1__ = true;

  const ROOT = '/';
  const PORTFOLIO_URL = ROOT + 'portfolio/';
  const SERVICES_URL = ROOT + 'servicos/';
  const ABOUT_URL = ROOT + 'sobre/';
  const WHATSAPP_URL = 'https://wa.me/5541999999937?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Mensagem%20Studio%20e%20quero%20falar%20sobre%20um%20projeto.';
  const VERSION = '20260910-r5';

  const style = document.createElement('style');
  style.id = 'ms-global-ui-style';
  style.textContent = `
    :root{--ms-ui-lime:#c9ff36;--ms-ui-fg:#f4f5ef;--ms-ui-muted:#aab0a3;--ms-ui-glass:rgba(8,10,8,.48);--ms-ui-line:rgba(255,255,255,.16)}
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
    .ms-contact-kicker{position:relative;z-index:1;color:var(--ms-ui-lime);font-size:10px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:18px;font-weight:800;text-shadow:0 0 12px rgba(201,255,54,.30)}
    .ms-contact-card h2{position:relative;z-index:1;margin:0 0 22px;font-size:clamp(38px,5vw,62px);line-height:.90;letter-spacing:-.05em;text-transform:uppercase;max-width:11.5ch;color:var(--ms-ui-fg);text-wrap:balance}
    .ms-contact-card p{position:relative;z-index:1;margin:0 0 30px;color:#c9cec3;font-size:14px;line-height:1.65;max-width:48ch}
    .ms-contact-actions{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .ms-glass-cta{position:relative;min-height:60px;border:1px solid rgba(201,255,54,.26);border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.115),rgba(255,255,255,.03));backdrop-filter:blur(22px) saturate(135%);-webkit-backdrop-filter:blur(22px) saturate(135%);display:flex;align-items:center;justify-content:center;gap:0;padding:0 20px;font-size:10px;letter-spacing:.13em;font-weight:850;text-transform:uppercase;color:var(--ms-ui-fg);overflow:hidden;box-shadow:inset 0 1px rgba(255,255,255,.08),0 0 18px rgba(201,255,54,.045);transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease,background .2s ease}
    .ms-glass-cta:before{content:"";position:absolute;inset:-80% -30%;background:linear-gradient(100deg,transparent 34%,rgba(201,255,54,.22) 48%,transparent 62%);transform:translateX(-58%);transition:transform .55s ease;pointer-events:none}
    .ms-glass-cta:hover,.ms-glass-cta:focus-visible{outline:none;transform:translateY(-2px);border-color:rgba(201,255,54,.82);background:linear-gradient(145deg,rgba(201,255,54,.12),rgba(255,255,255,.035));box-shadow:0 0 28px rgba(201,255,54,.18),0 12px 34px rgba(0,0,0,.28),inset 0 1px rgba(255,255,255,.11)}
    .ms-glass-cta:hover:before,.ms-glass-cta:focus-visible:before{transform:translateX(52%)}
    .ms-glass-cta.primary{border-color:rgba(201,255,54,.72);background:linear-gradient(145deg,rgba(201,255,54,.20),rgba(201,255,54,.055));color:var(--ms-ui-lime);box-shadow:0 0 24px rgba(201,255,54,.10),inset 0 1px rgba(255,255,255,.10)}

    body.ms-global-ui-mounted header .brand,body.ms-global-ui-mounted .top .brand{margin-left:48px}
    @media(max-width:760px){
      .ms-universal-menu-btn{top:10px;left:10px;width:40px;height:40px;border-radius:14px}
      .ms-menu-overlay{padding:60px 10px 10px}.ms-menu-panel{width:100%;border-radius:20px;padding:14px 15px}.ms-menu-link{font-size:clamp(38px,13vw,58px);padding:14px 4px 15px}.ms-menu-link:hover{padding-left:8px}
      .ms-sound-toggle{left:12px;bottom:12px;height:36px;padding:0 10px}.ms-sound-toggle .label{display:none}
      .ms-contact-actions{grid-template-columns:1fr}.ms-contact-card{border-radius:22px;padding:30px 22px}.ms-contact-card h2{font-size:clamp(36px,11vw,52px);line-height:.92;max-width:10.8ch}.ms-contact-card p{font-size:13px;line-height:1.58;margin-bottom:24px}.ms-glass-cta{min-height:56px}
      body.ms-global-ui-mounted header .brand,body.ms-global-ui-mounted .top .brand{margin-left:44px}
    }
    @media(prefers-reduced-motion:reduce){.ms-universal-menu-btn,.ms-menu-overlay,.ms-menu-panel,.ms-menu-link,.ms-contact-overlay,.ms-contact-card,.ms-glass-cta,.ms-glass-cta:before{transition:none!important}}
  `;
  document.head.appendChild(style);
  document.body.classList.add('ms-global-ui-mounted');

  const path = location.pathname.replace(/\/+$/, '/') || '/';
  const active = path.includes('/servicos/') ? 'servicos' : path.includes('/portfolio/') ? 'projetos' : path.includes('/sobre/') ? 'sobre' : 'home';

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
        <a class="ms-menu-link ${active==='home'?'active':''}" href="${ROOT}"><span>HOME</span><small>01</small></a>
        <a class="ms-menu-link ${active==='projetos'?'active':''}" href="${PORTFOLIO_URL}"><span>PROJETOS</span><small>02</small></a>
        <a class="ms-menu-link ${active==='servicos'?'active':''}" href="${SERVICES_URL}"><span>SERVIÇOS</span><small>03</small></a>
        <a class="ms-menu-link ${active==='sobre'?'active':''}" href="${ABOUT_URL}"><span>SOBRE</span><small>04</small></a>
      </div>
    </nav>`;
  document.body.append(menuBtn,menu);

  const openMenu = () => { menu.classList.add('open'); menu.setAttribute('aria-hidden','false'); menuBtn.setAttribute('aria-expanded','true'); };
  const closeMenu = () => { menu.classList.remove('open'); menu.setAttribute('aria-hidden','true'); menuBtn.setAttribute('aria-expanded','false'); };
  menuBtn.addEventListener('click',()=>menu.classList.contains('open')?closeMenu():openMenu());
  menu.addEventListener('click',e=>{ if(e.target===menu) closeMenu(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ closeMenu(); closeContact(); } });

  // Timed contact invitation: counts only time while the tab is visible and shows once per browser session.
  const popup = document.createElement('div');
  popup.className = 'ms-contact-overlay';
  popup.setAttribute('aria-hidden','true');
  popup.innerHTML = `
    <aside class="ms-contact-card" role="dialog" aria-modal="true" aria-labelledby="msContactTitle">
      <button class="ms-contact-close" type="button" aria-label="Fechar">×</button>
      <div class="ms-contact-kicker">1 MINUTO POR AQUI</div>
      <h2 id="msContactTitle">Vamos transformar sua ideia?</h2>
      <p>Já encontrou uma direção para o projeto? Fale com o estúdio. Se ainda estiver explorando, veja os projetos e escolha o melhor caminho.</p>
      <div class="ms-contact-actions">
        <a class="ms-glass-cta primary" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer"><span>FALAR NO WHATSAPP</span></a>
        <a class="ms-glass-cta" href="${PORTFOLIO_URL}"><span>VER PORTFÓLIO</span></a>
      </div>
    </aside>`;
  document.body.appendChild(popup);
  const popupKey='ms.contact.popup.session.v1';
  let popupClosed=false;
  function closeContact(){
    if(!popup?.classList.contains('open')) return;
    popup.classList.remove('open'); popup.setAttribute('aria-hidden','true'); popupClosed=true;
    try{sessionStorage.setItem(popupKey,'1')}catch(_){ }
  }
  popup.querySelector('.ms-contact-close')?.addEventListener('click',closeContact);
  popup.addEventListener('click',e=>{if(e.target===popup)closeContact()});
  popup.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{try{sessionStorage.setItem(popupKey,'1')}catch(_){}}));

  let remaining=60000, visibleSince=performance.now(), popupTimer=0;
  function popupAlreadyShown(){try{return sessionStorage.getItem(popupKey)==='1'}catch(_){return false}}
  function showContact(){
    if(popupAlreadyShown()||popupClosed) return;
    if(document.querySelector('.drawer.open,.lightbox.open,.ms-menu-overlay.open')){remaining=9000;schedulePopup();return;}
    popup.classList.add('open');popup.setAttribute('aria-hidden','false');
    try{sessionStorage.setItem(popupKey,'1')}catch(_){ }
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

  // Very low-volume procedural cyber-Japanese ambience. Browsers require a user gesture before audible playback.
  const soundBtn=document.createElement('button');
  soundBtn.type='button';soundBtn.className='ms-sound-toggle';soundBtn.setAttribute('aria-label','Mutar trilha ambiente');
  soundBtn.innerHTML='<span class="icon" aria-hidden="true">♪</span><span class="label">SOM</span>';
  document.body.appendChild(soundBtn);
  const muteKey='ms.ambient.muted.v1';
  let muted=false;
  try{muted=localStorage.getItem(muteKey)==='1'}catch(_){ }
  let audioCtx=null,master=null,filter=null,ambientInterval=0,started=false,userUnlocked=false,step=0;
  const notes=[293.66,349.23,329.63,440.00,349.23,466.16,329.63,293.66]; // D Hirajoshi-like contour

  function updateSoundButton(){
    soundBtn.classList.toggle('muted',muted);
    soundBtn.querySelector('.icon').textContent=muted?'×':'♪';
    soundBtn.setAttribute('aria-label',muted?'Ativar trilha ambiente':'Mutar trilha ambiente');
    soundBtn.title=muted?'Ativar trilha ambiente':'Mutar trilha ambiente';
  }
  function createTone(freq,when,dur=.48,level=.07){
    if(!audioCtx||!master)return;
    const osc=audioCtx.createOscillator(),g=audioCtx.createGain(),lp=audioCtx.createBiquadFilter();
    osc.type='sine';osc.frequency.setValueAtTime(freq,when);
    lp.type='lowpass';lp.frequency.setValueAtTime(1200,when);lp.Q.value=.7;
    g.gain.setValueAtTime(.0001,when);g.gain.exponentialRampToValueAtTime(level,when+.035);g.gain.exponentialRampToValueAtTime(.0001,when+dur);
    osc.connect(lp);lp.connect(g);g.connect(master);osc.start(when);osc.stop(when+dur+.04);
  }
  function startAmbient(){
    if(started||muted||!userUnlocked)return;
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    audioCtx=audioCtx||new AC();
    master=master||audioCtx.createGain();master.gain.value=.014;master.connect(audioCtx.destination);
    filter=audioCtx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=520;
    const droneGain=audioCtx.createGain();droneGain.gain.value=.045;
    const d1=audioCtx.createOscillator(),d2=audioCtx.createOscillator();d1.type='sine';d2.type='triangle';d1.frequency.value=73.42;d2.frequency.value=110;
    d1.connect(filter);d2.connect(filter);filter.connect(droneGain);droneGain.connect(master);d1.start();d2.start();
    const lfo=audioCtx.createOscillator(),lfoGain=audioCtx.createGain();lfo.frequency.value=.075;lfoGain.gain.value=95;lfo.connect(lfoGain);lfoGain.connect(filter.frequency);lfo.start();
    started=true;audioCtx.resume().catch(()=>{});
    ambientInterval=setInterval(()=>{
      if(!audioCtx||muted||audioCtx.state!=='running')return;
      const now=audioCtx.currentTime+.03;
      createTone(notes[step%notes.length],now,.52,.045);
      if(step%4===2)createTone(notes[(step+3)%notes.length]/2,now+.19,.82,.022);
      step++;
    },720);
  }
  function unlockAudio(){userUnlocked=true;if(!muted)startAmbient();if(audioCtx&&!muted)audioCtx.resume().catch(()=>{});}
  ['pointerdown','touchstart','keydown'].forEach(type=>document.addEventListener(type,unlockAudio,{once:true,passive:type!=='keydown'}));
  soundBtn.addEventListener('click',()=>{
    muted=!muted;userUnlocked=true;
    try{localStorage.setItem(muteKey,muted?'1':'0')}catch(_){ }
    if(!started&&!muted)startAmbient();
    if(audioCtx&&master){const t=audioCtx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setTargetAtTime(muted?0:.014,t,.08);if(!muted)audioCtx.resume().catch(()=>{});}
    updateSoundButton();
  });
  document.addEventListener('visibilitychange',()=>{if(!audioCtx)return;if(document.hidden)audioCtx.suspend().catch(()=>{});else if(!muted&&userUnlocked)audioCtx.resume().catch(()=>{});});
  updateSoundButton();

  document.documentElement.dataset.msGlobalUi=VERSION;
})();