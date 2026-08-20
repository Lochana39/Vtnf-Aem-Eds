
export default function decorate(block) {
  // const child1 = block.children[0];
  // const child2 = block.children[1];
  // const child3 = block.children[2];
  // const child4 = block.children[3];
  // if (child1) {
  //     child1.classList.add('customcard1');
  //     const number = child1.querySelector('h2');
  //     if (number) {
  //       number.classList.add('customcard1-number');
  //     }
  //     const title = child1.querySelector('h3');
  //     if (title) {
  //       title.classList.add('customcard1-title');
  //     }
  //     const image = child1.querySelector('p:has(img)');
  //     if (image) {
  //       image.classList.add('customcard1-image');
  //     }
  //     const description = child1.querySelector('p:not(:has(img))');
  //     if (description) {
  //       description.classList.add('customcard1-description');
  //     }
  // }
  // if (child2) {
  //     child2.classList.add('customcard2');
  //     const number = child2.querySelector('h2');
  //     if (number) {
  //       number.classList.add('customcard2-number');
  //     }
  //     const title = child2.querySelector('h3');
  //     if (title) {
  //       title.classList.add('customcard2-title');
  //     }
  //     const image = child2.querySelector('p:has(img)');
  //     if (image) {
  //       image.classList.add('customcard2-image');
  //     }
  //     const description = child2.querySelector('p:not(:has(img))');
  //     if (description) {
  //       description.classList.add('customcard2-description');
  //     }
  // }
  // if (child3) {
  //   child3.classList.add('customcard3');
  //   const number = child3.querySelector('h2');
  //   if (number) {
  //     number.classList.add('customcard3-number');
  //   }
  //   const title = child3.querySelector('h3');
  //   if (title) {
  //     title.classList.add('customcard3-title');
  //   }
  //   const image = child3.querySelector('p:has(img)');
  //   if (image) {
  //     image.classList.add('customcard3-image');
  //   }
  //   const description = child3.querySelector('p:not(:has(img))');
  //   if (description) {
  //     description.classList.add('customcard3-description');
  //   }
  // }
  // if (child4) {
  //   child4.classList.add('customcard4');
  //   const number = child4.querySelector('h2');
  //   if (number) {
  //     number.classList.add('customcard4-number');
  //   }
  //   const title = child4.querySelector('h3');
  //   if (title) {
  //     title.classList.add('customcard4-title');
  //   }
  //   const image = child4.querySelector('p:has(img)');
  //   if (image) {
  //     image.classList.add('customcard4-image');
  //   }
  //   const description = child4.querySelector('p:not(:has(img))');
  //   if (description) {
  //     description.classList.add('customcard4-description');
  //   }
  // }


  const cards = [...block.children];
  cards.forEach((card) => {
    card.classList.add('customcard');
    const number = card.querySelector('h2');
    number?.classList.add('customcard__number');
    const image = card.querySelector('p:has(img)');
    image?.classList.add('customcard__image');
    const description = card.querySelector('p:not(:has(img))');
    description?.classList.add('customcard__description');
    const title = card.querySelector('h3');
    title?.classList.add('customcard__title');
  });
}