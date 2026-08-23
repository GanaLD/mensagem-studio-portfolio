let modulePromise; const active=new WeakMap();
async function loadMotion(){ if(!modulePromise)modulePromise=import('https://cdn.jsdelivr.net/npm/motion@12.43.0/+esm'); return modulePromise; }
export async function mount(el, options={}){
  destroy(el); const mod=await loadMotion(); const animate=mod.animate||mod.default?.animate; if(typeof animate!=='function')throw new Error('Motion runtime unavailable');
  el.dataset.sfMotionResolvedEngine='motion';
  const factor=options.intensityFactor||1, duration=Math.max(.05,Number(options.duration||.36)),preset=options.preset||'button-scale'; let controls; const cleanup=[];
  if(options.reduced){el.style.opacity='1';controls={cancel(){}};}
  else if(options.trigger==='interaction'||preset.startsWith('button-')){
    const reset=()=>{controls?.cancel?.();controls=animate(el,{scale:1,x:0,y:0},{duration:duration*.65,easing:'ease-out'});};
    const enter=()=>{controls?.cancel?.();controls=animate(el,{scale:preset.includes('morph')?1.045:1.025},{duration:duration*.55,easing:'ease-out'});};
    const move=(event)=>{if(!preset.includes('magnetic')||matchMedia('(hover:none),(pointer:coarse)').matches)return;const r=el.getBoundingClientRect(),x=(event.clientX-(r.left+r.width/2))*.14*factor,y=(event.clientY-(r.top+r.height/2))*.14*factor;controls?.cancel?.();controls=animate(el,{x,y,scale:1.025},{duration:.18,easing:'ease-out'});};
    el.addEventListener('pointerenter',enter);el.addEventListener('pointermove',move);el.addEventListener('pointerleave',reset);el.addEventListener('focusin',enter);el.addEventListener('focusout',reset);
    cleanup.push(()=>{el.removeEventListener('pointerenter',enter);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);el.removeEventListener('focusin',enter);el.removeEventListener('focusout',reset);el.style.transform='';});
    controls={cancel(){cleanup.forEach(fn=>fn());}};
  }else controls=animate(el,{opacity:[0,1],transform:[`translateY(${20*factor}px)`,'translateY(0px)']},{duration,delay:Number(options.delay||0),easing:'ease-out'});
  const resource={cancel(){try{controls?.cancel?.();}catch(_){}cleanup.forEach(fn=>{try{fn();}catch(_){}});}};active.set(el,resource);return {engine:'motion',pause:()=>controls.pause?.(),resume:()=>controls.play?.(),destroy:()=>destroy(el)};
}
export function destroy(el){const c=active.get(el);try{c?.cancel?.();}catch(_){}active.delete(el);delete el.dataset.sfMotionResolvedEngine;}
