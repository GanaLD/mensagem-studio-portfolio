// Contextual cross-sell suggestions for the Services quote drawer.
(() => {
  if (window.__MS_CART_SUGGESTIONS_V1__) return;
  window.__MS_CART_SUGGESTIONS_V1__ = true;

  const drawer=document.querySelector('#drawer'),items=document.querySelector('#items'),catalog=document.querySelector('#catalog');
  if(!drawer||!items||!catalog)return;

  const style=document.createElement('style');
  style.textContent=`
    .ms-cart-suggestions{margin:20px 0 4px;padding:18px;border:1px solid rgba(47,213,154,.20);border-radius:16px;background:linear-gradient(145deg,rgba(47,213,154,.07),rgba(255,255,255,.02))}
    .ms-cart-suggestions-head{display:flex;justify-content:space-between;gap:14px;align-items:end;margin-bottom:12px}.ms-cart-suggestions-head strong{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#e9fff6}.ms-cart-suggestions-head small{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#2fd59a}
    .ms-cart-suggestion-list{display:grid;gap:8px}.ms-cart-suggestion{width:100%;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:center;text-align:left;padding:12px 13px;border:1px solid rgba(255,255,255,.10);border-radius:12px;background:rgba(255,255,255,.035);color:#f7f9fc;cursor:pointer;transition:.18s ease}.ms-cart-suggestion:hover,.ms-cart-suggestion:focus-visible{outline:none;border-color:rgba(47,213,154,.55);background:rgba(47,213,154,.08);transform:translateX(2px)}.ms-cart-suggestion span{min-width:0;font-size:12px;line-height:1.3}.ms-cart-suggestion b{font-size:18px;color:#2fd59a;font-weight:500}.ms-cart-suggestions-empty{font-size:11px;line-height:1.5;color:#84909d}
  `;
  document.head.appendChild(style);

  const FALLBACK=['Motion + VFX','Key visual de campanha','Modelo 3D Produto','Pacote com 20 fotos','Edição de vídeo PRO','Manual essencial'];
  const CROSS={
    'Social Media':['Reel com motion, legendas e efeitos','Key visual de campanha','Motion + VFX'],
    'Vídeo':['Motion + VFX','Diária de serviços para audiovisual','Key visual de campanha'],
    'Produção':['Edição de vídeo PRO','Pacote com 20 fotos','Motion + VFX'],
    'Motion e VFX':['Edição de vídeo PRO','Key visual de campanha','Animação de logotipo'],
    'Fotos':['Kit visual para marketplace','Composição publicitária','Banner para loja ou coleção'],
    'Manipulação':['Key visual de campanha','Manual essencial','Carrossel com até 5 páginas'],
    'Identidade':['Key visual de campanha','Pacote com 10 criativos','Animação de logotipo'],
    'Campanhas':['Motion + VFX','Pacote com 10 criativos','Edição de vídeo PRO'],
    'E-commerce':['Pacote com 20 fotos','Modelo 3D Produto','Banner para loja ou coleção'],
    'Narrativa Visual':['Storyboard com até 8 quadros','Edição de vídeo PRO','Motion + VFX'],
    '3D':['Produto + vídeo render animado','Motion + VFX','HTML — sem domínio / sem publicação'],
    'Web / HTML':['Manual essencial','Banner para loja ou coleção','Modelo 3D Produto']
  };

  const normalize=s=>String(s||'').trim().replace(/\s+/g,' ');
  function catalogCards(){return [...catalog.querySelectorAll('.card')].map(card=>({card,name:normalize(card.querySelector('h3')?.textContent),cat:normalize(card.querySelector('.cat')?.textContent),add:card.querySelector('.add')})).filter(x=>x.name)}
  function selectedNames(){return new Set([...items.querySelectorAll('.item strong')].map(x=>normalize(x.textContent)))}
  function suggestionNames(){
    const cards=catalogCards(),selected=selectedNames(),byName=new Map(cards.map(c=>[c.name,c]));
    const selectedCats=[...selected].map(name=>byName.get(name)?.cat).filter(Boolean);
    const pool=[];
    selectedCats.forEach(cat=>(CROSS[cat]||[]).forEach(n=>pool.push(n)));
    FALLBACK.forEach(n=>pool.push(n));
    cards.forEach(c=>pool.push(c.name));
    return [...new Set(pool)].filter(n=>!selected.has(n)&&byName.has(n)).slice(0,3);
  }
  function ensureHost(){
    let host=drawer.querySelector('.ms-cart-suggestions');
    if(!host){host=document.createElement('section');host.className='ms-cart-suggestions';host.setAttribute('aria-label','Sugestões de serviços');items.insertAdjacentElement('afterend',host)}
    return host;
  }
  function render(){
    const host=ensureHost(),names=suggestionNames();
    host.innerHTML=`<div class="ms-cart-suggestions-head"><strong>Combine com</strong><small>Sugestões de serviços</small></div>`+(names.length?`<div class="ms-cart-suggestion-list">${names.map(name=>`<button class="ms-cart-suggestion" type="button" data-ms-suggest="${name.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}"><span>${name}</span><b>+</b></button>`).join('')}</div>`:`<div class="ms-cart-suggestions-empty">Seu orçamento já cobre as principais combinações sugeridas.</div>`);
  }
  drawer.addEventListener('click',e=>{
    const btn=e.target.closest('[data-ms-suggest]');if(!btn)return;
    const name=normalize(btn.dataset.msSuggest),entry=catalogCards().find(c=>c.name===name);
    if(entry?.add){entry.add.click();setTimeout(render,60)}
  });
  document.querySelector('#cartBtn')?.addEventListener('click',()=>setTimeout(render,40));
  new MutationObserver(()=>{if(drawer.classList.contains('open'))render()}).observe(items,{childList:true,subtree:true});
  render();
})();