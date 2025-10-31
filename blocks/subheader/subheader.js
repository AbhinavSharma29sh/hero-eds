export default function decorate(block) {
  block.innerHTML = `
    <nav class="subheader" aria-label="Subheader Navigation">
      <ul class="subheader-list">
        <li class="subheader-item"><a href="#">Overview</a></li>
        <li class="subheader-item"><a href="#">Features</a></li>
        <li class="subheader-item"><a href="#">Price</a></li>
        <li class="subheader-item"><a href="#">Compare</a></li>
        <li class="subheader-item"><a href="#">Specifications</a></li>
        <li class="subheader-item"><a href="#">Find a Dealer</a></li>
      </ul>
    </nav>
  `;
}
