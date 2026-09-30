const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.navlinks');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelectorAll('[data-contact-form]').forEach(form => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const button = form.querySelector('button[type="submit"], button:not([type])');
    const status = form.querySelector('.form-status');
    const originalLabel = button ? button.textContent : '';
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    const formData = new FormData(form);
    formData.set('_subject', `New PRO∙GIANT website inquiry — ${document.title}`);
    formData.set('_template', 'table');
    formData.set('_captcha', 'false');

    if (button) {
      button.disabled = true;
      button.textContent = 'Sending…';
    }
    if (status) status.textContent = '';

    try {
      const response = await fetch('https://formsubmit.co/ajax/luke.progiant@71systems.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      if (status) status.textContent = 'Thank you. Your message has been sent to the PRO∙GIANT team.';
    } catch {
      if (status) {
        status.innerHTML = 'We couldn’t send your message. Please email <a href="mailto:luke.progiant@71systems.com">luke.progiant@71systems.com</a>.';
      }
    } finally {
      window.clearTimeout(timeout);
      if (button) {
        button.disabled = false;
        button.textContent = originalLabel;
      }
    }
  });
});

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
