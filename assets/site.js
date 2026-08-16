try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (_) {}
const STUDIOFRAME_INITIAL_HASH = String(location.hash || '');
const $ = (s) => document.querySelector(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let DATA = {};
const IS_EDITOR_PREVIEW = Boolean(window.__PB_PREVIEW_DATA__);
let active = 'all';
let revealObserver = null;
let heroTimer = null;
let heroIndex = 0;
let heroProjects = [];
let activeGallery = [];
let activeGalleryIndex = 0;
let activeGalleryTitle = '';
let visualLayout = {};
let projectScrollY = 0;

function esc(value = '') {
  const node = document.createElement('div');
  node.textContent = value;
  return node.innerHTML;
}

async function load() {
  if (window.__PB_PUBLIC_DATA__) {
    DATA = window.__PB_PUBLIC_DATA__;
  } else if (window.__PB_PREVIEW_DATA__) {
    DATA = window.__PB_PREVIEW_DATA__;
  } else {
    const response = await fetch(`${publicAssetBase()}data/portfolio.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`portfolio.json HTTP ${response.status}`);
    DATA = await response.json();
  }
  hydrateHostedAssetUrls(DATA);
  warmMediaOrigins(DATA);
  const identity = DATA.identity || {};
  document.documentElement.style.setProperty('--accent', identity.accent_color || '#2FD59A');
  applyRuntimeSeo();
  $('#logo').textContent = identity.studio_name || 'MENSAGEM STUDIO';
  $('#footerName').textContent = identity.studio_name || 'MENSAGEM STUDIO';
  const footerSite = $('#footerSite');
  if (footerSite) { footerSite.href = identity.site_url || '#'; footerSite.hidden = !identity.site_url; }
  $('#heroTitle').textContent = identity.portfolio_title || 'Portfólio';
  $('#heroDescription').textContent = identity.description || '';
  $('#heroLine').textContent = identity.hero_line || '';
  renderSiteBuilder();
  renderHero();
  const serviceDetail = currentServiceDetail();
  const servicesPage = isServicesPage();
  const customPage = currentCustomPage();
  const seoRoute = currentSeoRoute();
  if(serviceDetail){ renderServiceDetailPage(serviceDetail.category, serviceDetail.item); }
  else if(servicesPage){ renderServicesPage(); }
  else if(customPage){ renderCustomPage(customPage); }
  else if(seoRoute?.kind==='category'){
    renderFilters();
    select(String(seoRoute.entity_id||'all'), false);
    renderHomeComposition();
    renderServicesHome();
  }
  else if(seoRoute?.kind==='project'){
    renderFilters();
    const project=(DATA.projects||[]).find((row)=>String(row.project_id||row.id||'')===String(seoRoute.project_id||'')||String(row.project_entity_id||'')===String(seoRoute.entity_id||''));
    const sectionId=String(project?.section_id||'all');
    select(sectionId, false);
    renderHomeComposition();
    renderServicesHome();
    if(project) requestAnimationFrame(()=>openProjectDetail(project));
  } else {
    renderFilters();
    const hashSection = sectionFromLocation();
    const validFilterIds = new Set((DATA.filters || []).map((item) => String(item.id)));
    const initialFilter = hashSection && validFilterIds.has(String(hashSection)) ? hashSection : (Array.isArray(DATA.filters) && DATA.filters.length ? DATA.filters[0].id : 'all');
    select(initialFilter, false);
    renderHomeComposition();
    renderServicesHome();
  }
  loadQuoteState();
  ensureGlobalQuoteUI();
  renderSideNavigation();
  bindMotion();
}

function publicAssetBase() {
  const configured = String(window.__PB_ASSET_BASE__ || '');
  if (configured) return configured.endsWith('/') ? configured : `${configured}/`;
  if (location.protocol === 'file:') return './';
  return location.pathname === '/site' || location.pathname.startsWith('/site/') ? '/site/' : '/';
}

function hostedAssetBase() {
  return new URL(publicAssetBase(), location.href).href;
}

function hydrateHostedAssetUrls(value) {
  const base = hostedAssetBase();
  const visit = (current) => {
    if (Array.isArray(current)) {
      current.forEach((item, index) => {
        if (typeof item === 'string' && item.startsWith('assets/')) current[index] = `${base}${item}`;
        else visit(item);
      });
      return;
    }
    if (!current || typeof current !== 'object') return;
    Object.entries(current).forEach(([key, item]) => {
      if (typeof item === 'string' && item.startsWith('assets/')) current[key] = `${base}${item}`;
      else visit(item);
    });
  };
  visit(value);
}

function videoSourceCandidates(item = {}) {
  return uniqueUrls([item.media_url, ...(item.media_candidates || []), item.preview_url, ...(item.preview_candidates || [])])
    .filter((url) => !/\/preview(?:\?|$)/i.test(url));
}


function videoChunkCandidates(item = {}) {
  return uniqueUrls(item.video_chunk_urls || []);
}

async function buildChunkedVideoObjectUrl(item = {}, video = null) {
  const urls = videoChunkCandidates(item);
  if (!urls.length) return '';
  const parts = [];
  let loaded = 0;
  const total = Number(item.video_chunk_bytes || 0);
  if (video) {
    video.dataset.chunkLoading = '1';
    video.dataset.chunkProgress = '0';
  }
  for (const url of urls) {
    const response = await fetch(url, { cache: 'force-cache', credentials: 'same-origin' });
    if (!response.ok) throw new Error(`chunk HTTP ${response.status}`);
    const data = await response.arrayBuffer();
    if (!data.byteLength) throw new Error('chunk vazio');
    parts.push(data); loaded += data.byteLength;
    if (video) video.dataset.chunkProgress = String(total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0);
  }
  const blob = new Blob(parts, { type: String(item.video_chunk_mime || item.mime || 'video/mp4') });
  const objectUrl = URL.createObjectURL(blob);
  if (video) {
    video.dataset.chunkLoading = '0';
    video.dataset.chunkProgress = '100';
    video.__studioframeObjectUrl = objectUrl;
  }
  return objectUrl;
}

function bindPublishedVideoSource(video, item = {}, exhausted = null, options = {}) {
  const chunks = videoChunkCandidates(item);
  if (!chunks.length) return bindVideoSourceFallback(video, videoSourceCandidates(item), exhausted, options);
  const directFallbacks = videoSourceCandidates(item);
  let started = false;
  const defer = Boolean(options.defer);
  const ensure = () => {
    if (started) return;
    started = true;
    buildChunkedVideoObjectUrl(item, video).then((objectUrl) => {
      bindVideoSourceFallback(video, [objectUrl, ...directFallbacks], exhausted, { ...options, defer:false, metadataReady:false, timeoutMs:Math.max(45000, Number(options.timeoutMs || 45000)) });
    }).catch((error) => {
      mediaDiagnostic(item, 'failed', '', `chunked-video:${error?.message || error}`);
      bindVideoSourceFallback(video, directFallbacks, exhausted, { ...options, defer:false });
    });
  };
  video.__studioframeEnsureSource = ensure;
  video.addEventListener('emptied', () => {
    if (video.__studioframeObjectUrl && video.dataset.failed === '1') {
      try { URL.revokeObjectURL(video.__studioframeObjectUrl); } catch (_) {}
      video.__studioframeObjectUrl = '';
    }
  });
  if (!defer) ensure();
  return video;
}

const MEDIA_LOAD_TIMEOUT_MS = 6500;
const MEDIA_NEAR_VIEWPORT_MARGIN = '420px 0px';
const MEDIA_FAILED_URL_TTL_MS = 60000;
const MEDIA_FAILED_URLS = new Map();
const MEDIA_DIAGNOSTICS = window.__STUDIOFRAME_MEDIA_DIAGNOSTICS__ = window.__STUDIOFRAME_MEDIA_DIAGNOSTICS__ || { loaded:0, failed:0, fallback:0, events:[] };
function mediaDiagnostic(item, status, url = '', detail = '') {
  const event={at:new Date().toISOString(),id:String(item?.id||item?.cover_media_id||''),title:String(item?.title||''),status,url:String(url||''),detail:String(detail||'')};
  MEDIA_DIAGNOSTICS.events.push(event); if(MEDIA_DIAGNOSTICS.events.length>120) MEDIA_DIAGNOSTICS.events.splice(0,MEDIA_DIAGNOSTICS.events.length-120);
  if(status==='loaded') MEDIA_DIAGNOSTICS.loaded++; else if(status==='failed') MEDIA_DIAGNOSTICS.failed++; else if(status==='fallback') MEDIA_DIAGNOSTICS.fallback++;
}

function mediaUrlRecentlyFailed(url) {
  const failedAt = MEDIA_FAILED_URLS.get(String(url || ''));
  if (!failedAt) return false;
  if (Date.now() - failedAt > MEDIA_FAILED_URL_TTL_MS) { MEDIA_FAILED_URLS.delete(String(url || '')); return false; }
  return true;
}
function markMediaUrlFailed(url) { if (url) MEDIA_FAILED_URLS.set(String(url), Date.now()); }

function warmMediaOrigins(data = {}) {
  const urls = [];
  const push = (value) => { if (typeof value === 'string' && /^https?:\/\//i.test(value)) urls.push(value); };
  (data.hero_projects || data.projects || []).slice(0, 8).forEach((item) => {
    push(item?.thumbnail_url); push(item?.media_url); push(item?.preview_url);
    (item?.thumbnail_candidates || []).slice(0, 2).forEach(push);
  });
  Object.values(data.hero_assets || {}).slice(0, 4).forEach((item) => { push(item?.thumbnail_url); push(item?.media_url); });
  const origins = [...new Set(urls.map((value) => { try { return new URL(value, location.href).origin; } catch (_) { return ''; } }).filter(Boolean))].slice(0, 3);
  origins.forEach((origin) => {
    if ([...document.head.querySelectorAll('link[data-sf-preconnect]')].some((link) => link.dataset.sfPreconnect === origin)) return;
    const preconnect = document.createElement('link'); preconnect.rel = 'preconnect'; preconnect.href = origin; preconnect.crossOrigin = 'anonymous'; preconnect.dataset.sfPreconnect = origin; document.head.append(preconnect);
    const dns = document.createElement('link'); dns.rel = 'dns-prefetch'; dns.href = origin; document.head.append(dns);
  });
}

function bindVideoSourceFallback(video, candidates, exhausted = null, { defer = false, timeoutMs = 14000, metadataReady = true } = {}) {
  const allSources = uniqueUrls(candidates || []);
  // A transient failure may be retried last; never delete the only stream URL.
  const sources = [
    ...allSources.filter((url) => !mediaUrlRecentlyFailed(url)),
    ...allSources.filter((url) => mediaUrlRecentlyFailed(url)),
  ];
  let sourceIndex = 0;
  let started = false;
  let sourceReady = false;
  let timer = null;
  let activeUrl = '';
  const clearTimer = () => { if (timer) clearTimeout(timer); timer = null; };
  const ready = () => {
    sourceReady = true;
    clearTimer();
    video.dataset.failed = '0';
    video.dataset.ready = '1';
    video.classList.add('is-media-ready');
    mediaDiagnostic({id:video.dataset.mediaId||'',title:video.dataset.mediaTitle||''},'loaded',video.currentSrc||video.src,'video-ready');
  };
  const next = (reason = 'error') => {
    clearTimer();
    if (activeUrl && !sourceReady) {
      markMediaUrlFailed(activeUrl);
      mediaDiagnostic({id:video.dataset.mediaId||'',title:video.dataset.mediaTitle||''},'failed',activeUrl,reason);
    }
    sourceReady = false;
    video.dataset.ready = '0';
    video.classList.remove('is-media-ready');
    if (sourceIndex >= sources.length) {
      video.dataset.failed = '1';
      video.removeAttribute('src');
      try { video.load(); } catch (_) {}
      if (typeof exhausted === 'function') exhausted();
      return;
    }
    video.dataset.failed = '0';
    activeUrl = sources[sourceIndex++];
    video.src = activeUrl;
    try { video.load(); } catch (_) {}
    timer = setTimeout(() => { if (!sourceReady) next('timeout'); }, Math.max(4000, Number(timeoutMs || 14000)));
  };
  const ensure = () => { if (started) return; started = true; next('initial'); };
  video.addEventListener('error', () => next('browser-error'));
  if (metadataReady) video.addEventListener('loadedmetadata', ready);
  else video.addEventListener('loadedmetadata', () => {
    // Metadata proves the candidate is a real media stream. Keep the stable
    // poster visible until a decodable frame exists, but stop treating a slow
    // first frame as a dead URL.
    clearTimer();
    timer = setTimeout(() => { if (!sourceReady) next('frame-timeout'); }, Math.max(30000, Number(timeoutMs || 45000)));
  });
  video.addEventListener('loadeddata', ready);
  video.addEventListener('canplay', ready);
  video.__studioframeEnsureSource = ensure;
  if (!defer) ensure();
  return video;
}

function configureInlineVideoPlayer(video, item = {}, { autoplay = false, muted = false, loop = false, controls = true, preload = 'metadata' } = {}) {
  video.controls = Boolean(controls);
  video.playsInline = true;
  video.autoplay = Boolean(autoplay);
  video.muted = Boolean(muted);
  video.loop = Boolean(loop);
  video.preload = String(preload || 'metadata');
  video.poster = item.thumbnail_url || (item.thumbnail_candidates || [])[0] || '';
  video.dataset.mediaId = String(item.id || '');
  video.dataset.mediaTitle = String(item.title || '');
  // Presentation-only player: suppress the browser's download / remote playback
  // affordances. This is UI hardening, not DRM; the portfolio never links to a
  // downloadable video file as a visitor action.
  video.setAttribute('controlsList', 'nodownload noremoteplayback');
  video.setAttribute('disableRemotePlayback', '');
  video.disableRemotePlayback = true;
  video.addEventListener('contextmenu', (event) => event.preventDefault());
  video.addEventListener('dragstart', (event) => event.preventDefault());
  return video;
}

function ensureVideoSource(video) {
  if (!video) return;
  if (typeof video.__studioframeEnsureSource === 'function') video.__studioframeEnsureSource();
}

function bindDeferredAutoplay(video, target = video, { threshold = 0.18 } = {}) {
  if (!video) return;
  if (!('IntersectionObserver' in window)) { ensureVideoSource(video); if (video.autoplay) video.play().catch(() => {}); return; }
  const loader = new IntersectionObserver((entries, observer) => {
    if (entries.some((entry) => entry.isIntersecting)) { ensureVideoSource(video); observer.disconnect(); }
  }, { rootMargin: MEDIA_NEAR_VIEWPORT_MARGIN, threshold: 0 });
  loader.observe(target);
  const player = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!video.autoplay) return;
      if (entry.isIntersecting && entry.intersectionRatio >= threshold) { ensureVideoSource(video); video.play().catch(() => {}); }
      else video.pause();
    });
  }, { threshold: [0, threshold, .5, .85] });
  player.observe(target);
}


function hexToRgbTuple(value, fallback = '7,7,7') {
  const raw = String(value || '').trim();
  const match = raw.match(/^#([0-9a-f]{6})$/i);
  if (!match) return fallback;
  const hex = match[1];
  return `${parseInt(hex.slice(0,2),16)},${parseInt(hex.slice(2,4),16)},${parseInt(hex.slice(4,6),16)}`;
}

function applyGlobalHeader(builder, navigation, identity) {
  const header = builder.global?.header || {};
  const headerNode = $('#header');
  if (!headerNode) return;
  const items = Array.isArray(header.menu_items) && header.menu_items.length ? header.menu_items.slice() : [
    {id:'projects',label:navigation.projects_label || 'Projetos',visible:navigation.projects_visible !== false,order:10},
    {id:'about',label:navigation.about_label || 'Sobre',visible:navigation.about_visible !== false,order:20},
    {id:'contact',label:navigation.contact_label || 'Contato',visible:navigation.contact_visible !== false,order:30},
  ];
  const nodeById = { projects:$('#menu'), about:$('#navAbout'), contact:$('#navContact') };
  const topnav = $('#topnav');
  topnav?.querySelectorAll('[data-dynamic-menu-item]').forEach((node)=>node.remove());
  const sorted=items.slice().sort((a,b)=>Number(a.order||0)-Number(b.order||0));
  const childMap=new Map(); sorted.forEach((item)=>{if(item.parent_id){if(!childMap.has(item.parent_id))childMap.set(item.parent_id,[]);childMap.get(item.parent_id).push(item);}});
  sorted.filter((item)=>!item.parent_id).forEach((item)=>{
    const children=(childMap.get(item.id)||[]).filter((child)=>child.visible!==false);
    if(children.length && item.target){
      const wrapper=document.createElement('div');wrapper.className='topnav-dropdown';wrapper.dataset.dynamicMenuItem=item.id;const parent=document.createElement('a');parent.href=publicRouteHref(item.target);parent.textContent=item.label||'Página';parent.className='topnav-dropdown-parent';const submenu=document.createElement('div');submenu.className='topnav-submenu';children.forEach((child)=>{const a=document.createElement('a');a.href=publicRouteHref(child.target||'#');a.textContent=child.label||'Página';submenu.append(a);});wrapper.append(parent,submenu);wrapper.hidden=item.visible===false;topnav?.append(wrapper);return;
    }
    let node = nodeById[item.id]; if(!node&&item.target){node=document.createElement('a');node.dataset.dynamicMenuItem=item.id;node.href=publicRouteHref(item.target);nodeById[item.id]=node;} if(!node)return;node.textContent=item.label||node.textContent;node.hidden=item.visible===false;if(node.tagName==='A'&&item.target)node.href=publicRouteHref(item.target);topnav?.append(node);
  });
  const height = Math.max(48, Math.min(160, Number(header.height || 72)));
  const pad = Math.max(1, Math.min(12, Number(header.padding_x || 4)));
  const opacity = Math.max(0, Math.min(100, Number(header.background_opacity ?? 84))) / 100;
  const blur = Math.max(0, Math.min(40, Number(header.blur ?? 18)));
  const desktopFont = Math.max(7, Math.min(32, Number(header.font_size_desktop || 10)));
  const mobileFont = Math.max(9, Math.min(32, Number(header.font_size_mobile || 12)));
  const itemGap = Math.max(4, Math.min(80, Number(header.item_gap || 22)));
  document.documentElement.style.setProperty('--site-header-height', `${height}px`);
  document.documentElement.style.setProperty('--site-header-padding-x', `${pad}vw`);
  document.documentElement.style.setProperty('--site-header-bg-rgb', hexToRgbTuple(header.background_color || '#070707'));
  document.documentElement.style.setProperty('--site-header-bg-opacity', String(opacity));
  document.documentElement.style.setProperty('--site-header-blur', `${blur}px`);
  document.documentElement.style.setProperty('--site-header-text', header.text_color || '#f4f4ef');
  document.documentElement.style.setProperty('--site-header-hover', header.hover_color || '#ffffff');
  const headerFont = header.font_family === 'body' ? 'var(--body)' : header.font_family === 'system' ? 'Arial, sans-serif' : 'var(--display)';
  document.documentElement.style.setProperty('--site-header-font-family', headerFont);
  document.documentElement.style.setProperty('--site-header-font-desktop', `${desktopFont}px`);
  document.documentElement.style.setProperty('--site-header-font-mobile', `${mobileFont}px`);
  document.documentElement.style.setProperty('--site-header-font-weight', String(header.font_weight || '500'));
  document.documentElement.style.setProperty('--site-header-gap', `${itemGap}px`);
  headerNode.dataset.headerMode = header.background_mode || 'adaptive';
  headerNode.dataset.headerBorder = header.border === false ? 'off' : 'on';
  document.body.dataset.headerSticky = header.sticky === false ? 'off' : 'on';
  document.body.dataset.headerMobileMode = header.mobile_mode || 'drawer';
  const logo = $('#logo');
  if (logo) { logo.textContent = header.logo_label || identity.studio_name || 'MENSAGEM STUDIO'; logo.hidden = header.logo_visible === false; }
  if(currentCustomPage()){ const about=$('#navAbout'),contact=$('#navContact'); if(about)about.href='/#about'; if(contact)contact.href='/#contact'; if(logo)logo.href='/'; }
}


function socialIconSvg(id){
  const paths={instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.7" r="1" class="fill"/>',behance:'<path d="M3 6h7a4 4 0 0 1 0 8H3V6Zm0 8h8a4 4 0 0 1 0 8H3v-8Zm11-5h7M14 16h8c0-4-1.6-6-4-6s-4 2-4 6c0 3.2 1.7 5 4.5 5 1.8 0 3-.6 3.8-1.8"/>',linkedin:'<path d="M5 9v10M5 5v.1M10 19V9m0 4c1-2.5 7-3.5 7 2v4M17 13v6"/>',youtube:'<path d="M4 7.5c.4-1.4 1.5-2 3.1-2.2C9 5 11 5 12 5s3 .1 4.9.3c1.6.2 2.7.8 3.1 2.2.3 1.2.5 3 .5 4.5s-.2 3.3-.5 4.5c-.4 1.4-1.5 2-3.1 2.2-1.9.2-3.9.3-4.9.3s-3-.1-4.9-.3c-1.6-.2-2.7-.8-3.1-2.2-.3-1.2-.5-3-.5-4.5s.2-3.3.5-4.5Z"/><path d="m10 9 5 3-5 3V9Z" class="fill"/>',whatsapp:'<path d="M20 11.5a8 8 0 0 1-11.7 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.5 3 2 4.5 5 5.5.8.3 1.4-.7 1.8-1.2"/> '};
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[id]||'<circle cx="12" cy="12" r="8"/>'}</g></svg>`;
}
function applyGlobalFooter(builder, identity){
  const footer=builder.global?.footer||{}; const node=$('#globalFooter'); if(!node)return; node.hidden=footer.visible===false; if(node.hidden)return;
  const brand=$('#footerName'); if(brand)brand.textContent=footer.studio_name||identity.studio_name||'MENSAGEM STUDIO'; const tagline=$('#footerTagline'); if(tagline)tagline.textContent=footer.tagline||''; const copyright=$('#footerCopyright'); if(copyright)copyright.textContent=footer.copyright||'';
  const whatsapp=$('#footerWhatsapp'); const number=String(footer.whatsapp_number||'5541999999937').replace(/\D/g,''); if(whatsapp){const message=encodeURIComponent(footer.whatsapp_message||'');whatsapp.href=number?`https://wa.me/${number}${message?`?text=${message}`:''}`:'#';whatsapp.hidden=footer.whatsapp_visible===false||!number;whatsapp.querySelector('span').textContent=footer.whatsapp_label||'Contrate nossos serviços de design';}
  const socials=$('#footerSocials'); if(socials){socials.replaceChildren();(Array.isArray(footer.socials)?footer.socials:[]).filter((item)=>item.visible!==false&&item.url).sort((a,b)=>Number(a.order||0)-Number(b.order||0)).forEach((item)=>{const a=document.createElement('a');a.href=item.url;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label',item.label||item.id);a.title=item.label||item.id;a.innerHTML=socialIconSvg(item.id);socials.append(a);});}
  node.dataset.align=footer.alignment||'between';node.dataset.divider=footer.divider===false?'off':'on';document.documentElement.style.setProperty('--footer-bg',footer.background_color||'#070707');document.documentElement.style.setProperty('--footer-text',footer.text_color||'#f4f4ef');document.documentElement.style.setProperty('--footer-muted',footer.muted_color||'#8e918f');document.documentElement.style.setProperty('--footer-font-size',`${Math.max(9,Number(footer.font_size||12))}px`);document.documentElement.style.setProperty('--footer-icon-size',`${Math.max(14,Number(footer.icon_size||20))}px`);document.documentElement.style.setProperty('--footer-gap',`${Math.max(4,Number(footer.gap||18))}px`);
}

function applySiteAppearance(builder = {}, identity = {}) {
  const appearance = builder.appearance || {};
  const mode = ['apple','dark','light','contrast','custom'].includes(appearance.color_mode) ? appearance.color_mode : 'dark';
  const defaults = mode === 'apple'
    ? {bg:'#F5F5F7',surface:'#FFFFFF',text:'#1D1D1F',muted:'#6E6E73',accent:'#0071E3'}
    : mode === 'light'
    ? {bg:'#F3F6FA',surface:'#FFFFFF',text:'#172033',muted:'#58697D',accent:'#006B5B'}
    : (mode === 'contrast'
      ? {bg:'#030303',surface:'#111111',text:'#FFFFFF',muted:'#E0E0E0',accent:'#66F2C2'}
      : {bg:'#07090D',surface:'#111722',text:'#F4F7FB',muted:'#AAB5C4',accent:identity.accent_color||'#2FD59A'});
  const values = {bg:appearance.background_color||defaults.bg,surface:appearance.surface_color||defaults.surface,text:appearance.text_color||defaults.text,muted:appearance.muted_color||defaults.muted,accent:appearance.accent_color||defaults.accent};
  document.documentElement.style.setProperty('--bg',values.bg);
  document.documentElement.style.setProperty('--surface',values.surface);
  document.documentElement.style.setProperty('--text',values.text);
  document.documentElement.style.setProperty('--muted',values.muted);
  document.documentElement.style.setProperty('--accent',values.accent);
  document.documentElement.style.setProperty('--line',`color-mix(in srgb, ${values.text} 19%, transparent)`);
  document.documentElement.style.setProperty('--site-block-radius',`${Math.max(0,Math.min(40,Number(appearance.block_radius??14)))}px`);
  const brandFont = appearance.brand_font_family === 'body' ? 'var(--body)' : (appearance.brand_font_family === 'system' ? 'Arial, sans-serif' : 'var(--display)');
  document.documentElement.style.setProperty('--site-brand-font-family',brandFont);
  document.documentElement.style.setProperty('--site-brand-font-desktop',`${Math.max(8,Math.min(48,Number(appearance.brand_font_size_desktop??12)))}px`);
  document.documentElement.style.setProperty('--site-brand-font-mobile',`${Math.max(8,Math.min(40,Number(appearance.brand_font_size_mobile??12)))}px`);
  document.documentElement.style.setProperty('--site-brand-font-weight',String(appearance.brand_font_weight||'500'));
  document.documentElement.style.setProperty('--site-brand-letter-spacing',`${Math.max(-.05,Math.min(.4,Number(appearance.brand_letter_spacing??.16)))}em`);
  document.documentElement.style.setProperty('--site-brand-text-transform',appearance.brand_text_transform==='none'?'none':'uppercase');
  document.documentElement.style.setProperty('--site-brand-color',appearance.brand_color||values.text);
  const logo=$('#logo');
  if(logo){logo.textContent=appearance.brand_title||logo.textContent||identity.studio_name||'MENSAGEM STUDIO';logo.hidden=appearance.brand_title_visible===false;}
  document.body.dataset.siteColorMode=mode;
  document.body.dataset.backgroundStyle=appearance.background_style||'aurora';
  document.body.dataset.blockStyle=appearance.block_style||'glass';
  document.body.dataset.blockSpacing=appearance.block_spacing||'normal';
  document.body.dataset.shadowStyle=appearance.shadow_style||'soft';
  const themeMeta=document.querySelector('meta[name="theme-color"]');if(themeMeta)themeMeta.content=values.bg;
  return appearance;
}

function renderSiteBuilder() {
  const builder = DATA.site_builder || {};
  const navigation = builder.navigation || {};
  const hero = builder.hero || {};
  const lettering = builder.lettering || {};
  const projects = builder.projects || {};
  const about = builder.about || {};
  const contact = builder.contact || {};
  const identity = DATA.identity || {};
  applyGlobalHeader(builder, navigation, identity);
  const appearance = applySiteAppearance(builder, identity);
  applyGlobalFooter(builder, identity);
  const animations = builder.animations || {};
  const globalAnimation = animations.global || {};
  const textAnimation = animations.texts || {};
  visualLayout = builder.layout || {};
  const motionPreset = visualLayout.motion_enabled === false ? 'off' : (visualLayout.motion_preset || 'cinematic');
  document.body.dataset.motion = motionPreset;
  document.body.dataset.reveal = visualLayout.reveal_style || 'cinematic';
  document.body.dataset.projectViewer = visualLayout.project_viewer || 'fullscreen';
  document.body.dataset.cardInteraction = visualLayout.card_interaction || 'responsive';
  document.body.dataset.cardVideoPreview = visualLayout.card_video_preview === false ? 'off' : (visualLayout.card_video_preview_mode || 'hover');
  document.body.dataset.ambient = visualLayout.ambient_motion === false ? 'off' : (visualLayout.ambient_strength || 'medium');
  document.body.dataset.backgroundMotion = appearance.background_animation || globalAnimation.background_motion || document.body.dataset.ambient || 'medium';
  document.body.dataset.sectionFlow = globalAnimation.section_flow || 'integrated';
  document.body.dataset.textAnimation = textAnimation.type || 'reveal';
  document.body.dataset.textDirection = textAnimation.direction || 'up';
  document.documentElement.style.setProperty('--text-duration', `${Math.max(0, Number(textAnimation.duration ?? 800))}ms`);
  document.documentElement.style.setProperty('--text-delay', `${Math.max(0, Number(textAnimation.delay ?? 100))}ms`);
  document.documentElement.style.setProperty('--text-easing', textAnimation.easing || 'ease-out');
  document.documentElement.style.setProperty('--text-offset', `${Math.max(0, Number(textAnimation.offset ?? 40))}px`);
  document.body.classList.toggle('hero-expand-enabled', visualLayout.hero_expand !== false);
  document.body.classList.toggle('card-parallax-enabled', visualLayout.card_parallax !== false);

  const heroNode = $('#hero');
  if (heroNode) {
    heroNode.dataset.height = hero.height || 'fullscreen';
    heroNode.dataset.format = hero.format || 'cinema21';
    heroNode.dataset.fit = hero.fit || 'cover';
    heroNode.dataset.mobileFit = hero.mobile_fit || hero.fit || 'cover';
    heroNode.dataset.mobileFormat = hero.mobile_format || 'portrait45';
    heroNode.dataset.textPosition = hero.text_position || 'bottom-left';
    heroNode.dataset.overlay = hero.overlay || 'medium';
    heroNode.dataset.effect = hero.effect || 'cinematic';
    const refW=Math.max(640,Number(hero.reference_width||2560));
    const refH=Math.max(320,Number(hero.reference_height||1080));
    heroNode.style.setProperty('--hero-reference-ratio', String(refW/refH));
    heroNode.style.setProperty('--hero-reference-height-vw', `${(refH/refW)*100}vw`);
    heroNode.style.setProperty('--hero-frame-bg', hero.frame_bg || '#090909');
    heroNode.style.setProperty('--hero-position-x', `${Math.max(0, Math.min(100, Number(hero.position_x ?? 50)))}%`);
    heroNode.style.setProperty('--hero-position-y', `${Math.max(0, Math.min(100, Number(hero.position_y ?? 50)))}%`);
    heroNode.style.setProperty('--hero-mobile-position-x', `${Math.max(0, Math.min(100, Number(hero.mobile_position_x ?? hero.position_x ?? 50)))}%`);
    heroNode.style.setProperty('--hero-mobile-position-y', `${Math.max(0, Math.min(100, Number(hero.mobile_position_y ?? hero.position_y ?? 50)))}%`);
    const mobileRefW=Math.max(480,Number(hero.mobile_reference_width||1080));
    const mobileRefH=Math.max(480,Number(hero.mobile_reference_height||1350));
    heroNode.style.setProperty('--hero-mobile-reference-ratio', String(mobileRefW/mobileRefH));
    heroNode.style.setProperty('--hero-mobile-reference-height-vw', `${(mobileRefH/mobileRefW)*100}vw`);
  }
  if ($('#heroTitle')) $('#heroTitle').textContent = hero.title || identity.portfolio_title || 'Portfólio';
  if ($('#heroDescription')) $('#heroDescription').textContent = hero.subtitle || identity.description || '';
  if ($('#heroKicker')) $('#heroKicker').textContent = hero.kicker || 'Portfólio · Direção criativa';
  if ($('#heroCtaLabel')) $('#heroCtaLabel').textContent = hero.cta_label || 'Explorar projeto';
  if ($('#heroScrollLabel')) $('#heroScrollLabel').textContent = hero.scroll_label || 'Role para explorar';
  document.documentElement.style.setProperty('--hero-rotation-ms', `${Math.max(3, Math.min(20, Number(hero.rotation_seconds || 6.2))) * 1000}ms`);

  const letteringNode = $('#lettering');
  if (letteringNode) {
    letteringNode.hidden = lettering.visible === false || !String(lettering.text || identity.hero_line || '').trim();
    letteringNode.dataset.style = lettering.style || 'split';
    letteringNode.dataset.direction = lettering.direction || 'left';
    letteringNode.dataset.speed = lettering.speed || 'medium';
  }
  if ($('#letteringEyebrow')) $('#letteringEyebrow').textContent = lettering.eyebrow || identity.studio_name || 'Mensagem Studio';
  const letteringText = String(lettering.text || identity.hero_line || '');
  if ($('#letteringText')) $('#letteringText').textContent = letteringText;
  if ($('#letteringClone')) $('#letteringClone').textContent = letteringText;

  if ($('#menu')) $('#menu').textContent = navigation.projects_label || 'Projetos';
  if ($('#navAbout')) $('#navAbout').textContent = navigation.about_label || 'Sobre';
  if ($('#navContact')) $('#navContact').textContent = navigation.contact_label || 'Contato';
  if ($('#siteMenuLabel')) $('#siteMenuLabel').textContent = navigation.menu_label || 'Menu';
  if ($('#sideMenuTitle')) $('#sideMenuTitle').textContent = navigation.menu_title || 'Navegação';
  if ($('#sideMenuStudio')) $('#sideMenuStudio').textContent = identity.studio_name || 'Mensagem Studio';
  document.body.classList.toggle('side-menu-enabled', navigation.side_menu_enabled !== false);
  document.body.dataset.floatingPosition = navigation.floating_position === 'right' ? 'right' : 'left';
  document.documentElement.style.setProperty('--site-floating-button-size', `${Math.max(32,Math.min(72,Number(navigation.floating_button_size||42)))}px`);
  document.documentElement.style.setProperty('--site-floating-gap', `${Math.max(0,Math.min(32,Number(navigation.floating_gap??8)))}px`);
  document.documentElement.style.setProperty('--site-menu-panel-width', `${Math.max(320,Math.min(760,Number(navigation.menu_panel_width||520)))}px`);
  document.documentElement.style.setProperty('--site-menu-text-size', `${Math.max(24,Math.min(64,Number(navigation.menu_text_size||48)))}px`);
  const floatingWhatsapp=$('#floatingWhatsapp');
  if(floatingWhatsapp){
    const globalFooter=builder.global?.footer||{}, serviceConfig=builder.services||{};
    const number=String(navigation.floating_whatsapp_number||globalFooter.whatsapp_number||serviceConfig.whatsapp_number||'').replace(/\D/g,'');
    const message=String(navigation.floating_whatsapp_message||globalFooter.whatsapp_message||serviceConfig.whatsapp_message||'').trim();
    floatingWhatsapp.href=number?`https://wa.me/${number}${message?`?text=${encodeURIComponent(message)}`:''}`:'#';
    floatingWhatsapp.hidden=navigation.floating_whatsapp_visible===false||!number;
    const label=$('#floatingWhatsappLabel');if(label)label.textContent=navigation.floating_whatsapp_label||'WhatsApp';
  }

  if ($('#projectsEyebrow')) $('#projectsEyebrow').textContent = projects.eyebrow || 'Portfólio selecionado';
  if ($('#projectsTitle')) $('#projectsTitle').textContent = projects.title || 'Projetos';
  const showProjects = projects.visible !== false;
  const filterBarMode=['menu','inline'].includes(projects.filters?.display_mode)?projects.filters.display_mode:'inline';
  document.body.dataset.filterBarMode=filterBarMode;
  $('#portfolioHeading')?.toggleAttribute('hidden', !showProjects);
  $('#filters')?.toggleAttribute('hidden', !showProjects || filterBarMode==='menu');
  $('#projects')?.toggleAttribute('hidden', !showProjects);
  $('#menu')?.toggleAttribute('hidden', !showProjects || navigation.projects_visible === false);

  if ($('#aboutEyebrow')) $('#aboutEyebrow').textContent = about.eyebrow || 'Mensagem Studio';
  if ($('#aboutTitle')) $('#aboutTitle').textContent = about.title || '';
  if ($('#aboutBody')) $('#aboutBody').textContent = about.body || '';
  $('#about')?.toggleAttribute('hidden', about.visible === false);
  $('#navAbout')?.toggleAttribute('hidden', about.visible === false || navigation.about_visible === false);

  if ($('#contactEyebrow')) $('#contactEyebrow').textContent = contact.eyebrow || 'Contato';
  if ($('#contactTitle')) $('#contactTitle').textContent = contact.title || '';
  if ($('#contactBody')) $('#contactBody').textContent = contact.body || '';
  $('#contact')?.toggleAttribute('hidden', contact.visible === false);
  $('#navContact')?.toggleAttribute('hidden', contact.visible === false || navigation.contact_visible === false);

  const contactSite = $('#contactSite');
  const contactInstagram = $('#contactInstagram');
  if (contactSite) { contactSite.href = identity.site_url || '#'; contactSite.hidden = !identity.site_url; }
  if (contactInstagram) { contactInstagram.href = identity.instagram_url || '#'; contactInstagram.hidden = !identity.instagram_url; }
}


const CORE_HOME_BLOCK_IDS = {
  hero: 'hero', intro: 'introBlock', lettering: 'lettering', projects: 'projectsBlock', about: 'about', contact: 'contact',
};

function publicHomeBlocks() {
  const defaults = [
    { id:'core-hero', type:'hero', visible:true, core:true, section_size:'viewport', section_width:'full' },
    { id:'core-intro', type:'intro', visible:true, core:true, section_size:'normal', section_width:'full' },
    { id:'core-lettering', type:'lettering', visible:true, core:true, section_size:'normal', section_width:'full' },
    { id:'core-projects', type:'projects', visible:true, core:true, section_size:'normal', section_width:'full', grid_columns:'3' },
    { id:'core-about', type:'about', visible:true, core:true, section_size:'normal', section_width:'full' },
    { id:'core-contact', type:'contact', visible:true, core:true, section_size:'normal', section_width:'full' },
  ];
  if (!Array.isArray(DATA.site_builder?.home?.blocks)) return defaults;
  return DATA.site_builder.home.blocks.filter((block) => block && block.type).map((block) => ({ section_size:'normal', section_width:'full', section_background:'none', ...block }));
}

function projectForBlock(ref = '') {
  const projects = (DATA.projects || []).filter((project) => !project.hidden);
  if (ref) {
    const match = projects.find((project) => String(project.project_id || '') === String(ref) || String(project.id || '') === String(ref));
    if (match) return match;
  }
  return projects.find((project) => project.featured) || projects.find((project) => project.hero) || projects[0] || null;
}

function blockHeading(block, fallbackTitle = '') {
  const head = document.createElement('div');
  head.className = 'modular-heading';
  if (block.eyebrow) {
    const eyebrow = document.createElement('small');
    eyebrow.textContent = block.eyebrow;
    head.append(eyebrow);
  }
  const titleText = block.title || fallbackTitle;
  if (titleText) {
    const title = document.createElement('h2');
    title.textContent = titleText;
    title.dataset.parallaxText = '10';
    head.append(title);
  }
  if (block.body) {
    const body = document.createElement('p');
    body.textContent = block.body;
    head.append(body);
  }
  return head;
}

function blockPoster(project, className = '') {
  const media = document.createElement('div');
  media.className = `modular-media ${className}`.trim();
  const inner = document.createElement('div');
  inner.className = 'modular-media-inner';
  if (visualLayout.card_parallax !== false) inner.dataset.parallax = 'detail';
  const asset = heroAsset(project);
  const image = poster(asset);
  inner.append(image);
  media.append(inner);
  return media;
}

function bindBlockOpen(node, project) {
  if (!node || !project) return;
  node.classList.add('is-clickable');
  node.setAttribute('role', 'button');
  node.setAttribute('tabindex', '0');
  node.setAttribute('aria-label', `Abrir projeto ${project.title || ''}`.trim());
  const open = () => openProjectDetail(project);
  node.addEventListener('click', (event) => {
    if (event.target.closest('a,button,video,iframe')) return;
    open();
  });
  node.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
  });
}

function createShowcaseBlock(block) {
  const project = projectForBlock(block.project_id);
  if (!project) return null;
  const section = document.createElement('section');
  section.className = 'modular-block block-showcase reveal';
  const media = blockPoster(project, 'showcase-media');
  const copy = blockHeading(block, project.title);
  if (!block.body && project.description) {
    const p = document.createElement('p'); p.textContent = project.description; copy.append(p);
  }
  const action = document.createElement('span'); action.className = 'modular-action'; action.textContent = 'Ver projeto ↗'; copy.append(action);
  section.append(media, copy);
  bindBlockOpen(section, project);
  return section;
}

function createFullMediaBlock(block,context={}) {
  const section=document.createElement('section');section.className='modular-block block-full-media reveal';if(block.title) section.append(blockHeading(block));
  if(block.media_id&&typeof context.mediaResolver==='function'){
    const direct=context.mediaResolver(block.media_id),media=document.createElement('div');media.className='full-media-stage';const directNode=context.mediaNode?.(direct)||null;if(directNode)media.append(directNode);else return null;section.append(media);if(block.caption){const cap=document.createElement('p');cap.className='service-commercial-caption';cap.textContent=block.caption;section.append(cap);}return section;
  }
  const project=projectForBlock(block.project_id);if(!project)return null;const gallery=galleryFor(project);const mediaItem=(gallery.items||[]).find((item)=>['image','video'].includes(item.type))||project;const media=document.createElement('div');media.className='full-media-stage';if(mediaItem.type==='video')media.append(projectVideo(mediaItem));else{const inner=document.createElement('div');inner.className='modular-media-inner';inner.dataset.parallax='detail';inner.append(projectImage(mediaItem));media.append(inner);}section.append(media);bindBlockOpen(media,project);return section;
}

function createSplitBlock(block) {
  const project = projectForBlock(block.project_id);
  if (!project) return null;
  const section = document.createElement('section');
  section.className = `modular-block block-split reveal media-${block.media_side === 'right' ? 'right' : 'left'}`;
  const media = blockPoster(project, 'split-media');
  const copy = blockHeading(block, project.title);
  if (!block.body && project.description) { const p=document.createElement('p'); p.textContent=project.description; copy.append(p); }
  section.append(media, copy);
  bindBlockOpen(media, project);
  return section;
}

function createHorizontalProjectsBlock(block) {
  const projects = editorialProjectsForBlock(block, 12);
  if (!projects.length) return null;
  const section = document.createElement('section');
  section.className = 'modular-block block-horizontal reveal';
  section.append(blockHeading(block, 'Projetos em destaque'));
  const track = document.createElement('div'); track.className = 'horizontal-project-track';
  projects.forEach((project, index) => track.append(card(project, index)));
  section.append(track);
  return section;
}

function modularProjectsForCategory(categoryId = 'all', limit = 12) {
  return (DATA.projects || []).filter((project) => {
    if (project.hidden) return false;
    if (!categoryId || categoryId === 'all') return true;
    return String(project.section_id || project.physical_category_id || '') === String(categoryId);
  }).slice(0, Math.max(1, Number(limit) || 12));
}

function createAutoCarouselBlock(block) {
  const projects = editorialProjectsForBlock(block, 8);
  if (!projects.length) return null;
  const section = document.createElement('section');
  section.className = 'modular-block block-auto-carousel reveal';
  section.dataset.speed = block.speed || 'medium';
  section.dataset.direction = block.direction || 'left';
  section.dataset.pauseHover = block.pause_on_hover === false ? 'false' : 'true';
  section.dataset.motionMode = block.motion_mode === 'manual' ? 'manual' : 'auto';
  section.dataset.cardGap = block.card_gap || 'normal';
  section.dataset.hoverEffect = block.hover_effect || 'glow';
  section.append(blockHeading(block, 'Em destaque'));
  const viewport = document.createElement('div'); viewport.className = 'auto-carousel-viewport';
  const strip = document.createElement('div'); strip.className = 'auto-carousel-strip';
  const addSet = (clone = false) => projects.forEach((project, index) => {
    const node = applyCarouselCardAppearance(card(project, index), block);
    node.classList.add('auto-carousel-card');
    if (clone) { node.dataset.carouselClone = '1'; node.setAttribute('aria-hidden','true'); node.tabIndex = -1; }
    strip.append(node);
  });
  addSet(false);
  const autoMode = section.dataset.motionMode === 'auto';
  if (autoMode) addSet(true);
  viewport.append(strip); section.append(viewport);
  if (!autoMode || reduced) {
    viewport.classList.add('is-manual');
    return section;
  }
  let raf = 0; let last = 0; let paused = false;
  const pxPerSecond = { slow:18, medium:30, fast:48 }[block.speed || 'medium'] || 30;
  const direction = block.direction === 'right' ? -1 : 1;
  const tickCarousel = (time) => {
    if (!last) last = time;
    const delta = Math.min(40, time - last); last = time;
    if (!paused && viewport.scrollWidth > viewport.clientWidth) {
      viewport.scrollLeft += direction * pxPerSecond * delta / 1000;
      const half = viewport.scrollWidth / 2;
      if (direction > 0 && viewport.scrollLeft >= half) viewport.scrollLeft -= half;
      if (direction < 0 && viewport.scrollLeft <= 0) viewport.scrollLeft += half;
    }
    raf = requestAnimationFrame(tickCarousel);
  };
  raf = requestAnimationFrame(tickCarousel);
  const pauseEnabled = block.pause_on_hover !== false;
  if (pauseEnabled) {
    section.addEventListener('pointerenter', () => { paused = true; });
    section.addEventListener('pointerleave', () => { paused = false; last = performance.now(); });
    section.addEventListener('focusin', () => { paused = true; });
    section.addEventListener('focusout', () => { paused = false; last = performance.now(); });
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (!entry.isIntersecting) paused = true; else if (!pauseEnabled || !section.matches(':hover')) { paused = false; last = performance.now(); } });
  }, { threshold:[0,.05] });
  observer.observe(section);
  section.addEventListener('DOMNodeRemoved', () => { if (raf) cancelAnimationFrame(raf); }, { once:true });
  return section;
}

function createSpotlightBlock(block) {
  const project = projectForBlock(block.project_id);
  if (!project) return null;
  const section = document.createElement('section');
  section.className = 'modular-block block-spotlight reveal';
  const media = blockPoster(project, 'spotlight-media');
  const copy = blockHeading(block, project.title);
  if (!block.body && project.description) { const p=document.createElement('p'); p.textContent=project.description; copy.append(p); }
  const action = document.createElement('button'); action.type='button'; action.className='spotlight-action story-link'; action.textContent = block.button_label || 'Ver projeto';
  action.addEventListener('click', (event) => { event.stopPropagation(); openProjectDetail(project); });
  copy.append(action); section.append(media, copy); bindBlockOpen(media, project);
  return section;
}

function createMarqueeBlock(block) {
  const text = String(block.title || '').trim();
  if (!text) return null;
  const section = document.createElement('section'); section.className='modular-block block-marquee reveal';
  section.dataset.speed = block.speed || 'medium'; section.dataset.direction = block.direction || 'left';
  if (block.eyebrow) { const eyebrow=document.createElement('div'); eyebrow.className='marquee-eyebrow'; eyebrow.textContent=block.eyebrow; section.append(eyebrow); }
  const viewport=document.createElement('div'); viewport.className='marquee-viewport';
  const track=document.createElement('div'); track.className='marquee-strip';
  for(let i=0;i<4;i++){ const span=document.createElement('span'); span.textContent=text; if(i>1) span.setAttribute('aria-hidden','true'); track.append(span); }
  viewport.append(track); section.append(viewport); return section;
}

function createCtaBlock(block,context={}) {
  const section=document.createElement('section');section.className='modular-block block-cta reveal';const copy=blockHeading(block,context.defaultTitle||'Vamos criar algo juntos?');const raw=String(block.button_url||context.defaultButtonUrl||'').trim();const label=block.button_label||context.defaultButtonLabel||'Entrar em contato';if(label){const allowed=/^(https?:|mailto:|tel:)/i.test(raw)?raw:'';const action=document.createElement(allowed?'a':'button');action.className='cta-action story-link';action.textContent=label;if(allowed){action.href=allowed;if(/^https?:/i.test(allowed)){action.target='_blank';action.rel='noopener';}}else{action.type='button';action.addEventListener('click',()=>$('#contact')?.scrollIntoView({behavior:'auto'}));}copy.append(action);}section.append(copy);return section;
}

function createTextBlock(block) {
  const section = document.createElement('section');
  section.className = 'modular-block block-text reveal';
  section.append(blockHeading(block));
  return section;
}

function structuredLines(value='') {
  return String(value || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
    const split = line.indexOf('|');
    return split < 0 ? { lead:line, body:'' } : { lead:line.slice(0,split).trim(), body:line.slice(split+1).trim() };
  });
}

