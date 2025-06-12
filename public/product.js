// Render product detail based on id param
async function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  if (!id) return;

  try {
    const res = await fetch('products.json');
    const products = await res.json();
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-desc').textContent = product.description;
    document.getElementById('product-price').textContent = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(product.price);
  } catch (err) {
    console.error('Failed to load product', err);
  }
}

document.addEventListener('DOMContentLoaded', loadProduct);
