const PDF_PROXY='https://ktkikndmcsezuivfcsft.supabase.co/functions/v1/ms-lab-pdf-assets?asset=';
const PDF_KEYS={
  '11XDu6CIsWljx6I5ZRfveGJIFFdSnkSlL':'manual',
  '1aqI0tbJjItjRLoZcvCd1Asm24e-O1pYs':'mediakit',
  '1j3yee9MH266rojP_F8IwkHfKsLqTvihj':'branding'
};

const style=document.createElement('style');
style.id='pdfClickViewerStyle';
style.textContent=`
#pdf .stage-main{overflow:hidden;background:rgba(8,9,7,.52)}
#pdfFrame{display:none!important;pointer-events:none!important}
.pdf-click-viewer{position:relative;width:100%;height:70vh;min-height:70vh;display:grid;place-items:center;overflow:hidden;isolation:isolate;background:radial-gradient(circle at 50% 45%,rgba(255,255,255,.035),rgba(0,0,0,.12) 48%,rgba(0,0,0,.32));touch-action:pan-y}
.pdf-click-viewer canvas{display:block;max-width:calc(100% - 34px);max-height:calc(100% - 34px);box-shadow:0 22px 64px rgba(0,0,0,.38);background:#fff;pointer-events:none}
.pdf-click-zone{position:absolute;z-index:5;top:0;bottom:0;width:42%;border:0;background:transparent;padding:0;cursor:pointer;touch-action:pan-y;-webkit-tap-highlight-color:transparent}
.pdf-click-zone.prev{left:0}.pdf-click-zone.next{right:0}
.pdf-click-zone:before{content:'';position:absolute;top:0;bottom:0;width:46%;opacity:0;transition:opacity .18s ease;pointer-events:none}
.pdf-click-zone.prev:before{left:0;background:linear-gradient(90deg,rgba(0,0,0,.36),transparent)}
.pdf-click-zone.next:before{right:0;background:linear-gradient(-90deg,rgba(0,0,0,.36),transparent)}
.pdf-click-zone:hover:before,.pdf-click-zone:focus-visible:before{opacity:1}
.pdf-arrow{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border:1px solid rgba(255,255,255,.24);background:rgba(5,6,5,.72);backdrop-filter:blur(10px);display:grid;place-items:center;font-size:24px;line-height:1;color:#f4f5ef;opacity:.74;transition:opacity .18s ease,transform .18s ease,border-color .18s ease}
.pdf-click-zone.prev .pdf-arrow{left:18px}.pdf-click-zone.next .pdf-arrow{right:18px}
.pdf-click-zone:hover .pdf-arrow,.pdf-click-zone:focus-visible .pdf-arrow{opacity:1;border-color:#c9ff36}
.pdf-click-zone.prev:hover .pdf-arrow{transform:translate(-3px,-50%)}.pdf-click-zone.next:hover .pdf-arrow{transform:translate(3px,-50%)}
.pdf-click-zone[disabled]{cursor:default}.pdf-click-zone[disabled] .pdf-arrow{opacity:.18;border-color:rgba(255,255,255,.12)}
.pdf-page-indicator{position:absolute;z-index:7;left:50%;bottom:16px;transform:translateX(-50%);padding:9px 12px;border:1px solid rgba(255,255,255,.16);background:rgba(5,6,5,.78);backdrop-filter:blur(10px);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#d6d9cf;pointer-events:none}
.pdf-load-state{position:absolute;z-index:3;inset:0;display:grid;place-items:center;text-align:center;padding:30px;font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:#c9ff36;pointer-events:none}
#pdf .stage-note{z-index:8}
@media(max-width:760px){.pdf-click-viewer{height:60vh;min-height:60vh}.pdf-arrow{width:42px;height:42px;font-size:21px}.pdf-click-zone.prev .pdf-arrow{left:8px}.pdf-click-zone.next .pdf-arrow{right:8px}.pdf-page-indicator{bottom:10px}.pdf-click-viewer canvas{max-width:calc(100% - 20px);max-height:calc(100% - 20px)}}
`;
document.head.append(style);

