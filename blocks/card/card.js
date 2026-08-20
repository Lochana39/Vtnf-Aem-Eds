export default function decorate(block) {
  const cards = [...block.children];
  cards.forEach((card) => {
    card.classList.add('customcard');
    const number = card.querySelector('h2');
    number?.classList.add('customcard-number');
    const image = card.querySelector('p:has(img)');
    image?.classList.add('customcard-image');
    const description = card.querySelector('p:not(:has(img))');
    description?.classList.add('customcard-description');
    const title = card.querySelector('h3');
    title?.classList.add('customcard-title');
  });
}
