export default function decorate(block) {
  const rows = [...block.children];

  // row 1 -> background image of the about section
  const bg = rows[0].querySelector('img');
  const section = block.closest('.about-container');
  if (bg) {
    section.style.backgroundImage = `url(${bg.src})`;
    section.style.backgroundRepeat = 'no-repeat';
  }
  rows[0].remove();

  // header
  const header = rows[1].firstElementChild;
  header.className = 'about-header';
  header.querySelector('h4').className = 'about-pretitle';
  header.querySelector('h2').className = 'about-title';
  const tabList = header.querySelector('ul');
  tabList.className = 'about-tabs';

  const tabs = [...tabList.children].map((li) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'about-tab';
    btn.textContent = li.textContent.trim();
    li.replaceChildren(btn);
    return btn;
  });

  // items (rows without a picture are skipped)
  const items = document.createElement('div');
  items.className = 'about-items about-items--all';

  const cards = rows
    .slice(2)
    .filter((row) => row.querySelector('picture'))
    .map((row) => {
      const [imgCell, textCell] = row.children;
      const item = document.createElement('div');
      item.className = 'about-item';
      textCell.className = 'about-text';
      item.append(imgCell.querySelector('picture'), textCell);
      return item;
    });
  items.append(...cards);

  // tab switching
  const show = (index) => {
    tabs.forEach((tab, i) => tab.classList.toggle('about-tab--active', i === index));
    items.classList.toggle('about-items--all', index === 0);
    cards.forEach((card, i) => card.classList.toggle('about-item--active', i === index - 1));
  };

  tabs.forEach((tab, i) => tab.addEventListener('click', () => show(i)));
  show(0);

  block.replaceChildren(header, items);
}
