const subheaderData = {
  'menu-items': [
    { 'menu-id': 'OVERVIEW', 'icon-class': 'heroicon-open-eye', label: 'Overview' },
    { 'menu-id': 'FEATURES', 'icon-class': 'heroicon-bike', label: 'FEATURES' },
    { 'menu-id': 'PRICE', 'icon-class': 'heroicon-wallet-money', label: 'PRICE' },
    { 'menu-id': 'COMPARE', 'icon-class': 'heroicon-exchange', label: 'COMPARE' },
    { 'menu-id': 'SPECIFICATION', 'icon-class': 'heroicon-settings', label: 'Specifications' },
    { 'menu-id': 'FIND-DEALER', 'icon-class': 'heroicon-delear-locator', label: 'Find a Dealer' },
  ],
};

function renderSubheader() {
  const ul = document.querySelector('.header__brand--navbar');
  if (!ul) return;
  ul.innerHTML = subheaderData['menu-items'].map((item) => `<li class="menu-item">
      <a href="#${item['menu-id']}" class="d-flex align-items-center px-8 menu weight-medium text-decoration-none text-uppercase">
        <i class="hero-icon me-4 ${item['icon-class']}"></i>
        <span>${item.label}</span>
      </a>
    </li>`).join('');
}

document.addEventListener('DOMContentLoaded', renderSubheader);
