const slider = document.querySelector('.slider');
const container = document.querySelector('.slider__container');
const slides = document.querySelectorAll('.slide');
const navigations = document.querySelectorAll('.slider__nav');

let activeOrder = 0;

init();

function init() {
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    slide.dataset.order = i;
    slide.style.transform = 'translate(-50%, -50%)'
    slide.addEventListener('click', clickHandler);
  }

  for (const navigation of navigations) {
    navigation.addEventListener('click', navigationHandler)
  }

  activeOrder = Math.floor(slides.length / 2);

  update();
}

function update() {
  const { width, height } = container.getBoundingClientRect();
  const slideRect = slides[0].getBoundingClientRect();
  const a = width / 2;
  const b = height / 2;
  const delta = Math.PI / slides.length / 4;

  for (i = 0; i < slides.length; i++) {
    const leftSlide = document.querySelector(`.slide[data-order='${activeOrder - i}']`);
    if (leftSlide) {
      leftSlide.style.zIndex = slides.length - i;
      leftSlide.style.opacity = 1 - (2 * i) / slides.length;
      leftSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 - delta * i * 2)}px`;
      leftSlide.style.top = `${-b * Math.sin((Math.PI * 3) / 2 - delta * i * 2)}px`;
    }

    const rightSlide = document.querySelector(`.slide[data-order='${activeOrder + i}']`);
    if (rightSlide) {
      rightSlide.style.zIndex = slides.length - i;
      rightSlide.style.opacity = 1 - (2 * i) / slides.length;
      rightSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 + delta * i * 2)}px`;
      rightSlide.style.top = `${-b * Math.sin((Math.PI * 3) / 2 + delta * i * 2)}px`;
    }
  }
}

function clickHandler() {
  const order = parseInt(this.dataset.order, 10);
  activeOrder = order;
  update();
}

function navigationHandler(e) {
  e.preventDefault();
  const { dir } = this.dataset;
  if (dir === 'next') {
    console.log(slides.length);
    if (activeOrder === Number(slides.length - 1)) {
      activeOrder = 0;
    } else {
      activeOrder = Math.min(slides.length - 1, activeOrder + 1);
    }
  } else if (dir === 'prev') {
    if (activeOrder === 0) {
      activeOrder = Number(slides.length - 1);
    } else {
      console.log(slides.length - 1);
      console.log(slides.length);
      console.log(activeOrder);
      activeOrder = Math.max(0, activeOrder - 1);
    }
  }
  update();
}