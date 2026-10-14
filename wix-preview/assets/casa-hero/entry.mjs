// Mobile shows the same camera journey as a cinematic, without creating WebGL
// or downloading the interactive environment and character.
const cinematic=matchMedia('(max-width:760px), (pointer:coarse)').matches;
try{
 if(cinematic)await import('./mobile-tour.mjs?v=20261014-mobile-stages-v4');
 else await import('./viewer.mjs?v=20261014-http-parallel-v3');
}catch(error){
 if(typeof window.__reportCasaEntryError==='function')window.__reportCasaEntryError(error);
 else{
  window.__loadError=String(error?.message||error||'Não foi possível carregar o ambiente.');
  window.__visualReady=false;window.__ready=false;
  if(parent!==window&&new URLSearchParams(location.search).get('embed')==='hero4')parent.postMessage({type:'MS_CASA_HERO_ERROR',message:window.__loadError},location.origin);
 }
 console.error(error);
}