function createStructuredContentBlock(block, type) {
  const items = structuredLines(block.body);
  if (!items.length) return null;
  const section = document.createElement('section');
  section.className = `modular-block block-${type} reveal`;
  section.append(blockHeading({ ...block, body:'' }, block.title || ''));
  const list = document.createElement('div'); list.className = `${type}-list`;
  items.forEach((item, index) => {
    if (type === 'accordion') {
      const details=document.createElement('details');details.className='accordion-item';
      const summary=document.createElement('summary');summary.innerHTML=`<span>${String(index+1).padStart(2,'0')}</span><strong>${esc(item.lead)}</strong><b>＋</b>`;
      const p=document.createElement('p');p.textContent=item.body;details.append(summary,p);list.append(details);return;
    }
    const article=document.createElement('article');article.className=`${type}-item`;
    const number=document.createElement('span');number.textContent=String(index+1).padStart(2,'0');
    const lead=document.createElement(type==='metrics'?'strong':'h3');lead.textContent=item.lead;
    const body=document.createElement('p');body.textContent=item.body;
    article.append(number,lead,body);list.append(article);
  });
  section.append(list);return section;
}

function createCustomLetteringBlock(block) {
  const text = String(block.title || '').trim();
  if (!text) return null;
  const section = document.createElement('section');
  section.className = 'modular-block block-lettering reveal';
  section.dataset.style = block.style || 'split';
  section.dataset.direction = block.direction || 'left';
  section.dataset.speed = 'medium';
  if (block.eyebrow) { const eyebrow=document.createElement('div'); eyebrow.className='lettering-eyebrow'; eyebrow.textContent=block.eyebrow; section.append(eyebrow); }
  const mask=document.createElement('div'); mask.className='lettering-mask';
  const track=document.createElement('div'); track.className='lettering-track block-lettering-track'; track.dataset.modularLettering='1';
  const primary=document.createElement('span'); primary.className='lettering-primary'; primary.textContent=text;
  const outline=document.createElement('span'); outline.className='lettering-outline'; outline.textContent=text; outline.setAttribute('aria-hidden','true');
  track.append(primary,outline); mask.append(track); section.append(mask);
  return section;
}

function createVideoFeatureBlock(block) {
  const project = projectForBlock(block.project_id);
  if (!project) return null;
  const gallery = galleryFor(project);
  const item = (gallery.items || []).find((entry) => entry.type === 'video') || (project.type === 'video' ? project : null);
  if (!item) return createShowcaseBlock(block);
  const section=document.createElement('section'); section.className='modular-block block-video-feature reveal';
  const copy=blockHeading(block,project.title);
  if (!block.body && project.description) { const p=document.createElement('p'); p.textContent=project.description; copy.append(p); }
  const media=document.createElement('div'); media.className='video-feature-stage';
  if (IS_EDITOR_PREVIEW && item.media_url && block.autoplay !== false) {
    const video=document.createElement('video'); video.src=item.media_url; video.muted=true; video.loop=true; video.autoplay=true; video.playsInline=true; video.controls=false; video.poster=item.thumbnail_url || ''; video.addEventListener('error',()=>video.replaceWith(projectVideo(item))); media.append(video);
  } else {
    const video=document.createElement('video'); video.muted=true; video.loop=true; video.autoplay=block.autoplay!==false; video.playsInline=true; video.controls=false; video.poster=item.thumbnail_url || ''; video.preload='none';
    bindPublishedVideoSource(video,item,()=>video.replaceWith(projectVideoFallback(item)),{defer:true,metadataReady:false,timeoutMs:45000}); media.append(video); bindDeferredAutoplay(video,media);
  }
  section.append(copy,media);
  return section;
}


