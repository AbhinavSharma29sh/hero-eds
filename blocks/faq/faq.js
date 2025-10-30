export default function decorate(block) {
  const rows = Array.from(block.children);

  const faqTitle = rows[0][0]?.textContent.trim() || 'GOT QUESTIONS?';
  const faqSubtitle = rows[1][0]?.textContent.trim() || "We've Got Answers";

  const faqRows = rows.slice(2);

  const faqs = faqRows.map((row) => {
    const cells = Array.from(row.children);
    return {
      question: cells[0]?.textContent.trim() || '',
      answer: cells[1]?.innerHTML || '',
    };
  }).filter((faq) => faq.question);

  block.innerHTML = '';

  let faqHTML = `
    <div class="faq-wrapper">
      <div class="faq-header">
        <span class="faq-tag">${faqTitle}</span>
        <h2 class="faq-subtitle">${faqSubtitle}</h2>
      </div>
      <div class="faq-accordion" id="faqAccordion">
  `;

  faqs.forEach((faq, idx) => {
    const itemId = `faq-${idx}`;
    const isActive = idx === 0 ? 'active' : '';
    const collapseClass = idx === 0 ? 'show' : '';

    faqHTML += `
      <div class="faq-item">
        <button class="faq-question ${isActive}" data-bs-toggle="collapse" data-bs-target="#${itemId}" aria-expanded="${idx === 0 ? 'true' : 'false'}">
          <span>${faq.question}</span>
          <svg class="faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div id="${itemId}" class="faq-answer collapse ${collapseClass}" data-bs-parent="#faqAccordion">
          <div class="faq-answer-content">
            ${faq.answer}
          </div>
        </div>
      </div>
    `;
  });

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
