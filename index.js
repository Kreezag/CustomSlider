const SLIDER = document.querySelectorAll('[data-slider]');
const SLIDE = document.querySelectorAll('.b-slider__slide');
const COUNT_SLIDES = SLIDE.length;

const ARROW_LEFT = document.querySelectorAll('[data-arrow-left]')[0];
const ARROW_RIGHT = document.querySelectorAll('[data-arrow-right]')[0];

const CROPS = document.querySelectorAll('[data-crop-list]')[0];




function AddDataCrops (i) {
    const _elem = document.createElement('li');

    _elem.className = 'b-slider__crop-item';
    _elem.setAttribute('data-crop', i );
    CROPS.appendChild(_elem);

    if (i === 0) {
        _elem.setAttribute('data-crop-active', '');
    }
}




function AddDataSlides (i) {
    SLIDE[i].setAttribute('data-slide', i );
}



function SET_DATA_ATTR () {
    for (var _i = 0; _i < COUNT_SLIDES; _i++) {
        AddDataCrops(_i);
        AddDataSlides(_i);
    }
}



SET_DATA_ATTR();

function ChangeSlideRight () {
    var activeSlide = document.querySelectorAll('[data-slide-active]')[0];
    var position = activeSlide.getAttribute('data-slide');
    var nextSlide = SLIDE[(+position + 1)];

    if (position == (COUNT_SLIDES - 1)) {
        nextSlide = SLIDE[0];
    }

    activeSlide.removeAttribute('data-slide-active');
    nextSlide.setAttribute('data-slide-active', '');
}

function ChangeSlideLeft () {
    var activeSlide = document.querySelectorAll('[data-slide-active]')[0];
    var position = activeSlide.getAttribute('data-slide');
    var nextSlide = SLIDE[(+position - 1)];

    if (position == 0) {
        nextSlide = SLIDE[(COUNT_SLIDES - 1)];
    }

    activeSlide.removeAttribute('data-slide-active');
    nextSlide.setAttribute('data-slide-active', '');
}


ARROW_LEFT.onclick = () => ChangeSlideLeft();
ARROW_RIGHT.onclick = () => ChangeSlideRight();

setInterval(ARROW_RIGHT.onclick, 4000);