import {
  createInstance,
  destroyInstance,
  updateInstance,
  setSharedPreset
} from "https://cdn.jsdelivr.net/npm/metal-fx@1.0.4/+esm";

(()=>{
  if(window.__MS_METAL_BUTTON_V1__) return;
  window.__MS_METAL_BUTTON_V1__=true;

  // Exact MetalButton defaults requested by the user:
  // variant="button" -> kind="pill", preset="chromatic", strength=1.
  setSharedPreset("chromatic","dark");

  const instances=new Map();

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
    "button[type='submit']"
  ].join(",");

  const protectedControl=el=>!!(
    el.closest("#msSectionNav")||
    el.closest("#ms-rubber-topnav-root")||
    el.closest(".rubber-segment")||
    el.closest("#msServicesDeck")||
    el.classList.contains("ms-universal-menu-btn")||
    el.classList.contains("ms-contact-close")||
    el.classList.contains("ms-sound-toggle")||
    el.classList.contains("ms3d-edge")
  );

  const arrowOnly=value=>/^[\s↗↘↙↖↑↓→←⟶⟵↔›»]+$/.test((value||"").trim());

  function removeLegacyGlass(el){
    el.classList.remove(
      "ms-glass-v26",
      "ms-liquid-glass",
      "ms-liquid-shader",
      "ms-liquid-shader-card"
    );
    el.querySelectorAll(
      ":scope > .ms-glass-light-fill,:scope > .ms-glass-edge-light,:scope > .ms-liquid-shader-canvas"
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
    el.querySelectorAll(":scope > b,:scope > span,:scope > i").forEach(child=>{
      if(arrowOnly(child.textContent)){
        child.classList.add("ms-metal-arrow-hidden");
        child.setAttribute("aria-hidden","true");
      }
    });
  }

  function measure(el){
    const rect=el.getBoundingClientRect();
    const cssWidth=Math.max(1,Math.round(rect.width));
    const cssHeight=Math.max(1,Math.round(rect.height));
    const cornerRadius=Math.min(cssHeight/2,cssWidth/2);
    return {cssWidth,cssHeight,cornerRadius};
  }

  function mount(el){
    if(!el||protectedControl(el)||instances.has(el)) return;

    removeLegacyGlass(el);
    stripArrowGlyphs(el);
    el.classList.add("ms-metal-button");
    el.dataset.msMetalButton="1";

    const canvas=document.createElement("canvas");
    canvas.className="ms-metal-fx-canvas";
    canvas.setAttribute("aria-hidden","true");
    el.prepend(canvas);

    const initial=measure(el);

    let instance;
    try{
      instance=createInstance({
        hostCanvas:canvas,
        cssWidth:initial.cssWidth,
        cssHeight:initial.cssHeight,
        cornerRadius:initial.cornerRadius,
        kind:"pill",
        shaderScale:1.6,
        ringCssPx:1,
        opacityMul:1,
        paused:false,
        scale:1
      });
    }catch(error){
      console.error("[Mensagem Studio / MetalButton] metal-fx unavailable",error);
      canvas.remove();
      return;
    }

    const state={instance,canvas,resizeObserver:null,intersectionObserver:null};
    instances.set(el,state);

    const resizeObserver=new ResizeObserver(()=>{
      const next=measure(el);
      updateInstance(instance,{
        cssWidth:next.cssWidth,
        cssHeight:next.cssHeight,
        cornerRadius:next.cornerRadius,
        kind:"pill",
        shaderScale:1.6,
        ringCssPx:1,
        opacityMul:1,
        scale:1
      });
    });
    resizeObserver.observe(el);
    state.resizeObserver=resizeObserver;

    if("IntersectionObserver" in window){
      const intersectionObserver=new IntersectionObserver(entries=>{
        const visible=entries.some(entry=>entry.isIntersecting);
        updateInstance(instance,{paused:!visible});
      },{rootMargin:"64px"});
      intersectionObserver.observe(el);
      state.intersectionObserver=intersectionObserver;
    }
  }

  function scan(root=document){
    if(root.matches?.(selector)) mount(root);
    root.querySelectorAll?.(selector).forEach(mount);
  }

  function cleanupRemoved(){
    for(const [el,state] of instances){
      if(el.isConnected) continue;
      state.resizeObserver?.disconnect();
      state.intersectionObserver?.disconnect();
      try{destroyInstance(state.instance)}catch(_){}
      instances.delete(el);
    }
  }

  scan();

  const observer=new MutationObserver(records=>{
    let shouldCleanup=false;
    records.forEach(record=>{
      record.addedNodes.forEach(node=>{
        if(node.nodeType===Node.ELEMENT_NODE) scan(node);
      });
      if(record.removedNodes.length) shouldCleanup=true;
    });
    if(shouldCleanup) cleanupRemoved();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});

  addEventListener("pagehide",()=>{
    observer.disconnect();
    for(const state of instances.values()){
      state.resizeObserver?.disconnect();
      state.intersectionObserver?.disconnect();
      try{destroyInstance(state.instance)}catch(_){}
    }
    instances.clear();
  },{once:true});
})();