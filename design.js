// Comparison-only layout: the default portfolio remains side by side.
if (new URLSearchParams(window.location.search).get('layout') === 'stacked') {
  document.documentElement.dataset.projectLayout = 'stacked';
  // Match keyboard/screen-reader order to the comparison's visual order.
  document.querySelectorAll('.project').forEach(project => {
    const copy = project.querySelector('.project-copy');
    copy.insertBefore(project.querySelector('.project-media'), copy.querySelector('.source-link'));
  });
}

// Baseline content is visible and usable without the optional animation library.
if (window.gsap) {
  const motion = gsap.matchMedia();
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.hero h1, .hero .summary, .hero-actions', {
      y: 12, opacity: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out'
    });
    // Project demos remain stationary inside their horizontal slides.
  });
  // Section headings use CSS sticky positioning, not transform-based pinning.
}

// Dynamic project geometry is handled by the carousel's ResizeObserver below.

const technologyBanner = document.querySelector('.skills-banner');
const marqueeToggle = technologyBanner?.querySelector('.marquee-toggle');
marqueeToggle?.addEventListener('click', () => {
  const paused = technologyBanner.dataset.paused !== 'true';
  technologyBanner.dataset.paused = String(paused);
  marqueeToggle.setAttribute('aria-pressed', String(paused));
  const label = paused ? 'Resume technology banner' : 'Pause technology banner';
  marqueeToggle.setAttribute('aria-label', label);
  marqueeToggle.title = label;
  marqueeToggle.querySelector('use').setAttribute('href', paused ? '#ph-play' : '#ph-pause');
});

