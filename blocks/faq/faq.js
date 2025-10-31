export default function decorate(block) {
  const rows = Array.from(block.children);

  // First row: section title, Second row: section subtitle
  const title = rows[0]?.[0]?.textContent?.trim() || '';
  const subtitle = rows[1]?.[0]?.textContent?.trim() || '';
  const faqItems = rows.slice(2);

  block.innerHTML = `
    <div class="faq-wrapper">
      <div class="faq-header">
        <div class="faq-tag">${title}</div>
        <h2 class="faq-subtitle">${subtitle}</h2>
      </div>
      <div class="faq-accordion" id="faqAccordion">
        ${faqItems.length
    ? faqItems
      .map((row, idx) => {
        const cells = Array.from(row.children);
        const question = cells[0]?.textContent?.trim();
        const answer = cells[1]?.innerHTML || '';
        if (!question || !answer) return '';
        return `
                  <div class="faq-item">
                    <button class="faq-question${idx === 0 ? ' active' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#faq-item-${idx}" aria-expanded="${idx === 0 ? 'true' : 'false'}" aria-controls="faq-item-${idx}">
                      <span class="faq-question-text">${question}</span>
                      <svg class="faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <div id="faq-item-${idx}" class="faq-answer collapse${idx === 0 ? ' show' : ''}" data-bs-parent="#faqAccordion">
                      <div class="faq-answer-content">${answer}</div>
                    </div>
                  </div>
                  <div class="faq-divider"></div>
                  `;
      })
      .join('')
    : '<div class="faq-empty"><p>No FAQ items configured</p></div>'
}
      </div>
    </div>
  `;

  const faqQuestions = block.querySelectorAll('.faq-question');
  faqQuestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      faqQuestions.forEach((b) => b.classList.remove('active'));
      btn.classList.toggle('active');
      const allAnswers = block.querySelectorAll('.faq-answer');
      allAnswers.forEach((ans) => ans.classList.remove('show'));
      const ans = block.querySelector(`#${btn.getAttribute('data-bs-target').replace('#', '')}`);
      if (ans) ans.classList.add('show');
    });
  });
}
