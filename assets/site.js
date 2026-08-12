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
    const response = await fetch('data/portfolio.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`portfolio.json HTTP ${response.status}`);
    DATA = await response.json();
  }
  const identity = DATA.identity || {};
  document.documentElement.style.setProperty('--accent', identity.accent_color || '#2FD59A');
  document.title = `${identity.studio_name || 'Mensagem Studio'} | ${identity.portfolio_title || 'Portfólio'}`;
  $('#logo').textContent = identity.studio_name || 'MENSAGEM STUDIO';
  $('#footerName').textContent = identity.studio_name || 'MENSAGEM STUDIO';
  const footerSite = $('#footerSite');
  const footerInstagram = $('#footerInstagram');
  if (footerSite) {
    footerSite.href = identity.site_url || '#';
    footerSite.hidden = !identity.site_url;
  }
  if (footerInstagram) {
    footerInstagram.href = identity.instagram_url || '#';
    footerInstagram.hidden = !identity.instagram_url;
  }
  $('#heroTitle').textContent = identity.portfolio_title || 'Portfólio';
  $('#heroDescription').textContent = identity.description || '';
  $('#heroLine').textContent = identity.hero_line || '';
  renderSiteBuilder();
  renderHero();
  renderFilters();
  const hashSection = sectionFromLocation();
  const validFilterIds = new Set((DATA.filters || []).map((item) => String(item.id)));
  const initialFilter = hashSection && validFilterIds.has(String(hashSection)) ? hashSection : (Array.isArray(DATA.filters) && DATA.filters.length ? DATA.filters[0].id : 'all');
  select(initialFilter, false);
  renderHomeComposition();
  renderSideNavigation();
  bindMotion();
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
  document.body.dataset.backgroundMotion = globalAnimation.background_motion || document.body.dataset.ambient || 'medium';
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
    heroNode.dataset.textPosition = hero.text_position || 'bottom-left';
    heroNode.dataset.overlay = hero.overlay || 'medium';
    heroNode.dataset.effect = hero.effect || 'cinematic';
    heroNode.style.setProperty('--hero-position-x', `${Math.max(0, Math.min(100, Number(hero.position_x ?? 50)))}%`);
    heroNode.style.setProperty('--hero-position-y', `${Math.max(0, Math.min(100, Number(hero.position_y ?? 50)))}%`);
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

  if ($('#projectsEyebrow')) $('#projectsEyebrow').textContent = projects.eyebrow || 'Portfólio selecionado';
  if ($('#projectsTitle')) $('#projectsTitle').textContent = projects.title || 'Projetos';
  const showProjects = projects.visible !== false;
  $('#portfolioHeading')?.toggleAttribute('hidden', !showProjects);
  $('#filters')?.toggleAttribute('hidden', !showProjects);
  $('#projects')?.toggleAttribute('hidden', !showProjects);
  $('#menu')?.toggleAttribute('hidden', !showProjects);

  if ($('#aboutEyebrow')) $('#aboutEyebrow').textContent = about.eyebrow || 'Mensagem Studio';
  if ($('#aboutTitle')) $('#aboutTitle').textContent = about.title || '';
  if ($('#aboutBody')) $('#aboutBody').textContent = about.body || '';
  $('#about')?.toggleAttribute('hidden', about.visible === false);
  $('#navAbout')?.toggleAttribute('hidden', about.visible === false);

  if ($('#contactEyebrow')) $('#contactEyebrow').textContent = contact.eyebrow || 'Contato';
  if ($('#contactTitle')) $('#contactTitle').textContent = contact.title || '';
  if ($('#contactBody')) $('#contactBody').textContent = contact.body || '';
  $('#contact')?.toggleAttribute('hidden', contact.visible === false);
  $('#navContact')?.toggleAttribute('hidden', contact.visible === false);

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
    { id:'core-hero', type:'hero', visible:true, core:true },
    { id:'core-intro', type:'intro', visible:true, core:true },
    { id:'core-lettering', type:'lettering', visible:true, core:true },
    { id:'core-projects', type:'projects', visible:true, core:true },
    { id:'core-about', type:'about', visible:true, core:true },
    { id:'core-contact', type:'contact', visible:true, core:true },
  ];
  const configured = Array.isArray(DATA.site_builder?.home?.blocks)
    ? DATA.site_builder.home.blocks.filter((block) => block && block.type).map((block) => ({ ...block }))
    : [];
  if (!configured.length) return defaults;
  defaults.forEach((core) => {
    if (!configured.some((block) => block.id === core.id)) configured.push(core);
  });
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