// Progressive enhancement: without JavaScript, projects remain ordinary rows.
const projectTrack = document.querySelector('#project-slides');
const projectControls = document.querySelector('.project-controls');
if (projectTrack && projectControls) {
  const slides = [...projectTrack.querySelectorAll(':scope > .project')];
  const previous = projectControls.querySelector('.project-prev');
  const next = projectControls.querySelector('.project-next');
  const position = projectControls.querySelector('.project-position');
  const projectSection = projectTrack.closest('.projects-section');
  const projectScene = projectSection.parentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let scrollFrame = 0;
  let motionFrame = 0;
  let motionTarget = 0;
  let motionTime = 0;
  let layoutFrame = 0;
  let pageFrame = 0;
  let pinned = false;
  let pinStart = 0;
  let pinDistance = 0;
  let manualHorizontal = false;
  let previousWidth = window.innerWidth;
  projectTrack.classList.add('is-carousel');
  projectTrack.setAttribute('role', 'region');
  projectTrack.setAttribute('aria-roledescription', 'carousel');
  projectTrack.setAttribute('aria-label', 'Projects. Scroll or use left and right arrow keys to explore.');
  projectTrack.tabIndex = 0;
  projectControls.hidden = false;

  const slideLeft = index => slides[index].offsetLeft - slides[0].offsetLeft;
  // Narrow slides share the viewport: the last one ends flush with the track,
  // rather than creating an empty tail or extending the pinned scroll distance.
  const slideAnchor = index => Math.min(slideLeft(index), Math.max(0, projectTrack.scrollWidth - projectTrack.clientWidth));
  const visibleSlides = () => slides.filter((slide, i) =>
    slideLeft(i) + slide.offsetWidth > projectTrack.scrollLeft + 1 &&
    slideLeft(i) < projectTrack.scrollLeft + projectTrack.clientWidth - 1);
  const resetCardRows = () => slides.forEach(slide => {
    slide.style.minHeight = '';
    slide.style.gridTemplateRows = '';
    slide.querySelector('.project-context').style.minHeight = '';
  });
  const fitHeight = () => {
    const stacked = document.documentElement.dataset.projectLayout === 'stacked';
    if (stacked) {
      resetCardRows();
      // Share row heights across cards rather than changing either recording.
      // This aligns media tops, GitHub links and the first disclosure divider.
      const rows = ['.project-category', 'h3', '.project-intro', '.tech', '.project-media', '.source-link'];
      const sizes = rows.map(selector => Math.ceil(Math.max(...slides.map(slide => slide.querySelector(selector).getBoundingClientRect().height))));
      const contextHeight = Math.ceil(Math.max(...slides.map(slide => slide.querySelector('.project-context').getBoundingClientRect().height)));
      slides.forEach(slide => {
        slide.style.gridTemplateRows = `${sizes.map(size => `${size}px`).join(' ')} auto`;
        slide.querySelector('.project-context').style.minHeight = `${contextHeight}px`;
      });
    }
    // A constant pinned height prevents the whole section moving between slides.
    const height = Math.max(...(pinned || stacked ? slides : visibleSlides()).map(slide => slide.offsetHeight), slides[current].offsetHeight);
    if (stacked) slides.forEach(slide => { slide.style.minHeight = `${height}px`; });
    projectTrack.style.height = `${height + 28}px`;
  };
  const syncVisibleSlides = () => {
    const visible = visibleSlides();
    slides.forEach(slide => {
      const hidden = !visible.includes(slide);
      slide.inert = hidden;
      slide.setAttribute('aria-hidden', String(hidden));
      if (hidden) slide.querySelectorAll('video').forEach(video => video.pause());
    });
    previous.disabled = projectTrack.scrollLeft <= 1;
    next.disabled = projectTrack.scrollLeft >= projectTrack.scrollWidth - projectTrack.clientWidth - 1;
    fitHeight();
  };
  const update = index => {
    const changed = current !== index;
    current = index;
    slides.forEach((slide, i) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${i + 1} of ${slides.length}: ${slide.querySelector('h3').textContent}`);
    });
    syncVisibleSlides();
    position.textContent = `${current + 1} / ${slides.length}`;
    position.setAttribute('aria-label', `Project ${current + 1} of ${slides.length}: ${slides[current].querySelector('h3').textContent}`);
    if (changed && document.activeElement.closest('.project')?.inert) projectTrack.focus({ preventScroll: true });
  };
  const stopMotion = () => {
    cancelAnimationFrame(motionFrame);
    motionFrame = 0;
  };
  // Native page scroll supplies progress through a CSS-sticky scene.
  // Nothing prevents wheel events, locks the document, or snaps after input stops.
  const animateHorizontal = time => {
    const elapsed = motionTime ? Math.min(time - motionTime, 48) : 16;
    motionTime = time;
    const distance = motionTarget - projectTrack.scrollLeft;
    const blend = reduceMotion.matches ? 1 : 1 - Math.exp(-elapsed / 60);
    const step = Math.sign(distance) * Math.min(Math.abs(distance), Math.max(1, Math.abs(distance) * blend));
    projectTrack.scrollTo({ left: projectTrack.scrollLeft + step, behavior: 'instant' });
    if (Math.abs(motionTarget - projectTrack.scrollLeft) >= 1) motionFrame = requestAnimationFrame(animateHorizontal);
    else motionFrame = 0;
  };
  const followPageScroll = () => {
    if (!pinned || manualHorizontal) return;
    motionTarget = Math.max(0, Math.min(pinDistance, window.scrollY - pinStart));
    if (!motionFrame && Math.abs(motionTarget - projectTrack.scrollLeft) >= 1) {
      motionTime = 0;
      motionFrame = requestAnimationFrame(animateHorizontal);
    }
  };
  const goTo = (index, smooth = true) => {
    stopMotion();
    manualHorizontal = false;
    const target = Math.max(0, Math.min(index, slides.length - 1));
    const behavior = smooth && !reduceMotion.matches ? 'smooth' : 'instant';
    if (pinned) window.scrollTo({ top: pinStart + slideAnchor(target), behavior });
    else {
      projectTrack.style.height = `${Math.max(slides[current].offsetHeight, slides[target].offsetHeight) + 28}px`;
      projectTrack.scrollTo({ left: slideAnchor(target), behavior });
    }
  };
  const moveToNeighbour = direction => {
    const indices = slides.map((slide, i) => i);
    const target = direction > 0
      ? indices.find(i => slideAnchor(i) > projectTrack.scrollLeft + 1)
      : indices.reverse().find(i => slideAnchor(i) < projectTrack.scrollLeft - 1);
    if (target !== undefined) goTo(target);
  };
  const refreshPinLayout = () => {
    layoutFrame = 0;
    const wasPinned = pinned;
    const wasInside = wasPinned && window.scrollY >= pinStart && window.scrollY <= pinStart + pinDistance;
    const fraction = pinDistance ? projectTrack.scrollLeft / pinDistance : 0;
    const before = projectSection.getBoundingClientRect();
    const heading = projectSection.querySelector('.section-heading');
    const sectionStyle = getComputedStyle(projectSection);
    const headingStyle = getComputedStyle(heading);
    const sectionChrome = 28 + heading.offsetHeight
      + parseFloat(headingStyle.marginBottom) + parseFloat(sectionStyle.paddingTop) + parseFloat(sectionStyle.paddingBottom);
    if (document.documentElement.dataset.projectLayout === 'stacked' && window.innerWidth > 600) {
      // Fit by narrowing the whole slide, not by imposing a mismatched player
      // height. Keep a readable minimum width; short screens can safely unpin.
      resetCardRows();
      const widths = slides.map(slide => {
        const stage = slide.querySelector('.video-stage');
        const nonVideoHeight = slide.offsetHeight - stage.offsetHeight;
        const available = window.innerHeight - sectionChrome - nonVideoHeight - 8;
        const demoHeight = Math.max(160, Math.floor(Math.min(available, window.innerHeight * .46)));
        const ratio = 1280 / 900; // Shared frame; recordings remain contained/uncropped.
        // Include the card's horizontal padding and border in its outer width.
        const cardStyle = getComputedStyle(slide);
        const inset = parseFloat(cardStyle.paddingLeft) + parseFloat(cardStyle.paddingRight) + 2;
        return Math.max(320, Math.floor(demoHeight * ratio + inset));
      });
      // Both outer cards and media frames share dimensions. Contained videos
      // retain their native proportions, with black bars where needed.
      projectSection.style.setProperty('--stacked-slide-width', `${Math.min(...widths)}px`);
    }
    pinDistance = slideAnchor(slides.length - 1);
    fitHeight();
    const naturalHeight = Math.max(...slides.map(slide => slide.offsetHeight)) + sectionChrome;
    pinned = window.innerWidth > 600 && !reduceMotion.matches && pinDistance > 0 && naturalHeight <= window.innerHeight;
    projectScene.classList.toggle('is-pinned', pinned);
    projectScene.style.height = pinned ? `${window.innerHeight + pinDistance}px` : '';
    fitHeight();
    pinStart = projectScene.getBoundingClientRect().top + window.scrollY;
    if (wasInside && !pinned) {
      // Tall expanded content must remain readable in normal vertical flow.
      stopMotion();
      window.scrollTo({ top: pinStart, behavior: 'instant' });
    } else if (wasInside && pinned && previousWidth !== window.innerWidth) {
      window.scrollTo({ top: pinStart + fraction * pinDistance, behavior: 'instant' });
    } else if (!wasPinned && pinned && before.top < window.innerHeight && before.bottom > 0 && window.scrollY >= pinStart - 40) {
      window.scrollTo({ top: pinStart + projectTrack.scrollLeft, behavior: 'instant' });
    }
    previousWidth = window.innerWidth;
    if (pinned) followPageScroll();
    else stopMotion();
  };
  const queuePinLayout = () => {
    if (!layoutFrame) layoutFrame = requestAnimationFrame(refreshPinLayout);
  };
  window.addEventListener('scroll', () => {
    if (!pageFrame) pageFrame = requestAnimationFrame(() => { pageFrame = 0; followPageScroll(); });
  }, { passive: true });
  // Keep horizontal trackpad/scrollbar input aligned with the vertical scene.
  projectTrack.addEventListener('pointerdown', () => { stopMotion(); manualHorizontal = true; });
  window.addEventListener('pointerdown', event => {
    if (!projectTrack.contains(event.target)) manualHorizontal = false;
  });
  window.addEventListener('keydown', event => {
    if (['PageDown', 'PageUp', ' ', 'Home', 'End', 'ArrowUp', 'ArrowDown'].includes(event.key)) manualHorizontal = false;
  });
  window.addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX) && !event.shiftKey) manualHorizontal = false;
    else if (projectTrack.contains(event.target)) { stopMotion(); manualHorizontal = true; }
  }, { passive: true });
  previous.addEventListener('click', () => moveToNeighbour(-1));
  next.addEventListener('click', () => moveToNeighbour(1));
  projectTrack.addEventListener('keydown', event => {
    if (event.target !== projectTrack) return; // Preserve native video/disclosure keys.
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveToNeighbour(event.key === 'ArrowLeft' ? -1 : 1);
      return;
    }
    const target = { Home: 0, End: slides.length - 1 }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    goTo(target);
  });
  projectTrack.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      if (pinned && manualHorizontal) window.scrollTo({ top: pinStart + projectTrack.scrollLeft, behavior: 'instant' });
      syncVisibleSlides();
      const nearest = slides.reduce((best, slide, i) => Math.abs(slideAnchor(i) - projectTrack.scrollLeft) < Math.abs(slideAnchor(best) - projectTrack.scrollLeft) ? i : best, 0);
      if (nearest !== current) update(nearest);
    });
  }, { passive: true });
  const followHash = () => {
    const index = slides.findIndex(slide => `#${slide.id}` === window.location.hash);
    if (index >= 0) goTo(index, false);
  };
  const resize = new ResizeObserver(() => { fitHeight(); queuePinLayout(); });
  slides.forEach(slide => resize.observe(slide));
  window.addEventListener('resize', queuePinLayout);
  reduceMotion.addEventListener('change', queuePinLayout);
  window.addEventListener('hashchange', followHash);
  update(0);
  refreshPinLayout();
  followHash();
  document.fonts?.ready.then(queuePinLayout);
}

// Local coordinates keep the supplied spotlight effect aligned after scrolling/resizing.
// No document-wide tracking, React dependency or changes to link activation/touch scrolling.
const heroGlowMotion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
document.querySelectorAll('.spotlight-link').forEach(link => {
  const syncGlow = event => {
    if (!heroGlowMotion.matches || event.pointerType === 'touch') return;
    const bounds = link.getBoundingClientRect();
    link.style.setProperty('--glow-x', `${(event.clientX - bounds.left).toFixed(2)}px`);
    link.style.setProperty('--glow-y', `${(event.clientY - bounds.top).toFixed(2)}px`);
  };
  link.addEventListener('pointerenter', syncGlow);
  link.addEventListener('pointermove', syncGlow);
  const centerGlow = () => {
    link.style.removeProperty('--glow-x');
    link.style.removeProperty('--glow-y');
  };
  // Keep the last pointer position on exit. Recentring during an opacity fade
  // briefly illuminates the entire short border. CSS hides nav glow immediately.
  link.addEventListener('focus', () => {
    if (link.matches(':focus-visible')) centerGlow();
  });
  heroGlowMotion.addEventListener('change', centerGlow);
});