function publicMediaById(mediaId = '') {
  const id = String(mediaId || '');
  if (!id) return null;
  for (const project of (DATA.projects || [])) {
    if (String(project.id || '') === id) return { ...project, _project: project };
    const item = (project.gallery_items || []).find((entry) => String(entry.id || '') === id);
    if (item) return { ...item, _project: project };
  }
  const asset = (DATA.hero_assets || []).find?.((entry) => String(entry.id || '') === id);
  return asset ? { ...asset, _project: null } : null;
}

function editorialProjectFromItem(item = {}) {
  let project = projectForBlock(item.project_id || '');
  const media = publicMediaById(item.media_id || '');
  if (!project && media?._project) project = media._project;
  if (!project) return null;
  const result = { ...project };
  if (item.title) result.title = item.title;
  if (item.description) result.description = item.description;
  if (media) {
    result.type = media.type || result.type;
    result.media_url = media.media_url || result.media_url;
    result.media_candidates = media.media_candidates || result.media_candidates;
    result.thumbnail_url = media.thumbnail_url || media.media_url || result.thumbnail_url;
    result.thumbnail_candidates = media.thumbnail_candidates || media.media_candidates || result.thumbnail_candidates;
    result.preview_url = media.preview_url || result.preview_url;
    result.preview_candidates = media.preview_candidates || result.preview_candidates;
    result.editorial_media_id = media.id || '';
  }
  result.editorial_action_label = item.action_label || '';
  return result;
}

function editorialProjectsForBlock(block, fallbackLimit = 12) {
  const configured = Array.isArray(block.items) ? block.items.map(editorialProjectFromItem).filter(Boolean) : [];
  if (configured.length) return configured;
  if (block.content_mode === 'selected') return [];
  return modularProjectsForCategory(block.category_id || 'all', fallbackLimit);
}

function applyCarouselCardAppearance(node, block = {}) {
  if (!node) return node;
  const media = node.querySelector('.media');
  const ratios = { '16x9':'16 / 9', '4x3':'4 / 3', '1x1':'1 / 1', '4x5':'4 / 5' };
  if (media) media.style.aspectRatio = ratios[block.card_ratio || '16x9'] || ratios['16x9'];
  node.dataset.carouselHover = block.hover_effect || 'glow';
  node.style.setProperty('--carousel-cards-desktop', String(Math.max(2, Math.min(4, Number(block.cards_desktop || 3)))));
  node.style.setProperty('--carousel-cards-mobile', String(Math.max(1, Math.min(2, Number(block.cards_mobile || 1)))));
  return node;
}

