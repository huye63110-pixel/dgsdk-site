(() => {
  'use strict';

  const initialize = () => {
    const section = document.getElementById('certifications');
    const track = section?.querySelector('.company-certificate-grid');
    if (!section || !track || section.dataset.carouselInitialized === 'true') return;
    const isMarquee = section.dataset.certificateMode === 'marquee';
    const originals = Array.from(track.children).filter(item => item.tagName === 'FIGURE' && !item.hasAttribute('data-certificate-clone'));
    if (originals.length < 2) return;
    section.dataset.carouselInitialized = 'true';

    let viewport = track.parentElement.classList.contains('certificate-carousel-viewport') ? track.parentElement : null;
    if (!viewport) {
      viewport = document.createElement('div');
      viewport.className = 'certificate-carousel-viewport';
      track.before(viewport);
      viewport.append(track);
    }
    if (!viewport.id) viewport.id = 'certificate-carousel-viewport';
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', 'Certificates and patents. Scroll horizontally to view all documents.');

    let controls = section.querySelector('.certificate-carousel-controls');
    if (!controls) {
      controls = document.createElement('div');
      controls.className = 'certificate-carousel-controls';
      const status = document.createElement('span');
      status.setAttribute('data-certificate-status', '');
      if (!isMarquee) controls.append(status);
      const actions = isMarquee
        ? [['toggle', 'Pause autoplay', '']]
        : [['prev', '←', 'Previous certificates'], ['toggle', 'Pause scrolling', ''], ['next', '→', 'Next certificates']];
      actions.forEach(([action, label, accessibleLabel]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute(`data-certificate-${action}`, '');
        button.textContent = label;
        if (accessibleLabel) button.setAttribute('aria-label', accessibleLabel);
        controls.append(button);
      });
      if (section.classList.contains('certificate-showcase')) viewport.after(controls);
      else viewport.before(controls);
    }
    const toggle = controls.querySelector('[data-certificate-toggle]');
    const previous = controls.querySelector('[data-certificate-prev]');
    const next = controls.querySelector('[data-certificate-next]');
    const status = controls.querySelector('[data-certificate-status]');
    [toggle, previous, next].forEach(button => button?.setAttribute('aria-controls', viewport.id));

    // Exactly one duplicate set: no additions occur during animation or resize.
    const clones = originals.map(original => {
      const clone = original.cloneNode(true);
      clone.setAttribute('data-certificate-clone', '');
      clone.setAttribute('aria-hidden', 'true');
      clone.removeAttribute('id');
      clone.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      clone.querySelectorAll('a,button,input,select,textarea,[tabindex]').forEach(element => element.setAttribute('tabindex', '-1'));
      clone.querySelectorAll('img').forEach(image => { image.alt = ''; });
      const originalButtons = original.querySelectorAll('[data-open-image]');
      clone.querySelectorAll('[data-open-image]').forEach((button, index) => {
        button.addEventListener('mousedown', event => event.preventDefault());
        button.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          // app.js has already bound the original image button.
          originalButtons[index]?.click();
        });
      });
      track.append(clone);
      return clone;
    });

    section.classList.add('certificate-carousel-ready');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const imageDialog = document.getElementById('image-dialog');
    let userPaused = false;
    let hovered = false;
    let focusWithin = false;
    let pointerDown = false;
    let visible = false;
    let frame = 0;
    let lastFrameTime = 0;
    let animatedPosition = 0;
    let loopWidth = 0;
    let interactionUntil = 0;
    let interactionTimer = 0;
    const speed = 21; // Pixels per second, independent of display refresh rate.

    const canRun = () => !userPaused && !reducedMotion.matches && !hovered && !focusWithin && !pointerDown && !imageDialog?.open && visible && !document.hidden && performance.now() >= interactionUntil && loopWidth > 0;
    const updateControls = () => {
      if (toggle) {
        toggle.disabled = reducedMotion.matches;
        toggle.textContent = reducedMotion.matches ? 'Autoplay off' : userPaused ? (isMarquee ? 'Resume autoplay' : 'Resume scrolling') : (isMarquee ? 'Pause autoplay' : 'Pause scrolling');
        toggle.setAttribute('aria-pressed', String(userPaused || reducedMotion.matches));
        if (section.classList.contains('certificate-showcase')) toggle.setAttribute('aria-label', toggle.textContent);
        toggle.title = reducedMotion.matches ? 'Automatic movement is off for your reduced-motion preference.' : '';
      }
      if (!status) return;
      if (reducedMotion.matches) status.textContent = 'Autoplay off · Swipe or use the arrows';
      else if (userPaused) status.textContent = 'Scrolling paused · Select a document to enlarge';
      else if (focusWithin) status.textContent = 'Paused while focused · Select a document to enlarge';
      else if (hovered || pointerDown) status.textContent = 'Paused while browsing · Select a document to enlarge';
      else status.textContent = 'Scroll to explore · Select a document to enlarge';
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastFrameTime = 0;
    };
    const tick = now => {
      frame = 0;
      if (!canRun()) { lastFrameTime = 0; return; }
      const elapsed = lastFrameTime ? Math.min(now - lastFrameTime, 60) : 0;
      lastFrameTime = now;
      // Match the original site's 48-second seamless certificate loop.
      const pixelsPerSecond = isMarquee ? loopWidth / 48 : speed;
      animatedPosition += elapsed * pixelsPerSecond / 1000;
      if (animatedPosition >= loopWidth) animatedPosition %= loopWidth;
      viewport.scrollLeft = animatedPosition;
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      updateControls();
      if (canRun()) {
        if (!frame) {
          animatedPosition = viewport.scrollLeft;
          frame = requestAnimationFrame(tick);
        }
      } else stop();
    };
    const pauseInteraction = () => {
      interactionUntil = performance.now() + 2500;
      window.clearTimeout(interactionTimer);
      interactionTimer = window.setTimeout(sync, 2550);
      sync();
    };
    const measure = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 16;
      // Keep the original six-card sequence wider than the viewport at any size.
      const showcaseImage = section.classList.contains('certificate-showcase') ? originals[0].querySelector('img') : null;
      const imageHeight = showcaseImage ? parseFloat(getComputedStyle(showcaseImage).height) : 0;
      const cardWidth = showcaseImage
        ? imageHeight * Number(showcaseImage.getAttribute('width')) / Number(showcaseImage.getAttribute('height')) + 22
        : Math.max(172, (viewport.clientWidth - 4 * gap) / 4.65);
      track.style.setProperty('--certificate-card-width', `${cardWidth.toFixed(2)}px`);
      loopWidth = reducedMotion.matches ? 0 : clones[0].offsetLeft - originals[0].offsetLeft;
      if (loopWidth > 0 && viewport.scrollLeft >= loopWidth) viewport.scrollLeft %= loopWidth;
      animatedPosition = viewport.scrollLeft;
      sync();
    };
    const updateMotion = () => {
      clones.forEach(clone => { clone.hidden = reducedMotion.matches; });
      section.classList.toggle('is-reduced-motion', reducedMotion.matches);
      if (reducedMotion.matches) viewport.scrollLeft = 0;
      measure();
    };
    const checkVisibility = () => {
      const bounds = viewport.getBoundingClientRect();
      visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      sync();
    };

    toggle?.addEventListener('click', () => { userPaused = !userPaused; sync(); });
    const step = direction => {
      pauseInteraction();
      viewport.scrollBy({ left: direction * Math.max(185, viewport.clientWidth * 0.8), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    };
    previous?.addEventListener('click', () => step(-1));
    next?.addEventListener('click', () => step(1));
    const hoverArea = isMarquee ? viewport : section;
    hoverArea.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') { hovered = true; sync(); } });
    hoverArea.addEventListener('pointerleave', () => { hovered = false; sync(); });
    const hasReadingFocus = () => section.contains(document.activeElement) && !(isMarquee && document.activeElement === toggle);
    section.addEventListener('focusin', () => { focusWithin = hasReadingFocus(); sync(); });
    section.addEventListener('focusout', () => {
      queueMicrotask(() => { focusWithin = hasReadingFocus(); sync(); });
    });
    viewport.addEventListener('pointerdown', () => { pointerDown = true; pauseInteraction(); }, { passive: true });
    window.addEventListener('pointerup', () => { if (pointerDown) { pointerDown = false; pauseInteraction(); } }, { passive: true });
    window.addEventListener('pointercancel', () => { pointerDown = false; sync(); }, { passive: true });
    viewport.addEventListener('wheel', pauseInteraction, { passive: true });
    track.addEventListener('click', sync);
    imageDialog?.addEventListener('close', sync);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', updateMotion);
    if ('IntersectionObserver' in window) {
      const visibilityObserver = new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting);
        sync();
      }, { threshold: 0 });
      visibilityObserver.observe(viewport);
    } else {
      window.addEventListener('scroll', checkVisibility, { passive: true });
    }
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(viewport);
    else window.addEventListener('resize', () => { measure(); checkVisibility(); }, { passive: true });
    updateMotion();
    checkVisibility();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
