(()=>{ 
  if(window.__MS_GLASS_V26__) return;
  window.__MS_GLASS_V26__=true;

  const preview=location.pathname.startsWith('/wix-preview/');
  const root=preview?'/wix-preview/':'/';
  const servicesUrl=root+'servicos/';
  const quoteUrl=servicesUrl+'#orcamento';

  const selector=[
    '.cta-row .btn',
    '.btn',
    '.cart',
    '.add',
    '.cristo-v4-btn',
    '.ms-brief-action',
    '.ms-footer-link',
    '.ms-footer-links .bg-switcher button',
    '.ms-menu-quote',
    '.ms-glass-cta',
    '.send',
    'button[type="submit"]',
    '.stage-side button'
  ].join(',');

  const isProtected=el=>!!(
    el.closest('#msSectionNav')||
    el.closest('#ms-rubber-topnav-root')||
    el.closest('.rubber-segment')||
    el.classList.contains('ms-universal-menu-btn')||
    el.classList.contains('ms-contact-close')||
    el.classList.contains('ms-sound-toggle')||
    el.classList.contains('ms3d-edge')
  );

  const isArrowOnly=v=>/^[\s↗↘↙↖↑↓→←⟶⟵›»]+$/.test((v||'').trim());

  function styleOne(el){
    if(!el||isProtected(el)) return;
    el.classList.add('ms-glass-v26');
    [...el.childNodes].forEach(node=>{
      if(node.nodeType===Node.TEXT_NODE && /[↗↘↙↖↑↓→←⟶⟵]/.test(node.nodeValue||'')){
        node.nodeValue=(node.nodeValue||'').replace(/[↗↘↙↖↑↓→←⟶⟵]/g,'').replace(/\s{2,}/g,' ');
      }
    });
    el.querySelectorAll('b,span,i').forEach(child=>{
      if(isArrowOnly(child.textContent)){
        child.classList.add('ms-glass-v26-arrow');
        child.setAttribute('aria-hidden','true');
      }
    });
  }

  function scan(rootNode=document){
    if(rootNode.matches?.(selector)) styleOne(rootNode);
    rootNode.querySelectorAll?.(selector).forEach(styleOne);
  }

  function ensureBudget(){
    let btn=document.querySelector('.ms-quote-fab');
    if(!btn){
      btn=document.createElement('a');
      btn.id='msQuoteFabCritical';
      btn.className='ms-quote-fab ms-quote-link ms-glass-v26';
      btn.href=quoteUrl;
      btn.setAttribute('aria-label','Abrir orçamento');
      btn.innerHTML='<span class="ms-quote-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H7.2"/><circle cx="9.5" cy="19" r="1.25"/><circle cx="17.5" cy="19" r="1.25"/></svg></span><span class="ms-quote-label">ORÇAMENTO</span>';
      document.body.appendChild(btn);
    }
    btn.hidden=false;
    btn.removeAttribute('hidden');
    btn.removeAttribute('aria-hidden');
    btn.style.setProperty('display','inline-flex','important');
    btn.style.setProperty('visibility','visible','important');
    btn.style.setProperty('opacity','1','important');
    btn.classList.remove('is-compact');
    btn.classList.add('ms-glass-v26');

    if(btn.dataset.msCriticalQuoteBound!=='1'){
      btn.dataset.msCriticalQuoteBound='1';
      btn.addEventListener('click',event=>{
        if(location.pathname.includes('/servicos/')){
          const cart=document.getElementById('cartBtn');
          if(cart){
            event.preventDefault();
            cart.click();
            if(location.hash!=='#orcamento') history.replaceState(null,'',location.pathname+location.search+'#orcamento');
          }
        }
      });
    }
  }

  function init(){
    scan();
    ensureBudget();
    const observer=new MutationObserver(records=>{
      records.forEach(record=>record.addedNodes.forEach(node=>{
        if(node.nodeType===Node.ELEMENT_NODE){
          scan(node);
          if(node.matches?.('.ms-quote-fab')||node.querySelector?.('.ms-quote-fab')) ensureBudget();
        }
      }));
    });
    observer.observe(document.documentElement,{childList:true,subtree:true});
    window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
    setTimeout(ensureBudget,250);
    setTimeout(ensureBudget,1000);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();