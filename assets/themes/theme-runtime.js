(function(){
  'use strict';
  const DEFAULT_ID='studioframe-default';
  function base(){return String(window.__PB_ASSET_BASE__||'/assets/');}
  function normalize(manifest){const m=manifest&&typeof manifest==='object'?manifest:{};const a=m.active_theme&&typeof m.active_theme==='object'?m.active_theme:{};return {id:String(a.id||DEFAULT_ID),version:Number(a.version||1),stylesheet:String(a.stylesheet||'assets/themes/studioframe-default.css'),tokens:m.tokens&&typeof m.tokens==='object'?m.tokens:{}};}
  function ensureStylesheet(theme){const marker='sf-theme-stylesheet';let link=document.querySelector(`link[data-${marker}]`);if(!link){link=document.createElement('link');link.rel='stylesheet';link.dataset[marker]='1';document.head.append(link);}const relative=theme.stylesheet.replace(/^assets\//,'');link.href=`${base()}${relative}`;}
  function apply(manifest){const theme=normalize(manifest);const root=document.body;if(!root)return theme;root.dataset.sfTheme=theme.id;root.dataset.sfThemeVersion=String(theme.version);document.documentElement.dataset.sfThemeRuntime='7.8.1';ensureStylesheet(theme);root.dispatchEvent(new CustomEvent('studioframe-theme-applied',{detail:theme}));return theme;}
  window.StudioFrameThemeRuntime=Object.freeze({version:'7.8.1',defaultThemeId:DEFAULT_ID,normalize,apply});
})();