async function bootPdfClickViewer(){
  const stage=document.querySelector('#pdf .stage-main');
  const legacy=document.querySelector('#pdfFrame');
  const tabs=document.querySelector('#pdfTabs');
  if(!stage||!legacy||!tabs||stage.dataset.clickViewer==='1') return;
  stage.dataset.clickViewer='1';
  legacy.setAttribute('aria-hidden','true');
  legacy.tabIndex=-1;

  const viewer=document.createElement('div');
  viewer.className='pdf-click-viewer';
  viewer.setAttribute('aria-label','Visualizador de PDF por páginas');
  viewer.innerHTML=`<canvas id="pdfPageCanvas" aria-hidden="true"></canvas>
    <button class="pdf-click-zone prev" type="button" aria-label="Página anterior"><span class="pdf-arrow">←</span></button>
    <button class="pdf-click-zone next" type="button" aria-label="Próxima página"><span class="pdf-arrow">→</span></button>
    <div class="pdf-page-indicator" aria-live="polite">Página — / —</div>
    <div class="pdf-load-state">Carregando documento…</div>`;
  stage.prepend(viewer);

  const canvas=viewer.querySelector('#pdfPageCanvas');
  const prev=viewer.querySelector('.prev');
  const next=viewer.querySelector('.next');
  const indicator=viewer.querySelector('.pdf-page-indicator');
  const loadState=viewer.querySelector('.pdf-load-state');
  const note=stage.querySelector('.stage-note');

  let pdfjsLib;
  try{
    pdfjsLib=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs');
    pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
  }catch(err){
    console.error('[PDF click viewer] pdf.js load failed',err);
    loadState.textContent='Não foi possível carregar o visualizador';
    return;
  }

  let doc=null,pageNo=1,rendering=false,pending=false,loadToken=0,activeKey='manual';
  function syncUi(){
    const total=doc?.numPages||0;
    indicator.textContent=total?`Página ${pageNo} / ${total}`:'Página — / —';
    prev.disabled=!doc||pageNo<=1;
    next.disabled=!doc||pageNo>=total;
  }

  async function renderPage(){
    if(!doc||rendering){pending=true;return}
    rendering=true;pending=false;
    try{
      const page=await doc.getPage(pageNo);
      const base=page.getViewport({scale:1});
      const maxW=Math.max(120,viewer.clientWidth-34);
      const maxH=Math.max(160,viewer.clientHeight-34);
      const cssScale=Math.min(maxW/base.width,maxH/base.height);
      const dpr=Math.min(window.devicePixelRatio||1,2);
      const viewport=page.getViewport({scale:cssScale*dpr});
      canvas.width=Math.max(1,Math.floor(viewport.width));
      canvas.height=Math.max(1,Math.floor(viewport.height));
      canvas.style.width=`${viewport.width/dpr}px`;
      canvas.style.height=`${viewport.height/dpr}px`;
      const ctx=canvas.getContext('2d',{alpha:false});
      await page.render({canvasContext:ctx,viewport}).promise;
      loadState.style.display='none';
      syncUi();
    }catch(err){
      console.error('[PDF click viewer] render failed',err);
      loadState.style.display='grid';
      loadState.textContent='Erro ao renderizar esta página';
    }finally{
      rendering=false;
      if(pending){pending=false;renderPage()}
    }
  }

  async function loadDocument(key){
    const token=++loadToken;
    activeKey=key;
    pageNo=1;doc=null;syncUi();
    loadState.style.display='grid';
    loadState.textContent='Carregando documento…';
    try{
      const task=pdfjsLib.getDocument({url:PDF_PROXY+encodeURIComponent(key),rangeChunkSize:262144});
      const loaded=await task.promise;
      if(token!==loadToken){loaded.destroy?.();return}
      doc=loaded;pageNo=1;syncUi();
      if(note) note.textContent=`clique nas laterais · ${doc.numPages} páginas`;
      await renderPage();
    }catch(err){
      console.error('[PDF click viewer] load failed',err);
      loadState.textContent='Não foi possível abrir este PDF';
    }
  }

  function changePage(delta){
    if(!doc)return;
    const target=Math.max(1,Math.min(doc.numPages,pageNo+delta));
    if(target===pageNo)return;
    pageNo=target;syncUi();renderPage();
  }
  prev.addEventListener('click',()=>changePage(-1));
  next.addEventListener('click',()=>changePage(1));

  tabs.addEventListener('click',e=>{
    const btn=e.target.closest('button[data-pdf]');
    if(!btn)return;
    const key=PDF_KEYS[btn.dataset.pdf];
    if(key&&key!==activeKey) loadDocument(key);
  });

  let resizeRaf=0;
  new ResizeObserver(()=>{if(!doc)return;cancelAnimationFrame(resizeRaf);resizeRaf=requestAnimationFrame(()=>renderPage())}).observe(viewer);
  syncUi();
  await loadDocument('manual');
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bootPdfClickViewer,{once:true});
else bootPdfClickViewer();
