(()=>{
  if(window.__MS_CAROUSEL_GLASS_BUTTONS_V2__) return;
  window.__MS_CAROUSEL_GLASS_BUTTONS_V2__=true;

  const selector=[
    ".cta-row .btn",
    "#pdfTabs > button",
    "#modelTabs > button",
    "#ytTabs > button",
    ".ms-brief-action",
    ".ms-footer-link",
    "#backgroundSwitcher",
    ".add",
    ".send",
    ".close",
    ".qty button",
    ".category-case",
    ".ms-menu-quote",
    ".ms-quote-fab",
    ".ms-glass-cta",
    ".cristo-v4-btn",
    "button[type='submit']",
    "[data-ms-metal-target='1']"
  ].join(",");

  const arrowOnly=value=>/^[\s↗↘↙↖↑↓→←⟶⟵↔›»]+$/.test((value||"").trim());

  function isProtected(el){
    return !!(
      el.closest("#msSectionNav") ||
      el.closest("#ms-rubber-topnav-root") ||
      el.closest(".rubber-segment") ||
      el.closest(".ms3d-shell") ||
      el.classList.contains("ms-universal-menu-btn") ||
      el.classList.contains("ms-contact-close") ||
      el.classList.contains("ms-sound-toggle") ||
      el.classList.contains("ms-sound-more") ||
      el.classList.contains("ms3d-edge")
    );
  }

  function stripOldVisuals(el){
    el.classList.remove(
      "ms-glass-v26",
      "ms-liquid-glass",
      "ms-liquid-shader",
      "ms-liquid-shader-card",
      "ms-metal-button",
      "ms-metal-host"
    );
    el.querySelectorAll(
      ":scope > .ms-glass-light-fill,:scope > .ms-glass-edge-light,:scope > .ms-liquid-shader-canvas,:scope > .ms-metal-fx-canvas"
    ).forEach(node=>node.remove());
  }

  function stripArrows(el){
    [...el.childNodes].forEach(node=>{
      if(node.nodeType===Node.TEXT_NODE&&/[↗↘↙↖↑↓→←⟶⟵↔]/.test(node.nodeValue||"")){
        node.nodeValue=(node.nodeValue||"")
          .replace(/[↗↘↙↖↑↓→←⟶⟵↔]/g,"")
          .replace(/\s{2,}/g," ");
      }
    });
    el.querySelectorAll("b,span,i").forEach(child=>{
      if(arrowOnly(child.textContent)){
        child.classList.add("ms-carousel-glass-arrow-hidden");
        child.setAttribute("aria-hidden","true");
      }
    });
  }

  function bindPointer(el){
    if(el.dataset.msCarouselGlassV2==="1") return;
    el.dataset.msCarouselGlassV2="1";

    const move=event=>{
      const rect=el.getBoundingClientRect();
      if(!rect.width||!rect.height) return;

      const lx=event.clientX-rect.left;
      const ly=event.clientY-rect.top;
      const xp=Math.max(0,Math.min(100,(lx/rect.width)*100));
      const yp=Math.max(0,Math.min(100,(ly/rect.height)*100));

      const dx=lx-(rect.width/2);
      const dy=ly-(rect.height/2);
      let angle=Math.atan2(dy,dx)*(180/Math.PI)+90;
      if(angle<0) angle+=360;

      el.style.setProperty("--ms-btn-x",xp.toFixed(2)+"%");
      el.style.setProperty("--ms-btn-y",yp.toFixed(2)+"%");
      el.style.setProperty("--ms-btn-angle",angle.toFixed(2)+"deg");
    };

    const leave=()=>{
      el.style.setProperty("--ms-btn-x","50%");
      el.style.setProperty("--ms-btn-y","50%");
    };

    el.addEventListener("pointermove",move,{passive:true});
    el.addEventListener("pointerleave",leave,{passive:true});
  }

  function apply(el){
    if(!el||isProtected(el)) return;
    stripOldVisuals(el);
    stripArrows(el);
    el.classList.add("ms-carousel-glass-btn");
    bindPointer(el);
  }

  function scan(root=document){
    if(root.matches?.(selector)) apply(root);
    root.querySelectorAll?.(selector).forEach(apply);
  }

  function removeDuplicateHeroLabel(){
    if(!matchMedia('(max-width:760px)').matches) return;
    document.querySelectorAll(
      '#msUnifiedHeroStage .video-scroll-label,#hero .video-scroll-label,.cena-hero-shared-ui .video-scroll-label'
    ).forEach(el=>el.remove());
  }

  function installMobileHeroVideoScrollControl(){
    if(window.__MS_MOBILE_HERO_VIDEO_SCROLL_CONTROL_V5__) return;
    if(!matchMedia('(max-width:760px)').matches) return;

    const hero=document.getElementById('hero');
    const original=document.getElementById('heroVideo');
    if(!hero||!original||!original.parentNode) return;

    window.__MS_MOBILE_HERO_VIDEO_SCROLL_CONTROL_V5__=true;

    /*
      Mobile HeroScroll uses a dedicated media node so the old inline scrub queue
      cannot compete with the current frame. The source asset is encoded with dense
      keyframes; this controller sends only the newest requested position.
    */
    const video=original.cloneNode(true);
    video.muted=true;
    video.defaultMuted=true;
    video.playsInline=true;
    video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline','');
    video.preload='auto';

    const rawSrc=original.getAttribute('src')||original.currentSrc||'';
    if(rawSrc){
      try{
        const url=new URL(rawSrc,location.href);
        url.searchParams.set('v','20260928-keyframe-scrub-v5');
        video.setAttribute('src',url.href);
      }catch(_){
        video.setAttribute('src',rawSrc+(rawSrc.includes('?')?'&':'?')+'v=20260928-keyframe-scrub-v5');
      }
    }

    original.replaceWith(video);

    const VIDEO_END=.465;
    const SEEK_INTERVAL=42;
    const SEEK_EPSILON=.018;
    const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));

    let stableViewportHeight=0;
    let stableViewportWidth=innerWidth;
    let ready=false;
    let targetTime=0;
    let scrollRaf=0;
    let monitorRaf=0;
    let pendingSeek=false;
    let seekTimer=0;
    let nextSeekAt=0;
    let priming=false;
    let unlocked=false;
    let lastScrollY=-1;

    const measureStableViewport=()=>{
      if(window.CSS?.supports?.('height','100svh')){
        const probe=document.createElement('div');
        probe.style.cssText='position:fixed;left:-9999px;top:0;width:1px;height:100svh;visibility:hidden;pointer-events:none';
        document.body.appendChild(probe);
        const measured=Math.round(probe.getBoundingClientRect().height||0);
        probe.remove();
        if(measured>0)return measured;
      }
      return Math.round(innerHeight);
    };

    const refreshStableViewport=(force=false)=>{
      const widthChanged=Math.abs(innerWidth-stableViewportWidth)>24;
      if(force||!stableViewportHeight||widthChanged){
        stableViewportWidth=innerWidth;
        stableViewportHeight=measureStableViewport();
      }
    };

    const progressFromScroll=()=>{
      refreshStableViewport(false);
      const range=Math.max(1,hero.offsetHeight-stableViewportHeight);
      const heroProgress=clamp((scrollY-hero.offsetTop)/range);
      return clamp(heroProgress/VIDEO_END);
    };

    const updateTarget=()=>{
      if(!ready)return;
      targetTime=progressFromScroll()*Math.max(.01,video.duration-.025);
    };

    const flushSeek=(force=false)=>{
      if(!ready)return;
      updateTarget();

      if(video.seeking&&!force){
        pendingSeek=true;
        return;
      }

      const delta=Math.abs(video.currentTime-targetTime);
      if(!force&&delta<SEEK_EPSILON){
        pendingSeek=false;
        return;
      }

      const now=performance.now();
      const wait=nextSeekAt-now;
      if(!force&&wait>0){
        pendingSeek=true;
        if(!seekTimer){
          seekTimer=setTimeout(()=>{
            seekTimer=0;
            flushSeek(false);
          },Math.ceil(wait));
        }
        return;
      }

      pendingSeek=false;
      nextSeekAt=now+SEEK_INTERVAL;
      try{video.currentTime=targetTime}catch(_){pendingSeek=true}
    };

    const syncFromScroll=()=>{
      scrollRaf=0;
      flushSeek(false);
    };

    const scheduleSync=()=>{
      if(!scrollRaf)scrollRaf=requestAnimationFrame(syncFromScroll);
    };

    const monitorScroll=()=>{
      monitorRaf=0;
      const y=scrollY;
      const start=hero.offsetTop-stableViewportHeight;
      const end=hero.offsetTop+hero.offsetHeight;
      if(y>=start&&y<=end){
        if(Math.abs(y-lastScrollY)>.5){
          lastScrollY=y;
          scheduleSync();
        }
        monitorRaf=requestAnimationFrame(monitorScroll);
      }
    };

    const startMonitor=()=>{
      refreshStableViewport(false);
      if(!monitorRaf)monitorRaf=requestAnimationFrame(monitorScroll);
    };

    const prime=()=>{
      if(unlocked||priming)return;
      priming=true;
      video.muted=true;
      video.defaultMuted=true;
      video.playsInline=true;

      let playPromise;
      try{playPromise=video.play()}catch(_){playPromise=null}

      const finish=()=>{
        try{video.pause()}catch(_){}
        priming=false;
        unlocked=true;
        ready=Number.isFinite(video.duration)&&video.duration>0;
        if(ready)flushSeek(true);
      };

      if(playPromise&&typeof playPromise.then==='function'){
        playPromise.then(finish).catch(()=>{
          priming=false;
          ready=Number.isFinite(video.duration)&&video.duration>0;
          scheduleSync();
        });
      }else finish();
    };

    video.addEventListener('loadedmetadata',()=>{
      ready=Number.isFinite(video.duration)&&video.duration>0;
      if(ready)flushSeek(true);
    });
    video.addEventListener('durationchange',()=>{
      ready=Number.isFinite(video.duration)&&video.duration>0;
      scheduleSync();
    });
    video.addEventListener('canplay',()=>{
      ready=Number.isFinite(video.duration)&&video.duration>0;
      scheduleSync();
    });
    video.addEventListener('seeked',()=>{
      if(pendingSeek||Math.abs(video.currentTime-targetTime)>SEEK_EPSILON)flushSeek(false);
    });
    video.addEventListener('play',()=>{
      if(!priming){try{video.pause()}catch(_){}}
    });

    addEventListener('scroll',()=>{scheduleSync();startMonitor()},{passive:true});
    addEventListener('resize',()=>{
      refreshStableViewport(false);
      scheduleSync();
      startMonitor();
    },{passive:true});
    addEventListener('orientationchange',()=>setTimeout(()=>{
      refreshStableViewport(true);
      scheduleSync();
      startMonitor();
    },140),{passive:true});

    addEventListener('touchstart',prime,{once:true,passive:true});
    addEventListener('pointerdown',prime,{once:true,passive:true});

    refreshStableViewport(true);
    try{video.load()}catch(_){}
    prime();
    scheduleSync();
    startMonitor();
  }

  scan();
  removeDuplicateHeroLabel();
  installMobileHeroVideoScrollControl();

  const observer=new MutationObserver(records=>{
    for(const record of records){
      for(const node of record.addedNodes){
        if(node.nodeType===Node.ELEMENT_NODE) scan(node);
      }
    }
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  addEventListener('pagehide',()=>observer.disconnect(),{once:true});
})();
