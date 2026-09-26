export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((cn) => {
    cn.className = 'footerstyle-columns';
    const ftitle = cn.querySelector('h2');
    ftitle?.classList.add('footerstyle-columns-ftitle');
    const ful = cn.querySelector('ul');
    ful?.classList.add('footerstyle-columns-ul');
    const fimg = cn.querySelector('p:has(img)');
    fimg?.classList.add('footerstyle-columns-immg');
    const fpara = cn.querySelector('p:not(:has(img))');
    fpara?.classList.add('footerstyle-columns-para');
    const ficon = cn.querySelector('p:has(.icon)');
    ficon?.classList.add('footerstyle-columns-icon');
  });
  const bgImg = rows[0]?.querySelector('img');
  if (bgImg) {
    block.style.backgroundImage = `url(${bgImg.src})`;
    rows[0].remove();
  }
  const cols = document.createElement('div');
  cols.className = 'footerstyle-custom';
  rows.slice(1).forEach((row) => {
    cols.append(row);
  });
  block.append(cols);
}
