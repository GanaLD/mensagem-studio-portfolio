(() => {
  const projects = Array.isArray(window.MENSAGEM_PROJECTS) ? window.MENSAGEM_PROJECTS : [];
  const cards = [...document.querySelectorAll('#grid .card')];
  const canHover = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!projects.length || !cards.length || !canHover || reduced) return;

  const unique = list => [...new Set(list.filter(Boolean))];

  cards.forEach((card, index) => {
    const project = projects[index];
    const mediaBox = card.querySelector('.media');
    const cover = mediaBox?.querySelector('img');

    if (!project || !mediaBox || !cover) return;

    const videoCandidates = unique([
      project.coverVideo,
      ...(project.media || []).filter(item => item?.type === 'VIDEO').map(item => item.url)
    ]);

    const imageCandidates = unique(
      (project.media || [])
        .filter(item => item?.type === 'IMAGE')
        .map(item => item.url)
        .filter(url => url !== project.cover)
    );

    let active = false;
    let video = null;
    let videoIndex = 0;
    let slide = null;
    let slideTimer = null;
    let slideIndex = 0;
    let videoFailed = false;

    mediaBox.classList.add('has-hover-preview');

    function clearSlideshow() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
      if (slide) {
        slide.classList.remove('is-on');
      }
      slideIndex = 0;
    }

    function startSlideshow() {
      if (!active || !imageCandidates.length) return;

      if (!slide) {
        slide = document.createElement('img');
        slide.className = 'hover-preview-image';
        slide.alt = '';
        slide.setAttribute('aria-hidden', 'true');
        mediaBox.appendChild(slide);
      }

      const show = () => {
        if (!active) return;
        slide.src = imageCandidates[slideIndex % imageCandidates.length];
        slide.classList.add('is-on');
        slideIndex += 1;
      };

      clearSlideshow();
      show();

      if (imageCandidates.length > 1) {
        slideTimer = setInterval(show, 850);
      }
    }

    function ensureVideo() {
      if (video || !videoCandidates.length || videoFailed) return video;

      video = document.createElement('video');
      video.className = 'hover-preview-video';
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('aria-hidden', 'true');
      video.poster = project.cover || cover.currentSrc || cover.src;

      video.addEventListener('playing', () => {
        if (!active) return;
        clearSlideshow();
        video.classList.add('is-on');
        mediaBox.classList.add('is-previewing');
      });

      video.addEventListener('error', () => {
        if (!active) return;
        videoIndex += 1;
        if (videoIndex < videoCandidates.length) {
          video.src = videoCandidates[videoIndex];
          video.load();
          const play = video.play();
          if (play?.catch) play.catch(() => {});
        } else {
          videoFailed = true;
          video.classList.remove('is-on');
          mediaBox.classList.remove('is-previewing');
          startSlideshow();
        }
      });

      mediaBox.appendChild(video);
      return video;
    }

    function startPreview() {
      active = true;
      card.classList.add('hover-preview-active');

      if (videoCandidates.length && !videoFailed) {
        const el = ensureVideo();
        if (el) {
          if (!el.src) {
            videoIndex = 0;
            el.src = videoCandidates[videoIndex];
            el.load();
          }
          try { el.currentTime = 0; } catch (_) {}
          const play = el.play();
          if (play?.catch) {
            play.catch(() => {
              if (active) startSlideshow();
            });
          }
          return;
        }
      }

      startSlideshow();
    }

    function stopPreview() {
      active = false;
      card.classList.remove('hover-preview-active');
      mediaBox.classList.remove('is-previewing');
      clearSlideshow();

      if (video) {
        video.classList.remove('is-on');
        video.pause();
        try { video.currentTime = 0; } catch (_) {}
      }
    }

    card.addEventListener('mouseenter', startPreview);
    card.addEventListener('mouseleave', stopPreview);
    card.addEventListener('blur', stopPreview, true);
  });
})();