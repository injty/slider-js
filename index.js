const slider = document.querySelector('.slider');
const container = document.querySelector('.slider__container');
const slides = document.querySelectorAll('.slide');
const navigations = document.querySelectorAll('.navigation');

let activeOrder = 0;

init();

function init() {
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    slide.dataset.order = i;
    slide.style.transform = 'translate(-50%, -50%)'
  }

  activeOrder = Math.floor(slides.length / 2);

  update();
}

function update() {
  const { width, height } = container.getBoundingClientRect();


  const a = width / 2;
  const b = height / 2;
  const delta = Math.PI / slides.length / 4;

  for (i = 0; i < slides.length; i++) {
    const leftSlide = document.querySelector(`.slide[data-order='${activeOrder - i}']`);

    if (leftSlide) {
      leftSlide.style.zIndex = slides.length - i;
      leftSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 - delta * i * 2)}px`;
      leftSlide.style.top = `${-b * Math.sin((Math.PI * 3) / 2 - delta * i * 2)}px`;
    }

    const rightSlide = document.querySelector(`.slide[data-order='${activeOrder + i}']`);
    if (rightSlide) {
      rightSlide.style.zIndex = slides.length - i;
      rightSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 + delta * i * 2)}px`;
      rightSlide.style.top = `${-b * Math.sin((Math.PI * 3) / 2 + delta * i * 2)}px`;
    }
  }
}