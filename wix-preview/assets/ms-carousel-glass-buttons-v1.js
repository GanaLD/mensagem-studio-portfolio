(()=>{
  if(window.__MS_CAROUSEL_GLASS_BUTTONS_V1__) return;
  window.__MS_CAROUSEL_GLASS_BUTTONS_V1__=true;

  /* Exactly the action controls already indicated in the screenshots/conversation.
     Do not widen this to generic site UI. */
  const selector=[
    ".cta-row .btn",
    "#pdfTabs > button",
    "#modelTabs > button",
    "#ytTabs > button",
    ".ms-brief-action",
    ".ms-footer-link",
    "#backgroundSwitcher",
    ".add",
    ".ms-menu-quote",
    ".ms-quote-fab",
    ".ms-glass-cta",
    ".send",
    ".cristo-v4-btn",
    "button[type='submit']",
    "[data-ms-metal-target='1']"
  ].join(",");

  const protectedControl=el=>!!(
    el.closest("#msSectionNav")||
    el.closest("#ms-rubber-topnav-root")||
    el.closest(".rubber-segment")||
    el.closest("#msServicesDeck")||
    el.classList.contains("ms-universal-menu-btn")||
    el.classList.contains("ms-contact-close")||
    el.classList.contains("ms-sound-toggle")||
    el.classList.contains("ms-sound-more")||
    el.classList.contains("ms3d-edge")
  );

  const arrowOnly=value=>/^[\s↗↘↙↖↑↓→←⟶⟵↔›»]+$/.test((value||"").trim());

  /* If a stale MetalFx session exists before refresh, unwrap the ORIGINAL control
     and remove only the generated wrapper. This restores its original layout. */
  function unwrapOldMetal(){
    document.querySelectorAll(".ms-metal-react-mount").forEach(mount=>{
      const host=mount.querySelector(".ms-metal-host");
      if(host){
        mount.before(host);
        host.classList.remove("ms-metal-host");
        delete host.dataset.msMetalAdopted;
      }
      mount.remove();
    });
  }

  function removeOldVisualClasses(el){
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

  function stripArrowGlyphs(el){
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

  function bindPointerGlow(el){
    if(el.dataset.msCarouselGlowBound==="1") return;
    el.dataset.msCarouselGlowBound="1";

    const update=event=>{
      const rect=el.getBoundingClientRect();
      if(!rect.width||!rect.height) return;

      const localX=event.clientX-rect.left;
      const localY=event.clientY-rect.top;
      const xPct=Math.max(0,Math.min(100,(localX/rect.width)*100));
      const yPct=Math.max(0,Math.min(100,(localY/rect.height)*100));

      const cx=rect.width/2;
      const cy=rect.height/2;
      const dx=localX-cx;
      const dy=localY-cy;

      let horizontal=Infinity;
      let vertical=Infinity;
      if(dx!==0) horizontal=cx/Math.abs(dx);
      if(dy!==0) vertical=cy/Math.abs(dy);
      const proximity=Math.min(Math.max(1/Math.min(horizontal,vertical),0),1);

      let angle=Math.atan2(dy,dx)*(180/Math.PI)+90;
      if(angle<0) angle+=360;

      el.style.setProperty("--ms-btn-x",xPct.toFixed(2)+"%");
      el.style.setProperty("--ms-btn-y",yPct.toFixed(2)+"%");
      el.style.setProperty("--ms-btn-angle",angle.toFixed(2)+"deg");
      el.style.setProperty("--ms-btn-glow",Math.max(.18,proximity).toFixed(3));
    };

    const leave=()=>{
      el.style.setProperty("--ms-btn-glow","0");
      el.style.setProperty("--ms-btn-x","50%");
      el.style.setProperty("--ms-btn-y","50%");
    };

    el.addEventListener("pointermove",update,{passive:true});
    el.addEventListener("pointerleave",leave,{passive:true});
  }

  function apply(el){
    if(!el||protectedControl(el)) return;

    removeOldVisualClasses(el);
    stripArrowGlyphs(el);

    el.classList.add("ms-carousel-glass-btn");
    bindPointerGlow(el);
  }

  function scan(root=document){
    if(root.matches?.(selector)) apply(root);
    root.querySelectorAll?.(selector).forEach(apply);
  }

  unwrapOldMetal();
  scan();

  const observer=new MutationObserver(records=>{
    let unwrap=false;
    for(const record of records){
      for(const node of record.addedNodes){
        if(node.nodeType!==Node.ELEMENT_NODE) continue;
        if(node.matches?.(".ms-metal-react-mount")||node.querySelector?.(".ms-metal-react-mount")) unwrap=true;
        scan(node);
      }
    }
    if(unwrap){
      unwrapOldMetal();
      scan();
    }
  });

  observer.observe(document.documentElement,{childList:true,subtree:true});
  addEventListener("pagehide",()=>observer.disconnect(),{once:true});
})();