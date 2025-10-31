export default function decorate(block) {
  const rows = Array.from(block.children);

  const title = rows[0]?.[0]?.textContent?.trim() || '';
  const links = [];

  for (let i = 1; i < rows.length; i += 2) {
    const text = rows[i]?.[0]?.textContent?.trim() || '';

    const url = rows[i + 1]?.[0]?.querySelector('a')?.href || '';
    if (text) {
      links.push({ text, url });
    }
  }

  block.innerHTML = `
    <nav class="subheader" aria-label="Subheader Navigation">
      ${title ? `<span class="subheader-title">${title}</span>` : ''}
      <ul class="subheader-list">
        ${links.map((link) => `<li class="subheader-item"><a href="${link.url}">${link.text}</a></li>`).join('')}
      </ul>
    </nav>
  `;
}
