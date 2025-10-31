export default function decorate(block) {
  const rows = Array.from(block.children);

  const faqTitle = rows[0]?.[0]?.textContent?.trim() || 'GOT QUESTIONS?';
  const faqSubtitle = rows[1]?.[0]?.textContent?.trim() || "We've Got Answers";
  const question = rows[2]?.[0]?.textContent?.trim() || '';
  const answer = rows[3]?.[0]?.innerHTML || '';

  block.innerHTML = '';

  let faqHTML = `
    <div class="faq-wrapper">
      <div class="faq-header">
        <div class="faq-tag">${faqTitle}</div>
        <h2 class="faq-subtitle">${faqSubtitle}</h2>
      </div>
      <div class="faq-accordion" id="faqAccordion">
  `;

  if (question && answer) {
    faqHTML += `
      <div class="faq-item">
        <button class="faq-question active" type="button" data-bs-toggle="collapse" data-bs-target="#faq-item-0" aria-expanded="true" aria-controls="faq-item-0">
          <span class="faq-question-text">${question}</span>
          <svg class="faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div id="faq-item-0" class="faq-answer collapse active show" data-bs-parent="#faqAccordion">
          <div class="faq-answer-content">
            ${answer}
          </div>
        </div>
      </div>
      <div class="faq-divider"></div>
    `;
  } else {
    faqHTML += `
      <div class="faq-empty">
        <p>No FAQ configured</p>
      </div>
    `;
  }

  faqHTML += `
      </div>
    </div>
  `;

  block.innerHTML = faqHTML;

  const faqBtn = block.querySelector('.faq-question');
  if (faqBtn) {
    faqBtn.addEventListener('click', () => {
      faqBtn.classList.toggle('active');
    });
  }
}
