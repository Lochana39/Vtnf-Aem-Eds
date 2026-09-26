export default function decorate(block) {
  const hero = [...block.children];
  const hbg = hero[0].querySelector('img');
  const section = block.closest('.hero');
  if (hbg) {
    section.style.backgroundImage = `url(${hbg.src})`;
    section.style.backgroundRepeat = 'no-repeat';
  }
  hero[0].remove();
  hero.forEach((h) => {
    h.className = 'hero-custom';
    const title = h.querySelector('h1');
    title?.classList.add('hero-title');
    const des = h.querySelector('p');
    des?.classList.add('hero-description');
    const btn = h.querySelector('p:has(a)');
    btn?.classList.add('hero-btn');
  });
}
