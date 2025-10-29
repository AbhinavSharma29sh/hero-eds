document.addEventListener('DOMContentLoaded', () => {
  const panel = document.querySelector('.insight-panel');

  if (!panel) return;

  // Example content — in real AEM, these will be dynamically injected
  const data = {
    title: 'Building Smarter Digital Experiences',
    description:
            'Discover how modern content modeling transforms customer engagement using AEM’s flexible architecture.',
    image: '/content/dam/example/insight-banner.jpg',
    tags: ['Technology', 'Innovation', 'Strategy'],
    cta: {
      link: '/insights/smart-digital-experiences',
      text: 'Read More',
    },
  };

  // Assign content
  const img = panel.querySelector('.insight-image');
  const title = panel.querySelector('.insight-title');
  const desc = panel.querySelector('.insight-description');
  const tagsList = panel.querySelector('.insight-tags');
  const ctaBtn = panel.querySelector('.insight-cta');

  if (data.image) img.src = data.image;
  if (data.title) title.textContent = data.title;
  if (data.description) desc.textContent = data.description;

  // Tags
  if (data.tags && data.tags.length > 0) {
    data.tags.forEach((tag) => {
      const li = document.createElement('li');
      li.classList.add('insight-tag');
      li.textContent = tag;
      tagsList.appendChild(li);
    });
  }

  // CTA
  if (data.cta?.link && data.cta?.text) {
    ctaBtn.href = data.cta.link;
    ctaBtn.textContent = data.cta.text;
  } else {
    ctaBtn.style.display = 'none';
  }
});
