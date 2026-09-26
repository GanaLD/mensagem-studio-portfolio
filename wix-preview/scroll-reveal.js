(()=>{const viewer=document.getElementById('modelViewer3D');if(viewer){try{viewer.pause?.()}catch(_){}viewer.style.visibility='hidden';viewer.removeAttribute('src');if(viewer.dataset)viewer.dataset.src='';}})();
import('https://cdn.jsdelivr.net/gh/GanaLD/mensagem-studio-portfolio@backup-wix-preview-before-fone-menu-20260926/wix-preview/scroll-reveal.js').catch(error=>console.error('[Scroll reveal preview]',error));
import('./fone-3d-entry.js?v=20260926-front-player-black-blue-v6').catch(error=>console.error('[3D preview bootstrap v6]',error));
