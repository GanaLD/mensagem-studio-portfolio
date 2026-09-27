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

  scan();

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