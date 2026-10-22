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
  // ---------- Counter animation (extra code) ----------
  const animateCount = (el) => {
    const original = el.textContent.trim();// e.g. "25K", "659+", "346 +"
    const match = original.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!match) return;

    const prefix = match[1];// text before the number
    const target = parseFloat(match[2].replace(/,/g, ''));
    const suffix = match[3];// "K", "+", " +" etc.
    const duration = 2000;// animation time in ms
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;// ease-out
      const current = Math.floor(eased * target);
      el.textContent = `${prefix}${current}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = original;// restore exact original text
      }
    };

    el.textContent = `${prefix}0${suffix}`;// start from 0
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        block.querySelectorAll('.metrics-custom-title').forEach(animateCount);
        obs.unobserve(block);// run only once
      }
    });
  }, { threshold: 0.4 });// starts when 40% of block is visible

  observer.observe(block);
}
