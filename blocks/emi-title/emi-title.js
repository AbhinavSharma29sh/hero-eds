export default function decorate(block) {
  const [titleRow] = block.children;
  const title = titleRow?.textContent.trim() || 'CALCULATE EMI AND KNOW YOUR GAINS';

  const wrapper = document.createElement('div');
  wrapper.className = 'emi-title-wrapper';
  wrapper.innerHTML = `<h2>${title}</h2>`;

  block.replaceChildren(wrapper);
}
