export default function decorate(block) {
  const section = block.closest('.section');
  const h4 = section.querySelector('.default-content-wrapper h4');
  const h2 = section.querySelector('.default-content-wrapper h2');
  const p = section.querySelector('.default-content-wrapper p');
  h4?.classList.add('pretitle');
  h2?.classList.add('title');
  p?.classList.add('description');
  const cards = [...block.children];
  if (block.classList.contains('member')) {
    const bgImg = cards[0].querySelector('img');
    if (bgImg) {
      section.classList.add('member-section');
      section.style.backgroundImage = `url(${bgImg.src})`;
      section.style.backgroundSize = 'cover';
      section.style.backgroundPosition = 'center';
      section.style.backgroundRepeat = 'no-repeat';
    }
    cards[0].remove();
  }

  cards.forEach((card) => {
    card.classList.add('edscard-custom');
    const divtitle1 = card.querySelector('div:has(h3)');
    divtitle1?.classList.add('edscard-custom-cardcontent');
    const cimg = card.querySelector('div:has(picture)');
    cimg?.classList.add('edscard-custom-img');
    const cardtitle = card.querySelector('h3');
    cardtitle?.classList.add('edscard-custom-cardtitle');
    const img = card.querySelector('img');
    img?.classList.add('edscard-custom-img');
    const description = card.querySelector('p:not(:has(img,a))');
    description?.classList.add('edscard-custom-description');
    const ctbtn = card.querySelector('p:has(a)');
    ctbtn?.classList.add('edscard-custom-ctbtn');
    const blogtitle = card.querySelector('h5');
    blogtitle?.classList.add('edscard-custom-blogtitle');
    const pretitle = card.querySelector('h4');
    pretitle?.classList.add('edscard-custom-pretitle');
  });
}