function createEditorialCarouselBlock(block) {
  const projects = editorialProjectsForBlock(block, 12);
  if (!projects.length) return null;
  const section = document.createElement('section');
  const format = block.format === 'card45' ? 'card45' : 'wide';
  const mode = block.motion_mode === 'auto' ? 'auto' : 'manual';
  section.className = `modular-block editorial-section block-editorial-carousel format-${format} mode-${mode} reveal`;
  section.dataset.speed = block.speed || 'medium';
  section.dataset.direction = block.direction || 'left';
  section.dataset.cardGap = block.card_gap || 'normal';
  section.dataset.hoverEffect = block.hover_effect || 'glow';
  section.append(blockHeading(block, 'Projetos em movimento'));
  const shell=document.createElement('div'); shell.className='editorial-carousel-shell';
  const viewport=document.createElement('div'); viewport.className='editorial-carousel-viewport';
  const strip=document.createElement('div'); strip.className='editorial-carousel-strip';
  const appendSet=(clone=false)=>projects.forEach((project,index)=>{
    const node=applyCarouselCardAppearance(card(project,index),block); node.classList.add('editorial-carousel-card');
    if(project.editorial_action_label) node.dataset.actionLabel=project.editorial_action_label;
    if(clone){node.dataset.carouselClone='1';node.setAttribute('aria-hidden','true');node.tabIndex=-1;}
    strip.append(node);
  });
  appendSet(false); if(mode==='auto'&&!reduced) appendSet(true);
  viewport.append(strip); shell.append(viewport);
  const controls=String(block.controls||'arrows');
  if(controls!=='none'){
    const control=document.createElement('div'); control.className=`editorial-carousel-controls controls-${controls}`;
    const prev=document.createElement('button'); prev.type='button';prev.className='carousel-prev';prev.textContent='←';prev.setAttribute('aria-label','Anterior');
    const next=document.createElement('button'); next.type='button';next.className='carousel-next';next.textContent='→';next.setAttribute('aria-label','Próximo');
    const status=document.createElement('span'); status.className='carousel-status'; status.textContent=`01 / ${String(projects.length).padStart(2,'0')}`;
    if(controls==='arrows'||controls==='base') control.append(prev,next);
    if(controls==='number'||controls==='base') control.append(status);
    if(controls==='indicators'){
      const dots=document.createElement('div');dots.className='carousel-dots';projects.forEach((_,index)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Ir para item ${index+1}`);b.classList.toggle('is-active',index===0);b.addEventListener('click',()=>viewport.scrollTo({left:index*viewport.clientWidth*.72,behavior:reduced?'auto':'smooth'}));dots.append(b);});control.append(dots);
    }
    const step=()=>Math.max(260,format==='wide'?viewport.clientWidth*.78:viewport.clientWidth/3);
    prev.addEventListener('click',()=>viewport.scrollBy({left:-step(),behavior:reduced?'auto':'smooth'}));
    next.addEventListener('click',()=>viewport.scrollBy({left:step(),behavior:reduced?'auto':'smooth'}));
    viewport.addEventListener('scroll',()=>{const approx=Math.max(0,Math.min(projects.length-1,Math.round(viewport.scrollLeft/step())));status.textContent=`${String(approx+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;control.querySelectorAll('.carousel-dots button').forEach((dot,index)=>dot.classList.toggle('is-active',index===approx));},{passive:true});
    shell.append(control);
  }
  section.append(shell);
  if(mode==='auto'&&!reduced){
    let raf=0,last=0,paused=false; const px={slow:18,medium:30,fast:48}[block.speed||'medium']||30; const direction=block.direction==='right'?-1:1;
    const tickAuto=(time)=>{if(!last)last=time;const delta=Math.min(40,time-last);last=time;if(!paused&&viewport.scrollWidth>viewport.clientWidth){viewport.scrollLeft+=direction*px*delta/1000;const half=viewport.scrollWidth/2;if(direction>0&&viewport.scrollLeft>=half)viewport.scrollLeft-=half;if(direction<0&&viewport.scrollLeft<=0)viewport.scrollLeft+=half;}raf=requestAnimationFrame(tickAuto)}; raf=requestAnimationFrame(tickAuto);
    if(block.pause_on_hover!==false){section.addEventListener('pointerenter',()=>paused=true);section.addEventListener('pointerleave',()=>{paused=false;last=performance.now()});}
    section.addEventListener('DOMNodeRemoved',()=>raf&&cancelAnimationFrame(raf),{once:true});
  }
  return section;
}

function createEditorialBlocksBlock(block) {
  const projects=editorialProjectsForBlock(block,9); if(!projects.length)return null;
  const section=document.createElement('section'); section.className=`modular-block editorial-section block-editorial-projects layout-${block.layout||'three'} effect-${block.section_effect||'integrated'} reveal`; section.append(blockHeading(block,'Seleção de projetos'));
  const grid=document.createElement('div');grid.className='editorial-project-grid';projects.forEach((project,index)=>{const node=card(project,index);node.classList.add('editorial-project-card');grid.append(node)});section.append(grid);return section;
}

function createHomeVideoBlock(block) {
  const media=publicMediaById(block.media_id||''); if(!media||media.type!=='video')return null;
  const section=document.createElement('section');section.className=`modular-block editorial-section block-home-video width-${block.width||'full'} scroll-${block.scroll_behavior||'parallax'} effect-${block.section_effect||'reveal'} reveal`;
  if(block.title||block.eyebrow||block.body)section.append(blockHeading(block,block.title||''));
  const stage=document.createElement('div');stage.className=`home-video-stage ratio-${String(block.ratio||'16:9').replace(':','x')}`;
  const video=document.createElement('video');video.poster=media.thumbnail_url||'';video.playsInline=true;video.autoplay=block.autoplay!==false;video.muted=block.muted!==false;video.loop=block.loop!==false;video.controls=block.controls===true;video.preload='none';if(block.scroll_behavior==='parallax')stage.dataset.parallax='detail';bindPublishedVideoSource(video,media,()=>video.replaceWith(projectVideo(media)),{defer:true,metadataReady:false,timeoutMs:45000});stage.append(video);bindDeferredAutoplay(video,stage);section.append(stage);return section;
}

function createEditorialGalleryBlock(block,context={}) {
  const section=document.createElement('section');section.className=`modular-block editorial-section block-editorial-gallery columns-${block.columns||'3'} style-${block.gallery_style||'uniform'} reveal`;section.append(blockHeading(block,'Galeria'));const grid=document.createElement('div');grid.className='editorial-gallery-grid';
  if(Array.isArray(block.media_ids)&&block.media_ids.length&&typeof context.mediaResolver==='function'){
    block.media_ids.map(context.mediaResolver).filter(Boolean).forEach((media)=>{const figure=document.createElement('figure');figure.className='editorial-gallery-direct-media';const node=context.mediaNode?.(media);if(node)figure.append(node);if(media.title){const caption=document.createElement('figcaption');caption.textContent=media.title;figure.append(caption);}grid.append(figure);});if(!grid.children.length)return null;section.append(grid);return section;
  }
  const projects=editorialProjectsForBlock(block,12);if(!projects.length)return null;projects.forEach((project,index)=>{const node=card(project,index);node.classList.add('editorial-gallery-card');grid.append(node)});section.append(grid);return section;
}

function createHighlightsBlock(block) {
  const projects=editorialProjectsForBlock(block,5);if(!projects.length)return null;
  const section=document.createElement('section');section.className=`modular-block editorial-section block-highlights layout-${block.layout||'feature_cards'} reveal`;section.append(blockHeading(block,'Projetos em destaque'));
  const grid=document.createElement('div');grid.className='highlight-grid';projects.forEach((project,index)=>{const node=card(project,index);node.classList.add(index===0?'highlight-feature':'highlight-card');grid.append(node)});section.append(grid);return section;
}

function createSpacerBlock(block) {
  const section=document.createElement('section');section.className=`editorial-spacer size-${block.size||'medium'} transition-${block.transition||'atmosphere'}`;section.setAttribute('aria-hidden',block.title?'false':'true');if(block.title){const span=document.createElement('span');span.textContent=block.title;section.append(span)}return section;
}


function applyHomeBlockTypography(node, block = {}) {
  if (!node) return;
  node.classList.add('sf-home-block');
  const fontMap = {
    display: 'var(--display)',
    body: 'var(--body)',
    system: 'Arial, Helvetica, sans-serif',
    serif: 'Georgia, Times New Roman, serif',
    mono: 'ui-monospace, SFMono-Regular, Consolas, monospace',
  };
  const colorMap = { text:'var(--text)', accent:'var(--accent)', muted:'var(--muted)' };
  const setOrRemove = (name, value) => {
    if (value === undefined || value === null || value === '' || value === 'auto') node.style.removeProperty(name);
    else node.style.setProperty(name, value);
  };
  node.style.setProperty('--sf-heading-font', fontMap[block.font_family || 'display'] || fontMap.display);
  node.style.setProperty('--sf-heading-weight', String(block.title_weight || '400'));
  node.style.setProperty('--sf-text-align', block.text_align || 'left');
  node.style.setProperty('--sf-text-transform', block.text_transform || 'none');
  node.style.setProperty('--sf-title-color', colorMap[block.title_color || 'text'] || colorMap.text);
  node.style.setProperty('--sf-eyebrow-color', colorMap[block.eyebrow_color || 'accent'] || colorMap.accent);
  setOrRemove('--sf-title-size', block.title_size ? `${block.title_size}px` : '');
  setOrRemove('--sf-eyebrow-size', block.eyebrow_size ? `${block.eyebrow_size}px` : '');
  setOrRemove('--sf-body-size', block.body_size ? `${block.body_size}px` : '');
  setOrRemove('--sf-title-line-height', block.title_line_height || '');
  setOrRemove('--sf-title-letter-spacing', block.title_letter_spacing || '');
}

function applyHomeSectionFrame(node, block = {}) {
  if (!node) return;
  applySharedPageBlockFrame(node,block);
  [...node.classList].filter((name)=>name.startsWith('sf-grid-cols-')||name.startsWith('sf-card-ratio-')||name.startsWith('sf-grid-gap-')).forEach((name)=>node.classList.remove(name));
  if (block.type === 'projects') {
    node.classList.add(`sf-grid-cols-${block.grid_columns || '3'}`);
    node.classList.add(`sf-card-ratio-${block.card_ratio || '4x3'}`);
    node.classList.add(`sf-grid-gap-${block.grid_gap || 'normal'}`);
  }
  applyHomeBlockTypography(node, block);
}

function applyCoreBlockOverrides(node, block, builder) {
  const explicit = (field, fallback='') => Object.prototype.hasOwnProperty.call(block, field) ? block[field] : fallback;
  if (!node) return;
  const identity = DATA.identity || {};
  if (block.type === 'intro') {
    const small=node.querySelector('small'); const text=node.querySelector('#heroLine');
    if (small) small.textContent = explicit('eyebrow', identity.studio_name || 'Mensagem Studio');
    if (text) text.textContent = explicit('title', identity.hero_line || '');
  }
  if (block.type === 'lettering') {
    const cfg=builder.lettering||{}; const eyebrow=node.querySelector('#letteringEyebrow'); const primary=node.querySelector('#letteringText'); const clone=node.querySelector('#letteringClone');
    const value=explicit('title', cfg.text || identity.hero_line || '');
    if (eyebrow) eyebrow.textContent = explicit('eyebrow', cfg.eyebrow || identity.studio_name || 'Mensagem Studio');
    if (primary) primary.textContent=value; if (clone) clone.textContent=value;
    node.dataset.style = explicit('style', cfg.style || 'split') === 'inherit' ? (cfg.style || 'split') : explicit('style', cfg.style || 'split');
    node.dataset.direction = explicit('direction', cfg.direction || 'left');
  }
  if (block.type === 'projects') {
    const cfg=builder.projects||{}; const e=node.querySelector('#projectsEyebrow'); const t=node.querySelector('#projectsTitle');
    if(e)e.textContent=explicit('eyebrow',cfg.eyebrow||'Portfólio selecionado'); if(t)t.textContent=explicit('title',cfg.title||'Projetos');
    node.querySelector('#portfolioHeading')?.removeAttribute('hidden'); node.querySelector('#filters')?.removeAttribute('hidden'); node.querySelector('#projects')?.removeAttribute('hidden'); $('#menu')?.removeAttribute('hidden');
  }
  if (block.type === 'about') {
    const cfg=builder.about||{}; const e=node.querySelector('#aboutEyebrow'); const t=node.querySelector('#aboutTitle'); const p=node.querySelector('#aboutBody');
    if(e)e.textContent=explicit('eyebrow',cfg.eyebrow||'Mensagem Studio'); if(t)t.textContent=explicit('title',cfg.title||''); if(p)p.textContent=explicit('body',cfg.body||'');
  }
  if (block.type === 'contact') {
    const cfg=builder.contact||{}; const e=node.querySelector('#contactEyebrow'); const t=node.querySelector('#contactTitle'); const p=node.querySelector('#contactBody');
    if(e)e.textContent=explicit('eyebrow',cfg.eyebrow||'Contato'); if(t)t.textContent=explicit('title',cfg.title||''); if(p)p.textContent=explicit('body',cfg.body||'');
  }
}

const SHARED_PAGE_RENDERERS=new Set(['text','process','accordion','cta','spacer','full_media','editorial_gallery','related_projects','quote_cta']);
const LEGACY_SERVICE_RENDER_MAP={service_overview:'text',service_process:'process',service_faq:'accordion',service_cta:'cta',media:'full_media',service_gallery:'editorial_gallery'};
function normalizeSharedPublicBlock(block={}){const type=LEGACY_SERVICE_RENDER_MAP[block.type]||block.type||'text';return {...block,type,visible:block.visible!==false,desktop_visible:block.desktop_visible!==false,mobile_visible:block.mobile_visible!==false,section_width:block.section_width||'full',section_size:block.section_size||'normal',section_background:block.section_background||'none',mobile_section_width:block.mobile_section_width||'auto',mobile_section_size:block.mobile_section_size||'inherit'};}
function applySharedPageBlockFrame(node,block={}){if(!node)return node;block=normalizeSharedPublicBlock(block);[...node.classList].filter((name)=>name.startsWith('sf-section-')||name==='sf-hide-desktop'||name==='sf-hide-mobile'||name.startsWith('sf-mobile-')).forEach((name)=>node.classList.remove(name));node.classList.add(`sf-section-width-${block.section_width||'full'}`,`sf-section-size-${block.section_size||'normal'}`,`sf-section-bg-${block.section_background||'none'}`);if(block.desktop_visible===false)node.classList.add('sf-hide-desktop');if(block.mobile_visible===false)node.classList.add('sf-hide-mobile');if(block.mobile_section_width&&block.mobile_section_width!=='auto')node.classList.add(`sf-mobile-width-${block.mobile_section_width}`);if(block.mobile_section_size&&block.mobile_section_size!=='inherit')node.classList.add(`sf-mobile-size-${block.mobile_section_size}`);return node;}
function relatedProjectsForBlock(block={}){
  const seen=new Set(),limit=Math.max(1,Math.min(24,Number(block.max_items||6)));
  const projects=(DATA.projects||[]).filter((project)=>project&&!project.hidden);
  return (Array.isArray(block.items)?block.items:[]).map((row)=>{const data=row&&typeof row==='object'?row:{project_id:String(row||'')};const ref=String(data.project_id||data.id||'').trim();if(!ref||seen.has(ref))return null;seen.add(ref);const project=projects.find((candidate)=>String(candidate.project_id||'')===ref||String(candidate.id||'')===ref);if(!project)return null;return {data,project};}).filter(Boolean).slice(0,limit);
}
function createRelatedProjectsBlock(block={},context={}){
  const records=relatedProjectsForBlock(block);if(!records.length)return null;
  const section=document.createElement('section');section.className='related-projects-block reveal';section.dataset.columns=String(['2','3','4'].includes(String(block.columns))?block.columns:'3');section.dataset.cardStyle=['editorial','cover','minimal'].includes(block.card_style)?block.card_style:'editorial';
  const heading=blockHeading(block,block.title||'Projetos relacionados');if(heading.children.length)section.append(heading);
  const grid=document.createElement('div');grid.className='related-projects-grid';
  records.forEach(({data,project})=>{const card=document.createElement('article');card.className='related-project-card';card.dataset.projectId=String(project.project_id||project.id||'');const visual=blockPoster(project,'related-project-media');card.append(visual);const copy=document.createElement('div');copy.className='related-project-copy';if(block.show_category!==false){const meta=document.createElement('small');meta.textContent=project.section_title||project.category||project.path?.[0]||'Projeto';copy.append(meta);}const title=document.createElement('h3');title.textContent=data.title||project.title||'Projeto';copy.append(title);const description=String(data.description||project.description||'').trim();if(description){const p=document.createElement('p');p.textContent=description;copy.append(p);}const action=document.createElement('button');action.type='button';action.className='related-project-action';action.textContent=data.action_label||'Ver projeto';const arrow=document.createElement('b');arrow.textContent='↗';action.append(arrow);action.addEventListener('click',(event)=>{event.stopPropagation();openProjectDetail(project);});copy.append(action);const quoteServiceId=String(context.quoteServiceId||block.service_id||''),quoteService=quoteServiceRecord(quoteServiceId);if(quoteEnabled()&&quoteService){const similar=document.createElement('button');similar.type='button';similar.className='related-project-quote';similar.dataset.quoteSimilar=String(quoteService.item.id||'');similar.dataset.quoteProjectId=String(project.project_id||project.id||'');similar.textContent=servicesConfig().quote_case_action_label||'Quero algo semelhante';copy.append(similar);}card.append(copy);bindBlockOpen(card,project);grid.append(card);});section.append(grid);return section;
}
function createQuoteCtaBlock(block={},context={}){const requestedServiceId=String(block.service_id||context.quoteServiceId||''),serviceRecord=quoteServiceRecord(requestedServiceId),serviceId=serviceRecord?String(serviceRecord.item.id||''):'';if(!quoteEnabled()){const fallbackUrl=serviceWhatsappHref(serviceRecord?.category||null,serviceRecord?.item||null),fallbackLabel=block.button_label||block.quote_action_label||servicesConfig().cta_label||'Solicitar orçamento';return createCtaBlock({...block,button_url:fallbackUrl,button_label:fallbackLabel},{...context,defaultButtonUrl:fallbackUrl,defaultButtonLabel:fallbackLabel});}const section=document.createElement('section');section.className='modular-block quote-cta-block reveal';const copy=document.createElement('div');copy.className='quote-cta-copy';const eyebrow=document.createElement('small');eyebrow.textContent=block.eyebrow||'Orçamento';const title=document.createElement('h2');title.textContent=block.title||'Vamos montar seu projeto?';const body=document.createElement('p');body.textContent=block.body||'Adicione serviços ao orçamento e continue navegando pelo site.';copy.append(eyebrow,title);if(body.textContent)copy.append(body);const button=document.createElement('button');button.type='button';button.className='quote-cta-button';if(serviceId)button.dataset.quoteAddService=serviceId;else button.dataset.quoteOpen='';button.textContent=block.quote_action_label||block.button_label||(serviceId?(servicesConfig().quote_item_action_label||'Adicionar ao orçamento'):(servicesConfig().quote_title||'Abrir orçamento'));section.append(copy,button);return section;}
function createSharedPageBlock(block,context={}){block=normalizeSharedPublicBlock(block);if(block.visible===false||!SHARED_PAGE_RENDERERS.has(block.type))return null;let node=null;if(block.type==='text')node=createTextBlock(block);if(block.type==='process')node=createStructuredContentBlock(block,'process');if(block.type==='accordion')node=createStructuredContentBlock(block,'accordion');if(block.type==='cta')node=createCtaBlock(block,context);if(block.type==='spacer')node=createSpacerBlock(block);if(block.type==='full_media')node=createFullMediaBlock(block,context);if(block.type==='editorial_gallery')node=createEditorialGalleryBlock(block,context);if(block.type==='related_projects')node=createRelatedProjectsBlock(block,context);if(block.type==='quote_cta')node=createQuoteCtaBlock(block,context);if(node)applySharedPageBlockFrame(node,block);return node;}

function createCustomHomeBlock(block) {
  if (block.visible === false) return null;
  let node = createSharedPageBlock(block);
  if (block.type === 'editorial_carousel') node = createEditorialCarouselBlock(block);
  if (block.type === 'editorial_blocks') node = createEditorialBlocksBlock(block);
  if (block.type === 'home_video') node = createHomeVideoBlock(block);
  if (block.type === 'highlights') node = createHighlightsBlock(block);
  if (block.type === 'showcase') node = createShowcaseBlock(block);
  if (block.type === 'split') node = createSplitBlock(block);
  if (block.type === 'horizontal_projects') node = createHorizontalProjectsBlock(block);
  if (block.type === 'auto_carousel') node = createAutoCarouselBlock(block);
  if (block.type === 'spotlight') node = createSpotlightBlock(block);
  if (block.type === 'marquee') node = createMarqueeBlock(block);
  if (block.type === 'lettering_custom') node = createCustomLetteringBlock(block);
  if (block.type === 'video_feature') node = createVideoFeatureBlock(block);
  if (block.type === 'metrics') node = createStructuredContentBlock(block,'metrics');
  if (block.type === 'testimonials') node = createStructuredContentBlock(block,'testimonials');
  if (node) { node.dataset.homeBlockId = block.id || ''; node.dataset.homeBlockLabel = block.label || block.title || block.type || 'Seção'; node.classList.add('home-modular-instance'); applyHomeSectionFrame(node, block); }
  return node;
}

function placeHomeHorizontalNavigation() {
  const main=$('#top'), hero=$('#hero'), filters=$('#filters');
  if(!main||!hero||!filters)return;
  const projects=DATA.site_builder?.projects||{};
  const mode=['menu','inline'].includes(projects.filters?.display_mode)?projects.filters.display_mode:'inline';
  filters.toggleAttribute('hidden', projects.visible===false||mode==='menu');
  if(!filters.hidden) hero.insertAdjacentElement('afterend',filters);
}

function renderHomeComposition() {
  const main = $('#top');
  if (!main) return;
  main.querySelectorAll('.home-modular-instance').forEach((node) => node.remove());
  Object.values(CORE_HOME_BLOCK_IDS).forEach((id)=>{const node=document.getElementById(id);if(node)node.hidden=true;});
  const builder = DATA.site_builder || {};
  const projectsCfg = builder.projects || {};
  const aboutCfg = builder.about || {};
  const contactCfg = builder.contact || {};
  const letteringCfg = builder.lettering || {};
  publicHomeBlocks().forEach((block) => {
    const coreId = CORE_HOME_BLOCK_IDS[block.type];
    if (coreId) {
      const node = document.getElementById(coreId);
      if (!node) return;
      main.append(node);
      node.hidden = block.visible === false;
      applyHomeSectionFrame(node, block);
      applyCoreBlockOverrides(node, block, builder);
      return;
    }
    const custom = createCustomHomeBlock(block);
    if (custom) {
      const safeId = String(block.id || block.type || 'section').replace(/[^a-zA-Z0-9_-]+/g,'-');
      custom.id = custom.id || `home-${safeId}`;
      main.append(custom);
    }
  });
  placeHomeHorizontalNavigation();
  bindReveal();
  tick();
}



function seoRouteRecords(){return Array.isArray(DATA.seo?.routes)?DATA.seo.routes:[];}
function currentSeoRoute(){const path=requestedRoutePath();return seoRouteRecords().find((row)=>String(row?.path||'').replace(/^\/+|\/+$/g,'')===path)||seoRouteRecords().find((row)=>row?.kind==='home'&&!path)||null;}
function applyRuntimeSeo(){
  const identity=DATA.identity||{},route=currentSeoRoute()||DATA.seo?.home||null;
  document.title=route?.title||`${identity.portfolio_title||'Portfólio'} | ${identity.studio_name||'Mensagem Studio'}`;
  const setMeta=(selector,attr,value)=>{let node=document.head.querySelector(selector);if(!node&&value){node=document.createElement('meta');const match=selector.match(/meta\[(name|property)=\"([^\"]+)\"\]/);if(match)node.setAttribute(match[1],match[2]);document.head.append(node);}if(node&&value!=null)node.setAttribute(attr,String(value));};
  if(route){
    setMeta('meta[name="description"]','content',route.description||'');
    setMeta('meta[name="robots"]','content',route.robots||'index,follow');
    setMeta('meta[property="og:title"]','content',route.title||'');
    setMeta('meta[property="og:description"]','content',route.description||'');
    setMeta('meta[property="og:url"]','content',route.canonical||'');
    if(route.image)setMeta('meta[property="og:image"]','content',route.image);
  }
}

function servicesConfig(){return DATA.site_builder?.services||{};}
function canonicalRouteSlug(value='servicos'){return String(value||'servicos').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'servicos';}
function servicesSlug(){return canonicalRouteSlug(servicesConfig().slug||'servicos');}
function publicRouteHref(value='#'){const target=String(value||'#');if(location.protocol!=='file:'||!target.startsWith('/'))return target;return `.${target}`;}
function requestedRoutePath(){const query=new URLSearchParams(location.search);return normalizePath(query.get('sf_route')||location.pathname);}
function servicesHref(hash=''){const slug=servicesSlug();const base=location.protocol==='file:'?`./${slug}/index.html`:`/${slug}/`;return `${base}${hash||''}`;}
function isServicesPage(){const query=new URLSearchParams(location.search);return servicesConfig().visible!==false&&(requestedRoutePath()===servicesSlug()||query.get('page')==='services');}
function visibleServiceCategories(){return (Array.isArray(servicesConfig().categories)?servicesConfig().categories:[]).filter((category)=>category&&category.visible!==false).slice().sort((a,b)=>Number(a.order||0)-Number(b.order||0));}
function visibleServiceItems(category){return (Array.isArray(category?.services)?category.services:[]).filter((item)=>item&&item.visible!==false).slice().sort((a,b)=>Number(a.order||0)-Number(b.order||0));}
function visibleServiceRecords(){const rows=[];visibleServiceCategories().forEach((category)=>visibleServiceItems(category).forEach((item)=>rows.push({category,item})));return rows;}
function serviceDetailHref(item,hash=''){const route=normalizePath(item?.full_path||`${servicesSlug()}/${canonicalRouteSlug(item?.slug||item?.title||item?.id||'servico')}`);const base=location.protocol==='file:'?`./${route}/index.html`:`/${route}/`;return `${base}${hash||''}`;}
function currentServiceDetail(){const path=requestedRoutePath();if(!path||path===servicesSlug())return null;return visibleServiceRecords().find(({item})=>item.page_enabled!==false&&normalizePath(item.full_path||`${servicesSlug()}/${item.slug}`)===path)||null;}
function servicePrice(item={}){if(servicesConfig().show_prices===false||item.price_type==='quote')return 'Sob consulta';const value=Number(item.price||0);if(!value)return 'Sob consulta';const formatted=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:Number.isInteger(value)?0:2}).format(value);return `${item.price_type==='fixed'?'':'A partir de '}${formatted}`;}
function serviceWhatsappHref(category,item=null,extra='',options={}){const config=servicesConfig(),number=String(config.whatsapp_number||'').replace(/\D/g,''),subject=item?.title||category?.title||'',message=String(config.whatsapp_message||'Olá! Gostaria de solicitar um orçamento.').trim(),detail=String(extra||'').trim(),includeBase=options.includeBase!==false,parts=[includeBase?message:'',subject?`Serviço: ${subject}`:'',detail].filter(Boolean);return number?`https://wa.me/${number}?text=${encodeURIComponent(parts.join('\n\n'))}`:'#';}
function quoteWhatsappHref(){return serviceWhatsappHref(null,null,serviceQuoteMessage(),{includeBase:false});}
const QUOTE_STORAGE_KEY=IS_EDITOR_PREVIEW?'studioframe.quote.preview.v1':'studioframe.quote.v1';
let QUOTE_STATE={version:1,updated_at:'',items:[],lead:{name:'',company:'',timeline:'',details:''}};
let QUOTE_EVENTS_BOUND=false;
function serviceSelectionKey(category,item){return `${category.id}:${item.id}`;}
function serviceSelectionRecord(key){for(const category of visibleServiceCategories()){for(const item of visibleServiceItems(category)){if(serviceSelectionKey(category,item)===key)return {category,item,key};}}return null;}
function quoteEnabled(){return servicesConfig().quote_enabled!==false;}
function quoteStateVersion(){return Math.max(1,Number(servicesConfig().quote_state_version||1));}
function quoteServiceRecord(serviceId=''){return visibleServiceRecords().find(({item})=>String(item.id||'')===String(serviceId||''))||null;}
function quoteProjectRecord(projectId=''){const id=String(projectId||'').trim();if(!id)return null;return (DATA.projects||[]).find((project)=>project&&!project.hidden&&[project.project_id,project.id,project.gallery_id].some((value)=>value!=null&&String(value).trim()!==''&&String(value).trim()===id))||null;}
function quotePackageRecord(item={},packageId=''){return (Array.isArray(item.packages)?item.packages:[]).find((row)=>String(row.id||'')===String(packageId||''))||null;}
function newQuoteLineId(){return `q-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;}
function normalizeQuoteState(raw={}){const state={version:quoteStateVersion(),updated_at:String(raw?.updated_at||''),items:[],lead:{name:'',company:'',timeline:'',details:''}};const lead=raw?.lead&&typeof raw.lead==='object'?raw.lead:{};Object.keys(state.lead).forEach((field)=>state.lead[field]=String(lead[field]||'').slice(0,2000));const merged=new Map();(Array.isArray(raw?.items)?raw.items:[]).forEach((source)=>{if(!source||typeof source!=='object')return;const record=quoteServiceRecord(source.service_id);if(!record)return;let packageId=String(source.package_id||'');if(packageId&&!quotePackageRecord(record.item,packageId))packageId='';const referenceRecord=quoteProjectRecord(source.reference_project_id);const reference=referenceRecord?String(referenceRecord.project_id||referenceRecord.id||'').trim():'';const mergeKey=`${record.item.id}|${packageId}|${reference}`;const quantity=Math.max(1,Math.min(99,Number(source.quantity)||1));if(merged.has(mergeKey)){merged.get(mergeKey).quantity=Math.min(99,merged.get(mergeKey).quantity+quantity);return;}const row={id:String(source.id||newQuoteLineId()),service_id:String(record.item.id),package_id:packageId,quantity,note:String(source.note||'').slice(0,1200),reference_project_id:reference};merged.set(mergeKey,row);state.items.push(row);});return state;}
function loadQuoteState(){let raw={};try{raw=JSON.parse(localStorage.getItem(QUOTE_STORAGE_KEY)||'{}')||{};}catch(_){raw={};}QUOTE_STATE=normalizeQuoteState(raw);return QUOTE_STATE;}
function saveQuoteState(){QUOTE_STATE.version=quoteStateVersion();QUOTE_STATE.updated_at=new Date().toISOString();try{localStorage.setItem(QUOTE_STORAGE_KEY,JSON.stringify(QUOTE_STATE));}catch(_){}updateServiceQuoteUI();return QUOTE_STATE;}
function persistQuoteStateQuiet(){QUOTE_STATE.version=quoteStateVersion();QUOTE_STATE.updated_at=new Date().toISOString();try{localStorage.setItem(QUOTE_STORAGE_KEY,JSON.stringify(QUOTE_STATE));}catch(_){}return QUOTE_STATE;}
function quoteResolvedItems(){return QUOTE_STATE.items.map((line)=>{const record=quoteServiceRecord(line.service_id);if(!record)return null;return {...record,line,package:quotePackageRecord(record.item,line.package_id),reference:quoteProjectRecord(line.reference_project_id)};}).filter(Boolean);}
function addQuoteItem(serviceId,{packageId='',referenceProjectId='',open=true}={}){if(!quoteEnabled())return false;const record=quoteServiceRecord(serviceId);if(!record)return false;const safePackage=packageId&&quotePackageRecord(record.item,packageId)?String(packageId):'';const referenceRecord=quoteProjectRecord(referenceProjectId),safeReference=referenceRecord?String(referenceRecord.project_id||referenceRecord.id||'').trim():'';const existing=QUOTE_STATE.items.find((line)=>String(line.service_id)===String(record.item.id)&&String(line.package_id||'')===safePackage&&String(line.reference_project_id||'')===safeReference);if(existing)existing.quantity=Math.min(99,Number(existing.quantity||1)+1);else QUOTE_STATE.items.push({id:newQuoteLineId(),service_id:String(record.item.id),package_id:safePackage,quantity:1,note:'',reference_project_id:safeReference});saveQuoteState();if(open)openQuotePanel();return true;}
function removeQuoteItem(id){QUOTE_STATE.items=QUOTE_STATE.items.filter((line)=>String(line.id)!==String(id));saveQuoteState();}
function clearQuote(){QUOTE_STATE={version:quoteStateVersion(),updated_at:'',items:[],lead:{name:'',company:'',timeline:'',details:''}};saveQuoteState();}
function quoteMoney(value){return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:Number.isInteger(Number(value))?0:2}).format(Number(value||0));}
function quotePriceSource(item={},packageRow=null){const source=packageRow||item;const type=['from','fixed','quote'].includes(source?.price_type)?source.price_type:'from';const value=Number(source?.price||0);return {type,value,known:type!=='quote'&&value>0,unit:String(source?.unit||item.unit||'')};}
function quoteLinePriceLabel(item={},packageRow=null,quantity=1){const price=quotePriceSource(item,packageRow);if(!price.known)return 'Sob consulta';const total=price.value*Math.max(1,Number(quantity)||1);return `${price.type==='from'?'A partir de ':''}${quoteMoney(total)}`;}
function quoteSummary(){let total=0,known=0,unknown=0,hasFrom=false;quoteResolvedItems().forEach(({item,package:pkg,line})=>{const price=quotePriceSource(item,pkg);if(!price.known){unknown++;return;}known++;if(price.type==='from')hasFrom=true;total+=price.value*Math.max(1,Number(line.quantity)||1);});if(!known&&unknown)return {label:'Sob consulta',total:0,unknown,hasFrom:false};if(!known)return {label:'Sem itens com valor calculável',total:0,unknown,hasFrom:false};let label=`${hasFrom?'A partir de ':'Estimativa: '}${quoteMoney(total)}`;if(unknown)label=`Estimativa parcial: ${hasFrom?'a partir de ':''}${quoteMoney(total)} + ${unknown} ${unknown===1?'item sob consulta':'itens sob consulta'}`;return {label,total,unknown,hasFrom};}
function servicePublicMedia(mediaId){
  if(!mediaId)return null;const target=String(mediaId);let found=null;
  const visit=(value)=>{if(found||!value)return;if(Array.isArray(value)){value.forEach(visit);return;}if(typeof value!=='object')return;if(String(value.id||'')===target&&['image','video'].includes(String(value.type||''))){found=value;return;}Object.values(value).forEach(visit);};
  visit(DATA.hero_assets||{});visit(DATA.projects||[]);visit(DATA.galleries||{});return found;
}
function serviceCategoryVisual(category){const visual=document.createElement('div');visual.className='service-category-visual';visual.style.setProperty('--service-accent',category.accent||'var(--accent)');const media=servicePublicMedia(category.cover_media_id);if(!media){visual.innerHTML=`<span>${esc(category.number||'')}</span><i></i>`;return visual;}if(media.type==='video'){const posterNode=imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[])],{lazy:true});posterNode.classList?.add('service-video-poster');visual.append(posterNode);if(!media.hosted_video_chunked){const video=document.createElement('video');video.muted=true;video.loop=true;video.autoplay=true;video.playsInline=true;video.preload='none';video.poster=media.thumbnail_url||'';bindPublishedVideoSource(video,media,()=>{video.remove();},{defer:true,metadataReady:false,timeoutMs:45000});visual.append(video);bindDeferredAutoplay(video,visual);}}else visual.append(imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[]),media.media_url,...(media.media_candidates||[])],{lazy:true,upgradeUrls:[media.media_url,...(media.media_candidates||[])]}));return visual;}
function serviceCategoryCard(category,index){
  const config=servicesConfig(),article=document.createElement('article');article.className='service-area-card reveal';article.style.setProperty('--service-accent',category.accent||'var(--accent)');article.id=`service-${category.id}`;
  const visual=serviceCategoryVisual(category),copy=document.createElement('div');copy.className='service-area-copy';const meta=document.createElement('div');meta.className='service-area-meta';meta.innerHTML=`<span>${esc(category.number||String(index+1).padStart(2,'0'))}</span><small>${visibleServiceItems(category).length} opções</small>`;
  const title=document.createElement('h2');title.textContent=category.title||'Serviço';const description=document.createElement('p');description.textContent=category.description||'';const list=document.createElement('div');list.className='service-price-list';
  visibleServiceItems(category).forEach((item)=>{const key=serviceSelectionKey(category,item),row=document.createElement('article');row.className=`service-price-card${item.featured?' featured':''}`;row.dataset.serviceKey=key;const head=document.createElement('div'),itemTitle=document.createElement('h3');itemTitle.textContent=item.title||'Serviço';const price=document.createElement('strong');price.textContent=servicePrice(item);head.append(itemTitle,price);const body=document.createElement('p');body.textContent=item.description||'';const facts=document.createElement('div');facts.className='service-facts';if(item.unit){const unit=document.createElement('span');unit.textContent=item.unit;facts.append(unit);}if(config.show_deadlines!==false&&item.deadline){const deadline=document.createElement('span');deadline.textContent=item.deadline;facts.append(deadline);}if(config.show_revisions!==false){const revisions=document.createElement('span');revisions.textContent=`${Number(item.revisions||0)} ${Number(item.revisions||0)===1?'revisão':'revisões'}`;facts.append(revisions);}const deliverables=document.createElement('ul');if(config.show_deliverables!==false)(item.deliverables||[]).forEach((value)=>{const li=document.createElement('li');li.textContent=value;deliverables.append(li);});
    const actions=document.createElement('div');actions.className='service-item-actions-public';if(item.page_enabled!==false){const details=document.createElement('a');details.className='service-item-details';details.href=serviceDetailHref(item);details.textContent='Ver detalhes ↗';actions.append(details);}if(quoteEnabled()){const select=document.createElement('button');select.type='button';select.className='service-item-select';select.dataset.serviceSelect=key;select.textContent=config.quote_item_action_label||'Adicionar ao orçamento';actions.append(select);const direct=document.createElement('a');direct.className='service-item-direct';direct.href=serviceWhatsappHref(category,item);direct.target='_blank';direct.rel='noopener';direct.textContent='Falar agora ↗';actions.append(direct);}else{const direct=document.createElement('a');direct.className='service-item-direct service-item-primary-whatsapp';direct.href=serviceWhatsappHref(category,item);direct.target='_blank';direct.rel='noopener';direct.textContent=item.cta_label||config.cta_label||'Solicitar orçamento';actions.append(direct);}row.append(head,body,facts);if(deliverables.children.length)row.append(deliverables);row.append(actions);list.append(row);
  });
  copy.append(meta,title,description,list);article.append(visual,copy);return article;
}
function serviceProcessSection(){const config=servicesConfig(),steps=(Array.isArray(config.process_steps)?config.process_steps:[]).filter(Boolean);if(config.process_visible===false||!steps.length)return null;const section=document.createElement('section');section.className='services-process reveal';const copy=document.createElement('div');copy.innerHTML=`<small>PROCESSO</small><h2>${esc(config.process_title||'Um processo claro do briefing à entrega')}</h2><p>${esc(config.process_body||'')}</p>`;const list=document.createElement('ol');steps.forEach((step,index)=>{const item=document.createElement('li');item.innerHTML=`<span>${String(index+1).padStart(2,'0')}</span><strong>${esc(step)}</strong>`;list.append(item);});section.append(copy,list);return section;}
function quoteLeadFromDom(){const map={name:'quoteLeadName',company:'quoteLeadCompany',timeline:'quoteLeadTimeline',details:'quoteLeadDetails'};Object.entries(map).forEach(([field,id])=>{const node=document.getElementById(id);if(node)QUOTE_STATE.lead[field]=String(node.value||'').slice(0,2000);});}
function serviceQuoteMessage(){quoteLeadFromDom();const config=servicesConfig(),summary=quoteSummary(),records=quoteResolvedItems();const lines=[];records.forEach(({category,item,line,package:pkg,reference},index)=>{const price=quoteLinePriceLabel(item,pkg,line.quantity);lines.push(`${index+1}. ${category.title} — ${item.title}`);if(pkg)lines.push(`Pacote: ${pkg.label}`);lines.push(`Quantidade: ${Math.max(1,Number(line.quantity)||1)}`);if(config.quote_show_estimate!==false)lines.push(`Investimento: ${price}`);if(config.quote_show_deadline!==false&&item.deadline)lines.push(`Prazo indicado: ${item.deadline}`);if(config.quote_show_revisions!==false)lines.push(`Revisões: ${Number(item.revisions||0)}`);if(reference)lines.push(`Referência: ${reference.title||'Projeto do portfólio'}`);if(line.note)lines.push(`Observação: ${line.note}`);lines.push('');});const lead=QUOTE_STATE.lead||{};return [config.quote_whatsapp_intro||config.whatsapp_message||'Olá! Gostaria de solicitar um orçamento.',records.length?`SERVIÇOS\n\n${lines.join('\n').trim()}`:'SERVIÇOS\n\nPreciso de orientação para escolher os serviços.',config.quote_show_estimate!==false&&records.length?`RESUMO\n${summary.label}`:'',lead.name?`Nome: ${lead.name}`:'',lead.company?`Marca/empresa: ${lead.company}`:'',lead.timeline?`Prazo desejado: ${lead.timeline}`:'',lead.details?`Meu projeto:\n${lead.details}`:''].filter(Boolean).join('\n\n');}
function quotePanelMarkup(){const config=servicesConfig();return `<div class="global-quote-backdrop" id="globalQuoteBackdrop" hidden data-quote-close></div><aside class="global-quote-panel" id="globalQuotePanel" aria-hidden="true" aria-label="${esc(config.quote_title||'Seu orçamento')}"><header><div><small>ORÇAMENTO</small><h2>${esc(config.quote_title||'Seu orçamento')}</h2><p>${esc(config.quote_intro||'')}</p></div><button type="button" data-quote-close aria-label="Fechar">×</button></header><div class="global-quote-scroll"><div id="globalQuoteItems" class="global-quote-items"></div><div id="globalQuoteSummary" class="global-quote-summary"></div><div class="global-quote-lead"><label>Seu nome<input id="quoteLeadName" autocomplete="name"></label><label>Marca ou empresa<input id="quoteLeadCompany" autocomplete="organization"></label><label>Prazo desejado<input id="quoteLeadTimeline" placeholder="Ex.: ainda este mês"></label><label class="wide">Conte um pouco sobre o projeto<textarea id="quoteLeadDetails" rows="4" placeholder="Objetivo, formatos, quantidade, referências e o que já está pronto"></textarea></label></div></div><footer><button type="button" class="quote-clear" data-quote-clear>Limpar</button><button type="button" class="quote-send" data-quote-send>${esc(config.quote_finish_label||'Finalizar pelo WhatsApp')}</button></footer></aside><button type="button" class="global-quote-dock" id="globalQuoteDock" data-quote-open aria-label="${esc(config.quote_dock_label||'Orçamento')}"><span>${esc(config.quote_dock_label||'Orçamento')}</span><strong data-quote-count>0</strong></button>`;}
function ensureGlobalQuoteUI(){document.body.classList.remove('quote-panel-open');document.querySelectorAll('#globalQuotePanel,#globalQuoteBackdrop,#globalQuoteDock').forEach((node)=>node.remove());if(!quoteEnabled())return;const shell=document.createElement('div');shell.id='studioframeQuoteUi';shell.innerHTML=quotePanelMarkup();while(shell.firstChild)document.body.append(shell.firstChild);const dock=$('#globalQuoteDock'),floatingActions=$('#siteFloatingActions');if(dock&&floatingActions)floatingActions.append(dock);renderGlobalQuotePanel();bindQuoteEvents();}
function openQuotePanel(){if(!quoteEnabled())return;ensureQuoteUiIfMissing();const panel=$('#globalQuotePanel'),backdrop=$('#globalQuoteBackdrop');if(!panel)return;renderGlobalQuotePanel();panel.classList.add('is-open');panel.setAttribute('aria-hidden','false');if(backdrop)backdrop.hidden=false;document.body.classList.add('quote-panel-open');}
function closeQuotePanel(){const panel=$('#globalQuotePanel'),backdrop=$('#globalQuoteBackdrop');panel?.classList.remove('is-open');panel?.setAttribute('aria-hidden','true');if(backdrop)backdrop.hidden=true;document.body.classList.remove('quote-panel-open');}
function ensureQuoteUiIfMissing(){if(quoteEnabled()&&!$('#globalQuotePanel'))ensureGlobalQuoteUI();}
function renderGlobalQuotePanel(){const list=$('#globalQuoteItems'),summaryNode=$('#globalQuoteSummary');const config=servicesConfig(),records=quoteResolvedItems();if(list){if(!records.length)list.innerHTML='<div class="global-quote-empty"><strong>Seu orçamento está vazio.</strong><span>Adicione serviços e continue navegando pelo site.</span></div>';else list.innerHTML=records.map(({category,item,line,package:pkg,reference})=>{const packages=Array.isArray(item.packages)?item.packages:[];const packageSelect=packages.length?`<label>Pacote/opção<select data-quote-package="${esc(line.id)}"><option value="">Padrão do serviço</option>${packages.map((row)=>`<option value="${esc(row.id)}" ${String(row.id)===String(line.package_id)?'selected':''}>${esc(row.label)} · ${esc(quoteLinePriceLabel(row,null,1))}</option>`).join('')}</select></label>`:'';const ref=reference?`<span class="quote-reference">Referência: ${esc(reference.title||'Projeto do portfólio')}</span>`:'';const price=config.quote_show_estimate!==false?`<strong data-quote-line-price="${esc(line.id)}">${esc(quoteLinePriceLabel(item,pkg,line.quantity))}</strong>`:'';const meta=[config.quote_show_deadline!==false&&item.deadline?item.deadline:'',config.quote_show_revisions!==false?`${Number(item.revisions||0)} ${Number(item.revisions||0)===1?'revisão':'revisões'}`:''].filter(Boolean).join(' · ');return `<article class="global-quote-item" data-quote-line="${esc(line.id)}"><div class="quote-item-head"><div><small>${esc(category.short_title||category.title)}</small><h3>${esc(item.title)}</h3>${ref}</div>${price}<button type="button" data-quote-remove="${esc(line.id)}" aria-label="Remover">×</button></div>${meta?`<p class="quote-item-meta">${esc(meta)}</p>`:''}<div class="quote-item-controls">${packageSelect}<label>Quantidade<input type="number" min="1" max="99" value="${Math.max(1,Number(line.quantity)||1)}" data-quote-quantity="${esc(line.id)}"></label><label class="wide">Observação<textarea rows="2" data-quote-note="${esc(line.id)}" placeholder="Detalhes específicos deste item">${esc(line.note||'')}</textarea></label></div></article>`;}).join('');}if(summaryNode){const summary=quoteSummary();summaryNode.hidden=config.quote_show_estimate===false||!records.length;summaryNode.innerHTML=summaryNode.hidden?'':`<small>ESTIMATIVA</small><strong>${esc(summary.label)}</strong><span>Valor final depende da confirmação do escopo.</span>`;}const lead=QUOTE_STATE.lead||{};[['quoteLeadName','name'],['quoteLeadCompany','company'],['quoteLeadTimeline','timeline'],['quoteLeadDetails','details']].forEach(([id,field])=>{const node=document.getElementById(id);if(node&&document.activeElement!==node)node.value=lead[field]||'';});const dock=$('#globalQuoteDock');if(dock){dock.hidden=!quoteEnabled();const count=QUOTE_STATE.items.reduce((total,line)=>total+Math.max(1,Number(line.quantity)||1),0);dock.querySelector('[data-quote-count]').textContent=String(count);dock.classList.toggle('has-items',count>0);}document.querySelectorAll('[data-service-select]').forEach((button)=>{const record=serviceSelectionRecord(button.dataset.serviceSelect);const selected=record&&QUOTE_STATE.items.some((line)=>String(line.service_id)===String(record.item.id));button.classList.toggle('selected',Boolean(selected));button.textContent=selected?'Adicionado ✓':(config.quote_item_action_label||'Adicionar ao orçamento');});document.querySelectorAll('[data-quote-inline-count]').forEach((node)=>{const count=QUOTE_STATE.items.length;node.textContent=`${count} ${count===1?'serviço no orçamento':'serviços no orçamento'}`;});}
function refreshQuoteComputedUi(lineId=''){const config=servicesConfig(),records=quoteResolvedItems();if(lineId&&config.quote_show_estimate!==false){const resolved=records.find(({line})=>String(line.id)===String(lineId)),priceNode=document.querySelector(`[data-quote-line-price="${CSS.escape(String(lineId))}"]`);if(resolved&&priceNode)priceNode.textContent=quoteLinePriceLabel(resolved.item,resolved.package,resolved.line.quantity);}const summaryNode=$('#globalQuoteSummary');if(summaryNode){const summary=quoteSummary();summaryNode.hidden=config.quote_show_estimate===false||!records.length;summaryNode.innerHTML=summaryNode.hidden?'':`<small>ESTIMATIVA</small><strong>${esc(summary.label)}</strong><span>Valor final depende da confirmação do escopo.</span>`;}const dock=$('#globalQuoteDock');if(dock){const count=QUOTE_STATE.items.reduce((total,line)=>total+Math.max(1,Number(line.quantity)||1),0);dock.querySelector('[data-quote-count]').textContent=String(count);dock.classList.toggle('has-items',count>0);}document.querySelectorAll('[data-quote-inline-count]').forEach((node)=>{const count=QUOTE_STATE.items.length;node.textContent=`${count} ${count===1?'serviço no orçamento':'serviços no orçamento'}`;});}
function updateServiceQuoteUI(){ensureQuoteUiIfMissing();renderGlobalQuotePanel();}
function serviceQuoteBuilder(){const config=servicesConfig();if(config.brief_visible===false||config.quote_enabled===false)return null;const section=document.createElement('section');section.className='services-quote-builder reveal';section.id='service-brief';section.innerHTML=`<div class="services-quote-intro"><small>ORÇAMENTO</small><h2>${esc(config.brief_title||'Monte sua solicitação de orçamento')}</h2><p>${esc(config.brief_body||'')}</p><span>${esc(config.response_note||'')}</span></div><div class="services-quote-form services-quote-integrated"><strong data-quote-inline-count>0 serviços no orçamento</strong><p>As escolhas ficam salvas neste navegador enquanto você visita serviços, cases e outras páginas.</p><button class="service-quote-send" type="button" data-quote-open>${esc(config.brief_button||config.quote_title||'Abrir orçamento')}</button><small>Nenhum dado é enviado antes de você finalizar pelo WhatsApp.</small></div>`;return section;}
function bindQuoteEvents(){if(QUOTE_EVENTS_BOUND)return;QUOTE_EVENTS_BOUND=true;document.addEventListener('click',(event)=>{const select=event.target.closest('[data-service-select]');if(select){const record=serviceSelectionRecord(select.dataset.serviceSelect);if(record)addQuoteItem(record.item.id,{open:false});return;}const add=event.target.closest('[data-quote-add-service]');if(add){addQuoteItem(add.dataset.quoteAddService,{packageId:add.dataset.quotePackageId||'',open:true});return;}const similar=event.target.closest('[data-quote-similar]');if(similar){addQuoteItem(similar.dataset.quoteSimilar,{referenceProjectId:similar.dataset.quoteProjectId||'',open:true});return;}if(event.target.closest('[data-quote-open],[data-service-open-brief]')){openQuotePanel();return;}if(event.target.closest('[data-quote-close]')){closeQuotePanel();return;}const remove=event.target.closest('[data-quote-remove]');if(remove){removeQuoteItem(remove.dataset.quoteRemove);return;}if(event.target.closest('[data-quote-clear]')){clearQuote();return;}if(event.target.closest('[data-quote-send]')){if(!QUOTE_STATE.items.length){openQuotePanel();return;}quoteLeadFromDom();saveQuoteState();window.open(quoteWhatsappHref(),'_blank','noopener');return;}});document.addEventListener('input',(event)=>{const lineId=event.target.dataset?.quoteQuantity||event.target.dataset?.quoteNote||'';if(lineId){const line=QUOTE_STATE.items.find((row)=>String(row.id)===String(lineId));if(!line)return;if(event.target.dataset.quoteQuantity){line.quantity=Math.max(1,Math.min(99,Number(event.target.value)||1));persistQuoteStateQuiet();refreshQuoteComputedUi(line.id);return;}if(event.target.dataset.quoteNote!==undefined){line.note=String(event.target.value||'').slice(0,1200);persistQuoteStateQuiet();return;}}const leadMap={quoteLeadName:'name',quoteLeadCompany:'company',quoteLeadTimeline:'timeline',quoteLeadDetails:'details'};const field=leadMap[event.target.id];if(field){QUOTE_STATE.lead[field]=String(event.target.value||'').slice(0,2000);try{localStorage.setItem(QUOTE_STORAGE_KEY,JSON.stringify({...QUOTE_STATE,updated_at:new Date().toISOString()}));}catch(_){}}});document.addEventListener('change',(event)=>{const packageId=event.target.dataset?.quotePackage;const quantityId=event.target.dataset?.quoteQuantity;if(quantityId){const line=QUOTE_STATE.items.find((row)=>String(row.id)===String(quantityId));if(line){line.quantity=Math.max(1,Math.min(99,Number(event.target.value)||1));saveQuoteState();}return;}if(!packageId)return;const line=QUOTE_STATE.items.find((row)=>String(row.id)===String(packageId));if(!line)return;const record=quoteServiceRecord(line.service_id);line.package_id=record&&quotePackageRecord(record.item,event.target.value)?event.target.value:'';saveQuoteState();});addEventListener('keydown',(event)=>{if(event.key==='Escape'&&$('#globalQuotePanel')?.classList.contains('is-open'))closeQuotePanel();});}
function bindServiceCommerce(){bindQuoteEvents();updateServiceQuoteUI();}
function servicePageBlocks(category,item){
  const config=servicesConfig(),slug=canonicalRouteSlug(item?.id||item?.title||'servico');const source=Array.isArray(item?.blocks)?item.blocks:[{id:`${slug}-hero`,type:'service_hero',visible:true},{id:`${slug}-overview`,type:'text',visible:true,eyebrow:'Sobre o serviço'},{id:`${slug}-benefits`,type:'service_benefits',visible:true,eyebrow:'Benefícios',title:'Por que este serviço',items:[]},{id:`${slug}-deliverables`,type:'service_deliverables',visible:true,eyebrow:'Entregáveis',title:'O que está incluído',items:[]},{id:`${slug}-pricing`,type:'service_pricing',visible:true,eyebrow:'Investimento',title:'Escopo comercial'},{id:`${slug}-process`,type:'process',visible:true,eyebrow:'Processo',title:'Como o projeto acontece'},{id:`${slug}-cases`,type:'related_projects',visible:Array.isArray(item.related_projects)&&item.related_projects.length>0,eyebrow:'Cases',title:'Projetos relacionados',items:item.related_projects||[],columns:'3',max_items:6,card_style:'editorial',show_category:true},{id:`${slug}-cta`,type:'cta',visible:true,eyebrow:'Vamos conversar',title:'Pronto para começar?',body:'Conte o que você precisa e receba uma proposta adequada ao projeto.'}];
  return source.filter(Boolean).map((raw)=>{const block=normalizeSharedPublicBlock(raw);if(block.type==='text'){block.title=block.title||item.title||'Serviço';block.body=block.body||item.description||item.page_intro||'';}if(block.type==='process'&&!String(block.body||'').trim()){block.body=(Array.isArray(raw.items)&&raw.items.length?raw.items:(item.process_steps?.length?item.process_steps:config.process_steps||[])).filter(Boolean).map((value)=>`${value} |`).join('\n');}if(block.type==='accordion'&&!String(block.body||'').trim()){block.body=(raw.items||item.faq||[]).map((row)=>typeof row==='object'?`${row.question||''} | ${row.answer||''}`:String(row||'')).join('\n');}return block;}).sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}
function serviceBlockFrame(node,block){applySharedPageBlockFrame(node,block);node.classList.add('service-commercial-section','reveal');node.dataset.serviceBlockId=block.id||'';node.dataset.serviceBlockType=block.type||'';return node;}
function serviceBlockHeading(block,defaults={}){const wrap=document.createElement('div');wrap.className='service-commercial-heading';const eyebrow=document.createElement('small');eyebrow.textContent=block.eyebrow||defaults.eyebrow||'';const title=document.createElement('h2');title.textContent=block.title||defaults.title||'';const body=document.createElement('p');body.textContent=block.body||defaults.body||'';if(eyebrow.textContent)wrap.append(eyebrow);if(title.textContent)wrap.append(title);if(body.textContent)wrap.append(body);return wrap;}
function serviceMediaNode(media,{hero=false}={}){if(!media)return null;if(media.type==='video'){const wrap=document.createElement('div');wrap.className='service-commercial-media-wrap';const poster=imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[])],{lazy:!hero,priority:hero?'high':'auto'});poster.classList?.add('service-video-poster');wrap.append(poster);const video=configureInlineVideoPlayer(document.createElement('video'),media,{autoplay:true,muted:true,loop:true,controls:false,preload:hero?'metadata':'none'});video.classList.add('service-commercial-video');bindPublishedVideoSource(video,media,()=>{video.remove();},{defer:!hero,metadataReady:false,timeoutMs:45000});wrap.append(video);if(!hero)bindDeferredAutoplay(video,wrap);return wrap;}return imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[]),media.media_url,...(media.media_candidates||[])],{lazy:!hero,priority:hero?'high':'auto',upgradeUrls:[media.media_url,...(media.media_candidates||[])]});}
function createServiceCommercialBlock(category,item,block){
  if(!block||block.visible===false)return null;block=normalizeSharedPublicBlock(block);const config=servicesConfig();
  const shared=createSharedPageBlock(block,{defaultTitle:'Pronto para começar?',defaultButtonUrl:serviceWhatsappHref(category,item),defaultButtonLabel:block.button_label||item.cta_label||config.cta_label||'Solicitar orçamento',quoteServiceId:String(item.id||''),mediaResolver:servicePublicMedia,mediaNode:(media)=>serviceMediaNode(media)});
  if(shared){serviceBlockFrame(shared,block);shared.classList.add('service-commercial-shared');return shared;}
  let node=document.createElement('section');serviceBlockFrame(node,block);
  if(block.type==='service_hero'){node.classList.add('service-detail-hero');const visual=document.createElement('div');visual.className='service-detail-visual';const media=servicePublicMedia(block.media_id||item.cover_media_id||category.cover_media_id),mediaNode=serviceMediaNode(media,{hero:true});if(mediaNode)visual.append(mediaNode);else visual.innerHTML=`<span>${esc(category.number||'')}</span><i></i>`;const copy=document.createElement('div');copy.className='service-detail-copy';const back=document.createElement('a');back.className='service-detail-back';back.href=servicesHref(`#service-${category.id}`);back.textContent='← Voltar para serviços';const eyebrow=document.createElement('small');eyebrow.textContent=block.eyebrow||item.page_eyebrow||category.short_title||category.title||'Serviço';const title=document.createElement('h1');title.textContent=block.title||item.page_title||item.title||'Serviço';const intro=document.createElement('p');intro.textContent=block.body||item.page_intro||item.description||'';const price=document.createElement('strong');price.className='service-detail-price';price.textContent=servicePrice(item);copy.append(back,eyebrow,title,intro,price);const facts=document.createElement('div');facts.className='service-detail-facts';if(item.unit)facts.innerHTML+=`<div><small>UNIDADE</small><strong>${esc(item.unit)}</strong></div>`;if(config.show_deadlines!==false&&item.deadline)facts.innerHTML+=`<div><small>PRAZO</small><strong>${esc(item.deadline)}</strong></div>`;if(config.show_revisions!==false)facts.innerHTML+=`<div><small>REVISÕES</small><strong>${Number(item.revisions||0)}</strong></div>`;copy.append(facts);const actions=document.createElement('div');actions.className='service-detail-actions';let primary;if(quoteEnabled()){primary=document.createElement('button');primary.type='button';primary.dataset.quoteAddService=String(item.id||'');primary.textContent=item.cta_label||config.quote_item_action_label||'Adicionar ao orçamento';}else{primary=document.createElement('a');primary.href=serviceWhatsappHref(category,item);primary.target='_blank';primary.rel='noopener';primary.textContent=item.cta_label||config.cta_label||'Solicitar orçamento';}const catalog=document.createElement('a');catalog.href=servicesHref(`#service-${category.id}`);catalog.textContent='Ver catálogo completo';actions.append(primary,catalog);copy.append(actions);node.append(visual,copy);return node;}
  if(block.type==='service_benefits'||block.type==='service_deliverables'){const source=Array.isArray(block.items)&&block.items.length?block.items:(block.type==='service_benefits'?(item.benefits?.length?item.benefits:item.deliverables||[]):item.deliverables||[]);node.classList.add('service-commercial-list');node.append(serviceBlockHeading(block,{eyebrow:block.type==='service_benefits'?'Benefícios':'Entregáveis',title:block.type==='service_benefits'?'Por que este serviço':'O que está incluído'}));const list=document.createElement('ul');source.filter(Boolean).forEach((value)=>{const li=document.createElement('li');li.textContent=value;list.append(li);});if(list.children.length)node.append(list);return node;}
  if(block.type==='service_pricing'){node.classList.add('service-commercial-pricing');node.append(serviceBlockHeading(block,{eyebrow:'Investimento',title:'Escopo comercial'}));const grid=document.createElement('div');grid.className='service-commercial-facts';grid.innerHTML=`<article><small>INVESTIMENTO</small><strong>${esc(servicePrice(item))}</strong></article>${item.unit?`<article><small>UNIDADE</small><strong>${esc(item.unit)}</strong></article>`:''}${config.show_deadlines!==false&&item.deadline?`<article><small>PRAZO</small><strong>${esc(item.deadline)}</strong></article>`:''}${config.show_revisions!==false?`<article><small>REVISÕES</small><strong>${Number(item.revisions||0)}</strong></article>`:''}`;node.append(grid);return node;}
  return null;
}
function renderServiceDetailPage(category,item){$('#filters')?.setAttribute('hidden','');
  const root=$('#customPageRoot'),main=$('#top');if(!root||!main)return;['hero','introBlock','lettering','projectsBlock','about','contact'].forEach((id)=>{const node=$('#'+id);if(node)node.hidden=true;});root.hidden=false;root.replaceChildren();root.className='service-detail-page service-commercial-page';root.style.setProperty('--service-accent',category?.accent||'var(--accent)');document.body.dataset.page='service-detail';document.title=`${item.page_title||item.title||'Serviço'} | ${DATA.identity?.studio_name||'Mensagem Studio'}`;
  const blocks=servicePageBlocks(category,item);blocks.forEach((block)=>{const node=createServiceCommercialBlock(category,item,block);if(node)root.append(node);});
  const next=visibleServiceRecords().filter(({item:other})=>other.page_enabled!==false&&String(other.id)!==String(item.id)).slice(0,3);if(next.length){const related=document.createElement('section');related.className='service-detail-related reveal';related.innerHTML='<small>OUTRAS SOLUÇÕES</small><h2>Serviços que podem complementar o projeto</h2>';const grid=document.createElement('div');next.forEach(({category:cat,item:other})=>{const a=document.createElement('a');a.href=serviceDetailHref(other);a.innerHTML=`<span>${esc(cat.short_title||cat.title||'Serviço')}</span><strong>${esc(other.title||'Serviço')}</strong><i>↗</i>`;grid.append(a);});related.append(grid);root.append(related);}bindReveal();tick();
}

function renderServicesPage(){$('#filters')?.setAttribute('hidden','');
  const config=servicesConfig(),root=$('#customPageRoot'),main=$('#top');if(!root||!main)return;['hero','introBlock','lettering','projectsBlock','about','contact'].forEach((id)=>{const node=$('#'+id);if(node)node.hidden=true;});root.hidden=false;root.replaceChildren();root.className='services-public-page';root.dataset.serviceLayout=config.layout_style||'editorial';root.dataset.catalogDensity=config.catalog_density||'comfortable';root.dataset.coverRatio=config.cover_ratio||'portrait';document.body.dataset.page='services';document.title=`${config.title||'Serviços'} | ${DATA.identity?.studio_name||'Mensagem Studio'}`;
  const categories=visibleServiceCategories(),options=categories.reduce((total,category)=>total+visibleServiceItems(category).length,0),head=document.createElement('header');head.className='services-public-head reveal';const headCopy=document.createElement('div');const eyebrow=document.createElement('small');eyebrow.textContent=config.eyebrow||'Soluções criativas';const title=document.createElement('h1');title.textContent=config.title||'Serviços profissionais';const intro=document.createElement('p');intro.textContent=config.intro||'';const actions=document.createElement('div');actions.className='services-head-actions';const useQuote=quoteEnabled()&&config.brief_visible!==false,primary=document.createElement(useQuote?'button':'a');if(useQuote){primary.type='button';primary.dataset.serviceOpenBrief='';primary.textContent=config.brief_button||'Abrir orçamento';}else{primary.href=serviceWhatsappHref(null,null);primary.target='_blank';primary.rel='noopener';primary.textContent=config.cta_label||'Solicitar orçamento';}const note=document.createElement('span');note.textContent=config.response_note||'';actions.append(primary,note);headCopy.append(eyebrow,title,intro,actions);const stats=document.createElement('dl');stats.className='services-head-stats';stats.innerHTML=`<div><dt>${categories.length}</dt><dd>áreas criativas</dd></div><div><dt>${options}</dt><dd>soluções comerciais</dd></div><div><dt>BR</dt><dd>atendimento remoto</dd></div>`;head.append(headCopy,stats);root.append(head);
  const nav=document.createElement('nav');nav.className='services-jump-nav horizontal-context-nav';nav.setAttribute('aria-label','Áreas de serviços');visibleServiceCategories().forEach((category)=>{const a=document.createElement('a');a.href=`#service-${category.id}`;a.textContent=category.short_title||category.title;nav.append(a);});root.append(nav);
  const process=serviceProcessSection();if(process)root.append(process);
  const grid=document.createElement('div');grid.className='services-category-stack';visibleServiceCategories().forEach((category,index)=>grid.append(serviceCategoryCard(category,index)));root.append(grid);
  if(config.price_note){const note=document.createElement('p');note.className='services-price-note';note.textContent=config.price_note;root.append(note);}
  const quote=serviceQuoteBuilder();if(quote)root.append(quote);
  const cta=document.createElement('section');cta.className='services-final-cta reveal';const ctaCopy=document.createElement('div');const ctaTitle=document.createElement('h2');ctaTitle.textContent=config.cta_title||'Vamos construir algo relevante?';const ctaBody=document.createElement('p');ctaBody.textContent=config.cta_body||'';ctaCopy.append(ctaTitle,ctaBody);const link=document.createElement('a');link.href=serviceWhatsappHref(null,null);link.target='_blank';link.rel='noopener';link.textContent=config.cta_label||'Solicitar orçamento';cta.append(ctaCopy,link);root.append(cta);bindReveal();tick();
  bindServiceCommerce(root);updateServiceQuoteUI();
}
function renderServicesHome(){
  const config=servicesConfig();document.querySelector('#servicesOverview')?.remove();if(config.visible===false||config.show_on_home===false)return;const categories=visibleServiceCategories();if(!categories.length)return;const section=document.createElement('section');section.id='servicesOverview';section.className='services-home-section reveal';const head=document.createElement('div');head.className='services-home-head';const copy=document.createElement('div');const eyebrow=document.createElement('small');eyebrow.textContent=config.eyebrow||'Serviços';const title=document.createElement('h2');title.textContent=config.home_title||config.title||'Serviços profissionais';const intro=document.createElement('p');intro.textContent=config.home_intro||config.intro||'';copy.append(eyebrow,title,intro);const link=document.createElement('a');link.href=servicesHref();link.textContent='Ver serviços e valores';head.append(copy,link);section.append(head);const grid=document.createElement('div');grid.className='services-home-grid';categories.forEach((category,index)=>{const card=document.createElement('a');card.href=servicesHref(`#service-${category.id}`);card.className='service-home-card';card.style.setProperty('--service-accent',category.accent||'var(--accent)');const media=servicePublicMedia(category.cover_media_id);if(media){card.classList.add('has-cover');const visual=document.createElement('span');visual.className='service-home-card-visual';if(media.type==='video'){const posterNode=imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[])],{lazy:true});posterNode.classList?.add('service-video-poster');visual.append(posterNode);if(!media.hosted_video_chunked){const video=document.createElement('video');video.muted=true;video.loop=true;video.autoplay=true;video.playsInline=true;video.preload='none';video.poster=media.thumbnail_url||'';bindPublishedVideoSource(video,media,()=>{video.remove();},{defer:true,metadataReady:false,timeoutMs:45000});visual.append(video);bindDeferredAutoplay(video,card);}}else visual.append(imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[]),media.media_url,...(media.media_candidates||[])],{lazy:true,upgradeUrls:[media.media_url,...(media.media_candidates||[])]}));card.append(visual);}const number=document.createElement('span');number.textContent=category.number||String(index+1).padStart(2,'0');const name=document.createElement('strong');name.textContent=category.title||'Serviço';const body=document.createElement('p');body.textContent=category.description||'';const arrow=document.createElement('i');arrow.textContent='↗';card.append(number,name,body,arrow);grid.append(card);});section.append(grid);const before=$('#about')||$('#contact')||null;(before?.parentNode||$('#top'))?.insertBefore(section,before);bindReveal();
}

