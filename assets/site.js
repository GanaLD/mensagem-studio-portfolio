try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (_) {}
const STUDIOFRAME_INITIAL_HASH = String(location.hash || '');
const $ = (s) => document.querySelector(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let DATA = {};
const IS_EDITOR_PREVIEW = Boolean(window.__PB_PREVIEW_DATA__);
let active = 'all';
let revealObserver = null;
let sectionNavigatorObserver = null;
let heroTimer = null;
let heroIndex = 0;
let heroProjects = [];
let heroSoundEnabled = false;
const SITE_AUDIO = {config:null,videoId:'',player:null,playerPromise:null,playing:false,muted:false,volume:30,userWantsPlaying:false,resumeAfterMedia:false,ducked:false,policyPause:false,firstInteractionHandler:null};
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
if (window.__PB_PREVIEW_DATA__) {
DATA = window.__PB_PREVIEW_DATA__;
} else if (location.protocol === 'http:' || location.protocol === 'https:') {
try {
const liveUrl = `${publicAssetBase()}data/portfolio.json?sf_live=${Date.now()}`;
const response = await fetch(liveUrl, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } });
if (!response.ok) throw new Error(`portfolio.json HTTP ${response.status}`);
DATA = await response.json();
} catch (error) {
if (!window.__PB_PUBLIC_DATA__) throw error;
console.warn('Manifesto online indisponível; usando snapshot inline como fallback:', error);
DATA = window.__PB_PUBLIC_DATA__;
}
} else if (window.__PB_PUBLIC_DATA__) {
DATA = window.__PB_PUBLIC_DATA__;
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
setupSiteAudio((DATA.site_builder || {}).audio || {});
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
const publicFilters = publicPortfolioFilterItems();
const validFilterIds = new Set(publicFilters.map((item) => String(item.id)));
const initialFilter = hashSection && validFilterIds.has(String(hashSection)) ? hashSection : (publicFilters.length ? publicFilters[0].id : 'all');
select(initialFilter, false);
renderHomeComposition();
renderServicesHome();
placeHomeHorizontalNavigation();
}
loadQuoteState();
ensureGlobalQuoteUI();
setupServiceOfferNotification();
renderSideNavigation();
setupSectionNavigator((DATA.site_builder || {}).section_navigator || {});
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
function isStudioFrameVideoPlaybackCandidate(url) {
const value = String(url || '').trim();
if (!value || /^(?:javascript|data|vbscript):/i.test(value)) return false;
try {
const parsed = new URL(value, location.href);
const host = String(parsed.hostname || '').toLowerCase();
const path = String(parsed.pathname || '').toLowerCase();
if (host === 'accounts.google.com' || host.endsWith('.accounts.google.com')) return false;
if (host === 'drive.google.com') {
if (path === '/open' || path.startsWith('/open/')) return false;
if (path.startsWith('/file/d/')) return false;
if (/(?:^|\/)(?:preview|view)(?:\/|$)/i.test(path)) return false;
}
return true;
} catch (_) {
const lowered = value.toLowerCase();
if (lowered.includes('drive.google.com/open')) return false;
if (/drive\.google\.com\/file\/d\//i.test(value)) return false;
return !/accounts\.google\.com|servicelogin/i.test(value);
}
}
function driveFileIdFromCandidate(item = {}, url = '') {
try {
const parsed = new URL(String(url || ''), location.href);
const queryId = parsed.searchParams.get('id');
if (/^[A-Za-z0-9_-]{10,}$/.test(String(queryId || ''))) return String(queryId);
const match = parsed.pathname.match(/\/d\/([A-Za-z0-9_-]{10,})/);
if (match) return match[1];
} catch (_) {}
const directCandidates = [
item.drive_file_id, item.file_id, item.media_id, item.cover_media_id, item.id,
item.media_url, item.preview_url, item.external_url,
...(item.media_candidates || []), ...(item.preview_candidates || []),
...(item.thumbnail_candidates || []), item.thumbnail_url,
];
for (const candidate of directCandidates) {
const raw = String(candidate || '').trim();
const direct = raw.replace(/^(?:media|video|drive):/i, '');
if (/^[A-Za-z0-9_-]{10,}$/.test(direct)) return direct;
try {
const parsed = new URL(raw, location.href);
const queryId = parsed.searchParams.get('id');
if (/^[A-Za-z0-9_-]{10,}$/.test(String(queryId || ''))) return String(queryId);
const pathMatch = parsed.pathname.match(/\/d\/([A-Za-z0-9_-]{10,})/);
if (pathMatch) return pathMatch[1];
} catch (_) {}
}
return '';
}
function videoSourceCandidates(item = {}) {
const original = uniqueUrls([item.media_url, ...(item.media_candidates || [])]);
const id = driveFileIdFromCandidate(item, original[0]);
const canonical = id ? [
`https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=download&confirm=t`,
`https://drive.google.com/uc?export=view&id=${encodeURIComponent(id)}`,
`https://drive.google.com/uc?id=${encodeURIComponent(id)}&export=download`,
] : [];
return uniqueUrls([...canonical, ...original]).filter(isStudioFrameVideoPlaybackCandidate);
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
const MEDIA_ERROR_NAMES = {1:'MEDIA_ERR_ABORTED',2:'MEDIA_ERR_NETWORK',3:'MEDIA_ERR_DECODE',4:'MEDIA_ERR_SRC_NOT_SUPPORTED'};
function mediaDiagnostic(item, status, url = '', detail = '', video = null) {
const errorCode=Number(video?.error?.code||0);
const event={at:new Date().toISOString(),id:String(item?.id||item?.cover_media_id||''),title:String(item?.title||''),status,url:String(url||''),detail:String(detail||''),media_error_code:errorCode,media_error_name:MEDIA_ERROR_NAMES[errorCode]||'',media_error_message:String(video?.error?.message||''),network_state:Number(video?.networkState??-1),ready_state:Number(video?.readyState??-1),current_time:Number(video?.currentTime||0),duration:Number.isFinite(video?.duration)?Number(video.duration):null,final_source:String(video?.dataset?.finalSource||'')};
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
const sources = [
...allSources.filter((url) => !mediaUrlRecentlyFailed(url)),
...allSources.filter((url) => mediaUrlRecentlyFailed(url)),
];
let sourceIndex = 0;
let started = false;
let sourceReady = false;
let timer = null;
let activeUrl = '';
let terminal = false;
const clearTimer = () => { if (timer) clearTimeout(timer); timer = null; };
const ready = () => {
sourceReady = true;
clearTimer();
video.dataset.failed = '0';
video.dataset.ready = '1';
video.classList.add('is-media-ready');
video.dataset.finalSource = video.currentSrc || video.src || activeUrl;
mediaDiagnostic({id:video.dataset.mediaId||'',title:video.dataset.mediaTitle||''},'loaded',video.dataset.finalSource,'video-ready',video);
};
const next = (reason = 'error') => {
if (terminal) return;
clearTimer();
if (activeUrl && !sourceReady) {
markMediaUrlFailed(activeUrl);
mediaDiagnostic({id:video.dataset.mediaId||'',title:video.dataset.mediaTitle||''},'failed',activeUrl,reason,video);
}
sourceReady = false;
video.dataset.ready = '0';
video.classList.remove('is-media-ready');
if (sourceIndex >= sources.length) {
terminal = true;
video.dataset.failed = '1';
video.dataset.finalSource = activeUrl;
video.removeAttribute('src');
try { video.load(); } catch (_) {}
mediaDiagnostic({id:video.dataset.mediaId||'',title:video.dataset.mediaTitle||''},'fallback',activeUrl,'byte-sources-exhausted',video);
video.dispatchEvent(new CustomEvent('studioframe:video-exhausted'));
if (typeof exhausted === 'function') exhausted();
return;
}
video.dataset.failed = '0';
activeUrl = sources[sourceIndex++];
video.dataset.sourceIndex = String(sourceIndex - 1);
video.dataset.sourceCandidate = activeUrl;
mediaDiagnostic({id:video.dataset.mediaId||'',title:video.dataset.mediaTitle||''},'attempt',activeUrl,'loadstart',video);
video.src = activeUrl;
try { video.load(); } catch (_) {}
timer = setTimeout(() => { if (!sourceReady) { mediaDiagnostic({id:video.dataset.mediaId||'',title:video.dataset.mediaTitle||''},'timeout',activeUrl,'source-timeout',video); next('timeout'); } }, Math.max(4000, Number(timeoutMs || 14000)));
};
const ensure = () => { if (started) return; started = true; next('initial'); };
video.addEventListener('error', () => { if(!terminal) next(`browser-error:${MEDIA_ERROR_NAMES[Number(video.error?.code||0)]||'UNKNOWN'}`); });
video.addEventListener('loadedmetadata', () => mediaDiagnostic({id:video.dataset.mediaId||'',title:video.dataset.mediaTitle||''},'loadedmetadata',video.currentSrc||activeUrl,'loadedmetadata',video));
if (metadataReady) video.addEventListener('loadedmetadata', ready);
else video.addEventListener('loadedmetadata', () => {
clearTimer();
timer = setTimeout(() => { if (!sourceReady) next('frame-timeout'); }, Math.max(30000, Number(timeoutMs || 45000)));
});
video.addEventListener('loadeddata', ready);
video.addEventListener('canplay', () => { mediaDiagnostic({id:video.dataset.mediaId||'',title:video.dataset.mediaTitle||''},'canplay',video.currentSrc||activeUrl,'canplay',video); ready(); });
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
function createResilientVideo(item = {}, options = {}) {
const { exhausted = null, defer = false, timeoutMs = 45000, metadataReady = false, className = '', ...playerOptions } = options || {};
const video = configureInlineVideoPlayer(document.createElement('video'), item, playerOptions);
if (className) video.className = className;
video.dataset.mediaContract = 'v71211';
bindVideoOrientation(video, item);
bindPublishedVideoSource(video, item, exhausted, { defer, timeoutMs, metadataReady });
return video;
}
function drivePreviewUrl(item = {}, autoplay = false) {
const id = driveFileIdFromCandidate(item, item.media_url || (item.media_candidates || [])[0] || '');
return id ? `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview?rm=minimal${autoplay?'&autoplay=1&mute=1':''}` : '';
}
function createDriveEmbedFrame(item = {}, { autoplay = false, className = '', loading = 'lazy' } = {}) {
const src = drivePreviewUrl(item, autoplay);
if (!src) return null;
const frame = document.createElement('iframe');
frame.src = src;
frame.className = className;
frame.title = item.title ? `Vídeo: ${item.title}` : 'Vídeo do portfólio';
frame.loading = loading;
frame.referrerPolicy = 'no-referrer';
frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
frame.setAttribute('allow', 'autoplay; fullscreen');
frame.setAttribute('allowfullscreen', '');
frame.dataset.studioframeDriveFallback = '1';
return frame;
}
const CARD_DRIVE_PREVIEW = { frame:null, owner:null, item:null };
function mountCardDrivePreview(button, item) {
if (!button || reduced || visualLayout.card_video_preview === false) return null;
const host = button.querySelector('.media-inner');
const src = drivePreviewUrl(item, true);
if (!host || !src) return null;
if (!CARD_DRIVE_PREVIEW.frame) CARD_DRIVE_PREVIEW.frame = createDriveEmbedFrame(item, { autoplay:true, className:'card-drive-preview', loading:'eager' });
const frame = CARD_DRIVE_PREVIEW.frame;
if (!frame) return null;
if (CARD_DRIVE_PREVIEW.owner && CARD_DRIVE_PREVIEW.owner !== button) CARD_DRIVE_PREVIEW.owner.classList.remove('is-drive-previewing');
if (frame.src !== src) frame.src = src;
host.append(frame);
CARD_DRIVE_PREVIEW.owner = button;
CARD_DRIVE_PREVIEW.item = item;
button.classList.add('is-drive-previewing');
mediaDiagnostic(item,'fallback',src,'card-singleton-drive-embed');
return frame;
}
function unmountCardDrivePreview(button) {
if (!button || CARD_DRIVE_PREVIEW.owner !== button) return;
button.classList.remove('is-drive-previewing');
const frame = CARD_DRIVE_PREVIEW.frame;
if (frame) { frame.remove(); frame.src = 'about:blank'; }
CARD_DRIVE_PREVIEW.owner = null;
CARD_DRIVE_PREVIEW.item = null;
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
const MOBILE_ESSENTIAL_MENU_IDS = new Set(['home','projects','services']);
function markHeaderMenuNode(node, item) {
if (!node || !item) return node;
const itemId = String(item.id || '');
node.dataset.menuItemId = itemId;
node.dataset.mobileEssential = MOBILE_ESSENTIAL_MENU_IDS.has(itemId) ? 'true' : 'false';
return node;
}
function publicMenuItems(surface='side') {
const projected=DATA.site_builder?.public_menu?.items;
const legacy=DATA.site_builder?.global?.header?.menu_items;
const source=Array.isArray(projected)?projected:(Array.isArray(legacy)?legacy:[]);
return source.filter((item)=>{
if(!item||item.visible===false)return false;
const surfaces=Array.isArray(item.surfaces)?item.surfaces:['header','side'];
return surfaces.includes(surface);
}).slice().sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}
function applyGlobalHeader(builder, navigation, identity) {
const header = builder.global?.header || {};
const headerNode = $('#header');
if (!headerNode) return;
const items = publicMenuItems('header');
const nodeById = { projects:$('#menu'), about:$('#navAbout'), contact:$('#navContact') };
const topnav = $('#topnav');
topnav?.querySelectorAll('[data-dynamic-menu-item]').forEach((node)=>node.remove());
Object.values(nodeById).forEach((node)=>{if(node)node.hidden=true;});
const sorted=items.slice();
const childMap=new Map(); sorted.forEach((item)=>{if(item.parent_id){if(!childMap.has(item.parent_id))childMap.set(item.parent_id,[]);childMap.get(item.parent_id).push(item);}});
sorted.filter((item)=>!item.parent_id).forEach((item)=>{
const children=(childMap.get(item.id)||[]).filter((child)=>child.visible!==false);
if(children.length && item.target){
const wrapper=document.createElement('div');wrapper.className='topnav-dropdown';wrapper.dataset.dynamicMenuItem=item.id;markHeaderMenuNode(wrapper,item);const parent=document.createElement('a');parent.href=publicRouteHref(item.target);parent.textContent=item.label||'Página';parent.className='topnav-dropdown-parent';const submenu=document.createElement('div');submenu.className='topnav-submenu';children.forEach((child)=>{const a=document.createElement('a');a.href=publicRouteHref(child.target||'#');a.textContent=child.label||'Página';submenu.append(a);});wrapper.append(parent,submenu);wrapper.hidden=item.visible===false;topnav?.append(wrapper);return;
}
let node = nodeById[item.id]; if(!node&&item.target){node=document.createElement('a');node.dataset.dynamicMenuItem=item.id;node.href=publicRouteHref(item.target);nodeById[item.id]=node;} if(!node)return;markHeaderMenuNode(node,item);node.textContent=item.label||node.textContent;node.hidden=false;if(node.tagName==='A'&&item.target)node.href=publicRouteHref(item.target);topnav?.append(node);
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
if (logo) {
logo.href = '/';
logo.hidden = header.logo_visible === false;
logo.dataset.logoMode = header.logo_mode === 'image' ? 'image' : 'text';
logo.style.setProperty('--logo-height-desktop', `${Math.max(16,Math.min(120,Number(header.logo_height_desktop||34)))}px`);
logo.style.setProperty('--logo-height-mobile', `${Math.max(14,Math.min(96,Number(header.logo_height_mobile||28)))}px`);
logo.replaceChildren();
const media = header.logo_mode === 'image' ? publicMediaById(header.logo_media_id || '') : null;
if (media && media.type === 'image') {
const image = imageWithFallback(media,[media.media_url,...(media.media_candidates||[]),media.thumbnail_url,...(media.thumbnail_candidates||[])],{lazy:false,priority:'high'});
image.alt = header.logo_alt || identity.studio_name || 'Mensagem Studio';
image.classList?.add('site-logo-image');
logo.append(image);
} else {
logo.dataset.logoMode = 'text';
logo.textContent = header.logo_label || identity.studio_name || 'MENSAGEM STUDIO';
}
}
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
const PUBLIC_SITE_THEME_PRESETS = {
apple:{typography_preset:'studio',border_style:'soft',container_width:'wide',section_spacing:'generous',button_style:'pill',cta_style:'solid',grid_language:'balanced',image_treatment:'soft',overlay_style:'soft',motion_preset:'subtle',reveal_preset:'lift',parallax_preset:'subtle',navigation_treatment:'floating',background_texture:'off',section_navigator:'dots',hero_treatment:'cover'},
dark:{typography_preset:'studio',border_style:'soft',container_width:'wide',section_spacing:'normal',button_style:'pill',cta_style:'solid',grid_language:'balanced',image_treatment:'clean',overlay_style:'gradient',motion_preset:'balanced',reveal_preset:'lift',parallax_preset:'subtle',navigation_treatment:'floating',background_texture:'grain',section_navigator:'off',hero_treatment:'cover'},
light:{typography_preset:'humanist',border_style:'hairline',container_width:'wide',section_spacing:'generous',button_style:'rounded',cta_style:'solid',grid_language:'balanced',image_treatment:'framed',overlay_style:'soft',motion_preset:'subtle',reveal_preset:'fade',parallax_preset:'off',navigation_treatment:'bar',background_texture:'grid',section_navigator:'dots',hero_treatment:'split'},
contrast:{typography_preset:'grotesk',border_style:'strong',container_width:'full',section_spacing:'cinematic',button_style:'square',cta_style:'split',grid_language:'mosaic',image_treatment:'high-contrast',overlay_style:'ink',motion_preset:'expressive',reveal_preset:'clip',parallax_preset:'medium',navigation_treatment:'minimal',background_texture:'off',section_navigator:'rail',hero_treatment:'lettering'},
renaissance:{typography_preset:'editorial-condensed',border_style:'hairline',container_width:'editorial',section_spacing:'cinematic',button_style:'editorial',cta_style:'outline',grid_language:'editorial-asymmetric',image_treatment:'full-bleed',overlay_style:'ink',motion_preset:'cinematic',reveal_preset:'clip',parallax_preset:'medium',navigation_treatment:'editorial',background_texture:'paper',section_navigator:'chapters',hero_treatment:'editorial'},
};
function applySiteAppearance(builder = {}, identity = {}) {
const rawAppearance = builder.appearance || {};
const mode = ['apple','dark','light','contrast','renaissance','custom'].includes(rawAppearance.color_mode) ? rawAppearance.color_mode : 'dark';
const appearance = {...(PUBLIC_SITE_THEME_PRESETS[mode]||PUBLIC_SITE_THEME_PRESETS.dark),...rawAppearance,color_mode:mode};
const defaults = mode === 'apple'
? {bg:'#F5F5F7',surface:'#FFFFFF',text:'#1D1D1F',muted:'#6E6E73',accent:'#0071E3'}
: mode === 'light'
? {bg:'#F3F6FA',surface:'#FFFFFF',text:'#172033',muted:'#58697D',accent:'#006B5B'}
: (mode === 'contrast'
? {bg:'#030303',surface:'#111111',text:'#FFFFFF',muted:'#E0E0E0',accent:'#66F2C2'}
: mode === 'renaissance'
? {bg:'#F7F7EE',surface:'#ECEBDD',text:'#292919',muted:'#6C6B5B',accent:'#B8E600'}
: {bg:'#07090D',surface:'#111722',text:'#F4F7FB',muted:'#AAB5C4',accent:identity.accent_color||'#2FD59A'});
const legacyDarkPalette = mode === 'renaissance'
&& String(appearance.background_color||'').toUpperCase() === '#070707'
&& String(appearance.text_color||'').toUpperCase() === '#F4F4EF';
const values = legacyDarkPalette
? {...defaults}
: {bg:appearance.background_color||defaults.bg,surface:appearance.surface_color||defaults.surface,text:appearance.text_color||defaults.text,muted:appearance.muted_color||defaults.muted,accent:appearance.accent_color||defaults.accent};
document.documentElement.style.setProperty('--bg',values.bg);
document.documentElement.style.setProperty('--surface',values.surface);
document.documentElement.style.setProperty('--text',values.text);
document.documentElement.style.setProperty('--muted',values.muted);
document.documentElement.style.setProperty('--accent',values.accent);
document.documentElement.style.setProperty('--line',`color-mix(in srgb, ${values.text} 19%, transparent)`);
document.documentElement.style.setProperty('--site-block-radius',`${Math.max(0,Math.min(40,Number(appearance.block_radius??14)))}px`);
const containerWidths={narrow:'1080px',standard:'1280px',wide:'1520px',editorial:'1680px',full:'100%'};
const sectionSpaces={compact:'clamp(46px,6vh,78px)',normal:'clamp(64px,9vh,118px)',generous:'clamp(82px,12vh,158px)',cinematic:'clamp(104px,16vh,220px)'};
const borderWeights={none:'0px',soft:'1px',hairline:'1px',strong:'2px'};
document.documentElement.style.setProperty('--site-container-max',containerWidths[appearance.container_width]||containerWidths.wide);
document.documentElement.style.setProperty('--site-section-space',sectionSpaces[appearance.section_spacing]||sectionSpaces.normal);
document.documentElement.style.setProperty('--site-border-weight',borderWeights[appearance.border_style]||'1px');
const brandFont = appearance.brand_font_family === 'body' ? 'var(--body)' : (appearance.brand_font_family === 'system' ? 'Arial, sans-serif' : 'var(--display)');
document.documentElement.style.setProperty('--site-brand-font-family',brandFont);
document.documentElement.style.setProperty('--site-brand-font-desktop',`${Math.max(8,Math.min(48,Number(appearance.brand_font_size_desktop??12)))}px`);
document.documentElement.style.setProperty('--site-brand-font-mobile',`${Math.max(8,Math.min(40,Number(appearance.brand_font_size_mobile??12)))}px`);
document.documentElement.style.setProperty('--site-brand-font-weight',String(appearance.brand_font_weight||'500'));
document.documentElement.style.setProperty('--site-brand-letter-spacing',`${Math.max(-.05,Math.min(.4,Number(appearance.brand_letter_spacing??.16)))}em`);
document.documentElement.style.setProperty('--site-brand-text-transform',appearance.brand_text_transform==='none'?'none':'uppercase');
document.documentElement.style.setProperty('--site-brand-color',appearance.brand_color||values.text);
const accentHex=String(values.accent||'#2FD59A').trim();
const accentMatch=accentHex.match(/^#([0-9a-f]{6})$/i);
if(accentMatch){const n=parseInt(accentMatch[1],16),r=(n>>16)&255,g=(n>>8)&255,b=n&255,l=(.2126*r+.7152*g+.0722*b)/255;document.documentElement.style.setProperty('--accent-contrast',l>.56?'#08110d':'#ffffff');}
const logo=$('#logo');
if(logo&&logo.dataset.logoMode!=='image'){logo.textContent=appearance.brand_title||logo.textContent||identity.studio_name||'MENSAGEM STUDIO';logo.hidden=appearance.brand_title_visible===false;}
document.body.dataset.siteColorMode=mode;
document.body.dataset.backgroundStyle=appearance.background_style||'aurora';
document.body.dataset.blockStyle=appearance.block_style||'glass';
document.body.dataset.blockSpacing=appearance.block_spacing||'normal';
document.body.dataset.shadowStyle=appearance.shadow_style||'soft';
document.body.dataset.themeTypography=appearance.typography_preset||'studio';
document.body.dataset.themeBorders=appearance.border_style||'soft';
document.body.dataset.themeContainer=appearance.container_width||'wide';
document.body.dataset.themeSectionSpacing=appearance.section_spacing||'normal';
document.body.dataset.themeButtons=appearance.button_style||'pill';
document.body.dataset.themeCtas=appearance.cta_style||'solid';
document.body.dataset.themeGrid=appearance.grid_language||'balanced';
document.body.dataset.themeImages=appearance.image_treatment||'clean';
document.body.dataset.themeOverlay=appearance.overlay_style||'gradient';
document.body.dataset.themeMotion=appearance.motion_preset||'balanced';
document.body.dataset.themeReveal=appearance.reveal_preset||'lift';
document.body.dataset.themeParallax=appearance.parallax_preset||'subtle';
document.body.dataset.themeNavigation=appearance.navigation_treatment||'floating';
document.body.dataset.themeTexture=appearance.background_texture||'off';
document.body.dataset.themeSectionNavigator=appearance.section_navigator||'off';
document.body.dataset.themeHero=appearance.hero_treatment||'cover';
const themeMeta=document.querySelector('meta[name="theme-color"]');if(themeMeta)themeMeta.content=values.bg;
return appearance;
}
function letteringSegments(value=''){
const text=String(value||'').trim();
if(!text)return ['', ''];
const comma=text.indexOf(',');
if(comma>0&&comma<text.length-1)return [text.slice(0,comma+1).trim(),text.slice(comma+1).trim()];
const words=text.split(/\s+/).filter(Boolean);
if(words.length<4)return [text,''];
const mid=Math.ceil(words.length/2);
return [words.slice(0,mid).join(' '),words.slice(mid).join(' ')];
}
function applyLetteringCopy(primary,outline,value,style='split'){
const text=String(value||'').trim();
if(style==='split'){const [solid,stroke]=letteringSegments(text);if(primary)primary.textContent=solid;if(outline)outline.textContent=stroke;return;}
if(primary)primary.textContent=text;if(outline)outline.textContent='';
}
const FLOATING_POSITIONS=['bottom_left','bottom_right','top_left','top_right'],FLOATING_STYLES=['theme','accent','minimal','custom'],FLOATING_SHAPES=['pill','rounded','square','circle'];
const WHATSAPP_MARK_SVG='<svg viewBox="0 0 448 385" focusable="false" aria-hidden="true"><path d="M380.9 97.1C339-3 283.7 0 226.2 0 120.9 0 35.3 85.6 35.3 190.9c0 33.7 8.8 66.6 25.5 95.5L33.7 385l101-26.5c27.9 15.2 59.3 23.2 91.4 23.2h.1c105.2 0 192.6-85.6 192.6-190.9 0-51-19.9-98.9-56.8-134.8zM226.2 349.4c-28.6 0-56.7-7.7-81.2-22.3l-5.8-3.5-59.9 15.7 16-58.4-3.8-6c-16-25.4-24.4-54.7-24.4-84.6 0-87.8 71.4-159.3 159.4-159.3 42.6 0 82.6 16.6 112.7 46.8 30.1 30.1 46.7 70.2 46.7 112.9 0 87.9-71.5 159.4-159.7 159.4zm87.4-119.3c-4.8-2.4-28.4-14-32.8-15.6-4.4-1.6-7.6-2.4-10.8 2.4s-12.4 15.6-15.2 18.8c-2.8 3.2-5.6 3.6-10.4 1.2-28.3-14.1-46.8-25.2-65.4-57-4.9-8.4 4.9-7.8 14.1-25.9 1.6-3.2.8-6-.4-8.4-1.2-2.4-10.8-26-14.8-35.6-3.9-9.4-7.9-8.1-10.8-8.3-2.8-.1-6-.2-9.2-.2s-8.4 1.2-12.8 6c-4.4 4.8-16.8 16.4-16.8 40s17.2 46.4 19.6 49.6c2.4 3.2 33.8 51.6 82 72.4 30.5 13.2 42.5 14.3 57.8 12 9.3-1.4 28.4-11.6 32.4-22.8 4-11.2 4-20.8 2.8-22.8-1.2-2-4.4-3.2-9.2-5.6z"/></svg>';
function ensureFloatingControlGlyphs(){const icon=$('.site-floating-whatsapp-icon');if(icon&&!icon.querySelector('svg'))icon.innerHTML=WHATSAPP_MARK_SVG;}
function floatingControlsFor(builder={},navigation={}){
const services=builder.services||{},src=builder.floating_controls||{},pos=navigation.floating_position==='right'?'bottom_right':'bottom_left',size=Math.max(32,Math.min(72,Number(navigation.floating_button_size||42))),num=(v,d,a,b)=>Math.max(a,Math.min(b,Number.isFinite(Number(v))?Math.round(Number(v)):d)),color=v=>/^#[0-9a-f]{6}$/i.test(String(v||''))?String(v):'',norm=(x={},d={})=>({visible:x.visible??d.visible??true,position:FLOATING_POSITIONS.includes(x.position)?x.position:d.position||pos,offset_x:num(x.offset_x??d.offset_x,0,-240,240),offset_y:num(x.offset_y??d.offset_y,0,-240,240),size:num(x.size??d.size,size,32,72),label:String(x.label||d.label||''),style:FLOATING_STYLES.includes(x.style)?x.style:d.style||'theme',shape:FLOATING_SHAPES.includes(x.shape)?x.shape:d.shape||'pill',background_color:color(x.background_color??d.background_color),foreground_color:color(x.foreground_color??d.foreground_color),border_color:color(x.border_color??d.border_color)});
const menu=norm(src.menu,{visible:navigation.side_menu_enabled!==false,label:navigation.menu_label||'Menu',shape:'pill'}),whatsapp=norm(src.whatsapp,{visible:navigation.floating_whatsapp_visible!==false,label:navigation.floating_whatsapp_label||'WhatsApp',shape:'circle'}),quote=norm(src.quote,{visible:true,label:services.quote_dock_label||'Orçamento',shape:'pill'});
whatsapp.display_mode=String(src.whatsapp?.display_mode||'icon')==='label'?'label':'icon';whatsapp.number=String(src.whatsapp?.number??navigation.floating_whatsapp_number??'').replace(/\D/g,'');whatsapp.message=String(src.whatsapp?.message??navigation.floating_whatsapp_message??'');quote.show_icon=src.quote?.show_icon!==false;return {menu,whatsapp,quote};
}
function applyFloatingControlNode(node,name,c){if(!node)return;Object.assign(node.dataset,{floatingControl:name,floatingPosition:c.position,floatingStyle:c.style,floatingShape:c.shape||'pill'});const s=node.style;s.setProperty('--floating-control-size',`${c.size}px`);s.setProperty('--floating-offset-x',`${c.offset_x}px`);s.setProperty('--floating-offset-y',`${c.offset_y}px`);s.setProperty('--floating-stack-offset','0px');if(c.background_color)s.setProperty('--floating-custom-bg',c.background_color);else s.removeProperty('--floating-custom-bg');if(c.foreground_color)s.setProperty('--floating-custom-fg',c.foreground_color);else s.removeProperty('--floating-custom-fg');if(c.border_color)s.setProperty('--floating-custom-border',c.border_color);else s.removeProperty('--floating-custom-border');node.hidden=c.visible===false;}
function layoutFloatingControls(){
const rank={menu:0,whatsapp:1,quote:2,ambient:3},groups={};
const visible=(node)=>node&&!node.hidden&&getComputedStyle(node).display!=='none'&&node.getBoundingClientRect().height>0;
const controls=[...document.querySelectorAll('.site-floating-control[data-floating-control]')].filter(visible);
const obstacleSelector='#header,.filters,.services-jump-nav,[data-context-bar],[data-floating-obstacle],.section-navigator,.project-back,.hero-open,.hero-sound-toggle,.quote-cta-button';
const obstacles=[...document.querySelectorAll(obstacleSelector)].filter((node)=>visible(node)&&!controls.some((control)=>control===node||control.contains(node)));
const viewport=window.visualViewport,viewportTop=Math.max(0,Math.round(viewport?.offsetTop||0)),viewportBottom=Math.min(innerHeight,Math.round((viewport?.offsetTop||0)+(viewport?.height||innerHeight)));
const topBars=obstacles.map((node)=>node.getBoundingClientRect()).filter((rect)=>rect.top<=viewportTop+12&&rect.bottom>viewportTop&&rect.bottom<Math.min(viewportBottom-80,viewportTop+280));
const safeTop=Math.max(viewportTop+12,...topBars.map((rect)=>rect.bottom+12));
const safeBottom=Math.max(12,innerHeight-viewportBottom+12);
document.documentElement.style.setProperty('--floating-safe-top-px',`${Math.round(safeTop)}px`);
document.documentElement.style.setProperty('--floating-safe-bottom-px',`${Math.round(safeBottom)}px`);
controls.forEach((node)=>{node.style.setProperty('--floating-safe-shift-y','0px');(groups[node.dataset.floatingPosition||'bottom_left']||=[]).push(node);});
Object.values(groups).forEach((group)=>{let x=0;group.sort((a,b)=>(rank[a.dataset.floatingControl]??9)-(rank[b.dataset.floatingControl]??9)).forEach((node)=>{node.style.setProperty('--floating-stack-offset',`${Math.round(x)}px`);x+=node.getBoundingClientRect().width+8;});});
controls.forEach((node)=>{
const rect=node.getBoundingClientRect(),topPosition=(node.dataset.floatingPosition||'').startsWith('top');
let shift=topPosition&&rect.top<safeTop?safeTop-rect.top:(!topPosition&&rect.bottom>viewportBottom-12?viewportBottom-12-rect.bottom:0);
const current=()=>({left:rect.left,right:rect.right,top:rect.top+shift,bottom:rect.bottom+shift});
const ordered=[...obstacles].sort((a,b)=>topPosition?a.getBoundingClientRect().top-b.getBoundingClientRect().top:b.getBoundingClientRect().bottom-a.getBoundingClientRect().bottom);
ordered.forEach((obstacle)=>{const shifted=current(),other=obstacle.getBoundingClientRect(),overlaps=shifted.left<other.right+10&&shifted.right>other.left-10&&shifted.top<other.bottom+10&&shifted.bottom>other.top-10;if(!overlaps)return;const candidate=topPosition?other.bottom+12-shifted.top:other.top-12-shifted.bottom;if((topPosition&&candidate>0)||(!topPosition&&candidate<0))shift+=candidate;});
const clamped=current();
if(clamped.top<viewportTop+8)shift+=viewportTop+8-clamped.top;
if(clamped.bottom>viewportBottom-8)shift+=viewportBottom-8-clamped.bottom;
node.style.setProperty('--floating-safe-shift-y',`${Math.round(shift)}px`);
});
if(!window.__studioframeFloatingLayoutBound){window.__studioframeFloatingLayoutBound=1;let raf=0;const schedule=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;layoutFloatingControls();});};addEventListener('resize',schedule,{passive:true});addEventListener('scroll',schedule,{passive:true});addEventListener('hashchange',schedule);addEventListener('popstate',schedule);new MutationObserver(schedule).observe(document.body,{subtree:true,attributes:true,attributeFilter:['hidden','class']});}
}
function applyFloatingControls(builder={},navigation={}){ensureFloatingControlGlyphs();const c=floatingControlsFor(builder,navigation),m=$('#siteFloatingMenuControl'),w=$('#siteFloatingWhatsappControl'),wa=$('#floatingWhatsapp'),q=$('#globalQuoteDock');applyFloatingControlNode(m,'menu',c.menu);document.body.classList.toggle('side-menu-enabled',c.menu.visible!==false);document.body.dataset.menuPanelSide=c.menu.position.endsWith('right')?'right':'left';if($('#siteMenuLabel'))$('#siteMenuLabel').textContent=c.menu.label||'Menu';applyFloatingControlNode(w,'whatsapp',c.whatsapp);if(wa){const f=builder.global?.footer||{},s=builder.services||{},n=String(c.whatsapp.number||f.whatsapp_number||s.whatsapp_number||'').replace(/\D/g,''),msg=String(c.whatsapp.message||f.whatsapp_message||s.whatsapp_message||'').trim();wa.href=n?`https://wa.me/${n}${msg?`?text=${encodeURIComponent(msg)}`:''}`:'#';wa.dataset.displayMode=c.whatsapp.display_mode||'icon';w.hidden=c.whatsapp.visible===false||!n;const label=$('#floatingWhatsappLabel');if(label){label.textContent=c.whatsapp.label||'WhatsApp';label.hidden=c.whatsapp.display_mode!=='label';}wa.setAttribute('aria-label',c.whatsapp.label||'Abrir WhatsApp')}if(q){applyFloatingControlNode(q,'quote',c.quote);q.hidden=!quoteEnabled()||c.quote.visible===false;q.dataset.showIcon=c.quote.show_icon===false?'false':'true';const l=q.querySelector('[data-quote-label]');if(l)l.textContent=c.quote.label||'Orçamento';const icon=q.querySelector('.quote-dock-icon');if(icon)icon.hidden=c.quote.show_icon===false;q.setAttribute('aria-label',c.quote.label||'Orçamento')}requestAnimationFrame(layoutFloatingControls);return c}
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
const requestedPerformance=['auto','light','balanced','cinematic'].includes(visualLayout.performance_profile)?visualLayout.performance_profile:'auto';
const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
const constrainedDevice=Boolean(connection?.saveData)||Number(navigator.deviceMemory||8)<=4||Number(navigator.hardwareConcurrency||8)<=4||matchMedia('(max-width: 800px)').matches||reduced;
document.body.dataset.performanceProfile=requestedPerformance==='auto'?(constrainedDevice?'light':'balanced'):requestedPerformance;
const motionPreset = visualLayout.motion_enabled === false ? 'off' : (appearance.motion_preset || visualLayout.motion_preset || 'cinematic');
document.body.dataset.motion = motionPreset;
document.body.dataset.reveal = appearance.reveal_preset || visualLayout.reveal_style || 'cinematic';
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
document.body.classList.toggle('card-parallax-enabled', appearance.parallax_preset !== 'off' && visualLayout.card_parallax !== false);
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
applyLetteringCopy($('#letteringText'),$('#letteringClone'),letteringText,lettering.style||'split');
if ($('#sideMenuTitle')) $('#sideMenuTitle').textContent = navigation.menu_title || 'Navegação';
if ($('#sideMenuStudio')) $('#sideMenuStudio').textContent = identity.studio_name || 'Mensagem Studio';
document.documentElement.style.setProperty('--site-menu-panel-width', `${Math.max(320,Math.min(760,Number(navigation.menu_panel_width||520)))}px`);
document.documentElement.style.setProperty('--site-menu-text-size', `${Math.max(24,Math.min(64,Number(navigation.menu_text_size||48)))}px`);
applyFloatingControls(builder,navigation);
const projectsHasEyebrow=Object.prototype.hasOwnProperty.call(projects,'eyebrow');
const projectsHasTitle=Object.prototype.hasOwnProperty.call(projects,'title');
const projectEyebrowText=String(projectsHasEyebrow?(projects.eyebrow??''):'Portfólio selecionado').trim();
const projectHeadingText=String(projectsHasTitle?(projects.title??''):'Projetos').trim();
if ($('#projectsEyebrow')) {$('#projectsEyebrow').textContent=projectEyebrowText;$('#projectsEyebrow').hidden=!projectEyebrowText;}
if ($('#projectsTitle')) {$('#projectsTitle').textContent=projectHeadingText;$('#projectsTitle').hidden=!projectHeadingText;}
const configuredIntro=publicHomeBlocks().find((block)=>block?.type==='intro');
const introText=String(configuredIntro?.title ?? 'Design, vídeo e direção criativa para marcas que precisam se destacar.').trim();
const introNode=$('#introBlock');if(introNode){introNode.hidden=configuredIntro?.visible===false||!introText;introNode.classList.toggle('is-empty-heading',!introText);}
const projectHeading=$('#portfolioHeading');if(projectHeading)projectHeading.hidden=projects.visible===false||projects.header_visible===false||(!projectHeadingText&&!projectEyebrowText);
const showProjects = projects.visible !== false;
const filterBarMode=['menu','inline'].includes(projects.filters?.display_mode)?projects.filters.display_mode:'inline';
document.body.dataset.filterBarMode=filterBarMode;
$('#portfolioHeading')?.toggleAttribute('hidden', !showProjects || projects.header_visible===false || (!projectHeadingText&&!projectEyebrowText));
$('#filters')?.toggleAttribute('hidden', !showProjects || filterBarMode==='menu');
$('#projects')?.toggleAttribute('hidden', !showProjects);
if ($('#aboutEyebrow')) $('#aboutEyebrow').textContent = about.eyebrow || 'Mensagem Studio';
if ($('#aboutTitle')) $('#aboutTitle').textContent = about.title || '';
if ($('#aboutBody')) $('#aboutBody').textContent = about.body || '';
$('#about')?.toggleAttribute('hidden', about.visible === false);
if ($('#contactEyebrow')) $('#contactEyebrow').textContent = contact.eyebrow || 'Contato';
if ($('#contactTitle')) $('#contactTitle').textContent = contact.title || '';
if ($('#contactBody')) $('#contactBody').textContent = contact.body || '';
$('#contact')?.toggleAttribute('hidden', contact.visible === false);
const contactSite = $('#contactSite');
const contactInstagram = $('#contactInstagram');
if (contactSite) { contactSite.href = identity.site_url || '#'; contactSite.hidden = !identity.site_url; }
if (contactInstagram) { contactInstagram.href = identity.instagram_url || '#'; contactInstagram.hidden = !identity.instagram_url; }
}
const CORE_HOME_BLOCK_IDS = {
hero: 'hero', intro: 'introBlock', lettering: 'lettering', projects_header:'portfolioHeading', projects: 'projectsBlock', about: 'about', contact: 'contact',
};
function publicHomeBlocks() {
const defaults = [
{ id:'core-hero', type:'hero', visible:true, core:true, section_size:'viewport', section_width:'full' },
{ id:'core-intro', type:'intro', visible:true, core:true, eyebrow:'O QUE FAZEMOS', title:'Design, vídeo e direção criativa para marcas que precisam se destacar.', section_size:'normal', section_width:'full' },
{ id:'core-lettering', type:'lettering', visible:true, core:true, eyebrow:'MENSAGEM STUDIO', title:'Ideias que ganham forma, ritmo e presença.', section_size:'normal', section_width:'full' },
{ id:'core-projects-header', type:'projects_header', visible:true, core:true, eyebrow:'Portfólio selecionado', title:'Projetos', body:'', text_align:'left', section_size:'normal', section_width:'content' },
{ id:'core-projects', type:'projects', visible:true, core:true, section_size:'normal', section_width:'full', grid_columns:'3' },
{ id:'youtube-showcase-main', type:'youtube_showcase', label:'YouTube Showcase', visible:true, youtube_url:'https://www.youtube.com/watch?v=G_2jdXfXxiI', title:'', body:'', primary_cta_label:'Assistir', youtube_cta_label:'Ver no YouTube', channel_url:'', channel_cta_label:'Conheça o canal', show_external_link:true, show_channel_link:false, ratio:'16:9', width:'wide', section_size:'normal', section_width:'wide', section_background:'none' },
{ id:'core-about', type:'about', visible:true, core:true, section_size:'normal', section_width:'full' },
{ id:'core-contact', type:'contact', visible:true, core:true, section_size:'normal', section_width:'full' },
];
if (!Array.isArray(DATA.site_builder?.home?.blocks)) return defaults;
const configured=DATA.site_builder.home.blocks.filter((block) => block && block.type).map((block) => ({ section_size:'normal', section_width:'full', section_background:'none', ...block }));
const removed=DATA.site_builder.home.youtube_showcase_removed===true;
if(!removed&&!configured.some((block)=>block.type==='youtube_showcase')){
const required={...defaults.find((block)=>block.type==='youtube_showcase')};
const projectIndex=configured.findIndex((block)=>block.type==='projects');
configured.splice(projectIndex>=0?projectIndex+1:configured.length,0,required);
}
return configured;
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
function startContinuousCarousel(section, viewport, strip, { speed = 30, direction = 'left', loop = true, pauseOnHover = true } = {}) {
let raf=0,last=0,paused=false,visible=true,x=0,cycle=0;
const velocity=Math.max(8,Math.min(160,Number(speed||30))) * (direction==='right'?1:-1);
const measure=()=>{
const full=Math.max(strip.scrollWidth,strip.getBoundingClientRect().width);
cycle=Math.max(1,loop?full/2:Math.max(0,full-viewport.clientWidth));
if(direction==='right'&&x===0&&loop)x=-cycle;
};
const tick=(time)=>{
if(!section.isConnected){cancelAnimationFrame(raf);return;}
if(!last)last=time;
const delta=Math.min(48,time-last);last=time;
if(!paused&&visible&&cycle>1){
x+=velocity*delta/1000;
if(loop){while(x<=-cycle)x+=cycle;while(x>=0)x-=cycle;}
else x=Math.max(-cycle,Math.min(0,x));
strip.style.transform=`translate3d(${x.toFixed(2)}px,0,0)`;
}
raf=requestAnimationFrame(tick);
};
requestAnimationFrame(()=>{measure();raf=requestAnimationFrame(tick);});
if(pauseOnHover){
section.addEventListener('pointerenter',()=>{paused=true;});
section.addEventListener('pointerleave',()=>{paused=false;last=performance.now();});
section.addEventListener('focusin',()=>{paused=true;});
section.addEventListener('focusout',()=>{paused=false;last=performance.now();});
}
const visibilityObserver=new IntersectionObserver((entries)=>{visible=entries.some((entry)=>entry.isIntersecting);if(visible)last=performance.now();},{threshold:[0,.02]});
visibilityObserver.observe(section);
if('ResizeObserver' in window)new ResizeObserver(()=>{measure();}).observe(viewport);
return section;
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
if (!autoMode || (reduced && block.force_motion !== true)) {
viewport.classList.add('is-manual');
return section;
}
const pxPerSecond = { slow:18, medium:30, fast:48 }[block.speed || 'medium'] || 30;
return startContinuousCarousel(section,viewport,strip,{speed:pxPerSecond,direction:block.direction||'left',loop:true,pauseOnHover:block.pause_on_hover!==false});
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
const primary=document.createElement('span'); primary.className='lettering-primary';
const outline=document.createElement('span'); outline.className='lettering-outline'; outline.setAttribute('aria-hidden','true');
applyLetteringCopy(primary,outline,text,section.dataset.style);
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
media.append(projectVideoFallback(item,{autoplay:block.autoplay!==false}));
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
result.editorial_action_url = item.action_url || '';
return result;
}
function safeEditorialActionUrl(value='') {
const raw=String(value||'').trim();
if(!raw)return '';
if(raw.startsWith('/')||raw.startsWith('#'))return raw;
try { const parsed=new URL(raw); return ['https:','http:','mailto:','tel:'].includes(parsed.protocol)?parsed.href:''; }
catch (_error) { return ''; }
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
if(project.editorial_action_url) node.dataset.actionUrl=project.editorial_action_url;
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
function normalizeYouTubeVideoId(value='') {
const raw=String(value||'').trim();
if (/^[A-Za-z0-9_-]{11}$/.test(raw)) return raw;
let url;
try { url=new URL(raw); } catch (_error) { return ''; }
const host=String(url.hostname||'').toLowerCase().replace(/^www\./,'').replace(/^m\./,'');
let id='';
if (host==='youtu.be') id=String(url.pathname||'').split('/').filter(Boolean)[0]||'';
else if (host==='youtube.com'||host.endsWith('.youtube.com')||host==='youtube-nocookie.com'||host.endsWith('.youtube-nocookie.com')) {
if (url.pathname==='/watch') id=url.searchParams.get('v')||'';
else {
const parts=String(url.pathname||'').split('/').filter(Boolean);
if (['embed','shorts','live'].includes(parts[0])) id=parts[1]||'';
}
}
return /^[A-Za-z0-9_-]{11}$/.test(id)?id:'';
}
function normalizeSiteAudioConfig(value={}) {
const position=['bottom_left','bottom_right','top_left','top_right'].includes(value.control_position)?value.control_position:'bottom_left';
const start=['paused','after_first_interaction','manual'].includes(value.start_mode)?value.start_mode:'manual';
const behavior=['pause','duck','keep'].includes(value.video_audio_behavior)?value.video_audio_behavior:'pause';
return {ambient_enabled:value.ambient_enabled===true,source:'youtube',youtube_url:String(value.youtube_url||''),initial_volume:Math.max(0,Math.min(100,Number(value.initial_volume??30))),loop:value.loop!==false,start_mode:start,control_visible:value.control_visible!==false,control_position:position,video_audio_behavior:behavior};
}
function ensureYouTubeIframeApi() {
if(window.YT?.Player)return Promise.resolve(window.YT);
if(window.__studioframeYouTubeApiPromise)return window.__studioframeYouTubeApiPromise;
window.__studioframeYouTubeApiPromise=new Promise((resolve,reject)=>{
const previous=window.onYouTubeIframeAPIReady;
window.onYouTubeIframeAPIReady=()=>{try{if(typeof previous==='function')previous();}catch(_error){}resolve(window.YT);};
let script=document.querySelector('script[data-studioframe-youtube-api]');
if(!script){script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.async=true;script.dataset.studioframeYoutubeApi='1';document.head.append(script);}
script.addEventListener('error',()=>reject(new Error('YouTube IFrame API indisponível')),{once:true});
});
return window.__studioframeYouTubeApiPromise;
}
function destroyAmbientAudioPlayer() {
try{SITE_AUDIO.player?.destroy?.();}catch(_error){}
SITE_AUDIO.player=null;SITE_AUDIO.playerPromise=null;SITE_AUDIO.videoId='';SITE_AUDIO.playing=false;SITE_AUDIO.userWantsPlaying=false;SITE_AUDIO.resumeAfterMedia=false;SITE_AUDIO.ducked=false;
$('#studioframeAmbientPlayer')?.remove();
}
function updateAmbientAudioControl() {
const root=$('#ambientAudioControl');if(!root)return;
root.dataset.audioState=SITE_AUDIO.playing?'playing':'paused';root.dataset.audioMuted=SITE_AUDIO.muted?'true':'false';
const play=root.querySelector('[data-audio-play]'),mute=root.querySelector('[data-audio-mute]'),volume=root.querySelector('[data-audio-volume]');
if(play){play.textContent=SITE_AUDIO.playing?'Ⅱ':'▶';play.setAttribute('aria-label',SITE_AUDIO.playing?'Pausar música ambiente':'Reproduzir música ambiente');play.setAttribute('aria-pressed',SITE_AUDIO.playing?'true':'false');}
if(mute){mute.textContent=SITE_AUDIO.muted?'×':'◖';mute.setAttribute('aria-label',SITE_AUDIO.muted?'Ativar som da música ambiente':'Silenciar música ambiente');mute.setAttribute('aria-pressed',SITE_AUDIO.muted?'true':'false');}
if(volume)volume.value=String(SITE_AUDIO.volume);
requestAnimationFrame(()=>{if(typeof layoutFloatingControls==='function')layoutFloatingControls();});
}
function ensureAmbientAudioControl(config) {
let root=$('#ambientAudioControl');
if(!root){
root=document.createElement('div');root.id='ambientAudioControl';root.className='site-floating-control ambient-audio-control';root.dataset.floatingControl='ambient';root.innerHTML='<span class="ambient-audio-label">AMBIENTE</span><button type="button" data-audio-play aria-label="Reproduzir música ambiente">▶</button><button type="button" data-audio-mute aria-label="Silenciar música ambiente">◖</button><input data-audio-volume type="range" min="0" max="100" step="1" value="30" aria-label="Volume da música ambiente">';
root.querySelector('[data-audio-play]').addEventListener('click',()=>{SITE_AUDIO.playing?pauseAmbientAudio(true):playAmbientAudio(true);});
root.querySelector('[data-audio-mute]').addEventListener('click',()=>{SITE_AUDIO.muted=!SITE_AUDIO.muted;try{SITE_AUDIO.muted?SITE_AUDIO.player?.mute?.():SITE_AUDIO.player?.unMute?.();}catch(_error){}updateAmbientAudioControl();});
root.querySelector('[data-audio-volume]').addEventListener('input',(event)=>{SITE_AUDIO.volume=Math.max(0,Math.min(100,Number(event.target.value||0)));try{SITE_AUDIO.player?.setVolume?.(SITE_AUDIO.volume);}catch(_error){}updateAmbientAudioControl();});
document.body.append(root);
}
root.dataset.floatingPosition=config.control_position;root.dataset.floatingStyle='theme';root.dataset.floatingShape='pill';root.style.setProperty('--floating-control-size','38px');root.style.setProperty('--floating-offset-x','0px');root.style.setProperty('--floating-offset-y','0px');root.hidden=!(config.ambient_enabled&&config.control_visible&&normalizeYouTubeVideoId(config.youtube_url));
updateAmbientAudioControl();return root;
}
function ensureAmbientAudioPlayer() {
const config=SITE_AUDIO.config||normalizeSiteAudioConfig({}),videoId=normalizeYouTubeVideoId(config.youtube_url);
if(!config.ambient_enabled||!videoId)return Promise.resolve(null);
if(SITE_AUDIO.player&&SITE_AUDIO.videoId===videoId)return Promise.resolve(SITE_AUDIO.player);
if(SITE_AUDIO.playerPromise&&SITE_AUDIO.videoId===videoId)return SITE_AUDIO.playerPromise;
destroyAmbientAudioPlayer();SITE_AUDIO.videoId=videoId;
const host=document.createElement('div');host.id='studioframeAmbientPlayer';host.className='ambient-audio-player-host';document.body.append(host);
SITE_AUDIO.playerPromise=ensureYouTubeIframeApi().then((YT)=>new Promise((resolve,reject)=>{
let settled=false;
const player=new YT.Player(host,{videoId,playerVars:{autoplay:0,controls:0,disablekb:1,playsinline:1,rel:0,loop:config.loop?1:0,playlist:config.loop?videoId:undefined,origin:location.origin},events:{
onReady:()=>{SITE_AUDIO.player=player;SITE_AUDIO.volume=config.initial_volume;player.setVolume?.(SITE_AUDIO.volume);SITE_AUDIO.muted?player.mute?.():player.unMute?.();settled=true;updateAmbientAudioControl();resolve(player);},
onStateChange:(event)=>{const playing=event.data===YT.PlayerState.PLAYING,ended=event.data===YT.PlayerState.ENDED;SITE_AUDIO.playing=playing;if(ended&&config.loop&&SITE_AUDIO.userWantsPlaying)player.playVideo?.();updateAmbientAudioControl();},
onError:()=>{SITE_AUDIO.playing=false;updateAmbientAudioControl();if(!settled)reject(new Error('Falha ao preparar música ambiente do YouTube'));},
}});
}));
return SITE_AUDIO.playerPromise;
}
async function playAmbientAudio(userInitiated=false) {
if(!SITE_AUDIO.config?.ambient_enabled)return false;
if(userInitiated)SITE_AUDIO.userWantsPlaying=true;
if(heroSoundEnabled)await setHeroSoundEnabled(false,{resumeAmbient:false});
try{const player=await ensureAmbientAudioPlayer();if(!player)return false;player.setVolume?.(SITE_AUDIO.ducked?Math.max(2,Math.round(SITE_AUDIO.volume*.2)):SITE_AUDIO.volume);SITE_AUDIO.muted?player.mute?.():player.unMute?.();player.playVideo?.();SITE_AUDIO.playing=true;updateAmbientAudioControl();return true;}catch(_error){SITE_AUDIO.playing=false;updateAmbientAudioControl();return false;}
}
function pauseAmbientAudio(userInitiated=false) {
if(userInitiated){SITE_AUDIO.userWantsPlaying=false;SITE_AUDIO.resumeAfterMedia=false;}
try{SITE_AUDIO.player?.pauseVideo?.();}catch(_error){}
SITE_AUDIO.playing=false;updateAmbientAudioControl();
}
function audibleSiteVideos(except=null){return [...document.querySelectorAll('video')].filter((video)=>video!==except&&!video.paused&&!video.muted&&Number(video.volume||0)>0);}
function siteAudioHandleMediaStart(media) {
if(!media||media.muted||Number(media.volume||0)<=0||!SITE_AUDIO.config?.ambient_enabled)return;
const behavior=SITE_AUDIO.config.video_audio_behavior;
if(behavior==='pause'&&SITE_AUDIO.playing){SITE_AUDIO.resumeAfterMedia=SITE_AUDIO.userWantsPlaying;SITE_AUDIO.policyPause=true;pauseAmbientAudio(false);}
else if(behavior==='duck'&&SITE_AUDIO.player){SITE_AUDIO.ducked=true;SITE_AUDIO.player.setVolume?.(Math.max(2,Math.round(SITE_AUDIO.volume*.2)));}
}
function siteAudioHandleMediaStop(media) {
if(audibleSiteVideos(media).length)return;
if(SITE_AUDIO.ducked){SITE_AUDIO.ducked=false;SITE_AUDIO.player?.setVolume?.(SITE_AUDIO.volume);}
if(SITE_AUDIO.resumeAfterMedia&&SITE_AUDIO.userWantsPlaying){SITE_AUDIO.resumeAfterMedia=false;SITE_AUDIO.policyPause=false;playAmbientAudio(false);}
}
function setupSiteAudio(value={}) {
const config=normalizeSiteAudioConfig(value),videoId=normalizeYouTubeVideoId(config.youtube_url),changed=SITE_AUDIO.videoId&&SITE_AUDIO.videoId!==videoId;
SITE_AUDIO.config=config;SITE_AUDIO.volume=config.initial_volume;
if(SITE_AUDIO.firstInteractionHandler){document.removeEventListener('pointerdown',SITE_AUDIO.firstInteractionHandler,true);SITE_AUDIO.firstInteractionHandler=null;}
ensureAmbientAudioControl(config);
if(!config.ambient_enabled||!videoId){destroyAmbientAudioPlayer();updateAmbientAudioControl();return;}
if(changed)destroyAmbientAudioPlayer();
ensureAmbientAudioPlayer().catch(()=>{});
if(config.start_mode==='after_first_interaction'){
SITE_AUDIO.firstInteractionHandler=(event)=>{if(event.target?.closest?.('#ambientAudioControl'))return;document.removeEventListener('pointerdown',SITE_AUDIO.firstInteractionHandler,true);SITE_AUDIO.firstInteractionHandler=null;playAmbientAudio(true);};
document.addEventListener('pointerdown',SITE_AUDIO.firstInteractionHandler,true);
}
}
document.addEventListener('play',(event)=>{const media=event.target;if(media?.tagName==='VIDEO')siteAudioHandleMediaStart(media);},true);
document.addEventListener('pause',(event)=>{const media=event.target;if(media?.tagName==='VIDEO')siteAudioHandleMediaStop(media);},true);
document.addEventListener('ended',(event)=>{const media=event.target;if(media?.tagName==='VIDEO')siteAudioHandleMediaStop(media);},true);
document.addEventListener('volumechange',(event)=>{const media=event.target;if(media?.tagName!=='VIDEO')return;if(!media.paused&&!media.muted&&Number(media.volume||0)>0)siteAudioHandleMediaStart(media);else siteAudioHandleMediaStop(media);},true);
function safeYouTubeChannelUrl(value='') {
const raw=String(value||'').trim(); if(!raw)return '';
try {
const url=new URL(raw); const host=String(url.hostname||'').toLowerCase().replace(/^www\./,'').replace(/^m\./,'');
if(host==='youtube.com'||host.endsWith('.youtube.com')) return url.href;
} catch (_error) {}
return '';
}
function createYouTubeShowcaseBlock(block) {
const videoId=normalizeYouTubeVideoId(block.youtube_url||block.video_id||'');
if(!videoId)return null;
const displayMode=block.display_mode||'full_bleed';
const fullBleed=displayMode==='full_bleed';
const section=document.createElement('section');
section.className=`modular-block editorial-section block-youtube-showcase width-${fullBleed?'full':(['normal','full','wide'].includes(block.width)?block.width:'wide')} reveal`;
section.dataset.youtubeVideoId=videoId;
section.dataset.displayMode=displayMode;
section.style.setProperty('--youtube-showcase-height',`${Math.max(35,Math.min(100,Number(block.height_vh||78)))}vh`);
section.style.setProperty('--youtube-showcase-focus-x',`${Math.max(0,Math.min(100,Number(block.focal_x??50)))}%`);
section.style.setProperty('--youtube-showcase-focus-y',`${Math.max(0,Math.min(100,Number(block.focal_y??50)))}%`);
if(block.title||block.eyebrow||block.body)section.append(blockHeading(block,block.title||''));
const stage=document.createElement('div'); stage.className=`youtube-showcase-stage ratio-${String(block.ratio||'16:9').replace(':','x')}`;if(block.media_movement!==false)stage.dataset.parallax='detail';
const selectedCover=publicMediaById(block.cover_media_id||block.media_id||'');
const selectedRecord=selectedCover?projectCoverRecord(selectedCover):null;
const youtubeCandidates=[
`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
`https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
];
const thumbnailCandidates=uniqueUrls(selectedRecord?[
selectedRecord.thumbnail_url,...(selectedRecord.thumbnail_candidates||[]),
...(selectedRecord.type==='image'?[selectedRecord.media_url,...(selectedRecord.media_candidates||[])]:[]),
...youtubeCandidates,
]:youtubeCandidates);
const thumbnail=document.createElement('img'); thumbnail.className='youtube-showcase-thumbnail'; thumbnail.loading='lazy'; thumbnail.decoding='async'; thumbnail.alt=selectedRecord?.title||block.title||'Prévia do vídeo no YouTube';
thumbnail.style.objectPosition='var(--youtube-showcase-focus-x) var(--youtube-showcase-focus-y)';
thumbnail.dataset.coverSource=selectedRecord?'editor-selected-media':'youtube-thumbnail';
let thumbnailCandidateIndex=0;
const advanceThumbnail=()=>{if(thumbnailCandidateIndex>=thumbnailCandidates.length-1)return false;thumbnailCandidateIndex+=1;thumbnail.src=thumbnailCandidates[thumbnailCandidateIndex];return true;};
thumbnail.src=thumbnailCandidates[thumbnailCandidateIndex];
thumbnail.addEventListener('error',advanceThumbnail);
thumbnail.addEventListener('load',()=>{if(thumbnail.naturalWidth&&thumbnail.naturalWidth<640)advanceThumbnail();});
const shade=document.createElement('span'); shade.className='youtube-showcase-shade'; shade.setAttribute('aria-hidden','true');
const play=document.createElement('button'); play.type='button'; play.className='youtube-showcase-play'; play.setAttribute('aria-label',block.primary_cta_label||'Assistir vídeo no YouTube');
const playIcon=document.createElement('span'); playIcon.className='youtube-showcase-play-icon'; playIcon.textContent='▶'; playIcon.setAttribute('aria-hidden','true');
const playLabel=document.createElement('strong'); playLabel.textContent=block.primary_cta_label||'Assistir'; play.append(playIcon,playLabel);
stage.append(thumbnail,shade,play);
const loadPlayer=()=>{
if(stage.dataset.playerLoaded==='1')return;
stage.dataset.playerLoaded='1';
const iframe=document.createElement('iframe'); iframe.className='youtube-showcase-player'; iframe.loading='lazy'; iframe.title=block.title||'Vídeo do YouTube'; iframe.allow='autoplay; encrypted-media; picture-in-picture; web-share'; iframe.allowFullscreen=true; iframe.referrerPolicy='strict-origin-when-cross-origin'; iframe.src=`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
const fallback=document.createElement('a'); fallback.className='youtube-showcase-fallback'; fallback.href=`https://www.youtube.com/watch?v=${videoId}`; fallback.target='_blank'; fallback.rel='noopener noreferrer'; fallback.textContent=block.youtube_cta_label||'Assistir no YouTube';
stage.replaceChildren(iframe,fallback);
requestAnimationFrame(()=>{try{iframe.focus({preventScroll:true});}catch(_error){iframe.focus();}});
};
play.addEventListener('click',loadPlayer);
section.append(stage);
const actions=[];
if(block.show_external_link!==false){const link=document.createElement('a');link.href=`https://www.youtube.com/watch?v=${videoId}`;link.target='_blank';link.rel='noopener noreferrer';link.textContent=block.youtube_cta_label||'Ver no YouTube';actions.push(link);}
const channelUrl=safeYouTubeChannelUrl(block.channel_url||'');
if(block.show_channel_link===true&&channelUrl){const link=document.createElement('a');link.href=channelUrl;link.target='_blank';link.rel='noopener noreferrer';link.textContent=block.channel_cta_label||'Conheça o canal';actions.push(link);}
if(actions.length){const bar=document.createElement('div');bar.className='youtube-showcase-actions';actions.forEach((link)=>bar.append(link));section.append(bar);}
return section;
}
function createHomeVideoBlock(block) {
const media=publicMediaById(block.media_id||''); if(!media||media.type!=='video')return null;
const section=document.createElement('section');section.className=`modular-block editorial-section block-home-video width-${block.width||'full'} scroll-${block.scroll_behavior||'parallax'} effect-${block.section_effect||'reveal'} reveal`;
if(block.title||block.eyebrow||block.body)section.append(blockHeading(block,block.title||''));
const stage=document.createElement('div');stage.className=`home-video-stage ratio-${String(block.ratio||'16:9').replace(':','x')}`;
if(block.scroll_behavior==='parallax')stage.dataset.parallax='detail';stage.append(projectVideoFallback(media,{autoplay:block.autoplay!==false}));section.append(stage);return section;
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
const section=document.createElement('section');
section.className=`editorial-spacer size-${block.size||'medium'} transition-${block.transition||'atmosphere'}`;
section.setAttribute('role','separator');
section.setAttribute('aria-label',block.title||'Transição entre seções');
const visual=document.createElement('span');visual.className='editorial-spacer-visual';visual.setAttribute('aria-hidden','true');
visual.append(document.createElement('i'),document.createElement('b'),document.createElement('i'));
section.append(visual);
if(block.title){const title=document.createElement('strong');title.className='editorial-spacer-title';title.textContent=block.title;section.append(title);}
return section;
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
node.classList.add(`sf-grid-cols-${block.grid_columns || '2'}`);
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
if (small) small.textContent = explicit('eyebrow', 'O QUE FAZEMOS');
if (text) text.textContent = explicit('title', 'Design, vídeo e direção criativa para marcas que precisam se destacar.');
}
if (block.type === 'lettering') {
const cfg=builder.lettering||{}; const eyebrow=node.querySelector('#letteringEyebrow'); const primary=node.querySelector('#letteringText'); const clone=node.querySelector('#letteringClone');
const value=explicit('title', cfg.text || identity.hero_line || '');
if (eyebrow) eyebrow.textContent = explicit('eyebrow', cfg.eyebrow || identity.studio_name || 'MENSAGEM STUDIO');
const resolvedStyle=explicit('style', cfg.style || 'split') === 'inherit' ? (cfg.style || 'split') : explicit('style', cfg.style || 'split');
applyLetteringCopy(primary,clone,value,resolvedStyle);
node.dataset.style = resolvedStyle;
node.dataset.direction = explicit('direction', cfg.direction || 'left');
}
if (block.type === 'projects_header') {
const cfg=builder.projects||{}; const e=node.querySelector('#projectsEyebrow'); const t=node.querySelector('#projectsTitle'); const p=node.querySelector('#projectsDescription');
if(e)e.textContent=explicit('eyebrow',cfg.eyebrow||'Portfólio selecionado'); if(t)t.textContent=explicit('title',cfg.title||'Projetos'); if(p)p.textContent=explicit('body','');
updateProjectsHeadingVisibility(block,builder);
}
if (block.type === 'projects') {
node.querySelector('#projects')?.removeAttribute('hidden'); $('#menu')?.removeAttribute('hidden');
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
function normalizeSharedPublicBlock(block={}){const type=LEGACY_SERVICE_RENDER_MAP[block.type]||block.type||'text',allowed=(value,values,fallback)=>values.includes(String(value||''))?String(value):fallback;return {...block,type,visible:block.visible!==false,desktop_visible:block.desktop_visible!==false,mobile_visible:block.mobile_visible!==false,section_width:block.section_width||'full',section_size:block.section_size||'normal',section_background:block.section_background||'none',mobile_section_width:block.mobile_section_width||'auto',mobile_section_size:block.mobile_section_size||'inherit',section_layout_preset:allowed(block.section_layout_preset,['default','editorial_split','feature_panel','media_grid','project_feature','full_bleed','stacked_editorial','navigated_section'],'default'),section_background_type:allowed(block.section_background_type,['theme','solid','gradient','image','texture','video'],'theme'),section_background_media_id:String(block.section_background_media_id||''),section_background_color:/^#[0-9a-f]{6}$/i.test(String(block.section_background_color||''))?String(block.section_background_color):'#07090D',section_background_gradient:allowed(block.section_background_gradient,['editorial','accent','luminous','ink'],'editorial'),section_texture_mode:allowed(block.section_texture_mode,['off','theme','custom'],'off'),section_texture_media_id:String(block.section_texture_media_id||''),section_texture_opacity:Math.max(0,Math.min(1,Number(block.section_texture_opacity??.24))),section_texture_blend_mode:allowed(block.section_texture_blend_mode,['normal','multiply','screen','overlay','soft-light'],'soft-light'),section_texture_scale:Math.max(25,Math.min(400,Number(block.section_texture_scale||100))),section_texture_position:allowed(block.section_texture_position,['center','top','bottom','left','right'],'center'),section_texture_attachment:allowed(block.section_texture_attachment,['scroll','fixed','parallax'],'scroll'),section_overlay_color:/^#[0-9a-f]{6}$/i.test(String(block.section_overlay_color||''))?String(block.section_overlay_color):'#000000',section_overlay_opacity:Math.max(0,Math.min(1,Number(block.section_overlay_opacity??0))),section_content_alignment:allowed(block.section_content_alignment,['left','center','right'],'left'),section_min_height:Math.max(0,Math.min(2000,Number(block.section_min_height||0))),section_padding_top:Math.max(0,Math.min(400,Number(block.section_padding_top||0))),section_padding_bottom:Math.max(0,Math.min(400,Number(block.section_padding_bottom||0))),section_motion_preset:allowed(block.section_motion_preset,['inherit','fade-up','fade','slide-left','slide-right','scale-in','mask-reveal','cinematic','none'],'inherit'),section_reveal:block.section_reveal!==false,section_parallax:block.section_parallax===true?'soft':allowed(block.section_parallax,['off','soft','medium','strong'],'off'),section_sticky_behavior:allowed(block.section_sticky_behavior,['none','content','background'],'none'),section_navigation_label:String(block.section_navigation_label||block.label||block.title||''),section_navigation_visible:block.section_navigation_visible!==false};}
function sectionMediaCandidates(media={}){return [media.media_url,...(media.media_candidates||[]),media.preview_url,...(media.preview_candidates||[]),media.thumbnail_url,...(media.thumbnail_candidates||[]),media.external_url].filter(Boolean);}
function createSectionLayerMedia(media,{video=false,texture=false}={}){if(!media)return null;const candidates=sectionMediaCandidates(media);if(video&&media.type==='video'){const node=createResilientVideo(media,{autoplay:true,muted:true,loop:true,controls:false,preload:'none',className:'sf-section-background-media',defer:true,metadataReady:false,timeoutMs:45000});bindDeferredAutoplay(node,node);return node;}const image=imageWithFallback(media,candidates,{lazy:true,upgradeUrls:candidates});image.classList?.add(texture?'sf-section-texture-media':'sf-section-background-media');image.alt='';return image;}
function ensureSectionVisualLayers(node,block={}){
[...node.children].filter((child)=>child.classList?.contains('sf-section-visual-layer')).forEach((child)=>child.remove());
const needsBackground=block.section_background_type!=='theme',needsTexture=block.section_texture_mode!=='off',needsOverlay=block.section_overlay_opacity>0;
if(!needsBackground&&!needsTexture&&!needsOverlay)return;
const background=document.createElement('div');background.className='sf-section-visual-layer sf-section-background-layer';background.setAttribute('aria-hidden','true');background.dataset.backgroundType=block.section_background_type;background.dataset.gradient=block.section_background_gradient;background.style.setProperty('--sf-section-background-color',block.section_background_color);
const backgroundMedia=publicMediaById(block.section_background_media_id);if(['image','texture','video'].includes(block.section_background_type)&&backgroundMedia){const mediaNode=createSectionLayerMedia(backgroundMedia,{video:block.section_background_type==='video'});if(mediaNode)background.append(mediaNode);}
const texture=document.createElement('div');texture.className='sf-section-visual-layer sf-section-texture-layer';texture.setAttribute('aria-hidden','true');texture.dataset.textureMode=block.section_texture_mode;texture.dataset.texturePosition=block.section_texture_position;texture.dataset.textureAttachment=block.section_texture_attachment;texture.style.setProperty('--sf-section-texture-opacity',String(block.section_texture_opacity));texture.style.setProperty('--sf-section-texture-blend',block.section_texture_blend_mode);texture.style.setProperty('--sf-section-texture-scale-factor',String(block.section_texture_scale/100));texture.style.setProperty('--sf-section-texture-pattern-a',`${7*block.section_texture_scale/100}px`);texture.style.setProperty('--sf-section-texture-pattern-b',`${12*block.section_texture_scale/100}px`);texture.style.setProperty('--sf-section-texture-grain-size',`${180*block.section_texture_scale/100}px`);
if(block.section_texture_mode==='custom'){const textureMedia=publicMediaById(block.section_texture_media_id);const mediaNode=createSectionLayerMedia(textureMedia,{texture:true});if(mediaNode)texture.append(mediaNode);}
const overlay=document.createElement('div');overlay.className='sf-section-visual-layer sf-section-overlay-layer';overlay.setAttribute('aria-hidden','true');overlay.style.setProperty('--sf-section-overlay-color',block.section_overlay_color);overlay.style.setProperty('--sf-section-overlay-opacity',String(block.section_overlay_opacity));
node.prepend(background,texture,overlay);
}
function applySharedPageBlockFrame(node,block={}){
if(!node)return node;block=normalizeSharedPublicBlock(block);[...node.classList].filter((name)=>name.startsWith('sf-section-')||name==='sf-hide-desktop'||name==='sf-hide-mobile'||name.startsWith('sf-mobile-')).forEach((name)=>node.classList.remove(name));node.classList.add('sf-section-canvas',`sf-section-width-${block.section_width}`,`sf-section-size-${block.section_size}`,`sf-section-bg-${block.section_background}`);if(block.desktop_visible===false)node.classList.add('sf-hide-desktop');if(block.mobile_visible===false)node.classList.add('sf-hide-mobile');if(block.mobile_section_width&&block.mobile_section_width!=='auto')node.classList.add(`sf-mobile-width-${block.mobile_section_width}`);if(block.mobile_section_size&&block.mobile_section_size!=='inherit')node.classList.add(`sf-mobile-size-${block.mobile_section_size}`);
node.dataset.sectionLayout=block.section_layout_preset;node.dataset.sectionBackgroundType=block.section_background_type;node.dataset.sectionTextureMode=block.section_texture_mode;node.dataset.sectionMotion=block.section_reveal===false||block.section_motion_preset==='none'?'none':block.section_motion_preset;node.dataset.sectionContentAlignment=block.section_content_alignment;node.dataset.sectionSticky=block.section_sticky_behavior;node.dataset.sectionNavigationLabel=block.section_navigation_label;node.dataset.sectionNavigationVisible=block.section_navigation_visible===false?'false':'true';node.dataset.parallaxStrength=block.section_parallax;if(block.section_parallax!=='off')node.dataset.parallax='section';else delete node.dataset.parallax;
const setLength=(name,value)=>value?node.style.setProperty(name,`${value}px`):node.style.removeProperty(name);setLength('--sf-section-min-height',block.section_min_height);setLength('--sf-section-padding-top',block.section_padding_top);setLength('--sf-section-padding-bottom',block.section_padding_bottom);ensureSectionVisualLayers(node,block);if(block.section_reveal===false||block.section_motion_preset==='none')node.classList.add('is-visible');return node;
}
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
function safeExternalHttps(value='') {
try { const parsed=new URL(String(value||'').trim()); return parsed.protocol==='https:'?parsed.href:''; }
catch (_) { return ''; }
}
function createExternalEmbedBlock(block={}) {
const url=safeExternalHttps(block.url);if(!url)return null;
const section=document.createElement('section');section.className='modular-block block-external-embed reveal';
const heading=blockHeading(block);if(heading.children.length)section.append(heading);
const stage=document.createElement('div');stage.className=`external-embed-stage ratio-${String(block.ratio||'16:9').replace(':','x')} width-${['content','wide','full'].includes(block.width)?block.width:'wide'}`;
if(block.ratio==='custom')stage.style.setProperty('--embed-height',`${Math.max(180,Math.min(1200,Number(block.height||560)))}px`);
const frame=document.createElement('iframe');frame.src=url;frame.title=block.embed_name||block.title||'Conteúdo externo';frame.loading='lazy';frame.referrerPolicy='strict-origin-when-cross-origin';frame.sandbox='allow-forms allow-presentation allow-same-origin allow-scripts';frame.allow='fullscreen; autoplay; encrypted-media; picture-in-picture';
const fallback=document.createElement('div');fallback.className='external-embed-fallback';const copy=document.createElement('span');copy.textContent='Se o conteúdo bloquear a incorporação, abra-o em uma nova aba.';const open=document.createElement('a');open.href=url;open.target='_blank';open.rel='noopener';open.textContent=block.cta_text||'Abrir conteúdo externamente ↗';fallback.append(copy,open);
frame.addEventListener('load',()=>stage.classList.add('is-loaded'));frame.addEventListener('error',()=>stage.classList.add('is-blocked'));
stage.append(frame,fallback);section.append(stage);return section;
}
function externalCarouselItems(value='') {
return String(value||'').split(/\r?\n/).map((line)=>line.trim()).filter(Boolean).map((line,index)=>{const [url,thumbnail,title]=line.split('|').map((part)=>part.trim());return{id:`external-${index}`,url:safeExternalHttps(url),thumbnail:safeExternalHttps(thumbnail),title:title||`Conteúdo ${index+1}`};}).filter((item)=>item.url);
}
function createAutoplayCarouselBlock(block={}) {
if((block.source||'projects')==='projects'){
const speed=Number(block.speed_px||32)<24?'slow':(Number(block.speed_px||32)>42?'fast':'medium');
return createAutoCarouselBlock({...block,motion_mode:block.autoplay===false?'manual':'auto',speed,card_gap:block.gap||block.card_gap,cards_desktop:block.items_visible_desktop||3,cards_mobile:block.items_visible_mobile||1,card_ratio:block.ratio||block.card_ratio});
}
const items=externalCarouselItems(block.external_urls);if(!items.length)return null;
const section=document.createElement('section');section.className='modular-block block-autoplay-carousel block-auto-carousel reveal';section.dataset.direction=block.direction||'left';section.dataset.pauseHover=block.pause_on_hover===false?'false':'true';section.style.setProperty('--carousel-visible',String(Math.max(1,Math.min(8,Number(block.items_visible_desktop||3)))));section.style.setProperty('--carousel-visible-mobile',String(Math.max(1,Math.min(3,Number(block.items_visible_mobile||1)))));section.style.setProperty('--carousel-gap',`${Math.max(0,Math.min(80,Number(block.gap_px||20)))}px`);section.dataset.cardRatio=block.ratio||'16x9';
const heading=blockHeading(block,'Em movimento');if(heading.children.length)section.append(heading);
const viewport=document.createElement('div');viewport.className='auto-carousel-viewport';const strip=document.createElement('div');strip.className='auto-carousel-strip external-carousel-strip';
const add=(clone=false)=>items.forEach((item)=>{const a=document.createElement('a');a.className='external-carousel-card';a.href=item.url;a.target='_blank';a.rel='noopener';if(clone){a.dataset.carouselClone='1';a.tabIndex=-1;a.setAttribute('aria-hidden','true');}const visual=document.createElement('span');visual.className='external-carousel-visual';if(item.thumbnail){const img=document.createElement('img');img.src=item.thumbnail;img.alt='';img.loading='lazy';visual.append(img);}else if(/\.(?:mp4|webm|m4v)(?:[?#]|$)/i.test(item.url)){const video=createResilientVideo({id:item.id,title:item.title,media_url:item.url,media_candidates:[item.url]},{autoplay:true,muted:true,loop:true,controls:false,preload:'none',defer:true,metadataReady:false});visual.append(video);bindDeferredAutoplay(video,visual);}const title=document.createElement('strong');title.textContent=item.title;a.append(visual,title);strip.append(a);});
add(false);if(block.loop!==false)add(true);viewport.append(strip);section.append(viewport);if((reduced&&block.force_motion!==true)||block.autoplay===false){viewport.classList.add('is-manual');return section;}
return startContinuousCarousel(section,viewport,strip,{speed:Number(block.speed_px||32),direction:block.direction||'left',loop:block.loop!==false,pauseOnHover:block.pause_on_hover!==false});
}
function createCinematicHeroBlock(block={}) {
const media=publicMediaById(block.media_id||'');if(!media)return null;
const section=document.createElement('section');section.className='modular-block block-cinematic-hero reveal';section.style.setProperty('--cinematic-height',`${Math.max(25,Math.min(100,Number(block.height_vh||50)))}vh`);section.style.setProperty('--cinematic-overlay',String(Math.max(0,Math.min(.9,Number(block.overlay??.36)))));section.style.setProperty('--cinematic-focus-x',`${Math.max(0,Math.min(100,Number(block.focal_x??50)))}%`);section.style.setProperty('--cinematic-focus-y',`${Math.max(0,Math.min(100,Number(block.focal_y??50)))}%`);section.dataset.mediaMovement=block.media_movement===false?'off':'on';
const stage=document.createElement('div');stage.className='cinematic-hero-media';if(block.parallax!==false)stage.dataset.parallax='detail';
if(media.type==='video')stage.append(projectVideoFallback(media,{autoplay:true}));else stage.append(imageWithFallback(media,[media.media_url,...(media.media_candidates||[]),media.thumbnail_url,...(media.thumbnail_candidates||[])],{lazy:true,upgradeUrls:[media.media_url,...(media.media_candidates||[])]}));
const shade=document.createElement('div');shade.className='cinematic-hero-shade';const copy=blockHeading(block);copy.classList.add('cinematic-hero-copy');if(block.cta_text){const a=document.createElement('a');const externalHref=safeExternalHttps(block.cta_url),internalHref=String(block.cta_url||'').startsWith('/')?String(block.cta_url||''):'';const href=externalHref||internalHref;a.href=href||'#';a.textContent=block.cta_text;if(externalHref){a.target='_blank';a.rel='noopener';}copy.append(a);}section.append(stage,shade,copy);return section;
}
function texturedRevealLines(style='orbits') {
const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.classList.add('textured-reveal-lines');svg.setAttribute('viewBox','0 0 1600 900');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');
const paths={
orbits:['M-160 90 C 250 -120, 710 360, 950 -120','M1410 -90 C 1540 270, 1250 610, 1090 980','M-100 540 C 240 650, 40 970, 470 1010'],
contours:['M-120 170 C 210 30, 410 350, 760 210 S 1320 40, 1720 230','M-180 630 C 180 440, 520 760, 880 590 S 1390 390, 1760 650','M240 -90 C 320 170, 180 390, 370 620 S 580 880, 520 1040'],
diagonal:['M-120 780 C 280 520, 520 500, 860 280 S 1280 60, 1730 -40','M-160 970 C 300 720, 600 690, 980 430 S 1360 180, 1740 60','M120 920 C 420 700, 700 520, 970 310 S 1320 80, 1600 -20']
};
(paths[style]||paths.orbits).forEach((d)=>{const path=document.createElementNS(ns,'path');path.setAttribute('d',d);path.setAttribute('pathLength','1');svg.append(path);});return svg;
}
function createTexturedRevealBlock(block={}) {
const section=document.createElement('section');section.className='modular-block block-textured-reveal reveal';section.dataset.texturedReveal='';section.dataset.texturedProgressMode=['trigger_once','tied_to_scroll','replay'].includes(block.textured_progress_mode)?block.textured_progress_mode:'tied_to_scroll';section.dataset.textureRevealMotion=['fade','float','scale','none'].includes(block.texture_reveal_motion)?block.texture_reveal_motion:'float';section.style.setProperty('--textured-height',`${Math.max(40,Math.min(120,Number(block.height_vh||70)))}svh`);section.style.setProperty('--textured-line-color',/^#[0-9a-f]{6}$/i.test(String(block.line_color||''))?block.line_color:'#FFFFFF');section.style.setProperty('--textured-line-opacity',String(Math.max(0,Math.min(1,Number(block.line_opacity??.72)))));section.dataset.texturedTextureOpacity=String(Math.max(0,Math.min(1,Number(block.section_texture_opacity??.34))));
if(block.decorative_lines!==false)section.append(texturedRevealLines(['orbits','contours','diagonal'].includes(block.line_style)?block.line_style:'orbits'));
const content=document.createElement('div');content.className='textured-reveal-content';
if(block.eyebrow){const eyebrow=document.createElement('small');eyebrow.className='textured-reveal-eyebrow';eyebrow.textContent=block.eyebrow;content.append(eyebrow);}
const title=document.createElement('h2');title.textContent=block.title||'Take a look on our reel';content.append(title);
if(block.body){const body=document.createElement('p');body.textContent=block.body;content.append(body);}
const href=safeLinkUrl(block.cta_url||'');if(block.cta_text&&href){const action=document.createElement('a');action.className='textured-reveal-cta';action.href=href;action.textContent=block.cta_text;if(/^https?:/i.test(href)){action.target='_blank';action.rel='noopener';}content.append(action);}
section.append(content);
if(block.scroll_indicator!==false){const indicator=document.createElement('div');indicator.className='textured-reveal-scroll';indicator.setAttribute('aria-hidden','true');const icon=document.createElement('i');const label=document.createElement('span');label.textContent=block.scroll_label||'Role para explorar';indicator.append(icon,label);section.append(indicator);}
return section;
}
function sectionExperienceItemRecord(item={}) {
const project=editorialProjectFromItem(item);
const media=publicMediaById(item.media_id||'');
const external=safeExternalHttps(item.external_media_url||'');
const title=String(item.title||item.label||project?.title||'').trim();
const label=String(item.label||title||'Item').trim();
return {item,project,media,external,title,label,description:String(item.description||project?.description||'').trim()};
}
function sectionExperienceMediaNode(record={}) {
const media=record.media || (record.project ? {...record.project,_project:record.project} : null);
if(media){
if(media.type==='video'){
const video=createResilientVideo(media,{autoplay:true,muted:true,loop:true,controls:false,preload:'metadata',className:'section-experience-media-node',defer:false,metadataReady:false,timeoutMs:45000});
video.playsInline=true; bindDeferredAutoplay(video,video); return video;
}
const urls=[media.media_url,...(media.media_candidates||[]),media.thumbnail_url,...(media.thumbnail_candidates||[]),media.preview_url,...(media.preview_candidates||[])].filter(Boolean);
const image=imageWithFallback(media,urls,{lazy:false,upgradeUrls:urls}); image.classList.add('section-experience-media-node'); image.alt=''; return image;
}
if(record.external){
if(/\.(?:mp4|webm|m4v|mov)(?:$|[?#])/i.test(record.external)){
const externalVideo={id:`section-external-${Math.random().toString(36).slice(2,8)}`,type:'video',media_url:record.external,media_candidates:[record.external],preview_url:record.external,preview_candidates:[record.external],thumbnail_url:'',thumbnail_candidates:[]};
const video=createResilientVideo(externalVideo,{autoplay:true,muted:true,loop:true,controls:false,preload:'metadata',className:'section-experience-media-node',defer:false,metadataReady:false,timeoutMs:45000});video.playsInline=true;bindDeferredAutoplay(video,video);return video;
}
const image=document.createElement('img');image.className='section-experience-media-node';image.src=record.external;image.alt='';image.loading='eager';image.decoding='async';return image;
}
return null;
}
function sectionExperienceAction(record={}) {
const item=record.item||{}, label=String(item.action_label||'').trim();
if(!label)return null;
const explicit=safeEditorialActionUrl(item.action_url||'');
if(explicit){const a=document.createElement('a');a.className='section-experience-cta';a.href=explicit;a.textContent=label;if(/^https?:/i.test(explicit)){a.target='_blank';a.rel='noopener';}return a;}
const service=quoteServiceRecord(String(item.service_id||''));
if(service){const a=document.createElement('a');a.className='section-experience-cta';a.href=serviceDetailHref(service.item);a.textContent=label;return a;}
if(record.project){const button=document.createElement('button');button.type='button';button.className='section-experience-cta';button.textContent=label;button.addEventListener('click',()=>openProjectDetail(record.project));return button;}
return null;
}
function createSectionExperienceBlock(block={}) {
const records=(Array.isArray(block.items)?block.items:[]).map(sectionExperienceItemRecord).filter((record)=>record.label&&(record.media||record.project||record.external));
if(!records.length)return null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const section=document.createElement('section');section.className='modular-block block-section-experience reveal';section.tabIndex=0;section.dataset.navigationPosition=['left','right'].includes(block.navigation_position)?block.navigation_position:'left';section.dataset.experienceTransition=['cinematic','crossfade','scale','clean'].includes(block.experience_transition)?block.experience_transition:'cinematic';section.dataset.mobileMode=block.experience_mobile_mode==='compact'?'compact':'pills';section.style.setProperty('--experience-height',`${Math.max(55,Math.min(120,Number(block.height_vh||100)))}svh`);section.style.setProperty('--experience-active',/^#[0-9a-f]{6}$/i.test(String(block.active_color||''))?block.active_color:'var(--accent)');section.style.setProperty('--experience-inactive',/^#[0-9a-f]{6}$/i.test(String(block.inactive_color||''))?block.inactive_color:'#fff');section.style.setProperty('--experience-inactive-opacity',String(Math.max(.08,Math.min(.9,Number(block.inactive_opacity??.28)))));section.style.setProperty('--experience-duration',`${Math.max(180,Math.min(2200,Number(block.transition_duration||720)))}ms`);section.style.setProperty('--experience-overlay',String(Math.max(0,Math.min(.85,Number(block.experience_overlay??.32)))));section.style.setProperty('--experience-align',block.experience_alignment||'left');
const stage=document.createElement('div');stage.className='section-experience-stage';stage.setAttribute('aria-hidden','true');
const overlay=document.createElement('div');overlay.className='section-experience-overlay';
const content=document.createElement('div');content.className='section-experience-content';
const eyebrow=document.createElement('small');eyebrow.className='section-experience-eyebrow';eyebrow.textContent=block.eyebrow||'OUR EXPERTISES';
const nav=document.createElement('nav');nav.className='section-experience-nav';nav.setAttribute('aria-label',block.eyebrow||'Navegação da experiência');
const copy=document.createElement('div');copy.className='section-experience-copy';const title=document.createElement('h2');const description=document.createElement('p');const actions=document.createElement('div');actions.className='section-experience-actions';copy.append(title,description,actions);
content.append(eyebrow,nav,copy);section.append(stage,overlay,content);
let active=0,locked=false,touchStartX=0,touchStartY=0;
const buttons=records.map((record,index)=>{const button=document.createElement('button');button.type='button';button.className='section-experience-item';button.dataset.experienceIndex=String(index);button.innerHTML=`<i>${String(index+1).padStart(2,'0')}</i><span>${esc(record.label)}</span>`;button.addEventListener('click',()=>render(index));nav.append(button);return button;});
function render(index,{focus=false}={}){
const next=Math.max(0,Math.min(records.length-1,index)); if(next===active&&stage.childElementCount)return; active=next; const record=records[active];
const mediaNode=sectionExperienceMediaNode(record); if(mediaNode){const layer=document.createElement('div');layer.className='section-experience-media-layer is-entering';layer.append(mediaNode);stage.append(layer);requestAnimationFrame(()=>layer.classList.remove('is-entering'));[...stage.children].slice(0,-1).forEach((old)=>{old.classList.add('is-leaving');setTimeout(()=>old.remove(),Math.max(240,Number(block.transition_duration||720)+80));});}
buttons.forEach((button,i)=>{const on=i===active;button.classList.toggle('is-active',on);button.setAttribute('aria-current',on?'true':'false');});
const accent=/^#[0-9a-f]{6}$/i.test(String(record.item.accent_color||''))?record.item.accent_color:(/^#[0-9a-f]{6}$/i.test(String(block.active_color||''))?block.active_color:'var(--accent)');section.style.setProperty('--experience-active',accent);
title.textContent=record.title||record.label;description.textContent=record.description;description.hidden=!record.description;actions.replaceChildren();const action=sectionExperienceAction(record);if(action)actions.append(action);
section.dataset.activeIndex=String(active); if(focus)buttons[active]?.focus({preventScroll:true});
}
function navigate(delta,{focus=false}={}){const candidate=active+delta;if(candidate<0||candidate>=records.length){if(block.loop===true){render(candidate<0?records.length-1:0,{focus});return true;}return false;}render(candidate,{focus});return true;}
if(block.wheel_navigation!==false&&!reduced&&records.length>1)section.addEventListener('wheel',(event)=>{if(matchMedia('(max-width:900px)').matches||locked||Math.abs(event.deltaY)<18)return;const delta=event.deltaY>0?1:-1;if(!navigate(delta))return;event.preventDefault();locked=true;setTimeout(()=>{locked=false;},Math.max(420,Number(block.transition_duration||720)));},{passive:false});
section.addEventListener('keydown',(event)=>{if(['ArrowDown','ArrowRight','PageDown'].includes(event.key)){if(navigate(1,{focus:true}))event.preventDefault();}if(['ArrowUp','ArrowLeft','PageUp'].includes(event.key)){if(navigate(-1,{focus:true}))event.preventDefault();}});
section.addEventListener('touchstart',(event)=>{const t=event.changedTouches?.[0];if(t){touchStartX=t.clientX;touchStartY=t.clientY;}},{passive:true});section.addEventListener('touchend',(event)=>{const t=event.changedTouches?.[0];if(!t)return;const dx=t.clientX-touchStartX,dy=t.clientY-touchStartY;if(Math.abs(dx)<55||Math.abs(dx)<Math.abs(dy))return;navigate(dx<0?1:-1);},{passive:true});
render(0); return section;
}
function createRenaissanceChapterBlock(block={}) {
const section=document.createElement('section');
section.className=`modular-block block-renaissance-chapter layout-${block.layout==='stack'?'stack':'split'} tone-${['ink','accent'].includes(block.tone)?block.tone:'cream'} reveal`;
const meta=document.createElement('div');meta.className='renaissance-chapter-meta';
const number=document.createElement('span');number.textContent=String(block.number||'01').padStart(2,'0');
const eyebrow=document.createElement('small');eyebrow.textContent=block.eyebrow||'Renaissance editorial';meta.append(number,eyebrow);
const copy=document.createElement('div');copy.className='renaissance-chapter-copy';
const title=document.createElement('h2');title.textContent=block.title||'Uma nova forma de apresentar ideias.';title.dataset.parallaxText='8';copy.append(title);
if(block.body){const body=document.createElement('p');body.textContent=block.body;copy.append(body);}
const href=safeLinkUrl(block.cta_url||'');
if(block.cta_text&&href){const action=document.createElement('a');action.className='renaissance-section-button';action.href=href;action.textContent=block.cta_text;if(/^https?:/i.test(href)){action.target='_blank';action.rel='noopener';}copy.append(action);}
section.append(meta,copy);
return section;
}
const PUBLIC_HOME_BLOCK_REGISTRY=Object.freeze({
editorial_carousel:(block)=>createEditorialCarouselBlock(block),
editorial_blocks:(block)=>createEditorialBlocksBlock(block),
home_video:(block)=>createHomeVideoBlock(block),
youtube_showcase:(block)=>createYouTubeShowcaseBlock(block),
highlights:(block)=>createHighlightsBlock(block),
showcase:(block)=>createShowcaseBlock(block),
split:(block)=>createSplitBlock(block),
horizontal_projects:(block)=>createHorizontalProjectsBlock(block),
auto_carousel:(block)=>createAutoCarouselBlock(block),
spotlight:(block)=>createSpotlightBlock(block),
marquee:(block)=>createMarqueeBlock(block),
lettering_custom:(block)=>createCustomLetteringBlock(block),
video_feature:(block)=>createVideoFeatureBlock(block),
metrics:(block)=>createStructuredContentBlock(block,'metrics'),
testimonials:(block)=>createStructuredContentBlock(block,'testimonials'),
external_embed:(block)=>createExternalEmbedBlock(block),
autoplay_carousel:(block)=>createAutoplayCarouselBlock(block),
cinematic_hero:(block)=>createCinematicHeroBlock(block),
section_experience:(block)=>createSectionExperienceBlock(block),
textured_reveal:(block)=>createTexturedRevealBlock(block),
renaissance_chapter:(block)=>createRenaissanceChapterBlock(block),
});
function createCustomHomeBlock(block) {
if (block.visible === false) return null;
let node = createSharedPageBlock(block);
if (!node) { const renderer=PUBLIC_HOME_BLOCK_REGISTRY[block.type]; if(renderer) node=renderer(block); }
if (node) { node.dataset.homeBlockId = block.id || ''; node.dataset.homeBlockLabel = block.label || block.title || block.type || 'Seção'; node.classList.add('home-modular-instance','reveal'); applyHomeSectionFrame(node, block); }
return node;
}
function normalizeSectionNavigator(raw={}){return {...raw,enabled:raw.enabled===true,position:['left','right'].includes(raw.position)?raw.position:'right',mode:['overlay','sticky','inline'].includes(raw.mode)?raw.mode:'overlay',eyebrow:String(raw.eyebrow||'SEÇÕES'),show_eyebrow:raw.show_eyebrow!==false,inactive_opacity:Math.max(.1,Math.min(.9,Number(raw.inactive_opacity??.34))),active_style:['accent','underline','solid'].includes(raw.active_style)?raw.active_style:'accent',animation:['slide','fade','none'].includes(raw.animation)?raw.animation:'slide',desktop_only:raw.desktop_only===true,mobile_mode:['select','pills','hidden'].includes(raw.mobile_mode)?raw.mobile_mode:'select'};}
function sectionNavigatorTargets(){
const selector='[data-home-block-id],[data-section-block-id],[data-service-block-id],[data-custom-page-section-id]';const seen=new Set();
return [...document.querySelectorAll(selector)].filter((node)=>{if(node.closest('#sectionNavigator')||node.hidden||node.dataset.sectionNavigationVisible==='false')return false;if(node.dataset.homeBlockId&&node.querySelector('[data-section-block-id]'))return false;const style=getComputedStyle(node);if(style.display==='none'||style.visibility==='hidden')return false;if(seen.has(node))return false;seen.add(node);return true;});
}
function sectionNavigatorLabel(node,index){const explicit=String(node.dataset.sectionNavigationLabel||node.dataset.homeBlockLabel||'').trim();if(explicit)return explicit;const heading=node.querySelector('h1,h2,h3,.modular-heading strong,.section-page-meta small');const text=String(heading?.textContent||'').trim();return text||`Seção ${String(index+1).padStart(2,'0')}`;}
function setSectionNavigatorActive(nav,targetId){if(!nav||!targetId)return;nav.dataset.activeTarget=targetId;nav.querySelectorAll('[data-section-nav-target]').forEach((control)=>{const active=control.dataset.sectionNavTarget===targetId;control.classList.toggle('is-active',active);if(control.tagName==='BUTTON')control.setAttribute('aria-current',active?'true':'false');});const select=nav.querySelector('select');if(select&&select.value!==targetId)select.value=targetId;}
function setupSectionNavigator(raw={}){
sectionNavigatorObserver?.disconnect();sectionNavigatorObserver=null;document.querySelector('#sectionNavigator')?.remove();const config=normalizeSectionNavigator(raw);if(!config.enabled)return null;
const targets=sectionNavigatorTargets();if(targets.length<2)return null;targets.forEach((node,index)=>{if(!node.id)node.id=`sf-section-${String(index+1).padStart(2,'0')}`;});
const nav=document.createElement('nav');nav.id='sectionNavigator';nav.className='section-navigator';nav.setAttribute('aria-label','Navegação por seções');nav.dataset.position=config.position;nav.dataset.mode=config.mode;nav.dataset.activeStyle=config.active_style;nav.dataset.animation=config.animation;nav.dataset.desktopOnly=config.desktop_only?'true':'false';nav.dataset.mobileMode=config.mobile_mode;nav.style.setProperty('--section-nav-inactive-opacity',String(config.inactive_opacity));
if(config.show_eyebrow){const eyebrow=document.createElement('span');eyebrow.className='section-navigator-eyebrow';eyebrow.textContent=config.eyebrow;nav.append(eyebrow);}
const list=document.createElement('div');list.className='section-navigator-list';const select=document.createElement('select');select.className='section-navigator-select';select.setAttribute('aria-label','Ir para seção');
const scrollToTarget=(id)=>{const target=document.getElementById(id);target?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});setSectionNavigatorActive(nav,id);};
targets.forEach((target,index)=>{const label=sectionNavigatorLabel(target,index),button=document.createElement('button');button.type='button';button.dataset.sectionNavTarget=target.id;button.innerHTML=`<i>${String(index+1).padStart(2,'0')}</i><span>${esc(label)}</span>`;button.addEventListener('click',()=>scrollToTarget(target.id));list.append(button);const option=document.createElement('option');option.value=target.id;option.textContent=`${String(index+1).padStart(2,'0')} · ${label}`;select.append(option);});select.addEventListener('change',()=>scrollToTarget(select.value));nav.append(list,select);
if(config.mode==='overlay')document.body.append(nav);else{const parent=targets[0].parentElement||$('#top')||document.body;parent.insertBefore(nav,targets[0]);}
setSectionNavigatorActive(nav,targets[0].id);
if('IntersectionObserver' in window){const visibility=new Map();sectionNavigatorObserver=new IntersectionObserver((entries)=>{entries.forEach((entry)=>visibility.set(entry.target.id,entry.isIntersecting?entry.intersectionRatio:0));const activeTarget=targets.slice().sort((a,b)=>(visibility.get(b.id)||0)-(visibility.get(a.id)||0))[0];if(activeTarget&&(visibility.get(activeTarget.id)||0)>0)setSectionNavigatorActive(nav,activeTarget.id);},{threshold:[.08,.2,.4,.65],rootMargin:'-18% 0px -52% 0px'});targets.forEach((target)=>sectionNavigatorObserver.observe(target));}
requestAnimationFrame(()=>{if(typeof layoutFloatingControls==='function')layoutFloatingControls();});
return nav;
}
function placeHomeHorizontalNavigation() {
const main=$('#top'), hero=$('#hero'), filters=$('#filters');
if(!main||!hero||!filters)return;
const projects=DATA.site_builder?.projects||{};
const mode=['menu','inline'].includes(projects.filters?.display_mode)?projects.filters.display_mode:'inline';
filters.toggleAttribute('hidden', projects.visible===false||mode==='menu');
if(filters.hidden)return;
hero.insertAdjacentElement('afterend',filters);
filters.dataset.homePlacement='after-hero';
}
function coreHomeBlockHasVisibleContent(node, block = {}) {
if (!node || block.visible === false) return false;
if (block.type === 'intro') return Boolean(node.querySelector('#heroLine')?.textContent?.trim());
if (block.type === 'lettering') return Boolean(node.querySelector('#letteringText')?.textContent?.trim());
if (block.type === 'projects') return true; // grid may exist without its optional heading
if (block.type === 'projects_header') return Boolean(String(block.eyebrow||'').trim()||String(block.title||'').trim()||String(block.body||'').trim());
return true;
}
function updateProjectsHeadingVisibility(block={},builder={}){
const heading=$('#portfolioHeading');if(!heading)return;
const projects=builder.projects||{};
const explicitHeaderVisible=block.visible!==false&&(Object.prototype.hasOwnProperty.call(block,'header_visible')?block.header_visible!==false:projects.header_visible!==false);
const eyebrow=String(Object.prototype.hasOwnProperty.call(block,'eyebrow')?block.eyebrow:(projects.eyebrow??'')).trim();
const title=String(Object.prototype.hasOwnProperty.call(block,'title')?block.title:(projects.title??'')).trim();
const body=String(Object.prototype.hasOwnProperty.call(block,'body')?block.body:'').trim();
const visible=explicitHeaderVisible&&Boolean(eyebrow||title||body);
heading.dataset.align=block.text_align||'left';
heading.hidden=!visible;
heading.classList.toggle('is-empty-heading',!visible);
const eyebrowNode=heading.querySelector('#projectsEyebrow');if(eyebrowNode){eyebrowNode.textContent=eyebrow;eyebrowNode.hidden=!eyebrow;}
const titleNode=heading.querySelector('#projectsTitle');if(titleNode){titleNode.textContent=title;titleNode.hidden=!title;}
const bodyNode=heading.querySelector('#projectsDescription');if(bodyNode){bodyNode.textContent=body;bodyNode.hidden=!body;}
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
node.dataset.homeBlockId=block.id||'';node.dataset.homeBlockLabel=block.label||block.title||block.type||'Seção';
applyHomeSectionFrame(node, block);
applyCoreBlockOverrides(node, block, builder);
node.hidden = !coreHomeBlockHasVisibleContent(node, block);
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
setupSectionNavigator(builder.section_navigator||{});
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
function quoteProposalPayload(){quoteLeadFromDom();const requestId=`SF-${Date.now().toString(36).toUpperCase()}`;return {schema:'studioframe.proposal-request.v1',request_id:requestId,created_at:new Date().toISOString(),site:location.origin,lead:{...QUOTE_STATE.lead},summary:quoteSummary(),services:quoteResolvedItems().map(({category,item,line,package:pkg,reference,source})=>({category_id:String(category.id||''),category:String(category.title||''),service_id:String(item.id||''),service:String(item.title||''),package_id:String(pkg?.id||''),package:String(pkg?.label||''),quantity:Math.max(1,Number(line.quantity)||1),note:String(line.note||''),reference_project_id:String(reference?.project_id||reference?.id||''),reference_project:String(reference?.title||''),source_type:String(source?.type||''),source_url:String(source?.url||''),source_project_id:String(source?.project_id||''),source_project_title:String(source?.project_title||''),source_service_id:String(source?.service_id||item.id||''),source_service_title:String(source?.service_title||item.title||''),estimate:quoteLinePriceLabel(item,pkg,line.quantity)}))};}
function finishQuoteRequest(){quoteLeadFromDom();saveQuoteState();const payload=quoteProposalPayload();window.STUDIOFRAME_LAST_PROPOSAL_PAYLOAD=payload;document.dispatchEvent(new CustomEvent('studioframe:proposal-request',{detail:payload}));window.open(quoteWhatsappHref(),'_blank','noopener');return payload;}
const QUOTE_STORAGE_KEY=IS_EDITOR_PREVIEW?'studioframe.quote.preview.v1':'studioframe.quote.v1';
const SERVICE_OFFER_STORAGE_PREFIX='studioframe.service-offer.v1';
let SERVICE_OFFER_TIMER=0,SERVICE_OFFER_LAYOUT_BOUND=false,SERVICE_OFFER_LAYOUT_RAF=0;
function serviceOfferConfig(){const raw=servicesConfig().offer_notification||{},pages=Array.isArray(raw.pages)?raw.pages:['home','project','services','service','category','custom'];return {enabled:raw.enabled===true,delay_seconds:Math.max(0,Math.min(300,Number(raw.delay_seconds??8)||0)),title:String(raw.title||'Gostou deste projeto?'),message:String(raw.message||'Podemos criar algo semelhante para sua marca.'),cta_label:String(raw.cta_label||'Solicitar orçamento'),cta_target:['quote','services','related_service'].includes(String(raw.cta_target||''))?String(raw.cta_target):'quote',position:['bottom_left','bottom_right','top_left','top_right'].includes(String(raw.position||''))?String(raw.position):'bottom_right',dismissible:raw.dismissible!==false,frequency:['once_per_session','once_per_page','every_hours','every_days'].includes(String(raw.frequency||''))?String(raw.frequency):'once_per_session',frequency_value:Math.max(1,Math.min(365,Number(raw.frequency_value||24)||24)),pages,related_service_id:String(raw.related_service_id||''),use_theme_colors:raw.use_theme_colors!==false,background_color:String(raw.background_color||''),text_color:String(raw.text_color||''),accent_color:String(raw.accent_color||'')};}
function serviceOfferCurrentProject(){const id=String($('#projectDetail')?.dataset.projectId||'');if(!id)return null;return (DATA.projects||[]).find((row)=>String(row.project_id||row.id||row.gallery_id||'')===id)||null;}
function serviceOfferContext(){const project=serviceOfferCurrentProject();if(project)return {pageType:'project',project};const service=currentServiceDetail();if(service)return {pageType:'service',service:service.item,category:service.category};if(isServicesPage())return {pageType:'services'};const custom=currentCustomPage();if(custom)return {pageType:'custom',custom};const seo=currentSeoRoute();if(seo?.kind==='category')return {pageType:'category',categoryId:String(seo.entity_id||'')};return {pageType:'home'};}
function serviceOfferRelatedRecord(config,context){const explicit=config.related_service_id?quoteServiceRecord(config.related_service_id):null;if(explicit)return explicit;if(context.service)return quoteServiceRecord(context.service.id);if(context.project){const records=projectCommercialServiceRecords(context.project);if(records.length)return records[0];}return null;}
function serviceOfferTemplate(value,context,record){return String(value||'').replace(/\{project\}/gi,String(context.project?.title||'este projeto')).replace(/\{service\}/gi,String(record?.item?.title||'este serviço'));}
function serviceOfferStorageKey(config,context){const base=`${SERVICE_OFFER_STORAGE_PREFIX}:${config.frequency}`;if(config.frequency==='once_per_page')return `${base}:${location.pathname}${location.search}:${context.pageType}`;return base;}
function serviceOfferCanShow(config,context){if(!config.enabled||!config.pages.includes(context.pageType))return false;const key=serviceOfferStorageKey(config,context);try{if(config.frequency==='once_per_session')return !sessionStorage.getItem(key);if(config.frequency==='once_per_page')return !sessionStorage.getItem(key);const previous=Number(localStorage.getItem(key)||0);if(!previous)return true;const unit=config.frequency==='every_days'?86400000:3600000;return Date.now()-previous>=config.frequency_value*unit;}catch(_){return true;}}
function serviceOfferMarkShown(config,context){const key=serviceOfferStorageKey(config,context);try{if(config.frequency==='once_per_session'||config.frequency==='once_per_page')sessionStorage.setItem(key,'1');else localStorage.setItem(key,String(Date.now()));}catch(_){}}
function serviceOfferClose({mark=false}={}){const node=$('#serviceOfferNotification');if(!node)return;if(mark){const config=serviceOfferConfig(),context=serviceOfferContext();serviceOfferMarkShown(config,context);}node.classList.remove('is-visible');node.setAttribute('aria-hidden','true');setTimeout(()=>{node.remove();requestAnimationFrame(layoutFloatingControls);},360);}
function serviceOfferObstacles(){return [...document.querySelectorAll('#header,.filters,.services-jump-nav,[data-context-bar],.section-navigator,.project-back,.hero-open,.hero-sound-toggle,.quote-cta-button,.site-floating-control:not(#serviceOfferNotification)')].filter((node)=>{if(node.hidden||node.closest('[hidden]'))return false;const style=getComputedStyle(node);return style.display!=='none'&&style.visibility!=='hidden';});}
function layoutServiceOfferNotification(){SERVICE_OFFER_LAYOUT_RAF=0;const node=$('#serviceOfferNotification');if(!node||!node.classList.contains('is-visible'))return;node.style.setProperty('--service-offer-shift-y','0px');const bottom=node.dataset.position?.startsWith('bottom');let rect=node.getBoundingClientRect(),shift=0;for(const obstacle of serviceOfferObstacles()){const other=obstacle.getBoundingClientRect();const overlapX=rect.left<other.right+10&&rect.right>other.left-10,overlapY=rect.top<other.bottom+10&&rect.bottom>other.top-10;if(!overlapX||!overlapY)continue;if(bottom){const delta=other.top-rect.bottom-12;if(delta<0){shift+=delta;rect={...rect,top:rect.top+delta,bottom:rect.bottom+delta};}}else{const delta=other.bottom-rect.top+12;if(delta>0){shift+=delta;rect={...rect,top:rect.top+delta,bottom:rect.bottom+delta};}}}node.style.setProperty('--service-offer-shift-y',`${Math.round(shift)}px`);}
function queueServiceOfferLayout(){if(SERVICE_OFFER_LAYOUT_RAF)return;SERVICE_OFFER_LAYOUT_RAF=requestAnimationFrame(layoutServiceOfferNotification);}
function bindServiceOfferLayout(){if(SERVICE_OFFER_LAYOUT_BOUND)return;SERVICE_OFFER_LAYOUT_BOUND=true;addEventListener('resize',queueServiceOfferLayout,{passive:true});addEventListener('scroll',queueServiceOfferLayout,{passive:true});window.visualViewport?.addEventListener('resize',queueServiceOfferLayout,{passive:true});window.visualViewport?.addEventListener('scroll',queueServiceOfferLayout,{passive:true});}
function serviceOfferMarkup(config,context,record){const style=config.use_theme_colors?'':`--service-offer-bg:${esc(config.background_color||'#FFFFFF')};--service-offer-text:${esc(config.text_color||'#172033')};--service-offer-accent:${esc(config.accent_color||'#007A68')};`;const close=config.dismissible?'<button type="button" class="service-offer-close" data-service-offer-close aria-label="Fechar oferta">×</button>':'';return `<aside class="service-offer-notification" id="serviceOfferNotification" data-position="${esc(config.position)}" data-floating-obstacle style="${style}" aria-hidden="true" aria-label="Oferta de serviços"><div class="service-offer-kicker">MENSAGEM STUDIO</div>${close}<strong>${esc(serviceOfferTemplate(config.title,context,record))}</strong><p>${esc(serviceOfferTemplate(config.message,context,record))}</p><button type="button" class="service-offer-cta" data-service-offer-cta>${esc(config.cta_label)}</button></aside>`;}
function serviceOfferAction(config,context,record){if(config.cta_target==='services'){location.href=servicesHref();return;}if(config.cta_target==='related_service'){location.href=record?serviceDetailHref(record.item):servicesHref();return;}if(!quoteEnabled()){location.href=servicesHref();return;}const projectId=String(context.project?.project_id||context.project?.id||''),sourceContext=commercialSourceContext({serviceId:String(record?.item?.id||''),referenceProjectId:projectId,sourceType:'service_offer',sourceUrl:location.href});if(record){addQuoteItem(record.item.id,{referenceProjectId:projectId,open:true,sourceContext});return;}openQuotePanel({sourceContext});}
function showServiceOfferNotification(){const config=serviceOfferConfig(),context=serviceOfferContext();if(!serviceOfferCanShow(config,context))return;document.querySelector('#serviceOfferNotification')?.remove();const record=serviceOfferRelatedRecord(config,context),shell=document.createElement('div');shell.innerHTML=serviceOfferMarkup(config,context,record);const node=shell.firstElementChild;if(!node)return;document.body.append(node);bindServiceOfferLayout();node.querySelector('[data-service-offer-close]')?.addEventListener('click',()=>serviceOfferClose({mark:true}));node.querySelector('[data-service-offer-cta]')?.addEventListener('click',()=>{serviceOfferMarkShown(config,context);serviceOfferAction(config,context,record);serviceOfferClose();});serviceOfferMarkShown(config,context);requestAnimationFrame(()=>{node.classList.add('is-visible');node.setAttribute('aria-hidden','false');layoutFloatingControls();queueServiceOfferLayout();});}
function setupServiceOfferNotification(){clearTimeout(SERVICE_OFFER_TIMER);document.querySelector('#serviceOfferNotification')?.remove();const config=serviceOfferConfig(),context=serviceOfferContext();if(!serviceOfferCanShow(config,context))return;SERVICE_OFFER_TIMER=setTimeout(showServiceOfferNotification,config.delay_seconds*1000);}
let QUOTE_STATE={version:1,updated_at:'',items:[],lead:{name_company:'',name:'',company:'',email:'',whatsapp:'',timeline:'',details:''}};
let QUOTE_EVENTS_BOUND=false,QUOTE_PENDING_SOURCE=null;
function serviceSelectionKey(category,item){return `${category.id}:${item.id}`;}
function serviceSelectionRecord(key){for(const category of visibleServiceCategories()){for(const item of visibleServiceItems(category)){if(serviceSelectionKey(category,item)===key)return {category,item,key};}}return null;}
function quoteEnabled(){return servicesConfig().quote_enabled!==false;}
function quoteStateVersion(){return Math.max(1,Number(servicesConfig().quote_state_version||1));}
function quoteServiceRecord(serviceId=''){return visibleServiceRecords().find(({item})=>String(item.id||'')===String(serviceId||''))||null;}
function quoteProjectRecord(projectId=''){const id=String(projectId||'').trim();if(!id)return null;return (DATA.projects||[]).find((project)=>project&&!project.hidden&&[project.project_id,project.id,project.gallery_id].some((value)=>value!=null&&String(value).trim()!==''&&String(value).trim()===id))||null;}
const COMMERCIAL_SOURCE_TYPES=new Set(['home','project','project_cta','service','services','services_catalog','service_offer','category','custom','quote_suggestion','manual']);
function normalizeCommercialSourceUrl(value=''){const raw=String(value||'').trim().slice(0,1400);if(!raw)return '';if(raw.startsWith('/')&&!raw.startsWith('//'))return raw;try{const url=new URL(raw,location.href);return ['http:','https:','file:'].includes(url.protocol)?url.href.slice(0,1400):'';}catch(_){return '';}}
function commercialSourceContext({serviceId='',referenceProjectId='',sourceType='',sourceUrl=''}={}){const project=quoteProjectRecord(referenceProjectId),service=quoteServiceRecord(serviceId),page=serviceOfferContext();let type=COMMERCIAL_SOURCE_TYPES.has(String(sourceType||''))?String(sourceType):'';if(!type){if(project)type='project';else if(page.pageType==='service')type='service';else if(page.pageType==='services')type='services';else if(page.pageType==='category')type='category';else if(page.pageType==='custom')type='custom';else type='home';}const projectId=project?String(project.project_id||project.id||project.gallery_id||'').trim():'';const serviceRecord=service||(page.service?quoteServiceRecord(page.service.id):null);return {type,url:normalizeCommercialSourceUrl(sourceUrl||location.href),project_id:projectId,service_id:String(serviceRecord?.item?.id||serviceId||'').trim()};}
function resolveCommercialSource(line={},record=null){const project=quoteProjectRecord(line.source_project_id||line.reference_project_id),service=quoteServiceRecord(line.source_service_id||line.service_id)||record;return {type:COMMERCIAL_SOURCE_TYPES.has(String(line.source_type||''))?String(line.source_type):'',url:normalizeCommercialSourceUrl(line.source_url||''),project_id:String(project?.project_id||project?.id||project?.gallery_id||''),project_title:String(project?.title||project?.gallery_title||''),service_id:String(service?.item?.id||line.service_id||''),service_title:String(service?.item?.title||'')};}
function quotePackageRecord(item={},packageId=''){return (Array.isArray(item.packages)?item.packages:[]).find((row)=>String(row.id||'')===String(packageId||''))||null;}
function newQuoteLineId(){return `q-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;}
function normalizeQuoteState(raw={}){const state={version:quoteStateVersion(),updated_at:String(raw?.updated_at||''),items:[],lead:{name_company:'',name:'',company:'',email:'',whatsapp:'',timeline:'',details:''}};const lead=raw?.lead&&typeof raw.lead==='object'?raw.lead:{};Object.keys(state.lead).forEach((field)=>state.lead[field]=String(lead[field]||'').slice(0,2000));if(!state.lead.name_company)state.lead.name_company=[state.lead.name,state.lead.company].filter(Boolean).join(' / ');const merged=new Map();(Array.isArray(raw?.items)?raw.items:[]).forEach((source)=>{if(!source||typeof source!=='object')return;const record=quoteServiceRecord(source.service_id);if(!record)return;let packageId=String(source.package_id||'');if(packageId&&!quotePackageRecord(record.item,packageId))packageId='';const referenceRecord=quoteProjectRecord(source.reference_project_id);const reference=referenceRecord?String(referenceRecord.project_id||referenceRecord.id||'').trim():'';const sourceProject=quoteProjectRecord(source.source_project_id||reference),sourceService=quoteServiceRecord(source.source_service_id||record.item.id),sourceType=COMMERCIAL_SOURCE_TYPES.has(String(source.source_type||''))?String(source.source_type):(reference?'project':''),sourceUrl=normalizeCommercialSourceUrl(source.source_url||'');const mergeKey=`${record.item.id}|${packageId}|${reference}`;const quantity=Math.max(1,Math.min(99,Number(source.quantity)||1));if(merged.has(mergeKey)){const current=merged.get(mergeKey);current.quantity=Math.min(99,current.quantity+quantity);if(!current.source_type&&sourceType)current.source_type=sourceType;if(!current.source_url&&sourceUrl)current.source_url=sourceUrl;return;}const row={id:String(source.id||newQuoteLineId()),service_id:String(record.item.id),package_id:packageId,quantity,note:String(source.note||'').slice(0,1200),reference_project_id:reference,source_type:sourceType,source_url:sourceUrl,source_project_id:String(sourceProject?.project_id||sourceProject?.id||sourceProject?.gallery_id||reference||''),source_service_id:String(sourceService?.item?.id||record.item.id||'')};merged.set(mergeKey,row);state.items.push(row);});return state;}
function loadQuoteState(){let raw={};try{raw=JSON.parse(localStorage.getItem(QUOTE_STORAGE_KEY)||'{}')||{};}catch(_){raw={};}QUOTE_STATE=normalizeQuoteState(raw);return QUOTE_STATE;}
function saveQuoteState(){QUOTE_STATE.version=quoteStateVersion();QUOTE_STATE.updated_at=new Date().toISOString();try{localStorage.setItem(QUOTE_STORAGE_KEY,JSON.stringify(QUOTE_STATE));}catch(_){}updateServiceQuoteUI();return QUOTE_STATE;}
function persistQuoteStateQuiet(){QUOTE_STATE.version=quoteStateVersion();QUOTE_STATE.updated_at=new Date().toISOString();try{localStorage.setItem(QUOTE_STORAGE_KEY,JSON.stringify(QUOTE_STATE));}catch(_){}return QUOTE_STATE;}
function quoteResolvedItems(){return QUOTE_STATE.items.map((line)=>{const record=quoteServiceRecord(line.service_id);if(!record)return null;return {...record,line,package:quotePackageRecord(record.item,line.package_id),reference:quoteProjectRecord(line.reference_project_id),source:resolveCommercialSource(line,record)};}).filter(Boolean);}
function quoteSuggestedServices(limit=3){const selected=new Set(QUOTE_STATE.items.map((line)=>String(line.service_id||''))),records=visibleServiceRecords(),byId=new Map(records.map((record)=>[String(record.item.id||''),record])),out=[],used=new Set(selected);const add=(record)=>{const id=String(record?.item?.id||'');if(!id||used.has(id)||out.length>=limit)return;used.add(id);out.push(record);};quoteResolvedItems().forEach(({item})=>(Array.isArray(item.recommended_service_ids)?item.recommended_service_ids:[]).forEach((id)=>add(byId.get(String(id)))));quoteResolvedItems().forEach(({category})=>records.filter((record)=>String(record.category.id)===String(category.id)&&record.item.featured).forEach(add));quoteResolvedItems().forEach(({category})=>records.filter((record)=>String(record.category.id)===String(category.id)).forEach(add));records.filter((record)=>record.item.featured).forEach(add);return out.slice(0,limit);}
function renderQuoteSuggestions(){const root=$('#globalQuoteSuggestions');if(!root)return;const rows=quoteSuggestedServices();root.hidden=!rows.length||!QUOTE_STATE.items.length;root.innerHTML=root.hidden?'':`<div class="quote-suggestions-head"><small>COMBINA BEM COM O SEU PEDIDO</small><strong>Complete o projeto, se fizer sentido</strong><span>Nada é adicionado automaticamente.</span></div><div class="quote-suggestion-list">${rows.map(({category,item})=>`<article><div><small>${esc(category.short_title||category.title||'Serviço')}</small><strong>${esc(item.title||'Serviço')}</strong><span>${esc(servicePrice(item))}</span></div><button type="button" data-quote-suggestion-add="${esc(item.id)}">+ Adicionar</button></article>`).join('')}</div>`;}
function addQuoteItem(serviceId,{packageId='',referenceProjectId='',open=true,sourceContext=null}={}){if(!quoteEnabled())return false;const record=quoteServiceRecord(serviceId);if(!record)return false;const pending=sourceContext&&typeof sourceContext==='object'?sourceContext:(QUOTE_PENDING_SOURCE||{}),requestedProject=String(referenceProjectId||pending.project_id||''),safePackage=packageId&&quotePackageRecord(record.item,packageId)?String(packageId):'';const referenceRecord=quoteProjectRecord(requestedProject),safeReference=referenceRecord?String(referenceRecord.project_id||referenceRecord.id||'').trim():'';const source=commercialSourceContext({serviceId:String(pending.service_id||record.item.id),referenceProjectId:String(pending.project_id||safeReference),sourceType:String(pending.type||''),sourceUrl:String(pending.url||'')});const existing=QUOTE_STATE.items.find((line)=>String(line.service_id)===String(record.item.id)&&String(line.package_id||'')===safePackage&&String(line.reference_project_id||'')===safeReference);if(existing){existing.quantity=Math.min(99,Number(existing.quantity||1)+1);if(!existing.source_type)existing.source_type=source.type;if(!existing.source_url)existing.source_url=source.url;if(!existing.source_project_id)existing.source_project_id=source.project_id;if(!existing.source_service_id)existing.source_service_id=source.service_id;}else QUOTE_STATE.items.push({id:newQuoteLineId(),service_id:String(record.item.id),package_id:safePackage,quantity:1,note:'',reference_project_id:safeReference,source_type:source.type,source_url:source.url,source_project_id:source.project_id,source_service_id:source.service_id||String(record.item.id)});saveQuoteState();if(open)openQuotePanel({sourceContext:source});return true;}
function removeQuoteItem(id){QUOTE_STATE.items=QUOTE_STATE.items.filter((line)=>String(line.id)!==String(id));saveQuoteState();}
function clearQuote(){QUOTE_PENDING_SOURCE=null;QUOTE_STATE={version:quoteStateVersion(),updated_at:'',items:[],lead:{name_company:'',name:'',company:'',email:'',whatsapp:'',timeline:'',details:''}};saveQuoteState();}
function quoteMoney(value){return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:Number.isInteger(Number(value))?0:2}).format(Number(value||0));}
function quotePriceSource(item={},packageRow=null){const source=packageRow||item;const type=['from','fixed','quote'].includes(source?.price_type)?source.price_type:'from';const value=Number(source?.price||0);return {type,value,known:type!=='quote'&&value>0,unit:String(source?.unit||item.unit||'')};}
function quoteLinePriceLabel(item={},packageRow=null,quantity=1){const price=quotePriceSource(item,packageRow);if(!price.known)return 'Sob consulta';const total=price.value*Math.max(1,Number(quantity)||1);return `${price.type==='from'?'A partir de ':''}${quoteMoney(total)}`;}
function quoteSummary(){let total=0,known=0,unknown=0,hasFrom=false;quoteResolvedItems().forEach(({item,package:pkg,line})=>{const price=quotePriceSource(item,pkg);if(!price.known){unknown++;return;}known++;if(price.type==='from')hasFrom=true;total+=price.value*Math.max(1,Number(line.quantity)||1);});if(!known&&unknown)return {label:'Sob consulta',total:0,unknown,hasFrom:false};if(!known)return {label:'Sem itens com valor calculável',total:0,unknown,hasFrom:false};let label=`${hasFrom?'A partir de ':'Estimativa: '}${quoteMoney(total)}`;if(unknown)label=`Estimativa parcial: ${hasFrom?'a partir de ':''}${quoteMoney(total)} + ${unknown} ${unknown===1?'item sob consulta':'itens sob consulta'}`;return {label,total,unknown,hasFrom};}
function servicePublicMedia(mediaId){
if(!mediaId)return null;const target=String(mediaId);let found=null;
const visit=(value)=>{if(found||!value)return;if(Array.isArray(value)){value.forEach(visit);return;}if(typeof value!=='object')return;if(String(value.id||'')===target&&['image','video'].includes(String(value.type||''))){found=value;return;}Object.values(value).forEach(visit);};
visit(DATA.hero_assets||{});visit(DATA.projects||[]);visit(DATA.galleries||{});return found;
}
function resolvedServiceCategoryMedia(category={}){return servicePublicMedia(category.cover_media_id);}
function serviceCategoryVisualSettings(category={},node=null){const fit=['cover','contain'].includes(category.cover_fit)?category.cover_fit:'cover',x=Math.max(0,Math.min(100,Number(category.cover_position_x??50))),y=Math.max(0,Math.min(100,Number(category.cover_position_y??50))),overlay=Math.max(0,Math.min(.85,Number(category.overlay_strength??.38))),align=['left','center','right'].includes(category.text_alignment)?category.text_alignment:'left',height=['compact','medium','large'].includes(category.visual_height)?category.visual_height:'large';if(node){node.style.setProperty('--service-cover-fit',fit);node.style.setProperty('--service-cover-x',`${x}%`);node.style.setProperty('--service-cover-y',`${y}%`);node.style.setProperty('--service-cover-overlay',String(overlay));node.dataset.visualHeight=height;node.dataset.textAlign=align;}return {fit,x,y,overlay,align,height,show:category.show_cover!==false};}
function serviceCategoryVisual(category){const visual=document.createElement('div');visual.className='service-category-visual';visual.style.setProperty('--service-accent',category.accent||'var(--accent)');const settings=serviceCategoryVisualSettings(category,visual),media=settings.show?resolvedServiceCategoryMedia(category):null;if(!media){visual.classList.add('is-abstract');visual.innerHTML=`<span>${esc(category.number||'')}</span><i></i>`;return visual;}if(media.type==='video'){const posterNode=imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[]),media.preview_url,...(media.preview_candidates||[])],{lazy:true,upgradeUrls:[media.preview_url,...(media.preview_candidates||[])]});posterNode.classList?.add('service-video-poster');visual.append(posterNode);const video=createResilientVideo(media,{autoplay:true,muted:true,loop:true,controls:false,preload:'none',className:'service-category-preview-video',defer:true,metadataReady:false,timeoutMs:45000,exhausted:()=>{video.remove();}});visual.append(video);bindDeferredAutoplay(video,visual);}else visual.append(imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[]),media.preview_url,...(media.preview_candidates||[]),media.media_url,...(media.media_candidates||[])],{lazy:true,upgradeUrls:[media.preview_url,...(media.preview_candidates||[]),media.media_url,...(media.media_candidates||[])]}));return visual;}
function serviceCategoryCard(category,index){
const config=servicesConfig(),article=document.createElement('article');article.className='service-area-card reveal';article.style.setProperty('--service-accent',category.accent||'var(--accent)');article.id=`service-${category.id}`;serviceCategoryVisualSettings(category,article);
const visual=serviceCategoryVisual(category),copy=document.createElement('div');copy.className='service-area-copy';const meta=document.createElement('div');meta.className='service-area-meta';meta.innerHTML=`<span>${esc(category.number||String(index+1).padStart(2,'0'))}</span><small>${visibleServiceItems(category).length} opções</small>`;
const title=document.createElement('h2');title.textContent=category.title||'Serviço';const description=document.createElement('p');description.textContent=category.description||'';const list=document.createElement('div');list.className='service-price-list';
visibleServiceItems(category).forEach((item)=>{const key=serviceSelectionKey(category,item),row=document.createElement('article');row.className=`service-price-card${item.featured?' featured':''}`;row.dataset.serviceKey=key;row.dataset.serviceFeatured=item.featured?'1':'0';row.dataset.serviceSearch=[category.title,category.short_title,item.title,item.description,item.unit,...(item.deliverables||[])].filter(Boolean).join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();if(item.page_enabled!==false){row.dataset.serviceDetailHref=serviceDetailHref(item);row.tabIndex=0;row.setAttribute('role','link');}const head=document.createElement('div'),itemTitle=document.createElement('h3');itemTitle.textContent=item.title||'Serviço';const price=document.createElement('strong');price.textContent=servicePrice(item);head.append(itemTitle,price);const body=document.createElement('p');body.textContent=item.description||'';const facts=document.createElement('div');facts.className='service-facts';if(item.unit){const unit=document.createElement('span');unit.textContent=item.unit;facts.append(unit);}if(config.show_deadlines!==false&&item.deadline){const deadline=document.createElement('span');deadline.textContent=item.deadline;facts.append(deadline);}if(config.show_revisions!==false){const revisions=document.createElement('span');revisions.textContent=`${Number(item.revisions||0)} ${Number(item.revisions||0)===1?'revisão':'revisões'}`;facts.append(revisions);}const deliverables=document.createElement('ul');if(config.show_deliverables!==false)(item.deliverables||[]).forEach((value)=>{const li=document.createElement('li');li.textContent=value;deliverables.append(li);});
const actions=document.createElement('div');actions.className='service-item-actions-public';if(item.page_enabled!==false){const details=document.createElement('a');details.className='service-item-details';details.href=serviceDetailHref(item);details.textContent='Ver detalhes ↗';actions.append(details);if(quoteEnabled()){const select=document.createElement('button');select.type='button';select.className='service-item-select';select.dataset.serviceSelect=key;select.textContent=config.quote_item_action_label||'Adicionar ao orçamento';actions.append(select);}}else if(quoteEnabled()){const select=document.createElement('button');select.type='button';select.className='service-item-select';select.dataset.serviceSelect=key;select.textContent=config.quote_item_action_label||'Adicionar ao orçamento';actions.append(select);}else{const direct=document.createElement('a');direct.className='service-item-direct service-item-primary-whatsapp';direct.href=serviceWhatsappHref(category,item);direct.target='_blank';direct.rel='noopener';direct.textContent=item.cta_label||config.cta_label||'Solicitar orçamento';actions.append(direct);}row.append(head,body,facts);if(deliverables.children.length)row.append(deliverables);row.append(actions);list.append(row);
});
copy.append(meta,title,description,list);article.append(visual,copy);return article;
}
function serviceProcessSection(){const config=servicesConfig(),steps=(Array.isArray(config.process_steps)?config.process_steps:[]).filter(Boolean);if(config.process_visible===false||!steps.length)return null;const section=document.createElement('section');section.className='services-process reveal';const copy=document.createElement('div');copy.innerHTML=`<small>PROCESSO</small><h2>${esc(config.process_title||'Um processo claro do briefing à entrega')}</h2><p>${esc(config.process_body||'')}</p>`;const list=document.createElement('ol');steps.forEach((step,index)=>{const item=document.createElement('li');item.innerHTML=`<span>${String(index+1).padStart(2,'0')}</span><strong>${esc(step)}</strong>`;list.append(item);});section.append(copy,list);return section;}
function quoteLeadFromDom(){const map={name_company:'quoteLeadNameCompany',email:'quoteLeadEmail',whatsapp:'quoteLeadWhatsapp',timeline:'quoteLeadTimeline',details:'quoteLeadDetails'};Object.entries(map).forEach(([field,id])=>{const node=document.getElementById(id);if(node)QUOTE_STATE.lead[field]=String(node.value||'').slice(0,2000);});QUOTE_STATE.lead.name=QUOTE_STATE.lead.name_company;QUOTE_STATE.lead.company='';}
function serviceQuoteMessage(){quoteLeadFromDom();const config=servicesConfig(),summary=quoteSummary(),records=quoteResolvedItems();const lines=[];records.forEach(({category,item,line,package:pkg,reference,source},index)=>{const price=quoteLinePriceLabel(item,pkg,line.quantity),deadline=String(pkg?.deadline||item.deadline||''),revisions=pkg?.revisions==null?Number(item.revisions||0):Number(pkg.revisions||0);lines.push(`${index+1}. ${category.title} — ${item.title}`);if(pkg)lines.push(`Pacote: ${pkg.label}`);lines.push(`Quantidade: ${Math.max(1,Number(line.quantity)||1)}`);if(config.quote_show_estimate!==false)lines.push(`Investimento: ${price}`);if(config.quote_show_deadline!==false&&deadline)lines.push(`Prazo indicado: ${deadline}`);if(config.quote_show_revisions!==false)lines.push(`Revisões: ${revisions}`);if(reference)lines.push(`Referência: ${reference.title||'Projeto do portfólio'}`);if(source?.url&&/^https?:/i.test(source.url))lines.push(`Link de origem: ${source.url}`);if(line.note)lines.push(`Observação: ${line.note}`);lines.push('');});const lead=QUOTE_STATE.lead||{};return [config.quote_whatsapp_intro||config.whatsapp_message||'Olá! Gostaria de solicitar um orçamento.',records.length?`SERVIÇOS\n\n${lines.join('\n').trim()}`:'SERVIÇOS\n\nPreciso de orientação para escolher os serviços.',config.quote_show_estimate!==false&&records.length?`RESUMO\n${summary.label}`:'',lead.name_company?`Nome ou marca / empresa: ${lead.name_company}`:'',lead.email?`E-mail: ${lead.email}`:'',lead.whatsapp?`WhatsApp para retorno: ${lead.whatsapp}`:'',lead.timeline?`Prazo desejado: ${lead.timeline}`:'',lead.details?`Meu projeto:\n${lead.details}`:''].filter(Boolean).join('\n\n');}
function quotePanelMarkup(){const config=servicesConfig(),control=floatingControlsFor(DATA.site_builder||{},DATA.site_builder?.navigation||{}).quote;return `<div class="global-quote-backdrop" id="globalQuoteBackdrop" hidden data-quote-close></div><aside class="global-quote-panel" id="globalQuotePanel" aria-hidden="true" aria-label="${esc(config.quote_title||'Seu orçamento')}"><header><div><small>ORÇAMENTO</small><h2>${esc(config.quote_title||'Seu orçamento')}</h2><p>${esc(config.quote_intro||'')}</p></div><button type="button" data-quote-close aria-label="Fechar">×</button></header><div class="global-quote-scroll"><div id="globalQuoteItems" class="global-quote-items"></div><div id="globalQuoteSummary" class="global-quote-summary"></div><section id="globalQuoteSuggestions" class="global-quote-suggestions" hidden></section><div class="global-quote-lead"><label class="wide">Nome ou marca / empresa<input id="quoteLeadNameCompany" autocomplete="name" placeholder="Seu nome, marca ou empresa"></label><label>E-mail<input id="quoteLeadEmail" type="email" autocomplete="email" placeholder="voce@empresa.com"></label><label>WhatsApp para retorno<input id="quoteLeadWhatsapp" type="tel" autocomplete="tel" placeholder="(00) 00000-0000"></label><label>Prazo desejado<input id="quoteLeadTimeline" placeholder="Ex.: ainda este mês"></label><label class="wide">Conte um pouco sobre o projeto<textarea id="quoteLeadDetails" rows="4" placeholder="Objetivo, formatos, quantidade, referências e o que já está pronto"></textarea></label></div></div><footer><button type="button" class="quote-clear" data-quote-clear>Limpar</button><button type="button" class="quote-send" data-quote-send>${esc(config.quote_finish_label||'Finalizar pelo WhatsApp')}</button></footer></aside><button type="button" class="global-quote-dock site-floating-control" id="globalQuoteDock" data-floating-control="quote" data-quote-open aria-label="${esc(control.label||'Orçamento')}"><i class="quote-dock-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M3.5 4.5h2l1.8 9.1h9.9l2-6.4H7.1M9.2 18.5a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Zm7 0a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></i><span data-quote-label>${esc(control.label||'Orçamento')}</span><strong data-quote-count>0</strong></button>`;}
function ensureGlobalQuoteUI(){document.body.classList.remove('quote-panel-open');document.querySelectorAll('#globalQuotePanel,#globalQuoteBackdrop,#globalQuoteDock').forEach((node)=>node.remove());if(!quoteEnabled())return;const shell=document.createElement('div');shell.id='studioframeQuoteUi';shell.innerHTML=quotePanelMarkup();while(shell.firstChild)document.body.append(shell.firstChild);applyFloatingControls(DATA.site_builder||{},DATA.site_builder?.navigation||{});renderGlobalQuotePanel();renderQuoteSuggestions();bindQuoteEvents();}
function hydrateQuoteContactFields(){const lead=QUOTE_STATE.lead||{};[['quoteLeadEmail','email'],['quoteLeadWhatsapp','whatsapp']].forEach(([id,field])=>{const node=document.getElementById(id);if(node&&document.activeElement!==node)node.value=lead[field]||'';});}
function openQuotePanel({sourceContext=null}={}){if(!quoteEnabled())return;if(sourceContext&&typeof sourceContext==='object')QUOTE_PENDING_SOURCE=commercialSourceContext({serviceId:sourceContext.service_id||'',referenceProjectId:sourceContext.project_id||'',sourceType:sourceContext.type||'',sourceUrl:sourceContext.url||''});ensureQuoteUiIfMissing();const panel=$('#globalQuotePanel'),backdrop=$('#globalQuoteBackdrop');if(!panel)return;renderGlobalQuotePanel();renderQuoteSuggestions();hydrateQuoteContactFields();panel.classList.add('is-open');panel.setAttribute('aria-hidden','false');if(backdrop)backdrop.hidden=false;document.body.classList.add('quote-panel-open');}
function closeQuotePanel(){const panel=$('#globalQuotePanel'),backdrop=$('#globalQuoteBackdrop');panel?.classList.remove('is-open');panel?.setAttribute('aria-hidden','true');if(backdrop)backdrop.hidden=true;document.body.classList.remove('quote-panel-open');QUOTE_PENDING_SOURCE=null;}
function ensureQuoteUiIfMissing(){if(quoteEnabled()&&!$('#globalQuotePanel'))ensureGlobalQuoteUI();}
function renderGlobalQuotePanel(){const list=$('#globalQuoteItems'),summaryNode=$('#globalQuoteSummary');const config=servicesConfig(),records=quoteResolvedItems();if(list){if(!records.length)list.innerHTML='<div class="global-quote-empty"><strong>Seu orçamento está vazio.</strong><span>Adicione serviços e continue navegando pelo site.</span></div>';else list.innerHTML=records.map(({category,item,line,package:pkg,reference})=>{const packages=Array.isArray(item.packages)?item.packages:[];const packageSelect=packages.length?`<label>Pacote/opção<select data-quote-package="${esc(line.id)}"><option value="">Padrão do serviço</option>${packages.map((row)=>`<option value="${esc(row.id)}" ${String(row.id)===String(line.package_id)?'selected':''}>${esc(row.label)} · ${esc(quoteLinePriceLabel(row,null,1))}</option>`).join('')}</select></label>`:'';const ref=reference?`<span class="quote-reference">Referência: ${esc(reference.title||'Projeto do portfólio')}</span>`:'';const price=config.quote_show_estimate!==false?`<strong data-quote-line-price="${esc(line.id)}">${esc(quoteLinePriceLabel(item,pkg,line.quantity))}</strong>`:'';const deadline=String(pkg?.deadline||item.deadline||''),revisions=pkg?.revisions==null?Number(item.revisions||0):Number(pkg.revisions||0),meta=[config.quote_show_deadline!==false&&deadline?deadline:'',config.quote_show_revisions!==false?`${revisions} ${revisions===1?'revisão':'revisões'}`:''].filter(Boolean).join(' · ');return `<article class="global-quote-item" data-quote-line="${esc(line.id)}"><div class="quote-item-head"><div class="quote-item-copy"><small>${esc(category.short_title||category.title)}</small><h3>${esc(item.title)}</h3>${ref}</div><div class="quote-item-actions">${price}<button type="button" data-quote-remove="${esc(line.id)}" aria-label="Remover">×</button></div></div>${meta?`<p class="quote-item-meta">${esc(meta)}</p>`:''}<div class="quote-item-controls">${packageSelect}<label>Quantidade<input type="number" min="1" max="99" value="${Math.max(1,Number(line.quantity)||1)}" data-quote-quantity="${esc(line.id)}"></label><label class="wide">Observação<textarea rows="2" data-quote-note="${esc(line.id)}" placeholder="Detalhes específicos deste item">${esc(line.note||'')}</textarea></label></div></article>`;}).join('');}if(summaryNode){const summary=quoteSummary();summaryNode.hidden=config.quote_show_estimate===false||!records.length;summaryNode.innerHTML=summaryNode.hidden?'':`<small>ESTIMATIVA</small><strong>${esc(summary.label)}</strong><span>Valor final depende da confirmação do escopo.</span>`;}const lead=QUOTE_STATE.lead||{};[['quoteLeadNameCompany','name_company'],['quoteLeadTimeline','timeline'],['quoteLeadDetails','details']].forEach(([id,field])=>{const node=document.getElementById(id);if(node&&document.activeElement!==node)node.value=lead[field]||'';});const dock=$('#globalQuoteDock');if(dock){const control=floatingControlsFor(DATA.site_builder||{},DATA.site_builder?.navigation||{}).quote;dock.hidden=!quoteEnabled()||control.visible===false;const label=dock.querySelector('[data-quote-label]');if(label)label.textContent=control.label||'Orçamento';const icon=dock.querySelector('.quote-dock-icon');if(icon)icon.hidden=control.show_icon===false;const count=QUOTE_STATE.items.reduce((total,line)=>total+Math.max(1,Number(line.quantity)||1),0);dock.querySelector('[data-quote-count]').textContent=String(count);dock.classList.toggle('has-items',count>0);requestAnimationFrame(layoutFloatingControls);}document.querySelectorAll('[data-service-select]').forEach((button)=>{const record=serviceSelectionRecord(button.dataset.serviceSelect);const selected=record&&QUOTE_STATE.items.some((line)=>String(line.service_id)===String(record.item.id));button.classList.toggle('selected',Boolean(selected));button.textContent=selected?'Adicionado ✓':(config.quote_item_action_label||'Adicionar ao orçamento');});document.querySelectorAll('[data-quote-inline-count]').forEach((node)=>{const count=QUOTE_STATE.items.length;node.textContent=`${count} ${count===1?'serviço no orçamento':'serviços no orçamento'}`;});}
function refreshQuoteComputedUi(lineId=''){const config=servicesConfig(),records=quoteResolvedItems();if(lineId&&config.quote_show_estimate!==false){const resolved=records.find(({line})=>String(line.id)===String(lineId)),priceNode=document.querySelector(`[data-quote-line-price="${CSS.escape(String(lineId))}"]`);if(resolved&&priceNode)priceNode.textContent=quoteLinePriceLabel(resolved.item,resolved.package,resolved.line.quantity);}const summaryNode=$('#globalQuoteSummary');if(summaryNode){const summary=quoteSummary();summaryNode.hidden=config.quote_show_estimate===false||!records.length;summaryNode.innerHTML=summaryNode.hidden?'':`<small>ESTIMATIVA</small><strong>${esc(summary.label)}</strong><span>Valor final depende da confirmação do escopo.</span>`;}const dock=$('#globalQuoteDock');if(dock){const count=QUOTE_STATE.items.reduce((total,line)=>total+Math.max(1,Number(line.quantity)||1),0);dock.querySelector('[data-quote-count]').textContent=String(count);dock.classList.toggle('has-items',count>0);}document.querySelectorAll('[data-quote-inline-count]').forEach((node)=>{const count=QUOTE_STATE.items.length;node.textContent=`${count} ${count===1?'serviço no orçamento':'serviços no orçamento'}`;});}
function updateServiceQuoteUI(){ensureQuoteUiIfMissing();renderGlobalQuotePanel();renderQuoteSuggestions();}
function serviceQuoteBuilder(){const config=servicesConfig();if(config.brief_visible===false||config.quote_enabled===false)return null;const section=document.createElement('section');section.className='services-quote-builder reveal';section.id='service-brief';section.dataset.budgetLayout='split';section.setAttribute('aria-labelledby','serviceBriefTitle');section.innerHTML=`<div class="services-quote-intro"><small>ORÇAMENTO</small><h2 id="serviceBriefTitle">${esc(config.brief_title||'Monte sua solicitação de orçamento')}</h2><p>${esc(config.brief_body||'')}</p><span>${esc(config.response_note||'')}</span></div><div class="services-quote-form services-quote-integrated"><strong data-quote-inline-count>0 serviços no orçamento</strong><p>As escolhas ficam salvas neste navegador enquanto você visita serviços, cases e outras páginas.</p><button class="service-quote-send" type="button" data-quote-open>${esc(config.brief_button||config.quote_title||'Abrir orçamento')}</button><small>Nenhum dado é enviado antes de você finalizar pelo WhatsApp.</small></div>`;return section;}
function bindQuoteEvents(){if(QUOTE_EVENTS_BOUND)return;QUOTE_EVENTS_BOUND=true;document.addEventListener('click',(event)=>{const suggestion=event.target.closest('[data-quote-suggestion-add]');if(suggestion){addQuoteItem(suggestion.dataset.quoteSuggestionAdd,{open:false,sourceContext:{type:'quote_suggestion',url:location.href}});return;}const select=event.target.closest('[data-service-select]');if(select){const record=serviceSelectionRecord(select.dataset.serviceSelect);if(record)addQuoteItem(record.item.id,{open:false,sourceContext:{type:isServicesPage()?'services_catalog':'service',service_id:record.item.id,url:location.href}});return;}const add=event.target.closest('[data-quote-add-service]');if(add){addQuoteItem(add.dataset.quoteAddService,{packageId:add.dataset.quotePackageId||'',open:true,sourceContext:{type:currentServiceDetail()?'service':'services',service_id:add.dataset.quoteAddService,url:location.href}});return;}const similar=event.target.closest('[data-quote-similar]');if(similar){addQuoteItem(similar.dataset.quoteSimilar,{referenceProjectId:similar.dataset.quoteProjectId||'',open:true,sourceContext:{type:'project_cta',project_id:similar.dataset.quoteProjectId||'',service_id:similar.dataset.quoteSimilar||'',url:location.href}});return;}const openTrigger=event.target.closest('[data-quote-open],[data-service-open-brief]');if(openTrigger){const projectId=openTrigger.dataset.quoteProjectContext||'';openQuotePanel(projectId?{sourceContext:{type:'project_cta',project_id:projectId,url:location.href}}:{});return;}if(event.target.closest('[data-quote-close]')){closeQuotePanel();return;}const remove=event.target.closest('[data-quote-remove]');if(remove){removeQuoteItem(remove.dataset.quoteRemove);return;}if(event.target.closest('[data-quote-clear]')){clearQuote();return;}if(event.target.closest('[data-quote-send]')){if(!QUOTE_STATE.items.length){openQuotePanel();return;}finishQuoteRequest();return;}});document.addEventListener('input',(event)=>{const lineId=event.target.dataset?.quoteQuantity||event.target.dataset?.quoteNote||'';if(lineId){const line=QUOTE_STATE.items.find((row)=>String(row.id)===String(lineId));if(!line)return;if(event.target.dataset.quoteQuantity){line.quantity=Math.max(1,Math.min(99,Number(event.target.value)||1));persistQuoteStateQuiet();refreshQuoteComputedUi(line.id);return;}if(event.target.dataset.quoteNote!==undefined){line.note=String(event.target.value||'').slice(0,1200);persistQuoteStateQuiet();return;}}const leadMap={quoteLeadNameCompany:'name_company',quoteLeadEmail:'email',quoteLeadWhatsapp:'whatsapp',quoteLeadTimeline:'timeline',quoteLeadDetails:'details'};const field=leadMap[event.target.id];if(field){QUOTE_STATE.lead[field]=String(event.target.value||'').slice(0,2000);if(field==='name_company'){QUOTE_STATE.lead.name=QUOTE_STATE.lead.name_company;QUOTE_STATE.lead.company='';}try{localStorage.setItem(QUOTE_STORAGE_KEY,JSON.stringify({...QUOTE_STATE,updated_at:new Date().toISOString()}));}catch(_){}}});document.addEventListener('change',(event)=>{const packageId=event.target.dataset?.quotePackage;const quantityId=event.target.dataset?.quoteQuantity;if(quantityId){const line=QUOTE_STATE.items.find((row)=>String(row.id)===String(quantityId));if(line){line.quantity=Math.max(1,Math.min(99,Number(event.target.value)||1));saveQuoteState();}return;}if(!packageId)return;const line=QUOTE_STATE.items.find((row)=>String(row.id)===String(packageId));if(!line)return;const record=quoteServiceRecord(line.service_id);line.package_id=record&&quotePackageRecord(record.item,event.target.value)?event.target.value:'';saveQuoteState();});addEventListener('keydown',(event)=>{if(event.key==='Escape'&&$('#globalQuotePanel')?.classList.contains('is-open'))closeQuotePanel();});}
let SERVICE_CATALOG_NAV_BOUND=false;
function bindServiceCatalogNavigation(){if(SERVICE_CATALOG_NAV_BOUND)return;SERVICE_CATALOG_NAV_BOUND=true;const go=(event)=>{const card=event.target.closest?.('.service-price-card[data-service-detail-href]');if(!card)return;if(event.target.closest('a,button,input,select,textarea,label'))return;if(event.type==='keydown'&&!['Enter',' '].includes(event.key))return;if(event.type==='keydown')event.preventDefault();location.href=card.dataset.serviceDetailHref;};document.addEventListener('click',go);document.addEventListener('keydown',go);}
function bindServiceCommerce(){bindQuoteEvents();bindServiceCatalogNavigation();updateServiceQuoteUI();}
function servicePageBlocks(category,item){
const config=servicesConfig(),slug=canonicalRouteSlug(item?.id||item?.title||'servico');const source=Array.isArray(item?.blocks)?item.blocks:[{id:`${slug}-hero`,type:'service_hero',visible:true},{id:`${slug}-overview`,type:'text',visible:true,eyebrow:'Sobre o serviço'},{id:`${slug}-benefits`,type:'service_benefits',visible:true,eyebrow:'Benefícios',title:'Por que este serviço',items:[]},{id:`${slug}-deliverables`,type:'service_deliverables',visible:true,eyebrow:'Entregáveis',title:'O que está incluído',items:[]},{id:`${slug}-pricing`,type:'service_pricing',visible:true,eyebrow:'Investimento',title:'Escopo comercial'},{id:`${slug}-process`,type:'process',visible:true,eyebrow:'Processo',title:'Como o projeto acontece'},{id:`${slug}-cases`,type:'related_projects',visible:Array.isArray(item.related_projects)&&item.related_projects.length>0,eyebrow:'Cases',title:'Projetos relacionados',items:item.related_projects||[],columns:'3',max_items:6,card_style:'editorial',show_category:true},{id:`${slug}-cta`,type:'cta',visible:true,eyebrow:'Vamos conversar',title:'Pronto para começar?',body:'Conte o que você precisa e receba uma proposta adequada ao projeto.'}];
return source.filter(Boolean).map((raw)=>{const block=normalizeSharedPublicBlock(raw);if(block.type==='text'){block.title=block.title||item.title||'Serviço';block.body=block.body||item.description||item.page_intro||'';}if(block.type==='process'&&!String(block.body||'').trim()){block.body=(Array.isArray(raw.items)&&raw.items.length?raw.items:(item.process_steps?.length?item.process_steps:config.process_steps||[])).filter(Boolean).map((value)=>`${value} |`).join('\n');}if(block.type==='accordion'&&!String(block.body||'').trim()){block.body=(raw.items||item.faq||[]).map((row)=>typeof row==='object'?`${row.question||''} | ${row.answer||''}`:String(row||'')).join('\n');}return block;}).sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}
function serviceBlockFrame(node,block){applySharedPageBlockFrame(node,block);node.classList.add('service-commercial-section','reveal');node.dataset.serviceBlockId=block.id||'';node.dataset.serviceBlockType=block.type||'';return node;}
function serviceBlockHeading(block,defaults={}){const wrap=document.createElement('div');wrap.className='service-commercial-heading';const eyebrow=document.createElement('small');eyebrow.textContent=block.eyebrow||defaults.eyebrow||'';const title=document.createElement('h2');title.textContent=block.title||defaults.title||'';const body=document.createElement('p');body.textContent=block.body||defaults.body||'';if(eyebrow.textContent)wrap.append(eyebrow);if(title.textContent)wrap.append(title);if(body.textContent)wrap.append(body);return wrap;}
function serviceMediaNode(media,{hero=false}={}){if(!media)return null;if(media.type==='video'){const wrap=document.createElement('div');wrap.className='service-commercial-media-wrap';const poster=imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[])],{lazy:!hero,priority:hero?'high':'auto'});poster.classList?.add('service-video-poster');wrap.append(poster);const video=createResilientVideo(media,{autoplay:true,muted:true,loop:true,controls:false,preload:hero?'metadata':'none',className:'service-commercial-video',defer:!hero,metadataReady:false,timeoutMs:45000,exhausted:()=>{video.remove();}});wrap.append(video);if(!hero)bindDeferredAutoplay(video,wrap);return wrap;}return imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[]),media.media_url,...(media.media_candidates||[])],{lazy:!hero,priority:hero?'high':'auto',upgradeUrls:[media.media_url,...(media.media_candidates||[])]});}
const PUBLIC_SERVICE_BLOCK_REGISTRY=Object.freeze({service_hero:true,service_benefits:true,service_deliverables:true,service_pricing:true});
function createServiceCommercialBlock(category,item,block){
if(!block||block.visible===false)return null;block=normalizeSharedPublicBlock(block);const config=servicesConfig();
const shared=createSharedPageBlock(block,{defaultTitle:'Pronto para começar?',defaultButtonUrl:serviceWhatsappHref(category,item),defaultButtonLabel:block.button_label||item.cta_label||config.cta_label||'Solicitar orçamento',quoteServiceId:String(item.id||''),mediaResolver:servicePublicMedia,mediaNode:(media)=>serviceMediaNode(media)});
if(shared){serviceBlockFrame(shared,block);shared.classList.add('service-commercial-shared');return shared;}
if(!PUBLIC_SERVICE_BLOCK_REGISTRY[block.type])return null;
let node=document.createElement('section');serviceBlockFrame(node,block);
if(block.type==='service_hero'){node.classList.add('service-detail-hero');const visual=document.createElement('div');visual.className='service-detail-visual';serviceCategoryVisualSettings(category,visual);const media=servicePublicMedia(block.media_id||item.cover_media_id||category.cover_media_id),mediaNode=serviceMediaNode(media,{hero:true});if(mediaNode)visual.append(mediaNode);else visual.innerHTML=`<span>${esc(category.number||'')}</span><i></i>`;const copy=document.createElement('div');copy.className='service-detail-copy';const back=document.createElement('a');back.className='service-detail-back';back.href=servicesHref(`#service-${category.id}`);back.textContent='← Voltar para serviços';const eyebrow=document.createElement('small');eyebrow.textContent=block.eyebrow||item.page_eyebrow||category.short_title||category.title||'Serviço';const title=document.createElement('h1');title.textContent=block.title||item.page_title||item.title||'Serviço';const intro=document.createElement('p');intro.textContent=block.body||item.page_intro||item.description||'';const price=document.createElement('strong');price.className='service-detail-price';price.textContent=servicePrice(item);copy.append(back,eyebrow,title,intro,price);const facts=document.createElement('div');facts.className='service-detail-facts';if(item.unit)facts.innerHTML+=`<div><small>UNIDADE</small><strong>${esc(item.unit)}</strong></div>`;if(config.show_deadlines!==false&&item.deadline)facts.innerHTML+=`<div><small>PRAZO</small><strong>${esc(item.deadline)}</strong></div>`;if(config.show_revisions!==false)facts.innerHTML+=`<div><small>REVISÕES</small><strong>${Number(item.revisions||0)}</strong></div>`;copy.append(facts);const actions=document.createElement('div');actions.className='service-detail-actions';let primary;if(quoteEnabled()){primary=document.createElement('button');primary.type='button';primary.dataset.quoteAddService=String(item.id||'');primary.textContent=item.cta_label||config.quote_item_action_label||'Adicionar ao orçamento';}else{primary=document.createElement('a');primary.href=serviceWhatsappHref(category,item);primary.target='_blank';primary.rel='noopener';primary.textContent=item.cta_label||config.cta_label||'Solicitar orçamento';}const catalog=document.createElement('a');catalog.href=servicesHref(`#service-${category.id}`);catalog.textContent='Ver catálogo completo';actions.append(primary,catalog);copy.append(actions);node.append(visual,copy);return node;}
if(block.type==='service_benefits'||block.type==='service_deliverables'){const source=Array.isArray(block.items)&&block.items.length?block.items:(block.type==='service_benefits'?(item.benefits?.length?item.benefits:item.deliverables||[]):item.deliverables||[]);node.classList.add('service-commercial-list');node.append(serviceBlockHeading(block,{eyebrow:block.type==='service_benefits'?'Benefícios':'Entregáveis',title:block.type==='service_benefits'?'Por que este serviço':'O que está incluído'}));const list=document.createElement('ul');source.filter(Boolean).forEach((value)=>{const li=document.createElement('li');li.textContent=value;list.append(li);});if(list.children.length)node.append(list);return node;}
if(block.type==='service_pricing'){node.classList.add('service-commercial-pricing');node.append(serviceBlockHeading(block,{eyebrow:'Investimento',title:'Escopo comercial'}));const packages=Array.isArray(item.packages)?item.packages.filter(Boolean):[];if(packages.length){const packageGrid=document.createElement('div');packageGrid.className='service-package-grid';packages.forEach((pkg,index)=>{const card=document.createElement('article');card.className='service-package-card';const price=quoteLinePriceLabel(item,pkg,1),deadline=String(pkg.deadline||item.deadline||''),revisions=pkg.revisions==null?Number(item.revisions||0):Number(pkg.revisions||0);card.innerHTML=`<small>${String(index+1).padStart(2,'0')}</small><h3>${esc(pkg.label||'Pacote')}</h3><strong>${esc(price)}</strong>${pkg.description?`<p>${esc(pkg.description)}</p>`:''}<div class="service-package-meta">${pkg.unit||item.unit?`<span>${esc(pkg.unit||item.unit)}</span>`:''}${config.show_deadlines!==false&&deadline?`<span>${esc(deadline)}</span>`:''}${config.show_revisions!==false?`<span>${revisions} ${revisions===1?'revisão':'revisões'}</span>`:''}</div>`;const deliverables=document.createElement('ul');(pkg.deliverables||[]).forEach((value)=>{const li=document.createElement('li');li.textContent=value;deliverables.append(li);});if(deliverables.children.length)card.append(deliverables);let action;if(quoteEnabled()){action=document.createElement('button');action.type='button';action.dataset.quoteAddService=String(item.id||'');action.dataset.quotePackageId=String(pkg.id||'');action.textContent=config.quote_item_action_label||'Adicionar ao orçamento';}else{action=document.createElement('a');action.href=serviceWhatsappHref(category,item,`Pacote: ${pkg.label||''}`);action.target='_blank';action.rel='noopener';action.textContent=item.cta_label||config.cta_label||'Solicitar orçamento';}action.className='service-package-action';card.append(action);packageGrid.append(card);});node.append(packageGrid);return node;}const grid=document.createElement('div');grid.className='service-commercial-facts';grid.innerHTML=`<article><small>INVESTIMENTO</small><strong>${esc(servicePrice(item))}</strong></article>${item.unit?`<article><small>UNIDADE</small><strong>${esc(item.unit)}</strong></article>`:''}${config.show_deadlines!==false&&item.deadline?`<article><small>PRAZO</small><strong>${esc(item.deadline)}</strong></article>`:''}${config.show_revisions!==false?`<article><small>REVISÕES</small><strong>${Number(item.revisions||0)}</strong></article>`:''}`;node.append(grid);return node;}
return null;
}
function renderServiceDetailPage(category,item){$('#filters')?.setAttribute('hidden','');
const root=$('#customPageRoot'),main=$('#top');if(!root||!main)return;['hero','introBlock','lettering','projectsBlock','about','contact'].forEach((id)=>{const node=$('#'+id);if(node)node.hidden=true;});root.hidden=false;root.replaceChildren();root.className='service-detail-page service-commercial-page';root.style.setProperty('--service-accent',category?.accent||'var(--accent)');document.body.dataset.page='service-detail';document.title=`${item.page_title||item.title||'Serviço'} | ${DATA.identity?.studio_name||'Mensagem Studio'}`;
const blocks=servicePageBlocks(category,item);blocks.forEach((block)=>{const node=createServiceCommercialBlock(category,item,block);if(node)root.append(node);});
const next=visibleServiceRecords().filter(({item:other})=>other.page_enabled!==false&&String(other.id)!==String(item.id)).slice(0,3);if(next.length){const related=document.createElement('section');related.className='service-detail-related reveal';related.innerHTML='<small>OUTRAS SOLUÇÕES</small><h2>Serviços que podem complementar o projeto</h2>';const grid=document.createElement('div');next.forEach(({category:cat,item:other})=>{const a=document.createElement('a');a.href=serviceDetailHref(other);a.innerHTML=`<span>${esc(cat.short_title||cat.title||'Serviço')}</span><strong>${esc(other.title||'Serviço')}</strong><i>↗</i>`;grid.append(a);});related.append(grid);root.append(related);}bindReveal();tick();
}
function serviceCatalogTools(){const tools=document.createElement('section');tools.className='services-catalog-tools';tools.setAttribute('aria-label','Busca e filtros do catálogo de serviços');tools.innerHTML=`<label class="services-catalog-search"><span>BUSCAR SERVIÇOS</span><span class="services-catalog-search-field"><i aria-hidden="true">⌕</i><input type="search" data-service-catalog-search placeholder="Pesquise vídeo, branding, campanha…" autocomplete="off"></span></label><div class="services-catalog-modes" role="group" aria-label="Filtro do catálogo"><button type="button" class="is-active" aria-pressed="true" data-service-catalog-mode="all">Todos</button><button type="button" aria-pressed="false" data-service-catalog-mode="featured">Mais procurados</button></div><strong class="services-catalog-result" data-service-catalog-result aria-live="polite"></strong>`;return tools;}
function bindServiceCatalogFilters(root){const search=root.querySelector('[data-service-catalog-search]'),buttons=[...root.querySelectorAll('[data-service-catalog-mode]')],result=root.querySelector('[data-service-catalog-result]');if(!search)return;let mode='all';const apply=()=>{const rawQuery=String(search.value||'').trim(),query=rawQuery.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();let visible=0;root.querySelectorAll('.service-area-card').forEach((category)=>{let categoryVisible=0;category.querySelectorAll('.service-price-card').forEach((card)=>{const matchText=!query||String(card.dataset.serviceSearch||'').includes(query),matchMode=mode!=='featured'||card.dataset.serviceFeatured==='1',show=matchText&&matchMode;card.hidden=!show;if(show){visible+=1;categoryVisible+=1;}});category.hidden=categoryVisible===0;});if(result)result.textContent=rawQuery?`${visible} ${visible===1?'serviço encontrado':'serviços encontrados'} para “${rawQuery}”`:`${visible} ${visible===1?'serviço encontrado':'serviços encontrados'}`;};search.addEventListener('input',apply);buttons.forEach((button)=>button.addEventListener('click',()=>{mode=button.dataset.serviceCatalogMode||'all';buttons.forEach((candidate)=>{const active=candidate===button;candidate.classList.toggle('is-active',active);candidate.setAttribute('aria-pressed',active?'true':'false');});apply();}));apply();}
function renderServicesPage(){$('#filters')?.setAttribute('hidden','');
const config=servicesConfig(),root=$('#customPageRoot'),main=$('#top');if(!root||!main)return;['hero','introBlock','lettering','projectsBlock','about','contact'].forEach((id)=>{const node=$('#'+id);if(node)node.hidden=true;});root.hidden=false;root.replaceChildren();root.className='services-public-page';root.dataset.serviceLayout=config.layout_style||'editorial';root.dataset.catalogDensity=config.catalog_density||'comfortable';root.dataset.coverRatio=config.cover_ratio||'portrait';document.body.dataset.page='services';document.title=`${config.title||'Serviços'} | ${DATA.identity?.studio_name||'Mensagem Studio'}`;
const categories=visibleServiceCategories(),options=categories.reduce((total,category)=>total+visibleServiceItems(category).length,0),head=document.createElement('section');head.className='services-public-head reveal';const headCopy=document.createElement('div');const eyebrow=document.createElement('small');eyebrow.textContent=config.eyebrow||'Soluções criativas';const title=document.createElement('h1');title.textContent=config.title||'Serviços profissionais';const intro=document.createElement('p');intro.textContent=config.intro||'';const actions=document.createElement('div');actions.className='services-head-actions';const useQuote=quoteEnabled()&&config.brief_visible!==false,primary=document.createElement(useQuote?'button':'a');if(useQuote){primary.type='button';primary.dataset.serviceOpenBrief='';primary.textContent=config.brief_button||'Abrir orçamento';}else{primary.href=serviceWhatsappHref(null,null);primary.target='_blank';primary.rel='noopener';primary.textContent=config.cta_label||'Solicitar orçamento';}const note=document.createElement('span');note.textContent=config.response_note||'';actions.append(primary,note);headCopy.append(eyebrow,title,intro,actions);const stats=document.createElement('dl');stats.className='services-head-stats';stats.innerHTML=`<div><dt>${categories.length}</dt><dd>áreas criativas</dd></div><div><dt>${options}</dt><dd>soluções comerciais</dd></div><div><dt>BR</dt><dd>atendimento remoto</dd></div>`;head.append(headCopy,stats);root.append(head);
const nav=document.createElement('nav');nav.className='services-jump-nav horizontal-context-nav';nav.setAttribute('aria-label','Áreas de serviços');visibleServiceCategories().forEach((category)=>{const a=document.createElement('a');a.href=`#service-${category.id}`;a.textContent=category.short_title||category.title;nav.append(a);});root.append(nav,serviceCatalogTools());
const grid=document.createElement('div');grid.className='services-category-stack';visibleServiceCategories().forEach((category,index)=>grid.append(serviceCategoryCard(category,index)));root.append(grid);
const process=serviceProcessSection();if(process)root.append(process);
if(config.price_note){const note=document.createElement('p');note.className='services-price-note';note.textContent=config.price_note;root.append(note);}
const quote=serviceQuoteBuilder();if(quote)root.append(quote);
const cta=document.createElement('section');cta.className='services-final-cta reveal';const ctaCopy=document.createElement('div');const ctaTitle=document.createElement('h2');ctaTitle.textContent=config.cta_title||'Vamos construir algo relevante?';const ctaBody=document.createElement('p');ctaBody.textContent=config.cta_body||'';ctaCopy.append(ctaTitle,ctaBody);const link=document.createElement('a');link.href=serviceWhatsappHref(null,null);link.target='_blank';link.rel='noopener';link.textContent=config.cta_label||'Solicitar orçamento';cta.append(ctaCopy,link);root.append(cta);bindServiceCatalogFilters(root);bindReveal();tick();
bindServiceCommerce(root);updateServiceQuoteUI();
}
function renderServicesHome(){
const config=servicesConfig();document.querySelector('#servicesOverview')?.remove();if(config.visible===false||config.show_on_home===false)return;const categories=visibleServiceCategories();if(!categories.length)return;const section=document.createElement('section');section.id='servicesOverview';section.className='services-home-section reveal';const head=document.createElement('div');head.className='services-home-head';const copy=document.createElement('div');const eyebrow=document.createElement('small');eyebrow.textContent=config.eyebrow||'Serviços';const title=document.createElement('h2');title.textContent=config.home_title||config.title||'Serviços profissionais';const intro=document.createElement('p');intro.textContent=config.home_intro||config.intro||'';copy.append(eyebrow,title,intro);const link=document.createElement('a');link.href=servicesHref();link.textContent='Ver serviços e valores';head.append(copy,link);section.append(head);const grid=document.createElement('div');grid.className='services-home-grid';categories.forEach((category,index)=>{const card=document.createElement('a');card.href=servicesHref(`#service-${category.id}`);card.className='service-home-card';card.style.setProperty('--service-accent',category.accent||'var(--accent)');const visualSettings=serviceCategoryVisualSettings(category,card),media=visualSettings.show?resolvedServiceCategoryMedia(category):null;if(media){card.classList.add('has-cover');const visual=document.createElement('span');visual.className='service-home-card-visual';serviceCategoryVisualSettings(category,visual);visual.style.setProperty('--service-cover-overlay',String(Math.max(.52,visualSettings.overlay)));if(media.type==='video'){const posterNode=imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[]),media.preview_url,...(media.preview_candidates||[])],{lazy:true,upgradeUrls:[media.preview_url,...(media.preview_candidates||[])]});posterNode.classList?.add('service-video-poster');visual.append(posterNode);const video=createResilientVideo(media,{autoplay:true,muted:true,loop:true,controls:false,preload:'none',className:'service-home-preview-video',defer:true,metadataReady:false,timeoutMs:45000,exhausted:()=>{video.remove();}});visual.append(video);bindDeferredAutoplay(video,card);}else visual.append(imageWithFallback(media,[media.thumbnail_url,...(media.thumbnail_candidates||[]),media.media_url,...(media.media_candidates||[])],{lazy:true,upgradeUrls:[media.media_url,...(media.media_candidates||[])]}));card.append(visual);}const number=document.createElement('span');number.textContent=category.number||String(index+1).padStart(2,'0');const name=document.createElement('strong');name.textContent=category.title||'Serviço';const body=document.createElement('p');body.textContent=category.description||'';const arrow=document.createElement('i');arrow.textContent='↗';card.append(number,name,body,arrow);grid.append(card);});section.append(grid);const before=$('#about')||$('#contact')||null;(before?.parentNode||$('#top'))?.insertBefore(section,before);bindReveal();placeHomeHorizontalNavigation();
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
const menuItems=publicMenuItems('side');
const depthFor=(item)=>{let depth=0,parent=item.parent_id,seen=new Set();while(parent&&!seen.has(parent)){seen.add(parent);const p=menuItems.find((x)=>x.id===parent);if(!p)break;depth+=1;parent=p.parent_id;}return depth;};
menuItems.forEach((item)=>{
const button=document.createElement('button');button.type='button';button.className='side-menu-link';button.style.setProperty('--menu-depth',String(depthFor(item)));button.innerHTML=`<span>${esc(item.label||'Página')}</span><b>↗</b>`;button.dataset.target=publicRouteHref(item.target||'#');if(item.filter_id)button.dataset.filterId=String(item.filter_id);button.dataset.menuItemId=String(item.id||'');root.append(button);
});
}
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
if (!blocks.some((block) => String(block.id || '') === projectsId)) blocks.push({ id:projectsId, type:'section_projects', visible:true, core:true, grid_columns:'2', card_ratio:'16x9' });
return {
...source,
enabled: source.enabled !== false,
header_visible: source.header_visible !== false,
eyebrow: Object.prototype.hasOwnProperty.call(source,'eyebrow') ? String(source.eyebrow??'') : 'Categoria',
title: Object.prototype.hasOwnProperty.call(source,'title') ? String(source.title??'') : String(section.title||'Categoria'),
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
if(page.header_visible===false || (!String(page.eyebrow||'').trim() && !String(page.title||'').trim() && !String(page.body||'').trim())) return null;
const eyebrow = document.createElement('small'); eyebrow.textContent = String(page.eyebrow||''); eyebrow.hidden=!eyebrow.textContent.trim();
const count = document.createElement('span'); const total = projectsForSection(sectionId).length; count.textContent = `${total} ${total === 1 ? 'projeto' : 'projetos'}`;
meta.append(eyebrow, count);
const title = document.createElement('h2'); title.textContent = String(page.title||''); title.hidden=!title.textContent.trim(); title.dataset.parallaxText='14';
node.append(meta, title);
if (page.body) { const body=document.createElement('p'); body.textContent=page.body; node.append(body); }
return node;
}
function createSectionProjectsBlock(sectionId, block = {}) {
const node = document.createElement('section');
node.className = `section-page-projects reveal sf-grid-cols-${block.grid_columns || '3'} sf-card-ratio-${block.card_ratio || '4x3'} sf-grid-gap-${block.grid_gap || 'normal'}`;
const list = projectsForSection(sectionId);
const grid = document.createElement('div'); grid.className = 'grid section-page-grid';
list.forEach((project, index) => grid.append(card(project, index)));
if (!list.length) { const empty=document.createElement('div'); empty.className='empty'; empty.textContent='Nenhum projeto publicável nesta categoria.'; node.append(empty); }
else node.append(grid);
applyHomeSectionFrame(node,block);
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
setupSectionNavigator((DATA.site_builder||{}).section_navigator||{});
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
const next = id === 'all' ? `${location.pathname}${location.search}` : `#section=${encodeURIComponent(id)}`;
const current = id === 'all' ? `${location.pathname}${location.search}${location.hash}` : location.hash;
if ((id === 'all' && !location.hash) || (id !== 'all' && location.hash === next)) return;
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
function canonicalPortfolioCategories() {
const sectionRows = Array.isArray(DATA.sections) ? DATA.sections.filter((item) => item && item.kind !== 'collection') : [];
const depthOneRows = Array.isArray(DATA.navigation_nodes)
? DATA.navigation_nodes.filter((item) => item && Number(item.depth || 0) === 1 && !item.hidden)
: [];
const structural = [...sectionRows, ...depthOneRows];
const configured = Array.isArray(DATA.filters) ? DATA.filters : [];
const filterMeta = new Map(configured.filter((item) => String(item?.id || '') !== 'all').map((item, index) => [String(item.id), {...item, _filter_index:index}]));
const editorOrder = Array.isArray(DATA.site_builder?.projects?.filters?.order) ? DATA.site_builder.projects.filters.order.map(String) : [];
const editorRank = new Map(editorOrder.map((id,index)=>[String(id),index]));
const seen = new Set();
const categories = [];
structural.forEach((section, structuralIndex) => {
const id = String(section?.id || '');
if (!id || id === 'all' || seen.has(id)) return;
seen.add(id);
const meta = filterMeta.get(id) || {};
if (section.navigation_visible === false || meta.navigation_visible === false) return;
const explicitRank = editorRank.has(id) ? Number(editorRank.get(id)) : 999999;
const filterRank = Number.isFinite(Number(meta._filter_index)) ? Number(meta._filter_index) : 999999;
categories.push({
id,
title: meta.title || section.title || section.name || 'Categoria',
kind: 'section',
order: Number.isFinite(Number(section.order)) ? Number(section.order) : structuralIndex,
_editor_rank: explicitRank,
_filter_index: filterRank,
});
});
categories.sort((a,b) => (a._editor_rank-b._editor_rank) || (a._filter_index-b._filter_index) || (a.order-b.order) || String(a.title).localeCompare(String(b.title),'pt-BR'));
return categories.map(({_editor_rank,_filter_index,...item}) => item);
}
function publicPortfolioFilterItems() {
const filterCfg = DATA.site_builder?.projects?.filters || {};
const configured = Array.isArray(DATA.filters) ? DATA.filters : [];
const configuredAll = configured.find((item) => String(item?.id || '') === 'all');
const items = [];
if (filterCfg.all_visible !== false) items.push({id:'all', title:configuredAll?.title || filterCfg.all_label || 'Todos', kind:'all'});
items.push(...canonicalPortfolioCategories());
return items;
}
function renderFilters() {
const filters = $('#filters');
if (!filters) return;
filters.replaceChildren();
publicPortfolioFilterItems().forEach((item) => filters.append(filterButton(item.title || (item.id === 'all' ? 'Todos' : 'Categoria'), item.id)));
appendServicesNavigationLink(filters);
placeHomeHorizontalNavigation();
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
document.body.dataset.portfolioScope = isAll ? 'overview' : 'collection';
const navigation = isAll ? (DATA.navigation_nodes || []).filter((node) => !node.hidden && Number(node.depth || 0) === 1) : [];
const list = isAll ? [] : (DATA.projects || []).filter((project) => {
if (project.hidden) return false;
const sectionId = project.section_id || project.physical_category_id || project.category_id;
return String(sectionId) === String(id);
});
const grid = $('#grid');
const empty = $('#empty');
const heading = $('#portfolioHeading');
const headingBlock = publicHomeBlocks().find((block)=>block.type==='projects_header');
if (heading) heading.hidden = !isAll || DATA.site_builder?.projects?.visible === false || headingBlock?.visible === false || !String(headingBlock?.eyebrow||headingBlock?.title||headingBlock?.body||'').trim();
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
setupSectionNavigator((DATA.site_builder||{}).section_navigator||{});
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
if (!candidates.length) return;
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
probe.dataset.quality = 'full';
probe.style.cssText = image.style.cssText;
image.replaceWith(probe);
};
probe.onerror = () => { markMediaUrlFailed(url); tryNext(); };
probe.src = url;
};
tryNext();
};
if (image.loading === 'eager') setTimeout(upgrade, 80);
else if ('requestIdleCallback' in window) requestIdleCallback(upgrade, { timeout: 1200 });
else setTimeout(upgrade, 180);
}
function imageWithFallback(project, urls, { lazy = true, priority = 'auto', timeoutMs = MEDIA_LOAD_TIMEOUT_MS, upgradeUrls = [] } = {}) {
const allCandidates = uniqueUrls(urls);
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
if (upgradeUrls.length) queueImageUpgrade(image, upgradeUrls);
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
const thumbnails = uniqueUrls([cover.thumbnail_url, ...(cover.thumbnail_candidates || [])]);
const imageUpgrades = cover.type === 'image'
? uniqueUrls([cover.preview_url, ...(cover.preview_candidates || []), cover.media_url, ...(cover.media_candidates || [])])
: uniqueUrls([...(cover.thumbnail_candidates || [])]);
const primary = thumbnails.length ? thumbnails : (cover.type === 'image' ? imageUpgrades : []);
return imageWithFallback(cover, primary, {
lazy: !eager, priority: eager ? 'high' : 'auto', timeoutMs: eager ? 6500 : MEDIA_LOAD_TIMEOUT_MS,
upgradeUrls: imageUpgrades,
});
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
hero_autoplay: media.type === 'video' && slideConfig.autoplay !== false,
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
heroSoundEnabled = false;
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
ensureHeroSoundControl(heroConfig);
activateHero(0, false);
if (!reduced && heroProjects.length > 1) scheduleHero();
}
const HERO_MOBILE_QUERY = matchMedia('(max-width:700px)');
const HERO_LOCAL_CLIPS = Object.freeze({
'1IhoKnfLR9pOTQn-GtIupUCUEttX3y8ej':'/assets/hero/dermacast-laila.mp4',
'1PBHrpBqzc1FLXhZ9Hox1NRO9SIPYkndr':'/assets/hero/corte-03.mp4',
});
function updateHeroSoundControl() {
const button=$('#heroSoundToggle');if(!button)return;
const activeAsset=heroProjects[heroIndex]?heroAssetForViewport(heroProjects[heroIndex]):null;
button.hidden=button.dataset.soundAllowed==='false'||activeAsset?.type!=='video';
button.dataset.soundEnabled=heroSoundEnabled?'true':'false';
button.dataset.mediaMuted=heroSoundEnabled?'false':'true';
button.setAttribute('aria-pressed',heroSoundEnabled?'true':'false');
button.setAttribute('aria-label',heroSoundEnabled?'Desativar áudio do banner':'Ativar áudio do banner');
const label=button.querySelector('span');if(label)label.textContent=heroSoundEnabled?'Som ligado':'Ativar som';
requestAnimationFrame(positionHeroSoundControl);
}
async function setHeroSoundEnabled(next,{resumeAmbient=true}={}) {
const slide=document.querySelector('.hero-slide.is-active'),video=slide?.querySelector('video');
if(!slide||!video){heroSoundEnabled=false;updateHeroSoundControl();return false;}
ensureVideoSource(video);
if(!next){video.muted=true;video.defaultMuted=true;video.setAttribute('muted','');heroSoundEnabled=false;if(resumeAmbient)siteAudioHandleMediaStop(video);updateHeroSoundControl();return true;}
if(SITE_AUDIO.playing){SITE_AUDIO.resumeAfterMedia=SITE_AUDIO.userWantsPlaying;SITE_AUDIO.policyPause=true;pauseAmbientAudio(false);}
video.defaultMuted=false;video.removeAttribute('muted');video.muted=false;video.volume=1;
try{await video.play();heroSoundEnabled=video.muted===false;if(heroSoundEnabled)siteAudioHandleMediaStart(video);}
catch(_error){heroSoundEnabled=false;video.muted=true;video.defaultMuted=true;video.setAttribute('muted','');}
updateHeroSoundControl();return heroSoundEnabled;
}
function positionHeroSoundControl() {
const hero=$('#hero'),button=$('#heroSoundToggle');if(!hero||!button||button.hidden)return;
const heroRect=hero.getBoundingClientRect(),buttonRect=button.getBoundingClientRect();
let right=Math.max(16,innerWidth*.04),bottom=Math.max(18,Math.min(44,innerHeight*.04));
const obstacles=['#heroOpen','.hero-pagination','.scroll-cue','.hero-copy','.section-navigator'].map((selector)=>document.querySelector(selector)).filter((node)=>node&&node!==button&&!node.hidden&&getComputedStyle(node).display!=='none');
const candidate=()=>({left:heroRect.right-right-buttonRect.width,right:heroRect.right-right,top:heroRect.bottom-bottom-buttonRect.height,bottom:heroRect.bottom-bottom});
obstacles.forEach((node)=>{const a=candidate(),b=node.getBoundingClientRect(),overlap=a.left<b.right+12&&a.right>b.left-12&&a.top<b.bottom+12&&a.bottom>b.top-12;if(overlap)bottom=Math.max(bottom,heroRect.bottom-b.top+12);});
const safeTop=Math.max(heroRect.top+12,Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'))+12||84);
if(candidate().top<safeTop){bottom=Math.max(18,Math.min(44,innerHeight*.04));right=Math.max(right,heroRect.right-Math.max(heroRect.left+16,(obstacles.find((node)=>node.matches?.('#heroOpen'))?.getBoundingClientRect().left||heroRect.right))+16);}
button.style.setProperty('--hero-sound-right',`${Math.round(right)}px`);button.style.setProperty('--hero-sound-bottom',`${Math.round(bottom)}px`);
}
function ensureHeroSoundControl(heroConfig={}) {
const hero=$('#hero');if(!hero)return null;
let button=$('#heroSoundToggle');
if(!button){button=document.createElement('button');button.id='heroSoundToggle';button.type='button';button.className='hero-sound-toggle';button.innerHTML='<b aria-hidden="true"></b><span>Ativar som</span>';hero.append(button);button.addEventListener('click',()=>setHeroSoundEnabled(!heroSoundEnabled));}
if(!window.__studioframeHeroSoundLayoutBound){window.__studioframeHeroSoundLayoutBound=1;addEventListener('resize',()=>requestAnimationFrame(positionHeroSoundControl),{passive:true});window.visualViewport?.addEventListener?.('resize',()=>requestAnimationFrame(positionHeroSoundControl),{passive:true});}
button.dataset.soundAllowed=heroConfig.sound_control_visible===false?'false':'true';
updateHeroSoundControl();return button;
}
function heroAssetForViewport(project) {
const asset = HERO_MOBILE_QUERY.matches && project?._hero_mobile_asset ? project._hero_mobile_asset : project?.hero_asset;
const resolved=asset && asset.type ? { ...project, ...asset, title: project.title } : heroAsset(project);
const localClip=resolved?.type==='video'?HERO_LOCAL_CLIPS[String(resolved.id||'')]:'';
if(!localClip)return resolved;
return {...resolved,media_url:localClip,media_candidates:[localClip,...(resolved.media_candidates||[]).filter((url)=>url!==localClip)],preview_url:localClip,preview_candidates:[localClip,...(resolved.preview_candidates||[]).filter((url)=>url!==localClip)]};
}
function ensureHeroMedia(slide, project) {
const variant = HERO_MOBILE_QUERY.matches && project?._hero_mobile_asset ? 'mobile' : 'web';
if (slide.dataset.loadedVariant === variant && slide.childElementCount) return;
slide.dataset.loadedVariant = variant;
slide.replaceChildren();
project = heroAssetForViewport(project);
if (project.type === 'video' && project.hero_autoplay && (project.media_url || (project.media_candidates || []).length)) {
const video=createResilientVideo(project,{autoplay:true,muted:true,loop:true,controls:false,preload:'auto',className:'hero-native-video',timeoutMs:30000,metadataReady:false,exhausted:()=>{
if(!video.isConnected)return;
const fallback=imageWithFallback(project,heroCandidates(project),{lazy:false,priority:'high',upgradeUrls:heroUpgradeCandidates(project)});
fallback.classList?.add('hero-video-poster-fallback');video.replaceWith(fallback);slide.dataset.heroVideoFallback='poster-muted';
}});
video.defaultMuted=true;video.muted=true;video.setAttribute('muted','');video.setAttribute('aria-label',project.title?`Vídeo do banner: ${project.title}`:'Vídeo do banner');
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
if (isActive) {video.muted=!heroSoundEnabled;if(heroSoundEnabled){video.defaultMuted=false;video.removeAttribute('muted');}video.play().catch(() => {if(heroSoundEnabled)setHeroSoundEnabled(false);});}
else {video.pause();video.muted=true;}
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
updateHeroSoundControl();
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
function bindCardVideoPreview(button, video, item = {}) {
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
requested = true;
if (mountCardDrivePreview(button,item)) return;
if (video.dataset.failed === '1') { mountCardDrivePreview(button,item); return; }
ensureVideoSource(video);
revealWhenReady();
};
const stop = () => {
requested = false;
video.classList.remove('is-previewing');
video.pause();
try { video.currentTime = 0; } catch (_) {}
unmountCardDrivePreview(button);
};
video.addEventListener('loadeddata', revealWhenReady);
video.addEventListener('canplay', revealWhenReady);
video.addEventListener('playing', revealWhenReady);
video.addEventListener('error', () => video.classList.remove('is-previewing'));
video.addEventListener('studioframe:video-exhausted', () => { if (requested) mountCardDrivePreview(button,item); });
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
const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => entry.isIntersecting && entry.intersectionRatio >= .62 ? start() : stop());
}, { threshold:[0,.62,.85] });
observer.observe(button);
}
const COVER_RATIOS = { '4x3':'4 / 3', '16x9':'16 / 9', '21x9':'21 / 9', '1x1':'1 / 1', '4x5':'4 / 5' };
function applyProjectCoverGeometry(project, media, image) {
const ratio = COVER_RATIOS[String(project?.cover_ratio || '')];
const intrinsicWidth = Number(project?.width || 0);
const intrinsicHeight = Number(project?.height || 0);
const isExtremePortrait = !ratio && intrinsicWidth > 0 && intrinsicHeight > 0 && intrinsicWidth / intrinsicHeight < .7;
if (ratio && media) media.style.aspectRatio = ratio;
else if (isExtremePortrait && media) {
media.style.aspectRatio = '3 / 4';
media.dataset.coverGeometry = 'portrait-contained';
}
if (media) media.style.background = project?.cover_bg || '#121212';
if (image?.style) {
image.style.objectFit = project?.cover_fit === 'contain' || isExtremePortrait ? 'contain' : 'cover';
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
const typeLabel = project.gallery_count > 1
? `${project.gallery_count} mídias`
: ({ video: 'Vídeo', pdf: 'PDF' }[project.type] || '');
const type = typeLabel ? document.createElement('span') : null;
if (type) {
type.className = 'type';
type.textContent = typeLabel;
}
const action = document.createElement('span');
action.className = 'media-action';
action.innerHTML = `<span>${esc(project.editorial_action_label || 'Explorar')}</span><b>↗</b>`;
const cardPoster = poster(project, { eager: index < 6 });
cardPoster.classList?.add('card-poster');
applyProjectCoverGeometry(project, media, cardPoster);
mediaInner.append(cardPoster);
let previewVideo = null;
const previewSources = videoSourceCandidates(project);
if (project.type === 'video' && !project.hosted_video_chunked && previewSources.length && visualLayout.card_video_preview !== false) {
previewVideo = createResilientVideo(project, { autoplay:false, muted:true, loop:true, controls:false, preload:'none', className:'card-preview-video', defer:true, metadataReady:false, timeoutMs:8000 });
previewVideo.setAttribute('aria-hidden', 'true');
mediaInner.append(previewVideo);
}
media.append(mediaInner);
if (type) media.append(type);
media.append(action);
const copy = document.createElement('span');
copy.className = 'copy';
if (Number(project.title_size || 0) > 0) copy.style.setProperty('--project-card-title-size', `${Math.max(14,Math.min(48,Number(project.title_size)))}px`);
if (Number(project.description_size || 0) > 0) copy.style.setProperty('--project-card-description-size', `${Math.max(9,Math.min(24,Number(project.description_size)))}px`);
copy.innerHTML = `<span><h3>${esc(project.title)}</h3><p>${esc(project.description || project.path?.join(' · ') || '')}</p></span><em>${String(index + 1).padStart(2, '0')}</em>`;
button.append(media, copy);
bindCardInteraction(button, media, mediaInner);
bindCardVideoPreview(button, previewVideo, project);
button.addEventListener('click', () => {
const actionUrl=safeEditorialActionUrl(project.editorial_action_url);
if(actionUrl){
if(/^https?:/i.test(actionUrl)){window.open(actionUrl,'_blank','noopener,noreferrer');return;}
window.location.href=actionUrl;return;
}
if(onOpen)onOpen(project);else openProjectDetail(project);
});
return button;
}
function projectMediaUrls(item) {
const cover = projectCoverRecord(item);
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
if (item?.type === 'video') return projectVideoFallback(item);
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
function mediaGeometry(item = {}, video = null) {
const configured = String(item.viewer_orientation || item.orientation || 'auto').toLowerCase();
const metadata = item.metadata || item.media_metadata || item.dimensions || {};
const width = Number(video?.videoWidth || item.width || item.video_width || item.media_width || metadata.width || 0);
const height = Number(video?.videoHeight || item.height || item.video_height || item.media_height || metadata.height || 0);
let orientation = ['portrait', 'landscape', 'square'].includes(configured) ? configured : 'landscape';
if (width > 0 && height > 0 && configured === 'auto') {
if (height > width * 1.08) orientation = 'portrait';
else if (width > height * 1.08) orientation = 'landscape';
else orientation = 'square';
}
const fallback = orientation === 'portrait' ? [9, 16] : orientation === 'square' ? [1, 1] : [16, 9];
const resolvedWidth = width > 0 ? width : fallback[0];
const resolvedHeight = height > 0 ? height : fallback[1];
return { orientation, width: resolvedWidth, height: resolvedHeight, ratio: resolvedWidth / resolvedHeight };
}
function mediaOrientation(item = {}, video = null) {
return mediaGeometry(item, video).orientation;
}
function applyMediaGeometry(target, item = {}, video = null) {
if (!target) return mediaGeometry(item, video);
const geometry = mediaGeometry(item, video);
target.dataset.mediaOrientation = geometry.orientation;
target.classList.remove('is-portrait', 'is-landscape', 'is-square');
target.classList.add(`is-${geometry.orientation}`);
target.style.setProperty('--media-aspect-ratio', `${geometry.width} / ${geometry.height}`);
target.style.setProperty('--media-project-max-width', `${Math.max(32, Math.min(100, 88 * geometry.ratio)).toFixed(2)}vh`);
target.style.setProperty('--media-viewer-max-width', `${Math.max(28, Math.min(100, 72 * geometry.ratio)).toFixed(2)}vh`);
return geometry;
}
function bindVideoOrientation(video, item = {}) {
if (!video || video.dataset.orientationBound === '1') return video;
video.dataset.orientationBound = '1';
const sync = () => {
applyMediaGeometry(video, item, video);
applyMediaGeometry(video.closest('.project-video-wrap'), item, video);
applyMediaGeometry(video.closest('.project-media-viewport'), item, video);
applyMediaGeometry(video.closest('.stage'), item, video);
};
video.addEventListener('loadedmetadata', sync);
if (video.readyState >= 1) sync();
else applyMediaGeometry(video, item);
return video;
}
function projectVideo(item) {
const wrap = document.createElement('div');
wrap.className = 'project-video-wrap';
applyMediaGeometry(wrap, item);
const directFrame = DATA.media_delivery?.drive_embed_fallback !== false
? createDriveEmbedFrame(item,{autoplay:false,className:'project-drive-embed',loading:'eager'})
: null;
if (directFrame) {
wrap.classList.add('has-drive-embed');
wrap.dataset.playbackContract = 'drive-sandboxed-primary';
wrap.append(directFrame);
mediaDiagnostic(item,'fallback',directFrame.src,'project-drive-embed-primary');
return wrap;
}
const sources = videoSourceCandidates(item);
if (sources.length || videoChunkCandidates(item).length) {
const video = createResilientVideo(item, { autoplay:false, muted:false, loop:false, controls:true, preload:'metadata', className:'project-inline-video', exhausted:() => {
video.replaceWith(projectVideoFallback(item));
}, timeoutMs:45000, metadataReady:false });
wrap.append(video);
return wrap;
}
wrap.append(projectVideoFallback(item));
return wrap;
}
function projectVideoFallback(item, { autoplay = false } = {}) {
const fallback = document.createElement('div');
fallback.className = 'project-video-fallback';
applyMediaGeometry(fallback, item);
const embedAllowed = DATA.media_delivery?.drive_embed_fallback !== false;
const frame = embedAllowed ? createDriveEmbedFrame(item,{autoplay,className:'project-drive-embed',loading:'eager'}) : null;
if (frame) {
fallback.classList.add('has-drive-embed');
fallback.dataset.playbackFallback = 'drive-sandboxed-primary';
fallback.append(frame);
mediaDiagnostic(item,'fallback',frame.src,'project-drive-embed-primary');
return fallback;
}
fallback.dataset.playbackFallback = 'studioframe-unavailable';
const posterNode = imageWithFallback(item, [item.thumbnail_url, ...(item.thumbnail_candidates || [])], { lazy:false, priority:'high', upgradeUrls:[...(item.thumbnail_candidates || [])] });
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
const orientation=mediaOrientation(item);figure.dataset.mediaOrientation=orientation;
const viewport=document.createElement('div'); viewport.className=`project-media-viewport case-media-viewport type-${item.type||'media'}`;viewport.dataset.mediaOrientation=orientation;
const inner=document.createElement('div'); inner.className='project-media-inner';
if (item.type==='image' && visualLayout.card_parallax!==false) inner.dataset.parallax='detail';
inner.append(projectMediaNode(item)); viewport.append(inner);
if(item.type==='image'){
const index=(items||[]).findIndex((entry)=>entry.id===item.id);
viewport.classList.add('is-expandable'); viewport.setAttribute('role','button'); viewport.setAttribute('aria-label',`Expandir ${item.title||'imagem'}`);
viewport.addEventListener('click',(event)=>{if(event.target.closest('a,button,iframe,video'))return;openMediaAt(project,index>=0?index:null);});
}
if(item.type==='video'){
const index=(items||[]).findIndex((entry)=>entry.id===item.id);const open=document.createElement('button');open.type='button';open.className='project-video-open';open.setAttribute('aria-label',`Abrir ${item.title||'vídeo'} no visualizador`);open.innerHTML='<span aria-hidden="true">↗</span><b>Abrir vídeo</b>';open.addEventListener('click',(event)=>{event.preventDefault();event.stopPropagation();openMediaAt(project,index>=0?index:null);});viewport.append(open);
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
function normalizedProjectCommercial(project={}){const source=project?.commercial&&typeof project.commercial==='object'?project.commercial:{};const modes=new Set(['cta','services','full']),positions=new Set(['after_header','after_media','before_next']),ids=[],seen=new Set();(Array.isArray(source.related_service_ids)?source.related_service_ids:[]).forEach((value)=>{const id=String(value||'').trim();if(id&&!seen.has(id)){seen.add(id);ids.push(id);}});return {enabled:source.enabled===true,intro:String(source.intro||''),related_service_ids:ids,cta_label:String(source.cta_label||'Quero algo assim'),display_mode:modes.has(String(source.display_mode||'full'))?String(source.display_mode||'full'):'full',position:positions.has(String(source.position||'after_media'))?String(source.position||'after_media'):'after_media'};}
function projectCommercialServiceRecords(project={}){const config=normalizedProjectCommercial(project);return config.related_service_ids.map((id)=>quoteServiceRecord(id)).filter(Boolean);}
function createProjectCommercialBlock(project={}){const config=normalizedProjectCommercial(project);if(!config.enabled)return null;const records=projectCommercialServiceRecords(project),mode=config.display_mode,section=document.createElement('section');section.className=`case-block project-commercial-bridge reveal mode-${mode}`;section.dataset.projectCommercial='';const projectId=String(project.project_id||project.id||project.gallery_id||'');const copy=document.createElement('div');copy.className='project-commercial-copy';if(mode==='full'){const eyebrow=document.createElement('small');eyebrow.textContent='CONTRATE ESTE TIPO DE PROJETO';const title=document.createElement('h2');title.textContent=records.length?'Serviços relacionados a este trabalho':'Quer construir algo assim?';copy.append(eyebrow,title);const intro=document.createElement('p');intro.textContent=config.intro||'Transforme esta referência em um briefing para a sua marca. Escolha um serviço relacionado ou abra o orçamento com este projeto como referência.';copy.append(intro);}else if(mode==='services'){const eyebrow=document.createElement('small');eyebrow.textContent='SERVIÇOS RELACIONADOS';const title=document.createElement('h2');title.textContent='Soluções usadas neste tipo de projeto';copy.append(eyebrow,title);if(config.intro){const intro=document.createElement('p');intro.textContent=config.intro;copy.append(intro);}}else if(config.intro){const intro=document.createElement('p');intro.textContent=config.intro;copy.append(intro);}if(copy.children.length)section.append(copy);
if(mode!=='cta'&&records.length){const grid=document.createElement('div');grid.className='project-commercial-services';records.forEach(({category,item},index)=>{const card=document.createElement('article');card.className='project-commercial-service-card';const meta=document.createElement('small');meta.textContent=category.short_title||category.title||'Serviço';const title=document.createElement('a');title.href=serviceDetailHref(item);title.textContent=item.title||'Serviço';const description=document.createElement('p');description.textContent=item.description||'';const actions=document.createElement('div');actions.className='project-commercial-service-actions';const details=document.createElement('a');details.href=serviceDetailHref(item);details.textContent='Ver serviço ↗';actions.append(details);if(quoteEnabled()){const add=document.createElement('button');add.type='button';add.dataset.quoteSimilar=String(item.id||'');add.dataset.quoteProjectId=projectId;add.textContent=index===0?'Adicionar ao orçamento':(servicesConfig().quote_item_action_label||'Adicionar');actions.append(add);}card.append(meta,title);if(description.textContent)card.append(description);card.append(actions);grid.append(card);});section.append(grid);}
const actions=document.createElement('div');actions.className='project-commercial-actions';const primary=records[0];let cta;if(quoteEnabled()){cta=document.createElement('button');cta.type='button';if(primary){cta.dataset.quoteSimilar=String(primary.item.id||'');cta.dataset.quoteProjectId=projectId;}else{cta.dataset.quoteOpen='';cta.dataset.quoteProjectContext=projectId;}}else{cta=document.createElement('a');cta.href=primary?serviceDetailHref(primary.item):servicesHref();}cta.className='project-commercial-primary';cta.textContent=config.cta_label||'Quero algo assim';actions.append(cta);const catalog=document.createElement('a');catalog.className='project-commercial-catalog';catalog.href=servicesHref();catalog.textContent='Ver todos os serviços';actions.append(catalog);section.append(actions);return section;}
function renderLegacyMediaStream(project,items,captions=true,listNode=null){
const list=listNode || $('#projectMediaList'); if(!list)return; list.replaceChildren();
items.forEach((item,index)=>{const figure=caseMediaViewport(project,item,items,{caption:captions,className:'project-media-item reveal'});if(!figure)return;figure.style.setProperty('--reveal-delay',`${Math.min(index,5)*45}ms`);list.append(figure);});
}
function applyCaseHeaderPresentation(project, block = {}, headNode = null) {
const head=headNode || $('#projectDetailHead');
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
const headerLayout=block.header_layout || 'copy-only';
if(introMedia) introMedia.hidden = block.show_cover===false || headerLayout==='copy-only' || !introMedia.children.length;
head.dataset.headerLayout=headerLayout;
head.dataset.bodyWidth=block.body_width || 'medium';
const fontMap={display:'var(--display)',body:'var(--body)',system:'Arial, Helvetica, sans-serif',serif:'Georgia, Times New Roman, serif',mono:'ui-monospace, SFMono-Regular, Consolas, monospace'};
const colorMap={text:'var(--text)',accent:'var(--accent)',muted:'var(--muted)'};
const set=(name,value)=>{if(value===undefined||value===null||value===''||value==='auto')head.style.removeProperty(name);else head.style.setProperty(name,value);};
head.style.setProperty('--case-heading-font',fontMap[block.font_family||'display']||fontMap.display);
head.style.setProperty('--case-heading-weight',String(block.title_weight||'400'));
head.style.setProperty('--case-text-align',block.text_align||'left');
head.style.setProperty('--case-title-color',colorMap[block.title_color||'text']||colorMap.text);
head.style.setProperty('--case-eyebrow-color',colorMap[block.eyebrow_color||'accent']||colorMap.accent);
const safeTitleSize = Number(block.title_size || project.title_size || 0);
const safeBodySize = Number(block.body_size || project.description_size || 0);
set('--case-title-size',safeTitleSize?`clamp(26px,${Math.max(18,Math.min(120,safeTitleSize))}px,80px)`:'');
set('--case-body-size',safeBodySize?`clamp(11px,${Math.max(9,Math.min(32,safeBodySize))}px,22px)`:'');
set('--case-eyebrow-size',block.eyebrow_size?`${block.eyebrow_size}px`:'');
set('--case-title-line-height',block.title_line_height||'');
set('--case-title-letter-spacing',block.title_letter_spacing||'');
}
const PUBLIC_CASE_BLOCK_REGISTRY=Object.freeze({
media_full:(project,block,items)=>createCaseFullMediaBlock(project,block,items),
split:(project,block,items)=>createCaseSplitBlock(project,block,items),
duo:(project,block,items)=>createCaseDuoBlock(project,block,items),
video:(project,block,items)=>createCaseVideoBlock(project,block,items),
text:(_project,block)=>createCaseTextBlock(block),
lettering:(_project,block)=>createCaseLetteringBlock(block),
next_project:(project,block)=>createNextProjectBlock(project,block),
});
function renderProjectCase(project,items){
const root=$('#projectCaseBlocks'); const head=$('#projectDetailHead'); const stream=$('#projectMediaList'); if(!root||!head||!stream)return;
root.replaceChildren(); head.hidden=false; stream.hidden=false; stream.replaceChildren();
const commercialConfig=normalizedProjectCommercial(project),commercial=createProjectCommercialBlock(project);let commercialInserted=false;
const insertCommercial=(position)=>{if(!commercial||commercialInserted||commercialConfig.position!==position)return;root.append(commercial);commercialInserted=true;};
publicCaseBlocks(project).forEach((block)=>{
if(block.type==='case_header'){head.hidden=block.visible===false;applyCaseHeaderPresentation(project,block,head);root.append(head);insertCommercial('after_header');return;}
if(block.type==='media_stream'){
stream.hidden=block.visible===false;
if(block.visible===false) stream.replaceChildren();
else renderLegacyMediaStream(project,items,block.captions!==false,stream);
root.append(stream);insertCommercial('after_media');return;
}
if(block.visible===false)return;
if(block.type==='next_project')insertCommercial('before_next');
const renderer=PUBLIC_CASE_BLOCK_REGISTRY[block.type];
const node=renderer?renderer(project,block,items):null;
if(node){node.dataset.caseBlockId=block.id||'';root.append(node);}
});
if(commercial&&!commercialInserted)root.append(commercial);
}
function openProjectDetail(project) {
const gallery = galleryFor(project);
const items = Array.isArray(gallery.items) && gallery.items.length ? gallery.items : [project];
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
const intro = poster(cover, { eager:true });
introMedia.append(intro);
}
introMedia.hidden = !cover;
}
renderProjectCase(project, items);
bindReveal();
if (fullscreen) detail.scrollTop = 0;
else detail.scrollIntoView({ behavior: 'auto', block: 'start' });
tick();
setupServiceOfferNotification();
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
setupServiceOfferNotification();
}
function galleryFor(project) {
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
applyMediaGeometry(stage, project);
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
media = createResilientVideo(project, { autoplay:true, muted:false, loop:false, controls:true, preload:'metadata', className:'viewer-media', exhausted:() => {
media.remove();
const fallback = projectVideoFallback(project,{autoplay:true});
fallback.classList.add('viewer-media');
finish(fallback);
}, timeoutMs:45000, metadataReady:false });
stage.append(media);
const ready=()=>finish(media);
media.addEventListener('loadeddata',ready,{once:true});
media.addEventListener('canplay',ready,{once:true});
} else { const fallback=projectVideoFallback(project,{autoplay:true}); fallback.classList.add('viewer-media'); finish(fallback); }
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
if (project?.type === 'video') return projectVideoFallback(project);
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
addEventListener('popstate', () => { const section=sectionFromLocation(); const ids=new Set(publicPortfolioFilterItems().map((item)=>String(item.id))); select(section && ids.has(String(section)) ? section : 'all', false); });
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
let texturedRevealObserver=null;
let texturedRevealRaf=0;
let texturedRevealScrollBound=false;
function setTexturedRevealProgress(section,progress,channel='scroll'){
const value=clamp(Number(progress)||0,0,1),baseTexture=Math.max(0,Math.min(1,Number(section.dataset.texturedTextureOpacity||.34)));
section.style.setProperty(channel==='replay'?'--sf-textured-replay-progress':'--sf-textured-scroll-progress',value.toFixed(3));
section.style.setProperty('--sf-textured-content-offset',`${((1-value)*28).toFixed(2)}px`);
section.style.setProperty('--sf-textured-texture-offset',`${((1-value)*32).toFixed(2)}px`);
section.style.setProperty('--sf-textured-texture-scale',(.96+value*.04).toFixed(4));
section.style.setProperty('--sf-textured-texture-opacity',(baseTexture*value).toFixed(3));
}
function updateTexturedRevealScrollProgress(){
texturedRevealRaf=0;const viewport=Math.max(innerHeight||0,document.documentElement.clientHeight||0,1);
document.querySelectorAll('[data-textured-reveal][data-textured-progress-mode="tied_to_scroll"]').forEach((section)=>{const rect=section.getBoundingClientRect();if(rect.bottom<0||rect.top>viewport)return;setTexturedRevealProgress(section,(viewport*.9-rect.top)/(viewport*.76),'scroll');});
}
function queueTexturedRevealProgress(){if(!texturedRevealRaf)texturedRevealRaf=requestAnimationFrame(updateTexturedRevealScrollProgress);}
function setupTexturedRevealBlocks(){
texturedRevealObserver?.disconnect();texturedRevealObserver=null;const nodes=[...document.querySelectorAll('[data-textured-reveal]')];if(!nodes.length)return;
if(reduced||document.body.dataset.motion==='off'){nodes.forEach((section)=>{setTexturedRevealProgress(section,1,'scroll');setTexturedRevealProgress(section,1,'replay');section.classList.add('is-visible');});return;}
const replay=nodes.filter((section)=>section.dataset.texturedProgressMode==='replay');if(replay.length&&'IntersectionObserver' in window){texturedRevealObserver=new IntersectionObserver((entries)=>{entries.forEach((entry)=>setTexturedRevealProgress(entry.target,entry.isIntersecting&&entry.intersectionRatio>.12?1:0,'replay'));},{threshold:[0,.12,.3,.6]});replay.forEach((section)=>texturedRevealObserver.observe(section));}
if(!texturedRevealScrollBound){addEventListener('scroll',queueTexturedRevealProgress,{passive:true});addEventListener('resize',queueTexturedRevealProgress,{passive:true});texturedRevealScrollBound=true;}queueTexturedRevealProgress();
}
function bindReveal() {
setupTexturedRevealBlocks();
if (revealObserver) revealObserver.disconnect();
document.querySelectorAll('[data-section-motion]').forEach((section)=>{const content=[...section.children].filter((child)=>!child.classList?.contains('sf-section-visual-layer')).slice(0,12);content.forEach((child,index)=>{child.classList.add('sf-motion-child');child.style.setProperty('--sf-stagger-index',String(index));});content[0]?.classList.toggle('sf-sticky-content',section.dataset.sectionSticky==='content');if(section.dataset.sectionMotion==='none')section.classList.add('is-visible');else section.classList.add('reveal');});
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
const range = node.dataset.parallax === 'detail' ? 28 : (({soft:12,medium:24,strong:38})[node.dataset.parallaxStrength]||18);
node.style.setProperty('--parallax-y', `${(-normalized * range * scale).toFixed(2)}px`);
const texture=node.querySelector(':scope > .sf-section-texture-layer[data-texture-attachment="parallax"]');if(texture)texture.style.setProperty('--sf-texture-y',`${(-normalized*range*.65*scale).toFixed(2)}px`);
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
const filterId=button.dataset.filterId||'';
const targetValue=button.dataset.target||'';closeSideMenu();
if(filterId && !currentCustomPage() && (location.pathname==='/' || /\/index\.html$/.test(location.pathname))){select(filterId,true);return;}
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
{id:'youtube-showcase-main',type:'youtube_showcase',label:'YouTube Showcase',visible:true,youtube_url:'https://www.youtube.com/watch?v=G_2jdXfXxiI',title:'',body:'',primary_cta_label:'Assistir',youtube_cta_label:'Ver no YouTube',channel_url:'',channel_cta_label:'Conheça o canal',show_external_link:true,show_channel_link:false,ratio:'16:9',width:'wide',section_size:'normal',section_width:'wide',section_background:'none'},
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
if(coreId){const node=document.getElementById(coreId);if(!node)continue;applyHomeSectionFrame(node,block);applyCoreBlockOverrides(node,block,nextBuilder);node.hidden=!coreHomeBlockHasVisibleContent(node,block);continue;}
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
else if(sectionFromLocation() && sectionFromLocation()!=='all'){
const active=sectionFromLocation(),beforePage=previousBuilder.section_pages?.[active],nextPage=nextBuilder.section_pages?.[active];
if(previewJson(beforePage)!==previewJson(nextPage)){renderSectionPage(active);EDITOR_PREVIEW_METRICS.targetedRenders+=1;}
if(previewJson(previousBuilder.projects?.filters)!==previewJson(nextBuilder.projects?.filters))renderFilters();
}
else{
patchHomeCompositionInPlace(previousBuilder,nextBuilder);
if(previewJson(previousBuilder.projects?.filters)!==previewJson(nextBuilder.projects?.filters))renderFilters();
if(heroSourceSignature(previousBuilder)!==heroSourceSignature(nextBuilder)){renderHero();EDITOR_PREVIEW_METRICS.targetedRenders+=1;}
if(previewJson(previousBuilder.audio)!==previewJson(nextBuilder.audio)){setupSiteAudio(nextBuilder.audio||{});EDITOR_PREVIEW_METRICS.targetedRenders+=1;}
if(previewJson(previousBuilder.services)!==previewJson(nextBuilder.services)){renderServicesHome();EDITOR_PREVIEW_METRICS.targetedRenders+=1;}
placeHomeHorizontalNavigation();
}
if(previewJson(previousBuilder.services)!==previewJson(nextBuilder.services)){loadQuoteState();ensureGlobalQuoteUI();setupServiceOfferNotification();}
renderSideNavigation();setupSectionNavigator(nextBuilder.section_navigator||{});EDITOR_PREVIEW_METRICS.patches+=1;EDITOR_PREVIEW_METRICS.lastRevision=String(payload.revision||'');
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
if (window.parent !== window) window.parent.postMessage({
type:'studioframe-preview-ready',
revision:String(DATA?.editorial_revision||''),
home_structure_signature:previewJson(previewHomeStructure(DATA?.site_builder||{})),
}, location.origin);
}).catch((error) => {
$('#empty').hidden = false;
$('#empty').textContent = `Não foi possível carregar o portfólio: ${error.message}`;
console.error(error);
});
addEventListener('pageshow', () => {
if (!STUDIOFRAME_INITIAL_HASH) {
requestAnimationFrame(() => scrollTo({ top: 0, left: 0, behavior: 'auto' }));
}
}, { once: true });
