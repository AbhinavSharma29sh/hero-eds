export default function decorate(block) {
  const rows = Array.from(block.children);

  const label = rows[0]?.textContent.trim() || 'Amount';
  const min = rows[1]?.textContent.trim() || '10000';
  const max = rows[2]?.textContent.trim() || '100000';
  const defaultVal = rows[3]?.textContent.trim() || '50000';

  const rangeId = `range-${Math.random().toString(36).substr(2, 9)}`;
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  const wrapper = document.createElement('div');
  wrapper.className = 'emi-range-wrapper';

  wrapper.innerHTML = `
    <div class="emi-range-control">
      <div class="emi-range-header">
        <label>${label}</label>
        <input type="number" class="emi-input-box" id="${inputId}" value="${defaultVal}" min="${min}" max="${max}"/>
      </div>
      <input type="range" id="${rangeId}" class="emi-range-slider" min="${min}" max="${max}" value="${defaultVal}"/>
      <div class="emi-range-labels">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  `;

  block.replaceChildren(wrapper);

  const rangeSlider = wrapper.querySelector(`#${rangeId}`);
  const inputBox = wrapper.querySelector(`#${inputId}`);

  rangeSlider.addEventListener('input', (e) => {
    inputBox.value = e.target.value;
    window.dispatchEvent(new CustomEvent('emi-update'));
  });

  inputBox.addEventListener('input', (e) => {
    rangeSlider.value = e.target.value;
    window.dispatchEvent(new CustomEvent('emi-update'));
  });
}
