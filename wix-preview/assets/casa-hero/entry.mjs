// Mobile shows the same camera journey as a cinematic, without creating WebGL
// or downloading the interactive environment and character.
const cinematic=matchMedia('(max-width:760px), (pointer:coarse)').matches;
if(cinematic)await import('./mobile-tour.mjs?v=20261013-site-fast-v1');
else await import('./viewer.mjs?v=20261013-site-fast-v1');
