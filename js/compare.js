document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('compare-container');
  
  if (!container) return;

  // Читаем список из sessionStorage
  let savedIds = [];
  try {
    savedIds = JSON.parse(sessionStorage.getItem('compareList')) || [];
  } catch (e) {
    console.error("Ошибка чтения:", e);
  }
  
  if (savedIds.length === 0) {
    container.innerHTML = '<div class="empty-compare-msg">Вы еще не выбрали товары для сравнения.<br><a href="catalog.html" class="button button--primary" style="margin-top:10px;">Перейти в каталог</a></div>';
    return;
  }

  // Проверяем наличие базы данных
  if (typeof window.productsDB === 'undefined') {
    console.error("ОШИБКА: productsDB не найден!");
    container.innerHTML = '<div class="empty-compare-msg" style="color:red;">Ошибка системы: База данных не найдена.</div>';
    return;
  }

  renderCompareTable(savedIds, container);
});

function renderCompareTable(ids, container) {
  const db = window.productsDB; 
  const items = ids.map(id => ({ ...db[id], id })).filter(item => item.title);
  
  if (items.length === 0) {
    container.innerHTML = '<div class="empty-compare-msg">Товары не найдены.</div>';
    return;
  }

  let tableHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Характеристика</th>
          ${items.map(item => `
            <td style="vertical-align: top;">
              <img src="${item.image}" alt="${item.title}" class="compare-image">
              <strong style="display:block; margin-bottom: 10px; min-height: 40px;">${item.title}</strong>
              
              <!-- Блок действий: красивое выравнивание -->
              <div style="display: flex; flex-direction: column; gap: 8px; align-items: stretch;">
                
                <!-- Кнопка Подробнее -->
                <a href="product.html?id=${item.id}" class="button button--primary" style="width: 100%; text-align: center; padding: 6px 10px; font-size: 0.9rem;">
                  Подробнее
                </a>
                
                <!-- Кнопка Удалить (стилизованная как secondary/danger) -->
                <button onclick="removeFromCompare('${item.id}')" class="button button--secondary" style="width: 100%; text-align: center; padding: 6px 10px; font-size: 0.9rem; color: var(--color-danger); border-color: var(--color-danger);">
                  Удалить из списка
                </button>
                
              </div>
            </td>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Цена</th>
          ${items.map(item => `<td><strong style="color:var(--color-primary);">${item.price}</strong></td>`).join('')}
        </tr>
        <tr>
          <th>Продавец</th>
          ${items.map(item => `<td>${item.seller}</td>`).join('')}
        </tr>
        <tr>
          <th>Краткое описание</th>
          ${items.map(item => `<td>${item.short}</td>`).join('')}
        </tr>
        <tr>
          <th>Подробное описание</th>
          ${items.map(item => `<td style="font-size:0.9rem; color:var(--color-muted);">${item.full}</td>`).join('')}
        </tr>
        <tr>
          <th>Особенности</th>
          ${items.map(item => `
            <td>
              <ul style="padding-left: 20px; margin: 0;">
                ${(item.features || []).map(f => `<li>${f}</li>`).join('')}
              </ul>
            </td>
          `).join('')}
        </tr>
      </tbody>
    </table>
  `;

  container.innerHTML = tableHTML;
}

// Глобальная функция для удаления товара
window.removeFromCompare = function(id) {
  let list = JSON.parse(sessionStorage.getItem('compareList')) || [];
  list = list.filter(itemId => itemId !== id);
  sessionStorage.setItem('compareList', JSON.stringify(list));
  location.reload(); 
};