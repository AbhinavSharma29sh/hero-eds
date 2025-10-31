const model = {
  subheader_title: 'Subheader',
  menuItems: [
    { 'menu_item-id': 'OVERVIEW', 'menu_item-icon': 'heroicon-open-eye', 'menu_item-label': 'Overview' },
    { 'menu_item-id': 'FEATURES', 'menu_item-icon': 'heroicon-bike', 'menu_item-label': 'Features' },
    { 'menu_item-id': 'PRICE', 'menu_item-icon': 'heroicon-wallet-money', 'menu_item-label': 'Price' },
    { 'menu_item-id': 'COMPARE', 'menu_item-icon': 'heroicon-exchange', 'menu_item-label': 'Compare' },
    { 'menu_item-id': 'SPECIFICATION', 'menu_item-icon': 'heroicon-settings', 'menu_item-label': 'Specifications' },
    { 'menu_item-id': 'FIND-DEALER', 'menu_item-icon': 'heroicon-delear-locator', 'menu_item-label': 'Find a Dealer' },
  ],
};

function createMenuItem(item) {
  return `
    <li class="menu_item">
      <a href="#${item['menu_item-id']}" class="d-flex align-items-center px-8 menu weight-medium text-decoration-none text-uppercase">
        <i class="hero-icon me-4 ${item['menu_item-icon']}"></i>
        <span>${item['menu_item-label']}</span>
      </a>
    </li>`;
}

function renderSubheader() {
  const ul = document.querySelector('.header-brand-navbar');
  if (!ul) return;
  ul.innerHTML = model.menuItems.map(createMenuItem).join('');
}

document.addEventListener('DOMContentLoaded', renderSubheader);
