/* Progressive enhancement: keep the user's final figures readable without JS. */
(() => {
  'use strict';

  const group = document.querySelector('.hero-value-grid[data-countup]');
  if (!group || group.dataset.countupReady) return;
  group.dataset.countupReady = 'true';

  const counters = [...group.querySelectorAll('[data-stat-target]')].map((number, index) => ({
    number,
    card: number.closest('.hero-value-card'),
    target: Number(number.dataset.statTarget),
    finalText: number.textContent,
    delay: index * 40,
    started: false,
    complete: false,
    startTime: 0
  })).filter(counter => counter.card && Number.isFinite(counter.target) && counter.target >= 0);

  if (!counters.length || !('IntersectionObserver' in window) || !window.requestAnimationFrame) return;

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionPreference.matches) return;

  const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  const duration = 1000;
  const byCard = new Map(counters.map(counter => [counter.card, counter]));
  let frame = 0;

  function finish(counter) {
    counter.number.textContent = counter.finalText;
    counter.complete = true;
    counter.card.dataset.countupState = 'complete';
  }

  function tick(time) {
    let running = false;
    counters.forEach(counter => {
      if (!counter.started || counter.complete) return;
      const progress = Math.max(0, Math.min(1, (time - counter.startTime) / duration));
      if (progress === 1) {
        finish(counter);
        return;
      }
      const eased = 1 - Math.pow(1 - progress, 2);
      const display = formatter.format(Math.floor(counter.target * eased));
      if (counter.number.textContent !== display) counter.number.textContent = display;
      running = true;
    });
    frame = running ? requestAnimationFrame(tick) : 0;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const counter = byCard.get(entry.target);
      if (!entry.isIntersecting || !counter || counter.started || counter.complete) return;
      counter.started = true;
      observer.unobserve(counter.card);
      if (motionPreference.matches || document.hidden) {
        finish(counter);
        return;
      }
      counter.startTime = performance.now() + counter.delay;
      counter.number.textContent = '0';
      counter.card.dataset.countupState = 'running';
      if (!frame) frame = requestAnimationFrame(tick);
    });
  }, { threshold: 0.35 });

  function finishAll() {
    observer.disconnect();
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    counters.forEach(finish);
    motionPreference.removeEventListener?.('change', onMotionChange);
  }

  function onMotionChange(event) {
    if (event.matches) finishAll();
  }

  motionPreference.addEventListener?.('change', onMotionChange);
  window.addEventListener('pagehide', finishAll, { once: true });
  counters.forEach(counter => observer.observe(counter.card));
})();
