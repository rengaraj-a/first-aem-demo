export default function decorate(block) {
  const rows = [...block.children];

  const getValue = (label) => {
    const row = rows.find(
      (item) => item.children[0]?.textContent.trim() === label,
    );

    return row?.children[1];
  };

  const productName = getValue('Product Name')?.textContent.trim() || '';
  const description = getValue('Description')?.textContent.trim() || '';
  const price = getValue('Price')?.textContent.trim() || '';
  const ctaCell = getValue('CTA');

  const link = ctaCell?.querySelector('a');

  block.innerHTML = `
    <div class="product-promo-content">
      <h2>${productName}</h2>
      <p>${description}</p>
      <strong>${price}</strong>
    </div>
  `;

  if (link) {
    link.className = 'product-promo-button';
    block.querySelector('.product-promo-content').append(link);
  }
}