const SLIDE = document.querySelectorAll('.b-slider__slide');
const COUNT = SLIDE.length;

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
    for (var _i = 0; _i < COUNT; _i++) {
        AddDataCrops(_i);
        AddDataSlides(_i);
    }
}



SET_DATA_ATTR();

function ChangeSlide (boolean) {

    const activeSlide = document.querySelectorAll('[data-slide-active]')[0];
    const activeCrop = document.querySelectorAll('[data-crop-active]')[0];
    const _crop = document.querySelectorAll('[data-crop]');
    const position = activeSlide.getAttribute('data-slide');

    var nextSlide = SLIDE[(+position + (boolean ? 1 : -1) )];
    var nextCrop = _crop[( +position + (boolean ? 1 : -1) )];

    if (boolean && position == (COUNT - 1)) {
        nextSlide = SLIDE[0];
        nextCrop = _crop[0];
    }

    if (!boolean && position == 0) {
        nextSlide = SLIDE[(COUNT - 1)];
        nextCrop = _crop[(COUNT - 1)];
    }
    
    activeSlide.removeAttribute('data-slide-active');
    activeCrop.removeAttribute('data-crop-active');
    nextSlide.setAttribute('data-slide-active', '');
    nextCrop.setAttribute('data-crop-active', '');
}


ARROW_LEFT.onclick = () => ChangeSlide(false);
ARROW_RIGHT.onclick = () => ChangeSlide(true);

setInterval(ARROW_RIGHT.onclick, 4000);