export default function decorate(block) {
  const rows = [...block.children];
  const heroImg = rows[0].querySelector('img');
  const heroWrapper = document.createElement('div');
  heroWrapper.className = 'about-hero-bg';
  if (heroImg) {
    heroImg.className = 'about-hero-img';
    heroWrapper.append(heroImg);
  }
  rows[0]?.remove();
  const pre = rows[1].querySelector('h4');
  const title = rows[1].querySelector('h2');
  const list = rows[1].querySelector('ul');

  pre.className = 'about-pretitle';
  title.className = 'about-title';

  const tabButtons = [];
  const tabNav = document.createElement('div');
  tabNav.className = 'about-buttons';

  if (list) {
    [...list.children].forEach((li, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'about-tab-btn';
      btn.textContent = li.textContent.trim();
      if (i === 0) btn.classList.add('is-active');
      tabButtons.push(btn);
      tabNav.append(btn);
    });
  }

  const introWrapper = document.createElement('div');
  introWrapper.className = 'about-content';
  if (pre) introWrapper.append(pre);
  if (title) introWrapper.append(title);
  introWrapper.append(tabNav);
  rows[1]?.remove();

  const remainingRows = rows.slice(2);
  const usableRows = remainingRows.filter((row) => row.querySelector('picture, p'));
  const galleryRow = usableRows[0];
  const galleryPanel = document.createElement('div');
  galleryPanel.className = 'about-panel about-panel-gallery is-active';

  if (galleryRow) {
    galleryRow.querySelectorAll('picture img').forEach((img) => {
      img.className = 'about-gallery-img';
    });
    [...galleryRow.children].forEach((col) => {
      col.classList.add('about-gallery-item');
      galleryPanel.append(col);
    });
  }

  const contentRows = usableRows.slice(1);
  const contentPanels = contentRows.map((row) => {
    const panel = document.createElement('div');
    panel.className = 'about-panel about-panel-content';
    const picture = row.querySelector('picture');
    if (picture) {
      const mediaWrapper = document.createElement('div');
      mediaWrapper.className = 'about-panel-media';
      const img = picture.querySelector('img');
      if (img) img.className = 'about-panel-img';
      mediaWrapper.append(picture);
      panel.append(mediaWrapper);
    }
    const textWrapper = document.createElement('div');
    textWrapper.className = 'about-panel-text';
    row.querySelectorAll('p').forEach((p) => {
      if (!p.querySelector('picture')) {
        p.classList.add('about-panel-paragraph');
        textWrapper.append(p);
      }
    });
    if (textWrapper.children.length) panel.append(textWrapper);

    return panel;
  });

  remainingRows.forEach((row) => row.remove());
  const panelsWrapper = document.createElement('div');
  panelsWrapper.className = 'about-panels';
  panelsWrapper.append(galleryPanel, ...contentPanels);
  const allPanels = [galleryPanel, ...contentPanels];

  block.append(heroWrapper, introWrapper, panelsWrapper);
  tabButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('is-active'));
      allPanels.forEach((p) => p.classList.remove('is-active'));
      btn.classList.add('is-active');
      allPanels[i]?.classList.add('is-active');
    });
  });
}
