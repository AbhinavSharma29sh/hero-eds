export default function decorate(block) {
  const [titleRow] = block.children;

  const title = titleRow?.textContent.trim() || 'CALCULATE EMI AND KNOW YOUR GAINS';

  const minAmount = 10000;
  const maxAmount = 100000;
  const defaultAmount = 80500;
  const minRate = 8;
  const maxRate = 15;
  const defaultRate = 13;
  const minDuration = 12;
  const maxDuration = 60;
  const defaultDuration = 12;

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
          <input type="range" id="amountRange" min="${minAmount}" max="${maxAmount}" step="500" value="${defaultAmount}"/>
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
          <input type="range" id="rateRange" min="${minRate}" max="${maxRate}" step="0.1" value="${defaultRate}"/>
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
          <input type="range" id="durationRange" min="${minDuration}" max="${maxDuration}" step="1" value="${defaultDuration}"/>
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
          <button class="emi-cta-btn">CHECK LOAN OFFERS</button>
          <div class="emi-bike-container">
            <img loading="lazy" src="https://bd.gaadicdn.com/processedimages/hero/splendor-plus/source/splendor-plus6409d99be0173.jpg" alt="Hero Bike" class="emi-bike-img" width="200" height="150"/>
          </div>
        </div>
      </div>
    </div>
  `;

  block.replaceChildren(wrapper);

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

  const amountRange = document.getElementById('amountRange');
  const amountInput = document.getElementById('amountInput');
  const rateRange = document.getElementById('rateRange');
  const rateInput = document.getElementById('rateInput');
  const durationRange = document.getElementById('durationRange');
  const durationInput = document.getElementById('durationInput');

  amountRange.addEventListener('input', (e) => {
    amountInput.value = e.target.value;
    updateEMI();
  });
  amountInput.addEventListener('input', (e) => {
    amountRange.value = e.target.value;
    updateEMI();
  });

  rateRange.addEventListener('input', (e) => {
    rateInput.value = e.target.value;
    updateEMI();
  });
  rateInput.addEventListener('input', (e) => {
    rateRange.value = e.target.value;
    updateEMI();
  });

  durationRange.addEventListener('input', (e) => {
    durationInput.value = e.target.value;
    updateEMI();
  });
  durationInput.addEventListener('input', (e) => {
    durationRange.value = e.target.value;
    updateEMI();
  });

  updateEMI();
}
