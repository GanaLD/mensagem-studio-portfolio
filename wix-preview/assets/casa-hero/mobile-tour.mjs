import {createHeroEmbedding} from './embedded-host.mjs?v=20261013-site-fast-v1';
import {versionedAssetURL} from './asset-loader.mjs?v=20261013-site-fast-v1';
document.documentElement.dataset.cinematic='true';
document.body.dataset.mode='embedded';
const style=document.createElement('style');style.textContent='html[data-cinematic] body> :not(.mobile-house-film):not(.load){display:none!important}.mobile-house-film{position:fixed;inset:0;width:100%;height:100%;object-fit:cover;background:#17201b;pointer-events:none}';document.head.append(style);
const video=document.createElement('video');video.className='mobile-house-film';video.muted=true;video.defaultMuted=true;video.playsInline=true;video.preload='auto';video.controls=false;video.disablePictureInPicture=true;video.poster=versionedAssetURL('./mobile-tour-poster.webp');document.body.prepend(video);
let desired=0,ready=false,scheduled=0;
function seek(){
 scheduled=0;if(!ready||video.seeking)return;
 const target=desired*Math.max(0,video.duration-1/30);
 if(Math.abs(video.currentTime-target)>.018)video.currentTime=target;
}
function queueSeek(){if(!scheduled)scheduled=requestAnimationFrame(seek);}
const embedding=createHeroEmbedding({applyState(state){desired=state.progress;queueSeek();},releaseInput(){}});
const capabilities=()=>{if(embedding.enabled)parent.postMessage({type:'MS_CASA_HERO_CAPABILITIES',cinematicOnly:true},location.origin);};capabilities();
video.addEventListener('seeked',queueSeek);
video.addEventListener('play',()=>video.pause());
video.addEventListener('error',()=>{window.__loadError='Não foi possível carregar o percurso.';embedding.reportError();});
video.addEventListener('progress',()=>{
 if(!Number.isFinite(video.duration)||!video.duration)return;
 let end=0;for(let i=0;i<video.buffered.length;i++)end=Math.max(end,video.buffered.end(i));
 if(!ready)embedding.reportLoad('environment',Math.min(99,end/video.duration*100),'Preparando percurso…');
});
video.addEventListener('loadeddata',()=>{
 if(ready)return;ready=true;window.__visualReady=true;window.__ready=true;
 capabilities();embedding.reportLoad('environment',100,'Percurso pronto ·');embedding.visualReady();embedding.ready();
 document.getElementById('loading')?.classList.add('done');queueSeek();
},{once:true});
window.__houseCinematic={video,embedding,metrics:()=>({ready,progress:desired,currentTime:video.currentTime,duration:video.duration,paused:video.paused,source:video.currentSrc,webgl:false})};
embedding.reportLoad('environment',0,'Preparando percurso…');
video.src=versionedAssetURL('./mobile-tour.mp4');video.load();