function publicCustomPages(){const pages=DATA.site_builder?.custom_pages||{};return Object.values(pages).filter((page)=>page&&page.visible!==false);}
function normalizePath(value=''){return String(value||'').replace(/^https?:\/\/[^/]+/i,'').replace(/^\/+|\/+$/g,'').toLowerCase();}
function currentCustomPage(){const path=requestedRoutePath();if(!path)return null;return publicCustomPages().find((page)=>normalizePath(page.full_path||page.slug)===path)||null;}
function renderCustomPage(page){$('#filters')?.setAttribute('hidden','');
  const root=$('#customPageRoot'),main=$('#top');if(!root||!main)return;['hero','introBlock','lettering','projectsBlock','about','contact'].forEach((id)=>{const node=$('#'+id);if(node)node.hidden=true;});root.hidden=false;root.replaceChildren();root.dataset.pageId=page.id||'';
  const head=document.createElement('header');head.className='custom-public-page-head reveal';if(page.eyebrow){const e=document.createElement('small');e.textContent=page.eyebrow;head.append(e);}const h=document.createElement('h1');h.textContent=page.title||'Página';head.append(h);if(page.intro){const p=document.createElement('p');p.textContent=page.intro;head.append(p);}root.append(head);
  (Array.isArray(page.sections)?page.sections:[]).forEach((block)=>{const node=createCustomHomeBlock(block);if(node){node.classList.remove('home-modular-instance');node.classList.add('custom-public-page-section');root.append(node);}});bindReveal();tick();
}

function closeSideMenu() {
  const menu=$('#sideMenu');if(!menu)return;menu.classList.remove('is-open');menu.setAttribute('aria-hidden','true');$('#siteMenuTrigger')?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');
}
function openSideMenu() {
  const menu=$('#sideMenu');if(!menu||!document.body.classList.contains('side-menu-enabled'))return;menu.classList.add('is-open');menu.setAttribute('aria-hidden','false');$('#siteMenuTrigger')?.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');
}
function renderSideNavigation() {
  const root=$('#sideMenuLinks');if(!root)return;
  const navigation=DATA.site_builder?.navigation||{};
  const mobileDrawer = DATA.site_builder?.global?.header?.mobile_mode === 'drawer';
  $('#siteMenuTrigger')?.toggleAttribute('hidden', navigation.side_menu_enabled===false && !mobileDrawer);
  root.replaceChildren();
  const addLink=(label,target,filterId='',depth=0)=>{const button=document.createElement('button');button.type='button';button.className='side-menu-link';button.style.setProperty('--menu-depth',String(depth));button.innerHTML=`<span>${esc(label)}</span><b>↗</b>`;button.dataset.target=target||'';if(filterId)button.dataset.filterId=filterId;root.append(button)};
  if(navigation.show_top_link!==false) addLink(navigation.top_label||'Ir para o topo','#top');
  // The floating menu reuses the global menu tree; dedicated visibility toggles
  // can suppress Services/Contact without creating a second route model.
  const menuItems=(DATA.site_builder?.global?.header?.menu_items||[]).filter((item)=>item&&item.visible!==false).slice().sort((a,b)=>Number(a.order||0)-Number(b.order||0));
  if(menuItems.length){
    const depthFor=(item)=>{let depth=0,parent=item.parent_id,seen=new Set();while(parent&&!seen.has(parent)){seen.add(parent);const p=menuItems.find((x)=>x.id===parent);if(!p)break;depth+=1;parent=p.parent_id;}return depth;};
    menuItems.forEach((item)=>{
      if(item.id==='home') return;
      if(item.id==='services'&&navigation.show_services_link===false) return;
      if(item.id==='contact'&&navigation.show_contact_link===false) return;
      addLink(item.label||'Página',publicRouteHref(item.target||'#'),'',depthFor(item));
    });
  }
  if(navigation.show_home_sections===true){
    publicHomeBlocks().forEach((block)=>{
      if(block.visible===false||block.type==='hero')return;
      const coreId=CORE_HOME_BLOCK_IDS[block.type];
      const target=coreId?`#${coreId}`:`#home-${String(block.id||block.type).replace(/[^a-zA-Z0-9_-]+/g,'-')}`;
      const label=block.label||block.title||({intro:'Introdução',lettering:'Manifesto',projects:navigation.projects_label||'Work',about:navigation.about_label||'Sobre',contact:navigation.contact_label||'Contato'}[block.type])||'Seção';
      addLink(label,target);
    });
  }
  if(navigation.show_drive_sections!==false){
    (DATA.filters||[]).forEach((item)=>addLink(item.title||item.name||(String(item.id)==='all'?'Todos':'Categoria'),'#projectsBlock',String(item.id),1));
  }
}

// V5.19 · Section pages --------------------------------------------------------
function sectionForId(sectionId) {
  return (DATA.sections || []).find((item) => String(item.id || '') === String(sectionId)) || null;
}

