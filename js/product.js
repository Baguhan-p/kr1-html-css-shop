
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = productsDB[productId];

  if (!product) {
    const container = document.querySelector('.product-detail');
    if (container) {
      container.innerHTML = '<h1>Товар не найден</h1><a href="index.html" class="button button--primary">На главную</a>';
    }
    return;
  }

  document.title = product.title + ' – ShopProject';

  const pImage     = document.getElementById('p-image');
  const pTitle     = document.getElementById('p-title');
  const pPrice     = document.getElementById('p-price');
  const pShortDesc = document.getElementById('p-short-desc');
  const pFullDesc  = document.getElementById('p-full-desc');
  const pSeller    = document.getElementById('p-seller');
  const pFeatures  = document.getElementById('p-features');
  const pReviews   = document.getElementById('p-reviews');

  if (pImage)     { pImage.src = product.image; pImage.alt = product.title; }
  if (pTitle)     pTitle.textContent = product.title;
  if (pPrice)     pPrice.textContent = product.price;
  if (pShortDesc) pShortDesc.textContent = product.short;
  if (pFullDesc)  pFullDesc.textContent = product.full;
  if (pSeller)    pSeller.innerHTML = 'Продавец: <strong>' + product.seller + '</strong>';

  if (pFeatures) {
    product.features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      pFeatures.appendChild(li);
    });
  }

  if (pReviews) {
    product.reviews.forEach(r => {
      const bq = document.createElement('blockquote');
      bq.className = 'review-card';
      bq.innerHTML = '<p class="review-card__text">\u00AB' + r.text + '\u00BB</p><footer class="review-card__author">\u2014 ' + r.author + '</footer>';
      pReviews.appendChild(bq);
    });
  }

  const buyBtn     = document.getElementById('p-buy-btn');
  const dialog     = document.getElementById('order-dialog');
  const closeBtn   = document.getElementById('close-order-dialog');
  const form       = document.getElementById('order-form');
  const successMsg = document.getElementById('success-message');
  const commentFld = document.getElementById('order-comment');

  if (buyBtn && dialog) {
    buyBtn.addEventListener('click', () => {
      if (commentFld) commentFld.value = 'Заказ: ' + product.title + ' (' + product.price + ')';
      dialog.showModal();
    });
  }

  if (closeBtn && dialog) {
    closeBtn.addEventListener('click', () => dialog.close());
  }

  if (dialog) {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        dialog.close();
      }
    });
  }

  if (form && dialog) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.reset();
      dialog.close();
      if (successMsg) {
        successMsg.hidden = false;
        setTimeout(() => { successMsg.hidden = true; }, 4000);
      }
    });
  }
});