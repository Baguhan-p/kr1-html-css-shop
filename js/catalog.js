document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('catalog-filter-form');
  const productsContainer = document.getElementById('products-container');
  const cards = Array.from(productsContainer.querySelectorAll('.product-card'));
  const noResultsMsg = document.getElementById('no-results-msg');
  
  const allCheckbox = form.querySelector('input[value="all"]');
  const categoryCheckboxes = form.querySelectorAll('input[name="category"]:not([value="all"])');

  if (!form || !cards.length) return;

  function updateAllCheckboxState() {
    const anyOtherSelected = Array.from(categoryCheckboxes).some(cb => cb.checked);
    
    if (anyOtherSelected) {
      allCheckbox.checked = false;
      allCheckbox.disabled = true; 
    } else {
      allCheckbox.checked = true;
      allCheckbox.disabled = false;
    }
  }

  function applyFilters(event) {
    if (event && event.type === 'submit') {
      event.preventDefault();
    }

    updateAllCheckboxState();

    const selectedCategories = [];
    if (!allCheckbox.checked) {
      categoryCheckboxes.forEach(cb => {
        if (cb.checked) {
          selectedCategories.push(cb.value);
        }
      });
    }

    const priceFromInput = form.querySelector('#price-from').value;
    const priceToInput = form.querySelector('#price-to').value;
    
    const priceMin = priceFromInput ? parseFloat(priceFromInput) : 0;
    const priceMax = priceToInput ? parseFloat(priceToInput) : Infinity;

    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategoriesStr = card.dataset.category || '';
      const cardCategories = cardCategoriesStr.split(',').map(c => c.trim()).filter(Boolean);
      const cardPrice = parseFloat(card.dataset.price);

      let matchesCategory = true;

      if (!allCheckbox.checked && selectedCategories.length > 0) {
        matchesCategory = selectedCategories.every(cat => cardCategories.includes(cat));
      }
      
      const matchesPrice = cardPrice >= priceMin && cardPrice <= priceMax;

      if (matchesCategory && matchesPrice) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      noResultsMsg.hidden = false;
      productsContainer.style.display = 'block';
    } else {
      noResultsMsg.hidden = true;
      productsContainer.style.display = 'grid';
    }
  }

  categoryCheckboxes.forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });

  allCheckbox.addEventListener('change', () => {
    if (allCheckbox.checked) {
      categoryCheckboxes.forEach(cb => {
        cb.checked = false;
      });
    }
    applyFilters();
  });

  form.querySelector('#price-from').addEventListener('input', applyFilters);
  form.querySelector('#price-to').addEventListener('input', applyFilters);

  form.addEventListener('reset', () => {
    setTimeout(() => {
      applyFilters();
    }, 0);
  });

  applyFilters();
});