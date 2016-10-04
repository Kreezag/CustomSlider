const SLIDER = document.querySelectorAll('[data-slider]')[0];
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
        _elem.setAttribute('data-active', '');
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




function setActive(el, position, boolean, activeClass) {

    var nextElem = el[(+position + (boolean ? 1 : -1) )];

    if (boolean && position == (COUNT - 1)) {
        nextElem = el[0];
    }

    if (!boolean && position == 0) {
        nextElem = el[(COUNT - 1)];
    }

    nextElem.setAttribute(activeClass, '');
}




function ChangeEl (boolean) {

    const activeSlide = SLIDER.querySelectorAll('[data-active]')[0];
    const activeCrop = CROPS.querySelectorAll('[data-active]')[0];
    const _crop = CROPS.querySelectorAll('[data-crop]');
    const position = activeSlide.getAttribute('data-slide');

    setActive(SLIDE, position, boolean, 'data-active');
    setActive(_crop, position, boolean, 'data-active');

    activeSlide.removeAttribute('data-active');
    activeCrop.removeAttribute('data-active');
}





ARROW_LEFT.onclick = () => ChangeEl(false);
ARROW_RIGHT.onclick = () => ChangeEl(true);

setInterval(ARROW_RIGHT.onclick, 4000);