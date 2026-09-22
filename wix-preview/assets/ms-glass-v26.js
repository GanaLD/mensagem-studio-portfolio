(()=>{
  if(window.__MS_GLASS_BUTTON_V3__) return;
  window.__MS_GLASS_BUTTON_V3__=true;

  const selector=[
    '.cta-row .btn',
    '.btn',
    '.cart',
    '.add',
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

  const protectedControl=el=>!!(
    el.closest('#msSectionNav')||
    el.closest('#ms-rubber-topnav-root')||
    el.closest('.rubber-segment')||
    el.classList.contains('ms-universal-menu-btn')||
    el.classList.contains('ms-contact-close')||
    el.classList.contains('ms-sound-toggle')||
    el.classList.contains('ms3d-edge')
  );

  const arrowOnly=value=>/^[\s↗↘↙↖↑↓→←⟶⟵›»]+$/.test((value||'').trim());

  function bindLight(el){
    if(el.dataset.msButtonLight==='1')return;
    el.dataset.msButtonLight='1';

    const move=event=>{
      const rect=el.getBoundingClientRect();
      if(!rect.width||!rect.height)return;
      const x=Math.max(0,Math.min(100,((event.clientX-rect.left)/rect.width)*100));
      const y=Math.max(0,Math.min(100,((event.clientY-rect.top)/rect.height)*100));
      el.style.setProperty('--ms-light-x',x.toFixed(2)+'%');
      el.style.setProperty('--ms-light-y',y.toFixed(2)+'%');
    };
    const reset=()=>{
      el.style.setProperty('--ms-light-x','50%');
      el.style.setProperty('--ms-light-y','50%');
    };

    el.addEventListener('pointermove',move,{passive:true});
    el.addEventListener('pointerleave',reset,{passive:true});
  }

  function apply(el){
    if(!el||protectedControl(el))return;
    el.classList.add('ms-glass-v26');
    bindLight(el);

    [...el.childNodes].forEach(node=>{
      if(node.nodeType===Node.TEXT_NODE&&/[↗↘↙↖↑↓→←⟶⟵]/.test(node.nodeValue||'')){
        node.nodeValue=(node.nodeValue||'').replace(/[↗↘↙↖↑↓→←⟶⟵]/g,'').replace(/\s{2,}/g,' ');
      }
    });
    el.querySelectorAll('b,span,i').forEach(child=>{
      if(arrowOnly(child.textContent)){
        child.classList.add('ms-glass-v26-arrow');
        child.setAttribute('aria-hidden','true');
      }
    });
  }

  function scan(root=document){
    if(root.matches?.(selector))apply(root);
    root.querySelectorAll?.(selector).forEach(apply);
  }

  scan();

  const observer=new MutationObserver(records=>{
    records.forEach(record=>record.addedNodes.forEach(node=>{
      if(node.nodeType===Node.ELEMENT_NODE)scan(node);
    }));
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  addEventListener('pagehide',()=>observer.disconnect(),{once:true});
})();