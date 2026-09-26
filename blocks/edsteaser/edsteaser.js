function parseProgressItem(li) {
  const text = li.textContent.trim();
  const match = text.match(/^(.*?)[\s,:-]+(\d+)\s*%?\s*$/);
  return {
    label: match ? match[1].trim() : text,
    percent: match ? Number(match[2]) : 0,
  };
}
function buildProgressList(ul) {
  const wrapper = document.createElement('div');
  wrapper.className = 'edsteaser-progress';
  [...ul.children].forEach((li) => {
    const { label, percent } = parseProgressItem(li);
    const item = document.createElement('div');
    item.className = 'edsteaser-progress-item';
    const header = document.createElement('div');
    header.className = 'edsteaser-progress-header';
    const labelSpan = document.createElement('span');
    labelSpan.className = 'edsteaser-progress-label';
    labelSpan.textContent = label;
    header.append(labelSpan);
    const track = document.createElement('div');
    track.className = 'edsteaser-progress-track';
    const fill = document.createElement('div');
    fill.className = 'edsteaser-progress-bar-fill';
    fill.dataset.percent = percent;
    const valueSpan = document.createElement('span');
    valueSpan.className = 'edsteaser-progress-value';
    valueSpan.textContent = `${percent}%`;
    valueSpan.style.left = `${percent}%`;
    track.append(fill, valueSpan);
    item.append(header, track);
    wrapper.append(item);
  });
  ul.replaceWith(wrapper);
  return wrapper;
}
function animateProgressOnScroll(block) {
  const bars = block.querySelectorAll('.edsteaser-progress-bar-fill');
  if (!bars.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        bars.forEach((bar) => {
          requestAnimationFrame(() => {
            bar.style.width = `${bar.dataset.percent}%`;
          });
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(block);
}
export default function decorate(block) {
  const teaser = [...block.children];
  teaser.forEach((card) => {
    card.classList.add('edsteaser-custom');
    const divtitle1 = card.querySelector('div:has(img)');
    divtitle1?.classList.add('edsteaser-custom-img');
    const divtitle2 = card.querySelector('div:not(:has(img))');
    divtitle2?.classList.add('edsteaser-custom-content');
    const btn = card.querySelector('p:has(a)');
    btn?.classList.add('edsteaser-custom-btn');
    const ul = card.querySelector('ul');
    ul?.classList.add('edsteaser-custom-ul');
    const cardtitle = card.querySelector('h3');
    cardtitle?.classList.add('edsteaser-custom-cardtitle');
    const title = card.querySelector('h2');
    title?.classList.add('edsteaser-custom-title');
    const pretitle = card.querySelector('h4');
    pretitle?.classList.add('edsteaser-custom-pretitle');
    const description = card.querySelector('p');
    description?.classList.add('edsteaser-custom-description');
  });
  const progressUl = block.querySelector('.edsteaser-custom-ul');
  if (progressUl && block.classList.contains('solution')) {
    buildProgressList(progressUl);
    animateProgressOnScroll(block);
  }
}
