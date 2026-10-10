// The website owns scroll progress. This bridge only accepts state from the
// embedding page on the same origin; it does not run another scroll timeline.
export function createHeroEmbedding({applyState,releaseInput}){
 const enabled=new URLSearchParams(location.search).get('embed')==='hero4';
 const state={active:false,explore:false,progress:0};
 let visualReady=false,ready=false;
 const post=message=>{if(enabled&&parent!==window)parent.postMessage(message,location.origin);};
 const apply=()=>{if(visualReady)applyState({...state});};
 if(enabled){
  document.documentElement.dataset.embedded='hero4';
  addEventListener('message',event=>{
   if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='MS_CASA_HERO_STATE')return;
   const value=Number(event.data.progress);
   if(!Number.isFinite(value))return;
   state.progress=Math.max(0,Math.min(1,value));
   state.active=event.data.active===true;
   state.explore=state.active&&state.progress>=.999&&event.data.explore===true;
   apply();
  });
  addEventListener('wheel',event=>{
   if(!state.active||!state.explore)return;
   event.preventDefault();releaseInput();
   const units=event.deltaMode===1?16:event.deltaMode===2?innerHeight:1;
   post({type:'MS_CASA_HERO_SCROLL',deltaY:Math.max(-2000,Math.min(2000,event.deltaY*units))});
  },{passive:false});
 }
 return{
  enabled,state,
  reportLoad(phase,progress,label){
   const value=Math.max(0,Math.min(100,Number(progress)||0));
   post({type:'MS_CASA_HERO_LOAD',phase:String(phase||'environment'),progress:value,label:String(label||'')});
  },
  visualReady(){
   if(visualReady)return;
   visualReady=true;apply();
   post({type:'MS_CASA_HERO_VISUAL_READY'});
  },
  ready(){
   ready=true;
   if(!visualReady){visualReady=true;post({type:'MS_CASA_HERO_VISUAL_READY'});}
   apply();post({type:'MS_CASA_HERO_READY'});
  },
  exit(){if(!enabled)return;releaseInput();post({type:'MS_CASA_HERO_EXIT'});},
  get visualReadyState(){return visualReady;},
  get readyState(){return ready;}
 };
}
