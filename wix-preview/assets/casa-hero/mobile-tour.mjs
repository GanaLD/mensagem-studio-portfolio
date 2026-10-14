import {createHeroEmbedding} from './embedded-host.mjs?v=20261014-http-parallel-v3';
import {versionedAssetURL} from './asset-loader.mjs?v=20261014-http-parallel-v3';
document.documentElement.dataset.cinematic='true';
document.body.dataset.mode='embedded';
const style=document.createElement('style');style.textContent='html[data-cinematic] body> :not(.mobile-house-film):not(.load){display:none!important}.mobile-house-film{position:fixed;inset:0;width:100%;height:100%;object-fit:cover;background:#17201b;pointer-events:none}';document.head.append(style);
const video=document.createElement('video');video.className='mobile-house-film';video.muted=true;video.defaultMuted=true;video.playsInline=true;video.setAttribute('muted','');video.setAttribute('playsinline','');video.setAttribute('webkit-playsinline','');video.preload='auto';video.controls=false;video.disablePictureInPicture=true;video.poster=versionedAssetURL('./mobile-tour-poster.webp');document.body.prepend(video);
let desired=0,ready=false,scheduled=0,priming=false,failed=false,gestureRequired=false;
function seek(){
 scheduled=0;if(!ready||video.seeking)return;
 const target=desired*Math.max(0,video.duration-1/30);
 if(Math.abs(video.currentTime-target)>.018)video.currentTime=target;
}
function queueSeek(){if(!scheduled)scheduled=requestAnimationFrame(seek);}
const embedding=createHeroEmbedding({applyState(state){desired=state.progress;queueSeek();},releaseInput(){}});
const capabilities=()=>{if(embedding.enabled)parent.postMessage({type:'MS_CASA_HERO_CAPABILITIES',cinematicOnly:true},location.origin);};capabilities();
function reportMediaBlocked(blocked){
 if(gestureRequired===blocked)return;
 gestureRequired=blocked;
 if(embedding.enabled)parent.postMessage({type:'MS_CASA_HERO_MEDIA_BLOCKED',gestureRequired:blocked},location.origin);
}
function reportError(){
 if(failed)return;failed=true;ready=false;priming=false;video.pause();
 window.__visualReady=false;window.__ready=false;window.__loadError='Não foi possível carregar o percurso.';
 embedding.reportError();
}
function reconcileReady(){
 if(video.error){reportError();return;}
 if(failed||ready||video.readyState<2||!Number.isFinite(video.duration)||video.duration<=0)return;
 ready=true;priming=false;reportMediaBlocked(false);video.pause();window.__visualReady=true;window.__ready=true;
 capabilities();embedding.reportLoad('environment',100,'Percurso pronto ·');embedding.visualReady();embedding.ready();
 document.getElementById('loading')?.classList.add('done');queueSeek();
}
function finishPrime(){priming=false;video.pause();reconcileReady();queueSeek();}
function prime({fromGesture=false}={}){
 if(failed||(priming&&!fromGesture&&!navigator.userActivation?.isActive))return;
 reconcileReady();if(ready){queueSeek();return;}
 priming=true;
 try{
  const playback=video.play();
  if(playback?.then)playback.then(finishPrime,error=>{
   // Gesture/autoplay restrictions are not a failed media download.
   if(error?.name==='NotSupportedError')reportError();
   if(error?.name==='NotAllowedError'&&!ready)reportMediaBlocked(true);
   finishPrime();
  });
 }catch(error){if(error?.name==='NotSupportedError')reportError();if(error?.name==='NotAllowedError'&&!ready)reportMediaBlocked(true);finishPrime();}
}
addEventListener('message',event=>{
 if(embedding.enabled&&event.source===parent&&event.origin===location.origin&&event.data?.type==='MS_CASA_HERO_PRIME')prime();
});
video.addEventListener('seeked',()=>{reconcileReady();queueSeek();});
video.addEventListener('play',()=>{if(!priming)video.pause();});
video.addEventListener('playing',finishPrime);
video.addEventListener('error',reportError);
video.addEventListener('progress',()=>{
 reconcileReady();
 if(!Number.isFinite(video.duration)||!video.duration)return;
 let end=0;for(let i=0;i<video.buffered.length;i++)end=Math.max(end,video.buffered.end(i));
 if(!ready)embedding.reportLoad('environment',Math.min(99,end/video.duration*100),'Preparando percurso…');
});
for(const event of ['loadedmetadata','loadeddata','canplay','canplaythrough','durationchange'])video.addEventListener(event,reconcileReady);
addEventListener('pageshow',reconcileReady);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)reconcileReady();});
// The same-origin parent calls this synchronously from its native tap handler,
// so Safari can retain the gesture when media playback is restricted.
window.__houseCinematic={video,embedding,prime,metrics:()=>({ready,gestureRequired,priming,progress:desired,currentTime:video.currentTime,duration:video.duration,paused:video.paused,source:video.currentSrc,webgl:false})};
embedding.reportLoad('environment',0,'Preparando percurso…');
video.src=versionedAssetURL('./mobile-tour.mp4');video.load();prime();
