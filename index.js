const slider = document.querySelectorAll('[data-slider]');
const crops = document.querySelectorAll('[data-crop-list]')[0];
const activeSlide = document.querySelectorAll('[data-slide-active]')[0];


const arrowLeft = document.querySelectorAll('[data-arrow-left]')[0];
const arrowRight = document.querySelectorAll('[data-arrow-right]')[0];


const slidesCount = document.querySelectorAll('.b-slider__slide').length;

// console.log(slider);
// console.log(pointer);
// console.log(arrowLeft);
// console.log(arrowRight);
// console.log(activeSlide);

function ShowPointer () {
    for (var _i = 0; _i < slidesCount; _i++) {
        const _elem = document.createElement('li');

        _elem.className = 'b-slider__crop-item';
        crops.appendChild(_elem);
    }
}

ShowPointer();