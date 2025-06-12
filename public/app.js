// Load product data and enable basic search
async function loadProducts() {
  const container = document.getElementById('products');
  if (!container) return;

  try {
    const res = await fetch('products.json');
    const products = await res.json();
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="rounded mb-4 w-full">
        <h3 class="text-xl font-semibold mb-2">${p.name}</h3>
        <p class="text-gray-300 mb-4">${p.short}</p>
        <a href="product.html?id=${p.id}" class="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-bold hover:scale-105 inline-block transition">ดูรายละเอียด</a>
      `;
      container.appendChild(card);
    });

    // setup search after rendering
    const searchInput = document.getElementById('search');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase();
        container.querySelectorAll('.product-card').forEach(card => {
          const title = card.querySelector('h3').textContent.toLowerCase();
          card.style.display = title.includes(term) ? '' : 'none';
        });
      });
    }
  } catch (err) {
    console.error('Failed to load products', err);
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
