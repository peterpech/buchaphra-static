// Basic client-side search functionality
const searchInput = document.getElementById('search');
const productCards = document.querySelectorAll('.product-card');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    productCards.forEach(card => {
      const title = card.querySelector('h3, h4').textContent.toLowerCase();
      if (title.includes(term)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
