(() => {
  const cards = [...document.querySelectorAll('#grid .card')];
  const projects = Array.isArray(window.MENSAGEM_PROJECTS) ? window.MENSAGEM_PROJECTS : [];
  const bySlug = new Map(projects.map(project => [project.slug, project]));
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;

  // Touch devices keep their static covers. No forced autoplay or heavy media loading.
  if (!finePointer) return;

  cards.forEach(card => {
    const mediaBox = card.querySelector('.media');
    const cover = mediaBox?.querySelector(':scope > img');
    if (!mediaBox || !cover) return;

    const slug = card.dataset.projectSlug || '';
    const previewVideo = card.dataset.previewVideo || '';
    const project = bySlug.get(slug);

    const imageCandidates = previewVideo ? [] : [...new Set(
      (project?.media || [])
        .filter(item => item?.type === 'IMAGE' && item?.url)
        .map(item => item.url)
        .filter(url => url !== project?.cover)
    )];

    let active = false;
    let video = null;
    let slide = null;
    let slideTimer = null;
    let slideIndex = 0;

    if (previewVideo || imageCandidates.length) {
      mediaBox.classList.add('has-hover-preview');
      mediaBox.dataset.previewType = previewVideo ? 'video' : 'images';
    }

    function stopImages() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
      if (slide) slide.classList.remove('is-on');
      slideIndex = 0;
    }

    function startImages() {
      if (!active || !imageCandidates.length) return;
      if (!slide) {
        slide = document.createElement('img');
        slide.className = 'hover-preview-image';
        slide.alt = '';
        slide.setAttribute('aria-hidden','true');
        mediaBox.appendChild(slide);
      }
      const show = () => {
        if (!active) return;
        slide.src = imageCandidates[slideIndex % imageCandidates.length];
        slide.classList.add('is-on');
        slideIndex += 1;
      };
      stopImages();
      show();
      if (imageCandidates.length > 1) slideTimer = setInterval(show, 900);
    }

    function ensureVideo() {
      if (video || !previewVideo) return video;
      video = document.createElement('video');
      video.className = 'hover-preview-video';
      video.src = previewVideo;
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.poster = project?.cover || cover.currentSrc || cover.src;
      video.setAttribute('muted','');
      video.setAttribute('playsinline','');
      video.setAttribute('aria-hidden','true');

      video.addEventListener('playing', () => {
        if (!active) return;
        stopImages();
        video.classList.add('is-on');
        mediaBox.classList.add('is-previewing');
      });

      video.addEventListener('error', () => {
        // A project that has a video never falls back to random images.
        video.classList.remove('is-on');
        mediaBox.classList.remove('is-previewing');
      });

      mediaBox.appendChild(video);
      return video;
    }

    function start() {
      active = true;
      card.classList.add('hover-preview-active');

      if (previewVideo) {
        const el = ensureVideo();
        if (!el) return;
        try { el.currentTime = 0; } catch (_) {}
        const play = el.play();
        if (play?.catch) play.catch(() => {});
        return;
      }

      startImages();
    }

    function stop() {
      active = false;
      card.classList.remove('hover-preview-active');
      mediaBox.classList.remove('is-previewing');
      stopImages();
      if (video) {
        video.classList.remove('is-on');
        video.pause();
        try { video.currentTime = 0; } catch (_) {}
      }
    }

    card.addEventListener('mouseenter', start);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('blur', stop, true);
  });
})();