// blocks/feature-card/feature-card.js
export default function decorate(block) {
    // Each child row in the block corresponds to a model row defined in AEM.
    // For simple 1..n items approach, we consider each child as one card item.
    const rows = [...block.children];
    const wrapper = document.createElement('div');
    wrapper.className = 'feature-card-container';

    rows.forEach((row) => {
        // For AEM authored blocks, fields are usually rendered as separate divs.
        // We read children in order: image, title, description (if present)
        const children = [...row.children];
        const card = document.createElement('div');
        card.className = 'feature-card';

        // Image (may be an <img> inside the first child)
        if (children[0]) {
            const imgEl = children[0].querySelector('img');
            if (imgEl) {
                const imgWrap = document.createElement('div');
                imgWrap.className = 'feature-card-image';
                imgWrap.appendChild(imgEl.cloneNode(true));
                card.appendChild(imgWrap);
            }
        }

        // Title
        if (children[1]) {
            const titleText = children[1].textContent.trim();
            if (titleText) {
                const h3 = document.createElement('h3');
                h3.className = 'feature-card-title';
                h3.textContent = titleText;
                card.appendChild(h3);
            }
        }

        // Description (rich text)
        if (children[2]) {
            const descHtml = children[2].innerHTML.trim();
            if (descHtml) {
                const p = document.createElement('div');
                p.className = 'feature-card-description';
                p.innerHTML = descHtml;
                card.appendChild(p);
            }
        }

        // Optional classes field (AEM will render last child as classes if used)
        // if present, add as class names
        if (children[3]) {
            const cls = children[3].textContent.trim();
            if (cls) {
                cls.split(/\s+/).forEach(c => card.classList.add(c));
            }
        }

        wrapper.appendChild(card);
    });

    block.textContent = '';
    block.appendChild(wrapper);
}
