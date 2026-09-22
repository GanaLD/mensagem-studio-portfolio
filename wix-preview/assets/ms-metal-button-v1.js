import React, { useLayoutEffect, useRef } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import { MetalFx } from "https://esm.sh/metal-fx@1.0.4?deps=react@18.3.1,react-dom@18.3.1";

(()=>{
  if(window.__MS_REAL_METAL_BUTTON_ADAPTER__) return;
  window.__MS_REAL_METAL_BUTTON_ADAPTER__=true;

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

  const mounted=new WeakMap();

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

  const isFullWidth=el=>!!(
    el.matches("#pdfTabs > button,#modelTabs > button,#ytTabs > button,.add,.ms-brief-action,.ms-menu-quote,.ms-footer-link")
  );

  const arrowOnly=value=>/^[\s↗↘↙↖↑↓→←⟶⟵↔›»]+$/.test((value||"").trim());

  function cleanHost(el){
    el.classList.remove(
      "ms-glass-v26",
      "ms-liquid-glass",
      "ms-liquid-shader",
      "ms-liquid-shader-card",
      "ms-metal-button"
    );

    el.querySelectorAll(
      ":scope > .ms-glass-light-fill,:scope > .ms-glass-edge-light,:scope > .ms-liquid-shader-canvas,:scope > .ms-metal-fx-canvas"
    ).forEach(node=>node.remove());

    [...el.childNodes].forEach(node=>{
      if(node.nodeType===Node.TEXT_NODE&&/[↗↘↙↖↑↓→←⟶⟵↔]/.test(node.nodeValue||"")){
        node.nodeValue=(node.nodeValue||"")
          .replace(/[↗↘↙↖↑↓→←⟶⟵↔]/g,"")
          .replace(/\s{2,}/g," ");
      }
    });

    el.querySelectorAll("b,span,i").forEach(child=>{
      if(arrowOnly(child.textContent)){
        child.classList.add("ms-metal-arrow-hidden");
        child.setAttribute("aria-hidden","true");
      }
    });

    el.classList.add("ms-metal-host");
    el.dataset.msMetalAdopted="1";
  }

  function AdoptExistingControl({element}){
    const holderRef=useRef(null);

    useLayoutEffect(()=>{
      const holder=holderRef.current;
      if(!holder) return;
      holder.appendChild(element);
    },[element]);

    return React.createElement(
      MetalFx,
      {
        variant:"button",
        preset:"chromatic",
        theme:"dark",
        strength:1,
        paused:false,
        normalizeHostStyles:true,
        className:"ms-metal-wrapper"
      },
      React.createElement("span",{
        ref:holderRef,
        className:"ms-metal-holder"
      })
    );
  }

  function mount(el){
    if(!el||protectedControl(el)||mounted.has(el)||el.dataset.msMetalAdopted==="1") return;

    cleanHost(el);

    const mount=document.createElement("span");
    mount.className="ms-metal-react-mount";
    if(isFullWidth(el)) mount.classList.add("is-full");
    if(el.classList.contains("ms-quote-fab")) mount.classList.add("is-quote");

    el.before(mount);

    const root=createRoot(mount);
    root.render(React.createElement(AdoptExistingControl,{element:el}));

    mounted.set(el,{root,mount});
  }

  function scan(root=document){
    if(root.matches?.(selector)) mount(root);
    root.querySelectorAll?.(selector).forEach(mount);
  }

  scan();

  const observer=new MutationObserver(records=>{
    for(const record of records){
      for(const node of record.addedNodes){
        if(node.nodeType===Node.ELEMENT_NODE && !node.closest?.(".metal-fx-root")){
          scan(node);
        }
      }
    }
  });

  observer.observe(document.documentElement,{childList:true,subtree:true});

  addEventListener("pagehide",()=>{
    observer.disconnect();
  },{once:true});
})();