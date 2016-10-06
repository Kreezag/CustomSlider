const SLIDER = document.querySelectorAll('[data-slider]')[0];
const SLIDE = document.querySelectorAll('.b-slider__slide');
const COUNT = SLIDE.length;

const ARROW_LEFT = document.querySelectorAll('[data-arrow-left]')[0];
const ARROW_RIGHT = document.querySelectorAll('[data-arrow-right]')[0];

const CROPS = document.querySelectorAll('[data-crop-list]')[0];
const CROP_CLASS = 'b-slider__crop-item';




function InitCrops (i) {
    const _elem = document.createElement('li');

    _elem.className = CROP_CLASS;
    _elem.setAttribute('data-crop', i );
    CROPS.appendChild(_elem);

    if (i === 0) {
        _elem.setAttribute('data-active', '');
    }
}

function InitSlides (i) {
    SLIDE[i].setAttribute('data-slide', i );
}

function Counter (e) {
    for (var _i = 0; _i < COUNT; _i++) {
        e(_i);
    }
}

function SET_DATA_ATTR () {
    Counter(InitCrops);
    Counter(InitSlides);
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


function setActiveWithCrop(el, position, activeClass) {

    var nextElem = el[(+position)];

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



CROPS.onclick = function(e) {

    if (e.target.getAttribute('data-crop')) { //HUCK

        const _dataAttr = e.target.getAttribute('data-crop');

        const _crop = CROPS.querySelectorAll('[data-crop]');
        const activeSlide = SLIDER.querySelectorAll('[data-active]')[0];
        const activeCrop = CROPS.querySelectorAll('[data-active]')[0];

        if (_dataAttr != activeCrop.getAttribute('data-crop')) {
            setActiveWithCrop(SLIDE, _dataAttr, 'data-active');
            setActiveWithCrop(_crop, _dataAttr, 'data-active');

            activeSlide.removeAttribute('data-active');
            activeCrop.removeAttribute('data-active');
        }
    }
};




ARROW_LEFT.onclick = () => ChangeEl(false);
ARROW_RIGHT.onclick = () => ChangeEl(true);

setInterval(ARROW_RIGHT.onclick, 4000);