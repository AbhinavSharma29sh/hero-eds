export default function decorate(block) {
  const rows = Array.from(block.children);

  // Extract authored values
  const title = rows[0]?.textContent.trim() || 'CALCULATE EMI AND KNOW YOUR GAINS';
  const rangesStr = rows[1]?.textContent.trim() || '10000-100000-80500|8-15-13|12-60-12';
  const ctaStr = rows[2]?.textContent.trim() || 'CHECK LOAN OFFERS|#';
  const bikeImageSrc = rows[3]?.querySelector('img')?.src || rows[3]?.textContent.trim() || 'https://bd.gaadicdn.com/processedimages/hero/splendor-plus/source/splendor-plus6409d99be0173.jpg';

  // Parse ranges
  const [amountRange, rateRange, durationRange] = rangesStr.split('|');
  const [minAmount, maxAmount, defaultAmount] = amountRange.split('-').map(Number);
  const [minRate, maxRate, defaultRate] = rateRange.split('-').map(Number);
  const [minDuration, maxDuration, defaultDuration] = durationRange.split('-').map(Number);

  // Parse CTA
  const [buttonText, buttonLink] = ctaStr.split('|');

  const wrapper = document.createElement('div');
  wrapper.className = 'emi-calculator-wrapper';

  wrapper.innerHTML = `
    <h2 class="emi-title">${title}</h2>
    <div class="emi-container">
      <div class="emi-left">
        <div class="emi-control">
          <div class="emi-control-header">
            <label>Amount Needed (₹)</label>
            <input type="number" class="emi-input-box" id="amountInput" value="${defaultAmount}" min="${minAmount}" max="${maxAmount}"/>
          </div>
          <input type="range" id="amountRange" class="emi-range-slider" min="${minAmount}" max="${maxAmount}" step="500" value="${defaultAmount}"/>
          <div class="emi-range-labels">
            <span>₹ ${(minAmount / 1000).toFixed(0)} Thousand</span>
            <span>₹ ${(maxAmount / 1000).toFixed(0)} Lakh</span>
          </div>
        </div>

        <div class="emi-control">
          <div class="emi-control-header">
            <label>Interest rate (P.A)</label>
            <input type="number" class="emi-input-box" id="rateInput" value="${defaultRate}" min="${minRate}" max="${maxRate}" step="0.1"/>
          </div>
          <input type="range" id="rateRange" class="emi-range-slider" min="${minRate}" max="${maxRate}" step="0.1" value="${defaultRate}"/>
          <div class="emi-range-labels">
            <span>${minRate} %</span>
            <span>${maxRate} %</span>
          </div>
        </div>

        <div class="emi-control">
          <div class="emi-control-header">
            <label>Duration (Months)</label>
            <input type="number" class="emi-input-box" id="durationInput" value="${defaultDuration}" min="${minDuration}" max="${maxDuration}"/>
          </div>
          <input type="range" id="durationRange" class="emi-range-slider" min="${minDuration}" max="${maxDuration}" step="1" value="${defaultDuration}"/>
          <div class="emi-range-labels">
            <span>${minDuration} Months</span>
            <span>${maxDuration} Months</span>
          </div>
        </div>
      </div>

      <div class="emi-right">
        <div class="emi-result-card">
          <p class="emi-result-label">Monthly Payment (EMI)</p>
          <h2 class="emi-result-amount" id="emiResult">₹ 7,190</h2>
          <a href="${buttonLink}" class="emi-cta-btn">${buttonText}</a>
          <div class="emi-bike-container">
            <img loading="lazy" src="${bikeImageSrc}" alt="Hero Bike" class="emi-bike-img" width="200" height="150"/>
          </div>
        </div>
      </div>
    </div>
  `;

  block.replaceChildren(wrapper);

  // Update range slider fill dynamically
  function updateRangeFill(slider) {
    const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #d32f2f 0%, #d32f2f ${value}%, #ddd ${value}%, #ddd 100%)`;
  }

  function calculateEMI(principal, ratePA, months) {
    const r = ratePA / (12 * 100);
    const emi = (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1);
    return Math.round(emi);
  }

  function updateEMI() {
    const amount = parseInt(document.getElementById('amountInput').value, 10);
    const rate = parseFloat(document.getElementById('rateInput').value);
    const duration = parseInt(document.getElementById('durationInput').value, 10);

    const emi = calculateEMI(amount, rate, duration);
    document.getElementById('emiResult').textContent = `₹ ${emi.toLocaleString('en-IN')}`;
  }

  const amountSlider = document.getElementById('amountRange');
  const amountInput = document.getElementById('amountInput');
  const rateSlider = document.getElementById('rateRange');
  const rateInput = document.getElementById('rateInput');
  const durationSlider = document.getElementById('durationRange');
  const durationInput = document.getElementById('durationInput');

  // Initialize range fills
  updateRangeFill(amountSlider);
  updateRangeFill(rateSlider);
  updateRangeFill(durationSlider);

  amountSlider.addEventListener('input', (e) => {
    amountInput.value = e.target.value;
    updateRangeFill(e.target);
    updateEMI();
  });
  amountInput.addEventListener('input', (e) => {
    amountSlider.value = e.target.value;
    updateRangeFill(amountSlider);
    updateEMI();
  });

  rateSlider.addEventListener('input', (e) => {
    rateInput.value = e.target.value;
    updateRangeFill(e.target);
    updateEMI();
  });
  rateInput.addEventListener('input', (e) => {
    rateSlider.value = e.target.value;
    updateRangeFill(rateSlider);
    updateEMI();
  });

  durationSlider.addEventListener('input', (e) => {
    durationInput.value = e.target.value;
    updateRangeFill(e.target);
    updateEMI();
  });
  durationInput.addEventListener('input', (e) => {
    durationSlider.value = e.target.value;
    updateRangeFill(durationSlider);
    updateEMI();
  });

  updateEMI();
}
