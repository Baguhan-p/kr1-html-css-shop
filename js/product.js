const productsDB = {
  '1': {
    title: 'Подписка Claude Pro (1 мес.)',
    price: '1 990 ₽',
    image: 'images/product-1.jpg',
    short: 'Официальная подписка на нейросеть Claude Pro. Полный доступ к последним моделям AI без ограничений.',
    full: 'Claude Pro — это премиум-доступ к одной из самых продвинутых языковых моделей в мире. В отличие от бесплатной версии, вы получаете приоритетный доступ в часы пик, увеличенный лимит сообщений и возможность работать с самыми новыми функциями Anthropic. Идеально подходит для программистов, писателей и аналитиков.',
    seller: 'Anthropic Authorized Reseller',
    features: [
      'Мгновенная активация на ваш email',
      'Гарантия работы 30 дней',
      'Доступ к Claude 3.5 Sonnet и Opus',
      'Приоритетная поддержка 24/7'
    ],
    reviews: [
      { text: 'Лучший AI для кодинга, оформили за 2 минуты.', author: 'Алексей Д.' },
      { text: 'Работает стабильно, лимиты действительно увеличились.', author: 'Мария В.' }
    ]
  },
  '2': {
    title: 'VOICEMOD PRO Навсегда 🎙️',
    price: '2 490 ₽',
    image: 'images/product-2.jpg',
    short: 'Пожизненная лицензия на лучший голосовой чейнджер. Мгновенная автовыдача ключа после оплаты.',
    full: 'Voicemod Pro — это индустриальный стандарт изменения голоса в реальном времени. Версия Lifetime дает вам доступ ко всем текущим и будущим голосам, звуковым эффектам и интеграциям с Discord, OBS, Zoom и играми. Один раз купил — пользуйся вечно на одном ПК.',
    seller: 'Voicemod Digital Store',
    features: [
      'Лицензия Lifetime (Навсегда)',
      'Автовыдача ключа на email',
      '500+ голосов и звуков',
      'Совместимость с Windows 10/11'
    ],
    reviews: [
      { text: 'Друзья в дискорде в шоке, голос робота топ.', author: 'Дмитрий К.' },
      { text: 'Ключ пришел моментально, активировался без проблем.', author: 'Екатерина С.' }
    ]
  },
  '3': {
    title: 'Ключ Windows 10/11 Pro/Home',
    price: '890 ₽',
    image: 'images/product-3.jpg',
    short: 'Лицензионный ключ активации для всех версий Windows. ♻️ Автовыдача 24/7. Гарантия работы.',
    full: 'Оригинальный OEM-ключ активации Microsoft Windows. Подходит для чистой установки или активации уже установленной системы. Ключ привязывается к железу ПК. Поддерживает обновление с Windows 10 на 11 бесплатно. Полная легальность и отсутствие подписок.',
    seller: 'Microsoft Software Partner',
    features: [
      'Пожизненная лицензия (не подписка)',
      'Мгновенная доставка на почту',
      'Поддержка Win 10 и Win 11',
      'Инструкция по активации в комплекте'
    ],
    reviews: [
      { text: 'Windows активировалась за секунду, спасибо!', author: 'Игорь П.' },
      { text: 'Цена огонь, работает как родная.', author: 'Анна М.' }
    ]
  }
};

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
//test