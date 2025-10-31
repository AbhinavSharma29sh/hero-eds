export default function decorate(block) {
  const rows = Array.from(block.children);

  const faqTitle = rows[0]?.[0]?.textContent.trim() || 'GOT QUESTIONS?';
  const faqSubtitle = rows[1]?.[0]?.textContent.trim() || "We've Got Answers";

  const faqItems = [];

  for (let i = 2; i < rows.length; i += 2) {
    const question = rows[i]?.[0]?.textContent.trim();
    const answer = rows[i + 1]?.[0]?.innerHTML || '';

    if (question && answer) {
      faqItems.push({ question, answer });
    }
  }

  block.innerHTML = '';

  let faqHTML = `
    <div class="faq-wrapper">
      <div class="faq-header">
        <div class="faq-tag">${faqTitle}</div>
        <h2 class="faq-subtitle">${faqSubtitle}</h2>
      </div>
      <div class="faq-accordion" id="faqAccordion">
  `;

  if (faqItems.length === 0) {
    faqHTML += `
      <div class="faq-empty">
        <p>No FAQ items configured</p>
      </div>
    `;
  } else {
    faqItems.forEach((item, idx) => {
      const itemId = `faq-item-${idx}`;
      const isActive = idx === 0 ? 'active show' : '';

      faqHTML += `
        <div class="faq-item">
          <button class="faq-question ${isActive}" type="button" data-bs-toggle="collapse" data-bs-target="#${itemId}" aria-expanded="${idx === 0 ? 'true' : 'false'}" aria-controls="${itemId}">
            <span class="faq-question-text">${item.question}</span>
            <svg class="faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div id="${itemId}" class="faq-answer collapse ${isActive}" data-bs-parent="#faqAccordion">
            <div class="faq-answer-content">
              ${item.answer}
            </div>
          </div>
        </div>
        <div class="faq-divider"></div>
      `;
    });
  }

  faqHTML += `
      </div>
    </div>
  `;

  block.innerHTML = faqHTML;

  const faqQuestions = block.querySelectorAll('.faq-question');

  faqQuestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      faqQuestions.forEach((b) => {
        if (b !== btn) {
          b.classList.remove('active');
        }
      });
      btn.classList.toggle('active');
    });
  });
}
