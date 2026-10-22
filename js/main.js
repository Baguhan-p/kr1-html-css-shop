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

// кнопка scroll
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

// FAQ
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const answerId = question.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);
    
    if (!answer) return;

    const isExpanded = question.getAttribute('aria-expanded') === 'true';

    faqQuestions.forEach((otherQuestion) => {
      if (otherQuestion !== question && otherQuestion.getAttribute('aria-expanded') === 'true') {
        otherQuestion.setAttribute('aria-expanded', 'false');
        const otherAnswerId = otherQuestion.getAttribute('aria-controls');
        const otherAnswer = document.getElementById(otherAnswerId);
        if (otherAnswer) {
          otherAnswer.hidden = true;
        }
      }
    });

    if (isExpanded) {
      question.setAttribute('aria-expanded', 'false');
      answer.hidden = true;
    } else {
      question.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
});

/* ===================================
   Логика сравнения товаров
   =================================== */

// Инициализация списка сравнения из sessionStorage
let compareList = JSON.parse(sessionStorage.getItem('compareList')) || [];

function updateCompareUI() {
  const countSpan = document.getElementById('compare-count');
  if (countSpan) {
    countSpan.textContent = compareList.length;
  }

  document.querySelectorAll('.compare-btn').forEach(btn => {
    const id = btn.dataset.compareId;
    if (compareList.includes(id)) {
      btn.textContent = 'В сравнении ✓';
      btn.classList.add('button--primary');
      btn.classList.remove('button--secondary');
    } else {
      btn.textContent = 'Сравнить';
      btn.classList.remove('button--primary');
      btn.classList.add('button--secondary');
    }
  });
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.compare-btn');
  if (!btn) return;

  const id = btn.dataset.compareId;
  
  if (compareList.includes(id)) {
    compareList = compareList.filter(itemId => itemId !== id);
  } else {
    if (compareList.length >= 4) {
      alert('Можно сравнивать максимум 4 товара одновременно.');
      return;
    }
    compareList.push(id);
  }

  // Сохраняем в sessionStorage
  sessionStorage.setItem('compareList', JSON.stringify(compareList));
  
  updateCompareUI();
});

updateCompareUI();