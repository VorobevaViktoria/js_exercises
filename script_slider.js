// Slider 
const numberOfSlides = document.querySelectorAll('.offer__slide'),
    prevSlide = document.querySelector('.offer__slider-prev'),
    nextSlide = document.querySelector('.offer__slider-next'),
    totalSlide = document.querySelector('#total'),
    currentNumber = document.querySelector('#current');
let currentSlide = 0;

function showSlide(slide) {
    if (slide > numberOfSlides.length - 1) {
        currentSlide = 0;
    } else if (slide < 0) {
        currentSlide = numberOfSlides.length - 1;
    } else {
        currentSlide = slide;
    }
    numberOfSlides.forEach(item => {
        item.classList.add('hide');
    });

    numberOfSlides[currentSlide].classList.remove('hide');

    currentNumber.textContent = getZero(currentSlide + 1);
    console.log(currentSlide);
}

totalSlide.textContent = getZero(numberOfSlides.length);
currentNumber.textContent = getZero(currentSlide + 1);
showSlide(currentSlide);

prevSlide.addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

nextSlide.addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});