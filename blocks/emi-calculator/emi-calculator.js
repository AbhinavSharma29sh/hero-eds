export default function decorate(block) {
  const rows = Array.from(block.children);

  const title = rows[0]?.[0]?.textContent.trim() || 'CALCULATE EMI AND KNOW YOUR GAINS';
  const amountLabel = rows[1]?.[0]?.textContent.trim() || 'Amount Needed (₹)';
  const minAmount = parseInt(rows[2]?.[0]?.textContent.trim(), 10) || 10000;
  const maxAmount = parseInt(rows[3]?.[0]?.textContent.trim(), 10) || 100000;
  const defaultAmount = parseInt(rows[4]?.[0]?.textContent.trim(), 10) || 50000;
  const rateLabel = rows[5]?.[0]?.textContent.trim() || 'Interest rate (P.A)';
  const minRate = parseFloat(rows[6]?.[0]?.textContent.trim()) || 8;
  const maxRate = parseFloat(rows[7]?.[0]?.textContent.trim()) || 15;
  const defaultRate = parseFloat(rows[8]?.[0]?.textContent.trim()) || 12;
  const durationLabel = rows[9]?.[0]?.textContent.trim() || 'Duration (Months)';
  const minDuration = parseInt(rows[10]?.[0]?.textContent.trim(), 10) || 12;
  const maxDuration = parseInt(rows[11]?.[0]?.textContent.trim(), 10) || 60;
  const defaultDuration = parseInt(rows[12]?.[0]?.textContent.trim(), 10) || 24;
  const resultLabel = rows[13]?.[0]?.textContent.trim() || 'Monthly Payment (EMI)';
  const buttonText = rows[14]?.[0]?.textContent.trim() || 'CHECK LOAN OFFERS';
  const buttonLink = rows[15]?.[0]?.querySelector('a')?.href || '#';
  const bikeImageSrc = rows[16]?.[0]?.querySelector('img')?.src || 'https://bd.gaadicdn.com/processedimages/hero/splendor-plus/source/splendor-plus6409d99be0173.jpg';

  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'emi-calculator-wrapper';

  wrapper.innerHTML = `
    <h2 class="emi-title">${title}</h2>
    <div class="emi-container">
      <div class="emi-left">
        <div class="emi-control">
          <div class="emi-control-header">
            <label>${amountLabel}</label>
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
            <label>${rateLabel}</label>
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
            <label>${durationLabel}</label>
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
          <p class="emi-result-label">${resultLabel}</p>
          <h2 class="emi-result-amount" id="emiResult">₹ 7,190</h2>
          <a href="${buttonLink}" class="emi-cta-btn">${buttonText}</a>
          <div class="emi-bike-container">
            <img loading="lazy" src="${bikeImageSrc}" alt="Hero Bike" class="emi-bike-img" width="200" height="150"/>
          </div>
        </div>
      </div>
    </div>
  `;

  block.append(wrapper);

  function updateRangeFill(slider) {
    const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #d32f2f 0%, #d32f2f ${percent}%, #ddd ${percent}%, #ddd 100%)`;
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
