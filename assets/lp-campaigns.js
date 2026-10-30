(()=>{"use strict";
const cfg=window.MS_ANALYTICS_CONFIG||{},id=String(cfg.ga4MeasurementId||"").trim();
if(cfg.enabled&&id){
 window.dataLayer=window.dataLayer||[];
 window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
 if(!document.querySelector("script[data-ms-ga4]")){
  const s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(id);s.dataset.msGa4="1";document.head.appendChild(s);
  window.gtag("js",new Date());window.gtag("config",id,{send_page_view:true});
 }
}
const campaign={};["utm_source","utm_medium","utm_campaign","utm_content","utm_term"].forEach(k=>{const v=new URLSearchParams(location.search).get(k);if(v)campaign[k]=v});
const track=(name,params={})=>{if(typeof window.gtag==="function")window.gtag("event",name,{page_path:location.pathname,...campaign,...params})};
document.querySelectorAll("[data-analytics-event]").forEach(el=>el.addEventListener("click",()=>track(el.dataset.analyticsEvent,{cta_type:el.dataset.ctaType||"link",link_url:el.href||""})));
if("IntersectionObserver"in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const el=entry.target;track(el.dataset.viewEvent||"view_service",{content_name:el.dataset.viewName||""});observer.unobserve(el)}}),{threshold:.35});
 document.querySelectorAll("[data-view-event]").forEach(el=>observer.observe(el));
}
})();