function projectsForSection(sectionId) {
  return (DATA.projects || []).filter((project) => {
    if (project.hidden) return false;
    return String(project.section_id || project.physical_category_id || project.category_id || '') === String(sectionId);
  });
}

function sectionPageConfig(sectionId) {
  const section = sectionForId(sectionId);
  if (!section) return null;
  const source = DATA.site_builder?.section_pages?.[sectionId] || {};
  const headerId = `section-${sectionId}-header`;
  const projectsId = `section-${sectionId}-projects`;
  const blocks = Array.isArray(source.blocks) ? source.blocks.filter((block) => block && block.type).map((block) => ({ ...block })) : [];
  if (!blocks.some((block) => String(block.id || '') === headerId)) blocks.unshift({ id:headerId, type:'section_header', visible:true, core:true });
  if (!blocks.some((block) => String(block.id || '') === projectsId)) blocks.push({ id:projectsId, type:'section_projects', visible:true, core:true });
  return {
    ...source,
    enabled: source.enabled !== false,
    eyebrow: source.eyebrow || 'Categoria',
    title: source.title || section.title || 'Categoria',
    body: source.body || '',
    blocks,
  };
}

function createSectionHeaderBlock(sectionId, page, block = {}) {
  const section = sectionForId(sectionId);
  if (!section) return null;
  const node = document.createElement('section');
  node.className = 'section-page-header reveal';
  applyHomeSectionFrame(node, block);
  const meta = document.createElement('div'); meta.className = 'section-page-meta';
  const eyebrow = document.createElement('small'); eyebrow.textContent = page.eyebrow || 'Categoria';
  const count = document.createElement('span'); const total = projectsForSection(sectionId).length; count.textContent = `${total} ${total === 1 ? 'projeto' : 'projetos'}`;
  meta.append(eyebrow, count);
  const title = document.createElement('h2'); title.textContent = page.title || section.title || 'Categoria'; title.dataset.parallaxText='14';
  node.append(meta, title);
  if (page.body) { const body=document.createElement('p'); body.textContent=page.body; node.append(body); }
  return node;
}

function createSectionProjectsBlock(sectionId, block = {}) {
  const node = document.createElement('section');
  node.className = `section-page-projects reveal sf-grid-cols-${block.grid_columns || '3'} sf-card-ratio-${block.card_ratio || '4x3'} sf-grid-gap-${block.grid_gap || 'normal'} sf-section-width-${block.section_width || 'full'} sf-section-size-${block.section_size || 'normal'} sf-section-bg-${block.section_background || 'none'}`;
  const list = projectsForSection(sectionId);
  const grid = document.createElement('div'); grid.className = 'grid section-page-grid';
  list.forEach((project, index) => grid.append(card(project, index)));
  if (!list.length) { const empty=document.createElement('div'); empty.className='empty'; empty.textContent='Nenhum projeto publicável nesta categoria.'; node.append(empty); }
  else node.append(grid);
  return node;
}

function createSectionCustomBlock(sectionId, block) {
  const local = projectsForSection(sectionId);
  const prepared = { ...block };
  if (!prepared.project_id && ['showcase','full_media','split','video_feature','spotlight'].includes(prepared.type)) {
    const project = local.find((item) => item.featured) || local.find((item) => item.hero) || local[0];
    if (project) prepared.project_id = project.project_id || project.id;
  }
  if (['horizontal_projects','auto_carousel'].includes(prepared.type) && (!prepared.category_id || prepared.category_id === 'all')) prepared.category_id = sectionId;
  const node = createCustomHomeBlock(prepared);
  if (node) { node.classList.remove('home-modular-instance'); node.classList.add('section-page-custom'); node.dataset.sectionPageBlockId = block.id || ''; }
  return node;
}

function renderSectionPage(sectionId) {
  const root = $('#sectionPage');
  if (!root) return false;
  const page = sectionPageConfig(sectionId);
  if (!page || page.enabled === false) { root.hidden=true; root.replaceChildren(); return false; }
  root.replaceChildren();
  page.blocks.forEach((block) => {
    if (block.visible === false) return;
    let node = null;
    if (block.type === 'section_header') node = createSectionHeaderBlock(sectionId, page, block);
    else if (block.type === 'section_projects') node = createSectionProjectsBlock(sectionId, block);
    else node = createSectionCustomBlock(sectionId, block);
    if (node) { node.dataset.sectionBlockId = block.id || ''; root.append(node); }
  });
  root.hidden = false;
  $('#grid').hidden = true;
  $('#empty').hidden = true;
  bindReveal();
  tick();
  return true;
}

function clearSectionPage() {
  const root = $('#sectionPage');
  if (!root) return;
  root.hidden = true;
  root.replaceChildren();
}

function sectionFromLocation() {
  const match = String(location.hash || '').match(/^#section=(.+)$/);
  if (!match) return '';
  try { return decodeURIComponent(match[1]); } catch (_error) { return match[1]; }
}

function updateSectionLocation(id, push = false) {
  const next = id === 'all' ? '#projects' : `#section=${encodeURIComponent(id)}`;
  if (location.hash === next) return;
  const method = push ? 'pushState' : 'replaceState';
  history[method]({ section:id }, '', next);
}

function appendServicesNavigationLink(filters) {
  const config = servicesConfig();
  if (!filters || config.visible === false) return;
  const link = document.createElement('a');
  link.className = 'filter filter-services-link';
  link.href = servicesHref();
  link.textContent = config.menu_label || 'Serviços';
  link.dataset.kind = 'services';
  link.setAttribute('aria-label', `${link.textContent} · área comercial`);
  filters.append(link);
}

function renderFilters() {
  const filters = $('#filters');
  if (!filters) return;
  filters.replaceChildren();
  // V5.12.1: ``filters`` is now the canonical public tab model. Its order is
  // edited in Site Builder and is also used by the exporter to order sections
  // and projects when the visitor selects the aggregate view.
  const configured = Array.isArray(DATA.filters) && DATA.filters.length ? DATA.filters : null;
  if (configured) {
    configured.forEach((item) => filters.append(filterButton(item.title || (item.id === 'all' ? 'Todos' : 'Categoria'), item.id)));
  } else {
    filters.append(filterButton('Todos', 'all'));
    const sections = Array.isArray(DATA.sections) && DATA.sections.length
      ? DATA.sections
      : (DATA.categories || []).filter((item) => item.kind !== 'collection');
    sections.forEach((section) => filters.append(filterButton(section.title, section.id)));
  }
  appendServicesNavigationLink(filters);
}

function filterButton(label, id) {
  const button = document.createElement('button');
  button.className = 'filter';
  button.textContent = label;
  button.dataset.id = id;
  button.addEventListener('click', () => select(id, true));
  return button;
}

function navigationMap() {
  return new Map((DATA.navigation_nodes || []).map((node) => [String(node.id || ''), node]));
}

function navigationAncestors(node) {
  const map = navigationMap();
  const chain = [];
  let current = node;
  const seen = new Set();
  while (current && current.id && !seen.has(String(current.id))) {
    seen.add(String(current.id));
    chain.unshift(current);
    current = current.parent_id ? map.get(String(current.parent_id)) : null;
  }
  return chain;
}

function setDriveBreadcrumb(nodes = []) {
  const root = $('#driveBreadcrumb');
  if (!root) return;
  root.replaceChildren();
  const all = document.createElement('button');
  all.type = 'button'; all.textContent = 'TODOS'; all.className = 'drive-breadcrumb-item';
  all.addEventListener('click', () => select('all', true));
  root.append(all);
  nodes.forEach((node) => {
    const sep = document.createElement('span'); sep.textContent = '/'; sep.setAttribute('aria-hidden', 'true'); root.append(sep);
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'drive-breadcrumb-item'; button.textContent = node.title || 'Pasta';
    button.addEventListener('click', () => node.depth === 1 ? select(node.id, true) : openNavigationNode(node));
    root.append(button);
  });
}

function navigationNodeAsProject(node) {
  return {
    ...node,
    id: node.id,
    project_id: node.project_id || `nav:${node.id}`,
    gallery_id: node.gallery_id || `nav:${node.id}`,
    gallery_title: node.title || 'Pasta',
    section_title: (node.path || [])[0] || 'Portfólio',
    category: (node.path || [])[0] || 'Portfólio',
    gallery_items: Array.isArray(node.gallery_items) ? node.gallery_items : [],
    cover_media_id: node.cover_media_id || (node.gallery_items || [])[0]?.id || '',
    description: node.description || '',
  };
}

function openNavigationNode(node) {
  if (!node) return;
  if (Number(node.depth || 0) === 1) { select(node.id, true); return; }
  setDriveBreadcrumb(navigationAncestors(node));
  openProjectDetail(navigationNodeAsProject(node));
}

function navigationCard(node, index) {
  const project = navigationNodeAsProject(node);
  const button = card(project, index, () => Number(node.depth || 0) === 1 ? select(node.id, true) : openNavigationNode(node));
  button.classList.add('folder-card');
  button.setAttribute('aria-label', `Abrir pasta ${node.title || ''}`.trim());
  const badge = button.querySelector('.type');
  if (badge) {
    const childCount = Number(node.child_folder_count || 0);
    const mediaCount = Number(node.gallery_count || 0);
    badge.textContent = Number(node.depth || 0) === 1 ? 'Seção' : (childCount ? `${childCount} subpastas` : `${mediaCount} ${mediaCount === 1 ? 'mídia' : 'mídias'}`);
  }
  const copy = button.querySelector('.copy p');
  if (copy && !node.description) copy.textContent = (node.path || []).join(' / ');
  return button;
}

function select(id, pushHistory = false) {
  active = id;
  closeProjectDetail(false);
  [...$('#filters').children].forEach((button) => button.classList.toggle('is-active', button.dataset.id === id));
  const isAll = id === 'all';
  const navigation = isAll ? (DATA.navigation_nodes || []).filter((node) => !node.hidden) : [];
  const list = isAll ? [] : (DATA.projects || []).filter((project) => {
    if (project.hidden) return false;
    const sectionId = project.section_id || project.physical_category_id || project.category_id;
    return String(sectionId) === String(id);
  });
  const grid = $('#grid');
  const empty = $('#empty');
  const heading = $('#portfolioHeading');
  if (heading) heading.hidden = !isAll || DATA.site_builder?.projects?.visible === false;
  grid.replaceChildren();
  clearSectionPage();
  const activeSectionNode = (DATA.navigation_nodes || []).find((node) => Number(node.depth || 0) === 1 && String(node.id) === String(id));
  setDriveBreadcrumb(isAll ? [] : (activeSectionNode ? [activeSectionNode] : []));
  const pageRendered = !isAll && renderSectionPage(id);
  if (!pageRendered) {
    grid.hidden = false;
    const total = isAll ? navigation.length : list.length;
    empty.hidden = Boolean(total);
    if (!total && !isAll) empty.textContent = 'Nenhuma pasta ou mídia publicável nesta seção.';
    else if (!total) empty.textContent = 'Nenhuma pasta disponível.';
    if (isAll) navigation.forEach((node, index) => grid.append(navigationCard(node, index)));
    else list.forEach((project, index) => grid.append(card(project, index)));
    bindReveal();
  }
  updateSectionLocation(id, pushHistory);
}
function uniqueUrls(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function mediaPlaceholder(project, { unavailable = false } = {}) {
  const placeholder = document.createElement('span');
  const folder = project?.type === 'folder';
  placeholder.className = `media-placeholder ${unavailable ? 'is-unavailable' : 'is-loading'}`;
  if (folder) { placeholder.classList.add('is-folder'); placeholder.textContent = 'PASTA'; }
  else if (unavailable) { placeholder.innerHTML = '<i aria-hidden="true">↗</i><small>Sem prévia</small>'; }
  else { placeholder.setAttribute('aria-hidden', 'true'); placeholder.innerHTML = '<i></i>'; }
  return placeholder;
}

function armImageTimeout(image, next, timeoutMs) {
  let timer = 0;
  const arm = () => { clearTimeout(timer); if (!image.complete) timer = setTimeout(next, timeoutMs); };
  const clear = () => clearTimeout(timer);
  if (image.loading === 'lazy' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, io) => {
      if (entries.some((entry) => entry.isIntersecting)) { arm(); io.disconnect(); }
    }, { rootMargin: MEDIA_NEAR_VIEWPORT_MARGIN, threshold: 0 });
    observer.observe(image);
  } else arm();
  image.addEventListener('load', clear);
  image.addEventListener('error', clear);
  return { arm, clear };
}

function queueImageUpgrade(image, urls = []) {
  const candidates = uniqueUrls(urls).filter((url) => url && url !== image.currentSrc && url !== image.src && !mediaUrlRecentlyFailed(url));
  if (!candidates.length || image.dataset.stablePoster === '1') return;
  const upgrade = () => {
    let index = 0;
    const tryNext = () => {
      if (index >= candidates.length || !image.isConnected) return;
      const url = candidates[index++];
      const probe = new Image();
      probe.decoding = 'async';
      probe.alt = image.alt || '';
      probe.className = image.className;
      probe.loading = 'eager';
      if ('fetchPriority' in probe) probe.fetchPriority = 'low';
      probe.onload = async () => {
        try { if (probe.decode) await probe.decode(); } catch (_) {}
        if (!image.isConnected) return;
        // Never mutate the source of the last-known-good image. Swap only an
        // image that is already completely loaded, so a failed upgrade cannot
        // blank a poster that was visible on screen.
        probe.dataset.quality = 'full';
        probe.style.cssText = image.style.cssText;
        image.replaceWith(probe);
      };
      probe.onerror = () => { markMediaUrlFailed(url); tryNext(); };
      probe.src = url;
    };
    tryNext();
  };
  if ('requestIdleCallback' in window) requestIdleCallback(upgrade, { timeout: 1800 });
  else setTimeout(upgrade, 240);
}

function imageWithFallback(project, urls, { lazy = true, priority = 'auto', timeoutMs = MEDIA_LOAD_TIMEOUT_MS, upgradeUrls = [] } = {}) {
  const allCandidates = uniqueUrls(urls);
  // A transient failure must never permanently remove the only usable URL.
  // Fresh URLs are tried first, recently failed URLs remain as last-resort retry.
  const candidates = [
    ...allCandidates.filter((url) => !mediaUrlRecentlyFailed(url)),
    ...allCandidates.filter((url) => mediaUrlRecentlyFailed(url)),
  ];
  if (!candidates.length) return mediaPlaceholder(project, { unavailable: true });
  const image = document.createElement('img');
  if (project?.hosted_poster) image.dataset.stablePoster = '1';
  image.className = 'media-progressive-image is-loading';
  image.loading = lazy ? 'lazy' : 'eager';
  image.decoding = 'async';
  if ('fetchPriority' in image) image.fetchPriority = priority;
  image.alt = project?.title || '';
  let index = 0;
  let timeoutHandle = null;
  const clearTimer = () => { if (timeoutHandle?.clear) timeoutHandle.clear(); timeoutHandle = null; };
  const next = (reason = 'error') => {
    clearTimer();
    const failed = image.currentSrc || image.src;
    if (failed) { markMediaUrlFailed(failed); mediaDiagnostic(project,'failed',failed,reason); }
    if (index >= candidates.length) { image.replaceWith(mediaPlaceholder(project, { unavailable: true })); return; }
    const url=candidates[index++];
    if(index>1) mediaDiagnostic(project,'fallback',url,`candidate-${index}`);
    image.src = url;
    timeoutHandle = armImageTimeout(image, () => next('timeout'), timeoutMs);
  };
  image.addEventListener('load', () => {
    clearTimer(); image.classList.remove('is-loading'); image.classList.add('is-loaded');
    mediaDiagnostic(project,'loaded',image.currentSrc||image.src,`candidate-${Math.max(1,index)}`);
    queueMicrotask(() => image.parentElement?.classList.add('media-loaded'));
    if (upgradeUrls.length && !project?.hosted_poster) queueImageUpgrade(image, upgradeUrls);
  });
  image.addEventListener('error', () => next('browser-error'));
  next('initial');
  return image;
}

function projectCoverRecord(project = {}) {
  const items = Array.isArray(project.gallery_items) ? project.gallery_items.filter(Boolean) : [];
  const direct = uniqueUrls([project.thumbnail_url, ...(project.thumbnail_candidates || []), project.media_url, ...(project.media_candidates || []), project.preview_url, ...(project.preview_candidates || [])]);
  if (direct.length) return project;
  const wanted = String(project.cover_media_id || '');
  const cover = items.find((item) => String(item?.id || '') === wanted)
    || items.find((item) => uniqueUrls([item?.thumbnail_url, ...(item?.thumbnail_candidates || []), item?.media_url, ...(item?.media_candidates || [])]).length)
    || items[0];
  return cover ? { ...project, ...cover, title: project.title || cover.title || '', project_id: project.project_id || project.id, cover_media_id: cover.id || wanted } : project;
}

function poster(project, { eager = false } = {}) {
  const cover = projectCoverRecord(project);
  const primary = [cover.thumbnail_url, ...(cover.thumbnail_candidates || [])];
  // Images can be rendered directly; video/PDF must use a real poster image.
  if (cover.type === 'image') primary.push(cover.media_url, ...(cover.media_candidates || []), cover.preview_url, ...(cover.preview_candidates || []));
  return imageWithFallback(cover, primary, { lazy: !eager, priority: eager ? 'high' : 'auto', timeoutMs: eager ? 4500 : MEDIA_LOAD_TIMEOUT_MS });
}


function heroAsset(project) {
  return project?.hero_asset && project.hero_asset.type ? { ...project, ...project.hero_asset, title: project.title } : project;
}

function heroCandidates(project) {
  if (project.type === 'image') {
    return uniqueUrls([project.thumbnail_url, ...(project.thumbnail_candidates || []), project.media_url, ...(project.media_candidates || [])]);
  }
  return uniqueUrls([project.thumbnail_url, ...(project.thumbnail_candidates || [])]);
}
function heroUpgradeCandidates(project) {
  return project.type === 'image' ? uniqueUrls([project.media_url, ...(project.media_candidates || [])]) : [];
}

function configuredHeroSlides(heroConfig, visible) {
  const configured = Array.isArray(heroConfig.slides) ? heroConfig.slides : [];
  const assets = DATA.hero_assets || {};
  const output = [];
  const resolve = (mediaId) => {
    const id = String(mediaId || '');
    if (!id) return { owner:null, media:null };
    for (const project of visible) {
      const found = (project.gallery_items || []).find((item) => String(item.id || '') === id);
      if (found) return { owner:project, media:found };
    }
    return { owner:null, media:assets[id] || null };
  };
  configured.forEach((slideConfig) => {
    const mediaId = String(slideConfig?.media_id || '');
    const mobileMediaId = String(slideConfig?.mobile_media_id || '');
    if (!mediaId && !mobileMediaId) return;
    const webResolved = resolve(mediaId || mobileMediaId);
    const mobileResolved = resolve(mobileMediaId);
    const media = webResolved.media;
    if (!media) return;
    const owner = webResolved.owner || mobileResolved.owner;
    const standalone = !owner;
    output.push({
      ...(owner || { id: `hero:${mediaId || mobileMediaId}`, project_id: '', title: media.title || 'Banner', description: media.description || '' }),
      hero_asset: { ...media },
      _hero_mobile_asset: mobileResolved.media ? { ...mobileResolved.media } : null,
      _hero_duration: Math.max(2, Math.min(30, Number(slideConfig.duration || heroConfig.rotation_seconds || 6))),
      _hero_transition_in: (() => { const value = String(slideConfig.transition_in || slideConfig.transition || 'fade'); const migrated = value === 'zoom' ? 'slow_zoom' : value; return ['fade','crossfade','slow_zoom','parallax','slide','reveal'].includes(migrated) ? migrated : 'fade'; })(),
      _hero_transition_out: (() => { const value = String(slideConfig.transition_out || 'crossfade'); const migrated = value === 'zoom' ? 'slow_zoom' : value; return ['fade','crossfade','slow_zoom','parallax','slide','reveal'].includes(migrated) ? migrated : 'crossfade'; })(),
      _hero_intensity: Math.max(0, Math.min(100, Number(slideConfig.intensity ?? 60))),
      _hero_slide_id: String(slideConfig.id || mediaId || mobileMediaId),
      _hero_standalone: standalone,
    });
  });
  return output;
}

function renderHero() {
  const visible = (DATA.projects || []).filter((project) => !project.hidden && ['image', 'video'].includes(project.type));
  const heroConfig = (DATA.site_builder || {}).hero || {};
  let configuredSlides = configuredHeroSlides(heroConfig, visible);
  if (!configuredSlides.length && (String(heroConfig.media_id || '').trim() || String(heroConfig.mobile_media_id || '').trim())) {
    configuredSlides = configuredHeroSlides({ ...heroConfig, slides:[{ id:'hero-fallback', media_id:heroConfig.media_id || heroConfig.mobile_media_id || '', mobile_media_id:heroConfig.mobile_media_id || '', duration:heroConfig.rotation_seconds || 6.2 }] }, visible);
  }
  const explicit = String(heroConfig.media_id || '').trim() ? visible.filter((project) => project.hero_selected) : [];
  const selected = visible.filter((project) => project.hero);
  const featured = visible.filter((project) => project.featured);
  heroProjects = configuredSlides.length ? configuredSlides : (explicit.length ? explicit : (selected.length ? selected : (featured.length ? featured : visible.slice(0, 4))));
  const root = $('#heroMedia');
  const pagination = $('#heroPagination');
  root.replaceChildren();
  pagination.replaceChildren();
  if (!heroProjects.length) { if ($('#heroOpen')) $('#heroOpen').hidden = true; return; }

  heroProjects.forEach((project, index) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide';
    slide.dataset.index = String(index);
    slide.dataset.transition = project._hero_transition_in || 'fade';
    slide.style.setProperty('--hero-slide-intensity', String(Math.max(0, Math.min(100, Number(project._hero_intensity ?? 60)))));
    root.append(slide);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-dot';
    dot.setAttribute('aria-label', `Banner ${index + 1}: ${project.title}`);
    dot.addEventListener('click', () => activateHero(index, true));
    pagination.append(dot);
  });
  activateHero(0, false);
  if (!reduced && heroProjects.length > 1) scheduleHero();
}

const HERO_MOBILE_QUERY = matchMedia('(max-width:700px)');
function heroAssetForViewport(project) {
  const asset = HERO_MOBILE_QUERY.matches && project?._hero_mobile_asset ? project._hero_mobile_asset : project?.hero_asset;
  return asset && asset.type ? { ...project, ...asset, title: project.title } : heroAsset(project);
}
function ensureHeroMedia(slide, project) {
  const variant = HERO_MOBILE_QUERY.matches && project?._hero_mobile_asset ? 'mobile' : 'web';
  if (slide.dataset.loadedVariant === variant && slide.childElementCount) return;
  slide.dataset.loadedVariant = variant;
  slide.replaceChildren();
  project = heroAssetForViewport(project);
  if (project.type === 'video' && project.hero_autoplay && (project.media_url || (project.media_candidates || []).length)) {
    const video = document.createElement('video');
    video.muted = true; video.loop = true; video.playsInline = true; video.preload = 'metadata';
    video.poster = project.thumbnail_url || '';
    const sources = uniqueUrls([project.media_url, ...(project.media_candidates || [])]);
    let sourceIndex = 0;
    const next = () => {
      if (sourceIndex >= sources.length) { video.replaceWith(imageWithFallback(project, heroCandidates(project), { lazy: false, priority: 'high', upgradeUrls: heroUpgradeCandidates(project) })); return; }
      video.src = sources[sourceIndex++]; video.load();
    };
    video.addEventListener('error', next);
    next();
    slide.append(video);
  } else {
    slide.append(imageWithFallback(project, heroCandidates(project), { lazy: false, priority: 'high', upgradeUrls: heroUpgradeCandidates(project) }));
  }
}
HERO_MOBILE_QUERY.addEventListener?.('change', () => {
  document.querySelectorAll('.hero-slide').forEach((slide) => { slide.dataset.loadedVariant = ''; });
  activateHero(heroIndex, false);
});

function activateHero(index, manual = false) {
  if (!heroProjects.length) return;
  const previousIndex = heroIndex;
  heroIndex = (index + heroProjects.length) % heroProjects.length;
  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('.hero-dot')];
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === heroIndex;
    const wasActive = slideIndex === previousIndex && previousIndex !== heroIndex;
    const project = heroProjects[slideIndex] || {};
    if (isActive) {
      ensureHeroMedia(slide, project);
      slide.dataset.transition = project._hero_transition_in || 'fade';
      slide.dataset.phase = 'enter';
      slide.style.setProperty('--hero-slide-intensity', String(Math.max(0, Math.min(100, Number(project._hero_intensity ?? 60)))));
    } else if (wasActive) {
      slide.dataset.transition = project._hero_transition_out || 'crossfade';
      slide.dataset.phase = 'exit';
      slide.classList.add('is-leaving');
      setTimeout(() => slide.classList.remove('is-leaving'), reduced ? 0 : 1450);
    }
    slide.classList.toggle('is-active', isActive);
    const video = slide.querySelector('video');
    if (video) {
      if (isActive) video.play().catch(() => {});
      else video.pause();
    }
  });
  dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === heroIndex));
  const activeProject = heroProjects[heroIndex];
  const heroRoot = $('#hero');
  if (heroRoot) heroRoot.dataset.slideTransition = activeProject?._hero_transition_in || 'fade';
  const heroOpen = $('#heroOpen');
  if (heroOpen && activeProject) {
    heroOpen.hidden = visualLayout.hero_expand === false || activeProject._hero_standalone === true;
    heroOpen.setAttribute('aria-label', `Abrir projeto ${activeProject.title || ''}`.trim());
  }
  if (manual && !reduced && heroProjects.length > 1) scheduleHero();
}

function scheduleHero() {
  clearTimeout(heroTimer);
  const active = heroProjects[heroIndex] || {};
  const fallback = Number((DATA.site_builder || {}).hero?.rotation_seconds || 6.2);
  const seconds = Math.max(2, Math.min(30, Number(active._hero_duration || fallback)));
  heroTimer = setTimeout(() => {
    activateHero(heroIndex + 1, false);
    scheduleHero();
  }, seconds * 1000);
}

