async function getProduct() {
  const response = await fetch('/mock/product.json');

  if (!response.ok) {
    throw new Error(`Product request failed: ${response.status}`);
  }

  return response.json();
}

export default async function decorate(block) {
  const ctaLink = block.querySelector('a');

  block.innerHTML = '<p>Loading product...</p>';

  try {
    const product = await getProduct();

    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.currency,
    }).format(product.price);

    block.innerHTML = `
      <div class="product-promo-content">
        <h2>${product.name}</h2>

        <p>${product.description}</p>

        <p>
          <strong>SKU:</strong>
          ${product.sku}
        </p>

        <p>
          <strong>Price:</strong>
          ${formattedPrice}
        </p>

        <p>
          <strong>Status:</strong>
          ${product.stock_status}
        </p>
      </div>
    `;

    if (ctaLink) {
      ctaLink.className = 'product-promo-button';
      ctaLink.textContent = 'View Product';
      block.querySelector('.product-promo-content').append(ctaLink);
    }
  } catch (error) {
    console.error('Product loading error:', error);

    block.innerHTML = `
      <div class="product-promo-error">
        Unable to load product information.
      </div>
    `;
  }
}