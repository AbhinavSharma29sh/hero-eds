export default function decorate(block) {
  const rows = Array.from(block.children);
  const get = (i) => rows[i]?.[0]?.textContent?.trim() || '';
  const getUrl = (i) => rows[i]?.[0]?.querySelector('a')?.href || '#';
  const title = get(0);
  const links = [
    { text: get(1), url: getUrl(2) },
    { text: get(3), url: getUrl(4) },
    { text: get(5), url: getUrl(6) },
    { text: get(7), url: getUrl(8) },
    { text: get(9), url: getUrl(10) },
    { text: get(11), url: getUrl(12) },
  ].filter((link) => link.text);

  block.innerHTML = `
    <nav class="subheader" aria-label="Subheader Navigation">
      ${title ? `<span class="subheader-title">${title}</span>` : ''}
      <ul class="subheader-list">
        ${links
    .map(
      (link) => `<li class="subheader-item"><a href="${link.url}">${link.text}</a></li>`,
    )
    .join('')}
      </ul>
    </nav>
  `;
}
