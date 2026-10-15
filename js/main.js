// js/main.js
// Открытие/закрытие модального окна и валидация формы заявки

const dialog      = document.getElementById('order-dialog');
const openBtn     = document.getElementById('open-order-dialog');
const closeBtn    = document.getElementById('close-order-dialog');
const form        = document.getElementById('order-form');
const successMsg  = document.getElementById('success-message');

// Открыть модальное окно
openBtn.addEventListener('click', () => {
  dialog.showModal();
});

// Закрыть модальное окно
closeBtn.addEventListener('click', () => {
  dialog.close();
});

// Закрыть по клику на backdrop (вне формы)
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  const isInDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top  &&
    event.clientY <= rect.bottom;
  if (!isInDialog) dialog.close();
});

// Валидация при отправке
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

  // Успешная «отправка»
  form.reset();
  dialog.close();
  successMsg.hidden = false;

  setTimeout(() => {
    successMsg.hidden = true;
  }, 5000);
});

// Снимаем ошибку при исправлении поля
form.addEventListener('input', (event) => {
  const target = event.target;
  if (!target.matches('input, select, textarea')) return;

  if (target.checkValidity()) {
    target.removeAttribute('aria-invalid');
  }
});

// Кнопки «Заказать» в карточках товаров — открывают модалку и
// подставляют название товара в комментарий
document.querySelectorAll('.product-card__button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const product = btn.dataset.product || '';
    const commentField = document.getElementById('order-comment');
    const topicField   = document.getElementById('order-topic');

    if (commentField && product) {
      commentField.value = `Интересует: ${product}`;
    }
    if (topicField && !topicField.value) {
      topicField.value = 'order';
    }

    dialog.showModal();
  });
});