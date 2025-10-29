export default function decorate(block) {
  const rows = Array.from(block.children);

  const buttonText = rows[0]?.textContent.trim() || 'CHECK LOAN OFFERS';
  const buttonLink = rows[1]?.textContent.trim() || '#';
  const imageUrl = rows[2]?.textContent.trim() || 'https://bd.gaadicdn.com/processedimages/hero/splendor-plus/source/splendor-plus6409d99be0173.jpg';

  const wrapper = document.createElement('div');
  wrapper.className = 'emi-result-wrapper';

  wrapper.innerHTML = `
    <div class="emi-result-card">
      <p class="emi-result-label">Monthly Payment (EMI)</p>
      <h2 class="emi-result-amount" id="emiAmount">₹ 7,190</h2>
      <a href="${buttonLink}" class="emi-cta-btn">${buttonText}</a>
      <div class="emi-bike-container">
        <img src="${imageUrl}" alt="Hero Bike" class="emi-bike-img"/>
      </div>
    </div>
  `;

  block.replaceChildren(wrapper);

  function calculateEMI() {
    const ranges = document.querySelectorAll('.emi-range-slider');
    if (ranges.length < 3) return;

    const amount = parseInt(ranges[0].value, 10);
    const rate = parseFloat(ranges[1].value);
    const months = parseInt(ranges[2].value, 10);

    const r = rate / (12 * 100);
    const emi = (amount * r * (1 + r) ** months) / ((1 + r) ** months - 1);

    const emiElement = document.getElementById('emiAmount');
    if (emiElement) {
      emiElement.textContent = `₹ ${Math.round(emi).toLocaleString('en-IN')}`;
    }
  }

  window.addEventListener('emi-update', calculateEMI);
  setTimeout(calculateEMI, 100);
}
