const ADAPTERS={
  css_native:'./adapters/css-native.js',
  gsap:'./adapters/gsap.js',
  motion:'./adapters/motion.js',
  threejs:'./adapters/three.js'
};
const INTENSITY={none:0,subtle:.65,normal:1,strong:1.25,cinematic:1.55};
const OWNER=new WeakMap();
const IMPORTS=new Map();
const active=new Map();

function asBool(value,fallback=false){if(value===true||value==='true')return true;if(value===false||value==='false')return false;return fallback;}
function reducedMode(system={}){const policy=String(system.reduced_motion||'system');if(policy==='off')return true;if(policy==='reduced')return true;if(policy==='full')return false;return matchMedia('(prefers-reduced-motion: reduce)').matches;}
function normalizedNode(el,system={}){const d=el.dataset||{},preset=String(d.sfMotionPreset||'inherit'),engine=String(d.sfMotionEngine||'auto');return {enabled:asBool(d.sfMotionEnabled,false)&&preset!=='inherit'&&preset!=='none',preset,themeVariation:String(d.sfMotionThemeVariant||preset),engine,trigger:String(d.sfMotionTrigger||'viewport'),duration:Number(d.sfMotionDuration||system.tokens?.standard||.36),delay:Number(d.sfMotionDelay||0),stagger:Number(d.sfMotionStagger||system.tokens?.stagger||.06),ease:String(d.sfMotionEase||'premium'),intensity:String(d.sfMotionIntensity||system.intensity||'normal'),scrub:Math.max(0,Math.min(2,Number(d.sfMotionScrub||0))),direction:['auto','up','down','left','right'].includes(String(d.sfMotionDirection||''))?String(d.sfMotionDirection):'auto'};}
function presetMeta(manifest,preset){return manifest?.registry?.presets?.[preset]||manifest?.presets?.[preset]||{};}
function resolveEngine(node,manifest){if(node.engine!=='auto')return node.engine;const meta=presetMeta(manifest,node.preset);return meta.engine||'css_native';}
async function adapter(name){if(!ADAPTERS[name])name='css_native';if(!IMPORTS.has(name))IMPORTS.set(name,import(new URL(ADAPTERS[name],import.meta.url).href));return IMPORTS.get(name);}
function canOwn(el,property,engine){let map=OWNER.get(el);if(!map){map=new Map();OWNER.set(el,map);}const current=map.get(property);if(current&&current!==engine)return false;map.set(property,engine);return true;}
function release(el,engine){const map=OWNER.get(el);if(!map)return;for(const [prop,owner] of map)if(owner===engine)map.delete(prop);if(!map.size)OWNER.delete(el);}
function markPresentation(el,node){const previous=String(el.dataset.sfMotionResolvedPreset||'');if(previous)el.classList.remove(`sf-motion-${previous}`);el.classList.add('sf-motion-node',`sf-motion-${node.preset}`);el.dataset.sfMotionResolvedPreset=node.preset;el.dataset.sfMotionThemeVariant=node.themeVariation;}
function clearPresentation(el,preset=''){const resolved=String(preset||el?.dataset?.sfMotionResolvedPreset||'');if(resolved)el.classList.remove(`sf-motion-${resolved}`);el.classList.remove('sf-motion-node','sf-motion-active','sf-motion-pending','sf-motion-interacting','sf-motion-paused');delete el.dataset.sfMotionResolvedPreset;delete el.dataset.sfMotionResolvedEngine;}

export class StudioFrameMotionRuntime{
  constructor(manifest={}){this.manifest=manifest||{};this.system=this.manifest.system||{};this.paused=false;this.destroyed=false;this.visibility=()=>{if(document.hidden)this.pause();else this.resume();};document.addEventListener('visibilitychange',this.visibility);}
  async mountElement(el){const node=normalizedNode(el,this.system);if(!node.enabled)return;const meta=presetMeta(this.manifest,node.preset);const engine=resolveEngine(node,this.manifest);const target=node.preset.startsWith('button-')?(el.matches('button,a')?el:(el.querySelector('button,a')||el)):node.preset.startsWith('text-')?(el.querySelector('h1,h2,h3,p,[data-motion-text]')||el):el;const property=engine==='threejs'?'webgl':'transform';if(!canOwn(target,property,engine)){console.warn('[StudioFrame][MOTION] owner conflict blocked',node.preset,engine);return;}markPresentation(target,node);
    const options={...node,reduced:reducedMode(this.system),intensityFactor:INTENSITY[node.intensity]??1,performance:meta.performance||'A',fallback:meta.fallback||'none',requires:Array.isArray(meta.requires)?meta.requires:[]};
    try{const mod=await adapter(engine);const handle=await mod.mount(target,options);active.set(el,{engine,handle,target,preset:node.preset,themeVariation:node.themeVariation});}
    catch(error){console.warn('[StudioFrame][MOTION] adapter fallback',engine,node.preset,error);release(target,engine);if(engine!=='css_native'){try{canOwn(target,'transform','css_native');const mod=await adapter('css_native');const handle=await mod.mount(target,{...options,reduced:options.reduced});active.set(el,{engine:'css_native',handle,target,preset:node.preset,themeVariation:node.themeVariation});}catch(fallbackError){console.warn('[StudioFrame][MOTION] fallback unavailable',fallbackError);target.classList.add('sf-motion-active');active.set(el,{engine:'none',handle:null,target,preset:node.preset,themeVariation:node.themeVariation});}}}
  }
  async refresh(root=document){if(this.destroyed)return;const nodes=[...root.querySelectorAll('[data-sf-motion-enabled="true"][data-sf-motion-preset]:not([data-sf-motion-preset="inherit"]):not([data-sf-motion-preset="none"])')];await Promise.allSettled(nodes.map((el)=>active.has(el)?null:this.mountElement(el)));for(const [el,item] of [...active])if(!document.contains(el)){try{item.handle?.destroy?.();}catch(_){}clearPresentation(item.target||el,item.preset);release(item.target||el,item.engine);active.delete(el);}}
  pause(){this.paused=true;for(const item of active.values())try{item.handle?.pause?.();}catch(_){} }
  resume(){if(!this.paused)return;this.paused=false;for(const item of active.values())try{item.handle?.resume?.();}catch(_){} }
  async replay(){for(const [el,item] of [...active]){try{item.handle?.destroy?.();}catch(_){}clearPresentation(item.target||el,item.preset);release(item.target||el,item.engine);active.delete(el);}await this.refresh();}
  destroy(){this.destroyed=true;document.removeEventListener('visibilitychange',this.visibility);for(const [el,item] of [...active]){try{item.handle?.destroy?.();}catch(_){}clearPresentation(item.target||el,item.preset);release(item.target||el,item.engine);}active.clear();}
  snapshot(){return {enabled:Boolean(this.system.enabled),active:active.size,paused:this.paused,dependencies:this.manifest.runtime_dependencies||[],engines:this.manifest.engines||[],variations:[...active.values()].map(item=>({preset:item.preset,theme_variation:item.themeVariation,engine:item.engine})),reduced:reducedMode(this.system)};}
}

export async function initializeStudioFrameMotionV77(manifest={}){const current=window.StudioFrameMotionV77;if(current?.destroy)current.destroy();const runtime=new StudioFrameMotionRuntime(manifest);window.StudioFrameMotionV77=runtime;if(manifest?.enabled)await runtime.refresh();window.dispatchEvent(new CustomEvent('studioframe:motion-ready',{detail:runtime.snapshot()}));return runtime;}
