const subheaderData = {
  subheader_title: 'Bike Subheader',
  subheader_items: [
    { icon: 'heroicon-open-eye', label: 'Overview' },
    { icon: 'heroicon-bike', label: 'FEATURES' },
    { icon: 'heroicon-wallet-money', label: 'PRICE' },
    { icon: 'heroicon-exchange', label: 'COMPARE' },
    { icon: 'heroicon-settings', label: 'Specifications' },
    { icon: 'heroicon-delear-locator', label: 'Find a Dealer' },
  ],
};

function renderSubheader() {
  const ul = document.querySelector('.header-brand-navbar');
  if (!ul) return;
  ul.innerHTML = subheaderData.subheader_items
    .map((item) => `
      <li class="subheader-item">
        <a class="d-flex align-items-center px-8 menu weight-medium text-decoration-none text-uppercase">
          <i class="hero-icon me-4 ${item.icon}"></i>
          <span>${item.label}</span>
        </a>
      </li>`)
    .join('');
}

document.addEventListener('DOMContentLoaded', renderSubheader);
