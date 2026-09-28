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

  function installMobileHeroVideoScrollControl(){
    if(window.__MS_MOBILE_HERO_VIDEO_SCROLL_CONTROL_V4__) return;
    if(!matchMedia('(max-width:760px)').matches) return;

    const hero=document.getElementById('hero');
    const original=document.getElementById('heroVideo');
    if(!hero||!original||!original.parentNode) return;

    window.__MS_MOBILE_HERO_VIDEO_SCROLL_CONTROL_V4__=true;

    /*
      The original inline controller keeps its own private scrub queue. On mobile
      that queue can continue seeking stale frames after the finger has already
      moved. Replacing only the media element leaves the approved Hero 1/Hero 2
      integration untouched while giving mobile a single authoritative video
      controller. Event listeners attached to the old node are intentionally not
      copied by cloneNode().
    */
    const video=original.cloneNode(true);
    video.muted=true;
    video.defaultMuted=true;
    video.playsInline=true;
    video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline','');
    video.preload='auto';
    original.replaceWith(video);

    const VIDEO_END=.465;
    const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
    let ready=Number.isFinite(video.duration)&&video.duration>0;
    let targetTime=0;
    let scrollRaf=0;
    let pendingSeek=false;
    let priming=false;
    let unlocked=false;

    const viewportHeight=()=>{
      const vv=window.visualViewport;
      return Math.max(1,Math.round(vv?.height||innerHeight));
    };

    const progressFromScroll=()=>{
      const vh=viewportHeight();
      const range=Math.max(1,hero.offsetHeight-vh);
      const heroProgress=clamp((scrollY-hero.offsetTop)/range);
      return clamp(heroProgress/VIDEO_END);
    };

    const updateTarget=()=>{
      if(!ready)return;
      targetTime=progressFromScroll()*Math.max(.01,video.duration-.045);
    };

    const seekLatest=(force=false)=>{
      if(!ready)return;
      updateTarget();
      if(video.seeking&&!force){
        pendingSeek=true;
        return;
      }
      const delta=Math.abs(video.currentTime-targetTime);
      if(!force&&delta<.012)return;
      pendingSeek=false;
      try{video.currentTime=targetTime}catch(_){pendingSeek=true}
    };

    const syncFromScroll=()=>{
      scrollRaf=0;
      seekLatest(false);
    };

    const scheduleSync=()=>{
      if(!scrollRaf)scrollRaf=requestAnimationFrame(syncFromScroll);
    };

    const prime=()=>{
      if(unlocked||priming)return;
      priming=true;
      video.muted=true;
      video.defaultMuted=true;
      video.playsInline=true;
      try{video.load()}catch(_){}
      let playPromise;
      try{playPromise=video.play()}catch(_){playPromise=null}
      const finish=()=>{
        try{video.pause()}catch(_){}
        priming=false;
        unlocked=true;
        ready=Number.isFinite(video.duration)&&video.duration>0;
        seekLatest(true);
      };
      if(playPromise&&typeof playPromise.then==='function')playPromise.then(finish).catch(()=>{
        priming=false;
        scheduleSync();
      });
      else finish();
    };

    video.addEventListener('loadedmetadata',()=>{
      ready=Number.isFinite(video.duration)&&video.duration>0;
      seekLatest(true);
    });
    video.addEventListener('durationchange',()=>{
      ready=Number.isFinite(video.duration)&&video.duration>0;
      scheduleSync();
    });
    video.addEventListener('seeked',()=>{
      if(pendingSeek||Math.abs(video.currentTime-targetTime)>.018)seekLatest(false);
    });
    video.addEventListener('play',()=>{
      if(!priming){try{video.pause()}catch(_){}}
    });

    addEventListener('scroll',scheduleSync,{passive:true});
    addEventListener('resize',scheduleSync,{passive:true});
    addEventListener('orientationchange',()=>setTimeout(scheduleSync,120),{passive:true});

    /* Never consume the only user gesture just because metadata was late. */
    addEventListener('touchstart',prime,{passive:true});
    addEventListener('pointerdown',prime,{passive:true});

    /* Muted inline video can normally be primed immediately on modern mobile. */
    prime();
    scheduleSync();
  }

  scan();
  installMobileHeroVideoScrollControl();

  const observer=new MutationObserver(records=>{
    for(const record of records){
      for(const node of record.addedNodes){
        if(node.nodeType===Node.ELEMENT_NODE) scan(node);
      }
    }
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  addEventListener("pagehide",()=>observer.disconnect(),{once:true});
})();