export default function decorate(block) {
  const metric = [...block.children];
  metric.forEach((m) => {
    m.classList.add('metrics-custom');
    const mtitle = m.querySelector('h2');
    mtitle?.classList.add('metrics-custom-title');
    const mdescription = m.querySelector('h3');
    mdescription?.classList.add('metrics-custom-description');
    const mimg = m.querySelector('.icon');
    mimg?.classList.add('metrics-custom-img');
  });
}
