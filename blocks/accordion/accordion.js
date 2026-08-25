export default function decorate(block) {
  const accordian = [...block.children];
  accordian.forEach((acc) => {
    acc.classList.add('accordian');
    const headline = acc.querySelector('h2');
    headline?.classList.add('accordian-headline');
    const title = acc.querySelector('h3');
    title?.classList.add('accordian-heading');
    const description = acc.querySelector('p');
    description?.classList.add('accordian-description');
    title?.addEventListener('click', () => {
      acc.classList.toggle('active');
    });
  });
}