function createFullMediaBlock(block) {
  const project = projectForBlock(block.project_id);
  if (!project) return null;
  const section = document.createElement('section');
  section.className = 'modular-block block-full-media reveal';
  if (block.title) section.append(blockHeading(block));
  const gallery = galleryFor(project);
  const mediaItem = (gallery.items || []).find((item) => ['image','video'].includes(item.type)) || project;
  const media = document.createElement('div'); media.className = 'full-media-stage';
  if (mediaItem.type === 'video') media.append(projectVideo(mediaItem));
  else { const inner = document.createElement('div'); inner.className='modular-media-inner'; inner.dataset.parallax='detail'; inner.append(projectImage(mediaItem)); media.append(inner); }
  section.append(media);
  bindBlockOpen(media, project);
  return section;
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
  const section = document.createElement('section');
  section.className = 'modular-block block-horizontal reveal';
  section.append(blockHeading(block, 'Projetos em destaque'));
  const track = document.createElement('div'); track.className = 'horizontal-project-track';
  const categoryId = block.category_id || 'all';
  const projects = (DATA.projects || []).filter((project) => {
    if (project.hidden) return false;
    if (categoryId === 'all') return true;
    return String(project.section_id || project.physical_category_id || '') === String(categoryId);
  }).slice(0, 12);
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
  const projects = modularProjectsForCategory(block.category_id || 'all', 8);
  if (!projects.length) return null;
  const section = document.createElement('section');
  section.className = 'modular-block block-auto-carousel reveal';
  section.dataset.speed = block.speed || 'medium';
  section.dataset.direction = block.direction || 'left';
  section.dataset.pauseHover = block.pause_on_hover === false ? 'false' : 'true';
  section.dataset.motionMode = block.motion_mode === 'manual' ? 'manual' : 'auto';
  section.append(blockHeading(block, 'Em destaque'));
  const viewport = document.createElement('div'); viewport.className = 'auto-carousel-viewport';
  const strip = document.createElement('div'); strip.className = 'auto-carousel-strip';
  const addSet = (clone = false) => projects.forEach((project, index) => {
    const node = card(project, index);
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

function createCtaBlock(block) {
  const section=document.createElement('section'); section.className='modular-block block-cta reveal';
  const copy=blockHeading(block, 'Vamos criar algo juntos?');
  const raw=String(block.button_url||'').trim();
  if (block.button_label) {
    const allowed = /^(https?:|mailto:|tel:)/i.test(raw) ? raw : '';
    const action=document.createElement(allowed ? 'a' : 'button'); action.className='cta-action story-link'; action.textContent=block.button_label || 'Entrar em contato';
    if (allowed) { action.href=allowed; if (/^https?:/i.test(allowed)) { action.target='_blank'; action.rel='noopener'; } }
    else { action.type='button'; action.addEventListener('click',()=>$('#contact')?.scrollIntoView({behavior:reduced?'auto':'smooth'})); }
    copy.append(action);
  }
  section.append(copy); return section;
}

function createTextBlock(block) {
  const section = document.createElement('section');
  section.className = 'modular-block block-text reveal';
  section.append(blockHeading(block));
  return section;
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
  } else media.append(projectVideo(item));
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
  return modularProjectsForCategory(block.category_id || 'all', fallbackLimit);
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
  section.append(blockHeading(block, 'Projetos em movimento'));
  const shell=document.createElement('div'); shell.className='editorial-carousel-shell';
  const viewport=document.createElement('div'); viewport.className='editorial-carousel-viewport';
  const strip=document.createElement('div'); strip.className='editorial-carousel-strip';
  const appendSet=(clone=false)=>projects.forEach((project,index)=>{
    const node=card(project,index); node.classList.add('editorial-carousel-card');
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
  const video=document.createElement('video');video.src=media.media_url||media.preview_url||'';video.poster=media.thumbnail_url||'';video.playsInline=true;video.autoplay=block.autoplay!==false;video.muted=block.muted!==false;video.loop=block.loop!==false;video.controls=block.controls===true;video.preload='metadata';if(block.scroll_behavior==='parallax')stage.dataset.parallax='detail';video.addEventListener('error',()=>video.replaceWith(projectVideo(media)));stage.append(video);section.append(stage);return section;
}

function createEditorialGalleryBlock(block) {
  const projects=editorialProjectsForBlock(block,12);if(!projects.length)return null;
  const section=document.createElement('section');section.className=`modular-block editorial-section block-editorial-gallery columns-${block.columns||'3'} style-${block.gallery_style||'uniform'} reveal`;section.append(blockHeading(block,'Galeria'));
  const grid=document.createElement('div');grid.className='editorial-gallery-grid';projects.forEach((project,index)=>{const node=card(project,index);node.classList.add('editorial-gallery-card');grid.append(node)});section.append(grid);return section;
}

function createHighlightsBlock(block) {
  const projects=editorialProjectsForBlock(block,5);if(!projects.length)return null;
  const section=document.createElement('section');section.className=`modular-block editorial-section block-highlights layout-${block.layout||'feature_cards'} reveal`;section.append(blockHeading(block,'Projetos em destaque'));
  const grid=document.createElement('div');grid.className='highlight-grid';projects.forEach((project,index)=>{const node=card(project,index);node.classList.add(index===0?'highlight-feature':'highlight-card');grid.append(node)});section.append(grid);return section;
}

function createSpacerBlock(block) {
  const section=document.createElement('section');section.className=`editorial-spacer size-${block.size||'medium'} transition-${block.transition||'atmosphere'}`;section.setAttribute('aria-hidden',block.title?'false':'true');if(block.title){const span=document.createElement('span');span.textContent=block.title;section.append(span)}return section;
}

function createCustomHomeBlock(block) {
  if (block.visible === false) return null;
  let node = null;
  if (block.type === 'editorial_carousel') node = createEditorialCarouselBlock(block);
  if (block.type === 'editorial_blocks') node = createEditorialBlocksBlock(block);
  if (block.type === 'home_video') node = createHomeVideoBlock(block);
  if (block.type === 'editorial_gallery') node = createEditorialGalleryBlock(block);
  if (block.type === 'highlights') node = createHighlightsBlock(block);
  if (block.type === 'spacer') node = createSpacerBlock(block);
  if (block.type === 'showcase') node = createShowcaseBlock(block);
  if (block.type === 'full_media') node = createFullMediaBlock(block);
  if (block.type === 'split') node = createSplitBlock(block);
  if (block.type === 'horizontal_projects') node = createHorizontalProjectsBlock(block);
  if (block.type === 'auto_carousel') node = createAutoCarouselBlock(block);
  if (block.type === 'spotlight') node = createSpotlightBlock(block);
  if (block.type === 'marquee') node = createMarqueeBlock(block);
  if (block.type === 'cta') node = createCtaBlock(block);
  if (block.type === 'text') node = createTextBlock(block);
  if (block.type === 'lettering_custom') node = createCustomLetteringBlock(block);
  if (block.type === 'video_feature') node = createVideoFeatureBlock(block);
  if (node) { node.dataset.homeBlockId = block.id || ''; node.dataset.homeBlockLabel = block.label || block.title || block.type || 'Seção'; node.classList.add('home-modular-instance'); }
  return node;
}

function renderHomeComposition() {
  const main = $('#top');
  if (!main) return;
  main.querySelectorAll('.home-modular-instance').forEach((node) => node.remove());
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
      const specificVisible = block.type === 'projects' ? projectsCfg.visible !== false
        : block.type === 'about' ? aboutCfg.visible !== false
        : block.type === 'contact' ? contactCfg.visible !== false
        : block.type === 'lettering' ? letteringCfg.visible !== false
        : true;
      node.hidden = block.visible === false || !specificVisible;
      return;
    }
    const custom = createCustomHomeBlock(block);
    if (custom) {
      const safeId = String(block.id || block.type || 'section').replace(/[^a-zA-Z0-9_-]+/g,'-');
      custom.id = custom.id || `home-${safeId}`;
      main.append(custom);
    }
  });
  bindReveal();
  tick();
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
  $('#siteMenuTrigger')?.toggleAttribute('hidden',navigation.side_menu_enabled===false);
  root.replaceChildren();
  const addLink=(label,target,filterId='')=>{const button=document.createElement('button');button.type='button';button.className='side-menu-link';button.innerHTML=`<span>${esc(label)}</span><b>↗</b>`;button.dataset.target=target||'';if(filterId)button.dataset.filterId=filterId;root.append(button)};
  addLink('Home','#hero');
  if(navigation.show_home_sections!==false){
    publicHomeBlocks().forEach((block)=>{
      if(block.visible===false||block.type==='hero')return;
      const coreId=CORE_HOME_BLOCK_IDS[block.type];
      const target=coreId?`#${coreId}`:`#home-${String(block.id||block.type).replace(/[^a-zA-Z0-9_-]+/g,'-')}`;
      const label=block.label||block.title||({intro:'Introdução',lettering:'Manifesto',projects:navigation.projects_label||'Work',about:navigation.about_label||'Sobre',contact:navigation.contact_label||'Contato'}[block.type])||'Seção';
      addLink(label,target);
    });
  }
  if(navigation.show_drive_sections!==false){
    (DATA.filters||[]).filter((item)=>String(item.id)!=='all').forEach((item)=>addLink(item.title||item.name||'Seção','#projectsBlock',String(item.id)));
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

function createSectionHeaderBlock(sectionId, page) {
  const section = sectionForId(sectionId);
  if (!section) return null;
  const node = document.createElement('section');
  node.className = 'section-page-header reveal';
  const meta = document.createElement('div'); meta.className = 'section-page-meta';
  const eyebrow = document.createElement('small'); eyebrow.textContent = page.eyebrow || 'Categoria';
  const count = document.createElement('span'); const total = projectsForSection(sectionId).length; count.textContent = `${total} ${total === 1 ? 'projeto' : 'projetos'}`;
  meta.append(eyebrow, count);
  const title = document.createElement('h2'); title.textContent = page.title || section.title || 'Categoria'; title.dataset.parallaxText='14';
  node.append(meta, title);
  if (page.body) { const body=document.createElement('p'); body.textContent=page.body; node.append(body); }
  return node;
}

function createSectionProjectsBlock(sectionId) {
  const node = document.createElement('section');
  node.className = 'section-page-projects reveal';
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
    if (block.type === 'section_header') node = createSectionHeaderBlock(sectionId, page);
    else if (block.type === 'section_projects') node = createSectionProjectsBlock(sectionId);
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

function renderFilters() {
  const filters = $('#filters');
  filters.replaceChildren();
  // V5.12.1: ``filters`` is now the canonical public tab model. Its order is
  // edited in Site Builder and is also used by the exporter to order sections
  // and projects when the visitor selects the aggregate view.
  const configured = Array.isArray(DATA.filters) && DATA.filters.length ? DATA.filters : null;
  if (configured) {
    configured.forEach((item) => filters.append(filterButton(item.title || (item.id === 'all' ? 'Todos' : 'Categoria'), item.id)));
    return;
  }
  filters.append(filterButton('Todos', 'all'));
  const sections = Array.isArray(DATA.sections) && DATA.sections.length
    ? DATA.sections
    : (DATA.categories || []).filter((item) => item.kind !== 'collection');
  sections.forEach((section) => filters.append(filterButton(section.title, section.id)));
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

function mediaPlaceholder(project) {
  const placeholder = document.createElement('span');
  placeholder.className = 'media-placeholder';
  placeholder.textContent = project.type === 'folder' ? 'PASTA' : project.type === 'video' ? 'PLAY' : project.type === 'pdf' ? 'PDF' : 'MÍDIA';
  return placeholder;
}

function imageWithFallback(project, urls, { lazy = true } = {}) {
  const candidates = uniqueUrls(urls);
  if (!candidates.length) return mediaPlaceholder(project);
  const image = document.createElement('img');
  if (lazy) image.loading = 'lazy';
  image.decoding = 'async';
  image.alt = project.title;
  let index = 0;
  const next = () => {
    if (index >= candidates.length) {
      image.replaceWith(mediaPlaceholder(project));
      return;
    }
    image.src = candidates[index++];
  };
  image.addEventListener('error', next);
  next();
  return image;
}

function poster(project) {
  return imageWithFallback(project, [project.thumbnail_url, ...(project.thumbnail_candidates || [])]);
}


function heroAsset(project) {
  return project?.hero_asset && project.hero_asset.type ? { ...project, ...project.hero_asset, title: project.title } : project;
}

function heroCandidates(project) {
  if (project.type === 'image') {
    return uniqueUrls([project.media_url, ...(project.media_candidates || []), project.thumbnail_url, ...(project.thumbnail_candidates || [])]);
  }
  return uniqueUrls([project.thumbnail_url, ...(project.thumbnail_candidates || [])]);
}

function configuredHeroSlides(heroConfig, visible) {
  const configured = Array.isArray(heroConfig.slides) ? heroConfig.slides : [];
  const assets = DATA.hero_assets || {};
  const output = [];
  configured.forEach((slideConfig) => {
    const mediaId = String(slideConfig?.media_id || '');
    if (!mediaId) return;
    let owner = null;
    let media = null;
    for (const project of visible) {
      const found = (project.gallery_items || []).find((item) => String(item.id || '') === mediaId);
      if (found) { owner = project; media = found; break; }
    }
    media = media || assets[mediaId] || null;
    if (!media) return;
    const standalone = !owner;
    output.push({
      ...(owner || { id: `hero:${mediaId}`, project_id: '', title: media.title || 'Banner', description: media.description || '' }),
      hero_asset: { ...media },
      _hero_duration: Math.max(2, Math.min(30, Number(slideConfig.duration || heroConfig.rotation_seconds || 6))),
      _hero_transition_in: (() => { const value = String(slideConfig.transition_in || slideConfig.transition || 'fade'); const migrated = value === 'zoom' ? 'slow_zoom' : value; return ['fade','crossfade','slow_zoom','parallax','slide','reveal'].includes(migrated) ? migrated : 'fade'; })(),
      _hero_transition_out: (() => { const value = String(slideConfig.transition_out || 'crossfade'); const migrated = value === 'zoom' ? 'slow_zoom' : value; return ['fade','crossfade','slow_zoom','parallax','slide','reveal'].includes(migrated) ? migrated : 'crossfade'; })(),
      _hero_intensity: Math.max(0, Math.min(100, Number(slideConfig.intensity ?? 60))),
      _hero_slide_id: String(slideConfig.id || mediaId),
      _hero_standalone: standalone,
    });
  });
  return output;
}

function renderHero() {
  const visible = (DATA.projects || []).filter((project) => !project.hidden && ['image', 'video'].includes(project.type));
  const heroConfig = (DATA.site_builder || {}).hero || {};
  const configuredSlides = configuredHeroSlides(heroConfig, visible);
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

function ensureHeroMedia(slide, project) {
  if (slide.dataset.loaded === '1') return;
  slide.dataset.loaded = '1';
  project = heroAsset(project);
  if (project.type === 'video' && project.hero_autoplay && project.media_url) {
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = project.thumbnail_url || '';
    video.src = project.media_url;
    video.addEventListener('error', () => {
      const fallback = imageWithFallback(project, heroCandidates(project), { lazy: false });
      video.replaceWith(fallback);
    }, { once: true });
    slide.append(video);
  } else {
    slide.append(imageWithFallback(project, heroCandidates(project), { lazy: false }));
  }
}

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
  const start = () => {
    if (video.dataset.failed === '1') return;
    video.classList.add('is-previewing');
    video.play().catch(() => {});
  };
  const stop = () => {
    video.classList.remove('is-previewing');
    video.pause();
    try { video.currentTime = 0; } catch (_) {}
  };
  video.addEventListener('error', () => {
    video.dataset.failed = '1';
    video.classList.remove('is-previewing');
  });
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
  // Touch devices have no hover: preview only the card that dominates the viewport.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.isIntersecting && entry.intersectionRatio >= .68 ? start() : stop());
  }, { threshold: [0, .35, .68, .9], rootMargin: '-8% 0px -8% 0px' });
  observer.observe(button);
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

  const cardPoster = poster(project);
  cardPoster.classList?.add('card-poster');
  mediaInner.append(cardPoster);
  let previewVideo = null;
  if (project.type === 'video' && project.media_url && visualLayout.card_video_preview !== false) {
    previewVideo = document.createElement('video');
    previewVideo.className = 'card-preview-video';
    previewVideo.src = project.media_url;
    previewVideo.muted = true;
    previewVideo.loop = true;
    previewVideo.playsInline = true;
    previewVideo.preload = 'metadata';
    previewVideo.setAttribute('aria-hidden', 'true');
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
  // Use the same thumbnail chain that successfully renders the grid as the
  // first guaranteed browser-displayable fallback, then try larger public URLs.
  return uniqueUrls([
    item.thumbnail_url,
    ...(item.thumbnail_candidates || []),
    item.media_url,
    ...(item.media_candidates || []),
    item.preview_url,
    ...(item.preview_candidates || []),
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
  image.alt = item.title || '';
  image.loading = 'lazy';
  image.decoding = 'async';
  let index = 0;
  const next = () => {
    if (index >= urls.length) {
      image.replaceWith(unavailableMedia(item));
      return;
    }
    image.src = urls[index++];
  };
  image.addEventListener('error', next);
  next();
  return image;
}

function projectVideo(item) {
  const wrap = document.createElement('div');
  wrap.className = 'project-video-wrap';

  // Local preview can stream through the authenticated StudioFrame proxy with
  // byte-range support. On the published static site, Google Drive download URLs
  // are not consistently streamable across browsers even when they are public;
  // the Drive /preview player is the reliable playback surface.
  if (!IS_EDITOR_PREVIEW) {
    const source = item.preview_url || (item.preview_candidates || [])[0] || item.external_url;
    if (source) {
      wrap.append(driveFrame(item));
      return wrap;
    }
  }

  const sources = uniqueUrls([item.media_url, ...(item.media_candidates || [])]);
  if (sources.length) {
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = item.thumbnail_url || (item.thumbnail_candidates || [])[0] || '';
    let index = 0;
    const next = () => {
      if (index >= sources.length) {
        video.replaceWith(driveFrame(item));
        return;
      }
      video.src = sources[index++];
      video.load();
    };
    video.addEventListener('error', next);
    next();
    wrap.append(video);
    return wrap;
  }
  wrap.append(driveFrame(item));
  return wrap;
}

function projectVideoFallback(item) {
  const fallback = document.createElement('div');
  fallback.className = 'project-video-fallback';
  fallback.append(projectImage(item));
  const target = item.preview_url || (item.preview_candidates || [])[0] || item.external_url;
  if (target) {
    const link = document.createElement('a');
    link.href = target;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Reproduzir vídeo ↗';
    fallback.append(link);
  }
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

function renderProjectCase(project,items){
  const root=$('#projectCaseBlocks'); const head=$('#projectDetailHead'); const stream=$('#projectMediaList'); if(!root||!head||!stream)return;
  root.replaceChildren(); head.hidden=false; stream.hidden=false; stream.replaceChildren();
  publicCaseBlocks(project).forEach((block)=>{
    // Keep the two legacy/core DOM nodes attached even when hidden. Their IDs
    // are reused on the next project open; detaching a hidden core node would
    // make subsequent viewer opens unable to find it with querySelector.
    if(block.type==='case_header'){head.hidden=block.visible===false;root.append(head);return;}
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
    if (cover) introMedia.append(imageWithFallback(cover, [cover.thumbnail_url, ...(cover.thumbnail_candidates || []), cover.media_url, ...(cover.media_candidates || [])], { lazy: false }));
    introMedia.hidden = !cover;
  }
  renderProjectCase(project, items);
  bindReveal();
  if (fullscreen) detail.scrollTop = 0;
  else detail.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  tick();
}
function closeProjectDetail(scroll = true) {
  const detail = $('#projectDetail');
  const grid = $('#grid');
  if (!detail || !grid) return;
  if (detail.hidden) return;
  const fullscreen = detail.classList.contains('is-fullscreen');
  detail.hidden = true;
  detail.classList.remove('is-fullscreen');
  document.body.classList.remove('project-viewer-open');
  $('#projectMediaList')?.replaceChildren();
  if (active !== 'all' && sectionPageConfig(active)?.enabled !== false) { renderSectionPage(active); } else { grid.hidden = false; }
  if (!fullscreen && scroll) $('#projects').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
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

function renderGalleryItem() {
  const project = activeGallery[activeGalleryIndex];
  if (!project) return;
  const stage = $('#stage');
  stage.replaceChildren();
  $('#lightboxTitle').textContent = activeGalleryTitle || project.title;
  const counter = $('#lightboxCounter');
  if (counter) counter.textContent = `${activeGalleryIndex + 1} / ${Math.max(activeGallery.length, 1)}`;

  let media;
  if (project.type === 'image') {
    media = imageWithFallback(project, [project.media_url, ...(project.media_candidates || []), project.preview_url, ...(project.preview_candidates || []), project.thumbnail_url, ...(project.thumbnail_candidates || [])], { lazy: false });
  } else if (project.type === 'video' && !IS_EDITOR_PREVIEW) {
    media = driveFrame(project);
  } else if (project.type === 'video' && (project.media_url || (project.media_candidates || []).length)) {
    media = document.createElement('video');
    const sources = uniqueUrls([project.media_url, ...(project.media_candidates || [])]);
    let sourceIndex = 0;
    const nextSource = () => {
      if (sourceIndex >= sources.length) return fallbackFrame(project, media);
      media.src = sources[sourceIndex++];
      media.load();
      media.play().catch(() => {});
    };
    media.controls = true;
    media.autoplay = true;
    media.playsInline = true;
    media.poster = project.thumbnail_url || '';
    media.addEventListener('error', nextSource);
    nextSource();
  } else {
    media = driveFrame(project);
  }
  stage.append(media);

  const hasMultiple = activeGallery.length > 1;
  $('#prevMedia')?.toggleAttribute('hidden', !hasMultiple);
  $('#nextMedia')?.toggleAttribute('hidden', !hasMultiple);
  [...document.querySelectorAll('[data-gallery-index]')].forEach((node) => {
    node.classList.toggle('is-active', Number(node.dataset.galleryIndex) === activeGalleryIndex);
  });
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
$('#menu')?.addEventListener('click', () => ($('#projectsBlock') || $('#portfolioHeading'))?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }));

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
  if(atmosphere){
    const pageProgress=clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight));
    atmosphere.style.setProperty('--atmosphere-progress',pageProgress.toFixed(4));
    atmosphere.style.setProperty('--atmosphere-y',`${((pageProgress-.5)*26).toFixed(2)}vh`);
    atmosphere.style.setProperty('--atmosphere-x',`${((ambientPointerX-.5)*8).toFixed(2)}vw`);
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
  const target=document.querySelector(button.dataset.target||'');closeSideMenu();target?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
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

load().catch((error) => {
  $('#empty').hidden = false;
  $('#empty').textContent = `Não foi possível carregar o portfólio: ${error.message}`;
  console.error(error);
});
