/*!
 * Homepage v12 — image lightbox and the enquiry form.
 *
 * Deliberately NOT ported from the prototype's app.js:
 *   - the document-level `submit` handler that called preventDefault() on every
 *     form. That existed so the local preview could not send mail; on the live
 *     site it would also swallow the global quote modal's submit.
 *   - the menu controller, which now lives once in SiteHeader.astro.
 *   - the application tab panels and [data-reveal] observer, which the v12
 *     markup no longer uses.
 */
(() => {
  'use strict';

  const init = () => {
    /* ----------------------------- image lightbox ----------------------- */
    const dialog = document.getElementById('image-dialog');
    const view = document.getElementById('image-view');
    const caption = document.getElementById('image-caption');
    let lastFocus = null;

    if (dialog && view && typeof dialog.showModal === 'function') {
      document.querySelectorAll('[data-open-image]').forEach((button) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          const src = button.dataset.openImage;
          if (!src) return;
          const text = button.dataset.imageCaption || 'Shidike image';
          lastFocus = button;
          view.src = src;
          view.alt = text;
          if (caption) caption.textContent = text;
          if (!dialog.open) dialog.showModal();
        });
      });

      const closeBtn = document.getElementById('image-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', (event) => {
          event.preventDefault();
          dialog.close();
        });
      }

      // Clicking the backdrop closes; clicking the picture itself does not.
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const b = dialog.getBoundingClientRect();
        const outside =
          event.clientX < b.left || event.clientX > b.right ||
          event.clientY < b.top || event.clientY > b.bottom;
        if (outside) dialog.close();
      });

      dialog.addEventListener('close', () => {
        if (lastFocus) lastFocus.focus({ preventScroll: true });
      });
    }

    /* ------------------------------ enquiry form ------------------------ */
    // Bound to this one form, not to document. Other forms on the site keep
    // their own handling.
    const form = document.getElementById('inquiry-form');
    if (!form) return;
    const status = document.getElementById('form-status');
    const endpoint = form.getAttribute('action');

    const say = (message, ok) => {
      if (!status) return;
      status.textContent = message;
      status.dataset.state = ok ? 'ok' : 'error';
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Honeypot: a real person never fills a field they cannot see. Report
      // success so a bot learns nothing from the response.
      const trap = form.querySelector('input[name="website"]');
      if (trap && trap.value !== '') {
        form.reset();
        say('Thank you — your message has been sent.', true);
        return;
      }

      const button = form.querySelector('button[type="submit"]');
      if (button && button.disabled) return;     // guards double submission
      if (button) button.disabled = true;
      say('Sending…', true);

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          form.reset();
          say('Thank you — your message has been sent. We will reply shortly.', true);
        } else {
          // Inputs are intentionally left filled so nothing typed is lost.
          say('Could not send your message. Please try again, or email dgsdk2013@gmail.com.', false);
        }
      } catch (err) {
        say('Could not send your message. Please check your connection, or email dgsdk2013@gmail.com.', false);
      } finally {
        if (button) button.disabled = false;
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
