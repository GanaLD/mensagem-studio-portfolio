let basePromise;const pluginPromises=new Map();
function script(src) { return new Promise((resolve, reject) => { const existing=document.querySelector(`script[data-sf-motion-src="${src}"]`); if(existing){ if(existing.dataset.loaded==='true')resolve(); else {existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',reject,{once:true});} return;} const node=document.createElement('script');node.src=src;node.async=true;node.dataset.sfMotionSrc=src;node.onload=()=>{node.dataset.loaded='true';resolve();};node.onerror=reject;document.head.append(node); }); }
async function plugin(name,url,globalName){if(window[globalName])return window[globalName];if(!pluginPromises.has(name))pluginPromises.set(name,script(url).then(()=>window[globalName]));return pluginPromises.get(name);}
async function loadGsap(requires=[]){ if(!basePromise)basePromise=(async()=>{if(!window.gsap)await script('https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js');return window.gsap;})();const gsap=await basePromise;if(!gsap)throw new Error('GSAP core unavailable');
  const loaded={gsap};
  if(requires.includes('scrolltrigger'))loaded.ScrollTrigger=await plugin('scrolltrigger','https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js','ScrollTrigger');
  if(requires.includes('flip'))loaded.Flip=await plugin('flip','https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Flip.min.js','Flip');
  if(requires.includes('splittext'))loaded.SplitText=await plugin('splittext','https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/SplitText.min.js','SplitText');
  Object.values(loaded).filter(item=>item&&item!==gsap).forEach(item=>{try{gsap.registerPlugin(item);}catch(_){}});return loaded;
}
const active=new WeakMap();
export async function mount(el, options={}){
  destroy(el); const loaded=await loadGsap(options.requires||[]),gsap=loaded.gsap,ScrollTrigger=loaded.ScrollTrigger;el.dataset.sfMotionResolvedEngine='gsap';
  const preset=options.preset||'section-reveal', distance=26*(options.intensityFactor||1), duration=Math.max(.05,Number(options.duration||.6));let tween,split;
  if(options.reduced){gsap.set(el,{clearProps:'transform,filter,opacity'});tween={kill(){}};}
  else if(loaded.SplitText&&preset.startsWith('text-')){split=new loaded.SplitText(el,{type:preset==='text-lines'?'lines':preset==='text-words'?'words':'chars'});const parts=split.lines?.length?split.lines:split.words?.length?split.words:split.chars||[];tween=gsap.fromTo(parts,{opacity:0,y:distance*.65},{opacity:1,y:0,duration,delay:Number(options.delay||0),stagger:Number(options.stagger||.06),ease:'power3.out',scrollTrigger:ScrollTrigger?{trigger:el,start:'top 90%',once:true}:undefined});}
  else if(options.trigger==='scroll'||preset.includes('parallax')||preset.includes('scroll')||preset.includes('sticky')||preset.includes('timeline')){tween=gsap.fromTo(el,{y:preset.includes('parallax')?-distance*.45:distance*.65,opacity:preset.includes('parallax')?1:.25},{y:preset.includes('parallax')?distance*.45:0,opacity:1,ease:'none',duration:1,scrollTrigger:ScrollTrigger?{trigger:el,start:'top 92%',end:preset.includes('parallax')?'bottom top':'top 38%',scrub:preset.includes('parallax')||preset.includes('scroll')?.6:false,once:!(preset.includes('parallax')||preset.includes('scroll'))}:undefined});}
  else{tween=gsap.fromTo(el,{opacity:0,y:distance,scale:preset.includes('scale')?.96:1},{opacity:1,y:0,scale:1,duration,delay:Number(options.delay||0),ease:'power3.out',scrollTrigger:ScrollTrigger?{trigger:el,start:'top 90%',once:true}:undefined});}
  const resource={tween,split,kill(){try{tween?.scrollTrigger?.kill?.();tween?.kill?.();split?.revert?.();}catch(_){}}};active.set(el,resource);return {engine:'gsap',pause:()=>tween?.pause?.(),resume:()=>tween?.resume?.(),destroy:()=>destroy(el)};
}
export function destroy(el){const item=active.get(el);try{item?.kill?.();}catch(_){}active.delete(el);delete el.dataset.sfMotionResolvedEngine;}
