export default function decorate(block) {
  const logo = [...block.children];
  logo.forEach((l) => {
    l.classList.add('logo-custom');
    const limg = l.querySelector('div:has(img)');
    limg?.classList.add('logo-custom-img');
  });
}