function bindCardInteraction(button, media, mediaInner) {
  const mode = visualLayout.card_interaction || 'responsive';
  if (mode === 'off' || reduced || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  let raf = 0;
  let pending = null;
  const apply = () => {
    raf = 0;
    if (!pending) return;
    const rect = media.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = clamp((pending.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((pending.clientY - rect.top) / rect.height, 0, 1);
    const nx = (x - .5) * 2;
    const ny = (y - .5) * 2;
    const travel = mode === 'subtle' ? 2.4 : 5.5;
    media.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
    media.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`);
    mediaInner.style.setProperty('--hover-x', `${(-nx * travel).toFixed(2)}px`);
    mediaInner.style.setProperty('--hover-y', `${(-ny * travel).toFixed(2)}px`);
    button.style.setProperty('--card-pointer-x', nx.toFixed(3));
    button.style.setProperty('--card-pointer-y', ny.toFixed(3));
  };
  media.addEventListener('pointermove', (event) => {
    pending = event;
    if (!raf) raf = requestAnimationFrame(apply);
  });
  media.addEventListener('pointerleave', () => {
    pending = null;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    media.style.removeProperty('--pointer-x');
    media.style.removeProperty('--pointer-y');
    mediaInner.style.setProperty('--hover-x', '0px');
    mediaInner.style.setProperty('--hover-y', '0px');
    button.style.removeProperty('--card-pointer-x');
    button.style.removeProperty('--card-pointer-y');
  });
}

function bindCardVideoPreview(button, video) {
  if (!video || visualLayout.card_video_preview === false || reduced) return;
  const mode = visualLayout.card_video_preview_mode || 'hover';
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
  let requested = false;
  const revealWhenReady = () => {
    if (!requested || video.dataset.failed === '1' || video.dataset.ready !== '1') return;
    video.classList.add('is-previewing');
    video.play().catch(() => {});
  };
  const start = () => {
    if (video.dataset.failed === '1') return;
    requested = true;
    ensureVideoSource(video);
    revealWhenReady();
  };
  const stop = () => {
    requested = false;
    video.classList.remove('is-previewing');
    video.pause();
    try { video.currentTime = 0; } catch (_) {}
  };
  video.addEventListener('loadeddata', revealWhenReady);
  video.addEventListener('canplay', revealWhenReady);
  video.addEventListener('playing', revealWhenReady);
  video.addEventListener('error', () => video.classList.remove('is-previewing'));
  if (mode === 'always') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.intersectionRatio >= .45 ? start() : stop());
    }, { threshold: [0, .45, .75] });
    observer.observe(button);
    return;
  }
  if (finePointer) {
    button.addEventListener('pointerenter', start);
    button.addEventListener('pointerleave', stop);
    button.addEventListener('focusin', start);
    button.addEventListener('focusout', stop);
    return;
  }
  // On touch there is no hover. Keep the stable poster visible; opening the
  // project is the explicit user action that starts the real video player.
}


const COVER_RATIOS = { '4x3':'4 / 3', '16x9':'16 / 9', '21x9':'21 / 9', '1x1':'1 / 1', '4x5':'4 / 5' };
function applyProjectCoverGeometry(project, media, image) {
  const ratio = COVER_RATIOS[String(project?.cover_ratio || '')];
  if (ratio && media) media.style.aspectRatio = ratio;
  if (media) media.style.background = project?.cover_bg || '#121212';
  if (image?.style) {
    image.style.objectFit = project?.cover_fit === 'contain' ? 'contain' : 'cover';
    image.style.objectPosition = `${Math.max(0,Math.min(100,Number(project?.cover_position_x ?? 50)))}% ${Math.max(0,Math.min(100,Number(project?.cover_position_y ?? 50)))}%`;
    image.style.background = project?.cover_bg || '#121212';
  }
}

function card(project, index) {
  const onOpen = arguments.length > 2 ? arguments[2] : null;
  const button = document.createElement('button');
  button.className = 'card reveal';
  button.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`);
  button.setAttribute('aria-label', `Abrir projeto ${project.title || ''}`.trim());
  const media = document.createElement('span');
  media.className = 'media';
  const mediaInner = document.createElement('span');
  mediaInner.className = 'media-inner';
  if (visualLayout.card_parallax !== false) mediaInner.dataset.parallax = 'card';
  const type = document.createElement('span');
  type.className = 'type';
  type.textContent = project.gallery_count > 1
    ? `${project.gallery_count} mídias`
    : ({ image: 'Imagem', video: 'Vídeo', pdf: 'PDF' }[project.type] || 'Projeto');
  const action = document.createElement('span');
  action.className = 'media-action';
  action.innerHTML = '<span>Explorar</span><b>↗</b>';

  const cardPoster = poster(project, { eager: index < 6 });
  cardPoster.classList?.add('card-poster');
  applyProjectCoverGeometry(project, media, cardPoster);
  mediaInner.append(cardPoster);
  let previewVideo = null;
  const previewSources = videoSourceCandidates(project);
  if (project.type === 'video' && !project.hosted_video_chunked && previewSources.length && visualLayout.card_video_preview !== false) {
    previewVideo = document.createElement('video');
    previewVideo.className = 'card-preview-video';
    previewVideo.muted = true;
    previewVideo.loop = true;
    previewVideo.playsInline = true;
    previewVideo.preload = 'none';
    previewVideo.setAttribute('aria-hidden', 'true');
    previewVideo.dataset.mediaId = String(project.id || '');
    previewVideo.dataset.mediaTitle = String(project.title || '');
    bindVideoSourceFallback(previewVideo, previewSources, null, { defer: true });
    mediaInner.append(previewVideo);
  }
  media.append(mediaInner, type, action);

  const copy = document.createElement('span');
  copy.className = 'copy';
  copy.innerHTML = `<span><h3>${esc(project.title)}</h3><p>${esc(project.description || project.path?.join(' · ') || '')}</p></span><em>${String(index + 1).padStart(2, '0')}</em>`;
  button.append(media, copy);
  bindCardInteraction(button, media, mediaInner);
  bindCardVideoPreview(button, previewVideo);
  button.addEventListener('click', () => onOpen ? onOpen(project) : openProjectDetail(project));
  return button;
}

function projectMediaUrls(item) {
  const cover = projectCoverRecord(item);
  // Try full-resolution public media first. Stable hosted/authenticated poster
  // remains the guaranteed fallback when Drive public delivery is unavailable.
  return uniqueUrls([
    cover.media_url,
    ...(cover.media_candidates || []),
    cover.preview_url,
    ...(cover.preview_candidates || []),
    cover.thumbnail_url,
    ...(cover.thumbnail_candidates || []),
  ]);
}

function unavailableMedia(item) {
  const box = document.createElement('div');
  box.className = 'project-media-unavailable';
  const label = document.createElement('strong');
  label.textContent = item.title || 'Mídia indisponível';
  const note = document.createElement('span');
  note.textContent = 'Esta mídia não pôde ser exibida diretamente no navegador.';
  box.append(label, note);
  const target = item.external_url || item.preview_url || (item.preview_candidates || [])[0];
  if (target) {
    const link = document.createElement('a');
    link.href = target;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Abrir no Google Drive ↗';
    box.append(link);
  }
  return box;
}

function projectImage(item) {
  const urls = projectMediaUrls(item);
  if (!urls.length) return unavailableMedia(item);
  const image = document.createElement('img');
  image.className = 'media-progressive-image is-loading';
  image.alt = item.title || '';
  image.loading = 'lazy';
  image.decoding = 'async';
  let index = 0;
  let timeoutHandle = null;
  const clearTimer = () => { if (timeoutHandle?.clear) timeoutHandle.clear(); timeoutHandle = null; };
  const next = () => {
    clearTimer(); const failed = image.currentSrc || image.src; if (failed) markMediaUrlFailed(failed);
    if (index >= urls.length) { image.replaceWith(unavailableMedia(item)); return; }
    image.src = urls[index++]; timeoutHandle = armImageTimeout(image, next, 12000);
  };
  image.addEventListener('load', () => { clearTimer(); image.classList.remove('is-loading'); image.classList.add('is-loaded'); queueMicrotask(() => image.parentElement?.classList.add('media-loaded')); });
  image.addEventListener('error', next);
  next();
  return image;
}

function projectVideo(item) {
  const wrap = document.createElement('div');
  wrap.className = 'project-video-wrap';
  const sources = videoSourceCandidates(item);
  const video = configureInlineVideoPlayer(document.createElement('video'), item, { autoplay:false, muted:false, loop:false });
  video.classList.add('project-inline-video');
  if (sources.length || videoChunkCandidates(item).length) {
    bindPublishedVideoSource(video, item, () => {
      video.replaceWith(projectVideoFallback(item));
    }, { timeoutMs: 45000, metadataReady:false });
    wrap.append(video);
    return wrap;
  }
  wrap.append(projectVideoFallback(item));
  return wrap;
}

function projectVideoFallback(item) {
  const fallback = document.createElement('div');
  fallback.className = 'project-video-fallback';
  const posterNode = imageWithFallback(item, [item.thumbnail_url, ...(item.thumbnail_candidates || [])], { lazy:false, priority:'high' });
  posterNode.classList?.add('project-video-fallback-poster');
  const note = document.createElement('span');
  note.className = 'project-video-fallback-note';
  note.textContent = 'Vídeo temporariamente indisponível para reprodução.';
  fallback.append(posterNode, note);
  return fallback;
}

function projectPdf(item) {
  const wrap = document.createElement('div');
  wrap.className = 'project-pdf';
  const preview = item.preview_url || (item.preview_candidates || [])[0];
  if (preview) {
    const frame = document.createElement('iframe');
    frame.src = preview;
    frame.title = item.title || 'PDF';
    frame.loading = 'lazy';
    frame.allow = 'fullscreen';
    wrap.append(frame);
  } else {
    wrap.append(projectImage(item));
  }
  const target = item.external_url || preview;
  if (target) {
    const link = document.createElement('a');
    link.href = target;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Abrir PDF ↗';
    wrap.append(link);
  }
  return wrap;
}

function projectMediaNode(item) {
  if (item.type === 'image') return projectImage(item);
  if (item.type === 'video') return projectVideo(item);
  if (item.type === 'pdf') return projectPdf(item);
  return unavailableMedia(item);
}



// V5.18 · Project Case Builder -------------------------------------------------
const PUBLIC_CASE_CORE = [
  { id:'case-core-header', type:'case_header', visible:true, core:true },
  { id:'case-core-stream', type:'media_stream', visible:true, core:true, captions:true },
  { id:'case-core-next', type:'next_project', visible:true, core:true, scope:'category', cta:'Próximo projeto' },
];

function publicCaseBlocks(project) {
  const configured = Array.isArray(project?.case_builder?.blocks) ? project.case_builder.blocks.filter((block)=>block && block.type).map((block)=>({...block})) : [];
  const output=[]; const seen=new Set();
  configured.forEach((block,index)=>{
    let id=String(block.id||'').trim() || `case-public-${index}`; if(seen.has(id)) id=`${id}-${index}`; seen.add(id); output.push({...block,id});
  });
  PUBLIC_CASE_CORE.forEach((block)=>{if(!output.some((item)=>item.id===block.id)) output.push({...block});});
  return output;
}

function caseItemById(items, id, type='all') {
  const list=items||[];
  if(String(id||'').trim()) return list.find((item)=>String(item.id)===String(id) && (type==='all'||item.type===type)) || null;
  return list.find((item)=>type==='all'||item.type===type) || null;
}

function caseMediaViewport(project, item, items, {caption=true, className=''}={}) {
  if (!item) return null;
  const figure=document.createElement('figure'); figure.className=`case-media-figure ${className}`.trim();
  const viewport=document.createElement('div'); viewport.className=`project-media-viewport case-media-viewport type-${item.type||'media'}`;
  const inner=document.createElement('div'); inner.className='project-media-inner';
  if (item.type==='image' && visualLayout.card_parallax!==false) inner.dataset.parallax='detail';
  inner.append(projectMediaNode(item)); viewport.append(inner);
  if(item.type==='image'){
    const index=(items||[]).findIndex((entry)=>entry.id===item.id);
    viewport.classList.add('is-expandable'); viewport.setAttribute('role','button'); viewport.setAttribute('aria-label',`Expandir ${item.title||'imagem'}`);
    viewport.addEventListener('click',(event)=>{if(event.target.closest('a,button,iframe,video'))return;openMediaAt(project,index>=0?index:null);});
  }
  figure.append(viewport);
  if(caption){const fig=document.createElement('figcaption');const strong=document.createElement('strong');strong.textContent=item.title||'';fig.append(strong);if(item.description){const span=document.createElement('span');span.textContent=item.description;fig.append(span);}figure.append(fig);}
  return figure;
}

function caseCopy(block, fallbackTitle='') {
  const copy=document.createElement('div'); copy.className='case-copy';
  if(block.eyebrow){const e=document.createElement('span');e.className='case-eyebrow';e.textContent=block.eyebrow;copy.append(e);}
  const title=String(block.title||fallbackTitle||'').trim(); if(title){const h=document.createElement('h3');h.textContent=title;copy.append(h);}
  if(block.body){const p=document.createElement('p');p.textContent=block.body;copy.append(p);}
  return copy;
}

function createCaseTextBlock(block){const section=document.createElement('section');section.className=`case-block case-text reveal width-${block.width||'medium'}`;section.append(caseCopy(block));return section;}
function createCaseLetteringBlock(block){
  const text=String(block.title||'').trim(); if(!text)return null; const section=document.createElement('section');section.className='case-block case-lettering reveal';section.dataset.style=block.style||'split';section.dataset.direction=block.direction||'left';section.dataset.speed='medium';
  if(block.eyebrow){const e=document.createElement('div');e.className='lettering-eyebrow';e.textContent=block.eyebrow;section.append(e);} const mask=document.createElement('div');mask.className='lettering-mask';const track=document.createElement('div');track.className='lettering-track case-lettering-track';track.dataset.caseLettering='1';const a=document.createElement('span');a.className='lettering-primary';a.textContent=text;const b=document.createElement('span');b.className='lettering-outline';b.textContent=text;b.setAttribute('aria-hidden','true');track.append(a,b);mask.append(track);section.append(mask);return section;
}
function createCaseFullMediaBlock(project,block,items){const item=caseItemById(items,block.media_id);if(!item)return null;const section=document.createElement('section');section.className='case-block case-full-media reveal';if(block.title){const copy=caseCopy({title:block.title});copy.classList.add('case-full-title');section.append(copy);}const media=caseMediaViewport(project,item,items,{caption:block.caption!==false,className:'case-full-figure'});if(media)section.append(media);return section;}
function createCaseVideoBlock(project,block,items){const item=caseItemById(items,block.media_id,'video');if(!item)return null;const section=document.createElement('section');section.className='case-block case-video reveal';const copy=caseCopy(block,item.title);if(copy.children.length)section.append(copy);const media=caseMediaViewport(project,item,items,{caption:false,className:'case-video-figure'});if(media)section.append(media);return section;}
function createCaseSplitBlock(project,block,items){const item=caseItemById(items,block.media_id);if(!item)return null;const section=document.createElement('section');section.className=`case-block case-split reveal media-${block.media_side==='right'?'right':'left'}`;const media=caseMediaViewport(project,item,items,{caption:false,className:'case-split-figure'});const copy=caseCopy(block,project.title);if(media)section.append(media,copy);return section;}
function createCaseDuoBlock(project,block,items){const first=caseItemById(items,block.media_id);const second=caseItemById(items,block.media_id_2);if(!first&&!second)return null;const section=document.createElement('section');section.className=`case-block case-duo reveal gap-${block.gap||'normal'}`;if(first)section.append(caseMediaViewport(project,first,items,{caption:false,className:'case-duo-figure'}));if(second&&(!first||second.id!==first.id))section.append(caseMediaViewport(project,second,items,{caption:false,className:'case-duo-figure'}));return section;}

function nextProjectFor(project, scope='category') {
  let list=(DATA.projects||[]).filter((item)=>!item.hidden);
  if(scope==='category'){const section=project.section_id||project.physical_category_id||project.category_id;const local=list.filter((item)=>(item.section_id||item.physical_category_id||item.category_id)===section);if(local.length>1)list=local;}
  if(list.length<=1)return null; const index=list.findIndex((item)=>item.project_id===project.project_id || item.id===project.id); return list[(index>=0?index+1:0)%list.length] || null;
}
function createNextProjectBlock(project,block){const next=nextProjectFor(project,block.scope||'category');if(!next)return null;const section=document.createElement('button');section.type='button';section.className='case-block case-next reveal';const label=document.createElement('span');label.textContent=block.cta||'Próximo projeto';const title=document.createElement('strong');title.textContent=next.title||'Projeto';const arrow=document.createElement('b');arrow.textContent='↗';section.append(label,title,arrow);const poster=document.createElement('div');poster.className='case-next-media';const inner=document.createElement('div');inner.className='project-media-inner';inner.append(imageWithFallback(next,[next.thumbnail_url,...(next.thumbnail_candidates||[]),next.media_url,...(next.media_candidates||[])]));poster.prepend(inner);section.prepend(poster);section.addEventListener('click',()=>openProjectDetail(next));return section;}

function renderLegacyMediaStream(project,items,captions=true,listNode=null){
  const list=listNode || $('#projectMediaList'); if(!list)return; list.replaceChildren();
  items.forEach((item,index)=>{const figure=caseMediaViewport(project,item,items,{caption:captions,className:'project-media-item reveal'});if(!figure)return;figure.style.setProperty('--reveal-delay',`${Math.min(index,5)*45}ms`);list.append(figure);});
}

function applyCaseHeaderPresentation(project, block = {}) {
  const head=$('#projectDetailHead');
  if(!head)return;
  const eyebrow=$('#projectEyebrow');
  const title=$('#projectDetailTitle');
  const description=$('#projectDetailDescription');
  const introMedia=$('#projectDetailIntroMedia');
  const fallbackEyebrow=project.section_title || project.category || 'Projeto';
  const fallbackTitle=project.gallery_title || project.title || 'Projeto';
  const fallbackDescription=project.description || '';
  if(eyebrow) eyebrow.textContent=Object.prototype.hasOwnProperty.call(block,'eyebrow') ? (block.eyebrow||'') : fallbackEyebrow;
  if(title) title.textContent=Object.prototype.hasOwnProperty.call(block,'title') ? (block.title||fallbackTitle) : fallbackTitle;
  if(description){
    const value=Object.prototype.hasOwnProperty.call(block,'body') ? (block.body||'') : fallbackDescription;
    description.textContent=value;
    description.hidden=!value;
  }
  if(introMedia) introMedia.hidden = block.show_cover===false || block.header_layout==='copy-only' || !introMedia.children.length;
  head.dataset.headerLayout=block.header_layout || 'media-copy';
  head.dataset.bodyWidth=block.body_width || 'medium';
  const fontMap={display:'var(--display)',body:'var(--body)',system:'Arial, Helvetica, sans-serif',serif:'Georgia, Times New Roman, serif',mono:'ui-monospace, SFMono-Regular, Consolas, monospace'};
  const colorMap={text:'var(--text)',accent:'var(--accent)',muted:'var(--muted)'};
  const set=(name,value)=>{if(value===undefined||value===null||value===''||value==='auto')head.style.removeProperty(name);else head.style.setProperty(name,value);};
  head.style.setProperty('--case-heading-font',fontMap[block.font_family||'display']||fontMap.display);
  head.style.setProperty('--case-heading-weight',String(block.title_weight||'400'));
  head.style.setProperty('--case-text-align',block.text_align||'left');
  head.style.setProperty('--case-title-color',colorMap[block.title_color||'text']||colorMap.text);
  head.style.setProperty('--case-eyebrow-color',colorMap[block.eyebrow_color||'accent']||colorMap.accent);
  set('--case-title-size',block.title_size?`${block.title_size}px`:'');
  set('--case-body-size',block.body_size?`${block.body_size}px`:'');
  set('--case-eyebrow-size',block.eyebrow_size?`${block.eyebrow_size}px`:'');
  set('--case-title-line-height',block.title_line_height||'');
  set('--case-title-letter-spacing',block.title_letter_spacing||'');
}

function renderProjectCase(project,items){
  const root=$('#projectCaseBlocks'); const head=$('#projectDetailHead'); const stream=$('#projectMediaList'); if(!root||!head||!stream)return;
  root.replaceChildren(); head.hidden=false; stream.hidden=false; stream.replaceChildren();
  publicCaseBlocks(project).forEach((block)=>{
    // Keep the two legacy/core DOM nodes attached even when hidden. Their IDs
    // are reused on the next project open; detaching a hidden core node would
    // make subsequent viewer opens unable to find it with querySelector.
    if(block.type==='case_header'){head.hidden=block.visible===false;applyCaseHeaderPresentation(project,block);root.append(head);return;}
    if(block.type==='media_stream'){
      stream.hidden=block.visible===false;
      if(block.visible===false) stream.replaceChildren();
      else renderLegacyMediaStream(project,items,block.captions!==false,stream);
      root.append(stream);return;
    }
    if(block.visible===false)return;
    let node=null;
    if(block.type==='media_full')node=createCaseFullMediaBlock(project,block,items);
    if(block.type==='split')node=createCaseSplitBlock(project,block,items);
    if(block.type==='duo')node=createCaseDuoBlock(project,block,items);
    if(block.type==='video')node=createCaseVideoBlock(project,block,items);
    if(block.type==='text')node=createCaseTextBlock(block);
    if(block.type==='lettering')node=createCaseLetteringBlock(block);
    if(block.type==='next_project')node=createNextProjectBlock(project,block);
    if(node){node.dataset.caseBlockId=block.id||'';root.append(node);}
  });
}

function openProjectDetail(project) {
  const gallery = galleryFor(project);
  const items = Array.isArray(gallery.items) && gallery.items.length ? gallery.items : [project];
  // Gallery-level case data is kept as compatibility fallback; current schema
  // also embeds it directly on the project card.
  if ((!project.case_builder || !Array.isArray(project.case_builder.blocks)) && gallery.case_builder) project.case_builder = gallery.case_builder;
  const detail = $('#projectDetail');
  const grid = $('#grid');
  const empty = $('#empty');
  const fullscreen = (visualLayout.project_viewer || 'fullscreen') === 'fullscreen';
  detail.dataset.projectId = String(project.project_id || project.id || project.gallery_id || '');
  projectScrollY = scrollY;
  detail.classList.toggle('is-fullscreen', fullscreen);
  document.body.classList.toggle('project-viewer-open', fullscreen);
  if (!fullscreen) { grid.hidden = true; empty.hidden = true; $('#sectionPage')?.toggleAttribute('hidden', true); }
  detail.hidden = false;
  $('#projectEyebrow').textContent = project.section_title || project.category || 'Projeto';
  $('#projectDetailTitle').textContent = gallery.title || project.title || 'Projeto';
  $('#projectDetailDescription').textContent = project.description || '';
  $('#projectDetailDescription').hidden = !project.description;
  $('#projectDetailCount').textContent = `${items.length} ${items.length === 1 ? 'mídia' : 'mídias'}`;
  const introMedia = $('#projectDetailIntroMedia');
  if (introMedia) {
    introMedia.replaceChildren();
    const cover = items.find((item) => String(item.id) === String(project.cover_media_id || '')) || items[0] || project;
    if (cover) {
      const intro = cover.type === 'image'
        ? imageWithFallback(cover, [cover.thumbnail_url, ...(cover.thumbnail_candidates || []), cover.media_url, ...(cover.media_candidates || [])], { lazy:false, priority:'high' })
        : imageWithFallback(cover, [cover.thumbnail_url, ...(cover.thumbnail_candidates || [])], { lazy:false, priority:'high' });
      introMedia.append(intro);
    }
    introMedia.hidden = !cover;
  }
  renderProjectCase(project, items);
  bindReveal();
  if (fullscreen) detail.scrollTop = 0;
  else detail.scrollIntoView({ behavior: 'auto', block: 'start' });
  tick();
}
function closeProjectDetail(scroll = true) {
  const detail = $('#projectDetail');
  const grid = $('#grid');
  if (!detail || !grid) return;
  if (detail.hidden) return;
  const fullscreen = detail.classList.contains('is-fullscreen');
  detail.hidden = true;
  delete detail.dataset.projectId;
  detail.classList.remove('is-fullscreen');
  document.body.classList.remove('project-viewer-open');
  $('#projectMediaList')?.replaceChildren();
  if (active !== 'all' && sectionPageConfig(active)?.enabled !== false) { renderSectionPage(active); } else { grid.hidden = false; }
  if (!fullscreen && scroll) $('#projects').scrollIntoView({ behavior: 'auto', block: 'start' });
  if (fullscreen && Math.abs(scrollY - projectScrollY) > 2) scrollTo({ top: projectScrollY, behavior: 'auto' });
}

function galleryFor(project) {
  // V5.8.2: a project/section is self-contained. Prefer the media embedded
  // directly in the clicked card. The global map remains only as compatibility
  // fallback for manifests generated by older versions.
  const embedded = Array.isArray(project.gallery_items)
    ? project.gallery_items.filter((item) => item && item.id)
    : [];
  if (embedded.length) {
    return {
      id: project.gallery_id || project.id,
      title: project.gallery_title || project.title,
      case_builder: project.case_builder || {},
      items: embedded,
    };
  }
  const gallery = DATA.galleries?.[project.gallery_id];
  if (gallery?.items?.length) return gallery;
  return { id: project.gallery_id || project.id, title: project.gallery_title || project.title, case_builder: project.case_builder || {}, items: [project] };
}

function openMedia(project) {
  return openMediaAt(project, null);
}

function openMediaAt(project, requestedIndex = null) {
  const gallery = galleryFor(project);
  activeGallery = Array.isArray(gallery.items) && gallery.items.length ? gallery.items : [project];
  activeGalleryTitle = gallery.title || project.title;
  const coverId = project.cover_media_id || project.id;
  const coverIndex = activeGallery.findIndex((item) => item.id === coverId);
  activeGalleryIndex = Number.isInteger(requestedIndex) && requestedIndex >= 0 && requestedIndex < activeGallery.length
    ? requestedIndex
    : (coverIndex >= 0 ? coverIndex : 0);

  document.body.classList.add('lightbox-open');
  // Open the viewer first, then render its contents. This guarantees a visible
  // stage even for a section containing exactly one media item.
  $('#lightbox').classList.add('open');
  $('#lightbox').setAttribute('aria-hidden', 'false');
  renderGalleryStrip();
  renderGalleryItem();
}

function viewerUnavailable(project, reason = 'A mídia não pôde ser aberta.') {
  const box = document.createElement('div');
  box.className = 'viewer-unavailable';
  const title = document.createElement('strong'); title.textContent = project.title || 'Mídia indisponível';
  const copy = document.createElement('span'); copy.textContent = reason;
  box.append(title, copy);
  return box;
}
function viewerLoading() { const node=document.createElement('div'); node.className='viewer-loading'; node.innerHTML='<i></i><span>Carregando mídia…</span>'; return node; }
function renderGalleryItem() {
  const project = activeGallery[activeGalleryIndex];
  if (!project) return;
  const stage = $('#stage');
  stage.replaceChildren();
  const loading = viewerLoading(); stage.append(loading);
  $('#lightboxTitle').textContent = project.title || activeGalleryTitle || 'Projeto';
  const lightboxDescription = $('#lightboxDescription');
  if (lightboxDescription) { lightboxDescription.textContent = project.description || ''; lightboxDescription.hidden = !project.description; }
  const counter = $('#lightboxCounter');
  if (counter) counter.textContent = `${activeGalleryIndex + 1} / ${Math.max(activeGallery.length, 1)}`;

  const finish = (node) => { if (loading.isConnected) loading.remove(); if (node && !node.isConnected) stage.append(node); };
  let media = null;
  if (project.type === 'image') {
    const sources = uniqueUrls([project.media_url, ...(project.media_candidates || []), project.thumbnail_url, ...(project.thumbnail_candidates || [])]);
    if (!sources.length) { finish(viewerUnavailable(project)); }
    else {
      media = document.createElement('img'); media.alt = project.title || ''; media.decoding='async'; media.className='viewer-media';
      let sourceIndex=0; let imageTimer=null;
      const next=()=>{ clearTimeout(imageTimer); if(sourceIndex>=sources.length){ media.remove(); finish(viewerUnavailable(project,'Nenhuma das URLs públicas da imagem respondeu.')); return; } media.src=sources[sourceIndex++]; imageTimer=setTimeout(next,9000); };
      media.addEventListener('load',()=>{clearTimeout(imageTimer);finish(media);},{once:true}); media.addEventListener('error',next); stage.append(media); next();
    }
  } else if (project.type === 'video') {
    const sources = videoSourceCandidates(project);
    if (sources.length || videoChunkCandidates(project).length) {
      media = configureInlineVideoPlayer(document.createElement('video'), project, { autoplay:false, muted:false, loop:false });
      media.className = 'viewer-media';
      stage.append(media);
      bindPublishedVideoSource(media, project, () => {
        media.remove();
        finish(viewerUnavailable(project,'O vídeo está temporariamente indisponível para reprodução.'));
      }, { timeoutMs:45000, metadataReady:false });
      const ready=()=>finish(media);
      media.addEventListener('loadeddata',ready,{once:true});
      media.addEventListener('canplay',ready,{once:true});
    } else finish(viewerUnavailable(project,'O vídeo não possui uma fonte reproduzível.'));
  } else {
    const frame=driveFrame(project);
    if(frame && frame.tagName==='IFRAME'){frame.classList.add('viewer-media');frame.addEventListener('load',()=>finish(frame),{once:true});stage.append(frame);setTimeout(()=>finish(frame),2200);} else finish(viewerUnavailable(project));
  }

  const hasMultiple = activeGallery.length > 1;
  $('#prevMedia')?.toggleAttribute('hidden', !hasMultiple);
  $('#nextMedia')?.toggleAttribute('hidden', !hasMultiple);
  [...document.querySelectorAll('[data-gallery-index]')].forEach((node) => node.classList.toggle('is-active', Number(node.dataset.galleryIndex) === activeGalleryIndex));
}

function renderGalleryStrip() {
  const strip = $('#galleryStrip');
  if (!strip) return;
  strip.replaceChildren();
  strip.hidden = activeGallery.length <= 1;
  activeGallery.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-thumb';
    button.dataset.galleryIndex = String(index);
    button.setAttribute('aria-label', `Abrir ${item.title}`);
    if (item.type === 'image' || item.thumbnail_url || (item.thumbnail_candidates || []).length) {
      button.append(imageWithFallback(item, [item.thumbnail_url, ...(item.thumbnail_candidates || [])]));
    } else {
      const label = document.createElement('span');
      label.textContent = item.type === 'video' ? 'PLAY' : 'PDF';
      button.append(label);
    }
    button.addEventListener('click', () => {
      activeGalleryIndex = index;
      renderGalleryItem();
    });
    strip.append(button);
  });
}

function changeGallery(direction) {
  if (activeGallery.length <= 1) return;
  activeGalleryIndex = (activeGalleryIndex + direction + activeGallery.length) % activeGallery.length;
  renderGalleryItem();
}

function driveFrame(project) {
  const source = project.preview_url || (project.preview_candidates || [])[0] || project.external_url;
  if (!source) return poster(project);
  const frame = document.createElement('iframe');
  frame.src = source;
  frame.title = project.title;
  frame.allow = 'autoplay; fullscreen; encrypted-media';
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.loading = 'eager';
  return frame;
}

function fallbackFrame(project, node) {
  node.replaceWith(driveFrame(project));
}

function closeMedia() {
  $('#lightbox').classList.remove('open');
  $('#lightbox').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  $('#stage').replaceChildren();
  $('#galleryStrip')?.replaceChildren();
  activeGallery = [];
  activeGalleryIndex = 0;
}

$('#projectBack')?.addEventListener('click', () => closeProjectDetail(true));
addEventListener('popstate', () => { const section=sectionFromLocation(); const ids=new Set((DATA.filters||[]).map((item)=>String(item.id))); select(section && ids.has(String(section)) ? section : 'all', false); });
$('#close').addEventListener('click', closeMedia);
$('#prevMedia')?.addEventListener('click', () => changeGallery(-1));
$('#nextMedia')?.addEventListener('click', () => changeGallery(1));
$('#lightbox').addEventListener('click', (event) => { if (event.target === $('#lightbox')) closeMedia(); });
addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && $('#lightbox').classList.contains('open')) {
    closeMedia();
    return;
  }
  if (event.key === 'Escape' && !$('#projectDetail')?.hidden) {
    closeProjectDetail(true);
    return;
  }
  if (!$('#lightbox').classList.contains('open')) return;
  if (event.key === 'ArrowLeft') changeGallery(-1);
  if (event.key === 'ArrowRight') changeGallery(1);
});
$('#menu')?.addEventListener('click', () => { if(currentCustomPage()){location.href='/#projectsBlock';return;} ($('#projectsBlock') || $('#portfolioHeading'))?.scrollIntoView({ behavior: 'auto' }); });

