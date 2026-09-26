export default function decorate(block) {
  const slides = [...block.children];
  slides.forEach((slide) => {
    slide.classList.add('testimonal-slide');
    [...slide.children].forEach((s1) => {
      if (s1.querySelector('p')) {
        s1.classList.add('testimonal-card');
      } else {
        s1.classList.add('testimonal-content');
      }
    });
    const tcardchild = [...slide.children];
    tcardchild.forEach((tcardchilds) => {
      const cardcardtitle = tcardchilds.querySelector('h3');
      cardcardtitle?.classList.add('testimonal-slide-cardtitle');
      const cardpretitle = tcardchilds.querySelector('h4');
      cardpretitle?.classList.add('testimonal-slide-pretitle');
      const cardtitle = tcardchilds.querySelector('h2');
      cardtitle?.classList.add('testimonal-slide-title');
      const carddescription = tcardchilds.querySelector('p');
      carddescription?.classList.add('testimonal-slide-description');

      const pWithImg = [...tcardchilds.querySelectorAll('p')]
        .filter((p) => p.querySelector('img'));

      pWithImg[0]?.classList.add('first-p');
      pWithImg[1]?.classList.add('second-p');
    });
  });

  const track = document.createElement('div');
  track.classList.add('testimonal-track');

  slides.forEach((slide) => {
    track.appendChild(slide);
  });

  block.prepend(track);

  // Prev button
  const prevBtn = document.createElement('button');
  prevBtn.className = 'prev-btn';
  prevBtn.textContent = '‹';

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'next-btn';
  nextBtn.textContent = '›';

  // Dots container
  const dots = document.createElement('div');
  dots.className = 'dots';

  // One dot for each slide
  slides.forEach(() => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.textContent = '';
    dots.appendChild(dot);
  });

  // Append to the testimonial block
  block.append(prevBtn, nextBtn, dots);

  let currentSlide = 0;
  const allDots = dots.querySelectorAll('.dot');

  function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    allDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  // Initial position
  updateSlider();

  // Next
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  });

  // Prev
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  });

  // Dot click
  allDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSlider();
    });
  });
}
