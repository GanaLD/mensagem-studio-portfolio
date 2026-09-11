let basePromise;const pluginPromises=new Map();const VENDOR_BASE=new URL('../vendor/gsap/',import.meta.url);const vendorFile=(name)=>new URL(name,VENDOR_BASE).href;
function script(src) { return new Promise((resolve, reject) => { const existing=document.querySelector(`script[data-sf-motion-src="${src}"]`); if(existing){ if(existing.dataset.loaded==='true')resolve(); else {existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',reject,{once:true});} return;} const node=document.createElement('script');node.src=src;node.async=true;node.dataset.sfMotionSrc=src;node.onload=()=>{node.dataset.loaded='true';resolve();};node.onerror=reject;document.head.append(node); }); }
async function plugin(name,url,globalName){if(window[globalName])return window[globalName];if(!pluginPromises.has(name))pluginPromises.set(name,script(url).then(()=>window[globalName]));return pluginPromises.get(name);}
async function loadGsap(requires=[]){ if(!basePromise)basePromise=(async()=>{if(!window.gsap)await script(vendorFile('gsap.min.js'));return window.gsap;})();const gsap=await basePromise;if(!gsap)throw new Error('GSAP core local unavailable');
  const loaded={gsap};
  if(requires.includes('scrolltrigger'))loaded.ScrollTrigger=await plugin('scrolltrigger',vendorFile('ScrollTrigger.min.js'),'ScrollTrigger');
  if(requires.includes('flip'))loaded.Flip=await plugin('flip',vendorFile('Flip.min.js'),'Flip');
  if(requires.includes('splittext'))loaded.SplitText=await plugin('splittext',vendorFile('SplitText.min.js'),'SplitText');
  Object.values(loaded).filter(item=>item&&item!==gsap).forEach(item=>{try{gsap.registerPlugin(item);}catch(_){}});return loaded;
}
const active=new WeakMap();
export async function mount(el, options={}){
  destroy(el); const loaded=await loadGsap(options.requires||[]),gsap=loaded.gsap,ScrollTrigger=loaded.ScrollTrigger;el.dataset.sfMotionResolvedEngine='gsap';
  const preset=options.preset||'section-reveal',factor=options.intensityFactor||1,distance=26*factor,duration=Math.max(.05,Number(options.duration||.6)),delay=Number(options.delay||0),stagger=Number(options.stagger||.06),children=[...el.children].filter(node=>node.tagName!=='CANVAS');let animation,split;
  const scroll=(extra={})=>ScrollTrigger?{trigger:el,start:'top 90%',end:'bottom 20%',once:true,...((options.trigger==='scroll'&&Number(options.scrub||0)>0)?{scrub:Number(options.scrub),once:false}:{}),...extra}:undefined;
  if(options.reduced){gsap.set([el,...children],{clearProps:'transform,filter,opacity,clipPath'});animation={kill(){},pause(){},resume(){}};}
  else if(loaded.SplitText&&preset.startsWith('text-')){
    split=new loaded.SplitText(el,{type:preset==='text-lines'?'lines':preset==='text-words'?'words':'chars'});const parts=split.lines?.length?split.lines:split.words?.length?split.words:split.chars||[];
    const from=preset==='text-scramble'?{opacity:0,rotationX:95,filter:'blur(8px)'}:{opacity:0,y:preset==='text-characters'?distance:distance*.65,rotationX:preset==='text-characters'?70:0};
    animation=gsap.fromTo(parts,from,{opacity:1,y:0,rotationX:0,filter:'blur(0px)',duration,delay,stagger:preset==='text-scramble'?{each:stagger,from:'random'}:stagger,ease:preset==='text-scramble'?'steps(6)':'power3.out',scrollTrigger:scroll()});
  } else if(preset==='hero-cinematic'){
    animation=gsap.timeline({delay,scrollTrigger:scroll()}).fromTo(el,{opacity:0,scale:1.035,filter:'blur(10px)'},{opacity:1,scale:1,filter:'blur(0px)',duration:duration*1.25,ease:'power3.out'}).fromTo(children,{opacity:0,y:distance},{opacity:1,y:0,duration:duration*.9,stagger,ease:'power3.out'},'-=.7');
  } else if(preset==='hero-parallax'){
    animation=gsap.fromTo(el,{y:-distance*.7},{y:distance*.9,ease:'none',scrollTrigger:scroll({start:'top bottom',end:'bottom top',scrub:true,once:false})});
  } else if(preset==='hero-scroll-expand'){
    animation=gsap.fromTo(el,{scale:.82,clipPath:'inset(9% 7% 9% 7% round 28px)'},{scale:1,clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',scrollTrigger:scroll({start:'top 95%',end:'top 20%',scrub:.7,once:false})});
  } else if(preset==='hero-sticky-product'){
    animation=gsap.timeline({scrollTrigger:scroll({start:'top 82%',end:'bottom top',scrub:.55,once:false})}).fromTo(el,{scale:.94,rotationX:3},{scale:1,rotationX:0,ease:'none'}).fromTo(children,{y:distance*.8,opacity:.4},{y:-distance*.25,opacity:1,stagger:stagger*.5,ease:'none'},0);
  } else if(preset==='hero-gallery-stream'){
    const targets=children.length?children:[el];animation=gsap.fromTo(targets,{x:(i)=>i%2?-distance*1.4:distance*1.4,opacity:0,scale:.94},{x:0,opacity:1,scale:1,duration,delay,stagger,ease:'power3.out',scrollTrigger:scroll()});
  } else if(preset==='hero-layered-images'){
    const targets=children.length?children:[el];animation=gsap.fromTo(targets,{opacity:0,y:(i)=>distance*(i+1)*.35,rotation:(i)=>(i-1)*3,scale:.94},{opacity:1,y:0,rotation:0,scale:1,duration:duration*1.15,delay,stagger,ease:'power3.out',scrollTrigger:scroll()});
  } else if(preset==='section-stagger-grid'||preset==='section-bento-reveal'){
    const targets=children.length?children:[el];animation=gsap.fromTo(targets,{opacity:0,y:distance,scale:preset==='section-bento-reveal'?.88:.97,rotation:preset==='section-bento-reveal'?1.5:0},{opacity:1,y:0,scale:1,rotation:0,duration,delay,stagger,ease:'back.out(1.25)',scrollTrigger:scroll()});
  } else if(preset==='section-sticky-features'){
    const targets=children.length?children:[el];animation=gsap.fromTo(targets,{opacity:.22,x:-distance},{opacity:1,x:0,duration,stagger,scrollTrigger:scroll({start:'top 85%',end:'bottom 35%',scrub:.45,once:false})});
  } else if(preset==='section-scroll-stack'){
    const targets=children.length?children:[el];animation=gsap.fromTo(targets,{y:(i)=>distance*(i+1),scale:(i)=>1-i*.025,opacity:.35},{y:0,scale:1,opacity:1,stagger:stagger*.5,ease:'none',scrollTrigger:scroll({start:'top 92%',end:'bottom 40%',scrub:.55,once:false})});
  } else if(preset==='section-horizontal-gallery'){
    const targets=children.length?children:[el];animation=gsap.fromTo(targets,{xPercent:(i)=>i*18+28,opacity:.45},{xPercent:0,opacity:1,stagger:stagger*.35,ease:'none',scrollTrigger:scroll({start:'top 92%',end:'bottom 35%',scrub:.65,once:false})});
  } else if(preset==='section-case-study-flip'){
    const targets=children.length?children:[el];animation=gsap.fromTo(targets,{opacity:0,rotationY:75,transformPerspective:900,transformOrigin:'50% 50%'},{opacity:1,rotationY:0,duration:duration*1.2,delay,stagger,ease:'power3.out',scrollTrigger:scroll()});
  } else if(preset==='section-timeline'){
    const targets=children.length?children:[el];animation=gsap.fromTo(targets,{opacity:0,x:(i)=>i%2?distance:-distance},{opacity:1,x:0,duration,delay,stagger,ease:'power2.out',scrollTrigger:scroll()});
  } else if(preset==='section-cta-cinematic'){
    animation=gsap.timeline({delay,scrollTrigger:scroll()}).fromTo(el,{clipPath:'inset(0 50% 0 50%)',opacity:.35},{clipPath:'inset(0 0% 0 0%)',opacity:1,duration:duration*1.3,ease:'power3.inOut'}).fromTo(children,{opacity:0,y:distance*.5},{opacity:1,y:0,duration:duration*.7,stagger},'-=.55');
  } else {
    const direction=String(options.direction||'auto'),fromVector=direction==='left'?{x:-distance,y:0}:direction==='right'?{x:distance,y:0}:direction==='down'?{x:0,y:-distance}:{x:0,y:distance};animation=gsap.fromTo(el,{opacity:0,...fromVector,scale:.98},{opacity:1,x:0,y:0,scale:1,duration,delay,ease:options.ease==='linear'?'none':'power3.out',scrollTrigger:scroll()});
  }
  const resource={animation,split,kill(){try{animation?.scrollTrigger?.kill?.();animation?.kill?.();split?.revert?.();gsap.set(el,{clearProps:'transform,filter,opacity,clipPath'});}catch(_){}}};active.set(el,resource);return {engine:'gsap',pause:()=>animation?.pause?.(),resume:()=>animation?.resume?.(),destroy:()=>destroy(el)};
}
export function destroy(el){const item=active.get(el);try{item?.kill?.();}catch(_){}active.delete(el);delete el.dataset.sfMotionResolvedEngine;}