// Compatibility marker for the V5 visual contract: classList.toggle('is-visible' remains represented while V5.14 reveals only once.
function bindReveal() {
  if (revealObserver) revealObserver.disconnect();
  const nodes = [...document.querySelectorAll('.reveal:not(.is-visible)')];
  const revealOff = document.body.dataset.reveal === 'off' || document.body.dataset.motion === 'off';
  if (reduced || revealOff || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });
  nodes.forEach((node) => revealObserver.observe(node));
}

let queued = false;
let ambientPointerX = .72;
let ambientPointerY = .28;
const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
function parallaxScale() {
  if (reduced || document.body.dataset.motion === 'off') return 0;
  const strength = visualLayout.parallax_strength || 'medium';
  return ({ off: 0, soft: .55, medium: 1, strong: 1.55 })[strength] ?? 1;
}
function motionScale() {
  if (reduced || document.body.dataset.motion === 'off') return 0;
  return document.body.dataset.motion === 'subtle' ? .55 : 1;
}
function updateParallax() {
  const scale = parallaxScale();
  document.querySelectorAll('[data-parallax]').forEach((node) => {
    if (!scale) {
      node.style.setProperty('--parallax-y', '0px');
      return;
    }
    const rect = node.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > innerHeight + 100) return;
    const normalized = clamp((rect.top + rect.height / 2 - innerHeight / 2) / innerHeight, -1.2, 1.2);
    const range = node.dataset.parallax === 'detail' ? 28 : 18;
    node.style.setProperty('--parallax-y', `${(-normalized * range * scale).toFixed(2)}px`);
  });
  document.querySelectorAll('[data-parallax-text]').forEach((node) => {
    if (!scale) {
      node.style.transform = '';
      return;
    }
    const rect = node.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > innerHeight + 100) return;
    const normalized = clamp((rect.top + rect.height / 2 - innerHeight / 2) / innerHeight, -1, 1);
    const range = Number(node.dataset.parallaxText || 10);
    node.style.transform = `translate3d(0,${(-normalized * range * scale).toFixed(2)}px,0)`;
  });
}
function updateLetteringAndAmbient() {
  const lettering = $('#lettering');
  const track = $('#letteringTrack');
  if (lettering && track && !lettering.hidden) {
    const rect = lettering.getBoundingClientRect();
    const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height), 0, 1);
    const speed = ({ soft: .45, medium: .8, strong: 1.2 })[lettering.dataset.speed || 'medium'] || .8;
    const direction = lettering.dataset.direction === 'right' ? 1 : -1;
    const travel = (progress - .5) * Math.min(innerWidth * .28, 360) * speed * direction;
    track.style.setProperty('--lettering-x', reduced || document.body.dataset.motion === 'off' ? '0px' : `${travel.toFixed(2)}px`);
    lettering.style.setProperty('--lettering-progress', progress.toFixed(3));
  }

  document.querySelectorAll('[data-modular-lettering]').forEach((customTrack) => {
    const section = customTrack.closest('.block-lettering');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height), 0, 1);
    const direction = section.dataset.direction === 'right' ? 1 : -1;
    const travel = (progress - .5) * Math.min(innerWidth * .24, 320) * direction;
    customTrack.style.setProperty('--lettering-x', reduced || document.body.dataset.motion === 'off' ? '0px' : `${travel.toFixed(2)}px`);
  });

  document.querySelectorAll('[data-case-lettering]').forEach((customTrack) => {
    const section = customTrack.closest('.case-lettering');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height), 0, 1);
    const direction = section.dataset.direction === 'right' ? 1 : -1;
    const travel = (progress - .5) * Math.min(innerWidth * .24, 320) * direction;
    customTrack.style.setProperty('--lettering-x', reduced || document.body.dataset.motion === 'off' ? '0px' : `${travel.toFixed(2)}px`);
  });

  const ambient = $('#ambientLayer');
  const ambientMode = document.body.dataset.backgroundMotion || document.body.dataset.ambient || 'medium';
  if (ambient) {
    const power = ({ off: 0, soft: .45, medium: .72, strong: 1 })[ambientMode] ?? .72;
    const pageProgress = clamp(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight));
    ambient.style.setProperty('--ambient-x', `${(ambientPointerX * 100).toFixed(1)}%`);
    ambient.style.setProperty('--ambient-y', `${(ambientPointerY * 100).toFixed(1)}%`);
    ambient.style.setProperty('--ambient-shift', `${((pageProgress - .5) * 18).toFixed(2)}vh`);
    ambient.style.setProperty('--ambient-power', String(reduced ? 0 : power));
  }
  const atmosphere=$('#editorialAtmosphere');
  const pageProgress=clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight));
  if(atmosphere){
    atmosphere.style.setProperty('--atmosphere-progress',pageProgress.toFixed(4));
    atmosphere.style.setProperty('--atmosphere-y',`${((pageProgress-.5)*26).toFixed(2)}vh`);
    atmosphere.style.setProperty('--atmosphere-x',`${((ambientPointerX-.5)*8).toFixed(2)}vw`);
  }
  if(document.body.dataset.backgroundStyle==='luminous'){
    const motionOff=reduced||document.body.dataset.backgroundMotion==='off';
    const finePointer=!motionOff&&matchMedia('(hover:hover) and (pointer:fine)').matches;
    const lx=motionOff ? .72 :(finePointer?ambientPointerX:(.5+Math.sin(pageProgress*Math.PI*2)*.18));
    const ly=motionOff ? .28 :(finePointer?ambientPointerY:(.18+pageProgress*.64));
    const sx=motionOff ? .18 :(.82-(pageProgress*.22));
    const sy=motionOff ? .78 :(.78-(pageProgress*.48));
    document.documentElement.style.setProperty('--luminous-x',`${(clamp(lx)*100).toFixed(1)}%`);
    document.documentElement.style.setProperty('--luminous-y',`${(clamp(ly)*100).toFixed(1)}%`);
    document.documentElement.style.setProperty('--luminous-secondary-x',`${(clamp(sx)*100).toFixed(1)}%`);
    document.documentElement.style.setProperty('--luminous-secondary-y',`${(clamp(sy)*100).toFixed(1)}%`);
    document.documentElement.style.setProperty('--luminous-opacity',String(motionOff ? .52 :(.68+Math.sin(pageProgress*Math.PI)*.18).toFixed(3)));
  }
}

function motion() {
  queued = false;
  const detail = $('#projectDetail');
  const viewerOpen = Boolean(detail && !detail.hidden && detail.classList.contains('is-fullscreen'));
  const height = innerHeight;
  const y = viewerOpen ? detail.scrollTop : scrollY;
  const max = viewerOpen
    ? Math.max(1, detail.scrollHeight - detail.clientHeight)
    : Math.max(1, document.documentElement.scrollHeight - height);
  $('#progress').style.transform = `scaleX(${clamp(y / max)})`;
  $('#header').classList.toggle('is-scrolled', !viewerOpen && y > 18);
  const m = motionScale();
  const heroNode = $('#hero');
  const heroRect = heroNode?.getBoundingClientRect();
  const heroLocalY = heroRect ? clamp(-heroRect.top, 0, Math.max(heroRect.height, height) * 1.2) : 0;
  const heroInRange = Boolean(heroRect && heroRect.bottom > -height * .15 && heroRect.top < height);
  if (m && !viewerOpen && heroInRange && (heroNode?.dataset.effect || 'cinematic') !== 'static') {
    const heroProgress = clamp(heroLocalY / (Math.max(heroRect?.height || height, height * .7) * .92));
    $('#heroTitle').style.transform = `translate3d(0,${-heroLocalY * .14 * m}px,0) scale(${1 - heroProgress * .025 * m})`;
    $('#heroTitle').style.opacity = String(1 - heroProgress * .86);
    document.querySelector('.hero-copy').style.transform = `translate3d(0,${-heroLocalY * .07 * m}px,0)`;
    document.querySelector('.hero-copy').style.opacity = String(1 - heroProgress * .7);
    const heroMedia = $('#heroMedia');
    const heroEffect = heroNode?.dataset.effect || 'cinematic';
    if (heroMedia) {
      const translateFactor = heroEffect === 'zoom' ? 0 : (heroEffect === 'parallax' ? .085 : .055);
      const zoomFactor = heroEffect === 'parallax' ? .012 : (heroEffect === 'zoom' ? .055 : .025);
      heroMedia.style.transform = `translate3d(0,${heroLocalY * translateFactor * m}px,0) scale(${1 + heroProgress * zoomFactor * m})`;
    }
  } else if (!viewerOpen) {
    $('#heroTitle').style.transform = '';
    $('#heroTitle').style.opacity = '';
    document.querySelector('.hero-copy').style.transform = '';
    document.querySelector('.hero-copy').style.opacity = '';
    if ($('#heroMedia')) $('#heroMedia').style.transform = '';
  }
  updateParallax();
  updateLetteringAndAmbient();
}
function tick() { if (!queued) { queued = true; requestAnimationFrame(motion); } }
function bindMotion() {
  if (!reduced && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    addEventListener('pointermove', (event) => {
      ambientPointerX = clamp(event.clientX / Math.max(innerWidth, 1));
      ambientPointerY = clamp(event.clientY / Math.max(innerHeight, 1));
      tick();
    }, { passive: true });
  }
  addEventListener('scroll', tick, { passive: true });
  addEventListener('resize', tick, { passive: true });
  $('#projectDetail')?.addEventListener('scroll', tick, { passive: true });
  bindReveal();
  tick();
}


$('#siteMenuTrigger')?.addEventListener('click',()=>$('#sideMenu')?.classList.contains('is-open')?closeSideMenu():openSideMenu());
$('#sideMenuClose')?.addEventListener('click',closeSideMenu);
$('#sideMenu')?.addEventListener('click',(event)=>{if(event.target.closest('[data-side-menu-close]'))closeSideMenu();});
$('#sideMenuLinks')?.addEventListener('click',(event)=>{
  const button=event.target.closest('.side-menu-link');if(!button)return;
  const filterId=button.dataset.filterId||'';if(filterId)select(filterId,false);
  const targetValue=button.dataset.target||'';closeSideMenu();
  if(/^\//.test(targetValue)){ location.href=targetValue; return; }
  if(/^https?:\/\//i.test(targetValue)){ location.href=targetValue; return; }
  if(targetValue.startsWith('#')){ const target=document.querySelector(targetValue);target?.scrollIntoView({behavior:'auto',block:'start'}); }
});
addEventListener('keydown',(event)=>{if(event.key==='Escape')closeSideMenu()});

function openActiveHeroProject() {
  if (visualLayout.hero_expand === false) return;
  const project = heroProjects[heroIndex];
  if (project) openProjectDetail(project);
}

$('#heroOpen')?.addEventListener('click', (event) => {
  event.stopPropagation();
  openActiveHeroProject();
});
$('#hero')?.addEventListener('click', (event) => {
  if (visualLayout.hero_expand === false) return;
  if (event.target.closest('button,a,video,iframe')) return;
  openActiveHeroProject();
});


const EDITOR_PREVIEW_METRICS={patches:0,failed:0,targetedRenders:0,lastRevision:''};
if(IS_EDITOR_PREVIEW) window.__STUDIOFRAME_PREVIEW_METRICS__=EDITOR_PREVIEW_METRICS;
function previewJson(value){try{return JSON.stringify(value??null);}catch(_){return '';}}
function previewHomeBlocksFor(builder={}){
  const defaults=[
    {id:'core-hero',type:'hero',visible:true,core:true,section_size:'viewport',section_width:'full'},
    {id:'core-intro',type:'intro',visible:true,core:true,section_size:'normal',section_width:'full'},
    {id:'core-lettering',type:'lettering',visible:true,core:true,section_size:'normal',section_width:'full'},
    {id:'core-projects',type:'projects',visible:true,core:true,section_size:'normal',section_width:'full',grid_columns:'3'},
    {id:'core-about',type:'about',visible:true,core:true,section_size:'normal',section_width:'full'},
    {id:'core-contact',type:'contact',visible:true,core:true,section_size:'normal',section_width:'full'},
  ];
  const blocks=builder?.home?.blocks;
  return Array.isArray(blocks)?blocks.filter((b)=>b&&b.type).map((b)=>({section_size:'normal',section_width:'full',section_background:'none',...b})):defaults;
}
function previewHomeStructure(builder={}){return previewHomeBlocksFor(builder).map((b)=>[b.id||'',b.type||'',b.visible!==false]);}
function patchHomeCompositionInPlace(previousBuilder={},nextBuilder={}){
  const before=previewHomeBlocksFor(previousBuilder),after=previewHomeBlocksFor(nextBuilder);
  if(previewJson(previewHomeStructure(previousBuilder))!==previewJson(previewHomeStructure(nextBuilder)))return false;
  const beforeById=new Map(before.map((b)=>[String(b.id||''),b]));
  for(const block of after){
    const coreId=CORE_HOME_BLOCK_IDS[block.type];
    if(coreId){const node=document.getElementById(coreId);if(!node)continue;node.hidden=block.visible===false;applyHomeSectionFrame(node,block);applyCoreBlockOverrides(node,block,nextBuilder);continue;}
    const id=String(block.id||''), previous=beforeById.get(id); if(previewJson(previous)===previewJson(block))continue;
    const current=document.querySelector(`[data-home-block-id="${CSS.escape(id)}"]`), replacement=createCustomHomeBlock(block);
    if(current&&replacement){replacement.id=current.id;current.replaceWith(replacement);EDITOR_PREVIEW_METRICS.targetedRenders+=1;}
    else if(current&&!replacement){current.remove();EDITOR_PREVIEW_METRICS.targetedRenders+=1;}
    else if(!current&&replacement){$('#top')?.append(replacement);EDITOR_PREVIEW_METRICS.targetedRenders+=1;}
  }
  bindReveal();tick();return true;
}
function heroSourceSignature(builder={}){const h=builder.hero||{};return previewJson({media_id:h.media_id||'',mobile_media_id:h.mobile_media_id||'',slides:h.slides||[],autoplay:h.autoplay,rotation_seconds:h.rotation_seconds});}
function applyEditorPreviewPatch(payload={}){
  if(!IS_EDITOR_PREVIEW)return;
  const previousBuilder=DATA.site_builder||{},previousIdentity=DATA.identity||{};
  const nextBuilder=payload.site_builder&&typeof payload.site_builder==='object'?payload.site_builder:previousBuilder;
  const nextIdentity=payload.identity&&typeof payload.identity==='object'?payload.identity:previousIdentity;
  if(previewJson(previewHomeStructure(previousBuilder))!==previewJson(previewHomeStructure(nextBuilder))){window.parent?.postMessage({type:'studioframe-preview-reload-required',reason:'home-structure-changed'},location.origin);return;}
  DATA.site_builder=nextBuilder;DATA.identity=nextIdentity;renderSiteBuilder();
  const serviceDetail=currentServiceDetail(),servicesPage=isServicesPage(),customPage=currentCustomPage();
  if(serviceDetail){if(previewJson(previousBuilder.services)!==previewJson(nextBuilder.services)){renderServiceDetailPage(serviceDetail.category,serviceDetail.item);EDITOR_PREVIEW_METRICS.targetedRenders+=1;}}
  else if(servicesPage){if(previewJson(previousBuilder.services)!==previewJson(nextBuilder.services)){renderServicesPage();EDITOR_PREVIEW_METRICS.targetedRenders+=1;}}
  else if(customPage){const id=String(customPage.id||''),beforePage=previousBuilder.custom_pages?.[id],nextPage=nextBuilder.custom_pages?.[id];if(previewJson(beforePage)!==previewJson(nextPage)){const current=currentCustomPage();if(current){renderCustomPage(current);EDITOR_PREVIEW_METRICS.targetedRenders+=1;}}}
  else{
    patchHomeCompositionInPlace(previousBuilder,nextBuilder);
    if(previewJson(previousBuilder.projects?.filters)!==previewJson(nextBuilder.projects?.filters))renderFilters();
    if(heroSourceSignature(previousBuilder)!==heroSourceSignature(nextBuilder)){renderHero();EDITOR_PREVIEW_METRICS.targetedRenders+=1;}
    if(previewJson(previousBuilder.services)!==previewJson(nextBuilder.services)){renderServicesHome();EDITOR_PREVIEW_METRICS.targetedRenders+=1;}
  }
  if(previewJson(previousBuilder.services)!==previewJson(nextBuilder.services)){loadQuoteState();ensureGlobalQuoteUI();}
  renderSideNavigation();EDITOR_PREVIEW_METRICS.patches+=1;EDITOR_PREVIEW_METRICS.lastRevision=String(payload.revision||'');
  window.parent?.postMessage({type:'studioframe-preview-applied',revision:payload.revision||'',patches:EDITOR_PREVIEW_METRICS.patches,targeted_renders:EDITOR_PREVIEW_METRICS.targetedRenders},location.origin);
}
function restoreEditorPreviewState(state = {}) {
  const apply = () => {
    const projectId = String(state.project_id || '');
    if (projectId) {
      const project = (DATA.projects || []).find((item) => [item.project_id,item.id,item.gallery_id].some((value) => String(value || '') === projectId));
      const navigation = !project ? (DATA.navigation_nodes || []).find((item) => [item.project_id,item.id,item.gallery_id].some((value) => String(value || '') === projectId)) : null;
      if (project) openProjectDetail(project);
      else if (navigation) openProjectDetail(navigationNodeAsProject(navigation));
      const detail = $('#projectDetail');
      if (detail && !detail.hidden) detail.scrollTop = Math.max(0, Number(state.project_scroll_top || 0));
    }
    scrollTo({ top:Math.max(0,Number(state.top || 0)), left:Math.max(0,Number(state.left || 0)), behavior:'auto' });
  };
  requestAnimationFrame(apply);
  setTimeout(apply, 80);
  setTimeout(apply, 320);
}
addEventListener('message', (event) => {
  if (event.origin !== location.origin) return;
  if (event.data?.type === 'studioframe-restore-preview') { restoreEditorPreviewState(event.data.state || {}); return; }
  if (event.data?.type === 'studioframe-preview-patch') {
    try { applyEditorPreviewPatch(event.data || {}); }
    catch (error) { EDITOR_PREVIEW_METRICS.failed += 1; console.error('Preview patch falhou:',error); window.parent?.postMessage({type:'studioframe-preview-reload-required',reason:`patch-error:${error?.message||error}`},location.origin); }
  }
});

load().then(() => {
  if (window.parent !== window) window.parent.postMessage({ type:'studioframe-preview-ready' }, location.origin);
}).catch((error) => {
  $('#empty').hidden = false;
  $('#empty').textContent = `Não foi possível carregar o portfólio: ${error.message}`;
  console.error(error);
});

// V6.1.2 — posição inicial determinística. Recarregar build/preview não herda
// uma posição vertical antiga do navegador quando não existe deep-link real.
addEventListener('pageshow', () => {
  if (!STUDIOFRAME_INITIAL_HASH) {
    requestAnimationFrame(() => scrollTo({ top: 0, left: 0, behavior: 'auto' }));
  }
}, { once: true });
