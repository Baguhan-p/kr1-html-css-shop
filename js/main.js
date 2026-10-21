const dialog     = document.getElementById('order-dialog');
const openBtn    = document.getElementById('open-order-dialog');
const closeBtn   = document.getElementById('close-order-dialog');
const form       = document.getElementById('order-form');
const successMsg = document.getElementById('success-message');

if (openBtn && dialog) {
  openBtn.addEventListener('click', () => dialog.showModal());
}

if (closeBtn && dialog) {
  closeBtn.addEventListener('click', () => dialog.close());
}

if (dialog) {
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top  &&
      event.clientY <= rect.bottom;
    if (!isInDialog) dialog.close();
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    form.querySelectorAll('input, select, textarea').forEach((field) => {
      if (!field.checkValidity()) {
        field.setAttribute('aria-invalid', 'true');
        isValid = false;
      } else {
        field.removeAttribute('aria-invalid');
      }
    });

    if (!isValid) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    form.reset();
    dialog.close();
    if (successMsg) {
      successMsg.hidden = false;
      setTimeout(() => { successMsg.hidden = true; }, 5000);
    }
  });

  form.addEventListener('input', (event) => {
    const target = event.target;
    if (!target.matches('input, select, textarea')) return;
    if (target.checkValidity()) {
      target.removeAttribute('aria-invalid');
    }
  });
}

const scrollTopBtn = document.getElementById('scroll-top-btn');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('scroll-top-btn--visible');
    } else {
      scrollTopBtn.classList.remove('scroll-top-btn--visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}